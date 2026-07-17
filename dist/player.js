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
var ee = F("phlix-prefs", () => {
	let e = B(), t = b(e.theme), n = b(e.accent), i = b(e.density), a = b(e.cardSize), o = b(e.gridDensity), s = b(e.reducedMotion), c = b(e.autoplay), l = b(e.defaultVolume), u = b(e.defaultQuality), d = b(e.defaultSubtitleLang), f = b(e.defaultAudioLang), p = b(e.subtitlePreferenceSet), m = b({
		...I,
		...e.captionStyle
	}), h = b(e.atmosphere), g = b(e.tv), _ = b(e.filterPresets ? [...e.filterPresets] : []), v = b(e.showMarkerTimeline), y = b(e.crossfadeDuration), x = b(e.crossfadeFadeIn), S = b(e.crossfadeFadeOut), C = b(e.gaplessEnabled), w = b(e.preferredAudioQuality), T = b(V()), E = null;
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
}), H = 30, te = .95, ne = 5e3, re = "phlix.resume", ie = "phlix.resume.touched";
function ae() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(re);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
function oe() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(ie), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var se = F("phlix-player", () => {
	let e = ee(), t = b(null), n = b(""), i = b([]), a = b(!1), o = b(0), s = b(0), c = b(0), l = b(e.defaultVolume), u = b(!1), d = b(1), f = b(e.defaultQuality), p = b(e.defaultSubtitleLang), m = b(""), h = b(!1), g = b(ae()), _ = b(oe()), v = b(null), y = 0, x = r(() => s.value > 0 ? o.value / s.value : 0), S = r(() => i.value[0] ?? null);
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
				localStorage.setItem(re, JSON.stringify(g.value)), localStorage.setItem(ie, JSON.stringify(_.value));
			};
			try {
				e();
			} catch {
				try {
					w(Math.floor(Object.keys(g.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - E;
		clearTimeout(T), e || n >= ne ? t() : T = setTimeout(t, ne - n);
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
	function se(e) {
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
		setRate: H,
		setQuality: te,
		setSubtitle: se,
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
}), ce = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, U = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, le = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function ue(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function de() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region src/api/tokenStore.ts
var W = "access_token", fe = "refresh_token", pe = "user", me = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(W);
	}
	setAccessToken(e) {
		this.storage.setItem(W, e);
	}
	getRefreshToken() {
		return this.storage.getItem(fe);
	}
	setRefreshToken(e) {
		this.storage.setItem(fe, e);
	}
	getUser() {
		let e = this.storage.getItem(pe);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(pe, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(W), this.storage.removeItem(fe), this.storage.removeItem(pe);
	}
};
//#endregion
//#region src/api/client.ts
function he() {
	return typeof window > "u" ? {
		getAccessToken: () => null,
		setAccessToken: () => {},
		getRefreshToken: () => null,
		setRefreshToken: () => {},
		getUser: () => null,
		setUser: () => {},
		clear: () => {}
	} : new me();
}
var ge = 15e3, _e = {};
function ve(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) r && (t[n] = r);
	return t;
}
function ye(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
function G(e) {
	return typeof e == "string" ? e : typeof e == "number" && !Number.isNaN(e) ? String(e) : null;
}
function be(e) {
	return typeof e == "number" && !Number.isNaN(e) ? e : typeof e == "string" && e.trim() !== "" && !Number.isNaN(Number(e)) ? Number(e) : null;
}
function xe(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? "Unknown Artist", r = be(t.album_count);
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
		durationSecs: be(n.duration_secs) ?? be(t.duration_secs) ?? 0,
		trackNumber: be(n.track_number) ?? be(t.track_number),
		streamUrl: G(t.stream_url)
	};
}
function Ce(e) {
	let t = e && typeof e == "object" ? e : {}, n = G(t.name) ?? G(t.title) ?? "Unknown Album", r = Array.isArray(t.tracks) ? t.tracks : [];
	return {
		id: n,
		title: n,
		albumArtUrl: G(t.album_art_url),
		year: be(t.year),
		totalTracks: be(t.track_count) ?? r.length,
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
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? he(), this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? ge, this.instanceHeaders = ve(e.headers ?? {}), this.loginPath = e.loginPath ?? "/login";
	}
	setBaseUrl(e) {
		this.baseUrl = e;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = {
				..._e,
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
			throw s ? new le() : r?.aborted || e instanceof ce ? e : e instanceof TypeError || de() ? new U() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		if (e.status === 204 || e.status === 205) return;
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new ce(this.extractError(t), e.status, t);
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
			..._e,
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
			..._e,
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
			is_admin: ye(e.is_admin)
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
var Te = F("phlix-toast", () => {
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
}), Ee = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), De = F("user-item-data", () => {
	let e = b(/* @__PURE__ */ new Map()), t = null;
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
			Te().error(`Failed to ${n} favorites: ${ue(t)}`);
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
			Te().error(`Failed to mark ${n}: ${ue(t)}`);
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
			c(e, { like_level: o }), Te().error(`Failed to set rating: ${ue(t)}`);
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
	return y(), o("svg", Oe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var Ae = f({
	name: "lucide-play",
	render: ke
}), je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Me(e, t) {
	return y(), o("svg", je, [...t[0] ||= [s("g", {
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
var Ne = f({
	name: "lucide-pause",
	render: Me
}), Pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fe(e, t) {
	return y(), o("svg", Pe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var Ie = f({
	name: "lucide-skip-back",
	render: Fe
}), Le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Re(e, t) {
	return y(), o("svg", Le, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var ze = f({
	name: "lucide-skip-forward",
	render: Re
}), Be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ve(e, t) {
	return y(), o("svg", Be, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), s("path", { d: "M3 3v5h5" })], -1)]]);
}
var He = f({
	name: "lucide-rotate-ccw",
	render: Ve
}), Ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function We(e, t) {
	return y(), o("svg", Ue, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), s("path", { d: "M21 3v5h-5" })], -1)]]);
}
var Ge = f({
	name: "lucide-rotate-cw",
	render: We
}), Ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qe(e, t) {
	return y(), o("svg", Ke, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Je = f({
	name: "lucide-volume-2",
	render: qe
}), Ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xe(e, t) {
	return y(), o("svg", Ye, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var Ze = f({
	name: "lucide-volume-1",
	render: Xe
}), Qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $e(e, t) {
	return y(), o("svg", Qe, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var et = f({
	name: "lucide-volume-x",
	render: $e
}), tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nt(e, t) {
	return y(), o("svg", tt, [...t[0] ||= [s("g", {
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
var rt = f({
	name: "lucide-captions",
	render: nt
}), it = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function at(e, t) {
	return y(), o("svg", it, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var ot = f({
	name: "lucide-captions-off",
	render: at
}), st = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ct(e, t) {
	return y(), o("svg", st, [...t[0] ||= [s("g", {
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
var lt = f({
	name: "lucide-picture-in-picture-2",
	render: ct
}), ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dt(e, t) {
	return y(), o("svg", ut, [...t[0] ||= [s("rect", {
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
var ft = f({
	name: "lucide-rectangle-horizontal",
	render: dt
}), pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mt(e, t) {
	return y(), o("svg", pt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var ht = f({
	name: "lucide-maximize",
	render: mt
}), gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _t(e, t) {
	return y(), o("svg", gt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var vt = f({
	name: "lucide-minimize",
	render: _t
}), yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bt(e, t) {
	return y(), o("svg", yt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var xt = f({
	name: "lucide-maximize-2",
	render: bt
}), St = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ct(e, t) {
	return y(), o("svg", St, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var wt = f({
	name: "lucide-cast",
	render: Ct
}), Tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Et(e, t) {
	return y(), o("svg", Tt, [...t[0] ||= [s("g", {
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
var Dt = f({
	name: "lucide-settings",
	render: Et
}), Ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kt(e, t) {
	return y(), o("svg", Ot, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var At = f({
	name: "lucide-gauge",
	render: kt
}), jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mt(e, t) {
	return y(), o("svg", jt, [...t[0] ||= [s("g", {
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
var Nt = f({
	name: "lucide-film",
	render: Mt
}), Pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ft(e, t) {
	return y(), o("svg", Pt, [...t[0] ||= [s("g", {
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
var It = f({
	name: "lucide-image",
	render: Ft
}), Lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rt(e, t) {
	return y(), o("svg", Lt, [...t[0] ||= [s("g", {
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
var zt = f({
	name: "lucide-music",
	render: Rt
}), Bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vt(e, t) {
	return y(), o("svg", Bt, [...t[0] ||= [s("g", {
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
var Ht = f({
	name: "lucide-tv",
	render: Vt
}), K = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ut(e, t) {
	return y(), o("svg", K, [...t[0] ||= [s("g", {
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
var Wt = f({
	name: "lucide-search",
	render: Ut
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return y(), o("svg", Gt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var qt = f({
	name: "lucide-sliders-horizontal",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return y(), o("svg", Jt, [...t[0] ||= [s("g", {
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
var Xt = f({
	name: "lucide-calendar",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qt(e, t) {
	return y(), o("svg", Zt, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var $t = f({
	name: "lucide-arrow-up-down",
	render: Qt
}), en = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tn(e, t) {
	return y(), o("svg", en, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var nn = f({
	name: "lucide-star",
	render: tn
}), rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function an(e, t) {
	return y(), o("svg", rn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var on = f({
	name: "lucide-list",
	render: an
}), sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cn(e, t) {
	return y(), o("svg", sn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var ln = f({
	name: "lucide-plus",
	render: cn
}), un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dn(e, t) {
	return y(), o("svg", un, [...t[0] ||= [s("g", {
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
var fn = f({
	name: "lucide-info",
	render: dn
}), pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mn(e, t) {
	return y(), o("svg", pn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var hn = f({
	name: "lucide-x",
	render: mn
}), gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _n(e, t) {
	return y(), o("svg", gn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var vn = f({
	name: "lucide-check",
	render: _n
}), yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bn(e, t) {
	return y(), o("svg", yn, [...t[0] ||= [s("g", {
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
var xn = f({
	name: "lucide-lock",
	render: bn
}), Sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cn(e, t) {
	return y(), o("svg", Sn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var wn = f({
	name: "lucide-bookmark",
	render: Cn
}), Tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function En(e, t) {
	return y(), o("svg", Tn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Dn = f({
	name: "lucide-bookmark-plus",
	render: En
}), On = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kn(e, t) {
	return y(), o("svg", On, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var An = f({
	name: "lucide-heart",
	render: kn
}), jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mn(e, t) {
	return y(), o("svg", jn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var Nn = f({
	name: "lucide-thumbs-up",
	render: Mn
}), Pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fn(e, t) {
	return y(), o("svg", Pn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var In = f({
	name: "lucide-thumbs-down",
	render: Fn
}), Ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rn(e, t) {
	return y(), o("svg", Ln, [...t[0] ||= [s("g", {
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
var zn = f({
	name: "lucide-user",
	render: Rn
}), Bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vn(e, t) {
	return y(), o("svg", Bn, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Hn = f({
	name: "lucide-log-out",
	render: Vn
}), Un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wn(e, t) {
	return y(), o("svg", Un, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Gn = f({
	name: "lucide-menu",
	render: Wn
}), Kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qn(e, t) {
	return y(), o("svg", Kn, [...t[0] ||= [s("g", {
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
var Jn = f({
	name: "lucide-more-horizontal",
	render: qn
}), Yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xn(e, t) {
	return y(), o("svg", Yn, [...t[0] ||= [s("g", {
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
var Zn = f({
	name: "lucide-eye",
	render: Xn
}), Qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $n(e, t) {
	return y(), o("svg", Qn, [...t[0] ||= [s("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [s("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), s("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var er = f({
	name: "lucide-eye-off",
	render: $n
}), tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nr(e, t) {
	return y(), o("svg", tr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var rr = f({
	name: "lucide-arrow-left",
	render: nr
}), ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ar(e, t) {
	return y(), o("svg", ir, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var or = f({
	name: "lucide-arrow-right",
	render: ar
}), sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cr(e, t) {
	return y(), o("svg", sr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var lr = f({
	name: "lucide-arrow-up",
	render: cr
}), ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dr(e, t) {
	return y(), o("svg", ur, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var fr = f({
	name: "lucide-arrow-down",
	render: dr
}), pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mr(e, t) {
	return y(), o("svg", pr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var hr = f({
	name: "lucide-chevron-down",
	render: mr
}), gr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _r(e, t) {
	return y(), o("svg", gr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var vr = f({
	name: "lucide-chevron-up",
	render: _r
}), yr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function br(e, t) {
	return y(), o("svg", yr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var xr = f({
	name: "lucide-chevron-left",
	render: br
}), Sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cr(e, t) {
	return y(), o("svg", Sr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var wr = f({
	name: "lucide-chevron-right",
	render: Cr
}), Tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Er(e, t) {
	return y(), o("svg", Tr, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Dr = f({
	name: "lucide-loader-circle",
	render: Er
}), Or = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kr(e, t) {
	return y(), o("svg", Or, [...t[0] ||= [s("g", {
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
var Ar = f({
	name: "lucide-circle-alert",
	render: kr
}), jr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mr(e, t) {
	return y(), o("svg", jr, [...t[0] ||= [s("g", {
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
var Nr = f({
	name: "lucide-circle-check",
	render: Mr
}), Pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fr(e, t) {
	return y(), o("svg", Pr, [...t[0] ||= [s("g", {
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
var Ir = f({
	name: "lucide-circle-x",
	render: Fr
}), Lr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rr(e, t) {
	return y(), o("svg", Lr, [...t[0] ||= [s("g", {
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
var zr = f({
	name: "lucide-sun",
	render: Rr
}), Br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vr(e, t) {
	return y(), o("svg", Br, [...t[0] ||= [s("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Hr = f({
	name: "lucide-moon",
	render: Vr
}), Ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wr(e, t) {
	return y(), o("svg", Ur, [...t[0] ||= [s("g", {
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
var Gr = f({
	name: "lucide-monitor",
	render: Wr
}), q = /* @__PURE__ */ u({
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
			captions: rt,
			"captions-off": ot,
			pip: lt,
			theater: ft,
			fullscreen: ht,
			"fullscreen-exit": vt,
			expand: xt,
			cast: wt,
			settings: Dt,
			speed: At,
			film: Nt,
			image: It,
			music: zt,
			tv: Ht,
			search: Wt,
			filter: qt,
			calendar: Xt,
			sort: $t,
			star: nn,
			list: on,
			plus: ln,
			info: fn,
			x: hn,
			check: vn,
			lock: xn,
			bookmark: wn,
			"bookmark-plus": Dn,
			heart: An,
			"thumbs-up": Nn,
			"thumbs-down": In,
			user: zn,
			"log-out": Hn,
			menu: Gn,
			more: Jn,
			eye: Zn,
			"eye-off": er,
			"arrow-left": rr,
			"arrow-right": or,
			"arrow-up": lr,
			"arrow-down": fr,
			"chevron-down": hr,
			"chevron-up": vr,
			"chevron-left": xr,
			"chevron-right": wr,
			spinner: Dr,
			alert: Ar,
			success: Nr,
			error: Ir,
			sun: zr,
			moon: Hr,
			monitor: Gr
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
}), Kr = ["data-level"], qr = ["disabled", "aria-pressed"], Jr = ["disabled", "aria-pressed"], Yr = /*@__PURE__*/ u({
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
		}, [l(q, {
			name: "thumbs-up",
			class: "thumb-rating__icon"
		})], 10, qr)) : a("", !0), u.value ? (y(), o("button", {
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
		}, [l(q, {
			name: "thumbs-down",
			class: "thumb-rating__icon"
		})], 10, Jr)) : a("", !0)], 8, Kr));
	}
}), J = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Xr = /*#__PURE__*/ J(Yr, [["__scopeId", "data-v-554f8af9"]]);
//#endregion
//#region src/components/player/format-time.ts
function Zr(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/i18n/messages.ts
var Qr = {
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
}, $r = /\{(\w+)\}/g;
function ei(e) {
	let t = {};
	for (let n of Object.keys(Qr)) {
		let r = Qr[n], i = e?.[n];
		t[n] = i && typeof i == "object" ? {
			...r,
			...i
		} : { ...r };
	}
	return t;
}
function ti(e, t) {
	return t ? e.replace($r, (e, n) => {
		let r = t[n];
		return r == null ? e : String(r);
	}) : e;
}
function ni(e) {
	let t = ei(e);
	return (e, n) => {
		let r = e.indexOf("."), i = r === -1 ? "" : e.slice(0, r), a = r === -1 ? "" : e.slice(r + 1), o = t[i], s = o ? o[a] : void 0;
		return typeof s == "string" ? ti(s, n) : e;
	};
}
//#endregion
//#region src/composables/useMessages.ts
function Y() {
	return { t: ni(d("phlixConfig", null)?.messages) };
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ri = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-label"
], ii = { class: "scrubber__track" }, ai = ["title"], oi = { class: "scrubber__time numeric" }, si = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let { t: c } = Y(), l = t, u = i, d = b(null), f = b(!1), p = b(!1), m = b(0), _ = b(0), v = (e) => Math.min(1, Math.max(0, e)), S = r(() => f.value ? m.value : l.duration > 0 ? v(l.position / l.duration) : 0), C = r(() => l.duration > 0 ? v(l.buffered / l.duration) : 0), T = r(() => (f.value || p.value) && l.duration > 0), D = r(() => f.value ? m.value : _.value), O = r(() => D.value * l.duration), k = r(() => T.value ? l.thumbnailAt?.(O.value) ?? null : null), A = r(() => k.value ? `url("${k.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), j = r(() => `${Math.min(96, Math.max(4, D.value * 100))}%`), M = r(() => l.duration > 0 ? l.chapters.filter((e) => e.start > 0 && e.start < l.duration).map((e) => ({
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
			"aria-valuetext": E(Zr)(t.position),
			"aria-label": E(c)("player.seek"),
			onPointerdown: P,
			onPointermove: F,
			onPointerup: I,
			onPointercancel: I,
			onPointerenter: L,
			onPointerleave: R,
			onKeydown: z
		}, [s("div", ii, [
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
			}, null, 12, ai))), 128)),
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
		}, null, 4)) : a("", !0), s("span", oi, w(E(Zr)(O.value)), 1)], 4)) : a("", !0)], 40, ri));
	}
}), [["__scopeId", "data-v-3d610715"]]), ci = "phlix-bandwidth-estimate";
function li(e) {
	return Math.min(1e8, Math.max(1e5, e));
}
function ui() {
	try {
		let e = localStorage.getItem(ci);
		if (!e) return 0;
		let t = Number(e);
		return Number.isFinite(t) ? li(t) : 0;
	} catch {
		return 0;
	}
}
function di(e) {
	try {
		localStorage.setItem(ci, String(e));
	} catch {}
}
function fi(e) {
	let t = e.canPlayType("application/vnd.apple.mpegurl");
	return t === "probably" || t === "maybe";
}
var pi = null, mi = null;
function hi() {
	pi && di(pi.bandwidthEstimate);
}
async function gi(e, t, n = {}) {
	if (typeof MediaSource > "u" && fi(e)) {
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
		let i = ui(), a = new r({
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
		}), pi = a, mi !== null && clearInterval(mi), mi = setInterval(hi, 3e4), a.loadSource(t), a.attachMedia(e), {
			destroy() {
				di(a.bandwidthEstimate), mi !== null && (clearInterval(mi), mi = null), pi = null;
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
var _i = /* @__PURE__ */ new Set([
	"failed",
	"cancelled",
	"not_found",
	"error"
]);
function vi(e, t = "") {
	return typeof e == "string" ? e : t;
}
function yi(e) {
	return e === !0 || e === "true" || e === 1;
}
function bi(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : 0;
}
function xi(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = vi(e.url ?? e.src);
		r !== "" && t.push({
			index: bi(e.index),
			language: vi(e.language ?? e.lang ?? e.srclang),
			label: vi(e.label),
			default: yi(e.default ?? e.isDefault),
			url: r
		});
	}
	return t;
}
function Si(e) {
	if (e == null) return null;
	if (!Array.isArray(e) && typeof e == "object") {
		let t = e;
		Array.isArray(t.renditions) && (e = t.renditions);
	}
	if (!Array.isArray(e)) return null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let e = n, r = bi(e.height);
		r <= 0 || t.push({
			id: vi(e.id),
			label: vi(e.label),
			height: r,
			width: bi(e.width),
			bitrate: bi(e.bitrate)
		});
	}
	return t.length > 0 ? t : null;
}
function Ci(e, t) {
	let n = `/api/v1/media/${encodeURIComponent(e)}/transcode`;
	return t ? `${n}?profile=${encodeURIComponent(t)}` : n;
}
function wi(e) {
	return `/api/v1/transcode/${encodeURIComponent(e)}/status`;
}
function Ti(e) {
	let t = e ?? {};
	return {
		jobId: vi(t.job_id ?? t.jobId),
		masterUrl: vi(t.master_url ?? t.masterUrl ?? t.hls_url ?? t.hlsUrl),
		status: vi(t.status, "running"),
		reused: yi(t.reused),
		subtitles: xi(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Si(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Ei(e) {
	let t = e ?? {};
	return {
		jobId: vi(t.job_id ?? t.jobId),
		status: vi(t.status, "running"),
		playlistReady: yi(t.playlist_ready ?? t.playlistReady),
		progress: bi(t.progress),
		masterUrl: vi(t.master_url ?? t.masterUrl),
		subtitles: xi(t.subtitles ?? t.subtitle_tracks ?? t.subtitleTracks),
		variants: Si(t.variants ?? t.variants_list ?? t.Variants)
	};
}
function Di(e) {
	return e.playlistReady || e.status === "completed";
}
function Oi(e) {
	return _i.has(e);
}
function ki(e, t) {
	return /^https?:\/\//i.test(t) ? t : `${e.replace(/\/+$/, "")}${t.startsWith("/") ? t : `/${t}`}`;
}
//#endregion
//#region src/composables/useHlsTranscode.ts
function Ai(e) {
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
			url: ki(n, e.url)
		}));
	}
	let y = e.attach ?? gi, x = e.pollIntervalMs ?? 1e3, S = e.maxWaitMs ?? 12e4, C = e.sleep ?? ((e) => new Promise((t) => setTimeout(t, e))), w = Math.max(1, Math.ceil(S / Math.max(1, x))), T = ji(), E = e.getToken ?? (() => Mi(T)), D = null, O = null, k = null, A = !1, j = null;
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
			let r = M(), c = Ti(await r.post(Ci(a, o), void 0, j.signal));
			if (A) return;
			if (!c.jobId || !c.masterUrl) throw Error("transcode start returned no job");
			v(c.subtitles), _(c.variants), d.value = c.jobId, f.value = ki(e.apiBase(), c.masterUrl);
			let l = c.status === "completed";
			for (let e = 0; !l && e < w; e++) {
				let e = Ei(await r.get(wi(c.jobId), void 0, j.signal));
				if (A) return;
				if (n.value = e.progress, v(e.subtitles), _(e.variants), Oi(e.status)) throw Error(`transcode ${e.status}`);
				if (Di(e)) {
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
				let e = se();
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
function ji() {
	try {
		return new me();
	} catch {
		return null;
	}
}
function Mi(e) {
	try {
		return e?.getAccessToken() ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/composables/useTrickplay.ts
var Ni = 10, Pi = 6;
function Fi(e) {
	let t = b(null), n = b(!1), r = b(null), i = /* @__PURE__ */ new Map();
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
		let i = r.frame, a = i % Ni, s = Math.floor(i / Ni), c = a / (Ni - 1) * 100, l = s / (Pi - 1) * 100;
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
var Ii = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Li = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		}, [l(q, {
			name: e.loading ? "spinner" : e.name,
			class: h({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, Ii));
	}
}), [["__scopeId", "data-v-48bb9819"]]), Ri = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), zi = 0, Bi = "";
function Vi() {
	zi === 0 && (Bi = document.body.style.overflow, document.body.style.overflow = "hidden"), zi++;
}
function Hi() {
	zi !== 0 && (zi--, zi === 0 && (document.body.style.overflow = Bi));
}
function Ui(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(Ri)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		i = document.activeElement, e.value?.setAttribute("data-focus-trap", ""), r && (Vi(), a = !0), document.addEventListener("keydown", s, !0), m(() => {
			e.value?.setAttribute("data-focus-trap", ""), (o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (Hi(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	j(t, (e) => e ? c() : l(), { immediate: !0 }), _(() => {
		e.value?.removeAttribute("data-focus-trap"), document.removeEventListener("keydown", s, !0), a &&= (Hi(), !1);
	});
}
//#endregion
//#region src/components/player/shortcuts.ts
var Wi = [
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
], Gi = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Ki = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function qi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Ji(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Yi(e, t) {
	switch (e.key) {
		case " ": return qi(e.target) ? !1 : (t.playPause(), !0);
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
function Xi(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Ji(n.target) || Yi(n, e) && n.preventDefault();
	}
	v(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), _(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Zi = ["aria-label"], Qi = { class: "shortcuts__head" }, $i = { class: "shortcuts__title" }, ea = { class: "shortcuts__grid" }, ta = { class: "shortcuts__keys" }, na = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, ra = {
	key: 1,
	class: "shortcuts__key"
}, ia = { class: "shortcuts__label" }, aa = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Wi }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, u = n, { t: d } = Y(), f = b(null);
		return Ui(f, T(r, "open"), {
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
		}, [s("div", Qi, [s("h3", $i, w(E(d)("player.keyboard")), 1), l(Li, {
			name: "x",
			label: E(d)("common.close"),
			size: "sm",
			onClick: r[0] ||= (e) => u("close")
		}, null, 8, ["label"])]), s("ul", ea, [(y(!0), o(e, null, x(t.shortcuts, (t) => (y(), o("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [s("span", ta, [(y(!0), o(e, null, x(t.keys, (t, n) => (y(), o(e, { key: n }, [t === "–" ? (y(), o("span", na, "–")) : (y(), o("kbd", ra, [E(Gi)[t] ? (y(), i(q, {
			key: 0,
			name: E(Gi)[t],
			label: E(Ki)[t] ?? t
		}, null, 8, ["name", "label"])) : (y(), o(e, { key: 1 }, [c(w(t), 1)], 64))]))], 64))), 128))]), s("span", ia, w(t.label), 1)]))), 128))])], 8, Zi)])) : a("", !0);
	}
}), [["__scopeId", "data-v-e41dfaaa"]]), oa = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], sa = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		}, null, 4)], 544)], 42, oa));
	}
}), [["__scopeId", "data-v-644a7ce9"]]), ca = { class: "volume" }, la = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "VolumeControl",
	setup(e) {
		let t = se(), n = ee(), { t: i } = Y(), a = r(() => t.muted ? 0 : t.volume), s = r(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function c(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return j(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (y(), o("div", ca, [l(Li, {
			name: s.value,
			label: E(t).muted ? E(i)("player.unmute") : E(i)("player.mute"),
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => E(t).toggleMute()
		}, null, 8, ["name", "label"]), l(sa, {
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
function ua(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function da(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function fa(e, t) {
	return t === "first" ? da(e, -1, 1) : da(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var pa = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], ma = ["id", "aria-label"], ha = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], ga = { class: "phlix-select__check" }, _a = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let d = t, { t: f } = Y(), p = u, g = r(() => ua(d.options)), v = D(), S = b(!1), C = b(-1), T = b(null), k = b(null);
		function M() {
			S.value ? H() : ee();
		}
		n({ toggleMenu: M });
		let P = "", F, I = O(t, "open"), L = r(() => g.value.findIndex((e) => e.value === d.modelValue));
		j(I, (e) => {
			e && !S.value ? ee() : !e && S.value && H();
		}, { immediate: !0 });
		let R = r(() => g.value[L.value]?.label ?? ""), z = r(() => C.value >= 0 ? `${v}-opt-${C.value}` : void 0), B = b(!1);
		function V() {
			let e = T.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			B.value = n < 284 && r > n;
		}
		function ee() {
			d.disabled || S.value || (V(), S.value = !0, C.value = L.value >= 0 ? L.value : fa(g.value, "first"), m(re));
		}
		function H() {
			S.value = !1;
		}
		function te(e) {
			let t = g.value[e];
			!t || t.disabled || (t.value !== d.modelValue && (p("update:modelValue", t.value), p("change", t.value)), H(), T.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function ne(e) {
			C.value = da(g.value, C.value, e), m(re);
		}
		function re() {
			(k.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function ie(e) {
			if (!d.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), S.value ? ne(1) : ee();
					break;
				case "ArrowUp":
					e.preventDefault(), S.value ? ne(-1) : ee();
					break;
				case "Home":
					S.value && (e.preventDefault(), C.value = fa(g.value, "first"), m(re));
					break;
				case "End":
					S.value && (e.preventDefault(), C.value = fa(g.value, "last"), m(re));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), S.value && C.value >= 0 ? te(C.value) : ee();
					break;
				case "Escape":
					S.value && (e.preventDefault(), H());
					break;
				case "Tab":
					H();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && ae(e.key);
			}
		}
		function ae(e) {
			S.value || ee(), P += e.toLowerCase(), clearTimeout(F), F = setTimeout(() => P = "", 600);
			let t = g.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(P));
			t >= 0 && (C.value = t, m(re));
		}
		function oe(e) {
			S.value && T.value && !T.value.contains(e.target) && H();
		}
		return j(S, (e) => {
			e ? document.addEventListener("pointerdown", oe, !0) : document.removeEventListener("pointerdown", oe, !0);
		}), _(() => {
			document.removeEventListener("pointerdown", oe, !0), clearTimeout(F);
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
			onClick: r[0] ||= (e) => S.value ? H() : ee(),
			onKeydown: ie
		}, [s("span", { class: h(["phlix-select__value", { "is-placeholder": L.value < 0 }]) }, w(L.value >= 0 ? R.value : t.placeholder ?? E(f)("common.selectPlaceholder")), 3), l(q, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, pa), N(s("ul", {
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
			onClick: (e) => te(n),
			onPointermove: (t) => !e.disabled && (C.value = n)
		}, [s("span", ga, [e.value === t.modelValue ? (y(), i(q, {
			key: 0,
			name: "check"
		})) : a("", !0)]), c(" " + w(e.label), 1)], 42, ha))), 128))], 10, ma), [[A, S.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]), va = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		], n = se(), { t: a } = Y(), o = r(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function s(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (y(), i(_a, {
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
}), [["__scopeId", "data-v-4530b308"]]), ya = "auto", ba = "original";
function xa(e) {
	return e >= 2160 ? "2160p" : e >= 1440 ? "1440p" : e >= 1080 ? "1080p" : e >= 720 ? "720p" : e >= 480 ? "480p" : e >= 360 ? "360p" : "240p";
}
function Sa(e) {
	return e >= 2160 ? "4K" : xa(e);
}
function Ca(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of [...e].sort((e, t) => t.height - e.height)) {
		let e = xa(r.height);
		t.has(e) || (t.add(e), n.push({
			value: e,
			label: Sa(r.height)
		}));
	}
	return n;
}
function wa(e, t) {
	if (t === "auto") return -1;
	let n = -1, r = -1;
	for (let i of e) xa(i.height) === t && i.bitrate > r && (n = i.index, r = i.bitrate);
	return n;
}
function Ta(e, t) {
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
function Ea(e, t) {
	if (t < 0) return ya;
	let n = e.find((e) => e.index === t);
	return n ? xa(n.height) : ya;
}
//#endregion
//#region src/components/player/QualityMenu.vue
var Da = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let u = n, d = se(), f = ee(), { t: p } = Y(), m = r(() => Ca(o.levels)), h = r(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			if (!o.variants) return [];
			let n = m.value.length >= 2;
			for (let r of [...o.variants].sort((e, t) => t.height - e.height)) {
				let i = xa(r.height);
				e.has(i) || n && wa(o.levels, i) < 0 || (e.add(i), t.push({
					value: i,
					label: Sa(r.height)
				}));
			}
			return t;
		}), g = r(() => m.value.length >= 2 ? m.value : h.value), _ = r(() => o.variants?.find((e) => e.id === "original" && e.height > 0) ?? null), v = r(() => Ta(o.levels, _.value)), x = r(() => _.value && v.value >= 0 ? {
			value: ba,
			label: p("player.qualityOriginal", { height: _.value.height })
		} : null), S = r(() => g.value.length >= 2), C = r(() => o.activeHeight == null ? p("player.qualityAuto") : p("player.qualityAutoActive", { label: Sa(o.activeHeight) })), w = r(() => [
			{
				value: ya,
				label: C.value
			},
			...x.value ? [x.value] : [],
			...g.value
		]), T = r(() => o.autoEnabled ? ya : x.value && o.currentLevel === v.value && (d.quality === "original" || f.defaultQuality === "original") ? ba : Ea(o.levels, o.currentLevel));
		function D(e) {
			let t = String(e);
			if (t === "auto") {
				d.setQuality(t), f.defaultQuality = t, u("select", "auto");
				return;
			}
			let n = t === "original" ? v.value : wa(o.levels, t);
			d.setQuality(t), f.defaultQuality = t, n >= 0 ? u("select", n) : u("select", t);
		}
		return t({ toggleMenu: l }), (e, t) => S.value || s.value ? (y(), i(_a, {
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
function Oa(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function ka(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Aa(e, t) {
	return e.language || e.label || `track-${t}`;
}
function ja(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Ma(e) {
	return e ? Oa(e.textTracks).filter(ka).map((e, t) => ({
		index: t,
		language: Aa(e, t),
		label: e.label || ja(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function Na(e) {
	let t = e?.audioTracks;
	return Oa(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || ja(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function Pa(e, t) {
	return !e || t == null ? null : Oa(e.textTracks).filter(ka).find((e, n) => Aa(e, n) === t) ?? null;
}
function Fa(e, t) {
	return Pa(e, t) != null;
}
function Ia(e, t) {
	e && Oa(e.textTracks).filter(ka).forEach((e, n) => {
		try {
			e.mode = Aa(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function La(e, t) {
	let n = e?.audioTracks;
	Oa(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Ra(e) {
	let t = e?.audioTracks;
	return Oa(t).findIndex((e) => e.enabled);
}
var za = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function Ba(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Va(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && Ba(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(za, n) ? za[n] : e;
	});
}
function Ha(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Va(e).trim()).filter((e) => e.length > 0) : [];
}
function Ua(e) {
	if (!e) return [];
	let t = Oa(e.activeCues), n = [];
	for (let e of t) n.push(...Ha(e.text));
	return n;
}
var Wa = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Ga = [
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
], Ka = [
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
], qa = [
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
], Ja = [
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
function Ya(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function Xa(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Za(e) {
	return {
		"--cap-scale": String(Wa[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": Ya(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": Xa(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var Qa = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(t, { expose: n }) {
		let i = t, s = b([]), c = r(() => Za(i.styleConfig)), l = null, u = null;
		function d() {
			s.value = Ua(l);
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
			f(), Ia(i.video, i.language);
			let e = Pa(i.video, i.language);
			if (e) {
				if (l = e, e.addEventListener("cuechange", d), s.value = Ua(e), !s.value.length) {
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
}), [["__scopeId", "data-v-4bd46046"]]), $a = ["aria-label", "aria-expanded"], eo = ["aria-label"], to = { class: "capmenu__head" }, no = { class: "capmenu__title" }, ro = ["aria-label"], io = ["aria-checked", "tabindex"], ao = { class: "capmenu__check" }, oo = { class: "capmenu__optlabel" }, so = [
	"aria-checked",
	"tabindex",
	"onClick"
], co = { class: "capmenu__check" }, lo = { class: "capmenu__optlabel" }, uo = { class: "capmenu__title capmenu__title--sub" }, fo = ["aria-label"], po = [
	"aria-checked",
	"tabindex",
	"onClick"
], mo = { class: "capmenu__check" }, ho = { class: "capmenu__optlabel" }, go = { class: "capmenu__title capmenu__title--sub" }, _o = { class: "capmenu__style" }, vo = { class: "capmenu__field" }, yo = { class: "capmenu__fieldlabel" }, bo = { class: "capmenu__field" }, xo = { class: "capmenu__fieldlabel" }, So = { class: "capmenu__field" }, Co = { class: "capmenu__fieldlabel" }, wo = { class: "capmenu__field" }, To = { class: "capmenu__fieldlabel" }, Eo = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let c = t, u = n, d = se(), f = ee(), { t: p } = Y(), m = b(null), g = b(null), v = r(() => d.subtitleLang), S = r(() => c.tracks.some((e) => e.language === v.value)), C = r(() => S.value ? "captions" : "captions-off"), D = r(() => S.value ? c.tracks.findIndex((e) => e.language === v.value) + 1 : 0), O = r(() => c.activeAudio >= 0 ? c.activeAudio : 0);
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
		Ui(g, T(c, "open"), {
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
		}, [l(q, { name: C.value }, null, 8, ["name"])], 10, $a), t.open ? (y(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: g,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": E(p)("player.captionsAndSubtitles"),
			tabindex: "-1"
		}, [
			s("div", to, [s("h3", no, w(E(p)("player.subtitles")), 1), l(Li, {
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
			}, [s("span", ao, [S.value ? a("", !0) : (y(), i(q, {
				key: 0,
				name: "check"
			}))]), s("span", oo, w(E(p)("player.off")), 1)], 8, io), (y(!0), o(e, null, x(t.tracks, (e, t) => (y(), o("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": v.value === e.language,
				tabindex: D.value === t + 1 ? 0 : -1,
				onClick: (t) => M(e.language)
			}, [s("span", co, [v.value === e.language ? (y(), i(q, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", lo, w(e.label), 1)], 8, so))), 128))], 40, ro),
			t.audioTracks.length > 1 ? (y(), o(e, { key: 0 }, [s("h3", uo, w(E(p)("player.audio")), 1), s("div", {
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
			}, [s("span", mo, [t.activeAudio === e.index ? (y(), i(q, {
				key: 0,
				name: "check"
			})) : a("", !0)]), s("span", ho, w(e.label), 1)], 8, po))), 128))], 40, fo)], 64)) : a("", !0),
			s("h3", go, w(E(p)("player.captionStyle")), 1),
			s("div", _o, [
				s("div", vo, [s("span", yo, w(E(p)("player.size")), 1), l(_a, {
					"model-value": E(f).captionStyle.size,
					options: E(Ga),
					label: E(p)("player.captionSize"),
					"onUpdate:modelValue": L
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", bo, [s("span", xo, w(E(p)("player.color")), 1), l(_a, {
					"model-value": E(f).captionStyle.textColor,
					options: E(Ka),
					label: E(p)("player.captionColor"),
					"onUpdate:modelValue": R
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", So, [s("span", Co, w(E(p)("player.background")), 1), l(_a, {
					"model-value": E(f).captionStyle.background,
					options: E(qa),
					label: E(p)("player.captionBackground"),
					"onUpdate:modelValue": z
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])]),
				s("div", wo, [s("span", To, w(E(p)("player.edge")), 1), l(_a, {
					"model-value": E(f).captionStyle.edge,
					options: E(Ja),
					label: E(p)("player.captionEdge"),
					"onUpdate:modelValue": B
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])])
			])
		], 8, eo)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-bce771b9"]]), Do = 32, Oo = 18, ko = 250, Ao = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function jo(e, t, n, r, i, a, o) {
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
		r: Ao(d / m),
		g: Ao(f / m),
		b: Ao(p / m)
	};
}
function Mo(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: jo(e, t, n, 0, 0, r, n),
		right: jo(e, t, n, t - r, 0, t, n),
		center: jo(e, t, n, 0, 0, t, n)
	};
}
function No({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Po({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Fo(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Po(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Po(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Po(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Io(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Lo = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
			i.value = Io(a);
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
				u.value = Fo(Mo(n, 32, 18));
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
}), [["__scopeId", "data-v-88c68588"]]), Ro = ["aria-label"], zo = { class: "resume__label" }, Bo = { class: "resume__time numeric" }, Vo = { class: "resume__actions" }, Ho = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t, { t: i } = Y(), a = r(() => i("player.resumeFrom").split("{time}"));
		return (t, r) => (y(), o("div", {
			class: "resume",
			role: "region",
			"aria-label": E(i)("player.resumePlayback")
		}, [s("p", zo, [
			c(w(a.value[0]), 1),
			s("span", Bo, w(E(Zr)(e.seconds)), 1),
			c(w(a.value[1]), 1)
		]), s("div", Vo, [s("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [l(q, { name: "play" }), s("span", null, w(E(i)("player.resume")), 1)]), s("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [l(q, { name: "rewind" }), s("span", null, w(E(i)("player.startOver")), 1)])])], 8, Ro));
	}
}), [["__scopeId", "data-v-271c5209"]]), Uo = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Wo = [
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
], Go = new Set(Wo);
function Ko(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function qo(...e) {
	return e.some((e) => Go.has(Ko(e)));
}
function Jo(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
function Yo(e) {
	return e?.error?.code === 2;
}
var Xo = 8, Zo = 15, Qo = 2 * Math.PI * 15;
function $o(e, t, n = Qo) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
var es = /* @__PURE__ */ new Map([
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
]), ts = [
	"video/mp4; codecs=\"hvc1.1.4.L120.90\"",
	"video/mp4; codecs=\"hev1.1.4.L120.90\"",
	"video/mp4; codecs=\"hvc1.1.6.L93.B0\"",
	"video/mp4; codecs=\"hvc1.1.4.L120\""
];
function ns(e, t = "video/mp4") {
	let n = es.get(e.toLowerCase());
	return n ? `${t}; codecs="${n}"` : null;
}
async function rs(e, t = "video/mp4") {
	if (!e) return !0;
	let n = ns(e, t);
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
async function is() {
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
		for (let t of ts) {
			let n = e.canPlayType(t);
			if (n === "probably" || n === "maybe") return !0;
		}
	}
	return !1;
}
async function as(e, t) {
	if (qo(...e)) return !0;
	let n = e.map((e) => Ko(e)).find((e) => Uo.includes(e)) ?? "", r = n ? `video/${n}` : "video/mp4";
	if (Uo.includes(n) && t.length > 0) {
		let e = t.find((e) => e.default) ?? t[0];
		if (e?.codec && !await rs(e.codec, r) || (n === "mp4" || n === "m4v") && !await is()) return !0;
	}
	return !1;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var os = ["aria-label"], ss = ["src"], cs = { class: "upnext__body" }, ls = { class: "upnext__eyebrow" }, us = { class: "upnext__title" }, ds = {
	key: 0,
	class: "upnext__cd numeric"
}, fs = { class: "upnext__actions" }, ps = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ms = ["r"], hs = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], gs = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let { t: n } = Y(), i = e, c = t, u = r(() => i.posterUrl ?? i.media.poster_url ?? null), d = r(() => $o(i.remaining, i.total));
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
			}, null, 8, ss)) : a("", !0),
			s("div", cs, [
				s("p", ls, w(E(n)("player.upNext")), 1),
				s("h4", us, w(e.media.name), 1),
				e.counting ? (y(), o("p", ds, w(E(n)("player.startsIn", { seconds: Math.max(0, e.remaining) })), 1)) : a("", !0),
				s("div", fs, [s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => c("play-now")
				}, [l(q, { name: "play" }), s("span", null, w(E(n)("player.playNow")), 1)]), s("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => c("cancel")
				}, w(E(n)("player.cancel")), 1)])
			]),
			e.counting ? (y(), o("svg", ps, [s("circle", {
				cx: "18",
				cy: "18",
				r: E(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ms), s("circle", {
				cx: "18",
				cy: "18",
				r: E(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": E(Qo),
				"stroke-dashoffset": d.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, hs)])) : a("", !0)
		], 8, os));
	}
}), [["__scopeId", "data-v-85909b2d"]]), _s = {
	class: "transcode",
	role: "alert"
}, vs = { class: "transcode__card" }, ys = { class: "transcode__heading" }, bs = { class: "transcode__body" }, xs = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = Y();
		return (t, i) => (y(), o("div", _s, [s("div", vs, [
			l(q, {
				name: "alert",
				class: "transcode__icon"
			}),
			s("h3", ys, w(E(r)("player.transcodeHeading")), 1),
			s("p", bs, w(e.title ? E(r)("player.transcodeBodyTitled", { title: e.title }) : E(r)("player.transcodeBodyUntitled")), 1),
			s("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [l(q, { name: "arrow-left" }), s("span", null, w(E(r)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-ba8c23c0"]]), Ss = {
	class: "prep",
	role: "status",
	"aria-live": "polite"
}, Cs = { class: "prep__card" }, ws = { class: "prep__heading" }, Ts = { class: "prep__body" }, Es = ["aria-valuenow"], Ds = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "TranscodePreparing",
	props: {
		title: {},
		progress: {}
	},
	emits: ["back"],
	setup(e) {
		let t = e, { t: n } = Y(), r = () => Math.max(0, Math.min(100, Math.round(t.progress ?? 0)));
		return (t, i) => (y(), o("div", Ss, [s("div", Cs, [
			l(q, {
				name: "spinner",
				class: "prep__spinner"
			}),
			s("h3", ws, w(E(n)("player.transcodePreparingHeading")), 1),
			s("p", Ts, w(e.title ? E(n)("player.transcodePreparingTitled", { title: e.title }) : E(n)("player.transcodePreparingUntitled")), 1),
			s("div", {
				class: "prep__bar",
				role: "progressbar",
				"aria-valuenow": r(),
				"aria-valuemin": "0",
				"aria-valuemax": "100"
			}, [s("div", {
				class: "prep__bar-fill",
				style: g({ width: r() + "%" })
			}, null, 4)], 8, Es),
			s("button", {
				type: "button",
				class: "prep__back",
				onClick: i[0] ||= (e) => t.$emit("back")
			}, [l(q, { name: "arrow-left" }), s("span", null, w(E(n)("player.goBack")), 1)])
		])]));
	}
}), [["__scopeId", "data-v-e3ea0ebf"]]), Os = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "SkipButton",
	props: {
		position: {},
		introMarker: {},
		outroMarker: {}
	},
	emits: ["skip"],
	setup(e, { emit: t }) {
		let c = e, u = t, { t: d } = Y();
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
			}, [s("span", null, w(p.value.label), 1), l(q, { name: "skip-forward" })])) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d3fc1b53"]]), ks = {
	key: 0,
	class: "skip-controls",
	"aria-label": "Skip controls"
}, As = ["aria-label", "onClick"], js = { class: "skip-controls__label" }, Ms = 5, Ns = 30, Ps = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "SkipControls",
	props: {
		position: {},
		markers: {}
	},
	emits: ["skip"],
	setup(t, { emit: n }) {
		let i = t, c = n, { t: u } = Y();
		function d(e) {
			return e / 1e3;
		}
		function f(e, t) {
			return t >= d(e.endMs);
		}
		function p(e, t) {
			if (f(e, t)) return !1;
			let n = d(e.startMs), r = n - Ms, i = n + Ns;
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
		return (t, n) => g.value.length > 0 ? (y(), o("div", ks, [(y(!0), o(e, null, x(g.value, (e) => (y(), o("button", {
			key: e.id,
			type: "button",
			class: "skip-controls__btn",
			"aria-label": `Skip ${h(e.type)}`,
			onClick: P((t) => _(e), ["stop"])
		}, [s("span", js, w(h(e.type)), 1), l(q, { name: "skip-forward" })], 8, As))), 128))])) : a("", !0);
	}
}), [["__scopeId", "data-v-27a6c637"]]), Fs = ["aria-label", "aria-expanded"], Is = ["aria-label"], Ls = { class: "chapterlist__head" }, Rs = { class: "chapterlist__title" }, zs = ["aria-label"], Bs = ["onClick"], Vs = { class: "chapterlist__index" }, Hs = { class: "chapterlist__name" }, Us = { class: "chapterlist__meta" }, Ws = { class: "chapterlist__time" }, Gs = {
	key: 0,
	class: "chapterlist__duration"
}, Ks = {
	key: 1,
	class: "chapterlist__empty"
}, qs = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let i = t, c = n, { t: u } = Y();
		function d() {
			c("update:open", !1);
		}
		function f() {
			c("update:open", !i.open);
		}
		let p = r(() => i.chapters.map((e, t) => {
			let n = t + 1, r = e.title?.trim() || `Chapter ${n}`, i = Zr(e.start), a;
			return e.end != null && e.end > e.start && (a = Zr(e.end - e.start)), {
				chapter: e,
				label: r,
				startLabel: i,
				durationLabel: a,
				index: n
			};
		})), m = b(null), g = b(null);
		Ui(g, T(i, "open"), {
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
		}, [l(q, { name: "list" })], 10, Fs), t.open ? (y(), o("div", {
			key: 0,
			ref_key: "panelEl",
			ref: g,
			class: "chapterlist__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": E(u)("player.chapterList"),
			tabindex: "-1"
		}, [s("div", Ls, [s("h3", Rs, w(E(u)("player.chapters")), 1), l(Li, {
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
			s("span", Vs, w(e.index), 1),
			s("span", Hs, w(e.label), 1),
			s("span", Us, [s("span", Ws, w(e.startLabel), 1), e.durationLabel ? (y(), o("span", Gs, "· " + w(e.durationLabel), 1)) : a("", !0)])
		], 8, Bs)]))), 128))], 8, zs)) : (y(), o("p", Ks, w(E(u)("player.noChapters")), 1))], 8, Is)) : a("", !0)], 512));
	}
}), [["__scopeId", "data-v-177e91a7"]]), Js = {
	key: 0,
	class: "marker-timeline__ad-badge",
	"aria-live": "polite"
}, Ys = { class: "marker-timeline__ticks" }, Xs = [
	"title",
	"aria-label",
	"onClick"
], Zs = { class: "marker-timeline__tooltip" }, Qs = { class: "marker-timeline__tooltip-label" }, $s = { class: "marker-timeline__tooltip-time numeric" }, ec = ["onClick"], tc = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		}, [_.value ? (y(), o("div", Js, [n[0] ||= s("svg", {
			width: "12",
			height: "12",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.5",
			"aria-hidden": "true"
		}, [s("polygon", { points: "5,3 19,12 5,21" })], -1), c(" " + w(v.value), 1)])) : a("", !0), s("div", Ys, [(y(!0), o(e, null, x(p.value, (e) => (y(), o("button", {
			key: e.id,
			type: "button",
			class: h(["marker-timeline__tick", { "is-ad": e.isAd }]),
			style: g({
				left: `${e.ratio * 100}%`,
				"--tick-color": e.color
			}),
			title: `${e.label} — ${E(Zr)(e.startSec)}`,
			"aria-label": `${e.label} at ${E(Zr)(e.startSec)}`,
			onClick: P((t) => b(e), ["stop"])
		}, [s("span", Zs, [
			s("span", Qs, w(e.label), 1),
			s("span", $s, w(E(Zr)(e.startSec)), 1),
			s("button", {
				type: "button",
				class: "marker-timeline__similar-btn",
				onClick: P((t) => S(e), ["stop"])
			}, " Find similar ", 8, ec)
		])], 14, Xs))), 128))])], 2)) : a("", !0);
	}
}), [["__scopeId", "data-v-52c56b64"]]), nc = ["aria-label", "aria-expanded"], rc = {
	key: 0,
	class: "sleep-timer__remaining numeric"
}, ic = ["aria-label"], ac = ["aria-selected", "onClick"], oc = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "SleepTimer",
	props: { onExpire: { type: Function } },
	setup(t, { expose: i }) {
		let c = t, { t: u } = Y(), d = [
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
		}, [l(q, { name: "moon" }), m.value ? (y(), o("span", rc, w(T(p.value)), 1)) : a("", !0)], 10, nc), l(n, { name: "dropdown" }, {
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
			}, w(e.label), 11, ac)), 64))], 8, ic)) : a("", !0)]),
			_: 1
		})], 2));
	}
}), [["__scopeId", "data-v-a0b86647"]]), sc = ["aria-labelledby"], cc = {
	key: 0,
	class: "phlix-modal__header"
}, lc = ["id"], uc = { class: "phlix-modal__body" }, dc = {
	key: 1,
	class: "phlix-modal__footer"
}, fc = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let { t: c } = Y(), u = e, d = r, f = b(u.modelValue);
		j(() => u.modelValue, (e) => f.value = e);
		let p = b(null), m = D();
		function g() {
			d("update:modelValue", !1), d("close");
		}
		function _() {
			u.dismissible && g();
		}
		return Ui(p, f, { onEscape: () => u.dismissible ? (g(), !0) : !1 }), (r, u) => (y(), i(t, { to: "body" }, [l(n, { name: "phlix-modal" }, {
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
				e.title || !e.hideClose ? (y(), o("header", cc, [e.title ? (y(), o("h2", {
					key: 0,
					id: E(m),
					class: "phlix-modal__title"
				}, w(e.title), 9, lc)) : a("", !0), e.hideClose ? a("", !0) : (y(), i(Li, {
					key: 1,
					name: "x",
					label: E(c)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: g
				}, null, 8, ["label"]))])) : a("", !0),
				s("div", uc, [S(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (y(), o("footer", dc, [S(r.$slots, "footer", {}, void 0, !0)])) : a("", !0)
			], 10, sc)], 32)) : a("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-3be1ebaa"]]), pc = ["aria-label"], mc = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: n } = Y(), i = r(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (y(), o("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? E(n)("common.loading"),
			style: g(i.value ? { fontSize: i.value } : void 0)
		}, [l(q, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, pc));
	}
}), [["__scopeId", "data-v-736b299d"]]), X = {
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
function hc(e, t, n) {
	return {
		...t,
		type: e,
		protocol_version: 1,
		timestamp: n()
	};
}
function gc(e) {
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
function _c(e) {
	return JSON.stringify(e);
}
var vc = .1, yc = .99, bc = 1.01, xc = class {
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
		this.driftRate = 1 + vc * i / 1e3, this.driftRate = Math.min(bc, Math.max(yc, this.driftRate));
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
}, Sc = class {
	send;
	now;
	memberId;
	memberName;
	options;
	timeSync;
	group = null;
	lastPingSendTime = null;
	constructor(e) {
		this.options = e, this.send = e.send, this.now = e.now, this.memberId = e.memberId, this.memberName = e.memberName ?? "User", this.timeSync = new xc(e.now);
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
		let t = gc(e);
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
		this.send(hc(e, t, this.now));
	}
}, Cc = class {
	client;
	constructor(e) {
		this.client = new we({
			baseUrl: e,
			tokenStore: typeof window < "u" ? new me() : void 0
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
}, wc = null;
function Tc(e) {
	return wc ||= new Cc(e), wc;
}
var Z = null, Q = null, Ec = 0, Dc = 5, Oc = 1e3, $ = null, kc = null, Ac = null, jc = null;
function Mc() {
	try {
		return typeof window > "u" ? null : new me().getAccessToken();
	} catch {
		return null;
	}
}
function Nc(e) {
	let t = typeof window < "u" ? window.location.hostname : "localhost", n = Mc() ?? "";
	return `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${t}:8097?token=${encodeURIComponent(n)}&room=${encodeURIComponent(e)}`;
}
function Pc(e) {
	if ($) try {
		let t = JSON.parse(e.data);
		$.handleIncoming(t);
	} catch {}
}
function Fc() {
	if (Z = null, $ && $.onDisconnect(), Q && Ec < Dc) {
		let e = Oc * 2 ** Ec;
		Ec++, console.log(`[SyncPlay] WebSocket closed, reconnecting in ${e}ms (attempt ${Ec})`), setTimeout(() => {
			Q && Ic(Q);
		}, e);
	} else Ec >= Dc && (console.warn("[SyncPlay] Max reconnect attempts reached, giving up"), Q = null, Ec = 0, $ = null);
}
function Ic(e, t, n, r) {
	if (t && (jc = t), Z && Q !== e && (Z.close(), Z = null, Q = null, Ec = 0, $ = null), Z && Q === e) return;
	Q = e, Ec = 0;
	let i = n ?? kc ?? `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`, a = r ?? Ac ?? "Anonymous";
	kc = i, Ac = a, $ = new Sc({
		send: (e) => {
			Z && Z.readyState === WebSocket.OPEN && Z.send(_c(e));
		},
		now: () => Date.now(),
		memberId: i,
		memberName: a,
		onPlaybackCommand: (e) => {
			jc && jc({
				type: e.type,
				position: e.position,
				roomId: Q ?? void 0
			});
		},
		onPlaybackSync: (e, t, n, r) => {
			jc && jc({
				type: n ? "play" : "pause",
				position: t,
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
	let o = Nc(e);
	console.log(`[SyncPlay] Opening WebSocket to ${o}`), Z = new WebSocket(o), Z.onopen = () => {
		console.log("[SyncPlay] WebSocket connected"), Ec = 0, $ && Q && $.joinGroup(Q);
	}, Z.onmessage = Pc, Z.onclose = Fc, Z.onerror = (e) => {
		console.error("[SyncPlay] WebSocket error", e);
	};
}
function Lc() {
	Z &&= (Z.close(), null), $ &&= ($.leaveGroup(), $.onDisconnect(), null), Q = null, Ec = 0;
}
function Rc(e) {
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
		case "sync":
			e.position !== void 0 && $.reportPosition(e.position, !0);
			break;
	}
}
var zc = F("phlix-syncplay", () => {
	let e = b(null), t = b(null), n = b([]), i = b(null), a = b(!1), o = b(0), s = 0, c = r(() => t.value !== null), l = r(() => t.value ? t.value.state === "playing" || t.value.state === "paused" : !1), u = r(() => n.value.filter((e) => e.isOnline)), d = r(() => {
		let e = t.value;
		if (!e || e.state === "paused" || e.state === "waiting") return 0;
		let n = (Date.now() - s) / 1e3, r = e.playbackPosition + n * e.playbackRate;
		return o.value - r;
	}), f = r(() => t.value ? t.value.state === "waiting" ? "re-syncing" : Math.abs(d.value) > 2 ? "outOfSync" : "synced" : "outOfSync");
	async function p(r, o) {
		a.value = !0, i.value = null;
		try {
			let i = Tc(r), a = await i.createRoom(o);
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
			let i = Tc(r), a = await i.getMembers(o);
			n.value = a;
			let c = await i.joinRoom(o);
			t.value = c, s = Date.now(), e.value &&= {
				...e.value,
				currentSession: c
			}, n.value = c.activeUsers, Ic(o, (e) => {
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
				await Tc(r).leaveRoom(e.value.id), Lc(), e.value = null, t.value = null, n.value = [];
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
		t.value && Rc({
			type: n,
			position: r?.position,
			rate: r?.rate,
			issuedBy: t.value.createdBy,
			issuedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	async function v(e) {
		if (t.value) try {
			let n = await Tc(e).getState(t.value.id);
			t.value = n, s = Date.now();
		} catch (e) {
			throw i.value = e instanceof Error ? e.message : "Failed to refresh state", e;
		}
	}
	async function y(t) {
		if (e.value) try {
			let r = await Tc(t).getMembers(e.value.id);
			n.value = r;
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
}), Bc = [
	"type",
	"disabled",
	"aria-busy"
], Vc = {
	key: 0,
	class: "phlix-btn__spinner"
}, Hc = { class: "phlix-btn__label" }, Uc = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
			e.loading ? (y(), o("span", Vc, [l(q, { name: "spinner" })])) : a("", !0),
			e.leftIcon && !e.loading ? (y(), i(q, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0),
			s("span", Hc, [S(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (y(), i(q, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : a("", !0)
		], 10, Bc));
	}
}), [["__scopeId", "data-v-38abf89d"]]);
//#endregion
//#region src/composables/useApiBase.ts
function Wc(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function Gc() {
	let e = d("mediaApiBase", void 0), t = d("apiBase", "");
	return r(() => Wc(e) || Wc(t));
}
//#endregion
//#region src/components/syncplay/SyncPlayOverlay.vue?vue&type=script&setup=true&lang.ts
var Kc = {
	key: 0,
	class: "syncplay-overlay"
}, qc = { class: "syncplay-overlay__badge" }, Jc = { class: "syncplay-overlay__label" }, Yc = { class: "syncplay-overlay__status-label" }, Xc = { class: "syncplay-overlay__members" }, Zc = { class: "syncplay-overlay__member-count" }, Qc = { class: "syncplay-overlay__member-list" }, $c = { class: "syncplay-overlay__member-name" }, el = {
	key: 0,
	class: "syncplay-overlay__member syncplay-overlay__member--more"
}, tl = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "SyncPlayOverlay",
	props: { apiBase: {} },
	setup(t) {
		let n = t, { t: i } = Y(), u = zc(), d = Gc(), f = r(() => n.apiBase ?? d.value), p = r(() => u.currentRoom?.name ?? "SyncPlay"), m = r(() => u.onlineMembers.length), g = r(() => u.syncStatus), _ = r(() => {
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
		return (t, n) => E(u).isInRoom ? (y(), o("div", Kc, [
			s("div", qc, [l(q, {
				name: "user",
				class: "syncplay-overlay__icon"
			}), s("span", Jc, "SyncPlay: " + w(p.value), 1)]),
			s("div", { class: h(["syncplay-overlay__status", `syncplay-overlay__status--${g.value}`]) }, [l(q, {
				name: v.value,
				class: "syncplay-overlay__status-icon"
			}, null, 8, ["name"]), s("span", Yc, w(_.value), 1)], 2),
			s("div", Xc, [s("span", Zc, [l(q, { name: "user" }), c(" " + w(m.value) + " " + w(E(i)("syncplay.members", { count: m.value })), 1)]), s("ul", Qc, [(y(!0), o(e, null, x(E(u).onlineMembers.slice(0, 5), (e) => (y(), o("li", {
				key: e.id,
				class: "syncplay-overlay__member"
			}, [n[0] ||= s("span", { class: "syncplay-overlay__member-dot" }, null, -1), s("span", $c, w(e.name), 1)]))), 128)), E(u).onlineMembers.length > 5 ? (y(), o("li", el, " +" + w(E(u).onlineMembers.length - 5) + " more ", 1)) : a("", !0)])]),
			l(Uc, {
				variant: "ghost",
				size: "sm",
				onClick: b
			}, {
				default: M(() => [c(w(E(i)("syncplay.leaveRoom")), 1)]),
				_: 1
			})
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-301b09be"]]), nl = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], rl = ["id"], il = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		}, [...n[0] ||= [s("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, nl), e.label ? (y(), o("label", {
			key: 0,
			id: E(i),
			class: "phlix-switch__label",
			onClick: c
		}, w(e.label), 9, rl)) : a("", !0)], 2));
	}
}), [["__scopeId", "data-v-0725d51f"]]), al = {
	class: "syncplay-modal__tabs",
	role: "tablist"
}, ol = ["aria-selected"], sl = ["aria-selected"], cl = {
	key: 0,
	class: "syncplay-modal__fields"
}, ll = { class: "syncplay-modal__field" }, ul = {
	class: "syncplay-modal__label",
	for: "room-name"
}, dl = ["placeholder"], fl = { class: "syncplay-modal__field syncplay-modal__field--toggle" }, pl = { class: "syncplay-modal__toggle-hint" }, ml = {
	key: 1,
	class: "syncplay-modal__fields"
}, hl = { class: "syncplay-modal__field" }, gl = {
	class: "syncplay-modal__label",
	for: "room-id"
}, _l = ["placeholder"], vl = {
	key: 2,
	class: "syncplay-modal__error",
	role: "alert"
}, yl = {
	key: 3,
	class: "syncplay-modal__rooms"
}, bl = { class: "syncplay-modal__rooms-title" }, xl = { class: "syncplay-modal__rooms-list" }, Sl = ["onClick"], Cl = { class: "syncplay-modal__room-name" }, wl = { class: "syncplay-modal__room-count" }, Tl = {
	key: 4,
	class: "syncplay-modal__loading",
	role: "status"
}, El = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "SyncPlayModal",
	props: {
		modelValue: { type: Boolean },
		apiBase: {},
		prefilledRoomId: {}
	},
	emits: ["update:modelValue", "joined"],
	setup(t, { emit: n }) {
		let u = t, d = n, { t: f } = Y(), p = zc(), m = Gc(), g = r(() => u.apiBase ?? m.value), _ = b("create"), v = b(""), S = b(""), C = b(!0), T = b(!1), D = b(null), O = b([]), A = b(!1), F = r(() => v.value.trim().length > 0), I = r(() => S.value.trim().length > 0), L = r(() => (_.value === "create" ? F.value : I.value) && !T.value);
		j(() => u.modelValue, async (e) => {
			e && (D.value = null, v.value = "", C.value = !0, u.prefilledRoomId ? (S.value = u.prefilledRoomId, _.value = "join") : (S.value = "", _.value = "create"), await R());
		});
		async function R() {
			A.value = !0;
			try {
				let e = new Cc(g.value);
				O.value = await e.listPublicRooms();
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
		return (n, r) => (y(), i(fc, {
			"model-value": t.modelValue,
			title: E(f)("syncplay.title"),
			size: "md",
			"onUpdate:modelValue": r[5] ||= (e) => d("update:modelValue", e),
			onClose: V
		}, {
			footer: M(() => [l(Uc, {
				variant: "ghost",
				type: "button",
				onClick: V
			}, {
				default: M(() => [c(w(E(f)("common.close")), 1)]),
				_: 1
			}), l(Uc, {
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
				s("div", al, [s("button", {
					type: "button",
					role: "tab",
					class: h(["syncplay-modal__tab", { "is-active": _.value === "create" }]),
					"aria-selected": _.value === "create",
					onClick: r[0] ||= (e) => _.value = "create"
				}, w(E(f)("syncplay.createRoom")), 11, ol), s("button", {
					type: "button",
					role: "tab",
					class: h(["syncplay-modal__tab", { "is-active": _.value === "join" }]),
					"aria-selected": _.value === "join",
					onClick: r[1] ||= (e) => _.value = "join"
				}, w(E(f)("syncplay.joinRoom")), 11, sl)]),
				_.value === "create" ? (y(), o("div", cl, [s("div", ll, [s("label", ul, w(E(f)("syncplay.roomName")), 1), N(s("input", {
					id: "room-name",
					"onUpdate:modelValue": r[2] ||= (e) => v.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: E(f)("syncplay.roomNamePlaceholder"),
					autocomplete: "off"
				}, null, 8, dl), [[k, v.value]])]), s("div", fl, [l(il, {
					modelValue: C.value,
					"onUpdate:modelValue": r[3] ||= (e) => C.value = e,
					label: E(f)("syncplay.publicRoom")
				}, null, 8, ["modelValue", "label"]), s("span", pl, w(C.value ? E(f)("syncplay.publicHint") : E(f)("syncplay.privateHint")), 1)])])) : (y(), o("div", ml, [s("div", hl, [s("label", gl, w(E(f)("syncplay.roomId")), 1), N(s("input", {
					id: "room-id",
					"onUpdate:modelValue": r[4] ||= (e) => S.value = e,
					type: "text",
					class: "syncplay-modal__input",
					placeholder: E(f)("syncplay.roomIdPlaceholder"),
					autocomplete: "off"
				}, null, 8, _l), [[k, S.value]])])])),
				D.value ? (y(), o("p", vl, w(D.value), 1)) : a("", !0),
				_.value === "join" && O.value.length > 0 ? (y(), o("div", yl, [s("h3", bl, w(E(f)("syncplay.publicRooms")), 1), s("ul", xl, [(y(!0), o(e, null, x(O.value, (e) => (y(), o("li", {
					key: e.id,
					class: "syncplay-modal__room"
				}, [s("button", {
					type: "button",
					class: "syncplay-modal__room-btn",
					onClick: (t) => B(e)
				}, [
					l(q, {
						name: "user",
						class: "syncplay-modal__room-icon"
					}),
					s("span", Cl, w(e.name), 1),
					s("span", wl, w(e.memberCount) + " " + w(E(f)("syncplay.members")), 1)
				], 8, Sl)]))), 128))])])) : a("", !0),
				A.value ? (y(), o("div", Tl, [l(q, { name: "spinner" }), s("span", null, w(E(f)("common.loading")), 1)])) : a("", !0)
			], 32)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-e3fd2a17"]]), Dl = {
	key: 0,
	class: "syncplay-controls"
}, Ol = ["aria-label"], kl = { class: "syncplay-controls__wait-label" }, Al = {
	key: 0,
	class: "syncplay-controls__wait-members"
}, jl = { key: 0 }, Ml = { class: "syncplay-controls__transport" }, Nl = ["aria-label"], Pl = ["aria-label"], Fl = ["aria-label"], Il = { class: "syncplay-controls__status-label" }, Ll = 10, Rl = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let n = e, i = t, { t: u } = Y(), d = zc(), f = Gc(), p = r(() => n.apiBase ?? f.value), m = b(!1), g = b([]), _ = r(() => m.value || d.syncStatus === "re-syncing");
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
			await C(Math.max(0, n.position - Ll));
		}
		async function D() {
			await C(Math.min(n.duration, n.position + Ll));
		}
		return j(() => d.syncStatus, (e) => {
			e === "re-syncing" ? m.value = !0 : e === "synced" && (m.value = !1, g.value = []);
		}), (t, n) => E(d).isInRoom ? (y(), o("div", Dl, [
			_.value ? (y(), o("div", {
				key: 0,
				class: "syncplay-controls__wait",
				role: "status",
				"aria-label": E(u)("syncplay.waitingForMembers")
			}, [
				l(q, {
					name: "spinner",
					class: "syncplay-controls__wait-icon"
				}),
				s("span", kl, w(E(u)("syncplay.waitingForMembers")), 1),
				g.value.length > 0 ? (y(), o("span", Al, [c(w(g.value.slice(0, 3).join(", ")) + " ", 1), g.value.length > 3 ? (y(), o("span", jl, "+" + w(g.value.length - 3), 1)) : a("", !0)])) : a("", !0)
			], 8, Ol)) : a("", !0),
			s("div", Ml, [
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": E(u)("syncplay.rewind"),
					onClick: T
				}, [l(q, { name: "rewind" })], 8, Nl),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn syncplay-controls__btn--primary",
					"aria-label": e.isPlaying ? E(u)("syncplay.pauseAll") : E(u)("syncplay.playAll"),
					onClick: S
				}, [l(q, { name: e.isPlaying ? "pause" : "play" }, null, 8, ["name"])], 8, Pl),
				s("button", {
					type: "button",
					class: "syncplay-controls__btn",
					"aria-label": E(u)("syncplay.fastForward"),
					onClick: D
				}, [l(q, { name: "forward" })], 8, Fl)
			]),
			s("div", { class: h(["syncplay-controls__status", `syncplay-controls__status--${E(d).syncStatus}`]) }, [l(q, {
				name: E(d).syncStatus === "synced" ? "check" : E(d).syncStatus === "outOfSync" ? "alert" : "spinner",
				class: "syncplay-controls__status-icon"
			}, null, 8, ["name"]), s("span", Il, w(E(d).syncStatus === "synced" ? E(u)("syncplay.synced") : E(d).syncStatus === "outOfSync" ? E(u)("syncplay.outOfSync") : E(u)("syncplay.reSyncing")), 1)], 2)
		])) : a("", !0);
	}
}), [["__scopeId", "data-v-75a184c7"]]), zl = { class: "player__stage" }, Bl = ["src", "poster"], Vl = [
	"src",
	"srclang",
	"label",
	"default"
], Hl = { class: "player__meta" }, Ul = ["aria-label"], Wl = { class: "player__meta-text" }, Gl = { class: "player__eyebrow" }, Kl = { class: "player__title" }, ql = { class: "player__sub numeric" }, Jl = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Yl = {
	key: 0,
	class: "player__center"
}, Xl = ["aria-label"], Zl = { class: "player__btnrow" }, Ql = ["aria-label"], $l = ["aria-label"], eu = ["aria-label"], tu = { class: "player__time numeric" }, nu = ["aria-label", "aria-pressed"], ru = ["title"], iu = ["aria-label"], au = ["aria-label"], ou = ["aria-label", "aria-pressed"], su = ["aria-label", "aria-pressed"], cu = ["aria-label"], lu = { class: "similar-modal" }, uu = {
	key: 0,
	class: "similar-modal__loading",
	role: "status",
	"aria-busy": "true"
}, du = {
	key: 1,
	class: "similar-modal__state",
	role: "alert"
}, fu = { class: "similar-modal__state-title" }, pu = {
	key: 2,
	class: "similar-modal__state",
	role: "status"
}, mu = {
	key: 3,
	class: "similar-modal__results"
}, hu = { class: "similar-modal__poster" }, gu = ["src", "alt"], _u = {
	key: 1,
	class: "similar-modal__poster-fallback",
	"aria-hidden": "true"
}, vu = { class: "similar-modal__result-body" }, yu = { class: "similar-modal__result-title" }, bu = {
	key: 0,
	class: "similar-modal__result-meta numeric"
}, xu = { key: 0 }, Su = /*#__PURE__*/ J(/* @__PURE__ */ u({
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
		let u = t, f = n, p = se(), g = ee(), { t: S } = Y(), C = zc(), T = De(), D = r(() => T.isFavorite(u.media.id)), O = r(() => T.likeLevel(u.media.id));
		function k() {
			T.toggleFavorite(u.media.id, de());
		}
		function A(e) {
			T.setLike(u.media.id, e, de());
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
		], F = b(null), I = b(null), L = b(!0), R = b(!1), z = b(!1), B = b(!1), V = b(!1), H = b(!1), te = b(!1), ne = b(null), re = b(null), ie = b(!1), ae = Te(), oe = b(!1), ce = r(() => V.value ? 1.35 : 1), U = b(qo(u.streamUrl, u.media.path));
		async function le() {
			if (U.value) return;
			let e = u.playbackAudioTracks ?? [];
			e.length !== 0 && await as([u.streamUrl, u.media.path], e) && (U.value = !0);
		}
		j(() => u.playbackAudioTracks, (e) => {
			!e || e.length === 0 || le();
		}, { immediate: !1 });
		let ue = d("phlixConfig", null);
		function de() {
			return ue?.apiBase ?? "";
		}
		let W = Ai({
			apiBase: () => u.apiBase ?? "",
			hlsConfig: ue?.playerHlsConfig
		}), fe = Fi({ apiBase: () => u.apiBase ?? "" }), pe = null;
		function me(e) {
			pe !== null && clearTimeout(pe), pe = setTimeout(() => {
				pe = null, fe.fetch(e);
			}, 0);
		}
		let he = r(() => u.thumbnailAt ?? fe.thumbnailAt), ge = r(() => U.value ? void 0 : u.streamUrl), _e = r(() => U.value && W.state.value !== "ready"), ve = r(() => U.value && (W.state.value === "preparing" || W.state.value === "idle")), ye = r(() => U.value && W.state.value === "error");
		function G(e = 0) {
			let t = F.value;
			t && W.start(t, u.media.id, void 0, e);
		}
		function be(e) {
			if (p.quality === "original" && e !== "auto") {
				W.loadVariantPlaylist(ba);
				return;
			}
			if (typeof e == "string" && e !== "auto") {
				W.loadVariantPlaylist(e);
				return;
			}
			W.setLevel(e);
		}
		let xe = !1;
		j(() => W.levels.value, (e) => {
			if (xe || e.length === 0) return;
			xe = !0;
			let t = g.defaultQuality;
			if (!t || t === "auto") return;
			if (t === "original") {
				W.loadVariantPlaylist(ba);
				return;
			}
			let n = wa(e, t);
			n >= 0 && W.setNextLevel(n);
		}), j(() => W.variants.value, (e) => {
			e?.length && !xe && (xe = !1, m(() => {
				if (W.levels.value.length > 0) {
					xe = !0;
					let e = g.defaultQuality;
					if (!e || e === "auto") return;
					if (e === "original") {
						W.loadVariantPlaylist(ba);
						return;
					}
					let t = wa(W.levels.value, e);
					t >= 0 && W.setNextLevel(t);
				}
			}));
		}, { deep: !0 });
		let Se = b(p.resumePositionFor(u.media.id) ?? 0), Ce = b(!U.value && Se.value > 0), Ee = null, Oe = b(!1), ke = b(8), Ae, je = b(null), Me = b(0), Ne = b(!1), Pe = b([]), Fe = b(!1), Ie = b(null);
		function Le(e, t) {
			je.value = e, Me.value = t, Pe.value = [], Ie.value = null, Ne.value = !0, He(e, t);
		}
		let Re = null, ze = null, Be = null;
		function Ve() {
			let e = u.apiBase ?? "";
			return (ze === null || Be !== e) && (ze = new we({ baseUrl: e }), Be = e), ze;
		}
		async function He(e, t) {
			Re?.abort(), Re = new AbortController(), Fe.value = !0, Ie.value = null;
			try {
				let n = await Ve().searchByMarker(e, t, 30, 20, Re.signal);
				Pe.value = Array.isArray(n.items) ? n.items : [];
			} catch (e) {
				if (e instanceof Error && e.name === "AbortError") return;
				Ie.value = "Failed to load similar media. Please try again.", Pe.value = [];
			} finally {
				Fe.value = !1;
			}
		}
		function Ue() {
			Re?.abort(), Ne.value = !1, Pe.value = [], Ie.value = null, je.value = null;
		}
		let We = r(() => p.upNext);
		function Ge() {
			U.value = qo(u.streamUrl, u.media.path), le(), Se.value = p.resumePositionFor(u.media.id) ?? 0, Ce.value = !U.value && Se.value > 0, Ee = null, Dt = !1, ht = !1, gt = !1, ct.value = -1, St = null, xe = !1, Ye(), Oe.value = !1, W.reset(), F.value && (F.value.currentTime = 0), U.value && G(), me(u.media.id);
		}
		function Ke(e) {
			let t = F.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : Ee = Math.max(0, e));
		}
		function qe() {
			Ke(Se.value), Ce.value = !1, F.value?.play()?.catch(() => {});
		}
		function Je() {
			Ee = null, Ke(0), p.clearResume(u.media.id), Ce.value = !1, F.value?.play()?.catch(() => {});
		}
		function Ye() {
			Ae &&= (clearInterval(Ae), void 0);
		}
		function Xe() {
			ke.value = 8, Ye(), Ae = setInterval(() => {
				--ke.value, ke.value <= 0 && (Ye(), Qe());
			}, 1e3);
		}
		function Ze() {
			an(), L.value = !0, p.upNext && (Oe.value = !0, g.autoplay && Xe());
		}
		function Qe() {
			Ye(), Oe.value = !1;
			let e = p.next(u.streamUrlFor);
			e && f("play-next", e);
		}
		function $e() {
			Ye(), Oe.value = !1;
		}
		function et() {
			if (U.value) return;
			let e = F.value, t = Yo(e) && (e?.currentTime ?? 0) === 0;
			(Jo(e) || t) && (U.value = !0, G(e?.currentTime ?? 0));
		}
		let tt = b([]), nt = b([]), rt = b(-1), it = b(!1), at = r(() => W.state.value === "ready" && W.audioTracks.value.length > 0), ot = r(() => W.audioTracks.value.map((e) => ({
			index: e.index,
			language: e.lang || `audio-${e.index}`,
			label: e.name || `Audio ${e.index + 1}`,
			kind: "audio"
		}))), st = r(() => (u.playbackAudioTracks ?? []).map((e) => ({
			index: e.index,
			language: e.language || `audio-${e.index}`,
			label: e.label,
			kind: "audio"
		}))), ct = b(-1), lt = r(() => !at.value && !U.value && nt.value.length === 0 && st.value.length > 1), ut = r(() => at.value ? ot.value : lt.value ? st.value : nt.value), dt = r(() => {
			if (at.value) return W.currentAudioTrack.value;
			if (lt.value) {
				if (ct.value >= 0) return ct.value;
				let e = (u.playbackAudioTracks ?? []).find((e) => e.default);
				return e ? e.index : u.playbackAudioTracks?.[0]?.index ?? 0;
			}
			return rt.value;
		}), ft = b(!1), pt = p.subtitleLang, mt = r(() => U.value ? W.subtitleTracks.value : u.playbackSubtitleTracks ?? []), ht = !1, gt = !1;
		function _t() {
			if (ht) return;
			if (g.subtitlePreferenceSet) {
				ht = !0;
				return;
			}
			let e = mt.value.find((e) => e.default);
			if (!e) return;
			let t = tt.value.find((t) => t.language === (e.language || e.label));
			t && (p.setSubtitle(t.language), pt = t.language, ht = !0);
		}
		function vt() {
			if (gt) return;
			let e = g.defaultAudioLang;
			if (!e) return;
			let t = ut.value;
			if (!t.length) return;
			let n = t.findIndex((t) => t.language?.toLowerCase() === e.toLowerCase());
			if (n < 0) return;
			let r = dt.value;
			r >= 0 && r < t.length || (Ct(n), gt = !0);
		}
		let yt = r(() => tt.value.some((e) => e.language === p.subtitleLang));
		function bt() {
			let e = F.value;
			tt.value = Ma(e), nt.value = Na(e), rt.value = Ra(e), _t(), vt();
		}
		function xt() {
			if (yt.value) pt = p.subtitleLang, p.setSubtitle(null);
			else {
				let e = pt && tt.value.some((e) => e.language === pt) ? pt : tt.value[0]?.language ?? null;
				p.setSubtitle(e);
			}
			f("captions");
		}
		let St = null;
		function Ct(e) {
			if (at.value) W.setAudioTrack(e);
			else if (lt.value) {
				if (e === dt.value) return;
				ct.value = e, St = e, U.value = !0, G(F.value?.currentTime ?? 0);
			} else La(F.value, e), rt.value = e;
		}
		j(at, (e) => {
			if (!e || St === null) return;
			let t = St;
			St = null, t >= 0 && t < W.audioTracks.value.length && W.setAudioTrack(t);
		}), j(mt, () => {
			m(() => bt());
		}, { deep: !0 });
		let wt = null, Tt, Et = r(() => {
			let e = [];
			u.media.year && e.push({ text: String(u.media.year) }), u.media.rating && e.push({
				text: u.media.rating,
				cert: !0
			}), u.media.runtime && e.push({ text: `${u.media.runtime}m` });
			let t = u.media.genres?.[0];
			return t && e.push({ text: t }), e;
		}), Dt = !1;
		function Ot() {
			if (!u.autoplay || Dt || Ce.value || _e.value) return;
			let e = F.value;
			if (!e || !e.paused) return;
			Dt = !0;
			let t = e.play();
			t && typeof t.then == "function" && t.catch((t) => {
				t instanceof DOMException && t.name === "NotAllowedError" && (e.muted = !0, p.muted = !0, e.play()?.catch(() => {}));
			});
		}
		function kt() {
			Ot();
		}
		function At() {
			u.prevEpisode && f("play-episode", u.prevEpisode);
		}
		function jt() {
			u.nextEpisode && f("play-episode", u.nextEpisode);
		}
		function Mt() {
			let e = F.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function Nt(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function Pt() {
			p.play(), p.setMediaPositionState();
		}
		function Ft() {
			p.pause(), p.setMediaPositionState();
		}
		function It() {
			let e = F.value;
			e && p.updateProgress(e.currentTime, e.duration, Nt(e));
		}
		function Lt() {
			let e = F.value;
			e && (e.volume = p.volume, e.muted = p.muted, e.playbackRate = p.rate, Ee !== null && (e.currentTime = e.duration ? Math.min(e.duration, Ee) : Ee, Ee = null), p.updateProgress(e.currentTime, e.duration, Nt(e)), p.setMediaPositionState(), bt());
		}
		function Rt() {
			let e = F.value;
			e && p.updateProgress(e.currentTime, e.duration, Nt(e));
		}
		function zt() {
			let e = F.value;
			e && (Math.abs(e.volume - p.volume) > .001 && p.setVolume(e.volume), e.muted !== p.muted && p.toggleMute());
		}
		function Bt() {
			let e = F.value;
			e && e.playbackRate !== p.rate && p.setRate(e.playbackRate), p.setMediaPositionState();
		}
		function Vt() {
			p.setMediaPositionState();
		}
		function Ht() {
			p.setMediaPositionState();
		}
		function K(e) {
			let t = F.value;
			t && p.duration > 0 && (t.currentTime = Math.min(p.duration, Math.max(0, e)));
		}
		function Ut() {
			z.value = !0, sn();
		}
		function Wt() {
			z.value = !1, sn();
		}
		function Gt(e) {
			let t = N.reduce((e, t, n) => Math.abs(t - p.rate) < Math.abs(N[e] - p.rate) ? n : e, 0), n = N[Math.min(N.length - 1, Math.max(0, t + e))];
			p.setRate(n);
		}
		function Kt() {
			if (!u.markers) return;
			let e = p.position, t = u.markers.filter((t) => t.type === "intro" && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && K(t.startMs / 1e3);
		}
		function qt() {
			if (!u.markers) return;
			let e = p.position, t = u.markers.filter((t) => (t.type === "outro" || t.type === "credits") && t.startMs / 1e3 > e && t.startMs / 1e3 - e <= 60).sort((e, t) => e.startMs - t.startMs)[0];
			t && K(t.startMs / 1e3);
		}
		function Jt() {
			ne.value?.toggleOpen();
		}
		let Yt = null;
		function Xt() {
			let e = F.value;
			if (!e) {
				p.pause();
				return;
			}
			if (e.muted || e.volume < .05) {
				e.pause(), p.pause();
				return;
			}
			Yt !== null && (clearInterval(Yt), Yt = null);
			let t = .05;
			Yt = setInterval(() => {
				e.volume > t ? e.volume = Math.max(0, e.volume - t) : (clearInterval(Yt), Yt = null, e.volume = 0, e.pause(), p.pause());
			}, 50);
		}
		Xi({
			playPause: Mt,
			seekBy: (e) => K(p.position + e),
			frameStep: (e) => {
				p.playing || K(p.position + e / 30);
			},
			volumeBy: (e) => p.setVolume(p.volume + e),
			toggleMute: Zt,
			toggleFullscreen: $t,
			toggleCaptions: xt,
			toggleTheater: Qt,
			togglePip: tn,
			skipIntro: Kt,
			skipOutro: qt,
			sleepTimer: Jt,
			seekToPercent: (e) => K(e * p.duration),
			speedStep: Gt,
			toggleHelp: () => {
				B.value = !B.value;
			},
			toggleQuality: () => {
				U.value ? (ie.value = !ie.value, re.value?.toggleMenu?.()) : ae.show({
					message: S("player.qualityDirectStream"),
					tone: "info",
					duration: 3e3
				});
			}
		}, { enabled: () => !B.value && !it.value && !ft.value });
		function Zt() {
			p.toggleMute();
		}
		function Qt() {
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
			e && (e.type === "seekTo" ? Ke(e.value) : e.type === "seekBy" && Ke(p.position + e.value));
		});
		function $t() {
			if (typeof document > "u") return;
			let e = I.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function en() {
			R.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function tn() {
			let e = F.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			f("pip");
		}
		function nn() {
			H.value = !0;
		}
		function rn() {
			H.value = !1;
		}
		function an() {
			Tt &&= (clearTimeout(Tt), void 0);
		}
		function on() {
			an(), !(!p.playing || z.value) && (Tt = setTimeout(() => {
				p.playing && !z.value && (L.value = !1);
			}, u.idleTimeout ?? 3e3));
		}
		function sn() {
			L.value = !0, on();
		}
		j(() => p.playing, (e) => {
			e ? (Ce.value = !1, $e(), on()) : (an(), L.value = !0);
		});
		let cn = null;
		return v(() => {
			p.setCurrent(u.media, {
				resetPosition: !1,
				streamUrl: u.streamUrl
			}), T.hydrate(u.media), typeof document < "u" && (document.addEventListener("fullscreenchange", en), te.value = document.pictureInPictureEnabled === !0), cn = p.bindMediaSession({
				onPlay: () => void F.value?.play()?.catch(() => {}),
				onPause: () => F.value?.pause(),
				onSeek: (e) => K(e)
			}), wt = F.value?.textTracks ?? null, wt?.addEventListener?.("addtrack", bt), wt?.addEventListener?.("removetrack", bt), bt(), U.value && G(), me(u.media.id);
		}), j(() => u.media, (e) => {
			p.setCurrent(e, {
				resetPosition: !1,
				streamUrl: u.streamUrl
			}), Ge();
		}), j(() => u.media?.id, () => {
			T.hydrate(u.media);
		}), j(() => C.currentSession, (e) => {
			e && (e.state === "playing" ? (F.value?.play(), p.play()) : e.state === "paused" && (F.value?.pause(), p.pause()), C.updateLocalPosition(p.position), Math.abs(C.driftAmount) > 2 && Ke(e.playbackPosition));
		}), _(() => {
			an(), Ye(), W.cleanup(), typeof document < "u" && document.removeEventListener("fullscreenchange", en), cn?.(), wt?.removeEventListener?.("addtrack", bt), wt?.removeEventListener?.("removetrack", bt), Yt !== null && (clearInterval(Yt), Yt = null), pe !== null && (clearTimeout(pe), pe = null);
		}), (n, r) => (y(), o("div", {
			ref_key: "containerRef",
			ref: I,
			class: h(["player", {
				"is-chrome-hidden": !L.value,
				"is-theater": V.value
			}]),
			onPointermove: sn,
			onPointerdown: sn,
			onFocusin: sn
		}, [l(Lo, {
			video: F.value,
			enabled: E(g).atmosphere,
			playing: E(p).playing,
			"reduced-motion": E(g).effectiveReducedMotion,
			intensity: ce.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), s("div", zl, [
			s("video", {
				ref_key: "videoRef",
				ref: F,
				class: "player__video",
				src: ge.value,
				poster: t.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: Pt,
				onPause: Ft,
				onTimeupdate: It,
				onLoadedmetadata: Lt,
				onCanplay: kt,
				onProgress: Rt,
				onVolumechange: zt,
				onRatechange: Bt,
				onSeeked: Vt,
				onDurationchange: Ht,
				onEnded: Ze,
				onError: et,
				onEnterpictureinpicture: nn,
				onLeavepictureinpicture: rn,
				onClick: Mt
			}, [(y(!0), o(e, null, x(mt.value, (e) => (y(), o("track", {
				key: e.url,
				kind: "subtitles",
				src: e.url,
				srclang: e.language || void 0,
				label: e.label || void 0,
				default: e.default
			}, null, 8, Vl))), 128))], 40, Bl),
			r[18] ||= s("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[19] ||= s("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			s("div", Hl, [s("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": E(S)("player.back"),
				onClick: r[0] ||= P((e) => f("back"), ["stop"])
			}, [l(q, { name: "arrow-left" })], 8, Ul), s("div", Wl, [
				s("p", Gl, w(E(S)("player.nowPlaying")), 1),
				s("h2", Kl, w(t.media.name), 1),
				s("div", ql, [(y(!0), o(e, null, x(Et.value, (t, n) => (y(), o(e, { key: n }, [n > 0 && !t.cert ? (y(), o("span", Jl, "·")) : a("", !0), s("span", { class: h({ player__cert: t.cert }) }, w(t.text), 3)], 64))), 128))])
			])]),
			_e.value ? a("", !0) : (y(), o("div", Yl, [s("button", {
				type: "button",
				class: h(["player__bigplay", { "is-playing": E(p).playing }]),
				"aria-label": E(p).playing ? E(S)("player.pause") : E(S)("player.play"),
				onClick: P(Mt, ["stop"])
			}, [l(q, { name: E(p).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Xl)])),
			l(Qa, {
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
			_e.value ? a("", !0) : (y(), o("div", {
				key: 1,
				class: "player__controls",
				onClick: r[6] ||= P(() => {}, ["stop"])
			}, [
				l(si, {
					position: E(p).position,
					duration: E(p).duration,
					buffered: E(p).buffered,
					chapters: t.chapters,
					"thumbnail-at": he.value,
					onSeek: K,
					onScrubStart: Ut,
					onScrubEnd: Wt
				}, null, 8, [
					"position",
					"duration",
					"buffered",
					"chapters",
					"thumbnail-at"
				]),
				E(g).showMarkerTimeline && t.markers && t.markers.length > 0 ? (y(), i(tc, {
					key: 0,
					position: E(p).position,
					duration: E(p).duration,
					markers: t.markers,
					onSeek: K,
					onSimilar: Le
				}, null, 8, [
					"position",
					"duration",
					"markers"
				])) : a("", !0),
				s("div", Zl, [
					t.prevEpisode ? (y(), o("button", {
						key: 0,
						type: "button",
						class: "player__iconbtn",
						"aria-label": E(S)("player.previousEpisode"),
						onClick: At
					}, [l(q, { name: "skip-back" })], 8, Ql)) : a("", !0),
					s("button", {
						type: "button",
						class: "player__iconbtn player__iconbtn--lg",
						"aria-label": E(p).playing ? E(S)("player.pause") : E(S)("player.play"),
						onClick: Mt
					}, [l(q, { name: E(p).playing ? "pause" : "play" }, null, 8, ["name"])], 8, $l),
					t.nextEpisode ? (y(), o("button", {
						key: 1,
						type: "button",
						class: "player__iconbtn",
						"aria-label": E(S)("player.nextEpisode"),
						onClick: jt
					}, [l(q, { name: "skip-forward" })], 8, eu)) : a("", !0),
					s("span", tu, [
						c(w(E(Zr)(E(p).position)), 1),
						r[14] ||= s("span", { class: "player__sep" }, " / ", -1),
						c(w(E(Zr)(E(p).duration)), 1)
					]),
					r[15] ||= s("span", { class: "player__grow" }, null, -1),
					s("button", {
						type: "button",
						class: h(["player__iconbtn player__favorite", { "is-on": D.value }]),
						"aria-label": D.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": D.value ? "true" : "false",
						onClick: k
					}, [l(q, { name: D.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, nu),
					l(Xr, {
						level: O.value,
						onCycle: A
					}, null, 8, ["level"]),
					l(la),
					l(va),
					l(Da, {
						ref_key: "qualityMenuRef",
						ref: re,
						open: ie.value,
						"onUpdate:open": r[1] ||= (e) => ie.value = e,
						levels: E(W).levels.value,
						variants: E(W).variants.value,
						"current-level": E(W).currentLevel.value,
						"auto-enabled": E(W).autoEnabled.value,
						"active-height": E(W).activeLevelHeight.value,
						onSelect: be
					}, null, 8, [
						"open",
						"levels",
						"variants",
						"current-level",
						"auto-enabled",
						"active-height"
					]),
					U.value ? a("", !0) : (y(), o("span", {
						key: 2,
						class: "player__direct-badge",
						title: E(S)("player.qualityDirectStream")
					}, w(E(S)("player.directStream")), 9, ru)),
					l(Eo, {
						open: it.value,
						"onUpdate:open": r[2] ||= (e) => it.value = e,
						tracks: tt.value,
						"audio-tracks": ut.value,
						"active-audio": dt.value,
						onSelectAudio: Ct
					}, null, 8, [
						"open",
						"tracks",
						"audio-tracks",
						"active-audio"
					]),
					l(qs, {
						open: ft.value,
						"onUpdate:open": r[3] ||= (e) => ft.value = e,
						chapters: t.chapters ?? [],
						onSeek: K
					}, null, 8, ["open", "chapters"]),
					l(oc, {
						ref_key: "sleepTimerRef",
						ref: ne,
						"on-expire": Xt
					}, null, 512),
					s("button", {
						type: "button",
						class: h(["player__iconbtn player__syncplay", { "is-on": E(C).isInRoom }]),
						"aria-label": E(C).isInRoom ? E(S)("syncplay.inRoom") : E(S)("syncplay.syncPlay"),
						"aria-haspopup": "dialog",
						onClick: r[4] ||= (e) => oe.value = !0
					}, [l(q, { name: "user" })], 10, iu),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": E(S)("player.keyboardShortcuts"),
						"aria-haspopup": "dialog",
						onClick: r[5] ||= (e) => B.value = !0
					}, [l(q, { name: "info" })], 8, au),
					te.value ? (y(), o("button", {
						key: 3,
						type: "button",
						class: h(["player__iconbtn", { "is-on": H.value }]),
						"aria-label": H.value ? E(S)("player.exitPip") : E(S)("player.pip"),
						"aria-pressed": H.value,
						onClick: tn
					}, [l(q, { name: "pip" })], 10, ou)) : a("", !0),
					s("button", {
						type: "button",
						class: h(["player__iconbtn", { "is-on": V.value }]),
						"aria-label": V.value ? E(S)("player.exitTheater") : E(S)("player.theater"),
						"aria-pressed": V.value,
						onClick: Qt
					}, [l(q, { name: "theater" })], 10, su),
					s("button", {
						type: "button",
						class: "player__iconbtn",
						"aria-label": R.value ? E(S)("player.exitFullscreen") : E(S)("player.fullscreen"),
						onClick: $t
					}, [l(q, { name: R.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, cu)
				])
			])),
			_e.value ? a("", !0) : (y(), i(Os, {
				key: 2,
				position: E(p).position,
				"intro-marker": t.introMarker,
				"outro-marker": t.outroMarker,
				onSkip: K
			}, null, 8, [
				"position",
				"intro-marker",
				"outro-marker"
			])),
			_e.value ? a("", !0) : (y(), i(Ps, {
				key: 3,
				position: E(p).position,
				markers: t.markers,
				onSkip: K
			}, null, 8, ["position", "markers"])),
			Ce.value && !_e.value ? (y(), i(Ho, {
				key: 4,
				seconds: Se.value,
				onResume: qe,
				onRestart: Je
			}, null, 8, ["seconds"])) : a("", !0),
			Oe.value && We.value && !_e.value ? (y(), i(gs, {
				key: 5,
				media: We.value,
				remaining: ke.value,
				total: E(8),
				counting: E(g).autoplay,
				onPlayNow: Qe,
				onCancel: $e
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : a("", !0),
			l(fc, {
				modelValue: Ne.value,
				"onUpdate:modelValue": r[7] ||= (e) => Ne.value = e,
				title: `Similar ${je.value ?? "marker"}s`,
				size: "lg",
				onClose: Ue
			}, {
				default: M(() => [s("div", lu, [Fe.value ? (y(), o("div", uu, [l(mc, { label: "Finding similar media" })])) : Ie.value ? (y(), o("div", du, [l(q, {
					name: "error",
					class: "similar-modal__state-icon"
				}), s("p", fu, w(Ie.value), 1)])) : !Fe.value && Pe.value.length === 0 ? (y(), o("div", pu, [
					l(q, {
						name: "search",
						class: "similar-modal__state-icon"
					}),
					r[16] ||= s("p", { class: "similar-modal__state-title" }, "No similar media found", -1),
					r[17] ||= s("p", { class: "similar-modal__state-hint" }, "Try a different marker or position.", -1)
				])) : (y(), o("ul", mu, [(y(!0), o(e, null, x(Pe.value, (e) => (y(), o("li", {
					key: e.id,
					class: "similar-modal__result"
				}, [s("div", hu, [e.poster_url ? (y(), o("img", {
					key: 0,
					src: e.poster_url,
					alt: e.name,
					loading: "lazy",
					decoding: "async"
				}, null, 8, gu)) : (y(), o("div", _u, [l(q, { name: "film" })]))]), s("div", vu, [s("p", yu, w(e.name), 1), e.year ? (y(), o("p", bu, [c(w(e.year) + " ", 1), e.runtime ? (y(), o("span", xu, " · " + w(e.runtime) + "m", 1)) : a("", !0)])) : a("", !0)])]))), 128))]))])]),
				_: 1
			}, 8, ["modelValue", "title"]),
			ve.value ? (y(), i(Ds, {
				key: 6,
				title: t.media.name,
				progress: E(W).progress.value,
				onBack: r[8] ||= (e) => f("back")
			}, null, 8, ["title", "progress"])) : a("", !0),
			ye.value ? (y(), i(xs, {
				key: 7,
				title: t.media.name,
				onBack: r[9] ||= (e) => f("back")
			}, null, 8, ["title"])) : a("", !0),
			E(C).isInRoom ? (y(), i(Rl, {
				key: 8,
				position: E(p).position,
				duration: E(p).duration,
				"is-playing": E(p).playing,
				onSeek: K,
				onPlay: r[10] ||= (e) => void F.value?.play(),
				onPause: r[11] ||= (e) => void F.value?.pause()
			}, null, 8, [
				"position",
				"duration",
				"is-playing"
			])) : a("", !0),
			E(C).isInRoom ? (y(), i(tl, { key: 9 })) : a("", !0),
			l(El, {
				modelValue: oe.value,
				"onUpdate:modelValue": r[12] ||= (e) => oe.value = e
			}, null, 8, ["modelValue"]),
			l(aa, {
				open: B.value,
				onClose: r[13] ||= (e) => B.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-f4c4d917"]]), Cu = ["aria-label"], wu = ["src", "poster"], Tu = { class: "mini__body" }, Eu = { class: "mini__title" }, Du = { class: "mini__controls" }, Ou = ["aria-label"], ku = ["aria-label", "aria-pressed"], Au = ["aria-label"], ju = ["aria-label"], Mu = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Nu = /*#__PURE__*/ J(/* @__PURE__ */ u({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let c = t, u = se(), { t: f } = Y(), p = b(null), m = b(null), x = De(), S = d("phlixConfig", null), C = r(() => u.current ? x.isFavorite(u.current.id) : !1);
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
			!e || !u.hlsMasterUrl || (m.value?.destroy(), m.value = null, m.value = await gi(e, u.hlsMasterUrl, {
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
				}, null, 40, wu),
				s("div", Tu, [s("p", Eu, w(O.value), 1), s("div", Du, [
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": E(u).playing ? E(f)("player.pause") : E(f)("player.play"),
						onClick: I
					}, [l(q, { name: E(u).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ou),
					E(u).current ? (y(), o("button", {
						key: 0,
						type: "button",
						class: h(["mini__btn mini__btn--favorite", { "is-on": C.value }]),
						"aria-label": C.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": C.value ? "true" : "false",
						onClick: T
					}, [l(q, { name: C.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, ku)) : a("", !0),
					s("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": E(f)("player.expand"),
						onClick: L
					}, [l(q, { name: "expand" })], 8, Au),
					s("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": E(f)("player.closePlayer"),
						onClick: R
					}, [l(q, { name: "x" })], 8, ju)
				])]),
				s("div", Mu, [s("div", {
					class: "mini__progress-fill",
					style: g({ transform: `scaleX(${k.value})` })
				}, null, 4)])
			], 8, Cu)) : a("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
export { Oo as AMBIENT_SAMPLE_H, ko as AMBIENT_SAMPLE_INTERVAL_MS, Do as AMBIENT_SAMPLE_W, Gi as ARROW_ICONS, Ki as ARROW_LABELS, Lo as AmbientCanvas, qa as CAPTION_BACKGROUND_OPTIONS, Ka as CAPTION_COLOR_OPTIONS, Ja as CAPTION_EDGE_OPTIONS, Ga as CAPTION_SIZE_OPTIONS, Wa as CAPTION_SIZE_SCALE, Qa as CaptionOverlay, Eo as CaptionsMenu, Uo as DIRECT_PLAY_EXTENSIONS, Nu as MiniPlayer, Wi as PLAYER_SHORTCUTS, Su as Player, Da as QualityMenu, te as RESUME_MAX_RATIO, H as RESUME_MIN_SECONDS, Ho as ResumePrompt, si as Scrubber, aa as ShortcutsHelp, Os as SkipButton, va as SpeedMenu, Wo as TRANSCODE_EXTENSIONS, xs as TranscodeNotice, Ds as TranscodePreparing, Xo as UPNEXT_COUNTDOWN_SECONDS, Qo as UPNEXT_RING_CIRCUMFERENCE, Zo as UPNEXT_RING_RADIUS, gs as UpNext, la as VolumeControl, Ra as activeAudioIndex, Fo as ambientGradient, La as applyAudioTrack, Ia as applyTrackModes, gi as attachHls, jo as averageRegion, Za as captionStyleVars, Ha as cleanCueText, Xa as edgeShadow, Ko as extensionOf, Zr as formatTime, Yi as handleShortcut, Fa as hasActiveCaptions, Io as isBatterySaving, Oi as isFailedStatus, Jo as isFatalMediaError, fi as isNativeHlsSupported, Di as isPlayable, Ji as isTypingTarget, Na as listAudioTracks, Ma as listSubtitleTracks, qo as needsTranscode, xi as parseSubtitleTracks, Ti as parseTranscodeStart, Ei as parseTranscodeStatus, Ua as readActiveCueLines, ki as resolveStreamUrl, Pa as resolveTextTrack, No as rgbString, Po as rgbaString, $o as ringDashoffset, Mo as sampleAmbient, Ci as transcodeStartPath, wi as transcodeStatusPath, Ai as useHlsTranscode, Xi as useKeyboardShortcuts, se as usePlayerStore };

//# sourceMappingURL=player.js.map