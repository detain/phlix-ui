import { computed as e, inject as t } from "vue";
//#region src/api/media-query.ts
function n(e = {}) {
	let t = new URLSearchParams();
	return e.libraryId && t.set("libraryId", e.libraryId), e.parentId && t.set("parentId", e.parentId), e.topLevel && t.set("topLevel", "1"), e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.match && t.set("match", e.match), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function r(e, t = {}) {
	return `${e}/api/v1/media?${n(t)}`;
}
//#endregion
//#region src/composables/useApiBase.ts
function i(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function a() {
	let n = t("apiBase", "");
	return e(() => i(n));
}
function o() {
	let n = t("mediaApiBase", void 0), r = t("apiBase", "");
	return e(() => i(n) || i(r));
}
//#endregion
export { r as i, o as n, n as r, a as t };

//# sourceMappingURL=useApiBase-CSECk0g8.js.map