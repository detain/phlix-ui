import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-CZc6ehUa.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-HphWxXcO.js";
import { n as i, o as ee } from "./LoveButton-DfujAYIy.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./useLibrariesStore-BpHZLr2g.js";
import { t as re } from "./Button-k7aQagzg.js";
import { o as ie, t as ae } from "./MetadataMatchModal-H5-IXqpz.js";
import { t as a } from "./EmptyState-B2QnGIQT.js";
import { t as o } from "./MediaRow-CL45ZoKl.js";
import { t as s } from "./HomeRow-DSadUi8k.js";
import { n as oe, r as se } from "./useResolvePlayable-DIIz32oI.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as ce, createTextVNode as le, createVNode as p, defineComponent as m, inject as ue, onMounted as de, openBlock as h, reactive as fe, ref as g, renderList as _, renderSlot as pe, unref as v, watch as y, withCtx as b } from "vue";
import { useRouter as me } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var he = { class: "browse-page" }, ge = { class: "browse-toolbar" }, _e = {
	key: 2,
	class: "browse-loading"
}, ve = 24, x = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "BrowsePage",
	setup(e) {
		let m = n(), x = ue("phlixConfig", null), ye = l(() => x?.homeRows ?? []), S = ne(), C = ee(), w = te(), T = r(), E = i(), D = me(), O = g(null), k = g(!1), A = g(null), j = g(!1), M = g(null);
		function N(e) {
			O.value = e, k.value = !0;
		}
		function be(e) {
			P.set(e.id, e), A.value = { ...e }, w.success(`Updated metadata for "${e.name}"`);
		}
		function xe(e) {
			P.set(e.id, e), A.value = { ...e }, w.success(`Updated poster for "${e.name}"`);
		}
		let Se = l(() => S.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), P = fe(/* @__PURE__ */ new Map());
		function F(e) {
			e.forEach((e) => P.set(e.id, e));
		}
		let I = l(() => {
			let e = C.resumeMap;
			return Object.keys(e).map((e) => P.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), L = g([]), R = g(!1), z = g(null), B = null;
		function Ce(e) {
			return B ? B.setBaseUrl(e) : B = new t({ baseUrl: e }), B;
		}
		async function V() {
			if (!R.value) {
				R.value = !0, z.value = null;
				try {
					let { items: e } = await Ce(m.value).listFavorites({ limit: ve });
					L.value = e, e.forEach((e) => E.hydrate(e)), F(e);
				} catch (e) {
					z.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					R.value = !1;
				}
			}
		}
		let we = l(() => {
			let e = [];
			return E.entries.forEach((t, n) => {
				t.favorite && e.push(n);
			}), e.sort().join(",");
		}), Te = l(() => !R.value && !z.value && L.value.length > 0);
		function H() {
			S.load(m.value, !0), V();
		}
		de(() => {
			S.load(m.value), V();
		}), y(m, H), y(we, () => {
			V();
		});
		let Ee = l(() => S.loaded && S.items.length === 0 && !S.error), De = l(() => S.loading && S.items.length === 0 && !S.error);
		function U(e, t) {
			D?.push({
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
				let i = await oe(new t({ baseUrl: m.value }), m.value, e, C.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					w.info("Nothing to play yet");
					return;
				}
				U("player", i.id);
			} catch (e) {
				if (r() || G(e)) return;
				w.info("Nothing to play yet");
			}
		}
		function q(e) {
			E.isFavorite(e.id) ? w.success(`Added "${e.name}" to your favorites`) : w.info(`Removed "${e.name}" from your favorites`);
		}
		function J(e) {
			D?.hasRoute("media") ? U("media", e.id) : w.info(`Details for "${e.name}" are coming soon`);
		}
		function Y(e) {
			E.toggleFavorite(e.id, m.value), E.isFavorite(e.id) ? w.success(`Marked "${e.name}" as watched`) : w.info(`Marked "${e.name}" as unwatched`);
		}
		function X(e) {
			O.value = e, k.value = !0;
		}
		function Z(e) {
			M.value = e, j.value = !0;
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
				L.value = L.value.filter((t) => t.id !== e.id), P.delete(e.id), w.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || G(t)) return;
				w.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function Oe(e) {
			let t = e.query?.libraryId;
			t && D?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (h(), f("div", he, [
			ce("div", ge, [pe(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			I.value.length ? (h(), u(o, {
				key: 0,
				title: "Continue Watching",
				items: I.value,
				"can-match": v(T).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: N,
				onMarkWatched: Y,
				onRefresh: X,
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, ["items", "can-match"])) : d("", !0),
			Te.value ? (h(), u(o, {
				key: 1,
				title: "Favorites",
				items: L.value,
				"can-match": v(T).isAdmin,
				"hide-when-empty": "",
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: N,
				onMarkWatched: Y,
				onRefresh: X,
				onChoosePoster: Z,
				onRemove: $
			}, null, 8, ["items", "can-match"])) : d("", !0),
			(h(!0), f(c, null, _(ye.value, (e) => (h(), u(s, {
				key: e.id,
				row: e,
				"api-base": v(m),
				"show-see-all": !!e.query?.libraryId,
				"can-match": v(T).isAdmin,
				"applied-item": A.value,
				onItemsLoaded: F,
				onSeeAll: Oe,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: N,
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
			(h(!0), f(c, null, _(Se.value, (e) => (h(), u(s, {
				key: e.id,
				row: e,
				"api-base": v(m),
				"can-match": v(T).isAdmin,
				"applied-item": A.value,
				onItemsLoaded: F,
				onSeeAll: Oe,
				onPlay: K,
				onWatchlist: q,
				onInfo: J,
				onMatch: N,
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
			De.value ? (h(), f("div", _e, [p(ie, { label: "Loading libraries" })])) : d("", !0),
			v(S).error ? (h(), u(a, {
				key: 3,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: v(S).error
			}, {
				actions: b(() => [p(re, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: H
				}, {
					default: b(() => [...t[2] ||= [le("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Ee.value ? (h(), u(a, {
				key: 4,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : d("", !0),
			v(T).isAdmin ? (h(), u(ae, {
				key: 5,
				modelValue: k.value,
				"onUpdate:modelValue": t[0] ||= (e) => k.value = e,
				item: O.value,
				onApplied: be
			}, null, 8, ["modelValue", "item"])) : d("", !0),
			v(T).isAdmin ? (h(), u(se, {
				key: 6,
				modelValue: j.value,
				"onUpdate:modelValue": t[1] ||= (e) => j.value = e,
				item: M.value,
				onApplied: xe
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-24c3a135"]]);
//#endregion
export { x as default };

//# sourceMappingURL=BrowsePage-Jx74_UkW.js.map