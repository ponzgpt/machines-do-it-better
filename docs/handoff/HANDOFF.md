# MDIB — web (handoff)

> Archivado el 21 de octubre de 2026 desde `machines-do-it-better/web/`. Las resoluciones de la tabla ya están aplicadas en `src/`; esto es historia, no instrucciones vigentes.

Landing page de **Machines Do It Better (MDIB)**, el negocio de Javier: un servicio productizado de agentes personales de IA para **particulares y empresas**. Viene de una sesión de diseño en Claude (claude.ai, 1 de octubre de 2026) y se pasa aquí para seguir desarrollándola.

## ⚠️ Conflictos con la estrategia del repo de negocio — y cómo se resuelven

La landing se diseñó **sin acceso a `ponzgpt/machines-do-it-better`** y contradice documentos ya decididos allí. **El repo de negocio manda sobre el copy de esta web.** Resoluciones para la v1 (aplícalas sin preguntar; Javier itera después):

| # | Conflicto | Resolución v1 |
|---|---|---|
| 1 | Planes mensuales en €/mes vs. piloto de pago único £100–250 con precio tras diagnóstico (`strategy/offer-v0.md`) | Quitar los 4 planes. Una sola oferta: **Piloto Fundador** — diagnóstico gratuito de 20–30 min → propuesta con precio cerrado. Sin cifra en la página (la moneda £/€ está sin decidir). Se apunta como decisión abierta. |
| 2 | «Lo vigilamos… cada mes», «Soporte prioritario», «SLA» vs. `operations/support-boundaries.md` | Eliminar. Usar la promesa pública permitida, literal: «Incluye entrega guiada, documentación y 14 días de garantía sobre el alcance acordado.» Nada de las promesas prohibidas de ese documento. |
| 3 | Varios agentes / ERP / CRM vs. **un caso de uso y hasta dos flujos** | Reescribir resultados y pasos a ese alcance. Los ejemplos del hero, como ejemplos, se pueden mantener si son un solo caso por persona. |
| 4 | «Empresas → A medida» vs. tesis («profesionales y pequeños equipos no técnicos»; nada de consultoría a medida) | Mantener el selector, pero el segmento pasa a ser **«Para mí» / «Para mi negocio o equipo»** (autónomos y equipos pequeños). Fuera «A medida», ERP, infraestructura propia y SLA. |
| 5 | «Modelos abiertos en infraestructura propia» vs. `strategy/product-architecture.md` | Describir lo real: una instancia Hermes Cloud (Nous Research) por cliente, con cuenta a nombre del cliente, aislada, y canal Telegram al inicio. Hermes se puede nombrar en «Debajo del capó», no arriba. |
| 6 | Marca: la newsletter se renombra a The Signal (`STATUS.md`) | La web del servicio sigue siendo **MDIB**. No enlaces a The Signal salvo que encuentres su URL pública real. |
| 7 | Placeholders `[...]` | **Ninguno visible en producción.** Lo que no se sepa se reformula o se quita, y se lista en el README como pendiente. Contacto: busca el email en los repos de Javier; si no hay, el CTA va a un `mailto:` con el email que confirme Javier (es lo único que se le pregunta). |
| 8 | Legal (España) | Página mínima de aviso legal y privacidad basada en `legal/sole-trader-launch-checklist.md`, marcada como provisional. Sin analítica ni cookies, así no hace falta banner. |

Lo que sí encaja y se mantiene: «vendemos resultados, no Hermes» (literal en `offer-v0.md`), el diagnóstico inicial, la aprobación humana en las acciones sensibles, el español de España y la estética.

## Qué hay en esta carpeta

| Archivo | Qué es |
|---|---|
| `index.html` | **El punto de partida.** HTML/CSS/JS sin dependencias, convertido fielmente del diseño. Ábrelo directamente en el navegador. |
| `reference/Main.dc.html` | El diseño original en formato Design Component (lienzo de diseño de claude.ai). **No funciona fuera de ese editor**, así que solo sirve de referencia. No lo edites. |
| `reference/canvas.json` | El índice del lienzo original. Solo referencia. |

Diseño original (privado, dentro de la cuenta de Javier): https://claude.ai/artifact/JET57xZHe9CK1hP7EhL6Wj

## Briefing original (palabras de Javier)

> Web para Machines Do It Better con hero apropiado para vender servicio productizado de agentes personales de IA. Vendemos los resultados, no la tecnología detrás (Hermes Agent, LLMs, etc.), pero en una sección más abajo se indica cómo usamos las tecnologías más actuales y adecuadas para cada caso. El hero debe desambiguar entre individuo y business inquiries.

## Decisiones tomadas

- **Posicionamiento:** se venden resultados. La tecnología solo aparece en la sección `#tecnologia` («Debajo del capó»), casi al final.
- **Desambiguación particular/empresa:** un selector en el hero («Para mí» / «Para mi empresa») cambia el titular, los CTAs, el panel de ejemplo, «Resultados», «Planes» y la nota de precios. Se implementa con `body[data-mode="personal|business"]` y las clases `.only-personal` / `.only-business`. Las dos variantes están en el HTML (es mejor para SEO que generarlas con JS).
- **Enlaces directos por segmento:** `?para=empresa` o `#empresa` abre la página en modo empresa, para campañas B2B.
- **Estética:** papel gris cálido `#F3F2EE`, tinta `#121211` y acento naranja de señal `#FF5A1F`. Archivo (ancha, gruesa) para los titulares, IBM Plex Sans para el texto e IBM Plex Mono para etiquetas y datos. Bordes rectos, sin degradados ni sombras. Los tokens están en `:root`.
- **Contenido honesto:** el panel del hero lleva la etiqueta «Ejemplo ilustrativo». No hay métricas, logos de clientes ni testimonios inventados. Todo dato desconocido va entre corchetes.
- **Idioma:** español de España. Precios en €, con IVA incluido para particulares y sin IVA para empresas.

## Pendiente: placeholders que debe rellenar Javier

Búscalos con `grep -n "\[" index.html`:
- `[PRECIO]`: precio de los cuatro planes y de las altas.
- `[N]`: días de puesta en marcha, tamaño de equipo y número de usuarios.
- `[EMAIL]`: email de contacto (CTAs `mailto:` y pie de página).
- `[UE / infraestructura propia — CONFIRMAR]` y el detalle del tratamiento de datos: **es un compromiso legal, no texto de marketing**. No lo rellenes sin confirmarlo con Javier.
- `[CONDICIONES]`, `[CONDICIONES DE CANCELACIÓN]`, `[AVISO LEGAL]`, `[PRIVACIDAD]`.

## Riesgos y objeciones señalados en la sesión de diseño

1. El selector exige un clic antes de que el visitante vea «su» mensaje. Si el tráfico B2B y el B2C llegan por canales distintos, es mejor tener URLs separadas (`/empresas`) que depender del toggle.
2. Vender a particulares y a empresas desde la misma portada puede restar credibilidad ante clientes empresa. Si uno de los dos segmentos tracciona antes, la portada debería ser para ese segmento.
3. Un servicio «productizado» sin precio público se percibe como consultoría. O se publican los precios o se quita la sección de planes.
4. La sección de tecnología menciona Hermes Agent. Ajusta la descripción a lo que dice `strategy/product-architecture.md` (Hermes Cloud de Nous Research, con una instancia por cliente).

## Siguientes pasos sugeridos (a confirmar con Javier antes de hacerlos)

- Navegación móvil: a 390 px el menú se parte en dos líneas; hace falta un menú plegable.
- Decidir el stack y el hosting (estático puro, Astro, etc.) y el dominio.
- Formulario de contacto o enlace de reserva (Cal.com o similar) en lugar de `mailto:`.
- Páginas legales (aviso legal, privacidad y cookies si hay analítica), obligatorias en España.
- Meta OG/Twitter, favicon y analítica respetuosa con la privacidad (Javier valora la soberanía digital y el open source; nada de Google Analytics por defecto).
- Opcional: separar `/empresas` como página propia (ver riesgo 1).

## Reglas para trabajar aquí

- Javier no es desarrollador de formación: explica las decisiones técnicas en lenguaje llano y pregunta antes de elegir stack, hosting o servicios de pago.
- Mantén la estética y el tono definidos salvo que él pida cambiarlos.
- No inventes datos, testimonios ni cifras.
