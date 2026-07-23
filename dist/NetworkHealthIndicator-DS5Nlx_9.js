import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, t as i } from "./client-BzWwyWKr.js";
import { t as a } from "./useAuthStore-Ds0NVhBP.js";
import { t as o } from "./networkHealth-B5_ZbJ4U.js";
import { t as s } from "./Tooltip-9gdTmuk6.js";
import { t as c } from "./Spinner-C4utUvmQ.js";
import { computed as l, createBlock as u, createElementVNode as d, defineComponent as f, inject as p, normalizeClass as m, onMounted as h, onUnmounted as g, openBlock as _, ref as v, withCtx as y } from "vue";
//#region src/components/NetworkHealthIndicator.vue?vue&type=script&setup=true&lang.ts
var b = ["aria-label"], x = 3e4, S = 2, C = 12e4, w = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "NetworkHealthIndicator",
	setup(e) {
		let f = p("apiBase", ""), w = new o(new i({
			baseUrl: l(() => typeof f == "string" ? f : f?.value ?? "").value,
			tokenStore: new n()
		})), T = a(), E = v(null), D = v(!0), O = v(null), k, A = x, j = x, M = l(() => {
			if (E.value === null) return "offline";
			let { relay: e, hub: t, network: n } = E.value;
			return !t.isEnrolled || n.latencyMs !== null && n.latencyMs > 500 || n.status === "offline" ? "offline" : !e.connected || e.reconnectAttempts > 0 || t.consecutiveFailures > 0 ? "degraded" : n.latencyMs !== null && n.latencyMs < 100 ? "healthy" : "degraded";
		}), N = l(() => {
			switch (M.value) {
				case "healthy": return "check";
				case "degraded": return "alert";
				case "offline": return "error";
				default: return "error";
			}
		}), P = l(() => {
			switch (M.value) {
				case "healthy": return "Network Healthy";
				case "degraded": return "Network Degraded";
				case "offline": return "Network Offline";
				default: return "Network Offline";
			}
		}), F = l(() => {
			if (E.value === null) return D.value ? "Loading health status…" : "Unable to load health status";
			let { relay: e, hub: t, network: n } = E.value, r = [`Relay: ${e.connected ? e.active ? "Connected" : "Connecting…" : "Disconnected"}`, `Relay Sessions: ${e.activeSessions}`];
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
				E.value = await w.getHealthSnapshot(), O.value = null, A = x;
			} catch (e) {
				O.value = r(e, "Failed to fetch health"), A = Math.min(A * S, C);
			} finally {
				D.value = !1, k !== void 0 && A !== j && R();
			}
		}
		function R() {
			k !== void 0 && clearInterval(k), j = A, k = setInterval(() => {
				L();
			}, A);
		}
		function z() {
			T.isAdmin && (L(), R());
		}
		function B() {
			k !== void 0 && (clearInterval(k), k = void 0);
		}
		function V() {
			document.hidden ? B() : (A = x, z());
		}
		return h(() => {
			typeof document < "u" && document.addEventListener("visibilitychange", V), z();
		}), g(() => {
			B(), typeof document < "u" && document.removeEventListener("visibilitychange", V);
		}), (e, n) => (_(), u(s, {
			text: F.value,
			placement: "bottom"
		}, {
			default: y(() => [d("span", {
				class: m(["health-indicator", `health-indicator--${M.value}`]),
				role: "img",
				"aria-label": P.value
			}, [D.value ? (_(), u(c, {
				key: 0,
				class: "health-indicator__spinner"
			})) : (_(), u(t, {
				key: 1,
				name: N.value,
				class: "health-indicator__icon"
			}, null, 8, ["name"]))], 10, b)]),
			_: 1
		}, 8, ["text"]));
	}
}), [["__scopeId", "data-v-4bccd9e9"]]);
//#endregion
export { w as t };

//# sourceMappingURL=NetworkHealthIndicator-DS5Nlx_9.js.map