import type { MediaItem } from '../types/media-item';
type __VLS_Props = {
    /** Two-way open state (drives the underlying Modal). */
    modelValue: boolean;
    /** The item being matched. Null is tolerated (modal renders nothing useful). */
    item: MediaItem | null;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: boolean) => any;
    applied: (item: MediaItem) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: boolean) => any) | undefined;
    onApplied?: ((item: MediaItem) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
