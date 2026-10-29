import { n as e, t } from "./Icon-CIwTuFLd.js";
import { o as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-CiSCI5Ag.js";
import { i, t as a } from "./client-CSOeqVlU.js";
import { n as o } from "./useApiBase-CV_r-Kk4.js";
import { t as s } from "./useImageSrc-KnN1T9Ga.js";
import { i as c } from "./usePlayerStore-D8A_gb_c.js";
import { t as l } from "./useToastStore-BDoKlU6N.js";
import { n as u, t as d } from "./ThumbRating-BUt_haMZ.js";
import { t as f } from "./EmptyState-BAyOxAcK.js";
import { t as p } from "./Button-BuG0GvCa.js";
import { i as m } from "./usePageTitle-BO3GGF3M.js";
import { t as h } from "./Skeleton-rHw-IJtl.js";
import { i as g } from "./episode-order-C2yqgMeX.js";
import { i as _, n as ee } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as v, computed as y, createBlock as b, createCommentVNode as x, createElementBlock as S, createElementVNode as C, createTextVNode as w, createVNode as T, defineComponent as E, inject as D, normalizeClass as O, onBeforeUnmount as te, onMounted as ne, openBlock as k, ref as A, renderList as j, toDisplayString as M, unref as N, watch as re, withCtx as P, withModifiers as F } from "vue";
import { useRoute as ie, useRouter as ae } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var I = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, L = ["open"], R = { class: "series-seasons__summary" }, z = { class: "series-seasons__season-label" }, B = { class: "series-seasons__season-count numeric" }, V = { class: "series-seasons__episodes" }, H = ["aria-label", "onClick"], U = ["aria-label", "onClick"], W = { class: "series-seasons__episode-title" }, G = {
	key: 0,
	class: "series-seasons__episode-meta numeric"
}, K = {
	key: 1,
	class: "series-seasons__episode-description"
}, q = [
	"aria-label",
	"title",
	"onClick"
], oe = {
	key: 1,
	class: "series-seasons__files-detail"
}, J = {
	key: 0,
	class: "series-seasons__files-loading"
}, Y = { class: "series-seasons__file-path" }, se = { class: "series-seasons__file-meta numeric" }, ce = {
	key: 2,
	class: "series-seasons__files-empty"
}, le = /*#__PURE__*/ e(/* @__PURE__ */ E({
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
	setup(e, { emit: r }) {
		let a = e, o = r, s = D("auth", { isAdmin: !1 }), c = A({}), l = A(/* @__PURE__ */ new Set());
		function u(e) {
			return c.value[e];
		}
		function d(e) {
			return l.value.has(e);
		}
		async function f(e) {
			if (c.value[e] === void 0) try {
				let t = await i.get(`${a.apiBase}/api/v1/media/${encodeURIComponent(e)}`);
				c.value[e] = t.files ?? [];
			} catch {
				c.value[e] = [];
			}
		}
		function p(e) {
			d(e) ? l.value.delete(e) : (l.value.add(e), f(e));
		}
		function m(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function h(e) {
			return e.runtime ? `${e.runtime}m` : null;
		}
		function g(e) {
			let t = e.air_date;
			if (!t) return null;
			let n = Date.parse(t);
			return Number.isNaN(n) ? t : new Date(n).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		function _(e) {
			let t = e.overview?.trim();
			return t ? t.split(/\n\s*\n/)[0]?.trim() || t : null;
		}
		function ee(e) {
			return !a.openFirstOnly || e === 0;
		}
		function b(e) {
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
		let E = y(() => s.isAdmin && !!a.apiBase);
		return (r, i) => (k(), S("section", I, [(k(!0), S(v, null, j(e.seasons, (e, r) => (k(), S("details", {
			key: e.key,
			class: "series-seasons__season",
			open: ee(r)
		}, [C("summary", R, [
			T(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			C("span", z, M(e.label), 1),
			C("span", B, M(e.episodes.length) + " " + M(N(n)(e.episodes.length, "episode", "episodes")), 1)
		]), C("ul", V, [(k(!0), S(v, null, j(e.episodes, (e) => (k(), S("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			C("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${m(e)}`,
				onClick: (t) => o("play", e)
			}, [T(t, { name: "play" })], 8, H),
			C("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": `View ${m(e)}`,
				onClick: (t) => o("open", e)
			}, [
				C("span", W, M(m(e)), 1),
				g(e) || h(e) ? (k(), S("span", G, [
					g(e) ? (k(), S(v, { key: 0 }, [w(M(g(e)), 1)], 64)) : x("", !0),
					g(e) && h(e) ? (k(), S(v, { key: 1 }, [w(" · ")], 64)) : x("", !0),
					h(e) ? (k(), S(v, { key: 2 }, [w(M(h(e)), 1)], 64)) : x("", !0)
				])) : x("", !0),
				_(e) ? (k(), S("span", K, M(_(e)), 1)) : x("", !0)
			], 8, U),
			E.value ? (k(), S("button", {
				key: 0,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": `Files info for ${m(e)}${d(e.id) ? " (expanded)" : ""}`,
				title: d(e.id) ? "Collapse files" : "Expand files",
				onClick: F((t) => p(e.id), ["stop"])
			}, [T(t, {
				name: d(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, q)) : x("", !0),
			E.value && d(e.id) ? (k(), S("div", oe, [u(e.id) === void 0 ? (k(), S("span", J, " Loading… ")) : u(e.id)?.length ? (k(!0), S(v, { key: 1 }, j(u(e.id), (e, t) => (k(), S("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [C("span", Y, M(e.path), 1), C("span", se, [
				w(M(b(e.size_bytes)) + " ", 1),
				e.container ? (k(), S(v, { key: 0 }, [w(" · " + M(e.container), 1)], 64)) : x("", !0),
				e.resolution ? (k(), S(v, { key: 1 }, [w(" · " + M(e.resolution), 1)], 64)) : x("", !0)
			])]))), 128)) : (k(), S("span", ce, "No files"))])) : x("", !0)
		]))), 128))])], 8, L))), 128))]));
	}
}), [["__scopeId", "data-v-779b177a"]]), ue = { class: "season-page" }, de = ["aria-label"], fe = { class: "season-page__header" }, pe = { class: "season-page__hero" }, me = { class: "season-page__poster" }, he = ["src", "alt"], ge = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, _e = { class: "season-page__info" }, ve = { class: "season-page__series-name" }, ye = { class: "season-page__title" }, be = { class: "season-page__count numeric" }, xe = { class: "season-page__actions" }, Se = {
	key: 0,
	class: "season-page__overview"
}, Ce = ["aria-label"], X = /*#__PURE__*/ e(/* @__PURE__ */ E({
	__name: "SeasonPage",
	setup(e) {
		let i = o(), { imgSrc: E } = s(), D = ie(), j = ae(), { t: F } = r(), I = c(), L = l(), R = u(), z = A(null), B = A(null), V = A(!0), H = A(null), U = y(() => String(D.params.id ?? "")), W = y(() => String(D.params.season ?? ""));
		m(() => {
			if (z.value) return B.value ? `${z.value.name} · ${B.value.label}` : z.value.name;
		});
		let G = y(() => B.value ? [B.value] : []), K = null, q = !1;
		function oe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function J() {
			let e = U.value;
			K?.abort(), K = typeof AbortController < "u" ? new AbortController() : null;
			let t = K, n = () => q || t !== K;
			if (V.value = !0, H.value = null, z.value = null, B.value = null, !e) {
				H.value = "No series id provided", V.value = !1;
				return;
			}
			try {
				let r = new a({ baseUrl: i.value }), o = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t?.signal);
				if (n()) return;
				z.value = o.item;
				let s = await _(r, i.value, e, t?.signal);
				if (n()) return;
				B.value = g(s, W.value), B.value?.seasonItem && R.hydrate(B.value.seasonItem), V.value = !1;
			} catch (e) {
				if (n() || oe(e)) return;
				H.value = e instanceof Error ? e.message : "Failed to load season", V.value = !1;
			}
		}
		ne(J), re([U, W], J), te(() => {
			q = !0, K?.abort(), K = null;
		});
		function Y(e, t) {
			j?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function se(e) {
			Y("player", { id: e.id });
		}
		function ce(e) {
			Y("media", { id: e.id });
		}
		function X() {
			U.value ? Y("media", { id: U.value }) : j?.back();
		}
		let we = y(() => B.value?.seasonPoster ?? z.value?.poster_url ?? null), Te = y(() => B.value?.seasonItem?.overview ?? null);
		function Ee() {
			if (!B.value) return;
			let e = ee(B.value, I.resumeMap);
			e ? Y("player", { id: e.id }) : L.info(F("season.noEpisodes"));
		}
		let Z = y(() => B.value?.seasonItem?.id ?? null), Q = y(() => Z.value ? R.isFavorite(Z.value) : !1), $ = y(() => Z.value ? R.isWatched(Z.value) : !1), De = y(() => Z.value ? R.likeLevel(Z.value) : 0);
		function Oe() {
			Z.value && R.toggleFavorite(Z.value, i.value);
		}
		function ke() {
			Z.value && R.toggleWatched(Z.value, i.value);
		}
		function Ae(e) {
			Z.value && R.setLike(Z.value, e, i.value);
		}
		return (e, r) => (k(), S("div", ue, [V.value ? (k(), S("div", {
			key: 0,
			class: "season-page__loading",
			role: "status",
			"aria-busy": "true",
			"aria-label": N(F)("season.loadingAria")
		}, [T(h, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), T(h, {
			variant: "text",
			lines: 3
		})], 8, de)) : H.value ? (k(), b(f, {
			key: 1,
			icon: "alert",
			title: N(F)("season.loadError"),
			description: H.value
		}, {
			actions: P(() => [T(p, {
				variant: "solid",
				onClick: J
			}, {
				default: P(() => [w(M(N(F)("common.retry")), 1)]),
				_: 1
			}), T(p, {
				variant: "ghost",
				onClick: X
			}, {
				default: P(() => [w(M(N(F)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : z.value && B.value ? (k(), S(v, { key: 2 }, [C("header", fe, [C("button", {
			type: "button",
			class: "season-page__back",
			onClick: X
		}, [T(t, { name: "arrow-left" }), C("span", null, M(z.value.name), 1)]), C("div", pe, [C("div", me, [we.value ? (k(), S("img", {
			key: 0,
			class: "season-page__img",
			src: N(E)(we.value),
			alt: `${z.value.name} ${B.value.label}`,
			decoding: "async"
		}, null, 8, he)) : (k(), S("div", ge, [T(t, { name: "tv" })]))]), C("div", _e, [
			C("p", ve, M(z.value.name), 1),
			C("h1", ye, M(B.value.label), 1),
			C("p", be, M(B.value.episodes.length) + " " + M(N(n)(B.value.episodes.length, "episode", "episodes")), 1),
			C("div", xe, [T(p, {
				variant: "solid",
				"left-icon": "play",
				onClick: Ee
			}, {
				default: P(() => [w(M(N(F)("season.play")), 1)]),
				_: 1
			}), Z.value ? (k(), S(v, { key: 0 }, [
				T(p, {
					variant: "ghost",
					class: O(["season-page__favorite", { "is-active": Q.value }]),
					"left-icon": Q.value ? "bookmark" : "bookmark-plus",
					"aria-label": Q.value ? N(F)("season.removeFavorite") : N(F)("season.addFavorite"),
					"aria-pressed": Q.value ? "true" : "false",
					onClick: Oe
				}, {
					default: P(() => [w(M(Q.value ? N(F)("season.inFavorites") : N(F)("season.watchlist")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				T(p, {
					variant: "ghost",
					class: O(["season-page__watched", { "is-active": $.value }]),
					"left-icon": $.value ? "eye" : "eye-off",
					"aria-label": $.value ? N(F)("season.markUnwatchedAria") : N(F)("season.markWatchedAria"),
					"aria-pressed": $.value ? "true" : "false",
					onClick: ke
				}, {
					default: P(() => [w(M($.value ? N(F)("season.watched") : N(F)("season.markWatched")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				T(d, {
					level: De.value,
					onCycle: Ae
				}, null, 8, ["level"])
			], 64)) : x("", !0)]),
			Te.value ? (k(), S("p", Se, M(Te.value), 1)) : x("", !0)
		])])]), C("section", {
			class: "season-page__episodes",
			"aria-label": N(F)("season.episodes")
		}, [B.value.episodes.length ? (k(), b(le, {
			key: 0,
			seasons: G.value,
			"open-first-only": !1,
			"api-base": N(i),
			onPlay: se,
			onOpen: ce
		}, null, 8, ["seasons", "api-base"])) : (k(), b(f, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))], 8, Ce)], 64)) : z.value ? (k(), b(f, {
			key: 3,
			icon: "tv",
			title: N(F)("season.notFound"),
			description: N(F)("season.notFoundDescription", { series: z.value.name })
		}, {
			actions: P(() => [T(p, {
				variant: "solid",
				onClick: X
			}, {
				default: P(() => [w(M(N(F)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : x("", !0)]));
	}
}), [["__scopeId", "data-v-e44939e1"]]);
//#endregion
export { X as default };

//# sourceMappingURL=SeasonPage-CCa5LqxD.js.map