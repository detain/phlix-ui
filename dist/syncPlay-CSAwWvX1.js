import { E as e } from "./client-DJuRD7ph.js";
// src/api/admin/syncPlay.ts
var t = class {
	constructor(t) {
		e(this, "client", void 0), this.client = t;
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
export { t };

//# sourceMappingURL=syncPlay-CSAwWvX1.js.map