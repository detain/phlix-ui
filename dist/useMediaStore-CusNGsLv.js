import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./useMessages-CMPz9FmM.js";
import { f as r, l as i, t as a } from "./client-D80As4Gx.js";
import { n as o, r as s, t as c } from "./listbox-htyKA_G5.js";
import { n as l, t as u } from "./media-query-DKjhlX8r.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, nextTick as b, normalizeClass as x, onBeforeUnmount as S, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, useId as O, vShow as k, watch as A, withDirectives as j } from "vue";
import { defineStore as M } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var N = { class: "phlix-combobox__field" }, ee = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], te = ["id", "aria-label"], P = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], F = { class: "phlix-combobox__check" }, I = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, L = /*#__PURE__*/ e(/* @__PURE__ */ y({
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
	setup(e, { emit: r }) {
		let i = e, { t: a } = n(), l = r, u = f(() => s(i.options)), y = O(), M = w(!1), L = w(-1), R = w(""), z = w(!1), B = w(null), V = w(null), H = w(null), U = f(() => u.value.find((e) => e.value === i.modelValue)?.label ?? ""), W = f(() => {
			if (!z.value || R.value.trim() === "") return u.value;
			let e = R.value.toLowerCase();
			return u.value.filter((t) => t.label.toLowerCase().includes(e));
		}), G = f(() => L.value >= 0 ? `${y}-opt-${L.value}` : void 0);
		A(() => i.modelValue, () => {
			M.value || (R.value = U.value);
		}, { immediate: !0 });
		function K() {
			i.disabled || M.value || (M.value = !0, L.value = W.value.findIndex((e) => e.value === i.modelValue), L.value < 0 && (L.value = W.value.findIndex((e) => !e.disabled)), b(X));
		}
		function q() {
			R.value = U.value, z.value = !1, M.value = !1;
		}
		function J(e) {
			let t = W.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (l("update:modelValue", t.value), l("change", t.value)), R.value = t.label, z.value = !1, M.value = !1, V.value?.focus());
		}
		function Y(e) {
			W.value.length !== 0 && (L.value = o(W.value, L.value, e), b(X));
		}
		function X() {
			H.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function Z(e) {
			R.value = e.target.value, z.value = !0, M.value = !0, L.value = c(W.value, "first");
		}
		function ne(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), M.value ? Y(1) : K();
					break;
				case "ArrowUp":
					e.preventDefault(), M.value ? Y(-1) : K();
					break;
				case "Enter":
					M.value && L.value >= 0 && (e.preventDefault(), J(L.value));
					break;
				case "Escape":
					M.value && (e.preventDefault(), q());
					break;
				case "Tab":
					M.value && q();
					break;
			}
		}
		function Q(e) {
			M.value && B.value && !B.value.contains(e.target) && q();
		}
		return A(M, (e) => {
			e ? document.addEventListener("pointerdown", Q, !0) : document.removeEventListener("pointerdown", Q, !0);
		}), S(() => document.removeEventListener("pointerdown", Q, !0)), (n, r) => (C(), h("div", {
			ref_key: "rootEl",
			ref: B,
			class: x(["phlix-combobox", {
				"is-open": M.value,
				"is-disabled": e.disabled
			}])
		}, [g("div", N, [
			v(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			g("input", {
				ref_key: "inputEl",
				ref: V,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": M.value,
				"aria-controls": M.value ? `${D(y)}-list` : void 0,
				"aria-activedescendant": M.value ? G.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? D(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: R.value,
				onInput: Z,
				onFocus: K,
				onKeydown: ne
			}, null, 40, ee),
			v(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), j(g("ul", {
			id: `${D(y)}-list`,
			ref_key: "listEl",
			ref: H,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(C(!0), h(d, null, T(W.value, (n, r) => (C(), h("li", {
			id: `${D(y)}-opt-${r}`,
			key: n.value,
			class: x(["phlix-combobox__option", {
				"is-active": r === L.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => J(r),
			onPointermove: (e) => !n.disabled && (L.value = r)
		}, [g("span", F, [n.value === e.modelValue ? (C(), p(t, {
			key: 0,
			name: "check"
		})) : m("", !0)]), _(" " + E(n.label), 1)], 42, P))), 128)), W.value.length === 0 ? (C(), h("li", I, E(D(a)("common.noMatches")), 1)) : m("", !0)], 8, te), [[k, M.value]])], 2));
	}
}), [["__scopeId", "data-v-9909c9c2"]]), R = 6e4, z = 100, B = 250;
function V(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var H = M("media", () => {
	let e = w([]), t = w(0), n = w(!1), o = w(null), s = w(null), c = null, d = w(""), p = w([]), m = w(void 0), h = w(void 0), g = w([]), _ = w([]), v = w(""), y = w([]), b = w([]), x = w("name"), S = w("asc"), C = w(24), T = w(0), E = w(void 0), D = w(!1), O = w(void 0), k = w(void 0), A = f(() => e.value.length < t.value), j = f(() => {
		let e = {};
		return E.value && (e.libraryId = E.value), D.value && (e.topLevel = !0), d.value && (e.search = d.value), p.value.length && (e.genres = p.value), m.value !== void 0 && (e.yearFrom = m.value), h.value !== void 0 && (e.yearTo = h.value), g.value.length && (e.ratings = g.value), _.value.length && (e.types = _.value), v.value && (e.match = v.value), y.value.length && (e.actors = y.value), b.value.length && (e.companies = b.value), O.value !== void 0 && (e.minRating = O.value), k.value !== void 0 && (e.maxRating = k.value), e.sort = x.value, e.order = S.value, e.limit = C.value, e.offset = T.value, e;
	}), M = f(() => {
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
		"video",
		"music",
		"album",
		"artist",
		"track",
		"audio",
		"book",
		"audiobook",
		"photo"
	];
	function te(e, t) {
		return l(e, t);
	}
	function P(e) {
		return u(e);
	}
	let F = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map(), H = null, U = null, W, G = 0;
	function K(e) {
		return !!e && Date.now() - e.ts < R;
	}
	function q(e, t, n, r) {
		r && (U && n !== H && U.abort(), H = n);
		let i = L.get(n);
		if (i) return r && (U = i.controller), i.promise;
		let o = new AbortController();
		r && (U = o), c ? c.setBaseUrl(e) : c = new a({ baseUrl: e });
		let s = c.get(te(e, t), void 0, o.signal).then((e) => {
			if (F.set(n, {
				items: e.items,
				total: e.total,
				ts: Date.now()
			}), F.size > z) {
				let e = F.keys().next().value;
				e !== void 0 && F.delete(e);
			}
			return e;
		}).finally(() => {
			L.delete(n);
		});
		return L.set(n, {
			promise: s,
			controller: o
		}), s;
	}
	function J(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total, r || (G += 1);
	}
	function Y(t, n) {
		if (n.length === 0) return;
		let r = e.value.slice();
		for (let e = 0; e < n.length; e++) r[t + e] = n[e];
		e.value = r;
	}
	async function X(n, r, i) {
		let a = Math.max(1, C.value), o = t.value > 0 ? t.value : Math.max(i, 1), s = Math.max(0, Math.floor(Math.max(0, r) / a) * a), c = Math.min(o - 1, Math.max(s, i - 1)), l = G, u = [];
		for (let r = s; r <= c; r += a) {
			if (e.value[r] !== void 0) continue;
			let i = {
				...j.value,
				offset: r
			}, a = P(i), o = F.get(a);
			if (K(o)) {
				l === G && Y(r, o.items), t.value ||= o.total;
				continue;
			}
			u.push(q(n, i, a, !1).then((e) => {
				l === G && (Y(r, e.items), t.value ||= e.total);
			}).catch(() => {}));
		}
		u.length && await Promise.all(u);
	}
	async function Z(e, t = !1) {
		let i = { ...j.value }, a = P(i), s = F.get(a);
		if (K(s)) {
			J(s, t), o.value = null;
			return;
		}
		n.value = !0, o.value = null;
		try {
			let n = await q(e, i, a, !t);
			if (!t && a !== H) return;
			J(n, t);
		} catch (e) {
			if (V(e)) return;
			(t || a === H) && (o.value = r(e, "Failed to load media"));
		} finally {
			(t || a === H) && (n.value = !1);
		}
	}
	function ne(e, t = B) {
		T.value = 0, clearTimeout(W), W = setTimeout(() => Z(e, !1), t);
	}
	async function Q(t) {
		n.value || !A.value || (T.value = e.value.length, await Z(t, !0));
	}
	async function re(e, t = {}) {
		let n = {
			...j.value,
			...t
		}, r = P(n);
		if (!K(F.get(r))) try {
			await q(e, n, r, !1);
		} catch {}
	}
	function ie() {
		F.clear();
	}
	function ae() {
		clearTimeout(W);
	}
	function oe(e) {
		return e ?? "__all__";
	}
	async function se(e) {
		let t = oe(E.value), n = I.get(t);
		if (n && Date.now() - n.ts < R) {
			s.value = n.facets;
			return;
		}
		c ? c.setBaseUrl(e) : c = new a({ baseUrl: e });
		try {
			let e = {};
			E.value && (e.libraryId = E.value);
			let n = await c.get("/api/v1/media/facets", Object.keys(e).length ? e : void 0);
			s.value = n, I.set(t, {
				facets: n,
				ts: Date.now()
			});
		} catch (e) {
			e instanceof i && e.status === 404 && (s.value = null);
		}
	}
	function ce() {
		let e = {};
		return d.value && (e.search = d.value), p.value.length && (e.genres = [...p.value]), m.value !== void 0 && (e.yearFrom = String(m.value)), h.value !== void 0 && (e.yearTo = String(h.value)), g.value.length && (e.ratings = [...g.value]), _.value.length && (e.types = [..._.value]), v.value && (e.match = v.value), y.value.length && (e.actors = [...y.value]), b.value.length && (e.companies = [...b.value]), x.value !== "name" && (e.sort = x.value), S.value !== "asc" && (e.order = S.value), e;
	}
	function $(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function le(e) {
		d.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", p.value = $(e.genres), g.value = $(e.ratings), _.value = $(e.types);
		let t = Array.isArray(e.match) ? e.match[0] : e.match;
		v.value = t === "matched" || t === "unmatched" ? t : "", y.value = $(e.actors), b.value = $(e.companies);
		let n = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, r = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		m.value = n ? Number(n) : void 0, h.value = r ? Number(r) : void 0;
		let i = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		x.value = i ?? "name", S.value = a ?? "asc", T.value = 0;
	}
	function ue() {
		e.value = [], t.value = 0, T.value = 0, o.value = null, c = null;
	}
	function de(e) {
		d.value = e, T.value = 0;
	}
	function fe(e) {
		p.value = e, T.value = 0;
	}
	function pe(e, t) {
		m.value = e, h.value = t, T.value = 0;
	}
	function me(e) {
		g.value = e, T.value = 0;
	}
	function he(e) {
		_.value = e, T.value = 0;
	}
	function ge(e) {
		v.value = e, T.value = 0;
	}
	function _e(e) {
		y.value = e, T.value = 0;
	}
	function ve(e) {
		b.value = e, T.value = 0;
	}
	let ye = {
		name: "asc",
		year: "desc",
		rating: "desc",
		runtime: "desc",
		date_added: "desc",
		genre: "asc",
		artist: "asc"
	};
	function be(e, t) {
		x.value = e, S.value = t ?? ye[e], T.value = 0;
	}
	function xe(e) {
		E.value !== e && (E.value = e, T.value = 0);
	}
	function Se(e) {
		D.value !== e && (D.value = e, T.value = 0);
	}
	function Ce() {
		d.value = "", p.value = [], m.value = void 0, h.value = void 0, g.value = [], _.value = [], v.value = "", y.value = [], b.value = [], O.value = void 0, k.value = void 0, x.value = "name", S.value = "asc", T.value = 0;
	}
	function we(e) {
		O.value = e, T.value = 0;
	}
	function Te(e) {
		k.value = e, T.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: o,
		serverFacets: s,
		search: d,
		selectedGenres: p,
		yearFrom: m,
		yearTo: h,
		selectedRatings: g,
		selectedTypes: _,
		matchStatus: v,
		selectedActors: y,
		selectedCompanies: b,
		minRating: O,
		maxRating: k,
		sort: x,
		order: S,
		limit: C,
		offset: T,
		libraryId: E,
		topLevel: D,
		hasMore: A,
		queryParams: j,
		availableGenres: M,
		availableRatings: N,
		availableTypes: ee,
		fetchMedia: Z,
		scheduleFetch: ne,
		loadMore: Q,
		ensureRange: X,
		prefetch: re,
		clearCache: ie,
		cancelScheduled: ae,
		loadFacets: se,
		toQuery: ce,
		applyQuery: le,
		reset: ue,
		setSearch: de,
		setGenres: fe,
		setYearRange: pe,
		setRatings: me,
		setTypes: he,
		setMatchStatus: ge,
		setActors: _e,
		setCompanies: ve,
		setMinRating: we,
		setMaxRating: Te,
		setSort: be,
		setLibraryId: xe,
		setTopLevel: Se,
		clearFilters: Ce,
		get cache() {
			return F;
		},
		cacheKey: P
	};
});
//#endregion
export { L as n, H as t };

//# sourceMappingURL=useMediaStore-CusNGsLv.js.map