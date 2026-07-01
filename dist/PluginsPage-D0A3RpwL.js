import { n as e, t } from "./Icon-24ngwBUH.js";
import { c as n, f as r, t as ee } from "./client-fw74f3l_.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-CInT03Lp.js";
import { t as a } from "./Badge-DnDrMVUo.js";
import { t as o } from "./Switch-D-Y4B9p8.js";
import { t as s } from "./Modal-Cf28TADR.js";
import { t as ne } from "./Skeleton-BUq2D39t.js";
import { t as re } from "./EmptyState-0XgHKEGf.js";
import { t as ie } from "./PageHint-DR8OWfto.js";
import { i as ae, r as oe, t as se } from "./plugins-jAHdgJSw.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as ce, inject as le, normalizeClass as ue, onMounted as de, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelDynamic as fe, vModelText as pe, withCtx as b, withDirectives as x, withModifiers as me } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var he = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, ge = { class: "admin-plugins__head" }, _e = { class: "admin-plugins__head-actions" }, ve = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, ye = ["href"], be = [
	"disabled",
	"aria-label",
	"onClick"
], xe = {
	key: 0,
	class: "admin-plugins__install-error",
	role: "alert"
}, Se = { class: "admin-plugins__install-error-body" }, Ce = {
	key: 1,
	class: "admin-plugins__skel"
}, we = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Te = { class: "admin-plugins__card-head" }, Ee = { class: "admin-plugins__card-title" }, De = { class: "admin-plugins__card-badges" }, Oe = {
	key: 0,
	class: "admin-plugins__card-summary"
}, ke = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Ae = { class: "admin-plugins__card-actions" }, je = ["href"], Me = {
	key: 3,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Ne = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Pe = { class: "admin-plugins__mono" }, Fe = { class: "admin-plugins__actions" }, Ie = { class: "admin-plugins__field" }, Le = { class: "admin-plugins__field" }, Re = {
	key: 0,
	class: "admin-plugins__skel"
}, ze = { class: "admin-plugins__label" }, Be = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true"
}, Ve = [
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"aria-label",
	"aria-invalid"
], He = {
	key: 2,
	class: "admin-plugins__hint"
}, Ue = {
	key: 3,
	class: "admin-plugins__error",
	role: "alert"
}, S = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let ce = e, S = le("apiBase", ""), We = l(() => typeof S == "string" ? S : S?.value ?? ""), C = new se(ce.client ?? new ee({
			baseUrl: We.value,
			tokenStore: new n()
		})), w = te(), Ge = _([]), T = _(!0), E = _(null);
		async function Ke() {
			T.value = !0, E.value = null;
			try {
				Ge.value = await C.list();
			} catch (e) {
				E.value = r(e, "Failed to load plugins."), w.error(E.value);
			} finally {
				T.value = !1;
			}
		}
		let D = _({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), qe = _(!0);
		async function O() {
			qe.value = !0;
			try {
				D.value = await C.catalog();
			} catch (e) {
				w.error(r(e, "Failed to load the plugin catalog."));
			} finally {
				qe.value = !1;
			}
		}
		async function k() {
			await Promise.all([Ke(), O()]);
		}
		let Je = l(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of D.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), Ye = l(() => new Set(Je.value.map((e) => e.name))), Xe = l(() => Ge.value.filter((e) => !Ye.value.has(e.name)));
		function Ze(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function A(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let j = _(!1), M = _(""), N = _(!1);
		function Qe(e) {
			switch (oe(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return r(e, "Install failed — the plugin could not be downloaded or read.");
				default: return r(e, "Failed to install plugin.");
			}
		}
		function $e() {
			M.value = "", j.value = !0;
		}
		function P() {
			j.value = !1, M.value = "";
		}
		let F = _(null);
		function et(e) {
			let t = Qe(e);
			F.value = t, w.error(t);
		}
		async function tt() {
			let e = M.value.trim();
			if (!e) {
				w.error("A plugin URL is required.");
				return;
			}
			N.value = !0, F.value = null;
			try {
				await C.install(e), w.success("Plugin installed."), P(), await k();
			} catch (e) {
				et(e);
			} finally {
				N.value = !1;
			}
		}
		let I = _(null);
		async function nt(e) {
			if (I.value === null) {
				I.value = e.repo, F.value = null;
				try {
					await C.install(e.repo), w.success(`${e.title} installed.`), await k();
				} catch (e) {
					et(e);
				} finally {
					I.value = null;
				}
			}
		}
		let L = _(!1), R = _(""), rt = _(!1), z = _(null);
		function it() {
			R.value = "", L.value = !0;
		}
		function at() {
			L.value = !1, R.value = "";
		}
		async function ot() {
			let e = R.value.trim();
			if (!e) {
				w.error("A catalog URL is required.");
				return;
			}
			rt.value = !0;
			try {
				await C.addCatalogSource(e), w.success("Catalog added."), at(), await O();
			} catch (e) {
				let t = oe(e);
				w.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : r(e, "Failed to add catalog."));
			} finally {
				rt.value = !1;
			}
		}
		async function st(e) {
			if (z.value === null) {
				z.value = e;
				try {
					await C.removeCatalogSource(e), w.success("Catalog removed."), await O();
				} catch (e) {
					w.error(r(e, "Failed to remove catalog."));
				} finally {
					z.value = null;
				}
			}
		}
		let B = _({}), V = _(!1), H = _(!1), U = _(null), W = _(!1), ct = l(() => Object.values(B.value).filter((e) => e.update_available).length);
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
					let e = await C.checkUpdates();
					lt(e.updates), W.value = e.auto_update;
					let t = ct.value;
					w.success(t > 0 ? `${t} update${t === 1 ? "" : "s"} available.` : "All plugins are up to date.");
				} catch (e) {
					w.error(r(e, "Failed to check for updates."));
				} finally {
					V.value = !1;
				}
			}
		}
		function ft(e) {
			switch (oe(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return r(e, "Update failed — the new version could not be downloaded or read.");
				default: return r(e, "Failed to update plugin.");
			}
		}
		async function pt(e) {
			if (U.value === null) {
				U.value = e.name;
				try {
					await C.updatePlugin(e.name), w.success(`${e.name} updated.`), ut(e.name), await k();
				} catch (e) {
					w.error(ft(e));
				} finally {
					U.value = null;
				}
			}
		}
		async function mt() {
			if (!H.value) {
				H.value = !0;
				try {
					let e = await C.updateAll();
					e.failed.length > 0 ? w.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : w.success(`${e.updated.length} plugin${e.updated.length === 1 ? "" : "s"} updated.`), await k();
					let t = await C.checkUpdates();
					lt(t.updates), W.value = t.auto_update;
				} catch (e) {
					w.error(r(e, "Failed to apply updates."));
				} finally {
					H.value = !1;
				}
			}
		}
		async function ht(e) {
			let t = W.value;
			W.value = e;
			try {
				W.value = await C.setAutoUpdate(e), w.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				W.value = t, w.error(r(e, "Failed to change auto-update."));
			}
		}
		let K = _(null);
		async function gt(e, t) {
			if (K.value === null) {
				K.value = e.name;
				try {
					t ? (await C.enable(e.name), w.success(`${e.name} enabled.`)) : (await C.disable(e.name), w.success(`${e.name} disabled.`)), await k();
				} catch (e) {
					w.error(r(e, "Failed to update plugin."));
				} finally {
					K.value = null;
				}
			}
		}
		let q = _(null);
		async function _t() {
			let e = q.value;
			if (e) try {
				await C.uninstall(e.name), w.success(`${e.name} uninstalled.`), q.value = null, await k();
			} catch (e) {
				w.error(r(e, "Failed to uninstall plugin.")), q.value = null;
			}
		}
		let J = _(null), Y = _(null), vt = _(!1), yt = _(!1), X = _({}), Z = _({}), Q = _({}), bt = l(() => J.value ? `Configure — ${J.value.name}` : "Configure plugin"), xt = l(() => Y.value ? Object.entries(Y.value.settings_schema) : []), St = l(() => xt.value.length > 0);
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
				let t = await C.get(e.name);
				Y.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = Tt(r, t.settings[e]);
				X.value = n, Z.value = { ...n };
			} catch (e) {
				w.error(r(e, "Failed to load plugin settings.")), J.value = null;
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
				w.success("No changes to save."), $();
				return;
			}
			yt.value = !0;
			try {
				await C.updateSettings(e.name, t), w.success("Settings saved."), $(), await k();
			} catch (e) {
				let t = ae(e);
				Object.keys(t).length > 0 ? (Q.value = t, w.error("Some settings could not be saved — check the highlighted fields.")) : w.error(r(e, "Failed to save settings."));
			} finally {
				yt.value = !1;
			}
		}
		async function kt() {
			try {
				W.value = await C.getAutoUpdate();
			} catch {}
		}
		return de(() => {
			Ke(), O(), kt();
		}), (e, n) => (g(), f("section", he, [
			p("header", ge, [n[11] ||= p("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), p("div", _e, [
				h(o, {
					"model-value": W.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": ht
				}, null, 8, ["model-value"]),
				n[10] ||= p("span", { class: "admin-plugins__head-spacer" }, null, -1),
				h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: V.value,
					onClick: dt
				}, {
					default: b(() => [...n[7] ||= [m(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				ct.value > 0 ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: H.value,
					onClick: mt
				}, {
					default: b(() => [m(" Update all (" + y(ct.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : d("", !0),
				h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: it
				}, {
					default: b(() => [...n[8] ||= [m("Add catalog", -1)]]),
					_: 1
				}),
				h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: $e
				}, {
					default: b(() => [...n[9] ||= [m("Install from URL", -1)]]),
					_: 1
				})
			])]),
			h(ie, null, {
				default: b(() => [...n[12] ||= [
					m(" Extend Phlix with add-ons from the plugin catalog. On each catalog plugin, toggle its switch to ", -1),
					p("strong", null, "enable/disable", -1),
					m(" it, ", -1),
					p("strong", null, "Install", -1),
					m(" or ", -1),
					p("strong", null, "Uninstall", -1),
					m(" it, ", -1),
					p("strong", null, "Configure", -1),
					m(" its settings, or ", -1),
					p("strong", null, "Update", -1),
					m(" when a new version is out. Up top, ", -1),
					p("strong", null, "Check for updates", -1),
					m(" refreshes availability, ", -1),
					p("strong", null, "Update all", -1),
					m(" upgrades everything at once, ", -1),
					p("strong", null, "Auto-update", -1),
					m(" keeps plugins current automatically, and ", -1),
					p("strong", null, "Add catalog", -1),
					m(" / ", -1),
					p("strong", null, "Install from URL", -1),
					m(" pull in sources or plugins from outside the default catalog. ", -1)
				]]),
				_: 1
			}),
			p("div", ve, [n[13] ||= p("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (g(!0), f(c, null, v(D.value.sources, (e) => (g(), u(a, {
				key: e,
				tone: "neutral"
			}, {
				default: b(() => [p("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, y(Ze(e)), 9, ye), e === D.value.default_source ? d("", !0) : (g(), f("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: z.value === e,
					"aria-label": `Remove catalog ${Ze(e)}`,
					onClick: (t) => st(e)
				}, " × ", 8, be))]),
				_: 2
			}, 1024))), 128))]),
			F.value ? (g(), f("div", xe, [
				h(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				p("div", Se, [n[14] ||= p("strong", null, "Couldn't install the plugin.", -1), p("span", null, y(F.value), 1)]),
				p("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => F.value = null
				}, " × ")
			])) : d("", !0),
			qe.value ? (g(), f("div", Ce, [h(ne, {
				variant: "text",
				lines: 5
			})])) : (g(), f(c, { key: 2 }, [(g(!0), f(c, null, v(D.value.errors, (e) => (g(), f("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[15] ||= m(" Couldn't load catalog ", -1),
				p("strong", null, y(Ze(e.source)), 1),
				m(" — " + y(e.error), 1)
			]))), 128)), Je.value.length === 0 && D.value.errors.length === 0 ? (g(), u(re, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: $e
				}, {
					default: b(() => [...n[16] ||= [m("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), f("ul", we, [(g(!0), f(c, null, v(Je.value, (e) => (g(), f("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				p("div", Te, [p("h3", Ee, y(e.title), 1), p("div", De, [
					e.type ? (g(), u(a, {
						key: 0,
						tone: "info"
					}, {
						default: b(() => [m(y(e.type), 1)]),
						_: 2
					}, 1024)) : d("", !0),
					e.installed ? (g(), u(a, {
						key: 1,
						tone: "success"
					}, {
						default: b(() => [...n[17] ||= [m("Installed", -1)]]),
						_: 1
					})) : d("", !0),
					G(e.name) ? (g(), u(a, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [m(" Update → v" + y(G(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : d("", !0)
				])]),
				e.summary || e.description ? (g(), f("p", Oe, y(e.summary || e.description), 1)) : d("", !0),
				e.tags.length ? (g(), f("div", ke, [(g(!0), f(c, null, v(e.tags, (e) => (g(), f("span", {
					key: e,
					class: "admin-plugins__tag"
				}, y(e), 1))), 128))])) : d("", !0),
				p("div", Ae, [e.installed ? (g(), f(c, { key: 0 }, [
					h(o, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: K.value === e.name,
						"onUpdate:modelValue": (t) => gt(A(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[21] ||= p("span", { class: "admin-plugins__card-spacer" }, null, -1),
					G(e.name) ? (g(), u(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: U.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => pt(A(e))
					}, {
						default: b(() => [...n[18] ||= [m(" Update ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])) : d("", !0),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => Et(A(e))
					}, {
						default: b(() => [...n[19] ||= [m(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => q.value = A(e)
					}, {
						default: b(() => [...n[20] ||= [m(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (g(), f(c, { key: 1 }, [
					h(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: I.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => nt(e)
					}, {
						default: b(() => [...n[22] ||= [m(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					n[23] ||= p("span", { class: "admin-plugins__card-spacer" }, null, -1),
					p("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, je)
				], 64))])
			]))), 128))]))], 64)),
			Xe.value.length ? (g(), f("section", Me, [
				n[28] ||= p("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[29] ||= p("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				p("table", Ne, [n[27] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Name"),
					p("th", { scope: "col" }, "Version"),
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Enabled"),
					p("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), p("tbody", null, [(g(!0), f(c, null, v(Xe.value, (e) => (g(), f("tr", { key: e.name }, [
					p("td", null, y(e.name), 1),
					p("td", Pe, [m(y(e.version) + " ", 1), G(e.name) ? (g(), u(a, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [m(" → v" + y(G(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : d("", !0)]),
					p("td", null, [h(a, { tone: "info" }, {
						default: b(() => [m(y(e.type), 1)]),
						_: 2
					}, 1024)]),
					p("td", null, [h(o, {
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
					p("td", null, [p("div", Fe, [
						G(e.name) ? (g(), u(i, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: U.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => pt(e)
						}, {
							default: b(() => [...n[24] ||= [m(" Update ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])) : d("", !0),
						h(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Configure ${e.name}`,
							onClick: (t) => Et(e)
						}, {
							default: b(() => [...n[25] ||= [m(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						h(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => q.value = e
						}, {
							default: b(() => [...n[26] ||= [m(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : d("", !0),
			E.value && !T.value ? (g(), u(re, {
				key: 4,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: E.value
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Ke
				}, {
					default: b(() => [...n[30] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : d("", !0),
			h(s, {
				modelValue: j.value,
				"onUpdate:modelValue": n[2] ||= (e) => j.value = e,
				title: "Install from URL",
				onClose: P
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: P
				}, {
					default: b(() => [...n[33] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: N.value,
					onClick: tt
				}, {
					default: b(() => [...n[34] ||= [m("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: me(tt, ["prevent"])
				}, [p("label", Ie, [
					n[31] ||= p("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					x(p("input", {
						"onUpdate:modelValue": n[1] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[pe, M.value]]),
					n[32] ||= p("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(s, {
				modelValue: L.value,
				"onUpdate:modelValue": n[4] ||= (e) => L.value = e,
				title: "Add catalog",
				onClose: at
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: at
				}, {
					default: b(() => [...n[37] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: rt.value,
					onClick: ot
				}, {
					default: b(() => [...n[38] ||= [m("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: me(ot, ["prevent"])
				}, [p("label", Le, [
					n[35] ||= p("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					x(p("input", {
						"onUpdate:modelValue": n[3] ||= (e) => R.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[pe, R.value]]),
					n[36] ||= p("span", { class: "admin-plugins__hint" }, [
						m(" A repository (or direct "),
						p("code", null, "plugins.json"),
						m(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(s, {
				"model-value": q.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => q.value = null
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => q.value = null
				}, {
					default: b(() => [...n[41] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: _t
				}, {
					default: b(() => [...n[42] ||= [m("Uninstall", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					n[39] ||= m(" Uninstall ", -1),
					p("strong", null, y(q.value?.name), 1),
					n[40] ||= m("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(s, {
				"model-value": J.value !== null,
				title: bt.value,
				size: "lg",
				"onUpdate:modelValue": $
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: b(() => [...n[43] ||= [m("Cancel", -1)]]),
					_: 1
				}), St.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: yt.value,
					onClick: Ot
				}, {
					default: b(() => [...n[44] ||= [m(" Save ", -1)]]),
					_: 1
				}, 8, ["loading"])) : d("", !0)]),
				default: b(() => [vt.value ? (g(), f("div", Re, [h(ne, {
					variant: "text",
					lines: 4
				})])) : (g(), f(c, { key: 1 }, [St.value ? (g(), f("form", {
					key: 1,
					class: "admin-plugins__form",
					onSubmit: me(Ot, ["prevent"])
				}, [(g(!0), f(c, null, v(xt.value, ([e, t]) => (g(), f("div", {
					key: e,
					class: "admin-plugins__field"
				}, [
					t.type === "bool" || t.type === "boolean" ? (g(), u(o, {
						key: 0,
						"model-value": X.value[e] === !0,
						label: t.label || e,
						"onUpdate:modelValue": (t) => X.value[e] = t
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					])) : (g(), f(c, { key: 1 }, [p("span", ze, [m(y(t.label || e) + " ", 1), t.required ? (g(), f("span", Be, "*")) : d("", !0)]), x(p("input", {
						"onUpdate:modelValue": (t) => X.value[e] = t,
						type: t.secret ? "password" : Ct(t),
						class: ue(["admin-plugins__input", { "is-invalid": Q.value[e] }]),
						autocomplete: t.secret ? "new-password" : "off",
						placeholder: t.secret ? "Leave unchanged to keep the current value" : void 0,
						"aria-label": t.label || e,
						"aria-invalid": Q.value[e] ? "true" : void 0
					}, null, 10, Ve), [[fe, X.value[e]]])], 64)),
					t.description ? (g(), f("span", He, y(t.description), 1)) : d("", !0),
					Q.value[e] ? (g(), f("span", Ue, y(Q.value[e]), 1)) : d("", !0)
				]))), 128))], 32)) : (g(), u(re, {
					key: 0,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))], 64))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-c24ae1fd"]]);
//#endregion
export { S as default };

//# sourceMappingURL=PluginsPage-D0A3RpwL.js.map