import { n as e, t } from "./Icon-Bd1lZf6E.js";
import { t as n } from "./Modal-BXA8fOR4.js";
import { c as r, f as i, t as ee } from "./client-DH50wjeq.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CnyfCnhY.js";
import { t as o } from "./Badge-Dq-pYhrz.js";
import { t as s } from "./Switch-B9lejr6_.js";
import { t as ne } from "./Skeleton-CzU_l53W.js";
import { t as c } from "./EmptyState-588Z_81C.js";
import { t as re } from "./PageHint-7Giwob0l.js";
import { i as ie, r as l, t as ae } from "./plugins-BQfgYg2E.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as oe, inject as se, normalizeClass as ce, onMounted as le, openBlock as v, ref as y, renderList as b, toDisplayString as x, vModelDynamic as ue, vModelText as de, withCtx as S, withDirectives as fe, withModifiers as pe } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var me = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, he = { class: "admin-plugins__head" }, ge = { class: "admin-plugins__head-actions" }, _e = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, ve = ["href"], ye = [
	"disabled",
	"aria-label",
	"onClick"
], be = {
	key: 0,
	class: "admin-plugins__install-error",
	role: "alert"
}, xe = { class: "admin-plugins__install-error-body" }, Se = {
	key: 1,
	class: "admin-plugins__skel"
}, Ce = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, we = { class: "admin-plugins__card-head" }, Te = { class: "admin-plugins__card-title" }, Ee = { class: "admin-plugins__card-badges" }, De = {
	key: 0,
	class: "admin-plugins__card-summary"
}, Oe = {
	key: 1,
	class: "admin-plugins__card-tags"
}, ke = { class: "admin-plugins__card-actions" }, Ae = ["href"], je = {
	key: 3,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Me = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Ne = { class: "admin-plugins__mono" }, Pe = { class: "admin-plugins__actions" }, Fe = { class: "admin-plugins__field" }, Ie = { class: "admin-plugins__field" }, Le = {
	key: 0,
	class: "admin-plugins__skel"
}, Re = { class: "admin-plugins__label" }, ze = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true"
}, Be = [
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"aria-label",
	"aria-invalid"
], Ve = {
	key: 2,
	class: "admin-plugins__hint"
}, He = {
	key: 3,
	class: "admin-plugins__error",
	role: "alert"
}, C = /*#__PURE__*/ e(/* @__PURE__ */ oe({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let oe = e, C = se("apiBase", ""), Ue = d(() => typeof C == "string" ? C : C?.value ?? ""), w = new ae(oe.client ?? new ee({
			baseUrl: Ue.value,
			tokenStore: new r()
		})), T = te(), We = y([]), E = y(!0), D = y(null);
		async function O() {
			E.value = !0, D.value = null;
			try {
				We.value = await w.list();
			} catch (e) {
				D.value = i(e, "Failed to load plugins."), T.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let k = y({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), Ge = y(!0);
		async function A() {
			Ge.value = !0;
			try {
				k.value = await w.catalog();
			} catch (e) {
				T.error(i(e, "Failed to load the plugin catalog."));
			} finally {
				Ge.value = !1;
			}
		}
		async function j() {
			await Promise.all([O(), A()]);
		}
		let Ke = d(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of k.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), qe = d(() => new Set(Ke.value.map((e) => e.name))), Je = d(() => We.value.filter((e) => !qe.value.has(e.name)));
		function Ye(e) {
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
		let N = y(!1), P = y(""), Xe = y(!1);
		function Ze(e) {
			switch (l(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return i(e, "Install failed — the plugin could not be downloaded or read.");
				default: return i(e, "Failed to install plugin.");
			}
		}
		function Qe() {
			P.value = "", N.value = !0;
		}
		function $e() {
			N.value = !1, P.value = "";
		}
		let F = y(null);
		function et(e) {
			let t = Ze(e);
			F.value = t, T.error(t);
		}
		async function tt() {
			let e = P.value.trim();
			if (!e) {
				T.error("A plugin URL is required.");
				return;
			}
			Xe.value = !0, F.value = null;
			try {
				await w.install(e), T.success("Plugin installed."), $e(), await j();
			} catch (e) {
				et(e);
			} finally {
				Xe.value = !1;
			}
		}
		let I = y(null);
		async function nt(e) {
			if (I.value === null) {
				I.value = e.repo, F.value = null;
				try {
					await w.install(e.repo), T.success(`${e.title} installed.`), await j();
				} catch (e) {
					et(e);
				} finally {
					I.value = null;
				}
			}
		}
		let L = y(!1), R = y(""), rt = y(!1), z = y(null);
		function it() {
			R.value = "", L.value = !0;
		}
		function at() {
			L.value = !1, R.value = "";
		}
		async function ot() {
			let e = R.value.trim();
			if (!e) {
				T.error("A catalog URL is required.");
				return;
			}
			rt.value = !0;
			try {
				await w.addCatalogSource(e), T.success("Catalog added."), at(), await A();
			} catch (e) {
				let t = l(e);
				T.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : i(e, "Failed to add catalog."));
			} finally {
				rt.value = !1;
			}
		}
		async function st(e) {
			if (z.value === null) {
				z.value = e;
				try {
					await w.removeCatalogSource(e), T.success("Catalog removed."), await A();
				} catch (e) {
					T.error(i(e, "Failed to remove catalog."));
				} finally {
					z.value = null;
				}
			}
		}
		let B = y({}), V = y(!1), H = y(!1), U = y(null), W = y(!1), ct = d(() => Object.values(B.value).filter((e) => e.update_available).length);
		function G(e) {
			let t = B.value[e];
			return t && t.update_available ? t : null;
		}
		function lt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			B.value = t;
		}
		function ut(e) {
			if (e in B.value) {
				let t = { ...B.value };
				delete t[e], B.value = t;
			}
		}
		async function dt() {
			if (!V.value) {
				V.value = !0;
				try {
					let e = await w.checkUpdates();
					lt(e.updates), W.value = e.auto_update;
					let t = ct.value;
					T.success(t > 0 ? `${t} update${t === 1 ? "" : "s"} available.` : "All plugins are up to date.");
				} catch (e) {
					T.error(i(e, "Failed to check for updates."));
				} finally {
					V.value = !1;
				}
			}
		}
		function ft(e) {
			switch (l(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return i(e, "Update failed — the new version could not be downloaded or read.");
				default: return i(e, "Failed to update plugin.");
			}
		}
		async function pt(e) {
			if (U.value === null) {
				U.value = e.name;
				try {
					await w.updatePlugin(e.name), T.success(`${e.name} updated.`), ut(e.name), await j();
				} catch (e) {
					T.error(ft(e));
				} finally {
					U.value = null;
				}
			}
		}
		async function mt() {
			if (!H.value) {
				H.value = !0;
				try {
					let e = await w.updateAll();
					e.failed.length > 0 ? T.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : T.success(`${e.updated.length} plugin${e.updated.length === 1 ? "" : "s"} updated.`), await j();
					let t = await w.checkUpdates();
					lt(t.updates), W.value = t.auto_update;
				} catch (e) {
					T.error(i(e, "Failed to apply updates."));
				} finally {
					H.value = !1;
				}
			}
		}
		async function ht(e) {
			let t = W.value;
			W.value = e;
			try {
				W.value = await w.setAutoUpdate(e), T.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				W.value = t, T.error(i(e, "Failed to change auto-update."));
			}
		}
		let K = y(null);
		async function gt(e, t) {
			if (K.value === null) {
				K.value = e.name;
				try {
					t ? (await w.enable(e.name), T.success(`${e.name} enabled.`)) : (await w.disable(e.name), T.success(`${e.name} disabled.`)), await j();
				} catch (e) {
					T.error(i(e, "Failed to update plugin."));
				} finally {
					K.value = null;
				}
			}
		}
		let q = y(null);
		async function _t() {
			let e = q.value;
			if (e) try {
				await w.uninstall(e.name), T.success(`${e.name} uninstalled.`), q.value = null, await j();
			} catch (e) {
				T.error(i(e, "Failed to uninstall plugin.")), q.value = null;
			}
		}
		let J = y(null), Y = y(null), vt = y(!1), yt = y(!1), X = y({}), Z = y({}), Q = y({}), bt = d(() => J.value ? `Configure — ${J.value.name}` : "Configure plugin"), xt = d(() => Y.value ? Object.entries(Y.value.settings_schema) : []), St = d(() => xt.value.length > 0);
		function Ct(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function wt(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function Tt(e, t) {
			return wt(e) ? t === !0 || t === 1 || t === "1" || t === "true" : e.secret ? t == null ? "" : String(t) : t ?? (e.default === void 0 ? "" : e.default);
		}
		async function Et(e) {
			J.value = e, Y.value = null, X.value = {}, Z.value = {}, Q.value = {}, vt.value = !0;
			try {
				let t = await w.get(e.name);
				Y.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = Tt(r, t.settings[e]);
				X.value = n, Z.value = { ...n };
			} catch (e) {
				T.error(i(e, "Failed to load plugin settings.")), J.value = null;
			} finally {
				vt.value = !1;
			}
		}
		function $() {
			J.value = null, Y.value = null, X.value = {}, Z.value = {}, Q.value = {};
		}
		function Dt() {
			let e = {};
			if (!Y.value) return e;
			for (let [t, n] of Object.entries(Y.value.settings_schema)) {
				let r = X.value[t];
				r !== Z.value[t] && (n.secret && r === "***" || (wt(n) ? e[t] = r === !0 : Ct(n) === "number" ? e[t] = r === "" || r === null ? r : Number(r) : e[t] = r));
			}
			return e;
		}
		async function Ot() {
			let e = J.value;
			if (!e) return;
			Q.value = {};
			let t = Dt();
			if (Object.keys(t).length === 0) {
				T.success("No changes to save."), $();
				return;
			}
			yt.value = !0;
			try {
				await w.updateSettings(e.name, t), T.success("Settings saved."), $(), await j();
			} catch (e) {
				let t = ie(e);
				Object.keys(t).length > 0 ? (Q.value = t, T.error("Some settings could not be saved — check the highlighted fields.")) : T.error(i(e, "Failed to save settings."));
			} finally {
				yt.value = !1;
			}
		}
		async function kt() {
			try {
				W.value = await w.getAutoUpdate();
			} catch {}
		}
		return le(() => {
			O(), A(), kt();
		}), (e, r) => (v(), m("section", me, [
			h("header", he, [r[11] ||= h("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), h("div", ge, [
				_(s, {
					"model-value": W.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": ht
				}, null, 8, ["model-value"]),
				r[10] ||= h("span", { class: "admin-plugins__head-spacer" }, null, -1),
				_(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: V.value,
					onClick: dt
				}, {
					default: S(() => [...r[7] ||= [g(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				ct.value > 0 ? (v(), f(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: H.value,
					onClick: mt
				}, {
					default: S(() => [g(" Update all (" + x(ct.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : p("", !0),
				_(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: it
				}, {
					default: S(() => [...r[8] ||= [g("Add catalog", -1)]]),
					_: 1
				}),
				_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Qe
				}, {
					default: S(() => [...r[9] ||= [g("Install from URL", -1)]]),
					_: 1
				})
			])]),
			_(re, null, {
				default: S(() => [...r[12] ||= [
					g(" Extend Phlix with add-ons from the plugin catalog. On each catalog plugin, toggle its switch to ", -1),
					h("strong", null, "enable/disable", -1),
					g(" it, ", -1),
					h("strong", null, "Install", -1),
					g(" or ", -1),
					h("strong", null, "Uninstall", -1),
					g(" it, ", -1),
					h("strong", null, "Configure", -1),
					g(" its settings, or ", -1),
					h("strong", null, "Update", -1),
					g(" when a new version is out. Up top, ", -1),
					h("strong", null, "Check for updates", -1),
					g(" refreshes availability, ", -1),
					h("strong", null, "Update all", -1),
					g(" upgrades everything at once, ", -1),
					h("strong", null, "Auto-update", -1),
					g(" keeps plugins current automatically, and ", -1),
					h("strong", null, "Add catalog", -1),
					g(" / ", -1),
					h("strong", null, "Install from URL", -1),
					g(" pull in sources or plugins from outside the default catalog. ", -1)
				]]),
				_: 1
			}),
			h("div", _e, [r[13] ||= h("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (v(!0), m(u, null, b(k.value.sources, (e) => (v(), f(o, {
				key: e,
				tone: "neutral"
			}, {
				default: S(() => [h("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, x(Ye(e)), 9, ve), e === k.value.default_source ? p("", !0) : (v(), m("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: z.value === e,
					"aria-label": `Remove catalog ${Ye(e)}`,
					onClick: (t) => st(e)
				}, " × ", 8, ye))]),
				_: 2
			}, 1024))), 128))]),
			F.value ? (v(), m("div", be, [
				_(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				h("div", xe, [r[14] ||= h("strong", null, "Couldn't install the plugin.", -1), h("span", null, x(F.value), 1)]),
				h("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: r[0] ||= (e) => F.value = null
				}, " × ")
			])) : p("", !0),
			Ge.value ? (v(), m("div", Se, [_(ne, {
				variant: "text",
				lines: 5
			})])) : (v(), m(u, { key: 2 }, [(v(!0), m(u, null, b(k.value.errors, (e) => (v(), m("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				r[15] ||= g(" Couldn't load catalog ", -1),
				h("strong", null, x(Ye(e.source)), 1),
				g(" — " + x(e.error), 1)
			]))), 128)), Ke.value.length === 0 && k.value.errors.length === 0 ? (v(), f(c, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: S(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Qe
				}, {
					default: S(() => [...r[16] ||= [g("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), m("ul", Ce, [(v(!0), m(u, null, b(Ke.value, (e) => (v(), m("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				h("div", we, [h("h3", Te, x(e.title), 1), h("div", Ee, [
					e.type ? (v(), f(o, {
						key: 0,
						tone: "info"
					}, {
						default: S(() => [g(x(e.type), 1)]),
						_: 2
					}, 1024)) : p("", !0),
					e.installed ? (v(), f(o, {
						key: 1,
						tone: "success"
					}, {
						default: S(() => [...r[17] ||= [g("Installed", -1)]]),
						_: 1
					})) : p("", !0),
					G(e.name) ? (v(), f(o, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: S(() => [g(" Update → v" + x(G(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : p("", !0)
				])]),
				e.summary || e.description ? (v(), m("p", De, x(e.summary || e.description), 1)) : p("", !0),
				e.tags.length ? (v(), m("div", Oe, [(v(!0), m(u, null, b(e.tags, (e) => (v(), m("span", {
					key: e,
					class: "admin-plugins__tag"
				}, x(e), 1))), 128))])) : p("", !0),
				h("div", ke, [e.installed ? (v(), m(u, { key: 0 }, [
					_(s, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: K.value === e.name,
						"onUpdate:modelValue": (t) => gt(M(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					r[21] ||= h("span", { class: "admin-plugins__card-spacer" }, null, -1),
					G(e.name) ? (v(), f(a, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: U.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => pt(M(e))
					}, {
						default: S(() => [...r[18] ||= [g(" Update ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])) : p("", !0),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => Et(M(e))
					}, {
						default: S(() => [...r[19] ||= [g(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => q.value = M(e)
					}, {
						default: S(() => [...r[20] ||= [g(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (v(), m(u, { key: 1 }, [
					_(a, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: I.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => nt(e)
					}, {
						default: S(() => [...r[22] ||= [g(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					r[23] ||= h("span", { class: "admin-plugins__card-spacer" }, null, -1),
					h("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, Ae)
				], 64))])
			]))), 128))]))], 64)),
			Je.value.length ? (v(), m("section", je, [
				r[28] ||= h("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				r[29] ||= h("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				h("table", Me, [r[27] ||= h("thead", null, [h("tr", null, [
					h("th", { scope: "col" }, "Name"),
					h("th", { scope: "col" }, "Version"),
					h("th", { scope: "col" }, "Type"),
					h("th", { scope: "col" }, "Enabled"),
					h("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), h("tbody", null, [(v(!0), m(u, null, b(Je.value, (e) => (v(), m("tr", { key: e.name }, [
					h("td", null, x(e.name), 1),
					h("td", Ne, [g(x(e.version) + " ", 1), G(e.name) ? (v(), f(o, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: S(() => [g(" → v" + x(G(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : p("", !0)]),
					h("td", null, [_(o, { tone: "info" }, {
						default: S(() => [g(x(e.type), 1)]),
						_: 2
					}, 1024)]),
					h("td", null, [_(s, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: K.value === e.name,
						"onUpdate:modelValue": (t) => gt(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					h("td", null, [h("div", Pe, [
						G(e.name) ? (v(), f(a, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: U.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => pt(e)
						}, {
							default: S(() => [...r[24] ||= [g(" Update ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])) : p("", !0),
						_(a, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Configure ${e.name}`,
							onClick: (t) => Et(e)
						}, {
							default: S(() => [...r[25] ||= [g(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						_(a, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => q.value = e
						}, {
							default: S(() => [...r[26] ||= [g(" Uninstall ", -1)]]),
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
				actions: S(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: O
				}, {
					default: S(() => [...r[30] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : p("", !0),
			_(n, {
				modelValue: N.value,
				"onUpdate:modelValue": r[2] ||= (e) => N.value = e,
				title: "Install from URL",
				onClose: $e
			}, {
				footer: S(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: $e
				}, {
					default: S(() => [...r[33] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					loading: Xe.value,
					onClick: tt
				}, {
					default: S(() => [...r[34] ||= [g("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [h("form", {
					class: "admin-plugins__form",
					onSubmit: pe(tt, ["prevent"])
				}, [h("label", Fe, [
					r[31] ||= h("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					fe(h("input", {
						"onUpdate:modelValue": r[1] ||= (e) => P.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[de, P.value]]),
					r[32] ||= h("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(n, {
				modelValue: L.value,
				"onUpdate:modelValue": r[4] ||= (e) => L.value = e,
				title: "Add catalog",
				onClose: at
			}, {
				footer: S(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: at
				}, {
					default: S(() => [...r[37] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					loading: rt.value,
					onClick: ot
				}, {
					default: S(() => [...r[38] ||= [g("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [h("form", {
					class: "admin-plugins__form",
					onSubmit: pe(ot, ["prevent"])
				}, [h("label", Ie, [
					r[35] ||= h("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					fe(h("input", {
						"onUpdate:modelValue": r[3] ||= (e) => R.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[de, R.value]]),
					r[36] ||= h("span", { class: "admin-plugins__hint" }, [
						g(" A repository (or direct "),
						h("code", null, "plugins.json"),
						g(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(n, {
				"model-value": q.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": r[6] ||= (e) => q.value = null
			}, {
				footer: S(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[5] ||= (e) => q.value = null
				}, {
					default: S(() => [...r[41] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					onClick: _t
				}, {
					default: S(() => [...r[42] ||= [g("Uninstall", -1)]]),
					_: 1
				})]),
				default: S(() => [h("p", null, [
					r[39] ||= g(" Uninstall ", -1),
					h("strong", null, x(q.value?.name), 1),
					r[40] ||= g("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(n, {
				"model-value": J.value !== null,
				title: bt.value,
				size: "lg",
				"onUpdate:modelValue": $
			}, {
				footer: S(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: S(() => [...r[43] ||= [g("Cancel", -1)]]),
					_: 1
				}), St.value ? (v(), f(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: yt.value,
					onClick: Ot
				}, {
					default: S(() => [...r[44] ||= [g(" Save ", -1)]]),
					_: 1
				}, 8, ["loading"])) : p("", !0)]),
				default: S(() => [vt.value ? (v(), m("div", Le, [_(ne, {
					variant: "text",
					lines: 4
				})])) : (v(), m(u, { key: 1 }, [St.value ? (v(), m("form", {
					key: 1,
					class: "admin-plugins__form",
					onSubmit: pe(Ot, ["prevent"])
				}, [(v(!0), m(u, null, b(xt.value, ([e, t]) => (v(), m("div", {
					key: e,
					class: "admin-plugins__field"
				}, [
					t.type === "bool" || t.type === "boolean" ? (v(), f(s, {
						key: 0,
						"model-value": X.value[e] === !0,
						label: t.label || e,
						"onUpdate:modelValue": (t) => X.value[e] = t
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					])) : (v(), m(u, { key: 1 }, [h("span", Re, [g(x(t.label || e) + " ", 1), t.required ? (v(), m("span", ze, "*")) : p("", !0)]), fe(h("input", {
						"onUpdate:modelValue": (t) => X.value[e] = t,
						type: t.secret ? "password" : Ct(t),
						class: ce(["admin-plugins__input", { "is-invalid": Q.value[e] }]),
						autocomplete: t.secret ? "new-password" : "off",
						placeholder: t.secret ? "Leave unchanged to keep the current value" : void 0,
						"aria-label": t.label || e,
						"aria-invalid": Q.value[e] ? "true" : void 0
					}, null, 10, Be), [[ue, X.value[e]]])], 64)),
					t.description ? (v(), m("span", Ve, x(t.description), 1)) : p("", !0),
					Q.value[e] ? (v(), m("span", He, x(Q.value[e]), 1)) : p("", !0)
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
}), [["__scopeId", "data-v-fa1754a6"]]);
//#endregion
export { C as default };

//# sourceMappingURL=PluginsPage-BpwtvUR_.js.map