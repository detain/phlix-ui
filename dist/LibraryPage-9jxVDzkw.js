import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-9cUUJmnN.js";
import { t as n } from "./useAuthStore-BNt_Vq18.js";
import { t as r } from "./useLibrariesStore-BehDWfBH.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { n as a, r as o, t as s } from "./FilterBar-CaQLZ8a6.js";
import { t as c } from "./MetadataMatchModal-OhFsKc_u.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onBeforeUnmount as y, onMounted as b, openBlock as x, ref as S, toDisplayString as C, unref as w, watch as T, withCtx as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
//#region src/pages/LibraryPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "library-page" }, A = {
	key: 1,
	class: "library"
}, j = { class: "library-header" }, M = { class: "library-title" }, N = { class: "library-count numeric" }, P = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibraryPage",
	setup(e) {
		let _ = v("apiBase", ""), P = u(() => typeof _ == "string" ? _ : _?.value ?? ""), F = D(), I = O(), L = a(), R = r(), z = n(), B = S(null), V = S(!1);
		function H(e) {
			B.value = e, V.value = !0;
		}
		function U() {
			J();
		}
		let W = u(() => {
			let e = F.params.id;
			return Array.isArray(e) ? e[0] : e ?? "";
		}), G = u(() => R.byId(W.value)?.name ?? "Library");
		i(() => R.byId(W.value)?.name);
		function K() {
			W.value && (L.clearFilters(), L.setLibraryId(W.value), L.setTopLevel(!0), q(), L.reset(), L.fetchMedia(P.value));
		}
		function q() {
			let e = F.query.actors, t = Array.isArray(e) ? e.filter((e) => !!e) : e ? [e] : [];
			t.length && L.setActors(t);
			let n = Array.isArray(F.query.match) ? F.query.match[0] : F.query.match;
			(n === "matched" || n === "unmatched") && L.setMatchStatus(n);
		}
		function J() {
			L.reset(), L.fetchMedia(P.value);
		}
		b(() => {
			R.load(P.value), K();
		}), T(W, K), T(P, J), y(() => {
			L.setLibraryId(void 0), L.setTopLevel(!1), L.clearFilters(), L.reset();
		});
		function Y() {
			J();
		}
		function X() {
			L.loadMore(P.value);
		}
		function Z(e, t) {
			I?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function Q(e) {
			if (e.type === "series" && I?.hasRoute("media")) {
				Z("media", e.id);
				return;
			}
			Z("player", e.id);
		}
		function $() {}
		function ee(e) {
			I?.hasRoute("media") && Z("media", e.id);
		}
		return (e, n) => (x(), p("div", k, [W.value ? (x(), p("section", A, [
			m("div", j, [m("h1", M, C(G.value), 1), m("span", N, C(w(L).total.toLocaleString()) + " titles", 1)]),
			g(s, { onChange: Y }),
			w(L).error ? (x(), d(l, {
				key: 0,
				icon: "alert",
				title: "Couldn't load titles",
				description: w(L).error
			}, {
				actions: E(() => [g(t, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: E(() => [...n[1] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : f("", !0),
			g(o, {
				items: w(L).items,
				loading: w(L).loading && w(L).items.length === 0,
				"loading-more": w(L).loading && w(L).items.length > 0,
				"has-more": w(L).hasMore,
				"can-match": w(z).isAdmin,
				onLoadMore: X,
				onPlay: Q,
				onWatchlist: $,
				onInfo: ee,
				onMatch: H
			}, null, 8, [
				"items",
				"loading",
				"loading-more",
				"has-more",
				"can-match"
			])
		])) : (x(), d(l, {
			key: 0,
			icon: "alert",
			title: "Library not found",
			description: "No library was specified."
		})), w(z).isAdmin ? (x(), d(c, {
			key: 2,
			modelValue: V.value,
			"onUpdate:modelValue": n[0] ||= (e) => V.value = e,
			item: B.value,
			onApplied: U
		}, null, 8, ["modelValue", "item"])) : f("", !0)]));
	}
}), [["__scopeId", "data-v-72e3a202"]]);
//#endregion
export { P as default };

//# sourceMappingURL=LibraryPage-9jxVDzkw.js.map