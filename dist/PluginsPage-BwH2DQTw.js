import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as o } from "./Switch-DyS2L5gX.js";
import { t as s } from "./Modal-BgLqRZQi.js";
import { t as ne } from "./Skeleton-DhQmxeNg.js";
import { t as re } from "./EmptyState-ZlI5t4KT.js";
import { t as ie } from "./PageHint-BoAlFFBN.js";
import { i as ae, r as oe, t as se } from "./plugins-B6FSu-PZ.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as ce, inject as le, normalizeClass as ue, onMounted as de, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelDynamic as fe, vModelText as pe, withCtx as b, withDirectives as me, withModifiers as he } from "vue";
//#region src/pages/admin/PluginsPage.vue?vue&type=script&setup=true&lang.ts
var ge = {
	class: "admin-plugins",
	"aria-labelledby": "plugins-heading"
}, _e = { class: "admin-plugins__head" }, ve = { class: "admin-plugins__head-actions" }, ye = {
	class: "admin-plugins__sources",
	"aria-label": "Catalog sources"
}, be = ["href"], xe = [
	"disabled",
	"aria-label",
	"onClick"
], Se = {
	key: 0,
	class: "admin-plugins__install-error",
	role: "alert"
}, Ce = { class: "admin-plugins__install-error-body" }, we = {
	key: 1,
	class: "admin-plugins__install-error",
	role: "alert"
}, Te = { class: "admin-plugins__install-error-body" }, Ee = {
	key: 2,
	class: "admin-plugins__skel"
}, De = {
	key: 1,
	class: "admin-plugins__grid",
	"aria-label": "Catalog plugins"
}, Oe = { class: "admin-plugins__card-head" }, ke = { class: "admin-plugins__card-title" }, Ae = { class: "admin-plugins__card-badges" }, je = {
	key: 0,
	class: "admin-plugins__card-summary"
}, Me = {
	key: 1,
	class: "admin-plugins__card-tags"
}, Ne = { class: "admin-plugins__card-actions" }, Pe = ["href"], Fe = {
	key: 4,
	class: "admin-plugins__orphans",
	"aria-labelledby": "orphans-heading"
}, Ie = {
	class: "admin-plugins__table",
	"aria-label": "Other installed plugins"
}, Le = { class: "admin-plugins__mono" }, Re = { class: "admin-plugins__actions" }, ze = { class: "admin-plugins__field" }, Be = { class: "admin-plugins__field" }, Ve = {
	key: 0,
	class: "admin-plugins__skel"
}, He = { class: "admin-plugins__label" }, Ue = {
	key: 0,
	class: "admin-plugins__req",
	"aria-hidden": "true",
	title: "Required"
}, We = {
	key: 1,
	class: "admin-plugins__optional"
}, Ge = [
	"onUpdate:modelValue",
	"type",
	"autocomplete",
	"placeholder",
	"aria-label",
	"aria-invalid"
], Ke = {
	class: "admin-plugins__secret-dots",
	"aria-hidden": "true"
}, qe = {
	key: 2,
	class: "admin-plugins__hint"
}, Je = {
	key: 3,
	class: "admin-plugins__hint admin-plugins__default-hint"
}, Ye = ["href"], Xe = {
	key: 5,
	class: "admin-plugins__error",
	role: "alert"
}, x = /*#__PURE__*/ e(/* @__PURE__ */ ce({
	__name: "PluginsPage",
	props: { client: {} },
	setup(e) {
		let ce = e, x = le("apiBase", ""), Ze = l(() => typeof x == "string" ? x : x?.value ?? ""), S = new se(ce.client ?? new ee({
			baseUrl: Ze.value,
			tokenStore: new n()
		})), C = te(), Qe = _([]), $e = _(!0), w = _(null);
		async function et() {
			$e.value = !0, w.value = null;
			try {
				Qe.value = await S.list();
			} catch (e) {
				w.value = r(e, "Failed to load plugins."), C.error(w.value);
			} finally {
				$e.value = !1;
			}
		}
		let T = _({
			default_source: "",
			sources: [],
			catalogs: [],
			errors: []
		}), tt = _(!0);
		async function E() {
			tt.value = !0;
			try {
				T.value = await S.catalog();
			} catch (e) {
				C.error(r(e, "Failed to load the plugin catalog."));
			} finally {
				tt.value = !1;
			}
		}
		async function D() {
			await Promise.all([et(), E()]);
		}
		let nt = l(() => {
			let e = /* @__PURE__ */ new Set(), t = [];
			for (let n of T.value.catalogs) for (let r of n.plugins) e.has(r.name) || (e.add(r.name), t.push(r));
			return t;
		}), rt = l(() => new Set(nt.value.map((e) => e.name))), it = l(() => Qe.value.filter((e) => !rt.value.has(e.name)));
		function O(e) {
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
		let A = _(!1), j = _(""), at = _(!1);
		function ot(e) {
			switch (oe(e)) {
				case "plugin.url.required": return "A plugin URL is required.";
				case "plugin.url.invalid_scheme": return "That does not look like a valid plugin URL (use https://…).";
				case "plugin.install.failed": return r(e, "Install failed — the plugin could not be downloaded or read.");
				default: return r(e, "Failed to install plugin.");
			}
		}
		function st() {
			j.value = "", A.value = !0;
		}
		function ct() {
			A.value = !1, j.value = "";
		}
		let M = _(null);
		function lt(e) {
			let t = ot(e);
			M.value = t, C.error(t);
		}
		async function ut() {
			let e = j.value.trim();
			if (!e) {
				C.error("A plugin URL is required.");
				return;
			}
			at.value = !0, M.value = null;
			try {
				await S.install(e), C.success("Plugin installed."), ct(), await D();
			} catch (e) {
				lt(e);
			} finally {
				at.value = !1;
			}
		}
		let N = _(null);
		async function dt(e) {
			if (N.value === null) {
				N.value = e.repo, M.value = null;
				try {
					await S.install(e.repo), C.success(`${e.title} installed.`), await D();
				} catch (e) {
					lt(e);
				} finally {
					N.value = null;
				}
			}
		}
		let P = _(!1), F = _(""), ft = _(!1), I = _(null);
		function pt() {
			F.value = "", P.value = !0;
		}
		function mt() {
			P.value = !1, F.value = "";
		}
		async function ht() {
			let e = F.value.trim();
			if (!e) {
				C.error("A catalog URL is required.");
				return;
			}
			ft.value = !0;
			try {
				await S.addCatalogSource(e), C.success("Catalog added."), mt(), await E();
			} catch (e) {
				let t = oe(e);
				C.error(t === "plugin.catalog.url.invalid" ? "That catalog URL is not valid (use an http(s):// URL)." : r(e, "Failed to add catalog."));
			} finally {
				ft.value = !1;
			}
		}
		async function gt(e) {
			if (I.value === null) {
				I.value = e;
				try {
					await S.removeCatalogSource(e), C.success("Catalog removed."), await E();
				} catch (e) {
					C.error(r(e, "Failed to remove catalog."));
				} finally {
					I.value = null;
				}
			}
		}
		let L = _({}), R = _(!1), z = _(!1), B = _(null), V = _(!1), _t = l(() => Object.values(L.value).filter((e) => e.update_available).length);
		function H(e) {
			let t = L.value[e];
			return t && t.update_available ? t : null;
		}
		function vt(e) {
			let t = {};
			for (let n of e) n && typeof n.name == "string" && n.update_available && (t[n.name] = n);
			L.value = t;
		}
		function yt(e) {
			if (e in L.value) {
				let t = { ...L.value };
				delete t[e], L.value = t;
			}
		}
		async function bt() {
			if (!R.value) {
				R.value = !0;
				try {
					let e = await S.checkUpdates();
					vt(e.updates), V.value = e.auto_update;
					let t = _t.value;
					C.success(t > 0 ? `${t} update${t === 1 ? "" : "s"} available.` : "All plugins are up to date.");
				} catch (e) {
					C.error(r(e, "Failed to check for updates."));
				} finally {
					R.value = !1;
				}
			}
		}
		function xt(e) {
			switch (oe(e)) {
				case "plugin.update.no_source": return "This plugin has no update source — reinstall it from a URL to update.";
				case "plugin.update.failed": return r(e, "Update failed — the new version could not be downloaded or read.");
				default: return r(e, "Failed to update plugin.");
			}
		}
		async function St(e) {
			if (B.value === null) {
				B.value = e.name, U.value = null;
				try {
					await S.updatePlugin(e.name), C.success(`${e.name} updated.`), yt(e.name), await D();
				} catch (t) {
					U.value = {
						title: `Couldn't update ${e.name}`,
						message: xt(t)
					}, C.error(xt(t));
				} finally {
					B.value = null;
				}
			}
		}
		async function Ct() {
			if (!z.value) {
				z.value = !0;
				try {
					let e = await S.updateAll();
					e.failed.length > 0 ? C.error(`${e.updated.length} updated, ${e.failed.length} failed.`) : C.success(`${e.updated.length} plugin${e.updated.length === 1 ? "" : "s"} updated.`), await D();
					let t = await S.checkUpdates();
					vt(t.updates), V.value = t.auto_update;
				} catch (e) {
					C.error(r(e, "Failed to apply updates."));
				} finally {
					z.value = !1;
				}
			}
		}
		async function wt(e) {
			let t = V.value;
			V.value = e;
			try {
				V.value = await S.setAutoUpdate(e), C.success(e ? "Auto-update enabled." : "Auto-update disabled.");
			} catch (e) {
				V.value = t, C.error(r(e, "Failed to change auto-update."));
			}
		}
		let U = _(null);
		function Tt(e, t, n) {
			let ee = r(t, n);
			U.value = {
				title: e,
				message: ee
			}, C.error(ee);
		}
		let W = _(null);
		async function Et(e, t) {
			if (W.value === null) {
				W.value = e.name, U.value = null;
				try {
					t ? (await S.enable(e.name), C.success(`${e.name} enabled.`)) : (await S.disable(e.name), C.success(`${e.name} disabled.`)), await D();
				} catch (n) {
					Tt(t ? `Couldn't enable ${e.name}` : `Couldn't disable ${e.name}`, n, "Failed to update plugin.");
				} finally {
					W.value = null;
				}
			}
		}
		let G = _(null);
		async function Dt() {
			let e = G.value;
			if (e) try {
				await S.uninstall(e.name), C.success(`${e.name} uninstalled.`), G.value = null, await D();
			} catch (t) {
				Tt(`Couldn't uninstall ${e.name}`, t, "Failed to uninstall plugin."), G.value = null;
			}
		}
		let K = _(null), q = _(null), Ot = _(!1), J = _(!1), Y = _({}), X = _({}), Z = _({}), kt = l(() => K.value ? `Configure — ${K.value.name}` : "Configure plugin"), At = l(() => q.value ? Object.entries(q.value.settings_schema) : []), jt = l(() => At.value.length > 0);
		function Mt(e) {
			return e.type === "int" || e.type === "integer" || e.type === "number" || e.type === "float" ? "number" : "text";
		}
		function Nt(e) {
			return e.type === "bool" || e.type === "boolean";
		}
		function Pt(e, t) {
			return Nt(e) ? t === !0 || t === 1 || t === "1" || t === "true" : e.secret ? "" : t ?? (e.default === void 0 ? "" : e.default);
		}
		function Q(e) {
			return q.value?.secret_status?.[e] ?? null;
		}
		function Ft(e) {
			return "•".repeat(Math.max(1, Math.min(e, 32)));
		}
		function It(e) {
			if (e.secret || !("default" in e)) return null;
			let t = e.default;
			return t == null || t === "" ? null : typeof t == "boolean" ? t ? "on" : "off" : String(t);
		}
		function Lt(e) {
			return e.link_text && e.link_text.trim() !== "" ? e.link_text : "Where to get this";
		}
		async function Rt(e) {
			K.value = e, q.value = null, Y.value = {}, X.value = {}, Z.value = {}, Ot.value = !0;
			try {
				let t = await S.get(e.name);
				q.value = t;
				let n = {};
				for (let [e, r] of Object.entries(t.settings_schema)) n[e] = Pt(r, t.settings[e]);
				Y.value = n, X.value = { ...n };
			} catch (e) {
				C.error(r(e, "Failed to load plugin settings.")), K.value = null;
			} finally {
				Ot.value = !1;
			}
		}
		function $() {
			K.value = null, q.value = null, Y.value = {}, X.value = {}, Z.value = {};
		}
		function zt() {
			let e = {};
			if (!q.value) return e;
			for (let [t, n] of Object.entries(q.value.settings_schema)) {
				let r = Y.value[t];
				if (n.secret) {
					if (r === "" || r == null) continue;
					e[t] = r;
					continue;
				}
				r !== X.value[t] && (Nt(n) ? e[t] = r === !0 : Mt(n) === "number" ? e[t] = r === "" || r === null ? r : Number(r) : e[t] = r);
			}
			return e;
		}
		async function Bt() {
			let e = K.value;
			if (!e) return;
			Z.value = {};
			let t = zt();
			if (Object.keys(t).length === 0) {
				C.success("No changes to save."), $();
				return;
			}
			J.value = !0;
			try {
				await S.updateSettings(e.name, t), C.success("Settings saved."), $(), await D();
			} catch (e) {
				let t = ae(e);
				Object.keys(t).length > 0 ? (Z.value = t, C.error("Some settings could not be saved — check the highlighted fields.")) : C.error(r(e, "Failed to save settings."));
			} finally {
				J.value = !1;
			}
		}
		async function Vt() {
			try {
				V.value = await S.getAutoUpdate();
			} catch {}
		}
		return de(() => {
			et(), E(), Vt();
		}), (e, n) => (g(), f("section", ge, [
			p("header", _e, [n[12] ||= p("h1", {
				id: "plugins-heading",
				class: "admin-plugins__title"
			}, "Plugins", -1), p("div", ve, [
				h(o, {
					"model-value": V.value,
					label: "Auto-update",
					"aria-label": "Toggle automatic plugin updates",
					"onUpdate:modelValue": wt
				}, null, 8, ["model-value"]),
				n[11] ||= p("span", { class: "admin-plugins__head-spacer" }, null, -1),
				h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "rewind",
					loading: R.value,
					onClick: bt
				}, {
					default: b(() => [...n[8] ||= [m(" Check for updates ", -1)]]),
					_: 1
				}, 8, ["loading"]),
				_t.value > 0 ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "forward",
					loading: z.value,
					onClick: Ct
				}, {
					default: b(() => [m(" Update all (" + y(_t.value) + ") ", 1)]),
					_: 1
				}, 8, ["loading"])) : d("", !0),
				h(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "plus",
					onClick: pt
				}, {
					default: b(() => [...n[9] ||= [m("Add catalog", -1)]]),
					_: 1
				}),
				h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: st
				}, {
					default: b(() => [...n[10] ||= [m("Install from URL", -1)]]),
					_: 1
				})
			])]),
			h(ie, null, {
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
			}),
			p("div", ye, [n[14] ||= p("span", { class: "admin-plugins__sources-label" }, "Catalogs", -1), (g(!0), f(c, null, v(T.value.sources, (e) => (g(), u(a, {
				key: e,
				tone: "neutral"
			}, {
				default: b(() => [p("a", {
					class: "admin-plugins__source-link",
					href: e,
					target: "_blank",
					rel: "noopener noreferrer"
				}, y(O(e)), 9, be), e === T.value.default_source ? d("", !0) : (g(), f("button", {
					key: 0,
					type: "button",
					class: "admin-plugins__source-remove",
					disabled: I.value === e,
					"aria-label": `Remove catalog ${O(e)}`,
					onClick: (t) => gt(e)
				}, " × ", 8, xe))]),
				_: 2
			}, 1024))), 128))]),
			M.value ? (g(), f("div", Se, [
				h(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				p("div", Ce, [n[15] ||= p("strong", null, "Couldn't install the plugin.", -1), p("span", null, y(M.value), 1)]),
				p("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[0] ||= (e) => M.value = null
				}, " × ")
			])) : d("", !0),
			U.value ? (g(), f("div", we, [
				h(t, {
					name: "alert",
					class: "admin-plugins__install-error-icon"
				}),
				p("div", Te, [p("strong", null, y(U.value.title) + ".", 1), p("span", null, y(U.value.message), 1)]),
				p("button", {
					type: "button",
					class: "admin-plugins__install-error-dismiss",
					"aria-label": "Dismiss",
					onClick: n[1] ||= (e) => U.value = null
				}, " × ")
			])) : d("", !0),
			tt.value ? (g(), f("div", Ee, [h(ne, {
				variant: "text",
				lines: 5
			})])) : (g(), f(c, { key: 3 }, [(g(!0), f(c, null, v(T.value.errors, (e) => (g(), f("p", {
				key: e.source,
				class: "admin-plugins__catalog-error",
				role: "alert"
			}, [
				n[16] ||= m(" Couldn't load catalog ", -1),
				p("strong", null, y(O(e.source)), 1),
				m(" — " + y(e.error), 1)
			]))), 128)), nt.value.length === 0 && T.value.errors.length === 0 ? (g(), u(re, {
				key: 0,
				icon: "settings",
				title: "No plugins in the catalog",
				description: "Add a catalog source or install a plugin directly from its URL."
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: st
				}, {
					default: b(() => [...n[17] ||= [m("Install from URL", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), f("ul", De, [(g(!0), f(c, null, v(nt.value, (e) => (g(), f("li", {
				key: e.name,
				class: "admin-plugins__card"
			}, [
				p("div", Oe, [p("h3", ke, y(e.title), 1), p("div", Ae, [
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
					H(e.name) ? (g(), u(a, {
						key: 2,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [m(" Update → v" + y(H(e.name)?.latest_version), 1)]),
						_: 2
					}, 1024)) : d("", !0)
				])]),
				e.summary || e.description ? (g(), f("p", je, y(e.summary || e.description), 1)) : d("", !0),
				e.tags.length ? (g(), f("div", Me, [(g(!0), f(c, null, v(e.tags, (e) => (g(), f("span", {
					key: e,
					class: "admin-plugins__tag"
				}, y(e), 1))), 128))])) : d("", !0),
				p("div", Ne, [e.installed ? (g(), f(c, { key: 0 }, [
					h(o, {
						"model-value": e.enabled,
						label: e.enabled ? "Enabled" : "Disabled",
						"aria-label": `Toggle ${e.title}`,
						disabled: W.value === e.name,
						"onUpdate:modelValue": (t) => Et(k(e), t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					]),
					n[22] ||= p("span", { class: "admin-plugins__card-spacer" }, null, -1),
					H(e.name) ? (g(), u(i, {
						key: 0,
						variant: "solid",
						size: "sm",
						"left-icon": "forward",
						loading: B.value === e.name,
						"aria-label": `Update ${e.title}`,
						onClick: (t) => St(k(e))
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
						onClick: (t) => Rt(k(e))
					}, {
						default: b(() => [...n[20] ||= [m(" Configure ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Uninstall ${e.title}`,
						onClick: (t) => G.value = k(e)
					}, {
						default: b(() => [...n[21] ||= [m(" Uninstall ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				], 64)) : (g(), f(c, { key: 1 }, [
					h(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						loading: N.value === e.repo,
						"aria-label": `Install ${e.title}`,
						onClick: (t) => dt(e)
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
					}, "Repo ↗", 8, Pe)
				], 64))])
			]))), 128))]))], 64)),
			it.value.length ? (g(), f("section", Fe, [
				n[29] ||= p("h2", {
					id: "orphans-heading",
					class: "admin-plugins__subtitle"
				}, "Other installed plugins", -1),
				n[30] ||= p("p", { class: "admin-plugins__subnote" }, "Installed directly from a URL and not listed in any catalog.", -1),
				p("table", Ie, [n[28] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Name"),
					p("th", { scope: "col" }, "Version"),
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Enabled"),
					p("th", {
						scope: "col",
						class: "admin-plugins__actions-col"
					}, "Actions")
				])], -1), p("tbody", null, [(g(!0), f(c, null, v(it.value, (e) => (g(), f("tr", { key: e.name }, [
					p("td", null, y(e.name), 1),
					p("td", Le, [m(y(e.version) + " ", 1), H(e.name) ? (g(), u(a, {
						key: 0,
						tone: "warning",
						class: "admin-plugins__update-badge"
					}, {
						default: b(() => [m(" → v" + y(H(e.name)?.latest_version), 1)]),
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
						disabled: W.value === e.name,
						"onUpdate:modelValue": (t) => Et(e, t)
					}, null, 8, [
						"model-value",
						"label",
						"aria-label",
						"disabled",
						"onUpdate:modelValue"
					])]),
					p("td", null, [p("div", Re, [
						H(e.name) ? (g(), u(i, {
							key: 0,
							variant: "solid",
							size: "sm",
							"left-icon": "forward",
							loading: B.value === e.name,
							"aria-label": `Update ${e.name}`,
							onClick: (t) => St(e)
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
							onClick: (t) => Rt(e)
						}, {
							default: b(() => [...n[26] ||= [m(" Configure ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						h(i, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Uninstall ${e.name}`,
							onClick: (t) => G.value = e
						}, {
							default: b(() => [...n[27] ||= [m(" Uninstall ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])])
			])) : d("", !0),
			w.value && !$e.value ? (g(), u(re, {
				key: 5,
				icon: "alert",
				title: "Couldn't load installed plugins",
				description: w.value
			}, {
				actions: b(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: et
				}, {
					default: b(() => [...n[31] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : d("", !0),
			h(s, {
				modelValue: A.value,
				"onUpdate:modelValue": n[3] ||= (e) => A.value = e,
				title: "Install from URL",
				onClose: ct
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: ct
				}, {
					default: b(() => [...n[34] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: at.value,
					onClick: ut
				}, {
					default: b(() => [...n[35] ||= [m("Install", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: he(ut, ["prevent"])
				}, [p("label", ze, [
					n[32] ||= p("span", { class: "admin-plugins__label" }, "Plugin URL", -1),
					me(p("input", {
						"onUpdate:modelValue": n[2] ||= (e) => j.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugin-name",
						required: ""
					}, null, 512), [[pe, j.value]]),
					n[33] ||= p("span", { class: "admin-plugins__hint" }, " A plugin archive or git repository URL to download and install. ", -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(s, {
				modelValue: P.value,
				"onUpdate:modelValue": n[5] ||= (e) => P.value = e,
				title: "Add catalog",
				onClose: mt
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: mt
				}, {
					default: b(() => [...n[38] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: ft.value,
					onClick: ht
				}, {
					default: b(() => [...n[39] ||= [m("Add", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-plugins__form",
					onSubmit: he(ht, ["prevent"])
				}, [p("label", Be, [
					n[36] ||= p("span", { class: "admin-plugins__label" }, "Catalog URL", -1),
					me(p("input", {
						"onUpdate:modelValue": n[4] ||= (e) => F.value = e,
						type: "url",
						class: "admin-plugins__input",
						autocomplete: "off",
						placeholder: "https://github.com/owner/phlix-plugins",
						required: ""
					}, null, 512), [[pe, F.value]]),
					n[37] ||= p("span", { class: "admin-plugins__hint" }, [
						m(" A repository (or direct "),
						p("code", null, "plugins.json"),
						m(" URL) listing installable plugins. ")
					], -1)
				])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(s, {
				"model-value": G.value !== null,
				title: "Uninstall plugin",
				size: "sm",
				"onUpdate:modelValue": n[7] ||= (e) => G.value = null
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[6] ||= (e) => G.value = null
				}, {
					default: b(() => [...n[42] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Dt
				}, {
					default: b(() => [...n[43] ||= [m("Uninstall", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					n[40] ||= m(" Uninstall ", -1),
					p("strong", null, y(G.value?.name), 1),
					n[41] ||= m("? This removes the plugin and its settings and cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(s, {
				"model-value": K.value !== null,
				title: kt.value,
				size: "lg",
				"onUpdate:modelValue": $
			}, {
				footer: b(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: $
				}, {
					default: b(() => [...n[45] ||= [m("Cancel", -1)]]),
					_: 1
				}), jt.value ? (g(), u(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: J.value,
					onClick: Bt
				}, {
					default: b(() => [...n[46] ||= [m(" Save ", -1)]]),
					_: 1
				}, 8, ["loading"])) : d("", !0)]),
				default: b(() => [Ot.value ? (g(), f("div", Ve, [h(ne, {
					variant: "text",
					lines: 4
				})])) : (g(), f(c, { key: 1 }, [jt.value ? (g(), f("form", {
					key: 1,
					class: "admin-plugins__form",
					onSubmit: he(Bt, ["prevent"])
				}, [(g(!0), f(c, null, v(At.value, ([e, t]) => (g(), f("div", {
					key: e,
					class: "admin-plugins__field"
				}, [
					t.type === "bool" || t.type === "boolean" ? (g(), u(o, {
						key: 0,
						"model-value": Y.value[e] === !0,
						label: t.label || e,
						"onUpdate:modelValue": (t) => Y.value[e] = t
					}, null, 8, [
						"model-value",
						"label",
						"onUpdate:modelValue"
					])) : (g(), f(c, { key: 1 }, [
						p("span", He, [m(y(t.label || e) + " ", 1), t.required ? (g(), f("span", Ue, "*")) : (g(), f("span", We, "optional"))]),
						me(p("input", {
							"onUpdate:modelValue": (t) => Y.value[e] = t,
							type: t.secret ? "password" : Mt(t),
							class: ue(["admin-plugins__input", { "is-invalid": Z.value[e] }]),
							autocomplete: t.secret ? "new-password" : "off",
							placeholder: t.secret ? Q(e)?.set ? "Leave blank to keep the current value" : "Not set — enter a value" : void 0,
							"aria-label": t.label || e,
							"aria-invalid": Z.value[e] ? "true" : void 0
						}, null, 10, Ge), [[fe, Y.value[e]]]),
						t.secret ? (g(), f("span", {
							key: 0,
							class: ue(["admin-plugins__secret-status", { "is-set": Q(e)?.set }])
						}, [Q(e)?.set ? (g(), f(c, { key: 0 }, [p("span", Ke, y(Ft(Q(e)?.length ?? 0)), 1), m(" Currently set (" + y(Q(e)?.length) + " characters) — leave blank to keep it. ", 1)], 64)) : (g(), f(c, { key: 1 }, [m("Not set.")], 64))], 2)) : d("", !0)
					], 64)),
					t.description ? (g(), f("span", qe, y(t.description), 1)) : d("", !0),
					It(t) ? (g(), f("span", Je, [n[44] ||= m(" Default: ", -1), p("code", null, y(It(t)), 1)])) : d("", !0),
					t.link ? (g(), f("a", {
						key: 4,
						class: "admin-plugins__field-link",
						href: t.link,
						target: "_blank",
						rel: "noopener noreferrer"
					}, y(Lt(t)) + " ↗ ", 9, Ye)) : d("", !0),
					Z.value[e] ? (g(), f("span", Xe, y(Z.value[e]), 1)) : d("", !0)
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
}), [["__scopeId", "data-v-bddf3d8e"]]);
//#endregion
export { x as default };

//# sourceMappingURL=PluginsPage-BwH2DQTw.js.map