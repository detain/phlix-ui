import { n as e } from "./Icon-CkTBN_k5.js";
import { Transition as t, createCommentVNode as n, createElementBlock as r, createTextVNode as i, createVNode as a, defineComponent as o, nextTick as s, normalizeClass as c, onBeforeUnmount as l, openBlock as u, ref as d, renderSlot as f, toDisplayString as p, unref as m, useId as h, withCtx as g, withKeys as _ } from "vue";
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var v = ["id"], y = 8, b = /*#__PURE__*/ e(/* @__PURE__ */ o({
	__name: "Tooltip",
	props: {
		text: {},
		placement: { default: "top" },
		delay: { default: 300 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let o = e, b = h(), x = d(!1), S = d(null), C = d(null), w;
		function T() {
			return S.value?.firstElementChild ?? null;
		}
		function E(e) {
			let t = e.parentElement;
			for (; t && t !== document.body && t !== document.documentElement;) {
				let e = getComputedStyle(t);
				if (e.overflowX !== "visible" || e.overflow !== "" && e.overflow !== "visible") return t;
				t = t.parentElement;
			}
			return null;
		}
		function D(e) {
			e && (e.style.maxWidth = "", e.style.whiteSpace = "", e.style.removeProperty("--phlix-tooltip-shift"));
		}
		function O() {
			let e = S.value, t = C.value;
			if (!e || !t || (D(t), o.placement === "left" || o.placement === "right")) return;
			let n = E(e);
			if (!n) return;
			let r = n.getBoundingClientRect();
			if (r.width <= 0) return;
			t.style.maxWidth = `${Math.max(0, r.width - 16)}px`, t.style.whiteSpace = "normal";
			let i = t.getBoundingClientRect(), a = i.right - (r.right - y), s = r.left + y - i.left, c = 0;
			a > 0 ? c = -a : s > 0 && (c = s), c !== 0 && t.style.setProperty("--phlix-tooltip-shift", `${c}px`);
		}
		function k() {
			o.disabled || (clearTimeout(w), w = setTimeout(() => {
				x.value = !0, T()?.setAttribute("aria-describedby", b), s(O);
			}, o.delay));
		}
		function A() {
			clearTimeout(w), D(C.value), x.value = !1, T()?.removeAttribute("aria-describedby");
		}
		return l(() => clearTimeout(w)), (o, s) => (u(), r("span", {
			ref_key: "wrapEl",
			ref: S,
			class: "phlix-tooltip-wrap",
			onMouseenter: k,
			onMouseleave: A,
			onFocusin: k,
			onFocusout: A,
			onKeydown: _(A, ["esc"])
		}, [f(o.$slots, "default", {}, void 0, !0), a(t, { name: "phlix-tooltip" }, {
			default: g(() => [x.value && (e.text || o.$slots.content) ? (u(), r("span", {
				key: 0,
				id: m(b),
				ref_key: "tipEl",
				ref: C,
				role: "tooltip",
				class: c(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [f(o.$slots, "content", {}, () => [i(p(e.text), 1)], !0)], 10, v)) : n("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-83b83959"]]);
//#endregion
export { b as t };

//# sourceMappingURL=Tooltip-Bi7vMBv_.js.map