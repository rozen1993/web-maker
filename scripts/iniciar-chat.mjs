import { readFile, lstat } from 'node:fs/promises';
import { join } from 'node:path';
import { projectSlug } from './asistente.mjs';
import { conProyectoUnico } from './proyecto-unico.mjs';
import { guardarProyecto } from './guardar-proyecto.mjs';
import { createEvent } from './bitacora.mjs';

// Helper del coordinador; no abre terminales, modelos ni servicios externos.
export async function abrirProyectoChat({ root, name }) {
  const slug = projectSlug(name);
  return conProyectoUnico(root, slug, async (projects, exists) => {
    const directory = join(projects, slug);
    if (exists) {
      if ((await lstat(directory)).isSymbolicLink()) throw new Error('El proyecto es un enlace; no se retoma automáticamente.');
      const file = join(directory, 'proyecto.json');
      if ((await lstat(file)).isSymbolicLink()) throw new Error('La ficha es un enlace; revisar antes de continuar.');
      const project = JSON.parse(await readFile(file, 'utf8'));
      if (project.project_id !== slug) throw new Error('La identidad guardada no coincide; no se sobrescribió.');
      return { resumed: true, directory, project };
    }
    const project = JSON.parse(await readFile(join(root, 'plantillas', 'proyecto.json'), 'utf8'));
    const timestamp = new Date().toISOString();
    project.project_id = slug;
    project.status = 'brief_en_curso';
    project.workflow = { ...project.workflow, phase: 'brief' };
    project.intake = { source: 'chat', started_at: timestamp, completed_at: null,
      responses: { nombre: { raw: name, value: name.trim(), answered_at: timestamp } } };
    const event = createEvent({ project_id: slug, phase: 'brief', type: 'accion',
      summary: 'Brief iniciado por chat. Solo nombre registrado; sin compras, publicación ni entrevista completada.',
      evidence: ['proyecto.json', 'ESTADO.md'] });
    await guardarProyecto({ projectsDirectory: projects, slug, files: {
      'proyecto.json': `${JSON.stringify(project, null, 2)}\n`,
      'META.md': `# META — ${name.trim()}\n\nBorrador de brief; alcance y resultado útil pendientes.\nCódigo previsto: out/ desde la raíz del kit. No hay web lista ni autorización de publicación.\n`,
      'ESTADO.md': `# ESTADO — ${name.trim()}\n\nEstado: brief_en_curso. Entrega: en_construccion.\nRespuesta guardada: nombre.\nSiguiente decisión pendiente: web nueva o renovación, salvo respuesta ya aportada en chat.\nModelos solicitados; selección no verificada. Sin pagos autorizados.\n`,
      'BITACORA.jsonl': `${JSON.stringify(event)}\n`,
      'MEJORAS.md': await readFile(join(root, 'plantillas', 'MEJORAS.md'), 'utf8'),
    } });
    return { resumed: false, directory, project };
  });
}
