import { ApiClient } from '../../api/client';
import { type SubtitleTrack } from './transcode';
type __VLS_Props = {
    /** Modal open state (v-model:open). */
    open?: boolean;
    /** Media item id the subtitles are searched/downloaded for. */
    mediaId: string;
    /** API base for the subtitle endpoints (same as the Player's transcode base). */
    apiBase?: string;
    /** BCP-47 codes to pre-select in the language picker (preferred + UI + 'en'). */
    preferredLangs?: string[];
    /** Injected client for tests; when omitted a client is built from `apiBase`. */
    client?: ApiClient;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:open": (v: boolean) => any;
    added: (track: SubtitleTrack) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:open"?: ((v: boolean) => any) | undefined;
    onAdded?: ((track: SubtitleTrack) => any) | undefined;
}>, {
    open: boolean;
    apiBase: string;
    client: ApiClient;
    preferredLangs: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
