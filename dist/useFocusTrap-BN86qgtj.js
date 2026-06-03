import { d as e, u as t } from "./Button-C4PyCjLX.js";
import { computed as n, createElementBlock as r, createVNode as i, defineComponent as a, nextTick as o, normalizeClass as s, onBeforeUnmount as c, openBlock as l, watch as u } from "vue";
//#region src/components/ui/IconButton.vue?vue&type=script&setup=true&lang.ts
var d = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], f = /*#__PURE__*/ e(/* @__PURE__ */ a({
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
	setup(e) {
		let a = e, o = n(() => a.disabled || a.loading);
		return (n, a) => (l(), r("button", {
			type: e.type,
			class: s(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: o.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [i(t, {
			name: e.loading ? "spinner" : e.name,
			class: s({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, d));
	}
}), [["__scopeId", "data-v-fc0cd545"]]), p = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), m = 0, h = "";
function g() {
	m === 0 && (h = document.body.style.overflow, document.body.style.overflow = "hidden"), m++;
}
function _() {
	m !== 0 && (m--, m === 0 && (document.body.style.overflow = h));
}
function v(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function s() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(p)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function l(r) {
		if (!t.value || !e.value) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = s();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let a = i[0], o = i[i.length - 1], c = document.activeElement;
		e.value.contains(c) ? r.shiftKey && c === a ? (r.preventDefault(), o.focus()) : !r.shiftKey && c === o && (r.preventDefault(), a.focus()) : (r.preventDefault(), a.focus());
	}
	function d() {
		i = document.activeElement, r && (g(), a = !0), document.addEventListener("keydown", l, !0), o(() => {
			(s()[0] ?? e.value)?.focus();
		});
	}
	function f() {
		document.removeEventListener("keydown", l, !0), a &&= (_(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	u(t, (e) => e ? d() : f(), { immediate: !0 }), c(() => {
		document.removeEventListener("keydown", l, !0), a &&= (_(), !1);
	});
}
//#endregion
export { f as n, v as t };

//# sourceMappingURL=useFocusTrap-BN86qgtj.js.map