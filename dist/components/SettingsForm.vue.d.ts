import type { ServerSettings, SettingGroup } from '../types/server-settings';
type __VLS_Props = {
    groups?: SettingGroup[];
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    saved: (settings: ServerSettings) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSaved?: ((settings: ServerSettings) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
