# Una copia, un proyecto, una web en out

Invocación en el chat: `$iniciar-web`, opcionalmente seguida del nombre. Para retomar:
`$iniciar-web retoma`. La skill local está en `.agents/skills/iniciar-web/` y viaja
con Git. Si el cliente no la descubre, volver a abrir el proyecto o la sesión;
como alternativa explícita, pedir «Lee .agents/skills/iniciar-web/SKILL.md e inicia».
No afirmar que el autocompletado o la carga del cliente están verificados sin observarlos.

## Organización

- `proyectos/<nombre>/`: único brief, META, respuestas, estrategia, presupuesto y evidencias privadas.
- `out/`: proyecto Astro + Tailwind completo, mantenible e independiente del kit.
- `.control/`: control privado o vínculo al registro original de la cartera; no se borra al reiniciar una web.
- `output/pdf/`: guía del kit; no es la web.

Una carpeta existente se retoma; una segunda web necesita otra copia limpia. No archivar
ni borrar automáticamente la anterior. Los scripts del kit rechazan crear una segunda ficha;
no interceptan escrituras manuales o herramientas ajenas. No iniciar dos sesiones compradoras.
Una copia nueva no reinicia saldo, gastos, reservas ni autorizaciones de DataForSEO.
Vincular y reconciliar el registro privado existente antes de cualquier compra.

## Contenido de out

Sol high construye allí el código, también los mockups que diseña Astra ultra. Durante
el trabajo está en construcción. Al elegir diseño, retirar las rutas de propuestas de
la entrega pública y de la indexación; conservar la evidencia en el expediente privado.
La entrega final debe incluir:

- `package.json`, lockfile, configuración Astro/Tailwind/TypeScript, `src/` y `public/`.
- Scripts de comprobación y build que realmente funcionen y versiones documentadas.
- Configuración para el destino acordado y `.env.example` solo con nombres/valores inocuos.
- `.gitignore` propio que excluya secretos, dependencias y artefactos según el destino.
- `DESPLIEGUE.md`: destino, directorio raíz, instalación/build, artefacto resultante,
  variables necesarias, integraciones, pruebas realizadas y pendientes específicos.

No depender de rutas absolutas personales ni importar código desde el kit. Ejecutar
comprobaciones y build desde `out/`. Para hosting estático el build suele entregarse en
`out/dist/`; en servidor/SSR, documentar el adaptador y salida reales. No asumir que una
tienda o un SSR funcionan subiendo HTML ni cambiar el modo solicitado para simplificar.
El destino y configuración se verifican con la documentación vigente al construir.

`lista_para_publicar` exige los criterios de AGENTS y PERFILES-Y-CALIDAD, accesos y
dependencias esenciales resueltos y evidencia de pruebas. Para preview, registrar
`preview_verificada` y qué falta para despliegue; no renombrarla como lista para publicar.
Publicación y operación verificadas necesitan sus pruebas públicas/funcionales, además
de autorización de publicación. No se configura despliegue automático por invocar la skill.

## GitHub y reutilización

El repositorio del kit versiona skill, roles, scripts, plantillas y `out/.gitkeep`.
El resto de `out/`, `proyectos/`, caché y registros privados quedan excluidos de este Git.
Para guardar/publicar una web, `out/` puede tener su propio repositorio, con autorización
cuando corresponda, o copiarse como proyecto independiente. El agente hace esas tareas
cuando se soliciten; el usuario continúa por chat. No subir secretos ni el expediente SEO.

Para otra web: conservar la entrega y sus datos privados, descargar o clonar otra copia
limpia del kit, abrirla en Codex e invocar `$iniciar-web`. Las skills SEO y conexiones
externas siguen siendo dependencias del entorno; no se instalan por descargar este kit.
