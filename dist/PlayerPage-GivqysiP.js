import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-GJ9vHE0J.js";
import { a as r, n as i } from "./media-query-DowsWq-z.js";
import { n as a, t as o } from "./EmptyState-Ds4WcVdG.js";
import { t as s } from "./Player-dZWn44lw.js";
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
		let h = g("apiBase", ""), A = c(() => typeof h == "string" ? h : h?.value ?? ""), j = E(), M = D(), N = r(), P = S(null), F = S(""), I = S(!0), L = S(null), R = S(!1), z = c(() => String(j.params.id ?? "")), B = c(() => {
			let e = P.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), V = null, H = !1;
		function U(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function W(e) {
			return `${A.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		async function G(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				N.setQueue([]);
				return;
			}
			let r = V, a = () => H || r !== V;
			try {
				let o = i(A.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r?.signal);
				if (a()) return;
				N.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (a() || U(e)) return;
				N.setQueue([]);
			}
		}
		async function K() {
			let e = z.value;
			if (V?.abort(), V = typeof AbortController < "u" ? new AbortController() : null, I.value = !0, L.value = null, N.hideMiniPlayer(), !e) {
				L.value = "No media id provided", I.value = !1;
				return;
			}
			try {
				let n = new t({ baseUrl: A.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, V?.signal);
				if (H) return;
				P.value = r;
				let i = await n.get(`/api/v1/media/${encodeURIComponent(e)}/playback-info`, void 0, V?.signal).catch(() => null);
				if (H) return;
				F.value = i?.url || W(r), I.value = !1, G(n, r);
			} catch (e) {
				if (H || U(e)) return;
				L.value = e instanceof Error ? e.message : "Failed to load media", I.value = !1;
			}
		}
		b(K), C(z, K), T(() => {
			N.current && N.streamUrl && N.showMiniPlayer();
		}), y(() => {
			H = !0, V?.abort(), V = null;
		});
		function q() {
			M?.back();
		}
		function J(e) {
			M?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function Y(e) {
			R.value = e;
		}
		return (e, t) => (x(), d("div", { class: _(["player-page", { "is-theater": R.value }]) }, [B.value && !I.value && !L.value ? (x(), d("div", {
			key: 0,
			class: "player-page__ambient",
			style: v(B.value),
			"aria-hidden": "true"
		}, null, 4)) : u("", !0), f("div", O, [I.value ? (x(), d("div", k, [m(a, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : L.value ? (x(), l(o, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: L.value
		}, {
			actions: w(() => [m(n, {
				variant: "solid",
				onClick: K
			}, {
				default: w(() => [...t[0] ||= [p("Retry", -1)]]),
				_: 1
			}), m(n, {
				variant: "ghost",
				onClick: q
			}, {
				default: w(() => [...t[1] ||= [p("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : P.value ? (x(), l(s, {
			key: 2,
			media: P.value,
			"stream-url": F.value,
			"stream-url-for": W,
			onBack: q,
			onPlayNext: J,
			onTheater: Y
		}, null, 8, ["media", "stream-url"])) : u("", !0)])], 2));
	}
}), [["__scopeId", "data-v-1b6296b1"]]);
//#endregion
export { A as default };

//# sourceMappingURL=PlayerPage-GivqysiP.js.map