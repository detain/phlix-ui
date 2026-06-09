import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useMessages-CLMH99Oy.js";
import { Fragment as r, computed as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, inject as d, normalizeClass as f, normalizeStyle as p, onBeforeUnmount as m, onMounted as h, openBlock as g, ref as _, renderSlot as v, toDisplayString as y, unref as b, useId as x } from "vue";
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var S = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, C = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "AppBackdrop",
	props: {
		enabled: {
			type: Boolean,
			default: !0
		},
		grain: {
			type: Boolean,
			default: !0
		},
		vignette: {
			type: Boolean,
			default: !0
		},
		ambient: {
			type: Boolean,
			default: !1
		},
		ambientColor: {},
		ambientImage: {},
		intensity: { default: 1 }
	},
	setup(e) {
		let t = e, n = _(!1), s = null, c = null, l = () => n.value = !!(s?.matches || c?.matches);
		h(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (s = window.matchMedia("(prefers-reduced-motion: reduce)"), c = window.matchMedia("(prefers-reduced-data: reduce)"), l(), s.addEventListener?.("change", l), c.addEventListener?.("change", l));
		}), m(() => {
			s?.removeEventListener?.("change", l), c?.removeEventListener?.("change", l);
		});
		let u = i(() => t.enabled && !n.value), d = i(() => u.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function v(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let y = i(() => t.ambientImage ? {
			backgroundImage: `url("${v(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), b = i(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, n) => (g(), o(r, null, [
			d.value ? (g(), o("div", {
				key: 0,
				class: f(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: p(y.value),
				"aria-hidden": "true"
			}, null, 6)) : a("", !0),
			u.value && e.vignette ? (g(), o("div", S)) : a("", !0),
			u.value && e.grain ? (g(), o("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: p(b.value),
				"aria-hidden": "true"
			}, null, 4)) : a("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), w = { class: "authcard" }, T = { class: "authcard__body" }, E = { class: "authcard__head" }, D = {
	key: 0,
	class: "authcard__eyebrow"
}, O = { class: "authcard__brand" }, k = ["src", "alt"], A = { class: "authcard__wordmark" }, j = { class: "authcard__title" }, M = {
	key: 1,
	class: "authcard__sub"
}, N = {
	key: 0,
	class: "authcard__foot"
}, P = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "AuthCard",
	props: {
		eyebrow: {},
		title: {},
		subtitle: {}
	},
	setup(e) {
		let t = d("phlixConfig", null), n = i(() => t?.branding ?? {}), r = i(() => n.value.wordmark ?? "Phlix");
		return (t, i) => (g(), o("section", w, [s("div", T, [
			s("header", E, [
				e.eyebrow ? (g(), o("p", D, y(e.eyebrow), 1)) : a("", !0),
				s("div", O, [n.value.logoSrc ? (g(), o("img", {
					key: 0,
					src: n.value.logoSrc,
					alt: n.value.logoAlt ?? r.value,
					class: "authcard__logo"
				}, null, 8, k)) : a("", !0), s("span", A, [c(y(r.value), 1), i[0] ||= s("span", { class: "authcard__dot" }, ".", -1)])]),
				s("h1", j, y(e.title), 1),
				e.subtitle ? (g(), o("p", M, y(e.subtitle), 1)) : a("", !0)
			]),
			v(t.$slots, "default", {}, void 0, !0),
			t.$slots.footer ? (g(), o("div", N, [v(t.$slots, "footer", {}, void 0, !0)])) : a("", !0)
		])]));
	}
}), [["__scopeId", "data-v-7f2e978d"]]), F = ["for"], I = { class: "authfield__wrap" }, L = [
	"id",
	"name",
	"type",
	"value",
	"placeholder",
	"autocomplete",
	"inputmode",
	"required",
	"minlength",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], R = [
	"aria-label",
	"aria-pressed",
	"disabled"
], z = ["id"], B = /*#__PURE__*/ e(/* @__PURE__ */ u({
	__name: "AuthField",
	props: {
		modelValue: {},
		label: {},
		type: { default: "text" },
		id: {},
		name: {},
		placeholder: {},
		autocomplete: {},
		inputmode: {},
		error: { default: null },
		required: {
			type: Boolean,
			default: !1
		},
		minlength: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: r }) {
		let { t: c } = n(), u = e, d = r, p = x(), m = i(() => u.id ?? `authfield-${p}`), h = i(() => `${m.value}-msg`), v = _(!1), S = i(() => u.type === "password"), C = i(() => S.value ? v.value ? "text" : "password" : u.type);
		function w(e) {
			d("update:modelValue", e.target.value);
		}
		function T() {
			v.value = !v.value;
		}
		return (n, r) => (g(), o("div", { class: f(["authfield", {
			"is-invalid": !!e.error,
			"has-toggle": S.value
		}]) }, [
			s("label", {
				class: "authfield__label",
				for: m.value
			}, y(e.label), 9, F),
			s("div", I, [s("input", {
				id: m.value,
				class: "authfield__input",
				name: e.name,
				type: C.value,
				value: e.modelValue,
				placeholder: e.placeholder,
				autocomplete: e.autocomplete,
				inputmode: e.inputmode,
				required: e.required,
				minlength: e.minlength,
				disabled: e.disabled,
				"aria-invalid": e.error ? "true" : void 0,
				"aria-describedby": e.error ? h.value : void 0,
				onInput: w
			}, null, 40, L), S.value ? (g(), o("button", {
				key: 0,
				type: "button",
				class: "authfield__toggle",
				"aria-label": v.value ? b(c)("auth.hidePassword") : b(c)("auth.showPassword"),
				"aria-pressed": v.value,
				disabled: e.disabled,
				onClick: T
			}, [l(t, { name: v.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, R)) : a("", !0)]),
			s("p", {
				id: h.value,
				class: "authfield__msg",
				"aria-live": "polite"
			}, y(e.error || ""), 9, z)
		], 2));
	}
}), [["__scopeId", "data-v-d628efe4"]]);
//#endregion
export { P as n, C as r, B as t };

//# sourceMappingURL=AuthField-S3AQ6JKX.js.map