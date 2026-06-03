import { onScopeDispose, readonly, ref, type DeepReadonly, type Ref } from 'vue';

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
export function useOnline(): DeepReadonly<Ref<boolean>> {
  const read = (): boolean => (typeof navigator === 'undefined' ? true : navigator.onLine);
  const online = ref(read());
  const update = (): void => {
    online.value = read();
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    onScopeDispose(() => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    });
  }

  return readonly(online);
}
