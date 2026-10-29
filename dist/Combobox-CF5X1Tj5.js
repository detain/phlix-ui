import { n as e, t } from "./Icon-CIwTuFLd.js";
import { t as n } from "./useMessages-D3tJ-unA.js";
import { n as r, r as i, t as a } from "./listbox-htyKA_G5.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, nextTick as h, normalizeClass as g, onBeforeUnmount as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, useId as ee, vShow as C, watch as w, withDirectives as T } from "vue";
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var E = { class: "phlix-combobox__field" }, D = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], O = ["id", "aria-label"], k = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], A = { class: "phlix-combobox__check" }, j = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, M = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "Combobox",
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
	setup(e, { emit: m }) {
		let M = e, { t: N } = n(), P = m, F = s(() => i(M.options)), I = ee(), L = y(!1), R = y(-1), z = y(""), B = y(!1), V = y(null), H = y(null), U = y(null), W = s(() => F.value.find((e) => e.value === M.modelValue)?.label ?? ""), G = s(() => {
			if (!B.value || z.value.trim() === "") return F.value;
			let e = z.value.toLowerCase();
			return F.value.filter((t) => t.label.toLowerCase().includes(e));
		}), K = s(() => R.value >= 0 ? `${I}-opt-${R.value}` : void 0);
		w(() => M.modelValue, () => {
			L.value || (z.value = W.value);
		}, { immediate: !0 });
		function q() {
			M.disabled || L.value || (L.value = !0, R.value = G.value.findIndex((e) => e.value === M.modelValue), R.value < 0 && (R.value = G.value.findIndex((e) => !e.disabled)), h(Z));
		}
		function J() {
			z.value = W.value, B.value = !1, L.value = !1;
		}
		function Y(e) {
			let t = G.value[e];
			!t || t.disabled || (t.value !== M.modelValue && (P("update:modelValue", t.value), P("change", t.value)), z.value = t.label, B.value = !1, L.value = !1, H.value?.focus());
		}
		function X(e) {
			G.value.length !== 0 && (R.value = r(G.value, R.value, e), h(Z));
		}
		function Z() {
			U.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function Q(e) {
			z.value = e.target.value, B.value = !0, L.value = !0, R.value = a(G.value, "first");
		}
		function te(e) {
			if (!M.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), L.value ? X(1) : q();
					break;
				case "ArrowUp":
					e.preventDefault(), L.value ? X(-1) : q();
					break;
				case "Enter":
					L.value && R.value >= 0 && (e.preventDefault(), Y(R.value));
					break;
				case "Escape":
					L.value && (e.preventDefault(), J());
					break;
				case "Tab": L.value && J();
			}
		}
		function $(e) {
			L.value && V.value && !V.value.contains(e.target) && J();
		}
		return w(L, (e) => {
			e ? document.addEventListener("pointerdown", $, !0) : document.removeEventListener("pointerdown", $, !0);
		}), _(() => document.removeEventListener("pointerdown", $, !0)), (n, r) => (v(), u("div", {
			ref_key: "rootEl",
			ref: V,
			class: g(["phlix-combobox", {
				"is-open": L.value,
				"is-disabled": e.disabled
			}])
		}, [d("div", E, [
			p(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			d("input", {
				ref_key: "inputEl",
				ref: H,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": L.value,
				"aria-controls": L.value ? `${S(I)}-list` : void 0,
				"aria-activedescendant": L.value ? K.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder ?? S(N)("common.searchPlaceholder"),
				disabled: e.disabled,
				value: z.value,
				onInput: Q,
				onFocus: q,
				onKeydown: te
			}, null, 40, D),
			p(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), T(d("ul", {
			id: `${S(I)}-list`,
			ref_key: "listEl",
			ref: U,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(v(!0), u(o, null, b(G.value, (n, r) => (v(), u("li", {
			id: `${S(I)}-opt-${r}`,
			key: n.value,
			class: g(["phlix-combobox__option", {
				"is-active": r === R.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => Y(r),
			onPointermove: (e) => !n.disabled && (R.value = r)
		}, [d("span", A, [n.value === e.modelValue ? (v(), c(t, {
			key: 0,
			name: "check"
		})) : l("", !0)]), f(" " + x(n.label), 1)], 42, k))), 128)), G.value.length === 0 ? (v(), u("li", j, x(S(N)("common.noMatches")), 1)) : l("", !0)], 8, O), [[C, L.value]])], 2));
	}
}), [["__scopeId", "data-v-9909c9c2"]]);
//#endregion
export { M as t };

//# sourceMappingURL=Combobox-CF5X1Tj5.js.map