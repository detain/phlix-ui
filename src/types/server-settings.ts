/**
 * How the `genres` field is combined across metadata sources
 * (`metadata.genres_mode`): `'first'` = take the genres from the first source
 * in the priority order that supplies any (first-non-empty); `'union'` = merge
 * the distinct genres from every contributing source.
 */
export type GenresMode = 'first' | 'union';

/**
 * Per-media-type ordered metadata-source priority
 * (`metadata.provider_priority`). Keys are media types (e.g. `movie`,
 * `series`, `anime`); values are ordered arrays of source names (e.g. `tmdb`,
 * `imdb`, `anidb`, `myanimelist`, `tvdb`, `fanart`, `local`). For each metadata
 * field the resolver walks the list in order and takes the first non-empty
 * value. A media type absent from the override falls back to the server config
 * default for that type.
 */
export type ProviderPriority = Record<string, string[]>;

export interface ServerSettings {
    'hwaccel.enabled'?: boolean;
    'hwaccel.prefer_hardware'?: boolean;
    'hwaccel.probe_timeout'?: number;
    'tmdb.api_key'?: string;
    /** Per-media-type ordered metadata-source priority (object → JSON). */
    'metadata.provider_priority'?: ProviderPriority;
    /** How genres are combined across sources: 'first' | 'union'. */
    'metadata.genres_mode'?: GenresMode;
    'marker_detection.similarity_threshold'?: number;
    'marker_detection.intro_max_duration'?: number;
    'subtitles.enabled'?: boolean;
    'subtitles.default_language'?: string;
    'subtitles.burn_in_by_default'?: boolean;
    'discovery.discovery_port'?: number;
    'trickplay.enabled'?: boolean;
    'trickplay.interval_seconds'?: number;
    'newsletter.enabled'?: boolean;
    'newsletter.send_hour'?: number;
    'port-forward.port_forwarding.upnp_enabled'?: boolean;
    'trakt.client_id'?: string;
    'trakt.client_secret'?: string;
    'trakt.redirect_uri'?: string;
}

export type SettingGroup = 'transcoding' | 'metadata' | 'markers' | 'subtitles' | 'discovery' | 'trickplay' | 'newsletter' | 'port-forward' | 'scrobblers';
