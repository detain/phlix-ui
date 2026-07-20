import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { f as t, r as n } from "./client-D80As4Gx.js";
import { t as r } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-8mVXxqAA.js";
import { t as a } from "./Badge-BO1IU3PF.js";
import { t as o } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-jnH8lsc0.js";
import { Fragment as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as g, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
//#region src/pages/admin/RequestsPage.vue?vue&type=script&setup=true&lang.ts
var C = {
	class: "requests",
	"aria-labelledby": "requests-heading"
}, w = {
	class: "requests__tabs",
	role: "tablist",
	"aria-label": "Request status filter"
}, T = ["aria-selected"], E = ["aria-selected"], D = {
	key: 0,
	class: "requests__skel"
}, O = {
	key: 3,
	class: "requests__content"
}, k = { class: "requests__table-wrap" }, A = {
	class: "requests__table",
	"aria-label": "Content requests"
}, j = { class: "requests__title-cell" }, M = { class: "requests__title-text" }, N = {
	key: 0,
	class: "requests__episode"
}, P = { key: 0 }, F = { class: "requests__tmdb" }, I = { class: "requests__date" }, L = { class: "requests__actions" }, R = {
	key: 2,
	class: "requests__action-note"
}, z = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "RequestsPage",
	props: { client: {} },
	setup(e) {
		let h = e.client ?? n, z = r(), B = y([]), V = y(!0), H = y(null), U = y("pending"), W = y(/* @__PURE__ */ new Set());
		function G(e) {
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
		async function K(e) {
			V.value = !0, H.value = null;
			try {
				let t = await h.get("/api/v1/admin/requests", { status: e });
				B.value = (t.requests || []).map(G);
			} catch (e) {
				H.value = t(e, "Failed to load requests."), z.error(H.value);
			} finally {
				V.value = !1;
			}
		}
		async function q(e) {
			if (!W.value.has(e)) {
				W.value = /* @__PURE__ */ new Set([...W.value, e]);
				try {
					await h.post(`/api/v1/admin/requests/${e}/approve`), z.success("Request approved."), await K(U.value);
				} catch (e) {
					z.error(t(e, "Failed to approve request."));
				} finally {
					W.value = new Set([...W.value].filter((t) => t !== e));
				}
			}
		}
		async function J(e, n = "") {
			if (!W.value.has(e)) {
				W.value = /* @__PURE__ */ new Set([...W.value, e]);
				try {
					let t = n.trim() === "" ? {} : { reason: n };
					await h.post(`/api/v1/admin/requests/${e}/deny`, t), z.success("Request denied."), await K(U.value);
				} catch (e) {
					z.error(t(e, "Failed to deny request."));
				} finally {
					W.value = new Set([...W.value].filter((t) => t !== e));
				}
			}
		}
		function Y(e) {
			let t = window.prompt("Rejection reason (optional):");
			t !== null && J(e, t);
		}
		function X(e) {
			U.value = e, K(e);
		}
		function Z(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function Q(e) {
			return e === "movie" ? "Movie" : "Series";
		}
		function $(e) {
			return e === "movie" ? "neutral" : "info";
		}
		return _(() => void K(U.value)), (e, t) => (v(), d("section", C, [
			t[7] ||= f("header", { class: "requests__head" }, [f("h1", {
				id: "requests-heading",
				class: "requests__title"
			}, "Request Queue"), f("p", { class: "requests__subtitle" }, "Review and act on content requests from your users.")], -1),
			f("div", w, [f("button", {
				role: "tab",
				class: g(["requests__tab", { "requests__tab--active": U.value === "pending" }]),
				"aria-selected": U.value === "pending",
				onClick: t[0] ||= (e) => X("pending")
			}, " Pending ", 10, T), f("button", {
				role: "tab",
				class: g(["requests__tab", { "requests__tab--active": U.value === "available" }]),
				"aria-selected": U.value === "available",
				onClick: t[1] ||= (e) => X("available")
			}, " Available ", 10, E)]),
			V.value ? (v(), d("div", D, [m(o, {
				variant: "text",
				lines: 8
			})])) : H.value ? (v(), l(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load requests",
				description: H.value
			}, {
				actions: S(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => K(U.value)
				}, {
					default: S(() => [...t[3] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : B.value.length === 0 ? (v(), l(s, {
				key: 2,
				icon: "list",
				title: "No requests",
				description: "No requests found for this status."
			})) : (v(), d("div", O, [f("div", k, [f("table", A, [t[6] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Title"),
				f("th", { scope: "col" }, "Type"),
				f("th", { scope: "col" }, "TMDB ID"),
				f("th", { scope: "col" }, "Submitted"),
				f("th", { scope: "col" }, "Status"),
				f("th", { scope: "col" }, "Actions")
			])], -1), f("tbody", null, [(v(!0), d(c, null, b(B.value, (e) => (v(), d("tr", { key: e.id }, [
				f("td", j, [f("span", M, x(e.title), 1), e.type === "series" && e.season !== null ? (v(), d("span", N, [p(" S" + x(e.season), 1), e.episode === null ? u("", !0) : (v(), d("span", P, "E" + x(e.episode), 1))])) : u("", !0)]),
				f("td", null, [m(a, { tone: $(e.type) }, {
					default: S(() => [p(x(Q(e.type)), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", F, x(e.tmdb_id), 1),
				f("td", I, x(Z(e.created_at)), 1),
				f("td", null, [m(a, { tone: e.status === "pending" ? "warning" : e.status === "available" ? "success" : e.status === "approved" ? "info" : "error" }, {
					default: S(() => [p(x(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", L, [
					U.value === "pending" ? (v(), l(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "check",
						loading: W.value.has(e.id),
						disabled: W.value.has(e.id),
						onClick: (t) => q(e.id)
					}, {
						default: S(() => [...t[4] ||= [p(" Approve ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])) : u("", !0),
					U.value === "pending" ? (v(), l(i, {
						key: 1,
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						loading: W.value.has(e.id),
						disabled: W.value.has(e.id),
						class: "requests__deny-btn",
						onClick: (t) => Y(e.id)
					}, {
						default: S(() => [...t[5] ||= [p(" Deny ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"onClick"
					])) : u("", !0),
					U.value === "available" ? (v(), d("span", R, "—")) : u("", !0)
				])
			]))), 128))])])])]))
		]));
	}
}), [["__scopeId", "data-v-0b1bb7d1"]]);
//#endregion
export { z as default };

//# sourceMappingURL=RequestsPage-BoSRuQdx.js.map