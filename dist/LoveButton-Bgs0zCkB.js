import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-CXHWLjml.js";
import { f as r, t as i } from "./client-DbgRjcPy.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { computed as o, createElementBlock as s, createVNode as c, defineComponent as l, normalizeClass as u, openBlock as d, ref as f } from "vue";
import { defineStore as p } from "pinia";
//#region src/stores/usePlayerStore.ts
var m = 30, h = .95, g = 5e3, _ = "phlix.resume", v = "phlix.resume.touched", y = 1e7;
function b() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(_);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
function ee() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(v), t = e ? JSON.parse(e) : null;
		return t && typeof t == "object" ? t : {};
	} catch {
		return {};
	}
}
var x = p("phlix-player", () => {
	let e = n(), t = f(null), r = f(""), i = f([]), a = f(!1), s = f(0), c = f(0), l = f(0), u = f(e.defaultVolume), d = f(!1), p = f(1), m = f(e.defaultQuality), h = f(e.defaultSubtitleLang), y = f(!1), x = f(b()), S = f(ee()), C = f(null), w = 0, T = o(() => c.value > 0 ? s.value / c.value : 0), E = o(() => i.value[0] ?? null);
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
				localStorage.setItem(_, JSON.stringify(x.value)), localStorage.setItem(v, JSON.stringify(S.value));
			};
			try {
				e();
			} catch {
				try {
					O(Math.floor(Object.keys(x.value).length * .75)), e();
				} catch {}
			}
		}, n = Date.now() - A;
		clearTimeout(k), e || n >= g ? t() : k = setTimeout(t, g - n);
	}
	function M(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function N(e, t, n) {
		M(t, n) ? (x.value[e] = Math.floor(t), D(e), O(200)) : (delete x.value[e], delete S.value[e]), j();
	}
	function te(e) {
		return e ? x.value[e] ?? null : null;
	}
	function P(e) {
		delete x.value[e], delete S.value[e], j(!0);
	}
	function F(e) {
		let t = !1;
		for (let [n, r] of Object.entries(e)) n && !(n in x.value) && r > 0 && (x.value[n] = Math.floor(r), D(n), t = !0);
		t && (O(200), j(!0));
	}
	function I(e, n = {}) {
		t.value = e, n.streamUrl !== void 0 && (r.value = n.streamUrl), n.resetPosition !== !1 && (s.value = 0, c.value = typeof e.duration == "number" && isFinite(e.duration) && e.duration > 0 ? e.duration : 0, l.value = 0), $(e);
	}
	function L(e, n, r) {
		s.value = e, n !== void 0 && (c.value > 0 ? isFinite(n) && n > c.value && (c.value = n) : c.value = n), r !== void 0 && (l.value = r), t.value && N(t.value.id, e, c.value);
	}
	function R(e) {
		C.value = {
			type: "seekTo",
			value: e,
			seq: ++w
		};
	}
	function z(e) {
		C.value = {
			type: "seekBy",
			value: e,
			seq: ++w
		};
	}
	function B(e, t = {}) {
		I({
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
	function V() {
		a.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function H() {
		a.value = !1, t.value && N(t.value.id, s.value, c.value), j(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function U(e) {
		u.value = Math.min(1, Math.max(0, e)), u.value > 0 && (d.value = !1);
	}
	function W() {
		d.value = !d.value;
	}
	function G(e) {
		p.value = e;
	}
	function K(e) {
		m.value = e;
	}
	function q(e) {
		h.value = e;
	}
	function J(e) {
		i.value = [...e];
	}
	function Y(e) {
		i.value.push(e);
	}
	function X(e) {
		let t = i.value.shift() ?? null;
		return t && I(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function Z() {
		y.value = !0;
	}
	function Q() {
		y.value = !1;
	}
	function ne() {
		t.value && N(t.value.id, s.value, c.value), j(!0), a.value = !1, y.value = !1, t.value = null, r.value = "";
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
				playbackRate: p.value || 1
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
		rate: p,
		quality: m,
		subtitleLang: h,
		miniPlayer: y,
		resumeMap: x,
		lastCommand: C,
		progress: T,
		upNext: E,
		inResumeBand: M,
		saveResume: N,
		resumePositionFor: te,
		clearResume: P,
		mergeServerResume: F,
		setCurrent: I,
		updateProgress: L,
		seekTo: R,
		seekBy: z,
		playLocalFile: B,
		play: V,
		pause: H,
		setVolume: U,
		toggleMute: W,
		setRate: G,
		setQuality: K,
		setSubtitle: q,
		setQueue: J,
		enqueue: Y,
		next: X,
		showMiniPlayer: Z,
		hideMiniPlayer: Q,
		closePlayer: ne,
		setMediaSessionMetadata: $,
		setMediaPositionState: re,
		bindMediaSession: ie,
		seedFromPreferences: ae
	};
}), S = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0
}), C = p("user-item-data", () => {
	let e = f(/* @__PURE__ */ new Map()), t = null;
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
		return e.value.get(t) ?? { ...S };
	}
	function l(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0
		});
	}
	function u(t, n) {
		let r = e.value.get(t) ?? { ...S };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function d(e, t) {
		let i = o(e), s = !i;
		u(e, { favorite: s });
		try {
			let r = n(t);
			s ? await r.addFavorite(e) : await r.removeFavorite(e);
		} catch (t) {
			u(e, { favorite: i });
			let n = s ? "add to" : "remove from";
			a().error(`Failed to ${n} favorites: ${r(t)}`);
		}
	}
	async function p(e, t) {
		let i = s(e), o = (i + 1) % 4;
		u(e, { like_level: o });
		try {
			await n(t).setLikeLevel(e, o);
		} catch (t) {
			u(e, { like_level: i }), a().error(`Failed to set love level: ${r(t)}`);
		}
	}
	function m() {
		e.value = /* @__PURE__ */ new Map(), t = null;
	}
	return {
		entries: e,
		isFavorite: o,
		likeLevel: s,
		get: c,
		hydrate: l,
		toggleFavorite: d,
		cycleLove: p,
		reset: m
	};
}), w = [
	"disabled",
	"aria-label",
	"aria-pressed",
	"data-level"
], T = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "LoveButton",
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
			let e = Math.floor(Number(r.level));
			return !Number.isFinite(e) || e < 0 ? 0 : e > 3 ? 3 : e;
		}), l = o(() => a.value > 0), f = o(() => {
			switch (a.value) {
				case 1: return "Liked — click to like more";
				case 2: return "Really like — click to love";
				case 3: return "Loved — click to clear";
				default: return "Not loved — click to like";
			}
		});
		function p() {
			if (r.disabled) return;
			let e = (a.value + 1) % 4;
			i("cycle", e), i("update:level", e);
		}
		return (n, r) => (d(), s("button", {
			type: "button",
			class: u(["love-button", [`love-button--level-${a.value}`, { "is-loved": l.value }]]),
			disabled: e.disabled,
			"aria-label": f.value,
			"aria-pressed": l.value ? "true" : "false",
			"data-level": a.value,
			onClick: p
		}, [c(t, {
			name: "heart",
			class: "love-button__icon"
		})], 10, w));
	}
}), [["__scopeId", "data-v-d51bcc35"]]);
//#endregion
export { y as a, m as i, C as n, x as o, h as r, T as t };

//# sourceMappingURL=LoveButton-Bgs0zCkB.js.map