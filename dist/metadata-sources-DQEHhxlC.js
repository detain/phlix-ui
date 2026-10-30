import { n as e, t } from "./Icon-CIbfiPrs.js";
import { x as n } from "./client-pLl-rDdN.js";
import { t as r } from "./Select-CvK9Rhql.js";
import { Fragment as i, computed as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, openBlock as f, renderList as p, toDisplayString as m } from "vue";
// src/components/SourcePriorityEditor.vue?vue&type=script&setup=true&lang.ts
var h = ["aria-label"], g = {
	key: 0,
	class: "source-priority__list"
}, _ = {
	class: "source-priority__rank",
	"aria-hidden": "true"
}, v = { class: "source-priority__name" }, y = {
	key: 0,
	class: "source-priority__unknown",
	title: "Not a known source"
}, b = { class: "source-priority__controls" }, x = [
	"disabled",
	"aria-label",
	"onClick"
], S = [
	"disabled",
	"aria-label",
	"onClick"
], C = ["aria-label", "onClick"], w = {
	key: 1,
	class: "source-priority__empty",
	role: "status"
}, T = {
	key: 2,
	class: "source-priority__add"
}, E = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "SourcePriorityEditor",
	props: {
		modelValue: {},
		available: { default: () => [] },
		label: { default: "" }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: n }) {
		let d = e, E = n, D = a(() => Array.isArray(d.modelValue) ? d.modelValue : []);
		function O(e) {
			return !d.available.includes(e);
		}
		let k = a(() => d.available.filter((e) => !D.value.includes(e)).map((e) => ({
			value: e,
			label: e
		}))), A = a(() => k.value.length > 0);
		function j(e) {
			E("update:modelValue", e);
		}
		function M(e) {
			if (e <= 0) return;
			let t = D.value.slice();
			[t[e - 1], t[e]] = [t[e], t[e - 1]], j(t);
		}
		function N(e) {
			if (e >= D.value.length - 1) return;
			let t = D.value.slice();
			[t[e], t[e + 1]] = [t[e + 1], t[e]], j(t);
		}
		function P(e) {
			let t = D.value.slice();
			t.splice(e, 1), j(t);
		}
		function F(e) {
			let t = String(e);
			t && !D.value.includes(t) && j([...D.value, t]);
		}
		return (n, a) => (f(), s("div", {
			class: "source-priority",
			"aria-label": e.label || void 0,
			role: "group"
		}, [D.value.length > 0 ? (f(), s("ol", g, [(f(!0), s(i, null, p(D.value, (e, n) => (f(), s("li", {
			key: e,
			class: "source-priority__item"
		}, [
			c("span", _, m(n + 1), 1),
			c("span", v, [l(m(e) + " ", 1), O(e) ? (f(), s("span", y, " unknown ")) : o("", !0)]),
			c("div", b, [
				c("button", {
					type: "button",
					class: "source-priority__btn",
					disabled: n === 0,
					"aria-label": `Move ${e} up`,
					onClick: (e) => M(n)
				}, [u(t, { name: "arrow-up" })], 8, x),
				c("button", {
					type: "button",
					class: "source-priority__btn",
					disabled: n === D.value.length - 1,
					"aria-label": `Move ${e} down`,
					onClick: (e) => N(n)
				}, [u(t, { name: "arrow-down" })], 8, S),
				c("button", {
					type: "button",
					class: "source-priority__btn source-priority__btn--remove",
					"aria-label": `Remove ${e}`,
					onClick: (e) => P(n)
				}, [u(t, { name: "x" })], 8, C)
			])
		]))), 128))])) : (f(), s("p", w, " No sources — add one below. ")), A.value ? (f(), s("div", T, [u(r, {
			"model-value": null,
			options: k.value,
			placeholder: "Add a source…",
			label: e.label ? `Add a source to ${e.label}` : "Add a source",
			"onUpdate:modelValue": F
		}, null, 8, ["options", "label"])])) : o("", !0)], 8, h));
	}
}), [["__scopeId", "data-v-936354a6"]]), D = class {
	constructor(e) {
		n(this, "client", void 0), this.client = e;
	}
	async listSources() {
		let { sources: e } = await this.client.get("/api/v1/admin/metadata/sources");
		return Array.isArray(e) ? e : [];
	}
};
export { E as n, D as t };

//# sourceMappingURL=metadata-sources-DQEHhxlC.js.map