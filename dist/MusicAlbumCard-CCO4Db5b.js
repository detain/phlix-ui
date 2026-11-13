import { n as e, t } from "./Icon-55iG1rR7.js";
import { a as n } from "./usePreferencesStore-CQ3hN8jz.js";
import { t as r } from "./useMessages-Ds_MGz5S.js";
import { t as i } from "./client-Bmlfq3Uy.js";
import { t as a } from "./useImageSrc-CSM61b-l.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, normalizeClass as h, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, withCtx as x } from "vue";
import { RouterLink as S, useRouter as C } from "vue-router";
// src/composables/useMusicPlayer.ts
var w = 20;
function T(e) {
	let t = n(), r = _(null), a = _(null), o = 0, c = /* @__PURE__ */ new WeakMap();
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
	function g() {
		o = +(o === 0);
	}
	let v = _([]), y = _(null), b = _(-1), x = _(!1), S = _(0), C = _(0), T = _(!1), E = _(null), D = _(!1), O = s(() => b.value >= 0 && b.value < v.value.length - 1), k = s(() => b.value > 0), A = null;
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
		if (D.value) e === h() && (S.value = e.currentTime, isFinite(e.duration) && e.duration > 0 && (C.value = e.duration));
		else if (e === m() && (S.value = e.currentTime, t.crossfadeDuration > 0 && O.value && isFinite(e.duration) && e.duration > 0)) {
			let n = e.duration - e.currentTime;
			n > 0 && n <= t.crossfadeDuration && V();
		}
	}
	function P(e) {
		e === m() && isFinite(e.duration) && (C.value = e.duration);
	}
	function F(e) {
		e === m() && (D.value || (O.value ? z(b.value + 1) : x.value = !1));
	}
	let I = 0;
	async function L(e, t) {
		await e.play().then(() => !0, () => !1) && t === I && (x.value = !0);
	}
	async function R(e) {
		let t = v.value[e];
		if (!t) return;
		let n = ++I;
		j();
		let r = m();
		T.value = !0;
		let i = await M(t);
		E.value = i === "" ? "stream-unavailable" : null, l(r, i), r.volume = 1, y.value = t, b.value = e, S.value = 0, C.value = 0, await L(r, n), T.value = !1, U();
	}
	async function z(e) {
		t.crossfadeDuration > 0 ? await H(e) : await B(e);
	}
	async function B(e) {
		let t = v.value[e];
		if (!t) return;
		let n = ++I;
		j(), T.value = !0;
		let r = await M(t);
		E.value = r === "" ? "stream-unavailable" : null;
		let i = h(), a = m();
		u(i, r) || l(i, r), i.volume = 1, a.pause(), a.currentTime = 0, g(), y.value = t, b.value = e, S.value = 0, C.value = isFinite(i.duration) && i.duration > 0 ? i.duration : 0, await L(i, n), T.value = !1, U();
	}
	async function V() {
		O.value && await H(b.value + 1);
	}
	async function H(e) {
		let n = v.value[e];
		if (!n || D.value) return;
		let r = ++I;
		A !== null && (clearInterval(A), A = null), D.value = !0;
		let i = m(), a = h();
		T.value = !0;
		let o = await M(n);
		u(a, o) || l(a, o), E.value = o === "" ? "stream-unavailable" : null, a.volume = 0, await L(a, r), T.value = !1, y.value = n, b.value = e, S.value = 0, C.value = isFinite(a.duration) && a.duration > 0 ? a.duration : 0;
		let s = t.crossfadeDuration, c = Math.max(10, s * 1e3 / w), d = 0;
		A = setInterval(() => {
			d += 1;
			let e = Math.min(1, d / w);
			i.volume = Math.max(0, 1 - e), a.volume = Math.min(1, e), d >= w && (clearInterval(A), A = null, i.pause(), i.currentTime = 0, i.volume = 1, g(), D.value = !1, isFinite(m().duration) && m().duration > 0 && (C.value = m().duration), U());
		}, c);
	}
	async function U() {
		if (!t.gaplessEnabled || !O.value) return;
		let e = v.value[b.value + 1];
		if (!e) return;
		let n = await M(e);
		if (n === "") return;
		let r = h();
		r.preload = "auto", l(r, n);
	}
	function W(e) {
		I++, j(), v.value = [...e], y.value = null, b.value = -1, x.value = !1, S.value = 0, C.value = 0, E.value = null;
	}
	async function G(e) {
		if (e) {
			let t = v.value.findIndex((t) => t.id === e.id);
			if (t === -1) return;
			if (y.value?.id === e.id) {
				let e = ++I;
				await L(m(), e);
				return;
			}
			await R(t);
		} else if (y.value) {
			let e = ++I;
			await L(m(), e);
		} else v.value.length > 0 && await R(0);
	}
	function K() {
		I++, m().pause(), x.value = !1;
	}
	async function q() {
		x.value ? K() : await G();
	}
	function J() {
		j(), I++, f().pause(), p().pause(), f().src = "", p().src = "", c.set(f(), ""), c.set(p(), ""), x.value = !1, S.value = 0, C.value = 0, y.value = null, b.value = -1;
	}
	async function Y() {
		O.value && await z(b.value + 1);
	}
	async function X() {
		k.value && await R(b.value - 1);
	}
	function Z(e) {
		isFinite(e) && e >= 0 && (m().currentTime = e, S.value = e);
	}
	function Q() {
		j(), r.value && (r.value.pause(), r.value.src = "", c.set(r.value, "")), a.value && (a.value.pause(), a.value.src = "", c.set(a.value, ""));
	}
	return {
		queue: v,
		currentTrack: y,
		currentIndex: b,
		playing: x,
		position: S,
		duration: C,
		loading: T,
		error: E,
		crossfading: D,
		hasNext: O,
		hasPrev: k,
		loadTracks: W,
		play: G,
		pause: K,
		toggle: q,
		stop: J,
		next: Y,
		previous: X,
		seek: Z,
		dispose: Q
	};
}
// src/components/MusicTrackList.vue?vue&type=script&setup=true&lang.ts
var E = {
	class: "track-list",
	role: "list"
}, D = {
	key: 0,
	class: "track-list__loading"
}, O = {
	key: 1,
	class: "track-list__empty",
	role: "status"
}, k = { class: "track-list__empty-text" }, A = ["aria-label", "onClick"], j = { class: "track-row__num" }, M = { class: "track-row__title" }, N = { class: "track-row__duration" }, P = /*#__PURE__*/ e(/* @__PURE__ */ m({
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
		return (n, r) => (g(), u("div", E, [e.loading && e.tracks.length === 0 ? (g(), u("div", D, [(g(), u(o, null, v(8, (e) => d("div", {
			key: e,
			class: "track-skel",
			role: "listitem"
		}, [...r[0] ||= [
			d("div", { class: "track-skel__num" }, null, -1),
			d("div", { class: "track-skel__title" }, null, -1),
			d("div", { class: "track-skel__duration" }, null, -1)
		]])), 64))])) : e.tracks.length === 0 ? (g(), u("div", O, [p(t, {
			name: "music",
			class: "track-list__empty-icon"
		}), d("p", k, y(b(a)("music.noTracks")), 1)])) : (g(!0), u(o, { key: 2 }, v(e.tracks, (n) => (g(), u("div", {
			key: n.id,
			class: h(["track-row", { "is-playing": e.playingTrackId === n.id }]),
			role: "listitem"
		}, [
			d("button", {
				type: "button",
				class: "track-row__play",
				"aria-label": e.playingTrackId === n.id ? b(a)("music.pause") : b(a)("music.play"),
				onClick: (e) => i("play", n)
			}, [p(t, {
				name: e.playingTrackId === n.id ? "pause" : "play",
				class: "track-row__play-icon"
			}, null, 8, ["name"])], 8, A),
			d("span", j, [e.playingTrackId !== n.id && n.trackNumber !== null ? (g(), u(o, { key: 0 }, [f(y(n.trackNumber), 1)], 64)) : l("", !0)]),
			d("span", M, y(n.title), 1),
			d("span", N, y(s(n.durationSecs)), 1)
		], 2))), 128))]));
	}
}), [["__scopeId", "data-v-780a05e1"]]), F = ["aria-label"], I = ["disabled", "aria-label"], L = ["disabled", "aria-label"], R = {
	class: "music-pager__info",
	"data-nav": "info",
	role: "status",
	"aria-live": "polite",
	"aria-atomic": "true"
}, z = { class: "music-pager__range" }, B = {
	key: 0,
	class: "music-pager__jump"
}, V = { class: "music-pager__jump-label" }, H = [
	"value",
	"disabled",
	"aria-controls"
], U = ["value", "aria-current"], W = ["disabled", "aria-label"], G = ["disabled", "aria-label"], K = 1e3, q = /*#__PURE__*/ e(/* @__PURE__ */ m({
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
		let i = e, a = n, { t: c } = r(), m = s(() => i.limit > 0 ? Math.floor(i.limit) : 1), h = s(() => i.total > 0 ? Math.floor(i.total) : 0), _ = s(() => Math.max(1, Math.ceil(h.value / m.value))), x = s(() => Math.min(_.value, Math.max(1, Math.floor(i.offset / m.value) + 1))), S = s(() => x.value > 1), C = s(() => x.value < _.value), w = s(() => _.value > 1 && _.value <= K), T = s(() => h.value === 0 ? 0 : (x.value - 1) * m.value + 1), E = s(() => Math.min(x.value * m.value, h.value)), D = s(() => i.label === void 0 || i.label === "" ? c("music.pagination") : c("music.paginationOf", { label: i.label }));
		function O(e) {
			if (i.disabled) return;
			let t = Math.min(_.value, Math.max(1, Math.floor(e)));
			a("go", (t - 1) * m.value);
		}
		function k(e) {
			let t = Number(e.target.value);
			Number.isFinite(t) && O(t);
		}
		return (n, r) => _.value > 1 ? (g(), u("nav", {
			key: 0,
			class: "music-pager",
			"aria-label": D.value
		}, [
			d("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !S.value,
				"aria-label": b(c)("music.firstPage"),
				"data-nav": "first",
				onClick: r[0] ||= (e) => O(1)
			}, [p(t, {
				name: "chevrons-left",
				class: "music-pager__icon"
			})], 8, I),
			d("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !S.value,
				"aria-label": b(c)("music.prevPage"),
				"data-nav": "prev",
				onClick: r[1] ||= (e) => O(x.value - 1)
			}, [p(t, {
				name: "chevron-left",
				class: "music-pager__icon"
			})], 8, L),
			d("span", R, [f(y(b(c)("music.pageOf", {
				page: x.value,
				pages: _.value
			})) + " ", 1), d("span", z, " · " + y(b(c)("music.showingRange", {
				from: T.value.toLocaleString(),
				to: E.value.toLocaleString(),
				total: h.value.toLocaleString()
			})), 1)]),
			w.value ? (g(), u("label", B, [d("span", V, y(b(c)("music.jumpToPage")), 1), d("select", {
				class: "music-pager__select",
				value: x.value,
				disabled: e.disabled,
				"aria-controls": e.controls,
				"data-nav": "jump",
				onChange: k
			}, [(g(!0), u(o, null, v(_.value, (e) => (g(), u("option", {
				key: e,
				value: e,
				"aria-current": e === x.value ? "page" : void 0
			}, y(e), 9, U))), 128))], 40, H)])) : l("", !0),
			d("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !C.value,
				"aria-label": b(c)("music.nextPage"),
				"data-nav": "next",
				onClick: r[2] ||= (e) => O(x.value + 1)
			}, [p(t, {
				name: "chevron-right",
				class: "music-pager__icon"
			})], 8, W),
			d("button", {
				type: "button",
				class: "music-pager__btn",
				disabled: e.disabled || !C.value,
				"aria-label": b(c)("music.lastPage"),
				"data-nav": "last",
				onClick: r[3] ||= (e) => O(_.value)
			}, [p(t, {
				name: "chevrons-right",
				class: "music-pager__icon"
			})], 8, G)
		], 8, F)) : l("", !0);
	}
}), [["__scopeId", "data-v-7bd54de3"]]), J = { class: "album-card" }, Y = { class: "album-card__cover-wrap" }, X = ["src", "alt"], Z = {
	key: 1,
	class: "album-card__placeholder"
}, Q = { class: "album-card__info" }, $ = { class: "album-card__title" }, ee = { class: "album-card__meta" }, te = { class: "album-card__year" }, ne = {
	class: "album-card__tracks",
	"data-count": "tracks"
}, re = [
	"href",
	"aria-label",
	"onClick"
], ie = ["aria-label"], ae = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "MusicAlbumCard",
	props: {
		album: {},
		to: {}
	},
	emits: ["click"],
	setup(e) {
		let n = e, i = C(), { t: o } = r(), { imgSrc: l } = a(), f = s(() => {
			let e = n.album.totalTracks ?? 0;
			return o("music.tracksTotal", { count: e.toLocaleString() });
		});
		function m(e) {
			return e ? String(e) : "—";
		}
		return (n, r) => (g(), u("article", J, [
			d("div", Y, [e.album.albumArtUrl ? (g(), u("img", {
				key: 0,
				src: b(l)(e.album.albumArtUrl),
				alt: e.album.title,
				class: "album-card__cover",
				loading: "lazy"
			}, null, 8, X)) : (g(), u("div", Z, [p(t, {
				name: "image",
				class: "album-card__placeholder-icon"
			})]))]),
			d("div", Q, [d("span", $, y(e.album.title), 1), d("span", ee, [
				d("span", te, y(m(e.album.year)), 1),
				r[1] ||= d("span", {
					class: "album-card__dot",
					"aria-hidden": "true"
				}, "·", -1),
				d("span", ne, y(f.value), 1)
			])]),
			e.to && b(i) ? (g(), c(b(S), {
				key: 0,
				to: e.to,
				custom: ""
			}, {
				default: x(({ href: t, navigate: n }) => [d("a", {
					href: t,
					class: "album-card__link",
					"aria-label": e.album.title,
					onClick: n
				}, null, 8, re)]),
				_: 1
			}, 8, ["to"])) : (g(), u("button", {
				key: 1,
				type: "button",
				class: "album-card__link",
				"aria-label": e.album.title,
				onClick: r[0] ||= (t) => n.$emit("click", e.album)
			}, null, 8, ie))
		]));
	}
}), [["__scopeId", "data-v-cbf27ac8"]]);
export { T as i, q as n, P as r, ae as t };

//# sourceMappingURL=MusicAlbumCard-CCO4Db5b.js.map