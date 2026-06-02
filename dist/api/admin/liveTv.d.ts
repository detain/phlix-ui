import type { ApiClient } from '../client';
/**
 * Shape of a TV tuner device (HDHomeRun, IPTV, etc.).
 */
export interface Tuner {
    id?: string | number;
    tuner_id: string;
    type: string;
    name: string;
    host: string;
    port: number;
    device_id?: string;
    enabled: boolean | number;
    last_seen?: string;
    status?: string;
    capabilities?: string[];
    discovered_at?: string;
}
/** Shape of a TV channel. */
export interface Channel {
    id: string;
    tuner_id?: string;
    name: string;
    number: string;
    callsign?: string;
    transport?: string;
    frequency?: number;
    modulation?: string;
    enabled: boolean | number;
    created_at?: string;
}
/** Shape of a programme in the TV guide / EPG. */
export interface Program {
    id: string;
    channel_id?: string;
    title: string;
    description?: string;
    start_time: number;
    end_time: number;
    season?: number;
    episode?: number;
    year?: number;
    rating?: string;
    poster?: string;
}
/** Shape of a DVR recording. */
export interface Recording {
    id: string;
    channel_id: string;
    channel_name?: string;
    program_title?: string;
    start_time: number;
    end_time: number;
    status?: string;
    file_path?: string;
    size?: number;
    series_rule_id?: string;
}
/** Shape of an auto-DVR series rule. */
export interface SeriesRule {
    id: string;
    title_pattern: string;
    channel_id?: string;
    keep_until?: string;
    priority?: number;
    enabled: boolean | number;
    created_at?: string;
}
/** Body accepted by {@link AdminLiveTvApi.updateTuner}. */
export interface TunerUpdate {
    name?: string;
    enabled?: boolean;
}
/** Optional query params for {@link AdminLiveTvApi.listGuide}. */
export interface GuideParams {
    channel_id?: string;
    /** Unix timestamp (seconds). */
    from?: number;
    /** Unix timestamp (seconds). */
    to?: number;
}
/** Body accepted by {@link AdminLiveTvApi.createRecording}. */
export interface CreateRecordingInput {
    channel_id: string;
    start_time: number;
    end_time: number;
    title?: string;
    program_id?: string;
    priority?: number;
}
/** Body accepted by {@link AdminLiveTvApi.createSeriesRule}. */
export interface CreateSeriesRuleInput {
    series_id: string;
    channel_id: string;
    title?: string;
    priority?: number;
    pre_padding_seconds?: number;
    post_padding_seconds?: number;
    max_recordings?: number;
    days_ahead?: number;
    keep_until?: string;
}
/**
 * AdminLiveTvApi (RA.11) — typed wrapper over the admin Live TV / DVR endpoints
 * (`/api/v1/admin/livetv/*`), ported 1:1 from the deleted React `LiveTvApi`.
 * Covers tuner discovery/CRUD, channels, EPG/guide listing + refresh, DVR
 * recordings CRUD + upcoming/by-series queries, and auto-DVR series rules.
 *
 * Every method maps 1:1 to a React `LiveTvApi` method — same endpoint paths,
 * verbs, request bodies and query params. List unwraps are guarded with
 * `Array.isArray(...)` so a malformed payload degrades to `[]` rather than
 * throwing (a strict improvement over the React source); non-2xx responses
 * surface `ApiError` via the shared client.
 */
export declare class AdminLiveTvApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/livetv/tuners` → unwraps `{ tuners }`. */
    listTuners(): Promise<Tuner[]>;
    /** `GET /api/v1/admin/livetv/tuners/{id}` → unwraps `{ tuner }`. */
    getTuner(id: string): Promise<Tuner>;
    /** `POST /api/v1/admin/livetv/tuners/scan` → discover tuners, unwraps `{ tuners }`. */
    scanTuners(): Promise<Tuner[]>;
    /** `PUT /api/v1/admin/livetv/tuners/{id}` → update name / enabled, unwraps `{ tuner }`. */
    updateTuner(id: string, data: TunerUpdate): Promise<Tuner>;
    /** `DELETE /api/v1/admin/livetv/tuners/{id}`. */
    deleteTuner(id: string): Promise<{
        success: boolean;
    }>;
    /** `GET /api/v1/admin/livetv/channels` → unwraps `{ channels }`. */
    listChannels(): Promise<Channel[]>;
    /** `GET /api/v1/admin/livetv/channels/{id}` → unwraps `{ channel }`. */
    getChannel(id: string): Promise<Channel>;
    /**
     * `GET /api/v1/admin/livetv/guide` → unwraps `{ programs }`.
     * Optional `channel_id`, `from`, `to` (Unix-second) query params.
     */
    listGuide(params?: GuideParams): Promise<Program[]>;
    /** `GET /api/v1/admin/livetv/guide/programs/{id}` → unwraps `{ program }`. */
    getProgram(id: string): Promise<Program>;
    /**
     * `POST /api/v1/admin/livetv/guide/refresh` → refresh EPG data, returns the
     * count of programmes imported.
     */
    refreshGuide(daysAhead?: number): Promise<number>;
    /**
     * `GET /api/v1/admin/livetv/recordings` → unwraps `{ recordings }`.
     * Optional `status` filter query param.
     */
    listRecordings(params?: {
        status?: string;
    }): Promise<Recording[]>;
    /** `GET /api/v1/admin/livetv/recordings/{id}` → unwraps `{ recording }`. */
    getRecording(id: string): Promise<Recording>;
    /** `POST /api/v1/admin/livetv/recordings` → schedule a manual recording, unwraps `{ recording }`. */
    createRecording(data: CreateRecordingInput): Promise<Recording>;
    /** `DELETE /api/v1/admin/livetv/recordings/{id}`. */
    deleteRecording(id: string): Promise<{
        success: boolean;
    }>;
    /** `GET /api/v1/admin/livetv/recordings/upcoming?limit=` → unwraps `{ recordings }`. */
    listUpcoming(limit?: number): Promise<Recording[]>;
    /** `GET /api/v1/admin/livetv/recordings/series/{seriesId}` → unwraps `{ recordings }`. */
    listBySeries(seriesId: string): Promise<Recording[]>;
    /** `GET /api/v1/admin/livetv/series-rules` → unwraps `{ rules }`. */
    listSeriesRules(): Promise<SeriesRule[]>;
    /** `GET /api/v1/admin/livetv/series-rules/{id}` → unwraps `{ rule }`. */
    getSeriesRule(id: string): Promise<SeriesRule>;
    /** `POST /api/v1/admin/livetv/series-rules` → create an auto-DVR rule, unwraps `{ rule }`. */
    createSeriesRule(data: CreateSeriesRuleInput): Promise<SeriesRule>;
    /** `PUT /api/v1/admin/livetv/series-rules/{id}` → update a rule, unwraps `{ rule }`. */
    updateSeriesRule(id: string, data: Partial<SeriesRule>): Promise<SeriesRule>;
    /** `DELETE /api/v1/admin/livetv/series-rules/{id}`. */
    deleteSeriesRule(id: string): Promise<{
        success: boolean;
    }>;
}
