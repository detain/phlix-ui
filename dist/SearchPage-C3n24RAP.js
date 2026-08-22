import { n as e } from "./Icon-CkTBN_k5.js";
import { t } from "./client-COHWZ2KC.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-Bxpn4wWU.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { n as a } from "./ThumbRating-DZt3qThy.js";
import { t as o } from "./Spinner-COUSlhgo.js";
import { t as s } from "./Button-Cw8Wl4QR.js";
import { t as c } from "./EmptyState-CwWtkhEJ.js";
import { t as l } from "./MediaGrid-4qDkIH63.js";
import { t as u } from "./MetadataMatchModal-JSpi0YZP.js";
import { n as d, t as f } from "./useItemInspector-Cn3FRzeh.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, isRef as x, onMounted as S, openBlock as C, ref as w, unref as T, vModelText as E, watch as D, withCtx as O, withDirectives as ee, withModifiers as te } from "vue";
import { useRoute as ne, useRouter as re } from "vue-router";
//#region src/pages/SearchPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "search-page" }, A = { class: "search-header" }, j = {
	key: 0,
	class: "search-loading"
}, M = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "SearchPage",
	setup(e) {
		let b = ne(), M = re(), N = n(), P = a(), F = i(), I = r(), L = w(""), R = w([]), z = w(!1), B = w(null), V = w(!1), H = null;
		function U() {
			H !== null && clearTimeout(H), H = setTimeout(() => {
				L.value.trim() === "" ? M.replace({ query: {} }) : M.replace({ query: { q: L.value.trim() } }), W();
			}, 300);
		}
		async function W() {
			let e = L.value.trim();
			if (e === "") {
				R.value = [], V.value = !1, B.value = null;
				return;
			}
			V.value = !0, z.value = !0, B.value = null;
			try {
				let n = await new t({ baseUrl: N.value }).get("/api/v1/media/search", { q: e });
				R.value = n.items ?? [], R.value.forEach((e) => P.hydrate(e));
			} catch (e) {
				B.value = e instanceof Error ? e.message : "Search failed", R.value = [];
			} finally {
				z.value = !1;
			}
		}
		let G = w(null);
		S(() => {
			let e = b.query.q ?? "";
			L.value = e, G.value?.focus(), e.trim() !== "" && W();
		}), D(() => b.query.q, (e) => {
			let t = e ?? "";
			t !== L.value && (L.value = t, t.trim() === "" ? (R.value = [], V.value = !1) : W());
		});
		let K = p(() => V.value && !z.value && R.value.length === 0 && B.value === null), q = p(() => V.value && !z.value && R.value.length > 0), J = p(() => !V.value && L.value.trim() === ""), Y = p(() => V.value && B.value !== null), X = w(null), Z = w(!1), { inspectorItem: ie, inspectorOpen: Q, openInspector: ae } = f();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function oe(e) {
			R.value = R.value.map((t) => t.id === e.id ? e : t), F.success(`Updated metadata for "${e.name}"`);
		}
		return (e, t) => (C(), g("div", k, [
			_("header", A, [t[4] ||= _("h1", { class: "search-title" }, "Search", -1), _("form", {
				class: "search-form",
				onSubmit: te(U, ["prevent"])
			}, [ee(_("input", {
				ref_key: "inputRef",
				ref: G,
				"onUpdate:modelValue": t[0] ||= (e) => L.value = e,
				type: "search",
				name: "q",
				placeholder: "Search movies, shows, music, books...",
				class: "search-input",
				autocomplete: "off",
				autofocus: "",
				onInput: U
			}, null, 544), [[E, L.value]]), y(s, {
				type: "submit",
				variant: "solid"
			}, {
				default: O(() => [...t[3] ||= [v(" Search ", -1)]]),
				_: 1
			})], 32)]),
			z.value ? (C(), g("div", j, [y(o, { label: "Searching…" })])) : Y.value ? (C(), m(c, {
				key: 1,
				icon: "alert",
				title: "Search failed",
				description: B.value ?? void 0
			}, {
				actions: O(() => [y(s, {
					variant: "solid",
					size: "sm",
					onClick: W
				}, {
					default: O(() => [...t[5] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value ? (C(), m(c, {
				key: 2,
				icon: "search",
				title: "Search your library",
				description: "Enter a query above to find movies, shows, music, books, and more."
			})) : K.value ? (C(), m(c, {
				key: 3,
				icon: "film",
				title: `No results for "${L.value}"`,
				description: "Try a different spelling or fewer words."
			}, null, 8, ["title"])) : q.value ? (C(), m(l, {
				key: 4,
				items: R.value,
				total: R.value.length,
				"can-match": T(I).isAdmin,
				onMatch: $,
				onEditMetadata: $,
				onExploreData: T(ae)
			}, null, 8, [
				"items",
				"total",
				"can-match",
				"onExploreData"
			])) : h("", !0),
			T(I).isAdmin ? (C(), m(u, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[1] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: oe
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(I).isAdmin ? (C(), m(d, {
				key: 6,
				modelValue: T(Q),
				"onUpdate:modelValue": t[2] ||= (e) => x(Q) ? Q.value = e : null,
				item: T(ie)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-c367d3f7"]]);
//#endregion
export { M as default };

//# sourceMappingURL=SearchPage-C3n24RAP.js.map