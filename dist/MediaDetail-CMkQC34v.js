import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useAuthStore-HphWxXcO.js";
import { n as r, t as i } from "./LoveButton-BYayoxla.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Chip-2HcSZF4a.js";
import { a as ee, r as te } from "./MetadataMatchModal-Dj5dZnQN.js";
import { t as ne } from "./MediaRow-BdvNwzM4.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as re, normalizeClass as g, normalizeStyle as _, onMounted as ie, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S, withModifiers as ae } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var oe = { class: "media-detail" }, se = { class: "media-detail__bar" }, ce = { class: "media-detail__hero" }, le = { class: "media-detail__poster" }, ue = ["src", "alt"], de = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, fe = { class: "media-detail__info" }, pe = { class: "media-detail__title" }, me = { class: "media-detail__meta numeric" }, he = {
	key: 0,
	class: "media-detail__meta-item"
}, ge = {
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
}, I = { class: "media-detail__people" }, L = ["aria-label", "onClick"], _e = { class: "media-detail__avatar" }, ve = ["src", "alt"], ye = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, be = { class: "media-detail__person-name" }, xe = {
	key: 0,
	class: "media-detail__person-sub"
}, Se = {
	key: 1,
	class: "media-detail__credit-group"
}, Ce = { class: "media-detail__people" }, we = ["aria-label", "onClick"], Te = { class: "media-detail__avatar" }, Ee = ["src", "alt"], De = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Oe = { class: "media-detail__person-name" }, ke = {
	key: 0,
	class: "media-detail__person-sub"
}, R = /*#__PURE__*/ e(/* @__PURE__ */ h({
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
		let R = e, z = h, B = r(), V = re("phlixConfig", null), Ae = n(), H = c(() => B.isFavorite(R.item.id));
		function je() {
			B.toggleFavorite(R.item.id, V?.apiBase ?? ""), z("watchlist", R.item);
		}
		let Me = c(() => B.likeLevel(R.item.id)), U = c(() => Ae.isAdmin), Ne = c(() => B.isFavorite(R.item.id)), W = y(!1), Pe = c(() => te(R.item, {
			isAdmin: U.value,
			isWatched: Ne.value,
			canChoosePoster: U.value
		}));
		function Fe(e) {
			switch (e.label) {
				case "Mark watched":
				case "Mark unwatched":
					z("mark-watched", R.item);
					break;
				case "Refresh/Match…":
					z("refresh", R.item);
					break;
				case "Choose poster…":
					z("choose-poster", R.item);
					break;
				case "Remove":
					z("remove", R.item);
					break;
			}
		}
		function G() {
			B.cycleLove(R.item.id, V?.apiBase ?? "");
		}
		let Ie = c(() => R.item.type === "audio" ? "music" : R.item.type === "image" ? "image" : R.item.type === "series" ? "tv" : "film"), K = c(() => {
			let e = R.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (R.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), q = c(() => {
			let e = R.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : R.item.director ? [{
				name: R.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), J = c(() => {
			let e = R.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : R.item.studio ? [{
				name: R.item.studio,
				logoUrl: null
			}] : [];
		});
		function Y(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let X = c(() => {
			let e = R.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		}), Z = y(!1), Q = y(null);
		function Le() {
			Z.value = !0;
		}
		ie(() => {
			Q.value?.complete && (Z.value = !0);
		});
		let $ = c(() => {
			let e = R.item.backdrop_url;
			return e ? encodeURI(e) : null;
		});
		return (n, r) => (v(), d("article", oe, [
			$.value ? (v(), d("div", {
				key: 0,
				class: "media-detail__backdrop",
				style: _({ backgroundImage: `url(${$.value})` }),
				"aria-hidden": "true"
			}, null, 4)) : u("", !0),
			e.item.poster_url ? (v(), d("div", {
				key: 1,
				class: "media-detail__ambient",
				style: _({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : u("", !0),
			f("div", se, [e.showBack ? (v(), l(a, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => z("back")
			}, {
				default: S(() => [...r[9] ||= [p("Back", -1)]]),
				_: 1
			})) : u("", !0)]),
			f("div", ce, [f("div", le, [e.item.poster_url ? (v(), d("img", {
				key: 0,
				ref_key: "imgEl",
				ref: Q,
				class: g(["media-detail__img", { "is-loaded": Z.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: Le
			}, null, 42, ue)) : (v(), d("div", de, [m(t, { name: Ie.value }, null, 8, ["name"])]))]), f("div", fe, [
				f("h1", pe, x(e.item.name), 1),
				f("div", me, [
					e.item.year ? (v(), d("span", he, [m(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), p(x(e.item.year), 1)])) : u("", !0),
					e.item.rating ? (v(), d("span", ge, x(e.item.rating), 1)) : u("", !0),
					e.item.runtime ? (v(), d("span", C, x(e.item.runtime) + "m", 1)) : u("", !0),
					f("span", w, x(e.item.type), 1)
				]),
				e.item.genres?.length ? (v(), d("div", T, [(v(!0), d(s, null, b(e.item.genres, (e) => (v(), d("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => z("genre", e)
				}, [m(o, { size: "sm" }, {
					default: S(() => [p(x(e), 1)]),
					_: 2
				}, 1024)], 8, E))), 128))])) : u("", !0),
				J.value.length ? (v(), d("div", D, [r[10] ||= f("span", { class: "media-detail__companies-label" }, "Studios", -1), f("div", O, [(v(!0), d(s, null, b(J.value, (e) => (v(), d("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => z("company", e.name)
				}, [m(o, { size: "sm" }, {
					default: S(() => [e.logoUrl ? (v(), d("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, A)) : u("", !0), f("span", null, x(e.name), 1)]),
					_: 2
				}, 1024)], 8, k))), 128))])])) : u("", !0),
				f("p", j, x(e.item.overview || "No overview available."), 1),
				f("div", M, [
					m(a, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => z("play", e.item)
					}, {
						default: S(() => [...r[11] ||= [p("Play", -1)]]),
						_: 1
					}),
					X.value ? (v(), l(a, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => z("resume", e.item)
					}, {
						default: S(() => [r[12] ||= p(" Resume ", -1), f("span", N, x(X.value), 1)]),
						_: 1
					})) : u("", !0),
					m(a, {
						variant: "ghost",
						class: g(["media-detail__favorite", { "is-active": H.value }]),
						"left-icon": H.value ? "bookmark" : "bookmark-plus",
						"aria-label": H.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": H.value ? "true" : "false",
						onClick: je
					}, {
						default: S(() => [p(x(H.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					m(i, {
						level: Me.value,
						onCycle: G
					}, null, 8, ["level"]),
					m(ee, {
						open: W.value,
						"onUpdate:open": r[4] ||= (e) => W.value = e,
						items: Pe.value,
						onSelect: Fe
					}, {
						default: S(() => [f("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							onClick: r[3] ||= ae(() => {}, ["stop", "prevent"])
						}, [m(t, { name: "more" })])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (v(), l(a, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: r[5] ||= (t) => z("match", e.item)
					}, {
						default: S(() => [...r[13] ||= [p("Match metadata", -1)]]),
						_: 1
					})) : u("", !0)
				]),
				q.value.length || K.value.length ? (v(), d("div", P, [q.value.length ? (v(), d("section", F, [r[14] ||= f("h2", { class: "media-detail__credit-heading" }, "Crew", -1), f("ul", I, [(v(!0), d(s, null, b(q.value, (e, t) => (v(), d("li", { key: `crew-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => z("actor", e.name)
				}, [
					f("span", _e, [e.profileUrl ? (v(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, ve)) : (v(), d("span", ye, x(Y(e.name)), 1))]),
					f("span", be, x(e.name), 1),
					e.sub ? (v(), d("span", xe, x(e.sub), 1)) : u("", !0)
				], 8, L)]))), 128))])])) : u("", !0), K.value.length ? (v(), d("section", Se, [r[15] ||= f("h2", { class: "media-detail__credit-heading" }, "Cast", -1), f("ul", Ce, [(v(!0), d(s, null, b(K.value, (e, t) => (v(), d("li", { key: `cast-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => z("actor", e.name)
				}, [
					f("span", Te, [e.profileUrl ? (v(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ee)) : (v(), d("span", De, x(Y(e.name)), 1))]),
					f("span", Oe, x(e.name), 1),
					e.sub ? (v(), d("span", ke, x(e.sub), 1)) : u("", !0)
				], 8, we)]))), 128))])])) : u("", !0)])) : u("", !0)
			])]),
			e.similarLoading || e.similar.length ? (v(), l(ne, {
				key: 2,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[6] ||= (e) => z("play", e),
				onWatchlist: r[7] ||= (e) => z("watchlist", e),
				onInfo: r[8] ||= (e) => z("info", e)
			}, null, 8, ["items", "loading"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-400da50a"]]);
//#endregion
export { R as t };

//# sourceMappingURL=MediaDetail-CMkQC34v.js.map