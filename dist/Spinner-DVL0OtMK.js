import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./useMessages-CI_jngTk.js";
import { computed as r, createElementBlock as i, createVNode as a, defineComponent as o, normalizeStyle as s, openBlock as c, unref as l } from "vue";
//#region src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var u = ["aria-label"], d = /*#__PURE__*/ e(/* @__PURE__ */ o({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let o = e, { t: d } = n(), f = r(() => o.size === void 0 ? void 0 : typeof o.size == "number" ? `${o.size}px` : o.size);
		return (n, r) => (c(), i("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? l(d)("common.loading"),
			style: s(f.value ? { fontSize: f.value } : void 0)
		}, [a(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, u));
	}
}), [["__scopeId", "data-v-736b299d"]]);
//#endregion
export { d as t };

//# sourceMappingURL=Spinner-DVL0OtMK.js.map