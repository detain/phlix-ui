import { a as e } from "./usePreferencesStore-BXm_CP7M.js";
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
function d() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(c), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" && !Array.isArray(t) ? t : {};
	} catch {
		return {};
	}
}
function f(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t = Math.imul(t ^ e.charCodeAt(n), 16777619) >>> 0;
	return t;
}
function p(e) {
	let t = 5381;
	for (let n = 0; n < e.length; n++) t = Math.imul(t, 33) + e.charCodeAt(n) >>> 0;
	return t;
}
function ee(e) {
	let t = e.split(/[?#]/)[0], n = t;
	try {
		n = decodeURIComponent(t);
	} catch {}
	return `local-${f(n).toString(36)}-${p(n).toString(36)}`;
}
function m(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(1, Math.max(0, e));
}
function h(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.min(4, Math.max(.25, e));
}
var g = .1;
function _(e) {
	return typeof e != "number" || !Number.isFinite(e) ? null : Math.round(Math.min(10, Math.max(-10, e)) * 10) / 10;
}
var v = r("phlix-player", () => {
	let r = e(), i = n(null), a = n(""), l = n([]), f = n(!1), p = n(0), g = n(0), v = n(0), y = n(r.defaultVolume), b = n(!1), x = n(!1), S = n(1), C = n(r.defaultQuality), w = n(r.defaultSubtitleLang), T = n(_(r.subtitleOffsetSeconds) ?? 0), E = n(_(r.audioOffsetSeconds) ?? 0), D = n(""), O = n(!1), k = n(u()), A = n(d()), j = n(null), M = 0, N = t(() => g.value > 0 ? p.value / g.value : 0), te = t(() => l.value[0] ?? null);
	function P(e) {
		A.value[e] = Date.now();
	}
	function F(e) {
		let t = Object.keys(k.value), n = !1;
		for (let e of Object.keys(A.value)) e in k.value || (delete A.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (A.value[e] ?? 0) - (A.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete k.value[n], delete A.value[n];
		}
		return !0;
	}
	let I, L = 0;
	function R(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			L = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(k.value)), localStorage.setItem(c, JSON.stringify(A.value));
			};
			try {
				e();
			} catch {
				try {
					F(Math.floor(Object.keys(k.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - L;
		e || n >= o ? (clearTimeout(I), I = void 0, t()) : I === void 0 && (I = setTimeout(() => {
			I = void 0, t();
		}, o - n));
	}
	function z(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function B(e, t, n) {
		if (z(t, n)) {
			let n = !(e in k.value);
			k.value[e] = Math.floor(t), P(e), n && F(200);
		} else delete k.value[e], delete A.value[e];
		R();
	}
	function V(e) {
		return e ? k.value[e] ?? null : null;
	}
	function H(e) {
		delete k.value[e], delete A.value[e], R(!0);
	}
	function U(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in k.value) && r > 0 && (k.value[n] = Math.floor(r), P(n), t = !0);
		t && (F(200), R(!0));
	}
	function W(e, t = {}) {
		ne(), i.value && i.value.id !== e.id && (a.value = "", D.value = ""), i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (p.value = 0, g.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, v.value = 0), $(e);
	}
	function G(e, t, n) {
		p.value = e, t !== void 0 && (g.value > 0 ? isFinite(t) && t > g.value && (g.value = t) : g.value = t), n !== void 0 && (v.value = n);
		let r = i.value;
		if (!r) return;
		let a = Math.floor(e), o = r.id in k.value;
		(z(e, g.value) ? o && k.value[r.id] === a : !o) || B(r.id, e, g.value);
	}
	function K(e) {
		j.value = {
			type: "seekTo",
			value: e,
			seq: ++M
		};
	}
	function q(e) {
		j.value = {
			type: "seekBy",
			value: e,
			seq: ++M
		};
	}
	function J(e, t = {}) {
		let n = decodeURIComponent(e.split(/[?#]/)[0].split("/").pop() ?? "") || e;
		W({
			id: ee(e),
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
	function Y() {
		f.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function X() {
		f.value = !1, i.value && B(i.value.id, p.value, g.value), R(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function Z() {
		b.value || (b.value = !0, x.value = !0);
	}
	function ne() {
		x.value && (x.value = !1, b.value = !1);
	}
	function re(e) {
		let t = m(e);
		t !== null && (y.value = t, t > 0 && (b.value = !1, x.value = !1));
	}
	function ie() {
		b.value = !b.value, x.value = !1;
	}
	function ae(e) {
		let t = h(e);
		t !== null && (S.value = t);
	}
	function oe(e) {
		C.value = e;
	}
	function se(e) {
		w.value = e;
	}
	function ce(e) {
		let t = _(e);
		t !== null && (T.value = t, r.subtitleOffsetSeconds = t);
	}
	function Q(e) {
		let t = _(e);
		t !== null && (E.value = t, r.audioOffsetSeconds = t);
	}
	function le(e) {
		l.value = [...e];
	}
	function ue(e) {
		l.value.push(e);
	}
	function de(e) {
		let t = l.value.shift() ?? null;
		return t && W(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function fe() {
		O.value = !0;
	}
	function pe() {
		O.value = !1;
	}
	function me() {
		i.value && B(i.value.id, p.value, g.value), R(!0), f.value = !1, O.value = !1, i.value = null, a.value = "", D.value = "", typeof navigator < "u" && "mediaSession" in navigator && (navigator.mediaSession.metadata = null);
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
	function he() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && g.value > 0 && Number.isFinite(g.value)) try {
			e.setPositionState({
				duration: g.value,
				position: Math.min(Math.max(0, p.value), g.value),
				playbackRate: S.value || 1
			});
		} catch {}
	}
	function ge(e) {
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
	function _e() {
		let e = m(r.defaultVolume);
		e !== null && (y.value = e), C.value = r.defaultQuality, w.value = r.defaultSubtitleLang;
		let t = _(r.subtitleOffsetSeconds);
		t !== null && (T.value = t);
		let n = _(r.audioOffsetSeconds);
		n !== null && (E.value = n);
	}
	return {
		current: i,
		streamUrl: a,
		queue: l,
		playing: f,
		position: p,
		duration: g,
		buffered: v,
		volume: y,
		muted: b,
		autoplayMuted: x,
		rate: S,
		quality: C,
		subtitleLang: w,
		subtitleOffset: T,
		audioOffset: E,
		hlsMasterUrl: D,
		miniPlayer: O,
		resumeMap: k,
		lastCommand: j,
		progress: N,
		upNext: te,
		inResumeBand: z,
		saveResume: B,
		resumePositionFor: V,
		clearResume: H,
		mergeServerResume: U,
		setCurrent: W,
		updateProgress: G,
		seekTo: K,
		seekBy: q,
		playLocalFile: J,
		play: Y,
		pause: X,
		setVolume: re,
		toggleMute: ie,
		muteForAutoplay: Z,
		setRate: ae,
		setQuality: oe,
		setSubtitle: se,
		setSubtitleOffset: ce,
		setAudioOffset: Q,
		setQueue: le,
		enqueue: ue,
		next: de,
		showMiniPlayer: fe,
		hideMiniPlayer: pe,
		closePlayer: me,
		setMediaSessionMetadata: $,
		setMediaPositionState: he,
		bindMediaSession: ge,
		seedFromPreferences: _e
	};
});
export { v as a, l as i, a as n, i as r, g as t };

//# sourceMappingURL=usePlayerStore-CAcZwoN3.js.map