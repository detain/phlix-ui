import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-5ZSsUmsI.js";
import { i as r } from "./usePlayerStore-CCov4Tvr.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { t as a } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { i as s, n as c } from "./useApiBase-CSECk0g8.js";
import { t as ee } from "./Player-jbJMxv3h.js";
import { i as te, r as l } from "./series-grouping-BTZK8Agh.js";
import { computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as ne, createTextVNode as m, createVNode as h, defineComponent as g, normalizeClass as _, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, openBlock as x, ref as S, unref as re, watch as ie, withCtx as C } from "vue";
import { onBeforeRouteLeave as w, useRoute as T, useRouter as E } from "vue-router";
//#region src/components/player/episode-order.ts
function D(e) {
	return l(e).filter((e) => !e.isSpecials).flatMap((e) => e.episodes);
}
function ae(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n > 0 ? e[n - 1] : null;
}
function oe(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n >= 0 && n < e.length - 1 ? e[n + 1] : null;
}
//#endregion
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "player-page__stage" }, k = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, A = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "PlayerPage",
	setup(e) {
		let l = /* @__PURE__ */ new Map(), g = c(), A = T(), j = E(), M = r(), N = S(null), P = S(""), F = S([]), I = S(null), L = S(null), R = S(!0), z = S(null), B = S(!1), V = S(null), H = S(null), U = u(() => String(A.params.id ?? ""));
		i(() => N.value?.name);
		let W = u(() => {
			let e = N.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J(e) {
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${g.value}${e.stream_url}` : `${g.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function Y(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function se(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				M.setQueue([]);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let a = s(g.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				M.setQueue((o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || q(e)) return;
				M.setQueue([]);
			}
		}
		async function X(e, t, n) {
			let r = s(g.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function ce(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Z(e, t) {
			V.value = ae(e, t), H.value = oe(e, t);
		}
		function le(e) {
			for (let t of l.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function ue(e, t) {
			if (V.value = null, H.value = null, !(t.type === "episode" || (t.episode_number ?? null) !== null)) return;
			let n = le(t.id);
			if (n) {
				Z(n, t.id);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let n = await ce(e, t, r?.signal);
				if (i()) return;
				let a = await X(e, n.id, r?.signal);
				if (i()) return;
				if (te(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => X(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = D(a);
				o.length && l.set(n.id, o), Z(o, t.id);
			} catch (e) {
				if (i() || q(e)) return;
				V.value = null, H.value = null;
			}
		}
		async function Q() {
			let e = U.value;
			if (G?.abort(), G = typeof AbortController < "u" ? new AbortController() : null, R.value = !0, z.value = null, F.value = [], I.value = null, L.value = null, V.value = null, H.value = null, M.hideMiniPlayer(), !e) {
				z.value = "No media id provided", R.value = !1;
				return;
			}
			try {
				let n = new t({ baseUrl: g.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, G?.signal);
				if (K) return;
				let i = r.item;
				N.value = i, P.value = J(i);
				let a = await n.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, G?.signal).catch(() => null);
				if (K) return;
				F.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					title: e.title ?? void 0
				})), I.value = Y(a?.intro_marker), L.value = Y(a?.outro_marker), R.value = !1, se(n, i), ue(n, i);
			} catch (e) {
				if (K || q(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load media", R.value = !1;
			}
		}
		b(Q), ie(U, Q), w(() => {
			M.current && M.streamUrl && M.showMiniPlayer();
		}), y(() => {
			K = !0, G?.abort(), G = null;
		});
		function $() {
			j?.back();
		}
		function de(e) {
			j?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function fe(e) {
			j?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function pe(e) {
			B.value = e;
		}
		return (e, t) => (x(), p("div", { class: _(["player-page", { "is-theater": B.value }]) }, [W.value && !R.value && !z.value ? (x(), p("div", {
			key: 0,
			class: "player-page__ambient",
			style: v(W.value),
			"aria-hidden": "true"
		}, null, 4)) : f("", !0), ne("div", O, [R.value ? (x(), p("div", k, [h(a, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : z.value ? (x(), d(o, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: z.value
		}, {
			actions: C(() => [h(n, {
				variant: "solid",
				onClick: Q
			}, {
				default: C(() => [...t[0] ||= [m("Retry", -1)]]),
				_: 1
			}), h(n, {
				variant: "ghost",
				onClick: $
			}, {
				default: C(() => [...t[1] ||= [m("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value ? (x(), d(ee, {
			key: 2,
			media: N.value,
			"stream-url": P.value,
			"stream-url-for": J,
			"api-base": re(g),
			chapters: F.value,
			"intro-marker": I.value,
			"outro-marker": L.value,
			"prev-episode": V.value,
			"next-episode": H.value,
			autoplay: !0,
			onBack: $,
			onPlayNext: de,
			onPlayEpisode: fe,
			onTheater: pe
		}, null, 8, [
			"media",
			"stream-url",
			"api-base",
			"chapters",
			"intro-marker",
			"outro-marker",
			"prev-episode",
			"next-episode"
		])) : f("", !0)])], 2));
	}
}), [["__scopeId", "data-v-3a7d3cf0"]]);
//#endregion
export { A as default };

//# sourceMappingURL=PlayerPage-Xag03TJb.js.map