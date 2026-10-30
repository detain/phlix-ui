import { n as e } from "./Icon-CIwTuFLd.js";
import { t } from "./useMessages-CtPA8i1l.js";
import { m as n, p as r, t as i } from "./client-BoMeMmx0.js";
import { n as a } from "./useApiBase-CV_r-Kk4.js";
import { t as o } from "./useAuthStore-9fn4zAD6.js";
import { r as ee } from "./useProfileStore-DM_80Zqk.js";
import { i as te } from "./usePlayerStore-D8A_gb_c.js";
import { t as ne } from "./useToastStore-DIWpaCOl.js";
import { n as re } from "./ThumbRating-CBiAAqLZ.js";
import { t as ie } from "./Spinner-CTxXRV7r.js";
import { t as ae } from "./useLibrariesStore-CzGRTmnM.js";
import { n as oe, t as se } from "./HomeRow-DyU-cLv8.js";
import { t as ce } from "./EmptyState-BAyOxAcK.js";
import { t as le } from "./Button-BuG0GvCa.js";
import { t as ue } from "./ConfirmDialog-CJ-buBdv.js";
import { t as s } from "./MediaRow-B7Upd0JW.js";
import { t as de } from "./MetadataMatchModal-tCc9XAfg.js";
import { t as fe } from "./PosterPicker-BGp8cZHd.js";
import { n as pe, t as me } from "./useItemInspector-DEO59vSd.js";
import { t as he } from "./recommendations-DMDaEMq9.js";
import { r as ge } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as _e, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as ve, createTextVNode as ye, createVNode as f, defineComponent as be, inject as xe, isRef as Se, onMounted as Ce, openBlock as p, reactive as we, ref as m, renderList as Te, renderSlot as Ee, unref as h, watch as De, withCtx as Oe } from "vue";
import { useRouter as ke } from "vue-router";
//#region src/api/mostWatched.ts
async function Ae(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/api/nextUp.ts
async function je(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/pages/browseErrors.ts
function Me(e, t, i) {
	let a = n(e, i);
	return a === null ? {
		title: "Couldn’t load your libraries",
		description: t
	} : {
		title: a,
		description: r(e, i)
	};
}
//#endregion
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var Ne = { class: "browse-page" }, Pe = { class: "browse-toolbar" }, Fe = {
	key: 5,
	class: "browse-loading"
}, Ie = 20, Le = 24, Re = 20, ze = 20, g = /*#__PURE__*/ e(/* @__PURE__ */ be({
	__name: "BrowsePage",
	setup(e) {
		let n = a(), r = xe("phlixConfig", null), be = c(() => r?.homeRows ?? []), g = ae(), Be = te(), _ = ne(), { t: v } = t(), y = o(), b = re(), Ve = ee(), x = ke(), { syncResume: He, continueWatchingItems: Ue } = oe(), S = m(null), C = m(!1), w = m(null), We = m(!1), Ge = m(null), { inspectorItem: Ke, inspectorOpen: T, openInspector: E } = me();
		function D(e) {
			S.value = e, C.value = !0;
		}
		function qe(e) {
			O.set(e.id, e), w.value = { ...e }, _.success(`Updated metadata for “${e.name}”`);
		}
		function Je(e) {
			O.set(e.id, e), w.value = { ...e }, _.success(`Updated poster for “${e.name}”`);
		}
		let Ye = c(() => g.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), O = we(/* @__PURE__ */ new Map());
		function k(e) {
			e.forEach((e) => O.set(e.id, e));
		}
		let Xe = c(() => {
			let e = Be.resumeMap;
			return Ue.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), A = m([]), j = m(!1), M = m(null), N = null;
		function Ze(e) {
			return N ? N.setBaseUrl(e) : N = new i({ baseUrl: e }), N;
		}
		async function P() {
			if (!j.value) {
				j.value = !0, M.value = null;
				try {
					let e = await je(Ze(n.value), { limit: Ie });
					A.value = e, k(e);
				} catch (e) {
					M.value = e instanceof Error ? e.message : "Failed to load next up";
				} finally {
					j.value = !1;
				}
			}
		}
		let Qe = c(() => !j.value && !M.value && A.value.length > 0), F = m([]), I = m(!1), L = m(null), R = null;
		function $e(e) {
			return R ? R.setBaseUrl(e) : R = new i({ baseUrl: e }), R;
		}
		async function z() {
			if (!I.value) {
				I.value = !0, L.value = null;
				try {
					let { items: e } = await $e(n.value).listFavorites({ limit: Le });
					F.value = e, e.forEach((e) => b.hydrate(e)), k(e);
				} catch (e) {
					L.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					I.value = !1;
				}
			}
		}
		let et = c(() => !I.value && !L.value && F.value.length > 0), B = m([]), V = m(!1), H = m(null), U = null;
		function tt(e) {
			return U ? U.setBaseUrl(e) : U = new i({ baseUrl: e }), U;
		}
		async function nt() {
			if (!V.value) {
				V.value = !0, H.value = null;
				try {
					let e = await he(tt(n.value), { limit: Re });
					B.value = e, k(e);
				} catch (e) {
					H.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					V.value = !1;
				}
			}
		}
		let rt = c(() => !V.value && !H.value && B.value.length > 0), it = m([]), W = m(!1), at = m(null), G = null;
		function ot(e) {
			return G ? G.setBaseUrl(e) : G = new i({ baseUrl: e }), G;
		}
		async function st() {
			if (!W.value) {
				W.value = !0, at.value = null;
				try {
					let e = await Ae(ot(n.value), { limit: ze });
					it.value = e, k(e);
				} catch (e) {
					at.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					W.value = !1;
				}
			}
		}
		let ct = c(() => !W.value && !at.value && it.value.length > 0);
		function lt() {
			g.load(n.value, !0), z(), P(), nt(), st();
		}
		Ce(() => {
			g.load(n.value), z(), P(), nt(), st(), He();
		}), De(n, lt), De(() => Ve.epoch, () => {
			F.value = [], A.value = [], B.value = [], z(), P(), nt(), He();
		});
		let ut = c(() => Me(g.errorCode ?? null, g.error ?? "", r?.locale)), dt = c(() => g.loaded && g.items.length === 0 && !g.error), ft = c(() => g.loading && g.items.length === 0 && !g.error);
		function pt(e, t) {
			x?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let mt = null;
		function ht(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			mt?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			mt = t;
			let r = () => t !== mt;
			try {
				let a = new i({ baseUrl: n.value }), o = await ge(a, n.value, e, Be.resumeMap, t?.signal);
				if (r()) return;
				if (!o) {
					_.info("Nothing to play yet");
					return;
				}
				pt("player", o.id);
			} catch (e) {
				if (r() || ht(e)) return;
				_.info("Nothing to play yet");
			}
		}
		function q(e) {
			b.isFavorite(e.id) ? (_.success(v("itemActions.addedToList", { name: e.name })), F.value.some((t) => t.id === e.id) || (F.value = [...F.value, e])) : (_.info(v("itemActions.removedFromList", { name: e.name })), F.value = F.value.filter((t) => t.id !== e.id));
		}
		function J(e) {
			x?.hasRoute("media") ? pt("media", e.id) : _.info(`Details for “${e.name}” are coming soon`);
		}
		function Y(e) {
			b.isWatched(e.id) ? _.success(`Marked “${e.name}” as watched`) : _.info(`Marked “${e.name}” as unwatched`);
		}
		function X(e) {
			S.value = e, C.value = !0;
		}
		function Z(e) {
			Ge.value = e, We.value = !0;
		}
		let gt = null, Q = m(null);
		function $(e) {
			Q.value = e;
		}
		async function _t() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			gt?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			gt = t;
			let r = () => t !== gt;
			try {
				if (await new i({ baseUrl: n.value }).deleteMediaItem(e.id), r()) return;
				F.value = F.value.filter((t) => t.id !== e.id), O.delete(e.id), _.success(`Removed “${e.name}”`);
			} catch (t) {
				if (r() || ht(t)) return;
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
			Xe.value.length ? (p(), l(s, {
				key: 0,
				title: "Continue Watching",
				items: Xe.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: D,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			Qe.value ? (p(), l(s, {
				key: 1,
				title: "Next Up",
				items: A.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: D,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			et.value ? (p(), l(s, {
				key: 2,
				title: h(v)("itemActions.watchlist"),
				items: F.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: D,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"title",
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			rt.value ? (p(), l(s, {
				key: 3,
				title: "Recommended",
				items: B.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: D,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			ct.value ? (p(), l(s, {
				key: 4,
				title: "Most Watched",
				items: it.value,
				"can-match": h(y).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: D,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			(p(!0), d(_e, null, Te(be.value, (e) => (p(), l(se, {
				key: e.id,
				row: e,
				"api-base": h(n),
				"show-see-all": !!e.query?.libraryId,
				"can-match": h(y).isAdmin,
				"applied-item": w.value,
				onItemsLoaded: k,
				onSeeAll: vt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: D,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			(p(!0), d(_e, null, Te(Ye.value, (e) => (p(), l(se, {
				key: e.id,
				row: e,
				"api-base": h(n),
				"can-match": h(y).isAdmin,
				"applied-item": w.value,
				onItemsLoaded: k,
				onSeeAll: vt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: D,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			ft.value ? (p(), d("div", Fe, [f(ie, { label: "Loading libraries" })])) : u("", !0),
			h(g).error ? (p(), l(ce, {
				key: 6,
				icon: "alert",
				title: ut.value.title,
				description: ut.value.description
			}, {
				actions: Oe(() => [f(le, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: lt
				}, {
					default: Oe(() => [...t[4] ||= [ye("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : dt.value ? (p(), l(ce, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : u("", !0),
			h(y).isAdmin ? (p(), l(de, {
				key: 8,
				modelValue: C.value,
				"onUpdate:modelValue": t[0] ||= (e) => C.value = e,
				item: S.value,
				onApplied: qe
			}, null, 8, ["modelValue", "item"])) : u("", !0),
			h(y).isAdmin ? (p(), l(fe, {
				key: 9,
				modelValue: We.value,
				"onUpdate:modelValue": t[1] ||= (e) => We.value = e,
				item: Ge.value,
				onApplied: Je
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
			h(y).isAdmin ? (p(), l(pe, {
				key: 10,
				modelValue: h(T),
				"onUpdate:modelValue": t[3] ||= (e) => Se(T) ? T.value = e : null,
				item: h(Ke)
			}, null, 8, ["modelValue", "item"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-2588f624"]]);
//#endregion
export { g as default };

//# sourceMappingURL=BrowsePage-BT1eieb7.js.map