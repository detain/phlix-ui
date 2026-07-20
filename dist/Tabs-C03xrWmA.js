import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-462_QqzN.js";
import { n } from "./listbox-htyKA_G5.js";
import { Fragment as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, defineComponent as u, normalizeClass as d, openBlock as f, ref as p, renderList as m, renderSlot as h, toDisplayString as g, useId as _ } from "vue";
//#region src/components/ui/Tabs.vue?vue&type=script&setup=true&lang.ts
var v = { class: "phlix-tabs" }, y = ["aria-label"], b = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], x = ["id", "aria-labelledby"], S = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: u }) {
		let S = e, C = u, w = _(), T = p(null), E = i(() => S.tabs.findIndex((e) => e.value === S.modelValue)), D = (e) => `${w}-tab-${e}`, O = (e) => `${w}-panel-${e}`, k = i(() => S.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function A(e) {
			let t = S.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== S.modelValue && C("update:modelValue", e);
		}
		function j(e) {
			T.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function M(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = n(k.value, E.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = n(k.value, E.value, -1);
					break;
				case "Home":
					t = n(k.value, -1, 1);
					break;
				case "End":
					t = n(k.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), A(S.tabs[t].value), j(t));
		}
		return (n, i) => (f(), s("div", v, [c("div", {
			ref_key: "listEl",
			ref: T,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: M
		}, [(f(!0), s(r, null, m(e.tabs, (n) => (f(), s("button", {
			id: D(n.value),
			key: n.value,
			type: "button",
			role: "tab",
			class: d(["phlix-tabs__tab", { "is-active": n.value === e.modelValue }]),
			"aria-selected": n.value === e.modelValue,
			"aria-controls": O(n.value),
			tabindex: n.value === e.modelValue ? 0 : -1,
			disabled: n.disabled,
			onClick: (e) => A(n.value)
		}, [n.icon ? (f(), a(t, {
			key: 0,
			name: n.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : o("", !0), l(" " + g(n.label), 1)], 10, b))), 128))], 40, y), e.modelValue ? (f(), s("div", {
			key: 0,
			id: O(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": D(e.modelValue),
			tabindex: "0"
		}, [h(n.$slots, e.modelValue, {}, () => [h(n.$slots, "default", {}, void 0, !0)], !0)], 8, x)) : o("", !0)]));
	}
}), [["__scopeId", "data-v-0de0829d"]]);
//#endregion
export { S as t };

//# sourceMappingURL=Tabs-C03xrWmA.js.map