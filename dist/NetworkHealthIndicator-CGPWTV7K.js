import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { c as n, f as r, t as i } from "./client-DH50wjeq.js";
import { t as a } from "./networkHealth-B5_ZbJ4U.js";
import { t as o } from "./Spinner-C1ovN881.js";
import { Transition as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, normalizeClass as _, onBeforeUnmount as v, onMounted as y, onUnmounted as b, openBlock as x, ref as S, renderSlot as C, toDisplayString as w, unref as T, useId as E, withCtx as D, withKeys as O } from "vue";
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var k = ["id"], A = /*#__PURE__*/ e(/* @__PURE__ */ h({
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
		let t = e, n = E(), r = S(!1), i = S(null), a;
		function o() {
			return i.value?.firstElementChild ?? null;
		}
		function c() {
			t.disabled || (clearTimeout(a), a = setTimeout(() => {
				r.value = !0, o()?.setAttribute("aria-describedby", n);
			}, t.delay));
		}
		function l() {
			clearTimeout(a), r.value = !1, o()?.removeAttribute("aria-describedby");
		}
		return v(() => clearTimeout(a)), (t, a) => (x(), d("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: c,
			onMouseleave: l,
			onFocusin: c,
			onFocusout: l,
			onKeydown: O(l, ["esc"])
		}, [C(t.$slots, "default", {}, void 0, !0), m(s, { name: "phlix-tooltip" }, {
			default: D(() => [r.value && (e.text || t.$slots.content) ? (x(), d("span", {
				key: 0,
				id: T(n),
				role: "tooltip",
				class: _(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [C(t.$slots, "content", {}, () => [p(w(e.text), 1)], !0)], 10, k)) : u("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-a3ba7bc3"]]), j = ["aria-label"], M = 3e4, N = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "NetworkHealthIndicator",
	setup(e) {
		let s = g("apiBase", ""), u = new a(new i({
			baseUrl: c(() => typeof s == "string" ? s : s?.value ?? "").value,
			tokenStore: new n()
		})), d = S(null), p = S(!0), m = S(null), h, v = c(() => {
			if (d.value === null) return "offline";
			let { relay: e, hub: t, network: n } = d.value;
			return !t.isEnrolled || !e.connected || n.status === "offline" || n.latencyMs !== null && n.latencyMs > 500 ? "offline" : n.status === "degraded" || e.reconnectAttempts > 0 || t.consecutiveFailures > 0 ? "degraded" : n.latencyMs !== null && n.latencyMs < 100 ? "healthy" : "degraded";
		}), C = c(() => {
			switch (v.value) {
				case "healthy": return "check";
				case "degraded": return "alert";
				case "offline": return "error";
				default: return "error";
			}
		}), w = c(() => {
			switch (v.value) {
				case "healthy": return "Network Healthy";
				case "degraded": return "Network Degraded";
				case "offline": return "Network Offline";
				default: return "Network Offline";
			}
		}), T = c(() => {
			if (d.value === null) return p.value ? "Loading health status…" : "Unable to load health status";
			let { relay: e, hub: t, network: n } = d.value, r = [`Relay: ${e.connected ? e.active ? "Connected" : "Connecting…" : "Disconnected"}`, `Relay Sessions: ${e.activeSessions}`];
			return e.lastDisconnectTime && r.push(`Last disconnect: ${E(e.lastDisconnectTime)}`), r.push(""), r.push(`Hub enrolled: ${t.isEnrolled ? "Yes" : "No"}`), t.lastSuccessfulHeartbeat && r.push(`Last heartbeat: ${E(t.lastSuccessfulHeartbeat)}`), t.consecutiveFailures > 0 && r.push(`Heartbeat failures: ${t.consecutiveFailures}`), r.push(""), n.latencyMs === null ? n.error ? r.push(`Network error: ${n.error}`) : r.push("Latency: unknown") : r.push(`Latency: ${n.latencyMs}ms (${n.status})`), r.push(`Measured: ${E(n.measuredAt)}`), r.join("\n");
		});
		function E(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "never";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		async function O() {
			try {
				d.value = await u.getHealthSnapshot(), m.value = null;
			} catch (e) {
				m.value = r(e, "Failed to fetch health");
			} finally {
				p.value = !1;
			}
		}
		function k() {
			O(), h = setInterval(() => {
				O();
			}, M);
		}
		function N() {
			h !== void 0 && (clearInterval(h), h = void 0);
		}
		return y(k), b(N), (e, n) => (x(), l(A, {
			text: T.value,
			placement: "bottom"
		}, {
			default: D(() => [f("span", {
				class: _(["health-indicator", `health-indicator--${v.value}`]),
				role: "img",
				"aria-label": w.value
			}, [p.value ? (x(), l(o, {
				key: 0,
				class: "health-indicator__spinner"
			})) : (x(), l(t, {
				key: 1,
				name: C.value,
				class: "health-indicator__icon"
			}, null, 8, ["name"]))], 10, j)]),
			_: 1
		}, 8, ["text"]));
	}
}), [["__scopeId", "data-v-3e9cbb85"]]);
//#endregion
export { A as n, N as t };

//# sourceMappingURL=NetworkHealthIndicator-CGPWTV7K.js.map