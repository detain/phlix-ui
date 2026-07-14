import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { c as n, f as r, t as i } from "./client-D1nDQ0cP.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-btm-GCUN.js";
import { t as s } from "./Badge-D_aUH3dO.js";
import { t as c } from "./Skeleton-DhQmxeNg.js";
import { t as l } from "./EmptyState-CfyGawh7.js";
import { t as u } from "./PageHint-CPoTKHik.js";
import { t as d } from "./history-Cz9DDbWX.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, normalizeStyle as S, onMounted as C, openBlock as w, ref as T, renderList as E, resolveComponent as D, toDisplayString as O, withCtx as k } from "vue";
//#region src/pages/admin/HistoryPage.vue?vue&type=script&setup=true&lang.ts
var A = {
	class: "admin-history",
	"aria-labelledby": "history-heading"
}, j = {
	key: 0,
	class: "admin-history__skel"
}, M = {
	class: "admin-history__list",
	"aria-label": "Watch history"
}, N = { class: "admin-history__thumb" }, P = {
	class: "admin-history__placeholder",
	"aria-hidden": "true"
}, F = { class: "admin-history__info" }, I = { class: "admin-history__title-row" }, L = { class: "admin-history__user" }, R = {
	key: 0,
	class: "admin-history__time"
}, z = {
	key: 1,
	class: "admin-history__progress"
}, B = ["aria-valuenow"], V = { class: "admin-history__progress-label" }, H = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, U = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "HistoryPage",
	props: { client: {} },
	setup(e) {
		let b = e, U = x("apiBase", ""), W = p(() => typeof U == "string" ? U : U?.value ?? ""), G = new d(b.client ?? new i({
			baseUrl: W.value,
			tokenStore: new n()
		})), K = a(), q = T([]), J = T(!0), Y = T(null);
		async function X() {
			J.value = !0, Y.value = null;
			try {
				q.value = await G.getAllWatchHistory();
			} catch (e) {
				Y.value = r(e, "Failed to load watch history."), K.error(Y.value);
			} finally {
				J.value = !1;
			}
		}
		function Z(e) {
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
		function Q(e) {
			return `/app/media/${e.media_item_id || e.id}`;
		}
		function $(e) {
			return e.display_name || e.username || "—";
		}
		function ee(e) {
			let t = e.progress_percent;
			return t > 0 && t < 100;
		}
		function te(e) {
			return Math.round(e.progress_percent);
		}
		let ne = p(() => Array.isArray(q.value) && q.value.length > 0);
		return C(X), (e, n) => {
			let r = D("RouterLink");
			return w(), g("section", A, [
				n[2] ||= _("header", { class: "admin-history__head" }, [_("h1", {
					id: "history-heading",
					class: "admin-history__title"
				}, "Watch History")], -1),
				y(u, null, {
					default: k(() => [...n[0] ||= [v(" A read-only view of what everyone on the server has watched — who watched each title and when, with how far each entry was played. Click a title to open it. ", -1)]]),
					_: 1
				}),
				J.value ? (w(), g("div", j, [y(c, {
					variant: "text",
					lines: 6
				})])) : Y.value ? (w(), m(l, {
					key: 1,
					icon: "alert",
					title: "Couldn't load watch history",
					description: Y.value
				}, {
					actions: k(() => [y(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: X
					}, {
						default: k(() => [...n[1] ||= [v("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : ne.value ? (w(), g(f, { key: 3 }, [_("ul", M, [(w(!0), g(f, null, E(q.value, (e) => (w(), g("li", {
					key: e.id,
					class: "admin-history__item"
				}, [_("div", N, [_("span", P, [y(t, { name: "film" })])]), _("div", F, [
					_("div", I, [y(r, {
						to: Q(e),
						class: "admin-history__item-title"
					}, {
						default: k(() => [v(O(e.media_name), 1)]),
						_: 2
					}, 1032, ["to"]), y(s, { tone: "neutral" }, {
						default: k(() => [v(O(e.media_type), 1)]),
						_: 2
					}, 1024)]),
					_("p", L, "Watched by " + O($(e)), 1),
					e.last_watched_at ? (w(), g("p", R, " Watched " + O(Z(e.last_watched_at)), 1)) : h("", !0),
					ee(e) ? (w(), g("div", z, [_("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [_("div", {
						class: "admin-history__progress-fill",
						style: S({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, B), _("span", V, O(te(e)) + "%", 1)])) : h("", !0)
				])]))), 128))]), q.value.length >= 50 ? (w(), g("p", H, " Showing " + O(q.value.length) + " items (capped at 200). Older items are not shown. ", 1)) : h("", !0)], 64)) : (w(), m(l, {
					key: 2,
					icon: "film",
					title: "No watch history yet",
					description: "Items watched across all users will appear here."
				}))
			]);
		};
	}
}), [["__scopeId", "data-v-fa55f54e"]]);
//#endregion
export { U as default };

//# sourceMappingURL=HistoryPage-DrpwAJXU.js.map