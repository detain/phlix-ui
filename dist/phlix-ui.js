import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c, u as l } from "./Button-DFtuAYup.js";
import { n as u, r as d, t as f } from "./Modal-3-gao3sJ.js";
import { t as p } from "./EmptyState-DPlVvQLn.js";
import { i as m, n as h, r as g, t as _ } from "./Select-BYtr8Wen.js";
import { t as v } from "./Badge-DypgiWDB.js";
import { n as y, t as b } from "./cast-DkPPYmc8.js";
import { t as x } from "./Switch-DzAvcqfb.js";
import { n as S, t as C } from "./logs-DadTfaTq.js";
import { t as w } from "./dashboard-BTCOCTHQ.js";
import { n as T, r as E, t as D } from "./users-C40iLgkq.js";
import { n as O, r as k, t as A } from "./webhooks-BBTLnFKm.js";
import { t as ee } from "./services-Czm8hsvH.js";
import { t as te } from "./integrations-DLAG9ISY.js";
import { t as ne } from "./backup-IdY_vzc2.js";
import { t as re } from "./dlnaServer-B5Sg4MkS.js";
import { t as ie } from "./remoteAccess-DVKRpKQ8.js";
import { t as ae } from "./liveTv-Dbjt901v.js";
import { t as oe } from "./collections-CH3HLdcd.js";
import { t as se } from "./history-ByCY8OYj.js";
import { t as ce } from "./syncPlay-DPzJkgkK.js";
import { n as le, t as ue } from "./libraries-CXAz_kXs.js";
import { t as de } from "./settings-m4upFcmH.js";
import { Fragment as j, Teleport as fe, Transition as pe, TransitionGroup as me, computed as M, createApp as he, createBlock as N, createCommentVNode as P, createElementBlock as F, createElementVNode as I, createSlots as ge, createTextVNode as L, createVNode as R, defineComponent as z, inject as B, nextTick as _e, normalizeClass as V, normalizeStyle as H, onBeforeUnmount as U, onMounted as W, openBlock as G, reactive as ve, ref as K, renderList as q, renderSlot as J, resolveComponent as ye, resolveDynamicComponent as be, toDisplayString as Y, toRef as xe, unref as X, useId as Se, vModelText as Ce, vShow as we, watch as Z, watchEffect as Te, withCtx as Q, withDirectives as Ee, withKeys as De, withModifiers as Oe } from "vue";
import { createPinia as ke, defineStore as Ae } from "pinia";
import { RouterLink as je, RouterView as Me, createRouter as Ne, createWebHistory as Pe, onBeforeRouteLeave as Fe, useRoute as Ie, useRouter as Le } from "vue-router";
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var Re = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, ze = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "AppBackdrop",
	props: {
		enabled: {
			type: Boolean,
			default: !0
		},
		grain: {
			type: Boolean,
			default: !0
		},
		vignette: {
			type: Boolean,
			default: !0
		},
		ambient: {
			type: Boolean,
			default: !1
		},
		ambientColor: {},
		ambientImage: {},
		intensity: { default: 1 }
	},
	setup(e) {
		let t = e, n = K(!1), r = null, i = null, a = () => n.value = !!(r?.matches || i?.matches);
		W(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (r = window.matchMedia("(prefers-reduced-motion: reduce)"), i = window.matchMedia("(prefers-reduced-data: reduce)"), a(), r.addEventListener?.("change", a), i.addEventListener?.("change", a));
		}), U(() => {
			r?.removeEventListener?.("change", a), i?.removeEventListener?.("change", a);
		});
		let o = M(() => t.enabled && !n.value), s = M(() => o.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function c(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let l = M(() => t.ambientImage ? {
			backgroundImage: `url("${c(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), u = M(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, n) => (G(), F(j, null, [
			s.value ? (G(), F("div", {
				key: 0,
				class: V(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: H(l.value),
				"aria-hidden": "true"
			}, null, 6)) : P("", !0),
			o.value && e.vignette ? (G(), F("div", Re)) : P("", !0),
			o.value && e.grain ? (G(), F("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: H(u.value),
				"aria-hidden": "true"
			}, null, 4)) : P("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), Be = ["aria-labelledby"], Ve = {
	key: 0,
	class: "phlix-sheet__header"
}, He = ["id"], Ue = { class: "phlix-sheet__body" }, We = {
	key: 1,
	class: "phlix-sheet__footer"
}, Ge = /*#__PURE__*/ l(/* @__PURE__ */ z({
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
		let n = e, r = t, i = K(n.modelValue);
		Z(() => n.modelValue, (e) => i.value = e);
		let a = K(null), o = Se();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return u(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (G(), N(fe, { to: "body" }, [R(pe, { name: `phlix-sheet-${e.side}` }, {
			default: Q(() => [e.modelValue ? (G(), F("div", {
				key: 0,
				class: V(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Oe(c, ["self"])
			}, [I("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? X(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (G(), F("header", Ve, [e.title ? (G(), F("h2", {
					key: 0,
					id: X(o),
					class: "phlix-sheet__title"
				}, Y(e.title), 9, He)) : P("", !0), e.hideClose ? P("", !0) : (G(), N(d, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : P("", !0),
				I("div", Ue, [J(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (G(), F("footer", We, [J(t.$slots, "footer", {}, void 0, !0)])) : P("", !0)
			], 8, Be)], 34)) : P("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), Ke = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, qe = {
	theme: "nocturne",
	accent: null,
	density: "comfortable",
	cardSize: 180,
	gridDensity: "comfy",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	captionStyle: { ...Ke },
	atmosphere: !0,
	filterPresets: []
};
function Je(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var Ye = "phlix.prefs";
function Xe() {
	if (typeof localStorage > "u") return { ...qe };
	try {
		let e = localStorage.getItem(Ye);
		if (!e) return { ...qe };
		let t = JSON.parse(e);
		return {
			...qe,
			...t
		};
	} catch {
		return { ...qe };
	}
}
function Ze() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(Ye) !== null;
	} catch {
		return !1;
	}
}
function Qe() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var $ = Ae("phlix-prefs", () => {
	let e = Xe(), t = K(e.theme), n = K(e.accent), r = K(e.density), i = K(e.cardSize), a = K(e.gridDensity), o = K(e.reducedMotion), s = K(e.autoplay), c = K(e.defaultVolume), l = K(e.defaultQuality), u = K(e.defaultSubtitleLang), d = K({
		...Ke,
		...e.captionStyle
	}), f = K(e.atmosphere), p = K(e.filterPresets ? [...e.filterPresets] : []), m = K(Qe()), h = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (h = window.matchMedia("(prefers-reduced-motion: reduce)"), h.addEventListener?.("change", (e) => m.value = e.matches));
	let g = M(() => o.value === "on" ? !0 : o.value === "off" ? !1 : m.value);
	function _() {
		return {
			theme: t.value,
			accent: n.value,
			density: r.value,
			cardSize: i.value,
			gridDensity: a.value,
			reducedMotion: o.value,
			autoplay: s.value,
			defaultVolume: c.value,
			defaultQuality: l.value,
			defaultSubtitleLang: u.value,
			captionStyle: d.value,
			atmosphere: f.value,
			filterPresets: p.value
		};
	}
	function v(e, t) {
		let n = {
			id: Je(e),
			name: e.trim(),
			query: t
		}, r = p.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? p.value.splice(r, 1, n) : p.value.push(n), n;
	}
	function y(e) {
		p.value = p.value.filter((t) => t.id !== e);
	}
	Z(_, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Ye, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = qe;
		t.value = e.theme, n.value = e.accent, r.value = e.density, i.value = e.cardSize, a.value = e.gridDensity, o.value = e.reducedMotion, s.value = e.autoplay, c.value = e.defaultVolume, l.value = e.defaultQuality, u.value = e.defaultSubtitleLang, d.value = { ...Ke }, f.value = e.atmosphere, p.value = [...e.filterPresets];
	}
	return {
		theme: t,
		accent: n,
		density: r,
		cardSize: i,
		gridDensity: a,
		reducedMotion: o,
		autoplay: s,
		defaultVolume: c,
		defaultQuality: l,
		defaultSubtitleLang: u,
		captionStyle: d,
		atmosphere: f,
		filterPresets: p,
		systemReduced: m,
		effectiveReducedMotion: g,
		snapshot: _,
		saveFilterPreset: v,
		removeFilterPreset: y,
		reset: b
	};
}), $e = { class: "shell" }, et = { class: "shell__bar" }, tt = { class: "shell__inner" }, nt = { class: "shell__brand" }, rt = {
	class: "shell__nav",
	"aria-label": "Primary"
}, it = { class: "shell__actions" }, at = { class: "shell__main" }, ot = {
	key: 0,
	class: "shell__footer"
}, st = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "AppLayout",
	setup(e) {
		let t = $(), n = K(!1);
		return (e, r) => (G(), F("div", $e, [
			R(ze, { enabled: X(t).atmosphere }, null, 8, ["enabled"]),
			I("header", et, [I("div", tt, [
				I("div", nt, [J(e.$slots, "logo", {}, () => [r[3] ||= I("span", { class: "shell__wordmark" }, [L("Phlix"), I("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				I("nav", rt, [J(e.$slots, "nav", {}, void 0, !0)]),
				r[4] ||= I("span", { class: "shell__spacer" }, null, -1),
				I("div", it, [J(e.$slots, "actions", {}, void 0, !0)]),
				e.$slots.nav ? (G(), N(d, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: "Open navigation menu",
					variant: "ghost",
					onClick: r[0] ||= (e) => n.value = !0
				})) : P("", !0)
			])]),
			I("main", at, [J(e.$slots, "default", {}, void 0, !0)]),
			e.$slots.footer ? (G(), F("footer", ot, [J(e.$slots, "footer", {}, void 0, !0)])) : P("", !0),
			R(Ge, {
				modelValue: n.value,
				"onUpdate:modelValue": r[2] ||= (e) => n.value = e,
				side: "left",
				title: "Menu"
			}, {
				default: Q(() => [I("nav", {
					class: "shell__drawer",
					onClick: r[1] ||= (e) => n.value = !1
				}, [J(e.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-007c323a"]]), ct = /* @__PURE__ */ z({
	__name: "ThemeToggle",
	setup(e) {
		let t = $(), n = [
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
		}, a = M(() => n[(n.indexOf(t.theme) + 1) % n.length]), o = M(() => r[t.theme] ?? "moon"), s = M(() => `Theme: ${i[t.theme] ?? t.theme} (switch to ${i[a.value]})`);
		function c() {
			t.theme = a.value;
		}
		return (e, t) => (G(), N(d, {
			name: o.value,
			label: s.value,
			variant: "ghost",
			onClick: c
		}, null, 8, ["name", "label"]));
	}
}), lt = Ae("auth", () => {
	let t = new n(), r = new e({
		tokenStore: t,
		baseUrl: B("apiBase", "")
	}), i = K(null), a = K(!1), o = K(null), s = K(t.getAccessToken()), c = M(() => s.value !== null), l = M(() => i.value?.is_admin === !0);
	function u(e, n) {
		t.setAccessToken(e), t.setRefreshToken(n), s.value = e;
	}
	async function d(e, t) {
		a.value = !0, o.value = null;
		try {
			let n = await r.post("/api/v1/auth/login", {
				email: e,
				password: t
			});
			return u(n.access_token, n.refresh_token), await p(), !0;
		} catch (e) {
			return o.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			a.value = !1;
		}
	}
	async function f(e, t, n) {
		a.value = !0, o.value = null;
		try {
			let i = await r.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return u(i.access_token, i.refresh_token), await p(), !0;
		} catch (e) {
			return o.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			a.value = !1;
		}
	}
	async function p() {
		if (c.value) try {
			i.value = await r.getCurrentUser();
		} catch {
			i.value = null, t.clear(), s.value = null;
		}
	}
	function m() {
		t.clear(), s.value = null, i.value = null;
	}
	return {
		user: i,
		loading: a,
		error: o,
		isLoggedIn: c,
		isAdmin: l,
		client: r,
		login: d,
		signup: f,
		fetchUser: p,
		logout: m
	};
}), ut = ["aria-label", "aria-expanded"], dt = {
	key: 0,
	class: "usermenu__avatar"
}, ft = { class: "usermenu__head" }, pt = { class: "usermenu__avatar usermenu__avatar--lg" }, mt = { class: "usermenu__name" }, ht = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "UserMenu",
	setup(e) {
		let t = lt(), n = Le(), i = B("phlixConfig", null), a = M(() => i?.routerBase ?? "/app"), o = K(!1), s = K(null), c = K(null), l = M(() => t.user?.username || t.user?.name || t.user?.email || "Account"), d = M(() => l.value.charAt(0).toUpperCase() || "A");
		function f() {
			o.value = !1;
		}
		function p(e) {
			f(), n.push(e);
		}
		function m() {
			f(), t.logout(), n.push(`${a.value}/login`);
		}
		u(c, o, {
			lockScroll: !1,
			onEscape: () => (f(), !0)
		});
		function h(e) {
			s.value && !s.value.contains(e.target) && f();
		}
		return Z(o, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", h, !0) : document.removeEventListener("pointerdown", h, !0));
		}), U(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", h, !0);
		}), (e, n) => (G(), F("div", {
			ref_key: "rootEl",
			ref: s,
			class: "usermenu"
		}, [I("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": X(t).isLoggedIn ? `Account: ${l.value}` : "Account",
			"aria-haspopup": "menu",
			"aria-expanded": o.value,
			onClick: n[0] ||= (e) => o.value = !o.value
		}, [X(t).isLoggedIn ? (G(), F("span", dt, Y(d.value), 1)) : (G(), N(r, {
			key: 1,
			name: "user"
		}))], 8, ut), o.value ? (G(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: c,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": "Account",
			tabindex: "-1"
		}, [X(t).isLoggedIn ? (G(), F(j, { key: 0 }, [
			I("div", ft, [I("span", pt, Y(d.value), 1), I("span", mt, Y(l.value), 1)]),
			I("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: n[1] ||= (e) => p(`${a.value}/settings`)
			}, [R(r, { name: "settings" }), n[3] ||= L(" Settings ", -1)]),
			I("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: m
			}, [R(r, { name: "log-out" }), n[4] ||= L(" Sign out ", -1)])
		], 64)) : (G(), F("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: n[2] ||= (e) => p(`${a.value}/login`)
		}, [R(r, { name: "user" }), n[5] ||= L(" Sign in ", -1)]))], 512)) : P("", !0)], 512));
	}
}), [["__scopeId", "data-v-5da5ea3f"]]), gt = { class: "phlix-kbd" }, _t = {
	key: 1,
	class: "phlix-kbd__key"
}, vt = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = M(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (G(), F("span", gt, [n.value.length ? (G(!0), F(j, { key: 0 }, q(n.value, (e, t) => (G(), F("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, Y(e), 1))), 128)) : (G(), F("kbd", _t, [J(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), yt = "phlix.cmd.recents", bt = 8;
function xt(e, t) {
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
function St(e, t) {
	if (!e.trim()) return 0;
	let n = xt(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, xt(e, n));
	return t.group && (r = Math.max(r, xt(e, t.group))), r;
}
function Ct() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(yt);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, bt) : [];
	} catch {
		return [];
	}
}
var wt = Ae("phlix-commands", () => {
	let e = K(/* @__PURE__ */ new Map()), t = K(!1), n = K(""), r = K(Ct()), i = M(() => Array.from(e.value.values())), a = M(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: St(t, e)
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
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, bt);
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
	return Z(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(yt, JSON.stringify(e));
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
}), Tt = { class: "phlix-cmdk__search" }, Et = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], Dt = ["id"], Ot = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, kt = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], At = { class: "phlix-cmdk__option-body" }, jt = { class: "phlix-cmdk__option-title" }, Mt = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, Nt = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, Pt = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "CommandPalette",
	setup(e) {
		let t = wt(), n = Le(), i = $(), a = K(null), o = Se(), s = K(0);
		function c(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => t.runId(e.id)
			};
		}
		function l(e) {
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
		let d = M(() => {
			let e = [], n = [], r = (t) => {
				e.push({
					kind: "option",
					item: t,
					index: n.length
				}), n.push(t);
			}, i = t.query.trim();
			if (i) {
				for (let e of t.results) r(c(e));
				return r(l(i)), {
					rows: e,
					options: n
				};
			}
			let a = t.results.filter((e) => t.isRecent(e.id));
			a.length && (e.push({
				kind: "header",
				label: "Recent"
			}), a.forEach((e) => r(c(e))));
			let o = /* @__PURE__ */ new Map();
			for (let e of t.results) {
				if (t.isRecent(e.id)) continue;
				let n = e.group ?? "Commands", r = o.get(n);
				r ? r.push(e) : o.set(n, [e]);
			}
			for (let [t, n] of o) e.push({
				kind: "header",
				label: t
			}), n.forEach((e) => r(c(e)));
			return {
				rows: e,
				options: n
			};
		}), f = M(() => d.value.options.length), p = M(() => f.value ? `${o}-opt-${s.value}` : void 0);
		Z(() => t.query, () => {
			s.value = 0;
		}), Z(f, (e) => {
			s.value > e - 1 && (s.value = Math.max(0, e - 1));
		}), Z(() => t.open, (e) => {
			e && (s.value = 0);
		});
		function m() {
			typeof document > "u" || document.getElementById(`${o}-opt-${s.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function h(e) {
			let t = f.value;
			t && (s.value = (s.value + e + t) % t, m());
		}
		function g() {
			let e = d.value.options[s.value];
			e && e.run();
		}
		function _(e) {
			e.run();
		}
		function v(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), h(1);
					break;
				case "ArrowUp":
					e.preventDefault(), h(-1);
					break;
				case "Home":
					e.preventDefault(), s.value = 0, m();
					break;
				case "End":
					e.preventDefault(), s.value = Math.max(0, f.value - 1), m();
					break;
				case "Enter":
					e.preventDefault(), g();
					break;
			}
		}
		function y() {
			t.closePalette();
		}
		u(a, M(() => t.open), { onEscape: () => (t.closePalette(), !0) });
		function b(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), t.togglePalette());
		}
		let x = B("phlixCommands", []), S = [
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
					i.theme = "nocturne";
				}
			},
			{
				id: "theme.daylight",
				title: "Theme: Daylight",
				icon: "sun",
				group: "Theme",
				keywords: ["light", "bright"],
				run: () => {
					i.theme = "daylight";
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
					i.theme = "midnight";
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
					i.density = i.density === "compact" ? "comfortable" : "compact";
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
					i.reducedMotion = i.reducedMotion === "off" ? "auto" : "off";
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
					i.atmosphere = !i.atmosphere;
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
				run: () => i.reset()
			}
		], C = null;
		return W(() => {
			C = t.register([...S, ...x]), document.addEventListener("keydown", b);
		}), U(() => {
			C?.(), document.removeEventListener("keydown", b);
		}), (e, n) => (G(), N(fe, { to: "body" }, [R(pe, { name: "phlix-cmdk" }, {
			default: Q(() => [X(t).open ? (G(), F("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: Oe(y, ["self"])
			}, [I("div", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [I("div", Tt, [
				R(r, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				I("input", {
					value: X(t).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": X(o),
					"aria-activedescendant": p.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: n[0] ||= (e) => X(t).setQuery(e.target.value),
					onKeydown: v
				}, null, 40, Et),
				R(vt, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), I("ul", {
				id: X(o),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(G(!0), F(j, null, q(d.value.rows, (e, t) => (G(), F(j, { key: e.kind === "header" ? `h-${e.label}-${t}` : e.item.id }, [e.kind === "header" ? (G(), F("li", Ot, Y(e.label), 1)) : (G(), F("li", {
				key: 1,
				id: `${X(o)}-opt-${e.index}`,
				class: V(["phlix-cmdk__option", { "is-active": e.index === s.value }]),
				role: "option",
				"aria-selected": e.index === s.value,
				onClick: (t) => _(e.item),
				onPointermove: (t) => s.value = e.index
			}, [
				R(r, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				I("span", At, [I("span", jt, Y(e.item.title), 1), e.item.subtitle ? (G(), F("span", Mt, Y(e.item.subtitle), 1)) : P("", !0)]),
				e.item.shortcut ? (G(), N(vt, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : P("", !0)
			], 42, kt))], 64))), 128)), f.value ? P("", !0) : (G(), F("li", Nt, " No matching commands "))], 8, Dt)], 512)], 32)) : P("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]), Ft = 30, It = .95, Lt = 5e3, Rt = "phlix.resume";
function zt() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(Rt);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Bt = Ae("phlix-player", () => {
	let e = $(), t = K(null), n = K(""), r = K([]), i = K(!1), a = K(0), o = K(0), s = K(0), c = K(e.defaultVolume), l = K(!1), u = K(1), d = K(e.defaultQuality), f = K(e.defaultSubtitleLang), p = K(!1), m = K(zt()), h = M(() => o.value > 0 ? a.value / o.value : 0), g = M(() => r.value[0] ?? null), _, v = 0;
	function y(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			v = Date.now();
			try {
				localStorage.setItem(Rt, JSON.stringify(m.value));
			} catch {}
		}, n = Date.now() - v;
		clearTimeout(_), e || n >= Lt ? t() : _ = setTimeout(t, Lt - n);
	}
	function b(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function x(e, t, n) {
		b(t, n) ? m.value[e] = Math.floor(t) : delete m.value[e], y();
	}
	function S(e) {
		return e ? m.value[e] ?? null : null;
	}
	function C(e) {
		delete m.value[e], y(!0);
	}
	function w(e, r = {}) {
		t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (a.value = 0, o.value = 0, s.value = 0), ce(e);
	}
	function T(e, n, r) {
		a.value = e, n !== void 0 && (o.value = n), r !== void 0 && (s.value = r), t.value && x(t.value.id, e, o.value);
	}
	function E() {
		i.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function D() {
		i.value = !1, t.value && x(t.value.id, a.value, o.value), y(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function O(e) {
		c.value = Math.min(1, Math.max(0, e)), c.value > 0 && (l.value = !1);
	}
	function k() {
		l.value = !l.value;
	}
	function A(e) {
		u.value = e;
	}
	function ee(e) {
		d.value = e;
	}
	function te(e) {
		f.value = e;
	}
	function ne(e) {
		r.value = [...e];
	}
	function re(e) {
		r.value.push(e);
	}
	function ie(e) {
		let t = r.value.shift() ?? null;
		return t && w(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function ae() {
		p.value = !0;
	}
	function oe() {
		p.value = !1;
	}
	function se() {
		t.value && x(t.value.id, a.value, o.value), y(!0), i.value = !1, p.value = !1, t.value = null, n.value = "";
	}
	function ce(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function le() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && !(!(o.value > 0) || !Number.isFinite(o.value))) try {
			e.setPositionState({
				duration: o.value,
				position: Math.min(Math.max(0, a.value), o.value),
				playbackRate: u.value || 1
			});
		} catch {}
	}
	function ue(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return () => {};
		let t = navigator.mediaSession, n = (e, n) => {
			try {
				t.setActionHandler(e, n);
			} catch {}
		};
		return e.onPlay && n("play", e.onPlay), e.onPause && n("pause", e.onPause), e.onNext && n("nexttrack", e.onNext), e.onPrevious && n("previoustrack", e.onPrevious), e.onSeek && n("seekto", (t) => e.onSeek?.(t.seekTime ?? 0)), () => {
			for (let e of [
				"play",
				"pause",
				"nexttrack",
				"previoustrack",
				"seekto"
			]) n(e, null);
		};
	}
	function de() {
		c.value = e.defaultVolume, d.value = e.defaultQuality, f.value = e.defaultSubtitleLang;
	}
	return {
		current: t,
		streamUrl: n,
		queue: r,
		playing: i,
		position: a,
		duration: o,
		buffered: s,
		volume: c,
		muted: l,
		rate: u,
		quality: d,
		subtitleLang: f,
		miniPlayer: p,
		resumeMap: m,
		progress: h,
		upNext: g,
		inResumeBand: b,
		saveResume: x,
		resumePositionFor: S,
		clearResume: C,
		setCurrent: w,
		updateProgress: T,
		play: E,
		pause: D,
		setVolume: O,
		toggleMute: k,
		setRate: A,
		setQuality: ee,
		setSubtitle: te,
		setQueue: ne,
		enqueue: re,
		next: ie,
		showMiniPlayer: ae,
		hideMiniPlayer: oe,
		closePlayer: se,
		setMediaSessionMetadata: ce,
		setMediaPositionState: le,
		bindMediaSession: ue,
		seedFromPreferences: de
	};
}), Vt = {
	key: 0,
	class: "mini",
	role: "region",
	"aria-label": "Mini player"
}, Ht = ["src", "poster"], Ut = { class: "mini__body" }, Wt = { class: "mini__title" }, Gt = { class: "mini__controls" }, Kt = ["aria-label"], qt = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Jt = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let n = t, i = Bt(), a = K(null), o = M(() => i.miniPlayer && !!i.current && !!i.streamUrl), s = M(() => i.current?.name ?? ""), c = M(() => Math.max(0, Math.min(1, i.progress)));
		function l() {
			let e = a.value;
			e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, i.position > 0 && (!e.duration || i.position < e.duration) && (e.currentTime = i.position), i.playing && e.play()?.catch(() => {}));
		}
		function u() {
			i.play();
		}
		function d() {
			i.pause();
		}
		function f() {
			let e = a.value;
			e && i.updateProgress(e.currentTime, e.duration);
		}
		function p() {
			let e = a.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function m() {
			i.current && n("expand", i.current.id);
		}
		function h() {
			i.closePlayer();
		}
		return Z(() => i.playing, (e) => {
			let t = a.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), U(() => {
			a.value?.pause?.();
		}), (e, t) => (G(), N(pe, { name: "mini" }, {
			default: Q(() => [o.value ? (G(), F("div", Vt, [
				I("video", {
					ref_key: "videoRef",
					ref: a,
					class: "mini__video",
					src: X(i).streamUrl,
					poster: X(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: l,
					onPlay: u,
					onPause: d,
					onTimeupdate: f,
					onClick: m
				}, null, 40, Ht),
				I("div", Ut, [I("p", Wt, Y(s.value), 1), I("div", Gt, [
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": X(i).playing ? "Pause" : "Play",
						onClick: p
					}, [R(r, { name: X(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Kt),
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": "Expand to full player",
						onClick: m
					}, [R(r, { name: "expand" })]),
					I("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": "Close player",
						onClick: h
					}, [R(r, { name: "x" })])
				])]),
				I("div", qt, [I("div", {
					class: "mini__progress-fill",
					style: H({ transform: `scaleX(${c.value})` })
				}, null, 4)])
			])) : P("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c013af7d"]]);
//#endregion
//#region src/composables/color.ts
function Yt(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Xt = (e) => Math.max(0, Math.min(255, Math.round(e))), Zt = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Xt(e).toString(16).padStart(2, "0")).join("");
function Qt(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function $t(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var en = ({ r: e, g: t, b: n }, r) => `rgba(${Xt(e)}, ${Xt(t)}, ${Xt(n)}, ${r})`;
function tn({ r: e, g: t, b: n }) {
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
function nn(e) {
	let t = Yt(e);
	if (!t) return null;
	let n = tn(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Zt(t),
		"--accent-hover": Zt(Qt(t, .12)),
		"--accent-active": Zt($t(t, .12)),
		"--accent-soft": en(t, .14),
		"--accent-ring": en(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var rn = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function an(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? nn(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of rn) n.style.removeProperty(e);
}
function on(e) {
	let t = Xe();
	e && !Ze() && (t.theme = e), an(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function sn() {
	let e = $();
	return Te(() => {
		an({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var cn = ["src", "alt"], ln = { class: "brand-wordmark" }, un = {
	key: 1,
	class: "brand-tagline"
}, dn = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "PhlixApp",
	setup(e) {
		sn();
		let t = wt(), n = Le();
		function i(e) {
			n.push(`${l.value}/player/${e}`);
		}
		let a = B("phlixConfig", null), o = M(() => a?.branding ?? {}), s = M(() => o.value.wordmark ?? "Phlix"), c = M(() => a?.menu ?? []), l = M(() => a?.routerBase ?? "/app");
		function u(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, n) => (G(), N(st, null, {
			logo: Q(() => [R(X(je), {
				to: l.value,
				class: "brand"
			}, {
				default: Q(() => [
					o.value.logoSrc ? (G(), F("img", {
						key: 0,
						src: o.value.logoSrc,
						alt: o.value.logoAlt ?? s.value,
						class: "brand-logo"
					}, null, 8, cn)) : P("", !0),
					I("span", ln, [L(Y(s.value), 1), n[1] ||= I("span", { class: "brand-dot" }, ".", -1)]),
					o.value.tagline ? (G(), F("span", un, Y(o.value.tagline), 1)) : P("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Q(() => [c.value.length ? (G(!0), F(j, { key: 0 }, q(c.value, (e) => (G(), N(be(e.href ? "a" : X(je)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? u(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Q(() => [e.icon ? (G(), N(r, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : P("", !0), L(" " + Y(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (G(), F(j, { key: 1 }, [R(X(je), {
				to: l.value,
				class: "nav-link"
			}, {
				default: Q(() => [...n[2] ||= [L("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), R(X(je), {
				to: `${l.value}/settings`,
				class: "nav-link"
			}, {
				default: Q(() => [...n[3] ||= [L("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: Q(() => [
				R(d, {
					name: "search",
					label: "Open command palette (⌘K)",
					variant: "ghost",
					onClick: n[0] ||= (e) => X(t).openPalette()
				}),
				R(ct),
				R(ht)
			]),
			default: Q(() => [
				R(X(Me)),
				R(Pt),
				R(Jt, { onExpand: i })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-b48c595d"]]), fn = { class: "phlix-placeholder" }, pn = { class: "placeholder-content" }, mn = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (G(), F("div", fn, [I("div", pn, [n[0] ||= I("h1", null, "Shared UI loading...", -1), I("p", null, "Phlix " + Y(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), hn = 6e4, gn = 250;
function _n(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var vn = Ae("media", () => {
	let t = K([]), n = K(0), r = K(!1), i = K(null), a = K(""), o = K([]), s = K(void 0), c = K(void 0), l = K([]), u = K([]), d = K("name"), f = K("asc"), p = K(24), m = K(0), h = M(() => t.value.length < n.value), g = M(() => {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = M(() => {
		let e = /* @__PURE__ */ new Set();
		return t.value.forEach((t) => t.genres?.forEach((t) => e.add(t))), Array.from(e).sort();
	}), v = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], y = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function b(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function x(e, t) {
		return `${e}/api/v1/media?${b(t).toString()}`;
	}
	function S(e) {
		return b(e).toString();
	}
	let C = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), T = null, E = null, D;
	function O(e) {
		return !!e && Date.now() - e.ts < hn;
	}
	function k(t, n, r, i) {
		i && (E && r !== T && E.abort(), T = r);
		let a = w.get(r);
		if (a) return i && (E = a.controller), a.promise;
		let o = new AbortController();
		i && (E = o);
		let s = new e({ baseUrl: t }).get(x(t, n), void 0, o.signal).then((e) => (C.set(r, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			w.delete(r);
		});
		return w.set(r, {
			promise: s,
			controller: o
		}), s;
	}
	function A(e, r) {
		t.value = r ? [...t.value, ...e.items] : e.items, n.value = e.total;
	}
	async function ee(e, t = !1) {
		let n = { ...g.value }, a = S(n), o = C.get(a);
		if (O(o)) {
			A(o, t), i.value = null;
			return;
		}
		r.value = !0, i.value = null;
		try {
			let r = await k(e, n, a, !t);
			if (!t && a !== T) return;
			A(r, t);
		} catch (e) {
			if (_n(e)) return;
			(t || a === T) && (i.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === T) && (r.value = !1);
		}
	}
	function te(e, t = gn) {
		m.value = 0, clearTimeout(D), D = setTimeout(() => ee(e, !1), t);
	}
	async function ne(e) {
		r.value || !h.value || (m.value = t.value.length, await ee(e, !0));
	}
	async function re(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = S(n);
		if (!O(C.get(r))) try {
			await k(e, n, r, !1);
		} catch {}
	}
	function ie() {
		C.clear();
	}
	function ae() {
		clearTimeout(D);
	}
	function oe() {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function se(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function ce(e) {
		a.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = se(e.genres), l.value = se(e.ratings), u.value = se(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = i ?? "asc", m.value = 0;
	}
	function le() {
		t.value = [], n.value = 0, m.value = 0, i.value = null;
	}
	function ue(e) {
		a.value = e, m.value = 0;
	}
	function de(e) {
		o.value = e, m.value = 0;
	}
	function j(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function fe(e) {
		l.value = e, m.value = 0;
	}
	function pe(e) {
		u.value = e, m.value = 0;
	}
	function me(e, t) {
		d.value = e, t && (f.value = t), m.value = 0;
	}
	return {
		items: t,
		total: n,
		loading: r,
		error: i,
		search: a,
		selectedGenres: o,
		yearFrom: s,
		yearTo: c,
		selectedRatings: l,
		selectedTypes: u,
		sort: d,
		order: f,
		limit: p,
		offset: m,
		hasMore: h,
		queryParams: g,
		availableGenres: _,
		availableRatings: v,
		availableTypes: y,
		fetchMedia: ee,
		scheduleFetch: te,
		loadMore: ne,
		prefetch: re,
		clearCache: ie,
		cancelScheduled: ae,
		toQuery: oe,
		applyQuery: ce,
		reset: le,
		setSearch: ue,
		setGenres: de,
		setYearRange: j,
		setRatings: fe,
		setTypes: pe,
		setSort: me
	};
}), yn = { class: "media-card" }, bn = { class: "media-card__poster" }, xn = ["href", "aria-label"], Sn = { class: "visually-hidden" }, Cn = ["src", "alt"], wn = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Tn = { class: "media-card__badges" }, En = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Dn = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, On = ["aria-valuenow", "aria-label"], kn = { class: "media-card__overlay" }, An = { class: "media-card__title" }, jn = { class: "media-card__meta" }, Mn = {
	key: 0,
	class: "numeric"
}, Nn = {
	key: 1,
	class: "media-card__dot"
}, Pn = {
	key: 2,
	class: "media-card__cert"
}, Fn = {
	key: 3,
	class: "media-card__dot"
}, In = {
	key: 4,
	class: "numeric"
}, Ln = {
	key: 0,
	class: "media-card__genres"
}, Rn = { class: "media-card__actions" }, zn = { class: "media-card__caption" }, Bn = ["title"], Vn = { class: "media-card__caption-sub numeric" }, Hn = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 }
	},
	emits: [
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, a = Bt(), o = M(() => n.to ?? `/app/player/${n.item.id}`), s = K(!1), c = K(null);
		function l() {
			s.value = !0;
		}
		W(() => {
			c.value?.complete && (s.value = !0);
		});
		let u = M(() => {
			let e = n.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= n.newWithinDays * 24 * 60 * 60 * 1e3;
		}), d = M(() => {
			let e = a.resumePositionFor(n.item.id), t = n.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), f = M(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (G(), F("article", yn, [I("div", bn, [
			I("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [I("span", Sn, Y(e.item.name), 1)], 8, xn),
			e.item.poster_url ? (G(), F("img", {
				key: 0,
				ref_key: "imgEl",
				ref: c,
				class: V(["media-card__img", { "is-loaded": s.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: l
			}, null, 42, Cn)) : (G(), F("div", wn, [R(r, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			I("div", Tn, [
				u.value ? (G(), F("span", En, "New")) : P("", !0),
				J(t.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (G(), F("span", Dn, Y(e.quality), 1)) : P("", !0)
			]),
			d.value > 0 ? (G(), F("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [I("i", { style: H({ width: `${d.value * 100}%` }) }, null, 4)], 8, On)) : P("", !0),
			I("div", kn, [
				I("h3", An, Y(e.item.name), 1),
				I("div", jn, [
					e.item.year ? (G(), F("span", Mn, Y(e.item.year), 1)) : P("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (G(), F("span", Nn)) : P("", !0),
					e.item.rating ? (G(), F("span", Pn, Y(e.item.rating), 1)) : P("", !0),
					e.item.rating && e.item.runtime ? (G(), F("span", Fn)) : P("", !0),
					e.item.runtime ? (G(), F("span", In, Y(e.item.runtime) + "m", 1)) : P("", !0)
				]),
				f.value.length ? (G(), F("div", Ln, [(G(!0), F(j, null, q(f.value, (e) => (G(), F("span", { key: e }, Y(e), 1))), 128))])) : P("", !0),
				I("div", Rn, [
					I("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: n[0] ||= (t) => i("play", e.item)
					}, [R(r, { name: "play" })]),
					I("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: n[1] ||= (t) => i("watchlist", e.item)
					}, [R(r, { name: "bookmark-plus" })]),
					I("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: n[2] ||= (t) => i("info", e.item)
					}, [R(r, { name: "info" })]),
					J(t.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), I("div", zn, [I("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, Y(e.item.name), 9, Bn), I("div", Vn, [
			e.item.year ? (G(), F(j, { key: 0 }, [L(Y(e.item.year), 1)], 64)) : P("", !0),
			e.item.year && e.item.runtime ? (G(), F(j, { key: 1 }, [L(" · ")], 64)) : P("", !0),
			e.item.runtime ? (G(), F(j, { key: 2 }, [L(Y(e.item.runtime) + "m", 1)], 64)) : P("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), Un = 3 / 2;
function Wn(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function Gn(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function Kn(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * Un + t + n;
}
function qn(e) {
	let { scrollTop: t, viewportHeight: n, rowHeight: r, columns: i, itemCount: a, overscan: o } = e, s = Math.max(1, i), c = Math.ceil(a / s), l = c * r;
	if (c === 0 || r <= 0) return {
		startRow: 0,
		endRow: c,
		startIndex: 0,
		endIndex: a,
		rowCount: c,
		padTop: 0,
		totalHeight: l
	};
	let u = Math.floor(Math.max(0, t) / r), d = Math.ceil(Math.max(0, n) / r) + 1, f = Math.max(0, u - o), p = Math.min(c, u + d + o);
	return {
		startRow: f,
		endRow: p,
		startIndex: f * s,
		endIndex: Math.min(a, p * s),
		rowCount: c,
		padTop: f * r,
		totalHeight: l
	};
}
//#endregion
//#region src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var Jn = { class: "media-grid-root" }, Yn = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, Xn = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, Zn = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "MediaGrid",
	props: {
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingMore: {
			type: Boolean,
			default: !1
		},
		hasMore: {
			type: Boolean,
			default: !1
		},
		cardSize: {},
		skeletonCount: { default: 18 },
		overscan: { default: 2 }
	},
	emits: [
		"load-more",
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, a = $(), o = M(() => n.cardSize ?? a.cardSize ?? 180), s = K(null), c = K(null), l = K(0), u = K(0), d = K(0);
		function f() {
			let e = s.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (l.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (u.value = n), d.value = Math.max(0, -t.top);
		}
		let p = 0;
		function m() {
			p ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				p = 0, f();
			});
		}
		let h = M(() => Wn(l.value, o.value, 20)), g = M(() => Kn(Gn(l.value, h.value, 20))), _ = M(() => l.value > 0 && g.value > 0), v = M(() => qn({
			scrollTop: d.value,
			viewportHeight: u.value,
			rowHeight: g.value,
			columns: h.value,
			itemCount: n.items.length,
			overscan: n.overscan
		})), y = M(() => {
			if (!_.value) return n.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = v.value, r = [];
			for (let i = e; i < t; i++) r.push({
				item: n.items[i],
				index: i
			});
			return r;
		}), b = M(() => ({ gridTemplateColumns: _.value ? `repeat(${h.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), x = M(() => _.value ? { height: `${v.value.totalHeight}px` } : {}), S = M(() => _.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${v.value.padTop}px)`
		} : {}), C = M(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), w = M(() => _.value && d.value > u.value * 1.5);
		function T() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let E = null;
		function D() {
			E || typeof IntersectionObserver > "u" || (E = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && n.hasMore && !n.loading && !n.loadingMore && i("load-more");
			}, { rootMargin: "400px 0px" }), c.value && E.observe(c.value));
		}
		function O() {
			E?.disconnect(), E = null;
		}
		Z(() => c.value, (e) => {
			O(), e && (D(), m());
		});
		let k = null;
		function A() {
			k || typeof ResizeObserver > "u" || !s.value || (k = new ResizeObserver(m), k.observe(s.value));
		}
		function ee() {
			k?.disconnect(), k = null;
		}
		return Z(() => s.value, (e) => {
			ee(), e && (A(), m());
		}), W(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("resize", m, { passive: !0 })), A(), D();
		}), U(() => {
			typeof window < "u" && (window.removeEventListener("scroll", m), window.removeEventListener("resize", m)), p &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), 0), ee(), O();
		}), Z(() => n.items.length, () => _e(m)), (t, n) => (G(), F("div", Jn, [e.loading && e.items.length === 0 ? (G(), F("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: H(C.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(G(!0), F(j, null, q(e.skeletonCount, (e) => (G(), F("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...n[0] ||= [
			I("div", { class: "skel-poster" }, null, -1),
			I("div", { class: "skel-title" }, null, -1),
			I("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (G(), F("div", Yn, [J(t.$slots, "empty", {}, () => [
			R(r, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			n[1] ||= I("p", { class: "media-grid-empty__title" }, "No media found", -1),
			n[2] ||= I("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (G(), F(j, { key: 2 }, [
			I("div", {
				ref_key: "sizerEl",
				ref: s,
				class: "media-grid-sizer",
				style: H(x.value)
			}, [I("div", {
				class: "media-grid",
				style: H([b.value, S.value])
			}, [(G(!0), F(j, null, q(y.value, (e) => J(t.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [R(Hn, {
				item: e.item,
				onPlay: (t) => i("play", e.item),
				onWatchlist: (t) => i("watchlist", e.item),
				onInfo: (t) => i("info", e.item)
			}, null, 8, [
				"item",
				"onPlay",
				"onWatchlist",
				"onInfo"
			])], !0)), 128))], 4)], 4),
			e.loadingMore ? (G(), F("div", Xn, [...n[3] ||= [I("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), L(" Loading more… ", -1)]])) : P("", !0),
			e.hasMore && !e.loadingMore ? (G(), F("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: c,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : P("", !0)
		], 64)), R(pe, { name: "media-grid-fade" }, {
			default: Q(() => [w.value ? (G(), F("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: T
			}, [R(r, { name: "arrow-up" })])) : P("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), Qn = ["aria-label"], $n = { class: "media-row__head" }, er = { class: "media-row__title" }, tr = {
	key: 0,
	class: "media-row__count numeric"
}, nr = { class: "media-row__action" }, rr = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, ir = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, ar = { class: "media-row__skel-poster" }, or = ["aria-label"], sr = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "MediaRow",
	props: {
		title: {},
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		error: { default: null },
		count: { default: null },
		skeletonCount: { default: 6 },
		emptyText: {},
		hideWhenEmpty: {
			type: Boolean,
			default: !1
		},
		cardTo: {}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"retry"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = M(() => !n.loading && !n.error && n.items.length === 0), o = M(() => n.hideWhenEmpty && a.value);
		return (t, n) => o.value ? P("", !0) : (G(), F("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [I("div", $n, [
			I("h2", er, Y(e.title), 1),
			e.count == null ? P("", !0) : (G(), F("span", tr, Y(e.count.toLocaleString()), 1)),
			I("div", nr, [J(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (G(), F("div", rr, [I("span", null, Y(e.error), 1), I("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (G(), F("div", ir, [(G(!0), F(j, null, q(e.skeletonCount, (e) => (G(), F("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [I("div", ar, [R(i, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), R(i, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : a.value ? (G(), N(p, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: Q(() => [J(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (G(), F("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(G(!0), F(j, null, q(e.items, (t) => (G(), F("li", {
			key: t.id,
			class: "media-row__cell"
		}, [R(Hn, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, or))], 8, Qn));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function cr(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function lr(e, t = {}) {
	return `${e}/api/v1/media?${cr(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var ur = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "HomeRow",
	props: {
		row: {},
		apiBase: {},
		limit: { default: 18 }
	},
	emits: [
		"items-loaded",
		"play",
		"watchlist",
		"info",
		"see-all"
	],
	setup(t, { emit: n }) {
		let r = t, i = n, a = o(), s = K([]), c = K(null), l = K(!1), u = K(null), d = K(!1), f = K(null), p = null, m = null, h = !1;
		function g(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function _() {
			if (!l.value) {
				l.value = !0, u.value = null, m = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let t = new e({ baseUrl: r.apiBase }), n = lr(r.apiBase, {
						...r.row.query,
						limit: r.limit,
						offset: 0
					}), a = await t.get(n, void 0, m?.signal);
					if (h) return;
					s.value = a.items ?? [], c.value = typeof a.total == "number" ? a.total : s.value.length, d.value = !0, i("items-loaded", s.value);
				} catch (e) {
					if (h || g(e)) return;
					u.value = e instanceof Error ? e.message : "Failed to load", a.error(`Couldn't load "${r.row.title}"`);
				} finally {
					h || (l.value = !1);
				}
			}
		}
		function v() {
			if (typeof IntersectionObserver > "u" || !f.value) {
				_();
				return;
			}
			p = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (p?.disconnect(), p = null, _());
			}, { rootMargin: "300px" }), p.observe(f.value);
		}
		return W(v), U(() => {
			h = !0, m?.abort(), m = null, p?.disconnect(), p = null;
		}), (e, n) => (G(), F("div", {
			ref_key: "rootEl",
			ref: f
		}, [R(sr, {
			title: t.row.title,
			items: s.value,
			loading: l.value || !d.value && !u.value,
			error: u.value,
			count: c.value,
			"hide-when-empty": "",
			onRetry: _,
			onPlay: n[1] ||= (e) => i("play", e),
			onWatchlist: n[2] ||= (e) => i("watchlist", e),
			onInfo: n[3] ||= (e) => i("info", e)
		}, {
			action: Q(() => [I("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (e) => i("see-all", t.row)
			}, "See all")]),
			_: 1
		}, 8, [
			"title",
			"items",
			"loading",
			"error",
			"count"
		])], 512));
	}
}), [["__scopeId", "data-v-fb0faca3"]]), dr = ["disabled", "aria-pressed"], fr = { class: "phlix-chip__label" }, pr = ["disabled", "aria-label"], mr = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Chip",
	props: {
		selected: {
			type: Boolean,
			default: void 0
		},
		removable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		size: { default: "sm" },
		disabled: {
			type: Boolean,
			default: !1
		},
		removeLabel: { default: "Remove" }
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: t }) {
		let n = e, i = t;
		function a() {
			n.disabled || (n.selected !== void 0 && i("update:selected", !n.selected), i("click"));
		}
		return (t, n) => (G(), F("span", { class: V(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [I("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (G(), N(r, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : P("", !0), I("span", fr, [J(t.$slots, "default", {}, void 0, !0)])], 8, dr), e.removable ? (G(), F("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => i("remove")
		}, [R(r, { name: "x" })], 8, pr)) : P("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), hr = { class: "phlix-combobox__field" }, gr = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], _r = ["id", "aria-label"], vr = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], yr = { class: "phlix-combobox__check" }, br = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, xr = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Combobox",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Search…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = M(() => m(n.options)), o = Se(), s = K(!1), c = K(-1), l = K(""), u = K(!1), d = K(null), f = K(null), p = K(null), _ = M(() => a.value.find((e) => e.value === n.modelValue)?.label ?? ""), v = M(() => {
			if (!u.value || l.value.trim() === "") return a.value;
			let e = l.value.toLowerCase();
			return a.value.filter((t) => t.label.toLowerCase().includes(e));
		}), y = M(() => c.value >= 0 ? `${o}-opt-${c.value}` : void 0);
		Z(() => n.modelValue, () => {
			s.value || (l.value = _.value);
		}, { immediate: !0 });
		function b() {
			n.disabled || s.value || (s.value = !0, c.value = v.value.findIndex((e) => e.value === n.modelValue), c.value < 0 && (c.value = v.value.findIndex((e) => !e.disabled)), _e(w));
		}
		function x() {
			l.value = _.value, u.value = !1, s.value = !1;
		}
		function S(e) {
			let t = v.value[e];
			!t || t.disabled || (t.value !== n.modelValue && (i("update:modelValue", t.value), i("change", t.value)), l.value = t.label, u.value = !1, s.value = !1, f.value?.focus());
		}
		function C(e) {
			v.value.length !== 0 && (c.value = g(v.value, c.value, e), _e(w));
		}
		function w() {
			p.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function T(e) {
			l.value = e.target.value, u.value = !0, s.value = !0, c.value = h(v.value, "first");
		}
		function E(e) {
			if (!n.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), s.value ? C(1) : b();
					break;
				case "ArrowUp":
					e.preventDefault(), s.value ? C(-1) : b();
					break;
				case "Enter":
					s.value && c.value >= 0 && (e.preventDefault(), S(c.value));
					break;
				case "Escape":
					s.value && (e.preventDefault(), x());
					break;
				case "Tab":
					s.value && x();
					break;
			}
		}
		function D(e) {
			s.value && d.value && !d.value.contains(e.target) && x();
		}
		return Z(s, (e) => {
			e ? document.addEventListener("pointerdown", D, !0) : document.removeEventListener("pointerdown", D, !0);
		}), U(() => document.removeEventListener("pointerdown", D, !0)), (t, n) => (G(), F("div", {
			ref_key: "rootEl",
			ref: d,
			class: V(["phlix-combobox", {
				"is-open": s.value,
				"is-disabled": e.disabled
			}])
		}, [I("div", hr, [
			R(r, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			I("input", {
				ref_key: "inputEl",
				ref: f,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": s.value,
				"aria-controls": s.value ? `${X(o)}-list` : void 0,
				"aria-activedescendant": s.value ? y.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder,
				disabled: e.disabled,
				value: l.value,
				onInput: T,
				onFocus: b,
				onKeydown: E
			}, null, 40, gr),
			R(r, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Ee(I("ul", {
			id: `${X(o)}-list`,
			ref_key: "listEl",
			ref: p,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(G(!0), F(j, null, q(v.value, (t, n) => (G(), F("li", {
			id: `${X(o)}-opt-${n}`,
			key: t.value,
			class: V(["phlix-combobox__option", {
				"is-active": n === c.value,
				"is-disabled": t.disabled
			}]),
			role: "option",
			"aria-selected": t.value === e.modelValue,
			"aria-disabled": t.disabled || void 0,
			onClick: (e) => S(n),
			onPointermove: (e) => !t.disabled && (c.value = n)
		}, [I("span", yr, [t.value === e.modelValue ? (G(), N(r, {
			key: 0,
			name: "check"
		})) : P("", !0)]), L(" " + Y(t.label), 1)], 42, vr))), 128)), v.value.length === 0 ? (G(), F("li", br, "No matches")) : P("", !0)], 8, _r), [[we, s.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), Sr = { class: "filterbar__main" }, Cr = { class: "filterbar__search" }, wr = { class: "filterbar__sort" }, Tr = ["aria-label"], Er = ["aria-expanded"], Dr = { class: "filterbar__advanced" }, Or = { class: "filterbar__field" }, kr = { class: "filterbar__field" }, Ar = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, jr = { class: "filterbar__field" }, Mr = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Nr = { class: "filterbar__field" }, Pr = { class: "filterbar__years" }, Fr = { class: "filterbar__field filterbar__presets" }, Ir = { class: "filterbar__chips" }, Lr = {
	key: 0,
	class: "filterbar__presets-empty"
}, Rr = {
	key: 0,
	class: "filterbar__preset-save"
}, zr = ["onKeydown"], Br = ["disabled"], Vr = { class: "filterbar__active" }, Hr = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Ur = { class: "filterbar__pills" }, Wr = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "FilterBar",
	props: {
		searchDebounce: { default: 250 },
		sticky: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = vn(), o = $(), s = [
			{
				value: "name",
				label: "Name"
			},
			{
				value: "year",
				label: "Year"
			},
			{
				value: "rating",
				label: "Rating"
			},
			{
				value: "date_added",
				label: "Date added"
			},
			{
				value: "runtime",
				label: "Runtime"
			}
		], c = K(a.search), l;
		Z(() => a.search, (e) => {
			e !== c.value.trim() && (c.value = e);
		});
		function u() {
			clearTimeout(l), l = setTimeout(() => {
				a.setSearch(c.value.trim()), i("change");
			}, n.searchDebounce);
		}
		function d() {
			c.value = "", a.setSearch(""), i("change");
		}
		let f = K(null), p = K(0), m = M(() => a.availableGenres.filter((e) => !a.selectedGenres.includes(e)));
		function h(e) {
			if (e == null || e === "") return;
			let t = String(e);
			a.selectedGenres.includes(t) || (a.setGenres([...a.selectedGenres, t]), i("change")), f.value = null, p.value++;
		}
		function g(e) {
			let t = a.selectedRatings;
			a.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		function y(e) {
			let t = a.selectedTypes;
			a.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		let b = M(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), x = M(() => {
			let e = [];
			for (let t = b.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function S(e) {
			a.setYearRange(e == null || e === "" ? void 0 : Number(e), a.yearTo), i("change");
		}
		function C(e) {
			a.setYearRange(a.yearFrom, e == null || e === "" ? void 0 : Number(e)), i("change");
		}
		function w(e) {
			a.setSort(e), i("change");
		}
		function T() {
			a.order = a.order === "asc" ? "desc" : "asc", a.offset = 0, i("change");
		}
		let E = M(() => {
			let e = [];
			return a.search && e.push({
				key: "search",
				label: `“${a.search}”`,
				remove: d
			}), a.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					a.setGenres(a.selectedGenres.filter((e) => e !== t)), i("change");
				}
			})), a.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => g(t)
			})), a.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => y(t)
			})), a.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${a.yearFrom}`,
				remove: () => S(null)
			}), a.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${a.yearTo}`,
				remove: () => C(null)
			}), e;
		}), D = M(() => E.value.length > 0), O = M(() => a.selectedGenres.length + a.selectedRatings.length + a.selectedTypes.length + (a.yearFrom === void 0 ? 0 : 1) + (a.yearTo === void 0 ? 0 : 1));
		function k() {
			c.value = "", a.setSearch(""), a.setGenres([]), a.setRatings([]), a.setTypes([]), a.setYearRange(void 0, void 0), i("change");
		}
		let A = K(!1), ee = M(() => o.filterPresets), te = K(!1), ne = K("");
		function re() {
			te.value = !0, ne.value = "";
		}
		function ie() {
			let e = ne.value.trim();
			e && (o.saveFilterPreset(e, a.toQuery()), te.value = !1, ne.value = "");
		}
		function ae(e) {
			a.applyQuery(e.query), c.value = a.search, i("change");
		}
		function oe(e) {
			o.removeFilterPreset(e.id);
		}
		let se = K(!1);
		function ce() {
			typeof window > "u" || (se.value = window.scrollY > 24);
		}
		return W(() => {
			n.sticky && typeof window < "u" && (window.addEventListener("scroll", ce, { passive: !0 }), ce());
		}), U(() => {
			clearTimeout(l), typeof window < "u" && window.removeEventListener("scroll", ce);
		}), (t, n) => (G(), F("div", { class: V(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && se.value
		}]) }, [
			I("div", Sr, [
				I("label", Cr, [
					R(r, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					Ee(I("input", {
						"onUpdate:modelValue": n[0] ||= (e) => c.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: u
					}, null, 544), [[Ce, c.value]]),
					c.value ? (G(), F("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: d
					}, [R(r, { name: "x" })])) : P("", !0)
				]),
				I("div", wr, [R(_, {
					"model-value": X(a).sort,
					options: s,
					label: "Sort by",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value"]), I("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${X(a).order === "asc" ? "ascending" : "descending"}`,
					onClick: T
				}, [R(r, { name: X(a).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, Tr)]),
				I("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": A.value,
					onClick: n[1] ||= (e) => A.value = !A.value
				}, [
					R(r, { name: "filter" }),
					n[4] ||= I("span", null, "Filters", -1),
					O.value ? (G(), N(v, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: Q(() => [L(Y(O.value), 1)]),
						_: 1
					})) : P("", !0),
					R(r, {
						name: A.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, Er)
			]),
			R(pe, { name: "filterbar-panel" }, {
				default: Q(() => [Ee(I("div", Dr, [
					I("div", Or, [n[5] ||= I("span", { class: "filterbar__field-label" }, "Genres", -1), (G(), N(xr, {
						key: p.value,
						"model-value": f.value,
						options: m.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": h
					}, null, 8, ["model-value", "options"]))]),
					I("div", kr, [n[6] ||= I("span", { class: "filterbar__field-label" }, "Rating", -1), I("div", Ar, [(G(!0), F(j, null, q(X(a).availableRatings, (e) => (G(), N(mr, {
						key: e,
						selected: X(a).selectedRatings.includes(e),
						"onUpdate:selected": (t) => g(e)
					}, {
						default: Q(() => [L(Y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					I("div", jr, [n[7] ||= I("span", { class: "filterbar__field-label" }, "Type", -1), I("div", Mr, [(G(!0), F(j, null, q(X(a).availableTypes, (e) => (G(), N(mr, {
						key: e,
						selected: X(a).selectedTypes.includes(e),
						"onUpdate:selected": (t) => y(e)
					}, {
						default: Q(() => [L(Y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					I("div", Nr, [n[9] ||= I("span", { class: "filterbar__field-label" }, "Year", -1), I("div", Pr, [
						R(xr, {
							"model-value": X(a).yearFrom ?? null,
							options: x.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": S
						}, null, 8, ["model-value", "options"]),
						n[8] ||= I("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						R(xr, {
							"model-value": X(a).yearTo ?? null,
							options: x.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": C
						}, null, 8, ["model-value", "options"])
					])]),
					I("div", Fr, [
						n[12] ||= I("span", { class: "filterbar__field-label" }, "Presets", -1),
						I("div", Ir, [(G(!0), F(j, null, q(ee.value, (e) => (G(), N(mr, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => ae(e),
							onRemove: (t) => oe(e)
						}, {
							default: Q(() => [L(Y(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ee.value.length ? P("", !0) : (G(), F("span", Lr, "No saved presets"))]),
						te.value ? (G(), F("div", Rr, [Ee(I("input", {
							"onUpdate:modelValue": n[2] ||= (e) => ne.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [De(Oe(ie, ["prevent"]), ["enter"]), n[3] ||= De((e) => te.value = !1, ["esc"])]
						}, null, 40, zr), [[Ce, ne.value]]), I("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ie
						}, [R(r, { name: "check" }), n[10] ||= L(" Save ", -1)])])) : (G(), F("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !D.value,
							onClick: re
						}, [R(r, { name: "plus" }), n[11] ||= L(" Save current ", -1)], 8, Br))
					])
				], 512), [[we, A.value]])]),
				_: 1
			}),
			I("div", Vr, [I("span", Hr, [I("b", null, Y(X(a).total.toLocaleString()), 1), L(" " + Y(X(a).total === 1 ? "title" : "titles"), 1)]), D.value ? (G(), F(j, { key: 0 }, [I("div", Ur, [(G(!0), F(j, null, q(E.value, (e) => (G(), N(mr, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: Q(() => [L(Y(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), I("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: k
			}, "Clear all")], 64)) : P("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), Gr = { class: "browse-page" }, Kr = { class: "browse-toolbar" }, qr = { class: "browse-header" }, Jr = { class: "browse-count numeric" }, Yr = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, Xr = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "BrowsePage",
	setup(e) {
		let t = B("apiBase", ""), n = M(() => typeof t == "string" ? t : t?.value ?? ""), r = B("phlixConfig", null), i = M(() => r?.homeRows ?? []), a = vn(), s = Bt(), c = o(), l = Le(), u = K(null), d = ve(/* @__PURE__ */ new Map());
		function f(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		Z(() => a.items, (e) => f(e), { immediate: !0 });
		let p = M(() => {
			let e = s.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function m() {
			a.reset(), a.fetchMedia(n.value);
		}
		W(m), Z(n, m);
		function h() {
			a.reset(), a.fetchMedia(n.value);
		}
		function g() {
			a.loadMore(n.value);
		}
		function _(e, t) {
			l?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function v(e) {
			_("player", e.id);
		}
		function y(e) {
			c.success(`Added "${e.name}" to your list`);
		}
		function b(e) {
			l?.hasRoute("media") ? _("media", e.id) : c.info(`Details for "${e.name}" are coming soon`);
		}
		function x() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function S(e) {
			a.applyQuery(e.query ?? {}), m(), u.value?.scrollIntoView?.({
				behavior: x() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (e, t) => (G(), F("div", Gr, [
			I("div", Kr, [J(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			p.value.length ? (G(), N(sr, {
				key: 0,
				title: "Continue Watching",
				items: p.value,
				"hide-when-empty": "",
				onPlay: v,
				onWatchlist: y,
				onInfo: b
			}, null, 8, ["items"])) : P("", !0),
			(G(!0), F(j, null, q(i.value, (e) => (G(), N(ur, {
				key: e.id,
				row: e,
				"api-base": n.value,
				onItemsLoaded: f,
				onSeeAll: S,
				onPlay: v,
				onWatchlist: y,
				onInfo: b
			}, null, 8, ["row", "api-base"]))), 128)),
			I("section", {
				ref_key: "gridSection",
				ref: u,
				class: "browse-library"
			}, [
				I("div", qr, [t[0] ||= I("h1", { class: "browse-title" }, "Browse", -1), I("span", Jr, Y(X(a).total.toLocaleString()) + " titles", 1)]),
				R(Wr, { onChange: h }),
				X(a).error ? (G(), F("div", Yr, [I("p", null, Y(X(a).error), 1), I("button", {
					type: "button",
					class: "browse-retry",
					onClick: m
				}, "Retry")])) : P("", !0),
				R(Zn, {
					items: X(a).items,
					loading: X(a).loading && X(a).items.length === 0,
					"loading-more": X(a).loading && X(a).items.length > 0,
					"has-more": X(a).hasMore,
					onLoadMore: g,
					onPlay: v,
					onWatchlist: y,
					onInfo: b
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-214269cb"]]), Zr = { class: "media-detail" }, Qr = { class: "media-detail__bar" }, $r = { class: "media-detail__hero" }, ei = { class: "media-detail__poster" }, ti = ["src", "alt"], ni = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, ri = { class: "media-detail__info" }, ii = { class: "media-detail__title" }, ai = { class: "media-detail__meta numeric" }, oi = {
	key: 0,
	class: "media-detail__meta-item"
}, si = {
	key: 1,
	class: "media-detail__cert"
}, ci = {
	key: 2,
	class: "media-detail__meta-item"
}, li = { class: "media-detail__type" }, ui = {
	key: 0,
	class: "media-detail__genres"
}, di = { class: "media-detail__overview" }, fi = { class: "media-detail__actions" }, pi = { class: "media-detail__resume-at numeric" }, mi = {
	key: 1,
	class: "media-detail__credits"
}, hi = {
	key: 0,
	class: "media-detail__credit"
}, gi = {
	key: 1,
	class: "media-detail__credit"
}, _i = { class: "media-detail__cast" }, vi = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "MediaDetail",
	props: {
		item: {},
		resumeSeconds: { default: null },
		similar: { default: () => [] },
		similarLoading: {
			type: Boolean,
			default: !1
		},
		showBack: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"back"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, a = M(() => n.item.type === "audio" ? "music" : n.item.type === "image" ? "image" : n.item.type === "series" ? "tv" : "film"), o = M(() => n.item.actors?.slice(0, 8) ?? []), s = M(() => {
			let e = n.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(r).padStart(2, "0") : String(r);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), l = K(!1), u = K(null);
		function d() {
			l.value = !0;
		}
		return W(() => {
			u.value?.complete && (l.value = !0);
		}), (t, n) => (G(), F("article", Zr, [
			e.item.poster_url ? (G(), F("div", {
				key: 0,
				class: "media-detail__ambient",
				style: H({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : P("", !0),
			I("div", Qr, [e.showBack ? (G(), N(c, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => i("back")
			}, {
				default: Q(() => [...n[7] ||= [L("Back", -1)]]),
				_: 1
			})) : P("", !0)]),
			I("div", $r, [I("div", ei, [e.item.poster_url ? (G(), F("img", {
				key: 0,
				ref_key: "imgEl",
				ref: u,
				class: V(["media-detail__img", { "is-loaded": l.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: d
			}, null, 42, ti)) : (G(), F("div", ni, [R(r, { name: a.value }, null, 8, ["name"])]))]), I("div", ri, [
				I("h1", ii, Y(e.item.name), 1),
				I("div", ai, [
					e.item.year ? (G(), F("span", oi, [R(r, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), L(Y(e.item.year), 1)])) : P("", !0),
					e.item.rating ? (G(), F("span", si, Y(e.item.rating), 1)) : P("", !0),
					e.item.runtime ? (G(), F("span", ci, Y(e.item.runtime) + "m", 1)) : P("", !0),
					I("span", li, Y(e.item.type), 1)
				]),
				e.item.genres?.length ? (G(), F("div", ui, [(G(!0), F(j, null, q(e.item.genres, (e) => (G(), N(mr, {
					key: e,
					size: "sm"
				}, {
					default: Q(() => [L(Y(e), 1)]),
					_: 2
				}, 1024))), 128))])) : P("", !0),
				I("p", di, Y(e.item.overview || "No overview available."), 1),
				I("div", fi, [
					R(c, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => i("play", e.item)
					}, {
						default: Q(() => [...n[8] ||= [L("Play", -1)]]),
						_: 1
					}),
					s.value ? (G(), N(c, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => i("resume", e.item)
					}, {
						default: Q(() => [n[9] ||= L(" Resume ", -1), I("span", pi, Y(s.value), 1)]),
						_: 1
					})) : P("", !0),
					R(c, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: n[3] ||= (t) => i("watchlist", e.item)
					}, {
						default: Q(() => [...n[10] ||= [L("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || o.value.length ? (G(), F("dl", mi, [e.item.director ? (G(), F("div", hi, [n[11] ||= I("dt", null, "Director", -1), I("dd", null, Y(e.item.director), 1)])) : P("", !0), o.value.length ? (G(), F("div", gi, [n[12] ||= I("dt", null, "Cast", -1), I("dd", _i, [(G(!0), F(j, null, q(o.value, (e) => (G(), N(mr, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: Q(() => [L(Y(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : P("", !0)])) : P("", !0)
			])]),
			e.similarLoading || e.similar.length ? (G(), N(sr, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: n[4] ||= (e) => i("play", e),
				onWatchlist: n[5] ||= (e) => i("watchlist", e),
				onInfo: n[6] ||= (e) => i("info", e)
			}, null, 8, ["items", "loading"])) : P("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), yi = { class: "media-detail-page" }, bi = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, xi = { class: "media-detail-page__loading-hero" }, Si = { class: "media-detail-page__loading-info" }, Ci = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "MediaDetailPage",
	setup(t) {
		let n = B("apiBase", ""), r = M(() => typeof n == "string" ? n : n?.value ?? ""), a = Ie(), s = Le(), l = Bt(), u = o(), d = K(null), f = K([]), m = K(!0), h = K(!1), g = K(null), _ = M(() => String(a.params.id ?? "")), v = M(() => l.resumePositionFor(_.value)), y = null, b = !1;
		function x(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function S(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				f.value = [];
				return;
			}
			let i = y, a = () => b || i !== y;
			h.value = !0;
			try {
				let o = lr(r.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				f.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || x(e)) return;
				f.value = [];
			} finally {
				a() || (h.value = !1);
			}
		}
		async function C() {
			let t = _.value;
			if (y?.abort(), y = typeof AbortController < "u" ? new AbortController() : null, m.value = !0, g.value = null, f.value = [], !t) {
				g.value = "No media id provided", m.value = !1;
				return;
			}
			try {
				let n = new e({ baseUrl: r.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, y?.signal);
				if (b) return;
				d.value = i, m.value = !1, S(n, i);
			} catch (e) {
				if (b || x(e)) return;
				g.value = e instanceof Error ? e.message : "Failed to load title", m.value = !1;
			}
		}
		W(C), Z(_, C), U(() => {
			b = !0, y?.abort(), y = null;
		});
		function w(e, t) {
			s?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function T(e) {
			w("player", e.id);
		}
		function E(e) {
			u.success(`Added "${e.name}" to your list`);
		}
		function D(e) {
			w("media", e.id);
		}
		function O() {
			s?.back();
		}
		return (e, t) => (G(), F("div", yi, [m.value ? (G(), F("div", bi, [I("div", xi, [R(i, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), I("div", Si, [
			R(i, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			R(i, {
				variant: "text",
				lines: 4
			}),
			R(i, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : g.value ? (G(), N(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: g.value
		}, {
			actions: Q(() => [R(c, {
				variant: "solid",
				onClick: C
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			}), R(c, {
				variant: "ghost",
				onClick: O
			}, {
				default: Q(() => [...t[1] ||= [L("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : d.value ? (G(), N(vi, {
			key: 2,
			item: d.value,
			"resume-seconds": v.value,
			similar: f.value,
			"similar-loading": h.value,
			onPlay: T,
			onResume: T,
			onWatchlist: E,
			onInfo: D,
			onBack: O
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : P("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]);
//#endregion
//#region src/components/player/format-time.ts
function wi(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Ti = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], Ei = { class: "scrubber__track" }, Di = ["title"], Oi = { class: "scrubber__time numeric" }, ki = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Scrubber",
	props: {
		position: {},
		duration: {},
		buffered: { default: 0 },
		chapters: { default: () => [] },
		thumbnailAt: {},
		step: { default: 5 }
	},
	emits: [
		"seek",
		"scrub-start",
		"scrub-end"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = K(null), o = K(!1), s = K(!1), c = K(0), l = K(0), u = (e) => Math.min(1, Math.max(0, e)), d = M(() => o.value ? c.value : r.duration > 0 ? u(r.position / r.duration) : 0), f = M(() => r.duration > 0 ? u(r.buffered / r.duration) : 0), p = M(() => (o.value || s.value) && r.duration > 0), m = M(() => o.value ? c.value : l.value), h = M(() => m.value * r.duration), g = M(() => p.value ? r.thumbnailAt?.(h.value) ?? null : null), _ = M(() => g.value ? `url("${g.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), v = M(() => `${Math.min(96, Math.max(4, m.value * 100))}%`), y = M(() => r.duration > 0 ? r.chapters.filter((e) => e.start > 0 && e.start < r.duration).map((e) => ({
			...e,
			ratio: e.start / r.duration
		})) : []);
		function b(e) {
			let t = a.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : u((e.clientX - n.left) / n.width);
		}
		function x(e) {
			if (r.duration <= 0) return;
			o.value = !0;
			try {
				a.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = b(e);
			c.value = t, i("scrub-start"), i("seek", t * r.duration), e.preventDefault();
		}
		function S(e) {
			let t = b(e);
			l.value = t, o.value && (c.value = t, i("seek", t * r.duration));
		}
		function C(e) {
			if (o.value) {
				o.value = !1;
				try {
					a.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				i("scrub-end");
			}
		}
		function w() {
			s.value = !0;
		}
		function T() {
			s.value = !1;
		}
		function E(e) {
			let t = r.duration;
			if (t <= 0) return;
			let n = null;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, r.position - r.step);
					break;
				case "ArrowRight":
					n = Math.min(t, r.position + r.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			i("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: d,
			previewActive: p
		}), (t, n) => (G(), F("div", {
			ref_key: "trackEl",
			ref: a,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": X(wi)(e.position),
			"aria-label": "Seek",
			onPointerdown: x,
			onPointermove: S,
			onPointerup: C,
			onPointercancel: C,
			onPointerenter: w,
			onPointerleave: T,
			onKeydown: E
		}, [I("div", Ei, [
			I("div", {
				class: "scrubber__buffered",
				style: H({ width: `${f.value * 100}%` })
			}, null, 4),
			I("div", {
				class: "scrubber__played",
				style: H({ width: `${d.value * 100}%` })
			}, null, 4),
			(G(!0), F(j, null, q(y.value, (e, t) => (G(), F("span", {
				key: t,
				class: "scrubber__tick",
				style: H({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Di))), 128)),
			I("div", {
				class: V(["scrubber__head", { "is-dragging": o.value }]),
				style: H({ left: `${d.value * 100}%` })
			}, null, 6)
		]), p.value ? (G(), F("div", {
			key: 0,
			class: "scrubber__preview",
			style: H({ left: v.value }),
			"aria-hidden": "true"
		}, [g.value ? (G(), F("div", {
			key: 0,
			class: "scrubber__thumb",
			style: H({ backgroundImage: _.value })
		}, null, 4)) : P("", !0), I("span", Oi, Y(X(wi)(h.value)), 1)], 4)) : P("", !0)], 40, Ti));
	}
}), [["__scopeId", "data-v-b2711211"]]), Ai = [
	{
		id: "playpause",
		keys: ["Space", "K"],
		label: "Play / pause"
	},
	{
		id: "seek5",
		keys: ["ArrowLeft", "ArrowRight"],
		label: "Seek ±5s"
	},
	{
		id: "seek10",
		keys: ["J", "L"],
		label: "Seek ±10s"
	},
	{
		id: "frame",
		keys: [",", "."],
		label: "Frame step (paused)"
	},
	{
		id: "volume",
		keys: ["ArrowUp", "ArrowDown"],
		label: "Volume"
	},
	{
		id: "mute",
		keys: ["M"],
		label: "Mute"
	},
	{
		id: "fullscreen",
		keys: ["F"],
		label: "Fullscreen"
	},
	{
		id: "captions",
		keys: ["C"],
		label: "Captions"
	},
	{
		id: "theater",
		keys: ["T"],
		label: "Theater"
	},
	{
		id: "pip",
		keys: ["I"],
		label: "Picture-in-picture"
	},
	{
		id: "seekpct",
		keys: [
			"0",
			"–",
			"9"
		],
		label: "Seek to %"
	},
	{
		id: "speed",
		keys: ["<", ">"],
		label: "Speed"
	},
	{
		id: "help",
		keys: ["?"],
		label: "This help"
	}
], ji = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Mi = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Ni(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Pi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Fi(e, t) {
	switch (e.key) {
		case " ": return Ni(e.target) ? !1 : (t.playPause(), !0);
		case "k":
		case "K": return t.playPause(), !0;
		case "ArrowLeft": return t.seekBy(-5), !0;
		case "ArrowRight": return t.seekBy(5), !0;
		case "j":
		case "J": return t.seekBy(-10), !0;
		case "l":
		case "L": return t.seekBy(10), !0;
		case ",": return t.frameStep(-1), !0;
		case ".": return t.frameStep(1), !0;
		case "ArrowUp": return t.volumeBy(.05), !0;
		case "ArrowDown": return t.volumeBy(-.05), !0;
		case "m":
		case "M": return t.toggleMute(), !0;
		case "f":
		case "F": return t.toggleFullscreen(), !0;
		case "c":
		case "C": return t.toggleCaptions(), !0;
		case "t":
		case "T": return t.toggleTheater(), !0;
		case "i":
		case "I": return t.togglePip(), !0;
		case "<": return t.speedStep(-1), !0;
		case ">": return t.speedStep(1), !0;
		case "?": return t.toggleHelp(), !0;
		default: return e.key >= "0" && e.key <= "9" ? (t.seekToPercent(Number(e.key) / 10), !0) : !1;
	}
}
function Ii(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Pi(n.target) || Fi(n, e) && n.preventDefault();
	}
	W(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), U(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Li = { class: "shortcuts__head" }, Ri = { class: "shortcuts__grid" }, zi = { class: "shortcuts__keys" }, Bi = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Vi = {
	key: 1,
	class: "shortcuts__key"
}, Hi = { class: "shortcuts__label" }, Ui = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Ai }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = K(null);
		return u(a, xe(n, "open"), {
			lockScroll: !1,
			onEscape: () => (i("close"), !0)
		}), (t, n) => e.open ? (G(), F("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Oe((e) => i("close"), ["self"])
		}, [I("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [I("div", Li, [n[2] ||= I("h3", { class: "shortcuts__title" }, "Keyboard", -1), R(d, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: n[0] ||= (e) => i("close")
		})]), I("ul", Ri, [(G(!0), F(j, null, q(e.shortcuts, (e) => (G(), F("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [I("span", zi, [(G(!0), F(j, null, q(e.keys, (e, t) => (G(), F(j, { key: t }, [e === "–" ? (G(), F("span", Bi, "–")) : (G(), F("kbd", Vi, [X(ji)[e] ? (G(), N(r, {
			key: 0,
			name: X(ji)[e],
			label: X(Mi)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), F(j, { key: 1 }, [L(Y(e), 1)], 64))]))], 64))), 128))]), I("span", Hi, Y(e.label), 1)]))), 128))])], 512)])) : P("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), Wi = { class: "volume" }, Gi = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "VolumeControl",
	setup(e) {
		let t = Bt(), n = $(), r = M(() => t.muted ? 0 : t.volume), i = M(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (G(), F("div", Wi, [R(d, {
			name: i.value,
			label: X(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), R(y, {
			class: "volume__slider",
			"model-value": r.value,
			min: 0,
			max: 1,
			step: .05,
			label: "Volume",
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "format-value"])]));
	}
}), [["__scopeId", "data-v-2768c5e3"]]), Ki = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "SpeedMenu",
	setup(e) {
		let t = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], n = Bt(), r = M(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), N(_, {
			class: "speed-menu",
			"model-value": X(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), qi = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = Bt(), r = $(), i = M(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (G(), N(_, {
			key: 0,
			class: "quality-menu",
			"model-value": X(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"])) : P("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]);
//#endregion
//#region src/components/player/captions.ts
function Ji(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function Yi(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Xi(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Zi(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Qi(e) {
	return e ? Ji(e.textTracks).filter(Yi).map((e, t) => ({
		index: t,
		language: Xi(e, t),
		label: e.label || Zi(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function $i(e) {
	let t = e?.audioTracks;
	return Ji(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Zi(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function ea(e, t) {
	return !e || t == null ? null : Ji(e.textTracks).filter(Yi).find((e, n) => Xi(e, n) === t) ?? null;
}
function ta(e, t) {
	return ea(e, t) != null;
}
function na(e, t) {
	e && Ji(e.textTracks).filter(Yi).forEach((e, n) => {
		try {
			e.mode = Xi(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function ra(e, t) {
	let n = e?.audioTracks;
	Ji(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function ia(e) {
	let t = e?.audioTracks;
	return Ji(t).findIndex((e) => e.enabled);
}
var aa = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function oa(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function sa(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && oa(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(aa, n) ? aa[n] : e;
	});
}
function ca(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => sa(e).trim()).filter((e) => e.length > 0) : [];
}
function la(e) {
	if (!e) return [];
	let t = Ji(e.activeCues), n = [];
	for (let e of t) n.push(...ca(e.text));
	return n;
}
var ua = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, da = [
	{
		value: "sm",
		label: "Small"
	},
	{
		value: "md",
		label: "Medium"
	},
	{
		value: "lg",
		label: "Large"
	},
	{
		value: "xl",
		label: "Extra large"
	}
], fa = [
	{
		value: "#ffffff",
		label: "White"
	},
	{
		value: "#ffd400",
		label: "Yellow"
	},
	{
		value: "#66e0ff",
		label: "Cyan"
	},
	{
		value: "#7cff7c",
		label: "Green"
	}
], pa = [
	{
		value: "none",
		label: "Off"
	},
	{
		value: "semi",
		label: "Semi-transparent"
	},
	{
		value: "solid",
		label: "Solid"
	}
], ma = [
	{
		value: "none",
		label: "None"
	},
	{
		value: "drop-shadow",
		label: "Drop shadow"
	},
	{
		value: "outline",
		label: "Outline"
	},
	{
		value: "raised",
		label: "Raised"
	}
];
function ha(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function ga(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function _a(e) {
	return {
		"--cap-scale": String(ua[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": ha(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": ga(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var va = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = M(() => _a(n.styleConfig)), a = null;
		function o() {
			r.value = la(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), na(n.video, n.language);
			let e = ea(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = la(e)) : r.value = [];
		}
		return Z(() => [n.video, n.language], c, { immediate: !0 }), U(s), t({ lines: r }), (t, n) => r.value.length ? (G(), F("div", {
			key: 0,
			class: V(["player__captions", { "is-lifted": e.lifted }]),
			style: H(i.value)
		}, [(G(!0), F(j, null, q(r.value, (e, t) => (G(), F("p", {
			key: t,
			class: "player__caption-line"
		}, Y(e), 1))), 128))], 6)) : P("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), ya = ["aria-label", "aria-expanded"], ba = { class: "capmenu__head" }, xa = ["aria-checked", "tabindex"], Sa = { class: "capmenu__check" }, Ca = [
	"aria-checked",
	"tabindex",
	"onClick"
], wa = { class: "capmenu__check" }, Ta = { class: "capmenu__optlabel" }, Ea = [
	"aria-checked",
	"tabindex",
	"onClick"
], Da = { class: "capmenu__check" }, Oa = { class: "capmenu__optlabel" }, ka = { class: "capmenu__style" }, Aa = { class: "capmenu__field" }, ja = { class: "capmenu__field" }, Ma = { class: "capmenu__field" }, Na = { class: "capmenu__field" }, Pa = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "CaptionsMenu",
	props: {
		tracks: { default: () => [] },
		audioTracks: { default: () => [] },
		activeAudio: { default: -1 },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "select-audio"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = Bt(), o = $(), s = K(null), c = K(null), l = M(() => a.subtitleLang), f = M(() => n.tracks.some((e) => e.language === l.value)), p = M(() => f.value ? "captions" : "captions-off"), m = M(() => f.value ? n.tracks.findIndex((e) => e.language === l.value) + 1 : 0), h = M(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function g(e) {
			i("update:open", e);
		}
		function v() {
			g(!1);
		}
		function y(e) {
			a.setSubtitle(e), o.defaultSubtitleLang = e;
		}
		function b(e) {
			i("select-audio", e);
		}
		function x(e, t, n) {
			if (t === 0) return null;
			let r = n;
			switch (e.key) {
				case "ArrowDown":
				case "ArrowRight":
					r = (n + 1) % t;
					break;
				case "ArrowUp":
				case "ArrowLeft":
					r = (n - 1 + t) % t;
					break;
				case "Home":
					r = 0;
					break;
				case "End":
					r = t - 1;
					break;
				default: return null;
			}
			return e.preventDefault(), e.currentTarget.querySelectorAll("[role=\"radio\"]")[r]?.focus(), r;
		}
		function S(e) {
			let t = x(e, n.tracks.length + 1, m.value);
			t !== null && y(t === 0 ? null : n.tracks[t - 1].language);
		}
		function C(e) {
			let t = x(e, n.audioTracks.length, h.value);
			t !== null && b(n.audioTracks[t].index);
		}
		function w(e) {
			o.captionStyle = {
				...o.captionStyle,
				size: e
			};
		}
		function T(e) {
			o.captionStyle = {
				...o.captionStyle,
				textColor: String(e)
			};
		}
		function E(e) {
			o.captionStyle = {
				...o.captionStyle,
				background: e
			};
		}
		function D(e) {
			o.captionStyle = {
				...o.captionStyle,
				edge: e
			};
		}
		u(c, xe(n, "open"), {
			lockScroll: !1,
			onEscape: () => (v(), !0)
		});
		function O(e) {
			s.value && !s.value.contains(e.target) && v();
		}
		return Z(() => n.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", O, !0) : document.removeEventListener("pointerdown", O, !0));
		}, { immediate: !0 }), U(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", O, !0);
		}), (t, n) => (G(), F("div", {
			ref_key: "rootEl",
			ref: s,
			class: "capmenu"
		}, [I("button", {
			type: "button",
			class: V(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? "Captions (on)" : "Captions (off)",
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [R(r, { name: p.value }, null, 8, ["name"])], 10, ya), e.open ? (G(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: c,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Captions and subtitles",
			tabindex: "-1"
		}, [
			I("div", ba, [n[2] ||= I("h3", { class: "capmenu__title" }, "Subtitles", -1), R(d, {
				name: "x",
				label: "Close",
				size: "sm",
				onClick: v
			})]),
			I("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Subtitle track",
				onKeydown: S
			}, [I("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => y(null)
			}, [I("span", Sa, [f.value ? P("", !0) : (G(), N(r, {
				key: 0,
				name: "check"
			}))]), n[3] ||= I("span", { class: "capmenu__optlabel" }, "Off", -1)], 8, xa), (G(!0), F(j, null, q(e.tracks, (e, t) => (G(), F("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": l.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => y(e.language)
			}, [I("span", wa, [l.value === e.language ? (G(), N(r, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", Ta, Y(e.label), 1)], 8, Ca))), 128))], 32),
			e.audioTracks.length > 1 ? (G(), F(j, { key: 0 }, [n[4] ||= I("h3", { class: "capmenu__title capmenu__title--sub" }, "Audio", -1), I("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Audio track",
				onKeydown: C
			}, [(G(!0), F(j, null, q(e.audioTracks, (t) => (G(), F("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => b(t.index)
			}, [I("span", Da, [e.activeAudio === t.index ? (G(), N(r, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", Oa, Y(t.label), 1)], 8, Ea))), 128))], 32)], 64)) : P("", !0),
			n[9] ||= I("h3", { class: "capmenu__title capmenu__title--sub" }, "Caption style", -1),
			I("div", ka, [
				I("div", Aa, [n[5] ||= I("span", { class: "capmenu__fieldlabel" }, "Size", -1), R(_, {
					"model-value": X(o).captionStyle.size,
					options: X(da),
					label: "Caption size",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value", "options"])]),
				I("div", ja, [n[6] ||= I("span", { class: "capmenu__fieldlabel" }, "Color", -1), R(_, {
					"model-value": X(o).captionStyle.textColor,
					options: X(fa),
					label: "Caption color",
					"onUpdate:modelValue": T
				}, null, 8, ["model-value", "options"])]),
				I("div", Ma, [n[7] ||= I("span", { class: "capmenu__fieldlabel" }, "Background", -1), R(_, {
					"model-value": X(o).captionStyle.background,
					options: X(pa),
					label: "Caption background",
					"onUpdate:modelValue": E
				}, null, 8, ["model-value", "options"])]),
				I("div", Na, [n[8] ||= I("span", { class: "capmenu__fieldlabel" }, "Edge", -1), R(_, {
					"model-value": X(o).captionStyle.edge,
					options: X(ma),
					label: "Caption edge",
					"onUpdate:modelValue": D
				}, null, 8, ["model-value", "options"])])
			])
		], 512)) : P("", !0)], 512));
	}
}), [["__scopeId", "data-v-aff48a56"]]), Fa = 32, Ia = 18, La = 250, Ra = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function za(e, t, n, r, i, a, o) {
	let s = Math.max(0, Math.min(t, Math.floor(r))), c = Math.max(0, Math.min(n, Math.floor(i))), l = Math.max(s, Math.min(t, Math.ceil(a))), u = Math.max(c, Math.min(n, Math.ceil(o))), d = 0, f = 0, p = 0, m = 0;
	for (let n = c; n < u; n++) for (let r = s; r < l; r++) {
		let i = (n * t + r) * 4;
		d += e[i], f += e[i + 1], p += e[i + 2], m++;
	}
	return m === 0 ? {
		r: 0,
		g: 0,
		b: 0
	} : {
		r: Ra(d / m),
		g: Ra(f / m),
		b: Ra(p / m)
	};
}
function Ba(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: za(e, t, n, 0, 0, r, n),
		right: za(e, t, n, t - r, 0, t, n),
		center: za(e, t, n, 0, 0, t, n)
	};
}
function Va({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Ha({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Ua(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Ha(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Ha(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Ha(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Wa(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Ga = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "AmbientCanvas",
	props: {
		video: { default: null },
		enabled: {
			type: Boolean,
			default: !0
		},
		playing: {
			type: Boolean,
			default: !1
		},
		reducedMotion: {
			type: Boolean,
			default: !1
		},
		intensity: { default: 1 }
	},
	setup(e, { expose: t }) {
		let n = e, r = K(!1), i = null;
		function a() {
			r.value = Wa(i);
		}
		let o = M(() => n.enabled && !n.reducedMotion && !r.value), s = M(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = K(null), l = null, u = null, d = !1, f = !1;
		function p() {
			if (d) return u;
			if (f || typeof document > "u") return f = !0, null;
			l = document.createElement("canvas"), l.width = 32, l.height = 18;
			try {
				u = l.getContext("2d", { willReadFrequently: !0 });
			} catch {
				u = null;
			}
			return u ? (d = !0, u) : (f = !0, null);
		}
		function m() {
			let e = n.video;
			if (!o.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = p();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18);
				c.value = Ua(Ba(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function x(e) {
			_ = e, g = e.requestVideoFrameCallback(S);
		}
		function S(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && x(t);
		}
		function C() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, x(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function w() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		Z(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			w(), e && t && C();
		}, { immediate: !0 }), W(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), U(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = M(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (G(), F("div", {
			class: V(["player__ambient", { "is-active": o.value }]),
			style: H(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), Ka = {
	class: "resume",
	role: "region",
	"aria-label": "Resume playback"
}, qa = { class: "resume__label" }, Ja = { class: "resume__time numeric" }, Ya = { class: "resume__actions" }, Xa = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, i) => (G(), F("div", Ka, [I("p", qa, [
			i[2] ||= L(" Resume from ", -1),
			I("span", Ja, Y(X(wi)(e.seconds)), 1),
			i[3] ||= L("? ", -1)
		]), I("div", Ya, [I("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: i[0] ||= (e) => n("resume")
		}, [R(r, { name: "play" }), i[4] ||= I("span", null, "Resume", -1)]), I("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: i[1] ||= (e) => n("restart")
		}, [R(r, { name: "rewind" }), i[5] ||= I("span", null, "Start over", -1)])])]));
	}
}), [["__scopeId", "data-v-766eae6c"]]), Za = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Qa = [
	"mkv",
	"avi",
	"wmv",
	"flv",
	"ts",
	"m2ts",
	"mts",
	"mpg",
	"mpeg",
	"vob",
	"divx",
	"3gp",
	"rmvb"
], $a = new Set(Qa);
function eo(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function to(...e) {
	return e.some((e) => $a.has(eo(e)));
}
function no(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var ro = 8, io = 15, ao = 2 * Math.PI * 15;
function oo(e, t, n = ao) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var so = {
	class: "upnext",
	role: "region",
	"aria-label": "Up next"
}, co = ["src"], lo = { class: "upnext__body" }, uo = { class: "upnext__title" }, fo = {
	key: 0,
	class: "upnext__cd numeric"
}, po = { class: "upnext__actions" }, mo = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, ho = ["r"], go = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], _o = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "UpNext",
	props: {
		media: {},
		remaining: { default: 0 },
		total: { default: 0 },
		counting: {
			type: Boolean,
			default: !1
		},
		posterUrl: { default: void 0 }
	},
	emits: ["play-now", "cancel"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = M(() => n.posterUrl ?? n.media.poster_url ?? null), o = M(() => oo(n.remaining, n.total));
		return (t, n) => (G(), F("aside", so, [
			a.value ? (G(), F("img", {
				key: 0,
				class: "upnext__thumb",
				src: a.value,
				alt: "",
				loading: "lazy"
			}, null, 8, co)) : P("", !0),
			I("div", lo, [
				n[3] ||= I("p", { class: "upnext__eyebrow" }, "Up next", -1),
				I("h4", uo, Y(e.media.name), 1),
				e.counting ? (G(), F("p", fo, "Starts in " + Y(Math.max(0, e.remaining)) + "s", 1)) : P("", !0),
				I("div", po, [I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: n[0] ||= (e) => i("play-now")
				}, [R(r, { name: "play" }), n[2] ||= I("span", null, "Play now", -1)]), I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: n[1] ||= (e) => i("cancel")
				}, "Cancel")])
			]),
			e.counting ? (G(), F("svg", mo, [I("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, ho), I("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(ao),
				"stroke-dashoffset": o.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, go)])) : P("", !0)
		]));
	}
}), [["__scopeId", "data-v-f81cfb02"]]), vo = {
	class: "transcode",
	role: "alert"
}, yo = { class: "transcode__card" }, bo = { class: "transcode__body" }, xo = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, i) => (G(), F("div", vo, [I("div", yo, [
			R(r, {
				name: "alert",
				class: "transcode__icon"
			}),
			i[3] ||= I("h3", { class: "transcode__heading" }, "Can’t play this file here", -1),
			I("p", bo, [e.title ? (G(), F(j, { key: 0 }, [L("“" + Y(e.title) + "” is", 1)], 64)) : (G(), F(j, { key: 1 }, [L("This title is")], 64)), i[1] ||= L(" in a format your browser can’t play directly (for example MKV or HEVC). Transcoding isn’t available yet. ", -1)]),
			I("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [R(r, { name: "arrow-left" }), i[2] ||= I("span", null, "Go back", -1)])
		])]));
	}
}), [["__scopeId", "data-v-4b751a55"]]), So = { class: "player__stage" }, Co = ["src", "poster"], wo = { class: "player__meta" }, To = { class: "player__meta-text" }, Eo = { class: "player__title" }, Do = { class: "player__sub numeric" }, Oo = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, ko = {
	key: 0,
	class: "player__center"
}, Ao = ["aria-label"], jo = { class: "player__btnrow" }, Mo = ["aria-label"], No = { class: "player__time numeric" }, Po = ["aria-label", "aria-pressed"], Fo = ["aria-label", "aria-pressed"], Io = ["aria-label"], Lo = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		thumbnailAt: { type: Function },
		qualities: {},
		streamUrlFor: { type: Function }
	},
	emits: [
		"back",
		"captions",
		"theater",
		"pip",
		"play-next"
	],
	setup(e, { emit: t }) {
		let n = e, i = t, a = Bt(), o = $(), s = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], c = K(null), l = K(null), u = K(!0), d = K(!1), f = K(!1), p = K(!1), m = K(!1), h = K(!1), g = K(!1), _ = M(() => m.value ? 1.35 : 1), v = K(to(n.streamUrl, n.media.path)), y = K(a.resumePositionFor(n.media.id) ?? 0), b = K(!v.value && y.value > 0), x = null, S = K(!1), C = K(8), w, T = M(() => a.upNext);
		function E() {
			v.value = to(n.streamUrl, n.media.path), y.value = a.resumePositionFor(n.media.id) ?? 0, b.value = !v.value && y.value > 0, x = null, A(), S.value = !1;
		}
		function D(e) {
			let t = c.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : x = Math.max(0, e));
		}
		function O() {
			D(y.value), b.value = !1, c.value?.play()?.catch(() => {});
		}
		function k() {
			x = null, D(0), a.clearResume(n.media.id), b.value = !1, c.value?.play()?.catch(() => {});
		}
		function A() {
			w &&= (clearInterval(w), void 0);
		}
		function ee() {
			C.value = 8, A(), w = setInterval(() => {
				--C.value, C.value <= 0 && (A(), ne());
			}, 1e3);
		}
		function te() {
			a.upNext && (S.value = !0, o.autoplay && ee());
		}
		function ne() {
			A(), S.value = !1;
			let e = a.next(n.streamUrlFor);
			e && i("play-next", e);
		}
		function re() {
			A(), S.value = !1;
		}
		function ie() {
			no(c.value) && (v.value = !0);
		}
		let ae = K([]), oe = K([]), se = K(-1), ce = K(!1), le = a.subtitleLang, ue = M(() => ae.value.some((e) => e.language === a.subtitleLang));
		function de() {
			let e = c.value;
			ae.value = Qi(e), oe.value = $i(e), se.value = ia(e);
		}
		function fe() {
			if (ue.value) le = a.subtitleLang, a.setSubtitle(null);
			else {
				let e = le && ae.value.some((e) => e.language === le) ? le : ae.value[0]?.language ?? null;
				a.setSubtitle(e);
			}
			i("captions");
		}
		function pe(e) {
			ra(c.value, e), se.value = e;
		}
		let me = null, he, ge = M(() => {
			let e = [];
			n.media.year && e.push({ text: String(n.media.year) }), n.media.rating && e.push({
				text: n.media.rating,
				cert: !0
			}), n.media.runtime && e.push({ text: `${n.media.runtime}m` });
			let t = n.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function z() {
			let e = c.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function B(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function _e() {
			a.play();
		}
		function H() {
			a.pause();
		}
		function ve() {
			let e = c.value;
			e && (a.updateProgress(e.currentTime, e.duration, B(e)), a.setMediaPositionState());
		}
		function J() {
			let e = c.value;
			e && (e.volume = a.volume, e.muted = a.muted, e.playbackRate = a.rate, x !== null && (e.currentTime = e.duration ? Math.min(e.duration, x) : x, x = null), a.updateProgress(e.currentTime, e.duration, B(e)), a.setMediaPositionState(), de());
		}
		function ye() {
			let e = c.value;
			e && a.updateProgress(e.currentTime, e.duration, B(e));
		}
		function be() {
			let e = c.value;
			e && (Math.abs(e.volume - a.volume) > .001 && a.setVolume(e.volume), e.muted !== a.muted && a.toggleMute());
		}
		function xe() {
			let e = c.value;
			e && e.playbackRate !== a.rate && a.setRate(e.playbackRate);
		}
		function Se(e) {
			let t = c.value;
			t && a.duration > 0 && (t.currentTime = Math.min(a.duration, Math.max(0, e)));
		}
		function Ce() {
			f.value = !0, Fe();
		}
		function we() {
			f.value = !1, Fe();
		}
		function Te(e) {
			let t = s.reduce((e, t, n) => Math.abs(t - a.rate) < Math.abs(s[e] - a.rate) ? n : e, 0), n = s[Math.min(s.length - 1, Math.max(0, t + e))];
			a.setRate(n);
		}
		Ii({
			playPause: z,
			seekBy: (e) => Se(a.position + e),
			frameStep: (e) => {
				a.playing || Se(a.position + e / 30);
			},
			volumeBy: (e) => a.setVolume(a.volume + e),
			toggleMute: Q,
			toggleFullscreen: De,
			toggleCaptions: fe,
			toggleTheater: Ee,
			togglePip: Ae,
			seekToPercent: (e) => Se(e * a.duration),
			speedStep: Te,
			toggleHelp: () => {
				p.value = !p.value;
			}
		}, { enabled: () => !p.value && !ce.value });
		function Q() {
			a.toggleMute();
		}
		function Ee() {
			m.value = !m.value, i("theater", m.value);
		}
		Z(() => a.muted, (e) => {
			let t = c.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => a.volume, (e) => {
			let t = c.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => a.rate, (e) => {
			let t = c.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function De() {
			if (typeof document > "u") return;
			let e = l.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function ke() {
			d.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Ae() {
			let e = c.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			i("pip");
		}
		function je() {
			h.value = !0;
		}
		function Me() {
			h.value = !1;
		}
		function Ne() {
			he &&= (clearTimeout(he), void 0);
		}
		function Pe() {
			Ne(), !(!a.playing || f.value) && (he = setTimeout(() => {
				a.playing && !f.value && (u.value = !1);
			}, n.idleTimeout ?? 3e3));
		}
		function Fe() {
			u.value = !0, Pe();
		}
		Z(() => a.playing, (e) => {
			e ? (b.value = !1, re(), Pe()) : (Ne(), u.value = !0);
		});
		let Ie = null;
		return W(() => {
			a.setCurrent(n.media, {
				resetPosition: !1,
				streamUrl: n.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", ke), g.value = document.pictureInPictureEnabled === !0), Ie = a.bindMediaSession({
				onPlay: () => void c.value?.play()?.catch(() => {}),
				onPause: () => c.value?.pause(),
				onSeek: (e) => Se(e)
			}), me = c.value?.textTracks ?? null, me?.addEventListener?.("addtrack", de), me?.addEventListener?.("removetrack", de), de();
		}), Z(() => n.media, (e) => {
			a.setCurrent(e, {
				resetPosition: !1,
				streamUrl: n.streamUrl
			}), E();
		}), U(() => {
			Ne(), A(), typeof document < "u" && document.removeEventListener("fullscreenchange", ke), Ie?.(), me?.removeEventListener?.("addtrack", de), me?.removeEventListener?.("removetrack", de);
		}), (t, n) => (G(), F("div", {
			ref_key: "containerRef",
			ref: l,
			class: V(["player", {
				"is-chrome-hidden": !u.value,
				"is-theater": m.value
			}]),
			onPointermove: Fe,
			onPointerdown: Fe,
			onFocusin: Fe
		}, [R(Ga, {
			video: c.value,
			enabled: X(o).atmosphere,
			playing: X(a).playing,
			"reduced-motion": X(o).effectiveReducedMotion,
			intensity: _.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), I("div", So, [
			I("video", {
				ref_key: "videoRef",
				ref: c,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: _e,
				onPause: H,
				onTimeupdate: ve,
				onLoadedmetadata: J,
				onProgress: ye,
				onVolumechange: be,
				onRatechange: xe,
				onEnded: te,
				onError: ie,
				onEnterpictureinpicture: je,
				onLeavepictureinpicture: Me,
				onClick: z
			}, null, 40, Co),
			n[9] ||= I("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[10] ||= I("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			I("div", wo, [I("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: n[0] ||= Oe((e) => i("back"), ["stop"])
			}, [R(r, { name: "arrow-left" })]), I("div", To, [
				n[6] ||= I("p", { class: "player__eyebrow" }, "Now playing", -1),
				I("h2", Eo, Y(e.media.name), 1),
				I("div", Do, [(G(!0), F(j, null, q(ge.value, (e, t) => (G(), F(j, { key: t }, [t > 0 && !e.cert ? (G(), F("span", Oo, "·")) : P("", !0), I("span", { class: V({ player__cert: e.cert }) }, Y(e.text), 3)], 64))), 128))])
			])]),
			v.value ? P("", !0) : (G(), F("div", ko, [I("button", {
				type: "button",
				class: V(["player__bigplay", { "is-playing": X(a).playing }]),
				"aria-label": X(a).playing ? "Pause" : "Play",
				onClick: Oe(z, ["stop"])
			}, [R(r, { name: X(a).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Ao)])),
			R(va, {
				video: c.value,
				language: X(a).subtitleLang,
				"style-config": X(o).captionStyle,
				lifted: u.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			v.value ? P("", !0) : (G(), F("div", {
				key: 1,
				class: "player__controls",
				onClick: n[3] ||= Oe(() => {}, ["stop"])
			}, [R(ki, {
				position: X(a).position,
				duration: X(a).duration,
				buffered: X(a).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: Se,
				onScrubStart: Ce,
				onScrubEnd: we
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), I("div", jo, [
				I("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": X(a).playing ? "Pause" : "Play",
					onClick: z
				}, [R(r, { name: X(a).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Mo),
				I("span", No, [
					L(Y(X(wi)(X(a).position)), 1),
					n[7] ||= I("span", { class: "player__sep" }, " / ", -1),
					L(Y(X(wi)(X(a).duration)), 1)
				]),
				n[8] ||= I("span", { class: "player__grow" }, null, -1),
				R(Gi),
				R(Ki),
				R(qi, { qualities: e.qualities }, null, 8, ["qualities"]),
				R(Pa, {
					open: ce.value,
					"onUpdate:open": n[1] ||= (e) => ce.value = e,
					tracks: ae.value,
					"audio-tracks": oe.value,
					"active-audio": se.value,
					onSelectAudio: pe
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				I("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: n[2] ||= (e) => p.value = !0
				}, [R(r, { name: "info" })]),
				g.value ? (G(), F("button", {
					key: 0,
					type: "button",
					class: V(["player__iconbtn", { "is-on": h.value }]),
					"aria-label": h.value ? "Exit picture-in-picture" : "Picture-in-picture",
					"aria-pressed": h.value,
					onClick: Ae
				}, [R(r, { name: "pip" })], 10, Po)) : P("", !0),
				I("button", {
					type: "button",
					class: V(["player__iconbtn", { "is-on": m.value }]),
					"aria-label": m.value ? "Exit theater mode" : "Theater mode",
					"aria-pressed": m.value,
					onClick: Ee
				}, [R(r, { name: "theater" })], 10, Fo),
				I("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": d.value ? "Exit fullscreen" : "Fullscreen",
					onClick: De
				}, [R(r, { name: d.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Io)
			])])),
			b.value && !v.value ? (G(), N(Xa, {
				key: 2,
				seconds: y.value,
				onResume: O,
				onRestart: k
			}, null, 8, ["seconds"])) : P("", !0),
			S.value && T.value && !v.value ? (G(), N(_o, {
				key: 3,
				media: T.value,
				remaining: C.value,
				total: X(8),
				counting: X(o).autoplay,
				onPlayNow: ne,
				onCancel: re
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : P("", !0),
			v.value ? (G(), N(xo, {
				key: 4,
				title: e.media.name,
				onBack: n[4] ||= (e) => i("back")
			}, null, 8, ["title"])) : P("", !0),
			R(Ui, {
				open: p.value,
				onClose: n[5] ||= (e) => p.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-853f8f80"]]), Ro = { class: "player-page__stage" }, zo = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Bo = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "PlayerPage",
	setup(t) {
		let n = B("apiBase", ""), r = M(() => typeof n == "string" ? n : n?.value ?? ""), a = Ie(), o = Le(), s = Bt(), l = K(null), u = K(""), d = K(!0), f = K(null), m = K(!1), h = M(() => String(a.params.id ?? "")), g = M(() => {
			let e = l.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), _ = null, v = !1;
		function y(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function b(e) {
			return `${r.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		async function x(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				s.setQueue([]);
				return;
			}
			let i = _, a = () => v || i !== _;
			try {
				let o = lr(r.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(o, void 0, i?.signal);
				if (a()) return;
				s.setQueue((c.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (a() || y(e)) return;
				s.setQueue([]);
			}
		}
		async function S() {
			let t = h.value;
			if (_?.abort(), _ = typeof AbortController < "u" ? new AbortController() : null, d.value = !0, f.value = null, s.hideMiniPlayer(), !t) {
				f.value = "No media id provided", d.value = !1;
				return;
			}
			try {
				let n = new e({ baseUrl: r.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, _?.signal);
				if (v) return;
				l.value = i;
				let a = await n.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, _?.signal).catch(() => null);
				if (v) return;
				u.value = a?.url || b(i), d.value = !1, x(n, i);
			} catch (e) {
				if (v || y(e)) return;
				f.value = e instanceof Error ? e.message : "Failed to load media", d.value = !1;
			}
		}
		W(S), Z(h, S), Fe(() => {
			s.current && s.streamUrl && s.showMiniPlayer();
		}), U(() => {
			v = !0, _?.abort(), _ = null;
		});
		function C() {
			o?.back();
		}
		function w(e) {
			o?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function T(e) {
			m.value = e;
		}
		return (e, t) => (G(), F("div", { class: V(["player-page", { "is-theater": m.value }]) }, [g.value && !d.value && !f.value ? (G(), F("div", {
			key: 0,
			class: "player-page__ambient",
			style: H(g.value),
			"aria-hidden": "true"
		}, null, 4)) : P("", !0), I("div", Ro, [d.value ? (G(), F("div", zo, [R(i, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : f.value ? (G(), N(p, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: f.value
		}, {
			actions: Q(() => [R(c, {
				variant: "solid",
				onClick: S
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			}), R(c, {
				variant: "ghost",
				onClick: C
			}, {
				default: Q(() => [...t[1] ||= [L("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : l.value ? (G(), N(Lo, {
			key: 2,
			media: l.value,
			"stream-url": u.value,
			"stream-url-for": b,
			onBack: C,
			onPlayNext: w,
			onTheater: T
		}, null, 8, ["media", "stream-url"])) : P("", !0)])], 2));
	}
}), [["__scopeId", "data-v-1b6296b1"]]), Vo = { class: "authcard" }, Ho = { class: "authcard__body" }, Uo = { class: "authcard__head" }, Wo = {
	key: 0,
	class: "authcard__eyebrow"
}, Go = { class: "authcard__brand" }, Ko = ["src", "alt"], qo = { class: "authcard__wordmark" }, Jo = { class: "authcard__title" }, Yo = {
	key: 1,
	class: "authcard__sub"
}, Xo = {
	key: 0,
	class: "authcard__foot"
}, Zo = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "AuthCard",
	props: {
		eyebrow: {},
		title: {},
		subtitle: {}
	},
	setup(e) {
		let t = B("phlixConfig", null), n = M(() => t?.branding ?? {}), r = M(() => n.value.wordmark ?? "Phlix");
		return (t, i) => (G(), F("section", Vo, [I("div", Ho, [
			I("header", Uo, [
				e.eyebrow ? (G(), F("p", Wo, Y(e.eyebrow), 1)) : P("", !0),
				I("div", Go, [n.value.logoSrc ? (G(), F("img", {
					key: 0,
					src: n.value.logoSrc,
					alt: n.value.logoAlt ?? r.value,
					class: "authcard__logo"
				}, null, 8, Ko)) : P("", !0), I("span", qo, [L(Y(r.value), 1), i[0] ||= I("span", { class: "authcard__dot" }, ".", -1)])]),
				I("h1", Jo, Y(e.title), 1),
				e.subtitle ? (G(), F("p", Yo, Y(e.subtitle), 1)) : P("", !0)
			]),
			J(t.$slots, "default", {}, void 0, !0),
			t.$slots.footer ? (G(), F("div", Xo, [J(t.$slots, "footer", {}, void 0, !0)])) : P("", !0)
		])]));
	}
}), [["__scopeId", "data-v-5ddd2bae"]]), Qo = ["for"], $o = { class: "authfield__wrap" }, es = [
	"id",
	"name",
	"type",
	"value",
	"placeholder",
	"autocomplete",
	"inputmode",
	"required",
	"minlength",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], ts = [
	"aria-label",
	"aria-pressed",
	"disabled"
], ns = ["id"], rs = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "AuthField",
	props: {
		modelValue: {},
		label: {},
		type: { default: "text" },
		id: {},
		name: {},
		placeholder: {},
		autocomplete: {},
		inputmode: {},
		error: { default: null },
		required: {
			type: Boolean,
			default: !1
		},
		minlength: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = Se(), o = M(() => n.id ?? `authfield-${a}`), s = M(() => `${o.value}-msg`), c = K(!1), l = M(() => n.type === "password"), u = M(() => l.value ? c.value ? "text" : "password" : n.type);
		function d(e) {
			i("update:modelValue", e.target.value);
		}
		function f() {
			c.value = !c.value;
		}
		return (t, n) => (G(), F("div", { class: V(["authfield", {
			"is-invalid": !!e.error,
			"has-toggle": l.value
		}]) }, [
			I("label", {
				class: "authfield__label",
				for: o.value
			}, Y(e.label), 9, Qo),
			I("div", $o, [I("input", {
				id: o.value,
				class: "authfield__input",
				name: e.name,
				type: u.value,
				value: e.modelValue,
				placeholder: e.placeholder,
				autocomplete: e.autocomplete,
				inputmode: e.inputmode,
				required: e.required,
				minlength: e.minlength,
				disabled: e.disabled,
				"aria-invalid": e.error ? "true" : void 0,
				"aria-describedby": e.error ? s.value : void 0,
				onInput: d
			}, null, 40, es), l.value ? (G(), F("button", {
				key: 0,
				type: "button",
				class: "authfield__toggle",
				"aria-label": c.value ? "Hide password" : "Show password",
				"aria-pressed": c.value,
				disabled: e.disabled,
				onClick: f
			}, [R(r, { name: c.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, ts)) : P("", !0)]),
			I("p", {
				id: s.value,
				class: "authfield__msg",
				"aria-live": "polite"
			}, Y(e.error || ""), 9, ns)
		], 2));
	}
}), [["__scopeId", "data-v-6ca91c85"]]), is = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, as = { class: "login__oauth" }, os = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, i = lt(), a = o(), s = Le(), l = B("phlixConfig", null), u = M(() => l?.routerBase ?? "/app"), d = M(() => `${u.value}/signup`), f = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, p = K(""), m = K(""), h = K(null), g = K(null);
		function _() {
			return h.value = p.value.trim() ? f.test(p.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", g.value = m.value ? null : "Enter your password.", !h.value && !g.value;
		}
		async function v() {
			_() && (await i.login(p.value.trim(), m.value) ? (n("success"), s.push(u.value)) : a.error(i.error ?? "Sign in failed."));
		}
		return (e, t) => {
			let n = ye("RouterLink");
			return G(), N(Zo, {
				eyebrow: "Member access",
				title: "Welcome back",
				subtitle: "Sign in to continue to your cinema."
			}, {
				footer: Q(() => [t[4] ||= L(" New to Phlix? ", -1), R(n, {
					to: d.value,
					class: "login__link"
				}, {
					default: Q(() => [...t[3] ||= [L("Create an account", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: Q(() => [X(i).error ? (G(), F("p", is, [R(r, {
					name: "alert",
					class: "login__banner-icon"
				}), I("span", null, Y(X(i).error), 1)])) : P("", !0), I("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: Oe(v, ["prevent"])
				}, [
					R(rs, {
						modelValue: p.value,
						"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
						label: "Email",
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: "you@example.com",
						error: h.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(rs, {
						modelValue: m.value,
						"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
						label: "Password",
						type: "password",
						autocomplete: "current-password",
						placeholder: "Your password",
						error: g.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(c, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: X(i).loading
					}, {
						default: Q(() => [L(Y(X(i).loading ? "Signing in…" : "Sign in"), 1)]),
						_: 1
					}, 8, ["loading"]),
					e.$slots.oauth ? (G(), F(j, { key: 0 }, [t[2] ||= I("div", { class: "login__divider" }, "or continue with", -1), I("div", as, [J(e.$slots, "oauth", {}, void 0, !0)])], 64)) : P("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-b06a8c9c"]]), ss = { class: "auth-page" }, cs = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, ls = { class: "auth-page__center" }, us = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "LoginPage",
	setup(e) {
		let t = $();
		return (e, n) => (G(), F("div", ss, [
			R(ze, {
				enabled: X(t).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			X(t).atmosphere ? (G(), F("div", cs)) : P("", !0),
			I("div", ls, [R(os, null, ge({ _: 2 }, [e.$slots.oauth ? {
				name: "oauth",
				fn: Q(() => [J(e.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-bd363f07"]]), ds = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, fs = { class: "signup__oauth" }, ps = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, i = lt(), a = o(), s = Le(), l = B("phlixConfig", null), u = M(() => l?.routerBase ?? "/app"), d = M(() => `${u.value}/login`), f = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, p = K(""), m = K(""), h = K(""), g = K(""), _ = K(null), v = K(null), y = K(null), b = K(null);
		function x() {
			return _.value = p.value.trim() ? f.test(p.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", v.value = m.value.trim() ? m.value.trim().length < 3 ? "Username must be at least 3 characters." : null : "Choose a username.", y.value = h.value ? h.value.length < 8 ? "Password must be at least 8 characters." : null : "Choose a password.", b.value = g.value === h.value ? null : "Passwords do not match.", !_.value && !v.value && !y.value && !b.value;
		}
		async function S() {
			x() && (await i.signup(p.value.trim(), m.value.trim(), h.value) ? (n("success"), s.push(u.value)) : a.error(i.error ?? "Registration failed."));
		}
		return (e, t) => {
			let n = ye("RouterLink");
			return G(), N(Zo, {
				eyebrow: "Now showing",
				title: "Create your account",
				subtitle: "Your private cinema, anywhere."
			}, {
				footer: Q(() => [t[6] ||= L(" Already have an account? ", -1), R(n, {
					to: d.value,
					class: "signup__link"
				}, {
					default: Q(() => [...t[5] ||= [L("Sign in", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: Q(() => [X(i).error ? (G(), F("p", ds, [R(r, {
					name: "alert",
					class: "signup__banner-icon"
				}), I("span", null, Y(X(i).error), 1)])) : P("", !0), I("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: Oe(S, ["prevent"])
				}, [
					R(rs, {
						modelValue: p.value,
						"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
						label: "Email",
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: "you@example.com",
						error: _.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(rs, {
						modelValue: m.value,
						"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
						label: "Username",
						type: "text",
						autocomplete: "username",
						placeholder: "Your username",
						error: v.value,
						minlength: 3,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(rs, {
						modelValue: h.value,
						"onUpdate:modelValue": t[2] ||= (e) => h.value = e,
						label: "Password",
						type: "password",
						autocomplete: "new-password",
						placeholder: "At least 8 characters",
						error: y.value,
						minlength: 8,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(rs, {
						modelValue: g.value,
						"onUpdate:modelValue": t[3] ||= (e) => g.value = e,
						label: "Confirm password",
						type: "password",
						autocomplete: "new-password",
						placeholder: "Repeat your password",
						error: b.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(c, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: X(i).loading
					}, {
						default: Q(() => [L(Y(X(i).loading ? "Creating account…" : "Create account"), 1)]),
						_: 1
					}, 8, ["loading"]),
					e.$slots.oauth ? (G(), F(j, { key: 0 }, [t[4] ||= I("div", { class: "signup__divider" }, "or continue with", -1), I("div", fs, [J(e.$slots, "oauth", {}, void 0, !0)])], 64)) : P("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-21a11f2c"]]), ms = { class: "auth-page" }, hs = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, gs = { class: "auth-page__center" }, _s = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "SignupPage",
	setup(e) {
		let t = $();
		return (e, n) => (G(), F("div", ms, [
			R(ze, {
				enabled: X(t).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			X(t).atmosphere ? (G(), F("div", hs)) : P("", !0),
			I("div", gs, [R(ps, null, ge({ _: 2 }, [e.$slots.oauth ? {
				name: "oauth",
				fn: Q(() => [J(e.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-b98af69c"]]), vs = { class: "phlix-tabs" }, ys = ["aria-label"], bs = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], xs = ["id", "aria-labelledby"], Ss = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = Se(), o = K(null), s = M(() => n.tabs.findIndex((e) => e.value === n.modelValue)), c = (e) => `${a}-tab-${e}`, l = (e) => `${a}-panel-${e}`, u = M(() => n.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function d(e) {
			let t = n.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== n.modelValue && i("update:modelValue", e);
		}
		function f(e) {
			o.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function p(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = g(u.value, s.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = g(u.value, s.value, -1);
					break;
				case "Home":
					t = g(u.value, -1, 1);
					break;
				case "End":
					t = g(u.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), d(n.tabs[t].value), f(t));
		}
		return (t, n) => (G(), F("div", vs, [I("div", {
			ref_key: "listEl",
			ref: o,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: p
		}, [(G(!0), F(j, null, q(e.tabs, (t) => (G(), F("button", {
			id: c(t.value),
			key: t.value,
			type: "button",
			role: "tab",
			class: V(["phlix-tabs__tab", { "is-active": t.value === e.modelValue }]),
			"aria-selected": t.value === e.modelValue,
			"aria-controls": l(t.value),
			tabindex: t.value === e.modelValue ? 0 : -1,
			disabled: t.disabled,
			onClick: (e) => d(t.value)
		}, [t.icon ? (G(), N(r, {
			key: 0,
			name: t.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : P("", !0), L(" " + Y(t.label), 1)], 10, bs))), 128))], 40, ys), e.modelValue ? (G(), F("div", {
			key: 0,
			id: l(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": c(e.modelValue),
			tabindex: "0"
		}, [J(t.$slots, e.modelValue, {}, () => [J(t.$slots, "default", {}, void 0, !0)], !0)], 8, xs)) : P("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), Cs = {
	key: 0,
	class: "aps"
}, ws = { class: "aps__group" }, Ts = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], Es = { class: "aps__theme-label" }, Ds = { class: "aps__group" }, Os = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], ks = { class: "aps__group" }, As = { class: "aps__row" }, js = { class: "aps__row" }, Ms = { class: "aps__row" }, Ns = { class: "aps__label" }, Ps = { class: "aps__value" }, Fs = { class: "aps__slider" }, Is = { class: "aps__group" }, Ls = { class: "aps__row aps__row--switch" }, Rs = { class: "aps__row" }, zs = { class: "aps__foot" }, Bs = {
	key: 1,
	class: "aps"
}, Vs = { class: "aps__group" }, Hs = { class: "aps__row aps__row--switch" }, Us = { class: "aps__row" }, Ws = { class: "aps__label" }, Gs = { class: "aps__value" }, Ks = { class: "aps__slider" }, qs = { class: "aps__row" }, Js = { class: "aps__group" }, Ys = { class: "aps__row" }, Xs = { class: "aps__row" }, Zs = { class: "aps__row" }, Qs = { class: "aps__row" }, $s = { class: "aps__row" }, ec = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let t = $(), n = o(), i = [
			{
				value: "nocturne",
				label: "Nocturne"
			},
			{
				value: "daylight",
				label: "Daylight"
			},
			{
				value: "midnight",
				label: "Midnight"
			}
		], a = [
			{
				value: null,
				label: "Amber",
				swatch: "var(--amber-500)"
			},
			{
				value: "#e5484d",
				label: "Crimson",
				swatch: "#e5484d"
			},
			{
				value: "#d6409f",
				label: "Magenta",
				swatch: "#d6409f"
			},
			{
				value: "#8e4ec6",
				label: "Violet",
				swatch: "#8e4ec6"
			},
			{
				value: "#4c6ef5",
				label: "Azure",
				swatch: "#4c6ef5"
			},
			{
				value: "#0fa3a3",
				label: "Teal",
				swatch: "#0fa3a3"
			},
			{
				value: "#6cc04a",
				label: "Lime",
				swatch: "#6cc04a"
			}
		], s = [{
			value: "comfortable",
			label: "Comfortable"
		}, {
			value: "compact",
			label: "Compact"
		}], l = [
			{
				value: "cozy",
				label: "Cozy"
			},
			{
				value: "comfy",
				label: "Comfy"
			},
			{
				value: "dense",
				label: "Dense"
			}
		], u = [
			{
				value: "auto",
				label: "Match system"
			},
			{
				value: "on",
				label: "Reduced"
			},
			{
				value: "off",
				label: "Full"
			}
		], d = [
			{
				value: "auto",
				label: "Auto"
			},
			{
				value: "4k",
				label: "4K"
			},
			{
				value: "1080p",
				label: "1080p"
			},
			{
				value: "720p",
				label: "720p"
			},
			{
				value: "480p",
				label: "480p"
			}
		], f = [
			{
				value: "",
				label: "Off"
			},
			{
				value: "en",
				label: "English"
			},
			{
				value: "es",
				label: "Spanish"
			},
			{
				value: "fr",
				label: "French"
			},
			{
				value: "de",
				label: "German"
			},
			{
				value: "ja",
				label: "Japanese"
			}
		], p = (e) => `${Math.round(e * 100)}%`, m = (e) => `${e}px`;
		function h(e) {
			t.defaultSubtitleLang = e === "" ? null : String(e);
		}
		function g(e, n) {
			t.captionStyle = {
				...t.captionStyle,
				[e]: n
			};
		}
		let v = M(() => Math.max(0, i.findIndex((e) => e.value === t.theme))), b = M(() => Math.max(0, a.findIndex((e) => e.value === t.accent)));
		function S(e, t, n) {
			if (t === 0) return null;
			let r = n;
			switch (e.key) {
				case "ArrowDown":
				case "ArrowRight":
					r = (n + 1) % t;
					break;
				case "ArrowUp":
				case "ArrowLeft":
					r = (n - 1 + t) % t;
					break;
				case "Home":
					r = 0;
					break;
				case "End":
					r = t - 1;
					break;
				default: return null;
			}
			return e.preventDefault(), e.currentTarget.querySelectorAll("[role=\"radio\"]")[r]?.focus(), r;
		}
		function C(e) {
			let n = S(e, i.length, v.value);
			n !== null && (t.theme = i[n].value);
		}
		function w(e) {
			let n = S(e, a.length, b.value);
			n !== null && (t.accent = a[n].value);
		}
		let T = K(!1), E;
		function D() {
			if (!T.value) {
				T.value = !0, clearTimeout(E), E = setTimeout(() => T.value = !1, 3500);
				return;
			}
			clearTimeout(E), T.value = !1, t.reset(), n.info("Preferences reset to defaults.");
		}
		return U(() => clearTimeout(E)), (n, o) => e.panel === "appearance" ? (G(), F("div", Cs, [
			I("section", ws, [o[13] ||= I("h3", { class: "aps__title" }, "Theme", -1), I("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": "Theme",
				onKeydown: C
			}, [(G(), F(j, null, q(i, (e, n) => I("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: V(["aps__theme", { "is-active": X(t).theme === e.value }]),
				"aria-checked": X(t).theme === e.value,
				tabindex: v.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (n) => X(t).theme = e.value
			}, [o[12] ||= I("span", { class: "aps__preview" }, [I("span", { class: "aps__preview-bar" }), I("span", { class: "aps__preview-card" })], -1), I("span", Es, [L(Y(e.label) + " ", 1), X(t).theme === e.value ? (G(), N(r, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : P("", !0)])], 10, Ts)), 64))], 32)]),
			I("section", Ds, [o[14] ||= I("h3", { class: "aps__title" }, "Accent", -1), I("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": "Accent color",
				onKeydown: w
			}, [(G(), F(j, null, q(a, (e, n) => I("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: V(["aps__accent", { "is-active": X(t).accent === e.value }]),
				"aria-checked": X(t).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: b.value === n ? 0 : -1,
				onClick: (n) => X(t).accent = e.value
			}, [I("span", {
				class: "aps__accent-dot",
				style: H({ background: e.swatch })
			}, [X(t).accent === e.value ? (G(), N(r, {
				key: 0,
				name: "check"
			})) : P("", !0)], 4)], 10, Os)), 64))], 32)]),
			I("section", ks, [
				o[18] ||= I("h3", { class: "aps__title" }, "Display", -1),
				I("div", As, [o[15] ||= I("span", {
					class: "aps__label",
					id: "aps-density"
				}, "Density", -1), R(_, {
					"model-value": X(t).density,
					options: s,
					label: "Density",
					"onUpdate:modelValue": o[0] ||= (e) => X(t).density = e
				}, null, 8, ["model-value"])]),
				I("div", js, [o[16] ||= I("span", { class: "aps__label" }, "Grid density", -1), R(_, {
					"model-value": X(t).gridDensity,
					options: l,
					label: "Grid density",
					"onUpdate:modelValue": o[1] ||= (e) => X(t).gridDensity = e
				}, null, 8, ["model-value"])]),
				I("div", Ms, [I("span", Ns, [o[17] ||= L("Card size ", -1), I("span", Ps, Y(m(X(t).cardSize)), 1)]), I("div", Fs, [R(y, {
					"model-value": X(t).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: "Card size",
					"format-value": m,
					"onUpdate:modelValue": o[2] ||= (e) => X(t).cardSize = e
				}, null, 8, ["model-value"])])])
			]),
			I("section", Is, [
				o[20] ||= I("h3", { class: "aps__title" }, "Atmosphere", -1),
				I("div", Ls, [R(x, {
					"model-value": X(t).atmosphere,
					label: "Film-grain + ambient glow",
					"onUpdate:modelValue": o[3] ||= (e) => X(t).atmosphere = e
				}, null, 8, ["model-value"])]),
				I("div", Rs, [o[19] ||= I("span", { class: "aps__label" }, "Motion", -1), R(_, {
					"model-value": X(t).reducedMotion,
					options: u,
					label: "Motion",
					"onUpdate:modelValue": o[4] ||= (e) => X(t).reducedMotion = e
				}, null, 8, ["model-value"])])
			]),
			I("div", zs, [R(c, {
				variant: "ghost",
				"left-icon": T.value ? "alert" : "rewind",
				onClick: D
			}, {
				default: Q(() => [L(Y(T.value ? "Click again to confirm reset" : "Reset all preferences"), 1)]),
				_: 1
			}, 8, ["left-icon"])])
		])) : (G(), F("div", Bs, [I("section", Vs, [
			o[23] ||= I("h3", { class: "aps__title" }, "Playback", -1),
			I("div", Hs, [R(x, {
				"model-value": X(t).autoplay,
				label: "Autoplay next episode",
				"onUpdate:modelValue": o[5] ||= (e) => X(t).autoplay = e
			}, null, 8, ["model-value"])]),
			I("div", Us, [I("span", Ws, [o[21] ||= L("Default volume ", -1), I("span", Gs, Y(p(X(t).defaultVolume)), 1)]), I("div", Ks, [R(y, {
				"model-value": X(t).defaultVolume,
				min: 0,
				max: 1,
				step: .05,
				label: "Default volume",
				"format-value": p,
				"onUpdate:modelValue": o[6] ||= (e) => X(t).defaultVolume = e
			}, null, 8, ["model-value"])])]),
			I("div", qs, [o[22] ||= I("span", { class: "aps__label" }, "Default quality", -1), R(_, {
				"model-value": X(t).defaultQuality,
				options: d,
				label: "Default quality",
				"onUpdate:modelValue": o[7] ||= (e) => X(t).defaultQuality = String(e)
			}, null, 8, ["model-value"])])
		]), I("section", Js, [
			o[29] ||= I("h3", { class: "aps__title" }, "Subtitles", -1),
			I("div", Ys, [o[24] ||= I("span", { class: "aps__label" }, "Default language", -1), R(_, {
				"model-value": X(t).defaultSubtitleLang ?? "",
				options: f,
				label: "Default subtitle language",
				"onUpdate:modelValue": h
			}, null, 8, ["model-value"])]),
			I("div", Xs, [o[25] ||= I("span", { class: "aps__label" }, "Caption size", -1), R(_, {
				"model-value": X(t).captionStyle.size,
				options: X(da),
				label: "Caption size",
				"onUpdate:modelValue": o[8] ||= (e) => g("size", e)
			}, null, 8, ["model-value", "options"])]),
			I("div", Zs, [o[26] ||= I("span", { class: "aps__label" }, "Caption color", -1), R(_, {
				"model-value": X(t).captionStyle.textColor,
				options: X(fa),
				label: "Caption color",
				"onUpdate:modelValue": o[9] ||= (e) => g("textColor", String(e))
			}, null, 8, ["model-value", "options"])]),
			I("div", Qs, [o[27] ||= I("span", { class: "aps__label" }, "Caption background", -1), R(_, {
				"model-value": X(t).captionStyle.background,
				options: X(pa),
				label: "Caption background",
				"onUpdate:modelValue": o[10] ||= (e) => g("background", e)
			}, null, 8, ["model-value", "options"])]),
			I("div", $s, [o[28] ||= I("span", { class: "aps__label" }, "Caption edge", -1), R(_, {
				"model-value": X(t).captionStyle.edge,
				options: X(ma),
				label: "Caption edge",
				"onUpdate:modelValue": o[11] ||= (e) => g("edge", e)
			}, null, 8, ["model-value", "options"])])
		])]));
	}
}), [["__scopeId", "data-v-2a591f61"]]), tc = { class: "setform" }, nc = {
	key: 0,
	class: "setform__loading"
}, rc = { class: "setform__head" }, ic = { class: "setform__title" }, ac = {
	key: 0,
	class: "setform__dirty"
}, oc = ["for"], sc = [
	"id",
	"type",
	"value",
	"onInput"
], cc = { class: "setform__actions" }, lc = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: n }) {
		let r = e, a = n, s = lt(), l = o(), u = K({}), d = K({}), f = K(!0), m = K(null), h = K(null), g = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], _ = M(() => r.groups ? g.filter((e) => r.groups.includes(e)) : g), v = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, y = {
			"hwaccel.enabled": {
				label: "Hardware acceleration",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.prefer_hardware": {
				label: "Prefer hardware encoding",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.probe_timeout": {
				label: "HW probe timeout (s)",
				type: "number",
				group: "transcoding"
			},
			"tmdb.api_key": {
				label: "TMDB API Key",
				type: "string",
				group: "metadata"
			},
			"marker_detection.similarity_threshold": {
				label: "Intro similarity threshold",
				type: "number",
				group: "markers"
			},
			"marker_detection.intro_max_duration": {
				label: "Max intro duration (s)",
				type: "number",
				group: "markers"
			},
			"subtitles.enabled": {
				label: "Enable subtitles",
				type: "bool",
				group: "subtitles"
			},
			"subtitles.default_language": {
				label: "Default subtitle language",
				type: "string",
				group: "subtitles"
			},
			"subtitles.burn_in_by_default": {
				label: "Burn in subtitles by default",
				type: "bool",
				group: "subtitles"
			},
			"discovery.discovery_port": {
				label: "Discovery port",
				type: "number",
				group: "discovery"
			},
			"trickplay.enabled": {
				label: "Enable trickplay",
				type: "bool",
				group: "trickplay"
			},
			"trickplay.interval_seconds": {
				label: "Trickplay interval (s)",
				type: "number",
				group: "trickplay"
			},
			"newsletter.enabled": {
				label: "Enable newsletter",
				type: "bool",
				group: "newsletter"
			},
			"newsletter.send_hour": {
				label: "Newsletter send hour",
				type: "number",
				group: "newsletter"
			},
			"port-forward.port_forwarding.upnp_enabled": {
				label: "Enable UPnP",
				type: "bool",
				group: "port-forward"
			},
			"trakt.client_id": {
				label: "Trakt client ID",
				type: "string",
				group: "scrobblers"
			},
			"trakt.client_secret": {
				label: "Trakt client secret",
				type: "string",
				group: "scrobblers"
			},
			"trakt.redirect_uri": {
				label: "Trakt redirect URI",
				type: "string",
				group: "scrobblers"
			}
		};
		function b(e) {
			return Object.keys(y).filter((t) => y[t].group === e);
		}
		function S(e, t) {
			let n = t.target.value;
			if (n === "") return D(e, 0);
			let r = Number(n);
			Number.isFinite(r) && D(e, r);
		}
		function C(e, n) {
			return n === "bool" ? t(e) : n === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function w() {
			f.value = !0, m.value = null;
			try {
				let e = await s.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(y)) t[n] = C(e[n], r.type);
				u.value = t, d.value = structuredClone(t);
			} catch (e) {
				m.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				f.value = !1;
			}
		}
		function T(e) {
			return b(e).some((e) => u.value[e] !== d.value[e]);
		}
		async function E(e) {
			h.value = e;
			try {
				let t = {};
				for (let n of b(e)) t[n] = u.value[n];
				await s.client.put("/api/v1/users/me/settings", t);
				for (let t of b(e)) d.value[t] = u.value[t];
				l.success(`${v[e]} settings saved.`), a("saved", u.value);
			} catch (t) {
				l.error(t instanceof Error ? t.message : `Failed to save ${v[e]} settings`);
			} finally {
				h.value = null;
			}
		}
		function D(e, t) {
			u.value[e] = t;
		}
		return W(w), (e, t) => (G(), F("div", tc, [f.value ? (G(), F("div", nc, [(G(), F(j, null, q(3, (e) => R(i, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : m.value ? (G(), N(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: m.value
		}, {
			actions: Q(() => [R(c, {
				"left-icon": "rewind",
				onClick: w
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (G(!0), F(j, { key: 2 }, q(_.value, (e) => (G(), F("section", {
			key: e,
			class: "setform__group"
		}, [
			I("header", rc, [I("h3", ic, Y(v[e]), 1), T(e) ? (G(), F("span", ac, "Unsaved")) : P("", !0)]),
			(G(!0), F(j, null, q(b(e), (e) => (G(), F("div", {
				key: e,
				class: V(["setform__row", { "setform__row--switch": y[e].type === "bool" }])
			}, [y[e].type === "bool" ? (G(), N(x, {
				key: 0,
				"model-value": !!u.value[e],
				label: y[e].label,
				"onUpdate:modelValue": (t) => D(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (G(), F(j, { key: 1 }, [I("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, Y(y[e].label), 9, oc), I("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: y[e].type === "number" ? "number" : "text",
				value: u.value[e] ?? "",
				onInput: (t) => y[e].type === "number" ? S(e, t) : D(e, t.target.value)
			}, null, 40, sc)], 64))], 2))), 128)),
			I("div", cc, [R(c, {
				variant: "solid",
				size: "sm",
				disabled: !T(e),
				loading: h.value === e,
				onClick: (t) => E(e)
			}, {
				default: Q(() => [L(" Save " + Y(v[e]), 1)]),
				_: 2
			}, 1032, [
				"disabled",
				"loading",
				"onClick"
			])])
		]))), 128))]));
	}
}), [["__scopeId", "data-v-eea8b5b5"]]), uc = { class: "settings-page" }, dc = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "SettingsPage",
	setup(e) {
		let t = [
			{
				value: "appearance",
				label: "Appearance",
				icon: "sun"
			},
			{
				value: "playback",
				label: "Playback",
				icon: "play"
			},
			{
				value: "server",
				label: "Server",
				icon: "settings"
			}
		], n = K("appearance");
		return (e, r) => (G(), F("div", uc, [r[1] ||= I("header", { class: "settings-page__head" }, [I("p", { class: "settings-page__eyebrow" }, "Preferences"), I("h1", { class: "settings-page__title" }, "Settings")], -1), R(Ss, {
			modelValue: n.value,
			"onUpdate:modelValue": r[0] ||= (e) => n.value = e,
			tabs: t,
			label: "Settings sections"
		}, {
			appearance: Q(() => [R(ec, { panel: "appearance" })]),
			playback: Q(() => [R(ec, { panel: "playback" })]),
			server: Q(() => [R(lc)]),
			_: 1
		}, 8, ["modelValue"])]));
	}
}), [["__scopeId", "data-v-1dba1556"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function fc() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function pc(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: Xr
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: Ci
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: Bo
		},
		{
			path: `${t}/login`,
			name: "login",
			component: us
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: _s
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: dc
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: mn,
		props: { appName: e.app }
	}), n;
}
function mc(e) {
	let t = {
		...fc(),
		...e
	};
	on(t.defaultTheme);
	let n = ke();
	t.defaultTheme && !Ze() && ($(n).theme = t.defaultTheme);
	let r = Ne({
		history: Pe(t.routerBase || "/app"),
		routes: pc(t)
	}), i = he(dn);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var hc = ["id"], gc = /*#__PURE__*/ l(/* @__PURE__ */ z({
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
		let t = e, n = Se(), r = K(!1), i = K(null), a;
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
		return U(() => clearTimeout(a)), (t, a) => (G(), F("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: De(c, ["esc"])
		}, [J(t.$slots, "default", {}, void 0, !0), R(pe, { name: "phlix-tooltip" }, {
			default: Q(() => [r.value && (e.text || t.$slots.content) ? (G(), F("span", {
				key: 0,
				id: X(n),
				role: "tooltip",
				class: V(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [J(t.$slots, "content", {}, () => [L(Y(e.text), 1)], !0)], 10, hc)) : P("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), _c = ["role"], vc = { class: "phlix-toast__content" }, yc = {
	key: 0,
	class: "phlix-toast__title"
}, bc = { class: "phlix-toast__message" }, xc = ["onClick"], Sc = 0, Cc = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let t = o(), n = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, i = (e) => e.icon ?? n[e.tone];
		return W(() => {
			Sc++;
		}), U(() => {
			Sc--;
		}), (n, a) => (G(), N(fe, { to: "body" }, [I("div", {
			class: V(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [R(me, { name: "phlix-toast" }, {
			default: Q(() => [(G(!0), F(j, null, q(X(t).toasts, (e) => (G(), F("div", {
				key: e.id,
				class: V(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				R(r, {
					name: i(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				I("div", vc, [e.title ? (G(), F("p", yc, Y(e.title), 1)) : P("", !0), I("p", bc, Y(e.message), 1)]),
				e.action ? (G(), F("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (n) => {
						e.action.onClick(), X(t).dismiss(e.id);
					}
				}, Y(e.action.label), 9, xc)) : P("", !0),
				R(d, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (n) => X(t).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, _c))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), wc = ["aria-label"], Tc = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = M(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, i) => (G(), F("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: H(n.value ? { fontSize: n.value } : void 0)
		}, [R(r, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, wc));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Ec = /*#__PURE__*/ l(/* @__PURE__ */ z({
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
		let t = e, n = K(null), r = K(!1), i = K(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return W(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), U(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (G(), N(be(e.tag), {
			ref_key: "el",
			ref: n,
			class: V(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: H({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: Q(() => [J(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Dc = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (G(), N(pe, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: Q(() => [J(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]);
//#endregion
//#region src/app/admin.ts
function Oc(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => import("./DashboardPage-Xyg1jzSG.js")
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => import("./UsersPage-Dop-xeqE.js")
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => import("./LogsPage-DOrNU1kL.js")
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => import("./WebhooksPage-DBsokdnV.js")
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => import("./ServicesPage-AsN_xFlL.js")
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => import("./IntegrationsPage-DMrtiVkF.js")
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => import("./BackupPage-BddgbYeH.js")
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => import("./CastDevicesPage-BRCKuJHb.js")
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => import("./DlnaServerPage-CIhQynpF.js")
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => import("./RemoteAccessPage-B7nkXFPC.js")
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => import("./LiveTvPage-CZ7gePEY.js")
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => import("./CollectionsPage-DL9T81e6.js")
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => import("./HistoryPage-DfFsp8u2.js")
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => import("./SyncPlayPage-BkzRrzeh.js")
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => import("./LibrariesPage-DE6bFfH3.js")
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => import("./SettingsPage-Bg3Eaa6e.js")
		}
	];
}
function kc(e = "/app") {
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
var Ac = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, jc = {
	key: 0,
	class: "library-scan__skel"
}, Mc = {
	key: 3,
	class: "library-scan__table-wrap"
}, Nc = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Pc = { class: "library-scan__name" }, Fc = {
	key: 0,
	class: "library-scan__paths"
}, Ic = { class: "library-scan__num" }, Lc = { class: "library-scan__date" }, Rc = ["data-testid"], zc = {
	key: 0,
	class: "library-scan__error"
}, Bc = { class: "library-scan__actions" }, Vc = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, n = o(), r = K([]), a = K({}), l = K(!0), u = K(null);
		function d(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		async function f() {
			l.value = !0, u.value = null;
			try {
				r.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of r.value) m(e.id);
			} catch (e) {
				u.value = d(e, "Failed to load libraries."), n.error(u.value);
			} finally {
				l.value = !1;
			}
		}
		async function m(e) {
			try {
				let n = await t.get(`/api/v1/libraries/${e}/scan-status`), r = n.scan_status ?? n.job ?? null;
				r && (a.value = {
					...a.value,
					[e]: r
				});
			} catch {}
		}
		async function h(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/scan`), n.success("Scan queued."), await m(e);
			} catch (e) {
				n.error(d(e, "Failed to trigger scan."));
			}
		}
		async function g(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), n.success("Rescan queued."), await m(e);
			} catch (e) {
				n.error(d(e, "Failed to trigger rescan."));
			}
		}
		function _(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function y(e) {
			return e?.status === "running" || e?.status === "queued";
		}
		function b(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function x(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		return W(f), (e, t) => (G(), F("section", Ac, [t[4] ||= I("header", { class: "library-scan__head" }, [I("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), I("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), l.value ? (G(), F("div", jc, [R(i, {
			variant: "text",
			lines: 6
		})])) : u.value ? (G(), N(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: u.value
		}, {
			actions: Q(() => [R(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: f
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (G(), N(p, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (G(), F("div", Mc, [I("table", Nc, [t[3] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Library"),
			I("th", { scope: "col" }, "Type"),
			I("th", { scope: "col" }, "Items"),
			I("th", { scope: "col" }, "Last scan"),
			I("th", { scope: "col" }, "Status"),
			I("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(G(!0), F(j, null, q(r.value, (e) => (G(), F("tr", { key: e.id }, [
			I("td", null, [I("div", Pc, Y(e.name), 1), e.paths.length ? (G(), F("div", Fc, Y(e.paths.join(", ")), 1)) : P("", !0)]),
			I("td", null, Y(e.type), 1),
			I("td", Ic, Y(e.item_count === void 0 ? "—" : e.item_count), 1),
			I("td", Lc, Y(_(e.last_scan_at)), 1),
			I("td", null, [I("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [R(v, { tone: x(a.value[e.id]) }, {
				default: Q(() => [L(Y(b(a.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), a.value[e.id]?.status === "failed" && a.value[e.id]?.error ? (G(), F("span", zc, Y(a.value[e.id]?.error), 1)) : P("", !0)], 8, Rc)]),
			I("td", null, [I("div", Bc, [R(c, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: y(a.value[e.id]),
				onClick: (t) => h(e.id)
			}, {
				default: Q(() => [...t[1] ||= [L(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), R(c, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: y(a.value[e.id]),
				onClick: (t) => g(e.id)
			}, {
				default: Q(() => [...t[2] ||= [L(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-07dfe349"]]), Hc = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Uc = { class: "my-servers__head" }, Wc = {
	key: 0,
	class: "my-servers__skel"
}, Gc = {
	key: 3,
	class: "my-servers__table-wrap"
}, Kc = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, qc = { class: "my-servers__name" }, Jc = { class: "my-servers__url" }, Yc = { class: "my-servers__num" }, Xc = { class: "my-servers__date" }, Zc = ["data-testid"], Qc = { class: "my-servers__actions" }, $c = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, n = o(), r = K([]), a = K(!0), l = K(null);
		function u(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		async function d() {
			a.value = !0, l.value = null;
			try {
				r.value = (await t.get("/api/v1/servers")).servers || [];
			} catch (e) {
				l.value = u(e, "Failed to load servers."), n.error(l.value);
			} finally {
				a.value = !1;
			}
		}
		function f(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function m(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function h(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		return W(d), (e, t) => (G(), F("section", Hc, [I("header", Uc, [t[1] ||= I("div", null, [I("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), I("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), R(c, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: Q(() => [...t[0] ||= [L("Add server", -1)]]),
			_: 1
		})]), a.value ? (G(), F("div", Wc, [R(i, {
			variant: "text",
			lines: 6
		})])) : l.value ? (G(), N(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: l.value
		}, {
			actions: Q(() => [R(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: d
			}, {
				default: Q(() => [...t[2] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (G(), N(p, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: Q(() => [R(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: Q(() => [...t[3] ||= [L("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (G(), F("div", Gc, [I("table", Kc, [t[5] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Server"),
			I("th", { scope: "col" }, "Owner"),
			I("th", { scope: "col" }, "Libraries"),
			I("th", { scope: "col" }, "Last seen"),
			I("th", { scope: "col" }, "Status"),
			I("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(G(!0), F(j, null, q(r.value, (e) => (G(), F("tr", { key: e.id }, [
			I("td", null, [I("div", qc, Y(e.name), 1), I("div", Jc, Y(e.url), 1)]),
			I("td", null, Y(e.owner), 1),
			I("td", Yc, Y(e.library_count === void 0 ? "—" : e.library_count), 1),
			I("td", Xc, Y(f(e.last_seen)), 1),
			I("td", null, [I("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [R(v, { tone: h(e.status) }, {
				default: Q(() => [L(Y(m(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Zc)]),
			I("td", null, [I("div", Qc, [R(c, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: Q(() => [...t[4] ||= [L("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-9d8dc866"]]), el = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, tl = {
	key: 0,
	class: "federation__skel"
}, nl = {
	key: 2,
	class: "federation__content"
}, rl = {
	key: 1,
	class: "federation__table-wrap"
}, il = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, al = { class: "federation__name" }, ol = { class: "federation__url" }, sl = { class: "federation__num" }, cl = { class: "federation__date" }, ll = ["data-testid"], ul = { class: "federation__actions" }, dl = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, fl = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, n = o(), r = K([]), a = K(!0), l = K(null), u = K(""), d = K(!1);
		function f(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		async function m(e = !1) {
			e && (a.value = !0), l.value = null;
			try {
				r.value = (await t.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				l.value = f(e, "Failed to load federation peers."), n.error(l.value);
			} finally {
				e && (a.value = !1);
			}
		}
		async function h() {
			let e = u.value.trim();
			if (e) {
				d.value = !0;
				try {
					await t.post("/api/v1/federation/connect", { url: e }), n.success("Peer connection requested."), u.value = "", await m();
				} catch (e) {
					n.error(f(e, "Failed to connect to peer."));
				} finally {
					d.value = !1;
				}
			}
		}
		async function g(e) {
			try {
				await t.post(`/api/v1/federation/peers/${e}/disconnect`), n.success("Peer disconnected."), await m();
			} catch (e) {
				n.error(f(e, "Failed to disconnect peer."));
			}
		}
		function _(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function y(e) {
			switch (e) {
				case "connected": return "Connected";
				case "disconnected": return "Disconnected";
				case "pending": return "Pending";
				default: return e;
			}
		}
		function b(e) {
			switch (e) {
				case "connected": return "success";
				case "disconnected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		return W(() => m(!0)), (e, t) => (G(), F("section", el, [t[8] ||= I("header", { class: "federation__head" }, [I("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), I("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), a.value ? (G(), F("div", tl, [R(i, {
			variant: "text",
			lines: 6
		})])) : l.value ? (G(), N(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: l.value
		}, {
			actions: Q(() => [R(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => m(!0)
			}, {
				default: Q(() => [...t[2] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (G(), F("div", nl, [
			t[7] ||= I("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (G(), N(p, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (G(), F("div", rl, [I("table", il, [t[4] ||= I("thead", null, [I("tr", null, [
				I("th", { scope: "col" }, "Peer"),
				I("th", { scope: "col" }, "Shared libraries"),
				I("th", { scope: "col" }, "Last sync"),
				I("th", { scope: "col" }, "Status"),
				I("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), I("tbody", null, [(G(!0), F(j, null, q(r.value, (e) => (G(), F("tr", { key: e.id }, [
				I("td", null, [I("div", al, Y(e.name), 1), I("div", ol, Y(e.url), 1)]),
				I("td", sl, Y(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				I("td", cl, Y(_(e.last_sync)), 1),
				I("td", null, [I("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [R(v, { tone: b(e.status) }, {
					default: Q(() => [L(Y(y(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ll)]),
				I("td", null, [I("div", ul, [e.status === "connected" ? (G(), N(c, {
					key: 0,
					variant: "ghost",
					size: "sm",
					"aria-label": `Disconnect ${e.name}`,
					onClick: (t) => g(e.id)
				}, {
					default: Q(() => [...t[3] ||= [L(" Disconnect ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : P("", !0)])])
			]))), 128))])])])),
			I("section", dl, [t[6] ||= I("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), I("form", {
				class: "federation__form",
				onSubmit: Oe(h, ["prevent"])
			}, [Ee(I("input", {
				"onUpdate:modelValue": t[1] ||= (e) => u.value = e,
				type: "url",
				class: "federation__input",
				placeholder: "https://other-server.example.com",
				"aria-label": "Peer server URL",
				autocomplete: "off"
			}, null, 512), [[Ce, u.value]]), R(c, {
				type: "submit",
				variant: "solid",
				"left-icon": "plus",
				loading: d.value,
				disabled: !u.value.trim()
			}, {
				default: Q(() => [...t[5] ||= [L(" Connect ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-03149ec5"]]), pl = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, ml = {
	key: 0,
	class: "shares__skel"
}, hl = {
	key: 3,
	class: "shares__table-wrap"
}, gl = {
	class: "shares__table",
	"aria-label": "Library shares"
}, _l = { class: "shares__library" }, vl = { class: "shares__date" }, yl = { class: "shares__date" }, bl = ["data-testid"], xl = { class: "shares__actions" }, Sl = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? s, n = o(), r = K([]), a = K(!0), l = K(null);
		function u(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		async function d(e = !1) {
			e && (a.value = !0), l.value = null;
			try {
				r.value = (await t.get("/api/v1/shares")).shares || [];
			} catch (e) {
				l.value = u(e, "Failed to load shares."), n.error(l.value);
			} finally {
				e && (a.value = !1);
			}
		}
		async function f(e) {
			try {
				await t.delete(`/api/v1/shares/${e}`), n.success("Share revoked."), await d();
			} catch (e) {
				n.error(u(e, "Failed to revoke share."));
			}
		}
		function m(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function h(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		function g(e) {
			switch (e) {
				case "read": return "info";
				case "write": return "success";
				default: return "neutral";
			}
		}
		return W(() => d(!0)), (e, t) => (G(), F("section", pl, [t[5] ||= I("header", { class: "shares__head" }, [I("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), I("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), a.value ? (G(), F("div", ml, [R(i, {
			variant: "text",
			lines: 6
		})])) : l.value ? (G(), N(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: l.value
		}, {
			actions: Q(() => [R(c, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => d(!0)
			}, {
				default: Q(() => [...t[1] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (G(), N(p, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (G(), F("div", hl, [I("table", gl, [t[4] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Library"),
			I("th", { scope: "col" }, "Shared with"),
			I("th", { scope: "col" }, "Permissions"),
			I("th", { scope: "col" }, "Created"),
			I("th", { scope: "col" }, "Expires"),
			I("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(G(!0), F(j, null, q(r.value, (e) => (G(), F("tr", { key: e.id }, [
			I("td", null, [I("span", _l, Y(e.library_name), 1)]),
			I("td", null, Y(e.shared_with), 1),
			I("td", null, [R(v, { tone: g(e.permissions) }, {
				default: Q(() => [L(Y(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			I("td", vl, Y(m(e.created_at)), 1),
			I("td", yl, [I("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [L(Y(m(e.expires_at)) + " ", 1), h(e.expires_at) ? (G(), N(v, {
				key: 0,
				tone: "error"
			}, {
				default: Q(() => [...t[2] ||= [L("Expired", -1)]]),
				_: 1
			})) : P("", !0)], 8, bl)]),
			I("td", null, [I("div", xl, [R(c, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => f(e.id)
			}, {
				default: Q(() => [...t[3] ||= [L(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-db9f420b"]]), Cl = { class: "audit-logs-page" }, wl = {
	key: 0,
	class: "loading"
}, Tl = {
	key: 1,
	class: "error"
}, El = {
	key: 2,
	class: "logs-container"
}, Dl = { class: "logs-list" }, Ol = { class: "log-content" }, kl = { class: "log-header" }, Al = { class: "log-action" }, jl = { class: "log-actor" }, Ml = { class: "log-time" }, Nl = {
	key: 0,
	class: "log-target"
}, Pl = {
	key: 1,
	class: "log-details"
}, Fl = {
	key: 2,
	class: "log-ip"
}, Il = {
	key: 0,
	class: "empty-state"
}, Ll = {
	key: 0,
	class: "pagination"
}, Rl = ["disabled"], zl = { class: "page-info" }, Bl = ["disabled"], Vl = /*#__PURE__*/ l(/* @__PURE__ */ z({
	__name: "AuditLogsPage",
	setup(e) {
		let t = K([]), n = K(!0), r = K(null), i = K(1), a = K(1);
		async function o(e = 1) {
			try {
				n.value = !0;
				let r = await s.get("/api/v1/audit-logs", { page: String(e) });
				t.value = r.logs || [], i.value = r.page || 1, a.value = r.total_pages || 1;
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to load audit logs";
			} finally {
				n.value = !1;
			}
		}
		function c(e) {
			return new Date(e).toLocaleString();
		}
		function l(e) {
			return e.includes("create") || e.includes("add") ? "#22c55e" : e.includes("delete") || e.includes("remove") ? "#ef4444" : e.includes("update") || e.includes("edit") ? "#3b82f6" : e.includes("login") || e.includes("auth") ? "#8b5cf6" : "#6b7280";
		}
		function u(e) {
			return e.includes("create") || e.includes("add") ? "+" : e.includes("delete") || e.includes("remove") ? "-" : e.includes("update") || e.includes("edit") ? "~" : e.includes("login") || e.includes("auth") ? "@" : "#";
		}
		return W(() => {
			o();
		}), (e, s) => (G(), F("div", Cl, [s[3] ||= I("div", { class: "page-header" }, [I("h1", { class: "page-title" }, "Audit Logs"), I("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), n.value ? (G(), F("div", wl, "Loading audit logs...")) : r.value ? (G(), F("div", Tl, Y(r.value), 1)) : (G(), F("div", El, [I("div", Dl, [(G(!0), F(j, null, q(t.value, (e) => (G(), F("div", {
			key: e.id,
			class: "log-entry"
		}, [I("div", {
			class: "log-icon",
			style: H({ backgroundColor: l(e.action) })
		}, Y(u(e.action)), 5), I("div", Ol, [
			I("div", kl, [
				I("span", Al, Y(e.action), 1),
				I("span", jl, Y(e.actor), 1),
				I("span", Ml, Y(c(e.created_at)), 1)
			]),
			e.target ? (G(), F("p", Nl, "Target: " + Y(e.target), 1)) : P("", !0),
			e.details ? (G(), F("p", Pl, Y(e.details), 1)) : P("", !0),
			e.ip_address ? (G(), F("span", Fl, "IP: " + Y(e.ip_address), 1)) : P("", !0)
		])]))), 128)), t.value.length === 0 ? (G(), F("div", Il, [...s[2] ||= [I("p", null, "No audit logs found.", -1)]])) : P("", !0)]), a.value > 1 ? (G(), F("div", Ll, [
			I("button", {
				class: "btn btn-secondary",
				disabled: i.value <= 1,
				onClick: s[0] ||= (e) => o(i.value - 1)
			}, " Previous ", 8, Rl),
			I("span", zl, "Page " + Y(i.value) + " of " + Y(a.value), 1),
			I("button", {
				class: "btn btn-secondary",
				disabled: i.value >= a.value,
				onClick: s[1] ||= (e) => o(i.value + 1)
			}, " Next ", 8, Bl)
		])) : P("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Hl(e, t) {
	let n = vn(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = Z(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = Z(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
export { C as ALL_LOGS, Ia as AMBIENT_SAMPLE_H, La as AMBIENT_SAMPLE_INTERVAL_MS, Fa as AMBIENT_SAMPLE_W, ji as ARROW_ICONS, Mi as ARROW_LABELS, ne as AdminBackupApi, b as AdminCastApi, oe as AdminCollectionsApi, w as AdminDashboardApi, re as AdminDlnaServerApi, se as AdminHistoryApi, te as AdminIntegrationsApi, ue as AdminLibrariesApi, ae as AdminLiveTvApi, S as AdminLogsApi, ie as AdminRemoteAccessApi, ee as AdminServicesApi, de as AdminSettingsApi, ce as AdminSyncPlayApi, D as AdminUsersApi, A as AdminWebhooksApi, Ga as AmbientCanvas, e as ApiClient, a as ApiError, ze as AppBackdrop, st as AppLayout, Vl as AuditLogsPage, v as Badge, Xr as BrowsePage, c as Button, pa as CAPTION_BACKGROUND_OPTIONS, fa as CAPTION_COLOR_OPTIONS, ma as CAPTION_EDGE_OPTIONS, da as CAPTION_SIZE_OPTIONS, ua as CAPTION_SIZE_SCALE, va as CaptionOverlay, Pa as CaptionsMenu, mr as Chip, xr as Combobox, Pt as CommandPalette, Ke as DEFAULT_CAPTION_STYLE, qe as DEFAULT_PREFERENCES, Za as DIRECT_PLAY_EXTENSIONS, p as EmptyState, fl as FederationPage, Wr as FilterBar, r as Icon, d as IconButton, vt as Kbd, le as LIBRARY_TYPES, Vc as LibraryScanPage, n as LocalStorageTokenStore, os as LoginForm, us as LoginPage, Sl as ManageSharesPage, Hn as MediaCard, vi as MediaDetail, Ci as MediaDetailPage, Zn as MediaGrid, ur as MediaHomeRow, sr as MediaRow, Jt as MiniPlayer, f as Modal, $c as MyServersPage, Ai as PLAYER_SHORTCUTS, Dc as PageTransition, dn as PhlixApp, Lo as Player, Bo as PlayerPage, qi as QualityMenu, T as RATING_LABELS, E as RATING_OPTIONS, It as RESUME_MAX_RATIO, Ft as RESUME_MIN_SECONDS, Xa as ResumePrompt, Ec as Reveal, O as SUBSCRIBABLE_EVENTS, ki as Scrubber, _ as Select, lc as SettingsForm, dc as SettingsPage, Ge as Sheet, Ui as ShortcutsHelp, ps as SignupForm, _s as SignupPage, i as Skeleton, y as Slider, Ki as SpeedMenu, Tc as Spinner, x as Switch, Qa as TRANSCODE_EXTENSIONS, Ss as Tabs, Cc as ToastHost, gc as Tooltip, xo as TranscodeNotice, ro as UPNEXT_COUNTDOWN_SECONDS, ao as UPNEXT_RING_CIRCUMFERENCE, io as UPNEXT_RING_RADIUS, _o as UpNext, Gi as VolumeControl, k as WEBHOOK_EVENT_CATEGORIES, ia as activeAudioIndex, kc as adminMenu, Ua as ambientGradient, ra as applyAudioTrack, on as applyStoredThemeEarly, na as applyTrackModes, za as averageRegion, Hl as bindMediaStoreToRouter, Oc as buildAdminRoutes, cr as buildMediaQuery, lr as buildMediaUrl, _a as captionStyleVars, ca as cleanCueText, mc as createPhlixApp, nn as deriveAccentVars, ga as edgeShadow, eo as extensionOf, wi as formatTime, xt as fuzzyScore, Fi as handleShortcut, ta as hasActiveCaptions, Ze as hasStoredPreferences, Wa as isBatterySaving, no as isFatalMediaError, Pi as isTypingTarget, $i as listAudioTracks, Qi as listSubtitleTracks, St as matchCommand, to as needsTranscode, la as readActiveCueLines, Xe as readStoredPreferences, ea as resolveTextTrack, Va as rgbString, Ha as rgbaString, oo as ringDashoffset, Ba as sampleAmbient, lt as useAuthStore, wt as useCommandStore, u as useFocusTrap, Ii as useKeyboardShortcuts, vn as useMediaStore, Bt as usePlayerStore, $ as usePreferencesStore, sn as useTheme, o as useToastStore };

//# sourceMappingURL=phlix-ui.js.map