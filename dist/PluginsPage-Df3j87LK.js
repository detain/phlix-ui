import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { g as r, l as ee, t as te, y as i } from "./client-DdVqCKVh.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as re } from "./safeHref-C9H0Sqte.js";
import { t as ie } from "./EmptyState-BAyOxAcK.js";
import { t as a } from "./Button-BuG0GvCa.js";
import { t as o } from "./Badge-A88fI41k.js";
import { t as ae } from "./Switch-ibkXiiN-.js";
import { t as oe } from "./Select-D5WM74_-.js";
import { t as se } from "./Modal-eRq9Rw_4.js";
import { t as ce } from "./Skeleton-rHw-IJtl.js";
import { t as le } from "./PageHint-BGYg6qRJ.js";
import { t as ue } from "./HelpText-aA3EQtU4.js";
import { i as de, r as fe, t as pe } from "./plugins-Dj2gQeBS.js";
import { t as me } from "./helpLinks-B4Y1FteC.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as he, inject as ge, normalizeClass as _e, onMounted as ve, openBlock as h, ref as g, renderList as _, toDisplayString as v, unref as y, vModelDynamic as ye, vModelText as be, watch as xe, withCtx as b, withDirectives as Se, withModifiers as Ce } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
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
}, mt = /*#__PURE__*/ e(/* @__PURE__ */ he({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let he = e, mt = ge("apiBase", ""), ht = c(() => typeof mt == "string" ? mt : mt?.value ?? ""), x = new pe(he.client ?? new te({
			baseUrl: ht.value,
			tokenStore: new ee()
		})), S = ne(), gt = g([]), _t = g(!0), C = g(null);
		async function vt() {
			_t.value = !0, C.value = null;
			try {
				gt.value = await x.list();
			} catch (e) {
				C.value = i(e, "Failed to load plugins."), S.error(C.value);
			} finally {
				_t.value = !1;
			}
		}
		let w = g({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), yt = g(!0);
		async function T() {
			yt.value = !0;
			try {
				w.value = await x.catalog();
			} catch (e) {
				S.error(i(e, "Failed to load the plugin catalog."));
			} finally {
				yt.value = !1;
			}
		}
		async function E() {
			await Promise.all([vt(), T()]);
		}
		let D = g("stable"), O = g([]), bt = g(!1), xt = c(() => O.value.map((e) => ({
			value: e.value,
			label: e.label
		}))), k = c(() => O.value.find((e) => e.value === D.value) ?? null);
		async function St() {
			try {
				let e = await x.getChannel();
				D.value = e.channel, O.value = e.options;
			} catch {}
		}
		async function Ct(e) {
			let t = String(e);
			if (t === D.value || bt.value) return;
			let n = D.value;
			D.value = t, bt.value = !0;
			try {
				let e = await x.setChannel(t);
				D.value = e.channel, e.options.length > 0 && (O.value = e.options);
				let n = k.value?.label;
				S.success(n ? `Catalog channel set to ${n}.` : "Catalog channel updated."), await T();
			} catch (e) {
				D.value = n, S.error(i(e, "Failed to change the catalog channel."));
			} finally {
				bt.value = !1;
			}
		}
		let wt = c(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of w.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
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
		function A(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let j = g(!1), M = g(""), Ot = g(!1);
		function kt(e) {
			switch (fe(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return i(e, "Install failed — the plugin could not be downloaded or read.");
				default: return i(e, "Failed to install plugin.");
			}
		}
		function At() {
			M.value = "", j.value = !0;
		}
		function jt() {
			j.value = !1, M.value = "";
		}
		let N = g(null);
		function Mt(e) {
			let t = kt(e);
			N.value = t, S.error(t);
		}
		async function Nt() {
			let e = M.value.trim();
			if (!e) {
				S.error("A plugin URL is required.");
				return;
			}
			Ot.value = !0, N.value = null;
			try {
				await x.install(e), S.success("Plugin installed."), jt(), await E();
			} catch (e) {
				Mt(e);
			} finally {
				Ot.value = !1;
			}
		}
		let P = g(null);
		async function Pt(e) {
			if (P.value === null) {
				P.value = e.repo, N.value = null;
				try {
					await x.install(e.repo), S.success(`${e.title} installed.`), await E();
				} catch (e) {
					Mt(e);
				} finally {
					P.value = null;
				}
			}
		}
		let Ft = g(!1), F = g(""), It = g(!1), Lt = g(null);
		function Rt() {
			F.value = "", Ft.value = !0;
		}
		function zt() {
			Ft.value = !1, F.value = "";
		}
		async function Bt() {
			let e = F.value.trim();
			if (!e) {
				S.error("A catalog URL is required.");
				return;
			}
			It.value = !0;
			try {
				await x.addCatalogSource(e), S.success("Catalog added."), zt(), await T();
			} catch (e) {
				let t = fe(e);
				S.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : i(e, "Failed to add catalog."));
			} finally {
				It.value = !1;
			}
		}
		async function Vt(e) {
			if (Lt.value === null) {
				Lt.value = e;
				try {
					await x.removeCatalogSource(e), S.success("Catalog removed."), await T();
				} catch (e) {
					S.error(i(e, "Failed to remove catalog."));
				} finally {
					Lt.value = null;
				}
			}
		}
		let I = g({}), Ht = g(!1), Ut = g(!1), L = g(null), R = g(!1), Wt = c(() => Object.values(I.value).filter((e) => e.update_available).length);
		function z(e) {
			let t = I.value[e];
			return t && t.update_available ? t : null;
		}
		function Gt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			I.value = t;
		}
		function Kt(e) {
			if (e in I.value) {
				let t = { ...I.value };
				delete t[e], I.value = t;
			}
		}
		async function qt() {
			if (!Ht.value) {
				Ht.value = !0;
				try {
					let e = await x.checkUpdates();
					Gt(e.updates), R.value = e.auto_update;
					let t = Wt.value;
					S.success(t > 0 ? `${n(t, "update", "updates")} available.` : "All plugins are up to date.");
				} catch (e) {
					S.error(i(e, "Failed to check for updates."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		function Jt(e) {
			switch (fe(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return i(e, "Update failed — the new version could not be downloaded or read.");
				default: return i(e, "Failed to update plugin.");
			}
		}
		async function Yt(e) {
			if (L.value === null) {
				L.value = e.name, B.value = null;
				try {
					await x.updatePlugin(e.name), S.success(`${e.name} updated.`), Kt(e.name), await E();
				} catch (t) {
					B.value = {
						title: `Couldn't update ${e.name}`,
						message: Jt(t)
					}, S.error(Jt(t));
				} finally {
					L.value = null;
				}
			}
		}
		async function Xt() {
			if (!Ut.value) {
				Ut.value = !0;
				try {
					let e = await x.updateAll();
					e.failed.length > 0 ? S.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : S.success(`${n(e.updated.length, "plugin", "plugins")} updated.`), await E();
					let t = await x.checkUpdates();
					Gt(t.updates), R.value = t.auto_update;
				} catch (e) {
					S.error(i(e, "Failed to apply updates."));
				} finally {
					Ut.value = !1;
				}
			}
		}
		async function Zt(e) {
			let t = R.value;
			R.value = e;
			try {
				R.value = await x.setAutoUpdate(e), S.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				R.value = t, S.error(i(e, "Failed to change auto-update."));
			}
		}
		let B = g(null);
		function Qt(e, t, n) {
			let r = i(t, n);
			B.value = {
				title: e,
				message: r
			}, S.error(r);
		}
		let V = g(null);
		async function $t(e, t) {
			if (V.value === null) {
				V.value = e.name, B.value = null;
				try {
					t ? (await x.enable(e.name), S.success(`${e.name} enabled.`)) : (await x.disable(e.name), S.success(`${e.name} disabled.`)), await E();
				} catch (n) {
					Qt(t ? `Couldn't enable ${e.name}` : `Couldn't disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					V.value = null;
				}
			}
		}
		let H = g(null);
		async function en() {
			let e = H.value;
			if (e) try {
				await x.uninstall(e.name), S.success(`${e.name} uninstalled.`), H.value = null, await E();
			} catch (t) {
				Qt(`Couldn't uninstall ${e.name}`, t, "Failed to uninstall plugin."), H.value = null;
			}
		}
		let U = g(null), W = g(null), tn = g(!1), nn = g(!1), G = g({}), rn = g({}), K = g({}), q = g(null), J = g(""), Y = g({}), X = g(null), Z = g(!1);
		function an() {
			X.value = null;
		}
		xe([G, Y], an, { deep: !0 });
		let on = c(() => U.value ? `Configure — ${U.value.name}` : "Configure plugin"), sn = c(() => W.value ? Object.entries(W.value.settings_schema) : []), cn = c(() => sn.value.length > 0), ln = c(() => W.value?.redirect_url ?? "");
		async function un() {
			let e = ln.value;
			if (e) try {
				await navigator.clipboard.writeText(e), J.value = "Redirect URL copied to clipboard.", S.success("Redirect URL copied to clipboard.");
			} catch {
				J.value = "Could not copy the redirect URL. Copy it manually instead.", S.error("Failed to copy the redirect URL.");
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
				let t = await x.get(e.name);
				W.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = hn(r, t.settings[e]);
				G.value = n, rn.value = { ...n };
			} catch (e) {
				S.error(i(e, "Failed to load plugin settings.")), U.value = null;
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
					continue;
				}
				r !== rn.value[t] && (e[t] = En(n, r));
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
			let t = Tn();
			if (Object.keys(t).length === 0) {
				S.success("No changes to save."), wn();
				return;
			}
			nn.value = !0;
			try {
				await x.updateSettings(e.name, t), S.success("Settings saved."), wn(), await E();
			} catch (e) {
				let t = de(e);
				Object.keys(t).length > 0 ? (K.value = t, q.value = "Please fix the errors below and try again.", S.error("Some settings could not be saved — check the highlighted fields.")) : (q.value = i(e, "Failed to save settings."), S.error(q.value));
			} finally {
				nn.value = !1;
			}
		}
		async function On() {
			let e = U.value;
			if (!(!e || Z.value)) {
				an(), Z.value = !0;
				try {
					let t = await x.testCredentials(e.name, Tn());
					X.value = {
						tone: t.success ? "success" : "failure",
						message: t.message || (t.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (e) {
					fe(e) === "plugin.test_not_supported" || e instanceof r && e.status === 501 ? X.value = {
						tone: "unsupported",
						message: "This plugin does not support testing credentials."
					} : X.value = {
						tone: "failure",
						message: i(e, "Could not run the credential test.")
					};
				} finally {
					Z.value = !1;
				}
			}
		}
		async function kn() {
			try {
				R.value = await x.getAutoUpdate();
			} catch {}
		}
		return ve(() => {
			vt(), T(), kn(), St();
		}), (e, n) => (h(), d("section", we, [
			f("header", Te, [n[12] ||= f("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), f("div", Ee, [
				m(ae, {
					"model-value": R.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": Zt
				}, null, 8, ["model-value"]),
				n[11] ||= f("span", { class: "admin-plugins__head-spacer" }, null, -1),
				m(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: Ht.value,
					onClick: qt
				}, {
					default: b(() => [...n[8] ||= [p(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				Wt.value > 0 ? (h(), l(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: Ut.value,
					onClick: Xt
				}, {
					default: b(() => [p(" Update all (" + v(Wt.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : u("", !0),
				m(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: Rt
				}, {
					default: b(() => [...n[9] ||= [p("Add catalog", -1)]]),
					_: 1
				}),
				m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: At
				}, {
					default: b(() => [...n[10] ||= [p("Install from URL", -1)]]),
					_: 1
				})
			])]),
			m(le, {
				links: y(me).plugins.links,
				details: y(me).plugins.details
			}, {
				default: b(() => [...n[13] ||= [
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
			f("div", De, [n[14] ||= f("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (h(!0), d(s, null, _(w.value.sources, (e) => (h(), l(o, {
				key: e,
				tone: "neutral"
			}, {
				default: b(() => [f("a", {
					class: "admin-plugins__source-link",
					href: y(re)(e),
					target: "_blank",
					rel: "noopener noreferrer"
				}, v(Dt(e)), 9, Oe), e === w.value.default_source ? u("", !0) : (h(), d("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: Lt.value === e,
					"aria-label": `Remove catalog ${Dt(e)}`,
					onClick: (t) => Vt(e)
				}, " × ", 8, ke))]),
				_: 2
			}, 1024))), 128))]),
			O.value.length > 0 ? (h(), d("div", Ae, [f("div", je, [
				n[16] ||= f("span", { class: "admin-plugins__channel-label" }, "Catalog channel", -1),
				m(oe, {
					"model-value": D.value,
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
				k.value?.advanced ? (h(), l(o, {
					key: 0,
					tone: "warning"
				}, {
					default: b(() => [...n[15] ||= [p("Opt-in · advanced", -1)]]),
					_: 1
				})) : u("", !0)
			]), k.value?.description ? (h(), d("p", {
				key: 0,
				class: _e(["admin-plugins__channel-desc", { "is-advanced": k.value.advanced }])
			}, [k.value.advanced ? (h(), l(t, {
				key: 0,
				name: "alert",
				class: "admin-plugins__channel-desc-icon"
			})) : u("", !0), f("span", null, v(k.value.description), 1)], 2)) : u("", !0)])) : u("", !0),
			N.value ? (h(), d("div", Me, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Ne, [n[17] ||= f("strong", null, "Couldn't install the plugin.", -1), f("span", null, v(N.value), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => N.value = null
				}, " × ")
			])) : u("", !0),
			B.value ? (h(), d("div", Pe, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Fe, [f("strong", null, v(B.value.title) + ".", 1), f("span", null, v(B.value.message), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[1] ||= (e) => B.value = null
				}, " × ")
			])) : u("", !0),
			yt.value ? (h(), d("div", Ie, [m(ce, {
				variant: "text",
				lines: 5
			})])) : (h(), d(s, { key: 4 }, [(h(!0), d(s, null, _(w.value.errors, (e) => (h(), d("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[18] ||= p(" Couldn't load catalog ", -1),
				f("strong", null, v(Dt(e.source)), 1),
				p(" — " + v(e.error), 1)
			]))), 128)), wt.value.length === 0 && w.value.errors.length === 0 ? (h(), l(ie, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: b(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: At
				}, {
					default: b(() => [...n[19] ||= [p("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), d("ul", Le, [(h(!0), d(s, null, _(wt.value, (e) => (h(), d("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				f("div", Re, [f("h3", ze, v(e.title), 1), f("div", Be, [
					e.type ? (h(), l(o, {
						key: 0,
						tone: "info"
					}, {
						default: b(() => [p(v(e.type), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.installed ? (h(), l(o, {
						key: 1,
						tone: "success"
					}, {
						default: b(() => [...n[20] ||= [p("Installed", -1)]]),
						_: 1
					})) : u("", !0),
					z(e.name) ? (h(), l(o, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [p(" Update → v" + v(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)
				])]),
				e.summary || e.description ? (h(), d("p", Ve, v(e.summary || e.description), 1)) : u("", !0),
				e.tags.length ? (h(), d("div", He, [(h(!0), d(s, null, _(e.tags, (e) => (h(), d("span", {
					key: e,
					class: "admin-plugins__tag"
				}, v(e), 1))), 128))])) : u("", !0),
				f("div", Ue, [e.installed ? (h(), d(s, { key: 0 }, [
					m(ae, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: V.value === e.name,
						"onUpdate:modelValue": (t) => $t(A(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[24] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					z(e.name) ? (h(), l(a, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: L.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => Yt(A(e))
					}, {
						default: b(() => [...n[21] ||= [p(" Update ", -1)]]),
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
						onClick: (t) => Cn(A(e))
					}, {
						default: b(() => [...n[22] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => H.value = A(e)
					}, {
						default: b(() => [...n[23] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (h(), d(s, { key: 1 }, [
					m(a, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: P.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => Pt(e)
					}, {
						default: b(() => [...n[25] ||= [p(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					n[26] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					f("a", {
						class: "admin-plugins__repo-link",
						href: y(re)(e.repo),
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, We)
				], 64))])
			]))), 128))]))], 64)),
			Et.value.length ? (h(), d("section", Ge, [
				n[31] ||= f("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[32] ||= f("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				f("table", Ke, [n[30] ||= f("thead", null, [f("tr", null, [
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
					f("td", qe, [p(v(e.version) + " ", 1), z(e.name) ? (h(), l(o, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [p(" → v" + v(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)]),
					f("td", null, [m(o, { tone: "info" }, {
						default: b(() => [p(v(e.type), 1)]),
						_: 2
					}, 1024)]),
					f("td", null, [m(ae, {
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
					f("td", null, [f("div", Je, [
						z(e.name) ? (h(), l(a, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: L.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => Yt(e)
						}, {
							default: b(() => [...n[27] ||= [p(" Update ", -1)]]),
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
							onClick: (t) => Cn(e)
						}, {
							default: b(() => [...n[28] ||= [p(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						m(a, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => H.value = e
						}, {
							default: b(() => [...n[29] ||= [p(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : u("", !0),
			C.value && !_t.value ? (h(), l(ie, {
				key: 6,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: C.value
			}, {
				actions: b(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: vt
				}, {
					default: b(() => [...n[33] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(se, {
				modelValue: j.value,
				"onUpdate:modelValue": n[3] ||= (e) => j.value = e,
				title: "Install from URL",
				onClose: jt
			}, {
				footer: b(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: jt
				}, {
					default: b(() => [...n[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: Ot.value,
					onClick: Nt
				}, {
					default: b(() => [...n[37] ||= [p("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Ce(Nt, ["prevent"])
				}, [f("label", Ye, [
					n[34] ||= f("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					Se(f("input", {
						"onUpdate:modelValue": n[2] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[be, M.value]]),
					n[35] ||= f("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(se, {
				modelValue: Ft.value,
				"onUpdate:modelValue": n[5] ||= (e) => Ft.value = e,
				title: "Add catalog",
				onClose: zt
			}, {
				footer: b(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: zt
				}, {
					default: b(() => [...n[40] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: It.value,
					onClick: Bt
				}, {
					default: b(() => [...n[41] ||= [p("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Ce(Bt, ["prevent"])
				}, [f("label", Xe, [
					n[38] ||= f("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					Se(f("input", {
						"onUpdate:modelValue": n[4] ||= (e) => F.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[be, F.value]]),
					n[39] ||= f("span", { class: "admin-plugins__hint" }, [
						p(" A repository (or direct "),
						f("code", null, "plugins.json"),
						p(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(se, {
				"model-value": H.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": n[7] ||= (e) => H.value = null
			}, {
				footer: b(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[6] ||= (e) => H.value = null
				}, {
					default: b(() => [...n[44] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "danger",
					size: "sm",
					onClick: en
				}, {
					default: b(() => [...n[45] ||= [p("Uninstall", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					n[42] ||= p(" Uninstall ", -1),
					f("strong", null, v(H.value?.name), 1),
					n[43] ||= p("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(se, {
				"model-value": U.value !== null,
				title: on.value,
				size: "xl",
				"onUpdate:modelValue": wn
			}, {
				footer: b(() => [
					m(a, {
						variant: "ghost",
						size: "sm",
						onClick: wn
					}, {
						default: b(() => [...n[58] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					cn.value ? (h(), l(a, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: Z.value,
						disabled: Z.value || nn.value,
						"aria-label": `Test the credentials for ${U.value?.name}`,
						onClick: On
					}, {
						default: b(() => [...n[59] ||= [p(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : u("", !0),
					cn.value ? (h(), l(a, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: nn.value,
						onClick: Dn
					}, {
						default: b(() => [...n[60] ||= [p(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : u("", !0)
				]),
				default: b(() => [tn.value ? (h(), d("div", Ze, [m(ce, {
					variant: "text",
					lines: 4
				})])) : (h(), d("div", Qe, [ln.value ? (h(), d("div", $e, [
					f("span", {
						id: `plugin-redirect-url-${U.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, et),
					f("div", tt, [f("code", nt, v(ln.value), 1), m(a, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${U.value?.name}`,
						onClick: un
					}, {
						default: b(() => [...n[46] ||= [p(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					n[47] ||= f("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					f("span", rt, v(J.value), 1)
				])) : u("", !0), cn.value ? (h(), d("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: Ce(Dn, ["prevent"])
				}, [
					q.value ? (h(), d("div", it, v(q.value), 1)) : u("", !0),
					(h(!0), d(s, null, _(sn.value, ([e, t]) => (h(), d("div", {
						key: e,
						class: "admin-plugins__field"
					}, [
						t.type === "bool" || t.type === "boolean" ? (h(), l(ae, {
							key: 0,
							"model-value": G.value[e] === !0,
							label: t.label || e,
							"onUpdate:modelValue": (t) => G.value[e] = t
						}, null, 8, [
							"model-value",
							"label",
							"onUpdate:modelValue"
						])) : (h(), d(s, { key: 1 }, [
							f("label", {
								for: `plugin-setting-${e}`,
								class: "admin-plugins__label"
							}, [p(v(t.label || e) + " ", 1), t.required ? (h(), d("span", ot, "*")) : (h(), d("span", st, "optional"))], 8, at),
							f("div", ct, [Se(f("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => G.value[e] = t,
								type: t.secret ? "password" : pn(t),
								class: _e(["admin-plugins__input", { "is-invalid": K.value[e] }]),
								autocomplete: t.secret ? "new-password" : "off",
								"data-lpignore": t.secret ? "true" : void 0,
								"data-1p-ignore": t.secret ? "" : void 0,
								"data-bwignore": t.secret ? "" : void 0,
								"data-form-type": t.secret ? "other" : void 0,
								placeholder: t.secret ? $(e) ? "Will be removed on save" : Q(e) === null ? "Leave blank to keep whatever is stored" : Q(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: t.secret && $(e),
								"aria-describedby": t.secret ? dn(e) : void 0,
								"aria-invalid": K.value[e] ? "true" : void 0
							}, null, 10, lt), [[ye, G.value[e]]]), t.secret && $(e) ? (h(), l(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${t.label || e}`,
								onClick: (t) => yn(e)
							}, {
								default: b(() => [...n[48] ||= [p(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : _n(e, t) ? (h(), l(a, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${t.label || e}`,
								onClick: (t) => vn(e)
							}, {
								default: b(() => [...n[49] ||= [p(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : u("", !0)]),
							t.secret ? (h(), d("span", {
								key: 0,
								id: dn(e),
								class: _e(["admin-plugins__secret-status", { "is-set": Q(e)?.set }])
							}, [$(e) ? (h(), d(s, { key: 0 }, [m(o, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[50] ||= [p("Will be removed", -1)]]),
								_: 1
							}), n[51] ||= p(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Q(e) === null ? (h(), d(s, { key: 1 }, [m(o, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[52] ||= [p("Unknown", -1)]]),
								_: 1
							}), n[53] ||= p(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Q(e)?.set ? (h(), d(s, { key: 2 }, [
								m(o, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: b(() => [...n[54] ||= [p("Configured", -1)]]),
									_: 1
								}),
								f("span", dt, v(gn(Q(e)?.length ?? 0)), 1),
								p(" Currently set (" + v(Q(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (h(), d(s, { key: 3 }, [m(o, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[55] ||= [p("Not set", -1)]]),
								_: 1
							}), n[56] ||= p(" No value is stored yet. ", -1)], 64))], 10, ut)) : u("", !0)
						], 64)),
						t.description || t.link ? (h(), l(ue, {
							key: 2,
							text: t.description,
							links: Sn(t)
						}, null, 8, ["text", "links"])) : u("", !0),
						bn(t) ? (h(), d("span", ft, [n[57] ||= p(" Default: ", -1), f("code", null, v(bn(t)), 1)])) : u("", !0),
						K.value[e] ? (h(), d("span", pt, v(K.value[e]), 1)) : u("", !0)
					]))), 128)),
					X.value ? (h(), d("div", {
						key: 1,
						class: _e(["admin-plugins__test-result", `admin-plugins__test-result--${X.value.tone}`])
					}, [m(o, {
						tone: X.value.tone === "success" ? "success" : X.value.tone === "failure" ? "error" : "neutral",
						class: "admin-plugins__test-state"
					}, {
						default: b(() => [p(v(X.value.tone === "success" ? "Passed" : X.value.tone === "failure" ? "Failed" : "Not supported"), 1)]),
						_: 1
					}, 8, ["tone"]), p(" " + v(X.value.message), 1)], 2)) : u("", !0)
				], 32)) : (h(), l(ie, {
					key: 1,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))]))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-e6243a30"]]);
//#endregion
export { mt as default };

//# sourceMappingURL=PluginsPage-Df3j87LK.js.map