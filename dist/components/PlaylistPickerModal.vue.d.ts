import { type ApiClient as ApiClientType } from '../api/client';
/** The minimum an item must carry to be addable (structurally satisfied by
 *  both the list shape MediaCard holds and the detail shape MediaDetail holds). */
export interface PlaylistPickTarget {
    id: string;
    name: string;
    /** Present on every wire item since server c42e166a (shape() whitelist). */
    library_id?: string | null;
}
type __VLS_Props = {
    modelValue: boolean;
    /** The media item to land in a playlist; null keeps the modal inert. */
    item: PlaylistPickTarget | null;
    /** Test seam — same `client` prop pattern the pages use. */
    client?: ApiClientType | null;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
