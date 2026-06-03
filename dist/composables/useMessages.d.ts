import { type Translate } from '../i18n/messages';
/** Return shape of {@link useMessages}. Destructure `t` to translate. */
export interface UseMessages {
    /** Resolve a `group.key` message to its (optionally overridden) string. */
    t: Translate;
}
/**
 * i18n-readiness composable (R6.5c). Resolves user-facing strings through the
 * English message catalog, overlaid with the consumer's optional
 * `PhlixAppConfig.messages` overrides (injected under `phlixConfig`).
 *
 * SSR-safe and dependency-free: `inject` runs in setup on server and client, the
 * catalog is plain data, and when no config is provided (or `messages` is omitted)
 * every string resolves to its English default — so the UI is byte-for-byte
 * unchanged unless a consumer opts in.
 *
 * Must be called during component `setup()` (like the other `use*` composables).
 *
 * @example
 * const { t } = useMessages();
 * // template: <button>{{ t('common.retry') }}</button>
 * //           <span>{{ t('player.resumeFrom', { time: '4:01' }) }}</span>
 */
export declare function useMessages(): UseMessages;
