import { n as e } from "./Icon-ax5k7_G2.js";
import { Fragment as t, computed as n, createElementBlock as r, defineComponent as i, openBlock as a, ref as o, renderList as s, renderSlot as c, toDisplayString as l, watch as u } from "vue";
import { defineStore as d } from "pinia";
//#region src/stores/useCommandStore.ts
var f = "phlix.cmd.recents", p = 8;
function m(e, t) {
	let n = e.toLowerCase(), r = t.toLowerCase();
	if (n.length === 0) return 0;
	if (n.length > r.length) return -1;
	let i = 0, a = 0, o = -2, s = 0;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], c = -1;
		for (let e = a; e < r.length; e++) if (r[e] === t) {
			c = e;
			break;
		}
		if (c === -1) return -1;
		i += 1, c === o + 1 ? (s++, i += 5 + s * 2) : s = 0;
		let l = c === 0 ? "" : r[c - 1];
		if ((c === 0 || l === " " || l === "-" || l === "/" || l === ":") && (i += 8), o >= 0) {
			let e = c - o - 1;
			e > 0 && (i -= Math.min(e, 4));
		}
		o = c, a = c + 1;
	}
	return r.startsWith(n) && (i += 15), i;
}
function h(e, t) {
	if (!e.trim()) return 0;
	let n = m(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, m(e, n));
	return t.group && (r = Math.max(r, m(e, t.group))), r;
}
function g() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(f);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, p) : [];
	} catch {
		return [];
	}
}
var _ = d("phlix-commands", () => {
	let e = o(/* @__PURE__ */ new Map()), t = o(!1), r = o(""), i = o(g()), a = n(() => Array.from(e.value.values())), s = n(() => {
		let t = r.value.trim(), n = a.value;
		if (t) return n.map((e) => ({
			c: e,
			s: h(t, e)
		})).filter((e) => e.s >= 0).sort((e, t) => t.s - e.s || (e.c.priority ?? 0) - (t.c.priority ?? 0) || e.c.title.localeCompare(t.c.title)).map((e) => e.c);
		let o = i.value.map((t) => e.value.get(t)).filter((e) => !!e), s = new Set(o.map((e) => e.id)), c = n.filter((e) => !s.has(e.id)).sort((e, t) => (e.priority ?? 0) - (t.priority ?? 0) || e.title.localeCompare(t.title));
		return [...o, ...c];
	});
	function c(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.set(e.id, e);
		return e.value = r, () => l(n.map((e) => e.id));
	}
	function l(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.delete(e);
		e.value = r;
	}
	function d(e) {
		return i.value.includes(e);
	}
	function m(e) {
		i.value = [e, ...i.value.filter((t) => t !== e)].slice(0, p);
	}
	function _() {
		i.value = [];
	}
	function v(e) {
		r.value = e;
	}
	function y() {
		r.value = "", t.value = !0;
	}
	function b() {
		t.value = !1;
	}
	function x() {
		t.value ? b() : y();
	}
	async function S(t) {
		let n = e.value.get(t);
		n && (m(t), b(), await n.run());
	}
	return u(i, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(f, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		registry: e,
		open: t,
		query: r,
		recentIds: i,
		all: a,
		results: s,
		register: c,
		unregister: l,
		isRecent: d,
		pushRecent: m,
		clearRecents: _,
		setQuery: v,
		openPalette: y,
		closePalette: b,
		togglePalette: x,
		runId: S
	};
}), v = { class: "phlix-kbd" }, y = {
	key: 1,
	class: "phlix-kbd__key"
}, b = /*#__PURE__*/ e(/* @__PURE__ */ i({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let i = e, o = n(() => i.keys === void 0 ? [] : Array.isArray(i.keys) ? i.keys : [i.keys]);
		return (e, n) => (a(), r("span", v, [o.value.length ? (a(!0), r(t, { key: 0 }, s(o.value, (e, t) => (a(), r("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, l(e), 1))), 128)) : (a(), r("kbd", y, [c(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]);
//#endregion
export { _ as i, m as n, h as r, b as t };

//# sourceMappingURL=Kbd-CSMm1T0l.js.map