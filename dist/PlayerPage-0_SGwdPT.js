import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./client-BQ-In3oB.js";
import { n, r } from "./useApiBase-CV_r-Kk4.js";
import { i } from "./usePlayerStore-iTjrRIZa.js";
import { i as a } from "./usePageTitle-BO3GGF3M.js";
import { t as o } from "./Button-k7aQagzg.js";
import { t as ee } from "./Skeleton-DkSoWF3C.js";
import { t as te } from "./EmptyState-B2QnGIQT.js";
import { n as s } from "./media-query-C8oxSF4h.js";
import { t as c } from "./Player-CWlKHGRd.js";
import { i as ne, r as l } from "./series-grouping-BTZK8Agh.js";
import { computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, normalizeStyle as y, onBeforeUnmount as b, onMounted as re, openBlock as x, ref as S, unref as ie, watch as ae, withCtx as C } from "vue";
import { onBeforeRouteLeave as w, useRoute as T, useRouter as oe } from "vue-router";
//#region src/components/player/episode-order.ts
function se(e) {
	return l(e).filter((e) => !e.isSpecials).flatMap((e) => e.episodes);
}
function ce(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n > 0 ? e[n - 1] : null;
}
function E(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n >= 0 && n < e.length - 1 ? e[n + 1] : null;
}
//#endregion
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var D = { class: "player-page__stage" }, O = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, k = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "PlayerPage",
	setup(e) {
		let l = /* @__PURE__ */ new Map(), _ = n(), k = r(), A = T(), j = oe(), M = i(), N = S(null), P = S(""), F = S([]), I = S(null), L = S(null), R = S(!0), z = S(null), B = S(!1), V = S(null), H = S(null), U = u(() => String(A.params.id ?? ""));
		a(() => N.value?.name);
		let W = u(() => {
			let e = N.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J(e) {
			let t = k.value || _.value;
			return e.stream_url ? /^https?:\/\//.test(e.stream_url) ? e.stream_url : `${t}${e.stream_url}` : `${t}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function Y(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function le(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				M.setQueue([]);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let a = s(_.value, {
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
			let r = s(_.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function ue(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Z(e, t) {
			V.value = ce(e, t), H.value = E(e, t);
		}
		function de(e) {
			for (let t of l.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function fe(e, t) {
			if (V.value = null, H.value = null, !(t.type === "episode" || (t.episode_number ?? null) !== null)) return;
			let n = de(t.id);
			if (n) {
				Z(n, t.id);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let n = await ue(e, t, r?.signal);
				if (i()) return;
				let a = await X(e, n.id, r?.signal);
				if (i()) return;
				if (ne(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => X(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = se(a);
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
				let n = new t({ baseUrl: _.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, G?.signal);
				if (K) return;
				let i = r.item;
				N.value = i, P.value = J(i);
				let a = await n.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, G?.signal).catch(() => null);
				if (K) return;
				F.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					title: e.title ?? void 0
				})), I.value = Y(a?.intro_marker), L.value = Y(a?.outro_marker), R.value = !1, le(n, i), fe(n, i);
			} catch (e) {
				if (K || q(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load media", R.value = !1;
			}
		}
		re(Q), ae(U, Q), w(() => {
			M.current && M.streamUrl && M.showMiniPlayer();
		}), b(() => {
			K = !0, G?.abort(), G = null;
		});
		function $() {
			j?.back();
		}
		function pe(e) {
			j?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function me(e) {
			j?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function he(e) {
			B.value = e;
		}
		return (e, t) => (x(), p("div", { class: v(["player-page", { "is-theater": B.value }]) }, [W.value && !R.value && !z.value ? (x(), p("div", {
			key: 0,
			class: "player-page__ambient",
			style: y(W.value),
			"aria-hidden": "true"
		}, null, 4)) : f("", !0), m("div", D, [R.value ? (x(), p("div", O, [g(ee, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : z.value ? (x(), d(te, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: z.value
		}, {
			actions: C(() => [g(o, {
				variant: "solid",
				onClick: Q
			}, {
				default: C(() => [...t[0] ||= [h("Retry", -1)]]),
				_: 1
			}), g(o, {
				variant: "ghost",
				onClick: $
			}, {
				default: C(() => [...t[1] ||= [h("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value ? (x(), d(c, {
			key: 2,
			media: N.value,
			"stream-url": P.value,
			"stream-url-for": J,
			"api-base": ie(_),
			chapters: F.value,
			"intro-marker": I.value,
			"outro-marker": L.value,
			"prev-episode": V.value,
			"next-episode": H.value,
			autoplay: !0,
			onBack: $,
			onPlayNext: pe,
			onPlayEpisode: me,
			onTheater: he
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
}), [["__scopeId", "data-v-d9c03c38"]]);
//#endregion
export { k as default };

//# sourceMappingURL=PlayerPage-0_SGwdPT.js.map