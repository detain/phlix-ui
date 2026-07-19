import { ApiClient } from '../api/client';
type __VLS_Props = {
    /** The opaque invite token from the URL (may contain `/` — captured via `:token(.*)`). */
    token: string;
    /** Inject an API client for tests; defaults to the shared `api` singleton. */
    client?: ApiClient;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
