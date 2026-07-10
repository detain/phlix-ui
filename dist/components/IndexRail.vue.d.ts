import type { IndexBucket } from '../api/index-buckets';
type __VLS_Props = {
    buckets: IndexBucket[];
    cssPrefix?: string;
    navLabel?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    jump: (offset: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onJump?: ((offset: number) => any) | undefined;
}>, {
    cssPrefix: string;
    navLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
