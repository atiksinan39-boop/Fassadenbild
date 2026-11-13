import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmooth, scrollToTarget } from './smooth';
import { initHero } from './hero';
import { initSystem } from './system';
import { initReveals } from './reveal';
import { sectionInits, initPageHero } from './sections';

gsap.registerPlugin(ScrollTrigger);

const fontsReady = () =>
  Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 900))]);

export async function initMotion() {
  (window as any).__ccMotion = true;
  const root = document.documentElement;
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
  initSmooth();
  await fontsReady();
  initHero();
  initPageHero();
  root.classList.remove('m');
  // Rest in kleinen Portionen aufbauen, damit der Start nicht blockiert
  const breathe = () => new Promise<void>((r) => setTimeout(r, 0));
  await breathe();
  initSystem();     // zuerst: die fixierte Sequenz verändert die Seitenhöhe
  await breathe();
  initReveals();
  for (const init of sectionInits) { await breathe(); init(); }
  ScrollTrigger.refresh();

  // Sprungmarke aus der Adresse erst nach dem Aufbau anfahren (Seitenhöhe steht jetzt fest)
  const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
  if (target) requestAnimationFrame(() => scrollToTarget(target, true));

  // Ankunft: dunkle Überblendung lösen
  requestAnimationFrame(() => root.classList.remove('is-arriving'));
}
