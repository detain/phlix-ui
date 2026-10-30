import { n as e, t } from "./Icon-CIwTuFLd.js";
import { o as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-M5VcrfIX.js";
import { t as i } from "./client-DdVqCKVh.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useImageSrc-KnN1T9Ga.js";
import { i as s } from "./usePlayerStore-D8A_gb_c.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as te, t as c } from "./ThumbRating-B5EFc49E.js";
import { t as l } from "./EmptyState-BAyOxAcK.js";
import { t as u } from "./Button-BuG0GvCa.js";
import { i as d } from "./usePageTitle-BO3GGF3M.js";
import { t as f } from "./Skeleton-rHw-IJtl.js";
import { i as p } from "./episode-order-C2yqgMeX.js";
import { i as m, n as h } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as g, computed as _, createBlock as v, createCommentVNode as y, createElementBlock as b, createElementVNode as x, createTextVNode as S, createVNode as C, defineComponent as w, inject as T, normalizeClass as E, onBeforeUnmount as D, onMounted as O, openBlock as k, ref as A, renderList as j, toDisplayString as M, unref as N, watch as ne, withCtx as P, withModifiers as F } from "vue";
import { useRoute as re, useRouter as ie } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var I = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, L = ["open"], R = { class: "series-seasons__summary" }, z = { class: "series-seasons__season-label" }, B = { class: "series-seasons__season-count numeric" }, V = { class: "series-seasons__episodes" }, H = ["aria-label", "onClick"], U = ["aria-label", "onClick"], W = { class: "series-seasons__episode-title" }, G = {
	key: 0,
	class: "series-seasons__episode-meta numeric"
}, ae = {
	key: 1,
	class: "series-seasons__episode-description"
}, K = [
	"aria-label",
	"title",
	"onClick"
], q = {
	key: 1,
	class: "series-seasons__files-detail"
}, oe = {
	key: 0,
	class: "series-seasons__files-loading"
}, J = { class: "series-seasons__file-path" }, Y = { class: "series-seasons__file-meta numeric" }, se = {
	key: 2,
	class: "series-seasons__files-empty"
}, ce = /*#__PURE__*/ e(/* @__PURE__ */ w({
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
		let o = e, s = r, ee = T("auth", { isAdmin: !1 }), te = a(), c = A({}), l = A(/* @__PURE__ */ new Set());
		function u(e) {
			return c.value[e];
		}
		function d(e) {
			return l.value.has(e);
		}
		async function f(e) {
			if (c.value[e] === void 0) try {
				let t = await new i({ baseUrl: o.apiBase || te.value }).get(`/api/v1/media/${encodeURIComponent(e)}`);
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
		function E(e) {
			return !o.openFirstOnly || e === 0;
		}
		function D(e) {
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
		let O = _(() => ee.isAdmin && !!o.apiBase);
		return (r, i) => (k(), b("section", I, [(k(!0), b(g, null, j(e.seasons, (e, r) => (k(), b("details", {
			key: e.key,
			class: "series-seasons__season",
			open: E(r)
		}, [x("summary", R, [
			C(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			x("span", z, M(e.label), 1),
			x("span", B, M(e.episodes.length) + " " + M(N(n)(e.episodes.length, "episode", "episodes")), 1)
		]), x("ul", V, [(k(!0), b(g, null, j(e.episodes, (e) => (k(), b("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			x("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${m(e)}`,
				onClick: (t) => s("play", e)
			}, [C(t, { name: "play" })], 8, H),
			x("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": `View ${m(e)}`,
				onClick: (t) => s("open", e)
			}, [
				x("span", W, M(m(e)), 1),
				v(e) || h(e) ? (k(), b("span", G, [
					v(e) ? (k(), b(g, { key: 0 }, [S(M(v(e)), 1)], 64)) : y("", !0),
					v(e) && h(e) ? (k(), b(g, { key: 1 }, [S(" · ")], 64)) : y("", !0),
					h(e) ? (k(), b(g, { key: 2 }, [S(M(h(e)), 1)], 64)) : y("", !0)
				])) : y("", !0),
				w(e) ? (k(), b("span", ae, M(w(e)), 1)) : y("", !0)
			], 8, U),
			O.value ? (k(), b("button", {
				key: 0,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": `Files info for ${m(e)}${d(e.id) ? " (expanded)" : ""}`,
				title: d(e.id) ? "Collapse files" : "Expand files",
				onClick: F((t) => p(e.id), ["stop"])
			}, [C(t, {
				name: d(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, K)) : y("", !0),
			O.value && d(e.id) ? (k(), b("div", q, [u(e.id) === void 0 ? (k(), b("span", oe, " Loading… ")) : u(e.id)?.length ? (k(!0), b(g, { key: 1 }, j(u(e.id), (e, t) => (k(), b("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [x("span", J, M(e.path), 1), x("span", Y, [
				S(M(D(e.size_bytes)) + " ", 1),
				e.container ? (k(), b(g, { key: 0 }, [S(" · " + M(e.container), 1)], 64)) : y("", !0),
				e.resolution ? (k(), b(g, { key: 1 }, [S(" · " + M(e.resolution), 1)], 64)) : y("", !0)
			])]))), 128)) : (k(), b("span", se, "No files"))])) : y("", !0)
		]))), 128))])], 8, L))), 128))]));
	}
}), [["__scopeId", "data-v-af67eb0a"]]), le = { class: "season-page" }, ue = ["aria-label"], de = { class: "season-page__header" }, fe = { class: "season-page__hero" }, pe = { class: "season-page__poster" }, me = ["src", "alt"], he = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, ge = { class: "season-page__info" }, _e = { class: "season-page__series-name" }, ve = { class: "season-page__title" }, ye = { class: "season-page__count numeric" }, be = { class: "season-page__actions" }, xe = {
	key: 0,
	class: "season-page__overview"
}, Se = ["aria-label"], Ce = /*#__PURE__*/ e(/* @__PURE__ */ w({
	__name: "SeasonPage",
	setup(e) {
		let w = a(), { imgSrc: T } = o(), j = re(), F = ie(), { t: I } = r(), L = s(), R = ee(), z = te(), B = A(null), V = A(null), H = A(!0), U = A(null), W = _(() => String(j.params.id ?? "")), G = _(() => String(j.params.season ?? ""));
		d(() => {
			if (B.value) return V.value ? `${B.value.name} · ${V.value.label}` : B.value.name;
		});
		let ae = _(() => V.value ? [V.value] : []), K = null, q = !1;
		function oe(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function J() {
			let e = W.value;
			K?.abort(), K = typeof AbortController < "u" ? new AbortController() : null;
			let t = K, n = () => q || t !== K;
			if (H.value = !0, U.value = null, B.value = null, V.value = null, !e) {
				U.value = "No series id provided", H.value = !1;
				return;
			}
			try {
				let r = new i({ baseUrl: w.value }), a = await r.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t?.signal);
				if (n()) return;
				B.value = a.item;
				let o = await m(r, w.value, e, t?.signal);
				if (n()) return;
				V.value = p(o, G.value), V.value?.seasonItem && z.hydrate(V.value.seasonItem), H.value = !1;
			} catch (e) {
				if (n() || oe(e)) return;
				U.value = e instanceof Error ? e.message : "Failed to load season", H.value = !1;
			}
		}
		O(J), ne([W, G], J), D(() => {
			q = !0, K?.abort(), K = null;
		});
		function Y(e, t) {
			F?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function se(e) {
			Y("player", { id: e.id });
		}
		function Ce(e) {
			Y("media", { id: e.id });
		}
		function X() {
			W.value ? Y("media", { id: W.value }) : F?.back();
		}
		let we = _(() => V.value?.seasonPoster ?? B.value?.poster_url ?? null), Te = _(() => V.value?.seasonItem?.overview ?? null);
		function Ee() {
			if (!V.value) return;
			let e = h(V.value, L.resumeMap);
			e ? Y("player", { id: e.id }) : R.info(I("season.noEpisodes"));
		}
		let Z = _(() => V.value?.seasonItem?.id ?? null), Q = _(() => Z.value ? z.isFavorite(Z.value) : !1), $ = _(() => Z.value ? z.isWatched(Z.value) : !1), De = _(() => Z.value ? z.likeLevel(Z.value) : 0);
		function Oe() {
			Z.value && z.toggleFavorite(Z.value, w.value);
		}
		function ke() {
			Z.value && z.toggleWatched(Z.value, w.value);
		}
		function Ae(e) {
			Z.value && z.setLike(Z.value, e, w.value);
		}
		return (e, r) => (k(), b("div", le, [H.value ? (k(), b("div", {
			key: 0,
			class: "season-page__loading",
			role: "status",
			"aria-busy": "true",
			"aria-label": N(I)("season.loadingAria")
		}, [C(f, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), C(f, {
			variant: "text",
			lines: 3
		})], 8, ue)) : U.value ? (k(), v(l, {
			key: 1,
			icon: "alert",
			title: N(I)("season.loadError"),
			description: U.value
		}, {
			actions: P(() => [C(u, {
				variant: "solid",
				onClick: J
			}, {
				default: P(() => [S(M(N(I)("common.retry")), 1)]),
				_: 1
			}), C(u, {
				variant: "ghost",
				onClick: X
			}, {
				default: P(() => [S(M(N(I)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : B.value && V.value ? (k(), b(g, { key: 2 }, [x("header", de, [x("button", {
			type: "button",
			class: "season-page__back",
			onClick: X
		}, [C(t, { name: "arrow-left" }), x("span", null, M(B.value.name), 1)]), x("div", fe, [x("div", pe, [we.value ? (k(), b("img", {
			key: 0,
			class: "season-page__img",
			src: N(T)(we.value),
			alt: `${B.value.name} ${V.value.label}`,
			decoding: "async"
		}, null, 8, me)) : (k(), b("div", he, [C(t, { name: "tv" })]))]), x("div", ge, [
			x("p", _e, M(B.value.name), 1),
			x("h1", ve, M(V.value.label), 1),
			x("p", ye, M(V.value.episodes.length) + " " + M(N(n)(V.value.episodes.length, "episode", "episodes")), 1),
			x("div", be, [C(u, {
				variant: "solid",
				"left-icon": "play",
				onClick: Ee
			}, {
				default: P(() => [S(M(N(I)("season.play")), 1)]),
				_: 1
			}), Z.value ? (k(), b(g, { key: 0 }, [
				C(u, {
					variant: "ghost",
					class: E(["season-page__favorite", { "is-active": Q.value }]),
					"left-icon": Q.value ? "bookmark" : "bookmark-plus",
					"aria-label": Q.value ? N(I)("season.removeFavorite") : N(I)("season.addFavorite"),
					"aria-pressed": Q.value ? "true" : "false",
					onClick: Oe
				}, {
					default: P(() => [S(M(Q.value ? N(I)("season.inFavorites") : N(I)("season.watchlist")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				C(u, {
					variant: "ghost",
					class: E(["season-page__watched", { "is-active": $.value }]),
					"left-icon": $.value ? "eye" : "eye-off",
					"aria-label": $.value ? N(I)("season.markUnwatchedAria") : N(I)("season.markWatchedAria"),
					"aria-pressed": $.value ? "true" : "false",
					onClick: ke
				}, {
					default: P(() => [S(M($.value ? N(I)("season.watched") : N(I)("season.markWatched")), 1)]),
					_: 1
				}, 8, [
					"class",
					"left-icon",
					"aria-label",
					"aria-pressed"
				]),
				C(c, {
					level: De.value,
					onCycle: Ae
				}, null, 8, ["level"])
			], 64)) : y("", !0)]),
			Te.value ? (k(), b("p", xe, M(Te.value), 1)) : y("", !0)
		])])]), x("section", {
			class: "season-page__episodes",
			"aria-label": N(I)("season.episodes")
		}, [V.value.episodes.length ? (k(), v(ce, {
			key: 0,
			seasons: ae.value,
			"open-first-only": !1,
			"api-base": N(w),
			onPlay: se,
			onOpen: Ce
		}, null, 8, ["seasons", "api-base"])) : (k(), v(l, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))], 8, Se)], 64)) : B.value ? (k(), v(l, {
			key: 3,
			icon: "tv",
			title: N(I)("season.notFound"),
			description: N(I)("season.notFoundDescription", { series: B.value.name })
		}, {
			actions: P(() => [C(u, {
				variant: "solid",
				onClick: X
			}, {
				default: P(() => [S(M(N(I)("season.backToSeries")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : y("", !0)]));
	}
}), [["__scopeId", "data-v-e44939e1"]]);
//#endregion
export { Ce as default };

//# sourceMappingURL=SeasonPage-CglVUh_6.js.map