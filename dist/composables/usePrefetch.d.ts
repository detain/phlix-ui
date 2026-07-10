/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type RouteLocationRaw } from 'vue-router';
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
export declare function usePrefetch(): {
    prefetch: (to: RouteLocationRaw) => void;
};
