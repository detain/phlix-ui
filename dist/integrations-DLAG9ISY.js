//#region src/api/admin/integrations.ts
var e = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getSyncStatus() {
		return this.client.get("/api/v1/admin/sync/status");
	}
	async triggerSync() {
		return this.client.post("/api/v1/admin/sync/trash-guides");
	}
	async setSyncEnabled(e) {
		return this.client.put("/api/v1/admin/sync/enable", { enabled: e });
	}
	async listProviders() {
		let { providers: e } = await this.client.get("/api/v1/admin/auth-providers");
		return Array.isArray(e) ? e : [];
	}
	async enableProvider(e) {
		return this.client.post(`/api/v1/admin/auth-providers/${encodeURIComponent(e)}/enable`);
	}
	async disableProvider(e) {
		return this.client.post(`/api/v1/admin/auth-providers/${encodeURIComponent(e)}/disable`);
	}
	async getOidcSettings() {
		return this.client.get("/api/v1/admin/auth-providers/oidc/config");
	}
	async saveOidcSettings(e) {
		return this.client.post("/api/v1/admin/auth-providers/oidc/config", e);
	}
	async getOidcSchema() {
		return this.client.get("/api/v1/admin/auth-providers/oidc/schema");
	}
	async getLdapSettings() {
		return this.client.get("/api/v1/admin/auth-providers/ldap/config");
	}
	async saveLdapSettings(e) {
		return this.client.post("/api/v1/admin/auth-providers/ldap/config", e);
	}
	async testLdapConnection(e) {
		return this.client.post("/api/v1/admin/auth-providers/ldap/test", e);
	}
	async getLdapSchema() {
		return this.client.get("/api/v1/admin/auth-providers/ldap/schema");
	}
};
//#endregion
export { e as t };

//# sourceMappingURL=integrations-DLAG9ISY.js.map