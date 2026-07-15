import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-X5skTbAE.js";
import { t as n } from "./useMessages-Cbrqh0Aa.js";
import { n as r, r as i, t as a } from "./listbox-htyKA_G5.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, mergeModels as h, nextTick as g, normalizeClass as _, onBeforeUnmount as ee, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, useId as C, useModel as w, vShow as T, watch as E, withDirectives as D } from "vue";
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var O = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], k = ["id", "aria-label"], A = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], j = { class: "phlix-select__check" }, M = /*#__PURE__*/ e(/* @__PURE__ */ m({
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
		let M = e, { t: te } = n(), N = h, P = s(() => i(M.options)), F = C(), I = y(!1), L = y(-1), R = y(null), z = y(null);
		function B() {
			I.value ? Y() : J();
		}
		m({ toggleMenu: B });
		let V = "", H;
		E(w(e, "open"), (e) => {
			e && !I.value ? J() : !e && I.value && Y();
		}, { immediate: !0 });
		let U = s(() => P.value.findIndex((e) => e.value === M.modelValue)), W = s(() => P.value[U.value]?.label ?? ""), G = s(() => L.value >= 0 ? `${F}-opt-${L.value}` : void 0), K = y(!1);
		function q() {
			let e = R.value;
			if (!e) return;
			let t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) - t.bottom, r = t.top;
			K.value = n < 284 && r > n;
		}
		function J() {
			M.disabled || I.value || (q(), I.value = !0, L.value = U.value >= 0 ? U.value : a(P.value, "first"), g(Q));
		}
		function Y() {
			I.value = !1;
		}
		function X(e) {
			let t = P.value[e];
			!t || t.disabled || (t.value !== M.modelValue && (N("update:modelValue", t.value), N("change", t.value)), Y(), R.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function Z(e) {
			L.value = r(P.value, L.value, e), g(Q);
		}
		function Q() {
			(z.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function ne(e) {
			if (!M.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), I.value ? Z(1) : J();
					break;
				case "ArrowUp":
					e.preventDefault(), I.value ? Z(-1) : J();
					break;
				case "Home":
					I.value && (e.preventDefault(), L.value = a(P.value, "first"), g(Q));
					break;
				case "End":
					I.value && (e.preventDefault(), L.value = a(P.value, "last"), g(Q));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), I.value && L.value >= 0 ? X(L.value) : J();
					break;
				case "Escape":
					I.value && (e.preventDefault(), Y());
					break;
				case "Tab":
					Y();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && re(e.key);
			}
		}
		function re(e) {
			I.value || J(), V += e.toLowerCase(), clearTimeout(H), H = setTimeout(() => V = "", 600);
			let t = P.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(V));
			t >= 0 && (L.value = t, g(Q));
		}
		function $(e) {
			I.value && R.value && !R.value.contains(e.target) && Y();
		}
		return E(I, (e) => {
			e ? document.addEventListener("pointerdown", $, !0) : document.removeEventListener("pointerdown", $, !0);
		}), ee(() => {
			document.removeEventListener("pointerdown", $, !0), clearTimeout(H);
		}), (n, r) => (v(), u("div", {
			ref_key: "rootEl",
			ref: R,
			class: _(["phlix-select", {
				"is-open": I.value,
				"is-disabled": e.disabled,
				"is-glass": e.tone === "glass"
			}])
		}, [d("button", {
			type: "button",
			class: "phlix-select__trigger",
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": I.value,
			"aria-controls": I.value ? `${S(F)}-list` : void 0,
			"aria-activedescendant": I.value ? G.value : void 0,
			"aria-label": e.label,
			disabled: e.disabled,
			onClick: r[0] ||= (e) => I.value ? Y() : J(),
			onKeydown: ne
		}, [d("span", { class: _(["phlix-select__value", { "is-placeholder": U.value < 0 }]) }, x(U.value >= 0 ? W.value : e.placeholder ?? S(te)("common.selectPlaceholder")), 3), p(t, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, O), D(d("ul", {
			id: `${S(F)}-list`,
			ref_key: "listEl",
			ref: z,
			class: _(["phlix-select__list", { "is-up": K.value }]),
			role: "listbox",
			"aria-label": e.label
		}, [(v(!0), u(o, null, b(P.value, (n, r) => (v(), u("li", {
			id: `${S(F)}-opt-${r}`,
			key: n.value,
			class: _(["phlix-select__option", {
				"is-active": r === L.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => X(r),
			onPointermove: (e) => !n.disabled && (L.value = r)
		}, [d("span", j, [n.value === e.modelValue ? (v(), c(t, {
			key: 0,
			name: "check"
		})) : l("", !0)]), f(" " + x(n.label), 1)], 42, A))), 128))], 10, k), [[T, I.value]])], 2));
	}
}), [["__scopeId", "data-v-2613af10"]]);
//#endregion
export { M as t };

//# sourceMappingURL=Select-DwAQcvz1.js.map