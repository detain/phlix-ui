import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n, u as r } from "./Button-9cUUJmnN.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as te } from "./Badge-ArWL5-WE.js";
import { t as i } from "./Switch-CFZhdkXR.js";
import { t as a } from "./Modal-I4tEFhoH.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { i as re, r as ie, t as ae } from "./plugins-iPnnuCAX.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as oe, normalizeClass as se, onMounted as ce, openBlock as _, ref as v, renderList as y, toDisplayString as b, vModelDynamic as le, vModelText as ue, withCtx as x, withDirectives as S, withModifiers as C } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var de = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, fe = { class: "admin-plugins__head" }, pe = {
	key: 0,
	class: "admin-plugins__skel"
}, me = {
	key: 3,
	class: "admin-plugins__table",
	"aria-label": "Installed plugins"
}, he = { class: "admin-plugins__mono" }, ge = { class: "admin-plugins__actions" }, w = { class: "admin-plugins__field" }, T = {
	key: 0,
	class: "admin-plugins__skel"
}, _e = { class: "admin-plugins__label" }, ve = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true"
}, ye = [
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"aria-label",
	"aria-invalid"
], be = {
	key: 2,
	class: "admin-plugins__hint"
}, xe = {
	key: 3,
	class: "admin-plugins__error",
	role: "alert"
}, E = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let g = e, E = oe("apiBase", ""), Se = l(() => typeof E == "string" ? E : E?.value ?? ""), D = new ae(g.client ?? new t({
			baseUrl: Se.value,
			tokenStore: new ee()
		})), O = ne(), k = v([]), A = v(!0), j = v(null);
		async function M() {
			A.value = !0, j.value = null;
			try {
				k.value = await D.list();
			} catch (e) {
				j.value = r(e, "Failed to load plugins."), O.error(j.value);
			} finally {
				A.value = !1;
			}
		}
		let N = v(!1), P = v(""), F = v(!1);
		function Ce(e) {
			switch (ie(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return "Install failed — the plugin could not be downloaded or read.";
				default: return r(e, "Failed to install plugin.");
			}
		}
		function I() {
			P.value = "", N.value = !0;
		}
		function L() {
			N.value = !1, P.value = "";
		}
		async function R() {
			let e = P.value.trim();
			if (!e) {
				O.error("A plugin URL is required.");
				return;
			}
			F.value = !0;
			try {
				await D.install(e), O.success("Plugin installed."), L(), await M();
			} catch (e) {
				O.error(Ce(e));
			} finally {
				F.value = !1;
			}
		}
		let z = v(null);
		async function we(e, t) {
			if (z.value === null) {
				z.value = e.name;
				try {
					t ? (await D.enable(e.name), O.success(`${e.name} enabled.`)) : (await D.disable(e.name), O.success(`${e.name} disabled.`)), await M();
				} catch (e) {
					O.error(r(e, "Failed to update plugin."));
				} finally {
					z.value = null;
				}
			}
		}
		let B = v(null);
		async function Te() {
			let e = B.value;
			if (e) try {
				await D.uninstall(e.name), O.success(`${e.name} uninstalled.`), B.value = null, await M();
			} catch (e) {
				O.error(r(e, "Failed to uninstall plugin.")), B.value = null;
			}
		}
		let V = v(null), H = v(null), U = v(!1), W = v(!1), G = v({}), K = v({}), q = v({}), Ee = l(() => V.value ? `Configure — ${V.value.name}` : "Configure plugin"), J = l(() => H.value ? Object.entries(H.value.settings_schema) : []), Y = l(() => J.value.length > 0);
		function X(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function Z(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function De(e, t) {
			return Z(e) ? t === !0 || t === 1 || t === "1" || t === "true" : e.secret ? t == null ? "" : String(t) : t ?? (e.default === void 0 ? "" : e.default);
		}
		async function Oe(e) {
			V.value = e, H.value = null, G.value = {}, K.value = {}, q.value = {}, U.value = !0;
			try {
				let t = await D.get(e.name);
				H.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = De(r, t.settings[e]);
				G.value = n, K.value = { ...n };
			} catch (e) {
				O.error(r(e, "Failed to load plugin settings.")), V.value = null;
			} finally {
				U.value = !1;
			}
		}
		function Q() {
			V.value = null, H.value = null, G.value = {}, K.value = {}, q.value = {};
		}
		function ke() {
			let e = {};
			if (!H.value) return e;
			for (let [t, n] of Object.entries(H.value.settings_schema)) {
				let r = G.value[t];
				r !== K.value[t] && (n.secret && r === "***" || (Z(n) ? e[t] = r === !0 : X(n) === "number" ? e[t] = r === "" || r === null ? r : Number(r) : e[t] = r));
			}
			return e;
		}
		async function $() {
			let e = V.value;
			if (!e) return;
			q.value = {};
			let t = ke();
			if (Object.keys(t).length === 0) {
				O.success("No changes to save."), Q();
				return;
			}
			W.value = !0;
			try {
				await D.updateSettings(e.name, t), O.success("Settings saved."), Q(), await M();
			} catch (e) {
				let t = re(e);
				Object.keys(t).length > 0 ? (q.value = t, O.error("Some settings could not be saved — check the highlighted fields.")) : O.error(r(e, "Failed to save settings."));
			} finally {
				W.value = !1;
			}
		}
		return ce(M), (e, t) => (_(), f("section", de, [
			p("header", fe, [t[5] ||= p("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), h(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: I
			}, {
				default: x(() => [...t[4] ||= [m("Install plugin", -1)]]),
				_: 1
			})]),
			A.value ? (_(), f("div", pe, [h(o, {
				variant: "text",
				lines: 6
			})])) : j.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load plugins",
				description: j.value
			}, {
				actions: x(() => [h(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: x(() => [...t[6] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "settings",
				title: "No plugins installed"
			}, {
				actions: x(() => [h(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: I
				}, {
					default: x(() => [...t[7] ||= [m("Install plugin", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", me, [t[10] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Version"),
				p("th", { scope: "col" }, "Type"),
				p("th", { scope: "col" }, "Enabled"),
				p("th", {
					scope: "col",
					class: "admin-plugins__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(k.value, (e) => (_(), f("tr", { key: e.name }, [
				p("td", null, b(e.name), 1),
				p("td", he, b(e.version), 1),
				p("td", null, [h(te, { tone: "info" }, {
					default: x(() => [m(b(e.type), 1)]),
					_: 2
				}, 1024)]),
				p("td", null, [h(i, {
					"model-value": e.enabled,
					label: e.enabled ? "Enabled" : "Disabled",
					"aria-label": `Toggle ${e.name}`,
					disabled: z.value === e.name,
					"onUpdate:modelValue": (t) => we(e, t)
				}, null, 8, [
					"model-value",
					"label",
					"aria-label",
					"disabled",
					"onUpdate:modelValue"
				])]),
				p("td", null, [p("div", ge, [h(n, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Configure ${e.name}`,
					onClick: (t) => Oe(e)
				}, {
					default: x(() => [...t[8] ||= [m(" Configure ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"]), h(n, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Uninstall ${e.name}`,
					onClick: (t) => B.value = e
				}, {
					default: x(() => [...t[9] ||= [m(" Uninstall ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])),
			h(a, {
				modelValue: N.value,
				"onUpdate:modelValue": t[1] ||= (e) => N.value = e,
				title: "Install plugin",
				onClose: L
			}, {
				footer: x(() => [h(n, {
					variant: "ghost",
					size: "sm",
					onClick: L
				}, {
					default: x(() => [...t[13] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(n, {
					variant: "solid",
					size: "sm",
					loading: F.value,
					onClick: R
				}, {
					default: x(() => [...t[14] ||= [m(" Install ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: C(R, ["prevent"])
				}, [p("label", w, [
					t[11] ||= p("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					S(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://example.com/my-plugin.zip",
						required: ""
					}, null, 512), [[ue, P.value]]),
					t[12] ||= p("span", { class: "admin-plugins__hint" }, " The URL of a plugin archive or repository to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(a, {
				"model-value": B.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": t[3] ||= (e) => B.value = null
			}, {
				footer: x(() => [h(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[2] ||= (e) => B.value = null
				}, {
					default: x(() => [...t[17] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(n, {
					variant: "solid",
					size: "sm",
					onClick: Te
				}, {
					default: x(() => [...t[18] ||= [m("Uninstall", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[15] ||= m(" Uninstall ", -1),
					p("strong", null, b(B.value?.name), 1),
					t[16] ||= m("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(a, {
				"model-value": V.value !== null,
				title: Ee.value,
				size: "lg",
				"onUpdate:modelValue": Q
			}, {
				footer: x(() => [h(n, {
					variant: "ghost",
					size: "sm",
					onClick: Q
				}, {
					default: x(() => [...t[19] ||= [m("Cancel", -1)]]),
					_: 1
				}), Y.value ? (_(), u(n, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: $
				}, {
					default: x(() => [...t[20] ||= [m(" Save ", -1)]]),
					_: 1
				}, 8, ["loading"])) : d("", !0)]),
				default: x(() => [U.value ? (_(), f("div", T, [h(o, {
					variant: "text",
					lines: 4
				})])) : (_(), f(c, { key: 1 }, [Y.value ? (_(), f("form", {
					key: 1,
					class: "admin-plugins__form",
					onSubmit: C($, ["prevent"])
				}, [(_(!0), f(c, null, y(J.value, ([e, t]) => (_(), f("div", {
					key: e,
					class: "admin-plugins__field"
				}, [
					t.type === "bool" || t.type === "boolean" ? (_(), u(i, {
						key: 0,
						"model-value": G.value[e] === !0,
						label: t.label || e,
						"onUpdate:modelValue": (t) => G.value[e] = t
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					])) : (_(), f(c, { key: 1 }, [p("span", _e, [m(b(t.label || e) + " ", 1), t.required ? (_(), f("span", ve, "*")) : d("", !0)]), S(p("input", {
						"onUpdate:modelValue": (t) => G.value[e] = t,
						type: t.secret ? "password" : X(t),
						class: se(["admin-plugins__input", { "is-invalid": q.value[e] }]),
						autocomplete: t.secret ? "new-password" : "off",
						placeholder: t.secret ? "Leave unchanged to keep the current value" : void 0,
						"aria-label": t.label || e,
						"aria-invalid": q.value[e] ? "true" : void 0
					}, null, 10, ye), [[le, G.value[e]]])], 64)),
					t.description ? (_(), f("span", be, b(t.description), 1)) : d("", !0),
					q.value[e] ? (_(), f("span", xe, b(q.value[e]), 1)) : d("", !0)
				]))), 128))], 32)) : (_(), u(s, {
					key: 0,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))], 64))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-ccdcd703"]]);
//#endregion
export { E as default };

//# sourceMappingURL=PluginsPage-BCEi7x5B.js.map