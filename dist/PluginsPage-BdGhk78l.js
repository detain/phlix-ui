import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./Modal-CqhoiLRk.js";
import { c as r, f as i, l as ee, t as te } from "./client-BzWwyWKr.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as re } from "./Switch-DyS2L5gX.js";
import { t as ie } from "./Select-Cvp-73pF.js";
import { t as ae } from "./Skeleton-DhQmxeNg.js";
import { t as oe } from "./EmptyState-ZlI5t4KT.js";
import { t as se } from "./PageHint-BoAlFFBN.js";
import { t as ce } from "./HelpText-Ccbgsfz2.js";
import { i as le, r as ue, t as de } from "./plugins-BieHL9VF.js";
import { t as fe } from "./helpLinks-BI4oN4Or.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as pe, inject as me, normalizeClass as he, onMounted as ge, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as _e, vModelDynamic as ve, vModelText as ye, watch as be, withCtx as y, withDirectives as xe, withModifiers as Se } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var Ce = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, we = { class: "admin-plugins__head" }, Te = { class: "admin-plugins__head-actions" }, Ee = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, De = ["href"], Oe = [
	"disabled",
	"aria-label",
	"onClick"
], ke = {
	key: 0,
	class: "admin-plugins__channel",
	role: "group",
	"aria-label": "Catalog release channel"
}, Ae = { class: "admin-plugins__channel-row" }, je = {
	key: 1,
	class: "admin-plugins__install-error",
	role: "alert"
}, Me = { class: "admin-plugins__install-error-body" }, Ne = {
	key: 2,
	class: "admin-plugins__install-error",
	role: "alert"
}, Pe = { class: "admin-plugins__install-error-body" }, Fe = {
	key: 3,
	class: "admin-plugins__skel"
}, Ie = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Le = { class: "admin-plugins__card-head" }, Re = { class: "admin-plugins__card-title" }, ze = { class: "admin-plugins__card-badges" }, Be = {
	key: 0,
	class: "admin-plugins__card-summary"
}, Ve = {
	key: 1,
	class: "admin-plugins__card-tags"
}, He = { class: "admin-plugins__card-actions" }, Ue = ["href"], We = {
	key: 5,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Ge = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Ke = { class: "admin-plugins__mono" }, qe = { class: "admin-plugins__actions" }, Je = { class: "admin-plugins__field" }, Ye = { class: "admin-plugins__field" }, Xe = {
	key: 0,
	class: "admin-plugins__skel"
}, Ze = {
	key: 1,
	class: "admin-plugins__config-body",
	"aria-live": "polite"
}, Qe = {
	key: 0,
	class: "admin-plugins__redirect"
}, $e = ["id"], et = { class: "admin-plugins__redirect-row" }, tt = { class: "admin-plugins__redirect-value" }, nt = {
	class: "admin-plugins__visually-hidden",
	role: "status"
}, rt = {
	key: 0,
	class: "admin-plugins__config-error",
	role: "alert"
}, it = ["for"], at = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true",
	title: "Required"
}, ot = {
	key: 1,
	class: "admin-plugins__optional"
}, st = { class: "admin-plugins__secret-row" }, ct = [
	"id",
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"data-lpignore",
	"data-1p-ignore",
	"data-bwignore",
	"data-form-type",
	"placeholder",
	"disabled",
	"aria-describedby",
	"aria-invalid"
], lt = ["id"], ut = {
	class: "admin-plugins__secret-dots",
	"aria-hidden": "true"
}, dt = {
	key: 3,
	class: "admin-plugins__hint admin-plugins__default-hint"
}, ft = {
	key: 4,
	class: "admin-plugins__error",
	role: "alert"
}, pt = /*#__PURE__*/ e(/* @__PURE__ */ pe({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let pe = e, pt = me("apiBase", ""), mt = c(() => typeof pt == "string" ? pt : pt?.value ?? ""), b = new de(pe.client ?? new te({
			baseUrl: mt.value,
			tokenStore: new r()
		})), x = ne(), ht = g([]), gt = g(!0), S = g(null);
		async function _t() {
			gt.value = !0, S.value = null;
			try {
				ht.value = await b.list();
			} catch (e) {
				S.value = i(e, "Failed to load plugins."), x.error(S.value);
			} finally {
				gt.value = !1;
			}
		}
		let C = g({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), vt = g(!0);
		async function w() {
			vt.value = !0;
			try {
				C.value = await b.catalog();
			} catch (e) {
				x.error(i(e, "Failed to load the plugin catalog."));
			} finally {
				vt.value = !1;
			}
		}
		async function T() {
			await Promise.all([_t(), w()]);
		}
		let E = g("stable"), D = g([]), yt = g(!1), bt = c(() => D.value.map((e) => ({
			value: e.value,
			label: e.label
		}))), O = c(() => D.value.find((e) => e.value === E.value) ?? null);
		async function xt() {
			try {
				let e = await b.getChannel();
				E.value = e.channel, D.value = e.options;
			} catch {}
		}
		async function St(e) {
			let t = String(e);
			if (t === E.value || yt.value) return;
			let n = E.value;
			E.value = t, yt.value = !0;
			try {
				let e = await b.setChannel(t);
				E.value = e.channel, e.options.length > 0 && (D.value = e.options);
				let n = O.value?.label;
				x.success(n ? `Catalog channel set to ${n}.` : "Catalog channel updated."), await w();
			} catch (e) {
				E.value = n, x.error(i(e, "Failed to change the catalog channel."));
			} finally {
				yt.value = !1;
			}
		}
		let Ct = c(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of C.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), wt = c(() => new Set(Ct.value.map((e) => e.name))), Tt = c(() => ht.value.filter((e) => !wt.value.has(e.name)));
		function Et(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function k(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let A = g(!1), j = g(""), Dt = g(!1);
		function Ot(e) {
			switch (ue(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return i(e, "Install failed — the plugin could not be downloaded or read.");
				default: return i(e, "Failed to install plugin.");
			}
		}
		function kt() {
			j.value = "", A.value = !0;
		}
		function At() {
			A.value = !1, j.value = "";
		}
		let M = g(null);
		function jt(e) {
			let t = Ot(e);
			M.value = t, x.error(t);
		}
		async function Mt() {
			let e = j.value.trim();
			if (!e) {
				x.error("A plugin URL is required.");
				return;
			}
			Dt.value = !0, M.value = null;
			try {
				await b.install(e), x.success("Plugin installed."), At(), await T();
			} catch (e) {
				jt(e);
			} finally {
				Dt.value = !1;
			}
		}
		let Nt = g(null);
		async function Pt(e) {
			if (Nt.value === null) {
				Nt.value = e.repo, M.value = null;
				try {
					await b.install(e.repo), x.success(`${e.title} installed.`), await T();
				} catch (e) {
					jt(e);
				} finally {
					Nt.value = null;
				}
			}
		}
		let Ft = g(!1), N = g(""), It = g(!1), Lt = g(null);
		function Rt() {
			N.value = "", Ft.value = !0;
		}
		function zt() {
			Ft.value = !1, N.value = "";
		}
		async function Bt() {
			let e = N.value.trim();
			if (!e) {
				x.error("A catalog URL is required.");
				return;
			}
			It.value = !0;
			try {
				await b.addCatalogSource(e), x.success("Catalog added."), zt(), await w();
			} catch (e) {
				let t = ue(e);
				x.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : i(e, "Failed to add catalog."));
			} finally {
				It.value = !1;
			}
		}
		async function Vt(e) {
			if (Lt.value === null) {
				Lt.value = e;
				try {
					await b.removeCatalogSource(e), x.success("Catalog removed."), await w();
				} catch (e) {
					x.error(i(e, "Failed to remove catalog."));
				} finally {
					Lt.value = null;
				}
			}
		}
		let P = g({}), Ht = g(!1), F = g(!1), I = g(null), L = g(!1), Ut = c(() => Object.values(P.value).filter((e) => e.update_available).length);
		function R(e) {
			let t = P.value[e];
			return t && t.update_available ? t : null;
		}
		function Wt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			P.value = t;
		}
		function Gt(e) {
			if (e in P.value) {
				let t = { ...P.value };
				delete t[e], P.value = t;
			}
		}
		async function Kt() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					let e = await b.checkUpdates();
					Wt(e.updates), L.value = e.auto_update;
					let t = Ut.value;
					x.success(t > 0 ? `${t} update${t === 1 ? "" : "s"} available.` : "All plugins are up to date.");
				} catch (e) {
					x.error(i(e, "Failed to check for updates."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		function qt(e) {
			switch (ue(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return i(e, "Update failed — the new version could not be downloaded or read.");
				default: return i(e, "Failed to update plugin.");
			}
		}
		async function Jt(e) {
			if (I.value === null) {
				I.value = e.name, z.value = null;
				try {
					await b.updatePlugin(e.name), x.success(`${e.name} updated.`), Gt(e.name), await T();
				} catch (t) {
					z.value = {
						title: `Couldn't update ${e.name}`,
						message: qt(t)
					}, x.error(qt(t));
				} finally {
					I.value = null;
				}
			}
		}
		async function Yt() {
			if (!F.value) {
				F.value = !0;
				try {
					let e = await b.updateAll();
					e.failed.length > 0 ? x.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : x.success(`${e.updated.length} plugin${e.updated.length === 1 ? "" : "s"} updated.`), await T();
					let t = await b.checkUpdates();
					Wt(t.updates), L.value = t.auto_update;
				} catch (e) {
					x.error(i(e, "Failed to apply updates."));
				} finally {
					F.value = !1;
				}
			}
		}
		async function Xt(e) {
			let t = L.value;
			L.value = e;
			try {
				L.value = await b.setAutoUpdate(e), x.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				L.value = t, x.error(i(e, "Failed to change auto-update."));
			}
		}
		let z = g(null);
		function Zt(e, t, n) {
			let r = i(t, n);
			z.value = {
				title: e,
				message: r
			}, x.error(r);
		}
		let B = g(null);
		async function Qt(e, t) {
			if (B.value === null) {
				B.value = e.name, z.value = null;
				try {
					t ? (await b.enable(e.name), x.success(`${e.name} enabled.`)) : (await b.disable(e.name), x.success(`${e.name} disabled.`)), await T();
				} catch (n) {
					Zt(t ? `Couldn't enable ${e.name}` : `Couldn't disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					B.value = null;
				}
			}
		}
		let V = g(null);
		async function $t() {
			let e = V.value;
			if (e) try {
				await b.uninstall(e.name), x.success(`${e.name} uninstalled.`), V.value = null, await T();
			} catch (t) {
				Zt(`Couldn't uninstall ${e.name}`, t, "Failed to uninstall plugin."), V.value = null;
			}
		}
		let H = g(null), U = g(null), en = g(!1), tn = g(!1), W = g({}), nn = g({}), G = g({}), K = g(null), q = g(""), J = g({}), Y = g(null), X = g(!1);
		function rn() {
			Y.value = null;
		}
		be([W, J], rn, { deep: !0 });
		let an = c(() => H.value ? `Configure — ${H.value.name}` : "Configure plugin"), on = c(() => U.value ? Object.entries(U.value.settings_schema) : []), sn = c(() => on.value.length > 0), cn = c(() => U.value?.redirect_url ?? "");
		async function ln() {
			let e = cn.value;
			if (e) try {
				await navigator.clipboard.writeText(e), q.value = "Redirect URL copied to clipboard.", x.success("Redirect URL copied to clipboard.");
			} catch {
				q.value = "Could not copy the redirect URL. Copy it manually instead.", x.error("Failed to copy the redirect URL.");
			}
		}
		function un(e) {
			return `plugin-secret-status-${e}`;
		}
		function dn(e) {
			return e.type === "array" || e.type === "object";
		}
		function fn(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function pn(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function mn(e, t) {
			if (pn(e)) return t === !0 || t === 1 || t === "1" || t === "true";
			if (e.secret) return "";
			if (t == null) {
				let t = e.default === void 0 ? "" : e.default;
				return dn(e) && t !== "" ? JSON.stringify(t) : t;
			}
			return dn(e) && typeof t != "string" ? JSON.stringify(t) : t;
		}
		function Z(e) {
			return U.value?.secret_status?.[e] ?? null;
		}
		function hn(e) {
			return "•".repeat(Math.max(1, Math.min(e, 32)));
		}
		function Q(e) {
			return J.value[e] === !0;
		}
		function gn(e, t) {
			return t.secret && Z(e)?.set !== !1;
		}
		function _n(e) {
			J.value[e] = !0, W.value[e] = "";
		}
		function vn(e) {
			delete J.value[e];
		}
		function yn(e) {
			if (e.secret || !("default" in e)) return null;
			let t = e.default;
			return t == null || t === "" ? null : typeof t == "boolean" ? t ? "on" : "off" : String(t);
		}
		function bn(e) {
			return e.link_text && e.link_text.trim() !== "" ? e.link_text : "Where to get this";
		}
		function xn(e) {
			if (e.link) return [{
				text: bn(e),
				url: e.link
			}];
		}
		async function Sn(e) {
			H.value = e, U.value = null, W.value = {}, nn.value = {}, G.value = {}, K.value = null, q.value = "", J.value = {}, rn(), en.value = !0;
			try {
				let t = await b.get(e.name);
				U.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = mn(r, t.settings[e]);
				W.value = n, nn.value = { ...n };
			} catch (e) {
				x.error(i(e, "Failed to load plugin settings.")), H.value = null;
			} finally {
				en.value = !1;
			}
		}
		function $() {
			H.value = null, U.value = null, W.value = {}, nn.value = {}, G.value = {}, K.value = null, q.value = "", J.value = {}, rn();
		}
		function Cn() {
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
				r !== nn.value[t] && (e[t] = wn(n, r));
			}
			return e;
		}
		function wn(e, t) {
			if (pn(e)) return t === !0;
			if (t === "" || t == null) return null;
			if (fn(e) === "number") return Number(t);
			if (dn(e)) try {
				return JSON.parse(String(t));
			} catch {
				return t;
			}
			return t;
		}
		async function Tn() {
			let e = H.value;
			if (!e) return;
			G.value = {}, K.value = null;
			let t = Cn();
			if (Object.keys(t).length === 0) {
				x.success("No changes to save."), $();
				return;
			}
			tn.value = !0;
			try {
				await b.updateSettings(e.name, t), x.success("Settings saved."), $(), await T();
			} catch (e) {
				let t = le(e);
				Object.keys(t).length > 0 ? (G.value = t, K.value = "Please fix the errors below and try again.", x.error("Some settings could not be saved — check the highlighted fields.")) : (K.value = i(e, "Failed to save settings."), x.error(K.value));
			} finally {
				tn.value = !1;
			}
		}
		async function En() {
			let e = H.value;
			if (!(!e || X.value)) {
				rn(), X.value = !0;
				try {
					let t = await b.testCredentials(e.name, Cn());
					Y.value = {
						tone: t.success ? "success" : "failure",
						message: t.message || (t.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (e) {
					ue(e) === "plugin.test_not_supported" || e instanceof ee && e.status === 501 ? Y.value = {
						tone: "unsupported",
						message: "This plugin does not support testing credentials."
					} : Y.value = {
						tone: "failure",
						message: i(e, "Could not run the credential test.")
					};
				} finally {
					X.value = !1;
				}
			}
		}
		async function Dn() {
			try {
				L.value = await b.getAutoUpdate();
			} catch {}
		}
		return ge(() => {
			_t(), w(), Dn(), xt();
		}), (e, r) => (h(), d("section", Ce, [
			f("header", we, [r[12] ||= f("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), f("div", Te, [
				m(re, {
					"model-value": L.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": Xt
				}, null, 8, ["model-value"]),
				r[11] ||= f("span", { class: "admin-plugins__head-spacer" }, null, -1),
				m(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: Ht.value,
					onClick: Kt
				}, {
					default: y(() => [...r[8] ||= [p(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				Ut.value > 0 ? (h(), l(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: F.value,
					onClick: Yt
				}, {
					default: y(() => [p(" Update all (" + v(Ut.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : u("", !0),
				m(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: Rt
				}, {
					default: y(() => [...r[9] ||= [p("Add catalog", -1)]]),
					_: 1
				}),
				m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: kt
				}, {
					default: y(() => [...r[10] ||= [p("Install from URL", -1)]]),
					_: 1
				})
			])]),
			m(se, {
				links: _e(fe).plugins.links,
				details: _e(fe).plugins.details
			}, {
				default: y(() => [...r[13] ||= [
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
			}, 8, ["links", "details"]),
			f("div", Ee, [r[14] ||= f("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (h(!0), d(s, null, _(C.value.sources, (e) => (h(), l(o, {
				key: e,
				tone: "neutral"
			}, {
				default: y(() => [f("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, v(Et(e)), 9, De), e === C.value.default_source ? u("", !0) : (h(), d("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: Lt.value === e,
					"aria-label": `Remove catalog ${Et(e)}`,
					onClick: (t) => Vt(e)
				}, " × ", 8, Oe))]),
				_: 2
			}, 1024))), 128))]),
			D.value.length > 0 ? (h(), d("div", ke, [f("div", Ae, [
				r[16] ||= f("span", { class: "admin-plugins__channel-label" }, "Catalog channel", -1),
				m(ie, {
					"model-value": E.value,
					options: bt.value,
					disabled: yt.value,
					label: "Catalog channel",
					class: "admin-plugins__channel-select",
					"onUpdate:modelValue": St
				}, null, 8, [
					"model-value",
					"options",
					"disabled"
				]),
				O.value?.advanced ? (h(), l(o, {
					key: 0,
					tone: "warning"
				}, {
					default: y(() => [...r[15] ||= [p("Opt-in · advanced", -1)]]),
					_: 1
				})) : u("", !0)
			]), O.value?.description ? (h(), d("p", {
				key: 0,
				class: he(["admin-plugins__channel-desc", { "is-advanced": O.value.advanced }])
			}, [O.value.advanced ? (h(), l(t, {
				key: 0,
				name: "alert",
				class: "admin-plugins__channel-desc-icon"
			})) : u("", !0), f("span", null, v(O.value.description), 1)], 2)) : u("", !0)])) : u("", !0),
			M.value ? (h(), d("div", je, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Me, [r[17] ||= f("strong", null, "Couldn't install the plugin.", -1), f("span", null, v(M.value), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: r[0] ||= (e) => M.value = null
				}, " × ")
			])) : u("", !0),
			z.value ? (h(), d("div", Ne, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Pe, [f("strong", null, v(z.value.title) + ".", 1), f("span", null, v(z.value.message), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: r[1] ||= (e) => z.value = null
				}, " × ")
			])) : u("", !0),
			vt.value ? (h(), d("div", Fe, [m(ae, {
				variant: "text",
				lines: 5
			})])) : (h(), d(s, { key: 4 }, [(h(!0), d(s, null, _(C.value.errors, (e) => (h(), d("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				r[18] ||= p(" Couldn't load catalog ", -1),
				f("strong", null, v(Et(e.source)), 1),
				p(" — " + v(e.error), 1)
			]))), 128)), Ct.value.length === 0 && C.value.errors.length === 0 ? (h(), l(oe, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: y(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: kt
				}, {
					default: y(() => [...r[19] ||= [p("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d("ul", Ie, [(h(!0), d(s, null, _(Ct.value, (e) => (h(), d("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				f("div", Le, [f("h3", Re, v(e.title), 1), f("div", ze, [
					e.type ? (h(), l(o, {
						key: 0,
						tone: "info"
					}, {
						default: y(() => [p(v(e.type), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.installed ? (h(), l(o, {
						key: 1,
						tone: "success"
					}, {
						default: y(() => [...r[20] ||= [p("Installed", -1)]]),
						_: 1
					})) : u("", !0),
					R(e.name) ? (h(), l(o, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: y(() => [p(" Update → v" + v(R(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)
				])]),
				e.summary || e.description ? (h(), d("p", Be, v(e.summary || e.description), 1)) : u("", !0),
				e.tags.length ? (h(), d("div", Ve, [(h(!0), d(s, null, _(e.tags, (e) => (h(), d("span", {
					key: e,
					class: "admin-plugins__tag"
				}, v(e), 1))), 128))])) : u("", !0),
				f("div", He, [e.installed ? (h(), d(s, { key: 0 }, [
					m(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: B.value === e.name,
						"onUpdate:modelValue": (t) => Qt(k(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					r[24] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					R(e.name) ? (h(), l(a, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: I.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => Jt(k(e))
					}, {
						default: y(() => [...r[21] ||= [p(" Update ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])) : u("", !0),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => Sn(k(e))
					}, {
						default: y(() => [...r[22] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => V.value = k(e)
					}, {
						default: y(() => [...r[23] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (h(), d(s, { key: 1 }, [
					m(a, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: Nt.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => Pt(e)
					}, {
						default: y(() => [...r[25] ||= [p(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					r[26] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					f("a", {
						class: "admin-plugins__repo-link",
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, Ue)
				], 64))])
			]))), 128))]))], 64)),
			Tt.value.length ? (h(), d("section", We, [
				r[31] ||= f("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				r[32] ||= f("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				f("table", Ge, [r[30] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Name"),
					f("th", { scope: "col" }, "Version"),
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Enabled"),
					f("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), f("tbody", null, [(h(!0), d(s, null, _(Tt.value, (e) => (h(), d("tr", { key: e.name }, [
					f("td", null, v(e.name), 1),
					f("td", Ke, [p(v(e.version) + " ", 1), R(e.name) ? (h(), l(o, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: y(() => [p(" → v" + v(R(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)]),
					f("td", null, [m(o, { tone: "info" }, {
						default: y(() => [p(v(e.type), 1)]),
						_: 2
					}, 1024)]),
					f("td", null, [m(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: B.value === e.name,
						"onUpdate:modelValue": (t) => Qt(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					f("td", null, [f("div", qe, [
						R(e.name) ? (h(), l(a, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: I.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => Jt(e)
						}, {
							default: y(() => [...r[27] ||= [p(" Update ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])) : u("", !0),
						m(a, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Configure ${e.name}`,
							onClick: (t) => Sn(e)
						}, {
							default: y(() => [...r[28] ||= [p(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						m(a, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => V.value = e
						}, {
							default: y(() => [...r[29] ||= [p(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : u("", !0),
			S.value && !gt.value ? (h(), l(oe, {
				key: 6,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: S.value
			}, {
				actions: y(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: _t
				}, {
					default: y(() => [...r[33] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(n, {
				modelValue: A.value,
				"onUpdate:modelValue": r[3] ||= (e) => A.value = e,
				title: "Install from URL",
				onClose: At
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: At
				}, {
					default: y(() => [...r[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: Dt.value,
					onClick: Mt
				}, {
					default: y(() => [...r[37] ||= [p("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Se(Mt, ["prevent"])
				}, [f("label", Je, [
					r[34] ||= f("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					xe(f("input", {
						"onUpdate:modelValue": r[2] ||= (e) => j.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[ye, j.value]]),
					r[35] ||= f("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(n, {
				modelValue: Ft.value,
				"onUpdate:modelValue": r[5] ||= (e) => Ft.value = e,
				title: "Add catalog",
				onClose: zt
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: zt
				}, {
					default: y(() => [...r[40] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: It.value,
					onClick: Bt
				}, {
					default: y(() => [...r[41] ||= [p("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Se(Bt, ["prevent"])
				}, [f("label", Ye, [
					r[38] ||= f("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					xe(f("input", {
						"onUpdate:modelValue": r[4] ||= (e) => N.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[ye, N.value]]),
					r[39] ||= f("span", { class: "admin-plugins__hint" }, [
						p(" A repository (or direct "),
						f("code", null, "plugins.json"),
						p(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(n, {
				"model-value": V.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": r[7] ||= (e) => V.value = null
			}, {
				footer: y(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: r[6] ||= (e) => V.value = null
				}, {
					default: y(() => [...r[44] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					onClick: $t
				}, {
					default: y(() => [...r[45] ||= [p("Uninstall", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					r[42] ||= p(" Uninstall ", -1),
					f("strong", null, v(V.value?.name), 1),
					r[43] ||= p("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(n, {
				"model-value": H.value !== null,
				title: an.value,
				size: "xl",
				"onUpdate:modelValue": $
			}, {
				footer: y(() => [
					m(a, {
						variant: "ghost",
						size: "sm",
						onClick: $
					}, {
						default: y(() => [...r[58] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					sn.value ? (h(), l(a, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: X.value,
						disabled: X.value || tn.value,
						"aria-label": `Test the credentials for ${H.value?.name}`,
						onClick: En
					}, {
						default: y(() => [...r[59] ||= [p(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : u("", !0),
					sn.value ? (h(), l(a, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: tn.value,
						onClick: Tn
					}, {
						default: y(() => [...r[60] ||= [p(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : u("", !0)
				]),
				default: y(() => [en.value ? (h(), d("div", Xe, [m(ae, {
					variant: "text",
					lines: 4
				})])) : (h(), d("div", Ze, [cn.value ? (h(), d("div", Qe, [
					f("span", {
						id: `plugin-redirect-url-${H.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, $e),
					f("div", et, [f("code", tt, v(cn.value), 1), m(a, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${H.value?.name}`,
						onClick: ln
					}, {
						default: y(() => [...r[46] ||= [p(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					r[47] ||= f("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					f("span", nt, v(q.value), 1)
				])) : u("", !0), sn.value ? (h(), d("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: Se(Tn, ["prevent"])
				}, [
					K.value ? (h(), d("div", rt, v(K.value), 1)) : u("", !0),
					(h(!0), d(s, null, _(on.value, ([e, t]) => (h(), d("div", {
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
							}, [p(v(t.label || e) + " ", 1), t.required ? (h(), d("span", at, "*")) : (h(), d("span", ot, "optional"))], 8, it),
							f("div", st, [xe(f("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => W.value[e] = t,
								type: t.secret ? "password" : fn(t),
								class: he(["admin-plugins__input", { "is-invalid": G.value[e] }]),
								autocomplete: t.secret ? "new-password" : "off",
								"data-lpignore": t.secret ? "true" : void 0,
								"data-1p-ignore": t.secret ? "" : void 0,
								"data-bwignore": t.secret ? "" : void 0,
								"data-form-type": t.secret ? "other" : void 0,
								placeholder: t.secret ? Q(e) ? "Will be removed on save" : Z(e) === null ? "Leave blank to keep whatever is stored" : Z(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: t.secret && Q(e),
								"aria-describedby": t.secret ? un(e) : void 0,
								"aria-invalid": G.value[e] ? "true" : void 0
							}, null, 10, ct), [[ve, W.value[e]]]), t.secret && Q(e) ? (h(), l(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${t.label || e}`,
								onClick: (t) => vn(e)
							}, {
								default: y(() => [...r[48] ||= [p(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : gn(e, t) ? (h(), l(a, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${t.label || e}`,
								onClick: (t) => _n(e)
							}, {
								default: y(() => [...r[49] ||= [p(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : u("", !0)]),
							t.secret ? (h(), d("span", {
								key: 0,
								id: un(e),
								class: he(["admin-plugins__secret-status", { "is-set": Z(e)?.set }])
							}, [Q(e) ? (h(), d(s, { key: 0 }, [m(o, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...r[50] ||= [p("Will be removed", -1)]]),
								_: 1
							}), r[51] ||= p(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Z(e) === null ? (h(), d(s, { key: 1 }, [m(o, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...r[52] ||= [p("Unknown", -1)]]),
								_: 1
							}), r[53] ||= p(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Z(e)?.set ? (h(), d(s, { key: 2 }, [
								m(o, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: y(() => [...r[54] ||= [p("Configured", -1)]]),
									_: 1
								}),
								f("span", ut, v(hn(Z(e)?.length ?? 0)), 1),
								p(" Currently set (" + v(Z(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (h(), d(s, { key: 3 }, [m(o, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...r[55] ||= [p("Not set", -1)]]),
								_: 1
							}), r[56] ||= p(" No value is stored yet. ", -1)], 64))], 10, lt)) : u("", !0)
						], 64)),
						t.description || t.link ? (h(), l(ce, {
							key: 2,
							text: t.description,
							links: xn(t)
						}, null, 8, ["text", "links"])) : u("", !0),
						yn(t) ? (h(), d("span", dt, [r[57] ||= p(" Default: ", -1), f("code", null, v(yn(t)), 1)])) : u("", !0),
						G.value[e] ? (h(), d("span", ft, v(G.value[e]), 1)) : u("", !0)
					]))), 128)),
					Y.value ? (h(), d("div", {
						key: 1,
						class: he(["admin-plugins__test-result", `admin-plugins__test-result--${Y.value.tone}`])
					}, [m(o, {
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
}), [["__scopeId", "data-v-8113c840"]]);
//#endregion
export { pt as default };

//# sourceMappingURL=PluginsPage-BdGhk78l.js.map