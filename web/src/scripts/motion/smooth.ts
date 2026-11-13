import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmooth() {
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

const navOffset = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h-compact')) || 68;

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: 'auto' });
}

export function scrollToTarget(el: HTMLElement) {
  const isTop = el.id === 'top';
  if (lenis) lenis.scrollTo(isTop ? 0 : el, { offset: isTop ? 0 : -navOffset() + 1, duration: 1.2 });
  else el.scrollIntoView({ block: 'start' });
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
