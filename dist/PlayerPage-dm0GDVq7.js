import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-BwQkyEkr.js";
import { i as r } from "./usePlayerStore-Cffo63UC.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { t as a } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { n as s } from "./media-query-BcVLE7J6.js";
import { t as ee } from "./Player-DzfjYQlb.js";
import { n as c, r as te } from "./series-grouping-BvVFNXP8.js";
import { computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as ne, createTextVNode as p, createVNode as m, defineComponent as h, inject as re, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as ie, onMounted as ae, openBlock as v, ref as y, watch as oe, withCtx as b } from "vue";
import { onBeforeRouteLeave as x, useRoute as S, useRouter as C } from "vue-router";
//#region src/components/player/episode-order.ts
function w(e) {
	return c(e).filter((e) => !e.isSpecials).flatMap((e) => e.episodes);
}
function T(e, t) {
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
}, k = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "PlayerPage",
	setup(e) {
		let c = /* @__PURE__ */ new Map(), h = re("apiBase", ""), k = l(() => typeof h == "string" ? h : h?.value ?? ""), se = S(), A = C(), j = r(), M = y(null), N = y(""), P = y([]), F = y(null), I = y(null), L = y(!0), R = y(null), z = y(!1), B = y(null), V = y(null), H = l(() => String(se.params.id ?? ""));
		i(() => M.value?.name);
		let U = l(() => {
			let e = M.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), W = null, G = !1;
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function q(e) {
			return `${k.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function J(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function ce(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				j.setQueue([]);
				return;
			}
			let r = W, i = () => G || r !== W;
			try {
				let a = s(k.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				j.setQueue((o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || K(e)) return;
				j.setQueue([]);
			}
		}
		async function Y(e, t, n) {
			let r = s(k.value, {
				parentId: t,
				limit: 100,
				sort: "name",
				order: "asc"
			});
			return (await e.get(r, void 0, n)).items ?? [];
		}
		async function X(e, t, n) {
			let r = t;
			for (let t = 0; t < 4 && r.parent_id; t += 1) {
				let t = (await e.get(`/api/v1/media/${encodeURIComponent(r.parent_id)}`, void 0, n)).item;
				if (!t || (r = t, t.type === "series")) break;
			}
			return r;
		}
		function Z(e, t) {
			B.value = T(e, t), V.value = E(e, t);
		}
		function le(e) {
			for (let t of c.values()) if (t.some((t) => t.id === e)) return t;
			return null;
		}
		async function ue(e, t) {
			if (B.value = null, V.value = null, !(t.type === "episode" || (t.episode_number ?? null) !== null)) return;
			let n = le(t.id);
			if (n) {
				Z(n, t.id);
				return;
			}
			let r = W, i = () => G || r !== W;
			try {
				let n = await X(e, t, r?.signal);
				if (i()) return;
				let a = await Y(e, n.id, r?.signal);
				if (i()) return;
				if (te(a)) {
					let t = a.filter((e) => e.type === "season"), n = await Promise.all(t.map((t) => Y(e, t.id, r?.signal).catch(() => [])));
					if (i()) return;
					a = [...a.filter((e) => e.type !== "season"), ...n.flat()];
				}
				let o = w(a);
				o.length && c.set(n.id, o), Z(o, t.id);
			} catch (e) {
				if (i() || K(e)) return;
				B.value = null, V.value = null;
			}
		}
		async function Q() {
			let e = H.value;
			if (W?.abort(), W = typeof AbortController < "u" ? new AbortController() : null, L.value = !0, R.value = null, P.value = [], F.value = null, I.value = null, B.value = null, V.value = null, j.hideMiniPlayer(), !e) {
				R.value = "No media id provided", L.value = !1;
				return;
			}
			try {
				let n = new t({ baseUrl: k.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, W?.signal);
				if (G) return;
				let i = r.item;
				M.value = i, N.value = q(i);
				let a = await n.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, W?.signal).catch(() => null);
				if (G) return;
				P.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					title: e.title ?? void 0
				})), F.value = J(a?.intro_marker), I.value = J(a?.outro_marker), L.value = !1, ce(n, i), ue(n, i);
			} catch (e) {
				if (G || K(e)) return;
				R.value = e instanceof Error ? e.message : "Failed to load media", L.value = !1;
			}
		}
		ae(Q), oe(H, Q), x(() => {
			j.current && j.streamUrl && j.showMiniPlayer();
		}), ie(() => {
			G = !0, W?.abort(), W = null;
		});
		function $() {
			A?.back();
		}
		function de(e) {
			A?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function fe(e) {
			A?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function pe(e) {
			z.value = e;
		}
		return (e, t) => (v(), f("div", { class: g(["player-page", { "is-theater": z.value }]) }, [U.value && !L.value && !R.value ? (v(), f("div", {
			key: 0,
			class: "player-page__ambient",
			style: _(U.value),
			"aria-hidden": "true"
		}, null, 4)) : d("", !0), ne("div", D, [L.value ? (v(), f("div", O, [m(a, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : R.value ? (v(), u(o, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: R.value
		}, {
			actions: b(() => [m(n, {
				variant: "solid",
				onClick: Q
			}, {
				default: b(() => [...t[0] ||= [p("Retry", -1)]]),
				_: 1
			}), m(n, {
				variant: "ghost",
				onClick: $
			}, {
				default: b(() => [...t[1] ||= [p("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : M.value ? (v(), u(ee, {
			key: 2,
			media: M.value,
			"stream-url": N.value,
			"stream-url-for": q,
			"api-base": k.value,
			chapters: P.value,
			"intro-marker": F.value,
			"outro-marker": I.value,
			"prev-episode": B.value,
			"next-episode": V.value,
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
		])) : d("", !0)])], 2));
	}
}), [["__scopeId", "data-v-16429d48"]]);
//#endregion
export { k as default };

//# sourceMappingURL=PlayerPage-dm0GDVq7.js.map