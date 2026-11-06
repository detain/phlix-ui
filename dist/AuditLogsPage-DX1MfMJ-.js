import { i as e } from "./client-BLNUsFSj.js";
import { t } from "./useToastStore-CxO_ppM8.js";
import { r as n } from "./wireErrors-BkdyAKba.js";
import { t as r } from "./Badge-B_3IbdKb.js";
import { t as i } from "./PageHint-C2jY1TZi.js";
import { t as a } from "./Button-Dfl4y6vO.js";
import { t as o } from "./Skeleton-DDhrDRE7.js";
import { t as s } from "./EmptyState-DjfWh3kt.js";
import { n as c } from "./Icon-55iG1rR7.js";
import { Fragment as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, withCtx as C } from "vue";
// src/pages/AuditLogsPage.vue?vue&type=script&setup=true&lang.ts
var w = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, T = {
	key: 0,
	class: "audit__skel"
}, E = {
	key: 3,
	class: "audit__content"
}, D = { class: "audit__table-wrap" }, O = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, k = ["data-testid"], A = { class: "audit__details" }, j = { class: "audit__ip" }, M = { class: "audit__date" }, N = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, P = {
	class: "audit__page-info",
	"aria-live": "polite"
}, F = 50, I = /*#__PURE__*/ c(/* @__PURE__ */ g({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(c) {
		let g = c.client ?? e, I = t(), L = _("phlixConfig", null), R = b([]), z = b(!0), B = b(null), V = b(1), H = b(1);
		async function U(e = 1) {
			z.value = !0, B.value = null;
			try {
				let t = Math.max(0, (e - 1) * F), n = await g.get("/api/v1/me/audit-logs", {
					limit: String(F),
					offset: String(t)
				}), r = n.limit && n.limit > 0 ? n.limit : F;
				R.value = (n.logs || []).map((e) => ({
					id: e.id ?? "",
					action: e.action && e.action !== "" ? e.action : e.event ?? "",
					actor: e.actor ?? e.user_id ?? "",
					target: e.resource ?? void 0,
					details: e.reason ?? void 0,
					ip_address: e.ip_address ?? void 0,
					created_at: e.created_at ?? ""
				})), V.value = e, H.value = Math.max(1, Math.ceil((n.total || 0) / r));
			} catch (e) {
				B.value = n(e, "Failed to load audit logs.", L?.locale), I.error(B.value);
			} finally {
				z.value = !1;
			}
		}
		function W(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function G(e) {
			return e.includes("create") || e.includes("add") ? "success" : e.includes("delete") || e.includes("remove") ? "error" : e.includes("update") || e.includes("edit") ? "info" : e.includes("login") || e.includes("auth") ? "accent" : "neutral";
		}
		return v(() => U()), (e, t) => (y(), f("section", w, [
			t[8] ||= p("header", { class: "audit__head" }, [p("h1", {
				id: "audit-heading",
				class: "audit__title"
			}, "Audit logs"), p("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1),
			h(i, null, {
				default: C(() => [...t[3] ||= [
					m(" A running record of everything that happens on your hub — pairings, sign-ins, and other system and user actions — for security and troubleshooting. Entries are shown newest-first; use ", -1),
					p("strong", null, "Previous", -1),
					m(" and ", -1),
					p("strong", null, "Next", -1),
					m(" to page through the history. ", -1)
				]]),
				_: 1
			}),
			z.value ? (y(), f("div", T, [h(o, {
				variant: "text",
				lines: 8
			})])) : B.value ? (y(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load audit logs",
				description: B.value
			}, {
				actions: C(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[0] ||= (e) => U(V.value)
				}, {
					default: C(() => [...t[4] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : R.value.length === 0 ? (y(), u(s, {
				key: 2,
				icon: "list",
				title: "No audit logs",
				description: "System activity and user actions will appear here."
			})) : (y(), f("div", E, [p("div", D, [p("table", O, [t[5] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Action"),
				p("th", { scope: "col" }, "Actor"),
				p("th", { scope: "col" }, "Target"),
				p("th", { scope: "col" }, "Details"),
				p("th", { scope: "col" }, "IP"),
				p("th", { scope: "col" }, "Time")
			])], -1), p("tbody", null, [(y(!0), f(l, null, x(R.value, (e) => (y(), f("tr", { key: e.id }, [
				p("td", null, [p("span", { "data-testid": `action-${e.id}` }, [h(r, { tone: G(e.action) }, {
					default: C(() => [m(S(e.action), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, k)]),
				p("td", null, S(e.actor), 1),
				p("td", null, S(e.target || "—"), 1),
				p("td", A, S(e.details || "—"), 1),
				p("td", j, S(e.ip_address || "—"), 1),
				p("td", M, S(W(e.created_at)), 1)
			]))), 128))])])]), H.value > 1 ? (y(), f("nav", N, [
				h(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "chevron-left",
					disabled: V.value <= 1,
					onClick: t[1] ||= (e) => U(V.value - 1)
				}, {
					default: C(() => [...t[6] ||= [m(" Previous ", -1)]]),
					_: 1
				}, 8, ["disabled"]),
				p("span", P, "Page " + S(V.value) + " of " + S(H.value), 1),
				h(a, {
					variant: "ghost",
					size: "sm",
					"right-icon": "chevron-right",
					disabled: V.value >= H.value,
					onClick: t[2] ||= (e) => U(V.value + 1)
				}, {
					default: C(() => [...t[7] ||= [m(" Next ", -1)]]),
					_: 1
				}, 8, ["disabled"])
			])) : d("", !0)]))
		]));
	}
}), [["__scopeId", "data-v-11799b62"]]);
export { I as default };

//# sourceMappingURL=AuditLogsPage-DX1MfMJ-.js.map