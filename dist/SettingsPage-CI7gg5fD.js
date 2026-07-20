import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, l as r, t as i } from "./client-D80As4Gx.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as s } from "./Switch-DyS2L5gX.js";
import { t as te } from "./Select-B27Qs6LN.js";
import { t as ne } from "./Skeleton-DhQmxeNg.js";
import { t as re } from "./EmptyState-ZlI5t4KT.js";
import { t as ie } from "./PageHint-BoAlFFBN.js";
import { t as ae } from "./Tabs-CLKYop2E.js";
import { n as oe, r as c, t as se } from "./useSettingsPrefs-ne0n-EMv.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ce, onMounted as le, openBlock as v, reactive as y, ref as b, renderList as ue, toDisplayString as x, unref as de, withCtx as S, withModifiers as fe } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, me = {
	key: 0,
	class: "admin-settings__skel"
}, he = { class: "admin-settings__header-row" }, ge = { class: "settings-advanced-toggle" }, _e = {
	key: 0,
	class: "settings-restart-banner",
	role: "alert"
}, ve = { class: "admin-settings__panel" }, ye = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, be = ["for"], xe = {
	key: 1,
	class: "admin-settings__row"
}, Se = ["for"], Ce = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"disabled",
	"onInput"
], we = ["for"], Te = ["for"], Ee = { class: "admin-settings__row" }, De = [
	"id",
	"type",
	"value",
	"disabled",
	"onInput"
], Oe = ["for"], ke = [
	"id",
	"value",
	"disabled",
	"onInput"
], Ae = {
	key: 6,
	class: "admin-settings__error",
	role: "alert"
}, je = { class: "admin-settings__actions" }, C = "metadata.genres_mode", w = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SettingsPage",
	props: { client: {} },
	setup(e) {
		let _ = e, w = ce("apiBase", ""), Me = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new oe(_.client ?? new i({
			baseUrl: Me.value,
			tokenStore: new t()
		})), E = ee(), D = se(), O = b({}), k = b([]), A = b({}), j = b({}), M = u(() => {
			let e = new Set(Object.values(j.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: e
			}));
		}), N = b(""), P = b(!0), F = b(null), I = b(!1), L = b({}), R = y({}), z = y({}), B = y({}), V = b("first"), Ne = u(() => Object.values(B).some(Boolean)), Pe = u(() => Object.entries(j.value).filter(([, e]) => e.group === N.value).sort(([, e], [, t]) => (e._order ?? 0) - (t._order ?? 0)).map(([e]) => e)), Fe = u(() => Object.entries(j.value).filter(([, e]) => e.restart === !0).map(([e]) => e)), Ie = u(() => Object.keys(B).filter((e) => B[e]).some((e) => Fe.value.includes(e)));
		function H(e) {
			return k.value.includes(e);
		}
		function Le(e) {
			for (let e of Object.keys(z)) delete z[e];
			for (let [t, n] of Object.entries(e)) t !== C && (t.startsWith("_") || (z[t] = String(n ?? "")));
		}
		function Re(e) {
			let t = e[C];
			V.value = typeof t == "string" && t !== "" ? t : "first";
		}
		function U() {
			for (let e of Object.keys(B)) delete B[e];
		}
		async function W() {
			P.value = !0, F.value = null;
			try {
				let e = await T.get();
				O.value = e.settings, k.value = e.overridden, A.value = e.types, j.value = e.meta, Le(e.settings), Re(e.settings), U(), L.value = {}, !N.value && M.value.length > 0 && (N.value = M.value[0].value);
			} catch (e) {
				F.value = n(e, "Failed to load settings."), E.error(F.value);
			} finally {
				P.value = !1;
			}
		}
		function G(e) {
			return A.value[e] ?? "string";
		}
		function ze(e) {
			let t = j.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Be(e) {
			let t = j.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enum, r = t.enumLabels;
			return n.map((e) => ({
				value: e,
				label: r?.[e] ?? e
			}));
		}
		function K(e) {
			let t = j.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function q(e) {
			return j.value[e]?.tier === "advanced";
		}
		function J(e) {
			return q(e) && !D.advancedMode;
		}
		function Y(e) {
			return j.value[e]?.label ?? e.split(".").pop()?.replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function X(e) {
			return j.value[e]?.helpText;
		}
		function Z(e) {
			return j.value[e]?.helpLinks;
		}
		function Q(e, t) {
			z[e] = t, B[e] = t !== String(O.value[e] ?? "");
		}
		function Ve(e) {
			R[e] = !R[e];
		}
		function He(e) {
			V.value = e, B[C] = e !== String(O.value[C] ?? "first");
		}
		async function Ue() {
			try {
				await T.restartServer(), E.success("Restart signal sent — server is reloading."), await new Promise((e) => setTimeout(e, 3e3)), await W(), U();
			} catch (e) {
				E.error(n(e, "Failed to restart server."));
			}
		}
		async function $() {
			I.value = !0, L.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(B)) {
					if (!n || J(t)) continue;
					if (t === C) {
						e[t] = V.value;
						continue;
					}
					let r = A.value[t], i = z[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await T.save(e);
				E.success("Settings saved."), O.value = t.settings, k.value = t.overridden, U(), Le(t.settings), Re(t.settings);
			} catch (e) {
				if (e instanceof r && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (L.value = t.errors, E.error("Please fix the validation errors.")) : E.error(e.message);
				} else E.error(e instanceof r ? e.message : "Failed to save settings.");
			} finally {
				I.value = !1;
			}
		}
		return le(W), (e, t) => (v(), p("section", pe, [
			t[20] ||= m("header", { class: "admin-settings__head" }, [m("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			g(ie, null, {
				default: S(() => [...t[3] ||= [
					h(" All of your server's configuration, grouped into tabs — ", -1),
					m("strong", null, "Access", -1),
					h(" (sign-up mode), ", -1),
					m("strong", null, "Transcoding", -1),
					h(", ", -1),
					m("strong", null, "Metadata", -1),
					h(" (TMDB key and genres mode), ", -1),
					m("strong", null, "Markers", -1),
					h(", ", -1),
					m("strong", null, "Subtitles", -1),
					h(", ", -1),
					m("strong", null, "Discovery", -1),
					h(", ", -1),
					m("strong", null, "Trickplay", -1),
					h(", ", -1),
					m("strong", null, "Newsletter", -1),
					h(", ", -1),
					m("strong", null, "Port Forward", -1),
					h(", and ", -1),
					m("strong", null, "Scrobblers", -1),
					h(". Change fields on any tab, then click ", -1),
					m("strong", null, "Save settings", -1),
					h(" to apply only what you changed; a ", -1),
					m("strong", null, "custom", -1),
					h(" badge marks values overridden by your environment or config file. ", -1)
				]]),
				_: 1
			}),
			P.value ? (v(), p("div", me, [g(ne, {
				variant: "text",
				lines: 6
			})])) : F.value ? (v(), d(re, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: F.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: W
				}, {
					default: S(() => [...t[4] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (v(), p(l, { key: 2 }, [
				m("div", he, [g(ae, {
					modelValue: N.value,
					"onUpdate:modelValue": t[0] ||= (e) => N.value = e,
					tabs: M.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), m("div", ge, [t[5] ||= m("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), g(s, {
					"model-value": de(D).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => de(D).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				Ie.value ? (v(), p("div", _e, [t[6] ||= m("span", null, "Some changes require a server restart to take effect.", -1), m("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					onClick: Ue
				}, " Restart server ")])) : f("", !0),
				m("div", ve, [Pe.value.length === 0 ? (v(), p("p", ye, " No settings in this group. ")) : (v(), p("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: fe($, ["prevent"])
				}, [(v(!0), p(l, null, ue(Pe.value, (e) => (v(), p("div", {
					key: e,
					class: "admin-settings__field"
				}, [e === C ? (v(), p(l, { key: 0 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					h(x(Y(e)) + " ", 1),
					H(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: S(() => [...t[7] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0),
					q(e) ? (v(), d(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: S(() => [...t[8] ||= [h("Advanced", -1)]]),
						_: 1
					})) : f("", !0),
					X(e) ? (v(), d(c, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : f("", !0)
				], 8, be), g(te, {
					"model-value": V.value,
					options: Be(e),
					label: Y(e),
					"onUpdate:modelValue": t[2] ||= (e) => He(String(e))
				}, null, 8, [
					"model-value",
					"options",
					"label"
				])], 64)) : G(e) === "bool" ? (v(), p("div", xe, [
					g(s, {
						"model-value": z[e] === "true" || z[e] === "1",
						label: Y(e),
						disabled: J(e),
						"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
					}, null, 8, [
						"model-value",
						"label",
						"disabled",
						"onUpdate:modelValue"
					]),
					H(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: S(() => [...t[9] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0),
					q(e) ? (v(), d(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: S(() => [...t[10] ||= [h("Advanced", -1)]]),
						_: 1
					})) : f("", !0),
					X(e) ? (v(), d(c, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : f("", !0)
				])) : G(e) === "int" || G(e) === "float" ? (v(), p(l, { key: 2 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					h(x(Y(e)) + " ", 1),
					H(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: S(() => [...t[11] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0),
					q(e) ? (v(), d(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: S(() => [...t[12] ||= [h("Advanced", -1)]]),
						_: 1
					})) : f("", !0),
					X(e) ? (v(), d(c, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : f("", !0)
				], 8, Se), m("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "number",
					value: z[e],
					min: K(e).min,
					max: K(e).max,
					step: G(e) === "float" ? "any" : void 0,
					placeholder: K(e).min === void 0 ? void 0 : `min: ${K(e).min}`,
					disabled: J(e),
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, Ce)], 64)) : ze(e) ? (v(), p(l, { key: 3 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					h(x(Y(e)) + " ", 1),
					H(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: S(() => [...t[13] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0),
					q(e) ? (v(), d(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: S(() => [...t[14] ||= [h("Advanced", -1)]]),
						_: 1
					})) : f("", !0),
					X(e) ? (v(), d(c, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : f("", !0)
				], 8, we), g(te, {
					"model-value": z[e] ?? "",
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
				])], 64)) : j.value[e]?.secret ? (v(), p(l, { key: 4 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					h(x(Y(e)) + " ", 1),
					H(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: S(() => [...t[15] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0),
					q(e) ? (v(), d(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: S(() => [...t[16] ||= [h("Advanced", -1)]]),
						_: 1
					})) : f("", !0),
					X(e) ? (v(), d(c, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : f("", !0)
				], 8, Te), m("div", Ee, [m("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: R[e] ? "text" : "password",
					autocomplete: "off",
					value: z[e],
					disabled: J(e),
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, De), g(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": R[e] ? "eye-off" : "eye",
					"aria-label": R[e] ? `Hide ${Y(e)}` : `Show ${Y(e)}`,
					onClick: (t) => Ve(e)
				}, {
					default: S(() => [h(x(R[e] ? "Hide" : "Show"), 1)]),
					_: 2
				}, 1032, [
					"left-icon",
					"aria-label",
					"onClick"
				])])], 64)) : (v(), p(l, { key: 5 }, [m("label", {
					class: "admin-settings__label",
					for: `field-${e}`
				}, [
					h(x(Y(e)) + " ", 1),
					H(e) ? (v(), d(o, {
						key: 0,
						tone: "accent"
					}, {
						default: S(() => [...t[17] ||= [h("custom", -1)]]),
						_: 1
					})) : f("", !0),
					q(e) ? (v(), d(o, {
						key: 1,
						tone: "neutral",
						class: "field-advanced-badge"
					}, {
						default: S(() => [...t[18] ||= [h("Advanced", -1)]]),
						_: 1
					})) : f("", !0),
					X(e) ? (v(), d(c, {
						key: 2,
						"help-text": X(e) ?? "",
						"help-links": Z(e)
					}, null, 8, ["help-text", "help-links"])) : f("", !0)
				], 8, Oe), m("input", {
					id: `field-${e}`,
					class: "admin-settings__input",
					type: "text",
					autocomplete: "off",
					value: z[e],
					disabled: J(e),
					onInput: (t) => Q(e, t.target.value)
				}, null, 40, ke)], 64)), L.value[e] ? (v(), p("span", Ae, x(L.value[e]), 1)) : f("", !0)]))), 128)), m("div", je, [g(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !Ne.value,
					loading: I.value,
					onClick: $
				}, {
					default: S(() => [...t[19] ||= [h(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-4749b01f"]]);
//#endregion
export { w as default };

//# sourceMappingURL=SettingsPage-CI7gg5fD.js.map