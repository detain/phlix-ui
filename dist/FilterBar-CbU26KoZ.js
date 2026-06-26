import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-DkTu9l9P.js";
import { t as r } from "./useMessages-Dwm0lQlG.js";
import { n as i, p as a } from "./Button-MsRePfWv.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as s } from "./Chip-2HcSZF4a.js";
import { n as c, r as l, t as u } from "./listbox-htyKA_G5.js";
import { t as d } from "./Select-DLwgQInL.js";
import { n as f } from "./MetadataMatchModal-HXVG4hcc.js";
import { a as p, i as m } from "./useApiBase-DhSHB6Qp.js";
import { Fragment as h, Transition as g, computed as _, createBlock as v, createCommentVNode as y, createElementBlock as b, createElementVNode as x, createTextVNode as S, createVNode as C, defineComponent as w, nextTick as T, normalizeClass as E, normalizeStyle as D, onBeforeUnmount as ee, onMounted as O, openBlock as k, ref as A, renderList as j, renderSlot as M, toDisplayString as N, unref as P, useId as F, vModelText as I, vShow as L, watch as R, withCtx as z, withDirectives as B, withKeys as V, withModifiers as H } from "vue";
import { defineStore as U } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var W = { class: "phlix-combobox__field" }, te = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], G = ["id", "aria-label"], ne = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], re = { class: "phlix-combobox__check" }, K = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, q = /*#__PURE__*/ e(/* @__PURE__ */ w({
	__name: "Combobox",
	props: {
		modelValue: {},
		options: {},
		placeholder: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: n }) {
		let i = e, { t: a } = r(), o = n, s = _(() => l(i.options)), d = F(), f = A(!1), p = A(-1), m = A(""), g = A(!1), w = A(null), D = A(null), O = A(null), M = _(() => s.value.find((e) => e.value === i.modelValue)?.label ?? ""), I = _(() => {
			if (!g.value || m.value.trim() === "") return s.value;
			let e = m.value.toLowerCase();
			return s.value.filter((t) => t.label.toLowerCase().includes(e));
		}), z = _(() => p.value >= 0 ? `${d}-opt-${p.value}` : void 0);
		R(() => i.modelValue, () => {
			f.value || (m.value = M.value);
		}, { immediate: !0 });
		function V() {
			i.disabled || f.value || (f.value = !0, p.value = I.value.findIndex((e) => e.value === i.modelValue), p.value < 0 && (p.value = I.value.findIndex((e) => !e.disabled)), T(J));
		}
		function H() {
			m.value = M.value, g.value = !1, f.value = !1;
		}
		function U(e) {
			let t = I.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), m.value = t.label, g.value = !1, f.value = !1, D.value?.focus());
		}
		function q(e) {
			I.value.length !== 0 && (p.value = c(I.value, p.value, e), T(J));
		}
		function J() {
			O.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function Y(e) {
			m.value = e.target.value, g.value = !0, f.value = !0, p.value = u(I.value, "first");
		}
		function ie(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), f.value ? q(1) : V();
					break;
				case "ArrowUp":
					e.preventDefault(), f.value ? q(-1) : V();
					break;
				case "Enter":
					f.value && p.value >= 0 && (e.preventDefault(), U(p.value));
					break;
				case "Escape":
					f.value && (e.preventDefault(), H());
					break;
				case "Tab":
					f.value && H();
					break;
			}
		}
		function X(e) {
			f.value && w.value && !w.value.contains(e.target) && H();
		}
		return R(f, (e) => {
			e ? document.addEventListener("pointerdown", X, !0) : document.removeEventListener("pointerdown", X, !0);
		}), ee(() => document.removeEventListener("pointerdown", X, !0)), (n, r) => (k(), b("div", {
			ref_key: "rootEl",
			ref: w,
			class: E(["phlix-combobox", {
				"is-open": f.value,
				"is-disabled": e.disabled
			}])
		}, [x("div", W, [
			C(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			x("input", {
				ref_key: "inputEl",
				ref: D,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": f.value,
				"aria-controls": f.value ? `${P(d)}-list` : void 0,
				"aria-activedescendant": f.value ? z.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? P(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: m.value,
				onInput: Y,
				onFocus: V,
				onKeydown: ie
			}, null, 40, te),
			C(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), B(x("ul", {
			id: `${P(d)}-list`,
			ref_key: "listEl",
			ref: O,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(k(!0), b(h, null, j(I.value, (n, r) => (k(), b("li", {
			id: `${P(d)}-opt-${r}`,
			key: n.value,
			class: E(["phlix-combobox__option", {
				"is-active": r === p.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => U(r),
			onPointermove: (e) => !n.disabled && (p.value = r)
		}, [x("span", re, [n.value === e.modelValue ? (k(), v(t, {
			key: 0,
			name: "check"
		})) : y("", !0)]), S(" " + N(n.label), 1)], 42, ne))), 128)), I.value.length === 0 ? (k(), b("li", K, N(P(a)("common.noMatches")), 1)) : y("", !0)], 8, G), [[L, f.value]])], 2));
	}
}), [["__scopeId", "data-v-1f9bb8a7"]]), J = 3 / 2;
function Y(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function ie(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function X(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * J + t + n;
}
function ae(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function oe(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function se(e) {
	let { scrollTop: t, viewportHeight: n, rowHeight: r, columns: i, itemCount: a, overscan: o } = e, s = Math.max(1, i), c = Math.ceil(a / s), l = c * r;
	if (c === 0 || r <= 0) return {
		startRow: 0,
		endRow: c,
		startIndex: 0,
		endIndex: a,
		rowCount: c,
		padTop: 0,
		totalHeight: l
	};
	let u = Math.floor(Math.max(0, t) / r), d = Math.ceil(Math.max(0, n) / r) + 1, f = Math.max(0, u - o), p = Math.min(c, u + d + o);
	return {
		startRow: f,
		endRow: p,
		startIndex: f * s,
		endIndex: Math.min(a, p * s),
		rowCount: c,
		padTop: f * r,
		totalHeight: l
	};
}
//#endregion
//#region src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var ce = { class: "media-grid-root" }, Z = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, le = {
	key: 1,
	class: "skel-card",
	"aria-hidden": "true"
}, Q = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, $ = /*#__PURE__*/ e(/* @__PURE__ */ w({
	__name: "MediaGrid",
	props: {
		items: {},
		total: {},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingMore: {
			type: Boolean,
			default: !1
		},
		hasMore: {
			type: Boolean,
			default: !1
		},
		cardSize: {},
		skeletonCount: { default: 18 },
		overscan: { default: 2 },
		canMatch: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"load-more",
		"need-range",
		"play",
		"watchlist",
		"info",
		"match"
	],
	setup(e, { expose: r, emit: i }) {
		let a = e, o = i, s = n(), c = _(() => a.cardSize ?? s.cardSize ?? 180), l = A(null), u = A(null), d = A(0), p = A(0), m = A(0);
		function v() {
			let e = l.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (d.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (p.value = n), m.value = Math.max(0, -t.top);
		}
		let w = 0;
		function E() {
			w ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				w = 0, v();
			});
		}
		let N = _(() => Y(d.value, c.value, 20)), P = _(() => X(ie(d.value, N.value, 20))), F = _(() => d.value > 0 && P.value > 0), I = _(() => ae(a.items.length, a.total)), L = _(() => se({
			scrollTop: m.value,
			viewportHeight: p.value,
			rowHeight: P.value,
			columns: N.value,
			itemCount: I.value,
			overscan: a.overscan
		})), B = _(() => {
			if (!F.value) return a.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = L.value, n = [];
			for (let r = e; r < t; r++) n.push({
				item: a.items[r] ?? null,
				index: r
			});
			return n;
		});
		R(() => [
			L.value.endIndex,
			a.items.length,
			a.hasMore,
			a.loading,
			a.loadingMore
		], ([e, t, n, r, i]) => {
			F.value && oe(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && o("load-more");
		});
		let V;
		R(() => [
			F.value,
			L.value.startIndex,
			L.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(V), V = setTimeout(() => o("need-range", t, n), 120));
		}, { immediate: !0 });
		let H = _(() => ({ gridTemplateColumns: F.value ? `repeat(${N.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${c.value}px, 1fr))` })), U = _(() => F.value ? { height: `${L.value.totalHeight}px` } : {}), W = _(() => F.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${L.value.padTop}px)`
		} : {}), te = _(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${c.value}px, 1fr))` })), G = _(() => F.value && m.value > p.value * 1.5);
		function ne() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function re(e) {
			if (typeof window > "u" || !l.value) return;
			let t = Math.max(1, N.value), n = Math.floor(Math.max(0, e) / t) * P.value, r = window.scrollY + l.value.getBoundingClientRect().top;
			window.scrollTo?.({
				top: Math.max(0, r + n),
				behavior: "auto"
			});
		}
		r({ scrollToIndex: re });
		let K = null;
		function q() {
			K || typeof IntersectionObserver > "u" || (K = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && a.hasMore && !a.loading && !a.loadingMore && o("load-more");
			}, { rootMargin: "400px 0px" }), u.value && K.observe(u.value));
		}
		function J() {
			K?.disconnect(), K = null;
		}
		R(() => u.value, (e) => {
			J(), e && (q(), E());
		});
		let $ = null;
		function ue() {
			$ || typeof ResizeObserver > "u" || !l.value || ($ = new ResizeObserver(E), $.observe(l.value));
		}
		function de() {
			$?.disconnect(), $ = null;
		}
		return R(() => l.value, (e) => {
			de(), e && (ue(), E());
		}), O(() => {
			v(), typeof window < "u" && (window.addEventListener("scroll", v, { passive: !0 }), window.addEventListener("resize", E, { passive: !0 })), ue(), q();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", v), window.removeEventListener("resize", E)), w &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(w) : clearTimeout(w), 0), clearTimeout(V), de(), J();
		}), R(() => a.items.length, () => T(E)), (n, r) => (k(), b("div", ce, [e.loading && e.items.length === 0 ? (k(), b("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: D(te.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(k(!0), b(h, null, j(e.skeletonCount, (e) => (k(), b("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			x("div", { class: "skel-poster" }, null, -1),
			x("div", { class: "skel-title" }, null, -1),
			x("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (k(), b("div", Z, [M(n.$slots, "empty", {}, () => [
			C(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= x("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= x("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (k(), b(h, { key: 2 }, [
			x("div", {
				ref_key: "sizerEl",
				ref: l,
				class: "media-grid-sizer",
				style: D(U.value)
			}, [x("div", {
				class: "media-grid",
				style: D([H.value, W.value])
			}, [(k(!0), b(h, null, j(B.value, (t) => (k(), b(h, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? M(n.$slots, "card", {
				key: 0,
				item: t.item,
				index: t.index
			}, () => [C(f, {
				item: t.item,
				"can-match": e.canMatch,
				onPlay: (e) => o("play", t.item),
				onWatchlist: (e) => o("watchlist", t.item),
				onInfo: (e) => o("info", t.item),
				onMatch: (e) => o("match", t.item)
			}, null, 8, [
				"item",
				"can-match",
				"onPlay",
				"onWatchlist",
				"onInfo",
				"onMatch"
			])], !0) : (k(), b("div", le, [...r[3] ||= [
				x("div", { class: "skel-poster" }, null, -1),
				x("div", { class: "skel-title" }, null, -1),
				x("div", { class: "skel-sub" }, null, -1)
			]]))], 64))), 128))], 4)], 4),
			e.loadingMore ? (k(), b("div", Q, [...r[4] ||= [x("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), S(" Loading more… ", -1)]])) : y("", !0),
			e.hasMore && !e.loadingMore ? (k(), b("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: u,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : y("", !0)
		], 64)), C(g, { name: "media-grid-fade" }, {
			default: z(() => [G.value ? (k(), b("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: ne
			}, [C(t, { name: "arrow-up" })])) : y("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-c12b3dd0"]]), ue = 6e4, de = 250;
function fe(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var pe = U("media", () => {
	let e = A([]), t = A(0), n = A(!1), r = A(null), o = A(""), s = A([]), c = A(void 0), l = A(void 0), u = A([]), d = A([]), f = A(""), h = A([]), g = A([]), v = A("name"), y = A("asc"), b = A(24), x = A(0), S = A(void 0), C = A(!1), w = _(() => e.value.length < t.value), T = _(() => {
		let e = {};
		return S.value && (e.libraryId = S.value), C.value && (e.topLevel = !0), o.value && (e.search = o.value), s.value.length && (e.genres = s.value), c.value !== void 0 && (e.yearFrom = c.value), l.value !== void 0 && (e.yearTo = l.value), u.value.length && (e.ratings = u.value), d.value.length && (e.types = d.value), f.value && (e.match = f.value), h.value.length && (e.actors = h.value), g.value.length && (e.companies = g.value), e.sort = v.value, e.order = y.value, e.limit = b.value, e.offset = x.value, e;
	}), E = _(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), D = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], ee = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function O(e, t) {
		return p(e, t);
	}
	function k(e) {
		return m(e);
	}
	let j = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), N = null, P = null, F, I = 0;
	function L(e) {
		return !!e && Date.now() - e.ts < ue;
	}
	function R(e, t, n, r) {
		r && (P && n !== N && P.abort(), N = n);
		let a = M.get(n);
		if (a) return r && (P = a.controller), a.promise;
		let o = new AbortController();
		r && (P = o);
		let s = new i({ baseUrl: e }).get(O(e, t), void 0, o.signal).then((e) => (j.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			M.delete(n);
		});
		return M.set(n, {
			promise: s,
			controller: o
		}), s;
	}
	function z(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total, r || (I += 1);
	}
	function B(t, n) {
		if (n.length === 0) return;
		let r = e.value.slice();
		for (let e = 0; e < n.length; e++) r[t + e] = n[e];
		e.value = r;
	}
	async function V(n, r, i) {
		let a = Math.max(1, b.value), o = t.value > 0 ? t.value : Math.max(i, 1), s = Math.max(0, Math.floor(Math.max(0, r) / a) * a), c = Math.min(o - 1, Math.max(s, i - 1)), l = I, u = [];
		for (let r = s; r <= c; r += a) {
			if (e.value[r] !== void 0) continue;
			let i = {
				...T.value,
				offset: r
			}, a = k(i), o = j.get(a);
			if (L(o)) {
				l === I && B(r, o.items), t.value ||= o.total;
				continue;
			}
			u.push(R(n, i, a, !1).then((e) => {
				l === I && (B(r, e.items), t.value ||= e.total);
			}).catch(() => {}));
		}
		u.length && await Promise.all(u);
	}
	async function H(e, t = !1) {
		let i = { ...T.value }, o = k(i), s = j.get(o);
		if (L(s)) {
			z(s, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await R(e, i, o, !t);
			if (!t && o !== N) return;
			z(n, t);
		} catch (e) {
			if (fe(e)) return;
			(t || o === N) && (r.value = a(e, "Failed to load media"));
		} finally {
			(t || o === N) && (n.value = !1);
		}
	}
	function U(e, t = de) {
		x.value = 0, clearTimeout(F), F = setTimeout(() => H(e, !1), t);
	}
	async function W(t) {
		n.value || !w.value || (x.value = e.value.length, await H(t, !0));
	}
	async function te(e, t = {}) {
		let n = {
			...T.value,
			...t
		}, r = k(n);
		if (!L(j.get(r))) try {
			await R(e, n, r, !1);
		} catch {}
	}
	function G() {
		j.clear();
	}
	function ne() {
		clearTimeout(F);
	}
	function re() {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = [...s.value]), c.value !== void 0 && (e.yearFrom = String(c.value)), l.value !== void 0 && (e.yearTo = String(l.value)), u.value.length && (e.ratings = [...u.value]), d.value.length && (e.types = [...d.value]), f.value && (e.match = f.value), h.value.length && (e.actors = [...h.value]), g.value.length && (e.companies = [...g.value]), v.value !== "name" && (e.sort = v.value), y.value !== "asc" && (e.order = y.value), e;
	}
	function K(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function q(e) {
		o.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", s.value = K(e.genres), u.value = K(e.ratings), d.value = K(e.types);
		let t = Array.isArray(e.match) ? e.match[0] : e.match;
		f.value = t === "matched" || t === "unmatched" ? t : "", h.value = K(e.actors), g.value = K(e.companies);
		let n = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, r = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		c.value = n ? Number(n) : void 0, l.value = r ? Number(r) : void 0;
		let i = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		v.value = i ?? "name", y.value = a ?? "asc", x.value = 0;
	}
	function J() {
		e.value = [], t.value = 0, x.value = 0, r.value = null;
	}
	function Y(e) {
		o.value = e, x.value = 0;
	}
	function ie(e) {
		s.value = e, x.value = 0;
	}
	function X(e, t) {
		c.value = e, l.value = t, x.value = 0;
	}
	function ae(e) {
		u.value = e, x.value = 0;
	}
	function oe(e) {
		d.value = e, x.value = 0;
	}
	function se(e) {
		f.value = e, x.value = 0;
	}
	function ce(e) {
		h.value = e, x.value = 0;
	}
	function Z(e) {
		g.value = e, x.value = 0;
	}
	function le(e, t) {
		v.value = e, t && (y.value = t), x.value = 0;
	}
	function Q(e) {
		S.value !== e && (S.value = e, x.value = 0);
	}
	function $(e) {
		C.value !== e && (C.value = e, x.value = 0);
	}
	function pe() {
		o.value = "", s.value = [], c.value = void 0, l.value = void 0, u.value = [], d.value = [], f.value = "", h.value = [], g.value = [], v.value = "name", y.value = "asc", x.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: r,
		search: o,
		selectedGenres: s,
		yearFrom: c,
		yearTo: l,
		selectedRatings: u,
		selectedTypes: d,
		matchStatus: f,
		selectedActors: h,
		selectedCompanies: g,
		sort: v,
		order: y,
		limit: b,
		offset: x,
		libraryId: S,
		topLevel: C,
		hasMore: w,
		queryParams: T,
		availableGenres: E,
		availableRatings: D,
		availableTypes: ee,
		fetchMedia: H,
		scheduleFetch: U,
		loadMore: W,
		ensureRange: V,
		prefetch: te,
		clearCache: G,
		cancelScheduled: ne,
		toQuery: re,
		applyQuery: q,
		reset: J,
		setSearch: Y,
		setGenres: ie,
		setYearRange: X,
		setRatings: ae,
		setTypes: oe,
		setMatchStatus: se,
		setActors: ce,
		setCompanies: Z,
		setSort: le,
		setLibraryId: Q,
		setTopLevel: $,
		clearFilters: pe
	};
}), me = { class: "filterbar__main" }, he = { class: "filterbar__search" }, ge = { class: "filterbar__sort" }, _e = ["aria-label"], ve = ["aria-expanded"], ye = { class: "filterbar__advanced" }, be = { class: "filterbar__field" }, xe = { class: "filterbar__field" }, Se = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Ce = { class: "filterbar__field" }, we = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Te = { class: "filterbar__field" }, Ee = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Metadata match status"
}, De = { class: "filterbar__field" }, Oe = { class: "filterbar__years" }, ke = { class: "filterbar__field filterbar__presets" }, Ae = { class: "filterbar__chips" }, je = {
	key: 0,
	class: "filterbar__presets-empty"
}, Me = {
	key: 0,
	class: "filterbar__preset-save"
}, Ne = ["onKeydown"], Pe = ["disabled"], Fe = { class: "filterbar__active" }, Ie = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Le = { class: "filterbar__pills" }, Re = /*#__PURE__*/ e(/* @__PURE__ */ w({
	__name: "FilterBar",
	props: {
		searchDebounce: { default: 250 },
		sticky: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["change"],
	setup(e, { emit: r }) {
		let i = e, a = r, c = pe(), l = n(), u = [
			{
				value: "name",
				label: "Name"
			},
			{
				value: "year",
				label: "Year"
			},
			{
				value: "rating",
				label: "Rating"
			},
			{
				value: "date_added",
				label: "Date added"
			},
			{
				value: "runtime",
				label: "Runtime"
			}
		], f = A(c.search), p;
		R(() => c.search, (e) => {
			e !== f.value.trim() && (f.value = e);
		});
		function m() {
			clearTimeout(p), p = setTimeout(() => {
				c.setSearch(f.value.trim()), a("change");
			}, i.searchDebounce);
		}
		function w() {
			f.value = "", c.setSearch(""), a("change");
		}
		let T = A(null), D = A(0), M = _(() => c.availableGenres.filter((e) => !c.selectedGenres.includes(e)));
		function F(e) {
			if (e == null || e === "") return;
			let t = String(e);
			c.selectedGenres.includes(t) || (c.setGenres([...c.selectedGenres, t]), a("change")), T.value = null, D.value++;
		}
		function U(e) {
			let t = c.selectedRatings;
			c.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		function W(e) {
			let t = c.selectedTypes;
			c.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		let te = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function G(e) {
			c.setMatchStatus(c.matchStatus === e ? "" : e), a("change");
		}
		function ne(e) {
			c.setActors(c.selectedActors.filter((t) => t !== e)), a("change");
		}
		let re = _(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), K = _(() => {
			let e = [];
			for (let t = re.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function J(e) {
			c.setYearRange(e == null || e === "" ? void 0 : Number(e), c.yearTo), a("change");
		}
		function Y(e) {
			c.setYearRange(c.yearFrom, e == null || e === "" ? void 0 : Number(e)), a("change");
		}
		function ie(e) {
			c.setSort(e), a("change");
		}
		function X() {
			c.order = c.order === "asc" ? "desc" : "asc", c.offset = 0, a("change");
		}
		let ae = _(() => {
			let e = [];
			return c.search && e.push({
				key: "search",
				label: `“${c.search}”`,
				remove: w
			}), c.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					c.setGenres(c.selectedGenres.filter((e) => e !== t)), a("change");
				}
			})), c.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => U(t)
			})), c.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => W(t)
			})), c.selectedActors.forEach((t) => e.push({
				key: `a:${t}`,
				label: t,
				remove: () => ne(t)
			})), c.matchStatus && e.push({
				key: "match",
				label: c.matchStatus === "matched" ? "Matched" : "Unmatched",
				remove: () => G(c.matchStatus)
			}), c.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${c.yearFrom}`,
				remove: () => J(null)
			}), c.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${c.yearTo}`,
				remove: () => Y(null)
			}), e;
		}), oe = _(() => ae.value.length > 0), se = _(() => c.selectedGenres.length + c.selectedRatings.length + c.selectedTypes.length + c.selectedActors.length + +!!c.matchStatus + (c.yearFrom === void 0 ? 0 : 1) + (c.yearTo === void 0 ? 0 : 1));
		function ce() {
			f.value = "", c.setSearch(""), c.setGenres([]), c.setRatings([]), c.setTypes([]), c.setActors([]), c.setMatchStatus(""), c.setYearRange(void 0, void 0), a("change");
		}
		let Z = A(!1), le = _(() => l.filterPresets), Q = A(!1), $ = A("");
		function ue() {
			Q.value = !0, $.value = "";
		}
		function de() {
			let e = $.value.trim();
			e && (l.saveFilterPreset(e, c.toQuery()), Q.value = !1, $.value = "");
		}
		function fe(e) {
			c.applyQuery(e.query), f.value = c.search, a("change");
		}
		function Re(e) {
			l.removeFilterPreset(e.id);
		}
		let ze = A(!1);
		function Be() {
			typeof window > "u" || (ze.value = window.scrollY > 24);
		}
		return O(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Be, { passive: !0 }), Be());
		}), ee(() => {
			clearTimeout(p), typeof window < "u" && window.removeEventListener("scroll", Be);
		}), (n, r) => (k(), b("div", { class: E(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ze.value
		}]) }, [
			x("div", me, [
				x("label", he, [
					C(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					B(x("input", {
						"onUpdate:modelValue": r[0] ||= (e) => f.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: m
					}, null, 544), [[I, f.value]]),
					f.value ? (k(), b("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: w
					}, [C(t, { name: "x" })])) : y("", !0)
				]),
				x("div", ge, [C(d, {
					"model-value": P(c).sort,
					options: u,
					label: "Sort by",
					"onUpdate:modelValue": ie
				}, null, 8, ["model-value"]), x("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${P(c).order === "asc" ? "ascending" : "descending"}`,
					onClick: X
				}, [C(t, { name: P(c).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, _e)]),
				x("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": Z.value,
					onClick: r[1] ||= (e) => Z.value = !Z.value
				}, [
					C(t, { name: "filter" }),
					r[4] ||= x("span", null, "Filters", -1),
					se.value ? (k(), v(o, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: z(() => [S(N(se.value), 1)]),
						_: 1
					})) : y("", !0),
					C(t, {
						name: Z.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, ve)
			]),
			C(g, { name: "filterbar-panel" }, {
				default: z(() => [B(x("div", ye, [
					x("div", be, [r[5] ||= x("span", { class: "filterbar__field-label" }, "Genres", -1), (k(), v(q, {
						key: D.value,
						"model-value": T.value,
						options: M.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": F
					}, null, 8, ["model-value", "options"]))]),
					x("div", xe, [r[6] ||= x("span", { class: "filterbar__field-label" }, "Rating", -1), x("div", Se, [(k(!0), b(h, null, j(P(c).availableRatings, (e) => (k(), v(s, {
						key: e,
						selected: P(c).selectedRatings.includes(e),
						"onUpdate:selected": (t) => U(e)
					}, {
						default: z(() => [S(N(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					x("div", Ce, [r[7] ||= x("span", { class: "filterbar__field-label" }, "Type", -1), x("div", we, [(k(!0), b(h, null, j(P(c).availableTypes, (e) => (k(), v(s, {
						key: e,
						selected: P(c).selectedTypes.includes(e),
						"onUpdate:selected": (t) => W(e)
					}, {
						default: z(() => [S(N(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					x("div", Te, [r[8] ||= x("span", { class: "filterbar__field-label" }, "Metadata", -1), x("div", Ee, [(k(), b(h, null, j(te, (e) => C(s, {
						key: e.value,
						selected: P(c).matchStatus === e.value,
						"onUpdate:selected": (t) => G(e.value)
					}, {
						default: z(() => [S(N(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					x("div", De, [r[10] ||= x("span", { class: "filterbar__field-label" }, "Year", -1), x("div", Oe, [
						C(q, {
							"model-value": P(c).yearFrom ?? null,
							options: K.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": J
						}, null, 8, ["model-value", "options"]),
						r[9] ||= x("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						C(q, {
							"model-value": P(c).yearTo ?? null,
							options: K.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": Y
						}, null, 8, ["model-value", "options"])
					])]),
					x("div", ke, [
						r[13] ||= x("span", { class: "filterbar__field-label" }, "Presets", -1),
						x("div", Ae, [(k(!0), b(h, null, j(le.value, (e) => (k(), v(s, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => fe(e),
							onRemove: (t) => Re(e)
						}, {
							default: z(() => [S(N(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), le.value.length ? y("", !0) : (k(), b("span", je, "No saved presets"))]),
						Q.value ? (k(), b("div", Me, [B(x("input", {
							"onUpdate:modelValue": r[2] ||= (e) => $.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [V(H(de, ["prevent"]), ["enter"]), r[3] ||= V((e) => Q.value = !1, ["esc"])]
						}, null, 40, Ne), [[I, $.value]]), x("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: de
						}, [C(t, { name: "check" }), r[11] ||= S(" Save ", -1)])])) : (k(), b("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !oe.value,
							onClick: ue
						}, [C(t, { name: "plus" }), r[12] ||= S(" Save current ", -1)], 8, Pe))
					])
				], 512), [[L, Z.value]])]),
				_: 1
			}),
			x("div", Fe, [x("span", Ie, [x("b", null, N(P(c).total.toLocaleString()), 1), S(" " + N(P(c).total === 1 ? "title" : "titles"), 1)]), oe.value ? (k(), b(h, { key: 0 }, [x("div", Le, [(k(!0), b(h, null, j(ae.value, (e) => (k(), v(s, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: z(() => [S(N(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), x("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: ce
			}, "Clear all")], 64)) : y("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-ee7efac4"]]);
//#endregion
export { q as i, pe as n, $ as r, Re as t };

//# sourceMappingURL=FilterBar-CbU26KoZ.js.map