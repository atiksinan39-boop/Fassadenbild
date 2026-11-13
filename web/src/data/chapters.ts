// Kapitel aus dem Manifest HumanEco. Titel und Leitsätze aus reference.html.
export const chapters = [
  { id: 'materie', img: 'materie', white: true, no: '01', title: 'Materie ist Material', text: 'Um wieder glauben zu können, brauchen wir die Berührung.', alt: 'Illustration: Hand berührt eine Holzoberfläche' },
  { id: 'fuersorge', img: 'fuersorge', white: false, no: '04', title: 'Kunst jenseits Fürsorge', text: 'Ein Ort ist Verortung und niemals neutral.', alt: 'Illustration: lichtdurchfluteter Gewölbegang mit Wandmalerei' },
  { id: 'genius', img: 'genius', white: false, no: '05', title: 'Genius Loci', text: 'Die Energie eines Ortes entspricht dem Ton A in der Musik.', alt: 'Illustration: runder Empfangsraum mit Lichtkuppel' },
  { id: 'turm', img: 'turm', white: false, no: '10', title: 'Der Turm gegen die Zeit', text: 'Manchmal bleiben Gäste, weil man sie nicht mehr gehen lassen will.', alt: 'Illustration: Eiffelturm bei Nacht aus der Untersicht' },
  { id: 'serendip', img: 'serendip', white: false, no: '11', title: 'Serendipität', text: 'Gerade durch die Risse dringt das Licht ein.', alt: 'Illustration: Reiter auf einem gelben, sich verzweigenden Weg' },
  { id: 'ornament', img: 'ornament', white: true, no: '13', title: 'Ornament oder Verbrechen?', text: 'Ornament ist nie ein Verbrechen, wenn es zu jemandem gehört.', alt: 'Illustration: ornamentaler Bogengang mit leuchtendem Boden' },
] as const;
