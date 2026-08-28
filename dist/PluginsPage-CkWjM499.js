import { n as e, t } from "./Icon-CkTBN_k5.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { l as r, p as i, t as ee, u as te } from "./client-DA-5QZXw.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Badge-D1_MN41Y.js";
import { t as re } from "./Switch-H74PI5Oy.js";
import { t as ie } from "./Select-R1FOrNRB.js";
import { t as ae } from "./Modal-Cfz25d3h.js";
import { t as oe } from "./Skeleton-C3OpJbf1.js";
import { t as se } from "./EmptyState-CwWtkhEJ.js";
import { t as ce } from "./PageHint-3dL7qb5N.js";
import { t as le } from "./HelpText-B8uA160R.js";
import { i as ue, r as de, t as fe } from "./plugins-CHGMWCXI.js";
import { t as pe } from "./helpLinks-ya0IGJSe.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as me, inject as he, normalizeClass as h, onMounted as ge, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as _e, vModelDynamic as ve, vModelText as ye, watch as be, withCtx as b, withDirectives as xe, withModifiers as Se } from "vue";
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
}, pt = /*#__PURE__*/ e(/* @__PURE__ */ me({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let me = e, pt = he("apiBase", ""), mt = c(() => typeof pt == "string" ? pt : pt?.value ?? ""), x = new fe(me.client ?? new ee({
			baseUrl: mt.value,
			tokenStore: new r()
		})), S = ne(), ht = _([]), gt = _(!0), C = _(null);
		async function _t() {
			gt.value = !0, C.value = null;
			try {
				ht.value = await x.list();
			} catch (e) {
				C.value = i(e, "Failed to load plugins."), S.error(C.value);
			} finally {
				gt.value = !1;
			}
		}
		let w = _({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), vt = _(!0);
		async function T() {
			vt.value = !0;
			try {
				w.value = await x.catalog();
			} catch (e) {
				S.error(i(e, "Failed to load the plugin catalog."));
			} finally {
				vt.value = !1;
			}
		}
		async function E() {
			await Promise.all([_t(), T()]);
		}
		let D = _("stable"), O = _([]), yt = _(!1), bt = c(() => O.value.map((e) => ({
			value: e.value,
			label: e.label
		}))), k = c(() => O.value.find((e) => e.value === D.value) ?? null);
		async function xt() {
			try {
				let e = await x.getChannel();
				D.value = e.channel, O.value = e.options;
			} catch {}
		}
		async function St(e) {
			let t = String(e);
			if (t === D.value || yt.value) return;
			let n = D.value;
			D.value = t, yt.value = !0;
			try {
				let e = await x.setChannel(t);
				D.value = e.channel, e.options.length > 0 && (O.value = e.options);
				let n = k.value?.label;
				S.success(n ? `Catalog channel set to ${n}.` : "Catalog channel updated."), await T();
			} catch (e) {
				D.value = n, S.error(i(e, "Failed to change the catalog channel."));
			} finally {
				yt.value = !1;
			}
		}
		let Ct = c(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of w.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
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
		function Dt(e) {
			return {
				name: e.name,
				version: "",
				type: e.type,
				enabled: e.enabled
			};
		}
		let Ot = _(!1), A = _(""), kt = _(!1);
		function At(e) {
			switch (de(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return i(e, "Install failed — the plugin could not be downloaded or read.");
				default: return i(e, "Failed to install plugin.");
			}
		}
		function jt() {
			A.value = "", Ot.value = !0;
		}
		function Mt() {
			Ot.value = !1, A.value = "";
		}
		let j = _(null);
		function Nt(e) {
			let t = At(e);
			j.value = t, S.error(t);
		}
		async function Pt() {
			let e = A.value.trim();
			if (!e) {
				S.error("A plugin URL is required.");
				return;
			}
			kt.value = !0, j.value = null;
			try {
				await x.install(e), S.success("Plugin installed."), Mt(), await E();
			} catch (e) {
				Nt(e);
			} finally {
				kt.value = !1;
			}
		}
		let Ft = _(null);
		async function It(e) {
			if (Ft.value === null) {
				Ft.value = e.repo, j.value = null;
				try {
					await x.install(e.repo), S.success(`${e.title} installed.`), await E();
				} catch (e) {
					Nt(e);
				} finally {
					Ft.value = null;
				}
			}
		}
		let Lt = _(!1), M = _(""), Rt = _(!1), N = _(null);
		function zt() {
			M.value = "", Lt.value = !0;
		}
		function Bt() {
			Lt.value = !1, M.value = "";
		}
		async function Vt() {
			let e = M.value.trim();
			if (!e) {
				S.error("A catalog URL is required.");
				return;
			}
			Rt.value = !0;
			try {
				await x.addCatalogSource(e), S.success("Catalog added."), Bt(), await T();
			} catch (e) {
				let t = de(e);
				S.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : i(e, "Failed to add catalog."));
			} finally {
				Rt.value = !1;
			}
		}
		async function Ht(e) {
			if (N.value === null) {
				N.value = e;
				try {
					await x.removeCatalogSource(e), S.success("Catalog removed."), await T();
				} catch (e) {
					S.error(i(e, "Failed to remove catalog."));
				} finally {
					N.value = null;
				}
			}
		}
		let P = _({}), F = _(!1), I = _(!1), L = _(null), R = _(!1), Ut = c(() => Object.values(P.value).filter((e) => e.update_available).length);
		function z(e) {
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
			if (!F.value) {
				F.value = !0;
				try {
					let e = await x.checkUpdates();
					Wt(e.updates), R.value = e.auto_update;
					let t = Ut.value;
					S.success(t > 0 ? `${n(t, "update", "updates")} available.` : "All plugins are up to date.");
				} catch (e) {
					S.error(i(e, "Failed to check for updates."));
				} finally {
					F.value = !1;
				}
			}
		}
		function qt(e) {
			switch (de(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return i(e, "Update failed — the new version could not be downloaded or read.");
				default: return i(e, "Failed to update plugin.");
			}
		}
		async function Jt(e) {
			if (L.value === null) {
				L.value = e.name, B.value = null;
				try {
					await x.updatePlugin(e.name), S.success(`${e.name} updated.`), Gt(e.name), await E();
				} catch (t) {
					B.value = {
						title: `Couldn't update ${e.name}`,
						message: qt(t)
					}, S.error(qt(t));
				} finally {
					L.value = null;
				}
			}
		}
		async function Yt() {
			if (!I.value) {
				I.value = !0;
				try {
					let e = await x.updateAll();
					e.failed.length > 0 ? S.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : S.success(`${n(e.updated.length, "plugin", "plugins")} updated.`), await E();
					let t = await x.checkUpdates();
					Wt(t.updates), R.value = t.auto_update;
				} catch (e) {
					S.error(i(e, "Failed to apply updates."));
				} finally {
					I.value = !1;
				}
			}
		}
		async function Xt(e) {
			let t = R.value;
			R.value = e;
			try {
				R.value = await x.setAutoUpdate(e), S.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				R.value = t, S.error(i(e, "Failed to change auto-update."));
			}
		}
		let B = _(null);
		function Zt(e, t, n) {
			let r = i(t, n);
			B.value = {
				title: e,
				message: r
			}, S.error(r);
		}
		let V = _(null);
		async function Qt(e, t) {
			if (V.value === null) {
				V.value = e.name, B.value = null;
				try {
					t ? (await x.enable(e.name), S.success(`${e.name} enabled.`)) : (await x.disable(e.name), S.success(`${e.name} disabled.`)), await E();
				} catch (n) {
					Zt(t ? `Couldn't enable ${e.name}` : `Couldn't disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					V.value = null;
				}
			}
		}
		let H = _(null);
		async function $t() {
			let e = H.value;
			if (e) try {
				await x.uninstall(e.name), S.success(`${e.name} uninstalled.`), H.value = null, await E();
			} catch (t) {
				Zt(`Couldn't uninstall ${e.name}`, t, "Failed to uninstall plugin."), H.value = null;
			}
		}
		let U = _(null), W = _(null), en = _(!1), tn = _(!1), G = _({}), nn = _({}), K = _({}), q = _(null), J = _(""), Y = _({}), X = _(null), Z = _(!1);
		function rn() {
			X.value = null;
		}
		be([G, Y], rn, { deep: !0 });
		let an = c(() => U.value ? `Configure — ${U.value.name}` : "Configure plugin"), on = c(() => W.value ? Object.entries(W.value.settings_schema) : []), sn = c(() => on.value.length > 0), cn = c(() => W.value?.redirect_url ?? "");
		async function ln() {
			let e = cn.value;
			if (e) try {
				await navigator.clipboard.writeText(e), J.value = "Redirect URL copied to clipboard.", S.success("Redirect URL copied to clipboard.");
			} catch {
				J.value = "Could not copy the redirect URL. Copy it manually instead.", S.error("Failed to copy the redirect URL.");
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
		function Q(e) {
			return W.value?.secret_status?.[e] ?? null;
		}
		function hn(e) {
			return "•".repeat(Math.max(1, Math.min(e, 32)));
		}
		function $(e) {
			return Y.value[e] === !0;
		}
		function gn(e, t) {
			return t.secret && Q(e)?.set !== !1;
		}
		function _n(e) {
			Y.value[e] = !0, G.value[e] = "";
		}
		function vn(e) {
			delete Y.value[e];
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
			U.value = e, W.value = null, G.value = {}, nn.value = {}, K.value = {}, q.value = null, J.value = "", Y.value = {}, rn(), en.value = !0;
			try {
				let t = await x.get(e.name);
				W.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = mn(r, t.settings[e]);
				G.value = n, nn.value = { ...n };
			} catch (e) {
				S.error(i(e, "Failed to load plugin settings.")), U.value = null;
			} finally {
				en.value = !1;
			}
		}
		function Cn() {
			U.value = null, W.value = null, G.value = {}, nn.value = {}, K.value = {}, q.value = null, J.value = "", Y.value = {}, rn();
		}
		function wn() {
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
				r !== nn.value[t] && (e[t] = Tn(n, r));
			}
			return e;
		}
		function Tn(e, t) {
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
		async function En() {
			let e = U.value;
			if (!e) return;
			K.value = {}, q.value = null;
			let t = wn();
			if (Object.keys(t).length === 0) {
				S.success("No changes to save."), Cn();
				return;
			}
			tn.value = !0;
			try {
				await x.updateSettings(e.name, t), S.success("Settings saved."), Cn(), await E();
			} catch (e) {
				let t = ue(e);
				Object.keys(t).length > 0 ? (K.value = t, q.value = "Please fix the errors below and try again.", S.error("Some settings could not be saved — check the highlighted fields.")) : (q.value = i(e, "Failed to save settings."), S.error(q.value));
			} finally {
				tn.value = !1;
			}
		}
		async function Dn() {
			let e = U.value;
			if (!(!e || Z.value)) {
				rn(), Z.value = !0;
				try {
					let t = await x.testCredentials(e.name, wn());
					X.value = {
						tone: t.success ? "success" : "failure",
						message: t.message || (t.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (e) {
					de(e) === "plugin.test_not_supported" || e instanceof te && e.status === 501 ? X.value = {
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
		async function On() {
			try {
				R.value = await x.getAutoUpdate();
			} catch {}
		}
		return ge(() => {
			_t(), T(), On(), xt();
		}), (e, n) => (g(), d("section", Ce, [
			f("header", we, [n[12] ||= f("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), f("div", Te, [
				m(re, {
					"model-value": R.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": Xt
				}, null, 8, ["model-value"]),
				n[11] ||= f("span", { class: "admin-plugins__head-spacer" }, null, -1),
				m(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: F.value,
					onClick: Kt
				}, {
					default: b(() => [...n[8] ||= [p(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				Ut.value > 0 ? (g(), l(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: I.value,
					onClick: Yt
				}, {
					default: b(() => [p(" Update all (" + y(Ut.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : u("", !0),
				m(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: zt
				}, {
					default: b(() => [...n[9] ||= [p("Add catalog", -1)]]),
					_: 1
				}),
				m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: jt
				}, {
					default: b(() => [...n[10] ||= [p("Install from URL", -1)]]),
					_: 1
				})
			])]),
			m(ce, {
				links: _e(pe).plugins.links,
				details: _e(pe).plugins.details
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
			f("div", Ee, [n[14] ||= f("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (g(!0), d(s, null, v(w.value.sources, (e) => (g(), l(o, {
				key: e,
				tone: "neutral"
			}, {
				default: b(() => [f("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, y(Et(e)), 9, De), e === w.value.default_source ? u("", !0) : (g(), d("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: N.value === e,
					"aria-label": `Remove catalog ${Et(e)}`,
					onClick: (t) => Ht(e)
				}, " × ", 8, Oe))]),
				_: 2
			}, 1024))), 128))]),
			O.value.length > 0 ? (g(), d("div", ke, [f("div", Ae, [
				n[16] ||= f("span", { class: "admin-plugins__channel-label" }, "Catalog channel", -1),
				m(ie, {
					"model-value": D.value,
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
				k.value?.advanced ? (g(), l(o, {
					key: 0,
					tone: "warning"
				}, {
					default: b(() => [...n[15] ||= [p("Opt-in · advanced", -1)]]),
					_: 1
				})) : u("", !0)
			]), k.value?.description ? (g(), d("p", {
				key: 0,
				class: h(["admin-plugins__channel-desc", { "is-advanced": k.value.advanced }])
			}, [k.value.advanced ? (g(), l(t, {
				key: 0,
				name: "alert",
				class: "admin-plugins__channel-desc-icon"
			})) : u("", !0), f("span", null, y(k.value.description), 1)], 2)) : u("", !0)])) : u("", !0),
			j.value ? (g(), d("div", je, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Me, [n[17] ||= f("strong", null, "Couldn't install the plugin.", -1), f("span", null, y(j.value), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => j.value = null
				}, " × ")
			])) : u("", !0),
			B.value ? (g(), d("div", Ne, [
				m(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				f("div", Pe, [f("strong", null, y(B.value.title) + ".", 1), f("span", null, y(B.value.message), 1)]),
				f("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[1] ||= (e) => B.value = null
				}, " × ")
			])) : u("", !0),
			vt.value ? (g(), d("div", Fe, [m(oe, {
				variant: "text",
				lines: 5
			})])) : (g(), d(s, { key: 4 }, [(g(!0), d(s, null, v(w.value.errors, (e) => (g(), d("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[18] ||= p(" Couldn't load catalog ", -1),
				f("strong", null, y(Et(e.source)), 1),
				p(" — " + y(e.error), 1)
			]))), 128)), Ct.value.length === 0 && w.value.errors.length === 0 ? (g(), l(se, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: b(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: jt
				}, {
					default: b(() => [...n[19] ||= [p("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("ul", Ie, [(g(!0), d(s, null, v(Ct.value, (e) => (g(), d("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				f("div", Le, [f("h3", Re, y(e.title), 1), f("div", ze, [
					e.type ? (g(), l(o, {
						key: 0,
						tone: "info"
					}, {
						default: b(() => [p(y(e.type), 1)]),
						_: 2
					}, 1024)) : u("", !0),
					e.installed ? (g(), l(o, {
						key: 1,
						tone: "success"
					}, {
						default: b(() => [...n[20] ||= [p("Installed", -1)]]),
						_: 1
					})) : u("", !0),
					z(e.name) ? (g(), l(o, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [p(" Update → v" + y(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)
				])]),
				e.summary || e.description ? (g(), d("p", Be, y(e.summary || e.description), 1)) : u("", !0),
				e.tags.length ? (g(), d("div", Ve, [(g(!0), d(s, null, v(e.tags, (e) => (g(), d("span", {
					key: e,
					class: "admin-plugins__tag"
				}, y(e), 1))), 128))])) : u("", !0),
				f("div", He, [e.installed ? (g(), d(s, { key: 0 }, [
					m(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: V.value === e.name,
						"onUpdate:modelValue": (t) => Qt(Dt(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[24] ||= f("span", { class: "admin-plugins__card-spacer" }, null, -1),
					z(e.name) ? (g(), l(a, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: L.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => Jt(Dt(e))
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
						onClick: (t) => Sn(Dt(e))
					}, {
						default: b(() => [...n[22] ||= [p(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => H.value = Dt(e)
					}, {
						default: b(() => [...n[23] ||= [p(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (g(), d(s, { key: 1 }, [
					m(a, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: Ft.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => It(e)
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
						href: e.repo,
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, Ue)
				], 64))])
			]))), 128))]))], 64)),
			Tt.value.length ? (g(), d("section", We, [
				n[31] ||= f("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[32] ||= f("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				f("table", Ge, [n[30] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Name"),
					f("th", { scope: "col" }, "Version"),
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Enabled"),
					f("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), f("tbody", null, [(g(!0), d(s, null, v(Tt.value, (e) => (g(), d("tr", { key: e.name }, [
					f("td", null, y(e.name), 1),
					f("td", Ke, [p(y(e.version) + " ", 1), z(e.name) ? (g(), l(o, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [p(" → v" + y(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : u("", !0)]),
					f("td", null, [m(o, { tone: "info" }, {
						default: b(() => [p(y(e.type), 1)]),
						_: 2
					}, 1024)]),
					f("td", null, [m(re, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.name}`,
						disabled: V.value === e.name,
						"onUpdate:modelValue": (t) => Qt(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					f("td", null, [f("div", qe, [
						z(e.name) ? (g(), l(a, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: L.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => Jt(e)
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
							onClick: (t) => Sn(e)
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
			C.value && !gt.value ? (g(), l(se, {
				key: 6,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: C.value
			}, {
				actions: b(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: _t
				}, {
					default: b(() => [...n[33] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : u("", !0),
			m(ae, {
				modelValue: Ot.value,
				"onUpdate:modelValue": n[3] ||= (e) => Ot.value = e,
				title: "Install from URL",
				onClose: Mt
			}, {
				footer: b(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: Mt
				}, {
					default: b(() => [...n[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: kt.value,
					onClick: Pt
				}, {
					default: b(() => [...n[37] ||= [p("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Se(Pt, ["prevent"])
				}, [f("label", Je, [
					n[34] ||= f("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					xe(f("input", {
						"onUpdate:modelValue": n[2] ||= (e) => A.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[ye, A.value]]),
					n[35] ||= f("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(ae, {
				modelValue: Lt.value,
				"onUpdate:modelValue": n[5] ||= (e) => Lt.value = e,
				title: "Add catalog",
				onClose: Bt
			}, {
				footer: b(() => [m(a, {
					variant: "ghost",
					size: "sm",
					onClick: Bt
				}, {
					default: b(() => [...n[40] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(a, {
					variant: "solid",
					size: "sm",
					loading: Rt.value,
					onClick: Vt
				}, {
					default: b(() => [...n[41] ||= [p("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-plugins__form",
					onSubmit: Se(Vt, ["prevent"])
				}, [f("label", Ye, [
					n[38] ||= f("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					xe(f("input", {
						"onUpdate:modelValue": n[4] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[ye, M.value]]),
					n[39] ||= f("span", { class: "admin-plugins__hint" }, [
						p(" A repository (or direct "),
						f("code", null, "plugins.json"),
						p(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(ae, {
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
					variant: "solid",
					size: "sm",
					onClick: $t
				}, {
					default: b(() => [...n[45] ||= [p("Uninstall", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					n[42] ||= p(" Uninstall ", -1),
					f("strong", null, y(H.value?.name), 1),
					n[43] ||= p("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(ae, {
				"model-value": U.value !== null,
				title: an.value,
				size: "xl",
				"onUpdate:modelValue": Cn
			}, {
				footer: b(() => [
					m(a, {
						variant: "ghost",
						size: "sm",
						onClick: Cn
					}, {
						default: b(() => [...n[58] ||= [p("Cancel", -1)]]),
						_: 1
					}),
					sn.value ? (g(), l(a, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: Z.value,
						disabled: Z.value || tn.value,
						"aria-label": `Test the credentials for ${U.value?.name}`,
						onClick: Dn
					}, {
						default: b(() => [...n[59] ||= [p(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : u("", !0),
					sn.value ? (g(), l(a, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: tn.value,
						onClick: En
					}, {
						default: b(() => [...n[60] ||= [p(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : u("", !0)
				]),
				default: b(() => [en.value ? (g(), d("div", Xe, [m(oe, {
					variant: "text",
					lines: 4
				})])) : (g(), d("div", Ze, [cn.value ? (g(), d("div", Qe, [
					f("span", {
						id: `plugin-redirect-url-${U.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, $e),
					f("div", et, [f("code", tt, y(cn.value), 1), m(a, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${U.value?.name}`,
						onClick: ln
					}, {
						default: b(() => [...n[46] ||= [p(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					n[47] ||= f("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					f("span", nt, y(J.value), 1)
				])) : u("", !0), sn.value ? (g(), d("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: Se(En, ["prevent"])
				}, [
					q.value ? (g(), d("div", rt, y(q.value), 1)) : u("", !0),
					(g(!0), d(s, null, v(on.value, ([e, t]) => (g(), d("div", {
						key: e,
						class: "admin-plugins__field"
					}, [
						t.type === "bool" || t.type === "boolean" ? (g(), l(re, {
							key: 0,
							"model-value": G.value[e] === !0,
							label: t.label || e,
							"onUpdate:modelValue": (t) => G.value[e] = t
						}, null, 8, [
							"model-value",
							"label",
							"onUpdate:modelValue"
						])) : (g(), d(s, { key: 1 }, [
							f("label", {
								for: `plugin-setting-${e}`,
								class: "admin-plugins__label"
							}, [p(y(t.label || e) + " ", 1), t.required ? (g(), d("span", at, "*")) : (g(), d("span", ot, "optional"))], 8, it),
							f("div", st, [xe(f("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => G.value[e] = t,
								type: t.secret ? "password" : fn(t),
								class: h(["admin-plugins__input", { "is-invalid": K.value[e] }]),
								autocomplete: t.secret ? "new-password" : "off",
								"data-lpignore": t.secret ? "true" : void 0,
								"data-1p-ignore": t.secret ? "" : void 0,
								"data-bwignore": t.secret ? "" : void 0,
								"data-form-type": t.secret ? "other" : void 0,
								placeholder: t.secret ? $(e) ? "Will be removed on save" : Q(e) === null ? "Leave blank to keep whatever is stored" : Q(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: t.secret && $(e),
								"aria-describedby": t.secret ? un(e) : void 0,
								"aria-invalid": K.value[e] ? "true" : void 0
							}, null, 10, ct), [[ve, G.value[e]]]), t.secret && $(e) ? (g(), l(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${t.label || e}`,
								onClick: (t) => vn(e)
							}, {
								default: b(() => [...n[48] ||= [p(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : gn(e, t) ? (g(), l(a, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${t.label || e}`,
								onClick: (t) => _n(e)
							}, {
								default: b(() => [...n[49] ||= [p(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : u("", !0)]),
							t.secret ? (g(), d("span", {
								key: 0,
								id: un(e),
								class: h(["admin-plugins__secret-status", { "is-set": Q(e)?.set }])
							}, [$(e) ? (g(), d(s, { key: 0 }, [m(o, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[50] ||= [p("Will be removed", -1)]]),
								_: 1
							}), n[51] ||= p(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Q(e) === null ? (g(), d(s, { key: 1 }, [m(o, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[52] ||= [p("Unknown", -1)]]),
								_: 1
							}), n[53] ||= p(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Q(e)?.set ? (g(), d(s, { key: 2 }, [
								m(o, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: b(() => [...n[54] ||= [p("Configured", -1)]]),
									_: 1
								}),
								f("span", ut, y(hn(Q(e)?.length ?? 0)), 1),
								p(" Currently set (" + y(Q(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (g(), d(s, { key: 3 }, [m(o, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: b(() => [...n[55] ||= [p("Not set", -1)]]),
								_: 1
							}), n[56] ||= p(" No value is stored yet. ", -1)], 64))], 10, lt)) : u("", !0)
						], 64)),
						t.description || t.link ? (g(), l(le, {
							key: 2,
							text: t.description,
							links: xn(t)
						}, null, 8, ["text", "links"])) : u("", !0),
						yn(t) ? (g(), d("span", dt, [n[57] ||= p(" Default: ", -1), f("code", null, y(yn(t)), 1)])) : u("", !0),
						K.value[e] ? (g(), d("span", ft, y(K.value[e]), 1)) : u("", !0)
					]))), 128)),
					X.value ? (g(), d("div", {
						key: 1,
						class: h(["admin-plugins__test-result", `admin-plugins__test-result--${X.value.tone}`])
					}, [m(o, {
						tone: X.value.tone === "success" ? "success" : X.value.tone === "failure" ? "error" : "neutral",
						class: "admin-plugins__test-state"
					}, {
						default: b(() => [p(y(X.value.tone === "success" ? "Passed" : X.value.tone === "failure" ? "Failed" : "Not supported"), 1)]),
						_: 1
					}, 8, ["tone"]), p(" " + y(X.value.message), 1)], 2)) : u("", !0)
				], 32)) : (g(), l(se, {
					key: 1,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))]))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-2603eb1a"]]);
//#endregion
export { pt as default };

//# sourceMappingURL=PluginsPage-CkWjM499.js.map