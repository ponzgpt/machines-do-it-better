/** Breaks a label into lines of at most `max` characters, on spaces, for SVG text (which does not wrap). */
export function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  for (const w of text.split(/\s+/)) {
    const last = out[out.length - 1];
    if (last !== undefined && (last + ' ' + w).length <= max) out[out.length - 1] = last + ' ' + w;
    else out.push(w);
  }
  return out;
}
