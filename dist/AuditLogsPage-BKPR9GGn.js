import { n as e } from "./Icon-ax5k7_G2.js";
import { i as t, p as n, t as r } from "./Button-MsRePfWv.js";
import { t as i } from "./Badge-ArWL5-WE.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { Fragment as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, onMounted as g, openBlock as _, ref as v, renderList as y, toDisplayString as b, withCtx as x } from "vue";
//#region src/pages/AuditLogsPage.vue?vue&type=script&setup=true&lang.ts
var S = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, C = {
	key: 0,
	class: "audit__skel"
}, w = {
	key: 3,
	class: "audit__content"
}, T = { class: "audit__table-wrap" }, E = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, D = ["data-testid"], O = { class: "audit__details" }, k = { class: "audit__ip" }, A = { class: "audit__date" }, j = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, M = {
	class: "audit__page-info",
	"aria-live": "polite"
}, N = 50, P = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let h = e.client ?? t, P = a(), F = v([]), I = v(!0), L = v(null), R = v(1), z = v(1);
		async function B(e = 1) {
			I.value = !0, L.value = null;
			try {
				let t = Math.max(0, (e - 1) * N), n = await h.get("/api/v1/me/audit-logs", {
					limit: String(N),
					offset: String(t)
				}), r = n.limit && n.limit > 0 ? n.limit : N;
				F.value = (n.logs || []).map((e) => ({
					id: e.id ?? "",
					action: e.action && e.action !== "" ? e.action : e.event ?? "",
					actor: e.actor ?? e.user_id ?? "",
					target: e.resource ?? void 0,
					details: e.reason ?? void 0,
					ip_address: e.ip_address ?? void 0,
					created_at: e.created_at ?? ""
				})), R.value = e, z.value = Math.max(1, Math.ceil((n.total || 0) / r));
			} catch (e) {
				L.value = n(e, "Failed to load audit logs."), P.error(L.value);
			} finally {
				I.value = !1;
			}
		}
		function V(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function H(e) {
			return e.includes("create") || e.includes("add") ? "success" : e.includes("delete") || e.includes("remove") ? "error" : e.includes("update") || e.includes("edit") ? "info" : e.includes("login") || e.includes("auth") ? "accent" : "neutral";
		}
		return g(() => B()), (e, t) => (_(), d("section", S, [t[7] ||= f("header", { class: "audit__head" }, [f("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), f("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), I.value ? (_(), d("div", C, [m(o, {
			variant: "text",
			lines: 8
		})])) : L.value ? (_(), l(s, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: L.value
		}, {
			actions: x(() => [m(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => B(R.value)
			}, {
				default: x(() => [...t[3] ||= [p("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : F.value.length === 0 ? (_(), l(s, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (_(), d("div", w, [f("div", T, [f("table", E, [t[4] ||= f("thead", null, [f("tr", null, [
			f("th", { scope: "col" }, "Action"),
			f("th", { scope: "col" }, "Actor"),
			f("th", { scope: "col" }, "Target"),
			f("th", { scope: "col" }, "Details"),
			f("th", { scope: "col" }, "IP"),
			f("th", { scope: "col" }, "Time")
		])], -1), f("tbody", null, [(_(!0), d(c, null, y(F.value, (e) => (_(), d("tr", { key: e.id }, [
			f("td", null, [f("span", { "data-testid": `action-${e.id}` }, [m(i, { tone: H(e.action) }, {
				default: x(() => [p(b(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, D)]),
			f("td", null, b(e.actor), 1),
			f("td", null, b(e.target || "—"), 1),
			f("td", O, b(e.details || "—"), 1),
			f("td", k, b(e.ip_address || "—"), 1),
			f("td", A, b(V(e.created_at)), 1)
		]))), 128))])])]), z.value > 1 ? (_(), d("nav", j, [
			m(r, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: R.value <= 1,
				onClick: t[1] ||= (e) => B(R.value - 1)
			}, {
				default: x(() => [...t[5] ||= [p(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			f("span", M, "Page " + b(R.value) + " of " + b(z.value), 1),
			m(r, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: R.value >= z.value,
				onClick: t[2] ||= (e) => B(R.value + 1)
			}, {
				default: x(() => [...t[6] ||= [p(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : u("", !0)]))]));
	}
}), [["__scopeId", "data-v-3fcef29f"]]);
//#endregion
export { P as default };

//# sourceMappingURL=AuditLogsPage-BKPR9GGn.js.map