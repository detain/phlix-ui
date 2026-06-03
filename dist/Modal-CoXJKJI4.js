import { l as e, u as t } from "./tokenStore-DfQvvLGI.js";
import { Teleport as n, Transition as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createVNode as l, defineComponent as u, nextTick as d, normalizeClass as f, onBeforeUnmount as p, openBlock as m, ref as h, renderSlot as g, toDisplayString as _, unref as v, useId as y, watch as b, withCtx as x, withModifiers as S } from "vue";
//#region src/components/ui/IconButton.vue?vue&type=script&setup=true&lang.ts
var C = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], w = /*#__PURE__*/ t(/* @__PURE__ */ u({
	__name: "IconButton",
	props: {
		name: {},
		label: {},
		variant: { default: "ghost" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		pressed: {
			type: Boolean,
			default: void 0
		}
	},
	setup(t) {
		let n = t, r = i(() => n.disabled || n.loading);
		return (n, i) => (m(), s("button", {
			type: t.type,
			class: f(["phlix-iconbtn", [
				`phlix-iconbtn--${t.variant}`,
				`phlix-iconbtn--${t.size}`,
				{ "is-pressed": t.pressed }
			]]),
			disabled: r.value,
			"aria-label": t.label,
			title: t.label,
			"aria-pressed": t.pressed === void 0 ? void 0 : t.pressed,
			"aria-busy": t.loading || void 0
		}, [l(e, {
			name: t.loading ? "spinner" : t.name,
			class: f({ "phlix-iconbtn__spin": t.loading })
		}, null, 8, ["name", "class"])], 10, C));
	}
}), [["__scopeId", "data-v-fc0cd545"]]), T = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), E = 0, D = "";
function O() {
	E === 0 && (D = document.body.style.overflow, document.body.style.overflow = "hidden"), E++;
}
function k() {
	E !== 0 && (E--, E === 0 && (document.body.style.overflow = D));
}
function A(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(T)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function s(r) {
		if (!t.value || !e.value) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = o();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let a = i[0], s = i[i.length - 1], c = document.activeElement;
		e.value.contains(c) ? r.shiftKey && c === a ? (r.preventDefault(), s.focus()) : !r.shiftKey && c === s && (r.preventDefault(), a.focus()) : (r.preventDefault(), a.focus());
	}
	function c() {
		i = document.activeElement, r && (O(), a = !0), document.addEventListener("keydown", s, !0), d(() => {
			(o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		document.removeEventListener("keydown", s, !0), a &&= (k(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	b(t, (e) => e ? c() : l(), { immediate: !0 }), p(() => {
		document.removeEventListener("keydown", s, !0), a &&= (k(), !1);
	});
}
//#endregion
//#region src/components/ui/Modal.vue?vue&type=script&setup=true&lang.ts
var j = ["aria-labelledby"], M = {
	key: 0,
	class: "phlix-modal__header"
}, N = ["id"], P = { class: "phlix-modal__body" }, F = {
	key: 1,
	class: "phlix-modal__footer"
}, I = /*#__PURE__*/ t(/* @__PURE__ */ u({
	__name: "Modal",
	props: {
		modelValue: { type: Boolean },
		title: {},
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" }
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: t }) {
		let i = e, u = t, d = h(i.modelValue);
		b(() => i.modelValue, (e) => d.value = e);
		let p = h(null), C = y();
		function T() {
			u("update:modelValue", !1), u("close");
		}
		function E() {
			i.dismissible && T();
		}
		return A(p, d, { onEscape: () => i.dismissible ? (T(), !0) : !1 }), (t, i) => (m(), a(n, { to: "body" }, [l(r, { name: "phlix-modal" }, {
			default: x(() => [e.modelValue ? (m(), s("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: S(E, ["self"])
			}, [c("div", {
				ref_key: "panelEl",
				ref: p,
				class: f(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? v(C) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (m(), s("header", M, [e.title ? (m(), s("h2", {
					key: 0,
					id: v(C),
					class: "phlix-modal__title"
				}, _(e.title), 9, N)) : o("", !0), e.hideClose ? o("", !0) : (m(), a(w, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					class: "phlix-modal__close",
					onClick: T
				}))])) : o("", !0),
				c("div", P, [g(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (m(), s("footer", F, [g(t.$slots, "footer", {}, void 0, !0)])) : o("", !0)
			], 10, j)], 32)) : o("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-ad69ec41"]]);
//#endregion
export { A as n, w as r, I as t };

//# sourceMappingURL=Modal-CoXJKJI4.js.map