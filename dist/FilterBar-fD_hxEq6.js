import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { n as t, t as n } from "./Icon-CkTBN_k5.js";
import { t as ee } from "./IconButton-3ZuilWzd.js";
import { a as r } from "./usePreferencesStore-CFPikE8Z.js";
import { o as te } from "./plural-DMM7pLFA.js";
import { t as i } from "./Badge-D1_MN41Y.js";
import { t as a } from "./Chip-4LSLVIhi.js";
import { t as ne } from "./Select-C5dvTnnx.js";
import { n as o, t as re } from "./useMediaStore-CI5AhE-J.js";
import { Fragment as s, Transition as ie, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, normalizeClass as ae, onBeforeUnmount as oe, onMounted as se, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, vModelText as x, vShow as ce, watch as le, withCtx as S, withDirectives as C, withKeys as w, withModifiers as ue } from "vue";
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
}, Te = { class: "filterbar__field" }, Ee = { class: "filterbar__years" }, T = { class: "filterbar__field" }, E = { class: "filterbar__ratings" }, D = { class: "filterbar__rating-input" }, De = ["value"], Oe = { class: "filterbar__rating-input" }, ke = ["value"], Ae = { class: "filterbar__field filterbar__presets" }, je = { class: "filterbar__chips" }, Me = {
	key: 0,
	class: "filterbar__presets-empty"
}, Ne = {
	key: 0,
	class: "filterbar__preset-save"
}, Pe = ["onKeydown"], Fe = ["disabled"], Ie = { class: "filterbar__active" }, Le = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Re = { class: "filterbar__pills" }, O = /*@__PURE__*/ h({
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
		let h = e, O = t, k = re(), A = r(), ze = c(() => [
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
		le(() => k.search, (e) => {
			e !== j.value.trim() && (j.value = e);
		});
		function Be() {
			clearTimeout(M), M = setTimeout(() => {
				k.setSearch(j.value.trim()), O("change");
			}, h.searchDebounce);
		}
		function N() {
			j.value = "", k.setSearch(""), O("change");
		}
		let P = _(null), F = _(0), Ve = c(() => k.availableGenres.filter((e) => !k.selectedGenres.includes(e)));
		function He(e) {
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
		let Ue = [{
			value: "matched",
			label: "Matched"
		}, {
			value: "unmatched",
			label: "Unmatched"
		}];
		function R(e) {
			k.setMatchStatus(k.matchStatus === e ? "" : e), O("change");
		}
		function We(e) {
			k.setActors(k.selectedActors.filter((t) => t !== e)), O("change");
		}
		let Ge = c(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), z = c(() => {
			let e = [];
			for (let t = Ge.value; t >= 1900; t--) e.push({
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
		function Ke(e) {
			k.setSort(e), O("change");
		}
		function qe() {
			k.order = k.order === "asc" ? "desc" : "asc", k.offset = 0, O("change");
		}
		let Je = [
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
		function Ye(e) {
			A.viewMode = e;
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
				remove: () => We(t)
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
		function Xe() {
			j.value = "", k.setSearch(""), k.setGenres([]), k.setRatings([]), k.setTypes([]), k.setActors([]), k.setMatchStatus(""), k.setYearRange(void 0, void 0), k.setMinRating(void 0), k.setMaxRating(void 0), O("change");
		}
		let q = _(!1), J = c(() => A.filterPresets), Y = _(!1), X = _("");
		function Ze() {
			Y.value = !0, X.value = "";
		}
		function Z() {
			let e = X.value.trim();
			e && (A.saveFilterPreset(e, k.toQuery()), Y.value = !1, X.value = "");
		}
		function Qe(e) {
			k.applyQuery(e.query), j.value = k.search, O("change");
		}
		function $e(e) {
			A.removeFilterPreset(e.id);
		}
		let Q = _(!1);
		function $() {
			typeof window > "u" || (Q.value = window.scrollY > 24);
		}
		return se(() => {
			h.sticky && typeof window < "u" && (window.addEventListener("scroll", $, { passive: !0 }), $());
		}), oe(() => {
			clearTimeout(M), typeof window < "u" && window.removeEventListener("scroll", $);
		}), (t, r) => (g(), d("div", { class: ae(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && Q.value
		}]) }, [
			f("div", de, [
				f("label", fe, [
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
						onInput: Be
					}, null, 544), [[x, j.value]]),
					j.value ? (g(), d("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: N
					}, [m(n, { name: "x" })])) : u("", !0)
				]),
				f("div", pe, [m(ne, {
					"model-value": b(k).sort,
					options: ze.value,
					label: "Sort by",
					"onUpdate:modelValue": Ke
				}, null, 8, ["model-value", "options"]), f("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${b(k).order === "asc" ? "ascending" : "descending"}`,
					onClick: qe
				}, [m(n, { name: b(k).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, me)]),
				f("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": q.value,
					onClick: r[1] ||= (e) => q.value = !q.value
				}, [
					m(n, { name: "filter" }),
					r[6] ||= f("span", null, "Filters", -1),
					K.value ? (g(), l(i, {
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
				], 8, he),
				f("div", ge, [(g(), d(s, null, v(Je, (e) => m(ee, {
					key: e.value,
					name: e.icon,
					label: e.label,
					size: "sm",
					pressed: b(A).viewMode === e.value,
					onClick: (t) => Ye(e.value)
				}, null, 8, [
					"name",
					"label",
					"pressed",
					"onClick"
				])), 64))])
			]),
			m(ie, { name: "filterbar-panel" }, {
				default: S(() => [C(f("div", _e, [
					f("div", ve, [r[7] ||= f("span", { class: "filterbar__field-label" }, "Genres", -1), (g(), l(o, {
						key: F.value,
						"model-value": P.value,
						options: Ve.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": He
					}, null, 8, ["model-value", "options"]))]),
					f("div", ye, [r[8] ||= f("span", { class: "filterbar__field-label" }, "Rating", -1), f("div", be, [(g(!0), d(s, null, v(b(k).availableRatings, (e) => (g(), l(a, {
						key: e,
						selected: b(k).selectedRatings.includes(e),
						"onUpdate:selected": (t) => I(e)
					}, {
						default: S(() => [p(y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					f("div", xe, [r[9] ||= f("span", { class: "filterbar__field-label" }, "Type", -1), f("div", Se, [(g(!0), d(s, null, v(b(k).availableTypes, (e) => (g(), l(a, {
						key: e,
						selected: b(k).selectedTypes.includes(e),
						"onUpdate:selected": (t) => L(e)
					}, {
						default: S(() => [p(y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					f("div", Ce, [r[10] ||= f("span", { class: "filterbar__field-label" }, "Metadata", -1), f("div", we, [(g(), d(s, null, v(Ue, (e) => m(a, {
						key: e.value,
						selected: b(k).matchStatus === e.value,
						"onUpdate:selected": (t) => R(e.value)
					}, {
						default: S(() => [p(y(e.label), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"])), 64))])]),
					f("div", Te, [r[12] ||= f("span", { class: "filterbar__field-label" }, "Year", -1), f("div", Ee, [
						m(o, {
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
						m(o, {
							"model-value": b(k).yearTo ?? null,
							options: z.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": V
						}, null, 8, ["model-value", "options"])
					])]),
					f("div", T, [r[16] ||= f("span", { class: "filterbar__field-label" }, "Rating range", -1), f("div", E, [
						f("label", D, [r[13] ||= f("span", null, "Min", -1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: b(k).minRating ?? "",
							placeholder: "0",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Minimum rating",
							onChange: r[2] ||= (e) => H(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, De)]),
						r[15] ||= f("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						f("label", Oe, [r[14] ||= f("span", null, "Max", -1), f("input", {
							type: "number",
							class: "filterbar__rating-number",
							value: b(k).maxRating ?? "",
							placeholder: "10",
							min: "0",
							max: "10",
							step: "0.5",
							"aria-label": "Maximum rating",
							onChange: r[3] ||= (e) => U(e.target.value === "" ? null : Number(e.target.value))
						}, null, 40, ke)])
					])]),
					f("div", Ae, [
						r[19] ||= f("span", { class: "filterbar__field-label" }, "Presets", -1),
						f("div", je, [(g(!0), d(s, null, v(J.value, (e) => (g(), l(a, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => Qe(e),
							onRemove: (t) => $e(e)
						}, {
							default: S(() => [p(y(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), J.value.length ? u("", !0) : (g(), d("span", Me, "No saved presets"))]),
						Y.value ? (g(), d("div", Ne, [C(f("input", {
							"onUpdate:modelValue": r[4] ||= (e) => X.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [w(ue(Z, ["prevent"]), ["enter"]), r[5] ||= w((e) => Y.value = !1, ["esc"])]
						}, null, 40, Pe), [[x, X.value]]), f("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Z
						}, [m(n, { name: "check" }), r[17] ||= p(" Save ", -1)])])) : (g(), d("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !G.value,
							onClick: Ze
						}, [m(n, { name: "plus" }), r[18] ||= p(" Save current ", -1)], 8, Fe))
					])
				], 512), [[ce, q.value]])]),
				_: 1
			}),
			f("div", Ie, [f("span", Le, [f("b", null, y(b(k).total.toLocaleString()), 1), p(" " + y(b(te)(b(k).total, "title", "titles")), 1)]), G.value ? (g(), d(s, { key: 0 }, [f("div", Re, [(g(!0), d(s, null, v(W.value, (e) => (g(), l(a, {
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
				onClick: Xe
			}, "Clear all")], 64)) : u("", !0)])
		], 2));
	}
}), k = /* @__PURE__ */ e({ default: () => A }), A = /*#__PURE__*/ t(O, [["__scopeId", "data-v-1be58243"]]);
//#endregion
export { k as n, A as t };

//# sourceMappingURL=FilterBar-fD_hxEq6.js.map