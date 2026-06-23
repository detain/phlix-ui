import { a as e } from "./usePreferencesStore-DkTu9l9P.js";
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
	let r = e(), i = n(null), a = n(""), c = n([]), u = n(!1), d = n(0), f = n(0), p = n(0), m = n(r.defaultVolume), h = n(!1), g = n(1), _ = n(r.defaultQuality), v = n(r.defaultSubtitleLang), y = n(!1), b = n(l()), x = t(() => f.value > 0 ? d.value / f.value : 0), S = t(() => c.value[0] ?? null), C, w = 0;
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
	function A(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in b.value) && r > 0 && (b.value[n] = Math.floor(r), t = !0);
		t && T(!0);
	}
	function j(e, t = {}) {
		i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (d.value = 0, f.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, p.value = 0), K(e);
	}
	function M(e, t, n) {
		d.value = e, t !== void 0 && (f.value > 0 ? isFinite(t) && t > f.value && (f.value = t) : f.value = t), n !== void 0 && (p.value = n), i.value && D(i.value.id, e, f.value);
	}
	function N() {
		u.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function P() {
		u.value = !1, i.value && D(i.value.id, d.value, f.value), T(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function F(e) {
		m.value = Math.min(1, Math.max(0, e)), m.value > 0 && (h.value = !1);
	}
	function I() {
		h.value = !h.value;
	}
	function L(e) {
		g.value = e;
	}
	function R(e) {
		_.value = e;
	}
	function z(e) {
		v.value = e;
	}
	function B(e) {
		c.value = [...e];
	}
	function V(e) {
		c.value.push(e);
	}
	function H(e) {
		let t = c.value.shift() ?? null;
		return t && j(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function U() {
		y.value = !0;
	}
	function W() {
		y.value = !1;
	}
	function G() {
		i.value && D(i.value.id, d.value, f.value), T(!0), u.value = !1, y.value = !1, i.value = null, a.value = "";
	}
	function K(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function q() {
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
	function J(e) {
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
	function Y() {
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
		progress: x,
		upNext: S,
		inResumeBand: E,
		saveResume: D,
		resumePositionFor: O,
		clearResume: k,
		mergeServerResume: A,
		setCurrent: j,
		updateProgress: M,
		play: N,
		pause: P,
		setVolume: F,
		toggleMute: I,
		setRate: L,
		setQuality: R,
		setSubtitle: z,
		setQueue: B,
		enqueue: V,
		next: H,
		showMiniPlayer: U,
		hideMiniPlayer: W,
		closePlayer: G,
		setMediaSessionMetadata: K,
		setMediaPositionState: q,
		bindMediaSession: J,
		seedFromPreferences: Y
	};
});
//#endregion
export { u as i, i as n, c as r, a as t };

//# sourceMappingURL=usePlayerStore-BMGj8146.js.map