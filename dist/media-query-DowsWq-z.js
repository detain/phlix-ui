import { a as e } from "./usePreferencesStore-BFFMWKZp.js";
import { computed as t, ref as n } from "vue";
import { defineStore as r } from "pinia";
//#region src/stores/usePlayerStore.ts
var i = 30, a = .95, o = 5e3, s = "phlix.resume";
function c() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(s);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var l = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), l = n([]), u = n(!1), d = n(0), f = n(0), p = n(0), m = n(r.defaultVolume), h = n(!1), g = n(1), _ = n(r.defaultQuality), v = n(r.defaultSubtitleLang), y = n(!1), b = n(c()), x = t(() => f.value > 0 ? d.value / f.value : 0), S = t(() => l.value[0] ?? null), C, w = 0;
	function T(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			w = Date.now();
			try {
				localStorage.setItem(s, JSON.stringify(b.value));
			} catch {}
		}, n = Date.now() - w;
		clearTimeout(C), e || n >= o ? t() : C = setTimeout(t, o - n);
	}
	function E(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function D(e, t, n) {
		E(t, n) ? b.value[e] = Math.floor(t) : delete b.value[e], T();
	}
	function O(e) {
		return e ? b.value[e] ?? null : null;
	}
	function k(e) {
		delete b.value[e], T(!0);
	}
	function A(e, t = {}) {
		i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (d.value = 0, f.value = 0, p.value = 0), G(e);
	}
	function j(e, t, n) {
		d.value = e, t !== void 0 && (f.value = t), n !== void 0 && (p.value = n), i.value && D(i.value.id, e, f.value);
	}
	function M() {
		u.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function N() {
		u.value = !1, i.value && D(i.value.id, d.value, f.value), T(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function P(e) {
		m.value = Math.min(1, Math.max(0, e)), m.value > 0 && (h.value = !1);
	}
	function F() {
		h.value = !h.value;
	}
	function I(e) {
		g.value = e;
	}
	function L(e) {
		_.value = e;
	}
	function R(e) {
		v.value = e;
	}
	function z(e) {
		l.value = [...e];
	}
	function B(e) {
		l.value.push(e);
	}
	function V(e) {
		let t = l.value.shift() ?? null;
		return t && A(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function H() {
		y.value = !0;
	}
	function U() {
		y.value = !1;
	}
	function W() {
		i.value && D(i.value.id, d.value, f.value), T(!0), u.value = !1, y.value = !1, i.value = null, a.value = "";
	}
	function G(e) {
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
		if (typeof e.setPositionState == "function" && !(!(f.value > 0) || !Number.isFinite(f.value))) try {
			e.setPositionState({
				duration: f.value,
				position: Math.min(Math.max(0, d.value), f.value),
				playbackRate: g.value || 1
			});
		} catch {}
	}
	function q(e) {
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
	function J() {
		m.value = r.defaultVolume, _.value = r.defaultQuality, v.value = r.defaultSubtitleLang;
	}
	return {
		current: i,
		streamUrl: a,
		queue: l,
		playing: u,
		position: d,
		duration: f,
		buffered: p,
		volume: m,
		muted: h,
		rate: g,
		quality: _,
		subtitleLang: v,
		miniPlayer: y,
		resumeMap: b,
		progress: x,
		upNext: S,
		inResumeBand: E,
		saveResume: D,
		resumePositionFor: O,
		clearResume: k,
		setCurrent: A,
		updateProgress: j,
		play: M,
		pause: N,
		setVolume: P,
		toggleMute: F,
		setRate: I,
		setQuality: L,
		setSubtitle: R,
		setQueue: z,
		enqueue: B,
		next: V,
		showMiniPlayer: H,
		hideMiniPlayer: U,
		closePlayer: W,
		setMediaSessionMetadata: G,
		setMediaPositionState: K,
		bindMediaSession: q,
		seedFromPreferences: J
	};
});
//#endregion
//#region src/api/media-query.ts
function u(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function d(e, t = {}) {
	return `${e}/api/v1/media?${u(t)}`;
}
//#endregion
export { l as a, i, d as n, a as r, u as t };

//# sourceMappingURL=media-query-DowsWq-z.js.map