import { gsap } from 'gsap';

/**
 * Zeilenweise Einblendung: Wörter messen, nach Zeilen gruppieren, jede Zeile hinter eine Maske legen.
 * Nach der Animation wird das Original-HTML zurückgesetzt (Umbruch bleibt bei Größenänderung korrekt).
 */
export function splitLines(el: HTMLElement) {
  const original = el.innerHTML;
  const words = (el.textContent ?? '').trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="sw" style="display:inline-block">${w}</span>`).join(' ');
  const lines: string[][] = [];
  let lastTop = -Infinity;
  el.querySelectorAll<HTMLElement>('.sw').forEach((s) => {
    if (Math.abs(s.offsetTop - lastTop) > 4) { lines.push([]); lastTop = s.offsetTop; }
    lines[lines.length - 1].push(s.textContent ?? '');
  });
  el.innerHTML = lines.map((l) => `<span class="line-mask"><span>${l.join(' ')}</span></span>`).join('');
  const inner = [...el.querySelectorAll<HTMLElement>('.line-mask > span')];
  const revert = () => { el.innerHTML = original; };
  return { inner, revert };
}

export function initReveals(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-reveal-label]').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 12, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  scope.querySelectorAll<HTMLElement>('[data-reveal-lines]').forEach((el) => {
    const label = el.textContent?.trim() ?? '';
    el.setAttribute('aria-label', label);
    const { inner, revert } = splitLines(el);
    inner.forEach((s) => s.setAttribute('aria-hidden', 'true'));
    gsap.from(inner, {
      yPercent: 105, duration: 1.1, stagger: 0.12, ease: 'expo.out', delay: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onComplete: () => { revert(); el.removeAttribute('aria-label'); },
    });
  });
  scope.querySelectorAll<HTMLElement>('[data-reveal-fade]').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 18, duration: 1, delay: 0.25, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
}
