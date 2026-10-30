import { n as e } from "./useApiBase-DXTBY90j.js";
import { n as t } from "./ThumbRating-Dr5AbPBd.js";
import { t as n } from "./MediaGrid-D48yTfou.js";
import { t as r } from "./MetadataMatchModal-uR8ZXQFH.js";
import { n as i, t as a } from "./useItemInspector-bSZsbjKu.js";
import { t as o } from "./EmptyState-BjOJ1k_A.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as c } from "./Spinner-B8wtViN3.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as te } from "./useAuthStore-D9S6HAT9.js";
import { t as l } from "./client-pLl-rDdN.js";
import { n as u } from "./debounce-BnRz-bwe.js";
import { n as d } from "./Icon-CIbfiPrs.js";
import { computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, isRef as b, onMounted as ne, openBlock as x, ref as S, unref as C, vModelText as w, watch as T, withCtx as E, withDirectives as D, withModifiers as re } from "vue";
import { useRoute as O, useRouter as k } from "vue-router";
// src/pages/SearchPage.vue?vue&type=script&setup=true&lang.ts
var A = { class: "search-page" }, j = { class: "search-header" }, M = {
	key: 0,
	class: "search-loading"
}, N = /*#__PURE__*/ d(/* @__PURE__ */ y({
	__name: "SearchPage",
	setup(d) {
		let y = O(), N = k(), P = e(), F = t(), I = ee(), L = te(), R = S(""), z = S([]), B = S(!1), V = S(null), H = S(!1), U = u(() => {
			R.value.trim() === "" ? N.replace({ query: {} }) : N.replace({ query: { q: R.value.trim() } }), W();
		}, 300);
		async function W() {
			let e = R.value.trim();
			if (e === "") z.value = [], H.value = !1, V.value = null;
			else {
				H.value = !0, B.value = !0, V.value = null;
				try {
					let t = await new l({ baseUrl: P.value }).get("/api/v1/media/search", { q: e });
					z.value = t.items ?? [], z.value.forEach((e) => F.hydrate(e));
				} catch (e) {
					V.value = e instanceof Error ? e.message : "Search failed", z.value = [];
				} finally {
					B.value = !1;
				}
			}
		}
		let G = S(null);
		ne(() => {
			let e = y.query.q ?? "";
			R.value = e, G.value?.focus(), e.trim() !== "" && W();
		}), T(() => y.query.q, (e) => {
			let t = e ?? "";
			t !== R.value && (R.value = t, t.trim() === "" ? (z.value = [], H.value = !1) : W());
		});
		let K = f(() => H.value && !B.value && z.value.length === 0 && V.value === null), q = f(() => H.value && !B.value && z.value.length > 0), J = f(() => !H.value && R.value.trim() === ""), Y = f(() => H.value && V.value !== null), X = S(null), Z = S(!1), { inspectorItem: ie, inspectorOpen: Q, openInspector: ae } = a();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function oe(e) {
			z.value = z.value.map((t) => t.id === e.id ? e : t), I.success(`Updated metadata for “${e.name}”.`);
		}
		return (e, t) => (x(), h("div", A, [
			g("header", j, [t[6] ||= g("h1", { class: "search-title" }, "Search", -1), g("form", {
				class: "search-form",
				onSubmit: t[2] ||= re((...e) => C(U) && C(U)(...e), ["prevent"])
			}, [D(g("input", {
				ref_key: "inputRef",
				ref: G,
				"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
				type: "search",
				name: "q",
				placeholder: "Search movies, shows, music, books...",
				class: "search-input",
				autocomplete: "off",
				autofocus: "",
				onInput: t[1] ||= (...e) => C(U) && C(U)(...e)
			}, null, 544), [[w, R.value]]), v(s, {
				type: "submit",
				variant: "solid"
			}, {
				default: E(() => [...t[5] ||= [_(" Search ", -1)]]),
				_: 1
			})], 32)]),
			B.value ? (x(), h("div", M, [v(c, { label: "Searching…" })])) : Y.value ? (x(), p(o, {
				key: 1,
				icon: "alert",
				title: "Search failed",
				description: V.value ?? void 0
			}, {
				actions: E(() => [v(s, {
					variant: "solid",
					size: "sm",
					onClick: W
				}, {
					default: E(() => [...t[7] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value ? (x(), p(o, {
				key: 2,
				icon: "search",
				title: "Search your library",
				description: "Enter a query above to find movies, shows, music, books, and more."
			})) : K.value ? (x(), p(o, {
				key: 3,
				icon: "film",
				title: `No results for "${R.value}"`,
				description: "Try a different spelling or fewer words."
			}, null, 8, ["title"])) : q.value ? (x(), p(n, {
				key: 4,
				items: z.value,
				total: z.value.length,
				"can-match": C(L).isAdmin,
				onMatch: $,
				onRefresh: $,
				onEditMetadata: $,
				onExploreData: C(ae)
			}, null, 8, [
				"items",
				"total",
				"can-match",
				"onExploreData"
			])) : m("", !0),
			C(L).isAdmin ? (x(), p(r, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[3] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: oe
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			C(L).isAdmin ? (x(), p(i, {
				key: 6,
				modelValue: C(Q),
				"onUpdate:modelValue": t[4] ||= (e) => b(Q) ? Q.value = e : null,
				item: C(ie)
			}, null, 8, ["modelValue", "item"])) : m("", !0)
		]));
	}
}), [["__scopeId", "data-v-fdff5924"]]);
export { N as default };

//# sourceMappingURL=SearchPage-CkfaMCAc.js.map