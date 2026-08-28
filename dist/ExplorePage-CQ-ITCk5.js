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
import { t as ee } from "./MetadataMatchModal-D-SLpTGq.js";
import { n as te, t as d } from "./useItemInspector-Cn3FRzeh.js";
import { r as f } from "./useResolvePlayable-wCiMWuME.js";
import { computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, isRef as x, onMounted as S, openBlock as C, ref as w, unref as T, watch as ne, withCtx as E } from "vue";
import { useRoute as re, useRouter as D } from "vue-router";
//#region src/pages/ExplorePage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "explore-page" }, k = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "ExplorePage",
	setup(e) {
		let b = re(), k = D(), A = n(), j = a(), M = r(), N = o(), P = i(), F = p(() => typeof b.query.item == "string" ? b.query.item : null), I = w([]), L = w(!1), R = w(!1), z = w(!1), B = w(null), V = w(null);
		function H(e) {
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
		async function U() {
			let e = F.value;
			if (e) {
				L.value = !0, V.value = null;
				try {
					let n = await new t({ baseUrl: A.value }).get(`/api/v1/media/${encodeURIComponent(e)}/similar`, { limit: "20" });
					I.value = (n.items ?? []).map(H), B.value = I.value.length, z.value = !1;
				} catch (e) {
					V.value = e instanceof Error ? e.message : "Failed to load similar items";
				} finally {
					L.value = !1;
				}
			}
		}
		function W(e, t) {
			k?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function G(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			try {
				let n = new t({ baseUrl: A.value }), r = await f(n, A.value, e, P.resumeMap);
				if (!r) {
					j.info("Nothing to play yet");
					return;
				}
				W("player", r.id);
			} catch (e) {
				if (G(e)) return;
				j.info("Nothing to play yet");
			}
		}
		function q(e) {
			k?.hasRoute("media") ? W("media", e.id) : j.info(`Details for "${e.name}" are coming soon`);
		}
		function J(e) {
			N.isFavorite(e.id) ? j.success(`Added "${e.name}" to your favorites`) : j.info(`Removed "${e.name}" from your favorites`);
		}
		function Y(e) {
			N.isWatched(e.id) ? j.success(`Marked "${e.name}" as watched`) : j.info(`Marked "${e.name}" as unwatched`);
		}
		let X = w(null), Z = w(!1), { inspectorItem: ie, inspectorOpen: Q, openInspector: ae } = d();
		function $(e) {
			X.value = e, Z.value = !0;
		}
		function oe(e) {
			I.value = I.value.map((t) => t.id === e.id ? e : t), j.success(`Updated metadata for "${e.name}"`);
		}
		function se() {
			U();
		}
		return S(() => {
			F.value && U();
		}), ne(F, (e) => {
			e && U();
		}), (e, t) => (C(), g("div", O, [
			t[3] ||= _("div", { class: "explore-header" }, [_("h1", { class: "explore-title" }, "Explore Similar")], -1),
			L.value && I.value.length === 0 ? (C(), m(s, {
				key: 0,
				label: "Loading similar items"
			})) : V.value ? (C(), m(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load similar items",
				description: V.value
			}, {
				actions: E(() => [y(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: se
				}, {
					default: E(() => [...t[2] ||= [v("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : !L.value && I.value.length === 0 && F.value ? (C(), m(l, {
				key: 2,
				icon: "film",
				title: "No similar items found",
				description: "We couldn't find any similar items for this title."
			})) : F.value ? (C(), m(u, {
				key: 4,
				items: I.value,
				total: B.value,
				loading: L.value,
				"loading-more": R.value,
				"has-more": z.value,
				"can-match": T(M).isAdmin,
				onPlay: K,
				onWatchlist: J,
				onInfo: q,
				onMarkWatched: Y,
				onEditMetadata: $,
				onRefresh: $,
				onExploreData: T(ae)
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
			T(M).isAdmin ? (C(), m(ee, {
				key: 5,
				modelValue: Z.value,
				"onUpdate:modelValue": t[0] ||= (e) => Z.value = e,
				item: X.value,
				onApplied: oe
			}, null, 8, ["modelValue", "item"])) : h("", !0),
			T(M).isAdmin ? (C(), m(te, {
				key: 6,
				modelValue: T(Q),
				"onUpdate:modelValue": t[1] ||= (e) => x(Q) ? Q.value = e : null,
				item: T(ie)
			}, null, 8, ["modelValue", "item"])) : h("", !0)
		]));
	}
}), [["__scopeId", "data-v-cf14fbae"]]);
//#endregion
export { k as default };

//# sourceMappingURL=ExplorePage-CQ-ITCk5.js.map