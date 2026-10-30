import { t as e } from "./IconButton-Cp0n7kCc.js";
import { n as t } from "./useFocusTrap-FI3Uj9O8.js";
import { t as n } from "./useMessages-DrceiftD.js";
import { n as r } from "./Icon-CIbfiPrs.js";
import { Teleport as i, Transition as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createVNode as u, defineComponent as d, normalizeClass as f, openBlock as p, ref as m, renderSlot as h, toDisplayString as g, unref as _, useId as v, watch as y, withCtx as b, withModifiers as x } from "vue";
// src/components/ui/Modal.vue?vue&type=script&setup=true&lang.ts
var S = ["aria-labelledby"], C = {
	key: 0,
	class: "phlix-modal__header"
}, w = ["id"], T = { class: "phlix-modal__body" }, E = {
	key: 1,
	class: "phlix-modal__footer"
}, D = /*#__PURE__*/ r(/* @__PURE__ */ d({
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
	setup(r, { emit: d }) {
		let { t: D } = n(), O = r, k = d, A = m(O.modelValue);
		y(() => O.modelValue, (e) => A.value = e);
		let j = m(null), M = v();
		function N() {
			k("update:modelValue", !1), k("close");
		}
		function P() {
			O.dismissible && N();
		}
		return t(j, A, { onEscape: () => O.dismissible ? (N(), !0) : !1 }), (t, n) => (p(), o(i, { to: "body" }, [u(a, { name: "phlix-modal" }, {
			default: b(() => [r.modelValue ? (p(), c("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: x(P, ["self"])
			}, [l("div", {
				ref_key: "panelEl",
				ref: j,
				class: f(["phlix-modal__panel", `phlix-modal__panel--${r.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": r.title ? _(M) : void 0,
				tabindex: "-1"
			}, [
				r.title || !r.hideClose ? (p(), c("header", C, [r.title ? (p(), c("h2", {
					key: 0,
					id: _(M),
					class: "phlix-modal__title"
				}, g(r.title), 9, w)) : s("", !0), r.hideClose ? s("", !0) : (p(), o(e, {
					key: 1,
					name: "x",
					label: _(D)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: N
				}, null, 8, ["label"]))])) : s("", !0),
				l("div", T, [h(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (p(), c("footer", E, [h(t.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 10, S)], 32)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-12c692c9"]]);
export { D as t };

//# sourceMappingURL=Modal-BU4hJGBA.js.map