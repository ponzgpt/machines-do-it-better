// The guide, in English: a faithful version of es.mjs (Spanish is the original). Same shape, same sources.
export default {
  lang: 'en',
  checked: '2026-11-13',
  edition: '2026-11',
  title: 'You don’t need to code.',
  subtitle:
    'A free guide in {steps} steps that ends with your own AI agent running on a machine you control and doing one real task for you.',
  files: { pdf: '/own-agent-guide.pdf', md: '/own-agent-guide.md' },
  labels: {
    edition: 'Edition',
    reading: 'reading',
    handsOn: 'hands-on',
    steps: 'steps',
    tools: 'tools',
    outcomesTitle: 'When you finish you will have:',
    howTitle: 'How to use this document',
    methodTitle: 'The method',
    step: 'Step',
    do: 'What you do',
    why: 'Why',
    exercise: 'Exercise for today',
    trap: 'The usual trap',
    minutes: 'min',
    toolsTitle: 'The toolbox',
    toolFor: 'What it is for',
    toolCost: 'What it costs',
    toolTrap: 'Its trap',
    nextTitle: 'What comes next',
    hoodTitle: 'Under the hood',
    noticeTitle: 'Notice',
    sourcesTitle: 'Sources',
    sourcesNote: 'Checked on 13 November 2026 on each tool’s official site.',
    source: 'source',
    estimate: 'estimate',
  },
  outcomes: [
    'One concrete task, chosen and written down in five sentences, with what you will not automate ruled out from the start.',
    'Your agent installed on a machine you control, with the model you choose and its cost in plain sight.',
    'A Telegram bot that answers only you.',
    'A scheduled task that reaches you on its own every day, and a fifteen-minute monthly routine that keeps it working.',
  ],
  numbers: [
    { value: '{steps}', label: 'steps, in order' },
    { value: '{tools}', label: 'tools, each with its price and its source' },
    { value: '€0', label: 'is what the method costs: the guide and the files are free' },
    {
      value: '€0–25',
      label: 'a month is what running it can cost (estimate)',
      note:
        '€0 if you use your own computer and a free or local model. About 2 USD a month if one daily task uses a paid model (estimate: 30 runs of about 20,000 input and 2,000 output tokens at 2 and 10 USD per million). Up to about €25 if you also rent a small server or pay for a 20 USD-a-month managed service.',
    },
  ],
  howToUse: [
    'Read it all once before touching anything: about {reading}.',
    'Do the steps in order. Each one ends with an exercise you can do today; don’t move on until you have done it.',
    'Download the version for your agent (.md) and give it to your AI assistant (ChatGPT, Claude or whichever you use): it will tutor you step by step and check each exercise with you.',
  ],
  steps: [
    {
      title: 'Choose ONE task',
      do:
        'Pick a task you repeat every week, that annoys you, and that you could explain to someone else: what you look at, in what order and what you hand over. Good first tasks: a morning summary of what is pending, habit reminders, watching your industry’s news with source and date. Out from day one: health or clinical data, your company’s secrets, passwords, regulated systems (banking, payroll, case files) and anything that moves money or sends messages in your name without your OK.',
      why:
        'A clear task can be checked: you know whether the agent did it right. Ten vague tasks can’t, and an agent you can’t check is not one you can trust.',
      exercise: {
        minutes: 10,
        text:
          'Write your task in five sentences: when it happens, where the information comes from, what you do with it, what you hand over and how you would know it was done right. Keep them: you will use them in step 6.',
      },
      trap: 'Starting with the most important task instead of the most repeated one. The first one should be boring and low-risk.',
      sources: [],
    },
    {
      title: 'Decide where it lives',
      do:
        'Three options. Your own computer: €0, but the agent only works while it is on and awake (Hermes runs on Apple Silicon Macs, Linux, Windows and WSL2). A small rented server, for example on Hetzner Cloud, whose CX23 plan (2 vCPU, 4 GB RAM, 40 GB disk) was listed at €5.99 a month excluding VAT: always on, but you maintain it. Or a managed service: Nous Portal’s Plus plan costs 20 USD a month and includes a cloud agent with 4 GB RAM and 25 GB disk; you skip server upkeep in exchange for depending on their account.',
      why:
        'Where it lives decides who can switch it off, who holds your data and how much upkeep falls on you. There is no best option: there is the one that fits your task.',
      exercise: {
        minutes: 5,
        text:
          'Answer one question: does your task have to happen while your computer is off? If not, start on your computer.',
      },
      trap: 'Renting a server before you know the task is worth it. Start with what you already have and decide later.',
      sources: ['hermes-platforms', 'hetzner', 'nous-portal'],
    },
    {
      title: 'Choose the model',
      do:
        'The model does the thinking; the agent is everything around it. Three paths. A paid cloud model: you pay per use; as a reference, Nous Portal lists Claude Sonnet 5.5 at 2 USD per million input tokens and 10 USD per million output tokens. A free tier: OpenRouter offers more than 25 free models, capped at 20 requests a minute and 50 a day, and the Gemini API has a free tier in which Google may use what you send to improve its products. Or a local model with Ollama: free and private, but you need a computer with enough memory (how much is unverified: it depends on the model) and a context of at least 64,000 tokens, the minimum Hermes requires.',
      why:
        'The model decides the quality of the answers, what you pay and who reads what you write to it. Choose it on purpose, not by default.',
      exercise: {
        minutes: 10,
        text:
          'Create the account with the provider you chose and, if it is paid and the provider allows it, set a spending limit. Note where your key is, but don’t paste it into any chat.',
      },
      trap:
        'Trying only the free tier and concluding that “agents don’t work”. An agent makes several requests per task, and 50 a day run out fast.',
      sources: ['nous-portal', 'openrouter', 'gemini', 'hermes-providers', 'ollama'],
    },
    {
      title: 'Install the harness',
      do:
        'The harness is the program that turns a model into an agent: memory, tools, scheduled tasks and channels. This guide uses Hermes Agent, open source (MIT licence) and published by Nous Research. On a Mac, Linux or WSL2, open the terminal and run `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`; on Windows, in PowerShell, `iex (irm https://hermes-agent.nousresearch.com/install.ps1)`. Reload the terminal (`source ~/.zshrc` or `source ~/.bashrc`), run `hermes doctor` to see whether anything is missing and `hermes model` to choose provider and model. If you chose Nous Portal, `hermes setup --portal` signs you up in one step. By default the installer adds a browser and computer-use tools; the documentation explains how to leave them out.',
      why:
        'It is the part you don’t want to program yourself: it keeps the memory, runs the tasks on time and asks your permission before doing anything dangerous.',
      exercise: {
        minutes: 20,
        text:
          'Install it, repeat `hermes doctor` until it shows no errors, and open `hermes` to ask it something simple: “Summarise in three lines what you can do”.',
      },
      trap:
        'Pasting the model key into the chat. Keys go in `~/.hermes/.env`; `hermes model` and `hermes config set` put them there for you.',
      sources: ['hermes-install', 'hermes-quickstart', 'hermes-repo'],
    },
    {
      title: 'Connect a channel you already use',
      do:
        'In Telegram, open @BotFather and send `/newbot`; choose a name and a username ending in “bot”. It gives you a token: treat it like a password. Ask @userinfobot for your user ID (a number, not your username). Then run `hermes gateway setup`, choose Telegram and paste the token and your ID. Start the channel with `hermes gateway`, or in the background with `hermes gateway start`, and message the bot.',
      why:
        'You talk to the agent where you already are, from your phone, and the list of allowed users makes it answer only you.',
      exercise: {
        minutes: 15,
        text:
          'Create the bot, connect it and send it “hello”. Then ask someone to message it from their account and check that it does not answer them.',
      },
      trap:
        'Leaving the bot open. With no allowed-users list (`TELEGRAM_ALLOWED_USERS`), Hermes serves no one: don’t “fix” that by turning on `GATEWAY_ALLOW_ALL_USERS`. If the token leaks, revoke it with `/revoke` in @BotFather.',
      sources: ['hermes-telegram', 'hermes-security', 'telegram-bots'],
    },
    {
      title: 'Give it instructions and memory',
      do:
        'Three places. `~/.hermes/SOUL.md`: tone and way of speaking, the base of every conversation. Memory, in `~/.hermes/memories/`: `USER.md` about you and `MEMORY.md` for its own notes; they are short on purpose (1,375 and 2,200 characters), and saying “remember that…” is enough. And the scheduled task: ask for it in words (“Every weekday at 7:30, send me on Telegram…”) or with `/cron add`. Scheduled tasks are run by the gateway you started in step 5 (`hermes gateway`): if it is off, they don’t run.',
      why:
        'Instructions turn a generic chat into your agent for your task; the scheduled task makes it work without you asking.',
      exercise: {
        minutes: 20,
        text:
          'Send it your five sentences from step 1 on Telegram, ask it to schedule the task and to run it once now as a test. Correct what doesn’t work for you until the result is what you would have handed over yourself.',
      },
      trap: 'Writing very long instructions. If they don’t fit on one screen, it isn’t one task: it is several.',
      sources: ['hermes-personality', 'hermes-memory', 'hermes-cron'],
    },
    {
      title: 'Permissions and security',
      do:
        'An agent can run commands on the machine it lives on. Never give it: your passwords, bank credentials or verification codes; full access to your email or calendar for the first task; permission to send, pay, delete or publish without asking you; health data, your clients’ data or your company’s secrets; the no-approvals mode (`--yolo` or `approvals.mode: off`) outside a test; or a bot open to anyone. And do: leave `approvals.mode` on `smart` (the default) or `manual`, protect the keys file with `chmod 600 ~/.hermes/.env` and, on a server, use `terminal.backend: docker` and a user without administrator rights.',
      why:
        'Models make mistakes. Permissions decide what a mistake costs: a bad summary can be corrected; a sent email or a deleted file can’t.',
      exercise: {
        minutes: 10,
        text:
          'Open `~/.hermes/config.yaml` and check that `approvals.mode` is not `off`. Run `chmod 600 ~/.hermes/.env`.',
      },
      trap: 'Giving it more access “so it is more useful” before the first task has worked well for a week.',
      sources: ['hermes-security'],
    },
    {
      title: 'Keep it alive',
      do:
        'Update with `hermes update`; if something is missing from the configuration afterwards, `hermes config check` and `hermes config migrate`. Your data, memory and keys live in `~/.hermes/`. The documentation consulted does not describe a backup procedure (unverified), so the prudent thing is to copy that folder, which includes your keys, to an encrypted disk. When something breaks: `hermes doctor` first; if the bot doesn’t answer, `hermes gateway status`; if answers come back empty or broken, run `hermes model` again.',
      why:
        'An agent nobody looks after stops working silently: models change, keys expire, the computer restarts.',
      exercise: {
        minutes: 10,
        text:
          'Put a fifteen-minute monthly review in your calendar: `hermes update`, `hermes doctor` and a test of your task.',
      },
      trap:
        'Assuming that if it doesn’t message you, all is well. Ask it in the task to always say something, even when there is nothing new.',
      sources: ['hermes-install', 'hermes-quickstart'],
    },
  ],
  tools: [
    {
      name: 'Hermes Agent',
      url: 'https://hermes-agent.nousresearch.com/docs',
      for: 'The harness: turns a model into an agent with memory, scheduled tasks and channels.',
      cost: 'Free, open source under the MIT licence.',
      trap: 'With the default `local` backend it runs commands directly on your machine, with no isolation: read step 7.',
      source: 'hermes-repo',
    },
    {
      name: 'Telegram and @BotFather',
      url: 'https://core.telegram.org/bots',
      for: 'The channel: you talk to your agent from your phone like any other contact.',
      cost: 'Free: bots can message their users at no cost.',
      trap: 'Whoever holds the token controls the bot. If it leaks, `/revoke` in @BotFather.',
      source: 'telegram-bots',
    },
    {
      name: 'Nous Portal',
      url: 'https://portal.nousresearch.com',
      for: 'Managed service: models and, on paid plans, an agent hosted in their cloud.',
      cost: 'Free plan with free models; Plus, 20 USD a month with a cloud agent of 4 GB RAM and 25 GB disk.',
      trap: 'API keys always spend pay-as-you-go credits, not the usage included in the plan.',
      source: 'nous-portal',
    },
    {
      name: 'OpenRouter',
      url: 'https://openrouter.ai',
      for: 'One account to try many models, including more than 25 free ones.',
      cost: 'Free models: 20 requests a minute and 50 a day (1,000 a day after buying 10 USD of credits); 5.5% fee when buying credits.',
      trap: 'A negative balance blocks the free models too.',
      source: 'openrouter',
    },
    {
      name: 'Gemini API (Google AI Studio)',
      url: 'https://aistudio.google.com',
      for: 'Google’s models with a generous free tier.',
      cost: 'Free tier with limits; paid, Gemini 2.5 Flash-Lite at 0.10 USD per million input tokens and 0.40 USD output.',
      trap: 'On the free tier Google may use what you send to improve its products: nothing private there.',
      source: 'gemini',
    },
    {
      name: 'Ollama',
      url: 'https://ollama.com',
      for: 'Running an open model on your own computer, sending nothing out.',
      cost: 'Free, open source under the MIT licence; you pay for the computer and the electricity.',
      trap: 'Its default context is small; Hermes needs at least 64,000 tokens (`OLLAMA_CONTEXT_LENGTH=64000`).',
      source: 'hermes-providers',
    },
    {
      name: 'Hetzner Cloud',
      url: 'https://www.hetzner.com/cloud',
      for: 'A small rented server so the agent is always on.',
      cost: 'CX23 (2 vCPU, 4 GB, 40 GB) at €5.99 a month excluding VAT, IPv4 included; availability varies.',
      trap: 'The server is yours: updates, backups and security too.',
      source: 'hetzner',
    },
  ],
  next: {
    intro:
      'The guide is free and will stay free. If one day you want to go faster, this is what comes next. No prices or dates: they don’t exist yet.',
    items: [
      { title: 'The MDIB kit', text: 'Ready-made flows for common tasks and an installer you run yourself, on your machine and with your account.' },
      { title: 'Fixed-scope setup', text: 'We set it up for one task, with the scope fixed in advance and everything delivered in writing, start to finish.' },
    ],
    cta: 'Tell me when it exists',
  },
  hood: [
    'Machines Do It Better (MDIB) teaches people to set up AI agents that belong to whoever uses them: their account, their data, their model. This site is static, with no analytics or cookies, and its code and the text of this guide are in a [public repository](https://github.com/ponzgpt/machines-do-it-better).',
    'Behind it is Javier Ponz: ten years of technical support at Apple. More about him at [javierponz.technoir.cloud](https://javierponz.technoir.cloud).',
    'MDIB is pre-launch and has no paying clients yet. Neither MDIB nor Javier is affiliated with Nous Research or any of the tools named here, and there are no affiliate links.',
  ],
  notice: [
    'This is training material, not professional, technical or legal advice. What you do on your machine and with your accounts is your responsibility.',
    'Prices and tools change. Everything marked as an estimate is an estimate; what could not be checked says “unverified”.',
    'Edition of {edition}. Revised every three months; if you read this much later, check the sources before paying for anything.',
  ],
  sources: [
    { id: 'hermes-repo', label: 'Hermes Agent, repository and MIT licence', url: 'https://github.com/NousResearch/hermes-agent' },
    { id: 'hermes-install', label: 'Hermes Agent, installation and updating', url: 'https://hermes-agent.nousresearch.com/docs/getting-started/installation' },
    { id: 'hermes-quickstart', label: 'Hermes Agent, quickstart', url: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart' },
    { id: 'hermes-platforms', label: 'Hermes Agent, platform support', url: 'https://hermes-agent.nousresearch.com/docs/getting-started/platform-support' },
    { id: 'hermes-providers', label: 'Hermes Agent, model providers and minimum context', url: 'https://hermes-agent.nousresearch.com/docs/integrations/providers' },
    { id: 'hermes-telegram', label: 'Hermes Agent, Telegram', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram' },
    { id: 'hermes-personality', label: 'Hermes Agent, SOUL.md', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/personality' },
    { id: 'hermes-memory', label: 'Hermes Agent, memory', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/memory' },
    { id: 'hermes-cron', label: 'Hermes Agent, scheduled tasks', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/cron' },
    { id: 'hermes-security', label: 'Hermes Agent, security and approvals', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/security' },
    { id: 'telegram-bots', label: 'Telegram, bots FAQ', url: 'https://core.telegram.org/bots/faq' },
    { id: 'nous-portal', label: 'Nous Portal, plans and prices', url: 'https://portal.nousresearch.com' },
    { id: 'openrouter', label: 'OpenRouter, pricing and free limits', url: 'https://openrouter.ai/pricing' },
    { id: 'gemini', label: 'Gemini API, pricing and free tier', url: 'https://aistudio.google.com/docs/pricing' },
    { id: 'ollama', label: 'Ollama, repository and MIT licence', url: 'https://github.com/ollama/ollama' },
    { id: 'hetzner', label: 'Hetzner Cloud, Cost-Optimized plans', url: 'https://www.hetzner.com/cloud/cost-optimized/' },
  ],
  agentBrief: [
    'You are the tutor of the person who gave you this file. They want to set up their own AI agent by following this guide, and they can’t code.',
    'Start by asking what task they want their agent to do, and help them write it down in five sentences (step 1).',
    'Go one step at a time, in order. Don’t move on until they have done the exercise and told you the result; check it with them.',
    'Never ask for passwords, API keys, tokens or codes in the chat. If they are about to paste one, stop them and explain where it goes (`~/.hermes/.env`).',
    'If something in the guide doesn’t match what they see on screen, tell them it may be out of date (edition of {edition}) and to check the official source linked.',
    'Explain without jargon. If you don’t know something, say so; don’t invent commands or prices.',
  ],
};
