import { n as e, t } from "./Icon-24ngwBUH.js";
import { r as n, t as r } from "./client-fw74f3l_.js";
import { n as i } from "./useApiBase-CV_r-Kk4.js";
import { i as a } from "./usePageTitle-BO3GGF3M.js";
import { t as o } from "./Button-CInT03Lp.js";
import { t as s } from "./Skeleton-BUq2D39t.js";
import { t as c } from "./EmptyState-0XgHKEGf.js";
import { t as l } from "./series-grouping-Bbs1zX87.js";
import { t as u } from "./useSeriesSeasons-ezSOXOgO.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onBeforeUnmount as x, onMounted as S, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, watch as O, withCtx as k, withModifiers as A } from "vue";
import { useRoute as j, useRouter as M } from "vue-router";
//#region src/components/SeriesSeasons.vue?vue&type=script&setup=true&lang.ts
var N = {
	class: "series-seasons",
	"aria-label": "Seasons and episodes"
}, P = ["open"], F = { class: "series-seasons__summary" }, I = { class: "series-seasons__season-label" }, L = { class: "series-seasons__season-count numeric" }, R = { class: "series-seasons__episodes" }, z = ["aria-label", "onClick"], B = ["aria-label", "onClick"], V = { class: "series-seasons__episode-title" }, H = {
	key: 0,
	class: "series-seasons__episode-overview"
}, U = {
	key: 0,
	class: "series-seasons__episode-runtime numeric"
}, W = [
	"aria-label",
	"title",
	"onClick"
], G = {
	key: 2,
	class: "series-seasons__files-detail"
}, K = {
	key: 0,
	class: "series-seasons__files-loading"
}, q = { class: "series-seasons__file-path" }, J = { class: "series-seasons__file-meta numeric" }, Y = {
	key: 2,
	class: "series-seasons__files-empty"
}, X = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
		let i = e, a = r, o = b("auth", { isAdmin: !1 }), s = w({}), c = w(/* @__PURE__ */ new Set());
		function l(e) {
			return s.value[e];
		}
		function u(e) {
			return c.value.has(e);
		}
		async function p(e) {
			if (s.value[e] === void 0) try {
				let t = await n.get(`${i.apiBase}/api/v1/media/${encodeURIComponent(e)}`);
				s.value[e] = t.files ?? [];
			} catch {
				s.value[e] = [];
			}
		}
		function y(e) {
			u(e) ? c.value.delete(e) : (c.value.add(e), p(e));
		}
		function x(e) {
			let t = e.episode_title || e.name;
			return typeof e.episode_number == "number" ? `${e.episode_number}. ${t}` : t;
		}
		function S(e) {
			return e.runtime ? `${e.runtime}m` : null;
		}
		function D(e) {
			return i.openFirstOnly ? e === 0 : !0;
		}
		function O(e) {
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
		let k = f(() => o.isAdmin && !!i.apiBase);
		return (n, r) => (C(), h("section", N, [(C(!0), h(d, null, T(e.seasons, (e, n) => (C(), h("details", {
			key: e.key,
			class: "series-seasons__season",
			open: D(n)
		}, [g("summary", F, [
			v(t, {
				name: "chevron-right",
				class: "series-seasons__chevron",
				"aria-hidden": "true"
			}),
			g("span", I, E(e.label), 1),
			g("span", L, E(e.episodes.length) + " " + E(e.episodes.length === 1 ? "episode" : "episodes"), 1)
		]), g("ul", R, [(C(!0), h(d, null, T(e.episodes, (e) => (C(), h("li", {
			key: e.id,
			class: "series-seasons__episode"
		}, [
			g("button", {
				type: "button",
				class: "series-seasons__play",
				"aria-label": `Play ${x(e)}`,
				onClick: (t) => a("play", e)
			}, [v(t, { name: "play" })], 8, z),
			g("button", {
				type: "button",
				class: "series-seasons__episode-main",
				"aria-label": `View ${x(e)}`,
				onClick: (t) => a("open", e)
			}, [g("span", V, E(x(e)), 1), e.overview ? (C(), h("span", H, E(e.overview), 1)) : m("", !0)], 8, B),
			S(e) ? (C(), h("span", U, E(S(e)), 1)) : m("", !0),
			k.value ? (C(), h("button", {
				key: 1,
				type: "button",
				class: "series-seasons__files-btn",
				"aria-label": `Files info for ${x(e)}${u(e.id) ? " (expanded)" : ""}`,
				title: u(e.id) ? "Collapse files" : "Expand files",
				onClick: A((t) => y(e.id), ["stop"])
			}, [v(t, {
				name: u(e.id) ? "x" : "info",
				"aria-hidden": "true"
			}, null, 8, ["name"])], 8, W)) : m("", !0),
			k.value && u(e.id) ? (C(), h("div", G, [l(e.id) === void 0 ? (C(), h("span", K, " Loading… ")) : l(e.id)?.length ? (C(!0), h(d, { key: 1 }, T(l(e.id), (e, t) => (C(), h("span", {
				key: t,
				class: "series-seasons__file-row"
			}, [g("span", q, E(e.path), 1), g("span", J, [
				_(E(O(e.size_bytes)) + " ", 1),
				e.container ? (C(), h(d, { key: 0 }, [_(" · " + E(e.container), 1)], 64)) : m("", !0),
				e.resolution ? (C(), h(d, { key: 1 }, [_(" · " + E(e.resolution), 1)], 64)) : m("", !0)
			])]))), 128)) : (C(), h("span", Y, "No files"))])) : m("", !0)
		]))), 128))])], 8, P))), 128))]));
	}
}), [["__scopeId", "data-v-61c577e7"]]), Z = { class: "season-page" }, Q = {
	key: 0,
	class: "season-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading season"
}, $ = { class: "season-page__header" }, ee = { class: "season-page__hero" }, te = { class: "season-page__poster" }, ne = ["src", "alt"], re = {
	key: 1,
	class: "season-page__fallback",
	"aria-hidden": "true"
}, ie = { class: "season-page__info" }, ae = { class: "season-page__series-name" }, oe = { class: "season-page__title" }, se = { class: "season-page__count numeric" }, ce = {
	key: 0,
	class: "season-page__overview"
}, le = {
	class: "season-page__episodes",
	"aria-label": "Episodes"
}, ue = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "SeasonPage",
	setup(e) {
		let n = i(), y = j(), b = M(), T = w(null), A = w(null), N = w(!0), P = w(null), F = f(() => String(y.params.id ?? "")), I = f(() => String(y.params.season ?? ""));
		a(() => {
			if (T.value) return A.value ? `${T.value.name} · ${A.value.label}` : T.value.name;
		});
		let L = f(() => A.value ? [A.value] : []), R = null, z = !1;
		function B(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function V() {
			let e = F.value;
			R?.abort(), R = typeof AbortController < "u" ? new AbortController() : null;
			let t = R, i = () => z || t !== R;
			if (N.value = !0, P.value = null, T.value = null, A.value = null, !e) {
				P.value = "No series id provided", N.value = !1;
				return;
			}
			try {
				let a = new r({ baseUrl: n.value }), o = await a.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, t?.signal);
				if (i()) return;
				T.value = o.item;
				let s = await u(a, n.value, e, t?.signal);
				if (i()) return;
				A.value = l(s, I.value), N.value = !1;
			} catch (e) {
				if (i() || B(e)) return;
				P.value = e instanceof Error ? e.message : "Failed to load season", N.value = !1;
			}
		}
		S(V), O([F, I], V), x(() => {
			z = !0, R?.abort(), R = null;
		});
		function H(e, t) {
			b?.push({
				name: e,
				params: t
			}).catch(() => {});
		}
		function U(e) {
			H("player", { id: e.id });
		}
		function W(e) {
			H("media", { id: e.id });
		}
		function G() {
			F.value ? H("media", { id: F.value }) : b?.back();
		}
		let K = f(() => A.value?.seasonPoster ?? T.value?.poster_url ?? null), q = f(() => A.value?.seasonItem?.overview ?? null);
		return (e, r) => (C(), h("div", Z, [N.value ? (C(), h("div", Q, [v(s, {
			variant: "text",
			width: "40%",
			height: "1.6rem"
		}), v(s, {
			variant: "text",
			lines: 3
		})])) : P.value ? (C(), p(c, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this season",
			description: P.value
		}, {
			actions: k(() => [v(o, {
				variant: "solid",
				onClick: V
			}, {
				default: k(() => [...r[0] ||= [_("Retry", -1)]]),
				_: 1
			}), v(o, {
				variant: "ghost",
				onClick: G
			}, {
				default: k(() => [...r[1] ||= [_("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : T.value && A.value ? (C(), h(d, { key: 2 }, [g("header", $, [g("button", {
			type: "button",
			class: "season-page__back",
			onClick: G
		}, [v(t, { name: "arrow-left" }), g("span", null, E(T.value.name), 1)]), g("div", ee, [g("div", te, [K.value ? (C(), h("img", {
			key: 0,
			class: "season-page__img",
			src: K.value,
			alt: `${T.value.name} ${A.value.label}`,
			decoding: "async"
		}, null, 8, ne)) : (C(), h("div", re, [v(t, { name: "tv" })]))]), g("div", ie, [
			g("p", ae, E(T.value.name), 1),
			g("h1", oe, E(A.value.label), 1),
			g("p", se, E(A.value.episodes.length) + " " + E(A.value.episodes.length === 1 ? "episode" : "episodes"), 1),
			q.value ? (C(), h("p", ce, E(q.value), 1)) : m("", !0)
		])])]), g("section", le, [A.value.episodes.length ? (C(), p(X, {
			key: 0,
			seasons: L.value,
			"open-first-only": !1,
			"api-base": D(n),
			onPlay: U,
			onOpen: W
		}, null, 8, ["seasons", "api-base"])) : (C(), p(c, {
			key: 1,
			icon: "tv",
			title: "No episodes yet",
			description: "This season has no episodes available to watch."
		}))])], 64)) : T.value ? (C(), p(c, {
			key: 3,
			icon: "tv",
			title: "Season not found",
			description: `${T.value.name} has no such season.`
		}, {
			actions: k(() => [v(o, {
				variant: "solid",
				onClick: G
			}, {
				default: k(() => [...r[2] ||= [_("Back to series", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : m("", !0)]));
	}
}), [["__scopeId", "data-v-691e30d2"]]);
//#endregion
export { ue as default };

//# sourceMappingURL=SeasonPage-OieN4o1r.js.map