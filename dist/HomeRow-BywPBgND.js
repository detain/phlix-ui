import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./client-C0AMSEun.js";
import { t as n } from "./useAuthStore-DWTuTW8p.js";
import { a as r, n as i, o as a } from "./media-query-BdY2RILB.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./MediaRow-D0CkQKro.js";
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
	let e = a(), t = n();
	T();
	async function i() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), i = {}, a = [];
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (i[e.id] = Math.floor(t / r), a.push(e));
			}
			e.mergeServerResume(i), S.value = a;
		} catch {}
	}
	return {
		syncResume: i,
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
		let r = e, a = n, f = o(), p = v([]), g = v(null), y = v(!1), S = v(null), C = v(!1), w = v(null), T = null, E = null, D = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function k() {
			if (!y.value) {
				y.value = !0, S.value = null, E = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new t({ baseUrl: r.apiBase }), n = i(r.apiBase, {
						...r.row.query,
						limit: r.limit,
						offset: 0
					}), o = await e.get(n, void 0, E?.signal);
					if (D) return;
					p.value = o.items ?? [], g.value = typeof o.total == "number" ? o.total : p.value.length, C.value = !0, a("items-loaded", p.value);
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
		}, [d(s, {
			title: e.row.title,
			items: p.value,
			loading: y.value || !C.value && !S.value,
			error: S.value,
			count: g.value,
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
			fn: x(() => [l("button", {
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
export { E as n, D as t };

//# sourceMappingURL=HomeRow-BywPBgND.js.map