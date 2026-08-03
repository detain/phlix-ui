/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, Teleport, onBeforeUnmount } from 'vue';

/**
 * S178 — the recurrence guard for `enableAutoUnmount(afterEach)` in
 * `src/test/setup.ts`, made OBSERVABLE.
 *
 * Why this file exists: the fix S178 ships is a single line of shared test
 * scaffolding, and a leak costs CORRECTNESS here, not just time. Without the
 * line, DOM a test mounts and never destroys survives into every later test in
 * the same file — so a later `document.body.querySelector(...)` assertion can
 * read a pane a DIFFERENT test opened and pass for the wrong reason. That is
 * not hypothetical: during the S15 audit a 0-panes non-inertness control failed
 * on its first run with `expected 2 to be +0`, because two earlier
 * `LibraryPage.test.ts` tests opened the item-data inspector and never
 * unmounted. The whole 4 429-test suite was green throughout.
 *
 * `mount()` puts a wrapper's own root in a DETACHED div, so a plain mount is
 * invisible to `document.body` and cannot demonstrate the leak. The real
 * leak vector is teleported content: `ItemDataInspector.vue:64` renders
 * `Modal.vue`, which is `<Teleport to="body">` (Modal.vue:66). The probe below
 * reproduces exactly that shape with no project code in the way.
 *
 * The guard is two-sided on purpose. `probeTeardowns` proves the teardown
 * actually RAN, so the 0-panes assertion cannot pass merely because the probe
 * stopped teleporting — a one-sided version would keep passing forever if the
 * probe silently broke.
 */
const MARK = 'auto-unmount-probe';

/** Incremented by the probe's own `onBeforeUnmount`, so a teardown is provable. */
let probeTeardowns = 0;

const TeleportingProbe = defineComponent({
  name: 'TeleportingProbe',
  setup() {
    onBeforeUnmount(() => {
      probeTeardowns += 1;
    });
    return () => h(Teleport, { to: 'body' }, [h('div', { 'data-test': MARK }, 'leaked')]);
  },
});

/** Every probe pane currently live in the document, across all tests in this file. */
const panes = () => document.body.querySelectorAll(`[data-test="${MARK}"]`);

describe('test setup — components do not leak DOM between tests (S178)', () => {
  it('mounts a teleporting component into <body> and deliberately never unmounts it', () => {
    // Non-inertness control: the post-condition below is worthless if the
    // pre-condition already satisfied it.
    expect(panes()).toHaveLength(0);

    mount(TeleportingProbe);

    // Proves the probe really does put DOM in <body>, so the next test's
    // 0-panes assertion has something real to be the absence of.
    expect(panes()).toHaveLength(1);

    // NO unmount() here, on purpose. This is the defect being reproduced.
  });

  it('sees none of the previous test DOM, because setup.ts auto-unmounts', () => {
    // Deleting `enableAutoUnmount(afterEach)` from src/test/setup.ts makes BOTH
    // of these fail: 0 teardowns ever ran, and the previous test's pane is
    // still in the document.
    expect(probeTeardowns).toBe(1);
    expect(panes()).toHaveLength(0);
  });
});
