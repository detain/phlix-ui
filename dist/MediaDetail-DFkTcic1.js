import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./Button-k7aQagzg.js";
import { t as r } from "./Chip-2HcSZF4a.js";
import { t as i } from "./MediaRow-CK2sjdAi.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, normalizeClass as ee, normalizeStyle as te, onMounted as ne, openBlock as m, ref as h, renderList as g, toDisplayString as _, withCtx as v } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var re = { class: "media-detail" }, y = { class: "media-detail__bar" }, b = { class: "media-detail__hero" }, ie = { class: "media-detail__poster" }, ae = ["src", "alt"], oe = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, se = { class: "media-detail__info" }, ce = { class: "media-detail__title" }, x = { class: "media-detail__meta numeric" }, S = {
	key: 0,
	class: "media-detail__meta-item"
}, C = {
	key: 1,
	class: "media-detail__cert"
}, w = {
	key: 2,
	class: "media-detail__meta-item"
}, T = { class: "media-detail__type" }, E = {
	key: 0,
	class: "media-detail__genres"
}, D = ["aria-label", "onClick"], O = {
	key: 1,
	class: "media-detail__companies"
}, k = { class: "media-detail__company-list" }, A = ["aria-label", "onClick"], j = ["src", "alt"], M = { class: "media-detail__overview" }, N = { class: "media-detail__actions" }, P = { class: "media-detail__resume-at numeric" }, F = {
	key: 2,
	class: "media-detail__credits"
}, I = {
	key: 0,
	class: "media-detail__credit-group"
}, L = { class: "media-detail__people" }, R = ["aria-label", "onClick"], z = { class: "media-detail__avatar" }, le = ["src", "alt"], B = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, V = { class: "media-detail__person-name" }, H = {
	key: 0,
	class: "media-detail__person-sub"
}, U = {
	key: 1,
	class: "media-detail__credit-group"
}, W = { class: "media-detail__people" }, ue = ["aria-label", "onClick"], de = { class: "media-detail__avatar" }, fe = ["src", "alt"], pe = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, me = { class: "media-detail__person-name" }, he = {
	key: 0,
	class: "media-detail__person-sub"
}, G = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		"genre",
		"company",
		"back"
	],
	setup(e, { emit: p }) {
		let G = e, K = p, ge = o(() => G.item.type === "audio" ? "music" : G.item.type === "image" ? "image" : G.item.type === "series" ? "tv" : "film"), q = o(() => {
			let e = G.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (G.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), J = o(() => {
			let e = G.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : G.item.director ? [{
				name: G.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), Y = o(() => {
			let e = G.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : G.item.studio ? [{
				name: G.item.studio,
				logoUrl: null
			}] : [];
		});
		function X(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Z = o(() => {
			let e = G.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), Q = h(!1), $ = h(null);
		function _e() {
			Q.value = !0;
		}
		return ne(() => {
			$.value?.complete && (Q.value = !0);
		}), (o, p) => (m(), l("article", re, [
			e.item.poster_url ? (m(), l("div", {
				key: 0,
				class: "media-detail__ambient",
				style: te({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : c("", !0),
			u("div", y, [e.showBack ? (m(), s(n, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: p[0] ||= (e) => K("back")
			}, {
				default: v(() => [...p[8] ||= [d("Back", -1)]]),
				_: 1
			})) : c("", !0)]),
			u("div", b, [u("div", ie, [e.item.poster_url ? (m(), l("img", {
				key: 0,
				ref_key: "imgEl",
				ref: $,
				class: ee(["media-detail__img", { "is-loaded": Q.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: _e
			}, null, 42, ae)) : (m(), l("div", oe, [f(t, { name: ge.value }, null, 8, ["name"])]))]), u("div", se, [
				u("h1", ce, _(e.item.name), 1),
				u("div", x, [
					e.item.year ? (m(), l("span", S, [f(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), d(_(e.item.year), 1)])) : c("", !0),
					e.item.rating ? (m(), l("span", C, _(e.item.rating), 1)) : c("", !0),
					e.item.runtime ? (m(), l("span", w, _(e.item.runtime) + "m", 1)) : c("", !0),
					u("span", T, _(e.item.type), 1)
				]),
				e.item.genres?.length ? (m(), l("div", E, [(m(!0), l(a, null, g(e.item.genres, (e) => (m(), l("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => K("genre", e)
				}, [f(r, { size: "sm" }, {
					default: v(() => [d(_(e), 1)]),
					_: 2
				}, 1024)], 8, D))), 128))])) : c("", !0),
				Y.value.length ? (m(), l("div", O, [p[9] ||= u("span", { class: "media-detail__companies-label" }, "Studios", -1), u("div", k, [(m(!0), l(a, null, g(Y.value, (e) => (m(), l("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => K("company", e.name)
				}, [f(r, { size: "sm" }, {
					default: v(() => [e.logoUrl ? (m(), l("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, j)) : c("", !0), u("span", null, _(e.name), 1)]),
					_: 2
				}, 1024)], 8, A))), 128))])])) : c("", !0),
				u("p", M, _(e.item.overview || "No overview available."), 1),
				u("div", N, [
					f(n, {
						variant: "solid",
						"left-icon": "play",
						onClick: p[1] ||= (t) => K("play", e.item)
					}, {
						default: v(() => [...p[10] ||= [d("Play", -1)]]),
						_: 1
					}),
					Z.value ? (m(), s(n, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: p[2] ||= (t) => K("resume", e.item)
					}, {
						default: v(() => [p[11] ||= d(" Resume ", -1), u("span", P, _(Z.value), 1)]),
						_: 1
					})) : c("", !0),
					f(n, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: p[3] ||= (t) => K("watchlist", e.item)
					}, {
						default: v(() => [...p[12] ||= [d("Watchlist", -1)]]),
						_: 1
					}),
					e.canMatch ? (m(), s(n, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: p[4] ||= (t) => K("match", e.item)
					}, {
						default: v(() => [...p[13] ||= [d("Match metadata", -1)]]),
						_: 1
					})) : c("", !0)
				]),
				J.value.length || q.value.length ? (m(), l("div", F, [J.value.length ? (m(), l("section", I, [p[14] ||= u("h2", { class: "media-detail__credit-heading" }, "Crew", -1), u("ul", L, [(m(!0), l(a, null, g(J.value, (e, t) => (m(), l("li", { key: `crew-${t}-${e.name}` }, [u("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => K("actor", e.name)
				}, [
					u("span", z, [e.profileUrl ? (m(), l("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, le)) : (m(), l("span", B, _(X(e.name)), 1))]),
					u("span", V, _(e.name), 1),
					e.sub ? (m(), l("span", H, _(e.sub), 1)) : c("", !0)
				], 8, R)]))), 128))])])) : c("", !0), q.value.length ? (m(), l("section", U, [p[15] ||= u("h2", { class: "media-detail__credit-heading" }, "Cast", -1), u("ul", W, [(m(!0), l(a, null, g(q.value, (e, t) => (m(), l("li", { key: `cast-${t}-${e.name}` }, [u("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => K("actor", e.name)
				}, [
					u("span", de, [e.profileUrl ? (m(), l("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, fe)) : (m(), l("span", pe, _(X(e.name)), 1))]),
					u("span", me, _(e.name), 1),
					e.sub ? (m(), l("span", he, _(e.sub), 1)) : c("", !0)
				], 8, ue)]))), 128))])])) : c("", !0)])) : c("", !0)
			])]),
			e.similarLoading || e.similar.length ? (m(), s(i, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: p[5] ||= (e) => K("play", e),
				onWatchlist: p[6] ||= (e) => K("watchlist", e),
				onInfo: p[7] ||= (e) => K("info", e)
			}, null, 8, ["items", "loading"])) : c("", !0)
		]));
	}
}), [["__scopeId", "data-v-2459e0e8"]]);
//#endregion
export { G as t };

//# sourceMappingURL=MediaDetail-DFkTcic1.js.map