import { n as e } from "./Icon-CIwTuFLd.js";
import { a as t, o as n } from "./plural-DMM7pLFA.js";
import { g as r, l as i, t as a, y as o } from "./client-CRZ_SWB1.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { t as ee } from "./EmptyState-BAyOxAcK.js";
import { t as c } from "./Button-BuG0GvCa.js";
import { t as l } from "./Badge-A88fI41k.js";
import { t as te } from "./Switch-ibkXiiN-.js";
import { t as ne } from "./Select-Djg5MXFL.js";
import { t as re } from "./Skeleton-rHw-IJtl.js";
import { t as ie } from "./PageHint-BgM9gtjL.js";
import { t as ae } from "./Tabs-7t3yuCWn.js";
import { t as u } from "./HelpText-CMXNfjgz.js";
import { n as oe, t as se } from "./useSettingsPrefs-CEFxTJFG.js";
import { t as ce } from "./helpLinks-B4Y1FteC.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as le, normalizeClass as ue, onBeforeUnmount as de, onMounted as fe, openBlock as b, reactive as x, ref as S, renderList as pe, toDisplayString as C, unref as w, withCtx as T, withModifiers as me } from "vue";
import { matchedRouteKey as he, onBeforeRouteLeave as ge } from "vue-router";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var _e = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, ve = {
	key: 0,
	class: "admin-settings__skel"
}, ye = {
	key: 0,
	class: "settings-meta-notice",
	role: "status"
}, be = { class: "admin-settings__header-row" }, xe = { class: "settings-advanced-toggle" }, Se = {
	key: 1,
	class: "settings-restart-banner",
	role: "alert"
}, Ce = { class: "settings-restart-banner__actions" }, we = ["disabled"], Te = ["disabled"], Ee = { class: "admin-settings__panel" }, De = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, Oe = { class: "admin-settings__row" }, ke = ["for"], Ae = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"aria-invalid",
	"disabled",
	"onInput"
], je = ["for"], Me = {
	key: 1,
	class: "admin-settings__option-help"
}, Ne = { class: "admin-settings__option-help-term" }, Pe = { class: "admin-settings__option-help-desc" }, Fe = ["for"], Ie = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Le = {
	key: 1,
	class: "admin-settings__error",
	role: "alert"
}, Re = ["for"], ze = ["id"], Be = {
	key: 1,
	class: "admin-settings__secret-hint"
}, Ve = { class: "admin-settings__secret-hint" }, He = { class: "admin-settings__row" }, Ue = [
	"id",
	"type",
	"aria-describedby",
	"placeholder",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], We = ["for"], Ge = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Ke = {
	key: 6,
	class: "field-restart-note"
}, qe = {
	key: 7,
	class: "admin-settings__error",
	role: "alert"
}, Je = { class: "admin-settings__actions" }, Ye = {
	key: 0,
	class: "admin-settings__pending",
	role: "status"
}, Xe = "other", Ze = "phlix-restart-pending", E = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(e) {
		let y = e, E = le("apiBase", ""), Qe = f(() => typeof E == "string" ? E : E?.value ?? ""), $e = y.client ?? new a({
			baseUrl: Qe.value,
			tokenStore: new i()
		}), D = new oe($e), O = s(), et = se(), tt = S({}), nt = S([]), k = S({}), rt = S({}), it = S({}), at = f(() => Object.keys(it.value).length === 0 && Object.keys(k.value).length > 0);
		function ot(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function st(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function ct(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function lt(e) {
			return {
				label: ct(e),
				helpText: "",
				helpLinks: [],
				tier: "standard",
				group: Xe,
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
		let A = f(() => {
			if (!at.value) return it.value;
			let e = {};
			for (let t of Object.keys(k.value)) e[t] = lt(t);
			return e;
		}), ut = f(() => {
			let e = new Set(Object.values(A.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: dt(e),
				muted: !et.advancedMode && Bt(e),
				badge: ht.value[e] || void 0
			}));
		});
		function dt(e) {
			for (let t of Object.values(A.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return st(e);
		}
		let j = S(""), ft = S(!0), M = S(null), N = S(!1), P = S(!1), F = S({}), I = x({}), L = x({}), R = x({}), z = x({}), B = x({}), pt = f(() => Object.values(z).some(Boolean) || Object.values(L).some(Boolean)), V = f(() => {
			let e = Object.keys(z).filter((e) => z[e] && !q(e));
			for (let t of Object.keys(L)) L[t] && !q(t) && !e.includes(t) && e.push(t);
			return e;
		}), mt = f(() => V.value.map(J)), ht = f(() => {
			let e = {};
			for (let t of V.value) {
				let n = A.value[t]?.group ?? Xe;
				e[n] = (e[n] ?? 0) + 1;
			}
			return e;
		}), gt = f(() => Object.entries(A.value).filter(([, e]) => e.group === j.value).map(([e]) => e)), _t = f(() => Object.entries(A.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function vt(e) {
			return A.value[e]?.restart === !0;
		}
		let H = S([]), yt = f(() => H.value.length > 0), bt = f(() => `${Ze}:${Qe.value || "default"}`), xt = f(() => H.value.map((e) => J(e)));
		function St() {
			if (!(typeof localStorage > "u")) try {
				let e = localStorage.getItem(bt.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (H.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function Ct() {
			if (!(typeof localStorage > "u")) try {
				H.value.length === 0 ? localStorage.removeItem(bt.value) : localStorage.setItem(bt.value, JSON.stringify(H.value));
			} catch {}
		}
		function wt(e) {
			let t = /* @__PURE__ */ new Set([...H.value, ...e]);
			H.value = Array.from(t), Ct();
		}
		function Tt() {
			H.value = [], Ct();
		}
		function U(e) {
			return nt.value.includes(e);
		}
		function Et(e) {
			return W(e) === "json";
		}
		function Dt(e) {
			return A.value[e]?.secret === !0;
		}
		function Ot(e) {
			return rt.value[e] ?? null;
		}
		function kt(e) {
			return Ot(e)?.set === !0;
		}
		function At(e) {
			let t = Ot(e);
			return t?.set === !0 ? t.length : 0;
		}
		function jt(e) {
			return `secret-status-${e}`;
		}
		function Mt(e, t) {
			if (Dt(e)) return "";
			if (Et(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function Nt(e) {
			for (let e of Object.keys(R)) delete R[e];
			for (let e of Object.keys(B)) delete B[e];
			for (let [t, n] of Object.entries(e)) R[t] = Mt(t, n);
		}
		function Pt() {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(I)) delete I[e];
			for (let e of Object.keys(L)) delete L[e];
		}
		function Ft(e) {
			tt.value = e.settings, nt.value = e.overridden, e.secretStatus && (rt.value = e.secretStatus), Nt(e.settings), Pt();
		}
		async function It() {
			ft.value = !0, M.value = null;
			try {
				let e = await D.get();
				k.value = e.types, it.value = e.meta, Ft(e), F.value = {}, (!j.value || !ut.value.some((e) => e.value === j.value)) && ut.value.length > 0 && (j.value = ut.value[0].value);
			} catch (e) {
				M.value = o(e, "Failed to load settings."), O.error(M.value);
			} finally {
				ft.value = !1;
			}
		}
		function W(e) {
			return k.value[e] ?? "string";
		}
		function Lt(e) {
			let t = A.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Rt(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function zt(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum) || !t.optionHelp) return [];
			let n = t.optionHelp;
			return t.enum.filter((e) => typeof n[e] == "string" && n[e] !== "").map((e) => ({
				value: e,
				label: t.enumLabels?.[e] ?? (e === "" ? "Auto" : e),
				help: n[e]
			}));
		}
		function G(e) {
			let t = A.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function K(e) {
			return A.value[e]?.tier === "advanced";
		}
		function Bt(e) {
			let t = Object.keys(A.value).filter((t) => A.value[t]?.group === e);
			return t.length > 0 && t.every((e) => K(e));
		}
		function q(e) {
			return K(e) && !et.advancedMode;
		}
		function J(e) {
			return A.value[e]?.label || ot(e);
		}
		function Y(e) {
			return A.value[e]?.helpText;
		}
		function X(e) {
			return A.value[e]?.helpLinks;
		}
		function Z(e) {
			return !!Y(e) || (X(e)?.length ?? 0) > 0;
		}
		function Q(e, t) {
			R[e] = t, z[e] = t !== Mt(e, tt.value[e]);
		}
		function Vt(e) {
			try {
				return JSON.stringify(tt.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function Ht(e, t) {
			R[e] = t;
			try {
				let n = JSON.parse(t);
				delete B[e], z[e] = JSON.stringify(n) !== Vt(e);
			} catch (t) {
				B[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, z[e] = !0;
			}
		}
		let Ut = f(() => Object.keys(B).filter((e) => z[e] && !q(e)));
		function Wt(e) {
			I[e] = !I[e];
		}
		function Gt(e) {
			return z[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return L[e] === !0;
		}
		function Kt(e) {
			return Dt(e) && !q(e) && Ot(e)?.set !== !1;
		}
		function qt(e) {
			L[e] = !0, Q(e, ""), I[e] = !1;
		}
		function Jt(e) {
			delete L[e];
		}
		function Yt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function Xt() {
			let e = Date.now(), t = y.restartPollIntervalMs;
			for (; Date.now() - e < y.restartPollTimeoutMs;) {
				await Yt(t), t = Math.min(t + y.restartPollIntervalMs / 2, y.restartPollIntervalMs * 3);
				try {
					let e = await D.get();
					return k.value = e.types, it.value = e.meta, Ft(e), F.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function Zt() {
			if (!P.value) {
				P.value = !0;
				try {
					await D.restartServer(), O.success("Restart signal sent — waiting for the server to come back…"), await Xt() ? (Tt(), O.success("Server is back online.")) : O.error(`The server did not respond within ${Math.round(y.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					O.error(o(e, "Failed to restart server."));
				} finally {
					P.value = !1;
				}
			}
		}
		function Qt() {
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
				if (o !== void 0 && a < o) {
					e[t] = `${J(t)} must be at least ${o}.`;
					continue;
				}
				s !== void 0 && a > s && (e[t] = `${J(t)} must be at most ${s}.`);
			}
			return e;
		}
		async function $t() {
			if (N.value) return;
			if (Ut.value.length > 0) {
				let e = Ut.value.map(J).join(", ");
				O.error(`Fix the invalid JSON in ${e} before saving.`);
				return;
			}
			let e = Qt();
			if (Object.keys(e).length > 0) {
				F.value = e, O.error("Please fix the highlighted values before saving.");
				return;
			}
			N.value = !0, F.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(z)) {
					if (!n || q(t)) continue;
					let r = k.value[t], i = R[t] ?? "";
					e[t] = r === "bool" ? i === "true" || i === "1" : r === "int" || r === "float" ? Number(i) : r === "json" ? JSON.parse(i) : i;
				}
				for (let t of Object.keys(L)) !$(t) || q(t) || (e[t] = "");
				let t = await D.save(e);
				O.success("Settings saved."), Ft(t);
				for (let [t, n] of Object.entries(e)) {
					if (!Dt(t)) continue;
					let e = String(n ?? "");
					rt.value = {
						...rt.value,
						[t]: {
							set: e !== "",
							length: e.length
						}
					};
				}
				let n = Object.keys(e).filter((e) => _t.value.includes(e));
				n.length > 0 && wt(n);
			} catch (e) {
				if (e instanceof r && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (F.value = t.errors, O.error("Please fix the validation errors.")) : O.error(e.message);
				} else O.error(e instanceof r ? e.message : "Failed to save settings.");
			} finally {
				N.value = !1;
			}
		}
		le(he, null)?.value && ge(() => !pt.value || window.confirm("You have unsaved settings changes. Leave without saving them?"));
		function en(e) {
			pt.value && (e.preventDefault(), e.returnValue = "");
		}
		return fe(() => window.addEventListener("beforeunload", en)), de(() => window.removeEventListener("beforeunload", en)), fe(() => (St(), It())), (e, r) => (b(), h("section", _e, [
			r[25] ||= g("header", { class: "admin-settings__head" }, [g("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			v(ie, {
				links: w(ce).settings.links,
				details: w(ce).settings.details
			}, {
				default: T(() => [...r[2] ||= [
					_(" All of your server's configuration, grouped into tabs. Change fields on any tab, then click ", -1),
					g("strong", null, "Save settings", -1),
					_(" to apply only what you changed; a ", -1),
					g("strong", null, "custom", -1),
					_(" badge marks a value you have saved here, overriding the built-in default, and the ", -1),
					g("strong", null, "Advanced", -1),
					_(" switch unlocks the expert-tier fields. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			ft.value ? (b(), h("div", ve, [v(re, {
				variant: "text",
				lines: 6
			})])) : M.value ? (b(), p(ee, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: M.value
			}, {
				actions: T(() => [v(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: It
				}, {
					default: T(() => [...r[3] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (b(), h(d, { key: 2 }, [
				at.value ? (b(), h("div", ye, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : m("", !0),
				g("div", be, [v(ae, {
					modelValue: j.value,
					"onUpdate:modelValue": r[0] ||= (e) => j.value = e,
					tabs: ut.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), g("div", xe, [r[4] ||= g("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), v(te, {
					"model-value": w(et).advancedMode,
					"onUpdate:modelValue": r[1] ||= (e) => w(et).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				yt.value ? (b(), h("div", Se, [g("span", null, " Saved changes to " + C(xt.value.join(", ")) + " require a server restart to take effect. ", 1), g("span", Ce, [g("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: P.value,
					onClick: Zt
				}, C(P.value ? "Restarting…" : "Restart server"), 9, we), g("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: P.value,
					onClick: Tt
				}, " Dismiss ", 8, Te)])])) : m("", !0),
				g("div", Ee, [gt.value.length === 0 ? (b(), h("p", De, " No settings in this group. ")) : (b(), h("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: me($t, ["prevent"])
				}, [(b(!0), h(d, null, pe(gt.value, (e) => (b(), h("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					W(e) === "bool" ? (b(), h(d, { key: 0 }, [g("div", Oe, [
						v(te, {
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
						U(e) ? (b(), p(l, {
							key: 0,
							tone: "accent"
						}, {
							default: T(() => [...r[5] ||= [_("custom", -1)]]),
							_: 1
						})) : m("", !0),
						K(e) ? (b(), p(l, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: T(() => [...r[6] ||= [_("Advanced", -1)]]),
							_: 1
						})) : m("", !0)
					]), Z(e) ? (b(), p(u, {
						key: 0,
						text: Y(e) ?? "",
						links: X(e)
					}, null, 8, ["text", "links"])) : m("", !0)], 64)) : W(e) === "int" || W(e) === "float" ? (b(), h(d, { key: 1 }, [
						g("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							_(C(J(e)) + " ", 1),
							U(e) ? (b(), p(l, {
								key: 0,
								tone: "accent"
							}, {
								default: T(() => [...r[7] ||= [_("custom", -1)]]),
								_: 1
							})) : m("", !0),
							K(e) ? (b(), p(l, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: T(() => [...r[8] ||= [_("Advanced", -1)]]),
								_: 1
							})) : m("", !0)
						], 8, ke),
						g("input", {
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
						}, null, 40, Ae),
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0)
					], 64)) : Lt(e) ? (b(), h(d, { key: 2 }, [
						g("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							_(C(J(e)) + " ", 1),
							U(e) ? (b(), p(l, {
								key: 0,
								tone: "accent"
							}, {
								default: T(() => [...r[9] ||= [_("custom", -1)]]),
								_: 1
							})) : m("", !0),
							K(e) ? (b(), p(l, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: T(() => [...r[10] ||= [_("Advanced", -1)]]),
								_: 1
							})) : m("", !0)
						], 8, je),
						v(ne, {
							"model-value": R[e] ?? "",
							options: Rt(e),
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
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0),
						zt(e).length ? (b(), h("dl", Me, [(b(!0), h(d, null, pe(zt(e), (e) => (b(), h(d, { key: e.value }, [g("dt", Ne, C(e.label), 1), g("dd", Pe, C(e.help), 1)], 64))), 128))])) : m("", !0)
					], 64)) : Et(e) ? (b(), h(d, { key: 3 }, [
						g("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							_(C(J(e)) + " ", 1),
							U(e) ? (b(), p(l, {
								key: 0,
								tone: "accent"
							}, {
								default: T(() => [...r[11] ||= [_("custom", -1)]]),
								_: 1
							})) : m("", !0),
							K(e) ? (b(), p(l, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: T(() => [...r[12] ||= [_("Advanced", -1)]]),
								_: 1
							})) : m("", !0)
						], 8, Fe),
						g("textarea", {
							id: `field-${e}`,
							class: ue(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": B[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": B[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Ht(e, t.target.value)
						}, null, 42, Ie),
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0),
						B[e] ? (b(), h("span", Le, C(B[e]), 1)) : m("", !0)
					], 64)) : A.value[e]?.secret ? (b(), h(d, { key: 4 }, [
						g("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							_(C(J(e)) + " ", 1),
							U(e) ? (b(), p(l, {
								key: 0,
								tone: "accent"
							}, {
								default: T(() => [...r[13] ||= [_("custom", -1)]]),
								_: 1
							})) : m("", !0),
							K(e) ? (b(), p(l, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: T(() => [...r[14] ||= [_("Advanced", -1)]]),
								_: 1
							})) : m("", !0)
						], 8, Re),
						g("p", {
							id: jt(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (b(), h(d, { key: 0 }, [v(l, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: T(() => [...r[15] ||= [_("Will be removed", -1)]]),
							_: 1
						}), r[16] ||= g("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : Ot(e) === null ? (b(), h("span", Be, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : kt(e) ? (b(), h(d, { key: 2 }, [v(l, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: T(() => [...r[17] ||= [_("Configured", -1)]]),
							_: 1
						}), g("span", Ve, " A value is stored (" + C(At(e)) + " " + C(w(n)(At(e), "character", "characters")) + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (b(), h(d, { key: 3 }, [v(l, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: T(() => [...r[18] ||= [_("Not set", -1)]]),
							_: 1
						}), r[19] ||= g("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, ze),
						g("div", He, [
							g("input", {
								id: `field-${e}`,
								class: "admin-settings__input",
								type: I[e] ? "text" : "password",
								autocomplete: "new-password",
								"data-lpignore": "true",
								"data-1p-ignore": "",
								"data-bwignore": "",
								"data-form-type": "other",
								"aria-describedby": jt(e),
								placeholder: $(e) ? "Will be removed on save" : kt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: R[e],
								"aria-invalid": F.value[e] ? "true" : void 0,
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, Ue),
							Gt(e) ? (b(), p(c, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": I[e] ? "eye-off" : "eye",
								"aria-label": I[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => Wt(e)
							}, {
								default: T(() => [_(C(I[e] ? "Hide" : "Show"), 1)]),
								_: 2
							}, 1032, [
								"left-icon",
								"aria-label",
								"onClick"
							])) : m("", !0),
							$(e) ? (b(), p(c, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${J(e)}`,
								onClick: (t) => Jt(e)
							}, {
								default: T(() => [...r[20] ||= [_(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Kt(e) ? (b(), p(c, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => qt(e)
							}, {
								default: T(() => [...r[21] ||= [_(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : m("", !0)
						]),
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0)
					], 64)) : (b(), h(d, { key: 5 }, [
						g("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							_(C(J(e)) + " ", 1),
							U(e) ? (b(), p(l, {
								key: 0,
								tone: "accent"
							}, {
								default: T(() => [...r[22] ||= [_("custom", -1)]]),
								_: 1
							})) : m("", !0),
							K(e) ? (b(), p(l, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: T(() => [...r[23] ||= [_("Advanced", -1)]]),
								_: 1
							})) : m("", !0)
						], 8, We),
						g("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "text",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": F.value[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, Ge),
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0)
					], 64)),
					vt(e) ? (b(), h("span", Ke, " Requires a server restart to take effect ")) : m("", !0),
					F.value[e] ? (b(), h("span", qe, C(F.value[e]), 1)) : m("", !0)
				]))), 128)), g("div", Je, [V.value.length > 0 ? (b(), h("p", Ye, C(w(t)(V.value.length, "change pending", "changes pending")) + ": " + C(mt.value.join(", ")), 1)) : m("", !0), v(c, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !pt.value,
					loading: N.value
				}, {
					default: T(() => [...r[24] ||= [_(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-3fea3282"]]);
//#endregion
export { E as default };

//# sourceMappingURL=SettingsPage-DHC046Oa.js.map