import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createStaticVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, inject as f, markRaw as p, mergeModels as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, onScopeDispose as b, openBlock as x, ref as S, renderList as C, renderSlot as w, resolveDynamicComponent as T, toDisplayString as E, toRef as D, unref as O, useId as k, useModel as A, vModelDynamic as j, vModelText as M, vShow as N, watch as P, withCtx as F, withDirectives as I, withKeys as L, withModifiers as R } from "vue";
import { defineStore as z } from "pinia";
//#region src/stores/usePreferencesStore.ts
var B = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, V = {
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
	captionStyle: { ...B },
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
function H(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var U = "phlix.prefs";
function ee() {
	if (typeof localStorage > "u") return { ...V };
	try {
		let e = localStorage.getItem(U);
		if (!e) return { ...V };
		let t = JSON.parse(e);
		return {
			...V,
			...t
		};
	} catch {
		return { ...V };
	}
}
function te() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var ne = z("phlix-prefs", () => {
	let e = ee(), t = S(e.theme), n = S(e.accent), i = S(e.density), a = S(e.cardSize), o = S(e.gridDensity), s = S(e.viewMode), c = S(e.reducedMotion), l = S(e.autoplay), u = S(e.defaultVolume), d = S(e.defaultQuality), f = S(e.defaultSubtitleLang), p = S(e.defaultAudioLang), m = S(e.subtitlePreferenceSet), h = S({
		...B,
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
			id: H(e),
			name: e.trim(),
			query: t
		}, r = v.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? v.value.splice(r, 1, n) : v.value.push(n), n;
	}
	function M(e) {
		v.value = v.value.filter((t) => t.id !== e);
	}
	let N = null;
	function F() {
		N !== null && (clearTimeout(N), N = null);
		let e = A();
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(U, JSON.stringify(e));
		} catch {}
	}
	P(A, (e) => {
		N !== null && clearTimeout(N), N = setTimeout(() => {
			N = null;
			try {
				localStorage.setItem(U, JSON.stringify(e));
			} catch {}
		}, 250);
	}, { deep: !0 }), typeof window < "u" && window.addEventListener("pagehide", F), b(() => {
		N !== null && (clearTimeout(N), N = null), typeof window < "u" && window.removeEventListener("pagehide", F);
	});
	function I() {
		let e = V;
		t.value = e.theme, n.value = e.accent, i.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.viewMode, c.value = e.reducedMotion, l.value = e.autoplay, u.value = e.defaultVolume, d.value = e.defaultQuality, f.value = e.defaultSubtitleLang, p.value = e.defaultAudioLang, m.value = e.subtitlePreferenceSet, h.value = { ...B }, g.value = e.atmosphere, _.value = e.tv, v.value = [...e.filterPresets], y.value = e.showMarkerTimeline, x.value = e.crossfadeDuration, C.value = e.crossfadeFadeIn, w.value = e.crossfadeFadeOut, T.value = e.gaplessEnabled, E.value = e.preferredAudioQuality;
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
var ue = z("phlix-player", () => {
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
		t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (o.value = 0, s.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, c.value = 0), fe(e);
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
	function V() {
		u.value = !u.value;
	}
	function H(e) {
		d.value = e;
	}
	function U(e) {
		f.value = e;
	}
	function ee(e) {
		p.value = e;
	}
	function te(e) {
		i.value = [...e];
	}
	function re(e) {
		i.value.push(e);
	}
	function ie(e) {
		let t = i.value.shift() ?? null;
		return t && N(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function ue() {
		h.value = !0;
	}
	function W() {
		h.value = !1;
	}
	function de() {
		t.value && k(t.value.id, o.value, s.value), D(!0), a.value = !1, h.value = !1, t.value = null, n.value = "", m.value = "";
	}
	function fe(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function pe() {
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
	function me(e) {
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
	function he() {
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
		toggleMute: V,
		setRate: H,
		setQuality: U,
		setSubtitle: ee,
		setQueue: te,
		enqueue: re,
		next: ie,
		showMiniPlayer: ue,
		hideMiniPlayer: W,
		closePlayer: de,
		setMediaSessionMetadata: fe,
		setMediaPositionState: pe,
		bindMediaSession: me,
		seedFromPreferences: he
	};
}), W = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, de = class extends Error {
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
var G = {
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
}, ge = /* @__PURE__ */ "auth.hub.claim.server.proxy.quota.stream.access.gateway.relay.mcp.mcp_token.alexa.tls.csrf.user.plugin.library.metadata.poster.profile.dlna.casting.quickconnect.common.federation.share.invite.request.admin.updates.identity.provider.oauth.ldap.syncplay.legacy".split("."), K = Object.values(G.auth), _e = Object.values(G.hub), ve = Object.values(G.claim), ye = Object.values(G.server), be = Object.values(G.proxy), xe = Object.values(G.quota), Se = Object.values(G.stream), Ce = Object.values(G.access), we = Object.values(G.gateway), Te = Object.values(G.relay), Ee = Object.values(G.mcp), De = Object.values(G.mcp_token), Oe = Object.values(G.alexa), ke = Object.values(G.tls), Ae = Object.values(G.csrf), je = Object.values(G.user), Me = Object.values(G.plugin), Ne = Object.values(G.library), Pe = Object.values(G.metadata), Fe = Object.values(G.poster), Ie = Object.values(G.profile), Le = Object.values(G.dlna), Re = Object.values(G.casting), ze = Object.values(G.quickconnect), Be = Object.values(G.common), Ve = Object.values(G.federation), He = Object.values(G.share), Ue = Object.values(G.invite), We = Object.values(G.request), Ge = Object.values(G.admin), Ke = Object.values(G.updates), qe = Object.values(G.identity), Je = Object.values(G.provider), Ye = Object.values(G.oauth), Xe = Object.values(G.ldap), Ze = Object.values(G.syncplay), Qe = Object.values(G.legacy), $e = {
	auth: K,
	hub: _e,
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
	"quota.exceeded": "You have reached a quota limit for this account or server.",
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
	"quota.exceeded": "Has alcanzado el límite de cuota de esta cuenta o servidor.",
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
	"quota.exceeded": "Vous avez atteint la limite de quota de ce compte ou de ce serveur.",
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
	"auth.required": "Bitte melde dich an, um fortzufahren.",
	"auth.not_admin": "Diese Aktion erfordert ein Administratorkonto.",
	"auth.invalid_token": "Dein Anmelde-Token ist ungültig oder abgelaufen.",
	"auth.user_not_found": "Dieses Konto gibt es nicht mehr.",
	"auth.signups_disabled": "Die Registrierung neuer Konten ist auf diesem Server deaktiviert.",
	"auth.account_pending": "Dein Konto wartet noch auf Genehmigung.",
	"auth.account_disabled": "Dieses Konto wurde deaktiviert.",
	"auth.password_change_required": "Du musst dein Passwort ändern, bevor du fortfährst.",
	"auth.unauthenticated": "Bitte melde dich an, bevor du diesen Server registrierst.",
	"auth.enrollment_expired": "Das Registrierungs-Token dieses Servers ist abgelaufen. Registriere ihn erneut am Hub.",
	"auth.server_mismatch": "Das Registrierungs-Token passt nicht zu diesem Server.",
	"auth.missing_credentials": "Gib deine Zugangsdaten ein, um dieses Konto zu verknüpfen.",
	"auth.invalid_credentials": "Die eingegebenen Zugangsdaten sind nicht korrekt.",
	"hub.not_enrolled": "Dieser Server ist beim Hub noch nicht registriert.",
	"hub.token_required": "Für diese Aktion ist ein Hub-Zugriffstoken erforderlich.",
	"hub.jwt_invalid": "Das Hub-Token ist ungültig oder abgelaufen.",
	"hub.protocol_unsupported": "Die Anfrage hat das vom Hub unterstützte Protokoll nicht verwendet.",
	"hub.internal_error": "Der Hub hat einen unerwarteten Fehler entdeckt. Versuche es gleich erneut.",
	"claim.code_not_found": "Dieser Registrierungscode wurde nicht gefunden. Prüfe ihn und versuche es erneut.",
	"claim.code_expired": "Dieser Registrierungscode ist abgelaufen. Erzeuge einen neuen und versuche es erneut.",
	"claim.code_already_claimed": "Dieser Registrierungscode wurde bereits verwendet.",
	"server.not_found": "Dieser Server wurde nicht gefunden.",
	"server.not_owned": "Dieser Server gehört nicht zu deinem Konto.",
	"server.relay_unavailable": "Dieser Server ist online, aber sein sicherer Relay-Tunnel ist noch nicht verbunden; seine Bibliotheken können daher nicht über den Hub geladen werden. Die Verbindung sollte automatisch wiederhergestellt werden — versuche es gleich erneut.",
	"server.offline": "Dieser Server ist offline, seine Bibliotheken können daher nicht geladen werden. Nach der Wiederverbindung mit dem Hub ist er wieder durchstöberbar.",
	"server.no_tunnel": "Dieser Server ist online, aber sein sicherer Relay-Tunnel ist noch nicht verbunden; seine Bibliotheken können daher nicht über den Hub geladen werden. Die Verbindung sollte automatisch wiederhergestellt werden — versuche es gleich erneut.",
	"server.key_invalid": "Der Signaturschlüssel des Servers hat die Prüfung beim Registrieren nicht bestanden. Versuche es erneut.",
	"proxy.scope_denied": "Dein Zugriffstoken hat nicht die erforderliche Berechtigung für diese Anfrage.",
	"quota.exceeded": "Du hast das Kontingentlimit dieses Kontos oder Servers erreicht.",
	"stream.limit": "Du hast die höchste zulässige Anzahl gleichzeitiger Wiedergaben erreicht.",
	"stream.limit_exceeded": "Du hast das Limit gleichzeitiger Streams auf diesem Server erreicht. Beende einen und versuche es erneut.",
	"access.scheduled": "Dieses Profil ist nur innerhalb seines geplanten Zeitfensters verfügbar. Versuche es später erneut.",
	"gateway.timeout": "Das Hub-Gateway hat beim Warten auf deinen Server eine Zeitüberschreitung erreicht. Versuche es erneut.",
	"relay.client_ws_endpoint": "Dieser Endpunkt ist ein Client-WebSocket-Mount — er lässt sich nicht mit einer einfachen Anfrage öffnen.",
	"relay.ws_http_endpoint": "Dieser Endpunkt ist ein Relay-WebSocket-Mount — er lässt sich nicht mit einer einfachen Anfrage öffnen.",
	"relay.encode_error": "Das Relay konnte die Nachricht nicht kodieren. Versuche es erneut.",
	"mcp.unknown_tool": "Dieses MCP-Werkzeug existiert nicht.",
	"mcp.scope_denied": "Dein MCP-Token erlaubt dieses Werkzeug nicht.",
	"mcp.streaming_unsupported": "Streaming-Antworten werden von dieser MCP-Oberfläche nicht unterstützt.",
	"mcp.sse_not_acceptable": "Diese MCP-Anfrage muss eine Server-Sent-Events-Antwort akzeptieren.",
	"mcp.unsupported_protocol_version": "Diese Version des MCP-Protokolls wird nicht unterstützt.",
	"mcp_token.no_valid_scopes": "Keiner der angeforderten Token-Berechtigungen ist gültig.",
	"mcp_token.not_found": "Dieses MCP-Zugriffstoken gibt es nicht mehr.",
	"alexa.streaming_unsupported": "Streaming wird über den Alexa-Adapter nicht unterstützt.",
	"alexa.malformed_envelope": "Der Anfrageumschlag von Alexa war fehlerhaft aufgebaut.",
	"alexa.verification_error": "Die Alexa-Anfrage konnte nicht überprüft werden. Versuche es erneut.",
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
	"alexa.timestamp_stale": "Der Zeitstempel der Alexa-Anfrage war zu alt. Prüfe die Serveruhr.",
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
	"metadata.tmdb_unreachable": "Der Metadaten-Anbieter ist nicht erreichbar. Versuche es später erneut.",
	"metadata.no_query": "Gib einen Titel ein, um den Metadaten-Anbieter zu durchsuchen.",
	"metadata.bad_tmdb_id": "Diese TMDB-Kennung ist nicht gültig.",
	"metadata.no_match": "Für diesen Titel wurden keine Metadaten gefunden.",
	"poster.missing_url": "Eine Poster-Bild-URL ist erforderlich.",
	"poster.poster_not_candidate": "Dieses Bild ist kein verfügbares Poster-Kandidat für diesen Titel.",
	"profile.use_switch": "Um das aktive Profil zu wechseln, nutze stattdessen die Profilumschaltung.",
	"profile.last_profile": "Dies ist dein letztes Profil, es kann daher nicht gelöscht werden.",
	"profile.no_pin": "Für dieses Profil ist keine PIN eingerichtet, die geprüft werden könnte.",
	"profile.pin_mismatch": "Diese PIN ist nicht korrekt.",
	"profile.not_found": "Dieses Profil existiert nicht mehr. Wähle ein anderes aus.",
	"dlna.forbidden": "Dieses Gerät darf DLNA auf diesem Server nicht verwenden.",
	"casting.disabled": "Casting ist auf diesem Server deaktiviert.",
	unauthorized: "Du bist nicht berechtigt, die Kopplung auf diesem Server zu verwalten.",
	invalid_secret: "Das Kopplungsgeheimnis ist ungültig. Starte die Kopplung erneut.",
	pairing_not_pending: "Es wartet keine Kopplungsanfrage auf ihre Genehmigung.",
	consent_required: "Dieses Gerät muss die Zustimmung annehmen, damit die Kopplung fortfahren kann.",
	pairing_not_found: "Diese Kopplungsanfrage gibt es nicht mehr.",
	storage_unavailable: "Der Kopplungsspeicher ist zurzeit nicht verfügbar. Versuche es später erneut.",
	rate_limited: "Zu viele Anfragen — warte einen Moment und versuche es erneut.",
	provider_unavailable: "Der Authentifizierungsanbieter ist nicht verfügbar. Versuche es später erneut.",
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
	cannot_delete_self: "Du kannst dein eigenes Konto hier nicht löschen.",
	last_admin: "Dies ist das letzte Administratorkonto, es kann auf diesem Weg nicht geändert werden.",
	cannot_demote_self: "Du kannst dir die Administratorrolle nicht selbst entziehen.",
	invalid_quota: "Der Kontingentwert ist ungültig.",
	invalid_throttle: "Der Drosselungswert ist ungültig.",
	update_check_dispatch_failed: "Die Update-Prüfung konnte nicht gestartet werden. Versuche es erneut.",
	"identity.missing_id": "Für diese Aktion wurde keine verknüpfte Identität ausgewählt.",
	"identity.not_found": "Diese verknüpfte Identität wurde nicht gefunden.",
	"identity.last_sign_in_method": "Dies ist die einzige verbleibende Anmeldemethode deines Kontos; deshalb kann sie nicht getrennt werden.",
	"identity.already_linked": "Dieses Anbieterkonto ist bereits mit einem anderen Konto hier verknüpft.",
	"identity.invalid": "Der Anbieter hat keine nutzbare Konto-Identität zurückgegeben.",
	"identity.link_unavailable": "Die Kontoverknüpfung ist auf diesem Server vorübergehend nicht verfügbar.",
	"identity.invalid_link_state": "Die Verknüpfungsanfrage ist vor dem Abschluss abgelaufen. Beginne erneut.",
	"provider.not_configured": "Auf diesem Server ist noch kein Anmelde-Anbieter eingerichtet.",
	"provider.unknown": "Dieser Anmelde-Anbieter ist auf diesem Server nicht verfügbar.",
	"provider.not_found": "Dieser Anmelde-Anbieter wurde nicht gefunden.",
	"provider.invalid_type": "Dieser Anbieter kann für diese Art der Anmeldung nicht verwendet werden.",
	"provider.missing_client_id": "Die Client-ID des Anbieters ist erforderlich.",
	"provider.missing_url": "Die URL des Anbieters ist erforderlich.",
	"provider.invalid_url": "Die URL des Anbieters ist nicht gültig.",
	"oauth.missing_code": "Der Anmelde-Anbieter hat keinen Autorisierungscode zurückgegeben. Melde dich erneut an.",
	"oauth.missing_state": "Der Anmelde-Anbieter hat keinen State-Token zurückgegeben. Melde dich erneut an.",
	"oauth.invalid_state": "Der Anmeldeversuch passt nicht mehr zu diesem Browser oder ist abgelaufen. Versuche es erneut.",
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
	HANDLER_ERROR: "In der Synchronisationssitzung ist beim Verarbeiten deiner Anfrage ein interner Fehler aufgetreten.",
	NOT_AUTHENTICATED: "Melde dich bei der Synchronisationssitzung an, bevor du fortfährst.",
	NOT_IN_GROUP: "Du bist zurzeit in keiner Wiedergabegruppe.",
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
	"quota.exceeded": "Hai raggiunto il limite di quota per questo account o server.",
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
	"quota.exceeded": "Você atingiu o limite de cota desta conta ou deste servidor.",
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
	"quota.exceeded": "このアカウントまたはサーバーの割当量の上限に達しました。",
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
}, ct = {
	en: "Something went wrong.",
	es: "Algo salió mal.",
	fr: "Une erreur est survenue.",
	de: "Etwas ist schiefgelaufen.",
	it: "Qualcosa è andato storto.",
	pt_BR: "Algo deu errado.",
	ja: "問題が発生しました。"
}, lt = new Set(et);
function ut(e) {
	return typeof e == "string" && lt.has(e);
}
var dt = {
	en: tt,
	es: nt,
	fr: rt,
	de: it,
	it: at,
	pt_BR: ot,
	ja: st
};
function ft(e) {
	return typeof e == "string" && e in dt ? e : "en";
}
function pt(e, t, n) {
	if (ut(e)) {
		let n = dt[ft(t)][e];
		if (typeof n == "string" && n !== "") return n;
		let r = dt.en[e];
		if (typeof r == "string" && r !== "") return r;
	}
	return typeof n == "string" && n.trim() !== "" ? n : ct[ft(t)];
}
//#endregion
//#region src/api/tokenStore.ts
var mt = "access_token", ht = "refresh_token", gt = "user", _t = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(mt);
	}
	setAccessToken(e) {
		this.storage.setItem(mt, e);
	}
	getRefreshToken() {
		return this.storage.getItem(ht);
	}
	setRefreshToken(e) {
		this.storage.setItem(ht, e);
	}
	getUser() {
		let e = this.storage.getItem(gt);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(gt, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(mt), this.storage.removeItem(ht), this.storage.removeItem(gt);
	}
};
//#endregion
//#region src/api/client.ts
function vt() {
	return typeof window > "u" ? {
		getAccessToken: () => null,
		setAccessToken: () => {},
		getRefreshToken: () => null,
		setRefreshToken: () => {},
		getUser: () => null,
		setUser: () => {},
		clear: () => {}
	} : new _t();
}
var yt = 15e3, bt = {};
function xt(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r && (t[n] = r);
	return t;
}
function St(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
function q(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function Ct(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function wt(e) {
	let t = e && typeof e == "object" ? e : {}, n = q(t.name) ?? "Unknown Artist", r = Ct(t.album_count), i = Ct(t.track_count);
	return {
		id: n,
		name: n,
		imageUrl: q(t.image_url),
		albumCount: r ?? void 0,
		trackCount: i ?? void 0
	};
}
function Tt(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = q(n.title) ?? q(t.name) ?? q(t.title) ?? "Unknown Track";
	return {
		id: q(t.id) ?? "",
		title: r,
		durationSecs: Ct(n.duration_secs) ?? Ct(t.duration_secs) ?? 0,
		trackNumber: Ct(n.track_number) ?? Ct(t.track_number),
		streamUrl: q(t.stream_url)
	};
}
function Et(e) {
	let t = e && typeof e == "object" ? e : {}, n = q(t.name) ?? q(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [], i = Ct(t.track_count) ?? r.length;
	return {
		id: n,
		title: n,
		artist: q(t.artist),
		albumArtUrl: q(t.album_art_url),
		year: Ct(t.year),
		totalTracks: i,
		tracks: r.map(Tt),
		tracksTruncated: St(t.tracks_truncated)
	};
}
function Dt(e, t, n) {
	return {
		total: Ct(e.total) ?? t,
		limit: Ct(e.limit) ?? n.limit ?? 100,
		offset: Ct(e.offset) ?? n.offset ?? 0
	};
}
function Ot(e) {
	let t = {};
	return e.limit !== void 0 && (t.limit = String(e.limit)), e.offset !== void 0 && (t.offset = String(e.offset)), t;
}
function kt(e) {
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
function At(e) {
	if (typeof e != "object" || !e) return [];
	let t = e;
	return typeof t.id != "string" || t.id === "" ? [] : [{
		id: t.id,
		name: typeof t.name == "string" ? t.name : t.id,
		type: typeof t.type == "string" ? t.type : "movie"
	}];
}
function jt(e) {
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
		hearingImpaired: St(t.hearingImpaired ?? t.hearing_impaired),
		fps: a
	};
}
var Mt = /^(?:[a-z][a-z0-9_]*_[a-z0-9_]*|[A-Z][A-Z0-9_]*_[A-Z0-9_]*|[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+)$/;
function Nt(e) {
	return Mt.test(e);
}
function Pt(e) {
	if (e !== null && ut(e)) {
		let t = dt.en[e];
		if (typeof t == "string" && t !== "") return t;
	}
	return null;
}
var Ft = class {
	baseUrl;
	tokens;
	doFetch;
	timeoutMs;
	instanceHeaders;
	loginPath;
	refreshPromise = null;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? vt(), this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? yt, this.instanceHeaders = xt(e.headers ?? {}), this.loginPath = e.loginPath ?? "/login";
	}
	setBaseUrl(e) {
		this.baseUrl = e;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = {
				...bt,
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
			throw s ? new fe() : r?.aborted || e instanceof W ? e : e instanceof TypeError || me() ? new de() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new W(this.extractError(t), e.status, t);
		return t;
	}
	extractError(e) {
		if (e && typeof e == "object") {
			let t = e, n = typeof t.error == "string" && t.error !== "" ? t.error : null, r = typeof t.message == "string" && t.message !== "" ? t.message : null, i = typeof t.code == "string" ? t.code : null;
			if (n !== null && Nt(n)) {
				let e = Pt(i) ?? Pt(n);
				return e === null ? r ?? n : e;
			}
			if (r !== null) return r;
			if (n !== null) return n;
			let a = Pt(i);
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
		return new W(this.extractError(n), e.status, n);
	}
	async postFormData(e, t) {
		let n = {
			...bt,
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
			...bt,
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
		if (!t || typeof t != "object") throw new W("Malformed /auth/me response: missing user object", 200, e);
		let n = t;
		return {
			...t,
			is_admin: St(n.is_admin)
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
		if (!r || typeof r != "object") throw new W("Malformed /api/v1/playlists response: missing collection object", 200, n);
		let i = r;
		if (typeof i.id != "string" || i.id === "") throw new W("Malformed /api/v1/playlists response: collection has no usable id", 200, n);
		return {
			id: i.id,
			name: typeof i.name == "string" ? i.name : e
		};
	}
	addToPlaylist(e, t) {
		return this.post(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	getPlaylists(e) {
		return this.get("/api/v1/collections", void 0, e).then((e) => (Array.isArray(e?.collections) ? e.collections : []).flatMap(kt));
	}
	getPlaylist(e, t) {
		return this.get(`/api/v1/collections/${encodeURIComponent(e)}`, void 0, t).then((e) => {
			let t = kt(e?.collection)[0];
			if (!t) throw new W("Malformed /api/v1/collections/{id} response: missing collection object", 200, e);
			let n = Array.isArray(e?.items) ? e.items.flatMap(At) : [];
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
		return Array.isArray(a.candidates) ? a.candidates.map(jt) : [];
	}
	downloadSubtitle(e, t) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/subtitles/download`, t);
	}
	async listArtists(e = {}, t) {
		let n = Ot(e), r = await this.get("/api/v1/music/artists", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.artists) ? r.artists : [];
		return {
			artists: i.map(wt),
			...Dt(r, i.length, e)
		};
	}
	async getArtist(e, t) {
		return wt((await this.get(`/api/v1/music/artist?name=${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e = {}, t) {
		let n = Ot(e);
		e.artist !== void 0 && e.artist !== "" && (n.artist = e.artist);
		let r = await this.get("/api/v1/music/albums", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.albums) ? r.albums : [];
		return {
			albums: i.map(Et),
			...Dt(r, i.length, e),
			artist: q(r.artist)
		};
	}
	async getAlbum(e, t, n) {
		let r = t !== void 0 && t !== "" ? `&artist=${encodeURIComponent(t)}` : "";
		return Et((await this.get(`/api/v1/music/album?name=${encodeURIComponent(e)}${r}`, void 0, n)).album);
	}
	async listTracks(e = {}, t) {
		let n = Ot(e), r = await this.get("/api/v1/music/tracks", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.tracks) ? r.tracks : [];
		return {
			tracks: i.map(Tt),
			...Dt(r, i.length, e)
		};
	}
	async getTrack(e, t) {
		return Tt((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = this.loginPath);
	}
};
new Ft();
//#endregion
//#region src/stores/useToastStore.ts
var It = z("phlix-toast", () => {
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
function Lt(e) {
	return {
		...e,
		is_admin: St(e.is_admin)
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
function Rt(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function zt(e) {
	return {
		user_id: typeof e.user_id == "string" ? e.user_id : String(e.user_id ?? ""),
		bytes_in: Rt(e.bytes_in),
		bytes_out: Rt(e.bytes_out),
		quota_bytes_in: Rt(e.quota_bytes_in),
		quota_bytes_out: Rt(e.quota_bytes_out),
		max_concurrent_streams: Rt(e.max_concurrent_streams),
		throttle_bps: Rt(e.throttle_bps)
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
var Bt = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list(e) {
		let t = e?.status ? `?status=${encodeURIComponent(e.status)}` : "", { users: n } = await this.client.get(`/api/v1/admin/users${t}`);
		return Array.isArray(n) ? n.map(Lt) : [];
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
		return Lt(t);
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
		return zt(await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}/bandwidth`) ?? {});
	}
	async setThrottle(e, t) {
		return zt(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/throttle`, { throttle_bps: t }) ?? {});
	}
	async setQuota(e, t) {
		return zt(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/quota`, t) ?? {});
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
function Vt(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function Ht() {
	let e = f("apiBase", "");
	return r(() => Vt(e));
}
function Ut() {
	let e = f("mediaApiBase", void 0), t = f("apiBase", "");
	return r(() => Vt(e) || Vt(t));
}
//#endregion
//#region src/stores/useAuthStore.ts
function Wt(e) {
	return typeof e == "string" ? e : e?.value ?? "/login";
}
function Gt(e) {
	return !(e instanceof W) || !e.body || typeof e.body != "object" || !("code" in e.body) ? null : String(e.body.code ?? "") || null;
}
var Kt = z("auth", () => {
	let e = new _t(), t = Ht(), n = f("loginPath", "/login"), i = r(() => Wt(n)), a = new Ft({
		tokenStore: e,
		baseUrl: t.value,
		loginPath: i.value
	});
	P(t, (e) => a.setBaseUrl(e));
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
			return c.value = e instanceof Error ? e.message : "Login failed", l.value = Gt(e), !1;
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
			return c.value = e instanceof Error ? e.message : "Registration failed", l.value = Gt(e), !1;
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
				l.value = Gt(t), o.value = null, e.clear(), u.value = null;
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
			throw c.value = e instanceof Error ? e.message : "Avatar upload failed", l.value = Gt(e), e;
		} finally {
			s.value = !1;
		}
	}
	async function w() {
		s.value = !0, c.value = null, l.value = null;
		try {
			await a.deleteAvatar(), o.value && (o.value.avatar_url = null);
		} catch (e) {
			throw c.value = e instanceof Error ? e.message : "Avatar deletion failed", l.value = Gt(e), e;
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
}), qt = "phlix.active_profile", Jt = qt;
function Yt(e) {
	return `${qt}.${e}`;
}
function Xt(e) {
	if (typeof localStorage > "u" || e === null) return null;
	let t = localStorage.getItem(Yt(e));
	return typeof t == "string" && t !== "" ? t : null;
}
function Zt(e, t) {
	if (typeof localStorage > "u" || e === null) return;
	let n = Yt(e);
	t === null ? localStorage.removeItem(n) : localStorage.setItem(n, t);
}
function Qt() {
	typeof localStorage > "u" || localStorage.removeItem(Jt);
}
var $t = z("profile", () => {
	let e = Kt(), t = Ht();
	function n() {
		let t = e.user?.id;
		return typeof t == "string" && t !== "" ? t : null;
	}
	let i = n();
	Qt();
	let a = S([]), o = S(!1), s = S(!1), c = S(null), l = S(Xt(i)), u = S(null), d = S(!1), f = S(!1), p = S(0), m = null;
	function h(e) {
		return m ? m.setBaseUrl(e) : m = new Ft({ baseUrl: e }), new Bt(m);
	}
	let g = r(() => a.value.length > 1), _ = r(() => a.value.find((e) => e.id === l.value) ?? null), v = r(() => s.value && a.value.length > 1 && !d.value), y = r(() => l.value ?? "account");
	async function b(e = !1) {
		if (!o.value && !(s.value && !e)) {
			o.value = !0, c.value = null;
			try {
				let e = await h(t.value).listOwnProfiles();
				a.value = e, s.value = !0;
				let n = e.find((e) => e.is_active)?.id ?? null;
				n !== null && n !== l.value && (l.value = n, Zt(i, n));
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
			return e.setTokens(r.access_token, r.refresh_token), r.user && typeof r.user == "object" && (e.user = r.user), l.value = r.profile_id ?? n, Zt(i, l.value), d.value = !0, f.value = !1, a.value = a.value.map((e) => ({
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
			return n && (l.value = null, Zt(i, null)), await b(!0), n && l.value !== null && (p.value += 1), !0;
		} catch (e) {
			return c.value = pe(e, "Could not delete the profile."), !1;
		}
	}
	function k() {
		a.value = [], o.value = !1, s.value = !1, c.value = null, u.value = null, d.value = !1, f.value = !1, l.value = null, Zt(i, null);
	}
	return P(l, (e, t) => {
		t !== null && e !== t && (p.value += 1);
	}), P(() => e.isLoggedIn, (e) => {
		e || k();
	}), P(n, (e, t) => {
		e !== null && e !== t && (i = e, l.value === null && (l.value = Xt(e)));
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
}), en = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), tn = z("user-item-data", () => {
	let e = S(/* @__PURE__ */ new Map()), t = $t();
	P(() => t.epoch, () => {
		e.value = /* @__PURE__ */ new Map();
	});
	let n = null;
	function r(e) {
		return n ? n.setBaseUrl(e) : n = new Ft({ baseUrl: e }), n;
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
		return e.value.get(t) ?? { ...en };
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
		let r = e.value.get(t) ?? { ...en };
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
			It().error(`Failed to ${r} favorites: ${pe(t)}`);
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
			It().error(`Failed to mark ${r}: ${pe(t)}`);
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
			l(e, { like_level: o }), It().error(`Failed to set rating: ${pe(t)}`);
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
}), nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rn(e, t) {
	return x(), o("svg", nn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var an = p({
	name: "lucide-play",
	render: rn
}), on = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sn(e, t) {
	return x(), o("svg", on, [...t[0] ||= [s("g", {
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
var cn = p({
	name: "lucide-pause",
	render: sn
}), ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function un(e, t) {
	return x(), o("svg", ln, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var dn = p({
	name: "lucide-skip-back",
	render: un
}), fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pn(e, t) {
	return x(), o("svg", fn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var mn = p({
	name: "lucide-skip-forward",
	render: pn
}), hn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gn(e, t) {
	return x(), o("svg", hn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var _n = p({
	name: "lucide-rotate-ccw",
	render: gn
}), vn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yn(e, t) {
	return x(), o("svg", vn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var bn = p({
	name: "lucide-rotate-cw",
	render: yn
}), xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sn(e, t) {
	return x(), o("svg", xn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Cn = p({
	name: "lucide-volume-2",
	render: Sn
}), wn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tn(e, t) {
	return x(), o("svg", wn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var En = p({
	name: "lucide-volume-1",
	render: Tn
}), Dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function On(e, t) {
	return x(), o("svg", Dn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var kn = p({
	name: "lucide-volume-x",
	render: On
}), An = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jn(e, t) {
	return x(), o("svg", An, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), s("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var Mn = p({
	name: "lucide-shuffle",
	render: jn
}), Nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pn(e, t) {
	return x(), o("svg", Nn, [...t[0] ||= [s("g", {
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
var Fn = p({
	name: "lucide-repeat",
	render: Pn
}), In = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ln(e, t) {
	return x(), o("svg", In, [...t[0] ||= [s("g", {
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
var Rn = p({
	name: "lucide-repeat-1",
	render: Ln
}), zn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bn(e, t) {
	return x(), o("svg", zn, [...t[0] ||= [s("g", {
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
var Vn = p({
	name: "lucide-list-music",
	render: Bn
}), Hn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Un(e, t) {
	return x(), o("svg", Hn, [...t[0] ||= [s("g", {
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
var Wn = p({
	name: "lucide-captions",
	render: Un
}), Gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kn(e, t) {
	return x(), o("svg", Gn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var qn = p({
	name: "lucide-captions-off",
	render: Kn
}), Jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yn(e, t) {
	return x(), o("svg", Jn, [...t[0] ||= [s("g", {
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
var Xn = p({
	name: "lucide-picture-in-picture-2",
	render: Yn
}), Zn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qn(e, t) {
	return x(), o("svg", Zn, [...t[0] ||= [s("rect", {
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
var $n = p({
	name: "lucide-rectangle-horizontal",
	render: Qn
}), er = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tr(e, t) {
	return x(), o("svg", er, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var nr = p({
	name: "lucide-maximize",
	render: tr
}), rr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ir(e, t) {
	return x(), o("svg", rr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var ar = p({
	name: "lucide-minimize",
	render: ir
}), or = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sr(e, t) {
	return x(), o("svg", or, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var cr = p({
	name: "lucide-maximize-2",
	render: sr
}), lr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ur(e, t) {
	return x(), o("svg", lr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var dr = p({
	name: "lucide-cast",
	render: ur
}), fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pr(e, t) {
	return x(), o("svg", fr, [...t[0] ||= [s("g", {
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
var mr = p({
	name: "lucide-settings",
	render: pr
}), hr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gr(e, t) {
	return x(), o("svg", hr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var _r = p({
	name: "lucide-gauge",
	render: gr
}), vr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yr(e, t) {
	return x(), o("svg", vr, [...t[0] ||= [s("g", {
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
var br = p({
	name: "lucide-film",
	render: yr
}), xr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sr(e, t) {
	return x(), o("svg", xr, [...t[0] ||= [s("g", {
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
var Cr = p({
	name: "lucide-image",
	render: Sr
}), wr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tr(e, t) {
	return x(), o("svg", wr, [...t[0] ||= [s("g", {
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
var Er = p({
	name: "lucide-music",
	render: Tr
}), Dr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Or(e, t) {
	return x(), o("svg", Dr, [...t[0] ||= [s("g", {
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
var kr = p({
	name: "lucide-tv",
	render: Or
}), Ar = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jr(e, t) {
	return x(), o("svg", Ar, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var Mr = p({
	name: "lucide-book",
	render: jr
}), Nr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pr(e, t) {
	return x(), o("svg", Nr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var Fr = p({
	name: "lucide-headphones",
	render: Pr
}), Ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Lr(e, t) {
	return x(), o("svg", Ir, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var Rr = p({
	name: "lucide-disc-3",
	render: Lr
}), zr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Br(e, t) {
	return x(), o("svg", zr, [...t[0] ||= [s("g", {
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
var Vr = p({
	name: "lucide-mic-2",
	render: Br
}), Hr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ur(e, t) {
	return x(), o("svg", Hr, [...t[0] ||= [s("g", {
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
var Wr = p({
	name: "lucide-video",
	render: Ur
}), Gr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kr(e, t) {
	return x(), o("svg", Gr, [...t[0] ||= [s("g", {
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
var qr = p({
	name: "lucide-search",
	render: Kr
}), Jr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yr(e, t) {
	return x(), o("svg", Jr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Xr = p({
	name: "lucide-sliders-horizontal",
	render: Yr
}), Zr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qr(e, t) {
	return x(), o("svg", Zr, [...t[0] ||= [s("g", {
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
var $r = p({
	name: "lucide-calendar",
	render: Qr
}), ei = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ti(e, t) {
	return x(), o("svg", ei, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var ni = p({
	name: "lucide-arrow-up-down",
	render: ti
}), ri = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ii(e, t) {
	return x(), o("svg", ri, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var ai = p({
	name: "lucide-star",
	render: ii
}), oi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function si(e, t) {
	return x(), o("svg", oi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var ci = p({
	name: "lucide-list",
	render: si
}), li = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ui(e, t) {
	return x(), o("svg", li, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"></rect></g>", 1)]]);
}
var di = p({
	name: "lucide-layout-grid",
	render: ui
}), fi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pi(e, t) {
	return x(), o("svg", fi, [...t[0] ||= [s("g", {
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
var mi = p({
	name: "lucide-gallery-horizontal",
	render: pi
}), hi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gi(e, t) {
	return x(), o("svg", hi, [...t[0] ||= [s("g", {
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
var _i = p({
	name: "lucide-table",
	render: gi
}), vi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yi(e, t) {
	return x(), o("svg", vi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var bi = p({
	name: "lucide-plus",
	render: yi
}), xi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Si(e, t) {
	return x(), o("svg", xi, [...t[0] ||= [s("g", {
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
var Ci = p({
	name: "lucide-info",
	render: Si
}), wi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ti(e, t) {
	return x(), o("svg", wi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Ei = p({
	name: "lucide-x",
	render: Ti
}), Di = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Oi(e, t) {
	return x(), o("svg", Di, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var ki = p({
	name: "lucide-check",
	render: Oi
}), Ai = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ji(e, t) {
	return x(), o("svg", Ai, [...t[0] ||= [s("g", {
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
var Mi = p({
	name: "lucide-lock",
	render: ji
}), Ni = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pi(e, t) {
	return x(), o("svg", Ni, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Fi = p({
	name: "lucide-bookmark",
	render: Pi
}), Ii = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Li(e, t) {
	return x(), o("svg", Ii, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Ri = p({
	name: "lucide-bookmark-plus",
	render: Li
}), zi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bi(e, t) {
	return x(), o("svg", zi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Vi = p({
	name: "lucide-heart",
	render: Bi
}), Hi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ui(e, t) {
	return x(), o("svg", Hi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var Wi = p({
	name: "lucide-thumbs-up",
	render: Ui
}), Gi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ki(e, t) {
	return x(), o("svg", Gi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var qi = p({
	name: "lucide-thumbs-down",
	render: Ki
}), Ji = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yi(e, t) {
	return x(), o("svg", Ji, [...t[0] ||= [s("g", {
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
var Xi = p({
	name: "lucide-user",
	render: Yi
}), Zi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qi(e, t) {
	return x(), o("svg", Zi, [...t[0] ||= [s("g", {
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
var $i = p({
	name: "lucide-users",
	render: Qi
}), ea = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ta(e, t) {
	return x(), o("svg", ea, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var na = p({
	name: "lucide-log-out",
	render: ta
}), ra = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ia(e, t) {
	return x(), o("svg", ra, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var aa = p({
	name: "lucide-menu",
	render: ia
}), oa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sa(e, t) {
	return x(), o("svg", oa, [...t[0] ||= [s("g", {
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
var ca = p({
	name: "lucide-more-horizontal",
	render: sa
}), la = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ua(e, t) {
	return x(), o("svg", la, [...t[0] ||= [s("g", {
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
var da = p({
	name: "lucide-eye",
	render: ua
}), fa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pa(e, t) {
	return x(), o("svg", fa, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var ma = p({
	name: "lucide-eye-off",
	render: pa
}), ha = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ga(e, t) {
	return x(), o("svg", ha, [...t[0] ||= [s("g", {
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
var _a = p({
	name: "lucide-key",
	render: ga
}), va = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ya(e, t) {
	return x(), o("svg", va, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var ba = p({
	name: "lucide-trash",
	render: ya
}), xa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sa(e, t) {
	return x(), o("svg", xa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Ca = p({
	name: "lucide-arrow-left",
	render: Sa
}), wa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ta(e, t) {
	return x(), o("svg", wa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Ea = p({
	name: "lucide-arrow-right",
	render: Ta
}), Da = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Oa(e, t) {
	return x(), o("svg", Da, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var ka = p({
	name: "lucide-arrow-up",
	render: Oa
}), Aa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ja(e, t) {
	return x(), o("svg", Aa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var Ma = p({
	name: "lucide-arrow-down",
	render: ja
}), Na = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pa(e, t) {
	return x(), o("svg", Na, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var Fa = p({
	name: "lucide-chevron-down",
	render: Pa
}), Ia = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function La(e, t) {
	return x(), o("svg", Ia, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var Ra = p({
	name: "lucide-chevron-up",
	render: La
}), za = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ba(e, t) {
	return x(), o("svg", za, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Va = p({
	name: "lucide-chevron-left",
	render: Ba
}), Ha = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ua(e, t) {
	return x(), o("svg", Ha, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Wa = p({
	name: "lucide-chevron-right",
	render: Ua
}), Ga = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ka(e, t) {
	return x(), o("svg", Ga, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
	}, null, -1)]]);
}
var qa = p({
	name: "lucide-chevrons-left",
	render: Ka
}), Ja = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ya(e, t) {
	return x(), o("svg", Ja, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 17l5-5l-5-5m7 10l5-5l-5-5"
	}, null, -1)]]);
}
var Xa = p({
	name: "lucide-chevrons-right",
	render: Ya
}), Za = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qa(e, t) {
	return x(), o("svg", Za, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var $a = p({
	name: "lucide-loader-circle",
	render: Qa
}), eo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function to(e, t) {
	return x(), o("svg", eo, [...t[0] ||= [s("g", {
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
var no = p({
	name: "lucide-circle-alert",
	render: to
}), ro = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function io(e, t) {
	return x(), o("svg", ro, [...t[0] ||= [s("g", {
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
var ao = p({
	name: "lucide-circle-check",
	render: io
}), oo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function so(e, t) {
	return x(), o("svg", oo, [...t[0] ||= [s("g", {
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
var co = p({
	name: "lucide-circle-x",
	render: so
}), lo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function uo(e, t) {
	return x(), o("svg", lo, [...t[0] ||= [s("g", {
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
var fo = p({
	name: "lucide-sun",
	render: uo
}), po = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mo(e, t) {
	return x(), o("svg", po, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var ho = p({
	name: "lucide-moon",
	render: mo
}), go = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _o(e, t) {
	return x(), o("svg", go, [...t[0] ||= [s("g", {
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
var vo = p({
	name: "lucide-monitor",
	render: _o
}), yo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bo(e, t) {
	return x(), o("svg", yo, [...t[0] ||= [s("path", {
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
var xo = {
	play: an,
	pause: cn,
	"skip-back": dn,
	"skip-forward": mn,
	rewind: _n,
	forward: bn,
	volume: Cn,
	"volume-low": En,
	mute: kn,
	shuffle: Mn,
	repeat: Fn,
	"repeat-1": Rn,
	"list-music": Vn,
	captions: Wn,
	"captions-off": qn,
	pip: Xn,
	theater: $n,
	fullscreen: nr,
	"fullscreen-exit": ar,
	expand: cr,
	cast: dr,
	settings: mr,
	speed: _r,
	film: br,
	image: Cr,
	music: Er,
	tv: kr,
	book: Mr,
	headphones: Fr,
	disc: Rr,
	mic: Vr,
	video: Wr,
	search: qr,
	filter: Xr,
	calendar: $r,
	sort: ni,
	star: ai,
	list: ci,
	grid: di,
	backdrop: mi,
	table: _i,
	plus: bi,
	info: Ci,
	x: Ei,
	check: ki,
	lock: Mi,
	bookmark: Fi,
	"bookmark-plus": Ri,
	heart: Vi,
	"thumbs-up": Wi,
	"thumbs-down": qi,
	user: Xi,
	users: $i,
	"log-out": na,
	menu: aa,
	more: ca,
	eye: da,
	"eye-off": ma,
	refresh: bn,
	key: _a,
	trash: ba,
	"arrow-left": Ca,
	"arrow-right": Ea,
	"arrow-up": ka,
	"arrow-down": Ma,
	"chevron-down": Fa,
	"chevron-up": Ra,
	"chevron-left": Va,
	"chevron-right": Wa,
	"chevrons-left": qa,
	"chevrons-right": Xa,
	spinner: $a,
	alert: no,
	"alert-circle": no,
	success: ao,
	error: co,
	sun: fo,
	moon: ho,
	monitor: vo,
	"external-link": p({
		name: "lucide-external-link",
		render: bo
	})
};
Object.keys(xo);
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
		let t = e, n = r(() => xo[t.name]), a = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
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
}), So = ["id"], Co = 8, wo = /*@__PURE__*/ d({
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
			let a = n.getBoundingClientRect(), o = a.right - (i.right - Co), l = i.left + Co - a.left, u = 0;
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
			onKeydown: L(b, ["esc"])
		}, [w(t.$slots, "default", {}, void 0, !0), u(n, { name: "phlix-tooltip" }, {
			default: F(() => [i.value && (e.text || t.$slots.content) ? (x(), o("span", {
				key: 0,
				id: O(r),
				ref_key: "tipEl",
				ref: c,
				role: "tooltip",
				class: g(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [w(t.$slots, "content", {}, () => [l(E(e.text), 1)], !0)], 10, So)) : a("", !0)]),
			_: 3
		})], 544));
	}
}), Y = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, To = /*#__PURE__*/ Y(wo, [["__scopeId", "data-v-83b83959"]]), Eo = ["data-level"], Do = ["disabled", "aria-pressed"], Oo = ["disabled", "aria-pressed"], ko = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, [d.value ? (x(), i(To, {
			key: 0,
			text: "Like"
		}, {
			default: F(() => [s("button", {
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
			})], 10, Do)]),
			_: 1
		})) : a("", !0), f.value ? (x(), i(To, {
			key: 1,
			text: "Dislike"
		}, {
			default: F(() => [s("button", {
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
			})], 10, Oo)]),
			_: 1
		})) : a("", !0)], 8, Eo));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
//#endregion
//#region src/components/player/format-time.ts
function Ao(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/utils/plural.ts
var jo = [
	"zero",
	"one",
	"two",
	"few",
	"many",
	"other"
], Mo = /* @__PURE__ */ new Map(), No = "\0";
function Po(e) {
	let t = e?.locale, n = e?.type ?? "cardinal", r = `${t ?? ""}${No}${n}`, i = Mo.get(r);
	return i || (i = new Intl.PluralRules(t, { type: n }), Mo.set(r, i)), i;
}
function Fo(e, t) {
	return Number.isFinite(e) ? Po(t).select(e) : "other";
}
function Io(e, t, n) {
	let r = t[Fo(e, n)];
	return r === void 0 ? t.other : r;
}
function Lo(e, t, n) {
	if (!e.includes("|")) return e;
	let r = e.split("|").map((e) => e.trim());
	if (r.length === 1) return r[0];
	let i = Po(n), a = new Set(i.resolvedOptions().pluralCategories), o = jo.filter((e) => a.has(e)), s = {};
	return o.forEach((e, t) => {
		s[e] = r[Math.min(t, r.length - 1)];
	}), Io(t, {
		...s,
		other: s.other ?? r[r.length - 1]
	}, n);
}
function Ro(e) {
	return e.includes("|");
}
//#endregion
//#region src/i18n/messages.ts
var zo = {
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
		addFavorite: "Add to My List",
		removeFavorite: "Remove from My List",
		inFavorites: "In My List",
		watchlist: "My List",
		addedToList: "Added “{name}” to My List.",
		removedFromList: "Removed “{name}” from My List.",
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
		waitingForMembers: "Waiting for members…",
		rewind: "Rewind",
		fastForward: "Fast forward",
		playAll: "Play for everyone",
		pauseAll: "Pause for everyone",
		modeSelect: "Create or join a room",
		commandFailed: "That control did not reach the group. Check your connection and try again.",
		commandRejected: "The watch group refused that action.",
		roomPassword: "Password",
		passwordOptional: "Leave empty for a password-free room.",
		lockedRoomHint: "This room is password-protected — enter the password to join.",
		lockedRoom: "Password-protected",
		availableRooms: "Rooms"
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
		watchlist: "My List",
		inFavorites: "In My List",
		addFavorite: "Add to My List",
		removeFavorite: "Remove from My List",
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
		"transcoding.toneMapMode": "Tone Map Mode",
		settingsRejected: "The server rejected these settings — nothing was saved.",
		settingsRejectAllMethods: "At least one sign-in method must stay enabled. Keep at least one turned on and save again.",
		settingsRejectAdminLockout: "This change would leave an active administrator with no usable way to sign in. Enable another sign-in method for them first, then save again.",
		settingsForbidden: "You no longer have permission to change server settings. Sign in again as an administrator and try again.",
		settingsConflict: "The server could not apply those settings in its current state. Reload the settings and try again."
	}
}, Bo = /\{(\w+)\}/g;
function Vo(e) {
	let t = {};
	for (let n of Object.keys(zo)) {
		let r = zo[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function Ho(e, t) {
	return t ? e.replace(Bo, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function Uo(e) {
	let t = Vo(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? Ho(Wo(s, n), n) : e;
	};
}
function Wo(e, t) {
	if (!Ro(e)) return e;
	let n = t?.count, r = typeof n == "number" ? n : Number(n);
	if (!Number.isFinite(r)) {
		let t = e.split("|");
		return t[t.length - 1].trim();
	}
	return Lo(e, r);
}
//#endregion
//#region src/composables/useMessages.ts
function X() {
	return { t: Uo(f("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Go = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ko = { class: "scrubber__track" }, qo = ["title"], Jo = { class: "scrubber__time numeric" }, Yo = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			"aria-valuetext": O(Ao)(t.position),
			"aria-label": O(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", Ko, [
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
			}, null, 12, qo))), 128)),
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
		}, null, 4)) : a("", !0), s("span", Jo, E(O(Ao)(D.value)), 1)], 4)) : a("", !0)], 40, Go));
	}
}), [["__scopeId", "data-v-3d610715"]]), Xo = "phlix-bandwidth-estimate";
function Zo(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function Qo() {
	try {
		let e = localStorage.getItem(Xo);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? Zo(t) : 0;
	} catch {
		return 0;
	}
}
function $o(e) {
	try {
		localStorage.setItem(Xo, String(e));
	} catch {}
}
function es(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var ts = null, ns = null;
function rs() {
	ts && $o(ts.bandwidthEstimate);
}
async function is(e, t, n = {}) {
	if (typeof MediaSource > "u" && es(e)) {
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
		let i = Qo(), a = new r({
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
		}), ts = a, ns !== null && clearInterval(ns), ns = setInterval(rs, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				$o(a.bandwidthEstimate), ns !== null && (clearInterval(ns), ns = null), ts = null;
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
var as = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function os(e, t = "") {
	return typeof e == "string" ? e : t;
}
function ss(e) {
	return e === !0 || e === "true" || e === 1;
}
function cs(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function ls(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = os(e.url ?? e.src);
		r !== "" && t.push({
			index: cs(e.index),
			language: os(e.language ?? e.lang ?? e.srclang),
			label: os(e.label),
			default: ss(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function us(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = cs(e.height);
		r <= 0 || t.push({
			id: os(e.id),
			label: os(e.label),
			height: r,
			width: cs(e.width),
			bitrate: cs(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function ds(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var fs = .7, ps = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], ms = 1e7, hs = "mobile-low";
function gs(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * fs;
}
function _s(e) {
	let t = gs(e);
	if (t === void 0 || t >= ms) return;
	let n = hs;
	for (let [e, r] of ps) r <= t && (n = e);
	return n;
}
function vs(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function ys(e) {
	let t = e ?? {};
	return {
		jobId: os(t.job_id ?? t.jobId),
		masterUrl: os(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: os(t.status, "running"),
		reused: ss(t.reused),
		subtitles: ls(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: us(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function bs(e) {
	let t = e ?? {};
	return {
		jobId: os(t.job_id ?? t.jobId),
		status: os(t.status, "running"),
		playlistReady: ss(t.playlist_ready ?? t.playlistReady),
		progress: cs(t.progress),
		masterUrl: os(t.master_url ?? t.masterUrl),
		subtitles: ls(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: us(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function xs(e) {
	return e.playlistReady || e.status === "completed";
}
function Ss(e) {
	return as.has(e);
}
function Cs(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function ws(e) {
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
			url: Cs(n, e.url)
		}));
	}
	let y = e.attach ?? is, b = e.pollIntervalMs ?? 1e3, x = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(x / Math.max(1, b))), T = Ts(), E = e.getToken ?? (() => Es(T)), D = null, O = null, k = null, A = !1, j = null, M = 0;
	function N() {
		return e.client ?? new Ft({
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
			let r = N(), c = ys(await r.post(ds(a, o), void 0, j.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = Cs(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < w; e++) {
				let e = bs(await r.get(vs(c.jobId), void 0, j.signal));
				if (l()) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), Ss(e.status)) throw Error(`transcode ${e.status}`);
				if (xs(e)) {
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
function Ts() {
	try {
		return new _t();
	} catch {
		return null;
	}
}
function Es(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Ds = 10;
function Os(e) {
	let t = S(null), n = S(!1), r = S(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new Ft({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % Ds, s = Math.floor(i / Ds), c = a / 9 * 100, l = s / 5 * 100;
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
var ks = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], As = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, null, 8, ["name", "class"])], 10, ks));
	}
}), [["__scopeId", "data-v-48bb9819"]]);
//#endregion
//#region src/composables/layerFocusStack.ts
function js() {
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
var Ms = js(), Ns = /* @__PURE__ */ new Set(), Ps = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Fs = 0, Is = "";
function Ls() {
	Fs === 0 && (Is = document.body.style.overflow, document.body.style.overflow = "hidden"), Fs++;
}
function Rs() {
	Fs !== 0 && (Fs--, Fs === 0 && (document.body.style.overflow = Is));
}
var zs = Ms;
function Bs() {
	let e = document.querySelector("[data-focus-anchor]");
	if (e && document.contains(e)) return e;
	let t = Ns.values().next().value;
	return t && document.contains(t) ? t : null;
}
function Vs(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1, o = !1;
	function s() {
		if (!o) return;
		o = !1;
		let e = [];
		for (; zs.depth() > 0;) {
			let t = zs.pop();
			if (t === i) break;
			e.push(t);
		}
		for (let t = e.length - 1; t >= 0; t--) zs.push(e[t]);
	}
	function c() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(Ps)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		o ||= (i = document.activeElement, zs.push(i), !0), e.value?.setAttribute("data-focus-trap", ""), r && (Ls(), a = !0), document.addEventListener("keydown", l, !0), h(() => {
			e.value?.setAttribute("data-focus-trap", ""), (c()[0] ?? e.value)?.focus();
		});
	}
	function d() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", l, !0), a &&= (Rs(), !1), s(), i && document.contains(i) ? i.focus?.() : i && zs.depth() === 0 && Bs()?.focus?.(), i = null;
	}
	P(t, (e) => e ? u() : d(), { immediate: !0 }), v(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", l, !0), a &&= (Rs(), !1), s();
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var Hs = [
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
], Us = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Ws = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Gs(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Ks(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function qs(e, t) {
	switch (e.key) {
		case " ": return !Gs(e.target) && (t.playPause(), !0);
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
function Js(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Ks(n.target) || qs(n, e) && n.preventDefault();
	}
	y(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), v(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Ys = ["aria-label"], Xs = { class: "shortcuts__head" }, Zs = { class: "shortcuts__title" }, Qs = { class: "shortcuts__grid" }, $s = { class: "shortcuts__keys" }, ec = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, tc = {
	key: 1,
	class: "shortcuts__key"
}, nc = { class: "shortcuts__label" }, rc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Hs }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, c = n, { t: d } = X(), f = S(null);
		return Vs(f, D(r, "open"), {
			lockScroll: !1,
			onEscape: () => (c("close"), !0)
		}), (n, r) => t.open ? (x(), o("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= R((e) => c("close"), ["self"])
		}, [s("div", {
			ref_key: "panelEl",
			ref: f,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(d)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [s("div", Xs, [s("h3", Zs, E(O(d)("player.keyboard")), 1), u(As, {
			name: "x",
			label: O(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => c("close")
		}, null, 8, ["label"])]), s("ul", Qs, [(x(!0), o(e, null, C(t.shortcuts, (t) => (x(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", $s, [(x(!0), o(e, null, C(t.keys, (t, n) => (x(), o(e, { key: n }, [t === "–" ? (x(), o("span", ec, "–")) : (x(), o("kbd", tc, [O(Us)[t] ? (x(), i(J, {
			key: 0,
			name: O(Us)[t],
			label: O(Ws)[t] ?? t
		}, null, 8, ["name", "label"])) : (x(), o(e, { key: 1 }, [l(E(t), 1)], 64))]))], 64))), 128))]), s("span", nc, E(t.label), 1)]))), 128))])], 8, Ys)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), ic = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], ac = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, null, 4)], 544)], 42, ic));
	}
}), [["__scopeId", "data-v-57426415"]]), oc = { class: "volume" }, sc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "VolumeControl",
	setup(e) {
		let t = ue(), n = ne(), { t: i } = X(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return P(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (x(), o("div", oc, [u(As, {
			name: s.value,
			label: O(t).muted ? O(i)("player.unmute") : O(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => O(t).toggleMute()
		}, null, 8, ["name", "label"]), u(ac, {
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
function cc(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function lc(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function uc(e, t) {
	return t === "first" ? lc(e, -1, 1) : lc(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var dc = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], fc = ["id", "aria-label"], pc = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], mc = { class: "phlix-select__check" }, hc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let d = t, { t: f } = X(), p = c, m = r(() => cc(d.options)), _ = k(), y = S(!1), b = S(-1), w = S(null), T = S(null);
		function D() {
			y.value ? U() : H();
		}
		n({ toggleMenu: D });
		let j = "", M, F = A(t, "open"), L = r(() => m.value.findIndex((e) => e.value === d.modelValue));
		P(F, (e) => {
			e && !y.value ? H() : !e && y.value && U();
		}, { immediate: !0 });
		let R = r(() => m.value[L.value]?.label ?? ""), z = r(() => b.value >= 0 ? `${_}-opt-${b.value}` : void 0), B = S(!1);
		function V() {
			let e = w.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			B.value = n < 284 && r > n;
		}
		function H() {
			d.disabled || y.value || (V(), y.value = !0, b.value = L.value >= 0 ? L.value : uc(m.value, "first"), h(ne));
		}
		function U() {
			y.value = !1;
		}
		function ee(e) {
			let t = m.value[e];
			!t || t.disabled || (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), U(), w.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function te(e) {
			b.value = lc(m.value, b.value, e), h(ne);
		}
		function ne() {
			(T.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function re(e) {
			if (!d.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), y.value ? te(1) : H();
					break;
				case "ArrowUp":
					e.preventDefault(), y.value ? te(-1) : H();
					break;
				case "Home":
					y.value && (e.preventDefault(), b.value = uc(m.value, "first"), h(ne));
					break;
				case "End":
					y.value && (e.preventDefault(), b.value = uc(m.value, "last"), h(ne));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), y.value && b.value >= 0 ? ee(b.value) : H();
					break;
				case "Escape":
					y.value && (e.preventDefault(), U());
					break;
				case "Tab":
					U();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && ie(e.key);
			}
		}
		function ie(e) {
			y.value || H(), j += e.toLowerCase(), clearTimeout(M), M = setTimeout(() => j = "", 600);
			let t = m.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(j));
			t >= 0 && (b.value = t, h(ne));
		}
		function ae(e) {
			y.value && w.value && !w.value.contains(e.target) && U();
		}
		return P(y, (e) => {
			e ? document.addEventListener("pointerdown", ae, !0) : document.removeEventListener("pointerdown", ae, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", ae, !0), clearTimeout(M);
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
			onClick: r[0] ||= (e) => y.value ? U() : H(),
			onKeydown: re
		}, [s("span", { class: g(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, E(L.value >= 0 ? R.value : t.placeholder ?? O(f)("common.selectPlaceholder")), 3), u(J, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, dc), I(s("ul", {
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
			onClick: (e) => ee(n),
			onPointermove: (t) => !e.disabled && (b.value = n)
		}, [s("span", mc, [e.value === t.modelValue ? (x(), i(J, {
			key: 0,
			name: "check"
		})) : a("", !0)]), l(" " + E(e.label), 1)], 42, pc))), 128))], 10, fc), [[N, y.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]), gc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		return (e, t) => (x(), i(hc, {
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
}), [["__scopeId", "data-v-4530b308"]]), _c = "auto", vc = "original";
function yc(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function bc(e) {
	return e >= 2160 ? "4K" : yc(e);
}
function xc(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = yc(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: bc(r.height)
		}));
	}
	return n;
}
function Sc(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) yc(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Cc(e, t) {
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
function wc(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Tc(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Cc(e, n) >= 0;
}
function Ec(e, t) {
	if (t < 0) return _c;
	let n = e.find((e) => e.index === t);
	return n ? yc(n.height) : _c;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Dc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let u = n, d = ue(), f = ne(), { t: p } = X(), m = r(() => xc(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = yc(r.height);
				e.has(i) || n && Sc(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: bc(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => Cc(o.levels, _.value)), y = r(() => _.value && v.value >= 0 ? {
			value: vc,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: bc(o.activeHeight) })), w = r(() => [
			{
				value: _c,
				label: C.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? _c : y.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? vc : Ec(o.levels, o.currentLevel));
		function E(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : Sc(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => b.value || s.value ? (x(), i(hc, {
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
function Oc(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function kc(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Ac(e, t) {
	return e.language || e.label || `track-${t}`;
}
function jc(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Mc(e) {
	return e ? Oc(e.textTracks).filter(kc).map((e, t) => ({
		index: t,
		language: Ac(e, t),
		label: e.label || jc(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function Nc(e) {
	let t = e?.audioTracks;
	return Oc(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || jc(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function Pc(e, t) {
	return !e || t == null ? null : Oc(e.textTracks).filter(kc).find((e, n) => Ac(e, n) === t) ?? null;
}
function Fc(e, t) {
	return Pc(e, t) != null;
}
function Ic(e, t) {
	e && Oc(e.textTracks).filter(kc).forEach((e, n) => {
		try {
			e.mode = Ac(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function Lc(e, t) {
	let n = e?.audioTracks;
	Oc(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Rc(e) {
	let t = e?.audioTracks;
	return Oc(t).findIndex((e) => e.enabled);
}
var zc = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function Bc(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Vc(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && Bc(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(zc, n) ? zc[n] : e;
	});
}
function Hc(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Vc(e).trim()).filter((e) => e.length > 0) : [];
}
function Uc(e) {
	if (!e) return [];
	let t = Oc(e.activeCues), n = [];
	for (let e of t) n.push(...Hc(e.text));
	return n;
}
var Wc = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Gc = [
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
], Kc = [
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
], qc = [
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
], Jc = [
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
function Yc(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function Xc(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Zc(e) {
	return {
		"--cap-scale": String(Wc[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": Yc(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": Xc(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var Qc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			...Zc(i.styleConfig),
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
		P(() => i.controlsRoot, m, { immediate: !0 }), v(p);
		let h = null, y = null, b = null;
		function w() {
			s.value = Uc(h);
		}
		function T() {
			b != null && (clearTimeout(b), b = null);
		}
		function D() {
			T(), b = setTimeout(() => {
				if (b = null, !h) return;
				Ic(i.video, i.language);
				let e = Uc(h);
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
			O(), Ic(i.video, i.language);
			let e = Pc(i.video, i.language);
			if (e) {
				if (h = e, e.addEventListener("cuechange", w), s.value = Uc(e), !s.value.length) {
					let t = k(i.video, e);
					t && t.readyState !== 2 && (y = t, t.addEventListener("load", w));
				}
				D();
			} else s.value = [];
		}
		return P(() => [i.video, i.language], A, { immediate: !0 }), v(O), n({ lines: s }), (n, r) => s.value.length ? (x(), o("div", {
			key: 0,
			class: g(["player__captions", { "is-lifted": t.lifted }]),
			style: _(u.value)
		}, [(x(!0), o(e, null, C(s.value, (e, t) => (x(), o("p", {
			key: t,
			class: "player__caption-line"
		}, E(e), 1))), 128))], 6)) : a("", !0);
	}
}), [["__scopeId", "data-v-2e78d015"]]), $c = ["aria-label", "aria-expanded"], el = ["aria-label"], tl = { class: "capmenu__head" }, nl = { class: "capmenu__title" }, rl = ["aria-label"], il = ["aria-checked", "tabindex"], al = { class: "capmenu__check" }, ol = { class: "capmenu__optlabel" }, sl = [
	"aria-checked",
	"tabindex",
	"onClick"
], cl = { class: "capmenu__check" }, ll = { class: "capmenu__optlabel" }, ul = { class: "capmenu__check" }, dl = { class: "capmenu__optlabel" }, fl = { class: "capmenu__title capmenu__title--sub" }, pl = ["aria-label"], ml = [
	"aria-checked",
	"tabindex",
	"onClick"
], hl = { class: "capmenu__check" }, gl = { class: "capmenu__optlabel" }, _l = { class: "capmenu__title capmenu__title--sub" }, vl = { class: "capmenu__style" }, yl = { class: "capmenu__field" }, bl = { class: "capmenu__fieldlabel" }, xl = { class: "capmenu__field" }, Sl = { class: "capmenu__fieldlabel" }, Cl = { class: "capmenu__field" }, wl = { class: "capmenu__fieldlabel" }, Tl = { class: "capmenu__field" }, El = { class: "capmenu__fieldlabel" }, Dl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		function N() {
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
		function V(e) {
			f.captionStyle = {
				...f.captionStyle,
				edge: e
			};
		}
		Vs(h, D(c, "open"), {
			lockScroll: !1,
			onEscape: () => (A(), !0)
		});
		function H(e) {
			m.value && !m.value.contains(e.target) && A();
		}
		return P(() => c.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", H, !0) : document.removeEventListener("pointerdown", H, !0));
		}, { immediate: !0 }), v(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", H, !0);
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
		}, [u(J, { name: b.value }, null, 8, ["name"])], 10, $c), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", tl, [s("h3", nl, E(O(p)("player.subtitles")), 1), u(As, {
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
			}, [s("span", al, [y.value ? a("", !0) : (x(), i(J, {
				key: 0,
				name: "check"
			}))]), s("span", ol, E(O(p)("player.off")), 1)], 8, il), (x(!0), o(e, null, C(t.tracks, (e, t) => (x(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: w.value === t + 1 ? 0 : -1,
				onClick: (t) => j(e.language)
			}, [s("span", cl, [_.value === e.language ? (x(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", ll, E(e.label), 1)], 8, sl))), 128))], 40, rl),
			s("button", {
				type: "button",
				class: "capmenu__add",
				onClick: N
			}, [s("span", ul, [u(J, { name: "plus" })]), s("span", dl, E(O(p)("player.addSubtitles")), 1)]),
			t.audioTracks.length > 1 ? (x(), o(e, { key: 0 }, [s("h3", fl, E(O(p)("player.audio")), 1), s("div", {
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
			}, [s("span", hl, [t.activeAudio === e.index ? (x(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", gl, E(e.label), 1)], 8, ml))), 128))], 40, pl)], 64)) : a("", !0),
			s("h3", _l, E(O(p)("player.captionStyle")), 1),
			s("div", vl, [
				s("div", yl, [s("span", bl, E(O(p)("player.size")), 1), u(hc, {
					"model-value": O(f).captionStyle.size,
					options: O(Gc),
					label: O(p)("player.captionSize"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", xl, [s("span", Sl, E(O(p)("player.color")), 1), u(hc, {
					"model-value": O(f).captionStyle.textColor,
					options: O(Kc),
					label: O(p)("player.captionColor"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", Cl, [s("span", wl, E(O(p)("player.background")), 1), u(hc, {
					"model-value": O(f).captionStyle.background,
					options: O(qc),
					label: O(p)("player.captionBackground"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", Tl, [s("span", El, E(O(p)("player.edge")), 1), u(hc, {
					"model-value": O(f).captionStyle.edge,
					options: O(Jc),
					label: O(p)("player.captionEdge"),
					"onUpdate:modelValue": V
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, el)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), Ol = ["aria-labelledby"], kl = {
	key: 0,
	class: "phlix-modal__header"
}, Al = ["id"], jl = { class: "phlix-modal__body" }, Ml = {
	key: 1,
	class: "phlix-modal__footer"
}, Nl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		P(() => l.modelValue, (e) => f.value = e);
		let p = S(null), m = k();
		function h() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			l.dismissible && h();
		}
		return Vs(p, f, { onEscape: () => l.dismissible ? (h(), !0) : !1 }), (r, l) => (x(), i(t, { to: "body" }, [u(n, { name: "phlix-modal" }, {
			default: F(() => [e.modelValue ? (x(), o("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: R(_, ["self"])
			}, [s("div", {
				ref_key: "panelEl",
				ref: p,
				class: g(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? O(m) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (x(), o("header", kl, [e.title ? (x(), o("h2", {
					key: 0,
					id: O(m),
					class: "phlix-modal__title"
				}, E(e.title), 9, Al)) : a("", !0), e.hideClose ? a("", !0) : (x(), i(As, {
					key: 1,
					name: "x",
					label: O(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: h
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", jl, [w(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (x(), o("footer", Ml, [w(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, Ol)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-12c692c9"]]), Pl = [
	"type",
	"disabled",
	"aria-busy"
], Fl = {
	key: 0,
	class: "phlix-btn__spinner"
}, Il = { class: "phlix-btn__label" }, Ll = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			e.loading ? (x(), o("span", Fl, [u(J, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (x(), i(J, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", Il, [w(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (x(), i(J, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, Pl));
	}
}), [["__scopeId", "data-v-38abf89d"]]), Rl = [
	"disabled",
	"aria-label",
	"aria-pressed"
], zl = { class: "phlix-chip__label" }, Bl = ["disabled", "aria-label"], Vl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, null, 8, ["name"])) : a("", !0), s("span", zl, [w(t.$slots, "default", {}, void 0, !0)])], 8, Rl), e.removable ? (x(), o("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [u(J, { name: "x" })], 8, Bl)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-551f7599"]]), Hl = ["aria-label"], Ul = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		})], 12, Hl));
	}
}), [["__scopeId", "data-v-736b299d"]]), Wl = ["role", "aria-label"], Gl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, null, 8, ["name"])) : a("", !0), w(t.$slots, "default", {}, void 0, !0)], 10, Wl));
	}
}), [["__scopeId", "data-v-269446f3"]]), Kl = {
	class: "phlix-empty",
	role: "status"
}, ql = { class: "phlix-empty__icon" }, Jl = { class: "phlix-empty__title" }, Yl = {
	key: 0,
	class: "phlix-empty__desc"
}, Xl = {
	key: 1,
	class: "phlix-empty__actions"
}, Zl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (x(), o("div", Kl, [
			s("span", ql, [u(J, { name: e.icon }, null, 8, ["name"])]),
			s("h3", Jl, E(e.title), 1),
			e.description || t.$slots.default ? (x(), o("p", Yl, [w(t.$slots, "default", {}, () => [l(E(e.description), 1)], !0)])) : a("", !0),
			t.$slots.actions ? (x(), o("div", Xl, [w(t.$slots, "actions", {}, void 0, !0)])) : a("", !0)
		]));
	}
}), [["__scopeId", "data-v-1790dcf5"]]), Ql = { class: "subsearch" }, $l = { class: "subsearch__langs" }, eu = { class: "subsearch__legend" }, tu = { class: "subsearch__chips" }, nu = { class: "subsearch__actions" }, ru = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, iu = {
	key: 2,
	class: "subsearch__prompt"
}, au = {
	key: 3,
	class: "subsearch__list"
}, ou = { class: "subsearch__meta" }, su = { class: "subsearch__release" }, cu = { class: "subsearch__signals" }, lu = { class: "subsearch__provider" }, uu = ["aria-label"], du = {
	key: 2,
	class: "subsearch__stat"
}, fu = {
	key: 3,
	class: "subsearch__stat"
}, pu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let c = t, d = n, { t: f } = X(), p = It(), m = [
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
		function N() {
			return c.client ?? new Ft({ baseUrl: c.apiBase ?? "" });
		}
		async function I() {
			if (M.value) {
				b.value = !0, w.value = !0;
				try {
					T.value = await N().searchSubtitles(c.mediaId, [..._.value]);
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
			if (e instanceof W) {
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
				let n = ls([(await N().downloadSubtitle(c.mediaId, {
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
		return P(() => c.open, (e) => {
			e && (v(), T.value = [], w.value = !1, b.value = !1, D.value = /* @__PURE__ */ new Set(), k.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 }), (n, r) => (x(), i(Nl, {
			"model-value": t.open,
			title: O(f)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => d("update:open", e)
		}, {
			footer: F(() => [u(Ll, {
				variant: "ghost",
				onClick: L
			}, {
				default: F(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			})]),
			default: F(() => [s("div", Ql, [
				s("fieldset", $l, [s("legend", eu, E(O(f)("player.subtitleSearchLanguages")), 1), s("div", tu, [(x(!0), o(e, null, C(g.value, (e) => (x(), i(Vl, {
					key: e,
					selected: _.value.has(e),
					size: "md",
					"aria-label": h(e),
					"onUpdate:selected": (t) => y(e)
				}, {
					default: F(() => [l(E(h(e)), 1)]),
					_: 2
				}, 1032, [
					"selected",
					"aria-label",
					"onUpdate:selected"
				]))), 128))])]),
				s("div", nu, [u(Ll, {
					variant: "solid",
					"left-icon": "search",
					loading: b.value,
					disabled: !M.value,
					onClick: I
				}, {
					default: F(() => [l(E(O(f)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				b.value ? (x(), o("div", ru, [u(Ul, { label: O(f)("player.subtitleSearching") }, null, 8, ["label"]), s("span", null, E(O(f)("player.subtitleSearching")), 1)])) : w.value && j.value.length === 0 ? (x(), i(Zl, {
					key: 1,
					icon: "captions",
					title: O(f)("player.subtitleSearchEmpty"),
					description: O(f)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : w.value ? (x(), o("ul", au, [(x(!0), o(e, null, C(j.value, (e) => (x(), o("li", {
					key: A(e),
					class: "subsearch__item"
				}, [s("div", ou, [s("p", su, E(e.releaseName || e.provider), 1), s("div", cu, [
					u(Gl, {
						tone: "neutral",
						size: "sm"
					}, {
						default: F(() => [l(E(h(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (x(), i(Gl, {
						key: 0,
						tone: "info",
						size: "sm",
						label: O(f)("player.subtitleHearingImpairedFull")
					}, {
						default: F(() => [l(E(O(f)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : a("", !0),
					s("span", lu, E(e.provider), 1),
					e.rating > 0 ? (x(), o("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": O(f)("player.subtitleRating", { rating: e.rating })
					}, [u(J, { name: "star" }), l(" " + E(e.rating), 1)], 8, uu)) : a("", !0),
					e.downloadCount > 0 ? (x(), o("span", du, E(O(f)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : a("", !0),
					e.fps ? (x(), o("span", fu, E(O(f)("player.subtitleFps", { fps: e.fps })), 1)) : a("", !0)
				])]), u(Ll, {
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
					default: F(() => [l(E(D.value.has(A(e)) ? O(f)("player.subtitleAdding") : O(f)("player.subtitleAdd")), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"loading",
					"disabled",
					"aria-label",
					"onClick"
				])]))), 128))])) : (x(), o("p", iu, E(O(f)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), mu = 32, hu = 18, gu = 250, _u = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function vu(e, t, n, r, i, a, o) {
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
		r: _u(d / m),
		g: _u(f / m),
		b: _u(p / m)
	};
}
function yu(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: vu(e, t, n, 0, 0, r, n),
		right: vu(e, t, n, t - r, 0, t, n),
		center: vu(e, t, n, 0, 0, t, n)
	};
}
function bu({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function xu({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Su(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${xu(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${xu(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${xu(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Cu(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var wu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			i.value = Cu(a);
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
				u.value = Su(yu(n, 32, 18));
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
		P(() => [
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
		let N = r(() => {
			let e = { opacity: String(l.value) };
			return u.value && (e.background = u.value), e;
		});
		return t({ sampleNow: b }), (e, t) => (x(), o("div", {
			class: g(["player__ambient", { "is-active": c.value }]),
			style: _(c.value ? N.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Tu = ["aria-label"], Eu = { class: "resume__label" }, Du = { class: "resume__time numeric" }, Ou = { class: "resume__actions" }, ku = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = X(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (x(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": O(i)("player.resumePlayback")
		}, [s("p", Eu, [
			l(E(a.value[0]), 1),
			s("span", Du, E(O(Ao)(e.seconds)), 1),
			l(E(a.value[1]), 1)
		]), s("div", Ou, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [u(J, { name: "play" }), s("span", null, E(O(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [u(J, { name: "rewind" }), s("span", null, E(O(i)("player.startOver")), 1)])])], 8, Tu));
	}
}), [["__scopeId", "data-v-271c5209"]]), Au = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], ju = [
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
], Mu = new Set(ju);
function Nu(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Pu(...e) {
	return e.some((e) => Mu.has(Nu(e)));
}
function Fu(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Iu(e) {
	return e?.error?.code === 2;
}
var Lu = 3e4;
function Ru(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && Ku.get(t) === "hevc";
}
function zu(e) {
	let t = { forceTranscode: "1" };
	return Ru(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function Bu(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
var Vu = 8, Hu = 15, Uu = 2 * Math.PI * 15;
function Wu(e, t, n = Uu) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Gu = /* @__PURE__ */ new Map([
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
]), Ku = /* @__PURE__ */ new Map([
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
]), qu = /* @__PURE__ */ new Set(["h264"]), Ju = /* @__PURE__ */ new Map([
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
function Yu(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = Ku.get(t);
	return n === void 0 ? "transcode" : qu.has(n) ? "direct" : "probe";
}
function Xu(e) {
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
var Zu = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function Qu(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return Zu.get(t) ?? "video/mp4";
}
function $u(e, t = "video/mp4") {
	let n = Gu.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function ed(e, t = "video/mp4") {
	if (!e) return !0;
	let n = $u(e, t);
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
async function td(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = Ku.get(n), i = r === void 0 ? void 0 : Ju.get(r);
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
async function nd(e, t, n = "") {
	if (Pu(...e)) return !0;
	let r = e.map((e) => Nu(e)).find((e) => Au.includes(e)) ?? "";
	if (!Au.includes(r)) return !1;
	let i = Qu(r), a = Yu(n);
	if (a === "transcode" || a === "probe" && !await td(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await ed(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/utils/imageSrc.ts
function rd(e) {
	return e.length > 1 && e[0] === "/" && e[1] !== "/" && e[1] !== "\\";
}
function id(e, t) {
	if (typeof t != "string" || t === "" || !rd(t)) return t;
	let n = e.replace(/\/+$/, "");
	return n === "" ? t : n + t;
}
function ad(e, t) {
	if (typeof t != "string" || t.trim() === "") return t;
	let n = [];
	for (let r of t.split(",")) {
		let t = r.trim();
		if (t === "") continue;
		let i = t.search(/\s/), a = i === -1 ? t : t.slice(0, i), o = i === -1 ? "" : t.slice(i);
		n.push(String(id(e, a)) + o);
	}
	return n.length > 0 ? n.join(", ") : t;
}
//#endregion
//#region src/composables/useImageSrc.ts
function od() {
	let e = Ut();
	return {
		imgSrc: (t) => id(e.value, t),
		imgSrcset: (t) => ad(e.value, t)
	};
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var sd = ["aria-label"], cd = ["src"], ld = { class: "upnext__body" }, ud = { class: "upnext__eyebrow" }, dd = { class: "upnext__title" }, fd = {
	key: 0,
	class: "upnext__cd numeric"
}, pd = { class: "upnext__actions" }, md = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, hd = ["r"], gd = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], _d = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let { t: n } = X(), { imgSrc: i } = od(), c = e, l = t, d = r(() => c.posterUrl ?? c.media.poster_url ?? null), f = r(() => Wu(c.remaining, c.total));
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
			}, null, 8, cd)) : a("", !0),
			s("div", ld, [
				s("p", ud, E(O(n)("player.upNext")), 1),
				s("h4", dd, E(e.media.name), 1),
				e.counting ? (x(), o("p", fd, E(O(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", pd, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => l("play-now")
				}, [u(J, { name: "play" }), s("span", null, E(O(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => l("cancel")
				}, E(O(n)("player.cancel")), 1)])
			]),
			e.counting ? (x(), o("svg", md, [s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, hd), s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": O(Uu),
				"stroke-dashoffset": f.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, gd)])) : a("", !0)
		], 8, sd));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), vd = {
	class: "transcode",
	role: "alert"
}, yd = { class: "transcode__card" }, bd = { class: "transcode__heading" }, xd = { class: "transcode__body" }, Sd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = X();
		return (t, i) => (x(), o("div", vd, [s("div", yd, [
			u(J, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", bd, E(O(r)("player.transcodeHeading")), 1),
			s("p", xd, E(e.title ? O(r)("player.transcodeBodyTitled", { title: e.title }) : O(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, E(O(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Cd = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, wd = { class: "prep__card" }, Td = { class: "prep__heading" }, Ed = { class: "prep__body" }, Dd = ["aria-valuenow"], Od = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = X(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (x(), o("div", Cd, [s("div", wd, [
			u(J, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", Td, E(O(n)("player.transcodePreparingHeading")), 1),
			s("p", Ed, E(e.title ? O(n)("player.transcodePreparingTitled", { title: e.title }) : O(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: _({ width: r() + "%" })
			}, null, 4)], 8, Dd),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, E(O(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), kd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			default: F(() => [p.value ? (x(), o("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: R(m, ["stop"])
			}, [s("span", null, E(p.value.label), 1), u(J, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Ad = ["aria-label"], jd = ["aria-label", "onClick"], Md = { class: "skip-controls__label" }, Nd = 5, Pd = 30, Fd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			let n = d(e.startMs), r = n - Nd, i = n + Pd;
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
			onClick: R((t) => _(e), ["stop"])
		}, [s("span", Md, E(h(e.type)), 1), u(J, { name: "skip-forward" })], 8, jd))), 128))], 8, Ad)) : a("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), Id = ["aria-label", "aria-expanded"], Ld = ["aria-label"], Rd = { class: "chapterlist__head" }, zd = { class: "chapterlist__title" }, Bd = ["aria-label"], Vd = ["onClick"], Hd = { class: "chapterlist__index" }, Ud = { class: "chapterlist__name" }, Wd = { class: "chapterlist__meta" }, Gd = { class: "chapterlist__time" }, Kd = {
	key: 0,
	class: "chapterlist__duration"
}, qd = {
	key: 1,
	class: "chapterlist__empty"
}, Jd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Ao(e.start), a;
			return e.end != null && e.end > e.start && (a = Ao(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = S(null), h = S(null);
		Vs(h, D(i, "open"), {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function _(e) {
			m.value && !m.value.contains(e.target) && d();
		}
		P(() => i.open, (e) => {
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
		}, [u(J, { name: "list" })], 10, Id), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(l)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", Rd, [s("h3", zd, E(O(l)("player.chapters")), 1), u(As, {
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
			s("span", Hd, E(e.index), 1),
			s("span", Ud, E(e.label), 1),
			s("span", Wd, [s("span", Gd, E(e.startLabel), 1), e.durationLabel ? (x(), o("span", Kd, "· " + E(e.durationLabel), 1)) : a("", !0)])
		], 8, Vd)]))), 128))], 8, Bd)) : (x(), o("p", qd, E(O(l)("player.noChapters")), 1))], 8, Ld)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Yd = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Xd = { class: "marker-timeline__ticks" }, Zd = [
	"title",
	"aria-label",
	"onClick"
], Qd = { class: "marker-timeline__tooltip" }, $d = { class: "marker-timeline__tooltip-label" }, ef = { class: "marker-timeline__tooltip-time numeric" }, tf = ["onClick"], nf = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, [h.value ? (x(), o("div", Yd, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), l(" " + E(v.value), 1)])) : a("", !0), s("div", Xd, [(x(!0), o(e, null, C(p.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: g(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: _({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${O(Ao)(e.startSec)}`,
			"aria-label": `${e.label} at ${O(Ao)(e.startSec)}`,
			onClick: R((t) => y(e), ["stop"])
		}, [s("span", Qd, [
			s("span", $d, E(e.label), 1),
			s("span", ef, E(O(Ao)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: R((t) => b(e), ["stop"])
			}, " Find similar ", 8, tf)
		])], 14, Zd))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), rf = ["aria-label", "aria-expanded"], af = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, of = ["aria-label"], sf = ["aria-selected", "onClick"], cf = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, [u(J, { name: "moon" }), m.value ? (x(), o("span", af, E(w(p.value)), 1)) : a("", !0)], 10, rf), u(n, { name: "dropdown" }, {
			default: F(() => [T.value ? (x(), o("ul", {
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
			}, E(e.label), 11, sf)), 64))], 8, of)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), lf = [
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
];
function uf(e, t) {
	return (e >>> t | e << 32 - t) >>> 0;
}
function df(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e.codePointAt(n);
		r > 65535 && (n += 1), r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >>> 6, 128 | r & 63) : r < 65536 ? t.push(224 | r >>> 12, 128 | r >>> 6 & 63, 128 | r & 63) : t.push(240 | r >>> 18, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63);
	}
	return t;
}
function ff(e) {
	let t = df(e), n = t.length * 8;
	for (t.push(128); t.length % 64 != 56;) t.push(0);
	let r = Math.floor(n / 4294967296), i = n % 4294967296;
	t.push(r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r & 255, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i & 255);
	let a = 1779033703, o = 3144134277, s = 1013904242, c = 2773480762, l = 1359893119, u = 2600822924, d = 528734635, f = 1541459225, p = /* @__PURE__ */ new Int32Array(64);
	for (let e = 0; e < t.length; e += 64) {
		for (let n = 0; n < 16; n += 1) {
			let r = e + n * 4;
			p[n] = (t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]) >>> 0;
		}
		for (let e = 16; e < 64; e += 1) {
			let t = (uf(p[e - 15], 7) ^ uf(p[e - 15], 18) ^ p[e - 15] >>> 3) >>> 0, n = (uf(p[e - 2], 17) ^ uf(p[e - 2], 19) ^ p[e - 2] >>> 10) >>> 0;
			p[e] = p[e - 16] + t + p[e - 7] + n >>> 0;
		}
		let n = a, r = o, i = s, m = c, h = l, g = u, _ = d, v = f;
		for (let e = 0; e < 64; e += 1) {
			let t = (uf(h, 6) ^ uf(h, 11) ^ uf(h, 25)) >>> 0, a = (h & g ^ ~h & _) >>> 0, o = v + t + a + lf[e] + p[e] >>> 0, s = ((uf(n, 2) ^ uf(n, 13) ^ uf(n, 22)) >>> 0) + ((n & r ^ n & i ^ r & i) >>> 0) >>> 0;
			v = _, _ = g, g = h, h = m + o >>> 0, m = i, i = r, r = n, n = o + s >>> 0;
		}
		a = a + n >>> 0, o = o + r >>> 0, s = s + i >>> 0, c = c + m >>> 0, l = l + h >>> 0, u = u + g >>> 0, d = d + _ >>> 0, f = f + v >>> 0;
	}
	return [
		a,
		o,
		s,
		c,
		l,
		u,
		d,
		f
	].map((e) => (e >>> 0).toString(16).padStart(8, "0")).join("");
}
function pf(e) {
	if (e === "") throw Error("hashGroupPassword: refusing to hash an empty password — omit the password_hash field instead");
	return ff(e);
}
//#endregion
//#region src/api/socketHint.ts
var mf = {
	wsUrl: null,
	wsPath: null
}, hf = /^wss?:\/\/[^/?#@]+$/i, gf = /^\/[^?#]*$/;
function _f(e) {
	if (typeof e != "object" || !e) return mf;
	let t = e;
	if (typeof t.wsUrl != "string" || !hf.test(t.wsUrl)) return mf;
	let n = typeof t.wsPath == "string" && gf.test(t.wsPath) ? t.wsPath.replace(/\/+$/, "") : null;
	return {
		wsUrl: t.wsUrl,
		wsPath: n
	};
}
function vf() {
	return typeof window > "u" ? mf : _f(window.__PHLIX__);
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
function yf(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function bf(e) {
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
function xf(e) {
	return JSON.stringify(e);
}
var Sf = .1, Cf = .99, wf = 1.01, Tf = class {
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
		this.driftRate = 1 + Sf * i / 1e3, this.driftRate = Math.min(wf, Math.max(Cf, this.driftRate));
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
}, Ef = class e {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new Tf(e.now);
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
		let t = bf(e);
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
		this.send(yf(e, t, this.now));
	}
};
//#endregion
//#region src/api/syncplay.ts
function Df(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function Of(e) {
	return e / 1e3;
}
function kf(e) {
	let t = Df(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function Af(e) {
	return e.group_id ?? e.id ?? "";
}
function jf(e) {
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
		lastSeen: kf(e.joined_at)
	})) : [];
}
function Mf(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function Nf(e) {
	let t = e ?? {}, n = Af(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: Df(t.member_count, jf(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: kf(t.created_at)
	};
}
function Pf(e) {
	let t = e ?? {}, n = Af(t), r = Mf(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: kf(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: Of(Df(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: Df(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: kf(t.last_activity_at),
		activeUsers: jf(t),
		roles: Object.fromEntries(jf(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var Ff = class {
	client;
	constructor(e) {
		this.client = new Ft({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new _t() : void 0
		});
	}
	async createRoom(e) {
		return Nf((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t, n) {
		let r = {};
		t !== void 0 && t !== "" && (r.memberName = t), n !== void 0 && n !== "" && (r.password = n);
		let i = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, Object.keys(r).length > 0 ? r : void 0);
		return {
			room: Nf(i.group),
			session: Pf(i.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return Pf((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return jf((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(Nf) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
};
function If(e) {
	if (!(e instanceof W) || e.status !== 400) return !1;
	let t = e.body;
	return typeof t == "object" && !!t && t.error === "Invalid password";
}
var Lf = null, Rf = null;
function zf(e) {
	return (!Lf || Rf !== e) && (Lf = new Ff(e), Rf = e), Lf;
}
var Bf = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, Vf = null;
function Hf(e) {
	Vf = e;
}
var Q = null, Uf = null, Wf = 0, Gf = 5, Kf = 1e3, $ = null, qf = null, Jf = null, Yf = null, Xf = null;
function Zf() {
	try {
		return typeof window > "u" ? null : new _t().getAccessToken();
	} catch {
		return null;
	}
}
function Qf(e) {
	let t = vf();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location.hostname : "localhost";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${n}:8097?room=${encodeURIComponent(e)}`;
}
function $f() {
	let e = Zf();
	return e ? ["bearer", e] : void 0;
}
function ep(e) {
	if ($) try {
		let t = JSON.parse(e.data);
		$.handleIncoming(t);
	} catch {}
}
function tp(e) {
	if (!(e && e.target !== Q)) if (Q = null, $ && $.onDisconnect(), Uf && Wf < Gf) {
		let e = Kf * 2 ** Wf;
		Wf++, Bf.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Wf})`), setTimeout(() => {
			Uf && rp(Uf);
		}, e);
	} else Wf >= Gf && (Bf.warn("[SyncPlay] Max reconnect attempts reached, giving up"), Uf = null, Wf = 0, $ = null);
}
function np(e, t, n, r, i) {
	Wf = 0, Yf = i ?? null, rp(e, t, n, r);
}
function rp(e, t, n, r) {
	if (t && (Xf = t), Q && Uf !== e) {
		let e = Q;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Q = null, Uf = null, $ = null;
	}
	if (Q && Uf === e) return;
	Uf = e;
	let i = n ?? qf ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Jf ?? "Anonymous";
	qf = i, Jf = a, $ = new Ef({
		send: (e) => {
			Q && Q.readyState === WebSocket.OPEN && Q.send(xf(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			Xf && Xf({
				type: e.type,
				position: Of(e.position),
				roomId: Uf ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			Xf && Xf({
				type: n ? "play" : "pause",
				position: Of(t),
				roomId: Uf ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			Bf.error(`[SyncPlay] Error: ${e} - ${t}`), Vf?.(e, t);
		},
		onInfo: (e) => {
			Bf.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = Qf(e);
	Bf.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, $f());
	} catch (e) {
		Bf.error("[SyncPlay] WebSocket constructor refused the handshake", e), tp();
		return;
	}
	Q = s, s.onopen = () => {
		Bf.log("[SyncPlay] WebSocket connected"), Wf = 0, $ && Uf && $.joinGroup(Uf, Yf ?? void 0);
	}, s.onmessage = ep, s.onclose = tp, s.onerror = (e) => {
		Bf.error("[SyncPlay] WebSocket error", e);
	};
}
function ip() {
	if (Q) {
		let e = Q;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), Q = null;
	}
	$ &&= ($.leaveGroup(), $.onDisconnect(), null), Uf = null, Wf = 0, Yf = null;
}
function ap(e) {
	!$ || !Q || Q.readyState !== WebSocket.OPEN || $.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function op(e) {
	if (!$ || !Q || Q.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return $.sendPlay(e.position ?? 0), !0;
		case "pause": return $.sendPause(e.position ?? 0), !0;
		case "seek": return e.position !== void 0 && ($.sendSeek(0, e.position), !0);
		case "sync": return e.position !== void 0 && ($.reportPosition(e.position, !0), !0);
	}
}
var sp = 5e3;
function cp() {
	let e = Kt().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var lp = class extends Error {
	commandType;
	constructor(e) {
		super(`SyncPlay '${e}' command was not delivered to the group`), this.commandType = e, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, up = z("phlix-syncplay", () => {
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
		e.state === "playing" && ap({
			sessionId: e.id,
			playbackPosition: s.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	function g() {
		_(), l = setInterval(h, sp);
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
	function b(n, r, a, o) {
		let { room: s, session: l } = r;
		t.value = l, c = Date.now(), e.value = {
			...e.value ?? {},
			...s,
			currentSession: l
		}, i.value = l.activeUsers, np(n, (e) => {
			T(e);
		}, void 0, a, o), g();
	}
	async function x(t, n) {
		o.value = !0, a.value = null;
		try {
			let r = zf(t), i = cp(), a = n.password !== void 0 && n.password.trim() !== "" ? n.password : void 0, o = a === void 0 ? void 0 : pf(a), s = await r.createRoom({
				name: n.name,
				...a === void 0 ? {} : { password: a },
				memberName: i
			});
			e.value = s, b(s.id, await r.joinRoom(s.id, i, a), i, o);
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to create the room", e;
		} finally {
			o.value = !1;
		}
	}
	async function C(e, t, n) {
		o.value = !0, a.value = null;
		try {
			let r = zf(e), i = cp(), a = n !== void 0 && n !== "" ? n : void 0, o = a === void 0 ? void 0 : pf(a);
			b(t, await r.joinRoom(t, i, a), i, o);
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
				await zf(n).leaveRoom(e.value.id), _(), ip(), e.value = null, t.value = null, i.value = [];
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
		if (t.value && !op({
			type: n,
			position: r?.position === void 0 ? void 0 : r.position * 1e3,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		})) throw a.value = "SyncPlay command was not delivered to the group", new lp(n);
	}
	async function D(e) {
		if (t.value) try {
			let n = await zf(e).getState(t.value.id);
			t.value = n, c = Date.now();
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function O(t) {
		if (e.value) try {
			let n = await zf(t).getMembers(e.value.id);
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
}), dp = {
	key: 0,
	class: "syncplay-overlay"
}, fp = { class: "syncplay-overlay__badge" }, pp = { class: "syncplay-overlay__label" }, mp = { class: "syncplay-overlay__status-label" }, hp = { class: "syncplay-overlay__members" }, gp = { class: "syncplay-overlay__member-count" }, _p = { class: "syncplay-overlay__member-list" }, vp = { class: "syncplay-overlay__member-name" }, yp = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, bp = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = X(), c = up(), d = Ut(), f = r(() => n.apiBase ?? d.value), p = r(() => c.currentRoom?.name ?? "SyncPlay"), m = r(() => c.onlineMembers.length), h = r(() => c.syncStatus), _ = r(() => {
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
		return (t, n) => O(c).isInRoom ? (x(), o("div", dp, [
			s("div", fp, [u(J, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", pp, "SyncPlay: " + E(p.value), 1)]),
			s("div", { class: g(["syncplay-overlay__status", `syncplay-overlay__status--${h.value}`]) }, [u(J, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", mp, E(_.value), 1)], 2),
			s("div", hp, [s("span", gp, [u(J, { name: "user" }), l(" " + E(O(i)("syncplay.members", { count: m.value })), 1)]), s("ul", _p, [(x(!0), o(e, null, C(O(c).onlineMembers.slice(0, 5), (e) => (x(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", vp, E(e.name), 1)]))), 128)), O(c).onlineMembers.length > 5 ? (x(), o("li", yp, " +" + E(O(c).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			u(Ll, {
				variant: "ghost",
				size: "sm",
				onClick: y
			}, {
				default: F(() => [l(E(O(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), xp = ["aria-label"], Sp = ["aria-checked", "tabindex"], Cp = ["aria-checked", "tabindex"], wp = {
	key: 0,
	class: "syncplay-modal__fields"
}, Tp = { class: "syncplay-modal__field" }, Ep = {
	class: "syncplay-modal__label",
	for: "room-name"
}, Dp = ["placeholder"], Op = { class: "syncplay-modal__field" }, kp = {
	class: "syncplay-modal__label",
	for: "room-password"
}, Ap = { class: "syncplay-modal__pw-wrap" }, jp = ["type"], Mp = ["aria-label", "aria-pressed"], Np = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, Pp = {
	key: 1,
	class: "syncplay-modal__fields"
}, Fp = { class: "syncplay-modal__field" }, Ip = {
	class: "syncplay-modal__label",
	for: "room-id"
}, Lp = ["placeholder"], Rp = { class: "syncplay-modal__field" }, zp = {
	class: "syncplay-modal__label",
	for: "room-password"
}, Bp = { class: "syncplay-modal__pw-wrap" }, Vp = [
	"type",
	"required",
	"aria-describedby"
], Hp = ["aria-label", "aria-pressed"], Up = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, Wp = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, Gp = {
	key: 3,
	class: "syncplay-modal__rooms"
}, Kp = { class: "syncplay-modal__rooms-title" }, qp = { class: "syncplay-modal__rooms-list" }, Jp = ["onClick"], Yp = { class: "syncplay-modal__room-name" }, Xp = { class: "syncplay-modal__room-count" }, Zp = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Qp = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let c = t, d = n, { t: p } = X(), m = up(), _ = Ut(), v = r(() => c.apiBase ?? _.value), y = S("create"), b = S(null), w = S(null);
		function T(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), y.value = "create", b.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), y.value = "join", w.value?.focus();
			}
		}
		let D = S(""), k = S(""), A = S(""), N = S(!1), L = S(!1), z = S(null), B = f("phlixConfig", null), V = S(!1), H = S(null), U = S([]), ee = S(!1), te = r(() => D.value.trim().length > 0), ne = r(() => k.value.trim().length > 0 && (!L.value || A.value !== "")), re = r(() => (y.value === "create" ? te.value : ne.value) && !V.value);
		P(() => c.modelValue, async (e) => {
			e && (H.value = null, D.value = "", A.value = "", N.value = !1, L.value = !1, c.prefilledRoomId ? (k.value = c.prefilledRoomId, y.value = "join") : (k.value = "", y.value = "create"), await ie());
		});
		async function ie() {
			ee.value = !0;
			try {
				let e = new Ff(v.value);
				U.value = await e.listGroups();
			} catch {
				U.value = [];
			} finally {
				ee.value = !1;
			}
		}
		async function ae() {
			if (re.value) {
				V.value = !0, H.value = null;
				try {
					y.value === "create" ? await m.createAndJoinRoom(v.value, {
						name: D.value.trim(),
						password: A.value
					}) : await m.joinRoom(v.value, k.value.trim(), A.value), m.currentRoom && d("joined", m.currentRoom), d("update:modelValue", !1);
				} catch (e) {
					y.value === "join" && If(e) ? (L.value = !0, H.value = pt("syncplay.invalid_password", B?.locale, null), h(() => z.value?.focus())) : H.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					V.value = !1;
				}
			}
		}
		function oe(e) {
			y.value = "join", k.value = e.id, D.value = e.name, e.isPublic || (L.value = !0);
		}
		function se() {
			d("update:modelValue", !1);
		}
		return (n, r) => (x(), i(Nl, {
			"model-value": t.modelValue,
			title: O(p)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[8] ||= (e) => d("update:modelValue", e),
			onClose: se
		}, {
			footer: F(() => [u(Ll, {
				variant: "ghost",
				type: "button",
				onClick: se
			}, {
				default: F(() => [l(E(O(p)("common.close")), 1)]),
				_: 1
			}), u(Ll, {
				variant: "solid",
				type: "button",
				loading: V.value,
				disabled: !re.value,
				onClick: ae
			}, {
				default: F(() => [l(E(y.value === "create" ? O(p)("syncplay.createRoom") : O(p)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: F(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: R(ae, ["prevent"])
			}, [
				s("div", {
					class: "syncplay-modal__tabs",
					role: "radiogroup",
					"aria-label": O(p)("syncplay.modeSelect"),
					onKeydown: T
				}, [s("button", {
					ref_key: "createOptionEl",
					ref: b,
					type: "button",
					role: "radio",
					class: g(["syncplay-modal__tab", { "is-active": y.value === "create" }]),
					"aria-checked": y.value === "create",
					tabindex: y.value === "create" ? 0 : -1,
					onClick: r[0] ||= (e) => y.value = "create"
				}, E(O(p)("syncplay.createRoom")), 11, Sp), s("button", {
					ref_key: "joinOptionEl",
					ref: w,
					type: "button",
					role: "radio",
					class: g(["syncplay-modal__tab", { "is-active": y.value === "join" }]),
					"aria-checked": y.value === "join",
					tabindex: y.value === "join" ? 0 : -1,
					onClick: r[1] ||= (e) => y.value = "join"
				}, E(O(p)("syncplay.joinRoom")), 11, Cp)], 40, xp),
				y.value === "create" ? (x(), o("div", wp, [s("div", Tp, [s("label", Ep, E(O(p)("syncplay.roomName")), 1), I(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => D.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(p)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Dp), [[M, D.value]])]), s("div", Op, [
					s("label", kp, E(O(p)("syncplay.roomPassword")), 1),
					s("div", Ap, [I(s("input", {
						id: "room-password",
						"onUpdate:modelValue": r[3] ||= (e) => A.value = e,
						type: N.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, jp), [[j, A.value]]), s("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": N.value ? O(p)("auth.hidePassword") : O(p)("auth.showPassword"),
						"aria-pressed": N.value,
						onClick: r[4] ||= (e) => N.value = !N.value
					}, [u(J, { name: N.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Mp)]),
					s("p", Np, E(O(p)("syncplay.passwordOptional")), 1)
				])])) : (x(), o("div", Pp, [s("div", Fp, [s("label", Ip, E(O(p)("syncplay.roomId")), 1), I(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[5] ||= (e) => k.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(p)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, Lp), [[M, k.value]])]), s("div", Rp, [
					s("label", zp, E(O(p)("syncplay.roomPassword")), 1),
					s("div", Bp, [I(s("input", {
						id: "room-password",
						ref_key: "passwordInputEl",
						ref: z,
						"onUpdate:modelValue": r[6] ||= (e) => A.value = e,
						type: N.value ? "text" : "password",
						class: "syncplay-modal__input",
						required: L.value,
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": L.value ? "room-password-hint" : void 0
					}, null, 8, Vp), [[j, A.value]]), s("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": N.value ? O(p)("auth.hidePassword") : O(p)("auth.showPassword"),
						"aria-pressed": N.value,
						onClick: r[7] ||= (e) => N.value = !N.value
					}, [u(J, { name: N.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Hp)]),
					L.value ? (x(), o("p", Up, E(O(p)("syncplay.lockedRoomHint")), 1)) : a("", !0)
				])])),
				H.value ? (x(), o("p", Wp, E(H.value), 1)) : a("", !0),
				y.value === "join" && U.value.length > 0 ? (x(), o("div", Gp, [s("h3", Kp, E(O(p)("syncplay.availableRooms")), 1), s("ul", qp, [(x(!0), o(e, null, C(U.value, (e) => (x(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => oe(e)
				}, [
					u(J, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", Yp, E(e.name), 1),
					e.isPublic ? a("", !0) : (x(), i(J, {
						key: 0,
						name: "lock",
						label: O(p)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					s("span", Xp, E(O(p)("syncplay.members", { count: e.memberCount })), 1)
				], 8, Jp)]))), 128))])])) : a("", !0),
				ee.value ? (x(), o("div", Zp, [u(J, { name: "spinner" }), s("span", null, E(O(p)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-919768e6"]]), $p = {
	key: 0,
	class: "syncplay-controls"
}, em = ["aria-label"], tm = { class: "syncplay-controls__wait-label" }, nm = { class: "syncplay-controls__transport" }, rm = ["aria-label"], im = ["aria-label"], am = ["aria-label"], om = { class: "syncplay-controls__status-label" }, sm = 10, cm = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let n = e, i = t, { t: c } = X(), l = up(), d = It(), p = f("phlixConfig", null), m = Ut(), h = r(() => n.apiBase ?? m.value);
		Hf((e) => {
			d.error(pt(e, p?.locale, c("syncplay.commandRejected")));
		}), b(() => Hf(null));
		let _ = S(!1), v = r(() => _.value || l.syncStatus === "re-syncing");
		async function y() {
			if (l.isInRoom) try {
				await l.sendCommand(h.value, "play"), i("play");
			} catch {
				d.error(c("syncplay.commandFailed"));
			}
		}
		async function C() {
			if (l.isInRoom) try {
				await l.sendCommand(h.value, "pause"), i("pause");
			} catch {
				d.error(c("syncplay.commandFailed"));
			}
		}
		async function w() {
			n.isPlaying ? await C() : await y();
		}
		async function T(e) {
			if (l.isInRoom) try {
				await l.sendCommand(h.value, "seek", { position: e }), i("seek", e);
			} catch {
				d.error(c("syncplay.commandFailed"));
			}
		}
		async function D() {
			await T(Math.max(0, n.position - sm));
		}
		async function k() {
			await T(Math.min(n.duration, n.position + sm));
		}
		return P(() => l.syncStatus, (e) => {
			e === "re-syncing" ? _.value = !0 : e === "synced" && (_.value = !1);
		}), (t, n) => O(l).isInRoom ? (x(), o("div", $p, [
			v.value ? (x(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": O(c)("syncplay.waitingForMembers")
			}, [u(J, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), s("span", tm, E(O(c)("syncplay.waitingForMembers")), 1)], 8, em)) : a("", !0),
			s("div", nm, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.rewind"),
					onClick: D
				}, [u(J, { name: "rewind" })], 8, rm),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? O(c)("syncplay.pauseAll") : O(c)("syncplay.playAll"),
					onClick: w
				}, [u(J, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, im),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.fastForward"),
					onClick: k
				}, [u(J, { name: "forward" })], 8, am)
			]),
			s("div", { class: g(["syncplay-controls__status", `syncplay-controls__status--${O(l).syncStatus}`]) }, [u(J, {
				name: O(l).syncStatus === "synced" ? "check" : O(l).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", om, E(O(l).syncStatus === "synced" ? O(c)("syncplay.synced") : O(l).syncStatus === "outOfSync" ? O(c)("syncplay.outOfSync") : O(c)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-338c0ffc"]]);
//#endregion
//#region src/utils/subtitleSrc.ts
function lm(e, t) {
	return String(id(e, t));
}
function um(e, t) {
	let n = !1, r = t.map((t) => {
		let r = lm(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
//#endregion
//#region src/components/Player.vue?vue&type=script&setup=true&lang.ts
var dm = { class: "player__stage" }, fm = ["src", "poster"], pm = [
	"src",
	"srclang",
	"label"
], mm = { class: "player__meta" }, hm = ["aria-label"], gm = { class: "player__meta-text" }, _m = { class: "player__eyebrow" }, vm = { class: "player__title" }, ym = { class: "player__sub numeric" }, bm = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, xm = {
	key: 0,
	class: "player__center"
}, Sm = ["aria-label"], Cm = ["aria-label"], wm = ["aria-label"], Tm = { class: "player__btnrow" }, Em = ["aria-label"], Dm = ["aria-label"], Om = ["aria-label"], km = { class: "player__time numeric" }, Am = ["aria-label", "aria-pressed"], jm = ["title"], Mm = ["aria-label"], Nm = ["aria-label"], Pm = ["aria-label", "aria-pressed"], Fm = ["aria-label", "aria-pressed"], Im = ["aria-label"], Lm = { class: "similar-modal" }, Rm = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, zm = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Bm = { class: "similar-modal__state-title" }, Vm = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Hm = {
	key: 3,
	class: "similar-modal__results"
}, Um = { class: "similar-modal__poster" }, Wm = ["src", "alt"], Gm = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Km = { class: "similar-modal__result-body" }, qm = { class: "similar-modal__result-title" }, Jm = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Ym = { key: 0 }, Xm = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let { imgSrc: c } = od(), d = t, p = n, m = ue(), _ = ne(), { t: b } = X(), w = up(), T = tn(), D = r(() => T.isFavorite(d.media.id)), k = r(() => T.likeLevel(d.media.id));
		function A() {
			T.toggleFavorite(d.media.id, ge());
		}
		function j(e) {
			T.setLike(d.media.id, e, ge());
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
		], N = S(null), I = S(null), L = S(null), z = S(!0), B = S(!1), V = S(!1), H = S(!1), U = S(!1), ee = S(!1), te = S(!1), re = S(null), ie = S(null), ae = S(!1), oe = It(), se = S(!1);
		function ce(e) {
			oe.success(b("syncplay.joinedRoom", { name: e.name }));
		}
		let le = r(() => U.value ? 1.35 : 1), W = S(Pu(d.streamUrl, d.media.path)), de = r(() => Xu(d.media.streams)), fe = 0;
		async function pe() {
			let e = ++fe;
			if (W.value) return;
			let t = await nd([d.streamUrl, d.media.path], d.playbackAudioTracks ?? [], de.value);
			e === fe && (!t || W.value || (W.value = !0, Te(N.value?.currentTime ?? 0)));
		}
		P([() => d.playbackAudioTracks, de], () => {
			pe();
		}, { immediate: !0 });
		let me = f("phlixConfig", null), he = f("resumeReporter", null), G = !1;
		function ge() {
			return me?.apiBase ?? "";
		}
		let K = ws({
			apiBase: () => d.apiBase ?? "",
			hlsConfig: me?.playerHlsConfig
		}), _e = Os({ apiBase: () => d.apiBase ?? "" }), ve = null;
		function ye(e) {
			ve !== null && clearTimeout(ve), ve = setTimeout(() => {
				ve = null, _e.fetch(e);
			}, 0);
		}
		let be = r(() => d.thumbnailAt ?? _e.thumbnailAt), xe = r(() => W.value ? void 0 : d.streamUrl), Se = r(() => W.value && K.state.value !== "ready"), Ce = r(() => W.value && (K.state.value === "preparing" || K.state.value === "idle")), we = r(() => W.value && K.state.value === "error");
		function Te(e = 0) {
			let t = N.value, n = navigator.connection?.downlinkMax, r = _s(n);
			t && K.start(t, d.media.id, r, e);
		}
		function Ee(e) {
			if (m.quality === "original" && e !== "auto") {
				K.loadVariantPlaylist(vc);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				K.loadVariantPlaylist(e);
				return;
			}
			K.setLevel(e);
		}
		let De = !1;
		function Oe() {
			_.defaultQuality = _c;
		}
		function ke() {
			let e = K.levels.value;
			if (e.length === 0) return !1;
			let t = _.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = K.variants.value;
				if (!t || t.length === 0) return !1;
				if (Tc(e, t)) K.loadVariantPlaylist(vc);
				else {
					let t = wc(e);
					t >= 0 && K.setNextLevel(t), Oe();
				}
				return !0;
			}
			let n = Sc(e, t);
			return n >= 0 ? K.setNextLevel(n) : Oe(), !0;
		}
		P(() => K.levels.value, (e) => {
			De || e.length === 0 || ke() && (De = !0);
		}), P(() => K.variants.value, (e) => {
			De || !e?.length || h(() => {
				De || ke() && (De = !0);
			});
		}, { deep: !0 });
		let Ae = S(m.resumePositionFor(d.media.id) ?? 0), je = S(!W.value && Ae.value > 0), Me = null, Ne = S(!1), Pe = S(8), Fe, Ie = S(null), Le = S(0), Re = S(!1), ze = S([]), Be = S(!1), Ve = S(null);
		function He(e, t) {
			Ie.value = e, Le.value = t, ze.value = [], Ve.value = null, Re.value = !0, qe(e, t);
		}
		let Ue = null, We = null, Ge = null;
		function Ke() {
			let e = d.apiBase ?? "";
			return (We === null || Ge !== e) && (We = new Ft({ baseUrl: e }), Ge = e), We;
		}
		async function qe(e, t) {
			Ue?.abort(), Ue = new AbortController(), Be.value = !0, Ve.value = null;
			try {
				let n = await Ke().searchByMarker(e, t, 30, 20, Ue.signal);
				ze.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Ve.value = "Failed to load similar media. Please try again.", ze.value = [];
			} finally {
				Be.value = !1;
			}
		}
		function Je() {
			Ue?.abort(), Re.value = !1, ze.value = [], Ve.value = null, Ie.value = null;
		}
		let Ye = r(() => m.upNext);
		function Xe() {
			W.value = Pu(d.streamUrl, d.media.path), pe(), Ae.value = m.resumePositionFor(d.media.id) ?? 0, je.value = !W.value && Ae.value > 0, Me = null, Wt = !1, At = !1, Dt.value = [], Et.value = !1, jt = !1, bt.value = -1, zt = null, De = !1, G = !1, ft(), ot = !1, lt = 0, ct = 0, et(), Ne.value = !1, K.reset(), N.value && (N.value.currentTime = 0), W.value && Te(), ye(d.media.id);
		}
		function Ze(e) {
			let t = N.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Me = Math.max(0, e));
		}
		function Qe() {
			Ze(Ae.value), je.value = !1, N.value?.play()?.catch(() => {});
		}
		function $e() {
			Me = null, Ze(0), m.clearResume(d.media.id), je.value = !1, N.value?.play()?.catch(() => {});
		}
		function et() {
			Fe &&= (clearInterval(Fe), void 0);
		}
		function tt() {
			Pe.value = 8, et(), Fe = setInterval(() => {
				--Pe.value, Pe.value <= 0 && (et(), rt());
			}, 1e3);
		}
		function nt() {
			G || (G = !0, he?.finish()), Tn(), z.value = !0, m.upNext && (Ne.value = !0, _.autoplay && tt());
		}
		function rt() {
			et(), Ne.value = !1;
			let e = m.next(d.streamUrlFor);
			e && p("play-next", e);
		}
		function it() {
			et(), Ne.value = !1;
		}
		function at() {
			if (W.value) return;
			let e = N.value, t = Iu(e) && (e?.currentTime ?? 0) === 0;
			(Fu(e) || t) && (ut(), ft(), W.value = !0, Te(e?.currentTime ?? 0));
		}
		let ot = !1, st = null, ct = 0, lt = 0;
		function ut() {
			if (ot) return;
			ot = !0;
			let e = d.media?.id;
			e != null && e !== "" && Ke().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, zu({ videoCodec: de.value })).catch(() => {});
		}
		function dt() {
			if (st !== null || ot || W.value) return;
			let e = N.value;
			e && (ct = Date.now(), lt = e.currentTime, st = setTimeout(() => {
				st = null;
				let e = N.value;
				!e || W.value || Bu(Date.now(), ct, e.currentTime, lt) && (ut(), W.value = !0, Te(e.currentTime));
			}, Lu));
		}
		function ft() {
			st !== null && (clearTimeout(st), st = null);
		}
		let pt = S([]), mt = S([]), ht = S(-1), gt = S(!1), _t = r(() => K.state.value === "ready" && K.audioTracks.value.length > 0), vt = r(() => K.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), yt = r(() => (d.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), bt = S(-1), xt = r(() => !_t.value && !W.value && mt.value.length === 0 && yt.value.length > 1), St = r(() => _t.value ? vt.value : xt.value ? yt.value : mt.value), q = r(() => {
			if (_t.value) return K.currentAudioTrack.value;
			if (xt.value) {
				if (bt.value >= 0) return bt.value;
				let e = (d.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : d.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return ht.value;
		}), Ct = S(!1), wt = m.subtitleLang, Tt = r(() => {
			let e = d.apiBase ?? "", t = W.value ? K.subtitleTracks.value : um(e, d.playbackSubtitleTracks ?? []);
			if (Dt.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = um(e, Dt.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
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
		let At = !1, jt = !1;
		function Mt() {
			if (At) return;
			if (_.subtitlePreferenceSet) {
				At = !0;
				return;
			}
			let e = Tt.value.find((e) => e.default);
			if (!e) return;
			let t = pt.value.find((t) => t.language === (e.language || e.label));
			t && (m.setSubtitle(t.language), wt = t.language, At = !0);
		}
		function Nt() {
			if (jt) return;
			let e = _.defaultAudioLang;
			if (!e) return;
			let t = St.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = q.value;
			r >= 0 && r < t.length || (Bt(n), jt = !0);
		}
		let Pt = r(() => pt.value.some((e) => e.language === m.subtitleLang));
		function Lt() {
			let e = N.value;
			pt.value = Mc(e), mt.value = Nc(e), ht.value = Rc(e), Mt(), Nt();
		}
		function Rt() {
			if (Pt.value) wt = m.subtitleLang, m.setSubtitle(null);
			else {
				let e = wt && pt.value.some((e) => e.language === wt) ? wt : pt.value[0]?.language ?? null;
				m.setSubtitle(e);
			}
			p("captions");
		}
		let zt = null;
		function Bt(e) {
			if (_t.value) K.setAudioTrack(e);
			else if (xt.value) {
				if (e === q.value) return;
				bt.value = e, zt = e, W.value = !0, Te(N.value?.currentTime ?? 0);
			} else Lc(N.value, e), ht.value = e;
		}
		P(_t, (e) => {
			if (!e || zt === null) return;
			let t = zt;
			zt = null, t >= 0 && t < K.audioTracks.value.length && K.setAudioTrack(t);
		}), P(Tt, () => {
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
			if (!d.autoplay || Wt || je.value || Se.value) return;
			let e = N.value;
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
			let e = N.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Xt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Zt() {
			m.play(), m.setMediaPositionState(), dt();
		}
		function Qt() {
			m.pause(), m.setMediaPositionState();
		}
		function $t() {
			let e = N.value;
			e && (st !== null && e.currentTime > lt && ft(), m.updateProgress(e.currentTime, e.duration, Xt(e)), w.isInRoom && w.updateLocalPosition(e.currentTime));
		}
		function en() {
			let e = N.value;
			e && (e.volume = m.volume, e.muted = m.muted, e.playbackRate = m.rate, Me !== null && (e.currentTime = e.duration ? Math.min(e.duration, Me) : Me, Me = null), m.updateProgress(e.currentTime, e.duration, Xt(e)), m.setMediaPositionState(), Lt());
		}
		function nn() {
			let e = N.value;
			e && m.updateProgress(e.currentTime, e.duration, Xt(e));
		}
		function rn() {
			let e = N.value;
			e && (Math.abs(e.volume - m.volume) > .001 && m.setVolume(e.volume), e.muted !== m.muted && m.toggleMute());
		}
		function an() {
			let e = N.value;
			e && e.playbackRate !== m.rate && m.setRate(e.playbackRate), m.setMediaPositionState();
		}
		function on() {
			m.setMediaPositionState();
		}
		function sn() {
			m.setMediaPositionState();
		}
		function cn(e) {
			let t = N.value;
			t && m.duration > 0 && (t.currentTime = Math.min(m.duration, Math.max(0, e)));
		}
		function ln(e) {
			cn(m.position + e);
		}
		function un() {
			V.value = !0, Dn();
		}
		function dn() {
			V.value = !1, Dn();
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
			re.value?.toggleOpen();
		}
		let gn = null;
		function _n() {
			let e = N.value;
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
		Js({
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
				H.value = !H.value;
			},
			toggleQuality: () => {
				W.value ? (ae.value = !ae.value, ie.value?.toggleMenu?.()) : oe.show({
					message: b("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !H.value && !gt.value && !Ct.value });
		function vn() {
			m.toggleMute();
		}
		function yn() {
			U.value = !U.value, p("theater", U.value);
		}
		P(() => m.muted, (e) => {
			let t = N.value;
			t && t.muted !== e && (t.muted = e);
		}), P(() => m.volume, (e) => {
			let t = N.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), P(() => m.rate, (e) => {
			let t = N.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), P(() => m.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Ze(e.value) : e.type === "seekBy" && Ze(m.position + e.value));
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
			let e = N.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			p("pip");
		}
		function Cn() {
			ee.value = !0;
		}
		function wn() {
			ee.value = !1;
		}
		function Tn() {
			Ht &&= (clearTimeout(Ht), void 0);
		}
		function En() {
			Tn(), !(!m.playing || V.value) && (Ht = setTimeout(() => {
				m.playing && !V.value && (z.value = !1);
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
		P(z, (e) => {
			typeof document > "u" || (jn(e), !e && document.activeElement instanceof HTMLElement && I.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), P(() => m.playing, (e) => {
			e ? (je.value = !1, it(), En()) : (Tn(), z.value = !0);
		});
		let Mn = null;
		y(() => {
			m.setCurrent(d.media, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), T.hydrate(d.media), typeof document < "u" && (document.addEventListener("fullscreenchange", xn), te.value = document.pictureInPictureEnabled === !0), Mn = m.bindMediaSession({
				onPlay: () => void N.value?.play()?.catch(() => {}),
				onPause: () => N.value?.pause(),
				onSeek: (e) => cn(e)
			}), Vt = N.value?.textTracks ?? null, Vt?.addEventListener?.("addtrack", Lt), Vt?.addEventListener?.("removetrack", Lt), Lt(), W.value && Te(), ye(d.media.id);
		}), P(() => d.media, (e) => {
			m.setCurrent(e, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), Xe();
		}), P(() => d.media?.id, () => {
			T.hydrate(d.media);
		}), P(() => w.currentSession, (e) => {
			e && (e.state === "playing" ? (N.value?.play(), m.play()) : e.state === "paused" && (N.value?.pause(), m.pause()), w.updateLocalPosition(m.position), Math.abs(w.driftAmount) > 2 && Ze(e.playbackPosition));
		});
		let Nn = null;
		return P(() => w.pendingPlayMedia, async (e) => {
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
				}), N.value?.play(), m.play(), w.consumePendingPlayMedia(), Nn = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			Nn !== n && (Nn = n, p("pending-media", e.mediaId, e.title));
		}), v(() => {
			he?.reportFinal?.(), Tn(), et(), K.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", xn), Mn?.(), Vt?.removeEventListener?.("addtrack", Lt), Vt?.removeEventListener?.("removetrack", Lt), gn !== null && (clearInterval(gn), gn = null), ve !== null && (clearTimeout(ve), ve = null), ft();
		}), (n, r) => (x(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: g(["player", {
				"is-chrome-hidden": !z.value,
				"is-theater": U.value
			}]),
			onPointermove: Dn,
			onPointerdown: Dn,
			onFocusin: Dn
		}, [u(wu, {
			video: N.value,
			enabled: O(_).atmosphere,
			playing: O(m).playing,
			"reduced-motion": O(_).effectiveReducedMotion,
			intensity: le.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), s("div", dm, [
			s("video", {
				ref_key: "videoRef",
				ref: N,
				class: "player__video",
				src: xe.value,
				poster: O(c)(t.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Zt,
				onPause: Qt,
				onTimeupdate: $t,
				onLoadedmetadata: en,
				onCanplay: Kt,
				onProgress: nn,
				onVolumechange: rn,
				onRatechange: an,
				onSeeked: on,
				onDurationchange: sn,
				onEnded: nt,
				onError: at,
				onEnterpictureinpicture: Cn,
				onLeavepictureinpicture: wn,
				onClick: Yt
			}, [(x(!0), o(e, null, C(Tt.value, (e) => (x(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, pm))), 128))], 40, fm),
			r[22] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[23] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", mm, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": O(b)("player.back"),
				onClick: r[0] ||= R((e) => p("back"), ["stop"])
			}, [u(J, { name: "arrow-left" })], 8, hm), s("div", gm, [
				s("p", _m, E(O(b)("player.nowPlaying")), 1),
				s("h2", vm, E(t.media.name), 1),
				s("div", ym, [(x(!0), o(e, null, C(Ut.value, (t, n) => (x(), o(e, { key: n }, [n > 0 && !t.cert ? (x(), o("span", bm, "·")) : a("", !0), s("span", { class: g({ player__cert: t.cert }) }, E(t.text), 3)], 64))), 128))])
			])]),
			Se.value ? a("", !0) : (x(), o("div", xm, [
				z.value ? (x(), o("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": O(b)("player.seekBackward"),
					onClick: r[1] ||= R((e) => ln(-10), ["stop"])
				}, [u(J, { name: "rewind" }), s("span", { class: "player__center-skip-count" }, E(10))], 8, Sm)) : a("", !0),
				s("button", {
					type: "button",
					class: g(["player__bigplay", { "is-playing": O(m).playing }]),
					"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
					onClick: R(Yt, ["stop"])
				}, [u(J, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Cm),
				z.value ? (x(), o("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": O(b)("player.seekForward"),
					onClick: r[2] ||= R((e) => ln(10), ["stop"])
				}, [u(J, { name: "forward" }), s("span", { class: "player__center-skip-count" }, E(10))], 8, wm)) : a("", !0)
			])),
			u(Qc, {
				video: N.value,
				language: O(m).subtitleLang,
				"style-config": O(_).captionStyle,
				lifted: z.value,
				"controls-root": L.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted",
				"controls-root"
			]),
			Se.value ? a("", !0) : (x(), o("div", {
				key: 1,
				ref_key: "controlsRef",
				ref: L,
				class: "player__controls",
				onClick: r[9] ||= R(() => {}, ["stop"])
			}, [
				u(Yo, {
					position: O(m).position,
					duration: O(m).duration,
					buffered: O(m).buffered,
					chapters: t.chapters,
					"thumbnail-at": be.value,
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
				O(_).showMarkerTimeline && t.markers && t.markers.length > 0 ? (x(), i(nf, {
					key: 0,
					position: O(m).position,
					duration: O(m).duration,
					markers: t.markers,
					onSeek: cn,
					onSimilar: He
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", Tm, [
					t.prevEpisode ? (x(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.previousEpisode"),
						onClick: qt
					}, [u(J, { name: "skip-back" })], 8, Em)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
						onClick: Yt
					}, [u(J, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Dm),
					t.nextEpisode ? (x(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.nextEpisode"),
						onClick: Jt
					}, [u(J, { name: "skip-forward" })], 8, Om)) : a("", !0),
					s("span", km, [
						l(E(O(Ao)(O(m).position)), 1),
						r[18] ||= s("span", { class: "player__sep" }, " / ", -1),
						l(E(O(Ao)(O(m).duration)), 1)
					]),
					r[19] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__favorite", { "is-on": D.value }]),
						"aria-label": D.value ? O(b)("itemActions.removeFavorite") : O(b)("itemActions.addFavorite"),
						"aria-pressed": D.value ? "true" : "false",
						onClick: A
					}, [u(J, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Am),
					u(ko, {
						level: k.value,
						onCycle: j
					}, null, 8, ["level"]),
					u(sc),
					u(gc),
					u(Dc, {
						ref_key: "qualityMenuRef",
						ref: ie,
						open: ae.value,
						"onUpdate:open": r[3] ||= (e) => ae.value = e,
						levels: O(K).levels.value,
						variants: O(K).variants.value,
						"current-level": O(K).currentLevel.value,
						"auto-enabled": O(K).autoEnabled.value,
						"active-height": O(K).activeLevelHeight.value,
						onSelect: Ee
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					W.value ? a("", !0) : (x(), o("span", {
						key: 2,
						class: "player__direct-badge",
						title: O(b)("player.qualityDirectStream")
					}, E(O(b)("player.directStream")), 9, jm)),
					u(Dl, {
						open: gt.value,
						"onUpdate:open": r[4] ||= (e) => gt.value = e,
						tracks: pt.value,
						"audio-tracks": St.value,
						"active-audio": q.value,
						onSelectAudio: Bt,
						onAddSubtitles: r[5] ||= (e) => Et.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					u(Jd, {
						open: Ct.value,
						"onUpdate:open": r[6] ||= (e) => Ct.value = e,
						chapters: t.chapters ?? [],
						onSeek: cn
					}, null, 8, ["open", "chapters"]),
					u(cf, {
						ref_key: "sleepTimerRef",
						ref: re,
						"on-expire": _n
					}, null, 512),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__syncplay", { "is-on": O(w).isInRoom }]),
						"aria-label": O(w).isInRoom ? O(b)("syncplay.inRoom") : O(b)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[7] ||= (e) => se.value = !0
					}, [u(J, { name: "user" })], 10, Mm),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[8] ||= (e) => H.value = !0
					}, [u(J, { name: "info" })], 8, Nm),
					te.value ? (x(), o("button", {
						key: 3,
						type: "button",
						class: g(["player__iconbtn", { "is-on": ee.value }]),
						"aria-label": ee.value ? O(b)("player.exitPip") : O(b)("player.pip"),
						"aria-pressed": ee.value,
						onClick: Sn
					}, [u(J, { name: "pip" })], 10, Pm)) : a("", !0),
					s("button", {
						type: "button",
						class: g(["player__iconbtn", { "is-on": U.value }]),
						"aria-label": U.value ? O(b)("player.exitTheater") : O(b)("player.theater"),
						"aria-pressed": U.value,
						onClick: yn
					}, [u(J, { name: "theater" })], 10, Fm),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": B.value ? O(b)("player.exitFullscreen") : O(b)("player.fullscreen"),
						onClick: bn
					}, [u(J, { name: B.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Im)
				])
			], 512)),
			Se.value ? a("", !0) : (x(), i(kd, {
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
			Se.value ? a("", !0) : (x(), i(Fd, {
				key: 3,
				position: O(m).position,
				markers: t.markers,
				onSkip: cn
			}, null, 8, ["position", "markers"])),
			je.value && !Se.value ? (x(), i(ku, {
				key: 4,
				seconds: Ae.value,
				onResume: Qe,
				onRestart: $e
			}, null, 8, ["seconds"])) : a("", !0),
			Ne.value && Ye.value && !Se.value ? (x(), i(_d, {
				key: 5,
				media: Ye.value,
				remaining: Pe.value,
				total: O(8),
				counting: O(_).autoplay,
				onPlayNow: rt,
				onCancel: it
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			u(Nl, {
				modelValue: Re.value,
				"onUpdate:modelValue": r[10] ||= (e) => Re.value = e,
				title: `Similar ${Ie.value ?? "marker"}s`,
				size: "lg",
				onClose: Je
			}, {
				default: F(() => [s("div", Lm, [Be.value ? (x(), o("div", Rm, [u(Ul, { label: "Finding similar media" })])) : Ve.value ? (x(), o("div", zm, [u(J, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", Bm, E(Ve.value), 1)])) : !Be.value && ze.value.length === 0 ? (x(), o("div", Vm, [
					u(J, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[20] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[21] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (x(), o("ul", Hm, [(x(!0), o(e, null, C(ze.value, (e) => (x(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", Um, [e.poster_url ? (x(), o("img", {
					key: 0,
					src: O(c)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Wm)) : (x(), o("div", Gm, [u(J, { name: "film" })]))]), s("div", Km, [s("p", qm, E(e.name), 1), e.year ? (x(), o("p", Jm, [l(E(e.year) + " ", 1), e.runtime ? (x(), o("span", Ym, " · " + E(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ce.value ? (x(), i(Od, {
				key: 6,
				title: t.media.name,
				progress: O(K).progress.value,
				onBack: r[11] ||= (e) => p("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			we.value ? (x(), i(Sd, {
				key: 7,
				title: t.media.name,
				onBack: r[12] ||= (e) => p("back")
			}, null, 8, ["title"])) : a("", !0),
			O(w).isInRoom ? (x(), i(cm, {
				key: 8,
				position: O(m).position,
				duration: O(m).duration,
				"is-playing": O(m).playing,
				onSeek: cn,
				onPlay: r[13] ||= (e) => void N.value?.play(),
				onPause: r[14] ||= (e) => void N.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			O(w).isInRoom ? (x(), i(bp, { key: 9 })) : a("", !0),
			u(Qp, {
				modelValue: se.value,
				"onUpdate:modelValue": r[15] ||= (e) => se.value = e,
				onJoined: ce
			}, null, 8, ["modelValue"]),
			u(rc, {
				open: H.value,
				onClose: r[16] ||= (e) => H.value = !1
			}, null, 8, ["open"]),
			u(pu, {
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
}), [["__scopeId", "data-v-e09b4f44"]]), Zm = ["aria-label"], Qm = ["src", "poster"], $m = { class: "mini__body" }, eh = { class: "mini__title" }, th = { class: "mini__controls" }, nh = ["aria-label"], rh = ["aria-label", "aria-pressed"], ih = ["aria-label"], ah = ["aria-label"], oh = {
	class: "mini__progress",
	"aria-hidden": "true"
}, sh = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let { imgSrc: c } = od(), l = t, d = ue(), { t: p } = X(), m = S(null), h = S(null), b = f("resumeReporter", null), C = !1, w = tn(), T = f("phlixConfig", null), D = r(() => d.current ? w.isFavorite(d.current.id) : !1);
		function k() {
			let e = d.current?.id;
			e && w.toggleFavorite(e, T?.apiBase ?? "");
		}
		let A = r(() => d.miniPlayer && !!d.current && (!!d.streamUrl || !!d.hlsMasterUrl)), j = r(() => d.current?.name ?? ""), M = r(() => Math.max(0, Math.min(1, d.progress)));
		function N() {
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
		function V() {
			d.current && l("expand", d.current.id);
		}
		function H() {
			b?.reportFinal?.(), d.closePlayer();
		}
		let U = 0;
		async function ee() {
			let e = m.value;
			if (!e || !d.hlsMasterUrl) return;
			let t = ++U, n = d.hlsMasterUrl;
			h.value?.destroy(), h.value = null;
			let r = await is(e, n, {
				startPosition: d.position,
				onReady: () => {
					let e = m.value;
					e && (e.volume = d.volume, e.muted = d.muted, e.playbackRate = d.rate, d.playing && e.play()?.catch(() => {}));
				}
			});
			if (t !== U || !A.value || d.hlsMasterUrl !== n) {
				r.destroy();
				return;
			}
			h.value = r;
		}
		return P(() => A.value, async (e) => {
			if (!e) {
				h.value?.destroy(), h.value = null;
				return;
			}
			!d.hlsMasterUrl || d.streamUrl || await ee();
		}, { flush: "post" }), y(async () => {
			A.value && d.hlsMasterUrl && !d.streamUrl && await ee();
		}), P(() => d.current?.id, () => {
			C = !1;
		}), P(() => d.playing, (e) => {
			let t = m.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), P(() => d.lastCommand, (e) => {
			let t = m.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : d.position + e.value, r = t.duration && t.duration > 0 ? t.duration : d.duration, i = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = i, d.updateProgress(i, t.duration || void 0);
		}), v(() => {
			b?.reportFinal?.(), U++, h.value?.destroy(), h.value = null, m.value?.pause?.();
		}), (e, t) => (x(), i(n, { name: "mini" }, {
			default: F(() => [A.value ? (x(), o("div", {
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
					onLoadedmetadata: N,
					onPlay: I,
					onPause: L,
					onTimeupdate: R,
					onEnded: z,
					onClick: V
				}, null, 40, Qm),
				s("div", $m, [s("p", eh, E(j.value), 1), s("div", th, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(d).playing ? O(p)("player.pause") : O(p)("player.play"),
						onClick: B
					}, [u(J, { name: O(d).playing ? "pause" : "play" }, null, 8, ["name"])], 8, nh),
					O(d).current ? (x(), o("button", {
						key: 0,
						type: "button",
						class: g(["mini__btn mini__btn--favorite", { "is-on": D.value }]),
						"aria-label": D.value ? O(p)("itemActions.removeFavorite") : O(p)("itemActions.addFavorite"),
						"aria-pressed": D.value ? "true" : "false",
						onClick: k
					}, [u(J, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, rh)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(p)("player.expand"),
						onClick: V
					}, [u(J, { name: "expand" })], 8, ih),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": O(p)("player.closePlayer"),
						onClick: H
					}, [u(J, { name: "x" })], 8, ah)
				])]),
				s("div", oh, [s("div", {
					class: "mini__progress-fill",
					style: _({ transform: `scaleX(${M.value})` })
				}, null, 4)])
			], 8, Zm)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-6721ee35"]]);
//#endregion
export { hu as AMBIENT_SAMPLE_H, gu as AMBIENT_SAMPLE_INTERVAL_MS, mu as AMBIENT_SAMPLE_W, Us as ARROW_ICONS, Ws as ARROW_LABELS, wu as AmbientCanvas, qc as CAPTION_BACKGROUND_OPTIONS, Kc as CAPTION_COLOR_OPTIONS, Jc as CAPTION_EDGE_OPTIONS, Gc as CAPTION_SIZE_OPTIONS, Wc as CAPTION_SIZE_SCALE, Qc as CaptionOverlay, Dl as CaptionsMenu, Au as DIRECT_PLAY_EXTENSIONS, sh as MiniPlayer, Hs as PLAYER_SHORTCUTS, Xm as Player, Dc as QualityMenu, ie as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, ku as ResumePrompt, Yo as Scrubber, rc as ShortcutsHelp, kd as SkipButton, gc as SpeedMenu, pu as SubtitleSearch, ju as TRANSCODE_EXTENSIONS, Sd as TranscodeNotice, Od as TranscodePreparing, Vu as UPNEXT_COUNTDOWN_SECONDS, Uu as UPNEXT_RING_CIRCUMFERENCE, Hu as UPNEXT_RING_RADIUS, _d as UpNext, sc as VolumeControl, Rc as activeAudioIndex, Su as ambientGradient, Lc as applyAudioTrack, Ic as applyTrackModes, is as attachHls, vu as averageRegion, Zc as captionStyleVars, Hc as cleanCueText, Xc as edgeShadow, Nu as extensionOf, Ao as formatTime, qs as handleShortcut, Fc as hasActiveCaptions, Cu as isBatterySaving, Ss as isFailedStatus, Fu as isFatalMediaError, es as isNativeHlsSupported, xs as isPlayable, Ks as isTypingTarget, Nc as listAudioTracks, Mc as listSubtitleTracks, Pu as needsTranscode, ls as parseSubtitleTracks, ys as parseTranscodeStart, bs as parseTranscodeStatus, Uc as readActiveCueLines, Cs as resolveStreamUrl, Pc as resolveTextTrack, bu as rgbString, xu as rgbaString, Wu as ringDashoffset, yu as sampleAmbient, ds as transcodeStartPath, vs as transcodeStatusPath, ws as useHlsTranscode, Js as useKeyboardShortcuts, ue as usePlayerStore };

//# sourceMappingURL=player.js.map