import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-DkTu9l9P.js";
import { t as r } from "./useMessages-Dwm0lQlG.js";
import { n as i, u as a } from "./Button-9cUUJmnN.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as s } from "./Chip-2HcSZF4a.js";
import { n as c, r as l, t as u } from "./listbox-htyKA_G5.js";
import { t as d } from "./Select-DLwgQInL.js";
import { n as f } from "./MetadataMatchModal-BHe9IKxt.js";
import { Fragment as p, Transition as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, nextTick as C, normalizeClass as w, normalizeStyle as T, onBeforeUnmount as ee, onMounted as E, openBlock as D, ref as O, renderList as k, renderSlot as A, toDisplayString as j, unref as M, useId as N, vModelText as P, vShow as F, watch as I, withCtx as L, withDirectives as R, withKeys as z, withModifiers as te } from "vue";
import { defineStore as B } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var V = { class: "phlix-combobox__field" }, ne = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], re = ["id", "aria-label"], H = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], U = { class: "phlix-combobox__check" }, W = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, G = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		let i = e, { t: a } = r(), o = n, s = h(() => l(i.options)), d = N(), f = O(!1), m = O(-1), S = O(""), T = O(!1), E = O(null), A = O(null), P = O(null), L = h(() => s.value.find((e) => e.value === i.modelValue)?.label ?? ""), z = h(() => {
			if (!T.value || S.value.trim() === "") return s.value;
			let e = S.value.toLowerCase();
			return s.value.filter((t) => t.label.toLowerCase().includes(e));
		}), te = h(() => m.value >= 0 ? `${d}-opt-${m.value}` : void 0);
		I(() => i.modelValue, () => {
			f.value || (S.value = L.value);
		}, { immediate: !0 });
		function B() {
			i.disabled || f.value || (f.value = !0, m.value = z.value.findIndex((e) => e.value === i.modelValue), m.value < 0 && (m.value = z.value.findIndex((e) => !e.disabled)), C(J));
		}
		function G() {
			S.value = L.value, T.value = !1, f.value = !1;
		}
		function K(e) {
			let t = z.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), S.value = t.label, T.value = !1, f.value = !1, A.value?.focus());
		}
		function q(e) {
			z.value.length !== 0 && (m.value = c(z.value, m.value, e), C(J));
		}
		function J() {
			P.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function Y(e) {
			S.value = e.target.value, T.value = !0, f.value = !0, m.value = u(z.value, "first");
		}
		function X(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), f.value ? q(1) : B();
					break;
				case "ArrowUp":
					e.preventDefault(), f.value ? q(-1) : B();
					break;
				case "Enter":
					f.value && m.value >= 0 && (e.preventDefault(), K(m.value));
					break;
				case "Escape":
					f.value && (e.preventDefault(), G());
					break;
				case "Tab":
					f.value && G();
					break;
			}
		}
		function Z(e) {
			f.value && E.value && !E.value.contains(e.target) && G();
		}
		return I(f, (e) => {
			e ? document.addEventListener("pointerdown", Z, !0) : document.removeEventListener("pointerdown", Z, !0);
		}), ee(() => document.removeEventListener("pointerdown", Z, !0)), (n, r) => (D(), v("div", {
			ref_key: "rootEl",
			ref: E,
			class: w(["phlix-combobox", {
				"is-open": f.value,
				"is-disabled": e.disabled
			}])
		}, [y("div", V, [
			x(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			y("input", {
				ref_key: "inputEl",
				ref: A,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": f.value,
				"aria-controls": f.value ? `${M(d)}-list` : void 0,
				"aria-activedescendant": f.value ? te.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? M(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: S.value,
				onInput: Y,
				onFocus: B,
				onKeydown: X
			}, null, 40, ne),
			x(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), R(y("ul", {
			id: `${M(d)}-list`,
			ref_key: "listEl",
			ref: P,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(D(!0), v(p, null, k(z.value, (n, r) => (D(), v("li", {
			id: `${M(d)}-opt-${r}`,
			key: n.value,
			class: w(["phlix-combobox__option", {
				"is-active": r === m.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => K(r),
			onPointermove: (e) => !n.disabled && (m.value = r)
		}, [y("span", U, [n.value === e.modelValue ? (D(), g(t, {
			key: 0,
			name: "check"
		})) : _("", !0)]), b(" " + j(n.label), 1)], 42, H))), 128)), z.value.length === 0 ? (D(), v("li", W, j(M(a)("common.noMatches")), 1)) : _("", !0)], 8, re), [[F, f.value]])], 2));
	}
}), [["__scopeId", "data-v-1f9bb8a7"]]), K = 3 / 2;
function q(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function J(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function Y(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * K + t + n;
}
function X(e) {
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
var Z = { class: "media-grid-root" }, ie = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, Q = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, ae = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "MediaGrid",
	props: {
		items: {},
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
		"play",
		"watchlist",
		"info",
		"match"
	],
	setup(e, { emit: r }) {
		let i = e, a = r, o = n(), s = h(() => i.cardSize ?? o.cardSize ?? 180), c = O(null), l = O(null), u = O(0), d = O(0), g = O(0);
		function S() {
			let e = c.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (u.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (d.value = n), g.value = Math.max(0, -t.top);
		}
		let w = 0;
		function j() {
			w ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				w = 0, S();
			});
		}
		let M = h(() => q(u.value, s.value, 20)), N = h(() => Y(J(u.value, M.value, 20))), P = h(() => u.value > 0 && N.value > 0), F = h(() => X({
			scrollTop: g.value,
			viewportHeight: d.value,
			rowHeight: N.value,
			columns: M.value,
			itemCount: i.items.length,
			overscan: i.overscan
		})), R = h(() => {
			if (!P.value) return i.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = F.value, n = [];
			for (let r = e; r < t; r++) n.push({
				item: i.items[r],
				index: r
			});
			return n;
		}), z = h(() => ({ gridTemplateColumns: P.value ? `repeat(${M.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), te = h(() => P.value ? { height: `${F.value.totalHeight}px` } : {}), B = h(() => P.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${F.value.padTop}px)`
		} : {}), V = h(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), ne = h(() => P.value && g.value > d.value * 1.5);
		function re() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let H = null;
		function U() {
			H || typeof IntersectionObserver > "u" || (H = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && i.hasMore && !i.loading && !i.loadingMore && a("load-more");
			}, { rootMargin: "400px 0px" }), l.value && H.observe(l.value));
		}
		function W() {
			H?.disconnect(), H = null;
		}
		I(() => l.value, (e) => {
			W(), e && (U(), j());
		});
		let G = null;
		function K() {
			G || typeof ResizeObserver > "u" || !c.value || (G = new ResizeObserver(j), G.observe(c.value));
		}
		function ae() {
			G?.disconnect(), G = null;
		}
		return I(() => c.value, (e) => {
			ae(), e && (K(), j());
		}), E(() => {
			S(), typeof window < "u" && (window.addEventListener("scroll", j, { passive: !0 }), window.addEventListener("resize", j, { passive: !0 })), K(), U();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", j), window.removeEventListener("resize", j)), w &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(w) : clearTimeout(w), 0), ae(), W();
		}), I(() => i.items.length, () => C(j)), (n, r) => (D(), v("div", Z, [e.loading && e.items.length === 0 ? (D(), v("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: T(V.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(D(!0), v(p, null, k(e.skeletonCount, (e) => (D(), v("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			y("div", { class: "skel-poster" }, null, -1),
			y("div", { class: "skel-title" }, null, -1),
			y("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (D(), v("div", ie, [A(n.$slots, "empty", {}, () => [
			x(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= y("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= y("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (D(), v(p, { key: 2 }, [
			y("div", {
				ref_key: "sizerEl",
				ref: c,
				class: "media-grid-sizer",
				style: T(te.value)
			}, [y("div", {
				class: "media-grid",
				style: T([z.value, B.value])
			}, [(D(!0), v(p, null, k(R.value, (t) => A(n.$slots, "card", {
				key: t.item.id,
				item: t.item,
				index: t.index
			}, () => [x(f, {
				item: t.item,
				"can-match": e.canMatch,
				onPlay: (e) => a("play", t.item),
				onWatchlist: (e) => a("watchlist", t.item),
				onInfo: (e) => a("info", t.item),
				onMatch: (e) => a("match", t.item)
			}, null, 8, [
				"item",
				"can-match",
				"onPlay",
				"onWatchlist",
				"onInfo",
				"onMatch"
			])], !0)), 128))], 4)], 4),
			e.loadingMore ? (D(), v("div", Q, [...r[3] ||= [y("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), b(" Loading more… ", -1)]])) : _("", !0),
			e.hasMore && !e.loadingMore ? (D(), v("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: l,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : _("", !0)
		], 64)), x(m, { name: "media-grid-fade" }, {
			default: L(() => [ne.value ? (D(), v("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: re
			}, [x(t, { name: "arrow-up" })])) : _("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-9186b180"]]), oe = 6e4, $ = 250;
function se(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var ce = B("media", () => {
	let e = O([]), t = O(0), n = O(!1), r = O(null), o = O(""), s = O([]), c = O(void 0), l = O(void 0), u = O([]), d = O([]), f = O("name"), p = O("asc"), m = O(24), g = O(0), _ = O(void 0), v = O(!1), y = h(() => e.value.length < t.value), b = h(() => {
		let e = {};
		return _.value && (e.libraryId = _.value), v.value && (e.topLevel = !0), o.value && (e.search = o.value), s.value.length && (e.genres = s.value), c.value !== void 0 && (e.yearFrom = c.value), l.value !== void 0 && (e.yearTo = l.value), u.value.length && (e.ratings = u.value), d.value.length && (e.types = d.value), e.sort = f.value, e.order = p.value, e.limit = m.value, e.offset = g.value, e;
	}), x = h(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), S = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], C = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function w(e) {
		let t = new URLSearchParams();
		return e.libraryId && t.set("libraryId", e.libraryId), e.topLevel && t.set("topLevel", "1"), e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function T(e, t) {
		return `${e}/api/v1/media?${w(t).toString()}`;
	}
	function ee(e) {
		return w(e).toString();
	}
	let E = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Map(), k = null, A = null, j;
	function M(e) {
		return !!e && Date.now() - e.ts < oe;
	}
	function N(e, t, n, r) {
		r && (A && n !== k && A.abort(), k = n);
		let a = D.get(n);
		if (a) return r && (A = a.controller), a.promise;
		let o = new AbortController();
		r && (A = o);
		let s = new i({ baseUrl: e }).get(T(e, t), void 0, o.signal).then((e) => (E.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			D.delete(n);
		});
		return D.set(n, {
			promise: s,
			controller: o
		}), s;
	}
	function P(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total;
	}
	async function F(e, t = !1) {
		let i = { ...b.value }, o = ee(i), s = E.get(o);
		if (M(s)) {
			P(s, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await N(e, i, o, !t);
			if (!t && o !== k) return;
			P(n, t);
		} catch (e) {
			if (se(e)) return;
			(t || o === k) && (r.value = a(e, "Failed to load media"));
		} finally {
			(t || o === k) && (n.value = !1);
		}
	}
	function I(e, t = $) {
		g.value = 0, clearTimeout(j), j = setTimeout(() => F(e, !1), t);
	}
	async function L(t) {
		n.value || !y.value || (g.value = e.value.length, await F(t, !0));
	}
	async function R(e, t = {}) {
		let n = {
			...b.value,
			...t
		}, r = ee(n);
		if (!M(E.get(r))) try {
			await N(e, n, r, !1);
		} catch {}
	}
	function z() {
		E.clear();
	}
	function te() {
		clearTimeout(j);
	}
	function B() {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = [...s.value]), c.value !== void 0 && (e.yearFrom = String(c.value)), l.value !== void 0 && (e.yearTo = String(l.value)), u.value.length && (e.ratings = [...u.value]), d.value.length && (e.types = [...d.value]), f.value !== "name" && (e.sort = f.value), p.value !== "asc" && (e.order = p.value), e;
	}
	function V(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function ne(e) {
		o.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", s.value = V(e.genres), u.value = V(e.ratings), d.value = V(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		c.value = t ? Number(t) : void 0, l.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		f.value = r ?? "name", p.value = i ?? "asc", g.value = 0;
	}
	function re() {
		e.value = [], t.value = 0, g.value = 0, r.value = null;
	}
	function H(e) {
		o.value = e, g.value = 0;
	}
	function U(e) {
		s.value = e, g.value = 0;
	}
	function W(e, t) {
		c.value = e, l.value = t, g.value = 0;
	}
	function G(e) {
		u.value = e, g.value = 0;
	}
	function K(e) {
		d.value = e, g.value = 0;
	}
	function q(e, t) {
		f.value = e, t && (p.value = t), g.value = 0;
	}
	function J(e) {
		_.value !== e && (_.value = e, g.value = 0);
	}
	function Y(e) {
		v.value !== e && (v.value = e, g.value = 0);
	}
	function X() {
		o.value = "", s.value = [], c.value = void 0, l.value = void 0, u.value = [], d.value = [], f.value = "name", p.value = "asc", g.value = 0;
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
		sort: f,
		order: p,
		limit: m,
		offset: g,
		libraryId: _,
		topLevel: v,
		hasMore: y,
		queryParams: b,
		availableGenres: x,
		availableRatings: S,
		availableTypes: C,
		fetchMedia: F,
		scheduleFetch: I,
		loadMore: L,
		prefetch: R,
		clearCache: z,
		cancelScheduled: te,
		toQuery: B,
		applyQuery: ne,
		reset: re,
		setSearch: H,
		setGenres: U,
		setYearRange: W,
		setRatings: G,
		setTypes: K,
		setSort: q,
		setLibraryId: J,
		setTopLevel: Y,
		clearFilters: X
	};
}), le = { class: "filterbar__main" }, ue = { class: "filterbar__search" }, de = { class: "filterbar__sort" }, fe = ["aria-label"], pe = ["aria-expanded"], me = { class: "filterbar__advanced" }, he = { class: "filterbar__field" }, ge = { class: "filterbar__field" }, _e = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, ve = { class: "filterbar__field" }, ye = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, be = { class: "filterbar__field" }, xe = { class: "filterbar__years" }, Se = { class: "filterbar__field filterbar__presets" }, Ce = { class: "filterbar__chips" }, we = {
	key: 0,
	class: "filterbar__presets-empty"
}, Te = {
	key: 0,
	class: "filterbar__preset-save"
}, Ee = ["onKeydown"], De = ["disabled"], Oe = { class: "filterbar__active" }, ke = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Ae = { class: "filterbar__pills" }, je = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		let i = e, a = r, c = ce(), l = n(), u = [
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
		], f = O(c.search), S;
		I(() => c.search, (e) => {
			e !== f.value.trim() && (f.value = e);
		});
		function C() {
			clearTimeout(S), S = setTimeout(() => {
				c.setSearch(f.value.trim()), a("change");
			}, i.searchDebounce);
		}
		function T() {
			f.value = "", c.setSearch(""), a("change");
		}
		let A = O(null), N = O(0), B = h(() => c.availableGenres.filter((e) => !c.selectedGenres.includes(e)));
		function V(e) {
			if (e == null || e === "") return;
			let t = String(e);
			c.selectedGenres.includes(t) || (c.setGenres([...c.selectedGenres, t]), a("change")), A.value = null, N.value++;
		}
		function ne(e) {
			let t = c.selectedRatings;
			c.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		function re(e) {
			let t = c.selectedTypes;
			c.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		let H = h(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), U = h(() => {
			let e = [];
			for (let t = H.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function W(e) {
			c.setYearRange(e == null || e === "" ? void 0 : Number(e), c.yearTo), a("change");
		}
		function K(e) {
			c.setYearRange(c.yearFrom, e == null || e === "" ? void 0 : Number(e)), a("change");
		}
		function q(e) {
			c.setSort(e), a("change");
		}
		function J() {
			c.order = c.order === "asc" ? "desc" : "asc", c.offset = 0, a("change");
		}
		let Y = h(() => {
			let e = [];
			return c.search && e.push({
				key: "search",
				label: `“${c.search}”`,
				remove: T
			}), c.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					c.setGenres(c.selectedGenres.filter((e) => e !== t)), a("change");
				}
			})), c.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => ne(t)
			})), c.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => re(t)
			})), c.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${c.yearFrom}`,
				remove: () => W(null)
			}), c.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${c.yearTo}`,
				remove: () => K(null)
			}), e;
		}), X = h(() => Y.value.length > 0), Z = h(() => c.selectedGenres.length + c.selectedRatings.length + c.selectedTypes.length + (c.yearFrom === void 0 ? 0 : 1) + (c.yearTo === void 0 ? 0 : 1));
		function ie() {
			f.value = "", c.setSearch(""), c.setGenres([]), c.setRatings([]), c.setTypes([]), c.setYearRange(void 0, void 0), a("change");
		}
		let Q = O(!1), ae = h(() => l.filterPresets), oe = O(!1), $ = O("");
		function se() {
			oe.value = !0, $.value = "";
		}
		function je() {
			let e = $.value.trim();
			e && (l.saveFilterPreset(e, c.toQuery()), oe.value = !1, $.value = "");
		}
		function Me(e) {
			c.applyQuery(e.query), f.value = c.search, a("change");
		}
		function Ne(e) {
			l.removeFilterPreset(e.id);
		}
		let Pe = O(!1);
		function Fe() {
			typeof window > "u" || (Pe.value = window.scrollY > 24);
		}
		return E(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Fe, { passive: !0 }), Fe());
		}), ee(() => {
			clearTimeout(S), typeof window < "u" && window.removeEventListener("scroll", Fe);
		}), (n, r) => (D(), v("div", { class: w(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Pe.value
		}]) }, [
			y("div", le, [
				y("label", ue, [
					x(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					R(y("input", {
						"onUpdate:modelValue": r[0] ||= (e) => f.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: C
					}, null, 544), [[P, f.value]]),
					f.value ? (D(), v("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: T
					}, [x(t, { name: "x" })])) : _("", !0)
				]),
				y("div", de, [x(d, {
					"model-value": M(c).sort,
					options: u,
					label: "Sort by",
					"onUpdate:modelValue": q
				}, null, 8, ["model-value"]), y("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${M(c).order === "asc" ? "ascending" : "descending"}`,
					onClick: J
				}, [x(t, { name: M(c).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, fe)]),
				y("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": Q.value,
					onClick: r[1] ||= (e) => Q.value = !Q.value
				}, [
					x(t, { name: "filter" }),
					r[4] ||= y("span", null, "Filters", -1),
					Z.value ? (D(), g(o, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: L(() => [b(j(Z.value), 1)]),
						_: 1
					})) : _("", !0),
					x(t, {
						name: Q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, pe)
			]),
			x(m, { name: "filterbar-panel" }, {
				default: L(() => [R(y("div", me, [
					y("div", he, [r[5] ||= y("span", { class: "filterbar__field-label" }, "Genres", -1), (D(), g(G, {
						key: N.value,
						"model-value": A.value,
						options: B.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": V
					}, null, 8, ["model-value", "options"]))]),
					y("div", ge, [r[6] ||= y("span", { class: "filterbar__field-label" }, "Rating", -1), y("div", _e, [(D(!0), v(p, null, k(M(c).availableRatings, (e) => (D(), g(s, {
						key: e,
						selected: M(c).selectedRatings.includes(e),
						"onUpdate:selected": (t) => ne(e)
					}, {
						default: L(() => [b(j(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					y("div", ve, [r[7] ||= y("span", { class: "filterbar__field-label" }, "Type", -1), y("div", ye, [(D(!0), v(p, null, k(M(c).availableTypes, (e) => (D(), g(s, {
						key: e,
						selected: M(c).selectedTypes.includes(e),
						"onUpdate:selected": (t) => re(e)
					}, {
						default: L(() => [b(j(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					y("div", be, [r[9] ||= y("span", { class: "filterbar__field-label" }, "Year", -1), y("div", xe, [
						x(G, {
							"model-value": M(c).yearFrom ?? null,
							options: U.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": W
						}, null, 8, ["model-value", "options"]),
						r[8] ||= y("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						x(G, {
							"model-value": M(c).yearTo ?? null,
							options: U.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": K
						}, null, 8, ["model-value", "options"])
					])]),
					y("div", Se, [
						r[12] ||= y("span", { class: "filterbar__field-label" }, "Presets", -1),
						y("div", Ce, [(D(!0), v(p, null, k(ae.value, (e) => (D(), g(s, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => Me(e),
							onRemove: (t) => Ne(e)
						}, {
							default: L(() => [b(j(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ae.value.length ? _("", !0) : (D(), v("span", we, "No saved presets"))]),
						oe.value ? (D(), v("div", Te, [R(y("input", {
							"onUpdate:modelValue": r[2] ||= (e) => $.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [z(te(je, ["prevent"]), ["enter"]), r[3] ||= z((e) => oe.value = !1, ["esc"])]
						}, null, 40, Ee), [[P, $.value]]), y("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: je
						}, [x(t, { name: "check" }), r[10] ||= b(" Save ", -1)])])) : (D(), v("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !X.value,
							onClick: se
						}, [x(t, { name: "plus" }), r[11] ||= b(" Save current ", -1)], 8, De))
					])
				], 512), [[F, Q.value]])]),
				_: 1
			}),
			y("div", Oe, [y("span", ke, [y("b", null, j(M(c).total.toLocaleString()), 1), b(" " + j(M(c).total === 1 ? "title" : "titles"), 1)]), X.value ? (D(), v(p, { key: 0 }, [y("div", Ae, [(D(!0), v(p, null, k(Y.value, (e) => (D(), g(s, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: L(() => [b(j(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), y("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: ie
			}, "Clear all")], 64)) : _("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-3584cf2c"]]);
//#endregion
export { G as i, ce as n, ae as r, je as t };

//# sourceMappingURL=FilterBar-D6z5f_eZ.js.map