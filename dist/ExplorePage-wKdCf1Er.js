import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMessages-DrceiftD.js";
import { t as n } from "./client-CW4dUyY-.js";
import { t as r } from "./MediaGrid-BbMdyaUZ.js";
import { t as i } from "./MetadataMatchModal-CLVKratB.js";
import { n as a, t as o } from "./useItemInspector-CqJTJ23o.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { t as c } from "./Spinner-zawWdcUT.js";
import { t as l } from "./Button-1sKEdGjj.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as te } from "./useAuthStore-Du8LTnU5.js";
import { n as ne } from "./ThumbRating-Bi26fH2C.js";
import { r as u } from "./useResolvePlayable-CnOPgUvz.js";
import { i as d } from "./usePlayerStore-B7mnqLe3.js";
import { n as f } from "./Icon-CIbfiPrs.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as re, defineComponent as y, isRef as b, onMounted as x, openBlock as S, ref as C, toDisplayString as ie, unref as w, watch as ae, withCtx as T } from "vue";
import { useRoute as E, useRouter as D } from "vue-router";
// src/pages/ExplorePage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "explore-page" }, k = { class: "explore-header" }, A = { class: "explore-title" }, j = /*#__PURE__*/ f(/* @__PURE__ */ y({
	__name: "ExplorePage",
	setup(f) {
		let y = E(), j = D(), M = e(), N = ee(), { t: P } = t(), F = te(), I = ne(), L = d(), R = p(() => typeof y.query.item == "string" ? y.query.item : null), z = C([]), B = C(!1), V = C(!1), H = C(!1), U = C(null), W = C(null);
		function G(e) {
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
		async function K() {
			let e = R.value;
			if (e) {
				B.value = !0, W.value = null;
				try {
					let t = await new n({ baseUrl: M.value }).get(`/api/v1/media/${encodeURIComponent(e)}/similar`, { limit: "20" });
					z.value = (t.items ?? []).map(G), U.value = z.value.length, H.value = !1;
				} catch (e) {
					W.value = e instanceof Error ? e.message : "Failed to load similar items";
				} finally {
					B.value = !1;
				}
			}
		}
		function q(e, t) {
			j?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function J(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function oe(e) {
			try {
				let t = new n({ baseUrl: M.value }), r = await u(t, M.value, e, L.resumeMap);
				if (!r) {
					N.info("Nothing to play yet.");
					return;
				}
				q("player", r.id);
			} catch (e) {
				if (J(e)) return;
				N.info("Nothing to play yet.");
			}
		}
		function se(e) {
			j?.hasRoute("media") ? q("media", e.id) : N.info(`Details for “${e.name}” are coming soon.`);
		}
		function ce(e) {
			I.isFavorite(e.id) ? N.success(P("itemActions.addedToList", { name: e.name })) : N.info(P("itemActions.removedFromList", { name: e.name }));
		}
		function le(e) {
			I.isWatched(e.id) ? N.success(`Marked “${e.name}” as watched.`) : N.info(`Marked “${e.name}” as unwatched.`);
		}
		let Y = C(null), X = C(!1), { inspectorItem: ue, inspectorOpen: Z, openInspector: Q } = o();
		function $(e) {
			Y.value = e, X.value = !0;
		}
		function de(e) {
			z.value = z.value.map((t) => t.id === e.id ? e : t), N.success(`Updated metadata for “${e.name}”.`);
		}
		function fe() {
			K();
		}
		return x(() => {
			R.value && K();
		}), ae(R, (e) => {
			e && K();
		}), (e, t) => (S(), g("div", O, [
			_("div", k, [_("h1", A, ie(w(P)("explore.title")), 1)]),
			B.value && z.value.length === 0 ? (S(), m(c, {
				key: 0,
				label: "Loading similar items"
			})) : W.value ? (S(), m(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load similar items",
				description: W.value
			}, {
				actions: T(() => [re(l, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: fe
				}, {
					default: T(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !B.value && z.value.length === 0 && R.value ? (S(), m(s, {
				key: 2,
				icon: "film",
				title: "No similar items found",
				description: "We couldn’t find any similar items for this title."
			})) : R.value ? (S(), m(r, {
				key: 4,
				items: z.value,
				total: U.value,
				loading: B.value,
				"loading-more": V.value,
				"has-more": H.value,
				"can-match": w(F).isAdmin,
				onPlay: oe,
				onWatchlist: ce,
				onInfo: se,
				onMarkWatched: le,
				onEditMetadata: $,
				onRefresh: $,
				onExploreData: w(Q)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])) : (S(), m(s, {
				key: 3,
				icon: "search",
				title: "Select an item to explore",
				description: "Choose a title from your library to see similar recommendations."
			})),
			w(F).isAdmin ? (S(), m(i, {
				key: 5,
				modelValue: X.value,
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				item: Y.value,
				onApplied: de
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			w(F).isAdmin ? (S(), m(a, {
				key: 6,
				modelValue: w(Z),
				"onUpdate:modelValue": t[1] ||= (e) => b(Z) ? Z.value = e : null,
				item: w(ue)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-1c68b871"]]);
export { j as default };

//# sourceMappingURL=ExplorePage-wKdCf1Er.js.map