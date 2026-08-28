import { n as e, t } from "./Icon-CkTBN_k5.js";
import { o as n, p as r } from "./client-DA-5QZXw.js";
import { t as i } from "./useAuthStore-vm6oniX7.js";
import { t as a } from "./useImageSrc-KnN1T9Ga.js";
import { t as o } from "./Spinner-COUSlhgo.js";
import { t as s } from "./Modal-Cfz25d3h.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, normalizeClass as _, onBeforeUnmount as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T } from "vue";
//#region src/components/PosterPicker.vue?vue&type=script&setup=true&lang.ts
var E = { class: "poster-picker" }, D = {
	key: 0,
	class: "poster-picker__subject"
}, O = {
	key: 1,
	class: "poster-picker__loading",
	role: "status",
	"aria-busy": "true"
}, k = {
	key: 2,
	class: "poster-picker__state",
	role: "status"
}, ee = {
	key: 3,
	class: "poster-picker__state",
	role: "alert"
}, te = { class: "poster-picker__state-title" }, ne = {
	key: 0,
	class: "poster-picker__apply-error",
	role: "alert"
}, re = { class: "poster-picker__section-title" }, ie = ["aria-label"], ae = ["aria-selected"], oe = [
	"aria-label",
	"disabled",
	"onClick",
	"onPointermove"
], se = ["src", "alt"], ce = {
	key: 1,
	class: "poster-picker__thumb-fallback",
	"aria-hidden": "true"
}, le = {
	key: 0,
	class: "poster-picker__meta numeric"
}, ue = {
	key: 5,
	class: "poster-picker__state",
	role: "status"
}, A = 4, j = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "PosterPicker",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue", "applied"],
	setup(e, { emit: g }) {
		let { imgSrc: j } = a(), M = e, N = g, P = i(), F = b([]), I = b([]), L = b(!1), R = b(!1), z = b(null), B = b(!1), V = b(null), H = b(null), U = b(null), W = b(0), G = b(-1), K = l({
			get: () => M.modelValue,
			set: (e) => N("update:modelValue", e)
		});
		function de(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function q() {
			Y?.abort(), Y = null;
		}
		function J() {
			F.value = [], I.value = [], L.value = !1, R.value = !1, z.value = null, B.value = !1, V.value = null, H.value = null, U.value = null, W.value = 0, G.value = -1;
		}
		function fe(e) {
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
		let Y = null;
		async function pe() {
			if (!M.item) return;
			q();
			let e = typeof AbortController < "u" ? new AbortController() : null;
			Y = e;
			let t = () => Y !== e;
			L.value = !0, R.value = !0, z.value = null, B.value = !1, U.value = null;
			try {
				let n = await P.client.listPosters(M.item.id, e?.signal);
				if (t()) return;
				F.value = n.candidates, I.value = fe(n.candidates), V.value = n.current_poster_url, I.value.length > 0 && I.value[0].candidates.length > 0 && (W.value = 0, G.value = 0);
			} catch (e) {
				if (t() || de(e)) return;
				F.value = [], I.value = [], n(e) ? B.value = !0 : z.value = r(e, "Failed to load posters. Please try again.");
			} finally {
				t() || (L.value = !1);
			}
		}
		async function X(e) {
			if (!(!M.item || H.value)) {
				H.value = e.poster_url, U.value = null;
				try {
					let t = await P.client.setPoster(M.item.id, e.poster_url);
					N("applied", t), K.value = !1;
				} catch (e) {
					n(e) ? B.value = !0 : U.value = r(e, "Could not apply that poster. Please try again.");
				} finally {
					H.value = null;
				}
			}
		}
		function Z(e, t) {
			let n = 0;
			for (let t = 0; t < e; t++) n += I.value[t].candidates.length;
			return n + t;
		}
		function Q(e) {
			let t = 0;
			for (let n = 0; n < I.value.length; n++) {
				let r = I.value[n].candidates.length;
				if (t + r > e) return {
					sectionIdx: n,
					localIdx: e - t
				};
				t += r;
			}
			return {
				sectionIdx: I.value.length - 1,
				localIdx: I.value.at(-1).candidates.length - 1
			};
		}
		function $() {
			if (F.value.length === 0) return;
			let e = G.value, { sectionIdx: t, localIdx: n } = Q(e);
			if (!I.value[t]) return;
			let r = A;
			if (n % r === 0) if (t > 0) {
				let e = I.value[t - 1].candidates.length - 1;
				W.value = t - 1, G.value = Z(t - 1, Math.min(e, e - (3 - n)));
			} else {
				let e = I.value.at(-1), t = Math.floor((e.candidates.length - 1) / r) * r;
				W.value = I.value.length - 1, G.value = Z(I.value.length - 1, t + n % r);
			}
			else G.value = e - 1;
		}
		function me() {
			if (F.value.length === 0) return;
			let e = G.value, { sectionIdx: t, localIdx: n } = Q(e), r = I.value[t];
			if (!r) return;
			let i = A, a = Math.floor(n / i), o = i;
			if (n === a * i + o - 1 || n === r.candidates.length - 1) if (t < I.value.length - 1) {
				let e = I.value[t + 1], r = Math.floor(n / i);
				W.value = t + 1, G.value = Z(t + 1, Math.min(e.candidates.length - 1, r * i + n % i));
			} else W.value = 0, G.value = Z(0, a * i + n % i);
			else G.value = e + 1;
		}
		function he() {
			if (F.value.length === 0) return;
			let e = G.value, { sectionIdx: t, localIdx: n } = Q(e);
			if (!I.value[t]) return;
			let r = A;
			if (n < r) if (t > 0) {
				let e = I.value[t - 1], i = Math.ceil(e.candidates.length / r) - 1;
				W.value = t - 1, G.value = Z(t - 1, Math.min(i * r + n % r, e.candidates.length - 1));
			} else {
				let e = I.value.at(-1), t = Math.ceil(e.candidates.length / r) - 1;
				W.value = I.value.length - 1, G.value = Z(I.value.length - 1, Math.min(t * r + n % r, e.candidates.length - 1));
			}
			else G.value = e - r;
		}
		function ge() {
			if (F.value.length === 0) return;
			let e = G.value, { sectionIdx: t, localIdx: n } = Q(e), r = I.value[t];
			if (!r) return;
			let i = A;
			Math.floor(n / i) >= Math.ceil(r.candidates.length / i) - 1 || n + i >= r.candidates.length ? t < I.value.length - 1 ? (W.value = t + 1, G.value = Z(t + 1, n % i)) : (W.value = 0, G.value = Z(0, n % i)) : G.value = e + i;
		}
		function _e(e) {
			switch (e.key) {
				case "ArrowLeft":
					e.preventDefault(), $();
					break;
				case "ArrowRight":
					e.preventDefault(), me();
					break;
				case "ArrowUp":
					e.preventDefault(), he();
					break;
				case "ArrowDown":
					e.preventDefault(), ge();
					break;
				case "Enter":
				case " ":
					if (e.preventDefault(), G.value >= 0) {
						let e = G.value, { sectionIdx: t, localIdx: n } = Q(e), r = I.value[t]?.candidates[n];
						r && X(r);
					}
					break;
				case "Escape": K.value &&= (e.preventDefault(), !1);
			}
		}
		return w(() => M.modelValue, (e) => {
			e && M.item ? (J(), pe()) : e || (q(), J());
		}, { immediate: !0 }), v(q), (n, r) => (y(), u(s, {
			modelValue: K.value,
			"onUpdate:modelValue": r[0] ||= (e) => K.value = e,
			title: "Choose poster",
			size: "lg",
			onKeydown: _e
		}, {
			default: T(() => [p("div", E, [e.item ? (y(), f("p", D, [r[1] ||= m(" Select a poster for ", -1), p("strong", null, S(e.item.name), 1)])) : d("", !0), L.value ? (y(), f("div", O, [h(o, { label: "Loading posters" })])) : B.value ? (y(), f("div", k, [
				h(t, {
					name: "alert",
					class: "poster-picker__state-icon"
				}),
				r[2] ||= p("p", { class: "poster-picker__state-title" }, "TMDB is not configured", -1),
				r[3] ||= p("p", { class: "poster-picker__state-hint" }, " Configure a TMDB API key in admin settings to search for poster alternatives. ", -1)
			])) : z.value ? (y(), f("div", ee, [h(t, {
				name: "error",
				class: "poster-picker__state-icon"
			}), p("p", te, S(z.value), 1)])) : I.value.length ? (y(), f(c, { key: 4 }, [U.value ? (y(), f("p", ne, S(U.value), 1)) : d("", !0), (y(!0), f(c, null, x(I.value, ({ provider: e, candidates: n }, r) => (y(), f("div", {
				key: e,
				class: "poster-picker__section"
			}, [p("h3", re, S(e), 1), p("ul", {
				class: "poster-picker__grid",
				role: "listbox",
				"aria-label": `${e} posters`
			}, [(y(!0), f(c, null, x(n, (n, i) => (y(), f("li", {
				key: n.poster_url,
				class: "poster-picker__cell",
				role: "option",
				"aria-selected": n.poster_url === V.value
			}, [p("button", {
				type: "button",
				class: _(["poster-picker__thumb", {
					"is-current": n.poster_url === V.value,
					"is-active": Z(r, i) === G.value,
					"is-applying": H.value === n.poster_url
				}]),
				"aria-label": `${e} poster${n.poster_url === V.value ? " (current)" : ""}`,
				disabled: H.value !== null && H.value !== n.poster_url,
				onClick: (e) => void X(n),
				onPointermove: (e) => G.value = Z(r, i)
			}, [n.poster_url ? (y(), f("img", {
				key: 0,
				src: C(j)(n.poster_url),
				alt: `${e} poster`,
				loading: "lazy",
				decoding: "async"
			}, null, 8, se)) : (y(), f("div", ce, [h(t, { name: "image" })]))], 42, oe), n.vote_average == null ? d("", !0) : (y(), f("div", le, S(n.vote_average.toFixed(1)), 1))], 8, ae))), 128))], 8, ie)]))), 128))], 64)) : R.value && !L.value && I.value.length === 0 ? (y(), f("div", ue, [
				h(t, {
					name: "image",
					class: "poster-picker__state-icon"
				}),
				r[4] ||= p("p", { class: "poster-picker__state-title" }, "No posters available", -1),
				r[5] ||= p("p", { class: "poster-picker__state-hint" }, "No poster alternatives were found for this item.", -1)
			])) : d("", !0)])]),
			_: 1
		}, 8, ["modelValue"]));
	}
}), [["__scopeId", "data-v-a5e148a6"]]);
//#endregion
export { j as t };

//# sourceMappingURL=PosterPicker-C6eLSaIm.js.map