import { n as e } from "./Icon-24ngwBUH.js";
import { t } from "./client-fw74f3l_.js";
import { t as n } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./MediaRow-BG_zIIQN.js";
import { n as i } from "./media-query-C8oxSF4h.js";
import { createElementBlock as a, createElementVNode as o, createSlots as s, createVNode as c, defineComponent as l, onBeforeUnmount as u, onMounted as d, openBlock as f, ref as p, watch as m, withCtx as h } from "vue";
//#endregion
//#region src/components/HomeRow.vue
var g = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "HomeRow",
	props: {
		row: {},
		apiBase: {},
		limit: { default: 18 },
		showSeeAll: {
			type: Boolean,
			default: !0
		},
		canMatch: {
			type: Boolean,
			default: !1
		},
		appliedItem: { default: null }
	},
	emits: [
		"items-loaded",
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"see-all"
	],
	setup(e, { emit: l }) {
		let g = e, _ = l, v = n(), y = p([]), b = p(null), x = p(!1), S = p(null), C = p(!1), w = p(null), T = null, E = null, D = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function k() {
			if (!x.value) {
				x.value = !0, S.value = null, E = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new t({ baseUrl: g.apiBase }), n = i(g.apiBase, {
						...g.row.query,
						limit: g.limit,
						offset: 0
					}), r = await e.get(n, void 0, E?.signal);
					if (D) return;
					y.value = r.items ?? [], b.value = typeof r.total == "number" ? r.total : y.value.length, C.value = !0, _("items-loaded", y.value);
				} catch (e) {
					if (D || O(e)) return;
					S.value = e instanceof Error ? e.message : "Failed to load", v.error(`Couldn't load "${g.row.title}"`);
				} finally {
					D || (x.value = !1);
				}
			}
		}
		function A() {
			if (typeof IntersectionObserver > "u" || !w.value) {
				k();
				return;
			}
			T = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (T?.disconnect(), T = null, k());
			}, { rootMargin: "300px" }), T.observe(w.value);
		}
		function j(e) {
			let t = y.value.findIndex((t) => t.id === e.id);
			t !== -1 && (y.value = y.value.map((n, r) => r === t ? e : n));
		}
		return m(() => g.appliedItem, (e) => {
			e && j(e);
		}), d(A), u(() => {
			D = !0, E?.abort(), E = null, T?.disconnect(), T = null;
		}), (t, n) => (f(), a("div", {
			ref_key: "rootEl",
			ref: w
		}, [c(r, {
			title: e.row.title,
			items: y.value,
			loading: x.value || !C.value && !S.value,
			error: S.value,
			count: b.value,
			"can-match": e.canMatch,
			"hide-when-empty": "",
			onRetry: k,
			onPlay: n[1] ||= (e) => _("play", e),
			onWatchlist: n[2] ||= (e) => _("watchlist", e),
			onInfo: n[3] ||= (e) => _("info", e),
			onMatch: n[4] ||= (e) => _("match", e),
			onMarkWatched: n[5] ||= (e) => _("mark-watched", e),
			onRefresh: n[6] ||= (e) => _("refresh", e),
			onChoosePoster: n[7] ||= (e) => _("choose-poster", e),
			onRemove: n[8] ||= (e) => _("remove", e)
		}, s({ _: 2 }, [e.showSeeAll ? {
			name: "action",
			fn: h(() => [o("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => _("see-all", e.row)
			}, "See all")]),
			key: "0"
		} : void 0]), 1032, [
			"title",
			"items",
			"loading",
			"error",
			"count",
			"can-match"
		])], 512));
	}
}), [["__scopeId", "data-v-2c2569e5"]]);
//#endregion
export { g as t };

//# sourceMappingURL=HomeRow-C4GWcQMQ.js.map