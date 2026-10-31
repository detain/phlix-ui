import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMessages-DrceiftD.js";
import { t as n } from "./useLibrariesStore-B1SK5f5y.js";
import { i as r } from "./usePlayerStore-B7mnqLe3.js";
import { t as i } from "./useToastStore-Bu-iYU7r.js";
import { t as ee } from "./useAuthStore-D2ZmuYZO.js";
import { n as te } from "./ThumbRating-CHBeIZgN.js";
import { r as ne } from "./useProfileStore-Bh1s6vbZ.js";
import { n as re, t as ie } from "./HomeRow-CL8hgG82.js";
import { t as a } from "./MediaRow-S6mXdgYK.js";
import { t as ae } from "./EmptyState-BjOJ1k_A.js";
import { t as oe } from "./Spinner-zawWdcUT.js";
import { t as se } from "./Button-1sKEdGjj.js";
import { t as ce } from "./MetadataMatchModal-DUfuzbGX.js";
import { t as le } from "./PosterPicker-D4gZ01K-.js";
import { t as ue } from "./ConfirmDialog-CVLhzK8i.js";
import { n as de, t as fe } from "./useItemInspector-CqJTJ23o.js";
import { g as pe, h as o, t as s } from "./client-57OweUrJ.js";
import { t as me } from "./recommendations-BcfmbNnF.js";
import { r as he } from "./useResolvePlayable-CnOPgUvz.js";
import { n as ge } from "./Icon-CIbfiPrs.js";
import { Fragment as _e, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as ve, createTextVNode as ye, createVNode as f, defineComponent as be, inject as xe, isRef as Se, onMounted as Ce, openBlock as p, reactive as we, ref as m, renderList as Te, renderSlot as Ee, unref as h, watch as De, withCtx as Oe } from "vue";
import { useRouter as ke } from "vue-router";
// src/api/mostWatched.ts
async function Ae(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
// src/api/nextUp.ts
async function je(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
// src/pages/browseErrors.ts
function Me(e, t, n) {
	let r = pe(e, n);
	return r === null ? {
		title: "Couldn’t load your libraries",
		description: t
	} : {
		title: r,
		description: o(e, n)
	};
}
// src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var Ne = { class: "browse-page" }, Pe = { class: "browse-toolbar" }, Fe = {
	key: 5,
	class: "browse-loading"
}, Ie = 20, Le = 24, Re = 20, ze = 20, g = /*#__PURE__*/ ge(/* @__PURE__ */ be({
	__name: "BrowsePage",
	setup(pe) {
		let o = e(), ge = xe("phlixConfig", null), be = c(() => ge?.homeRows ?? []), g = n(), Be = r(), _ = i(), { t: v } = t(), y = ee(), b = te(), Ve = ne(), x = ke(), { syncResume: He, continueWatchingItems: Ue } = re(), S = m(null), C = m(!1), w = m(null), T = m(!1), We = m(null), { inspectorItem: Ge, inspectorOpen: E, openInspector: D } = fe();
		function O(e) {
			S.value = e, C.value = !0;
		}
		function Ke(e) {
			k.set(e.id, e), w.value = { ...e }, _.success(`Updated metadata for “${e.name}”.`);
		}
		function qe(e) {
			k.set(e.id, e), w.value = { ...e }, _.success(`Updated poster for “${e.name}”.`);
		}
		let Je = c(() => g.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), k = we(/* @__PURE__ */ new Map());
		function A(e) {
			e.forEach((e) => k.set(e.id, e));
		}
		let Ye = c(() => {
			let e = Be.resumeMap;
			return Ue.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), j = m([]), M = m(!1), N = m(null), P = null;
		function Xe(e) {
			return P ? P.setBaseUrl(e) : P = new s({ baseUrl: e }), P;
		}
		async function F() {
			if (!M.value) {
				M.value = !0, N.value = null;
				try {
					let e = await je(Xe(o.value), { limit: Ie });
					j.value = e, A(e);
				} catch (e) {
					N.value = e instanceof Error ? e.message : "Failed to load next up";
				} finally {
					M.value = !1;
				}
			}
		}
		let Ze = c(() => !M.value && !N.value && j.value.length > 0), I = m([]), L = m(!1), Qe = m(null), R = null;
		function $e(e) {
			return R ? R.setBaseUrl(e) : R = new s({ baseUrl: e }), R;
		}
		async function et() {
			if (!L.value) {
				L.value = !0, Qe.value = null;
				try {
					let { items: e } = await $e(o.value).listFavorites({ limit: Le });
					I.value = e, e.forEach((e) => b.hydrate(e)), A(e);
				} catch (e) {
					Qe.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					L.value = !1;
				}
			}
		}
		let tt = c(() => !L.value && !Qe.value && I.value.length > 0), z = m([]), B = m(!1), nt = m(null), V = null;
		function rt(e) {
			return V ? V.setBaseUrl(e) : V = new s({ baseUrl: e }), V;
		}
		async function it() {
			if (!B.value) {
				B.value = !0, nt.value = null;
				try {
					let e = await me(rt(o.value), { limit: Re });
					z.value = e, A(e);
				} catch (e) {
					nt.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					B.value = !1;
				}
			}
		}
		let at = c(() => !B.value && !nt.value && z.value.length > 0), ot = m([]), H = m(!1), st = m(null), U = null;
		function ct(e) {
			return U ? U.setBaseUrl(e) : U = new s({ baseUrl: e }), U;
		}
		async function lt() {
			if (!H.value) {
				H.value = !0, st.value = null;
				try {
					let e = await Ae(ct(o.value), { limit: ze });
					ot.value = e, A(e);
				} catch (e) {
					st.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					H.value = !1;
				}
			}
		}
		let ut = c(() => !H.value && !st.value && ot.value.length > 0);
		function dt() {
			g.load(o.value, !0), et(), F(), it(), lt();
		}
		Ce(() => {
			g.load(o.value), et(), F(), it(), lt(), He();
		}), De(o, dt), De(() => Ve.epoch, () => {
			I.value = [], j.value = [], z.value = [], et(), F(), it(), He();
		});
		let ft = c(() => Me(g.errorCode ?? null, g.error ?? "", ge?.locale)), pt = c(() => g.loaded && g.items.length === 0 && !g.error), mt = c(() => g.loading && g.items.length === 0 && !g.error);
		function ht(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let W = null;
		function gt(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			W?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			W = t;
			let n = () => t !== W;
			try {
				let r = new s({ baseUrl: o.value }), i = await he(r, o.value, e, Be.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					_.info("Nothing to play yet.");
					return;
				}
				ht("player", i.id);
			} catch (e) {
				if (n() || gt(e)) return;
				_.info("Nothing to play yet.");
			}
		}
		function K(e) {
			b.isFavorite(e.id) ? (_.success(v("itemActions.addedToList", { name: e.name })), I.value.some((t) => t.id === e.id) || (I.value = [...I.value, e])) : (_.info(v("itemActions.removedFromList", { name: e.name })), I.value = I.value.filter((t) => t.id !== e.id));
		}
		function q(e) {
			x?.hasRoute("media") ? ht("media", e.id) : _.info(`Details for “${e.name}” are coming soon.`);
		}
		function J(e) {
			b.isWatched(e.id) ? _.success(`Marked “${e.name}” as watched.`) : _.info(`Marked “${e.name}” as unwatched.`);
		}
		function Y(e) {
			S.value = e, C.value = !0;
		}
		function X(e) {
			We.value = e, T.value = !0;
		}
		let Z = null, Q = m(null);
		function $(e) {
			Q.value = e;
		}
		async function _t() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			Z?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			Z = t;
			let n = () => t !== Z;
			try {
				if (await new s({ baseUrl: o.value }).deleteMediaItem(e.id), n()) return;
				I.value = I.value.filter((t) => t.id !== e.id), k.delete(e.id), _.success(`Removed “${e.name}”.`);
			} catch (t) {
				if (n() || gt(t)) return;
				_.error(`Failed to remove “${e.name}”.`, { message: t instanceof Error ? t.message : "Unknown error" });
			}
		}
		function vt(e) {
			let t = e.query?.libraryId;
			t && x?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (p(), d("div", Ne, [
			ve("div", Pe, [Ee(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			Ye.value.length ? (p(), l(a, {
				key: 0,
				title: "Continue Watching",
				items: Ye.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: O,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: O,
				onExploreData: h(D),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			Ze.value ? (p(), l(a, {
				key: 1,
				title: "Next Up",
				items: j.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: O,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: O,
				onExploreData: h(D),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			tt.value ? (p(), l(a, {
				key: 2,
				title: h(v)("itemActions.watchlist"),
				items: I.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: O,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: O,
				onExploreData: h(D),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"title",
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			at.value ? (p(), l(a, {
				key: 3,
				title: "Recommended",
				items: z.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: O,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: O,
				onExploreData: h(D),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			ut.value ? (p(), l(a, {
				key: 4,
				title: "Most Watched",
				items: ot.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: O,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: O,
				onExploreData: h(D),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			(p(!0), d(_e, null, Te(be.value, (e) => (p(), l(ie, {
				key: e.id,
				row: e,
				"api-base": h(o),
				"show-see-all": !!e.query?.libraryId,
				"can-match": h(y).isAdmin,
				"applied-item": w.value,
				onItemsLoaded: A,
				onSeeAll: vt,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: O,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: O,
				onExploreData: h(D),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			(p(!0), d(_e, null, Te(Je.value, (e) => (p(), l(ie, {
				key: e.id,
				row: e,
				"api-base": h(o),
				"can-match": h(y).isAdmin,
				"applied-item": w.value,
				onItemsLoaded: A,
				onSeeAll: vt,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: O,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: O,
				onExploreData: h(D),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			mt.value ? (p(), d("div", Fe, [f(oe, { label: "Loading libraries" })])) : u("", !0),
			h(g).error ? (p(), l(ae, {
				key: 6,
				icon: "alert",
				title: ft.value.title,
				description: ft.value.description
			}, {
				actions: Oe(() => [f(se, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: dt
				}, {
					default: Oe(() => [...t[4] ||= [ye("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : pt.value ? (p(), l(ae, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : u("", !0),
			h(y).isAdmin ? (p(), l(ce, {
				key: 8,
				modelValue: C.value,
				"onUpdate:modelValue": t[0] ||= (e) => C.value = e,
				item: S.value,
				onApplied: Ke
			}, null, 8, ["modelValue", "item"])) : u("", !0),
			h(y).isAdmin ? (p(), l(le, {
				key: 9,
				modelValue: T.value,
				"onUpdate:modelValue": t[1] ||= (e) => T.value = e,
				item: We.value,
				onApplied: qe
			}, null, 8, ["modelValue", "item"])) : u("", !0),
			f(ue, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: _t
			}, null, 8, ["open", "message"]),
			h(y).isAdmin ? (p(), l(de, {
				key: 10,
				modelValue: h(E),
				"onUpdate:modelValue": t[3] ||= (e) => Se(E) ? E.value = e : null,
				item: h(Ge)
			}, null, 8, ["modelValue", "item"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-a8aa5a4f"]]);
export { g as default };

//# sourceMappingURL=BrowsePage-CyexErdJ.js.map