import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-BlNXxmNP.js";
import { p as n, t as r } from "./client-DA-5QZXw.js";
import { n as i } from "./useProfileStore-qqAkFafR.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Tooltip-DDaQsdSp.js";
import { computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createVNode as f, defineComponent as p, normalizeClass as m, openBlock as h, ref as g, watch as _, withCtx as v } from "vue";
import { defineStore as y } from "pinia";
//#region src/stores/useUserItemDataStore.ts
var b = Object.freeze({
	favorite: !1,
	rating: null,
	like_level: 0,
	watched: !1
}), x = y("user-item-data", () => {
	let e = g(/* @__PURE__ */ new Map()), t = i();
	_(() => t.epoch, () => {
		e.value = /* @__PURE__ */ new Map();
	});
	let o = null;
	function s(e) {
		return o ? o.setBaseUrl(e) : o = new r({ baseUrl: e }), o;
	}
	function c(t) {
		return e.value.get(t)?.favorite ?? !1;
	}
	function l(t) {
		return e.value.get(t)?.like_level ?? 0;
	}
	function u(t) {
		return e.value.get(t)?.watched ?? !1;
	}
	function d(t) {
		return e.value.get(t) ?? { ...b };
	}
	function f(t) {
		if (!t || typeof t.id != "string") return;
		let n = t.user_data;
		e.value.set(t.id, {
			favorite: n?.favorite ?? !1,
			rating: n?.rating ?? null,
			like_level: n?.like_level ?? 0,
			watched: n?.watched ?? !1
		});
	}
	function p(t, n) {
		let r = e.value.get(t) ?? { ...b };
		e.value.set(t, {
			...r,
			...n
		});
	}
	async function m(e, t) {
		let r = c(e), i = !r;
		p(e, { favorite: i });
		try {
			let n = s(t);
			i ? await n.addFavorite(e) : await n.removeFavorite(e);
		} catch (t) {
			p(e, { favorite: r });
			let o = i ? "add to" : "remove from";
			a().error(`Failed to ${o} favorites: ${n(t)}`);
		}
	}
	async function h(e, t) {
		let r = u(e), i = !r;
		p(e, { watched: i });
		try {
			let n = s(t);
			i ? await n.markWatched(e) : await n.markUnwatched(e);
		} catch (t) {
			p(e, { watched: r });
			let o = i ? "watched" : "unwatched";
			a().error(`Failed to mark ${o}: ${n(t)}`);
		}
	}
	async function v(e, t, r) {
		let i = Math.trunc(Number(t));
		Number.isFinite(i) || (i = 0), i < -2 && (i = -2), i > 2 && (i = 2);
		let o = l(e);
		p(e, { like_level: i });
		try {
			await s(r).setLikeLevel(e, i);
		} catch (t) {
			p(e, { like_level: o }), a().error(`Failed to set rating: ${n(t)}`);
		}
	}
	function y() {
		e.value = /* @__PURE__ */ new Map(), o = null;
	}
	return {
		entries: e,
		isFavorite: c,
		likeLevel: l,
		isWatched: u,
		get: d,
		hydrate: f,
		toggleFavorite: m,
		toggleWatched: h,
		setLike: v,
		reset: y
	};
}), S = ["data-level"], C = ["disabled", "aria-pressed"], w = ["disabled", "aria-pressed"], T = /*#__PURE__*/ e(/* @__PURE__ */ p({
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
		let r = e, i = n, a = s(() => {
			let e = Math.trunc(Number(r.level));
			return Number.isFinite(e) ? e < -2 ? -2 : e > 2 ? 2 : e : 0;
		}), p = s(() => a.value >= 0), g = s(() => a.value <= 0), _ = s(() => a.value >= 1), y = s(() => a.value === 2), b = s(() => a.value <= -1), x = s(() => a.value === -2);
		function T() {
			return a.value <= 0 ? 1 : a.value === 1 ? 2 : 0;
		}
		function E() {
			return a.value >= 0 ? -1 : a.value === -1 ? -2 : 0;
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
		return (n, r) => (h(), u("div", {
			class: "thumb-rating",
			"data-level": a.value
		}, [p.value ? (h(), c(o, {
			key: 0,
			text: "Like"
		}, {
			default: v(() => [d("button", {
				type: "button",
				class: m(["thumb-rating__btn thumb-rating__btn--up", {
					"is-filled": _.value,
					"is-blue": y.value
				}]),
				disabled: e.disabled,
				"aria-label": "Like",
				"aria-pressed": _.value ? "true" : "false",
				onClick: D
			}, [f(t, {
				name: "thumbs-up",
				class: "thumb-rating__icon"
			})], 10, C)]),
			_: 1
		})) : l("", !0), g.value ? (h(), c(o, {
			key: 1,
			text: "Dislike"
		}, {
			default: v(() => [d("button", {
				type: "button",
				class: m(["thumb-rating__btn thumb-rating__btn--down", {
					"is-filled": b.value,
					"is-blue": x.value
				}]),
				disabled: e.disabled,
				"aria-label": "Dislike",
				"aria-pressed": b.value ? "true" : "false",
				onClick: O
			}, [f(t, {
				name: "thumbs-down",
				class: "thumb-rating__icon"
			})], 10, w)]),
			_: 1
		})) : l("", !0)], 8, S));
	}
}), [["__scopeId", "data-v-18d82ecf"]]);
//#endregion
export { x as n, T as t };

//# sourceMappingURL=ThumbRating-BdZTLuwr.js.map