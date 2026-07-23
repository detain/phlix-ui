import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-BzWwyWKr.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-Ds0NVhBP.js";
import { i } from "./usePlayerStore-Dgw0JCWb.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as te } from "./ThumbRating-BxiWuYAs.js";
import { t as ne } from "./Spinner-C4utUvmQ.js";
import { t as re } from "./useLibrariesStore-tTV4T4xY.js";
import { n as ie, t as a } from "./HomeRow-BrfHXHfb.js";
import { t as ae } from "./Button-DWa6Ld_Z.js";
import { t as oe } from "./EmptyState-ZlI5t4KT.js";
import { t as o } from "./MediaRow-DNs2cM-C.js";
import { t as se } from "./MetadataMatchModal-BbaA7xKl.js";
import { t as ce } from "./PosterPicker-C5hu8ehM.js";
import { n as le, t as ue } from "./useItemInspector-BTx_gnEr.js";
import { r as de } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as fe, createTextVNode as pe, createVNode as f, defineComponent as p, inject as me, isRef as he, onMounted as ge, openBlock as m, reactive as _e, ref as h, renderList as ve, renderSlot as ye, unref as g, watch as be, withCtx as xe } from "vue";
import { useRouter as Se } from "vue-router";
//#region src/pages/browseErrors.ts
function Ce(e, t) {
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
var we = { class: "browse-page" }, Te = { class: "browse-toolbar" }, Ee = {
	key: 2,
	class: "browse-loading"
}, De = 24, _ = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "BrowsePage",
	setup(e) {
		let p = n(), _ = me("phlixConfig", null), Oe = c(() => _?.homeRows ?? []), v = re(), y = i(), b = ee(), x = r(), S = te(), C = Se(), { syncResume: ke, continueWatchingItems: Ae } = ie(), w = h(null), T = h(!1), E = h(null), D = h(!1), O = h(null), { inspectorItem: je, inspectorOpen: k, openInspector: A } = ue();
		function j(e) {
			w.value = e, T.value = !0;
		}
		function Me(e) {
			M.set(e.id, e), E.value = { ...e }, b.success(`Updated metadata for "${e.name}"`);
		}
		function Ne(e) {
			M.set(e.id, e), E.value = { ...e }, b.success(`Updated poster for "${e.name}"`);
		}
		let Pe = c(() => v.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), M = _e(/* @__PURE__ */ new Map());
		function N(e) {
			e.forEach((e) => M.set(e.id, e));
		}
		let P = c(() => {
			let e = y.resumeMap;
			return Ae.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), F = h([]), I = h(!1), L = h(null), R = null;
		function Fe(e) {
			return R ? R.setBaseUrl(e) : R = new t({ baseUrl: e }), R;
		}
		async function z() {
			if (!I.value) {
				I.value = !0, L.value = null;
				try {
					let { items: e } = await Fe(p.value).listFavorites({ limit: De });
					F.value = e, e.forEach((e) => S.hydrate(e)), N(e);
				} catch (e) {
					L.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					I.value = !1;
				}
			}
		}
		let Ie = c(() => !I.value && !L.value && F.value.length > 0);
		function B() {
			v.load(p.value, !0), z();
		}
		ge(() => {
			v.load(p.value), z(), ke();
		}), be(p, B);
		let V = c(() => Ce(v.errorCode ?? null, v.error ?? "")), Le = c(() => v.loaded && v.items.length === 0 && !v.error), Re = c(() => v.loading && v.items.length === 0 && !v.error);
		function H(e, t) {
			C?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let U = null;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e) {
			U?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			U = n;
			let r = () => n !== U;
			try {
				let i = await de(new t({ baseUrl: p.value }), p.value, e, y.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					b.info("Nothing to play yet");
					return;
				}
				H("player", i.id);
			} catch (e) {
				if (r() || W(e)) return;
				b.info("Nothing to play yet");
			}
		}
		function K(e) {
			S.isFavorite(e.id) ? (b.success(`Added "${e.name}" to your favorites`), F.value.some((t) => t.id === e.id) || (F.value = [...F.value, e])) : (b.info(`Removed "${e.name}" from your favorites`), F.value = F.value.filter((t) => t.id !== e.id));
		}
		function q(e) {
			C?.hasRoute("media") ? H("media", e.id) : b.info(`Details for "${e.name}" are coming soon`);
		}
		function J(e) {
			S.isWatched(e.id) ? b.success(`Marked "${e.name}" as watched`) : b.info(`Marked "${e.name}" as unwatched`);
		}
		function Y(e) {
			w.value = e, T.value = !0;
		}
		function X(e) {
			O.value = e, D.value = !0;
		}
		let Z = null;
		async function Q(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Z?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Z = n;
			let r = () => n !== Z;
			try {
				if (await new t({ baseUrl: p.value }).deleteMediaItem(e.id), r()) return;
				F.value = F.value.filter((t) => t.id !== e.id), M.delete(e.id), b.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || W(t)) return;
				b.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function $(e) {
			let t = e.query?.libraryId;
			t && C?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (m(), d("div", we, [
			fe("div", Te, [ye(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			P.value.length ? (m(), l(o, {
				key: 0,
				title: "Continue Watching",
				items: P.value,
				"can-match": g(x).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: j,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: j,
				onExploreData: g(A),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			Ie.value ? (m(), l(o, {
				key: 1,
				title: "My List",
				items: F.value,
				"can-match": g(x).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: j,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: j,
				onExploreData: g(A),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"items",
				"can-match",
				"onExploreData"
			])) : u("", !0),
			(m(!0), d(s, null, ve(Oe.value, (e) => (m(), l(a, {
				key: e.id,
				row: e,
				"api-base": g(p),
				"show-see-all": !!e.query?.libraryId,
				"can-match": g(x).isAdmin,
				"applied-item": E.value,
				onItemsLoaded: N,
				onSeeAll: $,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: j,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: j,
				onExploreData: g(A),
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
			(m(!0), d(s, null, ve(Pe.value, (e) => (m(), l(a, {
				key: e.id,
				row: e,
				"api-base": g(p),
				"can-match": g(x).isAdmin,
				"applied-item": E.value,
				onItemsLoaded: N,
				onSeeAll: $,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: j,
				onMarkWatched: J,
				onRefresh: Y,
				onEditMetadata: j,
				onExploreData: g(A),
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item",
				"onExploreData"
			]))), 128)),
			Re.value ? (m(), d("div", Ee, [f(ne, { label: "Loading libraries" })])) : u("", !0),
			g(v).error ? (m(), l(oe, {
				key: 3,
				icon: "alert",
				title: V.value.title,
				description: V.value.description
			}, {
				actions: xe(() => [f(ae, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: B
				}, {
					default: xe(() => [...t[3] ||= [pe("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : Le.value ? (m(), l(oe, {
				key: 4,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : u("", !0),
			g(x).isAdmin ? (m(), l(se, {
				key: 5,
				modelValue: T.value,
				"onUpdate:modelValue": t[0] ||= (e) => T.value = e,
				item: w.value,
				onApplied: Me
			}, null, 8, ["modelValue", "item"])) : u("", !0),
			g(x).isAdmin ? (m(), l(ce, {
				key: 6,
				modelValue: D.value,
				"onUpdate:modelValue": t[1] ||= (e) => D.value = e,
				item: O.value,
				onApplied: Ne
			}, null, 8, ["modelValue", "item"])) : u("", !0),
			g(x).isAdmin ? (m(), l(le, {
				key: 7,
				modelValue: g(k),
				"onUpdate:modelValue": t[2] ||= (e) => he(k) ? k.value = e : null,
				item: g(je)
			}, null, 8, ["modelValue", "item"])) : u("", !0)
		]));
	}
}), [["__scopeId", "data-v-73523f9f"]]);
//#endregion
export { _ as default };

//# sourceMappingURL=BrowsePage-Ciq1F4Id.js.map