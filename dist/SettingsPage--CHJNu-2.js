import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, l as r, t as i } from "./client-BzWwyWKr.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as te } from "./Switch-DyS2L5gX.js";
import { t as ne } from "./Select-Cvp-73pF.js";
import { t as re } from "./Skeleton-DhQmxeNg.js";
import { t as ie } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { t as oe } from "./Tabs-eIyCjmHA.js";
import { t as s } from "./HelpText-Ccbgsfz2.js";
import { n as se, t as ce } from "./useSettingsPrefs-4sXLwW6T.js";
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
}, Ee = { class: "admin-settings__row" }, De = ["for"], Oe = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"disabled",
	"onInput"
], ke = ["for"], Ae = {
	key: 1,
	class: "admin-settings__option-help"
}, je = { class: "admin-settings__option-help-term" }, Me = { class: "admin-settings__option-help-desc" }, Ne = ["for"], Pe = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Fe = {
	key: 1,
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
		})), T = ee(), E = ce(), Xe = y({}), Ze = y([]), D = y({}), O = y({}), k = y({}), Qe = l(() => Object.keys(k.value).length === 0 && Object.keys(D.value).length > 0);
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
		let A = l(() => {
			if (!Qe.value) return k.value;
			let e = {};
			for (let t of Object.keys(D.value)) e[t] = nt(t);
			return e;
		}), j = l(() => {
			let e = new Set(Object.values(A.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: rt(e),
				muted: !E.advancedMode && At(e)
			}));
		});
		function rt(e) {
			for (let t of Object.values(A.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return et(e);
		}
		let M = y(""), it = y(!0), N = y(null), P = y(!1), F = y(!1), I = y({}), L = v({}), R = v({}), z = v({}), B = v({}), V = v({}), at = l(() => Object.values(B).some(Boolean) || Object.values(R).some(Boolean)), ot = l(() => Object.entries(A.value).filter(([, e]) => e.group === M.value).map(([e]) => e)), st = l(() => Object.entries(A.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function ct(e) {
			return A.value[e]?.restart === !0;
		}
		let H = y([]), lt = l(() => H.value.length > 0), ut = l(() => `${Je}:${Ye.value || "default"}`), dt = l(() => H.value.map((e) => J(e)));
		function ft() {
			if (!(typeof localStorage > "u")) try {
				let e = localStorage.getItem(ut.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (H.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function pt() {
			if (!(typeof localStorage > "u")) try {
				H.value.length === 0 ? localStorage.removeItem(ut.value) : localStorage.setItem(ut.value, JSON.stringify(H.value));
			} catch {}
		}
		function mt(e) {
			let t = /* @__PURE__ */ new Set([...H.value, ...e]);
			H.value = Array.from(t), pt();
		}
		function ht() {
			H.value = [], pt();
		}
		function U(e) {
			return Ze.value.includes(e);
		}
		function gt(e) {
			return G(e) === "json";
		}
		function _t(e) {
			return A.value[e]?.secret === !0;
		}
		function W(e) {
			return O.value[e] ?? null;
		}
		function vt(e) {
			return W(e)?.set === !0;
		}
		function yt(e) {
			let t = W(e);
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
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(V)) delete V[e];
			for (let [t, n] of Object.entries(e)) z[t] = xt(t, n);
		}
		function Ct() {
			for (let e of Object.keys(B)) delete B[e];
			for (let e of Object.keys(L)) delete L[e];
			for (let e of Object.keys(R)) delete R[e];
		}
		function wt(e) {
			Xe.value = e.settings, Ze.value = e.overridden, e.secretStatus && (O.value = e.secretStatus), St(e.settings), Ct();
		}
		async function Tt() {
			it.value = !0, N.value = null;
			try {
				let e = await w.get();
				D.value = e.types, k.value = e.meta, wt(e), I.value = {}, (!M.value || !j.value.some((e) => e.value === M.value)) && j.value.length > 0 && (M.value = j.value[0].value);
			} catch (e) {
				N.value = n(e, "Failed to load settings."), T.error(N.value);
			} finally {
				it.value = !1;
			}
		}
		function G(e) {
			return D.value[e] ?? "string";
		}
		function Et(e) {
			let t = A.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function Dt(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function Ot(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum) || !t.optionHelp) return [];
			let n = t.optionHelp;
			return t.enum.filter((e) => typeof n[e] == "string" && n[e] !== "").map((e) => ({
				value: e,
				label: t.enumLabels?.[e] ?? (e === "" ? "Auto" : e),
				help: n[e]
			}));
		}
		function kt(e) {
			let t = A.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function K(e) {
			return A.value[e]?.tier === "advanced";
		}
		function At(e) {
			let t = Object.keys(A.value).filter((t) => A.value[t]?.group === e);
			return t.length > 0 && t.every((e) => K(e));
		}
		function q(e) {
			return K(e) && !E.advancedMode;
		}
		function J(e) {
			return A.value[e]?.label || $e(e);
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
			z[e] = t, B[e] = t !== xt(e, Xe.value[e]);
		}
		function jt(e) {
			try {
				return JSON.stringify(Xe.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function Mt(e, t) {
			z[e] = t;
			try {
				let n = JSON.parse(t);
				delete V[e], B[e] = JSON.stringify(n) !== jt(e);
			} catch (t) {
				V[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, B[e] = !0;
			}
		}
		let Nt = l(() => Object.keys(V).filter((e) => B[e] && !q(e)));
		function Pt(e) {
			L[e] = !L[e];
		}
		function Ft(e) {
			return B[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return R[e] === !0;
		}
		function It(e) {
			return _t(e) && !q(e) && W(e)?.set !== !1;
		}
		function Lt(e) {
			R[e] = !0, Q(e, ""), L[e] = !1;
		}
		function Rt(e) {
			delete R[e];
		}
		function zt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function Bt() {
			let e = Date.now(), t = g.restartPollIntervalMs;
			for (; Date.now() - e < g.restartPollTimeoutMs;) {
				await zt(t), t = Math.min(t + g.restartPollIntervalMs / 2, g.restartPollIntervalMs * 3);
				try {
					let e = await w.get();
					return D.value = e.types, k.value = e.meta, wt(e), I.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function Vt() {
			if (!F.value) {
				F.value = !0;
				try {
					await w.restartServer(), T.success("Restart signal sent — waiting for the server to come back…"), await Bt() ? (ht(), T.success("Server is back online.")) : T.error(`The server did not respond within ${Math.round(g.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					T.error(n(e, "Failed to restart server."));
				} finally {
					F.value = !1;
				}
			}
		}
		async function Ht() {
			if (!P.value) {
				if (Nt.value.length > 0) {
					let e = Nt.value.map(J).join(", ");
					T.error(`Fix the invalid JSON in ${e} before saving.`);
					return;
				}
				P.value = !0, I.value = {};
				try {
					let e = {};
					for (let [t, n] of Object.entries(B)) {
						if (!n || q(t)) continue;
						let r = D.value[t], i = z[t] ?? "";
						r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : r === "json" ? e[t] = JSON.parse(i) : e[t] = i;
					}
					for (let t of Object.keys(R)) !$(t) || q(t) || (e[t] = "");
					let t = await w.save(e);
					T.success("Settings saved."), wt(t);
					for (let [t, n] of Object.entries(e)) {
						if (!_t(t)) continue;
						let e = String(n ?? "");
						O.value = {
							...O.value,
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
						t?.errors && Object.keys(t.errors).length > 0 ? (I.value = t.errors, T.error("Please fix the validation errors.")) : T.error(e.message);
					} else T.error(e instanceof r ? e.message : "Failed to save settings.");
				} finally {
					P.value = !1;
				}
			}
		}
		return fe(() => (ft(), Tt())), (e, t) => (_(), f("section", he, [
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
			it.value ? (_(), f("div", ge, [h(re, {
				variant: "text",
				lines: 6
			})])) : N.value ? (_(), u(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: N.value
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Tt
				}, {
					default: S(() => [...t[3] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f(c, { key: 2 }, [
				Qe.value ? (_(), f("div", _e, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : d("", !0),
				p("div", ve, [h(oe, {
					modelValue: M.value,
					"onUpdate:modelValue": t[0] ||= (e) => M.value = e,
					tabs: j.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), p("div", ye, [t[4] ||= p("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), h(te, {
					"model-value": x(E).advancedMode,
					"onUpdate:modelValue": t[1] ||= (e) => x(E).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				lt.value ? (_(), f("div", be, [p("span", null, " Saved changes to " + b(dt.value.join(", ")) + " require a server restart to take effect. ", 1), p("span", xe, [p("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: F.value,
					onClick: Vt
				}, b(F.value ? "Restarting…" : "Restart server"), 9, Se), p("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: F.value,
					onClick: ht
				}, " Dismiss ", 8, Ce)])])) : d("", !0),
				p("div", we, [ot.value.length === 0 ? (_(), f("p", Te, " No settings in this group. ")) : (_(), f("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: me(Ht, ["prevent"])
				}, [(_(!0), f(c, null, pe(ot.value, (e) => (_(), f("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					G(e) === "bool" ? (_(), f(c, { key: 0 }, [p("div", Ee, [
						h(te, {
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
						U(e) ? (_(), u(o, {
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
						})) : d("", !0)
					]), Z(e) ? (_(), u(s, {
						key: 0,
						text: Y(e) ?? "",
						links: X(e)
					}, null, 8, ["text", "links"])) : d("", !0)], 64)) : G(e) === "int" || G(e) === "float" ? (_(), f(c, { key: 1 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							U(e) ? (_(), u(o, {
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
							})) : d("", !0)
						], 8, De),
						p("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "number",
							value: z[e],
							min: kt(e).min,
							max: kt(e).max,
							step: G(e) === "float" ? "any" : void 0,
							placeholder: kt(e).min === void 0 ? void 0 : `min: ${kt(e).min}`,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, Oe),
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0)
					], 64)) : Et(e) ? (_(), f(c, { key: 2 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							U(e) ? (_(), u(o, {
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
							})) : d("", !0)
						], 8, ke),
						h(ne, {
							"model-value": z[e] ?? "",
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
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0),
						Ot(e).length ? (_(), f("dl", Ae, [(_(!0), f(c, null, pe(Ot(e), (e) => (_(), f(c, { key: e.value }, [p("dt", je, b(e.label), 1), p("dd", Me, b(e.help), 1)], 64))), 128))])) : d("", !0)
					], 64)) : gt(e) ? (_(), f(c, { key: 3 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							U(e) ? (_(), u(o, {
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
							})) : d("", !0)
						], 8, Ne),
						p("textarea", {
							id: `field-${e}`,
							class: de(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": V[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: z[e],
							"aria-invalid": V[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Mt(e, t.target.value)
						}, null, 42, Pe),
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0),
						V[e] ? (_(), f("span", Fe, b(V[e]), 1)) : d("", !0)
					], 64)) : A.value[e]?.secret ? (_(), f(c, { key: 4 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							U(e) ? (_(), u(o, {
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
							})) : d("", !0)
						], 8, Ie),
						p("p", {
							id: bt(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (_(), f(c, { key: 0 }, [h(o, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...t[15] ||= [m("Will be removed", -1)]]),
							_: 1
						}), t[16] ||= p("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : W(e) === null ? (_(), f("span", Re, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : vt(e) ? (_(), f(c, { key: 2 }, [h(o, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...t[17] ||= [m("Configured", -1)]]),
							_: 1
						}), p("span", ze, " A value is stored (" + b(yt(e)) + " " + b(yt(e) === 1 ? "character" : "characters") + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (_(), f(c, { key: 3 }, [h(o, {
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
								type: L[e] ? "text" : "password",
								autocomplete: "new-password",
								"data-lpignore": "true",
								"data-1p-ignore": "",
								"data-bwignore": "",
								"data-form-type": "other",
								"aria-describedby": bt(e),
								placeholder: $(e) ? "Will be removed on save" : vt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: z[e],
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, Ve),
							Ft(e) ? (_(), u(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": L[e] ? "eye-off" : "eye",
								"aria-label": L[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => Pt(e)
							}, {
								default: S(() => [m(b(L[e] ? "Hide" : "Show"), 1)]),
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
								onClick: (t) => Rt(e)
							}, {
								default: S(() => [...t[20] ||= [m(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : It(e) ? (_(), u(a, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => Lt(e)
							}, {
								default: S(() => [...t[21] ||= [m(" Remove ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : d("", !0)
						]),
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0)
					], 64)) : (_(), f(c, { key: 5 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							U(e) ? (_(), u(o, {
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
							})) : d("", !0)
						], 8, He),
						p("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "text",
							autocomplete: "off",
							value: z[e],
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, Ue),
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0)
					], 64)),
					ct(e) ? (_(), f("span", We, " Requires a server restart to take effect ")) : d("", !0),
					I.value[e] ? (_(), f("span", Ge, b(I.value[e]), 1)) : d("", !0)
				]))), 128)), p("div", Ke, [h(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !at.value,
					loading: P.value,
					onClick: Ht
				}, {
					default: S(() => [...t[24] ||= [m(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-233b5918"]]);
//#endregion
export { C as default };

//# sourceMappingURL=SettingsPage--CHJNu-2.js.map