import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./Button-BwQkyEkr.js";
import { i as r, t as i } from "./MediaRow-Srl6gXC7.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, normalizeClass as m, normalizeStyle as h, onMounted as g, openBlock as _, ref as v, renderList as y, toDisplayString as b, withCtx as x } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var S = { class: "media-detail" }, C = { class: "media-detail__bar" }, w = { class: "media-detail__hero" }, T = { class: "media-detail__poster" }, E = ["src", "alt"], D = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, O = { class: "media-detail__info" }, k = { class: "media-detail__title" }, A = { class: "media-detail__meta numeric" }, j = {
	key: 0,
	class: "media-detail__meta-item"
}, M = {
	key: 1,
	class: "media-detail__cert"
}, N = {
	key: 2,
	class: "media-detail__meta-item"
}, P = { class: "media-detail__type" }, F = {
	key: 0,
	class: "media-detail__genres"
}, I = { class: "media-detail__overview" }, L = { class: "media-detail__actions" }, R = { class: "media-detail__resume-at numeric" }, z = {
	key: 1,
	class: "media-detail__credits"
}, B = {
	key: 0,
	class: "media-detail__credit"
}, V = {
	key: 1,
	class: "media-detail__credit"
}, H = { class: "media-detail__cast" }, U = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "MediaDetail",
	props: {
		item: {},
		resumeSeconds: { default: null },
		similar: { default: () => [] },
		similarLoading: {
			type: Boolean,
			default: !1
		},
		showBack: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"back"
	],
	setup(e, { emit: p }) {
		let U = e, W = p, G = o(() => U.item.type === "audio" ? "music" : U.item.type === "image" ? "image" : U.item.type === "series" ? "tv" : "film"), K = o(() => U.item.actors?.slice(0, 8) ?? []), q = o(() => {
			let e = U.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), J = v(!1), Y = v(null);
		function X() {
			J.value = !0;
		}
		return g(() => {
			Y.value?.complete && (J.value = !0);
		}), (o, p) => (_(), l("article", S, [
			e.item.poster_url ? (_(), l("div", {
				key: 0,
				class: "media-detail__ambient",
				style: h({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : c("", !0),
			u("div", C, [e.showBack ? (_(), s(n, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: p[0] ||= (e) => W("back")
			}, {
				default: x(() => [...p[7] ||= [d("Back", -1)]]),
				_: 1
			})) : c("", !0)]),
			u("div", w, [u("div", T, [e.item.poster_url ? (_(), l("img", {
				key: 0,
				ref_key: "imgEl",
				ref: Y,
				class: m(["media-detail__img", { "is-loaded": J.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: X
			}, null, 42, E)) : (_(), l("div", D, [f(t, { name: G.value }, null, 8, ["name"])]))]), u("div", O, [
				u("h1", k, b(e.item.name), 1),
				u("div", A, [
					e.item.year ? (_(), l("span", j, [f(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), d(b(e.item.year), 1)])) : c("", !0),
					e.item.rating ? (_(), l("span", M, b(e.item.rating), 1)) : c("", !0),
					e.item.runtime ? (_(), l("span", N, b(e.item.runtime) + "m", 1)) : c("", !0),
					u("span", P, b(e.item.type), 1)
				]),
				e.item.genres?.length ? (_(), l("div", F, [(_(!0), l(a, null, y(e.item.genres, (e) => (_(), s(r, {
					key: e,
					size: "sm"
				}, {
					default: x(() => [d(b(e), 1)]),
					_: 2
				}, 1024))), 128))])) : c("", !0),
				u("p", I, b(e.item.overview || "No overview available."), 1),
				u("div", L, [
					f(n, {
						variant: "solid",
						"left-icon": "play",
						onClick: p[1] ||= (t) => W("play", e.item)
					}, {
						default: x(() => [...p[8] ||= [d("Play", -1)]]),
						_: 1
					}),
					q.value ? (_(), s(n, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: p[2] ||= (t) => W("resume", e.item)
					}, {
						default: x(() => [p[9] ||= d(" Resume ", -1), u("span", R, b(q.value), 1)]),
						_: 1
					})) : c("", !0),
					f(n, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: p[3] ||= (t) => W("watchlist", e.item)
					}, {
						default: x(() => [...p[10] ||= [d("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || K.value.length ? (_(), l("dl", z, [e.item.director ? (_(), l("div", B, [p[11] ||= u("dt", null, "Director", -1), u("dd", null, b(e.item.director), 1)])) : c("", !0), K.value.length ? (_(), l("div", V, [p[12] ||= u("dt", null, "Cast", -1), u("dd", H, [(_(!0), l(a, null, y(K.value, (e) => (_(), s(r, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: x(() => [d(b(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : c("", !0)])) : c("", !0)
			])]),
			e.similarLoading || e.similar.length ? (_(), s(i, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: p[4] ||= (e) => W("play", e),
				onWatchlist: p[5] ||= (e) => W("watchlist", e),
				onInfo: p[6] ||= (e) => W("info", e)
			}, null, 8, ["items", "loading"])) : c("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]);
//#endregion
export { U as t };

//# sourceMappingURL=MediaDetail-CnFev6XD.js.map