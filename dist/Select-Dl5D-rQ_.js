import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./useMessages-Cbrqh0Aa.js";
import { n as r, r as i, t as a } from "./listbox-htyKA_G5.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, mergeModels as h, nextTick as g, normalizeClass as _, onBeforeUnmount as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, useId as ee, useModel as te, vShow as ne, watch as w, withDirectives as T } from "vue";
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
], k = { class: "phlix-select__check" }, A = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "Select",
	props: /*@__PURE__*/ h({
		modelValue: {},
		options: {},
		placeholder: {},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		tone: { default: "default" }
	}, {
		open: {
			type: Boolean,
			default: !1
		},
		openModifiers: {}
	}),
	emits: /*@__PURE__*/ h(["update:modelValue", "change"], ["update:open"]),
	setup(e, { expose: m, emit: h }) {
		let A = e, { t: j } = n(), M = h, N = s(() => i(A.options)), P = ee(), F = b(!1), I = b(-1), L = b(null), R = b(null);
		function z() {
			F.value ? Y() : J();
		}
		m({ toggleMenu: z });
		let B = "", V, H = te(e, "open"), U = s(() => N.value.findIndex((e) => e.value === A.modelValue));
		w(H, (e) => {
			e && !F.value ? J() : !e && F.value && Y();
		}, { immediate: !0 });
		let W = s(() => N.value[U.value]?.label ?? ""), G = s(() => I.value >= 0 ? `${P}-opt-${I.value}` : void 0), K = b(!1);
		function q() {
			let e = L.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			K.value = n < 284 && r > n;
		}
		function J() {
			A.disabled || F.value || (q(), F.value = !0, I.value = U.value >= 0 ? U.value : a(N.value, "first"), g(Q));
		}
		function Y() {
			F.value = !1;
		}
		function X(e) {
			let t = N.value[e];
			!t || t.disabled || (t.value !== A.modelValue && (M("update:modelValue", t.value), M("change", t.value)), Y(), L.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function Z(e) {
			I.value = r(N.value, I.value, e), g(Q);
		}
		function Q() {
			(R.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function re(e) {
			if (!A.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), F.value ? Z(1) : J();
					break;
				case "ArrowUp":
					e.preventDefault(), F.value ? Z(-1) : J();
					break;
				case "Home":
					F.value && (e.preventDefault(), I.value = a(N.value, "first"), g(Q));
					break;
				case "End":
					F.value && (e.preventDefault(), I.value = a(N.value, "last"), g(Q));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), F.value && I.value >= 0 ? X(I.value) : J();
					break;
				case "Escape":
					F.value && (e.preventDefault(), Y());
					break;
				case "Tab":
					Y();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && ie(e.key);
			}
		}
		function ie(e) {
			F.value || J(), B += e.toLowerCase(), clearTimeout(V), V = setTimeout(() => B = "", 600);
			let t = N.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(B));
			t >= 0 && (I.value = t, g(Q));
		}
		function $(e) {
			F.value && L.value && !L.value.contains(e.target) && Y();
		}
		return w(F, (e) => {
			e ? document.addEventListener("pointerdown", $, !0) : document.removeEventListener("pointerdown", $, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", $, !0), clearTimeout(V);
		}), (n, r) => (y(), u("div", {
			ref_key: "rootEl",
			ref: L,
			class: _(["phlix-select", {
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
			"aria-controls": F.value ? `${C(P)}-list` : void 0,
			"aria-activedescendant": F.value ? G.value : void 0,
			"aria-label": e.label,
			disabled: e.disabled,
			onClick: r[0] ||= (e) => F.value ? Y() : J(),
			onKeydown: re
		}, [d("span", { class: _(["phlix-select__value", { "is-placeholder": U.value < 0 }]) }, S(U.value >= 0 ? W.value : e.placeholder ?? C(j)("common.selectPlaceholder")), 3), p(t, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, E), T(d("ul", {
			id: `${C(P)}-list`,
			ref_key: "listEl",
			ref: R,
			class: _(["phlix-select__list", { "is-up": K.value }]),
			role: "listbox",
			"aria-label": e.label
		}, [(y(!0), u(o, null, x(N.value, (n, r) => (y(), u("li", {
			id: `${C(P)}-opt-${r}`,
			key: n.value,
			class: _(["phlix-select__option", {
				"is-active": r === I.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => X(r),
			onPointermove: (e) => !n.disabled && (I.value = r)
		}, [d("span", k, [n.value === e.modelValue ? (y(), c(t, {
			key: 0,
			name: "check"
		})) : l("", !0)]), f(" " + S(n.label), 1)], 42, O))), 128))], 10, D), [[ne, F.value]])], 2));
	}
}), [["__scopeId", "data-v-be7bae5f"]]);
//#endregion
export { A as t };

//# sourceMappingURL=Select-Dl5D-rQ_.js.map