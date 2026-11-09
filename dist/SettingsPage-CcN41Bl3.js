import { t as e, v as t, x as n } from "./client-DJuRD7ph.js";
import { n as r, t as i } from "./useSettingsPrefs-DMICt8xK.js";
import { t as a } from "./useToastStore-CxO_ppM8.js";
import { r as o, t as ee } from "./wireErrors-Co8mQ_pI.js";
import { t as s } from "./Badge-D7vacFbh.js";
import { t as te } from "./PageHint-C2jY1TZi.js";
import { t as ne } from "./helpLinks-3xhEuW25.js";
import { t as c } from "./Button-Dfl4y6vO.js";
import { t as re } from "./Select-r5PX08M4.js";
import { t as ie } from "./Switch-C607L4Vu.js";
import { t as ae } from "./Tabs-DZRiZml3.js";
import { t as oe } from "./Skeleton-DDhrDRE7.js";
import { t as se } from "./EmptyState-DjfWh3kt.js";
import { t as l } from "./HelpText-B3jlK4n_.js";
import { a as ce, o as le } from "./plural-B3O2rVPV.js";
import { t as ue } from "./useMessages-D54Bje5m.js";
import { n as de } from "./Icon-55iG1rR7.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as fe, normalizeClass as pe, onBeforeUnmount as me, onMounted as he, openBlock as y, reactive as b, ref as x, renderList as ge, toDisplayString as S, unref as C, withCtx as w, withModifiers as _e } from "vue";
import { matchedRouteKey as ve, onBeforeRouteLeave as ye } from "vue-router";
// src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var be = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, xe = {
	key: 0,
	class: "admin-settings__skel"
}, Se = {
	key: 0,
	class: "settings-meta-notice",
	role: "status"
}, Ce = { class: "admin-settings__header-row" }, we = { class: "settings-advanced-toggle" }, Te = {
	key: 1,
	class: "settings-restart-banner",
	role: "alert"
}, Ee = { class: "settings-restart-banner__actions" }, De = ["disabled"], Oe = ["disabled"], ke = { class: "admin-settings__panel" }, Ae = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, je = { class: "admin-settings__row" }, Me = ["for"], Ne = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"aria-invalid",
	"disabled",
	"onInput"
], Pe = ["for"], Fe = {
	key: 1,
	class: "admin-settings__option-help"
}, Ie = { class: "admin-settings__option-help-term" }, Le = { class: "admin-settings__option-help-desc" }, Re = ["for"], ze = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Be = {
	key: 1,
	class: "admin-settings__error",
	role: "alert"
}, Ve = ["for"], He = ["id"], Ue = {
	key: 1,
	class: "admin-settings__secret-hint"
}, We = { class: "admin-settings__secret-hint" }, Ge = { class: "admin-settings__row" }, Ke = [
	"id",
	"type",
	"aria-describedby",
	"placeholder",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], qe = ["for"], Je = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Ye = {
	key: 6,
	class: "field-restart-note"
}, Xe = {
	key: 7,
	class: "admin-settings__error",
	role: "alert"
}, Ze = { class: "admin-settings__actions" }, Qe = {
	key: 0,
	class: "admin-settings__pending",
	role: "status"
}, $e = "other", et = "phlix-restart-pending", tt = 200, T = /*#__PURE__*/ de(/* @__PURE__ */ v({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(de) {
		let v = de, T = fe("apiBase", ""), nt = d(() => typeof T == "string" ? T : T?.value ?? ""), rt = v.client ?? new e({ baseUrl: nt.value }), E = new r(rt), D = a(), O = i(), { t: k } = ue(), it = fe("phlixConfig", null), at = x({}), ot = x([]), A = x({}), st = x({}), ct = x({}), lt = d(() => Object.keys(ct.value).length === 0 && Object.keys(A.value).length > 0);
		function ut(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function dt(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function ft(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function pt(e) {
			return {
				label: ft(e),
				helpText: "",
				helpLinks: [],
				tier: "standard",
				group: $e,
				enum: null,
				enumLabels: null,
				optionHelp: null,
				minimum: null,
				maximum: null,
				default: void 0,
				secret: !1,
				restart: !1
			};
		}
		let j = d(() => {
			if (!lt.value) return ct.value;
			let e = {};
			for (let t of Object.keys(A.value)) e[t] = pt(t);
			return e;
		}), mt = d(() => {
			let e = new Set(Object.values(j.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: ht(e),
				muted: !O.advancedMode && Gt(e),
				badge: xt.value[e] || void 0
			}));
		});
		function ht(e) {
			for (let t of Object.values(j.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return dt(e);
		}
		let M = x(""), gt = x(!0), N = x(null), _t = x(!1), P = x(!1), F = x({}), I = b({}), L = b({}), R = b({}), z = b({}), B = b({}), vt = d(() => Object.values(z).some(Boolean) || Object.values(L).some(Boolean)), yt = d(() => {
			let e = Object.keys(z).filter((e) => z[e] && !q(e));
			for (let t of Object.keys(L)) L[t] && !q(t) && !e.includes(t) && e.push(t);
			return e;
		}), bt = d(() => yt.value.map(J)), xt = d(() => {
			let e = {};
			for (let t of yt.value) {
				let n = j.value[t]?.group ?? $e;
				e[n] = (e[n] ?? 0) + 1;
			}
			return e;
		}), St = d(() => Object.entries(j.value).filter(([, e]) => e.group === M.value).map(([e]) => e)), Ct = d(() => Object.entries(j.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function wt(e) {
			return j.value[e]?.restart === !0;
		}
		let V = x([]), Tt = d(() => V.value.length > 0), Et = d(() => `${et}:${nt.value || "default"}`), Dt = d(() => V.value.map((e) => J(e)));
		function Ot() {
			if (typeof localStorage < "u") try {
				let e = localStorage.getItem(Et.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (V.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function kt() {
			if (typeof localStorage < "u") try {
				V.value.length === 0 ? localStorage.removeItem(Et.value) : localStorage.setItem(Et.value, JSON.stringify(V.value));
			} catch {}
		}
		function At(e) {
			let t = /* @__PURE__ */ new Set([...V.value, ...e]);
			V.value = Array.from(t), kt();
		}
		function jt() {
			V.value = [], kt();
		}
		function H(e) {
			return ot.value.includes(e);
		}
		function Mt(e) {
			return W(e) === "json";
		}
		function Nt(e) {
			return j.value[e]?.secret === !0;
		}
		function U(e) {
			return st.value[e] ?? null;
		}
		function Pt(e) {
			return U(e)?.set === !0;
		}
		function Ft(e) {
			let t = U(e);
			return t?.set === !0 ? t.length : 0;
		}
		function It(e) {
			return `secret-status-${e}`;
		}
		function Lt(e, t) {
			if (Nt(e)) return "";
			if (Mt(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function Rt(e) {
			for (let e of Object.keys(R)) delete R[e];
			for (let e of Object.keys(B)) delete B[e];
			for (let [t, n] of Object.entries(e)) R[t] = Lt(t, n);
		}
		function zt() {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(I)) delete I[e];
			for (let e of Object.keys(L)) delete L[e];
		}
		function Bt(e) {
			at.value = e.settings, ot.value = e.overridden, e.secretStatus && (st.value = e.secretStatus), Rt(e.settings), zt();
		}
		async function Vt() {
			gt.value = !0, N.value = null;
			try {
				let e = await E.get();
				A.value = e.types, ct.value = e.meta, Bt(e), F.value = {}, (!M.value || !mt.value.some((e) => e.value === M.value)) && mt.value.length > 0 && (M.value = mt.value[0].value);
			} catch (e) {
				N.value = o(e, k("settings.loadFailed"), it?.locale), D.error(N.value);
			} finally {
				gt.value = !1;
			}
		}
		function W(e) {
			return A.value[e] ?? "string";
		}
		function Ht(e) {
			let t = j.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Ut(e) {
			let t = j.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function Wt(e) {
			let t = j.value[e];
			if (!t || !Array.isArray(t.enum) || !t.optionHelp) return [];
			let n = t.optionHelp;
			return t.enum.filter((e) => typeof n[e] == "string" && n[e] !== "").map((e) => ({
				value: e,
				label: t.enumLabels?.[e] ?? (e === "" ? "Auto" : e),
				help: n[e]
			}));
		}
		function G(e) {
			let t = j.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function K(e) {
			return j.value[e]?.tier === "advanced";
		}
		function Gt(e) {
			let t = Object.keys(j.value).filter((t) => j.value[t]?.group === e);
			return t.length > 0 && t.every((e) => K(e));
		}
		function q(e) {
			return K(e) && !O.advancedMode;
		}
		function J(e) {
			return j.value[e]?.label || ut(e);
		}
		function Y(e) {
			return j.value[e]?.helpText;
		}
		function X(e) {
			return j.value[e]?.helpLinks;
		}
		function Z(e) {
			return !!Y(e) || (X(e)?.length ?? 0) > 0;
		}
		function Q(e, t) {
			R[e] = t, z[e] = t !== Lt(e, at.value[e]);
		}
		function Kt(e) {
			try {
				return JSON.stringify(at.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function qt(e, t) {
			R[e] = t;
			try {
				let n = JSON.parse(t);
				delete B[e], z[e] = JSON.stringify(n) !== Kt(e);
			} catch (t) {
				B[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, z[e] = !0;
			}
		}
		let Jt = d(() => Object.keys(B).filter((e) => z[e] && !q(e)));
		function Yt(e) {
			I[e] = !I[e];
		}
		function Xt(e) {
			return z[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return L[e] === !0;
		}
		function Zt(e) {
			return Nt(e) && !q(e) && U(e)?.set !== !1;
		}
		function Qt(e) {
			L[e] = !0, Q(e, ""), I[e] = !1;
		}
		function $t(e) {
			delete L[e];
		}
		function en(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function tn() {
			let e = Date.now(), t = v.restartPollIntervalMs;
			for (; Date.now() - e < v.restartPollTimeoutMs;) {
				await en(t), t = Math.min(t + v.restartPollIntervalMs / 2, v.restartPollIntervalMs * 3);
				try {
					let e = await E.get();
					return A.value = e.types, ct.value = e.meta, Bt(e), F.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function nn() {
			if (!P.value) {
				P.value = !0;
				try {
					await E.restartServer(), D.success("Restart signal sent — waiting for the server to come back…"), await tn() ? (jt(), D.success("Server is back online.")) : D.error(`The server did not respond within ${Math.round(v.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					D.error(o(e, "Failed to restart server.", it?.locale));
				} finally {
					P.value = !1;
				}
			}
		}
		function rn() {
			let e = {};
			for (let [t, n] of Object.entries(z)) {
				if (!n || q(t)) continue;
				let r = A.value[t];
				if (r !== "int" && r !== "float") continue;
				let i = (R[t] ?? "").trim();
				if (i === "") {
					e[t] = `${J(t)} requires a number.`;
					continue;
				}
				let a = Number(i);
				if (!Number.isFinite(a)) {
					e[t] = `${J(t)} must be a number.`;
					continue;
				}
				if (r === "int" && !Number.isInteger(a)) {
					e[t] = `${J(t)} must be a whole number.`;
					continue;
				}
				let { min: o, max: ee } = G(t);
				o !== void 0 && a < o ? e[t] = `${J(t)} must be at least ${o}.` : ee !== void 0 && a > ee && (e[t] = `${J(t)} must be at most ${ee}.`);
			}
			return e;
		}
		let an = {
			all_methods_disabled: "admin.settingsRejectAllMethods",
			admin_lockout: "admin.settingsRejectAdminLockout"
		}, on = /* @__PURE__ */ new Set([
			400,
			403,
			409,
			422
		]);
		function sn(e) {
			let t = e.replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim();
			return t === "" ? null : t.length <= tt ? t : `${t.slice(0, tt)}…`;
		}
		function cn(e, t) {
			let n = t ?? {}, r = typeof n.reason == "string" ? n.reason : "", i = an[r];
			if (e === 422 && i) {
				let e = k(i), t = {};
				if (n.errors && typeof n.errors == "object") for (let r of Object.keys(n.errors)) t[r] = e;
				return {
					message: e,
					inlineErrors: Object.keys(t).length > 0 ? t : null
				};
			}
			if (e === 403) return {
				message: k("admin.settingsForbidden"),
				inlineErrors: null
			};
			if (e === 409) return {
				message: k("admin.settingsConflict"),
				inlineErrors: null
			};
			let a = typeof n.message == "string" ? sn(n.message) : null;
			return {
				message: a ? `${k("admin.settingsRejected")} (${a})` : k("admin.settingsRejected"),
				inlineErrors: null
			};
		}
		async function ln() {
			if (_t.value) return;
			if (Jt.value.length > 0) {
				let e = Jt.value.map(J).join(", ");
				D.error(`Fix the invalid JSON in ${e} before saving.`);
				return;
			}
			let e = rn();
			if (Object.keys(e).length > 0) F.value = e, D.error("Fix the highlighted values before saving.");
			else {
				_t.value = !0, F.value = {};
				try {
					let e = {};
					for (let [t, n] of Object.entries(z)) {
						if (!n || q(t)) continue;
						let r = A.value[t], i = R[t] ?? "";
						e[t] = r === "bool" ? i === "true" || i === "1" : r === "int" || r === "float" ? Number(i) : r === "json" ? JSON.parse(i) : i;
					}
					for (let t of Object.keys(L)) $(t) && !q(t) && (e[t] = "");
					let t = await E.save(e);
					D.success("Settings saved."), Bt(t);
					for (let [t, n] of Object.entries(e)) {
						if (!Nt(t)) continue;
						let e = String(n ?? "");
						st.value = {
							...st.value,
							[t]: {
								set: e !== "",
								length: e.length
							}
						};
					}
					let n = Object.keys(e).filter((e) => Ct.value.includes(e));
					n.length > 0 && At(n);
				} catch (e) {
					if (e instanceof n && e.status === 400) {
						let t = e.body;
						t?.errors && Object.keys(t.errors).length > 0 ? (F.value = t.errors, D.error("Fix the validation errors.")) : D.error(cn(e.status, e.body).message);
					} else if (e instanceof n && on.has(e.status)) {
						let t = cn(e.status, e.body);
						t.inlineErrors && (F.value = t.inlineErrors), D.error(t.message);
					} else D.error(t(ee(e), it?.locale, "Failed to save settings."));
				} finally {
					_t.value = !1;
				}
			}
		}
		fe(ve, null)?.value && ye(() => !vt.value || window.confirm("You have unsaved settings changes. Leave without saving them?"));
		function un(e) {
			vt.value && (e.preventDefault(), e.returnValue = "");
		}
		return he(() => window.addEventListener("beforeunload", un)), me(() => window.removeEventListener("beforeunload", un)), he(() => (Ot(), Vt())), (e, t) => (y(), m("section", be, [
			t[25] ||= h("header", { class: "admin-settings__head" }, [h("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			_(te, {
				links: C(ne).settings.links,
				details: C(ne).settings.details
			}, {
				default: w(() => [...t[2] ||= [
					g(" All of your server's configuration, grouped into tabs. Change fields on any tab, then click ", -1),
					h("strong", null, "Save settings", -1),
					g(" to apply only what you changed; a ", -1),
					h("strong", null, "custom", -1),
					g(" badge marks a value you have saved here, overriding the built-in default, and the ", -1),
					h("strong", null, "Advanced", -1),
					g(" switch unlocks the expert-tier fields. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			gt.value ? (y(), m("div", xe, [_(oe, {
				variant: "text",
				lines: 6
			})])) : N.value ? (y(), f(se, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load settings",
				description: N.value
			}, {
				actions: w(() => [_(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Vt
				}, {
					default: w(() => [...t[3] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (y(), m(u, { key: 2 }, [
				lt.value ? (y(), m("div", Se, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : p("", !0),
				h("div", Ce, [_(ae, {
					modelValue: M.value,
					"onUpdate:modelValue": t[0] ||= (e) => M.value = e,
					tabs: mt.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), h("div", we, [t[4] ||= h("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), _(ie, {
					"model-value": C(O).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => C(O).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				Tt.value ? (y(), m("div", Te, [h("span", null, " Saved changes to " + S(Dt.value.join(", ")) + " require a server restart to take effect. ", 1), h("span", Ee, [h("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: P.value,
					onClick: nn
				}, S(P.value ? "Restarting…" : "Restart server"), 9, De), h("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: P.value,
					onClick: jt
				}, " Dismiss ", 8, Oe)])])) : p("", !0),
				h("div", ke, [St.value.length === 0 ? (y(), m("p", Ae, " No settings in this group. ")) : (y(), m("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: _e(ln, ["prevent"])
				}, [(y(!0), m(u, null, ge(St.value, (e) => (y(), m("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					W(e) === "bool" ? (y(), m(u, { key: 0 }, [h("div", je, [
						_(ie, {
							"model-value": R[e] === "true" || R[e] === "1",
							label: J(e),
							disabled: q(e),
							"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
						}, null, 8, [
							"model-value",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						H(e) ? (y(), f(s, {
							key: 0,
							tone: "accent"
						}, {
							default: w(() => [...t[5] ||= [g("custom", -1)]]),
							_: 1
						})) : p("", !0),
						K(e) ? (y(), f(s, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: w(() => [...t[6] ||= [g("Advanced", -1)]]),
							_: 1
						})) : p("", !0)
					]), Z(e) ? (y(), f(l, {
						key: 0,
						text: Y(e) ?? "",
						links: X(e)
					}, null, 8, ["text", "links"])) : p("", !0)], 64)) : W(e) === "int" || W(e) === "float" ? (y(), m(u, { key: 1 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							H(e) ? (y(), f(s, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[7] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(s, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[8] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Me),
						h("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "number",
							value: R[e],
							min: G(e).min,
							max: G(e).max,
							step: W(e) === "float" ? "any" : void 0,
							placeholder: G(e).min === void 0 ? void 0 : `min: ${G(e).min}`,
							"aria-invalid": F.value[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, Ne),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0)
					], 64)) : Ht(e) ? (y(), m(u, { key: 2 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							H(e) ? (y(), f(s, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[9] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(s, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[10] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Pe),
						_(re, {
							"model-value": R[e] ?? "",
							options: Ut(e),
							label: J(e),
							disabled: q(e),
							"onUpdate:modelValue": (t) => Q(e, String(t))
						}, null, 8, [
							"model-value",
							"options",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0),
						Wt(e).length ? (y(), m("dl", Fe, [(y(!0), m(u, null, ge(Wt(e), (e) => (y(), m(u, { key: e.value }, [h("dt", Ie, S(e.label), 1), h("dd", Le, S(e.help), 1)], 64))), 128))])) : p("", !0)
					], 64)) : Mt(e) ? (y(), m(u, { key: 3 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							H(e) ? (y(), f(s, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[11] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(s, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[12] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Re),
						h("textarea", {
							id: `field-${e}`,
							class: pe(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": B[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": B[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => qt(e, t.target.value)
						}, null, 42, ze),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0),
						B[e] ? (y(), m("span", Be, S(B[e]), 1)) : p("", !0)
					], 64)) : j.value[e]?.secret ? (y(), m(u, { key: 4 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							H(e) ? (y(), f(s, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[13] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(s, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[14] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Ve),
						h("p", {
							id: It(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (y(), m(u, { key: 0 }, [_(s, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[15] ||= [g("Will be removed", -1)]]),
							_: 1
						}), t[16] ||= h("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : U(e) === null ? (y(), m("span", Ue, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : Pt(e) ? (y(), m(u, { key: 2 }, [_(s, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[17] ||= [g("Configured", -1)]]),
							_: 1
						}), h("span", We, " A value is stored (" + S(Ft(e)) + " " + S(C(le)(Ft(e), "character", "characters")) + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (y(), m(u, { key: 3 }, [_(s, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[18] ||= [g("Not set", -1)]]),
							_: 1
						}), t[19] ||= h("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, He),
						h("div", Ge, [
							h("input", {
								id: `field-${e}`,
								class: "admin-settings__input",
								type: I[e] ? "text" : "password",
								autocomplete: "new-password",
								"data-lpignore": "true",
								"data-1p-ignore": "",
								"data-bwignore": "",
								"data-form-type": "other",
								"aria-describedby": It(e),
								placeholder: $(e) ? "Will be removed on save" : Pt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: R[e],
								"aria-invalid": F.value[e] ? "true" : void 0,
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, Ke),
							Xt(e) ? (y(), f(c, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": I[e] ? "eye-off" : "eye",
								"aria-label": I[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => Yt(e)
							}, {
								default: w(() => [g(S(I[e] ? "Hide" : "Show"), 1)]),
								_: 2
							}, 1032, [
								"left-icon",
								"aria-label",
								"onClick"
							])) : p("", !0),
							$(e) ? (y(), f(c, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${J(e)}`,
								onClick: (t) => $t(e)
							}, {
								default: w(() => [...t[20] ||= [g(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Zt(e) ? (y(), f(c, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => Qt(e)
							}, {
								default: w(() => [...t[21] ||= [g(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : p("", !0)
						]),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0)
					], 64)) : (y(), m(u, { key: 5 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							H(e) ? (y(), f(s, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[22] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(s, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[23] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, qe),
						h("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "text",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": F.value[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, Je),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0)
					], 64)),
					wt(e) ? (y(), m("span", Ye, " Requires a server restart to take effect ")) : p("", !0),
					F.value[e] ? (y(), m("span", Xe, S(F.value[e]), 1)) : p("", !0)
				]))), 128)), h("div", Ze, [yt.value.length > 0 ? (y(), m("p", Qe, S(C(ce)(yt.value.length, "change pending", "changes pending")) + ": " + S(bt.value.join(", ")), 1)) : p("", !0), _(c, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !vt.value,
					loading: _t.value
				}, {
					default: w(() => [...t[24] ||= [g(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-ef245913"]]);
export { T as default };

//# sourceMappingURL=SettingsPage-CcN41Bl3.js.map