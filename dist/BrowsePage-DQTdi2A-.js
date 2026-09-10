import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-DA-5QZXw.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-BDRS4qlY.js";
import { n as i } from "./useProfileStore-B-_QIfb0.js";
import { i as a } from "./usePlayerStore-DhgapSoa.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as te } from "./ThumbRating-C4h1Ofkr.js";
import { t as ne } from "./Spinner-CEc78iJz.js";
import { t as re } from "./useLibrariesStore-CbBW_uR6.js";
import { n as ie, t as ae } from "./HomeRow-Mg7uCK2L.js";
import { t as oe } from "./Button-BL3fV7FU.js";
import { t as se } from "./EmptyState-BwwPJtFd.js";
import { t as o } from "./MediaRow-DOEUISnA.js";
import { t as ce } from "./MetadataMatchModal-CK40jSKj.js";
import { t as le } from "./PosterPicker-C3U4n506.js";
import { n as ue, t as de } from "./useItemInspector-BF7cLyUc.js";
import { t as fe } from "./recommendations-DMDaEMq9.js";
import { r as pe } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as me, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as he, createTextVNode as ge, createVNode as _e, defineComponent as d, inject as ve, isRef as ye, onMounted as be, openBlock as f, reactive as xe, ref as p, renderList as Se, renderSlot as Ce, unref as m, watch as we, withCtx as Te } from "vue";
import { useRouter as Ee } from "vue-router";
//#region src/api/mostWatched.ts
async function De(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/api/nextUp.ts
async function Oe(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/pages/browseErrors.ts
function ke(e, t) {
	switch (e) {
		case "server.relay_unavailable":
		case "server.no_tunnel": return {
			title: "Server relay not connected",
			description: "This server is online but its secure relay tunnel isn't connected yet, so its libraries can't be loaded over the hub. It should reconnect automatically — try again in a moment."
		};
		case "server.offline": return {
			title: "Server offline",
			description: "This server is offline, so its libraries can’t be loaded. It will be browsable again once it reconnects to the hub."
		};
		default: return {
			title: "Couldn't load your libraries",
			description: t
		};
	}
}
//#endregion
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var Ae = { class: "browse-page" }, je = { class: "browse-toolbar" }, Me = {
	key: 5,
	class: "browse-loading"
}, Ne = 20, Pe = 24, Fe = 20, Ie = 20, Le = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "BrowsePage",
	setup(e) {
		let d = n(), Le = ve("phlixConfig", null), Re = s(() => Le?.homeRows ?? []), h = re(), ze = a(), g = ee(), _ = r(), v = te(), Be = i(), y = Ee(), { syncResume: Ve, continueWatchingItems: He } = ie(), b = p(null), x = p(!1), S = p(null), C = p(!1), Ue = p(null), { inspectorItem: We, inspectorOpen: w, openInspector: T } = de();
		function E(e) {
			b.value = e, x.value = !0;
		}
		function Ge(e) {
			D.set(e.id, e), S.value = { ...e }, g.success(`Updated metadata for "${e.name}"`);
		}
		function Ke(e) {
			D.set(e.id, e), S.value = { ...e }, g.success(`Updated poster for "${e.name}"`);
		}
		let qe = s(() => h.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), D = xe(/* @__PURE__ */ new Map());
		function O(e) {
			e.forEach((e) => D.set(e.id, e));
		}
		let Je = s(() => {
			let e = ze.resumeMap;
			return He.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), k = p([]), A = p(!1), j = p(null), M = null;
		function Ye(e) {
			return M ? M.setBaseUrl(e) : M = new t({ baseUrl: e }), M;
		}
		async function N() {
			if (!A.value) {
				A.value = !0, j.value = null;
				try {
					let e = await Oe(Ye(d.value), { limit: Ne });
					k.value = e, O(e);
				} catch (e) {
					j.value = e instanceof Error ? e.message : "Failed to load next up";
				} finally {
					A.value = !1;
				}
			}
		}
		let Xe = s(() => !A.value && !j.value && k.value.length > 0), P = p([]), F = p(!1), I = p(null), L = null;
		function Ze(e) {
			return L ? L.setBaseUrl(e) : L = new t({ baseUrl: e }), L;
		}
		async function R() {
			if (!F.value) {
				F.value = !0, I.value = null;
				try {
					let { items: e } = await Ze(d.value).listFavorites({ limit: Pe });
					P.value = e, e.forEach((e) => v.hydrate(e)), O(e);
				} catch (e) {
					I.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					F.value = !1;
				}
			}
		}
		let Qe = s(() => !F.value && !I.value && P.value.length > 0), z = p([]), B = p(!1), V = p(null), H = null;
		function $e(e) {
			return H ? H.setBaseUrl(e) : H = new t({ baseUrl: e }), H;
		}
		async function U() {
			if (!B.value) {
				B.value = !0, V.value = null;
				try {
					let e = await fe($e(d.value), { limit: Fe });
					z.value = e, O(e);
				} catch (e) {
					V.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					B.value = !1;
				}
			}
		}
		let et = s(() => !B.value && !V.value && z.value.length > 0), tt = p([]), W = p(!1), nt = p(null), G = null;
		function rt(e) {
			return G ? G.setBaseUrl(e) : G = new t({ baseUrl: e }), G;
		}
		async function it() {
			if (!W.value) {
				W.value = !0, nt.value = null;
				try {
					let e = await De(rt(d.value), { limit: Ie });
					tt.value = e, O(e);
				} catch (e) {
					nt.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					W.value = !1;
				}
			}
		}
		let at = s(() => !W.value && !nt.value && tt.value.length > 0);
		function ot() {
			h.load(d.value, !0), R(), N(), U(), it();
		}
		be(() => {
			h.load(d.value), R(), N(), U(), it(), Ve();
		}), we(d, ot), we(() => Be.epoch, () => {
			P.value = [], k.value = [], z.value = [], R(), N(), U(), Ve();
		});
		let st = s(() => ke(h.errorCode ?? null, h.error ?? "")), ct = s(() => h.loaded && h.items.length === 0 && !h.error), lt = s(() => h.loading && h.items.length === 0 && !h.error);
		function ut(e, t) {
			y?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let dt = null;
		function ft(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			dt?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			dt = n;
			let r = () => n !== dt;
			try {
				let i = new t({ baseUrl: d.value }), a = await pe(i, d.value, e, ze.resumeMap, n?.signal);
				if (r()) return;
				if (!a) {
					g.info("Nothing to play yet");
					return;
				}
				ut("player", a.id);
			} catch (e) {
				if (r() || ft(e)) return;
				g.info("Nothing to play yet");
			}
		}
		function q(e) {
			v.isFavorite(e.id) ? (g.success(`Added "${e.name}" to your favorites`), P.value.some((t) => t.id === e.id) || (P.value = [...P.value, e])) : (g.info(`Removed "${e.name}" from your favorites`), P.value = P.value.filter((t) => t.id !== e.id));
		}
		function J(e) {
			y?.hasRoute("media") ? ut("media", e.id) : g.info(`Details for "${e.name}" are coming soon`);
		}
		function Y(e) {
			v.isWatched(e.id) ? g.success(`Marked "${e.name}" as watched`) : g.info(`Marked "${e.name}" as unwatched`);
		}
		function X(e) {
			b.value = e, x.value = !0;
		}
		function Z(e) {
			Ue.value = e, C.value = !0;
		}
		let Q = null;
		async function $(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Q?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Q = n;
			let r = () => n !== Q;
			try {
				if (await new t({ baseUrl: d.value }).deleteMediaItem(e.id), r()) return;
				P.value = P.value.filter((t) => t.id !== e.id), D.delete(e.id), g.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || ft(t)) return;
				g.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function pt(e) {
			let t = e.query?.libraryId;
			t && y?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (f(), u("div", Ae, [
			he("div", je, [Ce(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			Je.value.length ? (f(), c(o, {
				key: 0,
				title: "Continue Watching",
				items: Je.value,
				"can-match": m(_).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: E,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: E,
				onExploreData: m(T),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			Xe.value ? (f(), c(o, {
				key: 1,
				title: "Next Up",
				items: k.value,
				"can-match": m(_).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: E,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: E,
				onExploreData: m(T),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			Qe.value ? (f(), c(o, {
				key: 2,
				title: "My List",
				items: P.value,
				"can-match": m(_).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: E,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: E,
				onExploreData: m(T),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			et.value ? (f(), c(o, {
				key: 3,
				title: "Recommended",
				items: z.value,
				"can-match": m(_).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: E,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: E,
				onExploreData: m(T),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			at.value ? (f(), c(o, {
				key: 4,
				title: "Most Watched",
				items: tt.value,
				"can-match": m(_).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: E,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: E,
				onExploreData: m(T),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			(f(!0), u(me, null, Se(Re.value, (e) => (f(), c(ae, {
				key: e.id,
				row: e,
				"api-base": m(d),
				"show-see-all": !!e.query?.libraryId,
				"can-match": m(_).isAdmin,
				"applied-item": S.value,
				onItemsLoaded: O,
				onSeeAll: pt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: E,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: E,
				onExploreData: m(T),
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
			(f(!0), u(me, null, Se(qe.value, (e) => (f(), c(ae, {
				key: e.id,
				row: e,
				"api-base": m(d),
				"can-match": m(_).isAdmin,
				"applied-item": S.value,
				onItemsLoaded: O,
				onSeeAll: pt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: E,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: E,
				onExploreData: m(T),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			lt.value ? (f(), u("div", Me, [_e(ne, { label: "Loading libraries" })])) : l("", !0),
			m(h).error ? (f(), c(se, {
				key: 6,
				icon: "alert",
				title: st.value.title,
				description: st.value.description
			}, {
				actions: Te(() => [_e(oe, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ot
				}, {
					default: Te(() => [...t[3] ||= [ge("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : ct.value ? (f(), c(se, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : l("", !0),
			m(_).isAdmin ? (f(), c(ce, {
				key: 8,
				modelValue: x.value,
				"onUpdate:modelValue": t[0] ||= (e) => x.value = e,
				item: b.value,
				onApplied: Ge
			}, null, 8, ["modelValue", "item"])) : l("", !0),
			m(_).isAdmin ? (f(), c(le, {
				key: 9,
				modelValue: C.value,
				"onUpdate:modelValue": t[1] ||= (e) => C.value = e,
				item: Ue.value,
				onApplied: Ke
			}, null, 8, ["modelValue", "item"])) : l("", !0),
			m(_).isAdmin ? (f(), c(ue, {
				key: 10,
				modelValue: m(w),
				"onUpdate:modelValue": t[2] ||= (e) => ye(w) ? w.value = e : null,
				item: m(We)
			}, null, 8, ["modelValue", "item"])) : l("", !0)
		]));
	}
}), [["__scopeId", "data-v-8d9f444b"]]);
//#endregion
export { Le as default };

//# sourceMappingURL=BrowsePage-DQTdi2A-.js.map