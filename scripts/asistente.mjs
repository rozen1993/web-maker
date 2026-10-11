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
  if (!/^(?:0(?:[.,]\d+)?|1(?:[.,]0+)?)$/.test(text)) throw new Error('Indica un tope para la exploración inicial entre 0 y 1 USD.');
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
    const budgetText = await question('presupuesto', '¿Qué tope acumulado propones SOLO para la pequeña exploración inicial del rubro con DataForSEO?\n0 = sin consultas de pago (predeterminado); sugerido USD 0.10; permitido entre 0 y 1 USD. Este importe no cubre ni autoriza la investigación completa: después recibirás un presupuesto concreto para aprobar. [0]', { fallback: '0', validate: parseBudget });
    const budget = parseBudget(budgetText);
    let authorized = false;
    if (budget > 0) {
      const confirm = await question('confirmacion_datos', `La entrevista está completa. ¿Autorizas expresamente hasta USD ${budget.toFixed(2)} acumulados SOLO para exploracion_inicial, máximo USD 0.10 por intento: hasta 3 intentos SERP (una tarea, depth 10, max_crawl_pages 1, sin extras) y 1 intento de sugerencias (máximo 25 ítems)? Los reintentos cuentan dentro de esos cupos: máximo 1 por consulta y 1 en total.\nLa investigación completa sigue sin autorización; el coordinador cerrará la exploración y te pedirá aprobar su presupuesto (ya gastado + reservas pendientes + máximo adicional = máximo total). Esta autorización no reemplaza tarifas, saldo, registro único ni reconciliación. [no; escribe sí para autorizar]`, { fallback: 'no' });
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
    'Tres mockups de homepage A/B/C con contenido real, escritorio y móvil, URL comprobada y elección registrada; Astra ultra desarrolla después la web completa.',
    'Navegación, enlaces, imágenes, teclado, contraste y flujos críticos comprobados en navegador.',
    'Catálogo completo de skills SEO AgriciDaniel evaluado y auditoría SEO total del alcance aplicable con correcciones verificadas; medición y dependencias faltantes registradas con evidencia.',
    'Exploración inicial cerrada y presupuesto SEO concreto aprobado expresamente antes de la investigación completa.',
    'SEO-STRATEGY.md: oportunidad orgánica sin campaña off-page nueva evaluada antes del diseño; escenarios de clics mensuales a 3/6/12 meses con fuentes y supuestos, o no_estimable justificado.',
    'Recomendaciones off-page opcionales, específicas del rubro y documentadas al cierre; su ejecución no está autorizada ni se presupone en la estimación.',
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
    vistas_a_comprobar: ['homepage_escritorio', 'homepage_movil'],
  };
  project.models = {
    ...project.models,
    produccion: { ...project.models?.produccion, model: 'GPT-6.1 Sol', model_id: 'gpt-6.1-sol', reasoning: 'high', aplica_a: ['coordinacion', 'consultoria_seo', 'investigacion', 'contenido', 'auditoria'], requested: true, selection_verified: false },
    diseno: { ...project.models?.diseno, model: 'GPT-6 Astra', model_id: 'gpt-6-astra', reasoning: 'ultra', agent_role: 'disenador', requested: true, selection_verified: false },
    desarrollo: { ...project.models?.desarrollo, model: 'GPT-6 Astra', model_id: 'gpt-6-astra', reasoning: 'ultra', agent_role: 'desarrollador', requested: true, selection_verified: false },
  };
  project.workflow = {
    ...project.workflow, phase: 'meta', advance_automatically_within_authorization: true,
    phases: project.workflow?.phases ?? ['brief', 'meta', 'exploracion', 'presupuesto_seo', 'investigacion', 'contenido', 'diseno', 'seleccion_visual', 'construccion', 'verificacion_seguimiento'],
    pausas_ordinarias: ['aprobacion_presupuesto_seo', 'seleccion_visual'], pendientes: pending,
    siguiente_accion: 'Mostrar META enriquecida, concretar cantidades pendientes y realizar solo la exploración inicial autorizada; cerrar esa fase y presentar presupuesto SEO para aprobación expresa antes de la investigación completa.',
  };
  delete project.workflow.pausa_ordinaria;
  delete project.workflow.pausa_ordinaria_tras_entrevista;
  project.seo = { ...project.seo, coverage_catalogue: project.seo?.coverage_catalogue ?? [] };
  project.dataforseo = {
    ...project.dataforseo, phase: 'exploracion', budget_usd: intake.budget,
    budget_scope: 'maximo_total_acumulado_del_proyecto_incluida_exploracion_no_mensual', max_call_usd: 0.1,
    policy_status: intake.authorized ? 'solo_exploracion_autorizada_condicionada_a_verificacion_operativa' : 'sin_autorizacion',
    authorization: null, limits: null,
    exploracion: {
      ...project.dataforseo?.exploracion, budget_usd: intake.budget, suggested_budget_usd: 0.1, status: 'pendiente', max_call_usd: 0.1,
      authorization: intake.authorized ? {
        type: 'explicit_interview_confirmation', confirmed_at: now, response: intake.answers.confirmacion_datos.raw,
        project_id: intake.slug, budget_usd: intake.budget, max_call_usd: 0.1,
        endpoint_families: ['labs_keyword_suggestions', 'google_organic_serp'],
        limits_reference: 'AGENTS.md exploración inicial', scope: 'exploracion_inicial',
      } : null,
      limits: {
        all_attempts_include_retries: true,
        labs_keyword_suggestions: { max_attempts: 1, max_items_per_attempt: 25 },
        google_organic_serp: { max_attempts: 3, tasks_per_call: 1, depth: 10, max_crawl_pages: 1, extras: false },
        retries: { max_per_query: 1, max_total_per_site: 1, included_in_endpoint_and_money_limits: true, auto_retry_unknown_cost_or_timeout: false },
      },
    },
    investigacion: {
      ...project.dataforseo?.investigacion, status: 'pendiente_presupuesto', proposal: null, authorization: null,
      additional_budget_usd: null, approved_project_total_usd: null,
    },
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
  return `Inicia el proyecto proyectos/${slug}. Lee AGENTS.md, PERFILES-Y-CALIDAD.md, SEO-COMPLETO.md, plantillas/PRESUPUESTO-SEO.md y plantillas/SEO-STRATEGY.md; en proyectos/${slug}/ lee META.md, ESTADO.md, proyecto.json e INICIAR-CODEX.md. Muestra su META enriquecida y concreta cantidades antes de trabajar. Sol 6.1 high coordina, hace consultoría SEO, contenido y auditoría. Evalúa el catálogo completo de skills SEO AgriciDaniel disponible y registra cobertura aplicable, evidencia y motivos de no_aplica en SEO-COBERTURA.md; no uses herramientas de pago irrelevantes. Realiza solo la pequeña exploración inicial previamente autorizada, cierra sus pagos y presenta en PRESUPUESTO-SEO.md un presupuesto concreto (ya gastado + reservas pendientes + máximo adicional = máximo total, tarifas/endpoints/cantidades/fecha/exclusiones); espera aprobación explícita antes de la investigación completa. Esa aprobación habilita investigación completa y contenido dentro de los límites acordados. Antes del diseño, prepara SEO-STRATEGY.md: evalúa la oportunidad orgánica sin campaña off-page nueva, prioriza búsquedas/páginas con evidencia y estima rangos de clics orgánicos de Google por mes a 3/6/12 meses desde publicación solo con datos y supuestos defendibles; si faltan, registra no_estimable. No presupongas enlaces ni contenido futuro ni conviertas demanda en visitas garantizadas. Al cierre entrega en ese informe recomendaciones off-page opcionales y específicas del rubro, con fuentes, prioridad, esfuerzo, costes conocidos y medición; no ejecutarlas ni asumir su efecto en los escenarios. Para diseño usa el rol disenador si está disponible y verifica Astra ultra: tres mockups de homepage A/B/C con contenido real, escritorio/móvil y URL comprobada; espera elección A/B/C o combinación concreta. Después verifica Astra ultra en el rol desarrollador para implementar TODA la web elegida en Astro + Tailwind CSS + TypeScript. Sol 6.1 high realiza después la auditoría SEO total del alcance aplicable y coordina correcciones con Astra ultra hasta verificar la entrega. Verifica la selección real en cada fase; un prompt no cambia el modelo. Respeta presupuesto y registro compartido, no reinicies autorizaciones/gasto desde otro chat o clon y no prometas rankings. No publiques sin autorización explícita.`;
}

function renderMeta(project) {
  const meta = project.meta;
  return `# META — ${project.project_id}\n\n${meta.objetivo}\n\nIdea: ${project.idea}\n\nAcción principal: ${project.accion_principal}. Idioma: ${project.mercado.idioma}.\n\nEntrega solicitada: ${project.alcance.entrega_solicitada}. ${project.alcance.publicacion_authorization ? "Publicación autorizada expresamente en " + project.alcance.publicacion_authorization.target + "; requiere verificar destino, accesos y alcance." : project.alcance.entrega_prevista === "preview_verificada" ? "Publicación fuera de esta entrega." : "Publicación solicitada: revisar la declaración original y obtener/verificar autorización y destino antes de ejecutar."}\n\nPáginas/funciones declaradas: ${project.intake.responses.paginas_funciones.value}.\nCantidad inicial: ${meta.cantidad_paginas ?? 'pendiente de concretar'}. El coordinador debe distinguir páginas de funciones, fijar rutas y cantidades antes de investigar; mostrar la META enriquecida sin pedir aprobación habitual.\n\n## Partidas y criterios comprobables\n\n${meta.criterios.map(item => `- [ ] ${item}`).join('\n')}\n- [ ] Revisar módulos activos (${project.arquitectura.modulos.join(', ') || 'por clasificar desde la idea'}) contra PERFILES-Y-CALIDAD.md.\n- [ ] Resolver las dependencias esenciales antes de declarar la entrega verificada.\n\n## Dependencias\n\n${meta.dependencias_pendientes.length ? meta.dependencias_pendientes.map(item => `- ${item}`).join('\n') : '- Verificar declaraciones, contactos, materiales e integraciones; ninguna prueba se da por aprobada.'}\n\n## Datos y límites\n\nDataForSEO: tope acumulado inicial USD ${project.dataforseo.exploracion.budget_usd.toFixed(2)} SOLO para la exploración inicial; ${project.dataforseo.exploracion.authorization ? 'autorización expresa de exploracion_inicial registrada, sujeta a tarifas/saldo/registro y cupos' : 'sin autorización de pago'}. La investigación completa está pendiente de presupuesto y aprobación explícita; USD 1 solo es el máximo aceptado para esta mini exploración. No se ha realizado ninguna consulta. Localizar el registro privado original y reconciliar antes de pagar; no crear un registro vacío para sustituir historial.\n\nAl cerrar la exploración, detener sus pagos y presentar PRESUPUESTO-SEO.md: ya gastado + reservas pendientes + máximo adicional = máximo total, precios vigentes, endpoints/cantidades, fecha y exclusiones. Esperar aprobación expresa antes de la investigación completa. Evaluar el catálogo completo de skills SEO AgriciDaniel y mantener SEO-COBERTURA.md. Sol 6.1 high coordina, investiga, prepara contenido y audita; Astra ultra realiza los mockups de homepage y desarrolla toda la web después de tu elección.\n\nLa meta comprueba una entrega; no promete ventas, posiciones ni visitas.\n`;
}

function renderHandoff(project) {
  return `# Iniciar en Codex\n\nPega este prompt en un chat de Codex abierto en la raíz del kit:\n\n\`\`\`text\n${codexPrompt(project.project_id)}\n\`\`\`\n\nModelos solicitados: gpt-6.1-sol high para coordinación, consultoría SEO, contenido y auditoría; gpt-6-astra ultra para mockups y desarrollo completo de la web. Verificar selección real en cada traspaso y registrarla; las flags solicitadas no prueban selección. No cambiar configuración global. Si no existe selección o delegación compatible, preparar un traspaso concreto y decirlo; no atribuir el trabajo a un modelo no comprobado.\n\nEl coordinador lee SEO-COMPLETO.md, plantillas/PRESUPUESTO-SEO.md y plantillas/SEO-STRATEGY.md, además de AGENTS.md; lee astro y frontend-design, evalúa el catálogo completo de skills SEO AgriciDaniel disponible y registra en SEO-COBERTURA.md cada área con su aplicabilidad, evidencia y motivos de no_aplica. Lee las skills al aplicarlas y contrasta APIs/versiones con documentación oficial. Reutiliza la entrevista y muestra la META concreta enriquecida.\n\nPrimera pausa planificada: después de la pequeña exploración inicial dentro de su autorización, cerrar sus pagos y presentar PRESUPUESTO-SEO.md con ya gastado + reservas pendientes + máximo adicional = máximo total, endpoints, cantidades, precios vigentes, fecha y exclusiones. Solicitar aprobación explícita del presupuesto antes de la investigación completa. La confirmación de esta entrevista solo autoriza exploracion_inicial; no existe autorización de investigación completa ni un tope universal de USD 1 para ella. Con presupuesto aprobado, completar investigación y contenido real.\n\nSegunda pausa planificada: Astra ultra, rol disenador, realiza tres propuestas de homepage A/B/C con contenido real y diferencias de composición/tipografía/lenguaje visual, vistas de escritorio y móvil y URL comprobada con capturas/recorridos. Esperar A/B/C o combinación concreta. Tras registrar la elección, Astra ultra, rol desarrollador, implementa toda la web en Astro + Tailwind CSS + TypeScript. Sol 6.1 high realiza la auditoría SEO total aplicable y coordina con Astra las correcciones hasta la entrega verificada.\n\nAvanzar dentro de lo autorizado sin añadir aprobaciones de contenido, arquitectura, programación o pruebas. Si falta una decisión esencial, integración, autorización adicional de pago/publicación o selección del modelo, pausar solo lo dependiente y continuar lo independiente. No convertir tienda con pago en catálogo ni presentar un flujo simulado como operativo. Registrar aprobados, fallos, pendientes y evidencia en ESTADO.md.\n\nCrear CONTENIDO.md, SEO-COBERTURA.md, PRESUPUESTO-SEO.md y SEO-STRATEGY.md cuando corresponda; mantener .seo-cache/ según las skills utilizadas. Reconciliar el registro único de cartera antes de pagos y comprobar la autorización específica de fase en proyecto.json. Conservar historial: otro chat, clon o cuenta no reinicia gasto ni autorizaciones. Este asistente únicamente prepara archivos y solicita una sesión interactiva; no ejecuta herramientas SEO, compras ni publicación. No prometer rankings ni resultados por terminar las fases.\n`;
}

export async function saveProject({ root, intake }) {
  if (projectSlug(intake.name) !== intake.slug || projectSlug(intake.slug) !== intake.slug) {
    throw new Error('La carpeta del proyecto no coincide con su nombre seguro.');
  }
  const template = JSON.parse(await readFile(join(root, 'plantillas', 'proyecto.json'), 'utf8'));
  const project = createProject(template, intake, root);
  const directory = join(root, 'proyectos', intake.slug);
  const meta = renderMeta(project);
  const state = `# ESTADO — ${intake.name}\n\nEstado de entrega: en_construccion.\nEntrevista completada: ${intake.completed_at}.\nMeta: META.md (inicial, concretar cantidades antes de investigar).\nExploración inicial: pendiente; autorización ${project.dataforseo.exploracion.authorization ? 'expresa registrada solo para exploracion_inicial' : 'no concedida'}.\nInvestigación completa: pendiente_presupuesto; autorización no concedida.\nPausas planificadas: aprobación expresa del presupuesto SEO después de explorar; elección A/B/C después de presentar mockups.\nDirección visual: pendiente de elección A/B/C.\nModelos: Sol 6.1 high para coordinación/SEO/contenido/auditoría y Astra ultra para mockups/desarrollo total solicitados; selección no verificada.\n\n## Comprobaciones\n\n- pendiente: contenido, tipos/build, rutas/enlaces, flujos, accesibilidad, auditoría SEO total aplicable, navegador móvil/escritorio. Entorno: todavía no implementado; evidencia: ninguna.\n- pendiente: cobertura del catálogo completo de skills SEO AgriciDaniel en SEO-COBERTURA.md.\n- pendiente: SEO-STRATEGY.md, oportunidad orgánica sin campaña off-page nueva, estimación condicional de clics mensuales a 3/6/12 meses (o no_estimable) y recomendaciones off-page opcionales al cierre. Evidencia: ninguna; no hay resultados de tráfico acreditados ni autorización de ejecución off-page.\n- pendiente: presupuesto concreto en PRESUPUESTO-SEO.md con ya gastado + reservas pendientes + máximo adicional = máximo total, tarifas/endpoints/cantidades/fecha/exclusiones; cerrar pagos de exploración y solicitar aprobación antes de la investigación completa.\n- pendiente: contacto/materiales e integraciones declaradas.\n- pendiente: registro de cartera original y reconciliación antes de pagar.\n${project.alcance.entrega_prevista === "preview_verificada" ? "- no_aplica: publicación fuera de esta entrega de preview." : "- pendiente: publicación; " + (project.alcance.publicacion_authorization ? "autorización expresa registrada para " + project.alcance.publicacion_authorization.target + ", ejecución y verificación pendientes" : "revisar declaración original; autorización/destino pendientes de verificar") + "."}\n\nSiguiente acción: enriquecer y mostrar META, evaluar catálogo SEO completo y realizar solo exploración inicial dentro de autorización; después presentar presupuesto para aprobación expresa.\n`;
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
