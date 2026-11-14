// The newsletter pop-up, for first-time visitors only, once. One localStorage key and no cookies:
//   absent        → first page view: we store "pending:<time of first view>"
//   pending:<ms>  → opens 25 s after the first view or at 50 % scroll of a page, whichever comes first
//   done          → shown, dismissed, or not wanted (arrived from the newsletter, or not a first visit): never again
// The layout leaves the dialog out of the legal pages, the newsletter page and the 404, so this never runs there:
// the 25 s start on the first page that has the dialog.
export const KEY = 'mdib-newsletter-prompt';
const DELAY_MS = 25_000;
const FIRST_VISIT_MS = 30 * 60_000; // ponytail: a "pending" older than 30 min means a returning visitor; no session tracking.

const read = () => { try { return localStorage.getItem(KEY); } catch { return 'done'; } };
const write = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* storage blocked: then it simply never shows */ } };

export function fromNewsletter(search: string, referrer: string) {
  return new URLSearchParams(search).get('utm_source') === 'newsletter' || /(^|\.)beehiiv\.com$/i.test(hostOf(referrer));
}
const hostOf = (url: string) => { try { return new URL(url).hostname; } catch { return ''; } };

export function mountNewsletterPrompt(dialog: HTMLDialogElement | null) {
  if (!dialog || typeof dialog.showModal !== 'function') return;
  let state = read();
  if (state === null) {
    if (fromNewsletter(location.search, document.referrer)) { write('done'); return; }
    state = `pending:${Date.now()}`;
    write(state);
  }
  if (!state.startsWith('pending:')) return;
  const first = Number(state.slice(8)) || Date.now();
  if (Date.now() - first > FIRST_VISIT_MS || fromNewsletter(location.search, document.referrer)) { write('done'); return; }

  let opener: Element | null = null;
  const open = () => {
    if (read() !== state || dialog.open) return; // another tab already showed it
    cleanup();
    write('done');
    opener = document.activeElement;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-subscribe]')?.focus();
  };
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (max > 0 && scrollY / max >= 0.5) open();
  };
  const timer = window.setTimeout(open, Math.max(0, DELAY_MS - (Date.now() - first)));
  const cleanup = () => { clearTimeout(timer); removeEventListener('scroll', onScroll); };
  addEventListener('scroll', onScroll, { passive: true });

  // Focus stays inside: showModal() makes the page inert; Tab and Shift+Tab also wrap between the two buttons.
  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll<HTMLElement>('a[href],button')];
    const [firstEl, lastEl] = [items[0], items[items.length - 1]];
    if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
  });
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-subscribe]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { // a click on the backdrop (outside the box) also closes it
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { if (opener instanceof HTMLElement) opener.focus(); });
}
