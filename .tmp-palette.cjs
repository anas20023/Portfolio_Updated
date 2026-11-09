// Phase 5 palette diff. Throwaway; deleted before commit.
const fs = require('fs');

const css = fs.readFileSync(
  'node_modules/@heroui/styles/dist/themes/default/variables.css',
  'utf8'
);

const WANT = [
  '--background',
  '--background-secondary',
  '--foreground',
  '--surface',
  '--surface-foreground',
  '--surface-secondary',
  '--muted',
  '--border',
  '--border-secondary',
  '--separator',
  '--accent',
  '--accent-foreground',
  '--accent-soft',
  '--default',
  '--default-hover',
  '--success',
  '--overlay',
  '--field-background',
  '--field-border',
  '--focus',
];

const darkAt = css.indexOf('.dark,');

function grab(seg) {
  const out = {};
  for (const line of seg.split('\n')) {
    const m = line.match(/^\s*(--[a-z0-9-]+):\s*([^;]+);/);
    if (m && WANT.includes(m[1]) && out[m[1]] === undefined) out[m[1]] = m[2].trim();
  }
  return out;
}

const light = grab(css.slice(0, darkAt));
const dark = grab(css.slice(darkAt));

console.log('token'.padEnd(24) + 'LIGHT'.padEnd(30) + 'DARK');
for (const w of WANT)
  console.log(w.padEnd(24) + String(light[w] ?? '—').padEnd(30) + String(dark[w] ?? '—'));
