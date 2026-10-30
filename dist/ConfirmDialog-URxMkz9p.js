import { t as e } from "./Modal-CqHpm-F4.js";
import { t } from "./Button-1sKEdGjj.js";
import { t as n } from "./useMessages-B2u5b6BQ.js";
import { n as r } from "./Icon-CIbfiPrs.js";
import { computed as i, createBlock as a, createElementVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, openBlock as u, toDisplayString as d, withCtx as f } from "vue";
// src/components/ui/ConfirmDialog.vue?vue&type=script&setup=true&lang.ts
var p = { class: "phlix-confirm__message" }, m = /*#__PURE__*/ r(/* @__PURE__ */ l({
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
	setup(r, { emit: l }) {
		let m = r, h = l, { t: g } = n(), _ = i(() => m.title ?? g("confirm.title")), v = i(() => m.confirmLabel ?? g("confirm.confirm")), y = i(() => g("confirm.cancel"));
		function b() {
			h("update:open", !1), h("cancel");
		}
		function x() {
			h("confirm"), h("update:open", !1);
		}
		return (n, i) => (u(), a(e, {
			"model-value": r.open,
			title: _.value,
			"onUpdate:modelValue": i[0] ||= (e) => {
				e || b();
			}
		}, {
			footer: f(() => [c(t, {
				variant: "ghost",
				size: "sm",
				onClick: b
			}, {
				default: f(() => [s(d(y.value), 1)]),
				_: 1
			}), c(t, {
				variant: r.danger ? "danger" : "solid",
				size: "sm",
				"data-testid": "confirm-dialog-affirmative",
				onClick: x
			}, {
				default: f(() => [s(d(v.value), 1)]),
				_: 1
			}, 8, ["variant"])]),
			default: f(() => [o("p", p, d(r.message), 1)]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-66a21edf"]]);
export { m as t };

//# sourceMappingURL=ConfirmDialog-URxMkz9p.js.map