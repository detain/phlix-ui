import { r as e } from "./AuthField-n1LgzcyM.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-DZxA3ZEr.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-FeMLCFE3.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Dwm0lQlG.js";
import { a as m, c as h, d as g, f as _, i as v, l as y, m as ee, n as te, o as ne, p as b, r as re, t as x, u as ie } from "./Button-MsRePfWv.js";
import { t as S } from "./useAuthStore-BNs-pZEK.js";
import { i as ae, n as oe, r as se, t as ce } from "./usePlayerStore-DmNlaYQc.js";
import { i as le, n as ue, r as de, t as fe } from "./Kbd-CSMm1T0l.js";
import { a as pe, i as me, n as he, o as ge, r as _e, t as ve } from "./useLibrariesStore-DJmmZLu-.js";
import { i as ye, n as be, r as xe, t as Se } from "./usePageTitle-BO3GGF3M.js";
import { t as C } from "./Badge-ArWL5-WE.js";
import { t as Ce } from "./Slider-BMn_Lp_q.js";
import { t as we } from "./Switch-CFZhdkXR.js";
import { t as Te } from "./Chip-2HcSZF4a.js";
import { t as Ee } from "./Select-DLwgQInL.js";
import { i as De, n as Oe, r as ke, t as Ae } from "./FilterBar-DD56VOWQ.js";
import { t as je } from "./Modal-BJKZOPpV.js";
import { t as w } from "./useToastStore-BDoKlU6N.js";
import { t as T } from "./Skeleton-DkSoWF3C.js";
import { i as Me, n as Ne, r as Pe, t as Fe } from "./MetadataMatchModal-DNu-dAPM.js";
import { t as E } from "./EmptyState-B2QnGIQT.js";
import { t as Ie } from "./Tabs-x8dUKZN5.js";
import { t as Le } from "./MediaRow-4otJo6GK.js";
import { a as Re, i as ze, n as Be, t as Ve } from "./useApiBase-DhSHB6Qp.js";
import { t as He } from "./HomeRow-CiQraxYh.js";
import { t as Ue } from "./MediaDetail-DmwyDIsY.js";
import { n as We, t as Ge } from "./logs-DadTfaTq.js";
import { t as Ke } from "./dashboard-BTCOCTHQ.js";
import { n as qe, r as Je, t as Ye } from "./users-UPfbrkL3.js";
import { n as Xe, r as Ze, t as Qe } from "./webhooks-BBTLnFKm.js";
import { t as $e } from "./services-C907MGdw.js";
import { t as et } from "./integrations-DLAG9ISY.js";
import { t as tt } from "./backup-IdY_vzc2.js";
import { t as nt } from "./cast-BvFcBEB6.js";
import { t as rt } from "./dlnaServer-B5Sg4MkS.js";
import { t as it } from "./remoteAccess-DVKRpKQ8.js";
import { t as at } from "./liveTv-Dbjt901v.js";
import { t as ot } from "./collections-CH3HLdcd.js";
import { t as st } from "./history-ByCY8OYj.js";
import { t as ct } from "./syncPlay-DPzJkgkK.js";
import { n as lt, t as ut } from "./libraries-CXAz_kXs.js";
import { t as dt } from "./settings-m4upFcmH.js";
import { i as ft, n as pt, r as mt, t as ht } from "./plugins-UjYR2rXk.js";
import { t as gt } from "./hubDashboard-BhOaaDD-.js";
import { A as _t, B as vt, C as yt, D as bt, E as xt, F as St, G as Ct, H as wt, I as Tt, J as Et, K as Dt, L as Ot, M as kt, N as At, O as jt, P as Mt, R as Nt, S as Pt, T as Ft, U as It, V as Lt, W as Rt, X as zt, Y as Bt, _ as Vt, a as Ht, b as Ut, c as Wt, d as Gt, f as Kt, g as qt, h as Jt, i as Yt, j as Xt, k as Zt, l as Qt, m as $t, n as en, o as tn, p as nn, q as rn, r as an, s as on, t as sn, u as cn, v as ln, w as un, x as dn, y as fn, z as pn } from "./Player-CaRNZdo8.js";
import { a as mn, c as hn, d as gn, f as _n, g as vn, h as yn, i as bn, l as xn, m as Sn, n as Cn, o as wn, p as Tn, r as En, s as Dn, t as On, u as kn } from "./captions-COgPp5bH.js";
import { t as An } from "./LoginForm-C3zU1Nvo.js";
import { t as jn } from "./SignupForm-9B30CYd-.js";
import { t as Mn } from "./SettingsForm-sw7T_xzl.js";
import { Fragment as D, Teleport as Nn, Transition as O, TransitionGroup as Pn, computed as k, createApp as Fn, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as In, defineComponent as I, inject as Ln, normalizeClass as L, normalizeStyle as Rn, onBeforeUnmount as R, onMounted as z, onScopeDispose as zn, openBlock as B, readonly as Bn, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as Vn, toDisplayString as W, toValue as Hn, unref as G, useId as Un, vModelText as Wn, watch as K, watchEffect as Gn, withCtx as q, withDirectives as Kn, withKeys as qn, withModifiers as Jn } from "vue";
import { createPinia as Yn, defineStore as Xn } from "pinia";
import { RouterLink as J, RouterView as Zn, createRouter as Qn, createWebHistory as $n, useRouter as er } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var tr = ["aria-labelledby"], nr = {
	key: 0,
	class: "phlix-sheet__header"
}, rr = ["id"], ir = { class: "phlix-sheet__body" }, ar = {
	key: 1,
	class: "phlix-sheet__footer"
}, or = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let n = e, a = t, o = V(n.modelValue);
		K(() => n.modelValue, (e) => o.value = e);
		let s = V(null), c = Un();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), A(Nn, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: q(() => [e.modelValue ? (B(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Jn(u, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), M("header", nr, [e.title ? (B(), M("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, rr)) : j("", !0), e.hideClose ? j("", !0) : (B(), A(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : j("", !0),
				N("div", ir, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), M("footer", ar, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, tr)], 34)) : j("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), sr = { class: "shell" }, cr = {
	class: "shell__skip",
	href: "#main"
}, lr = { class: "shell__bar" }, ur = { class: "shell__inner" }, dr = { class: "shell__brand" }, fr = ["aria-label"], pr = { class: "shell__actions" }, mr = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, hr = {
	key: 0,
	class: "shell__footer"
}, gr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = V(!1), { t: o } = p();
		return (t, a) => (B(), M("div", sr, [
			N("a", cr, W(G(o)("shell.skipToContent")), 1),
			F(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			N("header", lr, [N("div", ur, [
				N("div", dr, [U(t.$slots, "logo", {}, () => [a[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", {
					class: "shell__nav",
					"aria-label": G(o)("shell.primaryNav")
				}, [U(t.$slots, "nav", {}, void 0, !0)], 8, fr),
				a[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", pr, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), A(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: G(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : j("", !0)
			])]),
			N("main", mr, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), M("footer", hr, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(or, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: G(o)("shell.menu")
			}, {
				default: q(() => [N("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [U(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-aaaeed33"]]), _r = /* @__PURE__ */ I({
	__name: "ThemeToggle",
	setup(e) {
		let t = a(), { t: n } = p(), i = [
			"nocturne",
			"daylight",
			"midnight"
		], o = {
			nocturne: "moon",
			daylight: "sun",
			midnight: "monitor"
		}, s = {
			nocturne: "Nocturne",
			daylight: "Daylight",
			midnight: "Midnight"
		}, c = k(() => i[(i.indexOf(t.theme) + 1) % i.length]), l = k(() => o[t.theme] ?? "moon"), u = k(() => n("shell.themeToggleLabel", {
			current: s[t.theme] ?? t.theme,
			next: s[c.value]
		}));
		function d() {
			t.theme = c.value;
		}
		return (e, t) => (B(), A(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), vr = ["aria-label", "aria-expanded"], yr = {
	key: 0,
	class: "usermenu__avatar"
}, br = ["aria-label"], xr = { class: "usermenu__head" }, Sr = { class: "usermenu__avatar usermenu__avatar--lg" }, Cr = { class: "usermenu__name" }, wr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = S(), r = er(), a = Ln("phlixConfig", null), o = k(() => a?.routerBase ?? "/app"), { t: s } = p(), c = V(!1), l = V(null), u = V(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = k(() => d.value.charAt(0).toUpperCase() || "A");
		function m() {
			c.value = !1;
		}
		function h(e) {
			m(), r.push(e);
		}
		function g() {
			m(), t.logout(), r.push(`${o.value}/login`);
		}
		i(u, c, {
			lockScroll: !1,
			onEscape: () => (m(), !0)
		});
		function _(e) {
			l.value && !l.value.contains(e.target) && m();
		}
		return K(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
		}), R(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (B(), M("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [N("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": G(t).isLoggedIn ? G(s)("shell.accountNamed", { name: d.value }) : G(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [G(t).isLoggedIn ? (B(), M("span", yr, W(f.value), 1)) : (B(), A(n, {
			key: 1,
			name: "user"
		}))], 8, vr), c.value ? (B(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": G(s)("shell.account"),
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), M(D, { key: 0 }, [
			N("div", xr, [N("span", Sr, W(f.value), 1), N("span", Cr, W(d.value), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [F(n, { name: "settings" }), P(" " + W(G(s)("shell.settings")), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [F(n, { name: "log-out" }), P(" " + W(G(s)("shell.signOut")), 1)])
		], 64)) : (B(), M("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [F(n, { name: "user" }), P(" " + W(G(s)("shell.signIn")), 1)]))], 8, br)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Tr = ["aria-label"], Er = ["src", "poster"], Dr = { class: "mini__body" }, Or = { class: "mini__title" }, kr = { class: "mini__controls" }, Ar = ["aria-label"], jr = ["aria-label"], Mr = ["aria-label"], Nr = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Pr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = ae(), { t: a } = p(), o = V(null), s = k(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = k(() => i.current?.name ?? ""), l = k(() => Math.max(0, Math.min(1, i.progress)));
		function u() {
			let e = o.value;
			e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, i.position > 0 && (!e.duration || i.position < e.duration) && (e.currentTime = i.position), i.playing && e.play()?.catch(() => {}));
		}
		function d() {
			i.play();
		}
		function f() {
			i.pause();
		}
		function m() {
			let e = o.value;
			e && i.updateProgress(e.currentTime, e.duration);
		}
		function h() {
			let e = o.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function g() {
			i.current && r("expand", i.current.id);
		}
		function _() {
			i.closePlayer();
		}
		return K(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), K(() => i.lastCommand, (e) => {
			let t = o.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : i.position + e.value, r = t.duration && t.duration > 0 ? t.duration : i.duration, a = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = a, i.updateProgress(a, t.duration || void 0);
		}), R(() => {
			o.value?.pause?.();
		}), (e, t) => (B(), A(O, { name: "mini" }, {
			default: q(() => [s.value ? (B(), M("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": G(a)("player.miniPlayer")
			}, [
				N("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: G(i).streamUrl,
					poster: G(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: u,
					onPlay: d,
					onPause: f,
					onTimeupdate: m,
					onClick: g
				}, null, 40, Er),
				N("div", Dr, [N("p", Or, W(c.value), 1), N("div", kr, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? G(a)("player.pause") : G(a)("player.play"),
						onClick: h
					}, [F(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Ar),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(a)("player.expand"),
						onClick: g
					}, [F(n, { name: "expand" })], 8, jr),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": G(a)("player.closePlayer"),
						onClick: _
					}, [F(n, { name: "x" })], 8, Mr)
				])]),
				N("div", Nr, [N("div", {
					class: "mini__progress-fill",
					style: Rn({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Tr)) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-723c01d3"]]);
//#endregion
//#region src/composables/color.ts
function Fr(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Ir = (e) => Math.max(0, Math.min(255, Math.round(e))), Lr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Ir(e).toString(16).padStart(2, "0")).join("");
function Rr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function zr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Br = ({ r: e, g: t, b: n }, r) => `rgba(${Ir(e)}, ${Ir(t)}, ${Ir(n)}, ${r})`;
function Vr({ r: e, g: t, b: n }) {
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
function Hr(e) {
	let t = Fr(e);
	if (!t) return null;
	let n = Vr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Lr(t),
		"--accent-hover": Lr(Rr(t, .12)),
		"--accent-active": Lr(zr(t, .12)),
		"--accent-soft": Br(t, .14),
		"--accent-ring": Br(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Ur = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Wr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion"), e.tv ? n.setAttribute("data-tv", "true") : n.removeAttribute("data-tv");
	let r = e.accent ? Hr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Ur) n.style.removeProperty(e);
}
function Gr(e, t) {
	let n = o(), r = !c();
	e && r && (n.theme = e), t !== void 0 && r && (n.tv = t), Wr(n, n.reducedMotion === "on" ? !0 : n.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Kr() {
	let e = a();
	return Gn(() => {
		Wr({
			theme: e.theme,
			density: e.density,
			accent: e.accent,
			tv: e.tv
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function qr() {
	let e = le(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), zn(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function Y(e, t) {
	let n = (e ?? "").trim();
	if (!n) return null;
	let r;
	try {
		r = t ? new URL(n, t) : new URL(n);
	} catch {
		return null;
	}
	return r.protocol === "http:" || r.protocol === "https:" ? r.origin : null;
}
function Jr(e) {
	let t = Y(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Y(n, t);
	return !r || t && r === t ? null : r;
}
function Yr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Y(e.href) === t) return !0;
	return !1;
}
function Xr(e, t, n, r) {
	if (Yr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function Zr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Y(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Y(e);
		r && (n && r === n || a.has(r) || (a.add(r), Xr("preconnect", r, t.crossOrigin === !0, i), Xr("dns-prefetch", r, !1, i)));
	}
	i.length && zn(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function Qr() {
	let e = ae(), t = S();
	async function n() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {};
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / se));
			}
			e.mergeServerResume(r);
		} catch {}
	}
	return { syncResume: n };
}
//#endregion
//#region src/composables/useResumeReporter.ts
var $r = "phlix.deviceId", ei = 15e3;
function ti() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem($r);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem($r, e)), e;
	} catch {
		return "web";
	}
}
function ni() {
	let e = ae(), t = S(), n = ti(), r = null, i = 0, a = !1;
	async function o() {
		if (r) return r;
		try {
			let e = await t.client.post("/api/v1/sessions", { device_id: n });
			r = typeof e.session_id == "string" && e.session_id !== "" ? e.session_id : null;
		} catch {
			r = null;
		}
		return r;
	}
	async function s(n = !1) {
		let r = e.current;
		if (!t.isLoggedIn || !r || !(e.duration > 0) || e.position <= 30) return;
		let s = Date.now();
		if (!(a || !n && s - i < ei)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * se),
					duration_ticks: Math.floor(e.duration * se),
					is_paused: !e.playing
				});
			} catch {} finally {
				a = !1;
			}
		}
	}
	return K(() => Math.floor(e.position), () => void s()), K(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var ri = ["src", "alt"], ii = { class: "brand-wordmark" }, ai = {
	key: 1,
	class: "brand-tagline"
}, oi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		Kr();
		let t = le(), i = er(), { t: a } = p();
		qr();
		let o = In(() => import("./CommandPalette-DgXPiuHU.js")), s = V(!1);
		K(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = Ln("phlixConfig", null);
		Zr(Jr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = S(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = Qr();
		K(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), ni();
		let m = k(() => l?.branding ?? {}), h = k(() => m.value.wordmark ?? "Phlix"), g = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = k(() => l?.home ?? l?.routerBase ?? "/app"), v = ve(), y = k(() => g.value.some((e) => e.libraryLinks));
		K(() => u.isLoggedIn && y.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function ee(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), A(gr, null, {
			logo: q(() => [F(G(J), {
				to: _.value,
				class: "brand"
			}, {
				default: q(() => [
					m.value.logoSrc ? (B(), M("img", {
						key: 0,
						src: m.value.logoSrc,
						alt: m.value.logoAlt ?? h.value,
						class: "brand-logo"
					}, null, 8, ri)) : j("", !0),
					N("span", ii, [P(W(h.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					m.value.tagline ? (B(), M("span", ai, W(m.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: q(() => [g.value.length ? (B(!0), M(D, { key: 0 }, H(g.value, (e) => (B(), M(D, { key: e.id }, [(B(), A(Vn(e.href ? "a" : G(J)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? ee(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: q(() => [e.icon ? (B(), A(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : j("", !0), P(" " + W(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (B(!0), M(D, null, H(e.libraryLinks ? G(v).items : [], (t) => (B(), A(G(J), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: q(() => [P(W(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (B(), M(D, { key: 1 }, [F(G(J), {
				to: _.value,
				class: "nav-link"
			}, {
				default: q(() => [P(W(G(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), F(G(J), {
				to: `${_.value}/settings`,
				class: "nav-link"
			}, {
				default: q(() => [P(W(G(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: q(() => [
				F(r, {
					name: "search",
					label: G(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => G(t).openPalette()
				}, null, 8, ["label"]),
				F(_r),
				F(wr)
			]),
			default: q(() => [
				F(G(Zn)),
				s.value ? (B(), A(G(o), { key: 0 })) : j("", !0),
				F(Pr, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-5afba5d1"]]), si = { class: "phlix-placeholder" }, ci = { class: "placeholder-content" }, li = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), M("div", si, [N("div", ci, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), X = /* @__PURE__ */ new Set();
function ui(e, t) {
	e.hasAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.setAttribute("data-focusable", ""), t?.group == null ? e.removeAttribute("data-focus-group") : e.setAttribute("data-focus-group", String(t.group)), t?.order == null ? e.removeAttribute("data-focus-order") : e.setAttribute("data-focus-order", String(t.order)), t?.disabled ? X.delete(e) : X.add(e);
}
var di = {
	mounted(e, t) {
		ui(e, t.value);
	},
	updated(e, t) {
		ui(e, t.value);
	},
	unmounted(e) {
		X.delete(e);
	}
};
function fi(e) {
	e.directive("focusable", di);
}
//#endregion
//#region src/stores/useServerStore.ts
var pi = "phlix.currentServerId", mi = "phlix.currentServerName", hi = "phlix.currentServerUrl";
function gi(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e);
	} catch {
		return null;
	}
}
function Z(e, t) {
	if (!(typeof window > "u")) try {
		t === null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, t);
	} catch {}
}
var _i = Xn("server", () => {
	let e = V(gi(pi)), t = V(gi(mi)), n = V(gi(hi)), r = k(() => e.value !== null);
	function i(r, i, a) {
		e.value = r, t.value = i ?? null, n.value = a && a !== "" ? a : null, Z(pi, r), Z(mi, i ?? null), Z(hi, n.value);
	}
	function a() {
		e.value = null, t.value = null, n.value = null, Z(pi, null), Z(mi, null), Z(hi, null);
	}
	return {
		currentServerId: e,
		currentServerName: t,
		currentServerUrl: n,
		hasCurrent: r,
		setCurrent: i,
		clear: a
	};
}), vi = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-HudcNNh1.js")
}, yi = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-BwxLE_cg.js")
}, bi = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-DaGQDu1D.js")
}, xi = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-CeSRujD_.js")
}, Si = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-kigRm58f.js")
}, Ci = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-CUbmW-o3.js")
}, wi = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-DEcjor5E.js")
}, Ti = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-BG6v993m.js")
}, Ei = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-DgWfqhpZ.js")
}, Di = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-CwCVLT0K.js")
}, Oi = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-TF9fPsdl.js")
}, ki = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-_X-x5ym4.js")
}, Ai = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-HhFjB0Kf.js")
}, ji = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-CVbEy_L4.js")
}, Mi = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-Yn2dtPn9.js")
}, Ni = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-CV0VPZpH.js")
}, Pi = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-KpnqPaLJ.js")
}, Fi = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-BYXEF2tJ.js")
}, Ii = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-BKPR9GGn.js")
}, Li = Object.fromEntries([
	vi,
	yi,
	bi,
	xi,
	Si,
	Ci,
	wi,
	Ti,
	Ei,
	Di,
	Oi,
	ki,
	Ai,
	ji,
	Mi,
	Ni,
	Pi,
	Fi,
	Ii
].map((e) => [e.name, e.label]));
function Ri(e) {
	return e ? Li[e] ?? null : null;
}
var zi = [
	yi,
	bi,
	Pi
], Bi = [
	vi,
	xi,
	Si,
	Ci,
	wi,
	Ti,
	Ei,
	Di,
	Oi,
	ki,
	Ai,
	ji,
	Mi,
	Ni
], Vi = [Fi, Ii], Hi = [
	vi,
	yi,
	bi,
	xi,
	Si,
	Ci,
	wi,
	Ti,
	Ei,
	Di,
	Oi,
	ki,
	Ai,
	ji,
	Mi,
	Ni,
	Pi
], Ui = [
	Fi,
	...zi,
	Ii
];
function Wi(e = "/app", t = Hi) {
	let n = `${e}/admin`, r = t.map((e) => ({
		path: e.path,
		name: e.name,
		component: e.component
	}));
	return t.length > 0 && r.unshift({
		path: "",
		redirect: { name: t[0].name }
	}), [{
		path: n,
		meta: { requiresAdmin: !0 },
		component: () => import("./AdminLayout-C5X74ehJ.js"),
		props: {
			base: e,
			pages: t
		},
		children: r
	}];
}
function Gi(e = "/app") {
	return Wi(e, Hi);
}
function Ki(e = "/app") {
	return Wi(e, Ui);
}
function qi(e = "/app", t = Hi) {
	let n = `${e}/admin`;
	return [{
		id: "admin",
		label: "Admin",
		icon: "settings",
		children: t.map((e) => ({
			id: e.name,
			label: e.label,
			icon: e.icon,
			to: `${n}/${e.path}`
		}))
	}];
}
//#endregion
//#region src/app/createPhlixApp.ts
var Ji = ["login", "signup"];
function Yi(e, t, n = !1, r = { name: "browse" }) {
	let i = typeof e.name == "string" ? e.name : "";
	return Ji.includes(i) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? r : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Xi(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = Ri(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function Zi(e, t, n) {
	return e === "hub" && n ? `${t}/api/v1/servers/${n}/proxy` : t;
}
function Qi(e, t) {
	return e !== "hub" || t === null || t === "" ? "" : t.replace(/\/+$/, "");
}
function $i() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {},
		deviceHeaders: {}
	};
}
function ea(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-DPV6hUCE.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-DGDAIlPN.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-BTGDnR70.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-gSBcP7fI.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-DtyaI5XX.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-BE8-KoLi.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-CGsL3I3-.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-Dkssc2Nk.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: li,
		props: { appName: e.app }
	}), n;
}
function ta(e) {
	let t = {
		...$i(),
		...e
	};
	h(t.deviceHeaders ?? {}), Gr(t.defaultTheme, t.defaultTv), be(t.branding?.wordmark);
	let n = f(t.messages), r = Yn();
	if (!c()) {
		let e = a(r);
		t.defaultTheme && (e.theme = t.defaultTheme), t.defaultTv !== void 0 && (e.tv = t.defaultTv);
	}
	let i = Qn({
		history: $n(),
		routes: ea(t)
	}), o = t.home ? { path: t.home } : { name: "browse" };
	i.beforeEach(async (e) => {
		let t = S(r);
		return await t.init(), Yi(e, t.isLoggedIn, t.isAdmin, o);
	}), i.afterEach((e) => {
		xe(Xi(e, n));
	});
	let s = _i(r), l = k(() => Zi(t.app, t.apiBase, s.currentServerId)), u = k(() => Qi(t.app, s.currentServerUrl)), d = Fn(oi);
	return d.provide("apiBase", t.apiBase), d.provide("mediaApiBase", l), d.provide("mediaDirectBase", u), d.provide("phlixCommands", t.commands ?? []), d.provide("phlixConfig", t), d.use(r), d.use(i), fi(d), d;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var na = ["id"], ra = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = Un(), r = V(!1), i = V(null), a;
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
		return R(() => clearTimeout(a)), (t, a) => (B(), M("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: qn(c, ["esc"])
		}, [U(t.$slots, "default", {}, void 0, !0), F(O, { name: "phlix-tooltip" }, {
			default: q(() => [r.value && (e.text || t.$slots.content) ? (B(), M("span", {
				key: 0,
				id: G(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [U(t.$slots, "content", {}, () => [P(W(e.text), 1)], !0)], 10, na)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), ia = ["aria-label"], aa = ["role"], oa = { class: "phlix-toast__content" }, sa = {
	key: 0,
	class: "phlix-toast__title"
}, ca = { class: "phlix-toast__message" }, la = ["onClick"], ua = 0, da = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = p(), i = w(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return z(() => {
			ua++;
		}), R(() => {
			ua--;
		}), (a, s) => (B(), A(Nn, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": G(t)("common.notifications")
		}, [F(Pn, { name: "phlix-toast" }, {
			default: q(() => [(B(!0), M(D, null, H(G(i).toasts, (e) => (B(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", oa, [e.title ? (B(), M("p", sa, W(e.title), 1)) : j("", !0), N("p", ca, W(e.message), 1)]),
				e.action ? (B(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(i).dismiss(e.id);
					}
				}, W(e.action.label), 9, la)) : j("", !0),
				F(r, {
					name: "x",
					label: G(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, aa))), 128))]),
			_: 1
		})], 10, ia)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), fa = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = V(null), r = V(!1), i = V(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return z(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), R(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (B(), A(Vn(e.tag), {
			ref_key: "el",
			ref: n,
			class: L(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Rn({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), pa = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (B(), A(O, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), ma = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, ha = {
	key: 0,
	class: "library-scan__skel"
}, ga = {
	key: 3,
	class: "library-scan__table-wrap"
}, _a = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, va = { class: "library-scan__name" }, ya = {
	key: 0,
	class: "library-scan__paths"
}, ba = { class: "library-scan__num" }, xa = { class: "library-scan__date" }, Sa = ["data-testid"], Ca = {
	key: 0,
	class: "library-scan__error"
}, wa = { class: "library-scan__actions" }, Ta = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = V([]), i = V({}), a = V(!0), o = V(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				r.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of r.value) c(e.id);
			} catch (e) {
				o.value = b(e, "Failed to load libraries."), n.error(o.value);
			} finally {
				a.value = !1;
			}
		}
		async function c(e) {
			try {
				let n = await t.get(`/api/v1/libraries/${e}/scan-status`), r = n.scan_status ?? n.job ?? null;
				r && (i.value = {
					...i.value,
					[e]: r
				});
			} catch {}
		}
		async function l(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/scan`), n.success("Scan queued."), await c(e);
			} catch (e) {
				n.error(b(e, "Failed to trigger scan."));
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), n.success("Rescan queued."), await c(e);
			} catch (e) {
				n.error(b(e, "Failed to trigger rescan."));
			}
		}
		function d(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function f(e) {
			return e?.status === "running" || e?.status === "queued";
		}
		function p(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function m(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		return z(s), (e, t) => (B(), M("section", ma, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), M("div", ha, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: q(() => [F(x, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: q(() => [...t[0] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), A(E, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (B(), M("div", ga, [N("table", _a, [t[3] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Type"),
			N("th", { scope: "col" }, "Items"),
			N("th", { scope: "col" }, "Last scan"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(B(!0), M(D, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
			N("td", null, [N("div", va, W(e.name), 1), e.paths.length ? (B(), M("div", ya, W(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, W(e.type), 1),
			N("td", ba, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", xa, W(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: m(i.value[e.id]) }, {
				default: q(() => [P(W(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), M("span", Ca, W(i.value[e.id]?.error), 1)) : j("", !0)], 8, Sa)]),
			N("td", null, [N("div", wa, [F(x, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: q(() => [...t[1] ||= [P(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), F(x, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: q(() => [...t[2] ||= [P(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-3235ff5e"]]), Q = class extends Error {
	kind;
	constructor(e, t) {
		super(t), this.kind = e, this.name = "ClaimError";
	}
};
async function Ea(e, t, n) {
	let r = t.trim();
	if (r === "") throw new Q("empty", "Enter the claim code shown on your server.");
	let i = typeof window < "u" ? new y().getAccessToken() : null, a;
	try {
		a = await fetch(`${e}/api/v1/server-claims/claim`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept-Phlix-Protocol": "v1",
				...i ? { Authorization: `Bearer ${i}` } : {}
			},
			credentials: "same-origin",
			body: JSON.stringify({ claim_code: r }),
			signal: n
		});
	} catch {
		throw new Q("network", "Network error — check your connection and try again.");
	}
	if (a.ok) {
		let e = await a.json().catch(() => ({}));
		return { serverId: typeof e.server_id == "string" ? e.server_id : "" };
	}
	let o = await a.json().catch(() => ({})), s = typeof o.message == "string" ? o.message : "";
	switch (a.status) {
		case 401: throw new Q("unauthorized", "Your session expired — please sign in again.");
		case 404: throw new Q("not_found", "That claim code was not found. Double-check it and try again.");
		case 410: throw new Q("expired", "That claim code has expired. Generate a new one on your server.");
		case 409: throw new Q("already_claimed", "That server has already been claimed.");
		default: throw new Q("invalid", s || "Could not add the server. Check the claim code and try again.");
	}
}
//#endregion
//#region src/api/normalize.ts
function Da(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Oa = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, ka = { class: "my-servers__head" }, Aa = {
	key: 0,
	class: "my-servers__skel"
}, ja = {
	key: 3,
	class: "my-servers__table-wrap"
}, Ma = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Na = { class: "my-servers__name" }, Pa = { class: "my-servers__url" }, Fa = { class: "my-servers__num" }, Ia = { class: "my-servers__date" }, La = ["data-testid"], Ra = { class: "my-servers__actions" }, za = ["disabled"], Ba = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, Va = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = S(), i = _i(), a = er(), o = Ln("phlixConfig", void 0)?.routerBase || "/app", s = V([]), c = V(!0), l = V(null), u = V(!1), d = V(""), f = V(!1), p = V(null);
		function m() {
			d.value = "", p.value = null, u.value = !0;
		}
		async function h() {
			f.value = !0, p.value = null;
			try {
				await Ea("", d.value), u.value = !1, n.success("Server added."), await g();
			} catch (e) {
				p.value = e instanceof Q ? e.message : b(e, "Could not add the server.");
			} finally {
				f.value = !1;
			}
		}
		async function g() {
			c.value = !0, l.value = null;
			try {
				let e = await t.get("/api/v1/me/servers"), n = r.user?.username || r.user?.name || r.user?.email || "—";
				s.value = (e.servers || []).map((e) => ({
					id: e.serverId ?? "",
					name: e.serverName ?? "",
					url: e.hostnameCandidates?.[0] ?? "",
					status: e.status ?? "offline",
					owner: n,
					last_seen: Da(e.lastSeenAt),
					library_count: typeof e.libraryCount == "number" ? e.libraryCount : void 0
				}));
			} catch (e) {
				l.value = b(e, "Failed to load servers."), n.error(l.value);
			} finally {
				c.value = !1;
			}
		}
		function _(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function y(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function ee(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		function te(e) {
			e.url && window.open(e.url, "_blank", "noopener,noreferrer");
		}
		function ne(e) {
			e.status === "online" && (i.setCurrent(e.id, e.name, e.url), a.push(o));
		}
		return z(g), (e, t) => (B(), M("section", Oa, [
			N("header", ka, [t[4] ||= N("div", null, [N("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(x, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: m
			}, {
				default: q(() => [...t[3] ||= [P("Add server", -1)]]),
				_: 1
			})]),
			c.value ? (B(), M("div", Aa, [F(T, {
				variant: "text",
				lines: 6
			})])) : l.value ? (B(), A(E, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: l.value
			}, {
				actions: q(() => [F(x, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: g
				}, {
					default: q(() => [...t[5] ||= [P("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : s.value.length === 0 ? (B(), A(E, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: q(() => [F(x, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: m
				}, {
					default: q(() => [...t[6] ||= [P("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (B(), M("div", ja, [N("table", Ma, [t[9] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Server"),
				N("th", { scope: "col" }, "Owner"),
				N("th", { scope: "col" }, "Libraries"),
				N("th", { scope: "col" }, "Last seen"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(B(!0), M(D, null, H(s.value, (e) => (B(), M("tr", { key: e.id }, [
				N("td", null, [N("div", Na, W(e.name), 1), N("div", Pa, W(e.url), 1)]),
				N("td", null, W(e.owner), 1),
				N("td", Fa, W(e.library_count === void 0 ? "—" : e.library_count), 1),
				N("td", Ia, W(_(e.last_seen)), 1),
				N("td", null, [N("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: ee(e.status) }, {
					default: q(() => [P(W(y(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, La)]),
				N("td", null, [N("div", Ra, [F(x, {
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					disabled: e.status !== "online",
					title: e.status === "online" ? `Browse ${e.name} here` : "This server is offline — it must be connected to browse it here",
					"aria-label": `Browse ${e.name}`,
					onClick: (t) => ne(e)
				}, {
					default: q(() => [...t[7] ||= [P("Browse", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				]), F(x, {
					variant: "ghost",
					size: "sm",
					disabled: !e.url,
					title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
					"aria-label": `Manage ${e.name}`,
					onClick: (t) => te(e)
				}, {
					default: q(() => [...t[8] ||= [P("Manage", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				])])])
			]))), 128))])])])),
			F(je, {
				modelValue: u.value,
				"onUpdate:modelValue": t[2] ||= (e) => u.value = e,
				title: "Add a server"
			}, {
				footer: q(() => [F(x, {
					variant: "ghost",
					size: "sm",
					disabled: f.value,
					onClick: t[1] ||= (e) => u.value = !1
				}, {
					default: q(() => [...t[12] ||= [P("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), F(x, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: f.value,
					disabled: f.value,
					onClick: h
				}, {
					default: q(() => [...t[13] ||= [P(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: q(() => [N("form", {
					class: "my-servers__add-form",
					onSubmit: Jn(h, ["prevent"])
				}, [
					t[10] ||= N("p", { class: "my-servers__add-help" }, [
						P(" On your media server, open "),
						N("strong", null, "Settings → Connect to hub"),
						P(" to get a claim code, then paste it here. ")
					], -1),
					t[11] ||= N("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					Kn(N("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => d.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: f.value
					}, null, 8, za), [[Wn, d.value]]),
					p.value ? (B(), M("p", Ba, W(p.value), 1)) : j("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-7ed0eb3e"]]), Ha = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, Ua = {
	key: 0,
	class: "federation__skel"
}, Wa = {
	key: 2,
	class: "federation__content"
}, Ga = {
	key: 1,
	class: "federation__table-wrap"
}, Ka = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, qa = { class: "federation__name" }, Ja = { class: "federation__url" }, Ya = { class: "federation__num" }, Xa = { class: "federation__date" }, Za = ["data-testid"], Qa = { class: "federation__actions" }, $a = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, eo = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = V([]), i = V(!0), a = V(null), o = V(""), s = V(""), c = V(""), l = V(!1);
		async function u(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/federation/peers")).peers || []).map((e) => ({
					id: e.id ?? "",
					name: e.name ?? "",
					url: e.url ?? "",
					status: e.status ?? "pending",
					shared_libraries_count: e.shared_library_count,
					last_sync: e.last_connected_at ?? e.last_seen_at ?? void 0
				}));
			} catch (e) {
				a.value = b(e, "Failed to load federation peers."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function d() {
			let e = o.value.trim(), r = s.value.trim(), i = c.value.trim();
			if (!(!e || !r || !i)) {
				l.value = !0;
				try {
					await t.post("/api/v1/me/federation/peers", {
						url: e,
						name: r,
						public_key: i
					}), n.success("Peer added."), o.value = "", s.value = "", c.value = "", await u();
				} catch (e) {
					n.error(b(e, "Failed to add peer."));
				} finally {
					l.value = !1;
				}
			}
		}
		async function f(e) {
			try {
				await t.delete(`/api/v1/me/federation/peers/${e}`), n.success("Peer removed."), await u();
			} catch (e) {
				n.error(b(e, "Failed to remove peer."));
			}
		}
		function p(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function m(e) {
			switch (e) {
				case "connected": return "Connected";
				case "disconnected": return "Disconnected";
				case "pending": return "Pending";
				default: return e;
			}
		}
		function h(e) {
			switch (e) {
				case "connected": return "success";
				case "disconnected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		return z(() => u(!0)), (e, t) => (B(), M("section", Ha, [t[10] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), M("div", Ua, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: q(() => [F(x, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: q(() => [...t[4] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (B(), M("div", Wa, [
			t[9] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), A(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), M("div", Ga, [N("table", Ka, [t[6] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(B(!0), M(D, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
				N("td", null, [N("div", qa, W(e.name), 1), N("div", Ja, W(e.url), 1)]),
				N("td", Ya, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", Xa, W(p(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: h(e.status) }, {
					default: q(() => [P(W(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Za)]),
				N("td", null, [N("div", Qa, [F(x, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: q(() => [...t[5] ||= [P(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			N("section", $a, [t[8] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: Jn(d, ["prevent"])
			}, [
				Kn(N("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[Wn, s.value]]),
				Kn(N("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[Wn, o.value]]),
				Kn(N("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[Wn, c.value]]),
				F(x, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: q(() => [...t[7] ||= [P(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), to = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, no = {
	key: 0,
	class: "shares__skel"
}, ro = {
	key: 3,
	class: "shares__table-wrap"
}, io = {
	class: "shares__table",
	"aria-label": "Library shares"
}, ao = { class: "shares__library" }, oo = { class: "shares__date" }, so = { class: "shares__date" }, co = ["data-testid"], lo = { class: "shares__actions" }, uo = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = V([]), i = V(!0), a = V(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Da(e.created_at) ?? "",
					expires_at: Da(e.expires_at)
				}));
			} catch (e) {
				a.value = b(e, "Failed to load shares."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function s(e) {
			try {
				await t.delete(`/api/v1/me/shares/${e}`), n.success("Share revoked."), await o();
			} catch (e) {
				n.error(b(e, "Failed to revoke share."));
			}
		}
		function c(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function l(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		function u(e) {
			switch (e) {
				case "read": return "info";
				case "write": return "success";
				default: return "neutral";
			}
		}
		return z(() => o(!0)), (e, t) => (B(), M("section", to, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), M("div", no, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: q(() => [F(x, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: q(() => [...t[1] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), A(E, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (B(), M("div", ro, [N("table", io, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Shared with"),
			N("th", { scope: "col" }, "Permissions"),
			N("th", { scope: "col" }, "Created"),
			N("th", { scope: "col" }, "Expires"),
			N("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(B(!0), M(D, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
			N("td", null, [N("span", ao, W(e.library_name), 1)]),
			N("td", null, W(e.shared_with), 1),
			N("td", null, [F(C, { tone: u(e.permissions) }, {
				default: q(() => [P(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", oo, W(c(e.created_at)), 1),
			N("td", so, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), A(C, {
				key: 0,
				tone: "error"
			}, {
				default: q(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, co)]),
			N("td", null, [N("div", lo, [F(x, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: q(() => [...t[3] ||= [P(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function fo(e, t) {
	let n = Oe(), r = !1;
	n.setLibraryId(void 0), n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = K(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = K(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/spatial-nav.ts
function po(e) {
	return {
		x: (e.left + e.right) / 2,
		y: (e.top + e.bottom) / 2
	};
}
var mo = .5, ho = 2, go = 1e6;
function $(e, t, n, r) {
	return e < r && n < t;
}
function _o(e, t, n) {
	let r = po(e), i = null, a = Infinity;
	for (let o of n) {
		let n = po(o.rect), s, c, l;
		switch (t) {
			case "right":
				if (n.x <= r.x + mo) continue;
				s = n.x - r.x, c = Math.abs(n.y - r.y), l = $(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "left":
				if (n.x >= r.x - mo) continue;
				s = r.x - n.x, c = Math.abs(n.y - r.y), l = $(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "down":
				if (n.y <= r.y + mo) continue;
				s = n.y - r.y, c = Math.abs(n.x - r.x), l = $(e.left, e.right, o.rect.left, o.rect.right);
				break;
			case "up":
				if (n.y >= r.y - mo) continue;
				s = r.y - n.y, c = Math.abs(n.x - r.x), l = $(e.left, e.right, o.rect.left, o.rect.right);
				break;
		}
		let u = s + ho * c;
		l && (u -= go), (u < a || u === a && (i === null || o.id < i.id)) && (a = u, i = o);
	}
	return i;
}
//#endregion
//#region src/composables/useSpatialNav.ts
var vo = {
	up: ["ArrowUp"],
	down: ["ArrowDown"],
	left: ["ArrowLeft"],
	right: ["ArrowRight"]
};
function yo(e) {
	return {
		left: e.left,
		top: e.top,
		right: e.right,
		bottom: e.bottom
	};
}
function bo(e) {
	return e.width <= 0 && e.height <= 0;
}
function xo() {
	let e = Array.from(X), t = (e) => {
		let t = e.getAttribute("data-focus-order");
		if (t === null || t === "") return Infinity;
		let n = Number(t);
		return Number.isFinite(n) ? n : Infinity;
	};
	return e.map((e, n) => ({
		el: e,
		i: n,
		order: t(e)
	})).sort((e, t) => e.order - t.order || e.i - t.i).map((e) => e.el);
}
function So(e = {}) {
	let t = {
		...vo,
		...e.keymap
	};
	function n() {
		let e = [], t = /* @__PURE__ */ new Map(), n = 0;
		for (let r of X) {
			let i = r.getBoundingClientRect();
			if (bo(i)) continue;
			let a = String(n++);
			e.push({
				id: a,
				rect: yo(i)
			}), t.set(a, r);
		}
		return {
			candidates: e,
			byId: t
		};
	}
	function r(e, t) {
		let n = typeof document < "u" ? document.activeElement : null;
		if (n && X.has(n)) {
			let e = n.getBoundingClientRect();
			if (!bo(e)) return yo(e);
		}
		let r = t[0];
		return r && e.has(r.id) ? r.rect : null;
	}
	function i(t) {
		let { candidates: i, byId: a } = n();
		if (i.length === 0) return e.onEdge?.(t), !1;
		let o = r(a, i);
		if (!o) return e.onEdge?.(t), !1;
		let s = typeof document < "u" ? document.activeElement : null, c = _o(o, t, s ? i.filter((e) => a.get(e.id) !== s) : i);
		return c ? (a.get(c.id)?.focus(), !0) : (e.onEdge?.(t), !1);
	}
	function a(e) {
		for (let n of [
			"up",
			"down",
			"left",
			"right"
		]) if (t[n]?.includes(e)) return n;
		return null;
	}
	function o(t) {
		if (!Hn(e.enabled ?? !1) || t.ctrlKey || t.metaKey || t.altKey || Tt(t.target) || document.activeElement?.closest("[data-focus-trap]") || t.target?.closest?.("[data-focus-trap]")) return;
		let n = a(t.key);
		n && i(n) && t.preventDefault();
	}
	function s(e) {
		if (e) {
			if (typeof e == "string") {
				if (typeof document > "u") return;
				document.querySelector(e)?.focus();
				return;
			}
			e.focus();
		}
	}
	function c() {
		xo()[0]?.focus();
	}
	return z(() => {
		typeof document < "u" && document.addEventListener("keydown", o);
	}), R(() => {
		typeof document < "u" && document.removeEventListener("keydown", o);
	}), {
		focus: s,
		move: i,
		focusFirst: c,
		registry: X
	};
}
//#endregion
//#region src/composables/useOnline.ts
function Co() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), zn(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Bn(t);
}
//#endregion
export { Ge as ALL_LOGS, Vt as AMBIENT_SAMPLE_H, ln as AMBIENT_SAMPLE_INTERVAL_MS, fn as AMBIENT_SAMPLE_W, kt as ARROW_ICONS, At as ARROW_LABELS, tt as AdminBackupApi, nt as AdminCastApi, ot as AdminCollectionsApi, Ke as AdminDashboardApi, rt as AdminDlnaServerApi, st as AdminHistoryApi, gt as AdminHubDashboardApi, et as AdminIntegrationsApi, ut as AdminLibrariesApi, at as AdminLiveTvApi, We as AdminLogsApi, ht as AdminPluginsApi, it as AdminRemoteAccessApi, $e as AdminServicesApi, dt as AdminSettingsApi, ct as AdminSyncPlayApi, Ye as AdminUsersApi, Qe as AdminWebhooksApi, qt as AmbientCanvas, te as ApiClient, ie as ApiError, e as AppBackdrop, gr as AppLayout, C as Badge, x as Button, On as CAPTION_BACKGROUND_OPTIONS, Cn as CAPTION_COLOR_OPTIONS, En as CAPTION_EDGE_OPTIONS, bn as CAPTION_SIZE_OPTIONS, mn as CAPTION_SIZE_SCALE, pi as CURRENT_SERVER_ID_KEY, mi as CURRENT_SERVER_NAME_KEY, bt as CaptionOverlay, xt as CaptionsMenu, Te as Chip, De as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, tn as DIRECT_PLAY_EXTENSIONS, E as EmptyState, eo as FederationPage, Ae as FilterBar, n as Icon, r as IconButton, fe as Kbd, lt as LIBRARY_TYPES, Ta as LibraryScanPage, y as LocalStorageTokenStore, An as LoginForm, uo as ManageSharesPage, Ne as MediaCard, Ue as MediaDetail, ke as MediaGrid, He as MediaHomeRow, Le as MediaRow, Fe as MetadataMatchModal, Pr as MiniPlayer, je as Modal, Va as MyServersPage, g as NetworkError, Mt as PLAYER_SHORTCUTS, pt as PLUGIN_SECRET_MASK, pa as PageTransition, oi as PhlixApp, sn as Player, jt as QualityMenu, qe as RATING_LABELS, Je as RATING_OPTIONS, ce as RESUME_MAX_RATIO, oe as RESUME_MIN_SECONDS, Jt as ResumePrompt, fa as Reveal, me as SORT_TITLE_ARTICLES, Xe as SUBSCRIBABLE_EVENTS, Bt as Scrubber, Ee as Select, Mn as SettingsForm, or as Sheet, Xt as ShortcutsHelp, jn as SignupForm, T as Skeleton, en as SkipButton, Ce as Slider, Zt as SpeedMenu, Me as Spinner, we as Switch, re as TMDB_UNCONFIGURED_CODE, on as TRANSCODE_EXTENSIONS, Ie as Tabs, _ as TimeoutError, da as ToastHost, ra as Tooltip, Yt as TranscodeNotice, an as TranscodePreparing, Wt as UPNEXT_COUNTDOWN_SECONDS, Qt as UPNEXT_RING_CIRCUMFERENCE, cn as UPNEXT_RING_RADIUS, Ht as UpNext, _t as VolumeControl, Ze as WEBHOOK_EVENT_CATEGORIES, wn as activeAudioIndex, qi as adminMenu, Ut as ambientGradient, Dn as applyAudioTrack, Gr as applyStoredThemeEarly, hn as applyTrackModes, rn as attachHls, dn as averageRegion, _o as bestCandidate, fo as bindMediaStoreToRouter, Wi as buildAdminRoutes, Ki as buildHubAdminRoutes, ze as buildMediaQuery, Re as buildMediaUrl, Gi as buildServerAdminRoutes, xn as captionStyleVars, kn as cleanCueText, zi as commonAdminPages, pe as compareByStrippedTitle, ta as createPhlixApp, f as createTranslator, Hr as deriveAccentVars, gn as edgeShadow, b as errMessage, Gt as extensionOf, he as fetchLibraries, di as focusable, X as focusableRegistry, Se as formatPageTitle, zt as formatTime, ue as fuzzyScore, m as getDefaultApiHeaders, St as handleShortcut, _n as hasActiveCaptions, c as hasStoredPreferences, Vi as hubAdminPages, fi as installFocusable, Pt as isBatterySaving, pn as isFailedStatus, Kt as isFatalMediaError, Et as isNativeHlsSupported, ee as isOffline, vt as isPlayable, ne as isTmdbUnconfigured, Tt as isTypingTarget, Tn as listAudioTracks, Sn as listSubtitleTracks, de as matchCommand, u as mergeMessages, nn as needsTranscode, Lt as parseSubtitleTracks, wt as parseTranscodeStart, It as parseTranscodeStatus, mt as pluginErrorCode, ft as pluginValidationErrors, yn as readActiveCueLines, o as readStoredPreferences, po as rectCenter, Rt as resolveStreamUrl, vn as resolveTextTrack, yt as rgbString, un as rgbaString, $t as ringDashoffset, Ft as sampleAmbient, Bi as serverAdminPages, be as setAppName, h as setDefaultApiHeaders, xe as setPageTitle, _e as sortLibraries, ge as stripLeadingArticle, Ct as transcodeStartPath, Dt as transcodeStatusPath, Ve as useApiBase, S as useAuthStore, qr as useCommandPaletteHotkey, le as useCommandStore, i as useFocusTrap, Nt as useHlsTranscode, Ot as useKeyboardShortcuts, ve as useLibrariesStore, Be as useMediaApiBase, Oe as useMediaStore, p as useMessages, Co as useOnline, ye as usePageTitle, ae as usePlayerStore, Zr as usePreconnect, a as usePreferencesStore, Pe as usePrefetch, ni as useResumeReporter, Qr as useResumeSync, _i as useServerStore, So as useSpatialNav, Kr as useTheme, w as useToastStore };

//# sourceMappingURL=phlix-ui.js.map