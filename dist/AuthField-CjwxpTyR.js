import { n as e, t } from "./Icon-ax5k7_G2.js";
import { Fragment as n, computed as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createTextVNode as s, createVNode as c, defineComponent as l, inject as u, normalizeClass as d, normalizeStyle as f, onBeforeUnmount as p, onMounted as m, openBlock as h, ref as g, renderSlot as _, toDisplayString as v, useId as y } from "vue";
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var b = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, x = /*#__PURE__*/ e(/* @__PURE__ */ l({
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
		let t = e, o = g(!1), s = null, c = null, l = () => o.value = !!(s?.matches || c?.matches);
		m(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (s = window.matchMedia("(prefers-reduced-motion: reduce)"), c = window.matchMedia("(prefers-reduced-data: reduce)"), l(), s.addEventListener?.("change", l), c.addEventListener?.("change", l));
		}), p(() => {
			s?.removeEventListener?.("change", l), c?.removeEventListener?.("change", l);
		});
		let u = r(() => t.enabled && !o.value), _ = r(() => u.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function v(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let y = r(() => t.ambientImage ? {
			backgroundImage: `url("${v(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), x = r(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, r) => (h(), a(n, null, [
			_.value ? (h(), a("div", {
				key: 0,
				class: d(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: f(y.value),
				"aria-hidden": "true"
			}, null, 6)) : i("", !0),
			u.value && e.vignette ? (h(), a("div", b)) : i("", !0),
			u.value && e.grain ? (h(), a("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: f(x.value),
				"aria-hidden": "true"
			}, null, 4)) : i("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), S = { class: "authcard" }, C = { class: "authcard__body" }, w = { class: "authcard__head" }, T = {
	key: 0,
	class: "authcard__eyebrow"
}, E = { class: "authcard__brand" }, D = ["src", "alt"], O = { class: "authcard__wordmark" }, k = { class: "authcard__title" }, A = {
	key: 1,
	class: "authcard__sub"
}, j = {
	key: 0,
	class: "authcard__foot"
}, M = /*#__PURE__*/ e(/* @__PURE__ */ l({
	__name: "AuthCard",
	props: {
		eyebrow: {},
		title: {},
		subtitle: {}
	},
	setup(e) {
		let t = u("phlixConfig", null), n = r(() => t?.branding ?? {}), c = r(() => n.value.wordmark ?? "Phlix");
		return (t, r) => (h(), a("section", S, [o("div", C, [
			o("header", w, [
				e.eyebrow ? (h(), a("p", T, v(e.eyebrow), 1)) : i("", !0),
				o("div", E, [n.value.logoSrc ? (h(), a("img", {
					key: 0,
					src: n.value.logoSrc,
					alt: n.value.logoAlt ?? c.value,
					class: "authcard__logo"
				}, null, 8, D)) : i("", !0), o("span", O, [s(v(c.value), 1), r[0] ||= o("span", { class: "authcard__dot" }, ".", -1)])]),
				o("h1", k, v(e.title), 1),
				e.subtitle ? (h(), a("p", A, v(e.subtitle), 1)) : i("", !0)
			]),
			_(t.$slots, "default", {}, void 0, !0),
			t.$slots.footer ? (h(), a("div", j, [_(t.$slots, "footer", {}, void 0, !0)])) : i("", !0)
		])]));
	}
}), [["__scopeId", "data-v-7f2e978d"]]), N = ["for"], P = { class: "authfield__wrap" }, F = [
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
], I = [
	"aria-label",
	"aria-pressed",
	"disabled"
], L = ["id"], R = /*#__PURE__*/ e(/* @__PURE__ */ l({
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
	setup(e, { emit: n }) {
		let s = e, l = n, u = y(), f = r(() => s.id ?? `authfield-${u}`), p = r(() => `${f.value}-msg`), m = g(!1), _ = r(() => s.type === "password"), b = r(() => _.value ? m.value ? "text" : "password" : s.type);
		function x(e) {
			l("update:modelValue", e.target.value);
		}
		function S() {
			m.value = !m.value;
		}
		return (n, r) => (h(), a("div", { class: d(["authfield", {
			"is-invalid": !!e.error,
			"has-toggle": _.value
		}]) }, [
			o("label", {
				class: "authfield__label",
				for: f.value
			}, v(e.label), 9, N),
			o("div", P, [o("input", {
				id: f.value,
				class: "authfield__input",
				name: e.name,
				type: b.value,
				value: e.modelValue,
				placeholder: e.placeholder,
				autocomplete: e.autocomplete,
				inputmode: e.inputmode,
				required: e.required,
				minlength: e.minlength,
				disabled: e.disabled,
				"aria-invalid": e.error ? "true" : void 0,
				"aria-describedby": e.error ? p.value : void 0,
				onInput: x
			}, null, 40, F), _.value ? (h(), a("button", {
				key: 0,
				type: "button",
				class: "authfield__toggle",
				"aria-label": m.value ? "Hide password" : "Show password",
				"aria-pressed": m.value,
				disabled: e.disabled,
				onClick: S
			}, [c(t, { name: m.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, I)) : i("", !0)]),
			o("p", {
				id: p.value,
				class: "authfield__msg",
				"aria-live": "polite"
			}, v(e.error || ""), 9, L)
		], 2));
	}
}), [["__scopeId", "data-v-88104b1e"]]);
//#endregion
export { M as n, x as r, R as t };

//# sourceMappingURL=AuthField-CjwxpTyR.js.map