import { T as e, t } from "./client-Bmlfq3Uy.js";
import { t as n } from "./networkHealth-CaPDN-GY.js";
import { t as r } from "./Tooltip-CaS-pDMB.js";
import { n as i, t as a } from "./Icon-55iG1rR7.js";
import { t as o } from "./Spinner-B-nY5uPl.js";
import { t as s } from "./useAuthStore-DRGfd5iG.js";
import { t as c } from "./useMessages-BjPW27vR.js";
import { computed as l, createBlock as u, createElementVNode as d, defineComponent as f, inject as p, normalizeClass as m, onMounted as h, onUnmounted as g, openBlock as _, ref as v, withCtx as y } from "vue";
// src/components/NetworkHealthIndicator.vue?vue&type=script&setup=true&lang.ts
var b = ["aria-label"], x = 3e4, S = 2, C = 12e4, w = /*#__PURE__*/ i(/* @__PURE__ */ f({
	__name: "NetworkHealthIndicator",
	setup(i) {
		let f = p("apiBase", ""), w = l(() => typeof f == "string" ? f : f?.value ?? ""), T = new n(new t({ baseUrl: w.value })), E = s(), { t: D } = c(), O = v(null), k = v(!0), A = v(null), j, M = x, N = x, P = l(() => {
			if (O.value === null) return "offline";
			let { relay: e, hub: t, network: n } = O.value;
			return !t.isEnrolled || n.latencyMs !== null && n.latencyMs > 500 || n.status === "offline" ? "offline" : !e.connected || e.reconnectAttempts > 0 || t.consecutiveFailures > 0 ? "degraded" : n.latencyMs !== null && n.latencyMs < 100 ? "healthy" : "degraded";
		}), F = l(() => {
			switch (P.value) {
				case "healthy": return "check";
				case "degraded": return "alert";
				case "offline": return "error";
				default: return "error";
			}
		}), I = l(() => {
			switch (P.value) {
				case "healthy": return D("network.statusHealthy");
				case "degraded": return D("network.statusDegraded");
				case "offline": return D("network.statusOffline");
				default: return D("network.statusOffline");
			}
		}), L = l(() => {
			if (O.value === null) return k.value ? D("network.statusLoading") : D("network.statusUnavailable");
			let { relay: e, hub: t, network: n } = O.value, r = [`Relay: ${e.connected ? e.active ? "Connected" : "Connecting…" : "Disconnected"}`, `Relay Sessions: ${e.activeSessions}`];
			return e.lastDisconnectTime !== null && r.push(`Last disconnect: ${R(e.lastDisconnectTime)}`), e.lastConnectError !== null && (r.push(`Relay error: ${e.lastConnectError}`), e.lastConnectErrorAt !== null && r.push(`Relay error at: ${R(e.lastConnectErrorAt)}`)), r.push(""), r.push(`Hub enrolled: ${t.isEnrolled ? "Yes" : "No"}`), t.lastSuccessfulHeartbeat !== null && r.push(`Last heartbeat: ${R(t.lastSuccessfulHeartbeat)}`), t.consecutiveFailures > 0 && r.push(`Heartbeat failures: ${t.consecutiveFailures}`), r.push(""), n.latencyMs === null ? n.error ? r.push(`Network error: ${n.error}`) : r.push("Latency: not measured yet") : r.push(`Latency: ${n.latencyMs}ms (${n.status})`), t.lastLatencyMs !== null && r.push(`Last hub latency: ${t.lastLatencyMs}ms`), r.push(`Measured: ${R(n.measuredAt)}`), r.join("\n");
		});
		function R(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "never";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		async function z() {
			try {
				O.value = await T.getHealthSnapshot(), A.value = null, M = x;
			} catch (t) {
				A.value = e(t, "Failed to fetch health"), M = Math.min(M * S, C);
			} finally {
				k.value = !1, j !== void 0 && M !== N && B();
			}
		}
		function B() {
			j !== void 0 && clearInterval(j), N = M, j = setInterval(() => {
				z();
			}, M);
		}
		function V() {
			E.isAdmin && (z(), B());
		}
		function H() {
			j !== void 0 && (clearInterval(j), j = void 0);
		}
		function U() {
			document.hidden ? H() : (M = x, V());
		}
		return h(() => {
			typeof document < "u" && document.addEventListener("visibilitychange", U), V();
		}), g(() => {
			H(), typeof document < "u" && document.removeEventListener("visibilitychange", U);
		}), (e, t) => (_(), u(r, {
			text: L.value,
			placement: "bottom"
		}, {
			default: y(() => [d("span", {
				class: m(["health-indicator", `health-indicator--${P.value}`]),
				role: "img",
				"aria-label": I.value
			}, [k.value ? (_(), u(o, {
				key: 0,
				class: "health-indicator__spinner"
			})) : (_(), u(a, {
				key: 1,
				name: F.value,
				class: "health-indicator__icon"
			}, null, 8, ["name"]))], 10, b)]),
			_: 1
		}, 8, ["text"]));
	}
}), [["__scopeId", "data-v-9197858d"]]);
export { w as t };

//# sourceMappingURL=NetworkHealthIndicator-eD27wpnq.js.map