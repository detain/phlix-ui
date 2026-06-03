import { a as e, i as t, l as n, n as r, r as i, t as a, u as o } from "./tokenStore-DfQvvLGI.js";
import { t as s } from "./Modal-CoXJKJI4.js";
import { t as ee } from "./EmptyState-Oymq15Ey.js";
import { t as te } from "./Badge-Cmz5FPqw.js";
import { t as ne } from "./history-ByCY8OYj.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, normalizeStyle as v, onMounted as y, openBlock as b, ref as x, renderList as re, toDisplayString as S, withCtx as C } from "vue";
//#region src/pages/admin/HistoryPage.vue?vue&type=script&setup=true&lang.ts
var ie = {
	class: "admin-history",
	"aria-labelledby": "history-heading"
}, w = { class: "admin-history__head" }, T = {
	key: 0,
	class: "admin-history__skel"
}, E = {
	class: "admin-history__list",
	"aria-label": "Watch history"
}, D = { class: "admin-history__thumb" }, O = ["src", "alt"], ae = {
	key: 1,
	class: "admin-history__placeholder",
	"aria-hidden": "true"
}, oe = { class: "admin-history__info" }, se = { class: "admin-history__title-row" }, k = { class: "admin-history__item-title" }, A = {
	key: 0,
	class: "admin-history__time"
}, j = {
	key: 1,
	class: "admin-history__progress"
}, M = ["aria-valuenow"], N = { class: "admin-history__progress-label" }, P = { class: "admin-history__actions" }, F = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, I = /*#__PURE__*/ o(/* @__PURE__ */ g({
	__name: "HistoryPage",
	props: { client: {} },
	emits: ["continue"],
	setup(o, { emit: g }) {
		let I = o, L = g, R = _("apiBase", ""), z = l(() => typeof R == "string" ? R : R?.value ?? ""), B = new ne(I.client ?? new e({
			baseUrl: z.value,
			tokenStore: new a()
		})), V = t();
		function H(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let U = x([]), W = x(!0), G = x(!1), K = x(!1);
		async function q() {
			W.value = !0;
			try {
				U.value = await B.getRecentlyWatched();
			} catch (e) {
				V.error(H(e, "Failed to load watch history."));
			} finally {
				W.value = !1;
			}
		}
		async function J(e) {
			try {
				await B.removeFromHistory(e), V.success("Removed from watch history."), await q();
			} catch (e) {
				V.error(H(e, "Failed to remove item."));
			}
		}
		async function ce() {
			K.value = !0;
			try {
				await B.clearHistory(), V.success("Watch history cleared."), G.value = !1, await q();
			} catch (e) {
				V.error(H(e, "Failed to clear history."));
			} finally {
				K.value = !1;
			}
		}
		function le(e) {
			L("continue", e);
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
		let $ = l(() => Array.isArray(U.value) && U.value.length > 0);
		return y(q), (e, t) => (b(), f("section", ie, [
			p("header", w, [t[5] ||= p("h1", {
				id: "history-heading",
				class: "admin-history__title"
			}, "Watch History", -1), $.value ? (b(), u(r, {
				key: 0,
				variant: "outline",
				size: "sm",
				"left-icon": "x",
				onClick: t[0] ||= (e) => G.value = !0
			}, {
				default: C(() => [...t[4] ||= [m(" Clear All ", -1)]]),
				_: 1
			})) : d("", !0)]),
			W.value ? (b(), f("div", T, [h(i, {
				variant: "text",
				lines: 6
			})])) : $.value ? (b(), f(c, { key: 2 }, [p("ul", E, [(b(!0), f(c, null, re(U.value, (e) => (b(), f("li", {
				key: e.id,
				class: "admin-history__item"
			}, [
				p("div", D, [X(e) ? (b(), f("img", {
					key: 0,
					src: X(e),
					alt: `Thumbnail for ${Y(e)}`,
					class: "admin-history__img"
				}, null, 8, O)) : (b(), f("span", ae, [h(n, { name: "film" })]))]),
				p("div", oe, [
					p("div", se, [p("span", k, S(Y(e)), 1), h(te, { tone: "neutral" }, {
						default: C(() => [m(S(de(e)), 1)]),
						_: 2
					}, 1024)]),
					e.last_watched_at ? (b(), f("p", A, " Watched " + S(ue(e.last_watched_at)), 1)) : d("", !0),
					Z(e) ? (b(), f("div", j, [p("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [p("div", {
						class: "admin-history__progress-fill",
						style: v({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, M), p("span", N, S(fe(e)) + "%", 1)])) : d("", !0)
				]),
				p("div", P, [Z(e) ? (b(), u(r, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					"aria-label": `Continue watching ${Y(e)}`,
					onClick: (t) => le(Q(e))
				}, {
					default: C(() => [...t[6] ||= [m(" Continue ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : d("", !0), h(r, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${Y(e)} from history`,
					onClick: (t) => J(Q(e))
				}, {
					default: C(() => [...t[7] ||= [m(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]), U.value.length >= 50 ? (b(), f("p", F, " Showing " + S(U.value.length) + " items. Older items are not shown. ", 1)) : d("", !0)], 64)) : (b(), u(ee, {
				key: 1,
				icon: "film",
				title: "No watch history yet",
				description: "Items you watch will appear here."
			})),
			h(s, {
				modelValue: G.value,
				"onUpdate:modelValue": t[2] ||= (e) => G.value = e,
				title: "Clear Watch History",
				size: "sm",
				onClose: t[3] ||= (e) => G.value = !1
			}, {
				footer: C(() => [h(r, {
					variant: "ghost",
					size: "sm",
					disabled: K.value,
					onClick: t[1] ||= (e) => G.value = !1
				}, {
					default: C(() => [...t[8] ||= [m(" Cancel ", -1)]]),
					_: 1
				}, 8, ["disabled"]), h(r, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: ce
				}, {
					default: C(() => [...t[9] ||= [m(" Clear All ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [t[10] ||= p("p", null, "Clear all items from your watch history? This cannot be undone.", -1)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-1a2decc5"]]);
//#endregion
export { I as default };

//# sourceMappingURL=HistoryPage-BgA1aLkA.js.map