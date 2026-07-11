import { n as e } from "./Icon-Bd1lZf6E.js";
import { c as t, f as n, t as r } from "./client-B65CbqT7.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CnyfCnhY.js";
import { t as o } from "./Badge-Dq-pYhrz.js";
import { t as s } from "./Skeleton-CzU_l53W.js";
import { t as c } from "./EmptyState-588Z_81C.js";
import { t as l } from "./PageHint-7Giwob0l.js";
import { t as u } from "./dlnaServer-B5Sg4MkS.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, ref as C, toDisplayString as w, withCtx as T } from "vue";
//#region src/pages/admin/DlnaServerPage.vue?vue&type=script&setup=true&lang.ts
var E = {
	class: "admin-dlna",
	"aria-labelledby": "dlna-heading"
}, D = {
	class: "admin-dlna__card",
	"aria-live": "polite"
}, O = {
	key: 0,
	class: "admin-dlna__loading",
	"aria-hidden": "true"
}, k = { class: "admin-dlna__status" }, A = {
	key: 0,
	class: "admin-dlna__details"
}, j = { class: "admin-dlna__actions" }, M = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(e) {
		let y = e, M = b("apiBase", ""), N = f(() => typeof M == "string" ? M : M?.value ?? ""), P = new u(y.client ?? new r({
			baseUrl: N.value,
			tokenStore: new t()
		})), F = i(), I = C(null), L = C(!0), R = C(null), z = C(!1), B = f(() => I.value?.running ?? !1), V = f(() => I.value?.enabled ?? !1);
		async function H() {
			L.value = !0, R.value = null;
			try {
				I.value = await P.getStatus();
			} catch (e) {
				R.value = n(e, "Failed to load DLNA server status."), F.error(R.value);
			} finally {
				L.value = !1;
			}
		}
		async function U() {
			if (!z.value) {
				z.value = !0;
				try {
					let e = await P.start();
					if (!e.success) {
						F.error(e.message || "Failed to start DLNA server.");
						return;
					}
					F.success("DLNA server started."), await H();
				} catch (e) {
					F.error(n(e, "Failed to start DLNA server."));
				} finally {
					z.value = !1;
				}
			}
		}
		async function W() {
			if (!z.value) {
				z.value = !0;
				try {
					let e = await P.stop();
					if (!e.success) {
						F.error(e.message || "Failed to stop DLNA server.");
						return;
					}
					F.success("DLNA server stopped."), await H();
				} catch (e) {
					F.error(n(e, "Failed to stop DLNA server."));
				} finally {
					z.value = !1;
				}
			}
		}
		return x(H), (e, t) => (S(), h("section", E, [
			t[6] ||= g("header", { class: "admin-dlna__head" }, [g("h1", {
				id: "dlna-heading",
				class: "admin-dlna__title"
			}, "DLNA Server")], -1),
			v(l, null, {
				default: T(() => [...t[0] ||= [
					_(" Broadcasts your library over ", -1),
					g("strong", null, "DLNA / UPnP", -1),
					_(" so smart TVs, game consoles, and other players on your network can browse and play it without an app. The ", -1),
					g("strong", null, "Start", -1),
					_(" / ", -1),
					g("strong", null, "Stop", -1),
					_(" button turns the server on or off; the badge shows whether it's running, and once it is you'll see its friendly name, UDN, port, and base URL. ", -1)
				]]),
				_: 1
			}),
			g("div", D, [L.value ? (S(), h("div", O, [v(s, {
				variant: "text",
				lines: 4
			})])) : R.value ? (S(), p(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load DLNA server status",
				description: R.value
			}, {
				actions: T(() => [v(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: H
				}, {
					default: T(() => [...t[1] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : V.value ? (S(), h(d, { key: 3 }, [
				g("div", k, [v(o, {
					tone: B.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: T(() => [_(w(B.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				B.value && I.value !== null ? (S(), h("dl", A, [
					I.value.friendlyName ? (S(), h(d, { key: 0 }, [t[2] ||= g("dt", null, "Friendly Name", -1), g("dd", null, w(I.value.friendlyName), 1)], 64)) : m("", !0),
					I.value.serverId ? (S(), h(d, { key: 1 }, [t[3] ||= g("dt", null, "UDN", -1), g("dd", null, w(I.value.serverId), 1)], 64)) : m("", !0),
					I.value.port === null ? m("", !0) : (S(), h(d, { key: 2 }, [t[4] ||= g("dt", null, "Port", -1), g("dd", null, w(I.value.port), 1)], 64)),
					I.value.baseUrl ? (S(), h(d, { key: 3 }, [t[5] ||= g("dt", null, "Base URL", -1), g("dd", null, w(I.value.baseUrl), 1)], 64)) : m("", !0)
				])) : m("", !0),
				g("div", j, [B.value ? (S(), p(a, {
					key: 1,
					variant: "outline",
					loading: z.value,
					leftIcon: "pause",
					onClick: W
				}, {
					default: T(() => [_(w(z.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (S(), p(a, {
					key: 0,
					variant: "solid",
					loading: z.value,
					leftIcon: "play",
					onClick: U
				}, {
					default: T(() => [_(w(z.value ? "Starting…" : "Start Server"), 1)]),
					_: 1
				}, 8, ["loading"]))])
			], 64)) : (S(), p(c, {
				key: 2,
				icon: "monitor",
				title: "DLNA server is not configured.",
				description: I.value?.message ?? void 0
			}, null, 8, ["description"]))]),
			t[7] ||= g("p", {
				class: "admin-dlna__note",
				role: "note"
			}, " The DLNA server announces this Phlix instance on the local network as a UPnP MediaServer. Restart the server to apply configuration changes. ", -1)
		]));
	}
}), [["__scopeId", "data-v-69b15af8"]]);
//#endregion
export { M as default };

//# sourceMappingURL=DlnaServerPage-C0GD17w1.js.map