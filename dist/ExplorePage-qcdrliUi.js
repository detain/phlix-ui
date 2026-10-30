import { n as e } from "./Icon-CIwTuFLd.js";
import { t } from "./useMessages-OTo-5xOb.js";
import { t as n } from "./client-DdVqCKVh.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-Bi1-VYV4.js";
import { i as a } from "./usePlayerStore-D8A_gb_c.js";
import { t as o } from "./useToastStore-DIWpaCOl.js";
import { n as s } from "./ThumbRating-CXlGmbKm.js";
import { t as ee } from "./Spinner-DNw3jstB.js";
import { t as c } from "./EmptyState-BAyOxAcK.js";
import { t as l } from "./Button-BuG0GvCa.js";
import { t as te } from "./MediaGrid-Cp1ECrqw.js";
import { t as ne } from "./MetadataMatchModal-BEYz1frQ.js";
import { n as u, t as d } from "./useItemInspector-DjVNnC1O.js";
import { r as f } from "./useResolvePlayable-wCiMWuME.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, isRef as x, onMounted as S, openBlock as C, ref as w, toDisplayString as re, unref as T, watch as ie, withCtx as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
//#region src/pages/ExplorePage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "explore-page" }, A = { class: "explore-header" }, j = { class: "explore-title" }, M = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "ExplorePage",
	setup(e) {
		let b = D(), M = O(), N = r(), P = o(), { t: F } = t(), I = i(), L = s(), R = a(), z = p(() => typeof b.query.item == "string" ? b.query.item : null), B = w([]), V = w(!1), H = w(!1), U = w(!1), W = w(null), G = w(null);
		function K(e) {
			return {
				id: e.id,
				name: e.title,
				type: "movie",
				poster_url: e.posterUrl ?? null,
				genres: [],
				year: e.year ?? null,
				rating: null,
				runtime: null,
				overview: null,
				actors: [],
				director: null,
				created_at: null,
				updated_at: null,
				sort_title: e.title,
				poster_srcset: null
			};
		}
		async function q() {
			let e = z.value;
			if (e) {
				V.value = !0, G.value = null;
				try {
					let t = await new n({ baseUrl: N.value }).get(`/api/v1/media/${encodeURIComponent(e)}/similar`, { limit: "20" });
					B.value = (t.items ?? []).map(K), W.value = B.value.length, U.value = !1;
				} catch (e) {
					G.value = e instanceof Error ? e.message : "Failed to load similar items";
				} finally {
					V.value = !1;
				}
			}
		}
		function J(e, t) {
			M?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function Y(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ae(e) {
			try {
				let t = new n({ baseUrl: N.value }), r = await f(t, N.value, e, R.resumeMap);
				if (!r) {
					P.info("Nothing to play yet");
					return;
				}
				J("player", r.id);
			} catch (e) {
				if (Y(e)) return;
				P.info("Nothing to play yet");
			}
		}
		function oe(e) {
			M?.hasRoute("media") ? J("media", e.id) : P.info(`Details for "${e.name}" are coming soon`);
		}
		function se(e) {
			L.isFavorite(e.id) ? P.success(F("itemActions.addedToList", { name: e.name })) : P.info(F("itemActions.removedFromList", { name: e.name }));
		}
		function ce(e) {
			L.isWatched(e.id) ? P.success(`Marked "${e.name}" as watched`) : P.info(`Marked "${e.name}" as unwatched`);
		}
		let X = w(null), Z = w(!1), { inspectorItem: le, inspectorOpen: Q, openInspector: ue } = d();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function de(e) {
			B.value = B.value.map((t) => t.id === e.id ? e : t), P.success(`Updated metadata for "${e.name}"`);
		}
		function fe() {
			q();
		}
		return S(() => {
			z.value && q();
		}), ie(z, (e) => {
			e && q();
		}), (e, t) => (C(), g("div", k, [
			_("div", A, [_("h1", j, re(T(F)("explore.title")), 1)]),
			V.value && B.value.length === 0 ? (C(), m(ee, {
				key: 0,
				label: "Loading similar items"
			})) : G.value ? (C(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load similar items",
				description: G.value
			}, {
				actions: E(() => [y(l, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: fe
				}, {
					default: E(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !V.value && B.value.length === 0 && z.value ? (C(), m(c, {
				key: 2,
				icon: "film",
				title: "No similar items found",
				description: "We couldn't find any similar items for this title."
			})) : z.value ? (C(), m(te, {
				key: 4,
				items: B.value,
				total: W.value,
				loading: V.value,
				"loading-more": H.value,
				"has-more": U.value,
				"can-match": T(I).isAdmin,
				onPlay: ae,
				onWatchlist: se,
				onInfo: oe,
				onMarkWatched: ce,
				onEditMetadata: $,
				onRefresh: $,
				onExploreData: T(ue)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])) : (C(), m(c, {
				key: 3,
				icon: "search",
				title: "Select an item to explore",
				description: "Choose a title from your library to see similar recommendations."
			})),
			T(I).isAdmin ? (C(), m(ne, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[0] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: de
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(I).isAdmin ? (C(), m(u, {
				key: 6,
				modelValue: T(Q),
				"onUpdate:modelValue": t[1] ||= (e) => x(Q) ? Q.value = e : null,
				item: T(le)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-4fd5e7b9"]]);
//#endregion
export { M as default };

//# sourceMappingURL=ExplorePage-qcdrliUi.js.map