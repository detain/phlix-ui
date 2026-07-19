//#region src/utils/safeRedirect.ts
function e(e) {
	return typeof e != "string" || e === "" || e.startsWith("//") || e.startsWith("/\\") || !e.startsWith("/app/") ? null : e;
}
//#endregion
export { e as t };

//# sourceMappingURL=safeRedirect-D84sb04M.js.map