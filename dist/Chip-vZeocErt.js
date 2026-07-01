import { n as e, t } from "./Icon-24ngwBUH.js";
import { createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createVNode as o, defineComponent as s, normalizeClass as c, openBlock as l, renderSlot as u } from "vue";
//#region src/components/ui/Chip.vue?vue&type=script&setup=true&lang.ts
var d = ["disabled", "aria-pressed"], f = { class: "phlix-chip__label" }, p = ["disabled", "aria-label"], m = /*#__PURE__*/ e(/* @__PURE__ */ s({
	__name: "Chip",
	props: {
		selected: {
			type: Boolean,
			default: void 0
		},
		removable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		size: { default: "sm" },
		disabled: {
			type: Boolean,
			default: !1
		},
		removeLabel: { default: "Remove" }
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: s }) {
		let m = e, h = s;
		function g() {
			m.disabled || (m.selected !== void 0 && h("update:selected", !m.selected), h("click"));
		}
		return (s, m) => (l(), i("span", { class: c(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [a("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: g
		}, [e.icon ? (l(), n(t, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : r("", !0), a("span", f, [u(s.$slots, "default", {}, void 0, !0)])], 8, d), e.removable ? (l(), i("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: m[0] ||= (e) => h("remove")
		}, [o(t, { name: "x" })], 8, p)) : r("", !0)], 2));
	}
}), [["__scopeId", "data-v-728065a7"]]);
//#endregion
export { m as t };

//# sourceMappingURL=Chip-vZeocErt.js.map