/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * usePlayerUiStore (S34) — a tiny shared UI-state store that surfaces the
 * in-window player's "theater" state up to the app shell.
 *
 * The theater toggle lives inside <Player> as a local ref and is emitted up via
 * `@theater` to <PlayerPage>, which mirrors it here. <PhlixApp> reads
 * `theaterActive` to gate the shell's chrome-removal (`shell--flush`) on the SAME
 * trigger as the player's 100dvh growth — so entering theater removes the shell
 * header + zeroes the gutter AND fills the viewport together, while the default
 * (non-theater) player view keeps its header + 16:9/90vh look.
 *
 * `@theater` remains the single source of truth for "theater active"; this store
 * is just the shared channel that carries that existing signal to the shell. It is
 * reset to false when the player page unmounts (leaving the route) so a later
 * non-theater visit can never inherit a stale `true` and flush the shell.
 */
export const usePlayerUiStore = defineStore('phlix-player-ui', () => {
  /** Whether the in-window player is currently in theater mode. */
  const theaterActive = ref(false);

  /** Mirror the player's `@theater` toggle state into the shared channel. */
  function setTheaterActive(active: boolean): void {
    theaterActive.value = active;
  }

  /** Clear the theater state — called when the player page unmounts / leaves the
   *  route so a stale `true` can't flush the shell on a later non-theater visit. */
  function reset(): void {
    theaterActive.value = false;
  }

  return { theaterActive, setTheaterActive, reset };
});
