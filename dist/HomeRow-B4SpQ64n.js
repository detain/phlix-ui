import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-Dwm0lQlG.js";
import { n as r } from "./Button-BwQkyEkr.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./MediaRow-Bla4-NCW.js";
import { n as o } from "./media-query-BcVLE7J6.js";
import { computed as s, createElementBlock as c, createElementVNode as l, createSlots as u, createVNode as d, defineComponent as f, normalizeStyle as p, onBeforeUnmount as m, onMounted as h, openBlock as g, ref as _, unref as v, withCtx as y } from "vue";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var b = ["aria-label"], x = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let r = e, { t: i } = n(), a = s(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
		return (n, r) => (g(), c("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? v(i)("common.loading"),
			style: p(a.value ? { fontSize: a.value } : void 0)
		}, [d(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, b));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), S = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
	setup(e, { emit: t }) {
		let n = e, s = t, f = i(), p = _([]), v = _(null), b = _(!1), x = _(null), S = _(!1), C = _(null), w = null, T = null, E = !1;
		function D(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function O() {
			if (!b.value) {
				b.value = !0, x.value = null, T = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new r({ baseUrl: n.apiBase }), t = o(n.apiBase, {
						...n.row.query,
						limit: n.limit,
						offset: 0
					}), i = await e.get(t, void 0, T?.signal);
					if (E) return;
					p.value = i.items ?? [], v.value = typeof i.total == "number" ? i.total : p.value.length, S.value = !0, s("items-loaded", p.value);
				} catch (e) {
					if (E || D(e)) return;
					x.value = e instanceof Error ? e.message : "Failed to load", f.error(`Couldn't load "${n.row.title}"`);
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
		return h(k), m(() => {
			E = !0, T?.abort(), T = null, w?.disconnect(), w = null;
		}), (t, n) => (g(), c("div", {
			ref_key: "rootEl",
			ref: C
		}, [d(a, {
			title: e.row.title,
			items: p.value,
			loading: b.value || !S.value && !x.value,
			error: x.value,
			count: v.value,
			"hide-when-empty": "",
			onRetry: O,
			onPlay: n[1] ||= (e) => s("play", e),
			onWatchlist: n[2] ||= (e) => s("watchlist", e),
			onInfo: n[3] ||= (e) => s("info", e)
		}, u({ _: 2 }, [e.showSeeAll ? {
			name: "action",
			fn: y(() => [l("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => s("see-all", e.row)
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
export { x as n, S as t };

//# sourceMappingURL=HomeRow-B4SpQ64n.js.map