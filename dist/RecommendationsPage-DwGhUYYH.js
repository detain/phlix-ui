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
import { t as u } from "./MediaGrid-Yj9pcv98.js";
import { t as d } from "./MetadataMatchModal-BbaA7xKl.js";
import { n as f, t as p } from "./useItemInspector-BTx_gnEr.js";
import { t as m } from "./recommendations-DMDaEMq9.js";
import { r as h } from "./useResolvePlayable-wCiMWuME.js";
import { createBlock as g, createCommentVNode as _, createElementBlock as v, createElementVNode as y, createTextVNode as b, createVNode as x, defineComponent as S, isRef as C, onMounted as w, openBlock as T, ref as E, unref as D, withCtx as O } from "vue";
import { useRouter as k } from "vue-router";
//#region src/pages/RecommendationsPage.vue?vue&type=script&setup=true&lang.ts
var A = { class: "recommendations-page" }, j = /*#__PURE__*/ e(/* @__PURE__ */ S({
	__name: "RecommendationsPage",
	setup(e) {
		let S = k(), j = n(), M = a(), N = r(), P = o(), F = i(), I = E([]), L = E(!1), R = E(!1), z = E(!1), B = E(null), V = E(null);
		async function H() {
			L.value = !0, V.value = null;
			try {
				let e = new t({ baseUrl: j.value });
				I.value = await m(e, { limit: 20 }), B.value = I.value.length, z.value = !1;
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
				let n = await h(new t({ baseUrl: j.value }), j.value, e, F.resumeMap);
				if (!n) {
					M.info("Nothing to play yet");
					return;
				}
				U("player", n.id);
			} catch (e) {
				if (W(e)) return;
				M.info("Nothing to play yet");
			}
		}
		function K(e) {
			S?.hasRoute("media") ? U("media", e.id) : M.info(`Details for "${e.name}" are coming soon`);
		}
		function q(e) {
			P.isFavorite(e.id) ? M.success(`Added "${e.name}" to your favorites`) : M.info(`Removed "${e.name}" from your favorites`);
		}
		function J(e) {
			P.isWatched(e.id) ? M.success(`Marked "${e.name}" as watched`) : M.info(`Marked "${e.name}" as unwatched`);
		}
		let Y = E(null), X = E(!1), { inspectorItem: Z, inspectorOpen: Q, openInspector: $ } = p();
		function ee(e) {
			Y.value = e, X.value = !0;
		}
		function te(e) {
			I.value = I.value.map((t) => t.id === e.id ? e : t), M.success(`Updated metadata for "${e.name}"`);
		}
		function ne() {
			H();
		}
		return w(() => {
			H();
		}), (e, t) => (T(), v("div", A, [
			t[3] ||= y("div", { class: "recommendations-header" }, [y("h1", { class: "recommendations-title" }, "Recommended for You"), y("p", { class: "recommendations-subtitle" }, "Because you watched…")], -1),
			L.value && I.value.length === 0 ? (T(), g(s, {
				key: 0,
				label: "Loading recommendations"
			})) : V.value ? (T(), g(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load recommendations",
				description: V.value
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
			}, 8, ["description"])) : !L.value && I.value.length === 0 ? (T(), g(l, {
				key: 2,
				icon: "star",
				title: "No recommendations yet",
				description: "Watch a few titles and we'll suggest others you'll love."
			})) : (T(), g(u, {
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
				onEditMetadata: ee,
				onExploreData: D($)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])),
			D(N).isAdmin ? (T(), g(d, {
				key: 4,
				modelValue: X.value,
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				item: Y.value,
				onApplied: te
			}, null, 8, ["modelValue", "item"])) : _("", !0),
			D(N).isAdmin ? (T(), g(f, {
				key: 5,
				modelValue: D(Q),
				"onUpdate:modelValue": t[1] ||= (e) => C(Q) ? Q.value = e : null,
				item: D(Z)
			}, null, 8, ["modelValue", "item"])) : _("", !0)
		]));
	}
}), [["__scopeId", "data-v-8ed9a03c"]]);
//#endregion
export { j as default };

//# sourceMappingURL=RecommendationsPage-DwGhUYYH.js.map