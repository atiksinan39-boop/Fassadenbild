import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmooth } from './smooth';
import { initHero } from './hero';
import { initSystem } from './system';
import { initReveals } from './reveal';

gsap.registerPlugin(ScrollTrigger);

const fontsReady = () =>
  Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 900))]);

export async function initMotion() {
  (window as any).__ccMotion = true;
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
  initSmooth();
  await fontsReady();
  initHero();
  initSystem();
  initReveals();
  ScrollTrigger.refresh();
}
