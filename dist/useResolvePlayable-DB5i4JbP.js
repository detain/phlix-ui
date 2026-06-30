import { n as e, t } from "./Icon-ax5k7_G2.js";
import { a as n, f as r } from "./client-DbgRjcPy.js";
import { t as i } from "./useAuthStore-QV6aasUN.js";
import { t as a } from "./Modal-DEuPeh-g.js";
import { o } from "./MetadataMatchModal-AkbKHiG3.js";
import { n as s } from "./episode-order-BMC9lH44.js";
import { t as c } from "./useSeriesSeasons-ezSOXOgO.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, onBeforeUnmount as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, watch as ee, withCtx as te } from "vue";
//#region src/components/PosterPicker.vue?vue&type=script&setup=true&lang.ts
var ne = { class: "poster-picker" }, re = {
	key: 0,
	class: "poster-picker__subject"
}, ie = {
	key: 1,
	class: "poster-picker__loading",
	role: "status",
	"aria-busy": "true"
}, w = {
	key: 2,
	class: "poster-picker__state",
	role: "status"
}, T = {
	key: 3,
	class: "poster-picker__state",
	role: "alert"
}, E = { class: "poster-picker__state-title" }, D = {
	key: 0,
	class: "poster-picker__apply-error",
	role: "alert"
}, O = { class: "poster-picker__section-title" }, k = ["aria-label"], A = ["aria-selected"], j = [
	"aria-label",
	"disabled",
	"onClick",
	"onPointermove"
], M = ["src", "alt"], N = {
	key: 1,
	class: "poster-picker__thumb-fallback",
	"aria-hidden": "true"
}, ae = {
	key: 0,
	class: "poster-picker__meta numeric"
}, oe = {
	key: 5,
	class: "poster-picker__state",
	role: "status"
}, P = 4, F = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "PosterPicker",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: s }) {
		let c = e, _ = s, F = i(), I = x([]), L = x([]), R = x(!1), z = x(!1), B = x(null), V = x(!1), H = x(null), U = x(null), W = x(null), G = x(0), K = x(-1), q = u({
			get: () => c.modelValue,
			set: (e) => _("update:modelValue", e)
		});
		function se(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J() {
			X?.abort(), X = null;
		}
		function Y() {
			I.value = [], L.value = [], R.value = !1, z.value = !1, B.value = null, V.value = !1, H.value = null, U.value = null, W.value = null, G.value = 0, K.value = -1;
		}
		function ce(e) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e) {
				if (!n.poster_url) continue;
				let e = t.get(n.provider) ?? [];
				e.push(n), t.set(n.provider, e);
			}
			let n = (e) => {
				let t = e.filter((e) => e.width != null && e.height != null);
				return t.length > 0 ? t.sort((e, t) => (t.votes ?? 0) - (e.votes ?? 0))[0] : e.sort((e, t) => (t.vote_average ?? 0) - (e.vote_average ?? 0))[0];
			};
			return Array.from(t.entries()).map(([e, t]) => ({
				provider: e,
				candidates: [n(t)]
			})).sort((e, t) => e.provider === "tmdb" ? -1 : t.provider === "tmdb" ? 1 : e.provider.localeCompare(t.provider));
		}
		let X = null;
		async function le() {
			if (!c.item) return;
			J();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			X = e;
			let t = () => X !== e;
			R.value = !0, z.value = !0, B.value = null, V.value = !1, W.value = null;
			try {
				let n = await F.client.listPosters(c.item.id, e?.signal);
				if (t()) return;
				I.value = n.candidates, L.value = ce(n.candidates), H.value = n.current_poster_url, L.value.length > 0 && L.value[0].candidates.length > 0 && (G.value = 0, K.value = 0);
			} catch (e) {
				if (t() || se(e)) return;
				I.value = [], L.value = [], n(e) ? V.value = !0 : B.value = r(e, "Failed to load posters. Please try again.");
			} finally {
				t() || (R.value = !1);
			}
		}
		async function Z(e) {
			if (!(!c.item || U.value)) {
				U.value = e.poster_url, W.value = null;
				try {
					_("applied", await F.client.setPoster(c.item.id, e.poster_url)), q.value = !1;
				} catch (e) {
					n(e) ? V.value = !0 : W.value = r(e, "Could not apply that poster. Please try again.");
				} finally {
					U.value = null;
				}
			}
		}
		function Q(e, t) {
			let n = 0;
			for (let t = 0; t < e; t++) n += L.value[t].candidates.length;
			return n + t;
		}
		function $(e) {
			let t = 0;
			for (let n = 0; n < L.value.length; n++) {
				let r = L.value[n].candidates.length;
				if (t + r > e) return {
					sectionIdx: n,
					localIdx: e - t
				};
				t += r;
			}
			return {
				sectionIdx: L.value.length - 1,
				localIdx: L.value.at(-1).candidates.length - 1
			};
		}
		function ue() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e);
			if (!L.value[t]) return;
			let r = P;
			if (n % r === 0) if (t > 0) {
				let e = L.value[t - 1].candidates.length - 1;
				G.value = t - 1, K.value = Q(t - 1, Math.min(e, e - (r - 1 - n)));
			} else {
				let e = L.value.at(-1), t = Math.floor((e.candidates.length - 1) / r) * r;
				G.value = L.value.length - 1, K.value = Q(L.value.length - 1, t + n % r);
			}
			else K.value = e - 1;
		}
		function de() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e), r = L.value[t];
			if (!r) return;
			let i = P, a = Math.floor(n / i), o = i;
			if (n === a * i + o - 1 || n === r.candidates.length - 1) if (t < L.value.length - 1) {
				let e = L.value[t + 1], r = Math.floor(n / i);
				G.value = t + 1, K.value = Q(t + 1, Math.min(e.candidates.length - 1, r * i + n % i));
			} else G.value = 0, K.value = Q(0, a * i + n % i);
			else K.value = e + 1;
		}
		function fe() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e);
			if (!L.value[t]) return;
			let r = P;
			if (n < r) if (t > 0) {
				let e = L.value[t - 1], i = Math.ceil(e.candidates.length / r) - 1;
				G.value = t - 1, K.value = Q(t - 1, Math.min(i * r + n % r, e.candidates.length - 1));
			} else {
				let e = L.value.at(-1), t = Math.ceil(e.candidates.length / r) - 1;
				G.value = L.value.length - 1, K.value = Q(L.value.length - 1, Math.min(t * r + n % r, e.candidates.length - 1));
			}
			else K.value = e - r;
		}
		function pe() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e), r = L.value[t];
			if (!r) return;
			let i = P;
			Math.floor(n / i) >= Math.ceil(r.candidates.length / i) - 1 || n + i >= r.candidates.length ? t < L.value.length - 1 ? (G.value = t + 1, K.value = Q(t + 1, n % i)) : (G.value = 0, K.value = Q(0, n % i)) : K.value = e + i;
		}
		function me(e) {
			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault(), ue();
					break;
				case "ArrowRight":
					e.preventDefault(), de();
					break;
				case "ArrowUp":
					e.preventDefault(), fe();
					break;
				case "ArrowDown":
					e.preventDefault(), pe();
					break;
				case "Enter":
				case " ":
					if (e.preventDefault(), K.value >= 0) {
						let e = K.value, { sectionIdx: t, localIdx: n } = $(e), r = L.value[t]?.candidates[n];
						r && Z(r);
					}
					break;
				case "Escape":
					q.value &&= (e.preventDefault(), !1);
					break;
			}
		}
		return ee(() => c.modelValue, (e) => {
			e && c.item ? (Y(), le()) : e || (J(), Y());
		}, { immediate: !0 }), y(J), (n, r) => (b(), d(a, {
			modelValue: q.value,
			"onUpdate:modelValue": r[0] ||= (e) => q.value = e,
			title: "Choose poster",
			size: "lg",
			onKeydown: me
		}, {
			default: te(() => [m("div", ne, [e.item ? (b(), p("p", re, [r[1] ||= h(" Select a poster for ", -1), m("strong", null, C(e.item.name), 1)])) : f("", !0), R.value ? (b(), p("div", ie, [g(o, { label: "Loading posters" })])) : V.value ? (b(), p("div", w, [
				g(t, {
					name: "alert",
					class: "poster-picker__state-icon"
				}),
				r[2] ||= m("p", { class: "poster-picker__state-title" }, "TMDB is not configured", -1),
				r[3] ||= m("p", { class: "poster-picker__state-hint" }, " Configure a TMDB API key in admin settings to search for poster alternatives. ", -1)
			])) : B.value ? (b(), p("div", T, [g(t, {
				name: "error",
				class: "poster-picker__state-icon"
			}), m("p", E, C(B.value), 1)])) : L.value.length ? (b(), p(l, { key: 4 }, [W.value ? (b(), p("p", D, C(W.value), 1)) : f("", !0), (b(!0), p(l, null, S(L.value, ({ provider: e, candidates: n }, r) => (b(), p("div", {
				key: e,
				class: "poster-picker__section"
			}, [m("h3", O, C(e), 1), m("ul", {
				class: "poster-picker__grid",
				role: "listbox",
				"aria-label": `${e} posters`
			}, [(b(!0), p(l, null, S(n, (n, i) => (b(), p("li", {
				key: n.poster_url,
				class: "poster-picker__cell",
				role: "option",
				"aria-selected": n.poster_url === H.value
			}, [m("button", {
				type: "button",
				class: v(["poster-picker__thumb", {
					"is-current": n.poster_url === H.value,
					"is-active": Q(r, i) === K.value,
					"is-applying": U.value === n.poster_url
				}]),
				"aria-label": `${e} poster${n.poster_url === H.value ? " (current)" : ""}`,
				disabled: U.value !== null && U.value !== n.poster_url,
				onClick: (e) => void Z(n),
				onPointermove: (e) => K.value = Q(r, i)
			}, [n.poster_url ? (b(), p("img", {
				key: 0,
				src: n.poster_url,
				alt: `${e} poster`,
				loading: "lazy",
				decoding: "async"
			}, null, 8, M)) : (b(), p("div", N, [g(t, { name: "image" })]))], 42, j), n.vote_average == null ? f("", !0) : (b(), p("div", ae, C(n.vote_average.toFixed(1)), 1))], 8, A))), 128))], 8, k)]))), 128))], 64)) : z.value && !R.value && L.value.length === 0 ? (b(), p("div", oe, [
				g(t, {
					name: "image",
					class: "poster-picker__state-icon"
				}),
				r[4] ||= m("p", { class: "poster-picker__state-title" }, "No posters available", -1),
				r[5] ||= m("p", { class: "poster-picker__state-hint" }, "No poster alternatives were found for this item.", -1)
			])) : f("", !0)])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), [["__scopeId", "data-v-1c31ea1d"]]);
//#endregion
//#region src/composables/useResolvePlayable.ts
function I(e, t) {
	return (e[t] ?? 0) > 0;
}
function L(e, t) {
	let n = s(e.flatMap((e) => e.episodes));
	return n.length === 0 ? null : n.find((e) => I(t, e.id)) ?? n[0];
}
async function R(e, t, n, r, i) {
	return n.type === "series" || n.type === "season" ? L(await c(e, t, n.id, i), r) : n;
}
//#endregion
export { R as n, F as r, L as t };

//# sourceMappingURL=useResolvePlayable-DB5i4JbP.js.map