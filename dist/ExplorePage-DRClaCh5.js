import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMessages-BD3JvKjZ.js";
import { t as n } from "./client-fSGeXil2.js";
import { t as r } from "./MediaGrid-B5VtG8Bd.js";
import { t as ee } from "./MetadataMatchModal-BUBkYFu1.js";
import { n as te, t as i } from "./useItemInspector-DjCGX2EN.js";
import { t as a } from "./EmptyState-DjfWh3kt.js";
import { t as ne } from "./Spinner-Dh5qjkNO.js";
import { t as o } from "./Button-BLpPomsd.js";
import { t as s } from "./useToastStore-Bu-iYU7r.js";
import { t as c } from "./useAuthStore-DmpzSF_9.js";
import { n as l } from "./ThumbRating-BJeVZ-kT.js";
import { r as u } from "./useResolvePlayable-CnOPgUvz.js";
import { i as d } from "./usePlayerStore-DEpGyPe5.js";
import { r as re } from "./wireErrors-BEWfE19X.js";
import { n as f } from "./Icon-55iG1rR7.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as ie, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as b, isRef as x, onMounted as S, openBlock as C, ref as w, toDisplayString as ae, unref as T, watch as oe, withCtx as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
// src/pages/ExplorePage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "explore-page" }, A = { class: "explore-header" }, j = { class: "explore-title" }, M = /*#__PURE__*/ f(/* @__PURE__ */ y({
	__name: "ExplorePage",
	setup(f) {
		let y = D(), M = O(), N = e(), P = s(), { t: F } = t(), I = c(), L = l(), R = b("phlixConfig", null), z = d(), B = p(() => typeof y.query.item == "string" ? y.query.item : null), V = w([]), H = w(!1), U = w(!1), W = w(!1), G = w(null), K = w(null);
		function q(e) {
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
		async function J() {
			let e = B.value;
			if (e) {
				H.value = !0, K.value = null;
				try {
					let t = await new n({ baseUrl: N.value }).get(`/api/v1/media/${encodeURIComponent(e)}/similar`, { limit: "20" });
					V.value = (t.items ?? []).map(q), G.value = V.value.length, W.value = !1;
				} catch (e) {
					K.value = re(e, "Failed to load similar items", R?.locale);
				} finally {
					H.value = !1;
				}
			}
		}
		function Y(e, t) {
			M?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function se(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function ce(e) {
			try {
				let t = new n({ baseUrl: N.value }), r = await u(t, N.value, e, z.resumeMap);
				if (!r) {
					P.info(F("library.nothingToPlay"));
					return;
				}
				Y("player", r.id);
			} catch (e) {
				if (se(e)) return;
				P.info(F("library.nothingToPlay"));
			}
		}
		function le(e) {
			M?.hasRoute("media") ? Y("media", e.id) : P.info(F("common.detailsUnavailable", { name: e.name }));
		}
		function ue(e) {
			L.isFavorite(e.id) ? P.success(F("itemActions.addedToList", { name: e.name })) : P.info(F("itemActions.removedFromList", { name: e.name }));
		}
		function de(e) {
			L.isWatched(e.id) ? P.success(`Marked “${e.name}” as watched.`) : P.info(`Marked “${e.name}” as unwatched.`);
		}
		let X = w(null), Z = w(!1), { inspectorItem: fe, inspectorOpen: Q, openInspector: pe } = i();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function me(e) {
			V.value = V.value.map((t) => t.id === e.id ? e : t), P.success(`Updated metadata for “${e.name}”.`);
		}
		function he() {
			J();
		}
		return S(() => {
			B.value && J();
		}), oe(B, (e) => {
			e && J();
		}), (e, t) => (C(), ie("div", k, [
			g("div", A, [g("h1", j, ae(T(F)("explore.title")), 1)]),
			H.value && V.value.length === 0 ? (C(), m(ne, {
				key: 0,
				label: "Loading similar items"
			})) : K.value ? (C(), m(a, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load similar items",
				description: K.value
			}, {
				actions: E(() => [v(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: he
				}, {
					default: E(() => [...t[2] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !H.value && V.value.length === 0 && B.value ? (C(), m(a, {
				key: 2,
				icon: "film",
				title: "No similar items found",
				description: "We couldn’t find any similar items for this title."
			})) : B.value ? (C(), m(r, {
				key: 4,
				items: V.value,
				total: G.value,
				loading: H.value,
				"loading-more": U.value,
				"has-more": W.value,
				"can-match": T(I).isAdmin,
				onPlay: ce,
				onWatchlist: ue,
				onInfo: le,
				onMarkWatched: de,
				onEditMetadata: $,
				onRefresh: $,
				onExploreData: T(pe)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])) : (C(), m(a, {
				key: 3,
				icon: "search",
				title: "Select an item to explore",
				description: "Choose a title from your library to see similar recommendations."
			})),
			T(I).isAdmin ? (C(), m(ee, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[0] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: me
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(I).isAdmin ? (C(), m(te, {
				key: 6,
				modelValue: T(Q),
				"onUpdate:modelValue": t[1] ||= (e) => x(Q) ? Q.value = e : null,
				item: T(fe)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-caff31c1"]]);
export { M as default };

//# sourceMappingURL=ExplorePage-DRClaCh5.js.map