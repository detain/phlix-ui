/** Chapter marker for display in the list. */
export interface ChapterDisplay {
    /** Chapter start, in seconds. */
    start: number;
    /** Chapter end, in seconds (used to compute duration). */
    end?: number;
    /** Chapter title (absent = "Chapter N"). */
    title?: string | null;
}
type __VLS_Props = {
    /** All chapters for the current media. */
    chapters?: ChapterDisplay[];
    /** Popover open state (v-model:open). */
    open?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    seek: (seconds: number) => any;
    "update:open": (v: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSeek?: ((seconds: number) => any) | undefined;
    "onUpdate:open"?: ((v: boolean) => any) | undefined;
}>, {
    open: boolean;
    chapters: ChapterDisplay[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
