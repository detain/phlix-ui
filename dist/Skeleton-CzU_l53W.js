import { n as e } from "./Icon-Bd1lZf6E.js";
import { Fragment as t, createElementBlock as n, defineComponent as r, normalizeClass as i, normalizeStyle as a, openBlock as o, renderList as s } from "vue";
//#region src/components/ui/Skeleton.vue?vue&type=script&setup=true&lang.ts
var c = {
	key: 0,
	class: "phlix-skel-text",
	"aria-hidden": "true"
}, l = /*#__PURE__*/ e(/* @__PURE__ */ r({
	__name: "Skeleton",
	props: {
		variant: { default: "rect" },
		width: {},
		height: {},
		radius: {},
		lines: { default: 1 }
	},
	setup(e) {
		return (r, l) => e.variant === "text" ? (o(), n("div", c, [(o(!0), n(t, null, s(e.lines, (t) => (o(), n("span", {
			key: t,
			class: "phlix-skel phlix-skel--text",
			style: a({ width: t === e.lines && e.lines > 1 ? "60%" : e.width })
		}, null, 4))), 128))])) : (o(), n("span", {
			key: 1,
			class: i(["phlix-skel", `phlix-skel--${e.variant}`]),
			"aria-hidden": "true",
			style: a({
				width: e.width,
				height: e.height,
				borderRadius: e.radius
			})
		}, null, 6));
	}
}), [["__scopeId", "data-v-47290801"]]);
//#endregion
export { l as t };

//# sourceMappingURL=Skeleton-CzU_l53W.js.map