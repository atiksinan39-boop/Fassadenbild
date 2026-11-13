# CoverCraft – Website-Relaunch: Übergabe an Claude Code

Stand: 13.11.2026. Dieses Dokument ist die verbindliche Vorlage. Bei Widerspruch gilt: BRIEF.md vor reference.html vor eigener Annahme.

## 1. Auftrag

Baue eine echte, veröffentlichbare Website für **CoverCraft** (Inhaber R.C. Salih Atik, Berlin). Anspruch: wirkt wie eine Agentur-Seite der 15.000-€-Klasse. Modern, ruhig, präzise animiert, technisch glaubwürdig.

- Die bestehende Seite ist https://fassadenbild.com (Stand 2021, inaktiv). Botschaften und Produktfakten bleiben, Gestaltung wird neu.
- `reference.html` ist der freigegebene statische Entwurf. **Struktur, Texte, Farben und Schrift daraus übernehmen.** Neu hinzu kommen Bewegung, Feinschliff, Unterseiten und Technik.
- Ein Ziel pro Besuch: **technischen Musterfächer anfordern** (Formular). Keine konkurrierenden Buttons.

## 2. Marke und Zielgruppe

- **Hauptmarke:** CoverCraft, Unterzeile „Surface Design Engineering · Technologie & Handwerk“.
- **Produktnamen:** Fassadenbild (Außentapete), WandSchmuck Interior / Strong / Wet.
- **HumanEco** ist das Manifest und die redaktionelle Ebene der Seite, keine eigene Marke mit eigenem Angebot.
- **Zielgruppe:** Architekten, Planer, Bauabteilungen von Pflege- und Klinikträgern, Hotellerie, Wohnungswirtschaft, Malerfachbetriebe. Technisch denkende Leser: Fakten, Maße, Prüfzeugnisse vor Stimmung.
- **Fokusnische:** Pflege und Klinik. Sie steht im Einsatz-Abschnitt an erster Stelle.
- **Ton:** ruhig, genau, leicht poetisch. Kurze Sätze. Du-Form nur in Manifest-Zitaten, sonst neutral.

## 3. Gestaltung

| Rolle | Wert |
|---|---|
| Dunkler Grund | `#07171A` |
| Petrol dunkel (Flächen) | `#0B2A2E` |
| Petrol (Links auf Hell) | `#0B5F63` |
| Salbei (Labels auf Hell) | `#37665F` |
| Mint hell (Labels auf Dunkel) | `#A9D6CB` |
| Mint (Text auf Dunkel) | `#D7F3E9` |
| Papier | `#F5F8F5` |
| Weiß | `#FFFFFF` |
| Tinte | `#0B1D21` |
| Fließtext auf Hell | `#2E4A4B` |
| Linien auf Hell | `#C4D6D0`, `#D5E2DD` |
| Akzent Gold (nur Hauptbutton, Schrittnummern, ein Schlusssatz) | `#E6CF6A` |

- **Schrift:** Geist (200, 300, 400, 500) für alles, Geist Mono (400, 500) für Labels, Maße, Zahlen. Ersatz: Helvetica Neue, Helvetica, Arial. Das Manifest ist in Helvetica Neue Light gesetzt, die Anmutung soll bleiben.
- **Überschriften:** Gewicht 200, Laufweite −0,03em, Zeilenhöhe um 1,0. Fließtext 17px, Gewicht 300.
- **Labels:** Geist Mono, 11–12px, Versalien, Laufweite 0,14–0,16em, nummeriert („01 — System“).
- **Ecken:** 2px. Keine Schatten, keine Karten mit runden Ecken, keine Verlaufsflächen außer Abdunklung über Bildern, keine Emoji.
- **Technische Details als Stilmittel:** Maßlinien, Haarlinien, Tabellen, Quadratmeterzahlen groß gesetzt.
- **Kontrast:** Text mindestens 4,5:1. Klickflächen mindestens 44px.

## 4. Seitenstruktur

**Startseite** (Reihenfolge wie in reference.html):
1. Hero mit Navigation, Maßlinie und Kennzahlenleiste
2. Haltung (Leitsatz)
3. 01 System: Tabelle der vier Träger
4. 02 Einsatz: Pflege und Klinik groß, darunter drei weitere Felder
5. 03 Ablauf: vier Schritte
6. 04 Referenzen: Quadratmeterliste
7. 05 Manifest HumanEco: sechs Kapitelkarten
8. Schlusswort mit Formular, Kontakt, Fußzeile

**Unterseiten** (zweite Ausbaustufe, erst nach Freigabe der Startseite):
- `/system` Technik je Träger, Datenblätter
- `/pflege-klinik` Zielseite der Fokusnische
- `/referenzen` alle Projekte
- `/humaneco` Manifest als Leseseite, 6–8 gekürzte Kapitel
- `/kontakt`, `/impressum`, `/datenschutz`

## 5. Bewegungskonzept

Grundsatz: wenige, präzise Bewegungen. Dauer 0,6–1,2 s, weiche Ausläufe, nichts federt oder blinkt. Bei `prefers-reduced-motion` alles aus.

| Abschnitt | Bewegung |
|---|---|
| Global | Weiches Scrollen. Navigation wird beim Scrollen kompakt und bekommt dunklen Grund. Abschnitts-Label und Überschriften blenden beim Eintritt zeilenweise ein. |
| Hero | Bild fährt sehr langsam (Drift, 25–30 s). Überschrift erscheint Wort für Wort von unten hinter einer Maske. Maßlinie zeichnet sich von der Mitte nach außen. Kennzahlen zählen einmalig hoch. Beim Wegscrollen leichte Parallaxe des Bildes. |
| Haltung | Leitsatz wird beim Scrollen Wort für Wort von blass zu voll eingefärbt. |
| System | **Herzstück:** Tabelle wird zur fixierten Scroll-Sequenz. Pro Träger eine Stufe, links wechselt eine Schichtgrafik (Wand, Kleber, Träger, Druck), rechts die Daten. Auf Mobil normale Liste. |
| Einsatz | Bild wird beim Eintritt über eine Maske aufgezogen, leichte Parallaxe. Listenzeilen nacheinander. |
| Ablauf | Senkrechte Fortschrittslinie füllt sich beim Scrollen, Schrittnummern leuchten in Gold auf. |
| Referenzen | Zeilen-Hover: Zeile färbt sich mint, Projektfoto folgt dem Mauszeiger. Quadratmeterzahlen zählen hoch. |
| HumanEco | Schriftzug „HumanEco“ wächst leicht beim Eintritt. Karten erscheinen gestaffelt, Bild zoomt beim Hover langsam. |
| Schlusswort | Text zeilenweise, „Immer. Versprochen.“ als Letztes mit kurzer Verzögerung. |
| Seitenwechsel | Kurze Überblendung über dunklen Grund. |

## 6. Technik

- **Vorschlag:** Astro, GSAP mit ScrollTrigger, Lenis für das Scrollen. Schriften lokal einbinden (kein Laden von Google-Servern, wegen DSGVO).
- **Formular:** funktionsfähig über einen Formulardienst oder eine Serverfunktion. Felder wie in reference.html. Pflicht: Name, E-Mail.
- **Hosting:** Vercel oder Netlify. Domain folgt.
- **Bilder:** als AVIF oder WebP in mehreren Größen, verzögertes Laden außer Hero.
- **Ziele:** Lighthouse Leistung und Barrierefreiheit jeweils über 90 auf Mobil. Echte `<a>`, `<button>`, `<label>`. Tastaturbedienung vollständig.
- **Responsiv:** ab 360px Breite. Tabelle wird zur Liste, Navigation zum Menü.
- Kein Cookie-Banner nötig, solange keine Tracker eingebaut werden.

## 7. Bildmaterial

Im Ordner `assets/`, alle aus dem Manifest von R.C. Salih Atik (Rechte beim Inhaber):

| Datei | Einsatz |
|---|---|
| hero.jpg | Hero |
| care.jpg | Einsatz Pflege und Klinik |
| process.jpg | Ablauf |
| materie.jpg, fuersorge.jpg, genius.jpg, turm.jpg, serendip.jpg, ornament.jpg | Kapitelkarten HumanEco |
| halle.jpg | Hintergrund Schlusswort |

materie.jpg und ornament.jpg haben weißen Grund und unregelmäßige Kanten: nur auf Weiß einsetzen, nicht beschneiden.

**Größte Lücke:** Es gibt keine echten Projektfotos. Wo `[PROJEKTFOTO]` steht, Platzhalter sichtbar lassen und nichts aus Bilddatenbanken einsetzen.

## 8. Fakten, Platzhalter, Grenzen

**Gesicherte Fakten** (von fassadenbild.com, dürfen verwendet werden):
- Patentiertes Wandklebeverfahren, Außentapete 2009 entwickelt
- Fassadenbild: Mesh-Gewebe, Bahnbreite bis 500 cm, Brandklasse B-s1, d0 (IBS Linz)
- WandSchmuck: Fiberglas in Leinenoptik, bis 300 cm. Interior: lichtbeständig, nass wischbar, wieder ablösbar. Strong: hoch lichtbeständig, scheuerbeständig. Wet: fließwasser-, desinfektionsmittel-, scheuerbeständig
- Montage ohne Bohren, überarbeitbar durch Spachteln, Überstreichen, Beschichten
- 40 dokumentierte Projekte, Liste in reference.html

**Platzhalter, nicht erfinden:** `[PREIS / m²]`, `[MONTAGEZEIT PRO m²]`, `[TELEFON]`, `[E-MAIL]`, `[ADRESSE]`, `[PROJEKTFOTO]`, aktuelle Referenzen ab 2023.

**Offen:** Die alte Seite nennt fünf Umsetzungsschritte, der Entwurf vier abgeleitete. Vor Veröffentlichung mit dem Inhaber abgleichen.

**Nicht behaupten:**
- Keine Umweltaussagen („nachhaltig“, „ökologisch“, Cradle-to-Cradle) ohne Zertifikat
- Keine Gesundheitswirkung („fördert Heilung“, „senkt Stress“) ohne Studienbeleg
- Brandklasse nur für die Außentapete nennen
- Keine erfundenen Kundenstimmen, Zahlen oder Logos

## 9. Referenzseiten (vom Auftraggeber auszufüllen)

Screenshots in den Ordner `references/` legen. Hier je Seite eintragen:

| Nr. | URL | Screenshot-Datei | Was genau gefällt (ein Satz) | Gilt für |
|---|---|---|---|---|
| 1 | | | | z. B. Hero-Animation |
| 2 | | | | z. B. Typografie |
| 3 | | | | z. B. Scroll-Sequenz |

Regel für Claude Code: Prinzipien übernehmen (Tempo, Rhythmus, Dichte), nie Layout, Bilder oder Texte einer Referenzseite kopieren. Die Farben und Schrift aus Abschnitt 3 bleiben.

## 10. Reihenfolge und Abnahme

1. Projekt aufsetzen, Farben und Schrift als Variablen, reference.html als statische Startseite übertragen.
2. **Nur Hero und System-Sequenz** mit voller Bewegung bauen. Stopp, Abnahme durch den Auftraggeber im Browser.
3. Restliche Abschnitte der Startseite animieren.
4. Mobil-Durchgang, Barrierefreiheit, Ladezeit.
5. Unterseiten.
6. Formular anschließen, Impressum und Datenschutz, Veröffentlichung.

Nach jedem Schritt im Browser prüfen (Desktop 1440px, Mobil 390px) und Bildschirmfotos zeigen, bevor es weitergeht.
