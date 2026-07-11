import { a as e } from "./usePreferencesStore-g-d6JBr9.js";
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
	let r = e(), i = n(null), a = n(""), l = n([]), d = n(!1), f = n(0), p = n(0), m = n(0), h = n(r.defaultVolume), g = n(!1), _ = n(1), v = n(r.defaultQuality), y = n(r.defaultSubtitleLang), b = n(""), x = n(!1), S = n(ee()), C = n(u()), w = n(null), T = 0, E = t(() => p.value > 0 ? f.value / p.value : 0), D = t(() => l.value[0] ?? null);
	function O(e) {
		C.value[e] = Date.now();
	}
	function k(e) {
		let t = Object.keys(S.value), n = !1;
		for (let e of Object.keys(C.value)) e in S.value || (delete C.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (C.value[e] ?? 0) - (C.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete S.value[n], delete C.value[n];
		}
		return !0;
	}
	let A, j = 0;
	function M(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			j = Date.now();
			let e = () => {
				localStorage.setItem(s, JSON.stringify(S.value)), localStorage.setItem(c, JSON.stringify(C.value));
			};
			try {
				e();
			} catch {
				try {
					k(Math.floor(Object.keys(S.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - j;
		clearTimeout(A), e || n >= o ? t() : A = setTimeout(t, o - n);
	}
	function N(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function P(e, t, n) {
		if (N(t, n)) {
			let n = !(e in S.value);
			S.value[e] = Math.floor(t), O(e), n && k(200);
		} else delete S.value[e], delete C.value[e];
		M();
	}
	function F(e) {
		return e ? S.value[e] ?? null : null;
	}
	function I(e) {
		delete S.value[e], delete C.value[e], M(!0);
	}
	function L(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in S.value) && r > 0 && (S.value[n] = Math.floor(r), O(n), t = !0);
		t && (k(200), M(!0));
	}
	function R(e, t = {}) {
		i.value = e, t.streamUrl !== void 0 && (a.value = t.streamUrl), t.resetPosition !== !1 && (f.value = 0, p.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, m.value = 0), $(e);
	}
	function z(e, t, n) {
		f.value = e, t !== void 0 && (p.value > 0 ? isFinite(t) && t > p.value && (p.value = t) : p.value = t), n !== void 0 && (m.value = n), i.value && P(i.value.id, e, p.value);
	}
	function B(e) {
		w.value = {
			type: "seekTo",
			value: e,
			seq: ++T
		};
	}
	function V(e) {
		w.value = {
			type: "seekBy",
			value: e,
			seq: ++T
		};
	}
	function H(e, t = {}) {
		R({
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
	function U() {
		d.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function W() {
		d.value = !1, i.value && P(i.value.id, f.value, p.value), M(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function G(e) {
		h.value = Math.min(1, Math.max(0, e)), h.value > 0 && (g.value = !1);
	}
	function K() {
		g.value = !g.value;
	}
	function q(e) {
		_.value = e;
	}
	function J(e) {
		v.value = e;
	}
	function Y(e) {
		y.value = e;
	}
	function X(e) {
		l.value = [...e];
	}
	function Z(e) {
		l.value.push(e);
	}
	function Q(e) {
		let t = l.value.shift() ?? null;
		return t && R(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function te() {
		x.value = !0;
	}
	function ne() {
		x.value = !1;
	}
	function re() {
		i.value && P(i.value.id, f.value, p.value), M(!0), d.value = !1, x.value = !1, i.value = null, a.value = "", b.value = "";
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
	function ie() {
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
	function ae(e) {
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
	function oe() {
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
		hlsMasterUrl: b,
		miniPlayer: x,
		resumeMap: S,
		lastCommand: w,
		progress: E,
		upNext: D,
		inResumeBand: N,
		saveResume: P,
		resumePositionFor: F,
		clearResume: I,
		mergeServerResume: L,
		setCurrent: R,
		updateProgress: z,
		seekTo: B,
		seekBy: V,
		playLocalFile: H,
		play: U,
		pause: W,
		setVolume: G,
		toggleMute: K,
		setRate: q,
		setQuality: J,
		setSubtitle: Y,
		setQueue: X,
		enqueue: Z,
		next: Q,
		showMiniPlayer: te,
		hideMiniPlayer: ne,
		closePlayer: re,
		setMediaSessionMetadata: $,
		setMediaPositionState: ie,
		bindMediaSession: ae,
		seedFromPreferences: oe
	};
});
//#endregion
//#region src/api/media-query.ts
function f(e = {}) {
	let t = new URLSearchParams();
	return e.libraryId && t.set("libraryId", e.libraryId), e.parentId && t.set("parentId", e.parentId), e.topLevel && t.set("topLevel", "1"), e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.companies?.forEach((e) => t.append("companies[]", e)), e.match && t.set("match", e.match), e.minRating !== void 0 && t.set("minRating", String(e.minRating)), e.maxRating !== void 0 && t.set("maxRating", String(e.maxRating)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function p(e, t = {}) {
	return `${e}/api/v1/media?${f(t)}`;
}
//#endregion
export { l as a, i, p as n, d as o, a as r, f as t };

//# sourceMappingURL=media-query-BdY2RILB.js.map