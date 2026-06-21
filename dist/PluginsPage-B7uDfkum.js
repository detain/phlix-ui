import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n, u as r } from "./Button-9cUUJmnN.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as i } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Switch-CFZhdkXR.js";
import { t as a } from "./Modal-I4tEFhoH.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./Skeleton-DkSoWF3C.js";
import { t as o } from "./EmptyState-B2QnGIQT.js";
import { i as ie, r as ae, t as oe } from "./plugins-loG9oEYL.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as se, inject as ce, normalizeClass as le, onMounted as ue, openBlock as h, ref as g, renderList as _, toDisplayString as v, vModelDynamic as de, vModelText as fe, withCtx as y, withDirectives as b, withModifiers as x } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var pe = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, me = { class: "admin-plugins__head" }, he = { class: "admin-plugins__head-actions" }, ge = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, _e = ["href"], ve = [
	"disabled",
	"aria-label",
	"onClick"
], ye = {
	key: 0,
	class: "admin-plugins__skel"
}, be = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, xe = { class: "admin-plugins__card-head" }, Se = { class: "admin-plugins__card-title" }, Ce = { class: "admin-plugins__card-badges" }, we = {
	key: 0,
	class: "admin-plugins__card-summary"
}, Te = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Ee = { class: "admin-plugins__card-actions" }, De = ["href"], Oe = {
	key: 2,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, ke = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Ae = { class: "admin-plugins__mono" }, je = { class: "admin-plugins__actions" }, Me = { class: "admin-plugins__field" }, Ne = { class: "admin-plugins__field" }, Pe = {
	key: 0,
	class: "admin-plugins__skel"
}, Fe = { class: "admin-plugins__label" }, Ie = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true"
}, Le = [
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"aria-label",
	"aria-invalid"
], Re = {
	key: 2,
	class: "admin-plugins__hint"
}, ze = {
	key: 3,
	class: "admin-plugins__error",
	role: "alert"
}, S = /*#__PURE__*/ e(/* @__PURE__ */ se({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let se = e, S = ce("apiBase", ""), Be = c(() => typeof S == "string" ? S : S?.value ?? ""), C = new oe(se.client ?? new t({
			baseUrl: Be.value,
			tokenStore: new ee()
		})), w = ne(), Ve = g([]), T = g(!0), E = g(null);
		async function D() {
			T.value = !0, E.value = null;
			try {
				Ve.value = await C.list();
			} catch (e) {
				E.value = r(e, "Failed to load plugins."), w.error(E.value);
			} finally {
				T.value = !1;
			}
		}
		let O = g({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), k = g(!0);
		async function A() {
			k.value = !0;
			try {
				O.value = await C.catalog();
			} catch (e) {
				w.error(r(e, "Failed to load the plugin catalog."));
			} finally {
				k.value = !1;
			}
		}
		async function j() {
			await Promise.all([D(), A()]);
		}
		let M = c(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of O.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), He = c(() => new Set(M.value.map((e) => e.name))), Ue = c(() => Ve.value.filter((e) => !He.value.has(e.name)));
		function N(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function P(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let F = g(!1), I = g(""), L = g(!1);
		function We(e) {
			switch (ae(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return "Install failed — the plugin could not be downloaded or read.";
				default: return r(e, "Failed to install plugin.");
			}
		}
		function Ge() {
			I.value = "", F.value = !0;
		}
		function R() {
			F.value = !1, I.value = "";
		}
		async function Ke() {
			let e = I.value.trim();
			if (!e) {
				w.error("A plugin URL is required.");
				return;
			}
			L.value = !0;
			try {
				await C.install(e), w.success("Plugin installed."), R(), await j();
			} catch (e) {
				w.error(We(e));
			} finally {
				L.value = !1;
			}
		}
		let z = g(null);
		async function qe(e) {
			if (z.value === null) {
				z.value = e.repo;
				try {
					await C.install(e.repo), w.success(`${e.title} installed.`), await j();
				} catch (e) {
					w.error(We(e));
				} finally {
					z.value = null;
				}
			}
		}
		let B = g(!1), V = g(""), H = g(!1), U = g(null);
		function Je() {
			V.value = "", B.value = !0;
		}
		function W() {
			B.value = !1, V.value = "";
		}
		async function Ye() {
			let e = V.value.trim();
			if (!e) {
				w.error("A catalog URL is required.");
				return;
			}
			H.value = !0;
			try {
				await C.addCatalogSource(e), w.success("Catalog added."), W(), await A();
			} catch (e) {
				let t = ae(e);
				w.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : r(e, "Failed to add catalog."));
			} finally {
				H.value = !1;
			}
		}
		async function Xe(e) {
			if (U.value === null) {
				U.value = e;
				try {
					await C.removeCatalogSource(e), w.success("Catalog removed."), await A();
				} catch (e) {
					w.error(r(e, "Failed to remove catalog."));
				} finally {
					U.value = null;
				}
			}
		}
		let G = g(null);
		async function Ze(e, t) {
			if (G.value === null) {
				G.value = e.name;
				try {
					t ? (await C.enable(e.name), w.success(`${e.name} enabled.`)) : (await C.disable(e.name), w.success(`${e.name} disabled.`)), await j();
				} catch (e) {
					w.error(r(e, "Failed to update plugin."));
				} finally {
					G.value = null;
				}
			}
		}
		let K = g(null);
		async function Qe() {
			let e = K.value;
			if (e) try {
				await C.uninstall(e.name), w.success(`${e.name} uninstalled.`), K.value = null, await j();
			} catch (e) {
				w.error(r(e, "Failed to uninstall plugin.")), K.value = null;
			}
		}
		let q = g(null), J = g(null), $e = g(!1), Y = g(!1), X = g({}), Z = g({}), Q = g({}), et = c(() => q.value ? `Configure — ${q.value.name}` : "Configure plugin"), tt = c(() => J.value ? Object.entries(J.value.settings_schema) : []), nt = c(() => tt.value.length > 0);
		function rt(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function it(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function at(e, t) {
			return it(e) ? t === !0 || t === 1 || t === "1" || t === "true" : e.secret ? t == null ? "" : String(t) : t ?? (e.default === void 0 ? "" : e.default);
		}
		async function ot(e) {
			q.value = e, J.value = null, X.value = {}, Z.value = {}, Q.value = {}, $e.value = !0;
			try {
				let t = await C.get(e.name);
				J.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = at(r, t.settings[e]);
				X.value = n, Z.value = { ...n };
			} catch (e) {
				w.error(r(e, "Failed to load plugin settings.")), q.value = null;
			} finally {
				$e.value = !1;
			}
		}
		function $() {
			q.value = null, J.value = null, X.value = {}, Z.value = {}, Q.value = {};
		}
		function st() {
			let e = {};
			if (!J.value) return e;
			for (let [t, n] of Object.entries(J.value.settings_schema)) {
				let r = X.value[t];
				r !== Z.value[t] && (n.secret && r === "***" || (it(n) ? e[t] = r === !0 : rt(n) === "number" ? e[t] = r === "" || r === null ? r : Number(r) : e[t] = r));
			}
			return e;
		}
		async function ct() {
			let e = q.value;
			if (!e) return;
			Q.value = {};
			let t = st();
			if (Object.keys(t).length === 0) {
				w.success("No changes to save."), $();
				return;
			}
			Y.value = !0;
			try {
				await C.updateSettings(e.name, t), w.success("Settings saved."), $(), await j();
			} catch (e) {
				let t = ie(e);
				Object.keys(t).length > 0 ? (Q.value = t, w.error("Some settings could not be saved — check the highlighted fields.")) : w.error(r(e, "Failed to save settings."));
			} finally {
				Y.value = !1;
			}
		}
		return ue(() => {
			D(), A();
		}), (e, t) => (h(), d("section", pe, [
			f("header", me, [t[8] ||= f("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), f("div", he, [m(n, {
				variant: "ghost",
				size: "sm",
				"left-icon": "plus",
				onClick: Je
			}, {
				default: y(() => [...t[6] ||= [p("Add catalog", -1)]]),
				_: 1
			}), m(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Ge
			}, {
				default: y(() => [...t[7] ||= [p("Install from URL", -1)]]),
				_: 1
			})])]),
			f("div", ge, [t[9] ||= f("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (h(!0), d(s, null, _(O.value.sources, (e) => (h(), l(i, {
				key: e,
				tone: "neutral"
			}, {
				default: y(() => [f("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, v(N(e)), 9, _e), e === O.value.default_source ? u("", !0) : (h(), d("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: U.value === e,
					"aria-label": `Remove catalog ${N(e)}`,
					onClick: (t) => Xe(e)
				}, " × ", 8, ve))]),
				_: 2
			}, 1024))), 128))]),
			k.value ? (h(), d("div", ye, [m(re, {
				variant: "text",
				lines: 5
			})])) : (h(), d(s, { key: 1 }, [(h(!0), d(s, null, _(O.value.errors, (e) => (h(), d("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				t[10] ||= p(" Couldn't load catalog ", -1),
				f("strong", null, v(N(e.source)), 1),
				p(" — " + v(e.error), 1)
			]))), 128)), M.value.length === 0 && O.value.errors.length === 0 ? (h(), l(o, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: y(() => [m(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Ge
				}, {
					default: y(() => [...t[11] ||= [p("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d("ul", be, [(h(!0), d(s, null, _(M.value, (e) => (h(), d("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				f("div", xe, [f("h3", Se, v(e.title), 1), f("div", Ce, [e.type ? (h(), l(i, {
					key: 0,
					tone: "info"
				}, {
					default: y(() => [p(v(e.type), 1)]),
					_: 2
				}, 1024)) : u("", !0), e.installed ? (h(), l(i, {
					key: 1,
					tone: "success"
				}, {
					default: y(() => [...t[12] ||= [p("Installed", -1)]]),
					_: 1
				})) : u("", !0)])]),
				e.summary || e.description ? (h(), d("p", we, v(e.summary || e.description), 1)) : u("", !0),
				e.tags.length ? (h(), d("div", Te, [(h(!0), d(s, null, _(e.tags, (e) => (h(), d("span", {
					key: e,
					class: "admin-plugins__tag"
				}, v(e), 1))), 128))])) : u("", !0),
				f("div", Ee, [e.installed ? (h(), d(s, { key: 0 }, [
					m(te, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: G.value === e.name,
						"onUpdate:modelValue": (t) => Ze(P(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					t[15] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => ot(P(e))
					}, {
						default: y(() => [...t[13] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => K.value = P(e)
					}, {
						default: y(() => [...t[14] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (h(), d(s, { key: 1 }, [
					m(n, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: z.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => qe(e)
					}, {
						default: y(() => [...t[16] ||= [p(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					t[17] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					f("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, De)
				], 64))])
			]))), 128))]))], 64)),
			Ue.value.length ? (h(), d("section", Oe, [
				t[21] ||= f("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				t[22] ||= f("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				f("table", ke, [t[20] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Name"),
					f("th", { scope: "col" }, "Version"),
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Enabled"),
					f("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), f("tbody", null, [(h(!0), d(s, null, _(Ue.value, (e) => (h(), d("tr", { key: e.name }, [
					f("td", null, v(e.name), 1),
					f("td", Ae, v(e.version), 1),
					f("td", null, [m(i, { tone: "info" }, {
						default: y(() => [p(v(e.type), 1)]),
						_: 2
					}, 1024)]),
					f("td", null, [m(te, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: G.value === e.name,
						"onUpdate:modelValue": (t) => Ze(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					f("td", null, [f("div", je, [m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.name}`,
						onClick: (t) => ot(e)
					}, {
						default: y(() => [...t[18] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]), m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.name}`,
						onClick: (t) => K.value = e
					}, {
						default: y(() => [...t[19] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])])])
				]))), 128))])])
			])) : u("", !0),
			E.value && !T.value ? (h(), l(o, {
				key: 3,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: E.value
			}, {
				actions: y(() => [m(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: D
				}, {
					default: y(() => [...t[23] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(a, {
				modelValue: F.value,
				"onUpdate:modelValue": t[1] ||= (e) => F.value = e,
				title: "Install from URL",
				onClose: R
			}, {
				footer: y(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: R
				}, {
					default: y(() => [...t[26] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					loading: L.value,
					onClick: Ke
				}, {
					default: y(() => [...t[27] ||= [p("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: x(Ke, ["prevent"])
				}, [f("label", Me, [
					t[24] ||= f("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					b(f("input", {
						"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[fe, I.value]]),
					t[25] ||= f("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				modelValue: B.value,
				"onUpdate:modelValue": t[3] ||= (e) => B.value = e,
				title: "Add catalog",
				onClose: W
			}, {
				footer: y(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: W
				}, {
					default: y(() => [...t[30] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					loading: H.value,
					onClick: Ye
				}, {
					default: y(() => [...t[31] ||= [p("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: x(Ye, ["prevent"])
				}, [f("label", Ne, [
					t[28] ||= f("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					b(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => V.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[fe, V.value]]),
					t[29] ||= f("span", { class: "admin-plugins__hint" }, [
						p(" A repository (or direct "),
						f("code", null, "plugins.json"),
						p(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(a, {
				"model-value": K.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": t[5] ||= (e) => K.value = null
			}, {
				footer: y(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[4] ||= (e) => K.value = null
				}, {
					default: y(() => [...t[34] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					onClick: Qe
				}, {
					default: y(() => [...t[35] ||= [p("Uninstall", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[32] ||= p(" Uninstall ", -1),
					f("strong", null, v(K.value?.name), 1),
					t[33] ||= p("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(a, {
				"model-value": q.value !== null,
				title: et.value,
				size: "lg",
				"onUpdate:modelValue": $
			}, {
				footer: y(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: y(() => [...t[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), nt.value ? (h(), l(n, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Y.value,
					onClick: ct
				}, {
					default: y(() => [...t[37] ||= [p(" Save ", -1)]]),
					_: 1
				}, 8, ["loading"])) : u("", !0)]),
				default: y(() => [$e.value ? (h(), d("div", Pe, [m(re, {
					variant: "text",
					lines: 4
				})])) : (h(), d(s, { key: 1 }, [nt.value ? (h(), d("form", {
					key: 1,
					class: "admin-plugins__form",
					onSubmit: x(ct, ["prevent"])
				}, [(h(!0), d(s, null, _(tt.value, ([e, t]) => (h(), d("div", {
					key: e,
					class: "admin-plugins__field"
				}, [
					t.type === "bool" || t.type === "boolean" ? (h(), l(te, {
						key: 0,
						"model-value": X.value[e] === !0,
						label: t.label || e,
						"onUpdate:modelValue": (t) => X.value[e] = t
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					])) : (h(), d(s, { key: 1 }, [f("span", Fe, [p(v(t.label || e) + " ", 1), t.required ? (h(), d("span", Ie, "*")) : u("", !0)]), b(f("input", {
						"onUpdate:modelValue": (t) => X.value[e] = t,
						type: t.secret ? "password" : rt(t),
						class: le(["admin-plugins__input", { "is-invalid": Q.value[e] }]),
						autocomplete: t.secret ? "new-password" : "off",
						placeholder: t.secret ? "Leave unchanged to keep the current value" : void 0,
						"aria-label": t.label || e,
						"aria-invalid": Q.value[e] ? "true" : void 0
					}, null, 10, Le), [[de, X.value[e]]])], 64)),
					t.description ? (h(), d("span", Re, v(t.description), 1)) : u("", !0),
					Q.value[e] ? (h(), d("span", ze, v(Q.value[e]), 1)) : u("", !0)
				]))), 128))], 32)) : (h(), l(o, {
					key: 0,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))], 64))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-0ff718ef"]]);
//#endregion
export { S as default };

//# sourceMappingURL=PluginsPage-B7uDfkum.js.map