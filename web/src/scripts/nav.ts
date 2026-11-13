import { scrollToTarget, stopScroll, startScroll } from './motion/smooth';

/** Navigation: kompakt beim Scrollen, Menü auf Mobil, Ankerlinks mit Fokusübergabe. */
export function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  // Kompakter Zustand mit dunklem Grund
  let ticking = false;
  const update = () => {
    nav.classList.toggle('is-compact', window.scrollY > 40);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  // Menü (unter 1024px)
  const btn = nav.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const menu = nav.querySelector<HTMLElement>('[data-menu]');
  const label = nav.querySelector<HTMLElement>('[data-menu-label]');
  const setOpen = (open: boolean, returnFocus = true) => {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Schließen' : 'Menü';
    menu.hidden = !open;
    nav.classList.toggle('is-menu-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) { stopScroll(); menu.querySelector<HTMLElement>('a')?.focus(); }
    else { startScroll(); if (returnFocus) btn.focus(); }
  };
  btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn?.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setOpen(false, false); });

  // Ankerlinks: weiches Scrollen + Fokus auf das Ziel (Tastaturbedienung)
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    if (btn?.getAttribute('aria-expanded') === 'true') setOpen(false, false);
    scrollToTarget(target);
    history.pushState(null, '', `#${id}`);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}
