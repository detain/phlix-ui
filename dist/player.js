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
		let e = localStorage.getItem(oe);
		return e ? JSON.parse(e) : {};
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
	function U() {
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
	function ge() {
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
		showMiniPlayer: U,
		hideMiniPlayer: de,
		closePlayer: fe,
		setMediaSessionMetadata: pe,
		setMediaPositionState: me,
		bindMediaSession: he,
		seedFromPreferences: ge
	};
}), U = class extends Error {
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
var he = "access_token", ge = "refresh_token", _e = "user", W = class {
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
		return this.storage.getItem(ge);
	}
	setRefreshToken(e) {
		this.storage.setItem(ge, e);
	}
	getUser() {
		let e = this.storage.getItem(_e);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(_e, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(he), this.storage.removeItem(ge), this.storage.removeItem(_e);
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
	} : new W();
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
function Ce(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function we(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? "Unknown Artist", r = Ce(t.album_count), i = Ce(t.track_count);
	return {
		id: n,
		name: n,
		imageUrl: G(t.image_url),
		albumCount: r ?? void 0,
		trackCount: i ?? void 0
	};
}
function Te(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = G(n.title) ?? G(t.name) ?? G(t.title) ?? "Unknown Track";
	return {
		id: G(t.id) ?? "",
		title: r,
		durationSecs: Ce(n.duration_secs) ?? Ce(t.duration_secs) ?? 0,
		trackNumber: Ce(n.track_number) ?? Ce(t.track_number),
		streamUrl: G(t.stream_url)
	};
}
function Ee(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? G(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [], i = Ce(t.track_count) ?? r.length;
	return {
		id: n,
		title: n,
		artist: G(t.artist),
		albumArtUrl: G(t.album_art_url),
		year: Ce(t.year),
		totalTracks: i,
		tracks: r.map(Te),
		tracksTruncated: Se(t.tracks_truncated)
	};
}
function De(e, t, n) {
	return {
		total: Ce(e.total) ?? t,
		limit: Ce(e.limit) ?? n.limit ?? 100,
		offset: Ce(e.offset) ?? n.offset ?? 0
	};
}
function Oe(e) {
	let t = {};
	return e.limit !== void 0 && (t.limit = String(e.limit)), e.offset !== void 0 && (t.offset = String(e.offset)), t;
}
function ke(e) {
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
var Ae = class {
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
			throw s ? new fe() : r?.aborted || e instanceof U ? e : e instanceof TypeError || me() ? new de() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new U(this.extractError(t), e.status, t);
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
		return this.post(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
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
		return Array.isArray(a.candidates) ? a.candidates.map(ke) : [];
	}
	downloadSubtitle(e, t) {
		return this.post(`/api/v1/media/${encodeURIComponent(e)}/subtitles/download`, t);
	}
	async listArtists(e = {}, t) {
		let n = Oe(e), r = await this.get("/api/v1/music/artists", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.artists) ? r.artists : [];
		return {
			artists: i.map(we),
			...De(r, i.length, e)
		};
	}
	async getArtist(e, t) {
		return we((await this.get(`/api/v1/music/artists/${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e = {}, t) {
		let n = Oe(e);
		e.artist !== void 0 && e.artist !== "" && (n.artist = e.artist);
		let r = await this.get("/api/v1/music/albums", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.albums) ? r.albums : [];
		return {
			albums: i.map(Ee),
			...De(r, i.length, e),
			artist: G(r.artist)
		};
	}
	async getAlbum(e, t, n) {
		let r = t !== void 0 && t !== "" ? { artist: t } : void 0;
		return Ee((await this.get(`/api/v1/music/albums/${encodeURIComponent(e)}`, r, n)).album);
	}
	async listTracks(e = {}, t) {
		let n = Oe(e), r = await this.get("/api/v1/music/tracks", Object.keys(n).length ? n : void 0, t), i = Array.isArray(r.tracks) ? r.tracks : [];
		return {
			tracks: i.map(Te),
			...De(r, i.length, e)
		};
	}
	async getTrack(e, t) {
		return Te((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = this.loginPath);
	}
};
new Ae();
//#endregion
//#region src/stores/useToastStore.ts
var je = R("phlix-toast", () => {
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
function Me(e) {
	return {
		...e,
		is_admin: Se(e.is_admin)
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
function Ne(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function Pe(e) {
	return {
		user_id: typeof e.user_id == "string" ? e.user_id : String(e.user_id ?? ""),
		bytes_in: Ne(e.bytes_in),
		bytes_out: Ne(e.bytes_out),
		quota_bytes_in: Ne(e.quota_bytes_in),
		quota_bytes_out: Ne(e.quota_bytes_out),
		max_concurrent_streams: Ne(e.max_concurrent_streams),
		throttle_bps: Ne(e.throttle_bps)
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
var Fe = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list(e) {
		let t = e?.status ? `?status=${encodeURIComponent(e.status)}` : "", { users: n } = await this.client.get(`/api/v1/admin/users${t}`);
		return Array.isArray(n) ? n.map(Me) : [];
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
		return Me(t);
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
		return Pe(await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}/bandwidth`) ?? {});
	}
	async setThrottle(e, t) {
		return Pe(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/throttle`, { throttle_bps: t }) ?? {});
	}
	async setQuota(e, t) {
		return Pe(await this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}/quota`, t) ?? {});
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
function Ie(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function Le() {
	let e = f("apiBase", "");
	return r(() => Ie(e));
}
function Re() {
	let e = f("mediaApiBase", void 0), t = f("apiBase", "");
	return r(() => Ie(e) || Ie(t));
}
//#endregion
//#region src/stores/useAuthStore.ts
function ze(e) {
	return typeof e == "string" ? e : e?.value ?? "/login";
}
var Be = R("auth", () => {
	let e = new W(), t = Le(), n = f("loginPath", "/login"), i = r(() => ze(n)), a = new Ae({
		tokenStore: e,
		baseUrl: t.value,
		loginPath: i.value
	});
	N(t, (e) => a.setBaseUrl(e));
	let o = S(null), s = S(!1), c = S(null), l = S(e.getAccessToken()), u = S(!1), d = null, p = r(() => l.value !== null), m = r(() => o.value?.is_admin === !0);
	function h(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), l.value = t;
	}
	async function g(e, t) {
		s.value = !0, c.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await a.post("/api/v1/auth/login", n);
			return h(r.access_token, r.refresh_token), await v(), p.value;
		} catch (e) {
			return c.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			s.value = !1;
		}
	}
	async function _(e, t, n) {
		s.value = !0, c.value = null;
		try {
			let r = await a.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return h(r.access_token, r.refresh_token), await v(), p.value;
		} catch (e) {
			return c.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			s.value = !1;
		}
	}
	async function v() {
		if (p.value) try {
			o.value = await a.getCurrentUser();
		} catch {
			o.value = null, e.clear(), l.value = null;
		}
	}
	async function y() {
		if (!u.value) return d === null && (d = v().finally(() => {
			u.value = !0;
		})), d;
	}
	function b() {
		a.logout(!1), l.value = null, o.value = null, typeof window < "u" && (window.location.href = i.value);
	}
	async function x(e) {
		s.value = !0, c.value = null;
		try {
			let t = await a.uploadAvatar(e);
			o.value && (o.value.avatar_url = t.avatar_url);
		} catch (e) {
			throw c.value = e instanceof Error ? e.message : "Avatar upload failed", e;
		} finally {
			s.value = !1;
		}
	}
	async function C() {
		s.value = !0, c.value = null;
		try {
			await a.deleteAvatar(), o.value && (o.value.avatar_url = null);
		} catch (e) {
			throw c.value = e instanceof Error ? e.message : "Avatar deletion failed", e;
		} finally {
			s.value = !1;
		}
	}
	return {
		user: o,
		loading: s,
		error: c,
		isLoggedIn: p,
		isAdmin: m,
		client: a,
		login: g,
		signup: _,
		setTokens: h,
		fetchUser: v,
		init: y,
		logout: b,
		uploadAvatar: x,
		deleteAvatar: C
	};
}), Ve = "phlix.active_profile", He = Ve;
function Ue(e) {
	return `${Ve}.${e}`;
}
function We(e) {
	if (typeof localStorage > "u" || e === null) return null;
	let t = localStorage.getItem(Ue(e));
	return typeof t == "string" && t !== "" ? t : null;
}
function Ge(e, t) {
	if (typeof localStorage > "u" || e === null) return;
	let n = Ue(e);
	t === null ? localStorage.removeItem(n) : localStorage.setItem(n, t);
}
function Ke() {
	typeof localStorage > "u" || localStorage.removeItem(He);
}
var qe = R("profile", () => {
	let e = Be(), t = Le();
	function n() {
		let t = e.user?.id;
		return typeof t == "string" && t !== "" ? t : null;
	}
	let i = n();
	Ke();
	let a = S([]), o = S(!1), s = S(!1), c = S(null), l = S(We(i)), u = S(null), d = S(!1), f = S(!1), p = S(0), m = null;
	function h(e) {
		return m ? m.setBaseUrl(e) : m = new Ae({ baseUrl: e }), new Fe(m);
	}
	let g = r(() => a.value.length > 1), _ = r(() => a.value.find((e) => e.id === l.value) ?? null), v = r(() => s.value && a.value.length > 1 && !d.value), y = r(() => l.value ?? "account");
	async function b(e = !1) {
		if (!o.value && !(s.value && !e)) {
			o.value = !0, c.value = null;
			try {
				let e = await h(t.value).listOwnProfiles();
				a.value = e, s.value = !0;
				let n = e.find((e) => e.is_active)?.id ?? null;
				n !== null && n !== l.value && (l.value = n, Ge(i, n));
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
			return e.setTokens(r.access_token, r.refresh_token), r.user && typeof r.user == "object" && (e.user = r.user), l.value = r.profile_id ?? n, Ge(i, l.value), d.value = !0, f.value = !1, a.value = a.value.map((e) => ({
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
			return n && (l.value = null, Ge(i, null)), await b(!0), n && l.value !== null && (p.value += 1), !0;
		} catch (e) {
			return c.value = pe(e, "Could not delete the profile."), !1;
		}
	}
	function k() {
		a.value = [], o.value = !1, s.value = !1, c.value = null, u.value = null, d.value = !1, f.value = !1, l.value = null, Ge(i, null);
	}
	return N(l, (e, t) => {
		t !== null && e !== t && (p.value += 1);
	}), N(() => e.isLoggedIn, (e) => {
		e || k();
	}), N(n, (e, t) => {
		e !== null && e !== t && (i = e, l.value === null && (l.value = We(e)));
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
}), Je = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), Ye = R("user-item-data", () => {
	let e = S(/* @__PURE__ */ new Map()), t = qe();
	N(() => t.epoch, () => {
		e.value = /* @__PURE__ */ new Map();
	});
	let n = null;
	function r(e) {
		return n ? n.setBaseUrl(e) : n = new Ae({ baseUrl: e }), n;
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
		return e.value.get(t) ?? { ...Je };
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
		let r = e.value.get(t) ?? { ...Je };
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
			je().error(`Failed to ${r} favorites: ${pe(t)}`);
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
			je().error(`Failed to mark ${r}: ${pe(t)}`);
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
			l(e, { like_level: o }), je().error(`Failed to set rating: ${pe(t)}`);
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
}), Xe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ze(e, t) {
	return x(), o("svg", Xe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var Qe = p({
	name: "lucide-play",
	render: Ze
}), $e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function et(e, t) {
	return x(), o("svg", $e, [...t[0] ||= [s("g", {
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
var tt = p({
	name: "lucide-pause",
	render: et
}), nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rt(e, t) {
	return x(), o("svg", nt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var it = p({
	name: "lucide-skip-back",
	render: rt
}), at = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ot(e, t) {
	return x(), o("svg", at, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var st = p({
	name: "lucide-skip-forward",
	render: ot
}), ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lt(e, t) {
	return x(), o("svg", ct, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var ut = p({
	name: "lucide-rotate-ccw",
	render: lt
}), dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ft(e, t) {
	return x(), o("svg", dt, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var pt = p({
	name: "lucide-rotate-cw",
	render: ft
}), mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ht(e, t) {
	return x(), o("svg", mt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var gt = p({
	name: "lucide-volume-2",
	render: ht
}), _t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vt(e, t) {
	return x(), o("svg", _t, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var yt = p({
	name: "lucide-volume-1",
	render: vt
}), bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xt(e, t) {
	return x(), o("svg", bt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var St = p({
	name: "lucide-volume-x",
	render: xt
}), Ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wt(e, t) {
	return x(), o("svg", Ct, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), s("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var Tt = p({
	name: "lucide-shuffle",
	render: wt
}), Et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dt(e, t) {
	return x(), o("svg", Et, [...t[0] ||= [s("g", {
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
var Ot = p({
	name: "lucide-repeat",
	render: Dt
}), kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function At(e, t) {
	return x(), o("svg", kt, [...t[0] ||= [s("g", {
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
var jt = p({
	name: "lucide-repeat-1",
	render: At
}), Mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nt(e, t) {
	return x(), o("svg", Mt, [...t[0] ||= [s("g", {
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
var Pt = p({
	name: "lucide-list-music",
	render: Nt
}), Ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function It(e, t) {
	return x(), o("svg", Ft, [...t[0] ||= [s("g", {
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
var Lt = p({
	name: "lucide-captions",
	render: It
}), Rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zt(e, t) {
	return x(), o("svg", Rt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var Bt = p({
	name: "lucide-captions-off",
	render: zt
}), Vt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ht(e, t) {
	return x(), o("svg", Vt, [...t[0] ||= [s("g", {
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
var Ut = p({
	name: "lucide-picture-in-picture-2",
	render: Ht
}), Wt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gt(e, t) {
	return x(), o("svg", Wt, [...t[0] ||= [s("rect", {
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
var Kt = p({
	name: "lucide-rectangle-horizontal",
	render: Gt
}), qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jt(e, t) {
	return x(), o("svg", qt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var Yt = p({
	name: "lucide-maximize",
	render: Jt
}), Xt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zt(e, t) {
	return x(), o("svg", Xt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var Qt = p({
	name: "lucide-minimize",
	render: Zt
}), $t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function en(e, t) {
	return x(), o("svg", $t, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var K = p({
	name: "lucide-maximize-2",
	render: en
}), tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nn(e, t) {
	return x(), o("svg", tn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var rn = p({
	name: "lucide-cast",
	render: nn
}), an = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function on(e, t) {
	return x(), o("svg", an, [...t[0] ||= [s("g", {
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
var sn = p({
	name: "lucide-settings",
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
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var un = p({
	name: "lucide-gauge",
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
	}, [s("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), s("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var pn = p({
	name: "lucide-film",
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
var gn = p({
	name: "lucide-image",
	render: hn
}), _n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vn(e, t) {
	return x(), o("svg", _n, [...t[0] ||= [s("g", {
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
var yn = p({
	name: "lucide-music",
	render: vn
}), bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xn(e, t) {
	return x(), o("svg", bn, [...t[0] ||= [s("g", {
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
var Sn = p({
	name: "lucide-tv",
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
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var Tn = p({
	name: "lucide-book",
	render: wn
}), En = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dn(e, t) {
	return x(), o("svg", En, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var On = p({
	name: "lucide-headphones",
	render: Dn
}), kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function An(e, t) {
	return x(), o("svg", kn, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var jn = p({
	name: "lucide-disc-3",
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
		s("path", { d: "m11 7.601l-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" }),
		s("path", { d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2s-2.775-3.369-1.5-4.5" }),
		s("circle", {
			cx: "16",
			cy: "7",
			r: "5"
		})
	], -1)]]);
}
var Pn = p({
	name: "lucide-mic-2",
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
	}, [s("path", { d: "m16 13l5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }), s("rect", {
		width: "14",
		height: "12",
		x: "2",
		y: "6",
		rx: "2"
	})], -1)]]);
}
var Ln = p({
	name: "lucide-video",
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
	}, [s("path", { d: "m21 21l-4.34-4.34" }), s("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var Bn = p({
	name: "lucide-search",
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
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Un = p({
	name: "lucide-sliders-horizontal",
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
var Kn = p({
	name: "lucide-calendar",
	render: Gn
}), qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jn(e, t) {
	return x(), o("svg", qn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Yn = p({
	name: "lucide-arrow-up-down",
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
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var Qn = p({
	name: "lucide-star",
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
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var tr = p({
	name: "lucide-list",
	render: er
}), nr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rr(e, t) {
	return x(), o("svg", nr, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"></rect></g>", 1)]]);
}
var ir = p({
	name: "lucide-layout-grid",
	render: rr
}), ar = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function or(e, t) {
	return x(), o("svg", ar, [...t[0] ||= [s("g", {
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
var sr = p({
	name: "lucide-gallery-horizontal",
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
var ur = p({
	name: "lucide-table",
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
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var pr = p({
	name: "lucide-plus",
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
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var gr = p({
	name: "lucide-info",
	render: hr
}), _r = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vr(e, t) {
	return x(), o("svg", _r, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var yr = p({
	name: "lucide-x",
	render: vr
}), br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xr(e, t) {
	return x(), o("svg", br, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var Sr = p({
	name: "lucide-check",
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
	}, [s("rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2"
	}), s("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })], -1)]]);
}
var Tr = p({
	name: "lucide-lock",
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
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Or = p({
	name: "lucide-bookmark",
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
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var jr = p({
	name: "lucide-bookmark-plus",
	render: Ar
}), Mr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nr(e, t) {
	return x(), o("svg", Mr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Pr = p({
	name: "lucide-heart",
	render: Nr
}), Fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ir(e, t) {
	return x(), o("svg", Fr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var Lr = p({
	name: "lucide-thumbs-up",
	render: Ir
}), Rr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zr(e, t) {
	return x(), o("svg", Rr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var Br = p({
	name: "lucide-thumbs-down",
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
	}, [s("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), s("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Ur = p({
	name: "lucide-user",
	render: Hr
}), Wr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gr(e, t) {
	return x(), o("svg", Wr, [...t[0] ||= [s("g", {
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
var Kr = p({
	name: "lucide-users",
	render: Gr
}), qr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jr(e, t) {
	return x(), o("svg", qr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Yr = p({
	name: "lucide-log-out",
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
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Qr = p({
	name: "lucide-menu",
	render: Zr
}), $r = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ei(e, t) {
	return x(), o("svg", $r, [...t[0] ||= [s("g", {
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
var ti = p({
	name: "lucide-more-horizontal",
	render: ei
}), ni = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ri(e, t) {
	return x(), o("svg", ni, [...t[0] ||= [s("g", {
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
var ii = p({
	name: "lucide-eye",
	render: ri
}), ai = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oi(e, t) {
	return x(), o("svg", ai, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var si = p({
	name: "lucide-eye-off",
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
	}, [s("path", { d: "m15.5 7.5l2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4m2-2l-9.6 9.6" }), s("circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5"
	})], -1)]]);
}
var ui = p({
	name: "lucide-key",
	render: li
}), di = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fi(e, t) {
	return x(), o("svg", di, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var pi = p({
	name: "lucide-trash",
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
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var gi = p({
	name: "lucide-arrow-left",
	render: hi
}), _i = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vi(e, t) {
	return x(), o("svg", _i, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var yi = p({
	name: "lucide-arrow-right",
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
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var Si = p({
	name: "lucide-arrow-up",
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
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var Ti = p({
	name: "lucide-arrow-down",
	render: wi
}), Ei = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Di(e, t) {
	return x(), o("svg", Ei, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var Oi = p({
	name: "lucide-chevron-down",
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
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var ji = p({
	name: "lucide-chevron-up",
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
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Pi = p({
	name: "lucide-chevron-left",
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
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Li = p({
	name: "lucide-chevron-right",
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
		d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
	}, null, -1)]]);
}
var Bi = p({
	name: "lucide-chevrons-left",
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
		d: "m6 17l5-5l-5-5m7 10l5-5l-5-5"
	}, null, -1)]]);
}
var Ui = p({
	name: "lucide-chevrons-right",
	render: Hi
}), Wi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gi(e, t) {
	return x(), o("svg", Wi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Ki = p({
	name: "lucide-loader-circle",
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
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), s("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var Yi = p({
	name: "lucide-circle-alert",
	render: Ji
}), Xi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zi(e, t) {
	return x(), o("svg", Xi, [...t[0] ||= [s("g", {
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
var Qi = p({
	name: "lucide-circle-check",
	render: Zi
}), $i = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ea(e, t) {
	return x(), o("svg", $i, [...t[0] ||= [s("g", {
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
var ta = p({
	name: "lucide-circle-x",
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
	}, [s("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), s("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var ia = p({
	name: "lucide-sun",
	render: ra
}), aa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oa(e, t) {
	return x(), o("svg", aa, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var sa = p({
	name: "lucide-moon",
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
	}, [s("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), s("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var ua = p({
	name: "lucide-monitor",
	render: la
}), da = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fa(e, t) {
	return x(), o("svg", da, [...t[0] ||= [s("path", {
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
var pa = {
	play: Qe,
	pause: tt,
	"skip-back": it,
	"skip-forward": st,
	rewind: ut,
	forward: pt,
	volume: gt,
	"volume-low": yt,
	mute: St,
	shuffle: Tt,
	repeat: Ot,
	"repeat-1": jt,
	"list-music": Pt,
	captions: Lt,
	"captions-off": Bt,
	pip: Ut,
	theater: Kt,
	fullscreen: Yt,
	"fullscreen-exit": Qt,
	expand: K,
	cast: rn,
	settings: sn,
	speed: un,
	film: pn,
	image: gn,
	music: yn,
	tv: Sn,
	book: Tn,
	headphones: On,
	disc: jn,
	mic: Pn,
	video: Ln,
	search: Bn,
	filter: Un,
	calendar: Kn,
	sort: Yn,
	star: Qn,
	list: tr,
	grid: ir,
	backdrop: sr,
	table: ur,
	plus: pr,
	info: gr,
	x: yr,
	check: Sr,
	lock: Tr,
	bookmark: Or,
	"bookmark-plus": jr,
	heart: Pr,
	"thumbs-up": Lr,
	"thumbs-down": Br,
	user: Ur,
	users: Kr,
	"log-out": Yr,
	menu: Qr,
	more: ti,
	eye: ii,
	"eye-off": si,
	refresh: pt,
	key: ui,
	trash: pi,
	"arrow-left": gi,
	"arrow-right": yi,
	"arrow-up": Si,
	"arrow-down": Ti,
	"chevron-down": Oi,
	"chevron-up": ji,
	"chevron-left": Pi,
	"chevron-right": Li,
	"chevrons-left": Bi,
	"chevrons-right": Ui,
	spinner: Ki,
	alert: Yi,
	"alert-circle": Yi,
	success: Qi,
	error: ta,
	sun: ia,
	moon: sa,
	monitor: ua,
	"external-link": p({
		name: "lucide-external-link",
		render: fa
	})
};
Object.keys(pa);
//#endregion
//#region src/components/Icon.vue
var q = /* @__PURE__ */ d({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = e, n = r(() => pa[t.name]), a = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
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
}), ma = ["id"], ha = 8, ga = /*@__PURE__*/ d({
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
			let a = n.getBoundingClientRect(), o = a.right - (i.right - ha), l = i.left + ha - a.left, u = 0;
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
			}, [w(t.$slots, "content", {}, () => [l(E(e.text), 1)], !0)], 10, ma)) : a("", !0)]),
			_: 3
		})], 544));
	}
}), J = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, _a = /*#__PURE__*/ J(ga, [["__scopeId", "data-v-83b83959"]]), va = ["data-level"], ya = ["disabled", "aria-pressed"], ba = ["disabled", "aria-pressed"], xa = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		}, [d.value ? (x(), i(_a, {
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
			}, [u(q, {
				name: "thumbs-up",
				class: "thumb-rating__icon"
			})], 10, ya)]),
			_: 1
		})) : a("", !0), f.value ? (x(), i(_a, {
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
			}, [u(q, {
				name: "thumbs-down",
				class: "thumb-rating__icon"
			})], 10, ba)]),
			_: 1
		})) : a("", !0)], 8, va));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
//#endregion
//#region src/components/player/format-time.ts
function Sa(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/utils/plural.ts
var Ca = [
	"zero",
	"one",
	"two",
	"few",
	"many",
	"other"
], wa = /* @__PURE__ */ new Map(), Ta = "\0";
function Ea(e) {
	let t = e?.locale, n = e?.type ?? "cardinal", r = `${t ?? ""}${Ta}${n}`, i = wa.get(r);
	return i || (i = new Intl.PluralRules(t, { type: n }), wa.set(r, i)), i;
}
function Da(e, t) {
	return Number.isFinite(e) ? Ea(t).select(e) : "other";
}
function Oa(e, t, n) {
	let r = t[Da(e, n)];
	return r === void 0 ? t.other : r;
}
function ka(e, t, n) {
	if (!e.includes("|")) return e;
	let r = e.split("|").map((e) => e.trim());
	if (r.length === 1) return r[0];
	let i = Ea(n), a = new Set(i.resolvedOptions().pluralCategories), o = Ca.filter((e) => a.has(e)), s = {};
	return o.forEach((e, t) => {
		s[e] = r[Math.min(t, r.length - 1)];
	}), Oa(t, {
		...s,
		other: s.other ?? r[r.length - 1]
	}, n);
}
function Aa(e) {
	return e.includes("|");
}
//#endregion
//#region src/i18n/messages.ts
var ja = {
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
		signIn: "Sign in",
		switchProfile: "Switch Profile",
		manageProfiles: "Manage Profiles"
	},
	profiles: {
		whoIsWatching: "Who's watching?",
		loading: "Loading profiles…",
		active: "Active",
		manageTitle: "Manage Profiles",
		manageHint: "Pick a profile to switch to it, or rename and delete the ones you have.",
		use: "Switch to",
		add: "Add profile",
		rename: "Rename",
		renameTooShort: "Profile names need at least 3 characters.",
		delete: "Delete",
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
}, Ma = /\{(\w+)\}/g;
function Na(e) {
	let t = {};
	for (let n of Object.keys(ja)) {
		let r = ja[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function Pa(e, t) {
	return t ? e.replace(Ma, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function Fa(e) {
	let t = Na(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? Pa(Ia(s, n), n) : e;
	};
}
function Ia(e, t) {
	if (!Aa(e)) return e;
	let n = t?.count, r = typeof n == "number" ? n : Number(n);
	if (!Number.isFinite(r)) {
		let t = e.split("|");
		return t[t.length - 1].trim();
	}
	return ka(e, r);
}
//#endregion
//#region src/composables/useMessages.ts
function Y() {
	return { t: Fa(f("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var La = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Ra = { class: "scrubber__track" }, za = ["title"], Ba = { class: "scrubber__time numeric" }, Va = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let { t: c } = Y(), l = t, u = i, d = S(null), f = S(!1), p = S(!1), m = S(0), h = S(0), v = (e) => Math.min(1, Math.max(0, e)), y = r(() => f.value ? m.value : l.duration > 0 ? v(l.position / l.duration) : 0), b = r(() => l.duration > 0 ? v(l.buffered / l.duration) : 0), w = r(() => (f.value || p.value) && l.duration > 0), T = r(() => f.value ? m.value : h.value), D = r(() => T.value * l.duration), k = r(() => w.value ? l.thumbnailAt?.(D.value) ?? null : null), A = r(() => k.value ? `url("${k.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), j = r(() => `${Math.min(96, Math.max(4, T.value * 100))}%`), M = r(() => l.duration > 0 ? l.chapters.filter((e) => e.start > 0 && e.start < l.duration).map((e) => ({
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
			"aria-valuetext": O(Sa)(t.position),
			"aria-label": O(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", Ra, [
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
			}, null, 12, za))), 128)),
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
		}, null, 4)) : a("", !0), s("span", Ba, E(O(Sa)(D.value)), 1)], 4)) : a("", !0)], 40, La));
	}
}), [["__scopeId", "data-v-3d610715"]]), Ha = "phlix-bandwidth-estimate";
function Ua(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function Wa() {
	try {
		let e = localStorage.getItem(Ha);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? Ua(t) : 0;
	} catch {
		return 0;
	}
}
function Ga(e) {
	try {
		localStorage.setItem(Ha, String(e));
	} catch {}
}
function Ka(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var qa = null, Ja = null;
function Ya() {
	qa && Ga(qa.bandwidthEstimate);
}
async function Xa(e, t, n = {}) {
	if (typeof MediaSource > "u" && Ka(e)) {
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
		let i = Wa(), a = new r({
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
		}), qa = a, Ja !== null && clearInterval(Ja), Ja = setInterval(Ya, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				Ga(a.bandwidthEstimate), Ja !== null && (clearInterval(Ja), Ja = null), qa = null;
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
var Za = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Qa(e, t = "") {
	return typeof e == "string" ? e : t;
}
function $a(e) {
	return e === !0 || e === "true" || e === 1;
}
function eo(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function to(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Qa(e.url ?? e.src);
		r !== "" && t.push({
			index: eo(e.index),
			language: Qa(e.language ?? e.lang ?? e.srclang),
			label: Qa(e.label),
			default: $a(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function no(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = eo(e.height);
		r <= 0 || t.push({
			id: Qa(e.id),
			label: Qa(e.label),
			height: r,
			width: eo(e.width),
			bitrate: eo(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function ro(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function io(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function ao(e) {
	let t = e ?? {};
	return {
		jobId: Qa(t.job_id ?? t.jobId),
		masterUrl: Qa(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Qa(t.status, "running"),
		reused: $a(t.reused),
		subtitles: to(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: no(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function oo(e) {
	let t = e ?? {};
	return {
		jobId: Qa(t.job_id ?? t.jobId),
		status: Qa(t.status, "running"),
		playlistReady: $a(t.playlist_ready ?? t.playlistReady),
		progress: eo(t.progress),
		masterUrl: Qa(t.master_url ?? t.masterUrl),
		subtitles: to(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: no(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function so(e) {
	return e.playlistReady || e.status === "completed";
}
function co(e) {
	return Za.has(e);
}
function lo(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function uo(e) {
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
			url: lo(n, e.url)
		}));
	}
	let y = e.attach ?? Xa, b = e.pollIntervalMs ?? 1e3, x = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(x / Math.max(1, b))), T = fo(), E = e.getToken ?? (() => po(T)), D = null, O = null, k = null, A = !1, j = null;
	function M() {
		return e.client ?? new Ae({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function N(i, a, o, s) {
		R(), A = !1, j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = M(), c = ao(await r.post(ro(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = lo(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < w; e++) {
				let e = oo(await r.get(io(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), co(e.status)) throw Error(`transcode ${e.status}`);
				if (so(e)) {
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
				let e = ue();
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
function fo() {
	try {
		return new W();
	} catch {
		return null;
	}
}
function po(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var mo = 10;
function ho(e) {
	let t = S(null), n = S(!1), r = S(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new Ae({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % mo, s = Math.floor(i / mo), c = a / 9 * 100, l = s / 5 * 100;
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
var go = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], _o = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		}, [u(q, {
			name: e.loading ? "spinner" : e.name,
			class: g({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, go));
	}
}), [["__scopeId", "data-v-48bb9819"]]), vo = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), yo = 0, bo = "";
function xo() {
	yo === 0 && (bo = document.body.style.overflow, document.body.style.overflow = "hidden"), yo++;
}
function So() {
	yo !== 0 && (yo--, yo === 0 && (document.body.style.overflow = bo));
}
function Co(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(vo)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		i = document.activeElement, e.value?.setAttribute("data-focus-trap", ""), r && (xo(), a = !0), document.addEventListener("keydown", s, !0), h(() => {
			e.value?.setAttribute("data-focus-trap", ""), (o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (So(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	N(t, (e) => e ? c() : l(), { immediate: !0 }), v(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (So(), !1);
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var wo = [
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
], To = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Eo = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Do(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Oo(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function ko(e, t) {
	switch (e.key) {
		case " ": return !Do(e.target) && (t.playPause(), !0);
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
function Ao(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Oo(n.target) || ko(n, e) && n.preventDefault();
	}
	y(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), v(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var jo = ["aria-label"], Mo = { class: "shortcuts__head" }, No = { class: "shortcuts__title" }, Po = { class: "shortcuts__grid" }, Fo = { class: "shortcuts__keys" }, Io = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Lo = {
	key: 1,
	class: "shortcuts__key"
}, Ro = { class: "shortcuts__label" }, zo = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => wo }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, c = n, { t: d } = Y(), f = S(null);
		return Co(f, D(r, "open"), {
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
		}, [s("div", Mo, [s("h3", No, E(O(d)("player.keyboard")), 1), u(_o, {
			name: "x",
			label: O(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => c("close")
		}, null, 8, ["label"])]), s("ul", Po, [(x(!0), o(e, null, C(t.shortcuts, (t) => (x(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", Fo, [(x(!0), o(e, null, C(t.keys, (t, n) => (x(), o(e, { key: n }, [t === "–" ? (x(), o("span", Io, "–")) : (x(), o("kbd", Lo, [O(To)[t] ? (x(), i(q, {
			key: 0,
			name: O(To)[t],
			label: O(Eo)[t] ?? t
		}, null, 8, ["name", "label"])) : (x(), o(e, { key: 1 }, [l(E(t), 1)], 64))]))], 64))), 128))]), s("span", Ro, E(t.label), 1)]))), 128))])], 8, jo)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Bo = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], Vo = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		}, null, 4)], 544)], 42, Bo));
	}
}), [["__scopeId", "data-v-644a7ce9"]]), Ho = { class: "volume" }, Uo = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "VolumeControl",
	setup(e) {
		let t = ue(), n = ne(), { t: i } = Y(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return N(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (x(), o("div", Ho, [u(_o, {
			name: s.value,
			label: O(t).muted ? O(i)("player.unmute") : O(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => O(t).toggleMute()
		}, null, 8, ["name", "label"]), u(Vo, {
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
function Wo(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function Go(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function Ko(e, t) {
	return t === "first" ? Go(e, -1, 1) : Go(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var qo = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], Jo = ["id", "aria-label"], Yo = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Xo = { class: "phlix-select__check" }, Zo = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let d = t, { t: f } = Y(), p = c, m = r(() => Wo(d.options)), _ = k(), y = S(!1), b = S(-1), w = S(null), T = S(null);
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
			d.disabled || y.value || (ee(), y.value = !0, b.value = L.value >= 0 ? L.value : Ko(m.value, "first"), h(re));
		}
		function H() {
			y.value = !1;
		}
		function te(e) {
			let t = m.value[e];
			!t || t.disabled || (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), H(), w.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function ne(e) {
			b.value = Go(m.value, b.value, e), h(re);
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
					y.value && (e.preventDefault(), b.value = Ko(m.value, "first"), h(re));
					break;
				case "End":
					y.value && (e.preventDefault(), b.value = Ko(m.value, "last"), h(re));
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
		}, [s("span", { class: g(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, E(L.value >= 0 ? R.value : t.placeholder ?? O(f)("common.selectPlaceholder")), 3), u(q, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, qo), F(s("ul", {
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
		}, [s("span", Xo, [e.value === t.modelValue ? (x(), i(q, {
			key: 0,
			name: "check"
		})) : a("", !0)]), l(" " + E(e.label), 1)], 42, Yo))), 128))], 10, Jo), [[M, y.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]), Qo = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		], n = ue(), { t: a } = Y(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (x(), i(Zo, {
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
}), [["__scopeId", "data-v-4530b308"]]), $o = "auto", es = "original";
function ts(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function ns(e) {
	return e >= 2160 ? "4K" : ts(e);
}
function rs(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = ts(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: ns(r.height)
		}));
	}
	return n;
}
function is(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) ts(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function as(e, t) {
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
function os(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function ss(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && as(e, n) >= 0;
}
function cs(e, t) {
	if (t < 0) return $o;
	let n = e.find((e) => e.index === t);
	return n ? ts(n.height) : $o;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var ls = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let u = n, d = ue(), f = ne(), { t: p } = Y(), m = r(() => rs(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = ts(r.height);
				e.has(i) || n && is(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: ns(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => as(o.levels, _.value)), y = r(() => _.value && v.value >= 0 ? {
			value: es,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), b = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: ns(o.activeHeight) })), w = r(() => [
			{
				value: $o,
				label: C.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? $o : y.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? es : cs(o.levels, o.currentLevel));
		function E(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : is(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => b.value || s.value ? (x(), i(Zo, {
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
function us(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function ds(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function fs(e, t) {
	return e.language || e.label || `track-${t}`;
}
function ps(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function ms(e) {
	return e ? us(e.textTracks).filter(ds).map((e, t) => ({
		index: t,
		language: fs(e, t),
		label: e.label || ps(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function hs(e) {
	let t = e?.audioTracks;
	return us(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || ps(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function gs(e, t) {
	return !e || t == null ? null : us(e.textTracks).filter(ds).find((e, n) => fs(e, n) === t) ?? null;
}
function _s(e, t) {
	return gs(e, t) != null;
}
function vs(e, t) {
	e && us(e.textTracks).filter(ds).forEach((e, n) => {
		try {
			e.mode = fs(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function ys(e, t) {
	let n = e?.audioTracks;
	us(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function bs(e) {
	let t = e?.audioTracks;
	return us(t).findIndex((e) => e.enabled);
}
var xs = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function Ss(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Cs(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && Ss(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(xs, n) ? xs[n] : e;
	});
}
function ws(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Cs(e).trim()).filter((e) => e.length > 0) : [];
}
function Ts(e) {
	if (!e) return [];
	let t = us(e.activeCues), n = [];
	for (let e of t) n.push(...ws(e.text));
	return n;
}
var Es = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Ds = [
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
], Os = [
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
], ks = [
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
], As = [
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
function js(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function Ms(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Ns(e) {
	return {
		"--cap-scale": String(Es[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": js(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": Ms(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var Ps = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(t, { expose: n }) {
		let i = t, s = S([]), c = r(() => Ns(i.styleConfig)), l = null, u = null, d = null;
		function f() {
			s.value = Ts(l);
		}
		function p() {
			d != null && (clearTimeout(d), d = null);
		}
		function m() {
			p(), d = setTimeout(() => {
				if (d = null, !l) return;
				vs(i.video, i.language);
				let e = Ts(l);
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
			h(), vs(i.video, i.language);
			let e = gs(i.video, i.language);
			if (e) {
				if (l = e, e.addEventListener("cuechange", f), s.value = Ts(e), !s.value.length) {
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
}), [["__scopeId", "data-v-b9f35f44"]]), Fs = ["aria-label", "aria-expanded"], Is = ["aria-label"], Ls = { class: "capmenu__head" }, Rs = { class: "capmenu__title" }, zs = ["aria-label"], Bs = ["aria-checked", "tabindex"], Vs = { class: "capmenu__check" }, Hs = { class: "capmenu__optlabel" }, Us = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ws = { class: "capmenu__check" }, Gs = { class: "capmenu__optlabel" }, Ks = { class: "capmenu__check" }, qs = { class: "capmenu__optlabel" }, Js = { class: "capmenu__title capmenu__title--sub" }, Ys = ["aria-label"], Xs = [
	"aria-checked",
	"tabindex",
	"onClick"
], Zs = { class: "capmenu__check" }, Qs = { class: "capmenu__optlabel" }, $s = { class: "capmenu__title capmenu__title--sub" }, ec = { class: "capmenu__style" }, tc = { class: "capmenu__field" }, nc = { class: "capmenu__fieldlabel" }, rc = { class: "capmenu__field" }, ic = { class: "capmenu__fieldlabel" }, ac = { class: "capmenu__field" }, oc = { class: "capmenu__fieldlabel" }, sc = { class: "capmenu__field" }, cc = { class: "capmenu__fieldlabel" }, lc = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let c = t, l = n, d = ue(), f = ne(), { t: p } = Y(), m = S(null), h = S(null), _ = r(() => d.subtitleLang), y = r(() => c.tracks.some((e) => e.language === _.value)), b = r(() => y.value ? "captions" : "captions-off"), w = r(() => y.value ? c.tracks.findIndex((e) => e.language === _.value) + 1 : 0), T = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
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
		Co(h, D(c, "open"), {
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
		}, [u(q, { name: b.value }, null, 8, ["name"])], 10, Fs), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", Ls, [s("h3", Rs, E(O(p)("player.subtitles")), 1), u(_o, {
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
			}, [s("span", Vs, [y.value ? a("", !0) : (x(), i(q, {
				key: 0,
				name: "check"
			}))]), s("span", Hs, E(O(p)("player.off")), 1)], 8, Bs), (x(!0), o(e, null, C(t.tracks, (e, t) => (x(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: w.value === t + 1 ? 0 : -1,
				onClick: (t) => j(e.language)
			}, [s("span", Ws, [_.value === e.language ? (x(), i(q, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", Gs, E(e.label), 1)], 8, Us))), 128))], 40, zs),
			s("button", {
				type: "button",
				class: "capmenu__add",
				onClick: P
			}, [s("span", Ks, [u(q, { name: "plus" })]), s("span", qs, E(O(p)("player.addSubtitles")), 1)]),
			t.audioTracks.length > 1 ? (x(), o(e, { key: 0 }, [s("h3", Js, E(O(p)("player.audio")), 1), s("div", {
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
			}, [s("span", Zs, [t.activeAudio === e.index ? (x(), i(q, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", Qs, E(e.label), 1)], 8, Xs))), 128))], 40, Ys)], 64)) : a("", !0),
			s("h3", $s, E(O(p)("player.captionStyle")), 1),
			s("div", ec, [
				s("div", tc, [s("span", nc, E(O(p)("player.size")), 1), u(Zo, {
					"model-value": O(f).captionStyle.size,
					options: O(Ds),
					label: O(p)("player.captionSize"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", rc, [s("span", ic, E(O(p)("player.color")), 1), u(Zo, {
					"model-value": O(f).captionStyle.textColor,
					options: O(Os),
					label: O(p)("player.captionColor"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", ac, [s("span", oc, E(O(p)("player.background")), 1), u(Zo, {
					"model-value": O(f).captionStyle.background,
					options: O(ks),
					label: O(p)("player.captionBackground"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", sc, [s("span", cc, E(O(p)("player.edge")), 1), u(Zo, {
					"model-value": O(f).captionStyle.edge,
					options: O(As),
					label: O(p)("player.captionEdge"),
					"onUpdate:modelValue": ee
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Is)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-f1a6d5fb"]]), uc = ["aria-labelledby"], dc = {
	key: 0,
	class: "phlix-modal__header"
}, fc = ["id"], pc = { class: "phlix-modal__body" }, mc = {
	key: 1,
	class: "phlix-modal__footer"
}, hc = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let { t: c } = Y(), l = e, d = r, f = S(l.modelValue);
		N(() => l.modelValue, (e) => f.value = e);
		let p = S(null), m = k();
		function h() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			l.dismissible && h();
		}
		return Co(p, f, { onEscape: () => l.dismissible ? (h(), !0) : !1 }), (r, l) => (x(), i(t, { to: "body" }, [u(n, { name: "phlix-modal" }, {
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
				e.title || !e.hideClose ? (x(), o("header", dc, [e.title ? (x(), o("h2", {
					key: 0,
					id: O(m),
					class: "phlix-modal__title"
				}, E(e.title), 9, fc)) : a("", !0), e.hideClose ? a("", !0) : (x(), i(_o, {
					key: 1,
					name: "x",
					label: O(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: h
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", pc, [w(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (x(), o("footer", mc, [w(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, uc)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-12c692c9"]]), gc = [
	"type",
	"disabled",
	"aria-busy"
], _c = {
	key: 0,
	class: "phlix-btn__spinner"
}, vc = { class: "phlix-btn__label" }, yc = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
			e.loading ? (x(), o("span", _c, [u(q, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (x(), i(q, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", vc, [w(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (x(), i(q, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, gc));
	}
}), [["__scopeId", "data-v-38abf89d"]]), bc = [
	"disabled",
	"aria-label",
	"aria-pressed"
], xc = { class: "phlix-chip__label" }, Sc = ["disabled", "aria-label"], Cc = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		}, [e.icon ? (x(), i(q, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : a("", !0), s("span", xc, [w(t.$slots, "default", {}, void 0, !0)])], 8, bc), e.removable ? (x(), o("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [u(q, { name: "x" })], 8, Sc)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-551f7599"]]), wc = ["aria-label"], Tc = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: n } = Y(), i = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (x(), o("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? O(n)("common.loading"),
			style: _(i.value ? { fontSize: i.value } : void 0)
		}, [u(q, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, wc));
	}
}), [["__scopeId", "data-v-736b299d"]]), Ec = ["role", "aria-label"], Dc = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		}, [e.icon ? (x(), i(q, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : a("", !0), w(t.$slots, "default", {}, void 0, !0)], 10, Ec));
	}
}), [["__scopeId", "data-v-269446f3"]]), Oc = {
	class: "phlix-empty",
	role: "status"
}, kc = { class: "phlix-empty__icon" }, Ac = { class: "phlix-empty__title" }, jc = {
	key: 0,
	class: "phlix-empty__desc"
}, Mc = {
	key: 1,
	class: "phlix-empty__actions"
}, Nc = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (x(), o("div", Oc, [
			s("span", kc, [u(q, { name: e.icon }, null, 8, ["name"])]),
			s("h3", Ac, E(e.title), 1),
			e.description || t.$slots.default ? (x(), o("p", jc, [w(t.$slots, "default", {}, () => [l(E(e.description), 1)], !0)])) : a("", !0),
			t.$slots.actions ? (x(), o("div", Mc, [w(t.$slots, "actions", {}, void 0, !0)])) : a("", !0)
		]));
	}
}), [["__scopeId", "data-v-1790dcf5"]]), Pc = { class: "subsearch" }, Fc = { class: "subsearch__langs" }, Ic = { class: "subsearch__legend" }, Lc = { class: "subsearch__chips" }, Rc = { class: "subsearch__actions" }, zc = {
	key: 0,
	class: "subsearch__status",
	role: "status"
}, Bc = {
	key: 2,
	class: "subsearch__prompt"
}, Vc = {
	key: 3,
	class: "subsearch__list"
}, Hc = { class: "subsearch__meta" }, Uc = { class: "subsearch__release" }, Wc = { class: "subsearch__signals" }, Gc = { class: "subsearch__provider" }, Kc = ["aria-label"], qc = {
	key: 2,
	class: "subsearch__stat"
}, Jc = {
	key: 3,
	class: "subsearch__stat"
}, Yc = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let c = t, d = n, { t: f } = Y(), p = je(), m = [
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
			return c.client ?? new Ae({ baseUrl: c.apiBase ?? "" });
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
			if (e instanceof U) {
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
				let n = to([(await F().downloadSubtitle(c.mediaId, {
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
		}, { immediate: !0 }), (n, r) => (x(), i(hc, {
			"model-value": t.open,
			title: O(f)("player.subtitleSearchTitle"),
			size: "md",
			"onUpdate:modelValue": r[0] ||= (e) => d("update:open", e)
		}, {
			footer: P(() => [u(yc, {
				variant: "ghost",
				onClick: L
			}, {
				default: P(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			})]),
			default: P(() => [s("div", Pc, [
				s("fieldset", Fc, [s("legend", Ic, E(O(f)("player.subtitleSearchLanguages")), 1), s("div", Lc, [(x(!0), o(e, null, C(g.value, (e) => (x(), i(Cc, {
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
				s("div", Rc, [u(yc, {
					variant: "solid",
					"left-icon": "search",
					loading: b.value,
					disabled: !M.value,
					onClick: I
				}, {
					default: P(() => [l(E(O(f)("player.subtitleSearchAction")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				b.value ? (x(), o("div", zc, [u(Tc, { label: O(f)("player.subtitleSearching") }, null, 8, ["label"]), s("span", null, E(O(f)("player.subtitleSearching")), 1)])) : w.value && j.value.length === 0 ? (x(), i(Nc, {
					key: 1,
					icon: "captions",
					title: O(f)("player.subtitleSearchEmpty"),
					description: O(f)("player.subtitleSearchEmptyHint")
				}, null, 8, ["title", "description"])) : w.value ? (x(), o("ul", Vc, [(x(!0), o(e, null, C(j.value, (e) => (x(), o("li", {
					key: A(e),
					class: "subsearch__item"
				}, [s("div", Hc, [s("p", Uc, E(e.releaseName || e.provider), 1), s("div", Wc, [
					u(Dc, {
						tone: "neutral",
						size: "sm"
					}, {
						default: P(() => [l(E(h(e.language)), 1)]),
						_: 2
					}, 1024),
					e.hearingImpaired ? (x(), i(Dc, {
						key: 0,
						tone: "info",
						size: "sm",
						label: O(f)("player.subtitleHearingImpairedFull")
					}, {
						default: P(() => [l(E(O(f)("player.subtitleHearingImpaired")), 1)]),
						_: 1
					}, 8, ["label"])) : a("", !0),
					s("span", Gc, E(e.provider), 1),
					e.rating > 0 ? (x(), o("span", {
						key: 1,
						class: "subsearch__stat",
						"aria-label": O(f)("player.subtitleRating", { rating: e.rating })
					}, [u(q, { name: "star" }), l(" " + E(e.rating), 1)], 8, Kc)) : a("", !0),
					e.downloadCount > 0 ? (x(), o("span", qc, E(O(f)("player.subtitleDownloads", { count: e.downloadCount })), 1)) : a("", !0),
					e.fps ? (x(), o("span", Jc, E(O(f)("player.subtitleFps", { fps: e.fps })), 1)) : a("", !0)
				])]), u(yc, {
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
				])]))), 128))])) : (x(), o("p", Bc, E(O(f)("player.subtitleSearchPrompt")), 1))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-70abcee8"]]), Xc = 32, Zc = 18, Qc = 250, $c = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function el(e, t, n, r, i, a, o) {
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
		r: $c(d / m),
		g: $c(f / m),
		b: $c(p / m)
	};
}
function tl(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: el(e, t, n, 0, 0, r, n),
		right: el(e, t, n, t - r, 0, t, n),
		center: el(e, t, n, 0, 0, t, n)
	};
}
function nl({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function rl({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function il(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${rl(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${rl(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${rl(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function al(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var ol = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
			i.value = al(a);
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
				u.value = il(tl(n, 32, 18));
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
}), [["__scopeId", "data-v-88c68588"]]), sl = ["aria-label"], cl = { class: "resume__label" }, ll = { class: "resume__time numeric" }, ul = { class: "resume__actions" }, dl = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = Y(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (x(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": O(i)("player.resumePlayback")
		}, [s("p", cl, [
			l(E(a.value[0]), 1),
			s("span", ll, E(O(Sa)(e.seconds)), 1),
			l(E(a.value[1]), 1)
		]), s("div", ul, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [u(q, { name: "play" }), s("span", null, E(O(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [u(q, { name: "rewind" }), s("span", null, E(O(i)("player.startOver")), 1)])])], 8, sl));
	}
}), [["__scopeId", "data-v-271c5209"]]), fl = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], pl = [
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
], ml = new Set(pl);
function hl(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function gl(...e) {
	return e.some((e) => ml.has(hl(e)));
}
function _l(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function vl(e) {
	return e?.error?.code === 2;
}
var yl = 8, bl = 15, xl = 2 * Math.PI * 15;
function Sl(e, t, n = xl) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Cl = /* @__PURE__ */ new Map([
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
]), wl = /* @__PURE__ */ new Map([
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
]), Tl = /* @__PURE__ */ new Set(["h264"]), El = /* @__PURE__ */ new Map([
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
function Dl(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	if (t === "") return "direct";
	let n = wl.get(t);
	return n === void 0 ? "transcode" : Tl.has(n) ? "direct" : "probe";
}
function Ol(e) {
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
var kl = /* @__PURE__ */ new Map([
	["mp4", "video/mp4"],
	["m4v", "video/mp4"],
	["mov", "video/quicktime"],
	["webm", "video/webm"],
	["ogg", "video/ogg"],
	["ogv", "video/ogg"]
]);
function Al(e) {
	let t = typeof e == "string" ? e.trim().toLowerCase() : "";
	return kl.get(t) ?? "video/mp4";
}
function jl(e, t = "video/mp4") {
	let n = Cl.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Ml(e, t = "video/mp4") {
	if (!e) return !0;
	let n = jl(e, t);
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
async function Nl(e, t = "video/mp4") {
	let n = typeof e == "string" ? e.trim().toLowerCase() : "", r = wl.get(n), i = r === void 0 ? void 0 : El.get(r);
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
async function Pl(e, t, n = "") {
	if (gl(...e)) return !0;
	let r = e.map((e) => hl(e)).find((e) => fl.includes(e)) ?? "";
	if (!fl.includes(r)) return !1;
	let i = Al(r), a = Dl(n);
	if (a === "transcode" || a === "probe" && !await Nl(n, i)) return !0;
	if (t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Ml(e.codec, i)) return !0;
	}
	return !1;
}
//#endregion
//#region src/utils/imageSrc.ts
function Fl(e) {
	return e.length > 1 && e[0] === "/" && e[1] !== "/" && e[1] !== "\\";
}
function Il(e, t) {
	if (typeof t != "string" || t === "" || !Fl(t)) return t;
	let n = e.replace(/\/+$/, "");
	return n === "" ? t : n + t;
}
function Ll(e, t) {
	if (typeof t != "string" || t.trim() === "") return t;
	let n = [];
	for (let r of t.split(",")) {
		let t = r.trim();
		if (t === "") continue;
		let i = t.search(/\s/), a = i === -1 ? t : t.slice(0, i), o = i === -1 ? "" : t.slice(i);
		n.push(String(Il(e, a)) + o);
	}
	return n.length > 0 ? n.join(", ") : t;
}
//#endregion
//#region src/composables/useImageSrc.ts
function Rl() {
	let e = Re();
	return {
		imgSrc: (t) => Il(e.value, t),
		imgSrcset: (t) => Ll(e.value, t)
	};
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var zl = ["aria-label"], Bl = ["src"], Vl = { class: "upnext__body" }, Hl = { class: "upnext__eyebrow" }, Ul = { class: "upnext__title" }, Wl = {
	key: 0,
	class: "upnext__cd numeric"
}, Gl = { class: "upnext__actions" }, Kl = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ql = ["r"], Jl = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], Yl = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let { t: n } = Y(), { imgSrc: i } = Rl(), c = e, l = t, d = r(() => c.posterUrl ?? c.media.poster_url ?? null), f = r(() => Sl(c.remaining, c.total));
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
			}, null, 8, Bl)) : a("", !0),
			s("div", Vl, [
				s("p", Hl, E(O(n)("player.upNext")), 1),
				s("h4", Ul, E(e.media.name), 1),
				e.counting ? (x(), o("p", Wl, E(O(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", Gl, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => l("play-now")
				}, [u(q, { name: "play" }), s("span", null, E(O(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => l("cancel")
				}, E(O(n)("player.cancel")), 1)])
			]),
			e.counting ? (x(), o("svg", Kl, [s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ql), s("circle", {
				cx: "18",
				cy: "18",
				r: O(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": O(xl),
				"stroke-dashoffset": f.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, Jl)])) : a("", !0)
		], 8, zl));
	}
}), [["__scopeId", "data-v-9115aa2b"]]), Xl = {
	class: "transcode",
	role: "alert"
}, Zl = { class: "transcode__card" }, Ql = { class: "transcode__heading" }, $l = { class: "transcode__body" }, eu = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = Y();
		return (t, i) => (x(), o("div", Xl, [s("div", Zl, [
			u(q, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", Ql, E(O(r)("player.transcodeHeading")), 1),
			s("p", $l, E(e.title ? O(r)("player.transcodeBodyTitled", { title: e.title }) : O(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [u(q, { name: "arrow-left" }), s("span", null, E(O(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-8a5efb50"]]), tu = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, nu = { class: "prep__card" }, ru = { class: "prep__heading" }, iu = { class: "prep__body" }, au = ["aria-valuenow"], ou = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = Y(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (x(), o("div", tu, [s("div", nu, [
			u(q, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", ru, E(O(n)("player.transcodePreparingHeading")), 1),
			s("p", iu, E(e.title ? O(n)("player.transcodePreparingTitled", { title: e.title }) : O(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: _({ width: r() + "%" })
			}, null, 4)], 8, au),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [u(q, { name: "arrow-left" }), s("span", null, E(O(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), su = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let c = e, l = t, { t: d } = Y();
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
			}, [s("span", null, E(p.value.label), 1), u(q, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), cu = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, lu = ["aria-label", "onClick"], uu = { class: "skip-controls__label" }, du = 5, fu = 30, pu = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: l } = Y();
		function d(e) {
			return e / 1e3;
		}
		function f(e, t) {
			return t >= d(e.endMs);
		}
		function p(e, t) {
			if (f(e, t)) return !1;
			let n = d(e.startMs), r = n - du, i = n + fu;
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
		return (t, n) => g.value.length > 0 ? (x(), o("div", cu, [(x(!0), o(e, null, C(g.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${h(e.type)}`,
			onClick: L((t) => _(e), ["stop"])
		}, [s("span", uu, E(h(e.type)), 1), u(q, { name: "skip-forward" })], 8, lu))), 128))])) : a("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), mu = ["aria-label", "aria-expanded"], hu = ["aria-label"], gu = { class: "chapterlist__head" }, _u = { class: "chapterlist__title" }, vu = ["aria-label"], yu = ["onClick"], bu = { class: "chapterlist__index" }, xu = { class: "chapterlist__name" }, Su = { class: "chapterlist__meta" }, Cu = { class: "chapterlist__time" }, wu = {
	key: 0,
	class: "chapterlist__duration"
}, Tu = {
	key: 1,
	class: "chapterlist__empty"
}, Eu = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let i = t, c = n, { t: l } = Y();
		function d() {
			c("update:open", !1);
		}
		function f() {
			c("update:open", !i.open);
		}
		let p = r(() => i.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Sa(e.start), a;
			return e.end != null && e.end > e.start && (a = Sa(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = S(null), h = S(null);
		Co(h, D(i, "open"), {
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
		}, [u(q, { name: "list" })], 10, mu), t.open ? (x(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": O(l)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", gu, [s("h3", _u, E(O(l)("player.chapters")), 1), u(_o, {
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
			s("span", bu, E(e.index), 1),
			s("span", xu, E(e.label), 1),
			s("span", Su, [s("span", Cu, E(e.startLabel), 1), e.durationLabel ? (x(), o("span", wu, "· " + E(e.durationLabel), 1)) : a("", !0)])
		], 8, yu)]))), 128))], 8, vu)) : (x(), o("p", Tu, E(O(l)("player.noChapters")), 1))], 8, hu)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Du = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Ou = { class: "marker-timeline__ticks" }, ku = [
	"title",
	"aria-label",
	"onClick"
], Au = { class: "marker-timeline__tooltip" }, ju = { class: "marker-timeline__tooltip-label" }, Mu = { class: "marker-timeline__tooltip-time numeric" }, Nu = ["onClick"], Pu = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		}, [h.value ? (x(), o("div", Du, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), l(" " + E(v.value), 1)])) : a("", !0), s("div", Ou, [(x(!0), o(e, null, C(p.value, (e) => (x(), o("button", {
			key: e.id,
			type: "button",
			class: g(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: _({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${O(Sa)(e.startSec)}`,
			"aria-label": `${e.label} at ${O(Sa)(e.startSec)}`,
			onClick: L((t) => y(e), ["stop"])
		}, [s("span", Au, [
			s("span", ju, E(e.label), 1),
			s("span", Mu, E(O(Sa)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: L((t) => b(e), ["stop"])
			}, " Find similar ", 8, Nu)
		])], 14, ku))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Fu = ["aria-label", "aria-expanded"], Iu = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Lu = ["aria-label"], Ru = ["aria-selected", "onClick"], zu = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(t, { expose: i }) {
		let c = t, { t: l } = Y(), d = [
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
		}, [u(q, { name: "moon" }), m.value ? (x(), o("span", Iu, E(w(p.value)), 1)) : a("", !0)], 10, Fu), u(n, { name: "dropdown" }, {
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
			}, E(e.label), 11, Ru)), 64))], 8, Lu)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), X = {
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
X.GROUP_CREATE, X.GROUP_JOIN, X.GROUP_LEAVE, X.GROUP_STATE, X.GROUP_LIST, X.PLAYBACK_PLAY, X.PLAYBACK_PAUSE, X.PLAYBACK_SEEK, X.PLAYBACK_QUEUE, X.PLAYBACK_SYNC, X.CHAT, X.TYPING, X.HOST_TRANSFER, X.HOST_ELECT, X.TIME_PING, X.TIME_PONG, X.TIME_SYNC, X.ERROR, X.INFO;
function Bu(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function Vu(e) {
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
function Hu(e) {
	return JSON.stringify(e);
}
var Uu = .1, Wu = .99, Gu = 1.01, Ku = class {
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
		this.driftRate = 1 + Uu * i / 1e3, this.driftRate = Math.min(Gu, Math.max(Wu, this.driftRate));
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
}, qu = class e {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new Ku(e.now);
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
		t !== void 0 && (n.password_hash = t), this.dispatch(X.GROUP_CREATE, n);
	}
	joinGroup(e, t) {
		let n = {
			group_id: e,
			member_id: this.memberId,
			member_name: this.memberName
		};
		t !== void 0 && (n.password_hash = t), this.dispatch(X.GROUP_JOIN, n);
	}
	leaveGroup() {
		this.group !== null && (this.dispatch(X.GROUP_LEAVE, {
			group_id: this.group.group_id,
			member_id: this.memberId
		}), this.group = null);
	}
	sendPlay(e) {
		this.group !== null && this.dispatch(X.PLAYBACK_PLAY, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendPause(e) {
		this.group !== null && this.dispatch(X.PLAYBACK_PAUSE, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			server_time: this.getSynchronizedTime()
		});
	}
	sendSeek(e, t) {
		this.group !== null && this.dispatch(X.PLAYBACK_SEEK, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			from_position: e,
			to_position: t,
			server_time: this.getSynchronizedTime()
		});
	}
	reportPosition(e, t) {
		this.group !== null && this.dispatch(X.PLAYBACK_SYNC, {
			group_id: this.group.group_id,
			member_id: this.memberId,
			position: e,
			is_playing: t,
			server_time: this.getSynchronizedTime()
		});
	}
	pingTime() {
		let e = this.now();
		this.lastPingSendTime = e, this.dispatch(X.TIME_PING, { client_time: e });
	}
	onDisconnect() {
		this.timeSync.reset(), this.group = null, this.lastPingSendTime = null, this.options.onDisconnect?.();
	}
	handleIncoming(e) {
		let t = Vu(e);
		if (t !== null) switch (t.type) {
			case X.TIME_PONG:
				this.handleTimePong(t);
				break;
			case X.GROUP_STATE:
				this.handleGroupState(t);
				break;
			case X.PLAYBACK_PLAY:
				this.handlePlayback("play", t);
				break;
			case X.PLAYBACK_PAUSE:
				this.handlePlayback("pause", t);
				break;
			case X.PLAYBACK_SEEK:
				this.handleSeek(t);
				break;
			case X.HOST_ELECT:
				this.handleHostElect(t);
				break;
			case X.INFO:
				this.handleInfo(t);
				break;
			case X.ERROR:
				this.handleError(t);
				break;
			case X.TYPING:
				this.handleTyping(t);
				break;
			case X.HOST_TRANSFER:
				this.handleHostTransfer(t);
				break;
			case X.PLAYBACK_SYNC:
				this.handlePlaybackSync(t);
				break;
			case X.TIME_SYNC:
				this.handleTimeSync(t);
				break;
			case X.GROUP_LIST:
				this.handleGroupList(t);
				break;
			case X.CHAT:
			case X.PLAYBACK_QUEUE: break;
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
		this.send(Bu(e, t, this.now));
	}
};
//#endregion
//#region src/api/syncplay.ts
function Ju(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function Yu(e) {
	return e / 1e3;
}
function Xu(e) {
	let t = Ju(e, 0);
	return (/* @__PURE__ */ new Date((t > 0 ? t : Date.now() / 1e3) * 1e3)).toISOString();
}
function Zu(e) {
	return e.group_id ?? e.id ?? "";
}
function Qu(e) {
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
		lastSeen: Xu(e.joined_at)
	})) : [];
}
function $u(e) {
	switch (e.playback_state) {
		case "playing": return "playing";
		case "paused": return "paused";
		default: return e.is_playing === !0 ? "playing" : "waiting";
	}
}
function ed(e) {
	let t = e ?? {}, n = Zu(t);
	return {
		id: n,
		name: t.group_name ?? t.name ?? "",
		isPublic: t.has_password !== !0,
		memberCount: Ju(t.member_count, Qu(t).length),
		roomId: n,
		hostUserId: t.host_id ?? void 0,
		createdAt: Xu(t.created_at)
	};
}
function td(e) {
	let t = e ?? {}, n = Zu(t), r = $u(t);
	return {
		id: n,
		roomId: n,
		serverId: "",
		createdBy: t.host_id ?? "",
		createdAt: Xu(t.created_at),
		state: r,
		currentMediaId: t.current_media_id ?? null,
		playbackPosition: Yu(Ju(t.playback_position)),
		playbackRate: +(r === "playing"),
		serverTime: Ju(t.last_activity_at, Math.floor(Date.now() / 1e3)),
		lastSync: Xu(t.last_activity_at),
		activeUsers: Qu(t),
		roles: Object.fromEntries(Qu(t).map((e) => [e.id, e.role])),
		permissions: {}
	};
}
var nd = class {
	client;
	constructor(e) {
		this.client = new Ae({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new W() : void 0
		});
	}
	async createRoom(e) {
		return ed((await this.client.post("/api/v1/syncplay/groups", e)).group);
	}
	async joinRoom(e, t) {
		let n = t !== void 0 && t !== "" ? { memberName: t } : void 0, r = await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, n);
		return {
			room: ed(r.group),
			session: td(r.group)
		};
	}
	async leaveRoom(e) {
		await this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`);
	}
	async getState(e) {
		return td((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async getMembers(e) {
		return Qu((await this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`)).group);
	}
	async listGroups() {
		let e = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e.groups) ? e.groups.map(ed) : [];
	}
	async listPublicRooms() {
		return (await this.listGroups()).filter((e) => e.isPublic);
	}
}, rd = null;
function id(e) {
	return rd ||= new nd(e), rd;
}
var Z = null, Q = null, ad = 0, od = 5, sd = 1e3, $ = null, cd = null, ld = null, ud = null;
function dd() {
	try {
		return typeof window > "u" ? null : new W().getAccessToken();
	} catch {
		return null;
	}
}
function fd(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = dd() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function pd(e) {
	if ($) try {
		let t = JSON.parse(e.data);
		$.handleIncoming(t);
	} catch {}
}
function md() {
	if (Z = null, $ && $.onDisconnect(), Q && ad < od) {
		let e = sd * 2 ** ad;
		ad++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${ad})`), setTimeout(() => {
			Q && gd(Q);
		}, e);
	} else ad >= od && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), Q = null, ad = 0, $ = null);
}
function hd(e, t, n, r) {
	ad = 0, gd(e, t, n, r);
}
function gd(e, t, n, r) {
	if (t && (ud = t), Z && Q !== e && (Z.close(), Z = null, Q = null, $ = null), Z && Q === e) return;
	Q = e;
	let i = n ?? cd ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? ld ?? "Anonymous";
	cd = i, ld = a, $ = new qu({
		send: (e) => {
			Z && Z.readyState === WebSocket.OPEN && Z.send(Hu(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			ud && ud({
				type: e.type,
				position: Yu(e.position),
				roomId: Q ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			ud && ud({
				type: n ? "play" : "pause",
				position: Yu(t),
				roomId: Q ?? void 0
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
	let o = fd(e);
	console.log(`[SyncPlay] Opening WebSocket to ${o}`), Z = new WebSocket(o), Z.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), ad = 0, $ && Q && $.joinGroup(Q);
	}, Z.onmessage = pd, Z.onclose = md, Z.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function _d() {
	Z &&= (Z.close(), null), $ &&= ($.leaveGroup(), $.onDisconnect(), null), Q = null, ad = 0;
}
function vd(e) {
	!$ || !Z || Z.readyState !== WebSocket.OPEN || $.reportPosition(e.playbackPosition, e.playbackRate > 0);
}
function yd(e) {
	if (!(!$ || !Z || Z.readyState !== WebSocket.OPEN)) switch (e.type) {
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
var bd = 5e3;
function xd() {
	let e = Be().user;
	if (e) {
		for (let t of [
			e.name,
			e.username,
			e.email
		]) if (typeof t == "string" && t.trim() !== "") return t.trim();
	}
}
var Sd = R("phlix-syncplay", () => {
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
		e.state === "playing" && vd({
			sessionId: e.id,
			playbackPosition: s.value * 1e3,
			playbackRate: e.playbackRate > 0 ? e.playbackRate : 1,
			serverTime: e.serverTime,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	function g() {
		_(), l = setInterval(h, bd);
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
		}, i.value = s.activeUsers, hd(n, (e) => {
			T(e);
		}, void 0, a), g();
	}
	async function x(t, n) {
		o.value = !0, a.value = null;
		try {
			let r = id(t), i = xd(), a = await r.createRoom({
				...n,
				memberName: i
			});
			e.value = a, b(a.id, await r.joinRoom(a.id, i), i);
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to create room", e;
		} finally {
			o.value = !1;
		}
	}
	async function C(e, t) {
		o.value = !0, a.value = null;
		try {
			let n = id(e), r = xd();
			b(t, await n.joinRoom(t, r), r);
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to join room", e;
		} finally {
			o.value = !1;
		}
	}
	async function w(n) {
		if (e.value) {
			o.value = !0, a.value = null;
			try {
				await id(n).leaveRoom(e.value.id), _(), _d(), e.value = null, t.value = null, i.value = [];
			} catch (e) {
				throw a.value = e instanceof Error ? e.message : "Failed to leave room", e;
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
					state: "playing"
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
		t.value && yd({
			type: n,
			position: r?.position === void 0 ? void 0 : r.position * 1e3,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function D(e) {
		if (t.value) try {
			let n = await id(e).getState(t.value.id);
			t.value = n, c = Date.now();
		} catch (e) {
			throw a.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function O(t) {
		if (e.value) try {
			let n = await id(t).getMembers(e.value.id);
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
}), Cd = {
	key: 0,
	class: "syncplay-overlay"
}, wd = { class: "syncplay-overlay__badge" }, Td = { class: "syncplay-overlay__label" }, Ed = { class: "syncplay-overlay__status-label" }, Dd = { class: "syncplay-overlay__members" }, Od = { class: "syncplay-overlay__member-count" }, kd = { class: "syncplay-overlay__member-list" }, Ad = { class: "syncplay-overlay__member-name" }, jd = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Md = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = Y(), c = Sd(), d = Re(), f = r(() => n.apiBase ?? d.value), p = r(() => c.currentRoom?.name ?? "SyncPlay"), m = r(() => c.onlineMembers.length), h = r(() => c.syncStatus), _ = r(() => {
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
		return (t, n) => O(c).isInRoom ? (x(), o("div", Cd, [
			s("div", wd, [u(q, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", Td, "SyncPlay: " + E(p.value), 1)]),
			s("div", { class: g(["syncplay-overlay__status", `syncplay-overlay__status--${h.value}`]) }, [u(q, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", Ed, E(_.value), 1)], 2),
			s("div", Dd, [s("span", Od, [u(q, { name: "user" }), l(" " + E(O(i)("syncplay.members", { count: m.value })), 1)]), s("ul", kd, [(x(!0), o(e, null, C(O(c).onlineMembers.slice(0, 5), (e) => (x(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", Ad, E(e.name), 1)]))), 128)), O(c).onlineMembers.length > 5 ? (x(), o("li", jd, " +" + E(O(c).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			u(yc, {
				variant: "ghost",
				size: "sm",
				onClick: y
			}, {
				default: P(() => [l(E(O(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-3f63f0ac"]]), Nd = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, Pd = ["aria-selected"], Fd = ["aria-selected"], Id = {
	key: 0,
	class: "syncplay-modal__fields"
}, Ld = { class: "syncplay-modal__field" }, Rd = {
	class: "syncplay-modal__label",
	for: "room-name"
}, zd = ["placeholder"], Bd = {
	key: 1,
	class: "syncplay-modal__fields"
}, Vd = { class: "syncplay-modal__field" }, Hd = {
	class: "syncplay-modal__label",
	for: "room-id"
}, Ud = ["placeholder"], Wd = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, Gd = {
	key: 3,
	class: "syncplay-modal__rooms"
}, Kd = { class: "syncplay-modal__rooms-title" }, qd = { class: "syncplay-modal__rooms-list" }, Jd = ["onClick"], Yd = { class: "syncplay-modal__room-name" }, Xd = { class: "syncplay-modal__room-count" }, Zd = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, Qd = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let c = t, d = n, { t: f } = Y(), p = Sd(), m = Re(), h = r(() => c.apiBase ?? m.value), _ = S("create"), v = S(""), y = S(""), b = S(!1), w = S(null), T = S([]), D = S(!1), k = r(() => v.value.trim().length > 0), A = r(() => y.value.trim().length > 0), M = r(() => (_.value === "create" ? k.value : A.value) && !b.value);
		N(() => c.modelValue, async (e) => {
			e && (w.value = null, v.value = "", c.prefilledRoomId ? (y.value = c.prefilledRoomId, _.value = "join") : (y.value = "", _.value = "create"), await I());
		});
		async function I() {
			D.value = !0;
			try {
				let e = new nd(h.value);
				T.value = await e.listPublicRooms();
			} catch {
				T.value = [];
			} finally {
				D.value = !1;
			}
		}
		async function R() {
			if (M.value) {
				b.value = !0, w.value = null;
				try {
					_.value === "create" ? await p.createAndJoinRoom(h.value, { name: v.value.trim() }) : await p.joinRoom(h.value, y.value.trim()), p.currentRoom && d("joined", p.currentRoom), d("update:modelValue", !1);
				} catch (e) {
					w.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					b.value = !1;
				}
			}
		}
		function z(e) {
			_.value = "join", y.value = e.id, v.value = e.name;
		}
		function B() {
			d("update:modelValue", !1);
		}
		return (n, r) => (x(), i(hc, {
			"model-value": t.modelValue,
			title: O(f)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[4] ||= (e) => d("update:modelValue", e),
			onClose: B
		}, {
			footer: P(() => [u(yc, {
				variant: "ghost",
				type: "button",
				onClick: B
			}, {
				default: P(() => [l(E(O(f)("common.close")), 1)]),
				_: 1
			}), u(yc, {
				variant: "solid",
				type: "button",
				loading: b.value,
				disabled: !M.value,
				onClick: R
			}, {
				default: P(() => [l(E(_.value === "create" ? O(f)("syncplay.createRoom") : O(f)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: P(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: L(R, ["prevent"])
			}, [
				s("div", Nd, [s("button", {
					type: "button",
					role: "tab",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "create" }]),
					"aria-selected": _.value === "create",
					onClick: r[0] ||= (e) => _.value = "create"
				}, E(O(f)("syncplay.createRoom")), 11, Pd), s("button", {
					type: "button",
					role: "tab",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "join" }]),
					"aria-selected": _.value === "join",
					onClick: r[1] ||= (e) => _.value = "join"
				}, E(O(f)("syncplay.joinRoom")), 11, Fd)]),
				_.value === "create" ? (x(), o("div", Id, [s("div", Ld, [s("label", Rd, E(O(f)("syncplay.roomName")), 1), F(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => v.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(f)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, zd), [[j, v.value]])])])) : (x(), o("div", Bd, [s("div", Vd, [s("label", Hd, E(O(f)("syncplay.roomId")), 1), F(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[3] ||= (e) => y.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: O(f)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, Ud), [[j, y.value]])])])),
				w.value ? (x(), o("p", Wd, E(w.value), 1)) : a("", !0),
				_.value === "join" && T.value.length > 0 ? (x(), o("div", Gd, [s("h3", Kd, E(O(f)("syncplay.publicRooms")), 1), s("ul", qd, [(x(!0), o(e, null, C(T.value, (e) => (x(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => z(e)
				}, [
					u(q, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", Yd, E(e.name), 1),
					s("span", Xd, E(O(f)("syncplay.members", { count: e.memberCount })), 1)
				], 8, Jd)]))), 128))])])) : a("", !0),
				D.value ? (x(), o("div", Zd, [u(q, { name: "spinner" }), s("span", null, E(O(f)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-1d5cbab8"]]), $d = {
	key: 0,
	class: "syncplay-controls"
}, ef = ["aria-label"], tf = { class: "syncplay-controls__wait-label" }, nf = { class: "syncplay-controls__transport" }, rf = ["aria-label"], af = ["aria-label"], of = ["aria-label"], sf = { class: "syncplay-controls__status-label" }, cf = 10, lf = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let n = e, i = t, { t: c } = Y(), l = Sd(), d = Re(), f = r(() => n.apiBase ?? d.value), p = S(!1), m = r(() => p.value || l.syncStatus === "re-syncing");
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
			await y(Math.max(0, n.position - cf));
		}
		async function C() {
			await y(Math.min(n.duration, n.position + cf));
		}
		return N(() => l.syncStatus, (e) => {
			e === "re-syncing" ? p.value = !0 : e === "synced" && (p.value = !1);
		}), (t, n) => O(l).isInRoom ? (x(), o("div", $d, [
			m.value ? (x(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": O(c)("syncplay.waitingForMembers")
			}, [u(q, {
				name: "spinner",
				class: "syncplay-controls__wait-icon"
			}), s("span", tf, E(O(c)("syncplay.waitingForMembers")), 1)], 8, ef)) : a("", !0),
			s("div", nf, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.rewind"),
					onClick: b
				}, [u(q, { name: "rewind" })], 8, rf),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? O(c)("syncplay.pauseAll") : O(c)("syncplay.playAll"),
					onClick: v
				}, [u(q, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, af),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": O(c)("syncplay.fastForward"),
					onClick: C
				}, [u(q, { name: "forward" })], 8, of)
			]),
			s("div", { class: g(["syncplay-controls__status", `syncplay-controls__status--${O(l).syncStatus}`]) }, [u(q, {
				name: O(l).syncStatus === "synced" ? "check" : O(l).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", sf, E(O(l).syncStatus === "synced" ? O(c)("syncplay.synced") : O(l).syncStatus === "outOfSync" ? O(c)("syncplay.outOfSync") : O(c)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-3df5b737"]]);
//#endregion
//#region src/utils/subtitleSrc.ts
function uf(e, t) {
	return String(Il(e, t));
}
function df(e, t) {
	let n = !1, r = t.map((t) => {
		let r = uf(e, t.url);
		return r === t.url ? t : (n = !0, {
			...t,
			url: r
		});
	});
	return n ? r : t;
}
//#endregion
//#region src/components/Player.vue?vue&type=script&setup=true&lang.ts
var ff = { class: "player__stage" }, pf = ["src", "poster"], mf = [
	"src",
	"srclang",
	"label"
], hf = { class: "player__meta" }, gf = ["aria-label"], _f = { class: "player__meta-text" }, vf = { class: "player__eyebrow" }, yf = { class: "player__title" }, bf = { class: "player__sub numeric" }, xf = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Sf = {
	key: 0,
	class: "player__center"
}, Cf = ["aria-label"], wf = { class: "player__btnrow" }, Tf = ["aria-label"], Ef = ["aria-label"], Df = ["aria-label"], Of = { class: "player__time numeric" }, kf = ["aria-label", "aria-pressed"], Af = ["title"], jf = ["aria-label"], Mf = ["aria-label"], Nf = ["aria-label", "aria-pressed"], Pf = ["aria-label", "aria-pressed"], Ff = ["aria-label"], If = { class: "similar-modal" }, Lf = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Rf = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, zf = { class: "similar-modal__state-title" }, Bf = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, Vf = {
	key: 3,
	class: "similar-modal__results"
}, Hf = { class: "similar-modal__poster" }, Uf = ["src", "alt"], Wf = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, Gf = { class: "similar-modal__result-body" }, Kf = { class: "similar-modal__result-title" }, qf = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, Jf = { key: 0 }, Yf = /*#__PURE__*/ J(/* @__PURE__ */ d({
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
		let { imgSrc: c } = Rl(), d = t, p = n, m = ue(), _ = ne(), { t: b } = Y(), w = Sd(), T = Ye(), D = r(() => T.isFavorite(d.media.id)), k = r(() => T.likeLevel(d.media.id));
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
		], F = S(null), I = S(null), R = S(!0), z = S(!1), B = S(!1), ee = S(!1), V = S(!1), H = S(!1), te = S(!1), re = S(null), ie = S(null), ae = S(!1), oe = je(), se = S(!1);
		function ce(e) {
			oe.success(b("syncplay.joinedRoom", { name: e.name }));
		}
		let le = r(() => V.value ? 1.35 : 1), U = S(gl(d.streamUrl, d.media.path)), de = r(() => Ol(d.media.streams)), fe = 0;
		async function pe() {
			let e = ++fe;
			if (U.value) return;
			let t = await Pl([d.streamUrl, d.media.path], d.playbackAudioTracks ?? [], de.value);
			e === fe && (!t || U.value || (U.value = !0, Te(F.value?.currentTime ?? 0)));
		}
		N([() => d.playbackAudioTracks, de], () => {
			pe();
		}, { immediate: !0 });
		let me = f("phlixConfig", null), he = f("resumeReporter", null), ge = !1;
		function _e() {
			return me?.apiBase ?? "";
		}
		let W = uo({
			apiBase: () => d.apiBase ?? "",
			hlsConfig: me?.playerHlsConfig
		}), ve = ho({ apiBase: () => d.apiBase ?? "" }), ye = null;
		function be(e) {
			ye !== null && clearTimeout(ye), ye = setTimeout(() => {
				ye = null, ve.fetch(e);
			}, 0);
		}
		let xe = r(() => d.thumbnailAt ?? ve.thumbnailAt), Se = r(() => U.value ? void 0 : d.streamUrl), G = r(() => U.value && W.state.value !== "ready"), Ce = r(() => U.value && (W.state.value === "preparing" || W.state.value === "idle")), we = r(() => U.value && W.state.value === "error");
		function Te(e = 0) {
			let t = F.value;
			t && W.start(t, d.media.id, void 0, e);
		}
		function Ee(e) {
			if (m.quality === "original" && e !== "auto") {
				W.loadVariantPlaylist(es);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				W.loadVariantPlaylist(e);
				return;
			}
			W.setLevel(e);
		}
		let De = !1;
		function Oe() {
			_.defaultQuality = $o;
		}
		function ke() {
			let e = W.levels.value;
			if (e.length === 0) return !1;
			let t = _.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = W.variants.value;
				if (!t || t.length === 0) return !1;
				if (ss(e, t)) W.loadVariantPlaylist(es);
				else {
					let t = os(e);
					t >= 0 && W.setNextLevel(t), Oe();
				}
				return !0;
			}
			let n = is(e, t);
			return n >= 0 ? W.setNextLevel(n) : Oe(), !0;
		}
		N(() => W.levels.value, (e) => {
			De || e.length === 0 || ke() && (De = !0);
		}), N(() => W.variants.value, (e) => {
			De || !e?.length || h(() => {
				De || ke() && (De = !0);
			});
		}, { deep: !0 });
		let Me = S(m.resumePositionFor(d.media.id) ?? 0), Ne = S(!U.value && Me.value > 0), Pe = null, Fe = S(!1), Ie = S(8), Le, Re = S(null), ze = S(0), Be = S(!1), Ve = S([]), He = S(!1), Ue = S(null);
		function We(e, t) {
			Re.value = e, ze.value = t, Ve.value = [], Ue.value = null, Be.value = !0, Xe(e, t);
		}
		let Ge = null, Ke = null, qe = null;
		function Je() {
			let e = d.apiBase ?? "";
			return (Ke === null || qe !== e) && (Ke = new Ae({ baseUrl: e }), qe = e), Ke;
		}
		async function Xe(e, t) {
			Ge?.abort(), Ge = new AbortController(), He.value = !0, Ue.value = null;
			try {
				let n = await Je().searchByMarker(e, t, 30, 20, Ge.signal);
				Ve.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Ue.value = "Failed to load similar media. Please try again.", Ve.value = [];
			} finally {
				He.value = !1;
			}
		}
		function Ze() {
			Ge?.abort(), Be.value = !1, Ve.value = [], Ue.value = null, Re.value = null;
		}
		let Qe = r(() => m.upNext);
		function $e() {
			U.value = gl(d.streamUrl, d.media.path), pe(), Me.value = m.resumePositionFor(d.media.id) ?? 0, Ne.value = !U.value && Me.value > 0, Pe = null, zt = !1, Dt = !1, wt.value = [], Ct.value = !1, Ot = !1, gt.value = -1, Pt = null, De = !1, ge = !1, rt(), Fe.value = !1, W.reset(), F.value && (F.value.currentTime = 0), U.value && Te(), be(d.media.id);
		}
		function et(e) {
			let t = F.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Pe = Math.max(0, e));
		}
		function tt() {
			et(Me.value), Ne.value = !1, F.value?.play()?.catch(() => {});
		}
		function nt() {
			Pe = null, et(0), m.clearResume(d.media.id), Ne.value = !1, F.value?.play()?.catch(() => {});
		}
		function rt() {
			Le &&= (clearInterval(Le), void 0);
		}
		function it() {
			Ie.value = 8, rt(), Le = setInterval(() => {
				--Ie.value, Ie.value <= 0 && (rt(), ot());
			}, 1e3);
		}
		function at() {
			ge || (ge = !0, he?.finish()), _n(), R.value = !0, m.upNext && (Fe.value = !0, _.autoplay && it());
		}
		function ot() {
			rt(), Fe.value = !1;
			let e = m.next(d.streamUrlFor);
			e && p("play-next", e);
		}
		function st() {
			rt(), Fe.value = !1;
		}
		function ct() {
			if (U.value) return;
			let e = F.value, t = vl(e) && (e?.currentTime ?? 0) === 0;
			(_l(e) || t) && (U.value = !0, Te(e?.currentTime ?? 0));
		}
		let lt = S([]), ut = S([]), dt = S(-1), ft = S(!1), pt = r(() => W.state.value === "ready" && W.audioTracks.value.length > 0), mt = r(() => W.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), ht = r(() => (d.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), gt = S(-1), _t = r(() => !pt.value && !U.value && ut.value.length === 0 && ht.value.length > 1), vt = r(() => pt.value ? mt.value : _t.value ? ht.value : ut.value), yt = r(() => {
			if (pt.value) return W.currentAudioTrack.value;
			if (_t.value) {
				if (gt.value >= 0) return gt.value;
				let e = (d.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : d.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return dt.value;
		}), bt = S(!1), xt = m.subtitleLang, St = r(() => {
			let e = d.apiBase ?? "", t = U.value ? W.subtitleTracks.value : df(e, d.playbackSubtitleTracks ?? []);
			if (wt.value.length === 0) return t;
			let n = (e) => e.url.split("?")[0], r = df(e, wt.value), i = new Set(t.map(n)), a = r.filter((e) => !i.has(n(e)));
			return a.length === 0 ? t : [...t, ...a];
		}), Ct = S(!1), wt = S([]), Tt = r(() => {
			let e = [], t = (t) => {
				if (!t) return;
				let n = t.split("-")[0].toLowerCase();
				n && !e.includes(n) && e.push(n);
			};
			return t(_.defaultSubtitleLang), t(_.defaultAudioLang), typeof navigator < "u" && t(navigator.language), t("en"), e;
		});
		function Et(e) {
			wt.value.some((t) => t.url === e.url) || (wt.value = [...wt.value, e]);
		}
		let Dt = !1, Ot = !1;
		function kt() {
			if (Dt) return;
			if (_.subtitlePreferenceSet) {
				Dt = !0;
				return;
			}
			let e = St.value.find((e) => e.default);
			if (!e) return;
			let t = lt.value.find((t) => t.language === (e.language || e.label));
			t && (m.setSubtitle(t.language), xt = t.language, Dt = !0);
		}
		function At() {
			if (Ot) return;
			let e = _.defaultAudioLang;
			if (!e) return;
			let t = vt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = yt.value;
			r >= 0 && r < t.length || (Ft(n), Ot = !0);
		}
		let jt = r(() => lt.value.some((e) => e.language === m.subtitleLang));
		function Mt() {
			let e = F.value;
			lt.value = ms(e), ut.value = hs(e), dt.value = bs(e), kt(), At();
		}
		function Nt() {
			if (jt.value) xt = m.subtitleLang, m.setSubtitle(null);
			else {
				let e = xt && lt.value.some((e) => e.language === xt) ? xt : lt.value[0]?.language ?? null;
				m.setSubtitle(e);
			}
			p("captions");
		}
		let Pt = null;
		function Ft(e) {
			if (pt.value) W.setAudioTrack(e);
			else if (_t.value) {
				if (e === yt.value) return;
				gt.value = e, Pt = e, U.value = !0, Te(F.value?.currentTime ?? 0);
			} else ys(F.value, e), dt.value = e;
		}
		N(pt, (e) => {
			if (!e || Pt === null) return;
			let t = Pt;
			Pt = null, t >= 0 && t < W.audioTracks.value.length && W.setAudioTrack(t);
		}), N(St, () => {
			h(() => Mt());
		}, { deep: !0 });
		let It = null, Lt, Rt = r(() => {
			let e = [];
			d.media.year && e.push({ text: String(d.media.year) }), d.media.rating && e.push({
				text: d.media.rating,
				cert: !0
			}), d.media.runtime && e.push({ text: `${d.media.runtime}m` });
			let t = d.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), zt = !1;
		function Bt() {
			if (!d.autoplay || zt || Ne.value || G.value) return;
			let e = F.value;
			if (!e || !e.paused) return;
			zt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, m.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Vt() {
			Bt();
		}
		function Ht() {
			d.prevEpisode && p("play-episode", d.prevEpisode);
		}
		function Ut() {
			d.nextEpisode && p("play-episode", d.nextEpisode);
		}
		function Wt() {
			let e = F.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Gt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Kt() {
			m.play(), m.setMediaPositionState();
		}
		function qt() {
			m.pause(), m.setMediaPositionState();
		}
		function Jt() {
			let e = F.value;
			e && (m.updateProgress(e.currentTime, e.duration, Gt(e)), w.isInRoom && w.updateLocalPosition(e.currentTime));
		}
		function Yt() {
			let e = F.value;
			e && (e.volume = m.volume, e.muted = m.muted, e.playbackRate = m.rate, Pe !== null && (e.currentTime = e.duration ? Math.min(e.duration, Pe) : Pe, Pe = null), m.updateProgress(e.currentTime, e.duration, Gt(e)), m.setMediaPositionState(), Mt());
		}
		function Xt() {
			let e = F.value;
			e && m.updateProgress(e.currentTime, e.duration, Gt(e));
		}
		function Zt() {
			let e = F.value;
			e && (Math.abs(e.volume - m.volume) > .001 && m.setVolume(e.volume), e.muted !== m.muted && m.toggleMute());
		}
		function Qt() {
			let e = F.value;
			e && e.playbackRate !== m.rate && m.setRate(e.playbackRate), m.setMediaPositionState();
		}
		function $t() {
			m.setMediaPositionState();
		}
		function en() {
			m.setMediaPositionState();
		}
		function K(e) {
			let t = F.value;
			t && m.duration > 0 && (t.currentTime = Math.min(m.duration, Math.max(0, e)));
		}
		function tn() {
			B.value = !0, yn();
		}
		function nn() {
			B.value = !1, yn();
		}
		function rn(e) {
			let t = M.reduce((e, t, n) => Math.abs(t - m.rate) < Math.abs(M[e] - m.rate) ? n : e, 0), n = M[Math.min(M.length - 1, Math.max(0, t + e))];
			m.setRate(n);
		}
		function an() {
			if (!d.markers) return;
			let e = m.position, t = d.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && K(t.startMs / 1e3);
		}
		function on() {
			if (!d.markers) return;
			let e = m.position, t = d.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && K(t.startMs / 1e3);
		}
		function sn() {
			re.value?.toggleOpen();
		}
		let cn = null;
		function ln() {
			let e = F.value;
			if (!e) {
				m.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), m.pause();
				return;
			}
			cn !== null && (clearInterval(cn), cn = null);
			let t = .05;
			cn = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(cn), cn = null, e.volume = 0, e.pause(), m.pause());
			}, 50);
		}
		Ao({
			playPause: Wt,
			seekBy: (e) => K(m.position + e),
			frameStep: (e) => {
				m.playing || K(m.position + e / 30);
			},
			volumeBy: (e) => m.setVolume(m.volume + e),
			toggleMute: un,
			toggleFullscreen: fn,
			toggleCaptions: Nt,
			toggleTheater: dn,
			togglePip: mn,
			skipIntro: an,
			skipOutro: on,
			sleepTimer: sn,
			seekToPercent: (e) => K(e * m.duration),
			speedStep: rn,
			toggleHelp: () => {
				ee.value = !ee.value;
			},
			toggleQuality: () => {
				U.value ? (ae.value = !ae.value, ie.value?.toggleMenu?.()) : oe.show({
					message: b("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !ee.value && !ft.value && !bt.value });
		function un() {
			m.toggleMute();
		}
		function dn() {
			V.value = !V.value, p("theater", V.value);
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
			e && (e.type === "seekTo" ? et(e.value) : e.type === "seekBy" && et(m.position + e.value));
		});
		function fn() {
			if (typeof document > "u") return;
			let e = I.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function pn() {
			z.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function mn() {
			let e = F.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			p("pip");
		}
		function hn() {
			H.value = !0;
		}
		function gn() {
			H.value = !1;
		}
		function _n() {
			Lt &&= (clearTimeout(Lt), void 0);
		}
		function vn() {
			_n(), !(!m.playing || B.value) && (Lt = setTimeout(() => {
				m.playing && !B.value && (R.value = !1);
			}, d.idleTimeout ?? 3e3));
		}
		function yn() {
			R.value = !0, vn();
		}
		N(() => m.playing, (e) => {
			e ? (Ne.value = !1, st(), vn()) : (_n(), R.value = !0);
		});
		let bn = null;
		y(() => {
			m.setCurrent(d.media, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), T.hydrate(d.media), typeof document < "u" && (document.addEventListener("fullscreenchange", pn), te.value = document.pictureInPictureEnabled === !0), bn = m.bindMediaSession({
				onPlay: () => void F.value?.play()?.catch(() => {}),
				onPause: () => F.value?.pause(),
				onSeek: (e) => K(e)
			}), It = F.value?.textTracks ?? null, It?.addEventListener?.("addtrack", Mt), It?.addEventListener?.("removetrack", Mt), Mt(), U.value && Te(), be(d.media.id);
		}), N(() => d.media, (e) => {
			m.setCurrent(e, {
				resetPosition: !1,
				streamUrl: d.streamUrl
			}), $e();
		}), N(() => d.media?.id, () => {
			T.hydrate(d.media);
		}), N(() => w.currentSession, (e) => {
			e && (e.state === "playing" ? (F.value?.play(), m.play()) : e.state === "paused" && (F.value?.pause(), m.pause()), w.updateLocalPosition(m.position), Math.abs(w.driftAmount) > 2 && et(e.playbackPosition));
		});
		let xn = null;
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
				}), F.value?.play(), m.play(), w.consumePendingPlayMedia(), xn = null;
				return;
			}
			let n = `${e.mediaId}@${e.issuedAt}`;
			xn !== n && (xn = n, p("pending-media", e.mediaId, e.title));
		}), v(() => {
			_n(), rt(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", pn), bn?.(), It?.removeEventListener?.("addtrack", Mt), It?.removeEventListener?.("removetrack", Mt), cn !== null && (clearInterval(cn), cn = null), ye !== null && (clearTimeout(ye), ye = null);
		}), (n, r) => (x(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: g(["player", {
				"is-chrome-hidden": !R.value,
				"is-theater": V.value
			}]),
			onPointermove: yn,
			onPointerdown: yn,
			onFocusin: yn
		}, [u(ol, {
			video: F.value,
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
		]), s("div", ff, [
			s("video", {
				ref_key: "videoRef",
				ref: F,
				class: "player__video",
				src: Se.value,
				poster: O(c)(t.media.poster_url) ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Kt,
				onPause: qt,
				onTimeupdate: Jt,
				onLoadedmetadata: Yt,
				onCanplay: Vt,
				onProgress: Xt,
				onVolumechange: Zt,
				onRatechange: Qt,
				onSeeked: $t,
				onDurationchange: en,
				onEnded: at,
				onError: ct,
				onEnterpictureinpicture: hn,
				onLeavepictureinpicture: gn,
				onClick: Wt
			}, [(x(!0), o(e, null, C(St.value, (e) => (x(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0
			}, null, 8, mf))), 128))], 40, pf),
			r[20] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[21] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", hf, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": O(b)("player.back"),
				onClick: r[0] ||= L((e) => p("back"), ["stop"])
			}, [u(q, { name: "arrow-left" })], 8, gf), s("div", _f, [
				s("p", vf, E(O(b)("player.nowPlaying")), 1),
				s("h2", yf, E(t.media.name), 1),
				s("div", bf, [(x(!0), o(e, null, C(Rt.value, (t, n) => (x(), o(e, { key: n }, [n > 0 && !t.cert ? (x(), o("span", xf, "·")) : a("", !0), s("span", { class: g({ player__cert: t.cert }) }, E(t.text), 3)], 64))), 128))])
			])]),
			G.value ? a("", !0) : (x(), o("div", Sf, [s("button", {
				type: "button",
				class: g(["player__bigplay", { "is-playing": O(m).playing }]),
				"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
				onClick: L(Wt, ["stop"])
			}, [u(q, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Cf)])),
			u(Ps, {
				video: F.value,
				language: O(m).subtitleLang,
				"style-config": O(_).captionStyle,
				lifted: R.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			G.value ? a("", !0) : (x(), o("div", {
				key: 1,
				class: "player__controls",
				onClick: r[7] ||= L(() => {}, ["stop"])
			}, [
				u(Va, {
					position: O(m).position,
					duration: O(m).duration,
					buffered: O(m).buffered,
					chapters: t.chapters,
					"thumbnail-at": xe.value,
					onSeek: K,
					onScrubStart: tn,
					onScrubEnd: nn
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				O(_).showMarkerTimeline && t.markers && t.markers.length > 0 ? (x(), i(Pu, {
					key: 0,
					position: O(m).position,
					duration: O(m).duration,
					markers: t.markers,
					onSeek: K,
					onSimilar: We
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", wf, [
					t.prevEpisode ? (x(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.previousEpisode"),
						onClick: Ht
					}, [u(q, { name: "skip-back" })], 8, Tf)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": O(m).playing ? O(b)("player.pause") : O(b)("player.play"),
						onClick: Wt
					}, [u(q, { name: O(m).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ef),
					t.nextEpisode ? (x(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.nextEpisode"),
						onClick: Ut
					}, [u(q, { name: "skip-forward" })], 8, Df)) : a("", !0),
					s("span", Of, [
						l(E(O(Sa)(O(m).position)), 1),
						r[16] ||= s("span", { class: "player__sep" }, " / ", -1),
						l(E(O(Sa)(O(m).duration)), 1)
					]),
					r[17] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__favorite", { "is-on": D.value }]),
						"aria-label": D.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": D.value ? "true" : "false",
						onClick: A
					}, [u(q, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, kf),
					u(xa, {
						level: k.value,
						onCycle: j
					}, null, 8, ["level"]),
					u(Uo),
					u(Qo),
					u(ls, {
						ref_key: "qualityMenuRef",
						ref: ie,
						open: ae.value,
						"onUpdate:open": r[1] ||= (e) => ae.value = e,
						levels: O(W).levels.value,
						variants: O(W).variants.value,
						"current-level": O(W).currentLevel.value,
						"auto-enabled": O(W).autoEnabled.value,
						"active-height": O(W).activeLevelHeight.value,
						onSelect: Ee
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
					}, E(O(b)("player.directStream")), 9, Af)),
					u(lc, {
						open: ft.value,
						"onUpdate:open": r[2] ||= (e) => ft.value = e,
						tracks: lt.value,
						"audio-tracks": vt.value,
						"active-audio": yt.value,
						onSelectAudio: Ft,
						onAddSubtitles: r[3] ||= (e) => Ct.value = !0
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					u(Eu, {
						open: bt.value,
						"onUpdate:open": r[4] ||= (e) => bt.value = e,
						chapters: t.chapters ?? [],
						onSeek: K
					}, null, 8, ["open", "chapters"]),
					u(zu, {
						ref_key: "sleepTimerRef",
						ref: re,
						"on-expire": ln
					}, null, 512),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__syncplay", { "is-on": O(w).isInRoom }]),
						"aria-label": O(w).isInRoom ? O(b)("syncplay.inRoom") : O(b)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => se.value = !0
					}, [u(q, { name: "user" })], 10, jf),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": O(b)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[6] ||= (e) => ee.value = !0
					}, [u(q, { name: "info" })], 8, Mf),
					te.value ? (x(), o("button", {
						key: 3,
						type: "button",
						class: g(["player__iconbtn", { "is-on": H.value }]),
						"aria-label": H.value ? O(b)("player.exitPip") : O(b)("player.pip"),
						"aria-pressed": H.value,
						onClick: mn
					}, [u(q, { name: "pip" })], 10, Nf)) : a("", !0),
					s("button", {
						type: "button",
						class: g(["player__iconbtn", { "is-on": V.value }]),
						"aria-label": V.value ? O(b)("player.exitTheater") : O(b)("player.theater"),
						"aria-pressed": V.value,
						onClick: dn
					}, [u(q, { name: "theater" })], 10, Pf),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": z.value ? O(b)("player.exitFullscreen") : O(b)("player.fullscreen"),
						onClick: fn
					}, [u(q, { name: z.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Ff)
				])
			])),
			G.value ? a("", !0) : (x(), i(su, {
				key: 2,
				position: O(m).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: K
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			G.value ? a("", !0) : (x(), i(pu, {
				key: 3,
				position: O(m).position,
				markers: t.markers,
				onSkip: K
			}, null, 8, ["position", "markers"])),
			Ne.value && !G.value ? (x(), i(dl, {
				key: 4,
				seconds: Me.value,
				onResume: tt,
				onRestart: nt
			}, null, 8, ["seconds"])) : a("", !0),
			Fe.value && Qe.value && !G.value ? (x(), i(Yl, {
				key: 5,
				media: Qe.value,
				remaining: Ie.value,
				total: O(8),
				counting: O(_).autoplay,
				onPlayNow: ot,
				onCancel: st
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			u(hc, {
				modelValue: Be.value,
				"onUpdate:modelValue": r[8] ||= (e) => Be.value = e,
				title: `Similar ${Re.value ?? "marker"}s`,
				size: "lg",
				onClose: Ze
			}, {
				default: P(() => [s("div", If, [He.value ? (x(), o("div", Lf, [u(Tc, { label: "Finding similar media" })])) : Ue.value ? (x(), o("div", Rf, [u(q, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", zf, E(Ue.value), 1)])) : !He.value && Ve.value.length === 0 ? (x(), o("div", Bf, [
					u(q, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[18] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[19] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (x(), o("ul", Vf, [(x(!0), o(e, null, C(Ve.value, (e) => (x(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", Hf, [e.poster_url ? (x(), o("img", {
					key: 0,
					src: O(c)(e.poster_url),
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Uf)) : (x(), o("div", Wf, [u(q, { name: "film" })]))]), s("div", Gf, [s("p", Kf, E(e.name), 1), e.year ? (x(), o("p", qf, [l(E(e.year) + " ", 1), e.runtime ? (x(), o("span", Jf, " · " + E(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			Ce.value ? (x(), i(ou, {
				key: 6,
				title: t.media.name,
				progress: O(W).progress.value,
				onBack: r[9] ||= (e) => p("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			we.value ? (x(), i(eu, {
				key: 7,
				title: t.media.name,
				onBack: r[10] ||= (e) => p("back")
			}, null, 8, ["title"])) : a("", !0),
			O(w).isInRoom ? (x(), i(lf, {
				key: 8,
				position: O(m).position,
				duration: O(m).duration,
				"is-playing": O(m).playing,
				onSeek: K,
				onPlay: r[11] ||= (e) => void F.value?.play(),
				onPause: r[12] ||= (e) => void F.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			O(w).isInRoom ? (x(), i(Md, { key: 9 })) : a("", !0),
			u(Qd, {
				modelValue: se.value,
				"onUpdate:modelValue": r[13] ||= (e) => se.value = e,
				onJoined: ce
			}, null, 8, ["modelValue"]),
			u(zo, {
				open: ee.value,
				onClose: r[14] ||= (e) => ee.value = !1
			}, null, 8, ["open"]),
			u(Yc, {
				open: Ct.value,
				"onUpdate:open": r[15] ||= (e) => Ct.value = e,
				"media-id": t.media.id,
				"api-base": t.apiBase ?? "",
				"preferred-langs": Tt.value,
				onAdded: Et
			}, null, 8, [
				"open",
				"media-id",
				"api-base",
				"preferred-langs"
			])
		])], 34));
	}
}), [["__scopeId", "data-v-82edb4b3"]]), Xf = ["aria-label"], Zf = ["src", "poster"], Qf = { class: "mini__body" }, $f = { class: "mini__title" }, ep = { class: "mini__controls" }, tp = ["aria-label"], np = ["aria-label", "aria-pressed"], rp = ["aria-label"], ip = ["aria-label"], ap = {
	class: "mini__progress",
	"aria-hidden": "true"
}, op = /*#__PURE__*/ J(/* @__PURE__ */ d({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let { imgSrc: c } = Rl(), l = t, d = ue(), { t: p } = Y(), m = S(null), h = S(null), b = f("resumeReporter", null), C = !1, w = Ye(), T = f("phlixConfig", null), D = r(() => d.current ? w.isFavorite(d.current.id) : !1);
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
			d.closePlayer();
		}
		async function H() {
			let e = m.value;
			!e || !d.hlsMasterUrl || (h.value?.destroy(), h.value = null, h.value = await Xa(e, d.hlsMasterUrl, {
				startPosition: d.position,
				onReady: () => {
					let e = m.value;
					e && (e.volume = d.volume, e.muted = d.muted, e.playbackRate = d.rate, d.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return N(() => A.value, async (e) => {
			if (!e) {
				h.value?.destroy(), h.value = null;
				return;
			}
			!d.hlsMasterUrl || d.streamUrl || await H();
		}), y(async () => {
			A.value && d.hlsMasterUrl && !d.streamUrl && await H();
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
			h.value?.destroy(), h.value = null, m.value?.pause?.();
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
				}, null, 40, Zf),
				s("div", Qf, [s("p", $f, E(j.value), 1), s("div", ep, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(d).playing ? O(p)("player.pause") : O(p)("player.play"),
						onClick: B
					}, [u(q, { name: O(d).playing ? "pause" : "play" }, null, 8, ["name"])], 8, tp),
					O(d).current ? (x(), o("button", {
						key: 0,
						type: "button",
						class: g(["mini__btn mini__btn--favorite", { "is-on": D.value }]),
						"aria-label": D.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": D.value ? "true" : "false",
						onClick: k
					}, [u(q, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, np)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": O(p)("player.expand"),
						onClick: ee
					}, [u(q, { name: "expand" })], 8, rp),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": O(p)("player.closePlayer"),
						onClick: V
					}, [u(q, { name: "x" })], 8, ip)
				])]),
				s("div", ap, [s("div", {
					class: "mini__progress-fill",
					style: _({ transform: `scaleX(${M.value})` })
				}, null, 4)])
			], 8, Xf)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-ceaec05c"]]);
//#endregion
export { Zc as AMBIENT_SAMPLE_H, Qc as AMBIENT_SAMPLE_INTERVAL_MS, Xc as AMBIENT_SAMPLE_W, To as ARROW_ICONS, Eo as ARROW_LABELS, ol as AmbientCanvas, ks as CAPTION_BACKGROUND_OPTIONS, Os as CAPTION_COLOR_OPTIONS, As as CAPTION_EDGE_OPTIONS, Ds as CAPTION_SIZE_OPTIONS, Es as CAPTION_SIZE_SCALE, Ps as CaptionOverlay, lc as CaptionsMenu, fl as DIRECT_PLAY_EXTENSIONS, op as MiniPlayer, wo as PLAYER_SHORTCUTS, Yf as Player, ls as QualityMenu, ie as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, dl as ResumePrompt, Va as Scrubber, zo as ShortcutsHelp, su as SkipButton, Qo as SpeedMenu, Yc as SubtitleSearch, pl as TRANSCODE_EXTENSIONS, eu as TranscodeNotice, ou as TranscodePreparing, yl as UPNEXT_COUNTDOWN_SECONDS, xl as UPNEXT_RING_CIRCUMFERENCE, bl as UPNEXT_RING_RADIUS, Yl as UpNext, Uo as VolumeControl, bs as activeAudioIndex, il as ambientGradient, ys as applyAudioTrack, vs as applyTrackModes, Xa as attachHls, el as averageRegion, Ns as captionStyleVars, ws as cleanCueText, Ms as edgeShadow, hl as extensionOf, Sa as formatTime, ko as handleShortcut, _s as hasActiveCaptions, al as isBatterySaving, co as isFailedStatus, _l as isFatalMediaError, Ka as isNativeHlsSupported, so as isPlayable, Oo as isTypingTarget, hs as listAudioTracks, ms as listSubtitleTracks, gl as needsTranscode, to as parseSubtitleTracks, ao as parseTranscodeStart, oo as parseTranscodeStatus, Ts as readActiveCueLines, lo as resolveStreamUrl, gs as resolveTextTrack, nl as rgbString, rl as rgbaString, Sl as ringDashoffset, tl as sampleAmbient, ro as transcodeStartPath, io as transcodeStatusPath, uo as useHlsTranscode, Ao as useKeyboardShortcuts, ue as usePlayerStore };

//# sourceMappingURL=player.js.map