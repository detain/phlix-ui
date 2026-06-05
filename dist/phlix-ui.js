import { r as e } from "./AuthField-BV9K8QhV.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-D7StdIzu.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BwQkyEkr.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-DdW4mkuI.js";
import { a as x, i as re, n as ie, o as S, r as ae, t as oe } from "./media-query-D1H7YKGl.js";
import { i as se, n as ce, r as le, t as ue } from "./Kbd-CSMm1T0l.js";
import { t as C } from "./Badge-ArWL5-WE.js";
import { t as de } from "./Slider-BMn_Lp_q.js";
import { t as fe } from "./Switch-CFZhdkXR.js";
import { i as pe, n as me, r as he, t as ge } from "./MediaRow-Srl6gXC7.js";
import { t as _e } from "./Select-DfIQHE9A.js";
import { a as ve, i as ye, n as be, r as xe, t as Se } from "./FilterBar-DaXATino.js";
import { t as Ce } from "./Modal-twmWG3l1.js";
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
import { t as Je } from "./hubDashboard-BhOaaDD-.js";
import { A as Ye, C as Xe, D as Ze, E as Qe, F as $e, I as et, L as tt, M as nt, N as rt, O as it, P as at, R as ot, S as st, T as ct, _ as lt, a as ut, b as dt, c as ft, d as pt, f as mt, g as ht, h as gt, i as _t, j as vt, k as yt, l as bt, m as xt, n as St, o as Ct, p as wt, r as Tt, s as Et, t as Dt, u as Ot, v as kt, w as At, x as jt, y as Mt } from "./Player-C_rJOD0T.js";
import { a as Nt, c as Pt, d as Ft, f as It, g as Lt, h as Rt, i as zt, l as Bt, m as Vt, n as Ht, o as Ut, p as Wt, r as Gt, s as Kt, t as qt, u as Jt } from "./captions-COgPp5bH.js";
import { t as Yt } from "./LoginForm-Cvva-IsM.js";
import { t as Xt } from "./SignupForm-hLfofPCG.js";
import { t as Zt } from "./SettingsForm-Ctcj-hfA.js";
import { Fragment as D, Teleport as Qt, Transition as O, TransitionGroup as $t, computed as k, createApp as en, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as tn, defineComponent as I, inject as nn, normalizeClass as L, normalizeStyle as R, onBeforeUnmount as z, onMounted as B, onScopeDispose as V, openBlock as H, readonly as rn, ref as U, renderList as W, renderSlot as G, resolveDynamicComponent as an, toDisplayString as K, unref as q, useId as on, vModelText as sn, watch as J, watchEffect as cn, withCtx as Y, withDirectives as ln, withKeys as un, withModifiers as dn } from "vue";
import { createPinia as fn } from "pinia";
import { RouterLink as X, RouterView as pn, createRouter as mn, createWebHistory as hn, useRouter as gn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var _n = ["aria-labelledby"], vn = {
	key: 0,
	class: "phlix-sheet__header"
}, yn = ["id"], bn = { class: "phlix-sheet__body" }, xn = {
	key: 1,
	class: "phlix-sheet__footer"
}, Sn = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let s = U(null), c = on();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (H(), A(Qt, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: Y(() => [e.modelValue ? (H(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: dn(u, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? q(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (H(), M("header", vn, [e.title ? (H(), M("h2", {
					key: 0,
					id: q(c),
					class: "phlix-sheet__title"
				}, K(e.title), 9, yn)) : j("", !0), e.hideClose ? j("", !0) : (H(), A(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : j("", !0),
				N("div", bn, [G(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (H(), M("footer", xn, [G(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, _n)], 34)) : j("", !0)]),
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
}, Mn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = U(!1), { t: o } = p();
		return (t, a) => (H(), M("div", Cn, [
			N("a", wn, K(q(o)("shell.skipToContent")), 1),
			F(e, { enabled: q(n).atmosphere }, null, 8, ["enabled"]),
			N("header", Tn, [N("div", En, [
				N("div", Dn, [G(t.$slots, "logo", {}, () => [a[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", {
					class: "shell__nav",
					"aria-label": q(o)("shell.primaryNav")
				}, [G(t.$slots, "nav", {}, void 0, !0)], 8, On),
				a[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", kn, [G(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (H(), A(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: q(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : j("", !0)
			])]),
			N("main", An, [G(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (H(), M("footer", jn, [G(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(Sn, {
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
}), [["__scopeId", "data-v-db48fc6e"]]), Nn = /* @__PURE__ */ I({
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
}), Pn = ["aria-label", "aria-expanded"], Fn = {
	key: 0,
	class: "usermenu__avatar"
}, In = ["aria-label"], Ln = { class: "usermenu__head" }, Rn = { class: "usermenu__avatar usermenu__avatar--lg" }, zn = { class: "usermenu__name" }, Bn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = gn(), a = nn("phlixConfig", null), o = k(() => a?.routerBase ?? "/app"), { t: s } = p(), c = U(!1), l = U(null), u = U(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = k(() => d.value.charAt(0).toUpperCase() || "A");
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
		}, [q(t).isLoggedIn ? (H(), M("span", Fn, K(f.value), 1)) : (H(), A(n, {
			key: 1,
			name: "user"
		}))], 8, Pn), c.value ? (H(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": q(s)("shell.account"),
			tabindex: "-1"
		}, [q(t).isLoggedIn ? (H(), M(D, { key: 0 }, [
			N("div", Ln, [N("span", Rn, K(f.value), 1), N("span", zn, K(d.value), 1)]),
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
		}, [F(n, { name: "user" }), P(" " + K(q(s)("shell.signIn")), 1)]))], 8, In)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Vn = ["aria-label"], Hn = ["src", "poster"], Un = { class: "mini__body" }, Wn = { class: "mini__title" }, Gn = { class: "mini__controls" }, Kn = ["aria-label"], qn = ["aria-label"], Jn = ["aria-label"], Yn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Xn = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
				}, null, 40, Hn),
				N("div", Un, [N("p", Wn, K(c.value), 1), N("div", Gn, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(i).playing ? q(a)("player.pause") : q(a)("player.play"),
						onClick: h
					}, [F(n, { name: q(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Kn),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(a)("player.expand"),
						onClick: g
					}, [F(n, { name: "expand" })], 8, qn),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": q(a)("player.closePlayer"),
						onClick: _
					}, [F(n, { name: "x" })], 8, Jn)
				])]),
				N("div", Yn, [N("div", {
					class: "mini__progress-fill",
					style: R({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Vn)) : j("", !0)]),
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
var Z = (e) => Math.max(0, Math.min(255, Math.round(e))), Qn = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Z(e).toString(16).padStart(2, "0")).join("");
function $n(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function er(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var tr = ({ r: e, g: t, b: n }, r) => `rgba(${Z(e)}, ${Z(t)}, ${Z(n)}, ${r})`;
function nr({ r: e, g: t, b: n }) {
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
function rr(e) {
	let t = Zn(e);
	if (!t) return null;
	let n = nr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Qn(t),
		"--accent-hover": Qn($n(t, .12)),
		"--accent-active": Qn(er(t, .12)),
		"--accent-soft": tr(t, .14),
		"--accent-ring": tr(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var ir = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function ar(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? rr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of ir) n.style.removeProperty(e);
}
function or(e) {
	let t = o();
	e && !c() && (t.theme = e), ar(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function sr() {
	let e = a();
	return cn(() => {
		ar({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function cr() {
	let e = se(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), V(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function Q(e, t) {
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
function lr(e) {
	let t = Q(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Q(n, t);
	return !r || t && r === t ? null : r;
}
function ur(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Q(e.href) === t) return !0;
	return !1;
}
function dr(e, t, n, r) {
	if (ur(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function fr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Q(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Q(e);
		r && (n && r === n || a.has(r) || (a.add(r), dr("preconnect", r, t.crossOrigin === !0, i), dr("dns-prefetch", r, !1, i)));
	}
	i.length && V(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function pr() {
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
var mr = "phlix.deviceId", hr = 15e3;
function gr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(mr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(mr, e)), e;
	} catch {
		return "web";
	}
}
function _r() {
	let e = S(), t = b(), n = gr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < hr)) {
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
	return J(() => Math.floor(e.position), () => void s()), J(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var vr = ["src", "alt"], yr = { class: "brand-wordmark" }, br = {
	key: 1,
	class: "brand-tagline"
}, xr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		sr();
		let t = se(), i = gn(), { t: a } = p();
		cr();
		let o = tn(() => import("./CommandPalette-BdL8G7xQ.js")), s = U(!1);
		J(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = nn("phlixConfig", null);
		fr(lr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = pr();
		J(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 }), _r();
		let f = k(() => l?.branding ?? {}), m = k(() => f.value.wordmark ?? "Phlix"), h = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = k(() => l?.routerBase ?? "/app");
		function _(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (H(), A(Mn, null, {
			logo: Y(() => [F(q(X), {
				to: g.value,
				class: "brand"
			}, {
				default: Y(() => [
					f.value.logoSrc ? (H(), M("img", {
						key: 0,
						src: f.value.logoSrc,
						alt: f.value.logoAlt ?? m.value,
						class: "brand-logo"
					}, null, 8, vr)) : j("", !0),
					N("span", yr, [P(K(m.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (H(), M("span", br, K(f.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Y(() => [h.value.length ? (H(!0), M(D, { key: 0 }, W(h.value, (e) => (H(), A(an(e.href ? "a" : q(X)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? _(e.href) : void 0,
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
				to: g.value,
				class: "nav-link"
			}, {
				default: Y(() => [P(K(q(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), F(q(X), {
				to: `${g.value}/settings`,
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
				F(Nn),
				F(Bn)
			]),
			default: Y(() => [
				F(q(pn)),
				s.value ? (H(), A(q(o), { key: 0 })) : j("", !0),
				F(Xn, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-236e63ec"]]), Sr = { class: "phlix-placeholder" }, Cr = { class: "placeholder-content" }, wr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (H(), M("div", Sr, [N("div", Cr, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + K(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), Tr = ["login", "signup"];
function Er(e, t, n = !1) {
	let r = typeof e.name == "string" ? e.name : "";
	return Tr.includes(r) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? { name: "browse" } : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Dr() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Or(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-BXm-Bntl.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-DJx8mO5c.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-Cb6uYNEB.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			component: () => import("./LoginPage-Cgwxyj8J.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: () => import("./SignupPage-K58bf6Ha.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: () => import("./SettingsPage-BG3qhq79.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: wr,
		props: { appName: e.app }
	}), n;
}
function kr(e) {
	let t = {
		...Dr(),
		...e
	};
	or(t.defaultTheme);
	let n = fn();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = mn({
		history: hn(),
		routes: Or(t)
	});
	r.beforeEach(async (e) => {
		let t = b(n);
		return await t.init(), Er(e, t.isLoggedIn, t.isAdmin);
	});
	let i = en(xr);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Ar = ["id"], jr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
			onKeydown: un(c, ["esc"])
		}, [G(t.$slots, "default", {}, void 0, !0), F(O, { name: "phlix-tooltip" }, {
			default: Y(() => [r.value && (e.text || t.$slots.content) ? (H(), M("span", {
				key: 0,
				id: q(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [G(t.$slots, "content", {}, () => [P(K(e.text), 1)], !0)], 10, Ar)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Mr = ["aria-label"], Nr = ["role"], Pr = { class: "phlix-toast__content" }, Fr = {
	key: 0,
	class: "phlix-toast__title"
}, Ir = { class: "phlix-toast__message" }, Lr = ["onClick"], Rr = 0, zr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
			Rr++;
		}), z(() => {
			Rr--;
		}), (a, s) => (H(), A(Qt, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": q(t)("common.notifications")
		}, [F($t, { name: "phlix-toast" }, {
			default: Y(() => [(H(!0), M(D, null, W(q(i).toasts, (e) => (H(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", Pr, [e.title ? (H(), M("p", Fr, K(e.title), 1)) : j("", !0), N("p", Ir, K(e.message), 1)]),
				e.action ? (H(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), q(i).dismiss(e.id);
					}
				}, K(e.action.label), 9, Lr)) : j("", !0),
				F(r, {
					name: "x",
					label: q(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => q(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Nr))), 128))]),
			_: 1
		})], 10, Mr)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), Br = ["aria-label"], Vr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		})], 12, Br));
	}
}), [["__scopeId", "data-v-ebc9ef9d"]]), Hr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
			default: Y(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Ur = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
}), [["__scopeId", "data-v-dafe74d0"]]), Wr = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-D1ZQ3pKj.js")
}, Gr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-BZ0iHOwu.js")
}, Kr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-Dvf8lep1.js")
}, qr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-ye3fBRJa.js")
}, Jr = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-Bl0X_ZFA.js")
}, Yr = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-BJBAehMw.js")
}, Xr = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-1eD_HLYX.js")
}, Zr = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-DentGPYn.js")
}, Qr = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-BF7ouXsL.js")
}, $r = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-DvZN51bR.js")
}, ei = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-CwGsCRlq.js")
}, ti = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-hZRM_Y0K.js")
}, ni = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-Bp7XNXe0.js")
}, ri = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-nMOZjbjJ.js")
}, ii = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-DvYXsdNr.js")
}, ai = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-eIfgt3ex.js")
}, oi = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-8aI3ZJ_h.js")
}, si = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-D652PPy3.js")
}, ci = [
	Gr,
	Kr,
	ai
], li = [
	Wr,
	qr,
	Jr,
	Yr,
	Xr,
	Zr,
	Qr,
	$r,
	ei,
	ti,
	ni,
	ri,
	ii
], ui = [oi, si], di = [
	Wr,
	Gr,
	Kr,
	qr,
	Jr,
	Yr,
	Xr,
	Zr,
	Qr,
	$r,
	ei,
	ti,
	ni,
	ri,
	ii,
	ai
], fi = [
	oi,
	...ci,
	si
];
function pi(e = "/app", t = di) {
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
function mi(e = "/app") {
	return pi(e, di);
}
function hi(e = "/app") {
	return pi(e, fi);
}
function gi(e = "/app", t = di) {
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
//#region src/pages/LibraryScanPage.vue?vue&type=script&setup=true&lang.ts
var _i = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, vi = {
	key: 0,
	class: "library-scan__skel"
}, yi = {
	key: 3,
	class: "library-scan__table-wrap"
}, bi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, xi = { class: "library-scan__name" }, Si = {
	key: 0,
	class: "library-scan__paths"
}, Ci = { class: "library-scan__num" }, wi = { class: "library-scan__date" }, Ti = ["data-testid"], Ei = {
	key: 0,
	class: "library-scan__error"
}, Di = { class: "library-scan__actions" }, Oi = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		return B(s), (e, t) => (H(), M("section", _i, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (H(), M("div", vi, [F(T, {
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
		})) : (H(), M("div", yi, [N("table", bi, [t[3] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("div", xi, K(e.name), 1), e.paths.length ? (H(), M("div", Si, K(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, K(e.type), 1),
			N("td", Ci, K(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", wi, K(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: m(i.value[e.id]) }, {
				default: Y(() => [P(K(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (H(), M("span", Ei, K(i.value[e.id]?.error), 1)) : j("", !0)], 8, Ti)]),
			N("td", null, [N("div", Di, [F(y, {
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
}), [["__scopeId", "data-v-3235ff5e"]]);
//#endregion
//#region src/api/normalize.ts
function $(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var ki = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Ai = { class: "my-servers__head" }, ji = {
	key: 0,
	class: "my-servers__skel"
}, Mi = {
	key: 3,
	class: "my-servers__table-wrap"
}, Ni = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Pi = { class: "my-servers__name" }, Fi = { class: "my-servers__url" }, Ii = { class: "my-servers__num" }, Li = { class: "my-servers__date" }, Ri = ["data-testid"], zi = { class: "my-servers__actions" }, Bi = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
					last_seen: $(e.lastSeenAt)
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
		return B(s), (e, t) => (H(), M("section", ki, [N("header", Ai, [t[1] ||= N("div", null, [N("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: Y(() => [...t[0] ||= [P("Add server", -1)]]),
			_: 1
		})]), a.value ? (H(), M("div", ji, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: Y(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: Y(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (H(), A(E, {
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
		})) : (H(), M("div", Mi, [N("table", Ni, [t[5] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("div", Pi, K(e.name), 1), N("div", Fi, K(e.url), 1)]),
			N("td", null, K(e.owner), 1),
			N("td", Ii, K(e.library_count === void 0 ? "—" : e.library_count), 1),
			N("td", Li, K(c(e.last_seen)), 1),
			N("td", null, [N("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: u(e.status) }, {
				default: Y(() => [P(K(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Ri)]),
			N("td", null, [N("div", zi, [F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: Y(() => [...t[4] ||= [P("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), Vi = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, Hi = {
	key: 0,
	class: "federation__skel"
}, Ui = {
	key: 2,
	class: "federation__content"
}, Wi = {
	key: 1,
	class: "federation__table-wrap"
}, Gi = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, Ki = { class: "federation__name" }, qi = { class: "federation__url" }, Ji = { class: "federation__num" }, Yi = { class: "federation__date" }, Xi = ["data-testid"], Zi = { class: "federation__actions" }, Qi = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, $i = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		return B(() => u(!0)), (e, t) => (H(), M("section", Vi, [t[10] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (H(), M("div", Hi, [F(T, {
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
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: Y(() => [...t[4] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (H(), M("div", Ui, [
			t[9] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (H(), A(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (H(), M("div", Wi, [N("table", Gi, [t[6] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(H(!0), M(D, null, W(r.value, (e) => (H(), M("tr", { key: e.id }, [
				N("td", null, [N("div", Ki, K(e.name), 1), N("div", qi, K(e.url), 1)]),
				N("td", Ji, K(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", Yi, K(p(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: g(e.status) }, {
					default: Y(() => [P(K(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Xi)]),
				N("td", null, [N("div", Zi, [F(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: Y(() => [...t[5] ||= [P(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			N("section", Qi, [t[8] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: dn(d, ["prevent"])
			}, [
				ln(N("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[sn, s.value]]),
				ln(N("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[sn, o.value]]),
				ln(N("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[sn, c.value]]),
				F(y, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: Y(() => [...t[7] ||= [P(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), ea = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, ta = {
	key: 0,
	class: "shares__skel"
}, na = {
	key: 3,
	class: "shares__table-wrap"
}, ra = {
	class: "shares__table",
	"aria-label": "Library shares"
}, ia = { class: "shares__library" }, aa = { class: "shares__date" }, oa = { class: "shares__date" }, sa = ["data-testid"], ca = { class: "shares__actions" }, la = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
					created_at: $(e.created_at) ?? "",
					expires_at: $(e.expires_at)
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
		return B(() => o(!0)), (e, t) => (H(), M("section", ea, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (H(), M("div", ta, [F(T, {
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
		})) : (H(), M("div", na, [N("table", ra, [t[4] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("span", ia, K(e.library_name), 1)]),
			N("td", null, K(e.shared_with), 1),
			N("td", null, [F(C, { tone: u(e.permissions) }, {
				default: Y(() => [P(K(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", aa, K(c(e.created_at)), 1),
			N("td", oa, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(K(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (H(), A(C, {
				key: 0,
				tone: "error"
			}, {
				default: Y(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, sa)]),
			N("td", null, [N("div", ca, [F(y, {
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
}), [["__scopeId", "data-v-32224e10"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function ua(e, t) {
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
function da() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = U(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), V(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), rn(t);
}
//#endregion
export { De as ALL_LOGS, ht as AMBIENT_SAMPLE_H, lt as AMBIENT_SAMPLE_INTERVAL_MS, kt as AMBIENT_SAMPLE_W, vt as ARROW_ICONS, nt as ARROW_LABELS, Le as AdminBackupApi, Re as AdminCastApi, He as AdminCollectionsApi, Oe as AdminDashboardApi, ze as AdminDlnaServerApi, Ue as AdminHistoryApi, Je as AdminHubDashboardApi, Ie as AdminIntegrationsApi, Ke as AdminLibrariesApi, Ve as AdminLiveTvApi, Ee as AdminLogsApi, Be as AdminRemoteAccessApi, Fe as AdminServicesApi, qe as AdminSettingsApi, We as AdminSyncPlayApi, je as AdminUsersApi, Pe as AdminWebhooksApi, gt as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, Mn as AppLayout, C as Badge, y as Button, qt as CAPTION_BACKGROUND_OPTIONS, Ht as CAPTION_COLOR_OPTIONS, Gt as CAPTION_EDGE_OPTIONS, zt as CAPTION_SIZE_OPTIONS, Nt as CAPTION_SIZE_SCALE, Qe as CaptionOverlay, ct as CaptionsMenu, pe as Chip, ve as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, ut as DIRECT_PLAY_EXTENSIONS, E as EmptyState, $i as FederationPage, Se as FilterBar, n as Icon, r as IconButton, ue as Kbd, Ge as LIBRARY_TYPES, Oi as LibraryScanPage, ne as LocalStorageTokenStore, Yt as LoginForm, la as ManageSharesPage, me as MediaCard, Te as MediaDetail, ye as MediaGrid, xe as MediaHomeRow, ge as MediaRow, Xn as MiniPlayer, Ce as Modal, Bi as MyServersPage, ee as NetworkError, rt as PLAYER_SHORTCUTS, Ur as PageTransition, xr as PhlixApp, Dt as Player, Ze as QualityMenu, ke as RATING_LABELS, Ae as RATING_OPTIONS, ae as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, xt as ResumePrompt, Hr as Reveal, Me as SUBSCRIBABLE_EVENTS, tt as Scrubber, _e as Select, Zt as SettingsForm, Sn as Sheet, Ye as ShortcutsHelp, Xt as SignupForm, T as Skeleton, St as SkipButton, de as Slider, it as SpeedMenu, Vr as Spinner, fe as Switch, Ct as TRANSCODE_EXTENSIONS, we as Tabs, te as TimeoutError, zr as ToastHost, jr as Tooltip, Tt as TranscodeNotice, Et as UPNEXT_COUNTDOWN_SECONDS, ft as UPNEXT_RING_CIRCUMFERENCE, bt as UPNEXT_RING_RADIUS, _t as UpNext, yt as VolumeControl, Ne as WEBHOOK_EVENT_CATEGORIES, Ut as activeAudioIndex, gi as adminMenu, Mt as ambientGradient, Kt as applyAudioTrack, or as applyStoredThemeEarly, Pt as applyTrackModes, dt as averageRegion, ua as bindMediaStoreToRouter, pi as buildAdminRoutes, hi as buildHubAdminRoutes, oe as buildMediaQuery, ie as buildMediaUrl, mi as buildServerAdminRoutes, Bt as captionStyleVars, Jt as cleanCueText, ci as commonAdminPages, kr as createPhlixApp, f as createTranslator, rr as deriveAccentVars, Ft as edgeShadow, h as errMessage, Ot as extensionOf, ot as formatTime, ce as fuzzyScore, at as handleShortcut, It as hasActiveCaptions, c as hasStoredPreferences, ui as hubAdminPages, jt as isBatterySaving, pt as isFatalMediaError, g as isOffline, $e as isTypingTarget, Wt as listAudioTracks, Vt as listSubtitleTracks, le as matchCommand, u as mergeMessages, mt as needsTranscode, Rt as readActiveCueLines, o as readStoredPreferences, Lt as resolveTextTrack, st as rgbString, Xe as rgbaString, wt as ringDashoffset, At as sampleAmbient, li as serverAdminPages, b as useAuthStore, cr as useCommandPaletteHotkey, se as useCommandStore, i as useFocusTrap, et as useKeyboardShortcuts, be as useMediaStore, p as useMessages, da as useOnline, S as usePlayerStore, fr as usePreconnect, a as usePreferencesStore, he as usePrefetch, _r as useResumeReporter, pr as useResumeSync, sr as useTheme, w as useToastStore };

//# sourceMappingURL=phlix-ui.js.map