import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-cUL8r-1I.js";
import { n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-CJrazXSP.js";
import { n as i, o as ee } from "./LoveButton-Cfe3jzXL.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./useLibrariesStore-Bpp1SwfJ.js";
import { t as o } from "./Button-k7aQagzg.js";
import { i as ne, t as re } from "./MetadataMatchModal-CQ_WXyf-.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as c } from "./MediaRow-ZKHK4yir.js";
import { t as l } from "./HomeRow-CvDbkErK.js";
import { n as ie } from "./useResolvePlayable-CDFCMfKq.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ae, onMounted as oe, openBlock as y, reactive as se, ref as b, renderList as x, renderSlot as ce, unref as S, watch as C, withCtx as w } from "vue";
import { useRouter as T } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var le = { class: "browse-page" }, ue = { class: "browse-toolbar" }, de = {
	key: 2,
	class: "browse-loading"
}, fe = 24, E = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "BrowsePage",
	setup(e) {
		let v = n(), E = ae("phlixConfig", null), pe = d(() => E?.homeRows ?? []), D = a(), O = ee(), k = te(), A = r(), j = i(), M = T(), N = b(null), P = b(!1), F = b(null);
		function I(e) {
			N.value = e, P.value = !0;
		}
		function L(e) {
			z.set(e.id, e), F.value = { ...e }, k.success(`Updated metadata for "${e.name}"`);
		}
		let R = d(() => D.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), z = se(/* @__PURE__ */ new Map());
		function B(e) {
			e.forEach((e) => z.set(e.id, e));
		}
		let V = d(() => {
			let e = O.resumeMap;
			return Object.keys(e).map((e) => z.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), H = b([]), U = b(!1), W = b(null), G = null;
		function me(e) {
			return G ? G.setBaseUrl(e) : G = new t({ baseUrl: e }), G;
		}
		async function K() {
			if (!U.value) {
				U.value = !0, W.value = null;
				try {
					let { items: e } = await me(v.value).listFavorites({ limit: fe });
					H.value = e, e.forEach((e) => j.hydrate(e)), B(e);
				} catch (e) {
					W.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					U.value = !1;
				}
			}
		}
		let he = d(() => {
			let e = [];
			return j.entries.forEach((t, n) => {
				t.favorite && e.push(n);
			}), e.sort().join(",");
		}), ge = d(() => !U.value && !W.value && H.value.length > 0);
		function q() {
			D.load(v.value, !0), K();
		}
		oe(() => {
			D.load(v.value), K();
		}), C(v, q), C(he, () => {
			K();
		});
		let _e = d(() => D.loaded && D.items.length === 0 && !D.error), ve = d(() => D.loading && D.items.length === 0 && !D.error);
		function J(e, t) {
			M?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		let Y = null;
		function ye(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function X(e) {
			Y?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Y = n;
			let r = () => n !== Y;
			try {
				let i = await ie(new t({ baseUrl: v.value }), v.value, e, O.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					k.info("Nothing to play yet");
					return;
				}
				J("player", i.id);
			} catch (e) {
				if (r() || ye(e)) return;
				k.info("Nothing to play yet");
			}
		}
		function Z(e) {
			j.isFavorite(e.id) ? k.success(`Added "${e.name}" to your favorites`) : k.info(`Removed "${e.name}" from your favorites`);
		}
		function Q(e) {
			M?.hasRoute("media") ? J("media", e.id) : k.info(`Details for "${e.name}" are coming soon`);
		}
		function $(e) {
			let t = e.query?.libraryId;
			t && M?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (y(), m("div", le, [
			h("div", ue, [ce(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			V.value.length ? (y(), f(c, {
				key: 0,
				title: "Continue Watching",
				items: V.value,
				"can-match": S(A).isAdmin,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: I
			}, null, 8, ["items", "can-match"])) : p("", !0),
			ge.value ? (y(), f(c, {
				key: 1,
				title: "Favorites",
				items: H.value,
				"can-match": S(A).isAdmin,
				"hide-when-empty": "",
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: I
			}, null, 8, ["items", "can-match"])) : p("", !0),
			(y(!0), m(u, null, x(pe.value, (e) => (y(), f(l, {
				key: e.id,
				row: e,
				"api-base": S(v),
				"show-see-all": !!e.query?.libraryId,
				"can-match": S(A).isAdmin,
				"applied-item": F.value,
				onItemsLoaded: B,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: I
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item"
			]))), 128)),
			(y(!0), m(u, null, x(R.value, (e) => (y(), f(l, {
				key: e.id,
				row: e,
				"api-base": S(v),
				"can-match": S(A).isAdmin,
				"applied-item": F.value,
				onItemsLoaded: B,
				onSeeAll: $,
				onPlay: X,
				onWatchlist: Z,
				onInfo: Q,
				onMatch: I
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item"
			]))), 128)),
			ve.value ? (y(), m("div", de, [_(ne, { label: "Loading libraries" })])) : p("", !0),
			S(D).error ? (y(), f(s, {
				key: 3,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: S(D).error
			}, {
				actions: w(() => [_(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: q
				}, {
					default: w(() => [...t[1] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : _e.value ? (y(), f(s, {
				key: 4,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : p("", !0),
			S(A).isAdmin ? (y(), f(re, {
				key: 5,
				modelValue: P.value,
				"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
				item: N.value,
				onApplied: L
			}, null, 8, ["modelValue", "item"])) : p("", !0)
		]));
	}
}), [["__scopeId", "data-v-2c794898"]]);
//#endregion
export { E as default };

//# sourceMappingURL=BrowsePage-e9v629Mv.js.map