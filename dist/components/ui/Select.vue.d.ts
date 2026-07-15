import { type SelectOptionInput } from './listbox';
type __VLS_Props = {
    modelValue: string | number | null;
    options: readonly SelectOptionInput[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    /**
     * Visual tone. `default` uses the app surface tokens (opaque light surfaces).
     * `glass` (opt-in) overrides the surface/text/border tokens for a translucent
     * dark, white-text treatment that matches the transparent player chrome — used
     * by the in-player menus (SpeedMenu / QualityMenu / CaptionsMenu). The variant
     * is class-only (a scoped `is-glass` modifier) so `Select` is unchanged
     * everywhere else it's used.
     */
    tone?: 'default' | 'glass';
};
/** Toggle the dropdown open/closed — exposed for programmatic control (e.g. QualityMenu Q-key). */
declare function toggleMenu(): void;
type __VLS_ModelProps = {
    /** Optional external open control — lets a parent (e.g. QualityMenu) open the list programmatically via v-open. */
    'open'?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {
    toggleMenu: typeof toggleMenu;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (value: boolean) => any;
} & {
    change: (v: string | number) => any;
    "update:modelValue": (v: string | number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onChange?: ((v: string | number) => any) | undefined;
    "onUpdate:modelValue"?: ((v: string | number) => any) | undefined;
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    tone: "default" | "glass";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
