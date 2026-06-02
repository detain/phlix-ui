//#region src/api/admin/history.ts
var e = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getRecentlyWatched() {
		let { items: e } = await this.client.get("/api/v1/users/me/recently-watched");
		return Array.isArray(e) ? e : [];
	}
	async removeFromHistory(e) {
		return this.client.delete(`/api/v1/users/me/history/${encodeURIComponent(e)}`);
	}
	async clearHistory() {
		return this.client.delete("/api/v1/users/me/history");
	}
};
//#endregion
export { e as t };

//# sourceMappingURL=history-ByCY8OYj.js.map