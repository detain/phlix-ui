import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-BoVYipAG.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-egnE99W_.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { n as a } from "./ThumbRating-YDkRXLef.js";
import { t as o } from "./Spinner-CbyAsXDA.js";
import { t as s } from "./Button-BL3fV7FU.js";
import { t as c } from "./EmptyState-BwwPJtFd.js";
import { t as ee } from "./MediaGrid-CGE5R7Ed.js";
import { n as te } from "./debounce-BkSsZiXZ.js";
import { t as l } from "./MetadataMatchModal-DpneMXC7.js";
import { n as u, t as d } from "./useItemInspector-CD_Zihnh.js";
import { computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, isRef as b, onMounted as ne, openBlock as x, ref as S, unref as C, vModelText as w, watch as T, withCtx as E, withDirectives as D, withModifiers as O } from "vue";
import { useRoute as re, useRouter as k } from "vue-router";
//#region src/pages/SearchPage.vue?vue&type=script&setup=true&lang.ts
var A = { class: "search-page" }, j = { class: "search-header" }, M = {
	key: 0,
	class: "search-loading"
}, N = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "SearchPage",
	setup(e) {
		let y = re(), N = k(), P = n(), F = a(), I = i(), L = r(), R = S(""), z = S([]), B = S(!1), V = S(null), H = S(!1), U = te(() => {
			R.value.trim() === "" ? N.replace({ query: {} }) : N.replace({ query: { q: R.value.trim() } }), W();
		}, 300);
		async function W() {
			let e = R.value.trim();
			if (e === "") {
				z.value = [], H.value = !1, V.value = null;
				return;
			}
			H.value = !0, B.value = !0, V.value = null;
			try {
				let n = await new t({ baseUrl: P.value }).get("/api/v1/media/search", { q: e });
				z.value = n.items ?? [], z.value.forEach((e) => F.hydrate(e));
			} catch (e) {
				V.value = e instanceof Error ? e.message : "Search failed", z.value = [];
			} finally {
				B.value = !1;
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
		let K = f(() => H.value && !B.value && z.value.length === 0 && V.value === null), q = f(() => H.value && !B.value && z.value.length > 0), J = f(() => !H.value && R.value.trim() === ""), Y = f(() => H.value && V.value !== null), X = S(null), Z = S(!1), { inspectorItem: ie, inspectorOpen: Q, openInspector: ae } = d();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function oe(e) {
			z.value = z.value.map((t) => t.id === e.id ? e : t), I.success(`Updated metadata for "${e.name}"`);
		}
		return (e, t) => (x(), h("div", A, [
			g("header", j, [t[6] ||= g("h1", { class: "search-title" }, "Search", -1), g("form", {
				class: "search-form",
				onSubmit: t[2] ||= O((...e) => C(U) && C(U)(...e), ["prevent"])
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
			B.value ? (x(), h("div", M, [v(o, { label: "Searching…" })])) : Y.value ? (x(), p(c, {
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
			}, 8, ["description"])) : J.value ? (x(), p(c, {
				key: 2,
				icon: "search",
				title: "Search your library",
				description: "Enter a query above to find movies, shows, music, books, and more."
			})) : K.value ? (x(), p(c, {
				key: 3,
				icon: "film",
				title: `No results for "${R.value}"`,
				description: "Try a different spelling or fewer words."
			}, null, 8, ["title"])) : q.value ? (x(), p(ee, {
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
			C(L).isAdmin ? (x(), p(l, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[3] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: oe
			}, null, 8, ["modelValue", "item"])) : m("", !0),
			C(L).isAdmin ? (x(), p(u, {
				key: 6,
				modelValue: C(Q),
				"onUpdate:modelValue": t[4] ||= (e) => b(Q) ? Q.value = e : null,
				item: C(ie)
			}, null, 8, ["modelValue", "item"])) : m("", !0)
		]));
	}
}), [["__scopeId", "data-v-2f41ffb8"]]);
//#endregion
export { N as default };

//# sourceMappingURL=SearchPage-8IGbUB27.js.map