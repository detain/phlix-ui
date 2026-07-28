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
function V(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var H = "phlix.prefs";
function ee() {
	if (typeof localStorage > "u") return { ...B };
	try {
		let e = localStorage.getItem(H);
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
	let e = ee(), t = S(e.theme), n = S(e.accent), i = S(e.density), a = S(e.cardSize), o = S(e.gridDensity), s = S(e.viewMode), c = S(e.reducedMotion), l = S(e.autoplay), u = S(e.defaultVolume), d = S(e.defaultQuality), f = S(e.defaultSubtitleLang), p = S(e.defaultAudioLang), m = S(e.subtitlePreferenceSet), h = S({
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
			id: V(e),
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
			localStorage.setItem(H, JSON.stringify(e));
		} catch {}
	}
	N(A, (e) => {
		P !== null && clearTimeout(P), P = setTimeout(() => {
			P = null;
			try {
				localStorage.setItem(H, JSON.stringify(e));
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
function U() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(oe);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
function ce() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(se), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var le = R("phlix-player", () => {
	let e = ne(), t = S(null), n = S(""), i = S([]), a = S(!1), o = S(0), s = S(0), c = S(0), l = S(e.defaultVolume), u = S(!1), d = S(1), f = S(e.defaultQuality), p = S(e.defaultSubtitleLang), m = S(""), h = S(!1), g = S(U()), _ = S(ce()), v = S(null), y = 0, b = r(() => s.value > 0 ? o.value / s.value : 0), x = r(() => i.value[0] ?? null);
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
	function V() {
		u.value = !u.value;
	}
	function H(e) {
		d.value = e;
	}
	function ee(e) {
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
	function le(e) {
		let t = i.value.shift() ?? null;
		return t && N(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function ue() {
		h.value = !0;
	}
	function de() {
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
		toggleMute: V,
		setRate: H,
		setQuality: ee,
		setSubtitle: te,
		setQueue: re,
		enqueue: ie,
		next: le,
		showMiniPlayer: ue,
		hideMiniPlayer: de,
		closePlayer: fe,
		setMediaSessionMetadata: pe,
		setMediaPositionState: me,
		bindMediaSession: he,
		seedFromPreferences: W
	};
}), ue = class extends Error {
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
//#region src/api/tokenStore.ts
var he = "access_token", W = "refresh_token", ge = "user", _e = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(he);
	}
	setAccessToken(e) {
		this.storage.setItem(he, e);
	}
	getRefreshToken() {
		return this.storage.getItem(W);
	}
	setRefreshToken(e) {
		this.storage.setItem(W, e);
	}
	getUser() {
		let e = this.storage.getItem(ge);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(ge, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(he), this.storage.removeItem(W), this.storage.removeItem(ge);
	}
};
//#endregion
//#region src/api/client.ts
function ve() {
	return typeof window > "u" ? {
		getAccessToken: () => null,
		setAccessToken: () => {},
		getRefreshToken: () => null,
		setRefreshToken: () => {},
		getUser: () => null,
		setUser: () => {},
		clear: () => {}
	} : new _e();
}
var ye = 15e3, be = {};
function xe(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r && (t[n] = r);
	return t;
}
function Se(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
function G(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function K(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function Ce(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? "Unknown Artist", r = K(t.album_count), i = K(t.track_count);
	return {
		id: n,
		name: n,
		imageUrl: G(t.image_url),
		albumCount: r ?? void 0,
		trackCount: i ?? void 0
	};
}
function we(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = G(n.title) ?? G(t.name) ?? G(t.title) ?? "Unknown Track";
	return {
		id: G(t.id) ?? "",
		title: r,
		durationSecs: K(n.duration_secs) ?? K(t.duration_secs) ?? 0,
		trackNumber: K(n.track_number) ?? K(t.track_number),
		streamUrl: G(t.stream_url)
	};
}
function Te(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? G(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [], i = K(t.track_count) ?? r.length;
	return {
		id: n,
		title: n,
		artist: G(t.artist),
		albumArtUrl: G(t.album_art_url),
		year: K(t.year),
		totalTracks: i,
		tracks: r.map(we),
		tracksTruncated: Se(t.tracks_truncated)
	};
}
function Ee(e, t, n) {
	return {
		total: K(e.total) ?? t,
		limit: K(e.limit) ?? n.limit ?? 100,
		offset: K(e.offset) ?? n.offset ?? 0
	};
}
function De(e) {
	let t = {};
	return e.limit !== void 0 && (t.limit = String(e.limit)), e.offset !== void 0 && (t.offset = String(e.offset)), t;
}
function Oe(e) {
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
		hearingImpaired: Se(t.hearingImpaired ?? t.hearing_impaired),
		fps: a
	};
}
var ke = class {
	baseUrl;
	tokens;
	doFetch;
	timeoutMs;
	instanceHeaders;
	loginPath;
	refreshPromise = null;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? ve(), this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? ye, this.instanceHeaders = xe(e.headers ?? {}), this.loginPath = e.loginPath ?? "/login";
	}
	setBaseUrl(e) {
		this.baseUrl = e;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = {
				...be,
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
			throw s ? new fe() : r?.aborted || e instanceof ue ? e : e instanceof TypeError || me() ? new de() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new ue(this.extractError(t), e.status, t);
		return t;
	}
	extractError(e) {
		if (e && typeof e == "object") {
			let t = e;
			if (typeof t.error == "string") return t.error;
			if (typeof t.message == "string") return t.message;
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
				return typeof n.access_token == "string" ? (this.tokens.setAccessToken(n.access_token), typeof n.refresh_token == "string" && this.tokens.setRefreshToken(n.refresh_token), !0) : !1;
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
	async postFormData(e, t) {
		let n = {
			...be,
			...this.instanceHeaders
		}, r = this.tokens.getAccessToken();
		r && (n.Authorization = `Bearer ${r}`);
		let i = await this.doFetch(`${this.baseUrl}${e}`, {
			method: "POST",
			headers: n,
			credentials: "same-origin",
			body: t
		});
		if (!i.ok) throw Error(`HTTP ${i.status}`);
		return i.json();
	}
	async uploadAvatar(e) {
		let t = new FormData();
		return t.append("avatar", e), this.postFormData("/api/v1/users/me/avatar", t);
	}
	async deleteAvatar() {
		let e = {
			...be,
			...this.instanceHeaders
		}, t = this.tokens.getAccessToken();
		t && (e.Authorization = `Bearer ${t}`);
		let n = await this.doFetch(`${this.baseUrl}/api/v1/users/me/avatar`, {
			method: "DELETE",
			headers: e,
			credentials: "same-origin"
		});
		if (!n.ok) throw Error(`HTTP ${n.status}`);
	}
	isLoggedIn() {
		return this.tokens.getAccessToken() !== null;
	}
	async getCurrentUser() {
		let { user: e } = await this.get("/api/v1/auth/me");
		return {
			...e,
			is_admin: Se(e.is_admin)
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
	createPlaylist(e, t) {
		let n = { name: e };
		return t && (n.media_id = t), this.post("/api/v1/playlists", n);
	}
	addToPlaylist(e, t) {
		return this.post(`/api/v1/playlists/${encodeURIComponent(e)}/items`, { media_id: t });
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
		return Array.isArray(a.candidates) ? a.candidates.map(Oe) : [];
	}
	downloadSubtitle(e, t) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/subtitles/download`, t);
	}
	async listArtists(e = {}, t) {
		let n = De(e), r = await this.get("/api/v1/music/artists", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.artists) ? r.artists : [];
		return {
			artists: i.map(Ce),
			...Ee(r, i.length, e)
		};
	}
	async getArtist(e, t) {
		return Ce((await this.get(`/api/v1/music/artists/${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e = {}, t) {
		let n = De(e);
		e.artist !== void 0 && e.artist !== "" && (n.artist = e.artist);
		let r = await this.get("/api/v1/music/albums", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.albums) ? r.albums : [];
		return {
			albums: i.map(Te),
			...Ee(r, i.length, e),
			artist: G(r.artist)
		};
	}
	async getAlbum(e, t, n) {
		let r = t !== void 0 && t !== "" ? { artist: t } : void 0;
		return Te((await this.get(`/api/v1/music/albums/${encodeURIComponent(e)}`, r, n)).album);
	}
	async listTracks(e = {}, t) {
		let n = De(e), r = await this.get("/api/v1/music/tracks", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.tracks) ? r.tracks : [];
		return {
			tracks: i.map(we),
			...Ee(r, i.length, e)
		};
	}
	async getTrack(e, t) {
		return we((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = this.loginPath);
	}
};
new ke();
//#endregion
//#region src/stores/useToastStore.ts
var Ae = R("phlix-toast", () => {
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
}), je = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), Me = R("user-item-data", () => {
	let e = S(/* @__PURE__ */ new Map()), t = null;
	function n(e) {
		return t ? t.setBaseUrl(e) : t = new ke({ baseUrl: e }), t;
	}
	function r(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function i(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function a(t) {
		return e.value.get(t)?.watched ?? !1;
	}
	function o(t) {
		return e.value.get(t) ?? { ...je };
	}
	function s(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0,
			watched: n?.watched ?? !1
		});
	}
	function c(t, n) {
		let r = e.value.get(t) ?? { ...je };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function l(e, t) {
		let i = r(e), a = !i;
		c(e, { favorite: a });
		try {
			let r = n(t);
			a ? await r.addFavorite(e) : await r.removeFavorite(e);
		} catch (t) {
			c(e, { favorite: i });
			let n = a ? "add to" : "remove from";
			Ae().error(`Failed to ${n} favorites: ${pe(t)}`);
		}
	}
	async function u(e, t) {
		let r = a(e), i = !r;
		c(e, { watched: i });
		try {
			let r = n(t);
			i ? await r.markWatched(e) : await r.markUnwatched(e);
		} catch (t) {
			c(e, { watched: r });
			let n = i ? "watched" : "unwatched";
			Ae().error(`Failed to mark ${n}: ${pe(t)}`);
		}
	}
	async function d(e, t, r) {
		let a = Math.trunc(Number(t));
		Number.isFinite(a) || (a = 0), a < -2 && (a = -2), a > 2 && (a = 2);
		let o = i(e);
		c(e, { like_level: a });
		try {
			await n(r).setLikeLevel(e, a);
		} catch (t) {
			c(e, { like_level: o }), Ae().error(`Failed to set rating: ${pe(t)}`);
		}
	}
	function f() {
		e.value = /* @__PURE__ */ new Map(), t = null;
	}
	return {
		entries: e,
		isFavorite: r,
		likeLevel: i,
		isWatched: a,
		get: o,
		hydrate: s,
		toggleFavorite: l,
		toggleWatched: u,
		setLike: d,
		reset: f
	};
}), Ne = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pe(e, t) {
	return x(), o("svg", Ne, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var Fe = p({
	name: "lucide-play",
	render: Pe
}), Ie = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Le(e, t) {
	return x(), o("svg", Ie, [...t[0] ||= [s("g", {
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
var Re = p({
	name: "lucide-pause",
	render: Le
}), ze = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Be(e, t) {
	return x(), o("svg", ze, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var Ve = p({
	name: "lucide-skip-back",
	render: Be
}), He = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ue(e, t) {
	return x(), o("svg", He, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var We = p({
	name: "lucide-skip-forward",
	render: Ue
}), Ge = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ke(e, t) {
	return x(), o("svg", Ge, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var qe = p({
	name: "lucide-rotate-ccw",
	render: Ke
}), Je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ye(e, t) {
	return x(), o("svg", Je, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var Xe = p({
	name: "lucide-rotate-cw",
	render: Ye
}), Ze = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qe(e, t) {
	return x(), o("svg", Ze, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var $e = p({
	name: "lucide-volume-2",
	render: Qe
}), et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tt(e, t) {
	return x(), o("svg", et, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var nt = p({
	name: "lucide-volume-1",
	render: tt
}), rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function it(e, t) {
	return x(), o("svg", rt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var at = p({
	name: "lucide-volume-x",
	render: it
}), ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function st(e, t) {
	return x(), o("svg", ot, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), s("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var ct = p({
	name: "lucide-shuffle",
	render: st
}), lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ut(e, t) {
	return x(), o("svg", lt, [...t[0] ||= [s("g", {
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
var dt = p({
	name: "lucide-repeat",
	render: ut
}), ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pt(e, t) {
	return x(), o("svg", ft, [...t[0] ||= [s("g", {
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
var mt = p({
	name: "lucide-repeat-1",
	render: pt
}), ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gt(e, t) {
	return x(), o("svg", ht, [...t[0] ||= [s("g", {
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
var _t = p({
	name: "lucide-list-music",
	render: gt
}), vt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yt(e, t) {
	return x(), o("svg", vt, [...t[0] ||= [s("g", {
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
var bt = p({
	name: "lucide-captions",
	render: yt
}), xt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function St(e, t) {
	return x(), o("svg", xt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var Ct = p({
	name: "lucide-captions-off",
	render: St
}), wt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tt(e, t) {
	return x(), o("svg", wt, [...t[0] ||= [s("g", {
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
var Et = p({
	name: "lucide-picture-in-picture-2",
	render: Tt
}), Dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ot(e, t) {
	return x(), o("svg", Dt, [...t[0] ||= [s("rect", {
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
var kt = p({
	name: "lucide-rectangle-horizontal",
	render: Ot
}), At = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jt(e, t) {
	return x(), o("svg", At, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var Mt = p({
	name: "lucide-maximize",
	render: jt
}), Nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pt(e, t) {
	return x(), o("svg", Nt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var Ft = p({
	name: "lucide-minimize",
	render: Pt
}), It = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Lt(e, t) {
	return x(), o("svg", It, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var Rt = p({
	name: "lucide-maximize-2",
	render: Lt
}), zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bt(e, t) {
	return x(), o("svg", zt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var Vt = p({
	name: "lucide-cast",
	render: Bt
}), Ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ut(e, t) {
	return x(), o("svg", Ht, [...t[0] ||= [s("g", {
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
var Wt = p({
	name: "lucide-settings",
	render: Ut
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return x(), o("svg", Gt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var qt = p({
	name: "lucide-gauge",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return x(), o("svg", Jt, [...t[0] ||= [s("g", {
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
var Xt = p({
	name: "lucide-film",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function q(e, t) {
	return x(), o("svg", Zt, [...t[0] ||= [s("g", {
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
var Qt = p({
	name: "lucide-image",
	render: q
}), $t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function en(e, t) {
	return x(), o("svg", $t, [...t[0] ||= [s("g", {
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
var tn = p({
	name: "lucide-music",
	render: en
}), nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rn(e, t) {
	return x(), o("svg", nn, [...t[0] ||= [s("g", {
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
var an = p({
	name: "lucide-tv",
	render: rn
}), on = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sn(e, t) {
	return x(), o("svg", on, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var cn = p({
	name: "lucide-book",
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
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var dn = p({
	name: "lucide-headphones",
	render: un
}), fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pn(e, t) {
	return x(), o("svg", fn, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var mn = p({
	name: "lucide-disc-3",
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
var _n = p({
	name: "lucide-mic-2",
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
	}, [s("path", { d: "m16 13l5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }), s("rect", {
		width: "14",
		height: "12",
		x: "2",
		y: "6",
		rx: "2"
	})], -1)]]);
}
var bn = p({
	name: "lucide-video",
	render: yn
}), xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sn(e, t) {
	return x(), o("svg", xn, [...t[0] ||= [s("g", {
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
var Cn = p({
	name: "lucide-search",
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
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var En = p({
	name: "lucide-sliders-horizontal",
	render: Tn
}), Dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function On(e, t) {
	return x(), o("svg", Dn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		s("path", { d: "M8 2v4m8-4v4" }),
		s("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		s("path", { d: "M3 10h18" })
	], -1)]]);
}
var kn = p({
	name: "lucide-calendar",
	render: On
}), An = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jn(e, t) {
	return x(), o("svg", An, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Mn = p({
	name: "lucide-arrow-up-down",
	render: jn
}), Nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pn(e, t) {
	return x(), o("svg", Nn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var Fn = p({
	name: "lucide-star",
	render: Pn
}), In = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ln(e, t) {
	return x(), o("svg", In, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var Rn = p({
	name: "lucide-list",
	render: Ln
}), zn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bn(e, t) {
	return x(), o("svg", zn, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"></rect></g>", 1)]]);
}
var Vn = p({
	name: "lucide-layout-grid",
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
var Wn = p({
	name: "lucide-gallery-horizontal",
	render: Un
}), Gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kn(e, t) {
	return x(), o("svg", Gn, [...t[0] ||= [s("g", {
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
var qn = p({
	name: "lucide-table",
	render: Kn
}), Jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yn(e, t) {
	return x(), o("svg", Jn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var Xn = p({
	name: "lucide-plus",
	render: Yn
}), Zn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qn(e, t) {
	return x(), o("svg", Zn, [...t[0] ||= [s("g", {
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
var $n = p({
	name: "lucide-info",
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
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var nr = p({
	name: "lucide-x",
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
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var ar = p({
	name: "lucide-check",
	render: ir
}), or = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sr(e, t) {
	return x(), o("svg", or, [...t[0] ||= [s("g", {
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
var cr = p({
	name: "lucide-lock",
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
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var dr = p({
	name: "lucide-bookmark",
	render: ur
}), fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pr(e, t) {
	return x(), o("svg", fr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var mr = p({
	name: "lucide-bookmark-plus",
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
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var _r = p({
	name: "lucide-heart",
	render: gr
}), vr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yr(e, t) {
	return x(), o("svg", vr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var br = p({
	name: "lucide-thumbs-up",
	render: yr
}), xr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sr(e, t) {
	return x(), o("svg", xr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var Cr = p({
	name: "lucide-thumbs-down",
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
	}, [s("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), s("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Er = p({
	name: "lucide-user",
	render: Tr
}), Dr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Or(e, t) {
	return x(), o("svg", Dr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var kr = p({
	name: "lucide-log-out",
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
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Mr = p({
	name: "lucide-menu",
	render: jr
}), Nr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pr(e, t) {
	return x(), o("svg", Nr, [...t[0] ||= [s("g", {
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
var Fr = p({
	name: "lucide-more-horizontal",
	render: Pr
}), Ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Lr(e, t) {
	return x(), o("svg", Ir, [...t[0] ||= [s("g", {
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
var Rr = p({
	name: "lucide-eye",
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
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Vr = p({
	name: "lucide-eye-off",
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
	}, [s("path", { d: "m15.5 7.5l2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4m2-2l-9.6 9.6" }), s("circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5"
	})], -1)]]);
}
var Wr = p({
	name: "lucide-key",
	render: Ur
}), Gr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kr(e, t) {
	return x(), o("svg", Gr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var qr = p({
	name: "lucide-trash",
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
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Xr = p({
	name: "lucide-arrow-left",
	render: Yr
}), Zr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qr(e, t) {
	return x(), o("svg", Zr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var $r = p({
	name: "lucide-arrow-right",
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
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var ni = p({
	name: "lucide-arrow-up",
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
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var ai = p({
	name: "lucide-arrow-down",
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
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var ci = p({
	name: "lucide-chevron-down",
	render: si
}), li = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ui(e, t) {
	return x(), o("svg", li, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var di = p({
	name: "lucide-chevron-up",
	render: ui
}), fi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pi(e, t) {
	return x(), o("svg", fi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var mi = p({
	name: "lucide-chevron-left",
	render: pi
}), hi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gi(e, t) {
	return x(), o("svg", hi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var _i = p({
	name: "lucide-chevron-right",
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
		d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
	}, null, -1)]]);
}
var bi = p({
	name: "lucide-chevrons-left",
	render: yi
}), xi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Si(e, t) {
	return x(), o("svg", xi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 17l5-5l-5-5m7 10l5-5l-5-5"
	}, null, -1)]]);
}
var Ci = p({
	name: "lucide-chevrons-right",
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
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Ei = p({
	name: "lucide-loader-circle",
	render: Ti
}), Di = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Oi(e, t) {
	return x(), o("svg", Di, [...t[0] ||= [s("g", {
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
var ki = p({
	name: "lucide-circle-alert",
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
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var Mi = p({
	name: "lucide-circle-check",
	render: ji
}), Ni = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pi(e, t) {
	return x(), o("svg", Ni, [...t[0] ||= [s("g", {
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
var Fi = p({
	name: "lucide-circle-x",
	render: Pi
}), Ii = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Li(e, t) {
	return x(), o("svg", Ii, [...t[0] ||= [s("g", {
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
var Ri = p({
	name: "lucide-sun",
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
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Vi = p({
	name: "lucide-moon",
	render: Bi
}), Hi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ui(e, t) {
	return x(), o("svg", Hi, [...t[0] ||= [s("g", {
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
var Wi = p({
	name: "lucide-monitor",
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
		d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
	}, null, -1)]]);
}
//#endregion
//#region src/components/icon-registry.ts
var qi = {
	play: Fe,
	pause: Re,
	"skip-back": Ve,
	"skip-forward": We,
	rewind: qe,
	forward: Xe,
	volume: $e,
	"volume-low": nt,
	mute: at,
	shuffle: ct,
	repeat: dt,
	"repeat-1": mt,
	"list-music": _t,
	captions: bt,
	"captions-off": Ct,
	pip: Et,
	theater: kt,
	fullscreen: Mt,
	"fullscreen-exit": Ft,
	expand: Rt,
	cast: Vt,
	settings: Wt,
	speed: qt,
	film: Xt,
	image: Qt,
	music: tn,
	tv: an,
	book: cn,
	headphones: dn,
	disc: mn,
	mic: _n,
	video: bn,
	search: Cn,
	filter: En,
	calendar: kn,
	sort: Mn,
	star: Fn,
	list: Rn,
	grid: Vn,
	backdrop: Wn,
	table: qn,
	plus: Xn,
	info: $n,
	x: nr,
	check: ar,
	lock: cr,
	bookmark: dr,
	"bookmark-plus": mr,
	heart: _r,
	"thumbs-up": br,
	"thumbs-down": Cr,
	user: Er,
	"log-out": kr,
	menu: Mr,
	more: Fr,
	eye: Rr,
	"eye-off": Vr,
	refresh: Xe,
	key: Wr,
	trash: qr,
	"arrow-left": Xr,
	"arrow-right": $r,
	"arrow-up": ni,
	"arrow-down": ai,
	"chevron-down": ci,
	"chevron-up": di,
	"chevron-left": mi,
	"chevron-right": _i,
	"chevrons-left": bi,
	"chevrons-right": Ci,
	spinner: Ei,
	alert: ki,
	"alert-circle": ki,
	success: Mi,
	error: Fi,
	sun: Ri,
	moon: Vi,
	monitor: Wi,
	"external-link": p({
		name: "lucide-external-link",
		render: Ki
	})
};
Object.keys(qi);
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
		let t = e, n = r(() => qi[t.name]), a = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
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
}), Ji = ["id"], Yi = /*@__PURE__*/ d({
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
		let t = e, r = k(), i = S(!1), s = S(null), c;
		function d() {
			return s.value?.firstElementChild ?? null;
		}
		function f() {
			t.disabled || (clearTimeout(c), c = setTimeout(() => {
				i.value = !0, d()?.setAttribute("aria-describedby", r);
			}, t.delay));
		}
		function p() {
			clearTimeout(c), i.value = !1, d()?.removeAttribute("aria-describedby");
		}
		return v(() => clearTimeout(c)), (t, c) => (x(), o("span", {
			ref_key: "wrapEl",
			ref: s,
			class: "phlix-tooltip-wrap",
			onMouseenter: f,
			onMouseleave: p,
			onFocusin: f,
			onFocusout: p,
			onKeydown: I(p, ["esc"])
		}, [w(t.$slots, "default", {}, void 0, !0), u(n, { name: "phlix-tooltip" }, {
			default: P(() => [i.value && (e.text || t.$slots.content) ? (x(), o("span", {
				key: 0,
				id: O(r),
				role: "tooltip",
				class: g(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [w(t.$slots, "content", {}, () => [l(E(e.text), 1)], !0)], 10, Ji)) : a("", !0)]),
			_: 3
		})], 544));
	}
}), Y = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Xi = /*#__PURE__*/ Y(Yi, [["__scopeId", "data-v-a3ba7bc3"]]), Zi = ["data-level"], Qi = ["disabled", "aria-pressed"], $i = ["disabled", "aria-pressed"], ea = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, [d.value ? (x(), i(Xi, {
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
			})], 10, Qi)]),
			_: 1
		})) : a("", !0), f.value ? (x(), i(Xi, {
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
			})], 10, $i)]),
			_: 1
		})) : a("", !0)], 8, Zi));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
//#endregion
//#region src/components/player/format-time.ts
function ta(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/i18n/messages.ts
var na = {
	common: {
		retry: "Retry",
		close: "Close",
		dismiss: "Dismiss",
		loading: "Loading",
		notifications: "Notifications",
		noMatches: "No matches",
		searchPlaceholder: "Search…",
		selectPlaceholder: "Select…"
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
		signIn: "Sign in"
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
		confirmCancel: "Cancel"
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
		skipLabelSkipCredits: "Skip Credits",
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
		qualityDirectStream: "Direct Stream — quality is determined by the source file",
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
		subtitleQuotaRemaining: "Subtitle download limit reached — {count} remaining.",
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
		startsIn: "Starts in {seconds}s",
		playNow: "Play now",
		cancel: "Cancel",
		transcodePreparingHeading: "Preparing your stream…",
		transcodePreparingTitled: "“{title}” is being converted to a format your browser can play. This starts in a moment.",
		transcodePreparingUntitled: "This title is being converted to a format your browser can play. This starts in a moment.",
		transcodeHeading: "Can’t start playback right now",
		transcodeBodyTitled: "We couldn’t start playback for “{title}” right now. Please try again later.",
		transcodeBodyUntitled: "We couldn’t start playback for this title right now. Please try again later.",
		goBack: "Go back"
	},
	syncplay: {
		syncPlay: "SyncPlay",
		inRoom: "In SyncPlay room",
		createRoom: "Create room",
		joinRoom: "Join room",
		leaveRoom: "Leave room",
		members: "{count} member | {count} members",
		synced: "Synced",
		outOfSync: "Out of sync",
		reSyncing: "Re-syncing…",
		roomName: "Room name",
		roomId: "Room ID",
		publicRoom: "Public room",
		privateRoom: "Private room",
		create: "Create",
		join: "Join",
		cancel: "Cancel",
		loading: "Loading…",
		noRooms: "No public rooms available",
		errorCreate: "Failed to create room",
		errorJoin: "Failed to join room",
		errorLeave: "Failed to leave room",
		yourRole: "You are {role}",
		roleOwner: "Owner",
		roleModerator: "Moderator",
		roleMember: "Member",
		title: "SyncPlay",
		roomNamePlaceholder: "Enter room name",
		roomIdPlaceholder: "Enter room ID",
		publicHint: "Anyone can join with the room ID",
		privateHint: "Only people with the room ID can join",
		publicRooms: "Public rooms",
		waitingForMembers: "Waiting for members…",
		rewind: "Rewind",
		fastForward: "Fast forward",
		playAll: "Play for everyone",
		pauseAll: "Pause for everyone"
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
		artistsTotal: "{count} artists",
		artistsTotalOne: "1 artist",
		albumsTotal: "{count} albums",
		albumsTotalOne: "1 album",
		tracksTotal: "{count} tracks",
		tracksTotalOne: "1 track",
		tracksOnPage: "{count} tracks on this page",
		tracksOnPageOne: "1 track on this page",
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
		artistsDescription: "Browse all artists in your library"
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
		resetConfirm: "Click again to confirm reset",
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
		noEpisodes: "No episodes to play yet"
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
		noProfileSelectedHint: "Open this page with ?profile=<id> query parameter to manage that profile's parental controls.",
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
}, ra = /\{(\w+)\}/g;
function ia(e) {
	let t = {};
	for (let n of Object.keys(na)) {
		let r = na[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function aa(e, t) {
	return t ? e.replace(ra, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function oa(e) {
	let t = ia(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? aa(s, n) : e;
	};
}
//#endregion
//#region src/composables/useMessages.ts
function X() {
	return { t: oa(f("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var sa = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], ca = { class: "scrubber__track" }, la = ["title"], ua = { class: "scrubber__time numeric" }, da = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			"aria-valuetext": O(ta)(t.position),
			"aria-label": O(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", ca, [
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
			}, null, 12, la))), 128)),
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
		}, null, 4)) : a("", !0), s("span", ua, E(O(ta)(D.value)), 1)], 4)) : a("", !0)], 40, sa));
	}
}), [["__scopeId", "data-v-3d610715"]]), fa = "phlix-bandwidth-estimate";
function pa(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function ma() {
	try {
		let e = localStorage.getItem(fa);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? pa(t) : 0;
	} catch {
		return 0;
	}
}
function ha(e) {
	try {
		localStorage.setItem(fa, String(e));
	} catch {}
}
function ga(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var _a = null, va = null;
function ya() {
	_a && ha(_a.bandwidthEstimate);
}
async function ba(e, t, n = {}) {
	if (typeof MediaSource > "u" && ga(e)) {
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
	let { default: r } = await import("./hls-B8L8rvFx.js");
	if (r.isSupported()) {
		let i = ma(), a = new r({
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
		}), _a = a, va !== null && clearInterval(va), va = setInterval(ya, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				ha(a.bandwidthEstimate), va !== null && (clearInterval(va), va = null), _a = null;
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
var xa = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Sa(e, t = "") {
	return typeof e == "string" ? e : t;
}
function Ca(e) {
	return e === !0 || e === "true" || e === 1;
}
function wa(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Ta(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Sa(e.url ?? e.src);
		r !== "" && t.push({
			index: wa(e.index),
			language: Sa(e.language ?? e.lang ?? e.srclang),
			label: Sa(e.label),
			default: Ca(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Ea(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = wa(e.height);
		r <= 0 || t.push({
			id: Sa(e.id),
			label: Sa(e.label),
			height: r,
			width: wa(e.width),
			bitrate: wa(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Da(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function Oa(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function ka(e) {
	let t = e ?? {};
	return {
		jobId: Sa(t.job_id ?? t.jobId),
		masterUrl: Sa(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Sa(t.status, "running"),
		reused: Ca(t.reused),
		subtitles: Ta(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ea(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Aa(e) {
	let t = e ?? {};
	return {
		jobId: Sa(t.job_id ?? t.jobId),
		status: Sa(t.status, "running"),
		playlistReady: Ca(t.playlist_ready ?? t.playlistReady),
		progress: wa(t.progress),
		masterUrl: Sa(t.master_url ?? t.masterUrl),
		subtitles: Ta(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Ea(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ja(e) {
	return e.playlistReady || e.status === "completed";
}
function Ma(e) {
	return xa.has(e);
}
function Na(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Pa(e) {
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
			url: Na(n, e.url)
		}));
	}
	let y = e.attach ?? ba, b = e.pollIntervalMs ?? 1e3, x = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(x / Math.max(1, b))), T = Fa(), E = e.getToken ?? (() => Ia(T)), D = null, O = null, k = null, A = !1, j = null;
	function M() {
		return e.client ?? new ke({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function N(i, a, o, s) {
		R(), A = !1, j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = M(), c = ka(await r.post(Da(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = Na(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < w; e++) {
				let e = Aa(await r.get(Oa(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), Ma(e.status)) throw Error(`transcode ${e.status}`);
				if (ja(e)) {
					l = !0;
					break;
				}
				if (await C(b), A) return;
			}
			if (!l) throw Error("transcode timed out");
			if (D = await y(i, f.value, {
				getToken: E,
				hlsConfig: e.hlsConfig,
				startPosition: s,
				onReady: () => p(),
				onError: () => {
					A || (t.value = "error");
				}
			}), A) {
				D.destroy(), D = null;
				return;
			}
			O = D.onLevelSwitched((e) => p(e)), k = D.onAudioTrackSwitched((e) => h(e)), p(), h();
			try {
				let e = le();
				e.hlsMasterUrl = f.value;
			} catch {}
			t.value = "ready";
		} catch {
			A || (t.value = "error");
		}
	}
	function P(e) {
		D && (D.setCurrentLevel(e === "auto" ? -1 : e), p());
	}
	function F(e) {
		D && (D.setNextLevel(e === "auto" ? -1 : e), p());
	}
	function I(e) {
		D && (D.setAudioTrack(e), h());
	}
	function L(e) {
		if (!D || !f.value) return;
		let t = f.value.replace("master.m3u8", `media_v${e}.m3u8`);
		D.loadSource(t), m();
	}
	function R() {
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
	function z() {
		R(), t.value = "idle", n.value = 0, r.value = [], m(), g();
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
		setLevel: P,
		setNextLevel: F,
		setAudioTrack: I,
		jobId: d,
		masterUrl: f,
		loadVariantPlaylist: L,
		start: N,
		cleanup: R,
		reset: z
	};
}
function Fa() {
	try {
		return new _e();
	} catch {
		return null;
	}
}
function Ia(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var La = 10, Ra = 6;
function za(e) {
	let t = S(null), n = S(!1), r = S(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new ke({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % La, s = Math.floor(i / La), c = a / (La - 1) * 100, l = s / (Ra - 1) * 100;
		return `url("${n.sprite_url}") ${c}% ${l}% / cover no-repeat`;
	}
	async function c(o, s) {
		if (!(i.has(o) && (t.value = i.get(o) ?? null, t.value !== null))) {
			n.value = !0, r.value = null;
			try {
				let n = s ?? e.signal, r = await a().getTrickplay(o, n);
				i.set(o, r), t.value = r;
			} catch (e) {
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
var Ba = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Va = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, null, 8, ["name", "class"])], 10, Ba));
	}
}), [["__scopeId", "data-v-48bb9819"]]), Ha = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Ua = 0, Wa = "";
function Ga() {
	Ua === 0 && (Wa = document.body.style.overflow, document.body.style.overflow = "hidden"), Ua++;
}
function Ka() {
	Ua !== 0 && (Ua--, Ua === 0 && (document.body.style.overflow = Wa));
}
function qa(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(Ha)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function s(r) {
		if (!t.value || !e.value) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = o();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let a = i[0], s = i[i.length - 1], c = document.activeElement;
		e.value.contains(c) ? r.shiftKey && c === a ? (r.preventDefault(), s.focus()) : !r.shiftKey && c === s && (r.preventDefault(), a.focus()) : (r.preventDefault(), a.focus());
	}
	function c() {
		i = document.activeElement, e.value?.setAttribute("data-focus-trap", ""), r && (Ga(), a = !0), document.addEventListener("keydown", s, !0), h(() => {
			e.value?.setAttribute("data-focus-trap", ""), (o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (Ka(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	N(t, (e) => e ? c() : l(), { immediate: !0 }), v(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (Ka(), !1);
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var Ja = [
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
], Ya = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Xa = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Za(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Qa(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function $a(e, t) {
	switch (e.key) {
		case " ": return Za(e.target) ? !1 : (t.playPause(), !0);
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
		default: return e.key >= "0" && e.key <= "9" ? (t.seekToPercent(Number(e.key) / 10), !0) : !1;
	}
}
function eo(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Qa(n.target) || $a(n, e) && n.preventDefault();
	}
	y(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), v(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var to = ["aria-label"], no = { class: "shortcuts__head" }, ro = { class: "shortcuts__title" }, io = { class: "shortcuts__grid" }, ao = { class: "shortcuts__keys" }, oo = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, so = {
	key: 1,
	class: "shortcuts__key"
}, co = { class: "shortcuts__label" }, lo = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Ja }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, c = n, { t: d } = X(), f = S(null);
		return qa(f, D(r, "open"), {
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
		}, [s("div", no, [s("h3", ro, E(O(d)("player.keyboard")), 1), u(Va, {
			name: "x",
			label: O(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => c("close")
		}, null, 8, ["label"])]), s("ul", io, [(x(!0), o(e, null, C(t.shortcuts, (t) => (x(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", ao, [(x(!0), o(e, null, C(t.keys, (t, n) => (x(), o(e, { key: n }, [t === "–" ? (x(), o("span", oo, "–")) : (x(), o("kbd", so, [O(Ya)[t] ? (x(), i(J, {
			key: 0,
			name: O(Ya)[t],
			label: O(Xa)[t] ?? t
		}, null, 8, ["name", "label"])) : (x(), o(e, { key: 1 }, [l(E(t), 1)], 64))]))], 64))), 128))]), s("span", co, E(t.label), 1)]))), 128))])], 8, to)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), uo = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], fo = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			c.value && (c.value = !1, e.currentTarget.releasePointerCapture?.(e.pointerId), i("change", n.modelValue));
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
			onPointerup: v
		}, [s("div", {
			class: "phlix-slider__fill",
			style: _({ width: l.value + "%" })
		}, null, 4), s("div", {
			class: "phlix-slider__thumb",
			style: _({ left: l.value + "%" })
		}, null, 4)], 544)], 42, uo));
	}
}), [["__scopeId", "data-v-644a7ce9"]]), po = { class: "volume" }, mo = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "VolumeControl",
	setup(e) {
		let t = le(), n = ne(), { t: i } = X(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return N(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (x(), o("div", po, [u(Va, {
			name: s.value,
			label: O(t).muted ? O(i)("player.unmute") : O(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => O(t).toggleMute()
		}, null, 8, ["name", "label"]), u(fo, {
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
function ho(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function go(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function _o(e, t) {
	return t === "first" ? go(e, -1, 1) : go(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var vo = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], yo = ["id", "aria-label"], bo = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], xo = { class: "phlix-select__check" }, So = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let d = t, { t: f } = X(), p = c, m = r(() => ho(d.options)), _ = k(), y = S(!1), b = S(-1), w = S(null), T = S(null);
		function D() {
			y.value ? ee() : H();
		}
		n({ toggleMenu: D });
		let j = "", P, I = A(t, "open"), L = r(() => m.value.findIndex((e) => e.value === d.modelValue));
		N(I, (e) => {
			e && !y.value ? H() : !e && y.value && ee();
		}, { immediate: !0 });
		let R = r(() => m.value[L.value]?.label ?? ""), z = r(() => b.value >= 0 ? `${_}-opt-${b.value}` : void 0), B = S(!1);
		function V() {
			let e = w.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			B.value = n < 284 && r > n;
		}
		function H() {
			d.disabled || y.value || (V(), y.value = !0, b.value = L.value >= 0 ? L.value : _o(m.value, "first"), h(re));
		}
		function ee() {
			y.value = !1;
		}
		function te(e) {
			let t = m.value[e];
			!t || t.disabled || (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), ee(), w.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function ne(e) {
			b.value = go(m.value, b.value, e), h(re);
		}
		function re() {
			(T.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function ie(e) {
			if (!d.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), y.value ? ne(1) : H();
					break;
				case "ArrowUp":
					e.preventDefault(), y.value ? ne(-1) : H();
					break;
				case "Home":
					y.value && (e.preventDefault(), b.value = _o(m.value, "first"), h(re));
					break;
				case "End":
					y.value && (e.preventDefault(), b.value = _o(m.value, "last"), h(re));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), y.value && b.value >= 0 ? te(b.value) : H();
					break;
				case "Escape":
					y.value && (e.preventDefault(), ee());
					break;
				case "Tab":
					ee();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && ae(e.key);
			}
		}
		function ae(e) {
			y.value || H(), j += e.toLowerCase(), clearTimeout(P), P = setTimeout(() => j = "", 600);
			let t = m.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(j));
			t >= 0 && (b.value = t, h(re));
		}
		function oe(e) {
			y.value && w.value && !w.value.contains(e.target) && ee();
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
			onClick: r[0] ||= (e) => y.value ? ee() : H(),
			onKeydown: ie
		}, [s("span", { class: g(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, E(L.value >= 0 ? R.value : t.placeholder ?? O(f)("common.selectPlaceholder")), 3), u(J, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, vo), F(s("ul", {
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
		}, [s("span", xo, [e.value === t.modelValue ? (x(), i(J, {
			key: 0,
			name: "check"
		})) : a("", !0)]), l(" " + E(e.label), 1)], 42, bo))), 128))], 10, yo), [[M, y.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]), Co = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		], n = le(), { t: a } = X(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (x(), i(So, {
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
}), [["__scopeId", "data-v-4530b308"]]), wo = "auto", To = "original";
function Eo(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Do(e) {
	return e >= 2160 ? "4K" : Eo(e);
}
function Oo(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = Eo(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Do(r.height)
		}));
	}
	return n;
}
function ko(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) Eo(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Ao(e, t) {
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
function jo(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function Mo(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && Ao(e, n) >= 0;
}
function No(e, t) {
	if (t < 0) return wo;
	let n = e.find((e) => e.index === t);
	return n ? Eo(n.height) : wo;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Po = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let u = n, d = le(), f = ne(), { t: p } = X(), m = r(() => Oo(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = Eo(r.height);
				e.has(i) || n && ko(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: Do(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => Ao(o.levels, _.value)), y = r(() => _.value && v.value >= 0 ? {
			value: To,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: Do(o.activeHeight) })), w = r(() => [
			{
				value: wo,
				label: C.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? wo : y.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? To : No(o.levels, o.currentLevel));
		function E(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : ko(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => b.value || s.value ? (x(), i(So, {
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
function Fo(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function Io(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Lo(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Ro(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function zo(e) {
	return e ? Fo(e.textTracks).filter(Io).map((e, t) => ({
		index: t,
		language: Lo(e, t),
		label: e.label || Ro(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function Bo(e) {
	let t = e?.audioTracks;
	return Fo(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Ro(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function Vo(e, t) {
	return !e || t == null ? null : Fo(e.textTracks).filter(Io).find((e, n) => Lo(e, n) === t) ?? null;
}
function Ho(e, t) {
	return Vo(e, t) != null;
}
function Uo(e, t) {
	e && Fo(e.textTracks).filter(Io).forEach((e, n) => {
		try {
			e.mode = Lo(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function Wo(e, t) {
	let n = e?.audioTracks;
	Fo(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Go(e) {
	let t = e?.audioTracks;
	return Fo(t).findIndex((e) => e.enabled);
}
var Ko = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function qo(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Jo(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && qo(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(Ko, n) ? Ko[n] : e;
	});
}
function Yo(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Jo(e).trim()).filter((e) => e.length > 0) : [];
}
function Xo(e) {
	if (!e) return [];
	let t = Fo(e.activeCues), n = [];
	for (let e of t) n.push(...Yo(e.text));
	return n;
}
var Zo = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Qo = [
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
], $o = [
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
], es = [
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
], ts = [
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
function ns(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function rs(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function is(e) {
	return {
		"--cap-scale": String(Zo[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": ns(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": rs(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var as = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(t, { expose: n }) {
		let i = t, s = S([]), c = r(() => is(i.styleConfig)), l = null, u = null, d = null;
		function f() {
			s.value = Xo(l);
		}
		function p() {
			d != null && (clearTimeout(d), d = null);
		}
		function m() {
			p(), d = setTimeout(() => {
				if (d = null, !l) return;
				Uo(i.video, i.language);
				let e = Xo(l);
				e.length && (s.value = e);
			}, 0);
		}
		function h() {
			p(), l?.removeEventListener("cuechange", f), u?.removeEventListener("load", f), l = null, u = null;
		}
		function y(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function b() {
			h(), Uo(i.video, i.language);
			let e = Vo(i.video, i.language);
			if (e) {
				if (l = e, e.addEventListener("cuechange", f), s.value = Xo(e), !s.value.length) {
					let t = y(i.video, e);
					t && t.readyState !== 2 && (u = t, t.addEventListener("load", f));
				}
				m();
			} else s.value = [];
		}
		return N(() => [i.video, i.language], b, { immediate: !0 }), v(h), n({ lines: s }), (n, r) => s.value.length ? (x(), o("div", {
			key: 0,
			class: g(["player__captions", { "is-lifted": t.lifted }]),
			style: _(c.value)
		}, [(x(!0), o(e, null, C(s.value, (e, t) => (x(), o("p", {
			key: t,
			class: "player__caption-line"
		}, E(e), 1))), 128))], 6)) : a("", !0);
	}
}), [["__scopeId", "data-v-b9f35f44"]]), os = ["aria-label", "aria-expanded"], ss = ["aria-label"], cs = { class: "capmenu__head" }, ls = { class: "capmenu__title" }, us = ["aria-label"], ds = ["aria-checked", "tabindex"], fs = { class: "capmenu__check" }, ps = { class: "capmenu__optlabel" }, ms = [
	"aria-checked",
	"tabindex",
	"onClick"
], hs = { class: "capmenu__check" }, gs = { class: "capmenu__optlabel" }, _s = { class: "capmenu__check" }, vs = { class: "capmenu__optlabel" }, ys = { class: "capmenu__title capmenu__title--sub" }, bs = ["aria-label"], xs = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ss = { class: "capmenu__check" }, Cs = { class: "capmenu__optlabel" }, ws = { class: "capmenu__title capmenu__title--sub" }, Ts = { class: "capmenu__style" }, Es = { class: "capmenu__field" }, Ds = { class: "capmenu__fieldlabel" }, Os = { class: "capmenu__field" }, ks = { class: "capmenu__fieldlabel" }, As = { class: "capmenu__field" }, js = { class: "capmenu__fieldlabel" }, Ms = { class: "capmenu__field" }, Ns = { class: "capmenu__fieldlabel" }, Ps = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let c = t, l = n, d = le(), f = ne(), { t: p } = X(), m = S(null), h = S(null), _ = r(() => d.subtitleLang), y = r(() => c.tracks.some((e) => e.language === _.value)), b = r(() => y.value ? "captions" : "captions-off"), w = r(() => y.value ? c.tracks.findIndex((e) => e.language === _.value) + 1 : 0), T = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
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
		function V(e) {
			f.captionStyle = {
				...f.captionStyle,
				edge: e
			};
		}
		qa(h, D(c, "open"), {
			lockScroll: !1,
			onEscape: () => (A(), !0)
		});
		function H(e) {
			m.value && !m.value.contains(e.target) && A();
		}
		return N(() => c.open, (e) => {
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
		}, [u(J, { name: b.value }, null, 8, ["name"])], 10, os), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", cs, [s("h3", ls, E(O(p)("player.subtitles")), 1), u(Va, {
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
			}, [s("span", fs, [y.value ? a("", !0) : (x(), i(J, {
				key: 0,
				name: "check"
			}))]), s("span", ps, E(O(p)("player.off")), 1)], 8, ds), (x(!0), o(e, null, C(t.tracks, (e, t) => (x(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: w.value === t + 1 ? 0 : -1,
				onClick: (t) => j(e.language)
			}, [s("span", hs, [_.value === e.language ? (x(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", gs, E(e.label), 1)], 8, ms))), 128))], 40, us),
			s("button", {
				type: "button",
				class: "capmenu__add",
				onClick: P
			}, [s("span", _s, [u(J, { name: "plus" })]), s("span", vs, E(O(p)("player.addSubtitles")), 1)]),
			t.audioTracks.length > 1 ? (x(), o(e, { key: 0 }, [s("h3", ys, E(O(p)("player.audio")), 1), s("div", {
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
			}, [s("span", Ss, [t.activeAudio === e.index ? (x(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", Cs, E(e.label), 1)], 8, xs))), 128))], 40, bs)], 64)) : a("", !0),
			s("h3", ws, E(O(p)("player.captionStyle")), 1),
			s("div", Ts, [
				s("div", Es, [s("span", Ds, E(O(p)("player.size")), 1), u(So, {
					"model-value": O(f).captionStyle.size,
					options: O(Qo),
					label: O(p)("player.captionSize"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", Os, [s("span", ks, E(O(p)("player.color")), 1), u(So, {
					"model-value": O(f).captionStyle.textColor,
					options: O($o),
					label: O(p)("player.captionColor"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", As, [s("span", js, E(O(p)("player.background")), 1), u(So, {
					"model-value": O(f).captionStyle.background,
					options: O(es),
					label: O(p)("player.captionBackground"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", Ms, [s("span", Ns, E(O(p)("player.edge")), 1), u(So, {
					"model-value": O(f).captionStyle.edge,
					options: O(ts),
					label: O(p)("player.captionEdge"),
					"onUpdate:modelValue": V
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, ss)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), Fs = ["aria-labelledby"], Is = {
	key: 0,
	class: "phlix-modal__header"
}, Ls = ["id"], Rs = { class: "phlix-modal__body" }, zs = {
	key: 1,
	class: "phlix-modal__footer"
}, Bs = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		return qa(p, f, { onEscape: () => l.dismissible ? (h(), !0) : !1 }), (r, l) => (x(), i(t, { to: "body" }, [u(n, { name: "phlix-modal" }, {
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
				e.title || !e.hideClose ? (x(), o("header", Is, [e.title ? (x(), o("h2", {
					key: 0,
					id: O(m),
					class: "phlix-modal__title"
				}, E(e.title), 9, Ls)) : a("", !0), e.hideClose ? a("", !0) : (x(), i(Va, {
					key: 1,
					name: "x",
					label: O(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: h
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", Rs, [w(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (x(), o("footer", zs, [w(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, Fs)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-12c692c9"]]), Vs = [
	"type",
	"disabled",
	"aria-busy"
], Hs = {
	key: 0,
	class: "phlix-btn__spinner"
}, Us = { class: "phlix-btn__label" }, Ws = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			e.loading ? (x(), o("span", Hs, [u(J, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (x(), i(J, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", Us, [w(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (x(), i(J, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, Vs));
	}
}), [["__scopeId", "data-v-38abf89d"]]), Gs = [
	"disabled",
	"aria-label",
	"aria-pressed"
], Ks = { class: "phlix-chip__label" }, qs = ["disabled", "aria-label"], Js = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, null, 8, ["name"])) : a("", !0), s("span", Ks, [w(t.$slots, "default", {}, void 0, !0)])], 8, Gs), e.removable ? (x(), o("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [u(J, { name: "x" })], 8, qs)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-551f7599"]]), Ys = ["aria-label"], Xs = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		})], 12, Ys));
	}
}), [["__scopeId", "data-v-736b299d"]]), Zs = ["role", "aria-label"], Qs = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, null, 8, ["name"])) : a("", !0), w(t.$slots, "default", {}, void 0, !0)], 10, Zs));
	}
}), [["__scopeId", "data-v-269446f3"]]), $s = {
	class: "phlix-empty",
	role: "status"
}, ec = { class: "phlix-empty__icon" }, tc = { class: "phlix-empty__title" }, nc = {
	key: 0,
	class: "phlix-empty__desc"
}, rc = {
	key: 1,
	class: "phlix-empty__actions"
}, ic = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (x(), o("div", $s, [
			s("span", ec, [u(J, { name: e.icon }, null, 8, ["name"])]),
			s("h3", tc, E(e.title), 1),
			e.description || t.$slots.default ? (x(), o("p", nc, [w(t.$slots, "default", {}, () => [l(E(e.description), 1)], !0)])) : a("", !0),
			t.$slots.actions ? (x(), o("div", rc, [w(t.$slots, "actions", {}, void 0, !0)])) : a("", !0)
		]));
	}
}), [["__scopeId", "data-v-1790dcf5"]]), ac = { class: "subsearch" }, oc = { class: "subsearch__langs" }, sc = { class: "subsearch__legend" }, cc = { class: "subsearch__chips" }, lc = { class: "subsearch__actions" }, uc = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, dc = {
	key: 2,
	class: "subsearch__prompt"
}, fc = {
	key: 3,
	class: "subsearch__list"
}, pc = { class: "subsearch__meta" }, mc = { class: "subsearch__release" }, hc = { class: "subsearch__signals" }, gc = { class: "subsearch__provider" }, _c = ["aria-label"], vc = {
	key: 2,
	class: "subsearch__stat"
}, yc = {
	key: 3,
	class: "subsearch__stat"
}, bc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let c = t, d = n, { t: f } = X(), p = Ae(), m = [
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
			return c.client ?? new ke({ baseUrl: c.apiBase ?? "" });
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
			if (e instanceof ue) {
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
				let n = Ta([(await F().downloadSubtitle(c.mediaId, {
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
		}, { immediate: !0 }), (n, r) => (x(), i(Bs, {
			"model-value": t.open,
			title: O(f)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => d("update:open", e)
		}, {
			footer: P(() => [u(Ws, {
				variant: "ghost",
				onClick: L
			}, {
				default: P(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			})]),
			default: P(() => [s("div", ac, [
				s("fieldset", oc, [s("legend", sc, E(O(f)("player.subtitleSearchLanguages")), 1), s("div", cc, [(x(!0), o(e, null, C(g.value, (e) => (x(), i(Js, {
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
				s("div", lc, [u(Ws, {
					variant: "solid",
					"left-icon": "search",
					loading: b.value,
					disabled: !M.value,
					onClick: I
				}, {
					default: P(() => [l(E(O(f)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				b.value ? (x(), o("div", uc, [u(Xs, { label: O(f)("player.subtitleSearching") }, null, 8, ["label"]), s("span", null, E(O(f)("player.subtitleSearching")), 1)])) : w.value && j.value.length === 0 ? (x(), i(ic, {
					key: 1,
					icon: "captions",
					title: O(f)("player.subtitleSearchEmpty"),
					description: O(f)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : w.value ? (x(), o("ul", fc, [(x(!0), o(e, null, C(j.value, (e) => (x(), o("li", {
					key: A(e),
					class: "subsearch__item"
				}, [s("div", pc, [s("p", mc, E(e.releaseName || e.provider), 1), s("div", hc, [
					u(Qs, {
						tone: "neutral",
						size: "sm"
					}, {
						default: P(() => [l(E(h(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (x(), i(Qs, {
						key: 0,
						tone: "info",
						size: "sm",
						label: O(f)("player.subtitleHearingImpairedFull")
					}, {
						default: P(() => [l(E(O(f)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : a("", !0),
					s("span", gc, E(e.provider), 1),
					e.rating > 0 ? (x(), o("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": O(f)("player.subtitleRating", { rating: e.rating })
					}, [u(J, { name: "star" }), l(" " + E(e.rating), 1)], 8, _c)) : a("", !0),
					e.downloadCount > 0 ? (x(), o("span", vc, E(O(f)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : a("", !0),
					e.fps ? (x(), o("span", yc, E(O(f)("player.subtitleFps", { fps: e.fps })), 1)) : a("", !0)
				])]), u(Ws, {
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
				])]))), 128))])) : (x(), o("p", dc, E(O(f)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), xc = 32, Sc = 18, Cc = 250, wc = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Tc(e, t, n, r, i, a, o) {
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
		r: wc(d / m),
		g: wc(f / m),
		b: wc(p / m)
	};
}
function Ec(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Tc(e, t, n, 0, 0, r, n),
		right: Tc(e, t, n, t - r, 0, t, n),
		center: Tc(e, t, n, 0, 0, t, n)
	};
}
function Dc({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Oc({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function kc(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Oc(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Oc(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Oc(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Ac(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var jc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			i.value = Ac(a);
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
				u.value = kc(Ec(n, 32, 18));
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
}), [["__scopeId", "data-v-88c68588"]]), Mc = ["aria-label"], Nc = { class: "resume__label" }, Pc = { class: "resume__time numeric" }, Fc = { class: "resume__actions" }, Ic = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = X(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (x(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": O(i)("player.resumePlayback")
		}, [s("p", Nc, [
			l(E(a.value[0]), 1),
			s("span", Pc, E(O(ta)(e.seconds)), 1),
			l(E(a.value[1]), 1)
		]), s("div", Fc, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [u(J, { name: "play" }), s("span", null, E(O(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [u(J, { name: "rewind" }), s("span", null, E(O(i)("player.startOver")), 1)])])], 8, Mc));
	}
}), [["__scopeId", "data-v-271c5209"]]), Lc = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Rc = [
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
], zc = new Set(Rc);
function Bc(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Vc(...e) {
	return e.some((e) => zc.has(Bc(e)));
}
function Hc(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Uc(e) {
	return e?.error?.code === 2;
}
var Wc = 8, Gc = 15, Kc = 2 * Math.PI * 15;
function qc(e, t, n = Kc) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Jc = /* @__PURE__ */ new Map([
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
]), Yc = /* @__PURE__ */ new Map([
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
]), Xc = /* @__PURE__ */ new Set(["h264"]), Zc = /* @__PURE__ */ new Map([
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
function Qc(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = Yc.get(t);
	return n === void 0 ? "transcode" : Xc.has(n) ? "direct" : "probe";
}
function $c(e) {
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
var el = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function tl(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return el.get(t) ?? "video/mp4";
}
function nl(e, t = "video/mp4") {
	let n = Jc.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function rl(e, t = "video/mp4") {
	if (!e) return !0;
	let n = nl(e, t);
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
async function il(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = Yc.get(n), i = r === void 0 ? void 0 : Zc.get(r);
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
async function al(e, t, n = "") {
	if (Vc(...e)) return !0;
	let r = e.map((e) => Bc(e)).find((e) => Lc.includes(e)) ?? "";
	if (!Lc.includes(r)) return !1;
	let i = tl(r), a = Qc(n);
	if (a === "transcode" || a === "probe" && !await il(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await rl(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var ol = ["aria-label"], sl = ["src"], cl = { class: "upnext__body" }, ll = { class: "upnext__eyebrow" }, ul = { class: "upnext__title" }, dl = {
	key: 0,
	class: "upnext__cd numeric"
}, fl = { class: "upnext__actions" }, pl = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ml = ["r"], hl = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], gl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let { t: n } = X(), i = e, c = t, l = r(() => i.posterUrl ?? i.media.poster_url ?? null), d = r(() => qc(i.remaining, i.total));
		return (t, r) => (x(), o("aside", {
			class: "upnext",
			role: "region",
			"aria-label": O(n)("player.upNext")
		}, [
			l.value ? (x(), o("img", {
				key: 0,
				class: "upnext__thumb",
				src: l.value,
				alt: "",
				loading: "lazy"
			}, null, 8, sl)) : a("", !0),
			s("div", cl, [
				s("p", ll, E(O(n)("player.upNext")), 1),
				s("h4", ul, E(e.media.name), 1),
				e.counting ? (x(), o("p", dl, E(O(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", fl, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => c("play-now")
				}, [u(J, { name: "play" }), s("span", null, E(O(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => c("cancel")
				}, E(O(n)("player.cancel")), 1)])
			]),
			e.counting ? (x(), o("svg", pl, [s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ml), s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": O(Kc),
				"stroke-dashoffset": d.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, hl)])) : a("", !0)
		], 8, ol));
	}
}), [["__scopeId", "data-v-85909b2d"]]), _l = {
	class: "transcode",
	role: "alert"
}, vl = { class: "transcode__card" }, yl = { class: "transcode__heading" }, bl = { class: "transcode__body" }, xl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = X();
		return (t, i) => (x(), o("div", _l, [s("div", vl, [
			u(J, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", yl, E(O(r)("player.transcodeHeading")), 1),
			s("p", bl, E(e.title ? O(r)("player.transcodeBodyTitled", { title: e.title }) : O(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, E(O(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), Sl = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Cl = { class: "prep__card" }, wl = { class: "prep__heading" }, Tl = { class: "prep__body" }, El = ["aria-valuenow"], Dl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = X(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (x(), o("div", Sl, [s("div", Cl, [
			u(J, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", wl, E(O(n)("player.transcodePreparingHeading")), 1),
			s("p", Tl, E(e.title ? O(n)("player.transcodePreparingTitled", { title: e.title }) : O(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: _({ width: r() + "%" })
			}, null, 4)], 8, El),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, E(O(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Ol = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
}), [["__scopeId", "data-v-d3fc1b53"]]), kl = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Al = ["aria-label", "onClick"], jl = { class: "skip-controls__label" }, Ml = 5, Nl = 30, Pl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			let n = d(e.startMs), r = n - Ml, i = n + Nl;
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
		return (t, n) => g.value.length > 0 ? (x(), o("div", kl, [(x(!0), o(e, null, C(g.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${h(e.type)}`,
			onClick: L((t) => _(e), ["stop"])
		}, [s("span", jl, E(h(e.type)), 1), u(J, { name: "skip-forward" })], 8, Al))), 128))])) : a("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Fl = ["aria-label", "aria-expanded"], Il = ["aria-label"], Ll = { class: "chapterlist__head" }, Rl = { class: "chapterlist__title" }, zl = ["aria-label"], Bl = ["onClick"], Vl = { class: "chapterlist__index" }, Hl = { class: "chapterlist__name" }, Ul = { class: "chapterlist__meta" }, Wl = { class: "chapterlist__time" }, Gl = {
	key: 0,
	class: "chapterlist__duration"
}, Kl = {
	key: 1,
	class: "chapterlist__empty"
}, ql = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = ta(e.start), a;
			return e.end != null && e.end > e.start && (a = ta(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = S(null), h = S(null);
		qa(h, D(i, "open"), {
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
		}, [u(J, { name: "list" })], 10, Fl), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(l)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", Ll, [s("h3", Rl, E(O(l)("player.chapters")), 1), u(Va, {
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
			s("span", Vl, E(e.index), 1),
			s("span", Hl, E(e.label), 1),
			s("span", Ul, [s("span", Wl, E(e.startLabel), 1), e.durationLabel ? (x(), o("span", Gl, "· " + E(e.durationLabel), 1)) : a("", !0)])
		], 8, Bl)]))), 128))], 8, zl)) : (x(), o("p", Kl, E(O(l)("player.noChapters")), 1))], 8, Il)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Jl = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Yl = { class: "marker-timeline__ticks" }, Xl = [
	"title",
	"aria-label",
	"onClick"
], Zl = { class: "marker-timeline__tooltip" }, Ql = { class: "marker-timeline__tooltip-label" }, $l = { class: "marker-timeline__tooltip-time numeric" }, eu = ["onClick"], tu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, [h.value ? (x(), o("div", Jl, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), l(" " + E(v.value), 1)])) : a("", !0), s("div", Yl, [(x(!0), o(e, null, C(p.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: g(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: _({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${O(ta)(e.startSec)}`,
			"aria-label": `${e.label} at ${O(ta)(e.startSec)}`,
			onClick: L((t) => y(e), ["stop"])
		}, [s("span", Zl, [
			s("span", Ql, E(e.label), 1),
			s("span", $l, E(O(ta)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: L((t) => b(e), ["stop"])
			}, " Find similar ", 8, eu)
		])], 14, Xl))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), nu = ["aria-label", "aria-expanded"], ru = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, iu = ["aria-label"], au = ["aria-selected", "onClick"], ou = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		}, [u(J, { name: "moon" }), m.value ? (x(), o("span", ru, E(w(p.value)), 1)) : a("", !0)], 10, nu), u(n, { name: "dropdown" }, {
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
			}, E(e.label), 11, au)), 64))], 8, iu)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Z = {
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
function su(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function cu(e) {
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
function lu(e) {
	return JSON.stringify(e);
}
var uu = .1, du = .99, fu = 1.01, pu = class {
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
		this.driftRate = 1 + uu * i / 1e3, this.driftRate = Math.min(fu, Math.max(du, this.driftRate));
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
}, mu = class {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new pu(e.now);
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
		let t = cu(e);
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
			default: break;
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
	handleGroupState(e) {
		let t = e, n = t.group;
		if (typeof n != "object" || !n) return;
		let r = Array.isArray(n.members) ? n.members.map((e) => ({
			id: e.id,
			name: e.name,
			is_host: e.id === n.host_id,
			joined_at: typeof e.joined_at == "number" ? e.joined_at : 0
		})) : [];
		this.group = {
			group_id: n.group_id,
			group_name: n.group_name,
			members: r,
			member_count: n.member_count,
			host_id: n.host_id ?? null,
			current_media_id: n.current_media_id ?? null,
			current_media_duration: n.current_media_duration ?? null,
			playback_position: n.playback_position ?? 0,
			playback_state: n.playback_state ?? "stopped",
			created_at: n.created_at,
			last_activity_at: n.last_activity_at
		}, this.options.onState?.(this.group, t.your_id);
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
		let t = typeof e.member_id == "string" ? e.member_id : void 0;
		if (t === this.memberId) return;
		let n = typeof e.position == "number" ? e.position : 0, r = typeof e.is_playing == "boolean" && e.is_playing, i = typeof e.server_time == "number" ? e.server_time : this.getSynchronizedTime();
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
		this.send(su(e, t, this.now));
	}
}, hu = class {
	client;
	constructor(e) {
		this.client = new ke({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new _e() : void 0
		});
	}
	async createRoom(e) {
		return (await this.client.post("/api/v1/syncplay/groups", e)).group;
	}
	async joinRoom(e) {
		return (await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`)).session;
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return (await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).session;
	}
	async getMembers(e) {
		let t = await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/members`);
		return Array.isArray(t.members) ? t.members : [];
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups : [];
	}
	async listPublicRooms() {
		return this.listGroups();
	}
	async sendStateUpdate(e, t) {}
	async sendCommand(e, t) {}
}, gu = null;
function _u(e) {
	return gu ||= new hu(e), gu;
}
var Q = null, vu = null, yu = 0, bu = 5, xu = 1e3, $ = null, Su = null, Cu = null, wu = null;
function Tu() {
	try {
		return typeof window > "u" ? null : new _e().getAccessToken();
	} catch {
		return null;
	}
}
function Eu(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = Tu() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function Du(e) {
	if ($) try {
		let t = JSON.parse(e.data);
		$.handleIncoming(t);
	} catch {}
}
function Ou() {
	if (Q = null, $ && $.onDisconnect(), vu && yu < bu) {
		let e = xu * 2 ** yu;
		yu++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${yu})`), setTimeout(() => {
			vu && ku(vu);
		}, e);
	} else yu >= bu && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), vu = null, yu = 0, $ = null);
}
function ku(e, t, n, r) {
	if (t && (wu = t), Q && vu !== e && (Q.close(), Q = null, vu = null, yu = 0, $ = null), Q && vu === e) return;
	vu = e, yu = 0;
	let i = n ?? Su ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Cu ?? "Anonymous";
	Su = i, Cu = a, $ = new mu({
		send: (e) => {
			Q && Q.readyState === WebSocket.OPEN && Q.send(lu(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			wu && wu({
				type: e.type,
				position: e.position,
				roomId: vu ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			wu && wu({
				type: n ? "play" : "pause",
				position: t,
				roomId: vu ?? void 0
			});
		},
		onDisconnect: () => {},
		onError: (e, t) => {
			console.error(`[SyncPlay] Error: ${e} - ${t}`);
		},
		onInfo: (e) => {
			console.log(`[SyncPlay] Info: ${e}`);
		}
	});
	let o = Eu(e);
	console.log(`[SyncPlay] Opening WebSocket to ${o}`), Q = new WebSocket(o), Q.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), yu = 0, $ && vu && $.joinGroup(vu);
	}, Q.onmessage = Du, Q.onclose = Ou, Q.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function Au() {
	Q &&= (Q.close(), null), $ &&= ($.leaveGroup(), $.onDisconnect(), null), vu = null, yu = 0;
}
function ju(e) {
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
		case "sync":
			e.position !== void 0 && $.reportPosition(e.position, !0);
			break;
	}
}
var Mu = R("phlix-syncplay", () => {
	let e = S(null), t = S(null), n = S([]), i = S(null), a = S(!1), o = S(0), s = 0, c = r(() => t.value !== null), l = r(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), u = r(() => n.value.filter((e) => e.isOnline)), d = r(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), f = r(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(d.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	async function p(r, o) {
		a.value = !0, i.value = null;
		try {
			let i = _u(r), a = await i.createRoom(o);
			e.value = a;
			let s = await i.joinRoom(a.id);
			t.value = s, n.value = s.activeUsers;
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to create room", e;
		} finally {
			a.value = !1;
		}
	}
	async function m(r, o) {
		a.value = !0, i.value = null;
		try {
			let i = _u(r), a = await i.getMembers(o);
			n.value = a;
			let c = await i.joinRoom(o);
			t.value = c, s = Date.now(), e.value &&= {
				...e.value,
				currentSession: c
			}, n.value = c.activeUsers, ku(o, (e) => {
				g(e);
			});
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to join room", e;
		} finally {
			a.value = !1;
		}
	}
	async function h(r) {
		if (e.value) {
			a.value = !0, i.value = null;
			try {
				await _u(r).leaveRoom(e.value.id), Au(), e.value = null, t.value = null, n.value = [];
			} catch (e) {
				throw i.value = e instanceof Error ? e.message : "Failed to leave room", e;
			} finally {
				a.value = !1;
			}
		}
	}
	function g(e) {
		if (t.value) switch (e.type) {
			case "play":
				t.value = {
					...t.value,
					state: "playing"
				};
				break;
			case "pause":
				t.value = {
					...t.value,
					state: "paused"
				};
				break;
			case "seek":
				e.position !== void 0 && (s = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				});
				break;
			case "sync":
				e.position !== void 0 && (s = Date.now(), t.value = {
					...t.value,
					playbackPosition: e.position
				}), e.rate !== void 0 && (t.value = {
					...t.value,
					playbackRate: e.rate
				});
				break;
		}
	}
	function _(e, n, r) {
		t.value && ju({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function v(e) {
		if (t.value) try {
			let n = await _u(e).getState(t.value.id);
			t.value = n, s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function y(t) {
		if (e.value) try {
			let r = await _u(t).getMembers(e.value.id);
			n.value = r;
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function b() {
		i.value = null;
	}
	function x(e) {
		o.value = e;
	}
	return {
		currentRoom: e,
		currentSession: t,
		members: n,
		error: i,
		isLoading: a,
		isInRoom: c,
		isSynced: l,
		onlineMembers: u,
		syncStatus: f,
		driftAmount: d,
		createAndJoinRoom: p,
		joinRoom: m,
		leaveRoom: h,
		onRemoteStateUpdate: g,
		sendCommand: _,
		refreshState: v,
		refreshMembers: y,
		clearError: b,
		updateLocalPosition: x
	};
});
//#endregion
//#region src/composables/useApiBase.ts
function Nu(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function Pu() {
	let e = f("mediaApiBase", void 0), t = f("apiBase", "");
	return r(() => Nu(e) || Nu(t));
}
//#endregion
//#region src/components/syncplay/SyncPlayOverlay.vue?vue&type=script&setup=true&lang.ts
var Fu = {
	key: 0,
	class: "syncplay-overlay"
}, Iu = { class: "syncplay-overlay__badge" }, Lu = { class: "syncplay-overlay__label" }, Ru = { class: "syncplay-overlay__status-label" }, zu = { class: "syncplay-overlay__members" }, Bu = { class: "syncplay-overlay__member-count" }, Vu = { class: "syncplay-overlay__member-list" }, Hu = { class: "syncplay-overlay__member-name" }, Uu = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Wu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = X(), c = Mu(), d = Pu(), f = r(() => n.apiBase ?? d.value), p = r(() => c.currentRoom?.name ?? "SyncPlay"), m = r(() => c.onlineMembers.length), h = r(() => c.syncStatus), _ = r(() => {
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
		return (t, n) => O(c).isInRoom ? (x(), o("div", Fu, [
			s("div", Iu, [u(J, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", Lu, "SyncPlay: " + E(p.value), 1)]),
			s("div", { class: g(["syncplay-overlay__status", `syncplay-overlay__status--${h.value}`]) }, [u(J, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", Ru, E(_.value), 1)], 2),
			s("div", zu, [s("span", Bu, [u(J, { name: "user" }), l(" " + E(m.value) + " " + E(O(i)("syncplay.members", { count: m.value })), 1)]), s("ul", Vu, [(x(!0), o(e, null, C(O(c).onlineMembers.slice(0, 5), (e) => (x(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", Hu, E(e.name), 1)]))), 128)), O(c).onlineMembers.length > 5 ? (x(), o("li", Uu, " +" + E(O(c).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			u(Ws, {
				variant: "ghost",
				size: "sm",
				onClick: y
			}, {
				default: P(() => [l(E(O(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Gu = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], Ku = ["id"], qu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Switch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = k();
		function c() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (x(), o("span", { class: g(["phlix-switch", { "is-disabled": e.disabled }]) }, [s("button", {
			type: "button",
			role: "switch",
			class: g(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? O(i) : void 0,
			disabled: e.disabled,
			onClick: c
		}, [...n[0] ||= [s("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, Gu), e.label ? (x(), o("label", {
			key: 0,
			id: O(i),
			class: "phlix-switch__label",
			onClick: c
		}, E(e.label), 9, Ku)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-0725d51f"]]), Ju = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, Yu = ["aria-selected"], Xu = ["aria-selected"], Zu = {
	key: 0,
	class: "syncplay-modal__fields"
}, Qu = { class: "syncplay-modal__field" }, $u = {
	class: "syncplay-modal__label",
	for: "room-name"
}, ed = ["placeholder"], td = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, nd = { class: "syncplay-modal__toggle-hint" }, rd = {
	key: 1,
	class: "syncplay-modal__fields"
}, id = { class: "syncplay-modal__field" }, ad = {
	class: "syncplay-modal__label",
	for: "room-id"
}, od = ["placeholder"], sd = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, cd = {
	key: 3,
	class: "syncplay-modal__rooms"
}, ld = { class: "syncplay-modal__rooms-title" }, ud = { class: "syncplay-modal__rooms-list" }, dd = ["onClick"], fd = { class: "syncplay-modal__room-name" }, pd = { class: "syncplay-modal__room-count" }, md = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, hd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let c = t, d = n, { t: f } = X(), p = Mu(), m = Pu(), h = r(() => c.apiBase ?? m.value), _ = S("create"), v = S(""), y = S(""), b = S(!0), w = S(!1), T = S(null), D = S([]), k = S(!1), A = r(() => v.value.trim().length > 0), M = r(() => y.value.trim().length > 0), I = r(() => (_.value === "create" ? A.value : M.value) && !w.value);
		N(() => c.modelValue, async (e) => {
			e && (T.value = null, v.value = "", b.value = !0, c.prefilledRoomId ? (y.value = c.prefilledRoomId, _.value = "join") : (y.value = "", _.value = "create"), await R());
		});
		async function R() {
			k.value = !0;
			try {
				let e = new hu(h.value);
				D.value = await e.listPublicRooms();
			} catch {
				D.value = [];
			} finally {
				k.value = !1;
			}
		}
		async function z() {
			if (I.value) {
				w.value = !0, T.value = null;
				try {
					_.value === "create" ? (await p.createAndJoinRoom(h.value, {
						name: v.value.trim(),
						isPublic: b.value
					}), p.currentRoom && d("joined", p.currentRoom)) : (await p.joinRoom(h.value, y.value.trim()), p.currentRoom && d("joined", p.currentRoom)), d("update:modelValue", !1);
				} catch (e) {
					T.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					w.value = !1;
				}
			}
		}
		function B(e) {
			_.value = "join", y.value = e.id, v.value = e.name;
		}
		function V() {
			d("update:modelValue", !1);
		}
		return (n, r) => (x(), i(Bs, {
			"model-value": t.modelValue,
			title: O(f)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[5] ||= (e) => d("update:modelValue", e),
			onClose: V
		}, {
			footer: P(() => [u(Ws, {
				variant: "ghost",
				type: "button",
				onClick: V
			}, {
				default: P(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			}), u(Ws, {
				variant: "solid",
				type: "button",
				loading: w.value,
				disabled: !I.value,
				onClick: z
			}, {
				default: P(() => [l(E(_.value === "create" ? O(f)("syncplay.createRoom") : O(f)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: P(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: L(z, ["prevent"])
			}, [
				s("div", Ju, [s("button", {
					type: "button",
					role: "tab",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "create" }]),
					"aria-selected": _.value === "create",
					onClick: r[0] ||= (e) => _.value = "create"
				}, E(O(f)("syncplay.createRoom")), 11, Yu), s("button", {
					type: "button",
					role: "tab",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "join" }]),
					"aria-selected": _.value === "join",
					onClick: r[1] ||= (e) => _.value = "join"
				}, E(O(f)("syncplay.joinRoom")), 11, Xu)]),
				_.value === "create" ? (x(), o("div", Zu, [s("div", Qu, [s("label", $u, E(O(f)("syncplay.roomName")), 1), F(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => v.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(f)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, ed), [[j, v.value]])]), s("div", td, [u(qu, {
					modelValue: b.value,
					"onUpdate:modelValue": r[3] ||= (e) => b.value = e,
					label: O(f)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), s("span", nd, E(b.value ? O(f)("syncplay.publicHint") : O(f)("syncplay.privateHint")), 1)])])) : (x(), o("div", rd, [s("div", id, [s("label", ad, E(O(f)("syncplay.roomId")), 1), F(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[4] ||= (e) => y.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(f)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, od), [[j, y.value]])])])),
				T.value ? (x(), o("p", sd, E(T.value), 1)) : a("", !0),
				_.value === "join" && D.value.length > 0 ? (x(), o("div", cd, [s("h3", ld, E(O(f)("syncplay.publicRooms")), 1), s("ul", ud, [(x(!0), o(e, null, C(D.value, (e) => (x(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => B(e)
				}, [
					u(J, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", fd, E(e.name), 1),
					s("span", pd, E(e.memberCount) + " " + E(O(f)("syncplay.members")), 1)
				], 8, dd)]))), 128))])])) : a("", !0),
				k.value ? (x(), o("div", md, [u(J, { name: "spinner" }), s("span", null, E(O(f)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]), gd = {
	key: 0,
	class: "syncplay-controls"
}, _d = ["aria-label"], vd = { class: "syncplay-controls__wait-label" }, yd = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, bd = { key: 0 }, xd = { class: "syncplay-controls__transport" }, Sd = ["aria-label"], Cd = ["aria-label"], wd = ["aria-label"], Td = { class: "syncplay-controls__status-label" }, Ed = 10, Dd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let n = e, i = t, { t: c } = X(), d = Mu(), f = Pu(), p = r(() => n.apiBase ?? f.value), m = S(!1), h = S([]), _ = r(() => m.value || d.syncStatus === "re-syncing");
		async function v() {
			if (d.isInRoom) try {
				await d.sendCommand(p.value, "play"), i("play");
			} catch (e) {
				console.error("[SyncPlay] Failed to send play command:", e);
			}
		}
		async function y() {
			if (d.isInRoom) try {
				await d.sendCommand(p.value, "pause"), i("pause");
			} catch (e) {
				console.error("[SyncPlay] Failed to send pause command:", e);
			}
		}
		async function b() {
			n.isPlaying ? await y() : await v();
		}
		async function C(e) {
			if (d.isInRoom) try {
				await d.sendCommand(p.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function w() {
			await C(Math.max(0, n.position - Ed));
		}
		async function T() {
			await C(Math.min(n.duration, n.position + Ed));
		}
		return N(() => d.syncStatus, (e) => {
			e === "re-syncing" ? m.value = !0 : e === "synced" && (m.value = !1, h.value = []);
		}), (t, n) => O(d).isInRoom ? (x(), o("div", gd, [
			_.value ? (x(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": O(c)("syncplay.waitingForMembers")
			}, [
				u(J, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				s("span", vd, E(O(c)("syncplay.waitingForMembers")), 1),
				h.value.length > 0 ? (x(), o("span", yd, [l(E(h.value.slice(0, 3).join(", ")) + " ", 1), h.value.length > 3 ? (x(), o("span", bd, "+" + E(h.value.length - 3), 1)) : a("", !0)])) : a("", !0)
			], 8, _d)) : a("", !0),
			s("div", xd, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.rewind"),
					onClick: w
				}, [u(J, { name: "rewind" })], 8, Sd),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? O(c)("syncplay.pauseAll") : O(c)("syncplay.playAll"),
					onClick: b
				}, [u(J, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Cd),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.fastForward"),
					onClick: T
				}, [u(J, { name: "forward" })], 8, wd)
			]),
			s("div", { class: g(["syncplay-controls__status", `syncplay-controls__status--${O(d).syncStatus}`]) }, [u(J, {
				name: O(d).syncStatus === "synced" ? "check" : O(d).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", Td, E(O(d).syncStatus === "synced" ? O(c)("syncplay.synced") : O(d).syncStatus === "outOfSync" ? O(c)("syncplay.outOfSync") : O(c)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Od = { class: "player__stage" }, kd = ["src", "poster"], Ad = [
	"src",
	"srclang",
	"label"
], jd = { class: "player__meta" }, Md = ["aria-label"], Nd = { class: "player__meta-text" }, Pd = { class: "player__eyebrow" }, Fd = { class: "player__title" }, Id = { class: "player__sub numeric" }, Ld = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Rd = {
	key: 0,
	class: "player__center"
}, zd = ["aria-label"], Bd = { class: "player__btnrow" }, Vd = ["aria-label"], Hd = ["aria-label"], Ud = ["aria-label"], Wd = { class: "player__time numeric" }, Gd = ["aria-label", "aria-pressed"], Kd = ["title"], qd = ["aria-label"], Jd = ["aria-label"], Yd = ["aria-label", "aria-pressed"], Xd = ["aria-label", "aria-pressed"], Zd = ["aria-label"], Qd = { class: "similar-modal" }, $d = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, ef = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, tf = { class: "similar-modal__state-title" }, nf = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, rf = {
	key: 3,
	class: "similar-modal__results"
}, af = { class: "similar-modal__poster" }, of = ["src", "alt"], sf = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, cf = { class: "similar-modal__result-body" }, lf = { class: "similar-modal__result-title" }, uf = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, df = { key: 0 }, ff = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		"play-episode"
	],
	setup(t, { emit: n }) {
		let c = t, d = n, p = le(), m = ne(), { t: _ } = X(), b = Mu(), w = Me(), T = r(() => w.isFavorite(c.media.id)), D = r(() => w.likeLevel(c.media.id));
		function k() {
			w.toggleFavorite(c.media.id, he());
		}
		function A(e) {
			w.setLike(c.media.id, e, he());
		}
		let j = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], M = S(null), F = S(null), I = S(!0), R = S(!1), z = S(!1), B = S(!1), V = S(!1), H = S(!1), ee = S(!1), te = S(null), re = S(null), ie = S(!1), ae = Ae(), oe = S(!1), se = r(() => V.value ? 1.35 : 1), U = S(Vc(c.streamUrl, c.media.path)), ce = r(() => $c(c.media.streams)), ue = 0;
		async function de() {
			let e = ++ue;
			if (U.value) return;
			let t = await al([c.streamUrl, c.media.path], c.playbackAudioTracks ?? [], ce.value);
			e === ue && (!t || U.value || (U.value = !0, K(M.value?.currentTime ?? 0)));
		}
		N([() => c.playbackAudioTracks, ce], () => {
			de();
		}, { immediate: !0 });
		let fe = f("phlixConfig", null), pe = f("resumeReporter", null), me = !1;
		function he() {
			return fe?.apiBase ?? "";
		}
		let W = Pa({
			apiBase: () => c.apiBase ?? "",
			hlsConfig: fe?.playerHlsConfig
		}), ge = za({ apiBase: () => c.apiBase ?? "" }), _e = null;
		function ve(e) {
			_e !== null && clearTimeout(_e), _e = setTimeout(() => {
				_e = null, ge.fetch(e);
			}, 0);
		}
		let ye = r(() => c.thumbnailAt ?? ge.thumbnailAt), be = r(() => U.value ? void 0 : c.streamUrl), xe = r(() => U.value && W.state.value !== "ready"), Se = r(() => U.value && (W.state.value === "preparing" || W.state.value === "idle")), G = r(() => U.value && W.state.value === "error");
		function K(e = 0) {
			let t = M.value;
			t && W.start(t, c.media.id, void 0, e);
		}
		function Ce(e) {
			if (p.quality === "original" && e !== "auto") {
				W.loadVariantPlaylist(To);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				W.loadVariantPlaylist(e);
				return;
			}
			W.setLevel(e);
		}
		let we = !1;
		function Te() {
			m.defaultQuality = wo;
		}
		function Ee() {
			let e = W.levels.value;
			if (e.length === 0) return !1;
			let t = m.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = W.variants.value;
				if (!t || t.length === 0) return !1;
				if (Mo(e, t)) W.loadVariantPlaylist(To);
				else {
					let t = jo(e);
					t >= 0 && W.setNextLevel(t), Te();
				}
				return !0;
			}
			let n = ko(e, t);
			return n >= 0 ? W.setNextLevel(n) : Te(), !0;
		}
		N(() => W.levels.value, (e) => {
			we || e.length === 0 || Ee() && (we = !0);
		}), N(() => W.variants.value, (e) => {
			we || !e?.length || h(() => {
				we || Ee() && (we = !0);
			});
		}, { deep: !0 });
		let De = S(p.resumePositionFor(c.media.id) ?? 0), Oe = S(!U.value && De.value > 0), je = null, Ne = S(!1), Pe = S(8), Fe, Ie = S(null), Le = S(0), Re = S(!1), ze = S([]), Be = S(!1), Ve = S(null);
		function He(e, t) {
			Ie.value = e, Le.value = t, ze.value = [], Ve.value = null, Re.value = !0, qe(e, t);
		}
		let Ue = null, We = null, Ge = null;
		function Ke() {
			let e = c.apiBase ?? "";
			return (We === null || Ge !== e) && (We = new ke({ baseUrl: e }), Ge = e), We;
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
		let Ye = r(() => p.upNext);
		function Xe() {
			U.value = Vc(c.streamUrl, c.media.path), de(), De.value = p.resumePositionFor(c.media.id) ?? 0, Oe.value = !U.value && De.value > 0, je = null, It = !1, wt = !1, xt.value = [], bt.value = !1, Tt = !1, pt.value = -1, jt = null, we = !1, me = !1, et(), Ne.value = !1, W.reset(), M.value && (M.value.currentTime = 0), U.value && K(), ve(c.media.id);
		}
		function Ze(e) {
			let t = M.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : je = Math.max(0, e));
		}
		function Qe() {
			Ze(De.value), Oe.value = !1, M.value?.play()?.catch(() => {});
		}
		function $e() {
			je = null, Ze(0), p.clearResume(c.media.id), Oe.value = !1, M.value?.play()?.catch(() => {});
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
			me || (me = !0, pe?.finish()), mn(), I.value = !0, p.upNext && (Ne.value = !0, m.autoplay && tt());
		}
		function rt() {
			et(), Ne.value = !1;
			let e = p.next(c.streamUrlFor);
			e && d("play-next", e);
		}
		function it() {
			et(), Ne.value = !1;
		}
		function at() {
			if (U.value) return;
			let e = M.value, t = Uc(e) && (e?.currentTime ?? 0) === 0;
			(Hc(e) || t) && (U.value = !0, K(e?.currentTime ?? 0));
		}
		let ot = S([]), st = S([]), ct = S(-1), lt = S(!1), ut = r(() => W.state.value === "ready" && W.audioTracks.value.length > 0), dt = r(() => W.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), ft = r(() => (c.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), pt = S(-1), mt = r(() => !ut.value && !U.value && st.value.length === 0 && ft.value.length > 1), ht = r(() => ut.value ? dt.value : mt.value ? ft.value : st.value), gt = r(() => {
			if (ut.value) return W.currentAudioTrack.value;
			if (mt.value) {
				if (pt.value >= 0) return pt.value;
				let e = (c.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : c.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return ct.value;
		}), _t = S(!1), vt = p.subtitleLang, yt = r(() => {
			let e = U.value ? W.subtitleTracks.value : c.playbackSubtitleTracks ?? [];
			if (xt.value.length === 0) return e;
			let t = (e) => e.url.split("?")[0], n = new Set(e.map(t)), r = xt.value.filter((e) => !n.has(t(e)));
			return r.length === 0 ? e : [...e, ...r];
		}), bt = S(!1), xt = S([]), St = r(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(m.defaultSubtitleLang), t(m.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function Ct(e) {
			xt.value.some((t) => t.url === e.url) || (xt.value = [...xt.value, e]);
		}
		let wt = !1, Tt = !1;
		function Et() {
			if (wt) return;
			if (m.subtitlePreferenceSet) {
				wt = !0;
				return;
			}
			let e = yt.value.find((e) => e.default);
			if (!e) return;
			let t = ot.value.find((t) => t.language === (e.language || e.label));
			t && (p.setSubtitle(t.language), vt = t.language, wt = !0);
		}
		function Dt() {
			if (Tt) return;
			let e = m.defaultAudioLang;
			if (!e) return;
			let t = ht.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = gt.value;
			r >= 0 && r < t.length || (Mt(n), Tt = !0);
		}
		let Ot = r(() => ot.value.some((e) => e.language === p.subtitleLang));
		function kt() {
			let e = M.value;
			ot.value = zo(e), st.value = Bo(e), ct.value = Go(e), Et(), Dt();
		}
		function At() {
			if (Ot.value) vt = p.subtitleLang, p.setSubtitle(null);
			else {
				let e = vt && ot.value.some((e) => e.language === vt) ? vt : ot.value[0]?.language ?? null;
				p.setSubtitle(e);
			}
			d("captions");
		}
		let jt = null;
		function Mt(e) {
			if (ut.value) W.setAudioTrack(e);
			else if (mt.value) {
				if (e === gt.value) return;
				pt.value = e, jt = e, U.value = !0, K(M.value?.currentTime ?? 0);
			} else Wo(M.value, e), ct.value = e;
		}
		N(ut, (e) => {
			if (!e || jt === null) return;
			let t = jt;
			jt = null, t >= 0 && t < W.audioTracks.value.length && W.setAudioTrack(t);
		}), N(yt, () => {
			h(() => kt());
		}, { deep: !0 });
		let Nt = null, Pt, Ft = r(() => {
			let e = [];
			c.media.year && e.push({ text: String(c.media.year) }), c.media.rating && e.push({
				text: c.media.rating,
				cert: !0
			}), c.media.runtime && e.push({ text: `${c.media.runtime}m` });
			let t = c.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), It = !1;
		function Lt() {
			if (!c.autoplay || It || Oe.value || xe.value) return;
			let e = M.value;
			if (!e || !e.paused) return;
			It = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, p.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Rt() {
			Lt();
		}
		function zt() {
			c.prevEpisode && d("play-episode", c.prevEpisode);
		}
		function Bt() {
			c.nextEpisode && d("play-episode", c.nextEpisode);
		}
		function Vt() {
			let e = M.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Ht(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Ut() {
			p.play(), p.setMediaPositionState();
		}
		function Wt() {
			p.pause(), p.setMediaPositionState();
		}
		function Gt() {
			let e = M.value;
			e && p.updateProgress(e.currentTime, e.duration, Ht(e));
		}
		function Kt() {
			let e = M.value;
			e && (e.volume = p.volume, e.muted = p.muted, e.playbackRate = p.rate, je !== null && (e.currentTime = e.duration ? Math.min(e.duration, je) : je, je = null), p.updateProgress(e.currentTime, e.duration, Ht(e)), p.setMediaPositionState(), kt());
		}
		function qt() {
			let e = M.value;
			e && p.updateProgress(e.currentTime, e.duration, Ht(e));
		}
		function Jt() {
			let e = M.value;
			e && (Math.abs(e.volume - p.volume) > .001 && p.setVolume(e.volume), e.muted !== p.muted && p.toggleMute());
		}
		function Yt() {
			let e = M.value;
			e && e.playbackRate !== p.rate && p.setRate(e.playbackRate), p.setMediaPositionState();
		}
		function Xt() {
			p.setMediaPositionState();
		}
		function Zt() {
			p.setMediaPositionState();
		}
		function q(e) {
			let t = M.value;
			t && p.duration > 0 && (t.currentTime = Math.min(p.duration, Math.max(0, e)));
		}
		function Qt() {
			z.value = !0, gn();
		}
		function $t() {
			z.value = !1, gn();
		}
		function en(e) {
			let t = j.reduce((e, t, n) => Math.abs(t - p.rate) < Math.abs(j[e] - p.rate) ? n : e, 0), n = j[Math.min(j.length - 1, Math.max(0, t + e))];
			p.setRate(n);
		}
		function tn() {
			if (!c.markers) return;
			let e = p.position, t = c.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && q(t.startMs / 1e3);
		}
		function nn() {
			if (!c.markers) return;
			let e = p.position, t = c.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && q(t.startMs / 1e3);
		}
		function rn() {
			te.value?.toggleOpen();
		}
		let an = null;
		function on() {
			let e = M.value;
			if (!e) {
				p.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), p.pause();
				return;
			}
			an !== null && (clearInterval(an), an = null);
			let t = .05;
			an = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(an), an = null, e.volume = 0, e.pause(), p.pause());
			}, 50);
		}
		eo({
			playPause: Vt,
			seekBy: (e) => q(p.position + e),
			frameStep: (e) => {
				p.playing || q(p.position + e / 30);
			},
			volumeBy: (e) => p.setVolume(p.volume + e),
			toggleMute: sn,
			toggleFullscreen: ln,
			toggleCaptions: At,
			toggleTheater: cn,
			togglePip: dn,
			skipIntro: tn,
			skipOutro: nn,
			sleepTimer: rn,
			seekToPercent: (e) => q(e * p.duration),
			speedStep: en,
			toggleHelp: () => {
				B.value = !B.value;
			},
			toggleQuality: () => {
				U.value ? (ie.value = !ie.value, re.value?.toggleMenu?.()) : ae.show({
					message: _("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !B.value && !lt.value && !_t.value });
		function sn() {
			p.toggleMute();
		}
		function cn() {
			V.value = !V.value, d("theater", V.value);
		}
		N(() => p.muted, (e) => {
			let t = M.value;
			t && t.muted !== e && (t.muted = e);
		}), N(() => p.volume, (e) => {
			let t = M.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), N(() => p.rate, (e) => {
			let t = M.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), N(() => p.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Ze(e.value) : e.type === "seekBy" && Ze(p.position + e.value));
		});
		function ln() {
			if (typeof document > "u") return;
			let e = F.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function un() {
			R.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function dn() {
			let e = M.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			d("pip");
		}
		function fn() {
			H.value = !0;
		}
		function pn() {
			H.value = !1;
		}
		function mn() {
			Pt &&= (clearTimeout(Pt), void 0);
		}
		function hn() {
			mn(), !(!p.playing || z.value) && (Pt = setTimeout(() => {
				p.playing && !z.value && (I.value = !1);
			}, c.idleTimeout ?? 3e3));
		}
		function gn() {
			I.value = !0, hn();
		}
		N(() => p.playing, (e) => {
			e ? (Oe.value = !1, it(), hn()) : (mn(), I.value = !0);
		});
		let _n = null;
		return y(() => {
			p.setCurrent(c.media, {
				resetPosition: !1,
				streamUrl: c.streamUrl
			}), w.hydrate(c.media), typeof document < "u" && (document.addEventListener("fullscreenchange", un), ee.value = document.pictureInPictureEnabled === !0), _n = p.bindMediaSession({
				onPlay: () => void M.value?.play()?.catch(() => {}),
				onPause: () => M.value?.pause(),
				onSeek: (e) => q(e)
			}), Nt = M.value?.textTracks ?? null, Nt?.addEventListener?.("addtrack", kt), Nt?.addEventListener?.("removetrack", kt), kt(), U.value && K(), ve(c.media.id);
		}), N(() => c.media, (e) => {
			p.setCurrent(e, {
				resetPosition: !1,
				streamUrl: c.streamUrl
			}), Xe();
		}), N(() => c.media?.id, () => {
			w.hydrate(c.media);
		}), N(() => b.currentSession, (e) => {
			e && (e.state === "playing" ? (M.value?.play(), p.play()) : e.state === "paused" && (M.value?.pause(), p.pause()), b.updateLocalPosition(p.position), Math.abs(b.driftAmount) > 2 && Ze(e.playbackPosition));
		}), v(() => {
			mn(), et(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", un), _n?.(), Nt?.removeEventListener?.("addtrack", kt), Nt?.removeEventListener?.("removetrack", kt), an !== null && (clearInterval(an), an = null), _e !== null && (clearTimeout(_e), _e = null);
		}), (n, r) => (x(), o("div", {
			ref_key: "containerRef",
			ref: F,
			class: g(["player", {
				"is-chrome-hidden": !I.value,
				"is-theater": V.value
			}]),
			onPointermove: gn,
			onPointerdown: gn,
			onFocusin: gn
		}, [u(jc, {
			video: M.value,
			enabled: O(m).atmosphere,
			playing: O(p).playing,
			"reduced-motion": O(m).effectiveReducedMotion,
			intensity: se.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), s("div", Od, [
			s("video", {
				ref_key: "videoRef",
				ref: M,
				class: "player__video",
				src: be.value,
				poster: t.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Ut,
				onPause: Wt,
				onTimeupdate: Gt,
				onLoadedmetadata: Kt,
				onCanplay: Rt,
				onProgress: qt,
				onVolumechange: Jt,
				onRatechange: Yt,
				onSeeked: Xt,
				onDurationchange: Zt,
				onEnded: nt,
				onError: at,
				onEnterpictureinpicture: fn,
				onLeavepictureinpicture: pn,
				onClick: Vt
			}, [(x(!0), o(e, null, C(yt.value, (e) => (x(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, Ad))), 128))], 40, kd),
			r[20] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[21] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", jd, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": O(_)("player.back"),
				onClick: r[0] ||= L((e) => d("back"), ["stop"])
			}, [u(J, { name: "arrow-left" })], 8, Md), s("div", Nd, [
				s("p", Pd, E(O(_)("player.nowPlaying")), 1),
				s("h2", Fd, E(t.media.name), 1),
				s("div", Id, [(x(!0), o(e, null, C(Ft.value, (t, n) => (x(), o(e, { key: n }, [n > 0 && !t.cert ? (x(), o("span", Ld, "·")) : a("", !0), s("span", { class: g({ player__cert: t.cert }) }, E(t.text), 3)], 64))), 128))])
			])]),
			xe.value ? a("", !0) : (x(), o("div", Rd, [s("button", {
				type: "button",
				class: g(["player__bigplay", { "is-playing": O(p).playing }]),
				"aria-label": O(p).playing ? O(_)("player.pause") : O(_)("player.play"),
				onClick: L(Vt, ["stop"])
			}, [u(J, { name: O(p).playing ? "pause" : "play" }, null, 8, ["name"])], 10, zd)])),
			u(as, {
				video: M.value,
				language: O(p).subtitleLang,
				"style-config": O(m).captionStyle,
				lifted: I.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			xe.value ? a("", !0) : (x(), o("div", {
				key: 1,
				class: "player__controls",
				onClick: r[7] ||= L(() => {}, ["stop"])
			}, [
				u(da, {
					position: O(p).position,
					duration: O(p).duration,
					buffered: O(p).buffered,
					chapters: t.chapters,
					"thumbnail-at": ye.value,
					onSeek: q,
					onScrubStart: Qt,
					onScrubEnd: $t
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				O(m).showMarkerTimeline && t.markers && t.markers.length > 0 ? (x(), i(tu, {
					key: 0,
					position: O(p).position,
					duration: O(p).duration,
					markers: t.markers,
					onSeek: q,
					onSimilar: He
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", Bd, [
					t.prevEpisode ? (x(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(_)("player.previousEpisode"),
						onClick: zt
					}, [u(J, { name: "skip-back" })], 8, Vd)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": O(p).playing ? O(_)("player.pause") : O(_)("player.play"),
						onClick: Vt
					}, [u(J, { name: O(p).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Hd),
					t.nextEpisode ? (x(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(_)("player.nextEpisode"),
						onClick: Bt
					}, [u(J, { name: "skip-forward" })], 8, Ud)) : a("", !0),
					s("span", Wd, [
						l(E(O(ta)(O(p).position)), 1),
						r[16] ||= s("span", { class: "player__sep" }, " / ", -1),
						l(E(O(ta)(O(p).duration)), 1)
					]),
					r[17] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__favorite", { "is-on": T.value }]),
						"aria-label": T.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": T.value ? "true" : "false",
						onClick: k
					}, [u(J, { name: T.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Gd),
					u(ea, {
						level: D.value,
						onCycle: A
					}, null, 8, ["level"]),
					u(mo),
					u(Co),
					u(Po, {
						ref_key: "qualityMenuRef",
						ref: re,
						open: ie.value,
						"onUpdate:open": r[1] ||= (e) => ie.value = e,
						levels: O(W).levels.value,
						variants: O(W).variants.value,
						"current-level": O(W).currentLevel.value,
						"auto-enabled": O(W).autoEnabled.value,
						"active-height": O(W).activeLevelHeight.value,
						onSelect: Ce
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
						title: O(_)("player.qualityDirectStream")
					}, E(O(_)("player.directStream")), 9, Kd)),
					u(Ps, {
						open: lt.value,
						"onUpdate:open": r[2] ||= (e) => lt.value = e,
						tracks: ot.value,
						"audio-tracks": ht.value,
						"active-audio": gt.value,
						onSelectAudio: Mt,
						onAddSubtitles: r[3] ||= (e) => bt.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					u(ql, {
						open: _t.value,
						"onUpdate:open": r[4] ||= (e) => _t.value = e,
						chapters: t.chapters ?? [],
						onSeek: q
					}, null, 8, ["open", "chapters"]),
					u(ou, {
						ref_key: "sleepTimerRef",
						ref: te,
						"on-expire": on
					}, null, 512),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__syncplay", { "is-on": O(b).isInRoom }]),
						"aria-label": O(b).isInRoom ? O(_)("syncplay.inRoom") : O(_)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => oe.value = !0
					}, [u(J, { name: "user" })], 10, qd),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(_)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[6] ||= (e) => B.value = !0
					}, [u(J, { name: "info" })], 8, Jd),
					ee.value ? (x(), o("button", {
						key: 3,
						type: "button",
						class: g(["player__iconbtn", { "is-on": H.value }]),
						"aria-label": H.value ? O(_)("player.exitPip") : O(_)("player.pip"),
						"aria-pressed": H.value,
						onClick: dn
					}, [u(J, { name: "pip" })], 10, Yd)) : a("", !0),
					s("button", {
						type: "button",
						class: g(["player__iconbtn", { "is-on": V.value }]),
						"aria-label": V.value ? O(_)("player.exitTheater") : O(_)("player.theater"),
						"aria-pressed": V.value,
						onClick: cn
					}, [u(J, { name: "theater" })], 10, Xd),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": R.value ? O(_)("player.exitFullscreen") : O(_)("player.fullscreen"),
						onClick: ln
					}, [u(J, { name: R.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Zd)
				])
			])),
			xe.value ? a("", !0) : (x(), i(Ol, {
				key: 2,
				position: O(p).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: q
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			xe.value ? a("", !0) : (x(), i(Pl, {
				key: 3,
				position: O(p).position,
				markers: t.markers,
				onSkip: q
			}, null, 8, ["position", "markers"])),
			Oe.value && !xe.value ? (x(), i(Ic, {
				key: 4,
				seconds: De.value,
				onResume: Qe,
				onRestart: $e
			}, null, 8, ["seconds"])) : a("", !0),
			Ne.value && Ye.value && !xe.value ? (x(), i(gl, {
				key: 5,
				media: Ye.value,
				remaining: Pe.value,
				total: O(8),
				counting: O(m).autoplay,
				onPlayNow: rt,
				onCancel: it
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			u(Bs, {
				modelValue: Re.value,
				"onUpdate:modelValue": r[8] ||= (e) => Re.value = e,
				title: `Similar ${Ie.value ?? "marker"}s`,
				size: "lg",
				onClose: Je
			}, {
				default: P(() => [s("div", Qd, [Be.value ? (x(), o("div", $d, [u(Xs, { label: "Finding similar media" })])) : Ve.value ? (x(), o("div", ef, [u(J, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", tf, E(Ve.value), 1)])) : !Be.value && ze.value.length === 0 ? (x(), o("div", nf, [
					u(J, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[18] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[19] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (x(), o("ul", rf, [(x(!0), o(e, null, C(ze.value, (e) => (x(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", af, [e.poster_url ? (x(), o("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, of)) : (x(), o("div", sf, [u(J, { name: "film" })]))]), s("div", cf, [s("p", lf, E(e.name), 1), e.year ? (x(), o("p", uf, [l(E(e.year) + " ", 1), e.runtime ? (x(), o("span", df, " · " + E(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Se.value ? (x(), i(Dl, {
				key: 6,
				title: t.media.name,
				progress: O(W).progress.value,
				onBack: r[9] ||= (e) => d("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			G.value ? (x(), i(xl, {
				key: 7,
				title: t.media.name,
				onBack: r[10] ||= (e) => d("back")
			}, null, 8, ["title"])) : a("", !0),
			O(b).isInRoom ? (x(), i(Dd, {
				key: 8,
				position: O(p).position,
				duration: O(p).duration,
				"is-playing": O(p).playing,
				onSeek: q,
				onPlay: r[11] ||= (e) => void M.value?.play(),
				onPause: r[12] ||= (e) => void M.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			O(b).isInRoom ? (x(), i(Wu, { key: 9 })) : a("", !0),
			u(hd, {
				modelValue: oe.value,
				"onUpdate:modelValue": r[13] ||= (e) => oe.value = e
			}, null, 8, ["modelValue"]),
			u(lo, {
				open: B.value,
				onClose: r[14] ||= (e) => B.value = !1
			}, null, 8, ["open"]),
			u(bc, {
				open: bt.value,
				"onUpdate:open": r[15] ||= (e) => bt.value = e,
				"media-id": t.media.id,
				"api-base": t.apiBase ?? "",
				"preferred-langs": St.value,
				onAdded: Ct
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-c8efba03"]]), pf = ["aria-label"], mf = ["src", "poster"], hf = { class: "mini__body" }, gf = { class: "mini__title" }, _f = { class: "mini__controls" }, vf = ["aria-label"], yf = ["aria-label", "aria-pressed"], bf = ["aria-label"], xf = ["aria-label"], Sf = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Cf = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let c = t, l = le(), { t: d } = X(), p = S(null), m = S(null), h = f("resumeReporter", null), b = !1, C = Me(), w = f("phlixConfig", null), T = r(() => l.current ? C.isFavorite(l.current.id) : !1);
		function D() {
			let e = l.current?.id;
			e && C.toggleFavorite(e, w?.apiBase ?? "");
		}
		let k = r(() => l.miniPlayer && !!l.current && (!!l.streamUrl || !!l.hlsMasterUrl)), A = r(() => l.current?.name ?? ""), j = r(() => Math.max(0, Math.min(1, l.progress)));
		function M() {
			let e = p.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, l.position > 0 && (!e.duration || l.position < e.duration) && (e.currentTime = l.position), l.playing && e.play()?.catch(() => {}));
		}
		function F() {
			l.play();
		}
		function I() {
			l.pause();
		}
		function L() {
			let e = p.value;
			e && l.updateProgress(e.currentTime, e.duration);
		}
		function R() {
			b || (b = !0, h?.finish());
		}
		function z() {
			let e = p.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function B() {
			l.current && c("expand", l.current.id);
		}
		function V() {
			l.closePlayer();
		}
		async function H() {
			let e = p.value;
			!e || !l.hlsMasterUrl || (m.value?.destroy(), m.value = null, m.value = await ba(e, l.hlsMasterUrl, {
				startPosition: l.position,
				onReady: () => {
					let e = p.value;
					e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, l.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return N(() => k.value, async (e) => {
			if (!e) {
				m.value?.destroy(), m.value = null;
				return;
			}
			!l.hlsMasterUrl || l.streamUrl || await H();
		}), y(async () => {
			k.value && l.hlsMasterUrl && !l.streamUrl && await H();
		}), N(() => l.current?.id, () => {
			b = !1;
		}), N(() => l.playing, (e) => {
			let t = p.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), N(() => l.lastCommand, (e) => {
			let t = p.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : l.position + e.value, r = t.duration && t.duration > 0 ? t.duration : l.duration, i = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = i, l.updateProgress(i, t.duration || void 0);
		}), v(() => {
			m.value?.destroy(), m.value = null, p.value?.pause?.();
		}), (e, t) => (x(), i(n, { name: "mini" }, {
			default: P(() => [k.value ? (x(), o("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": O(d)("player.miniPlayer")
			}, [
				s("video", {
					ref_key: "videoRef",
					ref: p,
					class: "mini__video",
					src: O(l).hlsMasterUrl ? "" : O(l).streamUrl,
					poster: O(l).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: M,
					onPlay: F,
					onPause: I,
					onTimeupdate: L,
					onEnded: R,
					onClick: B
				}, null, 40, mf),
				s("div", hf, [s("p", gf, E(A.value), 1), s("div", _f, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(l).playing ? O(d)("player.pause") : O(d)("player.play"),
						onClick: z
					}, [u(J, { name: O(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, vf),
					O(l).current ? (x(), o("button", {
						key: 0,
						type: "button",
						class: g(["mini__btn mini__btn--favorite", { "is-on": T.value }]),
						"aria-label": T.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": T.value ? "true" : "false",
						onClick: D
					}, [u(J, { name: T.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, yf)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(d)("player.expand"),
						onClick: B
					}, [u(J, { name: "expand" })], 8, bf),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": O(d)("player.closePlayer"),
						onClick: V
					}, [u(J, { name: "x" })], 8, xf)
				])]),
				s("div", Sf, [s("div", {
					class: "mini__progress-fill",
					style: _({ transform: `scaleX(${j.value})` })
				}, null, 4)])
			], 8, pf)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-b5b19b19"]]);
//#endregion
export { Sc as AMBIENT_SAMPLE_H, Cc as AMBIENT_SAMPLE_INTERVAL_MS, xc as AMBIENT_SAMPLE_W, Ya as ARROW_ICONS, Xa as ARROW_LABELS, jc as AmbientCanvas, es as CAPTION_BACKGROUND_OPTIONS, $o as CAPTION_COLOR_OPTIONS, ts as CAPTION_EDGE_OPTIONS, Qo as CAPTION_SIZE_OPTIONS, Zo as CAPTION_SIZE_SCALE, as as CaptionOverlay, Ps as CaptionsMenu, Lc as DIRECT_PLAY_EXTENSIONS, Cf as MiniPlayer, Ja as PLAYER_SHORTCUTS, ff as Player, Po as QualityMenu, ie as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, Ic as ResumePrompt, da as Scrubber, lo as ShortcutsHelp, Ol as SkipButton, Co as SpeedMenu, bc as SubtitleSearch, Rc as TRANSCODE_EXTENSIONS, xl as TranscodeNotice, Dl as TranscodePreparing, Wc as UPNEXT_COUNTDOWN_SECONDS, Kc as UPNEXT_RING_CIRCUMFERENCE, Gc as UPNEXT_RING_RADIUS, gl as UpNext, mo as VolumeControl, Go as activeAudioIndex, kc as ambientGradient, Wo as applyAudioTrack, Uo as applyTrackModes, ba as attachHls, Tc as averageRegion, is as captionStyleVars, Yo as cleanCueText, rs as edgeShadow, Bc as extensionOf, ta as formatTime, $a as handleShortcut, Ho as hasActiveCaptions, Ac as isBatterySaving, Ma as isFailedStatus, Hc as isFatalMediaError, ga as isNativeHlsSupported, ja as isPlayable, Qa as isTypingTarget, Bo as listAudioTracks, zo as listSubtitleTracks, Vc as needsTranscode, Ta as parseSubtitleTracks, ka as parseTranscodeStart, Aa as parseTranscodeStatus, Xo as readActiveCueLines, Na as resolveStreamUrl, Vo as resolveTextTrack, Dc as rgbString, Oc as rgbaString, qc as ringDashoffset, Ec as sampleAmbient, Da as transcodeStartPath, Oa as transcodeStatusPath, Pa as useHlsTranscode, eo as useKeyboardShortcuts, le as usePlayerStore };

//# sourceMappingURL=player.js.map