import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./LoveButton-Cfe3jzXL.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as a } from "./Chip-2HcSZF4a.js";
import { t as o } from "./MediaRow-ZKHK4yir.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ee, normalizeClass as g, normalizeStyle as te, onMounted as ne, openBlock as _, ref as v, renderList as y, toDisplayString as b, withCtx as x } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var S = { class: "media-detail" }, re = { class: "media-detail__bar" }, ie = { class: "media-detail__hero" }, ae = { class: "media-detail__poster" }, oe = ["src", "alt"], se = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, ce = { class: "media-detail__info" }, le = { class: "media-detail__title" }, ue = { class: "media-detail__meta numeric" }, de = {
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
}, L = { class: "media-detail__people" }, R = ["aria-label", "onClick"], z = { class: "media-detail__avatar" }, B = ["src", "alt"], V = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, fe = { class: "media-detail__person-name" }, pe = {
	key: 0,
	class: "media-detail__person-sub"
}, me = {
	key: 1,
	class: "media-detail__credit-group"
}, he = { class: "media-detail__people" }, ge = ["aria-label", "onClick"], _e = { class: "media-detail__avatar" }, ve = ["src", "alt"], ye = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, be = { class: "media-detail__person-name" }, xe = {
	key: 0,
	class: "media-detail__person-sub"
}, H = /*#__PURE__*/ e(/* @__PURE__ */ h({
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
	setup(e, { emit: h }) {
		let H = e, U = h, W = n(), G = ee("phlixConfig", null), K = c(() => W.isFavorite(H.item.id));
		function Se() {
			W.toggleFavorite(H.item.id, G?.apiBase ?? ""), U("watchlist", H.item);
		}
		let Ce = c(() => W.likeLevel(H.item.id));
		function we() {
			W.cycleLove(H.item.id, G?.apiBase ?? "");
		}
		let Te = c(() => H.item.type === "audio" ? "music" : H.item.type === "image" ? "image" : H.item.type === "series" ? "tv" : "film"), q = c(() => {
			let e = H.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (H.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), J = c(() => {
			let e = H.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : H.item.director ? [{
				name: H.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), Y = c(() => {
			let e = H.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : H.item.studio ? [{
				name: H.item.studio,
				logoUrl: null
			}] : [];
		});
		function X(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Z = c(() => {
			let e = H.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), Q = v(!1), $ = v(null);
		function Ee() {
			Q.value = !0;
		}
		return ne(() => {
			$.value?.complete && (Q.value = !0);
		}), (n, c) => (_(), d("article", S, [
			e.item.poster_url ? (_(), d("div", {
				key: 0,
				class: "media-detail__ambient",
				style: te({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : u("", !0),
			f("div", re, [e.showBack ? (_(), l(i, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: c[0] ||= (e) => U("back")
			}, {
				default: x(() => [...c[7] ||= [p("Back", -1)]]),
				_: 1
			})) : u("", !0)]),
			f("div", ie, [f("div", ae, [e.item.poster_url ? (_(), d("img", {
				key: 0,
				ref_key: "imgEl",
				ref: $,
				class: g(["media-detail__img", { "is-loaded": Q.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: Ee
			}, null, 42, oe)) : (_(), d("div", se, [m(t, { name: Te.value }, null, 8, ["name"])]))]), f("div", ce, [
				f("h1", le, b(e.item.name), 1),
				f("div", ue, [
					e.item.year ? (_(), d("span", de, [m(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), p(b(e.item.year), 1)])) : u("", !0),
					e.item.rating ? (_(), d("span", C, b(e.item.rating), 1)) : u("", !0),
					e.item.runtime ? (_(), d("span", w, b(e.item.runtime) + "m", 1)) : u("", !0),
					f("span", T, b(e.item.type), 1)
				]),
				e.item.genres?.length ? (_(), d("div", E, [(_(!0), d(s, null, y(e.item.genres, (e) => (_(), d("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => U("genre", e)
				}, [m(a, { size: "sm" }, {
					default: x(() => [p(b(e), 1)]),
					_: 2
				}, 1024)], 8, D))), 128))])) : u("", !0),
				Y.value.length ? (_(), d("div", O, [c[8] ||= f("span", { class: "media-detail__companies-label" }, "Studios", -1), f("div", k, [(_(!0), d(s, null, y(Y.value, (e) => (_(), d("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => U("company", e.name)
				}, [m(a, { size: "sm" }, {
					default: x(() => [e.logoUrl ? (_(), d("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, j)) : u("", !0), f("span", null, b(e.name), 1)]),
					_: 2
				}, 1024)], 8, A))), 128))])])) : u("", !0),
				f("p", M, b(e.item.overview || "No overview available."), 1),
				f("div", N, [
					m(i, {
						variant: "solid",
						"left-icon": "play",
						onClick: c[1] ||= (t) => U("play", e.item)
					}, {
						default: x(() => [...c[9] ||= [p("Play", -1)]]),
						_: 1
					}),
					Z.value ? (_(), l(i, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: c[2] ||= (t) => U("resume", e.item)
					}, {
						default: x(() => [c[10] ||= p(" Resume ", -1), f("span", P, b(Z.value), 1)]),
						_: 1
					})) : u("", !0),
					m(i, {
						variant: "ghost",
						class: g(["media-detail__favorite", { "is-active": K.value }]),
						"left-icon": K.value ? "bookmark" : "bookmark-plus",
						"aria-label": K.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": K.value ? "true" : "false",
						onClick: Se
					}, {
						default: x(() => [p(b(K.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					m(r, {
						level: Ce.value,
						onCycle: we
					}, null, 8, ["level"]),
					e.canMatch ? (_(), l(i, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: c[3] ||= (t) => U("match", e.item)
					}, {
						default: x(() => [...c[11] ||= [p("Match metadata", -1)]]),
						_: 1
					})) : u("", !0)
				]),
				J.value.length || q.value.length ? (_(), d("div", F, [J.value.length ? (_(), d("section", I, [c[12] ||= f("h2", { class: "media-detail__credit-heading" }, "Crew", -1), f("ul", L, [(_(!0), d(s, null, y(J.value, (e, t) => (_(), d("li", { key: `crew-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => U("actor", e.name)
				}, [
					f("span", z, [e.profileUrl ? (_(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, B)) : (_(), d("span", V, b(X(e.name)), 1))]),
					f("span", fe, b(e.name), 1),
					e.sub ? (_(), d("span", pe, b(e.sub), 1)) : u("", !0)
				], 8, R)]))), 128))])])) : u("", !0), q.value.length ? (_(), d("section", me, [c[13] ||= f("h2", { class: "media-detail__credit-heading" }, "Cast", -1), f("ul", he, [(_(!0), d(s, null, y(q.value, (e, t) => (_(), d("li", { key: `cast-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => U("actor", e.name)
				}, [
					f("span", _e, [e.profileUrl ? (_(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ve)) : (_(), d("span", ye, b(X(e.name)), 1))]),
					f("span", be, b(e.name), 1),
					e.sub ? (_(), d("span", xe, b(e.sub), 1)) : u("", !0)
				], 8, ge)]))), 128))])])) : u("", !0)])) : u("", !0)
			])]),
			e.similarLoading || e.similar.length ? (_(), l(o, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: c[4] ||= (e) => U("play", e),
				onWatchlist: c[5] ||= (e) => U("watchlist", e),
				onInfo: c[6] ||= (e) => U("info", e)
			}, null, 8, ["items", "loading"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-d45bdb9b"]]);
//#endregion
export { H as t };

//# sourceMappingURL=MediaDetail-ClNHZ9Mw.js.map