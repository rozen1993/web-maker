# Kit de webs con Astro, Tailwind y SEO

Instrucciones y plantillas para que Codex convierta una idea en una web, con contenido, diseño, SEO y verificaciones. Admite servicios, portfolios, blogs, catálogos, tiendas, directorios, reservas y combinaciones.

**Empieza por [la guía paso a paso](EMPEZAR.md) o abre [la guía en PDF](output/pdf/guia-de-uso.pdf).** No necesitas rellenar JSON ni elegir subskills.

## Cómo usarlo desde GitHub

1. Clona o descarga este repositorio y abre su carpeta en tu IDE con Codex.
2. Escribe en el chat de Codex el mensaje siguiente y describe tu idea.
3. Responde sus preguntas, elige la dirección visual y revisa la vista previa que entregue.

```text
Lee AGENTS.md y EMPEZAR.md de este repositorio.
Quiero crear una web sobre [idea], para [público y mercado].
La acción principal será [contactar, comprar, leer, reservar u otra].
Usa Astro + Tailwind y mis skills SEO instaladas.
Empieza con las preguntas que falten. Por ahora, sin consultas de pago.
```

Cuando quieras usar datos de pago, el ejemplo de [EMPEZAR.md](EMPEZAR.md) incluye una autorización acotada de DataForSEO. Leer este repositorio no autoriza consumo. Puedes cambiar el presupuesto antes de enviar el mensaje.

Codex necesita leer los archivos: pegar solamente la URL de GitHub no instala el kit ni inicia una web. La ruta puede ser cualquiera; la raíz del kit es la carpeta que contiene `AGENTS.md`.

## Qué necesitas en el entorno

- Codex con acceso a la carpeta y herramientas para construir y comprobar el proyecto.
- Tus skills SEO de agricidaniel, sus subskills pertinentes, `astro` y `frontend-design`, instaladas y disponibles en el catálogo. Este repositorio no las incluye ni las instala.
- Acceso a los modelos que quieras usar. El flujo propuesto usa Sol para producción y Astra high para diseño; el agente verifica su disponibilidad o prepara un traspaso. Escribir sus nombres no cambia automáticamente el modelo.
- Para consultar datos: MCP de DataForSEO configurado y credenciales en el entorno, fuera de Git. El agente comprueba acceso, precios, saldo y autorización antes de comprar datos.
- Al construir una web: Node y el gestor de paquetes compatibles con las versiones elegidas; el agente comprueba el entorno antes de instalar dependencias.

Una tienda, reservas o edición con panel pueden requerir servicios adicionales según el alcance. El kit identifica esas dependencias y deja explícito lo que falta.

## Qué contiene

| Archivo | Para qué sirve |
|---|---|
| [EMPEZAR.md](EMPEZAR.md) | Guía para ti, con un ejemplo de tienda de café y blog |
| [AGENTS.md](AGENTS.md) | Instrucciones del coordinador |
| [PROMPT-MAESTRO.md](PROMPT-MAESTRO.md) | Mensajes para empezar, retomar o revisar |
| [PERFILES-Y-CALIDAD.md](PERFILES-Y-CALIDAD.md) | Módulos y comprobaciones por tipo de web |
| [SISTEMA-PILOTO.md](SISTEMA-PILOTO.md) | Procedimiento ampliado y política de costes |
| [plantillas/proyecto.json](plantillas/proyecto.json) | Ficha que completa Codex |

## Kit compartido y proyectos privados

Este repositorio conserva el kit. Las webs se crean por defecto en `proyectos/` y pueden tener repositorios propios. Esa carpeta, las credenciales, `.control/`, `.seo-cache/` y las evidencias privadas están excluidas de Git. Mantén copias de seguridad y repositorios separados para los proyectos que quieras conservar o publicar.

El registro DataForSEO de una cartera nueva se guarda en `.control/dataforseo.jsonl`. Si cambias de equipo o clonas otra vez para retomar la misma cartera, el coordinador debe vincular su registro privado existente o restaurar una copia completa y reconciliarla antes de pagar. **Clonar no reinicia el presupuesto, el gasto ni las reservas.** Una cartera nueva empieza sin autorización; las plantillas no heredan permisos de otros proyectos. Un único coordinador realiza las compras.

El límite por web escrito aquí es una instrucción, no un bloqueo técnico del MCP. El límite diario del proveedor requiere configuración y comprobación en DataForSEO. Publicar el kit en GitHub tampoco publica las webs ni configura servicios externos.
