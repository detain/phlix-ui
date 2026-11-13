import { t as e } from "./useMessages-B96K7XS0.js";
import { n as t } from "./Icon-55iG1rR7.js";
import { Fragment as n, Teleport as r, Transition as i, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createTextVNode as l, createVNode as u, defineComponent as d, nextTick as f, normalizeClass as p, normalizeStyle as m, onBeforeUnmount as h, openBlock as g, ref as _, renderList as v, renderSlot as y, toDisplayString as b, unref as x, watch as S, withCtx as C } from "vue";
// src/components/ui/Menu.vue?vue&type=script&setup=true&lang.ts
var w = ["id"], T = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onClick",
	"onPointermove"
], E = /*#__PURE__*/ t(/* @__PURE__ */ d({
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
		let { t: E } = e();
		function D(e, t, n) {
			let r = e.length;
			if (r === 0) return -1;
			let i = t;
			for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
			return t;
		}
		function O(e, t) {
			return t === "first" ? D(e, -1, 1) : D(e, 0, -1);
		}
		let k = t, A = d, j = crypto.randomUUID(), M = a(() => `${j}-menu`), N = _(k.open);
		S(() => k.open, (e) => N.value = e), S(N, (e) => A("update:open", e));
		let P = _(null), F = _(null), I = _(-1), L = _(!1), R = _({});
		function z() {
			N.value || (N.value = !0, I.value = O(k.items, "first"), f(() => {
				W(), F.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function B() {
			N.value = !1, I.value = -1, P.value?.querySelector("button,[contenteditable]")?.focus?.();
		}
		function V() {
			N.value ? B() : z();
		}
		function H(e) {
			I.value = D(k.items, I.value, e), f(() => {
				F.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" });
			});
		}
		function U(e) {
			let t = k.items[e];
			t && !t.disabled && (A("select", t, e), t.onClick?.(), B());
		}
		function W() {
			if (!P.value) return;
			let e = P.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = F.value?.offsetWidth ?? 200, i = F.value?.offsetHeight ?? 280, a = n - e.bottom;
			L.value = a < i + 4 && e.top > a;
			let o = e.left;
			o + r > t - 8 && (o = t - r - 8), o < 8 && (o = 8);
			let s = L.value ? Math.max(8, e.top - i - 4) : e.bottom + 4;
			R.value = {
				left: `${Math.round(o)}px`,
				top: `${Math.round(s)}px`
			};
		}
		function G(e) {
			N.value || (N.value = !0, I.value = O(k.items, e), f(() => {
				W(), F.value?.querySelector("[tabindex=\"0\"]")?.focus();
			}));
		}
		function K(e) {
			if (N.value) q(e);
			else {
				if (e.key === "ArrowDown") {
					e.preventDefault(), G("first");
					return;
				}
				if (e.key === "ArrowUp") {
					e.preventDefault(), G("last");
					return;
				}
			}
		}
		function q(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), H(1);
					break;
				case "ArrowUp":
					e.preventDefault(), H(-1);
					break;
				case "Home":
					e.preventDefault(), I.value = O(k.items, "first"), f(() => F.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "End":
					e.preventDefault(), I.value = O(k.items, "last"), f(() => F.value?.querySelector("[tabindex=\"0\"]")?.scrollIntoView?.({ block: "nearest" }));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), I.value >= 0 && U(I.value);
					break;
				case "Escape":
					e.preventDefault(), B();
					break;
				case "Tab": e.preventDefault(), B();
			}
		}
		function J(e) {
			N.value && P.value && F.value && !P.value.contains(e.target) && !F.value.contains(e.target) && B();
		}
		return S(N, (e) => {
			e ? document.addEventListener("pointerdown", J, !0) : document.removeEventListener("pointerdown", J, !0);
		}), h(() => {
			document.removeEventListener("pointerdown", J, !0);
		}), (e, a) => (g(), c("div", {
			ref_key: "triggerEl",
			ref: P,
			class: "phlix-menu",
			onClick: V,
			onKeydown: K
		}, [y(e.$slots, "default", {
			open: N.value,
			toggle: V,
			openMenu: z
		}, void 0, !0), (g(), o(r, { to: "body" }, [u(i, { name: "phlix-menu" }, {
			default: C(() => [N.value ? (g(), c("div", {
				key: 0,
				id: M.value,
				ref_key: "menuEl",
				ref: F,
				class: p(["phlix-menu__list", { "is-flipped": L.value }]),
				style: m(R.value),
				role: "menu",
				onKeydown: q
			}, [(g(!0), c(n, null, v(t.items, (t, n) => (g(), c("button", {
				key: n,
				type: "button",
				class: p(["phlix-menu__item", {
					"is-active": n === I.value,
					"is-danger": t.danger,
					"is-disabled": t.disabled
				}]),
				role: "menuitem",
				tabindex: n === I.value ? 0 : -1,
				"aria-disabled": t.disabled || void 0,
				"aria-label": t.danger ? x(E)("itemActions.dangerSuffix", { label: t.label }) : t.label,
				onClick: (e) => U(n),
				onPointermove: (e) => !t.disabled && (I.value = n)
			}, [y(e.$slots, "item", {
				item: t,
				index: n
			}, () => [l(b(t.label), 1)], !0)], 42, T))), 128))], 46, w)) : s("", !0)]),
			_: 3
		})]))], 544));
	}
}), [["__scopeId", "data-v-8ad02415"]]);
export { E as t };

//# sourceMappingURL=Menu-B9cGFOym.js.map