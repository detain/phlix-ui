import { n as e } from "./Icon-CIwTuFLd.js";
import { t } from "./useMessages-M5VcrfIX.js";
import { t as n } from "./client-DdVqCKVh.js";
import { n as r } from "./useApiBase-CV_r-Kk4.js";
import { t as i } from "./useAuthStore-Bi1-VYV4.js";
import { i as a } from "./usePlayerStore-D8A_gb_c.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { n as s } from "./ThumbRating-B5EFc49E.js";
import { t as c } from "./Spinner-CcXHI0nh.js";
import { t as l } from "./EmptyState-BAyOxAcK.js";
import { t as ee } from "./Button-BuG0GvCa.js";
import { t as te } from "./MediaGrid-c7Rwn48x.js";
import { t as ne } from "./MetadataMatchModal-BqXZFpiN.js";
import { n as u, t as d } from "./useItemInspector-CkA8DxYe.js";
import { r as f } from "./useResolvePlayable-wCiMWuME.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, isRef as x, onMounted as S, openBlock as C, ref as w, unref as T, watch as re, withCtx as E } from "vue";
import { useRoute as ie, useRouter as D } from "vue-router";
//#region src/pages/ExplorePage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "explore-page" }, k = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "ExplorePage",
	setup(e) {
		let b = ie(), k = D(), A = r(), j = o(), { t: M } = t(), N = i(), P = s(), F = a(), I = p(() => typeof b.query.item == "string" ? b.query.item : null), L = w([]), R = w(!1), z = w(!1), B = w(!1), V = w(null), H = w(null);
		function U(e) {
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
		async function W() {
			let e = I.value;
			if (e) {
				R.value = !0, H.value = null;
				try {
					let t = await new n({ baseUrl: A.value }).get(`/api/v1/media/${encodeURIComponent(e)}/similar`, { limit: "20" });
					L.value = (t.items ?? []).map(U), V.value = L.value.length, B.value = !1;
				} catch (e) {
					H.value = e instanceof Error ? e.message : "Failed to load similar items";
				} finally {
					R.value = !1;
				}
			}
		}
		function G(e, t) {
			k?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q(e) {
			try {
				let t = new n({ baseUrl: A.value }), r = await f(t, A.value, e, F.resumeMap);
				if (!r) {
					j.info("Nothing to play yet");
					return;
				}
				G("player", r.id);
			} catch (e) {
				if (K(e)) return;
				j.info("Nothing to play yet");
			}
		}
		function J(e) {
			k?.hasRoute("media") ? G("media", e.id) : j.info(`Details for "${e.name}" are coming soon`);
		}
		function ae(e) {
			P.isFavorite(e.id) ? j.success(M("itemActions.addedToList", { name: e.name })) : j.info(M("itemActions.removedFromList", { name: e.name }));
		}
		function oe(e) {
			P.isWatched(e.id) ? j.success(`Marked "${e.name}" as watched`) : j.info(`Marked "${e.name}" as unwatched`);
		}
		let Y = w(null), X = w(!1), { inspectorItem: se, inspectorOpen: Z, openInspector: ce } = d();
		function Q(e) {
			Y.value = e, X.value = !0;
		}
		function le(e) {
			L.value = L.value.map((t) => t.id === e.id ? e : t), j.success(`Updated metadata for "${e.name}"`);
		}
		function $() {
			W();
		}
		return S(() => {
			I.value && W();
		}), re(I, (e) => {
			e && W();
		}), (e, t) => (C(), g("div", O, [
			t[3] ||= _("div", { class: "explore-header" }, [_("h1", { class: "explore-title" }, "Explore Similar")], -1),
			R.value && L.value.length === 0 ? (C(), m(c, {
				key: 0,
				label: "Loading similar items"
			})) : H.value ? (C(), m(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load similar items",
				description: H.value
			}, {
				actions: E(() => [y(ee, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: E(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !R.value && L.value.length === 0 && I.value ? (C(), m(l, {
				key: 2,
				icon: "film",
				title: "No similar items found",
				description: "We couldn't find any similar items for this title."
			})) : I.value ? (C(), m(te, {
				key: 4,
				items: L.value,
				total: V.value,
				loading: R.value,
				"loading-more": z.value,
				"has-more": B.value,
				"can-match": T(N).isAdmin,
				onPlay: q,
				onWatchlist: ae,
				onInfo: J,
				onMarkWatched: oe,
				onEditMetadata: Q,
				onRefresh: Q,
				onExploreData: T(ce)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])) : (C(), m(l, {
				key: 3,
				icon: "search",
				title: "Select an item to explore",
				description: "Choose a title from your library to see similar recommendations."
			})),
			T(N).isAdmin ? (C(), m(ne, {
				key: 5,
				modelValue: X.value,
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				item: Y.value,
				onApplied: le
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(N).isAdmin ? (C(), m(u, {
				key: 6,
				modelValue: T(Z),
				"onUpdate:modelValue": t[1] ||= (e) => x(Z) ? Z.value = e : null,
				item: T(se)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-bbf81488"]]);
//#endregion
export { k as default };

//# sourceMappingURL=ExplorePage-DMlZVzYk.js.map