import { r as e } from "./AuthField-x4OifyCO.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-DCJifN0R.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BFaMKqH5.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-M0VE53Rh.js";
import { a as x, i as re, n as ie, r as ae, t as oe } from "./media-query-DowsWq-z.js";
import { i as S, n as se, r as ce, t as le } from "./Kbd-CSMm1T0l.js";
import { t as C } from "./Badge-ArWL5-WE.js";
import { t as ue } from "./Slider-BMn_Lp_q.js";
import { t as de } from "./Switch-CFZhdkXR.js";
import { i as fe, n as pe, r as me, t as he } from "./MediaRow-yOkKwyWU.js";
import { t as ge } from "./Select-MLr8Xr5n.js";
import { a as _e, i as ve, n as ye, r as be, t as xe } from "./FilterBar-CRUUdOQH.js";
import { t as Se } from "./Modal-Slll0YtS.js";
import { t as w } from "./useToastStore-BDoKlU6N.js";
import { n as T, t as E } from "./EmptyState-Ds4WcVdG.js";
import { t as Ce } from "./Tabs-x8dUKZN5.js";
import { t as we } from "./MediaDetail-DUVRaFIt.js";
import { n as Te, t as Ee } from "./logs-DadTfaTq.js";
import { t as De } from "./dashboard-BTCOCTHQ.js";
import { n as Oe, r as ke, t as Ae } from "./users-C40iLgkq.js";
import { n as je, r as Me, t as Ne } from "./webhooks-BBTLnFKm.js";
import { t as Pe } from "./services-Czm8hsvH.js";
import { t as Fe } from "./integrations-DLAG9ISY.js";
import { t as Ie } from "./backup-IdY_vzc2.js";
import { t as Le } from "./cast-BvFcBEB6.js";
import { t as Re } from "./dlnaServer-B5Sg4MkS.js";
import { t as ze } from "./remoteAccess-DVKRpKQ8.js";
import { t as Be } from "./liveTv-Dbjt901v.js";
import { t as Ve } from "./collections-CH3HLdcd.js";
import { t as He } from "./history-ByCY8OYj.js";
import { t as Ue } from "./syncPlay-DPzJkgkK.js";
import { n as We, t as Ge } from "./libraries-CXAz_kXs.js";
import { t as Ke } from "./settings-m4upFcmH.js";
import { n as qe, t as Je } from "./admin-BYrrUKO2.js";
import { A as Ye, C as Xe, D as Ze, E as Qe, F as $e, I as et, L as tt, M as nt, N as rt, O as it, P as at, S as ot, T as st, _ as ct, a as lt, b as ut, c as dt, d as ft, f as pt, g as mt, h as ht, i as gt, j as _t, k as vt, l as yt, m as bt, n as xt, o as St, p as Ct, r as wt, s as Tt, t as Et, u as Dt, v as Ot, w as kt, x as At, y as jt } from "./Player-e7FOPDJp.js";
import { a as Mt, c as Nt, d as Pt, f as Ft, g as It, h as Lt, i as Rt, l as zt, m as Bt, n as Vt, o as Ht, p as Ut, r as Wt, s as Gt, t as Kt, u as qt } from "./captions-COgPp5bH.js";
import { t as Jt } from "./LoginForm-BU3enOMf.js";
import { t as Yt } from "./SignupForm-BSwgCg0o.js";
import { t as Xt } from "./SettingsForm-Cb_8EPxC.js";
import { Fragment as D, Teleport as Zt, Transition as O, TransitionGroup as Qt, computed as k, createApp as $t, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as en, defineComponent as I, inject as tn, normalizeClass as L, normalizeStyle as R, onBeforeUnmount as z, onMounted as B, onScopeDispose as V, openBlock as H, readonly as nn, ref as U, renderList as W, renderSlot as G, resolveDynamicComponent as rn, toDisplayString as K, unref as q, useId as an, vModelText as on, watch as J, watchEffect as sn, withCtx as Y, withDirectives as cn, withKeys as ln, withModifiers as un } from "vue";
import { createPinia as dn } from "pinia";
import { RouterLink as X, RouterView as fn, createRouter as pn, createWebHistory as mn, useRouter as hn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var gn = ["aria-labelledby"], _n = {
	key: 0,
	class: "phlix-sheet__header"
}, vn = ["id"], yn = { class: "phlix-sheet__body" }, bn = {
	key: 1,
	class: "phlix-sheet__footer"
}, xn = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let n = e, a = t, o = U(n.modelValue);
		J(() => n.modelValue, (e) => o.value = e);
		let s = U(null), c = an();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (H(), A(Zt, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: Y(() => [e.modelValue ? (H(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: un(u, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? q(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (H(), M("header", _n, [e.title ? (H(), M("h2", {
					key: 0,
					id: q(c),
					class: "phlix-sheet__title"
				}, K(e.title), 9, vn)) : j("", !0), e.hideClose ? j("", !0) : (H(), A(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : j("", !0),
				N("div", yn, [G(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (H(), M("footer", bn, [G(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, gn)], 34)) : j("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), Sn = { class: "shell" }, Cn = {
	class: "shell__skip",
	href: "#main"
}, wn = { class: "shell__bar" }, Tn = { class: "shell__inner" }, En = { class: "shell__brand" }, Dn = ["aria-label"], On = { class: "shell__actions" }, kn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, An = {
	key: 0,
	class: "shell__footer"
}, jn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = U(!1), { t: o } = p();
		return (t, a) => (H(), M("div", Sn, [
			N("a", Cn, K(q(o)("shell.skipToContent")), 1),
			F(e, { enabled: q(n).atmosphere }, null, 8, ["enabled"]),
			N("header", wn, [N("div", Tn, [
				N("div", En, [G(t.$slots, "logo", {}, () => [a[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", {
					class: "shell__nav",
					"aria-label": q(o)("shell.primaryNav")
				}, [G(t.$slots, "nav", {}, void 0, !0)], 8, Dn),
				a[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", On, [G(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (H(), A(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: q(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : j("", !0)
			])]),
			N("main", kn, [G(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (H(), M("footer", An, [G(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(xn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: q(o)("shell.menu")
			}, {
				default: Y(() => [N("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [G(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-db48fc6e"]]), Mn = /* @__PURE__ */ I({
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
		return (e, t) => (H(), A(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), Nn = ["aria-label", "aria-expanded"], Pn = {
	key: 0,
	class: "usermenu__avatar"
}, Fn = ["aria-label"], In = { class: "usermenu__head" }, Ln = { class: "usermenu__avatar usermenu__avatar--lg" }, Rn = { class: "usermenu__name" }, zn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = hn(), a = tn("phlixConfig", null), o = k(() => a?.routerBase ?? "/app"), { t: s } = p(), c = U(!1), l = U(null), u = U(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = k(() => d.value.charAt(0).toUpperCase() || "A");
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
		return J(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
		}), z(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (H(), M("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [N("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": q(t).isLoggedIn ? q(s)("shell.accountNamed", { name: d.value }) : q(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [q(t).isLoggedIn ? (H(), M("span", Pn, K(f.value), 1)) : (H(), A(n, {
			key: 1,
			name: "user"
		}))], 8, Nn), c.value ? (H(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": q(s)("shell.account"),
			tabindex: "-1"
		}, [q(t).isLoggedIn ? (H(), M(D, { key: 0 }, [
			N("div", In, [N("span", Ln, K(f.value), 1), N("span", Rn, K(d.value), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [F(n, { name: "settings" }), P(" " + K(q(s)("shell.settings")), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [F(n, { name: "log-out" }), P(" " + K(q(s)("shell.signOut")), 1)])
		], 64)) : (H(), M("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [F(n, { name: "user" }), P(" " + K(q(s)("shell.signIn")), 1)]))], 8, Fn)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Bn = ["aria-label"], Vn = ["src", "poster"], Hn = { class: "mini__body" }, Un = { class: "mini__title" }, Wn = { class: "mini__controls" }, Gn = ["aria-label"], Kn = ["aria-label"], qn = ["aria-label"], Jn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Yn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = U(null), s = k(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = k(() => i.current?.name ?? ""), l = k(() => Math.max(0, Math.min(1, i.progress)));
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
		return J(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), z(() => {
			o.value?.pause?.();
		}), (e, t) => (H(), A(O, { name: "mini" }, {
			default: Y(() => [s.value ? (H(), M("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": q(a)("player.miniPlayer")
			}, [
				N("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: q(i).streamUrl,
					poster: q(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: u,
					onPlay: d,
					onPause: f,
					onTimeupdate: m,
					onClick: g
				}, null, 40, Vn),
				N("div", Hn, [N("p", Un, K(c.value), 1), N("div", Wn, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(i).playing ? q(a)("player.pause") : q(a)("player.play"),
						onClick: h
					}, [F(n, { name: q(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Gn),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(a)("player.expand"),
						onClick: g
					}, [F(n, { name: "expand" })], 8, Kn),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": q(a)("player.closePlayer"),
						onClick: _
					}, [F(n, { name: "x" })], 8, qn)
				])]),
				N("div", Jn, [N("div", {
					class: "mini__progress-fill",
					style: R({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Bn)) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function Xn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Z = (e) => Math.max(0, Math.min(255, Math.round(e))), Q = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Z(e).toString(16).padStart(2, "0")).join("");
function Zn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Qn(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var $n = ({ r: e, g: t, b: n }, r) => `rgba(${Z(e)}, ${Z(t)}, ${Z(n)}, ${r})`;
function er({ r: e, g: t, b: n }) {
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
function tr(e) {
	let t = Xn(e);
	if (!t) return null;
	let n = er(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Q(t),
		"--accent-hover": Q(Zn(t, .12)),
		"--accent-active": Q(Qn(t, .12)),
		"--accent-soft": $n(t, .14),
		"--accent-ring": $n(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var nr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function rr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? tr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of nr) n.style.removeProperty(e);
}
function ir(e) {
	let t = o();
	e && !c() && (t.theme = e), rr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function ar() {
	let e = a();
	return sn(() => {
		rr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function or() {
	let e = S(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), V(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function $(e, t) {
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
function sr(e) {
	let t = $(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = $(n, t);
	return !r || t && r === t ? null : r;
}
function cr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if ($(e.href) === t) return !0;
	return !1;
}
function lr(e, t, n, r) {
	if (cr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function ur(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = $(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = $(e);
		r && (n && r === n || a.has(r) || (a.add(r), lr("preconnect", r, t.crossOrigin === !0, i), lr("dns-prefetch", r, !1, i)));
	}
	i.length && V(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var dr = ["src", "alt"], fr = { class: "brand-wordmark" }, pr = {
	key: 1,
	class: "brand-tagline"
}, mr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		ar();
		let t = S(), i = hn(), { t: a } = p();
		or();
		let o = en(() => import("./CommandPalette-DP17Gxqx.js")), s = U(!1);
		J(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${h.value}/player/${e}`);
		}
		let l = tn("phlixConfig", null);
		ur(sr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), d = k(() => l?.branding ?? {}), f = k(() => d.value.wordmark ?? "Phlix"), m = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), h = k(() => l?.routerBase ?? "/app");
		function g(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (H(), A(jn, null, {
			logo: Y(() => [F(q(X), {
				to: h.value,
				class: "brand"
			}, {
				default: Y(() => [
					d.value.logoSrc ? (H(), M("img", {
						key: 0,
						src: d.value.logoSrc,
						alt: d.value.logoAlt ?? f.value,
						class: "brand-logo"
					}, null, 8, dr)) : j("", !0),
					N("span", fr, [P(K(f.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					d.value.tagline ? (H(), M("span", pr, K(d.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Y(() => [m.value.length ? (H(!0), M(D, { key: 0 }, W(m.value, (e) => (H(), A(rn(e.href ? "a" : q(X)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? g(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Y(() => [e.icon ? (H(), A(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : j("", !0), P(" " + K(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (H(), M(D, { key: 1 }, [F(q(X), {
				to: h.value,
				class: "nav-link"
			}, {
				default: Y(() => [P(K(q(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), F(q(X), {
				to: `${h.value}/settings`,
				class: "nav-link"
			}, {
				default: Y(() => [P(K(q(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: Y(() => [
				F(r, {
					name: "search",
					label: q(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => q(t).openPalette()
				}, null, 8, ["label"]),
				F(Mn),
				F(zn)
			]),
			default: Y(() => [
				F(q(fn)),
				s.value ? (H(), A(q(o), { key: 0 })) : j("", !0),
				F(Yn, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1986daec"]]), hr = { class: "phlix-placeholder" }, gr = { class: "placeholder-content" }, _r = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (H(), M("div", hr, [N("div", gr, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + K(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function vr() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function yr(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-Pw_IvciB.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-Pg3yv7fB.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-B0T92nhM.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			component: () => import("./LoginPage-B4Ok8xsg.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: () => import("./SignupPage-Dl0lnFFD.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: () => import("./SettingsPage-DKiuW8nY.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: _r,
		props: { appName: e.app }
	}), n;
}
function br(e) {
	let t = {
		...vr(),
		...e
	};
	ir(t.defaultTheme);
	let n = dn();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = pn({
		history: mn(t.routerBase || "/app"),
		routes: yr(t)
	}), i = $t(mr);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var xr = ["id"], Sr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = an(), r = U(!1), i = U(null), a;
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
		return z(() => clearTimeout(a)), (t, a) => (H(), M("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: ln(c, ["esc"])
		}, [G(t.$slots, "default", {}, void 0, !0), F(O, { name: "phlix-tooltip" }, {
			default: Y(() => [r.value && (e.text || t.$slots.content) ? (H(), M("span", {
				key: 0,
				id: q(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [G(t.$slots, "content", {}, () => [P(K(e.text), 1)], !0)], 10, xr)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Cr = ["aria-label"], wr = ["role"], Tr = { class: "phlix-toast__content" }, Er = {
	key: 0,
	class: "phlix-toast__title"
}, Dr = { class: "phlix-toast__message" }, Or = ["onClick"], kr = 0, Ar = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		return B(() => {
			kr++;
		}), z(() => {
			kr--;
		}), (a, s) => (H(), A(Zt, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": q(t)("common.notifications")
		}, [F(Qt, { name: "phlix-toast" }, {
			default: Y(() => [(H(!0), M(D, null, W(q(i).toasts, (e) => (H(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", Tr, [e.title ? (H(), M("p", Er, K(e.title), 1)) : j("", !0), N("p", Dr, K(e.message), 1)]),
				e.action ? (H(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), q(i).dismiss(e.id);
					}
				}, K(e.action.label), 9, Or)) : j("", !0),
				F(r, {
					name: "x",
					label: q(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => q(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, wr))), 128))]),
			_: 1
		})], 10, Cr)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), jr = ["aria-label"], Mr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: r } = p(), i = k(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, a) => (H(), M("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? q(r)("common.loading"),
			style: R(i.value ? { fontSize: i.value } : void 0)
		}, [F(n, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, jr));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), Nr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = U(null), r = U(!1), i = U(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
		}), (t, a) => (H(), A(rn(e.tag), {
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
			default: Y(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Pr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (H(), A(O, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: Y(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Fr = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Ir = {
	key: 0,
	class: "library-scan__skel"
}, Lr = {
	key: 3,
	class: "library-scan__table-wrap"
}, Rr = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, zr = { class: "library-scan__name" }, Br = {
	key: 0,
	class: "library-scan__paths"
}, Vr = { class: "library-scan__num" }, Hr = { class: "library-scan__date" }, Ur = ["data-testid"], Wr = {
	key: 0,
	class: "library-scan__error"
}, Gr = { class: "library-scan__actions" }, Kr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U({}), a = U(!0), o = U(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				r.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of r.value) c(e.id);
			} catch (e) {
				o.value = h(e, "Failed to load libraries."), n.error(o.value);
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
				n.error(h(e, "Failed to trigger scan."));
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), n.success("Rescan queued."), await c(e);
			} catch (e) {
				n.error(h(e, "Failed to trigger rescan."));
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
		return B(s), (e, t) => (H(), M("section", Fr, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (H(), M("div", Ir, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: Y(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: Y(() => [...t[0] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (H(), M("div", Lr, [N("table", Rr, [t[3] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Type"),
			N("th", { scope: "col" }, "Items"),
			N("th", { scope: "col" }, "Last scan"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
			N("td", null, [N("div", zr, K(e.name), 1), e.paths.length ? (H(), M("div", Br, K(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, K(e.type), 1),
			N("td", Vr, K(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", Hr, K(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: m(i.value[e.id]) }, {
				default: Y(() => [P(K(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (H(), M("span", Wr, K(i.value[e.id]?.error), 1)) : j("", !0)], 8, Ur)]),
			N("td", null, [N("div", Gr, [F(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: Y(() => [...t[1] ||= [P(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
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
}), [["__scopeId", "data-v-3235ff5e"]]), qr = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Jr = { class: "my-servers__head" }, Yr = {
	key: 0,
	class: "my-servers__skel"
}, Xr = {
	key: 3,
	class: "my-servers__table-wrap"
}, Zr = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Qr = { class: "my-servers__name" }, $r = { class: "my-servers__url" }, ei = { class: "my-servers__num" }, ti = { class: "my-servers__date" }, ni = ["data-testid"], ri = { class: "my-servers__actions" }, ii = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U(!0), a = U(null);
		async function o() {
			i.value = !0, a.value = null;
			try {
				r.value = (await t.get("/api/v1/servers")).servers || [];
			} catch (e) {
				a.value = h(e, "Failed to load servers."), n.error(a.value);
			} finally {
				i.value = !1;
			}
		}
		function s(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function c(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function l(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		return B(o), (e, t) => (H(), M("section", qr, [N("header", Jr, [t[1] ||= N("div", null, [N("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: Y(() => [...t[0] ||= [P("Add server", -1)]]),
			_: 1
		})]), i.value ? (H(), M("div", Yr, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: a.value
		}, {
			actions: Y(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: o
			}, {
				default: Y(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: Y(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: Y(() => [...t[3] ||= [P("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (H(), M("div", Xr, [N("table", Zr, [t[5] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Server"),
			N("th", { scope: "col" }, "Owner"),
			N("th", { scope: "col" }, "Libraries"),
			N("th", { scope: "col" }, "Last seen"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
			N("td", null, [N("div", Qr, K(e.name), 1), N("div", $r, K(e.url), 1)]),
			N("td", null, K(e.owner), 1),
			N("td", ei, K(e.library_count === void 0 ? "—" : e.library_count), 1),
			N("td", ti, K(s(e.last_seen)), 1),
			N("td", null, [N("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: l(e.status) }, {
				default: Y(() => [P(K(c(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, ni)]),
			N("td", null, [N("div", ri, [F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: Y(() => [...t[4] ||= [P("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8bce09a9"]]), ai = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, oi = {
	key: 0,
	class: "federation__skel"
}, si = {
	key: 2,
	class: "federation__content"
}, ci = {
	key: 1,
	class: "federation__table-wrap"
}, li = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, ui = { class: "federation__name" }, di = { class: "federation__url" }, fi = { class: "federation__num" }, pi = { class: "federation__date" }, mi = ["data-testid"], hi = { class: "federation__actions" }, gi = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, _i = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U(!0), a = U(null), o = U(""), s = U(!1);
		async function c(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = (await t.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				a.value = h(e, "Failed to load federation peers."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function l() {
			let e = o.value.trim();
			if (e) {
				s.value = !0;
				try {
					await t.post("/api/v1/federation/connect", { url: e }), n.success("Peer connection requested."), o.value = "", await c();
				} catch (e) {
					n.error(h(e, "Failed to connect to peer."));
				} finally {
					s.value = !1;
				}
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/federation/peers/${e}/disconnect`), n.success("Peer disconnected."), await c();
			} catch (e) {
				n.error(h(e, "Failed to disconnect peer."));
			}
		}
		function d(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function f(e) {
			switch (e) {
				case "connected": return "Connected";
				case "disconnected": return "Disconnected";
				case "pending": return "Pending";
				default: return e;
			}
		}
		function p(e) {
			switch (e) {
				case "connected": return "success";
				case "disconnected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		return B(() => c(!0)), (e, t) => (H(), M("section", ai, [t[8] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (H(), M("div", oi, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: Y(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(!0)
			}, {
				default: Y(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (H(), M("div", si, [
			t[7] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (H(), A(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (H(), M("div", ci, [N("table", li, [t[4] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
				N("td", null, [N("div", ui, K(e.name), 1), N("div", di, K(e.url), 1)]),
				N("td", fi, K(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", pi, K(d(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: p(e.status) }, {
					default: Y(() => [P(K(f(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, mi)]),
				N("td", null, [N("div", hi, [e.status === "connected" ? (H(), A(y, {
					key: 0,
					variant: "ghost",
					size: "sm",
					"aria-label": `Disconnect ${e.name}`,
					onClick: (t) => u(e.id)
				}, {
					default: Y(() => [...t[3] ||= [P(" Disconnect ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : j("", !0)])])
			]))), 128))])])])),
			N("section", gi, [t[6] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: un(l, ["prevent"])
			}, [cn(N("input", {
				"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
				type: "url",
				class: "federation__input",
				placeholder: "https://other-server.example.com",
				"aria-label": "Peer server URL",
				autocomplete: "off"
			}, null, 512), [[on, o.value]]), F(y, {
				type: "submit",
				variant: "solid",
				"left-icon": "plus",
				loading: s.value,
				disabled: !o.value.trim()
			}, {
				default: Y(() => [...t[5] ||= [P(" Connect ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-0640a657"]]), vi = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, yi = {
	key: 0,
	class: "shares__skel"
}, bi = {
	key: 3,
	class: "shares__table-wrap"
}, xi = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Si = { class: "shares__library" }, Ci = { class: "shares__date" }, wi = { class: "shares__date" }, Ti = ["data-testid"], Ei = { class: "shares__actions" }, Di = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U(!0), a = U(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = (await t.get("/api/v1/shares")).shares || [];
			} catch (e) {
				a.value = h(e, "Failed to load shares."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function s(e) {
			try {
				await t.delete(`/api/v1/shares/${e}`), n.success("Share revoked."), await o();
			} catch (e) {
				n.error(h(e, "Failed to revoke share."));
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
		return B(() => o(!0)), (e, t) => (H(), M("section", vi, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (H(), M("div", yi, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: Y(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: Y(() => [...t[1] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (H(), M("div", bi, [N("table", xi, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Shared with"),
			N("th", { scope: "col" }, "Permissions"),
			N("th", { scope: "col" }, "Created"),
			N("th", { scope: "col" }, "Expires"),
			N("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
			N("td", null, [N("span", Si, K(e.library_name), 1)]),
			N("td", null, K(e.shared_with), 1),
			N("td", null, [F(C, { tone: u(e.permissions) }, {
				default: Y(() => [P(K(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", Ci, K(c(e.created_at)), 1),
			N("td", wi, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(K(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (H(), A(C, {
				key: 0,
				tone: "error"
			}, {
				default: Y(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, Ti)]),
			N("td", null, [N("div", Ei, [F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: Y(() => [...t[3] ||= [P(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8731f31d"]]), Oi = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, ki = {
	key: 0,
	class: "audit__skel"
}, Ai = {
	key: 3,
	class: "audit__content"
}, ji = { class: "audit__table-wrap" }, Mi = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, Ni = ["data-testid"], Pi = { class: "audit__details" }, Fi = { class: "audit__ip" }, Ii = { class: "audit__date" }, Li = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, Ri = {
	class: "audit__page-info",
	"aria-live": "polite"
}, zi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U(!0), a = U(null), o = U(1), s = U(1);
		async function c(e = 1) {
			i.value = !0, a.value = null;
			try {
				let n = await t.get("/api/v1/audit-logs", { page: String(e) });
				r.value = n.logs || [], o.value = n.page || 1, s.value = n.total_pages || 1;
			} catch (e) {
				a.value = h(e, "Failed to load audit logs."), n.error(a.value);
			} finally {
				i.value = !1;
			}
		}
		function l(e) {
			return new Date(e).toLocaleString();
		}
		function u(e) {
			return e.includes("create") || e.includes("add") ? "success" : e.includes("delete") || e.includes("remove") ? "error" : e.includes("update") || e.includes("edit") ? "info" : e.includes("login") || e.includes("auth") ? "accent" : "neutral";
		}
		return B(() => c()), (e, t) => (H(), M("section", Oi, [t[7] ||= N("header", { class: "audit__head" }, [N("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), N("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), i.value ? (H(), M("div", ki, [F(T, {
			variant: "text",
			lines: 8
		})])) : a.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: a.value
		}, {
			actions: Y(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(o.value)
			}, {
				default: Y(() => [...t[3] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (H(), M("div", Ai, [N("div", ji, [N("table", Mi, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Action"),
			N("th", { scope: "col" }, "Actor"),
			N("th", { scope: "col" }, "Target"),
			N("th", { scope: "col" }, "Details"),
			N("th", { scope: "col" }, "IP"),
			N("th", { scope: "col" }, "Time")
		])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
			N("td", null, [N("span", { "data-testid": `action-${e.id}` }, [F(C, { tone: u(e.action) }, {
				default: Y(() => [P(K(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Ni)]),
			N("td", null, K(e.actor), 1),
			N("td", null, K(e.target || "—"), 1),
			N("td", Pi, K(e.details || "—"), 1),
			N("td", Fi, K(e.ip_address || "—"), 1),
			N("td", Ii, K(l(e.created_at)), 1)
		]))), 128))])])]), s.value > 1 ? (H(), M("nav", Li, [
			F(y, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: o.value <= 1,
				onClick: t[1] ||= (e) => c(o.value - 1)
			}, {
				default: Y(() => [...t[5] ||= [P(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			N("span", Ri, "Page " + K(o.value) + " of " + K(s.value), 1),
			F(y, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: o.value >= s.value,
				onClick: t[2] ||= (e) => c(o.value + 1)
			}, {
				default: Y(() => [...t[6] ||= [P(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : j("", !0)]))]));
	}
}), [["__scopeId", "data-v-26a60fa5"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Bi(e, t) {
	let n = ye(), r = !1;
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
function Vi() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = U(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), V(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), nn(t);
}
//#endregion
export { Ee as ALL_LOGS, ht as AMBIENT_SAMPLE_H, mt as AMBIENT_SAMPLE_INTERVAL_MS, ct as AMBIENT_SAMPLE_W, Ye as ARROW_ICONS, _t as ARROW_LABELS, Ie as AdminBackupApi, Le as AdminCastApi, Ve as AdminCollectionsApi, De as AdminDashboardApi, Re as AdminDlnaServerApi, He as AdminHistoryApi, Fe as AdminIntegrationsApi, Ge as AdminLibrariesApi, Be as AdminLiveTvApi, Te as AdminLogsApi, ze as AdminRemoteAccessApi, Pe as AdminServicesApi, Ke as AdminSettingsApi, Ue as AdminSyncPlayApi, Ae as AdminUsersApi, Ne as AdminWebhooksApi, bt as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, jn as AppLayout, zi as AuditLogsPage, C as Badge, y as Button, Kt as CAPTION_BACKGROUND_OPTIONS, Vt as CAPTION_COLOR_OPTIONS, Wt as CAPTION_EDGE_OPTIONS, Rt as CAPTION_SIZE_OPTIONS, Mt as CAPTION_SIZE_SCALE, st as CaptionOverlay, kt as CaptionsMenu, fe as Chip, _e as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, gt as DIRECT_PLAY_EXTENSIONS, E as EmptyState, _i as FederationPage, xe as FilterBar, n as Icon, r as IconButton, le as Kbd, We as LIBRARY_TYPES, Kr as LibraryScanPage, ne as LocalStorageTokenStore, Jt as LoginForm, Di as ManageSharesPage, pe as MediaCard, we as MediaDetail, ve as MediaGrid, be as MediaHomeRow, he as MediaRow, Yn as MiniPlayer, Se as Modal, ii as MyServersPage, ee as NetworkError, nt as PLAYER_SHORTCUTS, Pr as PageTransition, mr as PhlixApp, Et as Player, Qe as QualityMenu, Oe as RATING_LABELS, ke as RATING_OPTIONS, ae as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, Ct as ResumePrompt, Nr as Reveal, je as SUBSCRIBABLE_EVENTS, et as Scrubber, ge as Select, Xt as SettingsForm, xn as Sheet, vt as ShortcutsHelp, Yt as SignupForm, T as Skeleton, ue as Slider, Ze as SpeedMenu, Mr as Spinner, de as Switch, lt as TRANSCODE_EXTENSIONS, Ce as Tabs, te as TimeoutError, Ar as ToastHost, Sr as Tooltip, xt as TranscodeNotice, St as UPNEXT_COUNTDOWN_SECONDS, Tt as UPNEXT_RING_CIRCUMFERENCE, dt as UPNEXT_RING_RADIUS, wt as UpNext, it as VolumeControl, Me as WEBHOOK_EVENT_CATEGORIES, Ht as activeAudioIndex, Je as adminMenu, Ot as ambientGradient, Gt as applyAudioTrack, ir as applyStoredThemeEarly, Nt as applyTrackModes, jt as averageRegion, Bi as bindMediaStoreToRouter, qe as buildAdminRoutes, oe as buildMediaQuery, ie as buildMediaUrl, zt as captionStyleVars, qt as cleanCueText, br as createPhlixApp, f as createTranslator, tr as deriveAccentVars, Pt as edgeShadow, h as errMessage, yt as extensionOf, tt as formatTime, se as fuzzyScore, rt as handleShortcut, Ft as hasActiveCaptions, c as hasStoredPreferences, ut as isBatterySaving, Dt as isFatalMediaError, g as isOffline, at as isTypingTarget, Ut as listAudioTracks, Bt as listSubtitleTracks, ce as matchCommand, u as mergeMessages, ft as needsTranscode, Lt as readActiveCueLines, o as readStoredPreferences, It as resolveTextTrack, At as rgbString, ot as rgbaString, pt as ringDashoffset, Xe as sampleAmbient, b as useAuthStore, or as useCommandPaletteHotkey, S as useCommandStore, i as useFocusTrap, $e as useKeyboardShortcuts, ye as useMediaStore, p as useMessages, Vi as useOnline, x as usePlayerStore, ur as usePreconnect, a as usePreferencesStore, me as usePrefetch, ar as useTheme, w as useToastStore };

//# sourceMappingURL=phlix-ui.js.map