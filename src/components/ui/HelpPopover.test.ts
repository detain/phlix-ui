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

/**
 * Live `pointerdown` subscriptions on `document`, tracked so the unmount cleanup
 * is OBSERVABLE.
 *
 * Needed because deleting `onBeforeUnmount`'s `removeEventListener` is otherwise
 * invisible (measured — all 18 tests stayed green): Vue nulls template refs on
 * unmount, so the stale `onDocPointer` still fires but bails at
 * `triggerEl.value &&` and changes nothing observable. The handler is neverthless
 * still attached to `document` for the life of the process, which is exactly the
 * S178 leak class.
 *
 * A Set keyed by handler, not a counter, following `FilterBar.test.ts`: the
 * `watch(open)` teardown also calls `removeEventListener`, so a naive ±1 counter
 * can be driven negative and mask the leak it is meant to catch.
 */
type Listener = Parameters<Document['addEventListener']>[1];
const livePointerDownHandlers = new Set<Listener>();
let pointerDownSubscriptionsEverSeen = 0;
const realDocAdd = document.addEventListener.bind(document);
const realDocRemove = document.removeEventListener.bind(document);
document.addEventListener = ((type: string, l: Listener, o?: boolean | AddEventListenerOptions) => {
  if (type === 'pointerdown') {
    livePointerDownHandlers.add(l);
    pointerDownSubscriptionsEverSeen += 1;
  }
  realDocAdd(type, l, o);
}) as typeof document.addEventListener;
document.removeEventListener = ((
  type: string,
  l: Listener,
  o?: boolean | EventListenerOptions,
) => {
  if (type === 'pointerdown') livePointerDownHandlers.delete(l);
  realDocRemove(type, l, o);
}) as typeof document.removeEventListener;

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

  it('is idempotent when opened twice without closing, and does not steal focus back', async () => {
    // `openPopover`'s `if (open.value) return;` early exit is NOT observable as a
    // duplicate panel — `open.value = true` is idempotent by itself, so a
    // panel-count assertion leaves the guard UNKILLABLE (measured: deleting the
    // guard kept all 17 tests green). What the guard really protects is the
    // `nextTick` block it skips, which re-runs `updatePosition()` and re-focuses
    // the FIRST button in the panel. So assert focus is preserved instead.
    const w = mountPopover({ helpLinks: [{ text: 'Docs', url: 'https://example.test/d' }] });
    await open(w);
    await nextTick();

    // Non-inertness control: an optional call (`openPopover?.()`) on a binding
    // that script-setup did not expose is a silent no-op, and this test would
    // then pass without ever re-entering `openPopover`. Assert it is reachable.
    const vm = w.vm as unknown as { openPopover: () => void };
    expect(typeof vm.openPopover).toBe('function');

    // Move focus off the close button, as a user pressing Tab would. A link is
    // NOT matched by the component's `querySelector('button,[contenteditable]')`,
    // so an unguarded re-open visibly yanks focus back to the close button.
    const link = document.body.querySelector('.phlix-help-text__link') as HTMLAnchorElement;
    link.focus();
    expect(document.activeElement).toBe(link);

    vm.openPopover();
    await nextTick();

    expect(document.body.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    expect(document.activeElement).toBe(link);
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

  it('falls back to focusing the trigger when the previously-focused element has left the DOM', async () => {
    // 🔴 Isolation test, written because of TWO measured survivors. In the normal
    // path two mechanisms deliver "focus returns to the trigger":
    // `closePopover()`'s own `triggerEl.value?.focus()`, and
    // `useFocusTrap.deactivate()`'s `prevFocus.focus()`. A user clicks the (?)
    // button, so `prevFocus` IS the trigger and the two are indistinguishable —
    // deleting the component's own call left all 17 tests green.
    //
    // Opening programmatically with focus elsewhere does NOT separate them
    // either: `closePopover` focuses the trigger synchronously, then the watcher
    // flush runs `deactivate()`, which focuses `prevFocus` LAST and wins. So on
    // that path the component's call is genuinely unobservable.
    //
    // The one state where it decides is `deactivate()`'s own guard:
    // `if (prevFocus && document.contains(prevFocus))`. Remove the opener from the
    // document while the popover is open — a list re-render does this — and the
    // restore is skipped, leaving `closePopover()`'s call as the only mechanism.
    // Without it, focus is left orphaned on a detached node.
    const w = mountPopover();
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.focus();
    expect(document.activeElement).toBe(outside);

    (w.vm as unknown as { openPopover: () => void }).openPopover();
    await nextTick();
    await nextTick();
    expect(panel()).not.toBeNull();

    outside.remove();
    expect(document.contains(outside)).toBe(false);

    (document.body.querySelector('.phlix-help-popover__close') as HTMLButtonElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );
    await nextTick();
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

  it('unsubscribes its document listener when unmounted while still OPEN (S178 leak class)', async () => {
    const w = mountPopover();
    await open(w);
    expect(panel()).not.toBeNull();
    // The subscription must exist right now, or the post-condition below is
    // satisfied before the action and proves nothing.
    expect(livePointerDownHandlers.size).toBe(1);

    // Unmount while OPEN: `watch(open)` never fires, so `onBeforeUnmount` is the
    // ONLY thing that can detach the handler.
    w.unmount();

    expect([...livePointerDownHandlers]).toHaveLength(0);
    expect(() =>
      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true })),
    ).not.toThrow();
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });

  it('unsubscribes on a normal close too, and has really observed subscriptions', () => {
    // Two-sided companion for the check above: if HelpPopover ever stops
    // subscribing at all, the emptiness assertions become trivially true and
    // would keep passing forever.
    expect(pointerDownSubscriptionsEverSeen).toBeGreaterThan(1);
    expect([...livePointerDownHandlers]).toHaveLength(0);
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
