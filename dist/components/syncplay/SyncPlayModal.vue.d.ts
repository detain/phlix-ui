import type { SyncPlayRoom } from '../../types/syncplay';
type __VLS_Props = {
    modelValue: boolean;
    /** Optional override; falls back to useMediaApiBase(). */
    apiBase?: string;
    /** Optional room ID to pre-fill (e.g., from a join-link ?room= query param). */
    prefilledRoomId?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (v: boolean) => any;
    joined: (room: SyncPlayRoom) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((v: boolean) => any) | undefined;
    onJoined?: ((room: SyncPlayRoom) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
