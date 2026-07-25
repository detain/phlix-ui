type __VLS_Props = {
    /** Offset of the page currently displayed. */
    offset: number;
    /** Page size actually applied by the server. */
    limit: number;
    /** TRUE total row count for the (possibly filtered) listing. */
    total: number;
    /**
     * Name of the LISTING this pages — e.g. `"Artists"`. The `<nav>` landmark is
     * named `"{label} pagination"` (`music.paginationOf`), so it does not announce
     * itself identically to the grid it sits under; omit it and the landmark falls
     * back to `music.pagination`.
     */
    label?: string;
    /**
     * `id` of the element this pager drives, for `aria-controls` on the page-jump
     * `<select>` — so an AT user can tell that changing it replaces that grid.
     */
    controls?: string;
    /** Disable every control (while a page is in flight). */
    disabled?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    go: (offset: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onGo?: ((offset: number) => any) | undefined;
}>, {
    label: string;
    disabled: boolean;
    controls: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
