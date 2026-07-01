import { n as e, t } from "./Icon-24ngwBUH.js";
import { t as n } from "./useAuthStore-CUoTkm_k.js";
import { n as r, t as i } from "./ThumbRating-uWe6prMH.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-CInT03Lp.js";
import { t as s } from "./Chip-vZeocErt.js";
import { i as ee, o as te, r as ne } from "./MetadataMatchModal-ozGAKR2V.js";
import { t as re } from "./MediaRow-BG_zIIQN.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ie, normalizeClass as _, normalizeStyle as v, onMounted as ae, openBlock as y, ref as b, renderList as x, toDisplayString as S, withCtx as C, withModifiers as oe } from "vue";
//#region src/components/MediaDetail.vue?vue&type=script&setup=true&lang.ts
var se = { class: "media-detail" }, ce = { class: "media-detail__bar" }, le = { class: "media-detail__hero" }, ue = { class: "media-detail__poster" }, de = ["src", "alt"], fe = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, pe = { class: "media-detail__info" }, me = { class: "media-detail__title" }, he = { class: "media-detail__meta numeric" }, ge = {
	key: 0,
	class: "media-detail__meta-item"
}, _e = {
	key: 1,
	class: "media-detail__cert"
}, ve = {
	key: 2,
	class: "media-detail__meta-item"
}, ye = { class: "media-detail__type" }, w = {
	key: 0,
	class: "media-detail__genres"
}, T = ["aria-label", "onClick"], E = {
	key: 1,
	class: "media-detail__companies"
}, D = { class: "media-detail__company-list" }, O = ["aria-label", "onClick"], k = ["src", "alt"], A = { class: "media-detail__overview" }, j = { class: "media-detail__actions" }, M = { class: "media-detail__resume-at numeric" }, N = {
	key: 2,
	class: "media-detail__links"
}, P = { class: "media-detail__links-list" }, be = ["href", "aria-label"], xe = {
	key: 3,
	class: "media-detail__credits"
}, Se = {
	key: 0,
	class: "media-detail__credit-group"
}, Ce = { class: "media-detail__people" }, we = ["aria-label", "onClick"], Te = { class: "media-detail__avatar" }, Ee = ["src", "alt"], De = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, Oe = { class: "media-detail__person-name" }, ke = {
	key: 0,
	class: "media-detail__person-sub"
}, Ae = {
	key: 1,
	class: "media-detail__credit-group"
}, je = { class: "media-detail__people" }, Me = ["aria-label", "onClick"], Ne = { class: "media-detail__avatar" }, Pe = ["src", "alt"], Fe = {
	key: 1,
	class: "media-detail__avatar-initials",
	"aria-hidden": "true"
}, F = { class: "media-detail__person-name" }, Ie = {
	key: 0,
	class: "media-detail__person-sub"
}, Le = {
	key: 2,
	class: "media-detail__files"
}, Re = { class: "media-detail__files-list" }, ze = { class: "media-detail__file-path" }, Be = { class: "media-detail__file-meta" }, Ve = {
	key: 0,
	class: "media-detail__file-container"
}, He = {
	key: 1,
	class: "media-detail__file-resolution"
}, Ue = { class: "media-detail__file-size" }, I = /*#__PURE__*/ e(/* @__PURE__ */ g({
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
	setup(e, { emit: g }) {
		let I = e, L = g, R = r(), z = ie("phlixConfig", null), We = n(), B = l(() => R.isFavorite(I.item.id));
		function Ge() {
			R.toggleFavorite(I.item.id, z?.apiBase ?? ""), L("watchlist", I.item);
		}
		let Ke = l(() => R.likeLevel(I.item.id)), V = l(() => We.isAdmin), H = l(() => R.isWatched(I.item.id));
		function U() {
			R.toggleWatched(I.item.id, z?.apiBase ?? ""), L("mark-watched", I.item);
		}
		let W = l(() => {
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
		}), G = b(!1), qe = l(() => I.item.type === "series" || I.item.type === "season"), Je = l(() => ee(I.item, {
			isAdmin: V.value,
			isWatched: H.value,
			isSeriesOrSeason: qe.value,
			canChoosePoster: V.value
		}));
		function Ye(e) {
			let t = ne;
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					U();
					break;
				case t.like:
					R.setLike(I.item.id, 1, z?.apiBase ?? "");
					break;
				case t.dislike:
					R.setLike(I.item.id, -1, z?.apiBase ?? "");
					break;
				case t.refreshMetadata:
				case t.identify:
					L("refresh", I.item);
					break;
				case t.editImages:
					L("choose-poster", I.item);
					break;
				case t.remove:
					L("remove", I.item);
					break;
				default: a().info(`${e.label} isn't available yet`);
			}
		}
		function Xe(e) {
			R.setLike(I.item.id, e, z?.apiBase ?? "");
		}
		let Ze = l(() => I.item.type === "audio" ? "music" : I.item.type === "image" ? "image" : I.item.type === "series" ? "tv" : "film"), K = l(() => {
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
		}), q = l(() => {
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
		}), J = l(() => {
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
		let X = l(() => {
			let e = I.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), r = Math.floor(e % 60), i = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${i}:${String(r).padStart(2, "0")}`;
		});
		function Qe(e) {
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
		let Z = b(!1), Q = b(null);
		function $e() {
			Z.value = !0;
		}
		ae(() => {
			Q.value?.complete && (Z.value = !0);
		});
		let $ = l(() => {
			let e = I.item.backdrop_url;
			return e ? encodeURI(e) : null;
		});
		return (n, r) => (y(), f("article", se, [
			$.value ? (y(), f("div", {
				key: 0,
				class: "media-detail__backdrop",
				style: v({ backgroundImage: `url(${$.value})` }),
				"aria-hidden": "true"
			}, null, 4)) : d("", !0),
			e.item.poster_url ? (y(), f("div", {
				key: 1,
				class: "media-detail__ambient",
				style: v({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : d("", !0),
			p("div", ce, [e.showBack ? (y(), u(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => L("back")
			}, {
				default: C(() => [...r[9] ||= [m("Back", -1)]]),
				_: 1
			})) : d("", !0)]),
			p("div", le, [p("div", ue, [e.item.poster_url ? (y(), f("img", {
				key: 0,
				ref_key: "imgEl",
				ref: Q,
				class: _(["media-detail__img", { "is-loaded": Z.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: $e
			}, null, 42, de)) : (y(), f("div", fe, [h(t, { name: Ze.value }, null, 8, ["name"])]))]), p("div", pe, [
				p("h1", me, S(e.item.name), 1),
				p("div", he, [
					e.item.year ? (y(), f("span", ge, [h(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), m(S(e.item.year), 1)])) : d("", !0),
					e.item.rating ? (y(), f("span", _e, S(e.item.rating), 1)) : d("", !0),
					e.item.runtime ? (y(), f("span", ve, S(e.item.runtime) + "m", 1)) : d("", !0),
					p("span", ye, S(e.item.type), 1)
				]),
				e.item.genres?.length ? (y(), f("div", w, [(y(!0), f(c, null, x(e.item.genres, (e) => (y(), f("button", {
					key: e,
					type: "button",
					class: "media-detail__genre",
					"aria-label": `Show ${e} titles`,
					onClick: (t) => L("genre", e)
				}, [h(s, { size: "sm" }, {
					default: C(() => [m(S(e), 1)]),
					_: 2
				}, 1024)], 8, T))), 128))])) : d("", !0),
				J.value.length ? (y(), f("div", E, [r[10] ||= p("span", { class: "media-detail__companies-label" }, "Studios", -1), p("div", D, [(y(!0), f(c, null, x(J.value, (e) => (y(), f("button", {
					key: e.name,
					type: "button",
					class: "media-detail__company",
					"aria-label": `Show ${e.name} titles`,
					onClick: (t) => L("company", e.name)
				}, [h(s, { size: "sm" }, {
					default: C(() => [e.logoUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__company-logo",
						src: e.logoUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, k)) : d("", !0), p("span", null, S(e.name), 1)]),
					_: 2
				}, 1024)], 8, O))), 128))])])) : d("", !0),
				p("p", A, S(e.item.overview || "No overview available."), 1),
				p("div", j, [
					h(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => L("play", e.item)
					}, {
						default: C(() => [...r[11] ||= [m("Play", -1)]]),
						_: 1
					}),
					X.value ? (y(), u(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => L("resume", e.item)
					}, {
						default: C(() => [r[12] ||= m(" Resume ", -1), p("span", M, S(X.value), 1)]),
						_: 1
					})) : d("", !0),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__favorite", { "is-active": B.value }]),
						"left-icon": B.value ? "bookmark" : "bookmark-plus",
						"aria-label": B.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": B.value ? "true" : "false",
						onClick: Ge
					}, {
						default: C(() => [m(S(B.value ? "In favorites" : "Watchlist"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(o, {
						variant: "ghost",
						class: _(["media-detail__watched", { "is-active": H.value }]),
						"left-icon": H.value ? "eye" : "eye-off",
						"aria-label": H.value ? "Mark as unwatched" : "Mark as watched",
						"aria-pressed": H.value ? "true" : "false",
						onClick: U
					}, {
						default: C(() => [m(S(H.value ? "Watched" : "Mark watched"), 1)]),
						_: 1
					}, 8, [
						"class",
						"left-icon",
						"aria-label",
						"aria-pressed"
					]),
					h(i, {
						level: Ke.value,
						onCycle: Xe
					}, null, 8, ["level"]),
					h(te, {
						open: G.value,
						"onUpdate:open": r[4] ||= (e) => G.value = e,
						items: Je.value,
						onSelect: Ye
					}, {
						default: C(() => [p("button", {
							type: "button",
							class: "media-detail__menu-btn",
							"aria-label": "More actions",
							onClick: r[3] ||= oe(() => {}, ["stop", "prevent"])
						}, [h(t, { name: "more" })])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (y(), u(o, {
						key: 1,
						variant: "ghost",
						"left-icon": "search",
						onClick: r[5] ||= (t) => L("match", e.item)
					}, {
						default: C(() => [...r[13] ||= [m("Match metadata", -1)]]),
						_: 1
					})) : d("", !0)
				]),
				W.value.length ? (y(), f("div", N, [r[14] ||= p("span", { class: "media-detail__links-label" }, "Links", -1), p("div", P, [(y(!0), f(c, null, x(W.value, (e) => (y(), f("a", {
					key: e.key,
					class: "media-detail__link",
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": `Open on ${e.label} (opens in a new tab)`
				}, [p("span", null, S(e.label), 1), h(t, {
					name: "arrow-right",
					class: "media-detail__link-icon",
					"aria-hidden": "true"
				})], 8, be))), 128))])])) : d("", !0),
				q.value.length || K.value.length ? (y(), f("div", xe, [q.value.length ? (y(), f("section", Se, [r[15] ||= p("h2", { class: "media-detail__credit-heading" }, "Crew", -1), p("ul", Ce, [(y(!0), f(c, null, x(q.value, (e, t) => (y(), f("li", { key: `crew-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => L("actor", e.name)
				}, [
					p("span", Te, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Ee)) : (y(), f("span", De, S(Y(e.name)), 1))]),
					p("span", Oe, S(e.name), 1),
					e.sub ? (y(), f("span", ke, S(e.sub), 1)) : d("", !0)
				], 8, we)]))), 128))])])) : d("", !0), K.value.length ? (y(), f("section", Ae, [r[16] ||= p("h2", { class: "media-detail__credit-heading" }, "Cast", -1), p("ul", je, [(y(!0), f(c, null, x(K.value, (e, t) => (y(), f("li", { key: `cast-${t}-${e.name}` }, [p("button", {
					type: "button",
					class: "media-detail__person",
					"aria-label": `Show titles with ${e.name}`,
					onClick: (t) => L("actor", e.name)
				}, [
					p("span", Ne, [e.profileUrl ? (y(), f("img", {
						key: 0,
						class: "media-detail__avatar-img",
						src: e.profileUrl,
						alt: e.name,
						loading: "lazy",
						decoding: "async"
					}, null, 8, Pe)) : (y(), f("span", Fe, S(Y(e.name)), 1))]),
					p("span", F, S(e.name), 1),
					e.sub ? (y(), f("span", Ie, S(e.sub), 1)) : d("", !0)
				], 8, Me)]))), 128))])])) : d("", !0)])) : d("", !0)
			])]),
			e.item.files?.length ? (y(), f("section", Le, [r[17] ||= p("h2", { class: "media-detail__files-heading" }, "Files", -1), p("ul", Re, [(y(!0), f(c, null, x(e.item.files, (e, t) => (y(), f("li", {
				key: t,
				class: "media-detail__file"
			}, [p("span", ze, S(e.path), 1), p("span", Be, [
				e.container ? (y(), f("span", Ve, S(e.container), 1)) : d("", !0),
				e.resolution ? (y(), f("span", He, S(e.resolution), 1)) : d("", !0),
				p("span", Ue, S(Qe(e.size_bytes)), 1)
			])]))), 128))])])) : d("", !0),
			e.similarLoading || e.similar.length ? (y(), u(re, {
				key: 3,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[6] ||= (e) => L("play", e),
				onWatchlist: r[7] ||= (e) => L("watchlist", e),
				onInfo: r[8] ||= (e) => L("info", e)
			}, null, 8, ["items", "loading"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-8f648ec1"]]);
//#endregion
export { I as t };

//# sourceMappingURL=MediaDetail-U0_4vbNd.js.map