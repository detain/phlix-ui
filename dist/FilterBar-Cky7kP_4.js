import { t as e } from "./rolldown-runtime-CGnMp29N.js";
import { t } from "./useMediaStore-Dm2cFYhr.js";
import { a as n } from "./usePreferencesStore-DrDMAwjz.js";
import { n as r, t as i } from "./Icon-CIbfiPrs.js";
import { t as a } from "./Chip-DC0SQtfn.js";
import { t as o } from "./Combobox-vklGqBID.js";
import { t as ee } from "./Select-ChFXd0gU.js";
import { t as te } from "./Badge-C6LNO9Kk.js";
import { t as ne } from "./IconButton-Cp0n7kCc.js";
import { o as re } from "./plural-B3O2rVPV.js";
import { n as ie } from "./debounce-BnRz-bwe.js";
import { Fragment as s, Transition as ae, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as oe, onBeforeUnmount as se, onMounted as ce, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, vModelText as x, vShow as le, watch as ue, withCtx as S, withDirectives as C, withKeys as w, withModifiers as de } from "vue";
// src/components/FilterBar.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "filterbar__main" }, pe = { class: "filterbar__search" }, me = { class: "filterbar__sort" }, he = ["aria-label"], ge = ["aria-expanded"], _e = {
	class: "filterbar__views",
	role: "group",
	"aria-label": "View mode"
}, ve = { class: "filterbar__advanced" }, ye = { class: "filterbar__field" }, be = { class: "filterbar__field" }, xe = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Se = { class: "filterbar__field" }, Ce = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, we = { class: "filterbar__field" }, Te = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Metadata match status"
}, Ee = { class: "filterbar__field" }, De = { class: "filterbar__years" }, T = { class: "filterbar__field" }, E = { class: "filterbar__ratings" }, Oe = { class: "filterbar__rating-input" }, ke = ["value"], Ae = { class: "filterbar__rating-input" }, je = ["value"], Me = { class: "filterbar__field filterbar__presets" }, Ne = { class: "filterbar__chips" }, Pe = {
	key: 0,
	class: "filterbar__presets-empty"
}, Fe = {
	key: 0,
	class: "filterbar__preset-save"
}, Ie = ["onKeydown"], Le = ["disabled"], Re = { class: "filterbar__active" }, ze = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Be = { class: "filterbar__pills" }, D = /*@__PURE__*/ h({
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
		let h = e, D = r, O = t(), k = n(), Ve = c(() => [
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
		]), A = _(O.search), j;
		ue(() => O.search, (e) => {
			e !== A.value.trim() && (A.value = e);
		});
		function He() {
			j?.cancel(), j = ie(() => {
				O.setSearch(A.value.trim()), D("change");
			}, h.searchDebounce), j();
		}
		function M() {
			A.value = "", O.setSearch(""), D("change");
		}
		let N = _(null), P = _(0), Ue = c(() => O.availableGenres.filter((e) => !O.selectedGenres.includes(e)));
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
		let qe = c(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), R = c(() => {
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
		let U = c(() => {
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
		}), W = c(() => U.value.length > 0), G = c(() => O.selectedGenres.length + O.selectedRatings.length + O.selectedTypes.length + O.selectedActors.length + +!!O.matchStatus + (O.yearFrom === void 0 ? 0 : 1) + (O.yearTo === void 0 ? 0 : 1) + (O.minRating === void 0 ? 0 : 1) + (O.maxRating === void 0 ? 0 : 1));
		function K() {
			A.value = "", O.setSearch(""), O.setGenres([]), O.setRatings([]), O.setTypes([]), O.setActors([]), O.setMatchStatus(""), O.setYearRange(void 0, void 0), O.setMinRating(void 0), O.setMaxRating(void 0), D("change");
		}
		let q = _(!1), J = c(() => k.filterPresets), Y = _(!1), X = _("");
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
		let Q = _(!1);
		function $() {
			typeof window < "u" && (Q.value = window.scrollY > 24);
		}
		return ce(() => {
			h.sticky && typeof window < "u" && (window.addEventListener("scroll", $, { passive: !0 }), $());
		}), se(() => {
			j?.cancel(), typeof window < "u" && window.removeEventListener("scroll", $);
		}), (t, n) => (g(), d("div", { class: oe(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Q.value
		}]) }, [
			f("div", fe, [
				f("label", pe, [
					m(i, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					C(f("input", {
						"onUpdate:modelValue": n[0] ||= (e) => A.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: He
					}, null, 544), [[x, A.value]]),
					A.value ? (g(), d("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: M
					}, [m(i, { name: "x" })])) : u("", !0)
				]),
				f("div", me, [m(ee, {
					"model-value": b(O).sort,
					options: Ve.value,
					label: "Sort by",
					"onUpdate:modelValue": Je
				}, null, 8, ["model-value", "options"]), f("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${b(O).order === "asc" ? "ascending" : "descending"}`,
					onClick: Ye
				}, [m(i, { name: b(O).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, he)]),
				f("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": q.value,
					onClick: n[1] ||= (e) => q.value = !q.value
				}, [
					m(i, { name: "filter" }),
					n[6] ||= f("span", null, "Filters", -1),
					G.value ? (g(), l(te, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: S(() => [p(y(G.value), 1)]),
						_: 1
					})) : u("", !0),
					m(i, {
						name: q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, ge),
				f("div", _e, [(g(), d(s, null, v(Xe, (e) => m(ne, {
					key: e.value,
					name: e.icon,
					label: e.label,
					size: "sm",
					pressed: b(k).viewMode === e.value,
					onClick: (t) => Ze(e.value)
				}, null, 8, [
					"name",
					"label",
					"pressed",
					"onClick"
				])), 64))])
			]),
			m(ae, { name: "filterbar-panel" }, {
				default: S(() => [C(f("div", ve, [
					f("div", ye, [n[7] ||= f("span", { class: "filterbar__field-label" }, "Genres", -1), (g(), l(o, {
						key: P.value,
						"model-value": N.value,
						options: Ue.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": We
					}, null, 8, ["model-value", "options"]))]),
					f("div", be, [n[8] ||= f("span", { class: "filterbar__field-label" }, "Rating", -1), f("div", xe, [(g(!0), d(s, null, v(b(O).availableRatings, (e) => (g(), l(a, {
						key: e,
						selected: b(O).selectedRatings.includes(e),
						"onUpdate:selected": (t) => F(e)
					}, {
						default: S(() => [p(y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					f("div", Se, [n[9] ||= f("span", { class: "filterbar__field-label" }, "Type", -1), f("div", Ce, [(g(!0), d(s, null, v(b(O).availableTypes, (e) => (g(), l(a, {
						key: e,
						selected: b(O).selectedTypes.includes(e),
						"onUpdate:selected": (t) => I(e)
					}, {
						default: S(() => [p(y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					f("div", we, [n[10] ||= f("span", { class: "filterbar__field-label" }, "Metadata", -1), f("div", Te, [(g(), d(s, null, v(Ge, (e) => m(a, {
						key: e.value,
						selected: b(O).matchStatus === e.value,
						"onUpdate:selected": (t) => L(e.value)
					}, {
						default: S(() => [p(y(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					f("div", Ee, [n[12] ||= f("span", { class: "filterbar__field-label" }, "Year", -1), f("div", De, [
						m(o, {
							"model-value": b(O).yearFrom ?? null,
							options: R.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": z
						}, null, 8, ["model-value", "options"]),
						n[11] ||= f("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						m(o, {
							"model-value": b(O).yearTo ?? null,
							options: R.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": B
						}, null, 8, ["model-value", "options"])
					])]),
					f("div", T, [n[16] ||= f("span", { class: "filterbar__field-label" }, "Rating range", -1), f("div", E, [
						f("label", Oe, [n[13] ||= f("span", null, "Min", -1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: b(O).minRating ?? "",
							placeholder: "0",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Minimum rating",
							onChange: n[2] ||= (e) => V(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, ke)]),
						n[15] ||= f("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						f("label", Ae, [n[14] ||= f("span", null, "Max", -1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: b(O).maxRating ?? "",
							placeholder: "10",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Maximum rating",
							onChange: n[3] ||= (e) => H(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, je)])
					])]),
					f("div", Me, [
						n[19] ||= f("span", { class: "filterbar__field-label" }, "Presets", -1),
						f("div", Ne, [(g(!0), d(s, null, v(J.value, (e) => (g(), l(a, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => $e(e),
							onRemove: (t) => et(e)
						}, {
							default: S(() => [p(y(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), J.value.length ? u("", !0) : (g(), d("span", Pe, "No saved presets"))]),
						Y.value ? (g(), d("div", Fe, [C(f("input", {
							"onUpdate:modelValue": n[4] ||= (e) => X.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [w(de(Z, ["prevent"]), ["enter"]), n[5] ||= w((e) => Y.value = !1, ["esc"])]
						}, null, 40, Ie), [[x, X.value]]), f("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Z
						}, [m(i, { name: "check" }), n[17] ||= p(" Save ", -1)])])) : (g(), d("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !W.value,
							onClick: Qe
						}, [m(i, { name: "plus" }), n[18] ||= p(" Save current ", -1)], 8, Le))
					])
				], 512), [[le, q.value]])]),
				_: 1
			}),
			f("div", Re, [f("span", ze, [f("b", null, y(b(O).total.toLocaleString()), 1), p(" " + y(b(re)(b(O).total, "title", "titles")), 1)]), W.value ? (g(), d(s, { key: 0 }, [f("div", Be, [(g(!0), d(s, null, v(U.value, (e) => (g(), l(a, {
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
				onClick: K
			}, "Clear all")], 64)) : u("", !0)])
		], 2));
	}
}), O = /* @__PURE__ */ e({ default: () => k }), k = /*#__PURE__*/ r(D, [["__scopeId", "data-v-89627c82"]]);
export { O as n, k as t };

//# sourceMappingURL=FilterBar-Cky7kP_4.js.map