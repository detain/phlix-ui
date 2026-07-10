import { a as e } from "./usePreferencesStore-DuQB-Gwk.js";
import { computed as t, ref as n } from "vue";
import { defineStore as r } from "pinia";
//#region src/stores/usePlayerStore.ts
var i = 30, a = .95, o = 5e3, s = "phlix.resume", c = "phlix.resume.touched", l = 1e7;
function ee() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(s);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
function u() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(c), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var d = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), l = n([]), d = n(!1), f = n(0), p = n(0), m = n(0), h = n(r.defaultVolume), g = n(!1), _ = n(1), v = n(r.defaultQuality), y = n(r.defaultSubtitleLang), b = n(!1), x = n(ee()), S = n(u()), C = n(null), w = 0, T = t(() => p.value > 0 ? f.value / p.value : 0), E = t(() => l.value[0] ?? null);
	function D(e) {
		S.value[e] = Date.now();
	}
	function O(e) {
		let t = Object.keys(x.value), n = !1;
		for (let e of Object.keys(S.value)) e in x.value || (delete S.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (S.value[e] ?? 0) - (S.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete x.value[n], delete S.value[n];
		}
		return !0;
	}
	let k, A = 0;
	function j(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			A = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(x.value)), localStorage.setItem(c, JSON.stringify(S.value));
			};
			try {
				e();
			} catch {
				try {
					O(Math.floor(Object.keys(x.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - A;
		clearTimeout(k), e || n >= o ? t() : k = setTimeout(t, o - n);
	}
	function M(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function N(e, t, n) {
		M(t, n) ? (x.value[e] = Math.floor(t), D(e), O(200)) : (delete x.value[e], delete S.value[e]), j();
	}
	function P(e) {
		return e ? x.value[e] ?? null : null;
	}
	function F(e) {
		delete x.value[e], delete S.value[e], j(!0);
	}
	function I(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in x.value) && r > 0 && (x.value[n] = Math.floor(r), D(n), t = !0);
		t && (O(200), j(!0));
	}
	function L(e, t = {}) {
		i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (f.value = 0, p.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, m.value = 0), $(e);
	}
	function R(e, t, n) {
		f.value = e, t !== void 0 && (p.value > 0 ? isFinite(t) && t > p.value && (p.value = t) : p.value = t), n !== void 0 && (m.value = n), i.value && N(i.value.id, e, p.value);
	}
	function z(e) {
		C.value = {
			type: "seekTo",
			value: e,
			seq: ++w
		};
	}
	function B(e) {
		C.value = {
			type: "seekBy",
			value: e,
			seq: ++w
		};
	}
	function V(e, t = {}) {
		L({
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
		}), l.value = [];
	}
	function H() {
		d.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function U() {
		d.value = !1, i.value && N(i.value.id, f.value, p.value), j(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function W(e) {
		h.value = Math.min(1, Math.max(0, e)), h.value > 0 && (g.value = !1);
	}
	function G() {
		g.value = !g.value;
	}
	function K(e) {
		_.value = e;
	}
	function q(e) {
		v.value = e;
	}
	function J(e) {
		y.value = e;
	}
	function Y(e) {
		l.value = [...e];
	}
	function X(e) {
		l.value.push(e);
	}
	function Z(e) {
		let t = l.value.shift() ?? null;
		return t && L(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function Q() {
		b.value = !0;
	}
	function te() {
		b.value = !1;
	}
	function ne() {
		i.value && N(i.value.id, f.value, p.value), j(!0), d.value = !1, b.value = !1, i.value = null, a.value = "";
	}
	function $(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function re() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && !(!(p.value > 0) || !Number.isFinite(p.value))) try {
			e.setPositionState({
				duration: p.value,
				position: Math.min(Math.max(0, f.value), p.value),
				playbackRate: _.value || 1
			});
		} catch {}
	}
	function ie(e) {
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
	function ae() {
		h.value = r.defaultVolume, v.value = r.defaultQuality, y.value = r.defaultSubtitleLang;
	}
	return {
		current: i,
		streamUrl: a,
		queue: l,
		playing: d,
		position: f,
		duration: p,
		buffered: m,
		volume: h,
		muted: g,
		rate: _,
		quality: v,
		subtitleLang: y,
		miniPlayer: b,
		resumeMap: x,
		lastCommand: C,
		progress: T,
		upNext: E,
		inResumeBand: M,
		saveResume: N,
		resumePositionFor: P,
		clearResume: F,
		mergeServerResume: I,
		setCurrent: L,
		updateProgress: R,
		seekTo: z,
		seekBy: B,
		playLocalFile: V,
		play: H,
		pause: U,
		setVolume: W,
		toggleMute: G,
		setRate: K,
		setQuality: q,
		setSubtitle: J,
		setQueue: Y,
		enqueue: X,
		next: Z,
		showMiniPlayer: Q,
		hideMiniPlayer: te,
		closePlayer: ne,
		setMediaSessionMetadata: $,
		setMediaPositionState: re,
		bindMediaSession: ie,
		seedFromPreferences: ae
	};
});
//#endregion
export { d as i, i as n, l as r, a as t };

//# sourceMappingURL=usePlayerStore-C0izJMh8.js.map