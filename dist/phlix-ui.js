import { r as e } from "./AuthField-x4OifyCO.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-DCJifN0R.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BFaMKqH5.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as re } from "./useAuthStore-M0VE53Rh.js";
import { a as b, i as ie, n as ae, r as oe, t as se } from "./media-query-DowsWq-z.js";
import { i as x, n as ce, r as le, t as ue } from "./Kbd-CSMm1T0l.js";
import { t as S } from "./Badge-ArWL5-WE.js";
import { t as de } from "./Slider-BMn_Lp_q.js";
import { t as fe } from "./Switch-CFZhdkXR.js";
import { i as pe, n as me, r as he, t as ge } from "./MediaRow-yOkKwyWU.js";
import { t as _e } from "./Select-MLr8Xr5n.js";
import { a as ve, i as ye, n as be, r as xe, t as Se } from "./FilterBar-CRUUdOQH.js";
import { t as Ce } from "./Modal-Slll0YtS.js";
import { t as C } from "./useToastStore-BDoKlU6N.js";
import { n as w, t as T } from "./EmptyState-Ds4WcVdG.js";
import { t as we } from "./Tabs-x8dUKZN5.js";
import { t as Te } from "./MediaDetail-DUVRaFIt.js";
import { n as Ee, t as De } from "./logs-DadTfaTq.js";
import { t as Oe } from "./dashboard-BTCOCTHQ.js";
import { n as ke, r as Ae, t as je } from "./users-C40iLgkq.js";
import { n as Me, r as Ne, t as Pe } from "./webhooks-BBTLnFKm.js";
import { t as Fe } from "./services-Czm8hsvH.js";
import { t as Ie } from "./integrations-DLAG9ISY.js";
import { t as Le } from "./backup-IdY_vzc2.js";
import { t as Re } from "./cast-BvFcBEB6.js";
import { t as ze } from "./dlnaServer-B5Sg4MkS.js";
import { t as Be } from "./remoteAccess-DVKRpKQ8.js";
import { t as Ve } from "./liveTv-Dbjt901v.js";
import { t as He } from "./collections-CH3HLdcd.js";
import { t as Ue } from "./history-ByCY8OYj.js";
import { t as We } from "./syncPlay-DPzJkgkK.js";
import { n as Ge, t as Ke } from "./libraries-CXAz_kXs.js";
import { t as qe } from "./settings-m4upFcmH.js";
import { A as Je, C as Ye, D as Xe, E as Ze, F as Qe, I as $e, L as et, M as tt, N as nt, O as rt, P as it, S as at, T as ot, _ as st, a as ct, b as lt, c as ut, d as dt, f as ft, g as pt, h as mt, i as ht, j as gt, k as _t, l as vt, m as yt, n as bt, o as xt, p as St, r as Ct, s as wt, t as Tt, u as Et, v as Dt, w as Ot, x as kt, y as At } from "./Player-e7FOPDJp.js";
import { a as jt, c as Mt, d as Nt, f as Pt, g as Ft, h as It, i as Lt, l as Rt, m as zt, n as Bt, o as Vt, p as Ht, r as Ut, s as Wt, t as Gt, u as Kt } from "./captions-COgPp5bH.js";
import { t as qt } from "./LoginForm-BU3enOMf.js";
import { t as Jt } from "./SignupForm-BSwgCg0o.js";
import { t as Yt } from "./SettingsForm-Cb_8EPxC.js";
import { Fragment as E, Teleport as Xt, Transition as D, TransitionGroup as Zt, computed as O, createApp as Qt, createBlock as k, createCommentVNode as A, createElementBlock as j, createElementVNode as M, createTextVNode as N, createVNode as P, defineAsyncComponent as $t, defineComponent as F, inject as en, normalizeClass as I, normalizeStyle as L, onBeforeUnmount as R, onMounted as z, onScopeDispose as B, openBlock as V, readonly as tn, ref as H, renderList as U, renderSlot as W, resolveDynamicComponent as nn, toDisplayString as G, unref as K, useId as q, vModelText as rn, watch as J, watchEffect as an, withCtx as Y, withDirectives as on, withKeys as sn, withModifiers as cn } from "vue";
import { createPinia as ln } from "pinia";
import { RouterLink as X, RouterView as un, createRouter as dn, createWebHistory as fn, useRouter as pn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var mn = ["aria-labelledby"], hn = {
	key: 0,
	class: "phlix-sheet__header"
}, gn = ["id"], _n = { class: "phlix-sheet__body" }, vn = {
	key: 1,
	class: "phlix-sheet__footer"
}, yn = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let n = e, a = t, o = H(n.modelValue);
		J(() => n.modelValue, (e) => o.value = e);
		let s = H(null), c = q();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (V(), k(Xt, { to: "body" }, [P(D, { name: `phlix-sheet-${e.side}` }, {
			default: Y(() => [e.modelValue ? (V(), j("div", {
				key: 0,
				class: I(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: cn(u, ["self"])
			}, [M("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? K(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (V(), j("header", hn, [e.title ? (V(), j("h2", {
					key: 0,
					id: K(c),
					class: "phlix-sheet__title"
				}, G(e.title), 9, gn)) : A("", !0), e.hideClose ? A("", !0) : (V(), k(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : A("", !0),
				M("div", _n, [W(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (V(), j("footer", vn, [W(t.$slots, "footer", {}, void 0, !0)])) : A("", !0)
			], 8, mn)], 34)) : A("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), bn = { class: "shell" }, xn = {
	class: "shell__skip",
	href: "#main"
}, Sn = { class: "shell__bar" }, Cn = { class: "shell__inner" }, wn = { class: "shell__brand" }, Tn = ["aria-label"], En = { class: "shell__actions" }, Dn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, On = {
	key: 0,
	class: "shell__footer"
}, kn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = H(!1), { t: o } = p();
		return (t, a) => (V(), j("div", bn, [
			M("a", xn, G(K(o)("shell.skipToContent")), 1),
			P(e, { enabled: K(n).atmosphere }, null, 8, ["enabled"]),
			M("header", Sn, [M("div", Cn, [
				M("div", wn, [W(t.$slots, "logo", {}, () => [a[3] ||= M("span", { class: "shell__wordmark" }, [N("Phlix"), M("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				M("nav", {
					class: "shell__nav",
					"aria-label": K(o)("shell.primaryNav")
				}, [W(t.$slots, "nav", {}, void 0, !0)], 8, Tn),
				a[4] ||= M("span", { class: "shell__spacer" }, null, -1),
				M("div", En, [W(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (V(), k(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: K(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : A("", !0)
			])]),
			M("main", Dn, [W(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (V(), j("footer", On, [W(t.$slots, "footer", {}, void 0, !0)])) : A("", !0),
			P(yn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: K(o)("shell.menu")
			}, {
				default: Y(() => [M("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [W(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-db48fc6e"]]), An = /* @__PURE__ */ F({
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
		}, c = O(() => i[(i.indexOf(t.theme) + 1) % i.length]), l = O(() => o[t.theme] ?? "moon"), u = O(() => n("shell.themeToggleLabel", {
			current: s[t.theme] ?? t.theme,
			next: s[c.value]
		}));
		function d() {
			t.theme = c.value;
		}
		return (e, t) => (V(), k(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), jn = ["aria-label", "aria-expanded"], Mn = {
	key: 0,
	class: "usermenu__avatar"
}, Nn = ["aria-label"], Pn = { class: "usermenu__head" }, Fn = { class: "usermenu__avatar usermenu__avatar--lg" }, In = { class: "usermenu__name" }, Ln = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "UserMenu",
	setup(e) {
		let t = re(), r = pn(), a = en("phlixConfig", null), o = O(() => a?.routerBase ?? "/app"), { t: s } = p(), c = H(!1), l = H(null), u = H(null), d = O(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = O(() => d.value.charAt(0).toUpperCase() || "A");
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
		}), R(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (V(), j("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [M("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": K(t).isLoggedIn ? K(s)("shell.accountNamed", { name: d.value }) : K(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [K(t).isLoggedIn ? (V(), j("span", Mn, G(f.value), 1)) : (V(), k(n, {
			key: 1,
			name: "user"
		}))], 8, jn), c.value ? (V(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": K(s)("shell.account"),
			tabindex: "-1"
		}, [K(t).isLoggedIn ? (V(), j(E, { key: 0 }, [
			M("div", Pn, [M("span", Fn, G(f.value), 1), M("span", In, G(d.value), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [P(n, { name: "settings" }), N(" " + G(K(s)("shell.settings")), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [P(n, { name: "log-out" }), N(" " + G(K(s)("shell.signOut")), 1)])
		], 64)) : (V(), j("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [P(n, { name: "user" }), N(" " + G(K(s)("shell.signIn")), 1)]))], 8, Nn)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Rn = ["aria-label"], zn = ["src", "poster"], Bn = { class: "mini__body" }, Vn = { class: "mini__title" }, Hn = { class: "mini__controls" }, Un = ["aria-label"], Wn = ["aria-label"], Gn = ["aria-label"], Kn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, qn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = b(), { t: a } = p(), o = H(null), s = O(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = O(() => i.current?.name ?? ""), l = O(() => Math.max(0, Math.min(1, i.progress)));
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
		}), R(() => {
			o.value?.pause?.();
		}), (e, t) => (V(), k(D, { name: "mini" }, {
			default: Y(() => [s.value ? (V(), j("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": K(a)("player.miniPlayer")
			}, [
				M("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: K(i).streamUrl,
					poster: K(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: u,
					onPlay: d,
					onPause: f,
					onTimeupdate: m,
					onClick: g
				}, null, 40, zn),
				M("div", Bn, [M("p", Vn, G(c.value), 1), M("div", Hn, [
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": K(i).playing ? K(a)("player.pause") : K(a)("player.play"),
						onClick: h
					}, [P(n, { name: K(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Un),
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": K(a)("player.expand"),
						onClick: g
					}, [P(n, { name: "expand" })], 8, Wn),
					M("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": K(a)("player.closePlayer"),
						onClick: _
					}, [P(n, { name: "x" })], 8, Gn)
				])]),
				M("div", Kn, [M("div", {
					class: "mini__progress-fill",
					style: L({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Rn)) : A("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function Jn(e) {
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
function Yn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Xn(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Zn = ({ r: e, g: t, b: n }, r) => `rgba(${Z(e)}, ${Z(t)}, ${Z(n)}, ${r})`;
function Qn({ r: e, g: t, b: n }) {
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
function $n(e) {
	let t = Jn(e);
	if (!t) return null;
	let n = Qn(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Q(t),
		"--accent-hover": Q(Yn(t, .12)),
		"--accent-active": Q(Xn(t, .12)),
		"--accent-soft": Zn(t, .14),
		"--accent-ring": Zn(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var er = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function tr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? $n(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of er) n.style.removeProperty(e);
}
function nr(e) {
	let t = o();
	e && !c() && (t.theme = e), tr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function rr() {
	let e = a();
	return an(() => {
		tr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function ir() {
	let e = x(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), B(() => document.removeEventListener("keydown", t)));
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
function ar(e) {
	let t = $(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = $(n, t);
	return !r || t && r === t ? null : r;
}
function or(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if ($(e.href) === t) return !0;
	return !1;
}
function sr(e, t, n, r) {
	if (or(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function cr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = $(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = $(e);
		r && (n && r === n || a.has(r) || (a.add(r), sr("preconnect", r, t.crossOrigin === !0, i), sr("dns-prefetch", r, !1, i)));
	}
	i.length && B(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var lr = ["src", "alt"], ur = { class: "brand-wordmark" }, dr = {
	key: 1,
	class: "brand-tagline"
}, fr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PhlixApp",
	setup(e) {
		rr();
		let t = x(), i = pn(), { t: a } = p();
		ir();
		let o = $t(() => import("./CommandPalette-DP17Gxqx.js")), s = H(!1);
		J(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${m.value}/player/${e}`);
		}
		let l = en("phlixConfig", null);
		cr(ar({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = O(() => l?.branding ?? {}), d = O(() => u.value.wordmark ?? "Phlix"), f = O(() => l?.menu ?? []), m = O(() => l?.routerBase ?? "/app");
		function h(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (V(), k(kn, null, {
			logo: Y(() => [P(K(X), {
				to: m.value,
				class: "brand"
			}, {
				default: Y(() => [
					u.value.logoSrc ? (V(), j("img", {
						key: 0,
						src: u.value.logoSrc,
						alt: u.value.logoAlt ?? d.value,
						class: "brand-logo"
					}, null, 8, lr)) : A("", !0),
					M("span", ur, [N(G(d.value), 1), i[1] ||= M("span", { class: "brand-dot" }, ".", -1)]),
					u.value.tagline ? (V(), j("span", dr, G(u.value.tagline), 1)) : A("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Y(() => [f.value.length ? (V(!0), j(E, { key: 0 }, U(f.value, (e) => (V(), k(nn(e.href ? "a" : K(X)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? h(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Y(() => [e.icon ? (V(), k(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : A("", !0), N(" " + G(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (V(), j(E, { key: 1 }, [P(K(X), {
				to: m.value,
				class: "nav-link"
			}, {
				default: Y(() => [N(G(K(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), P(K(X), {
				to: `${m.value}/settings`,
				class: "nav-link"
			}, {
				default: Y(() => [N(G(K(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: Y(() => [
				P(r, {
					name: "search",
					label: K(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => K(t).openPalette()
				}, null, 8, ["label"]),
				P(An),
				P(Ln)
			]),
			default: Y(() => [
				P(K(un)),
				s.value ? (V(), k(K(o), { key: 0 })) : A("", !0),
				P(qn, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-600c6a35"]]), pr = { class: "phlix-placeholder" }, mr = { class: "placeholder-content" }, hr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (V(), j("div", pr, [M("div", mr, [n[0] ||= M("h1", null, "Shared UI loading...", -1), M("p", null, "Phlix " + G(e.appName) + " is initializing", 1)])]));
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
		component: hr,
		props: { appName: e.app }
	}), n;
}
function vr(e) {
	let t = {
		...gr(),
		...e
	};
	nr(t.defaultTheme);
	let n = ln();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = dn({
		history: fn(t.routerBase || "/app"),
		routes: _r(t)
	}), i = Qt(fr);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var yr = ["id"], br = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		return R(() => clearTimeout(a)), (t, a) => (V(), j("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: sn(c, ["esc"])
		}, [W(t.$slots, "default", {}, void 0, !0), P(D, { name: "phlix-tooltip" }, {
			default: Y(() => [r.value && (e.text || t.$slots.content) ? (V(), j("span", {
				key: 0,
				id: K(n),
				role: "tooltip",
				class: I(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [W(t.$slots, "content", {}, () => [N(G(e.text), 1)], !0)], 10, yr)) : A("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), xr = ["aria-label"], Sr = ["role"], Cr = { class: "phlix-toast__content" }, wr = {
	key: 0,
	class: "phlix-toast__title"
}, Tr = { class: "phlix-toast__message" }, Er = ["onClick"], Dr = 0, Or = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = p(), i = C(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return z(() => {
			Dr++;
		}), R(() => {
			Dr--;
		}), (a, s) => (V(), k(Xt, { to: "body" }, [M("div", {
			class: I(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": K(t)("common.notifications")
		}, [P(Zt, { name: "phlix-toast" }, {
			default: Y(() => [(V(!0), j(E, null, U(K(i).toasts, (e) => (V(), j("div", {
				key: e.id,
				class: I(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				P(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				M("div", Cr, [e.title ? (V(), j("p", wr, G(e.title), 1)) : A("", !0), M("p", Tr, G(e.message), 1)]),
				e.action ? (V(), j("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), K(i).dismiss(e.id);
					}
				}, G(e.action.label), 9, Er)) : A("", !0),
				P(r, {
					name: "x",
					label: K(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => K(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Sr))), 128))]),
			_: 1
		})], 10, xr)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), kr = ["aria-label"], Ar = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: r } = p(), i = O(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, a) => (V(), j("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? K(r)("common.loading"),
			style: L(i.value ? { fontSize: i.value } : void 0)
		}, [P(n, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, kr));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), jr = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		}), (t, a) => (V(), k(nn(e.tag), {
			ref_key: "el",
			ref: n,
			class: I(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: L({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: Y(() => [W(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Mr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (V(), k(D, {
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
function Nr(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => import("./DashboardPage-Dk-8LrFf.js")
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => import("./UsersPage-D3eL3ggr.js")
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => import("./LogsPage-kcGb2Lrt.js")
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => import("./WebhooksPage-D3QGhs5b.js")
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => import("./ServicesPage-Bq_rvKfP.js")
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => import("./IntegrationsPage-aWkwWsoS.js")
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => import("./BackupPage-BUWYJxjK.js")
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => import("./CastDevicesPage-6kqK6OzJ.js")
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => import("./DlnaServerPage-CnwbXlhV.js")
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => import("./RemoteAccessPage-BOqaJazE.js")
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => import("./LiveTvPage-DjPAIckK.js")
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => import("./CollectionsPage-BXS7Rb4I.js")
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => import("./HistoryPage-BJUbXx2N.js")
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => import("./SyncPlayPage-8Czqv8UI.js")
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => import("./LibrariesPage-BYE7S405.js")
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => import("./SettingsPage-Dh0DJXfV.js")
		}
	];
}
function Pr(e = "/app") {
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
var Fr = {
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
}, Gr = { class: "library-scan__actions" }, Kr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = H([]), i = H({}), a = H(!0), o = H(null);
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
		return z(s), (e, t) => (V(), j("section", Fr, [t[4] ||= M("header", { class: "library-scan__head" }, [M("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), M("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (V(), j("div", Ir, [P(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: Y(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: Y(() => [...t[0] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), k(T, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (V(), j("div", Lr, [M("table", Rr, [t[3] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Type"),
			M("th", { scope: "col" }, "Items"),
			M("th", { scope: "col" }, "Last scan"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(V(!0), j(E, null, U(r.value, (e) => (V(), j("tr", { key: e.id }, [
			M("td", null, [M("div", zr, G(e.name), 1), e.paths.length ? (V(), j("div", Br, G(e.paths.join(", ")), 1)) : A("", !0)]),
			M("td", null, G(e.type), 1),
			M("td", Vr, G(e.item_count === void 0 ? "—" : e.item_count), 1),
			M("td", Hr, G(d(e.last_scan_at)), 1),
			M("td", null, [M("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [P(S, { tone: m(i.value[e.id]) }, {
				default: Y(() => [N(G(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (V(), j("span", Wr, G(i.value[e.id]?.error), 1)) : A("", !0)], 8, Ur)]),
			M("td", null, [M("div", Gr, [P(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: Y(() => [...t[1] ||= [N(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), P(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: Y(() => [...t[2] ||= [N(" Rescan ", -1)]]),
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
}, Qr = { class: "my-servers__name" }, $r = { class: "my-servers__url" }, ei = { class: "my-servers__num" }, ti = { class: "my-servers__date" }, ni = ["data-testid"], ri = { class: "my-servers__actions" }, ii = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = H([]), i = H(!0), a = H(null);
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
		return z(o), (e, t) => (V(), j("section", qr, [M("header", Jr, [t[1] ||= M("div", null, [M("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), M("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), P(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: Y(() => [...t[0] ||= [N("Add server", -1)]]),
			_: 1
		})]), i.value ? (V(), j("div", Yr, [P(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (V(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: a.value
		}, {
			actions: Y(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: o
			}, {
				default: Y(() => [...t[2] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), k(T, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: Y(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: Y(() => [...t[3] ||= [N("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (V(), j("div", Xr, [M("table", Zr, [t[5] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Server"),
			M("th", { scope: "col" }, "Owner"),
			M("th", { scope: "col" }, "Libraries"),
			M("th", { scope: "col" }, "Last seen"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(V(!0), j(E, null, U(r.value, (e) => (V(), j("tr", { key: e.id }, [
			M("td", null, [M("div", Qr, G(e.name), 1), M("div", $r, G(e.url), 1)]),
			M("td", null, G(e.owner), 1),
			M("td", ei, G(e.library_count === void 0 ? "—" : e.library_count), 1),
			M("td", ti, G(s(e.last_seen)), 1),
			M("td", null, [M("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [P(S, { tone: l(e.status) }, {
				default: Y(() => [N(G(c(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, ni)]),
			M("td", null, [M("div", ri, [P(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: Y(() => [...t[4] ||= [N("Manage", -1)]]),
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
}, _i = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = H([]), i = H(!0), a = H(null), o = H(""), s = H(!1);
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
		return z(() => c(!0)), (e, t) => (V(), j("section", ai, [t[8] ||= M("header", { class: "federation__head" }, [M("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), M("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (V(), j("div", oi, [P(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (V(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: Y(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(!0)
			}, {
				default: Y(() => [...t[2] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (V(), j("div", si, [
			t[7] ||= M("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (V(), k(T, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (V(), j("div", ci, [M("table", li, [t[4] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Peer"),
				M("th", { scope: "col" }, "Shared libraries"),
				M("th", { scope: "col" }, "Last sync"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(V(!0), j(E, null, U(r.value, (e) => (V(), j("tr", { key: e.id }, [
				M("td", null, [M("div", ui, G(e.name), 1), M("div", di, G(e.url), 1)]),
				M("td", fi, G(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				M("td", pi, G(d(e.last_sync)), 1),
				M("td", null, [M("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [P(S, { tone: p(e.status) }, {
					default: Y(() => [N(G(f(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, mi)]),
				M("td", null, [M("div", hi, [e.status === "connected" ? (V(), k(y, {
					key: 0,
					variant: "ghost",
					size: "sm",
					"aria-label": `Disconnect ${e.name}`,
					onClick: (t) => u(e.id)
				}, {
					default: Y(() => [...t[3] ||= [N(" Disconnect ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : A("", !0)])])
			]))), 128))])])])),
			M("section", gi, [t[6] ||= M("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), M("form", {
				class: "federation__form",
				onSubmit: cn(l, ["prevent"])
			}, [on(M("input", {
				"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
				type: "url",
				class: "federation__input",
				placeholder: "https://other-server.example.com",
				"aria-label": "Peer server URL",
				autocomplete: "off"
			}, null, 512), [[rn, o.value]]), P(y, {
				type: "submit",
				variant: "solid",
				"left-icon": "plus",
				loading: s.value,
				disabled: !o.value.trim()
			}, {
				default: Y(() => [...t[5] ||= [N(" Connect ", -1)]]),
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
}, Si = { class: "shares__library" }, Ci = { class: "shares__date" }, wi = { class: "shares__date" }, Ti = ["data-testid"], Ei = { class: "shares__actions" }, Di = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = H([]), i = H(!0), a = H(null);
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
		return z(() => o(!0)), (e, t) => (V(), j("section", vi, [t[5] ||= M("header", { class: "shares__head" }, [M("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), M("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (V(), j("div", yi, [P(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (V(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: Y(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: Y(() => [...t[1] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), k(T, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (V(), j("div", bi, [M("table", xi, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Shared with"),
			M("th", { scope: "col" }, "Permissions"),
			M("th", { scope: "col" }, "Created"),
			M("th", { scope: "col" }, "Expires"),
			M("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(V(!0), j(E, null, U(r.value, (e) => (V(), j("tr", { key: e.id }, [
			M("td", null, [M("span", Si, G(e.library_name), 1)]),
			M("td", null, G(e.shared_with), 1),
			M("td", null, [P(S, { tone: u(e.permissions) }, {
				default: Y(() => [N(G(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			M("td", Ci, G(c(e.created_at)), 1),
			M("td", wi, [M("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [N(G(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (V(), k(S, {
				key: 0,
				tone: "error"
			}, {
				default: Y(() => [...t[2] ||= [N("Expired", -1)]]),
				_: 1
			})) : A("", !0)], 8, Ti)]),
			M("td", null, [M("div", Ei, [P(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: Y(() => [...t[3] ||= [N(" Revoke ", -1)]]),
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
}, zi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = H([]), i = H(!0), a = H(null), o = H(1), s = H(1);
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
		return z(() => c()), (e, t) => (V(), j("section", Oi, [t[7] ||= M("header", { class: "audit__head" }, [M("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), M("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), i.value ? (V(), j("div", ki, [P(w, {
			variant: "text",
			lines: 8
		})])) : a.value ? (V(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: a.value
		}, {
			actions: Y(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(o.value)
			}, {
				default: Y(() => [...t[3] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), k(T, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (V(), j("div", Ai, [M("div", ji, [M("table", Mi, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Action"),
			M("th", { scope: "col" }, "Actor"),
			M("th", { scope: "col" }, "Target"),
			M("th", { scope: "col" }, "Details"),
			M("th", { scope: "col" }, "IP"),
			M("th", { scope: "col" }, "Time")
		])], -1), M("tbody", null, [(V(!0), j(E, null, U(r.value, (e) => (V(), j("tr", { key: e.id }, [
			M("td", null, [M("span", { "data-testid": `action-${e.id}` }, [P(S, { tone: u(e.action) }, {
				default: Y(() => [N(G(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Ni)]),
			M("td", null, G(e.actor), 1),
			M("td", null, G(e.target || "—"), 1),
			M("td", Pi, G(e.details || "—"), 1),
			M("td", Fi, G(e.ip_address || "—"), 1),
			M("td", Ii, G(l(e.created_at)), 1)
		]))), 128))])])]), s.value > 1 ? (V(), j("nav", Li, [
			P(y, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: o.value <= 1,
				onClick: t[1] ||= (e) => c(o.value - 1)
			}, {
				default: Y(() => [...t[5] ||= [N(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			M("span", Ri, "Page " + G(o.value) + " of " + G(s.value), 1),
			P(y, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: o.value >= s.value,
				onClick: t[2] ||= (e) => c(o.value + 1)
			}, {
				default: Y(() => [...t[6] ||= [N(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : A("", !0)]))]));
	}
}), [["__scopeId", "data-v-26a60fa5"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Bi(e, t) {
	let n = be(), r = !1;
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
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = H(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), B(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), tn(t);
}
//#endregion
export { De as ALL_LOGS, mt as AMBIENT_SAMPLE_H, pt as AMBIENT_SAMPLE_INTERVAL_MS, st as AMBIENT_SAMPLE_W, Je as ARROW_ICONS, gt as ARROW_LABELS, Le as AdminBackupApi, Re as AdminCastApi, He as AdminCollectionsApi, Oe as AdminDashboardApi, ze as AdminDlnaServerApi, Ue as AdminHistoryApi, Ie as AdminIntegrationsApi, Ke as AdminLibrariesApi, Ve as AdminLiveTvApi, Ee as AdminLogsApi, Be as AdminRemoteAccessApi, Fe as AdminServicesApi, qe as AdminSettingsApi, We as AdminSyncPlayApi, je as AdminUsersApi, Pe as AdminWebhooksApi, yt as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, kn as AppLayout, zi as AuditLogsPage, S as Badge, y as Button, Gt as CAPTION_BACKGROUND_OPTIONS, Bt as CAPTION_COLOR_OPTIONS, Ut as CAPTION_EDGE_OPTIONS, Lt as CAPTION_SIZE_OPTIONS, jt as CAPTION_SIZE_SCALE, ot as CaptionOverlay, Ot as CaptionsMenu, pe as Chip, ve as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, ht as DIRECT_PLAY_EXTENSIONS, T as EmptyState, _i as FederationPage, Se as FilterBar, n as Icon, r as IconButton, ue as Kbd, Ge as LIBRARY_TYPES, Kr as LibraryScanPage, ne as LocalStorageTokenStore, qt as LoginForm, Di as ManageSharesPage, me as MediaCard, Te as MediaDetail, ye as MediaGrid, xe as MediaHomeRow, ge as MediaRow, qn as MiniPlayer, Ce as Modal, ii as MyServersPage, ee as NetworkError, tt as PLAYER_SHORTCUTS, Mr as PageTransition, fr as PhlixApp, Tt as Player, Ze as QualityMenu, ke as RATING_LABELS, Ae as RATING_OPTIONS, oe as RESUME_MAX_RATIO, ie as RESUME_MIN_SECONDS, St as ResumePrompt, jr as Reveal, Me as SUBSCRIBABLE_EVENTS, $e as Scrubber, _e as Select, Yt as SettingsForm, yn as Sheet, _t as ShortcutsHelp, Jt as SignupForm, w as Skeleton, de as Slider, Xe as SpeedMenu, Ar as Spinner, fe as Switch, ct as TRANSCODE_EXTENSIONS, we as Tabs, te as TimeoutError, Or as ToastHost, br as Tooltip, bt as TranscodeNotice, xt as UPNEXT_COUNTDOWN_SECONDS, wt as UPNEXT_RING_CIRCUMFERENCE, ut as UPNEXT_RING_RADIUS, Ct as UpNext, rt as VolumeControl, Ne as WEBHOOK_EVENT_CATEGORIES, Vt as activeAudioIndex, Pr as adminMenu, Dt as ambientGradient, Wt as applyAudioTrack, nr as applyStoredThemeEarly, Mt as applyTrackModes, At as averageRegion, Bi as bindMediaStoreToRouter, Nr as buildAdminRoutes, se as buildMediaQuery, ae as buildMediaUrl, Rt as captionStyleVars, Kt as cleanCueText, vr as createPhlixApp, f as createTranslator, $n as deriveAccentVars, Nt as edgeShadow, h as errMessage, vt as extensionOf, et as formatTime, ce as fuzzyScore, nt as handleShortcut, Pt as hasActiveCaptions, c as hasStoredPreferences, lt as isBatterySaving, Et as isFatalMediaError, g as isOffline, it as isTypingTarget, Ht as listAudioTracks, zt as listSubtitleTracks, le as matchCommand, u as mergeMessages, dt as needsTranscode, It as readActiveCueLines, o as readStoredPreferences, Ft as resolveTextTrack, kt as rgbString, at as rgbaString, ft as ringDashoffset, Ye as sampleAmbient, re as useAuthStore, ir as useCommandPaletteHotkey, x as useCommandStore, i as useFocusTrap, Qe as useKeyboardShortcuts, be as useMediaStore, p as useMessages, Vi as useOnline, b as usePlayerStore, cr as usePreconnect, a as usePreferencesStore, he as usePrefetch, rr as useTheme, C as useToastStore };

//# sourceMappingURL=phlix-ui.js.map