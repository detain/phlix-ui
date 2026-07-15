import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, markRaw as f, mergeModels as p, nextTick as m, normalizeClass as h, normalizeStyle as g, onBeforeUnmount as _, onMounted as v, openBlock as y, ref as b, renderList as x, renderSlot as S, resolveDynamicComponent as C, toDisplayString as w, toRef as T, unref as E, useId as D, useModel as O, vModelText as k, vShow as A, watch as j, withCtx as M, withDirectives as N, withModifiers as P } from "vue";
import { defineStore as F } from "pinia";
//#region src/stores/usePreferencesStore.ts
var I = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, L = {
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
	captionStyle: { ...I },
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
function R(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var z = "phlix.prefs";
function B() {
	if (typeof localStorage > "u") return { ...L };
	try {
		let e = localStorage.getItem(z);
		if (!e) return { ...L };
		let t = JSON.parse(e);
		return {
			...L,
			...t
		};
	} catch {
		return { ...L };
	}
}
function V() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var H = F("phlix-prefs", () => {
	let e = B(), t = b(e.theme), n = b(e.accent), i = b(e.density), a = b(e.cardSize), o = b(e.gridDensity), s = b(e.reducedMotion), c = b(e.autoplay), l = b(e.defaultVolume), u = b(e.defaultQuality), d = b(e.defaultSubtitleLang), f = b(e.defaultAudioLang), p = b(e.subtitlePreferenceSet), m = b({
		...I,
		...e.captionStyle
	}), h = b(e.atmosphere), g = b(e.tv), _ = b(e.filterPresets ? [...e.filterPresets] : []), v = b(e.showMarkerTimeline), y = b(e.crossfadeDuration), x = b(e.crossfadeFadeIn), S = b(e.crossfadeFadeOut), C = b(e.gaplessEnabled), w = b(e.preferredAudioQuality), T = b(V()), E = null;
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
			crossfadeDuration: y.value,
			crossfadeFadeIn: x.value,
			crossfadeFadeOut: S.value,
			gaplessEnabled: C.value,
			preferredAudioQuality: w.value
		};
	}
	function k(e, t) {
		let n = {
			id: R(e),
			name: e.trim(),
			query: t
		}, r = _.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? _.value.splice(r, 1, n) : _.value.push(n), n;
	}
	function A(e) {
		_.value = _.value.filter((t) => t.id !== e);
	}
	let M = null;
	function N() {
		M !== null && (clearTimeout(M), M = null);
		let e = O();
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(z, JSON.stringify(e));
		} catch {}
	}
	j(O, (e) => {
		M !== null && clearTimeout(M), M = setTimeout(() => {
			M = null;
			try {
				localStorage.setItem(z, JSON.stringify(e));
			} catch {}
		}, 250);
	}, { deep: !0 }), typeof window < "u" && window.addEventListener("pagehide", N);
	function P() {
		let e = L;
		t.value = e.theme, n.value = e.accent, i.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.reducedMotion, c.value = e.autoplay, l.value = e.defaultVolume, u.value = e.defaultQuality, d.value = e.defaultSubtitleLang, f.value = e.defaultAudioLang, p.value = e.subtitlePreferenceSet, m.value = { ...I }, h.value = e.atmosphere, g.value = e.tv, _.value = [...e.filterPresets], v.value = e.showMarkerTimeline, y.value = e.crossfadeDuration, x.value = e.crossfadeFadeIn, S.value = e.crossfadeFadeOut, C.value = e.gaplessEnabled, w.value = e.preferredAudioQuality;
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
		crossfadeDuration: y,
		crossfadeFadeIn: x,
		crossfadeFadeOut: S,
		gaplessEnabled: C,
		preferredAudioQuality: w,
		systemReduced: T,
		effectiveReducedMotion: D,
		snapshot: O,
		saveFilterPreset: k,
		removeFilterPreset: A,
		reset: P
	};
}), U = 30, ee = .95, te = 5e3, ne = "phlix.resume", re = "phlix.resume.touched";
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
var oe = F("phlix-player", () => {
	let e = H(), t = b(null), n = b(""), i = b([]), a = b(!1), o = b(0), s = b(0), c = b(0), l = b(e.defaultVolume), u = b(!1), d = b(1), f = b(e.defaultQuality), p = b(e.defaultSubtitleLang), m = b(""), h = b(!1), g = b(ie()), _ = b(ae()), v = b(null), y = 0, x = r(() => s.value > 0 ? o.value / s.value : 0), S = r(() => i.value[0] ?? null);
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
		t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (o.value = 0, s.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, c.value = 0), de(e);
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
	function U(e) {
		d.value = e;
	}
	function ee(e) {
		f.value = e;
	}
	function oe(e) {
		p.value = e;
	}
	function se(e) {
		i.value = [...e];
	}
	function W(e) {
		i.value.push(e);
	}
	function ce(e) {
		let t = i.value.shift() ?? null;
		return t && N(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function le() {
		h.value = !0;
	}
	function ue() {
		h.value = !1;
	}
	function G() {
		t.value && k(t.value.id, o.value, s.value), D(!0), a.value = !1, h.value = !1, t.value = null, n.value = "", m.value = "";
	}
	function de(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function K() {
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
	function fe(e) {
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
	function pe() {
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
		setRate: U,
		setQuality: ee,
		setSubtitle: oe,
		setQueue: se,
		enqueue: W,
		next: ce,
		showMiniPlayer: le,
		hideMiniPlayer: ue,
		closePlayer: G,
		setMediaSessionMetadata: de,
		setMediaPositionState: K,
		bindMediaSession: fe,
		seedFromPreferences: pe
	};
}), se = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, W = class extends Error {
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
function ue() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region src/api/tokenStore.ts
var G = "access_token", de = "refresh_token", K = "user", fe = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(G);
	}
	setAccessToken(e) {
		this.storage.setItem(G, e);
	}
	getRefreshToken() {
		return this.storage.getItem(de);
	}
	setRefreshToken(e) {
		this.storage.setItem(de, e);
	}
	getUser() {
		let e = this.storage.getItem(K);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(K, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(G), this.storage.removeItem(de), this.storage.removeItem(K);
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
function q(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function ve(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function ye(e) {
	let t = e && typeof e == "object" ? e : {}, n = q(t.name) ?? "Unknown Artist", r = ve(t.album_count);
	return {
		id: n,
		name: n,
		imageUrl: q(t.image_url),
		albumCount: r ?? void 0
	};
}
function be(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = q(n.title) ?? q(t.name) ?? q(t.title) ?? "Unknown Track";
	return {
		id: q(t.id) ?? "",
		title: r,
		durationSecs: ve(n.duration_secs) ?? ve(t.duration_secs) ?? 0,
		trackNumber: ve(n.track_number) ?? ve(t.track_number),
		streamUrl: q(t.stream_url)
	};
}
function xe(e) {
	let t = e && typeof e == "object" ? e : {}, n = q(t.name) ?? q(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [];
	return {
		id: n,
		title: n,
		albumArtUrl: q(t.album_art_url),
		year: ve(t.year),
		totalTracks: ve(t.track_count) ?? r.length,
		tracks: r.map(be)
	};
}
var Se = class {
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
			throw s ? new ce() : r?.aborted || e instanceof se ? e : e instanceof TypeError || ue() ? new W() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new se(this.extractError(t), e.status, t);
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
		return (Array.isArray(t.artists) ? t.artists : []).map(ye);
	}
	async getArtist(e, t) {
		return ye((await this.get(`/api/v1/music/artists/${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e, t) {
		let n = await this.get("/api/v1/music/albums", void 0, t), r = Array.isArray(n.albums) ? n.albums : [];
		return (e === void 0 || e === "" ? r : r.filter((t) => q((t && typeof t == "object" ? t : {}).artist) === e)).map(xe);
	}
	async getAlbum(e, t) {
		return xe((await this.get(`/api/v1/music/albums/${encodeURIComponent(e)}`, void 0, t)).album);
	}
	async listTracks(e, t) {
		let n = await this.get("/api/v1/music/tracks", void 0, t), r = Array.isArray(n.tracks) ? n.tracks : [];
		return (e === void 0 || e === "" ? r : r.filter((t) => q((t && typeof t == "object" ? t : {}).album) === e)).map(be);
	}
	async getTrack(e, t) {
		return be((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = this.loginPath);
	}
};
new Se();
//#endregion
//#region src/stores/useToastStore.ts
var Ce = F("phlix-toast", () => {
	let e = b([]), t = /* @__PURE__ */ new Map(), n = 0;
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
}), we = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), Te = F("user-item-data", () => {
	let e = b(/* @__PURE__ */ new Map()), t = null;
	function n(e) {
		return t ? t.setBaseUrl(e) : t = new Se({ baseUrl: e }), t;
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
		return e.value.get(t) ?? { ...we };
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
		let r = e.value.get(t) ?? { ...we };
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
			Ce().error(`Failed to ${n} favorites: ${le(t)}`);
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
			Ce().error(`Failed to mark ${n}: ${le(t)}`);
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
			c(e, { like_level: o }), Ce().error(`Failed to set rating: ${le(t)}`);
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
}), Ee = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function De(e, t) {
	return y(), o("svg", Ee, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var Oe = f({
	name: "lucide-play",
	render: De
}), ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ae(e, t) {
	return y(), o("svg", ke, [...t[0] ||= [s("g", {
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
var je = f({
	name: "lucide-pause",
	render: Ae
}), Me = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ne(e, t) {
	return y(), o("svg", Me, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var Pe = f({
	name: "lucide-skip-back",
	render: Ne
}), Fe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ie(e, t) {
	return y(), o("svg", Fe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var Le = f({
	name: "lucide-skip-forward",
	render: Ie
}), Re = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ze(e, t) {
	return y(), o("svg", Re, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var Be = f({
	name: "lucide-rotate-ccw",
	render: ze
}), Ve = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function He(e, t) {
	return y(), o("svg", Ve, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var Ue = f({
	name: "lucide-rotate-cw",
	render: He
}), We = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ge(e, t) {
	return y(), o("svg", We, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Ke = f({
	name: "lucide-volume-2",
	render: Ge
}), qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Je(e, t) {
	return y(), o("svg", qe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var Ye = f({
	name: "lucide-volume-1",
	render: Je
}), Xe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ze(e, t) {
	return y(), o("svg", Xe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var Qe = f({
	name: "lucide-volume-x",
	render: Ze
}), $e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function et(e, t) {
	return y(), o("svg", $e, [...t[0] ||= [s("g", {
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
var tt = f({
	name: "lucide-captions",
	render: et
}), nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rt(e, t) {
	return y(), o("svg", nt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var it = f({
	name: "lucide-captions-off",
	render: rt
}), at = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ot(e, t) {
	return y(), o("svg", at, [...t[0] ||= [s("g", {
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
var st = f({
	name: "lucide-picture-in-picture-2",
	render: ot
}), ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lt(e, t) {
	return y(), o("svg", ct, [...t[0] ||= [s("rect", {
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
var ut = f({
	name: "lucide-rectangle-horizontal",
	render: lt
}), dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ft(e, t) {
	return y(), o("svg", dt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var pt = f({
	name: "lucide-maximize",
	render: ft
}), mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ht(e, t) {
	return y(), o("svg", mt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var gt = f({
	name: "lucide-minimize",
	render: ht
}), _t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vt(e, t) {
	return y(), o("svg", _t, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var yt = f({
	name: "lucide-maximize-2",
	render: vt
}), bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xt(e, t) {
	return y(), o("svg", bt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var St = f({
	name: "lucide-cast",
	render: xt
}), Ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wt(e, t) {
	return y(), o("svg", Ct, [...t[0] ||= [s("g", {
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
var Tt = f({
	name: "lucide-settings",
	render: wt
}), Et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dt(e, t) {
	return y(), o("svg", Et, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Ot = f({
	name: "lucide-gauge",
	render: Dt
}), kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function At(e, t) {
	return y(), o("svg", kt, [...t[0] ||= [s("g", {
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
var jt = f({
	name: "lucide-film",
	render: At
}), Mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nt(e, t) {
	return y(), o("svg", Mt, [...t[0] ||= [s("g", {
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
var Pt = f({
	name: "lucide-image",
	render: Nt
}), Ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function It(e, t) {
	return y(), o("svg", Ft, [...t[0] ||= [s("g", {
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
var Lt = f({
	name: "lucide-music",
	render: It
}), Rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zt(e, t) {
	return y(), o("svg", Rt, [...t[0] ||= [s("g", {
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
var Bt = f({
	name: "lucide-tv",
	render: zt
}), J = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vt(e, t) {
	return y(), o("svg", J, [...t[0] ||= [s("g", {
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
var Ht = f({
	name: "lucide-search",
	render: Vt
}), Ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wt(e, t) {
	return y(), o("svg", Ut, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Gt = f({
	name: "lucide-sliders-horizontal",
	render: Wt
}), Kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qt(e, t) {
	return y(), o("svg", Kt, [...t[0] ||= [s("g", {
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
var Jt = f({
	name: "lucide-calendar",
	render: qt
}), Yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xt(e, t) {
	return y(), o("svg", Yt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Zt = f({
	name: "lucide-arrow-up-down",
	render: Xt
}), Qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $t(e, t) {
	return y(), o("svg", Qt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var en = f({
	name: "lucide-star",
	render: $t
}), tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nn(e, t) {
	return y(), o("svg", tn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var rn = f({
	name: "lucide-list",
	render: nn
}), an = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function on(e, t) {
	return y(), o("svg", an, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var sn = f({
	name: "lucide-plus",
	render: on
}), cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ln(e, t) {
	return y(), o("svg", cn, [...t[0] ||= [s("g", {
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
var un = f({
	name: "lucide-info",
	render: ln
}), dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fn(e, t) {
	return y(), o("svg", dn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var pn = f({
	name: "lucide-x",
	render: fn
}), mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hn(e, t) {
	return y(), o("svg", mn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var gn = f({
	name: "lucide-check",
	render: hn
}), _n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vn(e, t) {
	return y(), o("svg", _n, [...t[0] ||= [s("g", {
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
var yn = f({
	name: "lucide-lock",
	render: vn
}), bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xn(e, t) {
	return y(), o("svg", bn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Sn = f({
	name: "lucide-bookmark",
	render: xn
}), Cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wn(e, t) {
	return y(), o("svg", Cn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Tn = f({
	name: "lucide-bookmark-plus",
	render: wn
}), En = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dn(e, t) {
	return y(), o("svg", En, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var On = f({
	name: "lucide-heart",
	render: Dn
}), kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function An(e, t) {
	return y(), o("svg", kn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var jn = f({
	name: "lucide-thumbs-up",
	render: An
}), Mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nn(e, t) {
	return y(), o("svg", Mn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var Pn = f({
	name: "lucide-thumbs-down",
	render: Nn
}), Fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function In(e, t) {
	return y(), o("svg", Fn, [...t[0] ||= [s("g", {
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
var Ln = f({
	name: "lucide-user",
	render: In
}), Rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zn(e, t) {
	return y(), o("svg", Rn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Bn = f({
	name: "lucide-log-out",
	render: zn
}), Vn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Hn(e, t) {
	return y(), o("svg", Vn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Un = f({
	name: "lucide-menu",
	render: Hn
}), Wn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gn(e, t) {
	return y(), o("svg", Wn, [...t[0] ||= [s("g", {
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
var Kn = f({
	name: "lucide-more-horizontal",
	render: Gn
}), qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jn(e, t) {
	return y(), o("svg", qn, [...t[0] ||= [s("g", {
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
var Yn = f({
	name: "lucide-eye",
	render: Jn
}), Xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zn(e, t) {
	return y(), o("svg", Xn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Qn = f({
	name: "lucide-eye-off",
	render: Zn
}), $n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function er(e, t) {
	return y(), o("svg", $n, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var tr = f({
	name: "lucide-arrow-left",
	render: er
}), nr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rr(e, t) {
	return y(), o("svg", nr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var ir = f({
	name: "lucide-arrow-right",
	render: rr
}), ar = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function or(e, t) {
	return y(), o("svg", ar, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var sr = f({
	name: "lucide-arrow-up",
	render: or
}), cr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lr(e, t) {
	return y(), o("svg", cr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var ur = f({
	name: "lucide-arrow-down",
	render: lr
}), dr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fr(e, t) {
	return y(), o("svg", dr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var pr = f({
	name: "lucide-chevron-down",
	render: fr
}), mr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hr(e, t) {
	return y(), o("svg", mr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var gr = f({
	name: "lucide-chevron-up",
	render: hr
}), _r = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vr(e, t) {
	return y(), o("svg", _r, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var yr = f({
	name: "lucide-chevron-left",
	render: vr
}), br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xr(e, t) {
	return y(), o("svg", br, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Sr = f({
	name: "lucide-chevron-right",
	render: xr
}), Cr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wr(e, t) {
	return y(), o("svg", Cr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Tr = f({
	name: "lucide-loader-circle",
	render: wr
}), Er = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dr(e, t) {
	return y(), o("svg", Er, [...t[0] ||= [s("g", {
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
var Or = f({
	name: "lucide-circle-alert",
	render: Dr
}), kr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ar(e, t) {
	return y(), o("svg", kr, [...t[0] ||= [s("g", {
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
var jr = f({
	name: "lucide-circle-check",
	render: Ar
}), Mr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nr(e, t) {
	return y(), o("svg", Mr, [...t[0] ||= [s("g", {
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
var Pr = f({
	name: "lucide-circle-x",
	render: Nr
}), Fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ir(e, t) {
	return y(), o("svg", Fr, [...t[0] ||= [s("g", {
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
var Lr = f({
	name: "lucide-sun",
	render: Ir
}), Rr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zr(e, t) {
	return y(), o("svg", Rr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Br = f({
	name: "lucide-moon",
	render: zr
}), Vr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Hr(e, t) {
	return y(), o("svg", Vr, [...t[0] ||= [s("g", {
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
var Ur = f({
	name: "lucide-monitor",
	render: Hr
}), Y = /* @__PURE__ */ u({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = {
			play: Oe,
			pause: je,
			"skip-back": Pe,
			"skip-forward": Le,
			rewind: Be,
			forward: Ue,
			volume: Ke,
			"volume-low": Ye,
			mute: Qe,
			captions: tt,
			"captions-off": it,
			pip: st,
			theater: ut,
			fullscreen: pt,
			"fullscreen-exit": gt,
			expand: yt,
			cast: St,
			settings: Tt,
			speed: Ot,
			film: jt,
			image: Pt,
			music: Lt,
			tv: Bt,
			search: Ht,
			filter: Gt,
			calendar: Jt,
			sort: Zt,
			star: en,
			list: rn,
			plus: sn,
			info: un,
			x: pn,
			check: gn,
			lock: yn,
			bookmark: Sn,
			"bookmark-plus": Tn,
			heart: On,
			"thumbs-up": jn,
			"thumbs-down": Pn,
			user: Ln,
			"log-out": Bn,
			menu: Un,
			more: Kn,
			eye: Yn,
			"eye-off": Qn,
			"arrow-left": tr,
			"arrow-right": ir,
			"arrow-up": sr,
			"arrow-down": ur,
			"chevron-down": pr,
			"chevron-up": gr,
			"chevron-left": yr,
			"chevron-right": Sr,
			spinner: Tr,
			alert: Or,
			success: jr,
			error: Pr,
			sun: Lr,
			moon: Br,
			monitor: Ur
		}, n = e, a = r(() => t[n.name]), o = r(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (t, n) => (y(), i(C(a.value), {
			class: "phlix-icon",
			style: g(o.value ? { fontSize: o.value } : void 0),
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
}), Wr = ["data-level"], Gr = ["disabled", "aria-pressed"], Kr = ["disabled", "aria-pressed"], qr = /*@__PURE__*/ u({
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
		}), c = r(() => s.value >= 0), u = r(() => s.value <= 0), d = r(() => s.value >= 1), f = r(() => s.value === 2), p = r(() => s.value <= -1), m = r(() => s.value === -2);
		function g() {
			return s.value <= 0 ? 1 : s.value === 1 ? 2 : 0;
		}
		function _() {
			return s.value >= 0 ? -1 : s.value === -1 ? -2 : 0;
		}
		function v() {
			if (n.disabled) return;
			let e = g();
			i("cycle", e), i("update:level", e);
		}
		function b() {
			if (n.disabled) return;
			let e = _();
			i("cycle", e), i("update:level", e);
		}
		return (t, n) => (y(), o("div", {
			class: "thumb-rating",
			"data-level": s.value
		}, [c.value ? (y(), o("button", {
			key: 0,
			type: "button",
			class: h(["thumb-rating__btn thumb-rating__btn--up", {
				"is-filled": d.value,
				"is-blue": f.value
			}]),
			disabled: e.disabled,
			"aria-label": "Like",
			"aria-pressed": d.value ? "true" : "false",
			onClick: v
		}, [l(Y, {
			name: "thumbs-up",
			class: "thumb-rating__icon"
		})], 10, Gr)) : a("", !0), u.value ? (y(), o("button", {
			key: 1,
			type: "button",
			class: h(["thumb-rating__btn thumb-rating__btn--down", {
				"is-filled": p.value,
				"is-blue": m.value
			}]),
			disabled: e.disabled,
			"aria-label": "Dislike",
			"aria-pressed": p.value ? "true" : "false",
			onClick: b
		}, [l(Y, {
			name: "thumbs-down",
			class: "thumb-rating__icon"
		})], 10, Kr)) : a("", !0)], 8, Wr));
	}
}), X = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Jr = /*#__PURE__*/ X(qr, [["__scopeId", "data-v-554f8af9"]]);
//#endregion
//#region src/components/player/format-time.ts
function Z(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/i18n/messages.ts
var Yr = {
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
}, Xr = /\{(\w+)\}/g;
function Zr(e) {
	let t = {};
	for (let n of Object.keys(Yr)) {
		let r = Yr[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function Qr(e, t) {
	return t ? e.replace(Xr, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function $r(e) {
	let t = Zr(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? Qr(s, n) : e;
	};
}
//#endregion
//#region src/composables/useMessages.ts
function Q() {
	return { t: $r(d("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ei = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], ti = { class: "scrubber__track" }, ni = ["title"], ri = { class: "scrubber__time numeric" }, ii = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let { t: c } = Q(), l = t, u = i, d = b(null), f = b(!1), p = b(!1), m = b(0), _ = b(0), v = (e) => Math.min(1, Math.max(0, e)), S = r(() => f.value ? m.value : l.duration > 0 ? v(l.position / l.duration) : 0), C = r(() => l.duration > 0 ? v(l.buffered / l.duration) : 0), T = r(() => (f.value || p.value) && l.duration > 0), D = r(() => f.value ? m.value : _.value), O = r(() => D.value * l.duration), k = r(() => T.value ? l.thumbnailAt?.(O.value) ?? null : null), A = r(() => k.value ? `url("${k.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), j = r(() => `${Math.min(96, Math.max(4, D.value * 100))}%`), M = r(() => l.duration > 0 ? l.chapters.filter((e) => e.start > 0 && e.start < l.duration).map((e) => ({
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
			if (!(l.duration <= 0)) {
				f.value = !0;
				try {
					d.value?.setPointerCapture?.(e.pointerId);
				} catch {}
				m.value = N(e), u("scrub-start"), e.preventDefault();
			}
		}
		function F(e) {
			let t = N(e);
			_.value = t, f.value && (m.value = t);
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
			playedRatio: S,
			previewActive: T
		}), (n, r) => (y(), o("div", {
			ref_key: "trackEl",
			ref: d,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(t.duration),
			"aria-valuenow": Math.round(t.position),
			"aria-valuetext": E(Z)(t.position),
			"aria-label": E(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", ti, [
			s("div", {
				class: "scrubber__buffered",
				style: g({ transform: `scaleX(${C.value})` })
			}, null, 4),
			s("div", {
				class: "scrubber__played",
				style: g({ transform: `scaleX(${S.value})` })
			}, null, 4),
			(y(!0), o(e, null, x(M.value, (e, t) => (y(), o("span", {
				key: t,
				class: "scrubber__tick",
				style: g({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, ni))), 128)),
			s("div", {
				class: h(["scrubber__head", { "is-dragging": f.value }]),
				style: g({ left: `${S.value * 100}%` })
			}, null, 6)
		]), T.value ? (y(), o("div", {
			key: 0,
			class: "scrubber__preview",
			style: g({ left: j.value }),
			"aria-hidden": "true"
		}, [k.value ? (y(), o("div", {
			key: 0,
			class: "scrubber__thumb",
			style: g({ backgroundImage: A.value })
		}, null, 4)) : a("", !0), s("span", ri, w(E(Z)(O.value)), 1)], 4)) : a("", !0)], 40, ei));
	}
}), [["__scopeId", "data-v-3d610715"]]), ai = "phlix-bandwidth-estimate";
function oi(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function si() {
	try {
		let e = localStorage.getItem(ai);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? oi(t) : 0;
	} catch {
		return 0;
	}
}
function ci(e) {
	try {
		localStorage.setItem(ai, String(e));
	} catch {}
}
function li(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var ui = null, di = null;
function fi() {
	ui && ci(ui.bandwidthEstimate);
}
async function pi(e, t, n = {}) {
	if (typeof MediaSource > "u" && li(e)) {
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
		let i = si(), a = new r({
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
		}), ui = a, di !== null && clearInterval(di), di = setInterval(fi, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				ci(a.bandwidthEstimate), di !== null && (clearInterval(di), di = null), ui = null;
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
var mi = new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function hi(e, t = "") {
	return typeof e == "string" ? e : t;
}
function gi(e) {
	return e === !0 || e === "true" || e === 1;
}
function _i(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function vi(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = hi(e.url ?? e.src);
		r !== "" && t.push({
			index: _i(e.index),
			language: hi(e.language ?? e.lang ?? e.srclang),
			label: hi(e.label),
			default: gi(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function yi(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = _i(e.height);
		r <= 0 || t.push({
			id: hi(e.id),
			label: hi(e.label),
			height: r,
			width: _i(e.width),
			bitrate: _i(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function bi(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function xi(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Si(e) {
	let t = e ?? {};
	return {
		jobId: hi(t.job_id ?? t.jobId),
		masterUrl: hi(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: hi(t.status, "running"),
		reused: gi(t.reused),
		subtitles: vi(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: yi(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ci(e) {
	let t = e ?? {};
	return {
		jobId: hi(t.job_id ?? t.jobId),
		status: hi(t.status, "running"),
		playlistReady: gi(t.playlist_ready ?? t.playlistReady),
		progress: _i(t.progress),
		masterUrl: hi(t.master_url ?? t.masterUrl),
		subtitles: vi(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: yi(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function wi(e) {
	return e.playlistReady || e.status === "completed";
}
function Ti(e) {
	return mi.has(e);
}
function Ei(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Di(e) {
	let t = b("idle"), n = b(0), r = b([]), i = b([]), a = b(-1), o = b(!0), s = b(null), c = b(null), l = b([]), u = b(-1), d = b(null), f = b(null);
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
			url: Ei(n, e.url)
		}));
	}
	let y = e.attach ?? pi, x = e.pollIntervalMs ?? 1e3, S = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(S / Math.max(1, x))), T = Oi(), E = e.getToken ?? (() => ki(T)), D = null, O = null, k = null, A = !1, j = null;
	function M() {
		return e.client ?? new Se({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function N(i, a, o, s) {
		R(), A = !1, j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = M(), c = Si(await r.post(bi(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = Ei(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < w; e++) {
				let e = Ci(await r.get(xi(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), Ti(e.status)) throw Error(`transcode ${e.status}`);
				if (wi(e)) {
					l = !0;
					break;
				}
				if (await C(x), A) return;
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
function Oi() {
	try {
		return new fe();
	} catch {
		return null;
	}
}
function ki(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Ai = 10, ji = 6;
function Mi(e) {
	let t = b(null), n = b(!1), r = b(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new Se({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % Ai, s = Math.floor(i / Ai), c = a / (Ai - 1) * 100, l = s / (ji - 1) * 100;
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
var Ni = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Pi = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		return (t, r) => (y(), o("button", {
			type: e.type,
			class: h(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [l(Y, {
			name: e.loading ? "spinner" : e.name,
			class: h({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, Ni));
	}
}), [["__scopeId", "data-v-48bb9819"]]), Fi = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Ii = 0, Li = "";
function Ri() {
	Ii === 0 && (Li = document.body.style.overflow, document.body.style.overflow = "hidden"), Ii++;
}
function zi() {
	Ii !== 0 && (Ii--, Ii === 0 && (document.body.style.overflow = Li));
}
function Bi(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(Fi)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		i = document.activeElement, e.value?.setAttribute("data-focus-trap", ""), r && (Ri(), a = !0), document.addEventListener("keydown", s, !0), m(() => {
			e.value?.setAttribute("data-focus-trap", ""), (o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (zi(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	j(t, (e) => e ? c() : l(), { immediate: !0 }), _(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (zi(), !1);
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var Vi = [
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
], Hi = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Ui = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Wi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Gi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Ki(e, t) {
	switch (e.key) {
		case " ": return Wi(e.target) ? !1 : (t.playPause(), !0);
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
function qi(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Gi(n.target) || Ki(n, e) && n.preventDefault();
	}
	v(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), _(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Ji = ["aria-label"], Yi = { class: "shortcuts__head" }, Xi = { class: "shortcuts__title" }, Zi = { class: "shortcuts__grid" }, Qi = { class: "shortcuts__keys" }, $i = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, ea = {
	key: 1,
	class: "shortcuts__key"
}, ta = { class: "shortcuts__label" }, na = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Vi }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, u = n, { t: d } = Q(), f = b(null);
		return Bi(f, T(r, "open"), {
			lockScroll: !1,
			onEscape: () => (u("close"), !0)
		}), (n, r) => t.open ? (y(), o("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= P((e) => u("close"), ["self"])
		}, [s("div", {
			ref_key: "panelEl",
			ref: f,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": E(d)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [s("div", Yi, [s("h3", Xi, w(E(d)("player.keyboard")), 1), l(Pi, {
			name: "x",
			label: E(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => u("close")
		}, null, 8, ["label"])]), s("ul", Zi, [(y(!0), o(e, null, x(t.shortcuts, (t) => (y(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", Qi, [(y(!0), o(e, null, x(t.keys, (t, n) => (y(), o(e, { key: n }, [t === "–" ? (y(), o("span", $i, "–")) : (y(), o("kbd", ea, [E(Hi)[t] ? (y(), i(Y, {
			key: 0,
			name: E(Hi)[t],
			label: E(Ui)[t] ?? t
		}, null, 8, ["name", "label"])) : (y(), o(e, { key: 1 }, [c(w(t), 1)], 64))]))], 64))), 128))]), s("span", ta, w(t.label), 1)]))), 128))])], 8, Ji)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), ra = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], ia = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let n = e, i = t, a = b(null), c = b(!1), l = r(() => {
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
		function _(e) {
			c.value && f(p(e.clientX));
		}
		function v(e) {
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
		return (t, n) => (y(), o("div", {
			class: h(["phlix-slider", { "is-disabled": e.disabled }]),
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
			onPointerdown: m,
			onPointermove: _,
			onPointerup: v
		}, [s("div", {
			class: "phlix-slider__fill",
			style: g({ width: l.value + "%" })
		}, null, 4), s("div", {
			class: "phlix-slider__thumb",
			style: g({ left: l.value + "%" })
		}, null, 4)], 544)], 42, ra));
	}
}), [["__scopeId", "data-v-644a7ce9"]]), aa = { class: "volume" }, oa = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "VolumeControl",
	setup(e) {
		let t = oe(), n = H(), { t: i } = Q(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return j(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (y(), o("div", aa, [l(Pi, {
			name: s.value,
			label: E(t).muted ? E(i)("player.unmute") : E(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => E(t).toggleMute()
		}, null, 8, ["name", "label"]), l(ia, {
			class: "volume__slider",
			"model-value": a.value,
			min: 0,
			max: 1,
			step: .05,
			label: E(i)("player.volume"),
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
function sa(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function ca(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function la(e, t) {
	return t === "first" ? ca(e, -1, 1) : ca(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var ua = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], da = ["id", "aria-label"], fa = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], pa = { class: "phlix-select__check" }, ma = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "Select",
	props: /*@__PURE__*/ p({
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
	emits: /*@__PURE__*/ p(["update:modelValue", "change"], ["update:open"]),
	setup(t, { expose: n, emit: u }) {
		let d = t, { t: f } = Q(), p = u, g = r(() => sa(d.options)), v = D(), S = b(!1), C = b(-1), T = b(null), k = b(null);
		function M() {
			S.value ? U() : H();
		}
		n({ toggleMenu: M });
		let P = "", F, I = O(t, "open"), L = r(() => g.value.findIndex((e) => e.value === d.modelValue));
		j(I, (e) => {
			e && !S.value ? H() : !e && S.value && U();
		}, { immediate: !0 });
		let R = r(() => g.value[L.value]?.label ?? ""), z = r(() => C.value >= 0 ? `${v}-opt-${C.value}` : void 0), B = b(!1);
		function V() {
			let e = T.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			B.value = n < 284 && r > n;
		}
		function H() {
			d.disabled || S.value || (V(), S.value = !0, C.value = L.value >= 0 ? L.value : la(g.value, "first"), m(ne));
		}
		function U() {
			S.value = !1;
		}
		function ee(e) {
			let t = g.value[e];
			!t || t.disabled || (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), U(), T.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function te(e) {
			C.value = ca(g.value, C.value, e), m(ne);
		}
		function ne() {
			(k.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function re(e) {
			if (!d.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), S.value ? te(1) : H();
					break;
				case "ArrowUp":
					e.preventDefault(), S.value ? te(-1) : H();
					break;
				case "Home":
					S.value && (e.preventDefault(), C.value = la(g.value, "first"), m(ne));
					break;
				case "End":
					S.value && (e.preventDefault(), C.value = la(g.value, "last"), m(ne));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), S.value && C.value >= 0 ? ee(C.value) : H();
					break;
				case "Escape":
					S.value && (e.preventDefault(), U());
					break;
				case "Tab":
					U();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && ie(e.key);
			}
		}
		function ie(e) {
			S.value || H(), P += e.toLowerCase(), clearTimeout(F), F = setTimeout(() => P = "", 600);
			let t = g.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(P));
			t >= 0 && (C.value = t, m(ne));
		}
		function ae(e) {
			S.value && T.value && !T.value.contains(e.target) && U();
		}
		return j(S, (e) => {
			e ? document.addEventListener("pointerdown", ae, !0) : document.removeEventListener("pointerdown", ae, !0);
		}), _(() => {
			document.removeEventListener("pointerdown", ae, !0), clearTimeout(F);
		}), (n, r) => (y(), o("div", {
			ref_key: "rootEl",
			ref: T,
			class: h(["phlix-select", {
				"is-open": S.value,
				"is-disabled": t.disabled,
				"is-glass": t.tone === "glass"
			}])
		}, [s("button", {
			type: "button",
			class: "phlix-select__trigger",
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": S.value,
			"aria-controls": S.value ? `${E(v)}-list` : void 0,
			"aria-activedescendant": S.value ? z.value : void 0,
			"aria-label": t.label,
			disabled: t.disabled,
			onClick: r[0] ||= (e) => S.value ? U() : H(),
			onKeydown: re
		}, [s("span", { class: h(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, w(L.value >= 0 ? R.value : t.placeholder ?? E(f)("common.selectPlaceholder")), 3), l(Y, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, ua), N(s("ul", {
			id: `${E(v)}-list`,
			ref_key: "listEl",
			ref: k,
			class: h(["phlix-select__list", { "is-up": B.value }]),
			role: "listbox",
			"aria-label": t.label
		}, [(y(!0), o(e, null, x(g.value, (e, n) => (y(), o("li", {
			id: `${E(v)}-opt-${n}`,
			key: e.value,
			class: h(["phlix-select__option", {
				"is-active": n === C.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => ee(n),
			onPointermove: (t) => !e.disabled && (C.value = n)
		}, [s("span", pa, [e.value === t.modelValue ? (y(), i(Y, {
			key: 0,
			name: "check"
		})) : a("", !0)]), c(" " + w(e.label), 1)], 42, fa))), 128))], 10, da), [[A, S.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]), ha = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		], n = oe(), { t: a } = Q(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (y(), i(ma, {
			class: "speed-menu",
			tone: "glass",
			"model-value": E(n).rate,
			options: o.value,
			label: E(a)("player.playbackSpeed"),
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), ga = "auto", _a = "original";
function va(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function ya(e) {
	return e >= 2160 ? "4K" : va(e);
}
function ba(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = va(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: ya(r.height)
		}));
	}
	return n;
}
function xa(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) va(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Sa(e, t) {
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
function Ca(e, t) {
	if (t < 0) return ga;
	let n = e.find((e) => e.index === t);
	return n ? va(n.height) : ga;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var wa = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "QualityMenu",
	props: /*@__PURE__*/ p({
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
	emits: /*@__PURE__*/ p(["select"], ["update:open"]),
	setup(e, { expose: t, emit: n }) {
		let o = e, s = O(e, "open"), c = b(null);
		function l() {
			c.value?.toggleMenu();
		}
		let u = n, d = oe(), f = H(), { t: p } = Q(), m = r(() => ba(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = va(r.height);
				e.has(i) || n && xa(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: ya(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => Sa(o.levels, _.value)), x = r(() => _.value && v.value >= 0 ? {
			value: _a,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), S = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: ya(o.activeHeight) })), w = r(() => [
			{
				value: ga,
				label: C.value
			},
			...x.value ? [x.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? ga : x.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? _a : Ca(o.levels, o.currentLevel));
		function D(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : xa(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => S.value || s.value ? (y(), i(ma, {
			key: 0,
			ref_key: "selectRef",
			ref: c,
			class: "quality-menu",
			tone: "glass",
			"model-value": T.value,
			options: w.value,
			label: E(p)("player.quality"),
			open: s.value,
			"onUpdate:open": t[0] ||= (e) => s.value = e,
			"onUpdate:modelValue": D
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
function Ta(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function Ea(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Da(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Oa(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function ka(e) {
	return e ? Ta(e.textTracks).filter(Ea).map((e, t) => ({
		index: t,
		language: Da(e, t),
		label: e.label || Oa(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function Aa(e) {
	let t = e?.audioTracks;
	return Ta(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Oa(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function ja(e, t) {
	return !e || t == null ? null : Ta(e.textTracks).filter(Ea).find((e, n) => Da(e, n) === t) ?? null;
}
function Ma(e, t) {
	return ja(e, t) != null;
}
function Na(e, t) {
	e && Ta(e.textTracks).filter(Ea).forEach((e, n) => {
		try {
			e.mode = Da(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function Pa(e, t) {
	let n = e?.audioTracks;
	Ta(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Fa(e) {
	let t = e?.audioTracks;
	return Ta(t).findIndex((e) => e.enabled);
}
var Ia = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function La(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Ra(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && La(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(Ia, n) ? Ia[n] : e;
	});
}
function za(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Ra(e).trim()).filter((e) => e.length > 0) : [];
}
function Ba(e) {
	if (!e) return [];
	let t = Ta(e.activeCues), n = [];
	for (let e of t) n.push(...za(e.text));
	return n;
}
var Va = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Ha = [
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
], Ua = [
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
], Wa = [
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
], Ga = [
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
function Ka(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function qa(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Ja(e) {
	return {
		"--cap-scale": String(Va[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": Ka(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": qa(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var Ya = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(t, { expose: n }) {
		let i = t, s = b([]), c = r(() => Ja(i.styleConfig)), l = null, u = null;
		function d() {
			s.value = Ba(l);
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
		function m() {
			f(), Na(i.video, i.language);
			let e = ja(i.video, i.language);
			if (e) {
				if (l = e, e.addEventListener("cuechange", d), s.value = Ba(e), !s.value.length) {
					let t = p(i.video, e);
					t && t.readyState !== 2 && (u = t, t.addEventListener("load", d));
				}
			} else s.value = [];
		}
		return j(() => [i.video, i.language], m, { immediate: !0 }), _(f), n({ lines: s }), (n, r) => s.value.length ? (y(), o("div", {
			key: 0,
			class: h(["player__captions", { "is-lifted": t.lifted }]),
			style: g(c.value)
		}, [(y(!0), o(e, null, x(s.value, (e, t) => (y(), o("p", {
			key: t,
			class: "player__caption-line"
		}, w(e), 1))), 128))], 6)) : a("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), Xa = ["aria-label", "aria-expanded"], Za = ["aria-label"], Qa = { class: "capmenu__head" }, $a = { class: "capmenu__title" }, eo = ["aria-label"], to = ["aria-checked", "tabindex"], no = { class: "capmenu__check" }, ro = { class: "capmenu__optlabel" }, io = [
	"aria-checked",
	"tabindex",
	"onClick"
], ao = { class: "capmenu__check" }, oo = { class: "capmenu__optlabel" }, so = { class: "capmenu__title capmenu__title--sub" }, co = ["aria-label"], lo = [
	"aria-checked",
	"tabindex",
	"onClick"
], uo = { class: "capmenu__check" }, fo = { class: "capmenu__optlabel" }, po = { class: "capmenu__title capmenu__title--sub" }, mo = { class: "capmenu__style" }, ho = { class: "capmenu__field" }, go = { class: "capmenu__fieldlabel" }, _o = { class: "capmenu__field" }, vo = { class: "capmenu__fieldlabel" }, yo = { class: "capmenu__field" }, bo = { class: "capmenu__fieldlabel" }, xo = { class: "capmenu__field" }, So = { class: "capmenu__fieldlabel" }, Co = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let c = t, u = n, d = oe(), f = H(), { t: p } = Q(), m = b(null), g = b(null), v = r(() => d.subtitleLang), S = r(() => c.tracks.some((e) => e.language === v.value)), C = r(() => S.value ? "captions" : "captions-off"), D = r(() => S.value ? c.tracks.findIndex((e) => e.language === v.value) + 1 : 0), O = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
		function k(e) {
			u("update:open", e);
		}
		function A() {
			k(!1);
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
		Bi(g, T(c, "open"), {
			lockScroll: !1,
			onEscape: () => (A(), !0)
		});
		function V(e) {
			m.value && !m.value.contains(e.target) && A();
		}
		return j(() => c.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0));
		}, { immediate: !0 }), _(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", V, !0);
		}), (n, r) => (y(), o("div", {
			ref_key: "rootEl",
			ref: m,
			class: "capmenu"
		}, [s("button", {
			type: "button",
			class: h(["capmenu__btn", { "is-active": S.value }]),
			"aria-label": S.value ? E(p)("player.captionsOn") : E(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: r[0] ||= (e) => k(!t.open)
		}, [l(Y, { name: C.value }, null, 8, ["name"])], 10, Xa), t.open ? (y(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: g,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": E(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", Qa, [s("h3", $a, w(E(p)("player.subtitles")), 1), l(Pi, {
				name: "x",
				label: E(p)("common.close"),
				size: "sm",
				onClick: A
			}, null, 8, ["label"])]),
			s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": E(p)("player.subtitleTrack"),
				onKeydown: F
			}, [s("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !S.value,
				tabindex: D.value === 0 ? 0 : -1,
				onClick: r[1] ||= (e) => M(null)
			}, [s("span", no, [S.value ? a("", !0) : (y(), i(Y, {
				key: 0,
				name: "check"
			}))]), s("span", ro, w(E(p)("player.off")), 1)], 8, to), (y(!0), o(e, null, x(t.tracks, (e, t) => (y(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": v.value === e.language,
				tabindex: D.value === t + 1 ? 0 : -1,
				onClick: (t) => M(e.language)
			}, [s("span", ao, [v.value === e.language ? (y(), i(Y, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", oo, w(e.label), 1)], 8, io))), 128))], 40, eo),
			t.audioTracks.length > 1 ? (y(), o(e, { key: 0 }, [s("h3", so, w(E(p)("player.audio")), 1), s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": E(p)("player.audioTrack"),
				onKeydown: I
			}, [(y(!0), o(e, null, x(t.audioTracks, (e) => (y(), o("button", {
				key: e.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": t.activeAudio === e.index,
				tabindex: O.value === e.index ? 0 : -1,
				onClick: (t) => N(e.index)
			}, [s("span", uo, [t.activeAudio === e.index ? (y(), i(Y, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", fo, w(e.label), 1)], 8, lo))), 128))], 40, co)], 64)) : a("", !0),
			s("h3", po, w(E(p)("player.captionStyle")), 1),
			s("div", mo, [
				s("div", ho, [s("span", go, w(E(p)("player.size")), 1), l(ma, {
					"model-value": E(f).captionStyle.size,
					options: E(Ha),
					label: E(p)("player.captionSize"),
					"onUpdate:modelValue": L
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", _o, [s("span", vo, w(E(p)("player.color")), 1), l(ma, {
					"model-value": E(f).captionStyle.textColor,
					options: E(Ua),
					label: E(p)("player.captionColor"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", yo, [s("span", bo, w(E(p)("player.background")), 1), l(ma, {
					"model-value": E(f).captionStyle.background,
					options: E(Wa),
					label: E(p)("player.captionBackground"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", xo, [s("span", So, w(E(p)("player.edge")), 1), l(ma, {
					"model-value": E(f).captionStyle.edge,
					options: E(Ga),
					label: E(p)("player.captionEdge"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, Za)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), wo = 32, To = 18, Eo = 250, Do = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Oo(e, t, n, r, i, a, o) {
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
		r: Do(d / m),
		g: Do(f / m),
		b: Do(p / m)
	};
}
function ko(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Oo(e, t, n, 0, 0, r, n),
		right: Oo(e, t, n, t - r, 0, t, n),
		center: Oo(e, t, n, 0, 0, t, n)
	};
}
function Ao({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function jo({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Mo(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${jo(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${jo(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${jo(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function No(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Po = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let n = e, i = b(!1), a = null;
		function s() {
			i.value = No(a);
		}
		let c = r(() => n.enabled && !n.reducedMotion && !i.value), l = r(() => Math.min(1, .85 * Math.max(0, n.intensity))), u = b(null), d = null, f = null, p = !1, m = !1;
		function x() {
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
		function S() {
			let e = n.video;
			if (!c.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = x();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18);
				u.value = Mo(ko(n, 32, 18));
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
			e - D >= 250 && (D = e, S());
			let t = n.video;
			C(t) && k(t);
		}
		function M() {
			if (O || !c.value || !n.video) return;
			let e = n.video;
			if (C(e)) {
				O = !0, D = 0, k(e);
				return;
			}
			S(), !m && (O = !0, E = setInterval(S, 250));
		}
		function N() {
			O = !1, w != null && T && T.cancelVideoFrameCallback(w), w = null, T = null, E != null && (clearInterval(E), E = null);
		}
		j(() => [
			c.value,
			n.playing,
			n.video
		], ([e, t]) => {
			N(), e && t && M();
		}, { immediate: !0 }), v(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				a = e, s(), a.addEventListener?.("chargingchange", s), a.addEventListener?.("levelchange", s);
			}).catch(() => {});
		}), _(() => {
			N(), a?.removeEventListener?.("chargingchange", s), a?.removeEventListener?.("levelchange", s);
		});
		let P = r(() => {
			let e = { opacity: String(l.value) };
			return u.value && (e.background = u.value), e;
		});
		return t({ sampleNow: S }), (e, t) => (y(), o("div", {
			class: h(["player__ambient", { "is-active": c.value }]),
			style: g(c.value ? P.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Fo = ["aria-label"], Io = { class: "resume__label" }, Lo = { class: "resume__time numeric" }, Ro = { class: "resume__actions" }, zo = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = Q(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (y(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": E(i)("player.resumePlayback")
		}, [s("p", Io, [
			c(w(a.value[0]), 1),
			s("span", Lo, w(E(Z)(e.seconds)), 1),
			c(w(a.value[1]), 1)
		]), s("div", Ro, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [l(Y, { name: "play" }), s("span", null, w(E(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [l(Y, { name: "rewind" }), s("span", null, w(E(i)("player.startOver")), 1)])])], 8, Fo));
	}
}), [["__scopeId", "data-v-271c5209"]]), Bo = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Vo = [
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
], Ho = new Set(Vo);
function Uo(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Wo(...e) {
	return e.some((e) => Ho.has(Uo(e)));
}
function Go(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Ko(e) {
	return e?.error?.code === 2;
}
var qo = 8, Jo = 15, Yo = 2 * Math.PI * 15;
function Xo(e, t, n = Yo) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Zo = new Map([
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
]), Qo = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function $o(e, t = "video/mp4") {
	let n = Zo.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function es(e, t = "video/mp4") {
	if (!e) return !0;
	let n = $o(e, t);
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
async function ts() {
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
		for (let t of Qo) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function ns(e, t) {
	if (Wo(...e)) return !0;
	let n = e.map((e) => Uo(e)).find((e) => Bo.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (Bo.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await es(e.codec, r) || (n === "mp4" || n === "m4v") && !await ts()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var rs = ["aria-label"], is = ["src"], as = { class: "upnext__body" }, os = { class: "upnext__eyebrow" }, ss = { class: "upnext__title" }, cs = {
	key: 0,
	class: "upnext__cd numeric"
}, ls = { class: "upnext__actions" }, us = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ds = ["r"], fs = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], ps = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let { t: n } = Q(), i = e, c = t, u = r(() => i.posterUrl ?? i.media.poster_url ?? null), d = r(() => Xo(i.remaining, i.total));
		return (t, r) => (y(), o("aside", {
			class: "upnext",
			role: "region",
			"aria-label": E(n)("player.upNext")
		}, [
			u.value ? (y(), o("img", {
				key: 0,
				class: "upnext__thumb",
				src: u.value,
				alt: "",
				loading: "lazy"
			}, null, 8, is)) : a("", !0),
			s("div", as, [
				s("p", os, w(E(n)("player.upNext")), 1),
				s("h4", ss, w(e.media.name), 1),
				e.counting ? (y(), o("p", cs, w(E(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", ls, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => c("play-now")
				}, [l(Y, { name: "play" }), s("span", null, w(E(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => c("cancel")
				}, w(E(n)("player.cancel")), 1)])
			]),
			e.counting ? (y(), o("svg", us, [s("circle", {
				cx: "18",
				cy: "18",
				r: E(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ds), s("circle", {
				cx: "18",
				cy: "18",
				r: E(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": E(Yo),
				"stroke-dashoffset": d.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, fs)])) : a("", !0)
		], 8, rs));
	}
}), [["__scopeId", "data-v-85909b2d"]]), ms = {
	class: "transcode",
	role: "alert"
}, hs = { class: "transcode__card" }, gs = { class: "transcode__heading" }, _s = { class: "transcode__body" }, vs = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = Q();
		return (t, i) => (y(), o("div", ms, [s("div", hs, [
			l(Y, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", gs, w(E(r)("player.transcodeHeading")), 1),
			s("p", _s, w(e.title ? E(r)("player.transcodeBodyTitled", { title: e.title }) : E(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [l(Y, { name: "arrow-left" }), s("span", null, w(E(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), ys = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, bs = { class: "prep__card" }, xs = { class: "prep__heading" }, Ss = { class: "prep__body" }, Cs = ["aria-valuenow"], ws = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = Q(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (y(), o("div", ys, [s("div", bs, [
			l(Y, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", xs, w(E(n)("player.transcodePreparingHeading")), 1),
			s("p", Ss, w(e.title ? E(n)("player.transcodePreparingTitled", { title: e.title }) : E(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: g({ width: r() + "%" })
			}, null, 4)], 8, Cs),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [l(Y, { name: "arrow-left" }), s("span", null, w(E(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Ts = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let c = e, u = t, { t: d } = Q();
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
		return (e, t) => (y(), i(n, { name: "skip" }, {
			default: M(() => [p.value ? (y(), o("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: P(m, ["stop"])
			}, [s("span", null, w(p.value.label), 1), l(Y, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), Es = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, Ds = ["aria-label", "onClick"], Os = { class: "skip-controls__label" }, ks = 5, As = 30, js = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: u } = Q();
		function d(e) {
			return e / 1e3;
		}
		function f(e, t) {
			return t >= d(e.endMs);
		}
		function p(e, t) {
			if (f(e, t)) return !1;
			let n = d(e.startMs), r = n - ks, i = n + As;
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
		return (t, n) => g.value.length > 0 ? (y(), o("div", Es, [(y(!0), o(e, null, x(g.value, (e) => (y(), o("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${h(e.type)}`,
			onClick: P((t) => _(e), ["stop"])
		}, [s("span", Os, w(h(e.type)), 1), l(Y, { name: "skip-forward" })], 8, Ds))), 128))])) : a("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Ms = ["aria-label", "aria-expanded"], Ns = ["aria-label"], Ps = { class: "chapterlist__head" }, Fs = { class: "chapterlist__title" }, Is = ["aria-label"], Ls = ["onClick"], Rs = { class: "chapterlist__index" }, zs = { class: "chapterlist__name" }, Bs = { class: "chapterlist__meta" }, Vs = { class: "chapterlist__time" }, Hs = {
	key: 0,
	class: "chapterlist__duration"
}, Us = {
	key: 1,
	class: "chapterlist__empty"
}, Ws = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let i = t, c = n, { t: u } = Q();
		function d() {
			c("update:open", !1);
		}
		function f() {
			c("update:open", !i.open);
		}
		let p = r(() => i.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Z(e.start), a;
			return e.end != null && e.end > e.start && (a = Z(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = b(null), g = b(null);
		Bi(g, T(i, "open"), {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function v(e) {
			m.value && !m.value.contains(e.target) && d();
		}
		j(() => i.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", v, !0) : document.removeEventListener("pointerdown", v, !0));
		}), _(() => {
			document.removeEventListener("pointerdown", v, !0);
		});
		function S(e) {
			c("seek", e.start), d();
		}
		return (n, r) => (y(), o("div", {
			ref_key: "rootEl",
			ref: m,
			class: "chapterlist"
		}, [s("button", {
			type: "button",
			class: h(["chapterlist__btn player__iconbtn", { "is-active": t.open }]),
			"aria-label": E(u)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: f
		}, [l(Y, { name: "list" })], 10, Ms), t.open ? (y(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: g,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": E(u)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", Ps, [s("h3", Fs, w(E(u)("player.chapters")), 1), l(Pi, {
			name: "x",
			label: E(u)("common.close"),
			size: "sm",
			onClick: d
		}, null, 8, ["label"])]), p.value.length > 0 ? (y(), o("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": E(u)("player.chapterList")
		}, [(y(!0), o(e, null, x(p.value, (e) => (y(), o("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [s("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => S(e.chapter)
		}, [
			s("span", Rs, w(e.index), 1),
			s("span", zs, w(e.label), 1),
			s("span", Bs, [s("span", Vs, w(e.startLabel), 1), e.durationLabel ? (y(), o("span", Hs, "· " + w(e.durationLabel), 1)) : a("", !0)])
		], 8, Ls)]))), 128))], 8, Is)) : (y(), o("p", Us, w(E(u)("player.noChapters")), 1))], 8, Ns)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Gs = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Ks = { class: "marker-timeline__ticks" }, qs = [
	"title",
	"aria-label",
	"onClick"
], Js = { class: "marker-timeline__tooltip" }, Ys = { class: "marker-timeline__tooltip-label" }, Xs = { class: "marker-timeline__tooltip-time numeric" }, Zs = ["onClick"], Qs = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		}))), m = r(() => i.markers ? i.markers.find((e) => e.type === "ad" && i.position >= u(e.startMs) && i.position <= u(e.endMs)) ?? null : null), _ = r(() => m.value !== null), v = r(() => m.value?.label ?? "Ad");
		function b(e) {
			l("seek", e.startSec);
		}
		function S(e) {
			l("similar", e.type, e.startMs);
		}
		return (t, n) => p.value.length > 0 ? (y(), o("div", {
			key: 0,
			class: h(["marker-timeline", { "is-ad-active": _.value }]),
			"aria-label": "Marker timeline"
		}, [_.value ? (y(), o("div", Gs, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), c(" " + w(v.value), 1)])) : a("", !0), s("div", Ks, [(y(!0), o(e, null, x(p.value, (e) => (y(), o("button", {
			key: e.id,
			type: "button",
			class: h(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: g({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${E(Z)(e.startSec)}`,
			"aria-label": `${e.label} at ${E(Z)(e.startSec)}`,
			onClick: P((t) => b(e), ["stop"])
		}, [s("span", Js, [
			s("span", Ys, w(e.label), 1),
			s("span", Xs, w(E(Z)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: P((t) => S(e), ["stop"])
			}, " Find similar ", 8, Zs)
		])], 14, qs))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), $s = ["aria-label", "aria-expanded"], ec = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, tc = ["aria-label"], nc = ["aria-selected", "onClick"], rc = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(t, { expose: i }) {
		let c = t, { t: u } = Q(), d = [
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
		], f = b(0), p = b(0), m = r(() => p.value > 0), g;
		function v() {
			g &&= (clearInterval(g), void 0);
		}
		function S(e) {
			v(), p.value = e, !(e <= 0) && (g = setInterval(() => {
				--p.value, p.value <= 0 && (v(), p.value = 0, c.onExpire());
			}, 1e3));
		}
		function C(e) {
			f.value = e, e === 0 ? (v(), p.value = 0) : S(e);
		}
		function T(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let D = b(!1);
		function O() {
			m.value ? (C(0), D.value = !1) : D.value = !D.value;
		}
		function k(e) {
			C(e), D.value = !1;
		}
		return _(() => {
			v();
		}), i({ toggleOpen: O }), (t, r) => (y(), o("div", { class: h(["sleep-timer", { "is-active": m.value }]) }, [s("button", {
			type: "button",
			class: h(["sleep-timer__trigger", { "is-active": m.value }]),
			"aria-label": m.value ? `Sleep timer: ${T(p.value)} remaining` : E(u)("player.sleepTimer"),
			"aria-expanded": D.value,
			"aria-haspopup": "listbox",
			onClick: O
		}, [l(Y, { name: "moon" }), m.value ? (y(), o("span", ec, w(T(p.value)), 1)) : a("", !0)], 10, $s), l(n, { name: "dropdown" }, {
			default: M(() => [D.value ? (y(), o("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": E(u)("player.sleepTimer")
			}, [(y(), o(e, null, x(d, (e) => s("li", {
				key: e.value,
				class: h(["sleep-timer__option", { "is-selected": f.value === e.value }]),
				role: "option",
				"aria-selected": f.value === e.value,
				onClick: (t) => k(e.value)
			}, w(e.label), 11, nc)), 64))], 8, tc)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), ic = ["aria-labelledby"], ac = {
	key: 0,
	class: "phlix-modal__header"
}, oc = ["id"], sc = { class: "phlix-modal__body" }, cc = {
	key: 1,
	class: "phlix-modal__footer"
}, lc = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let { t: c } = Q(), u = e, d = r, f = b(u.modelValue);
		j(() => u.modelValue, (e) => f.value = e);
		let p = b(null), m = D();
		function g() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			u.dismissible && g();
		}
		return Bi(p, f, { onEscape: () => u.dismissible ? (g(), !0) : !1 }), (r, u) => (y(), i(t, { to: "body" }, [l(n, { name: "phlix-modal" }, {
			default: M(() => [e.modelValue ? (y(), o("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: P(_, ["self"])
			}, [s("div", {
				ref_key: "panelEl",
				ref: p,
				class: h(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? E(m) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (y(), o("header", ac, [e.title ? (y(), o("h2", {
					key: 0,
					id: E(m),
					class: "phlix-modal__title"
				}, w(e.title), 9, oc)) : a("", !0), e.hideClose ? a("", !0) : (y(), i(Pi, {
					key: 1,
					name: "x",
					label: E(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: g
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", sc, [S(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (y(), o("footer", cc, [S(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, ic)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-3be1ebaa"]]), uc = ["aria-label"], dc = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: n } = Q(), i = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (y(), o("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? E(n)("common.loading"),
			style: g(i.value ? { fontSize: i.value } : void 0)
		}, [l(Y, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, uc));
	}
}), [["__scopeId", "data-v-736b299d"]]), fc = class {
	client;
	constructor(e) {
		this.client = new Se({
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
}, pc = null;
function mc(e) {
	return pc ||= new fc(e), pc;
}
var $ = null, hc = null, gc = 0, _c = 5, vc = 1e3, yc = null;
function bc() {
	try {
		return typeof window > "u" ? null : new fe().getAccessToken();
	} catch {
		return null;
	}
}
function xc(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = bc() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function Sc(e) {
	if (yc) try {
		let t = JSON.parse(e.data);
		yc(t);
	} catch {}
}
function Cc() {
	if ($ = null, hc && gc < _c) {
		let e = vc * 2 ** gc;
		gc++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${gc})`), setTimeout(() => {
			hc && wc(hc);
		}, e);
	} else gc >= _c && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), hc = null, gc = 0);
}
function wc(e, t) {
	if (t && (yc = t), $ && hc !== e && ($.close(), $ = null, hc = null, gc = 0), $ && hc === e) return;
	hc = e, gc = 0;
	let n = xc(e);
	console.log(`[SyncPlay] Opening WebSocket to ${n}`), $ = new WebSocket(n), $.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), gc = 0;
	}, $.onmessage = Sc, $.onclose = Cc, $.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function Tc() {
	$ &&= ($.close(), null), hc = null, gc = 0;
}
function Ec(e) {
	!$ || $.readyState !== WebSocket.OPEN || $.send(JSON.stringify({
		type: "command",
		payload: e
	}));
}
var Dc = F("phlix-syncplay", () => {
	let e = b(null), t = b(null), n = b([]), i = b(null), a = b(!1), o = b(0), s = 0, c = r(() => t.value !== null), l = r(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), u = r(() => n.value.filter((e) => e.isOnline)), d = r(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), f = r(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(d.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	async function p(r, o) {
		a.value = !0, i.value = null;
		try {
			let i = mc(r), a = await i.createRoom(o);
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
			let i = mc(r);
			n.value = await i.getMembers(o);
			let a = await i.joinRoom(o);
			t.value = a, s = Date.now(), e.value &&= {
				...e.value,
				currentSession: a
			}, n.value = a.activeUsers, wc(o, (e) => {
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
				await mc(r).leaveRoom(e.value.id), Tc(), e.value = null, t.value = null, n.value = [];
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
		t.value && Ec({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function v(e) {
		if (t.value) try {
			t.value = await mc(e).getState(t.value.id), s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function y(t) {
		if (e.value) try {
			n.value = await mc(t).getMembers(e.value.id);
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
		refreshMembers: y,
		clearError: x,
		updateLocalPosition: S
	};
}), Oc = [
	"type",
	"disabled",
	"aria-busy"
], kc = {
	key: 0,
	class: "phlix-btn__spinner"
}, Ac = { class: "phlix-btn__label" }, jc = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		return (t, r) => (y(), o("button", {
			type: e.type,
			class: h(["phlix-btn", [
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
			e.loading ? (y(), o("span", kc, [l(Y, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (y(), i(Y, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", Ac, [S(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (y(), i(Y, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, Oc));
	}
}), [["__scopeId", "data-v-38abf89d"]]);
//#endregion
//#region src/composables/useApiBase.ts
function Mc(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function Nc() {
	let e = d("mediaApiBase", void 0), t = d("apiBase", "");
	return r(() => Mc(e) || Mc(t));
}
//#endregion
//#region src/components/syncplay/SyncPlayOverlay.vue?vue&type=script&setup=true&lang.ts
var Pc = {
	key: 0,
	class: "syncplay-overlay"
}, Fc = { class: "syncplay-overlay__badge" }, Ic = { class: "syncplay-overlay__label" }, Lc = { class: "syncplay-overlay__status-label" }, Rc = { class: "syncplay-overlay__members" }, zc = { class: "syncplay-overlay__member-count" }, Bc = { class: "syncplay-overlay__member-list" }, Vc = { class: "syncplay-overlay__member-name" }, Hc = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Uc = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = Q(), u = Dc(), d = Nc(), f = r(() => n.apiBase ?? d.value), p = r(() => u.currentRoom?.name ?? "SyncPlay"), m = r(() => u.onlineMembers.length), g = r(() => u.syncStatus), _ = r(() => {
			switch (g.value) {
				case "synced": return i("syncplay.synced");
				case "outOfSync": return i("syncplay.outOfSync");
				case "re-syncing": return i("syncplay.reSyncing");
				default: return i("syncplay.synced");
			}
		}), v = r(() => {
			switch (g.value) {
				case "synced": return "check";
				case "outOfSync": return "alert";
				case "re-syncing": return "spinner";
				default: return "check";
			}
		});
		async function b() {
			await u.leaveRoom(f.value);
		}
		return (t, n) => E(u).isInRoom ? (y(), o("div", Pc, [
			s("div", Fc, [l(Y, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", Ic, "SyncPlay: " + w(p.value), 1)]),
			s("div", { class: h(["syncplay-overlay__status", `syncplay-overlay__status--${g.value}`]) }, [l(Y, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", Lc, w(_.value), 1)], 2),
			s("div", Rc, [s("span", zc, [l(Y, { name: "user" }), c(" " + w(m.value) + " " + w(E(i)("syncplay.members", { count: m.value })), 1)]), s("ul", Bc, [(y(!0), o(e, null, x(E(u).onlineMembers.slice(0, 5), (e) => (y(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", Vc, w(e.name), 1)]))), 128)), E(u).onlineMembers.length > 5 ? (y(), o("li", Hc, " +" + w(E(u).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			l(jc, {
				variant: "ghost",
				size: "sm",
				onClick: b
			}, {
				default: M(() => [c(w(E(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Wc = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], Gc = ["id"], Kc = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let n = e, r = t, i = D();
		function c() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (y(), o("span", { class: h(["phlix-switch", { "is-disabled": e.disabled }]) }, [s("button", {
			type: "button",
			role: "switch",
			class: h(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? E(i) : void 0,
			disabled: e.disabled,
			onClick: c
		}, [...n[0] ||= [s("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, Wc), e.label ? (y(), o("label", {
			key: 0,
			id: E(i),
			class: "phlix-switch__label",
			onClick: c
		}, w(e.label), 9, Gc)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-0725d51f"]]), qc = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, Jc = ["aria-selected"], Yc = ["aria-selected"], Xc = {
	key: 0,
	class: "syncplay-modal__fields"
}, Zc = { class: "syncplay-modal__field" }, Qc = {
	class: "syncplay-modal__label",
	for: "room-name"
}, $c = ["placeholder"], el = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, tl = { class: "syncplay-modal__toggle-hint" }, nl = {
	key: 1,
	class: "syncplay-modal__fields"
}, rl = { class: "syncplay-modal__field" }, il = {
	class: "syncplay-modal__label",
	for: "room-id"
}, al = ["placeholder"], ol = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, sl = {
	key: 3,
	class: "syncplay-modal__rooms"
}, cl = { class: "syncplay-modal__rooms-title" }, ll = { class: "syncplay-modal__rooms-list" }, ul = ["onClick"], dl = { class: "syncplay-modal__room-name" }, fl = { class: "syncplay-modal__room-count" }, pl = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, ml = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let u = t, d = n, { t: f } = Q(), p = Dc(), m = Nc(), g = r(() => u.apiBase ?? m.value), _ = b("create"), v = b(""), S = b(""), C = b(!0), T = b(!1), D = b(null), O = b([]), A = b(!1), F = r(() => v.value.trim().length > 0), I = r(() => S.value.trim().length > 0), L = r(() => (_.value === "create" ? F.value : I.value) && !T.value);
		j(() => u.modelValue, async (e) => {
			e && (D.value = null, v.value = "", C.value = !0, u.prefilledRoomId ? (S.value = u.prefilledRoomId, _.value = "join") : (S.value = "", _.value = "create"), await R());
		});
		async function R() {
			A.value = !0;
			try {
				O.value = await new fc(g.value).listPublicRooms();
			} catch {
				O.value = [];
			} finally {
				A.value = !1;
			}
		}
		async function z() {
			if (L.value) {
				T.value = !0, D.value = null;
				try {
					_.value === "create" ? (await p.createAndJoinRoom(g.value, {
						name: v.value.trim(),
						isPublic: C.value
					}), p.currentRoom && d("joined", p.currentRoom)) : (await p.joinRoom(g.value, S.value.trim()), p.currentRoom && d("joined", p.currentRoom)), d("update:modelValue", !1);
				} catch (e) {
					D.value = e instanceof Error ? e.message : "Operation failed";
				} finally {
					T.value = !1;
				}
			}
		}
		function B(e) {
			_.value = "join", S.value = e.id, v.value = e.name;
		}
		function V() {
			d("update:modelValue", !1);
		}
		return (n, r) => (y(), i(lc, {
			"model-value": t.modelValue,
			title: E(f)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[5] ||= (e) => d("update:modelValue", e),
			onClose: V
		}, {
			footer: M(() => [l(jc, {
				variant: "ghost",
				type: "button",
				onClick: V
			}, {
				default: M(() => [c(w(E(f)("common.close")), 1)]),
				_: 1
			}), l(jc, {
				variant: "solid",
				type: "button",
				loading: T.value,
				disabled: !L.value,
				onClick: z
			}, {
				default: M(() => [c(w(_.value === "create" ? E(f)("syncplay.createRoom") : E(f)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: M(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: P(z, ["prevent"])
			}, [
				s("div", qc, [s("button", {
					type: "button",
					role: "tab",
					class: h(["syncplay-modal__tab", { "is-active": _.value === "create" }]),
					"aria-selected": _.value === "create",
					onClick: r[0] ||= (e) => _.value = "create"
				}, w(E(f)("syncplay.createRoom")), 11, Jc), s("button", {
					type: "button",
					role: "tab",
					class: h(["syncplay-modal__tab", { "is-active": _.value === "join" }]),
					"aria-selected": _.value === "join",
					onClick: r[1] ||= (e) => _.value = "join"
				}, w(E(f)("syncplay.joinRoom")), 11, Yc)]),
				_.value === "create" ? (y(), o("div", Xc, [s("div", Zc, [s("label", Qc, w(E(f)("syncplay.roomName")), 1), N(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => v.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: E(f)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, $c), [[k, v.value]])]), s("div", el, [l(Kc, {
					modelValue: C.value,
					"onUpdate:modelValue": r[3] ||= (e) => C.value = e,
					label: E(f)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), s("span", tl, w(C.value ? E(f)("syncplay.publicHint") : E(f)("syncplay.privateHint")), 1)])])) : (y(), o("div", nl, [s("div", rl, [s("label", il, w(E(f)("syncplay.roomId")), 1), N(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[4] ||= (e) => S.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: E(f)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, al), [[k, S.value]])])])),
				D.value ? (y(), o("p", ol, w(D.value), 1)) : a("", !0),
				_.value === "join" && O.value.length > 0 ? (y(), o("div", sl, [s("h3", cl, w(E(f)("syncplay.publicRooms")), 1), s("ul", ll, [(y(!0), o(e, null, x(O.value, (e) => (y(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => B(e)
				}, [
					l(Y, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", dl, w(e.name), 1),
					s("span", fl, w(e.memberCount) + " " + w(E(f)("syncplay.members")), 1)
				], 8, ul)]))), 128))])])) : a("", !0),
				A.value ? (y(), o("div", pl, [l(Y, { name: "spinner" }), s("span", null, w(E(f)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]), hl = {
	key: 0,
	class: "syncplay-controls"
}, gl = ["aria-label"], _l = { class: "syncplay-controls__wait-label" }, vl = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, yl = { key: 0 }, bl = { class: "syncplay-controls__transport" }, xl = ["aria-label"], Sl = ["aria-label"], Cl = ["aria-label"], wl = { class: "syncplay-controls__status-label" }, Tl = 10, El = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let n = e, i = t, { t: u } = Q(), d = Dc(), f = Nc(), p = r(() => n.apiBase ?? f.value), m = b(!1), g = b([]), _ = r(() => m.value || d.syncStatus === "re-syncing");
		async function v() {
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
			n.isPlaying ? await x() : await v();
		}
		async function C(e) {
			if (d.isInRoom) try {
				await d.sendCommand(p.value, "seek", { position: e }), i("seek", e);
			} catch (e) {
				console.error("[SyncPlay] Failed to send seek command:", e);
			}
		}
		async function T() {
			await C(Math.max(0, n.position - Tl));
		}
		async function D() {
			await C(Math.min(n.duration, n.position + Tl));
		}
		return j(() => d.syncStatus, (e) => {
			e === "re-syncing" ? m.value = !0 : e === "synced" && (m.value = !1, g.value = []);
		}), (t, n) => E(d).isInRoom ? (y(), o("div", hl, [
			_.value ? (y(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": E(u)("syncplay.waitingForMembers")
			}, [
				l(Y, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				s("span", _l, w(E(u)("syncplay.waitingForMembers")), 1),
				g.value.length > 0 ? (y(), o("span", vl, [c(w(g.value.slice(0, 3).join(", ")) + " ", 1), g.value.length > 3 ? (y(), o("span", yl, "+" + w(g.value.length - 3), 1)) : a("", !0)])) : a("", !0)
			], 8, gl)) : a("", !0),
			s("div", bl, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": E(u)("syncplay.rewind"),
					onClick: T
				}, [l(Y, { name: "rewind" })], 8, xl),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? E(u)("syncplay.pauseAll") : E(u)("syncplay.playAll"),
					onClick: S
				}, [l(Y, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Sl),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": E(u)("syncplay.fastForward"),
					onClick: D
				}, [l(Y, { name: "forward" })], 8, Cl)
			]),
			s("div", { class: h(["syncplay-controls__status", `syncplay-controls__status--${E(d).syncStatus}`]) }, [l(Y, {
				name: E(d).syncStatus === "synced" ? "check" : E(d).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", wl, w(E(d).syncStatus === "synced" ? E(u)("syncplay.synced") : E(d).syncStatus === "outOfSync" ? E(u)("syncplay.outOfSync") : E(u)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), Dl = { class: "player__stage" }, Ol = ["src", "poster"], kl = [
	"src",
	"srclang",
	"label",
	"default"
], Al = { class: "player__meta" }, jl = ["aria-label"], Ml = { class: "player__meta-text" }, Nl = { class: "player__eyebrow" }, Pl = { class: "player__title" }, Fl = { class: "player__sub numeric" }, Il = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Ll = {
	key: 0,
	class: "player__center"
}, Rl = ["aria-label"], zl = { class: "player__btnrow" }, Bl = ["aria-label"], Vl = ["aria-label"], Hl = ["aria-label"], Ul = { class: "player__time numeric" }, Wl = ["aria-label", "aria-pressed"], Gl = ["title"], Kl = ["aria-label"], ql = ["aria-label"], Jl = ["aria-label", "aria-pressed"], Yl = ["aria-label", "aria-pressed"], Xl = ["aria-label"], Zl = { class: "similar-modal" }, Ql = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, $l = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, eu = { class: "similar-modal__state-title" }, tu = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, nu = {
	key: 3,
	class: "similar-modal__results"
}, ru = { class: "similar-modal__poster" }, iu = ["src", "alt"], au = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, ou = { class: "similar-modal__result-body" }, su = { class: "similar-modal__result-title" }, cu = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, lu = { key: 0 }, uu = /*#__PURE__*/ X(/* @__PURE__ */ u({
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
		let u = t, f = n, p = oe(), g = H(), { t: S } = Q(), C = Dc(), T = Te(), D = r(() => T.isFavorite(u.media.id)), O = r(() => T.likeLevel(u.media.id));
		function k() {
			T.toggleFavorite(u.media.id, ue());
		}
		function A(e) {
			T.setLike(u.media.id, e, ue());
		}
		let N = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], F = b(null), I = b(null), L = b(!0), R = b(!1), z = b(!1), B = b(!1), V = b(!1), U = b(!1), ee = b(!1), te = b(null), ne = b(null), re = b(!1), ie = Ce(), ae = b(!1), se = r(() => V.value ? 1.35 : 1), W = b(Wo(u.streamUrl, u.media.path));
		async function ce() {
			if (W.value) return;
			let e = u.playbackAudioTracks ?? [];
			e.length !== 0 && await ns([u.streamUrl, u.media.path], e) && (W.value = !0);
		}
		j(() => u.playbackAudioTracks, (e) => {
			!e || e.length === 0 || ce();
		}, { immediate: !1 });
		let le = d("phlixConfig", null);
		function ue() {
			return le?.apiBase ?? "";
		}
		let G = Di({
			apiBase: () => u.apiBase ?? "",
			hlsConfig: le?.playerHlsConfig
		}), de = Mi({ apiBase: () => u.apiBase ?? "" }), K = null;
		function fe(e) {
			K !== null && clearTimeout(K), K = setTimeout(() => {
				K = null, de.fetch(e);
			}, 0);
		}
		let pe = r(() => u.thumbnailAt ?? de.thumbnailAt), me = r(() => W.value ? void 0 : u.streamUrl), he = r(() => W.value && G.state.value !== "ready"), ge = r(() => W.value && (G.state.value === "preparing" || G.state.value === "idle")), _e = r(() => W.value && G.state.value === "error");
		function q(e = 0) {
			let t = F.value;
			t && G.start(t, u.media.id, void 0, e);
		}
		function ve(e) {
			if (p.quality === "original" && e !== "auto") {
				G.loadVariantPlaylist(_a);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				G.loadVariantPlaylist(e);
				return;
			}
			G.setLevel(e);
		}
		let ye = !1;
		j(() => G.levels.value, (e) => {
			if (ye || e.length === 0) return;
			ye = !0;
			let t = g.defaultQuality;
			if (!t || t === "auto") return;
			if (t === "original") {
				G.loadVariantPlaylist(_a);
				return;
			}
			let n = xa(e, t);
			n >= 0 && G.setNextLevel(n);
		}), j(() => G.variants.value, (e) => {
			e?.length && !ye && (ye = !1, m(() => {
				if (G.levels.value.length > 0) {
					ye = !0;
					let e = g.defaultQuality;
					if (!e || e === "auto") return;
					if (e === "original") {
						G.loadVariantPlaylist(_a);
						return;
					}
					let t = xa(G.levels.value, e);
					t >= 0 && G.setNextLevel(t);
				}
			}));
		}, { deep: !0 });
		let be = b(p.resumePositionFor(u.media.id) ?? 0), xe = b(!W.value && be.value > 0), we = null, Ee = b(!1), De = b(8), Oe, ke = b(null), Ae = b(0), je = b(!1), Me = b([]), Ne = b(!1), Pe = b(null);
		function Fe(e, t) {
			ke.value = e, Ae.value = t, Me.value = [], Pe.value = null, je.value = !0, Be(e, t);
		}
		let Ie = null, Le = null, Re = null;
		function ze() {
			let e = u.apiBase ?? "";
			return (Le === null || Re !== e) && (Le = new Se({ baseUrl: e }), Re = e), Le;
		}
		async function Be(e, t) {
			Ie?.abort(), Ie = new AbortController(), Ne.value = !0, Pe.value = null;
			try {
				let n = await ze().searchByMarker(e, t, 30, 20, Ie.signal);
				Me.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Pe.value = "Failed to load similar media. Please try again.", Me.value = [];
			} finally {
				Ne.value = !1;
			}
		}
		function Ve() {
			Ie?.abort(), je.value = !1, Me.value = [], Pe.value = null, ke.value = null;
		}
		let He = r(() => p.upNext);
		function Ue() {
			W.value = Wo(u.streamUrl, u.media.path), ce(), be.value = p.resumePositionFor(u.media.id) ?? 0, xe.value = !W.value && be.value > 0, we = null, Tt = !1, pt = !1, mt = !1, ot.value = -1, bt = null, ye = !1, qe(), Ee.value = !1, G.reset(), F.value && (F.value.currentTime = 0), W.value && q(), fe(u.media.id);
		}
		function We(e) {
			let t = F.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : we = Math.max(0, e));
		}
		function Ge() {
			We(be.value), xe.value = !1, F.value?.play()?.catch(() => {});
		}
		function Ke() {
			we = null, We(0), p.clearResume(u.media.id), xe.value = !1, F.value?.play()?.catch(() => {});
		}
		function qe() {
			Oe &&= (clearInterval(Oe), void 0);
		}
		function Je() {
			De.value = 8, qe(), Oe = setInterval(() => {
				--De.value, De.value <= 0 && (qe(), Xe());
			}, 1e3);
		}
		function Ye() {
			nn(), L.value = !0, p.upNext && (Ee.value = !0, g.autoplay && Je());
		}
		function Xe() {
			qe(), Ee.value = !1;
			let e = p.next(u.streamUrlFor);
			e && f("play-next", e);
		}
		function Ze() {
			qe(), Ee.value = !1;
		}
		function Qe() {
			if (W.value) return;
			let e = F.value, t = Ko(e) && (e?.currentTime ?? 0) === 0;
			(Go(e) || t) && (W.value = !0, q(e?.currentTime ?? 0));
		}
		let $e = b([]), et = b([]), tt = b(-1), nt = b(!1), rt = r(() => G.state.value === "ready" && G.audioTracks.value.length > 0), it = r(() => G.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), at = r(() => (u.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), ot = b(-1), st = r(() => !rt.value && !W.value && et.value.length === 0 && at.value.length > 1), ct = r(() => rt.value ? it.value : st.value ? at.value : et.value), lt = r(() => {
			if (rt.value) return G.currentAudioTrack.value;
			if (st.value) {
				if (ot.value >= 0) return ot.value;
				let e = (u.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : u.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return tt.value;
		}), ut = b(!1), dt = p.subtitleLang, ft = r(() => W.value ? G.subtitleTracks.value : u.playbackSubtitleTracks ?? []), pt = !1, mt = !1;
		function ht() {
			if (pt) return;
			if (g.subtitlePreferenceSet) {
				pt = !0;
				return;
			}
			let e = ft.value.find((e) => e.default);
			if (!e) return;
			let t = $e.value.find((t) => t.language === (e.language || e.label));
			t && (p.setSubtitle(t.language), dt = t.language, pt = !0);
		}
		function gt() {
			if (mt) return;
			let e = g.defaultAudioLang;
			if (!e) return;
			let t = ct.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = lt.value;
			r >= 0 && r < t.length || (xt(n), mt = !0);
		}
		let _t = r(() => $e.value.some((e) => e.language === p.subtitleLang));
		function vt() {
			let e = F.value;
			$e.value = ka(e), et.value = Aa(e), tt.value = Fa(e), ht(), gt();
		}
		function yt() {
			if (_t.value) dt = p.subtitleLang, p.setSubtitle(null);
			else {
				let e = dt && $e.value.some((e) => e.language === dt) ? dt : $e.value[0]?.language ?? null;
				p.setSubtitle(e);
			}
			f("captions");
		}
		let bt = null;
		function xt(e) {
			if (rt.value) G.setAudioTrack(e);
			else if (st.value) {
				if (e === lt.value) return;
				ot.value = e, bt = e, W.value = !0, q(F.value?.currentTime ?? 0);
			} else Pa(F.value, e), tt.value = e;
		}
		j(rt, (e) => {
			if (!e || bt === null) return;
			let t = bt;
			bt = null, t >= 0 && t < G.audioTracks.value.length && G.setAudioTrack(t);
		}), j(ft, () => {
			m(() => vt());
		}, { deep: !0 });
		let St = null, Ct, wt = r(() => {
			let e = [];
			u.media.year && e.push({ text: String(u.media.year) }), u.media.rating && e.push({
				text: u.media.rating,
				cert: !0
			}), u.media.runtime && e.push({ text: `${u.media.runtime}m` });
			let t = u.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Tt = !1;
		function Et() {
			if (!u.autoplay || Tt || xe.value || he.value) return;
			let e = F.value;
			if (!e || !e.paused) return;
			Tt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, p.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function Dt() {
			Et();
		}
		function Ot() {
			u.prevEpisode && f("play-episode", u.prevEpisode);
		}
		function kt() {
			u.nextEpisode && f("play-episode", u.nextEpisode);
		}
		function At() {
			let e = F.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function jt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Mt() {
			p.play(), p.setMediaPositionState();
		}
		function Nt() {
			p.pause(), p.setMediaPositionState();
		}
		function Pt() {
			let e = F.value;
			e && p.updateProgress(e.currentTime, e.duration, jt(e));
		}
		function Ft() {
			let e = F.value;
			e && (e.volume = p.volume, e.muted = p.muted, e.playbackRate = p.rate, we !== null && (e.currentTime = e.duration ? Math.min(e.duration, we) : we, we = null), p.updateProgress(e.currentTime, e.duration, jt(e)), p.setMediaPositionState(), vt());
		}
		function It() {
			let e = F.value;
			e && p.updateProgress(e.currentTime, e.duration, jt(e));
		}
		function Lt() {
			let e = F.value;
			e && (Math.abs(e.volume - p.volume) > .001 && p.setVolume(e.volume), e.muted !== p.muted && p.toggleMute());
		}
		function Rt() {
			let e = F.value;
			e && e.playbackRate !== p.rate && p.setRate(e.playbackRate), p.setMediaPositionState();
		}
		function zt() {
			p.setMediaPositionState();
		}
		function Bt() {
			p.setMediaPositionState();
		}
		function J(e) {
			let t = F.value;
			t && p.duration > 0 && (t.currentTime = Math.min(p.duration, Math.max(0, e)));
		}
		function Vt() {
			z.value = !0, an();
		}
		function Ht() {
			z.value = !1, an();
		}
		function Ut(e) {
			let t = N.reduce((e, t, n) => Math.abs(t - p.rate) < Math.abs(N[e] - p.rate) ? n : e, 0), n = N[Math.min(N.length - 1, Math.max(0, t + e))];
			p.setRate(n);
		}
		function Wt() {
			if (!u.markers) return;
			let e = p.position, t = u.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && J(t.startMs / 1e3);
		}
		function Gt() {
			if (!u.markers) return;
			let e = p.position, t = u.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && J(t.startMs / 1e3);
		}
		function Kt() {
			te.value?.toggleOpen();
		}
		let qt = null;
		function Jt() {
			let e = F.value;
			if (!e) {
				p.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), p.pause();
				return;
			}
			qt !== null && (clearInterval(qt), qt = null);
			let t = .05;
			qt = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(qt), qt = null, e.volume = 0, e.pause(), p.pause());
			}, 50);
		}
		qi({
			playPause: At,
			seekBy: (e) => J(p.position + e),
			frameStep: (e) => {
				p.playing || J(p.position + e / 30);
			},
			volumeBy: (e) => p.setVolume(p.volume + e),
			toggleMute: Yt,
			toggleFullscreen: Zt,
			toggleCaptions: yt,
			toggleTheater: Xt,
			togglePip: $t,
			skipIntro: Wt,
			skipOutro: Gt,
			sleepTimer: Kt,
			seekToPercent: (e) => J(e * p.duration),
			speedStep: Ut,
			toggleHelp: () => {
				B.value = !B.value;
			},
			toggleQuality: () => {
				W.value ? (re.value = !re.value, ne.value?.toggleMenu?.()) : ie.show({
					message: S("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !B.value && !nt.value && !ut.value });
		function Yt() {
			p.toggleMute();
		}
		function Xt() {
			V.value = !V.value, f("theater", V.value);
		}
		j(() => p.muted, (e) => {
			let t = F.value;
			t && t.muted !== e && (t.muted = e);
		}), j(() => p.volume, (e) => {
			let t = F.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), j(() => p.rate, (e) => {
			let t = F.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), j(() => p.lastCommand, (e) => {
			e && (e.type === "seekTo" ? We(e.value) : e.type === "seekBy" && We(p.position + e.value));
		});
		function Zt() {
			if (typeof document > "u") return;
			let e = I.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function Qt() {
			R.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function $t() {
			let e = F.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			f("pip");
		}
		function en() {
			U.value = !0;
		}
		function tn() {
			U.value = !1;
		}
		function nn() {
			Ct &&= (clearTimeout(Ct), void 0);
		}
		function rn() {
			nn(), !(!p.playing || z.value) && (Ct = setTimeout(() => {
				p.playing && !z.value && (L.value = !1);
			}, u.idleTimeout ?? 3e3));
		}
		function an() {
			L.value = !0, rn();
		}
		j(() => p.playing, (e) => {
			e ? (xe.value = !1, Ze(), rn()) : (nn(), L.value = !0);
		});
		let on = null;
		return v(() => {
			p.setCurrent(u.media, {
				resetPosition: !1,
				streamUrl: u.streamUrl
			}), T.hydrate(u.media), typeof document < "u" && (document.addEventListener("fullscreenchange", Qt), ee.value = document.pictureInPictureEnabled === !0), on = p.bindMediaSession({
				onPlay: () => void F.value?.play()?.catch(() => {}),
				onPause: () => F.value?.pause(),
				onSeek: (e) => J(e)
			}), St = F.value?.textTracks ?? null, St?.addEventListener?.("addtrack", vt), St?.addEventListener?.("removetrack", vt), vt(), W.value && q(), fe(u.media.id);
		}), j(() => u.media, (e) => {
			p.setCurrent(e, {
				resetPosition: !1,
				streamUrl: u.streamUrl
			}), Ue();
		}), j(() => u.media?.id, () => {
			T.hydrate(u.media);
		}), j(() => C.currentSession, (e) => {
			e && (e.state === "playing" ? (F.value?.play(), p.play()) : e.state === "paused" && (F.value?.pause(), p.pause()), C.updateLocalPosition(p.position), Math.abs(C.driftAmount) > 2 && We(e.playbackPosition));
		}), _(() => {
			nn(), qe(), G.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", Qt), on?.(), St?.removeEventListener?.("addtrack", vt), St?.removeEventListener?.("removetrack", vt), qt !== null && (clearInterval(qt), qt = null), K !== null && (clearTimeout(K), K = null);
		}), (n, r) => (y(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: h(["player", {
				"is-chrome-hidden": !L.value,
				"is-theater": V.value
			}]),
			onPointermove: an,
			onPointerdown: an,
			onFocusin: an
		}, [l(Po, {
			video: F.value,
			enabled: E(g).atmosphere,
			playing: E(p).playing,
			"reduced-motion": E(g).effectiveReducedMotion,
			intensity: se.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), s("div", Dl, [
			s("video", {
				ref_key: "videoRef",
				ref: F,
				class: "player__video",
				src: me.value,
				poster: t.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Mt,
				onPause: Nt,
				onTimeupdate: Pt,
				onLoadedmetadata: Ft,
				onCanplay: Dt,
				onProgress: It,
				onVolumechange: Lt,
				onRatechange: Rt,
				onSeeked: zt,
				onDurationchange: Bt,
				onEnded: Ye,
				onError: Qe,
				onEnterpictureinpicture: en,
				onLeavepictureinpicture: tn,
				onClick: At
			}, [(y(!0), o(e, null, x(ft.value, (e) => (y(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, kl))), 128))], 40, Ol),
			r[18] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[19] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", Al, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": E(S)("player.back"),
				onClick: r[0] ||= P((e) => f("back"), ["stop"])
			}, [l(Y, { name: "arrow-left" })], 8, jl), s("div", Ml, [
				s("p", Nl, w(E(S)("player.nowPlaying")), 1),
				s("h2", Pl, w(t.media.name), 1),
				s("div", Fl, [(y(!0), o(e, null, x(wt.value, (t, n) => (y(), o(e, { key: n }, [n > 0 && !t.cert ? (y(), o("span", Il, "·")) : a("", !0), s("span", { class: h({ player__cert: t.cert }) }, w(t.text), 3)], 64))), 128))])
			])]),
			he.value ? a("", !0) : (y(), o("div", Ll, [s("button", {
				type: "button",
				class: h(["player__bigplay", { "is-playing": E(p).playing }]),
				"aria-label": E(p).playing ? E(S)("player.pause") : E(S)("player.play"),
				onClick: P(At, ["stop"])
			}, [l(Y, { name: E(p).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Rl)])),
			l(Ya, {
				video: F.value,
				language: E(p).subtitleLang,
				"style-config": E(g).captionStyle,
				lifted: L.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			he.value ? a("", !0) : (y(), o("div", {
				key: 1,
				class: "player__controls",
				onClick: r[6] ||= P(() => {}, ["stop"])
			}, [
				l(ii, {
					position: E(p).position,
					duration: E(p).duration,
					buffered: E(p).buffered,
					chapters: t.chapters,
					"thumbnail-at": pe.value,
					onSeek: J,
					onScrubStart: Vt,
					onScrubEnd: Ht
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				E(g).showMarkerTimeline && t.markers && t.markers.length > 0 ? (y(), i(Qs, {
					key: 0,
					position: E(p).position,
					duration: E(p).duration,
					markers: t.markers,
					onSeek: J,
					onSimilar: Fe
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", zl, [
					t.prevEpisode ? (y(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": E(S)("player.previousEpisode"),
						onClick: Ot
					}, [l(Y, { name: "skip-back" })], 8, Bl)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": E(p).playing ? E(S)("player.pause") : E(S)("player.play"),
						onClick: At
					}, [l(Y, { name: E(p).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Vl),
					t.nextEpisode ? (y(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": E(S)("player.nextEpisode"),
						onClick: kt
					}, [l(Y, { name: "skip-forward" })], 8, Hl)) : a("", !0),
					s("span", Ul, [
						c(w(E(Z)(E(p).position)), 1),
						r[14] ||= s("span", { class: "player__sep" }, " / ", -1),
						c(w(E(Z)(E(p).duration)), 1)
					]),
					r[15] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: h(["player__iconbtn player__favorite", { "is-on": D.value }]),
						"aria-label": D.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": D.value ? "true" : "false",
						onClick: k
					}, [l(Y, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Wl),
					l(Jr, {
						level: O.value,
						onCycle: A
					}, null, 8, ["level"]),
					l(oa),
					l(ha),
					l(wa, {
						ref_key: "qualityMenuRef",
						ref: ne,
						open: re.value,
						"onUpdate:open": r[1] ||= (e) => re.value = e,
						levels: E(G).levels.value,
						variants: E(G).variants.value,
						"current-level": E(G).currentLevel.value,
						"auto-enabled": E(G).autoEnabled.value,
						"active-height": E(G).activeLevelHeight.value,
						onSelect: ve
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					W.value ? a("", !0) : (y(), o("span", {
						key: 2,
						class: "player__direct-badge",
						title: E(S)("player.qualityDirectStream")
					}, w(E(S)("player.directStream")), 9, Gl)),
					l(Co, {
						open: nt.value,
						"onUpdate:open": r[2] ||= (e) => nt.value = e,
						tracks: $e.value,
						"audio-tracks": ct.value,
						"active-audio": lt.value,
						onSelectAudio: xt
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					l(Ws, {
						open: ut.value,
						"onUpdate:open": r[3] ||= (e) => ut.value = e,
						chapters: t.chapters ?? [],
						onSeek: J
					}, null, 8, ["open", "chapters"]),
					l(rc, {
						ref_key: "sleepTimerRef",
						ref: te,
						"on-expire": Jt
					}, null, 512),
					s("button", {
						type: "button",
						class: h(["player__iconbtn player__syncplay", { "is-on": E(C).isInRoom }]),
						"aria-label": E(C).isInRoom ? E(S)("syncplay.inRoom") : E(S)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[4] ||= (e) => ae.value = !0
					}, [l(Y, { name: "user" })], 10, Kl),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": E(S)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => B.value = !0
					}, [l(Y, { name: "info" })], 8, ql),
					ee.value ? (y(), o("button", {
						key: 3,
						type: "button",
						class: h(["player__iconbtn", { "is-on": U.value }]),
						"aria-label": U.value ? E(S)("player.exitPip") : E(S)("player.pip"),
						"aria-pressed": U.value,
						onClick: $t
					}, [l(Y, { name: "pip" })], 10, Jl)) : a("", !0),
					s("button", {
						type: "button",
						class: h(["player__iconbtn", { "is-on": V.value }]),
						"aria-label": V.value ? E(S)("player.exitTheater") : E(S)("player.theater"),
						"aria-pressed": V.value,
						onClick: Xt
					}, [l(Y, { name: "theater" })], 10, Yl),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": R.value ? E(S)("player.exitFullscreen") : E(S)("player.fullscreen"),
						onClick: Zt
					}, [l(Y, { name: R.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Xl)
				])
			])),
			he.value ? a("", !0) : (y(), i(Ts, {
				key: 2,
				position: E(p).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: J
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			he.value ? a("", !0) : (y(), i(js, {
				key: 3,
				position: E(p).position,
				markers: t.markers,
				onSkip: J
			}, null, 8, ["position", "markers"])),
			xe.value && !he.value ? (y(), i(zo, {
				key: 4,
				seconds: be.value,
				onResume: Ge,
				onRestart: Ke
			}, null, 8, ["seconds"])) : a("", !0),
			Ee.value && He.value && !he.value ? (y(), i(ps, {
				key: 5,
				media: He.value,
				remaining: De.value,
				total: E(8),
				counting: E(g).autoplay,
				onPlayNow: Xe,
				onCancel: Ze
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			l(lc, {
				modelValue: je.value,
				"onUpdate:modelValue": r[7] ||= (e) => je.value = e,
				title: `Similar ${ke.value ?? "marker"}s`,
				size: "lg",
				onClose: Ve
			}, {
				default: M(() => [s("div", Zl, [Ne.value ? (y(), o("div", Ql, [l(dc, { label: "Finding similar media" })])) : Pe.value ? (y(), o("div", $l, [l(Y, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", eu, w(Pe.value), 1)])) : !Ne.value && Me.value.length === 0 ? (y(), o("div", tu, [
					l(Y, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[16] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[17] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (y(), o("ul", nu, [(y(!0), o(e, null, x(Me.value, (e) => (y(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", ru, [e.poster_url ? (y(), o("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, iu)) : (y(), o("div", au, [l(Y, { name: "film" })]))]), s("div", ou, [s("p", su, w(e.name), 1), e.year ? (y(), o("p", cu, [c(w(e.year) + " ", 1), e.runtime ? (y(), o("span", lu, " · " + w(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			ge.value ? (y(), i(ws, {
				key: 6,
				title: t.media.name,
				progress: E(G).progress.value,
				onBack: r[8] ||= (e) => f("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			_e.value ? (y(), i(vs, {
				key: 7,
				title: t.media.name,
				onBack: r[9] ||= (e) => f("back")
			}, null, 8, ["title"])) : a("", !0),
			E(C).isInRoom ? (y(), i(El, {
				key: 8,
				position: E(p).position,
				duration: E(p).duration,
				"is-playing": E(p).playing,
				onSeek: J,
				onPlay: r[10] ||= (e) => void F.value?.play(),
				onPause: r[11] ||= (e) => void F.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			E(C).isInRoom ? (y(), i(Uc, { key: 9 })) : a("", !0),
			l(ml, {
				modelValue: ae.value,
				"onUpdate:modelValue": r[12] ||= (e) => ae.value = e
			}, null, 8, ["modelValue"]),
			l(na, {
				open: B.value,
				onClose: r[13] ||= (e) => B.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-f4c4d917"]]), du = ["aria-label"], fu = ["src", "poster"], pu = { class: "mini__body" }, mu = { class: "mini__title" }, hu = { class: "mini__controls" }, gu = ["aria-label"], _u = ["aria-label", "aria-pressed"], vu = ["aria-label"], yu = ["aria-label"], bu = {
	class: "mini__progress",
	"aria-hidden": "true"
}, xu = /*#__PURE__*/ X(/* @__PURE__ */ u({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let c = t, u = oe(), { t: f } = Q(), p = b(null), m = b(null), x = Te(), S = d("phlixConfig", null), C = r(() => u.current ? x.isFavorite(u.current.id) : !1);
		function T() {
			let e = u.current?.id;
			e && x.toggleFavorite(e, S?.apiBase ?? "");
		}
		let D = r(() => u.miniPlayer && !!u.current && (!!u.streamUrl || !!u.hlsMasterUrl)), O = r(() => u.current?.name ?? ""), k = r(() => Math.max(0, Math.min(1, u.progress)));
		function A() {
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
			!e || !u.hlsMasterUrl || (m.value?.destroy(), m.value = null, m.value = await pi(e, u.hlsMasterUrl, {
				startPosition: u.position,
				onReady: () => {
					let e = p.value;
					e && (e.volume = u.volume, e.muted = u.muted, e.playbackRate = u.rate, u.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return j(() => D.value, async (e) => {
			if (!e) {
				m.value?.destroy(), m.value = null;
				return;
			}
			!u.hlsMasterUrl || u.streamUrl || await z();
		}), v(async () => {
			D.value && u.hlsMasterUrl && !u.streamUrl && await z();
		}), j(() => u.playing, (e) => {
			let t = p.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), j(() => u.lastCommand, (e) => {
			let t = p.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : u.position + e.value, r = t.duration && t.duration > 0 ? t.duration : u.duration, i = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = i, u.updateProgress(i, t.duration || void 0);
		}), _(() => {
			m.value?.destroy(), m.value = null, p.value?.pause?.();
		}), (e, t) => (y(), i(n, { name: "mini" }, {
			default: M(() => [D.value ? (y(), o("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": E(f)("player.miniPlayer")
			}, [
				s("video", {
					ref_key: "videoRef",
					ref: p,
					class: "mini__video",
					src: E(u).hlsMasterUrl ? "" : E(u).streamUrl,
					poster: E(u).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: A,
					onPlay: N,
					onPause: P,
					onTimeupdate: F,
					onClick: L
				}, null, 40, fu),
				s("div", pu, [s("p", mu, w(O.value), 1), s("div", hu, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": E(u).playing ? E(f)("player.pause") : E(f)("player.play"),
						onClick: I
					}, [l(Y, { name: E(u).playing ? "pause" : "play" }, null, 8, ["name"])], 8, gu),
					E(u).current ? (y(), o("button", {
						key: 0,
						type: "button",
						class: h(["mini__btn mini__btn--favorite", { "is-on": C.value }]),
						"aria-label": C.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": C.value ? "true" : "false",
						onClick: T
					}, [l(Y, { name: C.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, _u)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": E(f)("player.expand"),
						onClick: L
					}, [l(Y, { name: "expand" })], 8, vu),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": E(f)("player.closePlayer"),
						onClick: R
					}, [l(Y, { name: "x" })], 8, yu)
				])]),
				s("div", bu, [s("div", {
					class: "mini__progress-fill",
					style: g({ transform: `scaleX(${k.value})` })
				}, null, 4)])
			], 8, du)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
export { To as AMBIENT_SAMPLE_H, Eo as AMBIENT_SAMPLE_INTERVAL_MS, wo as AMBIENT_SAMPLE_W, Hi as ARROW_ICONS, Ui as ARROW_LABELS, Po as AmbientCanvas, Wa as CAPTION_BACKGROUND_OPTIONS, Ua as CAPTION_COLOR_OPTIONS, Ga as CAPTION_EDGE_OPTIONS, Ha as CAPTION_SIZE_OPTIONS, Va as CAPTION_SIZE_SCALE, Ya as CaptionOverlay, Co as CaptionsMenu, Bo as DIRECT_PLAY_EXTENSIONS, xu as MiniPlayer, Vi as PLAYER_SHORTCUTS, uu as Player, wa as QualityMenu, ee as RESUME_MAX_RATIO, U as RESUME_MIN_SECONDS, zo as ResumePrompt, ii as Scrubber, na as ShortcutsHelp, Ts as SkipButton, ha as SpeedMenu, Vo as TRANSCODE_EXTENSIONS, vs as TranscodeNotice, ws as TranscodePreparing, qo as UPNEXT_COUNTDOWN_SECONDS, Yo as UPNEXT_RING_CIRCUMFERENCE, Jo as UPNEXT_RING_RADIUS, ps as UpNext, oa as VolumeControl, Fa as activeAudioIndex, Mo as ambientGradient, Pa as applyAudioTrack, Na as applyTrackModes, pi as attachHls, Oo as averageRegion, Ja as captionStyleVars, za as cleanCueText, qa as edgeShadow, Uo as extensionOf, Z as formatTime, Ki as handleShortcut, Ma as hasActiveCaptions, No as isBatterySaving, Ti as isFailedStatus, Go as isFatalMediaError, li as isNativeHlsSupported, wi as isPlayable, Gi as isTypingTarget, Aa as listAudioTracks, ka as listSubtitleTracks, Wo as needsTranscode, vi as parseSubtitleTracks, Si as parseTranscodeStart, Ci as parseTranscodeStatus, Ba as readActiveCueLines, Ei as resolveStreamUrl, ja as resolveTextTrack, Ao as rgbString, jo as rgbaString, Xo as ringDashoffset, ko as sampleAmbient, bi as transcodeStartPath, xi as transcodeStatusPath, Di as useHlsTranscode, qi as useKeyboardShortcuts, oe as usePlayerStore };

//# sourceMappingURL=player.js.map