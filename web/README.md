# CoverCraft – Website

Astro 7 · GSAP 3 mit ScrollTrigger · Lenis. Schriften Geist und Geist Mono liegen lokal in `public/fonts` (OFL), es wird nichts von Google geladen.

```
npm install
npm run dev       # http://localhost:4321
npm run build     # statische Ausgabe nach dist/ (Netlify oder Vercel)
```

## Aufbau
- `src/styles/tokens.css` – Farben, Schrift, Maße, Bewegung als CSS-Variablen (BRIEF.md, Abschnitt 3)
- `src/styles/global.css` – Gestaltung aller Abschnitte
- `src/data/content.ts` – Produktdaten (vier Träger) und Referenzliste
- `src/components/` – ein Baustein je Abschnitt; `LayerGraphic.astro` ist die Schichtgrafik der System-Sequenz
- `src/scripts/motion/` – `hero.ts`, `system.ts` (fixierte Scroll-Sequenz), `reveal.ts`, `smooth.ts` (Lenis)

## Bewegung
Nur ohne `prefers-reduced-motion`. Die System-Sequenz läuft ab 1024px Breite; darunter und bei reduzierter Bewegung erscheint eine normale Liste.
