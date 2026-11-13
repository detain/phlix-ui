import { S as e, T as t, b as n, y as r } from "./client-COpJNbI3.js";
// src/utils/wireErrors.ts
function i(t) {
	if (t instanceof e) {
		let e = t.body;
		if (typeof e == "object" && e && typeof e.code == "string") return e.code;
	}
	return null;
}
function a(e, t, i) {
	let a = n(e, i);
	return a === null ? t : {
		title: a,
		description: r(e, i)
	};
}
function o(n, a, o) {
	return n instanceof e ? r(i(n), o, a) : t(n, a);
}
export { a as n, o as r, i as t };

//# sourceMappingURL=wireErrors-BZdTOV2b.js.map