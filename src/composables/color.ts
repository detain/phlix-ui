/** Tiny color helpers for the accent picker (R1.1). Pure, no deps. */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Parse #rgb / #rrggbb (with or without leading #). Returns null if unparseable. */
export function parseHex(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
export const toHex = ({ r, g, b }: RGB): string =>
  '#' + [r, g, b].map((c) => clamp(c).toString(16).padStart(2, '0')).join('');

/** Mix `amount` (0–1) of white into the color. */
export function lighten(rgb: RGB, amount: number): RGB {
  return { r: rgb.r + (255 - rgb.r) * amount, g: rgb.g + (255 - rgb.g) * amount, b: rgb.b + (255 - rgb.b) * amount };
}
/** Mix `amount` (0–1) of black into the color. */
export function darken(rgb: RGB, amount: number): RGB {
  return { r: rgb.r * (1 - amount), g: rgb.g * (1 - amount), b: rgb.b * (1 - amount) };
}
export const rgba = ({ r, g, b }: RGB, a: number): string => `rgba(${clamp(r)}, ${clamp(g)}, ${clamp(b)}, ${a})`;

/** Relative luminance (WCAG) for picking readable ink on a fill. */
export function luminance({ r, g, b }: RGB): number {
  const ch = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

/**
 * Derive the full accent role set from a single accent hex — used when the user
 * overrides the default amber via the accent picker. Returns CSS custom-property
 * values matching the token contract (hover/active/soft/ring/contrast).
 */
export function deriveAccentVars(hex: string): Record<string, string> | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const contrast = luminance(rgb) > 0.45 ? '#1a1205' : '#fff8ec';
  return {
    '--accent': toHex(rgb),
    '--accent-hover': toHex(lighten(rgb, 0.12)),
    '--accent-active': toHex(darken(rgb, 0.12)),
    '--accent-soft': rgba(rgb, 0.14),
    '--accent-ring': rgba(rgb, 0.55),
    '--accent-contrast': contrast,
  };
}
