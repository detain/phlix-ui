import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./useMessages-3JohNwBc.js";
import { f as r, l as i, t as a } from "./client-BzWwyWKr.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s, r as c, t as l } from "./listbox-htyKA_G5.js";
import { n as u, t as d } from "./media-query-DKjhlX8r.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, nextTick as x, normalizeClass as S, onBeforeUnmount as C, openBlock as w, ref as T, renderList as E, toDisplayString as D, unref as O, useId as k, vShow as A, watch as j, withDirectives as M } from "vue";
import { defineStore as N } from "pinia";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var ee = { class: "phlix-combobox__field" }, te = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], ne = ["id", "aria-label"], P = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], F = { class: "phlix-combobox__check" }, I = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, L = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
		let i = e, { t: a } = n(), o = r, u = p(() => c(i.options)), d = k(), b = T(!1), N = T(-1), L = T(""), R = T(!1), z = T(null), B = T(null), V = T(null), H = p(() => u.value.find((e) => e.value === i.modelValue)?.label ?? ""), U = p(() => {
			if (!R.value || L.value.trim() === "") return u.value;
			let e = L.value.toLowerCase();
			return u.value.filter((t) => t.label.toLowerCase().includes(e));
		}), re = p(() => N.value >= 0 ? `${d}-opt-${N.value}` : void 0);
		j(() => i.modelValue, () => {
			b.value || (L.value = H.value);
		}, { immediate: !0 });
		function W() {
			i.disabled || b.value || (b.value = !0, N.value = U.value.findIndex((e) => e.value === i.modelValue), N.value < 0 && (N.value = U.value.findIndex((e) => !e.disabled)), x(J));
		}
		function G() {
			L.value = H.value, R.value = !1, b.value = !1;
		}
		function K(e) {
			let t = U.value[e];
			!t || t.disabled || (t.value !== i.modelValue && (o("update:modelValue", t.value), o("change", t.value)), L.value = t.label, R.value = !1, b.value = !1, B.value?.focus());
		}
		function q(e) {
			U.value.length !== 0 && (N.value = s(U.value, N.value, e), x(J));
		}
		function J() {
			V.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function Y(e) {
			L.value = e.target.value, R.value = !0, b.value = !0, N.value = l(U.value, "first");
		}
		function X(e) {
			if (!i.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), b.value ? q(1) : W();
					break;
				case "ArrowUp":
					e.preventDefault(), b.value ? q(-1) : W();
					break;
				case "Enter":
					b.value && N.value >= 0 && (e.preventDefault(), K(N.value));
					break;
				case "Escape":
					b.value && (e.preventDefault(), G());
					break;
				case "Tab":
					b.value && G();
					break;
			}
		}
		function Z(e) {
			b.value && z.value && !z.value.contains(e.target) && G();
		}
		return j(b, (e) => {
			e ? document.addEventListener("pointerdown", Z, !0) : document.removeEventListener("pointerdown", Z, !0);
		}), C(() => document.removeEventListener("pointerdown", Z, !0)), (n, r) => (w(), g("div", {
			ref_key: "rootEl",
			ref: z,
			class: S(["phlix-combobox", {
				"is-open": b.value,
				"is-disabled": e.disabled
			}])
		}, [_("div", ee, [
			y(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			_("input", {
				ref_key: "inputEl",
				ref: B,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": b.value,
				"aria-controls": b.value ? `${O(d)}-list` : void 0,
				"aria-activedescendant": b.value ? re.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? O(a)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: L.value,
				onInput: Y,
				onFocus: W,
				onKeydown: X
			}, null, 40, te),
			y(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), M(_("ul", {
			id: `${O(d)}-list`,
			ref_key: "listEl",
			ref: V,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(w(!0), g(f, null, E(U.value, (n, r) => (w(), g("li", {
			id: `${O(d)}-opt-${r}`,
			key: n.value,
			class: S(["phlix-combobox__option", {
				"is-active": r === N.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => K(r),
			onPointermove: (e) => !n.disabled && (N.value = r)
		}, [_("span", F, [n.value === e.modelValue ? (w(), m(t, {
			key: 0,
			name: "check"
		})) : h("", !0)]), v(" " + D(n.label), 1)], 42, P))), 128)), U.value.length === 0 ? (w(), g("li", I, D(O(a)("common.noMatches")), 1)) : h("", !0)], 8, ne), [[A, b.value]])], 2));
	}
}), [["__scopeId", "data-v-9909c9c2"]]), R = 6e4, z = 100, B = 250, V = 3, H = 500;
function U(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
function re(e) {
	return new Promise((t) => setTimeout(t, e));
}
var W = N("media", () => {
	let e = T([]), t = T(0), n = T(!1), s = T(null), c = T(null), l = null, f = T(""), m = T([]), h = T(void 0), g = T(void 0), _ = T([]), v = T([]), y = T(""), b = T([]), x = T([]), S = T("name"), C = T("asc"), w = T(24), E = T(0), D = T(void 0), O = T(!1), k = T(void 0), A = T(void 0), j = p(() => e.value.length < t.value), M = p(() => {
		let e = {};
		return D.value && (e.libraryId = D.value), O.value && (e.topLevel = !0), f.value && (e.search = f.value), m.value.length && (e.genres = m.value), h.value !== void 0 && (e.yearFrom = h.value), g.value !== void 0 && (e.yearTo = g.value), _.value.length && (e.ratings = _.value), v.value.length && (e.types = v.value), y.value && (e.match = y.value), b.value.length && (e.actors = b.value), x.value.length && (e.companies = x.value), k.value !== void 0 && (e.minRating = k.value), A.value !== void 0 && (e.maxRating = A.value), e.sort = S.value, e.order = C.value, e.limit = w.value, e.offset = E.value, e;
	}), N = p(() => {
		if (c.value?.genres) return [...c.value.genres].sort();
		if (!e.value || e.value.length === 0) return [];
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), ee = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], te = [
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
	function ne(e, t) {
		return u(e, t);
	}
	function P(e) {
		return d(e);
	}
	let F = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map(), W = null, G = null, K, q = 0, J = !1;
	function Y(e) {
		return !!e && Date.now() - e.ts < R;
	}
	function X(e, t, n, r) {
		r && (G && n !== W && G.abort(), W = n);
		let i = L.get(n);
		if (i) return r && (G = i.controller), i.promise;
		let o = new AbortController();
		r && (G = o), l ? l.setBaseUrl(e) : l = new a({ baseUrl: e });
		let s = l.get(ne(e, t), void 0, o.signal).then((e) => {
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
	function Z(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total, r || (q += 1);
	}
	function ie(t, n) {
		if (n.length === 0) return;
		let r = e.value.slice();
		for (let e = 0; e < n.length; e++) r[t + e] = n[e];
		e.value = r;
	}
	async function ae(e, n, r, i, a) {
		for (let o = 1; o <= V; o++) {
			if (a !== q) return !0;
			try {
				let o = await X(e, n, r, !1);
				return a === q ? (ie(i, o.items), t.value ||= o.total, J = !1, !0) : !0;
			} catch {
				if (a !== q) return !0;
				if (o < V) {
					await re(H);
					continue;
				}
				return !1;
			}
		}
		return !1;
	}
	async function oe(n, r, i) {
		let a = Math.max(1, w.value), s = t.value > 0 ? t.value : Math.max(i, 1), c = Math.max(0, Math.floor(Math.max(0, r) / a) * a), l = Math.min(s - 1, Math.max(c, i - 1)), u = q, d = [];
		for (let r = c; r <= l; r += a) {
			if (e.value[r] !== void 0) continue;
			let i = {
				...M.value,
				offset: r
			}, a = P(i), o = F.get(a);
			if (Y(o)) {
				u === q && (ie(r, o.items), J = !1), t.value ||= o.total;
				continue;
			}
			d.push(ae(n, i, a, r, u));
		}
		if (!d.length) return;
		let f = await Promise.all(d);
		u === q && f.some((e) => !e) && !J && (J = !0, o().error("Some titles failed to load. Scroll to try again."));
	}
	async function Q(e, t = !1) {
		let i = { ...M.value }, a = P(i), o = F.get(a);
		if (Y(o)) {
			Z(o, t), s.value = null;
			return;
		}
		n.value = !0, s.value = null;
		try {
			let n = await X(e, i, a, !t);
			if (!t && a !== W) return;
			Z(n, t);
		} catch (e) {
			if (U(e)) return;
			(t || a === W) && (s.value = r(e, "Failed to load media"));
		} finally {
			(t || a === W) && (n.value = !1);
		}
	}
	function se(e, t = B) {
		E.value = 0, clearTimeout(K), K = setTimeout(() => Q(e, !1), t);
	}
	async function ce(t) {
		n.value || !j.value || (E.value = e.value.length, await Q(t, !0));
	}
	async function le(e, t = {}) {
		let n = {
			...M.value,
			...t
		}, r = P(n);
		if (!Y(F.get(r))) try {
			await X(e, n, r, !1);
		} catch {}
	}
	function ue() {
		F.clear();
	}
	function de() {
		clearTimeout(K);
	}
	function fe(e) {
		return e ?? "__all__";
	}
	async function pe(e) {
		let t = fe(D.value), n = I.get(t);
		if (n && Date.now() - n.ts < R) {
			c.value = n.facets;
			return;
		}
		l ? l.setBaseUrl(e) : l = new a({ baseUrl: e });
		try {
			let e = {};
			D.value && (e.libraryId = D.value);
			let n = await l.get("/api/v1/media/facets", Object.keys(e).length ? e : void 0);
			c.value = n, I.set(t, {
				facets: n,
				ts: Date.now()
			});
		} catch (e) {
			e instanceof i && e.status === 404 && (c.value = null);
		}
	}
	function me() {
		let e = {};
		return f.value && (e.search = f.value), m.value.length && (e.genres = [...m.value]), h.value !== void 0 && (e.yearFrom = String(h.value)), g.value !== void 0 && (e.yearTo = String(g.value)), _.value.length && (e.ratings = [..._.value]), v.value.length && (e.types = [...v.value]), y.value && (e.match = y.value), b.value.length && (e.actors = [...b.value]), x.value.length && (e.companies = [...x.value]), S.value !== "name" && (e.sort = S.value), C.value !== "asc" && (e.order = C.value), e;
	}
	function $(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function he(e) {
		f.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", m.value = $(e.genres), _.value = $(e.ratings), v.value = $(e.types);
		let t = Array.isArray(e.match) ? e.match[0] : e.match;
		y.value = t === "matched" || t === "unmatched" ? t : "", b.value = $(e.actors), x.value = $(e.companies);
		let n = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, r = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		h.value = n ? Number(n) : void 0, g.value = r ? Number(r) : void 0;
		let i = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		S.value = i ?? "name", C.value = a ?? "asc", E.value = 0;
	}
	function ge() {
		e.value = [], t.value = 0, E.value = 0, s.value = null, l = null;
	}
	function _e(e) {
		f.value = e, E.value = 0;
	}
	function ve(e) {
		m.value = e, E.value = 0;
	}
	function ye(e, t) {
		h.value = e, g.value = t, E.value = 0;
	}
	function be(e) {
		_.value = e, E.value = 0;
	}
	function xe(e) {
		v.value = e, E.value = 0;
	}
	function Se(e) {
		y.value = e, E.value = 0;
	}
	function Ce(e) {
		b.value = e, E.value = 0;
	}
	function we(e) {
		x.value = e, E.value = 0;
	}
	let Te = {
		name: "asc",
		year: "desc",
		rating: "desc",
		runtime: "desc",
		date_added: "desc",
		genre: "asc",
		artist: "asc"
	};
	function Ee(e, t) {
		S.value = e, C.value = t ?? Te[e], E.value = 0;
	}
	function De(e) {
		D.value !== e && (D.value = e, E.value = 0);
	}
	function Oe(e) {
		O.value !== e && (O.value = e, E.value = 0);
	}
	function ke() {
		f.value = "", m.value = [], h.value = void 0, g.value = void 0, _.value = [], v.value = [], y.value = "", b.value = [], x.value = [], k.value = void 0, A.value = void 0, S.value = "name", C.value = "asc", E.value = 0;
	}
	function Ae(e) {
		k.value = e, E.value = 0;
	}
	function je(e) {
		A.value = e, E.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: s,
		serverFacets: c,
		search: f,
		selectedGenres: m,
		yearFrom: h,
		yearTo: g,
		selectedRatings: _,
		selectedTypes: v,
		matchStatus: y,
		selectedActors: b,
		selectedCompanies: x,
		minRating: k,
		maxRating: A,
		sort: S,
		order: C,
		limit: w,
		offset: E,
		libraryId: D,
		topLevel: O,
		hasMore: j,
		queryParams: M,
		availableGenres: N,
		availableRatings: ee,
		availableTypes: te,
		fetchMedia: Q,
		scheduleFetch: se,
		loadMore: ce,
		ensureRange: oe,
		prefetch: le,
		clearCache: ue,
		cancelScheduled: de,
		loadFacets: pe,
		toQuery: me,
		applyQuery: he,
		reset: ge,
		setSearch: _e,
		setGenres: ve,
		setYearRange: ye,
		setRatings: be,
		setTypes: xe,
		setMatchStatus: Se,
		setActors: Ce,
		setCompanies: we,
		setMinRating: Ae,
		setMaxRating: je,
		setSort: Ee,
		setLibraryId: De,
		setTopLevel: Oe,
		clearFilters: ke,
		get cache() {
			return F;
		},
		cacheKey: P
	};
});
//#endregion
export { L as n, W as t };

//# sourceMappingURL=useMediaStore-CkjoM4Yj.js.map