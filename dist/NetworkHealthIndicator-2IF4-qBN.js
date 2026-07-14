import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { c as n, f as r, t as i } from "./client-D1nDQ0cP.js";
import { t as a } from "./useAuthStore-C_Rnq3Bo.js";
import { t as o } from "./networkHealth-B5_ZbJ4U.js";
import { t as s } from "./Spinner-D1bwTvld.js";
import { Transition as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, normalizeClass as v, onBeforeUnmount as y, onMounted as b, onUnmounted as x, openBlock as S, ref as C, renderSlot as w, toDisplayString as T, unref as E, useId as D, withCtx as O, withKeys as k } from "vue";
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var A = ["id"], j = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "Tooltip",
	props: {
		text: {},
		placement: { default: "top" },
		delay: { default: 300 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = D(), r = C(!1), i = C(null), a;
		function o() {
			return i.value?.firstElementChild ?? null;
		}
		function s() {
			t.disabled || (clearTimeout(a), a = setTimeout(() => {
				r.value = !0, o()?.setAttribute("aria-describedby", n);
			}, t.delay));
		}
		function l() {
			clearTimeout(a), r.value = !1, o()?.removeAttribute("aria-describedby");
		}
		return y(() => clearTimeout(a)), (t, a) => (S(), f("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: l,
			onFocusin: s,
			onFocusout: l,
			onKeydown: k(l, ["esc"])
		}, [w(t.$slots, "default", {}, void 0, !0), h(c, { name: "phlix-tooltip" }, {
			default: O(() => [r.value && (e.text || t.$slots.content) ? (S(), f("span", {
				key: 0,
				id: E(n),
				role: "tooltip",
				class: v(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [w(t.$slots, "content", {}, () => [m(T(e.text), 1)], !0)], 10, A)) : d("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-a3ba7bc3"]]), M = ["aria-label"], N = 3e4, P = 2, F = 12e4, I = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "NetworkHealthIndicator",
	setup(e) {
		let c = _("apiBase", ""), d = new o(new i({
			baseUrl: l(() => typeof c == "string" ? c : c?.value ?? "").value,
			tokenStore: new n()
		})), f = a(), m = C(null), h = C(!0), g = C(null), y, w = N, T = N, E = l(() => {
			if (m.value === null) return "offline";
			let { relay: e, hub: t, network: n } = m.value;
			return !t.isEnrolled || n.latencyMs !== null && n.latencyMs > 500 || n.status === "offline" ? "offline" : !e.connected || e.reconnectAttempts > 0 || t.consecutiveFailures > 0 ? "degraded" : n.latencyMs !== null && n.latencyMs < 100 ? "healthy" : "degraded";
		}), D = l(() => {
			switch (E.value) {
				case "healthy": return "check";
				case "degraded": return "alert";
				case "offline": return "error";
				default: return "error";
			}
		}), k = l(() => {
			switch (E.value) {
				case "healthy": return "Network Healthy";
				case "degraded": return "Network Degraded";
				case "offline": return "Network Offline";
				default: return "Network Offline";
			}
		}), A = l(() => {
			if (m.value === null) return h.value ? "Loading health status…" : "Unable to load health status";
			let { relay: e, hub: t, network: n } = m.value, r = [`Relay: ${e.connected ? e.active ? "Connected" : "Connecting…" : "Disconnected"}`, `Relay Sessions: ${e.activeSessions}`];
			return e.lastDisconnectTime && r.push(`Last disconnect: ${I(e.lastDisconnectTime)}`), r.push(""), r.push(`Hub enrolled: ${t.isEnrolled ? "Yes" : "No"}`), t.lastSuccessfulHeartbeat && r.push(`Last heartbeat: ${I(t.lastSuccessfulHeartbeat)}`), t.consecutiveFailures > 0 && r.push(`Heartbeat failures: ${t.consecutiveFailures}`), r.push(""), n.latencyMs === null ? n.error ? r.push(`Network error: ${n.error}`) : r.push("Latency: unknown") : r.push(`Latency: ${n.latencyMs}ms (${n.status})`), r.push(`Measured: ${I(n.measuredAt)}`), r.join("\n");
		});
		function I(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "never";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		async function L() {
			try {
				m.value = await d.getHealthSnapshot(), g.value = null, w = N;
			} catch (e) {
				g.value = r(e, "Failed to fetch health"), w = Math.min(w * P, F);
			} finally {
				h.value = !1, y !== void 0 && w !== T && R();
			}
		}
		function R() {
			y !== void 0 && clearInterval(y), T = w, y = setInterval(() => {
				L();
			}, w);
		}
		function z() {
			f.isAdmin && (L(), R());
		}
		function B() {
			y !== void 0 && (clearInterval(y), y = void 0);
		}
		function V() {
			document.hidden ? B() : (w = N, z());
		}
		return b(() => {
			typeof document < "u" && document.addEventListener("visibilitychange", V), z();
		}), x(() => {
			B(), typeof document < "u" && document.removeEventListener("visibilitychange", V);
		}), (e, n) => (S(), u(j, {
			text: A.value,
			placement: "bottom"
		}, {
			default: O(() => [p("span", {
				class: v(["health-indicator", `health-indicator--${E.value}`]),
				role: "img",
				"aria-label": k.value
			}, [h.value ? (S(), u(s, {
				key: 0,
				class: "health-indicator__spinner"
			})) : (S(), u(t, {
				key: 1,
				name: D.value,
				class: "health-indicator__icon"
			}, null, 8, ["name"]))], 10, M)]),
			_: 1
		}, 8, ["text"]));
	}
}), [["__scopeId", "data-v-4bccd9e9"]]);
//#endregion
export { j as n, I as t };

//# sourceMappingURL=NetworkHealthIndicator-2IF4-qBN.js.map