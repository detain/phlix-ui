import { type SelectOptionInput } from './listbox';
type __VLS_Props = {
    modelValue: string | number | null;
    options: readonly SelectOptionInput[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (v: string | number) => any;
    "update:modelValue": (v: string | number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((v: string | number) => any) | undefined;
    "onUpdate:modelValue"?: ((v: string | number) => any) | undefined;
}>, {
    placeholder: string;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
