import { n as e } from "./useApiBase-DXTBY90j.js";
import { n as t } from "./ThumbRating-DN0WTiew.js";
import { t as n } from "./MediaGrid-FwK9ilLj.js";
import { t as r } from "./MetadataMatchModal-BUBkYFu1.js";
import { n as i, t as a } from "./useItemInspector-DjCGX2EN.js";
import { t as o } from "./EmptyState-DjfWh3kt.js";
import { t as s } from "./Button-BLpPomsd.js";
import { t as c } from "./Spinner-Dh5qjkNO.js";
import { t as l } from "./useToastStore-CxO_ppM8.js";
import { t as ee } from "./useAuthStore-DmpzSF_9.js";
import { t as te, x as ne } from "./client-fSGeXil2.js";
import { t as re } from "./useMessages-BD3JvKjZ.js";
import { n as ie } from "./debounce-BnRz-bwe.js";
import { n as ae, t as oe } from "./wireErrors-BEWfE19X.js";
import { n as u } from "./Icon-55iG1rR7.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as se, isRef as ce, onMounted as le, openBlock as b, ref as x, toDisplayString as ue, unref as S, vModelText as de, watch as fe, withCtx as C, withDirectives as w, withModifiers as T } from "vue";
import { useRoute as E, useRouter as D } from "vue-router";
// src/pages/searchErrors.ts
function O(e, t, n) {
	return ae(e, {
		title: "Search failed",
		description: t
	}, n);
}
// src/pages/SearchPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "search-page" }, A = { class: "search-header" }, j = ["aria-label"], M = {
	key: 0,
	class: "search-loading"
}, N = {
	key: 0,
	class: "search-cap-notice"
}, P = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "SearchPage",
	setup(ae) {
		let u = E(), y = D(), P = e(), F = se("phlixConfig", null), I = t(), L = l(), R = ee(), { t: z } = re(), B = x(""), V = x([]), H = x(null), U = x(!1), W = x(null), G = x(!1), K = ie(() => {
			B.value.trim() === "" ? y.replace({ query: {} }) : y.replace({ query: { q: B.value.trim() } }), q();
		}, 300);
		async function q() {
			let e = B.value.trim();
			if (e === "") V.value = [], H.value = null, G.value = !1, W.value = null;
			else {
				G.value = !0, U.value = !0, W.value = null;
				try {
					let t = await new te({ baseUrl: P.value }).get("/api/v1/media/search", { q: e });
					V.value = t.items ?? [], H.value = typeof t.total == "number" && Number.isFinite(t.total) ? t.total : null, V.value.forEach((e) => I.hydrate(e));
				} catch (e) {
					W.value = O(oe(e), ne(e), F?.locale), V.value = [], H.value = null;
				} finally {
					U.value = !1;
				}
			}
		}
		let J = x(null);
		le(() => {
			let e = u.query.q ?? "";
			B.value = e, J.value?.focus(), e.trim() !== "" && q();
		}), fe(() => u.query.q, (e) => {
			let t = e ?? "";
			t !== B.value && (B.value = t, t.trim() === "" ? (V.value = [], H.value = null, G.value = !1) : q());
		});
		let pe = f(() => G.value && !U.value && V.value.length === 0 && W.value === null), me = f(() => G.value && !U.value && V.value.length > 0), he = f(() => !G.value && B.value.trim() === ""), ge = f(() => G.value && W.value !== null), _e = f(() => H.value !== null && V.value.length < H.value), Y = f(() => H.value === null ? "" : z("search.showingOf", {
			shown: V.value.length.toLocaleString(),
			total: H.value.toLocaleString()
		})), X = x(null), Z = x(!1), { inspectorItem: ve, inspectorOpen: Q, openInspector: ye } = a();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function be(e) {
			V.value = V.value.map((t) => t.id === e.id ? e : t), L.success(`Updated metadata for “${e.name}”.`);
		}
		return (e, t) => (b(), h("div", k, [
			g("header", A, [t[6] ||= g("h1", { class: "search-title" }, "Search", -1), g("form", {
				class: "search-form",
				onSubmit: t[2] ||= T((...e) => S(K) && S(K)(...e), ["prevent"])
			}, [w(g("input", {
				ref_key: "inputRef",
				ref: J,
				"onUpdate:modelValue": t[0] ||= (e) => B.value = e,
				type: "search",
				name: "q",
				"aria-label": S(z)("search.inputLabel"),
				placeholder: "Search movies, shows, music, books...",
				class: "search-input",
				autocomplete: "off",
				autofocus: "",
				onInput: t[1] ||= (...e) => S(K) && S(K)(...e)
			}, null, 40, j), [[de, B.value]]), v(s, {
				type: "submit",
				variant: "solid"
			}, {
				default: C(() => [...t[5] ||= [_(" Search ", -1)]]),
				_: 1
			})], 32)]),
			U.value ? (b(), h("div", M, [v(c, { label: "Searching…" })])) : ge.value ? (b(), p(o, {
				key: 1,
				icon: "alert",
				title: W.value?.title ?? "Search failed",
				description: W.value?.description
			}, {
				actions: C(() => [v(s, {
					variant: "solid",
					size: "sm",
					onClick: q
				}, {
					default: C(() => [...t[7] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : he.value ? (b(), p(o, {
				key: 2,
				icon: "search",
				title: "Search your library",
				description: "Enter a query above to find movies, shows, music, books, and more."
			})) : pe.value ? (b(), p(o, {
				key: 3,
				icon: "film",
				title: `No results for "${B.value}"`,
				description: "Try a different spelling or fewer words."
			}, null, 8, ["title"])) : me.value ? (b(), h(d, { key: 4 }, [_e.value ? (b(), h("p", N, ue(Y.value), 1)) : m("", !0), v(n, {
				items: V.value,
				total: H.value,
				"can-match": S(R).isAdmin,
				onMatch: $,
				onRefresh: $,
				onEditMetadata: $,
				onExploreData: S(ye)
			}, null, 8, [
				"items",
				"total",
				"can-match",
				"onExploreData"
			])], 64)) : m("", !0),
			S(R).isAdmin ? (b(), p(r, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[3] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: be
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			S(R).isAdmin ? (b(), p(i, {
				key: 6,
				modelValue: S(Q),
				"onUpdate:modelValue": t[4] ||= (e) => ce(Q) ? Q.value = e : null,
				item: S(ve)
			}, null, 8, ["modelValue", "item"])) : m("", !0)
		]));
	}
}), [["__scopeId", "data-v-cac708e3"]]);
export { P as default };

//# sourceMappingURL=SearchPage-D8rvnUj1.js.map