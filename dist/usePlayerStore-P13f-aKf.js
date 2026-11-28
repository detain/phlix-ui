import { a as e } from "./usePreferencesStore-CQ3hN8jz.js";
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
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t = Math.imul(t ^ e.charCodeAt(n), 16777619) >>> 0;
	return t;
}
function f(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = Math.imul(t, 33) + e.charCodeAt(n) >>> 0;
	return t;
}
function te(e) {
	let t = e.split(/[?#]/)[0], n = t;
	try {
		n = decodeURIComponent(t);
	} catch {}
	return `local-${d(n).toString(36)}-${f(n).toString(36)}`;
}
function p(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(1, Math.max(0, e));
}
function m(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(4, Math.max(.25, e));
}
var h = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), l = n([]), d = n(!1), f = n(0), h = n(0), g = n(0), _ = n(r.defaultVolume), v = n(!1), y = n(!1), b = n(1), x = n(r.defaultQuality), S = n(r.defaultSubtitleLang), C = n(""), w = n(!1), T = n(u()), E = n(ee()), D = n(null), O = 0, k = t(() => h.value > 0 ? f.value / h.value : 0), A = t(() => l.value[0] ?? null);
	function j(e) {
		E.value[e] = Date.now();
	}
	function M(e) {
		let t = Object.keys(T.value), n = !1;
		for (let e of Object.keys(E.value)) e in T.value || (delete E.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (E.value[e] ?? 0) - (E.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete T.value[n], delete E.value[n];
		}
		return !0;
	}
	let N, P = 0;
	function F(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			P = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(T.value)), localStorage.setItem(c, JSON.stringify(E.value));
			};
			try {
				e();
			} catch {
				try {
					M(Math.floor(Object.keys(T.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - P;
		clearTimeout(N), e || n >= o ? t() : N = setTimeout(t, o - n);
	}
	function I(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function L(e, t, n) {
		if (I(t, n)) {
			let n = !(e in T.value);
			T.value[e] = Math.floor(t), j(e), n && M(200);
		} else delete T.value[e], delete E.value[e];
		F();
	}
	function R(e) {
		return e ? T.value[e] ?? null : null;
	}
	function z(e) {
		delete T.value[e], delete E.value[e], F(!0);
	}
	function B(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in T.value) && r > 0 && (T.value[n] = Math.floor(r), j(n), t = !0);
		t && (M(200), F(!0));
	}
	function V(e, t = {}) {
		Y(), i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (f.value = 0, h.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, g.value = 0), $(e);
	}
	function H(e, t, n) {
		f.value = e, t !== void 0 && (h.value > 0 ? isFinite(t) && t > h.value && (h.value = t) : h.value = t), n !== void 0 && (g.value = n), i.value && L(i.value.id, e, h.value);
	}
	function U(e) {
		D.value = {
			type: "seekTo",
			value: e,
			seq: ++O
		};
	}
	function W(e) {
		D.value = {
			type: "seekBy",
			value: e,
			seq: ++O
		};
	}
	function G(e, t = {}) {
		let n = decodeURIComponent(e.split(/[?#]/)[0].split("/").pop() ?? "") || e;
		V({
			id: te(e),
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
		d.value = !1, i.value && L(i.value.id, f.value, h.value), F(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function J() {
		v.value || (v.value = !0, y.value = !0);
	}
	function Y() {
		y.value && (y.value = !1, v.value = !1);
	}
	function X(e) {
		let t = p(e);
		t !== null && (_.value = t, t > 0 && (v.value = !1, y.value = !1));
	}
	function Z() {
		v.value = !v.value, y.value = !1;
	}
	function ne(e) {
		let t = m(e);
		t !== null && (b.value = t);
	}
	function re(e) {
		x.value = e;
	}
	function ie(e) {
		S.value = e;
	}
	function ae(e) {
		l.value = [...e];
	}
	function oe(e) {
		l.value.push(e);
	}
	function se(e) {
		let t = l.value.shift() ?? null;
		return t && V(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function ce() {
		w.value = !0;
	}
	function Q() {
		w.value = !1;
	}
	function le() {
		i.value && L(i.value.id, f.value, h.value), F(!0), d.value = !1, w.value = !1, i.value = null, a.value = "", C.value = "", typeof navigator < "u" && "mediaSession" in navigator && (navigator.mediaSession.metadata = null);
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
		if (typeof e.setPositionState == "function" && h.value > 0 && Number.isFinite(h.value)) try {
			e.setPositionState({
				duration: h.value,
				position: Math.min(Math.max(0, f.value), h.value),
				playbackRate: b.value || 1
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
		let e = p(r.defaultVolume);
		e !== null && (_.value = e), x.value = r.defaultQuality, S.value = r.defaultSubtitleLang;
	}
	return {
		current: i,
		streamUrl: a,
		queue: l,
		playing: d,
		position: f,
		duration: h,
		buffered: g,
		volume: _,
		muted: v,
		autoplayMuted: y,
		rate: b,
		quality: x,
		subtitleLang: S,
		hlsMasterUrl: C,
		miniPlayer: w,
		resumeMap: T,
		lastCommand: D,
		progress: k,
		upNext: A,
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
		enqueue: oe,
		next: se,
		showMiniPlayer: ce,
		hideMiniPlayer: Q,
		closePlayer: le,
		setMediaSessionMetadata: $,
		setMediaPositionState: ue,
		bindMediaSession: de,
		seedFromPreferences: fe
	};
});
export { h as i, i as n, l as r, a as t };

//# sourceMappingURL=usePlayerStore-P13f-aKf.js.map