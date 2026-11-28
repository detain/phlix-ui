import { t as e } from "./useMessages-BjPW27vR.js";
import { n as t } from "./Icon-55iG1rR7.js";
import { createCommentVNode as n, createElementBlock as r, createElementVNode as i, defineComponent as a, normalizeClass as o, openBlock as s, toDisplayString as c, unref as l, useId as u } from "vue";
// src/components/ui/Switch.vue?vue&type=script&setup=true&lang.ts
var d = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], f = ["id"], p = /*#__PURE__*/ t(/* @__PURE__ */ a({
	__name: "Switch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: a }) {
		let { t: p } = e(), m = t, h = a, g = u();
		m.label;
		function _() {
			m.disabled || h("update:modelValue", !m.modelValue);
		}
		return (e, a) => (s(), r("span", { class: o(["phlix-switch", { "is-disabled": t.disabled }]) }, [i("button", {
			type: "button",
			role: "switch",
			class: o(["phlix-switch__control", { "is-on": t.modelValue }]),
			"aria-checked": t.modelValue,
			"aria-label": t.label ? void 0 : l(p)("common.toggle"),
			"aria-labelledby": t.label ? l(g) : void 0,
			disabled: t.disabled,
			onClick: _
		}, [...a[0] ||= [i("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, d), t.label ? (s(), r("label", {
			key: 0,
			id: l(g),
			class: "phlix-switch__label",
			onClick: _
		}, c(t.label), 9, f)) : n("", !0)], 2));
	}
}), [["__scopeId", "data-v-1bcc40c5"]]);
export { p as t };

//# sourceMappingURL=Switch-2Dhly2vu.js.map