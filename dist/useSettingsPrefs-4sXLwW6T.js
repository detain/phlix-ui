import { ref as e, watch as t } from "vue";
import { defineStore as n } from "pinia";
//#region src/api/admin/settings.ts
var r = "***", i = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async get() {
		let { data: e } = await this.client.get("/api/v1/admin/settings");
		return {
			settings: a(e?.settings) ? e.settings : {},
			overridden: Array.isArray(e?.overridden) ? e.overridden : [],
			types: a(e?.types) ? e.types : {},
			meta: a(e?.meta) ? e.meta : {},
			secretStatus: o(e?.secretStatus)
		};
	}
	async save(e) {
		let { data: t } = await this.client.put("/api/v1/admin/settings", { settings: e });
		return {
			settings: a(t?.settings) ? t.settings : {},
			overridden: Array.isArray(t?.overridden) ? t.overridden : []
		};
	}
	async restartServer() {
		let { data: e } = await this.client.post("/api/v1/admin/restart", {});
		return { message: e?.message ?? "Restart signal sent" };
	}
};
function a(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function o(e) {
	if (!a(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) a(r) && (t[n] = {
		set: r.set === !0,
		length: typeof r.length == "number" && Number.isFinite(r.length) ? r.length : 0
	});
	return t;
}
//#endregion
//#region src/stores/useSettingsPrefs.ts
var s = "phlix-settings-prefs", c = { advancedMode: !1 };
function l() {
	if (typeof localStorage > "u") return { ...c };
	try {
		let e = localStorage.getItem(s);
		if (!e) return { ...c };
		let t = JSON.parse(e);
		return {
			...c,
			...t
		};
	} catch {
		return { ...c };
	}
}
var u = n("phlix-settings-prefs", () => {
	let n = e(l().advancedMode);
	function r(e) {
		n.value = e;
	}
	function i() {
		n.value = !n.value;
	}
	function a() {
		return { advancedMode: n.value };
	}
	return t(a, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(s, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		advancedMode: n,
		setAdvancedMode: r,
		toggleAdvancedMode: i
	};
});
//#endregion
export { i as n, r, u as t };

//# sourceMappingURL=useSettingsPrefs-4sXLwW6T.js.map