import { computed as e, inject as t } from "vue";
//#region src/composables/useApiBase.ts
function n(e) {
	return typeof e == "string" ? e : e?.value ?? "";
}
function r() {
	let r = t("apiBase", "");
	return e(() => n(r));
}
function i() {
	let r = t("mediaApiBase", void 0), i = t("apiBase", "");
	return e(() => n(r) || n(i));
}
function a() {
	let r = t("mediaDirectBase", void 0);
	return e(() => n(r));
}
//#endregion
export { i as n, a as r, r as t };

//# sourceMappingURL=useApiBase-CV_r-Kk4.js.map