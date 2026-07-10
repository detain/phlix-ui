/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { type DeepReadonly, type Ref } from 'vue';
/**
 * Reactive `navigator.onLine` (R5.3a). SSR-safe — defaults to online when
 * `navigator` is unavailable. Attaches window `online`/`offline` listeners for
 * the lifetime of the owning reactive scope (component setup or `effectScope`)
 * and detaches them on dispose. Foundation for offline-aware empty/error states.
 *
 * @example
 * const online = useOnline();
 * // template: <OfflineBanner v-if="!online" />
 */
export declare function useOnline(): DeepReadonly<Ref<boolean>>;
