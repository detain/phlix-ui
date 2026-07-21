import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as o } from "./Switch-DyS2L5gX.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as te } from "./PageHint-BoAlFFBN.js";
import { n as ne, t as re } from "./useSettingsPrefs-CCSyOWj_.js";
import { i as ie, r as ae, t as oe } from "./plugins-BtqNdCGA.js";
import { Fragment as l, computed as se, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ce, normalizeClass as _, onMounted as le, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, vModelCheckbox as ue, vModelDynamic as de, vModelText as fe, watch as pe, withCtx as C, withDirectives as w, withModifiers as me } from "vue";
//#region src/pages/admin/PluginConfigPage.vue?vue&type=script&setup=true&lang.ts
var he = {
	class: "admin-plugin-config",
	"aria-labelledby": "plugin-config-heading"
}, ge = { class: "admin-plugin-config__head" }, _e = { class: "settings-advanced-toggle" }, ve = { class: "admin-plugin-config__layout" }, ye = { class: "admin-plugin-config__sidebar" }, be = {
	key: 0,
	class: "admin-plugin-config__skel"
}, xe = {
	key: 3,
	class: "admin-plugin-config__list",
	"aria-label": "Installed plugins"
}, Se = ["aria-expanded", "onClick"], Ce = { class: "admin-plugin-config__plugin-info" }, we = { class: "admin-plugin-config__plugin-name" }, Te = { class: "admin-plugin-config__plugin-meta" }, Ee = { class: "admin-plugin-config__plugin-right" }, De = { class: "admin-plugin-config__toggle" }, Oe = { class: "admin-plugin-config__main" }, ke = {
	key: 0,
	class: "admin-plugin-config__panel"
}, Ae = {
	key: 3,
	class: "admin-plugin-config__panel",
	"aria-live": "polite"
}, je = { class: "admin-plugin-config__panel-head" }, Me = { class: "admin-plugin-config__panel-title" }, Ne = { class: "admin-plugin-config__panel-desc" }, Pe = {
	key: 0,
	class: "admin-plugin-config__redirect-url"
}, Fe = { class: "admin-plugin-config__redirect-url-row" }, Ie = { class: "admin-plugin-config__redirect-url-value" }, Le = {
	key: 0,
	class: "admin-plugin-config__error-banner",
	role: "alert"
}, Re = ["for"], ze = {
	key: 0,
	class: "admin-plugin-config__required"
}, Be = {
	key: 1,
	class: "admin-plugin-config__secret-badge"
}, Ve = {
	key: 2,
	class: "admin-plugin-config__advanced-badge"
}, He = [
	"id",
	"onUpdate:modelValue",
	"disabled"
], Ue = { class: "admin-plugin-config__checkbox-label" }, We = ["id"], Ge = {
	key: 1,
	class: "admin-plugin-config__secret-hint"
}, Ke = { class: "admin-plugin-config__secret-hint" }, qe = { class: "admin-plugin-config__secret-row" }, Je = [
	"id",
	"onUpdate:modelValue",
	"aria-describedby",
	"placeholder",
	"disabled",
	"onInput"
], Ye = [
	"id",
	"onUpdate:modelValue",
	"type",
	"placeholder",
	"disabled"
], Xe = {
	key: 4,
	class: "admin-plugin-config__field-error",
	role: "alert"
}, Ze = { class: "admin-plugin-config__actions" }, T = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "PluginConfigPage",
	props: { client: {} },
	setup(e) {
		let g = e, T = ce("apiBase", ""), Qe = se(() => typeof T == "string" ? T : T?.value ?? ""), E = new oe(g.client ?? new r({
			baseUrl: Qe.value,
			tokenStore: new t()
		})), D = ee(), O = re(), k = y([]), A = y(!0), j = y(null);
		async function M() {
			A.value = !0, j.value = null;
			try {
				k.value = await E.list();
			} catch (e) {
				j.value = n(e, "Failed to load plugins."), D.error(j.value);
			} finally {
				A.value = !1;
			}
		}
		let N = y(null), P = y(!1), F = y(null), I = y({}), L = y({}), R = y(!1), z = y(null), B = y(!1), V = y(null), H = y({}), U = y({});
		pe(I, () => {
			V.value !== null && (V.value = null);
		});
		async function W(e) {
			if (N.value?.name === e.name) {
				N.value = null, I.value = {}, L.value = {}, H.value = {}, U.value = {};
				return;
			}
			P.value = !0, F.value = null, N.value = null, I.value = {}, L.value = {}, H.value = {}, U.value = {};
			try {
				let t = await E.get(e.name);
				N.value = t;
				for (let [e, n] of Object.entries(t.settings)) I.value[e] = tt(e, n);
			} catch (t) {
				F.value = n(t, `Failed to load plugin details for "${e.name}".`), D.error(F.value);
			} finally {
				P.value = !1;
			}
		}
		function $e(e) {
			H.value[e] = !0;
		}
		function et(e) {
			return N.value?.settings_schema[e]?.secret === !0;
		}
		function tt(e, t) {
			return et(e) ? "" : String(t ?? "");
		}
		function G(e) {
			return N.value?.secret_status?.[e] ?? null;
		}
		function K(e) {
			return G(e)?.set === !0;
		}
		function q(e) {
			let t = G(e);
			return t?.set === !0 ? t.length : 0;
		}
		function J(e) {
			return `secret-status-${e}`;
		}
		function Y(e) {
			return U.value[e] === !0;
		}
		function nt(e, t) {
			return t.secret && !$(t) && G(e)?.set !== !1;
		}
		function rt(e) {
			U.value[e] = !0, I.value[e] = "", delete H.value[e];
		}
		function it(e) {
			delete U.value[e];
		}
		function X() {
			let e = {};
			if (!N.value) return e;
			for (let [t, n] of Object.entries(N.value.settings_schema)) {
				let r = I.value[t];
				$(n) || (n.secret ? Y(t) ? e[t] = "" : H.value[t] && r !== "" && r !== "***" && (e[t] = r) : e[t] = r === "" ? null : at(r, n.type));
			}
			return e;
		}
		function at(e, t) {
			switch (t) {
				case "int":
				case "integer": return parseInt(e, 10) || 0;
				case "bool":
				case "boolean": return e === "true" || e === "1";
				case "number":
				case "float": return parseFloat(e) || 0;
				case "array":
				case "object": try {
					return JSON.parse(e);
				} catch {
					return e;
				}
				default: return e;
			}
		}
		async function ot() {
			if (!N.value || R.value) return;
			R.value = !0, z.value = null, L.value = {};
			let e = X();
			try {
				await E.updateSettings(N.value.name, e), D.success(`Settings saved for "${N.value.name}".`), await W({ name: N.value.name });
			} catch (e) {
				ae(e) === "plugin.settings.validation_failed" ? (L.value = ie(e), z.value = "Please fix the errors below and try again.") : (z.value = n(e, "Failed to save settings."), D.error(z.value));
			} finally {
				R.value = !1;
			}
		}
		async function st() {
			if (!N.value || B.value) return;
			B.value = !0, V.value = null;
			let e = X(), t = {};
			for (let [n, r] of Object.entries(e)) t[n] = typeof r == "string" ? r : JSON.stringify(r);
			try {
				let e = await E.testCredentials(N.value.name, t);
				V.value = e, e.success ? D.success(`Test succeeded: ${e.message}`) : D.error(`Test failed: ${e.message}`);
			} catch (e) {
				V.value = {
					success: !1,
					message: n(e, "Test request failed.")
				}, D.error(V.value.message);
			} finally {
				B.value = !1;
			}
		}
		async function ct(e) {
			try {
				await navigator.clipboard.writeText(e), D.success("Copied to clipboard.");
			} catch {
				D.error("Failed to copy to clipboard.");
			}
		}
		let Z = y(null);
		async function lt(e) {
			if (Z.value === null) {
				Z.value = e.name;
				try {
					e.enabled ? (await E.disable(e.name), D.success(`"${e.name}" has been disabled.`)) : (await E.enable(e.name), D.success(`"${e.name}" has been enabled.`)), await M();
				} catch (t) {
					D.error(n(t, `Failed to ${e.enabled ? "disable" : "enable"} "${e.name}".`));
				} finally {
					Z.value = null;
				}
			}
		}
		function Q(e) {
			return e.tier === "advanced";
		}
		function $(e) {
			return Q(e) && !O.advancedMode;
		}
		function ut(e) {
			if (e.link) return [{
				text: e.link_text || "Learn more",
				url: e.link
			}];
		}
		function dt(e) {
			switch (e.type) {
				case "int":
				case "integer":
				case "number":
				case "float": return "number";
				case "bool":
				case "boolean": return "checkbox";
				default: return "text";
			}
		}
		return le(M), (e, t) => (v(), f("section", he, [
			p("header", ge, [t[3] ||= p("h1", {
				id: "plugin-config-heading",
				class: "admin-plugin-config__title"
			}, "Plugin Configuration", -1), p("div", _e, [t[2] ||= p("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), h(o, {
				"model-value": S(O).advancedMode,
				"onUpdate:modelValue": t[0] ||= (e) => S(O).setAdvancedMode(e)
			}, null, 8, ["model-value"])])]),
			h(te, null, {
				default: C(() => [...t[4] ||= [
					m(" Manage settings for installed plugins. Click a plugin to expand its configuration form. Use the ", -1),
					p("strong", null, "toggle", -1),
					m(" to enable or disable a plugin without uninstalling it, and the ", -1),
					p("strong", null, "Advanced", -1),
					m(" switch to unlock expert-tier fields. Settings are validated against the plugin manifest schema. ", -1)
				]]),
				_: 1
			}),
			p("div", ve, [p("aside", ye, [A.value ? (v(), f("div", be, [h(s, {
				variant: "text",
				lines: 6
			})])) : j.value ? (v(), u(c, {
				key: 1,
				title: "Couldn't load plugins",
				message: j.value
			}, {
				default: C(() => [h(i, {
					variant: "solid",
					size: "sm",
					onClick: M
				}, {
					default: C(() => [...t[5] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["message"])) : k.value.length === 0 ? (v(), u(c, {
				key: 2,
				title: "No plugins installed",
				message: "Install plugins from the Plugins catalog."
			})) : (v(), f("ul", xe, [(v(!0), f(l, null, b(k.value, (e) => (v(), f("li", {
				key: e.name,
				class: _(["admin-plugin-config__list-item", { "admin-plugin-config__list-item--selected": N.value?.name === e.name }])
			}, [p("button", {
				class: "admin-plugin-config__plugin-btn",
				type: "button",
				"aria-expanded": N.value?.name === e.name,
				onClick: (t) => W(e)
			}, [p("div", Ce, [p("span", we, x(e.name), 1), p("span", Te, " v" + x(e.version) + " · " + x(e.type), 1)]), p("div", Ee, [h(a, { tone: e.enabled ? "success" : "neutral" }, {
				default: C(() => [m(x(e.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])])], 8, Se), p("div", De, [h(o, {
				"model-value": e.enabled,
				loading: Z.value === e.name,
				disabled: Z.value === e.name,
				size: "sm",
				"onUpdate:modelValue": (t) => lt(e)
			}, null, 8, [
				"model-value",
				"loading",
				"disabled",
				"onUpdate:modelValue"
			])])], 2))), 128))]))]), p("main", Oe, [P.value ? (v(), f("div", ke, [h(s, {
				variant: "text",
				lines: 6
			})])) : F.value ? (v(), u(c, {
				key: 1,
				title: "Couldn't load plugin",
				message: F.value
			}, null, 8, ["message"])) : N.value ? (v(), f("div", Ae, [
				p("header", je, [p("h2", Me, x(N.value.name), 1), p("p", Ne, " v" + x(N.value.version) + " · " + x(N.value.type), 1)]),
				N.value.redirect_url ? (v(), f("div", Pe, [t[7] ||= p("label", { class: "admin-plugin-config__label" }, "Redirect URL", -1), p("div", Fe, [p("code", Ie, x(N.value.redirect_url), 1), h(i, {
					variant: "outline",
					size: "sm",
					onClick: t[1] ||= (e) => ct(N.value.redirect_url)
				}, {
					default: C(() => [...t[6] ||= [m(" Copy ", -1)]]),
					_: 1
				})])])) : d("", !0),
				p("form", {
					class: "admin-plugin-config__form",
					onSubmit: me(ot, ["prevent"])
				}, [
					z.value ? (v(), f("div", Le, x(z.value), 1)) : d("", !0),
					(v(!0), f(l, null, b(N.value.settings_schema, (e, n) => (v(), f("div", {
						key: n,
						class: "admin-plugin-config__field"
					}, [
						p("label", {
							for: `setting-${n}`,
							class: "admin-plugin-config__label"
						}, [
							m(x(e.label || n) + " ", 1),
							e.required ? (v(), f("span", ze, "*")) : d("", !0),
							e.secret ? (v(), f("span", Be, "Secret")) : d("", !0),
							Q(e) ? (v(), f("span", Ve, "Advanced")) : d("", !0)
						], 8, Re),
						e.description || e.link ? (v(), u(ne, {
							key: 0,
							text: e.description,
							links: ut(e)
						}, null, 8, ["text", "links"])) : d("", !0),
						e.type === "bool" || e.type === "boolean" ? (v(), f(l, { key: 1 }, [w(p("input", {
							id: `setting-${n}`,
							"onUpdate:modelValue": (e) => I.value[n] = e,
							type: "checkbox",
							"true-value": "true",
							"false-value": "false",
							class: "admin-plugin-config__checkbox",
							disabled: $(e)
						}, null, 8, He), [[ue, I.value[n]]]), p("span", Ue, x(I.value[n] === "true" ? "Enabled" : "Disabled"), 1)], 64)) : e.secret ? (v(), f(l, { key: 2 }, [p("p", {
							id: J(n),
							class: "admin-plugin-config__secret-status"
						}, [Y(n) ? (v(), f(l, { key: 0 }, [h(a, {
							tone: "warning",
							class: "admin-plugin-config__secret-state"
						}, {
							default: C(() => [...t[8] ||= [m(" Will be removed ", -1)]]),
							_: 1
						}), t[9] ||= p("span", { class: "admin-plugin-config__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : G(n) === null ? (v(), f("span", Ge, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : K(n) ? (v(), f(l, { key: 2 }, [h(a, {
							tone: "success",
							class: "admin-plugin-config__secret-state"
						}, {
							default: C(() => [...t[10] ||= [m("Configured", -1)]]),
							_: 1
						}), p("span", Ke, " A value is stored (" + x(q(n)) + " " + x(q(n) === 1 ? "character" : "characters") + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (v(), f(l, { key: 3 }, [h(a, {
							tone: "neutral",
							class: "admin-plugin-config__secret-state"
						}, {
							default: C(() => [...t[11] ||= [m("Not set", -1)]]),
							_: 1
						}), t[12] ||= p("span", { class: "admin-plugin-config__secret-hint" }, "No value is stored yet.", -1)], 64))], 8, We), p("div", qe, [w(p("input", {
							id: `setting-${n}`,
							"onUpdate:modelValue": (e) => I.value[n] = e,
							type: "password",
							autocomplete: "new-password",
							class: _(["admin-plugin-config__input", { "admin-plugin-config__input--error": L.value[n] }]),
							"aria-describedby": J(n),
							placeholder: Y(n) ? "Will be removed on save" : K(n) ? "Leave blank to keep the stored value" : `Enter ${e.label || n}`,
							disabled: $(e) || Y(n),
							onInput: (e) => $e(n)
						}, null, 42, Je), [[fe, I.value[n]]]), Y(n) ? (v(), u(i, {
							key: 0,
							variant: "ghost",
							size: "sm",
							"aria-label": `Keep the stored ${e.label || n}`,
							onClick: (e) => it(n)
						}, {
							default: C(() => [...t[13] ||= [m(" Undo ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])) : nt(n, e) ? (v(), u(i, {
							key: 1,
							variant: "ghost",
							size: "sm",
							"aria-label": `Remove the stored ${e.label || n}`,
							onClick: (e) => rt(n)
						}, {
							default: C(() => [...t[14] ||= [m(" Remove ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])) : d("", !0)])], 64)) : w((v(), f("input", {
							key: 3,
							id: `setting-${n}`,
							"onUpdate:modelValue": (e) => I.value[n] = e,
							type: dt(e),
							class: _(["admin-plugin-config__input", { "admin-plugin-config__input--error": L.value[n] }]),
							placeholder: e.default === void 0 ? "" : String(e.default),
							disabled: $(e)
						}, null, 10, Ye)), [[de, I.value[n]]]),
						L.value[n] ? (v(), f("p", Xe, x(L.value[n]), 1)) : d("", !0)
					]))), 128)),
					p("div", Ze, [h(i, {
						type: "submit",
						variant: "solid",
						loading: R.value,
						disabled: R.value
					}, {
						default: C(() => [...t[15] ||= [m(" Save settings ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]), h(i, {
						variant: "outline",
						loading: B.value,
						disabled: B.value || R.value,
						onClick: st
					}, {
						default: C(() => [...t[16] ||= [m(" Test credentials ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])]),
					V.value ? (v(), f("div", {
						key: 1,
						class: _(["admin-plugin-config__test-result", V.value.success ? "admin-plugin-config__test-result--success" : "admin-plugin-config__test-result--error"]),
						role: "alert"
					}, x(V.value.message), 3)) : d("", !0)
				], 32)
			])) : (v(), u(c, {
				key: 2,
				title: "Select a plugin",
				message: "Click a plugin on the left to configure its settings."
			}))])])
		]));
	}
}), [["__scopeId", "data-v-03d10316"]]);
//#endregion
export { T as default };

//# sourceMappingURL=PluginConfigPage-BR2ONzvq.js.map