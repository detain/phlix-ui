import { n as e } from "./Icon-CkTBN_k5.js";
import { t } from "./client-DA-5QZXw.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-vm6oniX7.js";
import { i } from "./usePlayerStore-DhgapSoa.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as ee } from "./ThumbRating-DTgQWbsu.js";
import { t as te } from "./Spinner-COUSlhgo.js";
import { t as ne } from "./useLibrariesStore-CbBW_uR6.js";
import { n as re, t as ie } from "./HomeRow-Cbn3Zlg6.js";
import { t as ae } from "./Button-Cw8Wl4QR.js";
import { t as oe } from "./EmptyState-CwWtkhEJ.js";
import { t as o } from "./MediaRow-CTAzQWUl.js";
import { t as se } from "./MetadataMatchModal-D-SLpTGq.js";
import { t as ce } from "./PosterPicker-C6eLSaIm.js";
import { n as le, t as ue } from "./useItemInspector-Cn3FRzeh.js";
import { t as de } from "./recommendations-DMDaEMq9.js";
import { r as fe } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as pe, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as me, createTextVNode as he, createVNode as ge, defineComponent as d, inject as _e, isRef as ve, onMounted as ye, openBlock as f, reactive as be, ref as p, renderList as xe, renderSlot as Se, unref as m, watch as Ce, withCtx as we } from "vue";
import { useRouter as Te } from "vue-router";
//#region src/api/mostWatched.ts
async function Ee(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/media/most-watched", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/api/nextUp.ts
async function De(e, t = {}, n) {
	let r = { limit: String(t.limit ?? 20) }, i = await e.get("/api/v1/users/me/next-up", r, n);
	return Array.isArray(i.items) ? i.items : [];
}
//#endregion
//#region src/pages/browseErrors.ts
function Oe(e, t) {
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
var ke = { class: "browse-page" }, Ae = { class: "browse-toolbar" }, je = {
	key: 5,
	class: "browse-loading"
}, Me = 20, Ne = 24, Pe = 20, Fe = 20, Ie = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "BrowsePage",
	setup(e) {
		let d = n(), Ie = _e("phlixConfig", null), Le = s(() => Ie?.homeRows ?? []), h = ne(), Re = i(), g = a(), _ = r(), v = ee(), y = Te(), { syncResume: ze, continueWatchingItems: Be } = re(), b = p(null), x = p(!1), S = p(null), C = p(!1), Ve = p(null), { inspectorItem: He, inspectorOpen: w, openInspector: T } = ue();
		function E(e) {
			b.value = e, x.value = !0;
		}
		function Ue(e) {
			D.set(e.id, e), S.value = { ...e }, g.success(`Updated metadata for "${e.name}"`);
		}
		function We(e) {
			D.set(e.id, e), S.value = { ...e }, g.success(`Updated poster for "${e.name}"`);
		}
		let Ge = s(() => h.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), D = be(/* @__PURE__ */ new Map());
		function O(e) {
			e.forEach((e) => D.set(e.id, e));
		}
		let Ke = s(() => {
			let e = Re.resumeMap;
			return Be.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), k = p([]), A = p(!1), j = p(null), M = null;
		function qe(e) {
			return M ? M.setBaseUrl(e) : M = new t({ baseUrl: e }), M;
		}
		async function Je() {
			if (!A.value) {
				A.value = !0, j.value = null;
				try {
					let e = await De(qe(d.value), { limit: Me });
					k.value = e, O(e);
				} catch (e) {
					j.value = e instanceof Error ? e.message : "Failed to load next up";
				} finally {
					A.value = !1;
				}
			}
		}
		let Ye = s(() => !A.value && !j.value && k.value.length > 0), N = p([]), P = p(!1), F = p(null), I = null;
		function Xe(e) {
			return I ? I.setBaseUrl(e) : I = new t({ baseUrl: e }), I;
		}
		async function Ze() {
			if (!P.value) {
				P.value = !0, F.value = null;
				try {
					let { items: e } = await Xe(d.value).listFavorites({ limit: Ne });
					N.value = e, e.forEach((e) => v.hydrate(e)), O(e);
				} catch (e) {
					F.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					P.value = !1;
				}
			}
		}
		let Qe = s(() => !P.value && !F.value && N.value.length > 0), L = p([]), R = p(!1), z = p(null), B = null;
		function $e(e) {
			return B ? B.setBaseUrl(e) : B = new t({ baseUrl: e }), B;
		}
		async function et() {
			if (!R.value) {
				R.value = !0, z.value = null;
				try {
					let e = await de($e(d.value), { limit: Pe });
					L.value = e, O(e);
				} catch (e) {
					z.value = e instanceof Error ? e.message : "Failed to load recommendations";
				} finally {
					R.value = !1;
				}
			}
		}
		let tt = s(() => !R.value && !z.value && L.value.length > 0), V = p([]), H = p(!1), U = p(null), W = null;
		function nt(e) {
			return W ? W.setBaseUrl(e) : W = new t({ baseUrl: e }), W;
		}
		async function rt() {
			if (!H.value) {
				H.value = !0, U.value = null;
				try {
					let e = await Ee(nt(d.value), { limit: Fe });
					V.value = e, O(e);
				} catch (e) {
					U.value = e instanceof Error ? e.message : "Failed to load most watched";
				} finally {
					H.value = !1;
				}
			}
		}
		let it = s(() => !H.value && !U.value && V.value.length > 0);
		function at() {
			h.load(d.value, !0), Ze(), Je(), et(), rt();
		}
		ye(() => {
			h.load(d.value), Ze(), Je(), et(), rt(), ze();
		}), Ce(d, at);
		let ot = s(() => Oe(h.errorCode ?? null, h.error ?? "")), st = s(() => h.loaded && h.items.length === 0 && !h.error), ct = s(() => h.loading && h.items.length === 0 && !h.error);
		function lt(e, t) {
			y?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let G = null;
		function ut(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			G?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			G = n;
			let r = () => n !== G;
			try {
				let i = new t({ baseUrl: d.value }), a = await fe(i, d.value, e, Re.resumeMap, n?.signal);
				if (r()) return;
				if (!a) {
					g.info("Nothing to play yet");
					return;
				}
				lt("player", a.id);
			} catch (e) {
				if (r() || ut(e)) return;
				g.info("Nothing to play yet");
			}
		}
		function q(e) {
			v.isFavorite(e.id) ? (g.success(`Added "${e.name}" to your favorites`), N.value.some((t) => t.id === e.id) || (N.value = [...N.value, e])) : (g.info(`Removed "${e.name}" from your favorites`), N.value = N.value.filter((t) => t.id !== e.id));
		}
		function J(e) {
			y?.hasRoute("media") ? lt("media", e.id) : g.info(`Details for "${e.name}" are coming soon`);
		}
		function Y(e) {
			v.isWatched(e.id) ? g.success(`Marked "${e.name}" as watched`) : g.info(`Marked "${e.name}" as unwatched`);
		}
		function X(e) {
			b.value = e, x.value = !0;
		}
		function Z(e) {
			Ve.value = e, C.value = !0;
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
				N.value = N.value.filter((t) => t.id !== e.id), D.delete(e.id), g.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || ut(t)) return;
				g.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function dt(e) {
			let t = e.query?.libraryId;
			t && y?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (f(), u("div", ke, [
			me("div", Ae, [Se(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			Ke.value.length ? (f(), c(o, {
				key: 0,
				title: "Continue Watching",
				items: Ke.value,
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
			Ye.value ? (f(), c(o, {
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
				items: N.value,
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
			tt.value ? (f(), c(o, {
				key: 3,
				title: "Recommended",
				items: L.value,
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
			it.value ? (f(), c(o, {
				key: 4,
				title: "Most Watched",
				items: V.value,
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
			(f(!0), u(pe, null, xe(Le.value, (e) => (f(), c(ie, {
				key: e.id,
				row: e,
				"api-base": m(d),
				"show-see-all": !!e.query?.libraryId,
				"can-match": m(_).isAdmin,
				"applied-item": S.value,
				onItemsLoaded: O,
				onSeeAll: dt,
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
			(f(!0), u(pe, null, xe(Ge.value, (e) => (f(), c(ie, {
				key: e.id,
				row: e,
				"api-base": m(d),
				"can-match": m(_).isAdmin,
				"applied-item": S.value,
				onItemsLoaded: O,
				onSeeAll: dt,
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
			ct.value ? (f(), u("div", je, [ge(te, { label: "Loading libraries" })])) : l("", !0),
			m(h).error ? (f(), c(oe, {
				key: 6,
				icon: "alert",
				title: ot.value.title,
				description: ot.value.description
			}, {
				actions: we(() => [ge(ae, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: at
				}, {
					default: we(() => [...t[3] ||= [he("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : st.value ? (f(), c(oe, {
				key: 7,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : l("", !0),
			m(_).isAdmin ? (f(), c(se, {
				key: 8,
				modelValue: x.value,
				"onUpdate:modelValue": t[0] ||= (e) => x.value = e,
				item: b.value,
				onApplied: Ue
			}, null, 8, ["modelValue", "item"])) : l("", !0),
			m(_).isAdmin ? (f(), c(ce, {
				key: 9,
				modelValue: C.value,
				"onUpdate:modelValue": t[1] ||= (e) => C.value = e,
				item: Ve.value,
				onApplied: We
			}, null, 8, ["modelValue", "item"])) : l("", !0),
			m(_).isAdmin ? (f(), c(le, {
				key: 10,
				modelValue: m(w),
				"onUpdate:modelValue": t[2] ||= (e) => ve(w) ? w.value = e : null,
				item: m(He)
			}, null, 8, ["modelValue", "item"])) : l("", !0)
		]));
	}
}), [["__scopeId", "data-v-17b71d91"]]);
//#endregion
export { Ie as default };

//# sourceMappingURL=BrowsePage-D6M2Vdiq.js.map