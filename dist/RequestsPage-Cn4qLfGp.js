import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { f as t, r as n } from "./client-D80As4Gx.js";
import { t as r } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as c } from "./PageHint-BoAlFFBN.js";
import { t as l } from "./helpLinks-BI4oN4Or.js";
import { Fragment as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, withCtx as T } from "vue";
//#region src/pages/admin/RequestsPage.vue?vue&type=script&setup=true&lang.ts
var E = {
	class: "requests",
	"aria-labelledby": "requests-heading"
}, D = {
	class: "requests__tabs",
	role: "tablist",
	"aria-label": "Request status filter"
}, O = ["aria-selected"], k = ["aria-selected"], A = {
	key: 0,
	class: "requests__skel"
}, j = {
	key: 3,
	class: "requests__content"
}, M = { class: "requests__table-wrap" }, N = {
	class: "requests__table",
	"aria-label": "Content requests"
}, P = { class: "requests__title-cell" }, F = { class: "requests__title-text" }, I = {
	key: 0,
	class: "requests__episode"
}, L = { key: 0 }, R = { class: "requests__tmdb" }, z = { class: "requests__date" }, B = { class: "requests__actions" }, V = {
	key: 2,
	class: "requests__action-note"
}, H = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "RequestsPage",
	props: { client: {} },
	setup(e) {
		let _ = e.client ?? n, H = r(), U = x([]), W = x(!0), G = x(null), K = x("pending"), q = x(/* @__PURE__ */ new Set());
		function J(e) {
			return {
				id: String(e.id ?? ""),
				user_id: String(e.user_id ?? ""),
				type: e.type === "movie" || e.type === "series" ? e.type : "movie",
				tmdb_id: typeof e.tmdb_id == "number" ? e.tmdb_id : 0,
				title: String(e.title ?? ""),
				poster_url: e.poster_url === null ? null : String(e.poster_url),
				season: e.season === null ? null : typeof e.season == "number" ? e.season : null,
				episode: e.episode === null ? null : typeof e.episode == "number" ? e.episode : null,
				status: e.status === "pending" || e.status === "approved" || e.status === "available" || e.status === "rejected" ? e.status : "pending",
				rejection_reason: e.rejection_reason === null ? null : String(e.rejection_reason),
				created_at: String(e.created_at ?? ""),
				updated_at: String(e.updated_at ?? "")
			};
		}
		async function Y(e) {
			W.value = !0, G.value = null;
			try {
				let t = await _.get("/api/v1/admin/requests", { status: e });
				U.value = (t.requests || []).map(J);
			} catch (e) {
				G.value = t(e, "Failed to load requests."), H.error(G.value);
			} finally {
				W.value = !1;
			}
		}
		async function X(e) {
			if (!q.value.has(e)) {
				q.value = /* @__PURE__ */ new Set([...q.value, e]);
				try {
					await _.post(`/api/v1/admin/requests/${e}/approve`), H.success("Request approved."), await Y(K.value);
				} catch (e) {
					H.error(t(e, "Failed to approve request."));
				} finally {
					q.value = new Set([...q.value].filter((t) => t !== e));
				}
			}
		}
		async function Z(e, n = "") {
			if (!q.value.has(e)) {
				q.value = /* @__PURE__ */ new Set([...q.value, e]);
				try {
					let t = n.trim() === "" ? {} : { reason: n };
					await _.post(`/api/v1/admin/requests/${e}/deny`, t), H.success("Request denied."), await Y(K.value);
				} catch (e) {
					H.error(t(e, "Failed to deny request."));
				} finally {
					q.value = new Set([...q.value].filter((t) => t !== e));
				}
			}
		}
		function Q(e) {
			let t = window.prompt("Rejection reason (optional):");
			t !== null && Z(e, t);
		}
		function $(e) {
			K.value = e, Y(e);
		}
		function ee(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function te(e) {
			return e === "movie" ? "Movie" : "Series";
		}
		function ne(e) {
			return e === "movie" ? "neutral" : "info";
		}
		return y(() => void Y(K.value)), (e, t) => (b(), p("section", E, [
			g(c, {
				links: w(l).requests.links,
				details: w(l).requests.details,
				title: "Request Queue"
			}, {
				default: T(() => [...t[3] ||= [h(" Review and act on content requests from your users. ", -1)]]),
				_: 1
			}, 8, ["links", "details"]),
			m("div", D, [m("button", {
				role: "tab",
				class: v(["requests__tab", { "requests__tab--active": K.value === "pending" }]),
				"aria-selected": K.value === "pending",
				onClick: t[0] ||= (e) => $("pending")
			}, " Pending ", 10, O), m("button", {
				role: "tab",
				class: v(["requests__tab", { "requests__tab--active": K.value === "available" }]),
				"aria-selected": K.value === "available",
				onClick: t[1] ||= (e) => $("available")
			}, " Available ", 10, k)]),
			W.value ? (b(), p("div", A, [g(o, {
				variant: "text",
				lines: 8
			})])) : G.value ? (b(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load requests",
				description: G.value
			}, {
				actions: T(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => Y(K.value)
				}, {
					default: T(() => [...t[4] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value.length === 0 ? (b(), d(s, {
				key: 2,
				icon: "list",
				title: "No requests",
				description: "No requests found for this status."
			})) : (b(), p("div", j, [m("div", M, [m("table", N, [t[7] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Title"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "TMDB ID"),
				m("th", { scope: "col" }, "Submitted"),
				m("th", { scope: "col" }, "Status"),
				m("th", { scope: "col" }, "Actions")
			])], -1), m("tbody", null, [(b(!0), p(u, null, S(U.value, (e) => (b(), p("tr", { key: e.id }, [
				m("td", P, [m("span", F, C(e.title), 1), e.type === "series" && e.season !== null ? (b(), p("span", I, [h(" S" + C(e.season), 1), e.episode === null ? f("", !0) : (b(), p("span", L, "E" + C(e.episode), 1))])) : f("", !0)]),
				m("td", null, [g(a, { tone: ne(e.type) }, {
					default: T(() => [h(C(te(e.type)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("td", R, C(e.tmdb_id), 1),
				m("td", z, C(ee(e.created_at)), 1),
				m("td", null, [g(a, { tone: e.status === "pending" ? "warning" : e.status === "available" ? "success" : e.status === "approved" ? "info" : "error" }, {
					default: T(() => [h(C(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("td", B, [
					K.value === "pending" ? (b(), d(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "check",
						loading: q.value.has(e.id),
						disabled: q.value.has(e.id),
						onClick: (t) => X(e.id)
					}, {
						default: T(() => [...t[5] ||= [h(" Approve ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])) : f("", !0),
					K.value === "pending" ? (b(), d(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						loading: q.value.has(e.id),
						disabled: q.value.has(e.id),
						class: "requests__deny-btn",
						onClick: (t) => Q(e.id)
					}, {
						default: T(() => [...t[6] ||= [h(" Deny ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])) : f("", !0),
					K.value === "available" ? (b(), p("span", V, "—")) : f("", !0)
				])
			]))), 128))])])])]))
		]));
	}
}), [["__scopeId", "data-v-e9c26ba0"]]);
//#endregion
export { H as default };

//# sourceMappingURL=RequestsPage-Cn4qLfGp.js.map