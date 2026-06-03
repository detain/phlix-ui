import { h as e } from "./Button-C86XulWV.js";
import { createCommentVNode as t, createElementBlock as n, createElementVNode as r, defineComponent as i, normalizeClass as a, openBlock as o, toDisplayString as s, unref as c, useId as l } from "vue";
//#region src/components/ui/Switch.vue?vue&type=script&setup=true&lang.ts
var u = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], d = ["id"], f = /*#__PURE__*/ e(/* @__PURE__ */ i({
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
	setup(e, { emit: i }) {
		let f = e, p = i, m = l();
		function h() {
			f.disabled || p("update:modelValue", !f.modelValue);
		}
		return (i, l) => (o(), n("span", { class: a(["phlix-switch", { "is-disabled": e.disabled }]) }, [r("button", {
			type: "button",
			role: "switch",
			class: a(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? c(m) : void 0,
			disabled: e.disabled,
			onClick: h
		}, [...l[0] ||= [r("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, u), e.label ? (o(), n("label", {
			key: 0,
			id: c(m),
			class: "phlix-switch__label",
			onClick: h
		}, s(e.label), 9, d)) : t("", !0)], 2));
	}
}), [["__scopeId", "data-v-4631a106"]]);
//#endregion
export { f as t };

//# sourceMappingURL=Switch-BRVGpfuc.js.map