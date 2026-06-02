import { a as e, i as t, l as n, n as r, r as i, t as a } from "./tokenStore-SjxKwmod.js";
import { t as o } from "./EmptyState-sJb64K4c.js";
import { t as s } from "./Badge-wMoO7SFO.js";
import { t as c } from "./dlnaServer-B5Sg4MkS.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as y, openBlock as b, ref as x, toDisplayString as S, withCtx as C } from "vue";
//#region src/pages/admin/DlnaServerPage.vue?vue&type=script&setup=true&lang.ts
var w = {
	class: "admin-dlna",
	"aria-labelledby": "dlna-heading"
}, T = {
	class: "admin-dlna__card",
	"aria-live": "polite"
}, E = {
	key: 0,
	class: "admin-dlna__loading",
	"aria-hidden": "true"
}, D = { class: "admin-dlna__status" }, O = {
	key: 0,
	class: "admin-dlna__details"
}, k = { class: "admin-dlna__actions" }, A = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(n) {
		let _ = n, A = v("apiBase", ""), j = u(() => typeof A == "string" ? A : A?.value ?? ""), M = new c(_.client ?? new e({
			baseUrl: j.value,
			tokenStore: new a()
		})), N = t(), P = x(null), F = x(!0), I = x(!1), L = u(() => P.value?.running ?? !1), R = u(() => P.value?.enabled ?? !1);
		async function z() {
			F.value = !0;
			try {
				P.value = await M.getStatus();
			} catch (e) {
				N.error(e instanceof Error ? e.message : "Failed to load DLNA server status.");
			} finally {
				F.value = !1;
			}
		}
		async function B() {
			if (!I.value) {
				I.value = !0;
				try {
					let e = await M.start();
					if (!e.success) {
						N.error(e.message || "Failed to start DLNA server.");
						return;
					}
					N.success("DLNA server started."), await z();
				} catch (e) {
					N.error(e instanceof Error ? e.message : "Failed to start DLNA server.");
				} finally {
					I.value = !1;
				}
			}
		}
		async function V() {
			if (!I.value) {
				I.value = !0;
				try {
					let e = await M.stop();
					if (!e.success) {
						N.error(e.message || "Failed to stop DLNA server.");
						return;
					}
					N.success("DLNA server stopped."), await z();
				} catch (e) {
					N.error(e instanceof Error ? e.message : "Failed to stop DLNA server.");
				} finally {
					I.value = !1;
				}
			}
		}
		return y(z), (e, t) => (b(), p("section", w, [
			t[4] ||= m("header", { class: "admin-dlna__head" }, [m("h1", {
				id: "dlna-heading",
				class: "admin-dlna__title"
			}, "DLNA Server")], -1),
			m("div", T, [F.value ? (b(), p("div", E, [g(i, {
				variant: "text",
				lines: 4
			})])) : R.value ? (b(), p(l, { key: 2 }, [
				m("div", D, [g(s, {
					tone: L.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: C(() => [h(S(L.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				L.value && P.value !== null ? (b(), p("dl", O, [
					P.value.friendlyName ? (b(), p(l, { key: 0 }, [t[0] ||= m("dt", null, "Friendly Name", -1), m("dd", null, S(P.value.friendlyName), 1)], 64)) : f("", !0),
					P.value.serverId ? (b(), p(l, { key: 1 }, [t[1] ||= m("dt", null, "UDN", -1), m("dd", null, S(P.value.serverId), 1)], 64)) : f("", !0),
					P.value.port === null ? f("", !0) : (b(), p(l, { key: 2 }, [t[2] ||= m("dt", null, "Port", -1), m("dd", null, S(P.value.port), 1)], 64)),
					P.value.baseUrl ? (b(), p(l, { key: 3 }, [t[3] ||= m("dt", null, "Base URL", -1), m("dd", null, S(P.value.baseUrl), 1)], 64)) : f("", !0)
				])) : f("", !0),
				m("div", k, [L.value ? (b(), d(r, {
					key: 1,
					variant: "outline",
					loading: I.value,
					leftIcon: "pause",
					onClick: V
				}, {
					default: C(() => [h(S(I.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (b(), d(r, {
					key: 0,
					variant: "solid",
					loading: I.value,
					leftIcon: "play",
					onClick: B
				}, {
					default: C(() => [h(S(I.value ? "Starting…" : "Start Server"), 1)]),
					_: 1
				}, 8, ["loading"]))])
			], 64)) : (b(), d(o, {
				key: 1,
				icon: "monitor",
				title: "DLNA server is not configured.",
				description: P.value?.message ?? void 0
			}, null, 8, ["description"]))]),
			t[5] ||= m("p", {
				class: "admin-dlna__note",
				role: "note"
			}, " The DLNA server announces this Phlix instance on the local network as a UPnP MediaServer. Restart the server to apply configuration changes. ", -1)
		]));
	}
}), [["__scopeId", "data-v-bde3d69c"]]);
//#endregion
export { A as default };

//# sourceMappingURL=DlnaServerPage-B1tkDge2.js.map