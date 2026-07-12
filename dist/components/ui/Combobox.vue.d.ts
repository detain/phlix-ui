import { type SelectOptionInput } from './listbox';
type __VLS_Props = {
    modelValue: string | number | null;
    options: readonly SelectOptionInput[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (v: string | number | null) => any;
    "update:modelValue": (v: string | number | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((v: string | number | null) => any) | undefined;
    "onUpdate:modelValue"?: ((v: string | number | null) => any) | undefined;
}>, {
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
