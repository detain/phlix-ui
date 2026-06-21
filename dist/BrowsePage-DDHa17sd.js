import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-5ZSsUmsI.js";
import { t as n } from "./useAuthStore-DWVaTITC.js";
import { i as ee } from "./usePlayerStore-CCov4Tvr.js";
import { t as r } from "./useLibrariesStore-CsoGNIah.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { i as a, t as o } from "./MetadataMatchModal-DEJW4hCM.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as te } from "./MediaRow-CSAJjxOz.js";
import { t as c } from "./HomeRow-C0_2mdi-.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as ne, openBlock as y, reactive as re, ref as b, renderList as x, renderSlot as S, unref as C, watch as w, withCtx as T } from "vue";
import { useRouter as E } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var D = { class: "browse-page" }, O = { class: "browse-toolbar" }, k = {
	key: 1,
	class: "browse-loading"
}, A = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "BrowsePage",
	setup(e) {
		let _ = v("apiBase", ""), A = u(() => typeof _ == "string" ? _ : _?.value ?? ""), j = v("phlixConfig", null), ie = u(() => j?.homeRows ?? []), M = r(), N = ee(), P = i(), F = n(), I = E(), L = b(null), R = b(!1), z = b(null);
		function B(e) {
			L.value = e, R.value = !0;
		}
		function V(e) {
			U.set(e.id, e), z.value = { ...e }, P.success(`Updated metadata for "${e.name}"`);
		}
		let H = u(() => M.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), U = re(/* @__PURE__ */ new Map());
		function W(e) {
			e.forEach((e) => U.set(e.id, e));
		}
		let G = u(() => {
			let e = N.resumeMap;
			return Object.keys(e).map((e) => U.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function K() {
			M.load(A.value, !0);
		}
		ne(() => {
			M.load(A.value);
		}), w(A, K);
		let q = u(() => M.loaded && M.items.length === 0 && !M.error), J = u(() => M.loading && M.items.length === 0 && !M.error);
		function Y(e, t) {
			I?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function X(e) {
			if (e.type === "series" && I?.hasRoute("media")) {
				Y("media", e.id);
				return;
			}
			Y("player", e.id);
		}
		function Z(e) {
			P.success(`Added "${e.name}" to your list`);
		}
		function Q(e) {
			I?.hasRoute("media") ? Y("media", e.id) : P.info(`Details for "${e.name}" are coming soon`);
		}
		function $(e) {
			let t = e.query?.libraryId;
			t && I?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, n) => (y(), p("div", D, [
			m("div", O, [S(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			G.value.length ? (y(), d(te, {
				key: 0,
				title: "Continue Watching",
				items: G.value,
				"can-match": C(F).isAdmin,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: B
			}, null, 8, ["items", "can-match"])) : f("", !0),
			(y(!0), p(l, null, x(ie.value, (e) => (y(), d(c, {
				key: e.id,
				row: e,
				"api-base": A.value,
				"show-see-all": !!e.query?.libraryId,
				"can-match": C(F).isAdmin,
				"applied-item": z.value,
				onItemsLoaded: W,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: B
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item"
			]))), 128)),
			(y(!0), p(l, null, x(H.value, (e) => (y(), d(c, {
				key: e.id,
				row: e,
				"api-base": A.value,
				"can-match": C(F).isAdmin,
				"applied-item": z.value,
				onItemsLoaded: W,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: B
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item"
			]))), 128)),
			J.value ? (y(), p("div", k, [g(a, { label: "Loading libraries" })])) : f("", !0),
			C(M).error ? (y(), d(s, {
				key: 2,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: C(M).error
			}, {
				actions: T(() => [g(t, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: T(() => [...n[1] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value ? (y(), d(s, {
				key: 3,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : f("", !0),
			C(F).isAdmin ? (y(), d(o, {
				key: 4,
				modelValue: R.value,
				"onUpdate:modelValue": n[0] ||= (e) => R.value = e,
				item: L.value,
				onApplied: V
			}, null, 8, ["modelValue", "item"])) : f("", !0)
		]));
	}
}), [["__scopeId", "data-v-d5fdf401"]]);
//#endregion
export { A as default };

//# sourceMappingURL=BrowsePage-DDHa17sd.js.map