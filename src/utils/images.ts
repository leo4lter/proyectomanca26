/**
 * MANCA — Sistema central de imágenes con placeholders locales.
 *
 * CÓMO REEMPLAZAR UNA IMAGEN (sin saber programar):
 * 1. Andá a la carpeta  public/assets/img/
 * 2. Reemplazá el archivo con el MISMO NOMBRE (ej: logo-manca.svg por tu logo).
 *    Podés usar .svg, .png, .jpg o .webp — solo mantené el nombre o actualizá
 *    la ruta en PLACEHOLDERS más abajo.
 * 3. Subí la carpeta a Hostinger dentro de public_html/ y listo.
 *    No hay que tocar ningún otro código.
 *
 * Todas las rutas usan import.meta.env.BASE_URL para que funcionen tanto en
 * desarrollo como en Hostinger (raíz o subcarpeta).
 */

const base: string =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL
    ? (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL
    : './';

const img = (file: string) => `${base}assets/img/${file}`;

export const PLACEHOLDERS = {
  /** Logotipo principal de Manca (hero, sello giratorio, about, footer fallback) */
  logo: img('logo-manca.svg'),
  /** Icono web / favicon (pestaña del navegador) */
  iconWeb: img('icon-web.svg'),
  /** Logo horizontal del footer */
  logoFooter: img('logo-footer.svg'),
  /** Imagen genérica de galería / proyecto */
  galeria: img('placeholder-galeria.svg'),
  /** Logo genérico de marca / sponsor */
  marca: img('placeholder-marca.svg'),
  /** Captura genérica de web desarrollada */
  web: img('placeholder-web.svg'),
} as const;

/** Galería del home (8 tarjetas). Reemplazá galeria-1 … galeria-8 si querés fotos propias. */
export const GALERIA_PLACEHOLDERS: string[] = Array.from(
  { length: 8 },
  () => PLACEHOLDERS.galeria,
);

/** Logos de marcas (7 slots). */
export const MARCA_PLACEHOLDERS: string[] = Array.from(
  { length: 8 },
  () => PLACEHOLDERS.marca,
);

/** Miniaturas de webs desarrolladas (4 slots). */
export const WEB_PLACEHOLDERS: string[] = Array.from(
  { length: 4 },
  () => PLACEHOLDERS.web,
);

/**
 * Resuelve la URL final de una imagen:
 * - Si está vacía o es null → devuelve el fallback.
 * - Si ya es absoluta (http, //, data:, blob:) → se deja igual.
 * - Si es relativa sin "/" inicial (ej: "uploads/foto.jpg" de Hostinger) → se respeta.
 */
export function resolveImage(src: string | null | undefined, fallback: string): string {
  if (!src || (typeof src === 'string' && src.trim() === '')) return fallback;
  return src;
}

/** ¿La URL es remota? (para decidir onError fallback) */
export function isRemoteUrl(src: string): boolean {
  return /^(https?:)?\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:');
}
