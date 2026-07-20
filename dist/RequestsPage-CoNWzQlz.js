import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { f as t, r as n } from "./client-D80As4Gx.js";
import { t as r } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as c } from "./PageHint-BoAlFFBN.js";
import { Fragment as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, normalizeClass as _, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, withCtx as C } from "vue";
//#region src/pages/admin/RequestsPage.vue?vue&type=script&setup=true&lang.ts
var w = {
	class: "requests",
	"aria-labelledby": "requests-heading"
}, T = {
	class: "requests__tabs",
	role: "tablist",
	"aria-label": "Request status filter"
}, E = ["aria-selected"], D = ["aria-selected"], O = {
	key: 0,
	class: "requests__skel"
}, k = {
	key: 3,
	class: "requests__content"
}, A = { class: "requests__table-wrap" }, j = {
	class: "requests__table",
	"aria-label": "Content requests"
}, M = { class: "requests__title-cell" }, N = { class: "requests__title-text" }, P = {
	key: 0,
	class: "requests__episode"
}, F = { key: 0 }, I = { class: "requests__tmdb" }, L = { class: "requests__date" }, R = { class: "requests__actions" }, z = {
	key: 2,
	class: "requests__action-note"
}, B = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "RequestsPage",
	props: { client: {} },
	setup(e) {
		let g = e.client ?? n, B = r(), V = b([]), H = b(!0), U = b(null), W = b("pending"), G = b(/* @__PURE__ */ new Set());
		function K(e) {
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
		async function q(e) {
			H.value = !0, U.value = null;
			try {
				let t = await g.get("/api/v1/admin/requests", { status: e });
				V.value = (t.requests || []).map(K);
			} catch (e) {
				U.value = t(e, "Failed to load requests."), B.error(U.value);
			} finally {
				H.value = !1;
			}
		}
		async function J(e) {
			if (!G.value.has(e)) {
				G.value = /* @__PURE__ */ new Set([...G.value, e]);
				try {
					await g.post(`/api/v1/admin/requests/${e}/approve`), B.success("Request approved."), await q(W.value);
				} catch (e) {
					B.error(t(e, "Failed to approve request."));
				} finally {
					G.value = new Set([...G.value].filter((t) => t !== e));
				}
			}
		}
		async function Y(e, n = "") {
			if (!G.value.has(e)) {
				G.value = /* @__PURE__ */ new Set([...G.value, e]);
				try {
					let t = n.trim() === "" ? {} : { reason: n };
					await g.post(`/api/v1/admin/requests/${e}/deny`, t), B.success("Request denied."), await q(W.value);
				} catch (e) {
					B.error(t(e, "Failed to deny request."));
				} finally {
					G.value = new Set([...G.value].filter((t) => t !== e));
				}
			}
		}
		function X(e) {
			let t = window.prompt("Rejection reason (optional):");
			t !== null && Y(e, t);
		}
		function Z(e) {
			W.value = e, q(e);
		}
		function Q(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function $(e) {
			return e === "movie" ? "Movie" : "Series";
		}
		function ee(e) {
			return e === "movie" ? "neutral" : "info";
		}
		return v(() => void q(W.value)), (e, t) => (y(), f("section", w, [
			h(c, { title: "Request Queue" }, {
				default: C(() => [...t[3] ||= [m(" Review and act on content requests from your users. ", -1)]]),
				_: 1
			}),
			p("div", T, [p("button", {
				role: "tab",
				class: _(["requests__tab", { "requests__tab--active": W.value === "pending" }]),
				"aria-selected": W.value === "pending",
				onClick: t[0] ||= (e) => Z("pending")
			}, " Pending ", 10, E), p("button", {
				role: "tab",
				class: _(["requests__tab", { "requests__tab--active": W.value === "available" }]),
				"aria-selected": W.value === "available",
				onClick: t[1] ||= (e) => Z("available")
			}, " Available ", 10, D)]),
			H.value ? (y(), f("div", O, [h(o, {
				variant: "text",
				lines: 8
			})])) : U.value ? (y(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load requests",
				description: U.value
			}, {
				actions: C(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => q(W.value)
				}, {
					default: C(() => [...t[4] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : V.value.length === 0 ? (y(), u(s, {
				key: 2,
				icon: "list",
				title: "No requests",
				description: "No requests found for this status."
			})) : (y(), f("div", k, [p("div", A, [p("table", j, [t[7] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Title"),
				p("th", { scope: "col" }, "Type"),
				p("th", { scope: "col" }, "TMDB ID"),
				p("th", { scope: "col" }, "Submitted"),
				p("th", { scope: "col" }, "Status"),
				p("th", { scope: "col" }, "Actions")
			])], -1), p("tbody", null, [(y(!0), f(l, null, x(V.value, (e) => (y(), f("tr", { key: e.id }, [
				p("td", M, [p("span", N, S(e.title), 1), e.type === "series" && e.season !== null ? (y(), f("span", P, [m(" S" + S(e.season), 1), e.episode === null ? d("", !0) : (y(), f("span", F, "E" + S(e.episode), 1))])) : d("", !0)]),
				p("td", null, [h(a, { tone: ee(e.type) }, {
					default: C(() => [m(S($(e.type)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", I, S(e.tmdb_id), 1),
				p("td", L, S(Q(e.created_at)), 1),
				p("td", null, [h(a, { tone: e.status === "pending" ? "warning" : e.status === "available" ? "success" : e.status === "approved" ? "info" : "error" }, {
					default: C(() => [m(S(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", R, [
					W.value === "pending" ? (y(), u(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "check",
						loading: G.value.has(e.id),
						disabled: G.value.has(e.id),
						onClick: (t) => J(e.id)
					}, {
						default: C(() => [...t[5] ||= [m(" Approve ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])) : d("", !0),
					W.value === "pending" ? (y(), u(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						loading: G.value.has(e.id),
						disabled: G.value.has(e.id),
						class: "requests__deny-btn",
						onClick: (t) => X(e.id)
					}, {
						default: C(() => [...t[6] ||= [m(" Deny ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])) : d("", !0),
					W.value === "available" ? (y(), f("span", z, "—")) : d("", !0)
				])
			]))), 128))])])])]))
		]));
	}
}), [["__scopeId", "data-v-6e4fea4d"]]);
//#endregion
export { B as default };

//# sourceMappingURL=RequestsPage-CoNWzQlz.js.map