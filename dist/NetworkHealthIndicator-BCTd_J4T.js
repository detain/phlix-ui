import { n as e, t } from "./Icon-CkTBN_k5.js";
import { l as n, p as r, t as i } from "./client-COHWZ2KC.js";
import { t as a } from "./useAuthStore-Bxpn4wWU.js";
import { t as o } from "./networkHealth-D2-6IrJA.js";
import { t as s } from "./Tooltip-Bi7vMBv_.js";
import { t as c } from "./Spinner-7_O7o6Gy.js";
import { computed as l, createBlock as u, createElementVNode as d, defineComponent as f, inject as p, normalizeClass as m, onMounted as h, onUnmounted as g, openBlock as _, ref as v, withCtx as y } from "vue";
//#region src/components/NetworkHealthIndicator.vue?vue&type=script&setup=true&lang.ts
var b = ["aria-label"], x = 3e4, S = 2, C = 12e4, w = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "NetworkHealthIndicator",
	setup(e) {
		let f = p("apiBase", ""), w = l(() => typeof f == "string" ? f : f?.value ?? ""), T = new o(new i({
			baseUrl: w.value,
			tokenStore: new n()
		})), E = a(), D = v(null), O = v(!0), k = v(null), A, j = x, M = x, N = l(() => {
			if (D.value === null) return "offline";
			let { relay: e, hub: t, network: n } = D.value;
			return !t.isEnrolled || n.latencyMs !== null && n.latencyMs > 500 || n.status === "offline" ? "offline" : !e.connected || e.reconnectAttempts > 0 || t.consecutiveFailures > 0 ? "degraded" : n.latencyMs !== null && n.latencyMs < 100 ? "healthy" : "degraded";
		}), P = l(() => {
			switch (N.value) {
				case "healthy": return "check";
				case "degraded": return "alert";
				case "offline": return "error";
				default: return "error";
			}
		}), F = l(() => {
			switch (N.value) {
				case "healthy": return "Network Healthy";
				case "degraded": return "Network Degraded";
				case "offline": return "Network Offline";
				default: return "Network Offline";
			}
		}), I = l(() => {
			if (D.value === null) return O.value ? "Loading health status…" : "Unable to load health status";
			let { relay: e, hub: t, network: n } = D.value, r = [`Relay: ${e.connected ? e.active ? "Connected" : "Connecting…" : "Disconnected"}`, `Relay Sessions: ${e.activeSessions}`];
			return e.lastDisconnectTime !== null && r.push(`Last disconnect: ${L(e.lastDisconnectTime)}`), e.lastConnectError !== null && (r.push(`Relay error: ${e.lastConnectError}`), e.lastConnectErrorAt !== null && r.push(`Relay error at: ${L(e.lastConnectErrorAt)}`)), r.push(""), r.push(`Hub enrolled: ${t.isEnrolled ? "Yes" : "No"}`), t.lastSuccessfulHeartbeat !== null && r.push(`Last heartbeat: ${L(t.lastSuccessfulHeartbeat)}`), t.consecutiveFailures > 0 && r.push(`Heartbeat failures: ${t.consecutiveFailures}`), r.push(""), n.latencyMs === null ? n.error ? r.push(`Network error: ${n.error}`) : r.push("Latency: not measured yet") : r.push(`Latency: ${n.latencyMs}ms (${n.status})`), t.lastLatencyMs !== null && r.push(`Last hub latency: ${t.lastLatencyMs}ms`), r.push(`Measured: ${L(n.measuredAt)}`), r.join("\n");
		});
		function L(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "never";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		async function R() {
			try {
				D.value = await T.getHealthSnapshot(), k.value = null, j = x;
			} catch (e) {
				k.value = r(e, "Failed to fetch health"), j = Math.min(j * S, C);
			} finally {
				O.value = !1, A !== void 0 && j !== M && z();
			}
		}
		function z() {
			A !== void 0 && clearInterval(A), M = j, A = setInterval(() => {
				R();
			}, j);
		}
		function B() {
			E.isAdmin && (R(), z());
		}
		function V() {
			A !== void 0 && (clearInterval(A), A = void 0);
		}
		function H() {
			document.hidden ? V() : (j = x, B());
		}
		return h(() => {
			typeof document < "u" && document.addEventListener("visibilitychange", H), B();
		}), g(() => {
			V(), typeof document < "u" && document.removeEventListener("visibilitychange", H);
		}), (e, n) => (_(), u(s, {
			text: I.value,
			placement: "bottom"
		}, {
			default: y(() => [d("span", {
				class: m(["health-indicator", `health-indicator--${N.value}`]),
				role: "img",
				"aria-label": F.value
			}, [O.value ? (_(), u(c, {
				key: 0,
				class: "health-indicator__spinner"
			})) : (_(), u(t, {
				key: 1,
				name: P.value,
				class: "health-indicator__icon"
			}, null, 8, ["name"]))], 10, b)]),
			_: 1
		}, 8, ["text"]));
	}
}), [["__scopeId", "data-v-10c24fca"]]);
//#endregion
export { w as t };

//# sourceMappingURL=NetworkHealthIndicator-BCTd_J4T.js.map