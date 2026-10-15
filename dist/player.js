import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createStaticVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, inject as f, markRaw as p, mergeModels as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, onScopeDispose as b, openBlock as x, ref as S, renderList as C, renderSlot as w, resolveDynamicComponent as T, toDisplayString as E, toRef as D, unref as O, useId as k, useModel as A, vModelText as j, vShow as M, watch as N, withCtx as P, withDirectives as F, withKeys as I, withModifiers as L } from "vue";
import { defineStore as R } from "pinia";
//#region src/stores/usePreferencesStore.ts
var z = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, B = {
	theme: "nocturne",
	accent: null,
	density: "comfortable",
	cardSize: 200,
	gridDensity: "comfy",
	viewMode: "grid",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	defaultAudioLang: null,
	subtitlePreferenceSet: !1,
	captionStyle: { ...z },
	atmosphere: !0,
	tv: !1,
	filterPresets: [],
	showMarkerTimeline: !0,
	crossfadeDuration: 0,
	crossfadeFadeIn: .5,
	crossfadeFadeOut: .5,
	gaplessEnabled: !0,
	preferredAudioQuality: "high"
};
function ee(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var V = "phlix.prefs";
function H() {
	if (typeof localStorage > "u") return { ...B };
	try {
		let e = localStorage.getItem(V);
		if (!e) return { ...B };
		let t = JSON.parse(e);
		return {
			...B,
			...t
		};
	} catch {
		return { ...B };
	}
}
function te() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var ne = R("phlix-prefs", () => {
	let e = H(), t = S(e.theme), n = S(e.accent), i = S(e.density), a = S(e.cardSize), o = S(e.gridDensity), s = S(e.viewMode), c = S(e.reducedMotion), l = S(e.autoplay), u = S(e.defaultVolume), d = S(e.defaultQuality), f = S(e.defaultSubtitleLang), p = S(e.defaultAudioLang), m = S(e.subtitlePreferenceSet), h = S({
		...z,
		...e.captionStyle
	}), g = S(e.atmosphere), _ = S(e.tv), v = S(e.filterPresets ? [...e.filterPresets] : []), y = S(e.showMarkerTimeline), x = S(e.crossfadeDuration), C = S(e.crossfadeFadeIn), w = S(e.crossfadeFadeOut), T = S(e.gaplessEnabled), E = S(e.preferredAudioQuality), D = S(te()), O = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (O = window.matchMedia("(prefers-reduced-motion: reduce)"), O.addEventListener?.("change", (e) => D.value = e.matches));
	let k = r(() => c.value === "on" || c.value !== "off" && D.value);
	function A() {
		return {
			theme: t.value,
			accent: n.value,
			density: i.value,
			cardSize: a.value,
			gridDensity: o.value,
			viewMode: s.value,
			reducedMotion: c.value,
			autoplay: l.value,
			defaultVolume: u.value,
			defaultQuality: d.value,
			defaultSubtitleLang: f.value,
			defaultAudioLang: p.value,
			subtitlePreferenceSet: m.value,
			captionStyle: h.value,
			atmosphere: g.value,
			tv: _.value,
			filterPresets: v.value,
			showMarkerTimeline: y.value,
			crossfadeDuration: x.value,
			crossfadeFadeIn: C.value,
			crossfadeFadeOut: w.value,
			gaplessEnabled: T.value,
			preferredAudioQuality: E.value
		};
	}
	function j(e, t) {
		let n = {
			id: ee(e),
			name: e.trim(),
			query: t
		}, r = v.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? v.value.splice(r, 1, n) : v.value.push(n), n;
	}
	function M(e) {
		v.value = v.value.filter((t) => t.id !== e);
	}
	let P = null;
	function F() {
		P !== null && (clearTimeout(P), P = null);
		let e = A();
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(V, JSON.stringify(e));
		} catch {}
	}
	N(A, (e) => {
		P !== null && clearTimeout(P), P = setTimeout(() => {
			P = null;
			try {
				localStorage.setItem(V, JSON.stringify(e));
			} catch {}
		}, 250);
	}, { deep: !0 }), typeof window < "u" && window.addEventListener("pagehide", F), b(() => {
		P !== null && (clearTimeout(P), P = null), typeof window < "u" && window.removeEventListener("pagehide", F);
	});
	function I() {
		let e = B;
		t.value = e.theme, n.value = e.accent, i.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.viewMode, c.value = e.reducedMotion, l.value = e.autoplay, u.value = e.defaultVolume, d.value = e.defaultQuality, f.value = e.defaultSubtitleLang, p.value = e.defaultAudioLang, m.value = e.subtitlePreferenceSet, h.value = { ...z }, g.value = e.atmosphere, _.value = e.tv, v.value = [...e.filterPresets], y.value = e.showMarkerTimeline, x.value = e.crossfadeDuration, C.value = e.crossfadeFadeIn, w.value = e.crossfadeFadeOut, T.value = e.gaplessEnabled, E.value = e.preferredAudioQuality;
	}
	return {
		theme: t,
		accent: n,
		density: i,
		cardSize: a,
		gridDensity: o,
		viewMode: s,
		reducedMotion: c,
		autoplay: l,
		defaultVolume: u,
		defaultQuality: d,
		defaultSubtitleLang: f,
		defaultAudioLang: p,
		subtitlePreferenceSet: m,
		captionStyle: h,
		atmosphere: g,
		tv: _,
		filterPresets: v,
		showMarkerTimeline: y,
		crossfadeDuration: x,
		crossfadeFadeIn: C,
		crossfadeFadeOut: w,
		gaplessEnabled: T,
		preferredAudioQuality: E,
		systemReduced: D,
		effectiveReducedMotion: k,
		snapshot: A,
		saveFilterPreset: j,
		removeFilterPreset: M,
		reset: I
	};
}), re = 30, ie = .95, ae = 5e3, oe = "phlix.resume", se = "phlix.resume.touched";
function ce() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(oe), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
function le() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(se), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var ue = R("phlix-player", () => {
	let e = ne(), t = S(null), n = S(""), i = S([]), a = S(!1), o = S(0), s = S(0), c = S(0), l = S(e.defaultVolume), u = S(!1), d = S(1), f = S(e.defaultQuality), p = S(e.defaultSubtitleLang), m = S(""), h = S(!1), g = S(ce()), _ = S(le()), v = S(null), y = 0, b = r(() => s.value > 0 ? o.value / s.value : 0), x = r(() => i.value[0] ?? null);
	function C(e) {
		_.value[e] = Date.now();
	}
	function w(e) {
		let t = Object.keys(g.value), n = !1;
		for (let e of Object.keys(_.value)) e in g.value || (delete _.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (_.value[e] ?? 0) - (_.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete g.value[n], delete _.value[n];
		}
		return !0;
	}
	let T, E = 0;
	function D(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			E = Date.now();
			let e = () => {
				localStorage.setItem(oe, JSON.stringify(g.value)), localStorage.setItem(se, JSON.stringify(_.value));
			};
			try {
				e();
			} catch {
				try {
					w(Math.floor(Object.keys(g.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - E;
		clearTimeout(T), e || n >= ae ? t() : T = setTimeout(t, ae - n);
	}
	function O(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function k(e, t, n) {
		if (O(t, n)) {
			let n = !(e in g.value);
			g.value[e] = Math.floor(t), C(e), n && w(200);
		} else delete g.value[e], delete _.value[e];
		D();
	}
	function A(e) {
		return e ? g.value[e] ?? null : null;
	}
	function j(e) {
		delete g.value[e], delete _.value[e], D(!0);
	}
	function M(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in g.value) && r > 0 && (g.value[n] = Math.floor(r), C(n), t = !0);
		t && (w(200), D(!0));
	}
	function N(e, r = {}) {
		t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (o.value = 0, s.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, c.value = 0), pe(e);
	}
	function P(e, n, r) {
		o.value = e, n !== void 0 && (s.value > 0 ? isFinite(n) && n > s.value && (s.value = n) : s.value = n), r !== void 0 && (c.value = r), t.value && k(t.value.id, e, s.value);
	}
	function F(e) {
		v.value = {
			type: "seekTo",
			value: e,
			seq: ++y
		};
	}
	function I(e) {
		v.value = {
			type: "seekBy",
			value: e,
			seq: ++y
		};
	}
	function L(e, t = {}) {
		N({
			id: "local",
			name: decodeURIComponent(e.split(/[?#]/)[0].split("/").pop() ?? "") || e,
			type: "movie",
			poster_url: null,
			genres: [],
			year: null,
			rating: null,
			runtime: null,
			overview: null,
			actors: [],
			director: null,
			created_at: null,
			updated_at: null,
			...t
		}, {
			streamUrl: e,
			resetPosition: !0
		}), i.value = [];
	}
	function R() {
		a.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function z() {
		a.value = !1, t.value && k(t.value.id, o.value, s.value), D(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function B(e) {
		l.value = Math.min(1, Math.max(0, e)), l.value > 0 && (u.value = !1);
	}
	function ee() {
		u.value = !u.value;
	}
	function V(e) {
		d.value = e;
	}
	function H(e) {
		f.value = e;
	}
	function te(e) {
		p.value = e;
	}
	function re(e) {
		i.value = [...e];
	}
	function ie(e) {
		i.value.push(e);
	}
	function ue(e) {
		let t = i.value.shift() ?? null;
		return t && N(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function de() {
		h.value = !0;
	}
	function U() {
		h.value = !1;
	}
	function fe() {
		t.value && k(t.value.id, o.value, s.value), D(!0), a.value = !1, h.value = !1, t.value = null, n.value = "", m.value = "";
	}
	function pe(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function me() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && !(!(s.value > 0) || !Number.isFinite(s.value))) try {
			e.setPositionState({
				duration: s.value,
				position: Math.min(Math.max(0, o.value), s.value),
				playbackRate: d.value || 1
			});
		} catch {}
	}
	function he(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return () => {};
		let t = navigator.mediaSession, n = (e, n) => {
			try {
				t.setActionHandler(e, n);
			} catch {}
		};
		return e.onPlay && n("play", e.onPlay), e.onPause && n("pause", e.onPause), e.onNext && n("nexttrack", e.onNext), e.onPrevious && n("previoustrack", e.onPrevious), e.onSeek && n("seekto", (t) => e.onSeek?.(t.seekTime ?? 0)), () => {
			for (let e of [
				"play",
				"pause",
				"nexttrack",
				"previoustrack",
				"seekto"
			]) n(e, null);
		};
	}
	function W() {
		l.value = e.defaultVolume, f.value = e.defaultQuality, p.value = e.defaultSubtitleLang;
	}
	return {
		current: t,
		streamUrl: n,
		queue: i,
		playing: a,
		position: o,
		duration: s,
		buffered: c,
		volume: l,
		muted: u,
		rate: d,
		quality: f,
		subtitleLang: p,
		hlsMasterUrl: m,
		miniPlayer: h,
		resumeMap: g,
		lastCommand: v,
		progress: b,
		upNext: x,
		inResumeBand: O,
		saveResume: k,
		resumePositionFor: A,
		clearResume: j,
		mergeServerResume: M,
		setCurrent: N,
		updateProgress: P,
		seekTo: F,
		seekBy: I,
		playLocalFile: L,
		play: R,
		pause: z,
		setVolume: B,
		toggleMute: ee,
		setRate: V,
		setQuality: H,
		setSubtitle: te,
		setQueue: re,
		enqueue: ie,
		next: ue,
		showMiniPlayer: de,
		hideMiniPlayer: U,
		closePlayer: fe,
		setMediaSessionMetadata: pe,
		setMediaPositionState: me,
		bindMediaSession: he,
		seedFromPreferences: W
	};
}), de = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, U = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, fe = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function pe(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function me() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region node_modules/@phlix/contracts/dist/phlix-contracts.js
var he = {
	SERVERS_READ: "mcp:servers:read",
	LIBRARY_READ: "mcp:library:read",
	PLAYBACK_READ: "mcp:playback:read",
	PLAYBACK_CONTROL: "mcp:playback:control"
};
he.SERVERS_READ, he.LIBRARY_READ, he.PLAYBACK_READ, he.PLAYBACK_CONTROL;
var W = {
	auth: {
		REQUIRED: "auth.required",
		NOT_ADMIN: "auth.not_admin",
		INVALID_TOKEN: "auth.invalid_token",
		USER_NOT_FOUND: "auth.user_not_found",
		SIGNUPS_DISABLED: "auth.signups_disabled",
		ACCOUNT_PENDING: "auth.account_pending",
		ACCOUNT_DISABLED: "auth.account_disabled",
		PASSWORD_CHANGE_REQUIRED: "auth.password_change_required",
		UNAUTHENTICATED: "auth.unauthenticated",
		ENROLLMENT_EXPIRED: "auth.enrollment_expired",
		SERVER_MISMATCH: "auth.server_mismatch",
		MISSING_CREDENTIALS: "auth.missing_credentials",
		INVALID_CREDENTIALS: "auth.invalid_credentials"
	},
	hub: {
		NOT_ENROLLED: "hub.not_enrolled",
		TOKEN_REQUIRED: "hub.token_required",
		JWT_INVALID: "hub.jwt_invalid",
		PROTOCOL_UNSUPPORTED: "hub.protocol_unsupported",
		INTERNAL_ERROR: "hub.internal_error"
	},
	claim: {
		CODE_NOT_FOUND: "claim.code_not_found",
		CODE_EXPIRED: "claim.code_expired",
		CODE_ALREADY_CLAIMED: "claim.code_already_claimed"
	},
	server: {
		NOT_FOUND: "server.not_found",
		NOT_OWNED: "server.not_owned",
		RELAY_UNAVAILABLE: "server.relay_unavailable",
		OFFLINE: "server.offline",
		NO_TUNNEL: "server.no_tunnel",
		KEY_INVALID: "server.key_invalid"
	},
	proxy: { SCOPE_DENIED: "proxy.scope_denied" },
	quota: { EXCEEDED: "quota.exceeded" },
	stream: {
		LIMIT: "stream.limit",
		LIMIT_EXCEEDED: "stream.limit_exceeded"
	},
	access: { SCHEDULED: "access.scheduled" },
	gateway: { TIMEOUT: "gateway.timeout" },
	relay: {
		CLIENT_WS_ENDPOINT: "relay.client_ws_endpoint",
		WS_HTTP_ENDPOINT: "relay.ws_http_endpoint",
		ENCODE_ERROR: "relay.encode_error"
	},
	mcp: {
		UNKNOWN_TOOL: "mcp.unknown_tool",
		SCOPE_DENIED: "mcp.scope_denied",
		STREAMING_UNSUPPORTED: "mcp.streaming_unsupported",
		SSE_NOT_ACCEPTABLE: "mcp.sse_not_acceptable",
		UNSUPPORTED_PROTOCOL_VERSION: "mcp.unsupported_protocol_version"
	},
	mcp_token: {
		NO_VALID_SCOPES: "mcp_token.no_valid_scopes",
		NOT_FOUND: "mcp_token.not_found"
	},
	alexa: {
		STREAMING_UNSUPPORTED: "alexa.streaming_unsupported",
		MALFORMED_ENVELOPE: "alexa.malformed_envelope",
		VERIFICATION_ERROR: "alexa.verification_error",
		MISSING_CERT_CHAIN_URL: "alexa.missing_cert_chain_url",
		MISSING_SIGNATURE_HEADER: "alexa.missing_signature_header",
		EMPTY_BODY: "alexa.empty_body",
		CERT_URL_REJECTED: "alexa.cert_url_rejected",
		CERT_FETCH_FAILED: "alexa.cert_fetch_failed",
		CERT_CHAIN_MALFORMED: "alexa.cert_chain_malformed",
		SIGNATURE_INVALID: "alexa.signature_invalid",
		CERT_EXPIRED: "alexa.cert_expired",
		CERT_SAN_MISMATCH: "alexa.cert_san_mismatch",
		CERT_CHAIN_UNTRUSTED: "alexa.cert_chain_untrusted",
		TIMESTAMP_MALFORMED: "alexa.timestamp_malformed",
		TIMESTAMP_MISSING: "alexa.timestamp_missing",
		TIMESTAMP_STALE: "alexa.timestamp_stale"
	},
	tls: { ACME_NOT_IMPLEMENTED: "tls.acme_not_implemented" },
	csrf: { INVALID_ORIGIN: "csrf.invalid_origin" },
	user: { NOT_FOUND: "user.not_found" },
	plugin: {
		NAME_REQUIRED: "plugin.name.required",
		NOT_FOUND: "plugin.not_found",
		URL_REQUIRED: "plugin.url.required",
		URL_INVALID_SCHEME: "plugin.url.invalid_scheme",
		URL_BLOCKED: "plugin.url.blocked",
		INSTALL_FAILED: "plugin.install.failed",
		ENABLE_FAILED: "plugin.enable.failed",
		SETTINGS_INVALID: "plugin.settings.invalid",
		SETTINGS_VALIDATION_FAILED: "plugin.settings.validation_failed",
		TEST_NOT_SUPPORTED: "plugin.test_not_supported",
		UPDATE_FAILED: "plugin.update.failed",
		UPDATE_NO_SOURCE: "plugin.update.no_source",
		CATALOG_URL_REQUIRED: "plugin.catalog.url.required",
		CATALOG_URL_DUPLICATE: "plugin.catalog.url.duplicate",
		CATALOG_URL_INVALID: "plugin.catalog.url.invalid",
		AUTO_UPDATE_INVALID: "plugin.auto_update.invalid",
		CATALOG_CHANNEL_INVALID: "plugin.catalog.channel.invalid"
	},
	library: { DELETE_ALL_CONFIRM_REQUIRED: "library.delete_all.confirm_required" },
	metadata: {
		TMDB_UNCONFIGURED: "metadata.tmdb_unconfigured",
		TMDB_UNREACHABLE: "metadata.tmdb_unreachable",
		NO_QUERY: "metadata.no_query",
		BAD_TMDB_ID: "metadata.bad_tmdb_id",
		NO_MATCH: "metadata.no_match"
	},
	poster: {
		MISSING_URL: "poster.missing_url",
		POSTER_NOT_CANDIDATE: "poster.poster_not_candidate"
	},
	profile: {
		USE_SWITCH: "profile.use_switch",
		LAST_PROFILE: "profile.last_profile",
		NO_PIN: "profile.no_pin",
		PIN_MISMATCH: "profile.pin_mismatch",
		NOT_FOUND: "profile.not_found"
	},
	dlna: { FORBIDDEN: "dlna.forbidden" },
	casting: { DISABLED: "casting.disabled" },
	quickconnect: {
		UNAUTHORIZED: "unauthorized",
		INVALID_SECRET: "invalid_secret",
		PAIRING_NOT_PENDING: "pairing_not_pending",
		CONSENT_REQUIRED: "consent_required",
		PAIRING_NOT_FOUND: "pairing_not_found",
		STORAGE_UNAVAILABLE: "storage_unavailable"
	},
	common: {
		RATE_LIMITED: "rate_limited",
		PROVIDER_UNAVAILABLE: "provider_unavailable",
		INVALID_REQUEST: "invalid_request",
		INVALID_BODY: "invalid_body",
		INVALID_PAYLOAD: "invalid_payload",
		UNKNOWN_ERROR: "unknown_error",
		VALIDATION_FAILED: "validation_failed",
		ADMIN_REQUIRED: "admin_required",
		MASTER_ONLY: "master_only",
		INVALID_URL: "invalid_url",
		INVALID_ROLE: "invalid_role",
		INVALID_PERMISSION: "invalid_permission",
		MISSING_URL: "missing_url",
		MISSING_NAME: "missing_name",
		MISSING_PUBLIC_KEY: "missing_public_key",
		MISSING_USER_ID: "missing_user_id",
		MISSING_SERVER_ID: "missing_server_id",
		NOT_SERVER_OWNER: "not_server_owner"
	},
	federation: {
		PEER_URL_EXISTS: "peer_url_exists",
		PEER_KEY_EXISTS: "peer_key_exists",
		PEER_NOT_FOUND: "peer_not_found",
		OFFER_NOT_FOUND: "offer_not_found",
		OFFER_ALREADY_RESPONDED: "offer_already_responded",
		DELEGATION_NOT_FOUND: "delegation_not_found",
		MISSING_PEER_ID: "missing_peer_id",
		MISSING_OFFER_ID: "missing_offer_id",
		MISSING_DELEGATION_ID: "missing_delegation_id",
		MISSING_LIBRARY_ID: "missing_library_id",
		MISSING_LIBRARY_NAME: "missing_library_name",
		LEAF_HUB_ID_ALREADY_BOUND: "leaf_hub_id_already_bound"
	},
	share: {
		NOT_FOUND: "share_not_found",
		MISSING_SHARE_ID: "missing_share_id",
		MISSING_COLLABORATOR_EMAIL: "missing_collaborator_email",
		EXISTS: "share_exists",
		NOT_OWNER: "not_share_owner",
		MISSING_PERMISSION: "missing_permission"
	},
	invite: {
		MISSING_LINK_ID: "missing_link_id",
		LINK_NOT_FOUND: "invite_link_not_found",
		NOT_LINK_OWNER: "not_link_owner",
		MISSING_TOKEN: "missing_token",
		INVALID: "invalid_invite",
		EXPIRED_OR_EXHAUSTED: "invite_expired_or_exhausted"
	},
	request: {
		INVALID_TYPE: "invalid_type",
		INVALID_TMDB_ID: "invalid_tmdb_id",
		MISSING_TITLE: "missing_title",
		MISSING_REQUEST_ID: "missing_request_id",
		NOT_FOUND: "request_not_found",
		NOT_OWNER: "not_request_owner",
		APPROVE_FAILED: "approve_failed",
		DENY_FAILED: "deny_failed"
	},
	admin: {
		USER_NOT_FOUND: "user_not_found",
		CANNOT_DELETE_SELF: "cannot_delete_self",
		LAST_ADMIN: "last_admin",
		CANNOT_DEMOTE_SELF: "cannot_demote_self",
		INVALID_QUOTA: "invalid_quota",
		INVALID_THROTTLE: "invalid_throttle"
	},
	updates: { CHECK_DISPATCH_FAILED: "update_check_dispatch_failed" },
	identity: {
		MISSING_ID: "identity.missing_id",
		NOT_FOUND: "identity.not_found",
		LAST_SIGN_IN_METHOD: "identity.last_sign_in_method",
		ALREADY_LINKED: "identity.already_linked",
		INVALID: "identity.invalid",
		LINK_UNAVAILABLE: "identity.link_unavailable",
		INVALID_LINK_STATE: "identity.invalid_link_state"
	},
	provider: {
		NOT_CONFIGURED: "provider.not_configured",
		UNKNOWN: "provider.unknown",
		NOT_FOUND: "provider.not_found",
		INVALID_TYPE: "provider.invalid_type",
		MISSING_CLIENT_ID: "provider.missing_client_id",
		MISSING_URL: "provider.missing_url",
		INVALID_URL: "provider.invalid_url"
	},
	oauth: {
		MISSING_CODE: "oauth.missing_code",
		MISSING_STATE: "oauth.missing_state",
		INVALID_STATE: "oauth.invalid_state",
		MISSING_REDIRECT_URI: "oauth.missing_redirect_uri",
		INVALID_REDIRECT_URI: "oauth.invalid_redirect_uri",
		CALLBACK_URL_NOT_CONFIGURED: "oauth.callback_url_not_configured"
	},
	ldap: {
		MISSING_HOST: "ldap.missing_host",
		MISSING_BASE_DN: "ldap.missing_base_dn",
		INVALID_PORT: "ldap.invalid_port",
		CONNECTION_FAILED: "ldap.connection_failed",
		BIND_FAILED: "ldap.bind_failed",
		ERROR: "ldap.error",
		RUNTIME_ERROR: "ldap.runtime_error"
	},
	syncplay: {
		CREATE_FAILED: "syncplay.create_failed",
		JOIN_FAILED: "syncplay.join_failed",
		LEAVE_FAILED: "syncplay.leave_failed",
		GROUP_LIMIT_REACHED: "syncplay.group_limit_reached",
		GROUP_NOT_FOUND: "syncplay.group_not_found",
		INVALID_PASSWORD: "syncplay.invalid_password",
		GROUP_FULL: "syncplay.group_full",
		QUEUE_LIMIT_EXCEEDED: "syncplay.queue_limit_exceeded"
	},
	legacy: {
		UNKNOWN_MESSAGE: "UNKNOWN_MESSAGE",
		HANDLER_ERROR: "HANDLER_ERROR",
		NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
		NOT_IN_GROUP: "NOT_IN_GROUP",
		NOT_HOST: "NOT_HOST",
		INVALID_NEW_HOST: "INVALID_NEW_HOST",
		MEMBER_NOT_FOUND: "MEMBER_NOT_FOUND",
		SAME_HOST: "SAME_HOST",
		CREATE_FAILED: "CREATE_FAILED",
		JOIN_FAILED: "JOIN_FAILED",
		LEAVE_FAILED: "LEAVE_FAILED",
		PROTOCOL_VERSION_MISMATCH: "PROTOCOL_VERSION_MISMATCH"
	}
}, ge = /* @__PURE__ */ "auth.hub.claim.server.proxy.quota.stream.access.gateway.relay.mcp.mcp_token.alexa.tls.csrf.user.plugin.library.metadata.poster.profile.dlna.casting.quickconnect.common.federation.share.invite.request.admin.updates.identity.provider.oauth.ldap.syncplay.legacy".split("."), _e = Object.values(W.auth), G = Object.values(W.hub), ve = Object.values(W.claim), ye = Object.values(W.server), be = Object.values(W.proxy), xe = Object.values(W.quota), Se = Object.values(W.stream), Ce = Object.values(W.access), we = Object.values(W.gateway), Te = Object.values(W.relay), Ee = Object.values(W.mcp), De = Object.values(W.mcp_token), Oe = Object.values(W.alexa), ke = Object.values(W.tls), Ae = Object.values(W.csrf), je = Object.values(W.user), Me = Object.values(W.plugin), Ne = Object.values(W.library), Pe = Object.values(W.metadata), Fe = Object.values(W.poster), Ie = Object.values(W.profile), Le = Object.values(W.dlna), Re = Object.values(W.casting), ze = Object.values(W.quickconnect), Be = Object.values(W.common), Ve = Object.values(W.federation), He = Object.values(W.share), Ue = Object.values(W.invite), We = Object.values(W.request), Ge = Object.values(W.admin), Ke = Object.values(W.updates), qe = Object.values(W.identity), Je = Object.values(W.provider), Ye = Object.values(W.oauth), Xe = Object.values(W.ldap), Ze = Object.values(W.syncplay), Qe = Object.values(W.legacy), $e = {
	auth: _e,
	hub: G,
	claim: ve,
	server: ye,
	proxy: be,
	quota: xe,
	stream: Se,
	access: Ce,
	gateway: we,
	relay: Te,
	mcp: Ee,
	mcp_token: De,
	alexa: Oe,
	tls: ke,
	csrf: Ae,
	user: je,
	plugin: Me,
	library: Ne,
	metadata: Pe,
	poster: Fe,
	profile: Ie,
	dlna: Le,
	casting: Re,
	quickconnect: ze,
	common: Be,
	federation: Ve,
	share: He,
	invite: Ue,
	request: We,
	admin: Ge,
	updates: Ke,
	identity: qe,
	provider: Je,
	oauth: Ye,
	ldap: Xe,
	syncplay: Ze,
	legacy: Qe
}, et = ge.flatMap((e) => $e[e]);
[...Qe, ...Ze];
//#endregion
//#region src/i18n/errors.ts
var tt = {
	"auth.required": "Please sign in to continue.",
	"auth.not_admin": "This action requires an administrator account.",
	"auth.invalid_token": "Your sign-in token is invalid or has expired.",
	"auth.user_not_found": "That account no longer exists.",
	"auth.signups_disabled": "New account sign-ups are disabled on this server.",
	"auth.account_pending": "Your account is still awaiting approval.",
	"auth.account_disabled": "This account has been disabled.",
	"auth.password_change_required": "You must change your password before continuing.",
	"auth.unauthenticated": "Sign in before claiming this server.",
	"auth.enrollment_expired": "This server’s enrollment token has expired. Enroll it with the hub again.",
	"auth.server_mismatch": "The enrollment token does not match this server.",
	"auth.missing_credentials": "Enter your credentials to link this account.",
	"auth.invalid_credentials": "The credentials you entered are not correct.",
	"hub.not_enrolled": "This server is not enrolled with the hub yet.",
	"hub.token_required": "A hub access token is required for this action.",
	"hub.jwt_invalid": "The hub token is invalid or has expired.",
	"hub.protocol_unsupported": "The request did not use the protocol the hub supports.",
	"hub.internal_error": "The hub hit an unexpected error. Try again in a moment.",
	"claim.code_not_found": "That claim code was not found. Check it and try again.",
	"claim.code_expired": "That claim code has expired. Generate a new one and try again.",
	"claim.code_already_claimed": "That claim code has already been used.",
	"server.not_found": "That server could not be found.",
	"server.not_owned": "This server does not belong to your account.",
	"server.relay_unavailable": "This server is online but its secure relay tunnel isn't connected yet, so its libraries can't be loaded over the hub. It should reconnect automatically — try again in a moment.",
	"server.offline": "This server is offline, so its libraries can’t be loaded. It will be browsable again once it reconnects to the hub.",
	"server.no_tunnel": "This server is online but its secure relay tunnel isn't connected yet, so its libraries can't be loaded over the hub. It should reconnect automatically — try again in a moment.",
	"server.key_invalid": "The server’s signing key failed validation during the claim. Try claiming again.",
	"proxy.scope_denied": "Your access token does not have the scope for this request.",
	"quota.exceeded": "You have reached your bandwidth quota limit.",
	"stream.limit": "You have reached the maximum number of simultaneous streams.",
	"stream.limit_exceeded": "You have reached this server’s limit on simultaneous streams. Stop one and try again.",
	"access.scheduled": "This profile is only available during its scheduled hours. Try again later.",
	"gateway.timeout": "The hub gateway timed out waiting for your server. Try again.",
	"relay.client_ws_endpoint": "This endpoint is a client WebSocket mount — it cannot be opened with a plain request.",
	"relay.ws_http_endpoint": "This endpoint is a relay WebSocket mount — it cannot be opened with a plain request.",
	"relay.encode_error": "The relay failed to encode the message. Try again.",
	"mcp.unknown_tool": "That MCP tool does not exist.",
	"mcp.scope_denied": "Your MCP token does not allow this tool.",
	"mcp.streaming_unsupported": "Streaming responses are not supported on this MCP surface.",
	"mcp.sse_not_acceptable": "This MCP request must accept a Server-Sent Events response.",
	"mcp.unsupported_protocol_version": "This MCP protocol version is not supported.",
	"mcp_token.no_valid_scopes": "None of the requested token scopes are valid.",
	"mcp_token.not_found": "That MCP access token no longer exists.",
	"alexa.streaming_unsupported": "Streaming is not supported through the Alexa adapter.",
	"alexa.malformed_envelope": "The Alexa request envelope was malformed.",
	"alexa.verification_error": "The Alexa request could not be verified. Try again.",
	"alexa.missing_cert_chain_url": "The Alexa request did not include its certificate chain URL.",
	"alexa.missing_signature_header": "The Alexa request did not include a signature header.",
	"alexa.empty_body": "The Alexa request arrived with an empty body.",
	"alexa.cert_url_rejected": "The certificate URL on the Alexa request was outside Amazon’s allowed domains.",
	"alexa.cert_fetch_failed": "The server could not fetch the certificate chain for the Alexa request.",
	"alexa.cert_chain_malformed": "The certificate chain sent with the Alexa request was malformed.",
	"alexa.signature_invalid": "The signature on the Alexa request did not pass verification.",
	"alexa.cert_expired": "The certificate that signed the Alexa request has expired.",
	"alexa.cert_san_mismatch": "The certificate on the Alexa request was not issued for an Alexa domain.",
	"alexa.cert_chain_untrusted": "The Alexa request’s certificate chain does not anchor on Amazon’s root certificate.",
	"alexa.timestamp_malformed": "The timestamp header on the Alexa request was unparseable.",
	"alexa.timestamp_missing": "The Alexa request did not include a timestamp header.",
	"alexa.timestamp_stale": "The timestamp on the Alexa request was too old. Check the server clock.",
	"tls.acme_not_implemented": "Automatic TLS certificate issuance is not available yet.",
	"csrf.invalid_origin": "The request origin failed the CSRF check.",
	"user.not_found": "The user for this session could not be found.",
	"plugin.name.required": "A plugin name is required.",
	"plugin.not_found": "That plugin could not be found.",
	"plugin.url.required": "A plugin URL is required.",
	"plugin.url.invalid_scheme": "The plugin URL must use http or https.",
	"plugin.url.blocked": "This plugin URL is blocked by server policy.",
	"plugin.install.failed": "Installing the plugin failed.",
	"plugin.enable.failed": "Enabling the plugin failed.",
	"plugin.settings.invalid": "The plugin settings are invalid.",
	"plugin.settings.validation_failed": "The plugin settings failed validation.",
	"plugin.test_not_supported": "This plugin does not support self-tests.",
	"plugin.update.failed": "Updating the plugin failed.",
	"plugin.update.no_source": "This plugin has no update source configured.",
	"plugin.catalog.url.required": "A catalog URL is required.",
	"plugin.catalog.url.duplicate": "That plugin catalog URL is already added.",
	"plugin.catalog.url.invalid": "The plugin catalog URL is invalid.",
	"plugin.auto_update.invalid": "The auto-update setting is invalid.",
	"plugin.catalog.channel.invalid": "The catalog update channel is invalid.",
	"library.delete_all.confirm_required": "Deleting every library at once requires explicit confirmation.",
	"metadata.tmdb_unconfigured": "TMDB lookups are not configured on this server.",
	"metadata.tmdb_unreachable": "The metadata provider could not be reached. Try again later.",
	"metadata.no_query": "Enter a title to search the metadata provider.",
	"metadata.bad_tmdb_id": "That TMDB identifier is not valid.",
	"metadata.no_match": "No metadata match was found for this title.",
	"poster.missing_url": "A poster image URL is required.",
	"poster.poster_not_candidate": "That image is not an available poster candidate for this title.",
	"profile.use_switch": "To change the active profile, switch to it.",
	"profile.last_profile": "This is your last profile, so it cannot be deleted.",
	"profile.no_pin": "This profile has no PIN configured to verify.",
	"profile.pin_mismatch": "That PIN is not correct.",
	"profile.not_found": "That profile no longer exists. Pick another one.",
	"dlna.forbidden": "This device is not allowed to use DLNA on this server.",
	"casting.disabled": "Casting is disabled on this server.",
	unauthorized: "You are not authorized to manage pairing on this server.",
	invalid_secret: "The pairing secret is not valid. Start pairing again.",
	pairing_not_pending: "There is no pairing request waiting for approval.",
	consent_required: "This device must accept the consent prompt before pairing can continue.",
	pairing_not_found: "That pairing request no longer exists.",
	storage_unavailable: "Pairing storage is unavailable right now. Try again later.",
	rate_limited: "Too many requests — wait a moment and try again.",
	provider_unavailable: "The authentication provider is unavailable. Try again later.",
	invalid_request: "The request was not valid.",
	invalid_body: "The request body was missing or malformed.",
	invalid_payload: "The request data was missing or malformed.",
	unknown_error: "An unexpected error occurred.",
	validation_failed: "Some fields did not pass validation.",
	admin_required: "Administrator privileges are required for this action.",
	master_only: "Only the master account can perform this action.",
	invalid_url: "The URL provided is not valid.",
	invalid_role: "The role provided is not valid.",
	invalid_permission: "The permission provided is not valid.",
	missing_url: "A URL is required.",
	missing_name: "A name is required.",
	missing_public_key: "A public key is required.",
	missing_user_id: "A user ID is required.",
	missing_server_id: "A server ID is required.",
	not_server_owner: "Only the owner of this server can manage it.",
	peer_url_exists: "A peer with that URL is already added.",
	peer_key_exists: "A peer with that public key is already added.",
	peer_not_found: "That federated peer could not be found.",
	offer_not_found: "That peer offer could not be found.",
	offer_already_responded: "This offer has already been answered.",
	delegation_not_found: "That access delegation could not be found.",
	missing_peer_id: "A peer ID is required.",
	missing_offer_id: "An offer ID is required.",
	missing_delegation_id: "A delegation ID is required.",
	missing_library_id: "A library ID is required.",
	missing_library_name: "A library name is required.",
	leaf_hub_id_already_bound: "That server ID is already linked to a different peer.",
	share_not_found: "That library share could not be found.",
	missing_share_id: "A share ID is required.",
	missing_collaborator_email: "A collaborator email address is required.",
	share_exists: "This library is already shared with that collaborator.",
	not_share_owner: "Only the share owner can manage this share.",
	missing_permission: "A permission level is required.",
	missing_link_id: "An invite link ID is required.",
	invite_link_not_found: "That invite link could not be found.",
	not_link_owner: "Only the owner can manage this invite link.",
	missing_token: "An invite token is required.",
	invalid_invite: "This invite is not valid.",
	invite_expired_or_exhausted: "This invite has expired or has been fully used.",
	invalid_type: "The request type is not valid.",
	invalid_tmdb_id: "The TMDB identifier for this request is not valid.",
	missing_title: "A title is required.",
	missing_request_id: "A request ID is required.",
	request_not_found: "That media request could not be found.",
	not_request_owner: "Only the requester can manage this request.",
	approve_failed: "The request could not be approved.",
	deny_failed: "The request could not be denied.",
	user_not_found: "That user could not be found.",
	cannot_delete_self: "You cannot delete your own account from here.",
	last_admin: "This is the last administrator account, so it cannot be changed this way.",
	cannot_demote_self: "You cannot remove your own administrator role.",
	invalid_quota: "The quota value is not valid.",
	invalid_throttle: "The throttle value is not valid.",
	update_check_dispatch_failed: "The update check could not be started. Try again.",
	"identity.missing_id": "No linked identity was selected for this action.",
	"identity.not_found": "That linked identity could not be found.",
	"identity.last_sign_in_method": "This is the only sign-in method left on your account, so it cannot be unlinked.",
	"identity.already_linked": "That provider account is already linked to a different account here.",
	"identity.invalid": "The provider did not return a usable account identity.",
	"identity.link_unavailable": "Account linking is temporarily unavailable on this server.",
	"identity.invalid_link_state": "The linking request expired before it finished. Start again.",
	"provider.not_configured": "No sign-in provider is configured on this server yet.",
	"provider.unknown": "That sign-in provider is not available on this server.",
	"provider.not_found": "That sign-in provider could not be found.",
	"provider.invalid_type": "That provider cannot be used for this kind of sign-in.",
	"provider.missing_client_id": "The provider client ID is required.",
	"provider.missing_url": "The provider URL is required.",
	"provider.invalid_url": "The provider URL is not valid.",
	"oauth.missing_code": "The sign-in provider returned no authorization code. Try signing in again.",
	"oauth.missing_state": "The sign-in provider returned no state token. Try signing in again.",
	"oauth.invalid_state": "The sign-in attempt no longer matches this browser, or it expired. Try again.",
	"oauth.missing_redirect_uri": "A redirect address is required to continue this sign-in.",
	"oauth.invalid_redirect_uri": "That redirect address is not on the server’s allowed list.",
	"oauth.callback_url_not_configured": "This server has no sign-in callback URL configured yet.",
	"ldap.missing_host": "The LDAP server host is required.",
	"ldap.missing_base_dn": "The LDAP base DN is required.",
	"ldap.invalid_port": "The LDAP port number is not valid.",
	"ldap.connection_failed": "The server could not connect to the LDAP directory.",
	"ldap.bind_failed": "The LDAP credentials could not sign in to the directory.",
	"ldap.error": "The LDAP directory returned an error.",
	"ldap.runtime_error": "The LDAP connection test failed unexpectedly.",
	"syncplay.create_failed": "The watch group could not be created.",
	"syncplay.join_failed": "The watch group could not be joined.",
	"syncplay.leave_failed": "You could not leave the watch group.",
	"syncplay.group_limit_reached": "The maximum number of watch groups has been reached.",
	"syncplay.group_not_found": "That watch group no longer exists.",
	"syncplay.invalid_password": "The group password is not correct.",
	"syncplay.group_full": "That watch group is full.",
	"syncplay.queue_limit_exceeded": "The watch queue has reached its maximum size.",
	UNKNOWN_MESSAGE: "The sync session did not understand that message.",
	HANDLER_ERROR: "The sync session hit an internal error handling your request.",
	NOT_AUTHENTICATED: "Sign in to the sync session before continuing.",
	NOT_IN_GROUP: "You are not in a watch group right now.",
	NOT_HOST: "Only the group host can do that.",
	INVALID_NEW_HOST: "That member cannot take over as host.",
	MEMBER_NOT_FOUND: "That group member could not be found.",
	SAME_HOST: "That member is already the host.",
	CREATE_FAILED: "The watch group could not be created.",
	JOIN_FAILED: "The watch group could not be joined.",
	LEAVE_FAILED: "You could not leave the watch group.",
	PROTOCOL_VERSION_MISMATCH: "This client’s sync protocol does not match the server’s."
}, nt = {
	"auth.required": "Inicia sesión para continuar.",
	"auth.not_admin": "Esta acción requiere una cuenta de administrador.",
	"auth.invalid_token": "Tu token de inicio de sesión no es válido o ha caducado.",
	"auth.user_not_found": "Esa cuenta ya no existe.",
	"auth.signups_disabled": "El registro de nuevas cuentas está desactivado en este servidor.",
	"auth.account_pending": "Tu cuenta aún está pendiente de aprobación.",
	"auth.account_disabled": "Esta cuenta ha sido desactivada.",
	"auth.password_change_required": "Debes cambiar tu contraseña antes de continuar.",
	"auth.unauthenticated": "Inicia sesión antes de canjear este servidor.",
	"auth.enrollment_expired": "El token de registro de este servidor ha caducado. Vuelve a registrarlo en el hub.",
	"auth.server_mismatch": "El token de registro no corresponde a este servidor.",
	"auth.missing_credentials": "Introduce tus credenciales para vincular esta cuenta.",
	"auth.invalid_credentials": "Las credenciales introducidas no son correctas.",
	"hub.not_enrolled": "Este servidor aún no está registrado en el hub.",
	"hub.token_required": "Se requiere un token de acceso al hub para esta acción.",
	"hub.jwt_invalid": "El token del hub no es válido o ha caducado.",
	"hub.protocol_unsupported": "La solicitud no usó el protocolo compatible con el hub.",
	"hub.internal_error": "El hub encontró un error inesperado. Inténtalo de nuevo en unos momentos.",
	"claim.code_not_found": "No se encontró ese código de canje. Revísalo e inténtalo otra vez.",
	"claim.code_expired": "Ese código de canje ha caducado. Genera uno nuevo e inténtalo otra vez.",
	"claim.code_already_claimed": "Ese código de canje ya se ha utilizado.",
	"server.not_found": "No se pudo encontrar ese servidor.",
	"server.not_owned": "Este servidor no pertenece a tu cuenta.",
	"server.relay_unavailable": "Este servidor está en línea, pero su túnel seguro de relay todavía no está conectado, así que sus bibliotecas no se pueden cargar a través del hub. Debería reconectarse automáticamente; vuelve a intentarlo en un momento.",
	"server.offline": "Este servidor está sin conexión, así que no se pueden cargar sus bibliotecas. Volverá a poder navegarse cuando se reconecte al hub.",
	"server.no_tunnel": "Este servidor está en línea, pero su túnel seguro de relay todavía no está conectado, así que sus bibliotecas no se pueden cargar a través del hub. Debería reconectarse automáticamente; vuelve a intentarlo en un momento.",
	"server.key_invalid": "La clave de firma del servidor no superó la verificación durante el canje. Vuelve a intentarlo.",
	"proxy.scope_denied": "Tu token de acceso no tiene el ámbito necesario para esta petición.",
	"quota.exceeded": "Has alcanzado el límite de tu cuota de ancho de banda.",
	"stream.limit": "Has alcanzado el número máximo de transmisiones simultáneas.",
	"stream.limit_exceeded": "Has alcanzado el límite de reproducciones simultáneas de este servidor. Detén una e inténtalo de nuevo.",
	"access.scheduled": "Este perfil solo está disponible dentro de su horario programado. Inténtalo más tarde.",
	"gateway.timeout": "El gateway del hub agotó el tiempo de espera al esperar a tu servidor. Inténtalo de nuevo.",
	"relay.client_ws_endpoint": "Este endpoint es un montaje WebSocket de cliente: no se puede abrir con una petición normal.",
	"relay.ws_http_endpoint": "Este endpoint es un montaje WebSocket del relay: no se puede abrir con una petición normal.",
	"relay.encode_error": "El relay no pudo codificar el mensaje. Inténtalo de nuevo.",
	"mcp.unknown_tool": "Esa herramienta MCP no existe.",
	"mcp.scope_denied": "Tu token MCP no permite usar esta herramienta.",
	"mcp.streaming_unsupported": "Las respuestas en streaming no son compatibles con esta superficie MCP.",
	"mcp.sse_not_acceptable": "Esta petición MCP debe aceptar una respuesta Server-Sent Events.",
	"mcp.unsupported_protocol_version": "Esta versión del protocolo MCP no es compatible.",
	"mcp_token.no_valid_scopes": "Ninguno de los ámbitos de token solicitados es válido.",
	"mcp_token.not_found": "Ese token de acceso MCP ya no existe.",
	"alexa.streaming_unsupported": "El streaming no es compatible con el adaptador de Alexa.",
	"alexa.malformed_envelope": "El sobre de la petición de Alexa tenía un formato incorrecto.",
	"alexa.verification_error": "No se pudo verificar la solicitud de Alexa. Inténtalo de nuevo.",
	"alexa.missing_cert_chain_url": "La solicitud de Alexa no incluía la URL de su cadena de certificados.",
	"alexa.missing_signature_header": "La solicitud de Alexa no incluía una cabecera de firma.",
	"alexa.empty_body": "La solicitud de Alexa llegó con el cuerpo vacío.",
	"alexa.cert_url_rejected": "La URL del certificado de la solicitud de Alexa estaba fuera de los dominios permitidos de Amazon.",
	"alexa.cert_fetch_failed": "El servidor no pudo descargar la cadena de certificados de la solicitud de Alexa.",
	"alexa.cert_chain_malformed": "La cadena de certificados enviada con la solicitud de Alexa tenía un formato incorrecto.",
	"alexa.signature_invalid": "La firma de la solicitud de Alexa no se pudo validar.",
	"alexa.cert_expired": "El certificado usado para firmar la solicitud de Alexa ha caducado.",
	"alexa.cert_san_mismatch": "El certificado de la solicitud de Alexa no se emitió para un dominio de Alexa.",
	"alexa.cert_chain_untrusted": "La cadena de certificados de la solicitud de Alexa no se respalda en la raíz de Amazon.",
	"alexa.timestamp_malformed": "La cabecera de marca de tiempo de la solicitud de Alexa no se pudo interpretar.",
	"alexa.timestamp_missing": "La solicitud de Alexa no incluía una cabecera de marca de tiempo.",
	"alexa.timestamp_stale": "La marca de tiempo de la solicitud de Alexa era demasiado antigua. Comprueba el reloj del servidor.",
	"tls.acme_not_implemented": "La emisión automática de certificados TLS aún no está disponible.",
	"csrf.invalid_origin": "El origen de la petición no superó la comprobación CSRF.",
	"user.not_found": "No se pudo encontrar el usuario de esta sesión.",
	"plugin.name.required": "Se requiere un nombre de complemento.",
	"plugin.not_found": "No se pudo encontrar ese complemento.",
	"plugin.url.required": "Se requiere la URL del complemento.",
	"plugin.url.invalid_scheme": "La URL del complemento debe usar http o https.",
	"plugin.url.blocked": "La política del servidor bloquea esta URL de complemento.",
	"plugin.install.failed": "La instalación del complemento falló.",
	"plugin.enable.failed": "No se pudo activar el complemento.",
	"plugin.settings.invalid": "La configuración del complemento no es válida.",
	"plugin.settings.validation_failed": "La configuración del complemento no superó la validación.",
	"plugin.test_not_supported": "Este complemento no admite pruebas automáticas.",
	"plugin.update.failed": "La actualización del complemento falló.",
	"plugin.update.no_source": "Este complemento no tiene fuente de actualización configurada.",
	"plugin.catalog.url.required": "Se requiere una URL de catálogo.",
	"plugin.catalog.url.duplicate": "Esa URL de catálogo de complementos ya está agregada.",
	"plugin.catalog.url.invalid": "La URL del catálogo de complementos no es válida.",
	"plugin.auto_update.invalid": "El ajuste de actualización automática no es válido.",
	"plugin.catalog.channel.invalid": "El canal de actualización del catálogo no es válido.",
	"library.delete_all.confirm_required": "Eliminar todas las bibliotecas a la vez requiere una confirmación explícita.",
	"metadata.tmdb_unconfigured": "Las búsquedas en TMDB no están configuradas en este servidor.",
	"metadata.tmdb_unreachable": "No se pudo contactar con el proveedor de metadatos. Inténtalo de nuevo más tarde.",
	"metadata.no_query": "Introduce un título para buscar en el proveedor de metadatos.",
	"metadata.bad_tmdb_id": "Ese identificador de TMDB no es válido.",
	"metadata.no_match": "No se encontró ninguna coincidencia de metadatos para este título.",
	"poster.missing_url": "Se requiere la URL de la imagen del póster.",
	"poster.poster_not_candidate": "Esa imagen no es una candidata de póster disponible para este título.",
	"profile.use_switch": "Para cambiar el perfil activo, usa la opción de cambiar de perfil.",
	"profile.last_profile": "Este es tu último perfil, por lo que no se puede eliminar.",
	"profile.no_pin": "Este perfil no tiene ningún PIN configurado que verificar.",
	"profile.pin_mismatch": "Ese PIN no es correcto.",
	"profile.not_found": "Ese perfil ya no existe. Elige otro.",
	"dlna.forbidden": "Este dispositivo no tiene permiso para usar DLNA en este servidor.",
	"casting.disabled": "La transmisión a dispositivos está desactivada en este servidor.",
	unauthorized: "No tienes autorización para gestionar el emparejamiento en este servidor.",
	invalid_secret: "El secreto de emparejamiento no es válido. Comienza el emparejamiento de nuevo.",
	pairing_not_pending: "No hay ninguna solicitud de emparejamiento esperando aprobación.",
	consent_required: "Este dispositivo debe aceptar el aviso de consentimiento para que el emparejamiento continúe.",
	pairing_not_found: "Esa solicitud de emparejamiento ya no existe.",
	storage_unavailable: "El almacenamiento de emparejamiento no está disponible ahora. Inténtalo de nuevo más tarde.",
	rate_limited: "Demasiadas peticiones; espera un momento e inténtalo de nuevo.",
	provider_unavailable: "El proveedor de autenticación no está disponible. Inténtalo de nuevo más tarde.",
	invalid_request: "La petición no era válida.",
	invalid_body: "Faltaba el cuerpo de la petición o tenía un formato incorrecto.",
	invalid_payload: "Faltaban los datos de la solicitud o tenían un formato incorrecto.",
	unknown_error: "Se produjo un error inesperado.",
	validation_failed: "Algunos campos no superaron la validación.",
	admin_required: "Esta acción requiere privilegios de administrador.",
	master_only: "Solo la cuenta maestra puede realizar esta acción.",
	invalid_url: "La URL proporcionada no es válida.",
	invalid_role: "El rol proporcionado no es válido.",
	invalid_permission: "El permiso proporcionado no es válido.",
	missing_url: "Se requiere una URL.",
	missing_name: "Se requiere un nombre.",
	missing_public_key: "Se requiere una clave pública.",
	missing_user_id: "Se requiere un ID de usuario.",
	missing_server_id: "Se requiere un ID de servidor.",
	not_server_owner: "Solo el propietario de este servidor puede gestionarlo.",
	peer_url_exists: "Ya hay un par agregado con esa URL.",
	peer_key_exists: "Ya hay un par agregado con esa clave pública.",
	peer_not_found: "No se pudo encontrar ese par federado.",
	offer_not_found: "No se pudo encontrar esa oferta de par.",
	offer_already_responded: "Esta oferta ya fue respondida.",
	delegation_not_found: "No se pudo encontrar esa delegación de acceso.",
	missing_peer_id: "Se requiere un ID de par.",
	missing_offer_id: "Se requiere un ID de oferta.",
	missing_delegation_id: "Se requiere un ID de delegación.",
	missing_library_id: "Se requiere un ID de biblioteca.",
	missing_library_name: "Se requiere un nombre de biblioteca.",
	leaf_hub_id_already_bound: "Ese ID de servidor ya está vinculado a otro par.",
	share_not_found: "No se pudo encontrar ese recurso compartido de biblioteca.",
	missing_share_id: "Se requiere un ID de recurso compartido.",
	missing_collaborator_email: "Se requiere el correo electrónico del colaborador.",
	share_exists: "Esta biblioteca ya está compartida con ese colaborador.",
	not_share_owner: "Solo el propietario puede gestionar este recurso compartido.",
	missing_permission: "Se requiere un nivel de permiso.",
	missing_link_id: "Se requiere un ID de enlace de invitación.",
	invite_link_not_found: "No se pudo encontrar ese enlace de invitación.",
	not_link_owner: "Solo el propietario puede gestionar este enlace de invitación.",
	missing_token: "Se requiere un token de invitación.",
	invalid_invite: "Esta invitación no es válida.",
	invite_expired_or_exhausted: "Esta invitación ha caducado o se ha agotado.",
	invalid_type: "El tipo de solicitud no es válido.",
	invalid_tmdb_id: "El identificador de TMDB de esta solicitud no es válido.",
	missing_title: "Se requiere un título.",
	missing_request_id: "Se requiere un ID de solicitud.",
	request_not_found: "No se pudo encontrar esa solicitud de contenido.",
	not_request_owner: "Solo quien hizo la solicitud puede gestionarla.",
	approve_failed: "No se pudo aprobar la solicitud.",
	deny_failed: "No se pudo rechazar la solicitud.",
	user_not_found: "No se pudo encontrar ese usuario.",
	cannot_delete_self: "No puedes eliminar tu propia cuenta desde aquí.",
	last_admin: "Esta es la última cuenta de administrador, por lo que no se puede cambiar de esta forma.",
	cannot_demote_self: "No puedes quitarte a ti mismo el rol de administrador.",
	invalid_quota: "El valor de la cuota no es válido.",
	invalid_throttle: "El valor de limitación no es válido.",
	update_check_dispatch_failed: "No se pudo iniciar la comprobación de actualizaciones. Inténtalo de nuevo.",
	"identity.missing_id": "No se seleccionó ninguna identidad vinculada para esta acción.",
	"identity.not_found": "No se pudo encontrar esa identidad vinculada.",
	"identity.last_sign_in_method": "Esta es la única forma de iniciar sesión que le queda a tu cuenta, así que no se puede desvincular.",
	"identity.already_linked": "Esa cuenta del proveedor ya está vinculada a otra cuenta de aquí.",
	"identity.invalid": "El proveedor no devolvió una identidad de cuenta utilizable.",
	"identity.link_unavailable": "La vinculación de cuentas no está disponible temporalmente en este servidor.",
	"identity.invalid_link_state": "La solicitud de vinculación caducó antes de terminar. Comienza de nuevo.",
	"provider.not_configured": "Aún no hay ningún proveedor de inicio de sesión configurado en este servidor.",
	"provider.unknown": "Ese proveedor de inicio de sesión no está disponible en este servidor.",
	"provider.not_found": "No se pudo encontrar ese proveedor de inicio de sesión.",
	"provider.invalid_type": "Ese proveedor no se puede usar con este tipo de inicio de sesión.",
	"provider.missing_client_id": "Se requiere el ID de cliente del proveedor.",
	"provider.missing_url": "Se requiere la URL del proveedor.",
	"provider.invalid_url": "La URL del proveedor no es válida.",
	"oauth.missing_code": "El proveedor de inicio de sesión no devolvió ningún código de autorización. Inténtalo de nuevo.",
	"oauth.missing_state": "El proveedor de inicio de sesión no devolvió ningún token de estado. Inténtalo de nuevo.",
	"oauth.invalid_state": "El intento de inicio de sesión ya no corresponde a este navegador o ha caducado. Inténtalo de nuevo.",
	"oauth.missing_redirect_uri": "Se requiere una dirección de redirección para continuar este inicio de sesión.",
	"oauth.invalid_redirect_uri": "Esa dirección de redirección no está en la lista permitida del servidor.",
	"oauth.callback_url_not_configured": "Este servidor aún no tiene una URL de devolución de llamada configurada.",
	"ldap.missing_host": "Se requiere el host del servidor LDAP.",
	"ldap.missing_base_dn": "Se requiere el DN base de LDAP.",
	"ldap.invalid_port": "El número de puerto de LDAP no es válido.",
	"ldap.connection_failed": "El servidor no pudo conectarse al directorio LDAP.",
	"ldap.bind_failed": "Las credenciales de LDAP no pudieron iniciar sesión en el directorio.",
	"ldap.error": "El directorio LDAP devolvió un error.",
	"ldap.runtime_error": "La prueba de conexión LDAP falló de forma inesperada.",
	"syncplay.create_failed": "No se pudo crear el grupo de visionado.",
	"syncplay.join_failed": "No se pudo unir al grupo de visionado.",
	"syncplay.leave_failed": "No se pudo salir del grupo de visionado.",
	"syncplay.group_limit_reached": "Se ha alcanzado el número máximo de grupos de visionado.",
	"syncplay.group_not_found": "Ese grupo de visionado ya no existe.",
	"syncplay.invalid_password": "La contraseña del grupo no es correcta.",
	"syncplay.group_full": "Ese grupo de visionado está lleno.",
	"syncplay.queue_limit_exceeded": "La cola de visionado ha alcanzado su tamaño máximo.",
	UNKNOWN_MESSAGE: "La sesión de sincronización no entendió ese mensaje.",
	HANDLER_ERROR: "La sesión de sincronización encontró un error interno al procesar tu petición.",
	NOT_AUTHENTICATED: "Inicia sesión en la sesión de sincronización antes de continuar.",
	NOT_IN_GROUP: "Ahora mismo no estás en ningún grupo de visionado.",
	NOT_HOST: "Solo el anfitrión del grupo puede hacer eso.",
	INVALID_NEW_HOST: "Ese miembro no puede asumir el rol de anfitrión.",
	MEMBER_NOT_FOUND: "No se pudo encontrar a ese miembro del grupo.",
	SAME_HOST: "Ese miembro ya es el anfitrión.",
	CREATE_FAILED: "No se pudo crear el grupo de visionado.",
	JOIN_FAILED: "No se pudo unir al grupo de visionado.",
	LEAVE_FAILED: "No se pudo salir del grupo de visionado.",
	PROTOCOL_VERSION_MISMATCH: "El protocolo de sincronización de este cliente no coincide con el del servidor."
}, rt = {
	"auth.required": "Connectez-vous pour continuer.",
	"auth.not_admin": "Cette action nécessite un compte administrateur.",
	"auth.invalid_token": "Votre jeton de connexion n’est pas valide ou a expiré.",
	"auth.user_not_found": "Ce compte n’existe plus.",
	"auth.signups_disabled": "Les créations de compte sont désactivées sur ce serveur.",
	"auth.account_pending": "Votre compte est encore en attente d’approbation.",
	"auth.account_disabled": "Ce compte a été désactivé.",
	"auth.password_change_required": "Vous devez modifier votre mot de passe avant de continuer.",
	"auth.unauthenticated": "Connectez-vous avant de réclamer ce serveur.",
	"auth.enrollment_expired": "Le jeton d’enregistrement de ce serveur a expiré. Enregistrez-le de nouveau auprès du hub.",
	"auth.server_mismatch": "Le jeton d’enregistrement ne correspond pas à ce serveur.",
	"auth.missing_credentials": "Saisissez vos identifiants pour lier ce compte.",
	"auth.invalid_credentials": "Les identifiants saisis ne sont pas corrects.",
	"hub.not_enrolled": "Ce serveur n’est pas encore enregistré auprès du hub.",
	"hub.token_required": "Un jeton d’accès au hub est requis pour cette action.",
	"hub.jwt_invalid": "Le jeton du hub n’est pas valide ou a expiré.",
	"hub.protocol_unsupported": "La requête n’a pas utilisé le protocole pris en charge par le hub.",
	"hub.internal_error": "Le hub a rencontré une erreur inattendue. Réessayez dans un instant.",
	"claim.code_not_found": "Ce code de réclamation est introuvable. Vérifiez-le et réessayez.",
	"claim.code_expired": "Ce code de réclamation a expiré. Générez-en un nouveau et réessayez.",
	"claim.code_already_claimed": "Ce code de réclamation a déjà été utilisé.",
	"server.not_found": "Impossible de trouver ce serveur.",
	"server.not_owned": "Ce serveur n’appartient pas à votre compte.",
	"server.relay_unavailable": "Ce serveur est en ligne, mais son tunnel relais sécurisé n’est pas encore connecté ; ses bibliothèques ne peuvent donc pas être chargées via le hub. Il devrait se reconnecter automatiquement — réessayez dans un instant.",
	"server.offline": "Ce serveur est hors ligne, ses bibliothèques ne peuvent donc pas être chargées. La navigation redeviendra possible dès sa reconnexion au hub.",
	"server.no_tunnel": "Ce serveur est en ligne, mais son tunnel relais sécurisé n’est pas encore connecté ; ses bibliothèques ne peuvent donc pas être chargées via le hub. Il devrait se reconnecter automatiquement — réessayez dans un instant.",
	"server.key_invalid": "La clé de signature du serveur n’a pas passé la vérification lors de la réclamation. Réessayez.",
	"proxy.scope_denied": "Votre jeton d’accès ne possède pas le périmètre requis pour cette requête.",
	"quota.exceeded": "Vous avez atteint la limite de votre quota de bande passante.",
	"stream.limit": "Vous avez atteint le nombre maximal de lectures simultanées.",
	"stream.limit_exceeded": "Vous avez atteint la limite de lectures simultanées de ce serveur. Arrêtez-en une et réessayez.",
	"access.scheduled": "Ce profil n’est disponible que pendant ses heures programmées. Réessayez plus tard.",
	"gateway.timeout": "La passerelle du hub a cessé d’attendre votre serveur. Réessayez.",
	"relay.client_ws_endpoint": "Ce point de montage est un WebSocket client — il ne peut pas être ouvert par une requête simple.",
	"relay.ws_http_endpoint": "Ce point de montage est un WebSocket du relais — il ne peut pas être ouvert par une requête simple.",
	"relay.encode_error": "Le relais n’a pas pu encoder le message. Réessayez.",
	"mcp.unknown_tool": "Cet outil MCP n’existe pas.",
	"mcp.scope_denied": "Votre jeton MCP n’autorise pas cet outil.",
	"mcp.streaming_unsupported": "Les réponses en flux ne sont pas prises en charge par cette interface MCP.",
	"mcp.sse_not_acceptable": "Cette requête MCP doit accepter une réponse Server-Sent Events.",
	"mcp.unsupported_protocol_version": "Cette version du protocole MCP n’est pas prise en charge.",
	"mcp_token.no_valid_scopes": "Aucun des périmètres de jeton demandés n’est valide.",
	"mcp_token.not_found": "Ce jeton d’accès MCP n’existe plus.",
	"alexa.streaming_unsupported": "Le flux n’est pas pris en charge par l’adaptateur Alexa.",
	"alexa.malformed_envelope": "L’enveloppe de la requête Alexa était mal formée.",
	"alexa.verification_error": "La requête Alexa n’a pas pu être vérifiée. Réessayez.",
	"alexa.missing_cert_chain_url": "La requête Alexa ne comportait pas d’URL de chaîne de certificats.",
	"alexa.missing_signature_header": "La requête Alexa ne comportait pas d’en-tête de signature.",
	"alexa.empty_body": "La requête Alexa est arrivée avec un corps vide.",
	"alexa.cert_url_rejected": "L’URL du certificat de la requête Alexa sortait des domaines autorisés d’Amazon.",
	"alexa.cert_fetch_failed": "Le serveur n’a pas pu récupérer la chaîne de certificats de la requête Alexa.",
	"alexa.cert_chain_malformed": "La chaîne de certificats envoyée avec la requête Alexa était mal formée.",
	"alexa.signature_invalid": "La signature de la requête Alexa n’a pas été validée.",
	"alexa.cert_expired": "Le certificat ayant signé la requête Alexa a expiré.",
	"alexa.cert_san_mismatch": "Le certificat de la requête Alexa n’a pas été émis pour un domaine Alexa.",
	"alexa.cert_chain_untrusted": "La chaîne de certificats de la requête Alexa ne s’ancre pas sur la racine d’Amazon.",
	"alexa.timestamp_malformed": "L’en-tête d’horodatage de la requête Alexa était illisible.",
	"alexa.timestamp_missing": "La requête Alexa ne comportait pas d’en-tête d’horodatage.",
	"alexa.timestamp_stale": "L’horodatage de la requête Alexa était trop ancien. Vérifiez l’horloge du serveur.",
	"tls.acme_not_implemented": "La délivrance automatique de certificats TLS n’est pas encore disponible.",
	"csrf.invalid_origin": "L’origine de la requête a échoué au contrôle CSRF.",
	"user.not_found": "Impossible de trouver l’utilisateur de cette session.",
	"plugin.name.required": "Le nom du plugin est requis.",
	"plugin.not_found": "Impossible de trouver ce plugin.",
	"plugin.url.required": "L’URL du plugin est requise.",
	"plugin.url.invalid_scheme": "L’URL du plugin doit utiliser http ou https.",
	"plugin.url.blocked": "Cette URL de plugin est bloquée par la politique du serveur.",
	"plugin.install.failed": "L’installation du plugin a échoué.",
	"plugin.enable.failed": "L’activation du plugin a échoué.",
	"plugin.settings.invalid": "Les paramètres du plugin ne sont pas valides.",
	"plugin.settings.validation_failed": "Les paramètres du plugin ont échoué à la validation.",
	"plugin.test_not_supported": "Ce plugin ne prend pas en charge les tests automatiques.",
	"plugin.update.failed": "La mise à jour du plugin a échoué.",
	"plugin.update.no_source": "Ce plugin n’a aucune source de mise à jour configurée.",
	"plugin.catalog.url.required": "L’URL du catalogue est requise.",
	"plugin.catalog.url.duplicate": "Cette URL de catalogue de plugins est déjà ajoutée.",
	"plugin.catalog.url.invalid": "L’URL du catalogue de plugins n’est pas valide.",
	"plugin.auto_update.invalid": "Le réglage de mise à jour automatique n’est pas valide.",
	"plugin.catalog.channel.invalid": "Le canal de mise à jour du catalogue n’est pas valide.",
	"library.delete_all.confirm_required": "Supprimer toutes les bibliothèques à la fois exige une confirmation explicite.",
	"metadata.tmdb_unconfigured": "Les recherches TMDB ne sont pas configurées sur ce serveur.",
	"metadata.tmdb_unreachable": "Le fournisseur de métadonnées est injoignable. Réessayez plus tard.",
	"metadata.no_query": "Saisissez un titre pour interroger le fournisseur de métadonnées.",
	"metadata.bad_tmdb_id": "Cet identifiant TMDB n’est pas valide.",
	"metadata.no_match": "Aucune correspondance de métadonnées trouvée pour ce titre.",
	"poster.missing_url": "L’URL de l’image de l’affiche est requise.",
	"poster.poster_not_candidate": "Cette image n’est pas une affiche candidate disponible pour ce titre.",
	"profile.use_switch": "Pour changer de profil actif, utilisez plutôt la bascule de profil.",
	"profile.last_profile": "C’est votre dernier profil, il ne peut donc pas être supprimé.",
	"profile.no_pin": "Aucun PIN n’est configuré sur ce profil pour le vérifier.",
	"profile.pin_mismatch": "Ce PIN n’est pas correct.",
	"profile.not_found": "Ce profil n’existe plus. Choisissez-en un autre.",
	"dlna.forbidden": "Cet appareil n’est pas autorisé à utiliser DLNA sur ce serveur.",
	"casting.disabled": "La diffusion est désactivée sur ce serveur.",
	unauthorized: "Vous n’êtes pas autorisé à gérer le couplage sur ce serveur.",
	invalid_secret: "Le secret de couplage n’est pas valide. Relancez le couplage.",
	pairing_not_pending: "Aucune demande de couplage n’attend d’approbation.",
	consent_required: "Cet appareil doit accepter la demande de consentement pour poursuivre le couplage.",
	pairing_not_found: "Cette demande de couplage n’existe plus.",
	storage_unavailable: "Le stockage de couplage est indisponible pour le moment. Réessayez plus tard.",
	rate_limited: "Trop de requêtes — attendez un instant et réessayez.",
	provider_unavailable: "Le fournisseur d’authentification est indisponible. Réessayez plus tard.",
	invalid_request: "La requête n’était pas valide.",
	invalid_body: "Le corps de la requête était absent ou mal formé.",
	invalid_payload: "Les données de la requête étaient absentes ou mal formées.",
	unknown_error: "Une erreur inattendue s’est produite.",
	validation_failed: "Certains champs ont échoué à la validation.",
	admin_required: "Les privilèges d’administrateur sont requis pour cette action.",
	master_only: "Seul le compte principal peut effectuer cette action.",
	invalid_url: "L’URL fournie n’est pas valide.",
	invalid_role: "Le rôle fourni n’est pas valide.",
	invalid_permission: "La permission fournie n’est pas valide.",
	missing_url: "Une URL est requise.",
	missing_name: "Un nom est requis.",
	missing_public_key: "Une clé publique est requise.",
	missing_user_id: "Un identifiant d’utilisateur est requis.",
	missing_server_id: "Un identifiant de serveur est requis.",
	not_server_owner: "Seul le propriétaire de ce serveur peut le gérer.",
	peer_url_exists: "Un pair avec cette URL est déjà ajouté.",
	peer_key_exists: "Un pair avec cette clé publique est déjà ajouté.",
	peer_not_found: "Impossible de trouver ce pair fédéré.",
	offer_not_found: "Impossible de trouver cette offre de pair.",
	offer_already_responded: "Cette offre a déjà reçu une réponse.",
	delegation_not_found: "Impossible de trouver cette délégation d’accès.",
	missing_peer_id: "Un identifiant de pair est requis.",
	missing_offer_id: "Un identifiant d’offre est requis.",
	missing_delegation_id: "Un identifiant de délégation est requis.",
	missing_library_id: "Un identifiant de bibliothèque est requis.",
	missing_library_name: "Un nom de bibliothèque est requis.",
	leaf_hub_id_already_bound: "Cet identifiant de serveur est déjà associé à un autre pair.",
	share_not_found: "Impossible de trouver ce partage de bibliothèque.",
	missing_share_id: "Un identifiant de partage est requis.",
	missing_collaborator_email: "Une adresse e-mail de collaborateur est requise.",
	share_exists: "Cette bibliothèque est déjà partagée avec ce collaborateur.",
	not_share_owner: "Seul le propriétaire du partage peut le gérer.",
	missing_permission: "Un niveau de permission est requis.",
	missing_link_id: "Un identifiant de lien d’invitation est requis.",
	invite_link_not_found: "Impossible de trouver ce lien d’invitation.",
	not_link_owner: "Seul le propriétaire peut gérer ce lien d’invitation.",
	missing_token: "Un jeton d’invitation est requis.",
	invalid_invite: "Cette invitation n’est pas valide.",
	invite_expired_or_exhausted: "Cette invitation a expiré ou a été entièrement utilisée.",
	invalid_type: "Le type de demande n’est pas valide.",
	invalid_tmdb_id: "L’identifiant TMDB de cette demande n’est pas valide.",
	missing_title: "Un titre est requis.",
	missing_request_id: "Un identifiant de demande est requis.",
	request_not_found: "Impossible de trouver cette demande de média.",
	not_request_owner: "Seul l’auteur de la demande peut la gérer.",
	approve_failed: "La demande n’a pas pu être approuvée.",
	deny_failed: "La demande n’a pas pu être refusée.",
	user_not_found: "Impossible de trouver cet utilisateur.",
	cannot_delete_self: "Vous ne pouvez pas supprimer votre propre compte depuis ici.",
	last_admin: "C’est le dernier compte administrateur, il ne peut donc pas être modifié ainsi.",
	cannot_demote_self: "Vous ne pouvez pas retirer votre propre rôle d’administrateur.",
	invalid_quota: "La valeur du quota n’est pas valide.",
	invalid_throttle: "La valeur de limitation n’est pas valide.",
	update_check_dispatch_failed: "La vérification des mises à jour n’a pas pu être lancée. Réessayez.",
	"identity.missing_id": "Aucune identité liée n’a été sélectionnée pour cette action.",
	"identity.not_found": "Cette identité liée est introuvable.",
	"identity.last_sign_in_method": "C’est le seul moyen de connexion restant pour votre compte ; il ne peut donc pas être dissocié.",
	"identity.already_linked": "Ce compte fournisseur est déjà lié à un autre compte d’ici.",
	"identity.invalid": "Le fournisseur n’a pas renvoyé d’identité de compte exploitable.",
	"identity.link_unavailable": "La liaison de comptes est temporairement indisponible sur ce serveur.",
	"identity.invalid_link_state": "La demande de liaison a expiré avant d’aboutir. Reprenez depuis le début.",
	"provider.not_configured": "Aucun fournisseur de connexion n’est encore configuré sur ce serveur.",
	"provider.unknown": "Ce fournisseur de connexion n’est pas disponible sur ce serveur.",
	"provider.not_found": "Ce fournisseur de connexion est introuvable.",
	"provider.invalid_type": "Ce fournisseur ne peut pas servir à ce type de connexion.",
	"provider.missing_client_id": "L’identifiant client du fournisseur est requis.",
	"provider.missing_url": "L’URL du fournisseur est requise.",
	"provider.invalid_url": "L’URL du fournisseur n’est pas valide.",
	"oauth.missing_code": "Le fournisseur de connexion n’a renvoyé aucun code d’autorisation. Reconnectez-vous.",
	"oauth.missing_state": "Le fournisseur de connexion n’a renvoyé aucun jeton d’état. Reconnectez-vous.",
	"oauth.invalid_state": "La tentative de connexion ne correspond plus à ce navigateur ou a expiré. Réessayez.",
	"oauth.missing_redirect_uri": "Une adresse de redirection est requise pour poursuivre cette connexion.",
	"oauth.invalid_redirect_uri": "Cette adresse de redirection ne figure pas dans la liste autorisée du serveur.",
	"oauth.callback_url_not_configured": "Ce serveur n’a encore aucune URL de rappel de connexion configurée.",
	"ldap.missing_host": "L’hôte du serveur LDAP est requis.",
	"ldap.missing_base_dn": "Le DN de base LDAP est requis.",
	"ldap.invalid_port": "Le numéro de port LDAP n’est pas valide.",
	"ldap.connection_failed": "Le serveur n’a pas pu se connecter à l’annuaire LDAP.",
	"ldap.bind_failed": "Les identifiants LDAP n’ont pas pu ouvrir de session sur l’annuaire.",
	"ldap.error": "L’annuaire LDAP a renvoyé une erreur.",
	"ldap.runtime_error": "Le test de connexion LDAP a échoué de façon inattendue.",
	"syncplay.create_failed": "Impossible de créer le groupe de visionnage.",
	"syncplay.join_failed": "Impossible de rejoindre le groupe de visionnage.",
	"syncplay.leave_failed": "Impossible de quitter le groupe de visionnage.",
	"syncplay.group_limit_reached": "Le nombre maximal de groupes de visionnage a été atteint.",
	"syncplay.group_not_found": "Ce groupe de visionnage n’existe plus.",
	"syncplay.invalid_password": "Le mot de passe du groupe n’est pas correct.",
	"syncplay.group_full": "Ce groupe de visionnage est complet.",
	"syncplay.queue_limit_exceeded": "La file d’attente de visionnage a atteint sa taille maximale.",
	UNKNOWN_MESSAGE: "La session de synchronisation n’a pas compris ce message.",
	HANDLER_ERROR: "La session de synchronisation a rencontré une erreur interne en traitant votre requête.",
	NOT_AUTHENTICATED: "Connectez-vous à la session de synchronisation avant de continuer.",
	NOT_IN_GROUP: "Vous ne faites pas partie d’un groupe de visionnage actuellement.",
	NOT_HOST: "Seul l’hôte du groupe peut faire cela.",
	INVALID_NEW_HOST: "Ce membre ne peut pas reprendre le rôle d’hôte.",
	MEMBER_NOT_FOUND: "Impossible de trouver ce membre du groupe.",
	SAME_HOST: "Ce membre est déjà l’hôte.",
	CREATE_FAILED: "Impossible de créer le groupe de visionnage.",
	JOIN_FAILED: "Impossible de rejoindre le groupe de visionnage.",
	LEAVE_FAILED: "Impossible de quitter le groupe de visionnage.",
	PROTOCOL_VERSION_MISMATCH: "Le protocole de synchronisation de ce client ne correspond pas à celui du serveur."
}, it = {
	"auth.required": "Bitte melden Sie sich an, um fortzufahren.",
	"auth.not_admin": "Diese Aktion erfordert ein Administratorkonto.",
	"auth.invalid_token": "Ihr Anmelde-Token ist ungültig oder abgelaufen.",
	"auth.user_not_found": "Dieses Konto gibt es nicht mehr.",
	"auth.signups_disabled": "Neue Konten sind auf diesem Server deaktiviert.",
	"auth.account_pending": "Ihr Konto wartet noch auf Genehmigung.",
	"auth.account_disabled": "Dieses Konto wurde deaktiviert.",
	"auth.password_change_required": "Sie müssen Ihr Passwort ändern, bevor Sie fortfahren.",
	"auth.unauthenticated": "Bitte melden Sie sich an, bevor Sie diesen Server registrieren.",
	"auth.enrollment_expired": "Das Registrierungs-Token dieses Servers ist abgelaufen. Registrieren Sie ihn erneut am Hub.",
	"auth.server_mismatch": "Das Registrierungs-Token passt nicht zu diesem Server.",
	"auth.missing_credentials": "Geben Sie Ihre Zugangsdaten ein, um dieses Konto zu verknüpfen.",
	"auth.invalid_credentials": "Die eingegebenen Zugangsdaten sind nicht korrekt.",
	"hub.not_enrolled": "Dieser Server ist beim Hub noch nicht registriert.",
	"hub.token_required": "Für diese Aktion ist ein Hub-Zugriffstoken erforderlich.",
	"hub.jwt_invalid": "Das Hub-Token ist ungültig oder abgelaufen.",
	"hub.protocol_unsupported": "Die Anfrage hat das vom Hub unterstützte Protokoll nicht verwendet.",
	"hub.internal_error": "Der Hub hat einen unerwarteten Fehler entdeckt. Versuchen Sie es gleich erneut.",
	"claim.code_not_found": "Dieser Registrierungscode wurde nicht gefunden. Prüfen Sie ihn und versuchen Sie es erneut.",
	"claim.code_expired": "Dieser Registrierungscode ist abgelaufen. Erzeugen Sie einen neuen und versuchen Sie es erneut.",
	"claim.code_already_claimed": "Dieser Registrierungscode wurde bereits verwendet.",
	"server.not_found": "Dieser Server wurde nicht gefunden.",
	"server.not_owned": "Dieser Server gehört nicht zu Ihrem Konto.",
	"server.relay_unavailable": "Dieser Server ist online, aber sein sicherer Relay-Tunnel ist noch nicht verbunden; seine Bibliotheken können daher nicht über den Hub geladen werden. Die Verbindung sollte automatisch wiederhergestellt werden — versuchen Sie es gleich erneut.",
	"server.offline": "Dieser Server ist offline, seine Bibliotheken können daher nicht geladen werden. Nach der Wiederverbindung mit dem Hub ist er wieder durchstöberbar.",
	"server.no_tunnel": "Dieser Server ist online, aber sein sicherer Relay-Tunnel ist noch nicht verbunden; seine Bibliotheken können daher nicht über den Hub geladen werden. Die Verbindung sollte automatisch wiederhergestellt werden — versuchen Sie es gleich erneut.",
	"server.key_invalid": "Der Signaturschlüssel des Servers hat die Prüfung beim Registrieren nicht bestanden. Versuchen Sie es erneut.",
	"proxy.scope_denied": "Ihr Zugriffstoken hat nicht die erforderliche Berechtigung für diese Anfrage.",
	"quota.exceeded": "Sie haben das Limit Ihres Bandbreitenkontingents erreicht.",
	"stream.limit": "Sie haben die höchste zulässige Anzahl gleichzeitiger Wiedergaben erreicht.",
	"stream.limit_exceeded": "Sie haben das Limit gleichzeitiger Streams auf diesem Server erreicht. Beenden Sie einen und versuchen Sie es erneut.",
	"access.scheduled": "Dieses Profil ist nur innerhalb seines geplanten Zeitfensters verfügbar. Versuchen Sie es später erneut.",
	"gateway.timeout": "Das Hub-Gateway hat beim Warten auf Ihren Server eine Zeitüberschreitung erreicht. Versuchen Sie es erneut.",
	"relay.client_ws_endpoint": "Dieser Endpunkt ist ein Client-WebSocket-Mount — er lässt sich nicht mit einer einfachen Anfrage öffnen.",
	"relay.ws_http_endpoint": "Dieser Endpunkt ist ein Relay-WebSocket-Mount — er lässt sich nicht mit einer einfachen Anfrage öffnen.",
	"relay.encode_error": "Das Relay konnte die Nachricht nicht kodieren. Versuchen Sie es erneut.",
	"mcp.unknown_tool": "Dieses MCP-Werkzeug existiert nicht.",
	"mcp.scope_denied": "Ihr MCP-Token erlaubt dieses Werkzeug nicht.",
	"mcp.streaming_unsupported": "Streaming-Antworten werden von dieser MCP-Oberfläche nicht unterstützt.",
	"mcp.sse_not_acceptable": "Diese MCP-Anfrage muss eine Server-Sent-Events-Antwort akzeptieren.",
	"mcp.unsupported_protocol_version": "Diese Version des MCP-Protokolls wird nicht unterstützt.",
	"mcp_token.no_valid_scopes": "Keiner der angeforderten Token-Berechtigungen ist gültig.",
	"mcp_token.not_found": "Dieses MCP-Zugriffstoken gibt es nicht mehr.",
	"alexa.streaming_unsupported": "Streaming wird über den Alexa-Adapter nicht unterstützt.",
	"alexa.malformed_envelope": "Der Anfrageumschlag von Alexa war fehlerhaft aufgebaut.",
	"alexa.verification_error": "Die Alexa-Anfrage konnte nicht überprüft werden. Versuchen Sie es erneut.",
	"alexa.missing_cert_chain_url": "Der Alexa-Anfrage fehlte die URL der Zertifikatskette.",
	"alexa.missing_signature_header": "Der Alexa-Anfrage fehlte der Signatur-Header.",
	"alexa.empty_body": "Die Alexa-Anfrage kam mit einem leeren Inhalt.",
	"alexa.cert_url_rejected": "Die Zertifikats-URL der Alexa-Anfrage lag außerhalb der erlaubten Amazon-Domains.",
	"alexa.cert_fetch_failed": "Der Server konnte die Zertifikatskette der Alexa-Anfrage nicht abrufen.",
	"alexa.cert_chain_malformed": "Die mit der Alexa-Anfrage gesendete Zertifikatskette war fehlerhaft aufgebaut.",
	"alexa.signature_invalid": "Die Signatur der Alexa-Anfrage wurde nicht anerkannt.",
	"alexa.cert_expired": "Das Zertifikat der Alexa-Anfrage ist abgelaufen.",
	"alexa.cert_san_mismatch": "Das Zertifikat der Alexa-Anfrage wurde nicht für eine Alexa-Domain ausgestellt.",
	"alexa.cert_chain_untrusted": "Die Zertifikatskette der Alexa-Anfrage stützt sich nicht auf das Amazon-Stammzertifikat.",
	"alexa.timestamp_malformed": "Der Zeitstempel-Header der Alexa-Anfrage war nicht lesbar.",
	"alexa.timestamp_missing": "Der Alexa-Anfrage fehlte der Zeitstempel-Header.",
	"alexa.timestamp_stale": "Der Zeitstempel der Alexa-Anfrage war zu alt. Prüfen Sie die Serveruhr.",
	"tls.acme_not_implemented": "Die automatische TLS-Zertifikatsausstellung ist noch nicht verfügbar.",
	"csrf.invalid_origin": "Die Anfrageherkunft hat die CSRF-Prüfung nicht bestanden.",
	"user.not_found": "Der Benutzer dieser Sitzung wurde nicht gefunden.",
	"plugin.name.required": "Ein Plugin-Name ist erforderlich.",
	"plugin.not_found": "Dieses Plugin wurde nicht gefunden.",
	"plugin.url.required": "Eine Plugin-URL ist erforderlich.",
	"plugin.url.invalid_scheme": "Die Plugin-URL muss http oder https verwenden.",
	"plugin.url.blocked": "Diese Plugin-URL wird durch die Server-Richtlinie blockiert.",
	"plugin.install.failed": "Die Installation des Plugins ist fehlgeschlagen.",
	"plugin.enable.failed": "Das Aktivieren des Plugins ist fehlgeschlagen.",
	"plugin.settings.invalid": "Die Plugin-Einstellungen sind ungültig.",
	"plugin.settings.validation_failed": "Die Plugin-Einstellungen haben die Prüfung nicht bestanden.",
	"plugin.test_not_supported": "Dieses Plugin unterstützt keine Selbsttests.",
	"plugin.update.failed": "Das Aktualisieren des Plugins ist fehlgeschlagen.",
	"plugin.update.no_source": "Für dieses Plugin ist keine Update-Quelle eingerichtet.",
	"plugin.catalog.url.required": "Eine Katalog-URL ist erforderlich.",
	"plugin.catalog.url.duplicate": "Diese Plugin-Katalog-URL wurde bereits hinzugefügt.",
	"plugin.catalog.url.invalid": "Die Plugin-Katalog-URL ist ungültig.",
	"plugin.auto_update.invalid": "Die Einstellung für automatische Updates ist ungültig.",
	"plugin.catalog.channel.invalid": "Der Update-Kanal des Katalogs ist ungültig.",
	"library.delete_all.confirm_required": "Das gleichzeitige Löschen aller Bibliotheken erfordert eine ausdrückliche Bestätigung.",
	"metadata.tmdb_unconfigured": "TMDB-Suchen sind auf diesem Server nicht eingerichtet.",
	"metadata.tmdb_unreachable": "Der Metadaten-Anbieter ist nicht erreichbar. Versuchen Sie es später erneut.",
	"metadata.no_query": "Geben Sie einen Titel ein, um den Metadaten-Anbieter zu durchsuchen.",
	"metadata.bad_tmdb_id": "Diese TMDB-Kennung ist nicht gültig.",
	"metadata.no_match": "Für diesen Titel wurden keine Metadaten gefunden.",
	"poster.missing_url": "Eine Poster-Bild-URL ist erforderlich.",
	"poster.poster_not_candidate": "Dieses Bild ist kein verfügbares Poster-Kandidat für diesen Titel.",
	"profile.use_switch": "Um das aktive Profil zu wechseln, nutzen Sie stattdessen die Profilumschaltung.",
	"profile.last_profile": "Dies ist Ihr letztes Profil, es kann daher nicht gelöscht werden.",
	"profile.no_pin": "Für dieses Profil ist keine PIN eingerichtet, die geprüft werden könnte.",
	"profile.pin_mismatch": "Diese PIN ist nicht korrekt.",
	"profile.not_found": "Dieses Profil existiert nicht mehr. Wählen Sie ein anderes aus.",
	"dlna.forbidden": "Dieses Gerät darf DLNA auf diesem Server nicht verwenden.",
	"casting.disabled": "Casting ist auf diesem Server deaktiviert.",
	unauthorized: "Sie sind nicht berechtigt, die Kopplung auf diesem Server zu verwalten.",
	invalid_secret: "Das Kopplungsgeheimnis ist ungültig. Starten Sie die Kopplung erneut.",
	pairing_not_pending: "Es wartet keine Kopplungsanfrage auf ihre Genehmigung.",
	consent_required: "Dieses Gerät muss die Zustimmung annehmen, damit die Kopplung fortfahren kann.",
	pairing_not_found: "Diese Kopplungsanfrage gibt es nicht mehr.",
	storage_unavailable: "Der Kopplungsspeicher ist zurzeit nicht verfügbar. Versuchen Sie es später erneut.",
	rate_limited: "Zu viele Anfragen — warten Sie einen Moment und versuchen Sie es erneut.",
	provider_unavailable: "Der Authentifizierungsanbieter ist nicht verfügbar. Versuchen Sie es später erneut.",
	invalid_request: "Die Anfrage war nicht gültig.",
	invalid_body: "Der Anfragekörper fehlte oder war fehlerhaft aufgebaut.",
	invalid_payload: "Die Anfragedaten fehlten oder waren fehlerhaft aufgebaut.",
	unknown_error: "Ein unerwarteter Fehler ist aufgetreten.",
	validation_failed: "Einige Felder haben die Prüfung nicht bestanden.",
	admin_required: "Für diese Aktion sind Administratorrechte erforderlich.",
	master_only: "Nur das Master-Konto kann diese Aktion ausführen.",
	invalid_url: "Die angegebene URL ist ungültig.",
	invalid_role: "Die angegebene Rolle ist ungültig.",
	invalid_permission: "Die angegebene Berechtigung ist ungültig.",
	missing_url: "Eine URL ist erforderlich.",
	missing_name: "Ein Name ist erforderlich.",
	missing_public_key: "Ein öffentlicher Schlüssel ist erforderlich.",
	missing_user_id: "Eine Benutzer-ID ist erforderlich.",
	missing_server_id: "Eine Server-ID ist erforderlich.",
	not_server_owner: "Nur der Eigentümer dieses Servers kann ihn verwalten.",
	peer_url_exists: "Ein Peer mit dieser URL wurde bereits hinzugefügt.",
	peer_key_exists: "Ein Peer mit diesem öffentlichen Schlüssel wurde bereits hinzugefügt.",
	peer_not_found: "Dieser föderierte Peer wurde nicht gefunden.",
	offer_not_found: "Dieses Peer-Angebot wurde nicht gefunden.",
	offer_already_responded: "Auf dieses Angebot wurde bereits geantwortet.",
	delegation_not_found: "Diese Zugriffsdelegation wurde nicht gefunden.",
	missing_peer_id: "Eine Peer-ID ist erforderlich.",
	missing_offer_id: "Eine Angebots-ID ist erforderlich.",
	missing_delegation_id: "Eine Delegations-ID ist erforderlich.",
	missing_library_id: "Eine Bibliotheks-ID ist erforderlich.",
	missing_library_name: "Ein Bibliotheksname ist erforderlich.",
	leaf_hub_id_already_bound: "Diese Server-ID ist bereits mit einem anderen Peer verknüpft.",
	share_not_found: "Diese Bibliotheksfreigabe wurde nicht gefunden.",
	missing_share_id: "Eine Freigabe-ID ist erforderlich.",
	missing_collaborator_email: "Eine E-Mail-Adresse für die Mitarbeit ist erforderlich.",
	share_exists: "Diese Bibliothek ist bereits mit dieser Person geteilt.",
	not_share_owner: "Nur der Eigentümer der Freigabe kann sie verwalten.",
	missing_permission: "Eine Berechtigungsstufe ist erforderlich.",
	missing_link_id: "Eine Einladungslink-ID ist erforderlich.",
	invite_link_not_found: "Dieser Einladungslink wurde nicht gefunden.",
	not_link_owner: "Nur der Eigentümer kann diesen Einladungslink verwalten.",
	missing_token: "Ein Einladungs-Token ist erforderlich.",
	invalid_invite: "Diese Einladung ist ungültig.",
	invite_expired_or_exhausted: "Diese Einladung ist abgelaufen oder wurde vollständig genutzt.",
	invalid_type: "Der Typ der Anfrage ist ungültig.",
	invalid_tmdb_id: "Die TMDB-Kennung dieser Anfrage ist ungültig.",
	missing_title: "Ein Titel ist erforderlich.",
	missing_request_id: "Eine Anfrage-ID ist erforderlich.",
	request_not_found: "Diese Medienanfrage wurde nicht gefunden.",
	not_request_owner: "Nur der Anfragesteller kann sie verwalten.",
	approve_failed: "Die Anfrage konnte nicht genehmigt werden.",
	deny_failed: "Die Anfrage konnte nicht abgelehnt werden.",
	user_not_found: "Dieser Benutzer wurde nicht gefunden.",
	cannot_delete_self: "Sie können Ihr eigenes Konto hier nicht löschen.",
	last_admin: "Dies ist das letzte Administratorkonto, es kann auf diesem Weg nicht geändert werden.",
	cannot_demote_self: "Sie können sich die Administratorrolle nicht selbst entziehen.",
	invalid_quota: "Der Kontingentwert ist ungültig.",
	invalid_throttle: "Der Drosselungswert ist ungültig.",
	update_check_dispatch_failed: "Die Update-Prüfung konnte nicht gestartet werden. Versuchen Sie es erneut.",
	"identity.missing_id": "Für diese Aktion wurde keine verknüpfte Identität ausgewählt.",
	"identity.not_found": "Diese verknüpfte Identität wurde nicht gefunden.",
	"identity.last_sign_in_method": "Dies ist die einzige verbleibende Anmeldemethode Ihres Kontos; deshalb kann sie nicht getrennt werden.",
	"identity.already_linked": "Dieses Anbieterkonto ist bereits mit einem anderen Konto hier verknüpft.",
	"identity.invalid": "Der Anbieter hat keine nutzbare Konto-Identität zurückgegeben.",
	"identity.link_unavailable": "Die Kontoverknüpfung ist auf diesem Server vorübergehend nicht verfügbar.",
	"identity.invalid_link_state": "Die Verknüpfungsanfrage ist vor dem Abschluss abgelaufen. Beginnen Sie erneut.",
	"provider.not_configured": "Auf diesem Server ist noch kein Anmelde-Anbieter eingerichtet.",
	"provider.unknown": "Dieser Anmelde-Anbieter ist auf diesem Server nicht verfügbar.",
	"provider.not_found": "Dieser Anmelde-Anbieter wurde nicht gefunden.",
	"provider.invalid_type": "Dieser Anbieter kann für diese Art der Anmeldung nicht verwendet werden.",
	"provider.missing_client_id": "Die Client-ID des Anbieters ist erforderlich.",
	"provider.missing_url": "Die URL des Anbieters ist erforderlich.",
	"provider.invalid_url": "Die URL des Anbieters ist nicht gültig.",
	"oauth.missing_code": "Der Anmelde-Anbieter hat keinen Autorisierungscode zurückgegeben. Melden Sie sich erneut an.",
	"oauth.missing_state": "Der Anmelde-Anbieter hat keinen State-Token zurückgegeben. Melden Sie sich erneut an.",
	"oauth.invalid_state": "Der Anmeldeversuch passt nicht mehr zu diesem Browser oder ist abgelaufen. Versuchen Sie es erneut.",
	"oauth.missing_redirect_uri": "Für diese Anmeldung ist eine Umleitungsadresse erforderlich.",
	"oauth.invalid_redirect_uri": "Diese Umleitungsadresse steht nicht auf der Erlaubnisliste des Servers.",
	"oauth.callback_url_not_configured": "Dieser Server hat noch keine Rückruf-URL für Anmeldungen eingerichtet.",
	"ldap.missing_host": "Der Host des LDAP-Servers ist erforderlich.",
	"ldap.missing_base_dn": "Der Basis-DN von LDAP ist erforderlich.",
	"ldap.invalid_port": "Die LDAP-Portnummer ist nicht gültig.",
	"ldap.connection_failed": "Der Server konnte sich nicht mit dem LDAP-Verzeichnis verbinden.",
	"ldap.bind_failed": "Die LDAP-Zugangsdaten konnten sich nicht am Verzeichnis anmelden.",
	"ldap.error": "Das LDAP-Verzeichnis hat einen Fehler zurückgegeben.",
	"ldap.runtime_error": "Der LDAP-Verbindungstest ist unerwartet fehlgeschlagen.",
	"syncplay.create_failed": "Die Wiedergabegruppe konnte nicht erstellt werden.",
	"syncplay.join_failed": "Der Wiedergabegruppe konnte nicht beigetreten werden.",
	"syncplay.leave_failed": "Die Wiedergabegruppe konnte nicht verlassen werden.",
	"syncplay.group_limit_reached": "Die höchste Anzahl von Wiedergabegruppen ist erreicht.",
	"syncplay.group_not_found": "Diese Wiedergabegruppe gibt es nicht mehr.",
	"syncplay.invalid_password": "Das Gruppenpasswort ist nicht korrekt.",
	"syncplay.group_full": "Diese Wiedergabegruppe ist voll.",
	"syncplay.queue_limit_exceeded": "Die Wiedergabewarteschlange hat ihre maximale Größe erreicht.",
	UNKNOWN_MESSAGE: "Die Synchronisationssitzung hat diese Nachricht nicht verstanden.",
	HANDLER_ERROR: "In der Synchronisationssitzung ist beim Verarbeiten Ihrer Anfrage ein interner Fehler aufgetreten.",
	NOT_AUTHENTICATED: "Melden Sie sich bei der Synchronisationssitzung an, bevor Sie fortfahren.",
	NOT_IN_GROUP: "Sie sind zurzeit in keiner Wiedergabegruppe.",
	NOT_HOST: "Nur der Host der Gruppe kann das tun.",
	INVALID_NEW_HOST: "Dieses Mitglied kann die Host-Rolle nicht übernehmen.",
	MEMBER_NOT_FOUND: "Dieses Gruppenmitglied wurde nicht gefunden.",
	SAME_HOST: "Dieses Mitglied ist bereits der Host.",
	CREATE_FAILED: "Die Wiedergabegruppe konnte nicht erstellt werden.",
	JOIN_FAILED: "Der Wiedergabegruppe konnte nicht beigetreten werden.",
	LEAVE_FAILED: "Die Wiedergabegruppe konnte nicht verlassen werden.",
	PROTOCOL_VERSION_MISMATCH: "Das Synchronisationsprotokoll dieses Clients stimmt nicht mit dem des Servers überein."
}, at = {
	"auth.required": "Accedi per continuare.",
	"auth.not_admin": "Questa azione richiede un account amministratore.",
	"auth.invalid_token": "Il tuo token di accesso non è valido o è scaduto.",
	"auth.user_not_found": "Questo account non esiste più.",
	"auth.signups_disabled": "Le nuove registrazioni sono disattivate su questo server.",
	"auth.account_pending": "Il tuo account è ancora in attesa di approvazione.",
	"auth.account_disabled": "Questo account è stato disattivato.",
	"auth.password_change_required": "Devi cambiare la password prima di continuare.",
	"auth.unauthenticated": "Accedi prima di attivare questo server.",
	"auth.enrollment_expired": "Il token di registrazione di questo server è scaduto. Registralo di nuovo presso l’hub.",
	"auth.server_mismatch": "Il token di registrazione non corrisponde a questo server.",
	"auth.missing_credentials": "Inserisci le tue credenziali per collegare questo account.",
	"auth.invalid_credentials": "Le credenziali inserite non sono corrette.",
	"hub.not_enrolled": "Questo server non è ancora registrato presso l’hub.",
	"hub.token_required": "Per questa azione è richiesto un token di accesso all’hub.",
	"hub.jwt_invalid": "Il token dell’hub non è valido o è scaduto.",
	"hub.protocol_unsupported": "La richiesta non ha usato il protocollo supportato dall’hub.",
	"hub.internal_error": "L’hub ha riscontrato un errore inatteso. Riprova tra poco.",
	"claim.code_not_found": "Il codice di attivazione non è stato trovato. Controllalo e riprova.",
	"claim.code_expired": "Il codice di attivazione è scaduto. Generane uno nuovo e riprova.",
	"claim.code_already_claimed": "Il codice di attivazione è già stato usato.",
	"server.not_found": "Impossibile trovare questo server.",
	"server.not_owned": "Questo server non appartiene al tuo account.",
	"server.relay_unavailable": "Questo server è online ma il suo tunnel relay sicuro non è ancora connesso, quindi le sue librerie non possono essere caricate tramite l’hub. Dovrebbe riconnettersi da solo: riprova tra un momento.",
	"server.offline": "Questo server è offline, quindi le sue librerie non possono essere caricate. Sarà di nuovo navigabile quando si riconnetterà all’hub.",
	"server.no_tunnel": "Questo server è online ma il suo tunnel relay sicuro non è ancora connesso, quindi le sue librerie non possono essere caricate tramite l’hub. Dovrebbe riconnettersi da solo: riprova tra un momento.",
	"server.key_invalid": "La chiave di firma del server non ha superato la verifica durante l’attivazione. Riprova.",
	"proxy.scope_denied": "Il tuo token di accesso non ha l’ambito necessario per questa richiesta.",
	"quota.exceeded": "Hai raggiunto il limite della tua quota di banda.",
	"stream.limit": "Hai raggiunto il numero massimo di streaming simultanei.",
	"stream.limit_exceeded": "Hai raggiunto il limite di riproduzioni simultanee su questo server. Fermane una e riprova.",
	"access.scheduled": "Questo profilo è disponibile solo nella fascia oraria programmata. Riprova più tardi.",
	"gateway.timeout": "Il gateway dell’hub ha superato il tempo di attesa per il tuo server. Riprova.",
	"relay.client_ws_endpoint": "Questo endpoint è un mount WebSocket client: non può essere aperto con una richiesta semplice.",
	"relay.ws_http_endpoint": "Questo endpoint è un mount WebSocket del relay: non può essere aperto con una richiesta semplice.",
	"relay.encode_error": "Il relay non è riuscito a codificare il messaggio. Riprova.",
	"mcp.unknown_tool": "Questo strumento MCP non esiste.",
	"mcp.scope_denied": "Il tuo token MCP non consente questo strumento.",
	"mcp.streaming_unsupported": "Le risposte in streaming non sono supportate da questa interfaccia MCP.",
	"mcp.sse_not_acceptable": "Questa richiesta MCP deve accettare una risposta Server-Sent Events.",
	"mcp.unsupported_protocol_version": "Questa versione del protocollo MCP non è supportata.",
	"mcp_token.no_valid_scopes": "Nessuno degli ambiti richiesti per il token è valido.",
	"mcp_token.not_found": "Questo token di accesso MCP non esiste più.",
	"alexa.streaming_unsupported": "Lo streaming non è supportato tramite l’adattatore Alexa.",
	"alexa.malformed_envelope": "La busta della richiesta Alexa non era ben formata.",
	"alexa.verification_error": "La richiesta Alexa non è stata verificata. Riprova.",
	"alexa.missing_cert_chain_url": "La richiesta Alexa non includeva l’URL della catena dei certificati.",
	"alexa.missing_signature_header": "La richiesta Alexa non includeva l’header della firma.",
	"alexa.empty_body": "La richiesta Alexa è arrivata con un corpo vuoto.",
	"alexa.cert_url_rejected": "L’URL del certificato della richiesta Alexa era fuori dai domini consentiti di Amazon.",
	"alexa.cert_fetch_failed": "Il server non è riuscito a scaricare la catena dei certificati della richiesta Alexa.",
	"alexa.cert_chain_malformed": "La catena dei certificati inviata con la richiesta Alexa non era valida.",
	"alexa.signature_invalid": "La firma della richiesta Alexa non è risultata valida.",
	"alexa.cert_expired": "Il certificato usato per firmare la richiesta Alexa è scaduto.",
	"alexa.cert_san_mismatch": "Il certificato della richiesta Alexa non è stato rilasciato per un dominio Alexa.",
	"alexa.cert_chain_untrusted": "La catena dei certificati della richiesta Alexa non fa capo al certificato radice di Amazon.",
	"alexa.timestamp_malformed": "L’header della data-ora della richiesta Alexa non era interpretabile.",
	"alexa.timestamp_missing": "La richiesta Alexa non includeva l’header della data-ora.",
	"alexa.timestamp_stale": "La data-ora della richiesta Alexa era troppo vecchia. Verifica l’orologio del server.",
	"tls.acme_not_implemented": "Il rilascio automatico dei certificati TLS non è ancora disponibile.",
	"csrf.invalid_origin": "L’origine della richiesta non ha superato il controllo CSRF.",
	"user.not_found": "Impossibile trovare l’utente di questa sessione.",
	"plugin.name.required": "È richiesto il nome del plugin.",
	"plugin.not_found": "Impossibile trovare questo plugin.",
	"plugin.url.required": "È richiesto l’URL del plugin.",
	"plugin.url.invalid_scheme": "L’URL del plugin deve usare http o https.",
	"plugin.url.blocked": "Questo URL del plugin è bloccato dai criteri del server.",
	"plugin.install.failed": "Installazione del plugin fallita.",
	"plugin.enable.failed": "Attivazione del plugin fallita.",
	"plugin.settings.invalid": "Le impostazioni del plugin non sono valide.",
	"plugin.settings.validation_failed": "Le impostazioni del plugin non hanno superato la verifica.",
	"plugin.test_not_supported": "Questo plugin non supporta i test automatici.",
	"plugin.update.failed": "Aggiornamento del plugin fallito.",
	"plugin.update.no_source": "Questo plugin non ha una sorgente di aggiornamento configurata.",
	"plugin.catalog.url.required": "È richiesto l’URL del catalogo.",
	"plugin.catalog.url.duplicate": "Questo URL del catalogo dei plugin è già stato aggiunto.",
	"plugin.catalog.url.invalid": "L’URL del catalogo dei plugin non è valido.",
	"plugin.auto_update.invalid": "L’impostazione dell’aggiornamento automatico non è valida.",
	"plugin.catalog.channel.invalid": "Il canale di aggiornamento del catalogo non è valido.",
	"library.delete_all.confirm_required": "Eliminare tutte le librerie insieme richiede una conferma esplicita.",
	"metadata.tmdb_unconfigured": "Le ricerche TMDB non sono configurate su questo server.",
	"metadata.tmdb_unreachable": "Il fornitore di metadati non è raggiungibile. Riprova più tardi.",
	"metadata.no_query": "Inserisci un titolo per cercare presso il fornitore di metadati.",
	"metadata.bad_tmdb_id": "Questo identificatore TMDB non è valido.",
	"metadata.no_match": "Nessuna corrispondenza di metadati trovata per questo titolo.",
	"poster.missing_url": "È richiesto l’URL dell’immagine del poster.",
	"poster.poster_not_candidate": "Questa immagine non è un candidato poster disponibile per questo titolo.",
	"profile.use_switch": "Per cambiare il profilo attivo, usa la funzione di cambio profilo.",
	"profile.last_profile": "Questo è il tuo ultimo profilo, non può essere eliminato.",
	"profile.no_pin": "Questo profilo non ha un PIN configurato da verificare.",
	"profile.pin_mismatch": "Questo PIN non è corretto.",
	"profile.not_found": "Il profilo non esiste più. Scegline un altro.",
	"dlna.forbidden": "Questo dispositivo non può usare DLNA su questo server.",
	"casting.disabled": "Il casting è disattivato su questo server.",
	unauthorized: "Non sei autorizzato a gestire l’abbinamento su questo server.",
	invalid_secret: "Il segreto di abbinamento non è valido. Avvia di nuovo l’abbinamento.",
	pairing_not_pending: "Non c’è alcuna richiesta di abbinamento in attesa di approvazione.",
	consent_required: "Questo dispositivo deve accettare la richiesta di consenso per continuare l’abbinamento.",
	pairing_not_found: "Questa richiesta di abbinamento non esiste più.",
	storage_unavailable: "L’archiviazione degli abbinamenti non è disponibile al momento. Riprova più tardi.",
	rate_limited: "Troppe richieste: attendi un momento e riprova.",
	provider_unavailable: "Il fornitore di autenticazione non è disponibile. Riprova più tardi.",
	invalid_request: "La richiesta non era valida.",
	invalid_body: "Il corpo della richiesta era assente o malformato.",
	invalid_payload: "I dati della richiesta erano assenti o malformati.",
	unknown_error: "Si è verificato un errore imprevisto.",
	validation_failed: "Alcuni campi non hanno superato la verifica.",
	admin_required: "Questa azione richiede privilegi da amministratore.",
	master_only: "Solo l’account principale può eseguire questa azione.",
	invalid_url: "L’URL fornito non è valido.",
	invalid_role: "Il ruolo fornito non è valido.",
	invalid_permission: "L’autorizzazione fornita non è valida.",
	missing_url: "È richiesto un URL.",
	missing_name: "È richiesto un nome.",
	missing_public_key: "È richiesta una chiave pubblica.",
	missing_user_id: "È richiesto un ID utente.",
	missing_server_id: "È richiesto un ID server.",
	not_server_owner: "Solo il proprietario di questo server può gestirlo.",
	peer_url_exists: "Un peer con questo URL è già stato aggiunto.",
	peer_key_exists: "Un peer con questa chiave pubblica è già stato aggiunto.",
	peer_not_found: "Impossibile trovare questo peer federato.",
	offer_not_found: "Impossibile trovare questa offerta del peer.",
	offer_already_responded: "Questa offerta ha già ricevuto una risposta.",
	delegation_not_found: "Impossibile trovare questa delega di accesso.",
	missing_peer_id: "È richiesto un ID peer.",
	missing_offer_id: "È richiesto un ID offerta.",
	missing_delegation_id: "È richiesto un ID delega.",
	missing_library_id: "È richiesto un ID libreria.",
	missing_library_name: "È richiesto un nome libreria.",
	leaf_hub_id_already_bound: "Questo ID server è già associato a un altro peer.",
	share_not_found: "Impossibile trovare questa condivisione della libreria.",
	missing_share_id: "È richiesto un ID condivisione.",
	missing_collaborator_email: "È richiesta un’email del collaboratore.",
	share_exists: "Questa libreria è già condivisa con questo collaboratore.",
	not_share_owner: "Solo il proprietario può gestire questa condivisione.",
	missing_permission: "È richiesto un livello di autorizzazione.",
	missing_link_id: "È richiesto un ID del link di invito.",
	invite_link_not_found: "Impossibile trovare questo link di invito.",
	not_link_owner: "Solo il proprietario può gestire questo link di invito.",
	missing_token: "È richiesto un token di invito.",
	invalid_invite: "Questo invito non è valido.",
	invite_expired_or_exhausted: "Questo invito è scaduto o è stato usato del tutto.",
	invalid_type: "Il tipo di richiesta non è valido.",
	invalid_tmdb_id: "L’identificatore TMDB di questa richiesta non è valido.",
	missing_title: "È richiesto un titolo.",
	missing_request_id: "È richiesto un ID richiesta.",
	request_not_found: "Impossibile trovare questa richiesta di contenuti.",
	not_request_owner: "Solo chi ha inviato la richiesta può gestirla.",
	approve_failed: "Impossibile approvare la richiesta.",
	deny_failed: "Impossibile rifiutare la richiesta.",
	user_not_found: "Impossibile trovare questo utente.",
	cannot_delete_self: "Non puoi eliminare il tuo stesso account da qui.",
	last_admin: "Questo è l’ultimo account amministratore, non può essere modificato in questo modo.",
	cannot_demote_self: "Non puoi togliere a te stesso il ruolo di amministratore.",
	invalid_quota: "Il valore della quota non è valido.",
	invalid_throttle: "Il valore di limitazione non è valido.",
	update_check_dispatch_failed: "Impossibile avviare il controllo degli aggiornamenti. Riprova.",
	"identity.missing_id": "Nessuna identità collegata è stata selezionata per questa azione.",
	"identity.not_found": "L’identità collegata non è stata trovata.",
	"identity.last_sign_in_method": "È l’unico modo di accedere rimasto per il tuo account, quindi non può essere scollegato.",
	"identity.already_linked": "Questo account del fornitore è già collegato a un altro account qui.",
	"identity.invalid": "Il fornitore non ha restituito un’identità di account utilizzabile.",
	"identity.link_unavailable": "Il collegamento degli account non è temporaneamente disponibile su questo server.",
	"identity.invalid_link_state": "La richiesta di collegamento è scaduta prima di concludersi. Ricomincia.",
	"provider.not_configured": "Nessun fornitore di accesso è ancora configurato su questo server.",
	"provider.unknown": "Il fornitore di accesso non è disponibile su questo server.",
	"provider.not_found": "Il fornitore di accesso non è stato trovato.",
	"provider.invalid_type": "Questo fornitore non può essere usato per questa modalità di accesso.",
	"provider.missing_client_id": "L’ID client del fornitore è obbligatorio.",
	"provider.missing_url": "L’URL del fornitore è obbligatorio.",
	"provider.invalid_url": "L’URL del fornitore non è valida.",
	"oauth.missing_code": "Il fornitore di accesso non ha restituito alcun codice di autorizzazione. Riprova ad accedere.",
	"oauth.missing_state": "Il fornitore di accesso non ha restituito alcun token di stato. Riprova ad accedere.",
	"oauth.invalid_state": "Il tentativo di accesso non corrisponde più a questo browser o è scaduto. Riprova.",
	"oauth.missing_redirect_uri": "Per proseguire questo accesso è richiesto un indirizzo di reindirizzamento.",
	"oauth.invalid_redirect_uri": "Quell’indirizzo di reindirizzamento non è tra quelli consentiti dal server.",
	"oauth.callback_url_not_configured": "Questo server non ha ancora un URL di richiamata configurato.",
	"ldap.missing_host": "L’host del server LDAP è obbligatorio.",
	"ldap.missing_base_dn": "Il DN base LDAP è obbligatorio.",
	"ldap.invalid_port": "Il numero di porta LDAP non è valido.",
	"ldap.connection_failed": "Il server non è riuscito a connettersi alla directory LDAP.",
	"ldap.bind_failed": "Le credenziali LDAP non hanno potuto accedere alla directory.",
	"ldap.error": "La directory LDAP ha restituito un errore.",
	"ldap.runtime_error": "Il test di connessione LDAP è fallito in modo inatteso.",
	"syncplay.create_failed": "Impossibile creare il gruppo di visione.",
	"syncplay.join_failed": "Impossibile unirsi al gruppo di visione.",
	"syncplay.leave_failed": "Impossibile uscire dal gruppo di visione.",
	"syncplay.group_limit_reached": "È stato raggiunto il numero massimo di gruppi di visione.",
	"syncplay.group_not_found": "Questo gruppo di visione non esiste più.",
	"syncplay.invalid_password": "La password del gruppo non è corretta.",
	"syncplay.group_full": "Questo gruppo di visione è pieno.",
	"syncplay.queue_limit_exceeded": "La coda di visione ha raggiunto la dimensione massima.",
	UNKNOWN_MESSAGE: "La sessione di sincronizzazione non ha capito quel messaggio.",
	HANDLER_ERROR: "La sessione di sincronizzazione ha riscontrato un errore interno nel gestire la tua richiesta.",
	NOT_AUTHENTICATED: "Accedi alla sessione di sincronizzazione prima di continuare.",
	NOT_IN_GROUP: "In questo momento non sei in nessun gruppo di visione.",
	NOT_HOST: "Solo l’ospite del gruppo può farlo.",
	INVALID_NEW_HOST: "Questo membro non può diventare il nuovo ospite.",
	MEMBER_NOT_FOUND: "Impossibile trovare questo membro del gruppo.",
	SAME_HOST: "Questo membro è già l’ospite.",
	CREATE_FAILED: "Impossibile creare il gruppo di visione.",
	JOIN_FAILED: "Impossibile unirsi al gruppo di visione.",
	LEAVE_FAILED: "Impossibile uscire dal gruppo di visione.",
	PROTOCOL_VERSION_MISMATCH: "Il protocollo di sincronizzazione di questo client non corrisponde a quello del server."
}, ot = {
	"auth.required": "Entre na sua conta para continuar.",
	"auth.not_admin": "Esta ação requer uma conta de administrador.",
	"auth.invalid_token": "Seu token de entrada é inválido ou expirou.",
	"auth.user_not_found": "Essa conta não existe mais.",
	"auth.signups_disabled": "Novos cadastros estão desativados neste servidor.",
	"auth.account_pending": "Sua conta ainda está aguardando aprovação.",
	"auth.account_disabled": "Esta conta foi desativada.",
	"auth.password_change_required": "Você precisa trocar sua senha antes de continuar.",
	"auth.unauthenticated": "Entre na sua conta antes de resgatar este servidor.",
	"auth.enrollment_expired": "O token de inscrição deste servidor expirou. Inscreva-o novamente no hub.",
	"auth.server_mismatch": "O token de inscrição não corresponde a este servidor.",
	"auth.missing_credentials": "Informe suas credenciais para vincular esta conta.",
	"auth.invalid_credentials": "As credenciais informadas não estão corretas.",
	"hub.not_enrolled": "Este servidor ainda não está inscrito no hub.",
	"hub.token_required": "Um token de acesso ao hub é necessário para esta ação.",
	"hub.jwt_invalid": "O token do hub é inválido ou expirou.",
	"hub.protocol_unsupported": "A solicitação não usou o protocolo compatível com o hub.",
	"hub.internal_error": "O hub encontrou um erro inesperado. Tente novamente em instantes.",
	"claim.code_not_found": "Esse código de resgate não foi encontrado. Verifique e tente de novo.",
	"claim.code_expired": "Esse código de resgate expirou. Gere um novo e tente de novo.",
	"claim.code_already_claimed": "Esse código de resgate já foi usado.",
	"server.not_found": "Não foi possível encontrar esse servidor.",
	"server.not_owned": "Este servidor não pertence à sua conta.",
	"server.relay_unavailable": "Este servidor está online, mas o túnel seguro de relay dele ainda não está conectado, então as bibliotecas não podem ser carregadas pelo hub. A reconexão deve acontecer sozinha — tente novamente em instantes.",
	"server.offline": "Este servidor está offline, então as bibliotecas dele não podem ser carregadas. Ele voltará a ser navegável quando se reconectar ao hub.",
	"server.no_tunnel": "Este servidor está online, mas o túnel seguro de relay dele ainda não está conectado, então as bibliotecas não podem ser carregadas pelo hub. A reconexão deve acontecer sozinha — tente novamente em instantes.",
	"server.key_invalid": "A chave de assinatura do servidor não passou na validação durante o resgate. Tente de novo.",
	"proxy.scope_denied": "Seu token de acesso não tem o escopo necessário para esta requisição.",
	"quota.exceeded": "Você atingiu o limite da sua cota de banda.",
	"stream.limit": "Você atingiu o número máximo de transmissões simultâneas.",
	"stream.limit_exceeded": "Você atingiu o limite de transmissões simultâneas deste servidor. Pare uma e tente de novo.",
	"access.scheduled": "Este perfil só está disponível dentro do horário programado. Tente mais tarde.",
	"gateway.timeout": "O gateway do hub expirou ao esperar pelo seu servidor. Tente de novo.",
	"relay.client_ws_endpoint": "Este endpoint é uma montagem WebSocket de cliente — não pode ser aberto com uma requisição comum.",
	"relay.ws_http_endpoint": "Este endpoint é uma montagem WebSocket do relay — não pode ser aberto com uma requisição comum.",
	"relay.encode_error": "O relay não conseguiu codificar a mensagem. Tente novamente.",
	"mcp.unknown_tool": "Essa ferramenta MCP não existe.",
	"mcp.scope_denied": "Seu token MCP não permite esta ferramenta.",
	"mcp.streaming_unsupported": "Respostas em streaming não são compatíveis com esta superfície MCP.",
	"mcp.sse_not_acceptable": "Esta requisição MCP precisa aceitar uma resposta Server-Sent Events.",
	"mcp.unsupported_protocol_version": "Esta versão do protocolo MCP não é compatível.",
	"mcp_token.no_valid_scopes": "Nenhum dos escopos de token solicitados é válido.",
	"mcp_token.not_found": "Esse token de acesso MCP não existe mais.",
	"alexa.streaming_unsupported": "Streaming não é compatível com o adaptador da Alexa.",
	"alexa.malformed_envelope": "O envelope da requisição da Alexa estava malformado.",
	"alexa.verification_error": "A solicitação da Alexa não pôde ser verificada. Tente de novo.",
	"alexa.missing_cert_chain_url": "A solicitação da Alexa não incluía a URL da cadeia de certificados.",
	"alexa.missing_signature_header": "A solicitação da Alexa não incluía o cabeçalho de assinatura.",
	"alexa.empty_body": "A solicitação da Alexa chegou com o corpo vazio.",
	"alexa.cert_url_rejected": "A URL do certificado da solicitação da Alexa estava fora dos domínios permitidos da Amazon.",
	"alexa.cert_fetch_failed": "O servidor não conseguiu baixar a cadeia de certificados da solicitação da Alexa.",
	"alexa.cert_chain_malformed": "A cadeia de certificados enviada com a solicitação da Alexa estava malformada.",
	"alexa.signature_invalid": "A assinatura da solicitação da Alexa não foi confirmada.",
	"alexa.cert_expired": "O certificado usado para assinar a solicitação da Alexa expirou.",
	"alexa.cert_san_mismatch": "O certificado da solicitação da Alexa não foi emitido para um domínio da Alexa.",
	"alexa.cert_chain_untrusted": "A cadeia de certificados da solicitação da Alexa não se ancorou no certificado raiz da Amazon.",
	"alexa.timestamp_malformed": "O cabeçalho de data e hora da solicitação da Alexa não pôde ser lido.",
	"alexa.timestamp_missing": "A solicitação da Alexa não incluía o cabeçalho de data e hora.",
	"alexa.timestamp_stale": "A data e hora da solicitação da Alexa era antiga demais. Verifique o relógio do servidor.",
	"tls.acme_not_implemented": "A emissão automática de certificados TLS ainda não está disponível.",
	"csrf.invalid_origin": "A origem da requisição não passou na verificação CSRF.",
	"user.not_found": "Não foi possível encontrar o usuário desta sessão.",
	"plugin.name.required": "Um nome de plugin é obrigatório.",
	"plugin.not_found": "Não foi possível encontrar esse plugin.",
	"plugin.url.required": "Uma URL de plugin é obrigatória.",
	"plugin.url.invalid_scheme": "A URL do plugin deve usar http ou https.",
	"plugin.url.blocked": "Esta URL de plugin está bloqueada pela política do servidor.",
	"plugin.install.failed": "A instalação do plugin falhou.",
	"plugin.enable.failed": "A ativação do plugin falhou.",
	"plugin.settings.invalid": "As configurações do plugin são inválidas.",
	"plugin.settings.validation_failed": "As configurações do plugin não passaram na validação.",
	"plugin.test_not_supported": "Este plugin não suporta autotestes.",
	"plugin.update.failed": "A atualização do plugin falhou.",
	"plugin.update.no_source": "Este plugin não tem fonte de atualização configurada.",
	"plugin.catalog.url.required": "Uma URL de catálogo é obrigatória.",
	"plugin.catalog.url.duplicate": "Essa URL de catálogo de plugins já foi adicionada.",
	"plugin.catalog.url.invalid": "A URL do catálogo de plugins é inválida.",
	"plugin.auto_update.invalid": "A configuração de atualização automática é inválida.",
	"plugin.catalog.channel.invalid": "O canal de atualização do catálogo é inválido.",
	"library.delete_all.confirm_required": "Excluir todas as bibliotecas de uma vez exige uma confirmação explícita.",
	"metadata.tmdb_unconfigured": "As buscas no TMDB não estão configuradas neste servidor.",
	"metadata.tmdb_unreachable": "O provedor de metadados não pôde ser alcançado. Tente novamente mais tarde.",
	"metadata.no_query": "Digite um título para buscar no provedor de metadados.",
	"metadata.bad_tmdb_id": "Esse identificador do TMDB não é válido.",
	"metadata.no_match": "Nenhuma correspondência de metadados foi encontrada para este título.",
	"poster.missing_url": "Uma URL da imagem do pôster é obrigatória.",
	"poster.poster_not_candidate": "Essa imagem não é uma candidata de pôster disponível para este título.",
	"profile.use_switch": "Para mudar o perfil ativo, use a opção de troca de perfil.",
	"profile.last_profile": "Este é o seu último perfil, por isso não pode ser excluído.",
	"profile.no_pin": "Este perfil não tem um PIN configurado para verificar.",
	"profile.pin_mismatch": "Esse PIN não está correto.",
	"profile.not_found": "Esse perfil não existe mais. Escolha outro.",
	"dlna.forbidden": "Este dispositivo não tem permissão para usar DLNA neste servidor.",
	"casting.disabled": "A transmissão para aparelhos está desativada neste servidor.",
	unauthorized: "Você não está autorizado a gerenciar o pareamento neste servidor.",
	invalid_secret: "O segredo de pareamento não é válido. Comece o pareamento de novo.",
	pairing_not_pending: "Não há nenhuma solicitação de pareamento aguardando aprovação.",
	consent_required: "Este dispositivo precisa aceitar o aviso de consentimento para o pareamento continuar.",
	pairing_not_found: "Essa solicitação de pareamento não existe mais.",
	storage_unavailable: "O armazenamento de pareamento está indisponível agora. Tente novamente mais tarde.",
	rate_limited: "Requisições demais — aguarde um instante e tente de novo.",
	provider_unavailable: "O provedor de autenticação está indisponível. Tente novamente mais tarde.",
	invalid_request: "A requisição não era válida.",
	invalid_body: "O corpo da requisição estava ausente ou malformado.",
	invalid_payload: "Os dados da solicitação estavam ausentes ou malformados.",
	unknown_error: "Ocorreu um erro inesperado.",
	validation_failed: "Alguns campos não passaram na validação.",
	admin_required: "Esta ação requer privilégios de administrador.",
	master_only: "Somente a conta principal pode executar esta ação.",
	invalid_url: "A URL informada não é válida.",
	invalid_role: "O cargo informado não é válido.",
	invalid_permission: "A permissão informada não é válida.",
	missing_url: "Uma URL é obrigatória.",
	missing_name: "Um nome é obrigatório.",
	missing_public_key: "Uma chave pública é obrigatória.",
	missing_user_id: "Um ID de usuário é obrigatório.",
	missing_server_id: "Um ID de servidor é obrigatório.",
	not_server_owner: "Somente o dono deste servidor pode gerenciá-lo.",
	peer_url_exists: "Um par com essa URL já foi adicionado.",
	peer_key_exists: "Um par com essa chave pública já foi adicionado.",
	peer_not_found: "Não foi possível encontrar esse par federado.",
	offer_not_found: "Não foi possível encontrar essa oferta de par.",
	offer_already_responded: "Esta oferta já recebeu resposta.",
	delegation_not_found: "Não foi possível encontrar essa delegação de acesso.",
	missing_peer_id: "Um ID de par é obrigatório.",
	missing_offer_id: "Um ID de oferta é obrigatório.",
	missing_delegation_id: "Um ID de delegação é obrigatório.",
	missing_library_id: "Um ID de biblioteca é obrigatório.",
	missing_library_name: "Um nome de biblioteca é obrigatório.",
	leaf_hub_id_already_bound: "Esse ID de servidor já está vinculado a outro par.",
	share_not_found: "Não foi possível encontrar esse compartilhamento de biblioteca.",
	missing_share_id: "Um ID de compartilhamento é obrigatório.",
	missing_collaborator_email: "Um e-mail do colaborador é obrigatório.",
	share_exists: "Esta biblioteca já é compartilhada com esse colaborador.",
	not_share_owner: "Somente o dono do compartilhamento pode geri-lo.",
	missing_permission: "Um nível de permissão é obrigatório.",
	missing_link_id: "Um ID de link de convite é obrigatório.",
	invite_link_not_found: "Não foi possível encontrar esse link de convite.",
	not_link_owner: "Somente o dono pode gerenciar este link de convite.",
	missing_token: "Um token de convite é obrigatório.",
	invalid_invite: "Este convite não é válido.",
	invite_expired_or_exhausted: "Este convite expirou ou foi totalmente utilizado.",
	invalid_type: "O tipo de solicitação não é válido.",
	invalid_tmdb_id: "O identificador do TMDB desta solicitação não é válido.",
	missing_title: "Um título é obrigatório.",
	missing_request_id: "Um ID de solicitação é obrigatório.",
	request_not_found: "Não foi possível encontrar essa solicitação de mídia.",
	not_request_owner: "Somente quem fez a solicitação pode gerenciá-la.",
	approve_failed: "A solicitação não pôde ser aprovada.",
	deny_failed: "A solicitação não pôde ser recusada.",
	user_not_found: "Não foi possível encontrar esse usuário.",
	cannot_delete_self: "Você não pode excluir a própria conta por aqui.",
	last_admin: "Esta é a última conta de administrador, então não pode ser alterada assim.",
	cannot_demote_self: "Você não pode remover o próprio cargo de administrador.",
	invalid_quota: "O valor da cota não é válido.",
	invalid_throttle: "O valor de limitação não é válido.",
	update_check_dispatch_failed: "A checagem de atualizações não pôde ser iniciada. Tente de novo.",
	"identity.missing_id": "Nenhuma identidade vinculada foi selecionada para esta ação.",
	"identity.not_found": "Essa identidade vinculada não foi encontrada.",
	"identity.last_sign_in_method": "Esta é a única forma de entrar que resta na sua conta, por isso não pode ser desvinculada.",
	"identity.already_linked": "Essa conta do provedor já está vinculada a outra conta aqui.",
	"identity.invalid": "O provedor não devolveu uma identidade de conta utilizável.",
	"identity.link_unavailable": "A vinculação de contas está temporariamente indisponível neste servidor.",
	"identity.invalid_link_state": "A solicitação de vinculação expirou antes de terminar. Comece de novo.",
	"provider.not_configured": "Ainda não há nenhum provedor de entrada configurado neste servidor.",
	"provider.unknown": "Esse provedor de entrada não está disponível neste servidor.",
	"provider.not_found": "Esse provedor de entrada não foi encontrado.",
	"provider.invalid_type": "Esse provedor não pode ser usado para este tipo de entrada.",
	"provider.missing_client_id": "O ID de cliente do provedor é obrigatório.",
	"provider.missing_url": "A URL do provedor é obrigatória.",
	"provider.invalid_url": "A URL do provedor não é válida.",
	"oauth.missing_code": "O provedor de entrada não devolveu nenhum código de autorização. Entre de novo.",
	"oauth.missing_state": "O provedor de entrada não devolveu nenhum token de estado. Entre de novo.",
	"oauth.invalid_state": "A tentativa de entrada não corresponde mais a este navegador ou expirou. Tente de novo.",
	"oauth.missing_redirect_uri": "Um endereço de redirecionamento é necessário para continuar esta entrada.",
	"oauth.invalid_redirect_uri": "Esse endereço de redirecionamento não está na lista permitida do servidor.",
	"oauth.callback_url_not_configured": "Este servidor ainda não tem uma URL de retorno configurada.",
	"ldap.missing_host": "O host do servidor LDAP é obrigatório.",
	"ldap.missing_base_dn": "O DN base do LDAP é obrigatório.",
	"ldap.invalid_port": "O número da porta do LDAP não é válido.",
	"ldap.connection_failed": "O servidor não conseguiu se conectar ao diretório LDAP.",
	"ldap.bind_failed": "As credenciais do LDAP não conseguiram entrar no diretório.",
	"ldap.error": "O diretório LDAP devolveu um erro.",
	"ldap.runtime_error": "O teste de conexão LDAP falhou de forma inesperada.",
	"syncplay.create_failed": "O grupo de exibição não pôde ser criado.",
	"syncplay.join_failed": "Não foi possível entrar no grupo de exibição.",
	"syncplay.leave_failed": "Não foi possível sair do grupo de exibição.",
	"syncplay.group_limit_reached": "O número máximo de grupos de exibição foi atingido.",
	"syncplay.group_not_found": "Esse grupo de exibição não existe mais.",
	"syncplay.invalid_password": "A senha do grupo não está correta.",
	"syncplay.group_full": "Esse grupo de exibição está cheio.",
	"syncplay.queue_limit_exceeded": "A fila de exibição atingiu o tamanho máximo.",
	UNKNOWN_MESSAGE: "A sessão de sincronização não entendeu aquela mensagem.",
	HANDLER_ERROR: "A sessão de sincronização encontrou um erro interno ao processar sua requisição.",
	NOT_AUTHENTICATED: "Entre na sessão de sincronização antes de continuar.",
	NOT_IN_GROUP: "No momento você não está em nenhum grupo de exibição.",
	NOT_HOST: "Somente o anfitrião do grupo pode fazer isso.",
	INVALID_NEW_HOST: "Esse membro não pode assumir o papel de anfitrião.",
	MEMBER_NOT_FOUND: "Não foi possível encontrar esse membro do grupo.",
	SAME_HOST: "Esse membro já é o anfitrião.",
	CREATE_FAILED: "O grupo de exibição não pôde ser criado.",
	JOIN_FAILED: "Não foi possível entrar no grupo de exibição.",
	LEAVE_FAILED: "Não foi possível sair do grupo de exibição.",
	PROTOCOL_VERSION_MISMATCH: "O protocolo de sincronização deste cliente não corresponde ao do servidor."
}, st = {
	"auth.required": "続行するにはサインインしてください。",
	"auth.not_admin": "この操作には管理者アカウントが必要です。",
	"auth.invalid_token": "サインイントークンが無効か、有効期限が切れています。",
	"auth.user_not_found": "そのアカウントは存在しません。",
	"auth.signups_disabled": "このサーバーでは新規アカウントの登録が無効になっています。",
	"auth.account_pending": "アカウントは現在、承認待ちです。",
	"auth.account_disabled": "このアカウントは無効化されています。",
	"auth.password_change_required": "続行する前にパスワードを変更する必要があります。",
	"auth.unauthenticated": "このサーバーを引き換える前にサインインしてください。",
	"auth.enrollment_expired": "このサーバーの登録トークンは有効期限が切れています。ハブで再登録してください。",
	"auth.server_mismatch": "登録トークンがこのサーバーと一致しません。",
	"auth.missing_credentials": "このアカウントをリンクするには認証情報を入力してください。",
	"auth.invalid_credentials": "入力された認証情報は正しくありません。",
	"hub.not_enrolled": "このサーバーはまだハブに登録されていません。",
	"hub.token_required": "この操作にはハブのアクセストークンが必要です。",
	"hub.jwt_invalid": "ハブのトークンが無効か、有効期限が切れています。",
	"hub.protocol_unsupported": "このリクエストはハブの対応プロトコルで送信されていません。",
	"hub.internal_error": "ハブで予期しないエラーが発生しました。しばらくしてから再度お試しください。",
	"claim.code_not_found": "その引き換えコードは見つかりませんでした。確認して再度お試しください。",
	"claim.code_expired": "その引き換えコードは有効期限が切れています。新しいコードを発行して再度お試しください。",
	"claim.code_already_claimed": "その引き換えコードはすでに使用されています。",
	"server.not_found": "そのサーバーは見つかりませんでした。",
	"server.not_owned": "このサーバーはあなたのアカウントに属していません。",
	"server.relay_unavailable": "このサーバーはオンラインですが、安全なリレー トンネルがまだ接続されていないため、ライブラリをハブ経由で読み込めません。自動的に再接続されるはずです — しばらくしてからもう一度お試しください。",
	"server.offline": "このサーバーはオフラインのため、ライブラリを読み込めません。ハブへの再接続が完了すれば、再び閲覧できるようになります。",
	"server.no_tunnel": "このサーバーはオンラインですが、安全なリレー トンネルがまだ接続されていないため、ライブラリをハブ経由で読み込めません。自動的に再接続されるはずです — しばらくしてからもう一度お試しください。",
	"server.key_invalid": "引き換え中にサーバーの署名鍵の検証に失敗しました。もう一度お試しください。",
	"proxy.scope_denied": "このリクエストに必要な権限スコープがアクセストークンに含まれていません。",
	"quota.exceeded": "帯域割当量の上限に達しました。",
	"stream.limit": "同時ストリーミングの上限数に達しました。",
	"stream.limit_exceeded": "このサーバーの同時ストリームの上限に達しました。いずれかを停止して再度お試しください。",
	"access.scheduled": "このプロフィールは設定された時間帯のみ利用できます。時間帯を改めてお試しください。",
	"gateway.timeout": "ハブのゲートウェイがサーバーを待っている間にタイムアウトしました。もう一度お試しください。",
	"relay.client_ws_endpoint": "このエンドポイントはクライアントのWebSocketマウントであり、通常のリクエストでは開けません。",
	"relay.ws_http_endpoint": "このエンドポイントはリレーのWebSocketマウントであり、通常のリクエストでは開けません。",
	"relay.encode_error": "リレーはメッセージを符号化できませんでした。もう一度お試しください。",
	"mcp.unknown_tool": "そのMCPツールは存在しません。",
	"mcp.scope_denied": "MCPトークンはこのツールの実行を許可していません。",
	"mcp.streaming_unsupported": "このMCPインターフェースではストリーミング応答はサポートされていません。",
	"mcp.sse_not_acceptable": "このMCPリクエストはServer-Sent Events応答を受け付ける必要があります。",
	"mcp.unsupported_protocol_version": "このMCPプロトコルバージョンはサポートされていません。",
	"mcp_token.no_valid_scopes": "要求されたトークンスコープの中に有効なものはありません。",
	"mcp_token.not_found": "そのMCPアクセストークンは存在しません。",
	"alexa.streaming_unsupported": "Alexaアダプター経由ではストリーミングはサポートされていません。",
	"alexa.malformed_envelope": "Alexaリクエストのエンベロープ形式が正しくありません。",
	"alexa.verification_error": "Alexaリクエストを検証できませんでした。もう一度お試しください。",
	"alexa.missing_cert_chain_url": "Alexaリクエストに証明書チェーンのURLが含まれていません。",
	"alexa.missing_signature_header": "Alexaリクエストに署名ヘッダーが含まれていません。",
	"alexa.empty_body": "Alexaリクエストの本文が空でした。",
	"alexa.cert_url_rejected": "Alexaリクエストの証明書URLがAmazonの許可されたドメイン外でした。",
	"alexa.cert_fetch_failed": "サーバーはAlexaリクエストの証明書チェーンを取得できませんでした。",
	"alexa.cert_chain_malformed": "Alexaリクエストで送られた証明書チェーンが不正な形式でした。",
	"alexa.signature_invalid": "Alexaリクエストの署名の検証に失敗しました。",
	"alexa.cert_expired": "Alexaリクエストの署名に使用された証明書の有効期限が切れています。",
	"alexa.cert_san_mismatch": "Alexaリクエストの証明書はAlexaドメイン向けに発行されたものではありません。",
	"alexa.cert_chain_untrusted": "Alexaリクエストの証明書チェーンはAmazonのルート証明書によって信頼されていません。",
	"alexa.timestamp_malformed": "Alexaリクエストのタイムスタンプヘッダーを解析できませんでした。",
	"alexa.timestamp_missing": "Alexaリクエストにタイムスタンプヘッダーが含まれていません。",
	"alexa.timestamp_stale": "Alexaリクエストのタイムスタンプが古すぎます。サーバーの時計を確認してください。",
	"tls.acme_not_implemented": "TLS証明書の自動発行はまだ利用できません。",
	"csrf.invalid_origin": "リクエストの送信元がCSRFチェックを通過しませんでした。",
	"user.not_found": "このセッションのユーザーが見つかりませんでした。",
	"plugin.name.required": "プラグイン名は必須です。",
	"plugin.not_found": "そのプラグインは見つかりませんでした。",
	"plugin.url.required": "プラグインのURLは必須です。",
	"plugin.url.invalid_scheme": "プラグインのURLはhttpまたはhttpsである必要があります。",
	"plugin.url.blocked": "このプラグインURLはサーバーのポリシーでブロックされています。",
	"plugin.install.failed": "プラグインのインストールに失敗しました。",
	"plugin.enable.failed": "プラグインの有効化に失敗しました。",
	"plugin.settings.invalid": "プラグインの設定内容が正しくありません。",
	"plugin.settings.validation_failed": "プラグインの設定が検証を通過しませんでした。",
	"plugin.test_not_supported": "このプラグインは自己テストに対応していません。",
	"plugin.update.failed": "プラグインの更新に失敗しました。",
	"plugin.update.no_source": "このプラグインには更新元が設定されていません。",
	"plugin.catalog.url.required": "カタログのURLは必須です。",
	"plugin.catalog.url.duplicate": "そのプラグインカタログURLはすでに追加されています。",
	"plugin.catalog.url.invalid": "プラグインカタログのURLが正しくありません。",
	"plugin.auto_update.invalid": "自動更新の設定内容が正しくありません。",
	"plugin.catalog.channel.invalid": "カタログの更新チャンネルが正しくありません。",
	"library.delete_all.confirm_required": "すべてのライブラリを一括削除するには明示的な確認が必要です。",
	"metadata.tmdb_unconfigured": "このサーバーではTMDB検索が設定されていません。",
	"metadata.tmdb_unreachable": "メタデータプロバイダーに接続できませんでした。時間をおいてからもう一度お試しください。",
	"metadata.no_query": "メタデータプロバイダーで検索するタイトルを入力してください。",
	"metadata.bad_tmdb_id": "そのTMDB識別子は有効ではありません。",
	"metadata.no_match": "このタイトルに一致するメタデータは見つかりませんでした。",
	"poster.missing_url": "ポスター画像のURLは必須です。",
	"poster.poster_not_candidate": "その画像はこのタイトルの利用可能なポスター候補ではありません。",
	"profile.use_switch": "有効なプロフィールを変更するには、プロフィールの切り替えを使ってください。",
	"profile.last_profile": "これが最後のプロフィールのため、削除できません。",
	"profile.no_pin": "このプロフィールには確認用のPINが設定されていません。",
	"profile.pin_mismatch": "そのPINは正しくありません。",
	"profile.not_found": "そのプロフィールはもう存在しません。ほかのプロフィールを選んでください。",
	"dlna.forbidden": "このデバイスはこのサーバーでDLNAを利用する権限がありません。",
	"casting.disabled": "このサーバーではキャスティングが無効になっています。",
	unauthorized: "このサーバーでペアリングを管理する権限がありません。",
	invalid_secret: "ペアリングシークレットが正しくありません。ペアリングをやり直してください。",
	pairing_not_pending: "承認待ちのペアリング要求はありません。",
	consent_required: "ペアリングを続けるには、このデバイスで同意プロンプトを承認する必要があります。",
	pairing_not_found: "そのペアリング要求は存在しません。",
	storage_unavailable: "ただいまペアリングの保存領域を利用できません。時間をおいてからもう一度お試しください。",
	rate_limited: "リクエストが多すぎます — しばらく待ってからもう一度お試しください。",
	provider_unavailable: "認証プロバイダーを利用できません。時間をおいてからもう一度お試しください。",
	invalid_request: "リクエストが正しくありません。",
	invalid_body: "リクエストボディがないか、形式が正しくありません。",
	invalid_payload: "リクエストデータがないか、形式が正しくありません。",
	unknown_error: "予期しないエラーが発生しました。",
	validation_failed: "いくつかの項目が検証を通過しませんでした。",
	admin_required: "この操作には管理者権限が必要です。",
	master_only: "この操作はマスターアカウントのみが実行できます。",
	invalid_url: "指定されたURLが正しくありません。",
	invalid_role: "指定されたロールが正しくありません。",
	invalid_permission: "指定された権限が正しくありません。",
	missing_url: "URLは必須です。",
	missing_name: "名前は必須です。",
	missing_public_key: "公開鍵は必須です。",
	missing_user_id: "ユーザーIDは必須です。",
	missing_server_id: "サーバーIDは必須です。",
	not_server_owner: "このサーバーを管理できるのは所有者だけです。",
	peer_url_exists: "そのURLのピアはすでに追加されています。",
	peer_key_exists: "その公開鍵のピアはすでに追加されています。",
	peer_not_found: "その連合ピアは見つかりませんでした。",
	offer_not_found: "そのピアのオファーは見つかりませんでした。",
	offer_already_responded: "このオファーにはすでに回答済みです。",
	delegation_not_found: "そのアクセス委任は見つかりませんでした。",
	missing_peer_id: "ピアIDは必須です。",
	missing_offer_id: "オファーIDは必須です。",
	missing_delegation_id: "委任IDは必須です。",
	missing_library_id: "ライブラリIDは必須です。",
	missing_library_name: "ライブラリ名は必須です。",
	leaf_hub_id_already_bound: "そのサーバーIDはすでに別のピアに紐付けられています。",
	share_not_found: "そのライブラリの共有は見つかりませんでした。",
	missing_share_id: "共有IDは必須です。",
	missing_collaborator_email: "共同編集者のメールアドレスは必須です。",
	share_exists: "このライブラリはその共同編集者とすでに共有されています。",
	not_share_owner: "この共有を管理できるのは所有者だけです。",
	missing_permission: "権限レベルは必須です。",
	missing_link_id: "招待リンクIDは必須です。",
	invite_link_not_found: "その招待リンクは見つかりませんでした。",
	not_link_owner: "この招待リンクを管理できるのは所有者だけです。",
	missing_token: "招待トークンは必須です。",
	invalid_invite: "この招待は有効ではありません。",
	invite_expired_or_exhausted: "この招待は期限が切れたか、使い切られました。",
	invalid_type: "リクエストの種類が正しくありません。",
	invalid_tmdb_id: "このリクエストのTMDB識別子が正しくありません。",
	missing_title: "タイトルは必須です。",
	missing_request_id: "リクエストIDは必須です。",
	request_not_found: "そのメディアリクエストは見つかりませんでした。",
	not_request_owner: "このリクエストを管理できるのは依頼者だけです。",
	approve_failed: "リクエストを承認できませんでした。",
	deny_failed: "リクエストを拒否できませんでした。",
	user_not_found: "そのユーザーは見つかりませんでした。",
	cannot_delete_self: "自分自身のアカウントをここから削除することはできません。",
	last_admin: "これは最後の管理者アカウントのため、この方法では変更できません。",
	cannot_demote_self: "自分自身の管理者ロールを取り消すことはできません。",
	invalid_quota: "割当量の値が正しくありません。",
	invalid_throttle: "スロットリングの値が正しくありません。",
	update_check_dispatch_failed: "更新チェックを開始できませんでした。もう一度お試しください。",
	"identity.missing_id": "この操作にはリンクされたIDが選択されていません。",
	"identity.not_found": "そのリンクされたIDは見つかりませんでした。",
	"identity.last_sign_in_method": "これはアカウントで唯一残されたサインイン方法のため、リンクを解除できません。",
	"identity.already_linked": "そのプロバイダーのアカウントはすでにここの別のアカウントにリンクされています。",
	"identity.invalid": "プロバイダーから有効なアカウントIDが返されませんでした。",
	"identity.link_unavailable": "このサーバーではアカウントのリンクを一時的に利用できません。",
	"identity.invalid_link_state": "リンク要求が完了前に期限切れになりました。始めからやり直してください。",
	"provider.not_configured": "このサーバーにはまだサインインプロバイダーが設定されていません。",
	"provider.unknown": "そのサインインプロバイダーはこのサーバーでは利用できません。",
	"provider.not_found": "そのサインインプロバイダーは見つかりませんでした。",
	"provider.invalid_type": "そのプロバイダーはこの種類のサインインには使用できません。",
	"provider.missing_client_id": "プロバイダーのクライアントIDは必須です。",
	"provider.missing_url": "プロバイダーのURLは必須です。",
	"provider.invalid_url": "プロバイダーのURLが正しくありません。",
	"oauth.missing_code": "サインインプロバイダーから認可コードが返されませんでした。もう一度サインインしてください。",
	"oauth.missing_state": "サインインプロバイダーからステートトークンが返されませんでした。もう一度サインインしてください。",
	"oauth.invalid_state": "サインイン試行はこのブラウザーと一致しないか、期限切れです。もう一度お試しください。",
	"oauth.missing_redirect_uri": "このサインインを続行するにはリダイレクト先アドレスが必要です。",
	"oauth.invalid_redirect_uri": "そのリダイレクト先アドレスはサーバーの許可リストに含まれていません。",
	"oauth.callback_url_not_configured": "このサーバーにはサインインのコールバックURLがまだ設定されていません。",
	"ldap.missing_host": "LDAPサーバーのホストは必須です。",
	"ldap.missing_base_dn": "LDAPのベースDNは必須です。",
	"ldap.invalid_port": "LDAPのポート番号が正しくありません。",
	"ldap.connection_failed": "サーバーはLDAPディレクトリーに接続できませんでした。",
	"ldap.bind_failed": "LDAPの認証情報でディレクトリーにサインインできませんでした。",
	"ldap.error": "LDAPディレクトリーからエラーが返されました。",
	"ldap.runtime_error": "LDAP接続テストが予期しない原因で失敗しました。",
	"syncplay.create_failed": "視聴グループを作成できませんでした。",
	"syncplay.join_failed": "視聴グループに参加できませんでした。",
	"syncplay.leave_failed": "視聴グループから退出できませんでした。",
	"syncplay.group_limit_reached": "視聴グループの最大数に達しました。",
	"syncplay.group_not_found": "その視聴グループは存在しません。",
	"syncplay.invalid_password": "グループのパスワードが正しくありません。",
	"syncplay.group_full": "その視聴グループは満員です。",
	"syncplay.queue_limit_exceeded": "視聴キューが最大数に達しました。",
	UNKNOWN_MESSAGE: "同期セッションはそのメッセージを解釈できませんでした。",
	HANDLER_ERROR: "同期セッションはリクエストの処理中に内部エラーが発生しました。",
	NOT_AUTHENTICATED: "続行する前に同期セッションにサインインしてください。",
	NOT_IN_GROUP: "現在、あなたはどの視聴グループにも所属していません。",
	NOT_HOST: "その操作はグループのホストだけが行えます。",
	INVALID_NEW_HOST: "そのメンバーはホストを引き継げません。",
	MEMBER_NOT_FOUND: "そのグループメンバーは見つかりませんでした。",
	SAME_HOST: "そのメンバーはすでにホストです。",
	CREATE_FAILED: "視聴グループを作成できませんでした。",
	JOIN_FAILED: "視聴グループに参加できませんでした。",
	LEAVE_FAILED: "視聴グループから退出できませんでした。",
	PROTOCOL_VERSION_MISMATCH: "このクライアントの同期プロトコルはサーバーのものと一致しません。"
}, ct = new Set(et);
function lt(e) {
	return typeof e == "string" && ct.has(e);
}
var ut = {
	en: tt,
	es: nt,
	fr: rt,
	de: it,
	it: at,
	pt_BR: ot,
	ja: st
}, dt = "access_token", ft = "refresh_token", pt = "user", mt = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(dt);
	}
	setAccessToken(e) {
		this.storage.setItem(dt, e);
	}
	getRefreshToken() {
		return this.storage.getItem(ft);
	}
	setRefreshToken(e) {
		this.storage.setItem(ft, e);
	}
	getUser() {
		let e = this.storage.getItem(pt);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(pt, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(dt), this.storage.removeItem(ft), this.storage.removeItem(pt);
	}
};
//#endregion
//#region src/api/client.ts
function ht() {
	return typeof window > "u" ? {
		getAccessToken: () => null,
		setAccessToken: () => {},
		getRefreshToken: () => null,
		setRefreshToken: () => {},
		getUser: () => null,
		setUser: () => {},
		clear: () => {}
	} : new mt();
}
var gt = 15e3, _t = {};
function vt(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r && (t[n] = r);
	return t;
}
function yt(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
function K(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function q(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function bt(e) {
	let t = e && typeof e == "object" ? e : {}, n = K(t.name) ?? "Unknown Artist", r = q(t.album_count), i = q(t.track_count);
	return {
		id: n,
		name: n,
		imageUrl: K(t.image_url),
		albumCount: r ?? void 0,
		trackCount: i ?? void 0
	};
}
function xt(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = K(n.title) ?? K(t.name) ?? K(t.title) ?? "Unknown Track";
	return {
		id: K(t.id) ?? "",
		title: r,
		durationSecs: q(n.duration_secs) ?? q(t.duration_secs) ?? 0,
		trackNumber: q(n.track_number) ?? q(t.track_number),
		streamUrl: K(t.stream_url)
	};
}
function St(e) {
	let t = e && typeof e == "object" ? e : {}, n = K(t.name) ?? K(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [], i = q(t.track_count) ?? r.length;
	return {
		id: n,
		title: n,
		artist: K(t.artist),
		albumArtUrl: K(t.album_art_url),
		year: q(t.year),
		totalTracks: i,
		tracks: r.map(xt),
		tracksTruncated: yt(t.tracks_truncated)
	};
}
function Ct(e, t, n) {
	return {
		total: q(e.total) ?? t,
		limit: q(e.limit) ?? n.limit ?? 100,
		offset: q(e.offset) ?? n.offset ?? 0
	};
}
function wt(e) {
	let t = {};
	return e.limit !== void 0 && (t.limit = String(e.limit)), e.offset !== void 0 && (t.offset = String(e.offset)), t;
}
function Tt(e) {
	if (typeof e != "object" || !e) return [];
	let t = e;
	return typeof t.id != "string" || t.id === "" ? [] : [{
		id: t.id,
		name: typeof t.name == "string" ? t.name : t.id,
		library_id: typeof t.library_id == "string" && t.library_id !== "" ? t.library_id : null,
		smart_playlist_id: typeof t.smart_playlist_id == "string" ? t.smart_playlist_id : null,
		created_at: typeof t.created_at == "string" ? t.created_at : null,
		updated_at: typeof t.updated_at == "string" ? t.updated_at : null,
		created_by: typeof t.created_by == "string" ? t.created_by : null
	}];
}
function Et(e) {
	if (typeof e != "object" || !e) return [];
	let t = e;
	return typeof t.id != "string" || t.id === "" ? [] : [{
		id: t.id,
		name: typeof t.name == "string" ? t.name : t.id,
		type: typeof t.type == "string" ? t.type : "movie"
	}];
}
function Dt(e) {
	let t = e && typeof e == "object" ? e : {}, n = (e) => typeof e == "string" ? e : "", r = (e) => typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0, i = t.fps, a = typeof i == "number" && Number.isFinite(i) ? i : typeof i == "string" && i.trim() !== "" && Number.isFinite(Number(i)) ? Number(i) : null;
	return {
		provider: n(t.provider),
		language: n(t.language ?? t.lang),
		downloadId: n(t.downloadId ?? t.download_id),
		releaseName: n(t.releaseName ?? t.release_name),
		format: n(t.format),
		matchedBy: n(t.matchedBy ?? t.matched_by),
		rating: r(t.rating),
		downloadCount: r(t.downloadCount ?? t.download_count),
		hearingImpaired: yt(t.hearingImpaired ?? t.hearing_impaired),
		fps: a
	};
}
var Ot = /^(?:[a-z][a-z0-9_]*_[a-z0-9_]*|[A-Z][A-Z0-9_]*_[A-Z0-9_]*|[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+)$/;
function kt(e) {
	return Ot.test(e);
}
function At(e) {
	if (e !== null && lt(e)) {
		let t = ut.en[e];
		if (typeof t == "string" && t !== "") return t;
	}
	return null;
}
var jt = class {
	baseUrl;
	tokens;
	doFetch;
	timeoutMs;
	instanceHeaders;
	loginPath;
	refreshPromise = null;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? ht(), this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? gt, this.instanceHeaders = vt(e.headers ?? {}), this.loginPath = e.loginPath ?? "/login";
	}
	setBaseUrl(e) {
		this.baseUrl = e;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = {
				..._t,
				...this.instanceHeaders,
				"Content-Type": "application/json"
			}, i = this.tokens.getAccessToken();
			i && (r.Authorization = `Bearer ${i}`);
			let a = {
				method: e,
				headers: r,
				credentials: "same-origin",
				signal: t
			};
			return n !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (a.body = JSON.stringify(n)), a;
		}, a = this.baseUrl !== "" && t.startsWith(this.baseUrl) ? t : `${this.baseUrl}${t}`, o = new AbortController(), s = !1, c = setTimeout(() => {
			s = !0, o.abort();
		}, this.timeoutMs), l = () => o.abort();
		r && (r.aborted ? o.abort() : r.addEventListener("abort", l, { once: !0 }));
		try {
			let e = await this.doFetch(a, i(o.signal));
			return e.status === 401 && await this.refreshToken() && (e = await this.doFetch(a, i(o.signal))), await this.handleResponse(e);
		} catch (e) {
			throw s ? new fe() : r?.aborted || e instanceof de ? e : e instanceof TypeError || me() ? new U() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new de(this.extractError(t), e.status, t);
		return t;
	}
	extractError(e) {
		if (e && typeof e == "object") {
			let t = e, n = typeof t.error == "string" && t.error !== "" ? t.error : null, r = typeof t.message == "string" && t.message !== "" ? t.message : null, i = typeof t.code == "string" ? t.code : null;
			if (n !== null && kt(n)) {
				let e = At(i) ?? At(n);
				return e === null ? r ?? n : e;
			}
			if (r !== null) return r;
			if (n !== null) return n;
			let a = At(i);
			if (a !== null) return a;
		}
		return "Request failed";
	}
	async refreshToken() {
		return this.refreshPromise === null && (this.refreshPromise = (async () => {
			let e = this.tokens.getRefreshToken();
			if (!e) return !1;
			try {
				let t = await this.doFetch(`${this.baseUrl}/api/v1/auth/refresh`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "same-origin",
					body: JSON.stringify({ refresh_token: e })
				});
				if (!t.ok) return !1;
				let n = await t.json();
				return typeof n.access_token == "string" && (this.tokens.setAccessToken(n.access_token), typeof n.refresh_token == "string" && this.tokens.setRefreshToken(n.refresh_token), !0);
			} catch {
				return !1;
			}
		})().finally(() => {
			this.refreshPromise = null;
		})), this.refreshPromise;
	}
	async get(e, t, n) {
		let r = t ? "?" + new URLSearchParams(t).toString() : "";
		return this.request("GET", e + r, null, n);
	}
	async post(e, t, n) {
		return this.request("POST", e, t ?? null, n);
	}
	async put(e, t) {
		return this.request("PUT", e, t ?? null);
	}
	async patch(e, t) {
		return this.request("PATCH", e, t ?? null);
	}
	async delete(e) {
		return this.request("DELETE", e);
	}
	async matchSearch(e, t = {}, n) {
		let r = {};
		t.query !== void 0 && t.query !== "" && (r.query = t.query), t.year !== void 0 && t.year !== "" && (r.year = String(t.year)), t.type !== void 0 && (r.type = t.type);
		let i = await this.get(`/api/v1/media/${encodeURIComponent(e)}/match/search`, Object.keys(r).length ? r : void 0, n);
		return {
			results: Array.isArray(i.results) ? i.results : [],
			query: typeof i.query == "string" ? i.query : t.query ?? "",
			type: i.type === "tv" || i.type === "movie" ? i.type : t.type ?? "movie",
			context: i.context
		};
	}
	matchApply(e, t) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/match/apply`, t);
	}
	addFavorite(e) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/favorite`);
	}
	removeFavorite(e) {
		return this.delete(`/api/v1/media/${encodeURIComponent(e)}/favorite`);
	}
	markWatched(e) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/watched`);
	}
	markUnwatched(e) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/unwatched`);
	}
	deleteMediaItem(e) {
		return this.delete(`/api/v1/media/${encodeURIComponent(e)}`);
	}
	setRating(e, t) {
		return this.put(`/api/v1/media/${encodeURIComponent(e)}/rating`, { rating: t });
	}
	setLikeLevel(e, t) {
		return this.put(`/api/v1/media/${encodeURIComponent(e)}/like`, { level: t });
	}
	async listFavorites(e = {}, t) {
		let n = {};
		e.limit !== void 0 && (n.limit = String(e.limit)), e.offset !== void 0 && (n.offset = String(e.offset));
		let r = await this.get("/api/v1/users/me/favorites", Object.keys(n).length ? n : void 0, t);
		return {
			items: Array.isArray(r.items) ? r.items : [],
			limit: typeof r.limit == "number" ? r.limit : e.limit ?? 50,
			offset: typeof r.offset == "number" ? r.offset : e.offset ?? 0
		};
	}
	async listPosters(e, t) {
		let n = await this.get(`/api/v1/media/${encodeURIComponent(e)}/posters`, void 0, t);
		return {
			candidates: Array.isArray(n.candidates) ? n.candidates : [],
			current_poster_url: typeof n.current_poster_url == "string" ? n.current_poster_url : null
		};
	}
	setPoster(e, t) {
		return this.put(`/api/v1/media/${encodeURIComponent(e)}/poster`, { poster_url: t });
	}
	async toApiError(e) {
		let t = e.headers.get("content-type") ?? "", n = null;
		try {
			n = t.includes("application/json") ? await e.json() : await e.text();
		} catch {}
		return new de(this.extractError(n), e.status, n);
	}
	async postFormData(e, t) {
		let n = {
			..._t,
			...this.instanceHeaders
		}, r = this.tokens.getAccessToken();
		r && (n.Authorization = `Bearer ${r}`);
		let i = await this.doFetch(`${this.baseUrl}${e}`, {
			method: "POST",
			headers: n,
			credentials: "same-origin",
			body: t
		});
		if (!i.ok) throw await this.toApiError(i);
		return i.json();
	}
	async uploadAvatar(e) {
		let t = new FormData();
		return t.append("avatar", e), this.postFormData("/api/v1/users/me/avatar", t);
	}
	async deleteAvatar() {
		let e = {
			..._t,
			...this.instanceHeaders
		}, t = this.tokens.getAccessToken();
		t && (e.Authorization = `Bearer ${t}`);
		let n = await this.doFetch(`${this.baseUrl}/api/v1/users/me/avatar`, {
			method: "DELETE",
			headers: e,
			credentials: "same-origin"
		});
		if (!n.ok) throw await this.toApiError(n);
	}
	isLoggedIn() {
		return this.tokens.getAccessToken() !== null;
	}
	async getCurrentUser() {
		let e = await this.get("/api/v1/auth/me"), t = e?.user;
		if (!t || typeof t != "object") throw new de("Malformed /auth/me response: missing user object", 200, e);
		let n = t;
		return {
			...t,
			is_admin: yt(n.is_admin)
		};
	}
	async searchByMarker(e, t, n = 30, r = 20, i) {
		let a = {
			type: e,
			position: String(t),
			around: String(n),
			limit: String(r)
		};
		return this.get("/api/v1/media/search/by-marker", a, i);
	}
	async getTrickplay(e, t) {
		return this.get(`/api/v1/media/${encodeURIComponent(e)}/trickplay`, void 0, t);
	}
	async createPlaylist(e, t) {
		let n = await this.post("/api/v1/playlists", {
			name: e,
			library_id: t
		}), r = n?.collection;
		if (!r || typeof r != "object") throw new de("Malformed /api/v1/playlists response: missing collection object", 200, n);
		let i = r;
		if (typeof i.id != "string" || i.id === "") throw new de("Malformed /api/v1/playlists response: collection has no usable id", 200, n);
		return {
			id: i.id,
			name: typeof i.name == "string" ? i.name : e
		};
	}
	addToPlaylist(e, t) {
		return this.post(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	getPlaylists(e) {
		return this.get("/api/v1/collections", void 0, e).then((e) => (Array.isArray(e?.collections) ? e.collections : []).flatMap(Tt));
	}
	getPlaylist(e, t) {
		return this.get(`/api/v1/collections/${encodeURIComponent(e)}`, void 0, t).then((e) => {
			let t = Tt(e?.collection)[0];
			if (!t) throw new de("Malformed /api/v1/collections/{id} response: missing collection object", 200, e);
			let n = Array.isArray(e?.items) ? e.items.flatMap(Et) : [];
			return {
				collection: t,
				items: n,
				total: typeof e?.total == "number" ? e.total : n.length
			};
		});
	}
	removeFromPlaylist(e, t) {
		return this.delete(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	deletePlaylist(e) {
		return this.delete(`/api/v1/collections/${encodeURIComponent(e)}`);
	}
	getDownloadUrl(e) {
		return this.get(`/api/v1/media/${encodeURIComponent(e)}/download`);
	}
	getMissingEpisodes(e) {
		return this.get(`/api/v1/media/${encodeURIComponent(e)}/missing-episodes`);
	}
	shufflePlay(e) {
		return this.post("/api/v1/shuffle", { media_id: e });
	}
	updateMetadata(e, t) {
		return this.patch(`/api/v1/media/${encodeURIComponent(e)}/metadata`, t);
	}
	async searchSubtitles(e, t, n) {
		let r = t.filter((e) => e && e.trim() !== "").join(","), i = r === "" ? void 0 : { lang: r }, a = await this.get(`/api/v1/media/${encodeURIComponent(e)}/subtitles/search`, i, n);
		return Array.isArray(a.candidates) ? a.candidates.map(Dt) : [];
	}
	downloadSubtitle(e, t) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/subtitles/download`, t);
	}
	async listArtists(e = {}, t) {
		let n = wt(e), r = await this.get("/api/v1/music/artists", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.artists) ? r.artists : [];
		return {
			artists: i.map(bt),
			...Ct(r, i.length, e)
		};
	}
	async getArtist(e, t) {
		return bt((await this.get(`/api/v1/music/artist?name=${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e = {}, t) {
		let n = wt(e);
		e.artist !== void 0 && e.artist !== "" && (n.artist = e.artist);
		let r = await this.get("/api/v1/music/albums", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.albums) ? r.albums : [];
		return {
			albums: i.map(St),
			...Ct(r, i.length, e),
			artist: K(r.artist)
		};
	}
	async getAlbum(e, t, n) {
		let r = t !== void 0 && t !== "" ? `&artist=${encodeURIComponent(t)}` : "";
		return St((await this.get(`/api/v1/music/album?name=${encodeURIComponent(e)}${r}`, void 0, n)).album);
	}
	async listTracks(e = {}, t) {
		let n = wt(e), r = await this.get("/api/v1/music/tracks", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.tracks) ? r.tracks : [];
		return {
			tracks: i.map(xt),
			...Ct(r, i.length, e)
		};
	}
	async getTrack(e, t) {
		return xt((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = this.loginPath);
	}
};
new jt();
//#endregion
//#region src/stores/useToastStore.ts
var Mt = R("phlix-toast", () => {
	let e = S([]), t = /* @__PURE__ */ new Map(), n = 0;
	function r(n) {
		let r = t.get(n);
		r && (clearTimeout(r), t.delete(n)), e.value = e.value.filter((e) => e.id !== n);
	}
	function i(i) {
		let a = ++n, o = {
			tone: "neutral",
			duration: 5e3,
			...i,
			id: a
		};
		return e.value.push(o), o.duration > 0 && t.set(a, setTimeout(() => r(a), o.duration)), a;
	}
	function a() {
		t.forEach((e) => clearTimeout(e)), t.clear(), e.value = [];
	}
	return {
		toasts: e,
		show: i,
		dismiss: r,
		clear: a,
		success: (e, t) => i({
			message: e,
			tone: "success",
			...t
		}),
		error: (e, t) => i({
			message: e,
			tone: "error",
			duration: 8e3,
			...t
		}),
		warning: (e, t) => i({
			message: e,
			tone: "warning",
			...t
		}),
		info: (e, t) => i({
			message: e,
			tone: "info",
			...t
		})
	};
});
//#endregion
//#region src/api/admin/users.ts
function Nt(e) {
	return {
		...e,
		is_admin: yt(e.is_admin)
	};
}
[
	{
		value: 0,
		label: "Unlimited"
	},
	{
		value: 1e6,
		label: "1 Mbps"
	},
	{
		value: 3e6,
		label: "3 Mbps"
	},
	{
		value: 5e6,
		label: "5 Mbps"
	},
	{
		value: 1e7,
		label: "10 Mbps"
	},
	{
		value: 2e7,
		label: "20 Mbps"
	},
	{
		value: 5e7,
		label: "50 Mbps"
	}
].map((e) => e.value);
function Pt(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Ft(e) {
	return {
		user_id: typeof e.user_id == "string" ? e.user_id : String(e.user_id ?? ""),
		bytes_in: Pt(e.bytes_in),
		bytes_out: Pt(e.bytes_out),
		quota_bytes_in: Pt(e.quota_bytes_in),
		quota_bytes_out: Pt(e.quota_bytes_out),
		max_concurrent_streams: Pt(e.max_concurrent_streams),
		throttle_bps: Pt(e.throttle_bps)
	};
}
Object.entries({
	0: "G — General Audiences (Movies)",
	1: "TV-Y — All Children (TV)",
	2: "TV-G — General Audience (TV)",
	3: "TV-Y7 — Older Children (TV)",
	4: "PG — Parental Guidance (Movies)",
	5: "TV-PG — Parental Guidance (TV)",
	6: "PG-13 — Parents Strongly Cautioned (Movies)",
	7: "TV-14 — Parents Strongly Cautioned (TV)",
	8: "R — Restricted (Movies)",
	9: "TV-MA — Mature Audience (TV)",
	10: "NC-17 — No One 17 & Under (Movies)",
	11: "X — Adult (Movies)",
	12: "UNRATED — Unrated Content"
}).map(([e, t]) => ({
	value: Number(e),
	label: t
}));
var It = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list(e) {
		let t = e?.status ? `?status=${encodeURIComponent(e.status)}` : "", { users: n } = await this.client.get(`/api/v1/admin/users${t}`);
		return Array.isArray(n) ? n.map(Nt) : [];
	}
	approve(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/approve`);
	}
	disable(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/disable`);
	}
	reject(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/reject`);
	}
	async get(e) {
		let { user: t } = await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}`);
		return Nt(t);
	}
	create(e) {
		return this.client.post("/api/v1/admin/users", e);
	}
	update(e, t) {
		return this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}`, t);
	}
	remove(e) {
		return this.client.delete(`/api/v1/admin/users/${encodeURIComponent(e)}`);
	}
	setAdmin(e, t) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/set-admin`, { is_admin: t });
	}
	resetPassword(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/reset-password`);
	}
	async getBandwidth(e) {
		return Ft(await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}/bandwidth`) ?? {});
	}
	async setThrottle(e, t) {
		return Ft(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/throttle`, { throttle_bps: t }) ?? {});
	}
	async setQuota(e, t) {
		return Ft(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/quota`, t) ?? {});
	}
	async listProfiles(e) {
		let { profiles: t } = await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}/profiles`);
		return Array.isArray(t) ? t : [];
	}
	createProfile(e, t) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/profiles`, t);
	}
	async getProfile(e) {
		let { profile: t } = await this.client.get(`/api/v1/admin/profiles/${encodeURIComponent(e)}`);
		return t;
	}
	updateProfile(e, t) {
		return this.client.put(`/api/v1/admin/profiles/${encodeURIComponent(e)}`, t);
	}
	removeProfile(e) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}`);
	}
	setPin(e, t) {
		return this.client.post(`/api/v1/admin/profiles/${encodeURIComponent(e)}/pin`, { pin: t });
	}
	clearPin(e) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}/pin`);
	}
	async listOwnProfiles() {
		let { profiles: e } = await this.client.get("/api/v1/profiles");
		return Array.isArray(e) ? e : [];
	}
	switchProfile(e) {
		return this.client.post(`/api/v1/profiles/${encodeURIComponent(e)}/switch`);
	}
	createOwnProfile(e) {
		return this.client.post("/api/v1/profiles", e);
	}
	updateOwnProfile(e, t) {
		return this.client.put(`/api/v1/profiles/${encodeURIComponent(e)}`, t);
	}
	removeOwnProfile(e) {
		return this.client.delete(`/api/v1/profiles/${encodeURIComponent(e)}`);
	}
	async profileSchedules(e) {
		let { schedules: t } = await this.client.get(`/api/v1/admin/profiles/${encodeURIComponent(e)}/schedules`);
		return Array.isArray(t) ? t : [];
	}
	createProfileSchedule(e, t, n, r, i, a) {
		return this.client.post(`/api/v1/admin/profiles/${encodeURIComponent(e)}/schedules`, {
			name: t,
			start_time: n,
			end_time: r,
			days_of_week: i,
			is_active: a
		});
	}
	updateProfileSchedule(e, t, n, r, i, a, o) {
		return this.client.put(`/api/v1/admin/profiles/${encodeURIComponent(e)}/schedules/${encodeURIComponent(t)}`, {
			name: n,
			start_time: r,
			end_time: i,
			days_of_week: a,
			is_active: o
		});
	}
	deleteProfileSchedule(e, t) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}/schedules/${encodeURIComponent(t)}`);
	}
	async profileTags(e) {
		let { tags: t } = await this.client.get(`/api/v1/admin/profiles/${encodeURIComponent(e)}/tags`);
		return Array.isArray(t) ? t : [];
	}
	addProfileTag(e, t, n) {
		return this.client.post(`/api/v1/admin/profiles/${encodeURIComponent(e)}/tags`, {
			tag: t,
			tag_type: n
		});
	}
	deleteProfileTag(e, t) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}/tags/${encodeURIComponent(t)}`);
	}
	async profileStreamLimits(e) {
		return this.client.get(`/api/v1/admin/profiles/${encodeURIComponent(e)}/stream-limits`);
	}
	updateProfileStreamLimits(e, t, n) {
		return this.client.put(`/api/v1/admin/profiles/${encodeURIComponent(e)}/stream-limits`, {
			max_concurrent_streams: t,
			max_total_bandwidth_kbps: n
		});
	}
};
//#endregion
//#region src/composables/useApiBase.ts
function Lt(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function Rt() {
	let e = f("apiBase", "");
	return r(() => Lt(e));
}
function zt() {
	let e = f("mediaApiBase", void 0), t = f("apiBase", "");
	return r(() => Lt(e) || Lt(t));
}
//#endregion
//#region src/stores/useAuthStore.ts
function Bt(e) {
	return typeof e == "string" ? e : e?.value ?? "/login";
}
function Vt(e) {
	return !(e instanceof de) || !e.body || typeof e.body != "object" || !("code" in e.body) ? null : String(e.body.code ?? "") || null;
}
var Ht = R("auth", () => {
	let e = new mt(), t = Rt(), n = f("loginPath", "/login"), i = r(() => Bt(n)), a = new jt({
		tokenStore: e,
		baseUrl: t.value,
		loginPath: i.value
	});
	N(t, (e) => a.setBaseUrl(e));
	let o = S(null), s = S(!1), c = S(null), l = S(null), u = S(e.getAccessToken()), d = S(!1), p = null, m = r(() => u.value !== null), h = r(() => o.value?.is_admin === !0);
	function g(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), u.value = t;
	}
	async function _(e, t) {
		s.value = !0, c.value = null, l.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await a.post("/api/v1/auth/login", n);
			return g(r.access_token, r.refresh_token), await y(), m.value;
		} catch (e) {
			return c.value = e instanceof Error ? e.message : "Login failed", l.value = Vt(e), !1;
		} finally {
			s.value = !1;
		}
	}
	async function v(e, t, n) {
		s.value = !0, c.value = null, l.value = null;
		try {
			let r = await a.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return g(r.access_token, r.refresh_token), await y(), m.value;
		} catch (e) {
			return c.value = e instanceof Error ? e.message : "Registration failed", l.value = Vt(e), !1;
		} finally {
			s.value = !1;
		}
	}
	async function y() {
		if (m.value) {
			l.value = null;
			try {
				o.value = await a.getCurrentUser();
			} catch (t) {
				l.value = Vt(t), o.value = null, e.clear(), u.value = null;
			}
		}
	}
	async function b() {
		if (!d.value) return p === null && (p = y().finally(() => {
			d.value = !0;
		})), p;
	}
	function x() {
		a.logout(!1), u.value = null, o.value = null, typeof window < "u" && (window.location.href = i.value);
	}
	async function C(e) {
		s.value = !0, c.value = null, l.value = null;
		try {
			let t = await a.uploadAvatar(e);
			o.value && (o.value.avatar_url = t.avatar_url);
		} catch (e) {
			throw c.value = e instanceof Error ? e.message : "Avatar upload failed", l.value = Vt(e), e;
		} finally {
			s.value = !1;
		}
	}
	async function w() {
		s.value = !0, c.value = null, l.value = null;
		try {
			await a.deleteAvatar(), o.value && (o.value.avatar_url = null);
		} catch (e) {
			throw c.value = e instanceof Error ? e.message : "Avatar deletion failed", l.value = Vt(e), e;
		} finally {
			s.value = !1;
		}
	}
	return {
		user: o,
		loading: s,
		error: c,
		errorCode: l,
		isLoggedIn: m,
		isAdmin: h,
		client: a,
		login: _,
		signup: v,
		setTokens: g,
		fetchUser: y,
		init: b,
		logout: x,
		uploadAvatar: C,
		deleteAvatar: w
	};
}), Ut = "phlix.active_profile", Wt = Ut;
function Gt(e) {
	return `${Ut}.${e}`;
}
function Kt(e) {
	if (typeof localStorage > "u" || e === null) return null;
	let t = localStorage.getItem(Gt(e));
	return typeof t == "string" && t !== "" ? t : null;
}
function qt(e, t) {
	if (typeof localStorage > "u" || e === null) return;
	let n = Gt(e);
	t === null ? localStorage.removeItem(n) : localStorage.setItem(n, t);
}
function Jt() {
	typeof localStorage > "u" || localStorage.removeItem(Wt);
}
var Yt = R("profile", () => {
	let e = Ht(), t = Rt();
	function n() {
		let t = e.user?.id;
		return typeof t == "string" && t !== "" ? t : null;
	}
	let i = n();
	Jt();
	let a = S([]), o = S(!1), s = S(!1), c = S(null), l = S(Kt(i)), u = S(null), d = S(!1), f = S(!1), p = S(0), m = null;
	function h(e) {
		return m ? m.setBaseUrl(e) : m = new jt({ baseUrl: e }), new It(m);
	}
	let g = r(() => a.value.length > 1), _ = r(() => a.value.find((e) => e.id === l.value) ?? null), v = r(() => s.value && a.value.length > 1 && !d.value), y = r(() => l.value ?? "account");
	async function b(e = !1) {
		if (!o.value && !(s.value && !e)) {
			o.value = !0, c.value = null;
			try {
				let e = await h(t.value).listOwnProfiles();
				a.value = e, s.value = !0;
				let n = e.find((e) => e.is_active)?.id ?? null;
				n !== null && n !== l.value && (l.value = n, qt(i, n));
			} catch (e) {
				c.value = pe(e, "Could not load your profiles.");
			} finally {
				o.value = !1;
			}
		}
	}
	function x() {
		return s.value = !1, b();
	}
	async function C(n) {
		if (n === "") return c.value = "Cannot switch to an unknown profile.", !1;
		if (n === l.value) return d.value = !0, f.value = !1, !0;
		u.value = n, c.value = null;
		try {
			let r = await h(t.value).switchProfile(n);
			return e.setTokens(r.access_token, r.refresh_token), r.user && typeof r.user == "object" && (e.user = r.user), l.value = r.profile_id ?? n, qt(i, l.value), d.value = !0, f.value = !1, a.value = a.value.map((e) => ({
				...e,
				is_active: e.id === l.value
			})), !0;
		} catch (e) {
			return c.value = pe(e, "Could not switch profiles."), !1;
		} finally {
			u.value = null;
		}
	}
	function w() {
		d.value = !0, f.value = !1;
	}
	function T() {
		d.value = !1, f.value = !0, !s.value && !o.value && x();
	}
	async function E(e) {
		c.value = null;
		try {
			return await h(t.value).createOwnProfile({ name: e }), await b(!0), !0;
		} catch (e) {
			return c.value = pe(e, "Could not create the profile."), !1;
		}
	}
	async function D(e, n) {
		c.value = null;
		try {
			return await h(t.value).updateOwnProfile(e, { name: n }), await b(!0), !0;
		} catch (e) {
			return c.value = pe(e, "Could not rename the profile."), !1;
		}
	}
	async function O(e) {
		c.value = null;
		try {
			await h(t.value).removeOwnProfile(e);
			let n = e === l.value;
			return n && (l.value = null, qt(i, null)), await b(!0), n && l.value !== null && (p.value += 1), !0;
		} catch (e) {
			return c.value = pe(e, "Could not delete the profile."), !1;
		}
	}
	function k() {
		a.value = [], o.value = !1, s.value = !1, c.value = null, u.value = null, d.value = !1, f.value = !1, l.value = null, qt(i, null);
	}
	return N(l, (e, t) => {
		t !== null && e !== t && (p.value += 1);
	}), N(() => e.isLoggedIn, (e) => {
		e || k();
	}), N(n, (e, t) => {
		e !== null && e !== t && (i = e, l.value === null && (l.value = Kt(e)));
	}), {
		profiles: a,
		loading: o,
		loaded: s,
		error: c,
		activeProfileId: l,
		switchingId: u,
		choiceMade: d,
		arming: f,
		epoch: p,
		hasMultipleProfiles: g,
		activeProfile: _,
		gateOpen: v,
		scopeKey: y,
		load: b,
		retry: x,
		switchTo: C,
		createProfile: E,
		rename: D,
		removeProfile: O,
		acknowledgeChoice: w,
		openGate: T,
		reset: k
	};
}), Xt = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), Zt = R("user-item-data", () => {
	let e = S(/* @__PURE__ */ new Map()), t = Yt();
	N(() => t.epoch, () => {
		e.value = /* @__PURE__ */ new Map();
	});
	let n = null;
	function r(e) {
		return n ? n.setBaseUrl(e) : n = new jt({ baseUrl: e }), n;
	}
	function i(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function a(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function o(t) {
		return e.value.get(t)?.watched ?? !1;
	}
	function s(t) {
		return e.value.get(t) ?? { ...Xt };
	}
	function c(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0,
			watched: n?.watched ?? !1
		});
	}
	function l(t, n) {
		let r = e.value.get(t) ?? { ...Xt };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function u(e, t) {
		let n = i(e), a = !n;
		l(e, { favorite: a });
		try {
			let n = r(t);
			a ? await n.addFavorite(e) : await n.removeFavorite(e);
		} catch (t) {
			l(e, { favorite: n });
			let r = a ? "add to" : "remove from";
			Mt().error(`Failed to ${r} favorites: ${pe(t)}`);
		}
	}
	async function d(e, t) {
		let n = o(e), i = !n;
		l(e, { watched: i });
		try {
			let n = r(t);
			i ? await n.markWatched(e) : await n.markUnwatched(e);
		} catch (t) {
			l(e, { watched: n });
			let r = i ? "watched" : "unwatched";
			Mt().error(`Failed to mark ${r}: ${pe(t)}`);
		}
	}
	async function f(e, t, n) {
		let i = Math.trunc(Number(t));
		Number.isFinite(i) || (i = 0), i < -2 && (i = -2), i > 2 && (i = 2);
		let o = a(e);
		l(e, { like_level: i });
		try {
			await r(n).setLikeLevel(e, i);
		} catch (t) {
			l(e, { like_level: o }), Mt().error(`Failed to set rating: ${pe(t)}`);
		}
	}
	function p() {
		e.value = /* @__PURE__ */ new Map(), n = null;
	}
	return {
		entries: e,
		isFavorite: i,
		likeLevel: a,
		isWatched: o,
		get: s,
		hydrate: c,
		toggleFavorite: u,
		toggleWatched: d,
		setLike: f,
		reset: p
	};
}), Qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $t(e, t) {
	return x(), o("svg", Qt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var en = p({
	name: "lucide-play",
	render: $t
}), tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nn(e, t) {
	return x(), o("svg", tn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), s("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var rn = p({
	name: "lucide-pause",
	render: nn
}), an = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function on(e, t) {
	return x(), o("svg", an, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var sn = p({
	name: "lucide-skip-back",
	render: on
}), cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ln(e, t) {
	return x(), o("svg", cn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var un = p({
	name: "lucide-skip-forward",
	render: ln
}), dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fn(e, t) {
	return x(), o("svg", dn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var pn = p({
	name: "lucide-rotate-ccw",
	render: fn
}), mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hn(e, t) {
	return x(), o("svg", mn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var gn = p({
	name: "lucide-rotate-cw",
	render: hn
}), _n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vn(e, t) {
	return x(), o("svg", _n, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var yn = p({
	name: "lucide-volume-2",
	render: vn
}), bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xn(e, t) {
	return x(), o("svg", bn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var Sn = p({
	name: "lucide-volume-1",
	render: xn
}), Cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wn(e, t) {
	return x(), o("svg", Cn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var Tn = p({
	name: "lucide-volume-x",
	render: wn
}), En = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dn(e, t) {
	return x(), o("svg", En, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), s("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var On = p({
	name: "lucide-shuffle",
	render: Dn
}), kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function An(e, t) {
	return x(), o("svg", kn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "m17 2l4 4l-4 4" }),
		s("path", { d: "M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4l4-4" }),
		s("path", { d: "M21 13v1a4 4 0 0 1-4 4H3" })
	], -1)]]);
}
var jn = p({
	name: "lucide-repeat",
	render: An
}), Mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nn(e, t) {
	return x(), o("svg", Mn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "m17 2l4 4l-4 4" }),
		s("path", { d: "M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4l4-4" }),
		s("path", { d: "M21 13v1a4 4 0 0 1-4 4H3m8-8h1v4" })
	], -1)]]);
}
var Pn = p({
	name: "lucide-repeat-1",
	render: Nn
}), Fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function In(e, t) {
	return x(), o("svg", Fn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M16 5H3m8 7H3m8 7H3m18-3V5" }), s("circle", {
		cx: "18",
		cy: "16",
		r: "3"
	})], -1)]]);
}
var Ln = p({
	name: "lucide-list-music",
	render: In
}), Rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zn(e, t) {
	return x(), o("svg", Rn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), s("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var Bn = p({
	name: "lucide-captions",
	render: zn
}), Vn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Hn(e, t) {
	return x(), o("svg", Vn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var Un = p({
	name: "lucide-captions-off",
	render: Hn
}), Wn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gn(e, t) {
	return x(), o("svg", Wn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), s("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var Kn = p({
	name: "lucide-picture-in-picture-2",
	render: Gn
}), qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jn(e, t) {
	return x(), o("svg", qn, [...t[0] ||= [s("rect", {
		width: "20",
		height: "12",
		x: "2",
		y: "6",
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		rx: "2"
	}, null, -1)]]);
}
var Yn = p({
	name: "lucide-rectangle-horizontal",
	render: Jn
}), Xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zn(e, t) {
	return x(), o("svg", Xn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var Qn = p({
	name: "lucide-maximize",
	render: Zn
}), $n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function er(e, t) {
	return x(), o("svg", $n, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var tr = p({
	name: "lucide-minimize",
	render: er
}), nr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rr(e, t) {
	return x(), o("svg", nr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var ir = p({
	name: "lucide-maximize-2",
	render: rr
}), ar = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function or(e, t) {
	return x(), o("svg", ar, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var sr = p({
	name: "lucide-cast",
	render: or
}), cr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lr(e, t) {
	return x(), o("svg", cr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), s("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var ur = p({
	name: "lucide-settings",
	render: lr
}), dr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fr(e, t) {
	return x(), o("svg", dr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var pr = p({
	name: "lucide-gauge",
	render: fr
}), mr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hr(e, t) {
	return x(), o("svg", mr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), s("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var gr = p({
	name: "lucide-film",
	render: hr
}), _r = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vr(e, t) {
	return x(), o("svg", _r, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		s("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		s("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var yr = p({
	name: "lucide-image",
	render: vr
}), br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xr(e, t) {
	return x(), o("svg", br, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "M9 18V5l12-2v13" }),
		s("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		s("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var Sr = p({
	name: "lucide-music",
	render: xr
}), Cr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wr(e, t) {
	return x(), o("svg", Cr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m17 2l-5 5l-5-5" }), s("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var Tr = p({
	name: "lucide-tv",
	render: wr
}), Er = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dr(e, t) {
	return x(), o("svg", Er, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var Or = p({
	name: "lucide-book",
	render: Dr
}), kr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ar(e, t) {
	return x(), o("svg", kr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var jr = p({
	name: "lucide-headphones",
	render: Ar
}), Mr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nr(e, t) {
	return x(), o("svg", Mr, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var Pr = p({
	name: "lucide-disc-3",
	render: Nr
}), Fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ir(e, t) {
	return x(), o("svg", Fr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "m11 7.601l-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" }),
		s("path", { d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2s-2.775-3.369-1.5-4.5" }),
		s("circle", {
			cx: "16",
			cy: "7",
			r: "5"
		})
	], -1)]]);
}
var Lr = p({
	name: "lucide-mic-2",
	render: Ir
}), Rr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zr(e, t) {
	return x(), o("svg", Rr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m16 13l5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }), s("rect", {
		width: "14",
		height: "12",
		x: "2",
		y: "6",
		rx: "2"
	})], -1)]]);
}
var Br = p({
	name: "lucide-video",
	render: zr
}), Vr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Hr(e, t) {
	return x(), o("svg", Vr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m21 21l-4.34-4.34" }), s("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var Ur = p({
	name: "lucide-search",
	render: Hr
}), Wr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gr(e, t) {
	return x(), o("svg", Wr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Kr = p({
	name: "lucide-sliders-horizontal",
	render: Gr
}), qr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jr(e, t) {
	return x(), o("svg", qr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "M8 2v3m8-3v3" }),
		s("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2"
		}),
		s("path", { d: "M3 9h18" })
	], -1)]]);
}
var Yr = p({
	name: "lucide-calendar",
	render: Jr
}), Xr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zr(e, t) {
	return x(), o("svg", Xr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Qr = p({
	name: "lucide-arrow-up-down",
	render: Zr
}), $r = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ei(e, t) {
	return x(), o("svg", $r, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var ti = p({
	name: "lucide-star",
	render: ei
}), ni = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ri(e, t) {
	return x(), o("svg", ni, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var ii = p({
	name: "lucide-list",
	render: ri
}), ai = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oi(e, t) {
	return x(), o("svg", ai, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"></rect></g>", 1)]]);
}
var si = p({
	name: "lucide-layout-grid",
	render: oi
}), ci = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function li(e, t) {
	return x(), o("svg", ci, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "M2 3v18" }),
		s("rect", {
			width: "12",
			height: "18",
			x: "6",
			y: "3",
			rx: "2"
		}),
		s("path", { d: "M22 3v18" })
	], -1)]]);
}
var ui = p({
	name: "lucide-gallery-horizontal",
	render: li
}), di = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fi(e, t) {
	return x(), o("svg", di, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "M12 3v18" }),
		s("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2"
		}),
		s("path", { d: "M3 9h18M3 15h18" })
	], -1)]]);
}
var pi = p({
	name: "lucide-table",
	render: fi
}), mi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hi(e, t) {
	return x(), o("svg", mi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var gi = p({
	name: "lucide-plus",
	render: hi
}), _i = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vi(e, t) {
	return x(), o("svg", _i, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var yi = p({
	name: "lucide-info",
	render: vi
}), bi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xi(e, t) {
	return x(), o("svg", bi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Si = p({
	name: "lucide-x",
	render: xi
}), Ci = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wi(e, t) {
	return x(), o("svg", Ci, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var Ti = p({
	name: "lucide-check",
	render: wi
}), Ei = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Di(e, t) {
	return x(), o("svg", Ei, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2"
	}), s("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })], -1)]]);
}
var Oi = p({
	name: "lucide-lock",
	render: Di
}), ki = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ai(e, t) {
	return x(), o("svg", ki, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var ji = p({
	name: "lucide-bookmark",
	render: Ai
}), Mi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ni(e, t) {
	return x(), o("svg", Mi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Pi = p({
	name: "lucide-bookmark-plus",
	render: Ni
}), Fi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ii(e, t) {
	return x(), o("svg", Fi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Li = p({
	name: "lucide-heart",
	render: Ii
}), Ri = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zi(e, t) {
	return x(), o("svg", Ri, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var Bi = p({
	name: "lucide-thumbs-up",
	render: zi
}), Vi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Hi(e, t) {
	return x(), o("svg", Vi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var Ui = p({
	name: "lucide-thumbs-down",
	render: Hi
}), Wi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gi(e, t) {
	return x(), o("svg", Wi, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), s("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Ki = p({
	name: "lucide-user",
	render: Gi
}), qi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ji(e, t) {
	return x(), o("svg", qi, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" }), s("circle", {
		cx: "9",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Yi = p({
	name: "lucide-users",
	render: Ji
}), Xi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zi(e, t) {
	return x(), o("svg", Xi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Qi = p({
	name: "lucide-log-out",
	render: Zi
}), $i = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ea(e, t) {
	return x(), o("svg", $i, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var ta = p({
	name: "lucide-menu",
	render: ea
}), na = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ra(e, t) {
	return x(), o("svg", na, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		s("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		s("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var ia = p({
	name: "lucide-more-horizontal",
	render: ra
}), aa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oa(e, t) {
	return x(), o("svg", aa, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), s("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var sa = p({
	name: "lucide-eye",
	render: oa
}), ca = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function la(e, t) {
	return x(), o("svg", ca, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var ua = p({
	name: "lucide-eye-off",
	render: la
}), da = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fa(e, t) {
	return x(), o("svg", da, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m15.5 7.5l2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4m2-2l-9.6 9.6" }), s("circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5"
	})], -1)]]);
}
var pa = p({
	name: "lucide-key",
	render: fa
}), ma = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ha(e, t) {
	return x(), o("svg", ma, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var ga = p({
	name: "lucide-trash",
	render: ha
}), _a = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function va(e, t) {
	return x(), o("svg", _a, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var ya = p({
	name: "lucide-arrow-left",
	render: va
}), ba = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xa(e, t) {
	return x(), o("svg", ba, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Sa = p({
	name: "lucide-arrow-right",
	render: xa
}), Ca = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wa(e, t) {
	return x(), o("svg", Ca, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var Ta = p({
	name: "lucide-arrow-up",
	render: wa
}), Ea = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Da(e, t) {
	return x(), o("svg", Ea, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var Oa = p({
	name: "lucide-arrow-down",
	render: Da
}), ka = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Aa(e, t) {
	return x(), o("svg", ka, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var ja = p({
	name: "lucide-chevron-down",
	render: Aa
}), Ma = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Na(e, t) {
	return x(), o("svg", Ma, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var Pa = p({
	name: "lucide-chevron-up",
	render: Na
}), Fa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ia(e, t) {
	return x(), o("svg", Fa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var La = p({
	name: "lucide-chevron-left",
	render: Ia
}), Ra = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function za(e, t) {
	return x(), o("svg", Ra, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Ba = p({
	name: "lucide-chevron-right",
	render: za
}), Va = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ha(e, t) {
	return x(), o("svg", Va, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
	}, null, -1)]]);
}
var Ua = p({
	name: "lucide-chevrons-left",
	render: Ha
}), Wa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ga(e, t) {
	return x(), o("svg", Wa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 17l5-5l-5-5m7 10l5-5l-5-5"
	}, null, -1)]]);
}
var Ka = p({
	name: "lucide-chevrons-right",
	render: Ga
}), qa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ja(e, t) {
	return x(), o("svg", qa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Ya = p({
	name: "lucide-loader-circle",
	render: Ja
}), Xa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Za(e, t) {
	return x(), o("svg", Xa, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var Qa = p({
	name: "lucide-circle-alert",
	render: Za
}), $a = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function eo(e, t) {
	return x(), o("svg", $a, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var to = p({
	name: "lucide-circle-check",
	render: eo
}), no = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ro(e, t) {
	return x(), o("svg", no, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var io = p({
	name: "lucide-circle-x",
	render: ro
}), ao = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oo(e, t) {
	return x(), o("svg", ao, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), s("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var so = p({
	name: "lucide-sun",
	render: oo
}), co = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lo(e, t) {
	return x(), o("svg", co, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var uo = p({
	name: "lucide-moon",
	render: lo
}), fo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function po(e, t) {
	return x(), o("svg", fo, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), s("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var mo = p({
	name: "lucide-monitor",
	render: po
}), ho = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function go(e, t) {
	return x(), o("svg", ho, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
	}, null, -1)]]);
}
//#endregion
//#region src/components/icon-registry.ts
var _o = {
	play: en,
	pause: rn,
	"skip-back": sn,
	"skip-forward": un,
	rewind: pn,
	forward: gn,
	volume: yn,
	"volume-low": Sn,
	mute: Tn,
	shuffle: On,
	repeat: jn,
	"repeat-1": Pn,
	"list-music": Ln,
	captions: Bn,
	"captions-off": Un,
	pip: Kn,
	theater: Yn,
	fullscreen: Qn,
	"fullscreen-exit": tr,
	expand: ir,
	cast: sr,
	settings: ur,
	speed: pr,
	film: gr,
	image: yr,
	music: Sr,
	tv: Tr,
	book: Or,
	headphones: jr,
	disc: Pr,
	mic: Lr,
	video: Br,
	search: Ur,
	filter: Kr,
	calendar: Yr,
	sort: Qr,
	star: ti,
	list: ii,
	grid: si,
	backdrop: ui,
	table: pi,
	plus: gi,
	info: yi,
	x: Si,
	check: Ti,
	lock: Oi,
	bookmark: ji,
	"bookmark-plus": Pi,
	heart: Li,
	"thumbs-up": Bi,
	"thumbs-down": Ui,
	user: Ki,
	users: Yi,
	"log-out": Qi,
	menu: ta,
	more: ia,
	eye: sa,
	"eye-off": ua,
	refresh: gn,
	key: pa,
	trash: ga,
	"arrow-left": ya,
	"arrow-right": Sa,
	"arrow-up": Ta,
	"arrow-down": Oa,
	"chevron-down": ja,
	"chevron-up": Pa,
	"chevron-left": La,
	"chevron-right": Ba,
	"chevrons-left": Ua,
	"chevrons-right": Ka,
	spinner: Ya,
	alert: Qa,
	"alert-circle": Qa,
	success: to,
	error: io,
	sun: so,
	moon: uo,
	monitor: mo,
	"external-link": p({
		name: "lucide-external-link",
		render: go
	})
};
Object.keys(_o);
//#endregion
//#region src/components/Icon.vue
var J = /* @__PURE__ */ d({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = e, n = r(() => _o[t.name]), a = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (x(), i(T(n.value), {
			class: "phlix-icon",
			style: _(a.value ? { fontSize: a.value } : void 0),
			"stroke-width": e.strokeWidth,
			role: e.label ? "img" : void 0,
			"aria-label": e.label,
			"aria-hidden": e.label ? void 0 : "true",
			focusable: "false"
		}, null, 8, [
			"style",
			"stroke-width",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
}), vo = ["id"], yo = 8, bo = /*@__PURE__*/ d({
	__name: "Tooltip",
	props: {
		text: {},
		placement: { default: "top" },
		delay: { default: 300 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, r = k(), i = S(!1), s = S(null), c = S(null), d;
		function f() {
			return s.value?.firstElementChild ?? null;
		}
		function p(e) {
			let t = e.parentElement;
			for (; t && t !== document.body && t !== document.documentElement;) {
				let e = getComputedStyle(t);
				if (e.overflowX !== "visible" || e.overflow !== "" && e.overflow !== "visible") return t;
				t = t.parentElement;
			}
			return null;
		}
		function m(e) {
			e && (e.style.maxWidth = "", e.style.whiteSpace = "", e.style.removeProperty("--phlix-tooltip-shift"));
		}
		function _() {
			let e = s.value, n = c.value;
			if (!e || !n || (m(n), t.placement === "left" || t.placement === "right")) return;
			let r = p(e);
			if (!r) return;
			let i = r.getBoundingClientRect();
			if (i.width <= 0) return;
			n.style.maxWidth = `${Math.max(0, i.width - 16)}px`, n.style.whiteSpace = "normal";
			let a = n.getBoundingClientRect(), o = a.right - (i.right - yo), l = i.left + yo - a.left, u = 0;
			o > 0 ? u = -o : l > 0 && (u = l), u !== 0 && n.style.setProperty("--phlix-tooltip-shift", `${u}px`);
		}
		function y() {
			t.disabled || (clearTimeout(d), d = setTimeout(() => {
				i.value = !0, f()?.setAttribute("aria-describedby", r), h(_);
			}, t.delay));
		}
		function b() {
			clearTimeout(d), m(c.value), i.value = !1, f()?.removeAttribute("aria-describedby");
		}
		return v(() => clearTimeout(d)), (t, d) => (x(), o("span", {
			ref_key: "wrapEl",
			ref: s,
			class: "phlix-tooltip-wrap",
			onMouseenter: y,
			onMouseleave: b,
			onFocusin: y,
			onFocusout: b,
			onKeydown: I(b, ["esc"])
		}, [w(t.$slots, "default", {}, void 0, !0), u(n, { name: "phlix-tooltip" }, {
			default: P(() => [i.value && (e.text || t.$slots.content) ? (x(), o("span", {
				key: 0,
				id: O(r),
				ref_key: "tipEl",
				ref: c,
				role: "tooltip",
				class: g(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [w(t.$slots, "content", {}, () => [l(E(e.text), 1)], !0)], 10, vo)) : a("", !0)]),
			_: 3
		})], 544));
	}
}), Y = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, xo = /*#__PURE__*/ Y(bo, [["__scopeId", "data-v-83b83959"]]), So = ["data-level"], Co = ["disabled", "aria-pressed"], wo = ["disabled", "aria-pressed"], To = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ThumbRating",
	props: {
		level: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["cycle", "update:level"],
	setup(e, { emit: t }) {
		let n = e, c = t, l = r(() => {
			let e = Math.trunc(Number(n.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), d = r(() => l.value >= 0), f = r(() => l.value <= 0), p = r(() => l.value >= 1), m = r(() => l.value === 2), h = r(() => l.value <= -1), _ = r(() => l.value === -2);
		function v() {
			return l.value <= 0 ? 1 : l.value === 1 ? 2 : 0;
		}
		function y() {
			return l.value >= 0 ? -1 : l.value === -1 ? -2 : 0;
		}
		function b() {
			if (n.disabled) return;
			let e = v();
			c("cycle", e), c("update:level", e);
		}
		function S() {
			if (n.disabled) return;
			let e = y();
			c("cycle", e), c("update:level", e);
		}
		return (t, n) => (x(), o("div", {
			class: "thumb-rating",
			"data-level": l.value
		}, [d.value ? (x(), i(xo, {
			key: 0,
			text: "Like"
		}, {
			default: P(() => [s("button", {
				type: "button",
				class: g(["thumb-rating__btn thumb-rating__btn--up", {
					"is-filled": p.value,
					"is-blue": m.value
				}]),
				disabled: e.disabled,
				"aria-label": "Like",
				"aria-pressed": p.value ? "true" : "false",
				onClick: b
			}, [u(J, {
				name: "thumbs-up",
				class: "thumb-rating__icon"
			})], 10, Co)]),
			_: 1
		})) : a("", !0), f.value ? (x(), i(xo, {
			key: 1,
			text: "Dislike"
		}, {
			default: P(() => [s("button", {
				type: "button",
				class: g(["thumb-rating__btn thumb-rating__btn--down", {
					"is-filled": h.value,
					"is-blue": _.value
				}]),
				disabled: e.disabled,
				"aria-label": "Dislike",
				"aria-pressed": h.value ? "true" : "false",
				onClick: S
			}, [u(J, {
				name: "thumbs-down",
				class: "thumb-rating__icon"
			})], 10, wo)]),
			_: 1
		})) : a("", !0)], 8, So));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
//#endregion
//#region src/components/player/format-time.ts
function Eo(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/utils/plural.ts
var Do = [
	"zero",
	"one",
	"two",
	"few",
	"many",
	"other"
], Oo = /* @__PURE__ */ new Map(), ko = "\0";
function Ao(e) {
	let t = e?.locale, n = e?.type ?? "cardinal", r = `${t ?? ""}${ko}${n}`, i = Oo.get(r);
	return i || (i = new Intl.PluralRules(t, { type: n }), Oo.set(r, i)), i;
}
function jo(e, t) {
	return Number.isFinite(e) ? Ao(t).select(e) : "other";
}
function Mo(e, t, n) {
	let r = t[jo(e, n)];
	return r === void 0 ? t.other : r;
}
function No(e, t, n) {
	if (!e.includes("|")) return e;
	let r = e.split("|").map((e) => e.trim());
	if (r.length === 1) return r[0];
	let i = Ao(n), a = new Set(i.resolvedOptions().pluralCategories), o = Do.filter((e) => a.has(e)), s = {};
	return o.forEach((e, t) => {
		s[e] = r[Math.min(t, r.length - 1)];
	}), Mo(t, {
		...s,
		other: s.other ?? r[r.length - 1]
	}, n);
}
function Po(e) {
	return e.includes("|");
}
//#endregion
//#region src/i18n/messages.ts
var Fo = {
	common: {
		retry: "Retry",
		close: "Close",
		dismiss: "Dismiss",
		loading: "Loading",
		notifications: "Notifications",
		noMatches: "No matches",
		searchPlaceholder: "Search…",
		selectPlaceholder: "Select…",
		breadcrumb: "Breadcrumb"
	},
	confirm: {
		title: "Are you sure?",
		cancel: "Cancel",
		confirm: "Confirm"
	},
	notFound: {
		title: "Page not found",
		description: "The page you are looking for does not exist or has moved.",
		goHome: "Go home"
	},
	shell: {
		skipToContent: "Skip to content",
		primaryNav: "Primary",
		openMenu: "Open navigation menu",
		menu: "Menu",
		openCommandPalette: "Open command palette (⌘K)",
		browse: "Browse",
		explore: "Explore",
		recommendations: "For You",
		watchHistory: "Watch History",
		settings: "Settings",
		themeToggleLabel: "Theme: {current} (switch to {next})",
		account: "Account",
		accountNamed: "Account: {name}",
		signOut: "Sign out",
		signIn: "Sign in",
		switchProfile: "Switch profile",
		manageProfiles: "Manage profiles"
	},
	profiles: {
		whoIsWatching: "Who's watching?",
		loading: "Loading profiles…",
		active: "Active",
		manageTitle: "Manage profiles",
		manageHint: "Pick a profile to switch to it, or rename and delete the ones you have.",
		use: "Switch to",
		add: "Add profile",
		rename: "Rename",
		renameTooShort: "Profile names need at least 3 characters.",
		delete: "Delete",
		deleteConfirm: "Delete “{name}”? This profile cannot be recovered.",
		save: "Save",
		cancel: "Cancel",
		deleteBlocked: "The last profile on an account cannot be deleted.",
		empty: "No profiles on this account yet."
	},
	palette: {
		title: "Command palette",
		placeholder: "Type a command or search…",
		commands: "Commands",
		recent: "Recent",
		noResults: "No matching commands",
		searchLibrary: "Search library for “{query}”",
		goToBrowse: "Go to Browse",
		goToSettings: "Go to Settings",
		themeNocturne: "Theme: Nocturne",
		themeDaylight: "Theme: Daylight",
		themeMidnight: "Theme: Midnight",
		toggleDensity: "Toggle density",
		toggleReducedMotion: "Toggle reduced motion",
		toggleAtmosphere: "Toggle atmosphere",
		resetPreferences: "Reset preferences",
		groupNavigation: "Navigation",
		groupTheme: "Theme",
		groupPreferences: "Preferences"
	},
	auth: {
		loginEyebrow: "Member access",
		loginTitle: "Welcome back",
		loginSubtitle: "Sign in to continue to your cinema.",
		signupEyebrow: "Now showing",
		signupTitle: "Create your account",
		signupSubtitle: "Your private cinema, anywhere.",
		email: "Email",
		emailPlaceholder: "you@example.com",
		password: "Password",
		passwordPlaceholder: "Your password",
		passwordSignupPlaceholder: "At least 8 characters",
		username: "Username",
		usernamePlaceholder: "Your username",
		usernameOrEmail: "Username or email",
		usernameOrEmailPlaceholder: "you@example.com or your username",
		confirmPassword: "Confirm password",
		confirmPasswordPlaceholder: "Repeat your password",
		showPassword: "Show password",
		hidePassword: "Hide password",
		signIn: "Sign in",
		signingIn: "Signing in…",
		createAccount: "Create account",
		creatingAccount: "Creating account…",
		orContinueWith: "or continue with",
		loginFooterPrompt: "New to Phlix?",
		signupLink: "Create an account",
		signupFooterPrompt: "Already have an account?",
		signInLink: "Sign in",
		emailRequired: "Enter your email.",
		emailInvalid: "Enter a valid email address.",
		passwordRequired: "Enter your password.",
		identifierRequired: "Enter your username or email.",
		usernameRequired: "Choose a username.",
		usernameMinLength: "Username must be at least 3 characters.",
		passwordChoose: "Choose a password.",
		passwordMinLength: "Password must be at least 8 characters.",
		passwordMismatch: "Passwords do not match.",
		signInFailed: "Sign in failed.",
		signupFailed: "Registration failed."
	},
	connect: {
		eyebrow: "Get started",
		title: "Connect to your server",
		subtitle: "Enter the address of your Phlix media server or hub.",
		addressLabel: "Server address",
		addressPlaceholder: "https://your-server:8096",
		hint: "For a server on your network this is usually its local address, e.g. http://192.168.1.50:8096.",
		connect: "Connect",
		connecting: "Connecting…",
		addressRequired: "Enter your server address.",
		invalidAddress: "Enter a valid http:// or https:// server address.",
		unreachable: "Couldn't reach a Phlix server at that address. Check it and try again.",
		connectAnyway: "Connect anyway",
		plaintextWarning: "This server is unencrypted (http). Your login could be intercepted in transit. Use https if you can.",
		plaintextConfirm: "Connect over http anyway",
		originConfirm: "You are connecting to {origin} for the first time. Your sign-in token will be sent there. Continue?",
		confirmContinue: "Yes, connect",
		confirmCancel: "Cancel",
		scan: "Scan your network",
		scanning: "Scanning…",
		scanFailed: "Couldn't scan your network right now. Enter the address manually.",
		scanEmpty: "No Phlix servers found on your network.",
		scanListLabel: "Servers found on your network"
	},
	player: {
		play: "Play",
		pause: "Pause",
		back: "Back",
		nowPlaying: "Now playing",
		previousEpisode: "Previous episode",
		nextEpisode: "Next episode",
		skipIntro: "Skip intro",
		skipOutro: "Skip outro",
		skipLabelIntro: "Intro",
		skipLabelCredits: "End credits",
		skipLabelSkipCredits: "Skip credits",
		seekBackward: "Back 10 seconds",
		seekForward: "Forward 10 seconds",
		keyboardShortcuts: "Keyboard shortcuts",
		sleepTimer: "Sleep timer",
		pip: "Picture-in-picture",
		exitPip: "Exit picture-in-picture",
		theater: "Theater mode",
		exitTheater: "Exit theater mode",
		fullscreen: "Fullscreen",
		exitFullscreen: "Exit fullscreen",
		miniPlayer: "Mini player",
		expand: "Expand to full player",
		closePlayer: "Close player",
		seek: "Seek",
		shuffle: "Shuffle",
		repeat: "Repeat",
		selectTrack: "Select a track to play",
		queue: "Queue",
		queueEmpty: "Queue is empty",
		removeFromQueue: "Remove from queue",
		mute: "Mute",
		unmute: "Unmute",
		volume: "Volume",
		playbackSpeed: "Playback speed",
		quality: "Quality",
		qualityAuto: "Auto",
		qualityAutoActive: "Auto ({label})",
		qualityOriginal: "Original ({height}p)",
		directStream: "Direct",
		qualityDirectStream: "Direct stream — quality is determined by the source file",
		captionsOn: "Captions (on)",
		captionsOff: "Captions (off)",
		captionsAndSubtitles: "Captions and subtitles",
		subtitles: "Subtitles",
		subtitleTrack: "Subtitle track",
		off: "Off",
		audio: "Audio",
		audioTrack: "Audio track",
		captionStyle: "Caption style",
		size: "Size",
		captionSize: "Caption size",
		color: "Color",
		captionColor: "Caption color",
		background: "Background",
		captionBackground: "Caption background",
		edge: "Edge",
		captionEdge: "Caption edge",
		addSubtitles: "Add subtitles…",
		subtitleSearchTitle: "Add subtitles",
		subtitleSearchLanguages: "Languages",
		subtitleSearchAction: "Search",
		subtitleSearching: "Searching for subtitles…",
		subtitleSearchEmpty: "No subtitles found",
		subtitleSearchEmptyHint: "Try a different language, or check back later.",
		subtitleSearchPrompt: "Pick a language and search to find subtitles.",
		subtitleSearchError: "Couldn’t search for subtitles. Please try again.",
		subtitleAdd: "Add",
		subtitleAdding: "Adding…",
		subtitleAdded: "{language} subtitle added",
		subtitleAddedGeneric: "Subtitle added",
		subtitleAddError: "Couldn’t add that subtitle. Please try again.",
		subtitleAddNotFound: "That subtitle is no longer available.",
		subtitleQuota: "Subtitle download limit reached.",
		subtitleQuotaRemaining: "Your subtitle quota has {count} download left this period | Your subtitle quota has {count} downloads left this period.",
		subtitleQuotaReset: "Subtitle download limit reached. Resets at {time}.",
		subtitleHearingImpaired: "SDH",
		subtitleHearingImpairedFull: "Hearing impaired",
		subtitleRating: "Rating {rating}",
		subtitleDownloads: "{count} downloads",
		subtitleFps: "{fps} fps",
		subtitleAddLabel: "Add {release} from {provider}",
		chapters: "Chapters",
		chapterList: "Chapter list",
		noChapters: "No chapters",
		keyboard: "Keyboard",
		resumePlayback: "Resume playback",
		resumeFrom: "Resume from {time}?",
		resume: "Resume",
		startOver: "Start over",
		upNext: "Up next",
		startsIn: "Starts in {seconds} seconds",
		playNow: "Play now",
		cancel: "Cancel",
		transcodePreparingHeading: "Preparing your stream…",
		transcodePreparingTitled: "“{title}” is being converted to a format your browser can play. This starts in a moment.",
		transcodePreparingUntitled: "This title is being converted to a format your browser can play. This starts in a moment.",
		transcodeHeading: "Can’t start playback right now",
		transcodeBodyTitled: "We couldn’t start playback for “{title}” right now. Please try again later.",
		transcodeBodyUntitled: "We couldn’t start playback for this title right now. Please try again later.",
		goBack: "Go back",
		themeMute: "Mute theme music",
		themeUnmute: "Unmute theme music",
		themeStop: "Stop theme music",
		skipControls: "Skip controls"
	},
	itemActions: {
		addFavorite: "Add to favorites",
		removeFavorite: "Remove from favorites",
		inFavorites: "In favorites",
		watchlist: "Watchlist",
		markWatched: "Mark watched",
		watched: "Watched",
		markWatchedAria: "Mark as watched",
		markUnwatchedAria: "Mark as unwatched"
	},
	reader: {
		decreaseFont: "Decrease font size",
		increaseFont: "Increase font size",
		lightMode: "Light mode",
		sepiaMode: "Sepia mode",
		darkMode: "Dark mode"
	},
	mcpTokens: { title: "MCP Tokens" },
	syncplay: {
		syncPlay: "SyncPlay",
		inRoom: "In SyncPlay room",
		createRoom: "Create room",
		joinRoom: "Join room",
		leaveRoom: "Leave room",
		joinedRoom: "Joined {name}",
		members: "{count} member | {count} members",
		synced: "Synced",
		outOfSync: "Out of sync",
		reSyncing: "Re-syncing…",
		roomName: "Room name",
		roomId: "Room ID",
		privateRoom: "Private room",
		create: "Create",
		join: "Join",
		cancel: "Cancel",
		loading: "Loading…",
		noRooms: "No public rooms available",
		errorCreate: "Failed to create the room",
		errorJoin: "Failed to join the room",
		errorLeave: "Failed to leave the room",
		yourRole: "You are {role}",
		roleOwner: "Owner",
		roleModerator: "Moderator",
		roleMember: "Member",
		title: "SyncPlay",
		roomNamePlaceholder: "Enter room name",
		roomIdPlaceholder: "Enter room ID",
		publicRooms: "Public rooms",
		waitingForMembers: "Waiting for members…",
		rewind: "Rewind",
		fastForward: "Fast forward",
		playAll: "Play for everyone",
		pauseAll: "Pause for everyone",
		modeSelect: "Create or join a room"
	},
	music: {
		title: "Music Library",
		nav: "Music",
		artists: "Artists",
		albums: "Albums",
		tracks: "Tracks",
		play: "Play",
		pause: "Pause",
		previous: "Previous track",
		next: "Next track",
		seek: "Seek",
		noArtists: "No artists found",
		noAlbums: "No albums found",
		noTracks: "No tracks found",
		albumCount: "{count} album | {count} albums",
		trackCount: "{count} track | {count} tracks",
		year: "Year",
		duration: "Duration",
		nowPlaying: "Now playing",
		loading: "Loading…",
		streamError: "Playback unavailable — the stream link may have expired.",
		crossfade: "Crossfade",
		crossfadeDuration: "Crossfade duration",
		crossfadeSeconds: "{seconds}s",
		gapless: "Gapless playback",
		audioQuality: "Audio quality",
		qualityLow: "Low",
		qualityMedium: "Medium",
		qualityHigh: "High",
		qualityLossless: "Lossless",
		allTracks: "All Tracks",
		searchTracks: "Search tracks…",
		playAll: "Play All",
		matching: "matching",
		noTracksMatch: "No tracks match your search.",
		selectTrack: "Select a track to play",
		artist: "Artist",
		album: "Album",
		of: "of",
		artistsTotal: "{count} artist | {count} artists",
		albumsTotal: "{count} album | {count} albums",
		tracksTotal: "{count} track | {count} tracks",
		tracksOnPage: "{count} track on this page | {count} tracks on this page",
		showingRange: "Showing {from}–{to} of {total}",
		pageOf: "Page {page} of {pages}",
		firstPage: "First page",
		prevPage: "Previous page",
		nextPage: "Next page",
		lastPage: "Last page",
		jumpToPage: "Jump to page",
		pageLoadFailed: "Could not load that page. Your place is unchanged — try again.",
		pagination: "Pagination",
		paginationOf: "{label} pagination",
		shuffle: "Shuffle",
		queue: "Queue",
		queueEmpty: "Queue is empty",
		removeFromQueue: "Remove from queue",
		albumNotFound: "Album not found",
		artistNotFound: "Artist not found",
		artistsNotFound: "No artists found",
		artistsDescription: "Browse all artists in your library",
		trackListing: "Track listing",
		searchTracksAria: "Search tracks",
		musicTracksAria: "Music tracks"
	},
	settings: {
		theme: "Theme",
		accent: "Accent",
		accentColor: "Accent color",
		display: "Display",
		atmosphere: "Atmosphere",
		playback: "Playback",
		subtitles: "Subtitles",
		density: "Density",
		gridDensity: "Grid density",
		cardSize: "Card size",
		motion: "Motion",
		filmGrainGlow: "Film-grain + ambient glow",
		autoplayNext: "Autoplay next episode",
		defaultVolume: "Default volume",
		defaultQuality: "Default quality",
		crossfade: "Crossfade",
		crossfadeDuration: "Crossfade duration",
		gaplessEnabled: "Gapless playback",
		preferredAudioQuality: "Audio quality",
		defaultLanguage: "Default language",
		defaultSubtitleLanguage: "Default subtitle language",
		captionSize: "Caption size",
		captionColor: "Caption color",
		captionBackground: "Caption background",
		captionEdge: "Caption edge",
		resetAll: "Reset all preferences",
		resetConfirm: "Click again to confirm the reset",
		resetDone: "Preferences reset to defaults.",
		preferences: "Preferences",
		title: "Settings",
		sectionsLabel: "Settings sections",
		tabAppearance: "Appearance",
		tabPlayback: "Playback",
		tabSecurity: "Security",
		tabServer: "Server",
		unsaved: "Unsaved",
		saveGroup: "Save {name}",
		groupSaved: "{name} settings saved.",
		groupSaveError: "Failed to save {name} settings",
		loadFailed: "Failed to load settings",
		loadErrorTitle: "Couldn't load settings"
	},
	explore: { title: "Explore Similar" },
	recommendations: { title: "For You" },
	history: { title: "Watch History" },
	season: {
		play: "Play",
		watchlist: "Watchlist",
		inFavorites: "In favorites",
		addFavorite: "Add to favorites",
		removeFavorite: "Remove from favorites",
		markWatched: "Mark watched",
		watched: "Watched",
		markWatchedAria: "Mark as watched",
		markUnwatchedAria: "Mark as unwatched",
		noEpisodes: "No episodes to play yet",
		loadingAria: "Loading season",
		loadError: "Couldn't load this season",
		backToSeries: "Back to series",
		episodes: "Episodes",
		notFound: "Season not found",
		notFoundDescription: "{series} has no such season."
	},
	parental: {
		title: "Parental Controls",
		schedules: "Schedules",
		tags: "Tags",
		streamLimits: "Stream Limits",
		createSchedule: "Create Schedule",
		editSchedule: "Edit Schedule",
		scheduleName: "Name",
		scheduleNamePlaceholder: "e.g. Weekday Evenings",
		startTime: "Start time",
		endTime: "End time",
		days: "Days",
		active: "Active",
		inactive: "Inactive",
		addTag: "Add Tag",
		tagName: "Tag name",
		tagNamePlaceholder: "e.g. kids, restricted, work",
		tagType: "Tag type",
		tagBlocked: "Blocked",
		tagAllowed: "Allowed",
		updateLimits: "Update Limits",
		maxConcurrentStreams: "Max concurrent streams",
		maxBandwidth: "Max total bandwidth (Kbps)",
		maxBandwidthPlaceholder: "Leave empty for no limit",
		noProfileSelected: "No profile selected",
		noProfileSelectedHint: "Parental controls apply to one profile at a time. No profile was selected, so there is nothing to show yet — go back and pick a profile first.",
		noSchedules: "No access schedules",
		noSchedulesHint: "Create schedules to limit when this profile can access content.",
		noTags: "No tags",
		noTagsHint: "Add tags to block or allow specific content categories.",
		scheduleUpdated: "Schedule updated.",
		scheduleCreated: "Schedule created.",
		scheduleDeleted: "Schedule deleted.",
		tagAdded: "Tag added.",
		tagRemoved: "Tag removed.",
		streamLimitsUpdated: "Stream limits updated.",
		deleteScheduleConfirm: "Delete schedule {name}?",
		removeTagConfirm: "Remove tag {tag}?",
		loadErrorSchedules: "Couldn't load schedules",
		loadErrorTags: "Couldn't load tags",
		loadErrorStreamLimits: "Couldn't load stream limits",
		retry: "Retry"
	},
	admin: {
		"transcoding.title": "Transcoding",
		"transcoding.preferredAccelerator": "Preferred Accelerator",
		"transcoding.hdrOutput": "HDR Output",
		"transcoding.toneMapMode": "Tone Map Mode"
	}
}, Io = /\{(\w+)\}/g;
function Lo(e) {
	let t = {};
	for (let n of Object.keys(Fo)) {
		let r = Fo[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function Ro(e, t) {
	return t ? e.replace(Io, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function zo(e) {
	let t = Lo(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? Ro(Bo(s, n), n) : e;
	};
}
function Bo(e, t) {
	if (!Po(e)) return e;
	let n = t?.count, r = typeof n == "number" ? n : Number(n);
	if (!Number.isFinite(r)) {
		let t = e.split("|");
		return t[t.length - 1].trim();
	}
	return No(e, r);
}
//#endregion
//#region src/composables/useMessages.ts
function X() {
	return { t: zo(f("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Vo = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ho = { class: "scrubber__track" }, Uo = ["title"], Wo = { class: "scrubber__time numeric" }, Go = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Scrubber",
	props: {
		position: {},
		duration: {},
		buffered: { default: 0 },
		chapters: { default: () => [] },
		thumbnailAt: {},
		step: { default: 5 }
	},
	emits: [
		"seek",
		"scrub-start",
		"scrub-end"
	],
	setup(t, { expose: n, emit: i }) {
		let { t: c } = X(), l = t, u = i, d = S(null), f = S(!1), p = S(!1), m = S(0), h = S(0), v = (e) => Math.min(1, Math.max(0, e)), y = r(() => f.value ? m.value : l.duration > 0 ? v(l.position / l.duration) : 0), b = r(() => l.duration > 0 ? v(l.buffered / l.duration) : 0), w = r(() => (f.value || p.value) && l.duration > 0), T = r(() => f.value ? m.value : h.value), D = r(() => T.value * l.duration), k = r(() => w.value ? l.thumbnailAt?.(D.value) ?? null : null), A = r(() => k.value ? `url("${k.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), j = r(() => `${Math.min(96, Math.max(4, T.value * 100))}%`), M = r(() => l.duration > 0 ? l.chapters.filter((e) => e.start > 0 && e.start < l.duration).map((e) => ({
			...e,
			ratio: e.start / l.duration
		})) : []);
		function N(e) {
			let t = d.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : v((e.clientX - n.left) / n.width);
		}
		function P(e) {
			if (l.duration <= 0) return;
			f.value = !0;
			try {
				d.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = N(e);
			m.value = t, u("scrub-start"), e.preventDefault();
		}
		function F(e) {
			let t = N(e);
			h.value = t, f.value && (m.value = t);
		}
		function I(e) {
			if (f.value) {
				f.value = !1;
				try {
					d.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				u("seek", m.value * l.duration), u("scrub-end");
			}
		}
		function L() {
			p.value = !0;
		}
		function R() {
			p.value = !1;
		}
		function z(e) {
			let t = l.duration;
			if (t <= 0) return;
			let n = null;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, l.position - l.step);
					break;
				case "ArrowRight":
					n = Math.min(t, l.position + l.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			u("seek", n), e.preventDefault();
		}
		return n({
			playedRatio: y,
			previewActive: w
		}), (n, r) => (x(), o("div", {
			ref_key: "trackEl",
			ref: d,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(t.duration),
			"aria-valuenow": Math.round(t.position),
			"aria-valuetext": O(Eo)(t.position),
			"aria-label": O(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", Ho, [
			s("div", {
				class: "scrubber__buffered",
				style: _({ transform: `scaleX(${b.value})` })
			}, null, 4),
			s("div", {
				class: "scrubber__played",
				style: _({ transform: `scaleX(${y.value})` })
			}, null, 4),
			(x(!0), o(e, null, C(M.value, (e, t) => (x(), o("span", {
				key: t,
				class: "scrubber__tick",
				style: _({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Uo))), 128)),
			s("div", {
				class: g(["scrubber__head", { "is-dragging": f.value }]),
				style: _({ left: `${y.value * 100}%` })
			}, null, 6)
		]), w.value ? (x(), o("div", {
			key: 0,
			class: "scrubber__preview",
			style: _({ left: j.value }),
			"aria-hidden": "true"
		}, [k.value ? (x(), o("div", {
			key: 0,
			class: "scrubber__thumb",
			style: _({ backgroundImage: A.value })
		}, null, 4)) : a("", !0), s("span", Wo, E(O(Eo)(D.value)), 1)], 4)) : a("", !0)], 40, Vo));
	}
}), [["__scopeId", "data-v-3d610715"]]), Ko = "phlix-bandwidth-estimate";
function qo(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function Jo() {
	try {
		let e = localStorage.getItem(Ko);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? qo(t) : 0;
	} catch {
		return 0;
	}
}
function Yo(e) {
	try {
		localStorage.setItem(Ko, String(e));
	} catch {}
}
function Xo(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var Zo = null, Qo = null;
function $o() {
	Zo && Yo(Zo.bandwidthEstimate);
}
async function es(e, t, n = {}) {
	if (typeof MediaSource > "u" && Xo(e)) {
		let r = () => n.onReady?.(), i = () => n.onError?.("native hls error");
		return e.addEventListener("loadedmetadata", r), e.addEventListener("error", i), e.src = t, n.startPosition && (e.currentTime = n.startPosition), {
			destroy() {
				e.removeEventListener("loadedmetadata", r), e.removeEventListener("error", i), e.removeAttribute("src"), e.load();
			},
			levels: [],
			getCurrentLevel: () => -1,
			setCurrentLevel: () => void 0,
			setNextLevel: () => void 0,
			autoLevelEnabled: !0,
			bandwidthEstimate: 0,
			onLevelSwitched: () => () => void 0,
			audioTracks: [],
			getCurrentAudioTrack: () => -1,
			setAudioTrack: () => void 0,
			onAudioTrackSwitched: () => () => void 0,
			loadSource(t) {
				e.src = t;
			}
		};
	}
	let { default: r } = await import("./hls-B-wbkQ7j.js");
	if (r.isSupported()) {
		let i = Jo(), a = new r({
			enableWorker: !0,
			lowLatencyMode: !1,
			startPosition: n.startPosition ?? 0,
			backBufferLength: 90,
			maxBufferLength: 60,
			abrEwmaDefaultEstimate: i,
			renderTextTracksNatively: !1,
			fragLoadPolicy: { default: {
				maxTimeToFirstByteMs: 3e4,
				maxLoadTimeMs: 12e4,
				timeoutRetry: {
					maxNumRetry: 4,
					retryDelayMs: 0,
					maxRetryDelayMs: 0
				},
				errorRetry: {
					maxNumRetry: 6,
					retryDelayMs: 1e3,
					maxRetryDelayMs: 8e3
				}
			} },
			...n.hlsConfig,
			xhrSetup: (e) => {
				let t = n.getToken?.();
				t && e.setRequestHeader("Authorization", `Bearer ${t}`);
			}
		});
		return a.on(r.Events.MANIFEST_PARSED, () => n.onReady?.()), a.on(r.Events.ERROR, (e, t) => {
			t?.fatal && (n.onError?.(t.details ?? "fatal hls error"), a.destroy());
		}), Zo = a, Qo !== null && clearInterval(Qo), Qo = setInterval($o, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				Yo(a.bandwidthEstimate), Qo !== null && (clearInterval(Qo), Qo = null), Zo = null;
				try {
					a.destroy();
				} catch {}
			},
			get levels() {
				return a.levels.map((e, t) => ({
					index: t,
					height: e.height,
					width: e.width,
					bitrate: e.bitrate,
					name: e.name
				}));
			},
			getCurrentLevel() {
				return a.currentLevel;
			},
			setCurrentLevel(e) {
				a.currentLevel = e;
			},
			setNextLevel(e) {
				a.nextLevel = e;
			},
			get autoLevelEnabled() {
				return a.autoLevelEnabled;
			},
			get bandwidthEstimate() {
				return a.bandwidthEstimate;
			},
			onLevelSwitched(e) {
				let t = (t, n) => e(n.level);
				return a.on(r.Events.LEVEL_SWITCHED, t), () => a.off(r.Events.LEVEL_SWITCHED, t);
			},
			get audioTracks() {
				return (a.audioTracks ?? []).map((e, t) => ({
					index: t,
					name: e.name ?? "",
					lang: e.lang ?? "",
					default: e.default ?? !1,
					autoselect: e.autoselect ?? !1
				}));
			},
			getCurrentAudioTrack() {
				return a.audioTrack ?? -1;
			},
			setAudioTrack(e) {
				a.audioTrack = e;
			},
			onAudioTrackSwitched(e) {
				let t = (t, n) => e(n.id);
				return a.on(r.Events.AUDIO_TRACK_SWITCHED, t), () => a.off(r.Events.AUDIO_TRACK_SWITCHED, t);
			},
			loadSource(e) {
				a.loadSource(e);
			}
		};
	}
	throw Error("HLS is not supported in this browser");
}
//#endregion
//#region src/components/player/transcode.ts
var ts = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function ns(e, t = "") {
	return typeof e == "string" ? e : t;
}
function rs(e) {
	return e === !0 || e === "true" || e === 1;
}
function is(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function as(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = ns(e.url ?? e.src);
		r !== "" && t.push({
			index: is(e.index),
			language: ns(e.language ?? e.lang ?? e.srclang),
			label: ns(e.label),
			default: rs(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function os(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = is(e.height);
		r <= 0 || t.push({
			id: ns(e.id),
			label: ns(e.label),
			height: r,
			width: is(e.width),
			bitrate: is(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function ss(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var cs = .7, ls = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], us = 1e7, ds = "mobile-low";
function fs(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * cs;
}
function ps(e) {
	let t = fs(e);
	if (t === void 0 || t >= us) return;
	let n = ds;
	for (let [e, r] of ls) r <= t && (n = e);
	return n;
}
function ms(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function hs(e) {
	let t = e ?? {};
	return {
		jobId: ns(t.job_id ?? t.jobId),
		masterUrl: ns(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: ns(t.status, "running"),
		reused: rs(t.reused),
		subtitles: as(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: os(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function gs(e) {
	let t = e ?? {};
	return {
		jobId: ns(t.job_id ?? t.jobId),
		status: ns(t.status, "running"),
		playlistReady: rs(t.playlist_ready ?? t.playlistReady),
		progress: is(t.progress),
		masterUrl: ns(t.master_url ?? t.masterUrl),
		subtitles: as(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: os(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function _s(e) {
	return e.playlistReady || e.status === "completed";
}
function vs(e) {
	return ts.has(e);
}
function ys(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function bs(e) {
	let t = S("idle"), n = S(0), r = S([]), i = S([]), a = S(-1), o = S(!0), s = S(null), c = S(null), l = S([]), u = S(-1), d = S(null), f = S(null);
	function p(e) {
		if (!D) return;
		i.value = D.levels, a.value = D.getCurrentLevel(), o.value = D.autoLevelEnabled;
		let t = e ?? D.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function m() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function h(e) {
		D && (l.value = D.audioTracks, u.value = e ?? D.getCurrentAudioTrack());
	}
	function g() {
		l.value = [], u.value = -1;
	}
	function _(e) {
		!e || e.length === 0 || (c.value = e);
	}
	function v(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: ys(n, e.url)
		}));
	}
	let y = e.attach ?? es, b = e.pollIntervalMs ?? 1e3, x = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(x / Math.max(1, b))), T = xs(), E = e.getToken ?? (() => Ss(T)), D = null, O = null, k = null, A = !1, j = null, M = 0;
	function N() {
		return e.client ?? new jt({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function P(i, a, o, s) {
		z(), A = !1;
		let c = ++M, l = () => A || c !== M;
		j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = N(), c = hs(await r.post(ss(a, o), void 0, j.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = ys(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < w; e++) {
				let e = gs(await r.get(ms(c.jobId), void 0, j.signal));
				if (l()) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), vs(e.status)) throw Error(`transcode ${e.status}`);
				if (_s(e)) {
					u = !0;
					break;
				}
				if (await C(b), l()) return;
			}
			if (!u) throw Error("transcode timed out");
			let m = await y(i, f.value, {
				getToken: E,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => p(),
				onError: () => {
					l() || (t.value = "error");
				}
			});
			if (l()) {
				try {
					m.destroy();
				} catch {}
				return;
			}
			D = m, O = D.onLevelSwitched((e) => p(e)), k = D.onAudioTrackSwitched((e) => h(e)), p(), h();
			try {
				let e = ue();
				e.hlsMasterUrl = f.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function F(e) {
		D && (D.setCurrentLevel(e === "auto" ? -1 : e), p());
	}
	function I(e) {
		D && (D.setNextLevel(e === "auto" ? -1 : e), p());
	}
	function L(e) {
		D && (D.setAudioTrack(e), h());
	}
	function R(e) {
		if (!D || !f.value) return;
		let t = f.value.replace("master.m3u8", `media_v${e}.m3u8`);
		D.loadSource(t), m();
	}
	function z() {
		if (A = !0, j &&= (j.abort(), null), O) {
			try {
				O();
			} catch {}
			O = null;
		}
		if (k) {
			try {
				k();
			} catch {}
			k = null;
		}
		if (D) {
			try {
				D.destroy();
			} catch {}
			D = null;
		}
		d.value = null, f.value = null;
	}
	function B() {
		z(), t.value = "idle", n.value = 0, r.value = [], m(), g();
		try {
			ue().hlsMasterUrl = "";
		} catch {}
	}
	return {
		state: t,
		progress: n,
		subtitleTracks: r,
		levels: i,
		currentLevel: a,
		autoEnabled: o,
		activeLevelHeight: s,
		variants: c,
		audioTracks: l,
		currentAudioTrack: u,
		setLevel: F,
		setNextLevel: I,
		setAudioTrack: L,
		jobId: d,
		masterUrl: f,
		loadVariantPlaylist: R,
		start: P,
		cleanup: z,
		reset: B
	};
}
function xs() {
	try {
		return new mt();
	} catch {
		return null;
	}
}
function Ss(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Cs = 10;
function ws(e) {
	let t = S(null), n = S(!1), r = S(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new jt({ baseUrl: e.apiBase() });
	}
	function o(e, t) {
		if (!t || t.length === 0) return null;
		if (e >= t[t.length - 1].seconds) return t[t.length - 1];
		if (e <= t[0].seconds) return t[0];
		let n = 0, r = t.length - 1;
		for (; n < r;) {
			let i = Math.floor((n + r) / 2);
			t[i].seconds < e ? n = i + 1 : r = i;
		}
		if (n > 0 && t[n].seconds > e) {
			let r = t[n - 1], i = t[n], a = i.seconds - r.seconds;
			if (a > 0) {
				let t = (e - r.seconds) / a, n = r.frame + t * (i.frame - r.frame);
				return {
					seconds: e,
					frame: Math.round(n)
				};
			}
			return r;
		}
		return t[n];
	}
	function s(e) {
		let n = t.value;
		if (!n || !n.sprite_url || !n.timeline || n.timeline.length === 0) return null;
		let r = o(e, n.timeline);
		if (r === null) return null;
		let i = r.frame, a = i % Cs, s = Math.floor(i / Cs), c = a / 9 * 100, l = s / 5 * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function c(o, s) {
		if (i.has(o) && (t.value = i.get(o) ?? null, t.value !== null)) return;
		let c = s ?? e.signal;
		if (!c?.aborted) {
			n.value = !0, r.value = null;
			try {
				let e = await a().getTrickplay(o, c);
				i.set(o, e), t.value = e;
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				i.set(o, null), r.value = e instanceof Error ? e.message : "Failed to load trickplay data", t.value = null;
			} finally {
				n.value = !1;
			}
		}
	}
	function l() {
		t.value = null, n.value = !1, r.value = null, i.clear();
	}
	return {
		data: t,
		loading: n,
		error: r,
		thumbnailAt: s,
		fetch: c,
		reset: l
	};
}
//#endregion
//#region src/components/ui/IconButton.vue?vue&type=script&setup=true&lang.ts
var Ts = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Es = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "IconButton",
	props: {
		name: {},
		label: {},
		variant: { default: "ghost" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		pressed: {
			type: Boolean,
			default: void 0
		}
	},
	setup(e) {
		let t = e, n = r(() => t.disabled || t.loading);
		return (t, r) => (x(), o("button", {
			type: e.type,
			class: g(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [u(J, {
			name: e.loading ? "spinner" : e.name,
			class: g({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, Ts));
	}
}), [["__scopeId", "data-v-48bb9819"]]);
//#endregion
//#region src/composables/layerFocusStack.ts
function Ds() {
	let e = [];
	return {
		push: (t) => {
			e.push(t);
		},
		pop: () => e.length > 0 ? e.pop() : null,
		depth: () => e.length,
		clear: () => {
			e.length = 0;
		}
	};
}
var Os = Ds(), ks = /* @__PURE__ */ new Set(), As = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), js = 0, Ms = "";
function Ns() {
	js === 0 && (Ms = document.body.style.overflow, document.body.style.overflow = "hidden"), js++;
}
function Ps() {
	js !== 0 && (js--, js === 0 && (document.body.style.overflow = Ms));
}
var Fs = Os;
function Is() {
	let e = document.querySelector("[data-focus-anchor]");
	if (e && document.contains(e)) return e;
	let t = ks.values().next().value;
	return t && document.contains(t) ? t : null;
}
function Ls(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1, o = !1;
	function s() {
		if (!o) return;
		o = !1;
		let e = [];
		for (; Fs.depth() > 0;) {
			let t = Fs.pop();
			if (t === i) break;
			e.push(t);
		}
		for (let t = e.length - 1; t >= 0; t--) Fs.push(e[t]);
	}
	function c() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(As)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function l(r) {
		if (!t.value || !e.value) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = c();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let a = i[0], o = i[i.length - 1], s = document.activeElement;
		e.value.contains(s) ? r.shiftKey && s === a ? (r.preventDefault(), o.focus()) : !r.shiftKey && s === o && (r.preventDefault(), a.focus()) : (r.preventDefault(), a.focus());
	}
	function u() {
		o ||= (i = document.activeElement, Fs.push(i), !0), e.value?.setAttribute("data-focus-trap", ""), r && (Ns(), a = !0), document.addEventListener("keydown", l, !0), h(() => {
			e.value?.setAttribute("data-focus-trap", ""), (c()[0] ?? e.value)?.focus();
		});
	}
	function d() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", l, !0), a &&= (Ps(), !1), s(), i && document.contains(i) ? i.focus?.() : i && Fs.depth() === 0 && Is()?.focus?.(), i = null;
	}
	N(t, (e) => e ? u() : d(), { immediate: !0 }), v(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", l, !0), a &&= (Ps(), !1), s();
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var Rs = [
	{
		id: "playpause",
		keys: ["Space", "K"],
		label: "Play / pause"
	},
	{
		id: "seek5",
		keys: ["ArrowLeft", "ArrowRight"],
		label: "Seek ±5s"
	},
	{
		id: "seek10",
		keys: ["J", "L"],
		label: "Seek ±10s"
	},
	{
		id: "frame",
		keys: [",", "."],
		label: "Frame step (paused)"
	},
	{
		id: "volume",
		keys: ["ArrowUp", "ArrowDown"],
		label: "Volume"
	},
	{
		id: "mute",
		keys: ["M"],
		label: "Mute"
	},
	{
		id: "fullscreen",
		keys: ["F"],
		label: "Fullscreen"
	},
	{
		id: "captions",
		keys: ["C"],
		label: "Captions"
	},
	{
		id: "theater",
		keys: ["T"],
		label: "Theater"
	},
	{
		id: "skipIntro",
		keys: ["I"],
		label: "Skip intro"
	},
	{
		id: "skipOutro",
		keys: ["O"],
		label: "Skip outro"
	},
	{
		id: "pip",
		keys: ["P"],
		label: "Picture-in-picture"
	},
	{
		id: "sleepTimer",
		keys: ["N"],
		label: "Sleep timer"
	},
	{
		id: "seekpct",
		keys: [
			"0",
			"–",
			"9"
		],
		label: "Seek to %"
	},
	{
		id: "speed",
		keys: ["<", ">"],
		label: "Speed"
	},
	{
		id: "quality",
		keys: ["Q"],
		label: "Quality"
	},
	{
		id: "help",
		keys: ["?"],
		label: "This help"
	}
], zs = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Bs = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Vs(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Hs(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Us(e, t) {
	switch (e.key) {
		case " ": return !Vs(e.target) && (t.playPause(), !0);
		case "k":
		case "K": return t.playPause(), !0;
		case "ArrowLeft": return t.seekBy(-5), !0;
		case "ArrowRight": return t.seekBy(5), !0;
		case "j":
		case "J": return t.seekBy(-10), !0;
		case "l":
		case "L": return t.seekBy(10), !0;
		case ",": return t.frameStep(-1), !0;
		case ".": return t.frameStep(1), !0;
		case "ArrowUp": return t.volumeBy(.05), !0;
		case "ArrowDown": return t.volumeBy(-.05), !0;
		case "m":
		case "M": return t.toggleMute(), !0;
		case "f":
		case "F": return t.toggleFullscreen(), !0;
		case "c":
		case "C": return t.toggleCaptions(), !0;
		case "t":
		case "T": return t.toggleTheater(), !0;
		case "i":
		case "I": return t.skipIntro(), !0;
		case "o":
		case "O": return t.skipOutro(), !0;
		case "p":
		case "P": return t.togglePip(), !0;
		case "n":
		case "N": return t.sleepTimer(), !0;
		case "<": return t.speedStep(-1), !0;
		case ">": return t.speedStep(1), !0;
		case "?": return t.toggleHelp(), !0;
		case "q":
		case "Q": return t.toggleQuality(), !0;
		default: return e.key >= "0" && e.key <= "9" && (t.seekToPercent(Number(e.key) / 10), !0);
	}
}
function Ws(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Hs(n.target) || Us(n, e) && n.preventDefault();
	}
	y(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), v(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Gs = ["aria-label"], Ks = { class: "shortcuts__head" }, qs = { class: "shortcuts__title" }, Js = { class: "shortcuts__grid" }, Ys = { class: "shortcuts__keys" }, Xs = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Zs = {
	key: 1,
	class: "shortcuts__key"
}, Qs = { class: "shortcuts__label" }, $s = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Rs }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, c = n, { t: d } = X(), f = S(null);
		return Ls(f, D(r, "open"), {
			lockScroll: !1,
			onEscape: () => (c("close"), !0)
		}), (n, r) => t.open ? (x(), o("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= L((e) => c("close"), ["self"])
		}, [s("div", {
			ref_key: "panelEl",
			ref: f,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(d)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [s("div", Ks, [s("h3", qs, E(O(d)("player.keyboard")), 1), u(Es, {
			name: "x",
			label: O(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => c("close")
		}, null, 8, ["label"])]), s("ul", Js, [(x(!0), o(e, null, C(t.shortcuts, (t) => (x(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", Ys, [(x(!0), o(e, null, C(t.keys, (t, n) => (x(), o(e, { key: n }, [t === "–" ? (x(), o("span", Xs, "–")) : (x(), o("kbd", Zs, [O(zs)[t] ? (x(), i(J, {
			key: 0,
			name: O(zs)[t],
			label: O(Bs)[t] ?? t
		}, null, 8, ["name", "label"])) : (x(), o(e, { key: 1 }, [l(E(t), 1)], 64))]))], 64))), 128))]), s("span", Qs, E(t.label), 1)]))), 128))])], 8, Gs)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), ec = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], tc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Slider",
	props: {
		modelValue: {},
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		label: {},
		formatValue: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = S(null), c = S(!1), l = r(() => {
			let e = n.max - n.min || 1;
			return Math.min(100, Math.max(0, (n.modelValue - n.min) / e * 100));
		}), u = r(() => n.formatValue ? n.formatValue(n.modelValue) : String(n.modelValue));
		function d(e) {
			let t = Math.min(n.max, Math.max(n.min, e)), r = Math.round((t - n.min) / n.step), i = n.min + r * n.step;
			return Math.round(i * 1e6) / 1e6;
		}
		function f(e, t = !1) {
			let r = d(e);
			r !== n.modelValue && (i("update:modelValue", r), t && i("change", r));
		}
		function p(e) {
			let t = a.value;
			if (!t) return n.modelValue;
			let r = t.getBoundingClientRect(), i = r.width ? (e - r.left) / r.width : 0;
			return n.min + i * (n.max - n.min);
		}
		function m(e) {
			n.disabled || (e.currentTarget.setPointerCapture?.(e.pointerId), c.value = !0, f(p(e.clientX)));
		}
		function h(e) {
			c.value && f(p(e.clientX));
		}
		function v(e) {
			if (c.value) {
				c.value = !1;
				try {
					e.currentTarget.releasePointerCapture?.(e.pointerId);
				} catch {}
				i("change", n.modelValue);
			}
		}
		function y(e) {
			if (n.disabled) return;
			let t = (n.max - n.min) / 10, r = !0;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowUp":
					f(n.modelValue + n.step, !0);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					f(n.modelValue - n.step, !0);
					break;
				case "PageUp":
					f(n.modelValue + t, !0);
					break;
				case "PageDown":
					f(n.modelValue - t, !0);
					break;
				case "Home":
					f(n.min, !0);
					break;
				case "End":
					f(n.max, !0);
					break;
				default: r = !1;
			}
			r && e.preventDefault();
		}
		return (t, n) => (x(), o("div", {
			class: g(["phlix-slider", { "is-disabled": e.disabled }]),
			role: "slider",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": e.modelValue,
			"aria-valuetext": u.value,
			"aria-disabled": e.disabled || void 0,
			"aria-orientation": "horizontal",
			onKeydown: y
		}, [s("div", {
			ref_key: "trackEl",
			ref: a,
			class: "phlix-slider__track",
			onPointerdown: m,
			onPointermove: h,
			onPointerup: v,
			onPointercancel: v
		}, [s("div", {
			class: "phlix-slider__fill",
			style: _({ width: l.value + "%" })
		}, null, 4), s("div", {
			class: "phlix-slider__thumb",
			style: _({ left: l.value + "%" })
		}, null, 4)], 544)], 42, ec));
	}
}), [["__scopeId", "data-v-57426415"]]), nc = { class: "volume" }, rc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "VolumeControl",
	setup(e) {
		let t = ue(), n = ne(), { t: i } = X(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return N(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (x(), o("div", nc, [u(Es, {
			name: s.value,
			label: O(t).muted ? O(i)("player.unmute") : O(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => O(t).toggleMute()
		}, null, 8, ["name", "label"]), u(tc, {
			class: "volume__slider",
			"model-value": a.value,
			min: 0,
			max: 1,
			step: .05,
			label: O(i)("player.volume"),
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": c
		}, null, 8, [
			"model-value",
			"label",
			"format-value"
		])]));
	}
}), [["__scopeId", "data-v-e76a3b82"]]);
//#endregion
//#region src/components/ui/listbox.ts
function ic(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function ac(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function oc(e, t) {
	return t === "first" ? ac(e, -1, 1) : ac(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var sc = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], cc = ["id", "aria-label"], lc = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], uc = { class: "phlix-select__check" }, dc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Select",
	props: /*@__PURE__*/ m({
		modelValue: {},
		options: {},
		placeholder: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		tone: { default: "default" }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ m(["update:modelValue", "change"], ["update:open"]),
	setup(t, { expose: n, emit: c }) {
		let d = t, { t: f } = X(), p = c, m = r(() => ic(d.options)), _ = k(), y = S(!1), b = S(-1), w = S(null), T = S(null);
		function D() {
			y.value ? H() : V();
		}
		n({ toggleMenu: D });
		let j = "", P, I = A(t, "open"), L = r(() => m.value.findIndex((e) => e.value === d.modelValue));
		N(I, (e) => {
			e && !y.value ? V() : !e && y.value && H();
		}, { immediate: !0 });
		let R = r(() => m.value[L.value]?.label ?? ""), z = r(() => b.value >= 0 ? `${_}-opt-${b.value}` : void 0), B = S(!1);
		function ee() {
			let e = w.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			B.value = n < 284 && r > n;
		}
		function V() {
			d.disabled || y.value || (ee(), y.value = !0, b.value = L.value >= 0 ? L.value : oc(m.value, "first"), h(re));
		}
		function H() {
			y.value = !1;
		}
		function te(e) {
			let t = m.value[e];
			!t || t.disabled || (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), H(), w.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function ne(e) {
			b.value = ac(m.value, b.value, e), h(re);
		}
		function re() {
			(T.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function ie(e) {
			if (!d.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), y.value ? ne(1) : V();
					break;
				case "ArrowUp":
					e.preventDefault(), y.value ? ne(-1) : V();
					break;
				case "Home":
					y.value && (e.preventDefault(), b.value = oc(m.value, "first"), h(re));
					break;
				case "End":
					y.value && (e.preventDefault(), b.value = oc(m.value, "last"), h(re));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), y.value && b.value >= 0 ? te(b.value) : V();
					break;
				case "Escape":
					y.value && (e.preventDefault(), H());
					break;
				case "Tab":
					H();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && ae(e.key);
			}
		}
		function ae(e) {
			y.value || V(), j += e.toLowerCase(), clearTimeout(P), P = setTimeout(() => j = "", 600);
			let t = m.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(j));
			t >= 0 && (b.value = t, h(re));
		}
		function oe(e) {
			y.value && w.value && !w.value.contains(e.target) && H();
		}
		return N(y, (e) => {
			e ? document.addEventListener("pointerdown", oe, !0) : document.removeEventListener("pointerdown", oe, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", oe, !0), clearTimeout(P);
		}), (n, r) => (x(), o("div", {
			ref_key: "rootEl",
			ref: w,
			class: g(["phlix-select", {
				"is-open": y.value,
				"is-disabled": t.disabled,
				"is-glass": t.tone === "glass"
			}])
		}, [s("button", {
			type: "button",
			class: "phlix-select__trigger",
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": y.value,
			"aria-controls": y.value ? `${O(_)}-list` : void 0,
			"aria-activedescendant": y.value ? z.value : void 0,
			"aria-label": t.label,
			disabled: t.disabled,
			onClick: r[0] ||= (e) => y.value ? H() : V(),
			onKeydown: ie
		}, [s("span", { class: g(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, E(L.value >= 0 ? R.value : t.placeholder ?? O(f)("common.selectPlaceholder")), 3), u(J, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, sc), F(s("ul", {
			id: `${O(_)}-list`,
			ref_key: "listEl",
			ref: T,
			class: g(["phlix-select__list", { "is-up": B.value }]),
			role: "listbox",
			"aria-label": t.label
		}, [(x(!0), o(e, null, C(m.value, (e, n) => (x(), o("li", {
			id: `${O(_)}-opt-${n}`,
			key: e.value,
			class: g(["phlix-select__option", {
				"is-active": n === b.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => te(n),
			onPointermove: (t) => !e.disabled && (b.value = n)
		}, [s("span", uc, [e.value === t.modelValue ? (x(), i(J, {
			key: 0,
			name: "check"
		})) : a("", !0)]), l(" " + E(e.label), 1)], 42, lc))), 128))], 10, cc), [[M, y.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]), fc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SpeedMenu",
	setup(e) {
		let t = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], n = ue(), { t: a } = X(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (x(), i(dc, {
			class: "speed-menu",
			tone: "glass",
			"model-value": O(n).rate,
			options: o.value,
			label: O(a)("player.playbackSpeed"),
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), pc = "auto", mc = "original";
function hc(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function gc(e) {
	return e >= 2160 ? "4K" : hc(e);
}
function _c(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = hc(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: gc(r.height)
		}));
	}
	return n;
}
function vc(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) hc(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function yc(e, t) {
	if (!t || !(t.height > 0)) return -1;
	let n = -1, r = Infinity;
	for (let i of e) {
		if (i.height !== t.height) continue;
		let e = Math.abs(i.bitrate - t.bitrate);
		e < r && (n = i.index, r = e);
	}
	if (n >= 0) return n;
	let i = -1, a = Infinity;
	for (let n of e) if (n.height >= t.height) {
		let e = n.height - t.height;
		e < a && (i = n.index, a = e);
	}
	return i;
}
function bc(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function xc(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && yc(e, n) >= 0;
}
function Sc(e, t) {
	if (t < 0) return pc;
	let n = e.find((e) => e.index === t);
	return n ? hc(n.height) : pc;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Cc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "QualityMenu",
	props: /*@__PURE__*/ m({
		levels: { default: () => [] },
		variants: { default: null },
		currentLevel: { default: -1 },
		autoEnabled: {
			type: Boolean,
			default: !0
		},
		activeHeight: { default: null }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ m(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let o = e, s = A(e, "open"), c = S(null);
		function l() {
			c.value?.toggleMenu();
		}
		let u = n, d = ue(), f = ne(), { t: p } = X(), m = r(() => _c(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = hc(r.height);
				e.has(i) || n && vc(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: gc(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => yc(o.levels, _.value)), y = r(() => _.value && v.value >= 0 ? {
			value: mc,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: gc(o.activeHeight) })), w = r(() => [
			{
				value: pc,
				label: C.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? pc : y.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? mc : Sc(o.levels, o.currentLevel));
		function E(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : vc(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => b.value || s.value ? (x(), i(dc, {
			key: 0,
			ref_key: "selectRef",
			ref: c,
			class: "quality-menu",
			tone: "glass",
			"model-value": T.value,
			options: w.value,
			label: O(p)("player.quality"),
			open: s.value,
			"onUpdate:open": t[0] ||= (e) => s.value = e,
			"onUpdate:modelValue": E
		}, null, 8, [
			"model-value",
			"options",
			"label",
			"open"
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-58498bdd"]]);
//#endregion
//#region src/components/player/captions.ts
function wc(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function Tc(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Ec(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Dc(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Oc(e) {
	return e ? wc(e.textTracks).filter(Tc).map((e, t) => ({
		index: t,
		language: Ec(e, t),
		label: e.label || Dc(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function kc(e) {
	let t = e?.audioTracks;
	return wc(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Dc(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function Ac(e, t) {
	return !e || t == null ? null : wc(e.textTracks).filter(Tc).find((e, n) => Ec(e, n) === t) ?? null;
}
function jc(e, t) {
	return Ac(e, t) != null;
}
function Mc(e, t) {
	e && wc(e.textTracks).filter(Tc).forEach((e, n) => {
		try {
			e.mode = Ec(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function Nc(e, t) {
	let n = e?.audioTracks;
	wc(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Pc(e) {
	let t = e?.audioTracks;
	return wc(t).findIndex((e) => e.enabled);
}
var Fc = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function Ic(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Lc(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && Ic(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(Fc, n) ? Fc[n] : e;
	});
}
function Rc(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Lc(e).trim()).filter((e) => e.length > 0) : [];
}
function zc(e) {
	if (!e) return [];
	let t = wc(e.activeCues), n = [];
	for (let e of t) n.push(...Rc(e.text));
	return n;
}
var Bc = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Vc = [
	{
		value: "sm",
		label: "Small"
	},
	{
		value: "md",
		label: "Medium"
	},
	{
		value: "lg",
		label: "Large"
	},
	{
		value: "xl",
		label: "Extra large"
	}
], Hc = [
	{
		value: "#ffffff",
		label: "White"
	},
	{
		value: "#ffd400",
		label: "Yellow"
	},
	{
		value: "#66e0ff",
		label: "Cyan"
	},
	{
		value: "#7cff7c",
		label: "Green"
	}
], Uc = [
	{
		value: "none",
		label: "Off"
	},
	{
		value: "semi",
		label: "Semi-transparent"
	},
	{
		value: "solid",
		label: "Solid"
	}
], Wc = [
	{
		value: "none",
		label: "None"
	},
	{
		value: "drop-shadow",
		label: "Drop shadow"
	},
	{
		value: "outline",
		label: "Outline"
	},
	{
		value: "raised",
		label: "Raised"
	}
];
function Gc(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function Kc(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function qc(e) {
	return {
		"--cap-scale": String(Bc[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": Gc(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": Kc(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var Jc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean },
		controlsRoot: {}
	},
	setup(t, { expose: n }) {
		let i = t, s = S([]), c = S(0), l = r(() => i.lifted ? c.value : 0), u = r(() => ({
			...qc(i.styleConfig),
			"--phlix-sub-offset": `${l.value}px`
		})), d = null;
		function f() {
			let e = i.controlsRoot;
			c.value = e && typeof e.offsetHeight == "number" ? e.offsetHeight : 0;
		}
		function p() {
			d?.disconnect(), d = null;
		}
		function m() {
			p(), f();
			let e = i.controlsRoot;
			!e || typeof ResizeObserver > "u" || (d = new ResizeObserver(() => f()), d.observe(e));
		}
		N(() => i.controlsRoot, m, { immediate: !0 }), v(p);
		let h = null, y = null, b = null;
		function w() {
			s.value = zc(h);
		}
		function T() {
			b != null && (clearTimeout(b), b = null);
		}
		function D() {
			T(), b = setTimeout(() => {
				if (b = null, !h) return;
				Mc(i.video, i.language);
				let e = zc(h);
				e.length && (s.value = e);
			}, 0);
		}
		function O() {
			T(), h?.removeEventListener("cuechange", w), y?.removeEventListener("load", w), h = null, y = null;
		}
		function k(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function A() {
			O(), Mc(i.video, i.language);
			let e = Ac(i.video, i.language);
			if (e) {
				if (h = e, e.addEventListener("cuechange", w), s.value = zc(e), !s.value.length) {
					let t = k(i.video, e);
					t && t.readyState !== 2 && (y = t, t.addEventListener("load", w));
				}
				D();
			} else s.value = [];
		}
		return N(() => [i.video, i.language], A, { immediate: !0 }), v(O), n({ lines: s }), (n, r) => s.value.length ? (x(), o("div", {
			key: 0,
			class: g(["player__captions", { "is-lifted": t.lifted }]),
			style: _(u.value)
		}, [(x(!0), o(e, null, C(s.value, (e, t) => (x(), o("p", {
			key: t,
			class: "player__caption-line"
		}, E(e), 1))), 128))], 6)) : a("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), Yc = ["aria-label", "aria-expanded"], Xc = ["aria-label"], Zc = { class: "capmenu__head" }, Qc = { class: "capmenu__title" }, $c = ["aria-label"], el = ["aria-checked", "tabindex"], tl = { class: "capmenu__check" }, nl = { class: "capmenu__optlabel" }, rl = [
	"aria-checked",
	"tabindex",
	"onClick"
], il = { class: "capmenu__check" }, al = { class: "capmenu__optlabel" }, ol = { class: "capmenu__check" }, sl = { class: "capmenu__optlabel" }, cl = { class: "capmenu__title capmenu__title--sub" }, ll = ["aria-label"], ul = [
	"aria-checked",
	"tabindex",
	"onClick"
], dl = { class: "capmenu__check" }, fl = { class: "capmenu__optlabel" }, pl = { class: "capmenu__title capmenu__title--sub" }, ml = { class: "capmenu__style" }, hl = { class: "capmenu__field" }, gl = { class: "capmenu__fieldlabel" }, _l = { class: "capmenu__field" }, vl = { class: "capmenu__fieldlabel" }, yl = { class: "capmenu__field" }, bl = { class: "capmenu__fieldlabel" }, xl = { class: "capmenu__field" }, Sl = { class: "capmenu__fieldlabel" }, Cl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "CaptionsMenu",
	props: {
		tracks: { default: () => [] },
		audioTracks: { default: () => [] },
		activeAudio: { default: -1 },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"update:open",
		"select-audio",
		"add-subtitles"
	],
	setup(t, { emit: n }) {
		let c = t, l = n, d = ue(), f = ne(), { t: p } = X(), m = S(null), h = S(null), _ = r(() => d.subtitleLang), y = r(() => c.tracks.some((e) => e.language === _.value)), b = r(() => y.value ? "captions" : "captions-off"), w = r(() => y.value ? c.tracks.findIndex((e) => e.language === _.value) + 1 : 0), T = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
		function k(e) {
			l("update:open", e);
		}
		function A() {
			k(!1);
		}
		function j(e) {
			d.setSubtitle(e), f.defaultSubtitleLang = e, f.subtitlePreferenceSet = !0;
		}
		function M(e) {
			l("select-audio", e);
		}
		function P() {
			l("add-subtitles"), A();
		}
		function F(e, t, n) {
			if (t === 0) return null;
			let r = n;
			switch (e.key) {
				case "ArrowDown":
				case "ArrowRight":
					r = (n + 1) % t;
					break;
				case "ArrowUp":
				case "ArrowLeft":
					r = (n - 1 + t) % t;
					break;
				case "Home":
					r = 0;
					break;
				case "End":
					r = t - 1;
					break;
				default: return null;
			}
			return e.preventDefault(), e.currentTarget.querySelectorAll("[role=\"radio\"]")[r]?.focus(), r;
		}
		function I(e) {
			let t = F(e, c.tracks.length + 1, w.value);
			t !== null && j(t === 0 ? null : c.tracks[t - 1].language);
		}
		function L(e) {
			let t = F(e, c.audioTracks.length, T.value);
			t !== null && M(c.audioTracks[t].index);
		}
		function R(e) {
			f.captionStyle = {
				...f.captionStyle,
				size: e
			};
		}
		function z(e) {
			f.captionStyle = {
				...f.captionStyle,
				textColor: String(e)
			};
		}
		function B(e) {
			f.captionStyle = {
				...f.captionStyle,
				background: e
			};
		}
		function ee(e) {
			f.captionStyle = {
				...f.captionStyle,
				edge: e
			};
		}
		Ls(h, D(c, "open"), {
			lockScroll: !1,
			onEscape: () => (A(), !0)
		});
		function V(e) {
			m.value && !m.value.contains(e.target) && A();
		}
		return N(() => c.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0));
		}, { immediate: !0 }), v(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", V, !0);
		}), (n, r) => (x(), o("div", {
			ref_key: "rootEl",
			ref: m,
			class: "capmenu"
		}, [s("button", {
			type: "button",
			class: g(["capmenu__btn", { "is-active": y.value }]),
			"aria-label": y.value ? O(p)("player.captionsOn") : O(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: r[0] ||= (e) => k(!t.open)
		}, [u(J, { name: b.value }, null, 8, ["name"])], 10, Yc), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", Zc, [s("h3", Qc, E(O(p)("player.subtitles")), 1), u(Es, {
				name: "x",
				label: O(p)("common.close"),
				size: "sm",
				onClick: A
			}, null, 8, ["label"])]),
			s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": O(p)("player.subtitleTrack"),
				onKeydown: I
			}, [s("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !y.value,
				tabindex: w.value === 0 ? 0 : -1,
				onClick: r[1] ||= (e) => j(null)
			}, [s("span", tl, [y.value ? a("", !0) : (x(), i(J, {
				key: 0,
				name: "check"
			}))]), s("span", nl, E(O(p)("player.off")), 1)], 8, el), (x(!0), o(e, null, C(t.tracks, (e, t) => (x(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: w.value === t + 1 ? 0 : -1,
				onClick: (t) => j(e.language)
			}, [s("span", il, [_.value === e.language ? (x(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", al, E(e.label), 1)], 8, rl))), 128))], 40, $c),
			s("button", {
				type: "button",
				class: "capmenu__add",
				onClick: P
			}, [s("span", ol, [u(J, { name: "plus" })]), s("span", sl, E(O(p)("player.addSubtitles")), 1)]),
			t.audioTracks.length > 1 ? (x(), o(e, { key: 0 }, [s("h3", cl, E(O(p)("player.audio")), 1), s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": O(p)("player.audioTrack"),
				onKeydown: L
			}, [(x(!0), o(e, null, C(t.audioTracks, (e) => (x(), o("button", {
				key: e.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": t.activeAudio === e.index,
				tabindex: T.value === e.index ? 0 : -1,
				onClick: (t) => M(e.index)
			}, [s("span", dl, [t.activeAudio === e.index ? (x(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", fl, E(e.label), 1)], 8, ul))), 128))], 40, ll)], 64)) : a("", !0),
			s("h3", pl, E(O(p)("player.captionStyle")), 1),
			s("div", ml, [
				s("div", hl, [s("span", gl, E(O(p)("player.size")), 1), u(dc, {
					"model-value": O(f).captionStyle.size,
					options: O(Vc),
					label: O(p)("player.captionSize"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", _l, [s("span", vl, E(O(p)("player.color")), 1), u(dc, {
					"model-value": O(f).captionStyle.textColor,
					options: O(Hc),
					label: O(p)("player.captionColor"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", yl, [s("span", bl, E(O(p)("player.background")), 1), u(dc, {
					"model-value": O(f).captionStyle.background,
					options: O(Uc),
					label: O(p)("player.captionBackground"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", xl, [s("span", Sl, E(O(p)("player.edge")), 1), u(dc, {
					"model-value": O(f).captionStyle.edge,
					options: O(Wc),
					label: O(p)("player.captionEdge"),
					"onUpdate:modelValue": ee
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Xc)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), wl = ["aria-labelledby"], Tl = {
	key: 0,
	class: "phlix-modal__header"
}, El = ["id"], Dl = { class: "phlix-modal__body" }, Ol = {
	key: 1,
	class: "phlix-modal__footer"
}, kl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Modal",
	props: {
		modelValue: { type: Boolean },
		title: {},
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" }
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: r }) {
		let { t: c } = X(), l = e, d = r, f = S(l.modelValue);
		N(() => l.modelValue, (e) => f.value = e);
		let p = S(null), m = k();
		function h() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			l.dismissible && h();
		}
		return Ls(p, f, { onEscape: () => l.dismissible ? (h(), !0) : !1 }), (r, l) => (x(), i(t, { to: "body" }, [u(n, { name: "phlix-modal" }, {
			default: P(() => [e.modelValue ? (x(), o("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: L(_, ["self"])
			}, [s("div", {
				ref_key: "panelEl",
				ref: p,
				class: g(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? O(m) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (x(), o("header", Tl, [e.title ? (x(), o("h2", {
					key: 0,
					id: O(m),
					class: "phlix-modal__title"
				}, E(e.title), 9, El)) : a("", !0), e.hideClose ? a("", !0) : (x(), i(Es, {
					key: 1,
					name: "x",
					label: O(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: h
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", Dl, [w(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (x(), o("footer", Ol, [w(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, wl)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-12c692c9"]]), Al = [
	"type",
	"disabled",
	"aria-busy"
], jl = {
	key: 0,
	class: "phlix-btn__spinner"
}, Ml = { class: "phlix-btn__label" }, Nl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Button",
	props: {
		variant: { default: "solid" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		block: {
			type: Boolean,
			default: !1
		},
		leftIcon: {},
		rightIcon: {}
	},
	setup(e) {
		let t = e, n = r(() => t.disabled || t.loading);
		return (t, r) => (x(), o("button", {
			type: e.type,
			class: g(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: n.value,
			"aria-busy": e.loading || void 0
		}, [
			e.loading ? (x(), o("span", jl, [u(J, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (x(), i(J, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", Ml, [w(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (x(), i(J, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, Al));
	}
}), [["__scopeId", "data-v-38abf89d"]]), Pl = [
	"disabled",
	"aria-label",
	"aria-pressed"
], Fl = { class: "phlix-chip__label" }, Il = ["disabled", "aria-label"], Ll = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Chip",
	props: {
		selected: {
			type: Boolean,
			default: void 0
		},
		removable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		size: { default: "sm" },
		disabled: {
			type: Boolean,
			default: !1
		},
		removeLabel: { default: "Remove" },
		ariaLabel: {}
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function c() {
			n.disabled || (n.selected !== void 0 && r("update:selected", !n.selected), r("click"));
		}
		return (t, n) => (x(), o("span", { class: g(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [s("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-label": e.ariaLabel,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: c
		}, [e.icon ? (x(), i(J, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : a("", !0), s("span", Fl, [w(t.$slots, "default", {}, void 0, !0)])], 8, Pl), e.removable ? (x(), o("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [u(J, { name: "x" })], 8, Il)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-551f7599"]]), Rl = ["aria-label"], zl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: n } = X(), i = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (x(), o("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? O(n)("common.loading"),
			style: _(i.value ? { fontSize: i.value } : void 0)
		}, [u(J, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Rl));
	}
}), [["__scopeId", "data-v-736b299d"]]), Bl = ["role", "aria-label"], Vl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Badge",
	props: {
		tone: { default: "neutral" },
		size: { default: "sm" },
		mono: {
			type: Boolean,
			default: !1
		},
		icon: {},
		label: {}
	},
	setup(e) {
		return (t, n) => (x(), o("span", {
			class: g(["phlix-badge", [
				`phlix-badge--${e.tone}`,
				`phlix-badge--${e.size}`,
				{ "phlix-badge--mono": e.mono }
			]]),
			role: e.label ? "img" : void 0,
			"aria-label": e.label
		}, [e.icon ? (x(), i(J, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : a("", !0), w(t.$slots, "default", {}, void 0, !0)], 10, Bl));
	}
}), [["__scopeId", "data-v-269446f3"]]), Hl = {
	class: "phlix-empty",
	role: "status"
}, Ul = { class: "phlix-empty__icon" }, Wl = { class: "phlix-empty__title" }, Gl = {
	key: 0,
	class: "phlix-empty__desc"
}, Kl = {
	key: 1,
	class: "phlix-empty__actions"
}, ql = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (x(), o("div", Hl, [
			s("span", Ul, [u(J, { name: e.icon }, null, 8, ["name"])]),
			s("h3", Wl, E(e.title), 1),
			e.description || t.$slots.default ? (x(), o("p", Gl, [w(t.$slots, "default", {}, () => [l(E(e.description), 1)], !0)])) : a("", !0),
			t.$slots.actions ? (x(), o("div", Kl, [w(t.$slots, "actions", {}, void 0, !0)])) : a("", !0)
		]));
	}
}), [["__scopeId", "data-v-1790dcf5"]]), Jl = { class: "subsearch" }, Yl = { class: "subsearch__langs" }, Xl = { class: "subsearch__legend" }, Zl = { class: "subsearch__chips" }, Ql = { class: "subsearch__actions" }, $l = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, eu = {
	key: 2,
	class: "subsearch__prompt"
}, tu = {
	key: 3,
	class: "subsearch__list"
}, nu = { class: "subsearch__meta" }, ru = { class: "subsearch__release" }, iu = { class: "subsearch__signals" }, au = { class: "subsearch__provider" }, ou = ["aria-label"], su = {
	key: 2,
	class: "subsearch__stat"
}, cu = {
	key: 3,
	class: "subsearch__stat"
}, lu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SubtitleSearch",
	props: {
		open: {
			type: Boolean,
			default: !1
		},
		mediaId: {},
		apiBase: { default: "" },
		preferredLangs: { default: () => [] },
		client: { default: void 0 }
	},
	emits: ["update:open", "added"],
	setup(t, { emit: n }) {
		let c = t, d = n, { t: f } = X(), p = Mt(), m = [
			"en",
			"es",
			"fr",
			"de",
			"it",
			"pt",
			"nl",
			"ru",
			"ja",
			"ko",
			"zh",
			"ar"
		];
		function h(e) {
			if (!e) return e;
			try {
				let t = Intl.DisplayNames;
				if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
			} catch {}
			return e;
		}
		let g = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of [...c.preferredLangs, ...m]) {
				let r = (n || "").toLowerCase();
				!r || e.has(r) || (e.add(r), t.push(r));
			}
			return t;
		}), _ = S(/* @__PURE__ */ new Set());
		function v() {
			let e = /* @__PURE__ */ new Set();
			for (let t of c.preferredLangs) {
				let n = (t || "").toLowerCase();
				n && e.add(n);
			}
			e.size === 0 && e.add("en"), _.value = e;
		}
		function y(e) {
			let t = new Set(_.value);
			t.has(e) ? t.delete(e) : t.add(e), _.value = t;
		}
		let b = S(!1), w = S(!1), T = S([]), D = S(/* @__PURE__ */ new Set()), k = S(/* @__PURE__ */ new Set());
		function A(e) {
			return `${e.provider}:${e.downloadId}`;
		}
		let j = r(() => [...T.value].sort((e, t) => t.rating - e.rating || t.downloadCount - e.downloadCount)), M = r(() => _.value.size > 0 && !b.value);
		function F() {
			return c.client ?? new jt({ baseUrl: c.apiBase ?? "" });
		}
		async function I() {
			if (M.value) {
				b.value = !0, w.value = !0;
				try {
					T.value = await F().searchSubtitles(c.mediaId, [..._.value]);
				} catch {
					T.value = [], p.error(f("player.subtitleSearchError"));
				} finally {
					b.value = !1;
				}
			}
		}
		function L() {
			d("update:open", !1);
		}
		function R(e) {
			if (e instanceof de) {
				if (e.status === 429) {
					let t = e.body && typeof e.body == "object" ? e.body : {}, n = typeof t.downloadsRemaining == "number" ? t.downloadsRemaining : null, r = typeof t.resetTimeUtc == "string" ? t.resetTimeUtc : null;
					r ? p.warning(f("player.subtitleQuotaReset", { time: z(r) })) : n === null ? p.warning(f("player.subtitleQuota")) : p.warning(f("player.subtitleQuotaRemaining", { count: n }));
					return;
				}
				if (e.status === 404) {
					p.error(f("player.subtitleAddNotFound"));
					return;
				}
			}
			p.error(f("player.subtitleAddError"));
		}
		function z(e) {
			let t = new Date(e);
			if (Number.isNaN(t.getTime())) return e;
			try {
				return t.toLocaleString();
			} catch {
				return e;
			}
		}
		async function B(e) {
			let t = A(e);
			if (D.value.has(t) || k.value.has(t)) return;
			let n = new Set(D.value);
			n.add(t), D.value = n;
			try {
				let n = as([(await F().downloadSubtitle(c.mediaId, {
					provider: e.provider,
					downloadId: e.downloadId,
					language: e.language,
					format: e.format || void 0,
					releaseName: e.releaseName || void 0,
					hearingImpaired: e.hearingImpaired
				})).track])[0], r = new Set(k.value);
				r.add(t), k.value = r;
				let i = h(e.language);
				p.success(i ? f("player.subtitleAdded", { language: i }) : f("player.subtitleAddedGeneric")), n && d("added", n);
			} catch (e) {
				R(e);
			} finally {
				let e = new Set(D.value);
				e.delete(t), D.value = e;
			}
		}
		return N(() => c.open, (e) => {
			e && (v(), T.value = [], w.value = !1, b.value = !1, D.value = /* @__PURE__ */ new Set(), k.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (x(), i(kl, {
			"model-value": t.open,
			title: O(f)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => d("update:open", e)
		}, {
			footer: P(() => [u(Nl, {
				variant: "ghost",
				onClick: L
			}, {
				default: P(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			})]),
			default: P(() => [s("div", Jl, [
				s("fieldset", Yl, [s("legend", Xl, E(O(f)("player.subtitleSearchLanguages")), 1), s("div", Zl, [(x(!0), o(e, null, C(g.value, (e) => (x(), i(Ll, {
					key: e,
					selected: _.value.has(e),
					size: "md",
					"aria-label": h(e),
					"onUpdate:selected": (t) => y(e)
				}, {
					default: P(() => [l(E(h(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				s("div", Ql, [u(Nl, {
					variant: "solid",
					"left-icon": "search",
					loading: b.value,
					disabled: !M.value,
					onClick: I
				}, {
					default: P(() => [l(E(O(f)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				b.value ? (x(), o("div", $l, [u(zl, { label: O(f)("player.subtitleSearching") }, null, 8, ["label"]), s("span", null, E(O(f)("player.subtitleSearching")), 1)])) : w.value && j.value.length === 0 ? (x(), i(ql, {
					key: 1,
					icon: "captions",
					title: O(f)("player.subtitleSearchEmpty"),
					description: O(f)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : w.value ? (x(), o("ul", tu, [(x(!0), o(e, null, C(j.value, (e) => (x(), o("li", {
					key: A(e),
					class: "subsearch__item"
				}, [s("div", nu, [s("p", ru, E(e.releaseName || e.provider), 1), s("div", iu, [
					u(Vl, {
						tone: "neutral",
						size: "sm"
					}, {
						default: P(() => [l(E(h(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (x(), i(Vl, {
						key: 0,
						tone: "info",
						size: "sm",
						label: O(f)("player.subtitleHearingImpairedFull")
					}, {
						default: P(() => [l(E(O(f)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : a("", !0),
					s("span", au, E(e.provider), 1),
					e.rating > 0 ? (x(), o("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": O(f)("player.subtitleRating", { rating: e.rating })
					}, [u(J, { name: "star" }), l(" " + E(e.rating), 1)], 8, ou)) : a("", !0),
					e.downloadCount > 0 ? (x(), o("span", su, E(O(f)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : a("", !0),
					e.fps ? (x(), o("span", cu, E(O(f)("player.subtitleFps", { fps: e.fps })), 1)) : a("", !0)
				])]), u(Nl, {
					variant: "outline",
					size: "sm",
					"left-icon": k.value.has(A(e)) ? "check" : "plus",
					loading: D.value.has(A(e)),
					disabled: D.value.has(A(e)) || k.value.has(A(e)),
					"aria-label": O(f)("player.subtitleAddLabel", {
						release: e.releaseName || e.format || e.language,
						provider: e.provider
					}),
					onClick: (t) => B(e)
				}, {
					default: P(() => [l(E(D.value.has(A(e)) ? O(f)("player.subtitleAdding") : O(f)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (x(), o("p", eu, E(O(f)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), uu = 32, du = 18, fu = 250, pu = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function mu(e, t, n, r, i, a, o) {
	let s = Math.max(0, Math.min(t, Math.floor(r))), c = Math.max(0, Math.min(n, Math.floor(i))), l = Math.max(s, Math.min(t, Math.ceil(a))), u = Math.max(c, Math.min(n, Math.ceil(o))), d = 0, f = 0, p = 0, m = 0;
	for (let n = c; n < u; n++) for (let r = s; r < l; r++) {
		let i = (n * t + r) * 4;
		d += e[i], f += e[i + 1], p += e[i + 2], m++;
	}
	return m === 0 ? {
		r: 0,
		g: 0,
		b: 0
	} : {
		r: pu(d / m),
		g: pu(f / m),
		b: pu(p / m)
	};
}
function hu(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: mu(e, t, n, 0, 0, r, n),
		right: mu(e, t, n, t - r, 0, t, n),
		center: mu(e, t, n, 0, 0, t, n)
	};
}
function gu({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function _u({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function vu(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${_u(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${_u(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${_u(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function yu(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var bu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "AmbientCanvas",
	props: {
		video: { default: null },
		enabled: {
			type: Boolean,
			default: !0
		},
		playing: {
			type: Boolean,
			default: !1
		},
		reducedMotion: {
			type: Boolean,
			default: !1
		},
		intensity: { default: 1 }
	},
	setup(e, { expose: t }) {
		let n = e, i = S(!1), a = null;
		function s() {
			i.value = yu(a);
		}
		let c = r(() => n.enabled && !n.reducedMotion && !i.value), l = r(() => Math.min(1, .85 * Math.max(0, n.intensity))), u = S(null), d = null, f = null, p = !1, m = !1;
		function h() {
			if (p) return f;
			if (m || typeof document > "u") return m = !0, null;
			d = document.createElement("canvas"), d.width = 32, d.height = 18;
			try {
				f = d.getContext("2d", { willReadFrequently: !0 });
			} catch {
				f = null;
			}
			return f ? (p = !0, f) : (m = !0, null);
		}
		function b() {
			let e = n.video;
			if (!c.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = h();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18);
				u.value = vu(hu(n, 32, 18));
			} catch {
				m = !0, u.value = null;
			}
		}
		function C(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let w = null, T = null, E = null, D = 0, O = !1;
		function k(e) {
			T = e, w = e.requestVideoFrameCallback(A);
		}
		function A(e) {
			if (!O) return;
			e - D >= 250 && (D = e, b());
			let t = n.video;
			C(t) && k(t);
		}
		function j() {
			if (O || !c.value || !n.video) return;
			let e = n.video;
			if (C(e)) {
				O = !0, D = 0, k(e);
				return;
			}
			b(), !m && (O = !0, E = setInterval(b, 250));
		}
		function M() {
			O = !1, w != null && T && T.cancelVideoFrameCallback(w), w = null, T = null, E != null && (clearInterval(E), E = null);
		}
		N(() => [
			c.value,
			n.playing,
			n.video
		], ([e, t]) => {
			M(), e && t && j();
		}, { immediate: !0 }), y(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				a = e, s(), a.addEventListener?.("chargingchange", s), a.addEventListener?.("levelchange", s);
			}).catch(() => {});
		}), v(() => {
			M(), a?.removeEventListener?.("chargingchange", s), a?.removeEventListener?.("levelchange", s);
		});
		let P = r(() => {
			let e = { opacity: String(l.value) };
			return u.value && (e.background = u.value), e;
		});
		return t({ sampleNow: b }), (e, t) => (x(), o("div", {
			class: g(["player__ambient", { "is-active": c.value }]),
			style: _(c.value ? P.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), xu = ["aria-label"], Su = { class: "resume__label" }, Cu = { class: "resume__time numeric" }, wu = { class: "resume__actions" }, Tu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = X(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (x(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": O(i)("player.resumePlayback")
		}, [s("p", Su, [
			l(E(a.value[0]), 1),
			s("span", Cu, E(O(Eo)(e.seconds)), 1),
			l(E(a.value[1]), 1)
		]), s("div", wu, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [u(J, { name: "play" }), s("span", null, E(O(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [u(J, { name: "rewind" }), s("span", null, E(O(i)("player.startOver")), 1)])])], 8, xu));
	}
}), [["__scopeId", "data-v-271c5209"]]), Eu = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Du = [
	"mkv",
	"avi",
	"wmv",
	"flv",
	"ts",
	"m2ts",
	"mts",
	"mpg",
	"mpeg",
	"vob",
	"divx",
	"3gp",
	"rmvb"
], Ou = new Set(Du);
function ku(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Au(...e) {
	return e.some((e) => Ou.has(ku(e)));
}
function ju(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Mu(e) {
	return e?.error?.code === 2;
}
var Nu = 3e4;
function Pu(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && Hu.get(t) === "hevc";
}
function Fu(e) {
	let t = { forceTranscode: "1" };
	return Pu(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function Iu(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
var Lu = 8, Ru = 15, zu = 2 * Math.PI * 15;
function Bu(e, t, n = zu) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Vu = /* @__PURE__ */ new Map([
	["aac", "mp4a.40.2"],
	["aac-latm", "mp4a.40.2"],
	["ac3", "ac-3"],
	["eac3", "ec-3"],
	["ec3", "ec-3"],
	["dts", "dtsc"],
	["dtshd", "dtshd"],
	["mp3", "mp4a.40.34"],
	["opus", "opus"],
	["vorbis", "vorbis"],
	["flac", "flac"],
	["truehd", "mlp"]
]), Hu = /* @__PURE__ */ new Map([
	["h264", "h264"],
	["avc", "h264"],
	["avc1", "h264"],
	["x264", "h264"],
	["hevc", "hevc"],
	["h265", "hevc"],
	["hvc1", "hevc"],
	["hev1", "hevc"],
	["x265", "hevc"],
	["av1", "av1"],
	["av01", "av1"],
	["vp9", "vp9"],
	["vp09", "vp9"],
	["vp8", "vp8"],
	["vp08", "vp8"],
	["theora", "theora"]
]), Uu = /* @__PURE__ */ new Set(["h264"]), Wu = /* @__PURE__ */ new Map([
	["hevc", [
		"hvc1.1.6.L93.B0",
		"hvc1.1.4.L120.90",
		"hev1.1.4.L120.90",
		"hvc1.1.4.L120"
	]],
	["av1", ["av01.0.08M.08", "av01.0.05M.08"]],
	["vp9", ["vp09.00.10.08", "vp9"]],
	["vp8", ["vp8"]],
	["theora", ["theora"]]
]);
function Gu(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = Hu.get(t);
	return n === void 0 ? "transcode" : Uu.has(n) ? "direct" : "probe";
}
function Ku(e) {
	if (!Array.isArray(e)) return "";
	for (let t of e) {
		if (typeof t != "object" || !t) continue;
		let e = t, n = e.stream_type ?? e.streamType;
		if (typeof n != "string" || n.trim().toLowerCase() !== "video") continue;
		let r = typeof e.codec == "string" ? e.codec.trim() : "";
		if (r !== "") return r;
	}
	return "";
}
var qu = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function Ju(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return qu.get(t) ?? "video/mp4";
}
function Yu(e, t = "video/mp4") {
	let n = Vu.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Xu(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Yu(e, t);
	if (!n) return !1;
	if (typeof navigator < "u" && typeof navigator.mediaCapabilities?.decodingInfo == "function") try {
		return (await navigator.mediaCapabilities.decodingInfo({
			type: "media-source",
			video: {
				contentType: t,
				width: 1920,
				height: 1080,
				bitrate: 1e7,
				framerate: 30
			},
			audio: {
				contentType: n,
				channels: 6,
				bitrate: 384e3,
				samplerate: 48e3
			}
		})).supported;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video").canPlayType(n);
		return e === "probably" || e === "maybe";
	}
	return !1;
}
async function Zu(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = Hu.get(n), i = r === void 0 ? void 0 : Wu.get(r);
	if (!i || i.length === 0 || typeof navigator > "u") return !1;
	let a = navigator.mediaCapabilities;
	if (a && typeof a.decodingInfo == "function") try {
		if ((await a.decodingInfo({
			type: "media-source",
			video: {
				contentType: `${t}; codecs="${i[0]}"`,
				width: 3840,
				height: 2160,
				bitrate: 5e7,
				framerate: 60
			}
		})).supported) return !0;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video");
		for (let n of i) {
			let r = e.canPlayType(`${t}; codecs="${n}"`);
			if (r === "probably" || r === "maybe") return !0;
		}
	}
	return !1;
}
async function Qu(e, t, n = "") {
	if (Au(...e)) return !0;
	let r = e.map((e) => ku(e)).find((e) => Eu.includes(e)) ?? "";
	if (!Eu.includes(r)) return !1;
	let i = Ju(r), a = Gu(n);
	if (a === "transcode" || a === "probe" && !await Zu(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Xu(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/utils/imageSrc.ts
function $u(e) {
	return e.length > 1 && e[0] === "/" && e[1] !== "/" && e[1] !== "\\";
}
function ed(e, t) {
	if (typeof t != "string" || t === "" || !$u(t)) return t;
	let n = e.replace(/\/+$/, "");
	return n === "" ? t : n + t;
}
function td(e, t) {
	if (typeof t != "string" || t.trim() === "") return t;
	let n = [];
	for (let r of t.split(",")) {
		let t = r.trim();
		if (t === "") continue;
		let i = t.search(/\s/), a = i === -1 ? t : t.slice(0, i), o = i === -1 ? "" : t.slice(i);
		n.push(String(ed(e, a)) + o);
	}
	return n.length > 0 ? n.join(", ") : t;
}
//#endregion
//#region src/composables/useImageSrc.ts
function nd() {
	let e = zt();
	return {
		imgSrc: (t) => ed(e.value, t),
		imgSrcset: (t) => td(e.value, t)
	};
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var rd = ["aria-label"], id = ["src"], ad = { class: "upnext__body" }, od = { class: "upnext__eyebrow" }, sd = { class: "upnext__title" }, cd = {
	key: 0,
	class: "upnext__cd numeric"
}, ld = { class: "upnext__actions" }, ud = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, dd = ["r"], fd = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], pd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "UpNext",
	props: {
		media: {},
		remaining: { default: 0 },
		total: { default: 0 },
		counting: {
			type: Boolean,
			default: !1
		},
		posterUrl: { default: void 0 }
	},
	emits: ["play-now", "cancel"],
	setup(e, { emit: t }) {
		let { t: n } = X(), { imgSrc: i } = nd(), c = e, l = t, d = r(() => c.posterUrl ?? c.media.poster_url ?? null), f = r(() => Bu(c.remaining, c.total));
		return (t, r) => (x(), o("aside", {
			class: "upnext",
			role: "region",
			"aria-label": O(n)("player.upNext")
		}, [
			d.value ? (x(), o("img", {
				key: 0,
				class: "upnext__thumb",
				src: O(i)(d.value),
				alt: "",
				loading: "lazy"
			}, null, 8, id)) : a("", !0),
			s("div", ad, [
				s("p", od, E(O(n)("player.upNext")), 1),
				s("h4", sd, E(e.media.name), 1),
				e.counting ? (x(), o("p", cd, E(O(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", ld, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => l("play-now")
				}, [u(J, { name: "play" }), s("span", null, E(O(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => l("cancel")
				}, E(O(n)("player.cancel")), 1)])
			]),
			e.counting ? (x(), o("svg", ud, [s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, dd), s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": O(zu),
				"stroke-dashoffset": f.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, fd)])) : a("", !0)
		], 8, rd));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), md = {
	class: "transcode",
	role: "alert"
}, hd = { class: "transcode__card" }, gd = { class: "transcode__heading" }, _d = { class: "transcode__body" }, vd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = X();
		return (t, i) => (x(), o("div", md, [s("div", hd, [
			u(J, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", gd, E(O(r)("player.transcodeHeading")), 1),
			s("p", _d, E(e.title ? O(r)("player.transcodeBodyTitled", { title: e.title }) : O(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, E(O(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), yd = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, bd = { class: "prep__card" }, xd = { class: "prep__heading" }, Sd = { class: "prep__body" }, Cd = ["aria-valuenow"], wd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = X(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (x(), o("div", yd, [s("div", bd, [
			u(J, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", xd, E(O(n)("player.transcodePreparingHeading")), 1),
			s("p", Sd, E(e.title ? O(n)("player.transcodePreparingTitled", { title: e.title }) : O(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: _({ width: r() + "%" })
			}, null, 4)], 8, Cd),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, E(O(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Td = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let c = e, l = t, { t: d } = X();
		function f(e, t) {
			return !!t && t.end > t.start && e >= t.start && e < t.end;
		}
		let p = r(() => f(c.position, c.introMarker) ? {
			label: d("player.skipIntro"),
			target: c.introMarker.end
		} : f(c.position, c.outroMarker) ? {
			label: d("player.skipOutro"),
			target: c.outroMarker.end
		} : null);
		function m() {
			p.value && l("skip", p.value.target);
		}
		return (e, t) => (x(), i(n, { name: "skip" }, {
			default: P(() => [p.value ? (x(), o("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: L(m, ["stop"])
			}, [s("span", null, E(p.value.label), 1), u(J, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Ed = ["aria-label"], Dd = ["aria-label", "onClick"], Od = { class: "skip-controls__label" }, kd = 5, Ad = 30, jd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: l } = X();
		function d(e) {
			return e / 1e3;
		}
		function f(e, t) {
			return t >= d(e.endMs);
		}
		function p(e, t) {
			if (f(e, t)) return !1;
			let n = d(e.startMs), r = n - kd, i = n + Ad;
			return t >= r && t < i;
		}
		let m = [
			"intro",
			"outro",
			"credits"
		];
		function h(e) {
			switch (e) {
				case "intro": return l("player.skipLabelIntro");
				case "outro": return l("player.skipLabelCredits");
				case "credits": return l("player.skipLabelCredits");
				case "ad": return l("player.skipLabelSkipCredits");
			}
		}
		let g = r(() => !i.markers || i.markers.length === 0 ? [] : i.markers.filter((e) => m.includes(e.type) && p(e, i.position)).sort((e, t) => e.startMs - t.startMs));
		function _(e) {
			c("skip", d(e.startMs));
		}
		return (t, n) => g.value.length > 0 ? (x(), o("div", {
			key: 0,
			class: "skip-controls",
			"aria-label": O(l)("player.skipControls")
		}, [(x(!0), o(e, null, C(g.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${h(e.type)}`,
			onClick: L((t) => _(e), ["stop"])
		}, [s("span", Od, E(h(e.type)), 1), u(J, { name: "skip-forward" })], 8, Dd))), 128))], 8, Ed)) : a("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Md = ["aria-label", "aria-expanded"], Nd = ["aria-label"], Pd = { class: "chapterlist__head" }, Fd = { class: "chapterlist__title" }, Id = ["aria-label"], Ld = ["onClick"], Rd = { class: "chapterlist__index" }, zd = { class: "chapterlist__name" }, Bd = { class: "chapterlist__meta" }, Vd = { class: "chapterlist__time" }, Hd = {
	key: 0,
	class: "chapterlist__duration"
}, Ud = {
	key: 1,
	class: "chapterlist__empty"
}, Wd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ChapterList",
	props: {
		chapters: { default: () => [] },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "seek"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: l } = X();
		function d() {
			c("update:open", !1);
		}
		function f() {
			c("update:open", !i.open);
		}
		let p = r(() => i.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Eo(e.start), a;
			return e.end != null && e.end > e.start && (a = Eo(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = S(null), h = S(null);
		Ls(h, D(i, "open"), {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function _(e) {
			m.value && !m.value.contains(e.target) && d();
		}
		N(() => i.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
		}), v(() => {
			document.removeEventListener("pointerdown", _, !0);
		});
		function y(e) {
			c("seek", e.start), d();
		}
		return (n, r) => (x(), o("div", {
			ref_key: "rootEl",
			ref: m,
			class: "chapterlist"
		}, [s("button", {
			type: "button",
			class: g(["chapterlist__btn player__iconbtn", { "is-active": t.open }]),
			"aria-label": O(l)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: f
		}, [u(J, { name: "list" })], 10, Md), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(l)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", Pd, [s("h3", Fd, E(O(l)("player.chapters")), 1), u(Es, {
			name: "x",
			label: O(l)("common.close"),
			size: "sm",
			onClick: d
		}, null, 8, ["label"])]), p.value.length > 0 ? (x(), o("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": O(l)("player.chapterList")
		}, [(x(!0), o(e, null, C(p.value, (e) => (x(), o("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [s("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => y(e.chapter)
		}, [
			s("span", Rd, E(e.index), 1),
			s("span", zd, E(e.label), 1),
			s("span", Bd, [s("span", Vd, E(e.startLabel), 1), e.durationLabel ? (x(), o("span", Hd, "· " + E(e.durationLabel), 1)) : a("", !0)])
		], 8, Ld)]))), 128))], 8, Id)) : (x(), o("p", Ud, E(O(l)("player.noChapters")), 1))], 8, Nd)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Gd = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Kd = { class: "marker-timeline__ticks" }, qd = [
	"title",
	"aria-label",
	"onClick"
], Jd = { class: "marker-timeline__tooltip" }, Yd = { class: "marker-timeline__tooltip-label" }, Xd = { class: "marker-timeline__tooltip-time numeric" }, Zd = ["onClick"], Qd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "MarkerTimeline",
	props: {
		position: {},
		duration: {},
		markers: {}
	},
	emits: ["seek", "similar"],
	setup(t, { emit: n }) {
		let i = t, c = n;
		function u(e) {
			return e / 1e3;
		}
		let d = {
			intro: "var(--marker-intro, #3b82f6)",
			outro: "var(--marker-outro, #f97316)",
			credits: "var(--marker-credits, #a855f7)",
			ad: "var(--marker-ad, #ef4444)"
		};
		function f(e) {
			return d[e];
		}
		let p = r(() => i.duration <= 0 || !i.markers || i.markers.length === 0 ? [] : i.markers.filter((e) => {
			let t = u(e.startMs);
			return t > 0 && t < i.duration;
		}).map((e) => ({
			...e,
			startSec: u(e.startMs),
			endSec: u(e.endMs),
			ratio: u(e.startMs) / i.duration,
			color: f(e.type),
			isAd: e.type === "ad"
		}))), m = r(() => i.markers ? i.markers.find((e) => e.type === "ad" && i.position >= u(e.startMs) && i.position <= u(e.endMs)) ?? null : null), h = r(() => m.value !== null), v = r(() => m.value?.label ?? "Ad");
		function y(e) {
			c("seek", e.startSec);
		}
		function b(e) {
			c("similar", e.type, e.startMs);
		}
		return (t, n) => p.value.length > 0 ? (x(), o("div", {
			key: 0,
			class: g(["marker-timeline", { "is-ad-active": h.value }]),
			"aria-label": "Marker timeline"
		}, [h.value ? (x(), o("div", Gd, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), l(" " + E(v.value), 1)])) : a("", !0), s("div", Kd, [(x(!0), o(e, null, C(p.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: g(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: _({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${O(Eo)(e.startSec)}`,
			"aria-label": `${e.label} at ${O(Eo)(e.startSec)}`,
			onClick: L((t) => y(e), ["stop"])
		}, [s("span", Jd, [
			s("span", Yd, E(e.label), 1),
			s("span", Xd, E(O(Eo)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: L((t) => b(e), ["stop"])
			}, " Find similar ", 8, Zd)
		])], 14, qd))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), $d = ["aria-label", "aria-expanded"], ef = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, tf = ["aria-label"], nf = ["aria-selected", "onClick"], rf = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(t, { expose: i }) {
		let c = t, { t: l } = X(), d = [
			{
				label: "Off",
				value: 0
			},
			{
				label: "5m",
				value: 300
			},
			{
				label: "15m",
				value: 900
			},
			{
				label: "30m",
				value: 1800
			},
			{
				label: "45m",
				value: 2700
			},
			{
				label: "60m",
				value: 3600
			},
			{
				label: "90m",
				value: 5400
			}
		], f = S(0), p = S(0), m = r(() => p.value > 0), h;
		function _() {
			h &&= (clearInterval(h), void 0);
		}
		function y(e) {
			_(), p.value = e, !(e <= 0) && (h = setInterval(() => {
				--p.value, p.value <= 0 && (_(), p.value = 0, c.onExpire());
			}, 1e3));
		}
		function b(e) {
			f.value = e, e === 0 ? (_(), p.value = 0) : y(e);
		}
		function w(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let T = S(!1);
		function D() {
			m.value ? (b(0), T.value = !1) : T.value = !T.value;
		}
		function k(e) {
			b(e), T.value = !1;
		}
		return v(() => {
			_();
		}), i({ toggleOpen: D }), (t, r) => (x(), o("div", { class: g(["sleep-timer", { "is-active": m.value }]) }, [s("button", {
			type: "button",
			class: g(["sleep-timer__trigger", { "is-active": m.value }]),
			"aria-label": m.value ? `Sleep timer: ${w(p.value)} remaining` : O(l)("player.sleepTimer"),
			"aria-expanded": T.value,
			"aria-haspopup": "listbox",
			onClick: D
		}, [u(J, { name: "moon" }), m.value ? (x(), o("span", ef, E(w(p.value)), 1)) : a("", !0)], 10, $d), u(n, { name: "dropdown" }, {
			default: P(() => [T.value ? (x(), o("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": O(l)("player.sleepTimer")
			}, [(x(), o(e, null, C(d, (e) => s("li", {
				key: e.value,
				class: g(["sleep-timer__option", { "is-selected": f.value === e.value }]),
				role: "option",
				"aria-selected": f.value === e.value,
				onClick: (t) => k(e.value)
			}, E(e.label), 11, nf)), 64))], 8, tf)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), af = {
	wsUrl: null,
	wsPath: null
}, of = /^wss?:\/\/[^/?#@]+$/i, sf = /^\/[^?#]*$/;
function cf(e) {
	if (typeof e != "object" || !e) return af;
	let t = e;
	if (typeof t.wsUrl != "string" || !of.test(t.wsUrl)) return af;
	let n = typeof t.wsPath == "string" && sf.test(t.wsPath) ? t.wsPath.replace(/\/+$/, "") : null;
	return {
		wsUrl: t.wsUrl,
		wsPath: n
	};
}
function lf() {
	return typeof window > "u" ? af : cf(window.__PHLIX__);
}
//#endregion
//#region node_modules/@phlix/syncplay/dist/phlix-syncplay.js
var Z = {
	GROUP_CREATE: "syncplay_group_create",
	GROUP_JOIN: "syncplay_group_join",
	GROUP_LEAVE: "syncplay_group_leave",
	GROUP_STATE: "syncplay_group_state",
	GROUP_LIST: "syncplay_group_list",
	PLAYBACK_PLAY: "syncplay_playback_play",
	PLAYBACK_PAUSE: "syncplay_playback_pause",
	PLAYBACK_SEEK: "syncplay_playback_seek",
	PLAYBACK_QUEUE: "syncplay_playback_queue",
	PLAYBACK_SYNC: "syncplay_playback_sync",
	CHAT: "syncplay_chat",
	TYPING: "syncplay_typing",
	HOST_TRANSFER: "syncplay_host_transfer",
	HOST_ELECT: "syncplay_host_elect",
	TIME_PING: "syncplay_time_ping",
	TIME_PONG: "syncplay_time_pong",
	TIME_SYNC: "syncplay_time_sync",
	ERROR: "syncplay_error",
	INFO: "syncplay_info"
};
Z.GROUP_CREATE, Z.GROUP_JOIN, Z.GROUP_LEAVE, Z.GROUP_STATE, Z.GROUP_LIST, Z.PLAYBACK_PLAY, Z.PLAYBACK_PAUSE, Z.PLAYBACK_SEEK, Z.PLAYBACK_QUEUE, Z.PLAYBACK_SYNC, Z.CHAT, Z.TYPING, Z.HOST_TRANSFER, Z.HOST_ELECT, Z.TIME_PING, Z.TIME_PONG, Z.TIME_SYNC, Z.ERROR, Z.INFO;
function uf(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function df(e) {
	let t = e;
	if (typeof e == "string") try {
		t = JSON.parse(e);
	} catch {
		return null;
	}
	if (typeof t != "object" || !t || Array.isArray(t)) return null;
	let n = t;
	if (typeof n.type != "string") return null;
	let r = n.data;
	if (typeof r == "object" && r && !Array.isArray(r)) {
		let e = {};
		for (let t of Object.keys(n)) t !== "data" && (e[t] = n[t]);
		return {
			...r,
			...e
		};
	}
	return n;
}
function ff(e) {
	return JSON.stringify(e);
}
var pf = .1, mf = .99, hf = 1.01, gf = class {
	samples = [];
	driftRate = 1;
	now;
	samplesVersion = 0;
	cacheVersion = -1;
	cachedOffset = 0;
	cachedLatency = 0;
	cachedIsStable = !1;
	constructor(e) {
		this.now = e;
	}
	addSample(e, t, n, r) {
		let i = r - e - (n - t);
		if (i < 0 || i > 1e3) return !1;
		let a = i / 2, o = t - e + Math.trunc(a);
		return this.samples.push({
			offset: o,
			rtt: i,
			timestamp: this.now() / 1e3
		}), this.samples.length > 10 && this.samples.shift(), this.samplesVersion++, this.updateDriftRate(), !0;
	}
	ensureWindowCache() {
		this.cacheVersion !== this.samplesVersion && (this.cachedOffset = this.computeOffset(), this.cachedLatency = this.computeLatency(), this.cachedIsStable = this.computeIsStable(), this.cacheVersion = this.samplesVersion);
	}
	getOffset() {
		return this.ensureWindowCache(), this.cachedOffset;
	}
	computeOffset() {
		if (this.samples.length === 0) return 0;
		let e = this.samples.slice(-5), t = 0, n = 0;
		for (let r of e) {
			let e = 1 / Math.max(1, r.rtt);
			t += r.offset * e, n += e;
		}
		return Math.trunc(t / Math.max(1, n));
	}
	getLatency() {
		return this.ensureWindowCache(), this.cachedLatency;
	}
	computeLatency() {
		if (this.samples.length === 0) return 0;
		let e = this.samples.slice(-5), t = 0;
		for (let n of e) t += n.rtt / 2;
		return Math.trunc(t / Math.max(1, e.length));
	}
	isStable() {
		return this.ensureWindowCache(), this.cachedIsStable;
	}
	computeIsStable() {
		if (this.samples.length < 5) return !1;
		let e = this.samples.slice(-5).map((e) => e.offset), t = e.reduce((e, t) => e + t, 0) / e.length, n = 0;
		for (let r of e) {
			let e = r - t;
			n += e * e;
		}
		return n / e.length < 50;
	}
	updateDriftRate() {
		if (this.samples.length < 2) return;
		let e = this.samples.slice(-5);
		if (e.length < 2) return;
		let t = e[0], n = e[e.length - 1], r = n.timestamp - t.timestamp;
		if (r <= 0) return;
		let i = (n.offset - t.offset) / r;
		this.driftRate = 1 + pf * i / 1e3, this.driftRate = Math.min(hf, Math.max(mf, this.driftRate));
	}
	getDriftRate() {
		return this.driftRate;
	}
	getSampleCount() {
		return this.samples.length;
	}
	getSynchronizedTime(e) {
		return e + this.getOffset();
	}
	getAdjustedPosition(e, t, n) {
		return e + (this.getSynchronizedTime(n) - t) * this.driftRate;
	}
	reset() {
		this.samples = [], this.driftRate = 1, this.samplesVersion++;
	}
	getStatus() {
		return {
			offset: this.getOffset(),
			latency: this.getLatency(),
			driftRate: this.driftRate,
			isStable: this.isStable(),
			sampleCount: this.samples.length
		};
	}
}, _f = class e {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new gf(e.now);
	}
	getTimeSync() {
		return this.timeSync;
	}
	getGroup() {
		return this.group;
	}
	getMemberId() {
		return this.memberId;
	}
	isHost() {
		return this.group !== null && this.group.host_id === this.memberId;
	}
	getSynchronizedTime() {
		return this.timeSync.getSynchronizedTime(this.now());
	}
	createGroup(e, t) {
		let n = {
			group_name: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(Z.GROUP_CREATE, n);
	}
	joinGroup(e, t) {
		let n = {
			group_id: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(Z.GROUP_JOIN, n);
	}
	leaveGroup() {
		this.group !== null && (this.dispatch(Z.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null);
	}
	sendPlay(e) {
		this.group !== null && this.dispatch(Z.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendPause(e) {
		this.group !== null && this.dispatch(Z.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendSeek(e, t) {
		this.group !== null && this.dispatch(Z.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	reportPosition(e, t) {
		this.group !== null && this.dispatch(Z.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		});
	}
	pingTime() {
		let e = this.now();
		this.lastPingSendTime = e, this.dispatch(Z.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, this.options.onDisconnect?.();
	}
	handleIncoming(e) {
		let t = df(e);
		if (t !== null) switch (t.type) {
			case Z.TIME_PONG:
				this.handleTimePong(t);
				break;
			case Z.GROUP_STATE:
				this.handleGroupState(t);
				break;
			case Z.PLAYBACK_PLAY:
				this.handlePlayback("play", t);
				break;
			case Z.PLAYBACK_PAUSE:
				this.handlePlayback("pause", t);
				break;
			case Z.PLAYBACK_SEEK:
				this.handleSeek(t);
				break;
			case Z.HOST_ELECT:
				this.handleHostElect(t);
				break;
			case Z.INFO:
				this.handleInfo(t);
				break;
			case Z.ERROR:
				this.handleError(t);
				break;
			case Z.TYPING:
				this.handleTyping(t);
				break;
			case Z.HOST_TRANSFER:
				this.handleHostTransfer(t);
				break;
			case Z.PLAYBACK_SYNC:
				this.handlePlaybackSync(t);
				break;
			case Z.TIME_SYNC:
				this.handleTimeSync(t);
				break;
			case Z.GROUP_LIST:
				this.handleGroupList(t);
				break;
			case Z.CHAT:
			case Z.PLAYBACK_QUEUE: break;
			default:
				this.options.onUnknownFrame?.(t);
				break;
		}
	}
	handleTimePong(e) {
		let t = e, n = this.now(), r = typeof t.client_time == "number" ? t.client_time : this.lastPingSendTime, i = typeof t.server_time == "number" ? t.server_time : null;
		if (r === null || i === null) return;
		let a = this.timeSync.addSample(r, i, i, n);
		this.lastPingSendTime = null, a && this.options.onSync?.({
			offset: this.timeSync.getOffset(),
			latency: this.timeSync.getLatency(),
			isStable: this.timeSync.isStable()
		});
	}
	static normalizeMembers(e, t) {
		let n;
		return n = Array.isArray(e) ? e : e && typeof e == "object" ? Object.entries(e).map(([e, t]) => ({
			...t,
			id: e
		})) : [], n.map((e) => ({
			id: typeof e.id == "string" ? e.id : "",
			name: typeof e.name == "string" ? e.name : "",
			is_host: e.id === t,
			joined_at: typeof e.joined_at == "number" ? e.joined_at : 0
		}));
	}
	handleGroupState(t) {
		let n = t, r = n.group;
		if (typeof r != "object" || !r) return;
		let i = e.normalizeMembers(r.members, r.host_id ?? null);
		this.group = {
			group_id: r.group_id ?? "",
			group_name: r.group_name ?? "",
			members: i,
			member_count: r.member_count,
			host_id: r.host_id ?? null,
			current_media_id: r.current_media_id ?? null,
			current_media_duration: r.current_media_duration ?? null,
			playback_position: r.playback_position ?? 0,
			playback_state: r.playback_state ?? "stopped",
			created_at: r.created_at,
			last_activity_at: r.last_activity_at
		}, this.options.onState?.(this.group, n.your_id);
	}
	handlePlayback(e, t) {
		if ((typeof t.member_id == "string" ? t.member_id : void 0) === this.memberId) return;
		let n = typeof t.position == "number" ? t.position : 0, r = typeof t.server_time == "number" ? t.server_time : this.getSynchronizedTime();
		this.options.onPlaybackCommand?.({
			type: e,
			position: n,
			serverTime: r
		});
	}
	handleSeek(e) {
		if ((typeof e.member_id == "string" ? e.member_id : void 0) === this.memberId) return;
		let t = typeof e.to_position == "number" ? e.to_position : 0, n = typeof e.server_time == "number" ? e.server_time : this.getSynchronizedTime();
		this.options.onPlaybackCommand?.({
			type: "seek",
			position: t,
			serverTime: n
		});
	}
	handleHostElect(e) {
		let t = e.elected_id ?? null;
		this.group !== null && (this.group = {
			...this.group,
			host_id: t
		}), this.options.onHostChanged?.(t);
	}
	handleInfo(e) {
		let t = e;
		typeof t.member_id == "string" && typeof t.member_name == "string" && this.options.onMemberJoined?.({
			id: t.member_id,
			name: t.member_name
		}), typeof t.message == "string" && this.options.onInfo?.(t.message);
	}
	handleError(e) {
		let t = e, n = t.error_code ?? t.code ?? "UNKNOWN", r = typeof t.message == "string" ? t.message : "Unknown error";
		this.options.onError?.(n, r);
	}
	handleTyping(e) {
		let t = e;
		typeof t.member_id == "string" && this.options.onMemberTyping?.(t.member_id, t.is_typing ?? !1);
	}
	handleHostTransfer(e) {
		let t = e;
		typeof t.current_host_id != "string" || typeof t.new_host_id != "string" || (this.group !== null && (this.group = {
			...this.group,
			host_id: t.new_host_id
		}), this.options.onHostTransfer?.(t.current_host_id, t.new_host_id));
	}
	handlePlaybackSync(e) {
		let t = typeof e.member_id == "string" ? e.member_id : void 0, n = typeof e.position == "number" ? e.position : 0, r = typeof e.is_playing == "boolean" && e.is_playing, i = typeof e.server_time == "number" ? e.server_time : this.getSynchronizedTime();
		this.options.onPlaybackSync?.(t ?? "", n, r, i);
	}
	handleTimeSync(e) {
		let t = e, n = typeof t.server_time == "number" ? t.server_time : 0, r = typeof t.client_time == "number" ? t.client_time : 0;
		this.options.onTimeSync?.(n, r);
	}
	handleGroupList(e) {
		let t = e.groups;
		if (!Array.isArray(t)) return;
		let n = t.map((e) => ({
			group_id: typeof e.group_id == "string" ? e.group_id : "",
			group_name: typeof e.group_name == "string" ? e.group_name : "",
			has_password: typeof e.has_password == "boolean" ? e.has_password : void 0
		}));
		this.options.onGroupList?.(n);
	}
	dispatch(e, t) {
		this.send(uf(e, t, this.now));
	}
};
//#endregion
//#region src/api/syncplay.ts
function vf(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function yf(e) {
	return e / 1e3;
}
function bf(e) {
	let t = vf(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function xf(e) {
	return e.group_id ?? e.id ?? "";
}
function Sf(e) {
	let t = e?.members;
	return t ? (Array.isArray(t) ? t : Object.entries(t).map(([e, t]) => ({
		id: e,
		...t
	}))).map((e) => ({
		id: e.id ?? "",
		name: e.name ?? "Unknown",
		profileId: 0,
		role: e.is_host === !0 ? "owner" : "contributor",
		isOnline: !0,
		lastSeen: bf(e.joined_at)
	})) : [];
}
function Cf(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function wf(e) {
	let t = e ?? {}, n = xf(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: vf(t.member_count, Sf(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: bf(t.created_at)
	};
}
function Tf(e) {
	let t = e ?? {}, n = xf(t), r = Cf(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: bf(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: yf(vf(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: vf(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: bf(t.last_activity_at),
		activeUsers: Sf(t),
		roles: Object.fromEntries(Sf(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var Ef = class {
	client;
	constructor(e) {
		this.client = new jt({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new mt() : void 0
		});
	}
	async createRoom(e) {
		return wf((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t) {
		let n = t !== void 0 && t !== "" ? { memberName: t } : void 0, r = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, n);
		return {
			room: wf(r.group),
			session: Tf(r.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return Tf((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return Sf((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(wf) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
}, Df = null, Of = null;
function kf(e) {
	return (!Df || Of !== e) && (Df = new Ef(e), Of = e), Df;
}
var Af = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, Q = null, jf = null, Mf = 0, Nf = 5, Pf = 1e3, $ = null, Ff = null, If = null, Lf = null;
function Rf() {
	try {
		return typeof window > "u" ? null : new mt().getAccessToken();
	} catch {
		return null;
	}
}
function zf(e) {
	let t = lf();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location.hostname : "localhost";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${n}:8097?room=${encodeURIComponent(e)}`;
}
function Bf() {
	let e = Rf();
	return e ? ["bearer", e] : void 0;
}
function Vf(e) {
	if ($) try {
		let t = JSON.parse(e.data);
		$.handleIncoming(t);
	} catch {}
}
function Hf(e) {
	if (!(e && e.target !== Q)) if (Q = null, $ && $.onDisconnect(), jf && Mf < Nf) {
		let e = Pf * 2 ** Mf;
		Mf++, Af.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Mf})`), setTimeout(() => {
			jf && Wf(jf);
		}, e);
	} else Mf >= Nf && (Af.warn("[SyncPlay] Max reconnect attempts reached, giving up"), jf = null, Mf = 0, $ = null);
}
function Uf(e, t, n, r) {
	Mf = 0, Wf(e, t, n, r);
}
function Wf(e, t, n, r) {
	if (t && (Lf = t), Q && jf !== e) {
		let e = Q;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Q = null, jf = null, $ = null;
	}
	if (Q && jf === e) return;
	jf = e;
	let i = n ?? Ff ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? If ?? "Anonymous";
	Ff = i, If = a, $ = new _f({
		send: (e) => {
			Q && Q.readyState === WebSocket.OPEN && Q.send(ff(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			Lf && Lf({
				type: e.type,
				position: yf(e.position),
				roomId: jf ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			Lf && Lf({
				type: n ? "play" : "pause",
				position: yf(t),
				roomId: jf ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			Af.error(`[SyncPlay] Error: ${e} - ${t}`);
		},
		onInfo: (e) => {
			Af.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = zf(e);
	Af.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, Bf());
	} catch (e) {
		Af.error("[SyncPlay] WebSocket constructor refused the handshake", e), Hf();
		return;
	}
	Q = s, s.onopen = () => {
		Af.log("[SyncPlay] WebSocket connected"), Mf = 0, $ && jf && $.joinGroup(jf);
	}, s.onmessage = Vf, s.onclose = Hf, s.onerror = (e) => {
		Af.error("[SyncPlay] WebSocket error", e);
	};
}
function Gf() {
	if (Q) {
		let e = Q;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Q = null;
	}
	$ &&= ($.leaveGroup(), $.onDisconnect(), null), jf = null, Mf = 0;
}
function Kf(e) {
	!$ || !Q || Q.readyState !== WebSocket.OPEN || $.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function qf(e) {
	if (!(!$ || !Q || Q.readyState !== WebSocket.OPEN)) switch (e.type) {
		case "play":
			$.sendPlay(e.position ?? 0);
			break;
		case "pause":
			$.sendPause(e.position ?? 0);
			break;
		case "seek":
			e.position !== void 0 && $.sendSeek(0, e.position);
			break;
		case "sync": e.position !== void 0 && $.reportPosition(e.position, !0);
	}
}
var Jf = 5e3;
function Yf() {
	let e = Ht().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Xf = R("phlix-syncplay", () => {
	let e = S(null), t = S(null), n = S(null), i = S([]), a = S(null), o = S(!1), s = S(0), c = 0, l = null, u = r(() => t.value !== null), d = r(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), f = r(() => i.value.filter((e) => e.isOnline)), p = r(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - c) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return s.value - r;
	}), m = r(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(p.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function h() {
		let e = t.value;
		if (!e) {
			_();
			return;
		}
		e.state === "playing" && Kf({
			sessionId: e.id,
			playbackPosition: s.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	function g() {
		_(), l = setInterval(h, Jf);
	}
	function _() {
		l !== null && (clearInterval(l), l = null);
	}
	function v(e) {
		n.value = e, t.value &&= {
			...t.value,
			currentMediaId: e.mediaId
		};
	}
	function y() {
		n.value = null;
	}
	function b(n, r, a) {
		let { room: o, session: s } = r;
		t.value = s, c = Date.now(), e.value = {
			...e.value ?? {},
			...o,
			currentSession: s
		}, i.value = s.activeUsers, Uf(n, (e) => {
			T(e);
		}, void 0, a), g();
	}
	async function x(t, n) {
		o.value = !0, a.value = null;
		try {
			let r = kf(t), i = Yf(), a = await r.createRoom({
				...n,
				memberName: i
			});
			e.value = a, b(a.id, await r.joinRoom(a.id, i), i);
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to create the room", e;
		} finally {
			o.value = !1;
		}
	}
	async function C(e, t) {
		o.value = !0, a.value = null;
		try {
			let n = kf(e), r = Yf();
			b(t, await n.joinRoom(t, r), r);
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to join the room", e;
		} finally {
			o.value = !1;
		}
	}
	async function w(n) {
		if (e.value) {
			o.value = !0, a.value = null;
			try {
				await kf(n).leaveRoom(e.value.id), _(), Gf(), e.value = null, t.value = null, i.value = [];
			} catch (e) {
				throw a.value = e instanceof Error ? e.message : "Failed to leave the room", e;
			} finally {
				o.value = !1;
			}
		}
	}
	function T(e) {
		if (t.value) switch (e.type) {
			case "play":
				e.position !== void 0 && (c = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				}), t.value = {
					...t.value,
					state: "playing",
					playbackRate: e.rate ?? 1
				};
				break;
			case "pause":
				e.position !== void 0 && (c = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				}), t.value = {
					...t.value,
					state: "paused"
				};
				break;
			case "seek":
				e.position !== void 0 && (c = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				});
				break;
			case "sync": e.position !== void 0 && (c = Date.now(), t.value = {
				...t.value,
				playbackPosition: e.position
			}), e.rate !== void 0 && (t.value = {
				...t.value,
				playbackRate: e.rate
			});
		}
	}
	function E(e, n, r) {
		t.value && qf({
			type: n,
			position: r?.position === void 0 ? void 0 : r.position * 1e3,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function D(e) {
		if (t.value) try {
			let n = await kf(e).getState(t.value.id);
			t.value = n, c = Date.now();
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function O(t) {
		if (e.value) try {
			let n = await kf(t).getMembers(e.value.id);
			i.value = n;
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function k() {
		a.value = null;
	}
	function A(e) {
		s.value = e;
	}
	return {
		currentRoom: e,
		currentSession: t,
		members: i,
		error: a,
		isLoading: o,
		localPlaybackPosition: s,
		pendingPlayMedia: n,
		isInRoom: u,
		isSynced: d,
		onlineMembers: f,
		syncStatus: m,
		driftAmount: p,
		createAndJoinRoom: x,
		joinRoom: C,
		leaveRoom: w,
		onRemoteStateUpdate: T,
		sendCommand: E,
		refreshState: D,
		refreshMembers: O,
		clearError: k,
		updateLocalPosition: A,
		applyPendingPlayMedia: v,
		consumePendingPlayMedia: y
	};
}), Zf = {
	key: 0,
	class: "syncplay-overlay"
}, Qf = { class: "syncplay-overlay__badge" }, $f = { class: "syncplay-overlay__label" }, ep = { class: "syncplay-overlay__status-label" }, tp = { class: "syncplay-overlay__members" }, np = { class: "syncplay-overlay__member-count" }, rp = { class: "syncplay-overlay__member-list" }, ip = { class: "syncplay-overlay__member-name" }, ap = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, op = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = X(), c = Xf(), d = zt(), f = r(() => n.apiBase ?? d.value), p = r(() => c.currentRoom?.name ?? "SyncPlay"), m = r(() => c.onlineMembers.length), h = r(() => c.syncStatus), _ = r(() => {
			switch (h.value) {
				case "synced": return i("syncplay.synced");
				case "outOfSync": return i("syncplay.outOfSync");
				case "re-syncing": return i("syncplay.reSyncing");
				default: return i("syncplay.synced");
			}
		}), v = r(() => {
			switch (h.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function y() {
			await c.leaveRoom(f.value);
		}
		return (t, n) => O(c).isInRoom ? (x(), o("div", Zf, [
			s("div", Qf, [u(J, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", $f, "SyncPlay: " + E(p.value), 1)]),
			s("div", { class: g(["syncplay-overlay__status", `syncplay-overlay__status--${h.value}`]) }, [u(J, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", ep, E(_.value), 1)], 2),
			s("div", tp, [s("span", np, [u(J, { name: "user" }), l(" " + E(O(i)("syncplay.members", { count: m.value })), 1)]), s("ul", rp, [(x(!0), o(e, null, C(O(c).onlineMembers.slice(0, 5), (e) => (x(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", ip, E(e.name), 1)]))), 128)), O(c).onlineMembers.length > 5 ? (x(), o("li", ap, " +" + E(O(c).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			u(Nl, {
				variant: "ghost",
				size: "sm",
				onClick: y
			}, {
				default: P(() => [l(E(O(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), sp = ["aria-label"], cp = ["aria-checked", "tabindex"], lp = ["aria-checked", "tabindex"], up = {
	key: 0,
	class: "syncplay-modal__fields"
}, dp = { class: "syncplay-modal__field" }, fp = {
	class: "syncplay-modal__label",
	for: "room-name"
}, pp = ["placeholder"], mp = {
	key: 1,
	class: "syncplay-modal__fields"
}, hp = { class: "syncplay-modal__field" }, gp = {
	class: "syncplay-modal__label",
	for: "room-id"
}, _p = ["placeholder"], vp = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, yp = {
	key: 3,
	class: "syncplay-modal__rooms"
}, bp = { class: "syncplay-modal__rooms-title" }, xp = { class: "syncplay-modal__rooms-list" }, Sp = ["onClick"], Cp = { class: "syncplay-modal__room-name" }, wp = { class: "syncplay-modal__room-count" }, Tp = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Ep = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let c = t, d = n, { t: f } = X(), p = Xf(), m = zt(), h = r(() => c.apiBase ?? m.value), _ = S("create"), v = S(null), y = S(null);
		function b(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), _.value = "create", v.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), _.value = "join", y.value?.focus();
			}
		}
		let w = S(""), T = S(""), D = S(!1), k = S(null), A = S([]), M = S(!1), I = r(() => w.value.trim().length > 0), R = r(() => T.value.trim().length > 0), z = r(() => (_.value === "create" ? I.value : R.value) && !D.value);
		N(() => c.modelValue, async (e) => {
			e && (k.value = null, w.value = "", c.prefilledRoomId ? (T.value = c.prefilledRoomId, _.value = "join") : (T.value = "", _.value = "create"), await B());
		});
		async function B() {
			M.value = !0;
			try {
				let e = new Ef(h.value);
				A.value = await e.listPublicRooms();
			} catch {
				A.value = [];
			} finally {
				M.value = !1;
			}
		}
		async function ee() {
			if (z.value) {
				D.value = !0, k.value = null;
				try {
					_.value === "create" ? await p.createAndJoinRoom(h.value, { name: w.value.trim() }) : await p.joinRoom(h.value, T.value.trim()), p.currentRoom && d("joined", p.currentRoom), d("update:modelValue", !1);
				} catch (e) {
					k.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					D.value = !1;
				}
			}
		}
		function V(e) {
			_.value = "join", T.value = e.id, w.value = e.name;
		}
		function H() {
			d("update:modelValue", !1);
		}
		return (n, r) => (x(), i(kl, {
			"model-value": t.modelValue,
			title: O(f)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[4] ||= (e) => d("update:modelValue", e),
			onClose: H
		}, {
			footer: P(() => [u(Nl, {
				variant: "ghost",
				type: "button",
				onClick: H
			}, {
				default: P(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			}), u(Nl, {
				variant: "solid",
				type: "button",
				loading: D.value,
				disabled: !z.value,
				onClick: ee
			}, {
				default: P(() => [l(E(_.value === "create" ? O(f)("syncplay.createRoom") : O(f)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: P(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: L(ee, ["prevent"])
			}, [
				s("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": O(f)("syncplay.modeSelect"),
					onKeydown: b
				}, [s("button", {
					ref_key: "createOptionEl",
					ref: v,
					type: "button",
					role: "radio",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "create" }]),
					"aria-checked": _.value === "create",
					tabindex: _.value === "create" ? 0 : -1,
					onClick: r[0] ||= (e) => _.value = "create"
				}, E(O(f)("syncplay.createRoom")), 11, cp), s("button", {
					ref_key: "joinOptionEl",
					ref: y,
					type: "button",
					role: "radio",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "join" }]),
					"aria-checked": _.value === "join",
					tabindex: _.value === "join" ? 0 : -1,
					onClick: r[1] ||= (e) => _.value = "join"
				}, E(O(f)("syncplay.joinRoom")), 11, lp)], 40, sp),
				_.value === "create" ? (x(), o("div", up, [s("div", dp, [s("label", fp, E(O(f)("syncplay.roomName")), 1), F(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => w.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(f)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, pp), [[j, w.value]])])])) : (x(), o("div", mp, [s("div", hp, [s("label", gp, E(O(f)("syncplay.roomId")), 1), F(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[3] ||= (e) => T.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(f)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, _p), [[j, T.value]])])])),
				k.value ? (x(), o("p", vp, E(k.value), 1)) : a("", !0),
				_.value === "join" && A.value.length > 0 ? (x(), o("div", yp, [s("h3", bp, E(O(f)("syncplay.publicRooms")), 1), s("ul", xp, [(x(!0), o(e, null, C(A.value, (e) => (x(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => V(e)
				}, [
					u(J, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", Cp, E(e.name), 1),
					s("span", wp, E(O(f)("syncplay.members", { count: e.memberCount })), 1)
				], 8, Sp)]))), 128))])])) : a("", !0),
				M.value ? (x(), o("div", Tp, [u(J, { name: "spinner" }), s("span", null, E(O(f)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-fc76bfb0"]]), Dp = {
	key: 0,
	class: "syncplay-controls"
}, Op = ["aria-label"], kp = { class: "syncplay-controls__wait-label" }, Ap = { class: "syncplay-controls__transport" }, jp = ["aria-label"], Mp = ["aria-label"], Np = ["aria-label"], Pp = { class: "syncplay-controls__status-label" }, Fp = 10, Ip = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayControls",
	props: {
		position: {},
		duration: {},
		isPlaying: { type: Boolean },
		isBuffering: { type: Boolean },
		apiBase: {}
	},
	emits: [
		"seek",
		"play",
		"pause"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, { t: c } = X(), l = Xf(), d = zt(), f = r(() => n.apiBase ?? d.value), p = S(!1), m = r(() => p.value || l.syncStatus === "re-syncing");
		async function h() {
			if (l.isInRoom) try {
				await l.sendCommand(f.value, "play"), i("play");
			} catch (e) {
				console.error("[SyncPlay] Failed to send play command:", e);
			}
		}
		async function _() {
			if (l.isInRoom) try {
				await l.sendCommand(f.value, "pause"), i("pause");
			} catch (e) {
				console.error("[SyncPlay] Failed to send pause command:", e);
			}
		}
		async function v() {
			n.isPlaying ? await _() : await h();
		}
		async function y(e) {
			if (l.isInRoom) try {
				await l.sendCommand(f.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function b() {
			await y(Math.max(0, n.position - Fp));
		}
		async function C() {
			await y(Math.min(n.duration, n.position + Fp));
		}
		return N(() => l.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => O(l).isInRoom ? (x(), o("div", Dp, [
			m.value ? (x(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": O(c)("syncplay.waitingForMembers")
			}, [u(J, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), s("span", kp, E(O(c)("syncplay.waitingForMembers")), 1)], 8, Op)) : a("", !0),
			s("div", Ap, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.rewind"),
					onClick: b
				}, [u(J, { name: "rewind" })], 8, jp),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? O(c)("syncplay.pauseAll") : O(c)("syncplay.playAll"),
					onClick: v
				}, [u(J, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Mp),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.fastForward"),
					onClick: C
				}, [u(J, { name: "forward" })], 8, Np)
			]),
			s("div", { class: g(["syncplay-controls__status", `syncplay-controls__status--${O(l).syncStatus}`]) }, [u(J, {
				name: O(l).syncStatus === "synced" ? "check" : O(l).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", Pp, E(O(l).syncStatus === "synced" ? O(c)("syncplay.synced") : O(l).syncStatus === "outOfSync" ? O(c)("syncplay.outOfSync") : O(c)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-3df5b737"]]);
//#endregion
//#region src/utils/subtitleSrc.ts
function Lp(e, t) {
	return String(ed(e, t));
}
function Rp(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Lp(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
//#endregion
//#region src/components/Player.vue?vue&type=script&setup=true&lang.ts
var zp = { class: "player__stage" }, Bp = ["src", "poster"], Vp = [
	"src",
	"srclang",
	"label"
], Hp = { class: "player__meta" }, Up = ["aria-label"], Wp = { class: "player__meta-text" }, Gp = { class: "player__eyebrow" }, Kp = { class: "player__title" }, qp = { class: "player__sub numeric" }, Jp = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Yp = {
	key: 0,
	class: "player__center"
}, Xp = ["aria-label"], Zp = ["aria-label"], Qp = ["aria-label"], $p = { class: "player__btnrow" }, em = ["aria-label"], tm = ["aria-label"], nm = ["aria-label"], rm = { class: "player__time numeric" }, im = ["aria-label", "aria-pressed"], am = ["title"], om = ["aria-label"], sm = ["aria-label"], cm = ["aria-label", "aria-pressed"], lm = ["aria-label", "aria-pressed"], um = ["aria-label"], dm = { class: "similar-modal" }, fm = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, pm = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, mm = { class: "similar-modal__state-title" }, hm = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, gm = {
	key: 3,
	class: "similar-modal__results"
}, _m = { class: "similar-modal__poster" }, vm = ["src", "alt"], ym = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, bm = { class: "similar-modal__result-body" }, xm = { class: "similar-modal__result-title" }, Sm = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Cm = { key: 0 }, wm = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		introMarker: {},
		outroMarker: {},
		markers: {},
		thumbnailAt: { type: Function },
		streamUrlFor: { type: Function },
		resolvePendingMedia: { type: Function },
		apiBase: {},
		prevEpisode: {},
		nextEpisode: {},
		playbackAudioTracks: {},
		playbackSubtitleTracks: {},
		autoplay: { type: Boolean }
	},
	emits: [
		"back",
		"captions",
		"theater",
		"pip",
		"play-next",
		"play-episode",
		"pending-media"
	],
	setup(t, { emit: n }) {
		let { imgSrc: c } = nd(), d = t, p = n, m = ue(), _ = ne(), { t: b } = X(), w = Xf(), T = Zt(), D = r(() => T.isFavorite(d.media.id)), k = r(() => T.likeLevel(d.media.id));
		function A() {
			T.toggleFavorite(d.media.id, _e());
		}
		function j(e) {
			T.setLike(d.media.id, e, _e());
		}
		let M = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], F = S(null), I = S(null), R = S(null), z = S(!0), B = S(!1), ee = S(!1), V = S(!1), H = S(!1), te = S(!1), re = S(!1), ie = S(null), ae = S(null), oe = S(!1), se = Mt(), ce = S(!1);
		function le(e) {
			se.success(b("syncplay.joinedRoom", { name: e.name }));
		}
		let de = r(() => H.value ? 1.35 : 1), U = S(Au(d.streamUrl, d.media.path)), fe = r(() => Ku(d.media.streams)), pe = 0;
		async function me() {
			let e = ++pe;
			if (U.value) return;
			let t = await Qu([d.streamUrl, d.media.path], d.playbackAudioTracks ?? [], fe.value);
			e === pe && (!t || U.value || (U.value = !0, Ee(F.value?.currentTime ?? 0)));
		}
		N([() => d.playbackAudioTracks, fe], () => {
			me();
		}, { immediate: !0 });
		let he = f("phlixConfig", null), W = f("resumeReporter", null), ge = !1;
		function _e() {
			return he?.apiBase ?? "";
		}
		let G = bs({
			apiBase: () => d.apiBase ?? "",
			hlsConfig: he?.playerHlsConfig
		}), ve = ws({ apiBase: () => d.apiBase ?? "" }), ye = null;
		function be(e) {
			ye !== null && clearTimeout(ye), ye = setTimeout(() => {
				ye = null, ve.fetch(e);
			}, 0);
		}
		let xe = r(() => d.thumbnailAt ?? ve.thumbnailAt), Se = r(() => U.value ? void 0 : d.streamUrl), Ce = r(() => U.value && G.state.value !== "ready"), we = r(() => U.value && (G.state.value === "preparing" || G.state.value === "idle")), Te = r(() => U.value && G.state.value === "error");
		function Ee(e = 0) {
			let t = F.value, n = navigator.connection?.downlinkMax, r = ps(n);
			t && G.start(t, d.media.id, r, e);
		}
		function De(e) {
			if (m.quality === "original" && e !== "auto") {
				G.loadVariantPlaylist(mc);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				G.loadVariantPlaylist(e);
				return;
			}
			G.setLevel(e);
		}
		let Oe = !1;
		function ke() {
			_.defaultQuality = pc;
		}
		function Ae() {
			let e = G.levels.value;
			if (e.length === 0) return !1;
			let t = _.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = G.variants.value;
				if (!t || t.length === 0) return !1;
				if (xc(e, t)) G.loadVariantPlaylist(mc);
				else {
					let t = bc(e);
					t >= 0 && G.setNextLevel(t), ke();
				}
				return !0;
			}
			let n = vc(e, t);
			return n >= 0 ? G.setNextLevel(n) : ke(), !0;
		}
		N(() => G.levels.value, (e) => {
			Oe || e.length === 0 || Ae() && (Oe = !0);
		}), N(() => G.variants.value, (e) => {
			Oe || !e?.length || h(() => {
				Oe || Ae() && (Oe = !0);
			});
		}, { deep: !0 });
		let je = S(m.resumePositionFor(d.media.id) ?? 0), Me = S(!U.value && je.value > 0), Ne = null, Pe = S(!1), Fe = S(8), Ie, Le = S(null), Re = S(0), ze = S(!1), Be = S([]), Ve = S(!1), He = S(null);
		function Ue(e, t) {
			Le.value = e, Re.value = t, Be.value = [], He.value = null, ze.value = !0, Je(e, t);
		}
		let We = null, Ge = null, Ke = null;
		function qe() {
			let e = d.apiBase ?? "";
			return (Ge === null || Ke !== e) && (Ge = new jt({ baseUrl: e }), Ke = e), Ge;
		}
		async function Je(e, t) {
			We?.abort(), We = new AbortController(), Ve.value = !0, He.value = null;
			try {
				let n = await qe().searchByMarker(e, t, 30, 20, We.signal);
				Be.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				He.value = "Failed to load similar media. Please try again.", Be.value = [];
			} finally {
				Ve.value = !1;
			}
		}
		function Ye() {
			We?.abort(), ze.value = !1, Be.value = [], He.value = null, Le.value = null;
		}
		let Xe = r(() => m.upNext);
		function Ze() {
			U.value = Au(d.streamUrl, d.media.path), me(), je.value = m.resumePositionFor(d.media.id) ?? 0, Me.value = !U.value && je.value > 0, Ne = null, Wt = !1, At = !1, Dt.value = [], Et.value = !1, Nt = !1, q.value = -1, zt = null, Oe = !1, ge = !1, pt(), st = !1, ut = 0, lt = 0, tt(), Pe.value = !1, G.reset(), F.value && (F.value.currentTime = 0), U.value && Ee(), be(d.media.id);
		}
		function Qe(e) {
			let t = F.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ne = Math.max(0, e));
		}
		function $e() {
			Qe(je.value), Me.value = !1, F.value?.play()?.catch(() => {});
		}
		function et() {
			Ne = null, Qe(0), m.clearResume(d.media.id), Me.value = !1, F.value?.play()?.catch(() => {});
		}
		function tt() {
			Ie &&= (clearInterval(Ie), void 0);
		}
		function nt() {
			Fe.value = 8, tt(), Ie = setInterval(() => {
				--Fe.value, Fe.value <= 0 && (tt(), it());
			}, 1e3);
		}
		function rt() {
			ge || (ge = !0, W?.finish()), Tn(), z.value = !0, m.upNext && (Pe.value = !0, _.autoplay && nt());
		}
		function it() {
			tt(), Pe.value = !1;
			let e = m.next(d.streamUrlFor);
			e && p("play-next", e);
		}
		function at() {
			tt(), Pe.value = !1;
		}
		function ot() {
			if (U.value) return;
			let e = F.value, t = Mu(e) && (e?.currentTime ?? 0) === 0;
			(ju(e) || t) && (dt(), pt(), U.value = !0, Ee(e?.currentTime ?? 0));
		}
		let st = !1, ct = null, lt = 0, ut = 0;
		function dt() {
			if (st) return;
			st = !0;
			let e = d.media?.id;
			e != null && e !== "" && qe().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, Fu({ videoCodec: fe.value })).catch(() => {});
		}
		function ft() {
			if (ct !== null || st || U.value) return;
			let e = F.value;
			e && (lt = Date.now(), ut = e.currentTime, ct = setTimeout(() => {
				ct = null;
				let e = F.value;
				!e || U.value || Iu(Date.now(), lt, e.currentTime, ut) && (dt(), U.value = !0, Ee(e.currentTime));
			}, Nu));
		}
		function pt() {
			ct !== null && (clearTimeout(ct), ct = null);
		}
		let mt = S([]), ht = S([]), gt = S(-1), _t = S(!1), vt = r(() => G.state.value === "ready" && G.audioTracks.value.length > 0), yt = r(() => G.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), K = r(() => (d.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), q = S(-1), bt = r(() => !vt.value && !U.value && ht.value.length === 0 && K.value.length > 1), xt = r(() => vt.value ? yt.value : bt.value ? K.value : ht.value), St = r(() => {
			if (vt.value) return G.currentAudioTrack.value;
			if (bt.value) {
				if (q.value >= 0) return q.value;
				let e = (d.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : d.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return gt.value;
		}), Ct = S(!1), wt = m.subtitleLang, Tt = r(() => {
			let e = d.apiBase ?? "", t = U.value ? G.subtitleTracks.value : Rp(e, d.playbackSubtitleTracks ?? []);
			if (Dt.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Rp(e, Dt.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), Et = S(!1), Dt = S([]), Ot = r(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(_.defaultSubtitleLang), t(_.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function kt(e) {
			Dt.value.some((t) => t.url === e.url) || (Dt.value = [...Dt.value, e]);
		}
		let At = !1, Nt = !1;
		function Pt() {
			if (At) return;
			if (_.subtitlePreferenceSet) {
				At = !0;
				return;
			}
			let e = Tt.value.find((e) => e.default);
			if (!e) return;
			let t = mt.value.find((t) => t.language === (e.language || e.label));
			t && (m.setSubtitle(t.language), wt = t.language, At = !0);
		}
		function Ft() {
			if (Nt) return;
			let e = _.defaultAudioLang;
			if (!e) return;
			let t = xt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = St.value;
			r >= 0 && r < t.length || (Bt(n), Nt = !0);
		}
		let It = r(() => mt.value.some((e) => e.language === m.subtitleLang));
		function Lt() {
			let e = F.value;
			mt.value = Oc(e), ht.value = kc(e), gt.value = Pc(e), Pt(), Ft();
		}
		function Rt() {
			if (It.value) wt = m.subtitleLang, m.setSubtitle(null);
			else {
				let e = wt && mt.value.some((e) => e.language === wt) ? wt : mt.value[0]?.language ?? null;
				m.setSubtitle(e);
			}
			p("captions");
		}
		let zt = null;
		function Bt(e) {
			if (vt.value) G.setAudioTrack(e);
			else if (bt.value) {
				if (e === St.value) return;
				q.value = e, zt = e, U.value = !0, Ee(F.value?.currentTime ?? 0);
			} else Nc(F.value, e), gt.value = e;
		}
		N(vt, (e) => {
			if (!e || zt === null) return;
			let t = zt;
			zt = null, t >= 0 && t < G.audioTracks.value.length && G.setAudioTrack(t);
		}), N(Tt, () => {
			h(() => Lt());
		}, { deep: !0 });
		let Vt = null, Ht, Ut = r(() => {
			let e = [];
			d.media.year && e.push({ text: String(d.media.year) }), d.media.rating && e.push({
				text: d.media.rating,
				cert: !0
			}), d.media.runtime && e.push({ text: `${d.media.runtime}m` });
			let t = d.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Wt = !1;
		function Gt() {
			if (!d.autoplay || Wt || Me.value || Ce.value) return;
			let e = F.value;
			if (!e || !e.paused) return;
			Wt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, m.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Kt() {
			Gt();
		}
		function qt() {
			d.prevEpisode && p("play-episode", d.prevEpisode);
		}
		function Jt() {
			d.nextEpisode && p("play-episode", d.nextEpisode);
		}
		function Yt() {
			let e = F.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Xt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Qt() {
			m.play(), m.setMediaPositionState(), ft();
		}
		function $t() {
			m.pause(), m.setMediaPositionState();
		}
		function en() {
			let e = F.value;
			e && (ct !== null && e.currentTime > ut && pt(), m.updateProgress(e.currentTime, e.duration, Xt(e)), w.isInRoom && w.updateLocalPosition(e.currentTime));
		}
		function tn() {
			let e = F.value;
			e && (e.volume = m.volume, e.muted = m.muted, e.playbackRate = m.rate, Ne !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ne) : Ne, Ne = null), m.updateProgress(e.currentTime, e.duration, Xt(e)), m.setMediaPositionState(), Lt());
		}
		function nn() {
			let e = F.value;
			e && m.updateProgress(e.currentTime, e.duration, Xt(e));
		}
		function rn() {
			let e = F.value;
			e && (Math.abs(e.volume - m.volume) > .001 && m.setVolume(e.volume), e.muted !== m.muted && m.toggleMute());
		}
		function an() {
			let e = F.value;
			e && e.playbackRate !== m.rate && m.setRate(e.playbackRate), m.setMediaPositionState();
		}
		function on() {
			m.setMediaPositionState();
		}
		function sn() {
			m.setMediaPositionState();
		}
		function cn(e) {
			let t = F.value;
			t && m.duration > 0 && (t.currentTime = Math.min(m.duration, Math.max(0, e)));
		}
		function ln(e) {
			cn(m.position + e);
		}
		function un() {
			ee.value = !0, Dn();
		}
		function dn() {
			ee.value = !1, Dn();
		}
		function fn(e) {
			let t = M.reduce((e, t, n) => Math.abs(t - m.rate) < Math.abs(M[e] - m.rate) ? n : e, 0), n = M[Math.min(M.length - 1, Math.max(0, t + e))];
			m.setRate(n);
		}
		function pn() {
			if (!d.markers) return;
			let e = m.position, t = d.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && cn(t.startMs / 1e3);
		}
		function mn() {
			if (!d.markers) return;
			let e = m.position, t = d.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && cn(t.startMs / 1e3);
		}
		function hn() {
			ie.value?.toggleOpen();
		}
		let gn = null;
		function _n() {
			let e = F.value;
			if (!e) {
				m.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), m.pause();
				return;
			}
			gn !== null && (clearInterval(gn), gn = null);
			let t = .05;
			gn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(gn), gn = null, e.volume = 0, e.pause(), m.pause());
			}, 50);
		}
		Ws({
			playPause: Yt,
			seekBy: ln,
			frameStep: (e) => {
				m.playing || cn(m.position + e / 30);
			},
			volumeBy: (e) => m.setVolume(m.volume + e),
			toggleMute: vn,
			toggleFullscreen: bn,
			toggleCaptions: Rt,
			toggleTheater: yn,
			togglePip: Sn,
			skipIntro: pn,
			skipOutro: mn,
			sleepTimer: hn,
			seekToPercent: (e) => cn(e * m.duration),
			speedStep: fn,
			toggleHelp: () => {
				V.value = !V.value;
			},
			toggleQuality: () => {
				U.value ? (oe.value = !oe.value, ae.value?.toggleMenu?.()) : se.show({
					message: b("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !V.value && !_t.value && !Ct.value });
		function vn() {
			m.toggleMute();
		}
		function yn() {
			H.value = !H.value, p("theater", H.value);
		}
		N(() => m.muted, (e) => {
			let t = F.value;
			t && t.muted !== e && (t.muted = e);
		}), N(() => m.volume, (e) => {
			let t = F.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), N(() => m.rate, (e) => {
			let t = F.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), N(() => m.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Qe(e.value) : e.type === "seekBy" && Qe(m.position + e.value));
		});
		function bn() {
			if (typeof document > "u") return;
			let e = I.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function xn() {
			B.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Sn() {
			let e = F.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			p("pip");
		}
		function Cn() {
			te.value = !0;
		}
		function wn() {
			te.value = !1;
		}
		function Tn() {
			Ht &&= (clearTimeout(Ht), void 0);
		}
		function En() {
			Tn(), !(!m.playing || ee.value) && (Ht = setTimeout(() => {
				m.playing && !ee.value && (z.value = !1);
			}, d.idleTimeout ?? 3e3));
		}
		function Dn() {
			z.value = !0, En();
		}
		let On = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", kn = "data-phlix-prev-tabindex", An = "__phlix_no_tabindex__";
		function jn(e) {
			let t = I.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(On) ? [n] : Array.from(n.querySelectorAll(On));
				for (let n of t) if (e) {
					let e = n.getAttribute(kn);
					e === null || e === An ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(kn);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(kn, n.getAttribute("tabindex") ?? An), n.setAttribute("tabindex", "-1"));
			}
		}
		N(z, (e) => {
			typeof document > "u" || (jn(e), !e && document.activeElement instanceof HTMLElement && I.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), N(() => m.playing, (e) => {
			e ? (Me.value = !1, at(), En()) : (Tn(), z.value = !0);
		});
		let Mn = null;
		y(() => {
			m.setCurrent(d.media, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), T.hydrate(d.media), typeof document < "u" && (document.addEventListener("fullscreenchange", xn), re.value = document.pictureInPictureEnabled === !0), Mn = m.bindMediaSession({
				onPlay: () => void F.value?.play()?.catch(() => {}),
				onPause: () => F.value?.pause(),
				onSeek: (e) => cn(e)
			}), Vt = F.value?.textTracks ?? null, Vt?.addEventListener?.("addtrack", Lt), Vt?.addEventListener?.("removetrack", Lt), Lt(), U.value && Ee(), be(d.media.id);
		}), N(() => d.media, (e) => {
			m.setCurrent(e, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), Ze();
		}), N(() => d.media?.id, () => {
			T.hydrate(d.media);
		}), N(() => w.currentSession, (e) => {
			e && (e.state === "playing" ? (F.value?.play(), m.play()) : e.state === "paused" && (F.value?.pause(), m.pause()), w.updateLocalPosition(m.position), Math.abs(w.driftAmount) > 2 && Qe(e.playbackPosition));
		});
		let Nn = null;
		return N(() => w.pendingPlayMedia, async (e) => {
			if (!e) return;
			let t = null;
			if (d.resolvePendingMedia) {
				try {
					t = await d.resolvePendingMedia({
						mediaId: e.mediaId,
						title: e.title
					});
				} catch {
					t = null;
				}
				if (w.pendingPlayMedia !== e) return;
			}
			if (t) {
				m.setCurrent(t, {
					resetPosition: !0,
					streamUrl: d.streamUrlFor?.(t) ?? ""
				}), F.value?.play(), m.play(), w.consumePendingPlayMedia(), Nn = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			Nn !== n && (Nn = n, p("pending-media", e.mediaId, e.title));
		}), v(() => {
			W?.reportFinal?.(), Tn(), tt(), G.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", xn), Mn?.(), Vt?.removeEventListener?.("addtrack", Lt), Vt?.removeEventListener?.("removetrack", Lt), gn !== null && (clearInterval(gn), gn = null), ye !== null && (clearTimeout(ye), ye = null), pt();
		}), (n, r) => (x(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: g(["player", {
				"is-chrome-hidden": !z.value,
				"is-theater": H.value
			}]),
			onPointermove: Dn,
			onPointerdown: Dn,
			onFocusin: Dn
		}, [u(bu, {
			video: F.value,
			enabled: O(_).atmosphere,
			playing: O(m).playing,
			"reduced-motion": O(_).effectiveReducedMotion,
			intensity: de.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), s("div", zp, [
			s("video", {
				ref_key: "videoRef",
				ref: F,
				class: "player__video",
				src: Se.value,
				poster: O(c)(t.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Qt,
				onPause: $t,
				onTimeupdate: en,
				onLoadedmetadata: tn,
				onCanplay: Kt,
				onProgress: nn,
				onVolumechange: rn,
				onRatechange: an,
				onSeeked: on,
				onDurationchange: sn,
				onEnded: rt,
				onError: ot,
				onEnterpictureinpicture: Cn,
				onLeavepictureinpicture: wn,
				onClick: Yt
			}, [(x(!0), o(e, null, C(Tt.value, (e) => (x(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Vp))), 128))], 40, Bp),
			r[22] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[23] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", Hp, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": O(b)("player.back"),
				onClick: r[0] ||= L((e) => p("back"), ["stop"])
			}, [u(J, { name: "arrow-left" })], 8, Up), s("div", Wp, [
				s("p", Gp, E(O(b)("player.nowPlaying")), 1),
				s("h2", Kp, E(t.media.name), 1),
				s("div", qp, [(x(!0), o(e, null, C(Ut.value, (t, n) => (x(), o(e, { key: n }, [n > 0 && !t.cert ? (x(), o("span", Jp, "·")) : a("", !0), s("span", { class: g({ player__cert: t.cert }) }, E(t.text), 3)], 64))), 128))])
			])]),
			Ce.value ? a("", !0) : (x(), o("div", Yp, [
				z.value ? (x(), o("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": O(b)("player.seekBackward"),
					onClick: r[1] ||= L((e) => ln(-10), ["stop"])
				}, [u(J, { name: "rewind" }), s("span", { class: "player__center-skip-count" }, E(10))], 8, Xp)) : a("", !0),
				s("button", {
					type: "button",
					class: g(["player__bigplay", { "is-playing": O(m).playing }]),
					"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
					onClick: L(Yt, ["stop"])
				}, [u(J, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Zp),
				z.value ? (x(), o("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": O(b)("player.seekForward"),
					onClick: r[2] ||= L((e) => ln(10), ["stop"])
				}, [u(J, { name: "forward" }), s("span", { class: "player__center-skip-count" }, E(10))], 8, Qp)) : a("", !0)
			])),
			u(Jc, {
				video: F.value,
				language: O(m).subtitleLang,
				"style-config": O(_).captionStyle,
				lifted: z.value,
				"controls-root": R.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Ce.value ? a("", !0) : (x(), o("div", {
				key: 1,
				ref_key: "controlsRef",
				ref: R,
				class: "player__controls",
				onClick: r[9] ||= L(() => {}, ["stop"])
			}, [
				u(Go, {
					position: O(m).position,
					duration: O(m).duration,
					buffered: O(m).buffered,
					chapters: t.chapters,
					"thumbnail-at": xe.value,
					onSeek: cn,
					onScrubStart: un,
					onScrubEnd: dn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				O(_).showMarkerTimeline && t.markers && t.markers.length > 0 ? (x(), i(Qd, {
					key: 0,
					position: O(m).position,
					duration: O(m).duration,
					markers: t.markers,
					onSeek: cn,
					onSimilar: Ue
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", $p, [
					t.prevEpisode ? (x(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.previousEpisode"),
						onClick: qt
					}, [u(J, { name: "skip-back" })], 8, em)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
						onClick: Yt
					}, [u(J, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 8, tm),
					t.nextEpisode ? (x(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.nextEpisode"),
						onClick: Jt
					}, [u(J, { name: "skip-forward" })], 8, nm)) : a("", !0),
					s("span", rm, [
						l(E(O(Eo)(O(m).position)), 1),
						r[18] ||= s("span", { class: "player__sep" }, " / ", -1),
						l(E(O(Eo)(O(m).duration)), 1)
					]),
					r[19] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__favorite", { "is-on": D.value }]),
						"aria-label": D.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": D.value ? "true" : "false",
						onClick: A
					}, [u(J, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, im),
					u(To, {
						level: k.value,
						onCycle: j
					}, null, 8, ["level"]),
					u(rc),
					u(fc),
					u(Cc, {
						ref_key: "qualityMenuRef",
						ref: ae,
						open: oe.value,
						"onUpdate:open": r[3] ||= (e) => oe.value = e,
						levels: O(G).levels.value,
						variants: O(G).variants.value,
						"current-level": O(G).currentLevel.value,
						"auto-enabled": O(G).autoEnabled.value,
						"active-height": O(G).activeLevelHeight.value,
						onSelect: De
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					U.value ? a("", !0) : (x(), o("span", {
						key: 2,
						class: "player__direct-badge",
						title: O(b)("player.qualityDirectStream")
					}, E(O(b)("player.directStream")), 9, am)),
					u(Cl, {
						open: _t.value,
						"onUpdate:open": r[4] ||= (e) => _t.value = e,
						tracks: mt.value,
						"audio-tracks": xt.value,
						"active-audio": St.value,
						onSelectAudio: Bt,
						onAddSubtitles: r[5] ||= (e) => Et.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					u(Wd, {
						open: Ct.value,
						"onUpdate:open": r[6] ||= (e) => Ct.value = e,
						chapters: t.chapters ?? [],
						onSeek: cn
					}, null, 8, ["open", "chapters"]),
					u(rf, {
						ref_key: "sleepTimerRef",
						ref: ie,
						"on-expire": _n
					}, null, 512),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__syncplay", { "is-on": O(w).isInRoom }]),
						"aria-label": O(w).isInRoom ? O(b)("syncplay.inRoom") : O(b)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[7] ||= (e) => ce.value = !0
					}, [u(J, { name: "user" })], 10, om),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[8] ||= (e) => V.value = !0
					}, [u(J, { name: "info" })], 8, sm),
					re.value ? (x(), o("button", {
						key: 3,
						type: "button",
						class: g(["player__iconbtn", { "is-on": te.value }]),
						"aria-label": te.value ? O(b)("player.exitPip") : O(b)("player.pip"),
						"aria-pressed": te.value,
						onClick: Sn
					}, [u(J, { name: "pip" })], 10, cm)) : a("", !0),
					s("button", {
						type: "button",
						class: g(["player__iconbtn", { "is-on": H.value }]),
						"aria-label": H.value ? O(b)("player.exitTheater") : O(b)("player.theater"),
						"aria-pressed": H.value,
						onClick: yn
					}, [u(J, { name: "theater" })], 10, lm),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": B.value ? O(b)("player.exitFullscreen") : O(b)("player.fullscreen"),
						onClick: bn
					}, [u(J, { name: B.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, um)
				])
			], 512)),
			Ce.value ? a("", !0) : (x(), i(Td, {
				key: 2,
				position: O(m).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: cn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Ce.value ? a("", !0) : (x(), i(jd, {
				key: 3,
				position: O(m).position,
				markers: t.markers,
				onSkip: cn
			}, null, 8, ["position", "markers"])),
			Me.value && !Ce.value ? (x(), i(Tu, {
				key: 4,
				seconds: je.value,
				onResume: $e,
				onRestart: et
			}, null, 8, ["seconds"])) : a("", !0),
			Pe.value && Xe.value && !Ce.value ? (x(), i(pd, {
				key: 5,
				media: Xe.value,
				remaining: Fe.value,
				total: O(8),
				counting: O(_).autoplay,
				onPlayNow: it,
				onCancel: at
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			u(kl, {
				modelValue: ze.value,
				"onUpdate:modelValue": r[10] ||= (e) => ze.value = e,
				title: `Similar ${Le.value ?? "marker"}s`,
				size: "lg",
				onClose: Ye
			}, {
				default: P(() => [s("div", dm, [Ve.value ? (x(), o("div", fm, [u(zl, { label: "Finding similar media" })])) : He.value ? (x(), o("div", pm, [u(J, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", mm, E(He.value), 1)])) : !Ve.value && Be.value.length === 0 ? (x(), o("div", hm, [
					u(J, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[20] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[21] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (x(), o("ul", gm, [(x(!0), o(e, null, C(Be.value, (e) => (x(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", _m, [e.poster_url ? (x(), o("img", {
					key: 0,
					src: O(c)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, vm)) : (x(), o("div", ym, [u(J, { name: "film" })]))]), s("div", bm, [s("p", xm, E(e.name), 1), e.year ? (x(), o("p", Sm, [l(E(e.year) + " ", 1), e.runtime ? (x(), o("span", Cm, " · " + E(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			we.value ? (x(), i(wd, {
				key: 6,
				title: t.media.name,
				progress: O(G).progress.value,
				onBack: r[11] ||= (e) => p("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			Te.value ? (x(), i(vd, {
				key: 7,
				title: t.media.name,
				onBack: r[12] ||= (e) => p("back")
			}, null, 8, ["title"])) : a("", !0),
			O(w).isInRoom ? (x(), i(Ip, {
				key: 8,
				position: O(m).position,
				duration: O(m).duration,
				"is-playing": O(m).playing,
				onSeek: cn,
				onPlay: r[13] ||= (e) => void F.value?.play(),
				onPause: r[14] ||= (e) => void F.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			O(w).isInRoom ? (x(), i(op, { key: 9 })) : a("", !0),
			u(Ep, {
				modelValue: ce.value,
				"onUpdate:modelValue": r[15] ||= (e) => ce.value = e,
				onJoined: le
			}, null, 8, ["modelValue"]),
			u($s, {
				open: V.value,
				onClose: r[16] ||= (e) => V.value = !1
			}, null, 8, ["open"]),
			u(lu, {
				open: Et.value,
				"onUpdate:open": r[17] ||= (e) => Et.value = e,
				"media-id": t.media.id,
				"api-base": t.apiBase ?? "",
				"preferred-langs": Ot.value,
				onAdded: kt
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-5b943e9d"]]), Tm = ["aria-label"], Em = ["src", "poster"], Dm = { class: "mini__body" }, Om = { class: "mini__title" }, km = { class: "mini__controls" }, Am = ["aria-label"], jm = ["aria-label", "aria-pressed"], Mm = ["aria-label"], Nm = ["aria-label"], Pm = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Fm = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let { imgSrc: c } = nd(), l = t, d = ue(), { t: p } = X(), m = S(null), h = S(null), b = f("resumeReporter", null), C = !1, w = Zt(), T = f("phlixConfig", null), D = r(() => d.current ? w.isFavorite(d.current.id) : !1);
		function k() {
			let e = d.current?.id;
			e && w.toggleFavorite(e, T?.apiBase ?? "");
		}
		let A = r(() => d.miniPlayer && !!d.current && (!!d.streamUrl || !!d.hlsMasterUrl)), j = r(() => d.current?.name ?? ""), M = r(() => Math.max(0, Math.min(1, d.progress)));
		function F() {
			let e = m.value;
			e && (e.volume = d.volume, e.muted = d.muted, e.playbackRate = d.rate, d.position > 0 && (!e.duration || d.position < e.duration) && (e.currentTime = d.position), d.playing && e.play()?.catch(() => {}));
		}
		function I() {
			d.play();
		}
		function L() {
			d.pause();
		}
		function R() {
			let e = m.value;
			e && d.updateProgress(e.currentTime, e.duration);
		}
		function z() {
			C || (C = !0, b?.finish());
		}
		function B() {
			let e = m.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function ee() {
			d.current && l("expand", d.current.id);
		}
		function V() {
			b?.reportFinal?.(), d.closePlayer();
		}
		let H = 0;
		async function te() {
			let e = m.value;
			if (!e || !d.hlsMasterUrl) return;
			let t = ++H, n = d.hlsMasterUrl;
			h.value?.destroy(), h.value = null;
			let r = await es(e, n, {
				startPosition: d.position,
				onReady: () => {
					let e = m.value;
					e && (e.volume = d.volume, e.muted = d.muted, e.playbackRate = d.rate, d.playing && e.play()?.catch(() => {}));
				}
			});
			if (t !== H || !A.value || d.hlsMasterUrl !== n) {
				r.destroy();
				return;
			}
			h.value = r;
		}
		return N(() => A.value, async (e) => {
			if (!e) {
				h.value?.destroy(), h.value = null;
				return;
			}
			!d.hlsMasterUrl || d.streamUrl || await te();
		}, { flush: "post" }), y(async () => {
			A.value && d.hlsMasterUrl && !d.streamUrl && await te();
		}), N(() => d.current?.id, () => {
			C = !1;
		}), N(() => d.playing, (e) => {
			let t = m.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), N(() => d.lastCommand, (e) => {
			let t = m.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : d.position + e.value, r = t.duration && t.duration > 0 ? t.duration : d.duration, i = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = i, d.updateProgress(i, t.duration || void 0);
		}), v(() => {
			b?.reportFinal?.(), H++, h.value?.destroy(), h.value = null, m.value?.pause?.();
		}), (e, t) => (x(), i(n, { name: "mini" }, {
			default: P(() => [A.value ? (x(), o("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": O(p)("player.miniPlayer")
			}, [
				s("video", {
					ref_key: "videoRef",
					ref: m,
					class: "mini__video",
					src: O(d).hlsMasterUrl ? "" : O(d).streamUrl,
					poster: O(c)(O(d).current?.poster_url) ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: F,
					onPlay: I,
					onPause: L,
					onTimeupdate: R,
					onEnded: z,
					onClick: ee
				}, null, 40, Em),
				s("div", Dm, [s("p", Om, E(j.value), 1), s("div", km, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(d).playing ? O(p)("player.pause") : O(p)("player.play"),
						onClick: B
					}, [u(J, { name: O(d).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Am),
					O(d).current ? (x(), o("button", {
						key: 0,
						type: "button",
						class: g(["mini__btn mini__btn--favorite", { "is-on": D.value }]),
						"aria-label": D.value ? O(p)("itemActions.removeFavorite") : O(p)("itemActions.addFavorite"),
						"aria-pressed": D.value ? "true" : "false",
						onClick: k
					}, [u(J, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, jm)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(p)("player.expand"),
						onClick: ee
					}, [u(J, { name: "expand" })], 8, Mm),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": O(p)("player.closePlayer"),
						onClick: V
					}, [u(J, { name: "x" })], 8, Nm)
				])]),
				s("div", Pm, [s("div", {
					class: "mini__progress-fill",
					style: _({ transform: `scaleX(${M.value})` })
				}, null, 4)])
			], 8, Tm)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-6721ee35"]]);
//#endregion
export { du as AMBIENT_SAMPLE_H, fu as AMBIENT_SAMPLE_INTERVAL_MS, uu as AMBIENT_SAMPLE_W, zs as ARROW_ICONS, Bs as ARROW_LABELS, bu as AmbientCanvas, Uc as CAPTION_BACKGROUND_OPTIONS, Hc as CAPTION_COLOR_OPTIONS, Wc as CAPTION_EDGE_OPTIONS, Vc as CAPTION_SIZE_OPTIONS, Bc as CAPTION_SIZE_SCALE, Jc as CaptionOverlay, Cl as CaptionsMenu, Eu as DIRECT_PLAY_EXTENSIONS, Fm as MiniPlayer, Rs as PLAYER_SHORTCUTS, wm as Player, Cc as QualityMenu, ie as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, Tu as ResumePrompt, Go as Scrubber, $s as ShortcutsHelp, Td as SkipButton, fc as SpeedMenu, lu as SubtitleSearch, Du as TRANSCODE_EXTENSIONS, vd as TranscodeNotice, wd as TranscodePreparing, Lu as UPNEXT_COUNTDOWN_SECONDS, zu as UPNEXT_RING_CIRCUMFERENCE, Ru as UPNEXT_RING_RADIUS, pd as UpNext, rc as VolumeControl, Pc as activeAudioIndex, vu as ambientGradient, Nc as applyAudioTrack, Mc as applyTrackModes, es as attachHls, mu as averageRegion, qc as captionStyleVars, Rc as cleanCueText, Kc as edgeShadow, ku as extensionOf, Eo as formatTime, Us as handleShortcut, jc as hasActiveCaptions, yu as isBatterySaving, vs as isFailedStatus, ju as isFatalMediaError, Xo as isNativeHlsSupported, _s as isPlayable, Hs as isTypingTarget, kc as listAudioTracks, Oc as listSubtitleTracks, Au as needsTranscode, as as parseSubtitleTracks, hs as parseTranscodeStart, gs as parseTranscodeStatus, zc as readActiveCueLines, ys as resolveStreamUrl, Ac as resolveTextTrack, gu as rgbString, _u as rgbaString, Bu as ringDashoffset, hu as sampleAmbient, ss as transcodeStartPath, ms as transcodeStatusPath, bs as useHlsTranscode, Ws as useKeyboardShortcuts, ue as usePlayerStore };

//# sourceMappingURL=player.js.map