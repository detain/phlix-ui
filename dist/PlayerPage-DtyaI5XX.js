import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-MsRePfWv.js";
import { i as r } from "./usePlayerStore-DmNlaYQc.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { t as a } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { a as s, n as ee, r as c } from "./useApiBase-DhSHB6Qp.js";
import { t as l } from "./Player-CaRNZdo8.js";
import { i as te, r as u } from "./series-grouping-BTZK8Agh.js";
import { computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeClass as y, normalizeStyle as b, onBeforeUnmount as x, onMounted as ne, openBlock as S, ref as C, unref as re, watch as ie, withCtx as w } from "vue";
import { onBeforeRouteLeave as T, useRoute as E, useRouter as ae } from "vue-router";
//#region src/components/player/episode-order.ts
function oe(e) {
	return u(e).filter((e) => !e.isSpecials).flatMap((e) => e.episodes);
}
function se(e, t) {
	let n = e.findIndex((e) => e.id === t);
	return n > 0 ? e[n - 1] : null;
}
function D(e, t) {
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
}, A = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "PlayerPage",
	setup(e) {
		let u = /* @__PURE__ */ new Map(), v = ee(), A = c(), ce = E(), j = ae(), M = r(), N = C(null), P = C(""), F = C([]), I = C(null), L = C(null), R = C(!0), z = C(null), B = C(!1), V = C(null), H = C(null), U = d(() => String(ce.params.id ?? ""));
		i(() => N.value?.name);
		let W = d(() => {
			let e = N.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J(e) {
			let t = A.value || v.value;
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
				let a = s(v.value, {
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
			let r = s(v.value, {
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
			V.value = se(e, t), H.value = D(e, t);
		}
		function de(e) {
			for (let t of u.values()) if (t.some((t) => t.id === e)) return t;
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
				if (te(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => X(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = oe(a);
				o.length && u.set(n.id, o), Z(o, t.id);
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
				let n = new t({ baseUrl: v.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, G?.signal);
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
		ne(Q), ie(U, Q), T(() => {
			M.current && M.streamUrl && M.showMiniPlayer();
		}), x(() => {
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
		return (e, t) => (S(), m("div", { class: y(["player-page", { "is-theater": B.value }]) }, [W.value && !R.value && !z.value ? (S(), m("div", {
			key: 0,
			class: "player-page__ambient",
			style: b(W.value),
			"aria-hidden": "true"
		}, null, 4)) : p("", !0), h("div", O, [R.value ? (S(), m("div", k, [_(a, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : z.value ? (S(), f(o, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: z.value
		}, {
			actions: w(() => [_(n, {
				variant: "solid",
				onClick: Q
			}, {
				default: w(() => [...t[0] ||= [g("Retry", -1)]]),
				_: 1
			}), _(n, {
				variant: "ghost",
				onClick: $
			}, {
				default: w(() => [...t[1] ||= [g("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : N.value ? (S(), f(l, {
			key: 2,
			media: N.value,
			"stream-url": P.value,
			"stream-url-for": J,
			"api-base": re(v),
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
		])) : p("", !0)])], 2));
	}
}), [["__scopeId", "data-v-d9c03c38"]]);
//#endregion
export { A as default };

//# sourceMappingURL=PlayerPage-DtyaI5XX.js.map