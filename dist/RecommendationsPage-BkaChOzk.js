import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMessages-B2u5b6BQ.js";
import { t as n } from "./client-pLl-rDdN.js";
import { t as r } from "./MediaGrid-Dqn1gKZ4.js";
import { t as i } from "./MetadataMatchModal-DMDBoFff.js";
import { n as a, t as o } from "./useItemInspector-BbWf5OeI.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { t as c } from "./Spinner-BYaiRNqs.js";
import { t as l } from "./Button-1sKEdGjj.js";
import { t as u } from "./useToastStore-Bu-iYU7r.js";
import { t as d } from "./useAuthStore-593BscZf.js";
import { n as f } from "./ThumbRating-BUadWtms.js";
import { r as p } from "./useResolvePlayable-CnOPgUvz.js";
import { i as m } from "./usePlayerStore-B7mnqLe3.js";
import { t as ee } from "./recommendations-BcfmbNnF.js";
import { n as h } from "./Icon-CIbfiPrs.js";
import { createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, isRef as C, onMounted as w, openBlock as T, ref as E, unref as D, withCtx as O } from "vue";
import { useRouter as te } from "vue-router";
// src/pages/RecommendationsPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "recommendations-page" }, A = /*#__PURE__*/ h(/* @__PURE__ */ S({
	__name: "RecommendationsPage",
	setup(h) {
		let S = te(), A = e(), j = u(), { t: M } = t(), N = d(), P = f(), F = m(), I = E([]), L = E(!1), R = E(!1), z = E(!1), B = E(null), V = E(null);
		async function H() {
			L.value = !0, V.value = null;
			try {
				let e = new n({ baseUrl: A.value });
				I.value = await ee(e, { limit: 20 }), B.value = I.value.length, z.value = !1;
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
				let t = new n({ baseUrl: A.value }), r = await p(t, A.value, e, F.resumeMap);
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
			S?.hasRoute("media") ? U("media", e.id) : j.info(`Details for “${e.name}” are coming soon`);
		}
		function q(e) {
			P.isFavorite(e.id) ? j.success(M("itemActions.addedToList", { name: e.name })) : j.info(M("itemActions.removedFromList", { name: e.name }));
		}
		function J(e) {
			P.isWatched(e.id) ? j.success(`Marked “${e.name}” as watched`) : j.info(`Marked “${e.name}” as unwatched`);
		}
		let Y = E(null), X = E(!1), { inspectorItem: Z, inspectorOpen: Q, openInspector: ne } = o();
		function $(e) {
			Y.value = e, X.value = !0;
		}
		function re(e) {
			I.value = I.value.map((t) => t.id === e.id ? e : t), j.success(`Updated metadata for “${e.name}”`);
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
			})) : V.value ? (T(), g(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load recommendations",
				description: V.value
			}, {
				actions: O(() => [x(l, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ie
				}, {
					default: O(() => [...t[2] ||= [b("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !L.value && I.value.length === 0 ? (T(), g(s, {
				key: 2,
				icon: "star",
				title: "No recommendations yet",
				description: "Watch a few titles and we’ll suggest others you’ll love."
			})) : (T(), g(r, {
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
			D(N).isAdmin ? (T(), g(i, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				item: Y.value,
				onApplied: re
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			D(N).isAdmin ? (T(), g(a, {
				key: 5,
				modelValue: D(Q),
				"onUpdate:modelValue": t[1] ||= (e) => C(Q) ? Q.value = e : null,
				item: D(Z)
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-ec237971"]]);
export { A as default };

//# sourceMappingURL=RecommendationsPage-BkaChOzk.js.map