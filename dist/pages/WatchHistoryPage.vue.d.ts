/**
 * WatchHistoryPage — shows the user's watch history grouped by date.
 * Route: /app/history
 * Fetches from GET /api/v1/me/history if available, otherwise falls back to
 * GET /api/v1/me/progress and shows items with progress > 0.
 */
import { type PropType } from 'vue';
import { ApiClient } from '../api/client';
import type { ApiClient as ApiClientType } from '../api/client';
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    /**
     * Optional API client for testing. When provided, this client is used instead of
     * creating a new ApiClient instance. Follows the pattern used by other pages.
     */
    client: {
        type: PropType<ApiClientType>;
        default: null;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Optional API client for testing. When provided, this client is used instead of
     * creating a new ApiClient instance. Follows the pattern used by other pages.
     */
    client: {
        type: PropType<ApiClientType>;
        default: null;
    };
}>> & Readonly<{}>, {
    client: ApiClient;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
