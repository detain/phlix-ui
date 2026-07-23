import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-BzWwyWKr.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-Ds0NVhBP.js";
import { i } from "./usePlayerStore-Dgw0JCWb.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as te } from "./ThumbRating-BxiWuYAs.js";
import { t as ne } from "./Spinner-C4utUvmQ.js";
import { t as re } from "./useLibrariesStore-tTV4T4xY.js";
import { n as ie, t as ae } from "./HomeRow-CNb3wcn6.js";
import { t as oe } from "./Button-DWa6Ld_Z.js";
import { t as se } from "./EmptyState-ZlI5t4KT.js";
import { t as a } from "./MediaRow-G_8v2rsv.js";
import { t as ce } from "./MetadataMatchModal-BbaA7xKl.js";
import { t as le } from "./PosterPicker-C5hu8ehM.js";
import { n as ue, t as de } from "./useItemInspector-BTx_gnEr.js";
import { t as fe } from "./recommendations-DMDaEMq9.js";
import { r as pe } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as me, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as he, createTextVNode as ge, createVNode as _e, defineComponent as u, inject as ve, isRef as ye, onMounted as be, openBlock as d, reactive as xe, ref as f, renderList as Se, renderSlot as Ce, unref as p, watch as we, withCtx as Te } from "vue";
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
}, Ne = 20, Pe = 24, Fe = 20, Ie = 20, Le = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "BrowsePage",
	setup(e) {
		let u = n(), Le = ve("phlixConfig", null), Re = o(() => Le?.homeRows ?? []), m = re(), ze = i(), h = ee(), g = r(), _ = te(), v = Ee(), { syncResume: Be, continueWatchingItems: Ve } = ie(), y = f(null), b = f(!1), x = f(null), S = f(!1), He = f(null), { inspectorItem: Ue, inspectorOpen: C, openInspector: w } = de();
		function T(e) {
			y.value = e, b.value = !0;
		}
		function We(e) {
			E.set(e.id, e), x.value = { ...e }, h.success(`Updated metadata for "${e.name}"`);
		}
		function Ge(e) {
			E.set(e.id, e), x.value = { ...e }, h.success(`Updated poster for "${e.name}"`);
		}
		let Ke = o(() => m.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), E = xe(/* @__PURE__ */ new Map());
		function D(e) {
			e.forEach((e) => E.set(e.id, e));
		}
		let qe = o(() => {
			let e = ze.resumeMap;
			return Ve.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), O = f([]), k = f(!1), A = f(null), j = null;
		function Je(e) {
			return j ? j.setBaseUrl(e) : j = new t({ baseUrl: e }), j;
		}
		async function Ye() {
			if (!k.value) {
				k.value = !0, A.value = null;
				try {
					let e = await Oe(Je(u.value), { limit: Ne });
					O.value = e, D(e);
				} catch (e) {
					A.value = e instanceof Error ? e.message : "Failed to load next up";
				} finally {
					k.value = !1;
				}
			}
		}
		let Xe = o(() => !k.value && !A.value && O.value.length > 0), M = f([]), N = f(!1), P = f(null), F = null;
		function Ze(e) {
			return F ? F.setBaseUrl(e) : F = new t({ baseUrl: e }), F;
		}
		async function Qe() {
			if (!N.value) {
				N.value = !0, P.value = null;
				try {
					let { items: e } = await Ze(u.value).listFavorites({ limit: Pe });
					M.value = e, e.forEach((e) => _.hydrate(e)), D(e);
				} catch (e) {
					P.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					N.value = !1;
				}
			}
		}
		let $e = o(() => !N.value && !P.value && M.value.length > 0), I = f([]), L = f(!1), R = f(null), z = null;
		function et(e) {
			return z ? z.setBaseUrl(e) : z = new t({ baseUrl: e }), z;
		}
		async function tt() {
			if (!L.value) {
				L.value = !0, R.value = null;
				try {
					let e = await fe(et(u.value), { limit: Fe });
					I.value = e, D(e);
				} catch (e) {
					R.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					L.value = !1;
				}
			}
		}
		let nt = o(() => !L.value && !R.value && I.value.length > 0), B = f([]), V = f(!1), H = f(null), U = null;
		function rt(e) {
			return U ? U.setBaseUrl(e) : U = new t({ baseUrl: e }), U;
		}
		async function it() {
			if (!V.value) {
				V.value = !0, H.value = null;
				try {
					let e = await De(rt(u.value), { limit: Ie });
					B.value = e, D(e);
				} catch (e) {
					H.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					V.value = !1;
				}
			}
		}
		let at = o(() => !V.value && !H.value && B.value.length > 0);
		function ot() {
			m.load(u.value, !0), Qe(), Ye(), tt(), it();
		}
		be(() => {
			m.load(u.value), Qe(), Ye(), tt(), it(), Be();
		}), we(u, ot);
		let st = o(() => ke(m.errorCode ?? null, m.error ?? "")), ct = o(() => m.loaded && m.items.length === 0 && !m.error), lt = o(() => m.loading && m.items.length === 0 && !m.error);
		function ut(e, t) {
			v?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let W = null;
		function dt(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			W?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			W = n;
			let r = () => n !== W;
			try {
				let i = await pe(new t({ baseUrl: u.value }), u.value, e, ze.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					h.info("Nothing to play yet");
					return;
				}
				ut("player", i.id);
			} catch (e) {
				if (r() || dt(e)) return;
				h.info("Nothing to play yet");
			}
		}
		function K(e) {
			_.isFavorite(e.id) ? (h.success(`Added "${e.name}" to your favorites`), M.value.some((t) => t.id === e.id) || (M.value = [...M.value, e])) : (h.info(`Removed "${e.name}" from your favorites`), M.value = M.value.filter((t) => t.id !== e.id));
		}
		function q(e) {
			v?.hasRoute("media") ? ut("media", e.id) : h.info(`Details for "${e.name}" are coming soon`);
		}
		function J(e) {
			_.isWatched(e.id) ? h.success(`Marked "${e.name}" as watched`) : h.info(`Marked "${e.name}" as unwatched`);
		}
		function Y(e) {
			y.value = e, b.value = !0;
		}
		function X(e) {
			He.value = e, S.value = !0;
		}
		let Z = null;
		async function Q(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Z?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Z = n;
			let r = () => n !== Z;
			try {
				if (await new t({ baseUrl: u.value }).deleteMediaItem(e.id), r()) return;
				M.value = M.value.filter((t) => t.id !== e.id), E.delete(e.id), h.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || dt(t)) return;
				h.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function $(e) {
			let t = e.query?.libraryId;
			t && v?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (d(), l("div", Ae, [
			he("div", je, [Ce(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			qe.value.length ? (d(), s(a, {
				key: 0,
				title: "Continue Watching",
				items: qe.value,
				"can-match": p(g).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: T,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: T,
				onExploreData: p(w),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : c("", !0),
			Xe.value ? (d(), s(a, {
				key: 1,
				title: "Next Up",
				items: O.value,
				"can-match": p(g).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: T,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: T,
				onExploreData: p(w),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : c("", !0),
			$e.value ? (d(), s(a, {
				key: 2,
				title: "My List",
				items: M.value,
				"can-match": p(g).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: T,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: T,
				onExploreData: p(w),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : c("", !0),
			nt.value ? (d(), s(a, {
				key: 3,
				title: "Recommended",
				items: I.value,
				"can-match": p(g).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: T,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: T,
				onExploreData: p(w),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : c("", !0),
			at.value ? (d(), s(a, {
				key: 4,
				title: "Most Watched",
				items: B.value,
				"can-match": p(g).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: T,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: T,
				onExploreData: p(w),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : c("", !0),
			(d(!0), l(me, null, Se(Re.value, (e) => (d(), s(ae, {
				key: e.id,
				row: e,
				"api-base": p(u),
				"show-see-all": !!e.query?.libraryId,
				"can-match": p(g).isAdmin,
				"applied-item": x.value,
				onItemsLoaded: D,
				onSeeAll: $,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: T,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: T,
				onExploreData: p(w),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			(d(!0), l(me, null, Se(Ke.value, (e) => (d(), s(ae, {
				key: e.id,
				row: e,
				"api-base": p(u),
				"can-match": p(g).isAdmin,
				"applied-item": x.value,
				onItemsLoaded: D,
				onSeeAll: $,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: T,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: T,
				onExploreData: p(w),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			lt.value ? (d(), l("div", Me, [_e(ne, { label: "Loading libraries" })])) : c("", !0),
			p(m).error ? (d(), s(se, {
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
			}, 8, ["title", "description"])) : ct.value ? (d(), s(se, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : c("", !0),
			p(g).isAdmin ? (d(), s(ce, {
				key: 8,
				modelValue: b.value,
				"onUpdate:modelValue": t[0] ||= (e) => b.value = e,
				item: y.value,
				onApplied: We
			}, null, 8, ["modelValue", "item"])) : c("", !0),
			p(g).isAdmin ? (d(), s(le, {
				key: 9,
				modelValue: S.value,
				"onUpdate:modelValue": t[1] ||= (e) => S.value = e,
				item: He.value,
				onApplied: Ge
			}, null, 8, ["modelValue", "item"])) : c("", !0),
			p(g).isAdmin ? (d(), s(ue, {
				key: 10,
				modelValue: p(C),
				"onUpdate:modelValue": t[2] ||= (e) => ye(C) ? C.value = e : null,
				item: p(Ue)
			}, null, 8, ["modelValue", "item"])) : c("", !0)
		]));
	}
}), [["__scopeId", "data-v-17b71d91"]]);
//#endregion
export { Le as default };

//# sourceMappingURL=BrowsePage-CB4iaDW1.js.map