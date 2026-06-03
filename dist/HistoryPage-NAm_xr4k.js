import { a as e, d as t, i as n, m as r, n as i, p as a, r as o, t as s } from "./Button-DjEQ9y17.js";
import { t as ee } from "./Modal-BkSAbwHm.js";
import { t as te } from "./EmptyState-bbKd8GNA.js";
import { t as ne } from "./Badge-DobVc76J.js";
import { t as c } from "./history-ByCY8OYj.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, normalizeStyle as y, onMounted as b, openBlock as x, ref as S, renderList as re, toDisplayString as C, withCtx as w } from "vue";
//#region src/pages/admin/HistoryPage.vue?vue&type=script&setup=true&lang.ts
var T = {
	class: "admin-history",
	"aria-labelledby": "history-heading"
}, E = { class: "admin-history__head" }, D = {
	key: 0,
	class: "admin-history__skel"
}, O = {
	class: "admin-history__list",
	"aria-label": "Watch history"
}, k = { class: "admin-history__thumb" }, ie = ["src", "alt"], ae = {
	key: 1,
	class: "admin-history__placeholder",
	"aria-hidden": "true"
}, oe = { class: "admin-history__info" }, A = { class: "admin-history__title-row" }, j = { class: "admin-history__item-title" }, M = {
	key: 0,
	class: "admin-history__time"
}, N = {
	key: 1,
	class: "admin-history__progress"
}, P = ["aria-valuenow"], F = { class: "admin-history__progress-label" }, I = { class: "admin-history__actions" }, L = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, R = /*#__PURE__*/ r(/* @__PURE__ */ _({
	__name: "HistoryPage",
	props: { client: {} },
	emits: ["continue"],
	setup(r, { emit: _ }) {
		let R = r, z = _, B = v("apiBase", ""), V = u(() => typeof B == "string" ? B : B?.value ?? ""), H = new c(R.client ?? new e({
			baseUrl: V.value,
			tokenStore: new n()
		})), U = o(), W = S([]), G = S(!0), K = S(!1), q = S(!1);
		async function J() {
			G.value = !0;
			try {
				W.value = await H.getRecentlyWatched();
			} catch (e) {
				U.error(t(e, "Failed to load watch history."));
			} finally {
				G.value = !1;
			}
		}
		async function se(e) {
			try {
				await H.removeFromHistory(e), U.success("Removed from watch history."), await J();
			} catch (e) {
				U.error(t(e, "Failed to remove item."));
			}
		}
		async function ce() {
			q.value = !0;
			try {
				await H.clearHistory(), U.success("Watch history cleared."), K.value = !1, await J();
			} catch (e) {
				U.error(t(e, "Failed to clear history."));
			} finally {
				q.value = !1;
			}
		}
		function le(e) {
			z("continue", e);
		}
		function ue(e) {
			let t = new Date(e), n = Math.floor(((/* @__PURE__ */ new Date()).getTime() - t.getTime()) / 1e3);
			if (n < 60) return "just now";
			let r = Math.floor(n / 60);
			if (r < 60) return `${r} minute${r === 1 ? "" : "s"} ago`;
			let i = Math.floor(r / 60);
			if (i < 24) return `${i} hour${i === 1 ? "" : "s"} ago`;
			let a = Math.floor(i / 24);
			if (a < 30) return `${a} day${a === 1 ? "" : "s"} ago`;
			let o = Math.floor(a / 30);
			return `${o} month${o === 1 ? "" : "s"} ago`;
		}
		function Y(e) {
			return e.title ?? e.name ?? e.media_item_id ?? e.id;
		}
		function de(e) {
			return e.media_type ?? e.type ?? "media";
		}
		function X(e) {
			return e.thumbnail_url ?? e.poster_url;
		}
		function Z(e) {
			let t = e.progress_percent;
			return t !== void 0 && t > 0 && t < 100;
		}
		function fe(e) {
			return Math.round(e.progress_percent ?? 0);
		}
		function Q(e) {
			return e.media_item_id ?? e.id;
		}
		let $ = u(() => Array.isArray(W.value) && W.value.length > 0);
		return b(J), (e, t) => (x(), p("section", T, [
			m("header", E, [t[5] ||= m("h1", {
				id: "history-heading",
				class: "admin-history__title"
			}, "Watch History", -1), $.value ? (x(), d(s, {
				key: 0,
				variant: "outline",
				size: "sm",
				"left-icon": "x",
				onClick: t[0] ||= (e) => K.value = !0
			}, {
				default: w(() => [...t[4] ||= [h(" Clear All ", -1)]]),
				_: 1
			})) : f("", !0)]),
			G.value ? (x(), p("div", D, [g(i, {
				variant: "text",
				lines: 6
			})])) : $.value ? (x(), p(l, { key: 2 }, [m("ul", O, [(x(!0), p(l, null, re(W.value, (e) => (x(), p("li", {
				key: e.id,
				class: "admin-history__item"
			}, [
				m("div", k, [X(e) ? (x(), p("img", {
					key: 0,
					src: X(e),
					alt: `Thumbnail for ${Y(e)}`,
					class: "admin-history__img"
				}, null, 8, ie)) : (x(), p("span", ae, [g(a, { name: "film" })]))]),
				m("div", oe, [
					m("div", A, [m("span", j, C(Y(e)), 1), g(ne, { tone: "neutral" }, {
						default: w(() => [h(C(de(e)), 1)]),
						_: 2
					}, 1024)]),
					e.last_watched_at ? (x(), p("p", M, " Watched " + C(ue(e.last_watched_at)), 1)) : f("", !0),
					Z(e) ? (x(), p("div", N, [m("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [m("div", {
						class: "admin-history__progress-fill",
						style: y({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, P), m("span", F, C(fe(e)) + "%", 1)])) : f("", !0)
				]),
				m("div", I, [Z(e) ? (x(), d(s, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					"aria-label": `Continue watching ${Y(e)}`,
					onClick: (t) => le(Q(e))
				}, {
					default: w(() => [...t[6] ||= [h(" Continue ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : f("", !0), g(s, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${Y(e)} from history`,
					onClick: (t) => se(Q(e))
				}, {
					default: w(() => [...t[7] ||= [h(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]), W.value.length >= 50 ? (x(), p("p", L, " Showing " + C(W.value.length) + " items. Older items are not shown. ", 1)) : f("", !0)], 64)) : (x(), d(te, {
				key: 1,
				icon: "film",
				title: "No watch history yet",
				description: "Items you watch will appear here."
			})),
			g(ee, {
				modelValue: K.value,
				"onUpdate:modelValue": t[2] ||= (e) => K.value = e,
				title: "Clear Watch History",
				size: "sm",
				onClose: t[3] ||= (e) => K.value = !1
			}, {
				footer: w(() => [g(s, {
					variant: "ghost",
					size: "sm",
					disabled: q.value,
					onClick: t[1] ||= (e) => K.value = !1
				}, {
					default: w(() => [...t[8] ||= [h(" Cancel ", -1)]]),
					_: 1
				}, 8, ["disabled"]), g(s, {
					variant: "solid",
					size: "sm",
					loading: q.value,
					onClick: ce
				}, {
					default: w(() => [...t[9] ||= [h(" Clear All ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [t[10] ||= m("p", null, "Clear all items from your watch history? This cannot be undone.", -1)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-78832762"]]);
//#endregion
export { R as default };

//# sourceMappingURL=HistoryPage-NAm_xr4k.js.map