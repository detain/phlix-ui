import { n as e, t } from "./Icon-ax5k7_G2.js";
import { n, t as r, u as i } from "./Button-9cUUJmnN.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as te } from "./Switch-CFZhdkXR.js";
import { t as o } from "./Modal-I4tEFhoH.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { i as ie, r as ae, t as oe } from "./plugins-loG9oEYL.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as se, inject as ce, normalizeClass as le, onMounted as ue, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelDynamic as de, vModelText as fe, withCtx as b, withDirectives as x, withModifiers as S } from "vue";
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
	class: "admin-plugins__install-error",
	role: "alert"
}, be = { class: "admin-plugins__install-error-body" }, xe = {
	key: 1,
	class: "admin-plugins__skel"
}, Se = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Ce = { class: "admin-plugins__card-head" }, we = { class: "admin-plugins__card-title" }, Te = { class: "admin-plugins__card-badges" }, Ee = {
	key: 0,
	class: "admin-plugins__card-summary"
}, De = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Oe = { class: "admin-plugins__card-actions" }, ke = ["href"], Ae = {
	key: 3,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, je = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Me = { class: "admin-plugins__mono" }, Ne = { class: "admin-plugins__actions" }, Pe = { class: "admin-plugins__field" }, Fe = { class: "admin-plugins__field" }, Ie = {
	key: 0,
	class: "admin-plugins__skel"
}, Le = { class: "admin-plugins__label" }, Re = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true"
}, ze = [
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"aria-label",
	"aria-invalid"
], Be = {
	key: 2,
	class: "admin-plugins__hint"
}, Ve = {
	key: 3,
	class: "admin-plugins__error",
	role: "alert"
}, C = /*#__PURE__*/ e(/* @__PURE__ */ se({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let se = e, C = ce("apiBase", ""), He = l(() => typeof C == "string" ? C : C?.value ?? ""), w = new oe(se.client ?? new n({
			baseUrl: He.value,
			tokenStore: new ee()
		})), T = ne(), Ue = _([]), E = _(!0), D = _(null);
		async function O() {
			E.value = !0, D.value = null;
			try {
				Ue.value = await w.list();
			} catch (e) {
				D.value = i(e, "Failed to load plugins."), T.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let k = _({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), A = _(!0);
		async function j() {
			A.value = !0;
			try {
				k.value = await w.catalog();
			} catch (e) {
				T.error(i(e, "Failed to load the plugin catalog."));
			} finally {
				A.value = !1;
			}
		}
		async function M() {
			await Promise.all([O(), j()]);
		}
		let N = l(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of k.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), We = l(() => new Set(N.value.map((e) => e.name))), Ge = l(() => Ue.value.filter((e) => !We.value.has(e.name)));
		function P(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function F(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let I = _(!1), L = _(""), R = _(!1);
		function Ke(e) {
			switch (ae(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return i(e, "Install failed — the plugin could not be downloaded or read.");
				default: return i(e, "Failed to install plugin.");
			}
		}
		function qe() {
			L.value = "", I.value = !0;
		}
		function z() {
			I.value = !1, L.value = "";
		}
		let B = _(null);
		function Je(e) {
			let t = Ke(e);
			B.value = t, T.error(t);
		}
		async function Ye() {
			let e = L.value.trim();
			if (!e) {
				T.error("A plugin URL is required.");
				return;
			}
			R.value = !0, B.value = null;
			try {
				await w.install(e), T.success("Plugin installed."), z(), await M();
			} catch (e) {
				Je(e);
			} finally {
				R.value = !1;
			}
		}
		let V = _(null);
		async function Xe(e) {
			if (V.value === null) {
				V.value = e.repo, B.value = null;
				try {
					await w.install(e.repo), T.success(`${e.title} installed.`), await M();
				} catch (e) {
					Je(e);
				} finally {
					V.value = null;
				}
			}
		}
		let H = _(!1), U = _(""), W = _(!1), G = _(null);
		function Ze() {
			U.value = "", H.value = !0;
		}
		function Qe() {
			H.value = !1, U.value = "";
		}
		async function $e() {
			let e = U.value.trim();
			if (!e) {
				T.error("A catalog URL is required.");
				return;
			}
			W.value = !0;
			try {
				await w.addCatalogSource(e), T.success("Catalog added."), Qe(), await j();
			} catch (e) {
				let t = ae(e);
				T.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : i(e, "Failed to add catalog."));
			} finally {
				W.value = !1;
			}
		}
		async function et(e) {
			if (G.value === null) {
				G.value = e;
				try {
					await w.removeCatalogSource(e), T.success("Catalog removed."), await j();
				} catch (e) {
					T.error(i(e, "Failed to remove catalog."));
				} finally {
					G.value = null;
				}
			}
		}
		let K = _(null);
		async function tt(e, t) {
			if (K.value === null) {
				K.value = e.name;
				try {
					t ? (await w.enable(e.name), T.success(`${e.name} enabled.`)) : (await w.disable(e.name), T.success(`${e.name} disabled.`)), await M();
				} catch (e) {
					T.error(i(e, "Failed to update plugin."));
				} finally {
					K.value = null;
				}
			}
		}
		let q = _(null);
		async function nt() {
			let e = q.value;
			if (e) try {
				await w.uninstall(e.name), T.success(`${e.name} uninstalled.`), q.value = null, await M();
			} catch (e) {
				T.error(i(e, "Failed to uninstall plugin.")), q.value = null;
			}
		}
		let J = _(null), Y = _(null), rt = _(!1), it = _(!1), X = _({}), Z = _({}), Q = _({}), at = l(() => J.value ? `Configure — ${J.value.name}` : "Configure plugin"), ot = l(() => Y.value ? Object.entries(Y.value.settings_schema) : []), st = l(() => ot.value.length > 0);
		function ct(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function lt(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function ut(e, t) {
			return lt(e) ? t === !0 || t === 1 || t === "1" || t === "true" : e.secret ? t == null ? "" : String(t) : t ?? (e.default === void 0 ? "" : e.default);
		}
		async function dt(e) {
			J.value = e, Y.value = null, X.value = {}, Z.value = {}, Q.value = {}, rt.value = !0;
			try {
				let t = await w.get(e.name);
				Y.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = ut(r, t.settings[e]);
				X.value = n, Z.value = { ...n };
			} catch (e) {
				T.error(i(e, "Failed to load plugin settings.")), J.value = null;
			} finally {
				rt.value = !1;
			}
		}
		function $() {
			J.value = null, Y.value = null, X.value = {}, Z.value = {}, Q.value = {};
		}
		function ft() {
			let e = {};
			if (!Y.value) return e;
			for (let [t, n] of Object.entries(Y.value.settings_schema)) {
				let r = X.value[t];
				r !== Z.value[t] && (n.secret && r === "***" || (lt(n) ? e[t] = r === !0 : ct(n) === "number" ? e[t] = r === "" || r === null ? r : Number(r) : e[t] = r));
			}
			return e;
		}
		async function pt() {
			let e = J.value;
			if (!e) return;
			Q.value = {};
			let t = ft();
			if (Object.keys(t).length === 0) {
				T.success("No changes to save."), $();
				return;
			}
			it.value = !0;
			try {
				await w.updateSettings(e.name, t), T.success("Settings saved."), $(), await M();
			} catch (e) {
				let t = ie(e);
				Object.keys(t).length > 0 ? (Q.value = t, T.error("Some settings could not be saved — check the highlighted fields.")) : T.error(i(e, "Failed to save settings."));
			} finally {
				it.value = !1;
			}
		}
		return ue(() => {
			O(), j();
		}), (e, n) => (g(), f("section", pe, [
			p("header", me, [n[9] ||= p("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), p("div", he, [h(r, {
				variant: "ghost",
				size: "sm",
				"left-icon": "plus",
				onClick: Ze
			}, {
				default: b(() => [...n[7] ||= [m("Add catalog", -1)]]),
				_: 1
			}), h(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: qe
			}, {
				default: b(() => [...n[8] ||= [m("Install from URL", -1)]]),
				_: 1
			})])]),
			p("div", ge, [n[10] ||= p("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (g(!0), f(c, null, v(k.value.sources, (e) => (g(), u(a, {
				key: e,
				tone: "neutral"
			}, {
				default: b(() => [p("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, y(P(e)), 9, _e), e === k.value.default_source ? d("", !0) : (g(), f("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: G.value === e,
					"aria-label": `Remove catalog ${P(e)}`,
					onClick: (t) => et(e)
				}, " × ", 8, ve))]),
				_: 2
			}, 1024))), 128))]),
			B.value ? (g(), f("div", ye, [
				h(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				p("div", be, [n[11] ||= p("strong", null, "Couldn't install the plugin.", -1), p("span", null, y(B.value), 1)]),
				p("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => B.value = null
				}, " × ")
			])) : d("", !0),
			A.value ? (g(), f("div", xe, [h(re, {
				variant: "text",
				lines: 5
			})])) : (g(), f(c, { key: 2 }, [(g(!0), f(c, null, v(k.value.errors, (e) => (g(), f("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[12] ||= m(" Couldn't load catalog ", -1),
				p("strong", null, y(P(e.source)), 1),
				m(" — " + y(e.error), 1)
			]))), 128)), N.value.length === 0 && k.value.errors.length === 0 ? (g(), u(s, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: b(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: qe
				}, {
					default: b(() => [...n[13] ||= [m("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), f("ul", Se, [(g(!0), f(c, null, v(N.value, (e) => (g(), f("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				p("div", Ce, [p("h3", we, y(e.title), 1), p("div", Te, [e.type ? (g(), u(a, {
					key: 0,
					tone: "info"
				}, {
					default: b(() => [m(y(e.type), 1)]),
					_: 2
				}, 1024)) : d("", !0), e.installed ? (g(), u(a, {
					key: 1,
					tone: "success"
				}, {
					default: b(() => [...n[14] ||= [m("Installed", -1)]]),
					_: 1
				})) : d("", !0)])]),
				e.summary || e.description ? (g(), f("p", Ee, y(e.summary || e.description), 1)) : d("", !0),
				e.tags.length ? (g(), f("div", De, [(g(!0), f(c, null, v(e.tags, (e) => (g(), f("span", {
					key: e,
					class: "admin-plugins__tag"
				}, y(e), 1))), 128))])) : d("", !0),
				p("div", Oe, [e.installed ? (g(), f(c, { key: 0 }, [
					h(te, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: K.value === e.name,
						"onUpdate:modelValue": (t) => tt(F(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[17] ||= p("span", { class: "admin-plugins__card-spacer" }, null, -1),
					h(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => dt(F(e))
					}, {
						default: b(() => [...n[15] ||= [m(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => q.value = F(e)
					}, {
						default: b(() => [...n[16] ||= [m(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (g(), f(c, { key: 1 }, [
					h(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: V.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => Xe(e)
					}, {
						default: b(() => [...n[18] ||= [m(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					n[19] ||= p("span", { class: "admin-plugins__card-spacer" }, null, -1),
					p("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, ke)
				], 64))])
			]))), 128))]))], 64)),
			Ge.value.length ? (g(), f("section", Ae, [
				n[23] ||= p("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[24] ||= p("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				p("table", je, [n[22] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Name"),
					p("th", { scope: "col" }, "Version"),
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Enabled"),
					p("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), p("tbody", null, [(g(!0), f(c, null, v(Ge.value, (e) => (g(), f("tr", { key: e.name }, [
					p("td", null, y(e.name), 1),
					p("td", Me, y(e.version), 1),
					p("td", null, [h(a, { tone: "info" }, {
						default: b(() => [m(y(e.type), 1)]),
						_: 2
					}, 1024)]),
					p("td", null, [h(te, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: K.value === e.name,
						"onUpdate:modelValue": (t) => tt(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					p("td", null, [p("div", Ne, [h(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.name}`,
						onClick: (t) => dt(e)
					}, {
						default: b(() => [...n[20] ||= [m(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]), h(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.name}`,
						onClick: (t) => q.value = e
					}, {
						default: b(() => [...n[21] ||= [m(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])])])
				]))), 128))])])
			])) : d("", !0),
			D.value && !E.value ? (g(), u(s, {
				key: 4,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: D.value
			}, {
				actions: b(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: O
				}, {
					default: b(() => [...n[25] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : d("", !0),
			h(o, {
				modelValue: I.value,
				"onUpdate:modelValue": n[2] ||= (e) => I.value = e,
				title: "Install from URL",
				onClose: z
			}, {
				footer: b(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: z
				}, {
					default: b(() => [...n[28] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: Ye
				}, {
					default: b(() => [...n[29] ||= [m("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: S(Ye, ["prevent"])
				}, [p("label", Pe, [
					n[26] ||= p("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					x(p("input", {
						"onUpdate:modelValue": n[1] ||= (e) => L.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[fe, L.value]]),
					n[27] ||= p("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: H.value,
				"onUpdate:modelValue": n[4] ||= (e) => H.value = e,
				title: "Add catalog",
				onClose: Qe
			}, {
				footer: b(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: Qe
				}, {
					default: b(() => [...n[32] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: $e
				}, {
					default: b(() => [...n[33] ||= [m("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: S($e, ["prevent"])
				}, [p("label", Fe, [
					n[30] ||= p("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					x(p("input", {
						"onUpdate:modelValue": n[3] ||= (e) => U.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[fe, U.value]]),
					n[31] ||= p("span", { class: "admin-plugins__hint" }, [
						m(" A repository (or direct "),
						p("code", null, "plugins.json"),
						m(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				"model-value": q.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => q.value = null
			}, {
				footer: b(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => q.value = null
				}, {
					default: b(() => [...n[36] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(r, {
					variant: "solid",
					size: "sm",
					onClick: nt
				}, {
					default: b(() => [...n[37] ||= [m("Uninstall", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					n[34] ||= m(" Uninstall ", -1),
					p("strong", null, y(q.value?.name), 1),
					n[35] ||= m("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": J.value !== null,
				title: at.value,
				size: "lg",
				"onUpdate:modelValue": $
			}, {
				footer: b(() => [h(r, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: b(() => [...n[38] ||= [m("Cancel", -1)]]),
					_: 1
				}), st.value ? (g(), u(r, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: it.value,
					onClick: pt
				}, {
					default: b(() => [...n[39] ||= [m(" Save ", -1)]]),
					_: 1
				}, 8, ["loading"])) : d("", !0)]),
				default: b(() => [rt.value ? (g(), f("div", Ie, [h(re, {
					variant: "text",
					lines: 4
				})])) : (g(), f(c, { key: 1 }, [st.value ? (g(), f("form", {
					key: 1,
					class: "admin-plugins__form",
					onSubmit: S(pt, ["prevent"])
				}, [(g(!0), f(c, null, v(ot.value, ([e, t]) => (g(), f("div", {
					key: e,
					class: "admin-plugins__field"
				}, [
					t.type === "bool" || t.type === "boolean" ? (g(), u(te, {
						key: 0,
						"model-value": X.value[e] === !0,
						label: t.label || e,
						"onUpdate:modelValue": (t) => X.value[e] = t
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					])) : (g(), f(c, { key: 1 }, [p("span", Le, [m(y(t.label || e) + " ", 1), t.required ? (g(), f("span", Re, "*")) : d("", !0)]), x(p("input", {
						"onUpdate:modelValue": (t) => X.value[e] = t,
						type: t.secret ? "password" : ct(t),
						class: le(["admin-plugins__input", { "is-invalid": Q.value[e] }]),
						autocomplete: t.secret ? "new-password" : "off",
						placeholder: t.secret ? "Leave unchanged to keep the current value" : void 0,
						"aria-label": t.label || e,
						"aria-invalid": Q.value[e] ? "true" : void 0
					}, null, 10, ze), [[de, X.value[e]]])], 64)),
					t.description ? (g(), f("span", Be, y(t.description), 1)) : d("", !0),
					Q.value[e] ? (g(), f("span", Ve, y(Q.value[e]), 1)) : d("", !0)
				]))), 128))], 32)) : (g(), u(s, {
					key: 0,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))], 64))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-8268420a"]]);
//#endregion
export { C as default };

//# sourceMappingURL=PluginsPage-QlbS14Xs.js.map