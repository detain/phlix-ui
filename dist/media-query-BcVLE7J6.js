//#region src/api/media-query.ts
function e(e = {}) {
	let t = new URLSearchParams();
	return e.libraryId && t.set("libraryId", e.libraryId), e.parentId && t.set("parentId", e.parentId), e.topLevel && t.set("topLevel", "1"), e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function t(t, n = {}) {
	return `${t}/api/v1/media?${e(n)}`;
}
//#endregion
export { t as n, e as t };

//# sourceMappingURL=media-query-BcVLE7J6.js.map