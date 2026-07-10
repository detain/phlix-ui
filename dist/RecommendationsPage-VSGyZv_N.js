import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./client-DH50wjeq.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-BoiyS0RI.js";
import { i } from "./usePlayerStore-BVgQE-j8.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o } from "./ThumbRating-BJEUrMHi.js";
import { t as s } from "./Spinner-CyHQg_fo.js";
import { t as c } from "./Button-CnyfCnhY.js";
import { t as l } from "./EmptyState-588Z_81C.js";
import { t as u } from "./MediaGrid-tnWGTLb9.js";
import { n as d } from "./useResolvePlayable-Dnhx822M.js";
import { createBlock as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, onMounted as v, openBlock as y, ref as b, unref as x, withCtx as S } from "vue";
import { useRouter as C } from "vue-router";
//#region src/pages/RecommendationsPage.vue?vue&type=script&setup=true&lang.ts
var w = { class: "recommendations-page" }, T = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "RecommendationsPage",
	setup(e) {
		let _ = C(), T = n(), E = a(), D = r(), O = o(), k = i(), A = b([]), j = b(!1), M = b(!1), N = b(!1), P = b(null), F = b(null);
		function I(e) {
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
		async function L() {
			j.value = !0, F.value = null;
			try {
				A.value = ((await new t({ baseUrl: T.value }).get("/api/v1/me/recommendations", { limit: "20" })).recommendations ?? []).map(I), P.value = A.value.length, N.value = !1;
			} catch (e) {
				F.value = e instanceof Error ? e.message : "Failed to load recommendations";
			} finally {
				j.value = !1;
			}
		}
		function R(e, t) {
			_?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function z(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function B(e) {
			try {
				let n = await d(new t({ baseUrl: T.value }), T.value, e, k.resumeMap);
				if (!n) {
					E.info("Nothing to play yet");
					return;
				}
				R("player", n.id);
			} catch (e) {
				if (z(e)) return;
				E.info("Nothing to play yet");
			}
		}
		function V(e) {
			_?.hasRoute("media") ? R("media", e.id) : E.info(`Details for "${e.name}" are coming soon`);
		}
		function H(e) {
			O.isFavorite(e.id) ? E.success(`Added "${e.name}" to your favorites`) : E.info(`Removed "${e.name}" from your favorites`);
		}
		function U(e) {
			O.isWatched(e.id) ? E.success(`Marked "${e.name}" as watched`) : E.info(`Marked "${e.name}" as unwatched`);
		}
		function W() {
			L();
		}
		return v(() => {
			L();
		}), (e, t) => (y(), p("div", w, [t[1] ||= m("div", { class: "recommendations-header" }, [m("h1", { class: "recommendations-title" }, "Recommended for You"), m("p", { class: "recommendations-subtitle" }, "Because you watched…")], -1), j.value && A.value.length === 0 ? (y(), f(s, {
			key: 0,
			label: "Loading recommendations"
		})) : F.value ? (y(), f(l, {
			key: 1,
			icon: "alert",
			title: "Couldn't load recommendations",
			description: F.value
		}, {
			actions: S(() => [g(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: W
			}, {
				default: S(() => [...t[0] ||= [h("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : !j.value && A.value.length === 0 ? (y(), f(l, {
			key: 2,
			icon: "star",
			title: "No recommendations yet",
			description: "Watch a few titles and we'll suggest others you'll love."
		})) : (y(), f(u, {
			key: 3,
			items: A.value,
			total: P.value,
			loading: j.value,
			"loading-more": M.value,
			"has-more": N.value,
			"can-match": x(D).isAdmin,
			onPlay: B,
			onWatchlist: H,
			onInfo: V,
			onMarkWatched: U
		}, null, 8, [
			"items",
			"total",
			"loading",
			"loading-more",
			"has-more",
			"can-match"
		]))]));
	}
}), [["__scopeId", "data-v-82349b41"]]);
//#endregion
export { T as default };

//# sourceMappingURL=RecommendationsPage-VSGyZv_N.js.map