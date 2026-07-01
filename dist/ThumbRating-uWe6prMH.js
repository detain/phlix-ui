import { n as e, t } from "./Icon-24ngwBUH.js";
import { a as n } from "./usePreferencesStore-DJWQcYN2.js";
import { f as r, t as i } from "./client-fw74f3l_.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { computed as o, createCommentVNode as s, createElementBlock as c, createVNode as l, defineComponent as u, normalizeClass as d, openBlock as f, ref as p } from "vue";
import { defineStore as m } from "pinia";
//#region src/stores/usePlayerStore.ts
var h = 30, g = .95, _ = 5e3, v = "phlix.resume", y = "phlix.resume.touched", b = 1e7;
function x() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(v);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
function S() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(y), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var C = m("phlix-player", () => {
	let e = n(), t = p(null), r = p(""), i = p([]), a = p(!1), s = p(0), c = p(0), l = p(0), u = p(e.defaultVolume), d = p(!1), f = p(1), m = p(e.defaultQuality), h = p(e.defaultSubtitleLang), g = p(!1), b = p(x()), C = p(S()), w = p(null), T = 0, E = o(() => c.value > 0 ? s.value / c.value : 0), D = o(() => i.value[0] ?? null);
	function O(e) {
		C.value[e] = Date.now();
	}
	function k(e) {
		let t = Object.keys(b.value), n = !1;
		for (let e of Object.keys(C.value)) e in b.value || (delete C.value[e], n = !0);
		if (t.length <= e) return n;
		t.sort((e, t) => (C.value[e] ?? 0) - (C.value[t] ?? 0));
		let r = t.length - e;
		for (let e = 0; e < r; e++) {
			let n = t[e];
			delete b.value[n], delete C.value[n];
		}
		return !0;
	}
	let A, j = 0;
	function M(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			j = Date.now();
			let e = () => {
				localStorage.setItem(v, JSON.stringify(b.value)), localStorage.setItem(y, JSON.stringify(C.value));
			};
			try {
				e();
			} catch {
				try {
					k(Math.floor(Object.keys(b.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - j;
		clearTimeout(A), e || n >= _ ? t() : A = setTimeout(t, _ - n);
	}
	function N(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function P(e, t, n) {
		N(t, n) ? (b.value[e] = Math.floor(t), O(e), k(200)) : (delete b.value[e], delete C.value[e]), M();
	}
	function F(e) {
		return e ? b.value[e] ?? null : null;
	}
	function ee(e) {
		delete b.value[e], delete C.value[e], M(!0);
	}
	function I(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in b.value) && r > 0 && (b.value[n] = Math.floor(r), O(n), t = !0);
		t && (k(200), M(!0));
	}
	function L(e, n = {}) {
		t.value = e, n.streamUrl !== void 0 && (r.value = n.streamUrl), n.resetPosition !== !1 && (s.value = 0, c.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, l.value = 0), $(e);
	}
	function R(e, n, r) {
		s.value = e, n !== void 0 && (c.value > 0 ? isFinite(n) && n > c.value && (c.value = n) : c.value = n), r !== void 0 && (l.value = r), t.value && P(t.value.id, e, c.value);
	}
	function z(e) {
		w.value = {
			type: "seekTo",
			value: e,
			seq: ++T
		};
	}
	function B(e) {
		w.value = {
			type: "seekBy",
			value: e,
			seq: ++T
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
		}), i.value = [];
	}
	function H() {
		a.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function U() {
		a.value = !1, t.value && P(t.value.id, s.value, c.value), M(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function W(e) {
		u.value = Math.min(1, Math.max(0, e)), u.value > 0 && (d.value = !1);
	}
	function G() {
		d.value = !d.value;
	}
	function K(e) {
		f.value = e;
	}
	function q(e) {
		m.value = e;
	}
	function J(e) {
		h.value = e;
	}
	function Y(e) {
		i.value = [...e];
	}
	function X(e) {
		i.value.push(e);
	}
	function Z(e) {
		let t = i.value.shift() ?? null;
		return t && L(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function Q() {
		g.value = !0;
	}
	function te() {
		g.value = !1;
	}
	function ne() {
		t.value && P(t.value.id, s.value, c.value), M(!0), a.value = !1, g.value = !1, t.value = null, r.value = "";
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
		if (typeof e.setPositionState == "function" && !(!(c.value > 0) || !Number.isFinite(c.value))) try {
			e.setPositionState({
				duration: c.value,
				position: Math.min(Math.max(0, s.value), c.value),
				playbackRate: f.value || 1
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
		u.value = e.defaultVolume, m.value = e.defaultQuality, h.value = e.defaultSubtitleLang;
	}
	return {
		current: t,
		streamUrl: r,
		queue: i,
		playing: a,
		position: s,
		duration: c,
		buffered: l,
		volume: u,
		muted: d,
		rate: f,
		quality: m,
		subtitleLang: h,
		miniPlayer: g,
		resumeMap: b,
		lastCommand: w,
		progress: E,
		upNext: D,
		inResumeBand: N,
		saveResume: P,
		resumePositionFor: F,
		clearResume: ee,
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
}), w = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), T = m("user-item-data", () => {
	let e = p(/* @__PURE__ */ new Map()), t = null;
	function n(e) {
		return t ? t.setBaseUrl(e) : t = new i({ baseUrl: e }), t;
	}
	function o(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function s(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function c(t) {
		return e.value.get(t)?.watched ?? !1;
	}
	function l(t) {
		return e.value.get(t) ?? { ...w };
	}
	function u(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0,
			watched: n?.watched ?? !1
		});
	}
	function d(t, n) {
		let r = e.value.get(t) ?? { ...w };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function f(e, t) {
		let i = o(e), s = !i;
		d(e, { favorite: s });
		try {
			let r = n(t);
			s ? await r.addFavorite(e) : await r.removeFavorite(e);
		} catch (t) {
			d(e, { favorite: i });
			let n = s ? "add to" : "remove from";
			a().error(`Failed to ${n} favorites: ${r(t)}`);
		}
	}
	async function m(e, t) {
		let i = c(e), o = !i;
		d(e, { watched: o });
		try {
			let r = n(t);
			o ? await r.markWatched(e) : await r.markUnwatched(e);
		} catch (t) {
			d(e, { watched: i });
			let n = o ? "watched" : "unwatched";
			a().error(`Failed to mark ${n}: ${r(t)}`);
		}
	}
	async function h(e, t, i) {
		let o = Math.trunc(Number(t));
		Number.isFinite(o) || (o = 0), o < -2 && (o = -2), o > 2 && (o = 2);
		let c = s(e);
		d(e, { like_level: o });
		try {
			await n(i).setLikeLevel(e, o);
		} catch (t) {
			d(e, { like_level: c }), a().error(`Failed to set rating: ${r(t)}`);
		}
	}
	function g() {
		e.value = /* @__PURE__ */ new Map(), t = null;
	}
	return {
		entries: e,
		isFavorite: o,
		likeLevel: s,
		isWatched: c,
		get: l,
		hydrate: u,
		toggleFavorite: f,
		toggleWatched: m,
		setLike: h,
		reset: g
	};
}), E = ["data-level"], D = ["disabled", "aria-pressed"], O = ["disabled", "aria-pressed"], k = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "ThumbRating",
	props: {
		level: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["cycle", "update:level"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = o(() => {
			let e = Math.trunc(Number(r.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), u = o(() => a.value >= 0), p = o(() => a.value <= 0), m = o(() => a.value >= 1), h = o(() => a.value === 2), g = o(() => a.value <= -1), _ = o(() => a.value === -2);
		function v() {
			return a.value <= 0 ? 1 : a.value === 1 ? 2 : 0;
		}
		function y() {
			return a.value >= 0 ? -1 : a.value === -1 ? -2 : 0;
		}
		function b() {
			if (r.disabled) return;
			let e = v();
			i("cycle", e), i("update:level", e);
		}
		function x() {
			if (r.disabled) return;
			let e = y();
			i("cycle", e), i("update:level", e);
		}
		return (n, r) => (f(), c("div", {
			class: "thumb-rating",
			"data-level": a.value
		}, [u.value ? (f(), c("button", {
			key: 0,
			type: "button",
			class: d(["thumb-rating__btn thumb-rating__btn--up", {
				"is-filled": m.value,
				"is-blue": h.value
			}]),
			disabled: e.disabled,
			"aria-label": "Like",
			"aria-pressed": m.value ? "true" : "false",
			onClick: b
		}, [l(t, {
			name: "thumbs-up",
			class: "thumb-rating__icon"
		})], 10, D)) : s("", !0), p.value ? (f(), c("button", {
			key: 1,
			type: "button",
			class: d(["thumb-rating__btn thumb-rating__btn--down", {
				"is-filled": g.value,
				"is-blue": _.value
			}]),
			disabled: e.disabled,
			"aria-label": "Dislike",
			"aria-pressed": g.value ? "true" : "false",
			onClick: x
		}, [l(t, {
			name: "thumbs-down",
			class: "thumb-rating__icon"
		})], 10, O)) : s("", !0)], 8, E));
	}
}), [["__scopeId", "data-v-1661ae55"]]);
//#endregion
export { b as a, h as i, T as n, C as o, g as r, k as t };

//# sourceMappingURL=ThumbRating-uWe6prMH.js.map