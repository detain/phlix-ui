import { n as e, t } from "./Icon-CIwTuFLd.js";
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
], x = {
	key: 1,
	class: "phlix-tabs__badge"
}, S = ["id", "aria-labelledby"], C = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: u }) {
		let C = e, w = u, T = _(), E = p(null), D = i(() => C.tabs.findIndex((e) => e.value === C.modelValue)), O = (e) => `${T}-tab-${e}`, k = (e) => `${T}-panel-${e}`, A = i(() => C.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function j(e) {
			let t = C.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== C.modelValue && w("update:modelValue", e);
		}
		function M(e) {
			E.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function N(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = n(A.value, D.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = n(A.value, D.value, -1);
					break;
				case "Home":
					t = n(A.value, -1, 1);
					break;
				case "End":
					t = n(A.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), j(C.tabs[t].value), M(t));
		}
		return (n, i) => (f(), s("div", v, [c("div", {
			ref_key: "listEl",
			ref: E,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: N
		}, [(f(!0), s(r, null, m(e.tabs, (n) => (f(), s("button", {
			id: O(n.value),
			key: n.value,
			type: "button",
			role: "tab",
			class: d(["phlix-tabs__tab", {
				"is-active": n.value === e.modelValue,
				"is-muted": n.muted
			}]),
			"aria-selected": n.value === e.modelValue,
			"aria-controls": k(n.value),
			tabindex: n.value === e.modelValue ? 0 : -1,
			disabled: n.disabled,
			onClick: (e) => j(n.value)
		}, [
			n.icon ? (f(), a(t, {
				key: 0,
				name: n.icon,
				class: "phlix-tabs__icon"
			}, null, 8, ["name"])) : o("", !0),
			l(" " + g(n.label) + " ", 1),
			n.badge ? (f(), s("span", x, g(n.badge), 1)) : o("", !0)
		], 10, b))), 128))], 40, y), e.modelValue ? (f(), s("div", {
			key: 0,
			id: k(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": O(e.modelValue),
			tabindex: "0"
		}, [h(n.$slots, e.modelValue, {}, () => [h(n.$slots, "default", {}, void 0, !0)], !0)], 8, S)) : o("", !0)]));
	}
}), [["__scopeId", "data-v-c9286a9f"]]);
//#endregion
export { C as t };

//# sourceMappingURL=Tabs-7t3yuCWn.js.map