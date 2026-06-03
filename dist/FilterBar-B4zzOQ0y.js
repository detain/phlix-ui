import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-BFFMWKZp.js";
import { t as r } from "./useMessages-C_NXwkrd.js";
import { c as i, n as a } from "./Button-BwQkyEkr.js";
import { n as o } from "./media-query-DowsWq-z.js";
import { t as s } from "./Badge-ArWL5-WE.js";
import { i as c, n as l, t as u } from "./MediaRow-yOkKwyWU.js";
import { n as d, r as f, t as p } from "./listbox-htyKA_G5.js";
import { t as m } from "./Select-CkOiSrAn.js";
import { t as h } from "./useToastStore-BDoKlU6N.js";
import { Fragment as g, Transition as _, computed as v, createBlock as y, createCommentVNode as b, createElementBlock as x, createElementVNode as S, createTextVNode as C, createVNode as w, defineComponent as T, nextTick as E, normalizeClass as D, normalizeStyle as O, onBeforeUnmount as k, onMounted as A, openBlock as j, ref as M, renderList as N, renderSlot as P, toDisplayString as F, unref as I, useId as L, vModelText as R, vShow as ee, watch as z, withCtx as B, withDirectives as V, withKeys as H, withModifiers as U } from "vue";
import { defineStore as W } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var G = { class: "phlix-combobox__field" }, K = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], q = ["id", "aria-label"], J = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], te = { class: "phlix-combobox__check" }, ne = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, Y = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
		let i = e, { t: a } = r(), o = n, s = v(() => f(i.options)), c = L(), l = M(!1), u = M(-1), m = M(""), h = M(!1), _ = M(null), T = M(null), O = M(null), A = v(() => s.value.find((e) => e.value === i.modelValue)?.label ?? ""), P = v(() => {
			if (!h.value || m.value.trim() === "") return s.value;
			let e = m.value.toLowerCase();
			return s.value.filter((t) => t.label.toLowerCase().includes(e));
		}), R = v(() => u.value >= 0 ? `${c}-opt-${u.value}` : void 0);
		z(() => i.modelValue, () => {
			l.value || (m.value = A.value);
		}, { immediate: !0 });
		function B() {
			i.disabled || l.value || (l.value = !0, u.value = P.value.findIndex((e) => e.value === i.modelValue), u.value < 0 && (u.value = P.value.findIndex((e) => !e.disabled)), E(Y));
		}
		function H() {
			m.value = A.value, h.value = !1, l.value = !1;
		}
		function U(e) {
			let t = P.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), m.value = t.label, h.value = !1, l.value = !1, T.value?.focus());
		}
		function W(e) {
			P.value.length !== 0 && (u.value = d(P.value, u.value, e), E(Y));
		}
		function Y() {
			O.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function re(e) {
			m.value = e.target.value, h.value = !0, l.value = !0, u.value = p(P.value, "first");
		}
		function ie(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), l.value ? W(1) : B();
					break;
				case "ArrowUp":
					e.preventDefault(), l.value ? W(-1) : B();
					break;
				case "Enter":
					l.value && u.value >= 0 && (e.preventDefault(), U(u.value));
					break;
				case "Escape":
					l.value && (e.preventDefault(), H());
					break;
				case "Tab":
					l.value && H();
					break;
			}
		}
		function X(e) {
			l.value && _.value && !_.value.contains(e.target) && H();
		}
		return z(l, (e) => {
			e ? document.addEventListener("pointerdown", X, !0) : document.removeEventListener("pointerdown", X, !0);
		}), k(() => document.removeEventListener("pointerdown", X, !0)), (n, r) => (j(), x("div", {
			ref_key: "rootEl",
			ref: _,
			class: D(["phlix-combobox", {
				"is-open": l.value,
				"is-disabled": e.disabled
			}])
		}, [S("div", G, [
			w(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			S("input", {
				ref_key: "inputEl",
				ref: T,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": l.value,
				"aria-controls": l.value ? `${I(c)}-list` : void 0,
				"aria-activedescendant": l.value ? R.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? I(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: m.value,
				onInput: re,
				onFocus: B,
				onKeydown: ie
			}, null, 40, K),
			w(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), V(S("ul", {
			id: `${I(c)}-list`,
			ref_key: "listEl",
			ref: O,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(j(!0), x(g, null, N(P.value, (n, r) => (j(), x("li", {
			id: `${I(c)}-opt-${r}`,
			key: n.value,
			class: D(["phlix-combobox__option", {
				"is-active": r === u.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => U(r),
			onPointermove: (e) => !n.disabled && (u.value = r)
		}, [S("span", te, [n.value === e.modelValue ? (j(), y(t, {
			key: 0,
			name: "check"
		})) : b("", !0)]), C(" " + F(n.label), 1)], 42, J))), 128)), P.value.length === 0 ? (j(), x("li", ne, F(I(a)("common.noMatches")), 1)) : b("", !0)], 8, q), [[ee, l.value]])], 2));
	}
}), [["__scopeId", "data-v-1f9bb8a7"]]), re = 3 / 2;
function ie(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function X(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function ae(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * re + t + n;
}
function Z(e) {
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
var oe = { class: "media-grid-root" }, Q = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, $ = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, se = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
		let i = e, a = r, o = n(), s = v(() => i.cardSize ?? o.cardSize ?? 180), c = M(null), u = M(null), d = M(0), f = M(0), p = M(0);
		function m() {
			let e = c.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (d.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (f.value = n), p.value = Math.max(0, -t.top);
		}
		let h = 0;
		function y() {
			h ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				h = 0, m();
			});
		}
		let T = v(() => ie(d.value, s.value, 20)), D = v(() => ae(X(d.value, T.value, 20))), F = v(() => d.value > 0 && D.value > 0), I = v(() => Z({
			scrollTop: p.value,
			viewportHeight: f.value,
			rowHeight: D.value,
			columns: T.value,
			itemCount: i.items.length,
			overscan: i.overscan
		})), L = v(() => {
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
		}), R = v(() => ({ gridTemplateColumns: F.value ? `repeat(${T.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), ee = v(() => F.value ? { height: `${I.value.totalHeight}px` } : {}), V = v(() => F.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${I.value.padTop}px)`
		} : {}), H = v(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), U = v(() => F.value && p.value > f.value * 1.5);
		function W() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let G = null;
		function K() {
			G || typeof IntersectionObserver > "u" || (G = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && i.hasMore && !i.loading && !i.loadingMore && a("load-more");
			}, { rootMargin: "400px 0px" }), u.value && G.observe(u.value));
		}
		function q() {
			G?.disconnect(), G = null;
		}
		z(() => u.value, (e) => {
			q(), e && (K(), y());
		});
		let J = null;
		function te() {
			J || typeof ResizeObserver > "u" || !c.value || (J = new ResizeObserver(y), J.observe(c.value));
		}
		function ne() {
			J?.disconnect(), J = null;
		}
		return z(() => c.value, (e) => {
			ne(), e && (te(), y());
		}), A(() => {
			m(), typeof window < "u" && (window.addEventListener("scroll", y, { passive: !0 }), window.addEventListener("resize", y, { passive: !0 })), te(), K();
		}), k(() => {
			typeof window < "u" && (window.removeEventListener("scroll", y), window.removeEventListener("resize", y)), h &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(h) : clearTimeout(h), 0), ne(), q();
		}), z(() => i.items.length, () => E(y)), (n, r) => (j(), x("div", oe, [e.loading && e.items.length === 0 ? (j(), x("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: O(H.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(j(!0), x(g, null, N(e.skeletonCount, (e) => (j(), x("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			S("div", { class: "skel-poster" }, null, -1),
			S("div", { class: "skel-title" }, null, -1),
			S("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (j(), x("div", Q, [P(n.$slots, "empty", {}, () => [
			w(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= S("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= S("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (j(), x(g, { key: 2 }, [
			S("div", {
				ref_key: "sizerEl",
				ref: c,
				class: "media-grid-sizer",
				style: O(ee.value)
			}, [S("div", {
				class: "media-grid",
				style: O([R.value, V.value])
			}, [(j(!0), x(g, null, N(L.value, (e) => P(n.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [w(l, {
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
			e.loadingMore ? (j(), x("div", $, [...r[3] ||= [S("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), C(" Loading more… ", -1)]])) : b("", !0),
			e.hasMore && !e.loadingMore ? (j(), x("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: u,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : b("", !0)
		], 64)), w(_, { name: "media-grid-fade" }, {
			default: B(() => [U.value ? (j(), x("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: W
			}, [w(t, { name: "arrow-up" })])) : b("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-10283a5e"]]), ce = /*#__PURE__*/ e(/* @__PURE__ */ T({
	__name: "HomeRow",
	props: {
		row: {},
		apiBase: {},
		limit: { default: 18 }
	},
	emits: [
		"items-loaded",
		"play",
		"watchlist",
		"info",
		"see-all"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = h(), s = M([]), c = M(null), l = M(!1), d = M(null), f = M(!1), p = M(null), m = null, g = null, _ = !1;
		function v(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function y() {
			if (!l.value) {
				l.value = !0, d.value = null, g = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new a({ baseUrl: n.apiBase }), t = o(n.apiBase, {
						...n.row.query,
						limit: n.limit,
						offset: 0
					}), i = await e.get(t, void 0, g?.signal);
					if (_) return;
					s.value = i.items ?? [], c.value = typeof i.total == "number" ? i.total : s.value.length, f.value = !0, r("items-loaded", s.value);
				} catch (e) {
					if (_ || v(e)) return;
					d.value = e instanceof Error ? e.message : "Failed to load", i.error(`Couldn't load "${n.row.title}"`);
				} finally {
					_ || (l.value = !1);
				}
			}
		}
		function b() {
			if (typeof IntersectionObserver > "u" || !p.value) {
				y();
				return;
			}
			m = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (m?.disconnect(), m = null, y());
			}, { rootMargin: "300px" }), m.observe(p.value);
		}
		return A(b), k(() => {
			_ = !0, g?.abort(), g = null, m?.disconnect(), m = null;
		}), (t, n) => (j(), x("div", {
			ref_key: "rootEl",
			ref: p
		}, [w(u, {
			title: e.row.title,
			items: s.value,
			loading: l.value || !f.value && !d.value,
			error: d.value,
			count: c.value,
			"hide-when-empty": "",
			onRetry: y,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, {
			action: B(() => [S("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => r("see-all", e.row)
			}, "See all")]),
			_: 1
		}, 8, [
			"title",
			"items",
			"loading",
			"error",
			"count"
		])], 512));
	}
}), [["__scopeId", "data-v-b5885f8f"]]), le = 6e4, ue = 250;
function de(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var fe = W("media", () => {
	let e = M([]), t = M(0), n = M(!1), r = M(null), o = M(""), s = M([]), c = M(void 0), l = M(void 0), u = M([]), d = M([]), f = M("name"), p = M("asc"), m = M(24), h = M(0), g = v(() => e.value.length < t.value), _ = v(() => {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = s.value), c.value !== void 0 && (e.yearFrom = c.value), l.value !== void 0 && (e.yearTo = l.value), u.value.length && (e.ratings = u.value), d.value.length && (e.types = d.value), e.sort = f.value, e.order = p.value, e.limit = m.value, e.offset = h.value, e;
	}), y = v(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), b = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], x = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function S(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function C(e, t) {
		return `${e}/api/v1/media?${S(t).toString()}`;
	}
	function w(e) {
		return S(e).toString();
	}
	let T = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), D = null, O = null, k;
	function A(e) {
		return !!e && Date.now() - e.ts < le;
	}
	function j(e, t, n, r) {
		r && (O && n !== D && O.abort(), D = n);
		let i = E.get(n);
		if (i) return r && (O = i.controller), i.promise;
		let o = new AbortController();
		r && (O = o);
		let s = new a({ baseUrl: e }).get(C(e, t), void 0, o.signal).then((e) => (T.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			E.delete(n);
		});
		return E.set(n, {
			promise: s,
			controller: o
		}), s;
	}
	function N(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total;
	}
	async function P(e, t = !1) {
		let a = { ..._.value }, o = w(a), s = T.get(o);
		if (A(s)) {
			N(s, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await j(e, a, o, !t);
			if (!t && o !== D) return;
			N(n, t);
		} catch (e) {
			if (de(e)) return;
			(t || o === D) && (r.value = i(e, "Failed to load media"));
		} finally {
			(t || o === D) && (n.value = !1);
		}
	}
	function F(e, t = ue) {
		h.value = 0, clearTimeout(k), k = setTimeout(() => P(e, !1), t);
	}
	async function I(t) {
		n.value || !g.value || (h.value = e.value.length, await P(t, !0));
	}
	async function L(e, t = {}) {
		let n = {
			..._.value,
			...t
		}, r = w(n);
		if (!A(T.get(r))) try {
			await j(e, n, r, !1);
		} catch {}
	}
	function R() {
		T.clear();
	}
	function ee() {
		clearTimeout(k);
	}
	function z() {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = [...s.value]), c.value !== void 0 && (e.yearFrom = String(c.value)), l.value !== void 0 && (e.yearTo = String(l.value)), u.value.length && (e.ratings = [...u.value]), d.value.length && (e.types = [...d.value]), f.value !== "name" && (e.sort = f.value), p.value !== "asc" && (e.order = p.value), e;
	}
	function B(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function V(e) {
		o.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", s.value = B(e.genres), u.value = B(e.ratings), d.value = B(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		c.value = t ? Number(t) : void 0, l.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		f.value = r ?? "name", p.value = i ?? "asc", h.value = 0;
	}
	function H() {
		e.value = [], t.value = 0, h.value = 0, r.value = null;
	}
	function U(e) {
		o.value = e, h.value = 0;
	}
	function W(e) {
		s.value = e, h.value = 0;
	}
	function G(e, t) {
		c.value = e, l.value = t, h.value = 0;
	}
	function K(e) {
		u.value = e, h.value = 0;
	}
	function q(e) {
		d.value = e, h.value = 0;
	}
	function J(e, t) {
		f.value = e, t && (p.value = t), h.value = 0;
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
		offset: h,
		hasMore: g,
		queryParams: _,
		availableGenres: y,
		availableRatings: b,
		availableTypes: x,
		fetchMedia: P,
		scheduleFetch: F,
		loadMore: I,
		prefetch: L,
		clearCache: R,
		cancelScheduled: ee,
		toQuery: z,
		applyQuery: V,
		reset: H,
		setSearch: U,
		setGenres: W,
		setYearRange: G,
		setRatings: K,
		setTypes: q,
		setSort: J
	};
}), pe = { class: "filterbar__main" }, me = { class: "filterbar__search" }, he = { class: "filterbar__sort" }, ge = ["aria-label"], _e = ["aria-expanded"], ve = { class: "filterbar__advanced" }, ye = { class: "filterbar__field" }, be = { class: "filterbar__field" }, xe = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Se = { class: "filterbar__field" }, Ce = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, we = { class: "filterbar__field" }, Te = { class: "filterbar__years" }, Ee = { class: "filterbar__field filterbar__presets" }, De = { class: "filterbar__chips" }, Oe = {
	key: 0,
	class: "filterbar__presets-empty"
}, ke = {
	key: 0,
	class: "filterbar__preset-save"
}, Ae = ["onKeydown"], je = ["disabled"], Me = { class: "filterbar__active" }, Ne = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Pe = { class: "filterbar__pills" }, Fe = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
		let i = e, a = r, o = fe(), l = n(), u = [
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
		], d = M(o.search), f;
		z(() => o.search, (e) => {
			e !== d.value.trim() && (d.value = e);
		});
		function p() {
			clearTimeout(f), f = setTimeout(() => {
				o.setSearch(d.value.trim()), a("change");
			}, i.searchDebounce);
		}
		function h() {
			d.value = "", o.setSearch(""), a("change");
		}
		let T = M(null), E = M(0), O = v(() => o.availableGenres.filter((e) => !o.selectedGenres.includes(e)));
		function P(e) {
			if (e == null || e === "") return;
			let t = String(e);
			o.selectedGenres.includes(t) || (o.setGenres([...o.selectedGenres, t]), a("change")), T.value = null, E.value++;
		}
		function L(e) {
			let t = o.selectedRatings;
			o.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		function W(e) {
			let t = o.selectedTypes;
			o.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		let G = v(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), K = v(() => {
			let e = [];
			for (let t = G.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function q(e) {
			o.setYearRange(e == null || e === "" ? void 0 : Number(e), o.yearTo), a("change");
		}
		function J(e) {
			o.setYearRange(o.yearFrom, e == null || e === "" ? void 0 : Number(e)), a("change");
		}
		function te(e) {
			o.setSort(e), a("change");
		}
		function ne() {
			o.order = o.order === "asc" ? "desc" : "asc", o.offset = 0, a("change");
		}
		let re = v(() => {
			let e = [];
			return o.search && e.push({
				key: "search",
				label: `“${o.search}”`,
				remove: h
			}), o.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					o.setGenres(o.selectedGenres.filter((e) => e !== t)), a("change");
				}
			})), o.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => L(t)
			})), o.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => W(t)
			})), o.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${o.yearFrom}`,
				remove: () => q(null)
			}), o.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${o.yearTo}`,
				remove: () => J(null)
			}), e;
		}), ie = v(() => re.value.length > 0), X = v(() => o.selectedGenres.length + o.selectedRatings.length + o.selectedTypes.length + (o.yearFrom === void 0 ? 0 : 1) + (o.yearTo === void 0 ? 0 : 1));
		function ae() {
			d.value = "", o.setSearch(""), o.setGenres([]), o.setRatings([]), o.setTypes([]), o.setYearRange(void 0, void 0), a("change");
		}
		let Z = M(!1), oe = v(() => l.filterPresets), Q = M(!1), $ = M("");
		function se() {
			Q.value = !0, $.value = "";
		}
		function ce() {
			let e = $.value.trim();
			e && (l.saveFilterPreset(e, o.toQuery()), Q.value = !1, $.value = "");
		}
		function le(e) {
			o.applyQuery(e.query), d.value = o.search, a("change");
		}
		function ue(e) {
			l.removeFilterPreset(e.id);
		}
		let de = M(!1);
		function Fe() {
			typeof window > "u" || (de.value = window.scrollY > 24);
		}
		return A(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Fe, { passive: !0 }), Fe());
		}), k(() => {
			clearTimeout(f), typeof window < "u" && window.removeEventListener("scroll", Fe);
		}), (n, r) => (j(), x("div", { class: D(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && de.value
		}]) }, [
			S("div", pe, [
				S("label", me, [
					w(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					V(S("input", {
						"onUpdate:modelValue": r[0] ||= (e) => d.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: p
					}, null, 544), [[R, d.value]]),
					d.value ? (j(), x("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: h
					}, [w(t, { name: "x" })])) : b("", !0)
				]),
				S("div", he, [w(m, {
					"model-value": I(o).sort,
					options: u,
					label: "Sort by",
					"onUpdate:modelValue": te
				}, null, 8, ["model-value"]), S("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${I(o).order === "asc" ? "ascending" : "descending"}`,
					onClick: ne
				}, [w(t, { name: I(o).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, ge)]),
				S("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": Z.value,
					onClick: r[1] ||= (e) => Z.value = !Z.value
				}, [
					w(t, { name: "filter" }),
					r[4] ||= S("span", null, "Filters", -1),
					X.value ? (j(), y(s, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: B(() => [C(F(X.value), 1)]),
						_: 1
					})) : b("", !0),
					w(t, {
						name: Z.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, _e)
			]),
			w(_, { name: "filterbar-panel" }, {
				default: B(() => [V(S("div", ve, [
					S("div", ye, [r[5] ||= S("span", { class: "filterbar__field-label" }, "Genres", -1), (j(), y(Y, {
						key: E.value,
						"model-value": T.value,
						options: O.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": P
					}, null, 8, ["model-value", "options"]))]),
					S("div", be, [r[6] ||= S("span", { class: "filterbar__field-label" }, "Rating", -1), S("div", xe, [(j(!0), x(g, null, N(I(o).availableRatings, (e) => (j(), y(c, {
						key: e,
						selected: I(o).selectedRatings.includes(e),
						"onUpdate:selected": (t) => L(e)
					}, {
						default: B(() => [C(F(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					S("div", Se, [r[7] ||= S("span", { class: "filterbar__field-label" }, "Type", -1), S("div", Ce, [(j(!0), x(g, null, N(I(o).availableTypes, (e) => (j(), y(c, {
						key: e,
						selected: I(o).selectedTypes.includes(e),
						"onUpdate:selected": (t) => W(e)
					}, {
						default: B(() => [C(F(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					S("div", we, [r[9] ||= S("span", { class: "filterbar__field-label" }, "Year", -1), S("div", Te, [
						w(Y, {
							"model-value": I(o).yearFrom ?? null,
							options: K.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": q
						}, null, 8, ["model-value", "options"]),
						r[8] ||= S("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						w(Y, {
							"model-value": I(o).yearTo ?? null,
							options: K.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": J
						}, null, 8, ["model-value", "options"])
					])]),
					S("div", Ee, [
						r[12] ||= S("span", { class: "filterbar__field-label" }, "Presets", -1),
						S("div", De, [(j(!0), x(g, null, N(oe.value, (e) => (j(), y(c, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => le(e),
							onRemove: (t) => ue(e)
						}, {
							default: B(() => [C(F(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), oe.value.length ? b("", !0) : (j(), x("span", Oe, "No saved presets"))]),
						Q.value ? (j(), x("div", ke, [V(S("input", {
							"onUpdate:modelValue": r[2] ||= (e) => $.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [H(U(ce, ["prevent"]), ["enter"]), r[3] ||= H((e) => Q.value = !1, ["esc"])]
						}, null, 40, Ae), [[R, $.value]]), S("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ce
						}, [w(t, { name: "check" }), r[10] ||= C(" Save ", -1)])])) : (j(), x("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !ie.value,
							onClick: se
						}, [w(t, { name: "plus" }), r[11] ||= C(" Save current ", -1)], 8, je))
					])
				], 512), [[ee, Z.value]])]),
				_: 1
			}),
			S("div", Me, [S("span", Ne, [S("b", null, F(I(o).total.toLocaleString()), 1), C(" " + F(I(o).total === 1 ? "title" : "titles"), 1)]), ie.value ? (j(), x(g, { key: 0 }, [S("div", Pe, [(j(!0), x(g, null, N(re.value, (e) => (j(), y(c, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: B(() => [C(F(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), S("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: ae
			}, "Clear all")], 64)) : b("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-3584cf2c"]]);
//#endregion
export { Y as a, se as i, fe as n, ce as r, Fe as t };

//# sourceMappingURL=FilterBar-B4zzOQ0y.js.map