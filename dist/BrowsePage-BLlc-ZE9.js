import { n as e } from "./useApiBase-DXTBY90j.js";
import { t } from "./useMessages-DA8YXaVD.js";
import { t as n } from "./useLibrariesStore-C7CVlbVW.js";
import { i as r } from "./usePlayerStore-BpohCwDP.js";
import { t as i } from "./useToastStore-CxO_ppM8.js";
import { t as ee } from "./useAuthStore-BzhZjWgj.js";
import { n as te } from "./ThumbRating-COapE1hP.js";
import { r as ne } from "./useProfileStore-JiPJzhT0.js";
import { n as re, t as ie } from "./HomeRow-DTeZ8bEb.js";
import { t as a } from "./MediaRow-B2SKFsvq.js";
import { t as ae } from "./EmptyState-DjfWh3kt.js";
import { t as oe } from "./Spinner-wzYyEuC4.js";
import { t as se } from "./Button-Dfl4y6vO.js";
import { t as ce } from "./MetadataMatchModal-BpKtQ4w6.js";
import { t as le } from "./PosterPicker-cceq0N2C.js";
import { t as ue } from "./ConfirmDialog-BBst5sQt.js";
import { n as de, t as fe } from "./useItemInspector-D5hyUlN9.js";
import { t as o } from "./client-Bmlfq3Uy.js";
import { t as pe } from "./recommendations-BcfmbNnF.js";
import { n as me, r as s } from "./wireErrors-DDkkTtfw.js";
import { r as he } from "./useResolvePlayable-CnOPgUvz.js";
import { n as c } from "./Icon-55iG1rR7.js";
import { Fragment as ge, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as _e, createTextVNode as ve, createVNode as p, defineComponent as m, inject as ye, isRef as be, onMounted as xe, openBlock as h, reactive as Se, ref as g, renderList as Ce, renderSlot as we, toDisplayString as Te, unref as _, watch as Ee, withCtx as De } from "vue";
import { useRouter as Oe } from "vue-router";
// src/api/mostWatched.ts
async function ke(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
// src/api/nextUp.ts
async function Ae(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
// src/pages/browseErrors.ts
function je(e, t, n) {
	return me(e, {
		title: "Couldn’t load your libraries",
		description: t
	}, n);
}
// src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var Me = { class: "browse-page" }, Ne = { class: "browse-toolbar" }, Pe = {
	key: 5,
	class: "browse-loading"
}, Fe = 20, Ie = 24, Le = 20, Re = 20, ze = /*#__PURE__*/ c(/* @__PURE__ */ m({
	__name: "BrowsePage",
	setup(me) {
		let c = e(), m = ye("phlixConfig", null), ze = l(() => m?.homeRows ?? []), v = n(), Be = r(), y = i(), { t: b } = t(), x = ee(), S = te(), Ve = ne(), C = Oe(), { syncResume: He, continueWatchingItems: Ue } = re(), w = g(null), T = g(!1), E = g(null), We = g(!1), Ge = g(null), { inspectorItem: Ke, inspectorOpen: qe, openInspector: D } = fe();
		function O(e) {
			w.value = e, T.value = !0;
		}
		function Je(e) {
			k.set(e.id, e), E.value = { ...e }, y.success(b("library.metadataUpdated", { name: e.name }));
		}
		function Ye(e) {
			k.set(e.id, e), E.value = { ...e }, y.success(b("library.posterUpdated", { name: e.name }));
		}
		let Xe = l(() => v.items.map((e) => ({
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
		let Ze = l(() => {
			let e = Be.resumeMap;
			return Ue.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), j = g([]), M = g(!1), Qe = g(null), N = null;
		function $e(e) {
			return N ? N.setBaseUrl(e) : N = new o({ baseUrl: e }), N;
		}
		async function P() {
			if (!M.value) {
				M.value = !0, Qe.value = null;
				try {
					let e = await Ae($e(c.value), { limit: Fe });
					j.value = e, A(e);
				} catch (e) {
					Qe.value = s(e, b("browse.loadNextUpError"), m?.locale);
				} finally {
					M.value = !1;
				}
			}
		}
		let et = l(() => !M.value && !Qe.value && j.value.length > 0), F = g([]), I = g(!1), L = g(null), R = null;
		function tt(e) {
			return R ? R.setBaseUrl(e) : R = new o({ baseUrl: e }), R;
		}
		async function z() {
			if (!I.value) {
				I.value = !0, L.value = null;
				try {
					let { items: e } = await tt(c.value).listFavorites({ limit: Ie });
					F.value = e, e.forEach((e) => S.hydrate(e)), A(e);
				} catch (e) {
					L.value = s(e, b("browse.loadFavoritesError"), m?.locale);
				} finally {
					I.value = !1;
				}
			}
		}
		let nt = l(() => !I.value && !L.value && F.value.length > 0), B = g([]), V = g(!1), rt = g(null), H = null;
		function it(e) {
			return H ? H.setBaseUrl(e) : H = new o({ baseUrl: e }), H;
		}
		async function at() {
			if (!V.value) {
				V.value = !0, rt.value = null;
				try {
					let e = await pe(it(c.value), { limit: Le });
					B.value = e, A(e);
				} catch (e) {
					rt.value = s(e, b("browse.loadRecommendationsError"), m?.locale);
				} finally {
					V.value = !1;
				}
			}
		}
		let ot = l(() => !V.value && !rt.value && B.value.length > 0), st = g([]), U = g(!1), ct = g(null), W = null;
		function lt(e) {
			return W ? W.setBaseUrl(e) : W = new o({ baseUrl: e }), W;
		}
		async function ut() {
			if (!U.value) {
				U.value = !0, ct.value = null;
				try {
					let e = await ke(lt(c.value), { limit: Re });
					st.value = e, A(e);
				} catch (e) {
					ct.value = s(e, b("browse.loadMostWatchedError"), m?.locale);
				} finally {
					U.value = !1;
				}
			}
		}
		let dt = l(() => !U.value && !ct.value && st.value.length > 0);
		function ft() {
			v.load(c.value, !0), z(), P(), at(), ut();
		}
		xe(() => {
			v.load(c.value), z(), P(), at(), ut(), He();
		}), Ee(c, ft), Ee(() => Ve.epoch, () => {
			F.value = [], j.value = [], B.value = [], z(), P(), at(), He();
		});
		let pt = l(() => je(v.errorCode ?? null, v.error ?? "", m?.locale)), mt = l(() => v.loaded && v.items.length === 0 && !v.error), ht = l(() => v.loading && v.items.length === 0 && !v.error);
		function gt(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let G = null;
		function _t(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			G?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			G = t;
			let n = () => t !== G;
			try {
				let r = new o({ baseUrl: c.value }), i = await he(r, c.value, e, Be.resumeMap, t?.signal);
				if (n()) return;
				if (!i) {
					y.info(b("library.nothingToPlay"));
					return;
				}
				gt("player", i.id);
			} catch (e) {
				if (n() || _t(e)) return;
				y.info(b("library.nothingToPlay"));
			}
		}
		function q(e) {
			S.isFavorite(e.id) ? (y.success(b("itemActions.addedToList", { name: e.name })), F.value.some((t) => t.id === e.id) || (F.value = [...F.value, e])) : (y.info(b("itemActions.removedFromList", { name: e.name })), F.value = F.value.filter((t) => t.id !== e.id));
		}
		function J(e) {
			C?.hasRoute("media") ? gt("media", e.id) : y.info(b("common.detailsUnavailable", { name: e.name }));
		}
		function Y(e) {
			S.isWatched(e.id) ? y.success(b("library.markedWatched", { name: e.name })) : y.info(b("library.markedUnwatched", { name: e.name }));
		}
		function X(e) {
			w.value = e, T.value = !0;
		}
		function Z(e) {
			Ge.value = e, We.value = !0;
		}
		let vt = null, Q = g(null);
		function $(e) {
			Q.value = e;
		}
		async function yt() {
			let e = Q.value;
			if (Q.value = null, !e) return;
			vt?.abort();
			let t = typeof AbortController < "u" ? new AbortController() : null;
			vt = t;
			let n = () => t !== vt;
			try {
				if (await new o({ baseUrl: c.value }).deleteMediaItem(e.id), n()) return;
				F.value = F.value.filter((t) => t.id !== e.id), k.delete(e.id), y.success(b("library.itemRemoved", { name: e.name }));
			} catch (t) {
				if (n() || _t(t)) return;
				y.error(b("library.itemRemoveFailed", { name: e.name }), { message: s(t, b("library.unknownError"), m?.locale) });
			}
		}
		function bt(e) {
			let t = e.query?.libraryId;
			t && C?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (h(), f("div", Me, [
			_e("div", Ne, [we(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			Ze.value.length ? (h(), u(a, {
				key: 0,
				title: _(b)("browse.continueWatching"),
				items: Ze.value,
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
				"title",
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			et.value ? (h(), u(a, {
				key: 1,
				title: _(b)("browse.nextUp"),
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
				"title",
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			nt.value ? (h(), u(a, {
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
			ot.value ? (h(), u(a, {
				key: 3,
				title: _(b)("browse.recommended"),
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
				"title",
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			dt.value ? (h(), u(a, {
				key: 4,
				title: _(b)("browse.mostWatched"),
				items: st.value,
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
			(h(!0), f(ge, null, Ce(ze.value, (e) => (h(), u(ie, {
				key: e.id,
				row: e,
				"api-base": _(c),
				"show-see-all": !!e.query?.libraryId,
				"can-match": _(x).isAdmin,
				"applied-item": E.value,
				onItemsLoaded: A,
				onSeeAll: bt,
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
			(h(!0), f(ge, null, Ce(Xe.value, (e) => (h(), u(ie, {
				key: e.id,
				row: e,
				"api-base": _(c),
				"can-match": _(x).isAdmin,
				"applied-item": E.value,
				onItemsLoaded: A,
				onSeeAll: bt,
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
			ht.value ? (h(), f("div", Pe, [p(oe, { label: _(b)("browse.loadingLibraries") }, null, 8, ["label"])])) : d("", !0),
			_(v).error ? (h(), u(ae, {
				key: 6,
				icon: "alert",
				title: pt.value.title,
				description: pt.value.description
			}, {
				actions: De(() => [p(se, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ft
				}, {
					default: De(() => [ve(Te(_(b)("common.retry")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : mt.value ? (h(), u(ae, {
				key: 7,
				icon: "film",
				title: _(b)("browse.noLibrariesTitle"),
				description: _(b)("browse.noLibrariesDescription")
			}, null, 8, ["title", "description"])) : d("", !0),
			_(x).isAdmin ? (h(), u(ce, {
				key: 8,
				modelValue: T.value,
				"onUpdate:modelValue": t[0] ||= (e) => T.value = e,
				item: w.value,
				onApplied: Je
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			_(x).isAdmin ? (h(), u(le, {
				key: 9,
				modelValue: We.value,
				"onUpdate:modelValue": t[1] ||= (e) => We.value = e,
				item: Ge.value,
				onApplied: Ye
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			p(ue, {
				open: Q.value !== null,
				message: Q.value ? _(b)("browse.removeConfirm", { name: Q.value.name }) : "",
				"confirm-label": _(b)("itemActions.remove"),
				danger: "",
				"onUpdate:open": t[2] ||= (e) => {
					e || (Q.value = null);
				},
				onConfirm: yt
			}, null, 8, [
				"open",
				"message",
				"confirm-label"
			]),
			_(x).isAdmin ? (h(), u(de, {
				key: 10,
				modelValue: _(qe),
				"onUpdate:modelValue": t[3] ||= (e) => be(qe) ? qe.value = e : null,
				item: _(Ke)
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-d5b835fd"]]);
export { ze as default };

//# sourceMappingURL=BrowsePage-BLlc-ZE9.js.map