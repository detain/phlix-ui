import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, l as ee, t as te } from "./client-BzWwyWKr.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as re } from "./Switch-DyS2L5gX.js";
import { t as o } from "./Modal-aFganlu3.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as ae } from "./EmptyState-ZlI5t4KT.js";
import { t as oe } from "./PageHint-BoAlFFBN.js";
import { t as se } from "./HelpText-Ccbgsfz2.js";
import { i as ce, r as s, t as le } from "./plugins-eSyyo8B2.js";
import { t as ue } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as de, inject as fe, normalizeClass as pe, onMounted as me, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as he, vModelDynamic as ge, vModelText as _e, watch as ve, withCtx as b, withDirectives as ye, withModifiers as be } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var xe = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, Se = { class: "admin-plugins__head" }, Ce = { class: "admin-plugins__head-actions" }, we = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, Te = ["href"], Ee = [
	"disabled",
	"aria-label",
	"onClick"
], De = {
	key: 0,
	class: "admin-plugins__install-error",
	role: "alert"
}, Oe = { class: "admin-plugins__install-error-body" }, ke = {
	key: 1,
	class: "admin-plugins__install-error",
	role: "alert"
}, Ae = { class: "admin-plugins__install-error-body" }, je = {
	key: 2,
	class: "admin-plugins__skel"
}, Me = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Ne = { class: "admin-plugins__card-head" }, Pe = { class: "admin-plugins__card-title" }, Fe = { class: "admin-plugins__card-badges" }, Ie = {
	key: 0,
	class: "admin-plugins__card-summary"
}, Le = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Re = { class: "admin-plugins__card-actions" }, ze = ["href"], Be = {
	key: 4,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Ve = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, He = { class: "admin-plugins__mono" }, Ue = { class: "admin-plugins__actions" }, We = { class: "admin-plugins__field" }, Ge = { class: "admin-plugins__field" }, Ke = {
	key: 0,
	class: "admin-plugins__skel"
}, qe = {
	key: 1,
	class: "admin-plugins__config-body",
	"aria-live": "polite"
}, Je = {
	key: 0,
	class: "admin-plugins__redirect"
}, Ye = ["id"], Xe = { class: "admin-plugins__redirect-row" }, Ze = { class: "admin-plugins__redirect-value" }, Qe = {
	class: "admin-plugins__visually-hidden",
	role: "status"
}, $e = {
	key: 0,
	class: "admin-plugins__config-error",
	role: "alert"
}, et = ["for"], tt = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true",
	title: "Required"
}, nt = {
	key: 1,
	class: "admin-plugins__optional"
}, rt = { class: "admin-plugins__secret-row" }, it = [
	"id",
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"disabled",
	"aria-describedby",
	"aria-invalid"
], at = ["id"], ot = {
	class: "admin-plugins__secret-dots",
	"aria-hidden": "true"
}, st = {
	key: 3,
	class: "admin-plugins__hint admin-plugins__default-hint"
}, ct = {
	key: 4,
	class: "admin-plugins__error",
	role: "alert"
}, lt = /*#__PURE__*/ e(/* @__PURE__ */ de({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let de = e, lt = fe("apiBase", ""), ut = l(() => typeof lt == "string" ? lt : lt?.value ?? ""), x = new le(de.client ?? new te({
			baseUrl: ut.value,
			tokenStore: new n()
		})), S = ne(), dt = _([]), ft = _(!0), C = _(null);
		async function pt() {
			ft.value = !0, C.value = null;
			try {
				dt.value = await x.list();
			} catch (e) {
				C.value = r(e, "Failed to load plugins."), S.error(C.value);
			} finally {
				ft.value = !1;
			}
		}
		let w = _({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), mt = _(!0);
		async function T() {
			mt.value = !0;
			try {
				w.value = await x.catalog();
			} catch (e) {
				S.error(r(e, "Failed to load the plugin catalog."));
			} finally {
				mt.value = !1;
			}
		}
		async function E() {
			await Promise.all([pt(), T()]);
		}
		let ht = l(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of w.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), gt = l(() => new Set(ht.value.map((e) => e.name))), _t = l(() => dt.value.filter((e) => !gt.value.has(e.name)));
		function vt(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function D(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let yt = _(!1), O = _(""), bt = _(!1);
		function xt(e) {
			switch (s(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return r(e, "Install failed — the plugin could not be downloaded or read.");
				default: return r(e, "Failed to install plugin.");
			}
		}
		function St() {
			O.value = "", yt.value = !0;
		}
		function Ct() {
			yt.value = !1, O.value = "";
		}
		let k = _(null);
		function wt(e) {
			let t = xt(e);
			k.value = t, S.error(t);
		}
		async function Tt() {
			let e = O.value.trim();
			if (!e) {
				S.error("A plugin URL is required.");
				return;
			}
			bt.value = !0, k.value = null;
			try {
				await x.install(e), S.success("Plugin installed."), Ct(), await E();
			} catch (e) {
				wt(e);
			} finally {
				bt.value = !1;
			}
		}
		let A = _(null);
		async function Et(e) {
			if (A.value === null) {
				A.value = e.repo, k.value = null;
				try {
					await x.install(e.repo), S.success(`${e.title} installed.`), await E();
				} catch (e) {
					wt(e);
				} finally {
					A.value = null;
				}
			}
		}
		let j = _(!1), M = _(""), Dt = _(!1), N = _(null);
		function Ot() {
			M.value = "", j.value = !0;
		}
		function kt() {
			j.value = !1, M.value = "";
		}
		async function At() {
			let e = M.value.trim();
			if (!e) {
				S.error("A catalog URL is required.");
				return;
			}
			Dt.value = !0;
			try {
				await x.addCatalogSource(e), S.success("Catalog added."), kt(), await T();
			} catch (e) {
				let t = s(e);
				S.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : r(e, "Failed to add catalog."));
			} finally {
				Dt.value = !1;
			}
		}
		async function jt(e) {
			if (N.value === null) {
				N.value = e;
				try {
					await x.removeCatalogSource(e), S.success("Catalog removed."), await T();
				} catch (e) {
					S.error(r(e, "Failed to remove catalog."));
				} finally {
					N.value = null;
				}
			}
		}
		let P = _({}), F = _(!1), I = _(!1), L = _(null), R = _(!1), Mt = l(() => Object.values(P.value).filter((e) => e.update_available).length);
		function z(e) {
			let t = P.value[e];
			return t && t.update_available ? t : null;
		}
		function Nt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			P.value = t;
		}
		function Pt(e) {
			if (e in P.value) {
				let t = { ...P.value };
				delete t[e], P.value = t;
			}
		}
		async function Ft() {
			if (!F.value) {
				F.value = !0;
				try {
					let e = await x.checkUpdates();
					Nt(e.updates), R.value = e.auto_update;
					let t = Mt.value;
					S.success(t > 0 ? `${t} update${t === 1 ? "" : "s"} available.` : "All plugins are up to date.");
				} catch (e) {
					S.error(r(e, "Failed to check for updates."));
				} finally {
					F.value = !1;
				}
			}
		}
		function It(e) {
			switch (s(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return r(e, "Update failed — the new version could not be downloaded or read.");
				default: return r(e, "Failed to update plugin.");
			}
		}
		async function Lt(e) {
			if (L.value === null) {
				L.value = e.name, B.value = null;
				try {
					await x.updatePlugin(e.name), S.success(`${e.name} updated.`), Pt(e.name), await E();
				} catch (t) {
					B.value = {
						title: `Couldn't update ${e.name}`,
						message: It(t)
					}, S.error(It(t));
				} finally {
					L.value = null;
				}
			}
		}
		async function Rt() {
			if (!I.value) {
				I.value = !0;
				try {
					let e = await x.updateAll();
					e.failed.length > 0 ? S.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : S.success(`${e.updated.length} plugin${e.updated.length === 1 ? "" : "s"} updated.`), await E();
					let t = await x.checkUpdates();
					Nt(t.updates), R.value = t.auto_update;
				} catch (e) {
					S.error(r(e, "Failed to apply updates."));
				} finally {
					I.value = !1;
				}
			}
		}
		async function zt(e) {
			let t = R.value;
			R.value = e;
			try {
				R.value = await x.setAutoUpdate(e), S.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				R.value = t, S.error(r(e, "Failed to change auto-update."));
			}
		}
		let B = _(null);
		function Bt(e, t, n) {
			let ee = r(t, n);
			B.value = {
				title: e,
				message: ee
			}, S.error(ee);
		}
		let V = _(null);
		async function Vt(e, t) {
			if (V.value === null) {
				V.value = e.name, B.value = null;
				try {
					t ? (await x.enable(e.name), S.success(`${e.name} enabled.`)) : (await x.disable(e.name), S.success(`${e.name} disabled.`)), await E();
				} catch (n) {
					Bt(t ? `Couldn't enable ${e.name}` : `Couldn't disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					V.value = null;
				}
			}
		}
		let H = _(null);
		async function Ht() {
			let e = H.value;
			if (e) try {
				await x.uninstall(e.name), S.success(`${e.name} uninstalled.`), H.value = null, await E();
			} catch (t) {
				Bt(`Couldn't uninstall ${e.name}`, t, "Failed to uninstall plugin."), H.value = null;
			}
		}
		let U = _(null), W = _(null), Ut = _(!1), Wt = _(!1), G = _({}), Gt = _({}), K = _({}), q = _(null), J = _(""), Y = _({}), X = _(null), Z = _(!1);
		function Kt() {
			X.value = null;
		}
		ve([G, Y], Kt, { deep: !0 });
		let qt = l(() => U.value ? `Configure — ${U.value.name}` : "Configure plugin"), Jt = l(() => W.value ? Object.entries(W.value.settings_schema) : []), Yt = l(() => Jt.value.length > 0), Xt = l(() => W.value?.redirect_url ?? "");
		async function Zt() {
			let e = Xt.value;
			if (e) try {
				await navigator.clipboard.writeText(e), J.value = "Redirect URL copied to clipboard.", S.success("Redirect URL copied to clipboard.");
			} catch {
				J.value = "Could not copy the redirect URL. Copy it manually instead.", S.error("Failed to copy the redirect URL.");
			}
		}
		function Qt(e) {
			return `plugin-secret-status-${e}`;
		}
		function $t(e) {
			return e.type === "array" || e.type === "object";
		}
		function en(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function tn(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function nn(e, t) {
			if (tn(e)) return t === !0 || t === 1 || t === "1" || t === "true";
			if (e.secret) return "";
			if (t == null) {
				let t = e.default === void 0 ? "" : e.default;
				return $t(e) && t !== "" ? JSON.stringify(t) : t;
			}
			return $t(e) && typeof t != "string" ? JSON.stringify(t) : t;
		}
		function Q(e) {
			return W.value?.secret_status?.[e] ?? null;
		}
		function rn(e) {
			return "•".repeat(Math.max(1, Math.min(e, 32)));
		}
		function $(e) {
			return Y.value[e] === !0;
		}
		function an(e, t) {
			return t.secret && Q(e)?.set !== !1;
		}
		function on(e) {
			Y.value[e] = !0, G.value[e] = "";
		}
		function sn(e) {
			delete Y.value[e];
		}
		function cn(e) {
			if (e.secret || !("default" in e)) return null;
			let t = e.default;
			return t == null || t === "" ? null : typeof t == "boolean" ? t ? "on" : "off" : String(t);
		}
		function ln(e) {
			return e.link_text && e.link_text.trim() !== "" ? e.link_text : "Where to get this";
		}
		function un(e) {
			if (e.link) return [{
				text: ln(e),
				url: e.link
			}];
		}
		async function dn(e) {
			U.value = e, W.value = null, G.value = {}, Gt.value = {}, K.value = {}, q.value = null, J.value = "", Y.value = {}, Kt(), Ut.value = !0;
			try {
				let t = await x.get(e.name);
				W.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = nn(r, t.settings[e]);
				G.value = n, Gt.value = { ...n };
			} catch (e) {
				S.error(r(e, "Failed to load plugin settings.")), U.value = null;
			} finally {
				Ut.value = !1;
			}
		}
		function fn() {
			U.value = null, W.value = null, G.value = {}, Gt.value = {}, K.value = {}, q.value = null, J.value = "", Y.value = {}, Kt();
		}
		function pn() {
			let e = {};
			if (!W.value) return e;
			for (let [t, n] of Object.entries(W.value.settings_schema)) {
				let r = G.value[t];
				if (n.secret) {
					if ($(t)) {
						e[t] = "";
						continue;
					}
					if (r === "" || r == null) continue;
					e[t] = r;
					continue;
				}
				r !== Gt.value[t] && (e[t] = mn(n, r));
			}
			return e;
		}
		function mn(e, t) {
			if (tn(e)) return t === !0;
			if (t === "" || t == null) return null;
			if (en(e) === "number") return Number(t);
			if ($t(e)) try {
				return JSON.parse(String(t));
			} catch {
				return t;
			}
			return t;
		}
		async function hn() {
			let e = U.value;
			if (!e) return;
			K.value = {}, q.value = null;
			let t = pn();
			if (Object.keys(t).length === 0) {
				S.success("No changes to save."), fn();
				return;
			}
			Wt.value = !0;
			try {
				await x.updateSettings(e.name, t), S.success("Settings saved."), fn(), await E();
			} catch (e) {
				let t = ce(e);
				Object.keys(t).length > 0 ? (K.value = t, q.value = "Please fix the errors below and try again.", S.error("Some settings could not be saved — check the highlighted fields.")) : (q.value = r(e, "Failed to save settings."), S.error(q.value));
			} finally {
				Wt.value = !1;
			}
		}
		async function gn() {
			let e = U.value;
			if (!(!e || Z.value)) {
				Kt(), Z.value = !0;
				try {
					let t = await x.testCredentials(e.name, pn());
					X.value = {
						tone: t.success ? "success" : "failure",
						message: t.message || (t.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (e) {
					s(e) === "plugin.test_not_supported" || e instanceof ee && e.status === 501 ? X.value = {
						tone: "unsupported",
						message: "This plugin does not support testing credentials."
					} : X.value = {
						tone: "failure",
						message: r(e, "Could not run the credential test.")
					};
				} finally {
					Z.value = !1;
				}
			}
		}
		async function _n() {
			try {
				R.value = await x.getAutoUpdate();
			} catch {}
		}
		return me(() => {
			pt(), T(), _n();
		}), (e, n) => (g(), f("section", xe, [
			p("header", Se, [n[12] ||= p("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), p("div", Ce, [
				h(re, {
					"model-value": R.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": zt
				}, null, 8, ["model-value"]),
				n[11] ||= p("span", { class: "admin-plugins__head-spacer" }, null, -1),
				h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: F.value,
					onClick: Ft
				}, {
					default: b(() => [...n[8] ||= [m(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				Mt.value > 0 ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: I.value,
					onClick: Rt
				}, {
					default: b(() => [m(" Update all (" + y(Mt.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : d("", !0),
				h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: Ot
				}, {
					default: b(() => [...n[9] ||= [m("Add catalog", -1)]]),
					_: 1
				}),
				h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: St
				}, {
					default: b(() => [...n[10] ||= [m("Install from URL", -1)]]),
					_: 1
				})
			])]),
			h(oe, {
				links: he(ue).plugins.links,
				details: he(ue).plugins.details
			}, {
				default: b(() => [...n[13] ||= [
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
			}, 8, ["links", "details"]),
			p("div", we, [n[14] ||= p("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (g(!0), f(c, null, v(w.value.sources, (e) => (g(), u(a, {
				key: e,
				tone: "neutral"
			}, {
				default: b(() => [p("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, y(vt(e)), 9, Te), e === w.value.default_source ? d("", !0) : (g(), f("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: N.value === e,
					"aria-label": `Remove catalog ${vt(e)}`,
					onClick: (t) => jt(e)
				}, " × ", 8, Ee))]),
				_: 2
			}, 1024))), 128))]),
			k.value ? (g(), f("div", De, [
				h(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				p("div", Oe, [n[15] ||= p("strong", null, "Couldn't install the plugin.", -1), p("span", null, y(k.value), 1)]),
				p("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => k.value = null
				}, " × ")
			])) : d("", !0),
			B.value ? (g(), f("div", ke, [
				h(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				p("div", Ae, [p("strong", null, y(B.value.title) + ".", 1), p("span", null, y(B.value.message), 1)]),
				p("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[1] ||= (e) => B.value = null
				}, " × ")
			])) : d("", !0),
			mt.value ? (g(), f("div", je, [h(ie, {
				variant: "text",
				lines: 5
			})])) : (g(), f(c, { key: 3 }, [(g(!0), f(c, null, v(w.value.errors, (e) => (g(), f("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[16] ||= m(" Couldn't load catalog ", -1),
				p("strong", null, y(vt(e.source)), 1),
				m(" — " + y(e.error), 1)
			]))), 128)), ht.value.length === 0 && w.value.errors.length === 0 ? (g(), u(ae, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: St
				}, {
					default: b(() => [...n[17] ||= [m("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), f("ul", Me, [(g(!0), f(c, null, v(ht.value, (e) => (g(), f("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				p("div", Ne, [p("h3", Pe, y(e.title), 1), p("div", Fe, [
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
						default: b(() => [...n[18] ||= [m("Installed", -1)]]),
						_: 1
					})) : d("", !0),
					z(e.name) ? (g(), u(a, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [m(" Update → v" + y(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : d("", !0)
				])]),
				e.summary || e.description ? (g(), f("p", Ie, y(e.summary || e.description), 1)) : d("", !0),
				e.tags.length ? (g(), f("div", Le, [(g(!0), f(c, null, v(e.tags, (e) => (g(), f("span", {
					key: e,
					class: "admin-plugins__tag"
				}, y(e), 1))), 128))])) : d("", !0),
				p("div", Re, [e.installed ? (g(), f(c, { key: 0 }, [
					h(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: V.value === e.name,
						"onUpdate:modelValue": (t) => Vt(D(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[22] ||= p("span", { class: "admin-plugins__card-spacer" }, null, -1),
					z(e.name) ? (g(), u(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: L.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => Lt(D(e))
					}, {
						default: b(() => [...n[19] ||= [m(" Update ", -1)]]),
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
						onClick: (t) => dn(D(e))
					}, {
						default: b(() => [...n[20] ||= [m(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => H.value = D(e)
					}, {
						default: b(() => [...n[21] ||= [m(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (g(), f(c, { key: 1 }, [
					h(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: A.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => Et(e)
					}, {
						default: b(() => [...n[23] ||= [m(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					n[24] ||= p("span", { class: "admin-plugins__card-spacer" }, null, -1),
					p("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, ze)
				], 64))])
			]))), 128))]))], 64)),
			_t.value.length ? (g(), f("section", Be, [
				n[29] ||= p("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[30] ||= p("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				p("table", Ve, [n[28] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Name"),
					p("th", { scope: "col" }, "Version"),
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Enabled"),
					p("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), p("tbody", null, [(g(!0), f(c, null, v(_t.value, (e) => (g(), f("tr", { key: e.name }, [
					p("td", null, y(e.name), 1),
					p("td", He, [m(y(e.version) + " ", 1), z(e.name) ? (g(), u(a, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [m(" → v" + y(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : d("", !0)]),
					p("td", null, [h(a, { tone: "info" }, {
						default: b(() => [m(y(e.type), 1)]),
						_: 2
					}, 1024)]),
					p("td", null, [h(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: V.value === e.name,
						"onUpdate:modelValue": (t) => Vt(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					p("td", null, [p("div", Ue, [
						z(e.name) ? (g(), u(i, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: L.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => Lt(e)
						}, {
							default: b(() => [...n[25] ||= [m(" Update ", -1)]]),
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
							onClick: (t) => dn(e)
						}, {
							default: b(() => [...n[26] ||= [m(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						h(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => H.value = e
						}, {
							default: b(() => [...n[27] ||= [m(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : d("", !0),
			C.value && !ft.value ? (g(), u(ae, {
				key: 5,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: C.value
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: pt
				}, {
					default: b(() => [...n[31] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : d("", !0),
			h(o, {
				modelValue: yt.value,
				"onUpdate:modelValue": n[3] ||= (e) => yt.value = e,
				title: "Install from URL",
				onClose: Ct
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: Ct
				}, {
					default: b(() => [...n[34] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: bt.value,
					onClick: Tt
				}, {
					default: b(() => [...n[35] ||= [m("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: be(Tt, ["prevent"])
				}, [p("label", We, [
					n[32] ||= p("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					ye(p("input", {
						"onUpdate:modelValue": n[2] ||= (e) => O.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[_e, O.value]]),
					n[33] ||= p("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				modelValue: j.value,
				"onUpdate:modelValue": n[5] ||= (e) => j.value = e,
				title: "Add catalog",
				onClose: kt
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: kt
				}, {
					default: b(() => [...n[38] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: Dt.value,
					onClick: At
				}, {
					default: b(() => [...n[39] ||= [m("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: be(At, ["prevent"])
				}, [p("label", Ge, [
					n[36] ||= p("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					ye(p("input", {
						"onUpdate:modelValue": n[4] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[_e, M.value]]),
					n[37] ||= p("span", { class: "admin-plugins__hint" }, [
						m(" A repository (or direct "),
						p("code", null, "plugins.json"),
						m(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				"model-value": H.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": n[7] ||= (e) => H.value = null
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[6] ||= (e) => H.value = null
				}, {
					default: b(() => [...n[42] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Ht
				}, {
					default: b(() => [...n[43] ||= [m("Uninstall", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					n[40] ||= m(" Uninstall ", -1),
					p("strong", null, y(H.value?.name), 1),
					n[41] ||= m("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": U.value !== null,
				title: qt.value,
				size: "lg",
				"onUpdate:modelValue": fn
			}, {
				footer: b(() => [
					h(i, {
						variant: "ghost",
						size: "sm",
						onClick: fn
					}, {
						default: b(() => [...n[56] ||= [m("Cancel", -1)]]),
						_: 1
					}),
					Yt.value ? (g(), u(i, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: Z.value,
						disabled: Z.value || Wt.value,
						"aria-label": `Test the credentials for ${U.value?.name}`,
						onClick: gn
					}, {
						default: b(() => [...n[57] ||= [m(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : d("", !0),
					Yt.value ? (g(), u(i, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: Wt.value,
						onClick: hn
					}, {
						default: b(() => [...n[58] ||= [m(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : d("", !0)
				]),
				default: b(() => [Ut.value ? (g(), f("div", Ke, [h(ie, {
					variant: "text",
					lines: 4
				})])) : (g(), f("div", qe, [Xt.value ? (g(), f("div", Je, [
					p("span", {
						id: `plugin-redirect-url-${U.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, Ye),
					p("div", Xe, [p("code", Ze, y(Xt.value), 1), h(i, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${U.value?.name}`,
						onClick: Zt
					}, {
						default: b(() => [...n[44] ||= [m(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					n[45] ||= p("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					p("span", Qe, y(J.value), 1)
				])) : d("", !0), Yt.value ? (g(), f("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: be(hn, ["prevent"])
				}, [
					q.value ? (g(), f("div", $e, y(q.value), 1)) : d("", !0),
					(g(!0), f(c, null, v(Jt.value, ([e, t]) => (g(), f("div", {
						key: e,
						class: "admin-plugins__field"
					}, [
						t.type === "bool" || t.type === "boolean" ? (g(), u(re, {
							key: 0,
							"model-value": G.value[e] === !0,
							label: t.label || e,
							"onUpdate:modelValue": (t) => G.value[e] = t
						}, null, 8, [
							"model-value",
							"label",
							"onUpdate:modelValue"
						])) : (g(), f(c, { key: 1 }, [
							p("label", {
								for: `plugin-setting-${e}`,
								class: "admin-plugins__label"
							}, [m(y(t.label || e) + " ", 1), t.required ? (g(), f("span", tt, "*")) : (g(), f("span", nt, "optional"))], 8, et),
							p("div", rt, [ye(p("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => G.value[e] = t,
								type: t.secret ? "password" : en(t),
								class: pe(["admin-plugins__input", { "is-invalid": K.value[e] }]),
								autocomplete: t.secret ? "new-password" : "off",
								placeholder: t.secret ? $(e) ? "Will be removed on save" : Q(e) === null ? "Leave blank to keep whatever is stored" : Q(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: t.secret && $(e),
								"aria-describedby": t.secret ? Qt(e) : void 0,
								"aria-invalid": K.value[e] ? "true" : void 0
							}, null, 10, it), [[ge, G.value[e]]]), t.secret && $(e) ? (g(), u(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${t.label || e}`,
								onClick: (t) => sn(e)
							}, {
								default: b(() => [...n[46] ||= [m(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : an(e, t) ? (g(), u(i, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${t.label || e}`,
								onClick: (t) => on(e)
							}, {
								default: b(() => [...n[47] ||= [m(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : d("", !0)]),
							t.secret ? (g(), f("span", {
								key: 0,
								id: Qt(e),
								class: pe(["admin-plugins__secret-status", { "is-set": Q(e)?.set }])
							}, [$(e) ? (g(), f(c, { key: 0 }, [h(a, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[48] ||= [m("Will be removed", -1)]]),
								_: 1
							}), n[49] ||= m(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Q(e) === null ? (g(), f(c, { key: 1 }, [h(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[50] ||= [m("Unknown", -1)]]),
								_: 1
							}), n[51] ||= m(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Q(e)?.set ? (g(), f(c, { key: 2 }, [
								h(a, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: b(() => [...n[52] ||= [m("Configured", -1)]]),
									_: 1
								}),
								p("span", ot, y(rn(Q(e)?.length ?? 0)), 1),
								m(" Currently set (" + y(Q(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (g(), f(c, { key: 3 }, [h(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[53] ||= [m("Not set", -1)]]),
								_: 1
							}), n[54] ||= m(" No value is stored yet. ", -1)], 64))], 10, at)) : d("", !0)
						], 64)),
						t.description || t.link ? (g(), u(se, {
							key: 2,
							text: t.description,
							links: un(t)
						}, null, 8, ["text", "links"])) : d("", !0),
						cn(t) ? (g(), f("span", st, [n[55] ||= m(" Default: ", -1), p("code", null, y(cn(t)), 1)])) : d("", !0),
						K.value[e] ? (g(), f("span", ct, y(K.value[e]), 1)) : d("", !0)
					]))), 128)),
					X.value ? (g(), f("div", {
						key: 1,
						class: pe(["admin-plugins__test-result", `admin-plugins__test-result--${X.value.tone}`])
					}, [h(a, {
						tone: X.value.tone === "success" ? "success" : X.value.tone === "failure" ? "error" : "neutral",
						class: "admin-plugins__test-state"
					}, {
						default: b(() => [m(y(X.value.tone === "success" ? "Passed" : X.value.tone === "failure" ? "Failed" : "Not supported"), 1)]),
						_: 1
					}, 8, ["tone"]), m(" " + y(X.value.message), 1)], 2)) : d("", !0)
				], 32)) : (g(), u(ae, {
					key: 1,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))]))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-eefe4cc0"]]);
//#endregion
export { lt as default };

//# sourceMappingURL=PluginsPage-BQhsd33o.js.map