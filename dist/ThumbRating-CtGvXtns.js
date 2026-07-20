import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { f as n, t as r } from "./client-D80As4Gx.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { computed as a, createCommentVNode as o, createElementBlock as s, createVNode as c, defineComponent as l, normalizeClass as u, openBlock as d, ref as f } from "vue";
import { defineStore as p } from "pinia";
//#region src/stores/useUserItemDataStore.ts
var m = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), h = p("user-item-data", () => {
	let e = f(/* @__PURE__ */ new Map()), t = null;
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
		return e.value.get(t) ?? { ...m };
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
		let r = e.value.get(t) ?? { ...m };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function p(e, t) {
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
	async function h(e, t) {
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
	async function g(e, t, r) {
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
	function _() {
		e.value = /* @__PURE__ */ new Map(), t = null;
	}
	return {
		entries: e,
		isFavorite: o,
		likeLevel: s,
		isWatched: c,
		get: l,
		hydrate: u,
		toggleFavorite: p,
		toggleWatched: h,
		setLike: g,
		reset: _
	};
}), g = ["data-level"], _ = ["disabled", "aria-pressed"], v = ["disabled", "aria-pressed"], y = /*#__PURE__*/ e(/* @__PURE__ */ l({
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
		let r = e, i = n, l = a(() => {
			let e = Math.trunc(Number(r.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), f = a(() => l.value >= 0), p = a(() => l.value <= 0), m = a(() => l.value >= 1), h = a(() => l.value === 2), y = a(() => l.value <= -1), b = a(() => l.value === -2);
		function x() {
			return l.value <= 0 ? 1 : l.value === 1 ? 2 : 0;
		}
		function S() {
			return l.value >= 0 ? -1 : l.value === -1 ? -2 : 0;
		}
		function C() {
			if (r.disabled) return;
			let e = x();
			i("cycle", e), i("update:level", e);
		}
		function w() {
			if (r.disabled) return;
			let e = S();
			i("cycle", e), i("update:level", e);
		}
		return (n, r) => (d(), s("div", {
			class: "thumb-rating",
			"data-level": l.value
		}, [f.value ? (d(), s("button", {
			key: 0,
			type: "button",
			class: u(["thumb-rating__btn thumb-rating__btn--up", {
				"is-filled": m.value,
				"is-blue": h.value
			}]),
			disabled: e.disabled,
			"aria-label": "Like",
			"aria-pressed": m.value ? "true" : "false",
			onClick: C
		}, [c(t, {
			name: "thumbs-up",
			class: "thumb-rating__icon"
		})], 10, _)) : o("", !0), p.value ? (d(), s("button", {
			key: 1,
			type: "button",
			class: u(["thumb-rating__btn thumb-rating__btn--down", {
				"is-filled": y.value,
				"is-blue": b.value
			}]),
			disabled: e.disabled,
			"aria-label": "Dislike",
			"aria-pressed": y.value ? "true" : "false",
			onClick: w
		}, [c(t, {
			name: "thumbs-down",
			class: "thumb-rating__icon"
		})], 10, v)) : o("", !0)], 8, g));
	}
}), [["__scopeId", "data-v-554f8af9"]]);
//#endregion
export { h as n, y as t };

//# sourceMappingURL=ThumbRating-CtGvXtns.js.map