const fs = require('fs');
const path = require('path');
const { TextDecoder } = require('util');

const roots = ['src', 'index.html', 'server.ts', 'public/api', 'hostinger'];
const textFile = /\.(?:tsx?|json|html|php|css|md)$/i;
const mojibake = /[\u00c2\u00c3\u00e2\u00f0\ufffd]/;
const files = [];

function collect(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) collect(path.join(target, entry));
  } else if (textFile.test(target)) {
    files.push(target);
  }
}

roots.forEach(collect);
const failures = [];

for (const file of files) {
  const buffer = fs.readFileSync(file);
  let text;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  } catch {
    failures.push(`${file}: no es UTF-8 válido`);
    continue;
  }

  if (mojibake.test(text)) failures.push(`${file}: contiene caracteres de mojibake`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`UTF-8 verificado en ${files.length} archivos de texto.`);
