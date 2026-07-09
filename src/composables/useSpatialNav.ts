/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { onMounted, onBeforeUnmount, toValue, type MaybeRefOrGetter } from 'vue';
import { bestCandidate, type Candidate, type Dir, type Rect } from './spatial-nav';
import { focusableRegistry } from '../directives/focusable';
import { isTypingTarget } from '../components/player/shortcuts';

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

const DEFAULT_KEYMAP: Record<Dir, string[]> = {
  up: ['ArrowUp'],
  down: ['ArrowDown'],
  left: ['ArrowLeft'],
  right: ['ArrowRight'],
};

function toRect(r: DOMRect): Rect {
  return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
}

function isZeroSize(r: DOMRect): boolean {
  return r.width <= 0 && r.height <= 0;
}

/** Order: explicit `data-focus-order` (asc) wins, then current registry/DOM order. */
function orderedRegistry(): HTMLElement[] {
  const els = Array.from(focusableRegistry);
  // A missing `data-focus-order` sorts last (Infinity) — NOT 0. `getAttribute`
  // returns null when absent and `Number(null) === 0`, so parse explicitly.
  const orderOf = (el: HTMLElement): number => {
    const raw = el.getAttribute('data-focus-order');
    if (raw === null || raw === '') return Infinity;
    const n = Number(raw);
    return Number.isFinite(n) ? n : Infinity;
  };
  return els
    .map((el, i) => ({ el, i, order: orderOf(el) }))
    .sort((a, b) => a.order - b.order || a.i - b.i)
    .map((x) => x.el);
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
export function useSpatialNav(opts: SpatialNavOptions = {}): SpatialNavHandle {
  const keymap = { ...DEFAULT_KEYMAP, ...opts.keymap };

  function liveCandidates(): { candidates: Candidate[]; byId: Map<string, HTMLElement> } {
    const candidates: Candidate[] = [];
    const byId = new Map<string, HTMLElement>();
    let i = 0;
    for (const el of focusableRegistry) {
      const r = el.getBoundingClientRect();
      if (isZeroSize(r)) continue;
      const id = String(i++);
      candidates.push({ id, rect: toRect(r) });
      byId.set(id, el);
    }
    return { candidates, byId };
  }

  function originRect(byId: Map<string, HTMLElement>, candidates: Candidate[]): Rect | null {
    const active = typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;
    if (active && focusableRegistry.has(active)) {
      const r = active.getBoundingClientRect();
      if (!isZeroSize(r)) return toRect(r);
    }
    // Fall back to the first live candidate.
    const first = candidates[0];
    if (first && byId.has(first.id)) return first.rect;
    return null;
  }

  function move(dir: Dir): boolean {
    const { candidates, byId } = liveCandidates();
    if (candidates.length === 0) {
      opts.onEdge?.(dir);
      return false;
    }
    const origin = originRect(byId, candidates);
    if (!origin) {
      opts.onEdge?.(dir);
      return false;
    }
    // Exclude the origin element itself (it shares its own rect) by removing the
    // active element's candidate, so we never "move" onto ourselves.
    const active = typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null;
    const pool = active
      ? candidates.filter((c) => byId.get(c.id) !== active)
      : candidates;

    const winner = bestCandidate(origin, dir, pool);
    if (winner) {
      byId.get(winner.id)?.focus();
      return true;
    }
    opts.onEdge?.(dir);
    return false;
  }

  function dirForKey(key: string): Dir | null {
    for (const d of ['up', 'down', 'left', 'right'] as Dir[]) {
      if (keymap[d]?.includes(key)) return d;
    }
    return null;
  }

  function onKeydown(e: KeyboardEvent): void {
    if (!toValue(opts.enabled ?? false)) return; // gate every event — reactive toggle, no remount
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTypingTarget(e.target)) return;
    // Yield to an active modal focus-trap so Tab-trapping/arrow widgets inside win.
    const active = document.activeElement as Element | null;
    if (active?.closest('[data-focus-trap]')) return;
    if ((e.target as Element | null)?.closest?.('[data-focus-trap]')) return;

    const dir = dirForKey(e.key);
    if (!dir) return;
    if (move(dir)) e.preventDefault(); // miss → leave default (page scroll / player shortcuts)
  }

  function focus(target: HTMLElement | string | null): void {
    if (!target) return;
    if (typeof target === 'string') {
      if (typeof document === 'undefined') return;
      document.querySelector<HTMLElement>(target)?.focus();
      return;
    }
    target.focus();
  }

  function focusFirst(): void {
    orderedRegistry()[0]?.focus();
  }

  onMounted(() => {
    if (typeof document !== 'undefined') document.addEventListener('keydown', onKeydown);
  });
  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown);
  });

  return { focus, move, focusFirst, registry: focusableRegistry };
}
