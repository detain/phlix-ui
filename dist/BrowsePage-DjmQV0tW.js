import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-BwQkyEkr.js";
import { a as n } from "./media-query-DowsWq-z.js";
import { t as r } from "./MediaRow-yOkKwyWU.js";
import { i, n as a, r as o, t as s } from "./FilterBar-B4zzOQ0y.js";
import { t as c } from "./useToastStore-BDoKlU6N.js";
import { t as l } from "./EmptyState-Ds4WcVdG.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as y, onMounted as b, openBlock as x, reactive as S, ref as C, renderList as w, renderSlot as T, toDisplayString as E, unref as D, watch as O, withCtx as k } from "vue";
import { useRouter as A } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var j = { class: "browse-page" }, M = { class: "browse-toolbar" }, N = { class: "browse-header" }, P = { class: "browse-count numeric" }, F = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "BrowsePage",
	setup(e) {
		let v = y("apiBase", ""), F = d(() => typeof v == "string" ? v : v?.value ?? ""), I = y("phlixConfig", null), L = d(() => I?.homeRows ?? []), R = a(), z = n(), B = c(), V = A(), H = C(null), U = S(/* @__PURE__ */ new Map());
		function W(e) {
			e.forEach((e) => U.set(e.id, e));
		}
		O(() => R.items, (e) => W(e), { immediate: !0 });
		let G = d(() => {
			let e = z.resumeMap;
			return Object.keys(e).map((e) => U.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function K() {
			R.reset(), R.fetchMedia(F.value);
		}
		b(K), O(F, K);
		function q() {
			R.reset(), R.fetchMedia(F.value);
		}
		function J() {
			R.loadMore(F.value);
		}
		function Y(e, t) {
			V?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function X(e) {
			Y("player", e.id);
		}
		function Z(e) {
			B.success(`Added "${e.name}" to your list`);
		}
		function Q(e) {
			V?.hasRoute("media") ? Y("media", e.id) : B.info(`Details for "${e.name}" are coming soon`);
		}
		function $() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function ee(e) {
			R.applyQuery(e.query ?? {}), K(), H.value?.scrollIntoView?.({
				behavior: $() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (e, n) => (x(), m("div", j, [
			h("div", M, [T(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			G.value.length ? (x(), f(r, {
				key: 0,
				title: "Continue Watching",
				items: G.value,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q
			}, null, 8, ["items"])) : p("", !0),
			(x(!0), m(u, null, w(L.value, (e) => (x(), f(o, {
				key: e.id,
				row: e,
				"api-base": F.value,
				onItemsLoaded: W,
				onSeeAll: ee,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q
			}, null, 8, ["row", "api-base"]))), 128)),
			h("section", {
				ref_key: "gridSection",
				ref: H,
				class: "browse-library"
			}, [
				h("div", N, [n[0] ||= h("h1", { class: "browse-title" }, "Browse", -1), h("span", P, E(D(R).total.toLocaleString()) + " titles", 1)]),
				_(s, { onChange: q }),
				D(R).error ? (x(), f(l, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: D(R).error
				}, {
					actions: k(() => [_(t, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: K
					}, {
						default: k(() => [...n[1] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : p("", !0),
				_(i, {
					items: D(R).items,
					loading: D(R).loading && D(R).items.length === 0,
					"loading-more": D(R).loading && D(R).items.length > 0,
					"has-more": D(R).hasMore,
					onLoadMore: J,
					onPlay: X,
					onWatchlist: Z,
					onInfo: Q
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-c89757fa"]]);
//#endregion
export { F as default };

//# sourceMappingURL=BrowsePage-DjmQV0tW.js.map