import { n as e } from "./Icon-CkTBN_k5.js";
import { t } from "./client-DA-5QZXw.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-vm6oniX7.js";
import { i } from "./usePlayerStore-DhgapSoa.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o } from "./ThumbRating-DTgQWbsu.js";
import { t as s } from "./Spinner-COUSlhgo.js";
import { t as c } from "./Button-Cw8Wl4QR.js";
import { t as l } from "./EmptyState-CwWtkhEJ.js";
import { t as u } from "./MediaGrid-DZcfApdw.js";
import { t as d } from "./MetadataMatchModal-D-SLpTGq.js";
import { n as f, t as p } from "./useItemInspector-Cn3FRzeh.js";
import { t as m } from "./recommendations-DMDaEMq9.js";
import { r as h } from "./useResolvePlayable-wCiMWuME.js";
import { createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, isRef as C, onMounted as w, openBlock as T, ref as E, unref as D, withCtx as O } from "vue";
import { useRouter as ee } from "vue-router";
//#region src/pages/RecommendationsPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "recommendations-page" }, A = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "RecommendationsPage",
	setup(e) {
		let S = ee(), A = n(), j = a(), M = r(), N = o(), P = i(), F = E([]), I = E(!1), L = E(!1), R = E(!1), z = E(null), B = E(null);
		async function V() {
			I.value = !0, B.value = null;
			try {
				let e = new t({ baseUrl: A.value });
				F.value = await m(e, { limit: 20 }), z.value = F.value.length, R.value = !1;
			} catch (e) {
				B.value = e instanceof Error ? e.message : "Failed to load recommendations";
			} finally {
				I.value = !1;
			}
		}
		function H(e, t) {
			S?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function U(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function W(e) {
			try {
				let n = new t({ baseUrl: A.value }), r = await h(n, A.value, e, P.resumeMap);
				if (!r) {
					j.info("Nothing to play yet");
					return;
				}
				H("player", r.id);
			} catch (e) {
				if (U(e)) return;
				j.info("Nothing to play yet");
			}
		}
		function G(e) {
			S?.hasRoute("media") ? H("media", e.id) : j.info(`Details for "${e.name}" are coming soon`);
		}
		function K(e) {
			N.isFavorite(e.id) ? j.success(`Added "${e.name}" to your favorites`) : j.info(`Removed "${e.name}" from your favorites`);
		}
		function q(e) {
			N.isWatched(e.id) ? j.success(`Marked "${e.name}" as watched`) : j.info(`Marked "${e.name}" as unwatched`);
		}
		let J = E(null), Y = E(!1), { inspectorItem: X, inspectorOpen: Z, openInspector: Q } = p();
		function $(e) {
			J.value = e, Y.value = !0;
		}
		function te(e) {
			F.value = F.value.map((t) => t.id === e.id ? e : t), j.success(`Updated metadata for "${e.name}"`);
		}
		function ne() {
			V();
		}
		return w(() => {
			V();
		}), (e, t) => (T(), v("div", k, [
			t[3] ||= y("div", { class: "recommendations-header" }, [y("h1", { class: "recommendations-title" }, "Recommended for You"), y("p", { class: "recommendations-subtitle" }, "Because you watched…")], -1),
			I.value && F.value.length === 0 ? (T(), g(s, {
				key: 0,
				label: "Loading recommendations"
			})) : B.value ? (T(), g(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recommendations",
				description: B.value
			}, {
				actions: O(() => [x(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ne
				}, {
					default: O(() => [...t[2] ||= [b("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !I.value && F.value.length === 0 ? (T(), g(l, {
				key: 2,
				icon: "star",
				title: "No recommendations yet",
				description: "Watch a few titles and we'll suggest others you'll love."
			})) : (T(), g(u, {
				key: 3,
				items: F.value,
				total: z.value,
				loading: I.value,
				"loading-more": L.value,
				"has-more": R.value,
				"can-match": D(M).isAdmin,
				onPlay: W,
				onWatchlist: K,
				onInfo: G,
				onMarkWatched: q,
				onEditMetadata: $,
				onRefresh: $,
				onExploreData: D(Q)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])),
			D(M).isAdmin ? (T(), g(d, {
				key: 4,
				modelValue: Y.value,
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				item: J.value,
				onApplied: te
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			D(M).isAdmin ? (T(), g(f, {
				key: 5,
				modelValue: D(Z),
				"onUpdate:modelValue": t[1] ||= (e) => C(Z) ? Z.value = e : null,
				item: D(X)
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-5506e02a"]]);
//#endregion
export { A as default };

//# sourceMappingURL=RecommendationsPage-L0owNi9i.js.map