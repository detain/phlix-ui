import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useAuthStore-Co09iQFW.js";
import { n as r, t as i } from "./LoveButton-By5cp7rf.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Chip-2HcSZF4a.js";
import { a as ee, r as te } from "./MetadataMatchModal-DcbN9Cga.js";
import { t as ne } from "./MediaRow-Bbjr9sZ4.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as re, normalizeClass as g, normalizeStyle as ie, onMounted as ae, openBlock as _, ref as v, renderList as y, toDisplayString as b, withCtx as x, withModifiers as oe } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var se = { class: "media-detail" }, ce = { class: "media-detail__bar" }, le = { class: "media-detail__hero" }, ue = { class: "media-detail__poster" }, de = ["src", "alt"], fe = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, pe = { class: "media-detail__info" }, me = { class: "media-detail__title" }, he = { class: "media-detail__meta numeric" }, S = {
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
}, L = { class: "media-detail__people" }, R = ["aria-label", "onClick"], ge = { class: "media-detail__avatar" }, _e = ["src", "alt"], ve = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, ye = { class: "media-detail__person-name" }, be = {
	key: 0,
	class: "media-detail__person-sub"
}, xe = {
	key: 1,
	class: "media-detail__credit-group"
}, Se = { class: "media-detail__people" }, Ce = ["aria-label", "onClick"], we = { class: "media-detail__avatar" }, Te = ["src", "alt"], Ee = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, De = { class: "media-detail__person-name" }, Oe = {
	key: 0,
	class: "media-detail__person-sub"
}, z = /*#__PURE__*/ e(/* @__PURE__ */ h({
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
		"back",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove"
	],
	setup(e, { emit: h }) {
		let z = e, B = h, V = r(), H = re("phlixConfig", null), ke = n(), U = c(() => V.isFavorite(z.item.id));
		function Ae() {
			V.toggleFavorite(z.item.id, H?.apiBase ?? ""), B("watchlist", z.item);
		}
		let je = c(() => V.likeLevel(z.item.id)), W = c(() => ke.isAdmin), Me = c(() => V.isFavorite(z.item.id)), G = v(!1), Ne = c(() => te(z.item, {
			isAdmin: W.value,
			isWatched: Me.value,
			canChoosePoster: W.value
		}));
		function Pe(e) {
			switch (e.label) {
				case "Mark watched":
				case "Mark unwatched":
					B("mark-watched", z.item);
					break;
				case "Refresh/Match…":
					B("refresh", z.item);
					break;
				case "Choose poster…":
					B("choose-poster", z.item);
					break;
				case "Remove":
					B("remove", z.item);
					break;
			}
		}
		function K() {
			V.cycleLove(z.item.id, H?.apiBase ?? "");
		}
		let Fe = c(() => z.item.type === "audio" ? "music" : z.item.type === "image" ? "image" : z.item.type === "series" ? "tv" : "film"), q = c(() => {
			let e = z.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (z.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), J = c(() => {
			let e = z.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : z.item.director ? [{
				name: z.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), Y = c(() => {
			let e = z.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : z.item.studio ? [{
				name: z.item.studio,
				logoUrl: null
			}] : [];
		});
		function X(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let Z = c(() => {
			let e = z.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), Q = v(!1), $ = v(null);
		function Ie() {
			Q.value = !0;
		}
		return ae(() => {
			$.value?.complete && (Q.value = !0);
		}), (n, r) => (_(), d("article", se, [
			e.item.poster_url ? (_(), d("div", {
				key: 0,
				class: "media-detail__ambient",
				style: ie({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : u("", !0),
			f("div", ce, [e.showBack ? (_(), l(a, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => B("back")
			}, {
				default: x(() => [...r[9] ||= [p("Back", -1)]]),
				_: 1
			})) : u("", !0)]),
			f("div", le, [f("div", ue, [e.item.poster_url ? (_(), d("img", {
				key: 0,
				ref_key: "imgEl",
				ref: $,
				class: g(["media-detail__img", { "is-loaded": Q.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: Ie
			}, null, 42, de)) : (_(), d("div", fe, [m(t, { name: Fe.value }, null, 8, ["name"])]))]), f("div", pe, [
				f("h1", me, b(e.item.name), 1),
				f("div", he, [
					e.item.year ? (_(), d("span", S, [m(t, {
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
					onClick: (t) => B("genre", e)
				}, [m(o, { size: "sm" }, {
					default: x(() => [p(b(e), 1)]),
					_: 2
				}, 1024)], 8, D))), 128))])) : u("", !0),
				Y.value.length ? (_(), d("div", O, [r[10] ||= f("span", { class: "media-detail__companies-label" }, "Studios", -1), f("div", k, [(_(!0), d(s, null, y(Y.value, (e) => (_(), d("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => B("company", e.name)
				}, [m(o, { size: "sm" }, {
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
					m(a, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => B("play", e.item)
					}, {
						default: x(() => [...r[11] ||= [p("Play", -1)]]),
						_: 1
					}),
					Z.value ? (_(), l(a, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => B("resume", e.item)
					}, {
						default: x(() => [r[12] ||= p(" Resume ", -1), f("span", P, b(Z.value), 1)]),
						_: 1
					})) : u("", !0),
					m(a, {
						variant: "ghost",
						class: g(["media-detail__favorite", { "is-active": U.value }]),
						"left-icon": U.value ? "bookmark" : "bookmark-plus",
						"aria-label": U.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": U.value ? "true" : "false",
						onClick: Ae
					}, {
						default: x(() => [p(b(U.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					m(i, {
						level: je.value,
						onCycle: K
					}, null, 8, ["level"]),
					m(ee, {
						open: G.value,
						"onUpdate:open": r[4] ||= (e) => G.value = e,
						items: Ne.value,
						onSelect: Pe
					}, {
						default: x(() => [f("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							onClick: r[3] ||= oe(() => {}, ["stop", "prevent"])
						}, [m(t, { name: "more" })])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (_(), l(a, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: r[5] ||= (t) => B("match", e.item)
					}, {
						default: x(() => [...r[13] ||= [p("Match metadata", -1)]]),
						_: 1
					})) : u("", !0)
				]),
				J.value.length || q.value.length ? (_(), d("div", F, [J.value.length ? (_(), d("section", I, [r[14] ||= f("h2", { class: "media-detail__credit-heading" }, "Crew", -1), f("ul", L, [(_(!0), d(s, null, y(J.value, (e, t) => (_(), d("li", { key: `crew-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => B("actor", e.name)
				}, [
					f("span", ge, [e.profileUrl ? (_(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, _e)) : (_(), d("span", ve, b(X(e.name)), 1))]),
					f("span", ye, b(e.name), 1),
					e.sub ? (_(), d("span", be, b(e.sub), 1)) : u("", !0)
				], 8, R)]))), 128))])])) : u("", !0), q.value.length ? (_(), d("section", xe, [r[15] ||= f("h2", { class: "media-detail__credit-heading" }, "Cast", -1), f("ul", Se, [(_(!0), d(s, null, y(q.value, (e, t) => (_(), d("li", { key: `cast-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => B("actor", e.name)
				}, [
					f("span", we, [e.profileUrl ? (_(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Te)) : (_(), d("span", Ee, b(X(e.name)), 1))]),
					f("span", De, b(e.name), 1),
					e.sub ? (_(), d("span", Oe, b(e.sub), 1)) : u("", !0)
				], 8, Ce)]))), 128))])])) : u("", !0)])) : u("", !0)
			])]),
			e.similarLoading || e.similar.length ? (_(), l(ne, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[6] ||= (e) => B("play", e),
				onWatchlist: r[7] ||= (e) => B("watchlist", e),
				onInfo: r[8] ||= (e) => B("info", e)
			}, null, 8, ["items", "loading"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-9943757f"]]);
//#endregion
export { z as t };

//# sourceMappingURL=MediaDetail-D8ocEptF.js.map