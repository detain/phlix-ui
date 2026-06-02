//#region src/api/admin/dlnaServer.ts
var e = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getStatus() {
		let e = await this.client.get("/api/v1/admin/dlna/status");
		return {
			enabled: e.enabled === !0,
			running: e.running === !0,
			serverId: typeof e.serverId == "string" ? e.serverId : null,
			friendlyName: typeof e.friendlyName == "string" ? e.friendlyName : null,
			port: typeof e.port == "number" ? e.port : null,
			baseUrl: typeof e.baseUrl == "string" ? e.baseUrl : null,
			...typeof e.message == "string" ? { message: e.message } : {}
		};
	}
	async start() {
		let e = await this.client.post("/api/v1/admin/dlna/start");
		return {
			success: e.success === !0,
			...typeof e.message == "string" ? { message: e.message } : {}
		};
	}
	async stop() {
		let e = await this.client.post("/api/v1/admin/dlna/stop");
		return {
			success: e.success === !0,
			...typeof e.message == "string" ? { message: e.message } : {}
		};
	}
};
//#endregion
export { e as t };

//# sourceMappingURL=dlnaServer-B5Sg4MkS.js.map