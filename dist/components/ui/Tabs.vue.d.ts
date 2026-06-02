import { type IconName } from '../Icon.vue';
export interface TabItem {
    value: string;
    label: string;
    icon?: IconName;
    disabled?: boolean;
}
type __VLS_Props = {
    modelValue: string;
    tabs: readonly TabItem[];
    label?: string;
};
declare var __VLS_7: string, __VLS_8: {}, __VLS_10: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_7>]?: (props: typeof __VLS_8) => any;
} & {
    default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
