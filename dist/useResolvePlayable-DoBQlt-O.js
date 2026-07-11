import { n as e } from "./media-query-BdY2RILB.js";
import { a as t, n, o as r } from "./episode-order-C2yqgMeX.js";
//#region src/composables/useSeriesSeasons.ts
var i = 100;
async function a(t, n, r, a) {
	let o = e(n, {
		parentId: r,
		limit: i,
		sort: "name",
		order: "asc"
	});
	return (await t.get(o, void 0, a)).items ?? [];
}
async function o(e, n, i, o) {
	let s = await a(e, n, i, o), c;
	if (r(s)) {
		c = s.filter((e) => e.type === "season");
		let t = await Promise.all(c.map((t) => a(e, n, t.id, o).catch(() => [])));
		s = [...s.filter((e) => e.type !== "season"), ...t.flat()];
	}
	return t(s, c);
}
//#endregion
//#region src/composables/useResolvePlayable.ts
function s(e, t) {
	return (e[t] ?? 0) > 0;
}
function c(e, t) {
	let r = n(e.flatMap((e) => e.episodes));
	return r.length === 0 ? null : r.find((e) => s(t, e.id)) ?? r[0];
}
function l(e, t) {
	return c([e], t) ?? e.episodes[0] ?? null;
}
async function u(e, t, n, r, i) {
	return n.type === "series" || n.type === "season" ? c(await o(e, t, n.id, i), r) : n;
}
//#endregion
export { o as i, l as n, u as r, c as t };

//# sourceMappingURL=useResolvePlayable-DoBQlt-O.js.map