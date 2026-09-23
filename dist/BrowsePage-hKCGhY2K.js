import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-BoVYipAG.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-s6lZkMZy.js";
import { r as i } from "./useProfileStore-Dga1licG.js";
import { i as a } from "./usePlayerStore-DhgapSoa.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as te } from "./ThumbRating-CeN5cs1K.js";
import { t as ne } from "./Spinner-CbyAsXDA.js";
import { t as re } from "./useLibrariesStore-DGAS4Fer.js";
import { n as ie, t as ae } from "./HomeRow-DCWz8ME0.js";
import { t as oe } from "./Button-BL3fV7FU.js";
import { t as se } from "./EmptyState-BwwPJtFd.js";
import { t as o } from "./MediaRow-D0wGw6Td.js";
import { a as s, i as c } from "./errors-DYDTeHIA.js";
import { t as ce } from "./MetadataMatchModal-D_Znx5MQ.js";
import { t as le } from "./PosterPicker-BydB87FK.js";
import { n as ue, t as de } from "./useItemInspector-B756NpbM.js";
import { t as fe } from "./recommendations-DMDaEMq9.js";
import { r as pe } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as me, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as he, createTextVNode as ge, createVNode as _e, defineComponent as ve, inject as ye, isRef as be, onMounted as xe, openBlock as p, reactive as Se, ref as m, renderList as Ce, renderSlot as we, unref as h, watch as Te, withCtx as Ee } from "vue";
import { useRouter as De } from "vue-router";
//#region src/api/mostWatched.ts
async function Oe(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/api/nextUp.ts
async function ke(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/pages/browseErrors.ts
function Ae(e, t, n) {
	let r = s(e, n);
	return r === null ? {
		title: "Couldn't load your libraries",
		description: t
	} : {
		title: r,
		description: c(e, n)
	};
}
//#endregion
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var je = { class: "browse-page" }, Me = { class: "browse-toolbar" }, Ne = {
	key: 5,
	class: "browse-loading"
}, Pe = 20, Fe = 24, Ie = 20, Le = 20, g = /*#__PURE__*/ e(/* @__PURE__ */ ve({
	__name: "BrowsePage",
	setup(e) {
		let s = n(), c = ye("phlixConfig", null), ve = l(() => c?.homeRows ?? []), g = re(), Re = a(), _ = ee(), v = r(), y = te(), ze = i(), b = De(), { syncResume: Be, continueWatchingItems: Ve } = ie(), x = m(null), S = m(!1), C = m(null), w = m(!1), He = m(null), { inspectorItem: Ue, inspectorOpen: T, openInspector: E } = de();
		function D(e) {
			x.value = e, S.value = !0;
		}
		function We(e) {
			O.set(e.id, e), C.value = { ...e }, _.success(`Updated metadata for "${e.name}"`);
		}
		function Ge(e) {
			O.set(e.id, e), C.value = { ...e }, _.success(`Updated poster for "${e.name}"`);
		}
		let Ke = l(() => g.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), O = Se(/* @__PURE__ */ new Map());
		function k(e) {
			e.forEach((e) => O.set(e.id, e));
		}
		let qe = l(() => {
			let e = Re.resumeMap;
			return Ve.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), A = m([]), j = m(!1), M = m(null), N = null;
		function Je(e) {
			return N ? N.setBaseUrl(e) : N = new t({ baseUrl: e }), N;
		}
		async function P() {
			if (!j.value) {
				j.value = !0, M.value = null;
				try {
					let e = await ke(Je(s.value), { limit: Pe });
					A.value = e, k(e);
				} catch (e) {
					M.value = e instanceof Error ? e.message : "Failed to load next up";
				} finally {
					j.value = !1;
				}
			}
		}
		let Ye = l(() => !j.value && !M.value && A.value.length > 0), F = m([]), I = m(!1), L = m(null), R = null;
		function Xe(e) {
			return R ? R.setBaseUrl(e) : R = new t({ baseUrl: e }), R;
		}
		async function z() {
			if (!I.value) {
				I.value = !0, L.value = null;
				try {
					let { items: e } = await Xe(s.value).listFavorites({ limit: Fe });
					F.value = e, e.forEach((e) => y.hydrate(e)), k(e);
				} catch (e) {
					L.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					I.value = !1;
				}
			}
		}
		let Ze = l(() => !I.value && !L.value && F.value.length > 0), B = m([]), V = m(!1), H = m(null), U = null;
		function Qe(e) {
			return U ? U.setBaseUrl(e) : U = new t({ baseUrl: e }), U;
		}
		async function W() {
			if (!V.value) {
				V.value = !0, H.value = null;
				try {
					let e = await fe(Qe(s.value), { limit: Ie });
					B.value = e, k(e);
				} catch (e) {
					H.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					V.value = !1;
				}
			}
		}
		let $e = l(() => !V.value && !H.value && B.value.length > 0), et = m([]), G = m(!1), tt = m(null), K = null;
		function nt(e) {
			return K ? K.setBaseUrl(e) : K = new t({ baseUrl: e }), K;
		}
		async function rt() {
			if (!G.value) {
				G.value = !0, tt.value = null;
				try {
					let e = await Oe(nt(s.value), { limit: Le });
					et.value = e, k(e);
				} catch (e) {
					tt.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					G.value = !1;
				}
			}
		}
		let it = l(() => !G.value && !tt.value && et.value.length > 0);
		function at() {
			g.load(s.value, !0), z(), P(), W(), rt();
		}
		xe(() => {
			g.load(s.value), z(), P(), W(), rt(), Be();
		}), Te(s, at), Te(() => ze.epoch, () => {
			F.value = [], A.value = [], B.value = [], z(), P(), W(), Be();
		});
		let ot = l(() => Ae(g.errorCode ?? null, g.error ?? "", c?.locale)), st = l(() => g.loaded && g.items.length === 0 && !g.error), ct = l(() => g.loading && g.items.length === 0 && !g.error);
		function lt(e, t) {
			b?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let ut = null;
		function dt(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function q(e) {
			ut?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			ut = n;
			let r = () => n !== ut;
			try {
				let i = new t({ baseUrl: s.value }), a = await pe(i, s.value, e, Re.resumeMap, n?.signal);
				if (r()) return;
				if (!a) {
					_.info("Nothing to play yet");
					return;
				}
				lt("player", a.id);
			} catch (e) {
				if (r() || dt(e)) return;
				_.info("Nothing to play yet");
			}
		}
		function J(e) {
			y.isFavorite(e.id) ? (_.success(`Added "${e.name}" to your favorites`), F.value.some((t) => t.id === e.id) || (F.value = [...F.value, e])) : (_.info(`Removed "${e.name}" from your favorites`), F.value = F.value.filter((t) => t.id !== e.id));
		}
		function Y(e) {
			b?.hasRoute("media") ? lt("media", e.id) : _.info(`Details for "${e.name}" are coming soon`);
		}
		function X(e) {
			y.isWatched(e.id) ? _.success(`Marked "${e.name}" as watched`) : _.info(`Marked "${e.name}" as unwatched`);
		}
		function Z(e) {
			x.value = e, S.value = !0;
		}
		function Q(e) {
			He.value = e, w.value = !0;
		}
		let ft = null;
		async function $(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			ft?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			ft = n;
			let r = () => n !== ft;
			try {
				if (await new t({ baseUrl: s.value }).deleteMediaItem(e.id), r()) return;
				F.value = F.value.filter((t) => t.id !== e.id), O.delete(e.id), _.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || dt(t)) return;
				_.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function pt(e) {
			let t = e.query?.libraryId;
			t && b?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (p(), f("div", je, [
			he("div", Me, [we(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			qe.value.length ? (p(), u(o, {
				key: 0,
				title: "Continue Watching",
				items: qe.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: q,
				onWatchlist: J,
				onInfo: Y,
				onMatch: D,
				onMarkWatched: X,
				onRefresh: Z,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Q,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			Ye.value ? (p(), u(o, {
				key: 1,
				title: "Next Up",
				items: A.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: q,
				onWatchlist: J,
				onInfo: Y,
				onMatch: D,
				onMarkWatched: X,
				onRefresh: Z,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Q,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			Ze.value ? (p(), u(o, {
				key: 2,
				title: "My List",
				items: F.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: q,
				onWatchlist: J,
				onInfo: Y,
				onMatch: D,
				onMarkWatched: X,
				onRefresh: Z,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Q,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			$e.value ? (p(), u(o, {
				key: 3,
				title: "Recommended",
				items: B.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: q,
				onWatchlist: J,
				onInfo: Y,
				onMatch: D,
				onMarkWatched: X,
				onRefresh: Z,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Q,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			it.value ? (p(), u(o, {
				key: 4,
				title: "Most Watched",
				items: et.value,
				"can-match": h(v).isAdmin,
				"hide-when-empty": "",
				onPlay: q,
				onWatchlist: J,
				onInfo: Y,
				onMatch: D,
				onMarkWatched: X,
				onRefresh: Z,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Q,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : d("", !0),
			(p(!0), f(me, null, Ce(ve.value, (e) => (p(), u(ae, {
				key: e.id,
				row: e,
				"api-base": h(s),
				"show-see-all": !!e.query?.libraryId,
				"can-match": h(v).isAdmin,
				"applied-item": C.value,
				onItemsLoaded: k,
				onSeeAll: pt,
				onPlay: q,
				onWatchlist: J,
				onInfo: Y,
				onMatch: D,
				onMarkWatched: X,
				onRefresh: Z,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Q,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			(p(!0), f(me, null, Ce(Ke.value, (e) => (p(), u(ae, {
				key: e.id,
				row: e,
				"api-base": h(s),
				"can-match": h(v).isAdmin,
				"applied-item": C.value,
				onItemsLoaded: k,
				onSeeAll: pt,
				onPlay: q,
				onWatchlist: J,
				onInfo: Y,
				onMatch: D,
				onMarkWatched: X,
				onRefresh: Z,
				onEditMetadata: D,
				onExploreData: h(E),
				onChoosePoster: Q,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			ct.value ? (p(), f("div", Ne, [_e(ne, { label: "Loading libraries" })])) : d("", !0),
			h(g).error ? (p(), u(se, {
				key: 6,
				icon: "alert",
				title: ot.value.title,
				description: ot.value.description
			}, {
				actions: Ee(() => [_e(oe, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: at
				}, {
					default: Ee(() => [...t[3] ||= [ge("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : st.value ? (p(), u(se, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : d("", !0),
			h(v).isAdmin ? (p(), u(ce, {
				key: 8,
				modelValue: S.value,
				"onUpdate:modelValue": t[0] ||= (e) => S.value = e,
				item: x.value,
				onApplied: We
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			h(v).isAdmin ? (p(), u(le, {
				key: 9,
				modelValue: w.value,
				"onUpdate:modelValue": t[1] ||= (e) => w.value = e,
				item: He.value,
				onApplied: Ge
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			h(v).isAdmin ? (p(), u(ue, {
				key: 10,
				modelValue: h(T),
				"onUpdate:modelValue": t[2] ||= (e) => be(T) ? T.value = e : null,
				item: h(Ue)
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-3bfefe98"]]);
//#endregion
export { g as default };

//# sourceMappingURL=BrowsePage-hKCGhY2K.js.map