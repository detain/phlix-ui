/**
 * The one pluralisation mechanism for the SPA, backed by `Intl.PluralRules`.
 *
 * Before this module the repo hand-rolled the singular/plural choice inline, in
 * (at least) seven mutually-invisible syntactic shapes — `n === 1 ? 'x' : 'xs'`,
 * `x{{ n !== 1 ? 's' : '' }}` in a template, `` `${n} x${n !== 1 ? 's' : ''}` ``,
 * `n === 1 ? '1 photo' : `${n} photos``, an un-selected `'a | b'` catalogue
 * template, a hardcoded `` `${n} photos` `` with no singular branch at all, and
 * the `photo(s)` parenthetical dodge. Each grep for one shape missed the others,
 * so every count of the inventory came back low. Routing every plural through
 * this module makes the inventory *checkable*: the companion ESLint rule
 * `plural/no-hand-rolled-plural` reports the hand-rolled shapes semantically,
 * from the AST, rather than by pattern-matching source text.
 *
 * **Why `Intl.PluralRules` and not `n === 1`.** `n === 1` is not the singular
 * test in most languages: Russian uses `one` for 21 and 101, `few` for 2–4, and
 * `many` for 0 and 5–20; Welsh distinguishes six categories; Japanese has one.
 * Hardcoding `=== 1` bakes English into every call site, so a consumer supplying
 * `PhlixAppConfig.messages` overrides in another language could never get correct
 * output no matter what strings they provided. `Intl.PluralRules` moves the
 * decision to the runtime's CLDR data, which is the only place that knows.
 *
 * **Locale.** This app has no UI-locale store (verified: nothing in `src/`
 * carries one — dates and numbers all go through `toLocaleString()` with an
 * implicit locale). So `locale` defaults to `undefined`, which makes
 * `Intl.PluralRules` use the host's default locale, matching how the rest of the
 * SPA already formats. Pass `locale` explicitly once a locale store exists.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
/** The six LDML plural categories `Intl.PluralRules` can return, in canonical order. */
export declare const PLURAL_CATEGORIES: readonly ["zero", "one", "two", "few", "many", "other"];
/** One of the six LDML plural categories. */
export type PluralCategory = (typeof PLURAL_CATEGORIES)[number];
/**
 * A set of forms to choose between. `other` is required because every locale has
 * an `other` category, so it is the only form guaranteed to be usable as the
 * fallback when a locale asks for a category the caller did not supply.
 */
export type PluralForms = Partial<Record<PluralCategory, string>> & {
    other: string;
};
/** Options accepted by every function in this module. */
export interface PluralOptions {
    /** BCP-47 tag. Defaults to the host locale (see the module docblock). */
    locale?: string;
    /** `'cardinal'` (1 book / 2 books) or `'ordinal'` (1st / 2nd). Defaults to cardinal. */
    type?: 'cardinal' | 'ordinal';
}
/**
 * The LDML category `count` falls into for the given locale.
 *
 * A non-finite `count` (`NaN`, `Infinity`) cannot be classified — `Intl` throws
 * or reports `other` inconsistently across engines — so it is normalised to
 * `'other'`, which is the form every locale defines.
 */
export declare function pluralCategory(count: number, options?: PluralOptions): PluralCategory;
/**
 * Choose the form matching `count`. This is the core; everything else in this
 * module is a thin wrapper over it.
 *
 * A locale may select a category the caller did not supply (e.g. an English call
 * site providing only `one`/`other` rendered under a Russian locale asking for
 * `few`). That degrades to `other` rather than throwing or rendering an empty
 * string, so a missing translation is merely imprecise, never blank.
 *
 * @example
 * plural(1, { one: 'episode', other: 'episodes' }); // 'episode'
 * plural(3, { one: 'episode', other: 'episodes' }); // 'episodes'
 * plural(0, { one: '', other: 's' });               // 's'  (a bare suffix)
 */
export declare function plural(count: number, forms: PluralForms, options?: PluralOptions): string;
/**
 * Two-form convenience for the overwhelmingly common English case.
 *
 * `other` is required rather than derived by appending `'s'`: English plurals are
 * not a suffix rule (`entry`/`entries`, `person`/`people`), and guessing would
 * reintroduce exactly the hardcoded-morphology assumption this module exists to
 * remove.
 *
 * @example
 * pluralize(2, 'entry', 'entries'); // 'entries'
 * pluralize(1, '', 's');            // ''   (suffix-only call sites)
 */
export declare function pluralize(count: number, one: string, other: string, options?: PluralOptions): string;
/**
 * `count` followed by the matching form — the `` `${n} episodes` `` shape.
 *
 * The number is rendered with `String(count)` by default rather than
 * `toLocaleString()`, because that is what the migrated call sites already
 * rendered and changing digit grouping would be a silent visual change. Pass
 * `formatNumber: true` for grouped output (the one migrated site that already
 * grouped keeps doing so by calling {@link pluralize} directly).
 *
 * @example
 * pluralCount(2, 'episode', 'episodes');            // '2 episodes'
 * pluralCount(1, 'photo', 'photos');                // '1 photo'
 */
export declare function pluralCount(count: number, one: string, other: string, options?: PluralOptions & {
    formatNumber?: boolean;
}): string;
/**
 * Resolve a pipe-separated plural template — the form the message catalogue is
 * authored in, e.g. `'{count} member | {count} members'`.
 *
 * **Slot mapping.** The parts are mapped onto the plural categories the *locale
 * itself* uses, taken from `Intl.PluralRules().resolvedOptions().pluralCategories`
 * and put back into LDML canonical order (the spec does not guarantee the order
 * that array arrives in). For English that is `['one', 'other']`, so a two-part
 * template means singular-then-plural, which is the convention the catalogue was
 * already written to. For Russian it is `['one', 'few', 'many', 'other']`, so a
 * Russian override can supply four parts and have each land on the right rule —
 * which is the whole point of not hardcoding a two-slot split.
 *
 * **Mismatched part counts degrade, never throw.** Too few parts: the last part
 * covers the remaining categories. Too many: the extras are ignored. A template
 * with no `|` is returned as-is, so non-plural messages are unaffected.
 */
export declare function selectPluralTemplate(template: string, count: number, options?: PluralOptions): string;
/**
 * Does `template` use the pipe plural form? Used by the catalogue tests and by
 * the `plural/plural-message-needs-count` lint rule to identify which messages
 * require a `count` parameter.
 */
export declare function isPluralTemplate(template: string): boolean;
