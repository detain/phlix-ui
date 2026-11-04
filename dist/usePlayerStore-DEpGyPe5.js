import { a as e } from "./usePreferencesStore-DrDMAwjz.js";
import { computed as t, ref as n } from "vue";
import { defineStore as r } from "pinia";
// src/stores/usePlayerStore.ts
var i = 30, a = .95, o = 5e3, s = "phlix.resume", c = "phlix.resume.touched", l = 1e7;
function u() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(s), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
function ee() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(c), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
function d(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(1, Math.max(0, e));
}
var f = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), l = n([]), f = n(!1), p = n(0), m = n(0), h = n(0), g = n(r.defaultVolume), _ = n(!1), v = n(1), y = n(r.defaultQuality), b = n(r.defaultSubtitleLang), x = n(""), S = n(!1), C = n(u()), w = n(ee()), T = n(null), E = 0, D = t(() => m.value > 0 ? p.value / m.value : 0), O = t(() => l.value[0] ?? null);
	function k(e) {
		w.value[e] = Date.now();
	}
	function A(e) {
		let t = Object.keys(C.value), n = !1;
		for (let e of Object.keys(w.value)) e in C.value || (delete w.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (w.value[e] ?? 0) - (w.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete C.value[n], delete w.value[n];
		}
		return !0;
	}
	let j, M = 0;
	function N(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			M = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(C.value)), localStorage.setItem(c, JSON.stringify(w.value));
			};
			try {
				e();
			} catch {
				try {
					A(Math.floor(Object.keys(C.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - M;
		clearTimeout(j), e || n >= o ? t() : j = setTimeout(t, o - n);
	}
	function P(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function F(e, t, n) {
		if (P(t, n)) {
			let n = !(e in C.value);
			C.value[e] = Math.floor(t), k(e), n && A(200);
		} else delete C.value[e], delete w.value[e];
		N();
	}
	function I(e) {
		return e ? C.value[e] ?? null : null;
	}
	function L(e) {
		delete C.value[e], delete w.value[e], N(!0);
	}
	function R(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in C.value) && r > 0 && (C.value[n] = Math.floor(r), k(n), t = !0);
		t && (A(200), N(!0));
	}
	function z(e, t = {}) {
		i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (p.value = 0, m.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, h.value = 0), $(e);
	}
	function B(e, t, n) {
		p.value = e, t !== void 0 && (m.value > 0 ? isFinite(t) && t > m.value && (m.value = t) : m.value = t), n !== void 0 && (h.value = n), i.value && F(i.value.id, e, m.value);
	}
	function V(e) {
		T.value = {
			type: "seekTo",
			value: e,
			seq: ++E
		};
	}
	function H(e) {
		T.value = {
			type: "seekBy",
			value: e,
			seq: ++E
		};
	}
	function U(e, t = {}) {
		z({
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
	function W() {
		f.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function G() {
		f.value = !1, i.value && F(i.value.id, p.value, m.value), N(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function K(e) {
		let t = d(e);
		t !== null && (g.value = t, t > 0 && (_.value = !1));
	}
	function q() {
		_.value = !_.value;
	}
	function J(e) {
		v.value = e;
	}
	function Y(e) {
		y.value = e;
	}
	function X(e) {
		b.value = e;
	}
	function Z(e) {
		l.value = [...e];
	}
	function Q(e) {
		l.value.push(e);
	}
	function te(e) {
		let t = l.value.shift() ?? null;
		return t && z(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function ne() {
		S.value = !0;
	}
	function re() {
		S.value = !1;
	}
	function ie() {
		i.value && F(i.value.id, p.value, m.value), N(!0), f.value = !1, S.value = !1, i.value = null, a.value = "", x.value = "";
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
	function ae() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && m.value > 0 && Number.isFinite(m.value)) try {
			e.setPositionState({
				duration: m.value,
				position: Math.min(Math.max(0, p.value), m.value),
				playbackRate: v.value || 1
			});
		} catch {}
	}
	function oe(e) {
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
	function se() {
		let e = d(r.defaultVolume);
		e !== null && (g.value = e), y.value = r.defaultQuality, b.value = r.defaultSubtitleLang;
	}
	return {
		current: i,
		streamUrl: a,
		queue: l,
		playing: f,
		position: p,
		duration: m,
		buffered: h,
		volume: g,
		muted: _,
		rate: v,
		quality: y,
		subtitleLang: b,
		hlsMasterUrl: x,
		miniPlayer: S,
		resumeMap: C,
		lastCommand: T,
		progress: D,
		upNext: O,
		inResumeBand: P,
		saveResume: F,
		resumePositionFor: I,
		clearResume: L,
		mergeServerResume: R,
		setCurrent: z,
		updateProgress: B,
		seekTo: V,
		seekBy: H,
		playLocalFile: U,
		play: W,
		pause: G,
		setVolume: K,
		toggleMute: q,
		setRate: J,
		setQuality: Y,
		setSubtitle: X,
		setQueue: Z,
		enqueue: Q,
		next: te,
		showMiniPlayer: ne,
		hideMiniPlayer: re,
		closePlayer: ie,
		setMediaSessionMetadata: $,
		setMediaPositionState: ae,
		bindMediaSession: oe,
		seedFromPreferences: se
	};
});
export { f as i, i as n, l as r, a as t };

//# sourceMappingURL=usePlayerStore-DEpGyPe5.js.map