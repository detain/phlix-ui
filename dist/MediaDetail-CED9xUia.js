import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./Button-k7aQagzg.js";
import { t as r } from "./Chip-2HcSZF4a.js";
import { i } from "./MetadataMatchModal-CIp61Nci.js";
import { t as ee } from "./MediaRow-BGNk2enu.js";
import { Fragment as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, normalizeClass as h, normalizeStyle as te, onMounted as ne, openBlock as g, ref as _, renderList as v, toDisplayString as y, withCtx as b } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var re = { class: "media-detail" }, ie = { class: "media-detail__bar" }, ae = { class: "media-detail__hero" }, oe = { class: "media-detail__poster" }, se = ["src", "alt"], ce = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, le = { class: "media-detail__info" }, ue = { class: "media-detail__title" }, x = { class: "media-detail__meta numeric" }, S = {
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
}, L = { class: "media-detail__people" }, R = ["aria-label", "onClick"], z = { class: "media-detail__avatar" }, B = ["src", "alt"], de = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, V = { class: "media-detail__person-name" }, H = {
	key: 0,
	class: "media-detail__person-sub"
}, fe = {
	key: 1,
	class: "media-detail__credit-group"
}, pe = { class: "media-detail__people" }, me = ["aria-label", "onClick"], he = { class: "media-detail__avatar" }, ge = ["src", "alt"], _e = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, ve = { class: "media-detail__person-name" }, ye = {
	key: 0,
	class: "media-detail__person-sub"
}, U = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		let U = e, W = p, G = i(), be = m("phlixConfig", null), K = o(() => G.isFavorite(U.item.id));
		function xe() {
			G.toggleFavorite(U.item.id, be?.apiBase ?? ""), W("watchlist", U.item);
		}
		let Se = o(() => U.item.type === "audio" ? "music" : U.item.type === "image" ? "image" : U.item.type === "series" ? "tv" : "film"), q = o(() => {
			let e = U.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (U.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), J = o(() => {
			let e = U.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : U.item.director ? [{
				name: U.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), Y = o(() => {
			let e = U.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : U.item.studio ? [{
				name: U.item.studio,
				logoUrl: null
			}] : [];
		});
		function X(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Z = o(() => {
			let e = U.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), Q = _(!1), $ = _(null);
		function Ce() {
			Q.value = !0;
		}
		return ne(() => {
			$.value?.complete && (Q.value = !0);
		}), (i, o) => (g(), l("article", re, [
			e.item.poster_url ? (g(), l("div", {
				key: 0,
				class: "media-detail__ambient",
				style: te({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : c("", !0),
			u("div", ie, [e.showBack ? (g(), s(n, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: o[0] ||= (e) => W("back")
			}, {
				default: b(() => [...o[7] ||= [d("Back", -1)]]),
				_: 1
			})) : c("", !0)]),
			u("div", ae, [u("div", oe, [e.item.poster_url ? (g(), l("img", {
				key: 0,
				ref_key: "imgEl",
				ref: $,
				class: h(["media-detail__img", { "is-loaded": Q.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: Ce
			}, null, 42, se)) : (g(), l("div", ce, [f(t, { name: Se.value }, null, 8, ["name"])]))]), u("div", le, [
				u("h1", ue, y(e.item.name), 1),
				u("div", x, [
					e.item.year ? (g(), l("span", S, [f(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), d(y(e.item.year), 1)])) : c("", !0),
					e.item.rating ? (g(), l("span", C, y(e.item.rating), 1)) : c("", !0),
					e.item.runtime ? (g(), l("span", w, y(e.item.runtime) + "m", 1)) : c("", !0),
					u("span", T, y(e.item.type), 1)
				]),
				e.item.genres?.length ? (g(), l("div", E, [(g(!0), l(a, null, v(e.item.genres, (e) => (g(), l("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => W("genre", e)
				}, [f(r, { size: "sm" }, {
					default: b(() => [d(y(e), 1)]),
					_: 2
				}, 1024)], 8, D))), 128))])) : c("", !0),
				Y.value.length ? (g(), l("div", O, [o[8] ||= u("span", { class: "media-detail__companies-label" }, "Studios", -1), u("div", k, [(g(!0), l(a, null, v(Y.value, (e) => (g(), l("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => W("company", e.name)
				}, [f(r, { size: "sm" }, {
					default: b(() => [e.logoUrl ? (g(), l("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, j)) : c("", !0), u("span", null, y(e.name), 1)]),
					_: 2
				}, 1024)], 8, A))), 128))])])) : c("", !0),
				u("p", M, y(e.item.overview || "No overview available."), 1),
				u("div", N, [
					f(n, {
						variant: "solid",
						"left-icon": "play",
						onClick: o[1] ||= (t) => W("play", e.item)
					}, {
						default: b(() => [...o[9] ||= [d("Play", -1)]]),
						_: 1
					}),
					Z.value ? (g(), s(n, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: o[2] ||= (t) => W("resume", e.item)
					}, {
						default: b(() => [o[10] ||= d(" Resume ", -1), u("span", P, y(Z.value), 1)]),
						_: 1
					})) : c("", !0),
					f(n, {
						variant: "ghost",
						class: h(["media-detail__favorite", { "is-active": K.value }]),
						"left-icon": K.value ? "bookmark" : "bookmark-plus",
						"aria-label": K.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": K.value ? "true" : "false",
						onClick: xe
					}, {
						default: b(() => [d(y(K.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					e.canMatch ? (g(), s(n, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: o[3] ||= (t) => W("match", e.item)
					}, {
						default: b(() => [...o[11] ||= [d("Match metadata", -1)]]),
						_: 1
					})) : c("", !0)
				]),
				J.value.length || q.value.length ? (g(), l("div", F, [J.value.length ? (g(), l("section", I, [o[12] ||= u("h2", { class: "media-detail__credit-heading" }, "Crew", -1), u("ul", L, [(g(!0), l(a, null, v(J.value, (e, t) => (g(), l("li", { key: `crew-${t}-${e.name}` }, [u("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => W("actor", e.name)
				}, [
					u("span", z, [e.profileUrl ? (g(), l("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, B)) : (g(), l("span", de, y(X(e.name)), 1))]),
					u("span", V, y(e.name), 1),
					e.sub ? (g(), l("span", H, y(e.sub), 1)) : c("", !0)
				], 8, R)]))), 128))])])) : c("", !0), q.value.length ? (g(), l("section", fe, [o[13] ||= u("h2", { class: "media-detail__credit-heading" }, "Cast", -1), u("ul", pe, [(g(!0), l(a, null, v(q.value, (e, t) => (g(), l("li", { key: `cast-${t}-${e.name}` }, [u("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => W("actor", e.name)
				}, [
					u("span", he, [e.profileUrl ? (g(), l("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ge)) : (g(), l("span", _e, y(X(e.name)), 1))]),
					u("span", ve, y(e.name), 1),
					e.sub ? (g(), l("span", ye, y(e.sub), 1)) : c("", !0)
				], 8, me)]))), 128))])])) : c("", !0)])) : c("", !0)
			])]),
			e.similarLoading || e.similar.length ? (g(), s(ee, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: o[4] ||= (e) => W("play", e),
				onWatchlist: o[5] ||= (e) => W("watchlist", e),
				onInfo: o[6] ||= (e) => W("info", e)
			}, null, 8, ["items", "loading"])) : c("", !0)
		]));
	}
}), [["__scopeId", "data-v-cd646422"]]);
//#endregion
export { U as t };

//# sourceMappingURL=MediaDetail-CED9xUia.js.map