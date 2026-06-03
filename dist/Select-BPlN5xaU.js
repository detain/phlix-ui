import { m as e, p as t } from "./Button-DjEQ9y17.js";
import { Fragment as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, nextTick as d, normalizeClass as f, onBeforeUnmount as p, openBlock as m, ref as h, renderList as g, toDisplayString as _, unref as v, useId as y, vShow as b, watch as x, withDirectives as S } from "vue";
//#region src/components/ui/listbox.ts
function C(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function w(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function T(e, t) {
	return t === "first" ? w(e, -1, 1) : w(e, 0, -1);
}
//#endregion
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
], k = { class: "phlix-select__check" }, A = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "Select",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Select…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: u }) {
		let A = e, j = u, M = r(() => C(A.options)), N = y(), P = h(!1), F = h(-1), I = h(null), L = h(null), R = "", z, B = r(() => M.value.findIndex((e) => e.value === A.modelValue)), V = r(() => M.value[B.value]?.label ?? ""), H = r(() => F.value >= 0 ? `${N}-opt-${F.value}` : void 0);
		function U() {
			A.disabled || P.value || (P.value = !0, F.value = B.value >= 0 ? B.value : T(M.value, "first"), d(q));
		}
		function W() {
			P.value = !1;
		}
		function G(e) {
			let t = M.value[e];
			!t || t.disabled || (t.value !== A.modelValue && (j("update:modelValue", t.value), j("change", t.value)), W(), I.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function K(e) {
			F.value = w(M.value, F.value, e), d(q);
		}
		function q() {
			(L.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function J(e) {
			if (!A.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), P.value ? K(1) : U();
					break;
				case "ArrowUp":
					e.preventDefault(), P.value ? K(-1) : U();
					break;
				case "Home":
					P.value && (e.preventDefault(), F.value = T(M.value, "first"), d(q));
					break;
				case "End":
					P.value && (e.preventDefault(), F.value = T(M.value, "last"), d(q));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), P.value && F.value >= 0 ? G(F.value) : U();
					break;
				case "Escape":
					P.value && (e.preventDefault(), W());
					break;
				case "Tab":
					W();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && Y(e.key);
			}
		}
		function Y(e) {
			P.value || U(), R += e.toLowerCase(), clearTimeout(z), z = setTimeout(() => R = "", 600);
			let t = M.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(R));
			t >= 0 && (F.value = t, d(q));
		}
		function X(e) {
			P.value && I.value && !I.value.contains(e.target) && W();
		}
		return x(P, (e) => {
			e ? document.addEventListener("pointerdown", X, !0) : document.removeEventListener("pointerdown", X, !0);
		}), p(() => {
			document.removeEventListener("pointerdown", X, !0), clearTimeout(z);
		}), (r, u) => (m(), o("div", {
			ref_key: "rootEl",
			ref: I,
			class: f(["phlix-select", {
				"is-open": P.value,
				"is-disabled": e.disabled
			}])
		}, [s("button", {
			type: "button",
			class: "phlix-select__trigger",
			"aria-haspopup": "listbox",
			"aria-expanded": P.value,
			"aria-controls": P.value ? `${v(N)}-list` : void 0,
			"aria-activedescendant": P.value ? H.value : void 0,
			"aria-label": e.label,
			disabled: e.disabled,
			onClick: u[0] ||= (e) => P.value ? W() : U(),
			onKeydown: J
		}, [s("span", { class: f(["phlix-select__value", { "is-placeholder": B.value < 0 }]) }, _(B.value >= 0 ? V.value : e.placeholder), 3), l(t, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, E), S(s("ul", {
			id: `${v(N)}-list`,
			ref_key: "listEl",
			ref: L,
			class: "phlix-select__list",
			role: "listbox",
			"aria-label": e.label
		}, [(m(!0), o(n, null, g(M.value, (n, r) => (m(), o("li", {
			id: `${v(N)}-opt-${r}`,
			key: n.value,
			class: f(["phlix-select__option", {
				"is-active": r === F.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => G(r),
			onPointermove: (e) => !n.disabled && (F.value = r)
		}, [s("span", k, [n.value === e.modelValue ? (m(), i(t, {
			key: 0,
			name: "check"
		})) : a("", !0)]), c(" " + _(n.label), 1)], 42, O))), 128))], 8, D), [[b, P.value]])], 2));
	}
}), [["__scopeId", "data-v-db34d47a"]]);
//#endregion
export { C as i, T as n, w as r, A as t };

//# sourceMappingURL=Select-BPlN5xaU.js.map