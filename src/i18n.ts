// Site chrome and page copy, per language. Spanish (Spain) is the default at /, English lives under /en/.
// The guide itself lives in src/guide/ (es.mjs, en.mjs); this file holds only what surrounds it.
export type Lang = 'es' | 'en';
export const LANGS: Lang[] = ['es', 'en'];
export type Page = '' | 'legal/';

/** Same page in either language: '/' ↔ '/en/', '/legal/' ↔ '/en/legal/'. */
export const pathFor = (lang: Lang, page: Page) => (lang === 'es' ? `/${page}` : `/en/${page}`);

type Line = [who: 'you' | 'agent' | 'meta', text: string];

const es = {
  htmlLang: 'es',
  ogLocale: 'es_ES',
  og: '/og-es.png',
  title: 'No necesitas saber programar — guía gratuita para tener tu propio agente de IA · MDIB',
  description:
    'Guía gratuita en {steps} pasos para montar tu propio agente de IA en una máquina que controlas, conectado a Telegram y haciendo una tarea real. En la web, en PDF y en Markdown para tu asistente.',
  nav: {
    main: 'Secciones de la guía',
    lang: 'Idioma',
    tabs: [
      ['#resultado', 'Resultado'],
      ['#uso', 'Cómo usarla'],
      ['#metodo', 'Método'],
      ['#herramientas', 'Herramientas'],
      ['#despues', 'Después'],
      ['#capo', 'Capó'],
      ['#fuentes', 'Fuentes'],
    ] as [string, string][],
  },
  eyebrow: 'Guía gratuita · Machines Do It Better',
  download: {
    pdf: 'Descargar PDF',
    md: 'Descargar para tu agente (.md)',
    mdHint: 'Dáselo a ChatGPT, Claude o tu asistente: te guiará paso a paso.',
  },
  newsletter: {
    link: 'Recibe la próxima edición y las actualizaciones',
    newTab: '(se abre en una pestaña nueva)',
    bandTitle: 'La guía es gratis. Te pido una cosa a cambio: tu interés.',
    bandText:
      'Si te ha servido, suscríbete a la newsletter: te llega la próxima edición, las correcciones cuando cambie una herramienta y el aviso cuando exista lo que viene después. Las descargas son libres y no piden nada.',
    bandCta: 'Suscribirme en Beehiiv',
  },
  numbersTitle: 'En cifras',
  session: {
    eyebrow: 'Así se ve al terminar',
    h2: 'Una mañana cualquiera.',
    label: 'Ejemplo ilustrativo, escrito a mano',
    aria: 'Ejemplo ilustrativo de una conversación con un agente por Telegram',
    head: 'Telegram · tu agente',
    replay: 'Repetir',
    you: 'tú',
    agent: 'agente',
    note: 'No es una grabación ni un cliente: es un ejemplo escrito a mano de lo que monta esta guía (pasos 5 y 6).',
    lines: [
      ['you', 'Cada día laborable a las 7:30, mándame aquí: el tiempo en Valencia, tres noticias de diseño gráfico con fuente y fecha, y mis pendientes.'],
      ['agent', 'Hecho. Tarea programada: de lunes a viernes, 07:30, a este chat. ¿La pruebo ahora?'],
      ['you', 'Sí.'],
      ['meta', 'jueves · 07:30'],
      ['agent', 'Buenos días. Valencia: 17 °C, sin lluvia hasta la tarde.'],
      ['agent', 'Noticias: 1) Una fundición publica una tipografía libre para señalética (su blog, 12 nov). 2) Cambios en el formato de los anuncios de una red social (nota oficial, 12 nov). 3) Un estudio sobre legibilidad en pantallas pequeñas (revista del sector, 11 nov).'],
      ['agent', 'Pendientes: enviar el presupuesto a la imprenta; revisar las pruebas del catálogo.'],
      ['you', 'Quita lo del catálogo, ya está.'],
      ['agent', 'Quitado. Te queda un pendiente. Mañana a las 7:30, lo mismo.'],
    ] as Line[],
  },
  owns: {
    eyebrow: 'Lo que es tuyo',
    h2: 'Tu cuenta, tus datos, tu modelo.',
    p: 'Montarlo tú tiene una ventaja que no da ningún servicio cerrado: sabes dónde está cada pieza y puedes cambiarla. Si mañana cambias de modelo o de máquina, el agente sigue siendo tuyo.',
    aria: 'Diagrama: tu agente en el centro, rodeado de tres piezas que son tuyas: la cuenta, los datos y el modelo.',
    center: 'tu agente',
    parts: [
      ['la cuenta', 'a tu nombre, en el proveedor que eliges'],
      ['los datos', 'en una carpeta de tu máquina: ~/.hermes'],
      ['el modelo', 'el que eliges, y lo cambias cuando quieras'],
    ] as [string, string][],
  },
  footer: { legal: 'Aviso legal y privacidad', guide: 'La guía' },
  notFound: { title: 'Página no encontrada · MDIB', h1: 'Aquí no hay nada.', back: 'Volver a la guía' },
};

const en: typeof es = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  og: '/og-en.png',
  title: 'You don’t need to code — a free guide to your own AI agent · MDIB',
  description:
    'A free {steps}-step guide to setting up your own AI agent on a machine you control, connected to Telegram and doing one real task. On the web, as a PDF and as Markdown for your assistant.',
  nav: {
    main: 'Guide sections',
    lang: 'Language',
    tabs: [
      ['#outcome', 'Outcome'],
      ['#use', 'How to use'],
      ['#method', 'Method'],
      ['#tools', 'Tools'],
      ['#next', 'Next'],
      ['#hood', 'Under the hood'],
      ['#sources', 'Sources'],
    ],
  },
  eyebrow: 'Free guide · Machines Do It Better',
  download: {
    pdf: 'Download PDF',
    md: 'Download for your agent (.md)',
    mdHint: 'Give it to ChatGPT, Claude or your assistant: it will walk you through it.',
  },
  newsletter: {
    link: 'Get the next edition and the updates',
    newTab: '(opens in a new tab)',
    bandTitle: 'The guide is free. I ask for one thing in return: your interest.',
    bandText:
      'If it helped, subscribe to the newsletter: you get the next edition, corrections when a tool changes, and word when what comes next exists. The downloads are open and ask for nothing.',
    bandCta: 'Subscribe on Beehiiv',
  },
  numbersTitle: 'In numbers',
  session: {
    eyebrow: 'What it looks like at the end',
    h2: 'An ordinary morning.',
    label: 'Illustrative example, hand-authored',
    aria: 'Illustrative example of a conversation with an agent on Telegram',
    head: 'Telegram · your agent',
    replay: 'Replay',
    you: 'you',
    agent: 'agent',
    note: 'Not a recording and not a client: a hand-written example of what this guide sets up (steps 5 and 6).',
    lines: [
      ['you', 'Every weekday at 7:30, send me here: the weather in Valencia, three graphic design stories with source and date, and my to-dos.'],
      ['agent', 'Done. Scheduled task: Monday to Friday, 07:30, to this chat. Shall I test it now?'],
      ['you', 'Yes.'],
      ['meta', 'Thursday · 07:30'],
      ['agent', 'Good morning. Valencia: 17 °C, no rain until the afternoon.'],
      ['agent', 'News: 1) A type foundry releases a free typeface for signage (its blog, 12 Nov). 2) Changes to a social network’s ad formats (official note, 12 Nov). 3) A study on legibility on small screens (trade journal, 11 Nov).'],
      ['agent', 'To-dos: send the quote to the printer; review the catalogue proofs.'],
      ['you', 'Drop the catalogue, it’s done.'],
      ['agent', 'Dropped. One to-do left. Tomorrow at 7:30, same again.'],
    ],
  },
  owns: {
    eyebrow: 'What is yours',
    h2: 'Your account, your data, your model.',
    p: 'Setting it up yourself has an advantage no closed service gives you: you know where every piece is and you can change it. If tomorrow you switch model or machine, the agent is still yours.',
    aria: 'Diagram: your agent in the middle, surrounded by three pieces that are yours: the account, the data and the model.',
    center: 'your agent',
    parts: [
      ['the account', 'in your name, with the provider you choose'],
      ['the data', 'in a folder on your machine: ~/.hermes'],
      ['the model', 'the one you choose, and you change it when you like'],
    ],
  },
  footer: { legal: 'Legal notice and privacy', guide: 'The guide' },
  notFound: { title: 'Page not found · MDIB', h1: 'Nothing here.', back: 'Back to the guide' },
};

export const copy = { es, en };
