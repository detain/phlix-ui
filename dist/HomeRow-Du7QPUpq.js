import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-D1nDQ0cP.js";
import { t as n } from "./useAuthStore-C_Rnq3Bo.js";
import { i as r, r as i } from "./usePlayerStore-fCCh6mOw.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./MediaRow-Chl6-trt.js";
import { n as s } from "./media-query-DKjhlX8r.js";
import { createElementBlock as c, createElementVNode as l, createSlots as u, createVNode as d, defineComponent as f, getCurrentInstance as p, onBeforeUnmount as m, onMounted as h, onUnmounted as g, openBlock as _, ref as v, shallowRef as y, watch as b, withCtx as x } from "vue";
//#region src/composables/useResumeSync.ts
var S = y([]), C = !1;
function w() {
	document.visibilityState === "visible" && setTimeout(() => void E().syncResume(), 100);
}
function T() {
	C || (C = !0, document.addEventListener("visibilitychange", w), p() && g(() => {
		document.removeEventListener("visibilitychange", w), C = !1;
	}));
}
function E() {
	let e = r(), t = n();
	T();
	async function a() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {}, a = [];
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / i), a.push(e));
			}
			e.mergeServerResume(r), S.value = a;
		} catch {}
	}
	return {
		syncResume: a,
		continueWatchingItems: S
	};
}
//#endregion
//#region src/components/HomeRow.vue
var D = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
		let r = e, i = n, f = a(), p = v([]), g = v(null), y = v(!1), S = v(null), C = v(!1), w = v(null), T = null, E = null, D = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function k() {
			if (!y.value) {
				y.value = !0, S.value = null, E = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new t({ baseUrl: r.apiBase }), n = s(r.apiBase, {
						...r.row.query,
						limit: r.limit,
						offset: 0
					}), a = await e.get(n, void 0, E?.signal);
					if (D) return;
					p.value = a.items ?? [], g.value = typeof a.total == "number" ? a.total : p.value.length, C.value = !0, i("items-loaded", p.value);
				} catch (e) {
					if (D || O(e)) return;
					S.value = e instanceof Error ? e.message : "Failed to load", f.error(`Couldn't load "${r.row.title}"`);
				} finally {
					D || (y.value = !1);
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
			let t = p.value.findIndex((t) => t.id === e.id);
			t !== -1 && (p.value = p.value.map((n, r) => r === t ? e : n));
		}
		return b(() => r.appliedItem, (e) => {
			e && j(e);
		}), h(A), m(() => {
			D = !0, E?.abort(), E = null, T?.disconnect(), T = null;
		}), (t, n) => (_(), c("div", {
			ref_key: "rootEl",
			ref: w
		}, [d(o, {
			title: e.row.title,
			items: p.value,
			loading: y.value || !C.value && !S.value,
			error: S.value,
			count: g.value,
			"can-match": e.canMatch,
			"hide-when-empty": "",
			onRetry: k,
			onPlay: n[1] ||= (e) => i("play", e),
			onWatchlist: n[2] ||= (e) => i("watchlist", e),
			onInfo: n[3] ||= (e) => i("info", e),
			onMatch: n[4] ||= (e) => i("match", e),
			onMarkWatched: n[5] ||= (e) => i("mark-watched", e),
			onRefresh: n[6] ||= (e) => i("refresh", e),
			onChoosePoster: n[7] ||= (e) => i("choose-poster", e),
			onRemove: n[8] ||= (e) => i("remove", e)
		}, u({ _: 2 }, [e.showSeeAll ? {
			name: "action",
			fn: x(() => [l("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => i("see-all", e.row)
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
export { E as n, D as t };

//# sourceMappingURL=HomeRow-Du7QPUpq.js.map