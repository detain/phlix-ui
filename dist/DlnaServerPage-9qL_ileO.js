import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as r } from "./client-BQ-In3oB.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as l } from "./dlnaServer-B5Sg4MkS.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, ref as S, toDisplayString as C, withCtx as w } from "vue";
//#region src/pages/admin/DlnaServerPage.vue?vue&type=script&setup=true&lang.ts
var T = {
	class: "admin-dlna",
	"aria-labelledby": "dlna-heading"
}, E = {
	class: "admin-dlna__card",
	"aria-live": "polite"
}, D = {
	key: 0,
	class: "admin-dlna__loading",
	"aria-hidden": "true"
}, O = { class: "admin-dlna__status" }, k = {
	key: 0,
	class: "admin-dlna__details"
}, A = { class: "admin-dlna__actions" }, j = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(e) {
		let v = e, j = y("apiBase", ""), M = d(() => typeof j == "string" ? j : j?.value ?? ""), N = new l(v.client ?? new r({
			baseUrl: M.value,
			tokenStore: new t()
		})), P = o(), F = S(null), I = S(!0), L = S(null), R = S(!1), z = d(() => F.value?.running ?? !1), B = d(() => F.value?.enabled ?? !1);
		async function V() {
			I.value = !0, L.value = null;
			try {
				F.value = await N.getStatus();
			} catch (e) {
				L.value = n(e, "Failed to load DLNA server status."), P.error(L.value);
			} finally {
				I.value = !1;
			}
		}
		async function H() {
			if (!R.value) {
				R.value = !0;
				try {
					let e = await N.start();
					if (!e.success) {
						P.error(e.message || "Failed to start DLNA server.");
						return;
					}
					P.success("DLNA server started."), await V();
				} catch (e) {
					P.error(n(e, "Failed to start DLNA server."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function U() {
			if (!R.value) {
				R.value = !0;
				try {
					let e = await N.stop();
					if (!e.success) {
						P.error(e.message || "Failed to stop DLNA server.");
						return;
					}
					P.success("DLNA server stopped."), await V();
				} catch (e) {
					P.error(n(e, "Failed to stop DLNA server."));
				} finally {
					R.value = !1;
				}
			}
		}
		return b(V), (e, t) => (x(), m("section", T, [
			t[5] ||= h("header", { class: "admin-dlna__head" }, [h("h1", {
				id: "dlna-heading",
				class: "admin-dlna__title"
			}, "DLNA Server")], -1),
			h("div", E, [I.value ? (x(), m("div", D, [_(s, {
				variant: "text",
				lines: 4
			})])) : L.value ? (x(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load DLNA server status",
				description: L.value
			}, {
				actions: w(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: V
				}, {
					default: w(() => [...t[0] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : B.value ? (x(), m(u, { key: 3 }, [
				h("div", O, [_(a, {
					tone: z.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: w(() => [g(C(z.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				z.value && F.value !== null ? (x(), m("dl", k, [
					F.value.friendlyName ? (x(), m(u, { key: 0 }, [t[1] ||= h("dt", null, "Friendly Name", -1), h("dd", null, C(F.value.friendlyName), 1)], 64)) : p("", !0),
					F.value.serverId ? (x(), m(u, { key: 1 }, [t[2] ||= h("dt", null, "UDN", -1), h("dd", null, C(F.value.serverId), 1)], 64)) : p("", !0),
					F.value.port === null ? p("", !0) : (x(), m(u, { key: 2 }, [t[3] ||= h("dt", null, "Port", -1), h("dd", null, C(F.value.port), 1)], 64)),
					F.value.baseUrl ? (x(), m(u, { key: 3 }, [t[4] ||= h("dt", null, "Base URL", -1), h("dd", null, C(F.value.baseUrl), 1)], 64)) : p("", !0)
				])) : p("", !0),
				h("div", A, [z.value ? (x(), f(i, {
					key: 1,
					variant: "outline",
					loading: R.value,
					leftIcon: "pause",
					onClick: U
				}, {
					default: w(() => [g(C(R.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (x(), f(i, {
					key: 0,
					variant: "solid",
					loading: R.value,
					leftIcon: "play",
					onClick: H
				}, {
					default: w(() => [g(C(R.value ? "Starting…" : "Start Server"), 1)]),
					_: 1
				}, 8, ["loading"]))])
			], 64)) : (x(), f(c, {
				key: 2,
				icon: "monitor",
				title: "DLNA server is not configured.",
				description: F.value?.message ?? void 0
			}, null, 8, ["description"]))]),
			t[6] ||= h("p", {
				class: "admin-dlna__note",
				role: "note"
			}, " The DLNA server announces this Phlix instance on the local network as a UPnP MediaServer. Restart the server to apply configuration changes. ", -1)
		]));
	}
}), [["__scopeId", "data-v-d01b959a"]]);
//#endregion
export { j as default };

//# sourceMappingURL=DlnaServerPage-9qL_ileO.js.map