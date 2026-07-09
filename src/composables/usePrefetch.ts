/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { inject } from 'vue';
import { routerKey, type RouteLocationRaw } from 'vue-router';

/**
 * Prefetch-on-hover helper (R6.1c).
 *
 * Returns `prefetch(to)`, which warms the lazy `() => import()` chunk(s) for a
 * route **without navigating** — call it on `pointerenter`/`focus` of a link so
 * the destination's code is already in the module cache by the time the user
 * clicks (e.g. warming the ~41 kB Player chunk from a poster hover). Pairs with
 * the R6.1a route-level code-splitting.
 *
 * Best-effort and idempotent:
 * - each lazy loader is invoked at most once (deduped by function identity; the
 *   JS module cache makes any repeat cheap anyway);
 * - a route component that is already a static/loaded object is skipped;
 * - `resolve` failures (unknown/invalid target) and import rejections are
 *   swallowed — a prefetch must never throw or block;
 * - it no-ops when no router is installed, so router-agnostic callers
 *   (e.g. `MediaCard` rendered standalone) stay safe.
 *
 * @example
 * const { prefetch } = usePrefetch();
 * // template: <a :href="href" @pointerenter="prefetch(href)" @focusin="prefetch(href)">
 */
export function usePrefetch(): { prefetch: (to: RouteLocationRaw) => void } {
  // `inject` with an explicit `null` default (rather than `useRouter()`) so a
  // router-agnostic caller — e.g. a standalone <MediaCard /> — gets a clean no-op
  // with no dev-time "injection not found" warning.
  const router = inject(routerKey, null);
  // Functions are objects, so a WeakSet keyed on the loader identity warms each
  // distinct chunk loader exactly once across every call of this instance.
  const warmed = new WeakSet<object>();

  function prefetch(to: RouteLocationRaw): void {
    if (!router) return;

    let matched;
    try {
      matched = router.resolve(to).matched;
    } catch {
      return; // unknown name / invalid target — best-effort, never surface
    }

    for (const record of matched) {
      const components = record.components;
      if (!components) continue;
      for (const comp of Object.values(components)) {
        // A lazy route component is a `() => import()` loader (a function); a
        // static or already-resolved component is an object → nothing to warm.
        if (typeof comp !== 'function' || warmed.has(comp)) continue;
        warmed.add(comp);
        try {
          const result = (comp as () => unknown)();
          if (result && typeof (result as Promise<unknown>).then === 'function') {
            (result as Promise<unknown>).catch(() => {
              /* best-effort: a failed prefetch import must not surface */
            });
          }
        } catch {
          /* best-effort: a throwing loader must not surface */
        }
      }
    }
  }

  return { prefetch };
}
