//#region src/utils/safeHref.ts
function e(e) {
	let t = e.replace(/[\x00-\x20]/g, "");
	return /^(javascript|data|vbscript):/i.test(t) ? void 0 : e;
}
//#endregion
export { e as t };

//# sourceMappingURL=safeHref-C9H0Sqte.js.map