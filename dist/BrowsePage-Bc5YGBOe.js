import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-D1nDQ0cP.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-C_Rnq3Bo.js";
import { i } from "./usePlayerStore-fCCh6mOw.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { n as te } from "./ThumbRating-Db3pVsxe.js";
import { t as ne } from "./Spinner-D1bwTvld.js";
import { t as re } from "./useLibrariesStore-B4M08nqy.js";
import { n as ie, t as a } from "./HomeRow-CrdyiISF.js";
import { t as ae } from "./Button-DGsvHynO.js";
import { t as o } from "./EmptyState-CfyGawh7.js";
import { t as s } from "./MediaRow-YhbMWVqR.js";
import { t as oe } from "./MetadataMatchModal-BEmu4JF_.js";
import { t as se } from "./PosterPicker-C-nIEDRa.js";
import { r as ce } from "./useResolvePlayable-wCiMWuME.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as le, createTextVNode as ue, createVNode as p, defineComponent as m, inject as de, onMounted as fe, openBlock as h, reactive as pe, ref as g, renderList as _, renderSlot as me, unref as v, watch as he, withCtx as y } from "vue";
import { useRouter as ge } from "vue-router";
//#region src/pages/browseErrors.ts
function _e(e, t) {
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
var ve = { class: "browse-page" }, ye = { class: "browse-toolbar" }, be = {
	key: 2,
	class: "browse-loading"
}, xe = 24, b = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "BrowsePage",
	setup(e) {
		let m = n(), b = de("phlixConfig", null), Se = l(() => b?.homeRows ?? []), x = re(), S = i(), C = ee(), w = r(), T = te(), E = ge(), { syncResume: Ce, continueWatchingItems: we } = ie(), D = g(null), O = g(!1), k = g(null), A = g(!1), j = g(null);
		function M(e) {
			D.value = e, O.value = !0;
		}
		function Te(e) {
			N.set(e.id, e), k.value = { ...e }, C.success(`Updated metadata for "${e.name}"`);
		}
		function Ee(e) {
			N.set(e.id, e), k.value = { ...e }, C.success(`Updated poster for "${e.name}"`);
		}
		let De = l(() => x.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), N = pe(/* @__PURE__ */ new Map());
		function P(e) {
			e.forEach((e) => N.set(e.id, e));
		}
		let F = l(() => {
			let e = S.resumeMap;
			return we.value.filter((t) => (e[t.id] ?? 0) > 0).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), I = g([]), L = g(!1), R = g(null), z = null;
		function Oe(e) {
			return z ? z.setBaseUrl(e) : z = new t({ baseUrl: e }), z;
		}
		async function B() {
			if (!L.value) {
				L.value = !0, R.value = null;
				try {
					let { items: e } = await Oe(m.value).listFavorites({ limit: xe });
					I.value = e, e.forEach((e) => T.hydrate(e)), P(e);
				} catch (e) {
					R.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					L.value = !1;
				}
			}
		}
		let ke = l(() => !L.value && !R.value && I.value.length > 0);
		function V() {
			x.load(m.value, !0), B();
		}
		fe(() => {
			x.load(m.value), B(), Ce();
		}), he(m, V);
		let H = l(() => _e(x.errorCode ?? null, x.error ?? "")), Ae = l(() => x.loaded && x.items.length === 0 && !x.error), je = l(() => x.loading && x.items.length === 0 && !x.error);
		function U(e, t) {
			E?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let W = null;
		function G(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function K(e) {
			W?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			W = n;
			let r = () => n !== W;
			try {
				let i = await ce(new t({ baseUrl: m.value }), m.value, e, S.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					C.info("Nothing to play yet");
					return;
				}
				U("player", i.id);
			} catch (e) {
				if (r() || G(e)) return;
				C.info("Nothing to play yet");
			}
		}
		function q(e) {
			T.isFavorite(e.id) ? (C.success(`Added "${e.name}" to your favorites`), I.value.some((t) => t.id === e.id) || (I.value = [...I.value, e])) : (C.info(`Removed "${e.name}" from your favorites`), I.value = I.value.filter((t) => t.id !== e.id));
		}
		function J(e) {
			E?.hasRoute("media") ? U("media", e.id) : C.info(`Details for "${e.name}" are coming soon`);
		}
		function Y(e) {
			T.isWatched(e.id) ? C.success(`Marked "${e.name}" as watched`) : C.info(`Marked "${e.name}" as unwatched`);
		}
		function X(e) {
			D.value = e, O.value = !0;
		}
		function Z(e) {
			j.value = e, A.value = !0;
		}
		let Q = null;
		async function $(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Q?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Q = n;
			let r = () => n !== Q;
			try {
				if (await new t({ baseUrl: m.value }).deleteMediaItem(e.id), r()) return;
				I.value = I.value.filter((t) => t.id !== e.id), N.delete(e.id), C.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || G(t)) return;
				C.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function Me(e) {
			let t = e.query?.libraryId;
			t && E?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (h(), f("div", ve, [
			le("div", ye, [me(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			F.value.length ? (h(), u(s, {
				key: 0,
				title: "Continue Watching",
				items: F.value,
				"can-match": v(w).isAdmin,
				"hide-when-empty": "",
				"fetch-priority": "high",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: M,
				onMarkWatched: Y,
				onRefresh: X,
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, ["items", "can-match"])) : d("", !0),
			ke.value ? (h(), u(s, {
				key: 1,
				title: "Favorites",
				items: I.value,
				"can-match": v(w).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: M,
				onMarkWatched: Y,
				onRefresh: X,
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, ["items", "can-match"])) : d("", !0),
			(h(!0), f(c, null, _(Se.value, (e) => (h(), u(a, {
				key: e.id,
				row: e,
				"api-base": v(m),
				"show-see-all": !!e.query?.libraryId,
				"can-match": v(w).isAdmin,
				"applied-item": k.value,
				onItemsLoaded: P,
				onSeeAll: Me,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: M,
				onMarkWatched: Y,
				onRefresh: X,
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item"
			]))), 128)),
			(h(!0), f(c, null, _(De.value, (e) => (h(), u(a, {
				key: e.id,
				row: e,
				"api-base": v(m),
				"can-match": v(w).isAdmin,
				"applied-item": k.value,
				onItemsLoaded: P,
				onSeeAll: Me,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: M,
				onMarkWatched: Y,
				onRefresh: X,
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item"
			]))), 128)),
			je.value ? (h(), f("div", be, [p(ne, { label: "Loading libraries" })])) : d("", !0),
			v(x).error ? (h(), u(o, {
				key: 3,
				icon: "alert",
				title: H.value.title,
				description: H.value.description
			}, {
				actions: y(() => [p(ae, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: V
				}, {
					default: y(() => [...t[2] ||= [ue("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : Ae.value ? (h(), u(o, {
				key: 4,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : d("", !0),
			v(w).isAdmin ? (h(), u(oe, {
				key: 5,
				modelValue: O.value,
				"onUpdate:modelValue": t[0] ||= (e) => O.value = e,
				item: D.value,
				onApplied: Te
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			v(w).isAdmin ? (h(), u(se, {
				key: 6,
				modelValue: A.value,
				"onUpdate:modelValue": t[1] ||= (e) => A.value = e,
				item: j.value,
				onApplied: Ee
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-6882d827"]]);
//#endregion
export { b as default };

//# sourceMappingURL=BrowsePage-Bc5YGBOe.js.map