/** Shared option model + helpers for Select / Combobox (R0.4c).
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
export type SelectOptionInput = SelectOption | string | number;
/** Normalize string/number/option inputs to SelectOption[]. */
export declare function normalizeOptions(input: readonly SelectOptionInput[]): SelectOption[];
/** Next selectable index in `dir` (+1/-1), skipping disabled, wrapping. */
export declare function nextEnabledIndex(options: SelectOption[], from: number, dir: 1 | -1): number;
/** First / last enabled index. */
export declare function edgeEnabledIndex(options: SelectOption[], edge: 'first' | 'last'): number;
