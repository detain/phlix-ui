import { t as e } from "./client-Bmlfq3Uy.js";
import { n as t } from "./useApiBase-DXTBY90j.js";
import { t as n } from "./useImageSrc-CSM61b-l.js";
import { i as r, n as i } from "./useResolvePlayable-C1Fgbq2a.js";
import { i as a } from "./episode-order-DBEVgrOE.js";
import { t as o, u as s } from "./useMessages-BGVJcrvU.js";
import { n as c, t as l } from "./Icon-55iG1rR7.js";
import { n as u, t as d } from "./ThumbRating-BMpV52OI.js";
import { t as f } from "./EmptyState-DjfWh3kt.js";
import { t as p } from "./Button-DTiNkl61.js";
import { t as m } from "./Skeleton-DDhrDRE7.js";
import { i as ee } from "./usePageTitle-j6j9gAmo.js";
import { i as te } from "./usePlayerStore-Bb_jPGSc.js";
import { t as h } from "./useToastStore-CxO_ppM8.js";
import { Fragment as g, computed as _, createBlock as v, createCommentVNode as y, createElementBlock as b, createElementVNode as x, createTextVNode as S, createVNode as C, defineComponent as w, inject as ne, normalizeClass as T, onBeforeUnmount as re, onMounted as ie, openBlock as E, ref as D, renderList as O, toDisplayString as k, unref as A, watch as j, withCtx as M, withModifiers as N } from "vue";
import { useRoute as ae, useRouter as oe } from "vue-router";
// src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var P = ["aria-label"], se = ["open"], F = { class: "series-seasons__summary" }, I = { class: "series-seasons__season-label" }, L = { class: "series-seasons__season-count numeric" }, R = { class: "series-seasons__episodes" }, z = ["aria-label", "onClick"], B = ["aria-label", "onClick"], V = { class: "series-seasons__episode-title" }, H = {
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
}, le = /*#__PURE__*/ c(/* @__PURE__ */ w({
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
		let { t: i } = o(), a = n, s = r, c = ne("auth", { isAdmin: !1 }), u = t(), d = D({}), f = D(/* @__PURE__ */ new Set());
		function p(e) {
			return d.value[e];
		}
		function m(e) {
			return f.value.has(e);
		}
		async function ee(t) {
			if (d.value[t] === void 0) try {
				let n = await new e({ baseUrl: a.apiBase || u.value }).get(`/api/v1/media/${encodeURIComponent(t)}`);
				d.value[t] = n.files ?? [];
			} catch {
				d.value[t] = [];
			}
		}
		function te(e) {
			m(e) ? f.value.delete(e) : (f.value.add(e), ee(e));
		}
		function h(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function v(e) {
			return e.runtime ? i("media.runtimeMinutes", { minutes: e.runtime }) : null;
		}
		function w(e) {
			let t = e.air_date;
			if (!t) return null;
			let n = Date.parse(t);
			return Number.isNaN(n) ? t : new Date(n).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function T(e) {
			let t = e.overview?.trim();
			return t ? t.split(/\n\s*\n/)[0]?.trim() || t : null;
		}
		function re(e) {
			return !a.openFirstOnly || e === 0;
		}
		function ie(e) {
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
		let j = _(() => c.isAdmin && !!a.apiBase);
		return (e, t) => (E(), b("section", {
			class: "series-seasons",
			"aria-label": A(i)("series.treeAria")
		}, [(E(!0), b(g, null, O(n.seasons, (e, t) => (E(), b("details", {
			key: e.key,
			class: "series-seasons__season",
			open: re(t)
		}, [x("summary", F, [
			C(l, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			x("span", I, k(e.label), 1),
			x("span", L, k(A(i)("series.episodeCount", { count: e.episodes.length })), 1)
		]), x("ul", R, [(E(!0), b(g, null, O(e.episodes, (e) => (E(), b("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			x("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": A(i)("series.playEpisode", { title: h(e) }),
				onClick: (t) => s("play", e)
			}, [C(l, { name: "play" })], 8, z),
			x("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": A(i)("series.viewEpisode", { title: h(e) }),
				onClick: (t) => s("open", e)
			}, [
				x("span", V, k(h(e)), 1),
				w(e) || v(e) ? (E(), b("span", H, [
					w(e) ? (E(), b(g, { key: 0 }, [S(k(w(e)), 1)], 64)) : y("", !0),
					w(e) && v(e) ? (E(), b(g, { key: 1 }, [S(" · ")], 64)) : y("", !0),
					v(e) ? (E(), b(g, { key: 2 }, [S(k(v(e)), 1)], 64)) : y("", !0)
				])) : y("", !0),
				T(e) ? (E(), b("span", U, k(T(e)), 1)) : y("", !0)
			], 8, B),
			j.value ? (E(), b("button", {
				key: 0,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": m(e.id) ? A(i)("series.filesInfoExpanded", { title: h(e) }) : A(i)("series.filesInfo", { title: h(e) }),
				title: m(e.id) ? A(i)("series.collapseFiles") : A(i)("series.expandFiles"),
				onClick: N((t) => te(e.id), ["stop"])
			}, [C(l, {
				name: m(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, W)) : y("", !0),
			j.value && m(e.id) ? (E(), b("div", G, [p(e.id) === void 0 ? (E(), b("span", K, k(A(i)("series.filesLoading")), 1)) : p(e.id)?.length ? (E(!0), b(g, { key: 1 }, O(p(e.id), (e, t) => (E(), b("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [x("span", q, k(e.path), 1), x("span", J, [
				S(k(ie(e.size_bytes)) + " ", 1),
				e.container ? (E(), b(g, { key: 0 }, [S(" · " + k(e.container), 1)], 64)) : y("", !0),
				e.resolution ? (E(), b(g, { key: 1 }, [S(" · " + k(e.resolution), 1)], 64)) : y("", !0)
			])]))), 128)) : (E(), b("span", ce, k(A(i)("series.noFiles")), 1))])) : y("", !0)
		]))), 128))])], 8, se))), 128))], 8, P));
	}
}), [["__scopeId", "data-v-257400f2"]]), ue = { class: "season-page" }, de = ["aria-label"], fe = { class: "season-page__header" }, pe = { class: "season-page__hero" }, me = { class: "season-page__poster" }, he = ["src", "alt"], ge = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, _e = { class: "season-page__info" }, ve = { class: "season-page__series-name" }, ye = { class: "season-page__title" }, be = { class: "season-page__count numeric" }, xe = { class: "season-page__actions" }, Se = {
	key: 0,
	class: "season-page__overview"
}, Ce = ["aria-label"], we = /*#__PURE__*/ c(/* @__PURE__ */ w({
	__name: "SeasonPage",
	setup(c) {
		let w = t(), { imgSrc: ne } = n(), O = ae(), N = oe(), { t: P } = o(), se = te(), F = h(), I = u(), L = D(null), R = D(null), z = D(!0), B = D(null), V = _(() => String(O.params.id ?? "")), H = _(() => String(O.params.season ?? ""));
		ee(() => {
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
			if (z.value = !0, B.value = null, L.value = null, R.value = null, !t) B.value = P("common.missingSeasonId"), z.value = !1;
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
		ie(q), j([V, H], q), re(() => {
			G = !0, W?.abort(), W = null;
		});
		function J(e, t) {
			N?.push({
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
			V.value ? J("media", { id: V.value }) : N?.back();
		}
		let Te = _(() => R.value?.seasonPoster ?? L.value?.poster_url ?? null), X = _(() => R.value?.seasonItem?.overview ?? null);
		function Ee() {
			if (!R.value) return;
			let e = i(R.value, se.resumeMap);
			e ? J("player", { id: e.id }) : F.info(P("season.noEpisodes"));
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
		return (e, t) => (E(), b("div", ue, [z.value ? (E(), b("div", {
			key: 0,
			class: "season-page__loading",
			role: "status",
			"aria-busy": "true",
			"aria-label": A(P)("season.loadingAria")
		}, [C(m, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), C(m, {
			variant: "text",
			lines: 3
		})], 8, de)) : B.value ? (E(), v(f, {
			key: 1,
			icon: "alert",
			title: A(P)("season.loadErrorTitle"),
			description: B.value
		}, {
			actions: M(() => [C(p, {
				variant: "solid",
				onClick: q
			}, {
				default: M(() => [S(k(A(P)("common.retry")), 1)]),
				_: 1
			}), C(p, {
				variant: "ghost",
				onClick: Y
			}, {
				default: M(() => [S(k(A(P)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : L.value && R.value ? (E(), b(g, { key: 2 }, [x("header", fe, [x("button", {
			type: "button",
			class: "season-page__back",
			onClick: Y
		}, [C(l, { name: "arrow-left" }), x("span", null, k(L.value.name), 1)]), x("div", pe, [x("div", me, [Te.value ? (E(), b("img", {
			key: 0,
			class: "season-page__img",
			src: A(ne)(Te.value),
			alt: `${L.value.name} ${R.value.label}`,
			decoding: "async"
		}, null, 8, he)) : (E(), b("div", ge, [C(l, { name: "tv" })]))]), x("div", _e, [
			x("p", ve, k(L.value.name), 1),
			x("h1", ye, k(R.value.label), 1),
			x("p", be, k(R.value.episodes.length) + " " + k(A(s)(R.value.episodes.length, "episode", "episodes")), 1),
			x("div", xe, [C(p, {
				variant: "solid",
				"left-icon": "play",
				onClick: Ee
			}, {
				default: M(() => [S(k(A(P)("season.play")), 1)]),
				_: 1
			}), Z.value ? (E(), b(g, { key: 0 }, [
				C(p, {
					variant: "ghost",
					class: T(["season-page__favorite", { "is-active": Q.value }]),
					"left-icon": Q.value ? "bookmark" : "bookmark-plus",
					"aria-label": Q.value ? A(P)("season.removeFavorite") : A(P)("season.addFavorite"),
					"aria-pressed": Q.value ? "true" : "false",
					onClick: Oe
				}, {
					default: M(() => [S(k(Q.value ? A(P)("season.inFavorites") : A(P)("season.watchlist")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				C(p, {
					variant: "ghost",
					class: T(["season-page__watched", { "is-active": $.value }]),
					"left-icon": $.value ? "eye" : "eye-off",
					"aria-label": $.value ? A(P)("season.markUnwatchedAria") : A(P)("season.markWatchedAria"),
					"aria-pressed": $.value ? "true" : "false",
					onClick: ke
				}, {
					default: M(() => [S(k($.value ? A(P)("season.watched") : A(P)("season.markWatched")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				C(d, {
					level: De.value,
					onCycle: Ae
				}, null, 8, ["level"])
			], 64)) : y("", !0)]),
			X.value ? (E(), b("p", Se, k(X.value), 1)) : y("", !0)
		])])]), x("section", {
			class: "season-page__episodes",
			"aria-label": A(P)("season.episodes")
		}, [R.value.episodes.length ? (E(), v(le, {
			key: 0,
			seasons: U.value,
			"open-first-only": !1,
			"api-base": A(w),
			onPlay: ce,
			onOpen: we
		}, null, 8, ["seasons", "api-base"])) : (E(), v(f, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))], 8, Ce)], 64)) : L.value ? (E(), v(f, {
			key: 3,
			icon: "tv",
			title: A(P)("season.notFound"),
			description: A(P)("season.notFoundDescription", { series: L.value.name })
		}, {
			actions: M(() => [C(p, {
				variant: "solid",
				onClick: Y
			}, {
				default: M(() => [S(k(A(P)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : y("", !0)]));
	}
}), [["__scopeId", "data-v-da457776"]]);
export { we as default };

//# sourceMappingURL=SeasonPage-rQpC7Ap2.js.map