import { n as e } from "./Icon-CIwTuFLd.js";
import { m as t, p as n, t as r } from "./client-CRZ_SWB1.js";
import { n as i } from "./useApiBase-CV_r-Kk4.js";
import { t as a } from "./useAuthStore-BbS6J1QF.js";
import { r as o } from "./useProfileStore-B-5t1cMa.js";
import { i as ee } from "./usePlayerStore-D8A_gb_c.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as ne } from "./ThumbRating-cLiSk8V_.js";
import { t as re } from "./Spinner-B9LmySj4.js";
import { t as ie } from "./useLibrariesStore-snrGn-sr.js";
import { n as ae, t as oe } from "./HomeRow--10q8904.js";
import { t as se } from "./EmptyState-BAyOxAcK.js";
import { t as ce } from "./Button-BuG0GvCa.js";
import { t as le } from "./ConfirmDialog-QgGYmnA5.js";
import { t as s } from "./MediaRow-D1XoROIJ.js";
import { t as ue } from "./MetadataMatchModal-CgBkitPo.js";
import { t as de } from "./PosterPicker-4Dl03gD_.js";
import { n as fe, t as pe } from "./useItemInspector-BolIjajF.js";
import { t as me } from "./recommendations-DMDaEMq9.js";
import { r as he } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as ge, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as _e, createTextVNode as ve, createVNode as f, defineComponent as ye, inject as be, isRef as xe, onMounted as Se, openBlock as p, reactive as Ce, ref as m, renderList as we, renderSlot as Te, unref as h, watch as Ee, withCtx as De } from "vue";
import { useRouter as Oe } from "vue-router";
//#region src/api/mostWatched.ts
async function ke(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/api/nextUp.ts
async function Ae(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/pages/browseErrors.ts
function je(e, r, i) {
	let a = t(e, i);
	return a === null ? {
		title: "Couldn't load your libraries",
		description: r
	} : {
		title: a,
		description: n(e, i)
	};
}
//#endregion
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var Me = { class: "browse-page" }, Ne = { class: "browse-toolbar" }, Pe = {
	key: 5,
	class: "browse-loading"
}, Fe = 20, Ie = 24, Le = 20, Re = 20, g = /*#__PURE__*/ e(/* @__PURE__ */ ye({
	__name: "BrowsePage",
	setup(e) {
		let t = i(), n = be("phlixConfig", null), ye = c(() => n?.homeRows ?? []), g = ie(), ze = ee(), _ = te(), v = a(), y = ne(), Be = o(), b = Oe(), { syncResume: Ve, continueWatchingItems: He } = ae(), x = m(null), S = m(!1), C = m(null), w = m(!1), Ue = m(null), { inspectorItem: We, inspectorOpen: T, openInspector: E } = pe();
		function D(e) {
			x.value = e, S.value = !0;
		}
		function Ge(e) {
			O.set(e.id, e), C.value = { ...e }, _.success(`Updated metadata for "${e.name}"`);
		}
		function Ke(e) {
			O.set(e.id, e), C.value = { ...e }, _.success(`Updated poster for "${e.name}"`);
		}
		let qe = c(() => g.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), O = Ce(/* @__PURE__ */ new Map());
		function k(e) {
			e.forEach((e) => O.set(e.id, e));
		}
		let Je = c(() => {
			let e = ze.resumeMap;
			return He.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), A = m([]), j = m(!1), M = m(null), N = null;
		function Ye(e) {
			return N ? N.setBaseUrl(e) : N = new r({ baseUrl: e }), N;
		}
		async function P() {
			if (!j.value) {
				j.value = !0, M.value = null;
				try {
					let e = await Ae(Ye(t.value), { limit: Fe });
					A.value = e, k(e);
				} catch (e) {
					M.value = e instanceof Error ? e.message : "Failed to load next up";
				} finally {
					j.value = !1;
				}
			}
		}
		let Xe = c(() => !j.value && !M.value && A.value.length > 0), F = m([]), I = m(!1), L = m(null), R = null;
		function Ze(e) {
			return R ? R.setBaseUrl(e) : R = new r({ baseUrl: e }), R;
		}
		async function z() {
			if (!I.value) {
				I.value = !0, L.value = null;
				try {
					let { items: e } = await Ze(t.value).listFavorites({ limit: Ie });
					F.value = e, e.forEach((e) => y.hydrate(e)), k(e);
				} catch (e) {
					L.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					I.value = !1;
				}
			}
		}
		let Qe = c(() => !I.value && !L.value && F.value.length > 0), B = m([]), V = m(!1), $e = m(null), H = null;
		function et(e) {
			return H ? H.setBaseUrl(e) : H = new r({ baseUrl: e }), H;
		}
		async function tt() {
			if (!V.value) {
				V.value = !0, $e.value = null;
				try {
					let e = await me(et(t.value), { limit: Le });
					B.value = e, k(e);
				} catch (e) {
					$e.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					V.value = !1;
				}
			}
		}
		let nt = c(() => !V.value && !$e.value && B.value.length > 0), rt = m([]), U = m(!1), it = m(null), W = null;
		function at(e) {
			return W ? W.setBaseUrl(e) : W = new r({ baseUrl: e }), W;
		}
		async function ot() {
			if (!U.value) {
				U.value = !0, it.value = null;
				try {
					let e = await ke(at(t.value), { limit: Re });
					rt.value = e, k(e);
				} catch (e) {
					it.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					U.value = !1;
				}
			}
		}
		let st = c(() => !U.value && !it.value && rt.value.length > 0);
		function ct() {
			g.load(t.value, !0), z(), P(), tt(), ot();
		}
		Se(() => {
			g.load(t.value), z(), P(), tt(), ot(), Ve();
		}), Ee(t, ct), Ee(() => Be.epoch, () => {
			F.value = [], A.value = [], B.value = [], z(), P(), tt(), Ve();
		});
		let lt = c(() => je(g.errorCode ?? null, g.error ?? "", n?.locale)), ut = c(() => g.loaded && g.items.length === 0 && !g.error), dt = c(() => g.loading && g.items.length === 0 && !g.error);
		function ft(e, t) {
			b?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let pt = null;
		function mt(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			pt?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			pt = n;
			let i = () => n !== pt;
			try {
				let a = new r({ baseUrl: t.value }), o = await he(a, t.value, e, ze.resumeMap, n?.signal);
				if (i()) return;
				if (!o) {
					_.info("Nothing to play yet");
					return;
				}
				ft("player", o.id);
			} catch (e) {
				if (i() || mt(e)) return;
				_.info("Nothing to play yet");
			}
		}
		function K(e) {
			y.isFavorite(e.id) ? (_.success(`Added "${e.name}" to your favorites`), F.value.some((t) => t.id === e.id) || (F.value = [...F.value, e])) : (_.info(`Removed "${e.name}" from your favorites`), F.value = F.value.filter((t) => t.id !== e.id));
		}
		function q(e) {
			b?.hasRoute("media") ? ft("media", e.id) : _.info(`Details for "${e.name}" are coming soon`);
		}
		function J(e) {
			y.isWatched(e.id) ? _.success(`Marked "${e.name}" as watched`) : _.info(`Marked "${e.name}" as unwatched`);
		}
		function Y(e) {
			x.value = e, S.value = !0;
		}
		function X(e) {
			Ue.value = e, w.value = !0;
		}
		let Z = null, Q = m(null);
		function $(e) {
			Q.value = e;
		}
		async function ht() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			Z?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Z = n;
			let i = () => n !== Z;
			try {
				if (await new r({ baseUrl: t.value }).deleteMediaItem(e.id), i()) return;
				F.value = F.value.filter((t) => t.id !== e.id), O.delete(e.id), _.success(`Removed "${e.name}"`);
			} catch (t) {
				if (i() || mt(t)) return;
				_.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function gt(e) {
			let t = e.query?.libraryId;
			t && b?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, n) => (p(), d("div", Me, [
			_e("div", Ne, [Te(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			Je.value.length ? (p(), l(s, {
				key: 0,
				title: "Continue Watching",
				items: Je.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: D,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			Xe.value ? (p(), l(s, {
				key: 1,
				title: "Next Up",
				items: A.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: D,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			Qe.value ? (p(), l(s, {
				key: 2,
				title: "My List",
				items: F.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: D,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			nt.value ? (p(), l(s, {
				key: 3,
				title: "Recommended",
				items: B.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: D,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			st.value ? (p(), l(s, {
				key: 4,
				title: "Most Watched",
				items: rt.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: D,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			(p(!0), d(ge, null, we(ye.value, (e) => (p(), l(oe, {
				key: e.id,
				row: e,
				"api-base": h(t),
				"show-see-all": !!e.query?.libraryId,
				"can-match": h(v).isAdmin,
				"applied-item": C.value,
				onItemsLoaded: k,
				onSeeAll: gt,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: D,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: D,
				onExploreData: h(E),
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
			(p(!0), d(ge, null, we(qe.value, (e) => (p(), l(oe, {
				key: e.id,
				row: e,
				"api-base": h(t),
				"can-match": h(v).isAdmin,
				"applied-item": C.value,
				onItemsLoaded: k,
				onSeeAll: gt,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: D,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: X,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			dt.value ? (p(), d("div", Pe, [f(re, { label: "Loading libraries" })])) : u("", !0),
			h(g).error ? (p(), l(se, {
				key: 6,
				icon: "alert",
				title: lt.value.title,
				description: lt.value.description
			}, {
				actions: De(() => [f(ce, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ct
				}, {
					default: De(() => [...n[4] ||= [ve("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : ut.value ? (p(), l(se, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : u("", !0),
			h(v).isAdmin ? (p(), l(ue, {
				key: 8,
				modelValue: S.value,
				"onUpdate:modelValue": n[0] ||= (e) => S.value = e,
				item: x.value,
				onApplied: Ge
			}, null, 8, ["modelValue", "item"])) : u("", !0),
			h(v).isAdmin ? (p(), l(de, {
				key: 9,
				modelValue: w.value,
				"onUpdate:modelValue": n[1] ||= (e) => w.value = e,
				item: Ue.value,
				onApplied: Ke
			}, null, 8, ["modelValue", "item"])) : u("", !0),
			f(le, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": n[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: ht
			}, null, 8, ["open", "message"]),
			h(v).isAdmin ? (p(), l(fe, {
				key: 10,
				modelValue: h(T),
				"onUpdate:modelValue": n[3] ||= (e) => xe(T) ? T.value = e : null,
				item: h(We)
			}, null, 8, ["modelValue", "item"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-e57621bd"]]);
//#endregion
export { g as default };

//# sourceMappingURL=BrowsePage-CwwUE7tX.js.map