import { ApiClient } from '../../api/client';
type __VLS_Props = {
    /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
    client?: ApiClient;
    /** Delay between "is the server back?" polls after a restart (ms). */
    restartPollIntervalMs?: number;
    /** Total budget to wait for the server to come back after a restart (ms). */
    restartPollTimeoutMs?: number;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    client: ApiClient;
    restartPollIntervalMs: number;
    restartPollTimeoutMs: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
