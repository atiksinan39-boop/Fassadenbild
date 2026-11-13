import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../../data/content';
import { scrollToY } from './smooth';

gsap.registerPlugin(ScrollTrigger);

/** Versatz vom auseinandergezogenen Markup-Zustand zum zusammengesetzten Paket (SVG-Einheiten). */
const COLLAPSE: Record<string, number> = { wand: -100, kleber: -14, traeger: 72, druck: 156 };

/**
 * System-Sequenz: Abschnitt wird fixiert, pro Träger eine Stufe.
 * Links Schichtgrafik (Wand, Kleber, Träger, Druck), rechts die Daten.
 * Nur Desktop ab 1024px und ohne prefers-reduced-motion; sonst bleibt die Liste.
 */
export function initSystem() {
  const root = document.querySelector<HTMLElement>('[data-system]');
  if (!root) return;
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', (ctx) => {
    const pin = root.querySelector<HTMLElement>('[data-sys-pin]')!;
    const stage = root.querySelector<HTMLElement>('[data-sys-stage]')!;
    const specsEl = root.querySelector<HTMLElement>('[data-specs]')!;
    const specs = [...root.querySelectorAll<HTMLElement>('[data-spec]')];
    const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-step]')];
    const fills = buttons.map((b) => b.querySelector('.sys-rail__fill'));
    const svg = root.querySelector<SVGSVGElement>('[data-sys-svg]')!;
    const layer = (k: string) => svg.querySelector(`[data-layer="${k}"]`);
    const detail = (k: string) => svg.querySelector<SVGTextElement>(`[data-detail="${k}"]`)!;
    const prints = [...svg.querySelectorAll<SVGImageElement>('[data-print]')];
    const mesh = svg.querySelector('[data-carrier="mesh"]');
    const dimVal = svg.querySelector<SVGTSpanElement>('[data-dim-val]')!;
    const dim = [svg.querySelector('[data-dim]'), svg.querySelector('[data-dim-text]')];
    const labels = [...svg.querySelectorAll('[data-label]')].reverse(); // Druck zuerst
    const leaders = [...svg.querySelectorAll('[data-leader]')].reverse();
    const defaults = { traeger: detail('traeger').textContent, wand: detail('wand').textContent, dim: dimVal.textContent };

    root.classList.add('is-seq');
    specsEl.classList.remove('specs--list');
    gsap.set(specs, { autoAlpha: 0 });

    const n = specs.length;
    let active = -1;
    let dimNow = Number(defaults.dim);

    const swapText = (el: Element, text: string) => {
      if (el.textContent === text) return;
      gsap.killTweensOf(el);
      gsap.timeline()
        .to(el, { opacity: 0, duration: 0.25, ease: 'power1.in' })
        .add(() => { el.textContent = text; })
        .to(el, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    };

    // Benannt registrieren: so landen später erzeugte Tweens im matchMedia-Kontext (und werden beim Wechsel zurückgesetzt).
    ctx.add('setActive', (i: number) => {
      if (i === active) return;
      const prev = active;
      active = i;
      const p = products[i];

      buttons.forEach((b, j) => (j === i ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current')));

      if (prev >= 0) {
        specs[prev].classList.remove('is-active');
        gsap.to(specs[prev], { autoAlpha: 0, y: -14, duration: 0.45, ease: 'power2.in', overwrite: true });
      }
      const next = specs[i];
      next.classList.add('is-active');
      gsap.set(next, { autoAlpha: 1, y: 0, overwrite: true });
      gsap.fromTo(
        next.querySelectorAll('[data-line]'),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, delay: prev >= 0 ? 0.25 : 0, overwrite: true },
      );

      // Grafik: Druckmotiv, Trägerstruktur, Beschriftung, Maß
      prints.forEach((img) =>
        gsap.to(img, { opacity: img.dataset.print === p.print ? 1 : 0, duration: 1, ease: 'power2.inOut', overwrite: true }),
      );
      gsap.to(mesh, { opacity: p.carrier === 'mesh' ? 1 : 0, duration: 0.9, ease: 'power2.inOut', overwrite: true });
      swapText(detail('traeger'), p.traeger);
      swapText(detail('wand'), p.wandDetail);
      if (dimNow !== p.bahn) {
        const o = { v: dimNow };
        dimNow = p.bahn;
        gsap.to(o, { v: p.bahn, duration: 0.9, ease: 'power2.out', overwrite: true, onUpdate: () => { dimVal.textContent = String(Math.round(o.v)); } });
      }
    });
    const setActive = (i: number) => (ctx as any).setActive(i);

    const indexFor = (progress: number) => Math.min(n - 1, Math.max(0, Math.floor(progress * (1 + n) - 1)));

    // Fixierte Sequenz: 1 Einheit Aufbau, dann 1 Einheit je Träger
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${window.innerHeight * (n * 0.9 + 0.7)}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => { if (self.progress > 0) setActive(indexFor(self.progress)); },
      },
    });

    Object.entries(COLLAPSE).forEach(([k, dy]) => {
      tl.fromTo(layer(k), { y: dy }, { y: 0, duration: 1, ease: 'power2.inOut' }, 0);
    });
    tl.fromTo(leaders, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.35, stagger: 0.08 }, 0.55)
      .fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.08 }, 0.6)
      .fromTo(dim, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.85);
    fills.forEach((f, i) => tl.fromTo(f, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 1 + i));

    // Erste Stufe schon zeigen, wenn die Bühne ins Bild kommt
    ScrollTrigger.create({ trigger: stage, start: 'top 75%', once: true, onEnter: () => { if (active < 0) setActive(0); } });

    // Schrittleiste: springt zur Mitte der jeweiligen Stufe
    const onStep = (e: Event) => {
      const i = Number((e.currentTarget as HTMLElement).dataset.step);
      const st = tl.scrollTrigger!;
      scrollToY(st.start + (st.end - st.start) * ((1.5 + i) / (1 + n)));
    };
    buttons.forEach((b) => b.addEventListener('click', onStep));

    return () => {
      buttons.forEach((b) => { b.removeEventListener('click', onStep); b.removeAttribute('aria-current'); });
      specs.forEach((s) => s.classList.remove('is-active'));
      detail('traeger').textContent = defaults.traeger;
      detail('wand').textContent = defaults.wand;
      dimVal.textContent = defaults.dim;
      root.classList.remove('is-seq');
      specsEl.classList.add('specs--list');
    };
  });
}
