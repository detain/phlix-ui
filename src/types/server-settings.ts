export interface ServerSettings {
    'hwaccel.enabled'?: boolean;
    'hwaccel.prefer_hardware'?: boolean;
    'hwaccel.probe_timeout'?: number;
    'tmdb.api_key'?: string;
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
