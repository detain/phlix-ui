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
import { t as u } from "./Button-BuG0GvCa.js";
import { t as d } from "./MediaGrid-c7Rwn48x.js";
import { t as f } from "./MetadataMatchModal-BqXZFpiN.js";
import { n as p, t as m } from "./useItemInspector-CkA8DxYe.js";
import { t as h } from "./recommendations-DMDaEMq9.js";
import { r as ee } from "./useResolvePlayable-wCiMWuME.js";
import { createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, isRef as C, onMounted as w, openBlock as T, ref as E, unref as D, withCtx as O } from "vue";
import { useRouter as te } from "vue-router";
//#region src/pages/RecommendationsPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "recommendations-page" }, A = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "RecommendationsPage",
	setup(e) {
		let S = te(), A = r(), j = o(), { t: M } = t(), N = i(), P = s(), F = a(), I = E([]), L = E(!1), R = E(!1), z = E(!1), B = E(null), V = E(null);
		async function H() {
			L.value = !0, V.value = null;
			try {
				let e = new n({ baseUrl: A.value });
				I.value = await h(e, { limit: 20 }), B.value = I.value.length, z.value = !1;
			} catch (e) {
				V.value = e instanceof Error ? e.message : "Failed to load recommendations";
			} finally {
				L.value = !1;
			}
		}
		function U(e, t) {
			S?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			try {
				let t = new n({ baseUrl: A.value }), r = await ee(t, A.value, e, F.resumeMap);
				if (!r) {
					j.info("Nothing to play yet");
					return;
				}
				U("player", r.id);
			} catch (e) {
				if (W(e)) return;
				j.info("Nothing to play yet");
			}
		}
		function K(e) {
			S?.hasRoute("media") ? U("media", e.id) : j.info(`Details for "${e.name}" are coming soon`);
		}
		function q(e) {
			P.isFavorite(e.id) ? j.success(M("itemActions.addedToList", { name: e.name })) : j.info(M("itemActions.removedFromList", { name: e.name }));
		}
		function J(e) {
			P.isWatched(e.id) ? j.success(`Marked "${e.name}" as watched`) : j.info(`Marked "${e.name}" as unwatched`);
		}
		let Y = E(null), X = E(!1), { inspectorItem: Z, inspectorOpen: Q, openInspector: ne } = m();
		function $(e) {
			Y.value = e, X.value = !0;
		}
		function re(e) {
			I.value = I.value.map((t) => t.id === e.id ? e : t), j.success(`Updated metadata for "${e.name}"`);
		}
		function ie() {
			H();
		}
		return w(() => {
			H();
		}), (e, t) => (T(), v("div", k, [
			t[3] ||= y("div", { class: "recommendations-header" }, [y("h1", { class: "recommendations-title" }, "Recommended for You"), y("p", { class: "recommendations-subtitle" }, "Because you watched…")], -1),
			L.value && I.value.length === 0 ? (T(), g(c, {
				key: 0,
				label: "Loading recommendations"
			})) : V.value ? (T(), g(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recommendations",
				description: V.value
			}, {
				actions: O(() => [x(u, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ie
				}, {
					default: O(() => [...t[2] ||= [b("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !L.value && I.value.length === 0 ? (T(), g(l, {
				key: 2,
				icon: "star",
				title: "No recommendations yet",
				description: "Watch a few titles and we'll suggest others you'll love."
			})) : (T(), g(d, {
				key: 3,
				items: I.value,
				total: B.value,
				loading: L.value,
				"loading-more": R.value,
				"has-more": z.value,
				"can-match": D(N).isAdmin,
				onPlay: G,
				onWatchlist: q,
				onInfo: K,
				onMarkWatched: J,
				onEditMetadata: $,
				onRefresh: $,
				onExploreData: D(ne)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])),
			D(N).isAdmin ? (T(), g(f, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				item: Y.value,
				onApplied: re
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			D(N).isAdmin ? (T(), g(p, {
				key: 5,
				modelValue: D(Q),
				"onUpdate:modelValue": t[1] ||= (e) => C(Q) ? Q.value = e : null,
				item: D(Z)
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-3a53d4ee"]]);
//#endregion
export { A as default };

//# sourceMappingURL=RecommendationsPage-CIgOIQKG.js.map