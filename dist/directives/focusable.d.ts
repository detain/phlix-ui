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
export declare const focusableRegistry: Set<HTMLElement>;
export declare const focusable: Directive<HTMLElement, FocusableOptions | undefined>;
/** Register the directive as `v-focusable` (createPhlixApp calls this). */
export declare function installFocusable(app: App): void;
