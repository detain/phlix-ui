import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./useMessages-CrbiNZLy.js";
import { t as r, x as i } from "./client-fSGeXil2.js";
import { r as a } from "./useProfileStore-CrXK55mb.js";
import { t as o } from "./useToastStore-CxO_ppM8.js";
import { t as s } from "./Tooltip-CaS-pDMB.js";
import { computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createVNode as p, defineComponent as m, normalizeClass as h, openBlock as g, ref as _, watch as v, withCtx as y } from "vue";
import { defineStore as b } from "pinia";
// src/stores/useUserItemDataStore.ts
var x = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), S = b("user-item-data", () => {
	let e = _(/* @__PURE__ */ new Map()), t = a();
	v(() => t.epoch, () => {
		e.value = /* @__PURE__ */ new Map(), m.clear();
	});
	let { t: s } = n(), c = null;
	function l(e) {
		return c ? c.setBaseUrl(e) : c = new r({ baseUrl: e }), c;
	}
	function u(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function d(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function f(t) {
		return e.value.get(t)?.watched ?? !1;
	}
	function p(t) {
		return e.value.get(t) ?? { ...x };
	}
	let m = /* @__PURE__ */ new Map();
	function h(e, t) {
		let n = m.get(e) ?? { ...x };
		m.set(e, {
			...n,
			...t
		});
	}
	function g(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data, r = {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0,
			watched: n?.watched ?? !1
		};
		e.value.set(t.id, r), m.set(t.id, { ...r });
	}
	function y(t, n) {
		let r = e.value.get(t) ?? { ...x };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function b(e, t) {
		let n = u(e), r = !n;
		y(e, { favorite: r });
		try {
			let n = l(t);
			r ? await n.addFavorite(e) : await n.removeFavorite(e), h(e, { favorite: r });
		} catch (t) {
			let a = m.get(e);
			y(e, { favorite: a ? a.favorite : n });
			let c = s(r ? "itemActions.favoriteAddError" : "itemActions.favoriteRemoveError");
			o().error(`${c}: ${i(t)}`);
		}
	}
	async function S(e, t) {
		let n = f(e), r = !n;
		y(e, { watched: r });
		try {
			let n = l(t);
			r ? await n.markWatched(e) : await n.markUnwatched(e), h(e, { watched: r });
		} catch (t) {
			let a = m.get(e);
			y(e, { watched: a ? a.watched : n });
			let c = s(r ? "itemActions.markWatchedError" : "itemActions.markUnwatchedError");
			o().error(`${c}: ${i(t)}`);
		}
	}
	async function C(e, t, n) {
		let r = Math.trunc(Number(t));
		Number.isFinite(r) || (r = 0), r < -2 && (r = -2), r > 2 && (r = 2);
		let a = d(e);
		y(e, { like_level: r });
		try {
			await l(n).setLikeLevel(e, r), h(e, { like_level: r });
		} catch (t) {
			let n = m.get(e);
			y(e, { like_level: n ? n.like_level : a }), o().error(`${s("itemActions.ratingSaveError")}: ${i(t)}`);
		}
	}
	function w() {
		e.value = /* @__PURE__ */ new Map(), m.clear(), c = null;
	}
	return {
		entries: e,
		isFavorite: u,
		likeLevel: d,
		isWatched: f,
		get: p,
		hydrate: g,
		toggleFavorite: b,
		toggleWatched: S,
		setLike: C,
		reset: w
	};
}), C = ["data-level"], w = ["disabled", "aria-pressed"], T = ["disabled", "aria-pressed"], E = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "ThumbRating",
	props: {
		level: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["cycle", "update:level"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = c(() => {
			let e = Math.trunc(Number(r.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), o = c(() => a.value >= 0), m = c(() => a.value <= 0), _ = c(() => a.value >= 1), v = c(() => a.value === 2), b = c(() => a.value <= -1), x = c(() => a.value === -2);
		function S() {
			return a.value <= 0 ? 1 : a.value === 1 ? 2 : 0;
		}
		function E() {
			return a.value >= 0 ? -1 : a.value === -1 ? -2 : 0;
		}
		function D() {
			if (r.disabled) return;
			let e = S();
			i("cycle", e), i("update:level", e);
		}
		function O() {
			if (r.disabled) return;
			let e = E();
			i("cycle", e), i("update:level", e);
		}
		return (n, r) => (g(), d("div", {
			class: "thumb-rating",
			"data-level": a.value
		}, [o.value ? (g(), l(s, {
			key: 0,
			text: "Like"
		}, {
			default: y(() => [f("button", {
				type: "button",
				class: h(["thumb-rating__btn thumb-rating__btn--up", {
					"is-filled": _.value,
					"is-blue": v.value
				}]),
				disabled: e.disabled,
				"aria-label": "Like",
				"aria-pressed": _.value ? "true" : "false",
				onClick: D
			}, [p(t, {
				name: "thumbs-up",
				class: "thumb-rating__icon"
			})], 10, w)]),
			_: 1
		})) : u("", !0), m.value ? (g(), l(s, {
			key: 1,
			text: "Dislike"
		}, {
			default: y(() => [f("button", {
				type: "button",
				class: h(["thumb-rating__btn thumb-rating__btn--down", {
					"is-filled": b.value,
					"is-blue": x.value
				}]),
				disabled: e.disabled,
				"aria-label": "Dislike",
				"aria-pressed": b.value ? "true" : "false",
				onClick: O
			}, [p(t, {
				name: "thumbs-down",
				class: "thumb-rating__icon"
			})], 10, T)]),
			_: 1
		})) : u("", !0)], 8, C));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
export { S as n, E as t };

//# sourceMappingURL=ThumbRating-B54fV0hD.js.map