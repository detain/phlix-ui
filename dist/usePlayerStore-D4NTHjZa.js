import { a as e } from "./usePreferencesStore-CQ3hN8jz.js";
import { computed as t, ref as n } from "vue";
import { defineStore as r } from "pinia";
// src/stores/usePlayerStore.ts
var i = 30, a = .95, o = 5e3, s = "phlix.resume", c = "phlix.resume.touched", l = 1e7;
function u() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(s), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" && !Array.isArray(t) ? t : {};
	} catch {
		return {};
	}
}
function ee() {
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
	let r = e(), i = n(null), a = n(""), l = n([]), d = n(!1), f = n(0), g = n(0), _ = n(0), v = n(r.defaultVolume), y = n(!1), b = n(!1), x = n(1), S = n(r.defaultQuality), C = n(r.defaultSubtitleLang), w = n(""), T = n(!1), E = n(u()), D = n(ee()), O = n(null), k = 0, A = t(() => g.value > 0 ? f.value / g.value : 0), te = t(() => l.value[0] ?? null);
	function j(e) {
		D.value[e] = Date.now();
	}
	function M(e) {
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
	let N, P = 0;
	function F(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			P = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(E.value)), localStorage.setItem(c, JSON.stringify(D.value));
			};
			try {
				e();
			} catch {
				try {
					M(Math.floor(Object.keys(E.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - P;
		e || n >= o ? (clearTimeout(N), N = void 0, t()) : N === void 0 && (N = setTimeout(() => {
			N = void 0, t();
		}, o - n));
	}
	function I(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function L(e, t, n) {
		if (I(t, n)) {
			let n = !(e in E.value);
			E.value[e] = Math.floor(t), j(e), n && M(200);
		} else delete E.value[e], delete D.value[e];
		F();
	}
	function R(e) {
		return e ? E.value[e] ?? null : null;
	}
	function z(e) {
		delete E.value[e], delete D.value[e], F(!0);
	}
	function B(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in E.value) && r > 0 && (E.value[n] = Math.floor(r), j(n), t = !0);
		t && (M(200), F(!0));
	}
	function V(e, t = {}) {
		Y(), i.value && i.value.id !== e.id && (a.value = "", w.value = ""), i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (f.value = 0, g.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, _.value = 0), $(e);
	}
	function H(e, t, n) {
		f.value = e, t !== void 0 && (g.value > 0 ? isFinite(t) && t > g.value && (g.value = t) : g.value = t), n !== void 0 && (_.value = n);
		let r = i.value;
		if (!r) return;
		let a = Math.floor(e), o = r.id in E.value;
		(I(e, g.value) ? o && E.value[r.id] === a : !o) || L(r.id, e, g.value);
	}
	function U(e) {
		O.value = {
			type: "seekTo",
			value: e,
			seq: ++k
		};
	}
	function W(e) {
		O.value = {
			type: "seekBy",
			value: e,
			seq: ++k
		};
	}
	function G(e, t = {}) {
		let n = decodeURIComponent(e.split(/[?#]/)[0].split("/").pop() ?? "") || e;
		V({
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
	function K() {
		d.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function q() {
		d.value = !1, i.value && L(i.value.id, f.value, g.value), F(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function J() {
		y.value || (y.value = !0, b.value = !0);
	}
	function Y() {
		b.value && (b.value = !1, y.value = !1);
	}
	function X(e) {
		let t = m(e);
		t !== null && (v.value = t, t > 0 && (y.value = !1, b.value = !1));
	}
	function Z() {
		y.value = !y.value, b.value = !1;
	}
	function ne(e) {
		let t = h(e);
		t !== null && (x.value = t);
	}
	function re(e) {
		S.value = e;
	}
	function ie(e) {
		C.value = e;
	}
	function ae(e) {
		l.value = [...e];
	}
	function Q(e) {
		l.value.push(e);
	}
	function oe(e) {
		let t = l.value.shift() ?? null;
		return t && V(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function se() {
		T.value = !0;
	}
	function ce() {
		T.value = !1;
	}
	function le() {
		i.value && L(i.value.id, f.value, g.value), F(!0), d.value = !1, T.value = !1, i.value = null, a.value = "", w.value = "", typeof navigator < "u" && "mediaSession" in navigator && (navigator.mediaSession.metadata = null);
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
		upNext: te,
		inResumeBand: I,
		saveResume: L,
		resumePositionFor: R,
		clearResume: z,
		mergeServerResume: B,
		setCurrent: V,
		updateProgress: H,
		seekTo: U,
		seekBy: W,
		playLocalFile: G,
		play: K,
		pause: q,
		setVolume: X,
		toggleMute: Z,
		muteForAutoplay: J,
		setRate: ne,
		setQuality: re,
		setSubtitle: ie,
		setQueue: ae,
		enqueue: Q,
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

//# sourceMappingURL=usePlayerStore-D4NTHjZa.js.map