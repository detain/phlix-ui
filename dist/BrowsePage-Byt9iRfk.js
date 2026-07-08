import { n as e } from "./Icon-24ngwBUH.js";
import { t } from "./client-fw74f3l_.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-CUoTkm_k.js";
import { n as i, o as ee } from "./ThumbRating-CEhvLFWq.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./useLibrariesStore-alvdv0Y4.js";
import { t as re } from "./Button-CInT03Lp.js";
import { s as ie, t as ae } from "./MetadataMatchModal-Dhi7nqvl.js";
import { t as a } from "./EmptyState-0XgHKEGf.js";
import { t as o } from "./MediaRow--IE9SzaR.js";
import { t as s } from "./HomeRow-CHTo8WGi.js";
import { n as oe, r as se } from "./useResolvePlayable-BgFWuAVd.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as ce, createTextVNode as le, createVNode as p, defineComponent as m, inject as ue, onMounted as de, openBlock as h, reactive as fe, ref as g, renderList as pe, renderSlot as me, unref as _, watch as v, withCtx as y } from "vue";
import { useRouter as he } from "vue-router";
//#region src/pages/browseErrors.ts
function ge(e, t) {
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
var _e = { class: "browse-page" }, ve = { class: "browse-toolbar" }, ye = {
	key: 2,
	class: "browse-loading"
}, be = 24, b = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "BrowsePage",
	setup(e) {
		let m = n(), b = ue("phlixConfig", null), xe = l(() => b?.homeRows ?? []), x = ne(), S = ee(), C = te(), w = r(), T = i(), E = he(), D = g(null), O = g(!1), k = g(null), A = g(!1), j = g(null);
		function M(e) {
			D.value = e, O.value = !0;
		}
		function Se(e) {
			N.set(e.id, e), k.value = { ...e }, C.success(`Updated metadata for "${e.name}"`);
		}
		function Ce(e) {
			N.set(e.id, e), k.value = { ...e }, C.success(`Updated poster for "${e.name}"`);
		}
		let we = l(() => x.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), N = fe(/* @__PURE__ */ new Map());
		function P(e) {
			e.forEach((e) => N.set(e.id, e));
		}
		let F = l(() => {
			let e = S.resumeMap;
			return Object.keys(e).map((e) => N.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), I = g([]), L = g(!1), R = g(null), z = null;
		function Te(e) {
			return z ? z.setBaseUrl(e) : z = new t({ baseUrl: e }), z;
		}
		async function B() {
			if (!L.value) {
				L.value = !0, R.value = null;
				try {
					let { items: e } = await Te(m.value).listFavorites({ limit: be });
					I.value = e, e.forEach((e) => T.hydrate(e)), P(e);
				} catch (e) {
					R.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					L.value = !1;
				}
			}
		}
		let Ee = l(() => {
			let e = [];
			return T.entries.forEach((t, n) => {
				t.favorite && e.push(n);
			}), e.sort().join(",");
		}), De = l(() => !L.value && !R.value && I.value.length > 0);
		function V() {
			x.load(m.value, !0), B();
		}
		de(() => {
			x.load(m.value), B();
		}), v(m, V), v(Ee, () => {
			B();
		});
		let H = l(() => ge(x.errorCode ?? null, x.error ?? "")), Oe = l(() => x.loaded && x.items.length === 0 && !x.error), ke = l(() => x.loading && x.items.length === 0 && !x.error);
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
				let i = await oe(new t({ baseUrl: m.value }), m.value, e, S.resumeMap, n?.signal);
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
			T.isFavorite(e.id) ? C.success(`Added "${e.name}" to your favorites`) : C.info(`Removed "${e.name}" from your favorites`);
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
		function Ae(e) {
			let t = e.query?.libraryId;
			t && E?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (h(), f("div", _e, [
			ce("div", ve, [me(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			F.value.length ? (h(), u(o, {
				key: 0,
				title: "Continue Watching",
				items: F.value,
				"can-match": _(w).isAdmin,
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
			De.value ? (h(), u(o, {
				key: 1,
				title: "Favorites",
				items: I.value,
				"can-match": _(w).isAdmin,
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
			(h(!0), f(c, null, pe(xe.value, (e) => (h(), u(s, {
				key: e.id,
				row: e,
				"api-base": _(m),
				"show-see-all": !!e.query?.libraryId,
				"can-match": _(w).isAdmin,
				"applied-item": k.value,
				onItemsLoaded: P,
				onSeeAll: Ae,
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
			(h(!0), f(c, null, pe(we.value, (e) => (h(), u(s, {
				key: e.id,
				row: e,
				"api-base": _(m),
				"can-match": _(w).isAdmin,
				"applied-item": k.value,
				onItemsLoaded: P,
				onSeeAll: Ae,
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
			ke.value ? (h(), f("div", ye, [p(ie, { label: "Loading libraries" })])) : d("", !0),
			_(x).error ? (h(), u(a, {
				key: 3,
				icon: "alert",
				title: H.value.title,
				description: H.value.description
			}, {
				actions: y(() => [p(re, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: V
				}, {
					default: y(() => [...t[2] ||= [le("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["title", "description"])) : Oe.value ? (h(), u(a, {
				key: 4,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : d("", !0),
			_(w).isAdmin ? (h(), u(ae, {
				key: 5,
				modelValue: O.value,
				"onUpdate:modelValue": t[0] ||= (e) => O.value = e,
				item: D.value,
				onApplied: Se
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			_(w).isAdmin ? (h(), u(se, {
				key: 6,
				modelValue: A.value,
				"onUpdate:modelValue": t[1] ||= (e) => A.value = e,
				item: j.value,
				onApplied: Ce
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-ed625a49"]]);
//#endregion
export { b as default };

//# sourceMappingURL=BrowsePage-Byt9iRfk.js.map