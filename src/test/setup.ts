/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { afterEach, vi } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

globalThis.fetch = vi.fn();

// S178 — destroy every wrapper `mount()`/`shallowMount()` creates as soon as the
// test that created it ends, for EVERY test file.
//
// Why this is correctness and not tidiness: `mount()` puts a wrapper's own root
// in a detached div, but a component that teleports (`Modal.vue:66` is
// `<Teleport to="body">`, and `ItemDataInspector.vue` / `MetadataMatchModal` render
// through it) writes straight into `document.body`. Without a teardown that DOM
// survives into every later test in the same file, so a later
// `document.body.querySelector(...)` can read a pane a DIFFERENT test opened and
// pass for the wrong reason. Measured during the S15 audit: a 0-panes
// non-inertness control failed on its first run with `expected 2 to be +0`
// because two earlier `LibraryPage.test.ts` tests opened the inspector and never
// unmounted. The full 4 429-test suite was green the whole time.
//
// The same leak also costs time — see the S118 note in `FilterBar.test.ts`, where
// ~24 abandoned instances stayed subscribed to window `scroll` and one dispatched
// event re-rendered all of them (1 506 ms of a 1 585 ms test).
//
// `enableAutoUnmount` throws if called twice, so test files must NOT call it
// themselves now that it lives here. `src/test/auto-unmount.test.ts` is the
// recurrence guard: deleting the line below turns it red.
enableAutoUnmount(afterEach);

// Ensure real timers are always restored after each test.
// This prevents timer state pollution when tests forget to call
// vi.useRealTimers() in their afterEach/afterAll hooks.
afterEach(() => {
  vi.useRealTimers();
});
