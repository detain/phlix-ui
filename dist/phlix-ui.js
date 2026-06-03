import { r as e } from "./AuthField-BC7YjKhv.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Cvd20ZUW.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BwQkyEkr.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-CB5g_qzR.js";
import { a as re, i as ie, n as ae, r as oe, t as se } from "./media-query-DowsWq-z.js";
import { i as ce, n as le, r as ue, t as de } from "./Kbd-CSMm1T0l.js";
import { t as x } from "./Badge-ArWL5-WE.js";
import { t as fe } from "./Slider-BMn_Lp_q.js";
import { t as pe } from "./Switch-CFZhdkXR.js";
import { i as me, n as he, r as ge, t as _e } from "./MediaRow-yOkKwyWU.js";
import { t as ve } from "./Select-Ba3KZxNb.js";
import { a as ye, i as be, n as xe, r as Se, t as Ce } from "./FilterBar-Dwo5zRem.js";
import { t as we } from "./Modal-BkvvzvD7.js";
import { t as S } from "./useToastStore-BDoKlU6N.js";
import { n as C, t as w } from "./EmptyState-Ds4WcVdG.js";
import { t as Te } from "./Tabs-x8dUKZN5.js";
import { t as Ee } from "./MediaDetail-D6M3EGxy.js";
import { n as De, t as Oe } from "./logs-DadTfaTq.js";
import { t as ke } from "./dashboard-BTCOCTHQ.js";
import { n as Ae, r as je, t as Me } from "./users-C40iLgkq.js";
import { n as Ne, r as Pe, t as Fe } from "./webhooks-BBTLnFKm.js";
import { t as Ie } from "./services-Czm8hsvH.js";
import { t as Le } from "./integrations-DLAG9ISY.js";
import { t as Re } from "./backup-IdY_vzc2.js";
import { t as ze } from "./cast-BvFcBEB6.js";
import { t as Be } from "./dlnaServer-B5Sg4MkS.js";
import { t as Ve } from "./remoteAccess-DVKRpKQ8.js";
import { t as He } from "./liveTv-Dbjt901v.js";
import { t as Ue } from "./collections-CH3HLdcd.js";
import { t as We } from "./history-ByCY8OYj.js";
import { t as Ge } from "./syncPlay-DPzJkgkK.js";
import { n as Ke, t as qe } from "./libraries-CXAz_kXs.js";
import { t as Je } from "./settings-m4upFcmH.js";
import { n as Ye, t as Xe } from "./admin-CsRmlYzz.js";
import { A as Ze, C as Qe, D as $e, E as et, F as tt, I as nt, L as rt, M as it, N as at, O as ot, P as st, S as ct, T as lt, _ as ut, a as dt, b as ft, c as pt, d as mt, f as ht, g as gt, h as _t, i as vt, j as yt, k as bt, l as xt, m as St, n as Ct, o as wt, p as Tt, r as Et, s as Dt, t as Ot, u as kt, v as At, w as jt, x as Mt, y as Nt } from "./Player-CuxoeuoB.js";
import { a as Pt, c as Ft, d as It, f as Lt, g as Rt, h as zt, i as Bt, l as Vt, m as Ht, n as Ut, o as Wt, p as Gt, r as Kt, s as qt, t as Jt, u as Yt } from "./captions-COgPp5bH.js";
import { t as Xt } from "./LoginForm-D8YONCTg.js";
import { t as Zt } from "./SignupForm-euZPfAri.js";
import { t as Qt } from "./SettingsForm-Dz4g0Hwh.js";
import { Fragment as T, Teleport as $t, Transition as E, TransitionGroup as en, computed as D, createApp as tn, createBlock as O, createCommentVNode as k, createElementBlock as A, createElementVNode as j, createTextVNode as M, createVNode as N, defineAsyncComponent as nn, defineComponent as P, inject as rn, normalizeClass as F, normalizeStyle as I, onBeforeUnmount as L, onMounted as R, onScopeDispose as z, openBlock as B, readonly as an, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as on, toDisplayString as W, unref as G, useId as sn, vModelText as K, watch as q, watchEffect as cn, withCtx as J, withDirectives as Y, withKeys as ln, withModifiers as un } from "vue";
import { createPinia as dn } from "pinia";
import { RouterLink as X, RouterView as fn, createRouter as pn, createWebHistory as mn, useRouter as hn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var gn = ["aria-labelledby"], _n = {
	key: 0,
	class: "phlix-sheet__header"
}, vn = ["id"], yn = { class: "phlix-sheet__body" }, bn = {
	key: 1,
	class: "phlix-sheet__footer"
}, xn = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		q(() => n.modelValue, (e) => o.value = e);
		let s = V(null), c = sn();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), O($t, { to: "body" }, [N(E, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (B(), A("div", {
				key: 0,
				class: F(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: un(u, ["self"])
			}, [j("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), A("header", _n, [e.title ? (B(), A("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, vn)) : k("", !0), e.hideClose ? k("", !0) : (B(), O(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : k("", !0),
				j("div", yn, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), A("footer", bn, [U(t.$slots, "footer", {}, void 0, !0)])) : k("", !0)
			], 8, gn)], 34)) : k("", !0)]),
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
}, jn = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = V(!1), { t: o } = p();
		return (t, a) => (B(), A("div", Sn, [
			j("a", Cn, W(G(o)("shell.skipToContent")), 1),
			N(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			j("header", wn, [j("div", Tn, [
				j("div", En, [U(t.$slots, "logo", {}, () => [a[3] ||= j("span", { class: "shell__wordmark" }, [M("Phlix"), j("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				j("nav", {
					class: "shell__nav",
					"aria-label": G(o)("shell.primaryNav")
				}, [U(t.$slots, "nav", {}, void 0, !0)], 8, Dn),
				a[4] ||= j("span", { class: "shell__spacer" }, null, -1),
				j("div", On, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), O(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: G(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : k("", !0)
			])]),
			j("main", kn, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), A("footer", An, [U(t.$slots, "footer", {}, void 0, !0)])) : k("", !0),
			N(xn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: G(o)("shell.menu")
			}, {
				default: J(() => [j("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [U(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-db48fc6e"]]), Mn = /* @__PURE__ */ P({
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
		}, c = D(() => i[(i.indexOf(t.theme) + 1) % i.length]), l = D(() => o[t.theme] ?? "moon"), u = D(() => n("shell.themeToggleLabel", {
			current: s[t.theme] ?? t.theme,
			next: s[c.value]
		}));
		function d() {
			t.theme = c.value;
		}
		return (e, t) => (B(), O(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), Nn = ["aria-label", "aria-expanded"], Pn = {
	key: 0,
	class: "usermenu__avatar"
}, Fn = ["aria-label"], In = { class: "usermenu__head" }, Ln = { class: "usermenu__avatar usermenu__avatar--lg" }, Rn = { class: "usermenu__name" }, zn = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = hn(), a = rn("phlixConfig", null), o = D(() => a?.routerBase ?? "/app"), { t: s } = p(), c = V(!1), l = V(null), u = V(null), d = D(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = D(() => d.value.charAt(0).toUpperCase() || "A");
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
		return q(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
		}), L(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (B(), A("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [j("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": G(t).isLoggedIn ? G(s)("shell.accountNamed", { name: d.value }) : G(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [G(t).isLoggedIn ? (B(), A("span", Pn, W(f.value), 1)) : (B(), O(n, {
			key: 1,
			name: "user"
		}))], 8, Nn), c.value ? (B(), A("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": G(s)("shell.account"),
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), A(T, { key: 0 }, [
			j("div", In, [j("span", Ln, W(f.value), 1), j("span", Rn, W(d.value), 1)]),
			j("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [N(n, { name: "settings" }), M(" " + W(G(s)("shell.settings")), 1)]),
			j("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [N(n, { name: "log-out" }), M(" " + W(G(s)("shell.signOut")), 1)])
		], 64)) : (B(), A("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [N(n, { name: "user" }), M(" " + W(G(s)("shell.signIn")), 1)]))], 8, Fn)) : k("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Bn = ["aria-label"], Vn = ["src", "poster"], Hn = { class: "mini__body" }, Un = { class: "mini__title" }, Wn = { class: "mini__controls" }, Gn = ["aria-label"], Kn = ["aria-label"], qn = ["aria-label"], Jn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Yn = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = re(), { t: a } = p(), o = V(null), s = D(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = D(() => i.current?.name ?? ""), l = D(() => Math.max(0, Math.min(1, i.progress)));
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
		return q(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), L(() => {
			o.value?.pause?.();
		}), (e, t) => (B(), O(E, { name: "mini" }, {
			default: J(() => [s.value ? (B(), A("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": G(a)("player.miniPlayer")
			}, [
				j("video", {
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
				}, null, 40, Vn),
				j("div", Hn, [j("p", Un, W(c.value), 1), j("div", Wn, [
					j("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? G(a)("player.pause") : G(a)("player.play"),
						onClick: h
					}, [N(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Gn),
					j("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(a)("player.expand"),
						onClick: g
					}, [N(n, { name: "expand" })], 8, Kn),
					j("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": G(a)("player.closePlayer"),
						onClick: _
					}, [N(n, { name: "x" })], 8, qn)
				])]),
				j("div", Jn, [j("div", {
					class: "mini__progress-fill",
					style: I({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Bn)) : k("", !0)]),
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
	return cn(() => {
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
	let e = ce(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), z(() => document.removeEventListener("keydown", t)));
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
	i.length && z(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var dr = ["src", "alt"], fr = { class: "brand-wordmark" }, pr = {
	key: 1,
	class: "brand-tagline"
}, mr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "PhlixApp",
	setup(e) {
		ar();
		let t = ce(), i = hn(), { t: a } = p();
		or();
		let o = nn(() => import("./CommandPalette-BRIAAiSF.js")), s = V(!1);
		q(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${h.value}/player/${e}`);
		}
		let l = rn("phlixConfig", null);
		ur(sr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), d = D(() => l?.branding ?? {}), f = D(() => d.value.wordmark ?? "Phlix"), m = D(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), h = D(() => l?.routerBase ?? "/app");
		function g(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), O(jn, null, {
			logo: J(() => [N(G(X), {
				to: h.value,
				class: "brand"
			}, {
				default: J(() => [
					d.value.logoSrc ? (B(), A("img", {
						key: 0,
						src: d.value.logoSrc,
						alt: d.value.logoAlt ?? f.value,
						class: "brand-logo"
					}, null, 8, dr)) : k("", !0),
					j("span", fr, [M(W(f.value), 1), i[1] ||= j("span", { class: "brand-dot" }, ".", -1)]),
					d.value.tagline ? (B(), A("span", pr, W(d.value.tagline), 1)) : k("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [m.value.length ? (B(!0), A(T, { key: 0 }, H(m.value, (e) => (B(), O(on(e.href ? "a" : G(X)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? g(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: J(() => [e.icon ? (B(), O(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : k("", !0), M(" " + W(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (B(), A(T, { key: 1 }, [N(G(X), {
				to: h.value,
				class: "nav-link"
			}, {
				default: J(() => [M(W(G(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), N(G(X), {
				to: `${h.value}/settings`,
				class: "nav-link"
			}, {
				default: J(() => [M(W(G(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: J(() => [
				N(r, {
					name: "search",
					label: G(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => G(t).openPalette()
				}, null, 8, ["label"]),
				N(Mn),
				N(zn)
			]),
			default: J(() => [
				N(G(fn)),
				s.value ? (B(), O(G(o), { key: 0 })) : k("", !0),
				N(Yn, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1986daec"]]), hr = { class: "phlix-placeholder" }, gr = { class: "placeholder-content" }, _r = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), A("div", hr, [j("div", gr, [n[0] ||= j("h1", null, "Shared UI loading...", -1), j("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), vr = ["login", "signup"];
function yr(e, t) {
	let n = typeof e.name == "string" ? e.name : "";
	return vr.includes(n) || e.meta?.public === !0 || t ? !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function br() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function xr(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-C93VF1-W.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-Cv0dVKTw.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-D958-YpD.js")
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
		component: _r,
		props: { appName: e.app }
	}), n;
}
function Sr(e) {
	let t = {
		...br(),
		...e
	};
	ir(t.defaultTheme);
	let n = dn();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = pn({
		history: mn(),
		routes: xr(t)
	});
	r.beforeEach((e) => yr(e, b(n).isLoggedIn));
	let i = tn(mr);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Cr = ["id"], wr = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		let t = e, n = sn(), r = V(!1), i = V(null), a;
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
		return L(() => clearTimeout(a)), (t, a) => (B(), A("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: ln(c, ["esc"])
		}, [U(t.$slots, "default", {}, void 0, !0), N(E, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (B(), A("span", {
				key: 0,
				id: G(n),
				role: "tooltip",
				class: F(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [U(t.$slots, "content", {}, () => [M(W(e.text), 1)], !0)], 10, Cr)) : k("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Tr = ["aria-label"], Er = ["role"], Dr = { class: "phlix-toast__content" }, Or = {
	key: 0,
	class: "phlix-toast__title"
}, kr = { class: "phlix-toast__message" }, Ar = ["onClick"], jr = 0, Mr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = p(), i = S(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return R(() => {
			jr++;
		}), L(() => {
			jr--;
		}), (a, s) => (B(), O($t, { to: "body" }, [j("div", {
			class: F(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": G(t)("common.notifications")
		}, [N(en, { name: "phlix-toast" }, {
			default: J(() => [(B(!0), A(T, null, H(G(i).toasts, (e) => (B(), A("div", {
				key: e.id,
				class: F(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				N(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				j("div", Dr, [e.title ? (B(), A("p", Or, W(e.title), 1)) : k("", !0), j("p", kr, W(e.message), 1)]),
				e.action ? (B(), A("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(i).dismiss(e.id);
					}
				}, W(e.action.label), 9, Ar)) : k("", !0),
				N(r, {
					name: "x",
					label: G(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Er))), 128))]),
			_: 1
		})], 10, Tr)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), Nr = ["aria-label"], Pr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: r } = p(), i = D(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, a) => (B(), A("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? G(r)("common.loading"),
			style: I(i.value ? { fontSize: i.value } : void 0)
		}, [N(n, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Nr));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), Fr = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		return R(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), L(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (B(), O(on(e.tag), {
			ref_key: "el",
			ref: n,
			class: F(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: I({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Ir = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (B(), O(E, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: J(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Lr = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Rr = {
	key: 0,
	class: "library-scan__skel"
}, zr = {
	key: 3,
	class: "library-scan__table-wrap"
}, Br = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Vr = { class: "library-scan__name" }, Hr = {
	key: 0,
	class: "library-scan__paths"
}, Ur = { class: "library-scan__num" }, Wr = { class: "library-scan__date" }, Gr = ["data-testid"], Kr = {
	key: 0,
	class: "library-scan__error"
}, qr = { class: "library-scan__actions" }, Jr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = S(), r = V([]), i = V({}), a = V(!0), o = V(null);
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
		return R(s), (e, t) => (B(), A("section", Lr, [t[4] ||= j("header", { class: "library-scan__head" }, [j("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), j("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), A("div", Rr, [N(C, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), O(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: J(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[0] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), O(w, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (B(), A("div", zr, [j("table", Br, [t[3] ||= j("thead", null, [j("tr", null, [
			j("th", { scope: "col" }, "Library"),
			j("th", { scope: "col" }, "Type"),
			j("th", { scope: "col" }, "Items"),
			j("th", { scope: "col" }, "Last scan"),
			j("th", { scope: "col" }, "Status"),
			j("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), j("tbody", null, [(B(!0), A(T, null, H(r.value, (e) => (B(), A("tr", { key: e.id }, [
			j("td", null, [j("div", Vr, W(e.name), 1), e.paths.length ? (B(), A("div", Hr, W(e.paths.join(", ")), 1)) : k("", !0)]),
			j("td", null, W(e.type), 1),
			j("td", Ur, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			j("td", Wr, W(d(e.last_scan_at)), 1),
			j("td", null, [j("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [N(x, { tone: m(i.value[e.id]) }, {
				default: J(() => [M(W(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), A("span", Kr, W(i.value[e.id]?.error), 1)) : k("", !0)], 8, Gr)]),
			j("td", null, [j("div", qr, [N(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: J(() => [...t[1] ||= [M(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), N(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: J(() => [...t[2] ||= [M(" Rescan ", -1)]]),
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
function Yr(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Xr = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Zr = { class: "my-servers__head" }, Qr = {
	key: 0,
	class: "my-servers__skel"
}, $r = {
	key: 3,
	class: "my-servers__table-wrap"
}, ei = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, ti = { class: "my-servers__name" }, ni = { class: "my-servers__url" }, ri = { class: "my-servers__num" }, ii = { class: "my-servers__date" }, ai = ["data-testid"], oi = { class: "my-servers__actions" }, si = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = S(), r = b(), i = V([]), a = V(!0), o = V(null);
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
					last_seen: Yr(e.lastSeenAt)
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
		return R(s), (e, t) => (B(), A("section", Xr, [j("header", Zr, [t[1] ||= j("div", null, [j("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), j("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), N(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: J(() => [...t[0] ||= [M("Add server", -1)]]),
			_: 1
		})]), a.value ? (B(), A("div", Qr, [N(C, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), O(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: J(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[2] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (B(), O(w, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: J(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: J(() => [...t[3] ||= [M("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (B(), A("div", $r, [j("table", ei, [t[5] ||= j("thead", null, [j("tr", null, [
			j("th", { scope: "col" }, "Server"),
			j("th", { scope: "col" }, "Owner"),
			j("th", { scope: "col" }, "Libraries"),
			j("th", { scope: "col" }, "Last seen"),
			j("th", { scope: "col" }, "Status"),
			j("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), j("tbody", null, [(B(!0), A(T, null, H(i.value, (e) => (B(), A("tr", { key: e.id }, [
			j("td", null, [j("div", ti, W(e.name), 1), j("div", ni, W(e.url), 1)]),
			j("td", null, W(e.owner), 1),
			j("td", ri, W(e.library_count === void 0 ? "—" : e.library_count), 1),
			j("td", ii, W(c(e.last_seen)), 1),
			j("td", null, [j("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [N(x, { tone: u(e.status) }, {
				default: J(() => [M(W(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, ai)]),
			j("td", null, [j("div", oi, [N(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: J(() => [...t[4] ||= [M("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), ci = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, li = {
	key: 0,
	class: "federation__skel"
}, ui = {
	key: 2,
	class: "federation__content"
}, di = {
	key: 1,
	class: "federation__table-wrap"
}, fi = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, pi = { class: "federation__name" }, mi = { class: "federation__url" }, hi = { class: "federation__num" }, gi = { class: "federation__date" }, _i = ["data-testid"], vi = { class: "federation__actions" }, yi = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, bi = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = S(), r = V([]), i = V(!0), a = V(null), o = V(""), s = V(""), c = V(""), l = V(!1);
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
		return R(() => u(!0)), (e, t) => (B(), A("section", ci, [t[10] ||= j("header", { class: "federation__head" }, [j("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), j("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), A("div", li, [N(C, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), O(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: J(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: J(() => [...t[4] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (B(), A("div", ui, [
			t[9] ||= j("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), O(w, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), A("div", di, [j("table", fi, [t[6] ||= j("thead", null, [j("tr", null, [
				j("th", { scope: "col" }, "Peer"),
				j("th", { scope: "col" }, "Shared libraries"),
				j("th", { scope: "col" }, "Last sync"),
				j("th", { scope: "col" }, "Status"),
				j("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), j("tbody", null, [(B(!0), A(T, null, H(r.value, (e) => (B(), A("tr", { key: e.id }, [
				j("td", null, [j("div", pi, W(e.name), 1), j("div", mi, W(e.url), 1)]),
				j("td", hi, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				j("td", gi, W(p(e.last_sync)), 1),
				j("td", null, [j("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [N(x, { tone: g(e.status) }, {
					default: J(() => [M(W(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, _i)]),
				j("td", null, [j("div", vi, [N(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: J(() => [...t[5] ||= [M(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			j("section", yi, [t[8] ||= j("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), j("form", {
				class: "federation__form",
				onSubmit: un(d, ["prevent"])
			}, [
				Y(j("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[K, s.value]]),
				Y(j("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[K, o.value]]),
				Y(j("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[K, c.value]]),
				N(y, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: J(() => [...t[7] ||= [M(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), xi = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Si = {
	key: 0,
	class: "shares__skel"
}, Ci = {
	key: 3,
	class: "shares__table-wrap"
}, wi = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Ti = { class: "shares__library" }, Ei = { class: "shares__date" }, Di = { class: "shares__date" }, Oi = ["data-testid"], ki = { class: "shares__actions" }, Ai = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = S(), r = V([]), i = V(!0), a = V(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Yr(e.created_at) ?? "",
					expires_at: Yr(e.expires_at)
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
		return R(() => o(!0)), (e, t) => (B(), A("section", xi, [t[5] ||= j("header", { class: "shares__head" }, [j("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), j("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), A("div", Si, [N(C, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), O(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: J(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: J(() => [...t[1] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), O(w, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (B(), A("div", Ci, [j("table", wi, [t[4] ||= j("thead", null, [j("tr", null, [
			j("th", { scope: "col" }, "Library"),
			j("th", { scope: "col" }, "Shared with"),
			j("th", { scope: "col" }, "Permissions"),
			j("th", { scope: "col" }, "Created"),
			j("th", { scope: "col" }, "Expires"),
			j("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), j("tbody", null, [(B(!0), A(T, null, H(r.value, (e) => (B(), A("tr", { key: e.id }, [
			j("td", null, [j("span", Ti, W(e.library_name), 1)]),
			j("td", null, W(e.shared_with), 1),
			j("td", null, [N(x, { tone: u(e.permissions) }, {
				default: J(() => [M(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			j("td", Ei, W(c(e.created_at)), 1),
			j("td", Di, [j("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [M(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), O(x, {
				key: 0,
				tone: "error"
			}, {
				default: J(() => [...t[2] ||= [M("Expired", -1)]]),
				_: 1
			})) : k("", !0)], 8, Oi)]),
			j("td", null, [j("div", ki, [N(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: J(() => [...t[3] ||= [M(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]), ji = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, Mi = {
	key: 0,
	class: "audit__skel"
}, Ni = {
	key: 3,
	class: "audit__content"
}, Pi = { class: "audit__table-wrap" }, Fi = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, Ii = ["data-testid"], Li = { class: "audit__details" }, Ri = { class: "audit__ip" }, zi = { class: "audit__date" }, Bi = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, Vi = {
	class: "audit__page-info",
	"aria-live": "polite"
}, Hi = 50, Ui = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = S(), r = V([]), i = V(!0), a = V(null), o = V(1), s = V(1);
		async function c(e = 1) {
			i.value = !0, a.value = null;
			try {
				let n = Math.max(0, (e - 1) * Hi), i = await t.get("/api/v1/me/audit-logs", {
					limit: String(Hi),
					offset: String(n)
				}), a = i.limit && i.limit > 0 ? i.limit : Hi;
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
		return R(() => c()), (e, t) => (B(), A("section", ji, [t[7] ||= j("header", { class: "audit__head" }, [j("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), j("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), i.value ? (B(), A("div", Mi, [N(C, {
			variant: "text",
			lines: 8
		})])) : a.value ? (B(), O(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: a.value
		}, {
			actions: J(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(o.value)
			}, {
				default: J(() => [...t[3] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), O(w, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (B(), A("div", Ni, [j("div", Pi, [j("table", Fi, [t[4] ||= j("thead", null, [j("tr", null, [
			j("th", { scope: "col" }, "Action"),
			j("th", { scope: "col" }, "Actor"),
			j("th", { scope: "col" }, "Target"),
			j("th", { scope: "col" }, "Details"),
			j("th", { scope: "col" }, "IP"),
			j("th", { scope: "col" }, "Time")
		])], -1), j("tbody", null, [(B(!0), A(T, null, H(r.value, (e) => (B(), A("tr", { key: e.id }, [
			j("td", null, [j("span", { "data-testid": `action-${e.id}` }, [N(x, { tone: u(e.action) }, {
				default: J(() => [M(W(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Ii)]),
			j("td", null, W(e.actor), 1),
			j("td", null, W(e.target || "—"), 1),
			j("td", Li, W(e.details || "—"), 1),
			j("td", Ri, W(e.ip_address || "—"), 1),
			j("td", zi, W(l(e.created_at)), 1)
		]))), 128))])])]), s.value > 1 ? (B(), A("nav", Bi, [
			N(y, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: o.value <= 1,
				onClick: t[1] ||= (e) => c(o.value - 1)
			}, {
				default: J(() => [...t[5] ||= [M(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			j("span", Vi, "Page " + W(o.value) + " of " + W(s.value), 1),
			N(y, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: o.value >= s.value,
				onClick: t[2] ||= (e) => c(o.value + 1)
			}, {
				default: J(() => [...t[6] ||= [M(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : k("", !0)]))]));
	}
}), [["__scopeId", "data-v-3fcef29f"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Wi(e, t) {
	let n = xe(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = q(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = q(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/useOnline.ts
function Gi() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), z(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), an(t);
}
//#endregion
export { Oe as ALL_LOGS, _t as AMBIENT_SAMPLE_H, gt as AMBIENT_SAMPLE_INTERVAL_MS, ut as AMBIENT_SAMPLE_W, Ze as ARROW_ICONS, yt as ARROW_LABELS, Re as AdminBackupApi, ze as AdminCastApi, Ue as AdminCollectionsApi, ke as AdminDashboardApi, Be as AdminDlnaServerApi, We as AdminHistoryApi, Le as AdminIntegrationsApi, qe as AdminLibrariesApi, He as AdminLiveTvApi, De as AdminLogsApi, Ve as AdminRemoteAccessApi, Ie as AdminServicesApi, Je as AdminSettingsApi, Ge as AdminSyncPlayApi, Me as AdminUsersApi, Fe as AdminWebhooksApi, St as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, jn as AppLayout, Ui as AuditLogsPage, x as Badge, y as Button, Jt as CAPTION_BACKGROUND_OPTIONS, Ut as CAPTION_COLOR_OPTIONS, Kt as CAPTION_EDGE_OPTIONS, Bt as CAPTION_SIZE_OPTIONS, Pt as CAPTION_SIZE_SCALE, lt as CaptionOverlay, jt as CaptionsMenu, me as Chip, ye as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, vt as DIRECT_PLAY_EXTENSIONS, w as EmptyState, bi as FederationPage, Ce as FilterBar, n as Icon, r as IconButton, de as Kbd, Ke as LIBRARY_TYPES, Jr as LibraryScanPage, ne as LocalStorageTokenStore, Xt as LoginForm, Ai as ManageSharesPage, he as MediaCard, Ee as MediaDetail, be as MediaGrid, Se as MediaHomeRow, _e as MediaRow, Yn as MiniPlayer, we as Modal, si as MyServersPage, ee as NetworkError, it as PLAYER_SHORTCUTS, Ir as PageTransition, mr as PhlixApp, Ot as Player, et as QualityMenu, Ae as RATING_LABELS, je as RATING_OPTIONS, oe as RESUME_MAX_RATIO, ie as RESUME_MIN_SECONDS, Tt as ResumePrompt, Fr as Reveal, Ne as SUBSCRIBABLE_EVENTS, nt as Scrubber, ve as Select, Qt as SettingsForm, xn as Sheet, bt as ShortcutsHelp, Zt as SignupForm, C as Skeleton, fe as Slider, $e as SpeedMenu, Pr as Spinner, pe as Switch, dt as TRANSCODE_EXTENSIONS, Te as Tabs, te as TimeoutError, Mr as ToastHost, wr as Tooltip, Ct as TranscodeNotice, wt as UPNEXT_COUNTDOWN_SECONDS, Dt as UPNEXT_RING_CIRCUMFERENCE, pt as UPNEXT_RING_RADIUS, Et as UpNext, ot as VolumeControl, Pe as WEBHOOK_EVENT_CATEGORIES, Wt as activeAudioIndex, Xe as adminMenu, At as ambientGradient, qt as applyAudioTrack, ir as applyStoredThemeEarly, Ft as applyTrackModes, Nt as averageRegion, Wi as bindMediaStoreToRouter, Ye as buildAdminRoutes, se as buildMediaQuery, ae as buildMediaUrl, Vt as captionStyleVars, Yt as cleanCueText, Sr as createPhlixApp, f as createTranslator, tr as deriveAccentVars, It as edgeShadow, h as errMessage, xt as extensionOf, rt as formatTime, le as fuzzyScore, at as handleShortcut, Lt as hasActiveCaptions, c as hasStoredPreferences, ft as isBatterySaving, kt as isFatalMediaError, g as isOffline, st as isTypingTarget, Gt as listAudioTracks, Ht as listSubtitleTracks, ue as matchCommand, u as mergeMessages, mt as needsTranscode, zt as readActiveCueLines, o as readStoredPreferences, Rt as resolveTextTrack, Mt as rgbString, ct as rgbaString, ht as ringDashoffset, Qe as sampleAmbient, b as useAuthStore, or as useCommandPaletteHotkey, ce as useCommandStore, i as useFocusTrap, tt as useKeyboardShortcuts, xe as useMediaStore, p as useMessages, Gi as useOnline, re as usePlayerStore, ur as usePreconnect, a as usePreferencesStore, ge as usePrefetch, ar as useTheme, S as useToastStore };

//# sourceMappingURL=phlix-ui.js.map