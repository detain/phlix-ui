import { n as e } from "./useApiBase-DXTBY90j.js";
import { n as t } from "./ThumbRating-Wsa0ILz5.js";
import { t as n } from "./MediaGrid-DOQ4V6jt.js";
import { t as ee } from "./MetadataMatchModal-BZkPtrTY.js";
import { n as r, t as te } from "./useItemInspector-DSxrBf67.js";
import { t as i } from "./EmptyState-DjfWh3kt.js";
import { t as a } from "./Button-BLpPomsd.js";
import { t as ne } from "./Spinner-BiCj0RU_.js";
import { t as re } from "./useToastStore-Bu-iYU7r.js";
import { t as ie } from "./useAuthStore-C2DSAeEy.js";
import { t as ae, x as o } from "./client-fSGeXil2.js";
import { t as oe } from "./useMessages-BCqW2fSn.js";
import { n as se } from "./debounce-BnRz-bwe.js";
import { n as s, t as c } from "./wireErrors-BEWfE19X.js";
import { n as l } from "./Icon-55iG1rR7.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ce, isRef as y, onMounted as b, openBlock as x, ref as S, toDisplayString as le, unref as C, vModelText as ue, watch as w, withCtx as T, withDirectives as E, withModifiers as D } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
// src/pages/searchErrors.ts
function A(e, t, n) {
	return s(e, {
		title: "Search failed",
		description: t
	}, n);
}
// src/pages/SearchPage.vue?vue&type=script&setup=true&lang.ts
var j = { class: "search-page" }, M = { class: "search-header" }, N = {
	key: 0,
	class: "search-loading"
}, P = {
	key: 0,
	class: "search-cap-notice"
}, F = /*#__PURE__*/ l(/* @__PURE__ */ v({
	__name: "SearchPage",
	setup(s) {
		let l = O(), v = k(), F = e(), I = ce("phlixConfig", null), L = t(), R = re(), z = ie(), { t: B } = oe(), V = S(""), H = S([]), U = S(null), W = S(!1), G = S(null), K = S(!1), q = se(() => {
			V.value.trim() === "" ? v.replace({ query: {} }) : v.replace({ query: { q: V.value.trim() } }), J();
		}, 300);
		async function J() {
			let e = V.value.trim();
			if (e === "") H.value = [], U.value = null, K.value = !1, G.value = null;
			else {
				K.value = !0, W.value = !0, G.value = null;
				try {
					let t = await new ae({ baseUrl: F.value }).get("/api/v1/media/search", { q: e });
					H.value = t.items ?? [], U.value = typeof t.total == "number" && Number.isFinite(t.total) ? t.total : null, H.value.forEach((e) => L.hydrate(e));
				} catch (e) {
					G.value = A(c(e), o(e), I?.locale), H.value = [], U.value = null;
				} finally {
					W.value = !1;
				}
			}
		}
		let Y = S(null);
		b(() => {
			let e = l.query.q ?? "";
			V.value = e, Y.value?.focus(), e.trim() !== "" && J();
		}), w(() => l.query.q, (e) => {
			let t = e ?? "";
			t !== V.value && (V.value = t, t.trim() === "" ? (H.value = [], U.value = null, K.value = !1) : J());
		});
		let de = d(() => K.value && !W.value && H.value.length === 0 && G.value === null), fe = d(() => K.value && !W.value && H.value.length > 0), pe = d(() => !K.value && V.value.trim() === ""), me = d(() => K.value && G.value !== null), he = d(() => U.value !== null && H.value.length < U.value), ge = d(() => U.value === null ? "" : B("search.showingOf", {
			shown: H.value.length.toLocaleString(),
			total: U.value.toLocaleString()
		})), X = S(null), Z = S(!1), { inspectorItem: _e, inspectorOpen: Q, openInspector: ve } = te();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function ye(e) {
			H.value = H.value.map((t) => t.id === e.id ? e : t), R.success(`Updated metadata for “${e.name}”.`);
		}
		return (e, t) => (x(), m("div", j, [
			h("header", M, [t[6] ||= h("h1", { class: "search-title" }, "Search", -1), h("form", {
				class: "search-form",
				onSubmit: t[2] ||= D((...e) => C(q) && C(q)(...e), ["prevent"])
			}, [E(h("input", {
				ref_key: "inputRef",
				ref: Y,
				"onUpdate:modelValue": t[0] ||= (e) => V.value = e,
				type: "search",
				name: "q",
				placeholder: "Search movies, shows, music, books...",
				class: "search-input",
				autocomplete: "off",
				autofocus: "",
				onInput: t[1] ||= (...e) => C(q) && C(q)(...e)
			}, null, 544), [[ue, V.value]]), _(a, {
				type: "submit",
				variant: "solid"
			}, {
				default: T(() => [...t[5] ||= [g(" Search ", -1)]]),
				_: 1
			})], 32)]),
			W.value ? (x(), m("div", N, [_(ne, { label: "Searching…" })])) : me.value ? (x(), f(i, {
				key: 1,
				icon: "alert",
				title: G.value?.title ?? "Search failed",
				description: G.value?.description
			}, {
				actions: T(() => [_(a, {
					variant: "solid",
					size: "sm",
					onClick: J
				}, {
					default: T(() => [...t[7] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : pe.value ? (x(), f(i, {
				key: 2,
				icon: "search",
				title: "Search your library",
				description: "Enter a query above to find movies, shows, music, books, and more."
			})) : de.value ? (x(), f(i, {
				key: 3,
				icon: "film",
				title: `No results for "${V.value}"`,
				description: "Try a different spelling or fewer words."
			}, null, 8, ["title"])) : fe.value ? (x(), m(u, { key: 4 }, [he.value ? (x(), m("p", P, le(ge.value), 1)) : p("", !0), _(n, {
				items: H.value,
				total: U.value,
				"can-match": C(z).isAdmin,
				onMatch: $,
				onRefresh: $,
				onEditMetadata: $,
				onExploreData: C(ve)
			}, null, 8, [
				"items",
				"total",
				"can-match",
				"onExploreData"
			])], 64)) : p("", !0),
			C(z).isAdmin ? (x(), f(ee, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[3] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: ye
			}, null, 8, ["modelValue", "item"])) : p("", !0),
			C(z).isAdmin ? (x(), f(r, {
				key: 6,
				modelValue: C(Q),
				"onUpdate:modelValue": t[4] ||= (e) => y(Q) ? Q.value = e : null,
				item: C(_e)
			}, null, 8, ["modelValue", "item"])) : p("", !0)
		]));
	}
}), [["__scopeId", "data-v-2f97c0ff"]]);
export { F as default };

//# sourceMappingURL=SearchPage-BhQecUL2.js.map