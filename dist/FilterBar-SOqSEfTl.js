import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-CfPSBsz2.js";
import { t as ee } from "./IconButton-DQK7Zw4c.js";
import { a as r } from "./usePreferencesStore-CFPikE8Z.js";
import { t as te } from "./Badge-C8wuGrO0.js";
import { t as i } from "./Chip-CHMtyNM1.js";
import { t as ne } from "./Select-D5GWWuWl.js";
import { n as a, t as re } from "./useMediaStore-TpC5sZGp.js";
import { Fragment as o, Transition as ie, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, normalizeClass as ae, onBeforeUnmount as oe, onMounted as se, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y, vModelText as b, vShow as ce, watch as le, withCtx as x, withDirectives as S, withKeys as C, withModifiers as ue } from "vue";
//#region src/components/FilterBar.vue?vue&type=script&setup=true&lang.ts
var de = { class: "filterbar__main" }, fe = { class: "filterbar__search" }, pe = { class: "filterbar__sort" }, me = ["aria-label"], he = ["aria-expanded"], ge = {
	class: "filterbar__views",
	role: "group",
	"aria-label": "View mode"
}, _e = { class: "filterbar__advanced" }, ve = { class: "filterbar__field" }, ye = { class: "filterbar__field" }, be = {
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
}, Te = { class: "filterbar__field" }, Ee = { class: "filterbar__years" }, De = { class: "filterbar__field" }, w = { class: "filterbar__ratings" }, T = { class: "filterbar__rating-input" }, E = ["value"], Oe = { class: "filterbar__rating-input" }, ke = ["value"], Ae = { class: "filterbar__field filterbar__presets" }, je = { class: "filterbar__chips" }, Me = {
	key: 0,
	class: "filterbar__presets-empty"
}, Ne = {
	key: 0,
	class: "filterbar__preset-save"
}, Pe = ["onKeydown"], Fe = ["disabled"], Ie = { class: "filterbar__active" }, Le = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Re = { class: "filterbar__pills" }, D = /*@__PURE__*/ m({
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
		let m = e, D = t, O = re(), k = r(), ze = s(() => [
			...m.showArtistSort ? [{
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
		]), A = g(O.search), j;
		le(() => O.search, (e) => {
			e !== A.value.trim() && (A.value = e);
		});
		function M() {
			clearTimeout(j), j = setTimeout(() => {
				O.setSearch(A.value.trim()), D("change");
			}, m.searchDebounce);
		}
		function N() {
			A.value = "", O.setSearch(""), D("change");
		}
		let P = g(null), F = g(0), Be = s(() => O.availableGenres.filter((e) => !O.selectedGenres.includes(e)));
		function Ve(e) {
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
		let He = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function R(e) {
			O.setMatchStatus(O.matchStatus === e ? "" : e), D("change");
		}
		function Ue(e) {
			O.setActors(O.selectedActors.filter((t) => t !== e)), D("change");
		}
		let We = s(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), z = s(() => {
			let e = [];
			for (let t = We.value; t >= 1900; t--) e.push({
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
		function Ge(e) {
			O.setSort(e), D("change");
		}
		function Ke() {
			O.order = O.order === "asc" ? "desc" : "asc", O.offset = 0, D("change");
		}
		let qe = [
			{
				value: "grid",
				label: "Grid view",
				icon: "grid"
			},
			{
				value: "list",
				label: "List view",
				icon: "list"
			},
			{
				value: "backdrop",
				label: "Backdrop view",
				icon: "backdrop"
			},
			{
				value: "table",
				label: "Table view",
				icon: "table"
			}
		];
		function Je(e) {
			k.viewMode = e;
		}
		let W = s(() => {
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
				remove: () => Ue(t)
			})), O.matchStatus && e.push({
				key: "match",
				label: O.matchStatus === "matched" ? "Matched" : "Unmatched",
				remove: () => R(O.matchStatus)
			}), O.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${O.yearFrom}`,
				remove: () => B(null)
			}), O.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${O.yearTo}`,
				remove: () => V(null)
			}), O.minRating !== void 0 && e.push({
				key: "minR",
				label: `Min ${O.minRating.toFixed(1)}★`,
				remove: () => H(null)
			}), O.maxRating !== void 0 && e.push({
				key: "maxR",
				label: `Max ${O.maxRating.toFixed(1)}★`,
				remove: () => U(null)
			}), e;
		}), G = s(() => W.value.length > 0), K = s(() => O.selectedGenres.length + O.selectedRatings.length + O.selectedTypes.length + O.selectedActors.length + +!!O.matchStatus + (O.yearFrom === void 0 ? 0 : 1) + (O.yearTo === void 0 ? 0 : 1) + (O.minRating === void 0 ? 0 : 1) + (O.maxRating === void 0 ? 0 : 1));
		function Ye() {
			A.value = "", O.setSearch(""), O.setGenres([]), O.setRatings([]), O.setTypes([]), O.setActors([]), O.setMatchStatus(""), O.setYearRange(void 0, void 0), O.setMinRating(void 0), O.setMaxRating(void 0), D("change");
		}
		let q = g(!1), J = s(() => k.filterPresets), Y = g(!1), X = g("");
		function Xe() {
			Y.value = !0, X.value = "";
		}
		function Z() {
			let e = X.value.trim();
			e && (k.saveFilterPreset(e, O.toQuery()), Y.value = !1, X.value = "");
		}
		function Ze(e) {
			O.applyQuery(e.query), A.value = O.search, D("change");
		}
		function Qe(e) {
			k.removeFilterPreset(e.id);
		}
		let Q = g(!1);
		function $() {
			typeof window > "u" || (Q.value = window.scrollY > 24);
		}
		return se(() => {
			m.sticky && typeof window < "u" && (window.addEventListener("scroll", $, { passive: !0 }), $());
		}), oe(() => {
			clearTimeout(j), typeof window < "u" && window.removeEventListener("scroll", $);
		}), (t, r) => (h(), u("div", { class: ae(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Q.value
		}]) }, [
			d("div", de, [
				d("label", fe, [
					p(n, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					S(d("input", {
						"onUpdate:modelValue": r[0] ||= (e) => A.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: M
					}, null, 544), [[b, A.value]]),
					A.value ? (h(), u("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: N
					}, [p(n, { name: "x" })])) : l("", !0)
				]),
				d("div", pe, [p(ne, {
					"model-value": y(O).sort,
					options: ze.value,
					label: "Sort by",
					"onUpdate:modelValue": Ge
				}, null, 8, ["model-value", "options"]), d("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${y(O).order === "asc" ? "ascending" : "descending"}`,
					onClick: Ke
				}, [p(n, { name: y(O).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, me)]),
				d("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": q.value,
					onClick: r[1] ||= (e) => q.value = !q.value
				}, [
					p(n, { name: "filter" }),
					r[6] ||= d("span", null, "Filters", -1),
					K.value ? (h(), c(te, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: x(() => [f(v(K.value), 1)]),
						_: 1
					})) : l("", !0),
					p(n, {
						name: q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, he),
				d("div", ge, [(h(), u(o, null, _(qe, (e) => p(ee, {
					key: e.value,
					name: e.icon,
					label: e.label,
					size: "sm",
					pressed: y(k).viewMode === e.value,
					onClick: (t) => Je(e.value)
				}, null, 8, [
					"name",
					"label",
					"pressed",
					"onClick"
				])), 64))])
			]),
			p(ie, { name: "filterbar-panel" }, {
				default: x(() => [S(d("div", _e, [
					d("div", ve, [r[7] ||= d("span", { class: "filterbar__field-label" }, "Genres", -1), (h(), c(a, {
						key: F.value,
						"model-value": P.value,
						options: Be.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": Ve
					}, null, 8, ["model-value", "options"]))]),
					d("div", ye, [r[8] ||= d("span", { class: "filterbar__field-label" }, "Rating", -1), d("div", be, [(h(!0), u(o, null, _(y(O).availableRatings, (e) => (h(), c(i, {
						key: e,
						selected: y(O).selectedRatings.includes(e),
						"onUpdate:selected": (t) => I(e)
					}, {
						default: x(() => [f(v(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					d("div", xe, [r[9] ||= d("span", { class: "filterbar__field-label" }, "Type", -1), d("div", Se, [(h(!0), u(o, null, _(y(O).availableTypes, (e) => (h(), c(i, {
						key: e,
						selected: y(O).selectedTypes.includes(e),
						"onUpdate:selected": (t) => L(e)
					}, {
						default: x(() => [f(v(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					d("div", Ce, [r[10] ||= d("span", { class: "filterbar__field-label" }, "Metadata", -1), d("div", we, [(h(), u(o, null, _(He, (e) => p(i, {
						key: e.value,
						selected: y(O).matchStatus === e.value,
						"onUpdate:selected": (t) => R(e.value)
					}, {
						default: x(() => [f(v(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					d("div", Te, [r[12] ||= d("span", { class: "filterbar__field-label" }, "Year", -1), d("div", Ee, [
						p(a, {
							"model-value": y(O).yearFrom ?? null,
							options: z.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": B
						}, null, 8, ["model-value", "options"]),
						r[11] ||= d("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						p(a, {
							"model-value": y(O).yearTo ?? null,
							options: z.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": V
						}, null, 8, ["model-value", "options"])
					])]),
					d("div", De, [r[16] ||= d("span", { class: "filterbar__field-label" }, "Rating range", -1), d("div", w, [
						d("label", T, [r[13] ||= d("span", null, "Min", -1), d("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: y(O).minRating ?? "",
							placeholder: "0",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Minimum rating",
							onChange: r[2] ||= (e) => H(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, E)]),
						r[15] ||= d("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						d("label", Oe, [r[14] ||= d("span", null, "Max", -1), d("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: y(O).maxRating ?? "",
							placeholder: "10",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Maximum rating",
							onChange: r[3] ||= (e) => U(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, ke)])
					])]),
					d("div", Ae, [
						r[19] ||= d("span", { class: "filterbar__field-label" }, "Presets", -1),
						d("div", je, [(h(!0), u(o, null, _(J.value, (e) => (h(), c(i, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => Ze(e),
							onRemove: (t) => Qe(e)
						}, {
							default: x(() => [f(v(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), J.value.length ? l("", !0) : (h(), u("span", Me, "No saved presets"))]),
						Y.value ? (h(), u("div", Ne, [S(d("input", {
							"onUpdate:modelValue": r[4] ||= (e) => X.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [C(ue(Z, ["prevent"]), ["enter"]), r[5] ||= C((e) => Y.value = !1, ["esc"])]
						}, null, 40, Pe), [[b, X.value]]), d("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Z
						}, [p(n, { name: "check" }), r[17] ||= f(" Save ", -1)])])) : (h(), u("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !G.value,
							onClick: Xe
						}, [p(n, { name: "plus" }), r[18] ||= f(" Save current ", -1)], 8, Fe))
					])
				], 512), [[ce, q.value]])]),
				_: 1
			}),
			d("div", Ie, [d("span", Le, [d("b", null, v(y(O).total.toLocaleString()), 1), f(" " + v(y(O).total === 1 ? "title" : "titles"), 1)]), G.value ? (h(), u(o, { key: 0 }, [d("div", Re, [(h(!0), u(o, null, _(W.value, (e) => (h(), c(i, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: x(() => [f(v(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), d("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: Ye
			}, "Clear all")], 64)) : l("", !0)])
		], 2));
	}
}), O = /* @__PURE__ */ e({ default: () => k }), k = /*#__PURE__*/ t(D, [["__scopeId", "data-v-86becdcc"]]);
//#endregion
export { O as n, k as t };

//# sourceMappingURL=FilterBar-SOqSEfTl.js.map