const fs = require('fs');
const path = require('path');
const pairs = [
  ['â€¢', '•'],
  ['â€”', '—'],
  ['ContÃ¡ctanos', 'Contáctanos'],
  ['transformaciÃ³n', 'transformación'],
  ['regiÃ³n', 'región'],
  ['multicÃ¡mara', 'multicámara'],
  ['SubÃ­', 'Subí'],
  ['reemplazÃ¡', 'reemplazá'],
  ['cambiÃ¡', 'cambiá'],
  ['cargÃ¡', 'cargá'],
  ['explorÃ¡', 'explorá'],
  ['Ã³', 'ó'],
  ['Ã¡', 'á'],
  ['Ã©', 'é'],
  ['Ã­', 'í'],
  ['Ãº', 'ú'],
  ['Ã±', 'ñ'],
  ['Ã‘', 'Ñ'],
  ['Ã‰', 'É'],
  ['Ã“', 'Ó']
];
function walk(d, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist') continue;
      walk(p, out);
    } else if (/\.(tsx|ts|json|css)$/.test(e.name)) out.push(p);
  }
}
const files = [];
walk('src', files);
let tot = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const o = s;
  for (const [a, b] of pairs) s = s.split(a).join(b);
  if (s !== o) { fs.writeFileSync(f, s); tot++; console.log('fixed: ' + f); }
}
console.log('done in ' + tot + ' files');
