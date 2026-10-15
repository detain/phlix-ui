import { n as e } from "./Icon-CIwTuFLd.js";
import { t } from "./useMessages-DeBiTaQk.js";
import { t as n } from "./Button-BuG0GvCa.js";
import { t as r } from "./Modal-D0CvVyuE.js";
import { computed as i, createBlock as a, createElementVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, openBlock as u, toDisplayString as d, withCtx as f } from "vue";
//#region src/components/ui/ConfirmDialog.vue?vue&type=script&setup=true&lang.ts
var p = { class: "phlix-confirm__message" }, m = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "ConfirmDialog",
	props: {
		open: { type: Boolean },
		title: { default: void 0 },
		message: {},
		confirmLabel: { default: void 0 },
		danger: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"update:open",
		"confirm",
		"cancel"
	],
	setup(e, { emit: l }) {
		let m = e, h = l, { t: g } = t(), _ = i(() => m.title ?? g("confirm.title")), v = i(() => m.confirmLabel ?? g("confirm.confirm")), y = i(() => g("confirm.cancel"));
		function b() {
			h("update:open", !1), h("cancel");
		}
		function x() {
			h("confirm"), h("update:open", !1);
		}
		return (t, i) => (u(), a(r, {
			"model-value": e.open,
			title: _.value,
			"onUpdate:modelValue": i[0] ||= (e) => {
				e || b();
			}
		}, {
			footer: f(() => [c(n, {
				variant: "ghost",
				size: "sm",
				onClick: b
			}, {
				default: f(() => [s(d(y.value), 1)]),
				_: 1
			}), c(n, {
				variant: e.danger ? "danger" : "solid",
				size: "sm",
				"data-testid": "confirm-dialog-affirmative",
				onClick: x
			}, {
				default: f(() => [s(d(v.value), 1)]),
				_: 1
			}, 8, ["variant"])]),
			default: f(() => [o("p", p, d(e.message), 1)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-66a21edf"]]);
//#endregion
export { m as t };

//# sourceMappingURL=ConfirmDialog-DMog5_mk.js.map