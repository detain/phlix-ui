import { n as e } from "./Icon-CIwTuFLd.js";
import { a as t, o as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-CtPA8i1l.js";
import { g as i, l as a, t as o, y as s } from "./client-BoMeMmx0.js";
import { t as ee } from "./useToastStore-DIWpaCOl.js";
import { t as te } from "./EmptyState-BAyOxAcK.js";
import { t as c } from "./Button-BuG0GvCa.js";
import { t as l } from "./Badge-A88fI41k.js";
import { t as ne } from "./Switch-ibkXiiN-.js";
import { t as re } from "./Select-CcWAlng_.js";
import { t as ie } from "./Skeleton-rHw-IJtl.js";
import { t as ae } from "./PageHint-BGYg6qRJ.js";
import { t as oe } from "./Tabs-7t3yuCWn.js";
import { t as u } from "./HelpText-aA3EQtU4.js";
import { n as se, t as ce } from "./useSettingsPrefs-CEFxTJFG.js";
import { t as le } from "./helpLinks-DVaEk-wy.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as ue, normalizeClass as de, onBeforeUnmount as fe, onMounted as pe, openBlock as b, reactive as x, ref as S, renderList as me, toDisplayString as C, unref as w, withCtx as T, withModifiers as he } from "vue";
import { matchedRouteKey as ge, onBeforeRouteLeave as _e } from "vue-router";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
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
}, Ze = "other", Qe = "phlix-restart-pending", $e = 200, et = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(e) {
		let y = e, et = ue("apiBase", ""), tt = f(() => typeof et == "string" ? et : et?.value ?? ""), nt = y.client ?? new o({
			baseUrl: tt.value,
			tokenStore: new a()
		}), E = new se(nt), D = ee(), O = ce(), { t: k } = r(), rt = S({}), it = S([]), A = S({}), at = S({}), ot = S({}), st = f(() => Object.keys(ot.value).length === 0 && Object.keys(A.value).length > 0);
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
		let j = f(() => {
			if (!st.value) return ot.value;
			let e = {};
			for (let t of Object.keys(A.value)) e[t] = dt(t);
			return e;
		}), ft = f(() => {
			let e = new Set(Object.values(j.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: pt(e),
				muted: !O.advancedMode && Ut(e),
				badge: vt.value[e] || void 0
			}));
		});
		function pt(e) {
			for (let t of Object.values(j.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return lt(e);
		}
		let M = S(""), mt = S(!0), N = S(null), ht = S(!1), P = S(!1), F = S({}), I = x({}), L = x({}), R = x({}), z = x({}), B = x({}), gt = f(() => Object.values(z).some(Boolean) || Object.values(L).some(Boolean)), V = f(() => {
			let e = Object.keys(z).filter((e) => z[e] && !q(e));
			for (let t of Object.keys(L)) L[t] && !q(t) && !e.includes(t) && e.push(t);
			return e;
		}), _t = f(() => V.value.map(J)), vt = f(() => {
			let e = {};
			for (let t of V.value) {
				let n = j.value[t]?.group ?? Ze;
				e[n] = (e[n] ?? 0) + 1;
			}
			return e;
		}), yt = f(() => Object.entries(j.value).filter(([, e]) => e.group === M.value).map(([e]) => e)), bt = f(() => Object.entries(j.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function xt(e) {
			return j.value[e]?.restart === !0;
		}
		let H = S([]), St = f(() => H.value.length > 0), Ct = f(() => `${Qe}:${tt.value || "default"}`), wt = f(() => H.value.map((e) => J(e)));
		function Tt() {
			if (!(typeof localStorage > "u")) try {
				let e = localStorage.getItem(Ct.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (H.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function Et() {
			if (!(typeof localStorage > "u")) try {
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
			return it.value.includes(e);
		}
		function kt(e) {
			return W(e) === "json";
		}
		function At(e) {
			return j.value[e]?.secret === !0;
		}
		function jt(e) {
			return at.value[e] ?? null;
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
			rt.value = e.settings, it.value = e.overridden, e.secretStatus && (at.value = e.secretStatus), It(e.settings), Lt();
		}
		async function zt() {
			mt.value = !0, N.value = null;
			try {
				let e = await E.get();
				A.value = e.types, ot.value = e.meta, Rt(e), F.value = {}, (!M.value || !ft.value.some((e) => e.value === M.value)) && ft.value.length > 0 && (M.value = ft.value[0].value);
			} catch (e) {
				N.value = s(e, "Failed to load settings."), D.error(N.value);
			} finally {
				mt.value = !1;
			}
		}
		function W(e) {
			return A.value[e] ?? "string";
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
			return K(e) && !O.advancedMode;
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
			R[e] = t, z[e] = t !== Ft(e, rt.value[e]);
		}
		function Wt(e) {
			try {
				return JSON.stringify(rt.value[e] ?? null);
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
		let Kt = f(() => Object.keys(B).filter((e) => z[e] && !q(e)));
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
			let e = Date.now(), t = y.restartPollIntervalMs;
			for (; Date.now() - e < y.restartPollTimeoutMs;) {
				await Qt(t), t = Math.min(t + y.restartPollIntervalMs / 2, y.restartPollIntervalMs * 3);
				try {
					let e = await E.get();
					return A.value = e.types, ot.value = e.meta, Rt(e), F.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function en() {
			if (!P.value) {
				P.value = !0;
				try {
					await E.restartServer(), D.success("Restart signal sent — waiting for the server to come back…"), await $t() ? (Ot(), D.success("Server is back online.")) : D.error(`The server did not respond within ${Math.round(y.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					D.error(s(e, "Failed to restart server."));
				} finally {
					P.value = !1;
				}
			}
		}
		function tn() {
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
				let { min: o, max: s } = G(t);
				if (o !== void 0 && a < o) {
					e[t] = `${J(t)} must be at least ${o}.`;
					continue;
				}
				s !== void 0 && a > s && (e[t] = `${J(t)} must be at most ${s}.`);
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
			return t === "" ? null : t.length <= $e ? t : `${t.slice(0, $e)}…`;
		}
		function on(e, t) {
			let n = t ?? {}, r = typeof n.reason == "string" ? n.reason : "", i = nn[r];
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
			let a = typeof n.message == "string" ? an(n.message) : null;
			return {
				message: a ? `${k("admin.settingsRejected")} (${a})` : k("admin.settingsRejected"),
				inlineErrors: null
			};
		}
		async function sn() {
			if (ht.value) return;
			if (Kt.value.length > 0) {
				let e = Kt.value.map(J).join(", ");
				D.error(`Fix the invalid JSON in ${e} before saving.`);
				return;
			}
			let e = tn();
			if (Object.keys(e).length > 0) {
				F.value = e, D.error("Please fix the highlighted values before saving.");
				return;
			}
			ht.value = !0, F.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(z)) {
					if (!n || q(t)) continue;
					let r = A.value[t], i = R[t] ?? "";
					e[t] = r === "bool" ? i === "true" || i === "1" : r === "int" || r === "float" ? Number(i) : r === "json" ? JSON.parse(i) : i;
				}
				for (let t of Object.keys(L)) !$(t) || q(t) || (e[t] = "");
				let t = await E.save(e);
				D.success("Settings saved."), Rt(t);
				for (let [t, n] of Object.entries(e)) {
					if (!At(t)) continue;
					let e = String(n ?? "");
					at.value = {
						...at.value,
						[t]: {
							set: e !== "",
							length: e.length
						}
					};
				}
				let n = Object.keys(e).filter((e) => bt.value.includes(e));
				n.length > 0 && Dt(n);
			} catch (e) {
				if (e instanceof i && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (F.value = t.errors, D.error("Please fix the validation errors.")) : D.error(on(e.status, e.body).message);
				} else if (e instanceof i && rn.has(e.status)) {
					let t = on(e.status, e.body);
					t.inlineErrors && (F.value = t.inlineErrors), D.error(t.message);
				} else D.error(e instanceof i ? e.message : "Failed to save settings.");
			} finally {
				ht.value = !1;
			}
		}
		ue(ge, null)?.value && _e(() => !gt.value || window.confirm("You have unsaved settings changes. Leave without saving them?"));
		function cn(e) {
			gt.value && (e.preventDefault(), e.returnValue = "");
		}
		return pe(() => window.addEventListener("beforeunload", cn)), fe(() => window.removeEventListener("beforeunload", cn)), pe(() => (Tt(), zt())), (e, r) => (b(), h("section", ve, [
			r[25] ||= g("header", { class: "admin-settings__head" }, [g("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			v(ae, {
				links: w(le).settings.links,
				details: w(le).settings.details
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
			mt.value ? (b(), h("div", ye, [v(ie, {
				variant: "text",
				lines: 6
			})])) : N.value ? (b(), p(te, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load settings",
				description: N.value
			}, {
				actions: T(() => [v(c, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: zt
				}, {
					default: T(() => [...r[3] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (b(), h(d, { key: 2 }, [
				st.value ? (b(), h("div", be, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : m("", !0),
				g("div", xe, [v(oe, {
					modelValue: M.value,
					"onUpdate:modelValue": r[0] ||= (e) => M.value = e,
					tabs: ft.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), g("div", Se, [r[4] ||= g("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), v(ne, {
					"model-value": w(O).advancedMode,
					"onUpdate:modelValue": r[1] ||= (e) => w(O).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				St.value ? (b(), h("div", Ce, [g("span", null, " Saved changes to " + C(wt.value.join(", ")) + " require a server restart to take effect. ", 1), g("span", we, [g("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: P.value,
					onClick: en
				}, C(P.value ? "Restarting…" : "Restart server"), 9, Te), g("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: P.value,
					onClick: Ot
				}, " Dismiss ", 8, Ee)])])) : m("", !0),
				g("div", De, [yt.value.length === 0 ? (b(), h("p", Oe, " No settings in this group. ")) : (b(), h("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: he(sn, ["prevent"])
				}, [(b(!0), h(d, null, me(yt.value, (e) => (b(), h("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					W(e) === "bool" ? (b(), h(d, { key: 0 }, [g("div", ke, [
						v(ne, {
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
						], 8, Ae),
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
						}, null, 40, je),
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0)
					], 64)) : Bt(e) ? (b(), h(d, { key: 2 }, [
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
						], 8, Me),
						v(re, {
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
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0),
						Ht(e).length ? (b(), h("dl", Ne, [(b(!0), h(d, null, me(Ht(e), (e) => (b(), h(d, { key: e.value }, [g("dt", Pe, C(e.label), 1), g("dd", Fe, C(e.help), 1)], 64))), 128))])) : m("", !0)
					], 64)) : kt(e) ? (b(), h(d, { key: 3 }, [
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
						], 8, Ie),
						g("textarea", {
							id: `field-${e}`,
							class: de(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": B[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": B[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Gt(e, t.target.value)
						}, null, 42, Le),
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0),
						B[e] ? (b(), h("span", Re, C(B[e]), 1)) : m("", !0)
					], 64)) : j.value[e]?.secret ? (b(), h(d, { key: 4 }, [
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
						], 8, ze),
						g("p", {
							id: Pt(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (b(), h(d, { key: 0 }, [v(l, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: T(() => [...r[15] ||= [_("Will be removed", -1)]]),
							_: 1
						}), r[16] ||= g("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : jt(e) === null ? (b(), h("span", Ve, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : Mt(e) ? (b(), h(d, { key: 2 }, [v(l, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: T(() => [...r[17] ||= [_("Configured", -1)]]),
							_: 1
						}), g("span", He, " A value is stored (" + C(Nt(e)) + " " + C(w(n)(Nt(e), "character", "characters")) + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (b(), h(d, { key: 3 }, [v(l, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: T(() => [...r[18] ||= [_("Not set", -1)]]),
							_: 1
						}), r[19] ||= g("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, Be),
						g("div", Ue, [
							g("input", {
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
							}, null, 40, We),
							Jt(e) ? (b(), p(c, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": I[e] ? "eye-off" : "eye",
								"aria-label": I[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => qt(e)
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
								onClick: (t) => Zt(e)
							}, {
								default: T(() => [...r[20] ||= [_(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Yt(e) ? (b(), p(c, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => Xt(e)
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
						], 8, Ge),
						g("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "text",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": F.value[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, Ke),
						Z(e) ? (b(), p(u, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : m("", !0)
					], 64)),
					xt(e) ? (b(), h("span", qe, " Requires a server restart to take effect ")) : m("", !0),
					F.value[e] ? (b(), h("span", Je, C(F.value[e]), 1)) : m("", !0)
				]))), 128)), g("div", Ye, [V.value.length > 0 ? (b(), h("p", Xe, C(w(t)(V.value.length, "change pending", "changes pending")) + ": " + C(_t.value.join(", ")), 1)) : m("", !0), v(c, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !gt.value,
					loading: ht.value
				}, {
					default: T(() => [...r[24] ||= [_(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-0d3338f9"]]);
//#endregion
export { et as default };

//# sourceMappingURL=SettingsPage-Cr-YTso5.js.map