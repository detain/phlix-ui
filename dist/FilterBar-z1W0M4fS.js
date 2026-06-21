import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-DkTu9l9P.js";
import { t as r } from "./useMessages-Dwm0lQlG.js";
import { n as i, u as a } from "./Button-9cUUJmnN.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as s } from "./Chip-2HcSZF4a.js";
import { n as c, r as l, t as u } from "./listbox-htyKA_G5.js";
import { t as d } from "./Select-DLwgQInL.js";
import { n as f } from "./MetadataMatchModal-OhFsKc_u.js";
import { Fragment as p, Transition as m, computed as h, createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, nextTick as ee, normalizeClass as C, normalizeStyle as w, onBeforeUnmount as T, onMounted as E, openBlock as D, ref as O, renderList as k, renderSlot as A, toDisplayString as j, unref as M, useId as N, vModelText as P, vShow as F, watch as I, withCtx as L, withDirectives as R, withKeys as z, withModifiers as te } from "vue";
import { defineStore as B } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var ne = { class: "phlix-combobox__field" }, V = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], H = ["id", "aria-label"], re = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], U = { class: "phlix-combobox__check" }, ie = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, W = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		let i = e, { t: a } = r(), o = n, s = h(() => l(i.options)), d = N(), f = O(!1), m = O(-1), S = O(""), w = O(!1), E = O(null), A = O(null), P = O(null), L = h(() => s.value.find((e) => e.value === i.modelValue)?.label ?? ""), z = h(() => {
			if (!w.value || S.value.trim() === "") return s.value;
			let e = S.value.toLowerCase();
			return s.value.filter((t) => t.label.toLowerCase().includes(e));
		}), te = h(() => m.value >= 0 ? `${d}-opt-${m.value}` : void 0);
		I(() => i.modelValue, () => {
			f.value || (S.value = L.value);
		}, { immediate: !0 });
		function B() {
			i.disabled || f.value || (f.value = !0, m.value = z.value.findIndex((e) => e.value === i.modelValue), m.value < 0 && (m.value = z.value.findIndex((e) => !e.disabled)), ee(q));
		}
		function W() {
			S.value = L.value, w.value = !1, f.value = !1;
		}
		function G(e) {
			let t = z.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), S.value = t.label, w.value = !1, f.value = !1, A.value?.focus());
		}
		function K(e) {
			z.value.length !== 0 && (m.value = c(z.value, m.value, e), ee(q));
		}
		function q() {
			P.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function J(e) {
			S.value = e.target.value, w.value = !0, f.value = !0, m.value = u(z.value, "first");
		}
		function ae(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), f.value ? K(1) : B();
					break;
				case "ArrowUp":
					e.preventDefault(), f.value ? K(-1) : B();
					break;
				case "Enter":
					f.value && m.value >= 0 && (e.preventDefault(), G(m.value));
					break;
				case "Escape":
					f.value && (e.preventDefault(), W());
					break;
				case "Tab":
					f.value && W();
					break;
			}
		}
		function Y(e) {
			f.value && E.value && !E.value.contains(e.target) && W();
		}
		return I(f, (e) => {
			e ? document.addEventListener("pointerdown", Y, !0) : document.removeEventListener("pointerdown", Y, !0);
		}), T(() => document.removeEventListener("pointerdown", Y, !0)), (n, r) => (D(), v("div", {
			ref_key: "rootEl",
			ref: E,
			class: C(["phlix-combobox", {
				"is-open": f.value,
				"is-disabled": e.disabled
			}])
		}, [y("div", ne, [
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
				onInput: J,
				onFocus: B,
				onKeydown: ae
			}, null, 40, V),
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
			class: C(["phlix-combobox__option", {
				"is-active": r === m.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => G(r),
			onPointermove: (e) => !n.disabled && (m.value = r)
		}, [y("span", U, [n.value === e.modelValue ? (D(), g(t, {
			key: 0,
			name: "check"
		})) : _("", !0)]), b(" " + j(n.label), 1)], 42, re))), 128)), z.value.length === 0 ? (D(), v("li", ie, j(M(a)("common.noMatches")), 1)) : _("", !0)], 8, H), [[F, f.value]])], 2));
	}
}), [["__scopeId", "data-v-1f9bb8a7"]]), G = 3 / 2;
function K(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function q(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function J(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * G + t + n;
}
function ae(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function Y(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function oe(e) {
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
var se = { class: "media-grid-root" }, ce = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, le = {
	key: 1,
	class: "skel-card",
	"aria-hidden": "true"
}, X = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, Z = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		"play",
		"watchlist",
		"info",
		"match"
	],
	setup(e, { expose: r, emit: i }) {
		let a = e, o = i, s = n(), c = h(() => a.cardSize ?? s.cardSize ?? 180), l = O(null), u = O(null), d = O(0), g = O(0), S = O(0);
		function C() {
			let e = l.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (d.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (g.value = n), S.value = Math.max(0, -t.top);
		}
		let j = 0;
		function M() {
			j ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				j = 0, C();
			});
		}
		let N = h(() => K(d.value, c.value, 20)), P = h(() => J(q(d.value, N.value, 20))), F = h(() => d.value > 0 && P.value > 0), R = h(() => ae(a.items.length, a.total)), z = h(() => oe({
			scrollTop: S.value,
			viewportHeight: g.value,
			rowHeight: P.value,
			columns: N.value,
			itemCount: R.value,
			overscan: a.overscan
		})), te = h(() => {
			if (!F.value) return a.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = z.value, n = [];
			for (let r = e; r < t; r++) n.push({
				item: a.items[r] ?? null,
				index: r
			});
			return n;
		});
		I(() => [
			z.value.endIndex,
			a.items.length,
			a.hasMore,
			a.loading,
			a.loadingMore
		], ([e, t, n, r, i]) => {
			F.value && Y(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && o("load-more");
		});
		let B = h(() => ({ gridTemplateColumns: F.value ? `repeat(${N.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${c.value}px, 1fr))` })), ne = h(() => F.value ? { height: `${z.value.totalHeight}px` } : {}), V = h(() => F.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${z.value.padTop}px)`
		} : {}), H = h(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${c.value}px, 1fr))` })), re = h(() => F.value && S.value > g.value * 1.5);
		function U() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function ie(e) {
			if (typeof window > "u" || !l.value) return;
			let t = Math.max(1, N.value), n = Math.floor(Math.max(0, e) / t) * P.value, r = window.scrollY + l.value.getBoundingClientRect().top, i = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: Math.max(0, r + n),
				behavior: i ? "auto" : "smooth"
			});
		}
		r({ scrollToIndex: ie });
		let W = null;
		function G() {
			W || typeof IntersectionObserver > "u" || (W = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && a.hasMore && !a.loading && !a.loadingMore && o("load-more");
			}, { rootMargin: "400px 0px" }), u.value && W.observe(u.value));
		}
		function Z() {
			W?.disconnect(), W = null;
		}
		I(() => u.value, (e) => {
			Z(), e && (G(), M());
		});
		let Q = null;
		function $() {
			Q || typeof ResizeObserver > "u" || !l.value || (Q = new ResizeObserver(M), Q.observe(l.value));
		}
		function ue() {
			Q?.disconnect(), Q = null;
		}
		return I(() => l.value, (e) => {
			ue(), e && ($(), M());
		}), E(() => {
			C(), typeof window < "u" && (window.addEventListener("scroll", M, { passive: !0 }), window.addEventListener("resize", M, { passive: !0 })), $(), G();
		}), T(() => {
			typeof window < "u" && (window.removeEventListener("scroll", M), window.removeEventListener("resize", M)), j &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(j) : clearTimeout(j), 0), ue(), Z();
		}), I(() => a.items.length, () => ee(M)), (n, r) => (D(), v("div", se, [e.loading && e.items.length === 0 ? (D(), v("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: w(H.value),
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
		]]))), 128))], 4)) : e.items.length === 0 ? (D(), v("div", ce, [A(n.$slots, "empty", {}, () => [
			x(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= y("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= y("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (D(), v(p, { key: 2 }, [
			y("div", {
				ref_key: "sizerEl",
				ref: l,
				class: "media-grid-sizer",
				style: w(ne.value)
			}, [y("div", {
				class: "media-grid",
				style: w([B.value, V.value])
			}, [(D(!0), v(p, null, k(te.value, (t) => (D(), v(p, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? A(n.$slots, "card", {
				key: 0,
				item: t.item,
				index: t.index
			}, () => [x(f, {
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
			])], !0) : (D(), v("div", le, [...r[3] ||= [
				y("div", { class: "skel-poster" }, null, -1),
				y("div", { class: "skel-title" }, null, -1),
				y("div", { class: "skel-sub" }, null, -1)
			]]))], 64))), 128))], 4)], 4),
			e.loadingMore ? (D(), v("div", X, [...r[4] ||= [y("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), b(" Loading more… ", -1)]])) : _("", !0),
			e.hasMore && !e.loadingMore ? (D(), v("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: u,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : _("", !0)
		], 64)), x(m, { name: "media-grid-fade" }, {
			default: L(() => [re.value ? (D(), v("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: U
			}, [x(t, { name: "arrow-up" })])) : _("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-30354706"]]), Q = 6e4, $ = 250;
function ue(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var de = B("media", () => {
	let e = O([]), t = O(0), n = O(!1), r = O(null), o = O(""), s = O([]), c = O(void 0), l = O(void 0), u = O([]), d = O([]), f = O(""), p = O([]), m = O("name"), g = O("asc"), _ = O(24), v = O(0), y = O(void 0), b = O(!1), x = h(() => e.value.length < t.value), S = h(() => {
		let e = {};
		return y.value && (e.libraryId = y.value), b.value && (e.topLevel = !0), o.value && (e.search = o.value), s.value.length && (e.genres = s.value), c.value !== void 0 && (e.yearFrom = c.value), l.value !== void 0 && (e.yearTo = l.value), u.value.length && (e.ratings = u.value), d.value.length && (e.types = d.value), f.value && (e.match = f.value), p.value.length && (e.actors = p.value), e.sort = m.value, e.order = g.value, e.limit = _.value, e.offset = v.value, e;
	}), ee = h(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), C = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], w = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function T(e) {
		let t = new URLSearchParams();
		return e.libraryId && t.set("libraryId", e.libraryId), e.topLevel && t.set("topLevel", "1"), e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function E(e, t) {
		return `${e}/api/v1/media?${T(t).toString()}`;
	}
	function D(e) {
		return T(e).toString();
	}
	let k = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), j = null, M = null, N;
	function P(e) {
		return !!e && Date.now() - e.ts < Q;
	}
	function F(e, t, n, r) {
		r && (M && n !== j && M.abort(), j = n);
		let a = A.get(n);
		if (a) return r && (M = a.controller), a.promise;
		let o = new AbortController();
		r && (M = o);
		let s = new i({ baseUrl: e }).get(E(e, t), void 0, o.signal).then((e) => (k.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			A.delete(n);
		});
		return A.set(n, {
			promise: s,
			controller: o
		}), s;
	}
	function I(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total;
	}
	async function L(e, t = !1) {
		let i = { ...S.value }, o = D(i), s = k.get(o);
		if (P(s)) {
			I(s, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await F(e, i, o, !t);
			if (!t && o !== j) return;
			I(n, t);
		} catch (e) {
			if (ue(e)) return;
			(t || o === j) && (r.value = a(e, "Failed to load media"));
		} finally {
			(t || o === j) && (n.value = !1);
		}
	}
	function R(e, t = $) {
		v.value = 0, clearTimeout(N), N = setTimeout(() => L(e, !1), t);
	}
	async function z(t) {
		n.value || !x.value || (v.value = e.value.length, await L(t, !0));
	}
	async function te(e, t = {}) {
		let n = {
			...S.value,
			...t
		}, r = D(n);
		if (!P(k.get(r))) try {
			await F(e, n, r, !1);
		} catch {}
	}
	function B() {
		k.clear();
	}
	function ne() {
		clearTimeout(N);
	}
	function V() {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = [...s.value]), c.value !== void 0 && (e.yearFrom = String(c.value)), l.value !== void 0 && (e.yearTo = String(l.value)), u.value.length && (e.ratings = [...u.value]), d.value.length && (e.types = [...d.value]), f.value && (e.match = f.value), p.value.length && (e.actors = [...p.value]), m.value !== "name" && (e.sort = m.value), g.value !== "asc" && (e.order = g.value), e;
	}
	function H(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function re(e) {
		o.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", s.value = H(e.genres), u.value = H(e.ratings), d.value = H(e.types);
		let t = Array.isArray(e.match) ? e.match[0] : e.match;
		f.value = t === "matched" || t === "unmatched" ? t : "", p.value = H(e.actors);
		let n = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, r = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		c.value = n ? Number(n) : void 0, l.value = r ? Number(r) : void 0;
		let i = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		m.value = i ?? "name", g.value = a ?? "asc", v.value = 0;
	}
	function U() {
		e.value = [], t.value = 0, v.value = 0, r.value = null;
	}
	function ie(e) {
		o.value = e, v.value = 0;
	}
	function W(e) {
		s.value = e, v.value = 0;
	}
	function G(e, t) {
		c.value = e, l.value = t, v.value = 0;
	}
	function K(e) {
		u.value = e, v.value = 0;
	}
	function q(e) {
		d.value = e, v.value = 0;
	}
	function J(e) {
		f.value = e, v.value = 0;
	}
	function ae(e) {
		p.value = e, v.value = 0;
	}
	function Y(e, t) {
		m.value = e, t && (g.value = t), v.value = 0;
	}
	function oe(e) {
		y.value !== e && (y.value = e, v.value = 0);
	}
	function se(e) {
		b.value !== e && (b.value = e, v.value = 0);
	}
	function ce() {
		o.value = "", s.value = [], c.value = void 0, l.value = void 0, u.value = [], d.value = [], f.value = "", p.value = [], m.value = "name", g.value = "asc", v.value = 0;
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
		selectedActors: p,
		sort: m,
		order: g,
		limit: _,
		offset: v,
		libraryId: y,
		topLevel: b,
		hasMore: x,
		queryParams: S,
		availableGenres: ee,
		availableRatings: C,
		availableTypes: w,
		fetchMedia: L,
		scheduleFetch: R,
		loadMore: z,
		prefetch: te,
		clearCache: B,
		cancelScheduled: ne,
		toQuery: V,
		applyQuery: re,
		reset: U,
		setSearch: ie,
		setGenres: W,
		setYearRange: G,
		setRatings: K,
		setTypes: q,
		setMatchStatus: J,
		setActors: ae,
		setSort: Y,
		setLibraryId: oe,
		setTopLevel: se,
		clearFilters: ce
	};
}), fe = { class: "filterbar__main" }, pe = { class: "filterbar__search" }, me = { class: "filterbar__sort" }, he = ["aria-label"], ge = ["aria-expanded"], _e = { class: "filterbar__advanced" }, ve = { class: "filterbar__field" }, ye = { class: "filterbar__field" }, be = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, xe = { class: "filterbar__field" }, Se = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Ce = { class: "filterbar__field" }, we = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Metadata match status"
}, Te = { class: "filterbar__field" }, Ee = { class: "filterbar__years" }, De = { class: "filterbar__field filterbar__presets" }, Oe = { class: "filterbar__chips" }, ke = {
	key: 0,
	class: "filterbar__presets-empty"
}, Ae = {
	key: 0,
	class: "filterbar__preset-save"
}, je = ["onKeydown"], Me = ["disabled"], Ne = { class: "filterbar__active" }, Pe = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Fe = { class: "filterbar__pills" }, Ie = /*#__PURE__*/ e(/* @__PURE__ */ S({
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
		let i = e, a = r, c = de(), l = n(), u = [
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
		function ee() {
			clearTimeout(S), S = setTimeout(() => {
				c.setSearch(f.value.trim()), a("change");
			}, i.searchDebounce);
		}
		function w() {
			f.value = "", c.setSearch(""), a("change");
		}
		let A = O(null), N = O(0), B = h(() => c.availableGenres.filter((e) => !c.selectedGenres.includes(e)));
		function ne(e) {
			if (e == null || e === "") return;
			let t = String(e);
			c.selectedGenres.includes(t) || (c.setGenres([...c.selectedGenres, t]), a("change")), A.value = null, N.value++;
		}
		function V(e) {
			let t = c.selectedRatings;
			c.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		function H(e) {
			let t = c.selectedTypes;
			c.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		let re = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function U(e) {
			c.setMatchStatus(c.matchStatus === e ? "" : e), a("change");
		}
		function ie(e) {
			c.setActors(c.selectedActors.filter((t) => t !== e)), a("change");
		}
		let G = h(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), K = h(() => {
			let e = [];
			for (let t = G.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function q(e) {
			c.setYearRange(e == null || e === "" ? void 0 : Number(e), c.yearTo), a("change");
		}
		function J(e) {
			c.setYearRange(c.yearFrom, e == null || e === "" ? void 0 : Number(e)), a("change");
		}
		function ae(e) {
			c.setSort(e), a("change");
		}
		function Y() {
			c.order = c.order === "asc" ? "desc" : "asc", c.offset = 0, a("change");
		}
		let oe = h(() => {
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
				remove: () => V(t)
			})), c.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => H(t)
			})), c.selectedActors.forEach((t) => e.push({
				key: `a:${t}`,
				label: t,
				remove: () => ie(t)
			})), c.matchStatus && e.push({
				key: "match",
				label: c.matchStatus === "matched" ? "Matched" : "Unmatched",
				remove: () => U(c.matchStatus)
			}), c.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${c.yearFrom}`,
				remove: () => q(null)
			}), c.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${c.yearTo}`,
				remove: () => J(null)
			}), e;
		}), se = h(() => oe.value.length > 0), ce = h(() => c.selectedGenres.length + c.selectedRatings.length + c.selectedTypes.length + c.selectedActors.length + +!!c.matchStatus + (c.yearFrom === void 0 ? 0 : 1) + (c.yearTo === void 0 ? 0 : 1));
		function le() {
			f.value = "", c.setSearch(""), c.setGenres([]), c.setRatings([]), c.setTypes([]), c.setActors([]), c.setMatchStatus(""), c.setYearRange(void 0, void 0), a("change");
		}
		let X = O(!1), Z = h(() => l.filterPresets), Q = O(!1), $ = O("");
		function ue() {
			Q.value = !0, $.value = "";
		}
		function Ie() {
			let e = $.value.trim();
			e && (l.saveFilterPreset(e, c.toQuery()), Q.value = !1, $.value = "");
		}
		function Le(e) {
			c.applyQuery(e.query), f.value = c.search, a("change");
		}
		function Re(e) {
			l.removeFilterPreset(e.id);
		}
		let ze = O(!1);
		function Be() {
			typeof window > "u" || (ze.value = window.scrollY > 24);
		}
		return E(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Be, { passive: !0 }), Be());
		}), T(() => {
			clearTimeout(S), typeof window < "u" && window.removeEventListener("scroll", Be);
		}), (n, r) => (D(), v("div", { class: C(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ze.value
		}]) }, [
			y("div", fe, [
				y("label", pe, [
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
						onInput: ee
					}, null, 544), [[P, f.value]]),
					f.value ? (D(), v("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: w
					}, [x(t, { name: "x" })])) : _("", !0)
				]),
				y("div", me, [x(d, {
					"model-value": M(c).sort,
					options: u,
					label: "Sort by",
					"onUpdate:modelValue": ae
				}, null, 8, ["model-value"]), y("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${M(c).order === "asc" ? "ascending" : "descending"}`,
					onClick: Y
				}, [x(t, { name: M(c).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, he)]),
				y("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": X.value,
					onClick: r[1] ||= (e) => X.value = !X.value
				}, [
					x(t, { name: "filter" }),
					r[4] ||= y("span", null, "Filters", -1),
					ce.value ? (D(), g(o, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: L(() => [b(j(ce.value), 1)]),
						_: 1
					})) : _("", !0),
					x(t, {
						name: X.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, ge)
			]),
			x(m, { name: "filterbar-panel" }, {
				default: L(() => [R(y("div", _e, [
					y("div", ve, [r[5] ||= y("span", { class: "filterbar__field-label" }, "Genres", -1), (D(), g(W, {
						key: N.value,
						"model-value": A.value,
						options: B.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": ne
					}, null, 8, ["model-value", "options"]))]),
					y("div", ye, [r[6] ||= y("span", { class: "filterbar__field-label" }, "Rating", -1), y("div", be, [(D(!0), v(p, null, k(M(c).availableRatings, (e) => (D(), g(s, {
						key: e,
						selected: M(c).selectedRatings.includes(e),
						"onUpdate:selected": (t) => V(e)
					}, {
						default: L(() => [b(j(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					y("div", xe, [r[7] ||= y("span", { class: "filterbar__field-label" }, "Type", -1), y("div", Se, [(D(!0), v(p, null, k(M(c).availableTypes, (e) => (D(), g(s, {
						key: e,
						selected: M(c).selectedTypes.includes(e),
						"onUpdate:selected": (t) => H(e)
					}, {
						default: L(() => [b(j(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					y("div", Ce, [r[8] ||= y("span", { class: "filterbar__field-label" }, "Metadata", -1), y("div", we, [(D(), v(p, null, k(re, (e) => x(s, {
						key: e.value,
						selected: M(c).matchStatus === e.value,
						"onUpdate:selected": (t) => U(e.value)
					}, {
						default: L(() => [b(j(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					y("div", Te, [r[10] ||= y("span", { class: "filterbar__field-label" }, "Year", -1), y("div", Ee, [
						x(W, {
							"model-value": M(c).yearFrom ?? null,
							options: K.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": q
						}, null, 8, ["model-value", "options"]),
						r[9] ||= y("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						x(W, {
							"model-value": M(c).yearTo ?? null,
							options: K.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": J
						}, null, 8, ["model-value", "options"])
					])]),
					y("div", De, [
						r[13] ||= y("span", { class: "filterbar__field-label" }, "Presets", -1),
						y("div", Oe, [(D(!0), v(p, null, k(Z.value, (e) => (D(), g(s, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => Le(e),
							onRemove: (t) => Re(e)
						}, {
							default: L(() => [b(j(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), Z.value.length ? _("", !0) : (D(), v("span", ke, "No saved presets"))]),
						Q.value ? (D(), v("div", Ae, [R(y("input", {
							"onUpdate:modelValue": r[2] ||= (e) => $.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [z(te(Ie, ["prevent"]), ["enter"]), r[3] ||= z((e) => Q.value = !1, ["esc"])]
						}, null, 40, je), [[P, $.value]]), y("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Ie
						}, [x(t, { name: "check" }), r[11] ||= b(" Save ", -1)])])) : (D(), v("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !se.value,
							onClick: ue
						}, [x(t, { name: "plus" }), r[12] ||= b(" Save current ", -1)], 8, Me))
					])
				], 512), [[F, X.value]])]),
				_: 1
			}),
			y("div", Ne, [y("span", Pe, [y("b", null, j(M(c).total.toLocaleString()), 1), b(" " + j(M(c).total === 1 ? "title" : "titles"), 1)]), se.value ? (D(), v(p, { key: 0 }, [y("div", Fe, [(D(!0), v(p, null, k(oe.value, (e) => (D(), g(s, {
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
				onClick: le
			}, "Clear all")], 64)) : _("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-ee7efac4"]]);
//#endregion
export { W as i, de as n, Z as r, Ie as t };

//# sourceMappingURL=FilterBar-z1W0M4fS.js.map