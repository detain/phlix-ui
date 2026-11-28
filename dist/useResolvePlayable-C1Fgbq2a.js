import { a as e, n as t, o as n } from "./episode-order-DBEVgrOE.js";
import { n as r } from "./media-query-D7hrCu8r.js";
// src/composables/useSeriesSeasons.ts
var i = 100;
async function a(e, t, n, a) {
	let o = r(t, {
		parentId: n,
		limit: i,
		sort: "name",
		order: "asc"
	});
	return (await e.get(o, void 0, a)).items ?? [];
}
async function o(t, r, i, o) {
	let s = await a(t, r, i, o), c;
	if (n(s)) {
		c = s.filter((e) => e.type === "season");
		let e = await Promise.all(c.map((e) => a(t, r, e.id, o).catch(() => [])));
		s = [...s.filter((e) => e.type !== "season"), ...e.flat()];
	}
	return e(s, c);
}
// src/composables/useResolvePlayable.ts
function s(e, t) {
	return (e[t] ?? 0) > 0;
}
function c(e, n) {
	let r = t(e.flatMap((e) => e.episodes)), i = r.find((e) => s(n, e.id));
	if (i) return i;
	for (let t of e) {
		if (!t.isSpecials) continue;
		let e = t.episodes.find((e) => s(n, e.id));
		if (e) return e;
	}
	return r[0] ?? null;
}
function l(e, t) {
	return c([e], t) ?? e.episodes[0] ?? null;
}
async function u(e, t, n, r, i) {
	return n.type === "series" || n.type === "season" ? c(await o(e, t, n.id, i), r) : n;
}
export { o as i, l as n, u as r, c as t };

//# sourceMappingURL=useResolvePlayable-C1Fgbq2a.js.map