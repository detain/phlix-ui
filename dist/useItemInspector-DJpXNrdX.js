import { n as e } from "./Icon-55iG1rR7.js";
import { t } from "./useMessages-vcPOKXXR.js";
import { t as n } from "./Button-DTiNkl61.js";
import { t as r } from "./Modal-BDNcHIOo.js";
import { computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, openBlock as f, ref as p, toDisplayString as m, unref as h, watch as g, withCtx as _ } from "vue";
// src/components/ItemDataInspector.vue?vue&type=script&setup=true&lang.ts
var v = {
	key: 0,
	class: "item-inspector"
}, y = { class: "item-inspector__hint" }, b = {
	class: "item-inspector__json",
	"data-test": "item-json"
}, x = {
	key: 1,
	class: "item-inspector__empty"
}, S = {
	key: 0,
	class: "item-inspector__copied",
	role: "status"
}, C = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "ItemDataInspector",
	props: {
		modelValue: { type: Boolean },
		item: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: d }) {
		let C = e, { t: w } = t(), T = d, E = i(() => C.item ? JSON.stringify(C.item, null, 2) : ""), D = p(!1);
		g(() => C.modelValue, (e) => {
			e && (D.value = !1);
		});
		async function O() {
			if (E.value) try {
				await navigator.clipboard.writeText(E.value), D.value = !0;
			} catch {
				D.value = !1;
			}
		}
		return (t, i) => (f(), a(r, {
			"model-value": e.modelValue,
			size: "lg",
			title: e.item ? h(w)("inspector.titled", { name: e.item.name }) : h(w)("inspector.title"),
			"onUpdate:modelValue": i[1] ||= (e) => T("update:modelValue", e)
		}, {
			footer: _(() => [
				D.value ? (f(), s("span", S, m(h(w)("inspector.copied")), 1)) : o("", !0),
				u(n, {
					variant: "ghost",
					disabled: !e.item,
					onClick: O
				}, {
					default: _(() => [l(m(h(w)("inspector.copyJson")), 1)]),
					_: 1
				}, 8, ["disabled"]),
				u(n, {
					variant: "solid",
					onClick: i[0] ||= (e) => T("update:modelValue", !1)
				}, {
					default: _(() => [l(m(h(w)("common.close")), 1)]),
					_: 1
				})
			]),
			default: _(() => [e.item ? (f(), s("div", v, [c("p", y, m(h(w)("inspector.hint")), 1), c("pre", b, m(E.value), 1)])) : (f(), s("p", x, m(h(w)("inspector.noItem")), 1))]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-272bb620"]]);
// src/composables/useItemInspector.ts
function w() {
	let e = p(null), t = p(!1);
	function n(n) {
		e.value = n, t.value = !0;
	}
	return {
		inspectorItem: e,
		inspectorOpen: t,
		openInspector: n
	};
}
export { C as n, w as t };

//# sourceMappingURL=useItemInspector-DJpXNrdX.js.map