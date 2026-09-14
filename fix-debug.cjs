const fs = require('fs');
let b = fs.readFileSync('src/components/BrandsCarousel.tsx', 'utf8');
const start = b.indexOf('sponsor-track');
console.log('CTX:' + JSON.stringify(b.slice(start - 60, start + 220)));
