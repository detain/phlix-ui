import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as l } from "./PageHint-BoAlFFBN.js";
import { t as u } from "./dlnaServer-B5Sg4MkS.js";
import { t as d } from "./helpLinks-BI4oN4Or.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, onMounted as S, openBlock as C, ref as w, toDisplayString as T, unref as E, withCtx as D } from "vue";
//#region src/pages/admin/DlnaServerPage.vue?vue&type=script&setup=true&lang.ts
var O = {
	class: "admin-dlna",
	"aria-labelledby": "dlna-heading"
}, k = {
	class: "admin-dlna__card",
	"aria-live": "polite"
}, A = {
	key: 0,
	class: "admin-dlna__loading",
	"aria-hidden": "true"
}, j = { class: "admin-dlna__status" }, M = {
	key: 0,
	class: "admin-dlna__details"
}, N = { class: "admin-dlna__actions" }, P = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(e) {
		let b = e, P = x("apiBase", ""), F = p(() => typeof P == "string" ? P : P?.value ?? ""), I = new u(b.client ?? new r({
			baseUrl: F.value,
			tokenStore: new t()
		})), L = i(), R = w(null), z = w(!0), B = w(null), V = w(!1), H = p(() => R.value?.running ?? !1), U = p(() => R.value?.enabled ?? !1);
		async function W() {
			z.value = !0, B.value = null;
			try {
				R.value = await I.getStatus();
			} catch (e) {
				B.value = n(e, "Failed to load DLNA server status."), L.error(B.value);
			} finally {
				z.value = !1;
			}
		}
		async function G() {
			if (!V.value) {
				V.value = !0;
				try {
					let e = await I.start();
					if (!e.success) {
						L.error(e.message || "Failed to start DLNA server.");
						return;
					}
					L.success("DLNA server started."), await W();
				} catch (e) {
					L.error(n(e, "Failed to start DLNA server."));
				} finally {
					V.value = !1;
				}
			}
		}
		async function K() {
			if (!V.value) {
				V.value = !0;
				try {
					let e = await I.stop();
					if (!e.success) {
						L.error(e.message || "Failed to stop DLNA server.");
						return;
					}
					L.success("DLNA server stopped."), await W();
				} catch (e) {
					L.error(n(e, "Failed to stop DLNA server."));
				} finally {
					V.value = !1;
				}
			}
		}
		return S(W), (e, t) => (C(), g("section", O, [
			t[6] ||= _("header", { class: "admin-dlna__head" }, [_("h1", {
				id: "dlna-heading",
				class: "admin-dlna__title"
			}, "DLNA Server")], -1),
			y(l, {
				links: E(d).dlna.links,
				details: E(d).dlna.details
			}, {
				default: D(() => [...t[0] ||= [
					v(" Broadcasts your library over ", -1),
					_("strong", null, "DLNA / UPnP", -1),
					v(" so smart TVs, game consoles, and other players on your network can browse and play it without an app. The ", -1),
					_("strong", null, "Start", -1),
					v(" / ", -1),
					_("strong", null, "Stop", -1),
					v(" button turns the server on or off; the badge shows whether it's running, and once it is you'll see its friendly name, UDN, port, and base URL. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			_("div", k, [z.value ? (C(), g("div", A, [y(s, {
				variant: "text",
				lines: 4
			})])) : B.value ? (C(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load DLNA server status",
				description: B.value
			}, {
				actions: D(() => [y(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: W
				}, {
					default: D(() => [...t[1] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value ? (C(), g(f, { key: 3 }, [
				_("div", j, [y(o, {
					tone: H.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: D(() => [v(T(H.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				H.value && R.value !== null ? (C(), g("dl", M, [
					R.value.friendlyName ? (C(), g(f, { key: 0 }, [t[2] ||= _("dt", null, "Friendly Name", -1), _("dd", null, T(R.value.friendlyName), 1)], 64)) : h("", !0),
					R.value.serverId ? (C(), g(f, { key: 1 }, [t[3] ||= _("dt", null, "UDN", -1), _("dd", null, T(R.value.serverId), 1)], 64)) : h("", !0),
					R.value.port === null ? h("", !0) : (C(), g(f, { key: 2 }, [t[4] ||= _("dt", null, "Port", -1), _("dd", null, T(R.value.port), 1)], 64)),
					R.value.baseUrl ? (C(), g(f, { key: 3 }, [t[5] ||= _("dt", null, "Base URL", -1), _("dd", null, T(R.value.baseUrl), 1)], 64)) : h("", !0)
				])) : h("", !0),
				_("div", N, [H.value ? (C(), m(a, {
					key: 1,
					variant: "outline",
					loading: V.value,
					leftIcon: "pause",
					onClick: K
				}, {
					default: D(() => [v(T(V.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (C(), m(a, {
					key: 0,
					variant: "solid",
					loading: V.value,
					leftIcon: "play",
					onClick: G
				}, {
					default: D(() => [v(T(V.value ? "Starting…" : "Start Server"), 1)]),
					_: 1
				}, 8, ["loading"]))])
			], 64)) : (C(), m(c, {
				key: 2,
				icon: "monitor",
				title: "DLNA server is not configured.",
				description: R.value?.message ?? void 0
			}, null, 8, ["description"]))]),
			t[7] ||= _("p", {
				class: "admin-dlna__note",
				role: "note"
			}, " The DLNA server announces this Phlix instance on the local network as a UPnP MediaServer. Restart the server to apply configuration changes. ", -1)
		]));
	}
}), [["__scopeId", "data-v-af0428d9"]]);
//#endregion
export { P as default };

//# sourceMappingURL=DlnaServerPage-C03g-qJJ.js.map