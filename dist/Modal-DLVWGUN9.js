import { d as e } from "./Button-C4PyCjLX.js";
import { n as t, t as n } from "./useFocusTrap-BN86qgtj.js";
import { Teleport as r, Transition as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createVNode as l, defineComponent as u, normalizeClass as d, openBlock as f, ref as p, renderSlot as m, toDisplayString as h, unref as g, useId as _, watch as v, withCtx as y, withModifiers as b } from "vue";
//#region src/components/ui/Modal.vue?vue&type=script&setup=true&lang.ts
var x = ["aria-labelledby"], S = {
	key: 0,
	class: "phlix-modal__header"
}, C = ["id"], w = { class: "phlix-modal__body" }, T = {
	key: 1,
	class: "phlix-modal__footer"
}, E = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "Modal",
	props: {
		modelValue: { type: Boolean },
		title: {},
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" }
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: u }) {
		let E = e, D = u, O = p(E.modelValue);
		v(() => E.modelValue, (e) => O.value = e);
		let k = p(null), A = _();
		function j() {
			D("update:modelValue", !1), D("close");
		}
		function M() {
			E.dismissible && j();
		}
		return n(k, O, { onEscape: () => E.dismissible ? (j(), !0) : !1 }), (n, u) => (f(), a(r, { to: "body" }, [l(i, { name: "phlix-modal" }, {
			default: y(() => [e.modelValue ? (f(), s("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: b(M, ["self"])
			}, [c("div", {
				ref_key: "panelEl",
				ref: k,
				class: d(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? g(A) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (f(), s("header", S, [e.title ? (f(), s("h2", {
					key: 0,
					id: g(A),
					class: "phlix-modal__title"
				}, h(e.title), 9, C)) : o("", !0), e.hideClose ? o("", !0) : (f(), a(t, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					class: "phlix-modal__close",
					onClick: j
				}))])) : o("", !0),
				c("div", w, [m(n.$slots, "default", {}, void 0, !0)]),
				n.$slots.footer ? (f(), s("footer", T, [m(n.$slots, "footer", {}, void 0, !0)])) : o("", !0)
			], 10, x)], 32)) : o("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-ad69ec41"]]);
//#endregion
export { E as t };

//# sourceMappingURL=Modal-DLVWGUN9.js.map