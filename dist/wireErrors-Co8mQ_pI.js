import { v as e, w as t, x as n, y as r } from "./client-DJuRD7ph.js";
// src/utils/wireErrors.ts
function i(e) {
	if (e instanceof n) {
		let t = e.body;
		if (typeof t == "object" && t && typeof t.code == "string") return t.code;
	}
	return null;
}
function a(t, n, i) {
	let a = r(t, i);
	return a === null ? n : {
		title: a,
		description: e(t, i)
	};
}
function o(r, a, o) {
	return r instanceof n ? e(i(r), o, a) : t(r, a);
}
export { a as n, o as r, i as t };

//# sourceMappingURL=wireErrors-Co8mQ_pI.js.map