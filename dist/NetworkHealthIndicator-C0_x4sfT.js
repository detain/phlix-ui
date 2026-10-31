import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./networkHealth-DFUczi19.js";
import { t as r } from "./Tooltip-Biea-2FR.js";
import { n as i, t as a } from "./Icon-CIbfiPrs.js";
import { t as o } from "./Spinner-zawWdcUT.js";
import { t as s } from "./useAuthStore-D2ZmuYZO.js";
import { computed as c, createBlock as l, createElementVNode as u, defineComponent as d, inject as f, normalizeClass as p, onMounted as m, onUnmounted as h, openBlock as g, ref as _, withCtx as v } from "vue";
// src/components/NetworkHealthIndicator.vue?vue&type=script&setup=true&lang.ts
var y = ["aria-label"], b = 3e4, x = 2, S = 12e4, C = /*#__PURE__*/ i(/* @__PURE__ */ d({
	__name: "NetworkHealthIndicator",
	setup(i) {
		let d = f("apiBase", ""), C = c(() => typeof d == "string" ? d : d?.value ?? ""), w = new n(new e({ baseUrl: C.value })), T = s(), E = _(null), D = _(!0), O = _(null), k, A = b, j = b, M = c(() => {
			if (E.value === null) return "offline";
			let { relay: e, hub: t, network: n } = E.value;
			return !t.isEnrolled || n.latencyMs !== null && n.latencyMs > 500 || n.status === "offline" ? "offline" : !e.connected || e.reconnectAttempts > 0 || t.consecutiveFailures > 0 ? "degraded" : n.latencyMs !== null && n.latencyMs < 100 ? "healthy" : "degraded";
		}), N = c(() => {
			switch (M.value) {
				case "healthy": return "check";
				case "degraded": return "alert";
				case "offline": return "error";
				default: return "error";
			}
		}), P = c(() => {
			switch (M.value) {
				case "healthy": return "Network Healthy";
				case "degraded": return "Network Degraded";
				case "offline": return "Network Offline";
				default: return "Network Offline";
			}
		}), F = c(() => {
			if (E.value === null) return D.value ? "Loading health status…" : "Unable to load health status";
			let { relay: e, hub: t, network: n } = E.value, r = [`Relay: ${e.connected ? e.active ? "Connected" : "Connecting…" : "Disconnected"}`, `Relay Sessions: ${e.activeSessions}`];
			return e.lastDisconnectTime !== null && r.push(`Last disconnect: ${I(e.lastDisconnectTime)}`), e.lastConnectError !== null && (r.push(`Relay error: ${e.lastConnectError}`), e.lastConnectErrorAt !== null && r.push(`Relay error at: ${I(e.lastConnectErrorAt)}`)), r.push(""), r.push(`Hub enrolled: ${t.isEnrolled ? "Yes" : "No"}`), t.lastSuccessfulHeartbeat !== null && r.push(`Last heartbeat: ${I(t.lastSuccessfulHeartbeat)}`), t.consecutiveFailures > 0 && r.push(`Heartbeat failures: ${t.consecutiveFailures}`), r.push(""), n.latencyMs === null ? n.error ? r.push(`Network error: ${n.error}`) : r.push("Latency: not measured yet") : r.push(`Latency: ${n.latencyMs}ms (${n.status})`), t.lastLatencyMs !== null && r.push(`Last hub latency: ${t.lastLatencyMs}ms`), r.push(`Measured: ${I(n.measuredAt)}`), r.join("\n");
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
				E.value = await w.getHealthSnapshot(), O.value = null, A = b;
			} catch (e) {
				O.value = t(e, "Failed to fetch health"), A = Math.min(A * x, S);
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
			document.hidden ? B() : (A = b, z());
		}
		return m(() => {
			typeof document < "u" && document.addEventListener("visibilitychange", V), z();
		}), h(() => {
			B(), typeof document < "u" && document.removeEventListener("visibilitychange", V);
		}), (e, t) => (g(), l(r, {
			text: F.value,
			placement: "bottom"
		}, {
			default: v(() => [u("span", {
				class: p(["health-indicator", `health-indicator--${M.value}`]),
				role: "img",
				"aria-label": P.value
			}, [D.value ? (g(), l(o, {
				key: 0,
				class: "health-indicator__spinner"
			})) : (g(), l(a, {
				key: 1,
				name: N.value,
				class: "health-indicator__icon"
			}, null, 8, ["name"]))], 10, y)]),
			_: 1
		}, 8, ["text"]));
	}
}), [["__scopeId", "data-v-0df2edfc"]]);
export { C as t };

//# sourceMappingURL=NetworkHealthIndicator-C0_x4sfT.js.map