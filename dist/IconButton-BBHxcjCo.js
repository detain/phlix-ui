import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { computed as n, createElementBlock as r, createVNode as i, defineComponent as a, normalizeClass as o, openBlock as s } from "vue";
//#region src/components/ui/IconButton.vue?vue&type=script&setup=true&lang.ts
var c = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], l = /*#__PURE__*/ e(/* @__PURE__ */ a({
	__name: "IconButton",
	props: {
		name: {},
		label: {},
		variant: { default: "ghost" },
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
		pressed: {
			type: Boolean,
			default: void 0
		}
	},
	setup(e) {
		let a = e, l = n(() => a.disabled || a.loading);
		return (n, a) => (s(), r("button", {
			type: e.type,
			class: o(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: l.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [i(t, {
			name: e.loading ? "spinner" : e.name,
			class: o({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, c));
	}
}), [["__scopeId", "data-v-48bb9819"]]);
//#endregion
export { l as t };

//# sourceMappingURL=IconButton-BBHxcjCo.js.map