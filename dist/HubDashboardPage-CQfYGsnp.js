import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as l } from "./PageHint-BoAlFFBN.js";
import { t as u } from "./hubDashboard-BhOaaDD-.js";
import { t as d } from "./helpLinks-BI4oN4Or.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, onMounted as S, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, withCtx as O } from "vue";
//#region src/pages/admin/HubDashboardPage.vue?vue&type=script&setup=true&lang.ts
var k = {
	class: "hub-dash",
	"aria-labelledby": "hub-dash-heading"
}, A = {
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
}, L = { class: "hub-dash__activity-actor" }, R = ["title"], z = ["datetime", "title"], B = 20, V = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "HubDashboardPage",
	props: { client: {} },
	setup(e) {
		let b = e, V = x("apiBase", ""), H = p(() => typeof V == "string" ? V : V?.value ?? ""), U = new u(b.client ?? new r({
			baseUrl: H.value,
			tokenStore: new t()
		})), W = i(), G = w(null), K = w([]), q = w(!0), J = w(!0), Y = w(null), X = w(null), ee = p(() => {
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
		}), Z = p(() => G.value?.servers.offline ?? 0);
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
			} catch (e) {
				Y.value = n(e, "Failed to load hub summary."), W.error(Y.value);
			} finally {
				q.value = !1;
			}
		}
		async function $() {
			J.value = !0, X.value = null;
			try {
				K.value = await U.getRecentActivity(B);
			} catch (e) {
				X.value = n(e, "Failed to load recent activity."), W.error(X.value);
			} finally {
				J.value = !1;
			}
		}
		return S(() => {
			Q(), $();
		}), (e, t) => (C(), g("section", k, [
			t[4] ||= _("header", { class: "hub-dash__head" }, [_("h1", {
				id: "hub-dash-heading",
				class: "hub-dash__title"
			}, "Dashboard")], -1),
			y(l, {
				links: D(d)["hub-dashboard"].links,
				details: D(d)["hub-dashboard"].details
			}, {
				default: O(() => [...t[0] ||= [
					v(" An at-a-glance view of your hub's health: how many ", -1),
					_("strong", null, "servers", -1),
					v(" are connected, active ", -1),
					_("strong", null, "relay sessions", -1),
					v(", ", -1),
					_("strong", null, "pending requests", -1),
					v(", and total ", -1),
					_("strong", null, "users", -1),
					v(", plus a feed of recent audit activity. If a section fails to load, use its ", -1),
					_("strong", null, "Retry", -1),
					v(" button to fetch it again. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			q.value ? (C(), g("div", A, [y(s, {
				variant: "text",
				lines: 2
			})])) : Y.value ? (C(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load hub summary",
				description: Y.value
			}, {
				actions: O(() => [y(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: O(() => [...t[1] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (C(), g("div", j, [(C(!0), g(f, null, T(ee.value, (e) => (C(), g("div", {
				key: e.key,
				class: "hub-dash__metric"
			}, [
				_("span", M, E(e.label), 1),
				_("span", N, E(e.value.toLocaleString()), 1),
				e.key === "servers" && Z.value > 0 ? (C(), m(o, {
					key: 0,
					tone: "warning"
				}, {
					default: O(() => [v(E(Z.value) + " offline ", 1)]),
					_: 1
				})) : h("", !0)
			]))), 128))])),
			_("section", P, [t[3] ||= _("header", { class: "hub-dash__card-head" }, [_("h2", {
				id: "hub-act-heading",
				class: "hub-dash__card-title"
			}, "Recent Activity")], -1), J.value ? (C(), g("div", F, [y(s, {
				variant: "text",
				lines: 5
			})])) : X.value ? (C(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load activity",
				description: X.value
			}, {
				actions: O(() => [y(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: O(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value.length === 0 ? (C(), m(c, {
				key: 2,
				icon: "list",
				title: "No recent activity"
			})) : (C(), g("ul", I, [(C(!0), g(f, null, T(K.value, (e) => (C(), g("li", {
				key: e.id,
				class: "hub-dash__activity-item"
			}, [
				y(o, { tone: "neutral" }, {
					default: O(() => [v(E(e.action), 1)]),
					_: 2
				}, 1024),
				_("span", L, E(e.actor), 1),
				e.target ? (C(), g("span", {
					key: 0,
					class: "hub-dash__activity-target",
					title: e.target
				}, E(e.target), 9, R)) : h("", !0),
				_("time", {
					class: "hub-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, E(te(e.created_at)), 9, z)
			]))), 128))]))])
		]));
	}
}), [["__scopeId", "data-v-9d41a73d"]]);
//#endregion
export { V as default };

//# sourceMappingURL=HubDashboardPage-CQfYGsnp.js.map