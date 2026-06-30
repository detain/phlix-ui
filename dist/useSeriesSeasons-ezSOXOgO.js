import { n as e } from "./media-query-C8oxSF4h.js";
import { n as t, r as n } from "./series-grouping-Bbs1zX87.js";
//#region src/composables/useSeriesSeasons.ts
var r = 100;
async function i(t, n, i, a) {
	let o = e(n, {
		parentId: i,
		limit: r,
		sort: "name",
		order: "asc"
	});
	return (await t.get(o, void 0, a)).items ?? [];
}
async function a(e, r, a, o) {
	let s = await i(e, r, a, o), c;
	if (n(s)) {
		c = s.filter((e) => e.type === "season");
		let t = await Promise.all(c.map((t) => i(e, r, t.id, o).catch(() => [])));
		s = [...s.filter((e) => e.type !== "season"), ...t.flat()];
	}
	return t(s, c);
}
//#endregion
export { a as t };

//# sourceMappingURL=useSeriesSeasons-ezSOXOgO.js.map