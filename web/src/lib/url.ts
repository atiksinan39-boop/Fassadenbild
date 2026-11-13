// Interne Links mit dem Basis-Pfad versehen. Auf Netlify/eigener Domain ist der Pfad „/“,
// auf GitHub Pages „/Fassadenbild/“ (gesetzt über BASE_PATH im Build).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (p: string): string => (p.startsWith('/') ? BASE + p : p);
