<?php
/**
 * Manca Productora - Galería de imágenes
 * Lista las imágenes que ya están subidas en el sitio:
 *   - /assets/img/  (imágenes de la web)
 *   - /uploads/     (imágenes subidas desde el panel de administración)
 * Devuelve JSON con { name, folder, size } para el selector de imágenes del Admin.
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$extensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'gif', 'avif', 'bmp', 'ico'];

function scanImages($dir, $extensions): array
{
    $out = [];
    if (!is_dir($dir)) {
        return $out;
    }
    $items = @scandir($dir);
    if ($items === false) {
        return $out;
    }
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        $full = $dir . '/' . $item;
        if (is_file($full)) {
            $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
            if (in_array($ext, $extensions, true)) {
                $out[] = [
                    'name' => $item,
                    'folder' => 'assets/img',
                    'size' => (int) filesize($full),
                ];
            }
        }
    }
    return $out;
}

// public_html es el directorio padre de api/
$root = dirname(__DIR__);
$assetsDir = $root . '/assets/img';
$uploadsDir = $root . '/uploads';

$images = scanImages($assetsDir, $extensions);

// Imágenes subidas desde el panel (uploads/)
$uploads = scanImages($uploadsDir, $extensions);
foreach ($uploads as $u) {
    $u['folder'] = 'uploads';
    $images[] = $u;
}

// Ordenar por nombre
usort($images, function ($a, $b) {
    return strcmp(strtolower($a['name']), strtolower($b['name']));
});

echo json_encode([
    'images' => $images,
    'count' => count($images),
    'source' => 'php',
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);