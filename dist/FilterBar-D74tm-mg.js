import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-BFFMWKZp.js";
import { c as r, n as i } from "./Button-GJ9vHE0J.js";
import { n as a } from "./media-query-DowsWq-z.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { i as s, n as c, t as l } from "./MediaRow-D4X62E_J.js";
import { i as u, n as d, r as f, t as p } from "./Select-CKC9vNUQ.js";
import { t as m } from "./useToastStore-BDoKlU6N.js";
import { Fragment as h, Transition as g, computed as _, createBlock as v, createCommentVNode as y, createElementBlock as b, createElementVNode as x, createTextVNode as S, createVNode as C, defineComponent as w, nextTick as T, normalizeClass as E, normalizeStyle as D, onBeforeUnmount as O, onMounted as k, openBlock as A, ref as j, renderList as M, renderSlot as N, toDisplayString as P, unref as F, useId as I, vModelText as L, vShow as ee, watch as R, withCtx as z, withDirectives as B, withKeys as V, withModifiers as H } from "vue";
import { defineStore as U } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var W = { class: "phlix-combobox__field" }, G = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], K = ["id", "aria-label"], q = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], J = { class: "phlix-combobox__check" }, te = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, Y = /*#__PURE__*/ e(/* @__PURE__ */ w({
	__name: "Combobox",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Search…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = _(() => u(r.options)), o = I(), s = j(!1), c = j(-1), l = j(""), p = j(!1), m = j(null), g = j(null), w = j(null), D = _(() => a.value.find((e) => e.value === r.modelValue)?.label ?? ""), k = _(() => {
			if (!p.value || l.value.trim() === "") return a.value;
			let e = l.value.toLowerCase();
			return a.value.filter((t) => t.label.toLowerCase().includes(e));
		}), N = _(() => c.value >= 0 ? `${o}-opt-${c.value}` : void 0);
		R(() => r.modelValue, () => {
			s.value || (l.value = D.value);
		}, { immediate: !0 });
		function L() {
			r.disabled || s.value || (s.value = !0, c.value = k.value.findIndex((e) => e.value === r.modelValue), c.value < 0 && (c.value = k.value.findIndex((e) => !e.disabled)), T(U));
		}
		function z() {
			l.value = D.value, p.value = !1, s.value = !1;
		}
		function V(e) {
			let t = k.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (i("update:modelValue", t.value), i("change", t.value)), l.value = t.label, p.value = !1, s.value = !1, g.value?.focus());
		}
		function H(e) {
			k.value.length !== 0 && (c.value = f(k.value, c.value, e), T(U));
		}
		function U() {
			w.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function Y(e) {
			l.value = e.target.value, p.value = !0, s.value = !0, c.value = d(k.value, "first");
		}
		function ne(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), s.value ? H(1) : L();
					break;
				case "ArrowUp":
					e.preventDefault(), s.value ? H(-1) : L();
					break;
				case "Enter":
					s.value && c.value >= 0 && (e.preventDefault(), V(c.value));
					break;
				case "Escape":
					s.value && (e.preventDefault(), z());
					break;
				case "Tab":
					s.value && z();
					break;
			}
		}
		function X(e) {
			s.value && m.value && !m.value.contains(e.target) && z();
		}
		return R(s, (e) => {
			e ? document.addEventListener("pointerdown", X, !0) : document.removeEventListener("pointerdown", X, !0);
		}), O(() => document.removeEventListener("pointerdown", X, !0)), (n, r) => (A(), b("div", {
			ref_key: "rootEl",
			ref: m,
			class: E(["phlix-combobox", {
				"is-open": s.value,
				"is-disabled": e.disabled
			}])
		}, [x("div", W, [
			C(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			x("input", {
				ref_key: "inputEl",
				ref: g,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": s.value,
				"aria-controls": s.value ? `${F(o)}-list` : void 0,
				"aria-activedescendant": s.value ? N.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder,
				disabled: e.disabled,
				value: l.value,
				onInput: Y,
				onFocus: L,
				onKeydown: ne
			}, null, 40, G),
			C(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), B(x("ul", {
			id: `${F(o)}-list`,
			ref_key: "listEl",
			ref: w,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(A(!0), b(h, null, M(k.value, (n, r) => (A(), b("li", {
			id: `${F(o)}-opt-${r}`,
			key: n.value,
			class: E(["phlix-combobox__option", {
				"is-active": r === c.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => V(r),
			onPointermove: (e) => !n.disabled && (c.value = r)
		}, [x("span", J, [n.value === e.modelValue ? (A(), v(t, {
			key: 0,
			name: "check"
		})) : y("", !0)]), S(" " + P(n.label), 1)], 42, q))), 128)), k.value.length === 0 ? (A(), b("li", te, "No matches")) : y("", !0)], 8, K), [[ee, s.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), ne = 3 / 2;
function X(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function re(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function ie(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * ne + t + n;
}
function ae(e) {
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
var Z = { class: "media-grid-root" }, oe = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, Q = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, $ = /*#__PURE__*/ e(/* @__PURE__ */ w({
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
		let i = e, a = r, o = n(), s = _(() => i.cardSize ?? o.cardSize ?? 180), l = j(null), u = j(null), d = j(0), f = j(0), p = j(0);
		function m() {
			let e = l.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (d.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (f.value = n), p.value = Math.max(0, -t.top);
		}
		let v = 0;
		function w() {
			v ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				v = 0, m();
			});
		}
		let E = _(() => X(d.value, s.value, 20)), P = _(() => ie(re(d.value, E.value, 20))), F = _(() => d.value > 0 && P.value > 0), I = _(() => ae({
			scrollTop: p.value,
			viewportHeight: f.value,
			rowHeight: P.value,
			columns: E.value,
			itemCount: i.items.length,
			overscan: i.overscan
		})), L = _(() => {
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
		}), ee = _(() => ({ gridTemplateColumns: F.value ? `repeat(${E.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), B = _(() => F.value ? { height: `${I.value.totalHeight}px` } : {}), V = _(() => F.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${I.value.padTop}px)`
		} : {}), H = _(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${s.value}px, 1fr))` })), U = _(() => F.value && p.value > f.value * 1.5);
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
		R(() => u.value, (e) => {
			q(), e && (K(), w());
		});
		let J = null;
		function te() {
			J || typeof ResizeObserver > "u" || !l.value || (J = new ResizeObserver(w), J.observe(l.value));
		}
		function Y() {
			J?.disconnect(), J = null;
		}
		return R(() => l.value, (e) => {
			Y(), e && (te(), w());
		}), k(() => {
			m(), typeof window < "u" && (window.addEventListener("scroll", w, { passive: !0 }), window.addEventListener("resize", w, { passive: !0 })), te(), K();
		}), O(() => {
			typeof window < "u" && (window.removeEventListener("scroll", w), window.removeEventListener("resize", w)), v &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(v) : clearTimeout(v), 0), Y(), q();
		}), R(() => i.items.length, () => T(w)), (n, r) => (A(), b("div", Z, [e.loading && e.items.length === 0 ? (A(), b("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: D(H.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(A(!0), b(h, null, M(e.skeletonCount, (e) => (A(), b("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			x("div", { class: "skel-poster" }, null, -1),
			x("div", { class: "skel-title" }, null, -1),
			x("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (A(), b("div", oe, [N(n.$slots, "empty", {}, () => [
			C(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= x("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= x("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (A(), b(h, { key: 2 }, [
			x("div", {
				ref_key: "sizerEl",
				ref: l,
				class: "media-grid-sizer",
				style: D(B.value)
			}, [x("div", {
				class: "media-grid",
				style: D([ee.value, V.value])
			}, [(A(!0), b(h, null, M(L.value, (e) => N(n.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [C(c, {
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
			e.loadingMore ? (A(), b("div", Q, [...r[3] ||= [x("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), S(" Loading more… ", -1)]])) : y("", !0),
			e.hasMore && !e.loadingMore ? (A(), b("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: u,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : y("", !0)
		], 64)), C(g, { name: "media-grid-fade" }, {
			default: z(() => [U.value ? (A(), b("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: W
			}, [C(t, { name: "arrow-up" })])) : y("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), se = /*#__PURE__*/ e(/* @__PURE__ */ w({
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
		let n = e, r = t, o = m(), s = j([]), c = j(null), u = j(!1), d = j(null), f = j(!1), p = j(null), h = null, g = null, _ = !1;
		function v(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function y() {
			if (!u.value) {
				u.value = !0, d.value = null, g = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new i({ baseUrl: n.apiBase }), t = a(n.apiBase, {
						...n.row.query,
						limit: n.limit,
						offset: 0
					}), o = await e.get(t, void 0, g?.signal);
					if (_) return;
					s.value = o.items ?? [], c.value = typeof o.total == "number" ? o.total : s.value.length, f.value = !0, r("items-loaded", s.value);
				} catch (e) {
					if (_ || v(e)) return;
					d.value = e instanceof Error ? e.message : "Failed to load", o.error(`Couldn't load "${n.row.title}"`);
				} finally {
					_ || (u.value = !1);
				}
			}
		}
		function S() {
			if (typeof IntersectionObserver > "u" || !p.value) {
				y();
				return;
			}
			h = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (h?.disconnect(), h = null, y());
			}, { rootMargin: "300px" }), h.observe(p.value);
		}
		return k(S), O(() => {
			_ = !0, g?.abort(), g = null, h?.disconnect(), h = null;
		}), (t, n) => (A(), b("div", {
			ref_key: "rootEl",
			ref: p
		}, [C(l, {
			title: e.row.title,
			items: s.value,
			loading: u.value || !f.value && !d.value,
			error: d.value,
			count: c.value,
			"hide-when-empty": "",
			onRetry: y,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, {
			action: z(() => [x("button", {
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
}), [["__scopeId", "data-v-fb0faca3"]]), ce = 6e4, le = 250;
function ue(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var de = U("media", () => {
	let e = j([]), t = j(0), n = j(!1), a = j(null), o = j(""), s = j([]), c = j(void 0), l = j(void 0), u = j([]), d = j([]), f = j("name"), p = j("asc"), m = j(24), h = j(0), g = _(() => e.value.length < t.value), v = _(() => {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = s.value), c.value !== void 0 && (e.yearFrom = c.value), l.value !== void 0 && (e.yearTo = l.value), u.value.length && (e.ratings = u.value), d.value.length && (e.types = d.value), e.sort = f.value, e.order = p.value, e.limit = m.value, e.offset = h.value, e;
	}), y = _(() => {
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
		return !!e && Date.now() - e.ts < ce;
	}
	function M(e, t, n, r) {
		r && (O && n !== D && O.abort(), D = n);
		let a = E.get(n);
		if (a) return r && (O = a.controller), a.promise;
		let o = new AbortController();
		r && (O = o);
		let s = new i({ baseUrl: e }).get(C(e, t), void 0, o.signal).then((e) => (T.set(n, {
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
		let i = { ...v.value }, o = w(i), s = T.get(o);
		if (A(s)) {
			N(s, t), a.value = null;
			return;
		}
		n.value = !0, a.value = null;
		try {
			let n = await M(e, i, o, !t);
			if (!t && o !== D) return;
			N(n, t);
		} catch (e) {
			if (ue(e)) return;
			(t || o === D) && (a.value = r(e, "Failed to load media"));
		} finally {
			(t || o === D) && (n.value = !1);
		}
	}
	function F(e, t = le) {
		h.value = 0, clearTimeout(k), k = setTimeout(() => P(e, !1), t);
	}
	async function I(t) {
		n.value || !g.value || (h.value = e.value.length, await P(t, !0));
	}
	async function L(e, t = {}) {
		let n = {
			...v.value,
			...t
		}, r = w(n);
		if (!A(T.get(r))) try {
			await M(e, n, r, !1);
		} catch {}
	}
	function ee() {
		T.clear();
	}
	function R() {
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
		e.value = [], t.value = 0, h.value = 0, a.value = null;
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
		error: a,
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
		queryParams: v,
		availableGenres: y,
		availableRatings: b,
		availableTypes: x,
		fetchMedia: P,
		scheduleFetch: F,
		loadMore: I,
		prefetch: L,
		clearCache: ee,
		cancelScheduled: R,
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
}), fe = { class: "filterbar__main" }, pe = { class: "filterbar__search" }, me = { class: "filterbar__sort" }, he = ["aria-label"], ge = ["aria-expanded"], _e = { class: "filterbar__advanced" }, ve = { class: "filterbar__field" }, ye = { class: "filterbar__field" }, be = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, xe = { class: "filterbar__field" }, Se = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Ce = { class: "filterbar__field" }, we = { class: "filterbar__years" }, Te = { class: "filterbar__field filterbar__presets" }, Ee = { class: "filterbar__chips" }, De = {
	key: 0,
	class: "filterbar__presets-empty"
}, Oe = {
	key: 0,
	class: "filterbar__preset-save"
}, ke = ["onKeydown"], Ae = ["disabled"], je = { class: "filterbar__active" }, Me = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Ne = { class: "filterbar__pills" }, Pe = /*#__PURE__*/ e(/* @__PURE__ */ w({
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
		], d = j(c.search), f;
		R(() => c.search, (e) => {
			e !== d.value.trim() && (d.value = e);
		});
		function m() {
			clearTimeout(f), f = setTimeout(() => {
				c.setSearch(d.value.trim()), a("change");
			}, i.searchDebounce);
		}
		function w() {
			d.value = "", c.setSearch(""), a("change");
		}
		let T = j(null), D = j(0), N = _(() => c.availableGenres.filter((e) => !c.selectedGenres.includes(e)));
		function I(e) {
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
		let G = _(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), K = _(() => {
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
		function te(e) {
			c.setSort(e), a("change");
		}
		function ne() {
			c.order = c.order === "asc" ? "desc" : "asc", c.offset = 0, a("change");
		}
		let X = _(() => {
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
			})), c.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${c.yearFrom}`,
				remove: () => q(null)
			}), c.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${c.yearTo}`,
				remove: () => J(null)
			}), e;
		}), re = _(() => X.value.length > 0), ie = _(() => c.selectedGenres.length + c.selectedRatings.length + c.selectedTypes.length + (c.yearFrom === void 0 ? 0 : 1) + (c.yearTo === void 0 ? 0 : 1));
		function ae() {
			d.value = "", c.setSearch(""), c.setGenres([]), c.setRatings([]), c.setTypes([]), c.setYearRange(void 0, void 0), a("change");
		}
		let Z = j(!1), oe = _(() => l.filterPresets), Q = j(!1), $ = j("");
		function se() {
			Q.value = !0, $.value = "";
		}
		function ce() {
			let e = $.value.trim();
			e && (l.saveFilterPreset(e, c.toQuery()), Q.value = !1, $.value = "");
		}
		function le(e) {
			c.applyQuery(e.query), d.value = c.search, a("change");
		}
		function ue(e) {
			l.removeFilterPreset(e.id);
		}
		let Pe = j(!1);
		function Fe() {
			typeof window > "u" || (Pe.value = window.scrollY > 24);
		}
		return k(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Fe, { passive: !0 }), Fe());
		}), O(() => {
			clearTimeout(f), typeof window < "u" && window.removeEventListener("scroll", Fe);
		}), (n, r) => (A(), b("div", { class: E(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Pe.value
		}]) }, [
			x("div", fe, [
				x("label", pe, [
					C(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					B(x("input", {
						"onUpdate:modelValue": r[0] ||= (e) => d.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: m
					}, null, 544), [[L, d.value]]),
					d.value ? (A(), b("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: w
					}, [C(t, { name: "x" })])) : y("", !0)
				]),
				x("div", me, [C(p, {
					"model-value": F(c).sort,
					options: u,
					label: "Sort by",
					"onUpdate:modelValue": te
				}, null, 8, ["model-value"]), x("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${F(c).order === "asc" ? "ascending" : "descending"}`,
					onClick: ne
				}, [C(t, { name: F(c).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, he)]),
				x("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": Z.value,
					onClick: r[1] ||= (e) => Z.value = !Z.value
				}, [
					C(t, { name: "filter" }),
					r[4] ||= x("span", null, "Filters", -1),
					ie.value ? (A(), v(o, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: z(() => [S(P(ie.value), 1)]),
						_: 1
					})) : y("", !0),
					C(t, {
						name: Z.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, ge)
			]),
			C(g, { name: "filterbar-panel" }, {
				default: z(() => [B(x("div", _e, [
					x("div", ve, [r[5] ||= x("span", { class: "filterbar__field-label" }, "Genres", -1), (A(), v(Y, {
						key: D.value,
						"model-value": T.value,
						options: N.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": I
					}, null, 8, ["model-value", "options"]))]),
					x("div", ye, [r[6] ||= x("span", { class: "filterbar__field-label" }, "Rating", -1), x("div", be, [(A(!0), b(h, null, M(F(c).availableRatings, (e) => (A(), v(s, {
						key: e,
						selected: F(c).selectedRatings.includes(e),
						"onUpdate:selected": (t) => U(e)
					}, {
						default: z(() => [S(P(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					x("div", xe, [r[7] ||= x("span", { class: "filterbar__field-label" }, "Type", -1), x("div", Se, [(A(!0), b(h, null, M(F(c).availableTypes, (e) => (A(), v(s, {
						key: e,
						selected: F(c).selectedTypes.includes(e),
						"onUpdate:selected": (t) => W(e)
					}, {
						default: z(() => [S(P(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					x("div", Ce, [r[9] ||= x("span", { class: "filterbar__field-label" }, "Year", -1), x("div", we, [
						C(Y, {
							"model-value": F(c).yearFrom ?? null,
							options: K.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": q
						}, null, 8, ["model-value", "options"]),
						r[8] ||= x("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						C(Y, {
							"model-value": F(c).yearTo ?? null,
							options: K.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": J
						}, null, 8, ["model-value", "options"])
					])]),
					x("div", Te, [
						r[12] ||= x("span", { class: "filterbar__field-label" }, "Presets", -1),
						x("div", Ee, [(A(!0), b(h, null, M(oe.value, (e) => (A(), v(s, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => le(e),
							onRemove: (t) => ue(e)
						}, {
							default: z(() => [S(P(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), oe.value.length ? y("", !0) : (A(), b("span", De, "No saved presets"))]),
						Q.value ? (A(), b("div", Oe, [B(x("input", {
							"onUpdate:modelValue": r[2] ||= (e) => $.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [V(H(ce, ["prevent"]), ["enter"]), r[3] ||= V((e) => Q.value = !1, ["esc"])]
						}, null, 40, ke), [[L, $.value]]), x("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ce
						}, [C(t, { name: "check" }), r[10] ||= S(" Save ", -1)])])) : (A(), b("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !re.value,
							onClick: se
						}, [C(t, { name: "plus" }), r[11] ||= S(" Save current ", -1)], 8, Ae))
					])
				], 512), [[ee, Z.value]])]),
				_: 1
			}),
			x("div", je, [x("span", Me, [x("b", null, P(F(c).total.toLocaleString()), 1), S(" " + P(F(c).total === 1 ? "title" : "titles"), 1)]), re.value ? (A(), b(h, { key: 0 }, [x("div", Ne, [(A(!0), b(h, null, M(X.value, (e) => (A(), v(s, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: z(() => [S(P(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), x("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: ae
			}, "Clear all")], 64)) : y("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]);
//#endregion
export { Y as a, $ as i, de as n, se as r, Pe as t };

//# sourceMappingURL=FilterBar-D74tm-mg.js.map