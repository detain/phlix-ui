import { c as e, f as t, l as n, t as r } from "./client-D7B7SMZj.js";
import { ref as i } from "vue";
import { defineStore as a } from "pinia";
//#region src/utils/sortTitle.ts
var o = [
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
function s(e) {
	return e.replace(/^ +/, "").replace(/ +$/, "");
}
function c(e) {
	for (let t of o) {
		let n = `${t} `;
		if (e.length >= n.length && e.slice(0, n.length).toLowerCase() === n) return s(e.slice(n.length));
	}
	return s(e);
}
function l(e, t) {
	return c(e).localeCompare(c(t), void 0, { sensitivity: "base" });
}
//#endregion
//#region src/api/libraries.ts
function u(e) {
	return [...e].sort((e, t) => {
		let n = typeof e.display_order == "number" ? e.display_order : Infinity, r = typeof t.display_order == "number" ? t.display_order : Infinity;
		return n === r ? l(e.name, t.name) : n - r;
	});
}
async function d(t, n) {
	let i = await new r({
		baseUrl: t,
		tokenStore: typeof window < "u" ? new e() : void 0
	}).get("/api/v1/libraries", void 0, n);
	return u(Array.isArray(i.libraries) ? i.libraries : []);
}
//#endregion
//#region src/stores/useLibrariesStore.ts
var f = a("libraries", () => {
	let e = i([]), r = i(!1), a = i(!1), o = i(null), s = i(null), c = null;
	async function l(i, l = !1) {
		if (!(a.value && !l)) return c || (r.value = !0, o.value = null, s.value = null, c = (async () => {
			try {
				e.value = await d(i), a.value = !0;
			} catch (e) {
				o.value = t(e, "Failed to load libraries"), s.value = e instanceof n && e.body && typeof e.body == "object" && "code" in e.body && String(e.body.code ?? "") || null;
			} finally {
				r.value = !1, c = null;
			}
		})(), c);
	}
	function u(t) {
		return e.value.find((e) => e.id === t);
	}
	return {
		items: e,
		loading: r,
		loaded: a,
		error: o,
		errorCode: s,
		load: l,
		byId: u
	};
});
//#endregion
export { l as a, o as i, d as n, c as o, u as r, f as t };

//# sourceMappingURL=useLibrariesStore-mabc4pZx.js.map