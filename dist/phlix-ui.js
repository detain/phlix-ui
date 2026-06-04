import { r as e } from "./AuthField-BC7YjKhv.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Cvd20ZUW.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BwQkyEkr.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-CB5g_qzR.js";
import { a as x, i as re, n as ie, o as S, r as ae, t as oe } from "./media-query-D1H7YKGl.js";
import { i as se, n as ce, r as le, t as ue } from "./Kbd-CSMm1T0l.js";
import { t as C } from "./Badge-ArWL5-WE.js";
import { t as de } from "./Slider-BMn_Lp_q.js";
import { t as fe } from "./Switch-CFZhdkXR.js";
import { i as pe, n as me, r as he, t as ge } from "./MediaRow-Srl6gXC7.js";
import { t as _e } from "./Select-Ba3KZxNb.js";
import { a as ve, i as ye, n as be, r as xe, t as Se } from "./FilterBar-LazdAMY5.js";
import { t as Ce } from "./Modal-BkvvzvD7.js";
import { t as w } from "./useToastStore-BDoKlU6N.js";
import { n as T, t as E } from "./EmptyState-Ds4WcVdG.js";
import { t as we } from "./Tabs-x8dUKZN5.js";
import { t as Te } from "./MediaDetail-CnFev6XD.js";
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
import { n as Je, t as Ye } from "./admin-CsRmlYzz.js";
import { A as Xe, C as Ze, D as Qe, E as $e, F as et, I as tt, L as nt, M as rt, N as it, O as at, P as ot, S as st, T as ct, _ as lt, a as ut, b as dt, c as ft, d as pt, f as mt, g as ht, h as gt, i as _t, j as vt, k as yt, l as bt, m as xt, n as St, o as Ct, p as wt, r as Tt, s as Et, t as Dt, u as Ot, v as kt, w as At, x as jt, y as Mt } from "./Player-BB-aS_WN.js";
import { a as Nt, c as Pt, d as Ft, f as It, g as Lt, h as Rt, i as zt, l as Bt, m as Vt, n as Ht, o as Ut, p as Wt, r as Gt, s as Kt, t as qt, u as Jt } from "./captions-COgPp5bH.js";
import { t as Yt } from "./LoginForm-D8YONCTg.js";
import { t as Xt } from "./SignupForm-euZPfAri.js";
import { t as Zt } from "./SettingsForm-Dz4g0Hwh.js";
import { Fragment as D, Teleport as Qt, Transition as O, TransitionGroup as $t, computed as k, createApp as en, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as tn, defineComponent as I, inject as nn, normalizeClass as L, normalizeStyle as R, onBeforeUnmount as z, onMounted as B, onScopeDispose as V, openBlock as H, readonly as rn, ref as U, renderList as W, renderSlot as G, resolveDynamicComponent as an, toDisplayString as K, unref as q, useId as on, vModelText as J, watch as Y, watchEffect as sn, withCtx as X, withDirectives as cn, withKeys as ln, withModifiers as un } from "vue";
import { createPinia as dn } from "pinia";
import { RouterLink as Z, RouterView as fn, createRouter as pn, createWebHistory as mn, useRouter as hn } from "vue-router";
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
		Y(() => n.modelValue, (e) => o.value = e);
		let s = U(null), c = on();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (H(), A(Qt, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: X(() => [e.modelValue ? (H(), M("div", {
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
				default: X(() => [N("nav", {
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
		let t = b(), r = hn(), a = nn("phlixConfig", null), o = k(() => a?.routerBase ?? "/app"), { t: s } = p(), c = U(!1), l = U(null), u = U(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = k(() => d.value.charAt(0).toUpperCase() || "A");
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
		return Y(c, (e) => {
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
		let r = t, i = S(), { t: a } = p(), o = U(null), s = k(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = k(() => i.current?.name ?? ""), l = k(() => Math.max(0, Math.min(1, i.progress)));
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
		return Y(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), z(() => {
			o.value?.pause?.();
		}), (e, t) => (H(), A(O, { name: "mini" }, {
			default: X(() => [s.value ? (H(), M("div", {
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
var Q = (e) => Math.max(0, Math.min(255, Math.round(e))), Zn = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Q(e).toString(16).padStart(2, "0")).join("");
function Qn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function $n(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var er = ({ r: e, g: t, b: n }, r) => `rgba(${Q(e)}, ${Q(t)}, ${Q(n)}, ${r})`;
function tr({ r: e, g: t, b: n }) {
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
function nr(e) {
	let t = Xn(e);
	if (!t) return null;
	let n = tr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Zn(t),
		"--accent-hover": Zn(Qn(t, .12)),
		"--accent-active": Zn($n(t, .12)),
		"--accent-soft": er(t, .14),
		"--accent-ring": er(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var rr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function ir(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? nr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of rr) n.style.removeProperty(e);
}
function ar(e) {
	let t = o();
	e && !c() && (t.theme = e), ir(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function or() {
	let e = a();
	return sn(() => {
		ir({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function sr() {
	let e = se(), t = (t) => {
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
function cr(e) {
	let t = $(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = $(n, t);
	return !r || t && r === t ? null : r;
}
function lr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if ($(e.href) === t) return !0;
	return !1;
}
function ur(e, t, n, r) {
	if (lr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function dr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = $(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = $(e);
		r && (n && r === n || a.has(r) || (a.add(r), ur("preconnect", r, t.crossOrigin === !0, i), ur("dns-prefetch", r, !1, i)));
	}
	i.length && V(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function fr() {
	let e = S(), t = b();
	async function n() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {};
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / x));
			}
			e.mergeServerResume(r);
		} catch {}
	}
	return { syncResume: n };
}
//#endregion
//#region src/composables/useResumeReporter.ts
var pr = "phlix.deviceId", mr = 15e3;
function hr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(pr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(pr, e)), e;
	} catch {
		return "web";
	}
}
function gr() {
	let e = S(), t = b(), n = hr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < mr)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * x),
					duration_ticks: Math.floor(e.duration * x),
					is_paused: !e.playing
				});
			} catch {} finally {
				a = !1;
			}
		}
	}
	return Y(() => Math.floor(e.position), () => void s()), Y(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var _r = ["src", "alt"], vr = { class: "brand-wordmark" }, yr = {
	key: 1,
	class: "brand-tagline"
}, br = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		or();
		let t = se(), i = hn(), { t: a } = p();
		sr();
		let o = tn(() => import("./CommandPalette-BRIAAiSF.js")), s = U(!1);
		Y(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = nn("phlixConfig", null);
		dr(cr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = fr();
		Y(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 }), gr();
		let f = k(() => l?.branding ?? {}), m = k(() => f.value.wordmark ?? "Phlix"), h = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = k(() => l?.routerBase ?? "/app");
		function _(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (H(), A(jn, null, {
			logo: X(() => [F(q(Z), {
				to: g.value,
				class: "brand"
			}, {
				default: X(() => [
					f.value.logoSrc ? (H(), M("img", {
						key: 0,
						src: f.value.logoSrc,
						alt: f.value.logoAlt ?? m.value,
						class: "brand-logo"
					}, null, 8, _r)) : j("", !0),
					N("span", vr, [P(K(m.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (H(), M("span", yr, K(f.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: X(() => [h.value.length ? (H(!0), M(D, { key: 0 }, W(h.value, (e) => (H(), A(an(e.href ? "a" : q(Z)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? _(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: X(() => [e.icon ? (H(), A(n, {
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
			]))), 128)) : (H(), M(D, { key: 1 }, [F(q(Z), {
				to: g.value,
				class: "nav-link"
			}, {
				default: X(() => [P(K(q(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), F(q(Z), {
				to: `${g.value}/settings`,
				class: "nav-link"
			}, {
				default: X(() => [P(K(q(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: X(() => [
				F(r, {
					name: "search",
					label: q(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => q(t).openPalette()
				}, null, 8, ["label"]),
				F(Mn),
				F(zn)
			]),
			default: X(() => [
				F(q(fn)),
				s.value ? (H(), A(q(o), { key: 0 })) : j("", !0),
				F(Yn, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-236e63ec"]]), xr = { class: "phlix-placeholder" }, Sr = { class: "placeholder-content" }, Cr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (H(), M("div", xr, [N("div", Sr, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + K(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), wr = ["login", "signup"];
function Tr(e, t) {
	let n = typeof e.name == "string" ? e.name : "";
	return wr.includes(n) || e.meta?.public === !0 || t ? !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Er() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Dr(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-CTUZe02W.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-D6PXVAsQ.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-3oji0CfW.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			component: () => import("./LoginPage-D-HZupX6.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: () => import("./SignupPage-NR_4KnZ2.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: () => import("./SettingsPage-9rku4j9E.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: Cr,
		props: { appName: e.app }
	}), n;
}
function Or(e) {
	let t = {
		...Er(),
		...e
	};
	ar(t.defaultTheme);
	let n = dn();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = pn({
		history: mn(),
		routes: Dr(t)
	});
	r.beforeEach((e) => Tr(e, b(n).isLoggedIn));
	let i = en(br);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var kr = ["id"], Ar = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = on(), r = U(!1), i = U(null), a;
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
			default: X(() => [r.value && (e.text || t.$slots.content) ? (H(), M("span", {
				key: 0,
				id: q(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [G(t.$slots, "content", {}, () => [P(K(e.text), 1)], !0)], 10, kr)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), jr = ["aria-label"], Mr = ["role"], Nr = { class: "phlix-toast__content" }, Pr = {
	key: 0,
	class: "phlix-toast__title"
}, Fr = { class: "phlix-toast__message" }, Ir = ["onClick"], Lr = 0, Rr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
			Lr++;
		}), z(() => {
			Lr--;
		}), (a, s) => (H(), A(Qt, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": q(t)("common.notifications")
		}, [F($t, { name: "phlix-toast" }, {
			default: X(() => [(H(!0), M(D, null, W(q(i).toasts, (e) => (H(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", Nr, [e.title ? (H(), M("p", Pr, K(e.title), 1)) : j("", !0), N("p", Fr, K(e.message), 1)]),
				e.action ? (H(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), q(i).dismiss(e.id);
					}
				}, K(e.action.label), 9, Ir)) : j("", !0),
				F(r, {
					name: "x",
					label: q(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => q(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Mr))), 128))]),
			_: 1
		})], 10, jr)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), zr = ["aria-label"], Br = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		})], 12, zr));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), Vr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		}), (t, a) => (H(), A(an(e.tag), {
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
			default: X(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Hr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (H(), A(O, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: X(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Ur = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Wr = {
	key: 0,
	class: "library-scan__skel"
}, Gr = {
	key: 3,
	class: "library-scan__table-wrap"
}, Kr = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, qr = { class: "library-scan__name" }, Jr = {
	key: 0,
	class: "library-scan__paths"
}, Yr = { class: "library-scan__num" }, Xr = { class: "library-scan__date" }, Zr = ["data-testid"], Qr = {
	key: 0,
	class: "library-scan__error"
}, $r = { class: "library-scan__actions" }, ei = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		return B(s), (e, t) => (H(), M("section", Ur, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (H(), M("div", Wr, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: X(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: X(() => [...t[0] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (H(), M("div", Gr, [N("table", Kr, [t[3] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("div", qr, K(e.name), 1), e.paths.length ? (H(), M("div", Jr, K(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, K(e.type), 1),
			N("td", Yr, K(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", Xr, K(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: m(i.value[e.id]) }, {
				default: X(() => [P(K(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (H(), M("span", Qr, K(i.value[e.id]?.error), 1)) : j("", !0)], 8, Zr)]),
			N("td", null, [N("div", $r, [F(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: X(() => [...t[1] ||= [P(" Scan ", -1)]]),
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
				default: X(() => [...t[2] ||= [P(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-3235ff5e"]]);
//#endregion
//#region src/api/normalize.ts
function ti(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var ni = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, ri = { class: "my-servers__head" }, ii = {
	key: 0,
	class: "my-servers__skel"
}, ai = {
	key: 3,
	class: "my-servers__table-wrap"
}, oi = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, si = { class: "my-servers__name" }, ci = { class: "my-servers__url" }, li = { class: "my-servers__num" }, ui = { class: "my-servers__date" }, di = ["data-testid"], fi = { class: "my-servers__actions" }, pi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = b(), i = U([]), a = U(!0), o = U(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				let e = await t.get("/api/v1/me/servers"), n = r.user?.username || r.user?.name || r.user?.email || "—";
				i.value = (e.servers || []).map((e) => ({
					id: e.serverId ?? "",
					name: e.serverName ?? "",
					url: e.hostnameCandidates?.[0] ?? "",
					status: e.status ?? "offline",
					owner: n,
					last_seen: ti(e.lastSeenAt)
				}));
			} catch (e) {
				o.value = h(e, "Failed to load servers."), n.error(o.value);
			} finally {
				a.value = !1;
			}
		}
		function c(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function l(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function u(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		return B(s), (e, t) => (H(), M("section", ni, [N("header", ri, [t[1] ||= N("div", null, [N("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: X(() => [...t[0] ||= [P("Add server", -1)]]),
			_: 1
		})]), a.value ? (H(), M("div", ii, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: X(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: X(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: X(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: X(() => [...t[3] ||= [P("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (H(), M("div", ai, [N("table", oi, [t[5] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Server"),
			N("th", { scope: "col" }, "Owner"),
			N("th", { scope: "col" }, "Libraries"),
			N("th", { scope: "col" }, "Last seen"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(H(!0), M(D, null, W(i.value, (e) => (H(), M("tr", { key: e.id }, [
			N("td", null, [N("div", si, K(e.name), 1), N("div", ci, K(e.url), 1)]),
			N("td", null, K(e.owner), 1),
			N("td", li, K(e.library_count === void 0 ? "—" : e.library_count), 1),
			N("td", ui, K(c(e.last_seen)), 1),
			N("td", null, [N("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: u(e.status) }, {
				default: X(() => [P(K(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, di)]),
			N("td", null, [N("div", fi, [F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: X(() => [...t[4] ||= [P("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), mi = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, hi = {
	key: 0,
	class: "federation__skel"
}, gi = {
	key: 2,
	class: "federation__content"
}, _i = {
	key: 1,
	class: "federation__table-wrap"
}, vi = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, yi = { class: "federation__name" }, bi = { class: "federation__url" }, xi = { class: "federation__num" }, Si = { class: "federation__date" }, Ci = ["data-testid"], wi = { class: "federation__actions" }, Ti = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, Ei = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U(!0), a = U(null), o = U(""), s = U(""), c = U(""), l = U(!1);
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
				a.value = h(e, "Failed to load federation peers."), n.error(a.value);
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
					n.error(h(e, "Failed to add peer."));
				} finally {
					l.value = !1;
				}
			}
		}
		async function f(e) {
			try {
				await t.delete(`/api/v1/me/federation/peers/${e}`), n.success("Peer removed."), await u();
			} catch (e) {
				n.error(h(e, "Failed to remove peer."));
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
		function g(e) {
			switch (e) {
				case "connected": return "success";
				case "disconnected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		return B(() => u(!0)), (e, t) => (H(), M("section", mi, [t[10] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (H(), M("div", hi, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: X(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: X(() => [...t[4] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (H(), M("div", gi, [
			t[9] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (H(), A(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (H(), M("div", _i, [N("table", vi, [t[6] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
				N("td", null, [N("div", yi, K(e.name), 1), N("div", bi, K(e.url), 1)]),
				N("td", xi, K(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", Si, K(p(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: g(e.status) }, {
					default: X(() => [P(K(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Ci)]),
				N("td", null, [N("div", wi, [F(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: X(() => [...t[5] ||= [P(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			N("section", Ti, [t[8] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: un(d, ["prevent"])
			}, [
				cn(N("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[J, s.value]]),
				cn(N("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[J, o.value]]),
				cn(N("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[J, c.value]]),
				F(y, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: X(() => [...t[7] ||= [P(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), Di = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Oi = {
	key: 0,
	class: "shares__skel"
}, ki = {
	key: 3,
	class: "shares__table-wrap"
}, Ai = {
	class: "shares__table",
	"aria-label": "Library shares"
}, ji = { class: "shares__library" }, Mi = { class: "shares__date" }, Ni = { class: "shares__date" }, Pi = ["data-testid"], Fi = { class: "shares__actions" }, Ii = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U(!0), a = U(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: ti(e.created_at) ?? "",
					expires_at: ti(e.expires_at)
				}));
			} catch (e) {
				a.value = h(e, "Failed to load shares."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function s(e) {
			try {
				await t.delete(`/api/v1/me/shares/${e}`), n.success("Share revoked."), await o();
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
		return B(() => o(!0)), (e, t) => (H(), M("section", Di, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (H(), M("div", Oi, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: X(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: X(() => [...t[1] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (H(), M("div", ki, [N("table", Ai, [t[4] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("span", ji, K(e.library_name), 1)]),
			N("td", null, K(e.shared_with), 1),
			N("td", null, [F(C, { tone: u(e.permissions) }, {
				default: X(() => [P(K(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", Mi, K(c(e.created_at)), 1),
			N("td", Ni, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(K(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (H(), A(C, {
				key: 0,
				tone: "error"
			}, {
				default: X(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, Pi)]),
			N("td", null, [N("div", Fi, [F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: X(() => [...t[3] ||= [P(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]), Li = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, Ri = {
	key: 0,
	class: "audit__skel"
}, zi = {
	key: 3,
	class: "audit__content"
}, Bi = { class: "audit__table-wrap" }, Vi = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, Hi = ["data-testid"], Ui = { class: "audit__details" }, Wi = { class: "audit__ip" }, Gi = { class: "audit__date" }, Ki = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, qi = {
	class: "audit__page-info",
	"aria-live": "polite"
}, Ji = 50, Yi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = U([]), i = U(!0), a = U(null), o = U(1), s = U(1);
		async function c(e = 1) {
			i.value = !0, a.value = null;
			try {
				let n = Math.max(0, (e - 1) * Ji), i = await t.get("/api/v1/me/audit-logs", {
					limit: String(Ji),
					offset: String(n)
				}), a = i.limit && i.limit > 0 ? i.limit : Ji;
				r.value = (i.logs || []).map((e) => ({
					id: e.id ?? "",
					action: e.action && e.action !== "" ? e.action : e.event ?? "",
					actor: e.actor ?? e.user_id ?? "",
					target: e.resource ?? void 0,
					details: e.reason ?? void 0,
					ip_address: e.ip_address ?? void 0,
					created_at: e.created_at ?? ""
				})), o.value = e, s.value = Math.max(1, Math.ceil((i.total || 0) / a));
			} catch (e) {
				a.value = h(e, "Failed to load audit logs."), n.error(a.value);
			} finally {
				i.value = !1;
			}
		}
		function l(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function u(e) {
			return e.includes("create") || e.includes("add") ? "success" : e.includes("delete") || e.includes("remove") ? "error" : e.includes("update") || e.includes("edit") ? "info" : e.includes("login") || e.includes("auth") ? "accent" : "neutral";
		}
		return B(() => c()), (e, t) => (H(), M("section", Li, [t[7] ||= N("header", { class: "audit__head" }, [N("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), N("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), i.value ? (H(), M("div", Ri, [F(T, {
			variant: "text",
			lines: 8
		})])) : a.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: a.value
		}, {
			actions: X(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(o.value)
			}, {
				default: X(() => [...t[3] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), A(E, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (H(), M("div", zi, [N("div", Bi, [N("table", Vi, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Action"),
			N("th", { scope: "col" }, "Actor"),
			N("th", { scope: "col" }, "Target"),
			N("th", { scope: "col" }, "Details"),
			N("th", { scope: "col" }, "IP"),
			N("th", { scope: "col" }, "Time")
		])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
			N("td", null, [N("span", { "data-testid": `action-${e.id}` }, [F(C, { tone: u(e.action) }, {
				default: X(() => [P(K(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Hi)]),
			N("td", null, K(e.actor), 1),
			N("td", null, K(e.target || "—"), 1),
			N("td", Ui, K(e.details || "—"), 1),
			N("td", Wi, K(e.ip_address || "—"), 1),
			N("td", Gi, K(l(e.created_at)), 1)
		]))), 128))])])]), s.value > 1 ? (H(), M("nav", Ki, [
			F(y, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: o.value <= 1,
				onClick: t[1] ||= (e) => c(o.value - 1)
			}, {
				default: X(() => [...t[5] ||= [P(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			N("span", qi, "Page " + K(o.value) + " of " + K(s.value), 1),
			F(y, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: o.value >= s.value,
				onClick: t[2] ||= (e) => c(o.value + 1)
			}, {
				default: X(() => [...t[6] ||= [P(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : j("", !0)]))]));
	}
}), [["__scopeId", "data-v-3fcef29f"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Xi(e, t) {
	let n = be(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = Y(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = Y(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/useOnline.ts
function Zi() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = U(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), V(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), rn(t);
}
//#endregion
export { De as ALL_LOGS, gt as AMBIENT_SAMPLE_H, ht as AMBIENT_SAMPLE_INTERVAL_MS, lt as AMBIENT_SAMPLE_W, Xe as ARROW_ICONS, vt as ARROW_LABELS, Le as AdminBackupApi, Re as AdminCastApi, He as AdminCollectionsApi, Oe as AdminDashboardApi, ze as AdminDlnaServerApi, Ue as AdminHistoryApi, Ie as AdminIntegrationsApi, Ke as AdminLibrariesApi, Ve as AdminLiveTvApi, Ee as AdminLogsApi, Be as AdminRemoteAccessApi, Fe as AdminServicesApi, qe as AdminSettingsApi, We as AdminSyncPlayApi, je as AdminUsersApi, Pe as AdminWebhooksApi, xt as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, jn as AppLayout, Yi as AuditLogsPage, C as Badge, y as Button, qt as CAPTION_BACKGROUND_OPTIONS, Ht as CAPTION_COLOR_OPTIONS, Gt as CAPTION_EDGE_OPTIONS, zt as CAPTION_SIZE_OPTIONS, Nt as CAPTION_SIZE_SCALE, ct as CaptionOverlay, At as CaptionsMenu, pe as Chip, ve as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, _t as DIRECT_PLAY_EXTENSIONS, E as EmptyState, Ei as FederationPage, Se as FilterBar, n as Icon, r as IconButton, ue as Kbd, Ge as LIBRARY_TYPES, ei as LibraryScanPage, ne as LocalStorageTokenStore, Yt as LoginForm, Ii as ManageSharesPage, me as MediaCard, Te as MediaDetail, ye as MediaGrid, xe as MediaHomeRow, ge as MediaRow, Yn as MiniPlayer, Ce as Modal, pi as MyServersPage, ee as NetworkError, rt as PLAYER_SHORTCUTS, Hr as PageTransition, br as PhlixApp, Dt as Player, $e as QualityMenu, ke as RATING_LABELS, Ae as RATING_OPTIONS, ae as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, wt as ResumePrompt, Vr as Reveal, Me as SUBSCRIBABLE_EVENTS, tt as Scrubber, _e as Select, Zt as SettingsForm, xn as Sheet, yt as ShortcutsHelp, Xt as SignupForm, T as Skeleton, de as Slider, Qe as SpeedMenu, Br as Spinner, fe as Switch, ut as TRANSCODE_EXTENSIONS, we as Tabs, te as TimeoutError, Rr as ToastHost, Ar as Tooltip, St as TranscodeNotice, Ct as UPNEXT_COUNTDOWN_SECONDS, Et as UPNEXT_RING_CIRCUMFERENCE, ft as UPNEXT_RING_RADIUS, Tt as UpNext, at as VolumeControl, Ne as WEBHOOK_EVENT_CATEGORIES, Ut as activeAudioIndex, Ye as adminMenu, kt as ambientGradient, Kt as applyAudioTrack, ar as applyStoredThemeEarly, Pt as applyTrackModes, Mt as averageRegion, Xi as bindMediaStoreToRouter, Je as buildAdminRoutes, oe as buildMediaQuery, ie as buildMediaUrl, Bt as captionStyleVars, Jt as cleanCueText, Or as createPhlixApp, f as createTranslator, nr as deriveAccentVars, Ft as edgeShadow, h as errMessage, bt as extensionOf, nt as formatTime, ce as fuzzyScore, it as handleShortcut, It as hasActiveCaptions, c as hasStoredPreferences, dt as isBatterySaving, Ot as isFatalMediaError, g as isOffline, ot as isTypingTarget, Wt as listAudioTracks, Vt as listSubtitleTracks, le as matchCommand, u as mergeMessages, pt as needsTranscode, Rt as readActiveCueLines, o as readStoredPreferences, Lt as resolveTextTrack, jt as rgbString, st as rgbaString, mt as ringDashoffset, Ze as sampleAmbient, b as useAuthStore, sr as useCommandPaletteHotkey, se as useCommandStore, i as useFocusTrap, et as useKeyboardShortcuts, be as useMediaStore, p as useMessages, Zi as useOnline, S as usePlayerStore, dr as usePreconnect, a as usePreferencesStore, he as usePrefetch, gr as useResumeReporter, fr as useResumeSync, or as useTheme, w as useToastStore };

//# sourceMappingURL=phlix-ui.js.map