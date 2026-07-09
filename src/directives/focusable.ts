/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import type { Directive, App } from 'vue';

/**
 * `v-focusable` — marks an element as a spatial-navigation target for the
 * TV/remote D-pad engine (`useSpatialNav`). Opt-in and inert on desktop: it only
 * tags the element + tracks it in a module-level registry; nothing reacts to the
 * registry unless an enabled `useSpatialNav` is mounted.
 */
export interface FocusableOptions {
  /** When true the element is tagged but excluded from the live registry. */
  disabled?: boolean;
  /** Optional logical group name (stashed as a data-attr; reserved for grouping). */
  group?: string;
  /** Optional explicit order within DOM/group (used by `focusFirst`). */
  order?: number;
}

/**
 * The live set of mounted, non-disabled focusable elements. The spatial-nav
 * engine reads this each `move()` and derives geometry via `getBoundingClientRect`.
 * Module-level by design — one registry shared across the app (matches the
 * single-document focus model).
 */
export const focusableRegistry: Set<HTMLElement> = new Set();

function apply(el: HTMLElement, opts: FocusableOptions | undefined): void {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.setAttribute('data-focusable', '');
  if (opts?.group != null) el.setAttribute('data-focus-group', String(opts.group));
  else el.removeAttribute('data-focus-group');
  if (opts?.order != null) el.setAttribute('data-focus-order', String(opts.order));
  else el.removeAttribute('data-focus-order');

  if (opts?.disabled) focusableRegistry.delete(el);
  else focusableRegistry.add(el);
}

export const focusable: Directive<HTMLElement, FocusableOptions | undefined> = {
  mounted(el, binding) {
    apply(el, binding.value);
  },
  updated(el, binding) {
    apply(el, binding.value);
  },
  unmounted(el) {
    focusableRegistry.delete(el);
  },
};

/** Register the directive as `v-focusable` (createPhlixApp calls this). */
export function installFocusable(app: App): void {
  app.directive('focusable', focusable);
}
