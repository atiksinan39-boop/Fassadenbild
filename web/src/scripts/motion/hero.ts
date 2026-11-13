import { gsap } from 'gsap';

const fmt = (n: number) => n.toLocaleString('de-DE');

/** Hero: Wörter hinter Maske, Maßlinie von der Mitte, Kennzahlen zählen, Parallaxe. */
export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const words = hero.querySelectorAll<HTMLElement>('.hero__title .wi');
  const [kicker, intro, ctas] = hero.querySelectorAll<HTMLElement>('[data-hero-fade]');
  const measure = hero.querySelector<HTMLElement>('[data-measure]')!;
  const stats = hero.querySelector<HTMLElement>('[data-stats]')!;

  const tl = gsap.timeline({ delay: 0.15 });
  tl.fromTo(kicker, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 })
    .fromTo(words, { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.2, stagger: 0.085, ease: 'expo.out' }, 0.1)
    .fromTo([intro, ctas], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.65);

  // Maßlinie: Text zuerst, Linien von der Mitte nach außen, dann die Endmarken
  const mText = measure.querySelector('.measure__text');
  const mLines = measure.querySelectorAll('.measure__line');
  const mTicks = measure.querySelectorAll('.measure__tick');
  tl.fromTo(mText, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.95)
    .fromTo(mLines, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 1.0)
    .fromTo(mTicks, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.6 }, 2.0);

  // Kennzahlenleiste
  const rule = stats.querySelector('.stats__rule');
  const cells = stats.querySelectorAll<HTMLElement>('.stat');
  tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 1.15)
    .fromTo(cells, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 1.35);

  stats.querySelectorAll<HTMLElement>('[data-count]').forEach((el, i) => {
    const to = Number(el.dataset.count);
    const o = { v: 0 };
    el.setAttribute('aria-hidden', 'true');
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = fmt(to);
    el.after(sr);
    el.style.minWidth = `${el.getBoundingClientRect().width}px`; // Breite fixieren, nichts springt
    el.textContent = '0';
    tl.to(o, {
      v: to, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = fmt(Math.round(o.v)); },
    }, 1.45 + i * 0.15);
  });

  // Parallaxe beim Wegscrollen
  const media = hero.querySelector('[data-hero-media]');
  gsap.to(media, {
    yPercent: 14, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  const body = hero.querySelector('.hero__body');
  gsap.to(body, {
    yPercent: -6, opacity: 0.25, ease: 'none',
    scrollTrigger: { trigger: hero, start: '35% top', end: 'bottom top', scrub: true },
  });

}
