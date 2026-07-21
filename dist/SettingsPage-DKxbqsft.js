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
import { t as le } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ue, normalizeClass as de, onMounted as fe, openBlock as _, reactive as v, ref as y, renderList as pe, toDisplayString as b, unref as x, withCtx as S, withModifiers as me } from "vue";
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
}, Ke = { class: "admin-settings__actions" }, qe = "other", Je = "phlix-restart-pending", C = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(e) {
		let g = e, C = ue("apiBase", ""), Ye = l(() => typeof C == "string" ? C : C?.value ?? ""), w = new se(g.client ?? new i({
			baseUrl: Ye.value,
			tokenStore: new t()
		})), T = ee(), Xe = ce(), Ze = y({}), Qe = y([]), E = y({}), D = y({}), O = y({}), $e = l(() => Object.keys(O.value).length === 0 && Object.keys(E.value).length > 0);
		function et(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function tt(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function nt(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function rt(e) {
			return {
				label: nt(e),
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
			if (!$e.value) return O.value;
			let e = {};
			for (let t of Object.keys(E.value)) e[t] = rt(t);
			return e;
		}), A = l(() => {
			let e = new Set(Object.values(k.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: it(e)
			}));
		});
		function it(e) {
			for (let t of Object.values(k.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return tt(e);
		}
		let j = y(""), at = y(!0), M = y(null), N = y(!1), P = y(!1), F = y({}), I = v({}), L = v({}), R = v({}), z = v({}), B = v({}), ot = l(() => Object.values(z).some(Boolean) || Object.values(L).some(Boolean)), st = l(() => Object.entries(k.value).filter(([, e]) => e.group === j.value).map(([e]) => e)), ct = l(() => Object.entries(k.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function lt(e) {
			return k.value[e]?.restart === !0;
		}
		let V = y([]), ut = l(() => V.value.length > 0), dt = l(() => `${Je}:${Ye.value || "default"}`), ft = l(() => V.value.map((e) => J(e)));
		function pt() {
			if (!(typeof localStorage > "u")) try {
				let e = localStorage.getItem(dt.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (V.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function mt() {
			if (!(typeof localStorage > "u")) try {
				V.value.length === 0 ? localStorage.removeItem(dt.value) : localStorage.setItem(dt.value, JSON.stringify(V.value));
			} catch {}
		}
		function ht(e) {
			let t = /* @__PURE__ */ new Set([...V.value, ...e]);
			V.value = Array.from(t), mt();
		}
		function gt() {
			V.value = [], mt();
		}
		function H(e) {
			return Qe.value.includes(e);
		}
		function _t(e) {
			return W(e) === "json";
		}
		function vt(e) {
			return k.value[e]?.secret === !0;
		}
		function U(e) {
			return D.value[e] ?? null;
		}
		function yt(e) {
			return U(e)?.set === !0;
		}
		function bt(e) {
			let t = U(e);
			return t?.set === !0 ? t.length : 0;
		}
		function xt(e) {
			return `secret-status-${e}`;
		}
		function St(e, t) {
			if (vt(e)) return "";
			if (_t(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function Ct(e) {
			for (let e of Object.keys(R)) delete R[e];
			for (let e of Object.keys(B)) delete B[e];
			for (let [t, n] of Object.entries(e)) R[t] = St(t, n);
		}
		function wt() {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(I)) delete I[e];
			for (let e of Object.keys(L)) delete L[e];
		}
		function Tt(e) {
			Ze.value = e.settings, Qe.value = e.overridden, e.secretStatus && (D.value = e.secretStatus), Ct(e.settings), wt();
		}
		async function Et() {
			at.value = !0, M.value = null;
			try {
				let e = await w.get();
				E.value = e.types, O.value = e.meta, Tt(e), F.value = {}, (!j.value || !A.value.some((e) => e.value === j.value)) && A.value.length > 0 && (j.value = A.value[0].value);
			} catch (e) {
				M.value = n(e, "Failed to load settings."), T.error(M.value);
			} finally {
				at.value = !1;
			}
		}
		function W(e) {
			return E.value[e] ?? "string";
		}
		function Dt(e) {
			let t = k.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Ot(e) {
			let t = k.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function kt(e) {
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
			return K(e) && !Xe.advancedMode;
		}
		function J(e) {
			return k.value[e]?.label || et(e);
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
			R[e] = t, z[e] = t !== St(e, Ze.value[e]);
		}
		function At(e) {
			try {
				return JSON.stringify(Ze.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function jt(e, t) {
			R[e] = t;
			try {
				let n = JSON.parse(t);
				delete B[e], z[e] = JSON.stringify(n) !== At(e);
			} catch (t) {
				B[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, z[e] = !0;
			}
		}
		let Mt = l(() => Object.keys(B).filter((e) => z[e] && !q(e)));
		function Nt(e) {
			I[e] = !I[e];
		}
		function Pt(e) {
			return z[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return L[e] === !0;
		}
		function Ft(e) {
			return vt(e) && !q(e) && U(e)?.set !== !1;
		}
		function It(e) {
			L[e] = !0, Q(e, ""), I[e] = !1;
		}
		function Lt(e) {
			delete L[e];
		}
		function Rt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function zt() {
			let e = Date.now(), t = g.restartPollIntervalMs;
			for (; Date.now() - e < g.restartPollTimeoutMs;) {
				await Rt(t), t = Math.min(t + g.restartPollIntervalMs / 2, g.restartPollIntervalMs * 3);
				try {
					let e = await w.get();
					return E.value = e.types, O.value = e.meta, Tt(e), F.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function Bt() {
			if (!P.value) {
				P.value = !0;
				try {
					await w.restartServer(), T.success("Restart signal sent — waiting for the server to come back…"), await zt() ? (gt(), T.success("Server is back online.")) : T.error(`The server did not respond within ${Math.round(g.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					T.error(n(e, "Failed to restart server."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function Vt() {
			if (!N.value) {
				if (Mt.value.length > 0) {
					let e = Mt.value.map(J).join(", ");
					T.error(`Fix the invalid JSON in ${e} before saving.`);
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
					let t = await w.save(e);
					T.success("Settings saved."), Tt(t);
					for (let [t, n] of Object.entries(e)) {
						if (!vt(t)) continue;
						let e = String(n ?? "");
						D.value = {
							...D.value,
							[t]: {
								set: e !== "",
								length: e.length
							}
						};
					}
					let n = Object.keys(e).filter((e) => ct.value.includes(e));
					n.length > 0 && ht(n);
				} catch (e) {
					if (e instanceof r && e.status === 400) {
						let t = e.body;
						t?.errors && Object.keys(t.errors).length > 0 ? (F.value = t.errors, T.error("Please fix the validation errors.")) : T.error(e.message);
					} else T.error(e instanceof r ? e.message : "Failed to save settings.");
				} finally {
					N.value = !1;
				}
			}
		}
		return fe(() => (pt(), Et())), (e, t) => (_(), f("section", he, [
			t[25] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			h(ae, {
				links: x(le).settings.links,
				details: x(le).settings.details
			}, {
				default: S(() => [...t[2] ||= [
					m(" All of your server's configuration, grouped into tabs. Change fields on any tab, then click ", -1),
					p("strong", null, "Save settings", -1),
					m(" to apply only what you changed; a ", -1),
					p("strong", null, "custom", -1),
					m(" badge marks a value you have saved here, overriding the built-in default, and the ", -1),
					p("strong", null, "Advanced", -1),
					m(" switch unlocks the expert-tier fields. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			at.value ? (_(), f("div", ge, [h(re, {
				variant: "text",
				lines: 6
			})])) : M.value ? (_(), u(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: M.value
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Et
				}, {
					default: S(() => [...t[3] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f(c, { key: 2 }, [
				$e.value ? (_(), f("div", _e, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : d("", !0),
				p("div", ve, [h(oe, {
					modelValue: j.value,
					"onUpdate:modelValue": t[0] ||= (e) => j.value = e,
					tabs: A.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), p("div", ye, [t[4] ||= p("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), h(te, {
					"model-value": x(Xe).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => x(Xe).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				ut.value ? (_(), f("div", be, [p("span", null, " Saved changes to " + b(ft.value.join(", ")) + " require a server restart to take effect. ", 1), p("span", xe, [p("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: P.value,
					onClick: Bt
				}, b(P.value ? "Restarting…" : "Restart server"), 9, Se), p("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: P.value,
					onClick: gt
				}, " Dismiss ", 8, Ce)])])) : d("", !0),
				p("div", we, [st.value.length === 0 ? (_(), f("p", Te, " No settings in this group. ")) : (_(), f("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: me(Vt, ["prevent"])
				}, [(_(!0), f(c, null, pe(st.value, (e) => (_(), f("div", {
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
							default: S(() => [...t[5] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						K(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: S(() => [...t[6] ||= [m("Advanced", -1)]]),
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
							default: S(() => [...t[7] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						K(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: S(() => [...t[8] ||= [m("Advanced", -1)]]),
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
					}, null, 40, Oe)], 64)) : Dt(e) ? (_(), f(c, { key: 2 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							H(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: S(() => [...t[9] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...t[10] ||= [m("Advanced", -1)]]),
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
							options: Ot(e),
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
						kt(e).length ? (_(), f("dl", Ae, [(_(!0), f(c, null, pe(kt(e), (e) => (_(), f(c, { key: e.value }, [p("dt", je, b(e.label), 1), p("dd", Me, b(e.help), 1)], 64))), 128))])) : d("", !0)
					], 64)) : _t(e) ? (_(), f(c, { key: 3 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							H(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: S(() => [...t[11] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...t[12] ||= [m("Advanced", -1)]]),
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
							class: de(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": B[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: R[e],
							"aria-invalid": B[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => jt(e, t.target.value)
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
								default: S(() => [...t[13] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...t[14] ||= [m("Advanced", -1)]]),
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
							id: xt(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (_(), f(c, { key: 0 }, [h(o, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...t[15] ||= [m("Will be removed", -1)]]),
							_: 1
						}), t[16] ||= p("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : U(e) === null ? (_(), f("span", Re, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : yt(e) ? (_(), f(c, { key: 2 }, [h(o, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...t[17] ||= [m("Configured", -1)]]),
							_: 1
						}), p("span", ze, " A value is stored (" + b(bt(e)) + " " + b(bt(e) === 1 ? "character" : "characters") + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (_(), f(c, { key: 3 }, [h(o, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...t[18] ||= [m("Not set", -1)]]),
							_: 1
						}), t[19] ||= p("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, Le),
						p("div", Be, [
							p("input", {
								id: `field-${e}`,
								class: "admin-settings__input",
								type: I[e] ? "text" : "password",
								autocomplete: "off",
								"aria-describedby": xt(e),
								placeholder: $(e) ? "Will be removed on save" : yt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: R[e],
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, Ve),
							Pt(e) ? (_(), u(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": I[e] ? "eye-off" : "eye",
								"aria-label": I[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => Nt(e)
							}, {
								default: S(() => [m(b(I[e] ? "Hide" : "Show"), 1)]),
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
								onClick: (t) => Lt(e)
							}, {
								default: S(() => [...t[20] ||= [m(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Ft(e) ? (_(), u(a, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => It(e)
							}, {
								default: S(() => [...t[21] ||= [m(" Remove ", -1)]]),
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
							default: S(() => [...t[22] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						K(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: S(() => [...t[23] ||= [m("Advanced", -1)]]),
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
					lt(e) ? (_(), f("span", We, " Requires a server restart to take effect ")) : d("", !0),
					F.value[e] ? (_(), f("span", Ge, b(F.value[e]), 1)) : d("", !0)
				]))), 128)), p("div", Ke, [h(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !ot.value,
					loading: N.value,
					onClick: Vt
				}, {
					default: S(() => [...t[24] ||= [m(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-848f97a2"]]);
//#endregion
export { C as default };

//# sourceMappingURL=SettingsPage-DKxbqsft.js.map