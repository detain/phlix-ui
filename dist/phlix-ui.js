import { r as e } from "./AuthField-BsALi_RI.js";
import { a as t, c as n, d as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./Button-C4PyCjLX.js";
import { n as d, t as f } from "./useFocusTrap-BN86qgtj.js";
import { a as p, i as m, n as h, r as g, t as _ } from "./usePreferencesStore-BFFMWKZp.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as v } from "./useAuthStore-D139Ow7E.js";
import { a as y, i as b, n as te, r as ne, t as x } from "./media-query-DowsWq-z.js";
import { t as S } from "./Badge-D9Tdn6WP.js";
import { t as re } from "./Slider-f9S4ziJW.js";
import { t as ie } from "./Switch-R1pbcsd-.js";
import { n as ae, r as oe, t as se } from "./MediaRow-BAqF6Sqv.js";
import { t as ce } from "./Select-CmN-4YbZ.js";
import { a as le, i as ue, n as de, r as fe, t as pe } from "./FilterBar-CygG3KWY.js";
import { t as me } from "./Modal-DLVWGUN9.js";
import { t as C } from "./useToastStore-BDoKlU6N.js";
import { n as w, t as T } from "./EmptyState-BEMIpc2l.js";
import { n as he, t as ge } from "./SettingsForm-SYvhnJww.js";
import { t as _e } from "./MediaDetail-BYiRtjC7.js";
import { n as ve, t as ye } from "./logs-DadTfaTq.js";
import { t as be } from "./dashboard-BTCOCTHQ.js";
import { n as xe, r as Se, t as Ce } from "./users-C40iLgkq.js";
import { n as we, r as Te, t as Ee } from "./webhooks-BBTLnFKm.js";
import { t as De } from "./services-Czm8hsvH.js";
import { t as Oe } from "./integrations-DLAG9ISY.js";
import { t as ke } from "./backup-IdY_vzc2.js";
import { t as Ae } from "./cast-BvFcBEB6.js";
import { t as je } from "./dlnaServer-B5Sg4MkS.js";
import { t as Me } from "./remoteAccess-DVKRpKQ8.js";
import { t as Ne } from "./liveTv-Dbjt901v.js";
import { t as Pe } from "./collections-CH3HLdcd.js";
import { t as Fe } from "./history-ByCY8OYj.js";
import { t as Ie } from "./syncPlay-DPzJkgkK.js";
import { n as Le, t as Re } from "./libraries-CXAz_kXs.js";
import { t as ze } from "./settings-m4upFcmH.js";
import { A as Be, C as Ve, D as He, E as Ue, F as We, I as Ge, L as Ke, M as qe, N as Je, O as Ye, P as Xe, S as Ze, T as Qe, _ as $e, a as et, b as tt, c as nt, d as rt, f as it, g as at, h as ot, i as st, j as ct, k as lt, l as ut, m as dt, n as ft, o as pt, p as mt, r as ht, s as gt, t as _t, u as vt, v as yt, w as bt, x as xt, y as St } from "./Player-ayu012CK.js";
import { a as Ct, c as wt, d as Tt, f as Et, g as Dt, h as Ot, i as kt, l as At, m as jt, n as Mt, o as Nt, p as Pt, r as Ft, s as It, t as Lt, u as Rt } from "./captions-COgPp5bH.js";
import { t as zt } from "./LoginForm-BtV-4Cfa.js";
import { t as Bt } from "./SignupForm-DDNCsp5g.js";
import { Fragment as E, Teleport as D, Transition as O, TransitionGroup as Vt, computed as k, createApp as Ht, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineComponent as I, inject as Ut, normalizeClass as L, normalizeStyle as R, onBeforeUnmount as z, onMounted as B, onScopeDispose as Wt, openBlock as V, readonly as Gt, ref as H, renderList as U, renderSlot as W, resolveDynamicComponent as Kt, toDisplayString as G, unref as K, useId as q, vModelText as qt, watch as J, watchEffect as Jt, withCtx as Y, withDirectives as Yt, withKeys as Xt, withModifiers as X } from "vue";
import { createPinia as Zt, defineStore as Qt } from "pinia";
import { RouterLink as Z, RouterView as $t, createRouter as en, createWebHistory as tn, useRouter as nn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var rn = ["aria-labelledby"], an = {
	key: 0,
	class: "phlix-sheet__header"
}, on = ["id"], sn = { class: "phlix-sheet__body" }, cn = {
	key: 1,
	class: "phlix-sheet__footer"
}, ln = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "Sheet",
	props: {
		modelValue: { type: Boolean },
		title: {},
		side: { default: "right" },
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = H(n.modelValue);
		J(() => n.modelValue, (e) => i.value = e);
		let a = H(null), o = q();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return f(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (V(), A(D, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: Y(() => [e.modelValue ? (V(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: X(c, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? K(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (V(), M("header", an, [e.title ? (V(), M("h2", {
					key: 0,
					id: K(o),
					class: "phlix-sheet__title"
				}, G(e.title), 9, on)) : j("", !0), e.hideClose ? j("", !0) : (V(), A(d, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : j("", !0),
				N("div", sn, [W(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (V(), M("footer", cn, [W(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, rn)], 34)) : j("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), un = { class: "shell" }, dn = { class: "shell__bar" }, fn = { class: "shell__inner" }, pn = { class: "shell__brand" }, mn = {
	class: "shell__nav",
	"aria-label": "Primary"
}, hn = { class: "shell__actions" }, gn = { class: "shell__main" }, _n = {
	key: 0,
	class: "shell__footer"
}, vn = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = p(), r = H(!1);
		return (t, i) => (V(), M("div", un, [
			F(e, { enabled: K(n).atmosphere }, null, 8, ["enabled"]),
			N("header", dn, [N("div", fn, [
				N("div", pn, [W(t.$slots, "logo", {}, () => [i[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", mn, [W(t.$slots, "nav", {}, void 0, !0)]),
				i[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", hn, [W(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (V(), A(d, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: "Open navigation menu",
					variant: "ghost",
					onClick: i[0] ||= (e) => r.value = !0
				})) : j("", !0)
			])]),
			N("main", gn, [W(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (V(), M("footer", _n, [W(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(ln, {
				modelValue: r.value,
				"onUpdate:modelValue": i[2] ||= (e) => r.value = e,
				side: "left",
				title: "Menu"
			}, {
				default: Y(() => [N("nav", {
					class: "shell__drawer",
					onClick: i[1] ||= (e) => r.value = !1
				}, [W(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-007c323a"]]), yn = /* @__PURE__ */ I({
	__name: "ThemeToggle",
	setup(e) {
		let t = p(), n = [
			"nocturne",
			"daylight",
			"midnight"
		], r = {
			nocturne: "moon",
			daylight: "sun",
			midnight: "monitor"
		}, i = {
			nocturne: "Nocturne",
			daylight: "Daylight",
			midnight: "Midnight"
		}, a = k(() => n[(n.indexOf(t.theme) + 1) % n.length]), o = k(() => r[t.theme] ?? "moon"), s = k(() => `Theme: ${i[t.theme] ?? t.theme} (switch to ${i[a.value]})`);
		function c() {
			t.theme = a.value;
		}
		return (e, t) => (V(), A(d, {
			name: o.value,
			label: s.value,
			variant: "ghost",
			onClick: c
		}, null, 8, ["name", "label"]));
	}
}), bn = ["aria-label", "aria-expanded"], xn = {
	key: 0,
	class: "usermenu__avatar"
}, Sn = { class: "usermenu__head" }, Cn = { class: "usermenu__avatar usermenu__avatar--lg" }, wn = { class: "usermenu__name" }, Tn = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = v(), n = nn(), r = Ut("phlixConfig", null), i = k(() => r?.routerBase ?? "/app"), a = H(!1), o = H(null), s = H(null), c = k(() => t.user?.username || t.user?.name || t.user?.email || "Account"), l = k(() => c.value.charAt(0).toUpperCase() || "A");
		function d() {
			a.value = !1;
		}
		function p(e) {
			d(), n.push(e);
		}
		function m() {
			d(), t.logout(), n.push(`${i.value}/login`);
		}
		f(s, a, {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function h(e) {
			o.value && !o.value.contains(e.target) && d();
		}
		return J(a, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", h, !0) : document.removeEventListener("pointerdown", h, !0));
		}), z(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", h, !0);
		}), (e, n) => (V(), M("div", {
			ref_key: "rootEl",
			ref: o,
			class: "usermenu"
		}, [N("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": K(t).isLoggedIn ? `Account: ${c.value}` : "Account",
			"aria-haspopup": "menu",
			"aria-expanded": a.value,
			onClick: n[0] ||= (e) => a.value = !a.value
		}, [K(t).isLoggedIn ? (V(), M("span", xn, G(l.value), 1)) : (V(), A(u, {
			key: 1,
			name: "user"
		}))], 8, bn), a.value ? (V(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: s,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": "Account",
			tabindex: "-1"
		}, [K(t).isLoggedIn ? (V(), M(E, { key: 0 }, [
			N("div", Sn, [N("span", Cn, G(l.value), 1), N("span", wn, G(c.value), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: n[1] ||= (e) => p(`${i.value}/settings`)
			}, [F(u, { name: "settings" }), n[3] ||= P(" Settings ", -1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: m
			}, [F(u, { name: "log-out" }), n[4] ||= P(" Sign out ", -1)])
		], 64)) : (V(), M("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: n[2] ||= (e) => p(`${i.value}/login`)
		}, [F(u, { name: "user" }), n[5] ||= P(" Sign in ", -1)]))], 512)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-5da5ea3f"]]), En = { class: "phlix-kbd" }, Dn = {
	key: 1,
	class: "phlix-kbd__key"
}, On = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = k(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (V(), M("span", En, [n.value.length ? (V(!0), M(E, { key: 0 }, U(n.value, (e, t) => (V(), M("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, G(e), 1))), 128)) : (V(), M("kbd", Dn, [W(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), kn = "phlix.cmd.recents", An = 8;
function Q(e, t) {
	let n = e.toLowerCase(), r = t.toLowerCase();
	if (n.length === 0) return 0;
	if (n.length > r.length) return -1;
	let i = 0, a = 0, o = -2, s = 0;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], c = -1;
		for (let e = a; e < r.length; e++) if (r[e] === t) {
			c = e;
			break;
		}
		if (c === -1) return -1;
		i += 1, c === o + 1 ? (s++, i += 5 + s * 2) : s = 0;
		let l = c === 0 ? "" : r[c - 1];
		if ((c === 0 || l === " " || l === "-" || l === "/" || l === ":") && (i += 8), o >= 0) {
			let e = c - o - 1;
			e > 0 && (i -= Math.min(e, 4));
		}
		o = c, a = c + 1;
	}
	return r.startsWith(n) && (i += 15), i;
}
function jn(e, t) {
	if (!e.trim()) return 0;
	let n = Q(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, Q(e, n));
	return t.group && (r = Math.max(r, Q(e, t.group))), r;
}
function Mn() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(kn);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, An) : [];
	} catch {
		return [];
	}
}
var Nn = Qt("phlix-commands", () => {
	let e = H(/* @__PURE__ */ new Map()), t = H(!1), n = H(""), r = H(Mn()), i = k(() => Array.from(e.value.values())), a = k(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: jn(t, e)
		})).filter((e) => e.s >= 0).sort((e, t) => t.s - e.s || (e.c.priority ?? 0) - (t.c.priority ?? 0) || e.c.title.localeCompare(t.c.title)).map((e) => e.c);
		let o = r.value.map((t) => e.value.get(t)).filter((e) => !!e), s = new Set(o.map((e) => e.id)), c = a.filter((e) => !s.has(e.id)).sort((e, t) => (e.priority ?? 0) - (t.priority ?? 0) || e.title.localeCompare(t.title));
		return [...o, ...c];
	});
	function o(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.set(e.id, e);
		return e.value = r, () => s(n.map((e) => e.id));
	}
	function s(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.delete(e);
		e.value = r;
	}
	function c(e) {
		return r.value.includes(e);
	}
	function l(e) {
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, An);
	}
	function u() {
		r.value = [];
	}
	function d(e) {
		n.value = e;
	}
	function f() {
		n.value = "", t.value = !0;
	}
	function p() {
		t.value = !1;
	}
	function m() {
		t.value ? p() : f();
	}
	async function h(t) {
		let n = e.value.get(t);
		n && (l(t), p(), await n.run());
	}
	return J(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(kn, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		registry: e,
		open: t,
		query: n,
		recentIds: r,
		all: i,
		results: a,
		register: o,
		unregister: s,
		isRecent: c,
		pushRecent: l,
		clearRecents: u,
		setQuery: d,
		openPalette: f,
		closePalette: p,
		togglePalette: m,
		runId: h
	};
}), Pn = { class: "phlix-cmdk__search" }, Fn = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], In = ["id"], Ln = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, Rn = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], zn = { class: "phlix-cmdk__option-body" }, Bn = { class: "phlix-cmdk__option-title" }, Vn = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, Hn = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, Un = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "CommandPalette",
	setup(e) {
		let t = Nn(), n = nn(), r = p(), i = H(null), a = q(), o = H(0);
		function s(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => t.runId(e.id)
			};
		}
		function c(e) {
			return {
				id: "__search",
				title: `Search library for “${e}”`,
				icon: "search",
				run: () => {
					t.closePalette(), n.push({
						name: "browse",
						query: { search: e }
					});
				}
			};
		}
		let l = k(() => {
			let e = [], n = [], r = (t) => {
				e.push({
					kind: "option",
					item: t,
					index: n.length
				}), n.push(t);
			}, i = t.query.trim();
			if (i) {
				for (let e of t.results) r(s(e));
				return r(c(i)), {
					rows: e,
					options: n
				};
			}
			let a = t.results.filter((e) => t.isRecent(e.id));
			a.length && (e.push({
				kind: "header",
				label: "Recent"
			}), a.forEach((e) => r(s(e))));
			let o = /* @__PURE__ */ new Map();
			for (let e of t.results) {
				if (t.isRecent(e.id)) continue;
				let n = e.group ?? "Commands", r = o.get(n);
				r ? r.push(e) : o.set(n, [e]);
			}
			for (let [t, n] of o) e.push({
				kind: "header",
				label: t
			}), n.forEach((e) => r(s(e)));
			return {
				rows: e,
				options: n
			};
		}), d = k(() => l.value.options.length), m = k(() => d.value ? `${a}-opt-${o.value}` : void 0);
		J(() => t.query, () => {
			o.value = 0;
		}), J(d, (e) => {
			o.value > e - 1 && (o.value = Math.max(0, e - 1));
		}), J(() => t.open, (e) => {
			e && (o.value = 0);
		});
		function h() {
			typeof document > "u" || document.getElementById(`${a}-opt-${o.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function g(e) {
			let t = d.value;
			t && (o.value = (o.value + e + t) % t, h());
		}
		function _() {
			let e = l.value.options[o.value];
			e && e.run();
		}
		function ee(e) {
			e.run();
		}
		function v(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), g(1);
					break;
				case "ArrowUp":
					e.preventDefault(), g(-1);
					break;
				case "Home":
					e.preventDefault(), o.value = 0, h();
					break;
				case "End":
					e.preventDefault(), o.value = Math.max(0, d.value - 1), h();
					break;
				case "Enter":
					e.preventDefault(), _();
					break;
			}
		}
		function y() {
			t.closePalette();
		}
		f(i, k(() => t.open), { onEscape: () => (t.closePalette(), !0) });
		function b(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), t.togglePalette());
		}
		let te = Ut("phlixCommands", []), ne = [
			{
				id: "nav.browse",
				title: "Go to Browse",
				icon: "film",
				group: "Navigation",
				keywords: [
					"home",
					"library",
					"media"
				],
				priority: 0,
				run: () => {
					n.push({ name: "browse" });
				}
			},
			{
				id: "nav.settings",
				title: "Go to Settings",
				icon: "settings",
				group: "Navigation",
				keywords: [
					"preferences",
					"config",
					"options"
				],
				priority: 1,
				run: () => {
					n.push({ name: "settings" });
				}
			},
			{
				id: "theme.nocturne",
				title: "Theme: Nocturne",
				icon: "moon",
				group: "Theme",
				keywords: [
					"dark",
					"amber",
					"cinema"
				],
				run: () => {
					r.theme = "nocturne";
				}
			},
			{
				id: "theme.daylight",
				title: "Theme: Daylight",
				icon: "sun",
				group: "Theme",
				keywords: ["light", "bright"],
				run: () => {
					r.theme = "daylight";
				}
			},
			{
				id: "theme.midnight",
				title: "Theme: Midnight",
				icon: "monitor",
				group: "Theme",
				keywords: [
					"oled",
					"black",
					"contrast"
				],
				run: () => {
					r.theme = "midnight";
				}
			},
			{
				id: "pref.density",
				title: "Toggle density",
				icon: "list",
				group: "Preferences",
				keywords: [
					"compact",
					"comfortable",
					"spacing"
				],
				run: () => {
					r.density = r.density === "compact" ? "comfortable" : "compact";
				}
			},
			{
				id: "pref.motion",
				title: "Toggle reduced motion",
				icon: "speed",
				group: "Preferences",
				keywords: [
					"animation",
					"accessibility",
					"a11y"
				],
				run: () => {
					r.reducedMotion = r.reducedMotion === "off" ? "auto" : "off";
				}
			},
			{
				id: "pref.atmosphere",
				title: "Toggle atmosphere",
				icon: "star",
				group: "Preferences",
				keywords: [
					"grain",
					"vignette",
					"glow",
					"ambient"
				],
				run: () => {
					r.atmosphere = !r.atmosphere;
				}
			},
			{
				id: "pref.reset",
				title: "Reset preferences",
				icon: "rewind",
				group: "Preferences",
				keywords: [
					"default",
					"clear",
					"restore"
				],
				run: () => r.reset()
			}
		], x = null;
		return B(() => {
			x = t.register([...ne, ...te]), document.addEventListener("keydown", b);
		}), z(() => {
			x?.(), document.removeEventListener("keydown", b);
		}), (e, n) => (V(), A(D, { to: "body" }, [F(O, { name: "phlix-cmdk" }, {
			default: Y(() => [K(t).open ? (V(), M("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: X(y, ["self"])
			}, [N("div", {
				ref_key: "panelEl",
				ref: i,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [N("div", Pn, [
				F(u, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				N("input", {
					value: K(t).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": K(a),
					"aria-activedescendant": m.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: n[0] ||= (e) => K(t).setQuery(e.target.value),
					onKeydown: v
				}, null, 40, Fn),
				F(On, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), N("ul", {
				id: K(a),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(V(!0), M(E, null, U(l.value.rows, (e, t) => (V(), M(E, { key: e.kind === "header" ? `h-${e.label}-${t}` : e.item.id }, [e.kind === "header" ? (V(), M("li", Ln, G(e.label), 1)) : (V(), M("li", {
				key: 1,
				id: `${K(a)}-opt-${e.index}`,
				class: L(["phlix-cmdk__option", { "is-active": e.index === o.value }]),
				role: "option",
				"aria-selected": e.index === o.value,
				onClick: (t) => ee(e.item),
				onPointermove: (t) => o.value = e.index
			}, [
				F(u, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				N("span", zn, [N("span", Bn, G(e.item.title), 1), e.item.subtitle ? (V(), M("span", Vn, G(e.item.subtitle), 1)) : j("", !0)]),
				e.item.shortcut ? (V(), A(On, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : j("", !0)
			], 42, Rn))], 64))), 128)), d.value ? j("", !0) : (V(), M("li", Hn, " No matching commands "))], 8, In)], 512)], 32)) : j("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]), Wn = {
	key: 0,
	class: "mini",
	role: "region",
	"aria-label": "Mini player"
}, Gn = ["src", "poster"], Kn = { class: "mini__body" }, qn = { class: "mini__title" }, Jn = { class: "mini__controls" }, Yn = ["aria-label"], Xn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Zn = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let n = t, r = y(), i = H(null), a = k(() => r.miniPlayer && !!r.current && !!r.streamUrl), o = k(() => r.current?.name ?? ""), s = k(() => Math.max(0, Math.min(1, r.progress)));
		function c() {
			let e = i.value;
			e && (e.volume = r.volume, e.muted = r.muted, e.playbackRate = r.rate, r.position > 0 && (!e.duration || r.position < e.duration) && (e.currentTime = r.position), r.playing && e.play()?.catch(() => {}));
		}
		function l() {
			r.play();
		}
		function d() {
			r.pause();
		}
		function f() {
			let e = i.value;
			e && r.updateProgress(e.currentTime, e.duration);
		}
		function p() {
			let e = i.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function m() {
			r.current && n("expand", r.current.id);
		}
		function h() {
			r.closePlayer();
		}
		return J(() => r.playing, (e) => {
			let t = i.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), z(() => {
			i.value?.pause?.();
		}), (e, t) => (V(), A(O, { name: "mini" }, {
			default: Y(() => [a.value ? (V(), M("div", Wn, [
				N("video", {
					ref_key: "videoRef",
					ref: i,
					class: "mini__video",
					src: K(r).streamUrl,
					poster: K(r).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: c,
					onPlay: l,
					onPause: d,
					onTimeupdate: f,
					onClick: m
				}, null, 40, Gn),
				N("div", Kn, [N("p", qn, G(o.value), 1), N("div", Jn, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": K(r).playing ? "Pause" : "Play",
						onClick: p
					}, [F(u, { name: K(r).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Yn),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": "Expand to full player",
						onClick: m
					}, [F(u, { name: "expand" })]),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": "Close player",
						onClick: h
					}, [F(u, { name: "x" })])
				])]),
				N("div", Xn, [N("div", {
					class: "mini__progress-fill",
					style: R({ transform: `scaleX(${s.value})` })
				}, null, 4)])
			])) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c013af7d"]]);
//#endregion
//#region src/composables/color.ts
function Qn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var $ = (e) => Math.max(0, Math.min(255, Math.round(e))), $n = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => $(e).toString(16).padStart(2, "0")).join("");
function er(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function tr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var nr = ({ r: e, g: t, b: n }, r) => `rgba(${$(e)}, ${$(t)}, ${$(n)}, ${r})`;
function rr({ r: e, g: t, b: n }) {
	let r = [
		e,
		t,
		n
	].map((e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * r[0] + .7152 * r[1] + .0722 * r[2];
}
function ir(e) {
	let t = Qn(e);
	if (!t) return null;
	let n = rr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": $n(t),
		"--accent-hover": $n(er(t, .12)),
		"--accent-active": $n(tr(t, .12)),
		"--accent-soft": nr(t, .14),
		"--accent-ring": nr(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var ar = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function or(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? ir(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of ar) n.style.removeProperty(e);
}
function sr(e) {
	let t = m();
	e && !g() && (t.theme = e), or(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function cr() {
	let e = p();
	return Jt(() => {
		or({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var lr = ["src", "alt"], ur = { class: "brand-wordmark" }, dr = {
	key: 1,
	class: "brand-tagline"
}, fr = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		cr();
		let t = Nn(), n = nn();
		function r(e) {
			n.push(`${c.value}/player/${e}`);
		}
		let i = Ut("phlixConfig", null), a = k(() => i?.branding ?? {}), o = k(() => a.value.wordmark ?? "Phlix"), s = k(() => i?.menu ?? []), c = k(() => i?.routerBase ?? "/app");
		function l(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, n) => (V(), A(vn, null, {
			logo: Y(() => [F(K(Z), {
				to: c.value,
				class: "brand"
			}, {
				default: Y(() => [
					a.value.logoSrc ? (V(), M("img", {
						key: 0,
						src: a.value.logoSrc,
						alt: a.value.logoAlt ?? o.value,
						class: "brand-logo"
					}, null, 8, lr)) : j("", !0),
					N("span", ur, [P(G(o.value), 1), n[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					a.value.tagline ? (V(), M("span", dr, G(a.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Y(() => [s.value.length ? (V(!0), M(E, { key: 0 }, U(s.value, (e) => (V(), A(Kt(e.href ? "a" : K(Z)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? l(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Y(() => [e.icon ? (V(), A(u, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : j("", !0), P(" " + G(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (V(), M(E, { key: 1 }, [F(K(Z), {
				to: c.value,
				class: "nav-link"
			}, {
				default: Y(() => [...n[2] ||= [P("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), F(K(Z), {
				to: `${c.value}/settings`,
				class: "nav-link"
			}, {
				default: Y(() => [...n[3] ||= [P("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: Y(() => [
				F(d, {
					name: "search",
					label: "Open command palette (⌘K)",
					variant: "ghost",
					onClick: n[0] ||= (e) => K(t).openPalette()
				}),
				F(yn),
				F(Tn)
			]),
			default: Y(() => [
				F(K($t)),
				F(Un),
				F(Zn, { onExpand: r })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-b48c595d"]]), pr = { class: "phlix-placeholder" }, mr = { class: "placeholder-content" }, hr = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (V(), M("div", pr, [N("div", mr, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + G(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function gr() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function _r(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-h2-cvMDu.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-CdmLOmmN.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-BhQ_sl-K.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			component: () => import("./LoginPage-CXBM4wEq.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: () => import("./SignupPage-CAJW162m.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: () => import("./SettingsPage-DbTAhPQp.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: hr,
		props: { appName: e.app }
	}), n;
}
function vr(e) {
	let t = {
		...gr(),
		...e
	};
	sr(t.defaultTheme);
	let n = Zt();
	t.defaultTheme && !g() && (p(n).theme = t.defaultTheme);
	let r = en({
		history: tn(t.routerBase || "/app"),
		routes: _r(t)
	}), i = Ht(fr);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var yr = ["id"], br = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "Tooltip",
	props: {
		text: {},
		placement: { default: "top" },
		delay: { default: 300 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = q(), r = H(!1), i = H(null), a;
		function o() {
			return i.value?.firstElementChild ?? null;
		}
		function s() {
			t.disabled || (clearTimeout(a), a = setTimeout(() => {
				r.value = !0, o()?.setAttribute("aria-describedby", n);
			}, t.delay));
		}
		function c() {
			clearTimeout(a), r.value = !1, o()?.removeAttribute("aria-describedby");
		}
		return z(() => clearTimeout(a)), (t, a) => (V(), M("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: Xt(c, ["esc"])
		}, [W(t.$slots, "default", {}, void 0, !0), F(O, { name: "phlix-tooltip" }, {
			default: Y(() => [r.value && (e.text || t.$slots.content) ? (V(), M("span", {
				key: 0,
				id: K(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [W(t.$slots, "content", {}, () => [P(G(e.text), 1)], !0)], 10, yr)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), xr = ["role"], Sr = { class: "phlix-toast__content" }, Cr = {
	key: 0,
	class: "phlix-toast__title"
}, wr = { class: "phlix-toast__message" }, Tr = ["onClick"], Er = 0, Dr = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let t = C(), n = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, r = (e) => e.icon ?? n[e.tone];
		return B(() => {
			Er++;
		}), z(() => {
			Er--;
		}), (n, i) => (V(), A(D, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [F(Vt, { name: "phlix-toast" }, {
			default: Y(() => [(V(!0), M(E, null, U(K(t).toasts, (e) => (V(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(u, {
					name: r(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", Sr, [e.title ? (V(), M("p", Cr, G(e.title), 1)) : j("", !0), N("p", wr, G(e.message), 1)]),
				e.action ? (V(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (n) => {
						e.action.onClick(), K(t).dismiss(e.id);
					}
				}, G(e.action.label), 9, Tr)) : j("", !0),
				F(d, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (n) => K(t).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, xr))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), Or = ["aria-label"], kr = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = k(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (V(), M("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: R(n.value ? { fontSize: n.value } : void 0)
		}, [F(u, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Or));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Ar = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "Reveal",
	props: {
		tag: { default: "div" },
		delay: { default: 0 },
		y: { default: 12 },
		whenVisible: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = H(null), r = H(!1), i = H(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return B(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), z(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (V(), A(Kt(e.tag), {
			ref_key: "el",
			ref: n,
			class: L(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: R({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: Y(() => [W(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), jr = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (V(), A(O, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: Y(() => [W(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]);
//#endregion
//#region src/app/admin.ts
function Mr(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => import("./DashboardPage-BCq_H13v.js")
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => import("./UsersPage-DfbGTqA2.js")
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => import("./LogsPage-yEJfdLZs.js")
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => import("./WebhooksPage-DCWvQ0MW.js")
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => import("./ServicesPage-tN-w_Fgm.js")
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => import("./IntegrationsPage-BLKWEtPS.js")
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => import("./BackupPage-xJTJIuLr.js")
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => import("./CastDevicesPage-3xs0Gyh0.js")
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => import("./DlnaServerPage-DE1JUPR4.js")
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => import("./RemoteAccessPage-BLHFsAnW.js")
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => import("./LiveTvPage-CVCEHbTx.js")
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => import("./CollectionsPage-DDJxRjWd.js")
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => import("./HistoryPage-B1AVNz4b.js")
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => import("./SyncPlayPage-BlRp2Uh6.js")
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => import("./LibrariesPage-wgkIp0vG.js")
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => import("./SettingsPage-BqnBtAp9.js")
		}
	];
}
function Nr(e = "/app") {
	let t = `${e}/admin`;
	return [{
		id: "admin",
		label: "Admin",
		icon: "settings",
		children: [
			{
				id: "admin-dashboard",
				label: "Dashboard",
				icon: "speed",
				to: `${t}/dashboard`
			},
			{
				id: "admin-users",
				label: "Users",
				icon: "user",
				to: `${t}/users`
			},
			{
				id: "admin-logs",
				label: "Logs",
				icon: "list",
				to: `${t}/logs`
			},
			{
				id: "admin-webhooks",
				label: "Webhooks",
				icon: "settings",
				to: `${t}/webhooks`
			},
			{
				id: "admin-services",
				label: "Services",
				icon: "star",
				to: `${t}/services`
			},
			{
				id: "admin-integrations",
				label: "Integrations",
				icon: "settings",
				to: `${t}/integrations`
			},
			{
				id: "admin-backup",
				label: "Backup",
				icon: "bookmark",
				to: `${t}/backup`
			},
			{
				id: "admin-cast",
				label: "Cast Devices",
				icon: "cast",
				to: `${t}/cast-devices`
			},
			{
				id: "admin-dlna",
				label: "DLNA Server",
				icon: "monitor",
				to: `${t}/dlna`
			},
			{
				id: "admin-remote-access",
				label: "Remote Access",
				icon: "expand",
				to: `${t}/remote-access`
			},
			{
				id: "admin-livetv",
				label: "Live TV / DVR",
				icon: "tv",
				to: `${t}/livetv`
			},
			{
				id: "admin-collections",
				label: "Collections",
				icon: "list",
				to: `${t}/collections`
			},
			{
				id: "admin-history",
				label: "Watch History",
				icon: "film",
				to: `${t}/history`
			},
			{
				id: "admin-syncplay",
				label: "SyncPlay",
				icon: "play",
				to: `${t}/syncplay`
			},
			{
				id: "admin-libraries",
				label: "Libraries",
				icon: "image",
				to: `${t}/libraries`
			},
			{
				id: "admin-settings",
				label: "Settings",
				icon: "settings",
				to: `${t}/settings`
			}
		]
	}];
}
//#endregion
//#region src/pages/LibraryScanPage.vue?vue&type=script&setup=true&lang.ts
var Pr = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Fr = {
	key: 0,
	class: "library-scan__skel"
}, Ir = {
	key: 3,
	class: "library-scan__table-wrap"
}, Lr = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Rr = { class: "library-scan__name" }, zr = {
	key: 0,
	class: "library-scan__paths"
}, Br = { class: "library-scan__num" }, Vr = { class: "library-scan__date" }, Hr = ["data-testid"], Ur = {
	key: 0,
	class: "library-scan__error"
}, Wr = { class: "library-scan__actions" }, Gr = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, r = C(), i = H([]), a = H({}), o = H(!0), c = H(null);
		async function u() {
			o.value = !0, c.value = null;
			try {
				i.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of i.value) d(e.id);
			} catch (e) {
				c.value = n(e, "Failed to load libraries."), r.error(c.value);
			} finally {
				o.value = !1;
			}
		}
		async function d(e) {
			try {
				let n = await t.get(`/api/v1/libraries/${e}/scan-status`), r = n.scan_status ?? n.job ?? null;
				r && (a.value = {
					...a.value,
					[e]: r
				});
			} catch {}
		}
		async function f(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/scan`), r.success("Scan queued."), await d(e);
			} catch (e) {
				r.error(n(e, "Failed to trigger scan."));
			}
		}
		async function p(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), r.success("Rescan queued."), await d(e);
			} catch (e) {
				r.error(n(e, "Failed to trigger rescan."));
			}
		}
		function m(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function h(e) {
			return e?.status === "running" || e?.status === "queued";
		}
		function g(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function _(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		return B(u), (e, t) => (V(), M("section", Pr, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), o.value ? (V(), M("div", Fr, [F(w, {
			variant: "text",
			lines: 6
		})])) : c.value ? (V(), A(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: c.value
		}, {
			actions: Y(() => [F(l, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: u
			}, {
				default: Y(() => [...t[0] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (V(), A(T, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (V(), M("div", Ir, [N("table", Lr, [t[3] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Type"),
			N("th", { scope: "col" }, "Items"),
			N("th", { scope: "col" }, "Last scan"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(V(!0), M(E, null, U(i.value, (e) => (V(), M("tr", { key: e.id }, [
			N("td", null, [N("div", Rr, G(e.name), 1), e.paths.length ? (V(), M("div", zr, G(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, G(e.type), 1),
			N("td", Br, G(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", Vr, G(m(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(S, { tone: _(a.value[e.id]) }, {
				default: Y(() => [P(G(g(a.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), a.value[e.id]?.status === "failed" && a.value[e.id]?.error ? (V(), M("span", Ur, G(a.value[e.id]?.error), 1)) : j("", !0)], 8, Hr)]),
			N("td", null, [N("div", Wr, [F(l, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: h(a.value[e.id]),
				onClick: (t) => f(e.id)
			}, {
				default: Y(() => [...t[1] ||= [P(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), F(l, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: h(a.value[e.id]),
				onClick: (t) => p(e.id)
			}, {
				default: Y(() => [...t[2] ||= [P(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-3235ff5e"]]), Kr = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, qr = { class: "my-servers__head" }, Jr = {
	key: 0,
	class: "my-servers__skel"
}, Yr = {
	key: 3,
	class: "my-servers__table-wrap"
}, Xr = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Zr = { class: "my-servers__name" }, Qr = { class: "my-servers__url" }, $r = { class: "my-servers__num" }, ei = { class: "my-servers__date" }, ti = ["data-testid"], ni = { class: "my-servers__actions" }, ri = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, r = C(), i = H([]), a = H(!0), o = H(null);
		async function c() {
			a.value = !0, o.value = null;
			try {
				i.value = (await t.get("/api/v1/servers")).servers || [];
			} catch (e) {
				o.value = n(e, "Failed to load servers."), r.error(o.value);
			} finally {
				a.value = !1;
			}
		}
		function u(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function d(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function f(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		return B(c), (e, t) => (V(), M("section", Kr, [N("header", qr, [t[1] ||= N("div", null, [N("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(l, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: Y(() => [...t[0] ||= [P("Add server", -1)]]),
			_: 1
		})]), a.value ? (V(), M("div", Jr, [F(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), A(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: Y(() => [F(l, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: c
			}, {
				default: Y(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (V(), A(T, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: Y(() => [F(l, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: Y(() => [...t[3] ||= [P("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (V(), M("div", Yr, [N("table", Xr, [t[5] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Server"),
			N("th", { scope: "col" }, "Owner"),
			N("th", { scope: "col" }, "Libraries"),
			N("th", { scope: "col" }, "Last seen"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(V(!0), M(E, null, U(i.value, (e) => (V(), M("tr", { key: e.id }, [
			N("td", null, [N("div", Zr, G(e.name), 1), N("div", Qr, G(e.url), 1)]),
			N("td", null, G(e.owner), 1),
			N("td", $r, G(e.library_count === void 0 ? "—" : e.library_count), 1),
			N("td", ei, G(u(e.last_seen)), 1),
			N("td", null, [N("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [F(S, { tone: f(e.status) }, {
				default: Y(() => [P(G(d(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, ti)]),
			N("td", null, [N("div", ni, [F(l, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: Y(() => [...t[4] ||= [P("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8bce09a9"]]), ii = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, ai = {
	key: 0,
	class: "federation__skel"
}, oi = {
	key: 2,
	class: "federation__content"
}, si = {
	key: 1,
	class: "federation__table-wrap"
}, ci = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, li = { class: "federation__name" }, ui = { class: "federation__url" }, di = { class: "federation__num" }, fi = { class: "federation__date" }, pi = ["data-testid"], mi = { class: "federation__actions" }, hi = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, gi = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, r = C(), i = H([]), a = H(!0), o = H(null), c = H(""), u = H(!1);
		async function d(e = !1) {
			e && (a.value = !0), o.value = null;
			try {
				i.value = (await t.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				o.value = n(e, "Failed to load federation peers."), r.error(o.value);
			} finally {
				e && (a.value = !1);
			}
		}
		async function f() {
			let e = c.value.trim();
			if (e) {
				u.value = !0;
				try {
					await t.post("/api/v1/federation/connect", { url: e }), r.success("Peer connection requested."), c.value = "", await d();
				} catch (e) {
					r.error(n(e, "Failed to connect to peer."));
				} finally {
					u.value = !1;
				}
			}
		}
		async function p(e) {
			try {
				await t.post(`/api/v1/federation/peers/${e}/disconnect`), r.success("Peer disconnected."), await d();
			} catch (e) {
				r.error(n(e, "Failed to disconnect peer."));
			}
		}
		function m(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function h(e) {
			switch (e) {
				case "connected": return "Connected";
				case "disconnected": return "Disconnected";
				case "pending": return "Pending";
				default: return e;
			}
		}
		function g(e) {
			switch (e) {
				case "connected": return "success";
				case "disconnected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		return B(() => d(!0)), (e, t) => (V(), M("section", ii, [t[8] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), a.value ? (V(), M("div", ai, [F(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), A(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: o.value
		}, {
			actions: Y(() => [F(l, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => d(!0)
			}, {
				default: Y(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (V(), M("div", oi, [
			t[7] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			i.value.length === 0 ? (V(), A(T, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (V(), M("div", si, [N("table", ci, [t[4] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(V(!0), M(E, null, U(i.value, (e) => (V(), M("tr", { key: e.id }, [
				N("td", null, [N("div", li, G(e.name), 1), N("div", ui, G(e.url), 1)]),
				N("td", di, G(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", fi, G(m(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(S, { tone: g(e.status) }, {
					default: Y(() => [P(G(h(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, pi)]),
				N("td", null, [N("div", mi, [e.status === "connected" ? (V(), A(l, {
					key: 0,
					variant: "ghost",
					size: "sm",
					"aria-label": `Disconnect ${e.name}`,
					onClick: (t) => p(e.id)
				}, {
					default: Y(() => [...t[3] ||= [P(" Disconnect ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : j("", !0)])])
			]))), 128))])])])),
			N("section", hi, [t[6] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: X(f, ["prevent"])
			}, [Yt(N("input", {
				"onUpdate:modelValue": t[1] ||= (e) => c.value = e,
				type: "url",
				class: "federation__input",
				placeholder: "https://other-server.example.com",
				"aria-label": "Peer server URL",
				autocomplete: "off"
			}, null, 512), [[qt, c.value]]), F(l, {
				type: "submit",
				variant: "solid",
				"left-icon": "plus",
				loading: u.value,
				disabled: !c.value.trim()
			}, {
				default: Y(() => [...t[5] ||= [P(" Connect ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-0640a657"]]), _i = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, vi = {
	key: 0,
	class: "shares__skel"
}, yi = {
	key: 3,
	class: "shares__table-wrap"
}, bi = {
	class: "shares__table",
	"aria-label": "Library shares"
}, xi = { class: "shares__library" }, Si = { class: "shares__date" }, Ci = { class: "shares__date" }, wi = ["data-testid"], Ti = { class: "shares__actions" }, Ei = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, r = C(), i = H([]), a = H(!0), o = H(null);
		async function c(e = !1) {
			e && (a.value = !0), o.value = null;
			try {
				i.value = (await t.get("/api/v1/shares")).shares || [];
			} catch (e) {
				o.value = n(e, "Failed to load shares."), r.error(o.value);
			} finally {
				e && (a.value = !1);
			}
		}
		async function u(e) {
			try {
				await t.delete(`/api/v1/shares/${e}`), r.success("Share revoked."), await c();
			} catch (e) {
				r.error(n(e, "Failed to revoke share."));
			}
		}
		function d(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function f(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		function p(e) {
			switch (e) {
				case "read": return "info";
				case "write": return "success";
				default: return "neutral";
			}
		}
		return B(() => c(!0)), (e, t) => (V(), M("section", _i, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), a.value ? (V(), M("div", vi, [F(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), A(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: o.value
		}, {
			actions: Y(() => [F(l, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(!0)
			}, {
				default: Y(() => [...t[1] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (V(), A(T, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (V(), M("div", yi, [N("table", bi, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Shared with"),
			N("th", { scope: "col" }, "Permissions"),
			N("th", { scope: "col" }, "Created"),
			N("th", { scope: "col" }, "Expires"),
			N("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(V(!0), M(E, null, U(i.value, (e) => (V(), M("tr", { key: e.id }, [
			N("td", null, [N("span", xi, G(e.library_name), 1)]),
			N("td", null, G(e.shared_with), 1),
			N("td", null, [F(S, { tone: p(e.permissions) }, {
				default: Y(() => [P(G(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", Si, G(d(e.created_at)), 1),
			N("td", Ci, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(G(d(e.expires_at)) + " ", 1), f(e.expires_at) ? (V(), A(S, {
				key: 0,
				tone: "error"
			}, {
				default: Y(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, wi)]),
			N("td", null, [N("div", Ti, [F(l, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => u(e.id)
			}, {
				default: Y(() => [...t[3] ||= [P(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8731f31d"]]), Di = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, Oi = {
	key: 0,
	class: "audit__skel"
}, ki = {
	key: 3,
	class: "audit__content"
}, Ai = { class: "audit__table-wrap" }, ji = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, Mi = ["data-testid"], Ni = { class: "audit__details" }, Pi = { class: "audit__ip" }, Fi = { class: "audit__date" }, Ii = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, Li = {
	class: "audit__page-info",
	"aria-live": "polite"
}, Ri = /*#__PURE__*/ r(/* @__PURE__ */ I({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, r = C(), i = H([]), a = H(!0), o = H(null), c = H(1), u = H(1);
		async function d(e = 1) {
			a.value = !0, o.value = null;
			try {
				let n = await t.get("/api/v1/audit-logs", { page: String(e) });
				i.value = n.logs || [], c.value = n.page || 1, u.value = n.total_pages || 1;
			} catch (e) {
				o.value = n(e, "Failed to load audit logs."), r.error(o.value);
			} finally {
				a.value = !1;
			}
		}
		function f(e) {
			return new Date(e).toLocaleString();
		}
		function p(e) {
			return e.includes("create") || e.includes("add") ? "success" : e.includes("delete") || e.includes("remove") ? "error" : e.includes("update") || e.includes("edit") ? "info" : e.includes("login") || e.includes("auth") ? "accent" : "neutral";
		}
		return B(() => d()), (e, t) => (V(), M("section", Di, [t[7] ||= N("header", { class: "audit__head" }, [N("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), N("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), a.value ? (V(), M("div", Oi, [F(w, {
			variant: "text",
			lines: 8
		})])) : o.value ? (V(), A(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: o.value
		}, {
			actions: Y(() => [F(l, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => d(c.value)
			}, {
				default: Y(() => [...t[3] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (V(), A(T, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (V(), M("div", ki, [N("div", Ai, [N("table", ji, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Action"),
			N("th", { scope: "col" }, "Actor"),
			N("th", { scope: "col" }, "Target"),
			N("th", { scope: "col" }, "Details"),
			N("th", { scope: "col" }, "IP"),
			N("th", { scope: "col" }, "Time")
		])], -1), N("tbody", null, [(V(!0), M(E, null, U(i.value, (e) => (V(), M("tr", { key: e.id }, [
			N("td", null, [N("span", { "data-testid": `action-${e.id}` }, [F(S, { tone: p(e.action) }, {
				default: Y(() => [P(G(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Mi)]),
			N("td", null, G(e.actor), 1),
			N("td", null, G(e.target || "—"), 1),
			N("td", Ni, G(e.details || "—"), 1),
			N("td", Pi, G(e.ip_address || "—"), 1),
			N("td", Fi, G(f(e.created_at)), 1)
		]))), 128))])])]), u.value > 1 ? (V(), M("nav", Ii, [
			F(l, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: c.value <= 1,
				onClick: t[1] ||= (e) => d(c.value - 1)
			}, {
				default: Y(() => [...t[5] ||= [P(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			N("span", Li, "Page " + G(c.value) + " of " + G(u.value), 1),
			F(l, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: c.value >= u.value,
				onClick: t[2] ||= (e) => d(c.value + 1)
			}, {
				default: Y(() => [...t[6] ||= [P(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : j("", !0)]))]));
	}
}), [["__scopeId", "data-v-26a60fa5"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function zi(e, t) {
	let n = de(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = J(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = J(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/useOnline.ts
function Bi() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = H(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), Wt(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Gt(t);
}
//#endregion
export { ye as ALL_LOGS, ot as AMBIENT_SAMPLE_H, at as AMBIENT_SAMPLE_INTERVAL_MS, $e as AMBIENT_SAMPLE_W, Be as ARROW_ICONS, ct as ARROW_LABELS, ke as AdminBackupApi, Ae as AdminCastApi, Pe as AdminCollectionsApi, be as AdminDashboardApi, je as AdminDlnaServerApi, Fe as AdminHistoryApi, Oe as AdminIntegrationsApi, Re as AdminLibrariesApi, Ne as AdminLiveTvApi, ve as AdminLogsApi, Me as AdminRemoteAccessApi, De as AdminServicesApi, ze as AdminSettingsApi, Ie as AdminSyncPlayApi, Ce as AdminUsersApi, Ee as AdminWebhooksApi, dt as AmbientCanvas, a as ApiClient, t as ApiError, e as AppBackdrop, vn as AppLayout, Ri as AuditLogsPage, S as Badge, l as Button, Lt as CAPTION_BACKGROUND_OPTIONS, Mt as CAPTION_COLOR_OPTIONS, Ft as CAPTION_EDGE_OPTIONS, kt as CAPTION_SIZE_OPTIONS, Ct as CAPTION_SIZE_SCALE, Qe as CaptionOverlay, bt as CaptionsMenu, oe as Chip, le as Combobox, Un as CommandPalette, _ as DEFAULT_CAPTION_STYLE, h as DEFAULT_PREFERENCES, st as DIRECT_PLAY_EXTENSIONS, T as EmptyState, gi as FederationPage, pe as FilterBar, u as Icon, d as IconButton, On as Kbd, Le as LIBRARY_TYPES, Gr as LibraryScanPage, ee as LocalStorageTokenStore, zt as LoginForm, Ei as ManageSharesPage, ae as MediaCard, _e as MediaDetail, ue as MediaGrid, fe as MediaHomeRow, se as MediaRow, Zn as MiniPlayer, me as Modal, ri as MyServersPage, o as NetworkError, qe as PLAYER_SHORTCUTS, jr as PageTransition, fr as PhlixApp, _t as Player, Ue as QualityMenu, xe as RATING_LABELS, Se as RATING_OPTIONS, ne as RESUME_MAX_RATIO, b as RESUME_MIN_SECONDS, mt as ResumePrompt, Ar as Reveal, we as SUBSCRIBABLE_EVENTS, Ge as Scrubber, ce as Select, ge as SettingsForm, ln as Sheet, lt as ShortcutsHelp, Bt as SignupForm, w as Skeleton, re as Slider, He as SpeedMenu, kr as Spinner, ie as Switch, et as TRANSCODE_EXTENSIONS, he as Tabs, c as TimeoutError, Dr as ToastHost, br as Tooltip, ft as TranscodeNotice, pt as UPNEXT_COUNTDOWN_SECONDS, gt as UPNEXT_RING_CIRCUMFERENCE, nt as UPNEXT_RING_RADIUS, ht as UpNext, Ye as VolumeControl, Te as WEBHOOK_EVENT_CATEGORIES, Nt as activeAudioIndex, Nr as adminMenu, yt as ambientGradient, It as applyAudioTrack, sr as applyStoredThemeEarly, wt as applyTrackModes, St as averageRegion, zi as bindMediaStoreToRouter, Mr as buildAdminRoutes, x as buildMediaQuery, te as buildMediaUrl, At as captionStyleVars, Rt as cleanCueText, vr as createPhlixApp, ir as deriveAccentVars, Tt as edgeShadow, n as errMessage, ut as extensionOf, Ke as formatTime, Q as fuzzyScore, Je as handleShortcut, Et as hasActiveCaptions, g as hasStoredPreferences, tt as isBatterySaving, vt as isFatalMediaError, i as isOffline, Xe as isTypingTarget, Pt as listAudioTracks, jt as listSubtitleTracks, jn as matchCommand, rt as needsTranscode, Ot as readActiveCueLines, m as readStoredPreferences, Dt as resolveTextTrack, xt as rgbString, Ze as rgbaString, it as ringDashoffset, Ve as sampleAmbient, v as useAuthStore, Nn as useCommandStore, f as useFocusTrap, We as useKeyboardShortcuts, de as useMediaStore, Bi as useOnline, y as usePlayerStore, p as usePreferencesStore, cr as useTheme, C as useToastStore };

//# sourceMappingURL=phlix-ui.js.map