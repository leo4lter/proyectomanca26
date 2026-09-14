const fs = require('fs');

// 1. Reparar linea className rota en BrandsCarousel
let b = fs.readFileSync('src/components/BrandsCarousel.tsx', 'utf8');
b = b.split('<div className={"flex gap-6 sm:gap-10 animate-marquee sponsor-track" + (paused ? " marquee-paused" : "") + " w-max items-center">').join('<div className={`flex gap-6 sm:gap-10 animate-marquee sponsor-track w-max items-center ${paused ? "marquee-paused" : ""}`} aria-hidden={false}>');
fs.writeFileSync('src/components/BrandsCarousel.tsx', b);
console.log('brands repaired: ' + b.includes('paused ? "marquee-paused"'));

// 2. ProjectsSection: hover solo desktop + paneles animados con escalado
let s = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf8');
const hoverOld = 'onMouseEnter={() => setOpenProject(';
const hoverNew = 'onMouseEnter={() => { if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) setOpenProject(';
let hoverCount = 0;
while (s.includes(hoverOld)) { s = s.replace(hoverOld, hoverNew); hoverCount++; }

// Envolver cada contenido colapsable en panel animado
// Patron card 01
s = s.split("{openProject === '01' && (\n            <div className=\"pt-6 mt-6 border-t border-[#2A52BE]/30 animate-fadeIn\">").join("{/* Panel 01 */}\n          <div className={`proj-panel ${openProject === '01' ? 'open' : ''}`}>\n            <div className=\"proj-panel-inner\">\n            <div className={`proj-content pt-6 mt-6 border-t border-[#2A52BE]/30 ${openProject === '01' ? '' : 'pointer-events-none'}`} style={openProject === '01' ? undefined : {visibility: 'hidden' as const}}>");
// Patron card 02
s = s.split("{openProject === '02' && (\n            <div className=\"pt-6 mt-6 border-t border-[#2A52BE]/30 animate-fadeIn\">").join("{/* Panel 02 */}\n          <div className={`proj-panel ${openProject === '02' ? 'open' : ''}`}>\n            <div className=\"proj-panel-inner\">\n            <div className={`proj-content pt-6 mt-6 border-t border-[#2A52BE]/30 ${openProject === '02' ? '' : 'pointer-events-none'}`} style={openProject === '02' ? undefined : {visibility: 'hidden' as const}}>");
// Patron card 03
s = s.split("{openProject === '03' && (\n            <div className=\"pt-6 mt-6 border-t border-[#2A52BE]/30 animate-fadeIn\">").join("{/* Panel 03 */}\n          <div className={`proj-panel ${openProject === '03' ? 'open' : ''}`}>\n            <div className=\"proj-panel-inner\">\n            <div className={`proj-content pt-6 mt-6 border-t border-[#2A52BE]/30 ${openProject === '03' ? '' : 'pointer-events-none'}`} style={openProject === '03' ? undefined : {visibility: 'hidden' as const}}>");

// Cerrar los wrappers: cada bloque termina con "            </div>\n          )}" -> agregar 2 cierres extra
let closeCount = 0;
const closeOld = "            </div>\n          )}";
while (s.includes(closeOld) && closeCount < 3) { s = s.replace(closeOld, "            </div>\n            </div>\n            </div>\n          </div>"); closeCount++; }
fs.writeFileSync('src/components/ProjectsSection.tsx', s);
console.log('projects hover guards: ' + hoverCount + ' panels wrapped: ' + closeCount);
