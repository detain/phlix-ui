import { g as e, l as t, t as n, y as r } from "./client-CW4dUyY-.js";
import { i as ee, r as te, t as ne } from "./plugins-BA_jLPSK.js";
import { t as re } from "./useToastStore-Bu-iYU7r.js";
import { n as ie, t as ae } from "./Icon-CIbfiPrs.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as oe } from "./PageHint-BlhPmafC.js";
import { t as se } from "./helpLinks-iarZuNmw.js";
import { t as a } from "./Button-1sKEdGjj.js";
import { t as ce } from "./Modal-BU4hJGBA.js";
import { t as le } from "./Switch-C1Wv5sN2.js";
import { t as ue } from "./Select-ChFXd0gU.js";
import { t as de } from "./Skeleton-B2Mt2L00.js";
import { t as fe } from "./EmptyState-BjOJ1k_A.js";
import { t as pe } from "./HelpText-CyBorC6S.js";
import { a as me } from "./plural-B3O2rVPV.js";
import { t as he } from "./safeHref-CxjNgvYf.js";
import { Fragment as o, computed as s, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as ge, inject as _e, normalizeClass as ve, onMounted as ye, openBlock as m, ref as h, renderList as g, toDisplayString as _, unref as be, vModelDynamic as xe, vModelText as Se, watch as Ce, withCtx as v, withDirectives as we, withModifiers as Te } from "vue";
// src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var Ee = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, De = { class: "admin-plugins__head" }, Oe = { class: "admin-plugins__head-actions" }, ke = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, Ae = ["href"], je = [
	"disabled",
	"aria-label",
	"onClick"
], Me = {
	key: 0,
	class: "admin-plugins__channel",
	role: "group",
	"aria-label": "Catalog release channel"
}, Ne = { class: "admin-plugins__channel-row" }, Pe = {
	key: 1,
	class: "admin-plugins__install-error",
	role: "alert"
}, Fe = { class: "admin-plugins__install-error-body" }, Ie = {
	key: 2,
	class: "admin-plugins__install-error",
	role: "alert"
}, Le = { class: "admin-plugins__install-error-body" }, Re = {
	key: 3,
	class: "admin-plugins__skel"
}, ze = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Be = { class: "admin-plugins__card-head" }, Ve = { class: "admin-plugins__card-title" }, He = { class: "admin-plugins__card-badges" }, Ue = {
	key: 0,
	class: "admin-plugins__card-summary"
}, We = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Ge = { class: "admin-plugins__card-actions" }, Ke = ["href"], qe = {
	key: 5,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Je = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Ye = { class: "admin-plugins__mono" }, Xe = { class: "admin-plugins__actions" }, Ze = { class: "admin-plugins__field" }, Qe = { class: "admin-plugins__field" }, $e = {
	key: 0,
	class: "admin-plugins__skel"
}, et = {
	key: 1,
	class: "admin-plugins__config-body",
	"aria-live": "polite"
}, tt = {
	key: 0,
	class: "admin-plugins__redirect"
}, nt = ["id"], rt = { class: "admin-plugins__redirect-row" }, it = { class: "admin-plugins__redirect-value" }, at = {
	class: "admin-plugins__visually-hidden",
	role: "status"
}, ot = {
	key: 0,
	class: "admin-plugins__config-error",
	role: "alert"
}, st = ["for"], ct = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true",
	title: "Required"
}, lt = {
	key: 1,
	class: "admin-plugins__optional"
}, ut = { class: "admin-plugins__secret-row" }, dt = [
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
], ft = ["id"], pt = {
	class: "admin-plugins__secret-dots",
	"aria-hidden": "true"
}, mt = {
	key: 3,
	class: "admin-plugins__hint admin-plugins__default-hint"
}, ht = {
	key: 4,
	class: "admin-plugins__error",
	role: "alert"
}, y = /*#__PURE__*/ ie(/* @__PURE__ */ ge({
	__name: "PluginsPage",
	props: { client: {} },
	setup(ie) {
		let ge = ie, y = _e("apiBase", ""), gt = s(() => typeof y == "string" ? y : y?.value ?? ""), b = new ne(ge.client ?? new n({
			baseUrl: gt.value,
			tokenStore: new t()
		})), x = re(), _t = h([]), vt = h(!0), S = h(null);
		async function yt() {
			vt.value = !0, S.value = null;
			try {
				_t.value = await b.list();
			} catch (e) {
				S.value = r(e, "Failed to load plugins."), x.error(S.value);
			} finally {
				vt.value = !1;
			}
		}
		let C = h({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), bt = h(!0);
		async function w() {
			bt.value = !0;
			try {
				C.value = await b.catalog();
			} catch (e) {
				x.error(r(e, "Failed to load the plugin catalog."));
			} finally {
				bt.value = !1;
			}
		}
		async function T() {
			await Promise.all([yt(), w()]);
		}
		let E = h("stable"), D = h([]), O = h(!1), xt = s(() => D.value.map((e) => ({
			value: e.value,
			label: e.label
		}))), k = s(() => D.value.find((e) => e.value === E.value) ?? null);
		async function St() {
			try {
				let e = await b.getChannel();
				E.value = e.channel, D.value = e.options;
			} catch {}
		}
		async function Ct(e) {
			let t = String(e);
			if (t === E.value || O.value) return;
			let n = E.value;
			E.value = t, O.value = !0;
			try {
				let e = await b.setChannel(t);
				E.value = e.channel, e.options.length > 0 && (D.value = e.options);
				let n = k.value?.label;
				x.success(n ? `Catalog channel set to ${n}.` : "Catalog channel updated."), await w();
			} catch (e) {
				E.value = n, x.error(r(e, "Failed to change the catalog channel."));
			} finally {
				O.value = !1;
			}
		}
		let wt = s(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of C.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), Tt = s(() => new Set(wt.value.map((e) => e.name))), Et = s(() => _t.value.filter((e) => !Tt.value.has(e.name)));
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
		let j = h(!1), M = h(""), Ot = h(!1);
		function kt(e) {
			switch (te(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return r(e, "Install failed — the plugin could not be downloaded or read.");
				default: return r(e, "Failed to install plugin.");
			}
		}
		function At() {
			M.value = "", j.value = !0;
		}
		function jt() {
			j.value = !1, M.value = "";
		}
		let N = h(null);
		function Mt(e) {
			let t = kt(e);
			N.value = t, x.error(t);
		}
		async function Nt() {
			let e = M.value.trim();
			if (!e) x.error("A plugin URL is required.");
			else {
				Ot.value = !0, N.value = null;
				try {
					await b.install(e), x.success("Plugin installed."), jt(), await T();
				} catch (e) {
					Mt(e);
				} finally {
					Ot.value = !1;
				}
			}
		}
		let P = h(null);
		async function Pt(e) {
			if (P.value === null) {
				P.value = e.repo, N.value = null;
				try {
					await b.install(e.repo), x.success(`${e.title} installed.`), await T();
				} catch (e) {
					Mt(e);
				} finally {
					P.value = null;
				}
			}
		}
		let Ft = h(!1), F = h(""), It = h(!1), Lt = h(null);
		function Rt() {
			F.value = "", Ft.value = !0;
		}
		function zt() {
			Ft.value = !1, F.value = "";
		}
		async function Bt() {
			let e = F.value.trim();
			if (!e) x.error("A catalog URL is required.");
			else {
				It.value = !0;
				try {
					await b.addCatalogSource(e), x.success("Catalog added."), zt(), await w();
				} catch (e) {
					let t = te(e);
					x.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : r(e, "Failed to add catalog."));
				} finally {
					It.value = !1;
				}
			}
		}
		async function Vt(e) {
			if (Lt.value === null) {
				Lt.value = e;
				try {
					await b.removeCatalogSource(e), x.success("Catalog removed."), await w();
				} catch (e) {
					x.error(r(e, "Failed to remove catalog."));
				} finally {
					Lt.value = null;
				}
			}
		}
		let I = h({}), Ht = h(!1), Ut = h(!1), L = h(null), R = h(!1), Wt = s(() => Object.values(I.value).filter((e) => e.update_available).length);
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
					let e = await b.checkUpdates();
					Gt(e.updates), R.value = e.auto_update;
					let t = Wt.value;
					x.success(t > 0 ? `${me(t, "update", "updates")} available.` : "All plugins are up to date.");
				} catch (e) {
					x.error(r(e, "Failed to check for updates."));
				} finally {
					Ht.value = !1;
				}
			}
		}
		function Jt(e) {
			switch (te(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return r(e, "Update failed — the new version could not be downloaded or read.");
				default: return r(e, "Failed to update plugin.");
			}
		}
		async function Yt(e) {
			if (L.value === null) {
				L.value = e.name, B.value = null;
				try {
					await b.updatePlugin(e.name), x.success(`${e.name} updated.`), Kt(e.name), await T();
				} catch (t) {
					B.value = {
						title: `Couldn’t update ${e.name}`,
						message: Jt(t)
					}, x.error(Jt(t));
				} finally {
					L.value = null;
				}
			}
		}
		async function Xt() {
			if (!Ut.value) {
				Ut.value = !0;
				try {
					let e = await b.updateAll();
					e.failed.length > 0 ? x.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : x.success(`${me(e.updated.length, "plugin", "plugins")} updated.`), await T();
					let t = await b.checkUpdates();
					Gt(t.updates), R.value = t.auto_update;
				} catch (e) {
					x.error(r(e, "Failed to apply updates."));
				} finally {
					Ut.value = !1;
				}
			}
		}
		async function Zt(e) {
			let t = R.value;
			R.value = e;
			try {
				R.value = await b.setAutoUpdate(e), x.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				R.value = t, x.error(r(e, "Failed to change auto-update."));
			}
		}
		let B = h(null);
		function Qt(e, t, n) {
			let ee = r(t, n);
			B.value = {
				title: e,
				message: ee
			}, x.error(ee);
		}
		let V = h(null);
		async function $t(e, t) {
			if (V.value === null) {
				V.value = e.name, B.value = null;
				try {
					t ? (await b.enable(e.name), x.success(`${e.name} enabled.`)) : (await b.disable(e.name), x.success(`${e.name} disabled.`)), await T();
				} catch (n) {
					Qt(t ? `Couldn’t enable ${e.name}` : `Couldn’t disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					V.value = null;
				}
			}
		}
		let H = h(null);
		async function en() {
			let e = H.value;
			if (e) try {
				await b.uninstall(e.name), x.success(`${e.name} uninstalled.`), H.value = null, await T();
			} catch (t) {
				Qt(`Couldn’t uninstall ${e.name}`, t, "Failed to uninstall plugin."), H.value = null;
			}
		}
		let U = h(null), W = h(null), tn = h(!1), nn = h(!1), G = h({}), rn = h({}), K = h({}), q = h(null), J = h(""), Y = h({}), X = h(null), Z = h(!1);
		function an() {
			X.value = null;
		}
		Ce([G, Y], an, { deep: !0 });
		let on = s(() => U.value ? `Configure — ${U.value.name}` : "Configure plugin"), sn = s(() => W.value ? Object.entries(W.value.settings_schema) : []), cn = s(() => sn.value.length > 0), ln = s(() => W.value?.redirect_url ?? "");
		async function un() {
			let e = ln.value;
			if (e) try {
				await navigator.clipboard.writeText(e), J.value = "Redirect URL copied to clipboard.", x.success("Redirect URL copied to clipboard.");
			} catch {
				J.value = "Could not copy the redirect URL. Copy it manually instead.", x.error("Failed to copy the redirect URL.");
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
				let t = await b.get(e.name);
				W.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = hn(r, t.settings[e]);
				G.value = n, rn.value = { ...n };
			} catch (e) {
				x.error(r(e, "Failed to load plugin settings.")), U.value = null;
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
			let t = Tn();
			if (Object.keys(t).length === 0) x.success("No changes to save."), wn();
			else {
				nn.value = !0;
				try {
					await b.updateSettings(e.name, t), x.success("Settings saved."), wn(), await T();
				} catch (e) {
					let t = ee(e);
					Object.keys(t).length > 0 ? (K.value = t, q.value = "Fix the errors below and try again.", x.error("Some settings could not be saved — check the highlighted fields.")) : (q.value = r(e, "Failed to save settings."), x.error(q.value));
				} finally {
					nn.value = !1;
				}
			}
		}
		async function On() {
			let t = U.value;
			if (t && !Z.value) {
				an(), Z.value = !0;
				try {
					let e = await b.testCredentials(t.name, Tn());
					X.value = {
						tone: e.success ? "success" : "failure",
						message: e.message || (e.success ? "Credentials are valid." : "Credentials were rejected.")
					};
				} catch (t) {
					te(t) === "plugin.test_not_supported" || t instanceof e && t.status === 501 ? X.value = {
						tone: "unsupported",
						message: "This plugin does not support testing credentials."
					} : X.value = {
						tone: "failure",
						message: r(t, "Could not run the credential test.")
					};
				} finally {
					Z.value = !1;
				}
			}
		}
		async function kn() {
			try {
				R.value = await b.getAutoUpdate();
			} catch {}
		}
		return ye(() => {
			yt(), w(), kn(), St();
		}), (e, t) => (m(), u("section", Ee, [
			d("header", De, [t[12] ||= d("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), d("div", Oe, [
				p(le, {
					"model-value": R.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": Zt
				}, null, 8, ["model-value"]),
				t[11] ||= d("span", { class: "admin-plugins__head-spacer" }, null, -1),
				p(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: Ht.value,
					onClick: qt
				}, {
					default: v(() => [...t[8] ||= [f(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				Wt.value > 0 ? (m(), c(a, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: Ut.value,
					onClick: Xt
				}, {
					default: v(() => [f(" Update all (" + _(Wt.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : l("", !0),
				p(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: Rt
				}, {
					default: v(() => [...t[9] ||= [f("Add catalog", -1)]]),
					_: 1
				}),
				p(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: At
				}, {
					default: v(() => [...t[10] ||= [f("Install from URL", -1)]]),
					_: 1
				})
			])]),
			p(oe, {
				links: be(se).plugins.links,
				details: be(se).plugins.details
			}, {
				default: v(() => [...t[13] ||= [
					f(" Extend Phlix with add-ons from the plugin catalog. On each catalog plugin, toggle its switch to ", -1),
					d("strong", null, "enable/disable", -1),
					f(" it, ", -1),
					d("strong", null, "Install", -1),
					f(" or ", -1),
					d("strong", null, "Uninstall", -1),
					f(" it, ", -1),
					d("strong", null, "Configure", -1),
					f(" its settings, or ", -1),
					d("strong", null, "Update", -1),
					f(" when a new version is out. Up top, ", -1),
					d("strong", null, "Check for updates", -1),
					f(" refreshes availability, ", -1),
					d("strong", null, "Update all", -1),
					f(" upgrades everything at once, ", -1),
					d("strong", null, "Auto-update", -1),
					f(" keeps plugins current automatically, and ", -1),
					d("strong", null, "Add catalog", -1),
					f(" / ", -1),
					d("strong", null, "Install from URL", -1),
					f(" pull in sources or plugins from outside the default catalog. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			d("div", ke, [t[14] ||= d("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (m(!0), u(o, null, g(C.value.sources, (e) => (m(), c(i, {
				key: e,
				tone: "neutral"
			}, {
				default: v(() => [d("a", {
					class: "admin-plugins__source-link",
					href: be(he)(e),
					target: "_blank",
					rel: "noopener noreferrer"
				}, _(Dt(e)), 9, Ae), e === C.value.default_source ? l("", !0) : (m(), u("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: Lt.value === e,
					"aria-label": `Remove catalog ${Dt(e)}`,
					onClick: (t) => Vt(e)
				}, " × ", 8, je))]),
				_: 2
			}, 1024))), 128))]),
			D.value.length > 0 ? (m(), u("div", Me, [d("div", Ne, [
				t[16] ||= d("span", { class: "admin-plugins__channel-label" }, "Catalog channel", -1),
				p(ue, {
					"model-value": E.value,
					options: xt.value,
					disabled: O.value,
					label: "Catalog channel",
					class: "admin-plugins__channel-select",
					"onUpdate:modelValue": Ct
				}, null, 8, [
					"model-value",
					"options",
					"disabled"
				]),
				k.value?.advanced ? (m(), c(i, {
					key: 0,
					tone: "warning"
				}, {
					default: v(() => [...t[15] ||= [f("Opt-in · advanced", -1)]]),
					_: 1
				})) : l("", !0)
			]), k.value?.description ? (m(), u("p", {
				key: 0,
				class: ve(["admin-plugins__channel-desc", { "is-advanced": k.value.advanced }])
			}, [k.value.advanced ? (m(), c(ae, {
				key: 0,
				name: "alert",
				class: "admin-plugins__channel-desc-icon"
			})) : l("", !0), d("span", null, _(k.value.description), 1)], 2)) : l("", !0)])) : l("", !0),
			N.value ? (m(), u("div", Pe, [
				p(ae, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				d("div", Fe, [t[17] ||= d("strong", null, "Couldn’t install the plugin.", -1), d("span", null, _(N.value), 1)]),
				d("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: t[0] ||= (e) => N.value = null
				}, " × ")
			])) : l("", !0),
			B.value ? (m(), u("div", Ie, [
				p(ae, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				d("div", Le, [d("strong", null, _(B.value.title) + ".", 1), d("span", null, _(B.value.message), 1)]),
				d("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: t[1] ||= (e) => B.value = null
				}, " × ")
			])) : l("", !0),
			bt.value ? (m(), u("div", Re, [p(de, {
				variant: "text",
				lines: 5
			})])) : (m(), u(o, { key: 4 }, [(m(!0), u(o, null, g(C.value.errors, (e) => (m(), u("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				t[18] ||= f(" Couldn’t load catalog ", -1),
				d("strong", null, _(Dt(e.source)), 1),
				f(" — " + _(e.error), 1)
			]))), 128)), wt.value.length === 0 && C.value.errors.length === 0 ? (m(), c(fe, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: v(() => [p(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: At
				}, {
					default: v(() => [...t[19] ||= [f("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (m(), u("ul", ze, [(m(!0), u(o, null, g(wt.value, (e) => (m(), u("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				d("div", Be, [d("h3", Ve, _(e.title), 1), d("div", He, [
					e.type ? (m(), c(i, {
						key: 0,
						tone: "info"
					}, {
						default: v(() => [f(_(e.type), 1)]),
						_: 2
					}, 1024)) : l("", !0),
					e.installed ? (m(), c(i, {
						key: 1,
						tone: "success"
					}, {
						default: v(() => [...t[20] ||= [f("Installed", -1)]]),
						_: 1
					})) : l("", !0),
					z(e.name) ? (m(), c(i, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: v(() => [f(" Update → v" + _(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : l("", !0)
				])]),
				e.summary || e.description ? (m(), u("p", Ue, _(e.summary || e.description), 1)) : l("", !0),
				e.tags.length ? (m(), u("div", We, [(m(!0), u(o, null, g(e.tags, (e) => (m(), u("span", {
					key: e,
					class: "admin-plugins__tag"
				}, _(e), 1))), 128))])) : l("", !0),
				d("div", Ge, [e.installed ? (m(), u(o, { key: 0 }, [
					p(le, {
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
					t[24] ||= d("span", { class: "admin-plugins__card-spacer" }, null, -1),
					z(e.name) ? (m(), c(a, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: L.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => Yt(A(e))
					}, {
						default: v(() => [...t[21] ||= [f(" Update ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])) : l("", !0),
					p(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Configure ${e.title}`,
						onClick: (t) => Cn(A(e))
					}, {
						default: v(() => [...t[22] ||= [f(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					p(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => H.value = A(e)
					}, {
						default: v(() => [...t[23] ||= [f(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (m(), u(o, { key: 1 }, [
					p(a, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: P.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => Pt(e)
					}, {
						default: v(() => [...t[25] ||= [f(" Install ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					]),
					t[26] ||= d("span", { class: "admin-plugins__card-spacer" }, null, -1),
					d("a", {
						class: "admin-plugins__repo-link",
						href: be(he)(e.repo),
						target: "_blank",
						rel: "noopener noreferrer"
					}, "Repo ↗", 8, Ke)
				], 64))])
			]))), 128))]))], 64)),
			Et.value.length ? (m(), u("section", qe, [
				t[31] ||= d("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				t[32] ||= d("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				d("table", Je, [t[30] ||= d("thead", null, [d("tr", null, [
					d("th", { scope: "col" }, "Name"),
					d("th", { scope: "col" }, "Version"),
					d("th", { scope: "col" }, "Type"),
					d("th", { scope: "col" }, "Enabled"),
					d("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), d("tbody", null, [(m(!0), u(o, null, g(Et.value, (e) => (m(), u("tr", { key: e.name }, [
					d("td", null, _(e.name), 1),
					d("td", Ye, [f(_(e.version) + " ", 1), z(e.name) ? (m(), c(i, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: v(() => [f(" → v" + _(z(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : l("", !0)]),
					d("td", null, [p(i, { tone: "info" }, {
						default: v(() => [f(_(e.type), 1)]),
						_: 2
					}, 1024)]),
					d("td", null, [p(le, {
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
					d("td", null, [d("div", Xe, [
						z(e.name) ? (m(), c(a, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: L.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => Yt(e)
						}, {
							default: v(() => [...t[27] ||= [f(" Update ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])) : l("", !0),
						p(a, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Configure ${e.name}`,
							onClick: (t) => Cn(e)
						}, {
							default: v(() => [...t[28] ||= [f(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						p(a, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => H.value = e
						}, {
							default: v(() => [...t[29] ||= [f(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : l("", !0),
			S.value && !vt.value ? (m(), c(fe, {
				key: 6,
				icon: "alert",
				title: "Couldn’t load installed plugins",
				description: S.value
			}, {
				actions: v(() => [p(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: yt
				}, {
					default: v(() => [...t[33] ||= [f("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : l("", !0),
			p(ce, {
				modelValue: j.value,
				"onUpdate:modelValue": t[3] ||= (e) => j.value = e,
				title: "Install from URL",
				onClose: jt
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: jt
				}, {
					default: v(() => [...t[36] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					variant: "solid",
					size: "sm",
					loading: Ot.value,
					onClick: Nt
				}, {
					default: v(() => [...t[37] ||= [f("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					class: "admin-plugins__form",
					onSubmit: Te(Nt, ["prevent"])
				}, [d("label", Ze, [
					t[34] ||= d("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					we(d("input", {
						"onUpdate:modelValue": t[2] ||= (e) => M.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[Se, M.value]]),
					t[35] ||= d("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			p(ce, {
				modelValue: Ft.value,
				"onUpdate:modelValue": t[5] ||= (e) => Ft.value = e,
				title: "Add catalog",
				onClose: zt
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: zt
				}, {
					default: v(() => [...t[40] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					variant: "solid",
					size: "sm",
					loading: It.value,
					onClick: Bt
				}, {
					default: v(() => [...t[41] ||= [f("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: v(() => [d("form", {
					class: "admin-plugins__form",
					onSubmit: Te(Bt, ["prevent"])
				}, [d("label", Qe, [
					t[38] ||= d("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					we(d("input", {
						"onUpdate:modelValue": t[4] ||= (e) => F.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[Se, F.value]]),
					t[39] ||= d("span", { class: "admin-plugins__hint" }, [
						f(" A repository (or direct "),
						d("code", null, "plugins.json"),
						f(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			p(ce, {
				"model-value": H.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": t[7] ||= (e) => H.value = null
			}, {
				footer: v(() => [p(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[6] ||= (e) => H.value = null
				}, {
					default: v(() => [...t[44] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(a, {
					variant: "danger",
					size: "sm",
					onClick: en
				}, {
					default: v(() => [...t[45] ||= [f("Uninstall", -1)]]),
					_: 1
				})]),
				default: v(() => [d("p", null, [
					t[42] ||= f(" Uninstall ", -1),
					d("strong", null, _(H.value?.name), 1),
					t[43] ||= f("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			p(ce, {
				"model-value": U.value !== null,
				title: on.value,
				size: "xl",
				"onUpdate:modelValue": wn
			}, {
				footer: v(() => [
					p(a, {
						variant: "ghost",
						size: "sm",
						onClick: wn
					}, {
						default: v(() => [...t[58] ||= [f("Cancel", -1)]]),
						_: 1
					}),
					cn.value ? (m(), c(a, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: Z.value,
						disabled: Z.value || nn.value,
						"aria-label": `Test the credentials for ${U.value?.name}`,
						onClick: On
					}, {
						default: v(() => [...t[59] ||= [f(" Test credentials ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label"
					])) : l("", !0),
					cn.value ? (m(), c(a, {
						key: 1,
						variant: "solid",
						size: "sm",
						loading: nn.value,
						onClick: Dn
					}, {
						default: v(() => [...t[60] ||= [f(" Save ", -1)]]),
						_: 1
					}, 8, ["loading"])) : l("", !0)
				]),
				default: v(() => [tn.value ? (m(), u("div", $e, [p(de, {
					variant: "text",
					lines: 4
				})])) : (m(), u("div", et, [ln.value ? (m(), u("div", tt, [
					d("span", {
						id: `plugin-redirect-url-${U.value?.name}`,
						class: "admin-plugins__label"
					}, " Redirect URL ", 8, nt),
					d("div", rt, [d("code", it, _(ln.value), 1), p(a, {
						variant: "outline",
						size: "sm",
						"aria-label": `Copy the redirect URL for ${U.value?.name}`,
						onClick: un
					}, {
						default: v(() => [...t[46] ||= [f(" Copy ", -1)]]),
						_: 1
					}, 8, ["aria-label"])]),
					t[47] ||= d("span", { class: "admin-plugins__hint" }, " Paste this into the provider's application settings to complete the connection. ", -1),
					d("span", at, _(J.value), 1)
				])) : l("", !0), cn.value ? (m(), u("form", {
					key: 2,
					class: "admin-plugins__form",
					onSubmit: Te(Dn, ["prevent"])
				}, [
					q.value ? (m(), u("div", ot, _(q.value), 1)) : l("", !0),
					(m(!0), u(o, null, g(sn.value, ([e, n]) => (m(), u("div", {
						key: e,
						class: "admin-plugins__field"
					}, [
						n.type === "bool" || n.type === "boolean" ? (m(), c(le, {
							key: 0,
							"model-value": G.value[e] === !0,
							label: n.label || e,
							"onUpdate:modelValue": (t) => G.value[e] = t
						}, null, 8, [
							"model-value",
							"label",
							"onUpdate:modelValue"
						])) : (m(), u(o, { key: 1 }, [
							d("label", {
								for: `plugin-setting-${e}`,
								class: "admin-plugins__label"
							}, [f(_(n.label || e) + " ", 1), n.required ? (m(), u("span", ct, "*")) : (m(), u("span", lt, "optional"))], 8, st),
							d("div", ut, [we(d("input", {
								id: `plugin-setting-${e}`,
								"onUpdate:modelValue": (t) => G.value[e] = t,
								type: n.secret ? "password" : pn(n),
								class: ve(["admin-plugins__input", { "is-invalid": K.value[e] }]),
								autocomplete: n.secret ? "new-password" : "off",
								"data-lpignore": n.secret ? "true" : void 0,
								"data-1p-ignore": n.secret ? "" : void 0,
								"data-bwignore": n.secret ? "" : void 0,
								"data-form-type": n.secret ? "other" : void 0,
								placeholder: n.secret ? $(e) ? "Will be removed on save" : Q(e) === null ? "Leave blank to keep whatever is stored" : Q(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
								disabled: n.secret && $(e),
								"aria-describedby": n.secret ? dn(e) : void 0,
								"aria-invalid": K.value[e] ? "true" : void 0
							}, null, 10, dt), [[xe, G.value[e]]]), n.secret && $(e) ? (m(), c(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${n.label || e}`,
								onClick: (t) => yn(e)
							}, {
								default: v(() => [...t[48] ||= [f(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : _n(e, n) ? (m(), c(a, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${n.label || e}`,
								onClick: (t) => vn(e)
							}, {
								default: v(() => [...t[49] ||= [f(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : l("", !0)]),
							n.secret ? (m(), u("span", {
								key: 0,
								id: dn(e),
								class: ve(["admin-plugins__secret-status", { "is-set": Q(e)?.set }])
							}, [$(e) ? (m(), u(o, { key: 0 }, [p(i, {
								tone: "warning",
								class: "admin-plugins__secret-state"
							}, {
								default: v(() => [...t[50] ||= [f("Will be removed", -1)]]),
								_: 1
							}), t[51] ||= f(" The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Q(e) === null ? (m(), u(o, { key: 1 }, [p(i, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: v(() => [...t[52] ||= [f("Unknown", -1)]]),
								_: 1
							}), t[53] ||= f(" This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ", -1)], 64)) : Q(e)?.set ? (m(), u(o, { key: 2 }, [
								p(i, {
									tone: "success",
									class: "admin-plugins__secret-state"
								}, {
									default: v(() => [...t[54] ||= [f("Configured", -1)]]),
									_: 1
								}),
								d("span", pt, _(gn(Q(e)?.length ?? 0)), 1),
								f(" Currently set (" + _(Q(e)?.length) + " characters) — leave blank to keep it. ", 1)
							], 64)) : (m(), u(o, { key: 3 }, [p(i, {
								tone: "neutral",
								class: "admin-plugins__secret-state"
							}, {
								default: v(() => [...t[55] ||= [f("Not set", -1)]]),
								_: 1
							}), t[56] ||= f(" No value is stored yet. ", -1)], 64))], 10, ft)) : l("", !0)
						], 64)),
						n.description || n.link ? (m(), c(pe, {
							key: 2,
							text: n.description,
							links: Sn(n)
						}, null, 8, ["text", "links"])) : l("", !0),
						bn(n) ? (m(), u("span", mt, [t[57] ||= f(" Default: ", -1), d("code", null, _(bn(n)), 1)])) : l("", !0),
						K.value[e] ? (m(), u("span", ht, _(K.value[e]), 1)) : l("", !0)
					]))), 128)),
					X.value ? (m(), u("div", {
						key: 1,
						class: ve(["admin-plugins__test-result", `admin-plugins__test-result--${X.value.tone}`])
					}, [p(i, {
						tone: X.value.tone === "success" ? "success" : X.value.tone === "failure" ? "error" : "neutral",
						class: "admin-plugins__test-state"
					}, {
						default: v(() => [f(_(X.value.tone === "success" ? "Passed" : X.value.tone === "failure" ? "Failed" : "Not supported"), 1)]),
						_: 1
					}, 8, ["tone"]), f(" " + _(X.value.message), 1)], 2)) : l("", !0)
				], 32)) : (m(), c(fe, {
					key: 1,
					icon: "settings",
					title: "No configurable settings",
					description: "This plugin does not expose any settings."
				}))]))]),
				_: 1
			}, 8, ["model-value", "title"])
		]));
	}
}), [["__scopeId", "data-v-e65de528"]]);
export { y as default };

//# sourceMappingURL=PluginsPage-CLBxJkWZ.js.map