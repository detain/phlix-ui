import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { f as n, t as r } from "./client-BzWwyWKr.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Tooltip-9gdTmuk6.js";
import { computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createVNode as d, defineComponent as f, normalizeClass as p, openBlock as m, ref as h, withCtx as g } from "vue";
import { defineStore as _ } from "pinia";
//#region src/stores/useUserItemDataStore.ts
var v = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), y = _("user-item-data", () => {
	let e = h(/* @__PURE__ */ new Map()), t = null;
	function a(e) {
		return t ? t.setBaseUrl(e) : t = new r({ baseUrl: e }), t;
	}
	function o(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function s(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function c(t) {
		return e.value.get(t)?.watched ?? !1;
	}
	function l(t) {
		return e.value.get(t) ?? { ...v };
	}
	function u(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0,
			watched: n?.watched ?? !1
		});
	}
	function d(t, n) {
		let r = e.value.get(t) ?? { ...v };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function f(e, t) {
		let r = o(e), s = !r;
		d(e, { favorite: s });
		try {
			let n = a(t);
			s ? await n.addFavorite(e) : await n.removeFavorite(e);
		} catch (t) {
			d(e, { favorite: r });
			let a = s ? "add to" : "remove from";
			i().error(`Failed to ${a} favorites: ${n(t)}`);
		}
	}
	async function p(e, t) {
		let r = c(e), o = !r;
		d(e, { watched: o });
		try {
			let n = a(t);
			o ? await n.markWatched(e) : await n.markUnwatched(e);
		} catch (t) {
			d(e, { watched: r });
			let a = o ? "watched" : "unwatched";
			i().error(`Failed to mark ${a}: ${n(t)}`);
		}
	}
	async function m(e, t, r) {
		let o = Math.trunc(Number(t));
		Number.isFinite(o) || (o = 0), o < -2 && (o = -2), o > 2 && (o = 2);
		let c = s(e);
		d(e, { like_level: o });
		try {
			await a(r).setLikeLevel(e, o);
		} catch (t) {
			d(e, { like_level: c }), i().error(`Failed to set rating: ${n(t)}`);
		}
	}
	function g() {
		e.value = /* @__PURE__ */ new Map(), t = null;
	}
	return {
		entries: e,
		isFavorite: o,
		likeLevel: s,
		isWatched: c,
		get: l,
		hydrate: u,
		toggleFavorite: f,
		toggleWatched: p,
		setLike: m,
		reset: g
	};
}), b = ["data-level"], x = ["disabled", "aria-pressed"], S = ["disabled", "aria-pressed"], C = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
		let r = e, i = n, f = o(() => {
			let e = Math.trunc(Number(r.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), h = o(() => f.value >= 0), _ = o(() => f.value <= 0), v = o(() => f.value >= 1), y = o(() => f.value === 2), C = o(() => f.value <= -1), w = o(() => f.value === -2);
		function T() {
			return f.value <= 0 ? 1 : f.value === 1 ? 2 : 0;
		}
		function E() {
			return f.value >= 0 ? -1 : f.value === -1 ? -2 : 0;
		}
		function D() {
			if (r.disabled) return;
			let e = T();
			i("cycle", e), i("update:level", e);
		}
		function O() {
			if (r.disabled) return;
			let e = E();
			i("cycle", e), i("update:level", e);
		}
		return (n, r) => (m(), l("div", {
			class: "thumb-rating",
			"data-level": f.value
		}, [h.value ? (m(), s(a, {
			key: 0,
			text: "Like"
		}, {
			default: g(() => [u("button", {
				type: "button",
				class: p(["thumb-rating__btn thumb-rating__btn--up", {
					"is-filled": v.value,
					"is-blue": y.value
				}]),
				disabled: e.disabled,
				"aria-label": "Like",
				"aria-pressed": v.value ? "true" : "false",
				onClick: D
			}, [d(t, {
				name: "thumbs-up",
				class: "thumb-rating__icon"
			})], 10, x)]),
			_: 1
		})) : c("", !0), _.value ? (m(), s(a, {
			key: 1,
			text: "Dislike"
		}, {
			default: g(() => [u("button", {
				type: "button",
				class: p(["thumb-rating__btn thumb-rating__btn--down", {
					"is-filled": C.value,
					"is-blue": w.value
				}]),
				disabled: e.disabled,
				"aria-label": "Dislike",
				"aria-pressed": C.value ? "true" : "false",
				onClick: O
			}, [d(t, {
				name: "thumbs-down",
				class: "thumb-rating__icon"
			})], 10, S)]),
			_: 1
		})) : c("", !0)], 8, b));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
//#endregion
export { y as n, C as t };

//# sourceMappingURL=ThumbRating-BxiWuYAs.js.map