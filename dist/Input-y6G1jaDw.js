import { n as e } from "./Icon-55iG1rR7.js";
import { computed as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, defineComponent as a, normalizeClass as o, openBlock as s, toDisplayString as c, unref as l, useId as u } from "vue";
// src/components/ui/Input.vue?vue&type=script&setup=true&lang.ts
var d = ["for"], f = [
	"id",
	"type",
	"value",
	"placeholder",
	"min",
	"max",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], p = ["id"], m = /*#__PURE__*/ e(/* @__PURE__ */ a({
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
		},
		error: { default: null }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: a }) {
		let m = e, h = a, g = u(), _ = t(() => `${g}-msg`);
		function v(e) {
			let t = e.target;
			m.type === "number" ? h("update:modelValue", t.value === "" ? "" : Number(t.value)) : h("update:modelValue", t.value);
		}
		return (t, a) => (s(), r("div", { class: o(["phlix-input", {
			"is-disabled": e.disabled,
			"is-invalid": !!e.error
		}]) }, [
			e.label ? (s(), r("label", {
				key: 0,
				for: l(g),
				class: "phlix-input__label"
			}, c(e.label), 9, d)) : n("", !0),
			i("input", {
				id: l(g),
				class: "phlix-input__field",
				type: e.type,
				value: e.modelValue,
				placeholder: e.placeholder,
				min: e.min,
				max: e.max,
				disabled: e.disabled,
				"aria-invalid": e.error ? "true" : void 0,
				"aria-describedby": e.error ? _.value : void 0,
				onInput: v
			}, null, 40, f),
			i("p", {
				id: _.value,
				class: "phlix-input__error",
				"aria-live": "polite"
			}, c(e.error || ""), 9, p)
		], 2));
	}
}), [["__scopeId", "data-v-e2ef7c22"]]);
export { m as t };

//# sourceMappingURL=Input-y6G1jaDw.js.map