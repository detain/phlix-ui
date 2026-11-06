import { a as e } from "./usePreferencesStore-DrDMAwjz.js";
import { computed as t, ref as n } from "vue";
import { defineStore as r } from "pinia";
// src/stores/usePlayerStore.ts
var i = 30, a = .95, o = 5e3, s = "phlix.resume", c = "phlix.resume.touched", l = 1e7;
function ee() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(s), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
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
function d(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(1, Math.max(0, e));
}
var f = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), l = n([]), f = n(!1), p = n(0), m = n(0), h = n(0), g = n(r.defaultVolume), _ = n(!1), v = n(!1), y = n(1), b = n(r.defaultQuality), x = n(r.defaultSubtitleLang), S = n(""), C = n(!1), w = n(ee()), T = n(u()), E = n(null), D = 0, te = t(() => m.value > 0 ? p.value / m.value : 0), O = t(() => l.value[0] ?? null);
	function k(e) {
		T.value[e] = Date.now();
	}
	function A(e) {
		let t = Object.keys(w.value), n = !1;
		for (let e of Object.keys(T.value)) e in w.value || (delete T.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (T.value[e] ?? 0) - (T.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete w.value[n], delete T.value[n];
		}
		return !0;
	}
	let j, M = 0;
	function N(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			M = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(w.value)), localStorage.setItem(c, JSON.stringify(T.value));
			};
			try {
				e();
			} catch {
				try {
					A(Math.floor(Object.keys(w.value).length * .75)), e();
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
			let n = !(e in w.value);
			w.value[e] = Math.floor(t), k(e), n && A(200);
		} else delete w.value[e], delete T.value[e];
		N();
	}
	function I(e) {
		return e ? w.value[e] ?? null : null;
	}
	function L(e) {
		delete w.value[e], delete T.value[e], N(!0);
	}
	function R(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in w.value) && r > 0 && (w.value[n] = Math.floor(r), k(n), t = !0);
		t && (A(200), N(!0));
	}
	function z(e, t = {}) {
		q(), i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (p.value = 0, m.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, h.value = 0), $(e);
	}
	function B(e, t, n) {
		p.value = e, t !== void 0 && (m.value > 0 ? isFinite(t) && t > m.value && (m.value = t) : m.value = t), n !== void 0 && (h.value = n), i.value && F(i.value.id, e, m.value);
	}
	function V(e) {
		E.value = {
			type: "seekTo",
			value: e,
			seq: ++D
		};
	}
	function H(e) {
		E.value = {
			type: "seekBy",
			value: e,
			seq: ++D
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
	function K() {
		_.value || (_.value = !0, v.value = !0);
	}
	function q() {
		v.value && (v.value = !1, _.value = !1);
	}
	function J(e) {
		let t = d(e);
		t !== null && (g.value = t, t > 0 && (_.value = !1, v.value = !1));
	}
	function Y() {
		_.value = !_.value, v.value = !1;
	}
	function X(e) {
		y.value = e;
	}
	function Z(e) {
		b.value = e;
	}
	function Q(e) {
		x.value = e;
	}
	function ne(e) {
		l.value = [...e];
	}
	function re(e) {
		l.value.push(e);
	}
	function ie(e) {
		let t = l.value.shift() ?? null;
		return t && z(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function ae() {
		C.value = !0;
	}
	function oe() {
		C.value = !1;
	}
	function se() {
		i.value && F(i.value.id, p.value, m.value), N(!0), f.value = !1, C.value = !1, i.value = null, a.value = "", S.value = "";
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
	function ce() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && m.value > 0 && Number.isFinite(m.value)) try {
			e.setPositionState({
				duration: m.value,
				position: Math.min(Math.max(0, p.value), m.value),
				playbackRate: y.value || 1
			});
		} catch {}
	}
	function le(e) {
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
	function ue() {
		let e = d(r.defaultVolume);
		e !== null && (g.value = e), b.value = r.defaultQuality, x.value = r.defaultSubtitleLang;
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
		autoplayMuted: v,
		rate: y,
		quality: b,
		subtitleLang: x,
		hlsMasterUrl: S,
		miniPlayer: C,
		resumeMap: w,
		lastCommand: E,
		progress: te,
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
		setVolume: J,
		toggleMute: Y,
		muteForAutoplay: K,
		setRate: X,
		setQuality: Z,
		setSubtitle: Q,
		setQueue: ne,
		enqueue: re,
		next: ie,
		showMiniPlayer: ae,
		hideMiniPlayer: oe,
		closePlayer: se,
		setMediaSessionMetadata: $,
		setMediaPositionState: ce,
		bindMediaSession: le,
		seedFromPreferences: ue
	};
});
export { f as i, i as n, l as r, a as t };

//# sourceMappingURL=usePlayerStore-BpohCwDP.js.map