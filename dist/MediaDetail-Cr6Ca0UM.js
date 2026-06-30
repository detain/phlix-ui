import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./Button-k7aQagzg.js";
import { t as r } from "./Chip-2HcSZF4a.js";
import { a as i, i as ee } from "./MetadataMatchModal-DDiTml_F.js";
import { t as a } from "./MediaRow-DYxCLrLX.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as te, normalizeClass as h, normalizeStyle as ne, onMounted as re, openBlock as g, ref as _, renderList as v, toDisplayString as y, withCtx as b } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var ie = { class: "media-detail" }, ae = { class: "media-detail__bar" }, oe = { class: "media-detail__hero" }, se = { class: "media-detail__poster" }, ce = ["src", "alt"], le = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, ue = { class: "media-detail__info" }, de = { class: "media-detail__title" }, fe = { class: "media-detail__meta numeric" }, x = {
	key: 0,
	class: "media-detail__meta-item"
}, S = {
	key: 1,
	class: "media-detail__cert"
}, C = {
	key: 2,
	class: "media-detail__meta-item"
}, w = { class: "media-detail__type" }, T = {
	key: 0,
	class: "media-detail__genres"
}, E = ["aria-label", "onClick"], D = {
	key: 1,
	class: "media-detail__companies"
}, O = { class: "media-detail__company-list" }, k = ["aria-label", "onClick"], A = ["src", "alt"], j = { class: "media-detail__overview" }, M = { class: "media-detail__actions" }, N = { class: "media-detail__resume-at numeric" }, P = {
	key: 2,
	class: "media-detail__credits"
}, F = {
	key: 0,
	class: "media-detail__credit-group"
}, I = { class: "media-detail__people" }, L = ["aria-label", "onClick"], R = { class: "media-detail__avatar" }, z = ["src", "alt"], B = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, V = { class: "media-detail__person-name" }, pe = {
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
}, H = /*#__PURE__*/ e(/* @__PURE__ */ m({
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
	setup(e, { emit: m }) {
		let H = e, U = m, W = ee(), G = te("phlixConfig", null), K = s(() => W.isFavorite(H.item.id));
		function Se() {
			W.toggleFavorite(H.item.id, G?.apiBase ?? ""), U("watchlist", H.item);
		}
		let Ce = s(() => W.likeLevel(H.item.id));
		function we() {
			W.cycleLove(H.item.id, G?.apiBase ?? "");
		}
		let Te = s(() => H.item.type === "audio" ? "music" : H.item.type === "image" ? "image" : H.item.type === "series" ? "tv" : "film"), q = s(() => {
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
		}), J = s(() => {
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
		}), Y = s(() => {
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
		let Z = s(() => {
			let e = H.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), Q = _(!1), $ = _(null);
		function Ee() {
			Q.value = !0;
		}
		return re(() => {
			$.value?.complete && (Q.value = !0);
		}), (ee, s) => (g(), u("article", ie, [
			e.item.poster_url ? (g(), u("div", {
				key: 0,
				class: "media-detail__ambient",
				style: ne({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : l("", !0),
			d("div", ae, [e.showBack ? (g(), c(n, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: s[0] ||= (e) => U("back")
			}, {
				default: b(() => [...s[7] ||= [f("Back", -1)]]),
				_: 1
			})) : l("", !0)]),
			d("div", oe, [d("div", se, [e.item.poster_url ? (g(), u("img", {
				key: 0,
				ref_key: "imgEl",
				ref: $,
				class: h(["media-detail__img", { "is-loaded": Q.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: Ee
			}, null, 42, ce)) : (g(), u("div", le, [p(t, { name: Te.value }, null, 8, ["name"])]))]), d("div", ue, [
				d("h1", de, y(e.item.name), 1),
				d("div", fe, [
					e.item.year ? (g(), u("span", x, [p(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), f(y(e.item.year), 1)])) : l("", !0),
					e.item.rating ? (g(), u("span", S, y(e.item.rating), 1)) : l("", !0),
					e.item.runtime ? (g(), u("span", C, y(e.item.runtime) + "m", 1)) : l("", !0),
					d("span", w, y(e.item.type), 1)
				]),
				e.item.genres?.length ? (g(), u("div", T, [(g(!0), u(o, null, v(e.item.genres, (e) => (g(), u("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => U("genre", e)
				}, [p(r, { size: "sm" }, {
					default: b(() => [f(y(e), 1)]),
					_: 2
				}, 1024)], 8, E))), 128))])) : l("", !0),
				Y.value.length ? (g(), u("div", D, [s[8] ||= d("span", { class: "media-detail__companies-label" }, "Studios", -1), d("div", O, [(g(!0), u(o, null, v(Y.value, (e) => (g(), u("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => U("company", e.name)
				}, [p(r, { size: "sm" }, {
					default: b(() => [e.logoUrl ? (g(), u("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, A)) : l("", !0), d("span", null, y(e.name), 1)]),
					_: 2
				}, 1024)], 8, k))), 128))])])) : l("", !0),
				d("p", j, y(e.item.overview || "No overview available."), 1),
				d("div", M, [
					p(n, {
						variant: "solid",
						"left-icon": "play",
						onClick: s[1] ||= (t) => U("play", e.item)
					}, {
						default: b(() => [...s[9] ||= [f("Play", -1)]]),
						_: 1
					}),
					Z.value ? (g(), c(n, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: s[2] ||= (t) => U("resume", e.item)
					}, {
						default: b(() => [s[10] ||= f(" Resume ", -1), d("span", N, y(Z.value), 1)]),
						_: 1
					})) : l("", !0),
					p(n, {
						variant: "ghost",
						class: h(["media-detail__favorite", { "is-active": K.value }]),
						"left-icon": K.value ? "bookmark" : "bookmark-plus",
						"aria-label": K.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": K.value ? "true" : "false",
						onClick: Se
					}, {
						default: b(() => [f(y(K.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					p(i, {
						level: Ce.value,
						onCycle: we
					}, null, 8, ["level"]),
					e.canMatch ? (g(), c(n, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: s[3] ||= (t) => U("match", e.item)
					}, {
						default: b(() => [...s[11] ||= [f("Match metadata", -1)]]),
						_: 1
					})) : l("", !0)
				]),
				J.value.length || q.value.length ? (g(), u("div", P, [J.value.length ? (g(), u("section", F, [s[12] ||= d("h2", { class: "media-detail__credit-heading" }, "Crew", -1), d("ul", I, [(g(!0), u(o, null, v(J.value, (e, t) => (g(), u("li", { key: `crew-${t}-${e.name}` }, [d("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => U("actor", e.name)
				}, [
					d("span", R, [e.profileUrl ? (g(), u("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, z)) : (g(), u("span", B, y(X(e.name)), 1))]),
					d("span", V, y(e.name), 1),
					e.sub ? (g(), u("span", pe, y(e.sub), 1)) : l("", !0)
				], 8, L)]))), 128))])])) : l("", !0), q.value.length ? (g(), u("section", me, [s[13] ||= d("h2", { class: "media-detail__credit-heading" }, "Cast", -1), d("ul", he, [(g(!0), u(o, null, v(q.value, (e, t) => (g(), u("li", { key: `cast-${t}-${e.name}` }, [d("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => U("actor", e.name)
				}, [
					d("span", _e, [e.profileUrl ? (g(), u("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ve)) : (g(), u("span", ye, y(X(e.name)), 1))]),
					d("span", be, y(e.name), 1),
					e.sub ? (g(), u("span", xe, y(e.sub), 1)) : l("", !0)
				], 8, ge)]))), 128))])])) : l("", !0)])) : l("", !0)
			])]),
			e.similarLoading || e.similar.length ? (g(), c(a, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: s[4] ||= (e) => U("play", e),
				onWatchlist: s[5] ||= (e) => U("watchlist", e),
				onInfo: s[6] ||= (e) => U("info", e)
			}, null, 8, ["items", "loading"])) : l("", !0)
		]));
	}
}), [["__scopeId", "data-v-d45bdb9b"]]);
//#endregion
export { H as t };

//# sourceMappingURL=MediaDetail-Cr6Ca0UM.js.map