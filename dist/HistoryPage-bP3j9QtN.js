import { n as e, t } from "./Icon-CkTBN_k5.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { l as r, p as i, t as a } from "./client-COHWZ2KC.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Button-Cw8Wl4QR.js";
import { t as c } from "./Badge-D1_MN41Y.js";
import { t as l } from "./Skeleton-C3OpJbf1.js";
import { t as u } from "./EmptyState-CwWtkhEJ.js";
import { t as d } from "./PageHint-3dL7qb5N.js";
import { t as f } from "./history-Cz9DDbWX.js";
import { t as p } from "./helpLinks-BI4oN4Or.js";
import { Fragment as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, inject as C, normalizeStyle as w, onMounted as T, openBlock as E, ref as D, renderList as O, resolveComponent as k, toDisplayString as A, unref as j, withCtx as M } from "vue";
//#region src/pages/admin/HistoryPage.vue?vue&type=script&setup=true&lang.ts
var N = {
	class: "admin-history",
	"aria-labelledby": "history-heading"
}, P = {
	key: 0,
	class: "admin-history__skel"
}, F = {
	class: "admin-history__list",
	"aria-label": "Watch history"
}, I = { class: "admin-history__thumb" }, L = {
	class: "admin-history__placeholder",
	"aria-hidden": "true"
}, R = { class: "admin-history__info" }, z = { class: "admin-history__title-row" }, B = { class: "admin-history__user" }, V = {
	key: 0,
	class: "admin-history__time"
}, H = {
	key: 1,
	class: "admin-history__progress"
}, U = ["aria-valuenow"], W = { class: "admin-history__progress-label" }, G = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, K = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "HistoryPage",
	props: { client: {} },
	setup(e) {
		let S = e, K = C("apiBase", ""), q = h(() => typeof K == "string" ? K : K?.value ?? ""), J = new f(S.client ?? new a({
			baseUrl: q.value,
			tokenStore: new r()
		})), Y = o(), X = D([]), Z = D(!0), Q = D(null);
		async function $() {
			Z.value = !0, Q.value = null;
			try {
				X.value = await J.getAllWatchHistory();
			} catch (e) {
				Q.value = i(e, "Failed to load watch history."), Y.error(Q.value);
			} finally {
				Z.value = !1;
			}
		}
		function ee(e) {
			let t = new Date(e), r = Math.floor(((/* @__PURE__ */ new Date()).getTime() - t.getTime()) / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${n(i, "minute", "minutes")} ago`;
			let a = Math.floor(i / 60);
			if (a < 24) return `${n(a, "hour", "hours")} ago`;
			let o = Math.floor(a / 24);
			if (o < 30) return `${n(o, "day", "days")} ago`;
			let s = Math.floor(o / 30);
			return `${n(s, "month", "months")} ago`;
		}
		function te(e) {
			return `/app/media/${e.media_item_id || e.id}`;
		}
		function ne(e) {
			return e.display_name || e.username || "—";
		}
		function re(e) {
			let t = e.progress_percent;
			return t > 0 && t < 100;
		}
		function ie(e) {
			return Math.round(e.progress_percent);
		}
		let ae = h(() => Array.isArray(X.value) && X.value.length > 0);
		return T($), (e, n) => {
			let r = k("RouterLink");
			return E(), v("section", N, [
				n[2] ||= y("header", { class: "admin-history__head" }, [y("h1", {
					id: "history-heading",
					class: "admin-history__title"
				}, "Watch History")], -1),
				x(d, {
					links: j(p).history.links,
					details: j(p).history.details
				}, {
					default: M(() => [...n[0] ||= [b(" A read-only view of what everyone on the server has watched — who watched each title and when, with how far each entry was played. Click a title to open it. ", -1)]]),
					_: 1
				}, 8, ["links", "details"]),
				Z.value ? (E(), v("div", P, [x(l, {
					variant: "text",
					lines: 6
				})])) : Q.value ? (E(), g(u, {
					key: 1,
					icon: "alert",
					title: "Couldn't load watch history",
					description: Q.value
				}, {
					actions: M(() => [x(s, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: $
					}, {
						default: M(() => [...n[1] ||= [b("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : ae.value ? (E(), v(m, { key: 3 }, [y("ul", F, [(E(!0), v(m, null, O(X.value, (e) => (E(), v("li", {
					key: e.id,
					class: "admin-history__item"
				}, [y("div", I, [y("span", L, [x(t, { name: "film" })])]), y("div", R, [
					y("div", z, [x(r, {
						to: te(e),
						class: "admin-history__item-title"
					}, {
						default: M(() => [b(A(e.media_name), 1)]),
						_: 2
					}, 1032, ["to"]), x(c, { tone: "neutral" }, {
						default: M(() => [b(A(e.media_type), 1)]),
						_: 2
					}, 1024)]),
					y("p", B, "Watched by " + A(ne(e)), 1),
					e.last_watched_at ? (E(), v("p", V, " Watched " + A(ee(e.last_watched_at)), 1)) : _("", !0),
					re(e) ? (E(), v("div", H, [y("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [y("div", {
						class: "admin-history__progress-fill",
						style: w({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, U), y("span", W, A(ie(e)) + "%", 1)])) : _("", !0)
				])]))), 128))]), X.value.length >= 50 ? (E(), v("p", G, " Showing " + A(X.value.length) + " items (capped at 200). Older items are not shown. ", 1)) : _("", !0)], 64)) : (E(), g(u, {
					key: 2,
					icon: "film",
					title: "No watch history yet",
					description: "Items watched across all users will appear here."
				}))
			]);
		};
	}
}), [["__scopeId", "data-v-09cd56b0"]]);
//#endregion
export { K as default };

//# sourceMappingURL=HistoryPage-bP3j9QtN.js.map