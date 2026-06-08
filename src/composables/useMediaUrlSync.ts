import { watch } from 'vue';
import type { Router } from 'vue-router';
import { useMediaStore } from '../stores/useMediaStore';

/**
 * bindMediaStoreToRouter (R1.2) — two-way sync between useMediaStore filters and
 * the URL query, so filtered views are shareable/bookmarkable and back/forward
 * restores them. Call once from the browse page setup.
 *
 *   bindMediaStoreToRouter(useRouter(), apiBase);
 *
 * Filter changes → router.replace (debounced refetch); route changes (back/
 * forward, deep link) → applyQuery + fetch. A guard flag prevents feedback loops.
 */
export function bindMediaStoreToRouter(router: Router, apiBase: string): () => void {
    const store = useMediaStore();
    let syncing = false;

    // A URL-synced flat grid is never library-scoped — clear any lingering scope
    // from a prior LibraryPage so this consumer of the shared singleton starts
    // unscoped (defense-in-depth; LibraryPage also clears on unmount).
    store.setLibraryId(undefined);

    // initial: hydrate from the URL, then load
    store.applyQuery(router.currentRoute.value.query as Record<string, string | string[]>);
    store.fetchMedia(apiBase);

    const stopFilters = watch(
        () => JSON.stringify(store.toQuery()),
        () => {
            if (syncing) return;
            syncing = true;
            router.replace({ query: store.toQuery() }).finally(() => {
                syncing = false;
            });
            store.scheduleFetch(apiBase);
        },
    );

    const stopRoute = watch(
        () => router.currentRoute.value.query,
        (q) => {
            if (syncing) return;
            const next = JSON.stringify(q);
            if (next === JSON.stringify(store.toQuery())) return;
            syncing = true;
            store.applyQuery(q as Record<string, string | string[]>);
            syncing = false;
            store.fetchMedia(apiBase);
        },
    );

    return () => {
        stopFilters();
        stopRoute();
        store.cancelScheduled();
    };
}
