import { S as e, T as t, t as n } from "./client-Bmlfq3Uy.js";
import { i as r, r as i, t as ee } from "./plugins-C77PT0Uu.js";
import { t as te } from "./useToastStore-CxO_ppM8.js";
import { n as ne, t as re } from "./Icon-55iG1rR7.js";
import { t as a } from "./Badge-D7vacFbh.js";
import { t as ie } from "./PageHint-C2jY1TZi.js";
import { t as ae } from "./helpLinks-3xhEuW25.js";
import { t as o } from "./Button-Dfl4y6vO.js";
import { t as oe } from "./Modal-W6IcTJlW.js";
import { t as se } from "./Switch-C607L4Vu.js";
import { t as ce } from "./Select-BGqFb9UH.js";
import { t as le } from "./Skeleton-DDhrDRE7.js";
import { t as ue } from "./EmptyState-DjfWh3kt.js";
import { t as de } from "./HelpText-B3jlK4n_.js";
import { a as fe } from "./plural-B3O2rVPV.js";
import { t as pe } from "./safeHref-Be5nFpx7.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as me, inject as he, normalizeClass as h, onMounted as ge, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as b, vModelDynamic as _e, vModelText as ve, watch as ye, withCtx as x, withDirectives as be, withModifiers as xe } from "vue";
// src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var Se = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, Ce = { class: "admin-plugins__head" }, we = { class: "admin-plugins__head-actions" }, Te = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, Ee = ["href"], De = [
	"disabled",
	"aria-label",
	"onClick"
], Oe = {
	key: 0,
	class: "admin-plugins__channel",
	role: "group",
	"aria-label": "Catalog release channel"
}, ke = { class: "admin-plugins__channel-row" }, Ae = {
	key: 1,
	class: "admin-plugins__install-error",
	role: "alert"
}, je = { class: "admin-plugins__install-error-body" }, Me = {
	key: 2,
	class: "admin-plugins__install-error",
	role: "alert"
}, Ne = { class: "admin-plugins__install-error-body" }, Pe = {
	key: 3,
	class: "admin-plugins__skel"
}, Fe = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Ie = { class: "admin-plugins__card-head" }, Le = { class: "admin-plugins__card-title" }, Re = { class: "admin-plugins__card-badges" }, ze = {
	key: 0,
	class: "admin-plugins__card-summary"
}, Be = {
	key: 1,
	class: "admin-plugins__card-theme-note"
}, Ve = {
	key: 2,
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
}, pt = /*#__PURE__*/ ne(/* @__PURE__ */ me({
	__name: "PluginsPage",
	props: { client: {} },
	setup(ne) {
		let me = ne, pt = he("apiBase", ""), mt = c(() => typeof pt == "string" ? pt : pt?.value ?? ""), S = new ee(me.client ?? new n({ baseUrl: mt.value })), C = te(), ht = _([]), gt = _(!0), w = _(null);
		async function _t() {
			gt.value = !0, w.value = null;
			try {
				ht.value = await S.list();
			} catch (e) {
				w.value = t(e, "Failed to load plugins."), C.error(w.value);
			} finally {
				gt.value = !1;
			}
		}
		let T = _({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), vt = _(!0);
		async function E() {
			vt.value = !0;
			try {
				T.value = await S.catalog();
			} catch (e) {
				C.error(t(e, "Failed to load the plugin catalog."));
			} finally {
				vt.value = !1;
			}
		}
		async function D() {
			await Promise.all([_t(), E()]);
		}
		let O = _("stable"), k = _([]), A = _(!1), yt = c(() => k.value.map((e) => ({
			value: e.value,
			label: e.label
		}))), j = c(() => k.value.find((e) => e.value === O.value) ?? null);
		async function bt() {
			try {
				let e = await S.getChannel();
				O.value = e.channel, k.value = e.options;
			} catch {}
		}
		async function xt(e) {
			let n = String(e);
			if (n === O.value || A.value) return;
			let r = O.value;
			O.value = n, A.value = !0;
			try {
				let e = await S.setChannel(n);
				O.value = e.channel, e.options.length > 0 && (k.value = e.options);
				let t = j.value?.label;
				C.success(t ? `Catalog channel set to ${t}.` : "Catalog channel updated."), await E();
			} catch (e) {
				O.value = r, C.error(t(e, "Failed to change the catalog channel."));
			} finally {
				A.value = !1;
			}
		}
		let St = c(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of T.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), Ct = c(() => new Set(St.value.map((e) => e.name))), wt = c(() => ht.value.filter((e) => !Ct.value.has(e.name)));
		function Tt(e) {
			let t = e.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
			if (t) return t[1];
			try {
				return new URL(e).host;
			} catch {
				return e;
			}
		}
		function Et(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let Dt = _(!1), M = _(""), Ot = _(!1);
		function kt(e) {
			switch (i(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return t(e, "Install failed — the plugin could not be downloaded or read.");
				default: return t(e, "Failed to install plugin.");
			}
		}
		function At() {
			M.value = "", Dt.value = !0;
		}
		function jt() {
			Dt.value = !1, M.value = "";
		}
		let N = _(null);
		function Mt(e) {
			let t = kt(e);
			N.value = t, C.error(t);
		}
		async function Nt() {
			let e = M.value.trim();
			if (!e) C.error("A plugin URL is required.");
			else {
				Ot.value = !0, N.value = null;
				try {
					await S.install(e), C.success("Plugin installed."), jt(), await D();
				} catch (e) {
					Mt(e);
				} finally {
					Ot.value = !1;
				}
			}
		}
		let Pt = _(null);
		async function Ft(e) {
			if (Pt.value === null) {
				Pt.value = e.repo, N.value = null;
				try {
					await S.install(e.repo), C.success(`${e.title} installed.`), await D();
				} catch (e) {
					Mt(e);
				} finally {
					Pt.value = null;
				}
			}
		}
		let It = _(!1), P = _(""), Lt = _(!1), Rt = _(null);
		function zt() {
			P.value = "", It.value = !0;
		}
		function Bt() {
			It.value = !1, P.value = "";
		}
		async function Vt() {
			let e = P.value.trim();
			if (!e) C.error("A catalog URL is required.");
			else {
				Lt.value = !0;
				try {
					await S.addCatalogSource(e), C.success("Catalog added."), Bt(), await E();
				} catch (e) {
					let n = i(e);
					C.error(n === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : t(e, "Failed to add catalog."));
				} finally {
					Lt.value = !1;
				}
			}
		}
		async function Ht(e) {
			if (Rt.value === null) {
				Rt.value = e;
				try {
					await S.removeCatalogSource(e), C.success("Catalog removed."), await E();
				} catch (e) {
					C.error(t(e, "Failed to remove catalog."));
				} finally {
					Rt.value = null;
				}
			}
		}
		let F = _({}), Ut = _(!1), I = _(!1), L = _(null), R = _(!1), Wt = c(() => Object.values(F.value).filter((e) => e.update_available).length);
		function z(e) {
			let t = F.value[e];
			return t && t.update_available ? t : null;
		}
		function Gt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			F.value = t;
		}
		function Kt(e) {
			if (e in F.value) {
				let t = { ...F.value };
				delete t[e], F.value = t;
			}
		}
		async function qt() {
			if (!Ut.value) {
				Ut.value = !0;
				try {
					let e = await S.checkUpdates();
					Gt(e.updates), R.value = e.auto_update;
					let t = Wt.value;
					C.success(t > 0 ? `${fe(t, "update", "updates")} available.` : "All plugins are up to date.");
				} catch (e) {
					C.error(t(e, "Failed to check for updates."));
				} finally {
					Ut.value = !1;
				}
			}
		}
		function Jt(e) {
			switch (i(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return t(e, "Update failed — the new version could not be downloaded or read.");
				default: return t(e, "Failed to update plugin.");
			}
		}
		async function Yt(e) {
			if (L.value === null) {
				L.value = e.name, B.value = null;
				try {
					await S.updatePlugin(e.name), C.success(`${e.name} updated.`), Kt(e.name), await D();
				} catch (t) {
					B.value = {
						title: `Couldn’t update ${e.name}`,
						message: Jt(t)
					}, C.error(Jt(t));
				} finally {
					L.value = null;
				}
			}
		}
		async function Xt() {
			if (!I.value) {
				I.value = !0;
				try {
					let e = await S.updateAll();
					e.failed.length > 0 ? C.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : C.success(`${fe(e.updated.length, "plugin", "plugins")} updated.`), await D();
					let t = await S.checkUpdates();
					Gt(t.updates), R.value = t.auto_update;
				} catch (e) {
					C.error(t(e, "Failed to apply updates."));
				} finally {
					I.value = !1;
				}
			}
		}
		async function Zt(e) {
			let n = R.value;
			R.value = e;
			try {
				R.value = await S.setAutoUpdate(e), C.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				R.value = n, C.error(t(e, "Failed to change auto-update."));
			}
		}
		let B = _(null);
		function Qt(e, n, r) {
			let i = t(n, r);
			B.value = {
				title: e,
				message: i
			}, C.error(i);
		}
		let V = _(null);
		async function $t(e, t) {
			if (V.value === null) {
				V.value = e.name, B.value = null;
				try {
					t ? (await S.enable(e.name), C.success(`${e.name} enabled.`)) : (await S.disable(e.name), C.success(`${e.name} disabled.`)), await D();
				} catch (n) {
					Qt(t ? `Couldn’t enable ${e.name}` : `Couldn’t disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					V.value = null;
				}
			}
		}
		let H = _(null);
		async function en() {
			let e = H.value;
			if (e) try {
				await S.uninstall(e.name), C.success(`${e.name} uninstalled.`), H.value = null, await D();
			} catch (t) {
				Qt(`Couldn’t uninstall ${e.name}`, t, "Failed to uninstall plugin."), H.value = null;
			}
		}
		let U = _(null), W = _(null), tn = _(!1), nn = _(!1), G = _({}), rn = _({}), K = _({}), q = _(null), J = _(""), Y = _({}), X = _(null), Z = _(!1);
		function an() {
			X.value = null;
		}
		ye([G, Y], an, { deep: !0 });
		let on = c(() => U.value ? `Configure — ${U.value.name}` : "Configure plugin"), sn = c(() => W.value ? Object.entries(W.value.settings_schema) : []), cn = c(() => sn.value.length > 0), ln = c(() => W.value?.redirect_url ?? "");
		async function un() {
			let e = ln.value;
			if (e) try {
				await navigator.clipboard.writeText(e), J.value = "Redirect URL copied to clipboard.", C.success("Redirect URL copied to clipboard.");
			} catch {
				J.value = "Could not copy the redirect URL. Copy it manually instead.", C.error("Failed to copy the redirect URL.");
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
		function Q(e) {
			return W.value?.secret_status?.[e] ?? null;
		}
		function gn(e) {
			return "•".repeat(Math.max(1, Math.min(e, 32)));
		}
		function $(e) {
			return Y.value[e] === !0;
		}
		function _n(e, t) {
			return t.secret && Q(e)?.set !== !1;
		}
		function vn(e) {
			Y.value[e] = !0, G.value[e] = "";
		}
		function yn(e) {
			delete Y.value[e];
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
			U.value = e, W.value = null, G.value = {}, rn.value = {}, K.value = {}, q.value = null, J.value = "", Y.value = {}, an(), tn.value = !0;
			try {
				let t = await S.get(e.name);
				W.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = hn(r, t.settings[e]);
				G.value = n, rn.value = { ...n };
			} catch (e) {
				C.error(t(e, "Failed to load plugin settings.")), U.value = null;
			} finally {
				tn.value = !1;
			}
		}
		function wn() {
			U.value = null, W.value = null, G.value = {}, rn.value = {}, K.value = {}, q.value = null, J.value = "", Y.value = {}, an();
		}
		function Tn() {
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
				} else r !== rn.value[t] && (e[t] = En(n, r));
			}
			return e;
		}
		function En(e, t) {
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
		async function Dn() {
			let e = U.value;
			if (!e) return;
			K.value = {}, q.value = null;
			let n = Tn();
			if (Object.keys(n).length === 0) C.success("No changes to save."), wn();
			else {
				nn.value = !0;
				try {
					await S.updateSettings(e.name, n), C.success("Settings saved."), wn(), await D();
				} catch (e) {
					let n = r(e);
					Object.keys(n).length > 0 ? (K.value = n, q.value = "Fix the errors below and try again.", C.error("Some settings could not be saved — check the highlighted fields.")) : (q.value = t(e, "Failed to save settings."), C.error(q.value));
				} finally {
					nn.value = !1;
				}
			}
		}
		async function On() {
			let n = U.value;
			if (n && !Z.value) {
				an(), Z.value = !0;
				try {
					let e = await S.testCredentials(n.name, Tn());
					X.value = {
						tone: e.success ? "success" : "failure",
						message: e.message || (e.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (n) {
					i(n) === "plugin.test_not_supported" || n instanceof e && n.status === 501 ? X.value = {
						tone: "unsupported",
						message: "This plugin does not support testing credentials."
					} : X.value = {
						tone: "failure",
						message: t(n, "Could not run the credential test.")
					};
				} finally {
					Z.value = !1;
				}
			}
		}
		async function kn() {
			try {
				R.value = await S.getAutoUpdate();
			} catch {}
		}
		return ge(() => {
			_t(), E(), kn(), bt();
		}), (e, t) => (g(), d("section", Se, [
			f("header", Ce, [t[12] ||= f("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), f("div", we, [
				m(se, {
					"model-value": R.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": Zt
				}, null, 8, ["model-value"]),
				t[11] ||= f("span", { class: "admin-plugins__head-spacer" }, null, -1),
				m(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: Ut.value,
					onClick: qt
				}, {
					default: x(() => [...t[8] ||= [p(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				Wt.value > 0 ? (g(), l(o, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: I.value,
					onClick: Xt
				}, {
					default: x(() => [p(" Update all (" + y(Wt.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : u("", !0),
				m(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: zt
				}, {
					default: x(() => [...t[9] ||= [p("Add catalog", -1)]]),
					_: 1
				}),
				m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: At
				}, {
					default: x(() => [...t[10] ||= [p("Install from URL", -1)]]),
					_: 1
				})
			])]),
			m(ie, {
				links: b(ae).plugins.links,
				details: b(ae).plugins.details
			}, {
				default: x(() => [...t[13] ||= [
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
			f("div", Te, [t[14] ||= f("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (g(!0), d(s, null, v(T.value.sources, (e) => (g(), l(a, {
				key: e,
				tone: "neutral"
			}, {
				default: x(() => [f("a", {
					class: "admin-plugins__source-link",
					href: b(pe)(e),
					target: "_blank",
					rel: "noopener noreferrer"
				}, y(Tt(e)), 9, Ee), e === T.value.default_source ? u("", !0) : (g(), d("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: Rt.value === e,
					"aria-label": `Remove catalog ${Tt(e)}`,
					onClick: (t) => Ht(e)
				}, " × ", 8, De))]),
				_: 2
			}, 1024))), 128))]),
			k.value.length > 0 ? (g(), d("div", Oe, [f("div", ke, [
				t[16] ||= f("span", { class: "admin-plugins__channel-label" }, "Catalog channel", -1),
				m(ce, {
					"model-value": O.value,
					options: yt.value,
					disabled: A.value,
					label: "Catalog channel",
					class: "admin-plugins__channel-select",
					"onUpdate:modelValue": xt
				}, null, 8, [
					"model-value",
					"options",
					"disabled"
				]),
				j.value?.advanced ? (g(), l(a, {
					key: 0,
					tone: "warning"
				}, {
					default: x(() => [...t[15] ||= [p("Opt-in · advanced", -1)]]),
					_: 1
				})) : u("", !0)
			]), j.value?.description ? (g(), d("p", {
				key: 0,
				class: h(["admin-plugins__channel-desc", { "is-advanced": j.value.advanced }])
			}, [j.value.advanced ? (g(), l(re, {
				key: 0,
				name: "alert",
				class: "admin-plugins__channel-desc-icon"
			})) : u("", !0), f("span", null, y(j.value.description), 1)], 2)) : u("", !0)])) : u("", !0),
			N.value ? (g(), d("div", Ae, [
				m(re, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", je, [t[17] ||= f("strong", null, "Couldn’t install the plugin.", -1), f("span", null, y(N.value), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: t[0] ||= (e) => N.value = null
				}, " × ")
			])) : u("", !0),
			B.value ? (g(), d("div", Me, [
				m(re, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Ne, [f("strong", null, y(B.value.title) + ".", 1), f("span", null, y(B.value.message), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: t[1] ||= (e) => B.value = null
				}, " × ")
			])) : u("", !0),
			vt.value ? (g(), d("div", Pe, [m(le, {
				variant: "text",
				lines: 5
			})])) : (g(), d(s, { key: 4 }, [(g(!0), d(s, null, v(T.value.errors, (e) => (g(), d("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				t[18] ||= p(" Couldn’t load catalog ", -1),
				f("strong", null, y(Tt(e.source)), 1),
				p(" — " + y(e.error), 1)
			]))), 128)), St.value.length === 0 && T.value.errors.length === 0 ? (g(), l(ue, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: x(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: At
				}, {
					default: x(() => [...t[19] ||= [p("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("ul", Fe, [(g(!0), d(s, null, v(St.value, (e) => (g(), d("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				f("div", Ie, [f("h3", Le, y(e.title), 1), f("div", Re, [
					e.type ? (g(), l(a, {
						key: 0,
						tone: "info"
					}, {
						default: x(() => [p(y(e.type), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.installed ? (g(), l(a, {
						key: 1,
						tone: "success"
					}, {
						default: x(() => [...t[20] ||= [p("Installed", -1)]]),
						_: 1
					})) : u("", !0),
					z(e.name) ? (g(), l(a, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: x(() => [p(" Update → v" + y(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)
				])]),
				e.summary || e.description ? (g(), d("p", ze, y(e.summary || e.description), 1)) : u("", !0),
				e.type === "ui-theme" && e.installed && e.enabled ? (g(), d("p", Be, " Theme plugins appear under Settings → Appearance for each signed-in user — enabling one here does not change anyone's theme. ")) : u("", !0),
				e.tags.length ? (g(), d("div", Ve, [(g(!0), d(s, null, v(e.tags, (e) => (g(), d("span", {
					key: e,
					class: "admin-plugins__tag"
				}, y(e), 1))), 128))])) : u("", !0),
				f("div", He, [e.installed ? (g(), d(s, { key: 0 }, [
					m(se, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: V.value === e.name,
						"onUpdate:modelValue": (t) => $t(Et(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					t[24] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					z(e.name) ? (g(), l(o, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: L.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => Yt(Et(e))
					}, {
						default: x(() => [...t[21] ||= [p(" Update ", -1)]]),
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
						onClick: (t) => Cn(Et(e))
					}, {
						default: x(() => [...t[22] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => H.value = Et(e)
					}, {
						default: x(() => [...t[23] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (g(), d(s, { key: 1 }, [
					m(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: Pt.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => Ft(e)
					}, {
						default: x(() => [...t[25] ||= [p(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					t[26] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					f("a", {
						class: "admin-plugins__repo-link",
						href: b(pe)(e.repo),
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, Ue)
				], 64))])
			]))), 128))]))], 64)),
			wt.value.length ? (g(), d("section", We, [
				t[31] ||= f("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				t[32] ||= f("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				f("table", Ge, [t[30] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Name"),
					f("th", { scope: "col" }, "Version"),
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Enabled"),
					f("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), f("tbody", null, [(g(!0), d(s, null, v(wt.value, (e) => (g(), d("tr", { key: e.name }, [
					f("td", null, y(e.name), 1),
					f("td", Ke, [p(y(e.version) + " ", 1), z(e.name) ? (g(), l(a, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: x(() => [p(" → v" + y(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)]),
					f("td", null, [m(a, { tone: "info" }, {
						default: x(() => [p(y(e.type), 1)]),
						_: 2
					}, 1024)]),
					f("td", null, [m(se, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: V.value === e.name,
						"onUpdate:modelValue": (t) => $t(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					f("td", null, [f("div", qe, [
						z(e.name) ? (g(), l(o, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: L.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => Yt(e)
						}, {
							default: x(() => [...t[27] ||= [p(" Update ", -1)]]),
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
							default: x(() => [...t[28] ||= [p(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						m(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => H.value = e
						}, {
							default: x(() => [...t[29] ||= [p(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : u("", !0),
			w.value && !gt.value ? (g(), l(ue, {
				key: 6,
				icon: "alert",
				title: "Couldn’t load installed plugins",
				description: w.value
			}, {
				actions: x(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: _t
				}, {
					default: x(() => [...t[33] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(oe, {
				modelValue: Dt.value,
				"onUpdate:modelValue": t[3] ||= (e) => Dt.value = e,
				title: "Install from URL",
				onClose: jt
			}, {
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: jt
				}, {
					default: x(() => [...t[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: Ot.value,
					onClick: Nt
				}, {
					default: x(() => [...t[37] ||= [p("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: xe(Nt, ["prevent"])
				}, [f("label", Je, [
					t[34] ||= f("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					be(f("input", {
						"onUpdate:modelValue": t[2] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[ve, M.value]]),
					t[35] ||= f("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(oe, {
				modelValue: It.value,
				"onUpdate:modelValue": t[5] ||= (e) => It.value = e,
				title: "Add catalog",
				onClose: Bt
			}, {
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: Bt
				}, {
					default: x(() => [...t[40] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: Lt.value,
					onClick: Vt
				}, {
					default: x(() => [...t[41] ||= [p("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: xe(Vt, ["prevent"])
				}, [f("label", Ye, [
					t[38] ||= f("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					be(f("input", {
						"onUpdate:modelValue": t[4] ||= (e) => P.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[ve, P.value]]),
					t[39] ||= f("span", { class: "admin-plugins__hint" }, [
						p(" A repository (or direct "),
						f("code", null, "plugins.json"),
						p(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(oe, {
				"model-value": H.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": t[7] ||= (e) => H.value = null
			}, {
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[6] ||= (e) => H.value = null
				}, {
					default: x(() => [...t[44] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "danger",
					size: "sm",
					onClick: en
				}, {
					default: x(() => [...t[45] ||= [p("Uninstall", -1)]]),
					_: 1
				})]),
				default: x(() => [f("p", null, [
					t[42] ||= p(" Uninstall ", -1),
					f("strong", null, y(H.value?.name), 1),
					t[43] ||= p("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(oe, {
				"model-value": U.value !== null,
				title: on.value,
				size: "xl",
				"onUpdate:modelValue": wn
			}, {
				footer: x(() => [
					m(o, {
						variant: "ghost",
						size: "sm",
						onClick: wn
					}, {
						default: x(() => [...t[58] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					cn.value ? (g(), l(o, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: Z.value,
						disabled: Z.value || nn.value,
						"aria-label": `Test the credentials for ${U.value?.name}`,
						onClick: On
					}, {
						default: x(() => [...t[59] ||= [p(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : u("", !0),
					cn.value ? (g(), l(o, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: nn.value,
						onClick: Dn
					}, {
						default: x(() => [...t[60] ||= [p(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : u("", !0)
				]),
				default: x(() => [tn.value ? (g(), d("div", Xe, [m(le, {
					variant: "text",
					lines: 4
				})])) : (g(), d("div", Ze, [ln.value ? (g(), d("div", Qe, [
					f("span", {
						id: `plugin-redirect-url-${U.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, $e),
					f("div", et, [f("code", tt, y(ln.value), 1), m(o, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${U.value?.name}`,
						onClick: un
					}, {
						default: x(() => [...t[46] ||= [p(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					t[47] ||= f("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					f("span", nt, y(J.value), 1)
				])) : u("", !0), cn.value ? (g(), d("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: xe(Dn, ["prevent"])
				}, [
					q.value ? (g(), d("div", rt, y(q.value), 1)) : u("", !0),
					(g(!0), d(s, null, v(sn.value, ([e, n]) => (g(), d("div", {
						key: e,
						class: "admin-plugins__field"
					}, [
						n.type === "bool" || n.type === "boolean" ? (g(), l(se, {
							key: 0,
							"model-value": G.value[e] === !0,
							label: n.label || e,
							"onUpdate:modelValue": (t) => G.value[e] = t
						}, null, 8, [
							"model-value",
							"label",
							"onUpdate:modelValue"
						])) : (g(), d(s, { key: 1 }, [
							f("label", {
								for: `plugin-setting-${e}`,
								class: "admin-plugins__label"
							}, [p(y(n.label || e) + " ", 1), n.required ? (g(), d("span", at, "*")) : (g(), d("span", ot, "optional"))], 8, it),
							f("div", st, [be(f("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => G.value[e] = t,
								type: n.secret ? "password" : pn(n),
								class: h(["admin-plugins__input", { "is-invalid": K.value[e] }]),
								autocomplete: n.secret ? "new-password" : "off",
								"data-lpignore": n.secret ? "true" : void 0,
								"data-1p-ignore": n.secret ? "" : void 0,
								"data-bwignore": n.secret ? "" : void 0,
								"data-form-type": n.secret ? "other" : void 0,
								placeholder: n.secret ? $(e) ? "Will be removed on save" : Q(e) === null ? "Leave blank to keep whatever is stored" : Q(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: n.secret && $(e),
								"aria-describedby": n.secret ? dn(e) : void 0,
								"aria-invalid": K.value[e] ? "true" : void 0
							}, null, 10, ct), [[_e, G.value[e]]]), n.secret && $(e) ? (g(), l(o, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${n.label || e}`,
								onClick: (t) => yn(e)
							}, {
								default: x(() => [...t[48] ||= [p(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : _n(e, n) ? (g(), l(o, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${n.label || e}`,
								onClick: (t) => vn(e)
							}, {
								default: x(() => [...t[49] ||= [p(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : u("", !0)]),
							n.secret ? (g(), d("span", {
								key: 0,
								id: dn(e),
								class: h(["admin-plugins__secret-status", { "is-set": Q(e)?.set }])
							}, [$(e) ? (g(), d(s, { key: 0 }, [m(a, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: x(() => [...t[50] ||= [p("Will be removed", -1)]]),
								_: 1
							}), t[51] ||= p(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Q(e) === null ? (g(), d(s, { key: 1 }, [m(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: x(() => [...t[52] ||= [p("Unknown", -1)]]),
								_: 1
							}), t[53] ||= p(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Q(e)?.set ? (g(), d(s, { key: 2 }, [
								m(a, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: x(() => [...t[54] ||= [p("Configured", -1)]]),
									_: 1
								}),
								f("span", ut, y(gn(Q(e)?.length ?? 0)), 1),
								p(" Currently set (" + y(Q(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (g(), d(s, { key: 3 }, [m(a, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: x(() => [...t[55] ||= [p("Not set", -1)]]),
								_: 1
							}), t[56] ||= p(" No value is stored yet. ", -1)], 64))], 10, lt)) : u("", !0)
						], 64)),
						n.description || n.link ? (g(), l(de, {
							key: 2,
							text: n.description,
							links: Sn(n)
						}, null, 8, ["text", "links"])) : u("", !0),
						bn(n) ? (g(), d("span", dt, [t[57] ||= p(" Default: ", -1), f("code", null, y(bn(n)), 1)])) : u("", !0),
						K.value[e] ? (g(), d("span", ft, y(K.value[e]), 1)) : u("", !0)
					]))), 128)),
					X.value ? (g(), d("div", {
						key: 1,
						class: h(["admin-plugins__test-result", `admin-plugins__test-result--${X.value.tone}`])
					}, [m(a, {
						tone: X.value.tone === "success" ? "success" : X.value.tone === "failure" ? "error" : "neutral",
						class: "admin-plugins__test-state"
					}, {
						default: x(() => [p(y(X.value.tone === "success" ? "Passed" : X.value.tone === "failure" ? "Failed" : "Not supported"), 1)]),
						_: 1
					}, 8, ["tone"]), p(" " + y(X.value.message), 1)], 2)) : u("", !0)
				], 32)) : (g(), l(ue, {
					key: 1,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))]))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-1be496c3"]]);
export { pt as default };

//# sourceMappingURL=PluginsPage-A66MLpOC.js.map