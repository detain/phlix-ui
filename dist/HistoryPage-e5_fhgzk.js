import { n as e, t } from "./Icon-ax5k7_G2.js";
import { c as n, f as r, t as i } from "./client-CX6TRWS-.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-k7aQagzg.js";
import { t as ee } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Modal-CWarEzTU.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as l } from "./history-ByCY8OYj.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, normalizeStyle as b, onMounted as ne, openBlock as x, ref as S, renderList as re, toDisplayString as C, withCtx as w } from "vue";
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
}, oe = { class: "admin-history__info" }, se = { class: "admin-history__title-row" }, A = { class: "admin-history__item-title" }, j = {
	key: 0,
	class: "admin-history__time"
}, M = {
	key: 1,
	class: "admin-history__progress"
}, N = ["aria-valuenow"], P = { class: "admin-history__progress-label" }, F = { class: "admin-history__actions" }, I = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, L = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "HistoryPage",
	props: { client: {} },
	emits: ["continue"],
	setup(e, { emit: v }) {
		let L = e, R = v, z = y("apiBase", ""), B = d(() => typeof z == "string" ? z : z?.value ?? ""), V = new l(L.client ?? new i({
			baseUrl: B.value,
			tokenStore: new n()
		})), H = a(), U = S([]), W = S(!0), G = S(null), K = S(!1), q = S(!1);
		async function J() {
			W.value = !0, G.value = null;
			try {
				U.value = await V.getRecentlyWatched();
			} catch (e) {
				G.value = r(e, "Failed to load watch history."), H.error(G.value);
			} finally {
				W.value = !1;
			}
		}
		async function ce(e) {
			try {
				await V.removeFromHistory(e), H.success("Removed from watch history."), await J();
			} catch (e) {
				H.error(r(e, "Failed to remove item."));
			}
		}
		async function le() {
			q.value = !0;
			try {
				await V.clearHistory(), H.success("Watch history cleared."), K.value = !1, await J();
			} catch (e) {
				H.error(r(e, "Failed to clear history."));
			} finally {
				q.value = !1;
			}
		}
		function ue(e) {
			R("continue", e);
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
		let $ = d(() => Array.isArray(U.value) && U.value.length > 0);
		return ne(J), (e, n) => (x(), m("section", T, [
			h("header", E, [n[5] ||= h("h1", {
				id: "history-heading",
				class: "admin-history__title"
			}, "Watch History", -1), $.value ? (x(), f(o, {
				key: 0,
				variant: "outline",
				size: "sm",
				"left-icon": "x",
				onClick: n[0] ||= (e) => K.value = !0
			}, {
				default: w(() => [...n[4] ||= [g(" Clear All ", -1)]]),
				_: 1
			})) : p("", !0)]),
			W.value ? (x(), m("div", D, [_(s, {
				variant: "text",
				lines: 6
			})])) : G.value ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load watch history",
				description: G.value
			}, {
				actions: w(() => [_(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: w(() => [...n[6] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : $.value ? (x(), m(u, { key: 3 }, [h("ul", O, [(x(!0), m(u, null, re(U.value, (e) => (x(), m("li", {
				key: e.id,
				class: "admin-history__item"
			}, [
				h("div", k, [X(e) ? (x(), m("img", {
					key: 0,
					src: X(e),
					alt: `Thumbnail for ${Y(e)}`,
					class: "admin-history__img"
				}, null, 8, ie)) : (x(), m("span", ae, [_(t, { name: "film" })]))]),
				h("div", oe, [
					h("div", se, [h("span", A, C(Y(e)), 1), _(ee, { tone: "neutral" }, {
						default: w(() => [g(C(fe(e)), 1)]),
						_: 2
					}, 1024)]),
					e.last_watched_at ? (x(), m("p", j, " Watched " + C(de(e.last_watched_at)), 1)) : p("", !0),
					Z(e) ? (x(), m("div", M, [h("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [h("div", {
						class: "admin-history__progress-fill",
						style: b({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, N), h("span", P, C(pe(e)) + "%", 1)])) : p("", !0)
				]),
				h("div", F, [Z(e) ? (x(), f(o, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					"aria-label": `Continue watching ${Y(e)}`,
					onClick: (t) => ue(Q(e))
				}, {
					default: w(() => [...n[7] ||= [g(" Continue ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : p("", !0), _(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${Y(e)} from history`,
					onClick: (t) => ce(Q(e))
				}, {
					default: w(() => [...n[8] ||= [g(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]), U.value.length >= 50 ? (x(), m("p", I, " Showing " + C(U.value.length) + " items. Older items are not shown. ", 1)) : p("", !0)], 64)) : (x(), f(c, {
				key: 2,
				icon: "film",
				title: "No watch history yet",
				description: "Items you watch will appear here."
			})),
			_(te, {
				modelValue: K.value,
				"onUpdate:modelValue": n[2] ||= (e) => K.value = e,
				title: "Clear Watch History",
				size: "sm",
				onClose: n[3] ||= (e) => K.value = !1
			}, {
				footer: w(() => [_(o, {
					variant: "ghost",
					size: "sm",
					disabled: q.value,
					onClick: n[1] ||= (e) => K.value = !1
				}, {
					default: w(() => [...n[9] ||= [g(" Cancel ", -1)]]),
					_: 1
				}, 8, ["disabled"]), _(o, {
					variant: "solid",
					size: "sm",
					loading: q.value,
					onClick: le
				}, {
					default: w(() => [...n[10] ||= [g(" Clear All ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [n[11] ||= h("p", null, "Clear all items from your watch history? This cannot be undone.", -1)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-d58c1d0d"]]);
//#endregion
export { L as default };

//# sourceMappingURL=HistoryPage-e5_fhgzk.js.map