// Inhalte aus reference.html. Platzhalter in [ECKIGEN KLAMMERN] bleiben sichtbar (BRIEF.md, Abschnitt 8).

export type Product = {
  id: string;
  short: string;
  name: string;
  sub?: string;
  traeger: string;
  bahn: number;
  bestaendigkeit: string;
  einsatz: string;
  preis: string;
  /** Schichtgrafik */
  carrier: 'mesh' | 'linen';
  wandDetail: string;
  print: 'hero' | 'genius' | 'fuersorge' | 'care';
};

export const products: Product[] = [
  {
    id: 'fassadenbild',
    short: 'Fassadenbild',
    name: 'Fassadenbild',
    sub: 'Die Außentapete',
    traeger: 'Mesh-Gewebe',
    bahn: 500,
    bestaendigkeit: 'Witterung, Farbechtheit wie eine hochwertige Fassadenfarbe. Brandklasse B-s1, d0.',
    einsatz: 'Fassade, Außenmauer, WDVS',
    preis: '[PREIS / m²]',
    carrier: 'mesh',
    wandDetail: 'Fassade · Außenmauer · WDVS',
    print: 'hero',
  },
  {
    id: 'interior',
    short: 'Interior',
    name: 'WandSchmuck Interior',
    traeger: 'Fiberglas in Leinenoptik',
    bahn: 300,
    bestaendigkeit: 'Lichtbeständig, nass wischbar, wieder ablösbar.',
    einsatz: 'Wohnen, Büro, Empfang',
    preis: '[PREIS / m²]',
    carrier: 'linen',
    wandDetail: 'Innenwand · Wohnen · Büro',
    print: 'genius',
  },
  {
    id: 'strong',
    short: 'Strong',
    name: 'WandSchmuck Strong',
    traeger: 'Fiberglas in Leinenoptik',
    bahn: 300,
    bestaendigkeit: 'Hoch lichtbeständig, scheuerbeständig.',
    einsatz: 'Flure, Treppenhäuser, stark beanspruchte Wände',
    preis: '[PREIS / m²]',
    carrier: 'linen',
    wandDetail: 'Flur · Treppenhaus',
    print: 'fuersorge',
  },
  {
    id: 'wet',
    short: 'Wet',
    name: 'WandSchmuck Wet',
    traeger: 'Fiberglas in Leinenoptik',
    bahn: 300,
    bestaendigkeit: 'Fließwasser, Desinfektionsmittel, Scheuern, Licht.',
    einsatz: 'Dusche, Wanne, Küchenrückwand',
    preis: '[PREIS / m²]',
    carrier: 'linen',
    wandDetail: 'Dusche · Wanne · Küche',
    print: 'care',
  },
];

export const referenzen = [
  { name: 'Betreutes Wohnen', meta: 'Köflach', m2: 1100 },
  { name: 'MGI Steuerberatungskanzlei', meta: '', m2: 400 },
  { name: 'Pizza, Baguette & Blech', meta: 'Ried im Innkreis', m2: 360 },
  { name: 'Synthesa Arena', meta: 'Perg · 2014', m2: 300 },
  { name: 'HAILife', meta: 'Nußbach · 2009', m2: 171 },
  { name: 'Maximarkt', meta: 'Anif', m2: 160 },
  { name: 'SalzburgerMilch', meta: 'Salzburg · 2011', m2: 110 },
];

export const formatM2 = (n: number) => n.toLocaleString('de-DE');
