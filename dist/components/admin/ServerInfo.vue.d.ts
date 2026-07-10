import type { ServerInfo } from '../../api/admin/servers';
type __VLS_Props = {
    /** Pre-loaded server info (avoids a fetch when the parent already has it). */
    serverInfo?: ServerInfo | null;
    /** Whether the parent is loading server info. */
    loading?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
