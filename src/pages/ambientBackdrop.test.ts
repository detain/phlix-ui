/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PREBLUR_FILTER, PREBLUR_WIDTH, preblurImage } from './ambientBackdrop';

type Ctx = {
  filter: string;
  globalCompositeOperation?: string;
  fillStyle?: unknown;
  drawImage: ReturnType<typeof vi.fn>;
  [k: string]: unknown;
};

function ctxStub(): Ctx {
  const stops: Array<[number, string]> = [];
  const ctx: Ctx = {
    filter: 'none',
    globalCompositeOperation: 'source-over',
    drawImage: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    fillRect: vi.fn(),
    stops,
    createRadialGradient: vi.fn(() => ({ addColorStop: (o: number, c: string) => stops.push([o, c]) })),
  };
  return ctx;
}

function stubImage(opts: { w: number; h: number; decode?: () => Promise<void> }): void {
  class FakeImage {
    decoding = '';
    src = '';
    naturalWidth = opts.w;
    naturalHeight = opts.h;
    decode = opts.decode ?? (() => Promise.resolve());
  }
  vi.stubGlobal('Image', FakeImage);
}

function fakeDoc(ctx: Ctx | null, dataUrl = 'data:image/png;base64,AAA') {
  const canvas = { width: 0, height: 0, getContext: vi.fn(() => ctx), toDataURL: vi.fn(() => dataUrl) };
  const doc = { createElement: vi.fn(() => canvas) } as unknown as Document;
  return { doc, canvas };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('preblurImage', () => {
  it('blurs ONCE into a tiny page-aspect canvas, cover-cropped, and returns its data URL', async () => {
    stubImage({ w: 1000, h: 1500 });
    const ctx = ctxStub();
    const filters: string[] = [];
    let filter = 'none';
    Object.defineProperty(ctx, 'filter', { get: () => filter, set: (v: string) => { filters.push(v); filter = v; } });
    const { doc, canvas } = fakeDoc(ctx);

    const out = await preblurImage('/poster.jpg', doc, 16 / 9);

    expect(out).toBe('data:image/png;base64,AAA');
    expect(canvas.width).toBe(PREBLUR_WIDTH);
    expect(canvas.height).toBe(36); // 64 / (16/9)
    expect(filters[0]).toBe(PREBLUR_FILTER); // blur+saturate applied to the poster draw
    expect(ctx.drawImage).toHaveBeenCalledTimes(1);
    // cover-crop: a 2:3 poster scaled to fill 64 wide → 96 tall (+pad), centred vertically
    const [, dx, dy, dw, dh] = ctx.drawImage.mock.calls[0] as number[];
    expect(dw).toBe(64 + 8);
    expect(dh).toBe(96 + 8);
    expect(dx).toBe(-4);
    expect(dy).toBe((36 - 96) / 2 - 4);
  });

  it('bakes the old radial mask in (destination-in fade, opaque centre → transparent at 75%)', async () => {
    stubImage({ w: 100, h: 100 });
    const ctx = ctxStub();
    const ops: string[] = [];
    let op = 'source-over';
    Object.defineProperty(ctx, 'globalCompositeOperation', { get: () => op, set: (v: string) => { ops.push(v); op = v; } });
    const { doc } = fakeDoc(ctx);

    await preblurImage('/p.jpg', doc);

    expect(ops).toEqual(['destination-in', 'source-over']);
    expect(ctx.stops).toEqual([
      [0, 'rgba(0, 0, 0, 1)'],
      [0.75, 'rgba(0, 0, 0, 0)'],
    ]);
    expect(ctx.fillRect).toHaveBeenCalledWith(-1, -1, 2, 2);
  });

  it('clamps a nonsense aspect instead of producing a degenerate canvas', async () => {
    stubImage({ w: 100, h: 100 });
    const { doc, canvas } = fakeDoc(ctxStub());
    await preblurImage('/p.jpg', doc, Number.NaN);
    expect(canvas.height).toBe(36);
  });

  it('returns null (caller keeps the CSS-filter fallback) when the image fails to decode', async () => {
    stubImage({ w: 10, h: 10, decode: () => Promise.reject(new Error('404')) });
    const { doc } = fakeDoc(ctxStub());
    expect(await preblurImage('/missing.jpg', doc)).toBeNull();
  });

  it('returns null when there is no 2D context', async () => {
    stubImage({ w: 10, h: 10 });
    const { doc } = fakeDoc(null);
    expect(await preblurImage('/poster.jpg', doc)).toBeNull();
  });

  it('returns null on a tainted canvas instead of throwing', async () => {
    stubImage({ w: 10, h: 10 });
    const { doc, canvas } = fakeDoc(ctxStub());
    canvas.toDataURL.mockImplementation(() => {
      throw new DOMException('tainted', 'SecurityError');
    });
    expect(await preblurImage('/x.jpg', doc)).toBeNull();
  });

  it('returns null for a zero-size image', async () => {
    stubImage({ w: 0, h: 0 });
    const { doc } = fakeDoc(ctxStub());
    expect(await preblurImage('/x.jpg', doc)).toBeNull();
  });
});
