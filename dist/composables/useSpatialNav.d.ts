import { type MaybeRefOrGetter } from 'vue';
import { type Dir } from './spatial-nav';
export interface SpatialNavOptions {
    /** Gate — the engine is a NO-OP (no listener side effects) while falsy. DEFAULT false. */
    enabled?: MaybeRefOrGetter<boolean>;
    /** Key → direction map; defaults to the four Arrow keys (D-pad maps to these). */
    keymap?: Partial<Record<Dir, string[]>>;
    /** Called when there is no candidate in `dir` (host can scroll/page). */
    onEdge?: (dir: Dir) => void;
}
export interface SpatialNavHandle {
    /** Focus an element (or the first match of a selector). No-op if absent. */
    focus(el: HTMLElement | string | null): void;
    /** Move focus in `dir`; returns true when focus moved. */
    move(dir: Dir): boolean;
    /** Focus the first registry element (by `data-focus-order` then DOM order). */
    focusFirst(): void;
    registry: ReadonlySet<HTMLElement>;
}
/**
 * useSpatialNav — TV/remote D-pad spatial focus engine (impure wiring around the
 * pure geometry in `./spatial-nav`).
 *
 * Strictly opt-in: the keydown listener is attached once on mount but gates on
 * `toValue(enabled)` (DEFAULT false) on every event, so on desktop it is a no-op
 * and never calls `preventDefault`. It also yields to text-entry targets, to
 * modifier chords (Ctrl/Meta/Alt) and to an active modal focus-trap
 * (`[data-focus-trap]`), and never prevents default on a miss — so page scroll
 * and the player's own Arrow shortcuts keep working.
 */
export declare function useSpatialNav(opts?: SpatialNavOptions): SpatialNavHandle;
