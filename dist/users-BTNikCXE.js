import { o as e } from "./client-fw74f3l_.js";
//#region src/api/admin/users.ts
function t(t) {
	return {
		...t,
		is_admin: e(t.is_admin)
	};
}
var n = {
	0: "G — General Audiences",
	1: "PG — Parental Guidance",
	2: "PG-13 — Parents Strongly Cautioned",
	3: "R — Restricted",
	4: "NC-17 — No One 17 & Under",
	5: "X — Adult",
	6: "UNRATED — Unrated Content"
}, r = Object.entries(n).map(([e, t]) => ({
	value: Number(e),
	label: t
})), i = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list(e) {
		let n = e?.status ? `?status=${encodeURIComponent(e.status)}` : "", { users: r } = await this.client.get(`/api/v1/admin/users${n}`);
		return Array.isArray(r) ? r.map(t) : [];
	}
	approve(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/approve`);
	}
	disable(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/disable`);
	}
	reject(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/reject`);
	}
	async get(e) {
		let { user: n } = await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}`);
		return t(n);
	}
	create(e) {
		return this.client.post("/api/v1/admin/users", e);
	}
	update(e, t) {
		return this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}`, t);
	}
	remove(e) {
		return this.client.delete(`/api/v1/admin/users/${encodeURIComponent(e)}`);
	}
	setAdmin(e, t) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/set-admin`, { is_admin: t });
	}
	resetPassword(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/reset-password`);
	}
	async listProfiles(e) {
		let { profiles: t } = await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}/profiles`);
		return Array.isArray(t) ? t : [];
	}
	createProfile(e, t) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/profiles`, t);
	}
	updateProfile(e, t) {
		return this.client.put(`/api/v1/admin/profiles/${encodeURIComponent(e)}`, t);
	}
	removeProfile(e) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}`);
	}
	setPin(e, t) {
		return this.client.post(`/api/v1/admin/profiles/${encodeURIComponent(e)}/pin`, { pin: t });
	}
	clearPin(e) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}/pin`);
	}
};
//#endregion
export { n, r, i as t };

//# sourceMappingURL=users-BTNikCXE.js.map