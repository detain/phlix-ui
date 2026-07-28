import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-ZHw1Bisb.js";
import { a as n } from "./usePreferencesStore-CFPikE8Z.js";
import { t as r } from "./useMessages-BinKgH9r.js";
import { t as i } from "./client-CkSYnkSD.js";
import { Fragment as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, normalizeClass as p, openBlock as m, ref as h, renderList as g, toDisplayString as _, unref as v } from "vue";
//#region src/composables/useMusicPlayer.ts
var y = 20;
function b(e) {
	let t = n(), r = h(null), a = h(null), s = 0, c = /* @__PURE__ */ new WeakMap();
	function l(e, t) {
		e.src = t, e.load(), c.set(e, t);
	}
	function u(e, t) {
		return c.get(e) === t;
	}
	function d() {
		let e = new Audio();
		return e.preload = "none", e.addEventListener("timeupdate", () => N(e)), e.addEventListener("loadedmetadata", () => P(e)), e.addEventListener("ended", () => F(e)), e;
	}
	function f() {
		return r.value ||= d(), r.value;
	}
	function p() {
		return a.value ||= d(), a.value;
	}
	function m() {
		return s === 0 ? f() : p();
	}
	function g() {
		return s === 0 ? p() : f();
	}
	function _() {
		s = +(s === 0);
	}
	let v = h([]), b = h(null), x = h(-1), S = h(!1), C = h(0), w = h(0), T = h(!1), E = h(null), D = h(!1), O = o(() => x.value >= 0 && x.value < v.value.length - 1), k = o(() => x.value > 0), A = null;
	function j() {
		A !== null && (clearInterval(A), A = null), D.value = !1;
	}
	async function M(t) {
		let n = t.streamUrl;
		if (!n) try {
			n = (await new i({ baseUrl: e.apiBase() }).getTrack(t.id)).streamUrl;
		} catch {
			n = null;
		}
		return n ? /^https?:\/\//.test(n) ? n : `${e.streamBase()}${n}` : "";
	}
	function N(e) {
		if (D.value) {
			e === g() && (C.value = e.currentTime, isFinite(e.duration) && e.duration > 0 && (w.value = e.duration));
			return;
		}
		if (e === m() && (C.value = e.currentTime, t.crossfadeDuration > 0 && O.value && isFinite(e.duration) && e.duration > 0)) {
			let n = e.duration - e.currentTime;
			n > 0 && n <= t.crossfadeDuration && z();
		}
	}
	function P(e) {
		e === m() && isFinite(e.duration) && (w.value = e.duration);
	}
	function F(e) {
		e === m() && (D.value || (O.value ? L(x.value + 1) : S.value = !1));
	}
	async function I(e) {
		let t = v.value[e];
		if (!t) return;
		j();
		let n = m();
		T.value = !0;
		let r = await M(t);
		E.value = r === "" ? "stream-unavailable" : null, l(n, r), n.volume = 1, b.value = t, x.value = e, C.value = 0, w.value = 0, await n.play().catch(() => {}), S.value = !0, T.value = !1, V();
	}
	async function L(e) {
		t.crossfadeDuration > 0 ? await B(e) : await R(e);
	}
	async function R(e) {
		let t = v.value[e];
		if (!t) return;
		j(), T.value = !0;
		let n = await M(t);
		E.value = n === "" ? "stream-unavailable" : null;
		let r = g(), i = m();
		u(r, n) || l(r, n), r.volume = 1, i.pause(), i.currentTime = 0, _(), b.value = t, x.value = e, C.value = 0, w.value = isFinite(r.duration) && r.duration > 0 ? r.duration : 0, await r.play().catch(() => {}), S.value = !0, T.value = !1, V();
	}
	async function z() {
		O.value && await B(x.value + 1);
	}
	async function B(e) {
		let n = v.value[e];
		if (!n || D.value) return;
		A !== null && (clearInterval(A), A = null), D.value = !0;
		let r = m(), i = g();
		T.value = !0;
		let a = await M(n);
		u(i, a) || l(i, a), E.value = a === "" ? "stream-unavailable" : null, i.volume = 0, await i.play().catch(() => {}), T.value = !1, b.value = n, x.value = e, C.value = 0, w.value = isFinite(i.duration) && i.duration > 0 ? i.duration : 0, S.value = !0;
		let o = t.crossfadeDuration, s = Math.max(10, o * 1e3 / y), c = 0;
		A = setInterval(() => {
			c += 1;
			let e = Math.min(1, c / y);
			r.volume = Math.max(0, 1 - e), i.volume = Math.min(1, e), c >= y && (clearInterval(A), A = null, r.pause(), r.currentTime = 0, r.volume = 1, _(), D.value = !1, isFinite(m().duration) && m().duration > 0 && (w.value = m().duration), V());
		}, s);
	}
	async function V() {
		if (!t.gaplessEnabled || !O.value) return;
		let e = v.value[x.value + 1];
		if (!e) return;
		let n = await M(e);
		if (n === "") return;
		let r = g();
		r.preload = "auto", l(r, n);
	}
	function H(e) {
		j(), v.value = [...e], b.value = null, x.value = -1, S.value = !1, C.value = 0, w.value = 0, E.value = null;
	}
	async function U(e) {
		if (e) {
			let t = v.value.findIndex((t) => t.id === e.id);
			if (t === -1) return;
			if (b.value?.id === e.id) {
				await m().play().catch(() => {}), S.value = !0;
				return;
			}
			await I(t);
			return;
		}
		if (b.value) {
			await m().play().catch(() => {}), S.value = !0;
			return;
		}
		v.value.length > 0 && await I(0);
	}
	function W() {
		m().pause(), S.value = !1;
	}
	async function G() {
		S.value ? W() : await U();
	}
	function K() {
		j(), f().pause(), p().pause(), f().src = "", p().src = "", c.set(f(), ""), c.set(p(), ""), S.value = !1, C.value = 0, w.value = 0, b.value = null, x.value = -1;
	}
	async function q() {
		O.value && await L(x.value + 1);
	}
	async function J() {
		k.value && await I(x.value - 1);
	}
	function Y(e) {
		isFinite(e) && e >= 0 && (m().currentTime = e, C.value = e);
	}
	function X() {
		j(), r.value && (r.value.pause(), r.value.src = "", c.set(r.value, "")), a.value && (a.value.pause(), a.value.src = "", c.set(a.value, ""));
	}
	return {
		queue: v,
		currentTrack: b,
		currentIndex: x,
		playing: S,
		position: C,
		duration: w,
		loading: T,
		error: E,
		crossfading: D,
		hasNext: O,
		hasPrev: k,
		loadTracks: H,
		play: U,
		pause: W,
		toggle: G,
		stop: K,
		next: q,
		previous: J,
		seek: Y,
		dispose: X
	};
}
//#endregion
//#region src/components/MusicTrackList.vue?vue&type=script&setup=true&lang.ts
var x = {
	class: "track-list",
	role: "list"
}, S = {
	key: 0,
	class: "track-list__loading"
}, C = {
	key: 1,
	class: "track-list__empty",
	role: "status"
}, w = { class: "track-list__empty-text" }, T = ["aria-label", "onClick"], E = { class: "track-row__num" }, D = { class: "track-row__title" }, O = { class: "track-row__duration" }, k = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "MusicTrackList",
	props: {
		tracks: {},
		playingTrackId: {},
		loading: { type: Boolean }
	},
	emits: ["play"],
	setup(e, { emit: n }) {
		let i = n, { t: o } = r();
		function f(e) {
			return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
		}
		return (n, r) => (m(), c("div", x, [e.loading && e.tracks.length === 0 ? (m(), c("div", S, [(m(), c(a, null, g(8, (e) => l("div", {
			key: e,
			class: "track-skel",
			role: "listitem"
		}, [...r[0] ||= [
			l("div", { class: "track-skel__num" }, null, -1),
			l("div", { class: "track-skel__title" }, null, -1),
			l("div", { class: "track-skel__duration" }, null, -1)
		]])), 64))])) : e.tracks.length === 0 ? (m(), c("div", C, [d(t, {
			name: "music",
			class: "track-list__empty-icon"
		}), l("p", w, _(v(o)("music.noTracks")), 1)])) : (m(!0), c(a, { key: 2 }, g(e.tracks, (n) => (m(), c("div", {
			key: n.id,
			class: p(["track-row", { "is-playing": e.playingTrackId === n.id }]),
			role: "listitem"
		}, [
			l("button", {
				type: "button",
				class: "track-row__play",
				"aria-label": e.playingTrackId === n.id ? v(o)("music.pause") : v(o)("music.play"),
				onClick: (e) => i("play", n)
			}, [d(t, {
				name: e.playingTrackId === n.id ? "pause" : "play",
				class: "track-row__play-icon"
			}, null, 8, ["name"])], 8, T),
			l("span", E, [e.playingTrackId !== n.id && n.trackNumber !== null ? (m(), c(a, { key: 0 }, [u(_(n.trackNumber), 1)], 64)) : s("", !0)]),
			l("span", D, _(n.title), 1),
			l("span", O, _(f(n.durationSecs)), 1)
		], 2))), 128))]));
	}
}), [["__scopeId", "data-v-780a05e1"]]), A = ["aria-label"], j = ["disabled", "aria-label"], M = ["disabled", "aria-label"], N = {
	class: "music-pager__info",
	"data-nav": "info",
	role: "status",
	"aria-live": "polite",
	"aria-atomic": "true"
}, P = { class: "music-pager__range" }, F = {
	key: 0,
	class: "music-pager__jump"
}, I = { class: "music-pager__jump-label" }, L = [
	"value",
	"disabled",
	"aria-controls"
], R = ["value", "aria-current"], z = ["disabled", "aria-label"], B = ["disabled", "aria-label"], V = 1e3, H = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "MusicPager",
	props: {
		offset: {},
		limit: {},
		total: {},
		label: { default: void 0 },
		controls: { default: void 0 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["go"],
	setup(e, { emit: n }) {
		let i = e, f = n, { t: p } = r(), h = o(() => i.limit > 0 ? Math.floor(i.limit) : 1), y = o(() => i.total > 0 ? Math.floor(i.total) : 0), b = o(() => Math.max(1, Math.ceil(y.value / h.value))), x = o(() => Math.min(b.value, Math.max(1, Math.floor(i.offset / h.value) + 1))), S = o(() => x.value > 1), C = o(() => x.value < b.value), w = o(() => b.value > 1 && b.value <= V), T = o(() => y.value === 0 ? 0 : (x.value - 1) * h.value + 1), E = o(() => Math.min(x.value * h.value, y.value)), D = o(() => i.label === void 0 || i.label === "" ? p("music.pagination") : p("music.paginationOf", { label: i.label }));
		function O(e) {
			if (i.disabled) return;
			let t = Math.min(b.value, Math.max(1, Math.floor(e)));
			f("go", (t - 1) * h.value);
		}
		function k(e) {
			let t = Number(e.target.value);
			Number.isFinite(t) && O(t);
		}
		return (n, r) => b.value > 1 ? (m(), c("nav", {
			key: 0,
			class: "music-pager",
			"aria-label": D.value
		}, [
			l("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !S.value,
				"aria-label": v(p)("music.firstPage"),
				"data-nav": "first",
				onClick: r[0] ||= (e) => O(1)
			}, [d(t, {
				name: "chevrons-left",
				class: "music-pager__icon"
			})], 8, j),
			l("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !S.value,
				"aria-label": v(p)("music.prevPage"),
				"data-nav": "prev",
				onClick: r[1] ||= (e) => O(x.value - 1)
			}, [d(t, {
				name: "chevron-left",
				class: "music-pager__icon"
			})], 8, M),
			l("span", N, [u(_(v(p)("music.pageOf", {
				page: x.value,
				pages: b.value
			})) + " ", 1), l("span", P, " · " + _(v(p)("music.showingRange", {
				from: T.value.toLocaleString(),
				to: E.value.toLocaleString(),
				total: y.value.toLocaleString()
			})), 1)]),
			w.value ? (m(), c("label", F, [l("span", I, _(v(p)("music.jumpToPage")), 1), l("select", {
				class: "music-pager__select",
				value: x.value,
				disabled: e.disabled,
				"aria-controls": e.controls,
				"data-nav": "jump",
				onChange: k
			}, [(m(!0), c(a, null, g(b.value, (e) => (m(), c("option", {
				key: e,
				value: e,
				"aria-current": e === x.value ? "page" : void 0
			}, _(e), 9, R))), 128))], 40, L)])) : s("", !0),
			l("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !C.value,
				"aria-label": v(p)("music.nextPage"),
				"data-nav": "next",
				onClick: r[2] ||= (e) => O(x.value + 1)
			}, [d(t, {
				name: "chevron-right",
				class: "music-pager__icon"
			})], 8, z),
			l("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !C.value,
				"aria-label": v(p)("music.lastPage"),
				"data-nav": "last",
				onClick: r[3] ||= (e) => O(b.value)
			}, [d(t, {
				name: "chevrons-right",
				class: "music-pager__icon"
			})], 8, B)
		], 8, A)) : s("", !0);
	}
}), [["__scopeId", "data-v-9e247285"]]), U = { class: "album-card__cover-wrap" }, W = ["src", "alt"], G = {
	key: 1,
	class: "album-card__placeholder"
}, K = { class: "album-card__info" }, q = { class: "album-card__title" }, J = { class: "album-card__meta" }, Y = { class: "album-card__year" }, X = {
	class: "album-card__tracks",
	"data-count": "tracks"
}, Z = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "MusicAlbumCard",
	props: { album: {} },
	emits: ["click"],
	setup(e) {
		let n = e, { t: i } = r(), a = o(() => {
			let e = n.album.totalTracks ?? 0;
			return e === 1 ? i("music.tracksTotalOne") : i("music.tracksTotal", { count: e.toLocaleString() });
		});
		function s(e) {
			return e ? String(e) : "—";
		}
		return (n, r) => (m(), c("button", {
			type: "button",
			class: "album-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.album)
		}, [l("div", U, [e.album.albumArtUrl ? (m(), c("img", {
			key: 0,
			src: e.album.albumArtUrl,
			alt: e.album.title,
			class: "album-card__cover",
			loading: "lazy"
		}, null, 8, W)) : (m(), c("div", G, [d(t, {
			name: "image",
			class: "album-card__placeholder-icon"
		})]))]), l("div", K, [l("span", q, _(e.album.title), 1), l("span", J, [
			l("span", Y, _(s(e.album.year)), 1),
			r[1] ||= l("span", {
				class: "album-card__dot",
				"aria-hidden": "true"
			}, "·", -1),
			l("span", X, _(a.value), 1)
		])])]));
	}
}), [["__scopeId", "data-v-dfe33261"]]);
//#endregion
export { b as i, H as n, k as r, Z as t };

//# sourceMappingURL=MusicAlbumCard-DQzB2-c8.js.map