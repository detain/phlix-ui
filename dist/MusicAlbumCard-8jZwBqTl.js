import { n as e, t } from "./Icon-CkTBN_k5.js";
import { a as n } from "./usePreferencesStore-CFPikE8Z.js";
import { t as r } from "./useMessages-CMi9c10n.js";
import { t as i } from "./client-COHWZ2KC.js";
import { t as a } from "./useImageSrc-KnN1T9Ga.js";
import { Fragment as o, computed as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, normalizeClass as m, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y } from "vue";
//#region src/composables/useMusicPlayer.ts
var b = 20;
function x(e) {
	let t = n(), r = g(null), a = g(null), o = 0, c = /* @__PURE__ */ new WeakMap();
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
		return o === 0 ? f() : p();
	}
	function h() {
		return o === 0 ? p() : f();
	}
	function _() {
		o = +(o === 0);
	}
	let v = g([]), y = g(null), x = g(-1), S = g(!1), C = g(0), w = g(0), T = g(!1), E = g(null), D = g(!1), O = s(() => x.value >= 0 && x.value < v.value.length - 1), k = s(() => x.value > 0), A = null;
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
			e === h() && (C.value = e.currentTime, isFinite(e.duration) && e.duration > 0 && (w.value = e.duration));
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
		E.value = r === "" ? "stream-unavailable" : null, l(n, r), n.volume = 1, y.value = t, x.value = e, C.value = 0, w.value = 0, await n.play().catch(() => {}), S.value = !0, T.value = !1, V();
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
		let r = h(), i = m();
		u(r, n) || l(r, n), r.volume = 1, i.pause(), i.currentTime = 0, _(), y.value = t, x.value = e, C.value = 0, w.value = isFinite(r.duration) && r.duration > 0 ? r.duration : 0, await r.play().catch(() => {}), S.value = !0, T.value = !1, V();
	}
	async function z() {
		O.value && await B(x.value + 1);
	}
	async function B(e) {
		let n = v.value[e];
		if (!n || D.value) return;
		A !== null && (clearInterval(A), A = null), D.value = !0;
		let r = m(), i = h();
		T.value = !0;
		let a = await M(n);
		u(i, a) || l(i, a), E.value = a === "" ? "stream-unavailable" : null, i.volume = 0, await i.play().catch(() => {}), T.value = !1, y.value = n, x.value = e, C.value = 0, w.value = isFinite(i.duration) && i.duration > 0 ? i.duration : 0, S.value = !0;
		let o = t.crossfadeDuration, s = Math.max(10, o * 1e3 / b), c = 0;
		A = setInterval(() => {
			c += 1;
			let e = Math.min(1, c / b);
			r.volume = Math.max(0, 1 - e), i.volume = Math.min(1, e), c >= b && (clearInterval(A), A = null, r.pause(), r.currentTime = 0, r.volume = 1, _(), D.value = !1, isFinite(m().duration) && m().duration > 0 && (w.value = m().duration), V());
		}, s);
	}
	async function V() {
		if (!t.gaplessEnabled || !O.value) return;
		let e = v.value[x.value + 1];
		if (!e) return;
		let n = await M(e);
		if (n === "") return;
		let r = h();
		r.preload = "auto", l(r, n);
	}
	function H(e) {
		j(), v.value = [...e], y.value = null, x.value = -1, S.value = !1, C.value = 0, w.value = 0, E.value = null;
	}
	async function U(e) {
		if (e) {
			let t = v.value.findIndex((t) => t.id === e.id);
			if (t === -1) return;
			if (y.value?.id === e.id) {
				await m().play().catch(() => {}), S.value = !0;
				return;
			}
			await I(t);
			return;
		}
		if (y.value) {
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
		j(), f().pause(), p().pause(), f().src = "", p().src = "", c.set(f(), ""), c.set(p(), ""), S.value = !1, C.value = 0, w.value = 0, y.value = null, x.value = -1;
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
		currentTrack: y,
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
var S = {
	class: "track-list",
	role: "list"
}, C = {
	key: 0,
	class: "track-list__loading"
}, w = {
	key: 1,
	class: "track-list__empty",
	role: "status"
}, T = { class: "track-list__empty-text" }, E = ["aria-label", "onClick"], D = { class: "track-row__num" }, O = { class: "track-row__title" }, k = { class: "track-row__duration" }, A = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MusicTrackList",
	props: {
		tracks: {},
		playingTrackId: {},
		loading: { type: Boolean }
	},
	emits: ["play"],
	setup(e, { emit: n }) {
		let i = n, { t: a } = r();
		function s(e) {
			return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, "0")}`;
		}
		return (n, r) => (h(), l("div", S, [e.loading && e.tracks.length === 0 ? (h(), l("div", C, [(h(), l(o, null, _(8, (e) => u("div", {
			key: e,
			class: "track-skel",
			role: "listitem"
		}, [...r[0] ||= [
			u("div", { class: "track-skel__num" }, null, -1),
			u("div", { class: "track-skel__title" }, null, -1),
			u("div", { class: "track-skel__duration" }, null, -1)
		]])), 64))])) : e.tracks.length === 0 ? (h(), l("div", w, [f(t, {
			name: "music",
			class: "track-list__empty-icon"
		}), u("p", T, v(y(a)("music.noTracks")), 1)])) : (h(!0), l(o, { key: 2 }, _(e.tracks, (n) => (h(), l("div", {
			key: n.id,
			class: m(["track-row", { "is-playing": e.playingTrackId === n.id }]),
			role: "listitem"
		}, [
			u("button", {
				type: "button",
				class: "track-row__play",
				"aria-label": e.playingTrackId === n.id ? y(a)("music.pause") : y(a)("music.play"),
				onClick: (e) => i("play", n)
			}, [f(t, {
				name: e.playingTrackId === n.id ? "pause" : "play",
				class: "track-row__play-icon"
			}, null, 8, ["name"])], 8, E),
			u("span", D, [e.playingTrackId !== n.id && n.trackNumber !== null ? (h(), l(o, { key: 0 }, [d(v(n.trackNumber), 1)], 64)) : c("", !0)]),
			u("span", O, v(n.title), 1),
			u("span", k, v(s(n.durationSecs)), 1)
		], 2))), 128))]));
	}
}), [["__scopeId", "data-v-780a05e1"]]), j = ["aria-label"], M = ["disabled", "aria-label"], N = ["disabled", "aria-label"], P = {
	class: "music-pager__info",
	"data-nav": "info",
	role: "status",
	"aria-live": "polite",
	"aria-atomic": "true"
}, F = { class: "music-pager__range" }, I = {
	key: 0,
	class: "music-pager__jump"
}, L = { class: "music-pager__jump-label" }, R = [
	"value",
	"disabled",
	"aria-controls"
], z = ["value", "aria-current"], B = ["disabled", "aria-label"], V = ["disabled", "aria-label"], H = 1e3, U = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		let i = e, a = n, { t: p } = r(), m = s(() => i.limit > 0 ? Math.floor(i.limit) : 1), g = s(() => i.total > 0 ? Math.floor(i.total) : 0), b = s(() => Math.max(1, Math.ceil(g.value / m.value))), x = s(() => Math.min(b.value, Math.max(1, Math.floor(i.offset / m.value) + 1))), S = s(() => x.value > 1), C = s(() => x.value < b.value), w = s(() => b.value > 1 && b.value <= H), T = s(() => g.value === 0 ? 0 : (x.value - 1) * m.value + 1), E = s(() => Math.min(x.value * m.value, g.value)), D = s(() => i.label === void 0 || i.label === "" ? p("music.pagination") : p("music.paginationOf", { label: i.label }));
		function O(e) {
			if (i.disabled) return;
			let t = Math.min(b.value, Math.max(1, Math.floor(e)));
			a("go", (t - 1) * m.value);
		}
		function k(e) {
			let t = Number(e.target.value);
			Number.isFinite(t) && O(t);
		}
		return (n, r) => b.value > 1 ? (h(), l("nav", {
			key: 0,
			class: "music-pager",
			"aria-label": D.value
		}, [
			u("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !S.value,
				"aria-label": y(p)("music.firstPage"),
				"data-nav": "first",
				onClick: r[0] ||= (e) => O(1)
			}, [f(t, {
				name: "chevrons-left",
				class: "music-pager__icon"
			})], 8, M),
			u("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !S.value,
				"aria-label": y(p)("music.prevPage"),
				"data-nav": "prev",
				onClick: r[1] ||= (e) => O(x.value - 1)
			}, [f(t, {
				name: "chevron-left",
				class: "music-pager__icon"
			})], 8, N),
			u("span", P, [d(v(y(p)("music.pageOf", {
				page: x.value,
				pages: b.value
			})) + " ", 1), u("span", F, " · " + v(y(p)("music.showingRange", {
				from: T.value.toLocaleString(),
				to: E.value.toLocaleString(),
				total: g.value.toLocaleString()
			})), 1)]),
			w.value ? (h(), l("label", I, [u("span", L, v(y(p)("music.jumpToPage")), 1), u("select", {
				class: "music-pager__select",
				value: x.value,
				disabled: e.disabled,
				"aria-controls": e.controls,
				"data-nav": "jump",
				onChange: k
			}, [(h(!0), l(o, null, _(b.value, (e) => (h(), l("option", {
				key: e,
				value: e,
				"aria-current": e === x.value ? "page" : void 0
			}, v(e), 9, z))), 128))], 40, R)])) : c("", !0),
			u("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !C.value,
				"aria-label": y(p)("music.nextPage"),
				"data-nav": "next",
				onClick: r[2] ||= (e) => O(x.value + 1)
			}, [f(t, {
				name: "chevron-right",
				class: "music-pager__icon"
			})], 8, B),
			u("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !C.value,
				"aria-label": y(p)("music.lastPage"),
				"data-nav": "last",
				onClick: r[3] ||= (e) => O(b.value)
			}, [f(t, {
				name: "chevrons-right",
				class: "music-pager__icon"
			})], 8, V)
		], 8, j)) : c("", !0);
	}
}), [["__scopeId", "data-v-7bd54de3"]]), W = { class: "album-card__cover-wrap" }, G = ["src", "alt"], K = {
	key: 1,
	class: "album-card__placeholder"
}, q = { class: "album-card__info" }, J = { class: "album-card__title" }, Y = { class: "album-card__meta" }, X = { class: "album-card__year" }, Z = {
	class: "album-card__tracks",
	"data-count": "tracks"
}, Q = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MusicAlbumCard",
	props: { album: {} },
	emits: ["click"],
	setup(e) {
		let n = e, { t: i } = r(), { imgSrc: o } = a(), c = s(() => {
			let e = n.album.totalTracks ?? 0;
			return i("music.tracksTotal", { count: e.toLocaleString() });
		});
		function d(e) {
			return e ? String(e) : "—";
		}
		return (n, r) => (h(), l("button", {
			type: "button",
			class: "album-card",
			onClick: r[0] ||= (t) => n.$emit("click", e.album)
		}, [u("div", W, [e.album.albumArtUrl ? (h(), l("img", {
			key: 0,
			src: y(o)(e.album.albumArtUrl),
			alt: e.album.title,
			class: "album-card__cover",
			loading: "lazy"
		}, null, 8, G)) : (h(), l("div", K, [f(t, {
			name: "image",
			class: "album-card__placeholder-icon"
		})]))]), u("div", q, [u("span", J, v(e.album.title), 1), u("span", Y, [
			u("span", X, v(d(e.album.year)), 1),
			r[1] ||= u("span", {
				class: "album-card__dot",
				"aria-hidden": "true"
			}, "·", -1),
			u("span", Z, v(c.value), 1)
		])])]));
	}
}), [["__scopeId", "data-v-ded693a2"]]);
//#endregion
export { x as i, U as n, A as r, Q as t };

//# sourceMappingURL=MusicAlbumCard-8jZwBqTl.js.map