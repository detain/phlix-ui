import { t as e } from "./client-pLl-rDdN.js";
import { n as t } from "./useApiBase-DXTBY90j.js";
import { t as n } from "./useImageSrc-CSM61b-l.js";
import { i as r, n as i } from "./useResolvePlayable-CnOPgUvz.js";
import { i as a } from "./episode-order-DBEVgrOE.js";
import { n as o, t as s } from "./Icon-CIbfiPrs.js";
import { o as c } from "./plural-B3O2rVPV.js";
import { n as ee, t as l } from "./ThumbRating-BUadWtms.js";
import { t as u } from "./EmptyState-BjOJ1k_A.js";
import { t as d } from "./Button-1sKEdGjj.js";
import { t as f } from "./Skeleton-B2Mt2L00.js";
import { i as p } from "./usePageTitle-j6j9gAmo.js";
import { t as te } from "./useMessages-B2u5b6BQ.js";
import { i as m } from "./usePlayerStore-B7mnqLe3.js";
import { t as h } from "./useToastStore-Bu-iYU7r.js";
import { Fragment as g, computed as _, createBlock as v, createCommentVNode as y, createElementBlock as b, createElementVNode as x, createTextVNode as S, createVNode as C, defineComponent as w, inject as ne, normalizeClass as T, onBeforeUnmount as E, onMounted as D, openBlock as O, ref as k, renderList as A, toDisplayString as j, unref as M, watch as re, withCtx as N, withModifiers as P } from "vue";
import { useRoute as ie, useRouter as ae } from "vue-router";
// src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var F = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, oe = ["open"], se = { class: "series-seasons__summary" }, I = { class: "series-seasons__season-label" }, L = { class: "series-seasons__season-count numeric" }, R = { class: "series-seasons__episodes" }, z = ["aria-label", "onClick"], B = ["aria-label", "onClick"], V = { class: "series-seasons__episode-title" }, H = {
	key: 0,
	class: "series-seasons__episode-meta numeric"
}, U = {
	key: 1,
	class: "series-seasons__episode-description"
}, W = [
	"aria-label",
	"title",
	"onClick"
], G = {
	key: 1,
	class: "series-seasons__files-detail"
}, K = {
	key: 0,
	class: "series-seasons__files-loading"
}, q = { class: "series-seasons__file-path" }, J = { class: "series-seasons__file-meta numeric" }, ce = {
	key: 2,
	class: "series-seasons__files-empty"
}, le = /*#__PURE__*/ o(/* @__PURE__ */ w({
	__name: "SeriesSeasons",
	props: {
		seasons: {},
		openFirstOnly: {
			type: Boolean,
			default: !0
		},
		apiBase: { default: "" }
	},
	emits: ["play", "open"],
	setup(n, { emit: r }) {
		let i = n, a = r, o = ne("auth", { isAdmin: !1 }), ee = t(), l = k({}), u = k(/* @__PURE__ */ new Set());
		function d(e) {
			return l.value[e];
		}
		function f(e) {
			return u.value.has(e);
		}
		async function p(t) {
			if (l.value[t] === void 0) try {
				let n = await new e({ baseUrl: i.apiBase || ee.value }).get(`/api/v1/media/${encodeURIComponent(t)}`);
				l.value[t] = n.files ?? [];
			} catch {
				l.value[t] = [];
			}
		}
		function te(e) {
			f(e) ? u.value.delete(e) : (u.value.add(e), p(e));
		}
		function m(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function h(e) {
			return e.runtime ? `${e.runtime}m` : null;
		}
		function v(e) {
			let t = e.air_date;
			if (!t) return null;
			let n = Date.parse(t);
			return Number.isNaN(n) ? t : new Date(n).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function w(e) {
			let t = e.overview?.trim();
			return t ? t.split(/\n\s*\n/)[0]?.trim() || t : null;
		}
		function T(e) {
			return !i.openFirstOnly || e === 0;
		}
		function E(e) {
			if (e <= 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = 0, r = e;
			for (; r >= 1024 && n < t.length - 1;) r /= 1024, n++;
			n === 0 && e >= 960 && (n = 1, r = e / 1024);
			let i = r >= 100 ? 0 : r >= 10 ? 1 : 2;
			return `${r.toFixed(i)} ${t[n]}`;
		}
		let D = _(() => o.isAdmin && !!i.apiBase);
		return (e, t) => (O(), b("section", F, [(O(!0), b(g, null, A(n.seasons, (e, t) => (O(), b("details", {
			key: e.key,
			class: "series-seasons__season",
			open: T(t)
		}, [x("summary", se, [
			C(s, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			x("span", I, j(e.label), 1),
			x("span", L, j(e.episodes.length) + " " + j(M(c)(e.episodes.length, "episode", "episodes")), 1)
		]), x("ul", R, [(O(!0), b(g, null, A(e.episodes, (e) => (O(), b("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			x("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${m(e)}`,
				onClick: (t) => a("play", e)
			}, [C(s, { name: "play" })], 8, z),
			x("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": `View ${m(e)}`,
				onClick: (t) => a("open", e)
			}, [
				x("span", V, j(m(e)), 1),
				v(e) || h(e) ? (O(), b("span", H, [
					v(e) ? (O(), b(g, { key: 0 }, [S(j(v(e)), 1)], 64)) : y("", !0),
					v(e) && h(e) ? (O(), b(g, { key: 1 }, [S(" · ")], 64)) : y("", !0),
					h(e) ? (O(), b(g, { key: 2 }, [S(j(h(e)), 1)], 64)) : y("", !0)
				])) : y("", !0),
				w(e) ? (O(), b("span", U, j(w(e)), 1)) : y("", !0)
			], 8, B),
			D.value ? (O(), b("button", {
				key: 0,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": `Files info for ${m(e)}${f(e.id) ? " (expanded)" : ""}`,
				title: f(e.id) ? "Collapse files" : "Expand files",
				onClick: P((t) => te(e.id), ["stop"])
			}, [C(s, {
				name: f(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, W)) : y("", !0),
			D.value && f(e.id) ? (O(), b("div", G, [d(e.id) === void 0 ? (O(), b("span", K, " Loading… ")) : d(e.id)?.length ? (O(!0), b(g, { key: 1 }, A(d(e.id), (e, t) => (O(), b("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [x("span", q, j(e.path), 1), x("span", J, [
				S(j(E(e.size_bytes)) + " ", 1),
				e.container ? (O(), b(g, { key: 0 }, [S(" · " + j(e.container), 1)], 64)) : y("", !0),
				e.resolution ? (O(), b(g, { key: 1 }, [S(" · " + j(e.resolution), 1)], 64)) : y("", !0)
			])]))), 128)) : (O(), b("span", ce, "No files"))])) : y("", !0)
		]))), 128))])], 8, oe))), 128))]));
	}
}), [["__scopeId", "data-v-af67eb0a"]]), ue = { class: "season-page" }, de = ["aria-label"], fe = { class: "season-page__header" }, pe = { class: "season-page__hero" }, me = { class: "season-page__poster" }, he = ["src", "alt"], ge = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, _e = { class: "season-page__info" }, ve = { class: "season-page__series-name" }, ye = { class: "season-page__title" }, be = { class: "season-page__count numeric" }, xe = { class: "season-page__actions" }, Se = {
	key: 0,
	class: "season-page__overview"
}, Ce = ["aria-label"], we = /*#__PURE__*/ o(/* @__PURE__ */ w({
	__name: "SeasonPage",
	setup(o) {
		let w = t(), { imgSrc: ne } = n(), A = ie(), P = ae(), { t: F } = te(), oe = m(), se = h(), I = ee(), L = k(null), R = k(null), z = k(!0), B = k(null), V = _(() => String(A.params.id ?? "")), H = _(() => String(A.params.season ?? ""));
		p(() => {
			if (L.value) return R.value ? `${L.value.name} · ${R.value.label}` : L.value.name;
		});
		let U = _(() => R.value ? [R.value] : []), W = null, G = !1;
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q() {
			let t = V.value;
			W?.abort(), W = typeof AbortController < "u" ? new AbortController() : null;
			let n = W, i = () => G || n !== W;
			if (z.value = !0, B.value = null, L.value = null, R.value = null, !t) B.value = "No series id provided", z.value = !1;
			else try {
				let o = new e({ baseUrl: w.value }), s = await o.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, n?.signal);
				if (i()) return;
				L.value = s.item;
				let c = await r(o, w.value, t, n?.signal);
				if (i()) return;
				R.value = a(c, H.value), R.value?.seasonItem && I.hydrate(R.value.seasonItem), z.value = !1;
			} catch (e) {
				if (i() || K(e)) return;
				B.value = e instanceof Error ? e.message : "Failed to load season", z.value = !1;
			}
		}
		D(q), re([V, H], q), E(() => {
			G = !0, W?.abort(), W = null;
		});
		function J(e, t) {
			P?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function ce(e) {
			J("player", { id: e.id });
		}
		function we(e) {
			J("media", { id: e.id });
		}
		function Y() {
			V.value ? J("media", { id: V.value }) : P?.back();
		}
		let Te = _(() => R.value?.seasonPoster ?? L.value?.poster_url ?? null), X = _(() => R.value?.seasonItem?.overview ?? null);
		function Ee() {
			if (!R.value) return;
			let e = i(R.value, oe.resumeMap);
			e ? J("player", { id: e.id }) : se.info(F("season.noEpisodes"));
		}
		let Z = _(() => R.value?.seasonItem?.id ?? null), Q = _(() => Z.value ? I.isFavorite(Z.value) : !1), $ = _(() => Z.value ? I.isWatched(Z.value) : !1), De = _(() => Z.value ? I.likeLevel(Z.value) : 0);
		function Oe() {
			Z.value && I.toggleFavorite(Z.value, w.value);
		}
		function ke() {
			Z.value && I.toggleWatched(Z.value, w.value);
		}
		function Ae(e) {
			Z.value && I.setLike(Z.value, e, w.value);
		}
		return (e, t) => (O(), b("div", ue, [z.value ? (O(), b("div", {
			key: 0,
			class: "season-page__loading",
			role: "status",
			"aria-busy": "true",
			"aria-label": M(F)("season.loadingAria")
		}, [C(f, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), C(f, {
			variant: "text",
			lines: 3
		})], 8, de)) : B.value ? (O(), v(u, {
			key: 1,
			icon: "alert",
			title: M(F)("season.loadError"),
			description: B.value
		}, {
			actions: N(() => [C(d, {
				variant: "solid",
				onClick: q
			}, {
				default: N(() => [S(j(M(F)("common.retry")), 1)]),
				_: 1
			}), C(d, {
				variant: "ghost",
				onClick: Y
			}, {
				default: N(() => [S(j(M(F)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : L.value && R.value ? (O(), b(g, { key: 2 }, [x("header", fe, [x("button", {
			type: "button",
			class: "season-page__back",
			onClick: Y
		}, [C(s, { name: "arrow-left" }), x("span", null, j(L.value.name), 1)]), x("div", pe, [x("div", me, [Te.value ? (O(), b("img", {
			key: 0,
			class: "season-page__img",
			src: M(ne)(Te.value),
			alt: `${L.value.name} ${R.value.label}`,
			decoding: "async"
		}, null, 8, he)) : (O(), b("div", ge, [C(s, { name: "tv" })]))]), x("div", _e, [
			x("p", ve, j(L.value.name), 1),
			x("h1", ye, j(R.value.label), 1),
			x("p", be, j(R.value.episodes.length) + " " + j(M(c)(R.value.episodes.length, "episode", "episodes")), 1),
			x("div", xe, [C(d, {
				variant: "solid",
				"left-icon": "play",
				onClick: Ee
			}, {
				default: N(() => [S(j(M(F)("season.play")), 1)]),
				_: 1
			}), Z.value ? (O(), b(g, { key: 0 }, [
				C(d, {
					variant: "ghost",
					class: T(["season-page__favorite", { "is-active": Q.value }]),
					"left-icon": Q.value ? "bookmark" : "bookmark-plus",
					"aria-label": Q.value ? M(F)("season.removeFavorite") : M(F)("season.addFavorite"),
					"aria-pressed": Q.value ? "true" : "false",
					onClick: Oe
				}, {
					default: N(() => [S(j(Q.value ? M(F)("season.inFavorites") : M(F)("season.watchlist")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				C(d, {
					variant: "ghost",
					class: T(["season-page__watched", { "is-active": $.value }]),
					"left-icon": $.value ? "eye" : "eye-off",
					"aria-label": $.value ? M(F)("season.markUnwatchedAria") : M(F)("season.markWatchedAria"),
					"aria-pressed": $.value ? "true" : "false",
					onClick: ke
				}, {
					default: N(() => [S(j($.value ? M(F)("season.watched") : M(F)("season.markWatched")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				C(l, {
					level: De.value,
					onCycle: Ae
				}, null, 8, ["level"])
			], 64)) : y("", !0)]),
			X.value ? (O(), b("p", Se, j(X.value), 1)) : y("", !0)
		])])]), x("section", {
			class: "season-page__episodes",
			"aria-label": M(F)("season.episodes")
		}, [R.value.episodes.length ? (O(), v(le, {
			key: 0,
			seasons: U.value,
			"open-first-only": !1,
			"api-base": M(w),
			onPlay: ce,
			onOpen: we
		}, null, 8, ["seasons", "api-base"])) : (O(), v(u, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))], 8, Ce)], 64)) : L.value ? (O(), v(u, {
			key: 3,
			icon: "tv",
			title: M(F)("season.notFound"),
			description: M(F)("season.notFoundDescription", { series: L.value.name })
		}, {
			actions: N(() => [C(d, {
				variant: "solid",
				onClick: Y
			}, {
				default: N(() => [S(j(M(F)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : y("", !0)]));
	}
}), [["__scopeId", "data-v-e44939e1"]]);
export { we as default };

//# sourceMappingURL=SeasonPage-CYMMQRkx.js.map