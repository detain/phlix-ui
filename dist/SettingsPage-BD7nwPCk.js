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
import { i as s, n as se, t as ce } from "./useSettingsPrefs-Bg8YNzIk.js";
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
	key: 0,
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
		})), w = ee(), T = ce(), E = y({}), Xe = y([]), D = y({}), O = y({}), k = y({}), Ze = l(() => Object.keys(k.value).length === 0 && Object.keys(D.value).length > 0);
		function Qe(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function $e(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function et(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function tt(e) {
			return {
				label: et(e),
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
		let A = l(() => {
			if (!Ze.value) return k.value;
			let e = {};
			for (let t of Object.keys(D.value)) e[t] = tt(t);
			return e;
		}), j = l(() => {
			let e = new Set(Object.values(A.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: nt(e)
			}));
		});
		function nt(e) {
			for (let t of Object.values(A.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return $e(e);
		}
		let M = y(""), N = y(!0), P = y(null), F = y(!1), I = y(!1), L = y({}), R = v({}), z = v({}), B = v({}), V = v({}), rt = l(() => Object.values(B).some(Boolean)), it = l(() => Object.entries(A.value).filter(([, e]) => e.group === M.value).map(([e]) => e)), at = l(() => Object.entries(A.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function ot(e) {
			return A.value[e]?.restart === !0;
		}
		let H = y([]), st = l(() => H.value.length > 0), U = l(() => `${Je}:${Ye.value || "default"}`), ct = l(() => H.value.map((e) => Y(e)));
		function lt() {
			if (!(typeof localStorage > "u")) try {
				let e = localStorage.getItem(U.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (H.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function ut() {
			if (!(typeof localStorage > "u")) try {
				H.value.length === 0 ? localStorage.removeItem(U.value) : localStorage.setItem(U.value, JSON.stringify(H.value));
			} catch {}
		}
		function dt(e) {
			let t = /* @__PURE__ */ new Set([...H.value, ...e]);
			H.value = Array.from(t), ut();
		}
		function ft() {
			H.value = [], ut();
		}
		function W(e) {
			return Xe.value.includes(e);
		}
		function pt(e) {
			return G(e) === "json";
		}
		function mt(e) {
			return A.value[e]?.secret === !0;
		}
		function ht(e) {
			return O.value[e] ?? null;
		}
		function gt(e) {
			return ht(e)?.set === !0;
		}
		function _t(e) {
			let t = ht(e);
			return t?.set === !0 ? t.length : 0;
		}
		function vt(e) {
			return `secret-status-${e}`;
		}
		function yt(e, t) {
			if (mt(e)) return "";
			if (pt(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function bt(e) {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(V)) delete V[e];
			for (let [t, n] of Object.entries(e)) z[t] = yt(t, n);
		}
		function xt() {
			for (let e of Object.keys(B)) delete B[e];
			for (let e of Object.keys(R)) delete R[e];
		}
		function St(e) {
			E.value = e.settings, Xe.value = e.overridden, e.secretStatus && (O.value = e.secretStatus), bt(e.settings), xt();
		}
		async function Ct() {
			N.value = !0, P.value = null;
			try {
				let e = await C.get();
				D.value = e.types, k.value = e.meta, St(e), L.value = {}, (!M.value || !j.value.some((e) => e.value === M.value)) && j.value.length > 0 && (M.value = j.value[0].value);
			} catch (e) {
				P.value = n(e, "Failed to load settings."), w.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		function G(e) {
			return D.value[e] ?? "string";
		}
		function wt(e) {
			let t = A.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Tt(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function Et(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum) || !t.optionHelp) return [];
			let n = t.optionHelp;
			return t.enum.filter((e) => typeof n[e] == "string" && n[e] !== "").map((e) => ({
				value: e,
				label: t.enumLabels?.[e] ?? (e === "" ? "Auto" : e),
				help: n[e]
			}));
		}
		function K(e) {
			let t = A.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function q(e) {
			return A.value[e]?.tier === "advanced";
		}
		function J(e) {
			return q(e) && !T.advancedMode;
		}
		function Y(e) {
			return A.value[e]?.label || Qe(e);
		}
		function X(e) {
			return A.value[e]?.helpText;
		}
		function Z(e) {
			return A.value[e]?.helpLinks;
		}
		function Q(e) {
			return !!X(e) || (Z(e)?.length ?? 0) > 0;
		}
		function $(e, t) {
			z[e] = t, B[e] = t !== yt(e, E.value[e]);
		}
		function Dt(e) {
			try {
				return JSON.stringify(E.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function Ot(e, t) {
			z[e] = t;
			try {
				let n = JSON.parse(t);
				delete V[e], B[e] = JSON.stringify(n) !== Dt(e);
			} catch (t) {
				V[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, B[e] = !0;
			}
		}
		let kt = l(() => Object.keys(V).filter((e) => B[e] && !J(e)));
		function At(e) {
			R[e] = !R[e];
		}
		function jt(e) {
			return B[e] === !0 && !J(e);
		}
		function Mt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function Nt() {
			let e = Date.now(), t = g.restartPollIntervalMs;
			for (; Date.now() - e < g.restartPollTimeoutMs;) {
				await Mt(t), t = Math.min(t + g.restartPollIntervalMs / 2, g.restartPollIntervalMs * 3);
				try {
					let e = await C.get();
					return D.value = e.types, k.value = e.meta, St(e), L.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function Pt() {
			if (!I.value) {
				I.value = !0;
				try {
					await C.restartServer(), w.success("Restart signal sent — waiting for the server to come back…"), await Nt() ? (ft(), w.success("Server is back online.")) : w.error(`The server did not respond within ${Math.round(g.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					w.error(n(e, "Failed to restart server."));
				} finally {
					I.value = !1;
				}
			}
		}
		async function Ft() {
			if (!F.value) {
				if (kt.value.length > 0) {
					let e = kt.value.map(Y).join(", ");
					w.error(`Fix the invalid JSON in ${e} before saving.`);
					return;
				}
				F.value = !0, L.value = {};
				try {
					let e = {};
					for (let [t, n] of Object.entries(B)) {
						if (!n || J(t)) continue;
						let r = D.value[t], i = z[t] ?? "";
						r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : r === "json" ? e[t] = JSON.parse(i) : e[t] = i;
					}
					let t = await C.save(e);
					w.success("Settings saved."), St(t);
					for (let [t, n] of Object.entries(e)) {
						if (!mt(t)) continue;
						let e = String(n ?? "");
						O.value = {
							...O.value,
							[t]: {
								set: e !== "",
								length: e.length
							}
						};
					}
					let n = Object.keys(e).filter((e) => at.value.includes(e));
					n.length > 0 && dt(n);
				} catch (e) {
					if (e instanceof r && e.status === 400) {
						let t = e.body;
						t?.errors && Object.keys(t.errors).length > 0 ? (L.value = t.errors, w.error("Please fix the validation errors.")) : w.error(e.message);
					} else w.error(e instanceof r ? e.message : "Failed to save settings.");
				} finally {
					F.value = !1;
				}
			}
		}
		return de(() => (lt(), Ct())), (e, t) => (_(), f("section", he, [
			t[21] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
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
			N.value ? (_(), f("div", ge, [h(re, {
				variant: "text",
				lines: 6
			})])) : P.value ? (_(), u(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: P.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Ct
				}, {
					default: x(() => [...t[3] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f(c, { key: 2 }, [
				Ze.value ? (_(), f("div", _e, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : d("", !0),
				p("div", ve, [h(oe, {
					modelValue: M.value,
					"onUpdate:modelValue": t[0] ||= (e) => M.value = e,
					tabs: j.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), p("div", ye, [t[4] ||= p("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), h(te, {
					"model-value": pe(T).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => pe(T).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				st.value ? (_(), f("div", be, [p("span", null, " Saved changes to " + b(ct.value.join(", ")) + " require a server restart to take effect. ", 1), p("span", xe, [p("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: I.value,
					onClick: Pt
				}, b(I.value ? "Restarting…" : "Restart server"), 9, Se), p("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: I.value,
					onClick: ft
				}, " Dismiss ", 8, Ce)])])) : d("", !0),
				p("div", we, [it.value.length === 0 ? (_(), f("p", Te, " No settings in this group. ")) : (_(), f("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: me(Ft, ["prevent"])
				}, [(_(!0), f(c, null, fe(it.value, (e) => (_(), f("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					G(e) === "bool" ? (_(), f("div", Ee, [
						h(te, {
							"model-value": z[e] === "true" || z[e] === "1",
							label: Y(e),
							disabled: J(e),
							"onUpdate:modelValue": (t) => $(e, t ? "true" : "false")
						}, null, 8, [
							"model-value",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						W(e) ? (_(), u(o, {
							key: 0,
							tone: "accent"
						}, {
							default: x(() => [...t[5] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						q(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: x(() => [...t[6] ||= [m("Advanced", -1)]]),
							_: 1
						})) : d("", !0),
						Q(e) ? (_(), u(s, {
							key: 2,
							"help-text": X(e) ?? "",
							"help-links": Z(e),
							"field-label": Y(e),
							title: Y(e)
						}, null, 8, [
							"help-text",
							"help-links",
							"field-label",
							"title"
						])) : d("", !0)
					])) : G(e) === "int" || G(e) === "float" ? (_(), f(c, { key: 1 }, [p("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [
						m(b(Y(e)) + " ", 1),
						W(e) ? (_(), u(o, {
							key: 0,
							tone: "accent"
						}, {
							default: x(() => [...t[7] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						q(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: x(() => [...t[8] ||= [m("Advanced", -1)]]),
							_: 1
						})) : d("", !0),
						Q(e) ? (_(), u(s, {
							key: 2,
							"help-text": X(e) ?? "",
							"help-links": Z(e),
							"field-label": Y(e),
							title: Y(e)
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
						value: z[e],
						min: K(e).min,
						max: K(e).max,
						step: G(e) === "float" ? "any" : void 0,
						placeholder: K(e).min === void 0 ? void 0 : `min: ${K(e).min}`,
						disabled: J(e),
						onInput: (t) => $(e, t.target.value)
					}, null, 40, Oe)], 64)) : wt(e) ? (_(), f(c, { key: 2 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(Y(e)) + " ", 1),
							W(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: x(() => [...t[9] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							q(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: x(() => [...t[10] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0),
							Q(e) ? (_(), u(s, {
								key: 2,
								"help-text": X(e) ?? "",
								"help-links": Z(e),
								"field-label": Y(e),
								title: Y(e)
							}, null, 8, [
								"help-text",
								"help-links",
								"field-label",
								"title"
							])) : d("", !0)
						], 8, ke),
						h(ne, {
							"model-value": z[e] ?? "",
							options: Tt(e),
							label: Y(e),
							disabled: J(e),
							"onUpdate:modelValue": (t) => $(e, String(t))
						}, null, 8, [
							"model-value",
							"options",
							"label",
							"disabled",
							"onUpdate:modelValue"
						]),
						Et(e).length ? (_(), f("dl", Ae, [(_(!0), f(c, null, fe(Et(e), (e) => (_(), f(c, { key: e.value }, [p("dt", je, b(e.label), 1), p("dd", Me, b(e.help), 1)], 64))), 128))])) : d("", !0)
					], 64)) : pt(e) ? (_(), f(c, { key: 3 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(Y(e)) + " ", 1),
							W(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: x(() => [...t[11] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							q(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: x(() => [...t[12] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0),
							Q(e) ? (_(), u(s, {
								key: 2,
								"help-text": X(e) ?? "",
								"help-links": Z(e),
								"field-label": Y(e),
								title: Y(e)
							}, null, 8, [
								"help-text",
								"help-links",
								"field-label",
								"title"
							])) : d("", !0)
						], 8, Ne),
						p("textarea", {
							id: `field-${e}`,
							class: ue(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": V[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: z[e],
							"aria-invalid": V[e] ? "true" : void 0,
							disabled: J(e),
							onInput: (t) => Ot(e, t.target.value)
						}, null, 42, Pe),
						V[e] ? (_(), f("span", Fe, b(V[e]), 1)) : d("", !0)
					], 64)) : A.value[e]?.secret ? (_(), f(c, { key: 4 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(Y(e)) + " ", 1),
							W(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: x(() => [...t[13] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							q(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: x(() => [...t[14] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0),
							Q(e) ? (_(), u(s, {
								key: 2,
								"help-text": X(e) ?? "",
								"help-links": Z(e),
								"field-label": Y(e),
								title: Y(e)
							}, null, 8, [
								"help-text",
								"help-links",
								"field-label",
								"title"
							])) : d("", !0)
						], 8, Ie),
						p("p", {
							id: vt(e),
							class: "admin-settings__secret-status"
						}, [ht(e) === null ? (_(), f("span", Re, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : gt(e) ? (_(), f(c, { key: 1 }, [h(o, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: x(() => [...t[15] ||= [m("Configured", -1)]]),
							_: 1
						}), p("span", ze, " A value is stored (" + b(_t(e)) + " " + b(_t(e) === 1 ? "character" : "characters") + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (_(), f(c, { key: 2 }, [h(o, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: x(() => [...t[16] ||= [m("Not set", -1)]]),
							_: 1
						}), t[17] ||= p("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, Le),
						p("div", Be, [p("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: R[e] ? "text" : "password",
							autocomplete: "off",
							"aria-describedby": vt(e),
							placeholder: gt(e) ? "Leave blank to keep the stored value" : `Enter ${Y(e)}`,
							value: z[e],
							disabled: J(e),
							onInput: (t) => $(e, t.target.value)
						}, null, 40, Ve), jt(e) ? (_(), u(a, {
							key: 0,
							variant: "ghost",
							size: "sm",
							"left-icon": R[e] ? "eye-off" : "eye",
							"aria-label": R[e] ? `Hide ${Y(e)}` : `Show ${Y(e)}`,
							onClick: (t) => At(e)
						}, {
							default: x(() => [m(b(R[e] ? "Hide" : "Show"), 1)]),
							_: 2
						}, 1032, [
							"left-icon",
							"aria-label",
							"onClick"
						])) : d("", !0)])
					], 64)) : (_(), f(c, { key: 5 }, [p("label", {
						class: "admin-settings__label",
						for: `field-${e}`
					}, [
						m(b(Y(e)) + " ", 1),
						W(e) ? (_(), u(o, {
							key: 0,
							tone: "accent"
						}, {
							default: x(() => [...t[18] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						q(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: x(() => [...t[19] ||= [m("Advanced", -1)]]),
							_: 1
						})) : d("", !0),
						Q(e) ? (_(), u(s, {
							key: 2,
							"help-text": X(e) ?? "",
							"help-links": Z(e),
							"field-label": Y(e),
							title: Y(e)
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
						value: z[e],
						disabled: J(e),
						onInput: (t) => $(e, t.target.value)
					}, null, 40, Ue)], 64)),
					ot(e) ? (_(), f("span", We, " Requires a server restart to take effect ")) : d("", !0),
					L.value[e] ? (_(), f("span", Ge, b(L.value[e]), 1)) : d("", !0)
				]))), 128)), p("div", Ke, [h(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !rt.value,
					loading: F.value,
					onClick: Ft
				}, {
					default: x(() => [...t[20] ||= [m(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-47770a24"]]);
//#endregion
export { S as default };

//# sourceMappingURL=SettingsPage-BD7nwPCk.js.map