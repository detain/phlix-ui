import { n as e } from "./Icon-ax5k7_G2.js";
import { d as t, n, s as r, t as i } from "./Button-C1kpaQyo.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as l } from "./hubDashboard-BhOaaDD-.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, ref as S, renderList as C, toDisplayString as w, withCtx as T } from "vue";
//#region src/pages/admin/HubDashboardPage.vue?vue&type=script&setup=true&lang.ts
var E = {
	class: "hub-dash",
	"aria-labelledby": "hub-dash-heading"
}, D = {
	key: 0,
	class: "hub-dash__metrics-skel"
}, O = {
	key: 2,
	class: "hub-dash__metrics"
}, k = { class: "hub-dash__metric-label" }, A = { class: "hub-dash__metric-value" }, j = {
	class: "hub-dash__card",
	"aria-labelledby": "hub-act-heading"
}, M = {
	key: 0,
	class: "hub-dash__skel"
}, N = {
	key: 3,
	class: "hub-dash__activity-list",
	role: "list"
}, P = { class: "hub-dash__activity-actor" }, F = ["title"], I = ["datetime", "title"], L = 20, R = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "HubDashboardPage",
	props: { client: {} },
	setup(e) {
		let v = e, R = y("apiBase", ""), z = d(() => typeof R == "string" ? R : R?.value ?? ""), B = new l(v.client ?? new n({
			baseUrl: z.value,
			tokenStore: new r()
		})), V = o(), H = S(null), U = S([]), W = S(!0), G = S(!0), K = S(null), q = S(null), J = d(() => {
			let e = H.value;
			return [
				{
					key: "servers",
					label: "Servers",
					value: e?.servers.total ?? 0
				},
				{
					key: "online",
					label: "Online",
					value: e?.servers.online ?? 0
				},
				{
					key: "sessions",
					label: "Active Relays",
					value: e?.activeRelaySessions ?? 0
				},
				{
					key: "requests",
					label: "Pending Requests",
					value: e?.pendingRequests ?? 0
				},
				{
					key: "users",
					label: "Users",
					value: e?.userCount ?? 0
				}
			];
		}), Y = d(() => H.value?.servers.offline ?? 0);
		function X(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		async function Z() {
			W.value = !0, K.value = null;
			try {
				H.value = await B.getSummary();
			} catch (e) {
				K.value = t(e, "Failed to load hub summary."), V.error(K.value);
			} finally {
				W.value = !1;
			}
		}
		async function Q() {
			G.value = !0, q.value = null;
			try {
				U.value = await B.getRecentActivity(L);
			} catch (e) {
				q.value = t(e, "Failed to load recent activity."), V.error(q.value);
			} finally {
				G.value = !1;
			}
		}
		return b(() => {
			Z(), Q();
		}), (e, t) => (x(), m("section", E, [
			t[3] ||= h("header", { class: "hub-dash__head" }, [h("h1", {
				id: "hub-dash-heading",
				class: "hub-dash__title"
			}, "Dashboard")], -1),
			W.value ? (x(), m("div", D, [_(s, {
				variant: "text",
				lines: 2
			})])) : K.value ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub summary",
				description: K.value
			}, {
				actions: T(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: T(() => [...t[0] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (x(), m("div", O, [(x(!0), m(u, null, C(J.value, (e) => (x(), m("div", {
				key: e.key,
				class: "hub-dash__metric"
			}, [
				h("span", k, w(e.label), 1),
				h("span", A, w(e.value.toLocaleString()), 1),
				e.key === "servers" && Y.value > 0 ? (x(), f(a, {
					key: 0,
					tone: "warning"
				}, {
					default: T(() => [g(w(Y.value) + " offline ", 1)]),
					_: 1
				})) : p("", !0)
			]))), 128))])),
			h("section", j, [t[2] ||= h("header", { class: "hub-dash__card-head" }, [h("h2", {
				id: "hub-act-heading",
				class: "hub-dash__card-title"
			}, "Recent Activity")], -1), G.value ? (x(), m("div", M, [_(s, {
				variant: "text",
				lines: 5
			})])) : q.value ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load activity",
				description: q.value
			}, {
				actions: T(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: T(() => [...t[1] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value.length === 0 ? (x(), f(c, {
				key: 2,
				icon: "list",
				title: "No recent activity"
			})) : (x(), m("ul", N, [(x(!0), m(u, null, C(U.value, (e) => (x(), m("li", {
				key: e.id,
				class: "hub-dash__activity-item"
			}, [
				_(a, { tone: "neutral" }, {
					default: T(() => [g(w(e.action), 1)]),
					_: 2
				}, 1024),
				h("span", P, w(e.actor), 1),
				e.target ? (x(), m("span", {
					key: 0,
					class: "hub-dash__activity-target",
					title: e.target
				}, w(e.target), 9, F)) : p("", !0),
				h("time", {
					class: "hub-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, w(X(e.created_at)), 9, I)
			]))), 128))]))])
		]));
	}
}), [["__scopeId", "data-v-eb236d4d"]]);
//#endregion
export { R as default };

//# sourceMappingURL=HubDashboardPage-DilaAUTC.js.map