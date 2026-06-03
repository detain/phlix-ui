import { a as e, f as t, h as n, i as r, m as i, n as a, o, r as s, t as c } from "./Button-C86XulWV.js";
import { t as ee } from "./Modal-DaapuyD8.js";
import { t as te } from "./Badge-BiYXL5Nz.js";
import { t as ne } from "./history-ByCY8OYj.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, normalizeStyle as y, onMounted as b, openBlock as x, ref as S, renderList as re, toDisplayString as C, withCtx as w } from "vue";
//#region src/pages/admin/HistoryPage.vue?vue&type=script&setup=true&lang.ts
var ie = {
	class: "admin-history",
	"aria-labelledby": "history-heading"
}, T = { class: "admin-history__head" }, E = {
	key: 0,
	class: "admin-history__skel"
}, D = {
	class: "admin-history__list",
	"aria-label": "Watch history"
}, O = { class: "admin-history__thumb" }, k = ["src", "alt"], ae = {
	key: 1,
	class: "admin-history__placeholder",
	"aria-hidden": "true"
}, oe = { class: "admin-history__info" }, se = { class: "admin-history__title-row" }, ce = { class: "admin-history__item-title" }, A = {
	key: 0,
	class: "admin-history__time"
}, j = {
	key: 1,
	class: "admin-history__progress"
}, M = ["aria-valuenow"], N = { class: "admin-history__progress-label" }, P = { class: "admin-history__actions" }, F = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, I = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "HistoryPage",
	props: { client: {} },
	emits: ["continue"],
	setup(n, { emit: _ }) {
		let I = n, L = _, R = v("apiBase", ""), z = u(() => typeof R == "string" ? R : R?.value ?? ""), B = new ne(I.client ?? new o({
			baseUrl: z.value,
			tokenStore: new e()
		})), V = r(), H = S([]), U = S(!0), W = S(null), G = S(!1), K = S(!1);
		async function q() {
			U.value = !0, W.value = null;
			try {
				H.value = await B.getRecentlyWatched();
			} catch (e) {
				W.value = t(e, "Failed to load watch history."), V.error(W.value);
			} finally {
				U.value = !1;
			}
		}
		async function J(e) {
			try {
				await B.removeFromHistory(e), V.success("Removed from watch history."), await q();
			} catch (e) {
				V.error(t(e, "Failed to remove item."));
			}
		}
		async function le() {
			K.value = !0;
			try {
				await B.clearHistory(), V.success("Watch history cleared."), G.value = !1, await q();
			} catch (e) {
				V.error(t(e, "Failed to clear history."));
			} finally {
				K.value = !1;
			}
		}
		function ue(e) {
			L("continue", e);
		}
		function de(e) {
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
		function fe(e) {
			return e.media_type ?? e.type ?? "media";
		}
		function X(e) {
			return e.thumbnail_url ?? e.poster_url;
		}
		function Z(e) {
			let t = e.progress_percent;
			return t !== void 0 && t > 0 && t < 100;
		}
		function pe(e) {
			return Math.round(e.progress_percent ?? 0);
		}
		function Q(e) {
			return e.media_item_id ?? e.id;
		}
		let $ = u(() => Array.isArray(H.value) && H.value.length > 0);
		return b(q), (e, t) => (x(), p("section", ie, [
			m("header", T, [t[5] ||= m("h1", {
				id: "history-heading",
				class: "admin-history__title"
			}, "Watch History", -1), $.value ? (x(), d(c, {
				key: 0,
				variant: "outline",
				size: "sm",
				"left-icon": "x",
				onClick: t[0] ||= (e) => G.value = !0
			}, {
				default: w(() => [...t[4] ||= [h(" Clear All ", -1)]]),
				_: 1
			})) : f("", !0)]),
			U.value ? (x(), p("div", E, [g(a, {
				variant: "text",
				lines: 6
			})])) : W.value ? (x(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load watch history",
				description: W.value
			}, {
				actions: w(() => [g(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: q
				}, {
					default: w(() => [...t[6] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : $.value ? (x(), p(l, { key: 3 }, [m("ul", D, [(x(!0), p(l, null, re(H.value, (e) => (x(), p("li", {
				key: e.id,
				class: "admin-history__item"
			}, [
				m("div", O, [X(e) ? (x(), p("img", {
					key: 0,
					src: X(e),
					alt: `Thumbnail for ${Y(e)}`,
					class: "admin-history__img"
				}, null, 8, k)) : (x(), p("span", ae, [g(i, { name: "film" })]))]),
				m("div", oe, [
					m("div", se, [m("span", ce, C(Y(e)), 1), g(te, { tone: "neutral" }, {
						default: w(() => [h(C(fe(e)), 1)]),
						_: 2
					}, 1024)]),
					e.last_watched_at ? (x(), p("p", A, " Watched " + C(de(e.last_watched_at)), 1)) : f("", !0),
					Z(e) ? (x(), p("div", j, [m("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [m("div", {
						class: "admin-history__progress-fill",
						style: y({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, M), m("span", N, C(pe(e)) + "%", 1)])) : f("", !0)
				]),
				m("div", P, [Z(e) ? (x(), d(c, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					"aria-label": `Continue watching ${Y(e)}`,
					onClick: (t) => ue(Q(e))
				}, {
					default: w(() => [...t[7] ||= [h(" Continue ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : f("", !0), g(c, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${Y(e)} from history`,
					onClick: (t) => J(Q(e))
				}, {
					default: w(() => [...t[8] ||= [h(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]), H.value.length >= 50 ? (x(), p("p", F, " Showing " + C(H.value.length) + " items. Older items are not shown. ", 1)) : f("", !0)], 64)) : (x(), d(s, {
				key: 2,
				icon: "film",
				title: "No watch history yet",
				description: "Items you watch will appear here."
			})),
			g(ee, {
				modelValue: G.value,
				"onUpdate:modelValue": t[2] ||= (e) => G.value = e,
				title: "Clear Watch History",
				size: "sm",
				onClose: t[3] ||= (e) => G.value = !1
			}, {
				footer: w(() => [g(c, {
					variant: "ghost",
					size: "sm",
					disabled: K.value,
					onClick: t[1] ||= (e) => G.value = !1
				}, {
					default: w(() => [...t[9] ||= [h(" Cancel ", -1)]]),
					_: 1
				}, 8, ["disabled"]), g(c, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: le
				}, {
					default: w(() => [...t[10] ||= [h(" Clear All ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [t[11] ||= m("p", null, "Clear all items from your watch history? This cannot be undone.", -1)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-d58c1d0d"]]);
//#endregion
export { I as default };

//# sourceMappingURL=HistoryPage-C1INlwZX.js.map