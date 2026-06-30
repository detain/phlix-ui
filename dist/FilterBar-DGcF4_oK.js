import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n } from "./usePreferencesStore-FeMLCFE3.js";
import { t as r } from "./useMessages-CLrAkqxK.js";
import { f as i, l as a, t as o } from "./client-CZc6ehUa.js";
import { t as s } from "./Badge-ArWL5-WE.js";
import { t as c } from "./Chip-2HcSZF4a.js";
import { n as l, r as u, t as d } from "./listbox-htyKA_G5.js";
import { t as f } from "./Select-BR5EXV0L.js";
import { n as p } from "./MetadataMatchModal-H5-IXqpz.js";
import { n as m, t as h } from "./media-query-C8oxSF4h.js";
import { Fragment as g, Transition as _, computed as v, createBlock as y, createCommentVNode as b, createElementBlock as x, createElementVNode as S, createTextVNode as C, createVNode as w, defineComponent as T, nextTick as E, normalizeClass as D, normalizeStyle as O, onBeforeUnmount as ee, onMounted as te, openBlock as k, ref as A, renderList as j, renderSlot as M, toDisplayString as N, unref as P, useId as F, vModelText as I, vShow as L, watch as R, withCtx as z, withDirectives as B, withKeys as V, withModifiers as H } from "vue";
import { defineStore as U } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var ne = { class: "phlix-combobox__field" }, W = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], re = ["id", "aria-label"], ie = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], G = { class: "phlix-combobox__check" }, ae = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, K = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
		let i = e, { t: a } = r(), o = n, s = v(() => u(i.options)), c = F(), f = A(!1), p = A(-1), m = A(""), h = A(!1), _ = A(null), T = A(null), O = A(null), te = v(() => s.value.find((e) => e.value === i.modelValue)?.label ?? ""), M = v(() => {
			if (!h.value || m.value.trim() === "") return s.value;
			let e = m.value.toLowerCase();
			return s.value.filter((t) => t.label.toLowerCase().includes(e));
		}), I = v(() => p.value >= 0 ? `${c}-opt-${p.value}` : void 0);
		R(() => i.modelValue, () => {
			f.value || (m.value = te.value);
		}, { immediate: !0 });
		function z() {
			i.disabled || f.value || (f.value = !0, p.value = M.value.findIndex((e) => e.value === i.modelValue), p.value < 0 && (p.value = M.value.findIndex((e) => !e.disabled)), E(K));
		}
		function V() {
			m.value = te.value, h.value = !1, f.value = !1;
		}
		function H(e) {
			let t = M.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), m.value = t.label, h.value = !1, f.value = !1, T.value?.focus());
		}
		function U(e) {
			M.value.length !== 0 && (p.value = l(M.value, p.value, e), E(K));
		}
		function K() {
			O.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function q(e) {
			m.value = e.target.value, h.value = !0, f.value = !0, p.value = d(M.value, "first");
		}
		function oe(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), f.value ? U(1) : z();
					break;
				case "ArrowUp":
					e.preventDefault(), f.value ? U(-1) : z();
					break;
				case "Enter":
					f.value && p.value >= 0 && (e.preventDefault(), H(p.value));
					break;
				case "Escape":
					f.value && (e.preventDefault(), V());
					break;
				case "Tab":
					f.value && V();
					break;
			}
		}
		function J(e) {
			f.value && _.value && !_.value.contains(e.target) && V();
		}
		return R(f, (e) => {
			e ? document.addEventListener("pointerdown", J, !0) : document.removeEventListener("pointerdown", J, !0);
		}), ee(() => document.removeEventListener("pointerdown", J, !0)), (n, r) => (k(), x("div", {
			ref_key: "rootEl",
			ref: _,
			class: D(["phlix-combobox", {
				"is-open": f.value,
				"is-disabled": e.disabled
			}])
		}, [S("div", ne, [
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
				"aria-expanded": f.value,
				"aria-controls": f.value ? `${P(c)}-list` : void 0,
				"aria-activedescendant": f.value ? I.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? P(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: m.value,
				onInput: q,
				onFocus: z,
				onKeydown: oe
			}, null, 40, W),
			w(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), B(S("ul", {
			id: `${P(c)}-list`,
			ref_key: "listEl",
			ref: O,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(k(!0), x(g, null, j(M.value, (n, r) => (k(), x("li", {
			id: `${P(c)}-opt-${r}`,
			key: n.value,
			class: D(["phlix-combobox__option", {
				"is-active": r === p.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => H(r),
			onPointermove: (e) => !n.disabled && (p.value = r)
		}, [S("span", G, [n.value === e.modelValue ? (k(), y(t, {
			key: 0,
			name: "check"
		})) : b("", !0)]), C(" " + N(n.label), 1)], 42, ie))), 128)), M.value.length === 0 ? (k(), x("li", ae, N(P(a)("common.noMatches")), 1)) : b("", !0)], 8, re), [[L, f.value]])], 2));
	}
}), [["__scopeId", "data-v-1f9bb8a7"]]), q = 3 / 2;
function oe(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function J(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function Y(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * q + t + n;
}
function se(e, t) {
	return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(e, Math.trunc(t));
}
function ce(e, t, n) {
	return n.hasMore && !n.loading && !n.loadingMore && e >= t;
}
function le(e) {
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
var X = { class: "media-grid-root" }, ue = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, Z = {
	key: 1,
	class: "skel-card",
	"aria-hidden": "true"
}, Q = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, de = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove"
	],
	setup(e, { expose: r, emit: i }) {
		let a = e, o = i, s = n(), c = v(() => a.cardSize ?? s.cardSize ?? 180), l = A(null), u = A(null), d = A(0), f = A(0), m = A(0);
		function h() {
			let e = l.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (d.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (f.value = n), m.value = Math.max(0, -t.top);
		}
		let y = 0;
		function T() {
			y ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				y = 0, h();
			});
		}
		let D = v(() => oe(d.value, c.value, 20)), N = v(() => Y(J(d.value, D.value, 20))), P = v(() => d.value > 0 && N.value > 0), F = v(() => se(a.items.length, a.total)), I = v(() => le({
			scrollTop: m.value,
			viewportHeight: f.value,
			rowHeight: N.value,
			columns: D.value,
			itemCount: F.value,
			overscan: a.overscan
		})), L = v(() => {
			if (!P.value) return a.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = I.value, n = [];
			for (let r = e; r < t; r++) n.push({
				item: a.items[r] ?? null,
				index: r
			});
			return n;
		});
		R(() => [
			I.value.endIndex,
			a.items.length,
			a.hasMore,
			a.loading,
			a.loadingMore
		], ([e, t, n, r, i]) => {
			P.value && ce(e, t, {
				hasMore: n,
				loading: r,
				loadingMore: i
			}) && o("load-more");
		});
		let B;
		R(() => [
			P.value,
			I.value.startIndex,
			I.value.endIndex
		], ([e, t, n]) => {
			!e || n <= t || (clearTimeout(B), B = setTimeout(() => o("need-range", t, n), 120));
		}, { immediate: !0 });
		let V = v(() => ({ gridTemplateColumns: P.value ? `repeat(${D.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${c.value}px, 1fr))` })), H = v(() => P.value ? { height: `${I.value.totalHeight}px` } : {}), U = v(() => P.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${I.value.padTop}px)`
		} : {}), ne = v(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${c.value}px, 1fr))` })), W = v(() => P.value && m.value > f.value * 1.5);
		function re() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		function ie(e) {
			if (typeof window > "u" || !l.value) return;
			let t = Math.max(1, D.value), n = Math.floor(Math.max(0, e) / t) * N.value, r = window.scrollY + l.value.getBoundingClientRect().top;
			window.scrollTo?.({
				top: Math.max(0, r + n),
				behavior: "auto"
			});
		}
		r({ scrollToIndex: ie });
		let G = null;
		function ae() {
			G || typeof IntersectionObserver > "u" || (G = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && a.hasMore && !a.loading && !a.loadingMore && o("load-more");
			}, { rootMargin: "400px 0px" }), u.value && G.observe(u.value));
		}
		function K() {
			G?.disconnect(), G = null;
		}
		R(() => u.value, (e) => {
			K(), e && (ae(), T());
		});
		let q = null;
		function de() {
			q || typeof ResizeObserver > "u" || !l.value || (q = new ResizeObserver(T), q.observe(l.value));
		}
		function $() {
			q?.disconnect(), q = null;
		}
		return R(() => l.value, (e) => {
			$(), e && (de(), T());
		}), te(() => {
			h(), typeof window < "u" && (window.addEventListener("scroll", h, { passive: !0 }), window.addEventListener("resize", T, { passive: !0 })), de(), ae();
		}), ee(() => {
			typeof window < "u" && (window.removeEventListener("scroll", h), window.removeEventListener("resize", T)), y &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(y) : clearTimeout(y), 0), clearTimeout(B), $(), K();
		}), R(() => a.items.length, () => E(T)), (n, r) => (k(), x("div", X, [e.loading && e.items.length === 0 ? (k(), x("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: O(ne.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(k(!0), x(g, null, j(e.skeletonCount, (e) => (k(), x("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			S("div", { class: "skel-poster" }, null, -1),
			S("div", { class: "skel-title" }, null, -1),
			S("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (k(), x("div", ue, [M(n.$slots, "empty", {}, () => [
			w(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= S("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= S("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (k(), x(g, { key: 2 }, [
			S("div", {
				ref_key: "sizerEl",
				ref: l,
				class: "media-grid-sizer",
				style: O(H.value)
			}, [S("div", {
				class: "media-grid",
				style: O([V.value, U.value])
			}, [(k(!0), x(g, null, j(L.value, (t) => (k(), x(g, { key: t.item?.id ?? `skel-${t.index}` }, [t.item ? M(n.$slots, "card", {
				key: 0,
				item: t.item,
				index: t.index
			}, () => [w(p, {
				item: t.item,
				"can-match": e.canMatch,
				onPlay: (e) => o("play", t.item),
				onWatchlist: (e) => o("watchlist", t.item),
				onInfo: (e) => o("info", t.item),
				onMatch: (e) => o("match", t.item),
				onMarkWatched: (e) => o("mark-watched", t.item),
				onRefresh: (e) => o("refresh", t.item),
				onChoosePoster: (e) => o("choose-poster", t.item),
				onRemove: (e) => o("remove", t.item)
			}, null, 8, [
				"item",
				"can-match",
				"onPlay",
				"onWatchlist",
				"onInfo",
				"onMatch",
				"onMarkWatched",
				"onRefresh",
				"onChoosePoster",
				"onRemove"
			])], !0) : (k(), x("div", Z, [...r[3] ||= [
				S("div", { class: "skel-poster" }, null, -1),
				S("div", { class: "skel-title" }, null, -1),
				S("div", { class: "skel-sub" }, null, -1)
			]]))], 64))), 128))], 4)], 4),
			e.loadingMore ? (k(), x("div", Q, [...r[4] ||= [S("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), C(" Loading more… ", -1)]])) : b("", !0),
			e.hasMore && !e.loadingMore ? (k(), x("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: u,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : b("", !0)
		], 64)), w(_, { name: "media-grid-fade" }, {
			default: z(() => [W.value ? (k(), x("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: re
			}, [w(t, { name: "arrow-up" })])) : b("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-fb0abedf"]]), $ = 6e4, fe = 250;
function pe(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var me = U("media", () => {
	let e = A([]), t = A(0), n = A(!1), r = A(null), s = A(null), c = null, l = A(""), u = A([]), d = A(void 0), f = A(void 0), p = A([]), g = A([]), _ = A(""), y = A([]), b = A([]), x = A("name"), S = A("asc"), C = A(24), w = A(0), T = A(void 0), E = A(!1), D = v(() => e.value.length < t.value), O = v(() => {
		let e = {};
		return T.value && (e.libraryId = T.value), E.value && (e.topLevel = !0), l.value && (e.search = l.value), u.value.length && (e.genres = u.value), d.value !== void 0 && (e.yearFrom = d.value), f.value !== void 0 && (e.yearTo = f.value), p.value.length && (e.ratings = p.value), g.value.length && (e.types = g.value), _.value && (e.match = _.value), y.value.length && (e.actors = y.value), b.value.length && (e.companies = b.value), e.sort = x.value, e.order = S.value, e.limit = C.value, e.offset = w.value, e;
	}), ee = v(() => {
		if (s.value?.genres) return [...s.value.genres].sort();
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), te = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], k = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function j(e, t) {
		return m(e, t);
	}
	function M(e) {
		return h(e);
	}
	let N = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map(), I = null, L = null, R, z = 0;
	function B(e) {
		return !!e && Date.now() - e.ts < $;
	}
	function V(e, t, n, r) {
		r && (L && n !== I && L.abort(), I = n);
		let i = F.get(n);
		if (i) return r && (L = i.controller), i.promise;
		let a = new AbortController();
		r && (L = a), c ? c.setBaseUrl(e) : c = new o({ baseUrl: e });
		let s = c.get(j(e, t), void 0, a.signal).then((e) => (N.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			F.delete(n);
		});
		return F.set(n, {
			promise: s,
			controller: a
		}), s;
	}
	function H(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total, r || (z += 1);
	}
	function U(t, n) {
		if (n.length === 0) return;
		let r = e.value.slice();
		for (let e = 0; e < n.length; e++) r[t + e] = n[e];
		e.value = r;
	}
	async function ne(n, r, i) {
		let a = Math.max(1, C.value), o = t.value > 0 ? t.value : Math.max(i, 1), s = Math.max(0, Math.floor(Math.max(0, r) / a) * a), c = Math.min(o - 1, Math.max(s, i - 1)), l = z, u = [];
		for (let r = s; r <= c; r += a) {
			if (e.value[r] !== void 0) continue;
			let i = {
				...O.value,
				offset: r
			}, a = M(i), o = N.get(a);
			if (B(o)) {
				l === z && U(r, o.items), t.value ||= o.total;
				continue;
			}
			u.push(V(n, i, a, !1).then((e) => {
				l === z && (U(r, e.items), t.value ||= e.total);
			}).catch(() => {}));
		}
		u.length && await Promise.all(u);
	}
	async function W(e, t = !1) {
		let a = { ...O.value }, o = M(a), s = N.get(o);
		if (B(s)) {
			H(s, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await V(e, a, o, !t);
			if (!t && o !== I) return;
			H(n, t);
		} catch (e) {
			if (pe(e)) return;
			(t || o === I) && (r.value = i(e, "Failed to load media"));
		} finally {
			(t || o === I) && (n.value = !1);
		}
	}
	function re(e, t = fe) {
		w.value = 0, clearTimeout(R), R = setTimeout(() => W(e, !1), t);
	}
	async function ie(t) {
		n.value || !D.value || (w.value = e.value.length, await W(t, !0));
	}
	async function G(e, t = {}) {
		let n = {
			...O.value,
			...t
		}, r = M(n);
		if (!B(N.get(r))) try {
			await V(e, n, r, !1);
		} catch {}
	}
	function ae() {
		N.clear();
	}
	function K() {
		clearTimeout(R);
	}
	function q(e) {
		return e ?? "__all__";
	}
	async function oe(e) {
		let t = q(T.value), n = P.get(t);
		if (n && Date.now() - n.ts < $) {
			s.value = n.facets;
			return;
		}
		c ? c.setBaseUrl(e) : c = new o({ baseUrl: e });
		try {
			let e = {};
			T.value && (e.libraryId = T.value);
			let n = await c.get("/api/v1/media/facets", Object.keys(e).length ? e : void 0);
			s.value = n, P.set(t, {
				facets: n,
				ts: Date.now()
			});
		} catch (e) {
			e instanceof a && e.status === 404 && (s.value = null);
		}
	}
	function J() {
		let e = {};
		return l.value && (e.search = l.value), u.value.length && (e.genres = [...u.value]), d.value !== void 0 && (e.yearFrom = String(d.value)), f.value !== void 0 && (e.yearTo = String(f.value)), p.value.length && (e.ratings = [...p.value]), g.value.length && (e.types = [...g.value]), _.value && (e.match = _.value), y.value.length && (e.actors = [...y.value]), b.value.length && (e.companies = [...b.value]), x.value !== "name" && (e.sort = x.value), S.value !== "asc" && (e.order = S.value), e;
	}
	function Y(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function se(e) {
		l.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", u.value = Y(e.genres), p.value = Y(e.ratings), g.value = Y(e.types);
		let t = Array.isArray(e.match) ? e.match[0] : e.match;
		_.value = t === "matched" || t === "unmatched" ? t : "", y.value = Y(e.actors), b.value = Y(e.companies);
		let n = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, r = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		d.value = n ? Number(n) : void 0, f.value = r ? Number(r) : void 0;
		let i = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		x.value = i ?? "name", S.value = a ?? "asc", w.value = 0;
	}
	function ce() {
		e.value = [], t.value = 0, w.value = 0, r.value = null, c = null;
	}
	function le(e) {
		l.value = e, w.value = 0;
	}
	function X(e) {
		u.value = e, w.value = 0;
	}
	function ue(e, t) {
		d.value = e, f.value = t, w.value = 0;
	}
	function Z(e) {
		p.value = e, w.value = 0;
	}
	function Q(e) {
		g.value = e, w.value = 0;
	}
	function de(e) {
		_.value = e, w.value = 0;
	}
	function me(e) {
		y.value = e, w.value = 0;
	}
	function he(e) {
		b.value = e, w.value = 0;
	}
	function ge(e, t) {
		x.value = e, t && (S.value = t), w.value = 0;
	}
	function _e(e) {
		T.value !== e && (T.value = e, w.value = 0);
	}
	function ve(e) {
		E.value !== e && (E.value = e, w.value = 0);
	}
	function ye() {
		l.value = "", u.value = [], d.value = void 0, f.value = void 0, p.value = [], g.value = [], _.value = "", y.value = [], b.value = [], x.value = "name", S.value = "asc", w.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: r,
		serverFacets: s,
		search: l,
		selectedGenres: u,
		yearFrom: d,
		yearTo: f,
		selectedRatings: p,
		selectedTypes: g,
		matchStatus: _,
		selectedActors: y,
		selectedCompanies: b,
		sort: x,
		order: S,
		limit: C,
		offset: w,
		libraryId: T,
		topLevel: E,
		hasMore: D,
		queryParams: O,
		availableGenres: ee,
		availableRatings: te,
		availableTypes: k,
		fetchMedia: W,
		scheduleFetch: re,
		loadMore: ie,
		ensureRange: ne,
		prefetch: G,
		clearCache: ae,
		cancelScheduled: K,
		loadFacets: oe,
		toQuery: J,
		applyQuery: se,
		reset: ce,
		setSearch: le,
		setGenres: X,
		setYearRange: ue,
		setRatings: Z,
		setTypes: Q,
		setMatchStatus: de,
		setActors: me,
		setCompanies: he,
		setSort: ge,
		setLibraryId: _e,
		setTopLevel: ve,
		clearFilters: ye
	};
}), he = { class: "filterbar__main" }, ge = { class: "filterbar__search" }, _e = { class: "filterbar__sort" }, ve = ["aria-label"], ye = ["aria-expanded"], be = { class: "filterbar__advanced" }, xe = { class: "filterbar__field" }, Se = { class: "filterbar__field" }, Ce = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, we = { class: "filterbar__field" }, Te = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Ee = { class: "filterbar__field" }, De = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Metadata match status"
}, Oe = { class: "filterbar__field" }, ke = { class: "filterbar__years" }, Ae = { class: "filterbar__field filterbar__presets" }, je = { class: "filterbar__chips" }, Me = {
	key: 0,
	class: "filterbar__presets-empty"
}, Ne = {
	key: 0,
	class: "filterbar__preset-save"
}, Pe = ["onKeydown"], Fe = ["disabled"], Ie = { class: "filterbar__active" }, Le = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Re = { class: "filterbar__pills" }, ze = /*#__PURE__*/ e(/* @__PURE__ */ T({
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
		let i = e, a = r, o = me(), l = n(), u = [
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
		], d = A(o.search), p;
		R(() => o.search, (e) => {
			e !== d.value.trim() && (d.value = e);
		});
		function m() {
			clearTimeout(p), p = setTimeout(() => {
				o.setSearch(d.value.trim()), a("change");
			}, i.searchDebounce);
		}
		function h() {
			d.value = "", o.setSearch(""), a("change");
		}
		let T = A(null), E = A(0), O = v(() => o.availableGenres.filter((e) => !o.selectedGenres.includes(e)));
		function M(e) {
			if (e == null || e === "") return;
			let t = String(e);
			o.selectedGenres.includes(t) || (o.setGenres([...o.selectedGenres, t]), a("change")), T.value = null, E.value++;
		}
		function F(e) {
			let t = o.selectedRatings;
			o.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		function U(e) {
			let t = o.selectedTypes;
			o.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		let ne = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function W(e) {
			o.setMatchStatus(o.matchStatus === e ? "" : e), a("change");
		}
		function re(e) {
			o.setActors(o.selectedActors.filter((t) => t !== e)), a("change");
		}
		let ie = v(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), G = v(() => {
			let e = [];
			for (let t = ie.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function ae(e) {
			o.setYearRange(e == null || e === "" ? void 0 : Number(e), o.yearTo), a("change");
		}
		function q(e) {
			o.setYearRange(o.yearFrom, e == null || e === "" ? void 0 : Number(e)), a("change");
		}
		function oe(e) {
			o.setSort(e), a("change");
		}
		function J() {
			o.order = o.order === "asc" ? "desc" : "asc", o.offset = 0, a("change");
		}
		let Y = v(() => {
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
				remove: () => F(t)
			})), o.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => U(t)
			})), o.selectedActors.forEach((t) => e.push({
				key: `a:${t}`,
				label: t,
				remove: () => re(t)
			})), o.matchStatus && e.push({
				key: "match",
				label: o.matchStatus === "matched" ? "Matched" : "Unmatched",
				remove: () => W(o.matchStatus)
			}), o.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${o.yearFrom}`,
				remove: () => ae(null)
			}), o.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${o.yearTo}`,
				remove: () => q(null)
			}), e;
		}), se = v(() => Y.value.length > 0), ce = v(() => o.selectedGenres.length + o.selectedRatings.length + o.selectedTypes.length + o.selectedActors.length + +!!o.matchStatus + (o.yearFrom === void 0 ? 0 : 1) + (o.yearTo === void 0 ? 0 : 1));
		function le() {
			d.value = "", o.setSearch(""), o.setGenres([]), o.setRatings([]), o.setTypes([]), o.setActors([]), o.setMatchStatus(""), o.setYearRange(void 0, void 0), a("change");
		}
		let X = A(!1), ue = v(() => l.filterPresets), Z = A(!1), Q = A("");
		function de() {
			Z.value = !0, Q.value = "";
		}
		function $() {
			let e = Q.value.trim();
			e && (l.saveFilterPreset(e, o.toQuery()), Z.value = !1, Q.value = "");
		}
		function fe(e) {
			o.applyQuery(e.query), d.value = o.search, a("change");
		}
		function pe(e) {
			l.removeFilterPreset(e.id);
		}
		let ze = A(!1);
		function Be() {
			typeof window > "u" || (ze.value = window.scrollY > 24);
		}
		return te(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Be, { passive: !0 }), Be());
		}), ee(() => {
			clearTimeout(p), typeof window < "u" && window.removeEventListener("scroll", Be);
		}), (n, r) => (k(), x("div", { class: D(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ze.value
		}]) }, [
			S("div", he, [
				S("label", ge, [
					w(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					B(S("input", {
						"onUpdate:modelValue": r[0] ||= (e) => d.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: m
					}, null, 544), [[I, d.value]]),
					d.value ? (k(), x("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: h
					}, [w(t, { name: "x" })])) : b("", !0)
				]),
				S("div", _e, [w(f, {
					"model-value": P(o).sort,
					options: u,
					label: "Sort by",
					"onUpdate:modelValue": oe
				}, null, 8, ["model-value"]), S("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${P(o).order === "asc" ? "ascending" : "descending"}`,
					onClick: J
				}, [w(t, { name: P(o).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, ve)]),
				S("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": X.value,
					onClick: r[1] ||= (e) => X.value = !X.value
				}, [
					w(t, { name: "filter" }),
					r[4] ||= S("span", null, "Filters", -1),
					ce.value ? (k(), y(s, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: z(() => [C(N(ce.value), 1)]),
						_: 1
					})) : b("", !0),
					w(t, {
						name: X.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, ye)
			]),
			w(_, { name: "filterbar-panel" }, {
				default: z(() => [B(S("div", be, [
					S("div", xe, [r[5] ||= S("span", { class: "filterbar__field-label" }, "Genres", -1), (k(), y(K, {
						key: E.value,
						"model-value": T.value,
						options: O.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": M
					}, null, 8, ["model-value", "options"]))]),
					S("div", Se, [r[6] ||= S("span", { class: "filterbar__field-label" }, "Rating", -1), S("div", Ce, [(k(!0), x(g, null, j(P(o).availableRatings, (e) => (k(), y(c, {
						key: e,
						selected: P(o).selectedRatings.includes(e),
						"onUpdate:selected": (t) => F(e)
					}, {
						default: z(() => [C(N(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					S("div", we, [r[7] ||= S("span", { class: "filterbar__field-label" }, "Type", -1), S("div", Te, [(k(!0), x(g, null, j(P(o).availableTypes, (e) => (k(), y(c, {
						key: e,
						selected: P(o).selectedTypes.includes(e),
						"onUpdate:selected": (t) => U(e)
					}, {
						default: z(() => [C(N(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					S("div", Ee, [r[8] ||= S("span", { class: "filterbar__field-label" }, "Metadata", -1), S("div", De, [(k(), x(g, null, j(ne, (e) => w(c, {
						key: e.value,
						selected: P(o).matchStatus === e.value,
						"onUpdate:selected": (t) => W(e.value)
					}, {
						default: z(() => [C(N(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					S("div", Oe, [r[10] ||= S("span", { class: "filterbar__field-label" }, "Year", -1), S("div", ke, [
						w(K, {
							"model-value": P(o).yearFrom ?? null,
							options: G.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": ae
						}, null, 8, ["model-value", "options"]),
						r[9] ||= S("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						w(K, {
							"model-value": P(o).yearTo ?? null,
							options: G.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": q
						}, null, 8, ["model-value", "options"])
					])]),
					S("div", Ae, [
						r[13] ||= S("span", { class: "filterbar__field-label" }, "Presets", -1),
						S("div", je, [(k(!0), x(g, null, j(ue.value, (e) => (k(), y(c, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => fe(e),
							onRemove: (t) => pe(e)
						}, {
							default: z(() => [C(N(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ue.value.length ? b("", !0) : (k(), x("span", Me, "No saved presets"))]),
						Z.value ? (k(), x("div", Ne, [B(S("input", {
							"onUpdate:modelValue": r[2] ||= (e) => Q.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [V(H($, ["prevent"]), ["enter"]), r[3] ||= V((e) => Z.value = !1, ["esc"])]
						}, null, 40, Pe), [[I, Q.value]]), S("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: $
						}, [w(t, { name: "check" }), r[11] ||= C(" Save ", -1)])])) : (k(), x("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !se.value,
							onClick: de
						}, [w(t, { name: "plus" }), r[12] ||= C(" Save current ", -1)], 8, Fe))
					])
				], 512), [[L, X.value]])]),
				_: 1
			}),
			S("div", Ie, [S("span", Le, [S("b", null, N(P(o).total.toLocaleString()), 1), C(" " + N(P(o).total === 1 ? "title" : "titles"), 1)]), se.value ? (k(), x(g, { key: 0 }, [S("div", Re, [(k(!0), x(g, null, j(Y.value, (e) => (k(), y(c, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: z(() => [C(N(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), S("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: le
			}, "Clear all")], 64)) : b("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-ee7efac4"]]);
//#endregion
export { K as i, me as n, de as r, ze as t };

//# sourceMappingURL=FilterBar-DGcF4_oK.js.map