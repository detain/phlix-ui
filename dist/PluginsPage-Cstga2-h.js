import { t as e, v as t, x as n } from "./client-57OweUrJ.js";
import { i as r, r as i, t as ee } from "./plugins-Ci522ABX.js";
import { t as te } from "./useToastStore-Bu-iYU7r.js";
import { n as ne, t as re } from "./Icon-CIbfiPrs.js";
import { t as a } from "./Badge-C6LNO9Kk.js";
import { t as ie } from "./PageHint-BlhPmafC.js";
import { t as ae } from "./helpLinks-iarZuNmw.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as oe } from "./Modal-BU4hJGBA.js";
import { t as se } from "./Switch-C1Wv5sN2.js";
import { t as ce } from "./Select-ChFXd0gU.js";
import { t as le } from "./Skeleton-B2Mt2L00.js";
import { t as ue } from "./EmptyState-BjOJ1k_A.js";
import { t as de } from "./HelpText-CyBorC6S.js";
import { a as fe } from "./plural-B3O2rVPV.js";
import { t as pe } from "./safeHref-CxjNgvYf.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as me, inject as he, normalizeClass as ge, onMounted as _e, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as ve, vModelDynamic as ye, vModelText as be, watch as xe, withCtx as y, withDirectives as Se, withModifiers as Ce } from "vue";
// src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var we = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, Te = { class: "admin-plugins__head" }, Ee = { class: "admin-plugins__head-actions" }, De = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, Oe = ["href"], ke = [
	"disabled",
	"aria-label",
	"onClick"
], Ae = {
	key: 0,
	class: "admin-plugins__channel",
	role: "group",
	"aria-label": "Catalog release channel"
}, je = { class: "admin-plugins__channel-row" }, Me = {
	key: 1,
	class: "admin-plugins__install-error",
	role: "alert"
}, Ne = { class: "admin-plugins__install-error-body" }, Pe = {
	key: 2,
	class: "admin-plugins__install-error",
	role: "alert"
}, Fe = { class: "admin-plugins__install-error-body" }, Ie = {
	key: 3,
	class: "admin-plugins__skel"
}, Le = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Re = { class: "admin-plugins__card-head" }, ze = { class: "admin-plugins__card-title" }, Be = { class: "admin-plugins__card-badges" }, Ve = {
	key: 0,
	class: "admin-plugins__card-summary"
}, He = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Ue = { class: "admin-plugins__card-actions" }, We = ["href"], Ge = {
	key: 5,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Ke = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, qe = { class: "admin-plugins__mono" }, Je = { class: "admin-plugins__actions" }, Ye = { class: "admin-plugins__field" }, Xe = { class: "admin-plugins__field" }, Ze = {
	key: 0,
	class: "admin-plugins__skel"
}, Qe = {
	key: 1,
	class: "admin-plugins__config-body",
	"aria-live": "polite"
}, $e = {
	key: 0,
	class: "admin-plugins__redirect"
}, et = ["id"], tt = { class: "admin-plugins__redirect-row" }, nt = { class: "admin-plugins__redirect-value" }, rt = {
	class: "admin-plugins__visually-hidden",
	role: "status"
}, it = {
	key: 0,
	class: "admin-plugins__config-error",
	role: "alert"
}, at = ["for"], ot = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true",
	title: "Required"
}, st = {
	key: 1,
	class: "admin-plugins__optional"
}, ct = { class: "admin-plugins__secret-row" }, lt = [
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
], ut = ["id"], dt = {
	class: "admin-plugins__secret-dots",
	"aria-hidden": "true"
}, ft = {
	key: 3,
	class: "admin-plugins__hint admin-plugins__default-hint"
}, pt = {
	key: 4,
	class: "admin-plugins__error",
	role: "alert"
}, mt = /*#__PURE__*/ ne(/* @__PURE__ */ me({
	__name: "PluginsPage",
	props: { client: {} },
	setup(ne) {
		let me = ne, mt = he("apiBase", ""), ht = c(() => typeof mt == "string" ? mt : mt?.value ?? ""), b = new ee(me.client ?? new e({ baseUrl: ht.value })), x = te(), gt = g([]), _t = g(!0), S = g(null);
		async function vt() {
			_t.value = !0, S.value = null;
			try {
				gt.value = await b.list();
			} catch (e) {
				S.value = n(e, "Failed to load plugins."), x.error(S.value);
			} finally {
				_t.value = !1;
			}
		}
		let C = g({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), yt = g(!0);
		async function w() {
			yt.value = !0;
			try {
				C.value = await b.catalog();
			} catch (e) {
				x.error(n(e, "Failed to load the plugin catalog."));
			} finally {
				yt.value = !1;
			}
		}
		async function T() {
			await Promise.all([vt(), w()]);
		}
		let E = g("stable"), D = g([]), bt = g(!1), xt = c(() => D.value.map((e) => ({
			value: e.value,
			label: e.label
		}))), O = c(() => D.value.find((e) => e.value === E.value) ?? null);
		async function St() {
			try {
				let e = await b.getChannel();
				E.value = e.channel, D.value = e.options;
			} catch {}
		}
		async function Ct(e) {
			let t = String(e);
			if (t === E.value || bt.value) return;
			let r = E.value;
			E.value = t, bt.value = !0;
			try {
				let e = await b.setChannel(t);
				E.value = e.channel, e.options.length > 0 && (D.value = e.options);
				let n = O.value?.label;
				x.success(n ? `Catalog channel set to ${n}.` : "Catalog channel updated."), await w();
			} catch (e) {
				E.value = r, x.error(n(e, "Failed to change the catalog channel."));
			} finally {
				bt.value = !1;
			}
		}
		let wt = c(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of C.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), Tt = c(() => new Set(wt.value.map((e) => e.name))), Et = c(() => gt.value.filter((e) => !Tt.value.has(e.name)));
		function Dt(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function Ot(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let k = g(!1), A = g(""), kt = g(!1);
		function At(e) {
			switch (i(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return n(e, "Install failed — the plugin could not be downloaded or read.");
				default: return n(e, "Failed to install plugin.");
			}
		}
		function jt() {
			A.value = "", k.value = !0;
		}
		function Mt() {
			k.value = !1, A.value = "";
		}
		let j = g(null);
		function Nt(e) {
			let t = At(e);
			j.value = t, x.error(t);
		}
		async function Pt() {
			let e = A.value.trim();
			if (!e) x.error("A plugin URL is required.");
			else {
				kt.value = !0, j.value = null;
				try {
					await b.install(e), x.success("Plugin installed."), Mt(), await T();
				} catch (e) {
					Nt(e);
				} finally {
					kt.value = !1;
				}
			}
		}
		let Ft = g(null);
		async function It(e) {
			if (Ft.value === null) {
				Ft.value = e.repo, j.value = null;
				try {
					await b.install(e.repo), x.success(`${e.title} installed.`), await T();
				} catch (e) {
					Nt(e);
				} finally {
					Ft.value = null;
				}
			}
		}
		let Lt = g(!1), M = g(""), Rt = g(!1), N = g(null);
		function zt() {
			M.value = "", Lt.value = !0;
		}
		function Bt() {
			Lt.value = !1, M.value = "";
		}
		async function Vt() {
			let e = M.value.trim();
			if (!e) x.error("A catalog URL is required.");
			else {
				Rt.value = !0;
				try {
					await b.addCatalogSource(e), x.success("Catalog added."), Bt(), await w();
				} catch (e) {
					let t = i(e);
					x.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : n(e, "Failed to add catalog."));
				} finally {
					Rt.value = !1;
				}
			}
		}
		async function Ht(e) {
			if (N.value === null) {
				N.value = e;
				try {
					await b.removeCatalogSource(e), x.success("Catalog removed."), await w();
				} catch (e) {
					x.error(n(e, "Failed to remove catalog."));
				} finally {
					N.value = null;
				}
			}
		}
		let P = g({}), F = g(!1), Ut = g(!1), I = g(null), L = g(!1), Wt = c(() => Object.values(P.value).filter((e) => e.update_available).length);
		function R(e) {
			let t = P.value[e];
			return t && t.update_available ? t : null;
		}
		function Gt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			P.value = t;
		}
		function Kt(e) {
			if (e in P.value) {
				let t = { ...P.value };
				delete t[e], P.value = t;
			}
		}
		async function qt() {
			if (!F.value) {
				F.value = !0;
				try {
					let e = await b.checkUpdates();
					Gt(e.updates), L.value = e.auto_update;
					let t = Wt.value;
					x.success(t > 0 ? `${fe(t, "update", "updates")} available.` : "All plugins are up to date.");
				} catch (e) {
					x.error(n(e, "Failed to check for updates."));
				} finally {
					F.value = !1;
				}
			}
		}
		function Jt(e) {
			switch (i(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return n(e, "Update failed — the new version could not be downloaded or read.");
				default: return n(e, "Failed to update plugin.");
			}
		}
		async function Yt(e) {
			if (I.value === null) {
				I.value = e.name, z.value = null;
				try {
					await b.updatePlugin(e.name), x.success(`${e.name} updated.`), Kt(e.name), await T();
				} catch (t) {
					z.value = {
						title: `Couldn’t update ${e.name}`,
						message: Jt(t)
					}, x.error(Jt(t));
				} finally {
					I.value = null;
				}
			}
		}
		async function Xt() {
			if (!Ut.value) {
				Ut.value = !0;
				try {
					let e = await b.updateAll();
					e.failed.length > 0 ? x.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : x.success(`${fe(e.updated.length, "plugin", "plugins")} updated.`), await T();
					let t = await b.checkUpdates();
					Gt(t.updates), L.value = t.auto_update;
				} catch (e) {
					x.error(n(e, "Failed to apply updates."));
				} finally {
					Ut.value = !1;
				}
			}
		}
		async function Zt(e) {
			let t = L.value;
			L.value = e;
			try {
				L.value = await b.setAutoUpdate(e), x.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				L.value = t, x.error(n(e, "Failed to change auto-update."));
			}
		}
		let z = g(null);
		function Qt(e, t, r) {
			let i = n(t, r);
			z.value = {
				title: e,
				message: i
			}, x.error(i);
		}
		let B = g(null);
		async function $t(e, t) {
			if (B.value === null) {
				B.value = e.name, z.value = null;
				try {
					t ? (await b.enable(e.name), x.success(`${e.name} enabled.`)) : (await b.disable(e.name), x.success(`${e.name} disabled.`)), await T();
				} catch (n) {
					Qt(t ? `Couldn’t enable ${e.name}` : `Couldn’t disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					B.value = null;
				}
			}
		}
		let V = g(null);
		async function en() {
			let e = V.value;
			if (e) try {
				await b.uninstall(e.name), x.success(`${e.name} uninstalled.`), V.value = null, await T();
			} catch (t) {
				Qt(`Couldn’t uninstall ${e.name}`, t, "Failed to uninstall plugin."), V.value = null;
			}
		}
		let H = g(null), U = g(null), tn = g(!1), nn = g(!1), W = g({}), rn = g({}), G = g({}), K = g(null), q = g(""), J = g({}), Y = g(null), X = g(!1);
		function an() {
			Y.value = null;
		}
		xe([W, J], an, { deep: !0 });
		let on = c(() => H.value ? `Configure — ${H.value.name}` : "Configure plugin"), sn = c(() => U.value ? Object.entries(U.value.settings_schema) : []), cn = c(() => sn.value.length > 0), ln = c(() => U.value?.redirect_url ?? "");
		async function un() {
			let e = ln.value;
			if (e) try {
				await navigator.clipboard.writeText(e), q.value = "Redirect URL copied to clipboard.", x.success("Redirect URL copied to clipboard.");
			} catch {
				q.value = "Could not copy the redirect URL. Copy it manually instead.", x.error("Failed to copy the redirect URL.");
			}
		}
		function dn(e) {
			return `plugin-secret-status-${e}`;
		}
		function fn(e) {
			return e.type === "array" || e.type === "object";
		}
		function pn(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function mn(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function hn(e, t) {
			if (mn(e)) return t === !0 || t === 1 || t === "1" || t === "true";
			if (e.secret) return "";
			if (t == null) {
				let t = e.default === void 0 ? "" : e.default;
				return fn(e) && t !== "" ? JSON.stringify(t) : t;
			}
			return fn(e) && typeof t != "string" ? JSON.stringify(t) : t;
		}
		function Z(e) {
			return U.value?.secret_status?.[e] ?? null;
		}
		function gn(e) {
			return "•".repeat(Math.max(1, Math.min(e, 32)));
		}
		function Q(e) {
			return J.value[e] === !0;
		}
		function _n(e, t) {
			return t.secret && Z(e)?.set !== !1;
		}
		function vn(e) {
			J.value[e] = !0, W.value[e] = "";
		}
		function yn(e) {
			delete J.value[e];
		}
		function bn(e) {
			if (e.secret || !("default" in e)) return null;
			let t = e.default;
			return t == null || t === "" ? null : typeof t == "boolean" ? t ? "on" : "off" : String(t);
		}
		function xn(e) {
			return e.link_text && e.link_text.trim() !== "" ? e.link_text : "Where to get this";
		}
		function Sn(e) {
			if (e.link) return [{
				text: xn(e),
				url: e.link
			}];
		}
		async function Cn(e) {
			H.value = e, U.value = null, W.value = {}, rn.value = {}, G.value = {}, K.value = null, q.value = "", J.value = {}, an(), tn.value = !0;
			try {
				let t = await b.get(e.name);
				U.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = hn(r, t.settings[e]);
				W.value = n, rn.value = { ...n };
			} catch (e) {
				x.error(n(e, "Failed to load plugin settings.")), H.value = null;
			} finally {
				tn.value = !1;
			}
		}
		function $() {
			H.value = null, U.value = null, W.value = {}, rn.value = {}, G.value = {}, K.value = null, q.value = "", J.value = {}, an();
		}
		function wn() {
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
				} else r !== rn.value[t] && (e[t] = Tn(n, r));
			}
			return e;
		}
		function Tn(e, t) {
			if (mn(e)) return t === !0;
			if (t === "" || t == null) return null;
			if (pn(e) === "number") return Number(t);
			if (fn(e)) try {
				return JSON.parse(String(t));
			} catch {
				return t;
			}
			return t;
		}
		async function En() {
			let e = H.value;
			if (!e) return;
			G.value = {}, K.value = null;
			let t = wn();
			if (Object.keys(t).length === 0) x.success("No changes to save."), $();
			else {
				nn.value = !0;
				try {
					await b.updateSettings(e.name, t), x.success("Settings saved."), $(), await T();
				} catch (e) {
					let t = r(e);
					Object.keys(t).length > 0 ? (G.value = t, K.value = "Fix the errors below and try again.", x.error("Some settings could not be saved — check the highlighted fields.")) : (K.value = n(e, "Failed to save settings."), x.error(K.value));
				} finally {
					nn.value = !1;
				}
			}
		}
		async function Dn() {
			let e = H.value;
			if (e && !X.value) {
				an(), X.value = !0;
				try {
					let t = await b.testCredentials(e.name, wn());
					Y.value = {
						tone: t.success ? "success" : "failure",
						message: t.message || (t.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (e) {
					i(e) === "plugin.test_not_supported" || e instanceof t && e.status === 501 ? Y.value = {
						tone: "unsupported",
						message: "This plugin does not support testing credentials."
					} : Y.value = {
						tone: "failure",
						message: n(e, "Could not run the credential test.")
					};
				} finally {
					X.value = !1;
				}
			}
		}
		async function On() {
			try {
				L.value = await b.getAutoUpdate();
			} catch {}
		}
		return _e(() => {
			vt(), w(), On(), St();
		}), (e, t) => (h(), d("section", we, [
			f("header", Te, [t[12] ||= f("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), f("div", Ee, [
				m(se, {
					"model-value": L.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": Zt
				}, null, 8, ["model-value"]),
				t[11] ||= f("span", { class: "admin-plugins__head-spacer" }, null, -1),
				m(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: F.value,
					onClick: qt
				}, {
					default: y(() => [...t[8] ||= [p(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				Wt.value > 0 ? (h(), l(o, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: Ut.value,
					onClick: Xt
				}, {
					default: y(() => [p(" Update all (" + v(Wt.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : u("", !0),
				m(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: zt
				}, {
					default: y(() => [...t[9] ||= [p("Add catalog", -1)]]),
					_: 1
				}),
				m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: jt
				}, {
					default: y(() => [...t[10] ||= [p("Install from URL", -1)]]),
					_: 1
				})
			])]),
			m(ie, {
				links: ve(ae).plugins.links,
				details: ve(ae).plugins.details
			}, {
				default: y(() => [...t[13] ||= [
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
			f("div", De, [t[14] ||= f("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (h(!0), d(s, null, _(C.value.sources, (e) => (h(), l(a, {
				key: e,
				tone: "neutral"
			}, {
				default: y(() => [f("a", {
					class: "admin-plugins__source-link",
					href: ve(pe)(e),
					target: "_blank",
					rel: "noopener noreferrer"
				}, v(Dt(e)), 9, Oe), e === C.value.default_source ? u("", !0) : (h(), d("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: N.value === e,
					"aria-label": `Remove catalog ${Dt(e)}`,
					onClick: (t) => Ht(e)
				}, " × ", 8, ke))]),
				_: 2
			}, 1024))), 128))]),
			D.value.length > 0 ? (h(), d("div", Ae, [f("div", je, [
				t[16] ||= f("span", { class: "admin-plugins__channel-label" }, "Catalog channel", -1),
				m(ce, {
					"model-value": E.value,
					options: xt.value,
					disabled: bt.value,
					label: "Catalog channel",
					class: "admin-plugins__channel-select",
					"onUpdate:modelValue": Ct
				}, null, 8, [
					"model-value",
					"options",
					"disabled"
				]),
				O.value?.advanced ? (h(), l(a, {
					key: 0,
					tone: "warning"
				}, {
					default: y(() => [...t[15] ||= [p("Opt-in · advanced", -1)]]),
					_: 1
				})) : u("", !0)
			]), O.value?.description ? (h(), d("p", {
				key: 0,
				class: ge(["admin-plugins__channel-desc", { "is-advanced": O.value.advanced }])
			}, [O.value.advanced ? (h(), l(re, {
				key: 0,
				name: "alert",
				class: "admin-plugins__channel-desc-icon"
			})) : u("", !0), f("span", null, v(O.value.description), 1)], 2)) : u("", !0)])) : u("", !0),
			j.value ? (h(), d("div", Me, [
				m(re, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Ne, [t[17] ||= f("strong", null, "Couldn’t install the plugin.", -1), f("span", null, v(j.value), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: t[0] ||= (e) => j.value = null
				}, " × ")
			])) : u("", !0),
			z.value ? (h(), d("div", Pe, [
				m(re, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Fe, [f("strong", null, v(z.value.title) + ".", 1), f("span", null, v(z.value.message), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: t[1] ||= (e) => z.value = null
				}, " × ")
			])) : u("", !0),
			yt.value ? (h(), d("div", Ie, [m(le, {
				variant: "text",
				lines: 5
			})])) : (h(), d(s, { key: 4 }, [(h(!0), d(s, null, _(C.value.errors, (e) => (h(), d("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				t[18] ||= p(" Couldn’t load catalog ", -1),
				f("strong", null, v(Dt(e.source)), 1),
				p(" — " + v(e.error), 1)
			]))), 128)), wt.value.length === 0 && C.value.errors.length === 0 ? (h(), l(ue, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: y(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: jt
				}, {
					default: y(() => [...t[19] ||= [p("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d("ul", Le, [(h(!0), d(s, null, _(wt.value, (e) => (h(), d("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				f("div", Re, [f("h3", ze, v(e.title), 1), f("div", Be, [
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
						default: y(() => [...t[20] ||= [p("Installed", -1)]]),
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
				e.summary || e.description ? (h(), d("p", Ve, v(e.summary || e.description), 1)) : u("", !0),
				e.tags.length ? (h(), d("div", He, [(h(!0), d(s, null, _(e.tags, (e) => (h(), d("span", {
					key: e,
					class: "admin-plugins__tag"
				}, v(e), 1))), 128))])) : u("", !0),
				f("div", Ue, [e.installed ? (h(), d(s, { key: 0 }, [
					m(se, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: B.value === e.name,
						"onUpdate:modelValue": (t) => $t(Ot(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					t[24] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					R(e.name) ? (h(), l(o, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: I.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => Yt(Ot(e))
					}, {
						default: y(() => [...t[21] ||= [p(" Update ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])) : u("", !0),
					m(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => Cn(Ot(e))
					}, {
						default: y(() => [...t[22] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => V.value = Ot(e)
					}, {
						default: y(() => [...t[23] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (h(), d(s, { key: 1 }, [
					m(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: Ft.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => It(e)
					}, {
						default: y(() => [...t[25] ||= [p(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					t[26] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					f("a", {
						class: "admin-plugins__repo-link",
						href: ve(pe)(e.repo),
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, We)
				], 64))])
			]))), 128))]))], 64)),
			Et.value.length ? (h(), d("section", Ge, [
				t[31] ||= f("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				t[32] ||= f("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				f("table", Ke, [t[30] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Name"),
					f("th", { scope: "col" }, "Version"),
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Enabled"),
					f("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), f("tbody", null, [(h(!0), d(s, null, _(Et.value, (e) => (h(), d("tr", { key: e.name }, [
					f("td", null, v(e.name), 1),
					f("td", qe, [p(v(e.version) + " ", 1), R(e.name) ? (h(), l(a, {
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
					f("td", null, [m(se, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: B.value === e.name,
						"onUpdate:modelValue": (t) => $t(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					f("td", null, [f("div", Je, [
						R(e.name) ? (h(), l(o, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: I.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => Yt(e)
						}, {
							default: y(() => [...t[27] ||= [p(" Update ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])) : u("", !0),
						m(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Configure ${e.name}`,
							onClick: (t) => Cn(e)
						}, {
							default: y(() => [...t[28] ||= [p(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						m(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => V.value = e
						}, {
							default: y(() => [...t[29] ||= [p(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : u("", !0),
			S.value && !_t.value ? (h(), l(ue, {
				key: 6,
				icon: "alert",
				title: "Couldn’t load installed plugins",
				description: S.value
			}, {
				actions: y(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: vt
				}, {
					default: y(() => [...t[33] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(oe, {
				modelValue: k.value,
				"onUpdate:modelValue": t[3] ||= (e) => k.value = e,
				title: "Install from URL",
				onClose: Mt
			}, {
				footer: y(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: Mt
				}, {
					default: y(() => [...t[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: kt.value,
					onClick: Pt
				}, {
					default: y(() => [...t[37] ||= [p("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Ce(Pt, ["prevent"])
				}, [f("label", Ye, [
					t[34] ||= f("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					Se(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => A.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[be, A.value]]),
					t[35] ||= f("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(oe, {
				modelValue: Lt.value,
				"onUpdate:modelValue": t[5] ||= (e) => Lt.value = e,
				title: "Add catalog",
				onClose: Bt
			}, {
				footer: y(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: Bt
				}, {
					default: y(() => [...t[40] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: Rt.value,
					onClick: Vt
				}, {
					default: y(() => [...t[41] ||= [p("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Ce(Vt, ["prevent"])
				}, [f("label", Xe, [
					t[38] ||= f("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					Se(f("input", {
						"onUpdate:modelValue": t[4] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[be, M.value]]),
					t[39] ||= f("span", { class: "admin-plugins__hint" }, [
						p(" A repository (or direct "),
						f("code", null, "plugins.json"),
						p(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(oe, {
				"model-value": V.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": t[7] ||= (e) => V.value = null
			}, {
				footer: y(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[6] ||= (e) => V.value = null
				}, {
					default: y(() => [...t[44] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "danger",
					size: "sm",
					onClick: en
				}, {
					default: y(() => [...t[45] ||= [p("Uninstall", -1)]]),
					_: 1
				})]),
				default: y(() => [f("p", null, [
					t[42] ||= p(" Uninstall ", -1),
					f("strong", null, v(V.value?.name), 1),
					t[43] ||= p("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(oe, {
				"model-value": H.value !== null,
				title: on.value,
				size: "xl",
				"onUpdate:modelValue": $
			}, {
				footer: y(() => [
					m(o, {
						variant: "ghost",
						size: "sm",
						onClick: $
					}, {
						default: y(() => [...t[58] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					cn.value ? (h(), l(o, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: X.value,
						disabled: X.value || nn.value,
						"aria-label": `Test the credentials for ${H.value?.name}`,
						onClick: Dn
					}, {
						default: y(() => [...t[59] ||= [p(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : u("", !0),
					cn.value ? (h(), l(o, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: nn.value,
						onClick: En
					}, {
						default: y(() => [...t[60] ||= [p(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : u("", !0)
				]),
				default: y(() => [tn.value ? (h(), d("div", Ze, [m(le, {
					variant: "text",
					lines: 4
				})])) : (h(), d("div", Qe, [ln.value ? (h(), d("div", $e, [
					f("span", {
						id: `plugin-redirect-url-${H.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, et),
					f("div", tt, [f("code", nt, v(ln.value), 1), m(o, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${H.value?.name}`,
						onClick: un
					}, {
						default: y(() => [...t[46] ||= [p(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					t[47] ||= f("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					f("span", rt, v(q.value), 1)
				])) : u("", !0), cn.value ? (h(), d("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: Ce(En, ["prevent"])
				}, [
					K.value ? (h(), d("div", it, v(K.value), 1)) : u("", !0),
					(h(!0), d(s, null, _(sn.value, ([e, n]) => (h(), d("div", {
						key: e,
						class: "admin-plugins__field"
					}, [
						n.type === "bool" || n.type === "boolean" ? (h(), l(se, {
							key: 0,
							"model-value": W.value[e] === !0,
							label: n.label || e,
							"onUpdate:modelValue": (t) => W.value[e] = t
						}, null, 8, [
							"model-value",
							"label",
							"onUpdate:modelValue"
						])) : (h(), d(s, { key: 1 }, [
							f("label", {
								for: `plugin-setting-${e}`,
								class: "admin-plugins__label"
							}, [p(v(n.label || e) + " ", 1), n.required ? (h(), d("span", ot, "*")) : (h(), d("span", st, "optional"))], 8, at),
							f("div", ct, [Se(f("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => W.value[e] = t,
								type: n.secret ? "password" : pn(n),
								class: ge(["admin-plugins__input", { "is-invalid": G.value[e] }]),
								autocomplete: n.secret ? "new-password" : "off",
								"data-lpignore": n.secret ? "true" : void 0,
								"data-1p-ignore": n.secret ? "" : void 0,
								"data-bwignore": n.secret ? "" : void 0,
								"data-form-type": n.secret ? "other" : void 0,
								placeholder: n.secret ? Q(e) ? "Will be removed on save" : Z(e) === null ? "Leave blank to keep whatever is stored" : Z(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: n.secret && Q(e),
								"aria-describedby": n.secret ? dn(e) : void 0,
								"aria-invalid": G.value[e] ? "true" : void 0
							}, null, 10, lt), [[ye, W.value[e]]]), n.secret && Q(e) ? (h(), l(o, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${n.label || e}`,
								onClick: (t) => yn(e)
							}, {
								default: y(() => [...t[48] ||= [p(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : _n(e, n) ? (h(), l(o, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${n.label || e}`,
								onClick: (t) => vn(e)
							}, {
								default: y(() => [...t[49] ||= [p(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : u("", !0)]),
							n.secret ? (h(), d("span", {
								key: 0,
								id: dn(e),
								class: ge(["admin-plugins__secret-status", { "is-set": Z(e)?.set }])
							}, [Q(e) ? (h(), d(s, { key: 0 }, [m(a, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...t[50] ||= [p("Will be removed", -1)]]),
								_: 1
							}), t[51] ||= p(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Z(e) === null ? (h(), d(s, { key: 1 }, [m(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...t[52] ||= [p("Unknown", -1)]]),
								_: 1
							}), t[53] ||= p(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Z(e)?.set ? (h(), d(s, { key: 2 }, [
								m(a, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: y(() => [...t[54] ||= [p("Configured", -1)]]),
									_: 1
								}),
								f("span", dt, v(gn(Z(e)?.length ?? 0)), 1),
								p(" Currently set (" + v(Z(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (h(), d(s, { key: 3 }, [m(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: y(() => [...t[55] ||= [p("Not set", -1)]]),
								_: 1
							}), t[56] ||= p(" No value is stored yet. ", -1)], 64))], 10, ut)) : u("", !0)
						], 64)),
						n.description || n.link ? (h(), l(de, {
							key: 2,
							text: n.description,
							links: Sn(n)
						}, null, 8, ["text", "links"])) : u("", !0),
						bn(n) ? (h(), d("span", ft, [t[57] ||= p(" Default: ", -1), f("code", null, v(bn(n)), 1)])) : u("", !0),
						G.value[e] ? (h(), d("span", pt, v(G.value[e]), 1)) : u("", !0)
					]))), 128)),
					Y.value ? (h(), d("div", {
						key: 1,
						class: ge(["admin-plugins__test-result", `admin-plugins__test-result--${Y.value.tone}`])
					}, [m(a, {
						tone: Y.value.tone === "success" ? "success" : Y.value.tone === "failure" ? "error" : "neutral",
						class: "admin-plugins__test-state"
					}, {
						default: y(() => [p(v(Y.value.tone === "success" ? "Passed" : Y.value.tone === "failure" ? "Failed" : "Not supported"), 1)]),
						_: 1
					}, 8, ["tone"]), p(" " + v(Y.value.message), 1)], 2)) : u("", !0)
				], 32)) : (h(), l(ue, {
					key: 1,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))]))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-0de08a2f"]]);
export { mt as default };

//# sourceMappingURL=PluginsPage-Cstga2-h.js.map