/**
 * LayerFocusStack — the shared focus-layer stack behind the trap (AD-9 adopt-leg, W115 S534).
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/**
 * Lane provenance token (AD-9 ui adopt-leg, W115 S534).
 * @internal
 */
export declare const S534_LAYER_FOCUS_TOKEN = "S534LAYERFOCX9P1";
/**
 * LIFO focus memory that rides the layer stack: `push` what held focus BEFORE
 * a layer opened, `pop` it when that layer closes, `clear` on teardown. Pure
 * over an opaque node type `T` — this repo stacks focus keys / DOM openers,
 * the tizen client stacks live `Element`s.
 *
 * Shape-match port, NOT an import: the dependency direction is
 * phlix-tizen-client consuming `@phlix/ui`, so ui cannot import the tizen
 * package (AC2 greps this pin). The identical `push/pop/depth/clear` surface
 * keeps the two implementations convergent; folding them into one shared
 * source is a future `@phlix/ui` pin-batch discussion — documented, never
 * pre-built here. This is pure bookkeeping, not a second spatial-nav engine:
 * it decides nothing about geometry or key handling, it only remembers order.
 *
 * `isTop` (CU-106, review ui__webux #1) is the ONE method added ui-side beyond
 * the four-op shared core: stacked overlays need to know whether a layer is
 * the document's frontmost before routing Escape/Tab to it. The tizen twin
 * (`src/remote/backPolicy.ts`, its own local interface) keeps its four-op
 * surface until its re-pin wave adopts the fifth — the core vocabulary stays
 * the convergence contract, and `isTop` rides no DOM knowledge.
 */
export interface LayerFocusStack<T> {
    push(node: T): void;
    pop(): T | null;
    /** Is `node` the most recently pushed entry (identity comparison)? */
    isTop(node: T): boolean;
    depth(): number;
    clear(): void;
}
export declare function createLayerFocusStack<T>(): LayerFocusStack<T>;
/**
 * The one document-wide focus-layer stack (matches the single-document focus
 * model, like `focusableRegistry`). `useFocusTrap` pushes/pops it through the
 * layer lifecycle; the `useSpatialNav` handle exposes it for TV-host
 * introspection and orphan-recovery teardown. Typed `unknown` so this module
 * never touches the DOM — callers store what they like, compare by identity.
 */
export declare const sharedLayerFocusStack: LayerFocusStack<unknown>;
