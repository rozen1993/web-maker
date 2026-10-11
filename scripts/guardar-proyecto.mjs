import * as filesystem from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';

function existingProject(directory) {
  const error = new Error(`Ya existe un proyecto o una entrada en ${directory}; no se sobrescribió.`);
  error.code = 'EEXIST';
  error.path = directory;
  return error;
}

async function requireAbsent(fs, directory) {
  try { await fs.lstat(directory); }
  catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
  throw existingProject(directory);
}

// Solo se elimina el temporal creado por esta operación, nunca un proyecto final
// ni temporales ajenos. Comprobar tanto el nombre como su destino real evita
// seguir un enlace al limpiar; no constituye defensa frente a un actor hostil
// que cambie las rutas entre las comprobaciones y las operaciones del sistema.
async function removeOwnTemporary(fs, temporaryDirectory, projectsDirectory, prefix) {
  const absolute = resolve(temporaryDirectory);
  if (dirname(absolute) !== projectsDirectory || !basename(absolute).startsWith(prefix)) {
    throw new Error('Se rechazó limpiar un temporal fuera de la carpeta de proyectos.');
  }
  const stat = await fs.lstat(absolute);
  if (!stat.isDirectory() || stat.isSymbolicLink() || await fs.realpath(absolute) !== absolute) {
    throw new Error('Se rechazó limpiar un temporal cuyo destino cambió.');
  }
  await fs.rm(absolute, { recursive: true, force: false });
}

/**
 * Prepara todos los archivos antes de hacer visible la carpeta final.
 * projectsDirectory debe existir y haber sido validado dentro de la raíz del kit.
 * files es un objeto no vacío de nombres de archivo planos y textos o Buffers.
 * fs permite inyectar fallos locales en pruebas; no se modifica la API global.
 *
 * El temporal comparte volumen con el destino. Dos escritores de este helper
 * compiten por rename: el ganador deja una carpeta no vacía y el otro no puede
 * reemplazarla. lstat también rechaza destinos preexistentes vacíos o symlinks.
 * No hay locks persistentes: un proceso terminado abruptamente puede dejar un
 * temporal huérfano, pero ese temporal no ocupa el nombre final ni se reutiliza.
 *
 * Node no ofrece aquí rename con NOREPLACE portable. No se garantiza protección
 * contra terceros que creen un destino vacío justo entre lstat y rename, ni
 * durabilidad frente a caída eléctrica (no se ejecuta fsync).
 */
export async function guardarProyecto({ projectsDirectory, slug, files, fs: overrides = {} }) {
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('El nombre de carpeta del proyecto no es seguro.');
  }
  if (!files || typeof files !== 'object' || Array.isArray(files)) {
    throw new TypeError('Se necesitan los archivos del proyecto.');
  }
  const entries = Object.entries(files);
  if (!entries.length) throw new Error('No se puede guardar un proyecto sin archivos.');
  for (const [filename, body] of entries) {
    if (!/^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/.test(filename) || filename.endsWith('.') ||
        /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(filename)) {
      throw new Error(`Nombre de archivo no permitido: ${filename}`);
    }
    if (typeof body !== 'string' && !Buffer.isBuffer(body)) {
      throw new TypeError(`Contenido de archivo no admitido: ${filename}`);
    }
  }

  const fs = { ...filesystem, ...overrides };
  const projects = await fs.realpath(projectsDirectory);
  const directory = join(projects, slug);
  await requireAbsent(fs, directory);
  const prefix = `.plan-${slug}-`;
  let temporaryDirectory;
  try {
    temporaryDirectory = await fs.mkdtemp(join(projects, prefix));
    for (const [filename, body] of entries) {
      await fs.writeFile(join(temporaryDirectory, filename), body, { encoding: 'utf8', flag: 'wx' });
    }
    await requireAbsent(fs, directory);
    await fs.rename(temporaryDirectory, directory);
    temporaryDirectory = undefined;
    return directory;
  } catch (error) {
    if (temporaryDirectory) {
      try { await removeOwnTemporary(fs, temporaryDirectory, projects, prefix); }
      catch (cleanupError) {
        // Conservar el error original y su código; la limpieza no debe ocultarlo.
        error.cleanupError = cleanupError;
        error.temporaryDirectory = temporaryDirectory;
      }
    }
    throw error;
  }
}
