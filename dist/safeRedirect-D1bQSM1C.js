// src/utils/safeRedirect.ts
function e(e) {
	return typeof e != "string" || e === "" || e.startsWith("//") || e.startsWith("/\\") || !e.startsWith("/app/") ? null : e;
}
export { e as t };

//# sourceMappingURL=safeRedirect-D1bQSM1C.js.map