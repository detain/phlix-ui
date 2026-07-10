//#region src/api/admin/services.ts
var e = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getTraktStatus() {
		let e = await this.client.get("/api/v1/admin/services/trakt/status"), t = {
			connected: e.connected === !0,
			username: typeof e.username == "string" ? e.username : null
		};
		return typeof e.configured == "boolean" && (t.configured = e.configured), t;
	}
	async disconnectTrakt() {
		let e = await this.client.post("/api/v1/admin/services/trakt/disconnect");
		return { message: typeof e.message == "string" ? e.message : "" };
	}
	navigateToTraktAuthorize() {
		typeof window < "u" && (window.location.href = "/api/v1/oauth/trakt");
	}
	async getLastfmStatus() {
		let e = await this.client.get("/api/v1/admin/services/lastfm/status");
		return {
			connected: e.connected === !0,
			username: typeof e.username == "string" ? e.username : null,
			api_key_set: e.api_key_set === !0
		};
	}
	async disconnectLastfm() {
		let e = await this.client.post("/api/v1/admin/services/lastfm/disconnect");
		return { message: typeof e.message == "string" ? e.message : "" };
	}
	navigateToLastfmConnect() {
		typeof window < "u" && (window.location.href = "/api/v1/oauth/lastfm");
	}
};
//#endregion
export { e as t };

//# sourceMappingURL=services-C907MGdw.js.map