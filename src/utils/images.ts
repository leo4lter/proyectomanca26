
const base: string =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL
    ? (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL
    : './';

const img = (file: string) => `${base}assets/img/${file}`;

export const PLACEHOLDERS = {
  
  logo: img('logo-manca.svg'),
  
  iconWeb: img('icon-web.svg'),
  
  logoFooter: img('logo-footer.svg'),
  
  galeria: img('placeholder-galeria.svg'),
  
  marca: img('placeholder-marca.svg'),
  
  web: img('placeholder-web.svg'),
} as const;

export const GALERIA_PLACEHOLDERS: string[] = Array.from(
  { length: 8 },
  () => PLACEHOLDERS.galeria,
);

export const MARCA_PLACEHOLDERS: string[] = Array.from(
  { length: 8 },
  () => PLACEHOLDERS.marca,
);

export const WEB_PLACEHOLDERS: string[] = Array.from(
  { length: 4 },
  () => PLACEHOLDERS.web,
);

export function isRemoteUrl(src: string): boolean {
  return /^(https?:)?\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:');
}

export function resolveImage(src: string | null | undefined, fallback: string): string {
  if (!src || (typeof src === 'string' && src.trim() === '')) return fallback;
  if (isRemoteUrl(src)) return src;
  if (src.startsWith('./')) return `${base}${src.slice(2)}`;
  if (src.startsWith('/')) return src;
  return src;
}
