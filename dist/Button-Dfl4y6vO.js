import { n as e, t } from "./Icon-55iG1rR7.js";
import { createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createVNode as o, defineComponent as s, normalizeClass as c, onBeforeUnmount as l, onMounted as u, openBlock as d, ref as f, renderSlot as p } from "vue";
// src/components/ui/Button.vue?vue&type=script&setup=true&lang.ts
var m = [
	"type",
	"disabled",
	"aria-disabled",
	"aria-busy"
], h = {
	key: 0,
	class: "phlix-btn__spinner"
}, g = { class: "phlix-btn__label" }, _ = /*#__PURE__*/ e(/* @__PURE__ */ s({
	__name: "Button",
	props: {
		variant: { default: "solid" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		block: {
			type: Boolean,
			default: !1
		},
		leftIcon: {},
		rightIcon: {}
	},
	setup(e) {
		let s = e, _ = f(null);
		function v(e) {
			s.loading && (e.preventDefault(), e.stopImmediatePropagation());
		}
		function y(e) {
			s.loading && e.submitter === _.value && (e.preventDefault(), e.stopImmediatePropagation());
		}
		let b = null;
		return u(() => {
			let e = _.value?.closest("form");
			e && (e.addEventListener("submit", y, !0), b = e);
		}), l(() => {
			b?.removeEventListener("submit", y, !0), b = null;
		}), (s, l) => (d(), i("button", {
			ref_key: "rootEl",
			ref: _,
			type: e.type,
			class: c(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: e.disabled || void 0,
			"aria-disabled": e.loading || void 0,
			"aria-busy": e.loading || void 0,
			onClick: v
		}, [
			e.loading ? (d(), i("span", h, [o(t, { name: "spinner" })])) : r("", !0),
			e.leftIcon && !e.loading ? (d(), n(t, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : r("", !0),
			a("span", g, [p(s.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (d(), n(t, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : r("", !0)
		], 10, m));
	}
}), [["__scopeId", "data-v-cf0eaa3c"]]);
export { _ as t };

//# sourceMappingURL=Button-Dfl4y6vO.js.map