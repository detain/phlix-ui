import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-BwQkyEkr.js";
import { t as n } from "./useLibrariesStore-C5Sg25Ui.js";
import { i as r } from "./usePageTitle-BO3GGF3M.js";
import { n as i, r as a, t as o } from "./FilterBar-D1K87otJ.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, onBeforeUnmount as _, onMounted as v, openBlock as y, toDisplayString as b, unref as x, watch as S, withCtx as C } from "vue";
import { useRoute as w, useRouter as T } from "vue-router";
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var E = { class: "library-page" }, D = {
	key: 1,
	class: "library"
}, O = { class: "library-header" }, k = { class: "library-title" }, A = { class: "library-count numeric" }, j = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "LibraryPage",
	setup(e) {
		let h = g("apiBase", ""), j = c(() => typeof h == "string" ? h : h?.value ?? ""), M = w(), N = T(), P = i(), F = n(), I = c(() => {
			let e = M.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), L = c(() => F.byId(I.value)?.name ?? "Library");
		r(() => F.byId(I.value)?.name);
		function R() {
			I.value && (P.clearFilters(), P.setLibraryId(I.value), P.setTopLevel(!0), P.reset(), P.fetchMedia(j.value));
		}
		function z() {
			P.reset(), P.fetchMedia(j.value);
		}
		v(() => {
			F.load(j.value), R();
		}), S(I, R), S(j, z), _(() => {
			P.setLibraryId(void 0), P.setTopLevel(!1), P.clearFilters(), P.reset();
		});
		function B() {
			z();
		}
		function V() {
			P.loadMore(j.value);
		}
		function H(e, t) {
			N?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function U(e) {
			if (e.type === "series" && N?.hasRoute("media")) {
				H("media", e.id);
				return;
			}
			H("player", e.id);
		}
		function W() {}
		function G(e) {
			N?.hasRoute("media") && H("media", e.id);
		}
		return (e, n) => (y(), d("div", E, [I.value ? (y(), d("section", D, [
			f("div", O, [f("h1", k, b(L.value), 1), f("span", A, b(x(P).total.toLocaleString()) + " titles", 1)]),
			m(o, { onChange: B }),
			x(P).error ? (y(), l(s, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: x(P).error
			}, {
				actions: C(() => [m(t, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: z
				}, {
					default: C(() => [...n[0] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(a, {
				items: x(P).items,
				loading: x(P).loading && x(P).items.length === 0,
				"loading-more": x(P).loading && x(P).items.length > 0,
				"has-more": x(P).hasMore,
				onLoadMore: V,
				onPlay: U,
				onWatchlist: W,
				onInfo: G
			}, null, 8, [
				"items",
				"loading",
				"loading-more",
				"has-more"
			])
		])) : (y(), l(s, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		}))]));
	}
}), [["__scopeId", "data-v-7e9c127a"]]);
//#endregion
export { j as default };

//# sourceMappingURL=LibraryPage-e1KjaFKd.js.map