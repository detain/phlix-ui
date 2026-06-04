import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n } from "./Button-BwQkyEkr.js";
import { n as r, o as i } from "./media-query-D1H7YKGl.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o, t as s } from "./EmptyState-Ds4WcVdG.js";
import { t as c } from "./MediaDetail-CnFev6XD.js";
import { computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, onBeforeUnmount as v, onMounted as y, openBlock as b, ref as x, watch as S, withCtx as C } from "vue";
import { useRoute as w, useRouter as T } from "vue-router";
//#region src/pages/MediaDetailPage.vue?vue&type=script&setup=true&lang.ts
var E = { class: "media-detail-page" }, D = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, O = { class: "media-detail-page__loading-hero" }, k = { class: "media-detail-page__loading-info" }, A = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "MediaDetailPage",
	setup(e) {
		let g = _("apiBase", ""), A = l(() => typeof g == "string" ? g : g?.value ?? ""), j = w(), M = T(), N = i(), P = a(), F = x(null), I = x([]), L = x(!0), R = x(!1), z = x(null), B = l(() => String(j.params.id ?? "")), V = l(() => N.resumePositionFor(B.value)), H = null, U = !1;
		function W(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function G(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				I.value = [];
				return;
			}
			let i = H, a = () => U || i !== H;
			R.value = !0;
			try {
				let o = r(A.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				I.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || W(e)) return;
				I.value = [];
			} finally {
				a() || (R.value = !1);
			}
		}
		async function K() {
			let e = B.value;
			if (H?.abort(), H = typeof AbortController < "u" ? new AbortController() : null, L.value = !0, z.value = null, I.value = [], !e) {
				z.value = "No media id provided", L.value = !1;
				return;
			}
			try {
				let n = new t({ baseUrl: A.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, H?.signal);
				if (U) return;
				let i = r.item;
				F.value = i, L.value = !1, G(n, i);
			} catch (e) {
				if (U || W(e)) return;
				z.value = e instanceof Error ? e.message : "Failed to load title", L.value = !1;
			}
		}
		y(K), S(B, K), v(() => {
			U = !0, H?.abort(), H = null;
		});
		function q(e, t) {
			M?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function J(e) {
			q("player", e.id);
		}
		function Y(e) {
			P.success(`Added "${e.name}" to your list`);
		}
		function X(e) {
			q("media", e.id);
		}
		function Z() {
			M?.back();
		}
		return (e, t) => (b(), f("div", E, [L.value ? (b(), f("div", D, [p("div", O, [h(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), p("div", k, [
			h(o, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			h(o, {
				variant: "text",
				lines: 4
			}),
			h(o, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : z.value ? (b(), u(s, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: z.value
		}, {
			actions: C(() => [h(n, {
				variant: "solid",
				onClick: K
			}, {
				default: C(() => [...t[0] ||= [m("Retry", -1)]]),
				_: 1
			}), h(n, {
				variant: "ghost",
				onClick: Z
			}, {
				default: C(() => [...t[1] ||= [m("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : F.value ? (b(), u(c, {
			key: 2,
			item: F.value,
			"resume-seconds": V.value,
			similar: I.value,
			"similar-loading": R.value,
			onPlay: J,
			onResume: J,
			onWatchlist: Y,
			onInfo: X,
			onBack: Z
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : d("", !0)]));
	}
}), [["__scopeId", "data-v-fed98d0c"]]);
//#endregion
export { A as default };

//# sourceMappingURL=MediaDetailPage-DJx8mO5c.js.map