import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-462_QqzN.js";
import { computed as n, createBlock as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createVNode as s, defineComponent as c, normalizeClass as l, openBlock as u, renderSlot as d } from "vue";
//#region src/components/ui/Button.vue?vue&type=script&setup=true&lang.ts
var f = [
	"type",
	"disabled",
	"aria-busy"
], p = {
	key: 0,
	class: "phlix-btn__spinner"
}, m = { class: "phlix-btn__label" }, h = /*#__PURE__*/ e(/* @__PURE__ */ c({
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
		let c = e, h = n(() => c.disabled || c.loading);
		return (n, c) => (u(), a("button", {
			type: e.type,
			class: l(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: h.value,
			"aria-busy": e.loading || void 0
		}, [
			e.loading ? (u(), a("span", p, [s(t, { name: "spinner" })])) : i("", !0),
			e.leftIcon && !e.loading ? (u(), r(t, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : i("", !0),
			o("span", m, [d(n.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (u(), r(t, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : i("", !0)
		], 10, f));
	}
}), [["__scopeId", "data-v-38abf89d"]]);
//#endregion
export { h as t };

//# sourceMappingURL=Button-8mVXxqAA.js.map