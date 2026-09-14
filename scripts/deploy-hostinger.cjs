/**
 * deploy-hostinger.cjs
 * Genera un ZIP listo para subir a Hostinger a partir de la carpeta dist/.
 *
 * El ZIP (deploy-manca.zip) contiene DENTRO de su raíz:
 *   - index.html
 *   - assets/   (JS, CSS e imágenes compiladas)   <-- lo que faltaba en el hosting
 *   - api/      (content.php, upload.php, .htaccess)
 *   - uploads/  (carpeta donde el panel guarda las imágenes)
 *
 * Método de subida recomendado (hPanel de Hostinger):
 *   1) Subir deploy-manca.zip dentro de public_html/
 *   2) Botón derecho sobre el ZIP > Extract
 *   3) Eliminar el ZIP
 *   4) Verificar https://tudominio.com/assets/index-....js (que NO dé 404)
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const zipPath = path.join(rootDir, 'deploy-manca.zip');
const zipName = 'deploy-manca.zip';

// 1. Verificar que dist/ existe y tiene lo mínimo
if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('ERROR: No existe dist/index.html. Ejecutá primero: npm run build');
  process.exit(1);
}
if (!fs.existsSync(path.join(distDir, 'assets'))) {
  console.error('ERROR: No existe dist/assets. Ejecutá primero: npm run build');
  process.exit(1);
}

// 2. Asegurar que la carpeta uploads/ viaje en el ZIP (aunque esté vacía)
const uploadsDir = path.join(distDir, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
const keep = path.join(uploadsDir, '.gitkeep');
if (!fs.existsSync(keep)) {
  fs.writeFileSync(keep, 'Carpeta para las imágenes del panel de administración.\n');
}

// 3. Borrar ZIP viejo
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// 4. Comprimir el CONTENIDO de dist/ (no la carpeta dist en sí)
const pattern = path.join(distDir, '*').replace(/\\/g, '/');
const ps = `Compress-Archive -Path '${pattern}' -DestinationPath '${zipPath}' -CompressionLevel Optimal -Force`;
const res = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', ps], {
  encoding: 'utf-8',
});

if (res.status !== 0) {
  console.error('Salida de PowerShell:\n', res.stdout, res.stderr);
  console.error('ERROR: No se pudo crear el ZIP.');
  process.exit(1);
}

// 5. Informe final
if (!fs.existsSync(zipPath)) {
  console.error('ERROR: El ZIP no se generó. Ejecutá el comando dentro de la carpeta del proyecto.');
  process.exit(1);
}

const items = fs.readdirSync(distDir).filter((n) => n !== 'server.cjs' && n !== 'server.cjs.map');

console.log('==========================================================');
console.log('ZIP generado correctamente: ' + zipName);
console.log('Ubicación: ' + zipPath);
console.log('Contenido dentro del ZIP:');
for (const item of items) console.log('   - ' + item);
console.log('');
console.log('SIGUIENTES PASOS EN HOSTINGER:');
console.log('  1. Entrá a hPanel > Sitios Web > Administrar > Administrador de Archivos.');
console.log('  2. Entrá a public_html/ y subí el archivo ' + zipName + '.');
console.log('  3. Click derecho sobre el ZIP > Extract (extraer).');
console.log('  4. Borrá el archivo .zip.');
console.log('  5. Verificá tu web: https://tudominio.com/  (CON CTRL+F5 para limpiar caché).');
console.log('==========================================================');