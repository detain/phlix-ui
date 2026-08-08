import { n as e } from "./Icon-CkTBN_k5.js";
import { o as t } from "./plural-DMM7pLFA.js";
import { l as n, p as r, t as i, u as ee } from "./client-COHWZ2KC.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Badge-D1_MN41Y.js";
import { t as ne } from "./Switch-H74PI5Oy.js";
import { t as re } from "./Select-BpIGfT2P.js";
import { t as ie } from "./Skeleton-C3OpJbf1.js";
import { t as ae } from "./EmptyState-CwWtkhEJ.js";
import { t as oe } from "./PageHint-3dL7qb5N.js";
import { t as se } from "./Tabs-CCN6j5WY.js";
import { t as s } from "./HelpText-B8uA160R.js";
import { n as ce, t as le } from "./useSettingsPrefs-CEFxTJFG.js";
import { t as ue } from "./helpLinks-ya0IGJSe.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as de, normalizeClass as fe, onMounted as pe, openBlock as _, reactive as v, ref as y, renderList as me, toDisplayString as b, unref as x, withCtx as S, withModifiers as he } from "vue";
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var ge = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, _e = {
	key: 0,
	class: "admin-settings__skel"
}, ve = {
	key: 0,
	class: "settings-meta-notice",
	role: "status"
}, ye = { class: "admin-settings__header-row" }, be = { class: "settings-advanced-toggle" }, xe = {
	key: 1,
	class: "settings-restart-banner",
	role: "alert"
}, Se = { class: "settings-restart-banner__actions" }, Ce = ["disabled"], we = ["disabled"], Te = { class: "admin-settings__panel" }, Ee = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, De = { class: "admin-settings__row" }, Oe = ["for"], ke = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"disabled",
	"onInput"
], Ae = ["for"], je = {
	key: 1,
	class: "admin-settings__option-help"
}, Me = { class: "admin-settings__option-help-term" }, Ne = { class: "admin-settings__option-help-desc" }, Pe = ["for"], Fe = [
	"id",
	"value",
	"aria-invalid",
	"disabled",
	"onInput"
], Ie = {
	key: 1,
	class: "admin-settings__error",
	role: "alert"
}, Le = ["for"], Re = ["id"], ze = {
	key: 1,
	class: "admin-settings__secret-hint"
}, Be = { class: "admin-settings__secret-hint" }, Ve = { class: "admin-settings__row" }, He = [
	"id",
	"type",
	"aria-describedby",
	"placeholder",
	"value",
	"disabled",
	"onInput"
], Ue = ["for"], We = [
	"id",
	"value",
	"disabled",
	"onInput"
], Ge = {
	key: 6,
	class: "field-restart-note"
}, Ke = {
	key: 7,
	class: "admin-settings__error",
	role: "alert"
}, qe = { class: "admin-settings__actions" }, Je = "other", Ye = "phlix-restart-pending", C = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsPage",
	props: {
		client: { default: void 0 },
		restartPollIntervalMs: { default: 1e3 },
		restartPollTimeoutMs: { default: 6e4 }
	},
	setup(e) {
		let g = e, C = de("apiBase", ""), Xe = l(() => typeof C == "string" ? C : C?.value ?? ""), Ze = g.client ?? new i({
			baseUrl: Xe.value,
			tokenStore: new n()
		}), w = new ce(Ze), T = te(), E = le(), Qe = y({}), $e = y([]), D = y({}), O = y({}), k = y({}), et = l(() => Object.keys(k.value).length === 0 && Object.keys(D.value).length > 0);
		function tt(e) {
			return e.split(".").pop()?.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase()) ?? e;
		}
		function nt(e) {
			return e.replace(/[_-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function rt(e) {
			return e.replace(/[._-]+/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function it(e) {
			return {
				label: rt(e),
				helpText: "",
				helpLinks: [],
				tier: "standard",
				group: Je,
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
			if (!et.value) return k.value;
			let e = {};
			for (let t of Object.keys(D.value)) e[t] = it(t);
			return e;
		}), j = l(() => {
			let e = new Set(Object.values(A.value).map((e) => e.group));
			return Array.from(e).sort().map((e) => ({
				value: e,
				label: at(e),
				muted: !E.advancedMode && Mt(e)
			}));
		});
		function at(e) {
			for (let t of Object.values(A.value)) if (t.group === e && typeof t.groupLabel == "string" && t.groupLabel !== "") return t.groupLabel;
			return nt(e);
		}
		let M = y(""), ot = y(!0), N = y(null), P = y(!1), F = y(!1), I = y({}), L = v({}), R = v({}), z = v({}), B = v({}), V = v({}), st = l(() => Object.values(B).some(Boolean) || Object.values(R).some(Boolean)), ct = l(() => Object.entries(A.value).filter(([, e]) => e.group === M.value).map(([e]) => e)), lt = l(() => Object.entries(A.value).filter(([, e]) => e.restart === !0).map(([e]) => e));
		function ut(e) {
			return A.value[e]?.restart === !0;
		}
		let H = y([]), dt = l(() => H.value.length > 0), ft = l(() => `${Ye}:${Xe.value || "default"}`), pt = l(() => H.value.map((e) => J(e)));
		function mt() {
			if (!(typeof localStorage > "u")) try {
				let e = localStorage.getItem(ft.value);
				if (!e) return;
				let t = JSON.parse(e);
				Array.isArray(t) && (H.value = t.filter((e) => typeof e == "string"));
			} catch {}
		}
		function ht() {
			if (!(typeof localStorage > "u")) try {
				H.value.length === 0 ? localStorage.removeItem(ft.value) : localStorage.setItem(ft.value, JSON.stringify(H.value));
			} catch {}
		}
		function gt(e) {
			let t = /* @__PURE__ */ new Set([...H.value, ...e]);
			H.value = Array.from(t), ht();
		}
		function _t() {
			H.value = [], ht();
		}
		function U(e) {
			return $e.value.includes(e);
		}
		function vt(e) {
			return G(e) === "json";
		}
		function yt(e) {
			return A.value[e]?.secret === !0;
		}
		function W(e) {
			return O.value[e] ?? null;
		}
		function bt(e) {
			return W(e)?.set === !0;
		}
		function xt(e) {
			let t = W(e);
			return t?.set === !0 ? t.length : 0;
		}
		function St(e) {
			return `secret-status-${e}`;
		}
		function Ct(e, t) {
			if (yt(e)) return "";
			if (vt(e) || typeof t == "object" && t) try {
				return JSON.stringify(t ?? null, null, 2);
			} catch {
				return "";
			}
			return String(t ?? "");
		}
		function wt(e) {
			for (let e of Object.keys(z)) delete z[e];
			for (let e of Object.keys(V)) delete V[e];
			for (let [t, n] of Object.entries(e)) z[t] = Ct(t, n);
		}
		function Tt() {
			for (let e of Object.keys(B)) delete B[e];
			for (let e of Object.keys(L)) delete L[e];
			for (let e of Object.keys(R)) delete R[e];
		}
		function Et(e) {
			Qe.value = e.settings, $e.value = e.overridden, e.secretStatus && (O.value = e.secretStatus), wt(e.settings), Tt();
		}
		async function Dt() {
			ot.value = !0, N.value = null;
			try {
				let e = await w.get();
				D.value = e.types, k.value = e.meta, Et(e), I.value = {}, (!M.value || !j.value.some((e) => e.value === M.value)) && j.value.length > 0 && (M.value = j.value[0].value);
			} catch (e) {
				N.value = r(e, "Failed to load settings."), T.error(N.value);
			} finally {
				ot.value = !1;
			}
		}
		function G(e) {
			return D.value[e] ?? "string";
		}
		function Ot(e) {
			let t = A.value[e];
			return t != null && Array.isArray(t.enum) && t.enum.length > 0;
		}
		function kt(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum)) return [];
			let n = t.enumLabels;
			return t.enum.map((e) => ({
				value: e,
				label: n?.[e] ?? (e === "" ? "Auto" : e)
			}));
		}
		function At(e) {
			let t = A.value[e];
			if (!t || !Array.isArray(t.enum) || !t.optionHelp) return [];
			let n = t.optionHelp;
			return t.enum.filter((e) => typeof n[e] == "string" && n[e] !== "").map((e) => ({
				value: e,
				label: t.enumLabels?.[e] ?? (e === "" ? "Auto" : e),
				help: n[e]
			}));
		}
		function jt(e) {
			let t = A.value[e];
			return t ? {
				min: typeof t.minimum == "number" ? t.minimum : void 0,
				max: typeof t.maximum == "number" ? t.maximum : void 0
			} : {};
		}
		function K(e) {
			return A.value[e]?.tier === "advanced";
		}
		function Mt(e) {
			let t = Object.keys(A.value).filter((t) => A.value[t]?.group === e);
			return t.length > 0 && t.every((e) => K(e));
		}
		function q(e) {
			return K(e) && !E.advancedMode;
		}
		function J(e) {
			return A.value[e]?.label || tt(e);
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
			z[e] = t, B[e] = t !== Ct(e, Qe.value[e]);
		}
		function Nt(e) {
			try {
				return JSON.stringify(Qe.value[e] ?? null);
			} catch {
				return "";
			}
		}
		function Pt(e, t) {
			z[e] = t;
			try {
				let n = JSON.parse(t);
				delete V[e], B[e] = JSON.stringify(n) !== Nt(e);
			} catch (t) {
				V[e] = `Invalid JSON: ${t instanceof Error ? t.message : "could not be parsed"}`, B[e] = !0;
			}
		}
		let Ft = l(() => Object.keys(V).filter((e) => B[e] && !q(e)));
		function It(e) {
			L[e] = !L[e];
		}
		function Lt(e) {
			return B[e] === !0 && !q(e) && !$(e);
		}
		function $(e) {
			return R[e] === !0;
		}
		function Rt(e) {
			return yt(e) && !q(e) && W(e)?.set !== !1;
		}
		function zt(e) {
			R[e] = !0, Q(e, ""), L[e] = !1;
		}
		function Bt(e) {
			delete R[e];
		}
		function Vt(e) {
			return new Promise((t) => setTimeout(t, e));
		}
		async function Ht() {
			let e = Date.now(), t = g.restartPollIntervalMs;
			for (; Date.now() - e < g.restartPollTimeoutMs;) {
				await Vt(t), t = Math.min(t + g.restartPollIntervalMs / 2, g.restartPollIntervalMs * 3);
				try {
					let e = await w.get();
					return D.value = e.types, k.value = e.meta, Et(e), I.value = {}, !0;
				} catch {}
			}
			return !1;
		}
		async function Ut() {
			if (!F.value) {
				F.value = !0;
				try {
					await w.restartServer(), T.success("Restart signal sent — waiting for the server to come back…"), await Ht() ? (_t(), T.success("Server is back online.")) : T.error(`The server did not respond within ${Math.round(g.restartPollTimeoutMs / 1e3)}s. It may still be starting — reload this page in a moment.`);
				} catch (e) {
					T.error(r(e, "Failed to restart server."));
				} finally {
					F.value = !1;
				}
			}
		}
		async function Wt() {
			if (!P.value) {
				if (Ft.value.length > 0) {
					let e = Ft.value.map(J).join(", ");
					T.error(`Fix the invalid JSON in ${e} before saving.`);
					return;
				}
				P.value = !0, I.value = {};
				try {
					let e = {};
					for (let [t, n] of Object.entries(B)) {
						if (!n || q(t)) continue;
						let r = D.value[t], i = z[t] ?? "";
						e[t] = r === "bool" ? i === "true" || i === "1" : r === "int" ? parseInt(i, 10) : r === "float" ? parseFloat(i) : r === "json" ? JSON.parse(i) : i;
					}
					for (let t of Object.keys(R)) !$(t) || q(t) || (e[t] = "");
					let t = await w.save(e);
					T.success("Settings saved."), Et(t);
					for (let [t, n] of Object.entries(e)) {
						if (!yt(t)) continue;
						let e = String(n ?? "");
						O.value = {
							...O.value,
							[t]: {
								set: e !== "",
								length: e.length
							}
						};
					}
					let n = Object.keys(e).filter((e) => lt.value.includes(e));
					n.length > 0 && gt(n);
				} catch (e) {
					if (e instanceof ee && e.status === 400) {
						let t = e.body;
						t?.errors && Object.keys(t.errors).length > 0 ? (I.value = t.errors, T.error("Please fix the validation errors.")) : T.error(e.message);
					} else T.error(e instanceof ee ? e.message : "Failed to save settings.");
				} finally {
					P.value = !1;
				}
			}
		}
		return pe(() => (mt(), Dt())), (e, n) => (_(), f("section", ge, [
			n[25] ||= p("header", { class: "admin-settings__head" }, [p("h1", {
				id: "settings-heading",
				class: "admin-settings__title"
			}, "Settings")], -1),
			h(oe, {
				links: x(ue).settings.links,
				details: x(ue).settings.details
			}, {
				default: S(() => [...n[2] ||= [
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
			ot.value ? (_(), f("div", _e, [h(ie, {
				variant: "text",
				lines: 6
			})])) : N.value ? (_(), u(ae, {
				key: 1,
				icon: "alert",
				title: "Couldn't load settings",
				description: N.value
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Dt
				}, {
					default: S(() => [...n[3] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f(c, { key: 2 }, [
				et.value ? (_(), f("div", ve, " This server did not send settings metadata, so help, grouping and Advanced tiers are unavailable. Every setting is listed below with a name derived from its key. Update the server to restore the full settings experience. ")) : d("", !0),
				p("div", ye, [h(se, {
					modelValue: M.value,
					"onUpdate:modelValue": n[0] ||= (e) => M.value = e,
					tabs: j.value,
					label: "Settings groups"
				}, null, 8, ["modelValue", "tabs"]), p("div", be, [n[4] ||= p("span", { class: "settings-advanced-toggle__label" }, "Advanced", -1), h(ne, {
					"model-value": x(E).advancedMode,
					"onUpdate:modelValue": n[1] ||= (e) => x(E).setAdvancedMode(e)
				}, null, 8, ["model-value"])])]),
				dt.value ? (_(), f("div", xe, [p("span", null, " Saved changes to " + b(pt.value.join(", ")) + " require a server restart to take effect. ", 1), p("span", Se, [p("button", {
					type: "button",
					class: "settings-restart-banner__btn",
					disabled: F.value,
					onClick: Ut
				}, b(F.value ? "Restarting…" : "Restart server"), 9, Ce), p("button", {
					type: "button",
					class: "settings-restart-banner__dismiss",
					disabled: F.value,
					onClick: _t
				}, " Dismiss ", 8, we)])])) : d("", !0),
				p("div", Te, [ct.value.length === 0 ? (_(), f("p", Ee, " No settings in this group. ")) : (_(), f("form", {
					key: 1,
					class: "admin-settings__form",
					onSubmit: he(Wt, ["prevent"])
				}, [(_(!0), f(c, null, me(ct.value, (e) => (_(), f("div", {
					key: e,
					class: "admin-settings__field"
				}, [
					G(e) === "bool" ? (_(), f(c, { key: 0 }, [p("div", De, [
						h(ne, {
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
							default: S(() => [...n[5] ||= [m("custom", -1)]]),
							_: 1
						})) : d("", !0),
						K(e) ? (_(), u(o, {
							key: 1,
							tone: "neutral",
							class: "field-advanced-badge"
						}, {
							default: S(() => [...n[6] ||= [m("Advanced", -1)]]),
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
								default: S(() => [...n[7] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...n[8] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0)
						], 8, Oe),
						p("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "number",
							value: z[e],
							min: jt(e).min,
							max: jt(e).max,
							step: G(e) === "float" ? "any" : void 0,
							placeholder: jt(e).min === void 0 ? void 0 : `min: ${jt(e).min}`,
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, ke),
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0)
					], 64)) : Ot(e) ? (_(), f(c, { key: 2 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							U(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: S(() => [...n[9] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...n[10] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0)
						], 8, Ae),
						h(re, {
							"model-value": z[e] ?? "",
							options: kt(e),
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
						At(e).length ? (_(), f("dl", je, [(_(!0), f(c, null, me(At(e), (e) => (_(), f(c, { key: e.value }, [p("dt", Me, b(e.label), 1), p("dd", Ne, b(e.help), 1)], 64))), 128))])) : d("", !0)
					], 64)) : vt(e) ? (_(), f(c, { key: 3 }, [
						p("label", {
							class: "admin-settings__label",
							for: `field-${e}`
						}, [
							m(b(J(e)) + " ", 1),
							U(e) ? (_(), u(o, {
								key: 0,
								tone: "accent"
							}, {
								default: S(() => [...n[11] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...n[12] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0)
						], 8, Pe),
						p("textarea", {
							id: `field-${e}`,
							class: fe(["admin-settings__input admin-settings__textarea", { "admin-settings__textarea--invalid": V[e] }]),
							rows: "6",
							spellcheck: "false",
							autocomplete: "off",
							value: z[e],
							"aria-invalid": V[e] ? "true" : void 0,
							disabled: q(e),
							onInput: (t) => Pt(e, t.target.value)
						}, null, 42, Fe),
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0),
						V[e] ? (_(), f("span", Ie, b(V[e]), 1)) : d("", !0)
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
								default: S(() => [...n[13] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...n[14] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0)
						], 8, Le),
						p("p", {
							id: St(e),
							class: "admin-settings__secret-status"
						}, [$(e) ? (_(), f(c, { key: 0 }, [h(o, {
							tone: "warning",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...n[15] ||= [m("Will be removed", -1)]]),
							_: 1
						}), n[16] ||= p("span", { class: "admin-settings__secret-hint" }, " The stored value will be deleted when you save. Undo to keep it. ", -1)], 64)) : W(e) === null ? (_(), f("span", ze, " This server did not report whether a value is stored. Type a new one to replace whatever is there; leave it blank to keep it. ")) : bt(e) ? (_(), f(c, { key: 2 }, [h(o, {
							tone: "accent",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...n[17] ||= [m("Configured", -1)]]),
							_: 1
						}), p("span", Be, " A value is stored (" + b(xt(e)) + " " + b(x(t)(xt(e), "character", "characters")) + "). It is never sent to your browser. Leave this blank to keep it, or type a new one to replace it. ", 1)], 64)) : (_(), f(c, { key: 3 }, [h(o, {
							tone: "neutral",
							class: "admin-settings__secret-badge"
						}, {
							default: S(() => [...n[18] ||= [m("Not set", -1)]]),
							_: 1
						}), n[19] ||= p("span", { class: "admin-settings__secret-hint" }, " No value is stored yet. ", -1)], 64))], 8, Re),
						p("div", Ve, [
							p("input", {
								id: `field-${e}`,
								class: "admin-settings__input",
								type: L[e] ? "text" : "password",
								autocomplete: "new-password",
								"data-lpignore": "true",
								"data-1p-ignore": "",
								"data-bwignore": "",
								"data-form-type": "other",
								"aria-describedby": St(e),
								placeholder: $(e) ? "Will be removed on save" : bt(e) ? "Leave blank to keep the stored value" : `Enter ${J(e)}`,
								value: z[e],
								disabled: q(e) || $(e),
								onInput: (t) => Q(e, t.target.value)
							}, null, 40, He),
							Lt(e) ? (_(), u(a, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"left-icon": L[e] ? "eye-off" : "eye",
								"aria-label": L[e] ? `Hide ${J(e)}` : `Show ${J(e)}`,
								onClick: (t) => It(e)
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
								onClick: (t) => Bt(e)
							}, {
								default: S(() => [...n[20] ||= [m(" Undo ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])) : Rt(e) ? (_(), u(a, {
								key: 2,
								variant: "ghost",
								size: "sm",
								"aria-label": `Remove the stored ${J(e)}`,
								onClick: (t) => zt(e)
							}, {
								default: S(() => [...n[21] ||= [m(" Remove ", -1)]]),
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
								default: S(() => [...n[22] ||= [m("custom", -1)]]),
								_: 1
							})) : d("", !0),
							K(e) ? (_(), u(o, {
								key: 1,
								tone: "neutral",
								class: "field-advanced-badge"
							}, {
								default: S(() => [...n[23] ||= [m("Advanced", -1)]]),
								_: 1
							})) : d("", !0)
						], 8, Ue),
						p("input", {
							id: `field-${e}`,
							class: "admin-settings__input",
							type: "text",
							autocomplete: "off",
							value: z[e],
							disabled: q(e),
							onInput: (t) => Q(e, t.target.value)
						}, null, 40, We),
						Z(e) ? (_(), u(s, {
							key: 0,
							text: Y(e) ?? "",
							links: X(e)
						}, null, 8, ["text", "links"])) : d("", !0)
					], 64)),
					ut(e) ? (_(), f("span", Ge, " Requires a server restart to take effect ")) : d("", !0),
					I.value[e] ? (_(), f("span", Ke, b(I.value[e]), 1)) : d("", !0)
				]))), 128)), p("div", qe, [h(a, {
					type: "button",
					variant: "solid",
					size: "sm",
					disabled: !st.value,
					loading: P.value,
					onClick: Wt
				}, {
					default: S(() => [...n[24] ||= [m(" Save settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])], 32))])
			], 64))
		]));
	}
}), [["__scopeId", "data-v-03275ca3"]]);
//#endregion
export { C as default };

//# sourceMappingURL=SettingsPage-BtS8xnUZ.js.map