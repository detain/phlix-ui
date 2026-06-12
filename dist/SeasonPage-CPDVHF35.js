import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r } from "./Button-BwQkyEkr.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { t as a } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { t as s } from "./series-grouping-BTZK8Agh.js";
import { t as c } from "./useSeriesSeasons-DFLY9BpV.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ee, onBeforeUnmount as te, onMounted as ne, openBlock as v, ref as y, renderList as b, toDisplayString as x, watch as re, withCtx as S } from "vue";
import { useRoute as ie, useRouter as ae } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var C = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, w = ["open"], T = { class: "series-seasons__summary" }, E = { class: "series-seasons__season-label" }, D = { class: "series-seasons__season-count numeric" }, O = { class: "series-seasons__episodes" }, k = ["aria-label", "onClick"], A = ["onClick"], j = { class: "series-seasons__episode-title" }, M = {
	key: 0,
	class: "series-seasons__episode-overview"
}, N = {
	key: 0,
	class: "series-seasons__episode-runtime numeric"
}, P = /*#__PURE__*/ e(/* @__PURE__ */ _({
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
		return (n, r) => (v(), p("section", C, [(v(!0), p(l, null, b(e.seasons, (e, n) => (v(), p("details", {
			key: e.key,
			class: "series-seasons__season",
			open: s(n)
		}, [m("summary", T, [
			g(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			m("span", E, x(e.label), 1),
			m("span", D, x(e.episodes.length) + " " + x(e.episodes.length === 1 ? "episode" : "episodes"), 1)
		]), m("ul", O, [(v(!0), p(l, null, b(e.episodes, (e) => (v(), p("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			m("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${a(e)}`,
				onClick: (t) => i("play", e)
			}, [g(t, { name: "play" })], 8, k),
			m("button", {
				type: "button",
				class: "series-seasons__episode-main",
				onClick: (t) => i("play", e)
			}, [m("span", j, x(a(e)), 1), e.overview ? (v(), p("span", M, x(e.overview), 1)) : f("", !0)], 8, A),
			o(e) ? (v(), p("span", N, x(o(e)), 1)) : f("", !0)
		]))), 128))])], 8, w))), 128))]));
	}
}), [["__scopeId", "data-v-9f4cfae0"]]), F = { class: "season-page" }, I = {
	key: 0,
	class: "season-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading season"
}, L = { class: "season-page__header" }, R = { class: "season-page__hero" }, z = { class: "season-page__poster" }, B = ["src", "alt"], V = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, H = { class: "season-page__info" }, U = { class: "season-page__series-name" }, W = { class: "season-page__title" }, G = { class: "season-page__count numeric" }, K = {
	key: 0,
	class: "season-page__overview"
}, q = {
	class: "season-page__episodes",
	"aria-label": "Episodes"
}, J = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SeasonPage",
	setup(e) {
		let _ = ee("apiBase", ""), b = u(() => typeof _ == "string" ? _ : _?.value ?? ""), C = ie(), w = ae(), T = y(null), E = y(null), D = y(!0), O = y(null), k = u(() => String(C.params.id ?? "")), A = u(() => String(C.params.season ?? ""));
		i(() => {
			if (T.value) return E.value ? `${T.value.name} · ${E.value.label}` : T.value.name;
		});
		let j = u(() => E.value ? [E.value] : []), M = null, N = !1;
		function J(e) {
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
				let i = new n({ baseUrl: b.value }), a = await i.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t?.signal);
				if (r()) return;
				T.value = a.item;
				let o = await c(i, b.value, e, t?.signal);
				if (r()) return;
				E.value = s(o, A.value), D.value = !1;
			} catch (e) {
				if (r() || J(e)) return;
				O.value = e instanceof Error ? e.message : "Failed to load season", D.value = !1;
			}
		}
		ne(Y), re([k, A], Y), te(() => {
			N = !0, M?.abort(), M = null;
		});
		function X(e, t) {
			w?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function oe(e) {
			X("player", { id: e.id });
		}
		function Z() {
			k.value ? X("media", { id: k.value }) : w?.back();
		}
		let Q = u(() => E.value?.seasonPoster ?? T.value?.poster_url ?? null), $ = u(() => E.value?.seasonItem?.overview ?? null);
		return (e, n) => (v(), p("div", F, [D.value ? (v(), p("div", I, [g(a, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), g(a, {
			variant: "text",
			lines: 3
		})])) : O.value ? (v(), d(o, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this season",
			description: O.value
		}, {
			actions: S(() => [g(r, {
				variant: "solid",
				onClick: Y
			}, {
				default: S(() => [...n[0] ||= [h("Retry", -1)]]),
				_: 1
			}), g(r, {
				variant: "ghost",
				onClick: Z
			}, {
				default: S(() => [...n[1] ||= [h("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : T.value && E.value ? (v(), p(l, { key: 2 }, [m("header", L, [m("button", {
			type: "button",
			class: "season-page__back",
			onClick: Z
		}, [g(t, { name: "arrow-left" }), m("span", null, x(T.value.name), 1)]), m("div", R, [m("div", z, [Q.value ? (v(), p("img", {
			key: 0,
			class: "season-page__img",
			src: Q.value,
			alt: `${T.value.name} ${E.value.label}`,
			decoding: "async"
		}, null, 8, B)) : (v(), p("div", V, [g(t, { name: "tv" })]))]), m("div", H, [
			m("p", U, x(T.value.name), 1),
			m("h1", W, x(E.value.label), 1),
			m("p", G, x(E.value.episodes.length) + " " + x(E.value.episodes.length === 1 ? "episode" : "episodes"), 1),
			$.value ? (v(), p("p", K, x($.value), 1)) : f("", !0)
		])])]), m("section", q, [E.value.episodes.length ? (v(), d(P, {
			key: 0,
			seasons: j.value,
			"open-first-only": !1,
			onPlay: oe
		}, null, 8, ["seasons"])) : (v(), d(o, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))])], 64)) : T.value ? (v(), d(o, {
			key: 3,
			icon: "tv",
			title: "Season not found",
			description: `${T.value.name} has no such season.`
		}, {
			actions: S(() => [g(r, {
				variant: "solid",
				onClick: Z
			}, {
				default: S(() => [...n[2] ||= [h("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : f("", !0)]));
	}
}), [["__scopeId", "data-v-8d02608a"]]);
//#endregion
export { J as default };

//# sourceMappingURL=SeasonPage-CPDVHF35.js.map