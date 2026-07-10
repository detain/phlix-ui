import type { ServerListItem } from '../../api/admin/servers';
type __VLS_Props = {
    /** List of servers from `AdminServersApi.listServers()`. */
    servers: ServerListItem[];
    /** The currently selected server id. */
    modelValue: string | null;
    /** Whether the parent is loading the server list. */
    loading?: boolean;
    /** Disable the selector. */
    disabled?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (v: string | null) => any;
    "update:modelValue": (v: string | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((v: string | null) => any) | undefined;
    "onUpdate:modelValue"?: ((v: string | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
