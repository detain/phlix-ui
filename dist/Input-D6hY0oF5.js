import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { createCommentVNode as t, createElementBlock as n, createElementVNode as r, defineComponent as i, normalizeClass as a, openBlock as o, toDisplayString as s, unref as c, useId as l } from "vue";
//#region src/components/ui/Input.vue?vue&type=script&setup=true&lang.ts
var u = ["for"], d = [
	"id",
	"type",
	"value",
	"placeholder",
	"min",
	"max",
	"disabled"
], f = /*#__PURE__*/ e(/* @__PURE__ */ i({
	__name: "Input",
	props: {
		modelValue: {},
		label: {},
		placeholder: {},
		type: { default: "text" },
		min: {},
		max: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: i }) {
		let f = e, p = i, m = l();
		function h(e) {
			let t = e.target;
			p("update:modelValue", f.type === "number" ? Number(t.value) : t.value);
		}
		return (i, l) => (o(), n("div", { class: a(["phlix-input", { "is-disabled": e.disabled }]) }, [e.label ? (o(), n("label", {
			key: 0,
			for: c(m),
			class: "phlix-input__label"
		}, s(e.label), 9, u)) : t("", !0), r("input", {
			id: c(m),
			class: "phlix-input__field",
			type: e.type,
			value: e.modelValue,
			placeholder: e.placeholder,
			min: e.min,
			max: e.max,
			disabled: e.disabled,
			onInput: h
		}, null, 40, d)], 2));
	}
}), [["__scopeId", "data-v-e5e230f3"]]);
//#endregion
export { f as t };

//# sourceMappingURL=Input-D6hY0oF5.js.map