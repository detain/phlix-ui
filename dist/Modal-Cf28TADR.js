import { n as e } from "./Icon-24ngwBUH.js";
import { t } from "./IconButton-tqdU5uf9.js";
import { t as n } from "./useFocusTrap-DZxA3ZEr.js";
import { t as r } from "./useMessages-CLrAkqxK.js";
import { Teleport as i, Transition as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createVNode as u, defineComponent as d, normalizeClass as f, openBlock as p, ref as m, renderSlot as h, toDisplayString as g, unref as _, useId as v, watch as y, withCtx as b, withModifiers as x } from "vue";
//#region src/components/ui/Modal.vue?vue&type=script&setup=true&lang.ts
var S = ["aria-labelledby"], C = {
	key: 0,
	class: "phlix-modal__header"
}, w = ["id"], T = { class: "phlix-modal__body" }, E = {
	key: 1,
	class: "phlix-modal__footer"
}, D = /*#__PURE__*/ e(/* @__PURE__ */ d({
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
	setup(e, { emit: d }) {
		let { t: D } = r(), O = e, k = d, A = m(O.modelValue);
		y(() => O.modelValue, (e) => A.value = e);
		let j = m(null), M = v();
		function N() {
			k("update:modelValue", !1), k("close");
		}
		function P() {
			O.dismissible && N();
		}
		return n(j, A, { onEscape: () => O.dismissible ? (N(), !0) : !1 }), (n, r) => (p(), o(i, { to: "body" }, [u(a, { name: "phlix-modal" }, {
			default: b(() => [e.modelValue ? (p(), c("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: x(P, ["self"])
			}, [l("div", {
				ref_key: "panelEl",
				ref: j,
				class: f(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? _(M) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (p(), c("header", C, [e.title ? (p(), c("h2", {
					key: 0,
					id: _(M),
					class: "phlix-modal__title"
				}, g(e.title), 9, w)) : s("", !0), e.hideClose ? s("", !0) : (p(), o(t, {
					key: 1,
					name: "x",
					label: _(D)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: N
				}, null, 8, ["label"]))])) : s("", !0),
				l("div", T, [h(n.$slots, "default", {}, void 0, !0)]),
				n.$slots.footer ? (p(), c("footer", E, [h(n.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 10, S)], 32)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-220e85bd"]]);
//#endregion
export { D as t };

//# sourceMappingURL=Modal-Cf28TADR.js.map