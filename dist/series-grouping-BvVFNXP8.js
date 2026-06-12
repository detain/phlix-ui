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
	let i = /* @__PURE__ */ new Map();
	for (let r of t(e)) {
		let e = n(r), t = i.get(e);
		t ? t.push(r) : i.set(e, [r]);
	}
	let a = [];
	return i.forEach((e, t) => {
		e.sort(r), a.push({
			key: t === null ? "specials" : `season-${t}`,
			seasonNumber: t,
			label: t === null ? "Specials" : `Season ${t}`,
			isSpecials: t === null,
			episodes: e
		});
	}), a.sort((e, t) => e.seasonNumber === null ? 1 : t.seasonNumber === null ? -1 : e.seasonNumber - t.seasonNumber), a;
}
function a(e) {
	return e.some((e) => e.type === "season");
}
function o(e) {
	for (let t of e) if (t.episodes.length) return t.episodes[0];
	return null;
}
//#endregion
export { i as n, a as r, o as t };

//# sourceMappingURL=series-grouping-BvVFNXP8.js.map