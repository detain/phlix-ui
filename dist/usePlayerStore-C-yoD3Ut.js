import { a as e } from "./usePreferencesStore-CQ3hN8jz.js";
import { computed as t, ref as n } from "vue";
import { defineStore as r } from "pinia";
// src/stores/usePlayerStore.ts
var i = 30, a = .95, o = 5e3, s = "phlix.resume", c = "phlix.resume.touched", l = 1e7;
function ee() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(s), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" && !Array.isArray(t) ? t : {};
	} catch {
		return {};
	}
}
function u() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(c), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" && !Array.isArray(t) ? t : {};
	} catch {
		return {};
	}
}
function d(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t = Math.imul(t ^ e.charCodeAt(n), 16777619) >>> 0;
	return t;
}
function f(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = Math.imul(t, 33) + e.charCodeAt(n) >>> 0;
	return t;
}
function p(e) {
	let t = e.split(/[?#]/)[0], n = t;
	try {
		n = decodeURIComponent(t);
	} catch {}
	return `local-${d(n).toString(36)}-${f(n).toString(36)}`;
}
function m(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(1, Math.max(0, e));
}
function h(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(4, Math.max(.25, e));
}
var g = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), l = n([]), d = n(!1), f = n(0), g = n(0), _ = n(0), v = n(r.defaultVolume), y = n(!1), b = n(!1), x = n(1), S = n(r.defaultQuality), C = n(r.defaultSubtitleLang), w = n(""), T = n(!1), E = n(ee()), D = n(u()), O = n(null), k = 0, A = t(() => g.value > 0 ? f.value / g.value : 0), j = t(() => l.value[0] ?? null);
	function M(e) {
		D.value[e] = Date.now();
	}
	function N(e) {
		let t = Object.keys(E.value), n = !1;
		for (let e of Object.keys(D.value)) e in E.value || (delete D.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (D.value[e] ?? 0) - (D.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete E.value[n], delete D.value[n];
		}
		return !0;
	}
	let P, F = 0;
	function I(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			F = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(E.value)), localStorage.setItem(c, JSON.stringify(D.value));
			};
			try {
				e();
			} catch {
				try {
					N(Math.floor(Object.keys(E.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - F;
		e || n >= o ? (clearTimeout(P), P = void 0, t()) : P === void 0 && (P = setTimeout(() => {
			P = void 0, t();
		}, o - n));
	}
	function L(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function R(e, t, n) {
		if (L(t, n)) {
			let n = !(e in E.value);
			E.value[e] = Math.floor(t), M(e), n && N(200);
		} else delete E.value[e], delete D.value[e];
		I();
	}
	function z(e) {
		return e ? E.value[e] ?? null : null;
	}
	function B(e) {
		delete E.value[e], delete D.value[e], I(!0);
	}
	function V(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in E.value) && r > 0 && (E.value[n] = Math.floor(r), M(n), t = !0);
		t && (N(200), I(!0));
	}
	function H(e, t = {}) {
		X(), i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (f.value = 0, g.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, _.value = 0), $(e);
	}
	function U(e, t, n) {
		f.value = e, t !== void 0 && (g.value > 0 ? isFinite(t) && t > g.value && (g.value = t) : g.value = t), n !== void 0 && (_.value = n);
		let r = i.value;
		if (!r) return;
		let a = Math.floor(e), o = r.id in E.value;
		(L(e, g.value) ? o && E.value[r.id] === a : !o) || R(r.id, e, g.value);
	}
	function W(e) {
		O.value = {
			type: "seekTo",
			value: e,
			seq: ++k
		};
	}
	function G(e) {
		O.value = {
			type: "seekBy",
			value: e,
			seq: ++k
		};
	}
	function K(e, t = {}) {
		let n = decodeURIComponent(e.split(/[?#]/)[0].split("/").pop() ?? "") || e;
		H({
			id: p(e),
			name: n,
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
	function q() {
		d.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function J() {
		d.value = !1, i.value && R(i.value.id, f.value, g.value), I(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function Y() {
		y.value || (y.value = !0, b.value = !0);
	}
	function X() {
		b.value && (b.value = !1, y.value = !1);
	}
	function Z(e) {
		let t = m(e);
		t !== null && (v.value = t, t > 0 && (y.value = !1, b.value = !1));
	}
	function Q() {
		y.value = !y.value, b.value = !1;
	}
	function te(e) {
		let t = h(e);
		t !== null && (x.value = t);
	}
	function ne(e) {
		S.value = e;
	}
	function re(e) {
		C.value = e;
	}
	function ie(e) {
		l.value = [...e];
	}
	function ae(e) {
		l.value.push(e);
	}
	function oe(e) {
		let t = l.value.shift() ?? null;
		return t && H(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function se() {
		T.value = !0;
	}
	function ce() {
		T.value = !1;
	}
	function le() {
		i.value && R(i.value.id, f.value, g.value), I(!0), d.value = !1, T.value = !1, i.value = null, a.value = "", w.value = "", typeof navigator < "u" && "mediaSession" in navigator && (navigator.mediaSession.metadata = null);
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
	function ue() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && g.value > 0 && Number.isFinite(g.value)) try {
			e.setPositionState({
				duration: g.value,
				position: Math.min(Math.max(0, f.value), g.value),
				playbackRate: x.value || 1
			});
		} catch {}
	}
	function de(e) {
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
	function fe() {
		let e = m(r.defaultVolume);
		e !== null && (v.value = e), S.value = r.defaultQuality, C.value = r.defaultSubtitleLang;
	}
	return {
		current: i,
		streamUrl: a,
		queue: l,
		playing: d,
		position: f,
		duration: g,
		buffered: _,
		volume: v,
		muted: y,
		autoplayMuted: b,
		rate: x,
		quality: S,
		subtitleLang: C,
		hlsMasterUrl: w,
		miniPlayer: T,
		resumeMap: E,
		lastCommand: O,
		progress: A,
		upNext: j,
		inResumeBand: L,
		saveResume: R,
		resumePositionFor: z,
		clearResume: B,
		mergeServerResume: V,
		setCurrent: H,
		updateProgress: U,
		seekTo: W,
		seekBy: G,
		playLocalFile: K,
		play: q,
		pause: J,
		setVolume: Z,
		toggleMute: Q,
		muteForAutoplay: Y,
		setRate: te,
		setQuality: ne,
		setSubtitle: re,
		setQueue: ie,
		enqueue: ae,
		next: oe,
		showMiniPlayer: se,
		hideMiniPlayer: ce,
		closePlayer: le,
		setMediaSessionMetadata: $,
		setMediaPositionState: ue,
		bindMediaSession: de,
		seedFromPreferences: fe
	};
});
export { g as i, i as n, l as r, a as t };

//# sourceMappingURL=usePlayerStore-C-yoD3Ut.js.map