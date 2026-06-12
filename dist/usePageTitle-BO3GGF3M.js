import { onScopeDispose as e, watch as t } from "vue";
//#region src/composables/usePageTitle.ts
var n = " · ", r = "Phlix", i = r;
function a(e) {
	i = e && e.trim() ? e.trim() : r;
}
function o(e) {
	let t = typeof e == "string" ? e.trim() : "";
	return t ? `${t}${n}${i}` : i;
}
function s(e) {
	typeof document > "u" || (document.title = o(e));
}
function c(n) {
	t(typeof n == "function" ? n : () => n.value, (e) => {
		let t = typeof e == "string" ? e.trim() : "";
		t && s(t);
	}, { immediate: !0 }), e(() => {});
}
//#endregion
export { c as i, a as n, s as r, o as t };

//# sourceMappingURL=usePageTitle-BO3GGF3M.js.map