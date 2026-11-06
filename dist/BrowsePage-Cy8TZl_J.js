import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMessages-CviWXZsn.js";
import { t as n } from "./useLibrariesStore-CGqgMNKs.js";
import { i as r } from "./usePlayerStore-BpohCwDP.js";
import { t as i } from "./useToastStore-CxO_ppM8.js";
import { t as ee } from "./useAuthStore-BWmqegXJ.js";
import { n as te } from "./ThumbRating-DZsSRred.js";
import { r as ne } from "./useProfileStore-BkYXKuly.js";
import { n as re, t as ie } from "./HomeRow-DbV9XoYx.js";
import { t as a } from "./MediaRow-RIlbBRiX.js";
import { t as ae } from "./EmptyState-DjfWh3kt.js";
import { t as oe } from "./Spinner-BqIK0Jt9.js";
import { t as se } from "./Button-Dfl4y6vO.js";
import { t as ce } from "./MetadataMatchModal-B-_MK1RV.js";
import { t as le } from "./PosterPicker-D0gAZ0Ac.js";
import { t as ue } from "./ConfirmDialog-MLGD49bw.js";
import { n as de, t as fe } from "./useItemInspector-DtV57KGu.js";
import { t as o } from "./client-BLNUsFSj.js";
import { t as pe } from "./recommendations-BcfmbNnF.js";
import { n as me, r as s } from "./wireErrors-BkdyAKba.js";
import { r as he } from "./useResolvePlayable-CnOPgUvz.js";
import { n as c } from "./Icon-55iG1rR7.js";
import { Fragment as ge, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as _e, createTextVNode as ve, createVNode as p, defineComponent as m, inject as ye, isRef as be, onMounted as xe, openBlock as h, reactive as Se, ref as g, renderList as Ce, renderSlot as we, unref as _, watch as Te, withCtx as Ee } from "vue";
import { useRouter as De } from "vue-router";
// src/api/mostWatched.ts
async function Oe(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
// src/api/nextUp.ts
async function ke(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
// src/pages/browseErrors.ts
function Ae(e, t, n) {
	return me(e, {
		title: "Couldn’t load your libraries",
		description: t
	}, n);
}
// src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var je = { class: "browse-page" }, Me = { class: "browse-toolbar" }, Ne = {
	key: 5,
	class: "browse-loading"
}, Pe = 20, Fe = 24, Ie = 20, Le = 20, Re = /*#__PURE__*/ c(/* @__PURE__ */ m({
	__name: "BrowsePage",
	setup(me) {
		let c = e(), m = ye("phlixConfig", null), Re = l(() => m?.homeRows ?? []), v = n(), ze = r(), y = i(), { t: b } = t(), x = ee(), S = te(), Be = ne(), C = De(), { syncResume: Ve, continueWatchingItems: He } = re(), w = g(null), T = g(!1), E = g(null), Ue = g(!1), We = g(null), { inspectorItem: Ge, inspectorOpen: Ke, openInspector: D } = fe();
		function O(e) {
			w.value = e, T.value = !0;
		}
		function qe(e) {
			k.set(e.id, e), E.value = { ...e }, y.success(`Updated metadata for “${e.name}”.`);
		}
		function Je(e) {
			k.set(e.id, e), E.value = { ...e }, y.success(`Updated poster for “${e.name}”.`);
		}
		let Ye = l(() => v.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), k = Se(/* @__PURE__ */ new Map());
		function A(e) {
			e.forEach((e) => k.set(e.id, e));
		}
		let Xe = l(() => {
			let e = ze.resumeMap;
			return He.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), j = g([]), M = g(!1), Ze = g(null), N = null;
		function Qe(e) {
			return N ? N.setBaseUrl(e) : N = new o({ baseUrl: e }), N;
		}
		async function P() {
			if (!M.value) {
				M.value = !0, Ze.value = null;
				try {
					let e = await ke(Qe(c.value), { limit: Pe });
					j.value = e, A(e);
				} catch (e) {
					Ze.value = s(e, "Failed to load next up", m?.locale);
				} finally {
					M.value = !1;
				}
			}
		}
		let $e = l(() => !M.value && !Ze.value && j.value.length > 0), F = g([]), I = g(!1), L = g(null), R = null;
		function et(e) {
			return R ? R.setBaseUrl(e) : R = new o({ baseUrl: e }), R;
		}
		async function z() {
			if (!I.value) {
				I.value = !0, L.value = null;
				try {
					let { items: e } = await et(c.value).listFavorites({ limit: Fe });
					F.value = e, e.forEach((e) => S.hydrate(e)), A(e);
				} catch (e) {
					L.value = s(e, "Failed to load favorites", m?.locale);
				} finally {
					I.value = !1;
				}
			}
		}
		let tt = l(() => !I.value && !L.value && F.value.length > 0), B = g([]), V = g(!1), nt = g(null), H = null;
		function rt(e) {
			return H ? H.setBaseUrl(e) : H = new o({ baseUrl: e }), H;
		}
		async function it() {
			if (!V.value) {
				V.value = !0, nt.value = null;
				try {
					let e = await pe(rt(c.value), { limit: Ie });
					B.value = e, A(e);
				} catch (e) {
					nt.value = s(e, "Failed to load recommendations", m?.locale);
				} finally {
					V.value = !1;
				}
			}
		}
		let at = l(() => !V.value && !nt.value && B.value.length > 0), ot = g([]), U = g(!1), st = g(null), W = null;
		function ct(e) {
			return W ? W.setBaseUrl(e) : W = new o({ baseUrl: e }), W;
		}
		async function lt() {
			if (!U.value) {
				U.value = !0, st.value = null;
				try {
					let e = await Oe(ct(c.value), { limit: Le });
					ot.value = e, A(e);
				} catch (e) {
					st.value = s(e, "Failed to load most watched", m?.locale);
				} finally {
					U.value = !1;
				}
			}
		}
		let ut = l(() => !U.value && !st.value && ot.value.length > 0);
		function dt() {
			v.load(c.value, !0), z(), P(), it(), lt();
		}
		xe(() => {
			v.load(c.value), z(), P(), it(), lt(), Ve();
		}), Te(c, dt), Te(() => Be.epoch, () => {
			F.value = [], j.value = [], B.value = [], z(), P(), it(), Ve();
		});
		let ft = l(() => Ae(v.errorCode ?? null, v.error ?? "", m?.locale)), pt = l(() => v.loaded && v.items.length === 0 && !v.error), mt = l(() => v.loading && v.items.length === 0 && !v.error);
		function ht(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let G = null;
		function gt(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			G?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			G = t;
			let n = () => t !== G;
			try {
				let r = new o({ baseUrl: c.value }), i = await he(r, c.value, e, ze.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					y.info(b("library.nothingToPlay"));
					return;
				}
				ht("player", i.id);
			} catch (e) {
				if (n() || gt(e)) return;
				y.info(b("library.nothingToPlay"));
			}
		}
		function q(e) {
			S.isFavorite(e.id) ? (y.success(b("itemActions.addedToList", { name: e.name })), F.value.some((t) => t.id === e.id) || (F.value = [...F.value, e])) : (y.info(b("itemActions.removedFromList", { name: e.name })), F.value = F.value.filter((t) => t.id !== e.id));
		}
		function J(e) {
			C?.hasRoute("media") ? ht("media", e.id) : y.info(b("common.detailsUnavailable", { name: e.name }));
		}
		function Y(e) {
			S.isWatched(e.id) ? y.success(`Marked “${e.name}” as watched.`) : y.info(`Marked “${e.name}” as unwatched.`);
		}
		function X(e) {
			w.value = e, T.value = !0;
		}
		function Z(e) {
			We.value = e, Ue.value = !0;
		}
		let _t = null, Q = g(null);
		function $(e) {
			Q.value = e;
		}
		async function vt() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			_t?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			_t = t;
			let n = () => t !== _t;
			try {
				if (await new o({ baseUrl: c.value }).deleteMediaItem(e.id), n()) return;
				F.value = F.value.filter((t) => t.id !== e.id), k.delete(e.id), y.success(`Removed “${e.name}”.`);
			} catch (t) {
				if (n() || gt(t)) return;
				y.error(`Failed to remove “${e.name}”.`, { message: s(t, "Unknown error", m?.locale) });
			}
		}
		function yt(e) {
			let t = e.query?.libraryId;
			t && C?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (h(), f("div", je, [
			_e("div", Me, [we(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			Xe.value.length ? (h(), u(a, {
				key: 0,
				title: "Continue watching",
				items: Xe.value,
				"can-match": _(x).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: O,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: O,
				onExploreData: _(D),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			$e.value ? (h(), u(a, {
				key: 1,
				title: "Next up",
				items: j.value,
				"can-match": _(x).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: O,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: O,
				onExploreData: _(D),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			tt.value ? (h(), u(a, {
				key: 2,
				title: _(b)("itemActions.watchlist"),
				items: F.value,
				"can-match": _(x).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: O,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: O,
				onExploreData: _(D),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"title",
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			at.value ? (h(), u(a, {
				key: 3,
				title: "Recommended",
				items: B.value,
				"can-match": _(x).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: O,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: O,
				onExploreData: _(D),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			ut.value ? (h(), u(a, {
				key: 4,
				title: "Most watched",
				items: ot.value,
				"can-match": _(x).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: O,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: O,
				onExploreData: _(D),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			(h(!0), f(ge, null, Ce(Re.value, (e) => (h(), u(ie, {
				key: e.id,
				row: e,
				"api-base": _(c),
				"show-see-all": !!e.query?.libraryId,
				"can-match": _(x).isAdmin,
				"applied-item": E.value,
				onItemsLoaded: A,
				onSeeAll: yt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: O,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: O,
				onExploreData: _(D),
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
			(h(!0), f(ge, null, Ce(Ye.value, (e) => (h(), u(ie, {
				key: e.id,
				row: e,
				"api-base": _(c),
				"can-match": _(x).isAdmin,
				"applied-item": E.value,
				onItemsLoaded: A,
				onSeeAll: yt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: O,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: O,
				onExploreData: _(D),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			mt.value ? (h(), f("div", Ne, [p(oe, { label: "Loading libraries" })])) : d("", !0),
			_(v).error ? (h(), u(ae, {
				key: 6,
				icon: "alert",
				title: ft.value.title,
				description: ft.value.description
			}, {
				actions: Ee(() => [p(se, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: dt
				}, {
					default: Ee(() => [...t[4] ||= [ve("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : pt.value ? (h(), u(ae, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : d("", !0),
			_(x).isAdmin ? (h(), u(ce, {
				key: 8,
				modelValue: T.value,
				"onUpdate:modelValue": t[0] ||= (e) => T.value = e,
				item: w.value,
				onApplied: qe
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			_(x).isAdmin ? (h(), u(le, {
				key: 9,
				modelValue: Ue.value,
				"onUpdate:modelValue": t[1] ||= (e) => Ue.value = e,
				item: We.value,
				onApplied: Je
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			p(ue, {
				open: Q.value !== null,
				message: Q.value ? `Remove “${Q.value.name}” from the library? This cannot be undone.` : "",
				"confirm-label": "Remove",
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: vt
			}, null, 8, ["open", "message"]),
			_(x).isAdmin ? (h(), u(de, {
				key: 10,
				modelValue: _(Ke),
				"onUpdate:modelValue": t[3] ||= (e) => be(Ke) ? Ke.value = e : null,
				item: _(Ge)
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-999add77"]]);
export { Re as default };

//# sourceMappingURL=BrowsePage-Cy8TZl_J.js.map