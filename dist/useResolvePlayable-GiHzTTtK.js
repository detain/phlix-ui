import { n as e } from "./episode-order-DHMxnH-X.js";
import { t } from "./useSeriesSeasons-LD7RRPM9.js";
//#region src/composables/useResolvePlayable.ts
function n(e, t) {
	return (e[t] ?? 0) > 0;
}
function r(t, r) {
	let i = e(t.flatMap((e) => e.episodes));
	return i.length === 0 ? null : i.find((e) => n(r, e.id)) ?? i[0];
}
async function i(e, n, i, a, o) {
	return i.type === "series" || i.type === "season" ? r(await t(e, n, i.id, o), a) : i;
}
//#endregion
export { i as t };

//# sourceMappingURL=useResolvePlayable-GiHzTTtK.js.map