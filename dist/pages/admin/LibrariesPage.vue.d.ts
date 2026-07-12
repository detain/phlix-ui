import { ApiClient } from '../../api/client';
type __VLS_Props = {
    /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
    client?: ApiClient;
    /** Polling period for scan-status; small values for tests. */
    pollIntervalMs?: number;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
