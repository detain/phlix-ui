import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-BlNXxmNP.js";
import { t as ee } from "./IconButton-BI0oqPNk.js";
import { a as r } from "./usePreferencesStore-CFPikE8Z.js";
import { o as te } from "./plural-DMM7pLFA.js";
import { t as ne } from "./Badge-DbdgvC-x.js";
import { t as i } from "./Chip-BJXvFc2X.js";
import { t as re } from "./Select-sAC20h0R.js";
import { n as a, t as ie } from "./useMediaStore-DGcpQpxA.js";
import { n as ae } from "./debounce-BkSsZiXZ.js";
import { Fragment as o, Transition as oe, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, normalizeClass as se, onBeforeUnmount as ce, onMounted as le, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y, vModelText as b, vShow as ue, watch as de, withCtx as x, withDirectives as S, withKeys as C, withModifiers as fe } from "vue";
//#region src/components/FilterBar.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "filterbar__main" }, me = { class: "filterbar__search" }, he = { class: "filterbar__sort" }, ge = ["aria-label"], _e = ["aria-expanded"], ve = {
	class: "filterbar__views",
	role: "group",
	"aria-label": "View mode"
}, ye = { class: "filterbar__advanced" }, be = { class: "filterbar__field" }, xe = { class: "filterbar__field" }, Se = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Ce = { class: "filterbar__field" }, we = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Te = { class: "filterbar__field" }, Ee = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Metadata match status"
}, De = { class: "filterbar__field" }, w = { class: "filterbar__years" }, T = { class: "filterbar__field" }, E = { class: "filterbar__ratings" }, Oe = { class: "filterbar__rating-input" }, ke = ["value"], Ae = { class: "filterbar__rating-input" }, je = ["value"], Me = { class: "filterbar__field filterbar__presets" }, Ne = { class: "filterbar__chips" }, Pe = {
	key: 0,
	class: "filterbar__presets-empty"
}, Fe = {
	key: 0,
	class: "filterbar__preset-save"
}, Ie = ["onKeydown"], Le = ["disabled"], Re = { class: "filterbar__active" }, ze = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Be = { class: "filterbar__pills" }, D = /*@__PURE__*/ m({
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
		let m = e, D = t, O = ie(), k = r(), Ve = s(() => [
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
		de(() => O.search, (e) => {
			e !== A.value.trim() && (A.value = e);
		});
		function He() {
			j?.cancel(), j = ae(() => {
				O.setSearch(A.value.trim()), D("change");
			}, m.searchDebounce), j();
		}
		function M() {
			A.value = "", O.setSearch(""), D("change");
		}
		let N = g(null), P = g(0), Ue = s(() => O.availableGenres.filter((e) => !O.selectedGenres.includes(e)));
		function We(e) {
			if (e == null || e === "") return;
			let t = String(e);
			O.selectedGenres.includes(t) || (O.setGenres([...O.selectedGenres, t]), D("change")), N.value = null, P.value++;
		}
		function F(e) {
			let t = O.selectedRatings;
			O.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), D("change");
		}
		function I(e) {
			let t = O.selectedTypes;
			O.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), D("change");
		}
		let Ge = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function L(e) {
			O.setMatchStatus(O.matchStatus === e ? "" : e), D("change");
		}
		function Ke(e) {
			O.setActors(O.selectedActors.filter((t) => t !== e)), D("change");
		}
		let qe = s(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), R = s(() => {
			let e = [];
			for (let t = qe.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function z(e) {
			O.setYearRange(e == null || e === "" ? void 0 : Number(e), O.yearTo), D("change");
		}
		function B(e) {
			O.setYearRange(O.yearFrom, e == null || e === "" ? void 0 : Number(e)), D("change");
		}
		function V(e) {
			O.setMinRating(e == null ? void 0 : Number(e)), D("change");
		}
		function H(e) {
			O.setMaxRating(e == null ? void 0 : Number(e)), D("change");
		}
		function Je(e) {
			O.setSort(e), D("change");
		}
		function Ye() {
			O.order = O.order === "asc" ? "desc" : "asc", O.offset = 0, D("change");
		}
		let Xe = [
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
		function Ze(e) {
			k.viewMode = e;
		}
		let U = s(() => {
			let e = [];
			return O.search && e.push({
				key: "search",
				label: `“${O.search}”`,
				remove: M
			}), O.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					O.setGenres(O.selectedGenres.filter((e) => e !== t)), D("change");
				}
			})), O.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => F(t)
			})), O.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => I(t)
			})), O.selectedActors.forEach((t) => e.push({
				key: `a:${t}`,
				label: t,
				remove: () => Ke(t)
			})), O.matchStatus && e.push({
				key: "match",
				label: O.matchStatus === "matched" ? "Matched" : "Unmatched",
				remove: () => L(O.matchStatus)
			}), O.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${O.yearFrom}`,
				remove: () => z(null)
			}), O.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${O.yearTo}`,
				remove: () => B(null)
			}), O.minRating !== void 0 && e.push({
				key: "minR",
				label: `Min ${O.minRating.toFixed(1)}★`,
				remove: () => V(null)
			}), O.maxRating !== void 0 && e.push({
				key: "maxR",
				label: `Max ${O.maxRating.toFixed(1)}★`,
				remove: () => H(null)
			}), e;
		}), W = s(() => U.value.length > 0), G = s(() => O.selectedGenres.length + O.selectedRatings.length + O.selectedTypes.length + O.selectedActors.length + +!!O.matchStatus + (O.yearFrom === void 0 ? 0 : 1) + (O.yearTo === void 0 ? 0 : 1) + (O.minRating === void 0 ? 0 : 1) + (O.maxRating === void 0 ? 0 : 1));
		function K() {
			A.value = "", O.setSearch(""), O.setGenres([]), O.setRatings([]), O.setTypes([]), O.setActors([]), O.setMatchStatus(""), O.setYearRange(void 0, void 0), O.setMinRating(void 0), O.setMaxRating(void 0), D("change");
		}
		let q = g(!1), J = s(() => k.filterPresets), Y = g(!1), X = g("");
		function Qe() {
			Y.value = !0, X.value = "";
		}
		function Z() {
			let e = X.value.trim();
			e && (k.saveFilterPreset(e, O.toQuery()), Y.value = !1, X.value = "");
		}
		function $e(e) {
			O.applyQuery(e.query), A.value = O.search, D("change");
		}
		function et(e) {
			k.removeFilterPreset(e.id);
		}
		let Q = g(!1);
		function $() {
			typeof window > "u" || (Q.value = window.scrollY > 24);
		}
		return le(() => {
			m.sticky && typeof window < "u" && (window.addEventListener("scroll", $, { passive: !0 }), $());
		}), ce(() => {
			j?.cancel(), typeof window < "u" && window.removeEventListener("scroll", $);
		}), (t, r) => (h(), u("div", { class: se(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Q.value
		}]) }, [
			d("div", pe, [
				d("label", me, [
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
						onInput: He
					}, null, 544), [[b, A.value]]),
					A.value ? (h(), u("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: M
					}, [p(n, { name: "x" })])) : l("", !0)
				]),
				d("div", he, [p(re, {
					"model-value": y(O).sort,
					options: Ve.value,
					label: "Sort by",
					"onUpdate:modelValue": Je
				}, null, 8, ["model-value", "options"]), d("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${y(O).order === "asc" ? "ascending" : "descending"}`,
					onClick: Ye
				}, [p(n, { name: y(O).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, ge)]),
				d("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": q.value,
					onClick: r[1] ||= (e) => q.value = !q.value
				}, [
					p(n, { name: "filter" }),
					r[6] ||= d("span", null, "Filters", -1),
					G.value ? (h(), c(ne, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: x(() => [f(v(G.value), 1)]),
						_: 1
					})) : l("", !0),
					p(n, {
						name: q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, _e),
				d("div", ve, [(h(), u(o, null, _(Xe, (e) => p(ee, {
					key: e.value,
					name: e.icon,
					label: e.label,
					size: "sm",
					pressed: y(k).viewMode === e.value,
					onClick: (t) => Ze(e.value)
				}, null, 8, [
					"name",
					"label",
					"pressed",
					"onClick"
				])), 64))])
			]),
			p(oe, { name: "filterbar-panel" }, {
				default: x(() => [S(d("div", ye, [
					d("div", be, [r[7] ||= d("span", { class: "filterbar__field-label" }, "Genres", -1), (h(), c(a, {
						key: P.value,
						"model-value": N.value,
						options: Ue.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": We
					}, null, 8, ["model-value", "options"]))]),
					d("div", xe, [r[8] ||= d("span", { class: "filterbar__field-label" }, "Rating", -1), d("div", Se, [(h(!0), u(o, null, _(y(O).availableRatings, (e) => (h(), c(i, {
						key: e,
						selected: y(O).selectedRatings.includes(e),
						"onUpdate:selected": (t) => F(e)
					}, {
						default: x(() => [f(v(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					d("div", Ce, [r[9] ||= d("span", { class: "filterbar__field-label" }, "Type", -1), d("div", we, [(h(!0), u(o, null, _(y(O).availableTypes, (e) => (h(), c(i, {
						key: e,
						selected: y(O).selectedTypes.includes(e),
						"onUpdate:selected": (t) => I(e)
					}, {
						default: x(() => [f(v(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					d("div", Te, [r[10] ||= d("span", { class: "filterbar__field-label" }, "Metadata", -1), d("div", Ee, [(h(), u(o, null, _(Ge, (e) => p(i, {
						key: e.value,
						selected: y(O).matchStatus === e.value,
						"onUpdate:selected": (t) => L(e.value)
					}, {
						default: x(() => [f(v(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					d("div", De, [r[12] ||= d("span", { class: "filterbar__field-label" }, "Year", -1), d("div", w, [
						p(a, {
							"model-value": y(O).yearFrom ?? null,
							options: R.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": z
						}, null, 8, ["model-value", "options"]),
						r[11] ||= d("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						p(a, {
							"model-value": y(O).yearTo ?? null,
							options: R.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": B
						}, null, 8, ["model-value", "options"])
					])]),
					d("div", T, [r[16] ||= d("span", { class: "filterbar__field-label" }, "Rating range", -1), d("div", E, [
						d("label", Oe, [r[13] ||= d("span", null, "Min", -1), d("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: y(O).minRating ?? "",
							placeholder: "0",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Minimum rating",
							onChange: r[2] ||= (e) => V(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, ke)]),
						r[15] ||= d("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						d("label", Ae, [r[14] ||= d("span", null, "Max", -1), d("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: y(O).maxRating ?? "",
							placeholder: "10",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Maximum rating",
							onChange: r[3] ||= (e) => H(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, je)])
					])]),
					d("div", Me, [
						r[19] ||= d("span", { class: "filterbar__field-label" }, "Presets", -1),
						d("div", Ne, [(h(!0), u(o, null, _(J.value, (e) => (h(), c(i, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => $e(e),
							onRemove: (t) => et(e)
						}, {
							default: x(() => [f(v(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), J.value.length ? l("", !0) : (h(), u("span", Pe, "No saved presets"))]),
						Y.value ? (h(), u("div", Fe, [S(d("input", {
							"onUpdate:modelValue": r[4] ||= (e) => X.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [C(fe(Z, ["prevent"]), ["enter"]), r[5] ||= C((e) => Y.value = !1, ["esc"])]
						}, null, 40, Ie), [[b, X.value]]), d("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Z
						}, [p(n, { name: "check" }), r[17] ||= f(" Save ", -1)])])) : (h(), u("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !W.value,
							onClick: Qe
						}, [p(n, { name: "plus" }), r[18] ||= f(" Save current ", -1)], 8, Le))
					])
				], 512), [[ue, q.value]])]),
				_: 1
			}),
			d("div", Re, [d("span", ze, [d("b", null, v(y(O).total.toLocaleString()), 1), f(" " + v(y(te)(y(O).total, "title", "titles")), 1)]), W.value ? (h(), u(o, { key: 0 }, [d("div", Be, [(h(!0), u(o, null, _(U.value, (e) => (h(), c(i, {
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
				onClick: K
			}, "Clear all")], 64)) : l("", !0)])
		], 2));
	}
}), O = /* @__PURE__ */ e({ default: () => k }), k = /*#__PURE__*/ t(D, [["__scopeId", "data-v-89627c82"]]);
//#endregion
export { O as n, k as t };

//# sourceMappingURL=FilterBar-DRgYsXmT.js.map