import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./useMessages-QU3qvt7A.js";
import { n as r, r as i, t as a } from "./listbox-htyKA_G5.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as ee, createVNode as f, defineComponent as p, nextTick as m, normalizeClass as h, onBeforeUnmount as g, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, useId as S, vShow as C, watch as w, withDirectives as T } from "vue";
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var E = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], D = ["id", "aria-label"], O = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], k = { class: "phlix-select__check" }, A = /*#__PURE__*/ e(/* @__PURE__ */ p({
	__name: "Select",
	props: {
		modelValue: {},
		options: {},
		placeholder: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		tone: { default: "default" }
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: p }) {
		let A = e, { t: j } = n(), M = p, N = s(() => i(A.options)), P = S(), F = v(!1), I = v(-1), L = v(null), R = v(null), z = "", B, V = s(() => N.value.findIndex((e) => e.value === A.modelValue)), H = s(() => N.value[V.value]?.label ?? ""), U = s(() => I.value >= 0 ? `${P}-opt-${I.value}` : void 0), W = v(!1);
		function G() {
			let e = L.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			W.value = n < 284 && r > n;
		}
		function K() {
			A.disabled || F.value || (G(), F.value = !0, I.value = V.value >= 0 ? V.value : a(N.value, "first"), m(X));
		}
		function q() {
			F.value = !1;
		}
		function J(e) {
			let t = N.value[e];
			!t || t.disabled || (t.value !== A.modelValue && (M("update:modelValue", t.value), M("change", t.value)), q(), L.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function Y(e) {
			I.value = r(N.value, I.value, e), m(X);
		}
		function X() {
			(R.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function Z(e) {
			if (!A.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), F.value ? Y(1) : K();
					break;
				case "ArrowUp":
					e.preventDefault(), F.value ? Y(-1) : K();
					break;
				case "Home":
					F.value && (e.preventDefault(), I.value = a(N.value, "first"), m(X));
					break;
				case "End":
					F.value && (e.preventDefault(), I.value = a(N.value, "last"), m(X));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), F.value && I.value >= 0 ? J(I.value) : K();
					break;
				case "Escape":
					F.value && (e.preventDefault(), q());
					break;
				case "Tab":
					q();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && Q(e.key);
			}
		}
		function Q(e) {
			F.value || K(), z += e.toLowerCase(), clearTimeout(B), B = setTimeout(() => z = "", 600);
			let t = N.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(z));
			t >= 0 && (I.value = t, m(X));
		}
		function $(e) {
			F.value && L.value && !L.value.contains(e.target) && q();
		}
		return w(F, (e) => {
			e ? document.addEventListener("pointerdown", $, !0) : document.removeEventListener("pointerdown", $, !0);
		}), g(() => {
			document.removeEventListener("pointerdown", $, !0), clearTimeout(B);
		}), (n, r) => (_(), u("div", {
			ref_key: "rootEl",
			ref: L,
			class: h(["phlix-select", {
				"is-open": F.value,
				"is-disabled": e.disabled,
				"is-glass": e.tone === "glass"
			}])
		}, [d("button", {
			type: "button",
			class: "phlix-select__trigger",
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": F.value,
			"aria-controls": F.value ? `${x(P)}-list` : void 0,
			"aria-activedescendant": F.value ? U.value : void 0,
			"aria-label": e.label,
			disabled: e.disabled,
			onClick: r[0] ||= (e) => F.value ? q() : K(),
			onKeydown: Z
		}, [d("span", { class: h(["phlix-select__value", { "is-placeholder": V.value < 0 }]) }, b(V.value >= 0 ? H.value : e.placeholder ?? x(j)("common.selectPlaceholder")), 3), f(t, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, E), T(d("ul", {
			id: `${x(P)}-list`,
			ref_key: "listEl",
			ref: R,
			class: h(["phlix-select__list", { "is-up": W.value }]),
			role: "listbox",
			"aria-label": e.label
		}, [(_(!0), u(o, null, y(N.value, (n, r) => (_(), u("li", {
			id: `${x(P)}-opt-${r}`,
			key: n.value,
			class: h(["phlix-select__option", {
				"is-active": r === I.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => J(r),
			onPointermove: (e) => !n.disabled && (I.value = r)
		}, [d("span", k, [n.value === e.modelValue ? (_(), c(t, {
			key: 0,
			name: "check"
		})) : l("", !0)]), ee(" " + b(n.label), 1)], 42, O))), 128))], 10, D), [[C, F.value]])], 2));
	}
}), [["__scopeId", "data-v-eb762871"]]);
//#endregion
export { A as t };

//# sourceMappingURL=Select-Bx8h2mSF.js.map