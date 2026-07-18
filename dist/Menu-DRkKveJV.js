import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { Fragment as t, Teleport as n, Transition as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createTextVNode as c, createVNode as l, defineComponent as u, nextTick as d, normalizeClass as f, normalizeStyle as p, onBeforeUnmount as m, openBlock as h, ref as g, renderList as _, renderSlot as v, toDisplayString as y, watch as b, withCtx as x } from "vue";
//#region src/components/ui/Menu.vue?vue&type=script&setup=true&lang.ts
var S = ["id"], C = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], w = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "Menu",
	props: {
		items: {},
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "select"],
	setup(e, { emit: u }) {
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
		let E = e, D = u, O = crypto.randomUUID(), k = i(() => `${O}-menu`), A = g(E.open);
		b(() => E.open, (e) => A.value = e), b(A, (e) => D("update:open", e));
		let j = g(null), M = g(null), N = g(-1), P = g(!1), F = g({});
		function I() {
			A.value || (A.value = !0, N.value = T(E.items, "first"), d(() => {
				V(), M.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function L() {
			A.value = !1, N.value = -1, j.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function R() {
			A.value ? L() : I();
		}
		function z(e) {
			N.value = w(E.items, N.value, e), d(() => {
				M.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function B(e) {
			let t = E.items[e];
			!t || t.disabled || (D("select", t, e), t.onClick?.(), L());
		}
		function V() {
			if (!j.value) return;
			let e = j.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = M.value?.offsetWidth ?? 200, i = M.value?.offsetHeight ?? 280, a = n - e.bottom;
			P.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = P.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			F.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function H(e) {
			A.value || (A.value = !0, N.value = T(E.items, e), d(() => {
				V(), M.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function U(e) {
			if (!A.value) {
				if (e.key === "ArrowDown") {
					e.preventDefault(), H("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), H("last");
					return;
				}
				return;
			}
			W(e);
		}
		function W(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), z(1);
					break;
				case "ArrowUp":
					e.preventDefault(), z(-1);
					break;
				case "Home":
					e.preventDefault(), N.value = T(E.items, "first"), d(() => M.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), N.value = T(E.items, "last"), d(() => M.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), N.value >= 0 && B(N.value);
					break;
				case "Escape":
					e.preventDefault(), L();
					break;
				case "Tab":
					e.preventDefault(), L();
					break;
			}
		}
		function G(e) {
			A.value && j.value && M.value && !j.value.contains(e.target) && !M.value.contains(e.target) && L();
		}
		return b(A, (e) => {
			e ? document.addEventListener("pointerdown", G, !0) : document.removeEventListener("pointerdown", G, !0);
		}), m(() => {
			document.removeEventListener("pointerdown", G, !0);
		}), (i, u) => (h(), s("div", {
			ref_key: "triggerEl",
			ref: j,
			class: "phlix-menu",
			onClick: R,
			onKeydown: U
		}, [v(i.$slots, "default", {
			open: A.value,
			toggle: R,
			openMenu: I
		}, void 0, !0), (h(), a(n, { to: "body" }, [l(r, { name: "phlix-menu" }, {
			default: x(() => [A.value ? (h(), s("div", {
				key: 0,
				id: k.value,
				ref_key: "menuEl",
				ref: M,
				class: f(["phlix-menu__list", { "is-flipped": P.value }]),
				style: p(F.value),
				role: "menu",
				onKeydown: W
			}, [(h(!0), s(t, null, _(e.items, (e, t) => (h(), s("button", {
				key: t,
				type: "button",
				class: f(["phlix-menu__item", {
					"is-active": t === N.value,
					"is-danger": e.danger,
					"is-disabled": e.disabled
				}]),
				role: "menuitem",
				tabindex: t === N.value ? 0 : -1,
				"aria-disabled": e.disabled || void 0,
				"aria-label": e.danger ? e.label + " (danger)" : e.label,
				onClick: (e) => B(t),
				onPointermove: (n) => !e.disabled && (N.value = t)
			}, [v(i.$slots, "item", {
				item: e,
				index: t
			}, () => [c(y(e.label), 1)], !0)], 42, C))), 128))], 46, S)) : o("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-53e3f39d"]]);
//#endregion
export { w as t };

//# sourceMappingURL=Menu-DRkKveJV.js.map