import { n as e, t } from "./Icon-24ngwBUH.js";
import { t as n } from "./useAuthStore-CUoTkm_k.js";
import { n as r, t as i } from "./ThumbRating-uWe6prMH.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as o } from "./Chip-vZeocErt.js";
import { a as ee, r as te } from "./MetadataMatchModal-DHRbr1am.js";
import { t as ne } from "./MediaRow-CWes3GZB.js";
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
}, _e = {
	key: 2,
	class: "media-detail__meta-item"
}, ve = { class: "media-detail__type" }, ye = {
	key: 0,
	class: "media-detail__genres"
}, C = ["aria-label", "onClick"], w = {
	key: 1,
	class: "media-detail__companies"
}, T = { class: "media-detail__company-list" }, E = ["aria-label", "onClick"], D = ["src", "alt"], O = { class: "media-detail__overview" }, k = { class: "media-detail__actions" }, A = { class: "media-detail__resume-at numeric" }, j = {
	key: 2,
	class: "media-detail__links"
}, M = { class: "media-detail__links-list" }, N = ["href", "aria-label"], P = {
	key: 3,
	class: "media-detail__credits"
}, be = {
	key: 0,
	class: "media-detail__credit-group"
}, xe = { class: "media-detail__people" }, Se = ["aria-label", "onClick"], Ce = { class: "media-detail__avatar" }, we = ["src", "alt"], Te = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Ee = { class: "media-detail__person-name" }, De = {
	key: 0,
	class: "media-detail__person-sub"
}, Oe = {
	key: 1,
	class: "media-detail__credit-group"
}, ke = { class: "media-detail__people" }, Ae = ["aria-label", "onClick"], je = { class: "media-detail__avatar" }, Me = ["src", "alt"], Ne = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Pe = { class: "media-detail__person-name" }, F = {
	key: 0,
	class: "media-detail__person-sub"
}, Fe = {
	key: 2,
	class: "media-detail__files"
}, Ie = { class: "media-detail__files-list" }, Le = { class: "media-detail__file-path" }, Re = { class: "media-detail__file-meta" }, ze = {
	key: 0,
	class: "media-detail__file-container"
}, Be = {
	key: 1,
	class: "media-detail__file-resolution"
}, Ve = { class: "media-detail__file-size" }, I = /*#__PURE__*/ e(/* @__PURE__ */ h({
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
		let I = e, L = h, R = r(), z = re("phlixConfig", null), He = n(), B = c(() => R.isFavorite(I.item.id));
		function Ue() {
			R.toggleFavorite(I.item.id, z?.apiBase ?? ""), L("watchlist", I.item);
		}
		let We = c(() => R.likeLevel(I.item.id)), V = c(() => He.isAdmin), H = c(() => R.isWatched(I.item.id));
		function U() {
			R.toggleWatched(I.item.id, z?.apiBase ?? ""), L("mark-watched", I.item);
		}
		let W = c(() => {
			let e = I.item.external_ids;
			if (!e) return [];
			let t = I.item.type === "movie" ? "movie" : "tv", n = {
				tmdb: {
					label: "TMDB",
					url: (e) => `https://www.themoviedb.org/${t}/${encodeURIComponent(e)}`
				},
				imdb: {
					label: "IMDb",
					url: (e) => `https://www.imdb.com/title/${encodeURIComponent(e)}/`
				},
				tvdb: {
					label: "TheTVDB",
					url: (e) => `https://thetvdb.com/dereferrer/series/${encodeURIComponent(e)}`
				},
				anidb: {
					label: "AniDB",
					url: (e) => `https://anidb.net/anime/${encodeURIComponent(e)}`
				},
				tvmaze: {
					label: "TVmaze",
					url: (e) => `https://www.tvmaze.com/shows/${encodeURIComponent(e)}`
				},
				trakt: {
					label: "Trakt",
					url: (e) => `https://trakt.tv/search/trakt/${encodeURIComponent(e)}`
				}
			}, r = [];
			for (let [t, i] of Object.entries(e)) {
				let e = typeof i == "string" ? i.trim() : i == null ? "" : String(i).trim();
				if (!e) continue;
				let a = n[t.toLowerCase()];
				a && r.push({
					key: t,
					label: a.label,
					url: a.url(e)
				});
			}
			return r;
		}), G = y(!1), Ge = c(() => te(I.item, {
			isAdmin: V.value,
			isWatched: H.value,
			canChoosePoster: V.value
		}));
		function Ke(e) {
			switch (e.label) {
				case "Mark watched":
				case "Mark unwatched":
					U();
					break;
				case "Refresh/Match…":
					L("refresh", I.item);
					break;
				case "Choose poster…":
					L("choose-poster", I.item);
					break;
				case "Remove":
					L("remove", I.item);
					break;
			}
		}
		function qe(e) {
			R.setLike(I.item.id, e, z?.apiBase ?? "");
		}
		let Je = c(() => I.item.type === "audio" ? "music" : I.item.type === "image" ? "image" : I.item.type === "series" ? "tv" : "film"), K = c(() => {
			let e = I.item.cast;
			return e?.length ? e.slice(0, 12).map((e) => ({
				name: e.name,
				sub: e.role ?? null,
				profileUrl: e.profile_url ?? null
			})) : (I.item.actors ?? []).slice(0, 12).map((e) => ({
				name: e,
				sub: null,
				profileUrl: null
			}));
		}), q = c(() => {
			let e = I.item.crew;
			return e?.length ? e.slice(0, 8).map((e) => ({
				name: e.name,
				sub: e.job ?? null,
				profileUrl: e.profile_url ?? null
			})) : I.item.director ? [{
				name: I.item.director,
				sub: "Director",
				profileUrl: null
			}] : [];
		}), J = c(() => {
			let e = I.item.production_companies;
			return e?.length ? e.map((e) => ({
				name: e.name,
				logoUrl: e.logo_url ?? null
			})) : I.item.studio ? [{
				name: I.item.studio,
				logoUrl: null
			}] : [];
		});
		function Y(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		let X = c(() => {
			let e = I.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Ye(e) {
			if (e <= 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = 0, r = e;
			for (; r >= 1024 && n < t.length - 1;) r /= 1024, n++;
			return n === 0 && e >= 960 && (n = 1, r = e / 1024), n > 0 && Math.round(r) === 1 ? `1 ${t[n]}` : `${r.toFixed(+(r < 100))} ${t[n]}`;
		}
		let Z = y(!1), Q = y(null);
		function Xe() {
			Z.value = !0;
		}
		ie(() => {
			Q.value?.complete && (Z.value = !0);
		});
		let $ = c(() => {
			let e = I.item.backdrop_url;
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
				onClick: r[0] ||= (e) => L("back")
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
				onLoad: Xe
			}, null, 42, ue)) : (v(), d("div", de, [m(t, { name: Je.value }, null, 8, ["name"])]))]), f("div", fe, [
				f("h1", pe, x(e.item.name), 1),
				f("div", me, [
					e.item.year ? (v(), d("span", he, [m(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), p(x(e.item.year), 1)])) : u("", !0),
					e.item.rating ? (v(), d("span", ge, x(e.item.rating), 1)) : u("", !0),
					e.item.runtime ? (v(), d("span", _e, x(e.item.runtime) + "m", 1)) : u("", !0),
					f("span", ve, x(e.item.type), 1)
				]),
				e.item.genres?.length ? (v(), d("div", ye, [(v(!0), d(s, null, b(e.item.genres, (e) => (v(), d("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => L("genre", e)
				}, [m(o, { size: "sm" }, {
					default: S(() => [p(x(e), 1)]),
					_: 2
				}, 1024)], 8, C))), 128))])) : u("", !0),
				J.value.length ? (v(), d("div", w, [r[10] ||= f("span", { class: "media-detail__companies-label" }, "Studios", -1), f("div", T, [(v(!0), d(s, null, b(J.value, (e) => (v(), d("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => L("company", e.name)
				}, [m(o, { size: "sm" }, {
					default: S(() => [e.logoUrl ? (v(), d("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, D)) : u("", !0), f("span", null, x(e.name), 1)]),
					_: 2
				}, 1024)], 8, E))), 128))])])) : u("", !0),
				f("p", O, x(e.item.overview || "No overview available."), 1),
				f("div", k, [
					m(a, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => L("play", e.item)
					}, {
						default: S(() => [...r[11] ||= [p("Play", -1)]]),
						_: 1
					}),
					X.value ? (v(), l(a, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => L("resume", e.item)
					}, {
						default: S(() => [r[12] ||= p(" Resume ", -1), f("span", A, x(X.value), 1)]),
						_: 1
					})) : u("", !0),
					m(a, {
						variant: "ghost",
						class: g(["media-detail__favorite", { "is-active": B.value }]),
						"left-icon": B.value ? "bookmark" : "bookmark-plus",
						"aria-label": B.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": B.value ? "true" : "false",
						onClick: Ue
					}, {
						default: S(() => [p(x(B.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					m(a, {
						variant: "ghost",
						class: g(["media-detail__watched", { "is-active": H.value }]),
						"left-icon": H.value ? "eye" : "eye-off",
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: U
					}, {
						default: S(() => [p(x(H.value ? "Watched" : "Mark watched"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					m(i, {
						level: We.value,
						onCycle: qe
					}, null, 8, ["level"]),
					m(ee, {
						open: G.value,
						"onUpdate:open": r[4] ||= (e) => G.value = e,
						items: Ge.value,
						onSelect: Ke
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
						onClick: r[5] ||= (t) => L("match", e.item)
					}, {
						default: S(() => [...r[13] ||= [p("Match metadata", -1)]]),
						_: 1
					})) : u("", !0)
				]),
				W.value.length ? (v(), d("div", j, [r[14] ||= f("span", { class: "media-detail__links-label" }, "Links", -1), f("div", M, [(v(!0), d(s, null, b(W.value, (e) => (v(), d("a", {
					key: e.key,
					class: "media-detail__link",
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [f("span", null, x(e.label), 1), m(t, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, N))), 128))])])) : u("", !0),
				q.value.length || K.value.length ? (v(), d("div", P, [q.value.length ? (v(), d("section", be, [r[15] ||= f("h2", { class: "media-detail__credit-heading" }, "Crew", -1), f("ul", xe, [(v(!0), d(s, null, b(q.value, (e, t) => (v(), d("li", { key: `crew-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => L("actor", e.name)
				}, [
					f("span", Ce, [e.profileUrl ? (v(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, we)) : (v(), d("span", Te, x(Y(e.name)), 1))]),
					f("span", Ee, x(e.name), 1),
					e.sub ? (v(), d("span", De, x(e.sub), 1)) : u("", !0)
				], 8, Se)]))), 128))])])) : u("", !0), K.value.length ? (v(), d("section", Oe, [r[16] ||= f("h2", { class: "media-detail__credit-heading" }, "Cast", -1), f("ul", ke, [(v(!0), d(s, null, b(K.value, (e, t) => (v(), d("li", { key: `cast-${t}-${e.name}` }, [f("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => L("actor", e.name)
				}, [
					f("span", je, [e.profileUrl ? (v(), d("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Me)) : (v(), d("span", Ne, x(Y(e.name)), 1))]),
					f("span", Pe, x(e.name), 1),
					e.sub ? (v(), d("span", F, x(e.sub), 1)) : u("", !0)
				], 8, Ae)]))), 128))])])) : u("", !0)])) : u("", !0)
			])]),
			e.item.files?.length ? (v(), d("section", Fe, [r[17] ||= f("h2", { class: "media-detail__files-heading" }, "Files", -1), f("ul", Ie, [(v(!0), d(s, null, b(e.item.files, (e, t) => (v(), d("li", {
				key: t,
				class: "media-detail__file"
			}, [f("span", Le, x(e.path), 1), f("span", Re, [
				e.container ? (v(), d("span", ze, x(e.container), 1)) : u("", !0),
				e.resolution ? (v(), d("span", Be, x(e.resolution), 1)) : u("", !0),
				f("span", Ve, x(Ye(e.size_bytes)), 1)
			])]))), 128))])])) : u("", !0),
			e.similarLoading || e.similar.length ? (v(), l(ne, {
				key: 3,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[6] ||= (e) => L("play", e),
				onWatchlist: r[7] ||= (e) => L("watchlist", e),
				onInfo: r[8] ||= (e) => L("info", e)
			}, null, 8, ["items", "loading"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-c2d6192f"]]);
//#endregion
export { I as t };

//# sourceMappingURL=MediaDetail-PJdgHgNL.js.map