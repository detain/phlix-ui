import { n as e } from "./Icon-24ngwBUH.js";
import { f as t, r as n } from "./client-fw74f3l_.js";
import { t as r } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-CInT03Lp.js";
import { t as a } from "./Badge-DnDrMVUo.js";
import { t as o } from "./Skeleton-BUq2D39t.js";
import { t as s } from "./EmptyState-0XgHKEGf.js";
import { t as c } from "./PageHint-DR8OWfto.js";
import { Fragment as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
//#region src/pages/AuditLogsPage.vue?vue&type=script&setup=true&lang.ts
var C = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, w = {
	key: 0,
	class: "audit__skel"
}, T = {
	key: 3,
	class: "audit__content"
}, E = { class: "audit__table-wrap" }, D = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, O = ["data-testid"], k = { class: "audit__details" }, A = { class: "audit__ip" }, j = { class: "audit__date" }, M = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, N = {
	class: "audit__page-info",
	"aria-live": "polite"
}, P = 50, F = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let g = e.client ?? n, F = r(), I = y([]), L = y(!0), R = y(null), z = y(1), B = y(1);
		async function V(e = 1) {
			L.value = !0, R.value = null;
			try {
				let t = Math.max(0, (e - 1) * P), n = await g.get("/api/v1/me/audit-logs", {
					limit: String(P),
					offset: String(t)
				}), r = n.limit && n.limit > 0 ? n.limit : P;
				I.value = (n.logs || []).map((e) => ({
					id: e.id ?? "",
					action: e.action && e.action !== "" ? e.action : e.event ?? "",
					actor: e.actor ?? e.user_id ?? "",
					target: e.resource ?? void 0,
					details: e.reason ?? void 0,
					ip_address: e.ip_address ?? void 0,
					created_at: e.created_at ?? ""
				})), z.value = e, B.value = Math.max(1, Math.ceil((n.total || 0) / r));
			} catch (e) {
				R.value = t(e, "Failed to load audit logs."), F.error(R.value);
			} finally {
				L.value = !1;
			}
		}
		function H(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function U(e) {
			return e.includes("create") || e.includes("add") ? "success" : e.includes("delete") || e.includes("remove") ? "error" : e.includes("update") || e.includes("edit") ? "info" : e.includes("login") || e.includes("auth") ? "accent" : "neutral";
		}
		return _(() => V()), (e, t) => (v(), f("section", C, [
			t[8] ||= p("header", { class: "audit__head" }, [p("h1", {
				id: "audit-heading",
				class: "audit__title"
			}, "Audit Logs"), p("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1),
			h(c, null, {
				default: S(() => [...t[3] ||= [
					m(" A running record of everything that happens on your hub — pairings, sign-ins, and other system and user actions — for security and troubleshooting. Entries are shown newest-first; use ", -1),
					p("strong", null, "Previous", -1),
					m(" and ", -1),
					p("strong", null, "Next", -1),
					m(" to page through the history. ", -1)
				]]),
				_: 1
			}),
			L.value ? (v(), f("div", w, [h(o, {
				variant: "text",
				lines: 8
			})])) : R.value ? (v(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load audit logs",
				description: R.value
			}, {
				actions: S(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[0] ||= (e) => V(z.value)
				}, {
					default: S(() => [...t[4] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : I.value.length === 0 ? (v(), u(s, {
				key: 2,
				icon: "list",
				title: "No audit logs",
				description: "System activity and user actions will appear here."
			})) : (v(), f("div", T, [p("div", E, [p("table", D, [t[5] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Action"),
				p("th", { scope: "col" }, "Actor"),
				p("th", { scope: "col" }, "Target"),
				p("th", { scope: "col" }, "Details"),
				p("th", { scope: "col" }, "IP"),
				p("th", { scope: "col" }, "Time")
			])], -1), p("tbody", null, [(v(!0), f(l, null, b(I.value, (e) => (v(), f("tr", { key: e.id }, [
				p("td", null, [p("span", { "data-testid": `action-${e.id}` }, [h(a, { tone: U(e.action) }, {
					default: S(() => [m(x(e.action), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, O)]),
				p("td", null, x(e.actor), 1),
				p("td", null, x(e.target || "—"), 1),
				p("td", k, x(e.details || "—"), 1),
				p("td", A, x(e.ip_address || "—"), 1),
				p("td", j, x(H(e.created_at)), 1)
			]))), 128))])])]), B.value > 1 ? (v(), f("nav", M, [
				h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "chevron-left",
					disabled: z.value <= 1,
					onClick: t[1] ||= (e) => V(z.value - 1)
				}, {
					default: S(() => [...t[6] ||= [m(" Previous ", -1)]]),
					_: 1
				}, 8, ["disabled"]),
				p("span", N, "Page " + x(z.value) + " of " + x(B.value), 1),
				h(i, {
					variant: "ghost",
					size: "sm",
					"right-icon": "chevron-right",
					disabled: z.value >= B.value,
					onClick: t[2] ||= (e) => V(z.value + 1)
				}, {
					default: S(() => [...t[7] ||= [m(" Next ", -1)]]),
					_: 1
				}, 8, ["disabled"])
			])) : d("", !0)]))
		]));
	}
}), [["__scopeId", "data-v-2ff7de75"]]);
//#endregion
export { F as default };

//# sourceMappingURL=AuditLogsPage-DCXaoN93.js.map