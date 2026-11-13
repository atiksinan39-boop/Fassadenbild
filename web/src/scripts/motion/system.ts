import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../../data/content';
import { scrollToY } from './smooth';

gsap.registerPlugin(ScrollTrigger);

/** Versatz vom auseinandergezogenen Markup-Zustand zum zusammengefügten Paket (SVG-Einheiten). */
const JOIN: Record<string, number> = { wand: -100, kleber: -14, traeger: 72, druck: 156 };
/** Starthöhe beim Einschweben (Wand kommt von unten, alles andere von oben). */
const DROP: Record<string, number> = { wand: 46, kleber: -150, traeger: -190, druck: -230 };
const ORDER = ['wand', 'kleber', 'traeger', 'druck'];

type Rig = ReturnType<typeof rig>;

/** Zugriff auf die Teile einer Schichtgrafik + Nachführen der Führungslinien. */
function rig(svg: SVGSVGElement) {
  const layer = (k: string) => svg.querySelector<SVGGElement>(`[data-layer="${k}"]`)!;
  const leaders = ORDER.map((k) => {
    const el = svg.querySelector<SVGPathElement>(`[data-leader="${k}"]`)!;
    const d = el.dataset;
    return { k, el, x0: +d.x0!, y0: +d.y0!, x1: +d.x1!, x2: +d.x2! };
  });
  const updateLeaders = () => {
    leaders.forEach(({ k, el, x0, y0, x1, x2 }) => {
      const dy = Number(gsap.getProperty(layer(k), 'y')) || 0;
      el.setAttribute('d', `M${x0} ${y0 + dy}L${x1} ${y0}L${x2} ${y0}`);
    });
  };
  return {
    svg, layer, updateLeaders,
    layers: ORDER.map(layer),
    label: (k: string) => svg.querySelector(`[data-label="${k}"]`)!,
    detail: (k: string) => svg.querySelector<SVGTextElement>(`[data-detail="${k}"]`)!,
    prints: [...svg.querySelectorAll<SVGImageElement>('[data-print]')],
    mesh: svg.querySelector('[data-carrier="mesh"]')!,
    dimVal: svg.querySelector<SVGTSpanElement>('[data-dim-val]')!,
    dim: [svg.querySelector('[data-dim]'), svg.querySelector('[data-dim-text]')],
    bond: svg.querySelector('[data-bond]')!,
  };
}

/** Schichten fügen sich von unten nach oben zusammen: Kleber auf Wand, Träger auf Kleber, Druck auf Träger. */
function join(tl: gsap.core.Timeline, r: Rig, at: number, dur: number) {
  const ease = 'power2.inOut';
  tl.fromTo(r.layer('wand'), { y: 0 }, { y: JOIN.wand, duration: dur * 0.6, ease, immediateRender: false }, at)
    .fromTo(r.layer('kleber'), { y: 0 }, { y: JOIN.kleber, duration: dur * 0.6, ease, immediateRender: false }, at)
    .fromTo(r.layer('traeger'), { y: 0 }, { y: JOIN.traeger, duration: dur * 0.62, ease, immediateRender: false }, at + dur * 0.18)
    .fromTo(r.layer('druck'), { y: 0 }, { y: JOIN.druck, duration: dur * 0.64, ease, immediateRender: false }, at + dur * 0.36)
    .fromTo(r.dim, { opacity: 1 }, { opacity: 0, duration: dur * 0.25, immediateRender: false }, at)
    .fromTo(r.bond, { opacity: 0 }, { opacity: 1, duration: dur * 0.2, immediateRender: false }, at + dur * 0.85);
}

/** Schichten lösen sich wieder, oberste zuerst. */
function split(tl: gsap.core.Timeline, r: Rig, at: number, dur: number) {
  const ease = 'power2.inOut';
  tl.fromTo(r.bond, { opacity: 1 }, { opacity: 0, duration: dur * 0.2, immediateRender: false }, at)
    .fromTo(r.layer('druck'), { y: JOIN.druck }, { y: 0, duration: dur * 0.7, ease, immediateRender: false }, at)
    .fromTo(r.layer('traeger'), { y: JOIN.traeger }, { y: 0, duration: dur * 0.7, ease, immediateRender: false }, at + dur * 0.12)
    .fromTo(r.layer('kleber'), { y: JOIN.kleber }, { y: 0, duration: dur * 0.7, ease, immediateRender: false }, at + dur * 0.24)
    .fromTo(r.layer('wand'), { y: JOIN.wand }, { y: 0, duration: dur * 0.7, ease, immediateRender: false }, at + dur * 0.24)
    .fromTo(r.dim, { opacity: 0 }, { opacity: 1, duration: dur * 0.3, immediateRender: false }, at + dur * 0.7);
}

/** Einschweben: Schicht für Schicht legt sich über die Wand, die Beschriftung folgt. */
function dropIn(tl: gsap.core.Timeline, r: Rig) {
  ORDER.forEach((k, i) => {
    const at = i * 0.2;
    tl.fromTo(r.layer(k), { y: DROP[k], opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, at)
      .fromTo(r.label(k), { opacity: 0 }, { opacity: 1, duration: 0.2 }, at + 0.25);
  });
  tl.fromTo(r.dim, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.85);
}

/**
 * System-Sequenz (Startseite): Abschnitt wird fixiert, pro Träger eine Stufe.
 * Links Schichtgrafik (Wand, Kleber, Träger, Druck), rechts die Daten.
 * Ablauf je Stufe: Schichten getrennt lesen, zusammenfügen, verklebt halten. Beim Wechsel lösen sie sich wieder.
 * Nur ab 1024px und ohne prefers-reduced-motion; sonst Liste mit einfacher Füge-Bewegung.
 */
export function initSystem() {
  const mm = gsap.matchMedia();
  const root = document.querySelector<HTMLElement>('[data-system]');

  if (root) {
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', (ctx) => {
      const pin = root.querySelector<HTMLElement>('[data-sys-pin]')!;
      const stage = root.querySelector<HTMLElement>('[data-sys-stage]')!;
      const specsEl = root.querySelector<HTMLElement>('[data-specs]')!;
      const specs = [...root.querySelectorAll<HTMLElement>('[data-spec]')];
      const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-step]')];
      const fills = buttons.map((b) => b.querySelector('.sys-rail__fill'));
      const r = rig(root.querySelector<SVGSVGElement>('[data-sys-svg]')!);
      const defaults = { traeger: r.detail('traeger').textContent, wand: r.detail('wand').textContent, dim: r.dimVal.textContent };

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

      // Benannt registrieren: so landen später erzeugte Tweens im matchMedia-Kontext.
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

        r.prints.forEach((img) =>
          gsap.to(img, { opacity: img.dataset.print === p.print ? 1 : 0, duration: 0.8, ease: 'power2.inOut', overwrite: true }),
        );
        gsap.to(r.mesh, { opacity: p.carrier === 'mesh' ? 1 : 0, duration: 0.8, ease: 'power2.inOut', overwrite: true });
        swapText(r.detail('traeger'), p.traeger);
        swapText(r.detail('wand'), p.wandDetail);
        if (dimNow !== p.bahn) {
          const o = { v: dimNow };
          dimNow = p.bahn;
          gsap.to(o, { v: p.bahn, duration: 0.9, ease: 'power2.out', overwrite: true, onUpdate: () => { r.dimVal.textContent = String(Math.round(o.v)); } });
        }
      });
      const setActive = (i: number) => (ctx as any).setActive(i);

      // 1) Anflug: während die Bühne ins Bild scrollt, legen sich die Schichten übereinander
      const intro = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: r.updateLeaders,
        scrollTrigger: { trigger: stage, start: 'top 82%', end: 'top 6%', scrub: 0.6 },
      });
      dropIn(intro, r);
      ScrollTrigger.create({ trigger: stage, start: 'top 78%', once: true, onEnter: () => { if (active < 0) setActive(0); } });

      // 2) Fixierte Sequenz: je Träger eine Einheit
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: () => {
          r.updateLeaders();
          const t = tl.time();
          if (tl.scrollTrigger?.isActive || t > 0) setActive(Math.min(n - 1, Math.max(0, Math.floor(t))));
        },
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${window.innerHeight * n * 1.05}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      for (let i = 0; i < n; i++) {
        if (i > 0) split(tl, r, i, 0.3);       // Wechsel: Paket öffnet sich mit neuem Träger und Motiv
        join(tl, r, i + 0.42, 0.42);           // Schichten fügen sich
        tl.fromTo(fills[i], { scaleX: 0 }, { scaleX: 1, duration: 1 }, i);
      }
      tl.set({}, {}, n);

      // Schrittleiste: springt in die Lesephase der jeweiligen Stufe
      const onStep = (e: Event) => {
        const i = Number((e.currentTarget as HTMLElement).dataset.step);
        const st = tl.scrollTrigger!;
        scrollToY(st.start + (st.end - st.start) * ((i + 0.36) / n));
      };
      buttons.forEach((b) => b.addEventListener('click', onStep));

      return () => {
        buttons.forEach((b) => { b.removeEventListener('click', onStep); b.removeAttribute('aria-current'); });
        specs.forEach((s) => s.classList.remove('is-active'));
        r.detail('traeger').textContent = defaults.traeger;
        r.detail('wand').textContent = defaults.wand;
        r.dimVal.textContent = defaults.dim;
        root.classList.remove('is-seq');
        specsEl.classList.add('specs--list');
        requestAnimationFrame(r.updateLeaders);
      };
    });
  }

  // Einfache Füge-Bewegung für alle übrigen Schichtgrafiken (Mobil, Unterseite System)
  const simple = (query: string, figures: HTMLElement[]) => {
    if (!figures.length) return;
    mm.add(query, () => {
      figures.forEach((fig) => {
        const r = rig(fig.querySelector<SVGSVGElement>('[data-sys-svg]')!);
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: r.updateLeaders,
          scrollTrigger: { trigger: fig, start: 'top 85%', end: 'bottom 35%', scrub: 0.6 },
        });
        dropIn(tl, r);
        join(tl, r, 1.25, 0.9);
        tl.set({}, {}, 2.3);
      });
      return () => requestAnimationFrame(() => figures.forEach((f) => rig(f.querySelector<SVGSVGElement>('[data-sys-svg]')!).updateLeaders()));
    });
  };
  const all = [...document.querySelectorAll<HTMLElement>('[data-sys-figure]')];
  simple('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', all.filter((f) => root?.contains(f)));
  simple('(prefers-reduced-motion: no-preference)', all.filter((f) => !root?.contains(f)));
}
