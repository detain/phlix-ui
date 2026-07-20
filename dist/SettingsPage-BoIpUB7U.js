import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, l as r, t as i } from "./client-D80As4Gx.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as s } from "./Switch-DyS2L5gX.js";
import { t as c } from "./Select-B27Qs6LN.js";
import { t as te } from "./Skeleton-DhQmxeNg.js";
import { t as ne } from "./EmptyState-ZlI5t4KT.js";
import { t as re } from "./PageHint-BoAlFFBN.js";
import { t as ie } from "./Tabs-CLKYop2E.js";
import { n as ae, r as l, t as oe } from "./useSettingsPrefs-B57OICA8.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as se, onMounted as ce, openBlock as y, reactive as b, ref as x, renderList as le, toDisplayString as S, unref as ue, withCtx as C, withModifiers as de } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, pe = {
	key: 0,
	class: "admin-settings__skel"
}, me = { class: "admin-settings__header-row" }, he = { class: "settings-advanced-toggle" }, ge = {
	key: 0,
	class: "settings-restart-banner",
	role: "alert"
}, _e = { class: "admin-settings__panel" }, ve = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, ye = ["for"], be = {
	key: 1,
	class: "admin-settings__row"
}, xe = ["for"], Se = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"disabled",
	"onInput"
], Ce = ["for"], we = ["for"], Te = { class: "admin-settings__row" }, Ee = [
	"id",
	"type",
	"value",
	"disabled",
	"onInput"
], De = ["for"], Oe = [
	"id",
	"value",
	"disabled",
	"onInput"
], ke = {
	key: 6,
	class: "admin-settings__error",
	role: "alert"
}, Ae = { class: "admin-settings__actions" }, w = "metadata.genres_mode", T = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let v = e, T = se("apiBase", ""), je = d(() => typeof T == "string" ? T : T?.value ?? ""), E = new ae(v.client ?? new i({
			baseUrl: je.value,
			tokenStore: new t()
		})), D = ee(), O = oe(), k = x({}), A = x([]), j = x({}), M = x({}), N = d(() => {
			let e = new Set(Object.values(M.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: e
			}));
		}), P = x(""), F = x(!0), I = x(null), L = x(!1), R = x({}), z = b({}), B = b({}), V = b({}), H = x("first"), Me = d(() => Object.values(V).some(Boolean)), U = d(() => Object.entries(M.value).filter(([, e]) => e.group === P.value).sort(([, e], [, t]) => (e._order ?? 0) - (t._order ?? 0)).map(([e]) => e)), Ne = d(() => Object.entries(M.value).filter(([, e]) => e.restart === !0).map(([e]) => e)), Pe = d(() => Object.keys(V).filter((e) => V[e]).some((e) => Ne.value.includes(e)));
		function W(e) {
			return A.value.includes(e);
		}
		function Fe(e) {
			for (let e of Object.keys(B)) delete B[e];
			for (let [t, n] of Object.entries(e)) t !== w && (t.startsWith("_") || (B[t] = String(n ?? "")));
		}
		function Ie(e) {
			let t = e[w];
			H.value = typeof t == "string" && t !== "" ? t : "first";
		}
		function Le() {
			for (let e of Object.keys(V)) delete V[e];
		}
		async function Re() {
			F.value = !0, I.value = null;
			try {
				let e = await E.get();
				k.value = e.settings, A.value = e.overridden, j.value = e.types, M.value = e.meta, Fe(e.settings), Ie(e.settings), Le(), R.value = {}, !P.value && N.value.length > 0 && (P.value = N.value[0].value);
			} catch (e) {
				I.value = n(e, "Failed to load settings."), D.error(I.value);
			} finally {
				F.value = !1;
			}
		}
		function G(e) {
			return j.value[e] ?? "string";
		}
		function ze(e) {
			let t = M.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Be(e) {
			let t = M.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enum, r = t.enumLabels;
			return n.map((e) => ({
				value: e,
				label: r?.[e] ?? e
			}));
		}
		function K(e) {
			let t = M.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function q(e) {
			return M.value[e]?.tier === "advanced";
		}
		function J(e) {
			return q(e) && !O.advancedMode;
		}
		function Y(e) {
			return M.value[e]?.label ?? e.split(".").pop()?.replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function X(e) {
			return M.value[e]?.helpText;
		}
		function Z(e) {
			return M.value[e]?.helpLinks;
		}
		function Q(e, t) {
			B[e] = t, V[e] = t !== String(k.value[e] ?? "");
		}
		function Ve(e) {
			z[e] = !z[e];
		}
		function He(e) {
			H.value = e, V[w] = e !== String(k.value[w] ?? "first");
		}
		function Ue() {
			D.info("Restart triggered (placeholder).");
		}
		async function $() {
			L.value = !0, R.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(V)) {
					if (!n || J(t)) continue;
					if (t === w) {
						e[t] = H.value;
						continue;
					}
					let r = j.value[t], i = B[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await E.save(e);
				D.success("Settings saved."), k.value = t.settings, A.value = t.overridden, Le(), Fe(t.settings), Ie(t.settings);
			} catch (e) {
				if (e instanceof r && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (R.value = t.errors, D.error("Please fix the validation errors.")) : D.error(e.message);
				} else D.error(e instanceof r ? e.message : "Failed to save settings.");
			} finally {
				L.value = !1;
			}
		}
		return ce(Re), (e, t) => (y(), m("section", fe, [
			t[20] ||= h("header", { class: "admin-settings__head" }, [h("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			_(re, null, {
				default: C(() => [...t[3] ||= [
					g(" All of your server's configuration, grouped into tabs — ", -1),
					h("strong", null, "Access", -1),
					g(" (sign-up mode), ", -1),
					h("strong", null, "Transcoding", -1),
					g(", ", -1),
					h("strong", null, "Metadata", -1),
					g(" (TMDB key and genres mode), ", -1),
					h("strong", null, "Markers", -1),
					g(", ", -1),
					h("strong", null, "Subtitles", -1),
					g(", ", -1),
					h("strong", null, "Discovery", -1),
					g(", ", -1),
					h("strong", null, "Trickplay", -1),
					g(", ", -1),
					h("strong", null, "Newsletter", -1),
					g(", ", -1),
					h("strong", null, "Port Forward", -1),
					g(", and ", -1),
					h("strong", null, "Scrobblers", -1),
					g(". Change fields on any tab, then click ", -1),
					h("strong", null, "Save settings", -1),
					g(" to apply only what you changed; a ", -1),
					h("strong", null, "custom", -1),
					g(" badge marks values overridden by your environment or config file. ", -1)
				]]),
				_: 1
			}),
			F.value ? (y(), m("div", pe, [_(te, {
				variant: "text",
				lines: 6
			})])) : I.value ? (y(), f(ne, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: I.value
			}, {
				actions: C(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Re
				}, {
					default: C(() => [...t[4] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (y(), m(u, { key: 2 }, [
				h("div", me, [_(ie, {
					modelValue: P.value,
					"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
					tabs: N.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), h("div", he, [t[5] ||= h("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), _(s, {
					"model-value": ue(O).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => ue(O).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				Pe.value ? (y(), m("div", ge, [t[6] ||= h("span", null, "Some changes require a server restart to take effect.", -1), h("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					onClick: Ue
				}, " Restart server ")])) : p("", !0),
				h("div", _e, [U.value.length === 0 ? (y(), m("p", ve, " No settings in this group. ")) : (y(), m("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: de($, ["prevent"])
				}, [(y(!0), m(u, null, le(U.value, (e) => (y(), m("div", {
					key: e,
					class: "admin-settings__field"
				}, [e === w ? (y(), m(u, { key: 0 }, [h("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					g(S(Y(e)) + " ", 1),
					W(e) ? (y(), f(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[7] ||= [g("custom", -1)]]),
						_: 1
					})) : p("", !0),
					q(e) ? (y(), f(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: C(() => [...t[8] ||= [g("Advanced", -1)]]),
						_: 1
					})) : p("", !0),
					X(e) ? (y(), f(l, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : p("", !0)
				], 8, ye), _(c, {
					"model-value": H.value,
					options: Be(e),
					label: Y(e),
					"onUpdate:modelValue": t[2] ||= (e) => He(String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])], 64)) : G(e) === "bool" ? (y(), m("div", be, [
					_(s, {
						"model-value": B[e] === "true" || B[e] === "1",
						label: Y(e),
						disabled: J(e),
						"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]),
					W(e) ? (y(), f(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[9] ||= [g("custom", -1)]]),
						_: 1
					})) : p("", !0),
					q(e) ? (y(), f(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: C(() => [...t[10] ||= [g("Advanced", -1)]]),
						_: 1
					})) : p("", !0),
					X(e) ? (y(), f(l, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : p("", !0)
				])) : G(e) === "int" || G(e) === "float" ? (y(), m(u, { key: 2 }, [h("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					g(S(Y(e)) + " ", 1),
					W(e) ? (y(), f(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[11] ||= [g("custom", -1)]]),
						_: 1
					})) : p("", !0),
					q(e) ? (y(), f(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: C(() => [...t[12] ||= [g("Advanced", -1)]]),
						_: 1
					})) : p("", !0),
					X(e) ? (y(), f(l, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : p("", !0)
				], 8, xe), h("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "number",
					value: B[e],
					min: K(e).min,
					max: K(e).max,
					step: G(e) === "float" ? "any" : void 0,
					placeholder: K(e).min === void 0 ? void 0 : `min: ${K(e).min}`,
					disabled: J(e),
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, Se)], 64)) : ze(e) ? (y(), m(u, { key: 3 }, [h("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					g(S(Y(e)) + " ", 1),
					W(e) ? (y(), f(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[13] ||= [g("custom", -1)]]),
						_: 1
					})) : p("", !0),
					q(e) ? (y(), f(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: C(() => [...t[14] ||= [g("Advanced", -1)]]),
						_: 1
					})) : p("", !0),
					X(e) ? (y(), f(l, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : p("", !0)
				], 8, Ce), _(c, {
					"model-value": B[e] ?? "",
					options: Be(e),
					label: Y(e),
					disabled: J(e),
					"onUpdate:modelValue": (t) => Q(e, String(t))
				}, null, 8, [
					"model-value",
					"options",
					"label",
					"disabled",
					"onUpdate:modelValue"
				])], 64)) : M.value[e]?.secret ? (y(), m(u, { key: 4 }, [h("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					g(S(Y(e)) + " ", 1),
					W(e) ? (y(), f(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[15] ||= [g("custom", -1)]]),
						_: 1
					})) : p("", !0),
					q(e) ? (y(), f(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: C(() => [...t[16] ||= [g("Advanced", -1)]]),
						_: 1
					})) : p("", !0),
					X(e) ? (y(), f(l, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : p("", !0)
				], 8, we), h("div", Te, [h("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: z[e] ? "text" : "password",
					autocomplete: "off",
					value: B[e],
					disabled: J(e),
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, Ee), _(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": z[e] ? "eye-off" : "eye",
					"aria-label": z[e] ? `Hide ${Y(e)}` : `Show ${Y(e)}`,
					onClick: (t) => Ve(e)
				}, {
					default: C(() => [g(S(z[e] ? "Hide" : "Show"), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"aria-label",
					"onClick"
				])])], 64)) : (y(), m(u, { key: 5 }, [h("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					g(S(Y(e)) + " ", 1),
					W(e) ? (y(), f(o, {
						key: 0,
						tone: "accent"
					}, {
						default: C(() => [...t[17] ||= [g("custom", -1)]]),
						_: 1
					})) : p("", !0),
					q(e) ? (y(), f(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: C(() => [...t[18] ||= [g("Advanced", -1)]]),
						_: 1
					})) : p("", !0),
					X(e) ? (y(), f(l, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : p("", !0)
				], 8, De), h("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "text",
					autocomplete: "off",
					value: B[e],
					disabled: J(e),
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, Oe)], 64)), R.value[e] ? (y(), m("span", ke, S(R.value[e]), 1)) : p("", !0)]))), 128)), h("div", Ae, [_(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !Me.value,
					loading: L.value,
					onClick: $
				}, {
					default: C(() => [...t[19] ||= [g(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-8be8597c"]]);
//#endregion
export { T as default };

//# sourceMappingURL=SettingsPage-BoIpUB7U.js.map