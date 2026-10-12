import { mkdir, realpath, lstat, readdir, open, unlink } from 'node:fs/promises';
import { join } from 'node:path';

export async function conProyectoUnico(root, slug, action) {
  const actualRoot = await realpath(root);
  const projects = join(actualRoot, 'proyectos');
  await mkdir(projects, { recursive: true });
  if ((await lstat(projects)).isSymbolicLink() || await realpath(projects) !== projects) {
    throw new Error('La carpeta proyectos resuelve fuera de la raíz o es un enlace.');
  }
  const lockPath = join(projects, '.inicio.lock');
  let lock;
  try { lock = await open(lockPath, 'wx'); }
  catch (error) {
    if (error.code === 'EEXIST') throw new Error('Hay un inicio en curso o un bloqueo pendiente en proyectos/.inicio.lock. Revisarlo antes de continuar.');
    throw error;
  }
  try {
    const names = (await readdir(projects)).filter(name => name !== '.inicio.lock' && !name.startsWith('.plan-'));
    if (names.some(name => name !== slug) || names.length > 1) {
      const error = new Error(`Esta copia admite un solo proyecto. Ya contiene: ${names.join(', ')}. Retómalo o usa otra copia limpia.`);
      error.code = 'ESINGLEPROJECT';
      throw error;
    }
    // No asociar una web huérfana con un brief nuevo por inferencia.
    if (!names.length) {
      const out = join(actualRoot, 'out');
      try {
        if ((await lstat(out)).isSymbolicLink()) throw new Error('out es un enlace; no iniciar sobre un destino ajeno.');
        if ((await readdir(out)).some(name => name !== '.gitkeep')) {
          throw new Error('out ya contiene una web sin ficha. Recuperar su proyecto antes de iniciar otro; no se sobrescribió.');
        }
      } catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    return await action(projects, names.length === 1);
  } finally {
    await lock.close();
    await unlink(lockPath);
  }
}
