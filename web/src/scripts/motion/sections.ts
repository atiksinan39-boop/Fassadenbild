import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLines } from './reveal';

gsap.registerPlugin(ScrollTrigger);

const fmt = (n: number) => n.toLocaleString('de-DE');
const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Unterseiten-Kopf: Texte blenden per CSS ein; hier nur das Bild (Ankommen und Parallaxe). */
export function initPageHero() {
  const hero = document.querySelector<HTMLElement>('[data-page-hero]');
  const media = hero?.querySelector('[data-page-hero-media]');
  if (!hero || !media) return;
  gsap.fromTo(media, { scale: 1.06 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
  gsap.to(media, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
}

/** Leitsätze: Wort für Wort von blass zu voll, an den Scroll gebunden. */
function initInk() {
  document.querySelectorAll<HTMLElement>('[data-ink]').forEach((el) => {
    const words = (el.textContent ?? '').trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="iw">${w}</span>`).join(' ');
    gsap.fromTo(el.querySelectorAll('.iw'), { opacity: 0.16 }, {
      opacity: 1, ease: 'none', stagger: 0.5, duration: 1,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.5 },
    });
  });
}

/** Bilder: über eine Maske aufziehen, dazu leichte Parallaxe. */
function initWipes() {
  document.querySelectorAll<HTMLElement>('[data-wipe]').forEach((el) => {
    const img = el.querySelector('img');
    gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    });
    if (img) {
      gsap.fromTo(img, { scale: 1.14, yPercent: -4 }, {
        scale: 1.14, yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  });
}

/** Listen und Raster: Kinder nacheinander. */
function initStagger() {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((el) => {
    gsap.from(el.children, {
      opacity: 0, y: 18, duration: 0.9, stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 84%', once: true },
    });
  });
}

/** Ablauf: Fortschrittslinie füllt sich, Schrittnummern leuchten in Gold auf. */
function initSteps() {
  const wrap = document.querySelector<HTMLElement>('[data-steps]');
  if (!wrap) return;
  wrap.classList.add('is-anim');
  gsap.fromTo(wrap.querySelector('[data-steps-fill]'), { scaleY: 0 }, {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: wrap, start: 'top 62%', end: 'bottom 62%', scrub: 0.4 },
  });
  wrap.querySelectorAll('li').forEach((li) => {
    ScrollTrigger.create({
      trigger: li, start: 'top 62%',
      onEnter: () => li.classList.add('is-on'),
      onLeaveBack: () => li.classList.remove('is-on'),
    });
  });
}

/** Zahlen zählen einmal hoch, sobald sie ins Bild kommen. */
function initCounts() {
  document.querySelectorAll<HTMLElement>('[data-count-view]').forEach((el) => {
    const to = Number(el.dataset.countView);
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = fmt(to);
    el.setAttribute('aria-hidden', 'true');
    el.after(sr);
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    el.style.textAlign = 'right';
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, {
      v: to, duration: 1.5, ease: 'power2.out',
      onUpdate: () => { el.textContent = fmt(Math.round(o.v)); },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

/** Referenzen: Zeilen nacheinander; Platzhalter für das Projektfoto folgt dem Mauszeiger. */
function initRefs() {
  const list = document.querySelector<HTMLElement>('[data-refs]');
  if (!list) return;
  gsap.from(list.children, { opacity: 0, y: 16, duration: 0.8, stagger: 0.07, scrollTrigger: { trigger: list, start: 'top 84%', once: true } });

  const float = document.querySelector<HTMLElement>('[data-ref-float]');
  const name = float?.querySelector<HTMLElement>('[data-ref-float-name]');
  if (!float || !name || !fine()) return;
  gsap.set(float, { xPercent: 8, yPercent: -50, scale: 0.92 });
  const x = gsap.quickTo(float, 'x', { duration: 0.7, ease: 'power3.out' });
  const y = gsap.quickTo(float, 'y', { duration: 0.7, ease: 'power3.out' });
  list.addEventListener('pointermove', (e) => {
    const flip = e.clientX > window.innerWidth - 380;
    gsap.set(float, { xPercent: flip ? -108 : 8 });
    x(e.clientX); y(e.clientY);
  });
  list.querySelectorAll<HTMLElement>('li').forEach((li) => {
    li.addEventListener('pointerenter', () => { name.textContent = li.dataset.ref ?? ''; });
  });
  list.addEventListener('pointerenter', (e) => {
    gsap.set(float, { x: e.clientX, y: e.clientY });
    gsap.to(float, { autoAlpha: 1, scale: 1, duration: 0.6, overwrite: 'auto' });
  });
  list.addEventListener('pointerleave', () => gsap.to(float, { autoAlpha: 0, scale: 0.92, duration: 0.45, ease: 'power2.in', overwrite: 'auto' }));
}

/** HumanEco: Schriftzug wächst leicht, Karten gestaffelt. */
function initHumanEco() {
  const title = document.querySelector<HTMLElement>('[data-grow]');
  if (title) {
    gsap.fromTo(title, { scale: 0.86, opacity: 0.2, transformOrigin: '0% 100%' }, {
      scale: 1, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: title, start: 'top 92%', end: 'top 45%', scrub: 0.6 },
    });
  }
  const cards = gsap.utils.toArray<HTMLElement>('[data-cards] > *');
  if (cards.length) {
    gsap.set(cards, { opacity: 0, y: 36 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%', once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, overwrite: true }),
    });
  }
}

/** Schlusswort: Text zeilenweise, „Immer. Versprochen.“ als Letztes mit kurzer Verzögerung. */
function initKontakt() {
  const sec = document.querySelector<HTMLElement>('[data-kontakt]');
  const claim = sec?.querySelector<HTMLElement>('[data-claim]');
  const promise = sec?.querySelector<HTMLElement>('[data-promise]');
  if (!sec || !claim || !promise) return;
  const text = claim.textContent?.trim() ?? '';
  claim.setAttribute('aria-label', text);
  const { inner, revert } = splitLines(claim);
  inner.forEach((s) => s.setAttribute('aria-hidden', 'true'));
  const tl = gsap.timeline({ scrollTrigger: { trigger: claim, start: 'top 80%', once: true } });
  tl.from(inner, { yPercent: 108, duration: 1.15, stagger: 0.13, ease: 'expo.out', onComplete: () => { revert(); claim.removeAttribute('aria-label'); } })
    .from(promise, { opacity: 0, y: 14, duration: 1.2 }, '>+0.45');
  const form = sec.querySelector('.form');
  if (form) gsap.from(form, { opacity: 0, y: 28, duration: 1.1, scrollTrigger: { trigger: form, start: 'top 85%', once: true } });
}

export const sectionInits = [initInk, initWipes, initStagger, initSteps, initCounts, initRefs, initHumanEco, initKontakt];
