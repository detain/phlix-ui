import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./client-B65CbqT7.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-BK3N71yp.js";
import { o as i } from "./media-query-IVKvZvWX.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o } from "./ThumbRating-obRiYVSW.js";
import { t as s } from "./Spinner-DVL0OtMK.js";
import { t as c } from "./Button-CnyfCnhY.js";
import { t as l } from "./EmptyState-588Z_81C.js";
import { t as u } from "./MediaGrid-BkMoM4cs.js";
import { r as d } from "./useResolvePlayable-D00u_82b.js";
import { computed as f, createBlock as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, onMounted as y, openBlock as b, ref as x, unref as S, watch as C, withCtx as w } from "vue";
import { useRoute as T, useRouter as E } from "vue-router";
//#region src/pages/ExplorePage.vue?vue&type=script&setup=true&lang.ts
var D = { class: "explore-page" }, O = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "ExplorePage",
	setup(e) {
		let v = T(), O = E(), k = n(), A = a(), j = r(), M = o(), N = i(), P = f(() => typeof v.query.item == "string" ? v.query.item : null), F = x([]), I = x(!1), L = x(!1), R = x(!1), z = x(null), B = x(null);
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
			let e = P.value;
			if (e) {
				I.value = !0, B.value = null;
				try {
					F.value = ((await new t({ baseUrl: k.value }).get(`/api/v1/media/${encodeURIComponent(e)}/similar`, { limit: "20" })).items ?? []).map(V), z.value = F.value.length, R.value = !1;
				} catch (e) {
					B.value = e instanceof Error ? e.message : "Failed to load similar items";
				} finally {
					I.value = !1;
				}
			}
		}
		function U(e, t) {
			O?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			try {
				let n = await d(new t({ baseUrl: k.value }), k.value, e, N.resumeMap);
				if (!n) {
					A.info("Nothing to play yet");
					return;
				}
				U("player", n.id);
			} catch (e) {
				if (W(e)) return;
				A.info("Nothing to play yet");
			}
		}
		function K(e) {
			O?.hasRoute("media") ? U("media", e.id) : A.info(`Details for "${e.name}" are coming soon`);
		}
		function q(e) {
			M.isFavorite(e.id) ? A.success(`Added "${e.name}" to your favorites`) : A.info(`Removed "${e.name}" from your favorites`);
		}
		function J(e) {
			M.isWatched(e.id) ? A.success(`Marked "${e.name}" as watched`) : A.info(`Marked "${e.name}" as unwatched`);
		}
		function Y() {
			H();
		}
		return y(() => {
			P.value && H();
		}), C(P, (e) => {
			e && H();
		}), (e, t) => (b(), m("div", D, [t[1] ||= h("div", { class: "explore-header" }, [h("h1", { class: "explore-title" }, "Explore Similar")], -1), I.value && F.value.length === 0 ? (b(), p(s, {
			key: 0,
			label: "Loading similar items"
		})) : B.value ? (b(), p(l, {
			key: 1,
			icon: "alert",
			title: "Couldn't load similar items",
			description: B.value
		}, {
			actions: w(() => [_(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: Y
			}, {
				default: w(() => [...t[0] ||= [g("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : !I.value && F.value.length === 0 && P.value ? (b(), p(l, {
			key: 2,
			icon: "film",
			title: "No similar items found",
			description: "We couldn't find any similar items for this title."
		})) : P.value ? (b(), p(u, {
			key: 4,
			items: F.value,
			total: z.value,
			loading: I.value,
			"loading-more": L.value,
			"has-more": R.value,
			"can-match": S(j).isAdmin,
			onPlay: G,
			onWatchlist: q,
			onInfo: K,
			onMarkWatched: J
		}, null, 8, [
			"items",
			"total",
			"loading",
			"loading-more",
			"has-more",
			"can-match"
		])) : (b(), p(l, {
			key: 3,
			icon: "search",
			title: "Select an item to explore",
			description: "Choose a title from your library to see similar recommendations."
		}))]));
	}
}), [["__scopeId", "data-v-66027c62"]]);
//#endregion
export { O as default };

//# sourceMappingURL=ExplorePage-DxdSkD49.js.map