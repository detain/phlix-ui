import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./Select-Jxt3ozRc.js";
import { Fragment as r, computed as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, openBlock as d, renderList as f, toDisplayString as p } from "vue";
//#region src/components/SourcePriorityEditor.vue?vue&type=script&setup=true&lang.ts
var m = ["aria-label"], h = {
	key: 0,
	class: "source-priority__list"
}, g = {
	class: "source-priority__rank",
	"aria-hidden": "true"
}, _ = { class: "source-priority__name" }, v = {
	key: 0,
	class: "source-priority__unknown",
	title: "Not a known source"
}, y = { class: "source-priority__controls" }, b = [
	"disabled",
	"aria-label",
	"onClick"
], x = [
	"disabled",
	"aria-label",
	"onClick"
], S = ["aria-label", "onClick"], C = {
	key: 1,
	class: "source-priority__empty",
	role: "status"
}, w = {
	key: 2,
	class: "source-priority__add"
}, T = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "SourcePriorityEditor",
	props: {
		modelValue: {},
		available: { default: () => [] },
		label: { default: "" }
	},
	emits: ["update:modelValue"],
	setup(e, { emit: u }) {
		let T = e, E = u, D = i(() => Array.isArray(T.modelValue) ? T.modelValue : []);
		function O(e) {
			return !T.available.includes(e);
		}
		let k = i(() => T.available.filter((e) => !D.value.includes(e)).map((e) => ({
			value: e,
			label: e
		}))), A = i(() => k.value.length > 0);
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
			!t || D.value.includes(t) || j([...D.value, t]);
		}
		return (i, u) => (d(), o("div", {
			class: "source-priority",
			"aria-label": e.label || void 0,
			role: "group"
		}, [D.value.length > 0 ? (d(), o("ol", h, [(d(!0), o(r, null, f(D.value, (e, n) => (d(), o("li", {
			key: e,
			class: "source-priority__item"
		}, [
			s("span", g, p(n + 1), 1),
			s("span", _, [c(p(e) + " ", 1), O(e) ? (d(), o("span", v, " unknown ")) : a("", !0)]),
			s("div", y, [
				s("button", {
					type: "button",
					class: "source-priority__btn",
					disabled: n === 0,
					"aria-label": `Move ${e} up`,
					onClick: (e) => M(n)
				}, [l(t, { name: "arrow-up" })], 8, b),
				s("button", {
					type: "button",
					class: "source-priority__btn",
					disabled: n === D.value.length - 1,
					"aria-label": `Move ${e} down`,
					onClick: (e) => N(n)
				}, [l(t, { name: "arrow-down" })], 8, x),
				s("button", {
					type: "button",
					class: "source-priority__btn source-priority__btn--remove",
					"aria-label": `Remove ${e}`,
					onClick: (e) => P(n)
				}, [l(t, { name: "x" })], 8, S)
			])
		]))), 128))])) : (d(), o("p", C, " No sources — add one below. ")), A.value ? (d(), o("div", w, [l(n, {
			"model-value": null,
			options: k.value,
			placeholder: "Add a source…",
			label: e.label ? `Add a source to ${e.label}` : "Add a source",
			"onUpdate:modelValue": F
		}, null, 8, ["options", "label"])])) : a("", !0)], 8, m));
	}
}), [["__scopeId", "data-v-936354a6"]]), E = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listSources() {
		let { sources: e } = await this.client.get("/api/v1/admin/metadata/sources");
		return Array.isArray(e) ? e : [];
	}
};
//#endregion
export { T as n, E as t };

//# sourceMappingURL=metadata-sources-bxLQT4lm.js.map