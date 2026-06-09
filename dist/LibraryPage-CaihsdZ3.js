import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-BwQkyEkr.js";
import { t as n } from "./useLibrariesStore-C5Sg25Ui.js";
import { n as r, r as i, t as a } from "./FilterBar-XS8TVjlb.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as h, onBeforeUnmount as g, onMounted as _, openBlock as v, toDisplayString as y, unref as b, watch as x, withCtx as S } from "vue";
import { useRoute as C, useRouter as w } from "vue-router";
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var T = { class: "library-page" }, E = {
	key: 1,
	class: "library"
}, D = { class: "library-header" }, O = { class: "library-title" }, k = { class: "library-count numeric" }, A = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "LibraryPage",
	setup(e) {
		let m = h("apiBase", ""), A = s(() => typeof m == "string" ? m : m?.value ?? ""), j = C(), M = w(), N = r(), P = n(), F = s(() => {
			let e = j.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), I = s(() => P.byId(F.value)?.name ?? "Library");
		function L() {
			F.value && (N.clearFilters(), N.setLibraryId(F.value), N.setTopLevel(!0), N.reset(), N.fetchMedia(A.value));
		}
		function R() {
			N.reset(), N.fetchMedia(A.value);
		}
		_(() => {
			P.load(A.value), L();
		}), x(F, L), x(A, R), g(() => {
			N.setLibraryId(void 0), N.setTopLevel(!1), N.clearFilters(), N.reset();
		});
		function z() {
			R();
		}
		function B() {
			N.loadMore(A.value);
		}
		function V(e, t) {
			M?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function H(e) {
			if (e.type === "series" && M?.hasRoute("media")) {
				V("media", e.id);
				return;
			}
			V("player", e.id);
		}
		function U() {}
		function W(e) {
			M?.hasRoute("media") && V("media", e.id);
		}
		return (e, n) => (v(), u("div", T, [F.value ? (v(), u("section", E, [
			d("div", D, [d("h1", O, y(I.value), 1), d("span", k, y(b(N).total.toLocaleString()) + " titles", 1)]),
			p(a, { onChange: z }),
			b(N).error ? (v(), c(o, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: b(N).error
			}, {
				actions: S(() => [p(t, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: R
				}, {
					default: S(() => [...n[0] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : l("", !0),
			p(i, {
				items: b(N).items,
				loading: b(N).loading && b(N).items.length === 0,
				"loading-more": b(N).loading && b(N).items.length > 0,
				"has-more": b(N).hasMore,
				onLoadMore: B,
				onPlay: H,
				onWatchlist: U,
				onInfo: W
			}, null, 8, [
				"items",
				"loading",
				"loading-more",
				"has-more"
			])
		])) : (v(), c(o, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		}))]));
	}
}), [["__scopeId", "data-v-cdc1ee50"]]);
//#endregion
export { A as default };

//# sourceMappingURL=LibraryPage-CaihsdZ3.js.map