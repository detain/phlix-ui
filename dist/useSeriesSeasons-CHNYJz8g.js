import { a as e } from "./useApiBase-DHZp4E4v.js";
import { i as t, r as n } from "./series-grouping-BTZK8Agh.js";
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
	if (t(s)) {
		c = s.filter((e) => e.type === "season");
		let t = await Promise.all(c.map((t) => i(e, r, t.id, o).catch(() => [])));
		s = [...s.filter((e) => e.type !== "season"), ...t.flat()];
	}
	return n(s, c);
}
//#endregion
export { a as t };

//# sourceMappingURL=useSeriesSeasons-CHNYJz8g.js.map