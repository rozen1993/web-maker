import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { guardarProyecto } from '../scripts/guardar-proyecto.mjs';

async function fixture(t) {
  const root = await fs.mkdtemp(join(tmpdir(), 'plan-guardado-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const projectsDirectory = join(root, 'proyectos');
  await fs.mkdir(projectsDirectory);
  return { root, projectsDirectory };
}

const files = {
  'proyecto.json': '{"project_id":"mi-web","authorization":null}\n',
  'META.md': '# Meta\n',
  'ESTADO.md': '# Pendiente\n',
  'INICIAR-CODEX.md': '# Traspaso\n',
};
const injected = (code, message = 'Fallo controlado') => Object.assign(new Error(message), { code });

async function assertAbsent(path) {
  await assert.rejects(fs.lstat(path), { code: 'ENOENT' });
}

async function assertContents(directory, expected = files) {
  assert.deepEqual((await fs.readdir(directory)).sort(), Object.keys(expected).sort());
  for (const [filename, body] of Object.entries(expected)) {
    assert.equal(await fs.readFile(join(directory, filename), 'utf8'), body);
  }
}

test('el destino aparece completo solo después del rename', async t => {
  const { projectsDirectory } = await fixture(t);
  const destination = join(projectsDirectory, 'mi-web');
  let writes = 0;
  const result = await guardarProyecto({ projectsDirectory, slug: 'mi-web', files, fs: {
    async writeFile(...args) {
      await assertAbsent(destination);
      writes += 1;
      return fs.writeFile(...args);
    },
    async rename(source, target) {
      assert.equal(writes, 4);
      assert.equal(dirname(source), projectsDirectory);
      assert.equal(target, destination);
      await assertAbsent(target);
      await assertContents(source);
      return fs.rename(source, target);
    },
  } });
  assert.equal(result, destination);
  await assertContents(result);
  assert.deepEqual(await fs.readdir(projectsDirectory), ['mi-web']);
});

test('EIO entre escrituras limpia el temporal y permite reintentar el mismo nombre', async t => {
  const { projectsDirectory } = await fixture(t);
  const originalError = injected('EIO');
  await assert.rejects(guardarProyecto({ projectsDirectory, slug: 'mi-web', files, fs: {
    async writeFile(path, ...args) {
      if (basename(path) === 'META.md') throw originalError;
      return fs.writeFile(path, ...args);
    },
  } }), error => error === originalError);
  await assertAbsent(join(projectsDirectory, 'mi-web'));
  assert.deepEqual(await fs.readdir(projectsDirectory), []);
  await assertContents(await guardarProyecto({ projectsDirectory, slug: 'mi-web', files }));
});

test('fallo al finalizar conserva el error y deja libre el nombre para reintentar', async t => {
  const { projectsDirectory } = await fixture(t);
  const originalError = injected('EACCES', 'Rename bloqueado');
  await assert.rejects(guardarProyecto({ projectsDirectory, slug: 'mi-web', files, fs: {
    async rename() { throw originalError; },
  } }), error => error === originalError);
  await assertAbsent(join(projectsDirectory, 'mi-web'));
  assert.deepEqual(await fs.readdir(projectsDirectory), []);
  await assertContents(await guardarProyecto({ projectsDirectory, slug: 'mi-web', files }));
});

test('dos escritores simultáneos producen exactamente un proyecto completo, sin mezcla', { timeout: 5000 }, async t => {
  const { projectsDirectory } = await fixture(t);
  let release;
  const barrier = new Promise(resolve => { release = resolve; });
  let ready = 0;
  const coordinatedFs = {
    async rename(...args) {
      ready += 1;
      if (ready === 2) release();
      await barrier;
      return fs.rename(...args);
    },
  };
  const variants = ['primero', 'segundo'].map(label => Object.fromEntries(
    Object.keys(files).map(filename => [filename, `${label}:${filename}\n`]),
  ));
  const results = await Promise.allSettled(variants.map(value => guardarProyecto({
    projectsDirectory, slug: 'mi-web', files: value, fs: coordinatedFs,
  })));
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  assert.equal(results.filter(result => result.status === 'rejected').length, 1);
  const winner = results.findIndex(result => result.status === 'fulfilled');
  await assertContents(join(projectsDirectory, 'mi-web'), variants[winner]);
  assert.deepEqual(await fs.readdir(projectsDirectory), ['mi-web']);
});

test('preserva destinos preexistentes vacíos, poblados y archivos', async t => {
  for (const kind of ['empty', 'populated', 'file']) {
    const { projectsDirectory } = await fixture(t);
    const destination = join(projectsDirectory, 'mi-web');
    if (kind === 'file') await fs.writeFile(destination, 'no cambiar');
    else {
      await fs.mkdir(destination);
      if (kind === 'populated') await fs.writeFile(join(destination, 'original.txt'), 'no cambiar');
    }
    await assert.rejects(guardarProyecto({ projectsDirectory, slug: 'mi-web', files }), { code: 'EEXIST' });
    assert.deepEqual(await fs.readdir(projectsDirectory), ['mi-web']);
    if (kind === 'file') assert.equal(await fs.readFile(destination, 'utf8'), 'no cambiar');
    else if (kind === 'empty') assert.deepEqual(await fs.readdir(destination), []);
    else assert.equal(await fs.readFile(join(destination, 'original.txt'), 'utf8'), 'no cambiar');
  }
});

test('preserva un enlace preexistente y su destino', async t => {
  const { root, projectsDirectory } = await fixture(t);
  const external = join(root, 'original');
  const destination = join(projectsDirectory, 'mi-web');
  await fs.mkdir(external);
  await fs.writeFile(join(external, 'original.txt'), 'no cambiar');
  await fs.symlink(external, destination, process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(guardarProyecto({ projectsDirectory, slug: 'mi-web', files }), { code: 'EEXIST' });
  assert.equal((await fs.lstat(destination)).isSymbolicLink(), true);
  assert.deepEqual(await fs.readdir(external), ['original.txt']);
  assert.equal(await fs.readFile(join(external, 'original.txt'), 'utf8'), 'no cambiar');
});

test('rechaza un destino que aparece mientras se escriben los archivos', async t => {
  const { projectsDirectory } = await fixture(t);
  const destination = join(projectsDirectory, 'mi-web');
  await assert.rejects(guardarProyecto({ projectsDirectory, slug: 'mi-web', files, fs: {
    async writeFile(path, ...args) {
      await fs.writeFile(path, ...args);
      if (basename(path) === 'INICIAR-CODEX.md') await fs.mkdir(destination);
    },
  } }), { code: 'EEXIST' });
  assert.deepEqual(await fs.readdir(destination), []);
  assert.deepEqual(await fs.readdir(projectsDirectory), ['mi-web']);
});

test('si también falla limpiar, conserva ambas causas y el temporal no bloquea reintentos', async t => {
  const { projectsDirectory } = await fixture(t);
  const originalError = injected('EIO');
  const cleanupError = injected('EPERM', 'Limpieza bloqueada');
  await assert.rejects(guardarProyecto({ projectsDirectory, slug: 'mi-web', files, fs: {
    async writeFile() { throw originalError; },
    async rm() { throw cleanupError; },
  } }), error => error === originalError && error.cleanupError === cleanupError);
  assert.equal(dirname(originalError.temporaryDirectory), projectsDirectory);
  await assertAbsent(join(projectsDirectory, 'mi-web'));
  await assertContents(await guardarProyecto({ projectsDirectory, slug: 'mi-web', files }));
  assert.equal((await fs.readdir(projectsDirectory)).includes(basename(originalError.temporaryDirectory)), true);
});

test('temporales huérfanos ajenos se conservan y no ocupan el nombre del proyecto', async t => {
  const { projectsDirectory } = await fixture(t);
  const orphan = join(projectsDirectory, '.plan-mi-web-huerfano');
  await fs.mkdir(orphan);
  await fs.writeFile(join(orphan, 'proyecto.json'), 'borrador incompleto');
  await assertContents(await guardarProyecto({ projectsDirectory, slug: 'mi-web', files }));
  assert.equal(await fs.readFile(join(orphan, 'proyecto.json'), 'utf8'), 'borrador incompleto');
});

test('no limpia un temporal reemplazado por un enlace hacia otra carpeta', async t => {
  const { root, projectsDirectory } = await fixture(t);
  const otherDirectory = join(root, 'otros-datos');
  await fs.mkdir(otherDirectory);
  await fs.writeFile(join(otherDirectory, 'conservar.txt'), 'no cambiar');
  const originalError = injected('EIO');
  let cleanupCalled = false;
  await assert.rejects(guardarProyecto({ projectsDirectory, slug: 'mi-web', files, fs: {
    async writeFile(path) {
      const temporary = dirname(path);
      // El fixture sustituye únicamente el temporal vacío de esta invocación.
      assert.equal(dirname(temporary), projectsDirectory);
      await fs.rmdir(temporary);
      await fs.symlink(otherDirectory, temporary, process.platform === 'win32' ? 'junction' : 'dir');
      throw originalError;
    },
    async rm(...args) { cleanupCalled = true; return fs.rm(...args); },
  } }), error => error === originalError && /destino cambió/.test(error.cleanupError?.message));
  assert.equal(cleanupCalled, false);
  await assertAbsent(join(projectsDirectory, 'mi-web'));
  assert.equal(await fs.readFile(join(otherDirectory, 'conservar.txt'), 'utf8'), 'no cambiar');
});

test('rechaza rutas o proyectos vacíos antes de crear temporales', async t => {
  const { projectsDirectory } = await fixture(t);
  for (const arguments_ of [
    { slug: '../salida', files },
    { slug: 'mi-web', files: { '../salida': 'texto' } },
    { slug: 'mi-web', files: { 'C:\\salida': 'texto' } },
    { slug: 'mi-web', files: {} },
    { slug: 'mi-web', files: { 'META.md': null } },
  ]) await assert.rejects(guardarProyecto({ projectsDirectory, ...arguments_ }));
  assert.deepEqual(await fs.readdir(projectsDirectory), []);
});
