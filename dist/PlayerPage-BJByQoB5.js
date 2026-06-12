import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-BwQkyEkr.js";
import { i as r } from "./usePlayerStore-Cffo63UC.js";
import { i } from "./usePageTitle-BO3GGF3M.js";
import { t as a } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { n as s } from "./media-query-BcVLE7J6.js";
import { t as c } from "./Player-wN5cxlZE.js";
import { computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, normalizeClass as v, normalizeStyle as y, onBeforeUnmount as b, onMounted as x, openBlock as S, ref as C, watch as w, withCtx as T } from "vue";
import { onBeforeRouteLeave as E, useRoute as D, useRouter as O } from "vue-router";
//#region src/pages/PlayerPage.vue?vue&type=script&setup=true&lang.ts
var k = { class: "player-page__stage" }, A = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, j = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "PlayerPage",
	setup(e) {
		let g = _("apiBase", ""), j = l(() => typeof g == "string" ? g : g?.value ?? ""), M = D(), N = O(), P = r(), F = C(null), I = C(""), L = C([]), R = C(null), z = C(null), B = C(!0), V = C(null), H = C(!1), U = l(() => String(M.params.id ?? ""));
		i(() => F.value?.name);
		let W = l(() => {
			let e = F.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), G = null, K = !1;
		function q(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J(e) {
			return `${j.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		function Y(e) {
			return e ? {
				start: e.start_seconds,
				end: e.end_seconds
			} : null;
		}
		async function X(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				P.setQueue([]);
				return;
			}
			let r = G, i = () => K || r !== G;
			try {
				let a = s(j.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), o = await e.get(a, void 0, r?.signal);
				if (i()) return;
				P.setQueue((o.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (i() || q(e)) return;
				P.setQueue([]);
			}
		}
		async function Z() {
			let e = U.value;
			if (G?.abort(), G = typeof AbortController < "u" ? new AbortController() : null, B.value = !0, V.value = null, L.value = [], R.value = null, z.value = null, P.hideMiniPlayer(), !e) {
				V.value = "No media id provided", B.value = !1;
				return;
			}
			try {
				let n = new t({ baseUrl: j.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, G?.signal);
				if (K) return;
				let i = r.item;
				F.value = i, I.value = J(i);
				let a = await n.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, G?.signal).catch(() => null);
				if (K) return;
				L.value = (a?.chapters ?? []).map((e) => ({
					start: e.start_seconds,
					title: e.title ?? void 0
				})), R.value = Y(a?.intro_marker), z.value = Y(a?.outro_marker), B.value = !1, X(n, i);
			} catch (e) {
				if (K || q(e)) return;
				V.value = e instanceof Error ? e.message : "Failed to load media", B.value = !1;
			}
		}
		x(Z), w(U, Z), E(() => {
			P.current && P.streamUrl && P.showMiniPlayer();
		}), b(() => {
			K = !0, G?.abort(), G = null;
		});
		function Q() {
			N?.back();
		}
		function $(e) {
			N?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function ee(e) {
			H.value = e;
		}
		return (e, t) => (S(), f("div", { class: v(["player-page", { "is-theater": H.value }]) }, [W.value && !B.value && !V.value ? (S(), f("div", {
			key: 0,
			class: "player-page__ambient",
			style: y(W.value),
			"aria-hidden": "true"
		}, null, 4)) : d("", !0), p("div", k, [B.value ? (S(), f("div", A, [h(a, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : V.value ? (S(), u(o, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: V.value
		}, {
			actions: T(() => [h(n, {
				variant: "solid",
				onClick: Z
			}, {
				default: T(() => [...t[0] ||= [m("Retry", -1)]]),
				_: 1
			}), h(n, {
				variant: "ghost",
				onClick: Q
			}, {
				default: T(() => [...t[1] ||= [m("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : F.value ? (S(), u(c, {
			key: 2,
			media: F.value,
			"stream-url": I.value,
			"stream-url-for": J,
			"api-base": j.value,
			chapters: L.value,
			"intro-marker": R.value,
			"outro-marker": z.value,
			onBack: Q,
			onPlayNext: $,
			onTheater: ee
		}, null, 8, [
			"media",
			"stream-url",
			"api-base",
			"chapters",
			"intro-marker",
			"outro-marker"
		])) : d("", !0)])], 2));
	}
}), [["__scopeId", "data-v-4b9ffea6"]]);
//#endregion
export { j as default };

//# sourceMappingURL=PlayerPage-BJByQoB5.js.map