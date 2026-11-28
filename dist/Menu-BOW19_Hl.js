import { t as e } from "./useMessages-C-PrFAcm.js";
import { n as t } from "./Icon-55iG1rR7.js";
import { Fragment as n, Teleport as r, Transition as i, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createTextVNode as l, createVNode as u, defineComponent as d, nextTick as f, normalizeClass as p, normalizeStyle as m, onBeforeUnmount as h, openBlock as g, ref as _, renderList as v, renderSlot as y, toDisplayString as b, unref as x, useId as S, watch as C, withCtx as w } from "vue";
// src/components/ui/Menu.vue?vue&type=script&setup=true&lang.ts
var T = ["id"], E = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], D = /*#__PURE__*/ t(/* @__PURE__ */ d({
	__name: "Menu",
	props: {
		items: {},
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "select"],
	setup(t, { emit: d }) {
		let { t: D } = e();
		function O(e, t, n) {
			let r = e.length;
			if (r === 0) return -1;
			let i = t;
			for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
			return t;
		}
		function k(e, t) {
			return t === "first" ? O(e, -1, 1) : O(e, 0, -1);
		}
		let A = t, j = d, M = S(), N = a(() => `${M}-menu`), P = _(A.open);
		C(() => A.open, (e) => P.value = e), C(P, (e) => j("update:open", e));
		let F = _(null), I = _(null), L = _(-1), R = _(!1), z = _({});
		function B() {
			P.value || (P.value = !0, L.value = k(A.items, "first"), f(() => {
				G(), I.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function V() {
			P.value = !1, L.value = -1, F.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function H() {
			P.value ? V() : B();
		}
		function U(e) {
			L.value = O(A.items, L.value, e), f(() => {
				I.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function W(e) {
			let t = A.items[e];
			t && !t.disabled && (j("select", t, e), t.onClick?.(), V());
		}
		function G() {
			if (!F.value) return;
			let e = F.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = I.value?.offsetWidth ?? 200, i = I.value?.offsetHeight ?? 280, a = n - e.bottom;
			R.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = R.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			z.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function K(e) {
			P.value || (P.value = !0, L.value = k(A.items, e), f(() => {
				G(), I.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function q(e) {
			if (P.value) J(e);
			else {
				if (e.key === "ArrowDown") {
					e.preventDefault(), K("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), K("last");
					return;
				}
			}
		}
		function J(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), U(1);
					break;
				case "ArrowUp":
					e.preventDefault(), U(-1);
					break;
				case "Home":
					e.preventDefault(), L.value = k(A.items, "first"), f(() => I.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), L.value = k(A.items, "last"), f(() => I.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), L.value >= 0 && W(L.value);
					break;
				case "Escape":
					e.preventDefault(), V();
					break;
				case "Tab": e.preventDefault(), V();
			}
		}
		function Y(e) {
			P.value && F.value && I.value && !F.value.contains(e.target) && !I.value.contains(e.target) && V();
		}
		return C(P, (e) => {
			e ? document.addEventListener("pointerdown", Y, !0) : document.removeEventListener("pointerdown", Y, !0);
		}), h(() => {
			document.removeEventListener("pointerdown", Y, !0);
		}), (e, a) => (g(), c("div", {
			ref_key: "triggerEl",
			ref: F,
			class: "phlix-menu",
			onClick: H,
			onKeydown: q
		}, [y(e.$slots, "default", {
			open: P.value,
			toggle: H,
			openMenu: B
		}, void 0, !0), (g(), o(r, { to: "body" }, [u(i, { name: "phlix-menu" }, {
			default: w(() => [P.value ? (g(), c("div", {
				key: 0,
				id: N.value,
				ref_key: "menuEl",
				ref: I,
				class: p(["phlix-menu__list", { "is-flipped": R.value }]),
				style: m(z.value),
				role: "menu",
				onKeydown: J
			}, [(g(!0), c(n, null, v(t.items, (t, n) => (g(), c("button", {
				key: n,
				type: "button",
				class: p(["phlix-menu__item", {
					"is-active": n === L.value,
					"is-danger": t.danger,
					"is-disabled": t.disabled
				}]),
				role: "menuitem",
				tabindex: n === L.value ? 0 : -1,
				"aria-disabled": t.disabled || void 0,
				"aria-label": t.danger ? x(D)("itemActions.dangerSuffix", { label: t.label }) : t.label,
				onClick: (e) => W(n),
				onPointermove: (e) => !t.disabled && (L.value = n)
			}, [y(e.$slots, "item", {
				item: t,
				index: n
			}, () => [l(b(t.label), 1)], !0)], 42, E))), 128))], 46, T)) : s("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-dc706352"]]);
export { D as t };

//# sourceMappingURL=Menu-BOW19_Hl.js.map