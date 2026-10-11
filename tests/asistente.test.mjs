import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm, copyFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PassThrough } from 'node:stream';
import { EventEmitter } from 'node:events';
import { spawn } from 'node:child_process';
import {
  runAssistant, interview, saveProject, projectSlug, parseBudget,
  inferModules, launchCodex, codexArguments, InterviewEnded,
} from '../scripts/asistente.mjs';

const kitRoot = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'plan-asistente-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'plantillas'));
  const template = JSON.parse(await readFile(join(kitRoot, 'plantillas', 'proyecto.json'), 'utf8'));
  template.future_field = { must_be_preserved: true };
  await writeFile(join(root, 'plantillas', 'proyecto.json'), JSON.stringify(template));
  await copyFile(join(kitRoot, 'plantillas', 'MEJORAS.md'), join(root, 'plantillas', 'MEJORAS.md'));
  return root;
}

function io(answers, { tty = false } = {}) {
  const input = new PassThrough();
  const output = new PassThrough();
  input.isTTY = tty;
  output.isTTY = tty;
  let text = '';
  output.on('data', chunk => { text += chunk.toString(); });
  input.end(`${answers.join('\n')}\n`);
  return { input, output, text: () => text };
}

const base = ({ name = 'Mi Web', action = '1', pages = 'Inicio, Servicios, Contacto', budget = '' } = {}) => [
  '1', name, 'Ayudar a empresas con video', 'Empresas locales', 'Perú', 'Lima', '',
  action, pages, 'Fotos propias y servicios', 'contacto@example.test', '', '',
  '', budget,
];

test('tubería conserva todas las líneas, usa la plantilla vigente y muestra una META concreta', async t => {
  const root = await fixture(t);
  const streams = io(base());
  const result = await runAssistant({ root, ...streams, launch: () => assert.fail('No debe abrir CLI sin TTY') });
  assert.equal(result.project.idea, 'Ayudar a empresas con video');
  assert.equal(result.project.validacion_idea.idea_original, 'Ayudar a empresas con video');
  assert.equal(result.project.validacion_idea.idea_vigente, 'Ayudar a empresas con video');
  assert.equal(result.project.validacion_idea.estado, 'pendiente_investigacion');
  assert.equal(result.project.validacion_idea.decision_usuario, null);
  assert.equal(result.project.mercado.ciudad_o_zona, 'Lima');
  assert.equal(result.project.mercado.idioma, 'español');
  assert.equal(result.project.meta.cantidad_paginas, 3);
  assert.deepEqual(result.project.future_field, { must_be_preserved: true });
  assert.deepEqual(result.project.arquitectura.modulos, ['servicios']);
  assert.equal(result.project.dataforseo.authorization, null);
  assert.equal(result.project.dataforseo.budget_usd, 0);
  assert.equal(result.project.dataforseo.exploracion.authorization, null);
  assert.equal(result.project.dataforseo.exploracion.budget_usd, 0);
  assert.equal(result.project.dataforseo.investigacion.authorization, null);
  assert.equal(result.project.dataforseo.investigacion.proposal, null);
  assert.equal(result.project.dataforseo.investigacion.additional_budget_usd, null);
  assert.equal(result.project.dataforseo.investigacion.approved_project_total_usd, null);
  assert.equal(result.project.schema_version, 5);
  assert.equal(result.project.intake.version, 2);
  assert.equal(result.project.modalidad, 'nueva');
  assert.equal(result.project.renovacion.estado, 'no_aplica');
  assert.equal(result.project.alcance.web_existente, null);
  assert.deepEqual(result.project.dataforseo.investigacion.options, []);
  assert.equal(result.project.dataforseo.investigacion.selected_option_id, null);
  assert.equal(result.project.dataforseo.investigacion.freeze_new_paid_calls_while_awaiting_approval, true);
  assert.equal(result.project.dataforseo.investigacion.approval_must_match_proposal_id_and_version, true);
  assert.ok(result.project.dataforseo.investigacion.proposal_required_fields.includes('pricing_sources'));
  assert.ok(result.project.dataforseo.investigacion.proposal_required_fields.includes('prior_reserved_usd'));
  assert.equal(result.project.dataforseo.exploracion.unused_budget_transfers_automatically, false);
  assert.equal(result.project.dataforseo.exploracion.closed_at, null);
  assert.equal(result.project.seo.coverage_catalogue.length, 26);
  assert.equal(result.project.seo.coverage_catalogue.every(area => area.status === 'pendiente'), true);
  assert.equal(result.project.seo.final_audit.skill, 'seo-audit');
  assert.equal(result.project.alcance.publicacion_authorization, null);
  assert.equal(result.project.models.diseno.selection_verified, false);
  assert.match(streams.text(), /META — mi-web/);
  assert.match(streams.text(), /Publicación fuera de esta entrega/);
  const initialState = await readFile(join(result.directory, 'ESTADO.md'), 'utf8');
  assert.match(initialState, /no_aplica: publicación fuera de esta entrega de preview/);
  assert.doesNotMatch(initialState, /pendiente: publicación/);
  const handoff = await readFile(join(result.directory, 'INICIAR-CODEX.md'), 'utf8');
  assert.match(handoff, /Conserva la idea original/);
  assert.match(handoff, /Aprobar el presupuesto no aprueba el giro de la idea/);
  assert.match(streams.text(), /Empresas locales/);
  assert.match(streams.text(), /pega exactamente/);
  const event = JSON.parse(await readFile(join(result.directory, 'BITACORA.jsonl'), 'utf8'));
  assert.equal(event.type, 'entrevista_completada');
  assert.equal(event.phase, 'brief');
  assert.equal(event.project_id, 'mi-web');
  assert.deepEqual((await readdir(result.directory)).sort(), ['BITACORA.jsonl', 'ESTADO.md', 'INICIAR-CODEX.md', 'MEJORAS.md', 'META.md', 'proyecto.json']);
  assert.deepEqual((await readdir(root)).sort(), ['plantillas', 'proyectos']);
});

test('EOF parcial o en la autorización no guarda archivos ni habilita pagos', async t => {
  for (const answers of [['Interrumpida', 'Idea incompleta'], base({ budget: '1' })]) {
    const root = await fixture(t);
    await assert.rejects(runAssistant({ root, ...io(answers) }), InterviewEnded);
    assert.deepEqual(await readdir(root), ['plantillas']);
  }
});

test('presupuesto autoriza solo exploración mediante sí expreso y nunca habilita investigación completa ni escribe gastos', async t => {
  for (const [confirmation, authorized] of [['no', false], ['quizá', false], ['sí', true]]) {
    const root = await fixture(t);
    await mkdir(join(root, '.control'));
    const ledger = join(root, '.control', 'dataforseo.jsonl');
    const oldLedger = '{"historial":"no sustituir"}\n';
    await writeFile(ledger, oldLedger);
    const streams = io([...base({ budget: '0,50' }), confirmation]);
    const result = await runAssistant({ root, ...streams, prepareOnly: true });
    assert.equal(Boolean(result.project.dataforseo.exploracion.authorization), authorized);
    assert.equal(result.project.dataforseo.authorization, null);
    assert.equal(result.project.dataforseo.budget_usd, 0.5);
    assert.equal(result.project.dataforseo.exploracion.budget_usd, 0.5);
    assert.equal(result.project.dataforseo.phase, 'exploracion');
    assert.equal(result.project.dataforseo.limits, null);
    assert.equal(result.project.dataforseo.investigacion.authorization, null);
    assert.equal(result.project.dataforseo.investigacion.status, 'pendiente_presupuesto');
    assert.equal(result.project.dataforseo.investigacion.proposal, null);
    assert.equal(result.project.dataforseo.investigacion.additional_budget_usd, null);
    assert.equal(result.project.dataforseo.investigacion.approved_project_total_usd, null);
    assert.deepEqual(result.project.workflow.pausas_ordinarias, ['aprobacion_presupuesto_seo', 'seleccion_visual']);
    assert.match(streams.text(), /sugerido USD 0\.10/);
    const totalFormula = /ya gastado \+ reservas pendientes \+ máximo adicional = máximo total/;
    assert.match(streams.text(), totalFormula);
    for (const filename of ['META.md', 'ESTADO.md', 'INICIAR-CODEX.md']) {
      assert.match(await readFile(join(result.directory, filename), 'utf8'), totalFormula, filename);
    }
    assert.equal(result.project.dataforseo.investigacion.total_formula, 'prior_spent_usd + prior_reserved_usd + additional_max_usd');
    assert.match(streams.text(), /La investigación completa sigue sin autorización/);
    if (authorized) {
      const authorization = result.project.dataforseo.exploracion.authorization;
      assert.equal(authorization.scope, 'exploracion_inicial');
      assert.deepEqual(authorization.endpoint_families, ['labs_keyword_suggestions', 'google_organic_serp']);
      assert.equal(authorization.budget_usd, 0.5);
      assert.equal(authorization.max_call_usd, 0.1);
    }
    const limits = result.project.dataforseo.exploracion.limits;
    assert.deepEqual(limits.google_organic_serp, { max_attempts: 3, tasks_per_call: 1, depth: 10, max_crawl_pages: 1, extras: false });
    assert.deepEqual(limits.labs_keyword_suggestions, { max_attempts: 1, max_items_per_attempt: 25 });
    assert.equal(limits.google_ads_search_volume, undefined);
    assert.equal(limits.retries.max_per_query, 1);
    assert.equal(limits.retries.max_total_per_site, 1);
    assert.equal(limits.retries.auto_retry_unknown_cost_or_timeout, false);
    assert.equal(result.project.dataforseo.totals_reconciled, false);
    assert.equal(result.project.dataforseo.shared_ledger_resolved_path, null);
    assert.equal(await readFile(ledger, 'utf8'), oldLedger);
  }
});

test('nombres seguros, traversal y colisiones no sobreescriben', async t => {
  for (const invalid of ['../fuera', '..\\fuera', 'C:\\fuera', '.', '..', 'CON', 'NUL.txt', 'lpt1', 'web.', 'web/otra']) {
    assert.throws(() => projectSlug(invalid), undefined, invalid);
  }
  assert.equal(projectSlug('Árbol Lima'), 'arbol-lima');
  const root = await fixture(t);
  const intake = await interview({ root, ...io(base()) });
  const first = await saveProject({ root, intake });
  const original = await readFile(join(first.directory, 'proyecto.json'), 'utf8');
  await assert.rejects(saveProject({ root, intake }), { code: 'EEXIST' });
  assert.equal(await readFile(join(first.directory, 'proyecto.json'), 'utf8'), original);
  const repeatedName = await interview({ root, ...io(['1', 'Mi Web', ...base({ name: 'Otro Nombre' }).slice(1)]) });
  assert.equal(repeatedName.slug, 'otro-nombre');
});

test('presupuestos con fracciones de centavo se rechazan antes de confirmar o guardar', async t => {
  for (const invalid of ['0.104', '0.004', '0,0049', '0.999', '1.000']) {
    assert.throws(() => parseBudget(invalid), /dos decimales/, invalid);
  }
  // Todos los importes admitidos se muestran y persisten con el mismo valor.
  for (let cents = 0; cents <= 100; cents++) {
    const displayed = (cents / 100).toFixed(2);
    assert.equal(parseBudget(displayed), cents / 100);
    assert.equal(parseBudget(displayed.replace('.', ',')), cents / 100);
  }
  const root = await fixture(t);
  const streams = io([...base({ budget: '0.104' }), '0.004', '0,10', 'sí']);
  const saved = await runAssistant({ root, ...streams, prepareOnly: true });
  const persisted = JSON.parse(await readFile(join(saved.directory, 'proyecto.json'), 'utf8'));
  const confirmationAmounts = [...streams.text().matchAll(/Autorizas expresamente hasta USD (\d+\.\d{2})/g)].map(match => match[1]);
  assert.deepEqual(confirmationAmounts, ['0.10']);
  assert.match(streams.text(), /dos decimales/);
  assert.equal(persisted.dataforseo.exploracion.budget_usd, 0.1);
  assert.equal(persisted.dataforseo.exploracion.authorization.budget_usd, 0.1);
  assert.equal(persisted.intake.responses.presupuesto.raw, '0,10');
  assert.equal(persisted.dataforseo.investigacion.authorization, null);

  const anotherRoot = await fixture(t);
  const intake = await interview({ root: anotherRoot, ...io(base()) });
  for (const budget of [0.104, 0.004, NaN, Infinity, '0.10']) {
    await assert.rejects(saveProject({ root: anotherRoot, intake: { ...intake, budget } }), /dos decimales/);
  }
  assert.deepEqual(await readdir(anotherRoot), ['plantillas']);
});

test('preguntas adaptativas de tienda y reservas conservan el pago y sus dependencias', async t => {
  const root = await fixture(t);
  const answers = base({ action: '2 y 5', pages: 'Inicio, Productos, Reservar' });
  answers.splice(13, 0, 'Proveedor en sandbox', 'Inventario servidor', 'Recogida en Lima', 'Calendario existente', 'Sí, mismo proveedor');
  const streams = io(answers);
  const result = await runAssistant({ root, ...streams, prepareOnly: true });
  assert.deepEqual(result.project.arquitectura.modulos, ['tienda', 'reservas']);
  assert.equal(result.project.intake.responses.pagos.value, 'Proveedor en sandbox');
  assert.equal(result.project.intake.responses.disponibilidad.value, 'Calendario existente');
  assert.equal(result.project.intake.responses.pago_reserva.value, 'Sí, mismo proveedor');
  assert.equal(result.project.arquitectura.integraciones.length, 5);
  assert.equal(result.project.arquitectura.modulos.includes('catalogo'), false);
  assert.match(streams.text(), /modo de prueba/);
  assert.match(streams.text(), /disponibilidad y registra reservas/);
});

test('catálogo pregunta recepción de pedidos sin convertirlo en tienda', async t => {
  const root = await fixture(t);
  const answers = base({ action: '3' });
  answers.splice(13, 0, 'WhatsApp y lista actualizada por el equipo');
  const streams = io(answers);
  const result = await runAssistant({ root, ...streams, prepareOnly: true });
  assert.ok(result.project.arquitectura.modulos.includes('catalogo'));
  assert.ok(!result.project.arquitectura.modulos.includes('tienda'));
  assert.equal(result.project.intake.responses.pagos, undefined);
  assert.match(streams.text(), /Cómo se recibe un pedido/);
});

test('límites numéricos rechazan valores desconocidos y cuentas solo explícitas', () => {
  assert.equal(parseBudget(''), 0);
  assert.equal(parseBudget('1'), 1);
  for (const invalid of ['no sé', '-1', '2', '0.1e1', 'Infinity', '1.01']) assert.throws(() => parseBudget(invalid));
  assert.deepEqual(inferModules('leer artículos', 'Blog'), ['blog']);
  assert.deepEqual(inferModules('contactar', 'Inicio, panel CMS'), ['servicios']);
  assert.ok(inferModules('contactar', 'cuentas de clientes').includes('cuentas'));
  assert.deepEqual(inferModules('contactar', 'Inicio, sin tienda ni cuentas ni reservas'), ['servicios']);
  assert.deepEqual(inferModules('comprar online', 'Inicio, productos, carrito, checkout'), ['tienda']);
  assert.deepEqual(inferModules('comprar en línea', 'Inicio, tienda sin cuentas, no reservas'), ['tienda']);
});

test('texto libre comprar online pide pagos y stock; las negaciones no activan módulos', async t => {
  const root = await fixture(t);
  const answers = base({ action: 'comprar online', pages: 'Inicio, productos, carrito, checkout, sin cuentas ni reservas' });
  answers.splice(13, 0, 'por elegir', 'pendiente', 'pendiente');
  const result = await runAssistant({ root, ...io(answers), prepareOnly: true });
  assert.deepEqual(result.project.arquitectura.modulos, ['tienda']);
  assert.ok(result.project.intake.responses.pagos);
  assert.ok(result.project.intake.responses.stock);
  assert.equal(result.project.intake.responses.disponibilidad, undefined);
});

test('publicación conserva solicitud y solo un sí explícito con destino registra autorización', async t => {
  for (const [confirmation, authorized] of [['no', false], ['sí', true]]) {
    const root = await fixture(t);
    const answers = base();
    answers[13] = 'Autorizo publicar en mi dominio existente';
    answers.splice(14, 0, 'https://ejemplo.test, proyecto existente', confirmation);
    const streams = io(answers);
    const result = await runAssistant({ root, ...streams, prepareOnly: true });
    assert.equal(result.project.alcance.entrega_solicitada, 'Autorizo publicar en mi dominio existente');
    assert.equal(Boolean(result.project.alcance.publicacion_authorization), authorized);
    assert.equal(result.project.alcance.entrega_prevista, authorized ? 'publicada_verificada' : 'publicacion_solicitada_pendiente_autorizacion');
    assert.equal(result.project.calidad.publicacion_verificada, false);
    if (authorized) {
      assert.equal(result.project.alcance.publicacion_authorization.target, 'https://ejemplo.test, proyecto existente');
      assert.match(streams.text(), /Publicación autorizada expresamente/);
      assert.equal(result.project.alcance.publicacion_authorization.contract_services, false);
    }
  }
});

test('saveProject revalida el slug y rechaza proyectos enlazados fuera del kit', async t => {
  const root = await fixture(t);
  const intake = await interview({ root, ...io(base()) });
  await assert.rejects(saveProject({ root, intake: { ...intake, slug: '../fuera' } }), /carpeta|rutas/);
  const outside = await mkdtemp(join(tmpdir(), 'plan-asistente-outside-'));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await symlink(outside, join(root, 'proyectos'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(saveProject({ root, intake }), /fuera de la raíz/);
  assert.deepEqual(await readdir(outside), []);
});

test('arranque TTY solicita Sol high con argumentos separados y sin shell; stub, no CLI real', async t => {
  const root = await fixture(t);
  const streams = io(base(), { tty: true });
  let invocation;
  const result = await runAssistant({
    root, ...streams, find: async () => 'C:\\fake\\codex.exe',
    launch: args => launchCodex({ ...args, spawnImpl: (command, args, options) => {
      invocation = { command, args, options };
      const child = new EventEmitter();
      queueMicrotask(() => child.emit('exit', 0, null));
      return child;
    } }),
  });
  assert.equal(result.launched, true);
  assert.equal(invocation.command, 'C:\\fake\\codex.exe');
  assert.deepEqual(invocation.args.slice(0, 6), ['-C', resolve(root), '-m', 'gpt-6.1-sol', '-c', 'model_reasoning_effort="high"']);
  assert.deepEqual(invocation.args, codexArguments(root, 'mi-web'));
  assert.equal(invocation.options.shell, false);
  assert.equal(invocation.options.stdio, 'inherit');
  assert.equal(result.project.models.produccion.selection_verified, false);
  assert.equal(result.project.models.diseno.reasoning, 'ultra');
  assert.deepEqual(result.project.models.produccion.aplica_a, ['coordinacion', 'consultoria_seo', 'investigacion', 'contenido', 'auditoria']);
  assert.equal(result.project.models.desarrollo.model_id, 'gpt-6-astra');
  assert.equal(result.project.models.desarrollo.reasoning, 'ultra');
  assert.equal(result.project.models.desarrollo.agent_role, 'desarrollador');
  assert.equal(result.project.models.desarrollo.selection_verified, false);
  assert.deepEqual(result.project.models.desarrollo.aplica_a, ['web_completa', 'programacion', 'integraciones', 'correcciones']);
  assert.match(invocation.args.at(-1), /rol disenador/);
  assert.match(invocation.args.at(-1), /Astra ultra en el rol desarrollador para implementar TODA la web/);
  assert.match(invocation.args.at(-1), /catálogo completo de skills SEO AgriciDaniel/);
  for (const path of ['SEO-COMPLETO.md', 'plantillas/PRESUPUESTO-SEO.md', 'plantillas/SEO-STRATEGY.md']) {
    assert.ok(invocation.args.at(-1).includes(path));
  }
  assert.match(invocation.args.at(-1), /ya gastado \+ reservas pendientes \+ máximo adicional = máximo total/);
  assert.match(invocation.args.at(-1), /espera aprobación explícita antes de la investigación completa/);
  assert.match(invocation.args.at(-1), /auditoría SEO total/);
  assert.doesNotMatch(invocation.args.at(-1), /vuelve a Sol|Sol 6\.1 high.*programación/);
  const handoff = await readFile(join(result.directory, 'INICIAR-CODEX.md'), 'utf8');
  assert.match(handoff, /Primera pausa planificada/);
  assert.match(handoff, /El coordinador lee SEO-COMPLETO\.md/);
  assert.ok(handoff.includes('plantillas/SEO-STRATEGY.md'));
  assert.match(handoff, /Segunda pausa planificada/);
  assert.match(handoff, /Astra ultra, rol desarrollador, implementa toda la web/);
  assert.match(handoff, /endpoints, cantidades, precios vigentes, fecha y exclusiones/);
  assert.match(handoff, /otro chat, clon o cuenta no reinicia gasto ni autorizaciones/);
});

test('--solo-preparar omite discovery y lanzamiento incluso con TTY', async t => {
  const root = await fixture(t);
  const result = await runAssistant({ root, ...io(base(), { tty: true }), prepareOnly: true,
    find: () => assert.fail('No debe buscar Codex'), launch: () => assert.fail('No debe abrir Codex') });
  assert.equal(result.launched, false);
});

test('fallo de Codex entrega el prompt de IDE y conserva la ficha; stub sin sesión real', async t => {
  const root = await fixture(t);
  const streams = io(base(), { tty: true });
  const result = await runAssistant({ root, ...streams,
    find: async () => 'C:\\fake\\codex.exe', launch: async () => ({ code: 1, signal: null }) });
  assert.equal(result.launched, false);
  assert.equal(result.launch_result.code, 1);
  assert.equal(result.fallback_prompt, true);
  assert.match(streams.text(), /Codex terminó sin completar el inicio/);
  assert.match(streams.text(), /pega exactamente/);
  assert.match(streams.text(), /Inicia el proyecto proyectos\/mi-web/);
  assert.ok((await readdir(result.directory)).includes('proyecto.json'));
});

test('entrypoint CLI funciona con stdin en un kit temporal y --solo-preparar', async t => {
  const root = await fixture(t);
  await mkdir(join(root, 'scripts'));
  await copyFile(join(kitRoot, 'iniciar.mjs'), join(root, 'iniciar.mjs'));
  await copyFile(join(kitRoot, 'scripts', 'asistente.mjs'), join(root, 'scripts', 'asistente.mjs'));
  await copyFile(join(kitRoot, 'scripts', 'guardar-proyecto.mjs'), join(root, 'scripts', 'guardar-proyecto.mjs'));
  await copyFile(join(kitRoot, 'scripts', 'bitacora.mjs'), join(root, 'scripts', 'bitacora.mjs'));
  const output = await new Promise((resolveResult, reject) => {
    const child = spawn(process.execPath, [join(root, 'iniciar.mjs'), '--solo-preparar'], { shell: false, stdio: ['pipe', 'pipe', 'pipe'] });
    let text = '';
    child.stdout.on('data', chunk => { text += chunk; });
    child.stderr.on('data', chunk => { text += chunk; });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolveResult(text) : reject(new Error(`Código ${code}: ${text}`)));
    child.stdin.end(`${base().join('\n')}\n`);
  });
  assert.match(output, /Ficha guardada/);
  assert.match(output, /Preparación terminada/);
  assert.ok((await readdir(join(root, 'proyectos', 'mi-web'))).includes('META.md'));
});
