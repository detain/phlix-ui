import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { Transition as t, createCommentVNode as n, createElementBlock as r, createTextVNode as i, createVNode as a, defineComponent as o, normalizeClass as s, onBeforeUnmount as c, openBlock as l, ref as u, renderSlot as d, toDisplayString as f, unref as p, useId as m, withCtx as h, withKeys as g } from "vue";
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var _ = ["id"], v = /*#__PURE__*/ e(/* @__PURE__ */ o({
	__name: "Tooltip",
	props: {
		text: {},
		placement: { default: "top" },
		delay: { default: 300 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let o = e, v = m(), y = u(!1), b = u(null), x;
		function S() {
			return b.value?.firstElementChild ?? null;
		}
		function C() {
			o.disabled || (clearTimeout(x), x = setTimeout(() => {
				y.value = !0, S()?.setAttribute("aria-describedby", v);
			}, o.delay));
		}
		function w() {
			clearTimeout(x), y.value = !1, S()?.removeAttribute("aria-describedby");
		}
		return c(() => clearTimeout(x)), (o, c) => (l(), r("span", {
			ref_key: "wrapEl",
			ref: b,
			class: "phlix-tooltip-wrap",
			onMouseenter: C,
			onMouseleave: w,
			onFocusin: C,
			onFocusout: w,
			onKeydown: g(w, ["esc"])
		}, [d(o.$slots, "default", {}, void 0, !0), a(t, { name: "phlix-tooltip" }, {
			default: h(() => [y.value && (e.text || o.$slots.content) ? (l(), r("span", {
				key: 0,
				id: p(v),
				role: "tooltip",
				class: s(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [d(o.$slots, "content", {}, () => [i(f(e.text), 1)], !0)], 10, _)) : n("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-a3ba7bc3"]]);
//#endregion
export { v as t };

//# sourceMappingURL=Tooltip-9gdTmuk6.js.map