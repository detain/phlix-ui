//#region src/api/admin/syncPlay.ts
var e = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listGroups() {
		let { groups: e } = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e) ? e : [];
	}
	createGroup(e) {
		return this.client.post("/api/v1/syncplay/groups", e);
	}
	getGroup(e) {
		return this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`);
	}
	joinGroup(e, t) {
		return this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, t ?? {});
	}
	leaveGroup(e) {
		return this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`, {});
	}
};
//#endregion
export { e as t };

//# sourceMappingURL=syncPlay-DPzJkgkK.js.map