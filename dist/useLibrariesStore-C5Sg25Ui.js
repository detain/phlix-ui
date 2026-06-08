import { c as e, n as t } from "./Button-BwQkyEkr.js";
import { t as n } from "./tokenStore-CGMYSpg6.js";
import { ref as r } from "vue";
import { defineStore as i } from "pinia";
//#region src/api/libraries.ts
function a(e) {
	return [...e].sort((e, t) => {
		let n = typeof e.display_order == "number" ? e.display_order : Infinity, r = typeof t.display_order == "number" ? t.display_order : Infinity;
		return n === r ? e.name.localeCompare(t.name, void 0, { sensitivity: "base" }) : n - r;
	});
}
async function o(e, r) {
	let i = await new t({
		baseUrl: e,
		tokenStore: typeof window < "u" ? new n() : void 0
	}).get("/api/v1/libraries", void 0, r);
	return a(Array.isArray(i.libraries) ? i.libraries : []);
}
//#endregion
//#region src/stores/useLibrariesStore.ts
var s = i("libraries", () => {
	let t = r([]), n = r(!1), i = r(!1), a = r(null), s = null;
	async function c(r, c = !1) {
		if (!(i.value && !c)) return s || (n.value = !0, a.value = null, s = (async () => {
			try {
				t.value = await o(r), i.value = !0;
			} catch (t) {
				a.value = e(t, "Failed to load libraries");
			} finally {
				n.value = !1, s = null;
			}
		})(), s);
	}
	function l(e) {
		return t.value.find((t) => t.id === e);
	}
	return {
		items: t,
		loading: n,
		loaded: i,
		error: a,
		load: c,
		byId: l
	};
});
//#endregion
export { o as n, a as r, s as t };

//# sourceMappingURL=useLibrariesStore-C5Sg25Ui.js.map