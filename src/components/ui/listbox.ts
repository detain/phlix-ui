/** Shared option model + helpers for Select / Combobox (R0.4c). */
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type SelectOptionInput = SelectOption | string | number;

/** Normalize string/number/option inputs to SelectOption[]. */
export function normalizeOptions(input: readonly SelectOptionInput[]): SelectOption[] {
  return input.map((o) =>
    typeof o === 'object' ? o : { value: o, label: String(o) },
  );
}

/** Next selectable index in `dir` (+1/-1), skipping disabled, wrapping. */
export function nextEnabledIndex(options: SelectOption[], from: number, dir: 1 | -1): number {
  const n = options.length;
  if (n === 0) return -1;
  let i = from;
  for (let step = 0; step < n; step++) {
    i = (i + dir + n) % n;
    if (!options[i]?.disabled) return i;
  }
  return from;
}

/** First / last enabled index. */
export function edgeEnabledIndex(options: SelectOption[], edge: 'first' | 'last'): number {
  if (edge === 'first') return nextEnabledIndex(options, -1, 1);
  return nextEnabledIndex(options, 0, -1);
}
