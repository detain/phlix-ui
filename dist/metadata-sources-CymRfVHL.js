import { n as e, t } from "./Icon-55iG1rR7.js";
import { t as n } from "./useMessages-BjPW27vR.js";
import { D as r } from "./client-Bmlfq3Uy.js";
import { t as i } from "./Select-CxtuZBlT.js";
import { Fragment as a, computed as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, openBlock as p, renderList as m, toDisplayString as h, unref as g } from "vue";
// src/components/SourcePriorityEditor.vue?vue&type=script&setup=true&lang.ts
var _ = ["aria-label"], v = {
	key: 0,
	class: "source-priority__list"
}, y = {
	class: "source-priority__rank",
	"aria-hidden": "true"
}, b = { class: "source-priority__name" }, x = ["title"], S = { class: "source-priority__controls" }, C = [
	"disabled",
	"aria-label",
	"onClick"
], w = [
	"disabled",
	"aria-label",
	"onClick"
], T = ["aria-label", "onClick"], E = {
	key: 1,
	class: "source-priority__empty",
	role: "status"
}, D = {
	key: 2,
	class: "source-priority__add"
}, O = /*#__PURE__*/ e(/* @__PURE__ */ f({
	__name: "SourcePriorityEditor",
	props: {
		modelValue: {},
		available: { default: () => [] },
		label: { default: "" }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: r }) {
		let { t: f } = n(), O = e, k = r, A = o(() => Array.isArray(O.modelValue) ? O.modelValue : []);
		function j(e) {
			return !O.available.includes(e);
		}
		let M = o(() => O.available.filter((e) => !A.value.includes(e)).map((e) => ({
			value: e,
			label: e
		}))), N = o(() => M.value.length > 0);
		function P(e) {
			k("update:modelValue", e);
		}
		function F(e) {
			if (e <= 0) return;
			let t = A.value.slice();
			[t[e - 1], t[e]] = [t[e], t[e - 1]], P(t);
		}
		function I(e) {
			if (e >= A.value.length - 1) return;
			let t = A.value.slice();
			[t[e], t[e + 1]] = [t[e + 1], t[e]], P(t);
		}
		function L(e) {
			let t = A.value.slice();
			t.splice(e, 1), P(t);
		}
		function R(e) {
			let t = String(e);
			t && !A.value.includes(t) && P([...A.value, t]);
		}
		return (n, r) => (p(), c("div", {
			class: "source-priority",
			"aria-label": e.label || void 0,
			role: "group"
		}, [A.value.length > 0 ? (p(), c("ol", v, [(p(!0), c(a, null, m(A.value, (e, n) => (p(), c("li", {
			key: e,
			class: "source-priority__item"
		}, [
			l("span", y, h(n + 1), 1),
			l("span", b, [u(h(e) + " ", 1), j(e) ? (p(), c("span", {
				key: 0,
				class: "source-priority__unknown",
				title: g(f)("source.notKnownSource")
			}, h(g(f)("source.unknownMark")), 9, x)) : s("", !0)]),
			l("div", S, [
				l("button", {
					type: "button",
					class: "source-priority__btn",
					disabled: n === 0,
					"aria-label": g(f)("source.moveUp", { name: e }),
					onClick: (e) => F(n)
				}, [d(t, { name: "arrow-up" })], 8, C),
				l("button", {
					type: "button",
					class: "source-priority__btn",
					disabled: n === A.value.length - 1,
					"aria-label": g(f)("source.moveDown", { name: e }),
					onClick: (e) => I(n)
				}, [d(t, { name: "arrow-down" })], 8, w),
				l("button", {
					type: "button",
					class: "source-priority__btn source-priority__btn--remove",
					"aria-label": g(f)("filter.removePill", { label: e }),
					onClick: (e) => L(n)
				}, [d(t, { name: "x" })], 8, T)
			])
		]))), 128))])) : (p(), c("p", E, h(g(f)("source.empty")), 1)), N.value ? (p(), c("div", D, [d(i, {
			"model-value": null,
			options: M.value,
			placeholder: g(f)("source.addPlaceholder"),
			label: e.label ? g(f)("source.addLabeled", { label: e.label }) : g(f)("source.add"),
			"onUpdate:modelValue": R
		}, null, 8, [
			"options",
			"placeholder",
			"label"
		])])) : s("", !0)], 8, _));
	}
}), [["__scopeId", "data-v-8423eb68"]]), k = class {
	constructor(e) {
		r(this, "client", void 0), this.client = e;
	}
	async listSources() {
		let { sources: e } = await this.client.get("/api/v1/admin/metadata/sources");
		return Array.isArray(e) ? e : [];
	}
};
export { O as n, k as t };

//# sourceMappingURL=metadata-sources-CymRfVHL.js.map