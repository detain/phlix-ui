import { a as e, c as t, d as n, f as r, i, l as a, m as o, n as s, o as c, p as l, r as u, s as d, t as f, u as p } from "./Button-DjEQ9y17.js";
import { n as m, r as h, t as g } from "./Modal-BkSAbwHm.js";
import { t as _ } from "./EmptyState-bbKd8GNA.js";
import { i as v, n as y, r as b, t as x } from "./Select-BPlN5xaU.js";
import { t as S } from "./Badge-DobVc76J.js";
import { n as C, t as w } from "./cast-D50-b0ZQ.js";
import { t as T } from "./Switch-BNdBMUaS.js";
import { n as E, t as D } from "./logs-DadTfaTq.js";
import { t as O } from "./dashboard-BTCOCTHQ.js";
import { n as ee, r as k, t as te } from "./users-C40iLgkq.js";
import { n as ne, r as re, t as ie } from "./webhooks-BBTLnFKm.js";
import { t as ae } from "./services-Czm8hsvH.js";
import { t as oe } from "./integrations-DLAG9ISY.js";
import { t as se } from "./backup-IdY_vzc2.js";
import { t as ce } from "./dlnaServer-B5Sg4MkS.js";
import { t as A } from "./remoteAccess-DVKRpKQ8.js";
import { t as le } from "./liveTv-Dbjt901v.js";
import { t as ue } from "./collections-CH3HLdcd.js";
import { t as de } from "./history-ByCY8OYj.js";
import { t as fe } from "./syncPlay-DPzJkgkK.js";
import { n as pe, t as me } from "./libraries-CXAz_kXs.js";
import { t as he } from "./settings-m4upFcmH.js";
import { Fragment as j, Teleport as ge, Transition as _e, TransitionGroup as ve, computed as M, createApp as ye, createBlock as N, createCommentVNode as P, createElementBlock as F, createElementVNode as I, createSlots as be, createTextVNode as L, createVNode as R, defineComponent as z, inject as B, nextTick as xe, normalizeClass as V, normalizeStyle as H, onBeforeUnmount as U, onMounted as W, onScopeDispose as Se, openBlock as G, reactive as Ce, readonly as we, ref as K, renderList as q, renderSlot as J, resolveComponent as Te, resolveDynamicComponent as Ee, toDisplayString as Y, toRef as De, unref as X, useId as Oe, vModelText as ke, vShow as Ae, watch as Z, watchEffect as je, withCtx as Q, withDirectives as Me, withKeys as Ne, withModifiers as Pe } from "vue";
import { createPinia as Fe, defineStore as Ie } from "pinia";
import { RouterLink as Le, RouterView as Re, createRouter as ze, createWebHistory as Be, onBeforeRouteLeave as Ve, useRoute as He, useRouter as Ue } from "vue-router";
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var We = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, Ge = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
			o.value && e.vignette ? (G(), F("div", We)) : P("", !0),
			o.value && e.grain ? (G(), F("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: H(u.value),
				"aria-hidden": "true"
			}, null, 4)) : P("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), Ke = ["aria-labelledby"], qe = {
	key: 0,
	class: "phlix-sheet__header"
}, Je = ["id"], Ye = { class: "phlix-sheet__body" }, Xe = {
	key: 1,
	class: "phlix-sheet__footer"
}, Ze = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let a = K(null), o = Oe();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return m(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (G(), N(ge, { to: "body" }, [R(_e, { name: `phlix-sheet-${e.side}` }, {
			default: Q(() => [e.modelValue ? (G(), F("div", {
				key: 0,
				class: V(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Pe(c, ["self"])
			}, [I("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? X(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (G(), F("header", qe, [e.title ? (G(), F("h2", {
					key: 0,
					id: X(o),
					class: "phlix-sheet__title"
				}, Y(e.title), 9, Je)) : P("", !0), e.hideClose ? P("", !0) : (G(), N(h, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : P("", !0),
				I("div", Ye, [J(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (G(), F("footer", Xe, [J(t.$slots, "footer", {}, void 0, !0)])) : P("", !0)
			], 8, Ke)], 34)) : P("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), Qe = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, $e = {
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
	captionStyle: { ...Qe },
	atmosphere: !0,
	filterPresets: []
};
function et(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var tt = "phlix.prefs";
function nt() {
	if (typeof localStorage > "u") return { ...$e };
	try {
		let e = localStorage.getItem(tt);
		if (!e) return { ...$e };
		let t = JSON.parse(e);
		return {
			...$e,
			...t
		};
	} catch {
		return { ...$e };
	}
}
function rt() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(tt) !== null;
	} catch {
		return !1;
	}
}
function it() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var $ = Ie("phlix-prefs", () => {
	let e = nt(), t = K(e.theme), n = K(e.accent), r = K(e.density), i = K(e.cardSize), a = K(e.gridDensity), o = K(e.reducedMotion), s = K(e.autoplay), c = K(e.defaultVolume), l = K(e.defaultQuality), u = K(e.defaultSubtitleLang), d = K({
		...Qe,
		...e.captionStyle
	}), f = K(e.atmosphere), p = K(e.filterPresets ? [...e.filterPresets] : []), m = K(it()), h = null;
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
			id: et(e),
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
			localStorage.setItem(tt, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = $e;
		t.value = e.theme, n.value = e.accent, r.value = e.density, i.value = e.cardSize, a.value = e.gridDensity, o.value = e.reducedMotion, s.value = e.autoplay, c.value = e.defaultVolume, l.value = e.defaultQuality, u.value = e.defaultSubtitleLang, d.value = { ...Qe }, f.value = e.atmosphere, p.value = [...e.filterPresets];
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
}), at = { class: "shell" }, ot = { class: "shell__bar" }, st = { class: "shell__inner" }, ct = { class: "shell__brand" }, lt = {
	class: "shell__nav",
	"aria-label": "Primary"
}, ut = { class: "shell__actions" }, dt = { class: "shell__main" }, ft = {
	key: 0,
	class: "shell__footer"
}, pt = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "AppLayout",
	setup(e) {
		let t = $(), n = K(!1);
		return (e, r) => (G(), F("div", at, [
			R(Ge, { enabled: X(t).atmosphere }, null, 8, ["enabled"]),
			I("header", ot, [I("div", st, [
				I("div", ct, [J(e.$slots, "logo", {}, () => [r[3] ||= I("span", { class: "shell__wordmark" }, [L("Phlix"), I("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				I("nav", lt, [J(e.$slots, "nav", {}, void 0, !0)]),
				r[4] ||= I("span", { class: "shell__spacer" }, null, -1),
				I("div", ut, [J(e.$slots, "actions", {}, void 0, !0)]),
				e.$slots.nav ? (G(), N(h, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: "Open navigation menu",
					variant: "ghost",
					onClick: r[0] ||= (e) => n.value = !0
				})) : P("", !0)
			])]),
			I("main", dt, [J(e.$slots, "default", {}, void 0, !0)]),
			e.$slots.footer ? (G(), F("footer", ft, [J(e.$slots, "footer", {}, void 0, !0)])) : P("", !0),
			R(Ze, {
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
}), [["__scopeId", "data-v-007c323a"]]), mt = /* @__PURE__ */ z({
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
		return (e, t) => (G(), N(h, {
			name: o.value,
			label: s.value,
			variant: "ghost",
			onClick: c
		}, null, 8, ["name", "label"]));
	}
}), ht = Ie("auth", () => {
	let t = new i(), n = new e({
		tokenStore: t,
		baseUrl: B("apiBase", "")
	}), r = K(null), a = K(!1), o = K(null), s = K(t.getAccessToken()), c = M(() => s.value !== null), l = M(() => r.value?.is_admin === !0);
	function u(e, n) {
		t.setAccessToken(e), t.setRefreshToken(n), s.value = e;
	}
	async function d(e, t) {
		a.value = !0, o.value = null;
		try {
			let r = await n.post("/api/v1/auth/login", {
				email: e,
				password: t
			});
			return u(r.access_token, r.refresh_token), await p(), !0;
		} catch (e) {
			return o.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			a.value = !1;
		}
	}
	async function f(e, t, r) {
		a.value = !0, o.value = null;
		try {
			let i = await n.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: r
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
			r.value = await n.getCurrentUser();
		} catch {
			r.value = null, t.clear(), s.value = null;
		}
	}
	function m() {
		t.clear(), s.value = null, r.value = null;
	}
	return {
		user: r,
		loading: a,
		error: o,
		isLoggedIn: c,
		isAdmin: l,
		client: n,
		login: d,
		signup: f,
		fetchUser: p,
		logout: m
	};
}), gt = ["aria-label", "aria-expanded"], _t = {
	key: 0,
	class: "usermenu__avatar"
}, vt = { class: "usermenu__head" }, yt = { class: "usermenu__avatar usermenu__avatar--lg" }, bt = { class: "usermenu__name" }, xt = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "UserMenu",
	setup(e) {
		let t = ht(), n = Ue(), r = B("phlixConfig", null), i = M(() => r?.routerBase ?? "/app"), a = K(!1), o = K(null), s = K(null), c = M(() => t.user?.username || t.user?.name || t.user?.email || "Account"), u = M(() => c.value.charAt(0).toUpperCase() || "A");
		function d() {
			a.value = !1;
		}
		function f(e) {
			d(), n.push(e);
		}
		function p() {
			d(), t.logout(), n.push(`${i.value}/login`);
		}
		m(s, a, {
			lockScroll: !1,
			onEscape: () => (d(), !0)
		});
		function h(e) {
			o.value && !o.value.contains(e.target) && d();
		}
		return Z(a, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", h, !0) : document.removeEventListener("pointerdown", h, !0));
		}), U(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", h, !0);
		}), (e, n) => (G(), F("div", {
			ref_key: "rootEl",
			ref: o,
			class: "usermenu"
		}, [I("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": X(t).isLoggedIn ? `Account: ${c.value}` : "Account",
			"aria-haspopup": "menu",
			"aria-expanded": a.value,
			onClick: n[0] ||= (e) => a.value = !a.value
		}, [X(t).isLoggedIn ? (G(), F("span", _t, Y(u.value), 1)) : (G(), N(l, {
			key: 1,
			name: "user"
		}))], 8, gt), a.value ? (G(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: s,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": "Account",
			tabindex: "-1"
		}, [X(t).isLoggedIn ? (G(), F(j, { key: 0 }, [
			I("div", vt, [I("span", yt, Y(u.value), 1), I("span", bt, Y(c.value), 1)]),
			I("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: n[1] ||= (e) => f(`${i.value}/settings`)
			}, [R(l, { name: "settings" }), n[3] ||= L(" Settings ", -1)]),
			I("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: p
			}, [R(l, { name: "log-out" }), n[4] ||= L(" Sign out ", -1)])
		], 64)) : (G(), F("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: n[2] ||= (e) => f(`${i.value}/login`)
		}, [R(l, { name: "user" }), n[5] ||= L(" Sign in ", -1)]))], 512)) : P("", !0)], 512));
	}
}), [["__scopeId", "data-v-5da5ea3f"]]), St = { class: "phlix-kbd" }, Ct = {
	key: 1,
	class: "phlix-kbd__key"
}, wt = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = M(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (G(), F("span", St, [n.value.length ? (G(!0), F(j, { key: 0 }, q(n.value, (e, t) => (G(), F("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, Y(e), 1))), 128)) : (G(), F("kbd", Ct, [J(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), Tt = "phlix.cmd.recents", Et = 8;
function Dt(e, t) {
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
function Ot(e, t) {
	if (!e.trim()) return 0;
	let n = Dt(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, Dt(e, n));
	return t.group && (r = Math.max(r, Dt(e, t.group))), r;
}
function kt() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(Tt);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, Et) : [];
	} catch {
		return [];
	}
}
var At = Ie("phlix-commands", () => {
	let e = K(/* @__PURE__ */ new Map()), t = K(!1), n = K(""), r = K(kt()), i = M(() => Array.from(e.value.values())), a = M(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: Ot(t, e)
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
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, Et);
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
			localStorage.setItem(Tt, JSON.stringify(e));
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
}), jt = { class: "phlix-cmdk__search" }, Mt = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], Nt = ["id"], Pt = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, Ft = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], It = { class: "phlix-cmdk__option-body" }, Lt = { class: "phlix-cmdk__option-title" }, Rt = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, zt = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, Bt = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "CommandPalette",
	setup(e) {
		let t = At(), n = Ue(), r = $(), i = K(null), a = Oe(), o = K(0);
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
		let u = M(() => {
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
		}), d = M(() => u.value.options.length), f = M(() => d.value ? `${a}-opt-${o.value}` : void 0);
		Z(() => t.query, () => {
			o.value = 0;
		}), Z(d, (e) => {
			o.value > e - 1 && (o.value = Math.max(0, e - 1));
		}), Z(() => t.open, (e) => {
			e && (o.value = 0);
		});
		function p() {
			typeof document > "u" || document.getElementById(`${a}-opt-${o.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function h(e) {
			let t = d.value;
			t && (o.value = (o.value + e + t) % t, p());
		}
		function g() {
			let e = u.value.options[o.value];
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
					e.preventDefault(), o.value = 0, p();
					break;
				case "End":
					e.preventDefault(), o.value = Math.max(0, d.value - 1), p();
					break;
				case "Enter":
					e.preventDefault(), g();
					break;
			}
		}
		function y() {
			t.closePalette();
		}
		m(i, M(() => t.open), { onEscape: () => (t.closePalette(), !0) });
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
		], C = null;
		return W(() => {
			C = t.register([...S, ...x]), document.addEventListener("keydown", b);
		}), U(() => {
			C?.(), document.removeEventListener("keydown", b);
		}), (e, n) => (G(), N(ge, { to: "body" }, [R(_e, { name: "phlix-cmdk" }, {
			default: Q(() => [X(t).open ? (G(), F("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: Pe(y, ["self"])
			}, [I("div", {
				ref_key: "panelEl",
				ref: i,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [I("div", jt, [
				R(l, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				I("input", {
					value: X(t).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": X(a),
					"aria-activedescendant": f.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: n[0] ||= (e) => X(t).setQuery(e.target.value),
					onKeydown: v
				}, null, 40, Mt),
				R(wt, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), I("ul", {
				id: X(a),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(G(!0), F(j, null, q(u.value.rows, (e, t) => (G(), F(j, { key: e.kind === "header" ? `h-${e.label}-${t}` : e.item.id }, [e.kind === "header" ? (G(), F("li", Pt, Y(e.label), 1)) : (G(), F("li", {
				key: 1,
				id: `${X(a)}-opt-${e.index}`,
				class: V(["phlix-cmdk__option", { "is-active": e.index === o.value }]),
				role: "option",
				"aria-selected": e.index === o.value,
				onClick: (t) => _(e.item),
				onPointermove: (t) => o.value = e.index
			}, [
				R(l, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				I("span", It, [I("span", Lt, Y(e.item.title), 1), e.item.subtitle ? (G(), F("span", Rt, Y(e.item.subtitle), 1)) : P("", !0)]),
				e.item.shortcut ? (G(), N(wt, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : P("", !0)
			], 42, Ft))], 64))), 128)), d.value ? P("", !0) : (G(), F("li", zt, " No matching commands "))], 8, Nt)], 512)], 32)) : P("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]), Vt = 30, Ht = .95, Ut = 5e3, Wt = "phlix.resume";
function Gt() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(Wt);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Kt = Ie("phlix-player", () => {
	let e = $(), t = K(null), n = K(""), r = K([]), i = K(!1), a = K(0), o = K(0), s = K(0), c = K(e.defaultVolume), l = K(!1), u = K(1), d = K(e.defaultQuality), f = K(e.defaultSubtitleLang), p = K(!1), m = K(Gt()), h = M(() => o.value > 0 ? a.value / o.value : 0), g = M(() => r.value[0] ?? null), _, v = 0;
	function y(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			v = Date.now();
			try {
				localStorage.setItem(Wt, JSON.stringify(m.value));
			} catch {}
		}, n = Date.now() - v;
		clearTimeout(_), e || n >= Ut ? t() : _ = setTimeout(t, Ut - n);
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
		t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (a.value = 0, o.value = 0, s.value = 0), A(e);
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
	function ee() {
		l.value = !l.value;
	}
	function k(e) {
		u.value = e;
	}
	function te(e) {
		d.value = e;
	}
	function ne(e) {
		f.value = e;
	}
	function re(e) {
		r.value = [...e];
	}
	function ie(e) {
		r.value.push(e);
	}
	function ae(e) {
		let t = r.value.shift() ?? null;
		return t && w(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function oe() {
		p.value = !0;
	}
	function se() {
		p.value = !1;
	}
	function ce() {
		t.value && x(t.value.id, a.value, o.value), y(!0), i.value = !1, p.value = !1, t.value = null, n.value = "";
	}
	function A(e) {
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
		toggleMute: ee,
		setRate: k,
		setQuality: te,
		setSubtitle: ne,
		setQueue: re,
		enqueue: ie,
		next: ae,
		showMiniPlayer: oe,
		hideMiniPlayer: se,
		closePlayer: ce,
		setMediaSessionMetadata: A,
		setMediaPositionState: le,
		bindMediaSession: ue,
		seedFromPreferences: de
	};
}), qt = {
	key: 0,
	class: "mini",
	role: "region",
	"aria-label": "Mini player"
}, Jt = ["src", "poster"], Yt = { class: "mini__body" }, Xt = { class: "mini__title" }, Zt = { class: "mini__controls" }, Qt = ["aria-label"], $t = {
	class: "mini__progress",
	"aria-hidden": "true"
}, en = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let n = t, r = Kt(), i = K(null), a = M(() => r.miniPlayer && !!r.current && !!r.streamUrl), o = M(() => r.current?.name ?? ""), s = M(() => Math.max(0, Math.min(1, r.progress)));
		function c() {
			let e = i.value;
			e && (e.volume = r.volume, e.muted = r.muted, e.playbackRate = r.rate, r.position > 0 && (!e.duration || r.position < e.duration) && (e.currentTime = r.position), r.playing && e.play()?.catch(() => {}));
		}
		function u() {
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
		return Z(() => r.playing, (e) => {
			let t = i.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), U(() => {
			i.value?.pause?.();
		}), (e, t) => (G(), N(_e, { name: "mini" }, {
			default: Q(() => [a.value ? (G(), F("div", qt, [
				I("video", {
					ref_key: "videoRef",
					ref: i,
					class: "mini__video",
					src: X(r).streamUrl,
					poster: X(r).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: c,
					onPlay: u,
					onPause: d,
					onTimeupdate: f,
					onClick: m
				}, null, 40, Jt),
				I("div", Yt, [I("p", Xt, Y(o.value), 1), I("div", Zt, [
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": X(r).playing ? "Pause" : "Play",
						onClick: p
					}, [R(l, { name: X(r).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Qt),
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": "Expand to full player",
						onClick: m
					}, [R(l, { name: "expand" })]),
					I("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": "Close player",
						onClick: h
					}, [R(l, { name: "x" })])
				])]),
				I("div", $t, [I("div", {
					class: "mini__progress-fill",
					style: H({ transform: `scaleX(${s.value})` })
				}, null, 4)])
			])) : P("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c013af7d"]]);
//#endregion
//#region src/composables/color.ts
function tn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var nn = (e) => Math.max(0, Math.min(255, Math.round(e))), rn = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => nn(e).toString(16).padStart(2, "0")).join("");
function an(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function on(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var sn = ({ r: e, g: t, b: n }, r) => `rgba(${nn(e)}, ${nn(t)}, ${nn(n)}, ${r})`;
function cn({ r: e, g: t, b: n }) {
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
function ln(e) {
	let t = tn(e);
	if (!t) return null;
	let n = cn(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": rn(t),
		"--accent-hover": rn(an(t, .12)),
		"--accent-active": rn(on(t, .12)),
		"--accent-soft": sn(t, .14),
		"--accent-ring": sn(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var un = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function dn(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? ln(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of un) n.style.removeProperty(e);
}
function fn(e) {
	let t = nt();
	e && !rt() && (t.theme = e), dn(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function pn() {
	let e = $();
	return je(() => {
		dn({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var mn = ["src", "alt"], hn = { class: "brand-wordmark" }, gn = {
	key: 1,
	class: "brand-tagline"
}, _n = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "PhlixApp",
	setup(e) {
		pn();
		let t = At(), n = Ue();
		function r(e) {
			n.push(`${c.value}/player/${e}`);
		}
		let i = B("phlixConfig", null), a = M(() => i?.branding ?? {}), o = M(() => a.value.wordmark ?? "Phlix"), s = M(() => i?.menu ?? []), c = M(() => i?.routerBase ?? "/app");
		function u(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, n) => (G(), N(pt, null, {
			logo: Q(() => [R(X(Le), {
				to: c.value,
				class: "brand"
			}, {
				default: Q(() => [
					a.value.logoSrc ? (G(), F("img", {
						key: 0,
						src: a.value.logoSrc,
						alt: a.value.logoAlt ?? o.value,
						class: "brand-logo"
					}, null, 8, mn)) : P("", !0),
					I("span", hn, [L(Y(o.value), 1), n[1] ||= I("span", { class: "brand-dot" }, ".", -1)]),
					a.value.tagline ? (G(), F("span", gn, Y(a.value.tagline), 1)) : P("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Q(() => [s.value.length ? (G(!0), F(j, { key: 0 }, q(s.value, (e) => (G(), N(Ee(e.href ? "a" : X(Le)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? u(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Q(() => [e.icon ? (G(), N(l, {
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
			]))), 128)) : (G(), F(j, { key: 1 }, [R(X(Le), {
				to: c.value,
				class: "nav-link"
			}, {
				default: Q(() => [...n[2] ||= [L("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), R(X(Le), {
				to: `${c.value}/settings`,
				class: "nav-link"
			}, {
				default: Q(() => [...n[3] ||= [L("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: Q(() => [
				R(h, {
					name: "search",
					label: "Open command palette (⌘K)",
					variant: "ghost",
					onClick: n[0] ||= (e) => X(t).openPalette()
				}),
				R(mt),
				R(xt)
			]),
			default: Q(() => [
				R(X(Re)),
				R(Bt),
				R(en, { onExpand: r })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-b48c595d"]]), vn = { class: "phlix-placeholder" }, yn = { class: "placeholder-content" }, bn = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (G(), F("div", vn, [I("div", yn, [n[0] ||= I("h1", null, "Shared UI loading...", -1), I("p", null, "Phlix " + Y(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), xn = 6e4, Sn = 250;
function Cn(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var wn = Ie("media", () => {
	let t = K([]), r = K(0), i = K(!1), a = K(null), o = K(""), s = K([]), c = K(void 0), l = K(void 0), u = K([]), d = K([]), f = K("name"), p = K("asc"), m = K(24), h = K(0), g = M(() => t.value.length < r.value), _ = M(() => {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = s.value), c.value !== void 0 && (e.yearFrom = c.value), l.value !== void 0 && (e.yearTo = l.value), u.value.length && (e.ratings = u.value), d.value.length && (e.types = d.value), e.sort = f.value, e.order = p.value, e.limit = m.value, e.offset = h.value, e;
	}), v = M(() => {
		let e = /* @__PURE__ */ new Set();
		return t.value.forEach((t) => t.genres?.forEach((t) => e.add(t))), Array.from(e).sort();
	}), y = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], b = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function x(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function S(e, t) {
		return `${e}/api/v1/media?${x(t).toString()}`;
	}
	function C(e) {
		return x(e).toString();
	}
	let w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = null, D = null, O;
	function ee(e) {
		return !!e && Date.now() - e.ts < xn;
	}
	function k(t, n, r, i) {
		i && (D && r !== E && D.abort(), E = r);
		let a = T.get(r);
		if (a) return i && (D = a.controller), a.promise;
		let o = new AbortController();
		i && (D = o);
		let s = new e({ baseUrl: t }).get(S(t, n), void 0, o.signal).then((e) => (w.set(r, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			T.delete(r);
		});
		return T.set(r, {
			promise: s,
			controller: o
		}), s;
	}
	function te(e, n) {
		t.value = n ? [...t.value, ...e.items] : e.items, r.value = e.total;
	}
	async function ne(e, t = !1) {
		let r = { ..._.value }, o = C(r), s = w.get(o);
		if (ee(s)) {
			te(s, t), a.value = null;
			return;
		}
		i.value = !0, a.value = null;
		try {
			let n = await k(e, r, o, !t);
			if (!t && o !== E) return;
			te(n, t);
		} catch (e) {
			if (Cn(e)) return;
			(t || o === E) && (a.value = n(e, "Failed to load media"));
		} finally {
			(t || o === E) && (i.value = !1);
		}
	}
	function re(e, t = Sn) {
		h.value = 0, clearTimeout(O), O = setTimeout(() => ne(e, !1), t);
	}
	async function ie(e) {
		i.value || !g.value || (h.value = t.value.length, await ne(e, !0));
	}
	async function ae(e, t = {}) {
		let n = {
			..._.value,
			...t
		}, r = C(n);
		if (!ee(w.get(r))) try {
			await k(e, n, r, !1);
		} catch {}
	}
	function oe() {
		w.clear();
	}
	function se() {
		clearTimeout(O);
	}
	function ce() {
		let e = {};
		return o.value && (e.search = o.value), s.value.length && (e.genres = [...s.value]), c.value !== void 0 && (e.yearFrom = String(c.value)), l.value !== void 0 && (e.yearTo = String(l.value)), u.value.length && (e.ratings = [...u.value]), d.value.length && (e.types = [...d.value]), f.value !== "name" && (e.sort = f.value), p.value !== "asc" && (e.order = p.value), e;
	}
	function A(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function le(e) {
		o.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", s.value = A(e.genres), u.value = A(e.ratings), d.value = A(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		c.value = t ? Number(t) : void 0, l.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		f.value = r ?? "name", p.value = i ?? "asc", h.value = 0;
	}
	function ue() {
		t.value = [], r.value = 0, h.value = 0, a.value = null;
	}
	function de(e) {
		o.value = e, h.value = 0;
	}
	function fe(e) {
		s.value = e, h.value = 0;
	}
	function pe(e, t) {
		c.value = e, l.value = t, h.value = 0;
	}
	function me(e) {
		u.value = e, h.value = 0;
	}
	function he(e) {
		d.value = e, h.value = 0;
	}
	function j(e, t) {
		f.value = e, t && (p.value = t), h.value = 0;
	}
	return {
		items: t,
		total: r,
		loading: i,
		error: a,
		search: o,
		selectedGenres: s,
		yearFrom: c,
		yearTo: l,
		selectedRatings: u,
		selectedTypes: d,
		sort: f,
		order: p,
		limit: m,
		offset: h,
		hasMore: g,
		queryParams: _,
		availableGenres: v,
		availableRatings: y,
		availableTypes: b,
		fetchMedia: ne,
		scheduleFetch: re,
		loadMore: ie,
		prefetch: ae,
		clearCache: oe,
		cancelScheduled: se,
		toQuery: ce,
		applyQuery: le,
		reset: ue,
		setSearch: de,
		setGenres: fe,
		setYearRange: pe,
		setRatings: me,
		setTypes: he,
		setSort: j
	};
}), Tn = { class: "media-card" }, En = { class: "media-card__poster" }, Dn = ["href", "aria-label"], On = { class: "visually-hidden" }, kn = ["src", "alt"], An = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, jn = { class: "media-card__badges" }, Mn = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Nn = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Pn = ["aria-valuenow", "aria-label"], Fn = { class: "media-card__overlay" }, In = { class: "media-card__title" }, Ln = { class: "media-card__meta" }, Rn = {
	key: 0,
	class: "numeric"
}, zn = {
	key: 1,
	class: "media-card__dot"
}, Bn = {
	key: 2,
	class: "media-card__cert"
}, Vn = {
	key: 3,
	class: "media-card__dot"
}, Hn = {
	key: 4,
	class: "numeric"
}, Un = {
	key: 0,
	class: "media-card__genres"
}, Wn = { class: "media-card__actions" }, Gn = { class: "media-card__caption" }, Kn = ["title"], qn = { class: "media-card__caption-sub numeric" }, Jn = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = Kt(), a = M(() => n.to ?? `/app/player/${n.item.id}`), o = K(!1), s = K(null);
		function c() {
			o.value = !0;
		}
		W(() => {
			s.value?.complete && (o.value = !0);
		});
		let u = M(() => {
			let e = n.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= n.newWithinDays * 24 * 60 * 60 * 1e3;
		}), d = M(() => {
			let e = i.resumePositionFor(n.item.id), t = n.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), f = M(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (G(), F("article", Tn, [I("div", En, [
			I("a", {
				href: a.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [I("span", On, Y(e.item.name), 1)], 8, Dn),
			e.item.poster_url ? (G(), F("img", {
				key: 0,
				ref_key: "imgEl",
				ref: s,
				class: V(["media-card__img", { "is-loaded": o.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: c
			}, null, 42, kn)) : (G(), F("div", An, [R(l, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			I("div", jn, [
				u.value ? (G(), F("span", Mn, "New")) : P("", !0),
				J(t.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (G(), F("span", Nn, Y(e.quality), 1)) : P("", !0)
			]),
			d.value > 0 ? (G(), F("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [I("i", { style: H({ width: `${d.value * 100}%` }) }, null, 4)], 8, Pn)) : P("", !0),
			I("div", Fn, [
				I("h3", In, Y(e.item.name), 1),
				I("div", Ln, [
					e.item.year ? (G(), F("span", Rn, Y(e.item.year), 1)) : P("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (G(), F("span", zn)) : P("", !0),
					e.item.rating ? (G(), F("span", Bn, Y(e.item.rating), 1)) : P("", !0),
					e.item.rating && e.item.runtime ? (G(), F("span", Vn)) : P("", !0),
					e.item.runtime ? (G(), F("span", Hn, Y(e.item.runtime) + "m", 1)) : P("", !0)
				]),
				f.value.length ? (G(), F("div", Un, [(G(!0), F(j, null, q(f.value, (e) => (G(), F("span", { key: e }, Y(e), 1))), 128))])) : P("", !0),
				I("div", Wn, [
					I("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: n[0] ||= (t) => r("play", e.item)
					}, [R(l, { name: "play" })]),
					I("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: n[1] ||= (t) => r("watchlist", e.item)
					}, [R(l, { name: "bookmark-plus" })]),
					I("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: n[2] ||= (t) => r("info", e.item)
					}, [R(l, { name: "info" })]),
					J(t.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), I("div", Gn, [I("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, Y(e.item.name), 9, Kn), I("div", qn, [
			e.item.year ? (G(), F(j, { key: 0 }, [L(Y(e.item.year), 1)], 64)) : P("", !0),
			e.item.year && e.item.runtime ? (G(), F(j, { key: 1 }, [L(" · ")], 64)) : P("", !0),
			e.item.runtime ? (G(), F(j, { key: 2 }, [L(Y(e.item.runtime) + "m", 1)], 64)) : P("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), Yn = 3 / 2;
function Xn(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function Zn(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function Qn(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * Yn + t + n;
}
function $n(e) {
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
var er = { class: "media-grid-root" }, tr = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, nr = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, rr = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = $(), a = M(() => n.cardSize ?? i.cardSize ?? 180), o = K(null), s = K(null), c = K(0), u = K(0), d = K(0);
		function f() {
			let e = o.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (c.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (u.value = n), d.value = Math.max(0, -t.top);
		}
		let p = 0;
		function m() {
			p ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				p = 0, f();
			});
		}
		let h = M(() => Xn(c.value, a.value, 20)), g = M(() => Qn(Zn(c.value, h.value, 20))), _ = M(() => c.value > 0 && g.value > 0), v = M(() => $n({
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
		}), b = M(() => ({ gridTemplateColumns: _.value ? `repeat(${h.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${a.value}px, 1fr))` })), x = M(() => _.value ? { height: `${v.value.totalHeight}px` } : {}), S = M(() => _.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${v.value.padTop}px)`
		} : {}), C = M(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${a.value}px, 1fr))` })), w = M(() => _.value && d.value > u.value * 1.5);
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
				e.some((e) => e.isIntersecting) && n.hasMore && !n.loading && !n.loadingMore && r("load-more");
			}, { rootMargin: "400px 0px" }), s.value && E.observe(s.value));
		}
		function O() {
			E?.disconnect(), E = null;
		}
		Z(() => s.value, (e) => {
			O(), e && (D(), m());
		});
		let ee = null;
		function k() {
			ee || typeof ResizeObserver > "u" || !o.value || (ee = new ResizeObserver(m), ee.observe(o.value));
		}
		function te() {
			ee?.disconnect(), ee = null;
		}
		return Z(() => o.value, (e) => {
			te(), e && (k(), m());
		}), W(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("resize", m, { passive: !0 })), k(), D();
		}), U(() => {
			typeof window < "u" && (window.removeEventListener("scroll", m), window.removeEventListener("resize", m)), p &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), 0), te(), O();
		}), Z(() => n.items.length, () => xe(m)), (t, n) => (G(), F("div", er, [e.loading && e.items.length === 0 ? (G(), F("div", {
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
		]]))), 128))], 4)) : e.items.length === 0 ? (G(), F("div", tr, [J(t.$slots, "empty", {}, () => [
			R(l, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			n[1] ||= I("p", { class: "media-grid-empty__title" }, "No media found", -1),
			n[2] ||= I("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (G(), F(j, { key: 2 }, [
			I("div", {
				ref_key: "sizerEl",
				ref: o,
				class: "media-grid-sizer",
				style: H(x.value)
			}, [I("div", {
				class: "media-grid",
				style: H([b.value, S.value])
			}, [(G(!0), F(j, null, q(y.value, (e) => J(t.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [R(Jn, {
				item: e.item,
				onPlay: (t) => r("play", e.item),
				onWatchlist: (t) => r("watchlist", e.item),
				onInfo: (t) => r("info", e.item)
			}, null, 8, [
				"item",
				"onPlay",
				"onWatchlist",
				"onInfo"
			])], !0)), 128))], 4)], 4),
			e.loadingMore ? (G(), F("div", nr, [...n[3] ||= [I("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), L(" Loading more… ", -1)]])) : P("", !0),
			e.hasMore && !e.loadingMore ? (G(), F("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: s,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : P("", !0)
		], 64)), R(_e, { name: "media-grid-fade" }, {
			default: Q(() => [w.value ? (G(), F("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: T
			}, [R(l, { name: "arrow-up" })])) : P("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), ir = ["aria-label"], ar = { class: "media-row__head" }, or = { class: "media-row__title" }, sr = {
	key: 0,
	class: "media-row__count numeric"
}, cr = { class: "media-row__action" }, lr = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, ur = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, dr = { class: "media-row__skel-poster" }, fr = ["aria-label"], pr = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = M(() => !n.loading && !n.error && n.items.length === 0), a = M(() => n.hideWhenEmpty && i.value);
		return (t, n) => a.value ? P("", !0) : (G(), F("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [I("div", ar, [
			I("h2", or, Y(e.title), 1),
			e.count == null ? P("", !0) : (G(), F("span", sr, Y(e.count.toLocaleString()), 1)),
			I("div", cr, [J(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (G(), F("div", lr, [I("span", null, Y(e.error), 1), I("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (G(), F("div", ur, [(G(!0), F(j, null, q(e.skeletonCount, (e) => (G(), F("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [I("div", dr, [R(s, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), R(s, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : i.value ? (G(), N(_, {
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
		}, [R(Jn, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, fr))], 8, ir));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function mr(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function hr(e, t = {}) {
	return `${e}/api/v1/media?${mr(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var gr = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let r = t, i = n, a = u(), o = K([]), s = K(null), c = K(!1), l = K(null), d = K(!1), f = K(null), p = null, m = null, h = !1;
		function g(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function _() {
			if (!c.value) {
				c.value = !0, l.value = null, m = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let t = new e({ baseUrl: r.apiBase }), n = hr(r.apiBase, {
						...r.row.query,
						limit: r.limit,
						offset: 0
					}), a = await t.get(n, void 0, m?.signal);
					if (h) return;
					o.value = a.items ?? [], s.value = typeof a.total == "number" ? a.total : o.value.length, d.value = !0, i("items-loaded", o.value);
				} catch (e) {
					if (h || g(e)) return;
					l.value = e instanceof Error ? e.message : "Failed to load", a.error(`Couldn't load "${r.row.title}"`);
				} finally {
					h || (c.value = !1);
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
		}, [R(pr, {
			title: t.row.title,
			items: o.value,
			loading: c.value || !d.value && !l.value,
			error: l.value,
			count: s.value,
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
}), [["__scopeId", "data-v-fb0faca3"]]), _r = ["disabled", "aria-pressed"], vr = { class: "phlix-chip__label" }, yr = ["disabled", "aria-label"], br = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t;
		function i() {
			n.disabled || (n.selected !== void 0 && r("update:selected", !n.selected), r("click"));
		}
		return (t, n) => (G(), F("span", { class: V(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [I("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: i
		}, [e.icon ? (G(), N(l, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : P("", !0), I("span", vr, [J(t.$slots, "default", {}, void 0, !0)])], 8, _r), e.removable ? (G(), F("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [R(l, { name: "x" })], 8, yr)) : P("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), xr = { class: "phlix-combobox__field" }, Sr = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], Cr = ["id", "aria-label"], wr = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Tr = { class: "phlix-combobox__check" }, Er = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, Dr = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = M(() => v(n.options)), a = Oe(), o = K(!1), s = K(-1), c = K(""), u = K(!1), d = K(null), f = K(null), p = K(null), m = M(() => i.value.find((e) => e.value === n.modelValue)?.label ?? ""), h = M(() => {
			if (!u.value || c.value.trim() === "") return i.value;
			let e = c.value.toLowerCase();
			return i.value.filter((t) => t.label.toLowerCase().includes(e));
		}), g = M(() => s.value >= 0 ? `${a}-opt-${s.value}` : void 0);
		Z(() => n.modelValue, () => {
			o.value || (c.value = m.value);
		}, { immediate: !0 });
		function _() {
			n.disabled || o.value || (o.value = !0, s.value = h.value.findIndex((e) => e.value === n.modelValue), s.value < 0 && (s.value = h.value.findIndex((e) => !e.disabled)), xe(w));
		}
		function x() {
			c.value = m.value, u.value = !1, o.value = !1;
		}
		function S(e) {
			let t = h.value[e];
			!t || t.disabled || (t.value !== n.modelValue && (r("update:modelValue", t.value), r("change", t.value)), c.value = t.label, u.value = !1, o.value = !1, f.value?.focus());
		}
		function C(e) {
			h.value.length !== 0 && (s.value = b(h.value, s.value, e), xe(w));
		}
		function w() {
			p.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function T(e) {
			c.value = e.target.value, u.value = !0, o.value = !0, s.value = y(h.value, "first");
		}
		function E(e) {
			if (!n.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), o.value ? C(1) : _();
					break;
				case "ArrowUp":
					e.preventDefault(), o.value ? C(-1) : _();
					break;
				case "Enter":
					o.value && s.value >= 0 && (e.preventDefault(), S(s.value));
					break;
				case "Escape":
					o.value && (e.preventDefault(), x());
					break;
				case "Tab":
					o.value && x();
					break;
			}
		}
		function D(e) {
			o.value && d.value && !d.value.contains(e.target) && x();
		}
		return Z(o, (e) => {
			e ? document.addEventListener("pointerdown", D, !0) : document.removeEventListener("pointerdown", D, !0);
		}), U(() => document.removeEventListener("pointerdown", D, !0)), (t, n) => (G(), F("div", {
			ref_key: "rootEl",
			ref: d,
			class: V(["phlix-combobox", {
				"is-open": o.value,
				"is-disabled": e.disabled
			}])
		}, [I("div", xr, [
			R(l, {
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
				"aria-expanded": o.value,
				"aria-controls": o.value ? `${X(a)}-list` : void 0,
				"aria-activedescendant": o.value ? g.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder,
				disabled: e.disabled,
				value: c.value,
				onInput: T,
				onFocus: _,
				onKeydown: E
			}, null, 40, Sr),
			R(l, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Me(I("ul", {
			id: `${X(a)}-list`,
			ref_key: "listEl",
			ref: p,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(G(!0), F(j, null, q(h.value, (t, n) => (G(), F("li", {
			id: `${X(a)}-opt-${n}`,
			key: t.value,
			class: V(["phlix-combobox__option", {
				"is-active": n === s.value,
				"is-disabled": t.disabled
			}]),
			role: "option",
			"aria-selected": t.value === e.modelValue,
			"aria-disabled": t.disabled || void 0,
			onClick: (e) => S(n),
			onPointermove: (e) => !t.disabled && (s.value = n)
		}, [I("span", Tr, [t.value === e.modelValue ? (G(), N(l, {
			key: 0,
			name: "check"
		})) : P("", !0)]), L(" " + Y(t.label), 1)], 42, wr))), 128)), h.value.length === 0 ? (G(), F("li", Er, "No matches")) : P("", !0)], 8, Cr), [[Ae, o.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), Or = { class: "filterbar__main" }, kr = { class: "filterbar__search" }, Ar = { class: "filterbar__sort" }, jr = ["aria-label"], Mr = ["aria-expanded"], Nr = { class: "filterbar__advanced" }, Pr = { class: "filterbar__field" }, Fr = { class: "filterbar__field" }, Ir = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Lr = { class: "filterbar__field" }, Rr = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, zr = { class: "filterbar__field" }, Br = { class: "filterbar__years" }, Vr = { class: "filterbar__field filterbar__presets" }, Hr = { class: "filterbar__chips" }, Ur = {
	key: 0,
	class: "filterbar__presets-empty"
}, Wr = {
	key: 0,
	class: "filterbar__preset-save"
}, Gr = ["onKeydown"], Kr = ["disabled"], qr = { class: "filterbar__active" }, Jr = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Yr = { class: "filterbar__pills" }, Xr = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = wn(), a = $(), o = [
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
		], s = K(i.search), c;
		Z(() => i.search, (e) => {
			e !== s.value.trim() && (s.value = e);
		});
		function u() {
			clearTimeout(c), c = setTimeout(() => {
				i.setSearch(s.value.trim()), r("change");
			}, n.searchDebounce);
		}
		function d() {
			s.value = "", i.setSearch(""), r("change");
		}
		let f = K(null), p = K(0), m = M(() => i.availableGenres.filter((e) => !i.selectedGenres.includes(e)));
		function h(e) {
			if (e == null || e === "") return;
			let t = String(e);
			i.selectedGenres.includes(t) || (i.setGenres([...i.selectedGenres, t]), r("change")), f.value = null, p.value++;
		}
		function g(e) {
			let t = i.selectedRatings;
			i.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), r("change");
		}
		function _(e) {
			let t = i.selectedTypes;
			i.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), r("change");
		}
		let v = M(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), y = M(() => {
			let e = [];
			for (let t = v.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function b(e) {
			i.setYearRange(e == null || e === "" ? void 0 : Number(e), i.yearTo), r("change");
		}
		function C(e) {
			i.setYearRange(i.yearFrom, e == null || e === "" ? void 0 : Number(e)), r("change");
		}
		function w(e) {
			i.setSort(e), r("change");
		}
		function T() {
			i.order = i.order === "asc" ? "desc" : "asc", i.offset = 0, r("change");
		}
		let E = M(() => {
			let e = [];
			return i.search && e.push({
				key: "search",
				label: `“${i.search}”`,
				remove: d
			}), i.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					i.setGenres(i.selectedGenres.filter((e) => e !== t)), r("change");
				}
			})), i.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => g(t)
			})), i.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => _(t)
			})), i.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${i.yearFrom}`,
				remove: () => b(null)
			}), i.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${i.yearTo}`,
				remove: () => C(null)
			}), e;
		}), D = M(() => E.value.length > 0), O = M(() => i.selectedGenres.length + i.selectedRatings.length + i.selectedTypes.length + (i.yearFrom === void 0 ? 0 : 1) + (i.yearTo === void 0 ? 0 : 1));
		function ee() {
			s.value = "", i.setSearch(""), i.setGenres([]), i.setRatings([]), i.setTypes([]), i.setYearRange(void 0, void 0), r("change");
		}
		let k = K(!1), te = M(() => a.filterPresets), ne = K(!1), re = K("");
		function ie() {
			ne.value = !0, re.value = "";
		}
		function ae() {
			let e = re.value.trim();
			e && (a.saveFilterPreset(e, i.toQuery()), ne.value = !1, re.value = "");
		}
		function oe(e) {
			i.applyQuery(e.query), s.value = i.search, r("change");
		}
		function se(e) {
			a.removeFilterPreset(e.id);
		}
		let ce = K(!1);
		function A() {
			typeof window > "u" || (ce.value = window.scrollY > 24);
		}
		return W(() => {
			n.sticky && typeof window < "u" && (window.addEventListener("scroll", A, { passive: !0 }), A());
		}), U(() => {
			clearTimeout(c), typeof window < "u" && window.removeEventListener("scroll", A);
		}), (t, n) => (G(), F("div", { class: V(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ce.value
		}]) }, [
			I("div", Or, [
				I("label", kr, [
					R(l, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					Me(I("input", {
						"onUpdate:modelValue": n[0] ||= (e) => s.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: u
					}, null, 544), [[ke, s.value]]),
					s.value ? (G(), F("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: d
					}, [R(l, { name: "x" })])) : P("", !0)
				]),
				I("div", Ar, [R(x, {
					"model-value": X(i).sort,
					options: o,
					label: "Sort by",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value"]), I("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${X(i).order === "asc" ? "ascending" : "descending"}`,
					onClick: T
				}, [R(l, { name: X(i).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, jr)]),
				I("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": k.value,
					onClick: n[1] ||= (e) => k.value = !k.value
				}, [
					R(l, { name: "filter" }),
					n[4] ||= I("span", null, "Filters", -1),
					O.value ? (G(), N(S, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: Q(() => [L(Y(O.value), 1)]),
						_: 1
					})) : P("", !0),
					R(l, {
						name: k.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, Mr)
			]),
			R(_e, { name: "filterbar-panel" }, {
				default: Q(() => [Me(I("div", Nr, [
					I("div", Pr, [n[5] ||= I("span", { class: "filterbar__field-label" }, "Genres", -1), (G(), N(Dr, {
						key: p.value,
						"model-value": f.value,
						options: m.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": h
					}, null, 8, ["model-value", "options"]))]),
					I("div", Fr, [n[6] ||= I("span", { class: "filterbar__field-label" }, "Rating", -1), I("div", Ir, [(G(!0), F(j, null, q(X(i).availableRatings, (e) => (G(), N(br, {
						key: e,
						selected: X(i).selectedRatings.includes(e),
						"onUpdate:selected": (t) => g(e)
					}, {
						default: Q(() => [L(Y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					I("div", Lr, [n[7] ||= I("span", { class: "filterbar__field-label" }, "Type", -1), I("div", Rr, [(G(!0), F(j, null, q(X(i).availableTypes, (e) => (G(), N(br, {
						key: e,
						selected: X(i).selectedTypes.includes(e),
						"onUpdate:selected": (t) => _(e)
					}, {
						default: Q(() => [L(Y(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					I("div", zr, [n[9] ||= I("span", { class: "filterbar__field-label" }, "Year", -1), I("div", Br, [
						R(Dr, {
							"model-value": X(i).yearFrom ?? null,
							options: y.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": b
						}, null, 8, ["model-value", "options"]),
						n[8] ||= I("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						R(Dr, {
							"model-value": X(i).yearTo ?? null,
							options: y.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": C
						}, null, 8, ["model-value", "options"])
					])]),
					I("div", Vr, [
						n[12] ||= I("span", { class: "filterbar__field-label" }, "Presets", -1),
						I("div", Hr, [(G(!0), F(j, null, q(te.value, (e) => (G(), N(br, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => oe(e),
							onRemove: (t) => se(e)
						}, {
							default: Q(() => [L(Y(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), te.value.length ? P("", !0) : (G(), F("span", Ur, "No saved presets"))]),
						ne.value ? (G(), F("div", Wr, [Me(I("input", {
							"onUpdate:modelValue": n[2] ||= (e) => re.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [Ne(Pe(ae, ["prevent"]), ["enter"]), n[3] ||= Ne((e) => ne.value = !1, ["esc"])]
						}, null, 40, Gr), [[ke, re.value]]), I("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ae
						}, [R(l, { name: "check" }), n[10] ||= L(" Save ", -1)])])) : (G(), F("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !D.value,
							onClick: ie
						}, [R(l, { name: "plus" }), n[11] ||= L(" Save current ", -1)], 8, Kr))
					])
				], 512), [[Ae, k.value]])]),
				_: 1
			}),
			I("div", qr, [I("span", Jr, [I("b", null, Y(X(i).total.toLocaleString()), 1), L(" " + Y(X(i).total === 1 ? "title" : "titles"), 1)]), D.value ? (G(), F(j, { key: 0 }, [I("div", Yr, [(G(!0), F(j, null, q(E.value, (e) => (G(), N(br, {
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
				onClick: ee
			}, "Clear all")], 64)) : P("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), Zr = { class: "browse-page" }, Qr = { class: "browse-toolbar" }, $r = { class: "browse-header" }, ei = { class: "browse-count numeric" }, ti = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "BrowsePage",
	setup(e) {
		let t = B("apiBase", ""), n = M(() => typeof t == "string" ? t : t?.value ?? ""), r = B("phlixConfig", null), i = M(() => r?.homeRows ?? []), a = wn(), o = Kt(), s = u(), c = Ue(), l = K(null), d = Ce(/* @__PURE__ */ new Map());
		function p(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		Z(() => a.items, (e) => p(e), { immediate: !0 });
		let m = M(() => {
			let e = o.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function h() {
			a.reset(), a.fetchMedia(n.value);
		}
		W(h), Z(n, h);
		function g() {
			a.reset(), a.fetchMedia(n.value);
		}
		function v() {
			a.loadMore(n.value);
		}
		function y(e, t) {
			c?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function b(e) {
			y("player", e.id);
		}
		function x(e) {
			s.success(`Added "${e.name}" to your list`);
		}
		function S(e) {
			c?.hasRoute("media") ? y("media", e.id) : s.info(`Details for "${e.name}" are coming soon`);
		}
		function C() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function w(e) {
			a.applyQuery(e.query ?? {}), h(), l.value?.scrollIntoView?.({
				behavior: C() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (e, t) => (G(), F("div", Zr, [
			I("div", Qr, [J(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			m.value.length ? (G(), N(pr, {
				key: 0,
				title: "Continue Watching",
				items: m.value,
				"hide-when-empty": "",
				onPlay: b,
				onWatchlist: x,
				onInfo: S
			}, null, 8, ["items"])) : P("", !0),
			(G(!0), F(j, null, q(i.value, (e) => (G(), N(gr, {
				key: e.id,
				row: e,
				"api-base": n.value,
				onItemsLoaded: p,
				onSeeAll: w,
				onPlay: b,
				onWatchlist: x,
				onInfo: S
			}, null, 8, ["row", "api-base"]))), 128)),
			I("section", {
				ref_key: "gridSection",
				ref: l,
				class: "browse-library"
			}, [
				I("div", $r, [t[0] ||= I("h1", { class: "browse-title" }, "Browse", -1), I("span", ei, Y(X(a).total.toLocaleString()) + " titles", 1)]),
				R(Xr, { onChange: g }),
				X(a).error ? (G(), N(_, {
					key: 0,
					icon: "alert",
					title: "Couldn't load titles",
					description: X(a).error
				}, {
					actions: Q(() => [R(f, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: h
					}, {
						default: Q(() => [...t[1] ||= [L("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : P("", !0),
				R(rr, {
					items: X(a).items,
					loading: X(a).loading && X(a).items.length === 0,
					"loading-more": X(a).loading && X(a).items.length > 0,
					"has-more": X(a).hasMore,
					onLoadMore: v,
					onPlay: b,
					onWatchlist: x,
					onInfo: S
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-c89757fa"]]), ni = { class: "media-detail" }, ri = { class: "media-detail__bar" }, ii = { class: "media-detail__hero" }, ai = { class: "media-detail__poster" }, oi = ["src", "alt"], si = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, ci = { class: "media-detail__info" }, li = { class: "media-detail__title" }, ui = { class: "media-detail__meta numeric" }, di = {
	key: 0,
	class: "media-detail__meta-item"
}, fi = {
	key: 1,
	class: "media-detail__cert"
}, pi = {
	key: 2,
	class: "media-detail__meta-item"
}, mi = { class: "media-detail__type" }, hi = {
	key: 0,
	class: "media-detail__genres"
}, gi = { class: "media-detail__overview" }, _i = { class: "media-detail__actions" }, vi = { class: "media-detail__resume-at numeric" }, yi = {
	key: 1,
	class: "media-detail__credits"
}, bi = {
	key: 0,
	class: "media-detail__credit"
}, xi = {
	key: 1,
	class: "media-detail__credit"
}, Si = { class: "media-detail__cast" }, Ci = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = M(() => n.item.type === "audio" ? "music" : n.item.type === "image" ? "image" : n.item.type === "series" ? "tv" : "film"), a = M(() => n.item.actors?.slice(0, 8) ?? []), o = M(() => {
			let e = n.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(r).padStart(2, "0") : String(r);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), s = K(!1), c = K(null);
		function u() {
			s.value = !0;
		}
		return W(() => {
			c.value?.complete && (s.value = !0);
		}), (t, n) => (G(), F("article", ni, [
			e.item.poster_url ? (G(), F("div", {
				key: 0,
				class: "media-detail__ambient",
				style: H({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : P("", !0),
			I("div", ri, [e.showBack ? (G(), N(f, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => r("back")
			}, {
				default: Q(() => [...n[7] ||= [L("Back", -1)]]),
				_: 1
			})) : P("", !0)]),
			I("div", ii, [I("div", ai, [e.item.poster_url ? (G(), F("img", {
				key: 0,
				ref_key: "imgEl",
				ref: c,
				class: V(["media-detail__img", { "is-loaded": s.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: u
			}, null, 42, oi)) : (G(), F("div", si, [R(l, { name: i.value }, null, 8, ["name"])]))]), I("div", ci, [
				I("h1", li, Y(e.item.name), 1),
				I("div", ui, [
					e.item.year ? (G(), F("span", di, [R(l, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), L(Y(e.item.year), 1)])) : P("", !0),
					e.item.rating ? (G(), F("span", fi, Y(e.item.rating), 1)) : P("", !0),
					e.item.runtime ? (G(), F("span", pi, Y(e.item.runtime) + "m", 1)) : P("", !0),
					I("span", mi, Y(e.item.type), 1)
				]),
				e.item.genres?.length ? (G(), F("div", hi, [(G(!0), F(j, null, q(e.item.genres, (e) => (G(), N(br, {
					key: e,
					size: "sm"
				}, {
					default: Q(() => [L(Y(e), 1)]),
					_: 2
				}, 1024))), 128))])) : P("", !0),
				I("p", gi, Y(e.item.overview || "No overview available."), 1),
				I("div", _i, [
					R(f, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => r("play", e.item)
					}, {
						default: Q(() => [...n[8] ||= [L("Play", -1)]]),
						_: 1
					}),
					o.value ? (G(), N(f, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => r("resume", e.item)
					}, {
						default: Q(() => [n[9] ||= L(" Resume ", -1), I("span", vi, Y(o.value), 1)]),
						_: 1
					})) : P("", !0),
					R(f, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: n[3] ||= (t) => r("watchlist", e.item)
					}, {
						default: Q(() => [...n[10] ||= [L("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || a.value.length ? (G(), F("dl", yi, [e.item.director ? (G(), F("div", bi, [n[11] ||= I("dt", null, "Director", -1), I("dd", null, Y(e.item.director), 1)])) : P("", !0), a.value.length ? (G(), F("div", xi, [n[12] ||= I("dt", null, "Cast", -1), I("dd", Si, [(G(!0), F(j, null, q(a.value, (e) => (G(), N(br, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: Q(() => [L(Y(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : P("", !0)])) : P("", !0)
			])]),
			e.similarLoading || e.similar.length ? (G(), N(pr, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: n[4] ||= (e) => r("play", e),
				onWatchlist: n[5] ||= (e) => r("watchlist", e),
				onInfo: n[6] ||= (e) => r("info", e)
			}, null, 8, ["items", "loading"])) : P("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), wi = { class: "media-detail-page" }, Ti = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, Ei = { class: "media-detail-page__loading-hero" }, Di = { class: "media-detail-page__loading-info" }, Oi = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "MediaDetailPage",
	setup(t) {
		let n = B("apiBase", ""), r = M(() => typeof n == "string" ? n : n?.value ?? ""), i = He(), a = Ue(), o = Kt(), c = u(), l = K(null), d = K([]), p = K(!0), m = K(!1), h = K(null), g = M(() => String(i.params.id ?? "")), v = M(() => o.resumePositionFor(g.value)), y = null, b = !1;
		function x(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function S(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				d.value = [];
				return;
			}
			let i = y, a = () => b || i !== y;
			m.value = !0;
			try {
				let o = hr(r.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				d.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || x(e)) return;
				d.value = [];
			} finally {
				a() || (m.value = !1);
			}
		}
		async function C() {
			let t = g.value;
			if (y?.abort(), y = typeof AbortController < "u" ? new AbortController() : null, p.value = !0, h.value = null, d.value = [], !t) {
				h.value = "No media id provided", p.value = !1;
				return;
			}
			try {
				let n = new e({ baseUrl: r.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, y?.signal);
				if (b) return;
				l.value = i, p.value = !1, S(n, i);
			} catch (e) {
				if (b || x(e)) return;
				h.value = e instanceof Error ? e.message : "Failed to load title", p.value = !1;
			}
		}
		W(C), Z(g, C), U(() => {
			b = !0, y?.abort(), y = null;
		});
		function w(e, t) {
			a?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function T(e) {
			w("player", e.id);
		}
		function E(e) {
			c.success(`Added "${e.name}" to your list`);
		}
		function D(e) {
			w("media", e.id);
		}
		function O() {
			a?.back();
		}
		return (e, t) => (G(), F("div", wi, [p.value ? (G(), F("div", Ti, [I("div", Ei, [R(s, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), I("div", Di, [
			R(s, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			R(s, {
				variant: "text",
				lines: 4
			}),
			R(s, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : h.value ? (G(), N(_, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: h.value
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				onClick: C
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			}), R(f, {
				variant: "ghost",
				onClick: O
			}, {
				default: Q(() => [...t[1] ||= [L("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : l.value ? (G(), N(Ci, {
			key: 2,
			item: l.value,
			"resume-seconds": v.value,
			similar: d.value,
			"similar-loading": m.value,
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
function ki(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Ai = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], ji = { class: "scrubber__track" }, Mi = ["title"], Ni = { class: "scrubber__time numeric" }, Pi = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
			"aria-valuetext": X(ki)(e.position),
			"aria-label": "Seek",
			onPointerdown: x,
			onPointermove: S,
			onPointerup: C,
			onPointercancel: C,
			onPointerenter: w,
			onPointerleave: T,
			onKeydown: E
		}, [I("div", ji, [
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
			}, null, 12, Mi))), 128)),
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
		}, null, 4)) : P("", !0), I("span", Ni, Y(X(ki)(h.value)), 1)], 4)) : P("", !0)], 40, Ai));
	}
}), [["__scopeId", "data-v-b2711211"]]), Fi = [
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
], Ii = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Li = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Ri(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function zi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Bi(e, t) {
	switch (e.key) {
		case " ": return Ri(e.target) ? !1 : (t.playPause(), !0);
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
function Vi(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || zi(n.target) || Bi(n, e) && n.preventDefault();
	}
	W(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), U(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Hi = { class: "shortcuts__head" }, Ui = { class: "shortcuts__grid" }, Wi = { class: "shortcuts__keys" }, Gi = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Ki = {
	key: 1,
	class: "shortcuts__key"
}, qi = { class: "shortcuts__label" }, Ji = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Fi }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = K(null);
		return m(i, De(n, "open"), {
			lockScroll: !1,
			onEscape: () => (r("close"), !0)
		}), (t, n) => e.open ? (G(), F("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Pe((e) => r("close"), ["self"])
		}, [I("div", {
			ref_key: "panelEl",
			ref: i,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [I("div", Hi, [n[2] ||= I("h3", { class: "shortcuts__title" }, "Keyboard", -1), R(h, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: n[0] ||= (e) => r("close")
		})]), I("ul", Ui, [(G(!0), F(j, null, q(e.shortcuts, (e) => (G(), F("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [I("span", Wi, [(G(!0), F(j, null, q(e.keys, (e, t) => (G(), F(j, { key: t }, [e === "–" ? (G(), F("span", Gi, "–")) : (G(), F("kbd", Ki, [X(Ii)[e] ? (G(), N(l, {
			key: 0,
			name: X(Ii)[e],
			label: X(Li)[e] ?? e
		}, null, 8, ["name", "label"])) : (G(), F(j, { key: 1 }, [L(Y(e), 1)], 64))]))], 64))), 128))]), I("span", qi, Y(e.label), 1)]))), 128))])], 512)])) : P("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), Yi = { class: "volume" }, Xi = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "VolumeControl",
	setup(e) {
		let t = Kt(), n = $(), r = M(() => t.muted ? 0 : t.volume), i = M(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (G(), F("div", Yi, [R(h, {
			name: i.value,
			label: X(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => X(t).toggleMute()
		}, null, 8, ["name", "label"]), R(C, {
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
}), [["__scopeId", "data-v-2768c5e3"]]), Zi = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		], n = Kt(), r = M(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (G(), N(x, {
			class: "speed-menu",
			"model-value": X(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), Qi = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = Kt(), r = $(), i = M(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (G(), N(x, {
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
function $i(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function ea(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function ta(e, t) {
	return e.language || e.label || `track-${t}`;
}
function na(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function ra(e) {
	return e ? $i(e.textTracks).filter(ea).map((e, t) => ({
		index: t,
		language: ta(e, t),
		label: e.label || na(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function ia(e) {
	let t = e?.audioTracks;
	return $i(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || na(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function aa(e, t) {
	return !e || t == null ? null : $i(e.textTracks).filter(ea).find((e, n) => ta(e, n) === t) ?? null;
}
function oa(e, t) {
	return aa(e, t) != null;
}
function sa(e, t) {
	e && $i(e.textTracks).filter(ea).forEach((e, n) => {
		try {
			e.mode = ta(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function ca(e, t) {
	let n = e?.audioTracks;
	$i(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function la(e) {
	let t = e?.audioTracks;
	return $i(t).findIndex((e) => e.enabled);
}
var ua = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function da(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function fa(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && da(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(ua, n) ? ua[n] : e;
	});
}
function pa(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => fa(e).trim()).filter((e) => e.length > 0) : [];
}
function ma(e) {
	if (!e) return [];
	let t = $i(e.activeCues), n = [];
	for (let e of t) n.push(...pa(e.text));
	return n;
}
var ha = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, ga = [
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
], _a = [
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
], va = [
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
], ya = [
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
function ba(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function xa(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Sa(e) {
	return {
		"--cap-scale": String(ha[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": ba(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": xa(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var Ca = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = K([]), i = M(() => Sa(n.styleConfig)), a = null;
		function o() {
			r.value = ma(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), sa(n.video, n.language);
			let e = aa(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = ma(e)) : r.value = [];
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
}), [["__scopeId", "data-v-15a0f3c5"]]), wa = ["aria-label", "aria-expanded"], Ta = { class: "capmenu__head" }, Ea = ["aria-checked", "tabindex"], Da = { class: "capmenu__check" }, Oa = [
	"aria-checked",
	"tabindex",
	"onClick"
], ka = { class: "capmenu__check" }, Aa = { class: "capmenu__optlabel" }, ja = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ma = { class: "capmenu__check" }, Na = { class: "capmenu__optlabel" }, Pa = { class: "capmenu__style" }, Fa = { class: "capmenu__field" }, Ia = { class: "capmenu__field" }, La = { class: "capmenu__field" }, Ra = { class: "capmenu__field" }, za = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = Kt(), a = $(), o = K(null), s = K(null), c = M(() => i.subtitleLang), u = M(() => n.tracks.some((e) => e.language === c.value)), d = M(() => u.value ? "captions" : "captions-off"), f = M(() => u.value ? n.tracks.findIndex((e) => e.language === c.value) + 1 : 0), p = M(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function g(e) {
			r("update:open", e);
		}
		function _() {
			g(!1);
		}
		function v(e) {
			i.setSubtitle(e), a.defaultSubtitleLang = e;
		}
		function y(e) {
			r("select-audio", e);
		}
		function b(e, t, n) {
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
			let t = b(e, n.tracks.length + 1, f.value);
			t !== null && v(t === 0 ? null : n.tracks[t - 1].language);
		}
		function C(e) {
			let t = b(e, n.audioTracks.length, p.value);
			t !== null && y(n.audioTracks[t].index);
		}
		function w(e) {
			a.captionStyle = {
				...a.captionStyle,
				size: e
			};
		}
		function T(e) {
			a.captionStyle = {
				...a.captionStyle,
				textColor: String(e)
			};
		}
		function E(e) {
			a.captionStyle = {
				...a.captionStyle,
				background: e
			};
		}
		function D(e) {
			a.captionStyle = {
				...a.captionStyle,
				edge: e
			};
		}
		m(s, De(n, "open"), {
			lockScroll: !1,
			onEscape: () => (_(), !0)
		});
		function O(e) {
			o.value && !o.value.contains(e.target) && _();
		}
		return Z(() => n.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", O, !0) : document.removeEventListener("pointerdown", O, !0));
		}, { immediate: !0 }), U(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", O, !0);
		}), (t, n) => (G(), F("div", {
			ref_key: "rootEl",
			ref: o,
			class: "capmenu"
		}, [I("button", {
			type: "button",
			class: V(["capmenu__btn", { "is-active": u.value }]),
			"aria-label": u.value ? "Captions (on)" : "Captions (off)",
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [R(l, { name: d.value }, null, 8, ["name"])], 10, wa), e.open ? (G(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: s,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Captions and subtitles",
			tabindex: "-1"
		}, [
			I("div", Ta, [n[2] ||= I("h3", { class: "capmenu__title" }, "Subtitles", -1), R(h, {
				name: "x",
				label: "Close",
				size: "sm",
				onClick: _
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
				"aria-checked": !u.value,
				tabindex: f.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => v(null)
			}, [I("span", Da, [u.value ? P("", !0) : (G(), N(l, {
				key: 0,
				name: "check"
			}))]), n[3] ||= I("span", { class: "capmenu__optlabel" }, "Off", -1)], 8, Ea), (G(!0), F(j, null, q(e.tracks, (e, t) => (G(), F("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": c.value === e.language,
				tabindex: f.value === t + 1 ? 0 : -1,
				onClick: (t) => v(e.language)
			}, [I("span", ka, [c.value === e.language ? (G(), N(l, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", Aa, Y(e.label), 1)], 8, Oa))), 128))], 32),
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
				tabindex: p.value === t.index ? 0 : -1,
				onClick: (e) => y(t.index)
			}, [I("span", Ma, [e.activeAudio === t.index ? (G(), N(l, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", Na, Y(t.label), 1)], 8, ja))), 128))], 32)], 64)) : P("", !0),
			n[9] ||= I("h3", { class: "capmenu__title capmenu__title--sub" }, "Caption style", -1),
			I("div", Pa, [
				I("div", Fa, [n[5] ||= I("span", { class: "capmenu__fieldlabel" }, "Size", -1), R(x, {
					"model-value": X(a).captionStyle.size,
					options: X(ga),
					label: "Caption size",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value", "options"])]),
				I("div", Ia, [n[6] ||= I("span", { class: "capmenu__fieldlabel" }, "Color", -1), R(x, {
					"model-value": X(a).captionStyle.textColor,
					options: X(_a),
					label: "Caption color",
					"onUpdate:modelValue": T
				}, null, 8, ["model-value", "options"])]),
				I("div", La, [n[7] ||= I("span", { class: "capmenu__fieldlabel" }, "Background", -1), R(x, {
					"model-value": X(a).captionStyle.background,
					options: X(va),
					label: "Caption background",
					"onUpdate:modelValue": E
				}, null, 8, ["model-value", "options"])]),
				I("div", Ra, [n[8] ||= I("span", { class: "capmenu__fieldlabel" }, "Edge", -1), R(x, {
					"model-value": X(a).captionStyle.edge,
					options: X(ya),
					label: "Caption edge",
					"onUpdate:modelValue": D
				}, null, 8, ["model-value", "options"])])
			])
		], 512)) : P("", !0)], 512));
	}
}), [["__scopeId", "data-v-aff48a56"]]), Ba = 32, Va = 18, Ha = 250, Ua = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Wa(e, t, n, r, i, a, o) {
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
		r: Ua(d / m),
		g: Ua(f / m),
		b: Ua(p / m)
	};
}
function Ga(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Wa(e, t, n, 0, 0, r, n),
		right: Wa(e, t, n, t - r, 0, t, n),
		center: Wa(e, t, n, 0, 0, t, n)
	};
}
function Ka({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function qa({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Ja(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${qa(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${qa(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${qa(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Ya(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Xa = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
			r.value = Ya(i);
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
				c.value = Ja(Ga(n, 32, 18));
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
}), [["__scopeId", "data-v-404fe1d9"]]), Za = {
	class: "resume",
	role: "region",
	"aria-label": "Resume playback"
}, Qa = { class: "resume__label" }, $a = { class: "resume__time numeric" }, eo = { class: "resume__actions" }, to = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (G(), F("div", Za, [I("p", Qa, [
			r[2] ||= L(" Resume from ", -1),
			I("span", $a, Y(X(ki)(e.seconds)), 1),
			r[3] ||= L("? ", -1)
		]), I("div", eo, [I("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: r[0] ||= (e) => n("resume")
		}, [R(l, { name: "play" }), r[4] ||= I("span", null, "Resume", -1)]), I("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: r[1] ||= (e) => n("restart")
		}, [R(l, { name: "rewind" }), r[5] ||= I("span", null, "Start over", -1)])])]));
	}
}), [["__scopeId", "data-v-766eae6c"]]), no = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], ro = [
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
], io = new Set(ro);
function ao(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function oo(...e) {
	return e.some((e) => io.has(ao(e)));
}
function so(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var co = 8, lo = 15, uo = 2 * Math.PI * 15;
function fo(e, t, n = uo) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var po = {
	class: "upnext",
	role: "region",
	"aria-label": "Up next"
}, mo = ["src"], ho = { class: "upnext__body" }, go = { class: "upnext__title" }, _o = {
	key: 0,
	class: "upnext__cd numeric"
}, vo = { class: "upnext__actions" }, yo = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, bo = ["r"], xo = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], So = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = M(() => n.posterUrl ?? n.media.poster_url ?? null), a = M(() => fo(n.remaining, n.total));
		return (t, n) => (G(), F("aside", po, [
			i.value ? (G(), F("img", {
				key: 0,
				class: "upnext__thumb",
				src: i.value,
				alt: "",
				loading: "lazy"
			}, null, 8, mo)) : P("", !0),
			I("div", ho, [
				n[3] ||= I("p", { class: "upnext__eyebrow" }, "Up next", -1),
				I("h4", go, Y(e.media.name), 1),
				e.counting ? (G(), F("p", _o, "Starts in " + Y(Math.max(0, e.remaining)) + "s", 1)) : P("", !0),
				I("div", vo, [I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: n[0] ||= (e) => r("play-now")
				}, [R(l, { name: "play" }), n[2] ||= I("span", null, "Play now", -1)]), I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: n[1] ||= (e) => r("cancel")
				}, "Cancel")])
			]),
			e.counting ? (G(), F("svg", yo, [I("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, bo), I("circle", {
				cx: "18",
				cy: "18",
				r: X(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": X(uo),
				"stroke-dashoffset": a.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, xo)])) : P("", !0)
		]));
	}
}), [["__scopeId", "data-v-f81cfb02"]]), Co = {
	class: "transcode",
	role: "alert"
}, wo = { class: "transcode__card" }, To = { class: "transcode__body" }, Eo = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (G(), F("div", Co, [I("div", wo, [
			R(l, {
				name: "alert",
				class: "transcode__icon"
			}),
			r[3] ||= I("h3", { class: "transcode__heading" }, "Can’t play this file here", -1),
			I("p", To, [e.title ? (G(), F(j, { key: 0 }, [L("“" + Y(e.title) + "” is", 1)], 64)) : (G(), F(j, { key: 1 }, [L("This title is")], 64)), r[1] ||= L(" in a format your browser can’t play directly (for example MKV or HEVC). Transcoding isn’t available yet. ", -1)]),
			I("button", {
				type: "button",
				class: "transcode__back",
				onClick: r[0] ||= (e) => n("back")
			}, [R(l, { name: "arrow-left" }), r[2] ||= I("span", null, "Go back", -1)])
		])]));
	}
}), [["__scopeId", "data-v-4b751a55"]]), Do = { class: "player__stage" }, Oo = ["src", "poster"], ko = { class: "player__meta" }, Ao = { class: "player__meta-text" }, jo = { class: "player__title" }, Mo = { class: "player__sub numeric" }, No = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Po = {
	key: 0,
	class: "player__center"
}, Fo = ["aria-label"], Io = { class: "player__btnrow" }, Lo = ["aria-label"], Ro = { class: "player__time numeric" }, zo = ["aria-label", "aria-pressed"], Bo = ["aria-label", "aria-pressed"], Vo = ["aria-label"], Ho = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = Kt(), a = $(), o = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], s = K(null), c = K(null), u = K(!0), d = K(!1), f = K(!1), p = K(!1), m = K(!1), h = K(!1), g = K(!1), _ = M(() => m.value ? 1.35 : 1), v = K(oo(n.streamUrl, n.media.path)), y = K(i.resumePositionFor(n.media.id) ?? 0), b = K(!v.value && y.value > 0), x = null, S = K(!1), C = K(8), w, T = M(() => i.upNext);
		function E() {
			v.value = oo(n.streamUrl, n.media.path), y.value = i.resumePositionFor(n.media.id) ?? 0, b.value = !v.value && y.value > 0, x = null, k(), S.value = !1;
		}
		function D(e) {
			let t = s.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : x = Math.max(0, e));
		}
		function O() {
			D(y.value), b.value = !1, s.value?.play()?.catch(() => {});
		}
		function ee() {
			x = null, D(0), i.clearResume(n.media.id), b.value = !1, s.value?.play()?.catch(() => {});
		}
		function k() {
			w &&= (clearInterval(w), void 0);
		}
		function te() {
			C.value = 8, k(), w = setInterval(() => {
				--C.value, C.value <= 0 && (k(), re());
			}, 1e3);
		}
		function ne() {
			i.upNext && (S.value = !0, a.autoplay && te());
		}
		function re() {
			k(), S.value = !1;
			let e = i.next(n.streamUrlFor);
			e && r("play-next", e);
		}
		function ie() {
			k(), S.value = !1;
		}
		function ae() {
			so(s.value) && (v.value = !0);
		}
		let oe = K([]), se = K([]), ce = K(-1), A = K(!1), le = i.subtitleLang, ue = M(() => oe.value.some((e) => e.language === i.subtitleLang));
		function de() {
			let e = s.value;
			oe.value = ra(e), se.value = ia(e), ce.value = la(e);
		}
		function fe() {
			if (ue.value) le = i.subtitleLang, i.setSubtitle(null);
			else {
				let e = le && oe.value.some((e) => e.language === le) ? le : oe.value[0]?.language ?? null;
				i.setSubtitle(e);
			}
			r("captions");
		}
		function pe(e) {
			ca(s.value, e), ce.value = e;
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
		function _e() {
			let e = s.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function ve(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function ye() {
			i.play();
		}
		function be() {
			i.pause();
		}
		function z() {
			let e = s.value;
			e && (i.updateProgress(e.currentTime, e.duration, ve(e)), i.setMediaPositionState());
		}
		function B() {
			let e = s.value;
			e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, x !== null && (e.currentTime = e.duration ? Math.min(e.duration, x) : x, x = null), i.updateProgress(e.currentTime, e.duration, ve(e)), i.setMediaPositionState(), de());
		}
		function xe() {
			let e = s.value;
			e && i.updateProgress(e.currentTime, e.duration, ve(e));
		}
		function H() {
			let e = s.value;
			e && (Math.abs(e.volume - i.volume) > .001 && i.setVolume(e.volume), e.muted !== i.muted && i.toggleMute());
		}
		function Se() {
			let e = s.value;
			e && e.playbackRate !== i.rate && i.setRate(e.playbackRate);
		}
		function Ce(e) {
			let t = s.value;
			t && i.duration > 0 && (t.currentTime = Math.min(i.duration, Math.max(0, e)));
		}
		function we() {
			f.value = !0, Fe();
		}
		function J() {
			f.value = !1, Fe();
		}
		function Te(e) {
			let t = o.reduce((e, t, n) => Math.abs(t - i.rate) < Math.abs(o[e] - i.rate) ? n : e, 0), n = o[Math.min(o.length - 1, Math.max(0, t + e))];
			i.setRate(n);
		}
		Vi({
			playPause: _e,
			seekBy: (e) => Ce(i.position + e),
			frameStep: (e) => {
				i.playing || Ce(i.position + e / 30);
			},
			volumeBy: (e) => i.setVolume(i.volume + e),
			toggleMute: Ee,
			toggleFullscreen: Oe,
			toggleCaptions: fe,
			toggleTheater: De,
			togglePip: Ae,
			seekToPercent: (e) => Ce(e * i.duration),
			speedStep: Te,
			toggleHelp: () => {
				p.value = !p.value;
			}
		}, { enabled: () => !p.value && !A.value });
		function Ee() {
			i.toggleMute();
		}
		function De() {
			m.value = !m.value, r("theater", m.value);
		}
		Z(() => i.muted, (e) => {
			let t = s.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => i.volume, (e) => {
			let t = s.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => i.rate, (e) => {
			let t = s.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function Oe() {
			if (typeof document > "u") return;
			let e = c.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function ke() {
			d.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Ae() {
			let e = s.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			r("pip");
		}
		function je() {
			h.value = !0;
		}
		function Q() {
			h.value = !1;
		}
		function Me() {
			he &&= (clearTimeout(he), void 0);
		}
		function Ne() {
			Me(), !(!i.playing || f.value) && (he = setTimeout(() => {
				i.playing && !f.value && (u.value = !1);
			}, n.idleTimeout ?? 3e3));
		}
		function Fe() {
			u.value = !0, Ne();
		}
		Z(() => i.playing, (e) => {
			e ? (b.value = !1, ie(), Ne()) : (Me(), u.value = !0);
		});
		let Ie = null;
		return W(() => {
			i.setCurrent(n.media, {
				resetPosition: !1,
				streamUrl: n.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", ke), g.value = document.pictureInPictureEnabled === !0), Ie = i.bindMediaSession({
				onPlay: () => void s.value?.play()?.catch(() => {}),
				onPause: () => s.value?.pause(),
				onSeek: (e) => Ce(e)
			}), me = s.value?.textTracks ?? null, me?.addEventListener?.("addtrack", de), me?.addEventListener?.("removetrack", de), de();
		}), Z(() => n.media, (e) => {
			i.setCurrent(e, {
				resetPosition: !1,
				streamUrl: n.streamUrl
			}), E();
		}), U(() => {
			Me(), k(), typeof document < "u" && document.removeEventListener("fullscreenchange", ke), Ie?.(), me?.removeEventListener?.("addtrack", de), me?.removeEventListener?.("removetrack", de);
		}), (t, n) => (G(), F("div", {
			ref_key: "containerRef",
			ref: c,
			class: V(["player", {
				"is-chrome-hidden": !u.value,
				"is-theater": m.value
			}]),
			onPointermove: Fe,
			onPointerdown: Fe,
			onFocusin: Fe
		}, [R(Xa, {
			video: s.value,
			enabled: X(a).atmosphere,
			playing: X(i).playing,
			"reduced-motion": X(a).effectiveReducedMotion,
			intensity: _.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), I("div", Do, [
			I("video", {
				ref_key: "videoRef",
				ref: s,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: ye,
				onPause: be,
				onTimeupdate: z,
				onLoadedmetadata: B,
				onProgress: xe,
				onVolumechange: H,
				onRatechange: Se,
				onEnded: ne,
				onError: ae,
				onEnterpictureinpicture: je,
				onLeavepictureinpicture: Q,
				onClick: _e
			}, null, 40, Oo),
			n[9] ||= I("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[10] ||= I("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			I("div", ko, [I("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: n[0] ||= Pe((e) => r("back"), ["stop"])
			}, [R(l, { name: "arrow-left" })]), I("div", Ao, [
				n[6] ||= I("p", { class: "player__eyebrow" }, "Now playing", -1),
				I("h2", jo, Y(e.media.name), 1),
				I("div", Mo, [(G(!0), F(j, null, q(ge.value, (e, t) => (G(), F(j, { key: t }, [t > 0 && !e.cert ? (G(), F("span", No, "·")) : P("", !0), I("span", { class: V({ player__cert: e.cert }) }, Y(e.text), 3)], 64))), 128))])
			])]),
			v.value ? P("", !0) : (G(), F("div", Po, [I("button", {
				type: "button",
				class: V(["player__bigplay", { "is-playing": X(i).playing }]),
				"aria-label": X(i).playing ? "Pause" : "Play",
				onClick: Pe(_e, ["stop"])
			}, [R(l, { name: X(i).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Fo)])),
			R(Ca, {
				video: s.value,
				language: X(i).subtitleLang,
				"style-config": X(a).captionStyle,
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
				onClick: n[3] ||= Pe(() => {}, ["stop"])
			}, [R(Pi, {
				position: X(i).position,
				duration: X(i).duration,
				buffered: X(i).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: Ce,
				onScrubStart: we,
				onScrubEnd: J
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), I("div", Io, [
				I("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": X(i).playing ? "Pause" : "Play",
					onClick: _e
				}, [R(l, { name: X(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Lo),
				I("span", Ro, [
					L(Y(X(ki)(X(i).position)), 1),
					n[7] ||= I("span", { class: "player__sep" }, " / ", -1),
					L(Y(X(ki)(X(i).duration)), 1)
				]),
				n[8] ||= I("span", { class: "player__grow" }, null, -1),
				R(Xi),
				R(Zi),
				R(Qi, { qualities: e.qualities }, null, 8, ["qualities"]),
				R(za, {
					open: A.value,
					"onUpdate:open": n[1] ||= (e) => A.value = e,
					tracks: oe.value,
					"audio-tracks": se.value,
					"active-audio": ce.value,
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
				}, [R(l, { name: "info" })]),
				g.value ? (G(), F("button", {
					key: 0,
					type: "button",
					class: V(["player__iconbtn", { "is-on": h.value }]),
					"aria-label": h.value ? "Exit picture-in-picture" : "Picture-in-picture",
					"aria-pressed": h.value,
					onClick: Ae
				}, [R(l, { name: "pip" })], 10, zo)) : P("", !0),
				I("button", {
					type: "button",
					class: V(["player__iconbtn", { "is-on": m.value }]),
					"aria-label": m.value ? "Exit theater mode" : "Theater mode",
					"aria-pressed": m.value,
					onClick: De
				}, [R(l, { name: "theater" })], 10, Bo),
				I("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": d.value ? "Exit fullscreen" : "Fullscreen",
					onClick: Oe
				}, [R(l, { name: d.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Vo)
			])])),
			b.value && !v.value ? (G(), N(to, {
				key: 2,
				seconds: y.value,
				onResume: O,
				onRestart: ee
			}, null, 8, ["seconds"])) : P("", !0),
			S.value && T.value && !v.value ? (G(), N(So, {
				key: 3,
				media: T.value,
				remaining: C.value,
				total: X(8),
				counting: X(a).autoplay,
				onPlayNow: re,
				onCancel: ie
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : P("", !0),
			v.value ? (G(), N(Eo, {
				key: 4,
				title: e.media.name,
				onBack: n[4] ||= (e) => r("back")
			}, null, 8, ["title"])) : P("", !0),
			R(Ji, {
				open: p.value,
				onClose: n[5] ||= (e) => p.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-853f8f80"]]), Uo = { class: "player-page__stage" }, Wo = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Go = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "PlayerPage",
	setup(t) {
		let n = B("apiBase", ""), r = M(() => typeof n == "string" ? n : n?.value ?? ""), i = He(), a = Ue(), o = Kt(), c = K(null), l = K(""), u = K(!0), d = K(null), p = K(!1), m = M(() => String(i.params.id ?? "")), h = M(() => {
			let e = c.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), g = null, v = !1;
		function y(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function b(e) {
			return `${r.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		async function x(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				o.setQueue([]);
				return;
			}
			let i = g, a = () => v || i !== g;
			try {
				let s = hr(r.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), c = await e.get(s, void 0, i?.signal);
				if (a()) return;
				o.setQueue((c.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (a() || y(e)) return;
				o.setQueue([]);
			}
		}
		async function S() {
			let t = m.value;
			if (g?.abort(), g = typeof AbortController < "u" ? new AbortController() : null, u.value = !0, d.value = null, o.hideMiniPlayer(), !t) {
				d.value = "No media id provided", u.value = !1;
				return;
			}
			try {
				let n = new e({ baseUrl: r.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, g?.signal);
				if (v) return;
				c.value = i;
				let a = await n.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, g?.signal).catch(() => null);
				if (v) return;
				l.value = a?.url || b(i), u.value = !1, x(n, i);
			} catch (e) {
				if (v || y(e)) return;
				d.value = e instanceof Error ? e.message : "Failed to load media", u.value = !1;
			}
		}
		W(S), Z(m, S), Ve(() => {
			o.current && o.streamUrl && o.showMiniPlayer();
		}), U(() => {
			v = !0, g?.abort(), g = null;
		});
		function C() {
			a?.back();
		}
		function w(e) {
			a?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function T(e) {
			p.value = e;
		}
		return (e, t) => (G(), F("div", { class: V(["player-page", { "is-theater": p.value }]) }, [h.value && !u.value && !d.value ? (G(), F("div", {
			key: 0,
			class: "player-page__ambient",
			style: H(h.value),
			"aria-hidden": "true"
		}, null, 4)) : P("", !0), I("div", Uo, [u.value ? (G(), F("div", Wo, [R(s, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : d.value ? (G(), N(_, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: d.value
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				onClick: S
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			}), R(f, {
				variant: "ghost",
				onClick: C
			}, {
				default: Q(() => [...t[1] ||= [L("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : c.value ? (G(), N(Ho, {
			key: 2,
			media: c.value,
			"stream-url": l.value,
			"stream-url-for": b,
			onBack: C,
			onPlayNext: w,
			onTheater: T
		}, null, 8, ["media", "stream-url"])) : P("", !0)])], 2));
	}
}), [["__scopeId", "data-v-1b6296b1"]]), Ko = { class: "authcard" }, qo = { class: "authcard__body" }, Jo = { class: "authcard__head" }, Yo = {
	key: 0,
	class: "authcard__eyebrow"
}, Xo = { class: "authcard__brand" }, Zo = ["src", "alt"], Qo = { class: "authcard__wordmark" }, $o = { class: "authcard__title" }, es = {
	key: 1,
	class: "authcard__sub"
}, ts = {
	key: 0,
	class: "authcard__foot"
}, ns = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "AuthCard",
	props: {
		eyebrow: {},
		title: {},
		subtitle: {}
	},
	setup(e) {
		let t = B("phlixConfig", null), n = M(() => t?.branding ?? {}), r = M(() => n.value.wordmark ?? "Phlix");
		return (t, i) => (G(), F("section", Ko, [I("div", qo, [
			I("header", Jo, [
				e.eyebrow ? (G(), F("p", Yo, Y(e.eyebrow), 1)) : P("", !0),
				I("div", Xo, [n.value.logoSrc ? (G(), F("img", {
					key: 0,
					src: n.value.logoSrc,
					alt: n.value.logoAlt ?? r.value,
					class: "authcard__logo"
				}, null, 8, Zo)) : P("", !0), I("span", Qo, [L(Y(r.value), 1), i[0] ||= I("span", { class: "authcard__dot" }, ".", -1)])]),
				I("h1", $o, Y(e.title), 1),
				e.subtitle ? (G(), F("p", es, Y(e.subtitle), 1)) : P("", !0)
			]),
			J(t.$slots, "default", {}, void 0, !0),
			t.$slots.footer ? (G(), F("div", ts, [J(t.$slots, "footer", {}, void 0, !0)])) : P("", !0)
		])]));
	}
}), [["__scopeId", "data-v-5ddd2bae"]]), rs = ["for"], is = { class: "authfield__wrap" }, as = [
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
], os = [
	"aria-label",
	"aria-pressed",
	"disabled"
], ss = ["id"], cs = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let n = e, r = t, i = Oe(), a = M(() => n.id ?? `authfield-${i}`), o = M(() => `${a.value}-msg`), s = K(!1), c = M(() => n.type === "password"), u = M(() => c.value ? s.value ? "text" : "password" : n.type);
		function d(e) {
			r("update:modelValue", e.target.value);
		}
		function f() {
			s.value = !s.value;
		}
		return (t, n) => (G(), F("div", { class: V(["authfield", {
			"is-invalid": !!e.error,
			"has-toggle": c.value
		}]) }, [
			I("label", {
				class: "authfield__label",
				for: a.value
			}, Y(e.label), 9, rs),
			I("div", is, [I("input", {
				id: a.value,
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
				"aria-describedby": e.error ? o.value : void 0,
				onInput: d
			}, null, 40, as), c.value ? (G(), F("button", {
				key: 0,
				type: "button",
				class: "authfield__toggle",
				"aria-label": s.value ? "Hide password" : "Show password",
				"aria-pressed": s.value,
				disabled: e.disabled,
				onClick: f
			}, [R(l, { name: s.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, os)) : P("", !0)]),
			I("p", {
				id: o.value,
				class: "authfield__msg",
				"aria-live": "polite"
			}, Y(e.error || ""), 9, ss)
		], 2));
	}
}), [["__scopeId", "data-v-6ca91c85"]]), ls = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, us = { class: "login__oauth" }, ds = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = ht(), i = u(), a = Ue(), o = B("phlixConfig", null), s = M(() => o?.routerBase ?? "/app"), c = M(() => `${s.value}/signup`), d = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, p = K(""), m = K(""), h = K(null), g = K(null);
		function _() {
			return h.value = p.value.trim() ? d.test(p.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", g.value = m.value ? null : "Enter your password.", !h.value && !g.value;
		}
		async function v() {
			_() && (await r.login(p.value.trim(), m.value) ? (n("success"), a.push(s.value)) : i.error(r.error ?? "Sign in failed."));
		}
		return (e, t) => {
			let n = Te("RouterLink");
			return G(), N(ns, {
				eyebrow: "Member access",
				title: "Welcome back",
				subtitle: "Sign in to continue to your cinema."
			}, {
				footer: Q(() => [t[4] ||= L(" New to Phlix? ", -1), R(n, {
					to: c.value,
					class: "login__link"
				}, {
					default: Q(() => [...t[3] ||= [L("Create an account", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: Q(() => [X(r).error ? (G(), F("p", ls, [R(l, {
					name: "alert",
					class: "login__banner-icon"
				}), I("span", null, Y(X(r).error), 1)])) : P("", !0), I("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: Pe(v, ["prevent"])
				}, [
					R(cs, {
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
					R(cs, {
						modelValue: m.value,
						"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
						label: "Password",
						type: "password",
						autocomplete: "current-password",
						placeholder: "Your password",
						error: g.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(f, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: X(r).loading
					}, {
						default: Q(() => [L(Y(X(r).loading ? "Signing in…" : "Sign in"), 1)]),
						_: 1
					}, 8, ["loading"]),
					e.$slots.oauth ? (G(), F(j, { key: 0 }, [t[2] ||= I("div", { class: "login__divider" }, "or continue with", -1), I("div", us, [J(e.$slots, "oauth", {}, void 0, !0)])], 64)) : P("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-b06a8c9c"]]), fs = { class: "auth-page" }, ps = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, ms = { class: "auth-page__center" }, hs = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "LoginPage",
	setup(e) {
		let t = $();
		return (e, n) => (G(), F("div", fs, [
			R(Ge, {
				enabled: X(t).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			X(t).atmosphere ? (G(), F("div", ps)) : P("", !0),
			I("div", ms, [R(ds, null, be({ _: 2 }, [e.$slots.oauth ? {
				name: "oauth",
				fn: Q(() => [J(e.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-bd363f07"]]), gs = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, _s = { class: "signup__oauth" }, vs = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = ht(), i = u(), a = Ue(), o = B("phlixConfig", null), s = M(() => o?.routerBase ?? "/app"), c = M(() => `${s.value}/login`), d = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, p = K(""), m = K(""), h = K(""), g = K(""), _ = K(null), v = K(null), y = K(null), b = K(null);
		function x() {
			return _.value = p.value.trim() ? d.test(p.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", v.value = m.value.trim() ? m.value.trim().length < 3 ? "Username must be at least 3 characters." : null : "Choose a username.", y.value = h.value ? h.value.length < 8 ? "Password must be at least 8 characters." : null : "Choose a password.", b.value = g.value === h.value ? null : "Passwords do not match.", !_.value && !v.value && !y.value && !b.value;
		}
		async function S() {
			x() && (await r.signup(p.value.trim(), m.value.trim(), h.value) ? (n("success"), a.push(s.value)) : i.error(r.error ?? "Registration failed."));
		}
		return (e, t) => {
			let n = Te("RouterLink");
			return G(), N(ns, {
				eyebrow: "Now showing",
				title: "Create your account",
				subtitle: "Your private cinema, anywhere."
			}, {
				footer: Q(() => [t[6] ||= L(" Already have an account? ", -1), R(n, {
					to: c.value,
					class: "signup__link"
				}, {
					default: Q(() => [...t[5] ||= [L("Sign in", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: Q(() => [X(r).error ? (G(), F("p", gs, [R(l, {
					name: "alert",
					class: "signup__banner-icon"
				}), I("span", null, Y(X(r).error), 1)])) : P("", !0), I("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: Pe(S, ["prevent"])
				}, [
					R(cs, {
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
					R(cs, {
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
					R(cs, {
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
					R(cs, {
						modelValue: g.value,
						"onUpdate:modelValue": t[3] ||= (e) => g.value = e,
						label: "Confirm password",
						type: "password",
						autocomplete: "new-password",
						placeholder: "Repeat your password",
						error: b.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					R(f, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: X(r).loading
					}, {
						default: Q(() => [L(Y(X(r).loading ? "Creating account…" : "Create account"), 1)]),
						_: 1
					}, 8, ["loading"]),
					e.$slots.oauth ? (G(), F(j, { key: 0 }, [t[4] ||= I("div", { class: "signup__divider" }, "or continue with", -1), I("div", _s, [J(e.$slots, "oauth", {}, void 0, !0)])], 64)) : P("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-21a11f2c"]]), ys = { class: "auth-page" }, bs = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, xs = { class: "auth-page__center" }, Ss = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "SignupPage",
	setup(e) {
		let t = $();
		return (e, n) => (G(), F("div", ys, [
			R(Ge, {
				enabled: X(t).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			X(t).atmosphere ? (G(), F("div", bs)) : P("", !0),
			I("div", xs, [R(vs, null, be({ _: 2 }, [e.$slots.oauth ? {
				name: "oauth",
				fn: Q(() => [J(e.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-b98af69c"]]), Cs = { class: "phlix-tabs" }, ws = ["aria-label"], Ts = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], Es = ["id", "aria-labelledby"], Ds = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Oe(), a = K(null), o = M(() => n.tabs.findIndex((e) => e.value === n.modelValue)), s = (e) => `${i}-tab-${e}`, c = (e) => `${i}-panel-${e}`, u = M(() => n.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function d(e) {
			let t = n.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== n.modelValue && r("update:modelValue", e);
		}
		function f(e) {
			a.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function p(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = b(u.value, o.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = b(u.value, o.value, -1);
					break;
				case "Home":
					t = b(u.value, -1, 1);
					break;
				case "End":
					t = b(u.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), d(n.tabs[t].value), f(t));
		}
		return (t, n) => (G(), F("div", Cs, [I("div", {
			ref_key: "listEl",
			ref: a,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: p
		}, [(G(!0), F(j, null, q(e.tabs, (t) => (G(), F("button", {
			id: s(t.value),
			key: t.value,
			type: "button",
			role: "tab",
			class: V(["phlix-tabs__tab", { "is-active": t.value === e.modelValue }]),
			"aria-selected": t.value === e.modelValue,
			"aria-controls": c(t.value),
			tabindex: t.value === e.modelValue ? 0 : -1,
			disabled: t.disabled,
			onClick: (e) => d(t.value)
		}, [t.icon ? (G(), N(l, {
			key: 0,
			name: t.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : P("", !0), L(" " + Y(t.label), 1)], 10, Ts))), 128))], 40, ws), e.modelValue ? (G(), F("div", {
			key: 0,
			id: c(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": s(e.modelValue),
			tabindex: "0"
		}, [J(t.$slots, e.modelValue, {}, () => [J(t.$slots, "default", {}, void 0, !0)], !0)], 8, Es)) : P("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), Os = {
	key: 0,
	class: "aps"
}, ks = { class: "aps__group" }, As = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], js = { class: "aps__theme-label" }, Ms = { class: "aps__group" }, Ns = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], Ps = { class: "aps__group" }, Fs = { class: "aps__row" }, Is = { class: "aps__row" }, Ls = { class: "aps__row" }, Rs = { class: "aps__label" }, zs = { class: "aps__value" }, Bs = { class: "aps__slider" }, Vs = { class: "aps__group" }, Hs = { class: "aps__row aps__row--switch" }, Us = { class: "aps__row" }, Ws = { class: "aps__foot" }, Gs = {
	key: 1,
	class: "aps"
}, Ks = { class: "aps__group" }, qs = { class: "aps__row aps__row--switch" }, Js = { class: "aps__row" }, Ys = { class: "aps__label" }, Xs = { class: "aps__value" }, Zs = { class: "aps__slider" }, Qs = { class: "aps__row" }, $s = { class: "aps__group" }, ec = { class: "aps__row" }, tc = { class: "aps__row" }, nc = { class: "aps__row" }, rc = { class: "aps__row" }, ic = { class: "aps__row" }, ac = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let t = $(), n = u(), r = [
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
		], i = [
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
		], a = [{
			value: "comfortable",
			label: "Comfortable"
		}, {
			value: "compact",
			label: "Compact"
		}], o = [
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
		], s = [
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
		], c = [
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
		], d = [
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
		let _ = M(() => Math.max(0, r.findIndex((e) => e.value === t.theme))), v = M(() => Math.max(0, i.findIndex((e) => e.value === t.accent)));
		function y(e, t, n) {
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
		function b(e) {
			let n = y(e, r.length, _.value);
			n !== null && (t.theme = r[n].value);
		}
		function S(e) {
			let n = y(e, i.length, v.value);
			n !== null && (t.accent = i[n].value);
		}
		let w = K(!1), E;
		function D() {
			if (!w.value) {
				w.value = !0, clearTimeout(E), E = setTimeout(() => w.value = !1, 3500);
				return;
			}
			clearTimeout(E), w.value = !1, t.reset(), n.info("Preferences reset to defaults.");
		}
		return U(() => clearTimeout(E)), (n, u) => e.panel === "appearance" ? (G(), F("div", Os, [
			I("section", ks, [u[13] ||= I("h3", { class: "aps__title" }, "Theme", -1), I("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": "Theme",
				onKeydown: b
			}, [(G(), F(j, null, q(r, (e, n) => I("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: V(["aps__theme", { "is-active": X(t).theme === e.value }]),
				"aria-checked": X(t).theme === e.value,
				tabindex: _.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (n) => X(t).theme = e.value
			}, [u[12] ||= I("span", { class: "aps__preview" }, [I("span", { class: "aps__preview-bar" }), I("span", { class: "aps__preview-card" })], -1), I("span", js, [L(Y(e.label) + " ", 1), X(t).theme === e.value ? (G(), N(l, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : P("", !0)])], 10, As)), 64))], 32)]),
			I("section", Ms, [u[14] ||= I("h3", { class: "aps__title" }, "Accent", -1), I("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": "Accent color",
				onKeydown: S
			}, [(G(), F(j, null, q(i, (e, n) => I("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: V(["aps__accent", { "is-active": X(t).accent === e.value }]),
				"aria-checked": X(t).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: v.value === n ? 0 : -1,
				onClick: (n) => X(t).accent = e.value
			}, [I("span", {
				class: "aps__accent-dot",
				style: H({ background: e.swatch })
			}, [X(t).accent === e.value ? (G(), N(l, {
				key: 0,
				name: "check"
			})) : P("", !0)], 4)], 10, Ns)), 64))], 32)]),
			I("section", Ps, [
				u[18] ||= I("h3", { class: "aps__title" }, "Display", -1),
				I("div", Fs, [u[15] ||= I("span", {
					class: "aps__label",
					id: "aps-density"
				}, "Density", -1), R(x, {
					"model-value": X(t).density,
					options: a,
					label: "Density",
					"onUpdate:modelValue": u[0] ||= (e) => X(t).density = e
				}, null, 8, ["model-value"])]),
				I("div", Is, [u[16] ||= I("span", { class: "aps__label" }, "Grid density", -1), R(x, {
					"model-value": X(t).gridDensity,
					options: o,
					label: "Grid density",
					"onUpdate:modelValue": u[1] ||= (e) => X(t).gridDensity = e
				}, null, 8, ["model-value"])]),
				I("div", Ls, [I("span", Rs, [u[17] ||= L("Card size ", -1), I("span", zs, Y(m(X(t).cardSize)), 1)]), I("div", Bs, [R(C, {
					"model-value": X(t).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: "Card size",
					"format-value": m,
					"onUpdate:modelValue": u[2] ||= (e) => X(t).cardSize = e
				}, null, 8, ["model-value"])])])
			]),
			I("section", Vs, [
				u[20] ||= I("h3", { class: "aps__title" }, "Atmosphere", -1),
				I("div", Hs, [R(T, {
					"model-value": X(t).atmosphere,
					label: "Film-grain + ambient glow",
					"onUpdate:modelValue": u[3] ||= (e) => X(t).atmosphere = e
				}, null, 8, ["model-value"])]),
				I("div", Us, [u[19] ||= I("span", { class: "aps__label" }, "Motion", -1), R(x, {
					"model-value": X(t).reducedMotion,
					options: s,
					label: "Motion",
					"onUpdate:modelValue": u[4] ||= (e) => X(t).reducedMotion = e
				}, null, 8, ["model-value"])])
			]),
			I("div", Ws, [R(f, {
				variant: "ghost",
				"left-icon": w.value ? "alert" : "rewind",
				onClick: D
			}, {
				default: Q(() => [L(Y(w.value ? "Click again to confirm reset" : "Reset all preferences"), 1)]),
				_: 1
			}, 8, ["left-icon"])])
		])) : (G(), F("div", Gs, [I("section", Ks, [
			u[23] ||= I("h3", { class: "aps__title" }, "Playback", -1),
			I("div", qs, [R(T, {
				"model-value": X(t).autoplay,
				label: "Autoplay next episode",
				"onUpdate:modelValue": u[5] ||= (e) => X(t).autoplay = e
			}, null, 8, ["model-value"])]),
			I("div", Js, [I("span", Ys, [u[21] ||= L("Default volume ", -1), I("span", Xs, Y(p(X(t).defaultVolume)), 1)]), I("div", Zs, [R(C, {
				"model-value": X(t).defaultVolume,
				min: 0,
				max: 1,
				step: .05,
				label: "Default volume",
				"format-value": p,
				"onUpdate:modelValue": u[6] ||= (e) => X(t).defaultVolume = e
			}, null, 8, ["model-value"])])]),
			I("div", Qs, [u[22] ||= I("span", { class: "aps__label" }, "Default quality", -1), R(x, {
				"model-value": X(t).defaultQuality,
				options: c,
				label: "Default quality",
				"onUpdate:modelValue": u[7] ||= (e) => X(t).defaultQuality = String(e)
			}, null, 8, ["model-value"])])
		]), I("section", $s, [
			u[29] ||= I("h3", { class: "aps__title" }, "Subtitles", -1),
			I("div", ec, [u[24] ||= I("span", { class: "aps__label" }, "Default language", -1), R(x, {
				"model-value": X(t).defaultSubtitleLang ?? "",
				options: d,
				label: "Default subtitle language",
				"onUpdate:modelValue": h
			}, null, 8, ["model-value"])]),
			I("div", tc, [u[25] ||= I("span", { class: "aps__label" }, "Caption size", -1), R(x, {
				"model-value": X(t).captionStyle.size,
				options: X(ga),
				label: "Caption size",
				"onUpdate:modelValue": u[8] ||= (e) => g("size", e)
			}, null, 8, ["model-value", "options"])]),
			I("div", nc, [u[26] ||= I("span", { class: "aps__label" }, "Caption color", -1), R(x, {
				"model-value": X(t).captionStyle.textColor,
				options: X(_a),
				label: "Caption color",
				"onUpdate:modelValue": u[9] ||= (e) => g("textColor", String(e))
			}, null, 8, ["model-value", "options"])]),
			I("div", rc, [u[27] ||= I("span", { class: "aps__label" }, "Caption background", -1), R(x, {
				"model-value": X(t).captionStyle.background,
				options: X(va),
				label: "Caption background",
				"onUpdate:modelValue": u[10] ||= (e) => g("background", e)
			}, null, 8, ["model-value", "options"])]),
			I("div", ic, [u[28] ||= I("span", { class: "aps__label" }, "Caption edge", -1), R(x, {
				"model-value": X(t).captionStyle.edge,
				options: X(ya),
				label: "Caption edge",
				"onUpdate:modelValue": u[11] ||= (e) => g("edge", e)
			}, null, 8, ["model-value", "options"])])
		])]));
	}
}), [["__scopeId", "data-v-2a591f61"]]), oc = { class: "setform" }, sc = {
	key: 0,
	class: "setform__loading"
}, cc = { class: "setform__head" }, lc = { class: "setform__title" }, uc = {
	key: 0,
	class: "setform__dirty"
}, dc = ["for"], fc = [
	"id",
	"type",
	"value",
	"onInput"
], pc = { class: "setform__actions" }, mc = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = ht(), a = u(), o = K({}), c = K({}), l = K(!0), p = K(null), m = K(null), h = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], g = M(() => n.groups ? h.filter((e) => n.groups.includes(e)) : h), v = {
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
		function x(e, t) {
			let n = t.target.value;
			if (n === "") return D(e, 0);
			let r = Number(n);
			Number.isFinite(r) && D(e, r);
		}
		function S(e, t) {
			return t === "bool" ? d(e) : t === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function C() {
			l.value = !0, p.value = null;
			try {
				let e = await i.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(y)) t[n] = S(e[n], r.type);
				o.value = t, c.value = structuredClone(t);
			} catch (e) {
				p.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				l.value = !1;
			}
		}
		function w(e) {
			return b(e).some((e) => o.value[e] !== c.value[e]);
		}
		async function E(e) {
			m.value = e;
			try {
				let t = {};
				for (let n of b(e)) t[n] = o.value[n];
				await i.client.put("/api/v1/users/me/settings", t);
				for (let t of b(e)) c.value[t] = o.value[t];
				a.success(`${v[e]} settings saved.`), r("saved", o.value);
			} catch (t) {
				a.error(t instanceof Error ? t.message : `Failed to save ${v[e]} settings`);
			} finally {
				m.value = null;
			}
		}
		function D(e, t) {
			o.value[e] = t;
		}
		return W(C), (e, t) => (G(), F("div", oc, [l.value ? (G(), F("div", sc, [(G(), F(j, null, q(3, (e) => R(s, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : p.value ? (G(), N(_, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: p.value
		}, {
			actions: Q(() => [R(f, {
				"left-icon": "rewind",
				onClick: C
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (G(!0), F(j, { key: 2 }, q(g.value, (e) => (G(), F("section", {
			key: e,
			class: "setform__group"
		}, [
			I("header", cc, [I("h3", lc, Y(v[e]), 1), w(e) ? (G(), F("span", uc, "Unsaved")) : P("", !0)]),
			(G(!0), F(j, null, q(b(e), (e) => (G(), F("div", {
				key: e,
				class: V(["setform__row", { "setform__row--switch": y[e].type === "bool" }])
			}, [y[e].type === "bool" ? (G(), N(T, {
				key: 0,
				"model-value": !!o.value[e],
				label: y[e].label,
				"onUpdate:modelValue": (t) => D(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (G(), F(j, { key: 1 }, [I("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, Y(y[e].label), 9, dc), I("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: y[e].type === "number" ? "number" : "text",
				value: o.value[e] ?? "",
				onInput: (t) => y[e].type === "number" ? x(e, t) : D(e, t.target.value)
			}, null, 40, fc)], 64))], 2))), 128)),
			I("div", pc, [R(f, {
				variant: "solid",
				size: "sm",
				disabled: !w(e),
				loading: m.value === e,
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
}), [["__scopeId", "data-v-eea8b5b5"]]), hc = { class: "settings-page" }, gc = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		return (e, r) => (G(), F("div", hc, [r[1] ||= I("header", { class: "settings-page__head" }, [I("p", { class: "settings-page__eyebrow" }, "Preferences"), I("h1", { class: "settings-page__title" }, "Settings")], -1), R(Ds, {
			modelValue: n.value,
			"onUpdate:modelValue": r[0] ||= (e) => n.value = e,
			tabs: t,
			label: "Settings sections"
		}, {
			appearance: Q(() => [R(ac, { panel: "appearance" })]),
			playback: Q(() => [R(ac, { panel: "playback" })]),
			server: Q(() => [R(mc)]),
			_: 1
		}, 8, ["modelValue"])]));
	}
}), [["__scopeId", "data-v-1dba1556"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function _c() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function vc(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: ti
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: Oi
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: Go
		},
		{
			path: `${t}/login`,
			name: "login",
			component: hs
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: Ss
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: gc
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: bn,
		props: { appName: e.app }
	}), n;
}
function yc(e) {
	let t = {
		..._c(),
		...e
	};
	fn(t.defaultTheme);
	let n = Fe();
	t.defaultTheme && !rt() && ($(n).theme = t.defaultTheme);
	let r = ze({
		history: Be(t.routerBase || "/app"),
		routes: vc(t)
	}), i = ye(_n);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var bc = ["id"], xc = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		let t = e, n = Oe(), r = K(!1), i = K(null), a;
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
			onKeydown: Ne(c, ["esc"])
		}, [J(t.$slots, "default", {}, void 0, !0), R(_e, { name: "phlix-tooltip" }, {
			default: Q(() => [r.value && (e.text || t.$slots.content) ? (G(), F("span", {
				key: 0,
				id: X(n),
				role: "tooltip",
				class: V(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [J(t.$slots, "content", {}, () => [L(Y(e.text), 1)], !0)], 10, bc)) : P("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Sc = ["role"], Cc = { class: "phlix-toast__content" }, wc = {
	key: 0,
	class: "phlix-toast__title"
}, Tc = { class: "phlix-toast__message" }, Ec = ["onClick"], Dc = 0, Oc = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let t = u(), n = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, r = (e) => e.icon ?? n[e.tone];
		return W(() => {
			Dc++;
		}), U(() => {
			Dc--;
		}), (n, i) => (G(), N(ge, { to: "body" }, [I("div", {
			class: V(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [R(ve, { name: "phlix-toast" }, {
			default: Q(() => [(G(!0), F(j, null, q(X(t).toasts, (e) => (G(), F("div", {
				key: e.id,
				class: V(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				R(l, {
					name: r(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				I("div", Cc, [e.title ? (G(), F("p", wc, Y(e.title), 1)) : P("", !0), I("p", Tc, Y(e.message), 1)]),
				e.action ? (G(), F("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (n) => {
						e.action.onClick(), X(t).dismiss(e.id);
					}
				}, Y(e.action.label), 9, Ec)) : P("", !0),
				R(h, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (n) => X(t).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, Sc))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), kc = ["aria-label"], Ac = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = M(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (G(), F("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: H(n.value ? { fontSize: n.value } : void 0)
		}, [R(l, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, kc));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), jc = /*#__PURE__*/ o(/* @__PURE__ */ z({
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
		}), (t, a) => (G(), N(Ee(e.tag), {
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
}), [["__scopeId", "data-v-162397f9"]]), Mc = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (G(), N(_e, {
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
function Nc(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => import("./DashboardPage-DF2xGBse.js")
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => import("./UsersPage-CWCqgIBR.js")
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => import("./LogsPage-DITnowZ0.js")
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => import("./WebhooksPage-BQ88jUQh.js")
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => import("./ServicesPage-S46ctPv4.js")
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => import("./IntegrationsPage-CCraLP7x.js")
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => import("./BackupPage-ChmpttUl.js")
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => import("./CastDevicesPage-C0GgKdb1.js")
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => import("./DlnaServerPage-FJDkrXGm.js")
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => import("./RemoteAccessPage-CoxdkkGz.js")
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => import("./LiveTvPage-C1vbC66H.js")
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => import("./CollectionsPage-CyBSwcyA.js")
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => import("./HistoryPage-NAm_xr4k.js")
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => import("./SyncPlayPage-DEArYgro.js")
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => import("./LibrariesPage-4OAk0VGG.js")
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => import("./SettingsPage-QrUhl8hd.js")
		}
	];
}
function Pc(e = "/app") {
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
var Fc = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Ic = {
	key: 0,
	class: "library-scan__skel"
}, Lc = {
	key: 3,
	class: "library-scan__table-wrap"
}, Rc = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, zc = { class: "library-scan__name" }, Bc = {
	key: 0,
	class: "library-scan__paths"
}, Vc = { class: "library-scan__num" }, Hc = { class: "library-scan__date" }, Uc = ["data-testid"], Wc = {
	key: 0,
	class: "library-scan__error"
}, Gc = { class: "library-scan__actions" }, Kc = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? c, r = u(), i = K([]), a = K({}), o = K(!0), l = K(null);
		async function d() {
			o.value = !0, l.value = null;
			try {
				i.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of i.value) p(e.id);
			} catch (e) {
				l.value = n(e, "Failed to load libraries."), r.error(l.value);
			} finally {
				o.value = !1;
			}
		}
		async function p(e) {
			try {
				let n = await t.get(`/api/v1/libraries/${e}/scan-status`), r = n.scan_status ?? n.job ?? null;
				r && (a.value = {
					...a.value,
					[e]: r
				});
			} catch {}
		}
		async function m(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/scan`), r.success("Scan queued."), await p(e);
			} catch (e) {
				r.error(n(e, "Failed to trigger scan."));
			}
		}
		async function h(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), r.success("Rescan queued."), await p(e);
			} catch (e) {
				r.error(n(e, "Failed to trigger rescan."));
			}
		}
		function g(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function v(e) {
			return e?.status === "running" || e?.status === "queued";
		}
		function y(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function b(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		return W(d), (e, t) => (G(), F("section", Fc, [t[4] ||= I("header", { class: "library-scan__head" }, [I("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), I("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), o.value ? (G(), F("div", Ic, [R(s, {
			variant: "text",
			lines: 6
		})])) : l.value ? (G(), N(_, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: l.value
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: d
			}, {
				default: Q(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (G(), N(_, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (G(), F("div", Lc, [I("table", Rc, [t[3] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Library"),
			I("th", { scope: "col" }, "Type"),
			I("th", { scope: "col" }, "Items"),
			I("th", { scope: "col" }, "Last scan"),
			I("th", { scope: "col" }, "Status"),
			I("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(G(!0), F(j, null, q(i.value, (e) => (G(), F("tr", { key: e.id }, [
			I("td", null, [I("div", zc, Y(e.name), 1), e.paths.length ? (G(), F("div", Bc, Y(e.paths.join(", ")), 1)) : P("", !0)]),
			I("td", null, Y(e.type), 1),
			I("td", Vc, Y(e.item_count === void 0 ? "—" : e.item_count), 1),
			I("td", Hc, Y(g(e.last_scan_at)), 1),
			I("td", null, [I("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [R(S, { tone: b(a.value[e.id]) }, {
				default: Q(() => [L(Y(y(a.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), a.value[e.id]?.status === "failed" && a.value[e.id]?.error ? (G(), F("span", Wc, Y(a.value[e.id]?.error), 1)) : P("", !0)], 8, Uc)]),
			I("td", null, [I("div", Gc, [R(f, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: v(a.value[e.id]),
				onClick: (t) => m(e.id)
			}, {
				default: Q(() => [...t[1] ||= [L(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), R(f, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: v(a.value[e.id]),
				onClick: (t) => h(e.id)
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
}), [["__scopeId", "data-v-3235ff5e"]]), qc = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Jc = { class: "my-servers__head" }, Yc = {
	key: 0,
	class: "my-servers__skel"
}, Xc = {
	key: 3,
	class: "my-servers__table-wrap"
}, Zc = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Qc = { class: "my-servers__name" }, $c = { class: "my-servers__url" }, el = { class: "my-servers__num" }, tl = { class: "my-servers__date" }, nl = ["data-testid"], rl = { class: "my-servers__actions" }, il = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? c, r = u(), i = K([]), a = K(!0), o = K(null);
		async function l() {
			a.value = !0, o.value = null;
			try {
				i.value = (await t.get("/api/v1/servers")).servers || [];
			} catch (e) {
				o.value = n(e, "Failed to load servers."), r.error(o.value);
			} finally {
				a.value = !1;
			}
		}
		function d(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function p(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function m(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		return W(l), (e, t) => (G(), F("section", qc, [I("header", Jc, [t[1] ||= I("div", null, [I("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), I("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), R(f, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: Q(() => [...t[0] ||= [L("Add server", -1)]]),
			_: 1
		})]), a.value ? (G(), F("div", Yc, [R(s, {
			variant: "text",
			lines: 6
		})])) : o.value ? (G(), N(_, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: l
			}, {
				default: Q(() => [...t[2] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (G(), N(_, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: Q(() => [...t[3] ||= [L("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (G(), F("div", Xc, [I("table", Zc, [t[5] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Server"),
			I("th", { scope: "col" }, "Owner"),
			I("th", { scope: "col" }, "Libraries"),
			I("th", { scope: "col" }, "Last seen"),
			I("th", { scope: "col" }, "Status"),
			I("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(G(!0), F(j, null, q(i.value, (e) => (G(), F("tr", { key: e.id }, [
			I("td", null, [I("div", Qc, Y(e.name), 1), I("div", $c, Y(e.url), 1)]),
			I("td", null, Y(e.owner), 1),
			I("td", el, Y(e.library_count === void 0 ? "—" : e.library_count), 1),
			I("td", tl, Y(d(e.last_seen)), 1),
			I("td", null, [I("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [R(S, { tone: m(e.status) }, {
				default: Q(() => [L(Y(p(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, nl)]),
			I("td", null, [I("div", rl, [R(f, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: Q(() => [...t[4] ||= [L("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8bce09a9"]]), al = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, ol = {
	key: 0,
	class: "federation__skel"
}, sl = {
	key: 2,
	class: "federation__content"
}, cl = {
	key: 1,
	class: "federation__table-wrap"
}, ll = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, ul = { class: "federation__name" }, dl = { class: "federation__url" }, fl = { class: "federation__num" }, pl = { class: "federation__date" }, ml = ["data-testid"], hl = { class: "federation__actions" }, gl = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, _l = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? c, r = u(), i = K([]), a = K(!0), o = K(null), l = K(""), d = K(!1);
		async function p(e = !1) {
			e && (a.value = !0), o.value = null;
			try {
				i.value = (await t.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				o.value = n(e, "Failed to load federation peers."), r.error(o.value);
			} finally {
				e && (a.value = !1);
			}
		}
		async function m() {
			let e = l.value.trim();
			if (e) {
				d.value = !0;
				try {
					await t.post("/api/v1/federation/connect", { url: e }), r.success("Peer connection requested."), l.value = "", await p();
				} catch (e) {
					r.error(n(e, "Failed to connect to peer."));
				} finally {
					d.value = !1;
				}
			}
		}
		async function h(e) {
			try {
				await t.post(`/api/v1/federation/peers/${e}/disconnect`), r.success("Peer disconnected."), await p();
			} catch (e) {
				r.error(n(e, "Failed to disconnect peer."));
			}
		}
		function g(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function v(e) {
			switch (e) {
				case "connected": return "Connected";
				case "disconnected": return "Disconnected";
				case "pending": return "Pending";
				default: return e;
			}
		}
		function y(e) {
			switch (e) {
				case "connected": return "success";
				case "disconnected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		return W(() => p(!0)), (e, t) => (G(), F("section", al, [t[8] ||= I("header", { class: "federation__head" }, [I("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), I("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), a.value ? (G(), F("div", ol, [R(s, {
			variant: "text",
			lines: 6
		})])) : o.value ? (G(), N(_, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: o.value
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => p(!0)
			}, {
				default: Q(() => [...t[2] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (G(), F("div", sl, [
			t[7] ||= I("h2", { class: "federation__section-title" }, "Connected peers", -1),
			i.value.length === 0 ? (G(), N(_, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (G(), F("div", cl, [I("table", ll, [t[4] ||= I("thead", null, [I("tr", null, [
				I("th", { scope: "col" }, "Peer"),
				I("th", { scope: "col" }, "Shared libraries"),
				I("th", { scope: "col" }, "Last sync"),
				I("th", { scope: "col" }, "Status"),
				I("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), I("tbody", null, [(G(!0), F(j, null, q(i.value, (e) => (G(), F("tr", { key: e.id }, [
				I("td", null, [I("div", ul, Y(e.name), 1), I("div", dl, Y(e.url), 1)]),
				I("td", fl, Y(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				I("td", pl, Y(g(e.last_sync)), 1),
				I("td", null, [I("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [R(S, { tone: y(e.status) }, {
					default: Q(() => [L(Y(v(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ml)]),
				I("td", null, [I("div", hl, [e.status === "connected" ? (G(), N(f, {
					key: 0,
					variant: "ghost",
					size: "sm",
					"aria-label": `Disconnect ${e.name}`,
					onClick: (t) => h(e.id)
				}, {
					default: Q(() => [...t[3] ||= [L(" Disconnect ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : P("", !0)])])
			]))), 128))])])])),
			I("section", gl, [t[6] ||= I("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), I("form", {
				class: "federation__form",
				onSubmit: Pe(m, ["prevent"])
			}, [Me(I("input", {
				"onUpdate:modelValue": t[1] ||= (e) => l.value = e,
				type: "url",
				class: "federation__input",
				placeholder: "https://other-server.example.com",
				"aria-label": "Peer server URL",
				autocomplete: "off"
			}, null, 512), [[ke, l.value]]), R(f, {
				type: "submit",
				variant: "solid",
				"left-icon": "plus",
				loading: d.value,
				disabled: !l.value.trim()
			}, {
				default: Q(() => [...t[5] ||= [L(" Connect ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-0640a657"]]), vl = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, yl = {
	key: 0,
	class: "shares__skel"
}, bl = {
	key: 3,
	class: "shares__table-wrap"
}, xl = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Sl = { class: "shares__library" }, Cl = { class: "shares__date" }, wl = { class: "shares__date" }, Tl = ["data-testid"], El = { class: "shares__actions" }, Dl = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? c, r = u(), i = K([]), a = K(!0), o = K(null);
		async function l(e = !1) {
			e && (a.value = !0), o.value = null;
			try {
				i.value = (await t.get("/api/v1/shares")).shares || [];
			} catch (e) {
				o.value = n(e, "Failed to load shares."), r.error(o.value);
			} finally {
				e && (a.value = !1);
			}
		}
		async function d(e) {
			try {
				await t.delete(`/api/v1/shares/${e}`), r.success("Share revoked."), await l();
			} catch (e) {
				r.error(n(e, "Failed to revoke share."));
			}
		}
		function p(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function m(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		function h(e) {
			switch (e) {
				case "read": return "info";
				case "write": return "success";
				default: return "neutral";
			}
		}
		return W(() => l(!0)), (e, t) => (G(), F("section", vl, [t[5] ||= I("header", { class: "shares__head" }, [I("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), I("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), a.value ? (G(), F("div", yl, [R(s, {
			variant: "text",
			lines: 6
		})])) : o.value ? (G(), N(_, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: o.value
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => l(!0)
			}, {
				default: Q(() => [...t[1] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (G(), N(_, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (G(), F("div", bl, [I("table", xl, [t[4] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Library"),
			I("th", { scope: "col" }, "Shared with"),
			I("th", { scope: "col" }, "Permissions"),
			I("th", { scope: "col" }, "Created"),
			I("th", { scope: "col" }, "Expires"),
			I("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(G(!0), F(j, null, q(i.value, (e) => (G(), F("tr", { key: e.id }, [
			I("td", null, [I("span", Sl, Y(e.library_name), 1)]),
			I("td", null, Y(e.shared_with), 1),
			I("td", null, [R(S, { tone: h(e.permissions) }, {
				default: Q(() => [L(Y(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			I("td", Cl, Y(p(e.created_at)), 1),
			I("td", wl, [I("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [L(Y(p(e.expires_at)) + " ", 1), m(e.expires_at) ? (G(), N(S, {
				key: 0,
				tone: "error"
			}, {
				default: Q(() => [...t[2] ||= [L("Expired", -1)]]),
				_: 1
			})) : P("", !0)], 8, Tl)]),
			I("td", null, [I("div", El, [R(f, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => d(e.id)
			}, {
				default: Q(() => [...t[3] ||= [L(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8731f31d"]]), Ol = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, kl = {
	key: 0,
	class: "audit__skel"
}, Al = {
	key: 3,
	class: "audit__content"
}, jl = { class: "audit__table-wrap" }, Ml = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, Nl = ["data-testid"], Pl = { class: "audit__details" }, Fl = { class: "audit__ip" }, Il = { class: "audit__date" }, Ll = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, Rl = {
	class: "audit__page-info",
	"aria-live": "polite"
}, zl = /*#__PURE__*/ o(/* @__PURE__ */ z({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? c, r = u(), i = K([]), a = K(!0), o = K(null), l = K(1), d = K(1);
		async function p(e = 1) {
			a.value = !0, o.value = null;
			try {
				let n = await t.get("/api/v1/audit-logs", { page: String(e) });
				i.value = n.logs || [], l.value = n.page || 1, d.value = n.total_pages || 1;
			} catch (e) {
				o.value = n(e, "Failed to load audit logs."), r.error(o.value);
			} finally {
				a.value = !1;
			}
		}
		function m(e) {
			return new Date(e).toLocaleString();
		}
		function h(e) {
			return e.includes("create") || e.includes("add") ? "success" : e.includes("delete") || e.includes("remove") ? "error" : e.includes("update") || e.includes("edit") ? "info" : e.includes("login") || e.includes("auth") ? "accent" : "neutral";
		}
		return W(() => p()), (e, t) => (G(), F("section", Ol, [t[7] ||= I("header", { class: "audit__head" }, [I("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), I("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), a.value ? (G(), F("div", kl, [R(s, {
			variant: "text",
			lines: 8
		})])) : o.value ? (G(), N(_, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: o.value
		}, {
			actions: Q(() => [R(f, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => p(l.value)
			}, {
				default: Q(() => [...t[3] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (G(), N(_, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (G(), F("div", Al, [I("div", jl, [I("table", Ml, [t[4] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Action"),
			I("th", { scope: "col" }, "Actor"),
			I("th", { scope: "col" }, "Target"),
			I("th", { scope: "col" }, "Details"),
			I("th", { scope: "col" }, "IP"),
			I("th", { scope: "col" }, "Time")
		])], -1), I("tbody", null, [(G(!0), F(j, null, q(i.value, (e) => (G(), F("tr", { key: e.id }, [
			I("td", null, [I("span", { "data-testid": `action-${e.id}` }, [R(S, { tone: h(e.action) }, {
				default: Q(() => [L(Y(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Nl)]),
			I("td", null, Y(e.actor), 1),
			I("td", null, Y(e.target || "—"), 1),
			I("td", Pl, Y(e.details || "—"), 1),
			I("td", Fl, Y(e.ip_address || "—"), 1),
			I("td", Il, Y(m(e.created_at)), 1)
		]))), 128))])])]), d.value > 1 ? (G(), F("nav", Ll, [
			R(f, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: l.value <= 1,
				onClick: t[1] ||= (e) => p(l.value - 1)
			}, {
				default: Q(() => [...t[5] ||= [L(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			I("span", Rl, "Page " + Y(l.value) + " of " + Y(d.value), 1),
			R(f, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: l.value >= d.value,
				onClick: t[2] ||= (e) => p(l.value + 1)
			}, {
				default: Q(() => [...t[6] ||= [L(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : P("", !0)]))]));
	}
}), [["__scopeId", "data-v-26a60fa5"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Bl(e, t) {
	let n = wn(), r = !1;
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
//#region src/composables/useOnline.ts
function Vl() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = K(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), Se(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), we(t);
}
//#endregion
export { D as ALL_LOGS, Va as AMBIENT_SAMPLE_H, Ha as AMBIENT_SAMPLE_INTERVAL_MS, Ba as AMBIENT_SAMPLE_W, Ii as ARROW_ICONS, Li as ARROW_LABELS, se as AdminBackupApi, w as AdminCastApi, ue as AdminCollectionsApi, O as AdminDashboardApi, ce as AdminDlnaServerApi, de as AdminHistoryApi, oe as AdminIntegrationsApi, me as AdminLibrariesApi, le as AdminLiveTvApi, E as AdminLogsApi, A as AdminRemoteAccessApi, ae as AdminServicesApi, he as AdminSettingsApi, fe as AdminSyncPlayApi, te as AdminUsersApi, ie as AdminWebhooksApi, Xa as AmbientCanvas, e as ApiClient, t as ApiError, Ge as AppBackdrop, pt as AppLayout, zl as AuditLogsPage, S as Badge, ti as BrowsePage, f as Button, va as CAPTION_BACKGROUND_OPTIONS, _a as CAPTION_COLOR_OPTIONS, ya as CAPTION_EDGE_OPTIONS, ga as CAPTION_SIZE_OPTIONS, ha as CAPTION_SIZE_SCALE, Ca as CaptionOverlay, za as CaptionsMenu, br as Chip, Dr as Combobox, Bt as CommandPalette, Qe as DEFAULT_CAPTION_STYLE, $e as DEFAULT_PREFERENCES, no as DIRECT_PLAY_EXTENSIONS, _ as EmptyState, _l as FederationPage, Xr as FilterBar, l as Icon, h as IconButton, wt as Kbd, pe as LIBRARY_TYPES, Kc as LibraryScanPage, i as LocalStorageTokenStore, ds as LoginForm, hs as LoginPage, Dl as ManageSharesPage, Jn as MediaCard, Ci as MediaDetail, Oi as MediaDetailPage, rr as MediaGrid, gr as MediaHomeRow, pr as MediaRow, en as MiniPlayer, g as Modal, il as MyServersPage, a as NetworkError, Fi as PLAYER_SHORTCUTS, Mc as PageTransition, _n as PhlixApp, Ho as Player, Go as PlayerPage, Qi as QualityMenu, ee as RATING_LABELS, k as RATING_OPTIONS, Ht as RESUME_MAX_RATIO, Vt as RESUME_MIN_SECONDS, to as ResumePrompt, jc as Reveal, ne as SUBSCRIBABLE_EVENTS, Pi as Scrubber, x as Select, mc as SettingsForm, gc as SettingsPage, Ze as Sheet, Ji as ShortcutsHelp, vs as SignupForm, Ss as SignupPage, s as Skeleton, C as Slider, Zi as SpeedMenu, Ac as Spinner, T as Switch, ro as TRANSCODE_EXTENSIONS, Ds as Tabs, p as TimeoutError, Oc as ToastHost, xc as Tooltip, Eo as TranscodeNotice, co as UPNEXT_COUNTDOWN_SECONDS, uo as UPNEXT_RING_CIRCUMFERENCE, lo as UPNEXT_RING_RADIUS, So as UpNext, Xi as VolumeControl, re as WEBHOOK_EVENT_CATEGORIES, la as activeAudioIndex, Pc as adminMenu, Ja as ambientGradient, ca as applyAudioTrack, fn as applyStoredThemeEarly, sa as applyTrackModes, Wa as averageRegion, Bl as bindMediaStoreToRouter, Nc as buildAdminRoutes, mr as buildMediaQuery, hr as buildMediaUrl, Sa as captionStyleVars, pa as cleanCueText, yc as createPhlixApp, ln as deriveAccentVars, xa as edgeShadow, n as errMessage, ao as extensionOf, ki as formatTime, Dt as fuzzyScore, Bi as handleShortcut, oa as hasActiveCaptions, rt as hasStoredPreferences, Ya as isBatterySaving, so as isFatalMediaError, r as isOffline, zi as isTypingTarget, ia as listAudioTracks, ra as listSubtitleTracks, Ot as matchCommand, oo as needsTranscode, ma as readActiveCueLines, nt as readStoredPreferences, aa as resolveTextTrack, Ka as rgbString, qa as rgbaString, fo as ringDashoffset, Ga as sampleAmbient, ht as useAuthStore, At as useCommandStore, m as useFocusTrap, Vi as useKeyboardShortcuts, wn as useMediaStore, Vl as useOnline, Kt as usePlayerStore, $ as usePreferencesStore, pn as useTheme, u as useToastStore };

//# sourceMappingURL=phlix-ui.js.map