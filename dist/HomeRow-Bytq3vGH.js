import { n as e } from "./Icon-55iG1rR7.js";
import { t } from "./useMessages-BGVJcrvU.js";
import { t as n } from "./client-Bmlfq3Uy.js";
import { t as r } from "./useAuthStore-DaCiMvJ5.js";
import { i, r as a } from "./usePlayerStore-D4NTHjZa.js";
import { t as o } from "./useToastStore-CxO_ppM8.js";
import { t as s } from "./MediaRow-CmsmkLCE.js";
import { n as c } from "./media-query-D7hrCu8r.js";
import { createElementBlock as l, createElementVNode as u, createSlots as d, createVNode as f, defineComponent as p, getCurrentInstance as m, onBeforeUnmount as h, onMounted as g, onUnmounted as _, openBlock as v, ref as y, shallowRef as b, toDisplayString as x, unref as S, watch as C, withCtx as w } from "vue";
// src/composables/useResumeSync.ts
var T = b([]), E = !1, D = 0;
function O() {
	document.visibilityState === "visible" && setTimeout(() => void N().syncResume(), 100);
}
function k() {
	m() && (D += 1, _(() => {
		D = Math.max(0, D - 1), D === 0 && E && (document.removeEventListener("visibilitychange", O), E = !1);
	})), E || (E = !0, document.addEventListener("visibilitychange", O));
}
var A = null;
async function j() {
	let e = i(), t = r();
	if (t.isLoggedIn) try {
		let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {}, i = [];
		for (let e of n.items ?? []) {
			let t = e.position_ticks;
			typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / a), i.push(e));
		}
		e.mergeServerResume(r), T.value = i;
	} catch {}
}
function M() {
	return A || (A = j().finally(() => {
		A = null;
	}), A);
}
function N() {
	return k(), {
		syncResume: M,
		continueWatchingItems: T
	};
}
// src/components/HomeRow.vue
var P = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		let i = e, a = r, p = o(), { t: m } = t(), _ = y([]), b = y(null), T = y(!1), E = y(null), D = y(!1), O = y(null), k = null, A = null, j = !1;
		function M(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function N() {
			if (!T.value) {
				T.value = !0, E.value = null, A = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new n({ baseUrl: i.apiBase }), t = c(i.apiBase, {
						...i.row.query,
						limit: i.limit,
						offset: 0
					}), r = await e.get(t, void 0, A?.signal);
					if (j) return;
					_.value = r.items ?? [], b.value = typeof r.total == "number" ? r.total : _.value.length, D.value = !0, a("items-loaded", _.value);
				} catch (e) {
					if (j || M(e)) return;
					console.error(`phlix: HomeRow “${i.row.title}” fetch failed`, e), E.value = m("errors.network"), p.error(m("browse.rowLoadError", { name: i.row.title }));
				} finally {
					j || (T.value = !1);
				}
			}
		}
		function P() {
			typeof IntersectionObserver > "u" || !O.value ? N() : (k = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (k?.disconnect(), k = null, N());
			}, { rootMargin: "300px" }), k.observe(O.value));
		}
		function F(e) {
			let t = _.value.findIndex((t) => t.id === e.id);
			t !== -1 && (_.value = _.value.map((n, r) => r === t ? e : n));
		}
		return C(() => i.appliedItem, (e) => {
			e && F(e);
		}), g(P), h(() => {
			j = !0, A?.abort(), A = null, k?.disconnect(), k = null;
		}), (t, n) => (v(), l("div", {
			ref_key: "rootEl",
			ref: O
		}, [f(s, {
			title: e.row.title,
			items: _.value,
			loading: T.value || !D.value && !E.value,
			error: E.value,
			count: b.value,
			"can-match": e.canMatch,
			"hide-when-empty": "",
			onRetry: N,
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
			fn: w(() => [u("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => a("see-all", e.row)
			}, x(S(m)("common.seeAll")), 1)]),
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
}), [["__scopeId", "data-v-2e96b3b9"]]);
export { N as n, P as t };

//# sourceMappingURL=HomeRow-Bytq3vGH.js.map