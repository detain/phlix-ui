import { r as e } from "./AuthField-n1LgzcyM.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-DkTu9l9P.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Dwm0lQlG.js";
import { a as m, c as h, d as g, i as _, l as ee, n as te, r as ne, s as re, t as v, u as y } from "./Button-9cUUJmnN.js";
import { t as ie } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-BNt_Vq18.js";
import { i as x, n as ae, r as S, t as oe } from "./usePlayerStore-CCov4Tvr.js";
import { i as se, n as ce, r as le, t as ue } from "./Kbd-CSMm1T0l.js";
import { a as de, i as fe, n as pe, o as me, r as he, t as ge } from "./useLibrariesStore-Uvctk-7m.js";
import { i as _e, n as ve, r as ye, t as be } from "./usePageTitle-BO3GGF3M.js";
import { t as C } from "./Badge-ArWL5-WE.js";
import { t as xe } from "./Slider-BMn_Lp_q.js";
import { t as Se } from "./Switch-CFZhdkXR.js";
import { t as Ce } from "./Chip-2HcSZF4a.js";
import { t as we } from "./Select-DLwgQInL.js";
import { i as Te, n as Ee, r as De, t as Oe } from "./FilterBar-COpk4qrX.js";
import { t as ke } from "./Modal-I4tEFhoH.js";
import { t as w } from "./useToastStore-BDoKlU6N.js";
import { t as T } from "./Skeleton-DkSoWF3C.js";
import { i as Ae, n as je, r as Me, t as Ne } from "./MetadataMatchModal-OhFsKc_u.js";
import { t as E } from "./EmptyState-B2QnGIQT.js";
import { t as Pe } from "./Tabs-x8dUKZN5.js";
import { t as Fe } from "./MediaRow-9b6UqMkE.js";
import { n as Ie, t as Le } from "./media-query-BJZQTDXd.js";
import { t as Re } from "./HomeRow-DBFIdLFs.js";
import { t as ze } from "./MediaDetail-CPFXf_bh.js";
import { n as Be, t as Ve } from "./logs-DadTfaTq.js";
import { t as He } from "./dashboard-BTCOCTHQ.js";
import { n as Ue, r as We, t as Ge } from "./users-UPfbrkL3.js";
import { n as Ke, r as qe, t as Je } from "./webhooks-BBTLnFKm.js";
import { t as Ye } from "./services-C907MGdw.js";
import { t as Xe } from "./integrations-DLAG9ISY.js";
import { t as Ze } from "./backup-IdY_vzc2.js";
import { t as Qe } from "./cast-BvFcBEB6.js";
import { t as $e } from "./dlnaServer-B5Sg4MkS.js";
import { t as et } from "./remoteAccess-DVKRpKQ8.js";
import { t as tt } from "./liveTv-Dbjt901v.js";
import { t as nt } from "./collections-CH3HLdcd.js";
import { t as rt } from "./history-ByCY8OYj.js";
import { t as it } from "./syncPlay-DPzJkgkK.js";
import { n as at, t as ot } from "./libraries-CXAz_kXs.js";
import { t as st } from "./settings-m4upFcmH.js";
import { i as ct, n as lt, r as ut, t as dt } from "./plugins-AypKHiis.js";
import { t as ft } from "./hubDashboard-BhOaaDD-.js";
import { A as pt, B as mt, C as ht, D as gt, E as _t, F as vt, G as yt, H as bt, I as xt, J as St, K as Ct, L as wt, M as Tt, N as Et, O as Dt, P as Ot, R as kt, S as At, T as jt, U as Mt, V as Nt, W as Pt, X as Ft, Y as It, _ as Lt, a as Rt, b as zt, c as Bt, d as Vt, f as Ht, g as Ut, h as Wt, i as Gt, j as Kt, k as qt, l as Jt, m as Yt, n as Xt, o as Zt, p as Qt, q as $t, r as en, s as tn, t as nn, u as rn, v as an, w as on, x as sn, y as cn, z as ln } from "./Player-CmAgZNNm.js";
import { a as un, c as dn, d as fn, f as pn, g as mn, h as hn, i as gn, l as _n, m as vn, n as yn, o as bn, p as xn, r as Sn, s as Cn, t as wn, u as Tn } from "./captions-COgPp5bH.js";
import { t as En } from "./LoginForm-DnyDuUUr.js";
import { t as Dn } from "./SignupForm-BMgkDv4W.js";
import { t as On } from "./SettingsForm-C_jqVWcp.js";
import { Fragment as D, Teleport as kn, Transition as O, TransitionGroup as An, computed as k, createApp as jn, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as Mn, defineComponent as I, inject as Nn, normalizeClass as L, normalizeStyle as Pn, onBeforeUnmount as R, onMounted as z, onScopeDispose as B, openBlock as V, readonly as Fn, ref as H, renderList as U, renderSlot as W, resolveDynamicComponent as In, toDisplayString as G, unref as K, useId as Ln, vModelText as Rn, watch as q, watchEffect as zn, withCtx as J, withDirectives as Y, withKeys as Bn, withModifiers as Vn } from "vue";
import { createPinia as Hn } from "pinia";
import { RouterLink as X, RouterView as Un, createRouter as Wn, createWebHistory as Gn, useRouter as Kn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var qn = ["aria-labelledby"], Jn = {
	key: 0,
	class: "phlix-sheet__header"
}, Yn = ["id"], Xn = { class: "phlix-sheet__body" }, Zn = {
	key: 1,
	class: "phlix-sheet__footer"
}, Qn = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		q(() => n.modelValue, (e) => o.value = e);
		let s = H(null), c = Ln();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (V(), A(kn, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (V(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Vn(u, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? K(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (V(), M("header", Jn, [e.title ? (V(), M("h2", {
					key: 0,
					id: K(c),
					class: "phlix-sheet__title"
				}, G(e.title), 9, Yn)) : j("", !0), e.hideClose ? j("", !0) : (V(), A(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : j("", !0),
				N("div", Xn, [W(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (V(), M("footer", Zn, [W(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, qn)], 34)) : j("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), $n = { class: "shell" }, er = {
	class: "shell__skip",
	href: "#main"
}, tr = { class: "shell__bar" }, nr = { class: "shell__inner" }, rr = { class: "shell__brand" }, ir = ["aria-label"], ar = { class: "shell__actions" }, or = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, sr = {
	key: 0,
	class: "shell__footer"
}, cr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = H(!1), { t: o } = p();
		return (t, a) => (V(), M("div", $n, [
			N("a", er, G(K(o)("shell.skipToContent")), 1),
			F(e, { enabled: K(n).atmosphere }, null, 8, ["enabled"]),
			N("header", tr, [N("div", nr, [
				N("div", rr, [W(t.$slots, "logo", {}, () => [a[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", {
					class: "shell__nav",
					"aria-label": K(o)("shell.primaryNav")
				}, [W(t.$slots, "nav", {}, void 0, !0)], 8, ir),
				a[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", ar, [W(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (V(), A(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: K(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : j("", !0)
			])]),
			N("main", or, [W(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (V(), M("footer", sr, [W(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(Qn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: K(o)("shell.menu")
			}, {
				default: J(() => [N("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [W(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-aaaeed33"]]), lr = /* @__PURE__ */ I({
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
		return (e, t) => (V(), A(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), ur = ["aria-label", "aria-expanded"], dr = {
	key: 0,
	class: "usermenu__avatar"
}, fr = ["aria-label"], pr = { class: "usermenu__head" }, mr = { class: "usermenu__avatar usermenu__avatar--lg" }, hr = { class: "usermenu__name" }, gr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = Kn(), a = Nn("phlixConfig", null), o = k(() => a?.routerBase ?? "/app"), { t: s } = p(), c = H(!1), l = H(null), u = H(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = k(() => d.value.charAt(0).toUpperCase() || "A");
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
		}), R(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (V(), M("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [N("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": K(t).isLoggedIn ? K(s)("shell.accountNamed", { name: d.value }) : K(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [K(t).isLoggedIn ? (V(), M("span", dr, G(f.value), 1)) : (V(), A(n, {
			key: 1,
			name: "user"
		}))], 8, ur), c.value ? (V(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": K(s)("shell.account"),
			tabindex: "-1"
		}, [K(t).isLoggedIn ? (V(), M(D, { key: 0 }, [
			N("div", pr, [N("span", mr, G(f.value), 1), N("span", hr, G(d.value), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [F(n, { name: "settings" }), P(" " + G(K(s)("shell.settings")), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [F(n, { name: "log-out" }), P(" " + G(K(s)("shell.signOut")), 1)])
		], 64)) : (V(), M("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [F(n, { name: "user" }), P(" " + G(K(s)("shell.signIn")), 1)]))], 8, fr)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), _r = ["aria-label"], vr = ["src", "poster"], yr = { class: "mini__body" }, br = { class: "mini__title" }, xr = { class: "mini__controls" }, Sr = ["aria-label"], Cr = ["aria-label"], wr = ["aria-label"], Tr = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Er = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = H(null), s = k(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = k(() => i.current?.name ?? ""), l = k(() => Math.max(0, Math.min(1, i.progress)));
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
		}), R(() => {
			o.value?.pause?.();
		}), (e, t) => (V(), A(O, { name: "mini" }, {
			default: J(() => [s.value ? (V(), M("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": K(a)("player.miniPlayer")
			}, [
				N("video", {
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
				}, null, 40, vr),
				N("div", yr, [N("p", br, G(c.value), 1), N("div", xr, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": K(i).playing ? K(a)("player.pause") : K(a)("player.play"),
						onClick: h
					}, [F(n, { name: K(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Sr),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": K(a)("player.expand"),
						onClick: g
					}, [F(n, { name: "expand" })], 8, Cr),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": K(a)("player.closePlayer"),
						onClick: _
					}, [F(n, { name: "x" })], 8, wr)
				])]),
				N("div", Tr, [N("div", {
					class: "mini__progress-fill",
					style: Pn({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, _r)) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function Dr(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Z = (e) => Math.max(0, Math.min(255, Math.round(e))), Or = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Z(e).toString(16).padStart(2, "0")).join("");
function kr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Ar(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var jr = ({ r: e, g: t, b: n }, r) => `rgba(${Z(e)}, ${Z(t)}, ${Z(n)}, ${r})`;
function Mr({ r: e, g: t, b: n }) {
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
function Nr(e) {
	let t = Dr(e);
	if (!t) return null;
	let n = Mr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Or(t),
		"--accent-hover": Or(kr(t, .12)),
		"--accent-active": Or(Ar(t, .12)),
		"--accent-soft": jr(t, .14),
		"--accent-ring": jr(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Pr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Fr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Nr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Pr) n.style.removeProperty(e);
}
function Ir(e) {
	let t = o();
	e && !c() && (t.theme = e), Fr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Lr() {
	let e = a();
	return zn(() => {
		Fr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Rr() {
	let e = se(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), B(() => document.removeEventListener("keydown", t)));
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
function zr(e) {
	let t = Q(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Q(n, t);
	return !r || t && r === t ? null : r;
}
function Br(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Q(e.href) === t) return !0;
	return !1;
}
function Vr(e, t, n, r) {
	if (Br(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function Hr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Q(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Q(e);
		r && (n && r === n || a.has(r) || (a.add(r), Vr("preconnect", r, t.crossOrigin === !0, i), Vr("dns-prefetch", r, !1, i)));
	}
	i.length && B(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function Ur() {
	let e = x(), t = b();
	async function n() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {};
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / S));
			}
			e.mergeServerResume(r);
		} catch {}
	}
	return { syncResume: n };
}
//#endregion
//#region src/composables/useResumeReporter.ts
var Wr = "phlix.deviceId", Gr = 15e3;
function Kr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(Wr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(Wr, e)), e;
	} catch {
		return "web";
	}
}
function qr() {
	let e = x(), t = b(), n = Kr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < Gr)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * S),
					duration_ticks: Math.floor(e.duration * S),
					is_paused: !e.playing
				});
			} catch {} finally {
				a = !1;
			}
		}
	}
	return q(() => Math.floor(e.position), () => void s()), q(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var Jr = ["src", "alt"], Yr = { class: "brand-wordmark" }, Xr = {
	key: 1,
	class: "brand-tagline"
}, Zr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		Lr();
		let t = se(), i = Kn(), { t: a } = p();
		Rr();
		let o = Mn(() => import("./CommandPalette-ntNedT6K.js")), s = H(!1);
		q(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = Nn("phlixConfig", null);
		Hr(zr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = Ur();
		q(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 }), qr();
		let f = k(() => l?.branding ?? {}), m = k(() => f.value.wordmark ?? "Phlix"), h = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = k(() => l?.routerBase ?? "/app"), _ = ge(), ee = k(() => h.value.some((e) => e.libraryLinks));
		q(() => u.isLoggedIn && ee.value, (e) => {
			e && _.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function te(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (V(), A(cr, null, {
			logo: J(() => [F(K(X), {
				to: g.value,
				class: "brand"
			}, {
				default: J(() => [
					f.value.logoSrc ? (V(), M("img", {
						key: 0,
						src: f.value.logoSrc,
						alt: f.value.logoAlt ?? m.value,
						class: "brand-logo"
					}, null, 8, Jr)) : j("", !0),
					N("span", Yr, [P(G(m.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (V(), M("span", Xr, G(f.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [h.value.length ? (V(!0), M(D, { key: 0 }, U(h.value, (e) => (V(), M(D, { key: e.id }, [(V(), A(In(e.href ? "a" : K(X)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? te(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: J(() => [e.icon ? (V(), A(n, {
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
			])), (V(!0), M(D, null, U(e.libraryLinks ? K(_).items : [], (t) => (V(), A(K(X), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: J(() => [P(G(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (V(), M(D, { key: 1 }, [F(K(X), {
				to: g.value,
				class: "nav-link"
			}, {
				default: J(() => [P(G(K(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), F(K(X), {
				to: `${g.value}/settings`,
				class: "nav-link"
			}, {
				default: J(() => [P(G(K(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: J(() => [
				F(r, {
					name: "search",
					label: K(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => K(t).openPalette()
				}, null, 8, ["label"]),
				F(lr),
				F(gr)
			]),
			default: J(() => [
				F(K(Un)),
				s.value ? (V(), A(K(o), { key: 0 })) : j("", !0),
				F(Er, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-3d8a20f5"]]), Qr = { class: "phlix-placeholder" }, $r = { class: "placeholder-content" }, ei = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (V(), M("div", Qr, [N("div", $r, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + G(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), ti = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-CD5K7uzK.js")
}, ni = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-c1cLdavj.js")
}, ri = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-BppIR-W9.js")
}, ii = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-Ci775vCZ.js")
}, ai = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-Bih3oFQz.js")
}, oi = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-inEWLI4s.js")
}, si = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-BT8-TfdR.js")
}, ci = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-C2JUOVfw.js")
}, li = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-DZH7wet6.js")
}, ui = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-BGQhQ9hU.js")
}, di = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-ISFW1d9Y.js")
}, fi = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-BjmCmr0Q.js")
}, pi = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-DPT7DJgD.js")
}, mi = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-CqkvqDhz.js")
}, $ = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-Bj4YtdP-.js")
}, hi = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-xztlu8Yf.js")
}, gi = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-Dr-njv08.js")
}, _i = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-DxdJCtjy.js")
}, vi = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-77uFgy6y.js")
}, yi = Object.fromEntries([
	ti,
	ni,
	ri,
	ii,
	ai,
	oi,
	si,
	ci,
	li,
	ui,
	di,
	fi,
	pi,
	mi,
	$,
	hi,
	gi,
	_i,
	vi
].map((e) => [e.name, e.label]));
function bi(e) {
	return e ? yi[e] ?? null : null;
}
var xi = [
	ni,
	ri,
	gi
], Si = [
	ti,
	ii,
	ai,
	oi,
	si,
	ci,
	li,
	ui,
	di,
	fi,
	pi,
	mi,
	$,
	hi
], Ci = [_i, vi], wi = [
	ti,
	ni,
	ri,
	ii,
	ai,
	oi,
	si,
	ci,
	li,
	ui,
	di,
	fi,
	pi,
	mi,
	$,
	hi,
	gi
], Ti = [
	_i,
	...xi,
	vi
];
function Ei(e = "/app", t = wi) {
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
function Di(e = "/app") {
	return Ei(e, wi);
}
function Oi(e = "/app") {
	return Ei(e, Ti);
}
function ki(e = "/app", t = wi) {
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
var Ai = ["login", "signup"];
function ji(e, t, n = !1) {
	let r = typeof e.name == "string" ? e.name : "";
	return Ai.includes(r) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? { name: "browse" } : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Mi(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = bi(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function Ni() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Pi(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-CfUqwJzA.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-BCBzqMPd.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-QKQWPq-x.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-C48Ubb_Y.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-CI_Jkh5d.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-C9MQetDv.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-B9f8tJ5B.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-7dPLsFS_.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: ei,
		props: { appName: e.app }
	}), n;
}
function Fi(e) {
	let t = {
		...Ni(),
		...e
	};
	Ir(t.defaultTheme), ve(t.branding?.wordmark);
	let n = f(t.messages), r = Hn();
	t.defaultTheme && !c() && (a(r).theme = t.defaultTheme);
	let i = Wn({
		history: Gn(),
		routes: Pi(t)
	});
	i.beforeEach(async (e) => {
		let t = b(r);
		return await t.init(), ji(e, t.isLoggedIn, t.isAdmin);
	}), i.afterEach((e) => {
		ye(Mi(e, n));
	});
	let o = jn(Zr);
	return o.provide("apiBase", t.apiBase), o.provide("phlixCommands", t.commands ?? []), o.provide("phlixConfig", t), o.use(r), o.use(i), o;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Ii = ["id"], Li = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = Ln(), r = H(!1), i = H(null), a;
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
		return R(() => clearTimeout(a)), (t, a) => (V(), M("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: Bn(c, ["esc"])
		}, [W(t.$slots, "default", {}, void 0, !0), F(O, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (V(), M("span", {
				key: 0,
				id: K(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [W(t.$slots, "content", {}, () => [P(G(e.text), 1)], !0)], 10, Ii)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Ri = ["aria-label"], zi = ["role"], Bi = { class: "phlix-toast__content" }, Vi = {
	key: 0,
	class: "phlix-toast__title"
}, Hi = { class: "phlix-toast__message" }, Ui = ["onClick"], Wi = 0, Gi = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
			Wi++;
		}), R(() => {
			Wi--;
		}), (a, s) => (V(), A(kn, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": K(t)("common.notifications")
		}, [F(An, { name: "phlix-toast" }, {
			default: J(() => [(V(!0), M(D, null, U(K(i).toasts, (e) => (V(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", Bi, [e.title ? (V(), M("p", Vi, G(e.title), 1)) : j("", !0), N("p", Hi, G(e.message), 1)]),
				e.action ? (V(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), K(i).dismiss(e.id);
					}
				}, G(e.action.label), 9, Ui)) : j("", !0),
				F(r, {
					name: "x",
					label: K(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => K(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, zi))), 128))]),
			_: 1
		})], 10, Ri)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), Ki = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		}), (t, a) => (V(), A(In(e.tag), {
			ref_key: "el",
			ref: n,
			class: L(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Pn({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [W(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), qi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (V(), A(O, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: J(() => [W(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Ji = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Yi = {
	key: 0,
	class: "library-scan__skel"
}, Xi = {
	key: 3,
	class: "library-scan__table-wrap"
}, Zi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Qi = { class: "library-scan__name" }, $i = {
	key: 0,
	class: "library-scan__paths"
}, ea = { class: "library-scan__num" }, ta = { class: "library-scan__date" }, na = ["data-testid"], ra = {
	key: 0,
	class: "library-scan__error"
}, ia = { class: "library-scan__actions" }, aa = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = w(), r = H([]), i = H({}), a = H(!0), o = H(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				r.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of r.value) c(e.id);
			} catch (e) {
				o.value = y(e, "Failed to load libraries."), n.error(o.value);
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
				n.error(y(e, "Failed to trigger scan."));
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), n.success("Rescan queued."), await c(e);
			} catch (e) {
				n.error(y(e, "Failed to trigger rescan."));
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
		return z(s), (e, t) => (V(), M("section", Ji, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (V(), M("div", Yi, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: J(() => [F(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[0] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), A(E, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (V(), M("div", Xi, [N("table", Zi, [t[3] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Type"),
			N("th", { scope: "col" }, "Items"),
			N("th", { scope: "col" }, "Last scan"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(V(!0), M(D, null, U(r.value, (e) => (V(), M("tr", { key: e.id }, [
			N("td", null, [N("div", Qi, G(e.name), 1), e.paths.length ? (V(), M("div", $i, G(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, G(e.type), 1),
			N("td", ea, G(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", ta, G(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: m(i.value[e.id]) }, {
				default: J(() => [P(G(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (V(), M("span", ra, G(i.value[e.id]?.error), 1)) : j("", !0)], 8, na)]),
			N("td", null, [N("div", ia, [F(v, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: J(() => [...t[1] ||= [P(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), F(v, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: J(() => [...t[2] ||= [P(" Rescan ", -1)]]),
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
function oa(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var sa = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, ca = { class: "my-servers__head" }, la = {
	key: 0,
	class: "my-servers__skel"
}, ua = {
	key: 3,
	class: "my-servers__table-wrap"
}, da = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, fa = { class: "my-servers__name" }, pa = { class: "my-servers__url" }, ma = { class: "my-servers__num" }, ha = { class: "my-servers__date" }, ga = ["data-testid"], _a = { class: "my-servers__actions" }, va = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = w(), r = b(), i = H([]), a = H(!0), o = H(null);
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
					last_seen: oa(e.lastSeenAt)
				}));
			} catch (e) {
				o.value = y(e, "Failed to load servers."), n.error(o.value);
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
		return z(s), (e, t) => (V(), M("section", sa, [N("header", ca, [t[1] ||= N("div", null, [N("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(v, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: J(() => [...t[0] ||= [P("Add server", -1)]]),
			_: 1
		})]), a.value ? (V(), M("div", la, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: J(() => [F(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (V(), A(E, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: J(() => [F(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: J(() => [...t[3] ||= [P("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (V(), M("div", ua, [N("table", da, [t[5] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Server"),
			N("th", { scope: "col" }, "Owner"),
			N("th", { scope: "col" }, "Libraries"),
			N("th", { scope: "col" }, "Last seen"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(V(!0), M(D, null, U(i.value, (e) => (V(), M("tr", { key: e.id }, [
			N("td", null, [N("div", fa, G(e.name), 1), N("div", pa, G(e.url), 1)]),
			N("td", null, G(e.owner), 1),
			N("td", ma, G(e.library_count === void 0 ? "—" : e.library_count), 1),
			N("td", ha, G(c(e.last_seen)), 1),
			N("td", null, [N("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: u(e.status) }, {
				default: J(() => [P(G(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, ga)]),
			N("td", null, [N("div", _a, [F(v, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: J(() => [...t[4] ||= [P("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), ya = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, ba = {
	key: 0,
	class: "federation__skel"
}, xa = {
	key: 2,
	class: "federation__content"
}, Sa = {
	key: 1,
	class: "federation__table-wrap"
}, Ca = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, wa = { class: "federation__name" }, Ta = { class: "federation__url" }, Ea = { class: "federation__num" }, Da = { class: "federation__date" }, Oa = ["data-testid"], ka = { class: "federation__actions" }, Aa = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, ja = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = w(), r = H([]), i = H(!0), a = H(null), o = H(""), s = H(""), c = H(""), l = H(!1);
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
				a.value = y(e, "Failed to load federation peers."), n.error(a.value);
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
					n.error(y(e, "Failed to add peer."));
				} finally {
					l.value = !1;
				}
			}
		}
		async function f(e) {
			try {
				await t.delete(`/api/v1/me/federation/peers/${e}`), n.success("Peer removed."), await u();
			} catch (e) {
				n.error(y(e, "Failed to remove peer."));
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
		return z(() => u(!0)), (e, t) => (V(), M("section", ya, [t[10] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (V(), M("div", ba, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (V(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: J(() => [F(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: J(() => [...t[4] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (V(), M("div", xa, [
			t[9] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (V(), A(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (V(), M("div", Sa, [N("table", Ca, [t[6] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(V(!0), M(D, null, U(r.value, (e) => (V(), M("tr", { key: e.id }, [
				N("td", null, [N("div", wa, G(e.name), 1), N("div", Ta, G(e.url), 1)]),
				N("td", Ea, G(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", Da, G(p(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: h(e.status) }, {
					default: J(() => [P(G(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Oa)]),
				N("td", null, [N("div", ka, [F(v, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: J(() => [...t[5] ||= [P(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			N("section", Aa, [t[8] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: Vn(d, ["prevent"])
			}, [
				Y(N("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[Rn, s.value]]),
				Y(N("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[Rn, o.value]]),
				Y(N("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[Rn, c.value]]),
				F(v, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: J(() => [...t[7] ||= [P(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), Ma = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Na = {
	key: 0,
	class: "shares__skel"
}, Pa = {
	key: 3,
	class: "shares__table-wrap"
}, Fa = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Ia = { class: "shares__library" }, La = { class: "shares__date" }, Ra = { class: "shares__date" }, za = ["data-testid"], Ba = { class: "shares__actions" }, Va = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = w(), r = H([]), i = H(!0), a = H(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: oa(e.created_at) ?? "",
					expires_at: oa(e.expires_at)
				}));
			} catch (e) {
				a.value = y(e, "Failed to load shares."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function s(e) {
			try {
				await t.delete(`/api/v1/me/shares/${e}`), n.success("Share revoked."), await o();
			} catch (e) {
				n.error(y(e, "Failed to revoke share."));
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
		return z(() => o(!0)), (e, t) => (V(), M("section", Ma, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (V(), M("div", Na, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (V(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: J(() => [F(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: J(() => [...t[1] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), A(E, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (V(), M("div", Pa, [N("table", Fa, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Shared with"),
			N("th", { scope: "col" }, "Permissions"),
			N("th", { scope: "col" }, "Created"),
			N("th", { scope: "col" }, "Expires"),
			N("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(V(!0), M(D, null, U(r.value, (e) => (V(), M("tr", { key: e.id }, [
			N("td", null, [N("span", Ia, G(e.library_name), 1)]),
			N("td", null, G(e.shared_with), 1),
			N("td", null, [F(C, { tone: u(e.permissions) }, {
				default: J(() => [P(G(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", La, G(c(e.created_at)), 1),
			N("td", Ra, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(G(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (V(), A(C, {
				key: 0,
				tone: "error"
			}, {
				default: J(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, za)]),
			N("td", null, [N("div", Ba, [F(v, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: J(() => [...t[3] ||= [P(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Ha(e, t) {
	let n = Ee(), r = !1;
	n.setLibraryId(void 0), n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
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
function Ua() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = H(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), B(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Fn(t);
}
//#endregion
export { Ve as ALL_LOGS, Lt as AMBIENT_SAMPLE_H, an as AMBIENT_SAMPLE_INTERVAL_MS, cn as AMBIENT_SAMPLE_W, Tt as ARROW_ICONS, Et as ARROW_LABELS, Ze as AdminBackupApi, Qe as AdminCastApi, nt as AdminCollectionsApi, He as AdminDashboardApi, $e as AdminDlnaServerApi, rt as AdminHistoryApi, ft as AdminHubDashboardApi, Xe as AdminIntegrationsApi, ot as AdminLibrariesApi, tt as AdminLiveTvApi, Be as AdminLogsApi, dt as AdminPluginsApi, et as AdminRemoteAccessApi, Ye as AdminServicesApi, st as AdminSettingsApi, it as AdminSyncPlayApi, Ge as AdminUsersApi, Je as AdminWebhooksApi, Ut as AmbientCanvas, te as ApiClient, re as ApiError, e as AppBackdrop, cr as AppLayout, C as Badge, v as Button, wn as CAPTION_BACKGROUND_OPTIONS, yn as CAPTION_COLOR_OPTIONS, Sn as CAPTION_EDGE_OPTIONS, gn as CAPTION_SIZE_OPTIONS, un as CAPTION_SIZE_SCALE, gt as CaptionOverlay, _t as CaptionsMenu, Ce as Chip, Te as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, Zt as DIRECT_PLAY_EXTENSIONS, E as EmptyState, ja as FederationPage, Oe as FilterBar, n as Icon, r as IconButton, ue as Kbd, at as LIBRARY_TYPES, aa as LibraryScanPage, ie as LocalStorageTokenStore, En as LoginForm, Va as ManageSharesPage, je as MediaCard, ze as MediaDetail, De as MediaGrid, Re as MediaHomeRow, Fe as MediaRow, Ne as MetadataMatchModal, Er as MiniPlayer, ke as Modal, va as MyServersPage, h as NetworkError, Ot as PLAYER_SHORTCUTS, lt as PLUGIN_SECRET_MASK, qi as PageTransition, Zr as PhlixApp, nn as Player, Dt as QualityMenu, Ue as RATING_LABELS, We as RATING_OPTIONS, oe as RESUME_MAX_RATIO, ae as RESUME_MIN_SECONDS, Wt as ResumePrompt, Ki as Reveal, fe as SORT_TITLE_ARTICLES, Ke as SUBSCRIBABLE_EVENTS, It as Scrubber, we as Select, On as SettingsForm, Qn as Sheet, Kt as ShortcutsHelp, Dn as SignupForm, T as Skeleton, Xt as SkipButton, xe as Slider, qt as SpeedMenu, Ae as Spinner, Se as Switch, ne as TMDB_UNCONFIGURED_CODE, tn as TRANSCODE_EXTENSIONS, Pe as Tabs, ee as TimeoutError, Gi as ToastHost, Li as Tooltip, Gt as TranscodeNotice, en as TranscodePreparing, Bt as UPNEXT_COUNTDOWN_SECONDS, Jt as UPNEXT_RING_CIRCUMFERENCE, rn as UPNEXT_RING_RADIUS, Rt as UpNext, pt as VolumeControl, qe as WEBHOOK_EVENT_CATEGORIES, bn as activeAudioIndex, ki as adminMenu, zt as ambientGradient, Cn as applyAudioTrack, Ir as applyStoredThemeEarly, dn as applyTrackModes, $t as attachHls, sn as averageRegion, Ha as bindMediaStoreToRouter, Ei as buildAdminRoutes, Oi as buildHubAdminRoutes, Le as buildMediaQuery, Ie as buildMediaUrl, Di as buildServerAdminRoutes, _n as captionStyleVars, Tn as cleanCueText, xi as commonAdminPages, de as compareByStrippedTitle, Fi as createPhlixApp, f as createTranslator, Nr as deriveAccentVars, fn as edgeShadow, y as errMessage, Vt as extensionOf, pe as fetchLibraries, be as formatPageTitle, Ft as formatTime, ce as fuzzyScore, vt as handleShortcut, pn as hasActiveCaptions, c as hasStoredPreferences, Ci as hubAdminPages, At as isBatterySaving, ln as isFailedStatus, Ht as isFatalMediaError, St as isNativeHlsSupported, g as isOffline, mt as isPlayable, m as isTmdbUnconfigured, xt as isTypingTarget, xn as listAudioTracks, vn as listSubtitleTracks, le as matchCommand, u as mergeMessages, Qt as needsTranscode, Nt as parseSubtitleTracks, bt as parseTranscodeStart, Mt as parseTranscodeStatus, ut as pluginErrorCode, ct as pluginValidationErrors, hn as readActiveCueLines, o as readStoredPreferences, Pt as resolveStreamUrl, mn as resolveTextTrack, ht as rgbString, on as rgbaString, Yt as ringDashoffset, jt as sampleAmbient, Si as serverAdminPages, ve as setAppName, ye as setPageTitle, he as sortLibraries, me as stripLeadingArticle, yt as transcodeStartPath, Ct as transcodeStatusPath, b as useAuthStore, Rr as useCommandPaletteHotkey, se as useCommandStore, i as useFocusTrap, kt as useHlsTranscode, wt as useKeyboardShortcuts, ge as useLibrariesStore, Ee as useMediaStore, p as useMessages, Ua as useOnline, _e as usePageTitle, x as usePlayerStore, Hr as usePreconnect, a as usePreferencesStore, Me as usePrefetch, qr as useResumeReporter, Ur as useResumeSync, Lr as useTheme, w as useToastStore };

//# sourceMappingURL=phlix-ui.js.map