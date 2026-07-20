import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-8mVXxqAA.js";
import { t as o } from "./Badge-BO1IU3PF.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-jnH8lsc0.js";
import { t as l } from "./PageHint-qiuINKdY.js";
import { t as u } from "./hubDashboard-BhOaaDD-.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, ref as C, renderList as w, toDisplayString as T, withCtx as E } from "vue";
//#region src/pages/admin/HubDashboardPage.vue?vue&type=script&setup=true&lang.ts
var D = {
	class: "hub-dash",
	"aria-labelledby": "hub-dash-heading"
}, O = {
	key: 0,
	class: "hub-dash__metrics-skel"
}, k = {
	key: 2,
	class: "hub-dash__metrics"
}, A = { class: "hub-dash__metric-label" }, j = { class: "hub-dash__metric-value" }, M = {
	class: "hub-dash__card",
	"aria-labelledby": "hub-act-heading"
}, N = {
	key: 0,
	class: "hub-dash__skel"
}, P = {
	key: 3,
	class: "hub-dash__activity-list",
	role: "list"
}, F = { class: "hub-dash__activity-actor" }, I = ["title"], L = ["datetime", "title"], R = 20, z = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "HubDashboardPage",
	props: { client: {} },
	setup(e) {
		let y = e, z = b("apiBase", ""), B = f(() => typeof z == "string" ? z : z?.value ?? ""), V = new u(y.client ?? new r({
			baseUrl: B.value,
			tokenStore: new t()
		})), H = i(), U = C(null), W = C([]), G = C(!0), K = C(!0), q = C(null), J = C(null), Y = f(() => {
			let e = U.value;
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
		}), X = f(() => U.value?.servers.offline ?? 0);
		function Z(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		async function Q() {
			G.value = !0, q.value = null;
			try {
				U.value = await V.getSummary();
			} catch (e) {
				q.value = n(e, "Failed to load hub summary."), H.error(q.value);
			} finally {
				G.value = !1;
			}
		}
		async function $() {
			K.value = !0, J.value = null;
			try {
				W.value = await V.getRecentActivity(R);
			} catch (e) {
				J.value = n(e, "Failed to load recent activity."), H.error(J.value);
			} finally {
				K.value = !1;
			}
		}
		return x(() => {
			Q(), $();
		}), (e, t) => (S(), h("section", D, [
			t[4] ||= g("header", { class: "hub-dash__head" }, [g("h1", {
				id: "hub-dash-heading",
				class: "hub-dash__title"
			}, "Dashboard")], -1),
			v(l, null, {
				default: E(() => [...t[0] ||= [
					_(" An at-a-glance view of your hub's health: how many ", -1),
					g("strong", null, "servers", -1),
					_(" are connected, active ", -1),
					g("strong", null, "relay sessions", -1),
					_(", ", -1),
					g("strong", null, "pending requests", -1),
					_(", and total ", -1),
					g("strong", null, "users", -1),
					_(", plus a feed of recent audit activity. If a section fails to load, use its ", -1),
					g("strong", null, "Retry", -1),
					_(" button to fetch it again. ", -1)
				]]),
				_: 1
			}),
			G.value ? (S(), h("div", O, [v(s, {
				variant: "text",
				lines: 2
			})])) : q.value ? (S(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub summary",
				description: q.value
			}, {
				actions: E(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: E(() => [...t[1] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h("div", k, [(S(!0), h(d, null, w(Y.value, (e) => (S(), h("div", {
				key: e.key,
				class: "hub-dash__metric"
			}, [
				g("span", A, T(e.label), 1),
				g("span", j, T(e.value.toLocaleString()), 1),
				e.key === "servers" && X.value > 0 ? (S(), p(o, {
					key: 0,
					tone: "warning"
				}, {
					default: E(() => [_(T(X.value) + " offline ", 1)]),
					_: 1
				})) : m("", !0)
			]))), 128))])),
			g("section", M, [t[3] ||= g("header", { class: "hub-dash__card-head" }, [g("h2", {
				id: "hub-act-heading",
				class: "hub-dash__card-title"
			}, "Recent Activity")], -1), K.value ? (S(), h("div", N, [v(s, {
				variant: "text",
				lines: 5
			})])) : J.value ? (S(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load activity",
				description: J.value
			}, {
				actions: E(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: E(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : W.value.length === 0 ? (S(), p(c, {
				key: 2,
				icon: "list",
				title: "No recent activity"
			})) : (S(), h("ul", P, [(S(!0), h(d, null, w(W.value, (e) => (S(), h("li", {
				key: e.id,
				class: "hub-dash__activity-item"
			}, [
				v(o, { tone: "neutral" }, {
					default: E(() => [_(T(e.action), 1)]),
					_: 2
				}, 1024),
				g("span", F, T(e.actor), 1),
				e.target ? (S(), h("span", {
					key: 0,
					class: "hub-dash__activity-target",
					title: e.target
				}, T(e.target), 9, I)) : m("", !0),
				g("time", {
					class: "hub-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, T(Z(e.created_at)), 9, L)
			]))), 128))]))])
		]));
	}
}), [["__scopeId", "data-v-ccc78132"]]);
//#endregion
export { z as default };

//# sourceMappingURL=HubDashboardPage-tljsTylY.js.map