import { n as e } from "./Icon-CkTBN_k5.js";
import { l as t, p as n, t as r } from "./client-COHWZ2KC.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Badge-D1_MN41Y.js";
import { t as s } from "./Skeleton-C3OpJbf1.js";
import { t as c } from "./EmptyState-CwWtkhEJ.js";
import { t as l } from "./PageHint-3dL7qb5N.js";
import { t as u } from "./dlnaServer-M5_5lD1Q.js";
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
	class: "admin-dlna__pending",
	role: "status"
}, N = {
	key: 1,
	class: "admin-dlna__message"
}, P = {
	key: 2,
	class: "admin-dlna__details"
}, F = { class: "admin-dlna__actions" }, I = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(e) {
		let b = e, I = x("apiBase", ""), L = p(() => typeof I == "string" ? I : I?.value ?? ""), R = new u(b.client ?? new r({
			baseUrl: L.value,
			tokenStore: new t()
		})), z = i(), B = w(null), V = w(!0), H = w(null), U = w(!1), W = p(() => B.value?.running ?? !1), G = p(() => B.value?.enabled ?? !1), K = p(() => B.value?.reloadPending ?? !1);
		async function q() {
			V.value = !0, H.value = null;
			try {
				B.value = await R.getStatus();
			} catch (e) {
				H.value = n(e, "Failed to load DLNA server status."), z.error(H.value);
			} finally {
				V.value = !1;
			}
		}
		function J(e, t) {
			let n = e.message || t;
			if (e.reloadScheduled === !1) {
				z.warning(n);
				return;
			}
			z.success(n);
		}
		async function Y() {
			if (!U.value) {
				U.value = !0;
				try {
					let e = await R.start();
					if (!e.success) {
						z.error(e.message || "Failed to start DLNA server.");
						return;
					}
					J(e, "DLNA server started."), await q();
				} catch (e) {
					z.error(n(e, "Failed to start DLNA server."));
				} finally {
					U.value = !1;
				}
			}
		}
		async function X() {
			if (!U.value) {
				U.value = !0;
				try {
					let e = await R.stop();
					if (!e.success) {
						z.error(e.message || "Failed to stop DLNA server.");
						return;
					}
					J(e, "DLNA server stopped."), await q();
				} catch (e) {
					z.error(n(e, "Failed to stop DLNA server."));
				} finally {
					U.value = !1;
				}
			}
		}
		return S(q), (e, t) => (C(), g("section", O, [
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
			_("div", k, [V.value ? (C(), g("div", A, [y(s, {
				variant: "text",
				lines: 4
			})])) : H.value ? (C(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load DLNA server status",
				description: H.value
			}, {
				actions: D(() => [y(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: q
				}, {
					default: D(() => [...t[1] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (C(), g(f, { key: 2 }, [
				_("div", j, [y(o, {
					tone: W.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: D(() => [v(T(W.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"]), K.value ? (C(), m(o, {
					key: 0,
					tone: "warning",
					size: "md",
					icon: "rewind"
				}, {
					default: D(() => [v(T(G.value ? "Starting…" : "Stopping…"), 1)]),
					_: 1
				})) : h("", !0)]),
				K.value ? (C(), g("p", M, " The change is saved; workers are reloading to apply it. This page reports the worker that answered, so the badge may lag by a moment. ")) : h("", !0),
				B.value?.message ? (C(), g("p", N, T(B.value.message), 1)) : h("", !0),
				W.value && B.value !== null ? (C(), g("dl", P, [
					B.value.friendlyName ? (C(), g(f, { key: 0 }, [t[2] ||= _("dt", null, "Friendly Name", -1), _("dd", null, T(B.value.friendlyName), 1)], 64)) : h("", !0),
					B.value.serverId ? (C(), g(f, { key: 1 }, [t[3] ||= _("dt", null, "UDN", -1), _("dd", null, T(B.value.serverId), 1)], 64)) : h("", !0),
					B.value.port === null ? h("", !0) : (C(), g(f, { key: 2 }, [t[4] ||= _("dt", null, "Port", -1), _("dd", null, T(B.value.port), 1)], 64)),
					B.value.baseUrl ? (C(), g(f, { key: 3 }, [t[5] ||= _("dt", null, "Base URL", -1), _("dd", null, T(B.value.baseUrl), 1)], 64)) : h("", !0)
				])) : h("", !0),
				_("div", F, [G.value ? (C(), m(a, {
					key: 1,
					variant: "outline",
					loading: U.value,
					leftIcon: "pause",
					onClick: X
				}, {
					default: D(() => [v(T(U.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (C(), m(a, {
					key: 0,
					variant: "solid",
					loading: U.value,
					leftIcon: "play",
					onClick: Y
				}, {
					default: D(() => [v(T(U.value ? "Starting…" : "Start Server"), 1)]),
					_: 1
				}, 8, ["loading"]))])
			], 64))]),
			t[7] ||= _("p", {
				class: "admin-dlna__note",
				role: "note"
			}, " The DLNA server announces this Phlix instance on the local network as a UPnP MediaServer. Restart the server to apply configuration changes. ", -1)
		]));
	}
}), [["__scopeId", "data-v-2b17d33b"]]);
//#endregion
export { I as default };

//# sourceMappingURL=DlnaServerPage-DoM8_EDF.js.map