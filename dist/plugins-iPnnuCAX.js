import { s as e } from "./Button-9cUUJmnN.js";
//#region src/api/admin/plugins.ts
var t = "***";
function n(t) {
	if (!(t instanceof e)) return null;
	let n = t.body;
	if (n && typeof n == "object") {
		let e = n.code;
		if (typeof e == "string") return e;
	}
	return null;
}
function r(t) {
	if (!(t instanceof e)) return {};
	let n = t.body;
	if (n && typeof n == "object") {
		let e = n.errors;
		if (e && typeof e == "object") {
			let t = {};
			for (let [n, r] of Object.entries(e)) t[n] = typeof r == "string" ? r : String(r);
			return t;
		}
	}
	return {};
}
var i = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { plugins: e } = await this.client.get("/api/v1/admin/plugins");
		return Array.isArray(e) ? e : [];
	}
	async get(e) {
		let { plugin: t } = await this.client.get(`/api/v1/admin/plugins/${encodeURIComponent(e)}`);
		return {
			...t,
			settings_schema: t && typeof t.settings_schema == "object" && t.settings_schema !== null ? t.settings_schema : {},
			settings: t && typeof t.settings == "object" && t.settings !== null ? t.settings : {}
		};
	}
	install(e) {
		return this.client.post("/api/v1/admin/plugins/install", { url: e });
	}
	enable(e) {
		return this.client.post(`/api/v1/admin/plugins/${encodeURIComponent(e)}/enable`);
	}
	disable(e) {
		return this.client.post(`/api/v1/admin/plugins/${encodeURIComponent(e)}/disable`);
	}
	uninstall(e) {
		return this.client.delete(`/api/v1/admin/plugins/${encodeURIComponent(e)}`);
	}
	async updateSettings(e, t) {
		let { plugin: n } = await this.client.put(`/api/v1/admin/plugins/${encodeURIComponent(e)}/settings`, { settings: t });
		return {
			...n,
			settings_schema: n && typeof n.settings_schema == "object" && n.settings_schema !== null ? n.settings_schema : {},
			settings: n && typeof n.settings == "object" && n.settings !== null ? n.settings : {}
		};
	}
};
//#endregion
export { r as i, t as n, n as r, i as t };

//# sourceMappingURL=plugins-iPnnuCAX.js.map