// The guide "for your agent", generated at build time from src/guide/en.mjs (served as /own-agent-guide.md).
import type { APIRoute } from 'astro';
import { guides, toMarkdown } from '../guide/render.mjs';
import { NEWSLETTER } from '../site';

export const GET: APIRoute = () =>
  new Response(toMarkdown(guides.en, { newsletter: NEWSLETTER }), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
