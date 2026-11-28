import { T as e, c as t } from "./client-Bmlfq3Uy.js";
import { t as n } from "./useAuthStore-CyWIJiYx.js";
import { t as r } from "./Modal-BDNcHIOo.js";
import { n as i, t as a } from "./Icon-55iG1rR7.js";
import { t as o } from "./Spinner-DMh6fVJr.js";
import { t as s } from "./useImageSrc-CSM61b-l.js";
import { t as c } from "./useMessages-vcPOKXXR.js";
import { Fragment as l, computed as ee, createBlock as te, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createVNode as p, defineComponent as m, normalizeClass as h, onBeforeUnmount as ne, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, watch as re, withCtx as ie } from "vue";
// src/components/PosterPicker.vue?vue&type=script&setup=true&lang.ts
var x = { class: "poster-picker" }, ae = {
	key: 0,
	class: "poster-picker__subject"
}, oe = {
	key: 1,
	class: "poster-picker__loading",
	role: "status",
	"aria-busy": "true"
}, se = {
	key: 2,
	class: "poster-picker__state",
	role: "status"
}, S = { class: "poster-picker__state-title" }, C = { class: "poster-picker__state-hint" }, w = {
	key: 3,
	class: "poster-picker__state",
	role: "alert"
}, T = { class: "poster-picker__state-title" }, E = {
	key: 0,
	class: "poster-picker__apply-error",
	role: "alert"
}, D = { class: "poster-picker__section-title" }, O = ["aria-label"], ce = ["aria-selected"], le = [
	"aria-label",
	"disabled",
	"onClick",
	"onPointermove"
], ue = ["src", "alt"], de = {
	key: 1,
	class: "poster-picker__thumb-fallback",
	"aria-hidden": "true"
}, fe = {
	key: 0,
	class: "poster-picker__meta numeric"
}, pe = {
	key: 5,
	class: "poster-picker__state",
	role: "status"
}, me = { class: "poster-picker__state-title" }, k = { class: "poster-picker__state-hint" }, A = 4, j = /*#__PURE__*/ i(/* @__PURE__ */ m({
	__name: "PosterPicker",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(i, { emit: m }) {
		let { imgSrc: j } = s(), M = i, N = m, P = n(), { t: F } = c(), I = _([]), L = _([]), R = _(!1), z = _(!1), B = _(null), V = _(!1), H = _(null), U = _(null), W = _(null), G = _(0), K = _(-1), q = ee({
			get: () => M.modelValue,
			set: (e) => N("update:modelValue", e)
		});
		function he(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function J() {
			X?.abort(), X = null;
		}
		function Y() {
			I.value = [], L.value = [], R.value = !1, z.value = !1, B.value = null, V.value = !1, H.value = null, U.value = null, W.value = null, G.value = 0, K.value = -1;
		}
		function ge(e) {
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
		async function _e() {
			if (!M.item) return;
			J();
			let n = typeof AbortController < "u" ? new AbortController() : null;
			X = n;
			let r = () => X !== n;
			R.value = !0, z.value = !0, B.value = null, V.value = !1, W.value = null;
			try {
				let e = await P.client.listPosters(M.item.id, n?.signal);
				if (r()) return;
				I.value = e.candidates, L.value = ge(e.candidates), H.value = e.current_poster_url, L.value.length > 0 && L.value[0].candidates.length > 0 && (G.value = 0, K.value = 0);
			} catch (n) {
				if (r() || he(n)) return;
				I.value = [], L.value = [], t(n) ? V.value = !0 : B.value = e(n, "Failed to load posters. Please try again.");
			} finally {
				r() || (R.value = !1);
			}
		}
		async function Z(n) {
			if (M.item && !U.value) {
				U.value = n.poster_url, W.value = null;
				try {
					let e = await P.client.setPoster(M.item.id, n.poster_url);
					N("applied", e), q.value = !1;
				} catch (n) {
					t(n) ? V.value = !0 : W.value = e(n, "Could not apply that poster. Please try again.");
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
		function ve() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e);
			if (!L.value[t]) return;
			let r = A;
			if (n % r === 0) {
				if (t > 0) {
					let e = L.value[t - 1].candidates.length - 1;
					G.value = t - 1, K.value = Q(t - 1, Math.min(e, e - (3 - n)));
				} else {
					let e = L.value.at(-1), t = Math.floor((e.candidates.length - 1) / r) * r;
					G.value = L.value.length - 1, K.value = Q(L.value.length - 1, t + n % r);
				}
			} else K.value = e - 1;
		}
		function ye() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e), r = L.value[t];
			if (!r) return;
			let i = A, a = Math.floor(n / i), o = i;
			if (n === a * i + o - 1 || n === r.candidates.length - 1) {
				if (t < L.value.length - 1) {
					let e = L.value[t + 1], r = Math.floor(n / i);
					G.value = t + 1, K.value = Q(t + 1, Math.min(e.candidates.length - 1, r * i + n % i));
				} else G.value = 0, K.value = Q(0, a * i + n % i);
			} else K.value = e + 1;
		}
		function be() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e);
			if (!L.value[t]) return;
			let r = A;
			if (n < r) {
				if (t > 0) {
					let e = L.value[t - 1], i = Math.ceil(e.candidates.length / r) - 1;
					G.value = t - 1, K.value = Q(t - 1, Math.min(i * r + n % r, e.candidates.length - 1));
				} else {
					let e = L.value.at(-1), t = Math.ceil(e.candidates.length / r) - 1;
					G.value = L.value.length - 1, K.value = Q(L.value.length - 1, Math.min(t * r + n % r, e.candidates.length - 1));
				}
			} else K.value = e - r;
		}
		function xe() {
			if (I.value.length === 0) return;
			let e = K.value, { sectionIdx: t, localIdx: n } = $(e), r = L.value[t];
			if (!r) return;
			let i = A;
			Math.floor(n / i) >= Math.ceil(r.candidates.length / i) - 1 || n + i >= r.candidates.length ? t < L.value.length - 1 ? (G.value = t + 1, K.value = Q(t + 1, n % i)) : (G.value = 0, K.value = Q(0, n % i)) : K.value = e + i;
		}
		function Se(e) {
			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault(), ve();
					break;
				case "ArrowRight":
					e.preventDefault(), ye();
					break;
				case "ArrowUp":
					e.preventDefault(), be();
					break;
				case "ArrowDown":
					e.preventDefault(), xe();
					break;
				case "Enter":
				case " ":
					if (e.preventDefault(), K.value >= 0) {
						let e = K.value, { sectionIdx: t, localIdx: n } = $(e), r = L.value[t]?.candidates[n];
						r && Z(r);
					}
					break;
				case "Escape": q.value &&= (e.preventDefault(), !1);
			}
		}
		return re(() => M.modelValue, (e) => {
			e && M.item ? (Y(), _e()) : e || (J(), Y());
		}, { immediate: !0 }), ne(J), (e, t) => (g(), te(r, {
			modelValue: q.value,
			"onUpdate:modelValue": t[0] ||= (e) => q.value = e,
			title: b(F)("media.choosePoster"),
			size: "lg",
			onKeydown: Se
		}, {
			default: ie(() => [f("div", x, [i.item ? (g(), d("p", ae, y(b(F)("media.posterSubject", { name: i.item.name })), 1)) : u("", !0), R.value ? (g(), d("div", oe, [p(o, { label: b(F)("media.loadingPosters") }, null, 8, ["label"])])) : V.value ? (g(), d("div", se, [
				p(a, {
					name: "alert",
					class: "poster-picker__state-icon"
				}),
				f("p", S, y(b(F)("media.tmdbNotConfigured")), 1),
				f("p", C, y(b(F)("media.tmdbPosterHint")), 1)
			])) : B.value ? (g(), d("div", w, [p(a, {
				name: "error",
				class: "poster-picker__state-icon"
			}), f("p", T, y(B.value), 1)])) : L.value.length ? (g(), d(l, { key: 4 }, [W.value ? (g(), d("p", E, y(W.value), 1)) : u("", !0), (g(!0), d(l, null, v(L.value, ({ provider: e, candidates: t }, n) => (g(), d("div", {
				key: e,
				class: "poster-picker__section"
			}, [f("h3", D, y(e), 1), f("ul", {
				class: "poster-picker__grid",
				role: "listbox",
				"aria-label": b(F)("media.postersAlt", { provider: e })
			}, [(g(!0), d(l, null, v(t, (t, r) => (g(), d("li", {
				key: t.poster_url,
				class: "poster-picker__cell",
				role: "option",
				"aria-selected": t.poster_url === H.value
			}, [f("button", {
				type: "button",
				class: h(["poster-picker__thumb", {
					"is-current": t.poster_url === H.value,
					"is-active": Q(n, r) === K.value,
					"is-applying": U.value === t.poster_url
				}]),
				"aria-label": t.poster_url === H.value ? b(F)("media.posterAltCurrent", { provider: e }) : b(F)("media.posterAlt", { provider: e }),
				disabled: U.value !== null && U.value !== t.poster_url,
				onClick: (e) => void Z(t),
				onPointermove: (e) => K.value = Q(n, r)
			}, [t.poster_url ? (g(), d("img", {
				key: 0,
				src: b(j)(t.poster_url),
				alt: b(F)("media.posterAlt", { provider: e }),
				loading: "lazy",
				decoding: "async"
			}, null, 8, ue)) : (g(), d("div", de, [p(a, { name: "image" })]))], 42, le), t.vote_average == null ? u("", !0) : (g(), d("div", fe, y(t.vote_average.toFixed(1)), 1))], 8, ce))), 128))], 8, O)]))), 128))], 64)) : z.value && !R.value && L.value.length === 0 ? (g(), d("div", pe, [
				p(a, {
					name: "image",
					class: "poster-picker__state-icon"
				}),
				f("p", me, y(b(F)("media.noPosters")), 1),
				f("p", k, y(b(F)("media.noPostersHint")), 1)
			])) : u("", !0)])]),
			_: 1
		}, 8, ["modelValue", "title"]));
	}
}), [["__scopeId", "data-v-450d0d54"]]);
export { j as t };

//# sourceMappingURL=PosterPicker-D2O4VoxD.js.map