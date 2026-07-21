import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, l as r, t as i } from "./client-D80As4Gx.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as te } from "./Switch-DyS2L5gX.js";
import { t as ne } from "./Select-CymWKJLs.js";
import { t as re } from "./Skeleton-DhQmxeNg.js";
import { t as ie } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { t as oe } from "./Tabs-CLKYop2E.js";
import { i as s, n as se, t as ce } from "./useSettingsPrefs-0HXyMqIe.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as le, normalizeClass as ue, onMounted as de, openBlock as _, reactive as v, ref as y, renderList as fe, toDisplayString as b, unref as pe, withCtx as x, withModifiers as me } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var he = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, ge = {
	key: 0,
	class: "admin-settings__skel"
}, _e = {
	key: 0,
	class: "settings-meta-notice",
	role: "status"
}, ve = { class: "admin-settings__header-row" }, ye = { class: "settings-advanced-toggle" }, be = {
	key: 1,
	class: "settings-restart-banner",
	role: "alert"
}, xe = { class: "settings-restart-banner__actions" }, Se = ["disabled"], Ce = ["disabled"], we = { class: "admin-settings__panel" }, Te = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, Ee = {
	key: 0,
	class: "admin-settings__row"
}, De = ["for"], Oe = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"disabled",
	"onInput"
], ke = ["for"], Ae = {
	key: 0,
	class: "admin-settings__option-help"
}, je = { class: "admin-settings__option-help-term" }, Me = { class: "admin-settings__option-help-desc" }, Ne = ["for"], Pe = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Fe = {
	key: 0,
	class: "admin-settings__error",
	role: "alert"
}, Ie = ["for"], Le = ["id"], Re = {
	key: 1,
	class: "admin-settings__secret-hint"
}, ze = { class: "admin-settings__secret-hint" }, Be = { class: "admin-settings__row" }, Ve = [
	"id",
	"type",
	"aria-describedby",
	"placeholder",
	"value",
	"disabled",
	"onInput"
], He = ["for"], Ue = [
	"id",
	"value",
	"disabled",
	"onInput"
], We = {
	key: 6,
	class: "field-restart-note"
}, Ge = {
	key: 7,
	class: "admin-settings__error",
	role: "alert"
}, Ke = { class: "admin-settings__actions" }, qe = "other", Je = "phlix-restart-pending", S = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(e) {
		let g = e, S = le("apiBase", ""), Ye = l(() => typeof S == "string" ? S : S?.value ?? ""), C = new se(g.client ?? new i({
			baseUrl: Ye.value,
			tokenStore: new t()
		})), w = ee(), T = ce(), Xe = y({}), Ze = y([]), E = y({}), D = y({}), O = y({}), Qe = l(() => Object.keys(O.value).length === 0 && Object.keys(E.value).length > 0);
		function $e(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function et(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function tt(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function nt(e) {
			return {
				label: tt(e),
				helpText: "",
				helpLinks: [],
				tier: "standard",
				group: qe,
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
		let k = l(() => {
			if (!Qe.value) return O.value;
			let e = {};
			for (let t of Object.keys(E.value)) e[t] = nt(t);
			return e;
		}), A = l(() => {
			let e = new Set(Object.values(k.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: rt(e)
			}));
		});
		function rt(e) {
			for (let t of Object.values(k.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return et(e);
		}
		let j = y(""), it = y(!0), M = y(null), N = y(!1), P = y(!1), F = y({}), I = v({}), L = v({}), R = v({}), z = v({}), B = v({}), at = l(() => Object.values(z).some(Boolean) || Object.values(L).some(Boolean)), ot = l(() => Object.entries(k.value).filter(([, e]) => e.group === j.value).map(([e]) => e)), st = l(() => Object.entries(k.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function ct(e) {
			return k.value[e]?.restart === !0;
		}
		let V = y([]), lt = l(() => V.value.length > 0), ut = l(() => `${Je}:${Ye.value || "default"}`), dt = l(() => V.value.map((e) => J(e)));
		function ft() {
			if (!(typeof localStorage > "u")) try {
				let e = localStorage.getItem(ut.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (V.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function pt() {
			if (!(typeof localStorage > "u")) try {
				V.value.length === 0 ? localStorage.removeItem(ut.value) : localStorage.setItem(ut.value, JSON.stringify(V.value));
			} catch {}
		}
		function mt(e) {
			let t = /* @__PURE__ */ new Set([...V.value, ...e]);
			V.value = Array.from(t), pt();
		}
		function ht() {
			V.value = [], pt();
		}
		function H(e) {
			return Ze.value.includes(e);
		}
		function gt(e) {
			return W(e) === "json";
		}
		function _t(e) {
			return k.value[e]?.secret === !0;
		}
		function U(e) {
			return D.value[e] ?? null;
		}
		function vt(e) {
			return U(e)?.set === !0;
		}
		function yt(e) {
			let t = U(e);
			return t?.set === !0 ? t.length : 0;
		}
		function bt(e) {
			return `secret-status-${e}`;
		}
		function xt(e, t) {
			if (_t(e)) return "";
			if (gt(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function St(e) {
			for (let e of Object.keys(R)) delete R[e];
			for (let e of Object.keys(B)) delete B[e];
			for (let [t, n] of Object.entries(e)) R[t] = xt(t, n);
		}
		function Ct() {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(I)) delete I[e];
			for (let e of Object.keys(L)) delete L[e];
		}
		function wt(e) {
			Xe.value = e.settings, Ze.value = e.overridden, e.secretStatus && (D.value = e.secretStatus), St(e.settings), Ct();
		}
		async function Tt() {
			it.value = !0, M.value = null;
			try {
				let e = await C.get();
				E.value = e.types, O.value = e.meta, wt(e), F.value = {}, (!j.value || !A.value.some((e) => e.value === j.value)) && A.value.length > 0 && (j.value = A.value[0].value);
			} catch (e) {
				M.value = n(e, "Failed to load settings."), w.error(M.value);
			} finally {
				it.value = !1;
			}
		}
		function W(e) {
			return E.value[e] ?? "string";
		}
		function Et(e) {
			let t = k.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Dt(e) {
			let t = k.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function Ot(e) {
			let t = k.value[e];
			if (!t || !Array.isArray(t.enum) || !t.optionHelp) return [];
			let n = t.optionHelp;
			return t.enum.filter((e) => typeof n[e] == "string" && n[e] !== "").map((e) => ({
				value: e,
				label: t.enumLabels?.[e] ?? (e === "" ? "Auto" : e),
				help: n[e]
			}));
		}
		function G(e) {
			let t = k.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function K(e) {
			return k.value[e]?.tier === "advanced";
		}
		function q(e) {
			return K(e) && !T.advancedMode;
		}
		function J(e) {
			return k.value[e]?.label || $e(e);
		}
		function Y(e) {
			return k.value[e]?.helpText;
		}
		function X(e) {
			return k.value[e]?.helpLinks;
		}
		function Z(e) {
			return !!Y(e) || (X(e)?.length ?? 0) > 0;
		}
		function Q(e, t) {
			R[e] = t, z[e] = t !== xt(e, Xe.value[e]);
		}
		function kt(e) {
			try {
				return JSON.stringify(Xe.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function At(e, t) {
			R[e] = t;
			try {
				let n = JSON.parse(t);
				delete B[e], z[e] = JSON.stringify(n) !== kt(e);
			} catch (t) {
				B[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, z[e] = !0;
			}
		}
		let jt = l(() => Object.keys(B).filter((e) => z[e] && !q(e)));
		function Mt(e) {
			I[e] = !I[e];
		}
		function Nt(e) {
			return z[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return L[e] === !0;
		}
		function Pt(e) {
			return _t(e) && !q(e) && U(e)?.set !== !1;
		}
		function Ft(e) {
			L[e] = !0, Q(e, ""), I[e] = !1;
		}
		function It(e) {
			delete L[e];
		}
		function Lt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function Rt() {
			let e = Date.now(), t = g.restartPollIntervalMs;
			for (; Date.now() - e < g.restartPollTimeoutMs;) {
				await Lt(t), t = Math.min(t + g.restartPollIntervalMs / 2, g.restartPollIntervalMs * 3);
				try {
					let e = await C.get();
					return E.value = e.types, O.value = e.meta, wt(e), F.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function zt() {
			if (!P.value) {
				P.value = !0;
				try {
					await C.restartServer(), w.success("Restart signal sent — waiting for the server to come back…"), await Rt() ? (ht(), w.success("Server is back online.")) : w.error(`The server did not respond within ${Math.round(g.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					w.error(n(e, "Failed to restart server."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function Bt() {
			if (!N.value) {
				if (jt.value.length > 0) {
					let e = jt.value.map(J).join(", ");
					w.error(`Fix the invalid JSON in ${e} before saving.`);
					return;
				}
				N.value = !0, F.value = {};
				try {
					let e = {};
					for (let [t, n] of Object.entries(z)) {
						if (!n || q(t)) continue;
						let r = E.value[t], i = R[t] ?? "";
						r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : r === "json" ? e[t] = JSON.parse(i) : e[t] = i;
					}
					for (let t of Object.keys(L)) !$(t) || q(t) || (e[t] = "");
					let t = await C.save(e);
					w.success("Settings saved."), wt(t);
					for (let [t, n] of Object.entries(e)) {
						if (!_t(t)) continue;
						let e = String(n ?? "");
						D.value = {
							...D.value,
							[t]: {
								set: e !== "",
								length: e.length
							}
						};
					}
					let n = Object.keys(e).filter((e) => st.value.includes(e));
					n.length > 0 && mt(n);
				} catch (e) {
					if (e instanceof r && e.status === 400) {
						let t = e.body;
						t?.errors && Object.keys(t.errors).length > 0 ? (F.value = t.errors, w.error("Please fix the validation errors.")) : w.error(e.message);
					} else w.error(e instanceof r ? e.message : "Failed to save settings.");
				} finally {
					N.value = !1;
				}
			}
		}
		return de(() => (ft(), Tt())), (e, t) => (_(), f("section", he, [
			t[25] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			h(ae, null, {
				default: x(() => [...t[2] ||= [
					m(" All of your server's configuration, grouped into tabs. Change fields on any tab, then click ", -1),
					p("strong", null, "Save settings", -1),
					m(" to apply only what you changed; a ", -1),
					p("strong", null, "custom", -1),
					m(" badge marks values overridden by your environment or config file, and the ", -1),
					p("strong", null, "Advanced", -1),
					m(" switch unlocks the expert-tier fields. ", -1)
				]]),
				_: 1
			}),
			it.value ? (_(), f("div", ge, [h(re, {
				variant: "text",
				lines: 6
			})])) : M.value ? (_(), u(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: M.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Tt
				}, {
					default: x(() => [...t[3] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f(c, { key: 2 }, [
				Qe.value ? (_(), f("div", _e, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : d("", !0),
				p("div", ve, [h(oe, {
					modelValue: j.value,
					"onUpdate:modelValue": t[0] ||= (e) => j.value = e,
					tabs: A.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), p("div", ye, [t[4] ||= p("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), h(te, {
					"model-value": pe(T).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => pe(T).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				lt.value ? (_(), f("div", be, [p("span", null, " Saved changes to " + b(dt.value.join(", ")) + " require a server restart to take effect. ", 1), p("span", xe, [p("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: P.value,
					onClick: zt
				}, b(P.value ? "Restarting…" : "Restart server"), 9, Se), p("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: P.value,
					onClick: ht
				}, " Dismiss ", 8, Ce)])])) : d("", !0),
				p("div", we, [ot.value.length === 0 ? (_(), f("p", Te, " No settings in this group. ")) : (_(), f("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: me(Bt, ["prevent"])
				}, [(_(!0), f(c, null, fe(ot.value, (e) => (_(), f("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					W(e) === "bool" ? (_(), f("div", Ee, [
						h(te, {
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
						H(e) ? (_(), u(o, {
							key: 0,
							tone: "accent"
						}, {
							default: x(() => [...t[5] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						K(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: x(() => [...t[6] ||= [m("Advanced", -1)]]),
							_: 1
						})) : d("", !0),
						Z(e) ? (_(), u(s, {
							key: 2,
							"help-text": Y(e) ?? "",
							"help-links": X(e),
							"field-label": J(e),
							title: J(e)
						}, null, 8, [
							"help-text",
							"help-links",
							"field-label",
							"title"
						])) : d("", !0)
					])) : W(e) === "int" || W(e) === "float" ? (_(), f(c, { key: 1 }, [p("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [
						m(b(J(e)) + " ", 1),
						H(e) ? (_(), u(o, {
							key: 0,
							tone: "accent"
						}, {
							default: x(() => [...t[7] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						K(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: x(() => [...t[8] ||= [m("Advanced", -1)]]),
							_: 1
						})) : d("", !0),
						Z(e) ? (_(), u(s, {
							key: 2,
							"help-text": Y(e) ?? "",
							"help-links": X(e),
							"field-label": J(e),
							title: J(e)
						}, null, 8, [
							"help-text",
							"help-links",
							"field-label",
							"title"
						])) : d("", !0)
					], 8, De), p("input", {
						id: `field-${e}`,
						class: "admin-settings__input",
						type: "number",
						value: R[e],
						min: G(e).min,
						max: G(e).max,
						step: W(e) === "float" ? "any" : void 0,
						placeholder: G(e).min === void 0 ? void 0 : `min: ${G(e).min}`,
						disabled: q(e),
						onInput: (t) => Q(e, t.target.value)
					}, null, 40, Oe)], 64)) : Et(e) ? (_(), f(c, { key: 2 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							H(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: x(() => [...t[9] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: x(() => [...t[10] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0),
							Z(e) ? (_(), u(s, {
								key: 2,
								"help-text": Y(e) ?? "",
								"help-links": X(e),
								"field-label": J(e),
								title: J(e)
							}, null, 8, [
								"help-text",
								"help-links",
								"field-label",
								"title"
							])) : d("", !0)
						], 8, ke),
						h(ne, {
							"model-value": R[e] ?? "",
							options: Dt(e),
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
						Ot(e).length ? (_(), f("dl", Ae, [(_(!0), f(c, null, fe(Ot(e), (e) => (_(), f(c, { key: e.value }, [p("dt", je, b(e.label), 1), p("dd", Me, b(e.help), 1)], 64))), 128))])) : d("", !0)
					], 64)) : gt(e) ? (_(), f(c, { key: 3 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							H(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: x(() => [...t[11] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: x(() => [...t[12] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0),
							Z(e) ? (_(), u(s, {
								key: 2,
								"help-text": Y(e) ?? "",
								"help-links": X(e),
								"field-label": J(e),
								title: J(e)
							}, null, 8, [
								"help-text",
								"help-links",
								"field-label",
								"title"
							])) : d("", !0)
						], 8, Ne),
						p("textarea", {
							id: `field-${e}`,
							class: ue(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": B[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": B[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => At(e, t.target.value)
						}, null, 42, Pe),
						B[e] ? (_(), f("span", Fe, b(B[e]), 1)) : d("", !0)
					], 64)) : k.value[e]?.secret ? (_(), f(c, { key: 4 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							H(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: x(() => [...t[13] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: x(() => [...t[14] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0),
							Z(e) ? (_(), u(s, {
								key: 2,
								"help-text": Y(e) ?? "",
								"help-links": X(e),
								"field-label": J(e),
								title: J(e)
							}, null, 8, [
								"help-text",
								"help-links",
								"field-label",
								"title"
							])) : d("", !0)
						], 8, Ie),
						p("p", {
							id: bt(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (_(), f(c, { key: 0 }, [h(o, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: x(() => [...t[15] ||= [m("Will be removed", -1)]]),
							_: 1
						}), t[16] ||= p("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : U(e) === null ? (_(), f("span", Re, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : vt(e) ? (_(), f(c, { key: 2 }, [h(o, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: x(() => [...t[17] ||= [m("Configured", -1)]]),
							_: 1
						}), p("span", ze, " A value is stored (" + b(yt(e)) + " " + b(yt(e) === 1 ? "character" : "characters") + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (_(), f(c, { key: 3 }, [h(o, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: x(() => [...t[18] ||= [m("Not set", -1)]]),
							_: 1
						}), t[19] ||= p("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, Le),
						p("div", Be, [
							p("input", {
								id: `field-${e}`,
								class: "admin-settings__input",
								type: I[e] ? "text" : "password",
								autocomplete: "off",
								"aria-describedby": bt(e),
								placeholder: $(e) ? "Will be removed on save" : vt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: R[e],
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, Ve),
							Nt(e) ? (_(), u(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": I[e] ? "eye-off" : "eye",
								"aria-label": I[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => Mt(e)
							}, {
								default: x(() => [m(b(I[e] ? "Hide" : "Show"), 1)]),
								_: 2
							}, 1032, [
								"left-icon",
								"aria-label",
								"onClick"
							])) : d("", !0),
							$(e) ? (_(), u(a, {
								key: 1,
								variant: "ghost",
								size: "sm",
								"aria-label": `Keep the stored ${J(e)}`,
								onClick: (t) => It(e)
							}, {
								default: x(() => [...t[20] ||= [m(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Pt(e) ? (_(), u(a, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => Ft(e)
							}, {
								default: x(() => [...t[21] ||= [m(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : d("", !0)
						])
					], 64)) : (_(), f(c, { key: 5 }, [p("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [
						m(b(J(e)) + " ", 1),
						H(e) ? (_(), u(o, {
							key: 0,
							tone: "accent"
						}, {
							default: x(() => [...t[22] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						K(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: x(() => [...t[23] ||= [m("Advanced", -1)]]),
							_: 1
						})) : d("", !0),
						Z(e) ? (_(), u(s, {
							key: 2,
							"help-text": Y(e) ?? "",
							"help-links": X(e),
							"field-label": J(e),
							title: J(e)
						}, null, 8, [
							"help-text",
							"help-links",
							"field-label",
							"title"
						])) : d("", !0)
					], 8, He), p("input", {
						id: `field-${e}`,
						class: "admin-settings__input",
						type: "text",
						autocomplete: "off",
						value: R[e],
						disabled: q(e),
						onInput: (t) => Q(e, t.target.value)
					}, null, 40, Ue)], 64)),
					ct(e) ? (_(), f("span", We, " Requires a server restart to take effect ")) : d("", !0),
					F.value[e] ? (_(), f("span", Ge, b(F.value[e]), 1)) : d("", !0)
				]))), 128)), p("div", Ke, [h(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !at.value,
					loading: N.value,
					onClick: Bt
				}, {
					default: x(() => [...t[24] ||= [m(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-bf16c7d4"]]);
//#endregion
export { S as default };

//# sourceMappingURL=SettingsPage-BQi2sN_4.js.map