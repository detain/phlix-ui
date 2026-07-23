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
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as me, createTextVNode as he, createVNode as ge, defineComponent as d, inject as _e, isRef as ve, onMounted as ye, openBlock as f, reactive as be, ref as p, renderList as xe, renderSlot as Se, unref as m, watch as Ce, withCtx as h } from "vue";
import { useRouter as we } from "vue-router";
//#region src/api/mostWatched.ts
async function Te(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/pages/browseErrors.ts
function Ee(e, t) {
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
var De = { class: "browse-page" }, Oe = { class: "browse-toolbar" }, ke = {
	key: 4,
	class: "browse-loading"
}, Ae = 24, je = 20, Me = 20, g = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "BrowsePage",
	setup(e) {
		let d = n(), g = _e("phlixConfig", null), Ne = s(() => g?.homeRows ?? []), _ = re(), v = i(), y = ee(), b = r(), x = te(), S = we(), { syncResume: Pe, continueWatchingItems: Fe } = ie(), C = p(null), w = p(!1), T = p(null), E = p(!1), D = p(null), { inspectorItem: Ie, inspectorOpen: O, openInspector: k } = de();
		function A(e) {
			C.value = e, w.value = !0;
		}
		function Le(e) {
			j.set(e.id, e), T.value = { ...e }, y.success(`Updated metadata for "${e.name}"`);
		}
		function Re(e) {
			j.set(e.id, e), T.value = { ...e }, y.success(`Updated poster for "${e.name}"`);
		}
		let ze = s(() => _.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), j = be(/* @__PURE__ */ new Map());
		function M(e) {
			e.forEach((e) => j.set(e.id, e));
		}
		let Be = s(() => {
			let e = v.resumeMap;
			return Fe.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), N = p([]), P = p(!1), F = p(null), I = null;
		function Ve(e) {
			return I ? I.setBaseUrl(e) : I = new t({ baseUrl: e }), I;
		}
		async function He() {
			if (!P.value) {
				P.value = !0, F.value = null;
				try {
					let { items: e } = await Ve(d.value).listFavorites({ limit: Ae });
					N.value = e, e.forEach((e) => x.hydrate(e)), M(e);
				} catch (e) {
					F.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					P.value = !1;
				}
			}
		}
		let Ue = s(() => !P.value && !F.value && N.value.length > 0), L = p([]), R = p(!1), z = p(null), B = null;
		function We(e) {
			return B ? B.setBaseUrl(e) : B = new t({ baseUrl: e }), B;
		}
		async function Ge() {
			if (!R.value) {
				R.value = !0, z.value = null;
				try {
					let e = await fe(We(d.value), { limit: je });
					L.value = e, M(e);
				} catch (e) {
					z.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					R.value = !1;
				}
			}
		}
		let Ke = s(() => !R.value && !z.value && L.value.length > 0), V = p([]), H = p(!1), U = p(null), W = null;
		function qe(e) {
			return W ? W.setBaseUrl(e) : W = new t({ baseUrl: e }), W;
		}
		async function Je() {
			if (!H.value) {
				H.value = !0, U.value = null;
				try {
					let e = await Te(qe(d.value), { limit: Me });
					V.value = e, M(e);
				} catch (e) {
					U.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					H.value = !1;
				}
			}
		}
		let Ye = s(() => !H.value && !U.value && V.value.length > 0);
		function Xe() {
			_.load(d.value, !0), He(), Ge(), Je();
		}
		ye(() => {
			_.load(d.value), He(), Ge(), Je(), Pe();
		}), Ce(d, Xe);
		let Ze = s(() => Ee(_.errorCode ?? null, _.error ?? "")), Qe = s(() => _.loaded && _.items.length === 0 && !_.error), $e = s(() => _.loading && _.items.length === 0 && !_.error);
		function et(e, t) {
			S?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let G = null;
		function tt(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			G?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			G = n;
			let r = () => n !== G;
			try {
				let i = await pe(new t({ baseUrl: d.value }), d.value, e, v.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					y.info("Nothing to play yet");
					return;
				}
				et("player", i.id);
			} catch (e) {
				if (r() || tt(e)) return;
				y.info("Nothing to play yet");
			}
		}
		function q(e) {
			x.isFavorite(e.id) ? (y.success(`Added "${e.name}" to your favorites`), N.value.some((t) => t.id === e.id) || (N.value = [...N.value, e])) : (y.info(`Removed "${e.name}" from your favorites`), N.value = N.value.filter((t) => t.id !== e.id));
		}
		function J(e) {
			S?.hasRoute("media") ? et("media", e.id) : y.info(`Details for "${e.name}" are coming soon`);
		}
		function Y(e) {
			x.isWatched(e.id) ? y.success(`Marked "${e.name}" as watched`) : y.info(`Marked "${e.name}" as unwatched`);
		}
		function X(e) {
			C.value = e, w.value = !0;
		}
		function Z(e) {
			D.value = e, E.value = !0;
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
				N.value = N.value.filter((t) => t.id !== e.id), j.delete(e.id), y.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || tt(t)) return;
				y.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function nt(e) {
			let t = e.query?.libraryId;
			t && S?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (f(), u("div", De, [
			me("div", Oe, [Se(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			Be.value.length ? (f(), c(a, {
				key: 0,
				title: "Continue Watching",
				items: Be.value,
				"can-match": m(b).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: A,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: A,
				onExploreData: m(k),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			Ue.value ? (f(), c(a, {
				key: 1,
				title: "My List",
				items: N.value,
				"can-match": m(b).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: A,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: A,
				onExploreData: m(k),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			Ke.value ? (f(), c(a, {
				key: 2,
				title: "Recommended",
				items: L.value,
				"can-match": m(b).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: A,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: A,
				onExploreData: m(k),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			Ye.value ? (f(), c(a, {
				key: 3,
				title: "Most Watched",
				items: V.value,
				"can-match": m(b).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: A,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: A,
				onExploreData: m(k),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : l("", !0),
			(f(!0), u(o, null, xe(Ne.value, (e) => (f(), c(ae, {
				key: e.id,
				row: e,
				"api-base": m(d),
				"show-see-all": !!e.query?.libraryId,
				"can-match": m(b).isAdmin,
				"applied-item": T.value,
				onItemsLoaded: M,
				onSeeAll: nt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: A,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: A,
				onExploreData: m(k),
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
			(f(!0), u(o, null, xe(ze.value, (e) => (f(), c(ae, {
				key: e.id,
				row: e,
				"api-base": m(d),
				"can-match": m(b).isAdmin,
				"applied-item": T.value,
				onItemsLoaded: M,
				onSeeAll: nt,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: A,
				onMarkWatched: Y,
				onRefresh: X,
				onEditMetadata: A,
				onExploreData: m(k),
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			$e.value ? (f(), u("div", ke, [ge(ne, { label: "Loading libraries" })])) : l("", !0),
			m(_).error ? (f(), c(se, {
				key: 5,
				icon: "alert",
				title: Ze.value.title,
				description: Ze.value.description
			}, {
				actions: h(() => [ge(oe, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Xe
				}, {
					default: h(() => [...t[3] ||= [he("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : Qe.value ? (f(), c(se, {
				key: 6,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : l("", !0),
			m(b).isAdmin ? (f(), c(ce, {
				key: 7,
				modelValue: w.value,
				"onUpdate:modelValue": t[0] ||= (e) => w.value = e,
				item: C.value,
				onApplied: Le
			}, null, 8, ["modelValue", "item"])) : l("", !0),
			m(b).isAdmin ? (f(), c(le, {
				key: 8,
				modelValue: E.value,
				"onUpdate:modelValue": t[1] ||= (e) => E.value = e,
				item: D.value,
				onApplied: Re
			}, null, 8, ["modelValue", "item"])) : l("", !0),
			m(b).isAdmin ? (f(), c(ue, {
				key: 9,
				modelValue: m(O),
				"onUpdate:modelValue": t[2] ||= (e) => ve(O) ? O.value = e : null,
				item: m(Ie)
			}, null, 8, ["modelValue", "item"])) : l("", !0)
		]));
	}
}), [["__scopeId", "data-v-268a1a09"]]);
//#endregion
export { g as default };

//# sourceMappingURL=BrowsePage-LVJ2p1Z3.js.map