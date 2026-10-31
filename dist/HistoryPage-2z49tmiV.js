import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./history--FEc9rKQ.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as a } from "./PageHint-BlhPmafC.js";
import { t as o } from "./helpLinks-iarZuNmw.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as u, t as d } from "./Icon-CIbfiPrs.js";
import { a as f } from "./plural-B3O2rVPV.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, normalizeStyle as C, onMounted as w, openBlock as T, ref as E, renderList as D, resolveComponent as O, toDisplayString as k, unref as A, withCtx as j } from "vue";
// src/pages/admin/HistoryPage.vue?vue&type=script&setup=true&lang.ts
var M = {
	class: "admin-history",
	"aria-labelledby": "history-heading"
}, N = {
	key: 0,
	class: "admin-history__skel"
}, P = {
	class: "admin-history__list",
	"aria-label": "Watch history"
}, F = { class: "admin-history__thumb" }, I = {
	class: "admin-history__placeholder",
	"aria-hidden": "true"
}, L = { class: "admin-history__info" }, R = { class: "admin-history__title-row" }, z = { class: "admin-history__user" }, B = {
	key: 0,
	class: "admin-history__time"
}, V = {
	key: 1,
	class: "admin-history__progress"
}, H = ["aria-valuenow"], U = { class: "admin-history__progress-label" }, W = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, G = /*#__PURE__*/ u(/* @__PURE__ */ x({
	__name: "HistoryPage",
	props: { client: {} },
	setup(u) {
		let x = u, G = S("apiBase", ""), K = m(() => typeof G == "string" ? G : G?.value ?? ""), q = new n(x.client ?? new e({ baseUrl: K.value })), J = r(), Y = E([]), X = E(!0), Z = E(null);
		async function Q() {
			X.value = !0, Z.value = null;
			try {
				Y.value = await q.getAllWatchHistory();
			} catch (e) {
				Z.value = t(e, "Failed to load watch history."), J.error(Z.value);
			} finally {
				X.value = !1;
			}
		}
		function $(e) {
			let t = new Date(e), n = Math.floor(((/* @__PURE__ */ new Date()).getTime() - t.getTime()) / 1e3);
			if (n < 60) return "just now";
			let r = Math.floor(n / 60);
			if (r < 60) return `${f(r, "minute", "minutes")} ago`;
			let i = Math.floor(r / 60);
			if (i < 24) return `${f(i, "hour", "hours")} ago`;
			let a = Math.floor(i / 24);
			if (a < 30) return `${f(a, "day", "days")} ago`;
			let o = Math.floor(a / 30);
			return `${f(o, "month", "months")} ago`;
		}
		function ee(e) {
			return `/app/media/${e.media_item_id || e.id}`;
		}
		function te(e) {
			return e.display_name || e.username || "—";
		}
		function ne(e) {
			let t = e.progress_percent;
			return t > 0 && t < 100;
		}
		function re(e) {
			return Math.round(e.progress_percent);
		}
		let ie = m(() => Array.isArray(Y.value) && Y.value.length > 0);
		return w(Q), (e, t) => {
			let n = O("RouterLink");
			return T(), _("section", M, [
				t[2] ||= v("header", { class: "admin-history__head" }, [v("h1", {
					id: "history-heading",
					class: "admin-history__title"
				}, "Watch history")], -1),
				b(a, {
					links: A(o).history.links,
					details: A(o).history.details
				}, {
					default: j(() => [...t[0] ||= [y(" A read-only view of what everyone on the server has watched — who watched each title and when, with how far each entry was played. Click a title to open it. ", -1)]]),
					_: 1
				}, 8, ["links", "details"]),
				X.value ? (T(), _("div", N, [b(c, {
					variant: "text",
					lines: 6
				})])) : Z.value ? (T(), h(l, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load watch history",
					description: Z.value
				}, {
					actions: j(() => [b(s, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Q
					}, {
						default: j(() => [...t[1] ||= [y("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : ie.value ? (T(), _(p, { key: 3 }, [v("ul", P, [(T(!0), _(p, null, D(Y.value, (e) => (T(), _("li", {
					key: e.id,
					class: "admin-history__item"
				}, [v("div", F, [v("span", I, [b(d, { name: "film" })])]), v("div", L, [
					v("div", R, [b(n, {
						to: ee(e),
						class: "admin-history__item-title"
					}, {
						default: j(() => [y(k(e.media_name), 1)]),
						_: 2
					}, 1032, ["to"]), b(i, { tone: "neutral" }, {
						default: j(() => [y(k(e.media_type), 1)]),
						_: 2
					}, 1024)]),
					v("p", z, "Watched by " + k(te(e)), 1),
					e.last_watched_at ? (T(), _("p", B, " Watched " + k($(e.last_watched_at)), 1)) : g("", !0),
					ne(e) ? (T(), _("div", V, [v("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [v("div", {
						class: "admin-history__progress-fill",
						style: C({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, H), v("span", U, k(re(e)) + "%", 1)])) : g("", !0)
				])]))), 128))]), Y.value.length >= 50 ? (T(), _("p", W, " Showing " + k(Y.value.length) + " items (capped at 200). Older items are not shown. ", 1)) : g("", !0)], 64)) : (T(), h(l, {
					key: 2,
					icon: "film",
					title: "No watch history yet",
					description: "Items watched across all users will appear here."
				}))
			]);
		};
	}
}), [["__scopeId", "data-v-f757b94e"]]);
export { G as default };

//# sourceMappingURL=HistoryPage-2z49tmiV.js.map