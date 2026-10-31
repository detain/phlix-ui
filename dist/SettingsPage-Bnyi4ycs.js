import { t as e, v as t, x as n } from "./client-57OweUrJ.js";
import { n as r, t as i } from "./useSettingsPrefs-B0Pl5CO3.js";
import { t as a } from "./useToastStore-Bu-iYU7r.js";
import { t as o } from "./Badge-C6LNO9Kk.js";
import { t as s } from "./PageHint-BlhPmafC.js";
import { t as ee } from "./helpLinks-iarZuNmw.js";
import { t as c } from "./Button-1sKEdGjj.js";
import { t as te } from "./Select-ChFXd0gU.js";
import { t as ne } from "./Switch-C1Wv5sN2.js";
import { t as re } from "./Tabs-DkWwQI4r.js";
import { t as ie } from "./Skeleton-B2Mt2L00.js";
import { t as ae } from "./EmptyState-BjOJ1k_A.js";
import { t as l } from "./HelpText-CyBorC6S.js";
import { a as oe, o as se } from "./plural-B3O2rVPV.js";
import { t as ce } from "./useMessages-DrceiftD.js";
import { n as le } from "./Icon-CIbfiPrs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ue, normalizeClass as de, onBeforeUnmount as fe, onMounted as pe, openBlock as y, reactive as b, ref as x, renderList as me, toDisplayString as S, unref as C, withCtx as w, withModifiers as he } from "vue";
import { matchedRouteKey as ge, onBeforeRouteLeave as _e } from "vue-router";
// src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var ve = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, ye = {
	key: 0,
	class: "admin-settings__skel"
}, be = {
	key: 0,
	class: "settings-meta-notice",
	role: "status"
}, xe = { class: "admin-settings__header-row" }, Se = { class: "settings-advanced-toggle" }, Ce = {
	key: 1,
	class: "settings-restart-banner",
	role: "alert"
}, we = { class: "settings-restart-banner__actions" }, Te = ["disabled"], Ee = ["disabled"], De = { class: "admin-settings__panel" }, Oe = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, ke = { class: "admin-settings__row" }, Ae = ["for"], je = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"aria-invalid",
	"disabled",
	"onInput"
], Me = ["for"], Ne = {
	key: 1,
	class: "admin-settings__option-help"
}, Pe = { class: "admin-settings__option-help-term" }, Fe = { class: "admin-settings__option-help-desc" }, Ie = ["for"], Le = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Re = {
	key: 1,
	class: "admin-settings__error",
	role: "alert"
}, ze = ["for"], Be = ["id"], Ve = {
	key: 1,
	class: "admin-settings__secret-hint"
}, He = { class: "admin-settings__secret-hint" }, Ue = { class: "admin-settings__row" }, We = [
	"id",
	"type",
	"aria-describedby",
	"placeholder",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Ge = ["for"], Ke = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], qe = {
	key: 6,
	class: "field-restart-note"
}, Je = {
	key: 7,
	class: "admin-settings__error",
	role: "alert"
}, Ye = { class: "admin-settings__actions" }, Xe = {
	key: 0,
	class: "admin-settings__pending",
	role: "status"
}, Ze = "other", Qe = "phlix-restart-pending", $e = 200, T = /*#__PURE__*/ le(/* @__PURE__ */ v({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(le) {
		let v = le, T = ue("apiBase", ""), et = d(() => typeof T == "string" ? T : T?.value ?? ""), tt = v.client ?? new e({ baseUrl: et.value }), E = new r(tt), D = a(), O = i(), { t: k } = ce(), nt = x({}), rt = x([]), A = x({}), it = x({}), at = x({}), ot = d(() => Object.keys(at.value).length === 0 && Object.keys(A.value).length > 0);
		function st(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function ct(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function lt(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function ut(e) {
			return {
				label: lt(e),
				helpText: "",
				helpLinks: [],
				tier: "standard",
				group: Ze,
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
			if (!ot.value) return at.value;
			let e = {};
			for (let t of Object.keys(A.value)) e[t] = ut(t);
			return e;
		}), dt = d(() => {
			let e = new Set(Object.values(j.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: ft(e),
				muted: !O.advancedMode && Ht(e),
				badge: _t.value[e] || void 0
			}));
		});
		function ft(e) {
			for (let t of Object.values(j.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return ct(e);
		}
		let M = x(""), pt = x(!0), N = x(null), P = x(!1), F = x(!1), I = x({}), L = b({}), R = b({}), z = b({}), B = b({}), V = b({}), mt = d(() => Object.values(B).some(Boolean) || Object.values(R).some(Boolean)), ht = d(() => {
			let e = Object.keys(B).filter((e) => B[e] && !q(e));
			for (let t of Object.keys(R)) R[t] && !q(t) && !e.includes(t) && e.push(t);
			return e;
		}), gt = d(() => ht.value.map(J)), _t = d(() => {
			let e = {};
			for (let t of ht.value) {
				let n = j.value[t]?.group ?? Ze;
				e[n] = (e[n] ?? 0) + 1;
			}
			return e;
		}), vt = d(() => Object.entries(j.value).filter(([, e]) => e.group === M.value).map(([e]) => e)), yt = d(() => Object.entries(j.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function bt(e) {
			return j.value[e]?.restart === !0;
		}
		let H = x([]), xt = d(() => H.value.length > 0), St = d(() => `${Qe}:${et.value || "default"}`), Ct = d(() => H.value.map((e) => J(e)));
		function wt() {
			if (typeof localStorage < "u") try {
				let e = localStorage.getItem(St.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (H.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function Tt() {
			if (typeof localStorage < "u") try {
				H.value.length === 0 ? localStorage.removeItem(St.value) : localStorage.setItem(St.value, JSON.stringify(H.value));
			} catch {}
		}
		function Et(e) {
			let t = /* @__PURE__ */ new Set([...H.value, ...e]);
			H.value = Array.from(t), Tt();
		}
		function Dt() {
			H.value = [], Tt();
		}
		function U(e) {
			return rt.value.includes(e);
		}
		function Ot(e) {
			return W(e) === "json";
		}
		function kt(e) {
			return j.value[e]?.secret === !0;
		}
		function At(e) {
			return it.value[e] ?? null;
		}
		function jt(e) {
			return At(e)?.set === !0;
		}
		function Mt(e) {
			let t = At(e);
			return t?.set === !0 ? t.length : 0;
		}
		function Nt(e) {
			return `secret-status-${e}`;
		}
		function Pt(e, t) {
			if (kt(e)) return "";
			if (Ot(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function Ft(e) {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(V)) delete V[e];
			for (let [t, n] of Object.entries(e)) z[t] = Pt(t, n);
		}
		function It() {
			for (let e of Object.keys(B)) delete B[e];
			for (let e of Object.keys(L)) delete L[e];
			for (let e of Object.keys(R)) delete R[e];
		}
		function Lt(e) {
			nt.value = e.settings, rt.value = e.overridden, e.secretStatus && (it.value = e.secretStatus), Ft(e.settings), It();
		}
		async function Rt() {
			pt.value = !0, N.value = null;
			try {
				let e = await E.get();
				A.value = e.types, at.value = e.meta, Lt(e), I.value = {}, (!M.value || !dt.value.some((e) => e.value === M.value)) && dt.value.length > 0 && (M.value = dt.value[0].value);
			} catch (e) {
				N.value = n(e, "Failed to load settings."), D.error(N.value);
			} finally {
				pt.value = !1;
			}
		}
		function W(e) {
			return A.value[e] ?? "string";
		}
		function zt(e) {
			let t = j.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Bt(e) {
			let t = j.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function Vt(e) {
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
		function Ht(e) {
			let t = Object.keys(j.value).filter((t) => j.value[t]?.group === e);
			return t.length > 0 && t.every((e) => K(e));
		}
		function q(e) {
			return K(e) && !O.advancedMode;
		}
		function J(e) {
			return j.value[e]?.label || st(e);
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
			z[e] = t, B[e] = t !== Pt(e, nt.value[e]);
		}
		function Ut(e) {
			try {
				return JSON.stringify(nt.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function Wt(e, t) {
			z[e] = t;
			try {
				let n = JSON.parse(t);
				delete V[e], B[e] = JSON.stringify(n) !== Ut(e);
			} catch (t) {
				V[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, B[e] = !0;
			}
		}
		let Gt = d(() => Object.keys(V).filter((e) => B[e] && !q(e)));
		function Kt(e) {
			L[e] = !L[e];
		}
		function qt(e) {
			return B[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return R[e] === !0;
		}
		function Jt(e) {
			return kt(e) && !q(e) && At(e)?.set !== !1;
		}
		function Yt(e) {
			R[e] = !0, Q(e, ""), L[e] = !1;
		}
		function Xt(e) {
			delete R[e];
		}
		function Zt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function Qt() {
			let e = Date.now(), t = v.restartPollIntervalMs;
			for (; Date.now() - e < v.restartPollTimeoutMs;) {
				await Zt(t), t = Math.min(t + v.restartPollIntervalMs / 2, v.restartPollIntervalMs * 3);
				try {
					let e = await E.get();
					return A.value = e.types, at.value = e.meta, Lt(e), I.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function $t() {
			if (!F.value) {
				F.value = !0;
				try {
					await E.restartServer(), D.success("Restart signal sent — waiting for the server to come back…"), await Qt() ? (Dt(), D.success("Server is back online.")) : D.error(`The server did not respond within ${Math.round(v.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					D.error(n(e, "Failed to restart server."));
				} finally {
					F.value = !1;
				}
			}
		}
		function en() {
			let e = {};
			for (let [t, n] of Object.entries(B)) {
				if (!n || q(t)) continue;
				let r = A.value[t];
				if (r !== "int" && r !== "float") continue;
				let i = (z[t] ?? "").trim();
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
		let tn = {
			all_methods_disabled: "admin.settingsRejectAllMethods",
			admin_lockout: "admin.settingsRejectAdminLockout"
		}, nn = /* @__PURE__ */ new Set([
			400,
			403,
			409,
			422
		]);
		function rn(e) {
			let t = e.replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim();
			return t === "" ? null : t.length <= $e ? t : `${t.slice(0, $e)}…`;
		}
		function an(e, t) {
			let n = t ?? {}, r = typeof n.reason == "string" ? n.reason : "", i = tn[r];
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
			let a = typeof n.message == "string" ? rn(n.message) : null;
			return {
				message: a ? `${k("admin.settingsRejected")} (${a})` : k("admin.settingsRejected"),
				inlineErrors: null
			};
		}
		async function on() {
			if (P.value) return;
			if (Gt.value.length > 0) {
				let e = Gt.value.map(J).join(", ");
				D.error(`Fix the invalid JSON in ${e} before saving.`);
				return;
			}
			let e = en();
			if (Object.keys(e).length > 0) I.value = e, D.error("Fix the highlighted values before saving.");
			else {
				P.value = !0, I.value = {};
				try {
					let e = {};
					for (let [t, n] of Object.entries(B)) {
						if (!n || q(t)) continue;
						let r = A.value[t], i = z[t] ?? "";
						e[t] = r === "bool" ? i === "true" || i === "1" : r === "int" || r === "float" ? Number(i) : r === "json" ? JSON.parse(i) : i;
					}
					for (let t of Object.keys(R)) $(t) && !q(t) && (e[t] = "");
					let t = await E.save(e);
					D.success("Settings saved."), Lt(t);
					for (let [t, n] of Object.entries(e)) {
						if (!kt(t)) continue;
						let e = String(n ?? "");
						it.value = {
							...it.value,
							[t]: {
								set: e !== "",
								length: e.length
							}
						};
					}
					let n = Object.keys(e).filter((e) => yt.value.includes(e));
					n.length > 0 && Et(n);
				} catch (e) {
					if (e instanceof t && e.status === 400) {
						let t = e.body;
						t?.errors && Object.keys(t.errors).length > 0 ? (I.value = t.errors, D.error("Fix the validation errors.")) : D.error(an(e.status, e.body).message);
					} else if (e instanceof t && nn.has(e.status)) {
						let t = an(e.status, e.body);
						t.inlineErrors && (I.value = t.inlineErrors), D.error(t.message);
					} else D.error(e instanceof t ? e.message : "Failed to save settings.");
				} finally {
					P.value = !1;
				}
			}
		}
		ue(ge, null)?.value && _e(() => !mt.value || window.confirm("You have unsaved settings changes. Leave without saving them?"));
		function sn(e) {
			mt.value && (e.preventDefault(), e.returnValue = "");
		}
		return pe(() => window.addEventListener("beforeunload", sn)), fe(() => window.removeEventListener("beforeunload", sn)), pe(() => (wt(), Rt())), (e, t) => (y(), m("section", ve, [
			t[25] ||= h("header", { class: "admin-settings__head" }, [h("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			_(s, {
				links: C(ee).settings.links,
				details: C(ee).settings.details
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
			pt.value ? (y(), m("div", ye, [_(ie, {
				variant: "text",
				lines: 6
			})])) : N.value ? (y(), f(ae, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load settings",
				description: N.value
			}, {
				actions: w(() => [_(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Rt
				}, {
					default: w(() => [...t[3] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (y(), m(u, { key: 2 }, [
				ot.value ? (y(), m("div", be, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : p("", !0),
				h("div", xe, [_(re, {
					modelValue: M.value,
					"onUpdate:modelValue": t[0] ||= (e) => M.value = e,
					tabs: dt.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), h("div", Se, [t[4] ||= h("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), _(ne, {
					"model-value": C(O).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => C(O).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				xt.value ? (y(), m("div", Ce, [h("span", null, " Saved changes to " + S(Ct.value.join(", ")) + " require a server restart to take effect. ", 1), h("span", we, [h("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: F.value,
					onClick: $t
				}, S(F.value ? "Restarting…" : "Restart server"), 9, Te), h("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: F.value,
					onClick: Dt
				}, " Dismiss ", 8, Ee)])])) : p("", !0),
				h("div", De, [vt.value.length === 0 ? (y(), m("p", Oe, " No settings in this group. ")) : (y(), m("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: he(on, ["prevent"])
				}, [(y(!0), m(u, null, me(vt.value, (e) => (y(), m("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					W(e) === "bool" ? (y(), m(u, { key: 0 }, [h("div", ke, [
						_(ne, {
							"model-value": z[e] === "true" || z[e] === "1",
							label: J(e),
							disabled: q(e),
							"onUpdate:modelValue": (t) => Q(e, t ? "true" : "false")
						}, null, 8, [
							"model-value",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						U(e) ? (y(), f(o, {
							key: 0,
							tone: "accent"
						}, {
							default: w(() => [...t[5] ||= [g("custom", -1)]]),
							_: 1
						})) : p("", !0),
						K(e) ? (y(), f(o, {
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
							U(e) ? (y(), f(o, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[7] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[8] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Ae),
						h("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "number",
							value: z[e],
							min: G(e).min,
							max: G(e).max,
							step: W(e) === "float" ? "any" : void 0,
							placeholder: G(e).min === void 0 ? void 0 : `min: ${G(e).min}`,
							"aria-invalid": I.value[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, je),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0)
					], 64)) : zt(e) ? (y(), m(u, { key: 2 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							U(e) ? (y(), f(o, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[9] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[10] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Me),
						_(te, {
							"model-value": z[e] ?? "",
							options: Bt(e),
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
						Vt(e).length ? (y(), m("dl", Ne, [(y(!0), m(u, null, me(Vt(e), (e) => (y(), m(u, { key: e.value }, [h("dt", Pe, S(e.label), 1), h("dd", Fe, S(e.help), 1)], 64))), 128))])) : p("", !0)
					], 64)) : Ot(e) ? (y(), m(u, { key: 3 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							U(e) ? (y(), f(o, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[11] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[12] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Ie),
						h("textarea", {
							id: `field-${e}`,
							class: de(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": V[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: z[e],
							"aria-invalid": V[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Wt(e, t.target.value)
						}, null, 42, Le),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0),
						V[e] ? (y(), m("span", Re, S(V[e]), 1)) : p("", !0)
					], 64)) : j.value[e]?.secret ? (y(), m(u, { key: 4 }, [
						h("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							g(S(J(e)) + " ", 1),
							U(e) ? (y(), f(o, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[13] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[14] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, ze),
						h("p", {
							id: Nt(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (y(), m(u, { key: 0 }, [_(o, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[15] ||= [g("Will be removed", -1)]]),
							_: 1
						}), t[16] ||= h("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : At(e) === null ? (y(), m("span", Ve, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : jt(e) ? (y(), m(u, { key: 2 }, [_(o, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[17] ||= [g("Configured", -1)]]),
							_: 1
						}), h("span", He, " A value is stored (" + S(Mt(e)) + " " + S(C(se)(Mt(e), "character", "characters")) + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (y(), m(u, { key: 3 }, [_(o, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: w(() => [...t[18] ||= [g("Not set", -1)]]),
							_: 1
						}), t[19] ||= h("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, Be),
						h("div", Ue, [
							h("input", {
								id: `field-${e}`,
								class: "admin-settings__input",
								type: L[e] ? "text" : "password",
								autocomplete: "new-password",
								"data-lpignore": "true",
								"data-1p-ignore": "",
								"data-bwignore": "",
								"data-form-type": "other",
								"aria-describedby": Nt(e),
								placeholder: $(e) ? "Will be removed on save" : jt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: z[e],
								"aria-invalid": I.value[e] ? "true" : void 0,
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, We),
							qt(e) ? (y(), f(c, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": L[e] ? "eye-off" : "eye",
								"aria-label": L[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => Kt(e)
							}, {
								default: w(() => [g(S(L[e] ? "Hide" : "Show"), 1)]),
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
								onClick: (t) => Xt(e)
							}, {
								default: w(() => [...t[20] ||= [g(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Jt(e) ? (y(), f(c, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => Yt(e)
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
							U(e) ? (y(), f(o, {
								key: 0,
								tone: "accent"
							}, {
								default: w(() => [...t[22] ||= [g("custom", -1)]]),
								_: 1
							})) : p("", !0),
							K(e) ? (y(), f(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: w(() => [...t[23] ||= [g("Advanced", -1)]]),
								_: 1
							})) : p("", !0)
						], 8, Ge),
						h("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "text",
							autocomplete: "off",
							value: z[e],
							"aria-invalid": I.value[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, Ke),
						Z(e) ? (y(), f(l, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : p("", !0)
					], 64)),
					bt(e) ? (y(), m("span", qe, " Requires a server restart to take effect ")) : p("", !0),
					I.value[e] ? (y(), m("span", Je, S(I.value[e]), 1)) : p("", !0)
				]))), 128)), h("div", Ye, [ht.value.length > 0 ? (y(), m("p", Xe, S(C(oe)(ht.value.length, "change pending", "changes pending")) + ": " + S(gt.value.join(", ")), 1)) : p("", !0), _(c, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !mt.value,
					loading: P.value
				}, {
					default: w(() => [...t[24] ||= [g(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-f9065ea3"]]);
export { T as default };

//# sourceMappingURL=SettingsPage-Bnyi4ycs.js.map