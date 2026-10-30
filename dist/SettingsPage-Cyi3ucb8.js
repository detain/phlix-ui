import { g as e, l as t, t as n, y as r } from "./client-pLl-rDdN.js";
import { n as i, t as a } from "./useSettingsPrefs-BVlUL3Ex.js";
import { t as o } from "./useToastStore-Bu-iYU7r.js";
import { t as s } from "./Badge-C6LNO9Kk.js";
import { t as ee } from "./PageHint-BlhPmafC.js";
import { t as te } from "./helpLinks-iarZuNmw.js";
import { t as c } from "./Button-1sKEdGjj.js";
import { t as ne } from "./Select-0YzonKN1.js";
import { t as re } from "./Switch-C1Wv5sN2.js";
import { t as ie } from "./Tabs-DkWwQI4r.js";
import { t as ae } from "./Skeleton-B2Mt2L00.js";
import { t as oe } from "./EmptyState-BjOJ1k_A.js";
import { t as l } from "./HelpText-CyBorC6S.js";
import { a as se, o as ce } from "./plural-B3O2rVPV.js";
import { t as le } from "./useMessages-B2u5b6BQ.js";
import { n as ue } from "./Icon-CIbfiPrs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as de, normalizeClass as fe, onBeforeUnmount as pe, onMounted as me, openBlock as y, reactive as b, ref as x, renderList as he, toDisplayString as S, unref as C, withCtx as w, withModifiers as ge } from "vue";
import { matchedRouteKey as _e, onBeforeRouteLeave as ve } from "vue-router";
// src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var ye = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, be = {
	key: 0,
	class: "admin-settings__skel"
}, xe = {
	key: 0,
	class: "settings-meta-notice",
	role: "status"
}, Se = { class: "admin-settings__header-row" }, Ce = { class: "settings-advanced-toggle" }, we = {
	key: 1,
	class: "settings-restart-banner",
	role: "alert"
}, Te = { class: "settings-restart-banner__actions" }, Ee = ["disabled"], De = ["disabled"], Oe = { class: "admin-settings__panel" }, ke = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, Ae = { class: "admin-settings__row" }, je = ["for"], Me = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"aria-invalid",
	"disabled",
	"onInput"
], Ne = ["for"], Pe = {
	key: 1,
	class: "admin-settings__option-help"
}, Fe = { class: "admin-settings__option-help-term" }, Ie = { class: "admin-settings__option-help-desc" }, Le = ["for"], Re = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], ze = {
	key: 1,
	class: "admin-settings__error",
	role: "alert"
}, Be = ["for"], Ve = ["id"], He = {
	key: 1,
	class: "admin-settings__secret-hint"
}, Ue = { class: "admin-settings__secret-hint" }, We = { class: "admin-settings__row" }, Ge = [
	"id",
	"type",
	"aria-describedby",
	"placeholder",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Ke = ["for"], qe = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Je = {
	key: 6,
	class: "field-restart-note"
}, Ye = {
	key: 7,
	class: "admin-settings__error",
	role: "alert"
}, Xe = { class: "admin-settings__actions" }, Ze = {
	key: 0,
	class: "admin-settings__pending",
	role: "status"
}, Qe = "other", $e = "phlix-restart-pending", et = 200, tt = /*#__PURE__*/ ue(/* @__PURE__ */ v({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(ue) {
		let v = ue, tt = de("apiBase", ""), nt = d(() => typeof tt == "string" ? tt : tt?.value ?? ""), rt = v.client ?? new n({
			baseUrl: nt.value,
			tokenStore: new t()
		}), T = new i(rt), E = o(), D = a(), { t: O } = le(), it = x({}), at = x([]), k = x({}), A = x({}), ot = x({}), st = d(() => Object.keys(ot.value).length === 0 && Object.keys(k.value).length > 0);
		function ct(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function lt(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function ut(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function dt(e) {
			return {
				label: ut(e),
				helpText: "",
				helpLinks: [],
				tier: "standard",
				group: Qe,
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
			if (!st.value) return ot.value;
			let e = {};
			for (let t of Object.keys(k.value)) e[t] = dt(t);
			return e;
		}), ft = d(() => {
			let e = new Set(Object.values(j.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: pt(e),
				muted: !D.advancedMode && Ut(e),
				badge: vt.value[e] || void 0
			}));
		});
		function pt(e) {
			for (let t of Object.values(j.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return lt(e);
		}
		let M = x(""), mt = x(!0), N = x(null), ht = x(!1), P = x(!1), F = x({}), I = b({}), L = b({}), R = b({}), z = b({}), B = b({}), gt = d(() => Object.values(z).some(Boolean) || Object.values(L).some(Boolean)), V = d(() => {
			let e = Object.keys(z).filter((e) => z[e] && !q(e));
			for (let t of Object.keys(L)) L[t] && !q(t) && !e.includes(t) && e.push(t);
			return e;
		}), _t = d(() => V.value.map(J)), vt = d(() => {
			let e = {};
			for (let t of V.value) {
				let n = j.value[t]?.group ?? Qe;
				e[n] = (e[n] ?? 0) + 1;
			}
			return e;
		}), yt = d(() => Object.entries(j.value).filter(([, e]) => e.group === M.value).map(([e]) => e)), bt = d(() => Object.entries(j.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function xt(e) {
			return j.value[e]?.restart === !0;
		}
		let H = x([]), St = d(() => H.value.length > 0), Ct = d(() => `${$e}:${nt.value || "default"}`), wt = d(() => H.value.map((e) => J(e)));
		function Tt() {
			if (typeof localStorage < "u") try {
				let e = localStorage.getItem(Ct.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (H.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function Et() {
			if (typeof localStorage < "u") try {
				H.value.length === 0 ? localStorage.removeItem(Ct.value) : localStorage.setItem(Ct.value, JSON.stringify(H.value));
			} catch {}
		}
		function Dt(e) {
			let t = /* @__PURE__ */ new Set([...H.value, ...e]);
			H.value = Array.from(t), Et();
		}
		function Ot() {
			H.value = [], Et();
		}
		function U(e) {
			return at.value.includes(e);
		}
		function kt(e) {
			return W(e) === "json";
		}
		function At(e) {
			return j.value[e]?.secret === !0;
		}
		function jt(e) {
			return A.value[e] ?? null;
		}
		function Mt(e) {
			return jt(e)?.set === !0;
		}
		function Nt(e) {
			let t = jt(e);
			return t?.set === !0 ? t.length : 0;
		}
		function Pt(e) {
			return `secret-status-${e}`;
		}
		function Ft(e, t) {
			if (At(e)) return "";
			if (kt(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function It(e) {
			for (let e of Object.keys(R)) delete R[e];
			for (let e of Object.keys(B)) delete B[e];
			for (let [t, n] of Object.entries(e)) R[t] = Ft(t, n);
		}
		function Lt() {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(I)) delete I[e];
			for (let e of Object.keys(L)) delete L[e];
		}
		function Rt(e) {
			it.value = e.settings, at.value = e.overridden, e.secretStatus && (A.value = e.secretStatus), It(e.settings), Lt();
		}
		async function zt() {
			mt.value = !0, N.value = null;
			try {
				let e = await T.get();
				k.value = e.types, ot.value = e.meta, Rt(e), F.value = {}, (!M.value || !ft.value.some((e) => e.value === M.value)) && ft.value.length > 0 && (M.value = ft.value[0].value);
			} catch (e) {
				N.value = r(e, "Failed to load settings."), E.error(N.value);
			} finally {
				mt.value = !1;
			}
		}
		function W(e) {
			return k.value[e] ?? "string";
		}
		function Bt(e) {
			let t = j.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Vt(e) {
			let t = j.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function Ht(e) {
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
		function Ut(e) {
			let t = Object.keys(j.value).filter((t) => j.value[t]?.group === e);
			return t.length > 0 && t.every((e) => K(e));
		}
		function q(e) {
			return K(e) && !D.advancedMode;
		}
		function J(e) {
			return j.value[e]?.label || ct(e);
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
			R[e] = t, z[e] = t !== Ft(e, it.value[e]);
		}
		function Wt(e) {
			try {
				return JSON.stringify(it.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function Gt(e, t) {
			R[e] = t;
			try {
				let n = JSON.parse(t);
				delete B[e], z[e] = JSON.stringify(n) !== Wt(e);
			} catch (t) {
				B[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, z[e] = !0;
			}
		}
		let Kt = d(() => Object.keys(B).filter((e) => z[e] && !q(e)));
		function qt(e) {
			I[e] = !I[e];
		}
		function Jt(e) {
			return z[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return L[e] === !0;
		}
		function Yt(e) {
			return At(e) && !q(e) && jt(e)?.set !== !1;
		}
		function Xt(e) {
			L[e] = !0, Q(e, ""), I[e] = !1;
		}
		function Zt(e) {
			delete L[e];
		}
		function Qt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function $t() {
			let e = Date.now(), t = v.restartPollIntervalMs;
			for (; Date.now() - e < v.restartPollTimeoutMs;) {
				await Qt(t), t = Math.min(t + v.restartPollIntervalMs / 2, v.restartPollIntervalMs * 3);
				try {
					let e = await T.get();
					return k.value = e.types, ot.value = e.meta, Rt(e), F.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function en() {
			if (!P.value) {
				P.value = !0;
				try {
					await T.restartServer(), E.success("Restart signal sent — waiting for the server to come back…"), await $t() ? (Ot(), E.success("Server is back online.")) : E.error(`The server did not respond within ${Math.round(v.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					E.error(r(e, "Failed to restart server."));
				} finally {
					P.value = !1;
				}
			}
		}
		function tn() {
			let e = {};
			for (let [t, n] of Object.entries(z)) {
				if (!n || q(t)) continue;
				let r = k.value[t];
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
				let { min: o, max: s } = G(t);
				o !== void 0 && a < o ? e[t] = `${J(t)} must be at least ${o}.` : s !== void 0 && a > s && (e[t] = `${J(t)} must be at most ${s}.`);
			}
			return e;
		}
		let nn = {
			all_methods_disabled: "admin.settingsRejectAllMethods",
			admin_lockout: "admin.settingsRejectAdminLockout"
		}, rn = /* @__PURE__ */ new Set([
			400,
			403,
			409,
			422
		]);
		function an(e) {
			let t = e.replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim();
			return t === "" ? null : t.length <= et ? t : `${t.slice(0, et)}…`;
		}
		function on(e, t) {
			let n = t ?? {}, r = typeof n.reason == "string" ? n.reason : "", i = nn[r];
			if (e === 422 && i) {
				let e = O(i), t = {};
				if (n.errors && typeof n.errors == "object") for (let r of Object.keys(n.errors)) t[r] = e;
				return {
					message: e,
					inlineErrors: Object.keys(t).length > 0 ? t : null
				};
			}
			if (e === 403) return {
				message: O("admin.settingsForbidden"),
				inlineErrors: null
			};
			if (e === 409) return {
				message: O("admin.settingsConflict"),
				inlineErrors: null
			};
			let a = typeof n.message == "string" ? an(n.message) : null;
			return {
				message: a ? `${O("admin.settingsRejected")} (${a})` : O("admin.settingsRejected"),
				inlineErrors: null
			};
		}
		async function sn() {
			if (ht.value) return;
			if (Kt.value.length > 0) {
				let e = Kt.value.map(J).join(", ");
				E.error(`Fix the invalid JSON in ${e} before saving.`);
				return;
			}
			let t = tn();
			if (Object.keys(t).length > 0) F.value = t, E.error("Please fix the highlighted values before saving.");
			else {
				ht.value = !0, F.value = {};
				try {
					let e = {};
					for (let [t, n] of Object.entries(z)) {
						if (!n || q(t)) continue;
						let r = k.value[t], i = R[t] ?? "";
						e[t] = r === "bool" ? i === "true" || i === "1" : r === "int" || r === "float" ? Number(i) : r === "json" ? JSON.parse(i) : i;
					}
					for (let t of Object.keys(L)) $(t) && !q(t) && (e[t] = "");
					let t = await T.save(e);
					E.success("Settings saved."), Rt(t);
					for (let [t, n] of Object.entries(e)) {
						if (!At(t)) continue;
						let e = String(n ?? "");
						A.value = {
							...A.value,
							[t]: {
								set: e !== "",
								length: e.length
							}
						};
					}
					let n = Object.keys(e).filter((e) => bt.value.includes(e));
					n.length > 0 && Dt(n);
				} catch (t) {
					if (t instanceof e && t.status === 400) {
						let e = t.body;
						e?.errors && Object.keys(e.errors).length > 0 ? (F.value = e.errors, E.error("Please fix the validation errors.")) : E.error(on(t.status, t.body).message);
					} else if (t instanceof e && rn.has(t.status)) {
						let e = on(t.status, t.body);
						e.inlineErrors && (F.value = e.inlineErrors), E.error(e.message);
					} else E.error(t instanceof e ? t.message : "Failed to save settings.");
				} finally {
					ht.value = !1;
				}
			}
		}
		de(_e, null)?.value && ve(() => !gt.value || window.confirm("You have unsaved settings changes. Leave without saving them?"));
		function cn(e) {
			gt.value && (e.preventDefault(), e.returnValue = "");
		}
		return me(() => window.addEventListener("beforeunload", cn)), pe(() => window.removeEventListener("beforeunload", cn)), me(() => (Tt(), zt())), (e, t) => (y(), m("section", ye, [
			t[25] ||= h("header", { class: "admin-settings__head" }, [h("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			_(ee, {
				links: C(te).settings.links,
				details: C(te).settings.details
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
			mt.value ? (y(), m("div", be, [_(ae, {
				variant: "text",
				lines: 6
			})])) : N.value ? (y(), f(oe, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load settings",
				description: N.value
			}, {
				actions: w(() => [_(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: zt
				}, {
					default: w(() => [...t[3] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (y(), m(u, { key: 2 }, [
				st.value ? (y(), m("div", xe, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : p("", !0),
				h("div", Se, [_(ie, {
					modelValue: M.value,
					"onUpdate:modelValue": t[0] ||= (e) => M.value = e,
					tabs: ft.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), h("div", Ce, [t[4] ||= h("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), _(re, {
					"model-value": C(D).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => C(D).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				St.value ? (y(), m("div", we, [h("span", null, " Saved changes to " + S(wt.value.join(", ")) + " require a server restart to take effect. ", 1), h("span", Te, [h("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: P.value,
					onClick: en
				}, S(P.value ? "Restarting…" : "Restart server"), 9, Ee), h("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: P.value,
					onClick: Ot
				}, " Dismiss ", 8, De)])])) : p("", !0),
				h("div", Oe, [yt.value.length === 0 ? (y(), m("p", ke, " No settings in this group. ")) : (y(), m("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: ge(sn, ["prevent"])
				}, [(y(!0), m(u, null, he(yt.value, (e) => (y(), m("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					W(e) === "bool" ? (y(), m(u, { key: 0 }, [h("div", Ae, [
						_(re, {
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
						U(e) ? (y(), f(s, {
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
							U(e) ? (y(), f(s, {
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
						], 8, je),
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
						}, null, 40, Me),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0)
					], 64)) : Bt(e) ? (y(), m(u, { key: 2 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							U(e) ? (y(), f(s, {
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
						], 8, Ne),
						_(ne, {
							"model-value": R[e] ?? "",
							options: Vt(e),
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
						Ht(e).length ? (y(), m("dl", Pe, [(y(!0), m(u, null, he(Ht(e), (e) => (y(), m(u, { key: e.value }, [h("dt", Fe, S(e.label), 1), h("dd", Ie, S(e.help), 1)], 64))), 128))])) : p("", !0)
					], 64)) : kt(e) ? (y(), m(u, { key: 3 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							U(e) ? (y(), f(s, {
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
						], 8, Le),
						h("textarea", {
							id: `field-${e}`,
							class: fe(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": B[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": B[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Gt(e, t.target.value)
						}, null, 42, Re),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0),
						B[e] ? (y(), m("span", ze, S(B[e]), 1)) : p("", !0)
					], 64)) : j.value[e]?.secret ? (y(), m(u, { key: 4 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							U(e) ? (y(), f(s, {
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
						], 8, Be),
						h("p", {
							id: Pt(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (y(), m(u, { key: 0 }, [_(s, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[15] ||= [g("Will be removed", -1)]]),
							_: 1
						}), t[16] ||= h("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : jt(e) === null ? (y(), m("span", He, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : Mt(e) ? (y(), m(u, { key: 2 }, [_(s, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[17] ||= [g("Configured", -1)]]),
							_: 1
						}), h("span", Ue, " A value is stored (" + S(Nt(e)) + " " + S(C(ce)(Nt(e), "character", "characters")) + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (y(), m(u, { key: 3 }, [_(s, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[18] ||= [g("Not set", -1)]]),
							_: 1
						}), t[19] ||= h("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, Ve),
						h("div", We, [
							h("input", {
								id: `field-${e}`,
								class: "admin-settings__input",
								type: I[e] ? "text" : "password",
								autocomplete: "new-password",
								"data-lpignore": "true",
								"data-1p-ignore": "",
								"data-bwignore": "",
								"data-form-type": "other",
								"aria-describedby": Pt(e),
								placeholder: $(e) ? "Will be removed on save" : Mt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: R[e],
								"aria-invalid": F.value[e] ? "true" : void 0,
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, Ge),
							Jt(e) ? (y(), f(c, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": I[e] ? "eye-off" : "eye",
								"aria-label": I[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => qt(e)
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
								onClick: (t) => Zt(e)
							}, {
								default: w(() => [...t[20] ||= [g(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Yt(e) ? (y(), f(c, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => Xt(e)
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
							U(e) ? (y(), f(s, {
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
						], 8, Ke),
						h("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "text",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": F.value[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, qe),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0)
					], 64)),
					xt(e) ? (y(), m("span", Je, " Requires a server restart to take effect ")) : p("", !0),
					F.value[e] ? (y(), m("span", Ye, S(F.value[e]), 1)) : p("", !0)
				]))), 128)), h("div", Xe, [V.value.length > 0 ? (y(), m("p", Ze, S(C(se)(V.value.length, "change pending", "changes pending")) + ": " + S(_t.value.join(", ")), 1)) : p("", !0), _(c, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !gt.value,
					loading: ht.value
				}, {
					default: w(() => [...t[24] ||= [g(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-0d3338f9"]]);
export { tt as default };

//# sourceMappingURL=SettingsPage-Cyi3ucb8.js.map