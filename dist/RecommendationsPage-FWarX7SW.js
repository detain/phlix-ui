import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-BzWwyWKr.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-Ds0NVhBP.js";
import { i } from "./usePlayerStore-Dgw0JCWb.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o } from "./ThumbRating-BxiWuYAs.js";
import { t as s } from "./Spinner-C4utUvmQ.js";
import { t as c } from "./Button-DWa6Ld_Z.js";
import { t as l } from "./EmptyState-ZlI5t4KT.js";
import { t as u } from "./MediaGrid-CzOSbyHM.js";
import { t as d } from "./MetadataMatchModal-BbaA7xKl.js";
import { n as f, t as p } from "./useItemInspector-BTx_gnEr.js";
import { r as m } from "./useResolvePlayable-wCiMWuME.js";
import { createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, isRef as S, onMounted as C, openBlock as w, ref as T, unref as E, withCtx as D } from "vue";
import { useRouter as O } from "vue-router";
//#region src/pages/RecommendationsPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "recommendations-page" }, A = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "RecommendationsPage",
	setup(e) {
		let x = O(), A = n(), j = a(), M = r(), N = o(), P = i(), F = T([]), I = T(!1), L = T(!1), R = T(!1), z = T(null), B = T(null);
		function V(e) {
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
		async function H() {
			I.value = !0, B.value = null;
			try {
				let e = await new t({ baseUrl: A.value }).get("/api/v1/me/recommendations", { limit: "20" });
				F.value = (e.recommendations ?? []).map(V), z.value = F.value.length, R.value = !1;
			} catch (e) {
				B.value = e instanceof Error ? e.message : "Failed to load recommendations";
			} finally {
				I.value = !1;
			}
		}
		function U(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			try {
				let n = await m(new t({ baseUrl: A.value }), A.value, e, P.resumeMap);
				if (!n) {
					j.info("Nothing to play yet");
					return;
				}
				U("player", n.id);
			} catch (e) {
				if (W(e)) return;
				j.info("Nothing to play yet");
			}
		}
		function K(e) {
			x?.hasRoute("media") ? U("media", e.id) : j.info(`Details for "${e.name}" are coming soon`);
		}
		function q(e) {
			N.isFavorite(e.id) ? j.success(`Added "${e.name}" to your favorites`) : j.info(`Removed "${e.name}" from your favorites`);
		}
		function J(e) {
			N.isWatched(e.id) ? j.success(`Marked "${e.name}" as watched`) : j.info(`Marked "${e.name}" as unwatched`);
		}
		let Y = T(null), X = T(!1), { inspectorItem: Z, inspectorOpen: Q, openInspector: $ } = p();
		function ee(e) {
			Y.value = e, X.value = !0;
		}
		function te(e) {
			F.value = F.value.map((t) => t.id === e.id ? e : t), j.success(`Updated metadata for "${e.name}"`);
		}
		function ne() {
			H();
		}
		return C(() => {
			H();
		}), (e, t) => (w(), _("div", k, [
			t[3] ||= v("div", { class: "recommendations-header" }, [v("h1", { class: "recommendations-title" }, "Recommended for You"), v("p", { class: "recommendations-subtitle" }, "Because you watched…")], -1),
			I.value && F.value.length === 0 ? (w(), h(s, {
				key: 0,
				label: "Loading recommendations"
			})) : B.value ? (w(), h(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recommendations",
				description: B.value
			}, {
				actions: D(() => [b(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ne
				}, {
					default: D(() => [...t[2] ||= [y("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !I.value && F.value.length === 0 ? (w(), h(l, {
				key: 2,
				icon: "star",
				title: "No recommendations yet",
				description: "Watch a few titles and we'll suggest others you'll love."
			})) : (w(), h(u, {
				key: 3,
				items: F.value,
				total: z.value,
				loading: I.value,
				"loading-more": L.value,
				"has-more": R.value,
				"can-match": E(M).isAdmin,
				onPlay: G,
				onWatchlist: q,
				onInfo: K,
				onMarkWatched: J,
				onEditMetadata: ee,
				onExploreData: E($)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])),
			E(M).isAdmin ? (w(), h(d, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				item: Y.value,
				onApplied: te
			}, null, 8, ["modelValue", "item"])) : g("", !0),
			E(M).isAdmin ? (w(), h(f, {
				key: 5,
				modelValue: E(Q),
				"onUpdate:modelValue": t[1] ||= (e) => S(Q) ? Q.value = e : null,
				item: E(Z)
			}, null, 8, ["modelValue", "item"])) : g("", !0)
		]));
	}
}), [["__scopeId", "data-v-ef23e6f6"]]);
//#endregion
export { A as default };

//# sourceMappingURL=RecommendationsPage-FWarX7SW.js.map