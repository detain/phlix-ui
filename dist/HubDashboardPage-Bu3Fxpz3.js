import { T as e, t } from "./client-Bmlfq3Uy.js";
import { t as n } from "./hubDashboard-D-eKAQ_v.js";
import { t as r } from "./useToastStore-CxO_ppM8.js";
import { t as i } from "./Badge-D7vacFbh.js";
import { t as a } from "./PageHint-C2jY1TZi.js";
import { t as o } from "./helpLinks-3xhEuW25.js";
import { t as s } from "./Button-Dfl4y6vO.js";
import { t as c } from "./Skeleton-DDhrDRE7.js";
import { t as l } from "./EmptyState-DjfWh3kt.js";
import { n as u } from "./Icon-55iG1rR7.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, ref as C, renderList as w, toDisplayString as T, unref as E, withCtx as D } from "vue";
// src/pages/admin/HubDashboardPage.vue?vue&type=script&setup=true&lang.ts
var O = {
	class: "hub-dash",
	"aria-labelledby": "hub-dash-heading"
}, k = { class: "hub-dash__head" }, A = {
	key: 0,
	class: "hub-dash__metrics-skel"
}, j = {
	key: 2,
	class: "hub-dash__metrics"
}, M = { class: "hub-dash__metric-label" }, N = { class: "hub-dash__metric-value" }, P = {
	class: "hub-dash__card",
	"aria-labelledby": "hub-act-heading"
}, F = {
	key: 0,
	class: "hub-dash__skel"
}, I = {
	key: 3,
	class: "hub-dash__activity-list",
	role: "list"
}, L = { class: "hub-dash__activity-actor" }, R = ["title"], z = ["datetime", "title"], B = 20, V = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "HubDashboardPage",
	props: { client: {} },
	setup(u) {
		let y = u, V = b("apiBase", ""), H = f(() => typeof V == "string" ? V : V?.value ?? ""), U = new n(y.client ?? new t({ baseUrl: H.value })), W = r(), G = C(null), K = C([]), q = C(!0), J = C(!0), Y = C(null), X = C(null), ee = f(() => {
			let e = G.value;
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
		}), Z = f(() => G.value?.servers.offline ?? 0);
		function te(e) {
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
			q.value = !0, Y.value = null;
			try {
				G.value = await U.getSummary();
			} catch (t) {
				Y.value = e(t, "Failed to load hub summary."), W.error(Y.value);
			} finally {
				q.value = !1;
			}
		}
		async function $() {
			J.value = !0, X.value = null;
			try {
				K.value = await U.getRecentActivity(B);
			} catch (t) {
				X.value = e(t, "Failed to load recent activity."), W.error(X.value);
			} finally {
				J.value = !1;
			}
		}
		function ne() {
			Q(), $();
		}
		return x(() => {
			Q(), $();
		}), (e, t) => (S(), h("section", O, [
			g("header", k, [t[1] ||= g("h1", {
				id: "hub-dash-heading",
				class: "hub-dash__title"
			}, "Dashboard", -1), v(s, {
				variant: "ghost",
				size: "sm",
				"left-icon": "rewind",
				disabled: q.value || J.value,
				"data-testid": "hub-dash-refresh",
				onClick: ne
			}, {
				default: D(() => [...t[0] ||= [_("Refresh", -1)]]),
				_: 1
			}, 8, ["disabled"])]),
			v(a, {
				links: E(o)["hub-dashboard"].links,
				details: E(o)["hub-dashboard"].details
			}, {
				default: D(() => [...t[2] ||= [
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
			}, 8, ["links", "details"]),
			q.value ? (S(), h("div", A, [v(c, {
				variant: "text",
				lines: 2
			})])) : Y.value ? (S(), p(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load hub summary",
				description: Y.value
			}, {
				actions: D(() => [v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: D(() => [...t[3] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h("div", j, [(S(!0), h(d, null, w(ee.value, (e) => (S(), h("div", {
				key: e.key,
				class: "hub-dash__metric"
			}, [
				g("span", M, T(e.label), 1),
				g("span", N, T(e.value.toLocaleString()), 1),
				e.key === "servers" && Z.value > 0 ? (S(), p(i, {
					key: 0,
					tone: "warning"
				}, {
					default: D(() => [_(T(Z.value) + " offline ", 1)]),
					_: 1
				})) : m("", !0)
			]))), 128))])),
			g("section", P, [t[5] ||= g("header", { class: "hub-dash__card-head" }, [g("h2", {
				id: "hub-act-heading",
				class: "hub-dash__card-title"
			}, "Recent Activity")], -1), J.value ? (S(), h("div", F, [v(c, {
				variant: "text",
				lines: 5
			})])) : X.value ? (S(), p(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load activity",
				description: X.value
			}, {
				actions: D(() => [v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: D(() => [...t[4] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value.length === 0 ? (S(), p(l, {
				key: 2,
				icon: "list",
				title: "No recent activity"
			})) : (S(), h("ul", I, [(S(!0), h(d, null, w(K.value, (e) => (S(), h("li", {
				key: e.id,
				class: "hub-dash__activity-item"
			}, [
				v(i, { tone: "neutral" }, {
					default: D(() => [_(T(e.action), 1)]),
					_: 2
				}, 1024),
				g("span", L, T(e.actor), 1),
				e.target ? (S(), h("span", {
					key: 0,
					class: "hub-dash__activity-target",
					title: e.target
				}, T(e.target), 9, R)) : m("", !0),
				g("time", {
					class: "hub-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, T(te(e.created_at)), 9, z)
			]))), 128))]))])
		]));
	}
}), [["__scopeId", "data-v-bf0967ca"]]);
export { V as default };

//# sourceMappingURL=HubDashboardPage-Bu3Fxpz3.js.map