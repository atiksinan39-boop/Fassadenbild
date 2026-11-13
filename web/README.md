# CoverCraft – Website

Astro 7 · GSAP 3 mit ScrollTrigger · Lenis. Schriften Geist und Geist Mono liegen lokal in `public/fonts` (SIL OFL), es wird nichts von Drittservern geladen. Keine Cookies, keine Tracker.

```
npm install
npm run dev       # http://localhost:4321
npm run build     # statische Ausgabe nach dist/
```

## Seiten
`/` Startseite · `/system` · `/pflege-klinik` · `/referenzen` · `/humaneco` · `/kontakt` · `/impressum` · `/datenschutz` · `/danke` · 404

## Aufbau
- `src/styles/tokens.css` – Farben, Schrift, Maße, Bewegung als CSS-Variablen (BRIEF.md, Abschnitt 3)
- `src/styles/global.css` – Gestaltung aller Abschnitte und Unterseiten
- `src/data/content.ts`, `src/data/chapters.ts` – Produktdaten, Referenzliste, Manifest-Kapitel
- `src/components/` – ein Baustein je Abschnitt; `LayerGraphic.astro` ist die Schichtgrafik
- `src/scripts/motion/` – `hero.ts`, `system.ts` (fixierte Scroll-Sequenz), `sections.ts`, `reveal.ts`, `smooth.ts` (Lenis)
- `src/scripts/form.ts` – Formularprüfung und Versand

## Bewegung
Nur ohne `prefers-reduced-motion`. Die System-Sequenz läuft ab 1024px Breite; darunter fügen sich die Schichten beim Scrollen einmal zusammen, die Daten stehen als Liste.

## Vorschau auf GitHub Pages
Jeder Push auf `main` baut die Seite über `.github/workflows/pages.yml` und stellt sie unter https://atiksinan39-boop.github.io/Fassadenbild/ bereit (Stand des Builds unter „Actions“). Interne Links laufen über `u()` aus `src/lib/url.ts`, damit sie unter dem Unterpfad stimmen. Das Formular sendet dort nicht – GitHub Pages kann keine Formulare empfangen; dafür ist Netlify vorgesehen.

## Veröffentlichung (Netlify)
`netlify.toml` im Repository-Wurzelordner ist vorbereitet. In Netlify „Add new site → Import an existing project“ wählen, das GitHub-Repository verbinden, fertig. Das Formular „musterfaecher“ wird beim ersten Deploy automatisch als Netlify Form erkannt; die Benachrichtigungs-E-Mail wird unter Forms → Notifications eingetragen.

## Vor der Veröffentlichung zu füllen
Alle Platzhalter stehen sichtbar in `[ECKIGEN KLAMMERN]`: Preise, Montagezeit, Telefon, E-Mail, Adresse Österreich, Projektfotos, weitere Referenzen, Kapiteltexte des Manifests, Datenblätter und Prüfzeugnisse, Angaben in Impressum und Datenschutz.
Suche: `grep -rn "\[" src --include=*.astro --include=*.ts | grep -E "\[[A-ZÄÖÜ]"`
