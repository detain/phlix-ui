type __VLS_Props = {
    modelValue: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    id?: string;
    name?: string;
    placeholder?: string;
    autocomplete?: string;
    inputmode?: 'text' | 'email' | 'numeric' | 'tel' | 'url' | 'none';
    /** Inline validation message; when set the field renders invalid + describes the input. */
    error?: string | null;
    required?: boolean;
    minlength?: number;
    disabled?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: string) => any) | undefined;
}>, {
    error: string | null;
    type: "text" | "email" | "password";
    required: boolean;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
