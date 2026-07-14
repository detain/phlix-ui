import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, markRaw as f, nextTick as p, normalizeClass as m, normalizeStyle as h, onBeforeUnmount as g, onMounted as _, openBlock as v, ref as y, renderList as b, renderSlot as x, resolveDynamicComponent as S, toDisplayString as C, toRef as w, unref as T, useId as E, vModelText as D, vShow as O, watch as k, withCtx as A, withDirectives as j, withModifiers as M } from "vue";
import { defineStore as N } from "pinia";
//#region src/stores/usePreferencesStore.ts
var P = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, F = {
	theme: "nocturne",
	accent: null,
	density: "comfortable",
	cardSize: 200,
	gridDensity: "comfy",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	defaultAudioLang: null,
	subtitlePreferenceSet: !1,
	captionStyle: { ...P },
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
function I(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var L = "phlix.prefs";
function R() {
	if (typeof localStorage > "u") return { ...F };
	try {
		let e = localStorage.getItem(L);
		if (!e) return { ...F };
		let t = JSON.parse(e);
		return {
			...F,
			...t
		};
	} catch {
		return { ...F };
	}
}
function z() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var ee = N("phlix-prefs", () => {
	let e = R(), t = y(e.theme), n = y(e.accent), i = y(e.density), a = y(e.cardSize), o = y(e.gridDensity), s = y(e.reducedMotion), c = y(e.autoplay), l = y(e.defaultVolume), u = y(e.defaultQuality), d = y(e.defaultSubtitleLang), f = y(e.defaultAudioLang), p = y(e.subtitlePreferenceSet), m = y({
		...P,
		...e.captionStyle
	}), h = y(e.atmosphere), g = y(e.tv), _ = y(e.filterPresets ? [...e.filterPresets] : []), v = y(e.showMarkerTimeline), b = y(e.crossfadeDuration), x = y(e.crossfadeFadeIn), S = y(e.crossfadeFadeOut), C = y(e.gaplessEnabled), w = y(e.preferredAudioQuality), T = y(z()), E = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (E = window.matchMedia("(prefers-reduced-motion: reduce)"), E.addEventListener?.("change", (e) => T.value = e.matches));
	let D = r(() => s.value === "on" ? !0 : s.value === "off" ? !1 : T.value);
	function O() {
		return {
			theme: t.value,
			accent: n.value,
			density: i.value,
			cardSize: a.value,
			gridDensity: o.value,
			reducedMotion: s.value,
			autoplay: c.value,
			defaultVolume: l.value,
			defaultQuality: u.value,
			defaultSubtitleLang: d.value,
			defaultAudioLang: f.value,
			subtitlePreferenceSet: p.value,
			captionStyle: m.value,
			atmosphere: h.value,
			tv: g.value,
			filterPresets: _.value,
			showMarkerTimeline: v.value,
			crossfadeDuration: b.value,
			crossfadeFadeIn: x.value,
			crossfadeFadeOut: S.value,
			gaplessEnabled: C.value,
			preferredAudioQuality: w.value
		};
	}
	function A(e, t) {
		let n = {
			id: I(e),
			name: e.trim(),
			query: t
		}, r = _.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? _.value.splice(r, 1, n) : _.value.push(n), n;
	}
	function j(e) {
		_.value = _.value.filter((t) => t.id !== e);
	}
	let M = null;
	function N() {
		M !== null && (clearTimeout(M), M = null);
		let e = O();
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(L, JSON.stringify(e));
		} catch {}
	}
	k(O, (e) => {
		M !== null && clearTimeout(M), M = setTimeout(() => {
			M = null;
			try {
				localStorage.setItem(L, JSON.stringify(e));
			} catch {}
		}, 250);
	}, { deep: !0 }), typeof window < "u" && window.addEventListener("pagehide", N);
	function ee() {
		let e = F;
		t.value = e.theme, n.value = e.accent, i.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.reducedMotion, c.value = e.autoplay, l.value = e.defaultVolume, u.value = e.defaultQuality, d.value = e.defaultSubtitleLang, f.value = e.defaultAudioLang, p.value = e.subtitlePreferenceSet, m.value = { ...P }, h.value = e.atmosphere, g.value = e.tv, _.value = [...e.filterPresets], v.value = e.showMarkerTimeline, b.value = e.crossfadeDuration, x.value = e.crossfadeFadeIn, S.value = e.crossfadeFadeOut, C.value = e.gaplessEnabled, w.value = e.preferredAudioQuality;
	}
	return {
		theme: t,
		accent: n,
		density: i,
		cardSize: a,
		gridDensity: o,
		reducedMotion: s,
		autoplay: c,
		defaultVolume: l,
		defaultQuality: u,
		defaultSubtitleLang: d,
		defaultAudioLang: f,
		subtitlePreferenceSet: p,
		captionStyle: m,
		atmosphere: h,
		tv: g,
		filterPresets: _,
		showMarkerTimeline: v,
		crossfadeDuration: b,
		crossfadeFadeIn: x,
		crossfadeFadeOut: S,
		gaplessEnabled: C,
		preferredAudioQuality: w,
		systemReduced: T,
		effectiveReducedMotion: D,
		snapshot: O,
		saveFilterPreset: A,
		removeFilterPreset: j,
		reset: ee
	};
}), B = 30, V = .95, te = 5e3, ne = "phlix.resume", re = "phlix.resume.touched";
function ie() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(ne);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
function ae() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(re), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var oe = N("phlix-player", () => {
	let e = ee(), t = y(null), n = y(""), i = y([]), a = y(!1), o = y(0), s = y(0), c = y(0), l = y(e.defaultVolume), u = y(!1), d = y(1), f = y(e.defaultQuality), p = y(e.defaultSubtitleLang), m = y(""), h = y(!1), g = y(ie()), _ = y(ae()), v = y(null), b = 0, x = r(() => s.value > 0 ? o.value / s.value : 0), S = r(() => i.value[0] ?? null);
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
				localStorage.setItem(ne, JSON.stringify(g.value)), localStorage.setItem(re, JSON.stringify(_.value));
			};
			try {
				e();
			} catch {
				try {
					w(Math.floor(Object.keys(g.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - E;
		clearTimeout(T), e || n >= te ? t() : T = setTimeout(t, te - n);
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
			seq: ++b
		};
	}
	function I(e) {
		v.value = {
			type: "seekBy",
			value: e,
			seq: ++b
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
	function oe(e) {
		d.value = e;
	}
	function H(e) {
		f.value = e;
	}
	function se(e) {
		p.value = e;
	}
	function ce(e) {
		i.value = [...e];
	}
	function le(e) {
		i.value.push(e);
	}
	function U(e) {
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
		progress: x,
		upNext: S,
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
		setRate: oe,
		setQuality: H,
		setSubtitle: se,
		setQueue: ce,
		enqueue: le,
		next: U,
		showMiniPlayer: ue,
		hideMiniPlayer: W,
		closePlayer: de,
		setMediaSessionMetadata: fe,
		setMediaPositionState: pe,
		bindMediaSession: me,
		seedFromPreferences: he
	};
}), H = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, se = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, ce = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function le(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function U() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region src/api/tokenStore.ts
var ue = "access_token", W = "refresh_token", de = "user", fe = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(ue);
	}
	setAccessToken(e) {
		this.storage.setItem(ue, e);
	}
	getRefreshToken() {
		return this.storage.getItem(W);
	}
	setRefreshToken(e) {
		this.storage.setItem(W, e);
	}
	getUser() {
		let e = this.storage.getItem(de);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(de, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(ue), this.storage.removeItem(W), this.storage.removeItem(de);
	}
};
//#endregion
//#region src/api/client.ts
function pe() {
	return typeof window > "u" ? {
		getAccessToken: () => null,
		setAccessToken: () => {},
		getRefreshToken: () => null,
		setRefreshToken: () => {},
		getUser: () => null,
		setUser: () => {},
		clear: () => {}
	} : new fe();
}
var me = 15e3, he = {};
function ge(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r && (t[n] = r);
	return t;
}
function _e(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
function G(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function K(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function ve(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? "Unknown Artist", r = K(t.album_count);
	return {
		id: n,
		name: n,
		imageUrl: G(t.image_url),
		albumCount: r ?? void 0
	};
}
function ye(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = G(n.title) ?? G(t.name) ?? G(t.title) ?? "Unknown Track";
	return {
		id: G(t.id) ?? "",
		title: r,
		durationSecs: K(n.duration_secs) ?? K(t.duration_secs) ?? 0,
		trackNumber: K(n.track_number) ?? K(t.track_number),
		streamUrl: G(t.stream_url)
	};
}
function be(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? G(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [];
	return {
		id: n,
		title: n,
		albumArtUrl: G(t.album_art_url),
		year: K(t.year),
		totalTracks: K(t.track_count) ?? r.length,
		tracks: r.map(ye)
	};
}
var xe = class {
	baseUrl;
	tokens;
	doFetch;
	timeoutMs;
	instanceHeaders;
	loginPath;
	refreshPromise = null;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? pe(), this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? me, this.instanceHeaders = ge(e.headers ?? {}), this.loginPath = e.loginPath ?? "/login";
	}
	setBaseUrl(e) {
		this.baseUrl = e;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = {
				...he,
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
			throw s ? new ce() : r?.aborted || e instanceof H ? e : e instanceof TypeError || U() ? new se() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new H(this.extractError(t), e.status, t);
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
			...he,
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
			...he,
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
			is_admin: _e(e.is_admin)
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
	async listArtists(e) {
		let t = await this.get("/api/v1/music/artists", void 0, e);
		return (Array.isArray(t.artists) ? t.artists : []).map(ve);
	}
	async getArtist(e, t) {
		return ve((await this.get(`/api/v1/music/artists/${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e, t) {
		let n = await this.get("/api/v1/music/albums", void 0, t), r = Array.isArray(n.albums) ? n.albums : [];
		return (e === void 0 || e === "" ? r : r.filter((t) => G((t && typeof t == "object" ? t : {}).artist) === e)).map(be);
	}
	async getAlbum(e, t) {
		return be((await this.get(`/api/v1/music/albums/${encodeURIComponent(e)}`, void 0, t)).album);
	}
	async listTracks(e, t) {
		let n = await this.get("/api/v1/music/tracks", void 0, t), r = Array.isArray(n.tracks) ? n.tracks : [];
		return (e === void 0 || e === "" ? r : r.filter((t) => G((t && typeof t == "object" ? t : {}).album) === e)).map(ye);
	}
	async getTrack(e, t) {
		return ye((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = this.loginPath);
	}
};
new xe();
//#endregion
//#region src/stores/useToastStore.ts
var Se = N("phlix-toast", () => {
	let e = y([]), t = /* @__PURE__ */ new Map(), n = 0;
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
}), Ce = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), we = N("user-item-data", () => {
	let e = y(/* @__PURE__ */ new Map()), t = null;
	function n(e) {
		return t ? t.setBaseUrl(e) : t = new xe({ baseUrl: e }), t;
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
		return e.value.get(t) ?? { ...Ce };
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
		let r = e.value.get(t) ?? { ...Ce };
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
			Se().error(`Failed to ${n} favorites: ${le(t)}`);
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
			Se().error(`Failed to mark ${n}: ${le(t)}`);
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
			c(e, { like_level: o }), Se().error(`Failed to set rating: ${le(t)}`);
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
}), Te = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ee(e, t) {
	return v(), o("svg", Te, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var De = f({
	name: "lucide-play",
	render: Ee
}), Oe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ke(e, t) {
	return v(), o("svg", Oe, [...t[0] ||= [s("g", {
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
var Ae = f({
	name: "lucide-pause",
	render: ke
}), je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Me(e, t) {
	return v(), o("svg", je, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var Ne = f({
	name: "lucide-skip-back",
	render: Me
}), Pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fe(e, t) {
	return v(), o("svg", Pe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var Ie = f({
	name: "lucide-skip-forward",
	render: Fe
}), Le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Re(e, t) {
	return v(), o("svg", Le, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var ze = f({
	name: "lucide-rotate-ccw",
	render: Re
}), Be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ve(e, t) {
	return v(), o("svg", Be, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var He = f({
	name: "lucide-rotate-cw",
	render: Ve
}), Ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function We(e, t) {
	return v(), o("svg", Ue, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Ge = f({
	name: "lucide-volume-2",
	render: We
}), Ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qe(e, t) {
	return v(), o("svg", Ke, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var Je = f({
	name: "lucide-volume-1",
	render: qe
}), Ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xe(e, t) {
	return v(), o("svg", Ye, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var Ze = f({
	name: "lucide-volume-x",
	render: Xe
}), Qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $e(e, t) {
	return v(), o("svg", Qe, [...t[0] ||= [s("g", {
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
var et = f({
	name: "lucide-captions",
	render: $e
}), tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nt(e, t) {
	return v(), o("svg", tt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var rt = f({
	name: "lucide-captions-off",
	render: nt
}), it = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function at(e, t) {
	return v(), o("svg", it, [...t[0] ||= [s("g", {
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
var ot = f({
	name: "lucide-picture-in-picture-2",
	render: at
}), st = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ct(e, t) {
	return v(), o("svg", st, [...t[0] ||= [s("rect", {
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
var lt = f({
	name: "lucide-rectangle-horizontal",
	render: ct
}), ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dt(e, t) {
	return v(), o("svg", ut, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var ft = f({
	name: "lucide-maximize",
	render: dt
}), pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mt(e, t) {
	return v(), o("svg", pt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var ht = f({
	name: "lucide-minimize",
	render: mt
}), gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _t(e, t) {
	return v(), o("svg", gt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var vt = f({
	name: "lucide-maximize-2",
	render: _t
}), yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bt(e, t) {
	return v(), o("svg", yt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var xt = f({
	name: "lucide-cast",
	render: bt
}), St = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ct(e, t) {
	return v(), o("svg", St, [...t[0] ||= [s("g", {
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
var wt = f({
	name: "lucide-settings",
	render: Ct
}), Tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Et(e, t) {
	return v(), o("svg", Tt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Dt = f({
	name: "lucide-gauge",
	render: Et
}), Ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kt(e, t) {
	return v(), o("svg", Ot, [...t[0] ||= [s("g", {
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
var At = f({
	name: "lucide-film",
	render: kt
}), jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mt(e, t) {
	return v(), o("svg", jt, [...t[0] ||= [s("g", {
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
var Nt = f({
	name: "lucide-image",
	render: Mt
}), Pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ft(e, t) {
	return v(), o("svg", Pt, [...t[0] ||= [s("g", {
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
var It = f({
	name: "lucide-music",
	render: Ft
}), Lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function q(e, t) {
	return v(), o("svg", Lt, [...t[0] ||= [s("g", {
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
var Rt = f({
	name: "lucide-tv",
	render: q
}), zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bt(e, t) {
	return v(), o("svg", zt, [...t[0] ||= [s("g", {
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
var Vt = f({
	name: "lucide-search",
	render: Bt
}), Ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ut(e, t) {
	return v(), o("svg", Ht, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Wt = f({
	name: "lucide-sliders-horizontal",
	render: Ut
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return v(), o("svg", Gt, [...t[0] ||= [s("g", {
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
var qt = f({
	name: "lucide-calendar",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return v(), o("svg", Jt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Xt = f({
	name: "lucide-arrow-up-down",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qt(e, t) {
	return v(), o("svg", Zt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var $t = f({
	name: "lucide-star",
	render: Qt
}), en = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tn(e, t) {
	return v(), o("svg", en, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var nn = f({
	name: "lucide-list",
	render: tn
}), rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function an(e, t) {
	return v(), o("svg", rn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var on = f({
	name: "lucide-plus",
	render: an
}), sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cn(e, t) {
	return v(), o("svg", sn, [...t[0] ||= [s("g", {
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
var ln = f({
	name: "lucide-info",
	render: cn
}), un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dn(e, t) {
	return v(), o("svg", un, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var fn = f({
	name: "lucide-x",
	render: dn
}), pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mn(e, t) {
	return v(), o("svg", pn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var hn = f({
	name: "lucide-check",
	render: mn
}), gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _n(e, t) {
	return v(), o("svg", gn, [...t[0] ||= [s("g", {
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
var vn = f({
	name: "lucide-lock",
	render: _n
}), yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bn(e, t) {
	return v(), o("svg", yn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var xn = f({
	name: "lucide-bookmark",
	render: bn
}), Sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cn(e, t) {
	return v(), o("svg", Sn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var wn = f({
	name: "lucide-bookmark-plus",
	render: Cn
}), Tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function En(e, t) {
	return v(), o("svg", Tn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Dn = f({
	name: "lucide-heart",
	render: En
}), On = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kn(e, t) {
	return v(), o("svg", On, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var An = f({
	name: "lucide-thumbs-up",
	render: kn
}), jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mn(e, t) {
	return v(), o("svg", jn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var Nn = f({
	name: "lucide-thumbs-down",
	render: Mn
}), Pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fn(e, t) {
	return v(), o("svg", Pn, [...t[0] ||= [s("g", {
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
var In = f({
	name: "lucide-user",
	render: Fn
}), Ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rn(e, t) {
	return v(), o("svg", Ln, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var zn = f({
	name: "lucide-log-out",
	render: Rn
}), Bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vn(e, t) {
	return v(), o("svg", Bn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Hn = f({
	name: "lucide-menu",
	render: Vn
}), Un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wn(e, t) {
	return v(), o("svg", Un, [...t[0] ||= [s("g", {
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
var Gn = f({
	name: "lucide-more-horizontal",
	render: Wn
}), Kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qn(e, t) {
	return v(), o("svg", Kn, [...t[0] ||= [s("g", {
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
var Jn = f({
	name: "lucide-eye",
	render: qn
}), Yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xn(e, t) {
	return v(), o("svg", Yn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Zn = f({
	name: "lucide-eye-off",
	render: Xn
}), Qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $n(e, t) {
	return v(), o("svg", Qn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var er = f({
	name: "lucide-arrow-left",
	render: $n
}), tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nr(e, t) {
	return v(), o("svg", tr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var rr = f({
	name: "lucide-arrow-right",
	render: nr
}), ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ar(e, t) {
	return v(), o("svg", ir, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var or = f({
	name: "lucide-arrow-up",
	render: ar
}), sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cr(e, t) {
	return v(), o("svg", sr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var lr = f({
	name: "lucide-arrow-down",
	render: cr
}), ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dr(e, t) {
	return v(), o("svg", ur, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var fr = f({
	name: "lucide-chevron-down",
	render: dr
}), pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mr(e, t) {
	return v(), o("svg", pr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var hr = f({
	name: "lucide-chevron-up",
	render: mr
}), gr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _r(e, t) {
	return v(), o("svg", gr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var vr = f({
	name: "lucide-chevron-left",
	render: _r
}), yr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function br(e, t) {
	return v(), o("svg", yr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var xr = f({
	name: "lucide-chevron-right",
	render: br
}), Sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cr(e, t) {
	return v(), o("svg", Sr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var wr = f({
	name: "lucide-loader-circle",
	render: Cr
}), Tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Er(e, t) {
	return v(), o("svg", Tr, [...t[0] ||= [s("g", {
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
var Dr = f({
	name: "lucide-circle-alert",
	render: Er
}), Or = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kr(e, t) {
	return v(), o("svg", Or, [...t[0] ||= [s("g", {
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
var Ar = f({
	name: "lucide-circle-check",
	render: kr
}), jr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mr(e, t) {
	return v(), o("svg", jr, [...t[0] ||= [s("g", {
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
var Nr = f({
	name: "lucide-circle-x",
	render: Mr
}), Pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fr(e, t) {
	return v(), o("svg", Pr, [...t[0] ||= [s("g", {
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
var Ir = f({
	name: "lucide-sun",
	render: Fr
}), Lr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rr(e, t) {
	return v(), o("svg", Lr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var zr = f({
	name: "lucide-moon",
	render: Rr
}), Br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vr(e, t) {
	return v(), o("svg", Br, [...t[0] ||= [s("g", {
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
var Hr = f({
	name: "lucide-monitor",
	render: Vr
}), J = /* @__PURE__ */ u({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = {
			play: De,
			pause: Ae,
			"skip-back": Ne,
			"skip-forward": Ie,
			rewind: ze,
			forward: He,
			volume: Ge,
			"volume-low": Je,
			mute: Ze,
			captions: et,
			"captions-off": rt,
			pip: ot,
			theater: lt,
			fullscreen: ft,
			"fullscreen-exit": ht,
			expand: vt,
			cast: xt,
			settings: wt,
			speed: Dt,
			film: At,
			image: Nt,
			music: It,
			tv: Rt,
			search: Vt,
			filter: Wt,
			calendar: qt,
			sort: Xt,
			star: $t,
			list: nn,
			plus: on,
			info: ln,
			x: fn,
			check: hn,
			lock: vn,
			bookmark: xn,
			"bookmark-plus": wn,
			heart: Dn,
			"thumbs-up": An,
			"thumbs-down": Nn,
			user: In,
			"log-out": zn,
			menu: Hn,
			more: Gn,
			eye: Jn,
			"eye-off": Zn,
			"arrow-left": er,
			"arrow-right": rr,
			"arrow-up": or,
			"arrow-down": lr,
			"chevron-down": fr,
			"chevron-up": hr,
			"chevron-left": vr,
			"chevron-right": xr,
			spinner: wr,
			alert: Dr,
			success: Ar,
			error: Nr,
			sun: Ir,
			moon: zr,
			monitor: Hr
		}, n = e, a = r(() => t[n.name]), o = r(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (t, n) => (v(), i(S(a.value), {
			class: "phlix-icon",
			style: h(o.value ? { fontSize: o.value } : void 0),
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
}), Ur = ["data-level"], Wr = ["disabled", "aria-pressed"], Gr = ["disabled", "aria-pressed"], Kr = /*@__PURE__*/ u({
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
		let n = e, i = t, s = r(() => {
			let e = Math.trunc(Number(n.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), c = r(() => s.value >= 0), u = r(() => s.value <= 0), d = r(() => s.value >= 1), f = r(() => s.value === 2), p = r(() => s.value <= -1), h = r(() => s.value === -2);
		function g() {
			return s.value <= 0 ? 1 : s.value === 1 ? 2 : 0;
		}
		function _() {
			return s.value >= 0 ? -1 : s.value === -1 ? -2 : 0;
		}
		function y() {
			if (n.disabled) return;
			let e = g();
			i("cycle", e), i("update:level", e);
		}
		function b() {
			if (n.disabled) return;
			let e = _();
			i("cycle", e), i("update:level", e);
		}
		return (t, n) => (v(), o("div", {
			class: "thumb-rating",
			"data-level": s.value
		}, [c.value ? (v(), o("button", {
			key: 0,
			type: "button",
			class: m(["thumb-rating__btn thumb-rating__btn--up", {
				"is-filled": d.value,
				"is-blue": f.value
			}]),
			disabled: e.disabled,
			"aria-label": "Like",
			"aria-pressed": d.value ? "true" : "false",
			onClick: y
		}, [l(J, {
			name: "thumbs-up",
			class: "thumb-rating__icon"
		})], 10, Wr)) : a("", !0), u.value ? (v(), o("button", {
			key: 1,
			type: "button",
			class: m(["thumb-rating__btn thumb-rating__btn--down", {
				"is-filled": p.value,
				"is-blue": h.value
			}]),
			disabled: e.disabled,
			"aria-label": "Dislike",
			"aria-pressed": p.value ? "true" : "false",
			onClick: b
		}, [l(J, {
			name: "thumbs-down",
			class: "thumb-rating__icon"
		})], 10, Gr)) : a("", !0)], 8, Ur));
	}
}), Y = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, qr = /*#__PURE__*/ Y(Kr, [["__scopeId", "data-v-554f8af9"]]);
//#endregion
//#region src/components/player/format-time.ts
function X(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/i18n/messages.ts
var Jr = {
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
		mute: "Mute",
		unmute: "Unmute",
		volume: "Volume",
		playbackSpeed: "Playback speed",
		quality: "Quality",
		qualityAuto: "Auto",
		qualityAutoActive: "Auto ({label})",
		qualityOriginal: "Original ({height}p)",
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
		transcodeHeading: "Can’t play this file here",
		transcodeBodyTitled: "We couldn’t prepare a playable version of “{title}” right now. Please try again later.",
		transcodeBodyUntitled: "We couldn’t prepare a playable version of this title right now. Please try again later.",
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
		qualityLossless: "Lossless"
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
}, Yr = /\{(\w+)\}/g;
function Xr(e) {
	let t = {};
	for (let n of Object.keys(Jr)) {
		let r = Jr[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function Zr(e, t) {
	return t ? e.replace(Yr, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function Qr(e) {
	let t = Xr(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? Zr(s, n) : e;
	};
}
//#endregion
//#region src/composables/useMessages.ts
function Z() {
	return { t: Qr(d("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var $r = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], ei = { class: "scrubber__track" }, ti = ["title"], ni = { class: "scrubber__time numeric" }, ri = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let { t: c } = Z(), l = t, u = i, d = y(null), f = y(!1), p = y(!1), g = y(0), _ = y(0), x = (e) => Math.min(1, Math.max(0, e)), S = r(() => f.value ? g.value : l.duration > 0 ? x(l.position / l.duration) : 0), w = r(() => l.duration > 0 ? x(l.buffered / l.duration) : 0), E = r(() => (f.value || p.value) && l.duration > 0), D = r(() => f.value ? g.value : _.value), O = r(() => D.value * l.duration), k = r(() => E.value ? l.thumbnailAt?.(O.value) ?? null : null), A = r(() => k.value ? `url("${k.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), j = r(() => `${Math.min(96, Math.max(4, D.value * 100))}%`), M = r(() => l.duration > 0 ? l.chapters.filter((e) => e.start > 0 && e.start < l.duration).map((e) => ({
			...e,
			ratio: e.start / l.duration
		})) : []);
		function N(e) {
			let t = d.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : x((e.clientX - n.left) / n.width);
		}
		function P(e) {
			if (!(l.duration <= 0)) {
				f.value = !0;
				try {
					d.value?.setPointerCapture?.(e.pointerId);
				} catch {}
				g.value = N(e), u("scrub-start"), e.preventDefault();
			}
		}
		function F(e) {
			let t = N(e);
			_.value = t, f.value && (g.value = t);
		}
		function I(e) {
			if (f.value) {
				f.value = !1;
				try {
					d.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				u("seek", g.value * l.duration), u("scrub-end");
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
			playedRatio: S,
			previewActive: E
		}), (n, r) => (v(), o("div", {
			ref_key: "trackEl",
			ref: d,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(t.duration),
			"aria-valuenow": Math.round(t.position),
			"aria-valuetext": T(X)(t.position),
			"aria-label": T(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", ei, [
			s("div", {
				class: "scrubber__buffered",
				style: h({ transform: `scaleX(${w.value})` })
			}, null, 4),
			s("div", {
				class: "scrubber__played",
				style: h({ transform: `scaleX(${S.value})` })
			}, null, 4),
			(v(!0), o(e, null, b(M.value, (e, t) => (v(), o("span", {
				key: t,
				class: "scrubber__tick",
				style: h({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, ti))), 128)),
			s("div", {
				class: m(["scrubber__head", { "is-dragging": f.value }]),
				style: h({ left: `${S.value * 100}%` })
			}, null, 6)
		]), E.value ? (v(), o("div", {
			key: 0,
			class: "scrubber__preview",
			style: h({ left: j.value }),
			"aria-hidden": "true"
		}, [k.value ? (v(), o("div", {
			key: 0,
			class: "scrubber__thumb",
			style: h({ backgroundImage: A.value })
		}, null, 4)) : a("", !0), s("span", ni, C(T(X)(O.value)), 1)], 4)) : a("", !0)], 40, $r));
	}
}), [["__scopeId", "data-v-3d610715"]]), ii = "phlix-bandwidth-estimate";
function ai(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function oi() {
	try {
		let e = localStorage.getItem(ii);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? ai(t) : 0;
	} catch {
		return 0;
	}
}
function si(e) {
	try {
		localStorage.setItem(ii, String(e));
	} catch {}
}
function ci(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var li = null, ui = null;
function di() {
	li && si(li.bandwidthEstimate);
}
async function fi(e, t, n = {}) {
	if (typeof MediaSource > "u" && ci(e)) {
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
	let { default: r } = await import("./hls-Be5Qwv5L.js");
	if (r.isSupported()) {
		let i = oi(), a = new r({
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
		}), li = a, ui !== null && clearInterval(ui), ui = setInterval(di, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				si(a.bandwidthEstimate), ui !== null && (clearInterval(ui), ui = null), li = null;
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
var pi = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function Q(e, t = "") {
	return typeof e == "string" ? e : t;
}
function mi(e) {
	return e === !0 || e === "true" || e === 1;
}
function hi(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function gi(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = Q(e.url ?? e.src);
		r !== "" && t.push({
			index: hi(e.index),
			language: Q(e.language ?? e.lang ?? e.srclang),
			label: Q(e.label),
			default: mi(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function _i(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = hi(e.height);
		r <= 0 || t.push({
			id: Q(e.id),
			label: Q(e.label),
			height: r,
			width: hi(e.width),
			bitrate: hi(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function vi(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function yi(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function bi(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		masterUrl: Q(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: Q(t.status, "running"),
		reused: mi(t.reused),
		subtitles: gi(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: _i(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function xi(e) {
	let t = e ?? {};
	return {
		jobId: Q(t.job_id ?? t.jobId),
		status: Q(t.status, "running"),
		playlistReady: mi(t.playlist_ready ?? t.playlistReady),
		progress: hi(t.progress),
		masterUrl: Q(t.master_url ?? t.masterUrl),
		subtitles: gi(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: _i(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Si(e) {
	return e.playlistReady || e.status === "completed";
}
function Ci(e) {
	return pi.has(e);
}
function wi(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ti(e) {
	let t = y("idle"), n = y(0), r = y([]), i = y([]), a = y(-1), o = y(!0), s = y(null), c = y(null), l = y([]), u = y(-1), d = y(null), f = y(null);
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
			url: wi(n, e.url)
		}));
	}
	let b = e.attach ?? fi, x = e.pollIntervalMs ?? 1e3, S = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(S / Math.max(1, x))), T = Ei(), E = e.getToken ?? (() => Di(T)), D = null, O = null, k = null, A = !1, j = null;
	function M() {
		return e.client ?? new xe({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function N(i, a, o, s) {
		R(), A = !1, j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = M(), c = bi(await r.post(vi(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = wi(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < w; e++) {
				let e = xi(await r.get(yi(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), Ci(e.status)) throw Error(`transcode ${e.status}`);
				if (Si(e)) {
					l = !0;
					break;
				}
				if (await C(x), A) return;
			}
			if (!l) throw Error("transcode timed out");
			if (D = await b(i, f.value, {
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
				let e = oe();
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
function Ei() {
	try {
		return new fe();
	} catch {
		return null;
	}
}
function Di(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Oi = 10, ki = 6;
function Ai(e) {
	let t = y(null), n = y(!1), r = y(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new xe({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % Oi, s = Math.floor(i / Oi), c = a / (Oi - 1) * 100, l = s / (ki - 1) * 100;
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
var ji = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Mi = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		return (t, r) => (v(), o("button", {
			type: e.type,
			class: m(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [l(J, {
			name: e.loading ? "spinner" : e.name,
			class: m({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, ji));
	}
}), [["__scopeId", "data-v-48bb9819"]]), Ni = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Pi = 0, Fi = "";
function Ii() {
	Pi === 0 && (Fi = document.body.style.overflow, document.body.style.overflow = "hidden"), Pi++;
}
function Li() {
	Pi !== 0 && (Pi--, Pi === 0 && (document.body.style.overflow = Fi));
}
function Ri(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(Ni)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		i = document.activeElement, e.value?.setAttribute("data-focus-trap", ""), r && (Ii(), a = !0), document.addEventListener("keydown", s, !0), p(() => {
			e.value?.setAttribute("data-focus-trap", ""), (o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (Li(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	k(t, (e) => e ? c() : l(), { immediate: !0 }), g(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (Li(), !1);
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var zi = [
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
		id: "help",
		keys: ["?"],
		label: "This help"
	}
], Bi = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Vi = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Hi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Ui(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Wi(e, t) {
	switch (e.key) {
		case " ": return Hi(e.target) ? !1 : (t.playPause(), !0);
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
		default: return e.key >= "0" && e.key <= "9" ? (t.seekToPercent(Number(e.key) / 10), !0) : !1;
	}
}
function Gi(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Ui(n.target) || Wi(n, e) && n.preventDefault();
	}
	_(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), g(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Ki = ["aria-label"], qi = { class: "shortcuts__head" }, Ji = { class: "shortcuts__title" }, Yi = { class: "shortcuts__grid" }, Xi = { class: "shortcuts__keys" }, Zi = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Qi = {
	key: 1,
	class: "shortcuts__key"
}, $i = { class: "shortcuts__label" }, ea = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => zi }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, u = n, { t: d } = Z(), f = y(null);
		return Ri(f, w(r, "open"), {
			lockScroll: !1,
			onEscape: () => (u("close"), !0)
		}), (n, r) => t.open ? (v(), o("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= M((e) => u("close"), ["self"])
		}, [s("div", {
			ref_key: "panelEl",
			ref: f,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": T(d)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [s("div", qi, [s("h3", Ji, C(T(d)("player.keyboard")), 1), l(Mi, {
			name: "x",
			label: T(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => u("close")
		}, null, 8, ["label"])]), s("ul", Yi, [(v(!0), o(e, null, b(t.shortcuts, (t) => (v(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", Xi, [(v(!0), o(e, null, b(t.keys, (t, n) => (v(), o(e, { key: n }, [t === "–" ? (v(), o("span", Zi, "–")) : (v(), o("kbd", Qi, [T(Bi)[t] ? (v(), i(J, {
			key: 0,
			name: T(Bi)[t],
			label: T(Vi)[t] ?? t
		}, null, 8, ["name", "label"])) : (v(), o(e, { key: 1 }, [c(C(t), 1)], 64))]))], 64))), 128))]), s("span", $i, C(t.label), 1)]))), 128))])], 8, Ki)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), ta = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], na = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let n = e, i = t, a = y(null), c = y(!1), l = r(() => {
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
		function g(e) {
			n.disabled || (e.currentTarget.setPointerCapture?.(e.pointerId), c.value = !0, f(p(e.clientX)));
		}
		function _(e) {
			c.value && f(p(e.clientX));
		}
		function b(e) {
			c.value && (c.value = !1, e.currentTarget.releasePointerCapture?.(e.pointerId), i("change", n.modelValue));
		}
		function x(e) {
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
		return (t, n) => (v(), o("div", {
			class: m(["phlix-slider", { "is-disabled": e.disabled }]),
			role: "slider",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": e.modelValue,
			"aria-valuetext": u.value,
			"aria-disabled": e.disabled || void 0,
			"aria-orientation": "horizontal",
			onKeydown: x
		}, [s("div", {
			ref_key: "trackEl",
			ref: a,
			class: "phlix-slider__track",
			onPointerdown: g,
			onPointermove: _,
			onPointerup: b
		}, [s("div", {
			class: "phlix-slider__fill",
			style: h({ width: l.value + "%" })
		}, null, 4), s("div", {
			class: "phlix-slider__thumb",
			style: h({ left: l.value + "%" })
		}, null, 4)], 544)], 42, ta));
	}
}), [["__scopeId", "data-v-644a7ce9"]]), ra = { class: "volume" }, ia = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "VolumeControl",
	setup(e) {
		let t = oe(), n = ee(), { t: i } = Z(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return k(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (v(), o("div", ra, [l(Mi, {
			name: s.value,
			label: T(t).muted ? T(i)("player.unmute") : T(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => T(t).toggleMute()
		}, null, 8, ["name", "label"]), l(na, {
			class: "volume__slider",
			"model-value": a.value,
			min: 0,
			max: 1,
			step: .05,
			label: T(i)("player.volume"),
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
function aa(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function oa(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function sa(e, t) {
	return t === "first" ? oa(e, -1, 1) : oa(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var ca = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], la = ["id", "aria-label"], ua = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], da = { class: "phlix-select__check" }, fa = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "Select",
	props: {
		modelValue: {},
		options: {},
		placeholder: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		tone: { default: "default" }
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let u = t, { t: d } = Z(), f = n, h = r(() => aa(u.options)), _ = E(), x = y(!1), S = y(-1), w = y(null), D = y(null), A = "", M, N = r(() => h.value.findIndex((e) => e.value === u.modelValue)), P = r(() => h.value[N.value]?.label ?? ""), F = r(() => S.value >= 0 ? `${_}-opt-${S.value}` : void 0), I = y(!1);
		function L() {
			let e = w.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			I.value = n < 284 && r > n;
		}
		function R() {
			u.disabled || x.value || (L(), x.value = !0, S.value = N.value >= 0 ? N.value : sa(h.value, "first"), p(V));
		}
		function z() {
			x.value = !1;
		}
		function ee(e) {
			let t = h.value[e];
			!t || t.disabled || (t.value !== u.modelValue && (f("update:modelValue", t.value), f("change", t.value)), z(), w.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function B(e) {
			S.value = oa(h.value, S.value, e), p(V);
		}
		function V() {
			(D.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function te(e) {
			if (!u.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), x.value ? B(1) : R();
					break;
				case "ArrowUp":
					e.preventDefault(), x.value ? B(-1) : R();
					break;
				case "Home":
					x.value && (e.preventDefault(), S.value = sa(h.value, "first"), p(V));
					break;
				case "End":
					x.value && (e.preventDefault(), S.value = sa(h.value, "last"), p(V));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), x.value && S.value >= 0 ? ee(S.value) : R();
					break;
				case "Escape":
					x.value && (e.preventDefault(), z());
					break;
				case "Tab":
					z();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && ne(e.key);
			}
		}
		function ne(e) {
			x.value || R(), A += e.toLowerCase(), clearTimeout(M), M = setTimeout(() => A = "", 600);
			let t = h.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(A));
			t >= 0 && (S.value = t, p(V));
		}
		function re(e) {
			x.value && w.value && !w.value.contains(e.target) && z();
		}
		return k(x, (e) => {
			e ? document.addEventListener("pointerdown", re, !0) : document.removeEventListener("pointerdown", re, !0);
		}), g(() => {
			document.removeEventListener("pointerdown", re, !0), clearTimeout(M);
		}), (n, r) => (v(), o("div", {
			ref_key: "rootEl",
			ref: w,
			class: m(["phlix-select", {
				"is-open": x.value,
				"is-disabled": t.disabled,
				"is-glass": t.tone === "glass"
			}])
		}, [s("button", {
			type: "button",
			class: "phlix-select__trigger",
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": x.value,
			"aria-controls": x.value ? `${T(_)}-list` : void 0,
			"aria-activedescendant": x.value ? F.value : void 0,
			"aria-label": t.label,
			disabled: t.disabled,
			onClick: r[0] ||= (e) => x.value ? z() : R(),
			onKeydown: te
		}, [s("span", { class: m(["phlix-select__value", { "is-placeholder": N.value < 0 }]) }, C(N.value >= 0 ? P.value : t.placeholder ?? T(d)("common.selectPlaceholder")), 3), l(J, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, ca), j(s("ul", {
			id: `${T(_)}-list`,
			ref_key: "listEl",
			ref: D,
			class: m(["phlix-select__list", { "is-up": I.value }]),
			role: "listbox",
			"aria-label": t.label
		}, [(v(!0), o(e, null, b(h.value, (e, n) => (v(), o("li", {
			id: `${T(_)}-opt-${n}`,
			key: e.value,
			class: m(["phlix-select__option", {
				"is-active": n === S.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => ee(n),
			onPointermove: (t) => !e.disabled && (S.value = n)
		}, [s("span", da, [e.value === t.modelValue ? (v(), i(J, {
			key: 0,
			name: "check"
		})) : a("", !0)]), c(" " + C(e.label), 1)], 42, ua))), 128))], 10, la), [[O, x.value]])], 2));
	}
}), [["__scopeId", "data-v-eb762871"]]), pa = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		], n = oe(), { t: a } = Z(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (v(), i(fa, {
			class: "speed-menu",
			tone: "glass",
			"model-value": T(n).rate,
			options: o.value,
			label: T(a)("player.playbackSpeed"),
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), ma = "auto", ha = "original";
function ga(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function _a(e) {
	return e >= 2160 ? "4K" : ga(e);
}
function va(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = ga(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: _a(r.height)
		}));
	}
	return n;
}
function ya(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) ga(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function ba(e, t) {
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
function xa(e, t) {
	if (t < 0) return ma;
	let n = e.find((e) => e.index === t);
	return n ? ga(n.height) : ma;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Sa = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "QualityMenu",
	props: {
		levels: { default: () => [] },
		variants: { default: null },
		currentLevel: { default: -1 },
		autoEnabled: {
			type: Boolean,
			default: !0
		},
		activeHeight: { default: null }
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = e, o = t, s = oe(), c = ee(), { t: l } = Z(), u = r(() => va(n.levels)), d = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!n.variants) return [];
			let r = u.value.length >= 2;
			for (let i of [...n.variants].sort((e, t) => t.height - e.height)) {
				let a = ga(i.height);
				e.has(a) || r && ya(n.levels, a) < 0 || (e.add(a), t.push({
					value: a,
					label: _a(i.height)
				}));
			}
			return t;
		}), f = r(() => u.value.length >= 2 ? u.value : d.value), p = r(() => n.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), m = r(() => ba(n.levels, p.value)), h = r(() => p.value && m.value >= 0 ? {
			value: ha,
			label: l("player.qualityOriginal", { height: p.value.height })
		} : null), g = r(() => f.value.length >= 2), _ = r(() => n.activeHeight == null ? l("player.qualityAuto") : l("player.qualityAutoActive", { label: _a(n.activeHeight) })), y = r(() => [
			{
				value: ma,
				label: _.value
			},
			...h.value ? [h.value] : [],
			...f.value
		]), b = r(() => n.autoEnabled ? ma : h.value && n.currentLevel === m.value && (s.quality === "original" || c.defaultQuality === "original") ? ha : xa(n.levels, n.currentLevel));
		function x(e) {
			let t = String(e);
			if (t === "auto") {
				s.setQuality(t), c.defaultQuality = t, o("select", "auto");
				return;
			}
			let r = t === "original" ? m.value : ya(n.levels, t);
			s.setQuality(t), c.defaultQuality = t, r >= 0 ? o("select", r) : o("select", t);
		}
		return (e, t) => g.value ? (v(), i(fa, {
			key: 0,
			class: "quality-menu",
			tone: "glass",
			"model-value": b.value,
			options: y.value,
			label: T(l)("player.quality"),
			"onUpdate:modelValue": x
		}, null, 8, [
			"model-value",
			"options",
			"label"
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-b87f53e6"]]);
//#endregion
//#region src/components/player/captions.ts
function Ca(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function wa(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Ta(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Ea(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Da(e) {
	return e ? Ca(e.textTracks).filter(wa).map((e, t) => ({
		index: t,
		language: Ta(e, t),
		label: e.label || Ea(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function Oa(e) {
	let t = e?.audioTracks;
	return Ca(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Ea(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function ka(e, t) {
	return !e || t == null ? null : Ca(e.textTracks).filter(wa).find((e, n) => Ta(e, n) === t) ?? null;
}
function Aa(e, t) {
	return ka(e, t) != null;
}
function ja(e, t) {
	e && Ca(e.textTracks).filter(wa).forEach((e, n) => {
		try {
			e.mode = Ta(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function Ma(e, t) {
	let n = e?.audioTracks;
	Ca(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Na(e) {
	let t = e?.audioTracks;
	return Ca(t).findIndex((e) => e.enabled);
}
var Pa = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function Fa(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Ia(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && Fa(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(Pa, n) ? Pa[n] : e;
	});
}
function La(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Ia(e).trim()).filter((e) => e.length > 0) : [];
}
function Ra(e) {
	if (!e) return [];
	let t = Ca(e.activeCues), n = [];
	for (let e of t) n.push(...La(e.text));
	return n;
}
var za = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Ba = [
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
], Va = [
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
], Ha = [
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
], Ua = [
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
function Wa(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function Ga(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Ka(e) {
	return {
		"--cap-scale": String(za[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": Wa(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": Ga(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var qa = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(t, { expose: n }) {
		let i = t, s = y([]), c = r(() => Ka(i.styleConfig)), l = null, u = null;
		function d() {
			s.value = Ra(l);
		}
		function f() {
			l?.removeEventListener("cuechange", d), u?.removeEventListener("load", d), l = null, u = null;
		}
		function p(e, t) {
			let n = e?.querySelectorAll?.("track");
			if (!n) return null;
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				if (r.track === t) return r;
			}
			return null;
		}
		function _() {
			f(), ja(i.video, i.language);
			let e = ka(i.video, i.language);
			if (e) {
				if (l = e, e.addEventListener("cuechange", d), s.value = Ra(e), !s.value.length) {
					let t = p(i.video, e);
					t && t.readyState !== 2 && (u = t, t.addEventListener("load", d));
				}
			} else s.value = [];
		}
		return k(() => [i.video, i.language], _, { immediate: !0 }), g(f), n({ lines: s }), (n, r) => s.value.length ? (v(), o("div", {
			key: 0,
			class: m(["player__captions", { "is-lifted": t.lifted }]),
			style: h(c.value)
		}, [(v(!0), o(e, null, b(s.value, (e, t) => (v(), o("p", {
			key: t,
			class: "player__caption-line"
		}, C(e), 1))), 128))], 6)) : a("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), Ja = ["aria-label", "aria-expanded"], Ya = ["aria-label"], Xa = { class: "capmenu__head" }, Za = { class: "capmenu__title" }, Qa = ["aria-label"], $a = ["aria-checked", "tabindex"], eo = { class: "capmenu__check" }, to = { class: "capmenu__optlabel" }, no = [
	"aria-checked",
	"tabindex",
	"onClick"
], ro = { class: "capmenu__check" }, io = { class: "capmenu__optlabel" }, ao = { class: "capmenu__title capmenu__title--sub" }, oo = ["aria-label"], so = [
	"aria-checked",
	"tabindex",
	"onClick"
], co = { class: "capmenu__check" }, lo = { class: "capmenu__optlabel" }, uo = { class: "capmenu__title capmenu__title--sub" }, fo = { class: "capmenu__style" }, po = { class: "capmenu__field" }, mo = { class: "capmenu__fieldlabel" }, ho = { class: "capmenu__field" }, go = { class: "capmenu__fieldlabel" }, _o = { class: "capmenu__field" }, vo = { class: "capmenu__fieldlabel" }, yo = { class: "capmenu__field" }, bo = { class: "capmenu__fieldlabel" }, xo = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
	emits: ["update:open", "select-audio"],
	setup(t, { emit: n }) {
		let c = t, u = n, d = oe(), f = ee(), { t: p } = Z(), h = y(null), _ = y(null), x = r(() => d.subtitleLang), S = r(() => c.tracks.some((e) => e.language === x.value)), E = r(() => S.value ? "captions" : "captions-off"), D = r(() => S.value ? c.tracks.findIndex((e) => e.language === x.value) + 1 : 0), O = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
		function A(e) {
			u("update:open", e);
		}
		function j() {
			A(!1);
		}
		function M(e) {
			d.setSubtitle(e), f.defaultSubtitleLang = e, f.subtitlePreferenceSet = !0;
		}
		function N(e) {
			u("select-audio", e);
		}
		function P(e, t, n) {
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
		function F(e) {
			let t = P(e, c.tracks.length + 1, D.value);
			t !== null && M(t === 0 ? null : c.tracks[t - 1].language);
		}
		function I(e) {
			let t = P(e, c.audioTracks.length, O.value);
			t !== null && N(c.audioTracks[t].index);
		}
		function L(e) {
			f.captionStyle = {
				...f.captionStyle,
				size: e
			};
		}
		function R(e) {
			f.captionStyle = {
				...f.captionStyle,
				textColor: String(e)
			};
		}
		function z(e) {
			f.captionStyle = {
				...f.captionStyle,
				background: e
			};
		}
		function B(e) {
			f.captionStyle = {
				...f.captionStyle,
				edge: e
			};
		}
		Ri(_, w(c, "open"), {
			lockScroll: !1,
			onEscape: () => (j(), !0)
		});
		function V(e) {
			h.value && !h.value.contains(e.target) && j();
		}
		return k(() => c.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0));
		}, { immediate: !0 }), g(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", V, !0);
		}), (n, r) => (v(), o("div", {
			ref_key: "rootEl",
			ref: h,
			class: "capmenu"
		}, [s("button", {
			type: "button",
			class: m(["capmenu__btn", { "is-active": S.value }]),
			"aria-label": S.value ? T(p)("player.captionsOn") : T(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: r[0] ||= (e) => A(!t.open)
		}, [l(J, { name: E.value }, null, 8, ["name"])], 10, Ja), t.open ? (v(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: _,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": T(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", Xa, [s("h3", Za, C(T(p)("player.subtitles")), 1), l(Mi, {
				name: "x",
				label: T(p)("common.close"),
				size: "sm",
				onClick: j
			}, null, 8, ["label"])]),
			s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": T(p)("player.subtitleTrack"),
				onKeydown: F
			}, [s("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !S.value,
				tabindex: D.value === 0 ? 0 : -1,
				onClick: r[1] ||= (e) => M(null)
			}, [s("span", eo, [S.value ? a("", !0) : (v(), i(J, {
				key: 0,
				name: "check"
			}))]), s("span", to, C(T(p)("player.off")), 1)], 8, $a), (v(!0), o(e, null, b(t.tracks, (e, t) => (v(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": x.value === e.language,
				tabindex: D.value === t + 1 ? 0 : -1,
				onClick: (t) => M(e.language)
			}, [s("span", ro, [x.value === e.language ? (v(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", io, C(e.label), 1)], 8, no))), 128))], 40, Qa),
			t.audioTracks.length > 1 ? (v(), o(e, { key: 0 }, [s("h3", ao, C(T(p)("player.audio")), 1), s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": T(p)("player.audioTrack"),
				onKeydown: I
			}, [(v(!0), o(e, null, b(t.audioTracks, (e) => (v(), o("button", {
				key: e.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": t.activeAudio === e.index,
				tabindex: O.value === e.index ? 0 : -1,
				onClick: (t) => N(e.index)
			}, [s("span", co, [t.activeAudio === e.index ? (v(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", lo, C(e.label), 1)], 8, so))), 128))], 40, oo)], 64)) : a("", !0),
			s("h3", uo, C(T(p)("player.captionStyle")), 1),
			s("div", fo, [
				s("div", po, [s("span", mo, C(T(p)("player.size")), 1), l(fa, {
					"model-value": T(f).captionStyle.size,
					options: T(Ba),
					label: T(p)("player.captionSize"),
					"onUpdate:modelValue": L
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", ho, [s("span", go, C(T(p)("player.color")), 1), l(fa, {
					"model-value": T(f).captionStyle.textColor,
					options: T(Va),
					label: T(p)("player.captionColor"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", _o, [s("span", vo, C(T(p)("player.background")), 1), l(fa, {
					"model-value": T(f).captionStyle.background,
					options: T(Ha),
					label: T(p)("player.captionBackground"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", yo, [s("span", bo, C(T(p)("player.edge")), 1), l(fa, {
					"model-value": T(f).captionStyle.edge,
					options: T(Ua),
					label: T(p)("player.captionEdge"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Ya)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), So = 32, Co = 18, wo = 250, To = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Eo(e, t, n, r, i, a, o) {
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
		r: To(d / m),
		g: To(f / m),
		b: To(p / m)
	};
}
function Do(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Eo(e, t, n, 0, 0, r, n),
		right: Eo(e, t, n, t - r, 0, t, n),
		center: Eo(e, t, n, 0, 0, t, n)
	};
}
function Oo({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function ko({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Ao(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${ko(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${ko(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${ko(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function jo(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Mo = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let n = e, i = y(!1), a = null;
		function s() {
			i.value = jo(a);
		}
		let c = r(() => n.enabled && !n.reducedMotion && !i.value), l = r(() => Math.min(1, .85 * Math.max(0, n.intensity))), u = y(null), d = null, f = null, p = !1, b = !1;
		function x() {
			if (p) return f;
			if (b || typeof document > "u") return b = !0, null;
			d = document.createElement("canvas"), d.width = 32, d.height = 18;
			try {
				f = d.getContext("2d", { willReadFrequently: !0 });
			} catch {
				f = null;
			}
			return f ? (p = !0, f) : (b = !0, null);
		}
		function S() {
			let e = n.video;
			if (!c.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = x();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18);
				u.value = Ao(Do(n, 32, 18));
			} catch {
				b = !0, u.value = null;
			}
		}
		function C(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let w = null, T = null, E = null, D = 0, O = !1;
		function A(e) {
			T = e, w = e.requestVideoFrameCallback(j);
		}
		function j(e) {
			if (!O) return;
			e - D >= 250 && (D = e, S());
			let t = n.video;
			C(t) && A(t);
		}
		function M() {
			if (O || !c.value || !n.video) return;
			let e = n.video;
			if (C(e)) {
				O = !0, D = 0, A(e);
				return;
			}
			S(), !b && (O = !0, E = setInterval(S, 250));
		}
		function N() {
			O = !1, w != null && T && T.cancelVideoFrameCallback(w), w = null, T = null, E != null && (clearInterval(E), E = null);
		}
		k(() => [
			c.value,
			n.playing,
			n.video
		], ([e, t]) => {
			N(), e && t && M();
		}, { immediate: !0 }), _(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				a = e, s(), a.addEventListener?.("chargingchange", s), a.addEventListener?.("levelchange", s);
			}).catch(() => {});
		}), g(() => {
			N(), a?.removeEventListener?.("chargingchange", s), a?.removeEventListener?.("levelchange", s);
		});
		let P = r(() => {
			let e = { opacity: String(l.value) };
			return u.value && (e.background = u.value), e;
		});
		return t({ sampleNow: S }), (e, t) => (v(), o("div", {
			class: m(["player__ambient", { "is-active": c.value }]),
			style: h(c.value ? P.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), No = ["aria-label"], Po = { class: "resume__label" }, Fo = { class: "resume__time numeric" }, Io = { class: "resume__actions" }, Lo = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = Z(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (v(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": T(i)("player.resumePlayback")
		}, [s("p", Po, [
			c(C(a.value[0]), 1),
			s("span", Fo, C(T(X)(e.seconds)), 1),
			c(C(a.value[1]), 1)
		]), s("div", Io, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [l(J, { name: "play" }), s("span", null, C(T(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [l(J, { name: "rewind" }), s("span", null, C(T(i)("player.startOver")), 1)])])], 8, No));
	}
}), [["__scopeId", "data-v-271c5209"]]), Ro = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], zo = [
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
], Bo = new Set(zo);
function Vo(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Ho(...e) {
	return e.some((e) => Bo.has(Vo(e)));
}
function Uo(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Wo(e) {
	return e?.error?.code === 2;
}
var Go = 8, Ko = 15, qo = 2 * Math.PI * 15;
function Jo(e, t, n = qo) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Yo = new Map([
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
]), Xo = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function Zo(e, t = "video/mp4") {
	let n = Yo.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Qo(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Zo(e, t);
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
async function $o() {
	if (typeof navigator > "u") return !1;
	let e = navigator.mediaCapabilities;
	if (e && typeof e.decodingInfo == "function") try {
		if ((await e.decodingInfo({
			type: "media-source",
			video: {
				contentType: "video/mp4",
				width: 3840,
				height: 2160,
				bitrate: 5e7,
				framerate: 60
			}
		})).supported) return !0;
	} catch {}
	if (typeof document < "u") {
		let e = document.createElement("video");
		for (let t of Xo) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function es(e, t) {
	if (Ho(...e)) return !0;
	let n = e.map((e) => Vo(e)).find((e) => Ro.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (Ro.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Qo(e.codec, r) || (n === "mp4" || n === "m4v") && !await $o()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var ts = ["aria-label"], ns = ["src"], rs = { class: "upnext__body" }, is = { class: "upnext__eyebrow" }, as = { class: "upnext__title" }, os = {
	key: 0,
	class: "upnext__cd numeric"
}, ss = { class: "upnext__actions" }, cs = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ls = ["r"], us = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], ds = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let { t: n } = Z(), i = e, c = t, u = r(() => i.posterUrl ?? i.media.poster_url ?? null), d = r(() => Jo(i.remaining, i.total));
		return (t, r) => (v(), o("aside", {
			class: "upnext",
			role: "region",
			"aria-label": T(n)("player.upNext")
		}, [
			u.value ? (v(), o("img", {
				key: 0,
				class: "upnext__thumb",
				src: u.value,
				alt: "",
				loading: "lazy"
			}, null, 8, ns)) : a("", !0),
			s("div", rs, [
				s("p", is, C(T(n)("player.upNext")), 1),
				s("h4", as, C(e.media.name), 1),
				e.counting ? (v(), o("p", os, C(T(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", ss, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => c("play-now")
				}, [l(J, { name: "play" }), s("span", null, C(T(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => c("cancel")
				}, C(T(n)("player.cancel")), 1)])
			]),
			e.counting ? (v(), o("svg", cs, [s("circle", {
				cx: "18",
				cy: "18",
				r: T(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ls), s("circle", {
				cx: "18",
				cy: "18",
				r: T(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": T(qo),
				"stroke-dashoffset": d.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, us)])) : a("", !0)
		], 8, ts));
	}
}), [["__scopeId", "data-v-85909b2d"]]), fs = {
	class: "transcode",
	role: "alert"
}, ps = { class: "transcode__card" }, ms = { class: "transcode__heading" }, hs = { class: "transcode__body" }, gs = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = Z();
		return (t, i) => (v(), o("div", fs, [s("div", ps, [
			l(J, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", ms, C(T(r)("player.transcodeHeading")), 1),
			s("p", hs, C(e.title ? T(r)("player.transcodeBodyTitled", { title: e.title }) : T(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [l(J, { name: "arrow-left" }), s("span", null, C(T(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), _s = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, vs = { class: "prep__card" }, ys = { class: "prep__heading" }, bs = { class: "prep__body" }, xs = ["aria-valuenow"], Ss = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = Z(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (v(), o("div", _s, [s("div", vs, [
			l(J, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", ys, C(T(n)("player.transcodePreparingHeading")), 1),
			s("p", bs, C(e.title ? T(n)("player.transcodePreparingTitled", { title: e.title }) : T(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: h({ width: r() + "%" })
			}, null, 4)], 8, xs),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [l(J, { name: "arrow-left" }), s("span", null, C(T(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Cs = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let c = e, u = t, { t: d } = Z();
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
			p.value && u("skip", p.value.target);
		}
		return (e, t) => (v(), i(n, { name: "skip" }, {
			default: A(() => [p.value ? (v(), o("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: M(m, ["stop"])
			}, [s("span", null, C(p.value.label), 1), l(J, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), ws = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Ts = ["aria-label", "onClick"], Es = { class: "skip-controls__label" }, Ds = 5, Os = 30, ks = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: u } = Z();
		function d(e) {
			return e / 1e3;
		}
		function f(e, t) {
			return t >= d(e.endMs);
		}
		function p(e, t) {
			if (f(e, t)) return !1;
			let n = d(e.startMs), r = n - Ds, i = n + Os;
			return t >= r && t < i;
		}
		let m = [
			"intro",
			"outro",
			"credits"
		];
		function h(e) {
			switch (e) {
				case "intro": return u("player.skipLabelIntro");
				case "outro": return u("player.skipLabelCredits");
				case "credits": return u("player.skipLabelCredits");
				case "ad": return u("player.skipLabelSkipCredits");
			}
		}
		let g = r(() => !i.markers || i.markers.length === 0 ? [] : i.markers.filter((e) => m.includes(e.type) && p(e, i.position)).sort((e, t) => e.startMs - t.startMs));
		function _(e) {
			c("skip", d(e.startMs));
		}
		return (t, n) => g.value.length > 0 ? (v(), o("div", ws, [(v(!0), o(e, null, b(g.value, (e) => (v(), o("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${h(e.type)}`,
			onClick: M((t) => _(e), ["stop"])
		}, [s("span", Es, C(h(e.type)), 1), l(J, { name: "skip-forward" })], 8, Ts))), 128))])) : a("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), As = ["aria-label", "aria-expanded"], js = ["aria-label"], Ms = { class: "chapterlist__head" }, Ns = { class: "chapterlist__title" }, Ps = ["aria-label"], Fs = ["onClick"], Is = { class: "chapterlist__index" }, Ls = { class: "chapterlist__name" }, Rs = { class: "chapterlist__meta" }, zs = { class: "chapterlist__time" }, Bs = {
	key: 0,
	class: "chapterlist__duration"
}, Vs = {
	key: 1,
	class: "chapterlist__empty"
}, Hs = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let i = t, c = n, { t: u } = Z();
		function d() {
			c("update:open", !1);
		}
		function f() {
			c("update:open", !i.open);
		}
		let p = r(() => i.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = X(e.start), a;
			return e.end != null && e.end > e.start && (a = X(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), h = y(null), _ = y(null);
		Ri(_, w(i, "open"), {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function x(e) {
			h.value && !h.value.contains(e.target) && d();
		}
		k(() => i.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", x, !0) : document.removeEventListener("pointerdown", x, !0));
		}), g(() => {
			document.removeEventListener("pointerdown", x, !0);
		});
		function S(e) {
			c("seek", e.start), d();
		}
		return (n, r) => (v(), o("div", {
			ref_key: "rootEl",
			ref: h,
			class: "chapterlist"
		}, [s("button", {
			type: "button",
			class: m(["chapterlist__btn player__iconbtn", { "is-active": t.open }]),
			"aria-label": T(u)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: f
		}, [l(J, { name: "list" })], 10, As), t.open ? (v(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: _,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": T(u)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", Ms, [s("h3", Ns, C(T(u)("player.chapters")), 1), l(Mi, {
			name: "x",
			label: T(u)("common.close"),
			size: "sm",
			onClick: d
		}, null, 8, ["label"])]), p.value.length > 0 ? (v(), o("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": T(u)("player.chapterList")
		}, [(v(!0), o(e, null, b(p.value, (e) => (v(), o("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [s("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => S(e.chapter)
		}, [
			s("span", Is, C(e.index), 1),
			s("span", Ls, C(e.label), 1),
			s("span", Rs, [s("span", zs, C(e.startLabel), 1), e.durationLabel ? (v(), o("span", Bs, "· " + C(e.durationLabel), 1)) : a("", !0)])
		], 8, Fs)]))), 128))], 8, Ps)) : (v(), o("p", Vs, C(T(u)("player.noChapters")), 1))], 8, js)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Us = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Ws = { class: "marker-timeline__ticks" }, Gs = [
	"title",
	"aria-label",
	"onClick"
], Ks = { class: "marker-timeline__tooltip" }, qs = { class: "marker-timeline__tooltip-label" }, Js = { class: "marker-timeline__tooltip-time numeric" }, Ys = ["onClick"], Xs = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "MarkerTimeline",
	props: {
		position: {},
		duration: {},
		markers: {}
	},
	emits: ["seek", "similar"],
	setup(t, { emit: n }) {
		let i = t, l = n;
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
		}))), g = r(() => i.markers ? i.markers.find((e) => e.type === "ad" && i.position >= u(e.startMs) && i.position <= u(e.endMs)) ?? null : null), _ = r(() => g.value !== null), y = r(() => g.value?.label ?? "Ad");
		function x(e) {
			l("seek", e.startSec);
		}
		function S(e) {
			l("similar", e.type, e.startMs);
		}
		return (t, n) => p.value.length > 0 ? (v(), o("div", {
			key: 0,
			class: m(["marker-timeline", { "is-ad-active": _.value }]),
			"aria-label": "Marker timeline"
		}, [_.value ? (v(), o("div", Us, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), c(" " + C(y.value), 1)])) : a("", !0), s("div", Ws, [(v(!0), o(e, null, b(p.value, (e) => (v(), o("button", {
			key: e.id,
			type: "button",
			class: m(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: h({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${T(X)(e.startSec)}`,
			"aria-label": `${e.label} at ${T(X)(e.startSec)}`,
			onClick: M((t) => x(e), ["stop"])
		}, [s("span", Ks, [
			s("span", qs, C(e.label), 1),
			s("span", Js, C(T(X)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: M((t) => S(e), ["stop"])
			}, " Find similar ", 8, Ys)
		])], 14, Gs))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Zs = ["aria-label", "aria-expanded"], Qs = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, $s = ["aria-label"], ec = ["aria-selected", "onClick"], tc = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(t, { expose: i }) {
		let c = t, { t: u } = Z(), d = [
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
		], f = y(0), p = y(0), h = r(() => p.value > 0), _;
		function x() {
			_ &&= (clearInterval(_), void 0);
		}
		function S(e) {
			x(), p.value = e, !(e <= 0) && (_ = setInterval(() => {
				--p.value, p.value <= 0 && (x(), p.value = 0, c.onExpire());
			}, 1e3));
		}
		function w(e) {
			f.value = e, e === 0 ? (x(), p.value = 0) : S(e);
		}
		function E(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let D = y(!1);
		function O() {
			h.value ? (w(0), D.value = !1) : D.value = !D.value;
		}
		function k(e) {
			w(e), D.value = !1;
		}
		return g(() => {
			x();
		}), i({ toggleOpen: O }), (t, r) => (v(), o("div", { class: m(["sleep-timer", { "is-active": h.value }]) }, [s("button", {
			type: "button",
			class: m(["sleep-timer__trigger", { "is-active": h.value }]),
			"aria-label": h.value ? `Sleep timer: ${E(p.value)} remaining` : T(u)("player.sleepTimer"),
			"aria-expanded": D.value,
			"aria-haspopup": "listbox",
			onClick: O
		}, [l(J, { name: "moon" }), h.value ? (v(), o("span", Qs, C(E(p.value)), 1)) : a("", !0)], 10, Zs), l(n, { name: "dropdown" }, {
			default: A(() => [D.value ? (v(), o("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": T(u)("player.sleepTimer")
			}, [(v(), o(e, null, b(d, (e) => s("li", {
				key: e.value,
				class: m(["sleep-timer__option", { "is-selected": f.value === e.value }]),
				role: "option",
				"aria-selected": f.value === e.value,
				onClick: (t) => k(e.value)
			}, C(e.label), 11, ec)), 64))], 8, $s)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), nc = ["aria-labelledby"], rc = {
	key: 0,
	class: "phlix-modal__header"
}, ic = ["id"], ac = { class: "phlix-modal__body" }, oc = {
	key: 1,
	class: "phlix-modal__footer"
}, sc = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let { t: c } = Z(), u = e, d = r, f = y(u.modelValue);
		k(() => u.modelValue, (e) => f.value = e);
		let p = y(null), h = E();
		function g() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			u.dismissible && g();
		}
		return Ri(p, f, { onEscape: () => u.dismissible ? (g(), !0) : !1 }), (r, u) => (v(), i(t, { to: "body" }, [l(n, { name: "phlix-modal" }, {
			default: A(() => [e.modelValue ? (v(), o("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: M(_, ["self"])
			}, [s("div", {
				ref_key: "panelEl",
				ref: p,
				class: m(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? T(h) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (v(), o("header", rc, [e.title ? (v(), o("h2", {
					key: 0,
					id: T(h),
					class: "phlix-modal__title"
				}, C(e.title), 9, ic)) : a("", !0), e.hideClose ? a("", !0) : (v(), i(Mi, {
					key: 1,
					name: "x",
					label: T(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: g
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", ac, [x(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (v(), o("footer", oc, [x(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, nc)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-3be1ebaa"]]), cc = ["aria-label"], lc = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: n } = Z(), i = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (v(), o("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? T(n)("common.loading"),
			style: h(i.value ? { fontSize: i.value } : void 0)
		}, [l(J, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, cc));
	}
}), [["__scopeId", "data-v-736b299d"]]), uc = class {
	client;
	constructor(e) {
		this.client = new xe({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new fe() : void 0
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
}, dc = null;
function fc(e) {
	return dc ||= new uc(e), dc;
}
var $ = null, pc = null, mc = 0, hc = 5, gc = 1e3, _c = null;
function vc() {
	try {
		return typeof window > "u" ? null : new fe().getAccessToken();
	} catch {
		return null;
	}
}
function yc(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = vc() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function bc(e) {
	if (_c) try {
		let t = JSON.parse(e.data);
		_c(t);
	} catch {}
}
function xc() {
	if ($ = null, pc && mc < hc) {
		let e = gc * 2 ** mc;
		mc++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${mc})`), setTimeout(() => {
			pc && Sc(pc);
		}, e);
	} else mc >= hc && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), pc = null, mc = 0);
}
function Sc(e, t) {
	if (t && (_c = t), $ && pc !== e && ($.close(), $ = null, pc = null, mc = 0), $ && pc === e) return;
	pc = e, mc = 0;
	let n = yc(e);
	console.log(`[SyncPlay] Opening WebSocket to ${n}`), $ = new WebSocket(n), $.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), mc = 0;
	}, $.onmessage = bc, $.onclose = xc, $.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function Cc() {
	$ &&= ($.close(), null), pc = null, mc = 0;
}
function wc(e) {
	!$ || $.readyState !== WebSocket.OPEN || $.send(JSON.stringify({
		type: "command",
		payload: e
	}));
}
var Tc = N("phlix-syncplay", () => {
	let e = y(null), t = y(null), n = y([]), i = y(null), a = y(!1), o = y(0), s = 0, c = r(() => t.value !== null), l = r(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), u = r(() => n.value.filter((e) => e.isOnline)), d = r(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), f = r(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(d.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	async function p(r, o) {
		a.value = !0, i.value = null;
		try {
			let i = fc(r), a = await i.createRoom(o);
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
			let i = fc(r);
			n.value = await i.getMembers(o);
			let a = await i.joinRoom(o);
			t.value = a, s = Date.now(), e.value &&= {
				...e.value,
				currentSession: a
			}, n.value = a.activeUsers, Sc(o, (e) => {
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
				await fc(r).leaveRoom(e.value.id), Cc(), e.value = null, t.value = null, n.value = [];
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
		t.value && wc({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function v(e) {
		if (t.value) try {
			t.value = await fc(e).getState(t.value.id), s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function b(t) {
		if (e.value) try {
			n.value = await fc(t).getMembers(e.value.id);
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function x() {
		i.value = null;
	}
	function S(e) {
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
		refreshMembers: b,
		clearError: x,
		updateLocalPosition: S
	};
}), Ec = [
	"type",
	"disabled",
	"aria-busy"
], Dc = {
	key: 0,
	class: "phlix-btn__spinner"
}, Oc = { class: "phlix-btn__label" }, kc = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		return (t, r) => (v(), o("button", {
			type: e.type,
			class: m(["phlix-btn", [
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
			e.loading ? (v(), o("span", Dc, [l(J, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (v(), i(J, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", Oc, [x(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (v(), i(J, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, Ec));
	}
}), [["__scopeId", "data-v-38abf89d"]]);
//#endregion
//#region src/composables/useApiBase.ts
function Ac(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function jc() {
	let e = d("mediaApiBase", void 0), t = d("apiBase", "");
	return r(() => Ac(e) || Ac(t));
}
//#endregion
//#region src/components/syncplay/SyncPlayOverlay.vue?vue&type=script&setup=true&lang.ts
var Mc = {
	key: 0,
	class: "syncplay-overlay"
}, Nc = { class: "syncplay-overlay__badge" }, Pc = { class: "syncplay-overlay__label" }, Fc = { class: "syncplay-overlay__status-label" }, Ic = { class: "syncplay-overlay__members" }, Lc = { class: "syncplay-overlay__member-count" }, Rc = { class: "syncplay-overlay__member-list" }, zc = { class: "syncplay-overlay__member-name" }, Bc = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Vc = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = Z(), u = Tc(), d = jc(), f = r(() => n.apiBase ?? d.value), p = r(() => u.currentRoom?.name ?? "SyncPlay"), h = r(() => u.onlineMembers.length), g = r(() => u.syncStatus), _ = r(() => {
			switch (g.value) {
				case "synced": return i("syncplay.synced");
				case "outOfSync": return i("syncplay.outOfSync");
				case "re-syncing": return i("syncplay.reSyncing");
				default: return i("syncplay.synced");
			}
		}), y = r(() => {
			switch (g.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function x() {
			await u.leaveRoom(f.value);
		}
		return (t, n) => T(u).isInRoom ? (v(), o("div", Mc, [
			s("div", Nc, [l(J, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", Pc, "SyncPlay: " + C(p.value), 1)]),
			s("div", { class: m(["syncplay-overlay__status", `syncplay-overlay__status--${g.value}`]) }, [l(J, {
				name: y.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", Fc, C(_.value), 1)], 2),
			s("div", Ic, [s("span", Lc, [l(J, { name: "user" }), c(" " + C(h.value) + " " + C(T(i)("syncplay.members", { count: h.value })), 1)]), s("ul", Rc, [(v(!0), o(e, null, b(T(u).onlineMembers.slice(0, 5), (e) => (v(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", zc, C(e.name), 1)]))), 128)), T(u).onlineMembers.length > 5 ? (v(), o("li", Bc, " +" + C(T(u).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			l(kc, {
				variant: "ghost",
				size: "sm",
				onClick: x
			}, {
				default: A(() => [c(C(T(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Hc = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], Uc = ["id"], Wc = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let n = e, r = t, i = E();
		function c() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (v(), o("span", { class: m(["phlix-switch", { "is-disabled": e.disabled }]) }, [s("button", {
			type: "button",
			role: "switch",
			class: m(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? T(i) : void 0,
			disabled: e.disabled,
			onClick: c
		}, [...n[0] ||= [s("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, Hc), e.label ? (v(), o("label", {
			key: 0,
			id: T(i),
			class: "phlix-switch__label",
			onClick: c
		}, C(e.label), 9, Uc)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-0725d51f"]]), Gc = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, Kc = ["aria-selected"], qc = ["aria-selected"], Jc = {
	key: 0,
	class: "syncplay-modal__fields"
}, Yc = { class: "syncplay-modal__field" }, Xc = {
	class: "syncplay-modal__label",
	for: "room-name"
}, Zc = ["placeholder"], Qc = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, $c = { class: "syncplay-modal__toggle-hint" }, el = {
	key: 1,
	class: "syncplay-modal__fields"
}, tl = { class: "syncplay-modal__field" }, nl = {
	class: "syncplay-modal__label",
	for: "room-id"
}, rl = ["placeholder"], il = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, al = {
	key: 3,
	class: "syncplay-modal__rooms"
}, ol = { class: "syncplay-modal__rooms-title" }, sl = { class: "syncplay-modal__rooms-list" }, cl = ["onClick"], ll = { class: "syncplay-modal__room-name" }, ul = { class: "syncplay-modal__room-count" }, dl = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, fl = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let u = t, d = n, { t: f } = Z(), p = Tc(), h = jc(), g = r(() => u.apiBase ?? h.value), _ = y("create"), x = y(""), S = y(""), w = y(!0), E = y(!1), O = y(null), N = y([]), P = y(!1), F = r(() => x.value.trim().length > 0), I = r(() => S.value.trim().length > 0), L = r(() => (_.value === "create" ? F.value : I.value) && !E.value);
		k(() => u.modelValue, async (e) => {
			e && (O.value = null, x.value = "", w.value = !0, u.prefilledRoomId ? (S.value = u.prefilledRoomId, _.value = "join") : (S.value = "", _.value = "create"), await R());
		});
		async function R() {
			P.value = !0;
			try {
				N.value = await new uc(g.value).listPublicRooms();
			} catch {
				N.value = [];
			} finally {
				P.value = !1;
			}
		}
		async function z() {
			if (L.value) {
				E.value = !0, O.value = null;
				try {
					_.value === "create" ? (await p.createAndJoinRoom(g.value, {
						name: x.value.trim(),
						isPublic: w.value
					}), p.currentRoom && d("joined", p.currentRoom)) : (await p.joinRoom(g.value, S.value.trim()), p.currentRoom && d("joined", p.currentRoom)), d("update:modelValue", !1);
				} catch (e) {
					O.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					E.value = !1;
				}
			}
		}
		function ee(e) {
			_.value = "join", S.value = e.id, x.value = e.name;
		}
		function B() {
			d("update:modelValue", !1);
		}
		return (n, r) => (v(), i(sc, {
			"model-value": t.modelValue,
			title: T(f)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[5] ||= (e) => d("update:modelValue", e),
			onClose: B
		}, {
			footer: A(() => [l(kc, {
				variant: "ghost",
				type: "button",
				onClick: B
			}, {
				default: A(() => [c(C(T(f)("common.close")), 1)]),
				_: 1
			}), l(kc, {
				variant: "solid",
				type: "button",
				loading: E.value,
				disabled: !L.value,
				onClick: z
			}, {
				default: A(() => [c(C(_.value === "create" ? T(f)("syncplay.createRoom") : T(f)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: A(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: M(z, ["prevent"])
			}, [
				s("div", Gc, [s("button", {
					type: "button",
					role: "tab",
					class: m(["syncplay-modal__tab", { "is-active": _.value === "create" }]),
					"aria-selected": _.value === "create",
					onClick: r[0] ||= (e) => _.value = "create"
				}, C(T(f)("syncplay.createRoom")), 11, Kc), s("button", {
					type: "button",
					role: "tab",
					class: m(["syncplay-modal__tab", { "is-active": _.value === "join" }]),
					"aria-selected": _.value === "join",
					onClick: r[1] ||= (e) => _.value = "join"
				}, C(T(f)("syncplay.joinRoom")), 11, qc)]),
				_.value === "create" ? (v(), o("div", Jc, [s("div", Yc, [s("label", Xc, C(T(f)("syncplay.roomName")), 1), j(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => x.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: T(f)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Zc), [[D, x.value]])]), s("div", Qc, [l(Wc, {
					modelValue: w.value,
					"onUpdate:modelValue": r[3] ||= (e) => w.value = e,
					label: T(f)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), s("span", $c, C(w.value ? T(f)("syncplay.publicHint") : T(f)("syncplay.privateHint")), 1)])])) : (v(), o("div", el, [s("div", tl, [s("label", nl, C(T(f)("syncplay.roomId")), 1), j(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[4] ||= (e) => S.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: T(f)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, rl), [[D, S.value]])])])),
				O.value ? (v(), o("p", il, C(O.value), 1)) : a("", !0),
				_.value === "join" && N.value.length > 0 ? (v(), o("div", al, [s("h3", ol, C(T(f)("syncplay.publicRooms")), 1), s("ul", sl, [(v(!0), o(e, null, b(N.value, (e) => (v(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => ee(e)
				}, [
					l(J, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", ll, C(e.name), 1),
					s("span", ul, C(e.memberCount) + " " + C(T(f)("syncplay.members")), 1)
				], 8, cl)]))), 128))])])) : a("", !0),
				P.value ? (v(), o("div", dl, [l(J, { name: "spinner" }), s("span", null, C(T(f)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]), pl = {
	key: 0,
	class: "syncplay-controls"
}, ml = ["aria-label"], hl = { class: "syncplay-controls__wait-label" }, gl = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, _l = { key: 0 }, vl = { class: "syncplay-controls__transport" }, yl = ["aria-label"], bl = ["aria-label"], xl = ["aria-label"], Sl = { class: "syncplay-controls__status-label" }, Cl = 10, wl = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let n = e, i = t, { t: u } = Z(), d = Tc(), f = jc(), p = r(() => n.apiBase ?? f.value), h = y(!1), g = y([]), _ = r(() => h.value || d.syncStatus === "re-syncing");
		async function b() {
			if (d.isInRoom) try {
				await d.sendCommand(p.value, "play"), i("play");
			} catch (e) {
				console.error("[SyncPlay] Failed to send play command:", e);
			}
		}
		async function x() {
			if (d.isInRoom) try {
				await d.sendCommand(p.value, "pause"), i("pause");
			} catch (e) {
				console.error("[SyncPlay] Failed to send pause command:", e);
			}
		}
		async function S() {
			n.isPlaying ? await x() : await b();
		}
		async function w(e) {
			if (d.isInRoom) try {
				await d.sendCommand(p.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function E() {
			await w(Math.max(0, n.position - Cl));
		}
		async function D() {
			await w(Math.min(n.duration, n.position + Cl));
		}
		return k(() => d.syncStatus, (e) => {
			e === "re-syncing" ? h.value = !0 : e === "synced" && (h.value = !1, g.value = []);
		}), (t, n) => T(d).isInRoom ? (v(), o("div", pl, [
			_.value ? (v(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": T(u)("syncplay.waitingForMembers")
			}, [
				l(J, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				s("span", hl, C(T(u)("syncplay.waitingForMembers")), 1),
				g.value.length > 0 ? (v(), o("span", gl, [c(C(g.value.slice(0, 3).join(", ")) + " ", 1), g.value.length > 3 ? (v(), o("span", _l, "+" + C(g.value.length - 3), 1)) : a("", !0)])) : a("", !0)
			], 8, ml)) : a("", !0),
			s("div", vl, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": T(u)("syncplay.rewind"),
					onClick: E
				}, [l(J, { name: "rewind" })], 8, yl),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? T(u)("syncplay.pauseAll") : T(u)("syncplay.playAll"),
					onClick: S
				}, [l(J, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, bl),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": T(u)("syncplay.fastForward"),
					onClick: D
				}, [l(J, { name: "forward" })], 8, xl)
			]),
			s("div", { class: m(["syncplay-controls__status", `syncplay-controls__status--${T(d).syncStatus}`]) }, [l(J, {
				name: T(d).syncStatus === "synced" ? "check" : T(d).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", Sl, C(T(d).syncStatus === "synced" ? T(u)("syncplay.synced") : T(d).syncStatus === "outOfSync" ? T(u)("syncplay.outOfSync") : T(u)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Tl = { class: "player__stage" }, El = ["src", "poster"], Dl = [
	"src",
	"srclang",
	"label",
	"default"
], Ol = { class: "player__meta" }, kl = ["aria-label"], Al = { class: "player__meta-text" }, jl = { class: "player__eyebrow" }, Ml = { class: "player__title" }, Nl = { class: "player__sub numeric" }, Pl = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Fl = {
	key: 0,
	class: "player__center"
}, Il = ["aria-label"], Ll = { class: "player__btnrow" }, Rl = ["aria-label"], zl = ["aria-label"], Bl = ["aria-label"], Vl = { class: "player__time numeric" }, Hl = ["aria-label", "aria-pressed"], Ul = ["aria-label"], Wl = ["aria-label"], Gl = ["aria-label", "aria-pressed"], Kl = ["aria-label", "aria-pressed"], ql = ["aria-label"], Jl = { class: "similar-modal" }, Yl = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Xl = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Zl = { class: "similar-modal__state-title" }, Ql = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, $l = {
	key: 3,
	class: "similar-modal__results"
}, eu = { class: "similar-modal__poster" }, tu = ["src", "alt"], nu = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ru = { class: "similar-modal__result-body" }, iu = { class: "similar-modal__result-title" }, au = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, ou = { key: 0 }, su = /*#__PURE__*/ Y(/* @__PURE__ */ u({
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
		let u = t, f = n, h = oe(), x = ee(), { t: S } = Z(), w = Tc(), E = we(), D = r(() => E.isFavorite(u.media.id)), O = r(() => E.likeLevel(u.media.id));
		function j() {
			E.toggleFavorite(u.media.id, le());
		}
		function N(e) {
			E.setLike(u.media.id, e, le());
		}
		let P = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], F = y(null), I = y(null), L = y(!0), R = y(!1), z = y(!1), B = y(!1), V = y(!1), te = y(!1), ne = y(!1), re = y(null), ie = y(!1), ae = r(() => V.value ? 1.35 : 1), H = y(Ho(u.streamUrl, u.media.path));
		async function se() {
			if (H.value) return;
			let e = u.playbackAudioTracks ?? [];
			e.length !== 0 && await es([u.streamUrl, u.media.path], e) && (H.value = !0);
		}
		k(() => u.playbackAudioTracks, (e) => {
			!e || e.length === 0 || se();
		}, { immediate: !1 });
		let ce = d("phlixConfig", null);
		function le() {
			return ce?.apiBase ?? "";
		}
		let U = Ti({
			apiBase: () => u.apiBase ?? "",
			hlsConfig: ce?.playerHlsConfig
		}), ue = Ai({ apiBase: () => u.apiBase ?? "" }), W = null;
		function de(e) {
			W !== null && clearTimeout(W), W = setTimeout(() => {
				W = null, ue.fetch(e);
			}, 0);
		}
		let fe = r(() => u.thumbnailAt ?? ue.thumbnailAt), pe = r(() => H.value ? void 0 : u.streamUrl), me = r(() => H.value && U.state.value !== "ready"), he = r(() => H.value && (U.state.value === "preparing" || U.state.value === "idle")), ge = r(() => H.value && U.state.value === "error");
		function _e(e = 0) {
			let t = F.value;
			t && U.start(t, u.media.id, void 0, e);
		}
		function G(e) {
			if (h.quality === "original" && e !== "auto") {
				U.loadVariantPlaylist(ha);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				U.loadVariantPlaylist(e);
				return;
			}
			U.setLevel(e);
		}
		let K = !1;
		k(() => U.levels.value, (e) => {
			if (K || e.length === 0) return;
			K = !0;
			let t = x.defaultQuality;
			if (!t || t === "auto") return;
			if (t === "original") {
				U.loadVariantPlaylist(ha);
				return;
			}
			let n = ya(e, t);
			n >= 0 && U.setNextLevel(n);
		}), k(() => U.variants.value, (e) => {
			e?.length && !K && (K = !1, p(() => {
				if (U.levels.value.length > 0) {
					K = !0;
					let e = x.defaultQuality;
					if (!e || e === "auto") return;
					if (e === "original") {
						U.loadVariantPlaylist(ha);
						return;
					}
					let t = ya(U.levels.value, e);
					t >= 0 && U.setNextLevel(t);
				}
			}));
		}, { deep: !0 });
		let ve = y(h.resumePositionFor(u.media.id) ?? 0), ye = y(!H.value && ve.value > 0), be = null, Se = y(!1), Ce = y(8), Te, Ee = y(null), De = y(0), Oe = y(!1), ke = y([]), Ae = y(!1), je = y(null);
		function Me(e, t) {
			Ee.value = e, De.value = t, ke.value = [], je.value = null, Oe.value = !0, Le(e, t);
		}
		let Ne = null, Pe = null, Fe = null;
		function Ie() {
			let e = u.apiBase ?? "";
			return (Pe === null || Fe !== e) && (Pe = new xe({ baseUrl: e }), Fe = e), Pe;
		}
		async function Le(e, t) {
			Ne?.abort(), Ne = new AbortController(), Ae.value = !0, je.value = null;
			try {
				let n = await Ie().searchByMarker(e, t, 30, 20, Ne.signal);
				ke.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				je.value = "Failed to load similar media. Please try again.", ke.value = [];
			} finally {
				Ae.value = !1;
			}
		}
		function Re() {
			Ne?.abort(), Oe.value = !1, ke.value = [], je.value = null, Ee.value = null;
		}
		let ze = r(() => h.upNext);
		function Be() {
			H.value = Ho(u.streamUrl, u.media.path), se(), ve.value = h.resumePositionFor(u.media.id) ?? 0, ye.value = !H.value && ve.value > 0, be = null, St = !1, ut = !1, dt = !1, rt.value = -1, _t = null, K = !1, We(), Se.value = !1, U.reset(), F.value && (F.value.currentTime = 0), H.value && _e(), de(u.media.id);
		}
		function Ve(e) {
			let t = F.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : be = Math.max(0, e));
		}
		function He() {
			Ve(ve.value), ye.value = !1, F.value?.play()?.catch(() => {});
		}
		function Ue() {
			be = null, Ve(0), h.clearResume(u.media.id), ye.value = !1, F.value?.play()?.catch(() => {});
		}
		function We() {
			Te &&= (clearInterval(Te), void 0);
		}
		function Ge() {
			Ce.value = 8, We(), Te = setInterval(() => {
				--Ce.value, Ce.value <= 0 && (We(), qe());
			}, 1e3);
		}
		function Ke() {
			$t(), L.value = !0, h.upNext && (Se.value = !0, x.autoplay && Ge());
		}
		function qe() {
			We(), Se.value = !1;
			let e = h.next(u.streamUrlFor);
			e && f("play-next", e);
		}
		function Je() {
			We(), Se.value = !1;
		}
		function Ye() {
			if (H.value) return;
			let e = F.value, t = Wo(e) && (e?.currentTime ?? 0) === 0;
			(Uo(e) || t) && (H.value = !0, _e(e?.currentTime ?? 0));
		}
		let Xe = y([]), Ze = y([]), Qe = y(-1), $e = y(!1), et = r(() => U.state.value === "ready" && U.audioTracks.value.length > 0), tt = r(() => U.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), nt = r(() => (u.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), rt = y(-1), it = r(() => !et.value && !H.value && Ze.value.length === 0 && nt.value.length > 1), at = r(() => et.value ? tt.value : it.value ? nt.value : Ze.value), ot = r(() => {
			if (et.value) return U.currentAudioTrack.value;
			if (it.value) {
				if (rt.value >= 0) return rt.value;
				let e = (u.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : u.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return Qe.value;
		}), st = y(!1), ct = h.subtitleLang, lt = r(() => H.value ? U.subtitleTracks.value : u.playbackSubtitleTracks ?? []), ut = !1, dt = !1;
		function ft() {
			if (ut) return;
			if (x.subtitlePreferenceSet) {
				ut = !0;
				return;
			}
			let e = lt.value.find((e) => e.default);
			if (!e) return;
			let t = Xe.value.find((t) => t.language === (e.language || e.label));
			t && (h.setSubtitle(t.language), ct = t.language, ut = !0);
		}
		function pt() {
			if (dt) return;
			let e = x.defaultAudioLang;
			if (!e) return;
			let t = at.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = ot.value;
			r >= 0 && r < t.length || (vt(n), dt = !0);
		}
		let mt = r(() => Xe.value.some((e) => e.language === h.subtitleLang));
		function ht() {
			let e = F.value;
			Xe.value = Da(e), Ze.value = Oa(e), Qe.value = Na(e), ft(), pt();
		}
		function gt() {
			if (mt.value) ct = h.subtitleLang, h.setSubtitle(null);
			else {
				let e = ct && Xe.value.some((e) => e.language === ct) ? ct : Xe.value[0]?.language ?? null;
				h.setSubtitle(e);
			}
			f("captions");
		}
		let _t = null;
		function vt(e) {
			if (et.value) U.setAudioTrack(e);
			else if (it.value) {
				if (e === ot.value) return;
				rt.value = e, _t = e, H.value = !0, _e(F.value?.currentTime ?? 0);
			} else Ma(F.value, e), Qe.value = e;
		}
		k(et, (e) => {
			if (!e || _t === null) return;
			let t = _t;
			_t = null, t >= 0 && t < U.audioTracks.value.length && U.setAudioTrack(t);
		}), k(lt, () => {
			p(() => ht());
		}, { deep: !0 });
		let yt = null, bt, xt = r(() => {
			let e = [];
			u.media.year && e.push({ text: String(u.media.year) }), u.media.rating && e.push({
				text: u.media.rating,
				cert: !0
			}), u.media.runtime && e.push({ text: `${u.media.runtime}m` });
			let t = u.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), St = !1;
		function Ct() {
			if (!u.autoplay || St || ye.value || me.value) return;
			let e = F.value;
			if (!e || !e.paused) return;
			St = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, h.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function wt() {
			Ct();
		}
		function Tt() {
			u.prevEpisode && f("play-episode", u.prevEpisode);
		}
		function Et() {
			u.nextEpisode && f("play-episode", u.nextEpisode);
		}
		function Dt() {
			let e = F.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Ot(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function kt() {
			h.play(), h.setMediaPositionState();
		}
		function At() {
			h.pause(), h.setMediaPositionState();
		}
		function jt() {
			let e = F.value;
			e && h.updateProgress(e.currentTime, e.duration, Ot(e));
		}
		function Mt() {
			let e = F.value;
			e && (e.volume = h.volume, e.muted = h.muted, e.playbackRate = h.rate, be !== null && (e.currentTime = e.duration ? Math.min(e.duration, be) : be, be = null), h.updateProgress(e.currentTime, e.duration, Ot(e)), h.setMediaPositionState(), ht());
		}
		function Nt() {
			let e = F.value;
			e && h.updateProgress(e.currentTime, e.duration, Ot(e));
		}
		function Pt() {
			let e = F.value;
			e && (Math.abs(e.volume - h.volume) > .001 && h.setVolume(e.volume), e.muted !== h.muted && h.toggleMute());
		}
		function Ft() {
			let e = F.value;
			e && e.playbackRate !== h.rate && h.setRate(e.playbackRate), h.setMediaPositionState();
		}
		function It() {
			h.setMediaPositionState();
		}
		function Lt() {
			h.setMediaPositionState();
		}
		function q(e) {
			let t = F.value;
			t && h.duration > 0 && (t.currentTime = Math.min(h.duration, Math.max(0, e)));
		}
		function Rt() {
			z.value = !0, tn();
		}
		function zt() {
			z.value = !1, tn();
		}
		function Bt(e) {
			let t = P.reduce((e, t, n) => Math.abs(t - h.rate) < Math.abs(P[e] - h.rate) ? n : e, 0), n = P[Math.min(P.length - 1, Math.max(0, t + e))];
			h.setRate(n);
		}
		function Vt() {
			if (!u.markers) return;
			let e = h.position, t = u.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && q(t.startMs / 1e3);
		}
		function Ht() {
			if (!u.markers) return;
			let e = h.position, t = u.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && q(t.startMs / 1e3);
		}
		function Ut() {
			re.value?.toggleOpen();
		}
		let Wt = null;
		function Gt() {
			let e = F.value;
			if (!e) {
				h.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), h.pause();
				return;
			}
			Wt !== null && (clearInterval(Wt), Wt = null);
			let t = .05;
			Wt = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Wt), Wt = null, e.volume = 0, e.pause(), h.pause());
			}, 50);
		}
		Gi({
			playPause: Dt,
			seekBy: (e) => q(h.position + e),
			frameStep: (e) => {
				h.playing || q(h.position + e / 30);
			},
			volumeBy: (e) => h.setVolume(h.volume + e),
			toggleMute: Kt,
			toggleFullscreen: Jt,
			toggleCaptions: gt,
			toggleTheater: qt,
			togglePip: Xt,
			skipIntro: Vt,
			skipOutro: Ht,
			sleepTimer: Ut,
			seekToPercent: (e) => q(e * h.duration),
			speedStep: Bt,
			toggleHelp: () => {
				B.value = !B.value;
			}
		}, { enabled: () => !B.value && !$e.value && !st.value });
		function Kt() {
			h.toggleMute();
		}
		function qt() {
			V.value = !V.value, f("theater", V.value);
		}
		k(() => h.muted, (e) => {
			let t = F.value;
			t && t.muted !== e && (t.muted = e);
		}), k(() => h.volume, (e) => {
			let t = F.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), k(() => h.rate, (e) => {
			let t = F.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), k(() => h.lastCommand, (e) => {
			e && (e.type === "seekTo" ? Ve(e.value) : e.type === "seekBy" && Ve(h.position + e.value));
		});
		function Jt() {
			if (typeof document > "u") return;
			let e = I.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Yt() {
			R.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Xt() {
			let e = F.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			f("pip");
		}
		function Zt() {
			te.value = !0;
		}
		function Qt() {
			te.value = !1;
		}
		function $t() {
			bt &&= (clearTimeout(bt), void 0);
		}
		function en() {
			$t(), !(!h.playing || z.value) && (bt = setTimeout(() => {
				h.playing && !z.value && (L.value = !1);
			}, u.idleTimeout ?? 3e3));
		}
		function tn() {
			L.value = !0, en();
		}
		k(() => h.playing, (e) => {
			e ? (ye.value = !1, Je(), en()) : ($t(), L.value = !0);
		});
		let nn = null;
		return _(() => {
			h.setCurrent(u.media, {
				resetPosition: !1,
				streamUrl: u.streamUrl
			}), E.hydrate(u.media), typeof document < "u" && (document.addEventListener("fullscreenchange", Yt), ne.value = document.pictureInPictureEnabled === !0), nn = h.bindMediaSession({
				onPlay: () => void F.value?.play()?.catch(() => {}),
				onPause: () => F.value?.pause(),
				onSeek: (e) => q(e)
			}), yt = F.value?.textTracks ?? null, yt?.addEventListener?.("addtrack", ht), yt?.addEventListener?.("removetrack", ht), ht(), H.value && _e(), de(u.media.id);
		}), k(() => u.media, (e) => {
			h.setCurrent(e, {
				resetPosition: !1,
				streamUrl: u.streamUrl
			}), Be();
		}), k(() => u.media?.id, () => {
			E.hydrate(u.media);
		}), k(() => w.currentSession, (e) => {
			e && (e.state === "playing" ? (F.value?.play(), h.play()) : e.state === "paused" && (F.value?.pause(), h.pause()), w.updateLocalPosition(h.position), Math.abs(w.driftAmount) > 2 && Ve(e.playbackPosition));
		}), g(() => {
			$t(), We(), U.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", Yt), nn?.(), yt?.removeEventListener?.("addtrack", ht), yt?.removeEventListener?.("removetrack", ht), Wt !== null && (clearInterval(Wt), Wt = null), W !== null && (clearTimeout(W), W = null);
		}), (n, r) => (v(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: m(["player", {
				"is-chrome-hidden": !L.value,
				"is-theater": V.value
			}]),
			onPointermove: tn,
			onPointerdown: tn,
			onFocusin: tn
		}, [l(Mo, {
			video: F.value,
			enabled: T(x).atmosphere,
			playing: T(h).playing,
			"reduced-motion": T(x).effectiveReducedMotion,
			intensity: ae.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), s("div", Tl, [
			s("video", {
				ref_key: "videoRef",
				ref: F,
				class: "player__video",
				src: pe.value,
				poster: t.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: kt,
				onPause: At,
				onTimeupdate: jt,
				onLoadedmetadata: Mt,
				onCanplay: wt,
				onProgress: Nt,
				onVolumechange: Pt,
				onRatechange: Ft,
				onSeeked: It,
				onDurationchange: Lt,
				onEnded: Ke,
				onError: Ye,
				onEnterpictureinpicture: Zt,
				onLeavepictureinpicture: Qt,
				onClick: Dt
			}, [(v(!0), o(e, null, b(lt.value, (e) => (v(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Dl))), 128))], 40, El),
			r[17] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[18] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", Ol, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": T(S)("player.back"),
				onClick: r[0] ||= M((e) => f("back"), ["stop"])
			}, [l(J, { name: "arrow-left" })], 8, kl), s("div", Al, [
				s("p", jl, C(T(S)("player.nowPlaying")), 1),
				s("h2", Ml, C(t.media.name), 1),
				s("div", Nl, [(v(!0), o(e, null, b(xt.value, (t, n) => (v(), o(e, { key: n }, [n > 0 && !t.cert ? (v(), o("span", Pl, "·")) : a("", !0), s("span", { class: m({ player__cert: t.cert }) }, C(t.text), 3)], 64))), 128))])
			])]),
			me.value ? a("", !0) : (v(), o("div", Fl, [s("button", {
				type: "button",
				class: m(["player__bigplay", { "is-playing": T(h).playing }]),
				"aria-label": T(h).playing ? T(S)("player.pause") : T(S)("player.play"),
				onClick: M(Dt, ["stop"])
			}, [l(J, { name: T(h).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Il)])),
			l(qa, {
				video: F.value,
				language: T(h).subtitleLang,
				"style-config": T(x).captionStyle,
				lifted: L.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			me.value ? a("", !0) : (v(), o("div", {
				key: 1,
				class: "player__controls",
				onClick: r[5] ||= M(() => {}, ["stop"])
			}, [
				l(ri, {
					position: T(h).position,
					duration: T(h).duration,
					buffered: T(h).buffered,
					chapters: t.chapters,
					"thumbnail-at": fe.value,
					onSeek: q,
					onScrubStart: Rt,
					onScrubEnd: zt
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				T(x).showMarkerTimeline && t.markers && t.markers.length > 0 ? (v(), i(Xs, {
					key: 0,
					position: T(h).position,
					duration: T(h).duration,
					markers: t.markers,
					onSeek: q,
					onSimilar: Me
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", Ll, [
					t.prevEpisode ? (v(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": T(S)("player.previousEpisode"),
						onClick: Tt
					}, [l(J, { name: "skip-back" })], 8, Rl)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": T(h).playing ? T(S)("player.pause") : T(S)("player.play"),
						onClick: Dt
					}, [l(J, { name: T(h).playing ? "pause" : "play" }, null, 8, ["name"])], 8, zl),
					t.nextEpisode ? (v(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": T(S)("player.nextEpisode"),
						onClick: Et
					}, [l(J, { name: "skip-forward" })], 8, Bl)) : a("", !0),
					s("span", Vl, [
						c(C(T(X)(T(h).position)), 1),
						r[13] ||= s("span", { class: "player__sep" }, " / ", -1),
						c(C(T(X)(T(h).duration)), 1)
					]),
					r[14] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: m(["player__iconbtn player__favorite", { "is-on": D.value }]),
						"aria-label": D.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": D.value ? "true" : "false",
						onClick: j
					}, [l(J, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Hl),
					l(qr, {
						level: O.value,
						onCycle: N
					}, null, 8, ["level"]),
					l(ia),
					l(pa),
					l(Sa, {
						levels: T(U).levels.value,
						variants: T(U).variants.value,
						"current-level": T(U).currentLevel.value,
						"auto-enabled": T(U).autoEnabled.value,
						"active-height": T(U).activeLevelHeight.value,
						onSelect: G
					}, null, 8, [
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					l(xo, {
						open: $e.value,
						"onUpdate:open": r[1] ||= (e) => $e.value = e,
						tracks: Xe.value,
						"audio-tracks": at.value,
						"active-audio": ot.value,
						onSelectAudio: vt
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					l(Hs, {
						open: st.value,
						"onUpdate:open": r[2] ||= (e) => st.value = e,
						chapters: t.chapters ?? [],
						onSeek: q
					}, null, 8, ["open", "chapters"]),
					l(tc, {
						ref_key: "sleepTimerRef",
						ref: re,
						"on-expire": Gt
					}, null, 512),
					s("button", {
						type: "button",
						class: m(["player__iconbtn player__syncplay", { "is-on": T(w).isInRoom }]),
						"aria-label": T(w).isInRoom ? T(S)("syncplay.inRoom") : T(S)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[3] ||= (e) => ie.value = !0
					}, [l(J, { name: "user" })], 10, Ul),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": T(S)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[4] ||= (e) => B.value = !0
					}, [l(J, { name: "info" })], 8, Wl),
					ne.value ? (v(), o("button", {
						key: 2,
						type: "button",
						class: m(["player__iconbtn", { "is-on": te.value }]),
						"aria-label": te.value ? T(S)("player.exitPip") : T(S)("player.pip"),
						"aria-pressed": te.value,
						onClick: Xt
					}, [l(J, { name: "pip" })], 10, Gl)) : a("", !0),
					s("button", {
						type: "button",
						class: m(["player__iconbtn", { "is-on": V.value }]),
						"aria-label": V.value ? T(S)("player.exitTheater") : T(S)("player.theater"),
						"aria-pressed": V.value,
						onClick: qt
					}, [l(J, { name: "theater" })], 10, Kl),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": R.value ? T(S)("player.exitFullscreen") : T(S)("player.fullscreen"),
						onClick: Jt
					}, [l(J, { name: R.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ql)
				])
			])),
			me.value ? a("", !0) : (v(), i(Cs, {
				key: 2,
				position: T(h).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: q
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			me.value ? a("", !0) : (v(), i(ks, {
				key: 3,
				position: T(h).position,
				markers: t.markers,
				onSkip: q
			}, null, 8, ["position", "markers"])),
			ye.value && !me.value ? (v(), i(Lo, {
				key: 4,
				seconds: ve.value,
				onResume: He,
				onRestart: Ue
			}, null, 8, ["seconds"])) : a("", !0),
			Se.value && ze.value && !me.value ? (v(), i(ds, {
				key: 5,
				media: ze.value,
				remaining: Ce.value,
				total: T(8),
				counting: T(x).autoplay,
				onPlayNow: qe,
				onCancel: Je
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			l(sc, {
				modelValue: Oe.value,
				"onUpdate:modelValue": r[6] ||= (e) => Oe.value = e,
				title: `Similar ${Ee.value ?? "marker"}s`,
				size: "lg",
				onClose: Re
			}, {
				default: A(() => [s("div", Jl, [Ae.value ? (v(), o("div", Yl, [l(lc, { label: "Finding similar media" })])) : je.value ? (v(), o("div", Xl, [l(J, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", Zl, C(je.value), 1)])) : !Ae.value && ke.value.length === 0 ? (v(), o("div", Ql, [
					l(J, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[15] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[16] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (v(), o("ul", $l, [(v(!0), o(e, null, b(ke.value, (e) => (v(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", eu, [e.poster_url ? (v(), o("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, tu)) : (v(), o("div", nu, [l(J, { name: "film" })]))]), s("div", ru, [s("p", iu, C(e.name), 1), e.year ? (v(), o("p", au, [c(C(e.year) + " ", 1), e.runtime ? (v(), o("span", ou, " · " + C(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			he.value ? (v(), i(Ss, {
				key: 6,
				title: t.media.name,
				progress: T(U).progress.value,
				onBack: r[7] ||= (e) => f("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			ge.value ? (v(), i(gs, {
				key: 7,
				title: t.media.name,
				onBack: r[8] ||= (e) => f("back")
			}, null, 8, ["title"])) : a("", !0),
			T(w).isInRoom ? (v(), i(wl, {
				key: 8,
				position: T(h).position,
				duration: T(h).duration,
				"is-playing": T(h).playing,
				onSeek: q,
				onPlay: r[9] ||= (e) => void F.value?.play(),
				onPause: r[10] ||= (e) => void F.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			T(w).isInRoom ? (v(), i(Vc, { key: 9 })) : a("", !0),
			l(fl, {
				modelValue: ie.value,
				"onUpdate:modelValue": r[11] ||= (e) => ie.value = e
			}, null, 8, ["modelValue"]),
			l(ea, {
				open: B.value,
				onClose: r[12] ||= (e) => B.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-0ea924f3"]]), cu = ["aria-label"], lu = ["src", "poster"], uu = { class: "mini__body" }, du = { class: "mini__title" }, fu = { class: "mini__controls" }, pu = ["aria-label"], mu = ["aria-label", "aria-pressed"], hu = ["aria-label"], gu = ["aria-label"], _u = {
	class: "mini__progress",
	"aria-hidden": "true"
}, vu = /*#__PURE__*/ Y(/* @__PURE__ */ u({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let c = t, u = oe(), { t: f } = Z(), p = y(null), b = y(null), x = we(), S = d("phlixConfig", null), w = r(() => u.current ? x.isFavorite(u.current.id) : !1);
		function E() {
			let e = u.current?.id;
			e && x.toggleFavorite(e, S?.apiBase ?? "");
		}
		let D = r(() => u.miniPlayer && !!u.current && (!!u.streamUrl || !!u.hlsMasterUrl)), O = r(() => u.current?.name ?? ""), j = r(() => Math.max(0, Math.min(1, u.progress)));
		function M() {
			let e = p.value;
			e && (e.volume = u.volume, e.muted = u.muted, e.playbackRate = u.rate, u.position > 0 && (!e.duration || u.position < e.duration) && (e.currentTime = u.position), u.playing && e.play()?.catch(() => {}));
		}
		function N() {
			u.play();
		}
		function P() {
			u.pause();
		}
		function F() {
			let e = p.value;
			e && u.updateProgress(e.currentTime, e.duration);
		}
		function I() {
			let e = p.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function L() {
			u.current && c("expand", u.current.id);
		}
		function R() {
			u.closePlayer();
		}
		async function z() {
			let e = p.value;
			!e || !u.hlsMasterUrl || (b.value?.destroy(), b.value = null, b.value = await fi(e, u.hlsMasterUrl, {
				startPosition: u.position,
				onReady: () => {
					let e = p.value;
					e && (e.volume = u.volume, e.muted = u.muted, e.playbackRate = u.rate, u.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return k(() => D.value, async (e) => {
			if (!e) {
				b.value?.destroy(), b.value = null;
				return;
			}
			!u.hlsMasterUrl || u.streamUrl || await z();
		}), _(async () => {
			D.value && u.hlsMasterUrl && !u.streamUrl && await z();
		}), k(() => u.playing, (e) => {
			let t = p.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), k(() => u.lastCommand, (e) => {
			let t = p.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : u.position + e.value, r = t.duration && t.duration > 0 ? t.duration : u.duration, i = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = i, u.updateProgress(i, t.duration || void 0);
		}), g(() => {
			b.value?.destroy(), b.value = null, p.value?.pause?.();
		}), (e, t) => (v(), i(n, { name: "mini" }, {
			default: A(() => [D.value ? (v(), o("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": T(f)("player.miniPlayer")
			}, [
				s("video", {
					ref_key: "videoRef",
					ref: p,
					class: "mini__video",
					src: T(u).hlsMasterUrl ? "" : T(u).streamUrl,
					poster: T(u).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: M,
					onPlay: N,
					onPause: P,
					onTimeupdate: F,
					onClick: L
				}, null, 40, lu),
				s("div", uu, [s("p", du, C(O.value), 1), s("div", fu, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": T(u).playing ? T(f)("player.pause") : T(f)("player.play"),
						onClick: I
					}, [l(J, { name: T(u).playing ? "pause" : "play" }, null, 8, ["name"])], 8, pu),
					T(u).current ? (v(), o("button", {
						key: 0,
						type: "button",
						class: m(["mini__btn mini__btn--favorite", { "is-on": w.value }]),
						"aria-label": w.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": w.value ? "true" : "false",
						onClick: E
					}, [l(J, { name: w.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, mu)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": T(f)("player.expand"),
						onClick: L
					}, [l(J, { name: "expand" })], 8, hu),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": T(f)("player.closePlayer"),
						onClick: R
					}, [l(J, { name: "x" })], 8, gu)
				])]),
				s("div", _u, [s("div", {
					class: "mini__progress-fill",
					style: h({ transform: `scaleX(${j.value})` })
				}, null, 4)])
			], 8, cu)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
export { Co as AMBIENT_SAMPLE_H, wo as AMBIENT_SAMPLE_INTERVAL_MS, So as AMBIENT_SAMPLE_W, Bi as ARROW_ICONS, Vi as ARROW_LABELS, Mo as AmbientCanvas, Ha as CAPTION_BACKGROUND_OPTIONS, Va as CAPTION_COLOR_OPTIONS, Ua as CAPTION_EDGE_OPTIONS, Ba as CAPTION_SIZE_OPTIONS, za as CAPTION_SIZE_SCALE, qa as CaptionOverlay, xo as CaptionsMenu, Ro as DIRECT_PLAY_EXTENSIONS, vu as MiniPlayer, zi as PLAYER_SHORTCUTS, su as Player, Sa as QualityMenu, V as RESUME_MAX_RATIO, B as RESUME_MIN_SECONDS, Lo as ResumePrompt, ri as Scrubber, ea as ShortcutsHelp, Cs as SkipButton, pa as SpeedMenu, zo as TRANSCODE_EXTENSIONS, gs as TranscodeNotice, Ss as TranscodePreparing, Go as UPNEXT_COUNTDOWN_SECONDS, qo as UPNEXT_RING_CIRCUMFERENCE, Ko as UPNEXT_RING_RADIUS, ds as UpNext, ia as VolumeControl, Na as activeAudioIndex, Ao as ambientGradient, Ma as applyAudioTrack, ja as applyTrackModes, fi as attachHls, Eo as averageRegion, Ka as captionStyleVars, La as cleanCueText, Ga as edgeShadow, Vo as extensionOf, X as formatTime, Wi as handleShortcut, Aa as hasActiveCaptions, jo as isBatterySaving, Ci as isFailedStatus, Uo as isFatalMediaError, ci as isNativeHlsSupported, Si as isPlayable, Ui as isTypingTarget, Oa as listAudioTracks, Da as listSubtitleTracks, Ho as needsTranscode, gi as parseSubtitleTracks, bi as parseTranscodeStart, xi as parseTranscodeStatus, Ra as readActiveCueLines, wi as resolveStreamUrl, ka as resolveTextTrack, Oo as rgbString, ko as rgbaString, Jo as ringDashoffset, Do as sampleAmbient, vi as transcodeStartPath, yi as transcodeStatusPath, Ti as useHlsTranscode, Gi as useKeyboardShortcuts, oe as usePlayerStore };

//# sourceMappingURL=player.js.map