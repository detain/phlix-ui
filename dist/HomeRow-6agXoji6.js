import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t } from "./Button-BwQkyEkr.js";
import { t as n } from "./useToastStore-BDoKlU6N.js";
import { t as r } from "./MediaRow-C9mRFOtk.js";
import { n as i } from "./media-query-BcVLE7J6.js";
import { createElementBlock as a, createElementVNode as o, createSlots as s, createVNode as c, defineComponent as l, onBeforeUnmount as u, onMounted as d, openBlock as f, ref as p, withCtx as m } from "vue";
//#endregion
//#region src/components/HomeRow.vue
var h = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "HomeRow",
	props: {
		row: {},
		apiBase: {},
		limit: { default: 18 },
		showSeeAll: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"items-loaded",
		"play",
		"watchlist",
		"info",
		"see-all"
	],
	setup(e, { emit: l }) {
		let h = e, g = l, _ = n(), v = p([]), y = p(null), b = p(!1), x = p(null), S = p(!1), C = p(null), w = null, T = null, E = !1;
		function D(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function O() {
			if (!b.value) {
				b.value = !0, x.value = null, T = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new t({ baseUrl: h.apiBase }), n = i(h.apiBase, {
						...h.row.query,
						limit: h.limit,
						offset: 0
					}), r = await e.get(n, void 0, T?.signal);
					if (E) return;
					v.value = r.items ?? [], y.value = typeof r.total == "number" ? r.total : v.value.length, S.value = !0, g("items-loaded", v.value);
				} catch (e) {
					if (E || D(e)) return;
					x.value = e instanceof Error ? e.message : "Failed to load", _.error(`Couldn't load "${h.row.title}"`);
				} finally {
					E || (b.value = !1);
				}
			}
		}
		function k() {
			if (typeof IntersectionObserver > "u" || !C.value) {
				O();
				return;
			}
			w = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (w?.disconnect(), w = null, O());
			}, { rootMargin: "300px" }), w.observe(C.value);
		}
		return d(k), u(() => {
			E = !0, T?.abort(), T = null, w?.disconnect(), w = null;
		}), (t, n) => (f(), a("div", {
			ref_key: "rootEl",
			ref: C
		}, [c(r, {
			title: e.row.title,
			items: v.value,
			loading: b.value || !S.value && !x.value,
			error: x.value,
			count: y.value,
			"hide-when-empty": "",
			onRetry: O,
			onPlay: n[1] ||= (e) => g("play", e),
			onWatchlist: n[2] ||= (e) => g("watchlist", e),
			onInfo: n[3] ||= (e) => g("info", e)
		}, s({ _: 2 }, [e.showSeeAll ? {
			name: "action",
			fn: m(() => [o("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => g("see-all", e.row)
			}, "See all")]),
			key: "0"
		} : void 0]), 1032, [
			"title",
			"items",
			"loading",
			"error",
			"count"
		])], 512));
	}
}), [["__scopeId", "data-v-85a78671"]]);
//#endregion
export { h as t };

//# sourceMappingURL=HomeRow-6agXoji6.js.map