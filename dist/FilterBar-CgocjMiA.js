import { t as e } from "./rolldown-runtime-CGnMp29N.js";
import { t } from "./useMediaStore-CWsJIuak.js";
import { a as n } from "./usePreferencesStore-BXm_CP7M.js";
import { n as r, t as i } from "./Icon-55iG1rR7.js";
import { t as a } from "./Chip-B0ZzQlQr.js";
import { t as o } from "./Combobox-Dcn3Nsws.js";
import { t as ee } from "./Select-cNbiRC9o.js";
import { t as te } from "./Badge-D7vacFbh.js";
import { t as ne } from "./IconButton-DsjtwjU1.js";
import { t as re } from "./useMessages-vcPOKXXR.js";
import { n as ie } from "./debounce-BnRz-bwe.js";
import { Fragment as s, Transition as ae, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as g, onBeforeUnmount as oe, onMounted as se, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, vModelText as S, vShow as ce, watch as le, withCtx as C, withDirectives as w, withKeys as T, withModifiers as ue } from "vue";
// src/components/FilterBar.vue?vue&type=script&setup=true&lang.ts
var de = { class: "filterbar__main" }, fe = { class: "filterbar__search" }, pe = ["placeholder", "aria-label"], me = ["aria-label"], he = { class: "filterbar__sort" }, ge = ["aria-label"], _e = ["aria-expanded"], ve = ["aria-label"], ye = { class: "filterbar__advanced" }, be = { class: "filterbar__field" }, xe = { class: "filterbar__field-label" }, Se = { class: "filterbar__field" }, Ce = { class: "filterbar__field-label" }, we = ["aria-label"], Te = { class: "filterbar__field" }, Ee = { class: "filterbar__field-label" }, De = ["aria-label"], E = { class: "filterbar__field" }, Oe = { class: "filterbar__field-label" }, ke = ["aria-label"], Ae = { class: "filterbar__field" }, je = { class: "filterbar__field-label" }, Me = { class: "filterbar__years" }, Ne = { class: "filterbar__field" }, Pe = { class: "filterbar__field-label" }, Fe = { class: "filterbar__ratings" }, Ie = { class: "filterbar__rating-input" }, Le = ["value", "aria-label"], Re = { class: "filterbar__rating-input" }, ze = ["value", "aria-label"], Be = { class: "filterbar__field filterbar__presets" }, Ve = { class: "filterbar__field-label" }, He = { class: "filterbar__chips" }, Ue = {
	key: 0,
	class: "filterbar__presets-empty"
}, We = {
	key: 0,
	class: "filterbar__preset-save"
}, Ge = [
	"placeholder",
	"aria-label",
	"onKeydown"
], Ke = ["disabled"], qe = { class: "filterbar__active" }, Je = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Ye = { class: "filterbar__pills" }, D = /*@__PURE__*/ h({
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
		let h = e, D = r, O = t(), k = n(), { t: A } = re(), Xe = c(() => [
			...h.showArtistSort ? [{
				value: "artist",
				label: A("filter.sortArtist")
			}] : [],
			{
				value: "name",
				label: A("filter.sortName")
			},
			{
				value: "year",
				label: A("filter.year")
			},
			{
				value: "rating",
				label: A("filter.rating")
			},
			{
				value: "date_added",
				label: A("filter.sortDateAdded")
			},
			{
				value: "runtime",
				label: A("filter.sortRuntime")
			},
			{
				value: "genre",
				label: A("filter.sortGenre")
			}
		]), j = v(O.search), M;
		le(() => O.search, (e) => {
			e !== j.value.trim() && (j.value = e);
		});
		function Ze() {
			M?.cancel(), M = ie(() => {
				O.setSearch(j.value.trim()), D("change");
			}, h.searchDebounce), M();
		}
		function N() {
			j.value = "", O.setSearch(""), D("change");
		}
		let P = v(null), F = v(0), Qe = c(() => O.availableGenres.filter((e) => !O.selectedGenres.includes(e)));
		function $e(e) {
			if (e == null || e === "") return;
			let t = String(e);
			O.selectedGenres.includes(t) || (O.setGenres([...O.selectedGenres, t]), D("change")), P.value = null, F.value++;
		}
		function I(e) {
			let t = O.selectedRatings;
			O.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), D("change");
		}
		function L(e) {
			let t = O.selectedTypes;
			O.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), D("change");
		}
		let et = c(() => [{
			value: "matched",
			label: A("filter.matched")
		}, {
			value: "unmatched",
			label: A("filter.unmatched")
		}]);
		function R(e) {
			O.setMatchStatus(O.matchStatus === e ? "" : e), D("change");
		}
		function tt(e) {
			O.setActors(O.selectedActors.filter((t) => t !== e)), D("change");
		}
		let nt = c(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), z = c(() => {
			let e = [];
			for (let t = nt.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function B(e) {
			O.setYearRange(e == null || e === "" ? void 0 : Number(e), O.yearTo), D("change");
		}
		function V(e) {
			O.setYearRange(O.yearFrom, e == null || e === "" ? void 0 : Number(e)), D("change");
		}
		function H(e) {
			O.setMinRating(e == null ? void 0 : Number(e)), D("change");
		}
		function U(e) {
			O.setMaxRating(e == null ? void 0 : Number(e)), D("change");
		}
		function rt(e) {
			O.setSort(e), D("change");
		}
		function it() {
			O.order = O.order === "asc" ? "desc" : "asc", O.offset = 0, D("change");
		}
		let at = c(() => [
			{
				value: "grid",
				label: A("filter.viewGrid"),
				icon: "grid"
			},
			{
				value: "list",
				label: A("filter.viewList"),
				icon: "list"
			},
			{
				value: "backdrop",
				label: A("filter.viewBackdrop"),
				icon: "backdrop"
			},
			{
				value: "table",
				label: A("filter.viewTable"),
				icon: "table"
			}
		]);
		function ot(e) {
			k.viewMode = e;
		}
		let W = c(() => {
			let e = [];
			return O.search && e.push({
				key: "search",
				label: `“${O.search}”`,
				remove: N
			}), O.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					O.setGenres(O.selectedGenres.filter((e) => e !== t)), D("change");
				}
			})), O.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => I(t)
			})), O.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => L(t)
			})), O.selectedActors.forEach((t) => e.push({
				key: `a:${t}`,
				label: t,
				remove: () => tt(t)
			})), O.matchStatus && e.push({
				key: "match",
				label: O.matchStatus === "matched" ? A("filter.matched") : A("filter.unmatched"),
				remove: () => R(O.matchStatus)
			}), O.yearFrom !== void 0 && e.push({
				key: "yf",
				label: A("filter.pillFrom", { year: O.yearFrom }),
				remove: () => B(null)
			}), O.yearTo !== void 0 && e.push({
				key: "yt",
				label: A("filter.pillTo", { year: O.yearTo }),
				remove: () => V(null)
			}), O.minRating !== void 0 && e.push({
				key: "minR",
				label: A("filter.pillMinRating", { rating: O.minRating.toFixed(1) }),
				remove: () => H(null)
			}), O.maxRating !== void 0 && e.push({
				key: "maxR",
				label: A("filter.pillMaxRating", { rating: O.maxRating.toFixed(1) }),
				remove: () => U(null)
			}), e;
		}), G = c(() => W.value.length > 0), K = c(() => O.selectedGenres.length + O.selectedRatings.length + O.selectedTypes.length + O.selectedActors.length + +!!O.matchStatus + (O.yearFrom === void 0 ? 0 : 1) + (O.yearTo === void 0 ? 0 : 1) + (O.minRating === void 0 ? 0 : 1) + (O.maxRating === void 0 ? 0 : 1));
		function st() {
			j.value = "", O.setSearch(""), O.setGenres([]), O.setRatings([]), O.setTypes([]), O.setActors([]), O.setMatchStatus(""), O.setYearRange(void 0, void 0), O.setMinRating(void 0), O.setMaxRating(void 0), D("change");
		}
		let q = v(!1), J = c(() => k.filterPresets), Y = v(!1), X = v("");
		function ct() {
			Y.value = !0, X.value = "";
		}
		function Z() {
			let e = X.value.trim();
			e && (k.saveFilterPreset(e, O.toQuery()), Y.value = !1, X.value = "");
		}
		function lt(e) {
			O.applyQuery(e.query), j.value = O.search, D("change");
		}
		function ut(e) {
			k.removeFilterPreset(e.id);
		}
		let Q = v(!1);
		function $() {
			typeof window < "u" && (Q.value = window.scrollY > 24);
		}
		return se(() => {
			h.sticky && typeof window < "u" && (window.addEventListener("scroll", $, { passive: !0 }), $());
		}), oe(() => {
			M?.cancel(), typeof window < "u" && window.removeEventListener("scroll", $);
		}), (t, n) => (_(), d("div", { class: g(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Q.value
		}]) }, [
			f("div", de, [
				f("label", fe, [
					m(i, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					w(f("input", {
						"onUpdate:modelValue": n[0] ||= (e) => j.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: x(A)("filter.searchHint"),
						"aria-label": x(A)("filter.searchAria"),
						onInput: Ze
					}, null, 40, pe), [[S, j.value]]),
					j.value ? (_(), d("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": x(A)("filter.clearSearchAria"),
						onClick: N
					}, [m(i, { name: "x" })], 8, me)) : u("", !0)
				]),
				f("div", he, [m(ee, {
					"model-value": x(O).sort,
					options: Xe.value,
					label: x(A)("filter.sortBy"),
					"onUpdate:modelValue": rt
				}, null, 8, [
					"model-value",
					"options",
					"label"
				]), f("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": x(O).order === "asc" ? x(A)("filter.sortAscending") : x(A)("filter.sortDescending"),
					onClick: it
				}, [m(i, { name: x(O).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, ge)]),
				f("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": q.value,
					onClick: n[1] ||= (e) => q.value = !q.value
				}, [
					m(i, { name: "filter" }),
					f("span", null, b(x(A)("filter.filters")), 1),
					K.value ? (_(), l(te, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: C(() => [p(b(K.value), 1)]),
						_: 1
					})) : u("", !0),
					m(i, {
						name: q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, _e),
				f("div", {
					class: "filterbar__views",
					role: "group",
					"aria-label": x(A)("filter.viewModeGroup")
				}, [(_(!0), d(s, null, y(at.value, (e) => (_(), l(ne, {
					key: e.value,
					name: e.icon,
					label: e.label,
					size: "sm",
					pressed: x(k).viewMode === e.value,
					onClick: (t) => ot(e.value)
				}, null, 8, [
					"name",
					"label",
					"pressed",
					"onClick"
				]))), 128))], 8, ve)
			]),
			m(ae, {
				name: "filterbar-panel",
				persisted: ""
			}, {
				default: C(() => [w(f("div", ye, [
					f("div", be, [f("span", xe, b(x(A)("filter.genres")), 1), (_(), l(o, {
						key: F.value,
						"model-value": P.value,
						options: Qe.value,
						label: x(A)("filter.genres"),
						placeholder: x(A)("filter.addGenre"),
						"onUpdate:modelValue": $e
					}, null, 8, [
						"model-value",
						"options",
						"label",
						"placeholder"
					]))]),
					f("div", Se, [f("span", Ce, b(x(A)("filter.rating")), 1), f("div", {
						class: "filterbar__chips",
						role: "group",
						"aria-label": x(A)("filter.rating")
					}, [(_(!0), d(s, null, y(x(O).availableRatings, (e) => (_(), l(a, {
						key: e,
						selected: x(O).selectedRatings.includes(e),
						"onUpdate:selected": (t) => I(e)
					}, {
						default: C(() => [p(b(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))], 8, we)]),
					f("div", Te, [f("span", Ee, b(x(A)("filter.type")), 1), f("div", {
						class: "filterbar__chips",
						role: "group",
						"aria-label": x(A)("filter.type")
					}, [(_(!0), d(s, null, y(x(O).availableTypes, (e) => (_(), l(a, {
						key: e,
						selected: x(O).selectedTypes.includes(e),
						"onUpdate:selected": (t) => L(e)
					}, {
						default: C(() => [p(b(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))], 8, De)]),
					f("div", E, [f("span", Oe, b(x(A)("filter.metadata")), 1), f("div", {
						class: "filterbar__chips",
						role: "group",
						"aria-label": x(A)("filter.matchStatusGroup")
					}, [(_(!0), d(s, null, y(et.value, (e) => (_(), l(a, {
						key: e.value,
						selected: x(O).matchStatus === e.value,
						"onUpdate:selected": (t) => R(e.value)
					}, {
						default: C(() => [p(b(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))], 8, ke)]),
					f("div", Ae, [f("span", je, b(x(A)("filter.year")), 1), f("div", Me, [
						m(o, {
							"model-value": x(O).yearFrom ?? null,
							options: z.value,
							placeholder: x(A)("filter.yearFromHint"),
							label: x(A)("filter.yearFrom"),
							"onUpdate:modelValue": B
						}, null, 8, [
							"model-value",
							"options",
							"placeholder",
							"label"
						]),
						n[6] ||= f("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						m(o, {
							"model-value": x(O).yearTo ?? null,
							options: z.value,
							placeholder: x(A)("filter.yearToHint"),
							label: x(A)("filter.yearTo"),
							"onUpdate:modelValue": V
						}, null, 8, [
							"model-value",
							"options",
							"placeholder",
							"label"
						])
					])]),
					f("div", Ne, [f("span", Pe, b(x(A)("filter.ratingRange")), 1), f("div", Fe, [
						f("label", Ie, [f("span", null, b(x(A)("filter.min")), 1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: x(O).minRating ?? "",
							placeholder: "0",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": x(A)("filter.minRating"),
							onChange: n[2] ||= (e) => H(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, Le)]),
						n[7] ||= f("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						f("label", Re, [f("span", null, b(x(A)("filter.max")), 1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: x(O).maxRating ?? "",
							placeholder: "10",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": x(A)("filter.maxRating"),
							onChange: n[3] ||= (e) => U(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, ze)])
					])]),
					f("div", Be, [
						f("span", Ve, b(x(A)("filter.presets")), 1),
						f("div", He, [(_(!0), d(s, null, y(J.value, (e) => (_(), l(a, {
							key: e.id,
							removable: "",
							"remove-label": x(A)("filter.deletePreset", { name: e.name }),
							onClick: (t) => lt(e),
							onRemove: (t) => ut(e)
						}, {
							default: C(() => [p(b(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), J.value.length ? u("", !0) : (_(), d("span", Ue, b(x(A)("filter.noPresets")), 1))]),
						Y.value ? (_(), d("div", We, [w(f("input", {
							"onUpdate:modelValue": n[4] ||= (e) => X.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: x(A)("filter.presetName"),
							"aria-label": x(A)("filter.presetName"),
							onKeydown: [T(ue(Z, ["prevent"]), ["enter"]), n[5] ||= T((e) => Y.value = !1, ["esc"])]
						}, null, 40, Ge), [[S, X.value]]), f("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Z
						}, [m(i, { name: "check" }), p(" " + b(x(A)("filter.save")), 1)])])) : (_(), d("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !G.value,
							onClick: ct
						}, [m(i, { name: "plus" }), p(" " + b(x(A)("filter.saveCurrent")), 1)], 8, Ke))
					])
				], 512), [[ce, q.value]])]),
				_: 1
			}),
			f("div", qe, [f("span", Je, b(x(A)("library.titlesCount", {
				count: x(O).total,
				total: x(O).total.toLocaleString()
			})), 1), G.value ? (_(), d(s, { key: 0 }, [f("div", Ye, [(_(!0), d(s, null, y(W.value, (e) => (_(), l(a, {
				key: e.key,
				removable: "",
				"remove-label": x(A)("filter.removePill", { label: e.label }),
				onRemove: e.remove
			}, {
				default: C(() => [p(b(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), f("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: st
			}, b(x(A)("filter.clearAll")), 1)], 64)) : u("", !0)])
		], 2));
	}
}), O = /* @__PURE__ */ e({ default: () => k }), k = /*#__PURE__*/ r(D, [["__scopeId", "data-v-b7bf605f"]]);
export { O as n, k as t };

//# sourceMappingURL=FilterBar-CgocjMiA.js.map