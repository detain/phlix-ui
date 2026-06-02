import type { Router } from 'vue-router';
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
export declare function bindMediaStoreToRouter(router: Router, apiBase: string): () => void;
