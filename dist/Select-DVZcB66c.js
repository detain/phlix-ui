import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-DCJifN0R.js";
import { Fragment as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createTextVNode as l, createVNode as u, defineComponent as d, nextTick as f, normalizeClass as p, onBeforeUnmount as m, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y, useId as b, vShow as x, watch as S, withDirectives as C } from "vue";
//#region src/components/ui/listbox.ts
function w(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function T(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function E(e, t) {
	return t === "first" ? T(e, -1, 1) : T(e, 0, -1);
}
//#endregion
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
], A = { class: "phlix-select__check" }, j = /*#__PURE__*/ e(/* @__PURE__ */ d({
	__name: "Select",
	props: {
		modelValue: {},
		options: {},
		placeholder: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: d }) {
		let j = e, { t: M } = n(), N = d, P = i(() => w(j.options)), F = b(), I = g(!1), L = g(-1), R = g(null), z = g(null), B = "", V, H = i(() => P.value.findIndex((e) => e.value === j.modelValue)), U = i(() => P.value[H.value]?.label ?? ""), W = i(() => L.value >= 0 ? `${F}-opt-${L.value}` : void 0);
		function G() {
			j.disabled || I.value || (I.value = !0, L.value = H.value >= 0 ? H.value : E(P.value, "first"), f(Y));
		}
		function K() {
			I.value = !1;
		}
		function q(e) {
			let t = P.value[e];
			!t || t.disabled || (t.value !== j.modelValue && (N("update:modelValue", t.value), N("change", t.value)), K(), R.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function J(e) {
			L.value = T(P.value, L.value, e), f(Y);
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
					I.value && (e.preventDefault(), L.value = E(P.value, "first"), f(Y));
					break;
				case "End":
					I.value && (e.preventDefault(), L.value = E(P.value, "last"), f(Y));
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
			t >= 0 && (L.value = t, f(Y));
		}
		function Q(e) {
			I.value && R.value && !R.value.contains(e.target) && K();
		}
		return S(I, (e) => {
			e ? document.addEventListener("pointerdown", Q, !0) : document.removeEventListener("pointerdown", Q, !0);
		}), m(() => {
			document.removeEventListener("pointerdown", Q, !0), clearTimeout(V);
		}), (n, i) => (h(), s("div", {
			ref_key: "rootEl",
			ref: R,
			class: p(["phlix-select", {
				"is-open": I.value,
				"is-disabled": e.disabled
			}])
		}, [c("button", {
			type: "button",
			class: "phlix-select__trigger",
			"aria-haspopup": "listbox",
			"aria-expanded": I.value,
			"aria-controls": I.value ? `${y(F)}-list` : void 0,
			"aria-activedescendant": I.value ? W.value : void 0,
			"aria-label": e.label,
			disabled: e.disabled,
			onClick: i[0] ||= (e) => I.value ? K() : G(),
			onKeydown: X
		}, [c("span", { class: p(["phlix-select__value", { "is-placeholder": H.value < 0 }]) }, v(H.value >= 0 ? U.value : e.placeholder ?? y(M)("common.selectPlaceholder")), 3), u(t, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, D), C(c("ul", {
			id: `${y(F)}-list`,
			ref_key: "listEl",
			ref: z,
			class: "phlix-select__list",
			role: "listbox",
			"aria-label": e.label
		}, [(h(!0), s(r, null, _(P.value, (n, r) => (h(), s("li", {
			id: `${y(F)}-opt-${r}`,
			key: n.value,
			class: p(["phlix-select__option", {
				"is-active": r === L.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => q(r),
			onPointermove: (e) => !n.disabled && (L.value = r)
		}, [c("span", A, [n.value === e.modelValue ? (h(), a(t, {
			key: 0,
			name: "check"
		})) : o("", !0)]), l(" " + v(n.label), 1)], 42, k))), 128))], 8, O), [[x, I.value]])], 2));
	}
}), [["__scopeId", "data-v-bb41381c"]]);
//#endregion
export { w as i, E as n, T as r, j as t };

//# sourceMappingURL=Select-DVZcB66c.js.map