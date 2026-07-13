/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import type { ApiClient } from '../../api/client';
// Importing the page module evaluates its top-level side-effect `import
// 'apexcharts/line'`, which calls `ApexCharts.use({ line, area, ... })` on the
// shared `apexcharts/core` singleton the `vue3-apexcharts/core` wrapper uses.
import MetricsPage from './MetricsPage.vue';
import * as apexCore from 'apexcharts/core';

/**
 * UI-3.4 [U-B4] — ApexCharts chart-type REGISTRATION regression guard.
 *
 * MetricsPage renders `type="area"` and `type="line"` charts through the
 * `vue3-apexcharts/core` wrapper, which statically imports `apexcharts/core` —
 * the browser build that ships with ZERO chart types registered. Without an
 * explicit `import 'apexcharts/line'` in MetricsPage.vue, ApexCharts throws
 * `chart type "area" is not registered. Import it via ApexCharts.use()` the first
 * time it draws the series.
 *
 * The build-only dedupe assertion (src/__tests__/dist-apex-dedupe.test.ts) never
 * RENDERS a chart, so it cannot catch this. Nor can the existing
 * MetricsPage.test.ts, which STUBS `VueApexCharts` with a plain <div>. And a real
 * jsdom mount does NOT surface the throw (ApexCharts short-circuits before drawing
 * the series when the container has no layout, so the error path is unreachable in
 * jsdom). The only reliable, deterministic guard is to assert the chart-type
 * registry itself — exactly the runtime lookup ApexCharts performs at render.
 *
 * `apexcharts/core` exports `getChartClass(type)` (as
 * `__apex_ChartFactory_getChartClass`), which reads the global registry and throws
 * the identical "is not registered" error when a type is missing. Asserting it
 * does NOT throw for `area`/`line` after importing MetricsPage proves the page
 * registered the types it renders. Remove the `import 'apexcharts/line'` from
 * MetricsPage.vue and this test goes RED (verified pre-fix).
 */

// `getChartClass` is an internal export; index into the namespace to avoid
// depending on it in the public typings.
const getChartClass = (apexCore as unknown as Record<string, unknown>)[
  '__apex_ChartFactory_getChartClass'
] as (type: string) => unknown;

// jsdom lacks ResizeObserver; the real ApexCharts wrapper (used un-stubbed below)
// touches it on mount.
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

const snapshot = {
  bytes_in_per_sec: 1_234_567,
  bytes_out_per_sec: 9_876_543,
  active_connections: 42,
  requests_per_sec: 128.5,
  error_rate: 0.002,
  p50_ms: 12,
  p95_ms: 85,
  p99_ms: 210,
};

const historyBucket = {
  bucket: '2026-09-08 08:00:00',
  bytes_in: 2_000_000_000,
  bytes_out: 10_000_000_000,
  requests: 5000,
  errors: 3,
  p50_ms: 10,
  p95_ms: 75,
};

function makeClient() {
  const get = vi.fn(async (endpoint: string) => {
    if (endpoint === '/api/v1/admin/metrics/snapshot') return { data: snapshot };
    if (endpoint === '/api/v1/admin/metrics/history') return { data: [historyBucket] };
    if (endpoint === '/api/v1/admin/metrics/connections') return { data: [] };
    if (endpoint === '/api/v1/admin/metrics/routes') return { data: [] };
    throw new Error(`unexpected ${endpoint}`);
  });
  return { client: { get } as unknown as ApiClient };
}

describe('UI-3.4 MetricsPage ApexCharts chart-type registration', () => {
  it('sanity: apexcharts/core exposes the registry lookup used at render', () => {
    expect(typeof getChartClass).toBe('function');
  });

  it('registers the "area" chart type MetricsPage renders (else "not registered" at render)', () => {
    // Importing MetricsPage (top of this file) must have run `import 'apexcharts/line'`.
    expect(MetricsPage).toBeTruthy();
    expect(() => getChartClass('area')).not.toThrow();
    expect(typeof getChartClass('area')).toBe('function');
  });

  it('registers the "line" chart type MetricsPage renders', () => {
    expect(() => getChartClass('line')).not.toThrow();
    expect(typeof getChartClass('line')).toBe('function');
  });

  it('mounts the page with the REAL (un-stubbed) VueApexCharts wrapper and renders the charts', async () => {
    setActivePinia(createPinia());
    const errorHandlerCaught: string[] = [];
    const { client } = makeClient();
    const w = mount(MetricsPage, {
      props: { client },
      attachTo: document.body,
      global: {
        // VueApexCharts is intentionally NOT stubbed here — this exercises the real
        // apexcharts/core wrapper end-to-end.
        config: {
          errorHandler(err: unknown) {
            errorHandlerCaught.push((err as Error)?.message ?? String(err));
          },
        },
        stubs: { RouterLink: RouterLinkStub },
      },
    });
    // Resolve the async wrapper component + the mocked data fetches, then let
    // ApexCharts draw. ApexCharts draws ASYNCHRONOUSLY (its own timers/rAF), and
    // the `<VueApexCharts>` wrapper resolves via a `defineAsyncComponent` dynamic
    // import — so the `apexcharts-canvas` root appears an indeterminate time after
    // mount. The previous `await new Promise(r => setTimeout(r, 60))` GUESSED that
    // delay; under the full-suite PARALLEL run vitest launches ~1 worker per core
    // (48 here) and saturates the CPU, so the worker's event loop is starved and
    // the real (heavy) library routinely needs > 60 ms of WALL-CLOCK to finish
    // drawing — the fixed wait then raced the render and this one assertion flaked
    // (green 4/4 in isolation; intermittently red ONLY in the full parallel run —
    // the registration asserts above never flaked because they read the synchronous
    // globalThis registry). Poll for the genuine async condition instead of guessing
    // a delay: `vi.waitFor` re-runs the callback (flushing promises each pass) until
    // the canvas is present, succeeding the instant it renders and failing only if
    // it never renders within a generous ceiling. This is a correct async wait, NOT
    // a retry/skip of the assertion.
    await flushPromises();
    await vi.waitFor(
      async () => {
        await flushPromises();
        // The real ApexCharts library rendered its chart root (only the genuine
        // library emits this class — the ~5 KB wrapper does not), proving the
        // un-stubbed wrapper mounted and area/line resolved.
        expect(w.html()).toContain('apexcharts-canvas');
      },
      { timeout: 3000, interval: 25 },
    );

    // No chart-type registration error reached the app error handler.
    expect(errorHandlerCaught.join('\n')).not.toMatch(/is not registered/);
    // The registry still resolves both rendered types after a full mount.
    expect(() => getChartClass('area')).not.toThrow();
    expect(() => getChartClass('line')).not.toThrow();
    w.unmount();
  });
});
