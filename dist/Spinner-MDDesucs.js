import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./useMessages-B96K7XS0.js";
import { computed as r, createElementBlock as i, createVNode as a, defineComponent as o, normalizeStyle as s, openBlock as c, unref as l } from "vue";
// src/components/ui/Spinner.vue?vue&type=script&setup=true&lang.ts
var u = ["aria-label"], d = /*#__PURE__*/ e(/* @__PURE__ */ o({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let o = {
			xs: "0.75rem",
			sm: "1rem",
			md: "1.5rem"
		}, d = e, { t: f } = n(), p = r(() => d.size === void 0 ? void 0 : typeof d.size == "number" ? `${d.size}px` : o[d.size] ?? d.size);
		return (n, r) => (c(), i("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? l(f)("common.loading"),
			style: s(p.value ? { fontSize: p.value } : void 0)
		}, [a(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, u));
	}
}), [["__scopeId", "data-v-a22fab14"]]);
export { d as t };

//# sourceMappingURL=Spinner-MDDesucs.js.map