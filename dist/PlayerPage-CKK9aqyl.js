import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-BwQkyEkr.js";
import { i as r } from "./usePlayerStore-Cffo63UC.js";
import { t as i } from "./Skeleton-DkSoWF3C.js";
import { t as a } from "./EmptyState-B2QnGIQT.js";
import { n as o } from "./media-query-BcVLE7J6.js";
import { t as s } from "./Player-wN5cxlZE.js";
import { computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, normalizeClass as _, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, openBlock as x, ref as S, watch as C, withCtx as w } from "vue";
import { onBeforeRouteLeave as T, useRoute as E, useRouter as D } from "vue-router";
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var O = { class: "player-page__stage" }, k = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, A = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "PlayerPage",
	setup(e) {
		let h = g("apiBase", ""), A = c(() => typeof h == "string" ? h : h?.value ?? ""), j = E(), M = D(), N = r(), P = S(null), F = S(""), I = S([]), L = S(null), R = S(null), z = S(!0), B = S(null), V = S(!1), H = c(() => String(j.params.id ?? "")), U = c(() => {
			let e = P.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), W = null, G = !1;
		function K(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function q(e) {
			return `${A.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function J(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function Y(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				N.setQueue([]);
				return;
			}
			let r = W, i = () => G || r !== W;
			try {
				let a = o(A.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(a, void 0, r?.signal);
				if (i()) return;
				N.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || K(e)) return;
				N.setQueue([]);
			}
		}
		async function X() {
			let e = H.value;
			if (W?.abort(), W = typeof AbortController < "u" ? new AbortController() : null, z.value = !0, B.value = null, I.value = [], L.value = null, R.value = null, N.hideMiniPlayer(), !e) {
				B.value = "No media id provided", z.value = !1;
				return;
			}
			try {
				let n = new t({ baseUrl: A.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, W?.signal);
				if (G) return;
				let i = r.item;
				P.value = i, F.value = q(i);
				let a = await n.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, W?.signal).catch(() => null);
				if (G) return;
				I.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					title: e.title ?? void 0
				})), L.value = J(a?.intro_marker), R.value = J(a?.outro_marker), z.value = !1, Y(n, i);
			} catch (e) {
				if (G || K(e)) return;
				B.value = e instanceof Error ? e.message : "Failed to load media", z.value = !1;
			}
		}
		b(X), C(H, X), T(() => {
			N.current && N.streamUrl && N.showMiniPlayer();
		}), y(() => {
			G = !0, W?.abort(), W = null;
		});
		function Z() {
			M?.back();
		}
		function Q(e) {
			M?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function $(e) {
			V.value = e;
		}
		return (e, t) => (x(), d("div", { class: _(["player-page", { "is-theater": V.value }]) }, [U.value && !z.value && !B.value ? (x(), d("div", {
			key: 0,
			class: "player-page__ambient",
			style: v(U.value),
			"aria-hidden": "true"
		}, null, 4)) : u("", !0), f("div", O, [z.value ? (x(), d("div", k, [m(i, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : B.value ? (x(), l(a, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: B.value
		}, {
			actions: w(() => [m(n, {
				variant: "solid",
				onClick: X
			}, {
				default: w(() => [...t[0] ||= [p("Retry", -1)]]),
				_: 1
			}), m(n, {
				variant: "ghost",
				onClick: Z
			}, {
				default: w(() => [...t[1] ||= [p("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : P.value ? (x(), l(s, {
			key: 2,
			media: P.value,
			"stream-url": F.value,
			"stream-url-for": q,
			"api-base": A.value,
			chapters: I.value,
			"intro-marker": L.value,
			"outro-marker": R.value,
			onBack: Z,
			onPlayNext: Q,
			onTheater: $
		}, null, 8, [
			"media",
			"stream-url",
			"api-base",
			"chapters",
			"intro-marker",
			"outro-marker"
		])) : u("", !0)])], 2));
	}
}), [["__scopeId", "data-v-9468b86d"]]);
//#endregion
export { A as default };

//# sourceMappingURL=PlayerPage-CKK9aqyl.js.map