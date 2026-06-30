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
import { n as oe } from "./useResolvePlayable-CDFCMfKq.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as se, createTextVNode as ce, createVNode as p, defineComponent as m, inject as le, onMounted as ue, openBlock as h, reactive as de, ref as g, renderList as _, renderSlot as fe, unref as v, watch as y, withCtx as b } from "vue";
import { useRouter as pe } from "vue-router";
//#region src/pages/BrowsePage.vue?vue&type=script&setup=true&lang.ts
var x = { class: "browse-page" }, me = { class: "browse-toolbar" }, he = {
	key: 2,
	class: "browse-loading"
}, ge = 24, S = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "BrowsePage",
	setup(e) {
		let m = n(), S = le("phlixConfig", null), _e = l(() => S?.homeRows ?? []), C = ne(), w = ee(), T = te(), E = r(), D = i(), O = pe(), k = g(null), A = g(!1), j = g(null);
		function M(e) {
			k.value = e, A.value = !0;
		}
		function ve(e) {
			N.set(e.id, e), j.value = { ...e }, T.success(`Updated metadata for "${e.name}"`);
		}
		let ye = l(() => C.items.map((e) => ({
			id: `library-${e.id}`,
			title: e.name,
			query: {
				libraryId: e.id,
				topLevel: !0
			}
		}))), N = de(/* @__PURE__ */ new Map());
		function P(e) {
			e.forEach((e) => N.set(e.id, e));
		}
		let F = l(() => {
			let e = w.resumeMap;
			return Object.keys(e).map((e) => N.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		}), I = g([]), L = g(!1), R = g(null), z = null;
		function be(e) {
			return z ? z.setBaseUrl(e) : z = new t({ baseUrl: e }), z;
		}
		async function B() {
			if (!L.value) {
				L.value = !0, R.value = null;
				try {
					let { items: e } = await be(m.value).listFavorites({ limit: ge });
					I.value = e, e.forEach((e) => D.hydrate(e)), P(e);
				} catch (e) {
					R.value = e instanceof Error ? e.message : "Failed to load favorites";
				} finally {
					L.value = !1;
				}
			}
		}
		let xe = l(() => {
			let e = [];
			return D.entries.forEach((t, n) => {
				t.favorite && e.push(n);
			}), e.sort().join(",");
		}), Se = l(() => !L.value && !R.value && I.value.length > 0);
		function V() {
			C.load(m.value, !0), B();
		}
		ue(() => {
			C.load(m.value), B();
		}), y(m, V), y(xe, () => {
			B();
		});
		let Ce = l(() => C.loaded && C.items.length === 0 && !C.error), we = l(() => C.loading && C.items.length === 0 && !C.error);
		function H(e, t) {
			O?.push({
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
				let i = await oe(new t({ baseUrl: m.value }), m.value, e, w.resumeMap, n?.signal);
				if (r()) return;
				if (!i) {
					T.info("Nothing to play yet");
					return;
				}
				H("player", i.id);
			} catch (e) {
				if (r() || W(e)) return;
				T.info("Nothing to play yet");
			}
		}
		function K(e) {
			D.isFavorite(e.id) ? T.success(`Added "${e.name}" to your favorites`) : T.info(`Removed "${e.name}" from your favorites`);
		}
		function q(e) {
			O?.hasRoute("media") ? H("media", e.id) : T.info(`Details for "${e.name}" are coming soon`);
		}
		function J(e) {
			D.toggleFavorite(e.id, m.value), D.isFavorite(e.id) ? T.success(`Marked "${e.name}" as watched`) : T.info(`Marked "${e.name}" as unwatched`);
		}
		function Y(e) {
			k.value = e, A.value = !0;
		}
		function X(e) {
			T.info("Poster picker is coming soon");
		}
		let Z = null;
		async function Q(e) {
			if (!window.confirm(`Remove "${e.name}" from the library? This cannot be undone.`)) return;
			Z?.abort();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			Z = n;
			let r = () => n !== Z;
			try {
				if (await new t({ baseUrl: m.value }).deleteMediaItem(e.id), r()) return;
				I.value = I.value.filter((t) => t.id !== e.id), N.delete(e.id), T.success(`Removed "${e.name}"`);
			} catch (t) {
				if (r() || W(t)) return;
				T.error(`Failed to remove "${e.name}": ${t instanceof Error ? t.message : "Unknown error"}`);
			}
		}
		function $(e) {
			let t = e.query?.libraryId;
			t && O?.push({
				name: "library",
				params: { id: t }
			}).catch(() => {});
		}
		return (e, t) => (h(), f("div", x, [
			se("div", me, [fe(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			F.value.length ? (h(), u(o, {
				key: 0,
				title: "Continue Watching",
				items: F.value,
				"can-match": v(E).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: M,
				onMarkWatched: J,
				onRefresh: Y,
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, ["items", "can-match"])) : d("", !0),
			Se.value ? (h(), u(o, {
				key: 1,
				title: "Favorites",
				items: I.value,
				"can-match": v(E).isAdmin,
				"hide-when-empty": "",
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: M,
				onMarkWatched: J,
				onRefresh: Y,
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, ["items", "can-match"])) : d("", !0),
			(h(!0), f(c, null, _(_e.value, (e) => (h(), u(s, {
				key: e.id,
				row: e,
				"api-base": v(m),
				"show-see-all": !!e.query?.libraryId,
				"can-match": v(E).isAdmin,
				"applied-item": j.value,
				onItemsLoaded: P,
				onSeeAll: $,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: M,
				onMarkWatched: J,
				onRefresh: Y,
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"row",
				"api-base",
				"show-see-all",
				"can-match",
				"applied-item"
			]))), 128)),
			(h(!0), f(c, null, _(ye.value, (e) => (h(), u(s, {
				key: e.id,
				row: e,
				"api-base": v(m),
				"can-match": v(E).isAdmin,
				"applied-item": j.value,
				onItemsLoaded: P,
				onSeeAll: $,
				onPlay: G,
				onWatchlist: K,
				onInfo: q,
				onMatch: M,
				onMarkWatched: J,
				onRefresh: Y,
				onChoosePoster: X,
				onRemove: Q
			}, null, 8, [
				"row",
				"api-base",
				"can-match",
				"applied-item"
			]))), 128)),
			we.value ? (h(), f("div", he, [p(ie, { label: "Loading libraries" })])) : d("", !0),
			v(C).error ? (h(), u(a, {
				key: 3,
				icon: "alert",
				title: "Couldn't load your libraries",
				description: v(C).error
			}, {
				actions: b(() => [p(re, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: V
				}, {
					default: b(() => [...t[1] ||= [ce("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : Ce.value ? (h(), u(a, {
				key: 4,
				icon: "film",
				title: "No libraries yet",
				description: "Once a library is added it shows up here as its own section."
			})) : d("", !0),
			v(E).isAdmin ? (h(), u(ae, {
				key: 5,
				modelValue: A.value,
				"onUpdate:modelValue": t[0] ||= (e) => A.value = e,
				item: k.value,
				onApplied: ve
			}, null, 8, ["modelValue", "item"])) : d("", !0)
		]));
	}
}), [["__scopeId", "data-v-2e05fdda"]]);
//#endregion
export { S as default };

//# sourceMappingURL=BrowsePage-BqEUMpUJ.js.map