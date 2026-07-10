import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { a as n } from "./usePreferencesStore-aFj85Ytq.js";
import { t as r } from "./useMessages-tduf5S2N.js";
import { f as i, l as a, t as o } from "./client-DH50wjeq.js";
import { t as s } from "./Badge-Dq-pYhrz.js";
import { t as c } from "./Chip-CnJPGjy7.js";
import { n as l, r as u, t as d } from "./listbox-htyKA_G5.js";
import { t as f } from "./Select-BbdhXiRC.js";
import { n as p, t as m } from "./media-query-DKjhlX8r.js";
import { Fragment as h, Transition as g, computed as _, createBlock as v, createCommentVNode as y, createElementBlock as b, createElementVNode as x, createTextVNode as S, createVNode as C, defineComponent as w, nextTick as T, normalizeClass as E, onBeforeUnmount as D, onMounted as O, openBlock as k, ref as A, renderList as j, toDisplayString as M, unref as N, useId as ee, vModelText as P, vShow as F, watch as I, withCtx as L, withDirectives as R, withKeys as z, withModifiers as B } from "vue";
import { defineStore as V } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var H = { class: "phlix-combobox__field" }, U = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], W = ["id", "aria-label"], te = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], G = { class: "phlix-combobox__check" }, ne = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, K = /*#__PURE__*/ e(/* @__PURE__ */ w({
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
		let i = e, { t: a } = r(), o = n, s = _(() => u(i.options)), c = ee(), f = A(!1), p = A(-1), m = A(""), g = A(!1), w = A(null), O = A(null), P = A(null), L = _(() => s.value.find((e) => e.value === i.modelValue)?.label ?? ""), z = _(() => {
			if (!g.value || m.value.trim() === "") return s.value;
			let e = m.value.toLowerCase();
			return s.value.filter((t) => t.label.toLowerCase().includes(e));
		}), B = _(() => p.value >= 0 ? `${c}-opt-${p.value}` : void 0);
		I(() => i.modelValue, () => {
			f.value || (m.value = L.value);
		}, { immediate: !0 });
		function V() {
			i.disabled || f.value || (f.value = !0, p.value = z.value.findIndex((e) => e.value === i.modelValue), p.value < 0 && (p.value = z.value.findIndex((e) => !e.disabled)), T(Y));
		}
		function K() {
			m.value = L.value, g.value = !1, f.value = !1;
		}
		function q(e) {
			let t = z.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), m.value = t.label, g.value = !1, f.value = !1, O.value?.focus());
		}
		function J(e) {
			z.value.length !== 0 && (p.value = l(z.value, p.value, e), T(Y));
		}
		function Y() {
			P.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function re(e) {
			m.value = e.target.value, g.value = !0, f.value = !0, p.value = d(z.value, "first");
		}
		function ie(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), f.value ? J(1) : V();
					break;
				case "ArrowUp":
					e.preventDefault(), f.value ? J(-1) : V();
					break;
				case "Enter":
					f.value && p.value >= 0 && (e.preventDefault(), q(p.value));
					break;
				case "Escape":
					f.value && (e.preventDefault(), K());
					break;
				case "Tab":
					f.value && K();
					break;
			}
		}
		function X(e) {
			f.value && w.value && !w.value.contains(e.target) && K();
		}
		return I(f, (e) => {
			e ? document.addEventListener("pointerdown", X, !0) : document.removeEventListener("pointerdown", X, !0);
		}), D(() => document.removeEventListener("pointerdown", X, !0)), (n, r) => (k(), b("div", {
			ref_key: "rootEl",
			ref: w,
			class: E(["phlix-combobox", {
				"is-open": f.value,
				"is-disabled": e.disabled
			}])
		}, [x("div", H, [
			C(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			x("input", {
				ref_key: "inputEl",
				ref: O,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": f.value,
				"aria-controls": f.value ? `${N(c)}-list` : void 0,
				"aria-activedescendant": f.value ? B.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? N(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: m.value,
				onInput: re,
				onFocus: V,
				onKeydown: ie
			}, null, 40, U),
			C(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), R(x("ul", {
			id: `${N(c)}-list`,
			ref_key: "listEl",
			ref: P,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(k(!0), b(h, null, j(z.value, (n, r) => (k(), b("li", {
			id: `${N(c)}-opt-${r}`,
			key: n.value,
			class: E(["phlix-combobox__option", {
				"is-active": r === p.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => q(r),
			onPointermove: (e) => !n.disabled && (p.value = r)
		}, [x("span", G, [n.value === e.modelValue ? (k(), v(t, {
			key: 0,
			name: "check"
		})) : y("", !0)]), S(" " + M(n.label), 1)], 42, te))), 128)), z.value.length === 0 ? (k(), b("li", ne, M(N(a)("common.noMatches")), 1)) : y("", !0)], 8, W), [[F, f.value]])], 2));
	}
}), [["__scopeId", "data-v-9909c9c2"]]), q = 6e4, J = 250;
function Y(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var re = V("media", () => {
	let e = A([]), t = A(0), n = A(!1), r = A(null), s = A(null), c = null, l = A(""), u = A([]), d = A(void 0), f = A(void 0), h = A([]), g = A([]), v = A(""), y = A([]), b = A([]), x = A("name"), S = A("asc"), C = A(24), w = A(0), T = A(void 0), E = A(!1), D = A(void 0), O = A(void 0), k = _(() => e.value.length < t.value), j = _(() => {
		let e = {};
		return T.value && (e.libraryId = T.value), E.value && (e.topLevel = !0), l.value && (e.search = l.value), u.value.length && (e.genres = u.value), d.value !== void 0 && (e.yearFrom = d.value), f.value !== void 0 && (e.yearTo = f.value), h.value.length && (e.ratings = h.value), g.value.length && (e.types = g.value), v.value && (e.match = v.value), y.value.length && (e.actors = y.value), b.value.length && (e.companies = b.value), D.value !== void 0 && (e.minRating = D.value), O.value !== void 0 && (e.maxRating = O.value), e.sort = x.value, e.order = S.value, e.limit = C.value, e.offset = w.value, e;
	}), M = _(() => {
		if (s.value?.genres) return [...s.value.genres].sort();
		if (!e.value || e.value.length === 0) return [];
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), N = [
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
	function P(e, t) {
		return p(e, t);
	}
	function F(e) {
		return m(e);
	}
	let I = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), z = null, B = null, V, H = 0;
	function U(e) {
		return !!e && Date.now() - e.ts < q;
	}
	function W(e, t, n, r) {
		r && (B && n !== z && B.abort(), z = n);
		let i = R.get(n);
		if (i) return r && (B = i.controller), i.promise;
		let a = new AbortController();
		r && (B = a), c ? c.setBaseUrl(e) : c = new o({ baseUrl: e });
		let s = c.get(P(e, t), void 0, a.signal).then((e) => (I.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			R.delete(n);
		});
		return R.set(n, {
			promise: s,
			controller: a
		}), s;
	}
	function te(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total, r || (H += 1);
	}
	function G(t, n) {
		if (n.length === 0) return;
		let r = e.value.slice();
		for (let e = 0; e < n.length; e++) r[t + e] = n[e];
		e.value = r;
	}
	async function ne(n, r, i) {
		let a = Math.max(1, C.value), o = t.value > 0 ? t.value : Math.max(i, 1), s = Math.max(0, Math.floor(Math.max(0, r) / a) * a), c = Math.min(o - 1, Math.max(s, i - 1)), l = H, u = [];
		for (let r = s; r <= c; r += a) {
			if (e.value[r] !== void 0) continue;
			let i = {
				...j.value,
				offset: r
			}, a = F(i), o = I.get(a);
			if (U(o)) {
				l === H && G(r, o.items), t.value ||= o.total;
				continue;
			}
			u.push(W(n, i, a, !1).then((e) => {
				l === H && (G(r, e.items), t.value ||= e.total);
			}).catch(() => {}));
		}
		u.length && await Promise.all(u);
	}
	async function K(e, t = !1) {
		let a = { ...j.value }, o = F(a), s = I.get(o);
		if (U(s)) {
			te(s, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await W(e, a, o, !t);
			if (!t && o !== z) return;
			te(n, t);
		} catch (e) {
			if (Y(e)) return;
			(t || o === z) && (r.value = i(e, "Failed to load media"));
		} finally {
			(t || o === z) && (n.value = !1);
		}
	}
	function re(e, t = J) {
		w.value = 0, clearTimeout(V), V = setTimeout(() => K(e, !1), t);
	}
	async function ie(t) {
		n.value || !k.value || (w.value = e.value.length, await K(t, !0));
	}
	async function X(e, t = {}) {
		let n = {
			...j.value,
			...t
		}, r = F(n);
		if (!U(I.get(r))) try {
			await W(e, n, r, !1);
		} catch {}
	}
	function ae() {
		I.clear();
	}
	function oe() {
		clearTimeout(V);
	}
	function se(e) {
		return e ?? "__all__";
	}
	async function ce(e) {
		let t = se(T.value), n = L.get(t);
		if (n && Date.now() - n.ts < q) {
			s.value = n.facets;
			return;
		}
		c ? c.setBaseUrl(e) : c = new o({ baseUrl: e });
		try {
			let e = {};
			T.value && (e.libraryId = T.value);
			let n = await c.get("/api/v1/media/facets", Object.keys(e).length ? e : void 0);
			s.value = n, L.set(t, {
				facets: n,
				ts: Date.now()
			});
		} catch (e) {
			e instanceof a && e.status === 404 && (s.value = null);
		}
	}
	function le() {
		let e = {};
		return l.value && (e.search = l.value), u.value.length && (e.genres = [...u.value]), d.value !== void 0 && (e.yearFrom = String(d.value)), f.value !== void 0 && (e.yearTo = String(f.value)), h.value.length && (e.ratings = [...h.value]), g.value.length && (e.types = [...g.value]), v.value && (e.match = v.value), y.value.length && (e.actors = [...y.value]), b.value.length && (e.companies = [...b.value]), x.value !== "name" && (e.sort = x.value), S.value !== "asc" && (e.order = S.value), e;
	}
	function Z(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function ue(e) {
		l.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", u.value = Z(e.genres), h.value = Z(e.ratings), g.value = Z(e.types);
		let t = Array.isArray(e.match) ? e.match[0] : e.match;
		v.value = t === "matched" || t === "unmatched" ? t : "", y.value = Z(e.actors), b.value = Z(e.companies);
		let n = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, r = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		d.value = n ? Number(n) : void 0, f.value = r ? Number(r) : void 0;
		let i = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		x.value = i ?? "name", S.value = a ?? "asc", w.value = 0;
	}
	function de() {
		e.value = [], t.value = 0, w.value = 0, r.value = null, c = null;
	}
	function fe(e) {
		l.value = e, w.value = 0;
	}
	function pe(e) {
		u.value = e, w.value = 0;
	}
	function me(e, t) {
		d.value = e, f.value = t, w.value = 0;
	}
	function he(e) {
		h.value = e, w.value = 0;
	}
	function ge(e) {
		g.value = e, w.value = 0;
	}
	function _e(e) {
		v.value = e, w.value = 0;
	}
	function ve(e) {
		y.value = e, w.value = 0;
	}
	function ye(e) {
		b.value = e, w.value = 0;
	}
	let be = {
		name: "asc",
		year: "desc",
		rating: "desc",
		runtime: "desc",
		date_added: "desc",
		genre: "asc",
		artist: "asc"
	};
	function xe(e, t) {
		x.value = e, S.value = t ?? be[e], w.value = 0;
	}
	function Se(e) {
		T.value !== e && (T.value = e, w.value = 0);
	}
	function Ce(e) {
		E.value !== e && (E.value = e, w.value = 0);
	}
	function we() {
		l.value = "", u.value = [], d.value = void 0, f.value = void 0, h.value = [], g.value = [], v.value = "", y.value = [], b.value = [], D.value = void 0, O.value = void 0, x.value = "name", S.value = "asc", w.value = 0;
	}
	function Te(e) {
		D.value = e, w.value = 0;
	}
	function Ee(e) {
		O.value = e, w.value = 0;
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
		selectedRatings: h,
		selectedTypes: g,
		matchStatus: v,
		selectedActors: y,
		selectedCompanies: b,
		minRating: D,
		maxRating: O,
		sort: x,
		order: S,
		limit: C,
		offset: w,
		libraryId: T,
		topLevel: E,
		hasMore: k,
		queryParams: j,
		availableGenres: M,
		availableRatings: N,
		availableTypes: ee,
		fetchMedia: K,
		scheduleFetch: re,
		loadMore: ie,
		ensureRange: ne,
		prefetch: X,
		clearCache: ae,
		cancelScheduled: oe,
		loadFacets: ce,
		toQuery: le,
		applyQuery: ue,
		reset: de,
		setSearch: fe,
		setGenres: pe,
		setYearRange: me,
		setRatings: he,
		setTypes: ge,
		setMatchStatus: _e,
		setActors: ve,
		setCompanies: ye,
		setMinRating: Te,
		setMaxRating: Ee,
		setSort: xe,
		setLibraryId: Se,
		setTopLevel: Ce,
		clearFilters: we
	};
}), ie = { class: "filterbar__main" }, X = { class: "filterbar__search" }, ae = { class: "filterbar__sort" }, oe = ["aria-label"], se = ["aria-expanded"], ce = { class: "filterbar__advanced" }, le = { class: "filterbar__field" }, Z = { class: "filterbar__field" }, ue = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, de = { class: "filterbar__field" }, fe = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, pe = { class: "filterbar__field" }, me = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Metadata match status"
}, he = { class: "filterbar__field" }, ge = { class: "filterbar__years" }, _e = { class: "filterbar__field" }, ve = { class: "filterbar__ratings" }, ye = { class: "filterbar__rating-input" }, be = ["value"], xe = { class: "filterbar__rating-input" }, Se = ["value"], Ce = { class: "filterbar__field filterbar__presets" }, we = { class: "filterbar__chips" }, Te = {
	key: 0,
	class: "filterbar__presets-empty"
}, Ee = {
	key: 0,
	class: "filterbar__preset-save"
}, De = ["onKeydown"], Oe = ["disabled"], ke = { class: "filterbar__active" }, Ae = {
	class: "filterbar__count",
	"aria-live": "polite"
}, je = { class: "filterbar__pills" }, Me = /*#__PURE__*/ e(/* @__PURE__ */ w({
	__name: "FilterBar",
	props: {
		searchDebounce: { default: 250 },
		sticky: {
			type: Boolean,
			default: !0
		},
		showArtistSort: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["change"],
	setup(e, { emit: r }) {
		let i = e, a = r, o = re(), l = n(), u = _(() => [
			...i.showArtistSort ? [{
				value: "artist",
				label: "Artist"
			}] : [],
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
			},
			{
				value: "genre",
				label: "Genre"
			}
		]), d = A(o.search), p;
		I(() => o.search, (e) => {
			e !== d.value.trim() && (d.value = e);
		});
		function m() {
			clearTimeout(p), p = setTimeout(() => {
				o.setSearch(d.value.trim()), a("change");
			}, i.searchDebounce);
		}
		function w() {
			d.value = "", o.setSearch(""), a("change");
		}
		let T = A(null), ee = A(0), V = _(() => o.availableGenres.filter((e) => !o.selectedGenres.includes(e)));
		function H(e) {
			if (e == null || e === "") return;
			let t = String(e);
			o.selectedGenres.includes(t) || (o.setGenres([...o.selectedGenres, t]), a("change")), T.value = null, ee.value++;
		}
		function U(e) {
			let t = o.selectedRatings;
			o.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		function W(e) {
			let t = o.selectedTypes;
			o.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), a("change");
		}
		let te = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function G(e) {
			o.setMatchStatus(o.matchStatus === e ? "" : e), a("change");
		}
		function ne(e) {
			o.setActors(o.selectedActors.filter((t) => t !== e)), a("change");
		}
		let q = _(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), J = _(() => {
			let e = [];
			for (let t = q.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function Y(e) {
			o.setYearRange(e == null || e === "" ? void 0 : Number(e), o.yearTo), a("change");
		}
		function Me(e) {
			o.setYearRange(o.yearFrom, e == null || e === "" ? void 0 : Number(e)), a("change");
		}
		function Ne(e) {
			o.setMinRating(e == null ? void 0 : Number(e)), a("change");
		}
		function Pe(e) {
			o.setMaxRating(e == null ? void 0 : Number(e)), a("change");
		}
		function Fe(e) {
			o.setSort(e), a("change");
		}
		function Ie() {
			o.order = o.order === "asc" ? "desc" : "asc", o.offset = 0, a("change");
		}
		let Le = _(() => {
			let e = [];
			return o.search && e.push({
				key: "search",
				label: `“${o.search}”`,
				remove: w
			}), o.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					o.setGenres(o.selectedGenres.filter((e) => e !== t)), a("change");
				}
			})), o.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => U(t)
			})), o.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => W(t)
			})), o.selectedActors.forEach((t) => e.push({
				key: `a:${t}`,
				label: t,
				remove: () => ne(t)
			})), o.matchStatus && e.push({
				key: "match",
				label: o.matchStatus === "matched" ? "Matched" : "Unmatched",
				remove: () => G(o.matchStatus)
			}), o.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${o.yearFrom}`,
				remove: () => Y(null)
			}), o.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${o.yearTo}`,
				remove: () => Me(null)
			}), o.minRating !== void 0 && e.push({
				key: "minR",
				label: `Min ${o.minRating.toFixed(1)}★`,
				remove: () => Ne(null)
			}), o.maxRating !== void 0 && e.push({
				key: "maxR",
				label: `Max ${o.maxRating.toFixed(1)}★`,
				remove: () => Pe(null)
			}), e;
		}), Re = _(() => Le.value.length > 0), ze = _(() => o.selectedGenres.length + o.selectedRatings.length + o.selectedTypes.length + o.selectedActors.length + +!!o.matchStatus + (o.yearFrom === void 0 ? 0 : 1) + (o.yearTo === void 0 ? 0 : 1) + (o.minRating === void 0 ? 0 : 1) + (o.maxRating === void 0 ? 0 : 1));
		function Be() {
			d.value = "", o.setSearch(""), o.setGenres([]), o.setRatings([]), o.setTypes([]), o.setActors([]), o.setMatchStatus(""), o.setYearRange(void 0, void 0), o.setMinRating(void 0), o.setMaxRating(void 0), a("change");
		}
		let Q = A(!1), Ve = _(() => l.filterPresets), He = A(!1), $ = A("");
		function Ue() {
			He.value = !0, $.value = "";
		}
		function We() {
			let e = $.value.trim();
			e && (l.saveFilterPreset(e, o.toQuery()), He.value = !1, $.value = "");
		}
		function Ge(e) {
			o.applyQuery(e.query), d.value = o.search, a("change");
		}
		function Ke(e) {
			l.removeFilterPreset(e.id);
		}
		let qe = A(!1);
		function Je() {
			typeof window > "u" || (qe.value = window.scrollY > 24);
		}
		return O(() => {
			i.sticky && typeof window < "u" && (window.addEventListener("scroll", Je, { passive: !0 }), Je());
		}), D(() => {
			clearTimeout(p), typeof window < "u" && window.removeEventListener("scroll", Je);
		}), (n, r) => (k(), b("div", { class: E(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && qe.value
		}]) }, [
			x("div", ie, [
				x("label", X, [
					C(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					R(x("input", {
						"onUpdate:modelValue": r[0] ||= (e) => d.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: m
					}, null, 544), [[P, d.value]]),
					d.value ? (k(), b("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: w
					}, [C(t, { name: "x" })])) : y("", !0)
				]),
				x("div", ae, [C(f, {
					"model-value": N(o).sort,
					options: u.value,
					label: "Sort by",
					"onUpdate:modelValue": Fe
				}, null, 8, ["model-value", "options"]), x("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${N(o).order === "asc" ? "ascending" : "descending"}`,
					onClick: Ie
				}, [C(t, { name: N(o).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, oe)]),
				x("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": Q.value,
					onClick: r[1] ||= (e) => Q.value = !Q.value
				}, [
					C(t, { name: "filter" }),
					r[6] ||= x("span", null, "Filters", -1),
					ze.value ? (k(), v(s, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: L(() => [S(M(ze.value), 1)]),
						_: 1
					})) : y("", !0),
					C(t, {
						name: Q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, se)
			]),
			C(g, { name: "filterbar-panel" }, {
				default: L(() => [R(x("div", ce, [
					x("div", le, [r[7] ||= x("span", { class: "filterbar__field-label" }, "Genres", -1), (k(), v(K, {
						key: ee.value,
						"model-value": T.value,
						options: V.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": H
					}, null, 8, ["model-value", "options"]))]),
					x("div", Z, [r[8] ||= x("span", { class: "filterbar__field-label" }, "Rating", -1), x("div", ue, [(k(!0), b(h, null, j(N(o).availableRatings, (e) => (k(), v(c, {
						key: e,
						selected: N(o).selectedRatings.includes(e),
						"onUpdate:selected": (t) => U(e)
					}, {
						default: L(() => [S(M(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					x("div", de, [r[9] ||= x("span", { class: "filterbar__field-label" }, "Type", -1), x("div", fe, [(k(!0), b(h, null, j(N(o).availableTypes, (e) => (k(), v(c, {
						key: e,
						selected: N(o).selectedTypes.includes(e),
						"onUpdate:selected": (t) => W(e)
					}, {
						default: L(() => [S(M(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					x("div", pe, [r[10] ||= x("span", { class: "filterbar__field-label" }, "Metadata", -1), x("div", me, [(k(), b(h, null, j(te, (e) => C(c, {
						key: e.value,
						selected: N(o).matchStatus === e.value,
						"onUpdate:selected": (t) => G(e.value)
					}, {
						default: L(() => [S(M(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					x("div", he, [r[12] ||= x("span", { class: "filterbar__field-label" }, "Year", -1), x("div", ge, [
						C(K, {
							"model-value": N(o).yearFrom ?? null,
							options: J.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": Y
						}, null, 8, ["model-value", "options"]),
						r[11] ||= x("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						C(K, {
							"model-value": N(o).yearTo ?? null,
							options: J.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": Me
						}, null, 8, ["model-value", "options"])
					])]),
					x("div", _e, [r[16] ||= x("span", { class: "filterbar__field-label" }, "Rating range", -1), x("div", ve, [
						x("label", ye, [r[13] ||= x("span", null, "Min", -1), x("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: N(o).minRating ?? "",
							placeholder: "0",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Minimum rating",
							onChange: r[2] ||= (e) => Ne(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, be)]),
						r[15] ||= x("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						x("label", xe, [r[14] ||= x("span", null, "Max", -1), x("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: N(o).maxRating ?? "",
							placeholder: "10",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Maximum rating",
							onChange: r[3] ||= (e) => Pe(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, Se)])
					])]),
					x("div", Ce, [
						r[19] ||= x("span", { class: "filterbar__field-label" }, "Presets", -1),
						x("div", we, [(k(!0), b(h, null, j(Ve.value, (e) => (k(), v(c, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => Ge(e),
							onRemove: (t) => Ke(e)
						}, {
							default: L(() => [S(M(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), Ve.value.length ? y("", !0) : (k(), b("span", Te, "No saved presets"))]),
						He.value ? (k(), b("div", Ee, [R(x("input", {
							"onUpdate:modelValue": r[4] ||= (e) => $.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [z(B(We, ["prevent"]), ["enter"]), r[5] ||= z((e) => He.value = !1, ["esc"])]
						}, null, 40, De), [[P, $.value]]), x("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: We
						}, [C(t, { name: "check" }), r[17] ||= S(" Save ", -1)])])) : (k(), b("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !Re.value,
							onClick: Ue
						}, [C(t, { name: "plus" }), r[18] ||= S(" Save current ", -1)], 8, Oe))
					])
				], 512), [[F, Q.value]])]),
				_: 1
			}),
			x("div", ke, [x("span", Ae, [x("b", null, M(N(o).total.toLocaleString()), 1), S(" " + M(N(o).total === 1 ? "title" : "titles"), 1)]), Re.value ? (k(), b(h, { key: 0 }, [x("div", je, [(k(!0), b(h, null, j(Le.value, (e) => (k(), v(c, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: L(() => [S(M(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), x("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: Be
			}, "Clear all")], 64)) : y("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-30d8c79d"]]);
//#endregion
export { re as n, K as r, Me as t };

//# sourceMappingURL=FilterBar-C5QyLCP_.js.map