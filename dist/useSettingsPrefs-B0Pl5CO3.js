import { C as e } from "./client-57OweUrJ.js";
import { ref as t, watch as n } from "vue";
import { defineStore as r } from "pinia";
// src/api/admin/settings.ts
var i = "***", a = class {
	constructor(t) {
		e(this, "client", void 0), this.client = t;
	}
	async get() {
		let { data: e } = await this.client.get("/api/v1/admin/settings");
		return {
			settings: o(e?.settings) ? e.settings : {},
			overridden: Array.isArray(e?.overridden) ? e.overridden : [],
			types: o(e?.types) ? e.types : {},
			meta: o(e?.meta) ? e.meta : {},
			secretStatus: s(e?.secretStatus)
		};
	}
	async save(e) {
		let { data: t } = await this.client.put("/api/v1/admin/settings", { settings: e });
		return {
			settings: o(t?.settings) ? t.settings : {},
			overridden: Array.isArray(t?.overridden) ? t.overridden : []
		};
	}
	async restartServer() {
		let { data: e } = await this.client.post("/api/v1/admin/restart", {});
		return { message: e?.message ?? "Restart signal sent" };
	}
};
function o(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function s(e) {
	if (!o(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) o(r) && (t[n] = {
		set: r.set === !0,
		length: typeof r.length == "number" && Number.isFinite(r.length) ? r.length : 0
	});
	return t;
}
// src/stores/useSettingsPrefs.ts
var c = "phlix-settings-prefs", l = { advancedMode: !1 };
function u() {
	if (typeof localStorage > "u") return { ...l };
	try {
		let e = localStorage.getItem(c);
		if (!e) return { ...l };
		let t = JSON.parse(e);
		return {
			...l,
			...t
		};
	} catch {
		return { ...l };
	}
}
var d = r("phlix-settings-prefs", () => {
	let e = u(), r = t(e.advancedMode);
	function i(e) {
		r.value = e;
	}
	function a() {
		r.value = !r.value;
	}
	function o() {
		return { advancedMode: r.value };
	}
	return n(o, (e) => {
		if (typeof localStorage < "u") try {
			localStorage.setItem(c, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		advancedMode: r,
		setAdvancedMode: i,
		toggleAdvancedMode: a
	};
});
export { a as n, i as r, d as t };

//# sourceMappingURL=useSettingsPrefs-B0Pl5CO3.js.map