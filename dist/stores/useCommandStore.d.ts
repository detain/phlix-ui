/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import type { IconName } from '../components/Icon.vue';
/**
 * A single command surfaced in the ⌘K palette. `run` is invoked when the command
 * is chosen; everything else is presentation / matching metadata.
 */
export interface Command {
    /** Stable unique id (used for dedupe + recents). */
    id: string;
    /** Primary label shown in the palette. */
    title: string;
    /** Optional secondary line (e.g. a hint or current value). */
    subtitle?: string;
    /** Icon name from the @phlix/ui registry. */
    icon?: IconName;
    /** Section header the command groups under (default "Commands"). */
    group?: string;
    /** Extra terms to fuzzy-match against (synonyms, related words). */
    keywords?: string[];
    /** Keyboard-shortcut hint to render (e.g. ['⌘', 'K']). Display only. */
    shortcut?: string[];
    /** Lower sorts earlier among equal fuzzy scores / ungrouped lists. */
    priority?: number;
    /** Executed when the command is chosen. */
    run: () => void | Promise<void>;
}
/**
 * Fuzzy subsequence score of `query` against `text` (case-insensitive).
 * Returns a non-negative score (higher = better) or -1 when `query` is not a
 * subsequence of `text`. Rewards consecutive runs, word-boundary starts and
 * whole-prefix matches; penalises skipped gaps. An empty query scores 0 (neutral).
 */
export declare function fuzzyScore(query: string, text: string): number;
/**
 * Best fuzzy score of `query` across a command's title/keywords/group. Title
 * matches get a small boost so they outrank an equal keyword match. Empty query
 * scores 0 (every command matches).
 */
export declare function matchCommand(query: string, cmd: Command): number;
/**
 * useCommandStore (R1.4) — backs the ⌘K command palette. A pure registry +
 * palette state + recents list; all live wiring (router/prefs, ⌘K listener, the
 * overlay UI) lives in `CommandPalette.vue`. `results` is the fuzzy-ranked,
 * recents-first view the palette renders.
 */
export declare const useCommandStore: import("pinia").StoreDefinition<"phlix-commands", Pick<{
    registry: import("vue").Ref<Map<string, {
        id: string;
        title: string;
        subtitle?: string | undefined;
        icon?: IconName | undefined;
        group?: string | undefined;
        keywords?: string[] | undefined;
        shortcut?: string[] | undefined;
        priority?: number | undefined;
        run: () => void | Promise<void>;
    }> & Omit<Map<string, Command>, keyof Map<any, any>>, Map<string, Command> | (Map<string, {
        id: string;
        title: string;
        subtitle?: string | undefined;
        icon?: IconName | undefined;
        group?: string | undefined;
        keywords?: string[] | undefined;
        shortcut?: string[] | undefined;
        priority?: number | undefined;
        run: () => void | Promise<void>;
    }> & Omit<Map<string, Command>, keyof Map<any, any>>)>;
    open: import("vue").Ref<boolean, boolean>;
    query: import("vue").Ref<string, string>;
    recentIds: import("vue").Ref<string[], string[]>;
    all: import("vue").ComputedRef<Command[]>;
    results: import("vue").ComputedRef<Command[]>;
    register: (cmd: Command | Command[]) => () => void;
    unregister: (id: string | string[]) => void;
    isRecent: (id: string) => boolean;
    pushRecent: (id: string) => void;
    clearRecents: () => void;
    setQuery: (v: string) => void;
    openPalette: () => void;
    closePalette: () => void;
    togglePalette: () => void;
    runId: (id: string) => Promise<void>;
}, "query" | "registry" | "open" | "recentIds">, Pick<{
    registry: import("vue").Ref<Map<string, {
        id: string;
        title: string;
        subtitle?: string | undefined;
        icon?: IconName | undefined;
        group?: string | undefined;
        keywords?: string[] | undefined;
        shortcut?: string[] | undefined;
        priority?: number | undefined;
        run: () => void | Promise<void>;
    }> & Omit<Map<string, Command>, keyof Map<any, any>>, Map<string, Command> | (Map<string, {
        id: string;
        title: string;
        subtitle?: string | undefined;
        icon?: IconName | undefined;
        group?: string | undefined;
        keywords?: string[] | undefined;
        shortcut?: string[] | undefined;
        priority?: number | undefined;
        run: () => void | Promise<void>;
    }> & Omit<Map<string, Command>, keyof Map<any, any>>)>;
    open: import("vue").Ref<boolean, boolean>;
    query: import("vue").Ref<string, string>;
    recentIds: import("vue").Ref<string[], string[]>;
    all: import("vue").ComputedRef<Command[]>;
    results: import("vue").ComputedRef<Command[]>;
    register: (cmd: Command | Command[]) => () => void;
    unregister: (id: string | string[]) => void;
    isRecent: (id: string) => boolean;
    pushRecent: (id: string) => void;
    clearRecents: () => void;
    setQuery: (v: string) => void;
    openPalette: () => void;
    closePalette: () => void;
    togglePalette: () => void;
    runId: (id: string) => Promise<void>;
}, "all" | "results">, Pick<{
    registry: import("vue").Ref<Map<string, {
        id: string;
        title: string;
        subtitle?: string | undefined;
        icon?: IconName | undefined;
        group?: string | undefined;
        keywords?: string[] | undefined;
        shortcut?: string[] | undefined;
        priority?: number | undefined;
        run: () => void | Promise<void>;
    }> & Omit<Map<string, Command>, keyof Map<any, any>>, Map<string, Command> | (Map<string, {
        id: string;
        title: string;
        subtitle?: string | undefined;
        icon?: IconName | undefined;
        group?: string | undefined;
        keywords?: string[] | undefined;
        shortcut?: string[] | undefined;
        priority?: number | undefined;
        run: () => void | Promise<void>;
    }> & Omit<Map<string, Command>, keyof Map<any, any>>)>;
    open: import("vue").Ref<boolean, boolean>;
    query: import("vue").Ref<string, string>;
    recentIds: import("vue").Ref<string[], string[]>;
    all: import("vue").ComputedRef<Command[]>;
    results: import("vue").ComputedRef<Command[]>;
    register: (cmd: Command | Command[]) => () => void;
    unregister: (id: string | string[]) => void;
    isRecent: (id: string) => boolean;
    pushRecent: (id: string) => void;
    clearRecents: () => void;
    setQuery: (v: string) => void;
    openPalette: () => void;
    closePalette: () => void;
    togglePalette: () => void;
    runId: (id: string) => Promise<void>;
}, "register" | "unregister" | "isRecent" | "pushRecent" | "clearRecents" | "setQuery" | "openPalette" | "closePalette" | "togglePalette" | "runId">>;
