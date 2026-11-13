// The guide, in Spanish (Spain). Single source: the page, the .md "for your agent" and the PDF are all rendered
// from this object by src/guide/render.mjs. Inline markup: `code` and [text](url), nothing else.
// {steps}, {tools}, {reading} and {handsOn} are filled in from the content itself (see facts()).
// Every price and requirement carries the id of a source in `sources`; all were checked on `checked`.
export default {
  lang: 'es',
  checked: '2026-11-13',
  edition: '2026-11',
  title: 'No necesitas saber programar.',
  subtitle:
    'Una guía gratuita en {steps} pasos para acabar con tu propio agente de IA funcionando en una máquina que controlas y haciendo por ti una tarea real.',
  files: { pdf: '/guia-agente-propio.pdf', md: '/guia-agente-propio.md' },
  labels: {
    edition: 'Edición',
    reading: 'de lectura',
    handsOn: 'de práctica',
    steps: 'pasos',
    tools: 'herramientas',
    outcomesTitle: 'Al terminar vas a tener:',
    howTitle: 'Cómo usar este documento',
    methodTitle: 'El método',
    step: 'Paso',
    do: 'Qué haces',
    why: 'Por qué',
    exercise: 'Ejercicio para hoy',
    trap: 'La trampa habitual',
    minutes: 'min',
    toolsTitle: 'La caja de herramientas',
    toolFor: 'Para qué',
    toolCost: 'Qué cuesta',
    toolTrap: 'Su trampa',
    nextTitle: 'Qué viene después',
    hoodTitle: 'Debajo del capó',
    noticeTitle: 'Aviso',
    sourcesTitle: 'Fuentes',
    sourcesNote: 'Consultadas el 13 de noviembre de 2026 en la web oficial de cada herramienta.',
    source: 'fuente',
    estimate: 'estimación',
  },
  outcomes: [
    'Una tarea concreta elegida y escrita en cinco frases, con lo que no vas a automatizar fuera desde el principio.',
    'Tu agente instalado en una máquina que controlas, con el modelo que tú eliges y su coste a la vista.',
    'Un bot de Telegram que solo te responde a ti.',
    'Una tarea programada que te llega sola cada día, y una rutina de quince minutos al mes para que siga funcionando.',
  ],
  numbers: [
    { value: '{steps}', label: 'pasos, en orden' },
    { value: '{tools}', label: 'herramientas, todas con su precio y su fuente' },
    { value: '0 €', label: 'cuesta el método: la guía y los archivos son gratis' },
    {
      value: '0–25 €',
      label: 'al mes cuesta tenerlo funcionando (estimación)',
      note:
        '0 € si usas tu ordenador y un modelo gratuito o local. Unos 2 USD al mes si una tarea diaria usa un modelo de pago (estimación: 30 ejecuciones de unos 20.000 tokens de entrada y 2.000 de salida a 2 y 10 USD por millón). Hasta unos 25 € si además alquilas un servidor pequeño o contratas un servicio gestionado de 20 USD al mes.',
    },
  ],
  howToUse: [
    'Léelo entero una vez antes de tocar nada: son unos {reading}.',
    'Haz los pasos en orden. Cada uno termina con un ejercicio que puedes hacer hoy; no pases al siguiente sin hacerlo.',
    'Descarga la versión para tu agente (.md) y dásela a tu asistente de IA (ChatGPT, Claude o el que uses): te hará de tutor, paso a paso, y comprobará cada ejercicio contigo.',
  ],
  steps: [
    {
      title: 'Elige UNA tarea',
      do:
        'Escoge una tarea que repites cada semana, que te molesta y que sabrías explicarle a otra persona: qué miras, en qué orden y qué entregas. Buenas primeras tareas: un resumen de la mañana con lo que tienes pendiente, recordatorios de hábitos, vigilar las noticias de tu sector con fuente y fecha. Fuera desde el primer día: datos de salud o clínicos, secretos de tu empresa, contraseñas, sistemas regulados (banca, nóminas, expedientes) y cualquier cosa que mueva dinero o envíe mensajes en tu nombre sin tu visto bueno.',
      why:
        'Una tarea clara se puede comprobar: sabes si el agente la ha hecho bien. Diez tareas difusas no se pueden comprobar, y un agente que no puedes comprobar no es de fiar.',
      exercise: {
        minutes: 10,
        text:
          'Escribe tu tarea en cinco frases: cuándo ocurre, de dónde sale la información, qué haces con ella, qué entregas y cómo sabrías que está bien hecha. Guárdalas: las usarás en el paso 6.',
      },
      trap: 'Empezar por la tarea más importante en lugar de la más repetida. La primera tiene que ser aburrida y de bajo riesgo.',
      sources: [],
    },
    {
      title: 'Decide dónde vive',
      do:
        'Tres opciones. Tu propio ordenador: 0 €, pero el agente solo trabaja mientras está encendido y despierto (Hermes funciona en Mac con Apple Silicon, Linux, Windows y WSL2). Un servidor pequeño alquilado, por ejemplo en Hetzner Cloud, cuyo plan CX23 (2 vCPU, 4 GB de RAM, 40 GB de disco) figuraba a 5,99 € al mes sin IVA: está siempre encendido, pero lo mantienes tú. O un servicio gestionado: el plan Plus de Nous Portal cuesta 20 USD al mes e incluye un agente en la nube con 4 GB de RAM y 25 GB de disco; te ahorras el mantenimiento del servidor a cambio de depender de su cuenta.',
      why:
        'El sitio decide quién puede apagarlo, quién tiene tus datos y cuánto mantenimiento te toca. No hay una opción mejor: hay una que encaja con tu tarea.',
      exercise: {
        minutes: 5,
        text:
          'Responde a una pregunta: ¿tu tarea tiene que ocurrir con tu ordenador apagado? Si la respuesta es no, empieza en tu ordenador.',
      },
      trap: 'Alquilar un servidor antes de saber si la tarea merece la pena. Empieza en lo que ya tienes y decide después.',
      sources: ['hermes-platforms', 'hetzner', 'nous-portal'],
    },
    {
      title: 'Elige el modelo',
      do:
        'El modelo es el que piensa; el agente es lo que lo rodea. Tres caminos. Un modelo de pago en la nube: pagas por uso; como referencia, Nous Portal lista Claude Sonnet 5.5 a 2 USD por millón de tokens de entrada y 10 USD por millón de salida. Una capa gratuita: OpenRouter ofrece más de 25 modelos gratis con un límite de 20 peticiones por minuto y 50 al día, y la API de Gemini tiene un nivel gratuito en el que Google puede usar lo que envías para mejorar sus productos. O un modelo local con Ollama: gratis y privado, pero necesitas un ordenador con memoria suficiente (sin verificar cuánta: depende del modelo) y configurar un contexto de al menos 64.000 tokens, el mínimo que exige Hermes.',
      why:
        'Del modelo dependen la calidad de las respuestas, lo que pagas y quién lee lo que le escribes. Decídelo a propósito, no por defecto.',
      exercise: {
        minutes: 10,
        text:
          'Crea la cuenta en el proveedor que elijas y, si es de pago y el proveedor lo permite, pon un límite de gasto. Anota dónde está tu clave, pero no la pegues en ningún chat.',
      },
      trap:
        'Probar solo con la capa gratuita y concluir que «los agentes no funcionan». Un agente hace varias peticiones por cada tarea, y 50 al día se agotan pronto.',
      sources: ['nous-portal', 'openrouter', 'gemini', 'hermes-providers', 'ollama'],
    },
    {
      title: 'Instala el arnés',
      do:
        'El arnés es el programa que convierte un modelo en un agente: memoria, herramientas, tareas programadas y canales. Esta guía usa Hermes Agent, de código abierto (licencia MIT) y publicado por Nous Research. En Mac, Linux o WSL2, abre la terminal y ejecuta `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`; en Windows, en PowerShell, `iex (irm https://hermes-agent.nousresearch.com/install.ps1)`. Recarga la terminal (`source ~/.zshrc` o `source ~/.bashrc`), ejecuta `hermes doctor` para ver si falta algo y `hermes model` para elegir proveedor y modelo. Si elegiste Nous Portal, `hermes setup --portal` hace el alta en un solo paso. El instalador añade por defecto un navegador y herramientas para manejar el ordenador; la documentación explica cómo omitirlos.',
      why:
        'Es la parte que no quieres programar tú: guarda la memoria, ejecuta las tareas a su hora y te pide permiso antes de hacer algo peligroso.',
      exercise: {
        minutes: 20,
        text:
          'Instálalo, repite `hermes doctor` hasta que no marque errores y abre `hermes` para pedirle algo sencillo: «Resume en tres líneas qué puedes hacer».',
      },
      trap:
        'Pegar la clave del modelo en el chat. Las claves van en `~/.hermes/.env`; `hermes model` y `hermes config set` las guardan ahí por ti.',
      sources: ['hermes-install', 'hermes-quickstart', 'hermes-repo'],
    },
    {
      title: 'Conecta un canal que ya usas',
      do:
        'En Telegram, abre @BotFather y envía `/newbot`; elige un nombre y un usuario que termine en «bot». Te dará un token: trátalo como una contraseña. Pide tu número de usuario a @userinfobot (es un número, no tu nombre de usuario). Después ejecuta `hermes gateway setup`, elige Telegram y pega el token y tu número. Arranca el canal con `hermes gateway`, o en segundo plano con `hermes gateway start`, y escríbele al bot.',
      why:
        'Hablas con el agente donde ya estás, desde el móvil, y la lista de usuarios permitidos hace que solo te responda a ti.',
      exercise: {
        minutes: 15,
        text:
          'Crea el bot, conéctalo y escríbele «hola». Luego pide a alguien que le escriba desde su cuenta y comprueba que no le responde.',
      },
      trap:
        'Dejar el bot abierto. Si no hay lista de usuarios permitidos (`TELEGRAM_ALLOWED_USERS`), Hermes no atiende a nadie: no lo «arregles» activando `GATEWAY_ALLOW_ALL_USERS`. Si el token se filtra, revócalo con `/revoke` en @BotFather.',
      sources: ['hermes-telegram', 'hermes-security', 'telegram-bots'],
    },
    {
      title: 'Dale instrucciones y memoria',
      do:
        'Tres sitios. `~/.hermes/SOUL.md`: el tono y la forma de hablar, la base de cada conversación. La memoria, en `~/.hermes/memories/`: `USER.md` sobre ti y `MEMORY.md` para sus propias notas; son cortas a propósito (1.375 y 2.200 caracteres), y basta con decirle «recuerda que…». Y la tarea programada: pídela con palabras («Cada día laborable a las 7:30, mándame por Telegram…») o con `/cron add`. Las tareas programadas las ejecuta el gateway que arrancaste en el paso 5 (`hermes gateway`): si está apagado, no se ejecutan.',
      why:
        'Las instrucciones convierten un chat genérico en tu agente para tu tarea; la tarea programada hace que trabaje sin que se lo pidas.',
      exercise: {
        minutes: 20,
        text:
          'Envíale por Telegram tus cinco frases del paso 1, pídele que programe la tarea y que la ejecute una vez ahora para probarla. Corrige lo que no te sirva hasta que el resultado sea el que entregarías tú.',
      },
      trap: 'Escribir instrucciones larguísimas. Si no caben en una pantalla, no es una tarea: son varias.',
      sources: ['hermes-personality', 'hermes-memory', 'hermes-cron'],
    },
    {
      title: 'Permisos y seguridad',
      do:
        'Un agente puede ejecutar órdenes en la máquina donde vive. Nunca le des: tus contraseñas, claves del banco o códigos de verificación; acceso completo a tu correo o tu agenda para la primera tarea; permiso para enviar, pagar, borrar o publicar sin preguntarte; datos de salud, de tus clientes o secretos de tu empresa; el modo sin aprobaciones (`--yolo` o `approvals.mode: off`) fuera de una prueba; ni un bot abierto a cualquiera. Y sí: deja `approvals.mode` en `smart` (el valor por defecto) o en `manual`, protege el archivo de claves con `chmod 600 ~/.hermes/.env` y, en un servidor, usa `terminal.backend: docker` y un usuario sin privilegios de administrador.',
      why:
        'Los modelos se equivocan. Los permisos deciden cuánto cuesta el error: un mal resumen se corrige; un correo enviado o un archivo borrado, no.',
      exercise: {
        minutes: 10,
        text:
          'Abre `~/.hermes/config.yaml` y comprueba que `approvals.mode` no está en `off`. Ejecuta `chmod 600 ~/.hermes/.env`.',
      },
      trap: 'Darle más acceso «para que sea más útil» antes de que la primera tarea lleve una semana funcionando bien.',
      sources: ['hermes-security'],
    },
    {
      title: 'Mantenlo vivo',
      do:
        'Actualiza con `hermes update`; si después falta algo en la configuración, `hermes config check` y `hermes config migrate`. Tus datos, tu memoria y tus claves viven en `~/.hermes/`. La documentación consultada no describe un procedimiento de copia de seguridad (sin verificar), así que lo prudente es copiar esa carpeta, que incluye tus claves, a un disco cifrado. Cuando algo falle: primero `hermes doctor`; si el bot no contesta, `hermes gateway status`; si las respuestas salen vacías o rotas, vuelve a ejecutar `hermes model`.',
      why:
        'Un agente que nadie mantiene deja de funcionar en silencio: cambian los modelos, caducan las claves, el ordenador se reinicia.',
      exercise: {
        minutes: 10,
        text:
          'Pon en tu calendario una revisión mensual de quince minutos: `hermes update`, `hermes doctor` y una prueba de tu tarea.',
      },
      trap:
        'Pensar que si no te escribe es que todo va bien. Pídele en la tarea que diga algo siempre, aunque no haya novedades.',
      sources: ['hermes-install', 'hermes-quickstart'],
    },
  ],
  tools: [
    {
      name: 'Hermes Agent',
      url: 'https://hermes-agent.nousresearch.com/docs',
      for: 'El arnés: convierte un modelo en un agente con memoria, tareas programadas y canales.',
      cost: 'Gratis, código abierto con licencia MIT.',
      trap: 'Con el valor por defecto `local`, ejecuta órdenes directamente en tu máquina, sin aislamiento: lee el paso 7.',
      source: 'hermes-repo',
    },
    {
      name: 'Telegram y @BotFather',
      url: 'https://core.telegram.org/bots',
      for: 'El canal: hablas con tu agente desde el móvil como con cualquier contacto.',
      cost: 'Gratis: los bots pueden escribir a sus usuarios sin coste.',
      trap: 'Quien tenga el token controla el bot. Si se filtra, `/revoke` en @BotFather.',
      source: 'telegram-bots',
    },
    {
      name: 'Nous Portal',
      url: 'https://portal.nousresearch.com',
      for: 'Servicio gestionado: modelos y, en los planes de pago, un agente alojado en su nube.',
      cost: 'Plan gratuito con modelos gratuitos; Plus, 20 USD al mes con un agente en la nube de 4 GB de RAM y 25 GB de disco.',
      trap: 'Las claves de API siempre gastan créditos de pago por uso, no el uso incluido en el plan.',
      source: 'nous-portal',
    },
    {
      name: 'OpenRouter',
      url: 'https://openrouter.ai',
      for: 'Una sola cuenta para probar muchos modelos, incluidos más de 25 gratuitos.',
      cost: 'Modelos gratuitos: 20 peticiones por minuto y 50 al día (1.000 al día tras comprar 10 USD de créditos); 5,5 % de comisión al comprar créditos.',
      trap: 'Con saldo negativo se bloquean también los modelos gratuitos.',
      source: 'openrouter',
    },
    {
      name: 'API de Gemini (Google AI Studio)',
      url: 'https://aistudio.google.com',
      for: 'Modelos de Google con un nivel gratuito generoso.',
      cost: 'Nivel gratuito con límites; de pago, Gemini 2.5 Flash-Lite a 0,10 USD por millón de tokens de entrada y 0,40 USD de salida.',
      trap: 'En el nivel gratuito, Google puede usar lo que envías para mejorar sus productos: nada privado ahí.',
      source: 'gemini',
    },
    {
      name: 'Ollama',
      url: 'https://ollama.com',
      for: 'Ejecutar un modelo abierto en tu propio ordenador, sin enviar nada fuera.',
      cost: 'Gratis, código abierto con licencia MIT; pagas el ordenador y la electricidad.',
      trap: 'Su contexto por defecto es pequeño; Hermes exige al menos 64.000 tokens (`OLLAMA_CONTEXT_LENGTH=64000`).',
      source: 'hermes-providers',
    },
    {
      name: 'Hetzner Cloud',
      url: 'https://www.hetzner.com/cloud',
      for: 'Un servidor pequeño alquilado para que el agente esté siempre encendido.',
      cost: 'CX23 (2 vCPU, 4 GB, 40 GB) a 5,99 € al mes sin IVA, con IPv4; disponibilidad variable.',
      trap: 'El servidor es tuyo: actualizaciones, copias de seguridad y seguridad también.',
      source: 'hetzner',
    },
  ],
  next: {
    intro:
      'La guía es y seguirá siendo gratuita. Si un día quieres ir más rápido, esto es lo que viene. Sin precios ni fechas: todavía no existen.',
    items: [
      { title: 'El kit MDIB', text: 'Flujos ya preparados para tareas habituales y un instalador que ejecutas tú, en tu máquina y con tu cuenta.' },
      { title: 'Puesta en marcha de alcance cerrado', text: 'Te lo dejamos montado para una tarea, con el alcance fijado de antemano y todo entregado por escrito, de principio a fin.' },
    ],
    cta: 'Avísame cuando exista',
  },
  hood: [
    'Machines Do It Better (MDIB) enseña a montar agentes de IA que son de quien los usa: su cuenta, sus datos, su modelo. Esta web es estática, sin analítica ni cookies, y su código y el texto de esta guía están en un [repositorio público](https://github.com/ponzgpt/machines-do-it-better).',
    'Detrás está Javier Ponz: diez años de soporte técnico en Apple. Más sobre él en [javierponz.technoir.cloud](https://javierponz.technoir.cloud).',
    'MDIB está en fase previa al lanzamiento y todavía no tiene clientes de pago. Ni MDIB ni Javier están afiliados a Nous Research ni a ninguna de las herramientas citadas, y no hay enlaces de afiliado.',
  ],
  notice: [
    'Esto es material formativo, no asesoramiento profesional, técnico ni legal. Lo que haces en tu máquina y con tus cuentas es responsabilidad tuya.',
    'Los precios y las herramientas cambian. Todo lo marcado como estimación es una estimación; lo que no se pudo comprobar lleva «sin verificar».',
    'Edición de {edition}. Se revisa cada tres meses; si lees esto mucho después, comprueba las fuentes antes de pagar nada.',
  ],
  sources: [
    { id: 'hermes-repo', label: 'Hermes Agent, repositorio y licencia MIT', url: 'https://github.com/NousResearch/hermes-agent' },
    { id: 'hermes-install', label: 'Hermes Agent, instalación y actualización', url: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation' },
    { id: 'hermes-quickstart', label: 'Hermes Agent, inicio rápido', url: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart' },
    { id: 'hermes-platforms', label: 'Hermes Agent, plataformas compatibles', url: 'https://hermes-agent.nousresearch.com/docs/getting-started/platform-support' },
    { id: 'hermes-providers', label: 'Hermes Agent, proveedores de modelos y contexto mínimo', url: 'https://hermes-agent.nousresearch.com/docs/integrations/providers' },
    { id: 'hermes-telegram', label: 'Hermes Agent, Telegram', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram' },
    { id: 'hermes-personality', label: 'Hermes Agent, SOUL.md', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/personality' },
    { id: 'hermes-memory', label: 'Hermes Agent, memoria', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/memory' },
    { id: 'hermes-cron', label: 'Hermes Agent, tareas programadas', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/cron' },
    { id: 'hermes-security', label: 'Hermes Agent, seguridad y aprobaciones', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
    { id: 'telegram-bots', label: 'Telegram, preguntas frecuentes sobre bots', url: 'https://core.telegram.org/bots/faq' },
    { id: 'nous-portal', label: 'Nous Portal, planes y precios', url: 'https://portal.nousresearch.com' },
    { id: 'openrouter', label: 'OpenRouter, precios y límites gratuitos', url: 'https://openrouter.ai/pricing' },
    { id: 'gemini', label: 'API de Gemini, precios y nivel gratuito', url: 'https://aistudio.google.com/docs/pricing' },
    { id: 'ollama', label: 'Ollama, repositorio y licencia MIT', url: 'https://github.com/ollama/ollama' },
    { id: 'hetzner', label: 'Hetzner Cloud, planes Cost-Optimized', url: 'https://www.hetzner.com/cloud/cost-optimized/' },
  ],
  agentBrief: [
    'Eres el tutor de la persona que te ha dado este archivo. Quiere montar su propio agente de IA siguiendo esta guía y no sabe programar.',
    'Empieza preguntándole qué tarea quiere que haga su agente y ayúdale a escribirla en cinco frases (paso 1).',
    'Ve de paso en paso, en orden. No pases al siguiente hasta que haya hecho el ejercicio y te haya contado el resultado; compruébalo con ella.',
    'Nunca le pidas contraseñas, claves de API, tokens ni códigos en el chat. Si va a pegar uno, detenla y explícale dónde va (`~/.hermes/.env`).',
    'Si algo de la guía no coincide con lo que ve en pantalla, dile que puede estar desactualizado (edición de {edition}) y que lo compruebe en la fuente oficial enlazada.',
    'Explica sin jerga. Si no sabes algo, dilo; no inventes órdenes ni precios.',
  ],
};
