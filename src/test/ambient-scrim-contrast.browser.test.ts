// @vitest-environment node
/**
 * S326 — the ambient-scrim light-theme contrast gate.
 *
 * S19 shipped a poster-derived ambient scrim whose gradient was theme-INVARIANT:
 * `rgba(0,0,0,0.55)` at 0%, `rgba(0,0,0,0.35)` at 35%, and only the 100% stop
 * followed `var(--bg)`. The hero text is theme-FOLLOWING (`--text` /
 * `--text-muted`), so on the light Daylight theme the fixed dark scrim sits
 * behind DARK text: the computed contrast was ≈3.07:1 for the title and
 * ≈1.23:1 for meta/overview — the exact opposite of S19's "keep the hero
 * legible" goal. jsdom cannot answer this (it never applies an SFC's compiled
 * `<style>`), so like the S231 theater-geometry gate this file renders the REAL
 * component in headless chromium and measures the COMPOSITED pixels behind the
 * hero text, in all three themes.
 *
 * It runs inside the plain `vitest run` suite — i.e. inside `ui-ci.yml`'s
 * BLOCKING `test` job, where chromium is installed explicitly
 * (`npx playwright install --with-deps chromium`, ui-ci.yml:47-48). It is
 * deliberately NOT a Playwright spec under `e2e/`: that suite runs only in the
 * `visual` job, which is `workflow_dispatch`-only AND `continue-on-error: true`,
 * so an assertion placed there could never fail a PR.
 *
 * ⚠ It must NEVER be softened into a skip when chromium is missing. A gate that
 * silently opts out is the `skipped`-counts-as-SUCCESS failure this estate has
 * already been bitten by (see the S231 gate docblock).
 *
 * SCOPE BOUNDARY, recorded honestly: this drives the Vite DEV server, so it
 * measures the SOURCE stylesheet, not the minified `dist/style.css`. The
 * build-time deletion class of defect is pinned separately by
 * `src/test/builtCss.ts`; together they cover "the rule is correct" and "the
 * rule survives the build".
 *
 * The per-theme token values come from the REAL `@phlix/tokens` stylesheet the
 * harness imports (the same `[data-theme=…]` blocks `src/tokens/contrast.test.ts`
 * reads), and the sampled text colors are the browser's resolved
 * `getComputedStyle` values — nothing is hand-written.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from '@playwright/test';
import { createServer, type ViteDevServer } from 'vite';
import { inflateSync } from 'node:zlib';
import { resolve } from 'node:path';

/**
 * The three built-in themes, exactly as the app applies them (`data-theme` on
 * `<html>`, see `src/composables/useTheme.ts` + the visual harness `mountVisual`).
 */
const THEMES = ['nocturne', 'daylight', 'midnight'] as const;
type Theme = (typeof THEMES)[number];

/**
 * The S19 hero text elements this step's acceptance criteria name. The title is
 * large display text (`var(--text-3xl)` — ≥24px, so WCAG "large text" ≥3:1);
 * meta and overview are body-size text that must clear full AA (≥4.5:1).
 */
const ELEMENTS: ReadonlyArray<{ selector: string; label: string; minContrast: number }> = [
  { selector: '.media-detail__title', label: 'title', minContrast: 3.0 },
  { selector: '.media-detail__meta', label: 'meta', minContrast: 4.5 },
  { selector: '.media-detail__overview', label: 'overview', minContrast: 4.5 },
];

/**
 * Sample positions inside each element's box as fractions of its rendered width
 * and height. The 0.15 x-column is inside the scrim's left→right gradient's
 * active zone (the hero sits right of the poster column, so the leftmost
 * samples still land where that second gradient stacks); the 0.85 column is on
 * the right, past most of it. Every sample is printed — a zero-sample pass is a
 * false pass.
 */
const X_FRACTIONS = [0.15, 0.5, 0.85] as const;
const Y_FRACTIONS = [0.25, 0.5, 0.75] as const;

const VIEWPORT = { width: 1280, height: 800 } as const;
const ROOT = resolve(__dirname, '../..');
const BOOT_TIMEOUT_MS = 180_000;

let server: ViteDevServer;
let browser: Browser;
let page: Page;
let origin: string;

/* ----------------------------- WCAG 2.1 math ----------------------------- */
type Rgb = [number, number, number];

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb: Rgb): number {
  return 0.2126 * srgbToLinear(rgb[0]) + 0.7152 * srgbToLinear(rgb[1]) + 0.0722 * srgbToLinear(rgb[2]);
}

/** WCAG 2.1 contrast ratio between two sRGB colors. */
function contrast(a: Rgb, b: Rgb): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

/** Parse a `getComputedStyle` color like `rgb(42, 32, 23)` or `rgba(…)`. */
function parseRgb(text: string): Rgb {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(text);
  if (!m) throw new Error(`cannot parse computed color "${text}"`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/* -------------------- minimal PNG decoder (8-bit RGB/RGBA) -------------------- */
/**
 * Decode a Playwright screenshot PNG into raw pixel data. Playwright's headless
 * chromium emits non-interlaced 8-bit RGB or RGBA PNGs; anything else is a
 * change worth failing on loudly rather than decoding wrongly (fail fast).
 */
function decodePng(buf: Buffer): { width: number; height: number; channels: number; data: Buffer } {
  const sig = buf.subarray(0, 8).toString('hex');
  if (sig !== '89504e470d0a1a0a') throw new Error('not a PNG');
  let pos = 8;
  let width = 0;
  let height = 0;
  let channels = 0;
  const idat: Buffer[] = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      const bitDepth = data[8];
      const colorType = data[9];
      const interlace = data[12];
      if (bitDepth !== 8) throw new Error(`unsupported PNG bit depth ${bitDepth}`);
      if (interlace !== 0) throw new Error(`unsupported interlaced PNG`);
      channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
      if (channels === 0) throw new Error(`unsupported PNG color type ${colorType}`);
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + len;
  }
  if (!width || !height || channels === 0) throw new Error('incomplete PNG header');
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  // Exact-length guard: a truncated/over-long IDAT means the pixel math below
  // would silently read wrong bytes. Fail loudly instead.
  if (raw.length !== height * (1 + stride)) {
    throw new Error(`PNG payload length ${raw.length}, expected ${height * (1 + stride)}`);
  }
  const out = Buffer.alloc(height * stride);
  let src = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[src++];
    if (filter > 4) throw new Error(`unsupported PNG filter ${filter}`);
    const row = out.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[src + x];
      const left = x >= channels ? row[x - channels] : 0;
      const up = y > 0 ? out[(y - 1) * stride + x] : 0;
      const upLeft = x >= channels && y > 0 ? out[(y - 1) * stride + x - channels] : 0;
      let val = rawByte;
      switch (filter) {
        case 0:
          break;
        case 1:
          val = (rawByte + left) & 0xff;
          break;
        case 2:
          val = (rawByte + up) & 0xff;
          break;
        case 3:
          val = (rawByte + ((left + up) >> 1)) & 0xff;
          break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          const pr = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
          val = (rawByte + pr) & 0xff;
          break;
        }
      }
      row[x] = val;
    }
    src += stride;
  }
  return { width, height, channels, data: out };
}

interface SampledPoint {
  /** Fractional position of the sample inside the element box. */
  x: number;
  y: number;
  /** The pixel the browser composited there (behind the hidden text). */
  background: Rgb;
  /** WCAG contrast of the box's WORST text color against that pixel. */
  ratio: number;
}

/**
 * Measure the composited background pixels behind one hero-text element and
 * compute their WCAG contrast against the text colors the box renders. The
 * text is temporarily hidden (transparent fill + no shadow) so the sampled
 * pixels are exactly the scrim/ambient/surface composite the text sits on —
 * the same "pixel behind the text" the acceptance criteria name.
 *
 * The colours are read BEFORE hiding, from the REAL computed style, and the
 * worst is taken across the element AND its text-bearing descendants: the meta
 * row mixes `--text-muted` items with a `--text-subtle` type chip, and the AC
 * binds every rendered text in the box, not just the container's own color.
 */
async function sampleElement(page: Page, selector: string): Promise<{ texts: Rgb[]; points: SampledPoint[] }> {
  const texts = (
    await page.evaluate((sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) throw new Error(`element not found: ${sel}`);
      const colors = new Set<string>([getComputedStyle(el).color]);
      for (const child of el.querySelectorAll('*')) {
        const hasText = Array.from(child.childNodes).some(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent != null && n.textContent.trim() !== '',
        );
        if (hasText) colors.add(getComputedStyle(child).color);
      }
      return Array.from(colors);
    }, selector)
  ).map(parseRgb);
  if (texts.length === 0) throw new Error(`${selector}: no text colour resolved`);

  let png: Buffer;
  try {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) throw new Error(`element not found: ${sel}`);
      el.style.color = 'transparent';
      el.style.textShadow = 'none';
      el.style.webkitTextFillColor = 'transparent';
    }, selector);
    // Two frames: one for the style flush, one for the compositor to settle.
    await page.evaluate(() => new Promise<void>((r) => requestAnimationFrame(() => r())));
    await page.evaluate(() => new Promise<void>((r) => requestAnimationFrame(() => r())));
    png = await page.locator(selector).first().screenshot({ type: 'png' });
  } finally {
    // Restore even if the screenshot/decode path throws, so the next theme's
    // page (or a failure re-run) never sees hidden hero text.
    await page.evaluate((sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) {
        el.style.color = '';
        el.style.textShadow = '';
        el.style.webkitTextFillColor = '';
      }
    }, selector);
  }

  const { width, height, channels, data } = decodePng(png);

  const points: SampledPoint[] = [];
  for (const fx of X_FRACTIONS) {
    for (const fy of Y_FRACTIONS) {
      const px = Math.min(width - 1, Math.max(0, Math.round(fx * (width - 1))));
      const py = Math.min(height - 1, Math.max(0, Math.round(fy * (height - 1))));
      const i = (py * width + px) * channels;
      const alpha = channels === 4 ? data[i + 3] : 255;
      // A transparent pixel means nothing was painted behind the element at this
      // point — a vacuous sample. The scrim/ambient/surface composite is opaque,
      // so this is a real render failure, not something to average away.
      if (alpha === 0) {
        throw new Error(`${selector}: pixel at x${fx},y${fy} is fully transparent — nothing painted behind it`);
      }
      const background: Rgb = [data[i], data[i + 1], data[i + 2]];
      const worst = Math.min(...texts.map((t) => contrast(t, background)));
      points.push({ x: fx, y: fy, background, ratio: worst });
    }
  }

  return { texts, points };
}

beforeAll(async () => {
  server = await createServer({
    configFile: resolve(ROOT, 'vite.config.ts'),
    root: ROOT,
    logLevel: 'error',
    server: { port: 5193, strictPort: false, host: '127.0.0.1' },
  });
  await server.listen();
  const url = server.resolvedUrls?.local?.[0];
  if (!url) throw new Error('vite dev server reported no local url');
  origin = url.replace(/\/$/, '');

  browser = await chromium.launch();
  page = await browser.newPage({ viewport: { ...VIEWPORT }, reducedMotion: 'reduce' });
}, BOOT_TIMEOUT_MS);

afterAll(async () => {
  await browser?.close();
  await server?.close();
});

/**
 * Mount the REAL MediaDetail (poster set, `backdrop_url: null` → the S19
 * ambient scrim is the ONLY darkening overlay) and sample every hero-text
 * element in every theme.
 */
async function measureTheme(theme: Theme): Promise<void> {
  await page.goto(`${origin}/src/dev/visual/media-detail.html?theme=${theme}`, { waitUntil: 'load' });
  // The ambient scrim is the element under test: it must actually be rendered
  // (poster present, no backdrop) or the measurement is vacuous.
  await page.locator('.media-detail__ambient-scrim').first().waitFor({ state: 'visible' });
  await page.locator('.media-detail__title').first().waitFor({ state: 'visible' });
  await page.locator('.media-detail__meta').first().waitFor({ state: 'visible' });
  await page.locator('.media-detail__overview').first().waitFor({ state: 'visible' });

  for (const { selector, label, minContrast } of ELEMENTS) {
    const { texts, points } = await sampleElement(page, selector);
    const ratios = points.map((p) => p.ratio.toFixed(2)).join(', ');
    // S345 lesson 3: a "nothing matched" defence needs its own guard — print
    // the sample count AND every ratio so a zero-sample pass is impossible.
    console.log(
      `[${theme}] ${label} text rgb(${texts.map((t) => t.join(',')).join(' / ')}) — sample count ${points.length}; ratios: ${ratios} (min ${Math.min(...points.map((p) => p.ratio)).toFixed(2)})`,
    );
    expect(points.length, `${theme}/${label} must produce samples`).toBeGreaterThan(0);

    const min = Math.min(...points.map((p) => p.ratio));
    const minPoint = points.reduce((a, b) => (a.ratio <= b.ratio ? a : b));
    expect(
      min,
      `${theme}/${label}: worst sampled contrast ${min.toFixed(2)}:1 (at x${minPoint.x},y${minPoint.y}, bg rgb(${minPoint.background.join(',')})) must be ≥ ${minContrast}:1 — every sample: ${ratios}`,
    ).toBeGreaterThanOrEqual(minContrast);
  }
}

describe('S326 — ambient-scrim hero contrast, measured from rendered pixels (real chromium)', () => {
  for (const theme of THEMES) {
    it(`[${theme}] title/meta/overview clear their WCAG threshold behind the ambient scrim`, async () => {
      await measureTheme(theme);
    }, 60_000);
  }
});