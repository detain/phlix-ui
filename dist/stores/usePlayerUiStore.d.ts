/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
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
export declare const usePlayerUiStore: import("pinia").StoreDefinition<"phlix-player-ui", Pick<{
    theaterActive: import("vue").Ref<boolean, boolean>;
    setTheaterActive: (active: boolean) => void;
    reset: () => void;
}, "theaterActive">, Pick<{
    theaterActive: import("vue").Ref<boolean, boolean>;
    setTheaterActive: (active: boolean) => void;
    reset: () => void;
}, never>, Pick<{
    theaterActive: import("vue").Ref<boolean, boolean>;
    setTheaterActive: (active: boolean) => void;
    reset: () => void;
}, "reset" | "setTheaterActive">>;
