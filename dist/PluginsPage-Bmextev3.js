import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, l as ee, t as te } from "./client-D80As4Gx.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as re } from "./Switch-DyS2L5gX.js";
import { t as ie } from "./Modal-BgLqRZQi.js";
import { t as ae } from "./Skeleton-DhQmxeNg.js";
import { t as oe } from "./EmptyState-ZlI5t4KT.js";
import { t as se } from "./PageHint-BoAlFFBN.js";
import { t as ce } from "./HelpText-Ccbgsfz2.js";
import { i as le, r as o, t as ue } from "./plugins-BtqNdCGA.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as de, inject as fe, normalizeClass as pe, onMounted as me, openBlock as h, ref as g, renderList as _, toDisplayString as v, vModelDynamic as he, vModelText as ge, watch as _e, withCtx as y, withDirectives as ve, withModifiers as ye } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var be = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, xe = { class: "admin-plugins__head" }, Se = { class: "admin-plugins__head-actions" }, Ce = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, we = ["href"], Te = [
	"disabled",
	"aria-label",
	"onClick"
], Ee = {
	key: 0,
	class: "admin-plugins__install-error",
	role: "alert"
}, De = { class: "admin-plugins__install-error-body" }, Oe = {
	key: 1,
	class: "admin-plugins__install-error",
	role: "alert"
}, ke = { class: "admin-plugins__install-error-body" }, Ae = {
	key: 2,
	class: "admin-plugins__skel"
}, je = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Me = { class: "admin-plugins__card-head" }, Ne = { class: "admin-plugins__card-title" }, Pe = { class: "admin-plugins__card-badges" }, Fe = {
	key: 0,
	class: "admin-plugins__card-summary"
}, Ie = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Le = { class: "admin-plugins__card-actions" }, Re = ["href"], ze = {
	key: 4,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Be = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Ve = { class: "admin-plugins__mono" }, He = { class: "admin-plugins__actions" }, Ue = { class: "admin-plugins__field" }, We = { class: "admin-plugins__field" }, Ge = {
	key: 0,
	class: "admin-plugins__skel"
}, Ke = {
	key: 1,
	class: "admin-plugins__config-body",
	"aria-live": "polite"
}, qe = {
	key: 0,
	class: "admin-plugins__redirect"
}, Je = ["id"], Ye = { class: "admin-plugins__redirect-row" }, Xe = { class: "admin-plugins__redirect-value" }, Ze = {
	class: "admin-plugins__visually-hidden",
	role: "status"
}, Qe = {
	key: 0,
	class: "admin-plugins__config-error",
	role: "alert"
}, $e = ["for"], et = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true",
	title: "Required"
}, tt = {
	key: 1,
	class: "admin-plugins__optional"
}, nt = { class: "admin-plugins__secret-row" }, rt = [
	"id",
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"disabled",
	"aria-describedby",
	"aria-invalid"
], it = ["id"], at = {
	class: "admin-plugins__secret-dots",
	"aria-hidden": "true"
}, ot = {
	key: 3,
	class: "admin-plugins__hint admin-plugins__default-hint"
}, st = {
	key: 4,
	class: "admin-plugins__error",
	role: "alert"
}, ct = /*#__PURE__*/ e(/* @__PURE__ */ de({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let de = e, ct = fe("apiBase", ""), lt = c(() => typeof ct == "string" ? ct : ct?.value ?? ""), b = new ue(de.client ?? new te({
			baseUrl: lt.value,
			tokenStore: new n()
		})), x = ne(), ut = g([]), dt = g(!0), S = g(null);
		async function ft() {
			dt.value = !0, S.value = null;
			try {
				ut.value = await b.list();
			} catch (e) {
				S.value = r(e, "Failed to load plugins."), x.error(S.value);
			} finally {
				dt.value = !1;
			}
		}
		let C = g({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), pt = g(!0);
		async function w() {
			pt.value = !0;
			try {
				C.value = await b.catalog();
			} catch (e) {
				x.error(r(e, "Failed to load the plugin catalog."));
			} finally {
				pt.value = !1;
			}
		}
		async function T() {
			await Promise.all([ft(), w()]);
		}
		let mt = c(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of C.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), ht = c(() => new Set(mt.value.map((e) => e.name))), gt = c(() => ut.value.filter((e) => !ht.value.has(e.name)));
		function _t(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function E(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let D = g(!1), O = g(""), vt = g(!1);
		function yt(e) {
			switch (o(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return r(e, "Install failed — the plugin could not be downloaded or read.");
				default: return r(e, "Failed to install plugin.");
			}
		}
		function bt() {
			O.value = "", D.value = !0;
		}
		function xt() {
			D.value = !1, O.value = "";
		}
		let k = g(null);
		function St(e) {
			let t = yt(e);
			k.value = t, x.error(t);
		}
		async function Ct() {
			let e = O.value.trim();
			if (!e) {
				x.error("A plugin URL is required.");
				return;
			}
			vt.value = !0, k.value = null;
			try {
				await b.install(e), x.success("Plugin installed."), xt(), await T();
			} catch (e) {
				St(e);
			} finally {
				vt.value = !1;
			}
		}
		let A = g(null);
		async function wt(e) {
			if (A.value === null) {
				A.value = e.repo, k.value = null;
				try {
					await b.install(e.repo), x.success(`${e.title} installed.`), await T();
				} catch (e) {
					St(e);
				} finally {
					A.value = null;
				}
			}
		}
		let j = g(!1), M = g(""), Tt = g(!1), N = g(null);
		function Et() {
			M.value = "", j.value = !0;
		}
		function Dt() {
			j.value = !1, M.value = "";
		}
		async function Ot() {
			let e = M.value.trim();
			if (!e) {
				x.error("A catalog URL is required.");
				return;
			}
			Tt.value = !0;
			try {
				await b.addCatalogSource(e), x.success("Catalog added."), Dt(), await w();
			} catch (e) {
				let t = o(e);
				x.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : r(e, "Failed to add catalog."));
			} finally {
				Tt.value = !1;
			}
		}
		async function kt(e) {
			if (N.value === null) {
				N.value = e;
				try {
					await b.removeCatalogSource(e), x.success("Catalog removed."), await w();
				} catch (e) {
					x.error(r(e, "Failed to remove catalog."));
				} finally {
					N.value = null;
				}
			}
		}
		let P = g({}), F = g(!1), At = g(!1), I = g(null), L = g(!1), jt = c(() => Object.values(P.value).filter((e) => e.update_available).length);
		function R(e) {
			let t = P.value[e];
			return t && t.update_available ? t : null;
		}
		function Mt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			P.value = t;
		}
		function Nt(e) {
			if (e in P.value) {
				let t = { ...P.value };
				delete t[e], P.value = t;
			}
		}
		async function Pt() {
			if (!F.value) {
				F.value = !0;
				try {
					let e = await b.checkUpdates();
					Mt(e.updates), L.value = e.auto_update;
					let t = jt.value;
					x.success(t > 0 ? `${t} update${t === 1 ? "" : "s"} available.` : "All plugins are up to date.");
				} catch (e) {
					x.error(r(e, "Failed to check for updates."));
				} finally {
					F.value = !1;
				}
			}
		}
		function Ft(e) {
			switch (o(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return r(e, "Update failed — the new version could not be downloaded or read.");
				default: return r(e, "Failed to update plugin.");
			}
		}
		async function It(e) {
			if (I.value === null) {
				I.value = e.name, z.value = null;
				try {
					await b.updatePlugin(e.name), x.success(`${e.name} updated.`), Nt(e.name), await T();
				} catch (t) {
					z.value = {
						title: `Couldn't update ${e.name}`,
						message: Ft(t)
					}, x.error(Ft(t));
				} finally {
					I.value = null;
				}
			}
		}
		async function Lt() {
			if (!At.value) {
				At.value = !0;
				try {
					let e = await b.updateAll();
					e.failed.length > 0 ? x.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : x.success(`${e.updated.length} plugin${e.updated.length === 1 ? "" : "s"} updated.`), await T();
					let t = await b.checkUpdates();
					Mt(t.updates), L.value = t.auto_update;
				} catch (e) {
					x.error(r(e, "Failed to apply updates."));
				} finally {
					At.value = !1;
				}
			}
		}
		async function Rt(e) {
			let t = L.value;
			L.value = e;
			try {
				L.value = await b.setAutoUpdate(e), x.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				L.value = t, x.error(r(e, "Failed to change auto-update."));
			}
		}
		let z = g(null);
		function zt(e, t, n) {
			let ee = r(t, n);
			z.value = {
				title: e,
				message: ee
			}, x.error(ee);
		}
		let B = g(null);
		async function Bt(e, t) {
			if (B.value === null) {
				B.value = e.name, z.value = null;
				try {
					t ? (await b.enable(e.name), x.success(`${e.name} enabled.`)) : (await b.disable(e.name), x.success(`${e.name} disabled.`)), await T();
				} catch (n) {
					zt(t ? `Couldn't enable ${e.name}` : `Couldn't disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					B.value = null;
				}
			}
		}
		let V = g(null);
		async function Vt() {
			let e = V.value;
			if (e) try {
				await b.uninstall(e.name), x.success(`${e.name} uninstalled.`), V.value = null, await T();
			} catch (t) {
				zt(`Couldn't uninstall ${e.name}`, t, "Failed to uninstall plugin."), V.value = null;
			}
		}
		let H = g(null), U = g(null), Ht = g(!1), Ut = g(!1), W = g({}), Wt = g({}), G = g({}), K = g(null), q = g(""), J = g({}), Y = g(null), X = g(!1);
		function Gt() {
			Y.value = null;
		}
		_e([W, J], Gt, { deep: !0 });
		let Kt = c(() => H.value ? `Configure — ${H.value.name}` : "Configure plugin"), qt = c(() => U.value ? Object.entries(U.value.settings_schema) : []), Jt = c(() => qt.value.length > 0), Yt = c(() => U.value?.redirect_url ?? "");
		async function Xt() {
			let e = Yt.value;
			if (e) try {
				await navigator.clipboard.writeText(e), q.value = "Redirect URL copied to clipboard.", x.success("Redirect URL copied to clipboard.");
			} catch {
				q.value = "Could not copy the redirect URL. Copy it manually instead.", x.error("Failed to copy the redirect URL.");
			}
		}
		function Zt(e) {
			return `plugin-secret-status-${e}`;
		}
		function Qt(e) {
			return e.type === "array" || e.type === "object";
		}
		function $t(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function en(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function tn(e, t) {
			if (en(e)) return t === !0 || t === 1 || t === "1" || t === "true";
			if (e.secret) return "";
			if (t == null) {
				let t = e.default === void 0 ? "" : e.default;
				return Qt(e) && t !== "" ? JSON.stringify(t) : t;
			}
			return Qt(e) && typeof t != "string" ? JSON.stringify(t) : t;
		}
		function Z(e) {
			return U.value?.secret_status?.[e] ?? null;
		}
		function nn(e) {
			return "•".repeat(Math.max(1, Math.min(e, 32)));
		}
		function Q(e) {
			return J.value[e] === !0;
		}
		function rn(e, t) {
			return t.secret && Z(e)?.set !== !1;
		}
		function an(e) {
			J.value[e] = !0, W.value[e] = "";
		}
		function on(e) {
			delete J.value[e];
		}
		function sn(e) {
			if (e.secret || !("default" in e)) return null;
			let t = e.default;
			return t == null || t === "" ? null : typeof t == "boolean" ? t ? "on" : "off" : String(t);
		}
		function cn(e) {
			return e.link_text && e.link_text.trim() !== "" ? e.link_text : "Where to get this";
		}
		function ln(e) {
			if (e.link) return [{
				text: cn(e),
				url: e.link
			}];
		}
		async function un(e) {
			H.value = e, U.value = null, W.value = {}, Wt.value = {}, G.value = {}, K.value = null, q.value = "", J.value = {}, Gt(), Ht.value = !0;
			try {
				let t = await b.get(e.name);
				U.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = tn(r, t.settings[e]);
				W.value = n, Wt.value = { ...n };
			} catch (e) {
				x.error(r(e, "Failed to load plugin settings.")), H.value = null;
			} finally {
				Ht.value = !1;
			}
		}
		function $() {
			H.value = null, U.value = null, W.value = {}, Wt.value = {}, G.value = {}, K.value = null, q.value = "", J.value = {}, Gt();
		}
		function dn() {
			let e = {};
			if (!U.value) return e;
			for (let [t, n] of Object.entries(U.value.settings_schema)) {
				let r = W.value[t];
				if (n.secret) {
					if (Q(t)) {
						e[t] = "";
						continue;
					}
					if (r === "" || r == null) continue;
					e[t] = r;
					continue;
				}
				r !== Wt.value[t] && (e[t] = fn(n, r));
			}
			return e;
		}
		function fn(e, t) {
			if (en(e)) return t === !0;
			if (t === "" || t == null) return null;
			if ($t(e) === "number") return Number(t);
			if (Qt(e)) try {
				return JSON.parse(String(t));
			} catch {
				return t;
			}
			return t;
		}
		async function pn() {
			let e = H.value;
			if (!e) return;
			G.value = {}, K.value = null;
			let t = dn();
			if (Object.keys(t).length === 0) {
				x.success("No changes to save."), $();
				return;
			}
			Ut.value = !0;
			try {
				await b.updateSettings(e.name, t), x.success("Settings saved."), $(), await T();
			} catch (e) {
				let t = le(e);
				Object.keys(t).length > 0 ? (G.value = t, K.value = "Please fix the errors below and try again.", x.error("Some settings could not be saved — check the highlighted fields.")) : (K.value = r(e, "Failed to save settings."), x.error(K.value));
			} finally {
				Ut.value = !1;
			}
		}
		async function mn() {
			let e = H.value;
			if (!(!e || X.value)) {
				Gt(), X.value = !0;
				try {
					let t = await b.testCredentials(e.name, dn());
					Y.value = {
						tone: t.success ? "success" : "failure",
						message: t.message || (t.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (e) {
					o(e) === "plugin.test_not_supported" || e instanceof ee && e.status === 501 ? Y.value = {
						tone: "unsupported",
						message: "This plugin does not support testing credentials."
					} : Y.value = {
						tone: "failure",
						message: r(e, "Could not run the credential test.")
					};
				} finally {
					X.value = !1;
				}
			}
		}
		async function hn() {
			try {
				L.value = await b.getAutoUpdate();
			} catch {}
		}
		return me(() => {
			ft(), w(), hn();
		}), (e, n) => (h(), d("section", be, [
			f("header", xe, [n[12] ||= f("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), f("div", Se, [
				m(re, {
					"model-value": L.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": Rt
				}, null, 8, ["model-value"]),
				n[11] ||= f("span", { class: "admin-plugins__head-spacer" }, null, -1),
				m(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: F.value,
					onClick: Pt
				}, {
					default: y(() => [...n[8] ||= [p(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				jt.value > 0 ? (h(), l(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: At.value,
					onClick: Lt
				}, {
					default: y(() => [p(" Update all (" + v(jt.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : u("", !0),
				m(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: Et
				}, {
					default: y(() => [...n[9] ||= [p("Add catalog", -1)]]),
					_: 1
				}),
				m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: bt
				}, {
					default: y(() => [...n[10] ||= [p("Install from URL", -1)]]),
					_: 1
				})
			])]),
			m(se, null, {
				default: y(() => [...n[13] ||= [
					p(" Extend Phlix with add-ons from the plugin catalog. On each catalog plugin, toggle its switch to ", -1),
					f("strong", null, "enable/disable", -1),
					p(" it, ", -1),
					f("strong", null, "Install", -1),
					p(" or ", -1),
					f("strong", null, "Uninstall", -1),
					p(" it, ", -1),
					f("strong", null, "Configure", -1),
					p(" its settings, or ", -1),
					f("strong", null, "Update", -1),
					p(" when a new version is out. Up top, ", -1),
					f("strong", null, "Check for updates", -1),
					p(" refreshes availability, ", -1),
					f("strong", null, "Update all", -1),
					p(" upgrades everything at once, ", -1),
					f("strong", null, "Auto-update", -1),
					p(" keeps plugins current automatically, and ", -1),
					f("strong", null, "Add catalog", -1),
					p(" / ", -1),
					f("strong", null, "Install from URL", -1),
					p(" pull in sources or plugins from outside the default catalog. ", -1)
				]]),
				_: 1
			}),
			f("div", Ce, [n[14] ||= f("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (h(!0), d(s, null, _(C.value.sources, (e) => (h(), l(a, {
				key: e,
				tone: "neutral"
			}, {
				default: y(() => [f("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, v(_t(e)), 9, we), e === C.value.default_source ? u("", !0) : (h(), d("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: N.value === e,
					"aria-label": `Remove catalog ${_t(e)}`,
					onClick: (t) => kt(e)
				}, " × ", 8, Te))]),
				_: 2
			}, 1024))), 128))]),
			k.value ? (h(), d("div", Ee, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", De, [n[15] ||= f("strong", null, "Couldn't install the plugin.", -1), f("span", null, v(k.value), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => k.value = null
				}, " × ")
			])) : u("", !0),
			z.value ? (h(), d("div", Oe, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", ke, [f("strong", null, v(z.value.title) + ".", 1), f("span", null, v(z.value.message), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[1] ||= (e) => z.value = null
				}, " × ")
			])) : u("", !0),
			pt.value ? (h(), d("div", Ae, [m(ae, {
				variant: "text",
				lines: 5
			})])) : (h(), d(s, { key: 3 }, [(h(!0), d(s, null, _(C.value.errors, (e) => (h(), d("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[16] ||= p(" Couldn't load catalog ", -1),
				f("strong", null, v(_t(e.source)), 1),
				p(" — " + v(e.error), 1)
			]))), 128)), mt.value.length === 0 && C.value.errors.length === 0 ? (h(), l(oe, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: y(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: bt
				}, {
					default: y(() => [...n[17] ||= [p("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d("ul", je, [(h(!0), d(s, null, _(mt.value, (e) => (h(), d("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				f("div", Me, [f("h3", Ne, v(e.title), 1), f("div", Pe, [
					e.type ? (h(), l(a, {
						key: 0,
						tone: "info"
					}, {
						default: y(() => [p(v(e.type), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.installed ? (h(), l(a, {
						key: 1,
						tone: "success"
					}, {
						default: y(() => [...n[18] ||= [p("Installed", -1)]]),
						_: 1
					})) : u("", !0),
					R(e.name) ? (h(), l(a, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: y(() => [p(" Update → v" + v(R(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)
				])]),
				e.summary || e.description ? (h(), d("p", Fe, v(e.summary || e.description), 1)) : u("", !0),
				e.tags.length ? (h(), d("div", Ie, [(h(!0), d(s, null, _(e.tags, (e) => (h(), d("span", {
					key: e,
					class: "admin-plugins__tag"
				}, v(e), 1))), 128))])) : u("", !0),
				f("div", Le, [e.installed ? (h(), d(s, { key: 0 }, [
					m(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: B.value === e.name,
						"onUpdate:modelValue": (t) => Bt(E(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[22] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					R(e.name) ? (h(), l(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: I.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => It(E(e))
					}, {
						default: y(() => [...n[19] ||= [p(" Update ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])) : u("", !0),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => un(E(e))
					}, {
						default: y(() => [...n[20] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => V.value = E(e)
					}, {
						default: y(() => [...n[21] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (h(), d(s, { key: 1 }, [
					m(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: A.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => wt(e)
					}, {
						default: y(() => [...n[23] ||= [p(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					n[24] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					f("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, Re)
				], 64))])
			]))), 128))]))], 64)),
			gt.value.length ? (h(), d("section", ze, [
				n[29] ||= f("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[30] ||= f("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				f("table", Be, [n[28] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Name"),
					f("th", { scope: "col" }, "Version"),
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Enabled"),
					f("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), f("tbody", null, [(h(!0), d(s, null, _(gt.value, (e) => (h(), d("tr", { key: e.name }, [
					f("td", null, v(e.name), 1),
					f("td", Ve, [p(v(e.version) + " ", 1), R(e.name) ? (h(), l(a, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: y(() => [p(" → v" + v(R(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)]),
					f("td", null, [m(a, { tone: "info" }, {
						default: y(() => [p(v(e.type), 1)]),
						_: 2
					}, 1024)]),
					f("td", null, [m(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: B.value === e.name,
						"onUpdate:modelValue": (t) => Bt(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					f("td", null, [f("div", He, [
						R(e.name) ? (h(), l(i, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: I.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => It(e)
						}, {
							default: y(() => [...n[25] ||= [p(" Update ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])) : u("", !0),
						m(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Configure ${e.name}`,
							onClick: (t) => un(e)
						}, {
							default: y(() => [...n[26] ||= [p(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						m(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => V.value = e
						}, {
							default: y(() => [...n[27] ||= [p(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : u("", !0),
			S.value && !dt.value ? (h(), l(oe, {
				key: 5,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: S.value
			}, {
				actions: y(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: ft
				}, {
					default: y(() => [...n[31] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(ie, {
				modelValue: D.value,
				"onUpdate:modelValue": n[3] ||= (e) => D.value = e,
				title: "Install from URL",
				onClose: xt
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: xt
				}, {
					default: y(() => [...n[34] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: vt.value,
					onClick: Ct
				}, {
					default: y(() => [...n[35] ||= [p("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: ye(Ct, ["prevent"])
				}, [f("label", Ue, [
					n[32] ||= f("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					ve(f("input", {
						"onUpdate:modelValue": n[2] ||= (e) => O.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[ge, O.value]]),
					n[33] ||= f("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(ie, {
				modelValue: j.value,
				"onUpdate:modelValue": n[5] ||= (e) => j.value = e,
				title: "Add catalog",
				onClose: Dt
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: Dt
				}, {
					default: y(() => [...n[38] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: Tt.value,
					onClick: Ot
				}, {
					default: y(() => [...n[39] ||= [p("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: ye(Ot, ["prevent"])
				}, [f("label", We, [
					n[36] ||= f("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					ve(f("input", {
						"onUpdate:modelValue": n[4] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[ge, M.value]]),
					n[37] ||= f("span", { class: "admin-plugins__hint" }, [
						p(" A repository (or direct "),
						f("code", null, "plugins.json"),
						p(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(ie, {
				"model-value": V.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": n[7] ||= (e) => V.value = null
			}, {
				footer: y(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[6] ||= (e) => V.value = null
				}, {
					default: y(() => [...n[42] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: Vt
				}, {
					default: y(() => [...n[43] ||= [p("Uninstall", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					n[40] ||= p(" Uninstall ", -1),
					f("strong", null, v(V.value?.name), 1),
					n[41] ||= p("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(ie, {
				"model-value": H.value !== null,
				title: Kt.value,
				size: "lg",
				"onUpdate:modelValue": $
			}, {
				footer: y(() => [
					m(i, {
						variant: "ghost",
						size: "sm",
						onClick: $
					}, {
						default: y(() => [...n[56] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					Jt.value ? (h(), l(i, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: X.value,
						disabled: X.value || Ut.value,
						"aria-label": `Test the credentials for ${H.value?.name}`,
						onClick: mn
					}, {
						default: y(() => [...n[57] ||= [p(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : u("", !0),
					Jt.value ? (h(), l(i, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: Ut.value,
						onClick: pn
					}, {
						default: y(() => [...n[58] ||= [p(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : u("", !0)
				]),
				default: y(() => [Ht.value ? (h(), d("div", Ge, [m(ae, {
					variant: "text",
					lines: 4
				})])) : (h(), d("div", Ke, [Yt.value ? (h(), d("div", qe, [
					f("span", {
						id: `plugin-redirect-url-${H.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, Je),
					f("div", Ye, [f("code", Xe, v(Yt.value), 1), m(i, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${H.value?.name}`,
						onClick: Xt
					}, {
						default: y(() => [...n[44] ||= [p(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					n[45] ||= f("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					f("span", Ze, v(q.value), 1)
				])) : u("", !0), Jt.value ? (h(), d("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: ye(pn, ["prevent"])
				}, [
					K.value ? (h(), d("div", Qe, v(K.value), 1)) : u("", !0),
					(h(!0), d(s, null, _(qt.value, ([e, t]) => (h(), d("div", {
						key: e,
						class: "admin-plugins__field"
					}, [
						t.type === "bool" || t.type === "boolean" ? (h(), l(re, {
							key: 0,
							"model-value": W.value[e] === !0,
							label: t.label || e,
							"onUpdate:modelValue": (t) => W.value[e] = t
						}, null, 8, [
							"model-value",
							"label",
							"onUpdate:modelValue"
						])) : (h(), d(s, { key: 1 }, [
							f("label", {
								for: `plugin-setting-${e}`,
								class: "admin-plugins__label"
							}, [p(v(t.label || e) + " ", 1), t.required ? (h(), d("span", et, "*")) : (h(), d("span", tt, "optional"))], 8, $e),
							f("div", nt, [ve(f("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => W.value[e] = t,
								type: t.secret ? "password" : $t(t),
								class: pe(["admin-plugins__input", { "is-invalid": G.value[e] }]),
								autocomplete: t.secret ? "new-password" : "off",
								placeholder: t.secret ? Q(e) ? "Will be removed on save" : Z(e) === null ? "Leave blank to keep whatever is stored" : Z(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: t.secret && Q(e),
								"aria-describedby": t.secret ? Zt(e) : void 0,
								"aria-invalid": G.value[e] ? "true" : void 0
							}, null, 10, rt), [[he, W.value[e]]]), t.secret && Q(e) ? (h(), l(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${t.label || e}`,
								onClick: (t) => on(e)
							}, {
								default: y(() => [...n[46] ||= [p(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : rn(e, t) ? (h(), l(i, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${t.label || e}`,
								onClick: (t) => an(e)
							}, {
								default: y(() => [...n[47] ||= [p(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : u("", !0)]),
							t.secret ? (h(), d("span", {
								key: 0,
								id: Zt(e),
								class: pe(["admin-plugins__secret-status", { "is-set": Z(e)?.set }])
							}, [Q(e) ? (h(), d(s, { key: 0 }, [m(a, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...n[48] ||= [p("Will be removed", -1)]]),
								_: 1
							}), n[49] ||= p(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Z(e) === null ? (h(), d(s, { key: 1 }, [m(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...n[50] ||= [p("Unknown", -1)]]),
								_: 1
							}), n[51] ||= p(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Z(e)?.set ? (h(), d(s, { key: 2 }, [
								m(a, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: y(() => [...n[52] ||= [p("Configured", -1)]]),
									_: 1
								}),
								f("span", at, v(nn(Z(e)?.length ?? 0)), 1),
								p(" Currently set (" + v(Z(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (h(), d(s, { key: 3 }, [m(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...n[53] ||= [p("Not set", -1)]]),
								_: 1
							}), n[54] ||= p(" No value is stored yet. ", -1)], 64))], 10, it)) : u("", !0)
						], 64)),
						t.description || t.link ? (h(), l(ce, {
							key: 2,
							text: t.description,
							links: ln(t)
						}, null, 8, ["text", "links"])) : u("", !0),
						sn(t) ? (h(), d("span", ot, [n[55] ||= p(" Default: ", -1), f("code", null, v(sn(t)), 1)])) : u("", !0),
						G.value[e] ? (h(), d("span", st, v(G.value[e]), 1)) : u("", !0)
					]))), 128)),
					Y.value ? (h(), d("div", {
						key: 1,
						class: pe(["admin-plugins__test-result", `admin-plugins__test-result--${Y.value.tone}`])
					}, [m(a, {
						tone: Y.value.tone === "success" ? "success" : Y.value.tone === "failure" ? "error" : "neutral",
						class: "admin-plugins__test-state"
					}, {
						default: y(() => [p(v(Y.value.tone === "success" ? "Passed" : Y.value.tone === "failure" ? "Failed" : "Not supported"), 1)]),
						_: 1
					}, 8, ["tone"]), p(" " + v(Y.value.message), 1)], 2)) : u("", !0)
				], 32)) : (h(), l(oe, {
					key: 1,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))]))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-f1132bac"]]);
//#endregion
export { ct as default };

//# sourceMappingURL=PluginsPage-Bmextev3.js.map