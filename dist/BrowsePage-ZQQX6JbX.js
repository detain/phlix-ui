import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t } from "./useApiBase-CV_r-Kk4.js";
import { t as n } from "./useAuthStore-BDivyavD.js";
import { i as r } from "./usePlayerStore-iTjrRIZa.js";
import { t as i } from "./useLibrariesStore-DWgvv56W.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { a as s, i as ee, t as c } from "./MetadataMatchModal-CIp61Nci.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { t as u } from "./MediaRow-BGNk2enu.js";
import { t as d } from "./HomeRow-B7yeNT7a.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, onMounted as S, openBlock as C, reactive as w, ref as T, renderList as E, renderSlot as D, unref as O, watch as k, withCtx as A } from "vue";
import { useRouter as te } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var ne = { class: "browse-page" }, re = { class: "browse-toolbar" }, ie = {
	key: 1,
	class: "browse-loading"
}, j = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "BrowsePage",
	setup(e) {
		let b = t(), j = x("phlixConfig", null), M = p(() => j?.homeRows ?? []), N = i(), P = r(), F = o(), I = n(), L = ee(), R = te(), z = T(null), B = T(!1), V = T(null);
		function H(e) {
			z.value = e, B.value = !0;
		}
		function U(e) {
			G.set(e.id, e), V.value = { ...e }, F.success(`Updated metadata for "${e.name}"`);
		}
		let W = p(() => N.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), G = w(/* @__PURE__ */ new Map());
		function K(e) {
			e.forEach((e) => G.set(e.id, e));
		}
		let q = p(() => {
			let e = P.resumeMap;
			return Object.keys(e).map((e) => G.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function J() {
			N.load(b.value, !0);
		}
		S(() => {
			N.load(b.value);
		}), k(b, J);
		let ae = p(() => N.loaded && N.items.length === 0 && !N.error), oe = p(() => N.loading && N.items.length === 0 && !N.error);
		function Y(e, t) {
			R?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function X(e) {
			if (e.type === "series" && R?.hasRoute("media")) {
				Y("media", e.id);
				return;
			}
			Y("player", e.id);
		}
		function Z(e) {
			L.isFavorite(e.id) ? F.success(`Added "${e.name}" to your favorites`) : F.info(`Removed "${e.name}" from your favorites`);
		}
		function Q(e) {
			R?.hasRoute("media") ? Y("media", e.id) : F.info(`Details for "${e.name}" are coming soon`);
		}
		function $(e) {
			let t = e.query?.libraryId;
			t && R?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (C(), g("div", ne, [
			_("div", re, [D(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			q.value.length ? (C(), m(u, {
				key: 0,
				title: "Continue Watching",
				items: q.value,
				"can-match": O(I).isAdmin,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: H
			}, null, 8, ["items", "can-match"])) : h("", !0),
			(C(!0), g(f, null, E(M.value, (e) => (C(), m(d, {
				key: e.id,
				row: e,
				"api-base": O(b),
				"show-see-all": !!e.query?.libraryId,
				"can-match": O(I).isAdmin,
				"applied-item": V.value,
				onItemsLoaded: K,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: H
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item"
			]))), 128)),
			(C(!0), g(f, null, E(W.value, (e) => (C(), m(d, {
				key: e.id,
				row: e,
				"api-base": O(b),
				"can-match": O(I).isAdmin,
				"applied-item": V.value,
				onItemsLoaded: K,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: H
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item"
			]))), 128)),
			oe.value ? (C(), g("div", ie, [y(s, { label: "Loading libraries" })])) : h("", !0),
			O(N).error ? (C(), m(l, {
				key: 2,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: O(N).error
			}, {
				actions: A(() => [y(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: A(() => [...t[1] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : ae.value ? (C(), m(l, {
				key: 3,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : h("", !0),
			O(I).isAdmin ? (C(), m(c, {
				key: 4,
				modelValue: B.value,
				"onUpdate:modelValue": t[0] ||= (e) => B.value = e,
				item: z.value,
				onApplied: U
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-5b1b8328"]]);
//#endregion
export { j as default };

//# sourceMappingURL=BrowsePage-ZQQX6JbX.js.map