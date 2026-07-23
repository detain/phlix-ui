import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-CGig46Dx.js";
import { a as r } from "./usePreferencesStore-C9GLbD7G.js";
import { t as ee } from "./Badge-B6MgOwKQ.js";
import { t as i } from "./Chip-DHwBdvXS.js";
import { t as te } from "./Select-Cvp-73pF.js";
import { n as a, t as ne } from "./useMediaStore-4sdF7gbv.js";
import { Fragment as o, Transition as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as re, onBeforeUnmount as ie, onMounted as ae, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, vModelText as x, vShow as oe, watch as se, withCtx as S, withDirectives as C, withKeys as w, withModifiers as ce } from "vue";
//#region src/components/FilterBar.vue?vue&type=script&setup=true&lang.ts
var le = { class: "filterbar__main" }, ue = { class: "filterbar__search" }, de = { class: "filterbar__sort" }, fe = ["aria-label"], pe = ["aria-expanded"], me = { class: "filterbar__advanced" }, he = { class: "filterbar__field" }, ge = { class: "filterbar__field" }, _e = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, ve = { class: "filterbar__field" }, ye = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, be = { class: "filterbar__field" }, xe = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Metadata match status"
}, Se = { class: "filterbar__field" }, Ce = { class: "filterbar__years" }, we = { class: "filterbar__field" }, Te = { class: "filterbar__ratings" }, Ee = { class: "filterbar__rating-input" }, T = ["value"], E = { class: "filterbar__rating-input" }, D = ["value"], De = { class: "filterbar__field filterbar__presets" }, Oe = { class: "filterbar__chips" }, ke = {
	key: 0,
	class: "filterbar__presets-empty"
}, Ae = {
	key: 0,
	class: "filterbar__preset-save"
}, je = ["onKeydown"], Me = ["disabled"], Ne = { class: "filterbar__active" }, Pe = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Fe = { class: "filterbar__pills" }, O = /*@__PURE__*/ h({
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
	setup(e, { emit: t }) {
		let h = e, O = t, k = ne(), A = r(), Ie = c(() => [
			...h.showArtistSort ? [{
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
		]), j = _(k.search), M;
		se(() => k.search, (e) => {
			e !== j.value.trim() && (j.value = e);
		});
		function Le() {
			clearTimeout(M), M = setTimeout(() => {
				k.setSearch(j.value.trim()), O("change");
			}, h.searchDebounce);
		}
		function N() {
			j.value = "", k.setSearch(""), O("change");
		}
		let P = _(null), F = _(0), Re = c(() => k.availableGenres.filter((e) => !k.selectedGenres.includes(e)));
		function ze(e) {
			if (e == null || e === "") return;
			let t = String(e);
			k.selectedGenres.includes(t) || (k.setGenres([...k.selectedGenres, t]), O("change")), P.value = null, F.value++;
		}
		function I(e) {
			let t = k.selectedRatings;
			k.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), O("change");
		}
		function L(e) {
			let t = k.selectedTypes;
			k.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), O("change");
		}
		let Be = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function R(e) {
			k.setMatchStatus(k.matchStatus === e ? "" : e), O("change");
		}
		function Ve(e) {
			k.setActors(k.selectedActors.filter((t) => t !== e)), O("change");
		}
		let He = c(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), z = c(() => {
			let e = [];
			for (let t = He.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function B(e) {
			k.setYearRange(e == null || e === "" ? void 0 : Number(e), k.yearTo), O("change");
		}
		function V(e) {
			k.setYearRange(k.yearFrom, e == null || e === "" ? void 0 : Number(e)), O("change");
		}
		function H(e) {
			k.setMinRating(e == null ? void 0 : Number(e)), O("change");
		}
		function U(e) {
			k.setMaxRating(e == null ? void 0 : Number(e)), O("change");
		}
		function Ue(e) {
			k.setSort(e), O("change");
		}
		function We() {
			k.order = k.order === "asc" ? "desc" : "asc", k.offset = 0, O("change");
		}
		let W = c(() => {
			let e = [];
			return k.search && e.push({
				key: "search",
				label: `“${k.search}”`,
				remove: N
			}), k.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					k.setGenres(k.selectedGenres.filter((e) => e !== t)), O("change");
				}
			})), k.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => I(t)
			})), k.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => L(t)
			})), k.selectedActors.forEach((t) => e.push({
				key: `a:${t}`,
				label: t,
				remove: () => Ve(t)
			})), k.matchStatus && e.push({
				key: "match",
				label: k.matchStatus === "matched" ? "Matched" : "Unmatched",
				remove: () => R(k.matchStatus)
			}), k.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${k.yearFrom}`,
				remove: () => B(null)
			}), k.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${k.yearTo}`,
				remove: () => V(null)
			}), k.minRating !== void 0 && e.push({
				key: "minR",
				label: `Min ${k.minRating.toFixed(1)}★`,
				remove: () => H(null)
			}), k.maxRating !== void 0 && e.push({
				key: "maxR",
				label: `Max ${k.maxRating.toFixed(1)}★`,
				remove: () => U(null)
			}), e;
		}), G = c(() => W.value.length > 0), K = c(() => k.selectedGenres.length + k.selectedRatings.length + k.selectedTypes.length + k.selectedActors.length + +!!k.matchStatus + (k.yearFrom === void 0 ? 0 : 1) + (k.yearTo === void 0 ? 0 : 1) + (k.minRating === void 0 ? 0 : 1) + (k.maxRating === void 0 ? 0 : 1));
		function Ge() {
			j.value = "", k.setSearch(""), k.setGenres([]), k.setRatings([]), k.setTypes([]), k.setActors([]), k.setMatchStatus(""), k.setYearRange(void 0, void 0), k.setMinRating(void 0), k.setMaxRating(void 0), O("change");
		}
		let q = _(!1), J = c(() => A.filterPresets), Y = _(!1), X = _("");
		function Ke() {
			Y.value = !0, X.value = "";
		}
		function Z() {
			let e = X.value.trim();
			e && (A.saveFilterPreset(e, k.toQuery()), Y.value = !1, X.value = "");
		}
		function qe(e) {
			k.applyQuery(e.query), j.value = k.search, O("change");
		}
		function Je(e) {
			A.removeFilterPreset(e.id);
		}
		let Q = _(!1);
		function $() {
			typeof window > "u" || (Q.value = window.scrollY > 24);
		}
		return ae(() => {
			h.sticky && typeof window < "u" && (window.addEventListener("scroll", $, { passive: !0 }), $());
		}), ie(() => {
			clearTimeout(M), typeof window < "u" && window.removeEventListener("scroll", $);
		}), (t, r) => (g(), d("div", { class: re(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Q.value
		}]) }, [
			f("div", le, [
				f("label", ue, [
					m(n, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					C(f("input", {
						"onUpdate:modelValue": r[0] ||= (e) => j.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: Le
					}, null, 544), [[x, j.value]]),
					j.value ? (g(), d("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: N
					}, [m(n, { name: "x" })])) : u("", !0)
				]),
				f("div", de, [m(te, {
					"model-value": b(k).sort,
					options: Ie.value,
					label: "Sort by",
					"onUpdate:modelValue": Ue
				}, null, 8, ["model-value", "options"]), f("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${b(k).order === "asc" ? "ascending" : "descending"}`,
					onClick: We
				}, [m(n, { name: b(k).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, fe)]),
				f("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": q.value,
					onClick: r[1] ||= (e) => q.value = !q.value
				}, [
					m(n, { name: "filter" }),
					r[6] ||= f("span", null, "Filters", -1),
					K.value ? (g(), l(ee, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: S(() => [p(y(K.value), 1)]),
						_: 1
					})) : u("", !0),
					m(n, {
						name: q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, pe)
			]),
			m(s, { name: "filterbar-panel" }, {
				default: S(() => [C(f("div", me, [
					f("div", he, [r[7] ||= f("span", { class: "filterbar__field-label" }, "Genres", -1), (g(), l(a, {
						key: F.value,
						"model-value": P.value,
						options: Re.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": ze
					}, null, 8, ["model-value", "options"]))]),
					f("div", ge, [r[8] ||= f("span", { class: "filterbar__field-label" }, "Rating", -1), f("div", _e, [(g(!0), d(o, null, v(b(k).availableRatings, (e) => (g(), l(i, {
						key: e,
						selected: b(k).selectedRatings.includes(e),
						"onUpdate:selected": (t) => I(e)
					}, {
						default: S(() => [p(y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					f("div", ve, [r[9] ||= f("span", { class: "filterbar__field-label" }, "Type", -1), f("div", ye, [(g(!0), d(o, null, v(b(k).availableTypes, (e) => (g(), l(i, {
						key: e,
						selected: b(k).selectedTypes.includes(e),
						"onUpdate:selected": (t) => L(e)
					}, {
						default: S(() => [p(y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					f("div", be, [r[10] ||= f("span", { class: "filterbar__field-label" }, "Metadata", -1), f("div", xe, [(g(), d(o, null, v(Be, (e) => m(i, {
						key: e.value,
						selected: b(k).matchStatus === e.value,
						"onUpdate:selected": (t) => R(e.value)
					}, {
						default: S(() => [p(y(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					f("div", Se, [r[12] ||= f("span", { class: "filterbar__field-label" }, "Year", -1), f("div", Ce, [
						m(a, {
							"model-value": b(k).yearFrom ?? null,
							options: z.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": B
						}, null, 8, ["model-value", "options"]),
						r[11] ||= f("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						m(a, {
							"model-value": b(k).yearTo ?? null,
							options: z.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": V
						}, null, 8, ["model-value", "options"])
					])]),
					f("div", we, [r[16] ||= f("span", { class: "filterbar__field-label" }, "Rating range", -1), f("div", Te, [
						f("label", Ee, [r[13] ||= f("span", null, "Min", -1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: b(k).minRating ?? "",
							placeholder: "0",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Minimum rating",
							onChange: r[2] ||= (e) => H(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, T)]),
						r[15] ||= f("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						f("label", E, [r[14] ||= f("span", null, "Max", -1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: b(k).maxRating ?? "",
							placeholder: "10",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Maximum rating",
							onChange: r[3] ||= (e) => U(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, D)])
					])]),
					f("div", De, [
						r[19] ||= f("span", { class: "filterbar__field-label" }, "Presets", -1),
						f("div", Oe, [(g(!0), d(o, null, v(J.value, (e) => (g(), l(i, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => qe(e),
							onRemove: (t) => Je(e)
						}, {
							default: S(() => [p(y(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), J.value.length ? u("", !0) : (g(), d("span", ke, "No saved presets"))]),
						Y.value ? (g(), d("div", Ae, [C(f("input", {
							"onUpdate:modelValue": r[4] ||= (e) => X.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [w(ce(Z, ["prevent"]), ["enter"]), r[5] ||= w((e) => Y.value = !1, ["esc"])]
						}, null, 40, je), [[x, X.value]]), f("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Z
						}, [m(n, { name: "check" }), r[17] ||= p(" Save ", -1)])])) : (g(), d("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !G.value,
							onClick: Ke
						}, [m(n, { name: "plus" }), r[18] ||= p(" Save current ", -1)], 8, Me))
					])
				], 512), [[oe, q.value]])]),
				_: 1
			}),
			f("div", Ne, [f("span", Pe, [f("b", null, y(b(k).total.toLocaleString()), 1), p(" " + y(b(k).total === 1 ? "title" : "titles"), 1)]), G.value ? (g(), d(o, { key: 0 }, [f("div", Fe, [(g(!0), d(o, null, v(W.value, (e) => (g(), l(i, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: S(() => [p(y(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), f("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: Ge
			}, "Clear all")], 64)) : u("", !0)])
		], 2));
	}
}), k = /* @__PURE__ */ e({ default: () => A }), A = /*#__PURE__*/ t(O, [["__scopeId", "data-v-169c87e3"]]);
//#endregion
export { k as n, A as t };

//# sourceMappingURL=FilterBar-CD2f79mw.js.map