//#region src/components/series-grouping.ts
function e(e) {
	return e.type === "series" || e.type === "season";
}
function t(t) {
	return t.filter((t) => !e(t) && (t.type === "episode" || (t.episode_number ?? null) !== null));
}
function n(e) {
	let t = e.season_number;
	return typeof t == "number" && t > 0 ? t : null;
}
function r(e, t) {
	let n = typeof e.episode_number == "number" ? e.episode_number : Infinity, r = typeof t.episode_number == "number" ? t.episode_number : Infinity;
	return n === r ? (e.episode_title ?? e.name).localeCompare(t.episode_title ?? t.name) : n - r;
}
function i(e) {
	let t = /* @__PURE__ */ new Map();
	for (let r of e) {
		if (r.type !== "season") continue;
		let e = n(r);
		t.has(e) || t.set(e, r);
	}
	return t;
}
function a(e, a) {
	let o = /* @__PURE__ */ new Map();
	for (let r of t(e)) {
		let e = n(r), t = o.get(e);
		t ? t.push(r) : o.set(e, [r]);
	}
	let s = i(a ?? e), c = [];
	return o.forEach((e, t) => {
		e.sort(r);
		let n = s.get(t) ?? null;
		c.push({
			key: t === null ? "specials" : `season-${t}`,
			seasonNumber: t,
			label: t === null ? "Specials" : `Season ${t}`,
			isSpecials: t === null,
			episodes: e,
			seasonPoster: n?.poster_url ?? null,
			seasonItem: n
		});
	}), c.sort((e, t) => e.seasonNumber === null ? 1 : t.seasonNumber === null ? -1 : e.seasonNumber - t.seasonNumber), c;
}
function o(e) {
	return e.some((e) => e.type === "season");
}
function s(e) {
	return String(e.seasonNumber ?? 0);
}
function c(e, t) {
	let n = typeof t == "number" ? t : Number.parseInt(String(t ?? ""), 10), r = Number.isFinite(n) && n > 0 ? n : null;
	return e.find((e) => e.seasonNumber === r) ?? null;
}
//#endregion
export { s as i, a as n, o as r, c as t };

//# sourceMappingURL=series-grouping-Bbs1zX87.js.map