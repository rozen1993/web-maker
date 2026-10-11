import { createInterface } from 'node:readline';
import { readFile, mkdir, writeFile, access, realpath } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve, join, delimiter, extname, relative, isAbsolute } from 'node:path';
import { spawn } from 'node:child_process';

export class InterviewEnded extends Error {
  constructor() { super('Entrevista incompleta. No se guardó ningún proyecto ni autorización.'); }
}

export function projectSlug(name) {
  const value = name.trim();
  if (!value || /[\\/<>:"|?*\u0000-\u001f]/u.test(value) || value.includes('..') || /[. ]$/u.test(value)) {
    throw new Error('Usa un nombre, sin rutas, puntos finales ni caracteres reservados.');
  }
  const slug = value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!slug || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:-|$)/i.test(slug)) {
    throw new Error('El nombre no produce una carpeta segura; elige otro nombre.');
  }
  if (slug.length > 80) throw new Error('Usa un nombre de hasta 80 caracteres para la carpeta.');
  return slug;
}

const normalize = value => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
const list = value => value.split(/[,;\n]/).map(item => item.trim()).filter(Boolean);
const actions = {
  '1': 'contactar', '2': 'vender online', '3': 'catálogo y pedidos',
  '4': 'leer artículos', '5': 'reservas', '6': 'recursos y directorio',
};
const positiveText = value => normalize(value).split(/[,;.\n]/)
  .map(segment => segment.replace(/\b(?:sin|no|ni)\b[^,;.\n]*/g, '')).join('; ');
const requestsPublication = value => /public|despleg|deploy|produccion|dominio|hosting/.test(positiveText(value));

function expandAction(value) {
  if (/^[1-6](?:\s*(?:,|\+|y)\s*[1-6])*$/i.test(value)) {
    return [...new Set(value.match(/[1-6]/g))].map(number => actions[number]).join(' y ');
  }
  return value;
}

export function inferModules(action, functions = '') {
  // Descarta el tramo negado de cada frase: "tienda sin cuentas" conserva
  // tienda; "sin tienda ni cuentas ni reservas" no solicita esos módulos.
  const text = positiveText(`${action}; ${functions}`);
  const modules = new Set();
  if (/contactar|servicios|cotiz|contacto/.test(text)) modules.add('servicios');
  if (/portfolio|portafolio/.test(text)) modules.add('portfolio');
  if (/leer|articulo|blog/.test(text)) modules.add('blog');
  if (/catalogo|pedidos/.test(text)) modules.add('catalogo');
  if (/vender online|venta online|comprar online|comprar en linea|compra en linea|comprar por internet|tienda|pago online|cobrar online|checkout|carrito/.test(text)) modules.add('tienda');
  if (/reserva|cita|turno/.test(text)) modules.add('reservas');
  if (/recursos|directorio/.test(text)) modules.add('directorio_recursos');
  if (/cuentas|registro de usuarios|iniciar sesion/.test(text)) modules.add('cuentas');
  return [...modules];
}

export function parseBudget(value) {
  const text = value.trim();
  if (text === '') return 0;
  if (!/^(?:0(?:[.,]\d+)?|1(?:[.,]0+)?)$/.test(text)) throw new Error('Indica 0, 1 u otro importe entre 0 y 1 USD.');
  return Number(text.replace(',', '.'));
}

export async function interview({ input = process.stdin, output = process.stdout, root }) {
  const readline = createInterface({ input, crlfDelay: Infinity, terminal: false });
  // Un único iterador conserva también líneas que llegan juntas por una tubería.
  const lines = readline[Symbol.asyncIterator]();
  const answers = {};
  const started = new Date().toISOString();
  async function question(key, label, { fallback, validate, required = false } = {}) {
    for (;;) {
      output.write(`\n${label}\n> `);
      const next = await lines.next();
      if (next.done) throw new InterviewEnded();
      const raw = next.value.trim();
      const value = raw || fallback || '';
      try {
        if (required && !value) throw new Error('Esta respuesta es necesaria para definir la web.');
        if (validate) await validate(value);
        answers[key] = { raw, value };
        return value;
      } catch (error) { output.write(`${error.message}\n`); }
    }
  }
  try {
    output.write('Crear una ficha y una meta para tu web. Responde una pregunta cada vez.\nEnter acepta el valor indicado; Ctrl+C cancela. El asistente no consulta APIs ni publica.\n');
    const name = await question('nombre', '¿Cómo se llama el proyecto?', {
      required: true, validate: async value => {
        const slug = projectSlug(value);
        try { await access(join(root, 'proyectos', slug)); }
        catch (error) { if (error.code === 'ENOENT') return; throw error; }
        throw new Error(`Ya existe proyectos/${slug}. Elige otro nombre; no se sobrescribirá.`);
      },
    });
    const idea = await question('idea', '¿Qué web quieres crear y qué necesidad resuelve?', { required: true });
    const audience = await question('publico', '¿Para quién es la web?', { required: true });
    const country = await question('pais', '¿En qué país o países estará su público?', { required: true });
    const zone = await question('zona', '¿Qué ciudad o zona cubre? [todo el país]', { fallback: 'todo el país' });
    const language = await question('idioma', '¿En qué idioma estará? [español]', { fallback: 'español' });
    const rawAction = await question('accion', '¿Qué debe hacer principalmente quien visite la web?\n1 contactar · 2 comprar online · 3 ver catálogo/pedir · 4 leer · 5 reservar · 6 explorar recursos\nEscribe un número o una combinación concreta.', { required: true });
    const action = expandAction(rawAction);
    const pages = await question('paginas_funciones', '¿Qué páginas y funciones quieres? Sepáralas con comas. [definir según la idea]', { fallback: 'definir según la idea' });
    const materials = await question('materiales', '¿Qué textos, fotos, identidad y datos reales tienes? [pendiente]', { fallback: 'pendiente' });
    const contact = await question('contacto', '¿Qué contacto real o destino recibirá las acciones? [pendiente]', { fallback: 'pendiente' });
    const references = await question('referencias', '¿Qué referencias visuales o web existente quieres conservar? [ninguna]', { fallback: 'ninguna' });
    const editing = await question('edicion', '¿Quién actualizará el contenido y necesita un panel? [archivos, sin panel]', { fallback: 'archivos, sin panel' });
    const modules = inferModules(action, pages);
    const dependencies = {};
    if (modules.includes('tienda')) {
      dependencies.pagos = await question('pagos', '¿Qué proveedor de pagos tienes y está disponible su modo de prueba? [por elegir]', { fallback: 'por elegir' });
      dependencies.stock = await question('stock', '¿Dónde se validan precios y stock actual al comprar? [pendiente]', { fallback: 'pendiente' });
      dependencies.envios = await question('envios', '¿Qué zonas, costes y reglas de envío o recogida aplican? [pendiente]', { fallback: 'pendiente' });
    } else if (modules.includes('catalogo')) {
      dependencies.pedidos = await question('pedidos', '¿Cómo se recibe un pedido y de dónde salen precios/disponibilidad? [pendiente]', { fallback: 'pendiente' });
    }
    if (modules.includes('reservas')) {
      dependencies.disponibilidad = await question('disponibilidad', '¿Qué sistema confirma disponibilidad y registra reservas? [por elegir]', { fallback: 'por elegir' });
      dependencies.pago_reserva = await question('pago_reserva', '¿Se paga al reservar? Indica proveedor si corresponde. [sin pago online]', { fallback: 'sin pago online' });
    }
    const delivery = await question('entrega', '¿Qué alcance de entrega necesitas? [preview local verificada; publicar requiere autorización aparte]', { fallback: 'preview local verificada' });
    const publication = { requested: requestsPublication(delivery), target: null, authorized: false };
    if (publication.requested) {
      publication.target = await question('destino_publicacion', '¿En qué destino concreto quieres publicar (dominio/proyecto/proveedor existente)? [pendiente]', { fallback: 'pendiente' });
      const confirmation = await question('confirmacion_publicacion', `¿Autorizas expresamente publicar esta web en ${publication.target}, tras verificar el alcance, sin contratar servicios ni activar cobros? [no; escribe sí para autorizar]`, { fallback: 'no' });
      publication.authorized = /^(si|sí)$/iu.test(confirmation) && !missing(publication.target);
    }
    const budgetText = await question('presupuesto', '¿Qué presupuesto acumulado autorizas como máximo para DataForSEO en esta investigación?\n0 = sin consultas de pago (predeterminado); 1 = perfil base; otro importe de 0 a 1 USD. [0]', { fallback: '0', validate: parseBudget });
    const budget = parseBudget(budgetText);
    let authorized = false;
    if (budget > 0) {
      const confirm = await question('confirmacion_datos', `La entrevista está completa. ¿Autorizas expresamente hasta USD ${budget.toFixed(2)} acumulados para esta web, máximo USD 0.10 por intento y solo los endpoints/cupos del perfil base de AGENTS.md?\nLa autorización no reemplaza tarifas, saldo, registro único ni reconciliación. [no; escribe sí para autorizar]`, { fallback: 'no' });
      authorized = /^(si|sí)$/iu.test(confirm);
    }
    return {
      name, slug: projectSlug(name), idea, audience, country, zone, language, action,
      pages, materials, contact, references, editing, modules, dependencies, delivery,
      budget, authorized, publication, answers, started_at: started, completed_at: new Date().toISOString(),
    };
  } finally { readline.close(); }
}

const missing = value => /^(pendiente|por elegir|ninguna)$/i.test(value);

export function createProject(template, intake, root) {
  const project = structuredClone(template);
  const now = intake.completed_at;
  const pending = [];
  if (missing(intake.materials)) pending.push('Recibir y verificar materiales reales; no inventar pruebas comerciales.');
  if (missing(intake.contact)) pending.push('Definir contacto y verificar recepción del flujo principal.');
  const publicationRequested = Boolean(intake.publication?.requested);
  const publicationAuthorization = intake.publication?.authorized ? {
    type: 'explicit_interview_confirmation', confirmed_at: now,
    response: intake.answers.confirmacion_publicacion.raw, target: intake.publication.target,
    project_id: intake.slug, scope: 'publicar_web_tras_verificar_alcance',
    contract_services: false, activate_charges: false,
  } : null;
  if (publicationRequested) pending.push(`Publicación solicitada en ${intake.publication.target}: verificar destino, accesos y alcance${publicationAuthorization ? '; autorización expresa registrada' : '; autorización declarada pendiente de confirmación o verificación del destino'}. La preview local no cumple esta solicitud por sí sola.`);
  for (const [name, value] of Object.entries(intake.dependencies)) {
    pending.push(`${name}: ${value}. Verificar integración y operación en modo de prueba cuando corresponda.`);
  }
  if (/panel|cms/i.test(intake.editing) && !/sin panel/i.test(intake.editing)) pending.push('Definir acceso y proveedor del panel solicitado; no contratar por inferencia.');
  const pagesDefined = intake.pages !== 'definir según la idea';
  const pages = pagesDefined ? list(intake.pages) : [];
  const criteria = [
    'Contenido real y acción principal definida en cada página acordada.',
    'Astro + Tailwind CSS + TypeScript; datos centralizados, tipos y build aprobados.',
    'Tres mockups A/B/C con contenido real, escritorio, móvil e interior representativo; elección registrada.',
    'Navegación, enlaces, imágenes, teclado, contraste y flujos críticos comprobados en navegador.',
    'SEO técnico comprobado; medición y dependencias faltantes registradas con evidencia.',
  ];
  Object.assign(project, {
    status: 'brief_completado', project_id: intake.slug, campaign_id: `${intake.slug}-inicial`,
    idea: intake.idea, publico: intake.audience, accion_principal: intake.action,
  });
  project.mercado = { ...project.mercado, pais: intake.country, ciudad_o_zona: intake.zone, idioma: intake.language, dispositivo_serp: null };
  project.alcance = {
    ...project.alcance, objetivo: `Crear ${intake.name} para ${intake.audience} en ${intake.country} (${intake.zone}), orientada a ${intake.action}.`,
    meta_documento: 'META.md',
    entrega_prevista: publicationRequested ? (publicationAuthorization ? 'publicada_verificada' : 'publicacion_solicitada_pendiente_autorizacion') : 'preview_verificada',
    paginas: pages, materiales_declarados: intake.materials, contacto_declarado: intake.contact,
    criterios_entrega: criteria, entrega_solicitada: intake.delivery, publicacion_authorization: publicationAuthorization,
  };
  project.arquitectura = {
    ...project.arquitectura, modulos: intake.modules, edicion_contenido: intake.editing,
    integraciones: Object.entries(intake.dependencies).map(([tipo, declaracion]) => ({ tipo, declaracion, estado: 'pendiente' })),
    dependencias_pendientes: pending,
  };
  project.diseno = {
    ...project.diseno, referencias: intake.references === 'ninguna' ? [] : list(intake.references),
    propuestas: ['A', 'B', 'C'], direccion_seleccionada: null,
    vistas_a_comprobar: ['escritorio', 'movil', 'interior_representativo'],
  };
  project.models = {
    ...project.models,
    produccion: { ...project.models?.produccion, model: 'GPT-6.1 Sol', model_id: 'gpt-6.1-sol', reasoning: 'high', requested: true, selection_verified: false },
    diseno: { ...project.models?.diseno, model: 'GPT-6 Astra', model_id: 'gpt-6-astra', reasoning: 'ultra', agent_role: 'disenador', requested: true, selection_verified: false },
  };
  project.workflow = {
    ...project.workflow, phase: 'meta', advance_automatically_within_authorization: true,
    pausa_ordinaria: 'eleccion_visual_A_B_C', pendientes: pending,
    siguiente_accion: 'Mostrar META enriquecida, concretar cantidades pendientes y avanzar con investigación/contenido dentro de autorización.',
  };
  project.dataforseo = {
    ...project.dataforseo, budget_usd: intake.budget,
    policy_status: intake.authorized ? 'autorizada_condicionada_a_verificacion_operativa' : 'sin_autorizacion',
    authorization: intake.authorized ? {
      type: 'explicit_interview_confirmation', confirmed_at: now, response: intake.answers.confirmacion_datos.raw,
      project_id: intake.slug, budget_usd: intake.budget, max_call_usd: 0.1,
      endpoint_families: ['labs_keyword_suggestions', 'google_ads_search_volume', 'google_organic_serp'],
      limits_reference: 'AGENTS.md perfil base', scope: 'investigacion_inicial_acumulada_por_sitio',
    } : null,
    control_root: '.', control_root_base: 'kit_repository_root',
    shared_ledger_candidate_absolute_path: resolve(root, '.control', 'dataforseo.jsonl'),
    shared_ledger_resolved_path: null,
    ledger_status: 'pendiente_localizar_original_o_confirmar_cartera_nueva_y_reconciliar',
    totals_reconciled: false, totals_reconciled_at: null, remaining_budget_usd_verified: null,
  };
  project.intake = { version: 1, source: 'asistente_cli_local', started_at: intake.started_at, completed_at: now, responses: intake.answers };
  project.meta = {
    created_at: now, status: 'inicial_por_concretar_con_el_contenido', objetivo: project.alcance.objetivo,
    paginas_solicitadas: pages, cantidad_paginas: pagesDefined ? pages.length : null,
    cantidades_pendientes: pagesDefined ? ['Concretar rutas y distinguir páginas de funciones antes de investigar.'] : ['Concretar cantidad, rutas y funciones antes de investigar.'],
    mockups: 3, variantes: ['A', 'B', 'C'], criterios: criteria, dependencias_pendientes: pending,
  };
  return project;
}

export function codexPrompt(slug) {
  return `Inicia el proyecto proyectos/${slug}. Lee AGENTS.md y PERFILES-Y-CALIDAD.md; en proyectos/${slug}/ lee META.md, ESTADO.md, proyecto.json e INICIAR-CODEX.md. Muestra su META enriquecida antes de trabajar y concreta cantidades pendientes. Avanza automáticamente con Sol 6.1 high en contenido, SEO y programación. Para diseño usa el rol disenador si está disponible y verifica Astra ultra: tres mockups reales A/B/C, escritorio/móvil/interior, comprobados en navegador; pausa para la elección visual. Después vuelve a Sol 6.1 high y termina el alcance autorizado. Verifica la selección real; un prompt no cambia el modelo. Respeta presupuesto y registro compartido. No publiques sin autorización explícita.`;
}

function renderMeta(project) {
  const meta = project.meta;
  return `# META — ${project.project_id}\n\n${meta.objetivo}\n\nIdea: ${project.idea}\n\nAcción principal: ${project.accion_principal}. Idioma: ${project.mercado.idioma}.\n\nEntrega solicitada: ${project.alcance.entrega_solicitada}. ${project.alcance.publicacion_authorization ? "Publicación autorizada expresamente en " + project.alcance.publicacion_authorization.target + "; requiere verificar destino, accesos y alcance." : project.alcance.entrega_prevista === "preview_verificada" ? "Publicación fuera de esta entrega." : "Publicación solicitada: revisar la declaración original y obtener/verificar autorización y destino antes de ejecutar."}\n\nPáginas/funciones declaradas: ${project.intake.responses.paginas_funciones.value}.\nCantidad inicial: ${meta.cantidad_paginas ?? 'pendiente de concretar'}. El coordinador debe distinguir páginas de funciones, fijar rutas y cantidades antes de investigar; mostrar la META enriquecida sin pedir aprobación habitual.\n\n## Partidas y criterios comprobables\n\n${meta.criterios.map(item => `- [ ] ${item}`).join('\n')}\n- [ ] Revisar módulos activos (${project.arquitectura.modulos.join(', ') || 'por clasificar desde la idea'}) contra PERFILES-Y-CALIDAD.md.\n- [ ] Resolver las dependencias esenciales antes de declarar la entrega verificada.\n\n## Dependencias\n\n${meta.dependencias_pendientes.length ? meta.dependencias_pendientes.map(item => `- ${item}`).join('\n') : '- Verificar declaraciones, contactos, materiales e integraciones; ninguna prueba se da por aprobada.'}\n\n## Datos y límites\n\nDataForSEO: máximo propuesto USD ${project.dataforseo.budget_usd.toFixed(2)}; ${project.dataforseo.authorization ? 'autorización expresa registrada, sujeta a verificación de tarifas/saldo/registro y cupos' : 'sin autorización de pago'}. No se ha realizado ninguna consulta. Localizar el registro privado original y reconciliar antes de pagar; no crear un registro vacío para sustituir historial.\n\nLa meta comprueba una entrega; no promete ventas, posiciones ni visitas.\n`;
}

function renderHandoff(project) {
  return `# Iniciar en Codex\n\nPega este prompt en un chat de Codex abierto en la raíz del kit:\n\n\`\`\`text\n${codexPrompt(project.project_id)}\n\`\`\`\n\nModelos solicitados: gpt-6.1-sol high para producción; gpt-6-astra ultra para diseño. Verificar selección real en cada traspaso y registrarla; las flags solicitadas no prueban selección. No cambiar configuración global. Si no existe selección o delegación compatible, preparar un traspaso concreto y decirlo; no atribuir el trabajo a un modelo no comprobado.\n\nEl coordinador lee las skills astro y frontend-design y las skills SEO necesarias disponibles, contrasta APIs/versiones con documentación oficial y reutiliza la entrevista. Muestra primero la meta concreta enriquecida y trabaja hasta terminar el alcance. Elabora contenido real antes del diseño. Astra ultra realiza tres propuestas distintas A/B/C con vistas de escritorio, móvil e interior representativo, abre los mockups y verifica capturas/recorridos en navegador. La única pausa ordinaria es la elección A/B/C o combinación concreta. Después Sol 6.1 high implementa y verifica la dirección elegida en Astro + Tailwind CSS + TypeScript.\n\nAvanzar dentro de lo autorizado sin pedir aprobación por fase. Si falta una decisión esencial, una integración, autorización adicional de pago/publicación o selección del modelo, pausar solo lo dependiente y continuar lo independiente. No convertir tienda con pago en catálogo ni presentar un flujo simulado como operativo. Registrar aprobados, fallos, pendientes y evidencia en ESTADO.md.\n\nCrear CONTENIDO.md y mantener .seo-cache/ según las skills utilizadas. Reconciliar el registro único de cartera antes de pagos, comprobar la autorización de proyecto.json y conservar historial. Este asistente únicamente prepara archivos y solicita una sesión interactiva; no ejecuta herramientas SEO, compras ni publicación.\n`;
}

export async function saveProject({ root, intake }) {
  if (projectSlug(intake.name) !== intake.slug || projectSlug(intake.slug) !== intake.slug) {
    throw new Error('La carpeta del proyecto no coincide con su nombre seguro.');
  }
  const template = JSON.parse(await readFile(join(root, 'plantillas', 'proyecto.json'), 'utf8'));
  const project = createProject(template, intake, root);
  const directory = join(root, 'proyectos', intake.slug);
  const meta = renderMeta(project);
  const state = `# ESTADO — ${intake.name}\n\nEstado de entrega: en_construccion.\nEntrevista completada: ${intake.completed_at}.\nMeta: META.md (inicial, concretar cantidades antes de investigar).\nDirección visual: pendiente de elección A/B/C.\nModelos: Sol 6.1 high y Astra ultra solicitados; selección no verificada.\n\n## Comprobaciones\n\n- pendiente: contenido, tipos/build, rutas/enlaces, flujos, accesibilidad, SEO, navegador móvil/escritorio. Entorno: todavía no implementado; evidencia: ninguna.\n- pendiente: contacto/materiales e integraciones declaradas.\n- pendiente: registro de cartera original y reconciliación antes de pagar.\n- pendiente: publicación; ${project.alcance.publicacion_authorization ? "autorización expresa registrada para " + project.alcance.publicacion_authorization.target + ", ejecución y verificación pendientes" : "revisar declaración original; autorización/destino pendientes de verificar"}.\n\nSiguiente acción: enriquecer y mostrar META, después investigación y contenido dentro del alcance autorizado.\n`;
  await mkdir(join(root, 'proyectos'), { recursive: true });
  const [actualRoot, actualProjects] = await Promise.all([realpath(root), realpath(join(root, 'proyectos'))]);
  const projectsRelative = relative(actualRoot, actualProjects);
  if (!projectsRelative || projectsRelative === '..' || projectsRelative.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) || isAbsolute(projectsRelative)) {
    throw new Error('La carpeta proyectos resuelve fuera de la raíz del kit; no se guardó la ficha.');
  }
  // Creación exclusiva: una colisión, incluso entre procesos, nunca sobrescribe.
  await mkdir(directory);
  for (const [filename, body] of Object.entries({
    'proyecto.json': `${JSON.stringify(project, null, 2)}\n`, 'META.md': meta,
    'ESTADO.md': state, 'INICIAR-CODEX.md': renderHandoff(project),
  })) await writeFile(join(directory, filename), body, { encoding: 'utf8', flag: 'wx' });
  return { project, directory, meta };
}

export function codexArguments(root, slug) {
  return ['-C', resolve(root), '-m', 'gpt-6.1-sol', '-c', 'model_reasoning_effort="high"', codexPrompt(slug)];
}

export async function findCodex({ platform = process.platform, env = process.env } = {}) {
  const name = platform === 'win32' ? 'codex.exe' : 'codex';
  for (const directory of (env.PATH || env.Path || '').split(platform === 'win32' ? ';' : delimiter).filter(Boolean)) {
    const candidate = join(directory.replace(/^"|"$/g, ''), name);
    try { await access(candidate, platform === 'win32' ? constants.F_OK : constants.X_OK); return candidate; }
    catch { /* siguiente entrada del PATH */ }
  }
  return null;
}

export async function launchCodex({ root, slug, command, spawnImpl = spawn }) {
  if (!command || (process.platform === 'win32' && extname(command).toLowerCase() !== '.exe')) {
    throw new Error('El lanzamiento necesita un binario nativo; no se ejecutan envoltorios .cmd.');
  }
  return new Promise((resolveResult, reject) => {
    const child = spawnImpl(command, codexArguments(root, slug), { cwd: root, stdio: 'inherit', shell: false });
    child.once('error', reject);
    child.once('exit', (code, signal) => resolveResult({ code, signal }));
  });
}

export async function runAssistant({ root, input = process.stdin, output = process.stdout, prepareOnly = false, find = findCodex, launch = launchCodex }) {
  const intake = await interview({ input, output, root });
  const saved = await saveProject({ root, intake });
  output.write(`\n${saved.meta}\nFicha guardada en ${saved.directory}\n`);
  if (!prepareOnly && input.isTTY && output.isTTY) {
    const command = await find();
    if (command) {
      output.write('\nAbriendo Codex interactivo con Sol 6.1 high solicitado. La selección debe comprobarse en la sesión.\n');
      try {
        const result = await launch({ root, slug: intake.slug, command });
        if (result.code !== 0) {
          output.write(`Codex terminó sin completar el inicio (código ${result.code ?? result.signal}). La ficha permanece guardada.\nAbre un chat de Codex en ${resolve(root)} y pega exactamente:\n\n${codexPrompt(intake.slug)}\n`);
          return { ...saved, launched: false, launch_result: result, fallback_prompt: true };
        }
        return { ...saved, launched: true, launch_result: result };
      } catch (error) { output.write(`No pudo abrirse Codex: ${error.message}. La ficha permanece guardada.\n`); }
    }
  }
  output.write(`\n${prepareOnly ? 'Preparación terminada.' : 'Sin binario nativo disponible o sin terminal interactiva.'} Abre un chat de Codex en ${resolve(root)} y pega exactamente:\n\n${codexPrompt(intake.slug)}\n`);
  return { ...saved, launched: false };
}

export async function main({ root, args = process.argv.slice(2), input = process.stdin, output = process.stdout } = {}) {
  if (args.includes('--help') || args.includes('-h')) {
    output.write('Uso: node iniciar.mjs [--solo-preparar]\n\nEntrevista una pregunta cada vez, muestra META y guarda una ficha nueva en proyectos/<nombre>.\nPor defecto abre Codex interactivo si hay TTY y binario nativo en PATH.\n--solo-preparar  Guarda ficha y prompt sin abrir Codex.\n--help           Muestra esta ayuda.\nNo crea la web ni ejecuta consultas, pagos o publicaciones; no toca el registro de gastos.\n');
    return;
  }
  if (args.some(arg => arg !== '--solo-preparar')) {
    output.write('Opción desconocida. Usa node iniciar.mjs --help.\n'); process.exitCode = 1; return;
  }
  try { await runAssistant({ root, input, output, prepareOnly: args.includes('--solo-preparar') }); }
  catch (error) { output.write(`\n${error.message}\n`); process.exitCode = 1; }
}
