//#region src/api/admin/collections.ts
var e = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { collections: e } = await this.client.get("/api/v1/collections");
		return Array.isArray(e) ? e : [];
	}
	async get(e) {
		let t = await this.client.get(`/api/v1/collections/${encodeURIComponent(e)}`);
		return {
			collection: t.collection,
			items: Array.isArray(t.items) ? t.items : []
		};
	}
	create(e) {
		return this.client.post("/api/v1/collections", e);
	}
	update(e, t) {
		return this.client.put(`/api/v1/collections/${encodeURIComponent(e)}`, t);
	}
	remove(e) {
		return this.client.delete(`/api/v1/collections/${encodeURIComponent(e)}`);
	}
	addItem(e, t) {
		return this.client.post(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	removeItem(e, t) {
		return this.client.delete(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	bulkAdd(e, t) {
		return this.client.post(`/api/v1/collections/${encodeURIComponent(e)}/bulk-add`, { query: t });
	}
	refresh(e) {
		return this.client.post(`/api/v1/collections/${encodeURIComponent(e)}/refresh`);
	}
};
//#endregion
export { e as t };

//# sourceMappingURL=collections-CH3HLdcd.js.map