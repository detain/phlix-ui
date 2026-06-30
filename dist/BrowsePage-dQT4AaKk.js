import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-cUL8r-1I.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as ee } from "./useAuthStore-CJrazXSP.js";
import { i as te } from "./usePlayerStore-iTjrRIZa.js";
import { t as r } from "./useLibrariesStore-Bpp1SwfJ.js";
import { t as i } from "./Button-k7aQagzg.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { i as o, o as s, t as ne } from "./MetadataMatchModal-DDiTml_F.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as l } from "./MediaRow-DYxCLrLX.js";
import { t as u } from "./HomeRow-DRWIKU0k.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as re, createTextVNode as ie, createVNode as g, defineComponent as _, inject as ae, onMounted as v, openBlock as y, reactive as b, ref as x, renderList as S, renderSlot as C, unref as w, watch as T, withCtx as E } from "vue";
import { useRouter as oe } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var se = { class: "browse-page" }, ce = { class: "browse-toolbar" }, le = {
	key: 2,
	class: "browse-loading"
}, ue = 24, D = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "BrowsePage",
	setup(e) {
		let _ = n(), D = ae("phlixConfig", null), O = f(() => D?.homeRows ?? []), k = r(), de = te(), A = a(), j = ee(), M = o(), N = oe(), P = x(null), F = x(!1), I = x(null);
		function L(e) {
			P.value = e, F.value = !0;
		}
		function R(e) {
			B.set(e.id, e), I.value = { ...e }, A.success(`Updated metadata for "${e.name}"`);
		}
		let z = f(() => k.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), B = b(/* @__PURE__ */ new Map());
		function V(e) {
			e.forEach((e) => B.set(e.id, e));
		}
		let H = f(() => {
			let e = de.resumeMap;
			return Object.keys(e).map((e) => B.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), U = x([]), W = x(!1), G = x(null), K = null;
		function fe(e) {
			return K ? K.setBaseUrl(e) : K = new t({ baseUrl: e }), K;
		}
		async function q() {
			if (!W.value) {
				W.value = !0, G.value = null;
				try {
					let { items: e } = await fe(_.value).listFavorites({ limit: ue });
					U.value = e, e.forEach((e) => M.hydrate(e)), V(e);
				} catch (e) {
					G.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					W.value = !1;
				}
			}
		}
		let pe = f(() => {
			let e = [];
			return M.entries.forEach((t, n) => {
				t.favorite && e.push(n);
			}), e.sort().join(",");
		}), me = f(() => !W.value && !G.value && U.value.length > 0);
		function J() {
			k.load(_.value, !0), q();
		}
		v(() => {
			k.load(_.value), q();
		}), T(_, J), T(pe, () => {
			q();
		});
		let he = f(() => k.loaded && k.items.length === 0 && !k.error), ge = f(() => k.loading && k.items.length === 0 && !k.error);
		function Y(e, t) {
			N?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function X(e) {
			if (e.type === "series" && N?.hasRoute("media")) {
				Y("media", e.id);
				return;
			}
			Y("player", e.id);
		}
		function Z(e) {
			M.isFavorite(e.id) ? A.success(`Added "${e.name}" to your favorites`) : A.info(`Removed "${e.name}" from your favorites`);
		}
		function Q(e) {
			N?.hasRoute("media") ? Y("media", e.id) : A.info(`Details for "${e.name}" are coming soon`);
		}
		function $(e) {
			let t = e.query?.libraryId;
			t && N?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (y(), h("div", se, [
			re("div", ce, [C(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			H.value.length ? (y(), p(l, {
				key: 0,
				title: "Continue Watching",
				items: H.value,
				"can-match": w(j).isAdmin,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: L
			}, null, 8, ["items", "can-match"])) : m("", !0),
			me.value ? (y(), p(l, {
				key: 1,
				title: "Favorites",
				items: U.value,
				"can-match": w(j).isAdmin,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: L
			}, null, 8, ["items", "can-match"])) : m("", !0),
			(y(!0), h(d, null, S(O.value, (e) => (y(), p(u, {
				key: e.id,
				row: e,
				"api-base": w(_),
				"show-see-all": !!e.query?.libraryId,
				"can-match": w(j).isAdmin,
				"applied-item": I.value,
				onItemsLoaded: V,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: L
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item"
			]))), 128)),
			(y(!0), h(d, null, S(z.value, (e) => (y(), p(u, {
				key: e.id,
				row: e,
				"api-base": w(_),
				"can-match": w(j).isAdmin,
				"applied-item": I.value,
				onItemsLoaded: V,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: L
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item"
			]))), 128)),
			ge.value ? (y(), h("div", le, [g(s, { label: "Loading libraries" })])) : m("", !0),
			w(k).error ? (y(), p(c, {
				key: 3,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: w(k).error
			}, {
				actions: E(() => [g(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: E(() => [...t[1] ||= [ie("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : he.value ? (y(), p(c, {
				key: 4,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : m("", !0),
			w(j).isAdmin ? (y(), p(ne, {
				key: 5,
				modelValue: F.value,
				"onUpdate:modelValue": t[0] ||= (e) => F.value = e,
				item: P.value,
				onApplied: R
			}, null, 8, ["modelValue", "item"])) : m("", !0)
		]));
	}
}), [["__scopeId", "data-v-c6fbe1cf"]]);
//#endregion
export { D as default };

//# sourceMappingURL=BrowsePage-dQT4AaKk.js.map