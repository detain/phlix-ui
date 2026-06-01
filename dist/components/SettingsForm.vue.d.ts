import type { ServerSettings, SettingGroup } from '../types/server-settings';
type __VLS_Props = {
    groups?: SettingGroup[];
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    saved: (settings: ServerSettings) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSaved?: ((settings: ServerSettings) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
