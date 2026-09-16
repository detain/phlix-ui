/**
 * The one debounce mechanism for `@phlix/ui`.
 *
 * **Why this module exists (S519 / AD-16).** Before S519 every debounced control
 * in the SPA hand-rolled the same three lines inline — `SearchPage.vue`,
 * `FilterBar.vue`, the media/preferences stores and the URL-sync composable each
 * kept their own `let timer` and `clearTimeout`/`setTimeout` pair, so the timing
 * discipline was mutually invisible and easy to get subtly wrong (a control that
 * forgot to clear on unmount, or that let a stale keystroke fire after a newer
 * one). `RequestsPage.vue` is the hub media-requests portal the survey-d AD-16
 * note says "needs the real search surface located in `@phlix/ui` first" — this
 * module is the shared primitive that surface now builds its 400–600 ms search
 * debounce on.
 *
 * **One timer source, discard superseded fires (the "no flicker" contract).**
 * A debounced function owns exactly one pending timer. Every call clears any
 * in-flight timer before arming a new one, so a burst of calls collapses to a
 * single trailing invocation of the *latest* arguments — earlier, already
 * superseded calls are dropped rather than queued. That is the AD-16
 * "one promise source, discard late arrivals — no boolean soup/flicker" rule
 * expressed for the synchronous-filter case this page uses: the recomputation
 * runs once, after the keystrokes settle, never once per character.
 *
 * **`ms` is a plain number by design.** The module does not clamp or default it;
 * the caller owns the policy (e.g. {@link REQUEST_SEARCH_DEBOUNCE_MS} below for
 * the requests surface). `ms = 0` is legal (a coalescing microtask-ish deferral to
 * the next macrotask), and a negative `ms` is passed straight to `setTimeout`,
 * which the platform treats as `0`. Guarding those here would hide a caller bug
 * behind a silent correction.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

/** The trailing function returned by {@link debounce}, with its control handles. */
export interface Debounced<A extends unknown[]> {
  /** Invoke with the latest arguments; resets the pending timer (supersedes any in-flight fire). */
  (...args: A): void;
  /** Cancel a pending fire without invoking. Safe to call when nothing is pending. */
  cancel(): void;
  /** Fire now with the last-supplied arguments (if a fire is pending), then clear. */
  flush(): void;
  /** True while a trailing invocation is still pending. */
  readonly pending: boolean;
}

/**
 * Wrap `fn` so rapid calls collapse into one trailing call, `ms` after the last.
 *
 * @param fn the function to debounce (its return value is ignored — debouncing is
 *   for side-effecting work like re-filtering or re-issuing a request).
 * @param ms idle window before `fn` fires; caller-owned (see module docblock).
 */
export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number): Debounced<A> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: A | undefined;

  function invoke(): void {
    timer = undefined;
    const args = lastArgs;
    lastArgs = undefined;
    if (args !== undefined) fn(...args);
  }

  const debounced = function debouncedFn(...args: A): void {
    lastArgs = args;
    // One timer source: a call in flight is superseded, never queued behind it.
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(invoke, ms);
  } as Debounced<A>;

  debounced.cancel = (): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
    lastArgs = undefined;
  };

  debounced.flush = (): void => {
    if (timer === undefined) return;
    clearTimeout(timer);
    invoke();
  };

  Object.defineProperty(debounced, 'pending', {
    get: () => timer !== undefined,
    enumerable: true,
  });

  return debounced;
}

/**
 * AD-16 search window for the requests portal: the midpoint of the specified
 * 400–600 ms band. Exported (rather than a bare literal at the call site) so the
 * page and its test pin the exact value and cannot drift apart.
 */
export const REQUEST_SEARCH_DEBOUNCE_MS = 500;

/** W111 S519 survival sentinel — code line (not prose) so it survives the merge-gate
 *  comment-strip defense; must stay in this one file (see the plan step). */
export const S519_REQUESTS_SEARCH_TOKEN = 'S519SEARCHX9P7';
