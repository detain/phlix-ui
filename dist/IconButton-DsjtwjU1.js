import { n as e, t } from "./Icon-55iG1rR7.js";
import { createElementBlock as n, createVNode as r, defineComponent as i, normalizeClass as a, onBeforeUnmount as o, onMounted as s, openBlock as c, ref as l } from "vue";
// src/components/ui/IconButton.vue?vue&type=script&setup=true&lang.ts
var u = [
	"type",
	"disabled",
	"aria-disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], d = /*#__PURE__*/ e(/* @__PURE__ */ i({
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
		let i = e, d = l(null);
		function f(e) {
			i.loading && (e.preventDefault(), e.stopImmediatePropagation());
		}
		function p(e) {
			i.loading && e.submitter === d.value && (e.preventDefault(), e.stopImmediatePropagation());
		}
		let m = null;
		return s(() => {
			let e = d.value?.closest("form");
			e && (e.addEventListener("submit", p, !0), m = e);
		}), o(() => {
			m?.removeEventListener("submit", p, !0), m = null;
		}), (i, o) => (c(), n("button", {
			ref_key: "rootEl",
			ref: d,
			type: e.type,
			class: a(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{
					"is-pressed": e.pressed,
					"is-loading": e.loading
				}
			]]),
			disabled: e.disabled || void 0,
			"aria-disabled": e.loading || void 0,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0,
			onClick: f
		}, [r(t, {
			name: e.loading ? "spinner" : e.name,
			class: a({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, u));
	}
}), [["__scopeId", "data-v-ec6cd573"]]);
export { d as t };

//# sourceMappingURL=IconButton-DsjtwjU1.js.map