import { a as e } from "./usePreferencesStore-FeMLCFE3.js";
import { computed as t, ref as n } from "vue";
import { defineStore as r } from "pinia";
//#region src/stores/usePlayerStore.ts
var i = 30, a = .95, o = 5e3, s = "phlix.resume", c = 1e7;
function l() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(s);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var u = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), c = n([]), u = n(!1), d = n(0), f = n(0), p = n(0), m = n(r.defaultVolume), h = n(!1), g = n(1), _ = n(r.defaultQuality), v = n(r.defaultSubtitleLang), y = n(!1), b = n(l()), x = n(null), S = 0, C = t(() => f.value > 0 ? d.value / f.value : 0), w = t(() => c.value[0] ?? null), T, E = 0;
	function D(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			E = Date.now();
			try {
				localStorage.setItem(s, JSON.stringify(b.value));
			} catch {}
		}, n = Date.now() - E;
		clearTimeout(T), e || n >= o ? t() : T = setTimeout(t, o - n);
	}
	function O(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function k(e, t, n) {
		O(t, n) ? b.value[e] = Math.floor(t) : delete b.value[e], D();
	}
	function A(e) {
		return e ? b.value[e] ?? null : null;
	}
	function j(e) {
		delete b.value[e], D(!0);
	}
	function M(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in b.value) && r > 0 && (b.value[n] = Math.floor(r), t = !0);
		t && D(!0);
	}
	function N(e, t = {}) {
		i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (d.value = 0, f.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, p.value = 0), Z(e);
	}
	function P(e, t, n) {
		d.value = e, t !== void 0 && (f.value > 0 ? isFinite(t) && t > f.value && (f.value = t) : f.value = t), n !== void 0 && (p.value = n), i.value && k(i.value.id, e, f.value);
	}
	function F(e) {
		x.value = {
			type: "seekTo",
			value: e,
			seq: ++S
		};
	}
	function I(e) {
		x.value = {
			type: "seekBy",
			value: e,
			seq: ++S
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
		}), c.value = [];
	}
	function R() {
		u.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function z() {
		u.value = !1, i.value && k(i.value.id, d.value, f.value), D(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function B(e) {
		m.value = Math.min(1, Math.max(0, e)), m.value > 0 && (h.value = !1);
	}
	function V() {
		h.value = !h.value;
	}
	function H(e) {
		g.value = e;
	}
	function U(e) {
		_.value = e;
	}
	function W(e) {
		v.value = e;
	}
	function G(e) {
		c.value = [...e];
	}
	function K(e) {
		c.value.push(e);
	}
	function q(e) {
		let t = c.value.shift() ?? null;
		return t && N(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function J() {
		y.value = !0;
	}
	function Y() {
		y.value = !1;
	}
	function X() {
		i.value && k(i.value.id, d.value, f.value), D(!0), u.value = !1, y.value = !1, i.value = null, a.value = "";
	}
	function Z(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function Q() {
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
	function $(e) {
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
	function ee() {
		m.value = r.defaultVolume, _.value = r.defaultQuality, v.value = r.defaultSubtitleLang;
	}
	return {
		current: i,
		streamUrl: a,
		queue: c,
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
		lastCommand: x,
		progress: C,
		upNext: w,
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
		setSubtitle: W,
		setQueue: G,
		enqueue: K,
		next: q,
		showMiniPlayer: J,
		hideMiniPlayer: Y,
		closePlayer: X,
		setMediaSessionMetadata: Z,
		setMediaPositionState: Q,
		bindMediaSession: $,
		seedFromPreferences: ee
	};
});
//#endregion
export { u as i, i as n, c as r, a as t };

//# sourceMappingURL=usePlayerStore-DmNlaYQc.js.map