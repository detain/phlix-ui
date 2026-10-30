var e = /* @__PURE__ */ new Map();
function t(t) {
	return e.get(t);
}
function n(e, t = Date.now()) {
	return e !== void 0 && t - e.ts < 6e4;
}
function r(t, n, r = Date.now()) {
	e.set(t, {
		item: n,
		ts: r
	});
}
export { t as n, n as r, r as t };

//# sourceMappingURL=useMediaItemCache-B7dWHUPS.js.map