//#region src/api/admin/networkHealth.ts
function e(e, t = !1) {
	return typeof e == "boolean" ? e : t;
}
function t(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function n(e, t = "") {
	return typeof e == "string" ? e : t;
}
function r(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function i(r) {
	return {
		connected: e(r.connected),
		active: e(r.active),
		reconnectAttempts: t(r.reconnectAttempts),
		lastDisconnectTime: n(r.lastDisconnectTime ?? null),
		activeSessions: t(r.activeSessions),
		stale: e(r.stale)
	};
}
function a(r) {
	return {
		lastSuccessfulHeartbeat: n(r.lastSuccessfulHeartbeat ?? null),
		consecutiveFailures: t(r.consecutiveFailures),
		isEnrolled: e(r.isEnrolled),
		enrollmentExpiresAt: n(r.enrollmentExpiresAt ?? null),
		stale: e(r.stale)
	};
}
function o(r) {
	let i = n(r.status, "offline");
	return i !== "healthy" && i !== "degraded" && i !== "offline" ? {
		latencyMs: null,
		status: "offline",
		measuredAt: n(r.measuredAt, (/* @__PURE__ */ new Date()).toISOString()),
		stale: e(r.stale),
		error: n(r.error, "Unknown status")
	} : {
		latencyMs: t(r.latencyMs ?? null),
		status: i,
		measuredAt: n(r.measuredAt, (/* @__PURE__ */ new Date()).toISOString()),
		stale: e(r.stale),
		error: n(r.error ?? null)
	};
}
var s = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getRelayHealth() {
		let { data: e } = await this.client.get("/api/v1/health/relay"), t = r(e) ? e : {};
		return {
			relay: i(t.relay ?? {}),
			hub: a(t.hub ?? {})
		};
	}
	async getNetworkHealth() {
		let { data: e } = await this.client.get("/api/v1/health/network");
		return o(r(e) ? e : {});
	}
	async getHealthSnapshot() {
		let [e, t] = await Promise.all([this.getRelayHealth(), this.getNetworkHealth()]);
		return {
			relay: e.relay,
			hub: e.hub,
			network: t
		};
	}
};
//#endregion
export { s as t };

//# sourceMappingURL=networkHealth-CtAbCNzZ.js.map