import { t as e, v as t, x as n } from "./client-57OweUrJ.js";
import { ref as r } from "vue";
import { defineStore as i } from "pinia";
// src/utils/sortTitle.ts
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
// src/api/libraries.ts
function l(e) {
	return [...e].sort((e, t) => {
		let n = typeof e.display_order == "number" ? e.display_order : Infinity, r = typeof t.display_order == "number" ? t.display_order : Infinity;
		return n === r ? c(e.name, t.name) : n - r;
	});
}
async function u(t, n) {
	let r = await new e({ baseUrl: t }).get("/api/v1/libraries", void 0, n);
	return l(Array.isArray(r.libraries) ? r.libraries : []);
}
// src/stores/useLibrariesStore.ts
var d = i("libraries", () => {
	let e = r([]), i = r(!1), a = r(!1), o = r(null), s = r(null), c = null;
	async function l(r, l = !1) {
		if (!a.value || l) return c || (i.value = !0, o.value = null, s.value = null, c = (async () => {
			try {
				e.value = await u(r), a.value = !0;
			} catch (e) {
				o.value = n(e, "Failed to load libraries"), s.value = e instanceof t && e.body && typeof e.body == "object" && "code" in e.body && String(e.body.code ?? "") || null;
			} finally {
				i.value = !1, c = null;
			}
		})(), c);
	}
	function d(t) {
		return e.value.find((e) => e.id === t);
	}
	return {
		items: e,
		loading: i,
		loaded: a,
		error: o,
		errorCode: s,
		load: l,
		byId: d
	};
});
export { c as a, a as i, u as n, s as o, l as r, d as t };

//# sourceMappingURL=useLibrariesStore-B1SK5f5y.js.map