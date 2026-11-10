import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createStaticVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, inject as f, markRaw as p, mergeModels as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, onScopeDispose as b, openBlock as x, ref as S, renderList as C, renderSlot as w, resolveDynamicComponent as T, toDisplayString as E, toRef as D, unref as O, useId as k, useModel as A, vModelDynamic as j, vModelText as M, vShow as N, watch as P, withCtx as F, withDirectives as I, withKeys as L, withModifiers as R } from "vue";
import { defineStore as z } from "pinia";
// src/stores/usePreferencesStore.ts
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
function W() {
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
function ee() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var te = z("phlix-prefs", () => {
	let e = W(), t = S(e.theme), n = S(e.accent), i = S(e.density), a = S(e.cardSize), o = S(e.gridDensity), s = S(e.viewMode), c = S(e.reducedMotion), l = S(e.autoplay), u = S(e.defaultVolume), d = S(e.defaultQuality), f = S(e.defaultSubtitleLang), p = S(e.defaultAudioLang), m = S(e.subtitlePreferenceSet), h = S({
		...B,
		...e.captionStyle
	}), g = S(e.atmosphere), _ = S(e.tv), v = S(e.filterPresets ? [...e.filterPresets] : []), y = S(e.showMarkerTimeline), x = S(e.crossfadeDuration), C = S(e.crossfadeFadeIn), w = S(e.crossfadeFadeOut), T = S(e.gaplessEnabled), E = S(e.preferredAudioQuality), D = S(ee()), O = null;
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
		if (typeof localStorage < "u") try {
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
}), ne = 30, re = .95, ie = 5e3, ae = "phlix.resume", oe = "phlix.resume.touched";
function se() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(ae), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
function ce() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(oe), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
function le(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(1, Math.max(0, e));
}
var ue = z("phlix-player", () => {
	let e = te(), t = S(null), n = S(""), i = S([]), a = S(!1), o = S(0), s = S(0), c = S(0), l = S(e.defaultVolume), u = S(!1), d = S(!1), f = S(1), p = S(e.defaultQuality), m = S(e.defaultSubtitleLang), h = S(""), g = S(!1), _ = S(se()), v = S(ce()), y = S(null), b = 0, x = r(() => s.value > 0 ? o.value / s.value : 0), C = r(() => i.value[0] ?? null);
	function w(e) {
		v.value[e] = Date.now();
	}
	function T(e) {
		let t = Object.keys(_.value), n = !1;
		for (let e of Object.keys(v.value)) e in _.value || (delete v.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (v.value[e] ?? 0) - (v.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete _.value[n], delete v.value[n];
		}
		return !0;
	}
	let E, D = 0;
	function O(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			D = Date.now();
			let e = () => {
				localStorage.setItem(ae, JSON.stringify(_.value)), localStorage.setItem(oe, JSON.stringify(v.value));
			};
			try {
				e();
			} catch {
				try {
					T(Math.floor(Object.keys(_.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - D;
		clearTimeout(E), e || n >= ie ? t() : E = setTimeout(t, ie - n);
	}
	function k(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function A(e, t, n) {
		if (k(t, n)) {
			let n = !(e in _.value);
			_.value[e] = Math.floor(t), w(e), n && T(200);
		} else delete _.value[e], delete v.value[e];
		O();
	}
	function j(e) {
		return e ? _.value[e] ?? null : null;
	}
	function M(e) {
		delete _.value[e], delete v.value[e], O(!0);
	}
	function N(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in _.value) && r > 0 && (_.value[n] = Math.floor(r), w(n), t = !0);
		t && (T(200), O(!0));
	}
	function P(e, r = {}) {
		H(), t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (o.value = 0, s.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, c.value = 0), he(e);
	}
	function F(e, n, r) {
		o.value = e, n !== void 0 && (s.value > 0 ? isFinite(n) && n > s.value && (s.value = n) : s.value = n), r !== void 0 && (c.value = r), t.value && A(t.value.id, e, s.value);
	}
	function I(e) {
		y.value = {
			type: "seekTo",
			value: e,
			seq: ++b
		};
	}
	function L(e) {
		y.value = {
			type: "seekBy",
			value: e,
			seq: ++b
		};
	}
	function R(e, t = {}) {
		P({
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
	function z() {
		a.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function B() {
		a.value = !1, t.value && A(t.value.id, o.value, s.value), O(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function V() {
		u.value || (u.value = !0, d.value = !0);
	}
	function H() {
		d.value && (d.value = !1, u.value = !1);
	}
	function U(e) {
		let t = le(e);
		t !== null && (l.value = t, t > 0 && (u.value = !1, d.value = !1));
	}
	function W() {
		u.value = !u.value, d.value = !1;
	}
	function ee(e) {
		f.value = e;
	}
	function ne(e) {
		p.value = e;
	}
	function re(e) {
		m.value = e;
	}
	function ue(e) {
		i.value = [...e];
	}
	function G(e) {
		i.value.push(e);
	}
	function de(e) {
		let t = i.value.shift() ?? null;
		return t && P(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function fe() {
		g.value = !0;
	}
	function pe() {
		g.value = !1;
	}
	function me() {
		t.value && A(t.value.id, o.value, s.value), O(!0), a.value = !1, g.value = !1, t.value = null, n.value = "", h.value = "";
	}
	function he(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function ge() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && s.value > 0 && Number.isFinite(s.value)) try {
			e.setPositionState({
				duration: s.value,
				position: Math.min(Math.max(0, o.value), s.value),
				playbackRate: f.value || 1
			});
		} catch {}
	}
	function _e(e) {
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
	function ve() {
		let t = le(e.defaultVolume);
		t !== null && (l.value = t), p.value = e.defaultQuality, m.value = e.defaultSubtitleLang;
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
		autoplayMuted: d,
		rate: f,
		quality: p,
		subtitleLang: m,
		hlsMasterUrl: h,
		miniPlayer: g,
		resumeMap: _,
		lastCommand: y,
		progress: x,
		upNext: C,
		inResumeBand: k,
		saveResume: A,
		resumePositionFor: j,
		clearResume: M,
		mergeServerResume: N,
		setCurrent: P,
		updateProgress: F,
		seekTo: I,
		seekBy: L,
		playLocalFile: R,
		play: z,
		pause: B,
		setVolume: U,
		toggleMute: W,
		muteForAutoplay: V,
		setRate: ee,
		setQuality: ne,
		setSubtitle: re,
		setQueue: ue,
		enqueue: G,
		next: de,
		showMiniPlayer: fe,
		hideMiniPlayer: pe,
		closePlayer: me,
		setMediaSessionMetadata: he,
		setMediaPositionState: ge,
		bindMediaSession: _e,
		seedFromPreferences: ve
	};
});
// \0@oxc-project+runtime@0.156.0/helpers/esm/typeof.js
function G(e) {
	"@babel/helpers - typeof";
	return G = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, G(e);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/toPrimitive.js
function de(e, t) {
	if (G(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (G(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/toPropertyKey.js
function fe(e) {
	var t = de(e, "string");
	return G(t) == "symbol" ? t : t + "";
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/defineProperty.js
function pe(e, t, n) {
	return (t = fe(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
// src/api/errors.ts
var me = class extends Error {
	constructor(e, t, n = null) {
		super(e), pe(this, "status", void 0), pe(this, "body", void 0), this.status = t, this.body = n, this.name = "ApiError";
	}
}, he = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, ge = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function _e(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function ve() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
// node_modules/@phlix/contracts/dist/phlix-contracts.js
var K = {
	SERVERS_READ: "mcp:servers:read",
	LIBRARY_READ: "mcp:library:read",
	PLAYBACK_READ: "mcp:playback:read",
	PLAYBACK_CONTROL: "mcp:playback:control"
};
K.SERVERS_READ, K.LIBRARY_READ, K.PLAYBACK_READ, K.PLAYBACK_CONTROL;
var q = {
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
		NOT_SERVER_OWNER: "not_server_owner",
		NOT_FOUND: "not_found"
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
}, ye = /* @__PURE__ */ "auth.hub.claim.server.proxy.quota.stream.access.gateway.relay.mcp.mcp_token.alexa.tls.csrf.user.plugin.library.metadata.poster.profile.dlna.casting.quickconnect.common.federation.share.invite.request.admin.updates.identity.provider.oauth.ldap.syncplay.legacy".split("."), be = Object.values(q.auth), xe = Object.values(q.hub), Se = Object.values(q.claim), Ce = Object.values(q.server), we = Object.values(q.proxy), Te = Object.values(q.quota), Ee = Object.values(q.stream), De = Object.values(q.access), Oe = Object.values(q.gateway), ke = Object.values(q.relay), Ae = Object.values(q.mcp), je = Object.values(q.mcp_token), Me = Object.values(q.alexa), Ne = Object.values(q.tls), Pe = Object.values(q.csrf), Fe = Object.values(q.user), Ie = Object.values(q.plugin), Le = Object.values(q.library), Re = Object.values(q.metadata), ze = Object.values(q.poster), Be = Object.values(q.profile), Ve = Object.values(q.dlna), He = Object.values(q.casting), Ue = Object.values(q.quickconnect), We = Object.values(q.common), Ge = Object.values(q.federation), Ke = Object.values(q.share), qe = Object.values(q.invite), Je = Object.values(q.request), Ye = Object.values(q.admin), Xe = Object.values(q.updates), Ze = Object.values(q.identity), Qe = Object.values(q.provider), $e = Object.values(q.oauth), et = Object.values(q.ldap), tt = Object.values(q.syncplay), nt = Object.values(q.legacy), rt = {
	auth: be,
	hub: xe,
	claim: Se,
	server: Ce,
	proxy: we,
	quota: Te,
	stream: Ee,
	access: De,
	gateway: Oe,
	relay: ke,
	mcp: Ae,
	mcp_token: je,
	alexa: Me,
	tls: Ne,
	csrf: Pe,
	user: Fe,
	plugin: Ie,
	library: Le,
	metadata: Re,
	poster: ze,
	profile: Be,
	dlna: Ve,
	casting: He,
	quickconnect: Ue,
	common: We,
	federation: Ge,
	share: Ke,
	invite: qe,
	request: Je,
	admin: Ye,
	updates: Xe,
	identity: Ze,
	provider: Qe,
	oauth: $e,
	ldap: et,
	syncplay: tt,
	legacy: nt
}, it = ye.flatMap((e) => rt[e]);
[...nt, ...tt];
// src/i18n/errors.ts
var at = {
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
	"auth.missing_credentials": "Enter your password to link this account.",
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
	"server.relay_unavailable": "This server is online but its secure relay tunnel isn’t connected yet, so its libraries can’t be loaded over the hub. It should reconnect automatically — try again in a moment.",
	"server.offline": "This server is offline, so its libraries can’t be loaded. It will be browsable again once it reconnects to the hub.",
	"server.no_tunnel": "This server is online but its secure relay tunnel isn’t connected yet, so its libraries can’t be loaded over the hub. It should reconnect automatically — try again in a moment.",
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
	"user.not_found": "Your account could not be found.",
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
	not_found: "The requested resource was not found.",
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
}, ot = {
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
	"auth.missing_credentials": "Introduce tu contraseña para vincular esta cuenta.",
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
	"user.not_found": "No se pudo encontrar tu cuenta.",
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
	not_found: "No se pudo encontrar el recurso solicitado.",
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
}, st = {
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
	"auth.missing_credentials": "Saisissez votre mot de passe pour lier ce compte.",
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
	"user.not_found": "Impossible de trouver votre compte.",
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
	not_found: "Impossible de trouver la ressource demandée.",
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
}, ct = {
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
	"auth.missing_credentials": "Gib dein Passwort ein, um dieses Konto zu verknüpfen.",
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
	"user.not_found": "Dein Konto konnte nicht gefunden werden.",
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
	not_found: "Die angeforderte Ressource wurde nicht gefunden.",
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
}, lt = {
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
	"auth.missing_credentials": "Inserisci la tua password per collegare questo account.",
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
	"user.not_found": "Impossibile trovare il tuo account.",
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
	not_found: "Impossibile trovare la risorsa richiesta.",
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
}, ut = {
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
	"auth.missing_credentials": "Informe sua senha para vincular esta conta.",
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
	"user.not_found": "Não foi possível encontrar sua conta.",
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
	not_found: "O recurso solicitado não pôde ser encontrado.",
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
}, dt = {
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
	"auth.missing_credentials": "このアカウントをリンクするにはパスワードを入力してください。",
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
	"user.not_found": "アカウントが見つかりませんでした。",
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
	not_found: "リクエストされたリソースが見つかりませんでした。",
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
}, ft = {
	en: "Something went wrong.",
	es: "Algo salió mal.",
	fr: "Une erreur est survenue.",
	de: "Etwas ist schiefgelaufen.",
	it: "Qualcosa è andato storto.",
	pt_BR: "Algo deu errado.",
	ja: "問題が発生しました。"
}, pt = new Set(it);
function mt(e) {
	return typeof e == "string" && pt.has(e);
}
var ht = {
	en: at,
	es: ot,
	fr: st,
	de: ct,
	it: lt,
	pt_BR: ut,
	ja: dt
};
function gt(e) {
	return typeof e == "string" && e in ht ? e : "en";
}
function _t(e, t, n) {
	if (mt(e)) {
		let n = ht[gt(t)][e];
		if (typeof n == "string" && n !== "") return n;
		let r = ht.en[e];
		if (typeof r == "string" && r !== "") return r;
	}
	return typeof n == "string" && n.trim() !== "" ? n : ft[gt(t)];
}
// src/api/tokenStore.ts
var vt = "access_token", yt = "refresh_token", bt = "user";
function xt(e) {
	return e.mode === "cookie" ? "cookie" : "bearer";
}
function St() {
	if (typeof window > "u") return null;
	try {
		return window.localStorage;
	} catch {
		return null;
	}
}
var Ct = class {
	constructor(e = St()) {
		pe(this, "storage", void 0), pe(this, "memory", {}), this.storage = e;
	}
	getAccessToken() {
		return this.read(vt);
	}
	setAccessToken(e) {
		this.write(vt, e);
	}
	getRefreshToken() {
		return this.read(yt);
	}
	setRefreshToken(e) {
		this.write(yt, e);
	}
	getUser() {
		let e = this.read(bt);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.write(bt, JSON.stringify(e));
	}
	clear() {
		this.erase(vt), this.erase(yt), this.erase(bt);
	}
	read(e) {
		let t = this.storage;
		if (t === null) return this.memory[e] ?? null;
		try {
			return t.getItem(e);
		} catch {
			return this.degradeToMemory(), this.memory[e] ?? null;
		}
	}
	write(e, t) {
		if (this.storage === null) this.memory[e] = t;
		else {
			try {
				this.storage.setItem(e, t);
			} catch {
				this.degradeToMemory();
			}
			this.memory[e] = t;
		}
	}
	erase(e) {
		if (this.storage === null) delete this.memory[e];
		else {
			try {
				this.storage.removeItem(e);
			} catch {
				this.degradeToMemory();
			}
			delete this.memory[e];
		}
	}
	degradeToMemory() {
		let e = this.storage;
		if (e !== null) {
			this.storage = null;
			for (let t of [
				vt,
				yt,
				bt
			]) try {
				let n = e.getItem(t);
				n !== null && this.memory[t] === void 0 && (this.memory[t] = n);
			} catch {}
		}
	}
}, wt = null, Tt = null;
function Et() {
	return wt === null ? (Tt === null && (Tt = typeof window > "u" ? {
		getAccessToken: () => null,
		setAccessToken: () => {},
		getRefreshToken: () => null,
		setRefreshToken: () => {},
		getUser: () => null,
		setUser: () => {},
		clear: () => {}
	} : new Ct()), Tt) : wt;
}
function Dt(e) {
	if (typeof window > "u") return !1;
	try {
		return new URL(e, window.location.href).origin === window.location.origin;
	} catch {
		return !1;
	}
}
function Ot(e, t) {
	return xt(e) === "cookie" && Dt(t) ? "include" : "same-origin";
}
var kt = 15e3, At = {};
function jt(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r && (t[n] = r);
	return t;
}
function Mt(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
function Nt(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function Pt(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function Ft(e) {
	let t = e && typeof e == "object" ? e : {}, n = Nt(t.name) ?? "Unknown Artist", r = Pt(t.album_count), i = Pt(t.track_count);
	return {
		id: n,
		name: n,
		imageUrl: Nt(t.image_url),
		albumCount: r ?? void 0,
		trackCount: i ?? void 0
	};
}
function It(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = Nt(n.title) ?? Nt(t.name) ?? Nt(t.title) ?? "Unknown Track";
	return {
		id: Nt(t.id) ?? "",
		title: r,
		durationSecs: Pt(n.duration_secs) ?? Pt(t.duration_secs) ?? 0,
		trackNumber: Pt(n.track_number) ?? Pt(t.track_number),
		streamUrl: Nt(t.stream_url)
	};
}
function Lt(e) {
	let t = e && typeof e == "object" ? e : {}, n = Nt(t.name) ?? Nt(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [], i = Pt(t.track_count) ?? r.length;
	return {
		id: n,
		title: n,
		artist: Nt(t.artist),
		albumArtUrl: Nt(t.album_art_url),
		year: Pt(t.year),
		totalTracks: i,
		tracks: r.map(It),
		tracksTruncated: Mt(t.tracks_truncated)
	};
}
function Rt(e, t, n) {
	return {
		total: Pt(e.total) ?? t,
		limit: Pt(e.limit) ?? n.limit ?? 100,
		offset: Pt(e.offset) ?? n.offset ?? 0
	};
}
function zt(e) {
	let t = {};
	return e.limit !== void 0 && (t.limit = String(e.limit)), e.offset !== void 0 && (t.offset = String(e.offset)), t;
}
function Bt(e) {
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
function Vt(e) {
	if (typeof e != "object" || !e) return [];
	let t = e;
	return typeof t.id != "string" || t.id === "" ? [] : [{
		id: t.id,
		name: typeof t.name == "string" ? t.name : t.id,
		type: typeof t.type == "string" ? t.type : "movie"
	}];
}
function Ht(e) {
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
		hearingImpaired: Mt(t.hearingImpaired ?? t.hearing_impaired),
		fps: a
	};
}
var Ut = /^(?:[a-z][a-z0-9_]*_[a-z0-9_]*|[A-Z][A-Z0-9_]*_[A-Z0-9_]*|[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+)$/;
function Wt(e) {
	return Ut.test(e);
}
function Gt(e) {
	if (e !== null && mt(e)) {
		let t = ht.en[e];
		if (typeof t == "string" && t !== "") return t;
	}
	return null;
}
var Kt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new Map(), Jt = class {
	constructor(e = {}) {
		pe(this, "baseUrl", void 0), pe(this, "explicitTokenStore", void 0), pe(this, "doFetch", void 0), pe(this, "timeoutMs", void 0), pe(this, "instanceHeaders", void 0), pe(this, "loginPath", void 0), this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.explicitTokenStore = e.tokenStore ?? null, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? kt, this.instanceHeaders = jt(e.headers ?? {}), this.loginPath = e.loginPath ?? "/login";
	}
	get tokens() {
		return this.explicitTokenStore ?? Et();
	}
	setBaseUrl(e) {
		this.baseUrl = e;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = {
				...At,
				...this.instanceHeaders,
				"Content-Type": "application/json"
			}, i = this.tokens.getAccessToken();
			i && (r.Authorization = `Bearer ${i}`);
			let o = {
				method: e,
				headers: r,
				credentials: Ot(this.tokens, a),
				signal: t
			};
			return n !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (o.body = JSON.stringify(n)), o;
		}, a = this.baseUrl !== "" && t.startsWith(this.baseUrl) ? t : `${this.baseUrl}${t}`, o = new AbortController(), s = !1, c = setTimeout(() => {
			s = !0, o.abort();
		}, this.timeoutMs), l = () => o.abort();
		r && (r.aborted ? o.abort() : r.addEventListener("abort", l, { once: !0 }));
		try {
			let e = await this.doFetch(a, i(o.signal));
			return e.status === 401 && await this.refreshToken() && (e = await this.doFetch(a, i(o.signal))), await this.handleResponse(e);
		} catch (e) {
			throw s ? new ge() : r?.aborted || e instanceof me ? e : e instanceof TypeError || ve() ? new he() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new me(this.extractError(t), e.status, t);
		return t;
	}
	extractError(e) {
		if (e && typeof e == "object") {
			let t = e, n = typeof t.error == "string" && t.error !== "" ? t.error : null, r = typeof t.message == "string" && t.message !== "" ? t.message : null, i = typeof t.code == "string" ? t.code : null;
			if (n !== null && Wt(n)) {
				let e = Gt(i) ?? Gt(n);
				return e === null ? r ?? n : e;
			}
			if (r !== null) return r;
			if (n !== null) return n;
			let a = Gt(i);
			if (a !== null) return a;
		}
		return "Request failed";
	}
	expireSession() {
		this.tokens.clear(), typeof window < "u" && typeof CustomEvent < "u" && window.dispatchEvent(new CustomEvent("phlix:auth-expired"));
	}
	expireSessionUnlessRotated(e) {
		let t = this.tokens.getRefreshToken();
		(t === null || t === e) && this.expireSession();
	}
	async refreshToken() {
		let e = this.tokens, t = Kt.get(e);
		if (t !== void 0) return t;
		let n = this.performRefresh(e).finally(() => {
			Kt.delete(e);
		});
		return Kt.set(e, n), n;
	}
	async performRefresh(e) {
		return xt(e) === "cookie" ? this.performCookieRefresh(e) : this.performBearerRefresh(e);
	}
	async performCookieRefresh(e) {
		let t = new AbortController(), n = setTimeout(() => t.abort(), this.timeoutMs), r = `${this.baseUrl}/api/v1/auth/refresh`;
		try {
			return (await this.doFetch(r, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: Ot(e, r),
				body: "{}",
				signal: t.signal
			})).ok ? !0 : (this.expireSession(), !1);
		} catch {
			return !1;
		} finally {
			clearTimeout(n);
		}
	}
	async performBearerRefresh(e) {
		let t = e.getRefreshToken();
		if (!t) return this.expireSession(), !1;
		let n = new AbortController(), r = setTimeout(() => n.abort(), this.timeoutMs), i = `${this.baseUrl}/api/v1/auth/refresh`;
		try {
			let r = await this.doFetch(i, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: Ot(e, i),
				body: JSON.stringify({ refresh_token: t }),
				signal: n.signal
			});
			if (!r.ok) return this.expireSessionUnlessRotated(t), !1;
			let a = await r.json();
			return typeof a.access_token == "string" ? (e.setAccessToken(a.access_token), typeof a.refresh_token == "string" && e.setRefreshToken(a.refresh_token), !0) : (this.expireSessionUnlessRotated(t), !1);
		} catch {
			return !1;
		} finally {
			clearTimeout(r);
		}
	}
	async get(e, t, n) {
		let r = t ? "?" + new URLSearchParams(t).toString() : "";
		return this.request("GET", e + r, null, n);
	}
	async post(e, t, n) {
		return this.request("POST", e, t ?? null, n);
	}
	async put(e, t, n) {
		return this.request("PUT", e, t ?? null, n);
	}
	async patch(e, t, n) {
		return this.request("PATCH", e, t ?? null, n);
	}
	async delete(e, t) {
		return this.request("DELETE", e, null, t);
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
		return new me(this.extractError(n), e.status, n);
	}
	async postFormData(e, t) {
		let n = {
			...At,
			...this.instanceHeaders
		}, r = this.tokens.getAccessToken();
		r && (n.Authorization = `Bearer ${r}`);
		let i = `${this.baseUrl}${e}`, a = await this.doFetch(i, {
			method: "POST",
			headers: n,
			credentials: Ot(this.tokens, i),
			body: t
		});
		if (!a.ok) throw await this.toApiError(a);
		return a.json();
	}
	async uploadAvatar(e) {
		let t = new FormData();
		return t.append("avatar", e), this.postFormData("/api/v1/users/me/avatar", t);
	}
	async deleteAvatar() {
		let e = {
			...At,
			...this.instanceHeaders
		}, t = this.tokens.getAccessToken();
		t && (e.Authorization = `Bearer ${t}`);
		let n = `${this.baseUrl}/api/v1/users/me/avatar`, r = await this.doFetch(n, {
			method: "DELETE",
			headers: e,
			credentials: Ot(this.tokens, n)
		});
		if (!r.ok) throw await this.toApiError(r);
	}
	async probeCookieSession() {
		if (xt(this.tokens) !== "cookie") return "none";
		let e = `${this.baseUrl}/api/v1/auth/me`, t = qt.get(e);
		if (t !== void 0) return t;
		let n = this.performCookieProbe(e).then((t) => (t === "unreachable" && qt.delete(e), t));
		return qt.set(e, n), n;
	}
	async performCookieProbe(e) {
		let t = new AbortController(), n = setTimeout(() => t.abort(), this.timeoutMs);
		try {
			let n = await this.doFetch(e, {
				method: "GET",
				headers: {
					...At,
					...this.instanceHeaders
				},
				credentials: Ot(this.tokens, e),
				signal: t.signal
			});
			return n.ok ? "session" : n.status === 401 || n.status === 403 ? "none" : "unreachable";
		} catch {
			return "unreachable";
		} finally {
			clearTimeout(n);
		}
	}
	isLoggedIn() {
		return this.tokens.getAccessToken() !== null;
	}
	async getCurrentUser() {
		let e = await this.get("/api/v1/auth/me"), t = e?.user;
		if (!t || typeof t != "object") throw new me("Malformed /auth/me response: missing user object", 200, e);
		let n = t;
		return {
			...t,
			is_admin: Mt(n.is_admin)
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
		if (!r || typeof r != "object") throw new me("Malformed /api/v1/playlists response: missing collection object", 200, n);
		let i = r;
		if (typeof i.id != "string" || i.id === "") throw new me("Malformed /api/v1/playlists response: collection has no usable id", 200, n);
		return {
			id: i.id,
			name: typeof i.name == "string" ? i.name : e
		};
	}
	addToPlaylist(e, t) {
		return this.post(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	getPlaylists(e) {
		return this.get("/api/v1/collections", void 0, e).then((e) => (Array.isArray(e?.collections) ? e.collections : []).flatMap(Bt));
	}
	getPlaylist(e, t) {
		return this.get(`/api/v1/collections/${encodeURIComponent(e)}`, void 0, t).then((e) => {
			let t = Bt(e?.collection)[0];
			if (!t) throw new me("Malformed /api/v1/collections/{id} response: missing collection object", 200, e);
			let n = Array.isArray(e?.items) ? e.items.flatMap(Vt) : [];
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
		return Array.isArray(a.candidates) ? a.candidates.map(Ht) : [];
	}
	downloadSubtitle(e, t) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/subtitles/download`, t);
	}
	async listArtists(e = {}, t) {
		let n = zt(e), r = await this.get("/api/v1/music/artists", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.artists) ? r.artists : [];
		return {
			artists: i.map(Ft),
			...Rt(r, i.length, e)
		};
	}
	async getArtist(e, t) {
		return Ft((await this.get(`/api/v1/music/artist?name=${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e = {}, t) {
		let n = zt(e);
		e.artist !== void 0 && e.artist !== "" && (n.artist = e.artist);
		let r = await this.get("/api/v1/music/albums", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.albums) ? r.albums : [];
		return {
			albums: i.map(Lt),
			...Rt(r, i.length, e),
			artist: Nt(r.artist)
		};
	}
	async getAlbum(e, t, n) {
		let r = t !== void 0 && t !== "" ? `&artist=${encodeURIComponent(t)}` : "";
		return Lt((await this.get(`/api/v1/music/album?name=${encodeURIComponent(e)}${r}`, void 0, n)).album);
	}
	async listTracks(e = {}, t) {
		let n = zt(e), r = await this.get("/api/v1/music/tracks", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.tracks) ? r.tracks : [];
		return {
			tracks: i.map(It),
			...Rt(r, i.length, e)
		};
	}
	async getTrack(e, t) {
		return It((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		return this.tokens.clear(), xt(this.tokens) === "cookie" ? this.postLogoutClear().then(() => {
			e && typeof window < "u" && (window.location.href = this.loginPath);
		}) : (e && typeof window < "u" && (window.location.href = this.loginPath), Promise.resolve());
	}
	async postLogoutClear() {
		let e = new AbortController(), t = setTimeout(() => e.abort(), this.timeoutMs), n = `${this.baseUrl}/api/v1/auth/logout`;
		try {
			await this.doFetch(n, {
				method: "POST",
				headers: {
					...At,
					...this.instanceHeaders
				},
				credentials: Ot(this.tokens, n),
				redirect: "manual",
				signal: e.signal
			});
		} catch {} finally {
			clearTimeout(t);
		}
	}
};
new Jt();
var Yt = z("phlix-toast", () => {
	let e = S([]), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = 0;
	function i(r) {
		let i = t.get(r);
		i && i.handle !== null && clearTimeout(i.handle), t.delete(r), n.delete(r), e.value = e.value.filter((e) => e.id !== r);
	}
	function a(e, n) {
		t.set(e, {
			remaining: n,
			startedAt: Date.now(),
			handle: setTimeout(() => i(e), n)
		});
	}
	function o(e, r) {
		let i = n.get(e) ?? /* @__PURE__ */ new Set();
		if (n.set(e, i), i.has(r) || (i.add(r), i.size > 1)) return;
		let a = t.get(e);
		if (!a || a.handle === null) return;
		clearTimeout(a.handle);
		let o = Math.max(0, Date.now() - (a.startedAt ?? Date.now()));
		a.handle = null, a.startedAt = null, a.remaining = Math.max(0, a.remaining - o);
	}
	function s(e, r) {
		let i = n.get(e);
		if (!i || !i.has(r) || (i.delete(r), i.size > 0)) return;
		let o = t.get(e);
		o && o.handle === null && a(e, o.remaining);
	}
	function c(t) {
		let n = ++r, o = {
			tone: "neutral",
			duration: 5e3,
			...t,
			id: n
		};
		for (e.value.push(o), o.duration > 0 && o.action === void 0 && a(n, o.duration); e.value.length > 5;) i(e.value[0].id);
		return n;
	}
	function l() {
		t.forEach((e) => {
			e.handle !== null && clearTimeout(e.handle);
		}), t.clear(), n.clear(), e.value = [];
	}
	function u(e, t, n) {
		if (t === void 0) return {
			...n,
			message: e
		};
		let { message: r, ...i } = t;
		return r === void 0 ? {
			...n,
			...i,
			message: e
		} : {
			...n,
			title: i.title ?? e,
			...i,
			message: r
		};
	}
	return {
		toasts: e,
		show: c,
		dismiss: i,
		clear: l,
		hold: o,
		release: s,
		success: (e, t) => c(u(e, t, { tone: "success" })),
		error: (e, t) => c(u(e, t, {
			tone: "error",
			duration: 8e3
		})),
		warning: (e, t) => c(u(e, t, { tone: "warning" })),
		info: (e, t) => c(u(e, t, { tone: "info" }))
	};
});
// src/api/admin/users.ts
function Xt(e) {
	return {
		...e,
		is_admin: Mt(e.is_admin)
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
function Zt(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Qt(e) {
	return {
		user_id: typeof e.user_id == "string" ? e.user_id : String(e.user_id ?? ""),
		bytes_in: Zt(e.bytes_in),
		bytes_out: Zt(e.bytes_out),
		quota_bytes_in: Zt(e.quota_bytes_in),
		quota_bytes_out: Zt(e.quota_bytes_out),
		max_concurrent_streams: Zt(e.max_concurrent_streams),
		throttle_bps: Zt(e.throttle_bps)
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
var $t = class {
	constructor(e) {
		pe(this, "client", void 0), this.client = e;
	}
	async list(e) {
		let t = e?.status ? `?status=${encodeURIComponent(e.status)}` : "", { users: n } = await this.client.get(`/api/v1/admin/users${t}`);
		return Array.isArray(n) ? n.map(Xt) : [];
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
		return Xt(t);
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
		return Qt(await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}/bandwidth`) ?? {});
	}
	async setThrottle(e, t) {
		return Qt(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/throttle`, { throttle_bps: t }) ?? {});
	}
	async setQuota(e, t) {
		return Qt(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/quota`, t) ?? {});
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
// src/composables/useApiBase.ts
function en(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function tn() {
	let e = f("apiBase", "");
	return r(() => en(e));
}
function nn() {
	let e = f("mediaApiBase", void 0), t = f("apiBase", "");
	return r(() => en(e) || en(t));
}
// src/utils/plural.ts
var rn = [
	"zero",
	"one",
	"two",
	"few",
	"many",
	"other"
], an = /* @__PURE__ */ new Map(), on = "\0";
function sn(e) {
	let t = e?.locale, n = e?.type ?? "cardinal", r = `${t ?? ""}${on}${n}`, i = an.get(r);
	return i || (i = new Intl.PluralRules(t, { type: n }), an.set(r, i)), i;
}
function cn(e, t) {
	return Number.isFinite(e) ? sn(t).select(e) : "other";
}
function ln(e, t, n) {
	let r = t[cn(e, n)];
	return r === void 0 ? t.other : r;
}
function un(e, t, n) {
	if (!e.includes("|")) return e;
	let r = e.split("|").map((e) => e.trim());
	if (r.length === 1) return r[0];
	let i = sn(n), a = new Set(i.resolvedOptions().pluralCategories), o = rn.filter((e) => a.has(e)), s = {};
	return o.forEach((e, t) => {
		s[e] = r[Math.min(t, r.length - 1)];
	}), ln(t, {
		...s,
		other: s.other ?? r[r.length - 1]
	}, n);
}
function dn(e) {
	return e.includes("|");
}
// src/i18n/messages.ts
var fn = {
	common: {
		retry: "Retry",
		close: "Close",
		dismiss: "Dismiss",
		loading: "Loading",
		notifications: "Notifications",
		noMatches: "No matches",
		detailsUnavailable: "Details for “{name}” aren’t available in this app.",
		missingMediaId: "No item was selected. Choose one from your library.",
		missingSeasonId: "No season was selected. Choose one from the series page.",
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
		primaryNav: "Primary navigation",
		openMenu: "Open navigation menu",
		menu: "Menu",
		openCommandPalette: "Open command palette ({chord})",
		browse: "Browse",
		explore: "Explore",
		recommendations: "For you",
		watchHistory: "Watch history",
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
		whoIsWatching: "Who’s watching?",
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
		passwordRecoveryHint: "Locked out? Ask your server admin to reset your password.",
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
		confirmPasswordRequired: "Confirm your password.",
		signInFailed: "Couldn’t sign in.",
		serverUnreachable: "Couldn’t reach the server. Check your connection and try again.",
		signupFailed: "Couldn’t create your account. Please try again.",
		sessionExpired: "Session expired. Please sign in again."
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
		unreachable: "Couldn’t reach a Phlix server at that address. Check it and try again.",
		connectAnyway: "Connect anyway",
		plaintextWarning: "This server is unencrypted (http). Your login could be intercepted in transit. Use https if you can.",
		plaintextConfirm: "Connect over http anyway",
		originConfirm: "You are connecting to {origin} for the first time. Your sign-in token will be sent there. Continue?",
		confirmContinue: "Yes, connect",
		confirmCancel: "Cancel",
		scan: "Scan your network",
		scanning: "Scanning…",
		scanFailed: "Couldn’t scan your network right now. Enter the address manually.",
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
		skipOutro: "Skip end credits",
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
		audioOriginal: "Original",
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
		subtitleAdded: "{language} subtitle added.",
		subtitleAddedGeneric: "Subtitle added.",
		subtitleAddError: "Couldn’t add that subtitle. Please try again.",
		subtitleAddNotFound: "That subtitle is no longer available.",
		subtitleQuota: "Subtitle download limit reached.",
		subtitleQuotaRemaining: "Your subtitle quota has {count} download left this period. | Your subtitle quota has {count} downloads left this period.",
		subtitleQuotaReset: "Subtitle download limit reached. Resets at {time}.",
		subtitleHearingImpaired: "SDH",
		subtitleHearingImpairedFull: "Hearing impaired",
		subtitleRating: "Rating {rating}",
		subtitleDownloads: "{count} download | {count} downloads",
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
		startsIn: "Starts in {count} second | Starts in {count} seconds",
		startingNow: "Starting…",
		buffering: "Buffering…",
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
	invite: {
		title: "Accept invite",
		accepting: "Accepting…",
		granted: "You’ve been granted access to the library.",
		viewShared: "View shared libraries",
		lead: "You’ve been invited to access a library.",
		needAuth: "You’ve been invited to access a library. Sign in or create an account to accept.",
		notFound: "This invite link was not found.",
		expired: "This invite link has expired or been exhausted.",
		sessionExpired: "Session expired. Please sign in again.",
		invalidToken: "Invalid invite token.",
		failed: "Couldn’t accept the invite.",
		revokeConfirm: "This invite link stops working immediately. It cannot be restored.",
		revokeLabel: "Revoke link",
		revoked: "Invite link revoked.",
		revokeFailed: "Couldn’t revoke the invite link."
	},
	shares: {
		revokeConfirm: "This person loses access immediately. A new share is needed to give it back.",
		revokeLabel: "Revoke share",
		revoked: "Share revoked.",
		revokeFailed: "Couldn’t revoke the share."
	},
	itemActions: {
		addFavorite: "Add to my list",
		removeFavorite: "Remove from my list",
		inFavorites: "In my list",
		watchlist: "My list",
		addedToList: "Added “{name}” to my list.",
		removedFromList: "Removed “{name}” from my list.",
		markWatched: "Mark watched",
		watched: "Watched",
		markWatchedAria: "Mark as watched",
		markUnwatchedAria: "Mark as unwatched",
		resumeProgress: "Resume {name}",
		moreInfo: "More info",
		moreActions: "More actions",
		matchMetadata: "Match metadata",
		favoriteAddError: "Couldn’t add to my list.",
		favoriteRemoveError: "Couldn’t remove from my list.",
		markWatchedError: "Couldn’t mark as watched.",
		markUnwatchedError: "Couldn’t mark as unwatched.",
		ratingSaveError: "Couldn’t save rating."
	},
	reader: {
		decreaseFont: "Decrease font size",
		increaseFont: "Increase font size",
		lightMode: "Light mode",
		sepiaMode: "Sepia mode",
		darkMode: "Dark mode"
	},
	mcpTokens: {
		title: "MCP tokens",
		revokeSuccess: "Revoked “{name}”.",
		revokeFailed: "Couldn’t revoke token."
	},
	syncplay: {
		syncPlay: "SyncPlay",
		inRoom: "In SyncPlay room",
		createRoom: "Create room",
		joinRoom: "Join room",
		leaveRoom: "Leave room",
		leaveConfirm: "Leave “{name}”? Others lose sync if you host.",
		joinedRoom: "Joined {name}.",
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
		noRooms: "No rooms available",
		errorCreate: "Couldn’t create the room.",
		errorJoin: "Couldn’t join the room.",
		errorLeave: "Couldn’t leave the room.",
		commandNotDelivered: "Couldn’t deliver the SyncPlay command to the group.",
		yourRole: "You are {role}",
		roleOwner: "Owner",
		roleMember: "Member",
		roleEditor: "Editor",
		roleContributor: "Contributor",
		currentRoom: "Current room",
		notInRoom: "You’re not in a SyncPlay room.",
		notInRoomHint: "Create or join a room to watch together with others.",
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
	library: {
		titlesCount: "{total} title | {total} titles",
		posterUpdated: "Updated poster for “{name}”.",
		nothingToPlay: "Nothing to play yet.",
		markedWatched: "Marked “{name}” as watched.",
		markedUnwatched: "Marked “{name}” as unwatched.",
		itemRemoved: "Removed “{name}”.",
		itemRemoveFailed: "Couldn’t remove “{name}”.",
		unknownError: "Something went wrong.",
		loadTitlesError: "Couldn’t load titles",
		noMediaTitle: "No media found",
		noMediaHint: "Try adjusting your filters."
	},
	browse: {
		continueWatching: "Continue watching",
		nextUp: "Next up",
		recommended: "Recommended",
		mostWatched: "Most watched",
		noLibrariesTitle: "No libraries yet",
		noLibrariesDescription: "Once a library is added it shows up here as its own section."
	},
	playlist: {
		loadError: "Couldn’t load this playlist.",
		loadErrorTitle: "Couldn’t load this playlist"
	},
	music: {
		title: "Music library",
		titleColumn: "Title",
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
		allTracks: "All tracks",
		searchTracks: "Search tracks…",
		playAll: "Play all",
		matching: "matching “{query}”",
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
		pageLoadFailed: "Couldn’t load that page. Your place is unchanged — try again.",
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
	search: {
		showingOf: "Showing {shown} of {total} results",
		inputLabel: "Search movies, shows, music, books"
	},
	settings: {
		theme: "Theme",
		themeCatalogueUnavailable: "Theme catalogue unavailable — showing the built-in themes.",
		themeSavedLocally: "Saved on this device only — the server could not store it.",
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
		resetConfirm: "Press again to confirm the reset",
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
		groupSaveError: "Couldn’t save {name} settings.",
		loadFailed: "Couldn’t load settings.",
		loadErrorTitle: "Couldn’t load settings",
		passkeyNotCreated: "No passkey was created. Try again."
	},
	explore: { title: "Explore similar titles" },
	recommendations: { title: "For you" },
	history: { title: "Watch history" },
	season: {
		play: "Play",
		watchlist: "My list",
		inFavorites: "In my list",
		addFavorite: "Add to my list",
		removeFavorite: "Remove from my list",
		markWatched: "Mark watched",
		watched: "Watched",
		markWatchedAria: "Mark as watched",
		markUnwatchedAria: "Mark as unwatched",
		noEpisodes: "No episodes to play yet",
		loadingAria: "Loading season",
		loadError: "Couldn’t load this season.",
		loadErrorTitle: "Couldn’t load this season",
		backToSeries: "Back to series",
		episodes: "Episodes",
		notFound: "Season not found",
		notFoundDescription: "{series} has no such season."
	},
	parental: {
		title: "Parental controls",
		schedules: "Schedules",
		tags: "Tags",
		streamLimits: "Stream limits",
		createSchedule: "Create schedule",
		editSchedule: "Edit schedule",
		scheduleName: "Name",
		scheduleNamePlaceholder: "e.g. Weekday Evenings",
		startTime: "Start time",
		endTime: "End time",
		days: "Days",
		active: "Active",
		inactive: "Inactive",
		addTag: "Add tag",
		tagName: "Tag name",
		tagNamePlaceholder: "e.g. kids, restricted, work",
		tagType: "Tag type",
		tagBlocked: "Blocked",
		tagAllowed: "Allowed",
		updateLimits: "Update limits",
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
		loadErrorSchedules: "Couldn’t load schedules.",
		loadErrorSchedulesTitle: "Couldn’t load schedules",
		loadErrorTags: "Couldn’t load tags.",
		loadErrorTagsTitle: "Couldn’t load tags",
		loadErrorStreamLimits: "Couldn’t load stream limits.",
		loadErrorStreamLimitsTitle: "Couldn’t load stream limits",
		scheduleSaveError: "Couldn’t save schedule.",
		scheduleDeleteError: "Couldn’t delete schedule.",
		tagAddError: "Couldn’t add tag.",
		tagRemoveError: "Couldn’t remove tag.",
		streamLimitsSaveError: "Couldn’t update stream limits.",
		profileLoadError: "Couldn’t load this profile.",
		retry: "Retry"
	},
	admin: {
		"transcoding.title": "Transcoding",
		"transcoding.preferredAccelerator": "Preferred accelerator",
		"transcoding.hdrOutput": "HDR output",
		"transcoding.toneMapMode": "Tone map mode",
		settingsRejected: "The server rejected these settings — nothing was saved.",
		settingsRejectAllMethods: "At least one sign-in method must stay enabled. Keep at least one turned on and save again.",
		settingsRejectAdminLockout: "This change would leave an active administrator with no usable way to sign in. Enable another sign-in method for them first, then save again.",
		settingsForbidden: "You no longer have permission to change server settings. Sign in again as an administrator and try again.",
		settingsConflict: "The server could not apply those settings in its current state. Reload the settings and try again."
	}
}, pn = /\{(\w+)\}/g;
function mn(e) {
	let t = {};
	for (let n of Object.keys(fn)) {
		let r = fn[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function hn(e, t) {
	return t ? e.replace(pn, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function gn(e) {
	let t = mn(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? hn(_n(s, n), n) : e;
	};
}
function _n(e, t) {
	if (!dn(e)) return e;
	let n = t?.count, r = typeof n == "number" ? n : Number(n);
	if (!Number.isFinite(r)) {
		let t = e.split("|");
		return t[t.length - 1].trim();
	}
	return un(e, r);
}
// src/composables/useMessages.ts
function J() {
	return { t: gn(f("phlixConfig", null)?.messages) };
}
// src/stores/useAuthStore.ts
function vn(e) {
	return typeof e == "string" ? e : e?.value ?? "/login";
}
function yn(e) {
	return !(e instanceof me) || !e.body || typeof e.body != "object" || !("code" in e.body) ? null : String(e.body.code ?? "") || null;
}
var bn = null, xn = z("auth", () => {
	let e = Et(), t = tn(), { t: n } = J(), i = f("loginPath", "/login"), a = r(() => vn(i)), o = new Jt({
		tokenStore: e,
		baseUrl: t.value,
		loginPath: a.value
	});
	P(t, (e) => o.setBaseUrl(e));
	let s = S(null), c = S(!1), l = S(null), u = S(null), d = S(e.getAccessToken()), p = S(!1), m = null, h = r(() => d.value !== null), g = r(() => s.value?.is_admin === !0);
	if (typeof window < "u") {
		bn && window.removeEventListener("phlix:auth-expired", bn);
		let e = () => {
			d.value = null, s.value = null;
		};
		window.addEventListener("phlix:auth-expired", e), bn = e, b(() => {
			window.removeEventListener("phlix:auth-expired", e), bn === e && (bn = null);
		});
	}
	function _(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), d.value = t;
	}
	async function v(e, t) {
		c.value = !0, l.value = null, u.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await o.post("/api/v1/auth/login", n);
			return _(r.access_token, r.refresh_token), await x(), h.value;
		} catch (e) {
			return l.value = e instanceof Error ? e.message : n("auth.signInFailed"), u.value = yn(e), !1;
		} finally {
			c.value = !1;
		}
	}
	async function y(e, t, r) {
		c.value = !0, l.value = null, u.value = null;
		try {
			let n = await o.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: r
			});
			return _(n.access_token, n.refresh_token), await x(), h.value;
		} catch (e) {
			return l.value = e instanceof Error ? e.message : n("auth.signupFailed"), u.value = yn(e), !1;
		} finally {
			c.value = !1;
		}
	}
	async function x() {
		if (!h.value) return "valid";
		u.value = null;
		try {
			return s.value = await o.getCurrentUser(), "valid";
		} catch (t) {
			return u.value = yn(t), s.value = null, t instanceof me ? (e.clear(), d.value = null, "invalid") : (l.value = t instanceof Error ? t.message : n("auth.serverUnreachable"), "unreachable");
		}
	}
	async function C() {
		if (!p.value) return m === null && (m = x().then((e) => {
			e === "unreachable" ? m = null : p.value = !0;
		})), m;
	}
	async function w() {
		d.value = null, s.value = null, await o.logout(!1), typeof window < "u" && (window.location.href = a.value);
	}
	async function T(e) {
		c.value = !0, l.value = null, u.value = null;
		try {
			let t = await o.uploadAvatar(e);
			s.value && (s.value.avatar_url = t.avatar_url);
		} catch (e) {
			throw l.value = e instanceof Error ? e.message : "Avatar upload failed", u.value = yn(e), e;
		} finally {
			c.value = !1;
		}
	}
	async function E() {
		c.value = !0, l.value = null, u.value = null;
		try {
			await o.deleteAvatar(), s.value && (s.value.avatar_url = null);
		} catch (e) {
			throw l.value = e instanceof Error ? e.message : "Avatar deletion failed", u.value = yn(e), e;
		} finally {
			c.value = !1;
		}
	}
	return {
		user: s,
		loading: c,
		error: l,
		errorCode: u,
		isLoggedIn: h,
		isAdmin: g,
		client: o,
		login: v,
		signup: y,
		setTokens: _,
		fetchUser: x,
		init: C,
		logout: w,
		uploadAvatar: T,
		deleteAvatar: E
	};
}), Sn = "phlix.active_profile", Cn = Sn;
function wn(e) {
	return `${Sn}.${e}`;
}
function Tn(e) {
	if (typeof localStorage > "u" || e === null) return null;
	let t = localStorage.getItem(wn(e));
	return typeof t == "string" && t !== "" ? t : null;
}
function En(e, t) {
	if (typeof localStorage > "u" || e === null) return;
	let n = wn(e);
	t === null ? localStorage.removeItem(n) : localStorage.setItem(n, t);
}
function Dn() {
	typeof localStorage < "u" && localStorage.removeItem(Cn);
}
var On = z("profile", () => {
	let e = xn(), t = tn();
	function n() {
		let t = e.user?.id;
		return typeof t == "string" && t !== "" ? t : null;
	}
	let i = n();
	Dn();
	let a = S([]), o = S(!1), s = S(!1), c = S(null), l = S(Tn(i)), u = S(null), d = S(!1), f = S(!1), p = S(0), m = null;
	function h(e) {
		return m ? m.setBaseUrl(e) : m = new Jt({ baseUrl: e }), new $t(m);
	}
	let g = r(() => a.value.length > 1), _ = r(() => a.value.find((e) => e.id === l.value) ?? null), v = r(() => s.value && a.value.length > 1 && !d.value), y = r(() => l.value ?? "account");
	async function b(e = !1) {
		if (!o.value && (!s.value || e)) {
			o.value = !0, c.value = null;
			try {
				let e = await h(t.value).listOwnProfiles();
				a.value = e, s.value = !0;
				let n = e.find((e) => e.is_active)?.id ?? null;
				n !== null && n !== l.value && (l.value = n, En(i, n));
			} catch (e) {
				c.value = _e(e, "Could not load your profiles.");
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
			return e.setTokens(r.access_token, r.refresh_token), r.user && typeof r.user == "object" && (e.user = r.user), l.value = r.profile_id ?? n, En(i, l.value), d.value = !0, f.value = !1, a.value = a.value.map((e) => ({
				...e,
				is_active: e.id === l.value
			})), !0;
		} catch (e) {
			return c.value = _e(e, "Could not switch profiles."), !1;
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
			return c.value = _e(e, "Could not create the profile."), !1;
		}
	}
	async function D(e, n) {
		c.value = null;
		try {
			return await h(t.value).updateOwnProfile(e, { name: n }), await b(!0), !0;
		} catch (e) {
			return c.value = _e(e, "Could not rename the profile."), !1;
		}
	}
	async function O(e) {
		c.value = null;
		try {
			await h(t.value).removeOwnProfile(e);
			let n = e === l.value;
			return n && (l.value = null, En(i, null)), await b(!0), n && l.value !== null && (p.value += 1), !0;
		} catch (e) {
			return c.value = _e(e, "Could not delete the profile."), !1;
		}
	}
	function k() {
		a.value = [], o.value = !1, s.value = !1, c.value = null, u.value = null, d.value = !1, f.value = !1, l.value = null, En(i, null);
	}
	return P(l, (e, t) => {
		t !== null && e !== t && (p.value += 1);
	}), P(() => e.isLoggedIn, (e) => {
		e || k();
	}), P(n, (e, t) => {
		e !== null && e !== t && (i = e, l.value === null && (l.value = Tn(e)));
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
}), kn = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), An = z("user-item-data", () => {
	let e = S(/* @__PURE__ */ new Map()), t = On();
	P(() => t.epoch, () => {
		e.value = /* @__PURE__ */ new Map(), l.clear();
	});
	let { t: n } = J(), r = null;
	function i(e) {
		return r ? r.setBaseUrl(e) : r = new Jt({ baseUrl: e }), r;
	}
	function a(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function o(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function s(t) {
		return e.value.get(t)?.watched ?? !1;
	}
	function c(t) {
		return e.value.get(t) ?? { ...kn };
	}
	let l = /* @__PURE__ */ new Map();
	function u(e, t) {
		let n = l.get(e) ?? { ...kn };
		l.set(e, {
			...n,
			...t
		});
	}
	function d(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data, r = {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0,
			watched: n?.watched ?? !1
		};
		e.value.set(t.id, r), l.set(t.id, { ...r });
	}
	function f(t, n) {
		let r = e.value.get(t) ?? { ...kn };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function p(e, t) {
		let r = a(e), o = !r;
		f(e, { favorite: o });
		try {
			let n = i(t);
			o ? await n.addFavorite(e) : await n.removeFavorite(e), u(e, { favorite: o });
		} catch (t) {
			let i = l.get(e);
			f(e, { favorite: i ? i.favorite : r });
			let a = n(o ? "itemActions.favoriteAddError" : "itemActions.favoriteRemoveError");
			Yt().error(`${a}: ${_e(t)}`);
		}
	}
	async function m(e, t) {
		let r = s(e), a = !r;
		f(e, { watched: a });
		try {
			let n = i(t);
			a ? await n.markWatched(e) : await n.markUnwatched(e), u(e, { watched: a });
		} catch (t) {
			let i = l.get(e);
			f(e, { watched: i ? i.watched : r });
			let o = n(a ? "itemActions.markWatchedError" : "itemActions.markUnwatchedError");
			Yt().error(`${o}: ${_e(t)}`);
		}
	}
	async function h(e, t, r) {
		let a = Math.trunc(Number(t));
		Number.isFinite(a) || (a = 0), a < -2 && (a = -2), a > 2 && (a = 2);
		let s = o(e);
		f(e, { like_level: a });
		try {
			await i(r).setLikeLevel(e, a), u(e, { like_level: a });
		} catch (t) {
			let r = l.get(e);
			f(e, { like_level: r ? r.like_level : s }), Yt().error(`${n("itemActions.ratingSaveError")}: ${_e(t)}`);
		}
	}
	function g() {
		e.value = /* @__PURE__ */ new Map(), l.clear(), r = null;
	}
	return {
		entries: e,
		isFavorite: a,
		likeLevel: o,
		isWatched: s,
		get: c,
		hydrate: d,
		toggleFavorite: p,
		toggleWatched: m,
		setLike: h,
		reset: g
	};
}), jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mn(e, t) {
	return x(), o("svg", jn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var Nn = p({
	name: "lucide-play",
	render: Mn
}), Pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fn(e, t) {
	return x(), o("svg", Pn, [...t[0] ||= [s("g", {
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
var In = p({
	name: "lucide-pause",
	render: Fn
}), Ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rn(e, t) {
	return x(), o("svg", Ln, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var zn = p({
	name: "lucide-skip-back",
	render: Rn
}), Bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vn(e, t) {
	return x(), o("svg", Bn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var Hn = p({
	name: "lucide-skip-forward",
	render: Vn
}), Un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wn(e, t) {
	return x(), o("svg", Un, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var Gn = p({
	name: "lucide-rotate-ccw",
	render: Wn
}), Kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qn(e, t) {
	return x(), o("svg", Kn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var Jn = p({
	name: "lucide-rotate-cw",
	render: qn
}), Yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xn(e, t) {
	return x(), o("svg", Yn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Zn = p({
	name: "lucide-volume-2",
	render: Xn
}), Qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $n(e, t) {
	return x(), o("svg", Qn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var er = p({
	name: "lucide-volume-1",
	render: $n
}), tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nr(e, t) {
	return x(), o("svg", tr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298zm5.5 9.798l5-5m-5 0l5 5"
	}, null, -1)]]);
}
var rr = p({
	name: "lucide-volume-x",
	render: nr
}), ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ar(e, t) {
	return x(), o("svg", ir, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), s("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var or = p({
	name: "lucide-shuffle",
	render: ar
}), sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cr(e, t) {
	return x(), o("svg", sr, [...t[0] ||= [s("g", {
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
var lr = p({
	name: "lucide-repeat",
	render: cr
}), ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dr(e, t) {
	return x(), o("svg", ur, [...t[0] ||= [s("g", {
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
var fr = p({
	name: "lucide-repeat-1",
	render: dr
}), pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mr(e, t) {
	return x(), o("svg", pr, [...t[0] ||= [s("g", {
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
var hr = p({
	name: "lucide-list-music",
	render: mr
}), gr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _r(e, t) {
	return x(), o("svg", gr, [...t[0] ||= [s("g", {
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
var vr = p({
	name: "lucide-captions",
	render: _r
}), yr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function br(e, t) {
	return x(), o("svg", yr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var xr = p({
	name: "lucide-captions-off",
	render: br
}), Sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cr(e, t) {
	return x(), o("svg", Sr, [...t[0] ||= [s("g", {
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
var wr = p({
	name: "lucide-picture-in-picture-2",
	render: Cr
}), Tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Er(e, t) {
	return x(), o("svg", Tr, [...t[0] ||= [s("rect", {
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
var Dr = p({
	name: "lucide-rectangle-horizontal",
	render: Er
}), Or = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kr(e, t) {
	return x(), o("svg", Or, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var Ar = p({
	name: "lucide-maximize",
	render: kr
}), jr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mr(e, t) {
	return x(), o("svg", jr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var Nr = p({
	name: "lucide-minimize",
	render: Mr
}), Pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fr(e, t) {
	return x(), o("svg", Pr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var Ir = p({
	name: "lucide-maximize-2",
	render: Fr
}), Lr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rr(e, t) {
	return x(), o("svg", Lr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var zr = p({
	name: "lucide-cast",
	render: Rr
}), Br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vr(e, t) {
	return x(), o("svg", Br, [...t[0] ||= [s("g", {
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
var Hr = p({
	name: "lucide-settings",
	render: Vr
}), Ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wr(e, t) {
	return x(), o("svg", Ur, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Gr = p({
	name: "lucide-gauge",
	render: Wr
}), Kr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qr(e, t) {
	return x(), o("svg", Kr, [...t[0] ||= [s("g", {
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
var Jr = p({
	name: "lucide-film",
	render: qr
}), Yr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xr(e, t) {
	return x(), o("svg", Yr, [...t[0] ||= [s("g", {
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
var Zr = p({
	name: "lucide-image",
	render: Xr
}), Qr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $r(e, t) {
	return x(), o("svg", Qr, [...t[0] ||= [s("g", {
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
var ei = p({
	name: "lucide-music",
	render: $r
}), ti = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ni(e, t) {
	return x(), o("svg", ti, [...t[0] ||= [s("g", {
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
var ri = p({
	name: "lucide-tv",
	render: ni
}), ii = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ai(e, t) {
	return x(), o("svg", ii, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var oi = p({
	name: "lucide-book",
	render: ai
}), si = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ci(e, t) {
	return x(), o("svg", si, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var li = p({
	name: "lucide-headphones",
	render: ci
}), ui = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function di(e, t) {
	return x(), o("svg", ui, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var fi = p({
	name: "lucide-disc-3",
	render: di
}), pi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mi(e, t) {
	return x(), o("svg", pi, [...t[0] ||= [s("g", {
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
var hi = p({
	name: "lucide-mic-2",
	render: mi
}), gi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _i(e, t) {
	return x(), o("svg", gi, [...t[0] ||= [s("g", {
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
var vi = p({
	name: "lucide-video",
	render: _i
}), yi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bi(e, t) {
	return x(), o("svg", yi, [...t[0] ||= [s("g", {
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
var xi = p({
	name: "lucide-search",
	render: bi
}), Si = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ci(e, t) {
	return x(), o("svg", Si, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var wi = p({
	name: "lucide-sliders-horizontal",
	render: Ci
}), Ti = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ei(e, t) {
	return x(), o("svg", Ti, [...t[0] ||= [s("g", {
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
var Di = p({
	name: "lucide-calendar",
	render: Ei
}), Oi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ki(e, t) {
	return x(), o("svg", Oi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Ai = p({
	name: "lucide-arrow-up-down",
	render: ki
}), ji = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mi(e, t) {
	return x(), o("svg", ji, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var Ni = p({
	name: "lucide-star",
	render: Mi
}), Pi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fi(e, t) {
	return x(), o("svg", Pi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var Ii = p({
	name: "lucide-list",
	render: Fi
}), Li = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ri(e, t) {
	return x(), o("svg", Li, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"></rect></g>", 1)]]);
}
var zi = p({
	name: "lucide-layout-grid",
	render: Ri
}), Bi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vi(e, t) {
	return x(), o("svg", Bi, [...t[0] ||= [s("g", {
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
var Hi = p({
	name: "lucide-gallery-horizontal",
	render: Vi
}), Ui = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wi(e, t) {
	return x(), o("svg", Ui, [...t[0] ||= [s("g", {
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
var Gi = p({
	name: "lucide-table",
	render: Wi
}), Ki = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qi(e, t) {
	return x(), o("svg", Ki, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var Ji = p({
	name: "lucide-plus",
	render: qi
}), Yi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xi(e, t) {
	return x(), o("svg", Yi, [...t[0] ||= [s("g", {
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
var Zi = p({
	name: "lucide-info",
	render: Xi
}), Qi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $i(e, t) {
	return x(), o("svg", Qi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var ea = p({
	name: "lucide-x",
	render: $i
}), ta = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function na(e, t) {
	return x(), o("svg", ta, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var ra = p({
	name: "lucide-check",
	render: na
}), ia = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function aa(e, t) {
	return x(), o("svg", ia, [...t[0] ||= [s("g", {
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
var oa = p({
	name: "lucide-lock",
	render: aa
}), sa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ca(e, t) {
	return x(), o("svg", sa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var la = p({
	name: "lucide-bookmark",
	render: ca
}), ua = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function da(e, t) {
	return x(), o("svg", ua, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var fa = p({
	name: "lucide-bookmark-plus",
	render: da
}), pa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ma(e, t) {
	return x(), o("svg", pa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var ha = p({
	name: "lucide-heart",
	render: ma
}), ga = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _a(e, t) {
	return x(), o("svg", ga, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var va = p({
	name: "lucide-thumbs-up",
	render: _a
}), ya = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ba(e, t) {
	return x(), o("svg", ya, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var xa = p({
	name: "lucide-thumbs-down",
	render: ba
}), Sa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ca(e, t) {
	return x(), o("svg", Sa, [...t[0] ||= [s("g", {
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
var wa = p({
	name: "lucide-user",
	render: Ca
}), Ta = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ea(e, t) {
	return x(), o("svg", Ta, [...t[0] ||= [s("g", {
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
var Da = p({
	name: "lucide-users",
	render: Ea
}), Oa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ka(e, t) {
	return x(), o("svg", Oa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Aa = p({
	name: "lucide-log-out",
	render: ka
}), ja = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ma(e, t) {
	return x(), o("svg", ja, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Na = p({
	name: "lucide-menu",
	render: Ma
}), Pa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fa(e, t) {
	return x(), o("svg", Pa, [...t[0] ||= [s("g", {
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
var Ia = p({
	name: "lucide-more-horizontal",
	render: Fa
}), La = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ra(e, t) {
	return x(), o("svg", La, [...t[0] ||= [s("g", {
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
var za = p({
	name: "lucide-eye",
	render: Ra
}), Ba = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Va(e, t) {
	return x(), o("svg", Ba, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Ha = p({
	name: "lucide-eye-off",
	render: Va
}), Ua = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wa(e, t) {
	return x(), o("svg", Ua, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m2 21l9.6-9.6m-4.1 4.1l2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19" }), s("circle", {
		cx: "15.5",
		cy: "7.5",
		r: "5.5"
	})], -1)]]);
}
var Ga = p({
	name: "lucide-key",
	render: Wa
}), Ka = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qa(e, t) {
	return x(), o("svg", Ka, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var Ja = p({
	name: "lucide-trash",
	render: qa
}), Ya = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xa(e, t) {
	return x(), o("svg", Ya, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Za = p({
	name: "lucide-arrow-left",
	render: Xa
}), Qa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $a(e, t) {
	return x(), o("svg", Qa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var eo = p({
	name: "lucide-arrow-right",
	render: $a
}), to = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function no(e, t) {
	return x(), o("svg", to, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var ro = p({
	name: "lucide-arrow-up",
	render: no
}), io = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ao(e, t) {
	return x(), o("svg", io, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var oo = p({
	name: "lucide-arrow-down",
	render: ao
}), so = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function co(e, t) {
	return x(), o("svg", so, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var lo = p({
	name: "lucide-chevron-down",
	render: co
}), uo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fo(e, t) {
	return x(), o("svg", uo, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var po = p({
	name: "lucide-chevron-up",
	render: fo
}), mo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ho(e, t) {
	return x(), o("svg", mo, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var go = p({
	name: "lucide-chevron-left",
	render: ho
}), _o = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vo(e, t) {
	return x(), o("svg", _o, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var yo = p({
	name: "lucide-chevron-right",
	render: vo
}), bo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xo(e, t) {
	return x(), o("svg", bo, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
	}, null, -1)]]);
}
var So = p({
	name: "lucide-chevrons-left",
	render: xo
}), Co = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wo(e, t) {
	return x(), o("svg", Co, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 17l5-5l-5-5m7 10l5-5l-5-5"
	}, null, -1)]]);
}
var To = p({
	name: "lucide-chevrons-right",
	render: wo
}), Eo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Do(e, t) {
	return x(), o("svg", Eo, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Oo = p({
	name: "lucide-loader-circle",
	render: Do
}), ko = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ao(e, t) {
	return x(), o("svg", ko, [...t[0] ||= [s("g", {
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
var jo = p({
	name: "lucide-circle-alert",
	render: Ao
}), Mo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function No(e, t) {
	return x(), o("svg", Mo, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "m16 9l-5.5 5.5L8 12" })], -1)]]);
}
var Po = p({
	name: "lucide-circle-check",
	render: No
}), Fo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Io(e, t) {
	return x(), o("svg", Fo, [...t[0] ||= [s("g", {
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
var Lo = p({
	name: "lucide-circle-x",
	render: Io
}), Ro = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zo(e, t) {
	return x(), o("svg", Ro, [...t[0] ||= [s("g", {
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
var Bo = p({
	name: "lucide-sun",
	render: zo
}), Vo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ho(e, t) {
	return x(), o("svg", Vo, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Uo = p({
	name: "lucide-moon",
	render: Ho
}), Wo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Go(e, t) {
	return x(), o("svg", Wo, [...t[0] ||= [s("g", {
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
var Ko = p({
	name: "lucide-monitor",
	render: Go
}), qo = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jo(e, t) {
	return x(), o("svg", qo, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
	}, null, -1)]]);
}
// src/components/icon-registry.ts
var Yo = {
	play: Nn,
	pause: In,
	"skip-back": zn,
	"skip-forward": Hn,
	rewind: Gn,
	forward: Jn,
	volume: Zn,
	"volume-low": er,
	mute: rr,
	shuffle: or,
	repeat: lr,
	"repeat-1": fr,
	"list-music": hr,
	captions: vr,
	"captions-off": xr,
	pip: wr,
	theater: Dr,
	fullscreen: Ar,
	"fullscreen-exit": Nr,
	expand: Ir,
	cast: zr,
	settings: Hr,
	speed: Gr,
	film: Jr,
	image: Zr,
	music: ei,
	tv: ri,
	book: oi,
	headphones: li,
	disc: fi,
	mic: hi,
	video: vi,
	search: xi,
	filter: wi,
	calendar: Di,
	sort: Ai,
	star: Ni,
	list: Ii,
	grid: zi,
	backdrop: Hi,
	table: Gi,
	plus: Ji,
	info: Zi,
	x: ea,
	check: ra,
	lock: oa,
	bookmark: la,
	"bookmark-plus": fa,
	heart: ha,
	"thumbs-up": va,
	"thumbs-down": xa,
	user: wa,
	users: Da,
	"log-out": Aa,
	menu: Na,
	more: Ia,
	eye: za,
	"eye-off": Ha,
	refresh: Jn,
	key: Ga,
	trash: Ja,
	"arrow-left": Za,
	"arrow-right": eo,
	"arrow-up": ro,
	"arrow-down": oo,
	"chevron-down": lo,
	"chevron-up": po,
	"chevron-left": go,
	"chevron-right": yo,
	"chevrons-left": So,
	"chevrons-right": To,
	spinner: Oo,
	alert: jo,
	"alert-circle": jo,
	success: Po,
	error: Lo,
	sun: Bo,
	moon: Uo,
	monitor: Ko,
	"external-link": p({
		name: "lucide-external-link",
		render: Jo
	})
};
Object.keys(Yo);
// src/components/Icon.vue
var Y = /* @__PURE__ */ d({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = e, n = r(() => Yo[t.name]), a = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
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
}), Xo = ["id"], Zo = 8, Qo = /*@__PURE__*/ d({
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
			let a = n.getBoundingClientRect(), o = a.right - (i.right - Zo), l = i.left + Zo - a.left, u = 0;
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
			}, [w(t.$slots, "content", {}, () => [l(E(e.text), 1)], !0)], 10, Xo)) : a("", !0)]),
			_: 3
		})], 544));
	}
}), X = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, $o = /*#__PURE__*/ X(Qo, [["__scopeId", "data-v-83b83959"]]), es = ["data-level"], ts = ["disabled", "aria-pressed"], ns = ["disabled", "aria-pressed"], rs = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		}, [d.value ? (x(), i($o, {
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
			}, [u(Y, {
				name: "thumbs-up",
				class: "thumb-rating__icon"
			})], 10, ts)]),
			_: 1
		})) : a("", !0), f.value ? (x(), i($o, {
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
			}, [u(Y, {
				name: "thumbs-down",
				class: "thumb-rating__icon"
			})], 10, ns)]),
			_: 1
		})) : a("", !0)], 8, es));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
// src/components/player/format-time.ts
function is(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
// src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var as = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], os = { class: "scrubber__track" }, ss = ["title"], cs = { class: "scrubber__time numeric" }, ls = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let { t: c } = J(), l = t, u = i, d = S(null), f = S(!1), p = S(!1), m = S(0), h = S(0), v = (e) => Math.min(1, Math.max(0, e)), y = r(() => f.value ? m.value : l.duration > 0 ? v(l.position / l.duration) : 0), b = r(() => l.duration > 0 ? v(l.buffered / l.duration) : 0), w = r(() => (f.value || p.value) && l.duration > 0), T = r(() => f.value ? m.value : h.value), D = r(() => T.value * l.duration), k = r(() => w.value ? l.thumbnailAt?.(D.value) ?? null : null), A = r(() => k.value ? `url("${k.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), j = r(() => `${Math.min(96, Math.max(4, T.value * 100))}%`), M = r(() => l.duration > 0 ? l.chapters.filter((e) => e.start > 0 && e.start < l.duration).map((e) => ({
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
			"aria-valuetext": O(is)(t.position),
			"aria-label": O(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", os, [
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
			}, null, 12, ss))), 128)),
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
		}, null, 4)) : a("", !0), s("span", cs, E(O(is)(D.value)), 1)], 4)) : a("", !0)], 40, as));
	}
}), [["__scopeId", "data-v-3d610715"]]), us = "phlix-bandwidth-estimate";
function ds(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function fs() {
	try {
		let e = localStorage.getItem(us);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? ds(t) : 0;
	} catch {
		return 0;
	}
}
function ps(e) {
	try {
		localStorage.setItem(us, String(e));
	} catch {}
}
function ms(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
function hs(e) {
	return e ? e.split(",").map((e) => e.trim().toLowerCase()).some((e) => e.startsWith("mp4a") || e.startsWith("ac-3") || e.startsWith("ec-3") || e.startsWith("opus")) : !1;
}
var gs = null, _s = null;
function vs() {
	gs && ps(gs.bandwidthEstimate);
}
async function ys(e, t, n = {}) {
	if (typeof MediaSource > "u" && ms(e)) {
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
			},
			onLevelLoaded: () => () => void 0,
			hasAudio: () => !1
		};
	}
	let { default: r } = await import("./hls-fNqmoNsg.js");
	if (r.isSupported()) {
		let i = fs(), a = new r({
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
		a.on(r.Events.MANIFEST_PARSED, () => n.onReady?.()), a.on(r.Events.ERROR, (e, t) => {
			t?.fatal && (n.onError?.(t.details ?? "fatal hls error"), a.destroy());
		});
		let o = [];
		return a.on(r.Events.LEVEL_LOADED, () => {
			for (let e of [...o]) e();
		}), gs = a, _s !== null && clearInterval(_s), _s = setInterval(vs, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				ps(a.bandwidthEstimate), _s !== null && (clearInterval(_s), _s = null), gs = null;
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
			onLevelLoaded(e) {
				return o.push(e), () => {
					let t = o.indexOf(e);
					t >= 0 && o.splice(t, 1);
				};
			},
			hasAudio() {
				return (a.audioTracks?.length ?? 0) > 0 || a.levels.some((e) => hs(e.audioCodec));
			},
			loadSource(e) {
				a.loadSource(e);
			}
		};
	}
	throw Error("HLS is not supported in this browser");
}
// src/components/player/transcode.ts
var bs = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function xs(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ss(e) {
	return e === !0 || e === "true" || e === 1;
}
function Cs(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function ws(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = xs(e.url ?? e.src);
		r !== "" && t.push({
			index: Cs(e.index),
			language: xs(e.language ?? e.lang ?? e.srclang),
			label: xs(e.label),
			default: Ss(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ts(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Cs(e.height);
		if (r <= 0) continue;
		let i = e.playlist_url ?? e.playlistUrl;
		t.push({
			id: xs(e.id),
			label: xs(e.label),
			height: r,
			width: Cs(e.width),
			bitrate: Cs(e.bitrate),
			...typeof e.url == "string" && e.url !== "" ? { url: e.url } : {},
			...typeof i == "string" && i !== "" ? { playlistUrl: i } : {}
		});
	}
	return t.length > 0 ? t : null;
}
function Es(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
var Ds = .7, Os = [
	["mobile-low", 15e5],
	["mobile-high", 4e6],
	["web", 1e7]
], ks = 1e7, As = "mobile-low";
function js(e) {
	if (typeof e == "number" && Number.isFinite(e) && !(e <= 0)) return e * 1e6 * Ds;
}
function Ms(e) {
	let t = js(e);
	if (t === void 0 || t >= ks) return;
	let n = As;
	for (let [e, r] of Os) r <= t && (n = e);
	return n;
}
function Ns(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Ps(e) {
	let t = e ?? {};
	return {
		jobId: xs(t.job_id ?? t.jobId),
		masterUrl: xs(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: xs(t.status, "running"),
		reused: Ss(t.reused),
		subtitles: ws(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ts(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Fs(e) {
	let t = e ?? {};
	return {
		jobId: xs(t.job_id ?? t.jobId),
		status: xs(t.status, "running"),
		playlistReady: Ss(t.playlist_ready ?? t.playlistReady),
		progress: Cs(t.progress),
		masterUrl: xs(t.master_url ?? t.masterUrl),
		subtitles: ws(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ts(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Is(e) {
	return e.playlistReady || e.status === "completed";
}
function Ls(e) {
	return bs.has(e);
}
function Rs(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
// src/composables/useHlsTranscode.ts
var zs = "_master.m3u8";
function Bs(e) {
	let t = S("idle"), n = S(0), r = S([]), i = S([]), a = S(-1), o = S(!0), s = S(null), c = S(null), l = S([]), u = S(-1), d = S(!1), f = S(null), p = S(null);
	function m(e) {
		if (!k) return;
		i.value = k.levels, a.value = k.getCurrentLevel(), o.value = k.autoLevelEnabled;
		let t = e ?? k.getCurrentLevel(), n = t >= 0 ? i.value.find((e) => e.index === t) : void 0;
		s.value = n ? n.height : null;
	}
	function h() {
		i.value = [], a.value = -1, o.value = !0, s.value = null, c.value = null;
	}
	function g(e) {
		k && (l.value = k.audioTracks, u.value = e ?? k.getCurrentAudioTrack());
	}
	function _() {
		k && (d.value = k.hasAudio());
	}
	function v() {
		l.value = [], u.value = -1, d.value = !1;
	}
	function y(t) {
		if (!t || t.length === 0) return;
		let n = e.apiBase(), r = t.map((e) => ({
			...e,
			...e.url ? { url: Rs(n, e.url) } : {},
			...e.playlistUrl ? { playlistUrl: Rs(n, e.playlistUrl) } : {}
		}));
		P = r, c.value = r;
	}
	function b(t) {
		if (t.length === 0) return;
		let n = e.apiBase();
		r.value = t.map((e) => ({
			...e,
			url: Rs(n, e.url)
		}));
	}
	let x = e.attach ?? ys, C = e.pollIntervalMs ?? 1e3, w = e.maxWaitMs ?? 12e4, T = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), E = Math.max(1, Math.ceil(w / Math.max(1, C))), D = e.getToken ?? Vs, O = e.probeRungPlaylist ?? ((e) => Gs(e, D)), k = null, A = null, j = null, M = null, N = !1, P = [], F = 0, I = null, L = 0;
	function R() {
		return e.client ?? new Jt({
			baseUrl: e.apiBase(),
			timeoutMs: 6e4
		});
	}
	async function z(i, a, o, s) {
		W(), N = !1;
		let c = ++L, l = () => N || c !== L;
		I = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], h();
		try {
			let r = R(), c = Ps(await r.post(Es(a, o), void 0, I.signal));
			if (l()) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			b(c.subtitles), y(c.variants), f.value = c.jobId, p.value = Rs(e.apiBase(), c.masterUrl);
			let u = c.status === "completed";
			for (let e = 0; !u && e < E; e++) {
				let e = Fs(await r.get(Ns(c.jobId), void 0, I.signal));
				if (l()) return;
				if (n.value = e.progress, b(e.subtitles), y(e.variants), Ls(e.status)) throw Error(`transcode ${e.status}`);
				if (Is(e)) {
					u = !0;
					break;
				}
				if (await T(C), l()) return;
			}
			if (!u) throw Error("transcode timed out");
			let d = await x(i, p.value, {
				getToken: D,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => {
					m(), g(), _();
				},
				onError: () => {
					l() || (t.value = "error");
				}
			});
			if (l()) {
				try {
					d.destroy();
				} catch {}
				return;
			}
			k = d, A = k.onLevelSwitched((e) => m(e)), j = k.onAudioTrackSwitched((e) => g(e)), M = k.onLevelLoaded(() => {
				g(), _();
			}), m(), g(), _();
			try {
				let e = ue();
				e.hlsMasterUrl = p.value;
			} catch {}
			t.value = "ready";
		} catch {
			l() || (t.value = "error");
		}
	}
	function B(e) {
		k && (k.setCurrentLevel(e === "auto" ? -1 : e), m());
	}
	function V(e) {
		k && (k.setNextLevel(e === "auto" ? -1 : e), m());
	}
	function H(e) {
		k && (k.setAudioTrack(e), g());
	}
	function U(e) {
		if (!k || !p.value) return;
		let t = P.find((t) => t.id === e), n = t?.playlistUrl ?? Us(p.value, e), r = t?.url ?? Ws(p.value, e), i = ++F;
		(async () => {
			let e;
			try {
				e = await O(n);
			} catch {
				e = "unknown";
			}
			!N && i === F && k && (e === "absent" ? (console.warn(`[phlix-ui] rung mini-master unavailable (${n}) — this server has no per-rung index files; falling back to the legacy bare rung playlist (${r}). Multi-audio titles play silent on the video-only bare rung and the audio menu stays hidden (never a stale rendition list); muxed-audio titles play correctly. The menu returns once the server ships the index.`), k.loadSource(r)) : k.loadSource(n), h());
		})();
	}
	function W() {
		if (N = !0, F++, I &&= (I.abort(), null), A) {
			try {
				A();
			} catch {}
			A = null;
		}
		if (j) {
			try {
				j();
			} catch {}
			j = null;
		}
		if (M) {
			try {
				M();
			} catch {}
			M = null;
		}
		if (k) {
			try {
				k.destroy();
			} catch {}
			k = null;
		}
		P = [], f.value = null, p.value = null;
	}
	function ee() {
		W(), t.value = "idle", n.value = 0, r.value = [], h(), v();
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
		hasAudio: d,
		setLevel: B,
		setNextLevel: V,
		setAudioTrack: H,
		jobId: f,
		masterUrl: p,
		loadVariantPlaylist: U,
		start: z,
		cleanup: W,
		reset: ee
	};
}
function Vs() {
	try {
		return Et().getAccessToken();
	} catch {
		return null;
	}
}
function Hs(e) {
	let t = e.indexOf("?");
	return t === -1 ? [e, ""] : [e.slice(0, t), e.slice(t)];
}
function Us(e, t) {
	let [n, r] = Hs(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}${zs}${r}`;
}
function Ws(e, t) {
	let [n, r] = Hs(e);
	return `${n.replace("master.m3u8", `media_v${t}`)}.m3u8${r}`;
}
async function Gs(e, t) {
	try {
		let n = t(), r = await fetch(e, {
			method: "HEAD",
			headers: n ? { Authorization: `Bearer ${n}` } : void 0
		});
		return r.status === 404 ? "absent" : r.ok ? "available" : "unknown";
	} catch {
		return "unknown";
	}
}
// src/composables/useTrickplay.ts
var Ks = 10;
function qs(e) {
	let t = S(null), n = S(!1), r = S(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new Jt({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % Ks, s = Math.floor(i / Ks), c = a / 9 * 100, l = s / 5 * 100;
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
// src/components/ui/IconButton.vue?vue&type=script&setup=true&lang.ts
var Js = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Ys = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		}, [u(Y, {
			name: e.loading ? "spinner" : e.name,
			class: g({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, Js));
	}
}), [["__scopeId", "data-v-48bb9819"]]);
// src/composables/layerFocusStack.ts
function Xs() {
	let e = [];
	return {
		push: (t) => {
			e.push(t);
		},
		pop: () => e.length > 0 ? e.pop() : null,
		isTop: (t) => e.length > 0 && e[e.length - 1] === t,
		depth: () => e.length,
		clear: () => {
			e.length = 0;
		}
	};
}
var Zs = Xs(), Qs = /* @__PURE__ */ new Set(), $s = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])", ec = 0, tc = "";
function nc() {
	ec === 0 && (tc = document.body.style.overflow, document.body.style.overflow = "hidden"), ec++;
}
function rc() {
	ec !== 0 && (ec--, ec === 0 && (document.body.style.overflow = tc));
}
var ic = Zs;
function ac() {
	let e = document.querySelector("[data-focus-anchor]");
	if (e && document.contains(e)) return e;
	let t = Qs.values().next().value;
	return t && document.contains(t) ? t : null;
}
function oc(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = null, o = !1, s = !1;
	function c() {
		if (!s) return;
		s = !1;
		let e = [];
		for (; ic.depth() > 0;) {
			let t = ic.pop();
			if (t === a) break;
			e.push(t);
		}
		for (let t = e.length - 1; t >= 0; t--) ic.push(e[t]);
	}
	function l() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll($s)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function u(r) {
		if (!t.value || !e.value || ic.depth() > 0 && !(a !== null && ic.isTop(a))) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = l();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let o = i[0], s = i[i.length - 1], c = document.activeElement;
		e.value.contains(c) ? r.shiftKey && c === o ? (r.preventDefault(), s.focus()) : !r.shiftKey && c === s && (r.preventDefault(), o.focus()) : (r.preventDefault(), o.focus());
	}
	function d() {
		s ||= (i = document.activeElement, a = { opener: i }, ic.push(a), !0), e.value?.setAttribute("data-focus-trap", ""), r && (nc(), o = !0), document.addEventListener("keydown", u, !0), h(() => {
			e.value?.setAttribute("data-focus-trap", ""), (l()[0] ?? e.value)?.focus();
		});
	}
	function f() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", u, !0), o &&= (rc(), !1), c(), a = null, i && document.contains(i) ? i.focus?.() : i && ic.depth() === 0 && ac()?.focus?.(), i = null;
	}
	P(t, (e) => e ? d() : f(), { immediate: !0 }), v(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", u, !0), o &&= (rc(), !1), c();
	});
}
// src/components/player/shortcuts.ts
var sc = [
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
], cc = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, lc = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function uc(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function dc(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function fc(e, t) {
	switch (e.key) {
		case " ": return !uc(e.target) && (t.playPause(), !0);
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
function pc(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || dc(n.target) || fc(n, e) && n.preventDefault();
	}
	y(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), v(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
// src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var mc = ["aria-label"], hc = { class: "shortcuts__head" }, gc = { class: "shortcuts__title" }, _c = { class: "shortcuts__grid" }, vc = { class: "shortcuts__keys" }, yc = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, bc = {
	key: 1,
	class: "shortcuts__key"
}, xc = { class: "shortcuts__label" }, Sc = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => sc }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, c = n, { t: d } = J(), f = S(null);
		return oc(f, D(r, "open"), {
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
		}, [s("div", hc, [s("h3", gc, E(O(d)("player.keyboard")), 1), u(Ys, {
			name: "x",
			label: O(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => c("close")
		}, null, 8, ["label"])]), s("ul", _c, [(x(!0), o(e, null, C(t.shortcuts, (t) => (x(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", vc, [(x(!0), o(e, null, C(t.keys, (t, n) => (x(), o(e, { key: n }, [t === "–" ? (x(), o("span", yc, "–")) : (x(), o("kbd", bc, [O(cc)[t] ? (x(), i(Y, {
			key: 0,
			name: O(cc)[t],
			label: O(lc)[t] ?? t
		}, null, 8, ["name", "label"])) : (x(), o(e, { key: 1 }, [l(E(t), 1)], 64))]))], 64))), 128))]), s("span", xc, E(t.label), 1)]))), 128))])], 8, mc)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Cc = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], wc = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		}, null, 4)], 544)], 42, Cc));
	}
}), [["__scopeId", "data-v-57426415"]]), Tc = { class: "volume" }, Ec = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "VolumeControl",
	setup(e) {
		let t = ue(), n = te(), { t: i } = J(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return P(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (x(), o("div", Tc, [u(Ys, {
			name: s.value,
			label: O(t).muted ? O(i)("player.unmute") : O(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => O(t).toggleMute()
		}, null, 8, ["name", "label"]), u(wc, {
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
// src/components/ui/listbox.ts
function Dc(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function Oc(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function kc(e, t) {
	return t === "first" ? Oc(e, -1, 1) : Oc(e, 0, -1);
}
// src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var Ac = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], jc = ["id", "aria-label"], Mc = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Nc = { class: "phlix-select__check" }, Pc = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let d = t, { t: f } = J(), p = c, m = r(() => Dc(d.options)), _ = k(), y = S(!1), b = S(-1), w = S(null), T = S(null);
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
			d.disabled || y.value || (V(), y.value = !0, b.value = L.value >= 0 ? L.value : kc(m.value, "first"), h(te));
		}
		function U() {
			y.value = !1;
		}
		function W(e) {
			let t = m.value[e];
			t && !t.disabled && (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), U(), w.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function ee(e) {
			b.value = Oc(m.value, b.value, e), h(te);
		}
		function te() {
			(T.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function ne(e) {
			if (!d.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), y.value ? ee(1) : H();
					break;
				case "ArrowUp":
					e.preventDefault(), y.value ? ee(-1) : H();
					break;
				case "Home":
					y.value && (e.preventDefault(), b.value = kc(m.value, "first"), h(te));
					break;
				case "End":
					y.value && (e.preventDefault(), b.value = kc(m.value, "last"), h(te));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), y.value && b.value >= 0 ? W(b.value) : H();
					break;
				case "Escape":
					y.value && (e.preventDefault(), U());
					break;
				case "Tab":
					U();
					break;
				default: e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey || re(e.key);
			}
		}
		function re(e) {
			y.value || H(), j += e.toLowerCase(), clearTimeout(M), M = setTimeout(() => j = "", 600);
			let t = m.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(j));
			t >= 0 && (b.value = t, h(te));
		}
		function ie(e) {
			y.value && w.value && !w.value.contains(e.target) && U();
		}
		return P(y, (e) => {
			e ? document.addEventListener("pointerdown", ie, !0) : document.removeEventListener("pointerdown", ie, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", ie, !0), clearTimeout(M);
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
			onKeydown: ne
		}, [s("span", { class: g(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, E(L.value >= 0 ? R.value : t.placeholder ?? O(f)("common.selectPlaceholder")), 3), u(Y, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, Ac), I(s("ul", {
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
			onClick: (e) => W(n),
			onPointermove: (t) => !e.disabled && (b.value = n)
		}, [s("span", Nc, [e.value === t.modelValue ? (x(), i(Y, {
			key: 0,
			name: "check"
		})) : a("", !0)]), l(" " + E(e.label), 1)], 42, Mc))), 128))], 10, jc), [[N, y.value]])], 2));
	}
}), [["__scopeId", "data-v-98c48956"]]), Fc = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		], n = ue(), { t: a } = J(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (x(), i(Pc, {
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
}), [["__scopeId", "data-v-4530b308"]]), Ic = "auto", Lc = "original";
function Rc(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function zc(e) {
	return e >= 2160 ? "4K" : Rc(e);
}
function Bc(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Rc(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: zc(r.height)
		}));
	}
	return n;
}
function Vc(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Rc(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Hc(e, t) {
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
function Uc(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Wc(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Hc(e, n) >= 0;
}
function Gc(e, t) {
	if (t < 0) return Ic;
	let n = e.find((e) => e.index === t);
	return n ? Rc(n.height) : Ic;
}
// src/components/player/QualityMenu.vue
var Kc = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let u = n, d = ue(), f = te(), { t: p } = J(), m = r(() => Bc(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = Rc(r.height);
				e.has(i) || n && Vc(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: zc(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => Hc(o.levels, _.value)), y = r(() => _.value && v.value >= 0 ? {
			value: Lc,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: zc(o.activeHeight) })), w = r(() => [
			{
				value: Ic,
				label: C.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? Ic : y.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? Lc : Gc(o.levels, o.currentLevel));
		function E(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : Vc(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => b.value || s.value ? (x(), i(Pc, {
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
// src/components/player/captions.ts
function qc(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function Jc(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Yc(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Xc(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Zc(e) {
	return e ? qc(e.textTracks).filter(Jc).map((e, t) => ({
		index: t,
		language: Yc(e, t),
		label: e.label || Xc(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function Qc(e) {
	let t = e?.audioTracks;
	return qc(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Xc(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function $c(e, t) {
	return !e || t == null ? null : qc(e.textTracks).filter(Jc).find((e, n) => Yc(e, n) === t) ?? null;
}
function el(e, t) {
	return $c(e, t) != null;
}
function tl(e, t) {
	e && qc(e.textTracks).filter(Jc).forEach((e, n) => {
		try {
			e.mode = Yc(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function nl(e, t) {
	let n = e?.audioTracks;
	qc(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function rl(e) {
	let t = e?.audioTracks;
	return qc(t).findIndex((e) => e.enabled);
}
var il = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function al(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function ol(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && al(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(il, n) ? il[n] : e;
	});
}
function sl(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => ol(e).trim()).filter((e) => e.length > 0) : [];
}
function cl(e) {
	if (!e) return [];
	let t = qc(e.activeCues), n = [];
	for (let e of t) n.push(...sl(e.text));
	return n;
}
var ll = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, ul = [
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
], dl = [
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
], fl = [
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
], pl = [
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
function ml(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function hl(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function gl(e) {
	return {
		"--cap-scale": String(ll[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": ml(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": hl(e.edge)
	};
}
// src/components/player/CaptionOverlay.vue
var _l = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
			...gl(i.styleConfig),
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
			e && typeof ResizeObserver < "u" && (d = new ResizeObserver(() => f()), d.observe(e));
		}
		P(() => i.controlsRoot, m, { immediate: !0 }), v(p);
		let h = null, y = null, b = null;
		function w() {
			s.value = cl(h);
		}
		function T() {
			b != null && (clearTimeout(b), b = null);
		}
		function D() {
			T(), b = setTimeout(() => {
				if (b = null, !h) return;
				tl(i.video, i.language);
				let e = cl(h);
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
			O(), tl(i.video, i.language);
			let e = $c(i.video, i.language);
			if (e) {
				if (h = e, e.addEventListener("cuechange", w), s.value = cl(e), !s.value.length) {
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
}), [["__scopeId", "data-v-2e78d015"]]), vl = ["aria-label", "aria-expanded"], yl = ["aria-label"], bl = { class: "capmenu__head" }, xl = { class: "capmenu__title" }, Sl = ["aria-label"], Cl = ["aria-checked", "tabindex"], wl = { class: "capmenu__check" }, Tl = { class: "capmenu__optlabel" }, El = [
	"aria-checked",
	"tabindex",
	"onClick"
], Dl = { class: "capmenu__check" }, Ol = { class: "capmenu__optlabel" }, kl = { class: "capmenu__check" }, Al = { class: "capmenu__optlabel" }, jl = { class: "capmenu__title capmenu__title--sub" }, Ml = ["aria-label"], Nl = [
	"aria-checked",
	"tabindex",
	"onClick"
], Pl = { class: "capmenu__check" }, Fl = { class: "capmenu__optlabel" }, Il = { class: "capmenu__title capmenu__title--sub" }, Ll = { class: "capmenu__style" }, Rl = { class: "capmenu__field" }, zl = { class: "capmenu__fieldlabel" }, Bl = { class: "capmenu__field" }, Vl = { class: "capmenu__fieldlabel" }, Hl = { class: "capmenu__field" }, Ul = { class: "capmenu__fieldlabel" }, Wl = { class: "capmenu__field" }, Gl = { class: "capmenu__fieldlabel" }, Kl = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let c = t, l = n, d = ue(), f = te(), { t: p } = J(), m = S(null), h = S(null), _ = r(() => d.subtitleLang), y = r(() => c.tracks.some((e) => e.language === _.value)), b = r(() => y.value ? "captions" : "captions-off"), w = r(() => y.value ? c.tracks.findIndex((e) => e.language === _.value) + 1 : 0), T = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
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
		oc(h, D(c, "open"), {
			lockScroll: !1,
			onEscape: () => (A(), !0)
		});
		function H(e) {
			m.value && !m.value.contains(e.target) && A();
		}
		return P(() => c.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", H, !0) : document.removeEventListener("pointerdown", H, !0));
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
		}, [u(Y, { name: b.value }, null, 8, ["name"])], 10, vl), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", bl, [s("h3", xl, E(O(p)("player.subtitles")), 1), u(Ys, {
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
			}, [s("span", wl, [y.value ? a("", !0) : (x(), i(Y, {
				key: 0,
				name: "check"
			}))]), s("span", Tl, E(O(p)("player.off")), 1)], 8, Cl), (x(!0), o(e, null, C(t.tracks, (e, t) => (x(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: w.value === t + 1 ? 0 : -1,
				onClick: (t) => j(e.language)
			}, [s("span", Dl, [_.value === e.language ? (x(), i(Y, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", Ol, E(e.label), 1)], 8, El))), 128))], 40, Sl),
			s("button", {
				type: "button",
				class: "capmenu__add",
				onClick: N
			}, [s("span", kl, [u(Y, { name: "plus" })]), s("span", Al, E(O(p)("player.addSubtitles")), 1)]),
			t.audioTracks.length > 0 ? (x(), o(e, { key: 0 }, [s("h3", jl, E(O(p)("player.audio")), 1), s("div", {
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
			}, [s("span", Pl, [t.activeAudio === e.index ? (x(), i(Y, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", Fl, E(e.label), 1)], 8, Nl))), 128))], 40, Ml)], 64)) : a("", !0),
			s("h3", Il, E(O(p)("player.captionStyle")), 1),
			s("div", Ll, [
				s("div", Rl, [s("span", zl, E(O(p)("player.size")), 1), u(Pc, {
					"model-value": O(f).captionStyle.size,
					options: O(ul),
					label: O(p)("player.captionSize"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", Bl, [s("span", Vl, E(O(p)("player.color")), 1), u(Pc, {
					"model-value": O(f).captionStyle.textColor,
					options: O(dl),
					label: O(p)("player.captionColor"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", Hl, [s("span", Ul, E(O(p)("player.background")), 1), u(Pc, {
					"model-value": O(f).captionStyle.background,
					options: O(fl),
					label: O(p)("player.captionBackground"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", Wl, [s("span", Gl, E(O(p)("player.edge")), 1), u(Pc, {
					"model-value": O(f).captionStyle.edge,
					options: O(pl),
					label: O(p)("player.captionEdge"),
					"onUpdate:modelValue": V
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, yl)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-62fcc11d"]]), ql = ["aria-labelledby"], Jl = {
	key: 0,
	class: "phlix-modal__header"
}, Yl = ["id"], Xl = { class: "phlix-modal__body" }, Zl = {
	key: 1,
	class: "phlix-modal__footer"
}, Ql = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let { t: c } = J(), l = e, d = r, f = S(l.modelValue);
		P(() => l.modelValue, (e) => f.value = e);
		let p = S(null), m = k();
		function h() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			l.dismissible && h();
		}
		return oc(p, f, { onEscape: () => l.dismissible ? (h(), !0) : !1 }), (r, l) => (x(), i(t, { to: "body" }, [u(n, { name: "phlix-modal" }, {
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
				e.title || !e.hideClose ? (x(), o("header", Jl, [e.title ? (x(), o("h2", {
					key: 0,
					id: O(m),
					class: "phlix-modal__title"
				}, E(e.title), 9, Yl)) : a("", !0), e.hideClose ? a("", !0) : (x(), i(Ys, {
					key: 1,
					name: "x",
					label: O(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: h
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", Xl, [w(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (x(), o("footer", Zl, [w(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, ql)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-12c692c9"]]), $l = [
	"type",
	"disabled",
	"aria-disabled",
	"aria-busy"
], eu = {
	key: 0,
	class: "phlix-btn__spinner"
}, tu = { class: "phlix-btn__label" }, nu = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let t = e, n = S(null);
		function r(e) {
			t.loading && (e.preventDefault(), e.stopImmediatePropagation());
		}
		function c(e) {
			t.loading && e.submitter === n.value && (e.preventDefault(), e.stopImmediatePropagation());
		}
		let l = null;
		return y(() => {
			let e = n.value?.closest("form");
			e && (e.addEventListener("submit", c, !0), l = e);
		}), v(() => {
			l?.removeEventListener("submit", c, !0), l = null;
		}), (t, c) => (x(), o("button", {
			ref_key: "rootEl",
			ref: n,
			type: e.type,
			class: g(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: e.disabled || void 0,
			"aria-disabled": e.loading || void 0,
			"aria-busy": e.loading || void 0,
			onClick: r
		}, [
			e.loading ? (x(), o("span", eu, [u(Y, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (x(), i(Y, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", tu, [w(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (x(), i(Y, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, $l));
	}
}), [["__scopeId", "data-v-cf0eaa3c"]]), ru = [
	"disabled",
	"aria-label",
	"aria-pressed"
], iu = { class: "phlix-chip__label" }, au = ["disabled", "aria-label"], ou = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		}, [e.icon ? (x(), i(Y, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : a("", !0), s("span", iu, [w(t.$slots, "default", {}, void 0, !0)])], 8, ru), e.removable ? (x(), o("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [u(Y, { name: "x" })], 8, au)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-6addaaaa"]]), su = ["aria-label"], cu = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: n } = J(), i = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (x(), o("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? O(n)("common.loading"),
			style: _(i.value ? { fontSize: i.value } : void 0)
		}, [u(Y, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, su));
	}
}), [["__scopeId", "data-v-736b299d"]]), lu = ["role", "aria-label"], uu = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		}, [e.icon ? (x(), i(Y, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : a("", !0), w(t.$slots, "default", {}, void 0, !0)], 10, lu));
	}
}), [["__scopeId", "data-v-1e0d86a2"]]), du = {
	class: "phlix-empty",
	role: "status"
}, fu = { class: "phlix-empty__icon" }, pu = { class: "phlix-empty__title" }, mu = {
	key: 0,
	class: "phlix-empty__desc"
}, hu = {
	key: 1,
	class: "phlix-empty__actions"
}, gu = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (x(), o("div", du, [
			s("span", fu, [u(Y, { name: e.icon }, null, 8, ["name"])]),
			s("h3", pu, E(e.title), 1),
			e.description || t.$slots.default ? (x(), o("p", mu, [w(t.$slots, "default", {}, () => [l(E(e.description), 1)], !0)])) : a("", !0),
			t.$slots.actions ? (x(), o("div", hu, [w(t.$slots, "actions", {}, void 0, !0)])) : a("", !0)
		]));
	}
}), [["__scopeId", "data-v-1790dcf5"]]), _u = { class: "subsearch" }, vu = { class: "subsearch__langs" }, yu = { class: "subsearch__legend" }, bu = { class: "subsearch__chips" }, xu = { class: "subsearch__actions" }, Su = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, Cu = {
	key: 2,
	class: "subsearch__prompt"
}, wu = {
	key: 3,
	class: "subsearch__list"
}, Tu = { class: "subsearch__meta" }, Eu = { class: "subsearch__release" }, Du = { class: "subsearch__signals" }, Ou = { class: "subsearch__provider" }, ku = ["aria-label"], Au = {
	key: 2,
	class: "subsearch__stat"
}, ju = {
	key: 3,
	class: "subsearch__stat"
}, Mu = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let c = t, d = n, { t: f } = J(), p = Yt(), m = [
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
				r && !e.has(r) && (e.add(r), t.push(r));
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
			return c.client ?? new Jt({ baseUrl: c.apiBase ?? "" });
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
			if (e instanceof me) {
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
				let n = ws([(await N().downloadSubtitle(c.mediaId, {
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
		}, { immediate: !0 }), (n, r) => (x(), i(Ql, {
			"model-value": t.open,
			title: O(f)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => d("update:open", e)
		}, {
			footer: F(() => [u(nu, {
				variant: "ghost",
				onClick: L
			}, {
				default: F(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			})]),
			default: F(() => [s("div", _u, [
				s("fieldset", vu, [s("legend", yu, E(O(f)("player.subtitleSearchLanguages")), 1), s("div", bu, [(x(!0), o(e, null, C(g.value, (e) => (x(), i(ou, {
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
				s("div", xu, [u(nu, {
					variant: "solid",
					"left-icon": "search",
					loading: b.value,
					disabled: !M.value,
					onClick: I
				}, {
					default: F(() => [l(E(O(f)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				b.value ? (x(), o("div", Su, [u(cu, { label: O(f)("player.subtitleSearching") }, null, 8, ["label"]), s("span", null, E(O(f)("player.subtitleSearching")), 1)])) : w.value && j.value.length === 0 ? (x(), i(gu, {
					key: 1,
					icon: "captions",
					title: O(f)("player.subtitleSearchEmpty"),
					description: O(f)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : w.value ? (x(), o("ul", wu, [(x(!0), o(e, null, C(j.value, (e) => (x(), o("li", {
					key: A(e),
					class: "subsearch__item"
				}, [s("div", Tu, [s("p", Eu, E(e.releaseName || e.provider), 1), s("div", Du, [
					u(uu, {
						tone: "neutral",
						size: "sm"
					}, {
						default: F(() => [l(E(h(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (x(), i(uu, {
						key: 0,
						tone: "info",
						size: "sm",
						label: O(f)("player.subtitleHearingImpairedFull")
					}, {
						default: F(() => [l(E(O(f)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : a("", !0),
					s("span", Ou, E(e.provider), 1),
					e.rating > 0 ? (x(), o("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": O(f)("player.subtitleRating", { rating: e.rating })
					}, [u(Y, { name: "star" }), l(" " + E(e.rating), 1)], 8, ku)) : a("", !0),
					e.downloadCount > 0 ? (x(), o("span", Au, E(O(f)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : a("", !0),
					e.fps ? (x(), o("span", ju, E(O(f)("player.subtitleFps", { fps: e.fps })), 1)) : a("", !0)
				])]), u(nu, {
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
				])]))), 128))])) : (x(), o("p", Cu, E(O(f)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), Nu = 32, Pu = 18, Fu = 250, Iu = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Lu(e, t, n, r, i, a, o) {
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
		r: Iu(d / m),
		g: Iu(f / m),
		b: Iu(p / m)
	};
}
function Ru(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Lu(e, t, n, 0, 0, r, n),
		right: Lu(e, t, n, t - r, 0, t, n),
		center: Lu(e, t, n, 0, 0, t, n)
	};
}
function zu({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Bu({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
var Vu = (e) => `${Math.round(e * 1e3) / 10}%`;
function Hu(e, t = 1) {
	return Uu(e, t).map((e) => `radial-gradient(${Vu(e.rx)} ${Vu(e.ry)} at ${Vu(e.cx)} ${Vu(e.cy)}, ${Bu(e.color, e.alpha)}, transparent ${Vu(e.stop)})`).join(", ");
}
function Uu(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		{
			cx: .12,
			cy: .3,
			rx: .4,
			ry: .6,
			color: e.left,
			alpha: n(.55),
			stop: .7
		},
		{
			cx: .88,
			cy: .7,
			rx: .45,
			ry: .55,
			color: e.right,
			alpha: n(.5),
			stop: .7
		},
		{
			cx: .5,
			cy: .5,
			rx: .5,
			ry: .5,
			color: e.center,
			alpha: n(.3),
			stop: .75
		}
	];
}
function Wu(e, t) {
	e.clearRect(0, 0, 112, 72), e.filter = "blur(3px)";
	for (let n of t) {
		let t = 8 + n.cx * 96, r = 9 + n.cy * 54, i = n.rx * 96, a = n.ry * 54;
		e.save(), e.translate(t, r), e.scale(i, a);
		let o = e.createRadialGradient(0, 0, 0, 0, 0, 1), { r: s, g: c, b: l } = n.color;
		o.addColorStop(0, Bu(n.color, n.alpha)), o.addColorStop(n.stop, `rgba(${s}, ${c}, ${l}, 0)`), e.fillStyle = o, e.fillRect((8 - t) / i, (9 - r) / a, 96 / i, 54 / a), e.restore();
	}
}
function Gu(e) {
	return !!e && !e.charging && e.level <= .2;
}
// src/components/player/AmbientCanvas.vue
var Ku = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
			i.value = Gu(a);
		}
		let c = r(() => n.enabled && !n.reducedMotion && !i.value), l = r(() => Math.min(1, .85 * Math.max(0, n.intensity))), u = S(null), d = S(null), f = null, p = null, m = !1;
		function h(e) {
			if (m || typeof document > "u") return null;
			try {
				if (!p && (f = document.createElement("canvas"), f.width = 112, f.height = 72, p = f.getContext("2d"), !p)) throw Error("no 2d context");
				Wu(p, Uu(e));
				let t = f?.toDataURL("image/png");
				if (typeof t != "string" || !t.startsWith("data:image/")) throw Error("no bitmap");
				return t;
			} catch {
				return m = !0, p = null, f = null, null;
			}
		}
		let b = null, C = null, w = !1, T = !1;
		function E() {
			if (w) return C;
			if (T || typeof document > "u") return T = !0, null;
			b = document.createElement("canvas"), b.width = 32, b.height = 18;
			try {
				C = b.getContext("2d", { willReadFrequently: !0 });
			} catch {
				C = null;
			}
			return C ? (w = !0, C) : (T = !0, null);
		}
		function D() {
			let e = n.video;
			if (!c.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = E();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18), r = Ru(n, 32, 18), i = h(r);
				d.value = i, u.value = i ? null : Hu(r);
			} catch {
				T = !0, u.value = null, d.value = null;
			}
		}
		function O(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let k = null, A = null, j = null, M = 0, N = !1;
		function F(e) {
			A = e, k = e.requestVideoFrameCallback(I);
		}
		function I(e) {
			if (!N) return;
			e - M >= 250 && (M = e, D());
			let t = n.video;
			O(t) && F(t);
		}
		function L() {
			if (N || !c.value || !n.video) return;
			let e = n.video;
			O(e) ? (N = !0, M = 0, F(e)) : (D(), T || (N = !0, j = setInterval(D, 250)));
		}
		function R() {
			N = !1, k != null && A && A.cancelVideoFrameCallback(k), k = null, A = null, j != null && (clearInterval(j), j = null);
		}
		P(() => [
			c.value,
			n.playing,
			n.video
		], ([e, t]) => {
			R(), e && t && L();
		}, { immediate: !0 }), y(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				a = e, s(), a.addEventListener?.("chargingchange", s), a.addEventListener?.("levelchange", s);
			}).catch(() => {});
		}), v(() => {
			R(), a?.removeEventListener?.("chargingchange", s), a?.removeEventListener?.("levelchange", s);
		});
		let z = r(() => {
			let e = { opacity: String(l.value) };
			return d.value ? e.backgroundImage = `url("${d.value}")` : u.value && (e.background = u.value), e;
		});
		return t({ sampleNow: D }), (e, t) => (x(), o("div", {
			class: g(["player__ambient", {
				"is-active": c.value,
				"is-bitmap": c.value && !!d.value
			}]),
			style: _(c.value ? z.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-ba42f7c0"]]), qu = ["aria-label"], Ju = { class: "resume__label" }, Yu = { class: "resume__time numeric" }, Xu = { class: "resume__actions" }, Zu = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = J(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (x(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": O(i)("player.resumePlayback")
		}, [s("p", Ju, [
			l(E(a.value[0]), 1),
			s("span", Yu, E(O(is)(e.seconds)), 1),
			l(E(a.value[1]), 1)
		]), s("div", Xu, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [u(Y, { name: "play" }), s("span", null, E(O(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [u(Y, { name: "rewind" }), s("span", null, E(O(i)("player.startOver")), 1)])])], 8, qu));
	}
}), [["__scopeId", "data-v-271c5209"]]), Qu = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], $u = [
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
], ed = new Set($u);
function td(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function nd(...e) {
	return e.some((e) => ed.has(td(e)));
}
function rd(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function id(e) {
	return e?.error?.code === 2;
}
var ad = 3e4;
function od(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return t !== "" && md.get(t) === "hevc";
}
function sd(e) {
	let t = { forceTranscode: "1" };
	return od(e.videoCodec) && (t.excludeHevc = "1"), t;
}
function cd(e, t, n, r) {
	return t <= 0 || e - t < 3e4 ? !1 : n <= r;
}
var ld = 8, ud = 15, dd = 2 * Math.PI * 15;
function fd(e, t, n = dd) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var pd = /* @__PURE__ */ new Map([
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
]), md = /* @__PURE__ */ new Map([
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
]), hd = /* @__PURE__ */ new Set(["h264"]), gd = /* @__PURE__ */ new Map([
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
function _d(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = md.get(t);
	return n === void 0 ? "transcode" : hd.has(n) ? "direct" : "probe";
}
function vd(e) {
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
var yd = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function bd(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return yd.get(t) ?? "video/mp4";
}
function xd(e, t = "video/mp4") {
	let n = pd.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Sd(e, t = "video/mp4") {
	if (!e) return !0;
	let n = xd(e, t);
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
async function Cd(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = md.get(n), i = r === void 0 ? void 0 : gd.get(r);
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
async function wd(e, t, n = "") {
	if (nd(...e)) return !0;
	let r = e.map((e) => td(e)).find((e) => Qu.includes(e)) ?? "";
	if (!Qu.includes(r)) return !1;
	let i = bd(r), a = _d(n);
	if (a === "transcode" || a === "probe" && !await Cd(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Sd(e.codec, i)) return !0;
	}
	return !1;
}
// src/utils/imageSrc.ts
function Td(e) {
	return e.length > 1 && e[0] === "/" && e[1] !== "/" && e[1] !== "\\";
}
function Ed(e, t) {
	if (typeof t != "string" || t === "" || !Td(t)) return t;
	let n = e.replace(/\/+$/, "");
	return n === "" ? t : n + t;
}
function Dd(e, t) {
	if (typeof t != "string" || t.trim() === "") return t;
	let n = [];
	for (let r of t.split(",")) {
		let t = r.trim();
		if (t === "") continue;
		let i = t.search(/\s/), a = i === -1 ? t : t.slice(0, i), o = i === -1 ? "" : t.slice(i);
		n.push(String(Ed(e, a)) + o);
	}
	return n.length > 0 ? n.join(", ") : t;
}
// src/composables/useImageSrc.ts
function Od() {
	let e = nn();
	return {
		imgSrc: (t) => Ed(e.value, t),
		imgSrcset: (t) => Dd(e.value, t)
	};
}
// src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var kd = ["aria-label"], Ad = ["src"], jd = { class: "upnext__body" }, Md = { class: "upnext__eyebrow" }, Nd = { class: "upnext__title" }, Pd = {
	key: 0,
	class: "upnext__cd numeric"
}, Fd = { class: "upnext__actions" }, Id = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Ld = ["r"], Rd = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], zd = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let { t: n } = J(), { imgSrc: i } = Od(), c = e, l = t, d = r(() => c.posterUrl ?? c.media.poster_url ?? null), f = r(() => fd(c.remaining, c.total));
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
			}, null, 8, Ad)) : a("", !0),
			s("div", jd, [
				s("p", Md, E(O(n)("player.upNext")), 1),
				s("h4", Nd, E(e.media.name), 1),
				e.counting ? (x(), o("p", Pd, E(e.remaining > 0 ? O(n)("player.startsIn", { count: e.remaining }) : O(n)("player.startingNow")), 1)) : a("", !0),
				s("div", Fd, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => l("play-now")
				}, [u(Y, { name: "play" }), s("span", null, E(O(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => l("cancel")
				}, E(O(n)("player.cancel")), 1)])
			]),
			e.counting ? (x(), o("svg", Id, [s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Ld), s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": O(dd),
				"stroke-dashoffset": f.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Rd)])) : a("", !0)
		], 8, kd));
	}
}), [["__scopeId", "data-v-3fc667d0"]]), Bd = {
	class: "transcode",
	role: "alert"
}, Vd = { class: "transcode__card" }, Hd = { class: "transcode__heading" }, Ud = { class: "transcode__body" }, Wd = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = J();
		return (t, i) => (x(), o("div", Bd, [s("div", Vd, [
			u(Y, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", Hd, E(O(r)("player.transcodeHeading")), 1),
			s("p", Ud, E(e.title ? O(r)("player.transcodeBodyTitled", { title: e.title }) : O(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [u(Y, { name: "arrow-left" }), s("span", null, E(O(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Gd = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Kd = { class: "prep__card" }, qd = { class: "prep__heading" }, Jd = { class: "prep__body" }, Yd = ["aria-valuenow"], Xd = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = J(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (x(), o("div", Gd, [s("div", Kd, [
			u(Y, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", qd, E(O(n)("player.transcodePreparingHeading")), 1),
			s("p", Jd, E(e.title ? O(n)("player.transcodePreparingTitled", { title: e.title }) : O(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: _({ width: r() + "%" })
			}, null, 4)], 8, Yd),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [u(Y, { name: "arrow-left" }), s("span", null, E(O(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Zd = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let c = e, l = t, { t: d } = J();
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
			}, [s("span", null, E(p.value.label), 1), u(Y, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Qd = ["aria-label"], $d = ["aria-label", "onClick"], ef = { class: "skip-controls__label" }, tf = 5, nf = 30, rf = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: l } = J();
		function d(e) {
			return e / 1e3;
		}
		function f(e, t) {
			return t >= d(e.endMs);
		}
		function p(e, t) {
			if (f(e, t)) return !1;
			let n = d(e.startMs), r = n - tf, i = n + nf;
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
		}, [s("span", ef, E(h(e.type)), 1), u(Y, { name: "skip-forward" })], 8, $d))), 128))], 8, Qd)) : a("", !0);
	}
}), [["__scopeId", "data-v-acac8ee3"]]), af = ["aria-label", "aria-expanded"], of = ["aria-label"], sf = { class: "chapterlist__head" }, cf = { class: "chapterlist__title" }, lf = ["aria-label"], uf = ["onClick"], df = { class: "chapterlist__index" }, ff = { class: "chapterlist__name" }, pf = { class: "chapterlist__meta" }, mf = { class: "chapterlist__time" }, hf = {
	key: 0,
	class: "chapterlist__duration"
}, gf = {
	key: 1,
	class: "chapterlist__empty"
}, _f = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let i = t, c = n, { t: l } = J();
		function d() {
			c("update:open", !1);
		}
		function f() {
			c("update:open", !i.open);
		}
		let p = r(() => i.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = is(e.start), a;
			return e.end != null && e.end > e.start && (a = is(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = S(null), h = S(null);
		oc(h, D(i, "open"), {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function _(e) {
			m.value && !m.value.contains(e.target) && d();
		}
		P(() => i.open, (e) => {
			typeof document < "u" && (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
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
		}, [u(Y, { name: "list" })], 10, af), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(l)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", sf, [s("h3", cf, E(O(l)("player.chapters")), 1), u(Ys, {
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
			s("span", df, E(e.index), 1),
			s("span", ff, E(e.label), 1),
			s("span", pf, [s("span", mf, E(e.startLabel), 1), e.durationLabel ? (x(), o("span", hf, "· " + E(e.durationLabel), 1)) : a("", !0)])
		], 8, uf)]))), 128))], 8, lf)) : (x(), o("p", gf, E(O(l)("player.noChapters")), 1))], 8, of)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), vf = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, yf = { class: "marker-timeline__ticks" }, bf = [
	"title",
	"aria-label",
	"onClick"
], xf = { class: "marker-timeline__tooltip" }, Sf = { class: "marker-timeline__tooltip-label" }, Cf = { class: "marker-timeline__tooltip-time numeric" }, wf = ["onClick"], Tf = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		}, [h.value ? (x(), o("div", vf, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), l(" " + E(v.value), 1)])) : a("", !0), s("div", yf, [(x(!0), o(e, null, C(p.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: g(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: _({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${O(is)(e.startSec)}`,
			"aria-label": `${e.label} at ${O(is)(e.startSec)}`,
			onClick: R((t) => y(e), ["stop"])
		}, [s("span", xf, [
			s("span", Sf, E(e.label), 1),
			s("span", Cf, E(O(is)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: R((t) => b(e), ["stop"])
			}, " Find similar ", 8, wf)
		])], 14, bf))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Ef = ["aria-label", "aria-expanded"], Df = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Of = ["aria-label"], kf = ["aria-selected", "onClick"], Af = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(t, { expose: i }) {
		let c = t, { t: l } = J(), d = [
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
			_(), p.value = e, e <= 0 || (h = setInterval(() => {
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
		}, [u(Y, { name: "moon" }), m.value ? (x(), o("span", Df, E(w(p.value)), 1)) : a("", !0)], 10, Ef), u(n, { name: "dropdown" }, {
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
			}, E(e.label), 11, kf)), 64))], 8, Of)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), jf = [
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
function Mf(e, t) {
	return (e >>> t | e << 32 - t) >>> 0;
}
function Nf(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e.codePointAt(n);
		r > 65535 && (n += 1), r < 128 ? t.push(r) : r < 2048 ? t.push(192 | r >>> 6, 128 | r & 63) : r < 65536 ? t.push(224 | r >>> 12, 128 | r >>> 6 & 63, 128 | r & 63) : t.push(240 | r >>> 18, 128 | r >>> 12 & 63, 128 | r >>> 6 & 63, 128 | r & 63);
	}
	return t;
}
function Pf(e) {
	let t = Nf(e), n = t.length * 8;
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
			let t = (Mf(p[e - 15], 7) ^ Mf(p[e - 15], 18) ^ p[e - 15] >>> 3) >>> 0, n = (Mf(p[e - 2], 17) ^ Mf(p[e - 2], 19) ^ p[e - 2] >>> 10) >>> 0;
			p[e] = p[e - 16] + t + p[e - 7] + n >>> 0;
		}
		let n = a, r = o, i = s, m = c, h = l, g = u, _ = d, v = f;
		for (let e = 0; e < 64; e += 1) {
			let t = (Mf(h, 6) ^ Mf(h, 11) ^ Mf(h, 25)) >>> 0, a = (h & g ^ ~h & _) >>> 0, o = v + t + a + jf[e] + p[e] >>> 0, s = ((Mf(n, 2) ^ Mf(n, 13) ^ Mf(n, 22)) >>> 0) + ((n & r ^ n & i ^ r & i) >>> 0) >>> 0;
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
function Ff(e) {
	if (e === "") throw Error("hashGroupPassword: refusing to hash an empty password — omit the password_hash field instead");
	return Pf(e);
}
// src/api/socketHint.ts
var If = {
	wsUrl: null,
	wsPath: null
}, Lf = /^wss?:\/\/[^/?#@]+$/i, Rf = /^\/[^?#]*$/;
function zf(e) {
	if (typeof e != "object" || !e) return If;
	let t = e;
	if (typeof t.wsUrl != "string" || !Lf.test(t.wsUrl)) return If;
	let n = typeof t.wsPath == "string" && Rf.test(t.wsPath) ? t.wsPath.replace(/\/+$/, "") : null;
	return {
		wsUrl: t.wsUrl,
		wsPath: n
	};
}
function Bf() {
	return typeof window > "u" ? If : zf(window.__PHLIX__);
}
// node_modules/@phlix/syncplay/dist/phlix-syncplay.js
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
}, Vf = [
	Z.GROUP_CREATE,
	Z.GROUP_JOIN,
	Z.GROUP_LEAVE,
	Z.GROUP_STATE,
	Z.GROUP_LIST,
	Z.PLAYBACK_PLAY,
	Z.PLAYBACK_PAUSE,
	Z.PLAYBACK_SEEK,
	Z.PLAYBACK_QUEUE,
	Z.PLAYBACK_SYNC,
	Z.CHAT,
	Z.TYPING,
	Z.HOST_TRANSFER,
	Z.HOST_ELECT,
	Z.TIME_PING,
	Z.TIME_PONG,
	Z.TIME_SYNC,
	Z.ERROR,
	Z.INFO
];
function Hf(e) {
	return Vf.includes(e);
}
function Uf(e) {
	"@babel/helpers - typeof";
	return Uf = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Uf(e);
}
function Wf(e, t) {
	if (Uf(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Uf(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Gf(e) {
	var t = Wf(e, "string");
	return Uf(t) == "symbol" ? t : t + "";
}
function Q(e, t, n) {
	return (t = Gf(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Kf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function qf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Kf(Object(n), !0).forEach(function(t) {
			Q(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Kf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Jf(e, t, n) {
	return qf(qf({}, t), {}, {
		type: e,
		protocol_version: 1,
		timestamp: n()
	});
}
function Yf(e) {
	let t = e;
	if (typeof e == "string") try {
		t = JSON.parse(e);
	} catch {
		return null;
	}
	if (typeof t != "object" || !t || Array.isArray(t)) return null;
	let n = t;
	if (typeof n.type != "string") return null;
	let r = n.data, i = !("protocol_version" in n) && typeof r == "object" && r && !Array.isArray(r) ? (() => {
		let e = {};
		for (let t of Object.keys(n)) t !== "data" && (e[t] = n[t]);
		return qf(qf({}, r), e);
	})() : n;
	return Hf(n.type), i;
}
function Xf(e) {
	return JSON.stringify(e);
}
var Zf = .1, Qf = .99, $f = 1.01, ep = class {
	constructor(e) {
		Q(this, "samples", []), Q(this, "driftRate", 1), Q(this, "now", void 0), Q(this, "samplesVersion", 0), Q(this, "cacheVersion", -1), Q(this, "cachedOffset", 0), Q(this, "cachedLatency", 0), Q(this, "cachedIsStable", !1), this.now = e;
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
		return n === 0 ? 0 : Math.round(t / n);
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
		this.driftRate = 1 + Zf * i / 1e3, this.driftRate = Math.min($f, Math.max(Qf, this.driftRate));
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
	getSampleAgeMs() {
		let e = this.samples[this.samples.length - 1];
		return e === void 0 ? null : this.now() - e.timestamp * 1e3;
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
}, tp = 250, np = class e {
	constructor(t) {
		Q(this, "send", void 0), Q(this, "now", void 0), Q(this, "memberId", void 0), Q(this, "memberName", void 0), Q(this, "options", void 0), Q(this, "timeSync", void 0), Q(this, "seekThrottleMs", void 0), Q(this, "seekWindowOpen", !1), Q(this, "pendingSeek", null), Q(this, "seekFlushTimer", null), Q(this, "group", null), Q(this, "lastPingSendTime", null), Q(this, "consecutiveSyncRejections", 0), this.options = t, this.send = t.send, this.now = t.now, this.memberId = t.memberId, this.memberName = t.memberName ?? "User", this.timeSync = new ep(t.now), this.seekThrottleMs = e.parseSeekThrottleMs(t.seekThrottleMs);
	}
	static parseSeekThrottleMs(e) {
		if (e === void 0) return tp;
		if (typeof e != "number" || !Number.isFinite(e) || e < 0) throw TypeError(`SyncPlayClient: seekThrottleMs must be a finite number >= 0 (0 disables the seek coalescing throttle), got ${String(e)}`);
		return e;
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
		return this.group !== null && (this.cancelSeekCoalescing(), this.dispatch(Z.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null, !0);
	}
	sendPlay(e) {
		return this.group !== null && (this.dispatch(Z.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendPause(e) {
		return this.group !== null && (this.dispatch(Z.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendSeek(e, t) {
		return this.group === null ? !1 : this.seekWindowOpen ? (this.pendingSeek = {
			from: e,
			to: t
		}, !0) : (this.dispatchSeek(e, t), this.seekThrottleMs > 0 && this.openSeekWindow(), !0);
	}
	dispatchSeek(e, t) {
		this.group !== null && this.dispatch(Z.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	openSeekWindow() {
		this.seekWindowOpen = !0, this.seekFlushTimer = setTimeout(() => {
			try {
				this.closeSeekWindow();
			} catch {
				var e, t;
				(e = (t = this.options).onFrameDropped) == null || e.call(t, "send-failed", null);
			}
		}, this.seekThrottleMs);
	}
	closeSeekWindow() {
		this.seekWindowOpen = !1, this.seekFlushTimer = null;
		let e = this.pendingSeek;
		e !== null && (this.pendingSeek = null, this.group !== null && (this.dispatchSeek(e.from, e.to), this.openSeekWindow()));
	}
	cancelSeekCoalescing() {
		this.pendingSeek = null, this.seekFlushTimer !== null && (clearTimeout(this.seekFlushTimer), this.seekFlushTimer = null), this.seekWindowOpen = !1;
	}
	reportPosition(e, t) {
		return this.group !== null && (this.dispatch(Z.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		}), !0);
	}
	sendChat(e) {
		return this.group !== null && (this.dispatch(Z.CHAT, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			message: e
		}), !0);
	}
	sendTyping(e) {
		return this.group !== null && (this.dispatch(Z.TYPING, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			is_typing: e
		}), !0);
	}
	pingTime() {
		let e = this.now(), t = this.lastPingSendTime;
		if (t !== null) {
			let n = e - t;
			if (n >= 0 && n <= 1e3) return;
		}
		this.lastPingSendTime = e, this.dispatch(Z.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		var e, t;
		this.cancelSeekCoalescing(), this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, (e = (t = this.options).onDisconnect) == null || e.call(t);
	}
	destroy() {
		this.cancelSeekCoalescing(), this.timeSync.reset(), this.group = null, this.lastPingSendTime = null;
	}
	handleIncoming(e) {
		let t = Yf(e);
		if (t === null) {
			var n, r;
			(n = (r = this.options).onFrameDropped) == null || n.call(r, "undecodable", e);
			return;
		}
		if (!Hf(t.type)) {
			var i, a;
			(i = (a = this.options).onUnknownFrame) == null || i.call(a, t);
			return;
		}
		let o = t;
		switch (o.type) {
			case Z.TIME_PONG:
				this.handleTimePong(o);
				break;
			case Z.GROUP_STATE:
				this.handleGroupState(o);
				break;
			case Z.PLAYBACK_PLAY:
				this.handlePlayback("play", o);
				break;
			case Z.PLAYBACK_PAUSE:
				this.handlePlayback("pause", o);
				break;
			case Z.PLAYBACK_SEEK:
				this.handleSeek(o);
				break;
			case Z.HOST_ELECT:
				this.handleHostElect(o);
				break;
			case Z.INFO:
				this.handleInfo(o);
				break;
			case Z.ERROR:
				this.handleError(o);
				break;
			case Z.TYPING:
				this.handleTyping(o);
				break;
			case Z.HOST_TRANSFER:
				this.handleHostTransfer(o);
				break;
			case Z.PLAYBACK_SYNC:
				this.handlePlaybackSync(o);
				break;
			case Z.TIME_SYNC:
				this.handleTimeSync(o);
				break;
			case Z.GROUP_LIST:
				this.handleGroupList(o);
				break;
			case Z.CHAT:
				this.handleChat(o);
				break;
			case Z.PLAYBACK_QUEUE:
				this.handlePlaybackQueueBroadcast(o);
				break;
			default:
				var s, c;
				(s = (c = this.options).onUnknownFrame) == null || s.call(c, o);
		}
	}
	handleTimePong(e) {
		let t = this.lastPingSendTime;
		if (t === null) return;
		let n = e, r = typeof n.client_time == "number" && Number.isFinite(n.client_time) ? n.client_time : null;
		if (r !== null && r !== t) return;
		let i = this.now(), a = r ?? t;
		this.lastPingSendTime = null;
		let o = typeof n.server_time == "number" && Number.isFinite(n.server_time) ? n.server_time : null;
		if (o !== null) {
			if (this.timeSync.addSample(a, o, o, i)) {
				var s, c;
				this.consecutiveSyncRejections = 0, (s = (c = this.options).onSync) == null || s.call(c, {
					offset: this.timeSync.getOffset(),
					latency: this.timeSync.getLatency(),
					isStable: this.timeSync.isStable()
				});
			} else {
				var l, u;
				this.consecutiveSyncRejections += 1, (l = (u = this.options).onSyncDegraded) == null || l.call(u, this.consecutiveSyncRejections);
			}
		}
	}
	static normalizeMembers(e, t) {
		let n;
		return n = Array.isArray(e) ? e.filter((e) => typeof e == "object" && !!e) : e && typeof e == "object" ? Object.entries(e).filter(([, e]) => typeof e == "object" && !!e).map(([e, t]) => qf(qf({}, t), {}, { id: e })) : [], n.map((e) => ({
			id: typeof e.id == "string" ? e.id : "",
			name: typeof e.name == "string" ? e.name : "",
			is_host: e.id === t,
			joined_at: typeof e.joined_at == "number" && Number.isFinite(e.joined_at) ? e.joined_at : 0
		}));
	}
	static foldHostId(e, t) {
		return qf(qf({}, e), {}, {
			host_id: t,
			members: e.members.map((e) => qf(qf({}, e), {}, { is_host: e.id === t }))
		});
	}
	static serverTimeToMs(e) {
		return e < 0xe8d4a51000 ? e * 1e3 : e;
	}
	static serverTimeOrNow(t, n) {
		return typeof t == "number" && Number.isFinite(t) && t >= 1e3 ? e.serverTimeToMs(t) : n();
	}
	static normalizeQueue(e) {
		if (Array.isArray(e)) return e.filter((e) => typeof e == "object" && !!e).map((e) => ({
			media_id: typeof e.media_id == "string" ? e.media_id : "",
			media_info: typeof e.media_info == "object" && e.media_info !== null ? e.media_info : void 0,
			added_at: typeof e.added_at == "number" && Number.isFinite(e.added_at) ? e.added_at : void 0,
			added_by: typeof e.added_by == "string" || e.added_by === null ? e.added_by : void 0
		}));
	}
	static normalizeNudge(t) {
		if (typeof t != "object" || !t) return;
		let n = t;
		return {
			drift_ms: e.finiteOrUndefined(n.drift_ms),
			direction: n.direction === "behind" || n.direction === "ahead" ? n.direction : void 0,
			suggested_rate: e.nudgeRateOrUndefined(n.suggested_rate),
			tolerance_ms: e.nonnegOrUndefined(n.tolerance_ms),
			cooldown_ms: e.nonnegOrUndefined(n.cooldown_ms)
		};
	}
	static strOr(e, t) {
		return typeof e == "string" ? e : t;
	}
	static strOrNull(e) {
		return typeof e == "string" ? e : null;
	}
	static finiteOr(e, t) {
		return typeof e == "number" && Number.isFinite(e) ? e : t;
	}
	static finiteOrNull(e) {
		return typeof e == "number" && Number.isFinite(e) ? e : null;
	}
	static finiteOrUndefined(e) {
		return typeof e == "number" && Number.isFinite(e) ? e : void 0;
	}
	static nudgeRateOrUndefined(e) {
		if (!(typeof e != "number" || !Number.isFinite(e) || e < .9 || e > 1.1)) return e;
	}
	static nonnegOrUndefined(e) {
		if (!(typeof e != "number" || !Number.isFinite(e) || e < 0)) return e;
	}
	positionOrDrop(e) {
		if (typeof e != "number" || !Number.isFinite(e) || e < 0) return null;
		let t = this.group?.current_media_duration;
		return typeof t == "number" && Number.isFinite(t) && t > 0 && e > t ? t : e;
	}
	static playbackState(e) {
		return e === "playing" || e === "paused" || e === "buffering" || e === "stopped" ? e : "stopped";
	}
	handleGroupState(t) {
		var n, r;
		let i = t, a = i.group;
		if (typeof a != "object" || !a) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", t);
			return;
		}
		let c = e.strOr(a.group_id, ""), l = e.strOrNull(a.host_id);
		this.group !== null && this.group.group_id !== c && this.cancelSeekCoalescing();
		let u = this.group, d = e.normalizeMembers(a.members, l);
		if (this.group = {
			group_id: c,
			group_name: e.strOr(a.group_name, ""),
			members: d,
			member_count: e.finiteOrUndefined(a.member_count),
			host_id: l,
			current_media_id: e.strOrNull(a.current_media_id),
			current_media_duration: e.finiteOrNull(a.current_media_duration),
			playback_position: e.finiteOr(a.playback_position, 0),
			playback_state: e.playbackState(a.playback_state),
			queue: e.normalizeQueue(a.queue),
			created_at: e.finiteOrUndefined(a.created_at),
			last_activity_at: e.finiteOrUndefined(a.last_activity_at)
		}, u !== null && u.group_id === c) {
			let e = new Set(d.map((e) => e.id));
			for (let t of u.members) if (!e.has(t.id)) {
				var f, p;
				(f = (p = this.options).onMemberLeft) == null || f.call(p, {
					id: t.id,
					name: t.name
				});
			}
		}
		(n = (r = this.options).onState) == null || n.call(r, this.group, i.your_id);
	}
	handlePlayback(t, n) {
		var r, i;
		if ((typeof n.member_id == "string" ? n.member_id : void 0) === this.memberId) return;
		let a = this.positionOrDrop(n.position);
		if (a === null) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", n);
			return;
		}
		let c = e.serverTimeOrNow(n.server_time, () => this.getSynchronizedTime());
		(r = (i = this.options).onPlaybackCommand) == null || r.call(i, {
			type: t,
			position: a,
			serverTime: c
		});
	}
	handleSeek(t) {
		var n, r;
		if ((typeof t.member_id == "string" ? t.member_id : void 0) === this.memberId) return;
		let i = this.positionOrDrop(t.to_position);
		if (i === null) {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", t);
			return;
		}
		let s = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime());
		(n = (r = this.options).onPlaybackCommand) == null || n.call(r, {
			type: "seek",
			position: i,
			serverTime: s
		});
	}
	handleHostElect(t) {
		var n, r;
		let i = t, a = e.strOrNull(i.elected_id);
		if (this.group !== null) {
			let t = typeof i.elected_by == "string" && i.elected_by !== "" ? i.elected_by : null, n = this.group, r = t !== null && t !== this.memberId ? n.members.filter((e) => e.id !== t) : n.members;
			if (r.length !== n.members.length) {
				var o, s;
				let i = n.members.find((e) => e.id === t);
				if (n = qf(qf({}, n), {}, { members: r }), this.group = e.foldHostId(n, a), i !== void 0) {
					var c, l;
					(c = (l = this.options).onMemberLeft) == null || c.call(l, {
						id: i.id,
						name: i.name
					});
				}
				(o = (s = this.options).onHostChanged) == null || o.call(s, a);
				return;
			}
			this.group = e.foldHostId(n, a);
		}
		(n = (r = this.options).onHostChanged) == null || n.call(r, a);
	}
	handleInfo(e) {
		let t = e;
		if (typeof t.member_id == "string" && typeof t.member_name == "string") {
			var n, r;
			(n = (r = this.options).onMemberJoined) == null || n.call(r, {
				id: t.member_id,
				name: t.member_name
			});
		}
		if (typeof t.message == "string") {
			var i, a;
			(i = (a = this.options).onInfo) == null || i.call(a, t.message);
		}
	}
	handleError(e) {
		var t, n;
		let r = e, i = typeof r.error_code == "string" ? r.error_code : typeof r.code == "string" ? r.code : "UNKNOWN", a = typeof r.message == "string" ? r.message : "Unknown error", o = typeof r.details == "object" && r.details !== null && !Array.isArray(r.details) ? r.details : void 0;
		(t = (n = this.options).onError) == null || t.call(n, i, a, o);
	}
	handleTyping(e) {
		var t, n;
		let r = e;
		if (typeof r.member_id != "string") {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", e);
			return;
		}
		let o = typeof r.is_typing == "boolean" && r.is_typing;
		(t = (n = this.options).onMemberTyping) == null || t.call(n, r.member_id, o);
	}
	handleChat(e) {
		var t, n;
		let r = e;
		if (typeof r.member_id != "string" || typeof r.message != "string") {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", e);
			return;
		}
		let o = typeof r.member_name == "string" ? r.member_name : "", s = typeof e.timestamp == "number" && Number.isFinite(e.timestamp) ? e.timestamp : void 0;
		(t = (n = this.options).onChat) == null || t.call(n, r.member_id, o, r.message, s);
	}
	handlePlaybackQueueBroadcast(t) {
		var n, r;
		let i = t, a = e.normalizeQueue(i.queue);
		if (a === void 0) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", t);
		} else this.group !== null && (this.group = qf(qf({}, this.group), {}, { queue: a })), (n = (r = this.options).onQueueChanged) == null || n.call(r, a);
	}
	handleHostTransfer(t) {
		var n, r;
		let i = t;
		if (typeof i.current_host_id != "string" || typeof i.new_host_id != "string") {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", t);
		} else this.group !== null && (this.group = e.foldHostId(this.group, i.new_host_id)), (n = (r = this.options).onHostTransfer) == null || n.call(r, i.current_host_id, i.new_host_id);
	}
	handlePlaybackSync(t) {
		var n, r;
		let i = typeof t.member_id == "string" ? t.member_id : void 0, a = this.positionOrDrop(t.position);
		if (a === null) {
			var o, s;
			(o = (s = this.options).onFrameDropped) == null || o.call(s, "malformed", t);
			return;
		}
		let c = typeof t.is_playing == "boolean" && t.is_playing, l = e.serverTimeOrNow(t.server_time, () => this.getSynchronizedTime()), u = e.normalizeNudge(t.nudge);
		(n = (r = this.options).onPlaybackSync) == null || n.call(r, i ?? "", a, c, l, u);
	}
	handleTimeSync(e) {
		var t, n;
		let r = e;
		if (typeof r.member_id != "string" || typeof r.group_id != "string" || !(typeof r.server_time == "number" && Number.isFinite(r.server_time)) || !(typeof r.offset_ms == "number" && Number.isFinite(r.offset_ms)) || !(typeof r.latency_ms == "number" && Number.isFinite(r.latency_ms)) || !(typeof r.drift_rate == "number" && Number.isFinite(r.drift_rate)) || typeof r.is_stable != "boolean") {
			var i, a;
			(i = (a = this.options).onFrameDropped) == null || i.call(a, "malformed", e);
		} else (t = (n = this.options).onTimeSync) == null || t.call(n, {
			memberId: r.member_id,
			groupId: r.group_id,
			serverTimeSec: r.server_time,
			offsetMs: r.offset_ms,
			latencyMs: r.latency_ms,
			driftRate: r.drift_rate,
			isStable: r.is_stable
		});
	}
	handleGroupList(t) {
		var n, r;
		let i = t.groups;
		if (!Array.isArray(i)) {
			var a, o;
			(a = (o = this.options).onFrameDropped) == null || a.call(o, "malformed", t);
			return;
		}
		i.some((e) => typeof e != "object" || !e);
		let s = i.filter((e) => typeof e == "object" && !!e).map((t) => ({
			id: typeof t.id == "string" ? t.id : "",
			name: typeof t.name == "string" ? t.name : "",
			member_count: e.finiteOr(t.member_count, 0),
			has_password: typeof t.has_password == "boolean" && t.has_password,
			current_media: typeof t.current_media == "string" ? t.current_media : null,
			is_playing: typeof t.is_playing == "boolean" && t.is_playing
		}));
		(n = (r = this.options).onGroupList) == null || n.call(r, s);
	}
	dispatch(e, t) {
		this.send(Jf(e, t, this.now));
	}
};
// src/api/syncplay.ts
function rp(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function ip(e) {
	return e / 1e3;
}
function ap(e) {
	let t = rp(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function op(e) {
	return e.group_id ?? e.id ?? "";
}
function sp(e) {
	let t = e?.members;
	return t ? (Array.isArray(t) ? t : Object.entries(t).map(([e, t]) => ({
		id: e,
		...t
	}))).map((e) => ({
		id: e.id ?? "",
		name: e.name ?? "Unknown",
		role: e.is_host === !0 ? "owner" : "contributor",
		isOnline: !0,
		lastSeen: ap(e.joined_at)
	})) : [];
}
function cp(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function lp(e) {
	let t = e ?? {}, n = op(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: rp(t.member_count, sp(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: ap(t.created_at)
	};
}
function up(e) {
	let t = e ?? {}, n = op(t), r = cp(t);
	return {
		id: n,
		roomId: n,
		createdBy: t.host_id ?? "",
		createdAt: ap(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: ip(rp(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: rp(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: ap(t.last_activity_at),
		activeUsers: sp(t),
		roles: Object.fromEntries(sp(t).map((e) => [e.id, e.role]))
	};
}
var dp = class {
	constructor(e) {
		pe(this, "client", void 0), this.client = new Jt({ baseUrl: e });
	}
	async createRoom(e) {
		return lp((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t, n) {
		let r = {};
		t !== void 0 && t !== "" && (r.memberName = t), n !== void 0 && n !== "" && (r.password = n);
		let i = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, Object.keys(r).length > 0 ? r : void 0);
		return {
			room: lp(i.group),
			session: up(i.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return up((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return sp((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(lp) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
};
function fp(e) {
	if (!(e instanceof me) || e.status !== 400) return !1;
	let t = e.body;
	return typeof t == "object" && !!t && t.error === "Invalid password";
}
var pp = null, mp = null;
function hp(e) {
	return pp && mp === e || (pp = new dp(e), mp = e), pp;
}
var gp = {
	log: () => {},
	warn: () => {},
	error: () => {}
}, _p = null;
function vp(e) {
	_p = e;
}
var yp = null, bp = null, xp = 0, Sp = 5, Cp = 1e3, wp = !1, Tp = null;
function Ep(e) {
	Tp = e;
}
var Dp = () => {
	wp && (gp.log("[SyncPlay] online wake — retrying the remembered room with a fresh budget"), Mp());
}, Op = () => {
	typeof document < "u" && document.visibilityState === "visible" && Dp();
}, kp = !1;
function Ap(e) {
	kp !== e && (typeof window < "u" && (e ? (window.addEventListener("online", Dp), document.addEventListener("visibilitychange", Op)) : (window.removeEventListener("online", Dp), document.removeEventListener("visibilitychange", Op))), kp = e);
}
function jp(e) {
	wp !== e && (wp = e, Ap(e), Tp?.(e));
}
function Mp() {
	return !wp || !bp ? !1 : (jp(!1), xp = 0, Up(bp), !0);
}
var $ = null, Np = null, Pp = null, Fp = null, Ip = null;
function Lp() {
	try {
		return Et().getAccessToken();
	} catch {
		return null;
	}
}
function Rp(e) {
	let t = Bf();
	if (t.wsUrl !== null) return `${t.wsUrl}${t.wsPath ?? ""}?room=${encodeURIComponent(e)}`;
	let n = typeof window < "u" ? window.location : null, r = n?.hostname ?? "localhost";
	return `${n?.protocol === "https:" ? "wss:" : "ws:"}//${r}:8097?room=${encodeURIComponent(e)}`;
}
function zp() {
	let e = Lp();
	return e ? ["bearer", e] : void 0;
}
function Bp(e) {
	if ($) try {
		let t = JSON.parse(e.data);
		$.handleIncoming(t);
	} catch {}
}
function Vp(e) {
	if (!(e && e.target !== yp) && !wp) {
		if (yp = null, $ && $.onDisconnect(), bp && xp < Sp) {
			let e = Cp * 2 ** xp;
			xp++, gp.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${xp})`), setTimeout(() => {
				bp && Up(bp);
			}, e);
		} else xp >= Sp && (gp.warn("[SyncPlay] Max reconnect attempts reached, giving up"), xp = 0, $ = null, jp(!0));
	}
}
function Hp(e, t, n, r, i) {
	xp = 0, jp(!1), Fp = i ?? null, Up(e, t, n, r);
}
function Up(e, t, n, r) {
	if (t && (Ip = t), yp && bp !== e) {
		let e = yp;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), yp = null, bp = null, $ = null;
	}
	if (yp && bp === e) return;
	bp = e;
	let i = n ?? Np ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Pp ?? "Anonymous";
	Np = i, Pp = a, $ = new np({
		send: (e) => {
			yp && yp.readyState === WebSocket.OPEN && yp.send(Xf(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			Ip && Ip({
				type: e.type,
				position: ip(e.position),
				roomId: bp ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			Ip && Ip({
				type: n ? "play" : "pause",
				position: ip(t),
				roomId: bp ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			gp.error(`[SyncPlay] Error: ${e} - ${t}`), _p?.(e, t);
		},
		onInfo: (e) => {
			gp.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = Rp(e);
	gp.log(`[SyncPlay] Opening WebSocket to ${o}`);
	let s;
	try {
		s = new WebSocket(o, zp());
	} catch (e) {
		gp.error("[SyncPlay] WebSocket constructor refused the handshake", e), Vp();
		return;
	}
	yp = s, s.onopen = () => {
		gp.log("[SyncPlay] WebSocket connected"), xp = 0, $ && bp && $.joinGroup(bp, Fp ?? void 0);
	}, s.onmessage = Bp, s.onclose = Vp, s.onerror = (e) => {
		gp.error("[SyncPlay] WebSocket error", e);
	};
}
function Wp() {
	if ($) {
		try {
			$.leaveGroup();
		} catch {}
		$.onDisconnect(), $ = null;
	}
	if (yp) {
		let e = yp;
		e.onopen = null, e.onmessage = null, e.onclose = null, e.onerror = null, e.close(), yp = null;
	}
	bp = null, xp = 0, jp(!1), Fp = null;
}
function Gp(e) {
	$ && yp && yp.readyState === WebSocket.OPEN && $.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function Kp(e) {
	if (!$ || !yp || yp.readyState !== WebSocket.OPEN) return !1;
	switch (e.type) {
		case "play": return $.sendPlay(e.position ?? 0), !0;
		case "pause": return $.sendPause(e.position ?? 0), !0;
		case "seek": return e.position !== void 0 && ($.sendSeek(0, e.position), !0);
		case "sync": return e.position !== void 0 && ($.reportPosition(e.position, !0), !0);
	}
}
var qp = 5e3;
function Jp() {
	let e = xn().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Yp = class extends Error {
	constructor(e) {
		super(`SyncPlay '${e}' command was not delivered to the group`), pe(this, "commandType", void 0), this.commandType = e, this.name = "SyncPlayCommandNotDeliveredError";
	}
}, Xp = z("phlix-syncplay", () => {
	let { t: e } = J(), t = S(null), n = S(null), i = S(null), a = S([]), o = S(null), s = S(!1), c = S(!1);
	Ep((e) => {
		c.value = e;
	});
	let l = S(0), u = 0, d = null, f = r(() => n.value !== null), p = r(() => n.value ? n.value.state === "playing" || n.value.state === "paused" : !1), m = r(() => a.value.filter((e) => e.isOnline)), h = r(() => {
		let e = n.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let t = (Date.now() - u) / 1e3, r = e.playbackPosition + t * e.playbackRate;
		return l.value - r;
	}), g = r(() => n.value ? n.value.state === "waiting" ? "re-syncing" : Math.abs(h.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	function _() {
		let e = n.value;
		e ? e.state === "playing" && Gp({
			sessionId: e.id,
			playbackPosition: l.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}) : y();
	}
	function v() {
		y(), d = setInterval(_, qp);
	}
	function y() {
		d !== null && (clearInterval(d), d = null);
	}
	function b(e) {
		i.value = e, n.value &&= {
			...n.value,
			currentMediaId: e.mediaId
		};
	}
	function x() {
		i.value = null;
	}
	function C(e, r, i, o) {
		let { room: s, session: c } = r;
		n.value = c, u = Date.now(), t.value = {
			...t.value ?? {},
			...s,
			currentSession: c
		}, a.value = c.activeUsers, Hp(e, (e) => {
			D(e);
		}, void 0, i, o), v();
	}
	async function w(n, r) {
		s.value = !0, o.value = null;
		try {
			let e = hp(n), i = Jp(), a = r.password !== void 0 && r.password.trim() !== "" ? r.password : void 0, o = a === void 0 ? void 0 : Ff(a), s = await e.createRoom({
				name: r.name,
				...a === void 0 ? {} : { password: a },
				memberName: i
			});
			t.value = s, C(s.id, await e.joinRoom(s.id, i, a), i, o);
		} catch (t) {
			throw o.value = t instanceof Error ? t.message : e("syncplay.errorCreate"), t;
		} finally {
			s.value = !1;
		}
	}
	async function T(t, n, r) {
		s.value = !0, o.value = null;
		try {
			let e = hp(t), i = Jp(), a = r !== void 0 && r !== "" ? r : void 0, o = a === void 0 ? void 0 : Ff(a);
			C(n, await e.joinRoom(n, i, a), i, o);
		} catch (t) {
			throw o.value = t instanceof Error ? t.message : e("syncplay.errorJoin"), t;
		} finally {
			s.value = !1;
		}
	}
	async function E(r) {
		if (t.value) {
			s.value = !0, o.value = null;
			try {
				let n = hp(r);
				try {
					await n.leaveRoom(t.value.id);
				} catch (t) {
					o.value = t instanceof Error ? t.message : e("syncplay.errorLeave");
				}
			} finally {
				y(), Wp(), t.value = null, n.value = null, a.value = [], s.value = !1;
			}
		}
	}
	function D(e) {
		if (n.value) switch (e.type) {
			case "play":
				e.position !== void 0 && (u = Date.now(), n.value = {
					...n.value,
					playbackPosition: e.position
				}), n.value = {
					...n.value,
					state: "playing",
					playbackRate: e.rate ?? 1
				};
				break;
			case "pause":
				e.position !== void 0 && (u = Date.now(), n.value = {
					...n.value,
					playbackPosition: e.position
				}), n.value = {
					...n.value,
					state: "paused"
				};
				break;
			case "seek":
				e.position !== void 0 && (u = Date.now(), n.value = {
					...n.value,
					playbackPosition: e.position
				});
				break;
			case "sync": e.position !== void 0 && (u = Date.now(), n.value = {
				...n.value,
				playbackPosition: e.position
			}), e.rate !== void 0 && (n.value = {
				...n.value,
				playbackRate: e.rate
			});
		}
	}
	function O(t, r, i) {
		if (n.value && !Kp({
			type: r,
			position: i?.position === void 0 ? void 0 : i.position * 1e3,
			rate: i?.rate,
			issuedBy: n.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		})) throw o.value = e("syncplay.commandNotDelivered"), new Yp(r);
	}
	async function k(e) {
		if (n.value) try {
			let t = await hp(e).getState(n.value.id);
			n.value = t, u = Date.now();
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh state.", e;
		}
	}
	async function A(e) {
		if (t.value) try {
			let n = await hp(e).getMembers(t.value.id);
			a.value = n;
		} catch (e) {
			throw o.value = e instanceof Error ? e.message : "Failed to refresh members.", e;
		}
	}
	function j() {
		o.value = null;
	}
	function M() {
		return Mp();
	}
	function N(e) {
		l.value = e;
	}
	return {
		currentRoom: t,
		currentSession: n,
		members: a,
		error: o,
		isLoading: s,
		reconnectExhausted: c,
		localPlaybackPosition: l,
		pendingPlayMedia: i,
		isInRoom: f,
		isSynced: p,
		onlineMembers: m,
		syncStatus: g,
		driftAmount: h,
		createAndJoinRoom: w,
		joinRoom: T,
		leaveRoom: E,
		onRemoteStateUpdate: D,
		sendCommand: O,
		refreshState: k,
		refreshMembers: A,
		clearError: j,
		retryRealtimeConnection: M,
		updateLocalPosition: N,
		applyPendingPlayMedia: b,
		consumePendingPlayMedia: x
	};
}), Zp = {
	key: 0,
	class: "syncplay-overlay"
}, Qp = { class: "syncplay-overlay__badge" }, $p = { class: "syncplay-overlay__label" }, em = { class: "syncplay-overlay__status-label" }, tm = { class: "syncplay-overlay__members" }, nm = { class: "syncplay-overlay__member-count" }, rm = { class: "syncplay-overlay__member-list" }, im = { class: "syncplay-overlay__member-name" }, am = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, om = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = J(), c = Xp(), d = nn(), f = r(() => n.apiBase ?? d.value), p = r(() => c.currentRoom?.name ?? "SyncPlay"), m = r(() => c.onlineMembers.length), h = r(() => c.syncStatus), _ = r(() => {
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
		return (t, n) => O(c).isInRoom ? (x(), o("div", Zp, [
			s("div", Qp, [u(Y, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", $p, "SyncPlay: " + E(p.value), 1)]),
			s("div", { class: g(["syncplay-overlay__status", `syncplay-overlay__status--${h.value}`]) }, [u(Y, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", em, E(_.value), 1)], 2),
			s("div", tm, [s("span", nm, [u(Y, { name: "user" }), l(" " + E(O(i)("syncplay.members", { count: m.value })), 1)]), s("ul", rm, [(x(!0), o(e, null, C(O(c).onlineMembers.slice(0, 5), (e) => (x(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", im, E(e.name), 1)]))), 128)), O(c).onlineMembers.length > 5 ? (x(), o("li", am, " +" + E(O(c).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			u(nu, {
				variant: "ghost",
				size: "sm",
				onClick: y
			}, {
				default: F(() => [l(E(O(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-2dfa4284"]]), sm = ["aria-label"], cm = ["aria-checked", "tabindex"], lm = ["aria-checked", "tabindex"], um = {
	key: 0,
	class: "syncplay-modal__fields"
}, dm = { class: "syncplay-modal__field" }, fm = {
	class: "syncplay-modal__label",
	for: "room-name"
}, pm = ["placeholder"], mm = { class: "syncplay-modal__field" }, hm = {
	class: "syncplay-modal__label",
	for: "room-password"
}, gm = { class: "syncplay-modal__pw-wrap" }, _m = ["type"], vm = ["aria-label", "aria-pressed"], ym = {
	id: "room-password-optional",
	class: "syncplay-modal__hint"
}, bm = {
	key: 1,
	class: "syncplay-modal__fields"
}, xm = { class: "syncplay-modal__field" }, Sm = {
	class: "syncplay-modal__label",
	for: "room-id"
}, Cm = ["placeholder"], wm = { class: "syncplay-modal__field" }, Tm = {
	class: "syncplay-modal__label",
	for: "room-password"
}, Em = { class: "syncplay-modal__pw-wrap" }, Dm = [
	"type",
	"required",
	"aria-describedby"
], Om = ["aria-label", "aria-pressed"], km = {
	key: 0,
	id: "room-password-hint",
	class: "syncplay-modal__hint"
}, Am = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, jm = {
	key: 3,
	class: "syncplay-modal__rooms"
}, Mm = { class: "syncplay-modal__rooms-title" }, Nm = { class: "syncplay-modal__rooms-list" }, Pm = ["onClick"], Fm = { class: "syncplay-modal__room-name" }, Im = { class: "syncplay-modal__room-count" }, Lm = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Rm = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let c = t, d = n, { t: p } = J(), m = Xp(), _ = nn(), v = r(() => c.apiBase ?? _.value), y = S("create"), b = S(null), w = S(null);
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
		let D = S(""), k = S(""), A = S(""), N = S(!1), L = S(!1), z = S(null), B = f("phlixConfig", null), V = S(!1), H = S(null), U = S([]), W = S(!1), ee = r(() => D.value.trim().length > 0), te = r(() => k.value.trim().length > 0 && (!L.value || A.value !== "")), ne = r(() => (y.value === "create" ? ee.value : te.value) && !V.value);
		P(() => c.modelValue, async (e) => {
			e && (H.value = null, D.value = "", A.value = "", N.value = !1, L.value = !1, c.prefilledRoomId ? (k.value = c.prefilledRoomId, y.value = "join") : (k.value = "", y.value = "create"), await re());
		});
		async function re() {
			W.value = !0;
			try {
				let e = new dp(v.value);
				U.value = await e.listGroups();
			} catch {
				U.value = [];
			} finally {
				W.value = !1;
			}
		}
		async function ie() {
			if (ne.value) {
				V.value = !0, H.value = null;
				try {
					y.value === "create" ? await m.createAndJoinRoom(v.value, {
						name: D.value.trim(),
						password: A.value
					}) : await m.joinRoom(v.value, k.value.trim(), A.value), m.currentRoom && d("joined", m.currentRoom), d("update:modelValue", !1);
				} catch (e) {
					y.value === "join" && fp(e) ? (L.value = !0, H.value = _t("syncplay.invalid_password", B?.locale, null), h(() => z.value?.focus())) : H.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					V.value = !1;
				}
			}
		}
		function ae(e) {
			y.value = "join", k.value = e.id, D.value = e.name, L.value = !e.isPublic;
		}
		function oe() {
			d("update:modelValue", !1);
		}
		return (n, r) => (x(), i(Ql, {
			"model-value": t.modelValue,
			title: O(p)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[8] ||= (e) => d("update:modelValue", e),
			onClose: oe
		}, {
			footer: F(() => [u(nu, {
				variant: "ghost",
				type: "button",
				onClick: oe
			}, {
				default: F(() => [l(E(O(p)("common.close")), 1)]),
				_: 1
			}), u(nu, {
				variant: "solid",
				type: "button",
				loading: V.value,
				disabled: !ne.value,
				onClick: ie
			}, {
				default: F(() => [l(E(y.value === "create" ? O(p)("syncplay.createRoom") : O(p)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: F(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: R(ie, ["prevent"])
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
				}, E(O(p)("syncplay.createRoom")), 11, cm), s("button", {
					ref_key: "joinOptionEl",
					ref: w,
					type: "button",
					role: "radio",
					class: g(["syncplay-modal__tab", { "is-active": y.value === "join" }]),
					"aria-checked": y.value === "join",
					tabindex: y.value === "join" ? 0 : -1,
					onClick: r[1] ||= (e) => y.value = "join"
				}, E(O(p)("syncplay.joinRoom")), 11, lm)], 40, sm),
				y.value === "create" ? (x(), o("div", um, [s("div", dm, [s("label", fm, E(O(p)("syncplay.roomName")), 1), I(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => D.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(p)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, pm), [[M, D.value]])]), s("div", mm, [
					s("label", hm, E(O(p)("syncplay.roomPassword")), 1),
					s("div", gm, [I(s("input", {
						id: "room-password",
						"onUpdate:modelValue": r[3] ||= (e) => A.value = e,
						type: N.value ? "text" : "password",
						class: "syncplay-modal__input",
						autocomplete: "off",
						spellcheck: "false",
						"aria-describedby": "room-password-optional"
					}, null, 8, _m), [[j, A.value]]), s("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": N.value ? O(p)("auth.hidePassword") : O(p)("auth.showPassword"),
						"aria-pressed": N.value,
						onClick: r[4] ||= (e) => N.value = !N.value
					}, [u(Y, { name: N.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, vm)]),
					s("p", ym, E(O(p)("syncplay.passwordOptional")), 1)
				])])) : (x(), o("div", bm, [s("div", xm, [s("label", Sm, E(O(p)("syncplay.roomId")), 1), I(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[5] ||= (e) => k.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(p)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, Cm), [[M, k.value]])]), s("div", wm, [
					s("label", Tm, E(O(p)("syncplay.roomPassword")), 1),
					s("div", Em, [I(s("input", {
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
					}, null, 8, Dm), [[j, A.value]]), s("button", {
						type: "button",
						class: "syncplay-modal__pw-toggle",
						"aria-label": N.value ? O(p)("auth.hidePassword") : O(p)("auth.showPassword"),
						"aria-pressed": N.value,
						onClick: r[7] ||= (e) => N.value = !N.value
					}, [u(Y, { name: N.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Om)]),
					L.value ? (x(), o("p", km, E(O(p)("syncplay.lockedRoomHint")), 1)) : a("", !0)
				])])),
				H.value ? (x(), o("p", Am, E(H.value), 1)) : a("", !0),
				y.value === "join" && U.value.length > 0 ? (x(), o("div", jm, [s("h3", Mm, E(O(p)("syncplay.availableRooms")), 1), s("ul", Nm, [(x(!0), o(e, null, C(U.value, (e) => (x(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => ae(e)
				}, [
					u(Y, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", Fm, E(e.name), 1),
					e.isPublic ? a("", !0) : (x(), i(Y, {
						key: 0,
						name: "lock",
						label: O(p)("syncplay.lockedRoom"),
						class: "syncplay-modal__room-lock"
					}, null, 8, ["label"])),
					s("span", Im, E(O(p)("syncplay.members", { count: e.memberCount })), 1)
				], 8, Pm)]))), 128))])])) : a("", !0),
				W.value ? (x(), o("div", Lm, [u(Y, { name: "spinner" }), s("span", null, E(O(p)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-d0015165"]]), zm = {
	key: 0,
	class: "syncplay-controls"
}, Bm = ["aria-label"], Vm = { class: "syncplay-controls__wait-label" }, Hm = { class: "syncplay-controls__transport" }, Um = ["aria-label"], Wm = ["aria-label"], Gm = ["aria-label"], Km = { class: "syncplay-controls__status-label" }, qm = 10, Jm = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let n = e, i = t, { t: c } = J(), l = Xp(), d = Yt(), p = f("phlixConfig", null), m = nn(), h = r(() => n.apiBase ?? m.value);
		vp((e) => {
			d.error(_t(e, p?.locale, c("syncplay.commandRejected")));
		}), b(() => vp(null));
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
			await T(Math.max(0, n.position - qm));
		}
		async function k() {
			await T(Math.min(n.duration, n.position + qm));
		}
		return P(() => l.syncStatus, (e) => {
			e === "re-syncing" ? _.value = !0 : e === "synced" && (_.value = !1);
		}), (t, n) => O(l).isInRoom ? (x(), o("div", zm, [
			v.value ? (x(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": O(c)("syncplay.waitingForMembers")
			}, [u(Y, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), s("span", Vm, E(O(c)("syncplay.waitingForMembers")), 1)], 8, Bm)) : a("", !0),
			s("div", Hm, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.rewind"),
					onClick: D
				}, [u(Y, { name: "rewind" })], 8, Um),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? O(c)("syncplay.pauseAll") : O(c)("syncplay.playAll"),
					onClick: w
				}, [u(Y, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Wm),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.fastForward"),
					onClick: k
				}, [u(Y, { name: "forward" })], 8, Gm)
			]),
			s("div", { class: g(["syncplay-controls__status", `syncplay-controls__status--${O(l).syncStatus}`]) }, [u(Y, {
				name: O(l).syncStatus === "synced" ? "check" : O(l).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", Km, E(O(l).syncStatus === "synced" ? O(c)("syncplay.synced") : O(l).syncStatus === "outOfSync" ? O(c)("syncplay.outOfSync") : O(c)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-276195ff"]]);
// src/utils/subtitleSrc.ts
function Ym(e, t) {
	return String(Ed(e, t));
}
function Xm(e, t) {
	let n = !1, r = t.map((t) => {
		let r = Ym(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
// src/components/Player.vue?vue&type=script&setup=true&lang.ts
var Zm = { class: "player__stage" }, Qm = ["src", "poster"], $m = [
	"src",
	"srclang",
	"label"
], eh = {
	key: 0,
	class: "player__buffering"
}, th = {
	class: "player__buffering-text",
	"aria-hidden": "true"
}, nh = { class: "player__meta" }, rh = ["aria-label"], ih = { class: "player__meta-text" }, ah = { class: "player__eyebrow" }, oh = { class: "player__title" }, sh = { class: "player__sub numeric" }, ch = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, lh = {
	key: 1,
	class: "player__center"
}, uh = ["aria-label"], dh = ["aria-label"], fh = ["aria-label"], ph = { class: "player__btnrow" }, mh = ["aria-label"], hh = ["aria-label"], gh = ["aria-label"], _h = { class: "player__time numeric" }, vh = ["aria-label", "aria-pressed"], yh = ["title"], bh = ["aria-label"], xh = ["aria-label"], Sh = ["aria-label", "aria-pressed"], Ch = ["aria-label", "aria-pressed"], wh = ["aria-label"], Th = { class: "similar-modal" }, Eh = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Dh = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Oh = { class: "similar-modal__state-title" }, kh = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Ah = {
	key: 3,
	class: "similar-modal__results"
}, jh = { class: "similar-modal__poster" }, Mh = ["src", "alt"], Nh = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Ph = { class: "similar-modal__result-body" }, Fh = { class: "similar-modal__result-title" }, Ih = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Lh = { key: 0 }, Rh = /*#__PURE__*/ X(/* @__PURE__ */ d({
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
		let { imgSrc: c } = Od(), d = t, p = n, m = ue(), _ = te(), { t: b } = J(), w = Xp(), T = An(), D = r(() => T.isFavorite(d.media.id)), k = r(() => T.likeLevel(d.media.id));
		function A() {
			T.toggleFavorite(d.media.id, ve());
		}
		function j(e) {
			T.setLike(d.media.id, e, ve());
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
		], N = S(null), I = S(null), L = S(null), z = S(!0), B = S(!1), V = S(!1), H = S(!1), U = S(!1), W = S(!1), ee = S(!1), ne = S(!1), re = S(null), ie = S(null), ae = S(!1), oe = Yt(), se = S(!1);
		function ce(e) {
			oe.success(b("syncplay.joinedRoom", { name: e.name }));
		}
		let le = r(() => W.value ? 1.35 : 1), G = S(nd(d.streamUrl, d.media.path)), de = r(() => vd(d.media.streams)), fe = 0;
		async function pe() {
			let e = ++fe;
			if (G.value) return;
			let t = await wd([d.streamUrl, d.media.path], d.playbackAudioTracks ?? [], de.value);
			e === fe && t && !G.value && (G.value = !0, Ee(N.value?.currentTime ?? 0));
		}
		P([() => d.playbackAudioTracks, de], () => {
			pe();
		}, { immediate: !0 });
		let me = f("phlixConfig", null), he = nn(), ge = f("resumeReporter", null), _e = !1;
		function ve() {
			return he.value;
		}
		let K = Bs({
			apiBase: () => d.apiBase ?? "",
			hlsConfig: me?.playerHlsConfig
		}), q = qs({ apiBase: () => d.apiBase ?? "" }), ye = null;
		function be(e) {
			ye !== null && clearTimeout(ye), ye = setTimeout(() => {
				ye = null, q.fetch(e);
			}, 0);
		}
		let xe = r(() => d.thumbnailAt ?? q.thumbnailAt), Se = r(() => G.value ? void 0 : d.streamUrl), Ce = r(() => G.value && K.state.value !== "ready"), we = r(() => G.value && (K.state.value === "preparing" || K.state.value === "idle")), Te = r(() => G.value && K.state.value === "error");
		function Ee(e = 0) {
			let t = N.value, n = navigator.connection?.downlinkMax, r = Ms(n);
			t && K.start(t, d.media.id, r, e);
		}
		function De(e) {
			m.quality === "original" && e !== "auto" ? K.loadVariantPlaylist(Lc) : typeof e == "string" && e !== "auto" ? K.loadVariantPlaylist(e) : K.setLevel(e);
		}
		let Oe = !1;
		function ke() {
			_.defaultQuality = Ic;
		}
		function Ae() {
			let e = K.levels.value;
			if (e.length === 0) return !1;
			let t = _.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = K.variants.value;
				if (!t || t.length === 0) return !1;
				if (Wc(e, t)) K.loadVariantPlaylist(Lc);
				else {
					let t = Uc(e);
					t >= 0 && K.setNextLevel(t), ke();
				}
				return !0;
			}
			let n = Vc(e, t);
			return n >= 0 ? K.setNextLevel(n) : ke(), !0;
		}
		P(() => K.levels.value, (e) => {
			Oe || e.length === 0 || Ae() && (Oe = !0);
		}), P(() => K.variants.value, (e) => {
			!Oe && e?.length && h(() => {
				Oe || Ae() && (Oe = !0);
			});
		}, { deep: !0 });
		let je = S(m.resumePositionFor(d.media.id) ?? 0), Me = S(!G.value && je.value > 0), Ne = null, Pe = S(!1), Fe = S(8), Ie, Le = S(null), Re = S(0), ze = S(!1), Be = S([]), Ve = S(!1), He = S(null);
		function Ue(e, t) {
			Le.value = e, Re.value = t, Be.value = [], He.value = null, ze.value = !0, Je(e, t);
		}
		let We = null, Ge = null, Ke = null;
		function qe() {
			let e = d.apiBase ?? "";
			return (Ge === null || Ke !== e) && (Ge = new Jt({ baseUrl: e }), Ke = e), Ge;
		}
		async function Je(e, t) {
			We?.abort(), We = new AbortController(), Ve.value = !0, He.value = null;
			try {
				let n = await qe().searchByMarker(e, t, 30, 20, We.signal);
				Be.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				He.value = "Couldn’t load similar titles. Please try again.", Be.value = [];
			} finally {
				Ve.value = !1;
			}
		}
		function Ye() {
			We?.abort(), ze.value = !1, Be.value = [], He.value = null, Le.value = null;
		}
		let Xe = r(() => m.upNext);
		function Ze() {
			G.value = nd(d.streamUrl, d.media.path), pe(), je.value = m.resumePositionFor(d.media.id) ?? 0, Me.value = !G.value && je.value > 0, Ne = null, Gt = !1, Nt = !1, At.value = [], kt.value = !1, Pt = !1, xt.value = -1, Bt = null, Oe = !1, _e = !1, pt(), st = !1, ut = 0, lt = 0, tt(), Pe.value = !1, K.reset(), N.value && (N.value.currentTime = 0), G.value && Ee(), be(d.media.id);
		}
		function Qe(e) {
			let t = N.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ne = Math.max(0, e));
		}
		function $e() {
			Qe(je.value), Me.value = !1, N.value?.play()?.catch(() => {});
		}
		function et() {
			Ne = null, Qe(0), m.clearResume(d.media.id), Me.value = !1, N.value?.play()?.catch(() => {});
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
			_e || (_e = !0, ge?.finish()), jn(), z.value = !0, m.upNext && (Pe.value = !0, _.autoplay && nt());
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
			if (G.value) return;
			let e = N.value, t = id(e) && (e?.currentTime ?? 0) === 0;
			(rd(e) || t) && (dt(), pt(), G.value = !0, Ee(e?.currentTime ?? 0));
		}
		let st = !1, ct = null, lt = 0, ut = 0;
		function dt() {
			if (st) return;
			st = !0;
			let e = d.media?.id;
			e != null && e !== "" && qe().get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, sd({ videoCodec: de.value })).catch(() => {});
		}
		function ft() {
			if (ct !== null || st || G.value) return;
			let e = N.value;
			e && (lt = Date.now(), ut = e.currentTime, ct = setTimeout(() => {
				ct = null;
				let e = N.value;
				e && !G.value && cd(Date.now(), lt, e.currentTime, ut) && (dt(), G.value = !0, Ee(e.currentTime));
			}, ad));
		}
		function pt() {
			ct !== null && (clearTimeout(ct), ct = null);
		}
		let mt = S([]), ht = S([]), gt = S(-1), _t = S(!1), vt = r(() => K.state.value === "ready" && K.audioTracks.value.length > 0), yt = r(() => K.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), bt = r(() => (d.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), xt = S(-1), St = r(() => !vt.value && !G.value && ht.value.length === 0 && bt.value.length > 1), Ct = r(() => ht.value.length > 0 ? !1 : K.state.value === "ready" ? !vt.value && K.hasAudio.value : !G.value && !St.value && bt.value.length === 1), wt = r(() => vt.value ? yt.value : St.value ? bt.value : ht.value.length > 0 ? ht.value : Ct.value ? [{
			index: 0,
			language: "",
			label: b("player.audioOriginal"),
			kind: "audio"
		}] : ht.value), Tt = r(() => {
			if (vt.value) return K.currentAudioTrack.value;
			if (St.value) {
				if (xt.value >= 0) return xt.value;
				let e = (d.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : d.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return ht.value.length === 0 && Ct.value ? 0 : gt.value;
		}), Et = S(!1), Dt = m.subtitleLang, Ot = r(() => {
			let e = d.apiBase ?? "", t = G.value ? K.subtitleTracks.value : Xm(e, d.playbackSubtitleTracks ?? []);
			if (At.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = Xm(e, At.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), kt = S(!1), At = S([]), jt = r(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(_.defaultSubtitleLang), t(_.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function Mt(e) {
			At.value.some((t) => t.url === e.url) || (At.value = [...At.value, e]);
		}
		let Nt = !1, Pt = !1;
		function Ft() {
			if (Nt) return;
			if (_.subtitlePreferenceSet) {
				Nt = !0;
				return;
			}
			let e = Ot.value.find((e) => e.default);
			if (!e) return;
			let t = mt.value.find((t) => t.language === (e.language || e.label));
			t && (m.setSubtitle(t.language), Dt = t.language, Nt = !0);
		}
		function It() {
			if (Pt) return;
			let e = _.defaultAudioLang;
			if (!e) return;
			let t = wt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = Tt.value;
			r >= 0 && r < t.length || (Vt(n), Pt = !0);
		}
		let Lt = r(() => mt.value.some((e) => e.language === m.subtitleLang));
		function Rt() {
			let e = N.value;
			mt.value = Zc(e), ht.value = Qc(e), gt.value = rl(e), Ft(), It();
		}
		function zt() {
			if (Lt.value) Dt = m.subtitleLang, m.setSubtitle(null);
			else {
				let e = Dt && mt.value.some((e) => e.language === Dt) ? Dt : mt.value[0]?.language ?? null;
				m.setSubtitle(e);
			}
			p("captions");
		}
		let Bt = null;
		function Vt(e) {
			if (!Ct.value) {
				if (vt.value) K.setAudioTrack(e);
				else if (St.value) {
					if (e === Tt.value) return;
					xt.value = e, Bt = e, G.value = !0, Ee(N.value?.currentTime ?? 0);
				} else nl(N.value, e), gt.value = e;
			}
		}
		P(vt, (e) => {
			if (!e || Bt === null) return;
			let t = Bt;
			Bt = null, t >= 0 && t < K.audioTracks.value.length && K.setAudioTrack(t);
		}), P(Ot, () => {
			h(() => Rt());
		}, { deep: !0 });
		let Ht = null, Ut, Wt = r(() => {
			let e = [];
			d.media.year && e.push({ text: String(d.media.year) }), d.media.rating && e.push({
				text: d.media.rating,
				cert: !0
			}), d.media.runtime && e.push({ text: `${d.media.runtime}m` });
			let t = d.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Gt = !1;
		function Kt() {
			if (!d.autoplay || Gt || Me.value || Ce.value) return;
			let e = N.value;
			if (!e || !e.paused) return;
			Gt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (m.muteForAutoplay(), e.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function qt() {
			Kt();
		}
		function Xt() {
			d.prevEpisode && p("play-episode", d.prevEpisode);
		}
		function Zt() {
			d.nextEpisode && p("play-episode", d.nextEpisode);
		}
		function Qt() {
			let e = N.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function $t(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function en() {
			m.play(), m.setMediaPositionState(), ft();
		}
		function tn() {
			m.pause(), m.setMediaPositionState(), B.value = !1;
		}
		function rn() {
			B.value = !0, jn(), z.value = !0;
		}
		function an() {
			B.value = !1, Nn();
		}
		function on() {
			let e = N.value;
			e && (ct !== null && e.currentTime > ut && pt(), m.updateProgress(e.currentTime, e.duration, $t(e)), w.isInRoom && w.updateLocalPosition(e.currentTime));
		}
		function sn() {
			let e = N.value;
			e && (e.volume = m.volume, e.muted = m.muted, e.playbackRate = m.rate, Ne !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ne) : Ne, Ne = null), m.updateProgress(e.currentTime, e.duration, $t(e)), m.setMediaPositionState(), Rt());
		}
		function cn() {
			let e = N.value;
			e && m.updateProgress(e.currentTime, e.duration, $t(e));
		}
		function ln() {
			let e = N.value;
			e && (Math.abs(e.volume - m.volume) > .001 && m.setVolume(e.volume), e.muted !== m.muted && m.toggleMute());
		}
		function un() {
			let e = N.value;
			e && e.playbackRate !== m.rate && m.setRate(e.playbackRate), m.setMediaPositionState();
		}
		function dn() {
			m.setMediaPositionState();
		}
		function fn() {
			m.setMediaPositionState();
		}
		function pn(e) {
			let t = N.value;
			t && m.duration > 0 && (t.currentTime = Math.min(m.duration, Math.max(0, e)));
		}
		function mn(e) {
			pn(m.position + e);
		}
		function hn() {
			H.value = !0, Nn();
		}
		function gn() {
			H.value = !1, Nn();
		}
		function _n(e) {
			let t = M.reduce((e, t, n) => Math.abs(t - m.rate) < Math.abs(M[e] - m.rate) ? n : e, 0), n = M[Math.min(M.length - 1, Math.max(0, t + e))];
			m.setRate(n);
		}
		function vn() {
			if (!d.markers) return;
			let e = m.position, t = d.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && pn(t.startMs / 1e3);
		}
		function yn() {
			if (!d.markers) return;
			let e = m.position, t = d.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && pn(t.startMs / 1e3);
		}
		function bn() {
			re.value?.toggleOpen();
		}
		let xn = null;
		function Sn() {
			let e = N.value;
			if (!e) {
				m.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), m.pause();
				return;
			}
			xn !== null && (clearInterval(xn), xn = null);
			let t = .05;
			xn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(xn), xn = null, e.volume = 0, e.pause(), m.pause());
			}, 50);
		}
		pc({
			playPause: Qt,
			seekBy: mn,
			frameStep: (e) => {
				m.playing || pn(m.position + e / 30);
			},
			volumeBy: (e) => m.setVolume(m.volume + e),
			toggleMute: Cn,
			toggleFullscreen: Tn,
			toggleCaptions: zt,
			toggleTheater: wn,
			togglePip: Dn,
			skipIntro: vn,
			skipOutro: yn,
			sleepTimer: bn,
			seekToPercent: (e) => pn(e * m.duration),
			speedStep: _n,
			toggleHelp: () => {
				U.value = !U.value;
			},
			toggleQuality: () => {
				G.value ? (ae.value = !ae.value, ie.value?.toggleMenu?.()) : oe.show({
					message: b("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !U.value && !_t.value && !Et.value });
		function Cn() {
			m.toggleMute();
		}
		function wn() {
			W.value = !W.value, p("theater", W.value);
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
			e && (e.type === "seekTo" ? Qe(e.value) : e.type === "seekBy" && Qe(m.position + e.value));
		});
		function Tn() {
			if (typeof document > "u") return;
			let e = I.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function En() {
			V.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Dn() {
			let e = N.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			p("pip");
		}
		function On() {
			ee.value = !0;
		}
		function kn() {
			ee.value = !1;
		}
		function jn() {
			Ut &&= (clearTimeout(Ut), void 0);
		}
		function Mn() {
			jn(), !m.playing || H.value || B.value || (Ut = setTimeout(() => {
				m.playing && !H.value && !B.value && (z.value = !1);
			}, d.idleTimeout ?? 3e3));
		}
		function Nn() {
			z.value = !0, Mn();
		}
		let Pn = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]", Fn = "data-phlix-prev-tabindex", In = "__phlix_no_tabindex__";
		function Ln(e) {
			let t = I.value;
			if (t) for (let n of Array.from(t.querySelectorAll(".player__meta, .player__controls, .player__bigplay"))) {
				let t = n.matches(Pn) ? [n] : Array.from(n.querySelectorAll(Pn));
				for (let n of t) if (e) {
					let e = n.getAttribute(Fn);
					e === null || e === In ? n.removeAttribute("tabindex") : n.setAttribute("tabindex", e), n.removeAttribute(Fn);
				} else n.getAttribute("tabindex") !== "-1" && (n.setAttribute(Fn, n.getAttribute("tabindex") ?? In), n.setAttribute("tabindex", "-1"));
			}
		}
		P(z, (e) => {
			typeof document < "u" && (Ln(e), !e && document.activeElement instanceof HTMLElement && I.value?.contains(document.activeElement) && document.activeElement.blur());
		}, { flush: "post" }), P(() => m.playing, (e) => {
			e ? (Me.value = !1, at(), Mn()) : (jn(), B.value = !1, z.value = !0);
		});
		let Rn = null;
		y(() => {
			m.setCurrent(d.media, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), T.hydrate(d.media), typeof document < "u" && (document.addEventListener("fullscreenchange", En), ne.value = document.pictureInPictureEnabled === !0), Rn = m.bindMediaSession({
				onPlay: () => void N.value?.play()?.catch(() => {}),
				onPause: () => N.value?.pause(),
				onSeek: (e) => pn(e)
			}), Ht = N.value?.textTracks ?? null, Ht?.addEventListener?.("addtrack", Rt), Ht?.addEventListener?.("removetrack", Rt), Rt(), G.value && Ee(), be(d.media.id);
		}), P(() => d.media, (e) => {
			m.setCurrent(e, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), Ze();
		}), P(() => d.media?.id, () => {
			T.hydrate(d.media);
		}), P(() => w.currentSession, (e) => {
			e && (e.state === "playing" ? (N.value?.play()?.catch(() => {}), m.play()) : e.state === "paused" && (N.value?.pause(), m.pause()), w.updateLocalPosition(m.position), Math.abs(w.driftAmount) > 2 && Qe(e.playbackPosition));
		});
		let zn = null;
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
				}), N.value?.play()?.catch(() => {}), m.play(), w.consumePendingPlayMedia(), zn = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			zn !== n && (zn = n, p("pending-media", e.mediaId, e.title));
		}), v(() => {
			ge?.reportFinal?.(), jn(), tt(), K.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", En), Rn?.(), Ht?.removeEventListener?.("addtrack", Rt), Ht?.removeEventListener?.("removetrack", Rt), xn !== null && (clearInterval(xn), xn = null), ye !== null && (clearTimeout(ye), ye = null), pt();
		}), (n, r) => (x(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: g(["player", {
				"is-chrome-hidden": !z.value,
				"is-theater": W.value
			}]),
			onPointermove: Nn,
			onPointerdown: Nn,
			onFocusin: Nn
		}, [u(Ku, {
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
		]), s("div", Zm, [
			s("video", {
				ref_key: "videoRef",
				ref: N,
				class: "player__video",
				src: Se.value,
				poster: O(c)(t.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: en,
				onPause: tn,
				onTimeupdate: on,
				onLoadedmetadata: sn,
				onCanplay: qt,
				onWaiting: rn,
				onStalled: rn,
				onPlaying: an,
				onProgress: cn,
				onVolumechange: ln,
				onRatechange: un,
				onSeeked: dn,
				onDurationchange: fn,
				onEnded: rt,
				onError: ot,
				onEnterpictureinpicture: On,
				onLeavepictureinpicture: kn,
				onClick: Qt
			}, [(x(!0), o(e, null, C(Ot.value, (e) => (x(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, $m))), 128))], 40, Qm),
			r[22] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[23] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			B.value ? (x(), o("div", eh, [u(cu, {
				size: 38,
				label: O(b)("player.buffering")
			}, null, 8, ["label"]), s("span", th, E(O(b)("player.buffering")), 1)])) : a("", !0),
			s("div", nh, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": O(b)("player.back"),
				onClick: r[0] ||= R((e) => p("back"), ["stop"])
			}, [u(Y, { name: "arrow-left" })], 8, rh), s("div", ih, [
				s("p", ah, E(O(b)("player.nowPlaying")), 1),
				s("h2", oh, E(t.media.name), 1),
				s("div", sh, [(x(!0), o(e, null, C(Wt.value, (t, n) => (x(), o(e, { key: n }, [n > 0 && !t.cert ? (x(), o("span", ch, "·")) : a("", !0), s("span", { class: g({ player__cert: t.cert }) }, E(t.text), 3)], 64))), 128))])
			])]),
			Ce.value ? a("", !0) : (x(), o("div", lh, [
				z.value ? (x(), o("button", {
					key: 0,
					type: "button",
					class: "player__center-skip",
					"aria-label": O(b)("player.seekBackward"),
					onClick: r[1] ||= R((e) => mn(-10), ["stop"])
				}, [u(Y, { name: "rewind" }), s("span", { class: "player__center-skip-count" }, E(10))], 8, uh)) : a("", !0),
				s("button", {
					type: "button",
					class: g(["player__bigplay", { "is-playing": O(m).playing }]),
					"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
					onClick: R(Qt, ["stop"])
				}, [u(Y, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 10, dh),
				z.value ? (x(), o("button", {
					key: 1,
					type: "button",
					class: "player__center-skip",
					"aria-label": O(b)("player.seekForward"),
					onClick: r[2] ||= R((e) => mn(10), ["stop"])
				}, [u(Y, { name: "forward" }), s("span", { class: "player__center-skip-count" }, E(10))], 8, fh)) : a("", !0)
			])),
			u(_l, {
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
			Ce.value ? a("", !0) : (x(), o("div", {
				key: 2,
				ref_key: "controlsRef",
				ref: L,
				class: "player__controls",
				onClick: r[9] ||= R(() => {}, ["stop"])
			}, [
				u(ls, {
					position: O(m).position,
					duration: O(m).duration,
					buffered: O(m).buffered,
					chapters: t.chapters,
					"thumbnail-at": xe.value,
					onSeek: pn,
					onScrubStart: hn,
					onScrubEnd: gn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				O(_).showMarkerTimeline && t.markers && t.markers.length > 0 ? (x(), i(Tf, {
					key: 0,
					position: O(m).position,
					duration: O(m).duration,
					markers: t.markers,
					onSeek: pn,
					onSimilar: Ue
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", ph, [
					t.prevEpisode ? (x(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.previousEpisode"),
						onClick: Xt
					}, [u(Y, { name: "skip-back" })], 8, mh)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
						onClick: Qt
					}, [u(Y, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 8, hh),
					t.nextEpisode ? (x(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.nextEpisode"),
						onClick: Zt
					}, [u(Y, { name: "skip-forward" })], 8, gh)) : a("", !0),
					s("span", _h, [
						l(E(O(is)(O(m).position)), 1),
						r[18] ||= s("span", { class: "player__sep" }, " / ", -1),
						l(E(O(is)(O(m).duration)), 1)
					]),
					r[19] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__favorite", { "is-on": D.value }]),
						"aria-label": D.value ? O(b)("itemActions.removeFavorite") : O(b)("itemActions.addFavorite"),
						"aria-pressed": D.value ? "true" : "false",
						onClick: A
					}, [u(Y, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, vh),
					u(rs, {
						level: k.value,
						onCycle: j
					}, null, 8, ["level"]),
					u(Ec),
					u(Fc),
					u(Kc, {
						ref_key: "qualityMenuRef",
						ref: ie,
						open: ae.value,
						"onUpdate:open": r[3] ||= (e) => ae.value = e,
						levels: O(K).levels.value,
						variants: O(K).variants.value,
						"current-level": O(K).currentLevel.value,
						"auto-enabled": O(K).autoEnabled.value,
						"active-height": O(K).activeLevelHeight.value,
						onSelect: De
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					G.value ? a("", !0) : (x(), o("span", {
						key: 2,
						class: "player__direct-badge",
						title: O(b)("player.qualityDirectStream")
					}, E(O(b)("player.directStream")), 9, yh)),
					u(Kl, {
						open: _t.value,
						"onUpdate:open": r[4] ||= (e) => _t.value = e,
						tracks: mt.value,
						"audio-tracks": wt.value,
						"active-audio": Tt.value,
						onSelectAudio: Vt,
						onAddSubtitles: r[5] ||= (e) => kt.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					u(_f, {
						open: Et.value,
						"onUpdate:open": r[6] ||= (e) => Et.value = e,
						chapters: t.chapters ?? [],
						onSeek: pn
					}, null, 8, ["open", "chapters"]),
					u(Af, {
						ref_key: "sleepTimerRef",
						ref: re,
						"on-expire": Sn
					}, null, 512),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__syncplay", { "is-on": O(w).isInRoom }]),
						"aria-label": O(w).isInRoom ? O(b)("syncplay.inRoom") : O(b)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[7] ||= (e) => se.value = !0
					}, [u(Y, { name: "user" })], 10, bh),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[8] ||= (e) => U.value = !0
					}, [u(Y, { name: "info" })], 8, xh),
					ne.value ? (x(), o("button", {
						key: 3,
						type: "button",
						class: g(["player__iconbtn", { "is-on": ee.value }]),
						"aria-label": ee.value ? O(b)("player.exitPip") : O(b)("player.pip"),
						"aria-pressed": ee.value,
						onClick: Dn
					}, [u(Y, { name: "pip" })], 10, Sh)) : a("", !0),
					s("button", {
						type: "button",
						class: g(["player__iconbtn", { "is-on": W.value }]),
						"aria-label": W.value ? O(b)("player.exitTheater") : O(b)("player.theater"),
						"aria-pressed": W.value,
						onClick: wn
					}, [u(Y, { name: "theater" })], 10, Ch),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": V.value ? O(b)("player.exitFullscreen") : O(b)("player.fullscreen"),
						onClick: Tn
					}, [u(Y, { name: V.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, wh)
				])
			], 512)),
			Ce.value ? a("", !0) : (x(), i(Zd, {
				key: 3,
				position: O(m).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: pn
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			Ce.value ? a("", !0) : (x(), i(rf, {
				key: 4,
				position: O(m).position,
				markers: t.markers,
				onSkip: pn
			}, null, 8, ["position", "markers"])),
			Me.value && !Ce.value ? (x(), i(Zu, {
				key: 5,
				seconds: je.value,
				onResume: $e,
				onRestart: et
			}, null, 8, ["seconds"])) : a("", !0),
			Pe.value && Xe.value && !Ce.value ? (x(), i(zd, {
				key: 6,
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
			u(Ql, {
				modelValue: ze.value,
				"onUpdate:modelValue": r[10] ||= (e) => ze.value = e,
				title: `Similar ${Le.value ?? "marker"}s`,
				size: "lg",
				onClose: Ye
			}, {
				default: F(() => [s("div", Th, [Ve.value ? (x(), o("div", Eh, [u(cu, { label: "Finding similar media" })])) : He.value ? (x(), o("div", Dh, [u(Y, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", Oh, E(He.value), 1)])) : !Ve.value && Be.value.length === 0 ? (x(), o("div", kh, [
					u(Y, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[20] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[21] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (x(), o("ul", Ah, [(x(!0), o(e, null, C(Be.value, (e) => (x(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", jh, [e.poster_url ? (x(), o("img", {
					key: 0,
					src: O(c)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Mh)) : (x(), o("div", Nh, [u(Y, { name: "film" })]))]), s("div", Ph, [s("p", Fh, E(e.name), 1), e.year ? (x(), o("p", Ih, [l(E(e.year) + " ", 1), e.runtime ? (x(), o("span", Lh, " · " + E(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			we.value ? (x(), i(Xd, {
				key: 7,
				title: t.media.name,
				progress: O(K).progress.value,
				onBack: r[11] ||= (e) => p("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			Te.value ? (x(), i(Wd, {
				key: 8,
				title: t.media.name,
				onBack: r[12] ||= (e) => p("back")
			}, null, 8, ["title"])) : a("", !0),
			O(w).isInRoom ? (x(), i(Jm, {
				key: 9,
				position: O(m).position,
				duration: O(m).duration,
				"is-playing": O(m).playing,
				onSeek: pn,
				onPlay: r[13] ||= (e) => void N.value?.play()?.catch(() => {}),
				onPause: r[14] ||= (e) => void N.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			O(w).isInRoom ? (x(), i(om, { key: 10 })) : a("", !0),
			u(Rm, {
				modelValue: se.value,
				"onUpdate:modelValue": r[15] ||= (e) => se.value = e,
				onJoined: ce
			}, null, 8, ["modelValue"]),
			u(Sc, {
				open: U.value,
				onClose: r[16] ||= (e) => U.value = !1
			}, null, 8, ["open"]),
			u(Mu, {
				open: kt.value,
				"onUpdate:open": r[17] ||= (e) => kt.value = e,
				"media-id": t.media.id,
				"api-base": t.apiBase ?? "",
				"preferred-langs": jt.value,
				onAdded: Mt
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-101a562c"]]), zh = "0.99.25", Bh = ["aria-label"], Vh = ["src", "poster"], Hh = { class: "mini__body" }, Uh = { class: "mini__title" }, Wh = { class: "mini__controls" }, Gh = ["aria-label"], Kh = ["aria-label", "aria-pressed"], qh = ["aria-label"], Jh = ["aria-label"], Yh = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Xh = /*#__PURE__*/ X(/* @__PURE__ */ d({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let { imgSrc: c } = Od(), l = t, d = ue(), { t: p } = J(), m = S(null), h = S(null), b = f("resumeReporter", null), C = !1, w = An(), T = nn(), D = r(() => d.current ? w.isFavorite(d.current.id) : !1);
		function k() {
			let e = d.current?.id;
			e && w.toggleFavorite(e, T.value);
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
		async function W() {
			let e = m.value;
			if (!e || !d.hlsMasterUrl) return;
			let t = ++U, n = d.hlsMasterUrl;
			h.value?.destroy(), h.value = null;
			let r = await ys(e, n, {
				startPosition: d.position,
				onReady: () => {
					let e = m.value;
					e && (e.volume = d.volume, e.muted = d.muted, e.playbackRate = d.rate, d.playing && e.play()?.catch(() => {}));
				}
			});
			t !== U || !A.value || d.hlsMasterUrl !== n ? r.destroy() : h.value = r;
		}
		return P(() => A.value, async (e) => {
			e ? d.hlsMasterUrl && !d.streamUrl && await W() : (h.value?.destroy(), h.value = null);
		}, { flush: "post" }), y(async () => {
			A.value && d.hlsMasterUrl && !d.streamUrl && await W();
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
				}, null, 40, Vh),
				s("div", Hh, [s("p", Uh, E(j.value), 1), s("div", Wh, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(d).playing ? O(p)("player.pause") : O(p)("player.play"),
						onClick: B
					}, [u(Y, { name: O(d).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Gh),
					O(d).current ? (x(), o("button", {
						key: 0,
						type: "button",
						class: g(["mini__btn mini__btn--favorite", { "is-on": D.value }]),
						"aria-label": D.value ? O(p)("itemActions.removeFavorite") : O(p)("itemActions.addFavorite"),
						"aria-pressed": D.value ? "true" : "false",
						onClick: k
					}, [u(Y, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Kh)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(p)("player.expand"),
						onClick: V
					}, [u(Y, { name: "expand" })], 8, qh),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": O(p)("player.closePlayer"),
						onClick: H
					}, [u(Y, { name: "x" })], 8, Jh)
				])]),
				s("div", Yh, [s("div", {
					class: "mini__progress-fill",
					style: _({ transform: `scaleX(${M.value})` })
				}, null, 4)])
			], 8, Bh)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-48e27919"]]);
export { Pu as AMBIENT_SAMPLE_H, Fu as AMBIENT_SAMPLE_INTERVAL_MS, Nu as AMBIENT_SAMPLE_W, cc as ARROW_ICONS, lc as ARROW_LABELS, Ku as AmbientCanvas, fl as CAPTION_BACKGROUND_OPTIONS, dl as CAPTION_COLOR_OPTIONS, pl as CAPTION_EDGE_OPTIONS, ul as CAPTION_SIZE_OPTIONS, ll as CAPTION_SIZE_SCALE, _l as CaptionOverlay, Kl as CaptionsMenu, Qu as DIRECT_PLAY_EXTENSIONS, Xh as MiniPlayer, sc as PLAYER_SHORTCUTS, Rh as Player, Kc as QualityMenu, re as RESUME_MAX_RATIO, ne as RESUME_MIN_SECONDS, Zu as ResumePrompt, ls as Scrubber, Sc as ShortcutsHelp, Zd as SkipButton, Fc as SpeedMenu, Mu as SubtitleSearch, $u as TRANSCODE_EXTENSIONS, Wd as TranscodeNotice, Xd as TranscodePreparing, ld as UPNEXT_COUNTDOWN_SECONDS, dd as UPNEXT_RING_CIRCUMFERENCE, ud as UPNEXT_RING_RADIUS, zd as UpNext, Ec as VolumeControl, rl as activeAudioIndex, Hu as ambientGradient, nl as applyAudioTrack, tl as applyTrackModes, ys as attachHls, Lu as averageRegion, gl as captionStyleVars, sl as cleanCueText, hl as edgeShadow, td as extensionOf, is as formatTime, fc as handleShortcut, el as hasActiveCaptions, Gu as isBatterySaving, Ls as isFailedStatus, rd as isFatalMediaError, ms as isNativeHlsSupported, Is as isPlayable, dc as isTypingTarget, Qc as listAudioTracks, Zc as listSubtitleTracks, nd as needsTranscode, ws as parseSubtitleTracks, Ps as parseTranscodeStart, Fs as parseTranscodeStatus, zh as phlixUiVersion, cl as readActiveCueLines, Rs as resolveStreamUrl, $c as resolveTextTrack, zu as rgbString, Bu as rgbaString, fd as ringDashoffset, Ru as sampleAmbient, Es as transcodeStartPath, Ns as transcodeStatusPath, Bs as useHlsTranscode, pc as useKeyboardShortcuts, ue as usePlayerStore };

//# sourceMappingURL=player.js.map