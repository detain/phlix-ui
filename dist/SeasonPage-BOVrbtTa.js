import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./client-Dywsiudr.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as ee } from "./series-grouping-BTZK8Agh.js";
import { t as c } from "./useSeriesSeasons-LD7RRPM9.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, onBeforeUnmount as te, onMounted as ne, openBlock as v, ref as y, renderList as b, toDisplayString as x, watch as S, withCtx as C } from "vue";
import { useRoute as re, useRouter as ie } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var w = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, T = ["open"], E = { class: "series-seasons__summary" }, D = { class: "series-seasons__season-label" }, O = { class: "series-seasons__season-count numeric" }, k = { class: "series-seasons__episodes" }, A = ["aria-label", "onClick"], j = ["onClick"], M = { class: "series-seasons__episode-title" }, N = {
	key: 0,
	class: "series-seasons__episode-overview"
}, P = {
	key: 0,
	class: "series-seasons__episode-runtime numeric"
}, F = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SeriesSeasons",
	props: {
		seasons: {},
		openFirstOnly: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["play"],
	setup(e, { emit: n }) {
		let r = e, i = n;
		function a(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function o(e) {
			return e.runtime ? `${e.runtime}m` : null;
		}
		function s(e) {
			return r.openFirstOnly ? e === 0 : !0;
		}
		return (n, r) => (v(), p("section", w, [(v(!0), p(l, null, b(e.seasons, (e, n) => (v(), p("details", {
			key: e.key,
			class: "series-seasons__season",
			open: s(n)
		}, [m("summary", E, [
			g(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			m("span", D, x(e.label), 1),
			m("span", O, x(e.episodes.length) + " " + x(e.episodes.length === 1 ? "episode" : "episodes"), 1)
		]), m("ul", k, [(v(!0), p(l, null, b(e.episodes, (e) => (v(), p("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			m("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${a(e)}`,
				onClick: (t) => i("play", e)
			}, [g(t, { name: "play" })], 8, A),
			m("button", {
				type: "button",
				class: "series-seasons__episode-main",
				onClick: (t) => i("play", e)
			}, [m("span", M, x(a(e)), 1), e.overview ? (v(), p("span", N, x(e.overview), 1)) : f("", !0)], 8, j),
			o(e) ? (v(), p("span", P, x(o(e)), 1)) : f("", !0)
		]))), 128))])], 8, T))), 128))]));
	}
}), [["__scopeId", "data-v-9f4cfae0"]]), I = { class: "season-page" }, L = {
	key: 0,
	class: "season-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading season"
}, R = { class: "season-page__header" }, z = { class: "season-page__hero" }, B = { class: "season-page__poster" }, V = ["src", "alt"], H = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, U = { class: "season-page__info" }, W = { class: "season-page__series-name" }, G = { class: "season-page__title" }, K = { class: "season-page__count numeric" }, q = {
	key: 0,
	class: "season-page__overview"
}, J = {
	class: "season-page__episodes",
	"aria-label": "Episodes"
}, Y = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SeasonPage",
	setup(e) {
		let _ = r(), b = re(), w = ie(), T = y(null), E = y(null), D = y(!0), O = y(null), k = u(() => String(b.params.id ?? "")), A = u(() => String(b.params.season ?? ""));
		i(() => {
			if (T.value) return E.value ? `${T.value.name} · ${E.value.label}` : T.value.name;
		});
		let j = u(() => E.value ? [E.value] : []), M = null, N = !1;
		function P(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function Y() {
			let e = k.value;
			M?.abort(), M = typeof AbortController < "u" ? new AbortController() : null;
			let t = M, r = () => N || t !== M;
			if (D.value = !0, O.value = null, T.value = null, E.value = null, !e) {
				O.value = "No series id provided", D.value = !1;
				return;
			}
			try {
				let i = new n({ baseUrl: _.value }), a = await i.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t?.signal);
				if (r()) return;
				T.value = a.item;
				let o = await c(i, _.value, e, t?.signal);
				if (r()) return;
				E.value = ee(o, A.value), D.value = !1;
			} catch (e) {
				if (r() || P(e)) return;
				O.value = e instanceof Error ? e.message : "Failed to load season", D.value = !1;
			}
		}
		ne(Y), S([k, A], Y), te(() => {
			N = !0, M?.abort(), M = null;
		});
		function X(e, t) {
			w?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function ae(e) {
			X("player", { id: e.id });
		}
		function Z() {
			k.value ? X("media", { id: k.value }) : w?.back();
		}
		let Q = u(() => E.value?.seasonPoster ?? T.value?.poster_url ?? null), $ = u(() => E.value?.seasonItem?.overview ?? null);
		return (e, n) => (v(), p("div", I, [D.value ? (v(), p("div", L, [g(o, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), g(o, {
			variant: "text",
			lines: 3
		})])) : O.value ? (v(), d(s, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this season",
			description: O.value
		}, {
			actions: C(() => [g(a, {
				variant: "solid",
				onClick: Y
			}, {
				default: C(() => [...n[0] ||= [h("Retry", -1)]]),
				_: 1
			}), g(a, {
				variant: "ghost",
				onClick: Z
			}, {
				default: C(() => [...n[1] ||= [h("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : T.value && E.value ? (v(), p(l, { key: 2 }, [m("header", R, [m("button", {
			type: "button",
			class: "season-page__back",
			onClick: Z
		}, [g(t, { name: "arrow-left" }), m("span", null, x(T.value.name), 1)]), m("div", z, [m("div", B, [Q.value ? (v(), p("img", {
			key: 0,
			class: "season-page__img",
			src: Q.value,
			alt: `${T.value.name} ${E.value.label}`,
			decoding: "async"
		}, null, 8, V)) : (v(), p("div", H, [g(t, { name: "tv" })]))]), m("div", U, [
			m("p", W, x(T.value.name), 1),
			m("h1", G, x(E.value.label), 1),
			m("p", K, x(E.value.episodes.length) + " " + x(E.value.episodes.length === 1 ? "episode" : "episodes"), 1),
			$.value ? (v(), p("p", q, x($.value), 1)) : f("", !0)
		])])]), m("section", J, [E.value.episodes.length ? (v(), d(F, {
			key: 0,
			seasons: j.value,
			"open-first-only": !1,
			onPlay: ae
		}, null, 8, ["seasons"])) : (v(), d(s, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))])], 64)) : T.value ? (v(), d(s, {
			key: 3,
			icon: "tv",
			title: "Season not found",
			description: `${T.value.name} has no such season.`
		}, {
			actions: C(() => [g(a, {
				variant: "solid",
				onClick: Z
			}, {
				default: C(() => [...n[2] ||= [h("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : f("", !0)]));
	}
}), [["__scopeId", "data-v-562bc09a"]]);
//#endregion
export { Y as default };

//# sourceMappingURL=SeasonPage-BOVrbtTa.js.map