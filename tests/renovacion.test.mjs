import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, readFile, readdir, rm, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PassThrough } from 'node:stream';
import { runAssistant, interview, saveProject, publicWebsiteUrl, parseProjectMode, codexArguments, InterviewEnded } from '../scripts/asistente.mjs';

const kitRoot = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'plan-renovacion-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'plantillas'));
  for (const name of ['proyecto.json', 'MEJORAS.md', 'MIGRACION-SEO.md']) {
    await copyFile(join(kitRoot, 'plantillas', name), join(root, 'plantillas', name));
  }
  return root;
}

function io(answers, tty = false) {
  const input = new PassThrough();
  const output = new PassThrough();
  input.isTTY = tty;
  output.isTTY = tty;
  let transcript = '';
  output.on('data', chunk => { transcript += chunk.toString(); });
  input.end(answers.join('\n') + '\n');
  return { input, output, text: () => transcript };
}

const answersFor = ({ keepDomain = true, destination = 'https://nuevo.example.test/', delivery = '', publication = [], action = '1', pages = '', priorities = 'Inicio, Servicios, Contacto', dependencies = [] } = {}) => [
  '2', 'Renovar negocio', 'https://actual.example.test/', keepDomain ? 'sí' : 'no',
  ...(keepDomain ? [] : [destination]),
  'Mejorar velocidad y claridad', 'Marca y textos que ya funcionan', priorities,
  'Exportaciones GSC disponibles; analítica pendiente', 'WordPress', 'Proveedor actual',
  'Repositorio y exportación CMS', 'Copia de ayer; restauración por probar', 'Propietario del dominio',
  'Formulario de contacto debe seguir disponible',
  'Servicios audiovisuales', 'Empresas', 'Perú', 'Lima', '', action, pages,
  'Fotografías propias', 'contacto@example.test', '', '',
  ...dependencies, delivery, ...publication, '0',
];

test('modalidad y URL se validan sin aceptar credenciales, otros protocolos o destinos ambiguos', () => {
  assert.equal(parseProjectMode('1'), 'nueva');
  assert.equal(parseProjectMode('Renovación'), 'renovacion');
  for (const value of ['quizá', '3', 'mejorar algo']) assert.throws(() => parseProjectMode(value));
  assert.equal(publicWebsiteUrl('https://Example.test'), 'https://example.test/');
  assert.equal(publicWebsiteUrl('http://example.test/blog/'), 'http://example.test/blog/');
  for (const value of ['example.test', 'ftp://example.test/', 'javascript:alert(1)', 'https://user:secret@example.test/', 'https://example.test/?token=secret', 'https://example.test/#private']) {
    assert.throws(() => publicWebsiteUrl(value), undefined, value);
  }
});

test('renovación conserva respuestas y prioridades sin aprobar preservación, publicación ni investigación', async t => {
  const root = await fixture(t);
  const streams = io(answersFor());
  const { project, directory } = await runAssistant({ root, ...streams, prepareOnly: true });
  assert.equal(project.modalidad, 'renovacion');
  assert.equal(project.alcance.web_existente, 'https://actual.example.test/');
  assert.equal(project.renovacion.schema_version, 1);
  assert.equal(project.renovacion.estado, 'pendiente_diagnostico');
  assert.equal(project.renovacion.mantener_dominio, true);
  assert.equal(project.renovacion.url_destino, 'https://actual.example.test/');
  assert.match(project.renovacion.acceso_metricas_declarado, /GSC disponibles/);
  assert.equal(project.renovacion.preservacion_verificada, false);
  assert.ok(Object.values(project.renovacion.comprobaciones).every(check => check.estado === 'pendiente' && check.evidencias.length === 0));
  assert.equal(project.renovacion.seguimiento.authorization, null);
  assert.equal(project.alcance.publicacion_authorization, null);
  assert.equal(project.calidad.publicacion_verificada, false);
  assert.equal(project.calidad.operacion_verificada, false);
  assert.equal(project.dataforseo.exploracion.authorization, null);
  assert.equal(project.dataforseo.investigacion.authorization, null);
  assert.equal(project.dataforseo.investigacion.selected_option_id, null);
  assert.deepEqual(project.dataforseo.investigacion.options, []);
  assert.equal(project.intake.responses.paginas_funciones.value, 'Inicio, Servicios, Contacto');
  assert.equal(project.intake.responses.destino_publicacion, undefined);
  assert.match(streams.text(), /el agente hará el inventario/);
  assert.deepEqual((await readdir(directory)).sort(), ['BITACORA.jsonl', 'ESTADO.md', 'INICIAR-CODEX.md', 'MEJORAS.md', 'META.md', 'MIGRACION-SEO.md', 'proyecto.json']);
  for (const name of ['META.md', 'ESTADO.md', 'INICIAR-CODEX.md']) {
    const content = await readFile(join(directory, name), 'utf8');
    for (const term of ['MIGRACION-SEO.md', 'MIGRACIONES.md', 'baseline', 'rollback', 'seguimiento', 'selected_option_id', 'mínimo suficiente']) assert.ok(content.includes(term), `${name}: ${term}`);
  }
  assert.match(await readFile(join(directory, 'MIGRACION-SEO.md'), 'utf8'), /pendiente/);
  assert.deepEqual((await readdir(root)).sort(), ['plantillas', 'proyectos']);
});

test('publicación en dominio conservado reutiliza destino pero exige sí expreso para ese destino', async t => {
  for (const [response, authorized] of [['no', false], ['sí', true]]) {
    const root = await fixture(t);
    const streams = io(answersFor({ delivery: 'Publicar la renovación', publication: [response] }));
    const { project } = await runAssistant({ root, ...streams, prepareOnly: true });
    assert.equal(project.intake.responses.destino_publicacion, undefined);
    assert.match(streams.text(), /Autorizas expresamente publicar esta web en https:\/\/actual\.example\.test\//);
    assert.equal(Boolean(project.alcance.publicacion_authorization), authorized);
    if (authorized) assert.equal(project.alcance.publicacion_authorization.target, project.renovacion.url_destino);
    assert.equal(project.renovacion.preservacion_verificada, false);
    assert.equal(project.calidad.publicacion_verificada, false);
    assert.equal(project.dataforseo.investigacion.authorization, null);
  }
});

test('cambio de dominio declarado conserva el destino y no concede autorización de publicación', async t => {
  const root = await fixture(t);
  const { project } = await runAssistant({ root, ...io(answersFor({ keepDomain: false })), prepareOnly: true });
  assert.equal(project.renovacion.url_origen, 'https://actual.example.test/');
  assert.equal(project.renovacion.url_destino, 'https://nuevo.example.test/');
  assert.equal(project.renovacion.mantener_dominio, false);
  assert.equal(project.alcance.publicacion_authorization, null);
});

test('destino de renovación pendiente bloquea su definición sin inventar datos ni habilitar publicación', async t => {
  const root = await fixture(t);
  const { project } = await runAssistant({ root, ...io(answersFor({ keepDomain: false, destination: '' })), prepareOnly: true });
  assert.equal(project.renovacion.url_destino, null);
  assert.equal(project.alcance.publicacion_authorization, null);
  assert.ok(project.arquitectura.dependencias_pendientes.some(item => item.includes('Definir URL de destino')));
});

test('destino decidido al solicitar publicación actualiza la renovación y mantiene autorización explícita', async t => {
  for (const [response, authorized] of [['sí', true], ['no', false]]) {
    const root = await fixture(t);
    const { project, directory } = await runAssistant({ root, ...io(answersFor({
      keepDomain: false, destination: '', delivery: 'Publicar la renovación',
      publication: ['https://user:secret@example.test/', 'https://destino.example.test/', response],
    })), prepareOnly: true });
    assert.equal(project.renovacion.url_destino, 'https://destino.example.test/');
    assert.equal(Boolean(project.alcance.publicacion_authorization), authorized);
    if (authorized) assert.equal(project.alcance.publicacion_authorization.target, project.renovacion.url_destino);
    assert.ok(!project.arquitectura.dependencias_pendientes.some(item => item.includes('Definir URL de destino')));
    assert.doesNotMatch(await readFile(join(directory, 'proyecto.json'), 'utf8'), /user:secret/);
    assert.match(await readFile(join(directory, 'META.md'), 'utf8'), /Destino previsto: https:\/\/destino\.example\.test\//);
  }
});

test('rechaza URL sensible y respuesta de dominio ambigua antes de almacenar la respuesta válida', async t => {
  const root = await fixture(t);
  const answers = answersFor();
  answers.splice(2, 2, 'https://user:secret@example.test/', 'ftp://example.test/', 'https://actual.example.test/', 'quizá', 'sí');
  const streams = io(answers);
  const { project, directory } = await runAssistant({ root, ...streams, prepareOnly: true });
  assert.equal(project.intake.responses.web_actual.raw, 'https://actual.example.test/');
  assert.equal(project.intake.responses.mantener_dominio.raw, 'sí');
  assert.doesNotMatch(await readFile(join(directory, 'proyecto.json'), 'utf8'), /user:secret|ftp:\/\/|quizá/);
  assert.match(streams.text(), /sin usuario, contraseña/);
  assert.match(streams.text(), /Responde sí o no/);
});

test('prioridades reutilizadas activan las integraciones necesarias sin repetir el destino', async t => {
  const root = await fixture(t);
  const { project } = await runAssistant({ root, ...io(answersFor({
    priorities: 'Inicio, tienda y reservas',
    dependencies: ['Pagos sandbox', 'Inventario servidor', 'Recogida', 'Calendario', 'Sin pago online'],
  })), prepareOnly: true });
  assert.deepEqual(project.arquitectura.modulos, ['servicios', 'tienda', 'reservas']);
  assert.equal(project.arquitectura.integraciones.length, 5);
  assert.equal(project.intake.responses.pagos.value, 'Pagos sandbox');
  assert.equal(project.intake.responses.disponibilidad.value, 'Calendario');
});

test('traspaso a CLI y fallback mantienen la modalidad renovación sin una sesión real', async t => {
  const root = await fixture(t);
  const streams = io(answersFor(), true);
  let launched;
  const result = await runAssistant({ root, ...streams, find: async () => 'C:\\fake\\codex.exe', launch: async args => {
    launched = args;
    return { code: 1, signal: null };
  } });
  assert.equal(launched.modality, 'renovacion');
  assert.equal(result.fallback_prompt, true);
  assert.match(codexArguments(root, 'renovar-negocio', launched.modality).at(-1), /lee MIGRACIONES\.md/);
  assert.match(streams.text(), /proyectos\/renovar-negocio\/MIGRACION-SEO\.md/);
  assert.doesNotMatch(codexArguments(root, 'nueva').at(-1), /MIGRACIONES\.md|MIGRACION-SEO\.md/);
});

test('entrevista de renovación incompleta o plantilla faltante no deja proyecto parcial', async t => {
  const root = await fixture(t);
  await assert.rejects(runAssistant({ root, ...io(['2', 'Incompleta', 'https://actual.example.test/']) }), InterviewEnded);
  assert.deepEqual(await readdir(root), ['plantillas']);
  const intake = await interview({ root, ...io(answersFor()) });
  await unlink(join(root, 'plantillas', 'MIGRACION-SEO.md'));
  await assert.rejects(saveProject({ root, intake }), { code: 'ENOENT' });
  assert.deepEqual(await readdir(root), ['plantillas']);
});
