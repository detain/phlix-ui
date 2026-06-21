import { d as e, n as t, s as n } from "./Button-5ZSsUmsI.js";
import { ref as r } from "vue";
import { defineStore as i } from "pinia";
//#region src/utils/sortTitle.ts
var a = [
	"the",
	"a",
	"an",
	"el",
	"la",
	"le",
	"les",
	"los",
	"las",
	"die",
	"der",
	"das"
];
function o(e) {
	return e.replace(/^ +/, "").replace(/ +$/, "");
}
function s(e) {
	for (let t of a) {
		let n = `${t} `;
		if (e.length >= n.length && e.slice(0, n.length).toLowerCase() === n) return o(e.slice(n.length));
	}
	return o(e);
}
function c(e, t) {
	return s(e).localeCompare(s(t), void 0, { sensitivity: "base" });
}
//#endregion
//#region src/api/libraries.ts
function l(e) {
	return [...e].sort((e, t) => {
		let n = typeof e.display_order == "number" ? e.display_order : Infinity, r = typeof t.display_order == "number" ? t.display_order : Infinity;
		return n === r ? c(e.name, t.name) : n - r;
	});
}
async function u(e, r) {
	let i = await new t({
		baseUrl: e,
		tokenStore: typeof window < "u" ? new n() : void 0
	}).get("/api/v1/libraries", void 0, r);
	return l(Array.isArray(i.libraries) ? i.libraries : []);
}
//#endregion
//#region src/stores/useLibrariesStore.ts
var d = i("libraries", () => {
	let t = r([]), n = r(!1), i = r(!1), a = r(null), o = null;
	async function s(r, s = !1) {
		if (!(i.value && !s)) return o || (n.value = !0, a.value = null, o = (async () => {
			try {
				t.value = await u(r), i.value = !0;
			} catch (t) {
				a.value = e(t, "Failed to load libraries");
			} finally {
				n.value = !1, o = null;
			}
		})(), o);
	}
	function c(e) {
		return t.value.find((t) => t.id === e);
	}
	return {
		items: t,
		loading: n,
		loaded: i,
		error: a,
		load: s,
		byId: c
	};
});
//#endregion
export { c as a, a as i, u as n, s as o, l as r, d as t };

//# sourceMappingURL=useLibrariesStore-CsoGNIah.js.map