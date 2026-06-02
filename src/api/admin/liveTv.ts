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
export class AdminLiveTvApi {
  constructor(private readonly client: ApiClient) {}

  // ── Tuners ─────────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/livetv/tuners` → unwraps `{ tuners }`. */
  async listTuners(): Promise<Tuner[]> {
    const { tuners } = await this.client.get<{ tuners: Tuner[] }>(
      '/api/v1/admin/livetv/tuners',
    );
    return Array.isArray(tuners) ? tuners : [];
  }

  /** `GET /api/v1/admin/livetv/tuners/{id}` → unwraps `{ tuner }`. */
  async getTuner(id: string): Promise<Tuner> {
    const { tuner } = await this.client.get<{ tuner: Tuner }>(
      `/api/v1/admin/livetv/tuners/${encodeURIComponent(id)}`,
    );
    return tuner;
  }

  /** `POST /api/v1/admin/livetv/tuners/scan` → discover tuners, unwraps `{ tuners }`. */
  async scanTuners(): Promise<Tuner[]> {
    const { tuners } = await this.client.post<{ tuners: Tuner[] }>(
      '/api/v1/admin/livetv/tuners/scan',
    );
    return Array.isArray(tuners) ? tuners : [];
  }

  /** `PUT /api/v1/admin/livetv/tuners/{id}` → update name / enabled, unwraps `{ tuner }`. */
  async updateTuner(id: string, data: TunerUpdate): Promise<Tuner> {
    const { tuner } = await this.client.put<{ tuner: Tuner }>(
      `/api/v1/admin/livetv/tuners/${encodeURIComponent(id)}`,
      data,
    );
    return tuner;
  }

  /** `DELETE /api/v1/admin/livetv/tuners/{id}`. */
  deleteTuner(id: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(
      `/api/v1/admin/livetv/tuners/${encodeURIComponent(id)}`,
    );
  }

  // ── Channels ─────────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/livetv/channels` → unwraps `{ channels }`. */
  async listChannels(): Promise<Channel[]> {
    const { channels } = await this.client.get<{ channels: Channel[] }>(
      '/api/v1/admin/livetv/channels',
    );
    return Array.isArray(channels) ? channels : [];
  }

  /** `GET /api/v1/admin/livetv/channels/{id}` → unwraps `{ channel }`. */
  async getChannel(id: string): Promise<Channel> {
    const { channel } = await this.client.get<{ channel: Channel }>(
      `/api/v1/admin/livetv/channels/${encodeURIComponent(id)}`,
    );
    return channel;
  }

  // ── Guide / EPG ───────────────────────────────────────────────────────────────

  /**
   * `GET /api/v1/admin/livetv/guide` → unwraps `{ programs }`.
   * Optional `channel_id`, `from`, `to` (Unix-second) query params.
   */
  async listGuide(params?: GuideParams): Promise<Program[]> {
    const query: Record<string, string> = {};
    if (params?.channel_id) query.channel_id = params.channel_id;
    if (params?.from !== undefined) query.from = String(params.from);
    if (params?.to !== undefined) query.to = String(params.to);
    const { programs } = await this.client.get<{ programs: Program[] }>(
      '/api/v1/admin/livetv/guide',
      query,
    );
    return Array.isArray(programs) ? programs : [];
  }

  /** `GET /api/v1/admin/livetv/guide/programs/{id}` → unwraps `{ program }`. */
  async getProgram(id: string): Promise<Program> {
    const { program } = await this.client.get<{ program: Program }>(
      `/api/v1/admin/livetv/guide/programs/${encodeURIComponent(id)}`,
    );
    return program;
  }

  /**
   * `POST /api/v1/admin/livetv/guide/refresh` → refresh EPG data, returns the
   * count of programmes imported.
   */
  async refreshGuide(daysAhead?: number): Promise<number> {
    const { programs } = await this.client.post<{ programs: number }>(
      '/api/v1/admin/livetv/guide/refresh',
      daysAhead !== undefined ? { days_ahead: daysAhead } : undefined,
    );
    return typeof programs === 'number' ? programs : 0;
  }

  // ── Recordings ─────────────────────────────────────────────────────────────

  /**
   * `GET /api/v1/admin/livetv/recordings` → unwraps `{ recordings }`.
   * Optional `status` filter query param.
   */
  async listRecordings(params?: { status?: string }): Promise<Recording[]> {
    const query: Record<string, string> = {};
    if (params?.status) query.status = params.status;
    const { recordings } = await this.client.get<{ recordings: Recording[] }>(
      '/api/v1/admin/livetv/recordings',
      query,
    );
    return Array.isArray(recordings) ? recordings : [];
  }

  /** `GET /api/v1/admin/livetv/recordings/{id}` → unwraps `{ recording }`. */
  async getRecording(id: string): Promise<Recording> {
    const { recording } = await this.client.get<{ recording: Recording }>(
      `/api/v1/admin/livetv/recordings/${encodeURIComponent(id)}`,
    );
    return recording;
  }

  /** `POST /api/v1/admin/livetv/recordings` → schedule a manual recording, unwraps `{ recording }`. */
  async createRecording(data: CreateRecordingInput): Promise<Recording> {
    const { recording } = await this.client.post<{ recording: Recording }>(
      '/api/v1/admin/livetv/recordings',
      data,
    );
    return recording;
  }

  /** `DELETE /api/v1/admin/livetv/recordings/{id}`. */
  deleteRecording(id: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(
      `/api/v1/admin/livetv/recordings/${encodeURIComponent(id)}`,
    );
  }

  /** `GET /api/v1/admin/livetv/recordings/upcoming?limit=` → unwraps `{ recordings }`. */
  async listUpcoming(limit = 10): Promise<Recording[]> {
    const { recordings } = await this.client.get<{ recordings: Recording[] }>(
      '/api/v1/admin/livetv/recordings/upcoming',
      { limit: String(limit) },
    );
    return Array.isArray(recordings) ? recordings : [];
  }

  /** `GET /api/v1/admin/livetv/recordings/series/{seriesId}` → unwraps `{ recordings }`. */
  async listBySeries(seriesId: string): Promise<Recording[]> {
    const { recordings } = await this.client.get<{ recordings: Recording[] }>(
      `/api/v1/admin/livetv/recordings/series/${encodeURIComponent(seriesId)}`,
    );
    return Array.isArray(recordings) ? recordings : [];
  }

  // ── Series Rules ─────────────────────────────────────────────────────────────

  /** `GET /api/v1/admin/livetv/series-rules` → unwraps `{ rules }`. */
  async listSeriesRules(): Promise<SeriesRule[]> {
    const { rules } = await this.client.get<{ rules: SeriesRule[] }>(
      '/api/v1/admin/livetv/series-rules',
    );
    return Array.isArray(rules) ? rules : [];
  }

  /** `GET /api/v1/admin/livetv/series-rules/{id}` → unwraps `{ rule }`. */
  async getSeriesRule(id: string): Promise<SeriesRule> {
    const { rule } = await this.client.get<{ rule: SeriesRule }>(
      `/api/v1/admin/livetv/series-rules/${encodeURIComponent(id)}`,
    );
    return rule;
  }

  /** `POST /api/v1/admin/livetv/series-rules` → create an auto-DVR rule, unwraps `{ rule }`. */
  async createSeriesRule(data: CreateSeriesRuleInput): Promise<SeriesRule> {
    const { rule } = await this.client.post<{ rule: SeriesRule }>(
      '/api/v1/admin/livetv/series-rules',
      data,
    );
    return rule;
  }

  /** `PUT /api/v1/admin/livetv/series-rules/{id}` → update a rule, unwraps `{ rule }`. */
  async updateSeriesRule(id: string, data: Partial<SeriesRule>): Promise<SeriesRule> {
    const { rule } = await this.client.put<{ rule: SeriesRule }>(
      `/api/v1/admin/livetv/series-rules/${encodeURIComponent(id)}`,
      data,
    );
    return rule;
  }

  /** `DELETE /api/v1/admin/livetv/series-rules/{id}`. */
  deleteSeriesRule(id: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(
      `/api/v1/admin/livetv/series-rules/${encodeURIComponent(id)}`,
    );
  }
}
