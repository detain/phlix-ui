import { n as e } from "./Icon-55iG1rR7.js";
import { t } from "./useMessages-B74fpn3I.js";
import { t as n } from "./client-Bmlfq3Uy.js";
import { t as r } from "./useAuthStore-C2WMKX0c.js";
import { i, r as a } from "./usePlayerStore-P13f-aKf.js";
import { t as o } from "./useToastStore-CxO_ppM8.js";
import { t as s } from "./MediaRow-C8iIxcXt.js";
import { n as c } from "./media-query-D7hrCu8r.js";
import { createElementBlock as l, createElementVNode as u, createSlots as d, createVNode as f, defineComponent as p, getCurrentInstance as m, onBeforeUnmount as h, onMounted as g, onUnmounted as _, openBlock as v, ref as y, shallowRef as b, watch as x, withCtx as S } from "vue";
// src/composables/useResumeSync.ts
var C = b([]), w = !1, T = 0;
function E() {
	document.visibilityState === "visible" && setTimeout(() => void j().syncResume(), 100);
}
function D() {
	m() && (T += 1, _(() => {
		T = Math.max(0, T - 1), T === 0 && w && (document.removeEventListener("visibilitychange", E), w = !1);
	})), w || (w = !0, document.addEventListener("visibilitychange", E));
}
var O = null;
async function k() {
	let e = i(), t = r();
	if (t.isLoggedIn) try {
		let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {}, i = [];
		for (let e of n.items ?? []) {
			let t = e.position_ticks;
			typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / a), i.push(e));
		}
		e.mergeServerResume(r), C.value = i;
	} catch {}
}
function A() {
	return O || (O = k().finally(() => {
		O = null;
	}), O);
}
function j() {
	return D(), {
		syncResume: A,
		continueWatchingItems: C
	};
}
// src/components/HomeRow.vue
var M = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		"edit-metadata",
		"explore-data",
		"see-all"
	],
	setup(e, { emit: r }) {
		let i = e, a = r, p = o(), { t: m } = t(), _ = y([]), b = y(null), C = y(!1), w = y(null), T = y(!1), E = y(null), D = null, O = null, k = !1;
		function A(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function j() {
			if (!C.value) {
				C.value = !0, w.value = null, O = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new n({ baseUrl: i.apiBase }), t = c(i.apiBase, {
						...i.row.query,
						limit: i.limit,
						offset: 0
					}), r = await e.get(t, void 0, O?.signal);
					if (k) return;
					_.value = r.items ?? [], b.value = typeof r.total == "number" ? r.total : _.value.length, T.value = !0, a("items-loaded", _.value);
				} catch (e) {
					if (k || A(e)) return;
					console.error(`phlix: HomeRow “${i.row.title}” fetch failed`, e), w.value = m("errors.network"), p.error(`Couldn’t load “${i.row.title}”.`);
				} finally {
					k || (C.value = !1);
				}
			}
		}
		function M() {
			typeof IntersectionObserver > "u" || !E.value ? j() : (D = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (D?.disconnect(), D = null, j());
			}, { rootMargin: "300px" }), D.observe(E.value));
		}
		function N(e) {
			let t = _.value.findIndex((t) => t.id === e.id);
			t !== -1 && (_.value = _.value.map((n, r) => r === t ? e : n));
		}
		return x(() => i.appliedItem, (e) => {
			e && N(e);
		}), g(M), h(() => {
			k = !0, O?.abort(), O = null, D?.disconnect(), D = null;
		}), (t, n) => (v(), l("div", {
			ref_key: "rootEl",
			ref: E
		}, [f(s, {
			title: e.row.title,
			items: _.value,
			loading: C.value || !T.value && !w.value,
			error: w.value,
			count: b.value,
			"can-match": e.canMatch,
			"hide-when-empty": "",
			onRetry: j,
			onPlay: n[1] ||= (e) => a("play", e),
			onWatchlist: n[2] ||= (e) => a("watchlist", e),
			onInfo: n[3] ||= (e) => a("info", e),
			onMatch: n[4] ||= (e) => a("match", e),
			onMarkWatched: n[5] ||= (e) => a("mark-watched", e),
			onRefresh: n[6] ||= (e) => a("refresh", e),
			onChoosePoster: n[7] ||= (e) => a("choose-poster", e),
			onRemove: n[8] ||= (e) => a("remove", e),
			onEditMetadata: n[9] ||= (e) => a("edit-metadata", e),
			onExploreData: n[10] ||= (e) => a("explore-data", e)
		}, d({ _: 2 }, [e.showSeeAll ? {
			name: "action",
			fn: S(() => [u("button", {
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
}), [["__scopeId", "data-v-59686763"]]);
export { j as n, M as t };

//# sourceMappingURL=HomeRow-0ZpUsKfa.js.map