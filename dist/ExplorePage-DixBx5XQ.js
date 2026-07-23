import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-BzWwyWKr.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-Ds0NVhBP.js";
import { i } from "./usePlayerStore-Dgw0JCWb.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o } from "./ThumbRating-BxiWuYAs.js";
import { t as ee } from "./Spinner-C4utUvmQ.js";
import { t as s } from "./Button-DWa6Ld_Z.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as te } from "./MediaGrid-CzOSbyHM.js";
import { t as l } from "./MetadataMatchModal-BbaA7xKl.js";
import { n as u, t as d } from "./useItemInspector-BTx_gnEr.js";
import { r as f } from "./useResolvePlayable-wCiMWuME.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, isRef as x, onMounted as S, openBlock as C, ref as w, unref as T, watch as ne, withCtx as E } from "vue";
import { useRoute as D, useRouter as O } from "vue-router";
//#region src/pages/ExplorePage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "explore-page" }, A = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "ExplorePage",
	setup(e) {
		let b = D(), A = O(), j = n(), M = a(), N = r(), P = o(), F = i(), I = p(() => typeof b.query.item == "string" ? b.query.item : null), L = w([]), R = w(!1), z = w(!1), B = w(!1), V = w(null), H = w(null);
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
					let n = await new t({ baseUrl: j.value }).get(`/api/v1/media/${encodeURIComponent(e)}/similar`, { limit: "20" });
					L.value = (n.items ?? []).map(U), V.value = L.value.length, B.value = !1;
				} catch (e) {
					H.value = e instanceof Error ? e.message : "Failed to load similar items";
				} finally {
					R.value = !1;
				}
			}
		}
		function G(e, t) {
			A?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q(e) {
			try {
				let n = await f(new t({ baseUrl: j.value }), j.value, e, F.resumeMap);
				if (!n) {
					M.info("Nothing to play yet");
					return;
				}
				G("player", n.id);
			} catch (e) {
				if (K(e)) return;
				M.info("Nothing to play yet");
			}
		}
		function J(e) {
			A?.hasRoute("media") ? G("media", e.id) : M.info(`Details for "${e.name}" are coming soon`);
		}
		function Y(e) {
			P.isFavorite(e.id) ? M.success(`Added "${e.name}" to your favorites`) : M.info(`Removed "${e.name}" from your favorites`);
		}
		function X(e) {
			P.isWatched(e.id) ? M.success(`Marked "${e.name}" as watched`) : M.info(`Marked "${e.name}" as unwatched`);
		}
		let Z = w(null), Q = w(!1), { inspectorItem: re, inspectorOpen: $, openInspector: ie } = d();
		function ae(e) {
			Z.value = e, Q.value = !0;
		}
		function oe(e) {
			L.value = L.value.map((t) => t.id === e.id ? e : t), M.success(`Updated metadata for "${e.name}"`);
		}
		function se() {
			W();
		}
		return S(() => {
			I.value && W();
		}), ne(I, (e) => {
			e && W();
		}), (e, t) => (C(), g("div", k, [
			t[3] ||= _("div", { class: "explore-header" }, [_("h1", { class: "explore-title" }, "Explore Similar")], -1),
			R.value && L.value.length === 0 ? (C(), m(ee, {
				key: 0,
				label: "Loading similar items"
			})) : H.value ? (C(), m(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load similar items",
				description: H.value
			}, {
				actions: E(() => [y(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: se
				}, {
					default: E(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !R.value && L.value.length === 0 && I.value ? (C(), m(c, {
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
				onWatchlist: Y,
				onInfo: J,
				onMarkWatched: X,
				onEditMetadata: ae,
				onExploreData: T(ie)
			}, null, 8, [
				"items",
				"total",
				"loading",
				"loading-more",
				"has-more",
				"can-match",
				"onExploreData"
			])) : (C(), m(c, {
				key: 3,
				icon: "search",
				title: "Select an item to explore",
				description: "Choose a title from your library to see similar recommendations."
			})),
			T(N).isAdmin ? (C(), m(l, {
				key: 5,
				modelValue: Q.value,
				"onUpdate:modelValue": t[0] ||= (e) => Q.value = e,
				item: Z.value,
				onApplied: oe
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(N).isAdmin ? (C(), m(u, {
				key: 6,
				modelValue: T($),
				"onUpdate:modelValue": t[1] ||= (e) => x($) ? $.value = e : null,
				item: T(re)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-5404edb5"]]);
//#endregion
export { A as default };

//# sourceMappingURL=ExplorePage-DixBx5XQ.js.map