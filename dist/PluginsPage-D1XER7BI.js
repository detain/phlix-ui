import { n as e, t } from "./Icon-ax5k7_G2.js";
import { d as n, n as r, s as ee, t as i } from "./Button-5ZSsUmsI.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as o } from "./Switch-CFZhdkXR.js";
import { t as s } from "./Modal-I4tEFhoH.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as ne } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { i as re, r as l, t as ie } from "./plugins-CLT7jRx3.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as ae, inject as oe, normalizeClass as se, onMounted as ce, openBlock as v, ref as y, renderList as b, toDisplayString as x, vModelDynamic as le, vModelText as ue, withCtx as S, withDirectives as de, withModifiers as fe } from "vue";
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
}, C = /*#__PURE__*/ e(/* @__PURE__ */ ae({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let ae = e, C = oe("apiBase", ""), He = d(() => typeof C == "string" ? C : C?.value ?? ""), w = new ie(ae.client ?? new r({
			baseUrl: He.value,
			tokenStore: new ee()
		})), T = te(), Ue = y([]), E = y(!0), D = y(null);
		async function O() {
			E.value = !0, D.value = null;
			try {
				Ue.value = await w.list();
			} catch (e) {
				D.value = n(e, "Failed to load plugins."), T.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let k = y({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), We = y(!0);
		async function A() {
			We.value = !0;
			try {
				k.value = await w.catalog();
			} catch (e) {
				T.error(n(e, "Failed to load the plugin catalog."));
			} finally {
				We.value = !1;
			}
		}
		async function j() {
			await Promise.all([O(), A()]);
		}
		let Ge = d(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of k.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), Ke = d(() => new Set(Ge.value.map((e) => e.name))), qe = d(() => Ue.value.filter((e) => !Ke.value.has(e.name)));
		function Je(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function M(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let N = y(!1), P = y(""), Ye = y(!1);
		function Xe(e) {
			switch (l(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return n(e, "Install failed — the plugin could not be downloaded or read.");
				default: return n(e, "Failed to install plugin.");
			}
		}
		function Ze() {
			P.value = "", N.value = !0;
		}
		function Qe() {
			N.value = !1, P.value = "";
		}
		let F = y(null);
		function $e(e) {
			let t = Xe(e);
			F.value = t, T.error(t);
		}
		async function et() {
			let e = P.value.trim();
			if (!e) {
				T.error("A plugin URL is required.");
				return;
			}
			Ye.value = !0, F.value = null;
			try {
				await w.install(e), T.success("Plugin installed."), Qe(), await j();
			} catch (e) {
				$e(e);
			} finally {
				Ye.value = !1;
			}
		}
		let I = y(null);
		async function tt(e) {
			if (I.value === null) {
				I.value = e.repo, F.value = null;
				try {
					await w.install(e.repo), T.success(`${e.title} installed.`), await j();
				} catch (e) {
					$e(e);
				} finally {
					I.value = null;
				}
			}
		}
		let L = y(!1), R = y(""), nt = y(!1), z = y(null);
		function rt() {
			R.value = "", L.value = !0;
		}
		function it() {
			L.value = !1, R.value = "";
		}
		async function at() {
			let e = R.value.trim();
			if (!e) {
				T.error("A catalog URL is required.");
				return;
			}
			nt.value = !0;
			try {
				await w.addCatalogSource(e), T.success("Catalog added."), it(), await A();
			} catch (e) {
				let t = l(e);
				T.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : n(e, "Failed to add catalog."));
			} finally {
				nt.value = !1;
			}
		}
		async function ot(e) {
			if (z.value === null) {
				z.value = e;
				try {
					await w.removeCatalogSource(e), T.success("Catalog removed."), await A();
				} catch (e) {
					T.error(n(e, "Failed to remove catalog."));
				} finally {
					z.value = null;
				}
			}
		}
		let B = y({}), V = y(!1), H = y(!1), U = y(null), W = y(!1), st = d(() => Object.values(B.value).filter((e) => e.update_available).length);
		function G(e) {
			let t = B.value[e];
			return t && t.update_available ? t : null;
		}
		function ct(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			B.value = t;
		}
		function lt(e) {
			if (e in B.value) {
				let t = { ...B.value };
				delete t[e], B.value = t;
			}
		}
		async function ut() {
			if (!V.value) {
				V.value = !0;
				try {
					let e = await w.checkUpdates();
					ct(e.updates), W.value = e.auto_update;
					let t = st.value;
					T.success(t > 0 ? `${t} update${t === 1 ? "" : "s"} available.` : "All plugins are up to date.");
				} catch (e) {
					T.error(n(e, "Failed to check for updates."));
				} finally {
					V.value = !1;
				}
			}
		}
		function dt(e) {
			switch (l(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return n(e, "Update failed — the new version could not be downloaded or read.");
				default: return n(e, "Failed to update plugin.");
			}
		}
		async function ft(e) {
			if (U.value === null) {
				U.value = e.name;
				try {
					await w.updatePlugin(e.name), T.success(`${e.name} updated.`), lt(e.name), await j();
				} catch (e) {
					T.error(dt(e));
				} finally {
					U.value = null;
				}
			}
		}
		async function pt() {
			if (!H.value) {
				H.value = !0;
				try {
					let e = await w.updateAll();
					e.failed.length > 0 ? T.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : T.success(`${e.updated.length} plugin${e.updated.length === 1 ? "" : "s"} updated.`), await j();
					let t = await w.checkUpdates();
					ct(t.updates), W.value = t.auto_update;
				} catch (e) {
					T.error(n(e, "Failed to apply updates."));
				} finally {
					H.value = !1;
				}
			}
		}
		async function mt(e) {
			let t = W.value;
			W.value = e;
			try {
				W.value = await w.setAutoUpdate(e), T.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				W.value = t, T.error(n(e, "Failed to change auto-update."));
			}
		}
		let K = y(null);
		async function ht(e, t) {
			if (K.value === null) {
				K.value = e.name;
				try {
					t ? (await w.enable(e.name), T.success(`${e.name} enabled.`)) : (await w.disable(e.name), T.success(`${e.name} disabled.`)), await j();
				} catch (e) {
					T.error(n(e, "Failed to update plugin."));
				} finally {
					K.value = null;
				}
			}
		}
		let q = y(null);
		async function gt() {
			let e = q.value;
			if (e) try {
				await w.uninstall(e.name), T.success(`${e.name} uninstalled.`), q.value = null, await j();
			} catch (e) {
				T.error(n(e, "Failed to uninstall plugin.")), q.value = null;
			}
		}
		let J = y(null), Y = y(null), _t = y(!1), vt = y(!1), X = y({}), Z = y({}), Q = y({}), yt = d(() => J.value ? `Configure — ${J.value.name}` : "Configure plugin"), bt = d(() => Y.value ? Object.entries(Y.value.settings_schema) : []), xt = d(() => bt.value.length > 0);
		function St(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function Ct(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function wt(e, t) {
			return Ct(e) ? t === !0 || t === 1 || t === "1" || t === "true" : e.secret ? t == null ? "" : String(t) : t ?? (e.default === void 0 ? "" : e.default);
		}
		async function Tt(e) {
			J.value = e, Y.value = null, X.value = {}, Z.value = {}, Q.value = {}, _t.value = !0;
			try {
				let t = await w.get(e.name);
				Y.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = wt(r, t.settings[e]);
				X.value = n, Z.value = { ...n };
			} catch (e) {
				T.error(n(e, "Failed to load plugin settings.")), J.value = null;
			} finally {
				_t.value = !1;
			}
		}
		function $() {
			J.value = null, Y.value = null, X.value = {}, Z.value = {}, Q.value = {};
		}
		function Et() {
			let e = {};
			if (!Y.value) return e;
			for (let [t, n] of Object.entries(Y.value.settings_schema)) {
				let r = X.value[t];
				r !== Z.value[t] && (n.secret && r === "***" || (Ct(n) ? e[t] = r === !0 : St(n) === "number" ? e[t] = r === "" || r === null ? r : Number(r) : e[t] = r));
			}
			return e;
		}
		async function Dt() {
			let e = J.value;
			if (!e) return;
			Q.value = {};
			let t = Et();
			if (Object.keys(t).length === 0) {
				T.success("No changes to save."), $();
				return;
			}
			vt.value = !0;
			try {
				await w.updateSettings(e.name, t), T.success("Settings saved."), $(), await j();
			} catch (e) {
				let t = re(e);
				Object.keys(t).length > 0 ? (Q.value = t, T.error("Some settings could not be saved — check the highlighted fields.")) : T.error(n(e, "Failed to save settings."));
			} finally {
				vt.value = !1;
			}
		}
		async function Ot() {
			try {
				W.value = await w.getAutoUpdate();
			} catch {}
		}
		return ce(() => {
			O(), A(), Ot();
		}), (e, n) => (v(), m("section", pe, [
			h("header", me, [n[11] ||= h("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), h("div", he, [
				_(o, {
					"model-value": W.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": mt
				}, null, 8, ["model-value"]),
				n[10] ||= h("span", { class: "admin-plugins__head-spacer" }, null, -1),
				_(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: V.value,
					onClick: ut
				}, {
					default: S(() => [...n[7] ||= [g(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				st.value > 0 ? (v(), f(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: H.value,
					onClick: pt
				}, {
					default: S(() => [g(" Update all (" + x(st.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : p("", !0),
				_(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: rt
				}, {
					default: S(() => [...n[8] ||= [g("Add catalog", -1)]]),
					_: 1
				}),
				_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Ze
				}, {
					default: S(() => [...n[9] ||= [g("Install from URL", -1)]]),
					_: 1
				})
			])]),
			h("div", ge, [n[12] ||= h("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (v(!0), m(u, null, b(k.value.sources, (e) => (v(), f(a, {
				key: e,
				tone: "neutral"
			}, {
				default: S(() => [h("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, x(Je(e)), 9, _e), e === k.value.default_source ? p("", !0) : (v(), m("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: z.value === e,
					"aria-label": `Remove catalog ${Je(e)}`,
					onClick: (t) => ot(e)
				}, " × ", 8, ve))]),
				_: 2
			}, 1024))), 128))]),
			F.value ? (v(), m("div", ye, [
				_(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				h("div", be, [n[13] ||= h("strong", null, "Couldn't install the plugin.", -1), h("span", null, x(F.value), 1)]),
				h("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => F.value = null
				}, " × ")
			])) : p("", !0),
			We.value ? (v(), m("div", xe, [_(ne, {
				variant: "text",
				lines: 5
			})])) : (v(), m(u, { key: 2 }, [(v(!0), m(u, null, b(k.value.errors, (e) => (v(), m("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[14] ||= g(" Couldn't load catalog ", -1),
				h("strong", null, x(Je(e.source)), 1),
				g(" — " + x(e.error), 1)
			]))), 128)), Ge.value.length === 0 && k.value.errors.length === 0 ? (v(), f(c, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: S(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Ze
				}, {
					default: S(() => [...n[15] ||= [g("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), m("ul", Se, [(v(!0), m(u, null, b(Ge.value, (e) => (v(), m("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				h("div", Ce, [h("h3", we, x(e.title), 1), h("div", Te, [
					e.type ? (v(), f(a, {
						key: 0,
						tone: "info"
					}, {
						default: S(() => [g(x(e.type), 1)]),
						_: 2
					}, 1024)) : p("", !0),
					e.installed ? (v(), f(a, {
						key: 1,
						tone: "success"
					}, {
						default: S(() => [...n[16] ||= [g("Installed", -1)]]),
						_: 1
					})) : p("", !0),
					G(e.name) ? (v(), f(a, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: S(() => [g(" Update → v" + x(G(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : p("", !0)
				])]),
				e.summary || e.description ? (v(), m("p", Ee, x(e.summary || e.description), 1)) : p("", !0),
				e.tags.length ? (v(), m("div", De, [(v(!0), m(u, null, b(e.tags, (e) => (v(), m("span", {
					key: e,
					class: "admin-plugins__tag"
				}, x(e), 1))), 128))])) : p("", !0),
				h("div", Oe, [e.installed ? (v(), m(u, { key: 0 }, [
					_(o, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: K.value === e.name,
						"onUpdate:modelValue": (t) => ht(M(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[20] ||= h("span", { class: "admin-plugins__card-spacer" }, null, -1),
					G(e.name) ? (v(), f(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: U.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => ft(M(e))
					}, {
						default: S(() => [...n[17] ||= [g(" Update ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])) : p("", !0),
					_(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => Tt(M(e))
					}, {
						default: S(() => [...n[18] ||= [g(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => q.value = M(e)
					}, {
						default: S(() => [...n[19] ||= [g(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (v(), m(u, { key: 1 }, [
					_(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: I.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => tt(e)
					}, {
						default: S(() => [...n[21] ||= [g(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					n[22] ||= h("span", { class: "admin-plugins__card-spacer" }, null, -1),
					h("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, ke)
				], 64))])
			]))), 128))]))], 64)),
			qe.value.length ? (v(), m("section", Ae, [
				n[27] ||= h("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[28] ||= h("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				h("table", je, [n[26] ||= h("thead", null, [h("tr", null, [
					h("th", { scope: "col" }, "Name"),
					h("th", { scope: "col" }, "Version"),
					h("th", { scope: "col" }, "Type"),
					h("th", { scope: "col" }, "Enabled"),
					h("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), h("tbody", null, [(v(!0), m(u, null, b(qe.value, (e) => (v(), m("tr", { key: e.name }, [
					h("td", null, x(e.name), 1),
					h("td", Me, [g(x(e.version) + " ", 1), G(e.name) ? (v(), f(a, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: S(() => [g(" → v" + x(G(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : p("", !0)]),
					h("td", null, [_(a, { tone: "info" }, {
						default: S(() => [g(x(e.type), 1)]),
						_: 2
					}, 1024)]),
					h("td", null, [_(o, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: K.value === e.name,
						"onUpdate:modelValue": (t) => ht(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					h("td", null, [h("div", Ne, [
						G(e.name) ? (v(), f(i, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: U.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => ft(e)
						}, {
							default: S(() => [...n[23] ||= [g(" Update ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])) : p("", !0),
						_(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Configure ${e.name}`,
							onClick: (t) => Tt(e)
						}, {
							default: S(() => [...n[24] ||= [g(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						_(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => q.value = e
						}, {
							default: S(() => [...n[25] ||= [g(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : p("", !0),
			D.value && !E.value ? (v(), f(c, {
				key: 4,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: D.value
			}, {
				actions: S(() => [_(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: O
				}, {
					default: S(() => [...n[29] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : p("", !0),
			_(s, {
				modelValue: N.value,
				"onUpdate:modelValue": n[2] ||= (e) => N.value = e,
				title: "Install from URL",
				onClose: Qe
			}, {
				footer: S(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: Qe
				}, {
					default: S(() => [...n[32] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "solid",
					size: "sm",
					loading: Ye.value,
					onClick: et
				}, {
					default: S(() => [...n[33] ||= [g("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [h("form", {
					class: "admin-plugins__form",
					onSubmit: fe(et, ["prevent"])
				}, [h("label", Pe, [
					n[30] ||= h("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					de(h("input", {
						"onUpdate:modelValue": n[1] ||= (e) => P.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[ue, P.value]]),
					n[31] ||= h("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(s, {
				modelValue: L.value,
				"onUpdate:modelValue": n[4] ||= (e) => L.value = e,
				title: "Add catalog",
				onClose: it
			}, {
				footer: S(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: it
				}, {
					default: S(() => [...n[36] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "solid",
					size: "sm",
					loading: nt.value,
					onClick: at
				}, {
					default: S(() => [...n[37] ||= [g("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [h("form", {
					class: "admin-plugins__form",
					onSubmit: fe(at, ["prevent"])
				}, [h("label", Fe, [
					n[34] ||= h("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					de(h("input", {
						"onUpdate:modelValue": n[3] ||= (e) => R.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[ue, R.value]]),
					n[35] ||= h("span", { class: "admin-plugins__hint" }, [
						g(" A repository (or direct "),
						h("code", null, "plugins.json"),
						g(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(s, {
				"model-value": q.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => q.value = null
			}, {
				footer: S(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => q.value = null
				}, {
					default: S(() => [...n[40] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(i, {
					variant: "solid",
					size: "sm",
					onClick: gt
				}, {
					default: S(() => [...n[41] ||= [g("Uninstall", -1)]]),
					_: 1
				})]),
				default: S(() => [h("p", null, [
					n[38] ||= g(" Uninstall ", -1),
					h("strong", null, x(q.value?.name), 1),
					n[39] ||= g("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(s, {
				"model-value": J.value !== null,
				title: yt.value,
				size: "lg",
				"onUpdate:modelValue": $
			}, {
				footer: S(() => [_(i, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: S(() => [...n[42] ||= [g("Cancel", -1)]]),
					_: 1
				}), xt.value ? (v(), f(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: vt.value,
					onClick: Dt
				}, {
					default: S(() => [...n[43] ||= [g(" Save ", -1)]]),
					_: 1
				}, 8, ["loading"])) : p("", !0)]),
				default: S(() => [_t.value ? (v(), m("div", Ie, [_(ne, {
					variant: "text",
					lines: 4
				})])) : (v(), m(u, { key: 1 }, [xt.value ? (v(), m("form", {
					key: 1,
					class: "admin-plugins__form",
					onSubmit: fe(Dt, ["prevent"])
				}, [(v(!0), m(u, null, b(bt.value, ([e, t]) => (v(), m("div", {
					key: e,
					class: "admin-plugins__field"
				}, [
					t.type === "bool" || t.type === "boolean" ? (v(), f(o, {
						key: 0,
						"model-value": X.value[e] === !0,
						label: t.label || e,
						"onUpdate:modelValue": (t) => X.value[e] = t
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					])) : (v(), m(u, { key: 1 }, [h("span", Le, [g(x(t.label || e) + " ", 1), t.required ? (v(), m("span", Re, "*")) : p("", !0)]), de(h("input", {
						"onUpdate:modelValue": (t) => X.value[e] = t,
						type: t.secret ? "password" : St(t),
						class: se(["admin-plugins__input", { "is-invalid": Q.value[e] }]),
						autocomplete: t.secret ? "new-password" : "off",
						placeholder: t.secret ? "Leave unchanged to keep the current value" : void 0,
						"aria-label": t.label || e,
						"aria-invalid": Q.value[e] ? "true" : void 0
					}, null, 10, ze), [[le, X.value[e]]])], 64)),
					t.description ? (v(), m("span", Be, x(t.description), 1)) : p("", !0),
					Q.value[e] ? (v(), m("span", Ve, x(Q.value[e]), 1)) : p("", !0)
				]))), 128))], 32)) : (v(), f(c, {
					key: 0,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))], 64))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-b17e4ac6"]]);
//#endregion
export { C as default };

//# sourceMappingURL=PluginsPage-D1XER7BI.js.map