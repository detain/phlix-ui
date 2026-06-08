import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-BFFMWKZp.js";
import { t as r } from "./useMessages-D7StdIzu.js";
import { c as i, n as a } from "./Button-BwQkyEkr.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as s } from "./Chip-2HcSZF4a.js";
import { n as c, r as l, t as u } from "./listbox-htyKA_G5.js";
import { t as d } from "./Select-DfIQHE9A.js";
import { t as f } from "./MediaCard-D2yRVykc.js";
import { Fragment as p, Transition as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, nextTick as C, normalizeClass as w, normalizeStyle as T, onBeforeUnmount as E, onMounted as D, openBlock as O, ref as k, renderList as A, renderSlot as j, toDisplayString as M, unref as N, useId as P, vModelText as F, vShow as I, watch as L, withCtx as R, withDirectives as z, withKeys as B, withModifiers as ee } from "vue";
import { defineStore as V } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var te = { class: "phlix-combobox__field" }, H = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], U = ["id", "aria-label"], W = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], G = { class: "phlix-combobox__check" }, K = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, q = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		let i = e, { t: a } = r(), o = n, s = h(() => l(i.options)), d = P(), f = k(!1), m = k(-1), S = k(""), T = k(!1), D = k(null), j = k(null), F = k(null), R = h(() => s.value.find((e) => e.value === i.modelValue)?.label ?? ""), B = h(() => {
			if (!T.value || S.value.trim() === "") return s.value;
			let e = S.value.toLowerCase();
			return s.value.filter((t) => t.label.toLowerCase().includes(e));
		}), ee = h(() => m.value >= 0 ? `${d}-opt-${m.value}` : void 0);
		L(() => i.modelValue, () => {
			f.value || (S.value = R.value);
		}, { immediate: !0 });
		function V() {
			i.disabled || f.value || (f.value = !0, m.value = B.value.findIndex((e) => e.value === i.modelValue), m.value < 0 && (m.value = B.value.findIndex((e) => !e.disabled)), C(X));
		}
		function q() {
			S.value = R.value, T.value = !1, f.value = !1;
		}
		function J(e) {
			let t = B.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), S.value = t.label, T.value = !1, f.value = !1, j.value?.focus());
		}
		function Y(e) {
			B.value.length !== 0 && (m.value = c(B.value, m.value, e), C(X));
		}
		function X() {
			F.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function ne(e) {
			S.value = e.target.value, T.value = !0, f.value = !0, m.value = u(B.value, "first");
		}
		function re(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), f.value ? Y(1) : V();
					break;
				case "ArrowUp":
					e.preventDefault(), f.value ? Y(-1) : V();
					break;
				case "Enter":
					f.value && m.value >= 0 && (e.preventDefault(), J(m.value));
					break;
				case "Escape":
					f.value && (e.preventDefault(), q());
					break;
				case "Tab":
					f.value && q();
					break;
			}
		}
		function Z(e) {
			f.value && D.value && !D.value.contains(e.target) && q();
		}
		return L(f, (e) => {
			e ? document.addEventListener("pointerdown", Z, !0) : document.removeEventListener("pointerdown", Z, !0);
		}), E(() => document.removeEventListener("pointerdown", Z, !0)), (n, r) => (O(), v("div", {
			ref_key: "rootEl",
			ref: D,
			class: w(["phlix-combobox", {
				"is-open": f.value,
				"is-disabled": e.disabled
			}])
		}, [y("div", te, [
			x(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			y("input", {
				ref_key: "inputEl",
				ref: j,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": f.value,
				"aria-controls": f.value ? `${N(d)}-list` : void 0,
				"aria-activedescendant": f.value ? ee.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? N(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: S.value,
				onInput: ne,
				onFocus: V,
				onKeydown: re
			}, null, 40, H),
			x(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), z(y("ul", {
			id: `${N(d)}-list`,
			ref_key: "listEl",
			ref: F,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(O(!0), v(p, null, A(B.value, (n, r) => (O(), v("li", {
			id: `${N(d)}-opt-${r}`,
			key: n.value,
			class: w(["phlix-combobox__option", {
				"is-active": r === m.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => J(r),
			onPointermove: (e) => !n.disabled && (m.value = r)
		}, [y("span", G, [n.value === e.modelValue ? (O(), g(t, {
			key: 0,
			name: "check"
		})) : _("", !0)]), b(" " + M(n.label), 1)], 42, W))), 128)), B.value.length === 0 ? (O(), v("li", K, M(N(a)("common.noMatches")), 1)) : _("", !0)], 8, U), [[I, f.value]])], 2));
	}
}), [["__scopeId", "data-v-1f9bb8a7"]]), J = 3 / 2;
function Y(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function X(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function ne(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * J + t + n;
}
function re(e) {
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
		overscan: { default: 2 }
	},
	emits: [
		"load-more",
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: r }) {
		let i = e, a = r, o = n(), s = h(() => i.cardSize ?? o.cardSize ?? 180), c = k(null), l = k(null), u = k(0), d = k(0), g = k(0);
		function S() {
			let e = c.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (u.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (d.value = n), g.value = Math.max(0, -t.top);
		}
		let w = 0;
		function M() {
			w ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				w = 0, S();
			});
		}
		let N = h(() => Y(u.value, s.value, 20)), P = h(() => ne(X(u.value, N.value, 20))), F = h(() => u.value > 0 && P.value > 0), I = h(() => re({
			scrollTop: g.value,
			viewportHeight: d.value,
			rowHeight: P.value,
			columns: N.value,
			itemCount: i.items.length,
			overscan: i.overscan
		})), z = h(() => {
			if (!F.value) return i.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = I.value, n = [];
			for (let r = e; r < t; r++) n.push({
				item: i.items[r],
				index: r
			});
			return n;
		}), B = h(() => ({ gridTemplateColumns: F.value ? `repeat(${N.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), ee = h(() => F.value ? { height: `${I.value.totalHeight}px` } : {}), V = h(() => F.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${I.value.padTop}px)`
		} : {}), te = h(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), H = h(() => F.value && g.value > d.value * 1.5);
		function U() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let W = null;
		function G() {
			W || typeof IntersectionObserver > "u" || (W = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && i.hasMore && !i.loading && !i.loadingMore && a("load-more");
			}, { rootMargin: "400px 0px" }), l.value && W.observe(l.value));
		}
		function K() {
			W?.disconnect(), W = null;
		}
		L(() => l.value, (e) => {
			K(), e && (G(), M());
		});
		let q = null;
		function J() {
			q || typeof ResizeObserver > "u" || !c.value || (q = new ResizeObserver(M), q.observe(c.value));
		}
		function ae() {
			q?.disconnect(), q = null;
		}
		return L(() => c.value, (e) => {
			ae(), e && (J(), M());
		}), D(() => {
			S(), typeof window < "u" && (window.addEventListener("scroll", M, { passive: !0 }), window.addEventListener("resize", M, { passive: !0 })), J(), G();
		}), E(() => {
			typeof window < "u" && (window.removeEventListener("scroll", M), window.removeEventListener("resize", M)), w &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(w) : clearTimeout(w), 0), ae(), K();
		}), L(() => i.items.length, () => C(M)), (n, r) => (O(), v("div", Z, [e.loading && e.items.length === 0 ? (O(), v("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: T(te.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(O(!0), v(p, null, A(e.skeletonCount, (e) => (O(), v("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			y("div", { class: "skel-poster" }, null, -1),
			y("div", { class: "skel-title" }, null, -1),
			y("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (O(), v("div", ie, [j(n.$slots, "empty", {}, () => [
			x(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= y("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= y("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (O(), v(p, { key: 2 }, [
			y("div", {
				ref_key: "sizerEl",
				ref: c,
				class: "media-grid-sizer",
				style: T(ee.value)
			}, [y("div", {
				class: "media-grid",
				style: T([B.value, V.value])
			}, [(O(!0), v(p, null, A(z.value, (e) => j(n.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [x(f, {
				item: e.item,
				onPlay: (t) => a("play", e.item),
				onWatchlist: (t) => a("watchlist", e.item),
				onInfo: (t) => a("info", e.item)
			}, null, 8, [
				"item",
				"onPlay",
				"onWatchlist",
				"onInfo"
			])], !0)), 128))], 4)], 4),
			e.loadingMore ? (O(), v("div", Q, [...r[3] ||= [y("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), b(" Loading more… ", -1)]])) : _("", !0),
			e.hasMore && !e.loadingMore ? (O(), v("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: l,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : _("", !0)
		], 64)), x(m, { name: "media-grid-fade" }, {
			default: R(() => [H.value ? (O(), v("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: U
			}, [x(t, { name: "arrow-up" })])) : _("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-10283a5e"]]), oe = 6e4, $ = 250;
function se(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var ce = V("media", () => {
	let e = k([]), t = k(0), n = k(!1), r = k(null), o = k(""), s = k([]), c = k(void 0), l = k(void 0), u = k([]), d = k([]), f = k("name"), p = k("asc"), m = k(24), g = k(0), _ = k(void 0), v = h(() => e.value.length < t.value), y = h(() => {
		let e = {};
		return _.value && (e.libraryId = _.value), o.value && (e.search = o.value), s.value.length && (e.genres = s.value), c.value !== void 0 && (e.yearFrom = c.value), l.value !== void 0 && (e.yearTo = l.value), u.value.length && (e.ratings = u.value), d.value.length && (e.types = d.value), e.sort = f.value, e.order = p.value, e.limit = m.value, e.offset = g.value, e;
	}), b = h(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), x = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], S = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function C(e) {
		let t = new URLSearchParams();
		return e.libraryId && t.set("libraryId", e.libraryId), e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function w(e, t) {
		return `${e}/api/v1/media?${C(t).toString()}`;
	}
	function T(e) {
		return C(e).toString();
	}
	let E = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Map(), O = null, A = null, j;
	function M(e) {
		return !!e && Date.now() - e.ts < oe;
	}
	function N(e, t, n, r) {
		r && (A && n !== O && A.abort(), O = n);
		let i = D.get(n);
		if (i) return r && (A = i.controller), i.promise;
		let o = new AbortController();
		r && (A = o);
		let s = new a({ baseUrl: e }).get(w(e, t), void 0, o.signal).then((e) => (E.set(n, {
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
		let a = { ...y.value }, o = T(a), s = E.get(o);
		if (M(s)) {
			P(s, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await N(e, a, o, !t);
			if (!t && o !== O) return;
			P(n, t);
		} catch (e) {
			if (se(e)) return;
			(t || o === O) && (r.value = i(e, "Failed to load media"));
		} finally {
			(t || o === O) && (n.value = !1);
		}
	}
	function I(e, t = $) {
		g.value = 0, clearTimeout(j), j = setTimeout(() => F(e, !1), t);
	}
	async function L(t) {
		n.value || !v.value || (g.value = e.value.length, await F(t, !0));
	}
	async function R(e, t = {}) {
		let n = {
			...y.value,
			...t
		}, r = T(n);
		if (!M(E.get(r))) try {
			await N(e, n, r, !1);
		} catch {}
	}
	function z() {
		E.clear();
	}
	function B() {
		clearTimeout(j);
	}
	function ee() {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = [...s.value]), c.value !== void 0 && (e.yearFrom = String(c.value)), l.value !== void 0 && (e.yearTo = String(l.value)), u.value.length && (e.ratings = [...u.value]), d.value.length && (e.types = [...d.value]), f.value !== "name" && (e.sort = f.value), p.value !== "asc" && (e.order = p.value), e;
	}
	function V(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function te(e) {
		o.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", s.value = V(e.genres), u.value = V(e.ratings), d.value = V(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		c.value = t ? Number(t) : void 0, l.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		f.value = r ?? "name", p.value = i ?? "asc", g.value = 0;
	}
	function H() {
		e.value = [], t.value = 0, g.value = 0, r.value = null;
	}
	function U(e) {
		o.value = e, g.value = 0;
	}
	function W(e) {
		s.value = e, g.value = 0;
	}
	function G(e, t) {
		c.value = e, l.value = t, g.value = 0;
	}
	function K(e) {
		u.value = e, g.value = 0;
	}
	function q(e) {
		d.value = e, g.value = 0;
	}
	function J(e, t) {
		f.value = e, t && (p.value = t), g.value = 0;
	}
	function Y(e) {
		_.value !== e && (_.value = e, g.value = 0);
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
		hasMore: v,
		queryParams: y,
		availableGenres: b,
		availableRatings: x,
		availableTypes: S,
		fetchMedia: F,
		scheduleFetch: I,
		loadMore: L,
		prefetch: R,
		clearCache: z,
		cancelScheduled: B,
		toQuery: ee,
		applyQuery: te,
		reset: H,
		setSearch: U,
		setGenres: W,
		setYearRange: G,
		setRatings: K,
		setTypes: q,
		setSort: J,
		setLibraryId: Y,
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
		], f = k(c.search), S;
		L(() => c.search, (e) => {
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
		let j = k(null), P = k(0), V = h(() => c.availableGenres.filter((e) => !c.selectedGenres.includes(e)));
		function te(e) {
			if (e == null || e === "") return;
			let t = String(e);
			c.selectedGenres.includes(t) || (c.setGenres([...c.selectedGenres, t]), a("change")), j.value = null, P.value++;
		}
		function H(e) {
			let t = c.selectedRatings;
			c.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		function U(e) {
			let t = c.selectedTypes;
			c.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		let W = h(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), G = h(() => {
			let e = [];
			for (let t = W.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function K(e) {
			c.setYearRange(e == null || e === "" ? void 0 : Number(e), c.yearTo), a("change");
		}
		function J(e) {
			c.setYearRange(c.yearFrom, e == null || e === "" ? void 0 : Number(e)), a("change");
		}
		function Y(e) {
			c.setSort(e), a("change");
		}
		function X() {
			c.order = c.order === "asc" ? "desc" : "asc", c.offset = 0, a("change");
		}
		let ne = h(() => {
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
				remove: () => H(t)
			})), c.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => U(t)
			})), c.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${c.yearFrom}`,
				remove: () => K(null)
			}), c.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${c.yearTo}`,
				remove: () => J(null)
			}), e;
		}), re = h(() => ne.value.length > 0), Z = h(() => c.selectedGenres.length + c.selectedRatings.length + c.selectedTypes.length + (c.yearFrom === void 0 ? 0 : 1) + (c.yearTo === void 0 ? 0 : 1));
		function ie() {
			f.value = "", c.setSearch(""), c.setGenres([]), c.setRatings([]), c.setTypes([]), c.setYearRange(void 0, void 0), a("change");
		}
		let Q = k(!1), ae = h(() => l.filterPresets), oe = k(!1), $ = k("");
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
		let Pe = k(!1);
		function Fe() {
			typeof window > "u" || (Pe.value = window.scrollY > 24);
		}
		return D(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Fe, { passive: !0 }), Fe());
		}), E(() => {
			clearTimeout(S), typeof window < "u" && window.removeEventListener("scroll", Fe);
		}), (n, r) => (O(), v("div", { class: w(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Pe.value
		}]) }, [
			y("div", le, [
				y("label", ue, [
					x(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					z(y("input", {
						"onUpdate:modelValue": r[0] ||= (e) => f.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: C
					}, null, 544), [[F, f.value]]),
					f.value ? (O(), v("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: T
					}, [x(t, { name: "x" })])) : _("", !0)
				]),
				y("div", de, [x(d, {
					"model-value": N(c).sort,
					options: u,
					label: "Sort by",
					"onUpdate:modelValue": Y
				}, null, 8, ["model-value"]), y("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${N(c).order === "asc" ? "ascending" : "descending"}`,
					onClick: X
				}, [x(t, { name: N(c).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, fe)]),
				y("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": Q.value,
					onClick: r[1] ||= (e) => Q.value = !Q.value
				}, [
					x(t, { name: "filter" }),
					r[4] ||= y("span", null, "Filters", -1),
					Z.value ? (O(), g(o, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: R(() => [b(M(Z.value), 1)]),
						_: 1
					})) : _("", !0),
					x(t, {
						name: Q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, pe)
			]),
			x(m, { name: "filterbar-panel" }, {
				default: R(() => [z(y("div", me, [
					y("div", he, [r[5] ||= y("span", { class: "filterbar__field-label" }, "Genres", -1), (O(), g(q, {
						key: P.value,
						"model-value": j.value,
						options: V.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": te
					}, null, 8, ["model-value", "options"]))]),
					y("div", ge, [r[6] ||= y("span", { class: "filterbar__field-label" }, "Rating", -1), y("div", _e, [(O(!0), v(p, null, A(N(c).availableRatings, (e) => (O(), g(s, {
						key: e,
						selected: N(c).selectedRatings.includes(e),
						"onUpdate:selected": (t) => H(e)
					}, {
						default: R(() => [b(M(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					y("div", ve, [r[7] ||= y("span", { class: "filterbar__field-label" }, "Type", -1), y("div", ye, [(O(!0), v(p, null, A(N(c).availableTypes, (e) => (O(), g(s, {
						key: e,
						selected: N(c).selectedTypes.includes(e),
						"onUpdate:selected": (t) => U(e)
					}, {
						default: R(() => [b(M(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					y("div", be, [r[9] ||= y("span", { class: "filterbar__field-label" }, "Year", -1), y("div", xe, [
						x(q, {
							"model-value": N(c).yearFrom ?? null,
							options: G.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": K
						}, null, 8, ["model-value", "options"]),
						r[8] ||= y("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						x(q, {
							"model-value": N(c).yearTo ?? null,
							options: G.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": J
						}, null, 8, ["model-value", "options"])
					])]),
					y("div", Se, [
						r[12] ||= y("span", { class: "filterbar__field-label" }, "Presets", -1),
						y("div", Ce, [(O(!0), v(p, null, A(ae.value, (e) => (O(), g(s, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => Me(e),
							onRemove: (t) => Ne(e)
						}, {
							default: R(() => [b(M(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ae.value.length ? _("", !0) : (O(), v("span", we, "No saved presets"))]),
						oe.value ? (O(), v("div", Te, [z(y("input", {
							"onUpdate:modelValue": r[2] ||= (e) => $.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [B(ee(je, ["prevent"]), ["enter"]), r[3] ||= B((e) => oe.value = !1, ["esc"])]
						}, null, 40, Ee), [[F, $.value]]), y("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: je
						}, [x(t, { name: "check" }), r[10] ||= b(" Save ", -1)])])) : (O(), v("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !re.value,
							onClick: se
						}, [x(t, { name: "plus" }), r[11] ||= b(" Save current ", -1)], 8, De))
					])
				], 512), [[I, Q.value]])]),
				_: 1
			}),
			y("div", Oe, [y("span", ke, [y("b", null, M(N(c).total.toLocaleString()), 1), b(" " + M(N(c).total === 1 ? "title" : "titles"), 1)]), re.value ? (O(), v(p, { key: 0 }, [y("div", Ae, [(O(!0), v(p, null, A(ne.value, (e) => (O(), g(s, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: R(() => [b(M(e.label), 1)]),
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
export { q as i, ce as n, ae as r, je as t };

//# sourceMappingURL=FilterBar-DbkALxC0.js.map