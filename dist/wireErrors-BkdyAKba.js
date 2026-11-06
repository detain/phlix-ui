import { g as e, h as t, v as n, x as r } from "./client-BLNUsFSj.js";
// src/utils/wireErrors.ts
function i(e) {
	if (e instanceof n) {
		let t = e.body;
		if (typeof t == "object" && t && typeof t.code == "string") return t.code;
	}
	return null;
}
function a(n, r, i) {
	let a = e(n, i);
	return a === null ? r : {
		title: a,
		description: t(n, i)
	};
}
function o(e, a, o) {
	return e instanceof n ? t(i(e), o, a) : r(e, a);
}
export { a as n, o as r, i as t };

//# sourceMappingURL=wireErrors-BkdyAKba.js.map