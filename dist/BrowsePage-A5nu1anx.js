import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-MsRePfWv.js";
import { t as n } from "./useAuthStore-BNs-pZEK.js";
import { i as r } from "./usePlayerStore-dMohDTWc.js";
import { t as i } from "./useLibrariesStore-DJmmZLu-.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { i as o, t as s } from "./MetadataMatchModal-Dg9_FRcQ.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as ee } from "./MediaRow-Drh_OdeG.js";
import { n as l } from "./useApiBase-DhSHB6Qp.js";
import { t as u } from "./HomeRow-VJbpWyC3.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, onMounted as x, openBlock as S, reactive as C, ref as w, renderList as T, renderSlot as E, unref as D, watch as O, withCtx as k } from "vue";
import { useRouter as A } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var te = { class: "browse-page" }, ne = { class: "browse-toolbar" }, re = {
	key: 1,
	class: "browse-loading"
}, j = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "BrowsePage",
	setup(e) {
		let y = l(), j = b("phlixConfig", null), ie = f(() => j?.homeRows ?? []), M = i(), N = r(), P = a(), F = n(), I = A(), L = w(null), R = w(!1), z = w(null);
		function B(e) {
			L.value = e, R.value = !0;
		}
		function V(e) {
			U.set(e.id, e), z.value = { ...e }, P.success(`Updated metadata for "${e.name}"`);
		}
		let H = f(() => M.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), U = C(/* @__PURE__ */ new Map());
		function W(e) {
			e.forEach((e) => U.set(e.id, e));
		}
		let G = f(() => {
			let e = N.resumeMap;
			return Object.keys(e).map((e) => U.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function K() {
			M.load(y.value, !0);
		}
		x(() => {
			M.load(y.value);
		}), O(y, K);
		let q = f(() => M.loaded && M.items.length === 0 && !M.error), J = f(() => M.loading && M.items.length === 0 && !M.error);
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
		return (e, n) => (S(), h("div", te, [
			g("div", ne, [E(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			G.value.length ? (S(), p(ee, {
				key: 0,
				title: "Continue Watching",
				items: G.value,
				"can-match": D(F).isAdmin,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: B
			}, null, 8, ["items", "can-match"])) : m("", !0),
			(S(!0), h(d, null, T(ie.value, (e) => (S(), p(u, {
				key: e.id,
				row: e,
				"api-base": D(y),
				"show-see-all": !!e.query?.libraryId,
				"can-match": D(F).isAdmin,
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
			(S(!0), h(d, null, T(H.value, (e) => (S(), p(u, {
				key: e.id,
				row: e,
				"api-base": D(y),
				"can-match": D(F).isAdmin,
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
			J.value ? (S(), h("div", re, [v(o, { label: "Loading libraries" })])) : m("", !0),
			D(M).error ? (S(), p(c, {
				key: 2,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: D(M).error
			}, {
				actions: k(() => [v(t, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: K
				}, {
					default: k(() => [...n[1] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value ? (S(), p(c, {
				key: 3,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : m("", !0),
			D(F).isAdmin ? (S(), p(s, {
				key: 4,
				modelValue: R.value,
				"onUpdate:modelValue": n[0] ||= (e) => R.value = e,
				item: L.value,
				onApplied: V
			}, null, 8, ["modelValue", "item"])) : m("", !0)
		]));
	}
}), [["__scopeId", "data-v-a58561d2"]]);
//#endregion
export { j as default };

//# sourceMappingURL=BrowsePage-A5nu1anx.js.map