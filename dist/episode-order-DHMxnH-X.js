import { r as e } from "./series-grouping-BTZK8Agh.js";
//#region src/components/player/episode-order.ts
function t(t) {
	return e(t).filter((e) => !e.isSpecials).flatMap((e) => e.episodes);
}
function n(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n > 0 ? e[n - 1] : null;
}
function r(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n >= 0 && n < e.length - 1 ? e[n + 1] : null;
}
//#endregion
export { t as n, n as r, r as t };

//# sourceMappingURL=episode-order-DHMxnH-X.js.map