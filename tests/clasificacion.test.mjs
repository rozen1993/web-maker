import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PassThrough } from 'node:stream';
import { inferModules, interview } from '../scripts/asistente.mjs';

test('clasifica palabras completas y conserva flexiones habituales', () => {
  for (const [request, expected] of [
    ['solicitar presupuesto', ['servicios']],
    ['pedir un presupuesto', ['servicios']],
    ['cotizar y solicitar una cotización', ['servicios']],
    ['reservar citas y ver turnos', ['reservas']],
    ['reservas y reservaciones', ['reservas']],
    ['leer artículos en el blog', ['blog']],
    ['tienda y comprar en línea', ['tienda']],
    ['catálogo de pedidos', ['catalogo']],
    ['portafolio y directorio de recursos', ['portfolio', 'directorio_recursos']],
    ['solicitar requisitos, artículos reservados y estilo nocturno', ['blog']],
    ['solicitar acreditación; opiniones de bloggers', []],
  ]) assert.deepEqual(inferModules(request), expected, request);
});

test('las negaciones afectan a su lista y respetan peticiones positivas posteriores', () => {
  for (const [request, expected] of [
    ['tienda sin cuentas y con reservas', ['tienda', 'reservas']],
    ['no tienda pero sí blog', ['blog']],
    ['sin tienda ni cuentas ni reservas', []],
    ['blog, sin tienda ni cuentas, reservas', ['blog', 'reservas']],
    ['no quiero tienda ni reservas pero sí artículos', ['blog']],
    ['sin tienda pero no blog', []],
    ['sin tienda y sin cuentas y con reservas', ['reservas']],
    ['tienda sin cuentas ni reservas', ['tienda']],
    ['no solo tienda sino también blog', ['blog', 'tienda']],
    ['no necesito tienda y tampoco reservas; blog', ['blog']],
  ]) assert.deepEqual(inferModules(request), expected, request);
  assert.deepEqual(inferModules('contactar', 'sin tienda ni cuentas ni reservas'), ['servicios']);
});

async function runInterview(t, { action, pages, dependencies = [], delivery = '', publication = [] }) {
  const root = await mkdtemp(join(tmpdir(), 'plan-clasificacion-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const input = new PassThrough();
  const output = new PassThrough();
  let transcript = '';
  output.on('data', data => { transcript += data.toString(); });
  input.end([
    '1', 'Prueba', 'Una web de prueba', 'Clientes', 'Perú', 'Lima', '',
    action, pages, 'Fotos propias', 'contacto@example.test', '', '',
    ...dependencies, delivery, ...publication, '0',
  ].join('\n') + '\n');
  const intake = await interview({ root, input, output });
  return { intake, transcript };
}

test('solicitar presupuesto no desvía la entrevista hacia reservas', async t => {
  const { intake, transcript } = await runInterview(t, {
    action: 'solicitar presupuesto', pages: 'Inicio, Servicios, Contacto',
  });
  assert.deepEqual(intake.modules, ['servicios']);
  assert.deepEqual(intake.dependencies, {});
  assert.doesNotMatch(transcript, /registra reservas|proveedor de pagos/);
  assert.equal(intake.budget, 0);
});

test('la entrevista conserva las dependencias de tienda y reservas tras excluir cuentas', async t => {
  const { intake } = await runInterview(t, {
    action: 'comprar online', pages: 'tienda sin cuentas y con reservas',
    dependencies: ['Pagos en sandbox', 'Inventario', 'Recogida', 'Calendario', 'Sin pago'],
  });
  assert.deepEqual(intake.modules, ['tienda', 'reservas']);
  assert.equal(intake.dependencies.pagos, 'Pagos en sandbox');
  assert.equal(intake.dependencies.disponibilidad, 'Calendario');
  assert.equal(intake.dependencies.pago_reserva, 'Sin pago');
  assert.equal(intake.budget, 0);
});

test('las cláusulas negativas de publicación no producen solicitud ni autorización', async t => {
  for (const delivery of [
    'No publicar con dominio propio',
    'No publicar ni desplegar; solo preview',
    'Preview sin dominio ni hosting',
    'No publicar pero sí revisar la preview',
    'Sin publicación y con diseño terminado',
  ]) {
    const { intake, transcript } = await runInterview(t, {
      action: 'contactar', pages: 'Inicio', delivery,
    });
    assert.equal(intake.publication.requested, false, delivery);
    assert.equal(intake.publication.authorized, false, delivery);
    assert.doesNotMatch(transcript, /Autorizas expresamente publicar/, delivery);
  }
});

test('un contraste positivo de publicación sigue exigiendo confirmación expresa', async t => {
  for (const [response, expected] of [['no', false], ['sí', true]]) {
    const { intake, transcript } = await runInterview(t, {
      action: 'contactar', pages: 'Inicio', delivery: 'No solo preview, sino publicar',
      publication: ['https://ejemplo.test', response],
    });
    assert.equal(intake.publication.requested, true);
    assert.equal(intake.publication.authorized, expected);
    assert.match(transcript, /Autorizas expresamente publicar/);
  }
});
