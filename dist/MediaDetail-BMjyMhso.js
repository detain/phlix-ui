import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./Button-C1kpaQyo.js";
import { t as r } from "./Chip-2HcSZF4a.js";
import { t as i } from "./MediaRow-BrjSpOQn.js";
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
}, H = { class: "media-detail__cast" }, U = ["aria-label", "onClick"], W = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		},
		canMatch: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"match",
		"actor",
		"back"
	],
	setup(e, { emit: p }) {
		let W = e, G = p, K = o(() => W.item.type === "audio" ? "music" : W.item.type === "image" ? "image" : W.item.type === "series" ? "tv" : "film"), q = o(() => W.item.actors?.slice(0, 8) ?? []), J = o(() => {
			let e = W.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), Y = v(!1), X = v(null);
		function Z() {
			Y.value = !0;
		}
		return g(() => {
			X.value?.complete && (Y.value = !0);
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
				onClick: p[0] ||= (e) => G("back")
			}, {
				default: x(() => [...p[8] ||= [d("Back", -1)]]),
				_: 1
			})) : c("", !0)]),
			u("div", w, [u("div", T, [e.item.poster_url ? (_(), l("img", {
				key: 0,
				ref_key: "imgEl",
				ref: X,
				class: m(["media-detail__img", { "is-loaded": Y.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: Z
			}, null, 42, E)) : (_(), l("div", D, [f(t, { name: K.value }, null, 8, ["name"])]))]), u("div", O, [
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
						onClick: p[1] ||= (t) => G("play", e.item)
					}, {
						default: x(() => [...p[9] ||= [d("Play", -1)]]),
						_: 1
					}),
					J.value ? (_(), s(n, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: p[2] ||= (t) => G("resume", e.item)
					}, {
						default: x(() => [p[10] ||= d(" Resume ", -1), u("span", R, b(J.value), 1)]),
						_: 1
					})) : c("", !0),
					f(n, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: p[3] ||= (t) => G("watchlist", e.item)
					}, {
						default: x(() => [...p[11] ||= [d("Watchlist", -1)]]),
						_: 1
					}),
					e.canMatch ? (_(), s(n, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: p[4] ||= (t) => G("match", e.item)
					}, {
						default: x(() => [...p[12] ||= [d("Match metadata", -1)]]),
						_: 1
					})) : c("", !0)
				]),
				e.item.director || q.value.length ? (_(), l("dl", z, [e.item.director ? (_(), l("div", B, [p[13] ||= u("dt", null, "Director", -1), u("dd", null, b(e.item.director), 1)])) : c("", !0), q.value.length ? (_(), l("div", V, [p[14] ||= u("dt", null, "Cast", -1), u("dd", H, [(_(!0), l(a, null, y(q.value, (e) => (_(), l("button", {
					key: e,
					type: "button",
					class: "media-detail__actor",
					"aria-label": `Show titles with ${e}`,
					onClick: (t) => G("actor", e)
				}, [f(r, {
					size: "sm",
					icon: "user"
				}, {
					default: x(() => [d(b(e), 1)]),
					_: 2
				}, 1024)], 8, U))), 128))])])) : c("", !0)])) : c("", !0)
			])]),
			e.similarLoading || e.similar.length ? (_(), s(i, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: p[5] ||= (e) => G("play", e),
				onWatchlist: p[6] ||= (e) => G("watchlist", e),
				onInfo: p[7] ||= (e) => G("info", e)
			}, null, 8, ["items", "loading"])) : c("", !0)
		]));
	}
}), [["__scopeId", "data-v-a712affc"]]);
//#endregion
export { W as t };

//# sourceMappingURL=MediaDetail-BMjyMhso.js.map