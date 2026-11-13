// Typed replay of the hand-authored session. The HTML ships every line in full, so the block is complete
// with JavaScript off and its height never changes: lines not reached yet are only hidden (visibility),
// and the line being typed keeps its untyped rest as invisible text. Starts when on screen, pauses when
// off screen, and shows everything at once under prefers-reduced-motion.
export function mountReplay(root: HTMLElement | null) {
  if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lines = [...root.querySelectorAll<HTMLElement>('li')];
  const spans = lines.map((li) => li.querySelector<HTMLElement>('[data-text]')!);
  const texts = spans.map((s) => s.textContent ?? '');
  const button = root.querySelector<HTMLButtonElement>('.replay')!;
  let line = 0, char = 0, visible = false, timer = 0, done = false;

  const reset = () => {
    line = 0; char = 0; done = false; button.hidden = true;
    lines.forEach((li, i) => { li.classList.add('pending'); spans[i].textContent = texts[i]; });
  };
  const paint = () => {
    const s = spans[line], full = texts[line];
    s.innerHTML = '';
    s.append(full.slice(0, char));
    const caret = document.createElement('i'); caret.className = 'caret'; caret.setAttribute('aria-hidden', 'true');
    const rest = document.createElement('span'); rest.className = 'rest'; rest.textContent = full.slice(char);
    s.append(caret, rest);
  };
  const tick = () => {
    timer = 0;
    if (!visible || done) return;
    const li = lines[line];
    li.classList.remove('pending');
    const isYou = li.classList.contains('you'), isMeta = li.classList.contains('meta');
    if (char < texts[line].length && !isMeta) {
      char = Math.min(texts[line].length, char + (isYou ? 1 : 3));
      paint();
      timer = window.setTimeout(tick, isYou ? 28 : 16);
      return;
    }
    spans[line].textContent = texts[line];
    line++; char = 0;
    if (line >= lines.length) { done = true; button.hidden = false; return; }
    timer = window.setTimeout(tick, isMeta ? 900 : 520);
  };

  // The whole transcript stays readable to assistive tech: only the visual typing is animated.
  root.querySelector('ol')!.setAttribute('aria-live', 'off');
  reset();
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !timer && !done) timer = window.setTimeout(tick, 300);
  }, { threshold: 0.35 }).observe(root);
  button.addEventListener('click', () => { clearTimeout(timer); timer = 0; reset(); if (visible) timer = window.setTimeout(tick, 200); });
}
