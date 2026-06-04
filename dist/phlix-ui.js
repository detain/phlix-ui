import { r as e } from "./AuthField-BC7YjKhv.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Cvd20ZUW.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BwQkyEkr.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-CB5g_qzR.js";
import { a as re, i as ie, n as ae, o as x, r as oe, t as se } from "./media-query-D1H7YKGl.js";
import { i as ce, n as le, r as ue, t as de } from "./Kbd-CSMm1T0l.js";
import { t as S } from "./Badge-ArWL5-WE.js";
import { t as fe } from "./Slider-BMn_Lp_q.js";
import { t as pe } from "./Switch-CFZhdkXR.js";
import { i as me, n as he, r as ge, t as _e } from "./MediaRow-Srl6gXC7.js";
import { t as ve } from "./Select-Ba3KZxNb.js";
import { a as ye, i as be, n as xe, r as Se, t as Ce } from "./FilterBar-LazdAMY5.js";
import { t as we } from "./Modal-BkvvzvD7.js";
import { t as C } from "./useToastStore-BDoKlU6N.js";
import { n as w, t as T } from "./EmptyState-Ds4WcVdG.js";
import { t as Te } from "./Tabs-x8dUKZN5.js";
import { t as Ee } from "./MediaDetail-CnFev6XD.js";
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
import { A as Ze, C as Qe, D as $e, E as et, F as tt, I as nt, L as rt, M as it, N as at, O as ot, P as st, S as ct, T as lt, _ as ut, a as dt, b as ft, c as pt, d as mt, f as ht, g as gt, h as _t, i as vt, j as yt, k as bt, l as xt, m as St, n as Ct, o as wt, p as Tt, r as Et, s as Dt, t as Ot, u as kt, v as At, w as jt, x as Mt, y as Nt } from "./Player-BB-aS_WN.js";
import { a as Pt, c as Ft, d as It, f as Lt, g as Rt, h as zt, i as Bt, l as Vt, m as Ht, n as Ut, o as Wt, p as Gt, r as Kt, s as qt, t as Jt, u as Yt } from "./captions-COgPp5bH.js";
import { t as Xt } from "./LoginForm-D8YONCTg.js";
import { t as Zt } from "./SignupForm-euZPfAri.js";
import { t as Qt } from "./SettingsForm-Dz4g0Hwh.js";
import { Fragment as E, Teleport as $t, Transition as D, TransitionGroup as en, computed as O, createApp as tn, createBlock as k, createCommentVNode as A, createElementBlock as j, createElementVNode as M, createTextVNode as N, createVNode as P, defineAsyncComponent as nn, defineComponent as F, inject as rn, normalizeClass as I, normalizeStyle as an, onBeforeUnmount as L, onMounted as R, onScopeDispose as z, openBlock as B, readonly as on, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as sn, toDisplayString as W, unref as G, useId as cn, vModelText as K, watch as q, watchEffect as ln, withCtx as J, withDirectives as Y, withKeys as un, withModifiers as dn } from "vue";
import { createPinia as fn } from "pinia";
import { RouterLink as X, RouterView as pn, createRouter as mn, createWebHistory as hn, useRouter as gn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var _n = ["aria-labelledby"], vn = {
	key: 0,
	class: "phlix-sheet__header"
}, yn = ["id"], bn = { class: "phlix-sheet__body" }, xn = {
	key: 1,
	class: "phlix-sheet__footer"
}, Sn = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let s = V(null), c = cn();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), k($t, { to: "body" }, [P(D, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (B(), j("div", {
				key: 0,
				class: I(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: dn(u, ["self"])
			}, [M("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), j("header", vn, [e.title ? (B(), j("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, yn)) : A("", !0), e.hideClose ? A("", !0) : (B(), k(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : A("", !0),
				M("div", bn, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), j("footer", xn, [U(t.$slots, "footer", {}, void 0, !0)])) : A("", !0)
			], 8, _n)], 34)) : A("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), Cn = { class: "shell" }, wn = {
	class: "shell__skip",
	href: "#main"
}, Tn = { class: "shell__bar" }, En = { class: "shell__inner" }, Dn = { class: "shell__brand" }, On = ["aria-label"], kn = { class: "shell__actions" }, An = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, jn = {
	key: 0,
	class: "shell__footer"
}, Mn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = V(!1), { t: o } = p();
		return (t, a) => (B(), j("div", Cn, [
			M("a", wn, W(G(o)("shell.skipToContent")), 1),
			P(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			M("header", Tn, [M("div", En, [
				M("div", Dn, [U(t.$slots, "logo", {}, () => [a[3] ||= M("span", { class: "shell__wordmark" }, [N("Phlix"), M("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				M("nav", {
					class: "shell__nav",
					"aria-label": G(o)("shell.primaryNav")
				}, [U(t.$slots, "nav", {}, void 0, !0)], 8, On),
				a[4] ||= M("span", { class: "shell__spacer" }, null, -1),
				M("div", kn, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), k(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: G(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : A("", !0)
			])]),
			M("main", An, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), j("footer", jn, [U(t.$slots, "footer", {}, void 0, !0)])) : A("", !0),
			P(Sn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: G(o)("shell.menu")
			}, {
				default: J(() => [M("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [U(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-db48fc6e"]]), Nn = /* @__PURE__ */ F({
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
		return (e, t) => (B(), k(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), Pn = ["aria-label", "aria-expanded"], Fn = {
	key: 0,
	class: "usermenu__avatar"
}, In = ["aria-label"], Ln = { class: "usermenu__head" }, Rn = { class: "usermenu__avatar usermenu__avatar--lg" }, zn = { class: "usermenu__name" }, Bn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = gn(), a = rn("phlixConfig", null), o = O(() => a?.routerBase ?? "/app"), { t: s } = p(), c = V(!1), l = V(null), u = V(null), d = O(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = O(() => d.value.charAt(0).toUpperCase() || "A");
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
		}), (e, r) => (B(), j("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [M("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": G(t).isLoggedIn ? G(s)("shell.accountNamed", { name: d.value }) : G(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [G(t).isLoggedIn ? (B(), j("span", Fn, W(f.value), 1)) : (B(), k(n, {
			key: 1,
			name: "user"
		}))], 8, Pn), c.value ? (B(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": G(s)("shell.account"),
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), j(E, { key: 0 }, [
			M("div", Ln, [M("span", Rn, W(f.value), 1), M("span", zn, W(d.value), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [P(n, { name: "settings" }), N(" " + W(G(s)("shell.settings")), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [P(n, { name: "log-out" }), N(" " + W(G(s)("shell.signOut")), 1)])
		], 64)) : (B(), j("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [P(n, { name: "user" }), N(" " + W(G(s)("shell.signIn")), 1)]))], 8, In)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Vn = ["aria-label"], Hn = ["src", "poster"], Un = { class: "mini__body" }, Wn = { class: "mini__title" }, Gn = { class: "mini__controls" }, Kn = ["aria-label"], qn = ["aria-label"], Jn = ["aria-label"], Yn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Xn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = V(null), s = O(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = O(() => i.current?.name ?? ""), l = O(() => Math.max(0, Math.min(1, i.progress)));
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
		}), (e, t) => (B(), k(D, { name: "mini" }, {
			default: J(() => [s.value ? (B(), j("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": G(a)("player.miniPlayer")
			}, [
				M("video", {
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
				}, null, 40, Hn),
				M("div", Un, [M("p", Wn, W(c.value), 1), M("div", Gn, [
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? G(a)("player.pause") : G(a)("player.play"),
						onClick: h
					}, [P(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Kn),
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(a)("player.expand"),
						onClick: g
					}, [P(n, { name: "expand" })], 8, qn),
					M("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": G(a)("player.closePlayer"),
						onClick: _
					}, [P(n, { name: "x" })], 8, Jn)
				])]),
				M("div", Yn, [M("div", {
					class: "mini__progress-fill",
					style: an({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Vn)) : A("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function Zn(e) {
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
var er = ({ r: e, g: t, b: n }, r) => `rgba(${Z(e)}, ${Z(t)}, ${Z(n)}, ${r})`;
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
	let t = Zn(e);
	if (!t) return null;
	let n = tr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Q(t),
		"--accent-hover": Q(Qn(t, .12)),
		"--accent-active": Q($n(t, .12)),
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
	return ln(() => {
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
	i.length && z(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function fr() {
	let e = x(), t = b();
	async function n() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {};
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / re));
			}
			e.mergeServerResume(r);
		} catch {}
	}
	return { syncResume: n };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var pr = ["src", "alt"], mr = { class: "brand-wordmark" }, hr = {
	key: 1,
	class: "brand-tagline"
}, gr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PhlixApp",
	setup(e) {
		or();
		let t = ce(), i = gn(), { t: a } = p();
		sr();
		let o = nn(() => import("./CommandPalette-BRIAAiSF.js")), s = V(!1);
		q(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = rn("phlixConfig", null);
		dr(cr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = fr();
		q(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 });
		let f = O(() => l?.branding ?? {}), m = O(() => f.value.wordmark ?? "Phlix"), h = O(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = O(() => l?.routerBase ?? "/app");
		function _(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), k(Mn, null, {
			logo: J(() => [P(G(X), {
				to: g.value,
				class: "brand"
			}, {
				default: J(() => [
					f.value.logoSrc ? (B(), j("img", {
						key: 0,
						src: f.value.logoSrc,
						alt: f.value.logoAlt ?? m.value,
						class: "brand-logo"
					}, null, 8, pr)) : A("", !0),
					M("span", mr, [N(W(m.value), 1), i[1] ||= M("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (B(), j("span", hr, W(f.value.tagline), 1)) : A("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [h.value.length ? (B(!0), j(E, { key: 0 }, H(h.value, (e) => (B(), k(sn(e.href ? "a" : G(X)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? _(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: J(() => [e.icon ? (B(), k(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : A("", !0), N(" " + W(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (B(), j(E, { key: 1 }, [P(G(X), {
				to: g.value,
				class: "nav-link"
			}, {
				default: J(() => [N(W(G(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), P(G(X), {
				to: `${g.value}/settings`,
				class: "nav-link"
			}, {
				default: J(() => [N(W(G(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: J(() => [
				P(r, {
					name: "search",
					label: G(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => G(t).openPalette()
				}, null, 8, ["label"]),
				P(Nn),
				P(Bn)
			]),
			default: J(() => [
				P(G(pn)),
				s.value ? (B(), k(G(o), { key: 0 })) : A("", !0),
				P(Xn, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-722398a2"]]), _r = { class: "phlix-placeholder" }, vr = { class: "placeholder-content" }, yr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), j("div", _r, [M("div", vr, [n[0] ||= M("h1", null, "Shared UI loading...", -1), M("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), br = ["login", "signup"];
function xr(e, t) {
	let n = typeof e.name == "string" ? e.name : "";
	return br.includes(n) || e.meta?.public === !0 || t ? !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Sr() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Cr(e) {
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
		component: yr,
		props: { appName: e.app }
	}), n;
}
function wr(e) {
	let t = {
		...Sr(),
		...e
	};
	ar(t.defaultTheme);
	let n = fn();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = mn({
		history: hn(),
		routes: Cr(t)
	});
	r.beforeEach((e) => xr(e, b(n).isLoggedIn));
	let i = tn(gr);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Tr = ["id"], Er = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let t = e, n = cn(), r = V(!1), i = V(null), a;
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
		return L(() => clearTimeout(a)), (t, a) => (B(), j("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: un(c, ["esc"])
		}, [U(t.$slots, "default", {}, void 0, !0), P(D, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (B(), j("span", {
				key: 0,
				id: G(n),
				role: "tooltip",
				class: I(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [U(t.$slots, "content", {}, () => [N(W(e.text), 1)], !0)], 10, Tr)) : A("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Dr = ["aria-label"], Or = ["role"], kr = { class: "phlix-toast__content" }, Ar = {
	key: 0,
	class: "phlix-toast__title"
}, jr = { class: "phlix-toast__message" }, Mr = ["onClick"], Nr = 0, Pr = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		return R(() => {
			Nr++;
		}), L(() => {
			Nr--;
		}), (a, s) => (B(), k($t, { to: "body" }, [M("div", {
			class: I(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": G(t)("common.notifications")
		}, [P(en, { name: "phlix-toast" }, {
			default: J(() => [(B(!0), j(E, null, H(G(i).toasts, (e) => (B(), j("div", {
				key: e.id,
				class: I(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				P(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				M("div", kr, [e.title ? (B(), j("p", Ar, W(e.title), 1)) : A("", !0), M("p", jr, W(e.message), 1)]),
				e.action ? (B(), j("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(i).dismiss(e.id);
					}
				}, W(e.action.label), 9, Mr)) : A("", !0),
				P(r, {
					name: "x",
					label: G(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Or))), 128))]),
			_: 1
		})], 10, Dr)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), Fr = ["aria-label"], Ir = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Spinner",
	props: {
		size: {},
		label: {}
	},
	setup(e) {
		let t = e, { t: r } = p(), i = O(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, a) => (B(), j("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label ?? G(r)("common.loading"),
			style: an(i.value ? { fontSize: i.value } : void 0)
		}, [P(n, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Fr));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), Lr = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		}), (t, a) => (B(), k(sn(e.tag), {
			ref_key: "el",
			ref: n,
			class: I(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: an({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Rr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (B(), k(D, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: J(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), zr = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Br = {
	key: 0,
	class: "library-scan__skel"
}, Vr = {
	key: 3,
	class: "library-scan__table-wrap"
}, Hr = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Ur = { class: "library-scan__name" }, Wr = {
	key: 0,
	class: "library-scan__paths"
}, Gr = { class: "library-scan__num" }, Kr = { class: "library-scan__date" }, qr = ["data-testid"], Jr = {
	key: 0,
	class: "library-scan__error"
}, Yr = { class: "library-scan__actions" }, Xr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = V([]), i = V({}), a = V(!0), o = V(null);
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
		return R(s), (e, t) => (B(), j("section", zr, [t[4] ||= M("header", { class: "library-scan__head" }, [M("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), M("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), j("div", Br, [P(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: J(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[0] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), k(T, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (B(), j("div", Vr, [M("table", Hr, [t[3] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Type"),
			M("th", { scope: "col" }, "Items"),
			M("th", { scope: "col" }, "Last scan"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(B(!0), j(E, null, H(r.value, (e) => (B(), j("tr", { key: e.id }, [
			M("td", null, [M("div", Ur, W(e.name), 1), e.paths.length ? (B(), j("div", Wr, W(e.paths.join(", ")), 1)) : A("", !0)]),
			M("td", null, W(e.type), 1),
			M("td", Gr, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			M("td", Kr, W(d(e.last_scan_at)), 1),
			M("td", null, [M("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [P(S, { tone: m(i.value[e.id]) }, {
				default: J(() => [N(W(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), j("span", Jr, W(i.value[e.id]?.error), 1)) : A("", !0)], 8, qr)]),
			M("td", null, [M("div", Yr, [P(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: J(() => [...t[1] ||= [N(" Scan ", -1)]]),
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
				default: J(() => [...t[2] ||= [N(" Rescan ", -1)]]),
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
function Zr(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Qr = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, $r = { class: "my-servers__head" }, ei = {
	key: 0,
	class: "my-servers__skel"
}, ti = {
	key: 3,
	class: "my-servers__table-wrap"
}, ni = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, ri = { class: "my-servers__name" }, ii = { class: "my-servers__url" }, ai = { class: "my-servers__num" }, oi = { class: "my-servers__date" }, si = ["data-testid"], ci = { class: "my-servers__actions" }, li = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = b(), i = V([]), a = V(!0), o = V(null);
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
					last_seen: Zr(e.lastSeenAt)
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
		return R(s), (e, t) => (B(), j("section", Qr, [M("header", $r, [t[1] ||= M("div", null, [M("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), M("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), P(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: J(() => [...t[0] ||= [N("Add server", -1)]]),
			_: 1
		})]), a.value ? (B(), j("div", ei, [P(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: J(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[2] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (B(), k(T, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: J(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: J(() => [...t[3] ||= [N("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (B(), j("div", ti, [M("table", ni, [t[5] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Server"),
			M("th", { scope: "col" }, "Owner"),
			M("th", { scope: "col" }, "Libraries"),
			M("th", { scope: "col" }, "Last seen"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(B(!0), j(E, null, H(i.value, (e) => (B(), j("tr", { key: e.id }, [
			M("td", null, [M("div", ri, W(e.name), 1), M("div", ii, W(e.url), 1)]),
			M("td", null, W(e.owner), 1),
			M("td", ai, W(e.library_count === void 0 ? "—" : e.library_count), 1),
			M("td", oi, W(c(e.last_seen)), 1),
			M("td", null, [M("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [P(S, { tone: u(e.status) }, {
				default: J(() => [N(W(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, si)]),
			M("td", null, [M("div", ci, [P(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: J(() => [...t[4] ||= [N("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), ui = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, di = {
	key: 0,
	class: "federation__skel"
}, fi = {
	key: 2,
	class: "federation__content"
}, pi = {
	key: 1,
	class: "federation__table-wrap"
}, mi = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, hi = { class: "federation__name" }, gi = { class: "federation__url" }, _i = { class: "federation__num" }, vi = { class: "federation__date" }, yi = ["data-testid"], bi = { class: "federation__actions" }, xi = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, Si = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = V([]), i = V(!0), a = V(null), o = V(""), s = V(""), c = V(""), l = V(!1);
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
		return R(() => u(!0)), (e, t) => (B(), j("section", ui, [t[10] ||= M("header", { class: "federation__head" }, [M("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), M("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), j("div", di, [P(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: J(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: J(() => [...t[4] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (B(), j("div", fi, [
			t[9] ||= M("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), k(T, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), j("div", pi, [M("table", mi, [t[6] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Peer"),
				M("th", { scope: "col" }, "Shared libraries"),
				M("th", { scope: "col" }, "Last sync"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(B(!0), j(E, null, H(r.value, (e) => (B(), j("tr", { key: e.id }, [
				M("td", null, [M("div", hi, W(e.name), 1), M("div", gi, W(e.url), 1)]),
				M("td", _i, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				M("td", vi, W(p(e.last_sync)), 1),
				M("td", null, [M("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [P(S, { tone: g(e.status) }, {
					default: J(() => [N(W(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, yi)]),
				M("td", null, [M("div", bi, [P(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: J(() => [...t[5] ||= [N(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			M("section", xi, [t[8] ||= M("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), M("form", {
				class: "federation__form",
				onSubmit: dn(d, ["prevent"])
			}, [
				Y(M("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[K, s.value]]),
				Y(M("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[K, o.value]]),
				Y(M("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[K, c.value]]),
				P(y, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: J(() => [...t[7] ||= [N(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), Ci = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, wi = {
	key: 0,
	class: "shares__skel"
}, Ti = {
	key: 3,
	class: "shares__table-wrap"
}, Ei = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Di = { class: "shares__library" }, Oi = { class: "shares__date" }, ki = { class: "shares__date" }, Ai = ["data-testid"], ji = { class: "shares__actions" }, Mi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = V([]), i = V(!0), a = V(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Zr(e.created_at) ?? "",
					expires_at: Zr(e.expires_at)
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
		return R(() => o(!0)), (e, t) => (B(), j("section", Ci, [t[5] ||= M("header", { class: "shares__head" }, [M("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), M("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), j("div", wi, [P(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: J(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: J(() => [...t[1] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), k(T, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (B(), j("div", Ti, [M("table", Ei, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Shared with"),
			M("th", { scope: "col" }, "Permissions"),
			M("th", { scope: "col" }, "Created"),
			M("th", { scope: "col" }, "Expires"),
			M("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(B(!0), j(E, null, H(r.value, (e) => (B(), j("tr", { key: e.id }, [
			M("td", null, [M("span", Di, W(e.library_name), 1)]),
			M("td", null, W(e.shared_with), 1),
			M("td", null, [P(S, { tone: u(e.permissions) }, {
				default: J(() => [N(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			M("td", Oi, W(c(e.created_at)), 1),
			M("td", ki, [M("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [N(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), k(S, {
				key: 0,
				tone: "error"
			}, {
				default: J(() => [...t[2] ||= [N("Expired", -1)]]),
				_: 1
			})) : A("", !0)], 8, Ai)]),
			M("td", null, [M("div", ji, [P(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: J(() => [...t[3] ||= [N(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]), Ni = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, Pi = {
	key: 0,
	class: "audit__skel"
}, Fi = {
	key: 3,
	class: "audit__content"
}, Ii = { class: "audit__table-wrap" }, Li = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, Ri = ["data-testid"], zi = { class: "audit__details" }, Bi = { class: "audit__ip" }, Vi = { class: "audit__date" }, Hi = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, Ui = {
	class: "audit__page-info",
	"aria-live": "polite"
}, Wi = 50, Gi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = V([]), i = V(!0), a = V(null), o = V(1), s = V(1);
		async function c(e = 1) {
			i.value = !0, a.value = null;
			try {
				let n = Math.max(0, (e - 1) * Wi), i = await t.get("/api/v1/me/audit-logs", {
					limit: String(Wi),
					offset: String(n)
				}), a = i.limit && i.limit > 0 ? i.limit : Wi;
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
		return R(() => c()), (e, t) => (B(), j("section", Ni, [t[7] ||= M("header", { class: "audit__head" }, [M("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), M("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), i.value ? (B(), j("div", Pi, [P(w, {
			variant: "text",
			lines: 8
		})])) : a.value ? (B(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: a.value
		}, {
			actions: J(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(o.value)
			}, {
				default: J(() => [...t[3] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), k(T, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (B(), j("div", Fi, [M("div", Ii, [M("table", Li, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Action"),
			M("th", { scope: "col" }, "Actor"),
			M("th", { scope: "col" }, "Target"),
			M("th", { scope: "col" }, "Details"),
			M("th", { scope: "col" }, "IP"),
			M("th", { scope: "col" }, "Time")
		])], -1), M("tbody", null, [(B(!0), j(E, null, H(r.value, (e) => (B(), j("tr", { key: e.id }, [
			M("td", null, [M("span", { "data-testid": `action-${e.id}` }, [P(S, { tone: u(e.action) }, {
				default: J(() => [N(W(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Ri)]),
			M("td", null, W(e.actor), 1),
			M("td", null, W(e.target || "—"), 1),
			M("td", zi, W(e.details || "—"), 1),
			M("td", Bi, W(e.ip_address || "—"), 1),
			M("td", Vi, W(l(e.created_at)), 1)
		]))), 128))])])]), s.value > 1 ? (B(), j("nav", Hi, [
			P(y, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: o.value <= 1,
				onClick: t[1] ||= (e) => c(o.value - 1)
			}, {
				default: J(() => [...t[5] ||= [N(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			M("span", Ui, "Page " + W(o.value) + " of " + W(s.value), 1),
			P(y, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: o.value >= s.value,
				onClick: t[2] ||= (e) => c(o.value + 1)
			}, {
				default: J(() => [...t[6] ||= [N(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : A("", !0)]))]));
	}
}), [["__scopeId", "data-v-3fcef29f"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Ki(e, t) {
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
function qi() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), z(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), on(t);
}
//#endregion
export { Oe as ALL_LOGS, _t as AMBIENT_SAMPLE_H, gt as AMBIENT_SAMPLE_INTERVAL_MS, ut as AMBIENT_SAMPLE_W, Ze as ARROW_ICONS, yt as ARROW_LABELS, Re as AdminBackupApi, ze as AdminCastApi, Ue as AdminCollectionsApi, ke as AdminDashboardApi, Be as AdminDlnaServerApi, We as AdminHistoryApi, Le as AdminIntegrationsApi, qe as AdminLibrariesApi, He as AdminLiveTvApi, De as AdminLogsApi, Ve as AdminRemoteAccessApi, Ie as AdminServicesApi, Je as AdminSettingsApi, Ge as AdminSyncPlayApi, Me as AdminUsersApi, Fe as AdminWebhooksApi, St as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, Mn as AppLayout, Gi as AuditLogsPage, S as Badge, y as Button, Jt as CAPTION_BACKGROUND_OPTIONS, Ut as CAPTION_COLOR_OPTIONS, Kt as CAPTION_EDGE_OPTIONS, Bt as CAPTION_SIZE_OPTIONS, Pt as CAPTION_SIZE_SCALE, lt as CaptionOverlay, jt as CaptionsMenu, me as Chip, ye as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, vt as DIRECT_PLAY_EXTENSIONS, T as EmptyState, Si as FederationPage, Ce as FilterBar, n as Icon, r as IconButton, de as Kbd, Ke as LIBRARY_TYPES, Xr as LibraryScanPage, ne as LocalStorageTokenStore, Xt as LoginForm, Mi as ManageSharesPage, he as MediaCard, Ee as MediaDetail, be as MediaGrid, Se as MediaHomeRow, _e as MediaRow, Xn as MiniPlayer, we as Modal, li as MyServersPage, ee as NetworkError, it as PLAYER_SHORTCUTS, Rr as PageTransition, gr as PhlixApp, Ot as Player, et as QualityMenu, Ae as RATING_LABELS, je as RATING_OPTIONS, oe as RESUME_MAX_RATIO, ie as RESUME_MIN_SECONDS, Tt as ResumePrompt, Lr as Reveal, Ne as SUBSCRIBABLE_EVENTS, nt as Scrubber, ve as Select, Qt as SettingsForm, Sn as Sheet, bt as ShortcutsHelp, Zt as SignupForm, w as Skeleton, fe as Slider, $e as SpeedMenu, Ir as Spinner, pe as Switch, dt as TRANSCODE_EXTENSIONS, Te as Tabs, te as TimeoutError, Pr as ToastHost, Er as Tooltip, Ct as TranscodeNotice, wt as UPNEXT_COUNTDOWN_SECONDS, Dt as UPNEXT_RING_CIRCUMFERENCE, pt as UPNEXT_RING_RADIUS, Et as UpNext, ot as VolumeControl, Pe as WEBHOOK_EVENT_CATEGORIES, Wt as activeAudioIndex, Xe as adminMenu, At as ambientGradient, qt as applyAudioTrack, ar as applyStoredThemeEarly, Ft as applyTrackModes, Nt as averageRegion, Ki as bindMediaStoreToRouter, Ye as buildAdminRoutes, se as buildMediaQuery, ae as buildMediaUrl, Vt as captionStyleVars, Yt as cleanCueText, wr as createPhlixApp, f as createTranslator, nr as deriveAccentVars, It as edgeShadow, h as errMessage, xt as extensionOf, rt as formatTime, le as fuzzyScore, at as handleShortcut, Lt as hasActiveCaptions, c as hasStoredPreferences, ft as isBatterySaving, kt as isFatalMediaError, g as isOffline, st as isTypingTarget, Gt as listAudioTracks, Ht as listSubtitleTracks, ue as matchCommand, u as mergeMessages, mt as needsTranscode, zt as readActiveCueLines, o as readStoredPreferences, Rt as resolveTextTrack, Mt as rgbString, ct as rgbaString, ht as ringDashoffset, Qe as sampleAmbient, b as useAuthStore, sr as useCommandPaletteHotkey, ce as useCommandStore, i as useFocusTrap, tt as useKeyboardShortcuts, xe as useMediaStore, p as useMessages, qi as useOnline, x as usePlayerStore, dr as usePreconnect, a as usePreferencesStore, ge as usePrefetch, fr as useResumeSync, or as useTheme, C as useToastStore };

//# sourceMappingURL=phlix-ui.js.map