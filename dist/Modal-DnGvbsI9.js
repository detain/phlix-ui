import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./useFocusTrap-DZxA3ZEr.js";
import { t as r } from "./useMessages-CI_jngTk.js";
import { Teleport as i, Transition as a, computed as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createVNode as d, defineComponent as f, normalizeClass as p, openBlock as m, ref as h, renderSlot as g, toDisplayString as _, unref as v, useId as y, watch as b, withCtx as x, withModifiers as S } from "vue";
//#region src/components/ui/IconButton.vue?vue&type=script&setup=true&lang.ts
var C = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], w = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
		let n = e, r = o(() => n.disabled || n.loading);
		return (n, i) => (m(), l("button", {
			type: e.type,
			class: p(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: r.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [d(t, {
			name: e.loading ? "spinner" : e.name,
			class: p({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, C));
	}
}), [["__scopeId", "data-v-48bb9819"]]), T = ["aria-labelledby"], E = {
	key: 0,
	class: "phlix-modal__header"
}, D = ["id"], O = { class: "phlix-modal__body" }, k = {
	key: 1,
	class: "phlix-modal__footer"
}, A = /*#__PURE__*/ e(/* @__PURE__ */ f({
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
	setup(e, { emit: t }) {
		let { t: o } = r(), f = e, C = t, A = h(f.modelValue);
		b(() => f.modelValue, (e) => A.value = e);
		let j = h(null), M = y();
		function N() {
			C("update:modelValue", !1), C("close");
		}
		function P() {
			f.dismissible && N();
		}
		return n(j, A, { onEscape: () => f.dismissible ? (N(), !0) : !1 }), (t, n) => (m(), s(i, { to: "body" }, [d(a, { name: "phlix-modal" }, {
			default: x(() => [e.modelValue ? (m(), l("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: S(P, ["self"])
			}, [u("div", {
				ref_key: "panelEl",
				ref: j,
				class: p(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? v(M) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (m(), l("header", E, [e.title ? (m(), l("h2", {
					key: 0,
					id: v(M),
					class: "phlix-modal__title"
				}, _(e.title), 9, D)) : c("", !0), e.hideClose ? c("", !0) : (m(), s(w, {
					key: 1,
					name: "x",
					label: v(o)("common.close"),
					size: "sm",
					class: "phlix-modal__close",
					onClick: N
				}, null, 8, ["label"]))])) : c("", !0),
				u("div", O, [g(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (m(), l("footer", k, [g(t.$slots, "footer", {}, void 0, !0)])) : c("", !0)
			], 10, T)], 32)) : c("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-3be1ebaa"]]);
//#endregion
export { w as n, A as t };

//# sourceMappingURL=Modal-DnGvbsI9.js.map