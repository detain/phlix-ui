/** Tiny color helpers for the accent picker (R1.1). Pure, no deps.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export interface RGB {
    r: number;
    g: number;
    b: number;
}
/** Parse #rgb / #rrggbb (with or without leading #). Returns null if unparseable. */
export declare function parseHex(hex: string): RGB | null;
export declare const toHex: ({ r, g, b }: RGB) => string;
/** Mix `amount` (0–1) of white into the color. */
export declare function lighten(rgb: RGB, amount: number): RGB;
/** Mix `amount` (0–1) of black into the color. */
export declare function darken(rgb: RGB, amount: number): RGB;
export declare const rgba: ({ r, g, b }: RGB, a: number) => string;
/** Relative luminance (WCAG) for picking readable ink on a fill. */
export declare function luminance({ r, g, b }: RGB): number;
/**
 * Derive the full accent role set from a single accent hex — used when the user
 * overrides the default amber via the accent picker. Returns CSS custom-property
 * values matching the token contract (hover/active/soft/ring/contrast).
 */
export declare function deriveAccentVars(hex: string): Record<string, string> | null;
