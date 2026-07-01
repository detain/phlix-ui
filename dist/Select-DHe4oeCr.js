import { n as e, t } from "./Icon-24ngwBUH.js";
import { t as n } from "./useMessages-C21WhqOh.js";
import { n as r, r as i, t as a } from "./listbox-htyKA_G5.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, nextTick as h, normalizeClass as g, onBeforeUnmount as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, useId as C, vShow as w, watch as T, withDirectives as E } from "vue";
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var D = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], O = ["id", "aria-label"], k = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], A = { class: "phlix-select__check" }, j = /*#__PURE__*/ e(/* @__PURE__ */ m({
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
	setup(e, { emit: m }) {
		let j = e, { t: M } = n(), N = m, P = s(() => i(j.options)), F = C(), I = y(!1), L = y(-1), R = y(null), z = y(null), B = "", V, H = s(() => P.value.findIndex((e) => e.value === j.modelValue)), U = s(() => P.value[H.value]?.label ?? ""), W = s(() => L.value >= 0 ? `${F}-opt-${L.value}` : void 0);
		function G() {
			j.disabled || I.value || (I.value = !0, L.value = H.value >= 0 ? H.value : a(P.value, "first"), h(Y));
		}
		function K() {
			I.value = !1;
		}
		function q(e) {
			let t = P.value[e];
			!t || t.disabled || (t.value !== j.modelValue && (N("update:modelValue", t.value), N("change", t.value)), K(), R.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function J(e) {
			L.value = r(P.value, L.value, e), h(Y);
		}
		function Y() {
			(z.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function X(e) {
			if (!j.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), I.value ? J(1) : G();
					break;
				case "ArrowUp":
					e.preventDefault(), I.value ? J(-1) : G();
					break;
				case "Home":
					I.value && (e.preventDefault(), L.value = a(P.value, "first"), h(Y));
					break;
				case "End":
					I.value && (e.preventDefault(), L.value = a(P.value, "last"), h(Y));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), I.value && L.value >= 0 ? q(L.value) : G();
					break;
				case "Escape":
					I.value && (e.preventDefault(), K());
					break;
				case "Tab":
					K();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && Z(e.key);
			}
		}
		function Z(e) {
			I.value || G(), B += e.toLowerCase(), clearTimeout(V), V = setTimeout(() => B = "", 600);
			let t = P.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(B));
			t >= 0 && (L.value = t, h(Y));
		}
		function Q(e) {
			I.value && R.value && !R.value.contains(e.target) && K();
		}
		return T(I, (e) => {
			e ? document.addEventListener("pointerdown", Q, !0) : document.removeEventListener("pointerdown", Q, !0);
		}), _(() => {
			document.removeEventListener("pointerdown", Q, !0), clearTimeout(V);
		}), (n, r) => (v(), u("div", {
			ref_key: "rootEl",
			ref: R,
			class: g(["phlix-select", {
				"is-open": I.value,
				"is-disabled": e.disabled,
				"is-glass": e.tone === "glass"
			}])
		}, [d("button", {
			type: "button",
			class: "phlix-select__trigger",
			"aria-haspopup": "listbox",
			"aria-expanded": I.value,
			"aria-controls": I.value ? `${S(F)}-list` : void 0,
			"aria-activedescendant": I.value ? W.value : void 0,
			"aria-label": e.label,
			disabled: e.disabled,
			onClick: r[0] ||= (e) => I.value ? K() : G(),
			onKeydown: X
		}, [d("span", { class: g(["phlix-select__value", { "is-placeholder": H.value < 0 }]) }, x(H.value >= 0 ? U.value : e.placeholder ?? S(M)("common.selectPlaceholder")), 3), p(t, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, D), E(d("ul", {
			id: `${S(F)}-list`,
			ref_key: "listEl",
			ref: z,
			class: "phlix-select__list",
			role: "listbox",
			"aria-label": e.label
		}, [(v(!0), u(o, null, b(P.value, (n, r) => (v(), u("li", {
			id: `${S(F)}-opt-${r}`,
			key: n.value,
			class: g(["phlix-select__option", {
				"is-active": r === L.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => q(r),
			onPointermove: (e) => !n.disabled && (L.value = r)
		}, [d("span", A, [n.value === e.modelValue ? (v(), c(t, {
			key: 0,
			name: "check"
		})) : l("", !0)]), f(" " + x(n.label), 1)], 42, k))), 128))], 8, O), [[w, I.value]])], 2));
	}
}), [["__scopeId", "data-v-2de746a0"]]);
//#endregion
export { j as t };

//# sourceMappingURL=Select-DHe4oeCr.js.map