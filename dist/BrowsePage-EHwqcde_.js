import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./Button-BwQkyEkr.js";
import { i as n } from "./usePlayerStore-Cffo63UC.js";
import { t as r } from "./useLibrariesStore-C5Sg25Ui.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { n as a, t as o } from "./MediaRow-CUlaxo3r.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as c } from "./HomeRow-VPPZBTAJ.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as v, onMounted as y, openBlock as b, reactive as x, renderList as S, renderSlot as C, unref as w, watch as T, withCtx as E } from "vue";
import { useRouter as D } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "browse-page" }, k = { class: "browse-toolbar" }, A = {
	key: 1,
	class: "browse-loading"
}, j = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "BrowsePage",
	setup(e) {
		let _ = v("apiBase", ""), j = u(() => typeof _ == "string" ? _ : _?.value ?? ""), M = v("phlixConfig", null), N = u(() => M?.homeRows ?? []), P = r(), F = n(), I = i(), L = D(), R = u(() => P.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), z = x(/* @__PURE__ */ new Map());
		function B(e) {
			e.forEach((e) => z.set(e.id, e));
		}
		let V = u(() => {
			let e = F.resumeMap;
			return Object.keys(e).map((e) => z.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function H() {
			P.load(j.value, !0);
		}
		y(() => {
			P.load(j.value);
		}), T(j, H);
		let U = u(() => P.loaded && P.items.length === 0 && !P.error), W = u(() => P.loading && P.items.length === 0 && !P.error);
		function G(e, t) {
			L?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function K(e) {
			if (e.type === "series" && L?.hasRoute("media")) {
				G("media", e.id);
				return;
			}
			G("player", e.id);
		}
		function q(e) {
			I.success(`Added "${e.name}" to your list`);
		}
		function J(e) {
			L?.hasRoute("media") ? G("media", e.id) : I.info(`Details for "${e.name}" are coming soon`);
		}
		function Y(e) {
			let t = e.query?.libraryId;
			t && L?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, n) => (b(), p("div", O, [
			m("div", k, [C(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			V.value.length ? (b(), d(o, {
				key: 0,
				title: "Continue Watching",
				items: V.value,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J
			}, null, 8, ["items"])) : f("", !0),
			(b(!0), p(l, null, S(N.value, (e) => (b(), d(c, {
				key: e.id,
				row: e,
				"api-base": j.value,
				"show-see-all": !!e.query?.libraryId,
				onItemsLoaded: B,
				onSeeAll: Y,
				onPlay: K,
				onWatchlist: q,
				onInfo: J
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all"
			]))), 128)),
			(b(!0), p(l, null, S(R.value, (e) => (b(), d(c, {
				key: e.id,
				row: e,
				"api-base": j.value,
				onItemsLoaded: B,
				onSeeAll: Y,
				onPlay: K,
				onWatchlist: q,
				onInfo: J
			}, null, 8, ["row", "api-base"]))), 128)),
			W.value ? (b(), p("div", A, [g(a, { label: "Loading libraries" })])) : f("", !0),
			w(P).error ? (b(), d(s, {
				key: 2,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: w(P).error
			}, {
				actions: E(() => [g(t, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: H
				}, {
					default: E(() => [...n[0] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : U.value ? (b(), d(s, {
				key: 3,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : f("", !0)
		]));
	}
}), [["__scopeId", "data-v-261be144"]]);
//#endregion
export { j as default };

//# sourceMappingURL=BrowsePage-EHwqcde_.js.map