import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./useMessages-BGVJcrvU.js";
import { createBlock as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createVNode as s, defineComponent as c, normalizeClass as l, openBlock as u, renderSlot as d, unref as f } from "vue";
// src/components/ui/Chip.vue?vue&type=script&setup=true&lang.ts
var p = [
	"disabled",
	"aria-label",
	"aria-pressed"
], m = { class: "phlix-chip__label" }, h = ["disabled", "aria-label"], g = /*#__PURE__*/ e(/* @__PURE__ */ c({
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
		removeLabel: {},
		ariaLabel: {}
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: c }) {
		let { t: g } = n(), _ = e, v = c;
		function y() {
			_.disabled || (_.selected !== void 0 && v("update:selected", !_.selected), v("click"));
		}
		return (n, c) => (u(), a("span", { class: l(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [o("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-label": e.ariaLabel,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: y
		}, [e.icon ? (u(), r(t, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : i("", !0), o("span", m, [d(n.$slots, "default", {}, void 0, !0)])], 8, p), e.removable ? (u(), a("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel ?? f(g)("itemActions.remove"),
			onClick: c[0] ||= (e) => v("remove")
		}, [s(t, { name: "x" })], 8, h)) : i("", !0)], 2));
	}
}), [["__scopeId", "data-v-23521325"]]);
export { g as t };

//# sourceMappingURL=Chip-BE4O7mqB.js.map