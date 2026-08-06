import { n as e } from "./useApiBase-CV_r-Kk4.js";
//#region src/utils/imageSrc.ts
function t(e) {
	return e.length > 1 && e[0] === "/" && e[1] !== "/" && e[1] !== "\\";
}
function n(e, n) {
	if (typeof n != "string" || n === "" || !t(n)) return n;
	let r = e.replace(/\/+$/, "");
	return r === "" ? n : r + n;
}
function r(e, t) {
	if (typeof t != "string" || t.trim() === "") return t;
	let r = [];
	for (let i of t.split(",")) {
		let t = i.trim();
		if (t === "") continue;
		let a = t.search(/\s/), o = a === -1 ? t : t.slice(0, a), s = a === -1 ? "" : t.slice(a);
		r.push(String(n(e, o)) + s);
	}
	return r.length > 0 ? r.join(", ") : t;
}
//#endregion
//#region src/composables/useImageSrc.ts
function i() {
	let t = e();
	return {
		imgSrc: (e) => n(t.value, e),
		imgSrcset: (e) => r(t.value, e)
	};
}
//#endregion
export { r as i, t as n, n as r, i as t };

//# sourceMappingURL=useImageSrc-KnN1T9Ga.js.map