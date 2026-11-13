import { S as e, T as t, t as n } from "./client-COpJNbI3.js";
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
async function u(e, t) {
	let r = await new n({ baseUrl: e }).get("/api/v1/libraries", void 0, t);
	return l(Array.isArray(r.libraries) ? r.libraries : []);
}
// src/stores/useLibrariesStore.ts
var d = i("libraries", () => {
	let n = r([]), i = r(!1), a = r(!1), o = r(null), s = r(null), c = null;
	async function l(r, l = !1) {
		if (!a.value || l) return c || (i.value = !0, o.value = null, s.value = null, c = (async () => {
			try {
				n.value = await u(r), a.value = !0;
			} catch (n) {
				o.value = t(n, "Failed to load libraries"), s.value = n instanceof e && n.body && typeof n.body == "object" && "code" in n.body && String(n.body.code ?? "") || null;
			} finally {
				i.value = !1, c = null;
			}
		})(), c);
	}
	function d(e) {
		return n.value.find((t) => t.id === e);
	}
	return {
		items: n,
		loading: i,
		loaded: a,
		error: o,
		errorCode: s,
		load: l,
		byId: d
	};
});
export { c as a, a as i, u as n, s as o, l as r, d as t };

//# sourceMappingURL=useLibrariesStore-CxK7xetr.js.map