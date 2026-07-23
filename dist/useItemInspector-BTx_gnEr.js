import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { t as n } from "./Button-DWa6Ld_Z.js";
import { computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, openBlock as d, ref as f, toDisplayString as p, watch as m, withCtx as h } from "vue";
//#region src/components/ItemDataInspector.vue?vue&type=script&setup=true&lang.ts
var g = {
	key: 0,
	class: "item-inspector"
}, _ = {
	class: "item-inspector__json",
	"data-test": "item-json"
}, v = {
	key: 1,
	class: "item-inspector__empty"
}, y = {
	key: 0,
	class: "item-inspector__copied",
	role: "status"
}, b = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "ItemDataInspector",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: u }) {
		let b = e, x = u, S = r(() => b.item ? JSON.stringify(b.item, null, 2) : ""), C = f(!1);
		m(() => b.modelValue, (e) => {
			e && (C.value = !1);
		});
		async function w() {
			if (S.value) try {
				await navigator.clipboard.writeText(S.value), C.value = !0;
			} catch {
				C.value = !1;
			}
		}
		return (r, u) => (d(), i(t, {
			"model-value": e.modelValue,
			size: "lg",
			title: e.item ? `Item data — ${e.item.name}` : "Item data",
			"onUpdate:modelValue": u[1] ||= (e) => x("update:modelValue", e)
		}, {
			footer: h(() => [
				C.value ? (d(), o("span", y, "Copied")) : a("", !0),
				l(n, {
					variant: "ghost",
					disabled: !e.item,
					onClick: w
				}, {
					default: h(() => [...u[3] ||= [c("Copy JSON", -1)]]),
					_: 1
				}, 8, ["disabled"]),
				l(n, {
					variant: "solid",
					onClick: u[0] ||= (e) => x("update:modelValue", !1)
				}, {
					default: h(() => [...u[4] ||= [c("Close", -1)]]),
					_: 1
				})
			]),
			default: h(() => [e.item ? (d(), o("div", g, [u[2] ||= s("p", { class: "item-inspector__hint" }, " Read-only view of this item's stored data (no changes are saved). ", -1), s("pre", _, p(S.value), 1)])) : (d(), o("p", v, "No item selected."))]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-830458c9"]]);
//#endregion
//#region src/composables/useItemInspector.ts
function x() {
	let e = f(null), t = f(!1);
	function n(n) {
		e.value = n, t.value = !0;
	}
	return {
		inspectorItem: e,
		inspectorOpen: t,
		openInspector: n
	};
}
//#endregion
export { b as n, x as t };

//# sourceMappingURL=useItemInspector-BTx_gnEr.js.map