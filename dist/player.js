import { Fragment as e, Teleport as t, Transition as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createStaticVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, inject as f, markRaw as p, mergeModels as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, openBlock as b, ref as x, renderList as S, renderSlot as C, resolveDynamicComponent as w, toDisplayString as T, toRef as E, unref as D, useId as O, useModel as k, vModelText as A, vShow as j, watch as M, withCtx as N, withDirectives as P, withModifiers as F } from "vue";
import { defineStore as I } from "pinia";
//#region src/stores/usePreferencesStore.ts
var L = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, R = {
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
	captionStyle: { ...L },
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
function z(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var B = "phlix.prefs";
function V() {
	if (typeof localStorage > "u") return { ...R };
	try {
		let e = localStorage.getItem(B);
		if (!e) return { ...R };
		let t = JSON.parse(e);
		return {
			...R,
			...t
		};
	} catch {
		return { ...R };
	}
}
function H() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var ee = I("phlix-prefs", () => {
	let e = V(), t = x(e.theme), n = x(e.accent), i = x(e.density), a = x(e.cardSize), o = x(e.gridDensity), s = x(e.reducedMotion), c = x(e.autoplay), l = x(e.defaultVolume), u = x(e.defaultQuality), d = x(e.defaultSubtitleLang), f = x(e.defaultAudioLang), p = x(e.subtitlePreferenceSet), m = x({
		...L,
		...e.captionStyle
	}), h = x(e.atmosphere), g = x(e.tv), _ = x(e.filterPresets ? [...e.filterPresets] : []), v = x(e.showMarkerTimeline), y = x(e.crossfadeDuration), b = x(e.crossfadeFadeIn), S = x(e.crossfadeFadeOut), C = x(e.gaplessEnabled), w = x(e.preferredAudioQuality), T = x(H()), E = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (E = window.matchMedia("(prefers-reduced-motion: reduce)"), E.addEventListener?.("change", (e) => T.value = e.matches));
	let D = r(() => s.value === "on" || s.value !== "off" && T.value);
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
			crossfadeFadeIn: b.value,
			crossfadeFadeOut: S.value,
			gaplessEnabled: C.value,
			preferredAudioQuality: w.value
		};
	}
	function k(e, t) {
		let n = {
			id: z(e),
			name: e.trim(),
			query: t
		}, r = _.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? _.value.splice(r, 1, n) : _.value.push(n), n;
	}
	function A(e) {
		_.value = _.value.filter((t) => t.id !== e);
	}
	let j = null;
	function N() {
		j !== null && (clearTimeout(j), j = null);
		let e = O();
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(B, JSON.stringify(e));
		} catch {}
	}
	M(O, (e) => {
		j !== null && clearTimeout(j), j = setTimeout(() => {
			j = null;
			try {
				localStorage.setItem(B, JSON.stringify(e));
			} catch {}
		}, 250);
	}, { deep: !0 }), typeof window < "u" && window.addEventListener("pagehide", N);
	function P() {
		let e = R;
		t.value = e.theme, n.value = e.accent, i.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.reducedMotion, c.value = e.autoplay, l.value = e.defaultVolume, u.value = e.defaultQuality, d.value = e.defaultSubtitleLang, f.value = e.defaultAudioLang, p.value = e.subtitlePreferenceSet, m.value = { ...L }, h.value = e.atmosphere, g.value = e.tv, _.value = [...e.filterPresets], v.value = e.showMarkerTimeline, y.value = e.crossfadeDuration, b.value = e.crossfadeFadeIn, S.value = e.crossfadeFadeOut, C.value = e.gaplessEnabled, w.value = e.preferredAudioQuality;
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
		crossfadeFadeIn: b,
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
}), te = 30, ne = .95, re = 5e3, ie = "phlix.resume", ae = "phlix.resume.touched";
function oe() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(ie);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
function se() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(ae), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var ce = I("phlix-player", () => {
	let e = ee(), t = x(null), n = x(""), i = x([]), a = x(!1), o = x(0), s = x(0), c = x(0), l = x(e.defaultVolume), u = x(!1), d = x(1), f = x(e.defaultQuality), p = x(e.defaultSubtitleLang), m = x(""), h = x(!1), g = x(oe()), _ = x(se()), v = x(null), y = 0, b = r(() => s.value > 0 ? o.value / s.value : 0), S = r(() => i.value[0] ?? null);
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
				localStorage.setItem(ie, JSON.stringify(g.value)), localStorage.setItem(ae, JSON.stringify(_.value));
			};
			try {
				e();
			} catch {
				try {
					w(Math.floor(Object.keys(g.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - E;
		clearTimeout(T), e || n >= re ? t() : T = setTimeout(t, re - n);
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
	function te(e) {
		f.value = e;
	}
	function ne(e) {
		p.value = e;
	}
	function ce(e) {
		i.value = [...e];
	}
	function U(e) {
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
	function W() {
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
		setRate: H,
		setQuality: te,
		setSubtitle: ne,
		setQueue: ce,
		enqueue: U,
		next: le,
		showMiniPlayer: ue,
		hideMiniPlayer: de,
		closePlayer: W,
		setMediaSessionMetadata: fe,
		setMediaPositionState: pe,
		bindMediaSession: me,
		seedFromPreferences: he
	};
}), U = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, le = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, ue = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function de(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function W() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region src/api/tokenStore.ts
var fe = "access_token", pe = "refresh_token", me = "user", he = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(fe);
	}
	setAccessToken(e) {
		this.storage.setItem(fe, e);
	}
	getRefreshToken() {
		return this.storage.getItem(pe);
	}
	setRefreshToken(e) {
		this.storage.setItem(pe, e);
	}
	getUser() {
		let e = this.storage.getItem(me);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(me, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(fe), this.storage.removeItem(pe), this.storage.removeItem(me);
	}
};
//#endregion
//#region src/api/client.ts
function ge() {
	return typeof window > "u" ? {
		getAccessToken: () => null,
		setAccessToken: () => {},
		getRefreshToken: () => null,
		setRefreshToken: () => {},
		getUser: () => null,
		setUser: () => {},
		clear: () => {}
	} : new he();
}
var _e = 15e3, ve = {};
function ye(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r && (t[n] = r);
	return t;
}
function be(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
function G(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function K(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function xe(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? "Unknown Artist", r = K(t.album_count);
	return {
		id: n,
		name: n,
		imageUrl: G(t.image_url),
		albumCount: r ?? void 0
	};
}
function Se(e) {
	let t = e && typeof e == "object" ? e : {}, n = t.metadata && typeof t.metadata == "object" ? t.metadata : {}, r = G(n.title) ?? G(t.name) ?? G(t.title) ?? "Unknown Track";
	return {
		id: G(t.id) ?? "",
		title: r,
		durationSecs: K(n.duration_secs) ?? K(t.duration_secs) ?? 0,
		trackNumber: K(n.track_number) ?? K(t.track_number),
		streamUrl: G(t.stream_url)
	};
}
function Ce(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? G(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [];
	return {
		id: n,
		title: n,
		artist: G(t.artist),
		albumArtUrl: G(t.album_art_url),
		year: K(t.year),
		totalTracks: K(t.track_count) ?? r.length,
		tracks: r.map(Se)
	};
}
var we = class {
	baseUrl;
	tokens;
	doFetch;
	timeoutMs;
	instanceHeaders;
	loginPath;
	refreshPromise = null;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? ge(), this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? _e, this.instanceHeaders = ye(e.headers ?? {}), this.loginPath = e.loginPath ?? "/login";
	}
	setBaseUrl(e) {
		this.baseUrl = e;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = {
				...ve,
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
			throw s ? new ue() : r?.aborted || e instanceof U ? e : e instanceof TypeError || W() ? new le() : e;
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
			...ve,
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
			...ve,
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
			is_admin: be(e.is_admin)
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
		return (Array.isArray(t.artists) ? t.artists : []).map(xe);
	}
	async getArtist(e, t) {
		return xe((await this.get(`/api/v1/music/artists/${encodeURIComponent(e)}`, void 0, t)).artist);
	}
	async listAlbums(e, t) {
		let n = await this.get("/api/v1/music/albums", void 0, t), r = Array.isArray(n.albums) ? n.albums : [];
		return (e === void 0 || e === "" ? r : r.filter((t) => G((t && typeof t == "object" ? t : {}).artist) === e)).map(Ce);
	}
	async getAlbum(e, t) {
		return Ce((await this.get(`/api/v1/music/albums/${encodeURIComponent(e)}`, void 0, t)).album);
	}
	async listTracks(e, t) {
		let n = await this.get("/api/v1/music/tracks", void 0, t), r = Array.isArray(n.tracks) ? n.tracks : [];
		return (e === void 0 || e === "" ? r : r.filter((t) => G((t && typeof t == "object" ? t : {}).album) === e)).map(Se);
	}
	async getTrack(e, t) {
		return Se((await this.get(`/api/v1/music/tracks/${encodeURIComponent(e)}`, void 0, t)).track);
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = this.loginPath);
	}
};
new we();
//#endregion
//#region src/stores/useToastStore.ts
var Te = I("phlix-toast", () => {
	let e = x([]), t = /* @__PURE__ */ new Map(), n = 0;
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
}), Ee = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), De = I("user-item-data", () => {
	let e = x(/* @__PURE__ */ new Map()), t = null;
	function n(e) {
		return t ? t.setBaseUrl(e) : t = new we({ baseUrl: e }), t;
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
		return e.value.get(t) ?? { ...Ee };
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
		let r = e.value.get(t) ?? { ...Ee };
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
			Te().error(`Failed to ${n} favorites: ${de(t)}`);
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
			Te().error(`Failed to mark ${n}: ${de(t)}`);
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
			c(e, { like_level: o }), Te().error(`Failed to set rating: ${de(t)}`);
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
}), Oe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ke(e, t) {
	return b(), o("svg", Oe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var Ae = p({
	name: "lucide-play",
	render: ke
}), je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Me(e, t) {
	return b(), o("svg", je, [...t[0] ||= [s("g", {
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
var Ne = p({
	name: "lucide-pause",
	render: Me
}), Pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fe(e, t) {
	return b(), o("svg", Pe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var Ie = p({
	name: "lucide-skip-back",
	render: Fe
}), Le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Re(e, t) {
	return b(), o("svg", Le, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var ze = p({
	name: "lucide-skip-forward",
	render: Re
}), Be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ve(e, t) {
	return b(), o("svg", Be, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var He = p({
	name: "lucide-rotate-ccw",
	render: Ve
}), Ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function We(e, t) {
	return b(), o("svg", Ue, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var Ge = p({
	name: "lucide-rotate-cw",
	render: We
}), Ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qe(e, t) {
	return b(), o("svg", Ke, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Je = p({
	name: "lucide-volume-2",
	render: qe
}), Ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xe(e, t) {
	return b(), o("svg", Ye, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var Ze = p({
	name: "lucide-volume-1",
	render: Xe
}), Qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $e(e, t) {
	return b(), o("svg", Qe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var et = p({
	name: "lucide-volume-x",
	render: $e
}), tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nt(e, t) {
	return b(), o("svg", tt, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), s("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var rt = p({
	name: "lucide-shuffle",
	render: nt
}), it = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function at(e, t) {
	return b(), o("svg", it, [...t[0] ||= [s("g", {
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
var ot = p({
	name: "lucide-repeat",
	render: at
}), st = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ct(e, t) {
	return b(), o("svg", st, [...t[0] ||= [s("g", {
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
var lt = p({
	name: "lucide-repeat-1",
	render: ct
}), ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dt(e, t) {
	return b(), o("svg", ut, [...t[0] ||= [s("g", {
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
var ft = p({
	name: "lucide-list-music",
	render: dt
}), pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mt(e, t) {
	return b(), o("svg", pt, [...t[0] ||= [s("g", {
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
var ht = p({
	name: "lucide-captions",
	render: mt
}), gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _t(e, t) {
	return b(), o("svg", gt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var vt = p({
	name: "lucide-captions-off",
	render: _t
}), yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bt(e, t) {
	return b(), o("svg", yt, [...t[0] ||= [s("g", {
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
var xt = p({
	name: "lucide-picture-in-picture-2",
	render: bt
}), St = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ct(e, t) {
	return b(), o("svg", St, [...t[0] ||= [s("rect", {
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
var wt = p({
	name: "lucide-rectangle-horizontal",
	render: Ct
}), Tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Et(e, t) {
	return b(), o("svg", Tt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var Dt = p({
	name: "lucide-maximize",
	render: Et
}), Ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kt(e, t) {
	return b(), o("svg", Ot, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var At = p({
	name: "lucide-minimize",
	render: kt
}), jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mt(e, t) {
	return b(), o("svg", jt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var Nt = p({
	name: "lucide-maximize-2",
	render: Mt
}), Pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ft(e, t) {
	return b(), o("svg", Pt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var It = p({
	name: "lucide-cast",
	render: Ft
}), Lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rt(e, t) {
	return b(), o("svg", Lt, [...t[0] ||= [s("g", {
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
var zt = p({
	name: "lucide-settings",
	render: Rt
}), Bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vt(e, t) {
	return b(), o("svg", Bt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Ht = p({
	name: "lucide-gauge",
	render: Vt
}), Ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function q(e, t) {
	return b(), o("svg", Ut, [...t[0] ||= [s("g", {
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
var Wt = p({
	name: "lucide-film",
	render: q
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return b(), o("svg", Gt, [...t[0] ||= [s("g", {
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
var qt = p({
	name: "lucide-image",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return b(), o("svg", Jt, [...t[0] ||= [s("g", {
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
var Xt = p({
	name: "lucide-music",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qt(e, t) {
	return b(), o("svg", Zt, [...t[0] ||= [s("g", {
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
var $t = p({
	name: "lucide-tv",
	render: Qt
}), en = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tn(e, t) {
	return b(), o("svg", en, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var nn = p({
	name: "lucide-book",
	render: tn
}), rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function an(e, t) {
	return b(), o("svg", rn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var on = p({
	name: "lucide-headphones",
	render: an
}), sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cn(e, t) {
	return b(), o("svg", sn, [...t[0] ||= [c("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var ln = p({
	name: "lucide-disc-3",
	render: cn
}), un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dn(e, t) {
	return b(), o("svg", un, [...t[0] ||= [s("g", {
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
var fn = p({
	name: "lucide-mic-2",
	render: dn
}), pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mn(e, t) {
	return b(), o("svg", pn, [...t[0] ||= [s("g", {
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
var hn = p({
	name: "lucide-video",
	render: mn
}), gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _n(e, t) {
	return b(), o("svg", gn, [...t[0] ||= [s("g", {
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
var vn = p({
	name: "lucide-search",
	render: _n
}), yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bn(e, t) {
	return b(), o("svg", yn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var xn = p({
	name: "lucide-sliders-horizontal",
	render: bn
}), Sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cn(e, t) {
	return b(), o("svg", Sn, [...t[0] ||= [s("g", {
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
var wn = p({
	name: "lucide-calendar",
	render: Cn
}), Tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function En(e, t) {
	return b(), o("svg", Tn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Dn = p({
	name: "lucide-arrow-up-down",
	render: En
}), On = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kn(e, t) {
	return b(), o("svg", On, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var An = p({
	name: "lucide-star",
	render: kn
}), jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mn(e, t) {
	return b(), o("svg", jn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var Nn = p({
	name: "lucide-list",
	render: Mn
}), Pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fn(e, t) {
	return b(), o("svg", Pn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var In = p({
	name: "lucide-plus",
	render: Fn
}), Ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rn(e, t) {
	return b(), o("svg", Ln, [...t[0] ||= [s("g", {
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
var zn = p({
	name: "lucide-info",
	render: Rn
}), Bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vn(e, t) {
	return b(), o("svg", Bn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Hn = p({
	name: "lucide-x",
	render: Vn
}), Un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wn(e, t) {
	return b(), o("svg", Un, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var Gn = p({
	name: "lucide-check",
	render: Wn
}), Kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qn(e, t) {
	return b(), o("svg", Kn, [...t[0] ||= [s("g", {
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
var Jn = p({
	name: "lucide-lock",
	render: qn
}), Yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xn(e, t) {
	return b(), o("svg", Yn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Zn = p({
	name: "lucide-bookmark",
	render: Xn
}), Qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $n(e, t) {
	return b(), o("svg", Qn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var er = p({
	name: "lucide-bookmark-plus",
	render: $n
}), tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nr(e, t) {
	return b(), o("svg", tr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var rr = p({
	name: "lucide-heart",
	render: nr
}), ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ar(e, t) {
	return b(), o("svg", ir, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var or = p({
	name: "lucide-thumbs-up",
	render: ar
}), sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cr(e, t) {
	return b(), o("svg", sr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var lr = p({
	name: "lucide-thumbs-down",
	render: cr
}), ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dr(e, t) {
	return b(), o("svg", ur, [...t[0] ||= [s("g", {
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
var fr = p({
	name: "lucide-user",
	render: dr
}), pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mr(e, t) {
	return b(), o("svg", pr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var hr = p({
	name: "lucide-log-out",
	render: mr
}), gr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _r(e, t) {
	return b(), o("svg", gr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var vr = p({
	name: "lucide-menu",
	render: _r
}), yr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function br(e, t) {
	return b(), o("svg", yr, [...t[0] ||= [s("g", {
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
var xr = p({
	name: "lucide-more-horizontal",
	render: br
}), Sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cr(e, t) {
	return b(), o("svg", Sr, [...t[0] ||= [s("g", {
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
var wr = p({
	name: "lucide-eye",
	render: Cr
}), Tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Er(e, t) {
	return b(), o("svg", Tr, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Dr = p({
	name: "lucide-eye-off",
	render: Er
}), Or = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kr(e, t) {
	return b(), o("svg", Or, [...t[0] ||= [s("g", {
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
var Ar = p({
	name: "lucide-key",
	render: kr
}), jr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mr(e, t) {
	return b(), o("svg", jr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var Nr = p({
	name: "lucide-trash",
	render: Mr
}), Pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fr(e, t) {
	return b(), o("svg", Pr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Ir = p({
	name: "lucide-arrow-left",
	render: Fr
}), Lr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rr(e, t) {
	return b(), o("svg", Lr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var zr = p({
	name: "lucide-arrow-right",
	render: Rr
}), Br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vr(e, t) {
	return b(), o("svg", Br, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var Hr = p({
	name: "lucide-arrow-up",
	render: Vr
}), Ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wr(e, t) {
	return b(), o("svg", Ur, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var Gr = p({
	name: "lucide-arrow-down",
	render: Wr
}), Kr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qr(e, t) {
	return b(), o("svg", Kr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var Jr = p({
	name: "lucide-chevron-down",
	render: qr
}), Yr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xr(e, t) {
	return b(), o("svg", Yr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var Zr = p({
	name: "lucide-chevron-up",
	render: Xr
}), Qr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $r(e, t) {
	return b(), o("svg", Qr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var ei = p({
	name: "lucide-chevron-left",
	render: $r
}), ti = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ni(e, t) {
	return b(), o("svg", ti, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var ri = p({
	name: "lucide-chevron-right",
	render: ni
}), ii = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ai(e, t) {
	return b(), o("svg", ii, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var oi = p({
	name: "lucide-loader-circle",
	render: ai
}), si = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ci(e, t) {
	return b(), o("svg", si, [...t[0] ||= [s("g", {
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
var li = p({
	name: "lucide-circle-alert",
	render: ci
}), ui = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function di(e, t) {
	return b(), o("svg", ui, [...t[0] ||= [s("g", {
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
var fi = p({
	name: "lucide-circle-check",
	render: di
}), pi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mi(e, t) {
	return b(), o("svg", pi, [...t[0] ||= [s("g", {
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
var hi = p({
	name: "lucide-circle-x",
	render: mi
}), gi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _i(e, t) {
	return b(), o("svg", gi, [...t[0] ||= [s("g", {
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
var vi = p({
	name: "lucide-sun",
	render: _i
}), yi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bi(e, t) {
	return b(), o("svg", yi, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var xi = p({
	name: "lucide-moon",
	render: bi
}), Si = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ci(e, t) {
	return b(), o("svg", Si, [...t[0] ||= [s("g", {
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
var wi = p({
	name: "lucide-monitor",
	render: Ci
}), Ti = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ei(e, t) {
	return b(), o("svg", Ti, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
	}, null, -1)]]);
}
var Di = p({
	name: "lucide-external-link",
	render: Ei
}), J = /* @__PURE__ */ d({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = {
			play: Ae,
			pause: Ne,
			"skip-back": Ie,
			"skip-forward": ze,
			rewind: He,
			forward: Ge,
			volume: Je,
			"volume-low": Ze,
			mute: et,
			shuffle: rt,
			repeat: ot,
			"repeat-1": lt,
			"list-music": ft,
			captions: ht,
			"captions-off": vt,
			pip: xt,
			theater: wt,
			fullscreen: Dt,
			"fullscreen-exit": At,
			expand: Nt,
			cast: It,
			settings: zt,
			speed: Ht,
			film: Wt,
			image: qt,
			music: Xt,
			tv: $t,
			book: nn,
			headphones: on,
			disc: ln,
			mic: fn,
			video: hn,
			search: vn,
			filter: xn,
			calendar: wn,
			sort: Dn,
			star: An,
			list: Nn,
			plus: In,
			info: zn,
			x: Hn,
			check: Gn,
			lock: Jn,
			bookmark: Zn,
			"bookmark-plus": er,
			heart: rr,
			"thumbs-up": or,
			"thumbs-down": lr,
			user: fr,
			"log-out": hr,
			menu: vr,
			more: xr,
			eye: wr,
			"eye-off": Dr,
			refresh: Ge,
			key: Ar,
			trash: Nr,
			"arrow-left": Ir,
			"arrow-right": zr,
			"arrow-up": Hr,
			"arrow-down": Gr,
			"chevron-down": Jr,
			"chevron-up": Zr,
			"chevron-left": ei,
			"chevron-right": ri,
			spinner: oi,
			alert: li,
			"alert-circle": li,
			success: fi,
			error: hi,
			sun: vi,
			moon: xi,
			monitor: wi,
			"external-link": Di
		}, n = e, a = r(() => t[n.name]), o = r(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (t, n) => (b(), i(w(a.value), {
			class: "phlix-icon",
			style: _(o.value ? { fontSize: o.value } : void 0),
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
}), Oi = ["data-level"], ki = ["disabled", "aria-pressed"], Ai = ["disabled", "aria-pressed"], ji = /*@__PURE__*/ d({
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
		}), c = r(() => s.value >= 0), l = r(() => s.value <= 0), d = r(() => s.value >= 1), f = r(() => s.value === 2), p = r(() => s.value <= -1), m = r(() => s.value === -2);
		function h() {
			return s.value <= 0 ? 1 : s.value === 1 ? 2 : 0;
		}
		function _() {
			return s.value >= 0 ? -1 : s.value === -1 ? -2 : 0;
		}
		function v() {
			if (n.disabled) return;
			let e = h();
			i("cycle", e), i("update:level", e);
		}
		function y() {
			if (n.disabled) return;
			let e = _();
			i("cycle", e), i("update:level", e);
		}
		return (t, n) => (b(), o("div", {
			class: "thumb-rating",
			"data-level": s.value
		}, [c.value ? (b(), o("button", {
			key: 0,
			type: "button",
			class: g(["thumb-rating__btn thumb-rating__btn--up", {
				"is-filled": d.value,
				"is-blue": f.value
			}]),
			disabled: e.disabled,
			"aria-label": "Like",
			"aria-pressed": d.value ? "true" : "false",
			onClick: v
		}, [u(J, {
			name: "thumbs-up",
			class: "thumb-rating__icon"
		})], 10, ki)) : a("", !0), l.value ? (b(), o("button", {
			key: 1,
			type: "button",
			class: g(["thumb-rating__btn thumb-rating__btn--down", {
				"is-filled": p.value,
				"is-blue": m.value
			}]),
			disabled: e.disabled,
			"aria-label": "Dislike",
			"aria-pressed": p.value ? "true" : "false",
			onClick: y
		}, [u(J, {
			name: "thumbs-down",
			class: "thumb-rating__icon"
		})], 10, Ai)) : a("", !0)], 8, Oi));
	}
}), Y = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Mi = /*#__PURE__*/ Y(ji, [["__scopeId", "data-v-554f8af9"]]);
//#endregion
//#region src/components/player/format-time.ts
function Ni(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/i18n/messages.ts
var Pi = {
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
}, Fi = /\{(\w+)\}/g;
function Ii(e) {
	let t = {};
	for (let n of Object.keys(Pi)) {
		let r = Pi[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function Li(e, t) {
	return t ? e.replace(Fi, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function Ri(e) {
	let t = Ii(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? Li(s, n) : e;
	};
}
//#endregion
//#region src/composables/useMessages.ts
function X() {
	return { t: Ri(f("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var zi = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], Bi = { class: "scrubber__track" }, Vi = ["title"], Hi = { class: "scrubber__time numeric" }, Ui = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let { t: c } = X(), l = t, u = i, d = x(null), f = x(!1), p = x(!1), m = x(0), h = x(0), v = (e) => Math.min(1, Math.max(0, e)), y = r(() => f.value ? m.value : l.duration > 0 ? v(l.position / l.duration) : 0), C = r(() => l.duration > 0 ? v(l.buffered / l.duration) : 0), w = r(() => (f.value || p.value) && l.duration > 0), E = r(() => f.value ? m.value : h.value), O = r(() => E.value * l.duration), k = r(() => w.value ? l.thumbnailAt?.(O.value) ?? null : null), A = r(() => k.value ? `url("${k.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), j = r(() => `${Math.min(96, Math.max(4, E.value * 100))}%`), M = r(() => l.duration > 0 ? l.chapters.filter((e) => e.start > 0 && e.start < l.duration).map((e) => ({
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
		}), (n, r) => (b(), o("div", {
			ref_key: "trackEl",
			ref: d,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "horizontal",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(t.duration),
			"aria-valuenow": Math.round(t.position),
			"aria-valuetext": D(Ni)(t.position),
			"aria-label": D(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", Bi, [
			s("div", {
				class: "scrubber__buffered",
				style: _({ transform: `scaleX(${C.value})` })
			}, null, 4),
			s("div", {
				class: "scrubber__played",
				style: _({ transform: `scaleX(${y.value})` })
			}, null, 4),
			(b(!0), o(e, null, S(M.value, (e, t) => (b(), o("span", {
				key: t,
				class: "scrubber__tick",
				style: _({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Vi))), 128)),
			s("div", {
				class: g(["scrubber__head", { "is-dragging": f.value }]),
				style: _({ left: `${y.value * 100}%` })
			}, null, 6)
		]), w.value ? (b(), o("div", {
			key: 0,
			class: "scrubber__preview",
			style: _({ left: j.value }),
			"aria-hidden": "true"
		}, [k.value ? (b(), o("div", {
			key: 0,
			class: "scrubber__thumb",
			style: _({ backgroundImage: A.value })
		}, null, 4)) : a("", !0), s("span", Hi, T(D(Ni)(O.value)), 1)], 4)) : a("", !0)], 40, zi));
	}
}), [["__scopeId", "data-v-3d610715"]]), Wi = "phlix-bandwidth-estimate";
function Gi(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function Ki() {
	try {
		let e = localStorage.getItem(Wi);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? Gi(t) : 0;
	} catch {
		return 0;
	}
}
function qi(e) {
	try {
		localStorage.setItem(Wi, String(e));
	} catch {}
}
function Ji(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var Yi = null, Xi = null;
function Zi() {
	Yi && qi(Yi.bandwidthEstimate);
}
async function Qi(e, t, n = {}) {
	if (typeof MediaSource > "u" && Ji(e)) {
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
		let i = Ki(), a = new r({
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
		}), Yi = a, Xi !== null && clearInterval(Xi), Xi = setInterval(Zi, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				qi(a.bandwidthEstimate), Xi !== null && (clearInterval(Xi), Xi = null), Yi = null;
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
var $i = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function ea(e, t = "") {
	return typeof e == "string" ? e : t;
}
function ta(e) {
	return e === !0 || e === "true" || e === 1;
}
function na(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function ra(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = ea(e.url ?? e.src);
		r !== "" && t.push({
			index: na(e.index),
			language: ea(e.language ?? e.lang ?? e.srclang),
			label: ea(e.label),
			default: ta(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function ia(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = na(e.height);
		r <= 0 || t.push({
			id: ea(e.id),
			label: ea(e.label),
			height: r,
			width: na(e.width),
			bitrate: na(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function aa(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function oa(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function sa(e) {
	let t = e ?? {};
	return {
		jobId: ea(t.job_id ?? t.jobId),
		masterUrl: ea(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: ea(t.status, "running"),
		reused: ta(t.reused),
		subtitles: ra(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: ia(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function ca(e) {
	let t = e ?? {};
	return {
		jobId: ea(t.job_id ?? t.jobId),
		status: ea(t.status, "running"),
		playlistReady: ta(t.playlist_ready ?? t.playlistReady),
		progress: na(t.progress),
		masterUrl: ea(t.master_url ?? t.masterUrl),
		subtitles: ra(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: ia(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function la(e) {
	return e.playlistReady || e.status === "completed";
}
function ua(e) {
	return $i.has(e);
}
function da(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function fa(e) {
	let t = x("idle"), n = x(0), r = x([]), i = x([]), a = x(-1), o = x(!0), s = x(null), c = x(null), l = x([]), u = x(-1), d = x(null), f = x(null);
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
			url: da(n, e.url)
		}));
	}
	let y = e.attach ?? Qi, b = e.pollIntervalMs ?? 1e3, S = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(S / Math.max(1, b))), T = pa(), E = e.getToken ?? (() => ma(T)), D = null, O = null, k = null, A = !1, j = null;
	function M() {
		return e.client ?? new we({
			baseUrl: e.apiBase(),
			tokenStore: T ?? void 0,
			timeoutMs: 6e4
		});
	}
	async function N(i, a, o, s) {
		R(), A = !1, j = new AbortController(), t.value = "preparing", n.value = 0, r.value = [], m();
		try {
			let r = M(), c = sa(await r.post(aa(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = da(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < w; e++) {
				let e = ca(await r.get(oa(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), ua(e.status)) throw Error(`transcode ${e.status}`);
				if (la(e)) {
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
				let e = ce();
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
function pa() {
	try {
		return new he();
	} catch {
		return null;
	}
}
function ma(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var ha = 10, ga = 6;
function _a(e) {
	let t = x(null), n = x(!1), r = x(null), i = /* @__PURE__ */ new Map();
	function a() {
		return new we({ baseUrl: e.apiBase() });
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
		let i = r.frame, a = i % ha, s = Math.floor(i / ha), c = a / (ha - 1) * 100, l = s / (ga - 1) * 100;
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
var va = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], ya = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		return (t, r) => (b(), o("button", {
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
		}, null, 8, ["name", "class"])], 10, va));
	}
}), [["__scopeId", "data-v-48bb9819"]]), ba = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), xa = 0, Sa = "";
function Ca() {
	xa === 0 && (Sa = document.body.style.overflow, document.body.style.overflow = "hidden"), xa++;
}
function wa() {
	xa !== 0 && (xa--, xa === 0 && (document.body.style.overflow = Sa));
}
function Ta(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(ba)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		i = document.activeElement, e.value?.setAttribute("data-focus-trap", ""), r && (Ca(), a = !0), document.addEventListener("keydown", s, !0), h(() => {
			e.value?.setAttribute("data-focus-trap", ""), (o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (wa(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	M(t, (e) => e ? c() : l(), { immediate: !0 }), v(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (wa(), !1);
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var Ea = [
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
], Da = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Oa = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function ka(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Aa(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function ja(e, t) {
	switch (e.key) {
		case " ": return ka(e.target) ? !1 : (t.playPause(), !0);
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
function Ma(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Aa(n.target) || ja(n, e) && n.preventDefault();
	}
	y(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), v(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Na = ["aria-label"], Pa = { class: "shortcuts__head" }, Fa = { class: "shortcuts__title" }, Ia = { class: "shortcuts__grid" }, La = { class: "shortcuts__keys" }, Ra = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, za = {
	key: 1,
	class: "shortcuts__key"
}, Ba = { class: "shortcuts__label" }, Va = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Ea }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, c = n, { t: d } = X(), f = x(null);
		return Ta(f, E(r, "open"), {
			lockScroll: !1,
			onEscape: () => (c("close"), !0)
		}), (n, r) => t.open ? (b(), o("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= F((e) => c("close"), ["self"])
		}, [s("div", {
			ref_key: "panelEl",
			ref: f,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": D(d)("player.keyboardShortcuts"),
			tabindex: "-1"
		}, [s("div", Pa, [s("h3", Fa, T(D(d)("player.keyboard")), 1), u(ya, {
			name: "x",
			label: D(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => c("close")
		}, null, 8, ["label"])]), s("ul", Ia, [(b(!0), o(e, null, S(t.shortcuts, (t) => (b(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", La, [(b(!0), o(e, null, S(t.keys, (t, n) => (b(), o(e, { key: n }, [t === "–" ? (b(), o("span", Ra, "–")) : (b(), o("kbd", za, [D(Da)[t] ? (b(), i(J, {
			key: 0,
			name: D(Da)[t],
			label: D(Oa)[t] ?? t
		}, null, 8, ["name", "label"])) : (b(), o(e, { key: 1 }, [l(T(t), 1)], 64))]))], 64))), 128))]), s("span", Ba, T(t.label), 1)]))), 128))])], 8, Na)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), Ha = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], Ua = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let n = e, i = t, a = x(null), c = x(!1), l = r(() => {
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
		return (t, n) => (b(), o("div", {
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
		}, null, 4)], 544)], 42, Ha));
	}
}), [["__scopeId", "data-v-644a7ce9"]]), Wa = { class: "volume" }, Ga = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "VolumeControl",
	setup(e) {
		let t = ce(), n = ee(), { t: i } = X(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return M(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (b(), o("div", Wa, [u(ya, {
			name: s.value,
			label: D(t).muted ? D(i)("player.unmute") : D(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => D(t).toggleMute()
		}, null, 8, ["name", "label"]), u(Ua, {
			class: "volume__slider",
			"model-value": a.value,
			min: 0,
			max: 1,
			step: .05,
			label: D(i)("player.volume"),
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
function Ka(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function qa(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function Ja(e, t) {
	return t === "first" ? qa(e, -1, 1) : qa(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var Ya = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], Xa = ["id", "aria-label"], Za = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Qa = { class: "phlix-select__check" }, $a = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let d = t, { t: f } = X(), p = c, m = r(() => Ka(d.options)), _ = O(), y = x(!1), C = x(-1), w = x(null), E = x(null);
		function A() {
			y.value ? ee() : H();
		}
		n({ toggleMenu: A });
		let N = "", F, I = k(t, "open"), L = r(() => m.value.findIndex((e) => e.value === d.modelValue));
		M(I, (e) => {
			e && !y.value ? H() : !e && y.value && ee();
		}, { immediate: !0 });
		let R = r(() => m.value[L.value]?.label ?? ""), z = r(() => C.value >= 0 ? `${_}-opt-${C.value}` : void 0), B = x(!1);
		function V() {
			let e = w.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			B.value = n < 284 && r > n;
		}
		function H() {
			d.disabled || y.value || (V(), y.value = !0, C.value = L.value >= 0 ? L.value : Ja(m.value, "first"), h(re));
		}
		function ee() {
			y.value = !1;
		}
		function te(e) {
			let t = m.value[e];
			!t || t.disabled || (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), ee(), w.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function ne(e) {
			C.value = qa(m.value, C.value, e), h(re);
		}
		function re() {
			(E.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
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
					y.value && (e.preventDefault(), C.value = Ja(m.value, "first"), h(re));
					break;
				case "End":
					y.value && (e.preventDefault(), C.value = Ja(m.value, "last"), h(re));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), y.value && C.value >= 0 ? te(C.value) : H();
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
			y.value || H(), N += e.toLowerCase(), clearTimeout(F), F = setTimeout(() => N = "", 600);
			let t = m.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(N));
			t >= 0 && (C.value = t, h(re));
		}
		function oe(e) {
			y.value && w.value && !w.value.contains(e.target) && ee();
		}
		return M(y, (e) => {
			e ? document.addEventListener("pointerdown", oe, !0) : document.removeEventListener("pointerdown", oe, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", oe, !0), clearTimeout(F);
		}), (n, r) => (b(), o("div", {
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
			"aria-controls": y.value ? `${D(_)}-list` : void 0,
			"aria-activedescendant": y.value ? z.value : void 0,
			"aria-label": t.label,
			disabled: t.disabled,
			onClick: r[0] ||= (e) => y.value ? ee() : H(),
			onKeydown: ie
		}, [s("span", { class: g(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, T(L.value >= 0 ? R.value : t.placeholder ?? D(f)("common.selectPlaceholder")), 3), u(J, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, Ya), P(s("ul", {
			id: `${D(_)}-list`,
			ref_key: "listEl",
			ref: E,
			class: g(["phlix-select__list", { "is-up": B.value }]),
			role: "listbox",
			"aria-label": t.label
		}, [(b(!0), o(e, null, S(m.value, (e, n) => (b(), o("li", {
			id: `${D(_)}-opt-${n}`,
			key: e.value,
			class: g(["phlix-select__option", {
				"is-active": n === C.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => te(n),
			onPointermove: (t) => !e.disabled && (C.value = n)
		}, [s("span", Qa, [e.value === t.modelValue ? (b(), i(J, {
			key: 0,
			name: "check"
		})) : a("", !0)]), l(" " + T(e.label), 1)], 42, Za))), 128))], 10, Xa), [[j, y.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]), eo = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		], n = ce(), { t: a } = X(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (b(), i($a, {
			class: "speed-menu",
			tone: "glass",
			"model-value": D(n).rate,
			options: o.value,
			label: D(a)("player.playbackSpeed"),
			"onUpdate:modelValue": s
		}, null, 8, [
			"model-value",
			"options",
			"label"
		]));
	}
}), [["__scopeId", "data-v-4530b308"]]), to = "auto", no = "original";
function ro(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function io(e) {
	return e >= 2160 ? "4K" : ro(e);
}
function ao(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = ro(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: io(r.height)
		}));
	}
	return n;
}
function oo(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) ro(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function so(e, t) {
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
function co(e) {
	let t = -1, n = -1, r = -1;
	for (let i of e) (i.height > n || i.height === n && i.bitrate > r) && (t = i.index, n = i.height, r = i.bitrate);
	return t;
}
function lo(e, t) {
	let n = t?.find((e) => e.id === "original" && e.height > 0) ?? null;
	return !!n && so(e, n) >= 0;
}
function uo(e, t) {
	if (t < 0) return to;
	let n = e.find((e) => e.index === t);
	return n ? ro(n.height) : to;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var fo = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let o = e, s = k(e, "open"), c = x(null);
		function l() {
			c.value?.toggleMenu();
		}
		let u = n, d = ce(), f = ee(), { t: p } = X(), m = r(() => ao(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = ro(r.height);
				e.has(i) || n && oo(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: io(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => so(o.levels, _.value)), y = r(() => _.value && v.value >= 0 ? {
			value: no,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), S = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: io(o.activeHeight) })), w = r(() => [
			{
				value: to,
				label: C.value
			},
			...y.value ? [y.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? to : y.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? no : uo(o.levels, o.currentLevel));
		function E(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : oo(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => S.value || s.value ? (b(), i($a, {
			key: 0,
			ref_key: "selectRef",
			ref: c,
			class: "quality-menu",
			tone: "glass",
			"model-value": T.value,
			options: w.value,
			label: D(p)("player.quality"),
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
function po(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function mo(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function ho(e, t) {
	return e.language || e.label || `track-${t}`;
}
function go(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function _o(e) {
	return e ? po(e.textTracks).filter(mo).map((e, t) => ({
		index: t,
		language: ho(e, t),
		label: e.label || go(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function vo(e) {
	let t = e?.audioTracks;
	return po(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || go(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function yo(e, t) {
	return !e || t == null ? null : po(e.textTracks).filter(mo).find((e, n) => ho(e, n) === t) ?? null;
}
function bo(e, t) {
	return yo(e, t) != null;
}
function xo(e, t) {
	e && po(e.textTracks).filter(mo).forEach((e, n) => {
		try {
			e.mode = ho(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function So(e, t) {
	let n = e?.audioTracks;
	po(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Co(e) {
	let t = e?.audioTracks;
	return po(t).findIndex((e) => e.enabled);
}
var wo = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function To(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Eo(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && To(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(wo, n) ? wo[n] : e;
	});
}
function Do(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Eo(e).trim()).filter((e) => e.length > 0) : [];
}
function Oo(e) {
	if (!e) return [];
	let t = po(e.activeCues), n = [];
	for (let e of t) n.push(...Do(e.text));
	return n;
}
var ko = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Ao = [
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
], jo = [
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
], Mo = [
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
], No = [
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
function Po(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function Fo(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Io(e) {
	return {
		"--cap-scale": String(ko[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": Po(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": Fo(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var Lo = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(t, { expose: n }) {
		let i = t, s = x([]), c = r(() => Io(i.styleConfig)), l = null, u = null;
		function d() {
			s.value = Oo(l);
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
			f(), xo(i.video, i.language);
			let e = yo(i.video, i.language);
			if (e) {
				if (l = e, e.addEventListener("cuechange", d), s.value = Oo(e), !s.value.length) {
					let t = p(i.video, e);
					t && t.readyState !== 2 && (u = t, t.addEventListener("load", d));
				}
			} else s.value = [];
		}
		return M(() => [i.video, i.language], m, { immediate: !0 }), v(f), n({ lines: s }), (n, r) => s.value.length ? (b(), o("div", {
			key: 0,
			class: g(["player__captions", { "is-lifted": t.lifted }]),
			style: _(c.value)
		}, [(b(!0), o(e, null, S(s.value, (e, t) => (b(), o("p", {
			key: t,
			class: "player__caption-line"
		}, T(e), 1))), 128))], 6)) : a("", !0);
	}
}), [["__scopeId", "data-v-4bd46046"]]), Ro = ["aria-label", "aria-expanded"], zo = ["aria-label"], Bo = { class: "capmenu__head" }, Vo = { class: "capmenu__title" }, Ho = ["aria-label"], Uo = ["aria-checked", "tabindex"], Wo = { class: "capmenu__check" }, Go = { class: "capmenu__optlabel" }, Ko = [
	"aria-checked",
	"tabindex",
	"onClick"
], qo = { class: "capmenu__check" }, Jo = { class: "capmenu__optlabel" }, Yo = { class: "capmenu__title capmenu__title--sub" }, Xo = ["aria-label"], Zo = [
	"aria-checked",
	"tabindex",
	"onClick"
], Qo = { class: "capmenu__check" }, $o = { class: "capmenu__optlabel" }, es = { class: "capmenu__title capmenu__title--sub" }, ts = { class: "capmenu__style" }, ns = { class: "capmenu__field" }, rs = { class: "capmenu__fieldlabel" }, is = { class: "capmenu__field" }, as = { class: "capmenu__fieldlabel" }, os = { class: "capmenu__field" }, ss = { class: "capmenu__fieldlabel" }, cs = { class: "capmenu__field" }, ls = { class: "capmenu__fieldlabel" }, us = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let c = t, l = n, d = ce(), f = ee(), { t: p } = X(), m = x(null), h = x(null), _ = r(() => d.subtitleLang), y = r(() => c.tracks.some((e) => e.language === _.value)), C = r(() => y.value ? "captions" : "captions-off"), w = r(() => y.value ? c.tracks.findIndex((e) => e.language === _.value) + 1 : 0), O = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
		function k(e) {
			l("update:open", e);
		}
		function A() {
			k(!1);
		}
		function j(e) {
			d.setSubtitle(e), f.defaultSubtitleLang = e, f.subtitlePreferenceSet = !0;
		}
		function N(e) {
			l("select-audio", e);
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
			let t = P(e, c.tracks.length + 1, w.value);
			t !== null && j(t === 0 ? null : c.tracks[t - 1].language);
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
		Ta(h, E(c, "open"), {
			lockScroll: !1,
			onEscape: () => (A(), !0)
		});
		function V(e) {
			m.value && !m.value.contains(e.target) && A();
		}
		return M(() => c.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0));
		}, { immediate: !0 }), v(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", V, !0);
		}), (n, r) => (b(), o("div", {
			ref_key: "rootEl",
			ref: m,
			class: "capmenu"
		}, [s("button", {
			type: "button",
			class: g(["capmenu__btn", { "is-active": y.value }]),
			"aria-label": y.value ? D(p)("player.captionsOn") : D(p)("player.captionsOff"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: r[0] ||= (e) => k(!t.open)
		}, [u(J, { name: C.value }, null, 8, ["name"])], 10, Ro), t.open ? (b(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": D(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", Bo, [s("h3", Vo, T(D(p)("player.subtitles")), 1), u(ya, {
				name: "x",
				label: D(p)("common.close"),
				size: "sm",
				onClick: A
			}, null, 8, ["label"])]),
			s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": D(p)("player.subtitleTrack"),
				onKeydown: F
			}, [s("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !y.value,
				tabindex: w.value === 0 ? 0 : -1,
				onClick: r[1] ||= (e) => j(null)
			}, [s("span", Wo, [y.value ? a("", !0) : (b(), i(J, {
				key: 0,
				name: "check"
			}))]), s("span", Go, T(D(p)("player.off")), 1)], 8, Uo), (b(!0), o(e, null, S(t.tracks, (e, t) => (b(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": _.value === e.language,
				tabindex: w.value === t + 1 ? 0 : -1,
				onClick: (t) => j(e.language)
			}, [s("span", qo, [_.value === e.language ? (b(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", Jo, T(e.label), 1)], 8, Ko))), 128))], 40, Ho),
			t.audioTracks.length > 1 ? (b(), o(e, { key: 0 }, [s("h3", Yo, T(D(p)("player.audio")), 1), s("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": D(p)("player.audioTrack"),
				onKeydown: I
			}, [(b(!0), o(e, null, S(t.audioTracks, (e) => (b(), o("button", {
				key: e.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": t.activeAudio === e.index,
				tabindex: O.value === e.index ? 0 : -1,
				onClick: (t) => N(e.index)
			}, [s("span", Qo, [t.activeAudio === e.index ? (b(), i(J, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", $o, T(e.label), 1)], 8, Zo))), 128))], 40, Xo)], 64)) : a("", !0),
			s("h3", es, T(D(p)("player.captionStyle")), 1),
			s("div", ts, [
				s("div", ns, [s("span", rs, T(D(p)("player.size")), 1), u($a, {
					"model-value": D(f).captionStyle.size,
					options: D(Ao),
					label: D(p)("player.captionSize"),
					"onUpdate:modelValue": L
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", is, [s("span", as, T(D(p)("player.color")), 1), u($a, {
					"model-value": D(f).captionStyle.textColor,
					options: D(jo),
					label: D(p)("player.captionColor"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", os, [s("span", ss, T(D(p)("player.background")), 1), u($a, {
					"model-value": D(f).captionStyle.background,
					options: D(Mo),
					label: D(p)("player.captionBackground"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", cs, [s("span", ls, T(D(p)("player.edge")), 1), u($a, {
					"model-value": D(f).captionStyle.edge,
					options: D(No),
					label: D(p)("player.captionEdge"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, zo)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), ds = 32, fs = 18, ps = 250, ms = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function hs(e, t, n, r, i, a, o) {
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
		r: ms(d / m),
		g: ms(f / m),
		b: ms(p / m)
	};
}
function gs(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: hs(e, t, n, 0, 0, r, n),
		right: hs(e, t, n, t - r, 0, t, n),
		center: hs(e, t, n, 0, 0, t, n)
	};
}
function _s({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function vs({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function ys(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${vs(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${vs(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${vs(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function bs(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var xs = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let n = e, i = x(!1), a = null;
		function s() {
			i.value = bs(a);
		}
		let c = r(() => n.enabled && !n.reducedMotion && !i.value), l = r(() => Math.min(1, .85 * Math.max(0, n.intensity))), u = x(null), d = null, f = null, p = !1, m = !1;
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
		function S() {
			let e = n.video;
			if (!c.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = h();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18);
				u.value = ys(gs(n, 32, 18));
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
		function j() {
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
		M(() => [
			c.value,
			n.playing,
			n.video
		], ([e, t]) => {
			N(), e && t && j();
		}, { immediate: !0 }), y(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				a = e, s(), a.addEventListener?.("chargingchange", s), a.addEventListener?.("levelchange", s);
			}).catch(() => {});
		}), v(() => {
			N(), a?.removeEventListener?.("chargingchange", s), a?.removeEventListener?.("levelchange", s);
		});
		let P = r(() => {
			let e = { opacity: String(l.value) };
			return u.value && (e.background = u.value), e;
		});
		return t({ sampleNow: S }), (e, t) => (b(), o("div", {
			class: g(["player__ambient", { "is-active": c.value }]),
			style: _(c.value ? P.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-88c68588"]]), Ss = ["aria-label"], Cs = { class: "resume__label" }, ws = { class: "resume__time numeric" }, Ts = { class: "resume__actions" }, Es = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = X(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (b(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": D(i)("player.resumePlayback")
		}, [s("p", Cs, [
			l(T(a.value[0]), 1),
			s("span", ws, T(D(Ni)(e.seconds)), 1),
			l(T(a.value[1]), 1)
		]), s("div", Ts, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [u(J, { name: "play" }), s("span", null, T(D(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [u(J, { name: "rewind" }), s("span", null, T(D(i)("player.startOver")), 1)])])], 8, Ss));
	}
}), [["__scopeId", "data-v-271c5209"]]), Ds = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Os = [
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
], ks = new Set(Os);
function As(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function js(...e) {
	return e.some((e) => ks.has(As(e)));
}
function Ms(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Ns(e) {
	return e?.error?.code === 2;
}
var Ps = 8, Fs = 15, Is = 2 * Math.PI * 15;
function Ls(e, t, n = Is) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var Rs = /* @__PURE__ */ new Map([
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
]), zs = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function Bs(e, t = "video/mp4") {
	let n = Rs.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function Vs(e, t = "video/mp4") {
	if (!e) return !0;
	let n = Bs(e, t);
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
async function Hs() {
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
		for (let t of zs) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function Us(e, t) {
	if (js(...e)) return !0;
	let n = e.map((e) => As(e)).find((e) => Ds.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (Ds.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await Vs(e.codec, r) || (n === "mp4" || n === "m4v") && !await Hs()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Ws = ["aria-label"], Gs = ["src"], Ks = { class: "upnext__body" }, qs = { class: "upnext__eyebrow" }, Js = { class: "upnext__title" }, Ys = {
	key: 0,
	class: "upnext__cd numeric"
}, Xs = { class: "upnext__actions" }, Zs = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, Qs = ["r"], $s = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], ec = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let { t: n } = X(), i = e, c = t, l = r(() => i.posterUrl ?? i.media.poster_url ?? null), d = r(() => Ls(i.remaining, i.total));
		return (t, r) => (b(), o("aside", {
			class: "upnext",
			role: "region",
			"aria-label": D(n)("player.upNext")
		}, [
			l.value ? (b(), o("img", {
				key: 0,
				class: "upnext__thumb",
				src: l.value,
				alt: "",
				loading: "lazy"
			}, null, 8, Gs)) : a("", !0),
			s("div", Ks, [
				s("p", qs, T(D(n)("player.upNext")), 1),
				s("h4", Js, T(e.media.name), 1),
				e.counting ? (b(), o("p", Ys, T(D(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", Xs, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => c("play-now")
				}, [u(J, { name: "play" }), s("span", null, T(D(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => c("cancel")
				}, T(D(n)("player.cancel")), 1)])
			]),
			e.counting ? (b(), o("svg", Zs, [s("circle", {
				cx: "18",
				cy: "18",
				r: D(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, Qs), s("circle", {
				cx: "18",
				cy: "18",
				r: D(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": D(Is),
				"stroke-dashoffset": d.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, $s)])) : a("", !0)
		], 8, Ws));
	}
}), [["__scopeId", "data-v-85909b2d"]]), tc = {
	class: "transcode",
	role: "alert"
}, nc = { class: "transcode__card" }, rc = { class: "transcode__heading" }, ic = { class: "transcode__body" }, ac = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = X();
		return (t, i) => (b(), o("div", tc, [s("div", nc, [
			u(J, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", rc, T(D(r)("player.transcodeHeading")), 1),
			s("p", ic, T(e.title ? D(r)("player.transcodeBodyTitled", { title: e.title }) : D(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, T(D(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), oc = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, sc = { class: "prep__card" }, cc = { class: "prep__heading" }, lc = { class: "prep__body" }, uc = ["aria-valuenow"], dc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = X(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (b(), o("div", oc, [s("div", sc, [
			u(J, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", cc, T(D(n)("player.transcodePreparingHeading")), 1),
			s("p", lc, T(e.title ? D(n)("player.transcodePreparingTitled", { title: e.title }) : D(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: _({ width: r() + "%" })
			}, null, 4)], 8, uc),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [u(J, { name: "arrow-left" }), s("span", null, T(D(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), fc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		return (e, t) => (b(), i(n, { name: "skip" }, {
			default: N(() => [p.value ? (b(), o("button", {
				key: 0,
				type: "button",
				class: "skip",
				onClick: F(m, ["stop"])
			}, [s("span", null, T(p.value.label), 1), u(J, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), pc = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, mc = ["aria-label", "onClick"], hc = { class: "skip-controls__label" }, gc = 5, _c = 30, vc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			let n = d(e.startMs), r = n - gc, i = n + _c;
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
		return (t, n) => g.value.length > 0 ? (b(), o("div", pc, [(b(!0), o(e, null, S(g.value, (e) => (b(), o("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${h(e.type)}`,
			onClick: F((t) => _(e), ["stop"])
		}, [s("span", hc, T(h(e.type)), 1), u(J, { name: "skip-forward" })], 8, mc))), 128))])) : a("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), yc = ["aria-label", "aria-expanded"], bc = ["aria-label"], xc = { class: "chapterlist__head" }, Sc = { class: "chapterlist__title" }, Cc = ["aria-label"], wc = ["onClick"], Tc = { class: "chapterlist__index" }, Ec = { class: "chapterlist__name" }, Dc = { class: "chapterlist__meta" }, Oc = { class: "chapterlist__time" }, kc = {
	key: 0,
	class: "chapterlist__duration"
}, Ac = {
	key: 1,
	class: "chapterlist__empty"
}, jc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Ni(e.start), a;
			return e.end != null && e.end > e.start && (a = Ni(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = x(null), h = x(null);
		Ta(h, E(i, "open"), {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function _(e) {
			m.value && !m.value.contains(e.target) && d();
		}
		M(() => i.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
		}), v(() => {
			document.removeEventListener("pointerdown", _, !0);
		});
		function y(e) {
			c("seek", e.start), d();
		}
		return (n, r) => (b(), o("div", {
			ref_key: "rootEl",
			ref: m,
			class: "chapterlist"
		}, [s("button", {
			type: "button",
			class: g(["chapterlist__btn player__iconbtn", { "is-active": t.open }]),
			"aria-label": D(l)("player.chapters"),
			"aria-haspopup": "dialog",
			"aria-expanded": t.open,
			onClick: f
		}, [u(J, { name: "list" })], 10, yc), t.open ? (b(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: h,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": D(l)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", xc, [s("h3", Sc, T(D(l)("player.chapters")), 1), u(ya, {
			name: "x",
			label: D(l)("common.close"),
			size: "sm",
			onClick: d
		}, null, 8, ["label"])]), p.value.length > 0 ? (b(), o("ul", {
			key: 0,
			class: "chapterlist__list",
			role: "listbox",
			"aria-label": D(l)("player.chapterList")
		}, [(b(!0), o(e, null, S(p.value, (e) => (b(), o("li", {
			key: e.index,
			class: "chapterlist__item",
			role: "option",
			"aria-selected": !1
		}, [s("button", {
			type: "button",
			class: "chapterlist__row",
			onClick: (t) => y(e.chapter)
		}, [
			s("span", Tc, T(e.index), 1),
			s("span", Ec, T(e.label), 1),
			s("span", Dc, [s("span", Oc, T(e.startLabel), 1), e.durationLabel ? (b(), o("span", kc, "· " + T(e.durationLabel), 1)) : a("", !0)])
		], 8, wc)]))), 128))], 8, Cc)) : (b(), o("p", Ac, T(D(l)("player.noChapters")), 1))], 8, bc)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Mc = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Nc = { class: "marker-timeline__ticks" }, Pc = [
	"title",
	"aria-label",
	"onClick"
], Fc = { class: "marker-timeline__tooltip" }, Ic = { class: "marker-timeline__tooltip-label" }, Lc = { class: "marker-timeline__tooltip-time numeric" }, Rc = ["onClick"], zc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		function x(e) {
			c("similar", e.type, e.startMs);
		}
		return (t, n) => p.value.length > 0 ? (b(), o("div", {
			key: 0,
			class: g(["marker-timeline", { "is-ad-active": h.value }]),
			"aria-label": "Marker timeline"
		}, [h.value ? (b(), o("div", Mc, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), l(" " + T(v.value), 1)])) : a("", !0), s("div", Nc, [(b(!0), o(e, null, S(p.value, (e) => (b(), o("button", {
			key: e.id,
			type: "button",
			class: g(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: _({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${D(Ni)(e.startSec)}`,
			"aria-label": `${e.label} at ${D(Ni)(e.startSec)}`,
			onClick: F((t) => y(e), ["stop"])
		}, [s("span", Fc, [
			s("span", Ic, T(e.label), 1),
			s("span", Lc, T(D(Ni)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: F((t) => x(e), ["stop"])
			}, " Find similar ", 8, Rc)
		])], 14, Pc))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), Bc = ["aria-label", "aria-expanded"], Vc = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, Hc = ["aria-label"], Uc = ["aria-selected", "onClick"], Wc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		], f = x(0), p = x(0), m = r(() => p.value > 0), h;
		function _() {
			h &&= (clearInterval(h), void 0);
		}
		function y(e) {
			_(), p.value = e, !(e <= 0) && (h = setInterval(() => {
				--p.value, p.value <= 0 && (_(), p.value = 0, c.onExpire());
			}, 1e3));
		}
		function C(e) {
			f.value = e, e === 0 ? (_(), p.value = 0) : y(e);
		}
		function w(e) {
			let t = Math.floor(e / 60), n = e % 60;
			return `${t}:${String(n).padStart(2, "0")}`;
		}
		let E = x(!1);
		function O() {
			m.value ? (C(0), E.value = !1) : E.value = !E.value;
		}
		function k(e) {
			C(e), E.value = !1;
		}
		return v(() => {
			_();
		}), i({ toggleOpen: O }), (t, r) => (b(), o("div", { class: g(["sleep-timer", { "is-active": m.value }]) }, [s("button", {
			type: "button",
			class: g(["sleep-timer__trigger", { "is-active": m.value }]),
			"aria-label": m.value ? `Sleep timer: ${w(p.value)} remaining` : D(l)("player.sleepTimer"),
			"aria-expanded": E.value,
			"aria-haspopup": "listbox",
			onClick: O
		}, [u(J, { name: "moon" }), m.value ? (b(), o("span", Vc, T(w(p.value)), 1)) : a("", !0)], 10, Bc), u(n, { name: "dropdown" }, {
			default: N(() => [E.value ? (b(), o("ul", {
				key: 0,
				class: "sleep-timer__menu",
				role: "listbox",
				"aria-label": D(l)("player.sleepTimer")
			}, [(b(), o(e, null, S(d, (e) => s("li", {
				key: e.value,
				class: g(["sleep-timer__option", { "is-selected": f.value === e.value }]),
				role: "option",
				"aria-selected": f.value === e.value,
				onClick: (t) => k(e.value)
			}, T(e.label), 11, Uc)), 64))], 8, Hc)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), Gc = ["aria-labelledby"], Kc = {
	key: 0,
	class: "phlix-modal__header"
}, qc = ["id"], Jc = { class: "phlix-modal__body" }, Yc = {
	key: 1,
	class: "phlix-modal__footer"
}, Xc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let { t: c } = X(), l = e, d = r, f = x(l.modelValue);
		M(() => l.modelValue, (e) => f.value = e);
		let p = x(null), m = O();
		function h() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			l.dismissible && h();
		}
		return Ta(p, f, { onEscape: () => l.dismissible ? (h(), !0) : !1 }), (r, l) => (b(), i(t, { to: "body" }, [u(n, { name: "phlix-modal" }, {
			default: N(() => [e.modelValue ? (b(), o("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: F(_, ["self"])
			}, [s("div", {
				ref_key: "panelEl",
				ref: p,
				class: g(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? D(m) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (b(), o("header", Kc, [e.title ? (b(), o("h2", {
					key: 0,
					id: D(m),
					class: "phlix-modal__title"
				}, T(e.title), 9, qc)) : a("", !0), e.hideClose ? a("", !0) : (b(), i(ya, {
					key: 1,
					name: "x",
					label: D(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: h
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", Jc, [C(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (b(), o("footer", Yc, [C(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, Gc)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-3be1ebaa"]]), Zc = ["aria-label"], Qc = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: n } = X(), i = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (b(), o("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? D(n)("common.loading"),
			style: _(i.value ? { fontSize: i.value } : void 0)
		}, [u(J, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Zc));
	}
}), [["__scopeId", "data-v-736b299d"]]), Z = {
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
function $c(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function el(e) {
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
function tl(e) {
	return JSON.stringify(e);
}
var nl = .1, rl = .99, il = 1.01, al = class {
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
		this.driftRate = 1 + nl * i / 1e3, this.driftRate = Math.min(il, Math.max(rl, this.driftRate));
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
}, ol = class {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new al(e.now);
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
		let t = el(e);
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
		this.send($c(e, t, this.now));
	}
}, sl = class {
	client;
	constructor(e) {
		this.client = new we({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new he() : void 0
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
}, cl = null;
function ll(e) {
	return cl ||= new sl(e), cl;
}
var Q = null, ul = null, dl = 0, fl = 5, pl = 1e3, $ = null, ml = null, hl = null, gl = null;
function _l() {
	try {
		return typeof window > "u" ? null : new he().getAccessToken();
	} catch {
		return null;
	}
}
function vl(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = _l() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function yl(e) {
	if ($) try {
		let t = JSON.parse(e.data);
		$.handleIncoming(t);
	} catch {}
}
function bl() {
	if (Q = null, $ && $.onDisconnect(), ul && dl < fl) {
		let e = pl * 2 ** dl;
		dl++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${dl})`), setTimeout(() => {
			ul && xl(ul);
		}, e);
	} else dl >= fl && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), ul = null, dl = 0, $ = null);
}
function xl(e, t, n, r) {
	if (t && (gl = t), Q && ul !== e && (Q.close(), Q = null, ul = null, dl = 0, $ = null), Q && ul === e) return;
	ul = e, dl = 0;
	let i = n ?? ml ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? hl ?? "Anonymous";
	ml = i, hl = a, $ = new ol({
		send: (e) => {
			Q && Q.readyState === WebSocket.OPEN && Q.send(tl(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			gl && gl({
				type: e.type,
				position: e.position,
				roomId: ul ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			gl && gl({
				type: n ? "play" : "pause",
				position: t,
				roomId: ul ?? void 0
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
	let o = vl(e);
	console.log(`[SyncPlay] Opening WebSocket to ${o}`), Q = new WebSocket(o), Q.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), dl = 0, $ && ul && $.joinGroup(ul);
	}, Q.onmessage = yl, Q.onclose = bl, Q.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function Sl() {
	Q &&= (Q.close(), null), $ &&= ($.leaveGroup(), $.onDisconnect(), null), ul = null, dl = 0;
}
function Cl(e) {
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
var wl = I("phlix-syncplay", () => {
	let e = x(null), t = x(null), n = x([]), i = x(null), a = x(!1), o = x(0), s = 0, c = r(() => t.value !== null), l = r(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), u = r(() => n.value.filter((e) => e.isOnline)), d = r(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), f = r(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(d.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	async function p(r, o) {
		a.value = !0, i.value = null;
		try {
			let i = ll(r), a = await i.createRoom(o);
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
			let i = ll(r), a = await i.getMembers(o);
			n.value = a;
			let c = await i.joinRoom(o);
			t.value = c, s = Date.now(), e.value &&= {
				...e.value,
				currentSession: c
			}, n.value = c.activeUsers, xl(o, (e) => {
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
				await ll(r).leaveRoom(e.value.id), Sl(), e.value = null, t.value = null, n.value = [];
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
		t.value && Cl({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function v(e) {
		if (t.value) try {
			let n = await ll(e).getState(t.value.id);
			t.value = n, s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function y(t) {
		if (e.value) try {
			let r = await ll(t).getMembers(e.value.id);
			n.value = r;
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh members", e;
		}
	}
	function b() {
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
		clearError: b,
		updateLocalPosition: S
	};
}), Tl = [
	"type",
	"disabled",
	"aria-busy"
], El = {
	key: 0,
	class: "phlix-btn__spinner"
}, Dl = { class: "phlix-btn__label" }, Ol = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		return (t, r) => (b(), o("button", {
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
			e.loading ? (b(), o("span", El, [u(J, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (b(), i(J, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", Dl, [C(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (b(), i(J, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, Tl));
	}
}), [["__scopeId", "data-v-38abf89d"]]);
//#endregion
//#region src/composables/useApiBase.ts
function kl(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function Al() {
	let e = f("mediaApiBase", void 0), t = f("apiBase", "");
	return r(() => kl(e) || kl(t));
}
//#endregion
//#region src/components/syncplay/SyncPlayOverlay.vue?vue&type=script&setup=true&lang.ts
var jl = {
	key: 0,
	class: "syncplay-overlay"
}, Ml = { class: "syncplay-overlay__badge" }, Nl = { class: "syncplay-overlay__label" }, Pl = { class: "syncplay-overlay__status-label" }, Fl = { class: "syncplay-overlay__members" }, Il = { class: "syncplay-overlay__member-count" }, Ll = { class: "syncplay-overlay__member-list" }, Rl = { class: "syncplay-overlay__member-name" }, zl = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, Bl = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = X(), c = wl(), d = Al(), f = r(() => n.apiBase ?? d.value), p = r(() => c.currentRoom?.name ?? "SyncPlay"), m = r(() => c.onlineMembers.length), h = r(() => c.syncStatus), _ = r(() => {
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
		return (t, n) => D(c).isInRoom ? (b(), o("div", jl, [
			s("div", Ml, [u(J, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", Nl, "SyncPlay: " + T(p.value), 1)]),
			s("div", { class: g(["syncplay-overlay__status", `syncplay-overlay__status--${h.value}`]) }, [u(J, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", Pl, T(_.value), 1)], 2),
			s("div", Fl, [s("span", Il, [u(J, { name: "user" }), l(" " + T(m.value) + " " + T(D(i)("syncplay.members", { count: m.value })), 1)]), s("ul", Ll, [(b(!0), o(e, null, S(D(c).onlineMembers.slice(0, 5), (e) => (b(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", Rl, T(e.name), 1)]))), 128)), D(c).onlineMembers.length > 5 ? (b(), o("li", zl, " +" + T(D(c).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			u(Ol, {
				variant: "ghost",
				size: "sm",
				onClick: y
			}, {
				default: N(() => [l(T(D(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), Vl = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], Hl = ["id"], Ul = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let n = e, r = t, i = O();
		function c() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (b(), o("span", { class: g(["phlix-switch", { "is-disabled": e.disabled }]) }, [s("button", {
			type: "button",
			role: "switch",
			class: g(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? D(i) : void 0,
			disabled: e.disabled,
			onClick: c
		}, [...n[0] ||= [s("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, Vl), e.label ? (b(), o("label", {
			key: 0,
			id: D(i),
			class: "phlix-switch__label",
			onClick: c
		}, T(e.label), 9, Hl)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-0725d51f"]]), Wl = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, Gl = ["aria-selected"], Kl = ["aria-selected"], ql = {
	key: 0,
	class: "syncplay-modal__fields"
}, Jl = { class: "syncplay-modal__field" }, Yl = {
	class: "syncplay-modal__label",
	for: "room-name"
}, Xl = ["placeholder"], Zl = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, Ql = { class: "syncplay-modal__toggle-hint" }, $l = {
	key: 1,
	class: "syncplay-modal__fields"
}, eu = { class: "syncplay-modal__field" }, tu = {
	class: "syncplay-modal__label",
	for: "room-id"
}, nu = ["placeholder"], ru = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, iu = {
	key: 3,
	class: "syncplay-modal__rooms"
}, au = { class: "syncplay-modal__rooms-title" }, ou = { class: "syncplay-modal__rooms-list" }, su = ["onClick"], cu = { class: "syncplay-modal__room-name" }, lu = { class: "syncplay-modal__room-count" }, uu = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, du = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let c = t, d = n, { t: f } = X(), p = wl(), m = Al(), h = r(() => c.apiBase ?? m.value), _ = x("create"), v = x(""), y = x(""), C = x(!0), w = x(!1), E = x(null), O = x([]), k = x(!1), j = r(() => v.value.trim().length > 0), I = r(() => y.value.trim().length > 0), L = r(() => (_.value === "create" ? j.value : I.value) && !w.value);
		M(() => c.modelValue, async (e) => {
			e && (E.value = null, v.value = "", C.value = !0, c.prefilledRoomId ? (y.value = c.prefilledRoomId, _.value = "join") : (y.value = "", _.value = "create"), await R());
		});
		async function R() {
			k.value = !0;
			try {
				let e = new sl(h.value);
				O.value = await e.listPublicRooms();
			} catch {
				O.value = [];
			} finally {
				k.value = !1;
			}
		}
		async function z() {
			if (L.value) {
				w.value = !0, E.value = null;
				try {
					_.value === "create" ? (await p.createAndJoinRoom(h.value, {
						name: v.value.trim(),
						isPublic: C.value
					}), p.currentRoom && d("joined", p.currentRoom)) : (await p.joinRoom(h.value, y.value.trim()), p.currentRoom && d("joined", p.currentRoom)), d("update:modelValue", !1);
				} catch (e) {
					E.value = e instanceof Error ? e.message : "Operation failed";
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
		return (n, r) => (b(), i(Xc, {
			"model-value": t.modelValue,
			title: D(f)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[5] ||= (e) => d("update:modelValue", e),
			onClose: V
		}, {
			footer: N(() => [u(Ol, {
				variant: "ghost",
				type: "button",
				onClick: V
			}, {
				default: N(() => [l(T(D(f)("common.close")), 1)]),
				_: 1
			}), u(Ol, {
				variant: "solid",
				type: "button",
				loading: w.value,
				disabled: !L.value,
				onClick: z
			}, {
				default: N(() => [l(T(_.value === "create" ? D(f)("syncplay.createRoom") : D(f)("syncplay.joinRoom")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			default: N(() => [s("form", {
				class: "syncplay-modal",
				onSubmit: F(z, ["prevent"])
			}, [
				s("div", Wl, [s("button", {
					type: "button",
					role: "tab",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "create" }]),
					"aria-selected": _.value === "create",
					onClick: r[0] ||= (e) => _.value = "create"
				}, T(D(f)("syncplay.createRoom")), 11, Gl), s("button", {
					type: "button",
					role: "tab",
					class: g(["syncplay-modal__tab", { "is-active": _.value === "join" }]),
					"aria-selected": _.value === "join",
					onClick: r[1] ||= (e) => _.value = "join"
				}, T(D(f)("syncplay.joinRoom")), 11, Kl)]),
				_.value === "create" ? (b(), o("div", ql, [s("div", Jl, [s("label", Yl, T(D(f)("syncplay.roomName")), 1), P(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => v.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: D(f)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, Xl), [[A, v.value]])]), s("div", Zl, [u(Ul, {
					modelValue: C.value,
					"onUpdate:modelValue": r[3] ||= (e) => C.value = e,
					label: D(f)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), s("span", Ql, T(C.value ? D(f)("syncplay.publicHint") : D(f)("syncplay.privateHint")), 1)])])) : (b(), o("div", $l, [s("div", eu, [s("label", tu, T(D(f)("syncplay.roomId")), 1), P(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[4] ||= (e) => y.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: D(f)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, nu), [[A, y.value]])])])),
				E.value ? (b(), o("p", ru, T(E.value), 1)) : a("", !0),
				_.value === "join" && O.value.length > 0 ? (b(), o("div", iu, [s("h3", au, T(D(f)("syncplay.publicRooms")), 1), s("ul", ou, [(b(!0), o(e, null, S(O.value, (e) => (b(), o("li", {
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
					s("span", cu, T(e.name), 1),
					s("span", lu, T(e.memberCount) + " " + T(D(f)("syncplay.members")), 1)
				], 8, su)]))), 128))])])) : a("", !0),
				k.value ? (b(), o("div", uu, [u(J, { name: "spinner" }), s("span", null, T(D(f)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]), fu = {
	key: 0,
	class: "syncplay-controls"
}, pu = ["aria-label"], mu = { class: "syncplay-controls__wait-label" }, hu = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, gu = { key: 0 }, _u = { class: "syncplay-controls__transport" }, vu = ["aria-label"], yu = ["aria-label"], bu = ["aria-label"], xu = { class: "syncplay-controls__status-label" }, Su = 10, Cu = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let n = e, i = t, { t: c } = X(), d = wl(), f = Al(), p = r(() => n.apiBase ?? f.value), m = x(!1), h = x([]), _ = r(() => m.value || d.syncStatus === "re-syncing");
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
		async function S() {
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
			await C(Math.max(0, n.position - Su));
		}
		async function E() {
			await C(Math.min(n.duration, n.position + Su));
		}
		return M(() => d.syncStatus, (e) => {
			e === "re-syncing" ? m.value = !0 : e === "synced" && (m.value = !1, h.value = []);
		}), (t, n) => D(d).isInRoom ? (b(), o("div", fu, [
			_.value ? (b(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": D(c)("syncplay.waitingForMembers")
			}, [
				u(J, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				s("span", mu, T(D(c)("syncplay.waitingForMembers")), 1),
				h.value.length > 0 ? (b(), o("span", hu, [l(T(h.value.slice(0, 3).join(", ")) + " ", 1), h.value.length > 3 ? (b(), o("span", gu, "+" + T(h.value.length - 3), 1)) : a("", !0)])) : a("", !0)
			], 8, pu)) : a("", !0),
			s("div", _u, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": D(c)("syncplay.rewind"),
					onClick: w
				}, [u(J, { name: "rewind" })], 8, vu),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? D(c)("syncplay.pauseAll") : D(c)("syncplay.playAll"),
					onClick: S
				}, [u(J, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, yu),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": D(c)("syncplay.fastForward"),
					onClick: E
				}, [u(J, { name: "forward" })], 8, bu)
			]),
			s("div", { class: g(["syncplay-controls__status", `syncplay-controls__status--${D(d).syncStatus}`]) }, [u(J, {
				name: D(d).syncStatus === "synced" ? "check" : D(d).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", xu, T(D(d).syncStatus === "synced" ? D(c)("syncplay.synced") : D(d).syncStatus === "outOfSync" ? D(c)("syncplay.outOfSync") : D(c)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), wu = { class: "player__stage" }, Tu = ["src", "poster"], Eu = [
	"src",
	"srclang",
	"label",
	"default"
], Du = { class: "player__meta" }, Ou = ["aria-label"], ku = { class: "player__meta-text" }, Au = { class: "player__eyebrow" }, ju = { class: "player__title" }, Mu = { class: "player__sub numeric" }, Nu = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Pu = {
	key: 0,
	class: "player__center"
}, Fu = ["aria-label"], Iu = { class: "player__btnrow" }, Lu = ["aria-label"], Ru = ["aria-label"], zu = ["aria-label"], Bu = { class: "player__time numeric" }, Vu = ["aria-label", "aria-pressed"], Hu = ["title"], Uu = ["aria-label"], Wu = ["aria-label"], Gu = ["aria-label", "aria-pressed"], Ku = ["aria-label", "aria-pressed"], qu = ["aria-label"], Ju = { class: "similar-modal" }, Yu = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, Xu = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, Zu = { class: "similar-modal__state-title" }, Qu = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, $u = {
	key: 3,
	class: "similar-modal__results"
}, ed = { class: "similar-modal__poster" }, td = ["src", "alt"], nd = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, rd = { class: "similar-modal__result-body" }, id = { class: "similar-modal__result-title" }, ad = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, od = { key: 0 }, sd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
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
		let c = t, d = n, p = ce(), m = ee(), { t: _ } = X(), C = wl(), w = De(), E = r(() => w.isFavorite(c.media.id)), O = r(() => w.likeLevel(c.media.id));
		function k() {
			w.toggleFavorite(c.media.id, de());
		}
		function A(e) {
			w.setLike(c.media.id, e, de());
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
		], P = x(null), I = x(null), L = x(!0), R = x(!1), z = x(!1), B = x(!1), V = x(!1), H = x(!1), te = x(!1), ne = x(null), re = x(null), ie = x(!1), ae = Te(), oe = x(!1), se = r(() => V.value ? 1.35 : 1), U = x(js(c.streamUrl, c.media.path));
		async function le() {
			if (U.value) return;
			let e = c.playbackAudioTracks ?? [];
			e.length !== 0 && await Us([c.streamUrl, c.media.path], e) && (U.value = !0);
		}
		M(() => c.playbackAudioTracks, (e) => {
			!e || e.length === 0 || le();
		}, { immediate: !1 });
		let ue = f("phlixConfig", null);
		function de() {
			return ue?.apiBase ?? "";
		}
		let W = fa({
			apiBase: () => c.apiBase ?? "",
			hlsConfig: ue?.playerHlsConfig
		}), fe = _a({ apiBase: () => c.apiBase ?? "" }), pe = null;
		function me(e) {
			pe !== null && clearTimeout(pe), pe = setTimeout(() => {
				pe = null, fe.fetch(e);
			}, 0);
		}
		let he = r(() => c.thumbnailAt ?? fe.thumbnailAt), ge = r(() => U.value ? void 0 : c.streamUrl), _e = r(() => U.value && W.state.value !== "ready"), ve = r(() => U.value && (W.state.value === "preparing" || W.state.value === "idle")), ye = r(() => U.value && W.state.value === "error");
		function be(e = 0) {
			let t = P.value;
			t && W.start(t, c.media.id, void 0, e);
		}
		function G(e) {
			if (p.quality === "original" && e !== "auto") {
				W.loadVariantPlaylist(no);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				W.loadVariantPlaylist(e);
				return;
			}
			W.setLevel(e);
		}
		let K = !1;
		function xe() {
			m.defaultQuality = to;
		}
		function Se() {
			let e = W.levels.value;
			if (e.length === 0) return !1;
			let t = m.defaultQuality;
			if (!t || t === "auto") return !0;
			if (t === "original") {
				let t = W.variants.value;
				if (!t || t.length === 0) return !1;
				if (lo(e, t)) W.loadVariantPlaylist(no);
				else {
					let t = co(e);
					t >= 0 && W.setNextLevel(t), xe();
				}
				return !0;
			}
			let n = oo(e, t);
			return n >= 0 ? W.setNextLevel(n) : xe(), !0;
		}
		M(() => W.levels.value, (e) => {
			K || e.length === 0 || Se() && (K = !0);
		}), M(() => W.variants.value, (e) => {
			K || !e?.length || h(() => {
				K || Se() && (K = !0);
			});
		}, { deep: !0 });
		let Ce = x(p.resumePositionFor(c.media.id) ?? 0), Ee = x(!U.value && Ce.value > 0), Oe = null, ke = x(!1), Ae = x(8), je, Me = x(null), Ne = x(0), Pe = x(!1), Fe = x([]), Ie = x(!1), Le = x(null);
		function Re(e, t) {
			Me.value = e, Ne.value = t, Fe.value = [], Le.value = null, Pe.value = !0, Ue(e, t);
		}
		let ze = null, Be = null, Ve = null;
		function He() {
			let e = c.apiBase ?? "";
			return (Be === null || Ve !== e) && (Be = new we({ baseUrl: e }), Ve = e), Be;
		}
		async function Ue(e, t) {
			ze?.abort(), ze = new AbortController(), Ie.value = !0, Le.value = null;
			try {
				let n = await He().searchByMarker(e, t, 30, 20, ze.signal);
				Fe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Le.value = "Failed to load similar media. Please try again.", Fe.value = [];
			} finally {
				Ie.value = !1;
			}
		}
		function We() {
			ze?.abort(), Pe.value = !1, Fe.value = [], Le.value = null, Me.value = null;
		}
		let Ge = r(() => p.upNext);
		function Ke() {
			U.value = js(c.streamUrl, c.media.path), le(), Ce.value = p.resumePositionFor(c.media.id) ?? 0, Ee.value = !U.value && Ce.value > 0, Oe = null, Ot = !1, gt = !1, _t = !1, lt.value = -1, Ct = null, K = !1, Xe(), ke.value = !1, W.reset(), P.value && (P.value.currentTime = 0), U.value && be(), me(c.media.id);
		}
		function qe(e) {
			let t = P.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Oe = Math.max(0, e));
		}
		function Je() {
			qe(Ce.value), Ee.value = !1, P.value?.play()?.catch(() => {});
		}
		function Ye() {
			Oe = null, qe(0), p.clearResume(c.media.id), Ee.value = !1, P.value?.play()?.catch(() => {});
		}
		function Xe() {
			je &&= (clearInterval(je), void 0);
		}
		function Ze() {
			Ae.value = 8, Xe(), je = setInterval(() => {
				--Ae.value, Ae.value <= 0 && (Xe(), $e());
			}, 1e3);
		}
		function Qe() {
			on(), L.value = !0, p.upNext && (ke.value = !0, m.autoplay && Ze());
		}
		function $e() {
			Xe(), ke.value = !1;
			let e = p.next(c.streamUrlFor);
			e && d("play-next", e);
		}
		function et() {
			Xe(), ke.value = !1;
		}
		function tt() {
			if (U.value) return;
			let e = P.value, t = Ns(e) && (e?.currentTime ?? 0) === 0;
			(Ms(e) || t) && (U.value = !0, be(e?.currentTime ?? 0));
		}
		let nt = x([]), rt = x([]), it = x(-1), at = x(!1), ot = r(() => W.state.value === "ready" && W.audioTracks.value.length > 0), st = r(() => W.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), ct = r(() => (c.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), lt = x(-1), ut = r(() => !ot.value && !U.value && rt.value.length === 0 && ct.value.length > 1), dt = r(() => ot.value ? st.value : ut.value ? ct.value : rt.value), ft = r(() => {
			if (ot.value) return W.currentAudioTrack.value;
			if (ut.value) {
				if (lt.value >= 0) return lt.value;
				let e = (c.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : c.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return it.value;
		}), pt = x(!1), mt = p.subtitleLang, ht = r(() => U.value ? W.subtitleTracks.value : c.playbackSubtitleTracks ?? []), gt = !1, _t = !1;
		function vt() {
			if (gt) return;
			if (m.subtitlePreferenceSet) {
				gt = !0;
				return;
			}
			let e = ht.value.find((e) => e.default);
			if (!e) return;
			let t = nt.value.find((t) => t.language === (e.language || e.label));
			t && (p.setSubtitle(t.language), mt = t.language, gt = !0);
		}
		function yt() {
			if (_t) return;
			let e = m.defaultAudioLang;
			if (!e) return;
			let t = dt.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = ft.value;
			r >= 0 && r < t.length || (wt(n), _t = !0);
		}
		let bt = r(() => nt.value.some((e) => e.language === p.subtitleLang));
		function xt() {
			let e = P.value;
			nt.value = _o(e), rt.value = vo(e), it.value = Co(e), vt(), yt();
		}
		function St() {
			if (bt.value) mt = p.subtitleLang, p.setSubtitle(null);
			else {
				let e = mt && nt.value.some((e) => e.language === mt) ? mt : nt.value[0]?.language ?? null;
				p.setSubtitle(e);
			}
			d("captions");
		}
		let Ct = null;
		function wt(e) {
			if (ot.value) W.setAudioTrack(e);
			else if (ut.value) {
				if (e === ft.value) return;
				lt.value = e, Ct = e, U.value = !0, be(P.value?.currentTime ?? 0);
			} else So(P.value, e), it.value = e;
		}
		M(ot, (e) => {
			if (!e || Ct === null) return;
			let t = Ct;
			Ct = null, t >= 0 && t < W.audioTracks.value.length && W.setAudioTrack(t);
		}), M(ht, () => {
			h(() => xt());
		}, { deep: !0 });
		let Tt = null, Et, Dt = r(() => {
			let e = [];
			c.media.year && e.push({ text: String(c.media.year) }), c.media.rating && e.push({
				text: c.media.rating,
				cert: !0
			}), c.media.runtime && e.push({ text: `${c.media.runtime}m` });
			let t = c.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Ot = !1;
		function kt() {
			if (!c.autoplay || Ot || Ee.value || _e.value) return;
			let e = P.value;
			if (!e || !e.paused) return;
			Ot = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, p.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function At() {
			kt();
		}
		function jt() {
			c.prevEpisode && d("play-episode", c.prevEpisode);
		}
		function Mt() {
			c.nextEpisode && d("play-episode", c.nextEpisode);
		}
		function Nt() {
			let e = P.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Pt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Ft() {
			p.play(), p.setMediaPositionState();
		}
		function It() {
			p.pause(), p.setMediaPositionState();
		}
		function Lt() {
			let e = P.value;
			e && p.updateProgress(e.currentTime, e.duration, Pt(e));
		}
		function Rt() {
			let e = P.value;
			e && (e.volume = p.volume, e.muted = p.muted, e.playbackRate = p.rate, Oe !== null && (e.currentTime = e.duration ? Math.min(e.duration, Oe) : Oe, Oe = null), p.updateProgress(e.currentTime, e.duration, Pt(e)), p.setMediaPositionState(), xt());
		}
		function zt() {
			let e = P.value;
			e && p.updateProgress(e.currentTime, e.duration, Pt(e));
		}
		function Bt() {
			let e = P.value;
			e && (Math.abs(e.volume - p.volume) > .001 && p.setVolume(e.volume), e.muted !== p.muted && p.toggleMute());
		}
		function Vt() {
			let e = P.value;
			e && e.playbackRate !== p.rate && p.setRate(e.playbackRate), p.setMediaPositionState();
		}
		function Ht() {
			p.setMediaPositionState();
		}
		function Ut() {
			p.setMediaPositionState();
		}
		function q(e) {
			let t = P.value;
			t && p.duration > 0 && (t.currentTime = Math.min(p.duration, Math.max(0, e)));
		}
		function Wt() {
			z.value = !0, cn();
		}
		function Gt() {
			z.value = !1, cn();
		}
		function Kt(e) {
			let t = j.reduce((e, t, n) => Math.abs(t - p.rate) < Math.abs(j[e] - p.rate) ? n : e, 0), n = j[Math.min(j.length - 1, Math.max(0, t + e))];
			p.setRate(n);
		}
		function qt() {
			if (!c.markers) return;
			let e = p.position, t = c.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && q(t.startMs / 1e3);
		}
		function Jt() {
			if (!c.markers) return;
			let e = p.position, t = c.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && q(t.startMs / 1e3);
		}
		function Yt() {
			ne.value?.toggleOpen();
		}
		let Xt = null;
		function Zt() {
			let e = P.value;
			if (!e) {
				p.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), p.pause();
				return;
			}
			Xt !== null && (clearInterval(Xt), Xt = null);
			let t = .05;
			Xt = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Xt), Xt = null, e.volume = 0, e.pause(), p.pause());
			}, 50);
		}
		Ma({
			playPause: Nt,
			seekBy: (e) => q(p.position + e),
			frameStep: (e) => {
				p.playing || q(p.position + e / 30);
			},
			volumeBy: (e) => p.setVolume(p.volume + e),
			toggleMute: Qt,
			toggleFullscreen: en,
			toggleCaptions: St,
			toggleTheater: $t,
			togglePip: nn,
			skipIntro: qt,
			skipOutro: Jt,
			sleepTimer: Yt,
			seekToPercent: (e) => q(e * p.duration),
			speedStep: Kt,
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
		}, { enabled: () => !B.value && !at.value && !pt.value });
		function Qt() {
			p.toggleMute();
		}
		function $t() {
			V.value = !V.value, d("theater", V.value);
		}
		M(() => p.muted, (e) => {
			let t = P.value;
			t && t.muted !== e && (t.muted = e);
		}), M(() => p.volume, (e) => {
			let t = P.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), M(() => p.rate, (e) => {
			let t = P.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		}), M(() => p.lastCommand, (e) => {
			e && (e.type === "seekTo" ? qe(e.value) : e.type === "seekBy" && qe(p.position + e.value));
		});
		function en() {
			if (typeof document > "u") return;
			let e = I.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function tn() {
			R.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function nn() {
			let e = P.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			d("pip");
		}
		function rn() {
			H.value = !0;
		}
		function an() {
			H.value = !1;
		}
		function on() {
			Et &&= (clearTimeout(Et), void 0);
		}
		function sn() {
			on(), !(!p.playing || z.value) && (Et = setTimeout(() => {
				p.playing && !z.value && (L.value = !1);
			}, c.idleTimeout ?? 3e3));
		}
		function cn() {
			L.value = !0, sn();
		}
		M(() => p.playing, (e) => {
			e ? (Ee.value = !1, et(), sn()) : (on(), L.value = !0);
		});
		let ln = null;
		return y(() => {
			p.setCurrent(c.media, {
				resetPosition: !1,
				streamUrl: c.streamUrl
			}), w.hydrate(c.media), typeof document < "u" && (document.addEventListener("fullscreenchange", tn), te.value = document.pictureInPictureEnabled === !0), ln = p.bindMediaSession({
				onPlay: () => void P.value?.play()?.catch(() => {}),
				onPause: () => P.value?.pause(),
				onSeek: (e) => q(e)
			}), Tt = P.value?.textTracks ?? null, Tt?.addEventListener?.("addtrack", xt), Tt?.addEventListener?.("removetrack", xt), xt(), U.value && be(), me(c.media.id);
		}), M(() => c.media, (e) => {
			p.setCurrent(e, {
				resetPosition: !1,
				streamUrl: c.streamUrl
			}), Ke();
		}), M(() => c.media?.id, () => {
			w.hydrate(c.media);
		}), M(() => C.currentSession, (e) => {
			e && (e.state === "playing" ? (P.value?.play(), p.play()) : e.state === "paused" && (P.value?.pause(), p.pause()), C.updateLocalPosition(p.position), Math.abs(C.driftAmount) > 2 && qe(e.playbackPosition));
		}), v(() => {
			on(), Xe(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", tn), ln?.(), Tt?.removeEventListener?.("addtrack", xt), Tt?.removeEventListener?.("removetrack", xt), Xt !== null && (clearInterval(Xt), Xt = null), pe !== null && (clearTimeout(pe), pe = null);
		}), (n, r) => (b(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: g(["player", {
				"is-chrome-hidden": !L.value,
				"is-theater": V.value
			}]),
			onPointermove: cn,
			onPointerdown: cn,
			onFocusin: cn
		}, [u(xs, {
			video: P.value,
			enabled: D(m).atmosphere,
			playing: D(p).playing,
			"reduced-motion": D(m).effectiveReducedMotion,
			intensity: se.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), s("div", wu, [
			s("video", {
				ref_key: "videoRef",
				ref: P,
				class: "player__video",
				src: ge.value,
				poster: t.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Ft,
				onPause: It,
				onTimeupdate: Lt,
				onLoadedmetadata: Rt,
				onCanplay: At,
				onProgress: zt,
				onVolumechange: Bt,
				onRatechange: Vt,
				onSeeked: Ht,
				onDurationchange: Ut,
				onEnded: Qe,
				onError: tt,
				onEnterpictureinpicture: rn,
				onLeavepictureinpicture: an,
				onClick: Nt
			}, [(b(!0), o(e, null, S(ht.value, (e) => (b(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Eu))), 128))], 40, Tu),
			r[18] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[19] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", Du, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": D(_)("player.back"),
				onClick: r[0] ||= F((e) => d("back"), ["stop"])
			}, [u(J, { name: "arrow-left" })], 8, Ou), s("div", ku, [
				s("p", Au, T(D(_)("player.nowPlaying")), 1),
				s("h2", ju, T(t.media.name), 1),
				s("div", Mu, [(b(!0), o(e, null, S(Dt.value, (t, n) => (b(), o(e, { key: n }, [n > 0 && !t.cert ? (b(), o("span", Nu, "·")) : a("", !0), s("span", { class: g({ player__cert: t.cert }) }, T(t.text), 3)], 64))), 128))])
			])]),
			_e.value ? a("", !0) : (b(), o("div", Pu, [s("button", {
				type: "button",
				class: g(["player__bigplay", { "is-playing": D(p).playing }]),
				"aria-label": D(p).playing ? D(_)("player.pause") : D(_)("player.play"),
				onClick: F(Nt, ["stop"])
			}, [u(J, { name: D(p).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Fu)])),
			u(Lo, {
				video: P.value,
				language: D(p).subtitleLang,
				"style-config": D(m).captionStyle,
				lifted: L.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			_e.value ? a("", !0) : (b(), o("div", {
				key: 1,
				class: "player__controls",
				onClick: r[6] ||= F(() => {}, ["stop"])
			}, [
				u(Ui, {
					position: D(p).position,
					duration: D(p).duration,
					buffered: D(p).buffered,
					chapters: t.chapters,
					"thumbnail-at": he.value,
					onSeek: q,
					onScrubStart: Wt,
					onScrubEnd: Gt
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				D(m).showMarkerTimeline && t.markers && t.markers.length > 0 ? (b(), i(zc, {
					key: 0,
					position: D(p).position,
					duration: D(p).duration,
					markers: t.markers,
					onSeek: q,
					onSimilar: Re
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", Iu, [
					t.prevEpisode ? (b(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": D(_)("player.previousEpisode"),
						onClick: jt
					}, [u(J, { name: "skip-back" })], 8, Lu)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": D(p).playing ? D(_)("player.pause") : D(_)("player.play"),
						onClick: Nt
					}, [u(J, { name: D(p).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ru),
					t.nextEpisode ? (b(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": D(_)("player.nextEpisode"),
						onClick: Mt
					}, [u(J, { name: "skip-forward" })], 8, zu)) : a("", !0),
					s("span", Bu, [
						l(T(D(Ni)(D(p).position)), 1),
						r[14] ||= s("span", { class: "player__sep" }, " / ", -1),
						l(T(D(Ni)(D(p).duration)), 1)
					]),
					r[15] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__favorite", { "is-on": E.value }]),
						"aria-label": E.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": E.value ? "true" : "false",
						onClick: k
					}, [u(J, { name: E.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Vu),
					u(Mi, {
						level: O.value,
						onCycle: A
					}, null, 8, ["level"]),
					u(Ga),
					u(eo),
					u(fo, {
						ref_key: "qualityMenuRef",
						ref: re,
						open: ie.value,
						"onUpdate:open": r[1] ||= (e) => ie.value = e,
						levels: D(W).levels.value,
						variants: D(W).variants.value,
						"current-level": D(W).currentLevel.value,
						"auto-enabled": D(W).autoEnabled.value,
						"active-height": D(W).activeLevelHeight.value,
						onSelect: G
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					U.value ? a("", !0) : (b(), o("span", {
						key: 2,
						class: "player__direct-badge",
						title: D(_)("player.qualityDirectStream")
					}, T(D(_)("player.directStream")), 9, Hu)),
					u(us, {
						open: at.value,
						"onUpdate:open": r[2] ||= (e) => at.value = e,
						tracks: nt.value,
						"audio-tracks": dt.value,
						"active-audio": ft.value,
						onSelectAudio: wt
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					u(jc, {
						open: pt.value,
						"onUpdate:open": r[3] ||= (e) => pt.value = e,
						chapters: t.chapters ?? [],
						onSeek: q
					}, null, 8, ["open", "chapters"]),
					u(Wc, {
						ref_key: "sleepTimerRef",
						ref: ne,
						"on-expire": Zt
					}, null, 512),
					s("button", {
						type: "button",
						class: g(["player__iconbtn player__syncplay", { "is-on": D(C).isInRoom }]),
						"aria-label": D(C).isInRoom ? D(_)("syncplay.inRoom") : D(_)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[4] ||= (e) => oe.value = !0
					}, [u(J, { name: "user" })], 10, Uu),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": D(_)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => B.value = !0
					}, [u(J, { name: "info" })], 8, Wu),
					te.value ? (b(), o("button", {
						key: 3,
						type: "button",
						class: g(["player__iconbtn", { "is-on": H.value }]),
						"aria-label": H.value ? D(_)("player.exitPip") : D(_)("player.pip"),
						"aria-pressed": H.value,
						onClick: nn
					}, [u(J, { name: "pip" })], 10, Gu)) : a("", !0),
					s("button", {
						type: "button",
						class: g(["player__iconbtn", { "is-on": V.value }]),
						"aria-label": V.value ? D(_)("player.exitTheater") : D(_)("player.theater"),
						"aria-pressed": V.value,
						onClick: $t
					}, [u(J, { name: "theater" })], 10, Ku),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": R.value ? D(_)("player.exitFullscreen") : D(_)("player.fullscreen"),
						onClick: en
					}, [u(J, { name: R.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, qu)
				])
			])),
			_e.value ? a("", !0) : (b(), i(fc, {
				key: 2,
				position: D(p).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: q
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			_e.value ? a("", !0) : (b(), i(vc, {
				key: 3,
				position: D(p).position,
				markers: t.markers,
				onSkip: q
			}, null, 8, ["position", "markers"])),
			Ee.value && !_e.value ? (b(), i(Es, {
				key: 4,
				seconds: Ce.value,
				onResume: Je,
				onRestart: Ye
			}, null, 8, ["seconds"])) : a("", !0),
			ke.value && Ge.value && !_e.value ? (b(), i(ec, {
				key: 5,
				media: Ge.value,
				remaining: Ae.value,
				total: D(8),
				counting: D(m).autoplay,
				onPlayNow: $e,
				onCancel: et
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			u(Xc, {
				modelValue: Pe.value,
				"onUpdate:modelValue": r[7] ||= (e) => Pe.value = e,
				title: `Similar ${Me.value ?? "marker"}s`,
				size: "lg",
				onClose: We
			}, {
				default: N(() => [s("div", Ju, [Ie.value ? (b(), o("div", Yu, [u(Qc, { label: "Finding similar media" })])) : Le.value ? (b(), o("div", Xu, [u(J, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", Zu, T(Le.value), 1)])) : !Ie.value && Fe.value.length === 0 ? (b(), o("div", Qu, [
					u(J, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[16] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[17] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (b(), o("ul", $u, [(b(!0), o(e, null, S(Fe.value, (e) => (b(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", ed, [e.poster_url ? (b(), o("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, td)) : (b(), o("div", nd, [u(J, { name: "film" })]))]), s("div", rd, [s("p", id, T(e.name), 1), e.year ? (b(), o("p", ad, [l(T(e.year) + " ", 1), e.runtime ? (b(), o("span", od, " · " + T(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			ve.value ? (b(), i(dc, {
				key: 6,
				title: t.media.name,
				progress: D(W).progress.value,
				onBack: r[8] ||= (e) => d("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			ye.value ? (b(), i(ac, {
				key: 7,
				title: t.media.name,
				onBack: r[9] ||= (e) => d("back")
			}, null, 8, ["title"])) : a("", !0),
			D(C).isInRoom ? (b(), i(Cu, {
				key: 8,
				position: D(p).position,
				duration: D(p).duration,
				"is-playing": D(p).playing,
				onSeek: q,
				onPlay: r[10] ||= (e) => void P.value?.play(),
				onPause: r[11] ||= (e) => void P.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			D(C).isInRoom ? (b(), i(Bl, { key: 9 })) : a("", !0),
			u(du, {
				modelValue: oe.value,
				"onUpdate:modelValue": r[12] ||= (e) => oe.value = e
			}, null, 8, ["modelValue"]),
			u(Va, {
				open: B.value,
				onClose: r[13] ||= (e) => B.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-8c6fd305"]]), cd = ["aria-label"], ld = ["src", "poster"], ud = { class: "mini__body" }, dd = { class: "mini__title" }, fd = { class: "mini__controls" }, pd = ["aria-label"], md = ["aria-label", "aria-pressed"], hd = ["aria-label"], gd = ["aria-label"], _d = {
	class: "mini__progress",
	"aria-hidden": "true"
}, vd = /*#__PURE__*/ Y(/* @__PURE__ */ d({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let c = t, l = ce(), { t: d } = X(), p = x(null), m = x(null), h = De(), S = f("phlixConfig", null), C = r(() => l.current ? h.isFavorite(l.current.id) : !1);
		function w() {
			let e = l.current?.id;
			e && h.toggleFavorite(e, S?.apiBase ?? "");
		}
		let E = r(() => l.miniPlayer && !!l.current && (!!l.streamUrl || !!l.hlsMasterUrl)), O = r(() => l.current?.name ?? ""), k = r(() => Math.max(0, Math.min(1, l.progress)));
		function A() {
			let e = p.value;
			e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, l.position > 0 && (!e.duration || l.position < e.duration) && (e.currentTime = l.position), l.playing && e.play()?.catch(() => {}));
		}
		function j() {
			l.play();
		}
		function P() {
			l.pause();
		}
		function F() {
			let e = p.value;
			e && l.updateProgress(e.currentTime, e.duration);
		}
		function I() {
			let e = p.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function L() {
			l.current && c("expand", l.current.id);
		}
		function R() {
			l.closePlayer();
		}
		async function z() {
			let e = p.value;
			!e || !l.hlsMasterUrl || (m.value?.destroy(), m.value = null, m.value = await Qi(e, l.hlsMasterUrl, {
				startPosition: l.position,
				onReady: () => {
					let e = p.value;
					e && (e.volume = l.volume, e.muted = l.muted, e.playbackRate = l.rate, l.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return M(() => E.value, async (e) => {
			if (!e) {
				m.value?.destroy(), m.value = null;
				return;
			}
			!l.hlsMasterUrl || l.streamUrl || await z();
		}), y(async () => {
			E.value && l.hlsMasterUrl && !l.streamUrl && await z();
		}), M(() => l.playing, (e) => {
			let t = p.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), M(() => l.lastCommand, (e) => {
			let t = p.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : l.position + e.value, r = t.duration && t.duration > 0 ? t.duration : l.duration, i = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = i, l.updateProgress(i, t.duration || void 0);
		}), v(() => {
			m.value?.destroy(), m.value = null, p.value?.pause?.();
		}), (e, t) => (b(), i(n, { name: "mini" }, {
			default: N(() => [E.value ? (b(), o("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": D(d)("player.miniPlayer")
			}, [
				s("video", {
					ref_key: "videoRef",
					ref: p,
					class: "mini__video",
					src: D(l).hlsMasterUrl ? "" : D(l).streamUrl,
					poster: D(l).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: A,
					onPlay: j,
					onPause: P,
					onTimeupdate: F,
					onClick: L
				}, null, 40, ld),
				s("div", ud, [s("p", dd, T(O.value), 1), s("div", fd, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": D(l).playing ? D(d)("player.pause") : D(d)("player.play"),
						onClick: I
					}, [u(J, { name: D(l).playing ? "pause" : "play" }, null, 8, ["name"])], 8, pd),
					D(l).current ? (b(), o("button", {
						key: 0,
						type: "button",
						class: g(["mini__btn mini__btn--favorite", { "is-on": C.value }]),
						"aria-label": C.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": C.value ? "true" : "false",
						onClick: w
					}, [u(J, { name: C.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, md)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": D(d)("player.expand"),
						onClick: L
					}, [u(J, { name: "expand" })], 8, hd),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": D(d)("player.closePlayer"),
						onClick: R
					}, [u(J, { name: "x" })], 8, gd)
				])]),
				s("div", _d, [s("div", {
					class: "mini__progress-fill",
					style: _({ transform: `scaleX(${k.value})` })
				}, null, 4)])
			], 8, cd)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
export { fs as AMBIENT_SAMPLE_H, ps as AMBIENT_SAMPLE_INTERVAL_MS, ds as AMBIENT_SAMPLE_W, Da as ARROW_ICONS, Oa as ARROW_LABELS, xs as AmbientCanvas, Mo as CAPTION_BACKGROUND_OPTIONS, jo as CAPTION_COLOR_OPTIONS, No as CAPTION_EDGE_OPTIONS, Ao as CAPTION_SIZE_OPTIONS, ko as CAPTION_SIZE_SCALE, Lo as CaptionOverlay, us as CaptionsMenu, Ds as DIRECT_PLAY_EXTENSIONS, vd as MiniPlayer, Ea as PLAYER_SHORTCUTS, sd as Player, fo as QualityMenu, ne as RESUME_MAX_RATIO, te as RESUME_MIN_SECONDS, Es as ResumePrompt, Ui as Scrubber, Va as ShortcutsHelp, fc as SkipButton, eo as SpeedMenu, Os as TRANSCODE_EXTENSIONS, ac as TranscodeNotice, dc as TranscodePreparing, Ps as UPNEXT_COUNTDOWN_SECONDS, Is as UPNEXT_RING_CIRCUMFERENCE, Fs as UPNEXT_RING_RADIUS, ec as UpNext, Ga as VolumeControl, Co as activeAudioIndex, ys as ambientGradient, So as applyAudioTrack, xo as applyTrackModes, Qi as attachHls, hs as averageRegion, Io as captionStyleVars, Do as cleanCueText, Fo as edgeShadow, As as extensionOf, Ni as formatTime, ja as handleShortcut, bo as hasActiveCaptions, bs as isBatterySaving, ua as isFailedStatus, Ms as isFatalMediaError, Ji as isNativeHlsSupported, la as isPlayable, Aa as isTypingTarget, vo as listAudioTracks, _o as listSubtitleTracks, js as needsTranscode, ra as parseSubtitleTracks, sa as parseTranscodeStart, ca as parseTranscodeStatus, Oo as readActiveCueLines, da as resolveStreamUrl, yo as resolveTextTrack, _s as rgbString, vs as rgbaString, Ls as ringDashoffset, gs as sampleAmbient, aa as transcodeStartPath, oa as transcodeStatusPath, fa as useHlsTranscode, Ma as useKeyboardShortcuts, ce as usePlayerStore };

//# sourceMappingURL=player.js.map