const WINDOWS_1252_BYTES: Record<number, number> = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84,
  0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02c6: 0x88,
  0x2030: 0x89, 0x0160: 0x8a, 0x2039: 0x8b, 0x0152: 0x8c,
  0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92, 0x201c: 0x93,
  0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b,
  0x0153: 0x9c, 0x017e: 0x9e, 0x0178: 0x9f,
};

const mojibakePattern = /[\u00c2\u00c3\u00e2\u00f0\ufffd]/g;

const mojibakeScore = (value: string) => (value.match(mojibakePattern) || []).length;

function decodeWindows1252AsUtf8(value: string): string | null {
  const bytes: number[] = [];

  for (const char of value) {
    const codePoint = char.codePointAt(0)!;
    const byte = codePoint <= 0xff ? codePoint : WINDOWS_1252_BYTES[codePoint];
    if (byte === undefined) return null;
    bytes.push(byte);
  }

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes));
  } catch {
    return null;
  }
}

/** Repairs text accidentally decoded as Windows-1252 instead of UTF-8. */
export function repairMojibake(value: string): string {
  let repaired = value;

  // Two passes cover content that was decoded incorrectly more than once.
  for (let pass = 0; pass < 2 && mojibakeScore(repaired) > 0; pass += 1) {
    const decoded = decodeWindows1252AsUtf8(repaired);
    if (!decoded || mojibakeScore(decoded) >= mojibakeScore(repaired)) break;
    repaired = decoded;
  }

  return repaired;
}

/** Recursively sanitizes editable JSON content while preserving its shape. */
export function normalizeContentStrings<T>(value: T): T {
  if (typeof value === 'string') return repairMojibake(value) as T;
  if (Array.isArray(value)) return value.map(normalizeContentStrings) as T;

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, normalizeContentStrings(item)])
    ) as T;
  }

  return value;
}
