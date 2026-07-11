import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-D7B7SMZj.js";
import { t as n } from "./useAuthStore-CAHTCZvf.js";
import { a as r, n as i, o as a } from "./media-query-BdY2RILB.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./MediaRow-DRR_0zWj.js";
import { createElementBlock as c, createElementVNode as l, createSlots as u, createVNode as d, defineComponent as f, onBeforeUnmount as p, onMounted as m, onUnmounted as h, openBlock as g, ref as _, watch as v, withCtx as y } from "vue";
//#region src/composables/useResumeSync.ts
function b() {
	document.visibilityState === "visible" && setTimeout(() => void x().syncResume(), 100);
}
function x() {
	let e = a(), t = n(), i = [], o = !1;
	async function s() {
		if (t.isLoggedIn) {
			o || (o = !0, document.addEventListener("visibilitychange", b));
			try {
				let n = await t.client.get("/api/v1/users/me/continue-watching"), a = {}, o = [];
				for (let e of n.items ?? []) {
					let t = e.position_ticks;
					typeof e.id == "string" && typeof t == "number" && t > 0 && (a[e.id] = Math.floor(t / r), o.push(e));
				}
				e.mergeServerResume(a), i = o;
			} catch {}
		}
	}
	return {
		syncResume: s,
		get continueWatchingItems() {
			return i;
		}
	};
}
h(() => {
	document.removeEventListener("visibilitychange", b);
});
//#endregion
//#region src/components/HomeRow.vue
var S = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
	setup(e, { emit: n }) {
		let r = e, a = n, f = o(), h = _([]), b = _(null), x = _(!1), S = _(null), C = _(!1), w = _(null), T = null, E = null, D = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function k() {
			if (!x.value) {
				x.value = !0, S.value = null, E = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new t({ baseUrl: r.apiBase }), n = i(r.apiBase, {
						...r.row.query,
						limit: r.limit,
						offset: 0
					}), o = await e.get(n, void 0, E?.signal);
					if (D) return;
					h.value = o.items ?? [], b.value = typeof o.total == "number" ? o.total : h.value.length, C.value = !0, a("items-loaded", h.value);
				} catch (e) {
					if (D || O(e)) return;
					S.value = e instanceof Error ? e.message : "Failed to load", f.error(`Couldn't load "${r.row.title}"`);
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
			let t = h.value.findIndex((t) => t.id === e.id);
			t !== -1 && (h.value = h.value.map((n, r) => r === t ? e : n));
		}
		return v(() => r.appliedItem, (e) => {
			e && j(e);
		}), m(A), p(() => {
			D = !0, E?.abort(), E = null, T?.disconnect(), T = null;
		}), (t, n) => (g(), c("div", {
			ref_key: "rootEl",
			ref: w
		}, [d(s, {
			title: e.row.title,
			items: h.value,
			loading: x.value || !C.value && !S.value,
			error: S.value,
			count: b.value,
			"can-match": e.canMatch,
			"hide-when-empty": "",
			onRetry: k,
			onPlay: n[1] ||= (e) => a("play", e),
			onWatchlist: n[2] ||= (e) => a("watchlist", e),
			onInfo: n[3] ||= (e) => a("info", e),
			onMatch: n[4] ||= (e) => a("match", e),
			onMarkWatched: n[5] ||= (e) => a("mark-watched", e),
			onRefresh: n[6] ||= (e) => a("refresh", e),
			onChoosePoster: n[7] ||= (e) => a("choose-poster", e),
			onRemove: n[8] ||= (e) => a("remove", e)
		}, u({ _: 2 }, [e.showSeeAll ? {
			name: "action",
			fn: y(() => [l("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => a("see-all", e.row)
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
}), [["__scopeId", "data-v-cb28091e"]]);
//#endregion
export { x as n, S as t };

//# sourceMappingURL=HomeRow-CAB6ALD_.js.map