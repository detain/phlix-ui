import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./useMessages-BGVJcrvU.js";
import { T as r, t as i } from "./client-Bmlfq3Uy.js";
import { r as a } from "./useProfileStore-DhT5l1Nj.js";
import { t as o } from "./useToastStore-CxO_ppM8.js";
import { t as s } from "./Tooltip-CaS-pDMB.js";
import { computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createVNode as p, defineComponent as m, normalizeClass as h, openBlock as g, ref as _, unref as v, watch as y, withCtx as b } from "vue";
import { defineStore as x } from "pinia";
// src/stores/useUserItemDataStore.ts
var S = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), C = x("user-item-data", () => {
	let e = _(/* @__PURE__ */ new Map()), t = a();
	y(() => t.epoch, () => {
		e.value = /* @__PURE__ */ new Map(), m.clear();
	});
	let { t: s } = n(), c = null;
	function l(e) {
		return c ? c.setBaseUrl(e) : c = new i({ baseUrl: e }), c;
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
		return e.value.get(t) ?? { ...S };
	}
	let m = /* @__PURE__ */ new Map();
	function h(e, t) {
		let n = m.get(e) ?? { ...S };
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
	function v(t, n) {
		let r = e.value.get(t) ?? { ...S };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function b(e, t) {
		let n = u(e), i = !n;
		v(e, { favorite: i });
		try {
			let n = l(t);
			i ? await n.addFavorite(e) : await n.removeFavorite(e), h(e, { favorite: i });
		} catch (t) {
			let a = m.get(e);
			v(e, { favorite: a ? a.favorite : n });
			let c = s(i ? "itemActions.favoriteAddError" : "itemActions.favoriteRemoveError");
			o().error(`${c}: ${r(t)}`);
		}
	}
	async function x(e, t) {
		let n = f(e), i = !n;
		v(e, { watched: i });
		try {
			let n = l(t);
			i ? await n.markWatched(e) : await n.markUnwatched(e), h(e, { watched: i });
		} catch (t) {
			let a = m.get(e);
			v(e, { watched: a ? a.watched : n });
			let c = s(i ? "itemActions.markWatchedError" : "itemActions.markUnwatchedError");
			o().error(`${c}: ${r(t)}`);
		}
	}
	async function C(e, t, n) {
		let i = Math.trunc(Number(t));
		Number.isFinite(i) || (i = 0), i < -2 && (i = -2), i > 2 && (i = 2);
		let a = d(e);
		v(e, { like_level: i });
		try {
			await l(n).setLikeLevel(e, i), h(e, { like_level: i });
		} catch (t) {
			let n = m.get(e);
			v(e, { like_level: n ? n.like_level : a }), o().error(`${s("itemActions.ratingSaveError")}: ${r(t)}`);
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
		toggleWatched: x,
		setLike: C,
		reset: w
	};
}), w = ["data-level"], T = [
	"disabled",
	"aria-label",
	"aria-pressed"
], E = [
	"disabled",
	"aria-label",
	"aria-pressed"
], D = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "ThumbRating",
	props: {
		level: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["cycle", "update:level"],
	setup(e, { emit: r }) {
		let { t: i } = n(), a = e, o = r, m = c(() => {
			let e = Math.trunc(Number(a.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), _ = c(() => m.value >= 0), y = c(() => m.value <= 0), x = c(() => m.value >= 1), S = c(() => m.value === 2), C = c(() => m.value <= -1), D = c(() => m.value === -2);
		function O() {
			return m.value <= 0 ? 1 : m.value === 1 ? 2 : 0;
		}
		function k() {
			return m.value >= 0 ? -1 : m.value === -1 ? -2 : 0;
		}
		function A() {
			if (a.disabled) return;
			let e = O();
			o("cycle", e), o("update:level", e);
		}
		function j() {
			if (a.disabled) return;
			let e = k();
			o("cycle", e), o("update:level", e);
		}
		return (n, r) => (g(), d("div", {
			class: "thumb-rating",
			"data-level": m.value
		}, [_.value ? (g(), l(s, {
			key: 0,
			text: v(i)("itemActions.like")
		}, {
			default: b(() => [f("button", {
				type: "button",
				class: h(["thumb-rating__btn thumb-rating__btn--up", {
					"is-filled": x.value,
					"is-blue": S.value
				}]),
				disabled: e.disabled,
				"aria-label": v(i)("itemActions.like"),
				"aria-pressed": x.value ? "true" : "false",
				onClick: A
			}, [p(t, {
				name: "thumbs-up",
				class: "thumb-rating__icon"
			})], 10, T)]),
			_: 1
		}, 8, ["text"])) : u("", !0), y.value ? (g(), l(s, {
			key: 1,
			text: v(i)("itemActions.dislike")
		}, {
			default: b(() => [f("button", {
				type: "button",
				class: h(["thumb-rating__btn thumb-rating__btn--down", {
					"is-filled": C.value,
					"is-blue": D.value
				}]),
				disabled: e.disabled,
				"aria-label": v(i)("itemActions.dislike"),
				"aria-pressed": C.value ? "true" : "false",
				onClick: j
			}, [p(t, {
				name: "thumbs-down",
				class: "thumb-rating__icon"
			})], 10, E)]),
			_: 1
		}, 8, ["text"])) : u("", !0)], 8, w));
	}
}), [["__scopeId", "data-v-4de56ed3"]]);
export { C as n, D as t };

//# sourceMappingURL=ThumbRating-BMpV52OI.js.map