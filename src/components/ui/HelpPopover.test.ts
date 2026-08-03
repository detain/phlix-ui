/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import HelpPopover from './HelpPopover.vue';

/**
 * S177 — `HelpPopover.vue` had NO test file and measured `LF:47 LH:0` in
 * `coverage/lcov.info`: 47 lines, zero ever executed, inside a component the
 * package re-exports publicly (`src/index.ts` → `export * from './components/ui'`
 * → `components/ui/index.ts:36`).
 *
 * 🔴 The recorded S177 decision is KEEP + TEST, not delete. `@phlix/ui` is not on
 * the npm registry; it ships by GitHub tag, so there are no download statistics
 * and no dependency graph to interrogate, and external non-use is therefore NOT
 * establishable. That is not a theoretical worry — while auditing this step the
 * in-estate consumer list itself turned out to be wrong twice over. The spec named
 * two consumers (`phlix-server/web-ui`, `phlix-hub/web-ui`); there are four, and
 * they pin with two DIFFERENT syntaxes (`…/archive/refs/tags/vX.tar.gz` for
 * server/hub/windows, `github:detain/phlix-ui#vX` for tizen), so a code search for
 * either form alone misses real consumers. CHANGELOG.md's own criterion for
 * "breaking" is whether a symbol is on the public entry surface — this one is.
 *
 * So the 0% coverage, not the component, is the defect being fixed here. Nothing
 * about the shipped SFC is edited: a comment inside a *scoped* SFC rehashes its
 * `data-v-` scope id and changes build artefacts, and `dist/` is separately stale
 * (S176). This file adds zero bytes to any bundle.
 *
 * jsdom notes that shape the tests below:
 * - `mount()` roots live in a DETACHED div, so `attachTo: document.body` is
 *   required for the capture-phase `document` listeners to be reachable at all.
 * - VTU's `trigger()` will not dispatch to a `disabled` element, and these are
 *   document-level listeners besides, so raw `dispatchEvent` is used throughout
 *   (the `Modal.test.ts` convention).
 * - `getBoundingClientRect()` returns all zeros and `offsetWidth`/`offsetHeight`
 *   return 0 (not `undefined`, so `?? 320` never fires). Every positioning test
 *   therefore stubs those explicitly; without a stub the flip/clamp branches are
 *   unreachable.
 */

/** Restorers registered by the metric stubs, drained after every test. */
const restore: Array<() => void> = [];

afterEach(() => {
  while (restore.length) restore.pop()!();
  document.body.innerHTML = '';
  document.body.style.overflow = '';
});

/** Stub the trigger rect + panel box + viewport that `updatePosition()` reads. */
function stubMetrics(opts: {
  rect?: Partial<DOMRect>;
  panelW?: number;
  panelH?: number;
  innerWidth?: number;
  innerHeight?: number;
}) {
  const rect = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, ...opts.rect };
  const realRect = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () {
    return { ...rect, x: rect.left, y: rect.top, toJSON: () => rect } as DOMRect;
  };
  restore.push(() => {
    Element.prototype.getBoundingClientRect = realRect;
  });

  for (const [prop, val] of [
    ['offsetWidth', opts.panelW],
    ['offsetHeight', opts.panelH],
  ] as const) {
    if (val === undefined) continue;
    const prev = Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop);
    Object.defineProperty(HTMLElement.prototype, prop, { configurable: true, get: () => val });
    restore.push(() => {
      if (prev) Object.defineProperty(HTMLElement.prototype, prop, prev);
      else delete (HTMLElement.prototype as unknown as Record<string, unknown>)[prop];
    });
  }

  for (const [prop, val] of [
    ['innerWidth', opts.innerWidth],
    ['innerHeight', opts.innerHeight],
  ] as const) {
    if (val === undefined) continue;
    const prev = window[prop];
    Object.defineProperty(window, prop, { configurable: true, writable: true, value: val });
    restore.push(() => {
      Object.defineProperty(window, prop, { configurable: true, writable: true, value: prev });
    });
  }
}

function open(w: ReturnType<typeof mount>) {
  trigger(w).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  return nextTick();
}

const trigger = (w: ReturnType<typeof mount>) =>
  w.element.querySelector('.phlix-help-popover__trigger') as HTMLButtonElement;

const panel = () => document.body.querySelector('[role="dialog"]');

function mountPopover(props: Record<string, unknown> = {}) {
  return mount(HelpPopover, {
    props: { helpText: 'Choose a strong password', ...props },
    attachTo: document.body,
  });
}

describe('HelpPopover — trigger', () => {
  it('renders a collapsed (?) trigger and no panel until asked', () => {
    const w = mountPopover();
    const btn = trigger(w);
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    // Collapsed means aria-controls must be ABSENT, not pointing at a missing id.
    expect(btn.getAttribute('aria-controls')).toBeNull();
    expect(w.element.querySelector('.phlix-help-popover__badge')?.textContent).toBe('?');
    expect(panel()).toBeNull();
  });

  it('names the field in the accessible name when fieldLabel is given, and does not when it is not', () => {
    // Two-sided: the default must be the bare label, or "Help for X" could be
    // hard-coded and this would still pass.
    expect(trigger(mountPopover()).getAttribute('aria-label')).toBe('Help');
    expect(trigger(mountPopover({ fieldLabel: 'Discovery port' })).getAttribute('aria-label')).toBe(
      'Help for Discovery port',
    );
  });
});

describe('HelpPopover — open / close', () => {
  it('opens a non-modal dialog wired to the trigger by aria-controls', async () => {
    const w = mountPopover();
    expect(panel()).toBeNull(); // non-inertness control
    await open(w);

    const p = panel()!;
    expect(p).not.toBeNull();
    // aria-modal="false" is the whole point of a popover vs a Modal — pin it.
    expect(p.getAttribute('aria-modal')).toBe('false');
    expect(p.id).toMatch(/^phlix-help-popover-/);
    expect(trigger(w).getAttribute('aria-expanded')).toBe('true');
    expect(trigger(w).getAttribute('aria-controls')).toBe(p.id);
    expect(p.textContent).toContain('Choose a strong password');
  });

  it('defaults the header to "Help" and uses the title prop when supplied', async () => {
    const bare = mountPopover();
    await open(bare);
    expect(document.body.querySelector('.phlix-help-popover__title')?.textContent).toBe('Help');
    bare.unmount();
    document.body.innerHTML = '';

    const titled = mountPopover({ title: 'Password help' });
    await open(titled);
    expect(document.body.querySelector('.phlix-help-popover__title')?.textContent).toBe(
      'Password help',
    );
  });

  it('renders reference links through HelpText', async () => {
    const w = mountPopover({
      helpLinks: [{ text: 'Docs', url: 'https://example.test/docs' }],
    });
    await open(w);
    const a = document.body.querySelector('.phlix-help-text__link') as HTMLAnchorElement;
    expect(a.getAttribute('href')).toBe('https://example.test/docs');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    expect(a.textContent).toContain('Docs');
  });

  it('toggles shut on a second trigger click', async () => {
    const w = mountPopover();
    await open(w);
    expect(panel()).not.toBeNull();
    await open(w);
    expect(panel()).toBeNull();
    expect(trigger(w).getAttribute('aria-expanded')).toBe('false');
  });

  it('is idempotent when opened twice without closing', async () => {
    // Guards `openPopover`'s `if (open.value) return;` early exit: a second open
    // must not stack a second panel in <body>.
    const w = mountPopover();
    await open(w);
    // Non-inertness control: an optional call (`openPopover?.()`) on a binding
    // that script-setup did not expose is a silent no-op, and this test would
    // then pass without ever re-entering `openPopover`. Assert it is reachable.
    const vm = w.vm as unknown as { openPopover: () => void };
    expect(typeof vm.openPopover).toBe('function');
    vm.openPopover();
    await nextTick();
    expect(document.body.querySelectorAll('[role="dialog"]')).toHaveLength(1);
  });

  it('closes on the close button and returns focus to the trigger', async () => {
    const w = mountPopover();
    // Focus the trigger first, as a real pointer click does. This matters:
    // `useFocusTrap.deactivate()` restores `prevFocus`, and jsdom's default
    // `document.activeElement` is `<body>` — which IS in the document, so an
    // unfocused-trigger test has <body> restored over the trigger and fails for a
    // reason no user can hit.
    trigger(w).focus();
    await open(w);
    const close = document.body.querySelector(
      '.phlix-help-popover__close',
    ) as HTMLButtonElement;
    expect(close).not.toBeNull();
    close.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(panel()).toBeNull();
    expect(document.activeElement).toBe(trigger(w));
  });

  it('moves focus into the panel on open', async () => {
    const w = mountPopover();
    expect(document.activeElement).not.toBe(
      document.body.querySelector('.phlix-help-popover__close'),
    );
    await open(w);
    await nextTick();
    expect(document.body.contains(document.activeElement)).toBe(true);
    expect(panel()!.contains(document.activeElement)).toBe(true);
  });

  it('closes on Escape', async () => {
    const w = mountPopover();
    await open(w);
    // useFocusTrap listens capture-phase on `document`, so dispatch there.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();
    expect(panel()).toBeNull();
  });
});

describe('HelpPopover — outside dismissal', () => {
  it('closes on a pointerdown outside, but NOT on one inside the panel', async () => {
    const w = mountPopover();
    await open(w);

    // Inside first: if this closed the popover, the "outside" half below would
    // pass for the wrong reason on an already-closed popover.
    panel()!.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    await nextTick();
    expect(panel()).not.toBeNull();

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    await nextTick();
    expect(panel()).toBeNull();
  });

  it('does not treat a pointerdown on the trigger itself as an outside click', async () => {
    const w = mountPopover();
    await open(w);
    trigger(w).dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    await nextTick();
    expect(panel()).not.toBeNull();
  });

  it('unsubscribes its document listener on unmount (S178 leak class)', async () => {
    const w = mountPopover();
    await open(w);
    expect(panel()).not.toBeNull();
    w.unmount();

    // Two-sided: prove the listener is really gone by firing the event that would
    // have run it. A stale `onDocPointer` closing over an unmounted instance is
    // exactly the leak `enableAutoUnmount` was added to stop being invisible.
    expect(() =>
      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true })),
    ).not.toThrow();
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });
});

describe('HelpPopover — positioning', () => {
  it('sits below the trigger when there is room, clamping the left edge to the viewport minimum', async () => {
    stubMetrics({
      rect: { top: 100, bottom: 130, left: 0 },
      panelW: 320,
      panelH: 200,
      innerWidth: 1024,
      innerHeight: 768,
    });
    const w = mountPopover();
    await open(w);
    await nextTick();
    const style = (panel() as HTMLElement).style;
    // r.bottom (130) + gap (6)
    expect(style.top).toBe('136px');
    // left 0 is below the 8px minimum, so it clamps to 8.
    expect(style.left).toBe('8px');
  });

  it('flips above the trigger when the space below cannot fit the panel', async () => {
    // spaceBelow = 768 - 700 = 68 < 200 + 6, and r.top (670) > 68 → flip.
    stubMetrics({
      rect: { top: 670, bottom: 700, left: 300 },
      panelW: 320,
      panelH: 200,
      innerWidth: 1024,
      innerHeight: 768,
    });
    const w = mountPopover();
    await open(w);
    await nextTick();
    const style = (panel() as HTMLElement).style;
    // r.top (670) - panelH (200) - gap (6) = 464
    expect(style.top).toBe('464px');
    expect(style.left).toBe('300px');
  });

  it('stays below when the space above is even tighter than the space below', async () => {
    // Pins the SECOND half of the flip condition (`r.top > spaceBelow`): the panel
    // does not fit either way, so it must not flip into an even worse position.
    stubMetrics({
      rect: { top: 10, bottom: 40, left: 100 },
      panelW: 320,
      panelH: 900,
      innerWidth: 1024,
      innerHeight: 768,
    });
    const w = mountPopover();
    await open(w);
    await nextTick();
    expect((panel() as HTMLElement).style.top).toBe('46px');
  });

  it('pulls the panel left so it cannot overflow the right edge', async () => {
    // left 900 + panelW 320 = 1220 > 1024 - 8 → left = 1024 - 320 - 8 = 696.
    stubMetrics({
      rect: { top: 100, bottom: 130, left: 900 },
      panelW: 320,
      panelH: 200,
      innerWidth: 1024,
      innerHeight: 768,
    });
    const w = mountPopover();
    await open(w);
    await nextTick();
    expect((panel() as HTMLElement).style.left).toBe('696px');
  });
});
