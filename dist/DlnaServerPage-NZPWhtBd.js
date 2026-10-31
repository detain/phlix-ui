import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./dlnaServer-DDX4fFPQ.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Button-1sKEdGjj.js";
import { t as a } from "./PageHint-BlhPmafC.js";
import { t as o } from "./helpLinks-iarZuNmw.js";
import { t as s } from "./Badge-C6LNO9Kk.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, ref as C, toDisplayString as w, unref as T, withCtx as E } from "vue";
// src/pages/admin/DlnaServerPage.vue?vue&type=script&setup=true&lang.ts
var D = {
	class: "admin-dlna",
	"aria-labelledby": "dlna-heading"
}, O = {
	class: "admin-dlna__card",
	"aria-live": "polite"
}, k = {
	key: 0,
	class: "admin-dlna__loading",
	"aria-hidden": "true"
}, A = { class: "admin-dlna__status" }, j = {
	key: 0,
	class: "admin-dlna__pending",
	role: "status"
}, M = {
	key: 1,
	class: "admin-dlna__message"
}, N = {
	key: 2,
	class: "admin-dlna__details"
}, P = { class: "admin-dlna__actions" }, F = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(u) {
		let y = u, F = b("apiBase", ""), I = f(() => typeof F == "string" ? F : F?.value ?? ""), L = new n(y.client ?? new e({ baseUrl: I.value })), R = r(), z = C(null), B = C(!0), V = C(null), H = C(!1), U = f(() => z.value?.running ?? !1), W = f(() => z.value?.enabled ?? !1), G = f(() => z.value?.reloadPending ?? !1);
		async function K() {
			B.value = !0, V.value = null;
			try {
				z.value = await L.getStatus();
			} catch (e) {
				V.value = t(e, "Failed to load DLNA server status."), R.error(V.value);
			} finally {
				B.value = !1;
			}
		}
		function q(e, t) {
			let n = e.message || t;
			e.reloadScheduled === !1 ? R.warning(n) : R.success(n);
		}
		async function J() {
			if (!H.value) {
				H.value = !0;
				try {
					let e = await L.start();
					if (!e.success) {
						R.error(e.message || "Failed to start DLNA server.");
						return;
					}
					q(e, "DLNA server started."), await K();
				} catch (e) {
					R.error(t(e, "Failed to start DLNA server."));
				} finally {
					H.value = !1;
				}
			}
		}
		async function Y() {
			if (!H.value) {
				H.value = !0;
				try {
					let e = await L.stop();
					if (!e.success) {
						R.error(e.message || "Failed to stop DLNA server.");
						return;
					}
					q(e, "DLNA server stopped."), await K();
				} catch (e) {
					R.error(t(e, "Failed to stop DLNA server."));
				} finally {
					H.value = !1;
				}
			}
		}
		return x(K), (e, t) => (S(), h("section", D, [
			t[6] ||= g("header", { class: "admin-dlna__head" }, [g("h1", {
				id: "dlna-heading",
				class: "admin-dlna__title"
			}, "DLNA Server")], -1),
			v(a, {
				links: T(o).dlna.links,
				details: T(o).dlna.details
			}, {
				default: E(() => [...t[0] ||= [
					_(" Broadcasts your library over ", -1),
					g("strong", null, "DLNA / UPnP", -1),
					_(" so smart TVs, game consoles, and other players on your network can browse and play it without an app. The ", -1),
					g("strong", null, "Start", -1),
					_(" / ", -1),
					g("strong", null, "Stop", -1),
					_(" button turns the server on or off; the badge shows whether it's running, and once it is you'll see its friendly name, UDN, port, and base URL. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			g("div", O, [B.value ? (S(), h("div", k, [v(c, {
				variant: "text",
				lines: 4
			})])) : V.value ? (S(), p(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load DLNA server status",
				description: V.value
			}, {
				actions: E(() => [v(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: E(() => [...t[1] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (S(), h(d, { key: 2 }, [
				g("div", A, [v(s, {
					tone: U.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: E(() => [_(w(U.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"]), G.value ? (S(), p(s, {
					key: 0,
					tone: "warning",
					size: "md",
					icon: "rewind"
				}, {
					default: E(() => [_(w(W.value ? "Starting…" : "Stopping…"), 1)]),
					_: 1
				})) : m("", !0)]),
				G.value ? (S(), h("p", j, " The change is saved; workers are reloading to apply it. This page reports the worker that answered, so the badge may lag by a moment. ")) : m("", !0),
				z.value?.message ? (S(), h("p", M, w(z.value.message), 1)) : m("", !0),
				U.value && z.value !== null ? (S(), h("dl", N, [
					z.value.friendlyName ? (S(), h(d, { key: 0 }, [t[2] ||= g("dt", null, "Friendly Name", -1), g("dd", null, w(z.value.friendlyName), 1)], 64)) : m("", !0),
					z.value.serverId ? (S(), h(d, { key: 1 }, [t[3] ||= g("dt", null, "UDN", -1), g("dd", null, w(z.value.serverId), 1)], 64)) : m("", !0),
					z.value.port === null ? m("", !0) : (S(), h(d, { key: 2 }, [t[4] ||= g("dt", null, "Port", -1), g("dd", null, w(z.value.port), 1)], 64)),
					z.value.baseUrl ? (S(), h(d, { key: 3 }, [t[5] ||= g("dt", null, "Base URL", -1), g("dd", null, w(z.value.baseUrl), 1)], 64)) : m("", !0)
				])) : m("", !0),
				g("div", P, [W.value ? (S(), p(i, {
					key: 1,
					variant: "outline",
					loading: H.value,
					leftIcon: "pause",
					onClick: Y
				}, {
					default: E(() => [_(w(H.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (S(), p(i, {
					key: 0,
					variant: "solid",
					loading: H.value,
					leftIcon: "play",
					onClick: J
				}, {
					default: E(() => [_(w(H.value ? "Starting…" : "Start Server"), 1)]),
					_: 1
				}, 8, ["loading"]))])
			], 64))]),
			t[7] ||= g("p", {
				class: "admin-dlna__note",
				role: "note"
			}, " The DLNA server announces this Phlix instance on the local network as a UPnP MediaServer. Restart the server to apply configuration changes. ", -1)
		]));
	}
}), [["__scopeId", "data-v-99dd2383"]]);
export { F as default };

//# sourceMappingURL=DlnaServerPage-NZPWhtBd.js.map