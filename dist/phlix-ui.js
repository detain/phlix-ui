import { r as e } from "./AuthField-n1LgzcyM.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-DkTu9l9P.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Dwm0lQlG.js";
import { a as m, c as h, d as g, f as _, i as v, l as ee, n as te, r as ne, s as re, t as y, u as ie } from "./Button-5ZSsUmsI.js";
import { t as b } from "./useAuthStore-DWVaTITC.js";
import { i as x, n as ae, r as oe, t as se } from "./usePlayerStore-CCov4Tvr.js";
import { i as ce, n as le, r as ue, t as de } from "./Kbd-CSMm1T0l.js";
import { a as fe, i as pe, n as me, o as he, r as ge, t as _e } from "./useLibrariesStore-CsoGNIah.js";
import { i as ve, n as ye, r as be, t as xe } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Badge-ArWL5-WE.js";
import { t as Se } from "./Slider-BMn_Lp_q.js";
import { t as Ce } from "./Switch-CFZhdkXR.js";
import { t as we } from "./Chip-2HcSZF4a.js";
import { t as Te } from "./Select-DLwgQInL.js";
import { i as Ee, n as De, r as Oe, t as ke } from "./FilterBar-DGmX9FVM.js";
import { t as Ae } from "./Modal-I4tEFhoH.js";
import { t as C } from "./useToastStore-BDoKlU6N.js";
import { t as w } from "./Skeleton-DkSoWF3C.js";
import { i as je, n as Me, r as Ne, t as Pe } from "./MetadataMatchModal-DEJW4hCM.js";
import { t as T } from "./EmptyState-B2QnGIQT.js";
import { t as Fe } from "./Tabs-x8dUKZN5.js";
import { t as Ie } from "./MediaRow-CSAJjxOz.js";
import { i as Le, n as Re, r as ze, t as Be } from "./useApiBase-CSECk0g8.js";
import { t as Ve } from "./HomeRow-BTdVBeZQ.js";
import { t as He } from "./MediaDetail-BckOktCe.js";
import { n as Ue, t as We } from "./logs-DadTfaTq.js";
import { t as Ge } from "./dashboard-BTCOCTHQ.js";
import { n as Ke, r as qe, t as Je } from "./users-UPfbrkL3.js";
import { n as Ye, r as Xe, t as Ze } from "./webhooks-BBTLnFKm.js";
import { t as Qe } from "./services-C907MGdw.js";
import { t as $e } from "./integrations-DLAG9ISY.js";
import { t as et } from "./backup-IdY_vzc2.js";
import { t as tt } from "./cast-BvFcBEB6.js";
import { t as nt } from "./dlnaServer-B5Sg4MkS.js";
import { t as rt } from "./remoteAccess-DVKRpKQ8.js";
import { t as it } from "./liveTv-Dbjt901v.js";
import { t as at } from "./collections-CH3HLdcd.js";
import { t as ot } from "./history-ByCY8OYj.js";
import { t as st } from "./syncPlay-DPzJkgkK.js";
import { n as ct, t as lt } from "./libraries-CXAz_kXs.js";
import { t as ut } from "./settings-m4upFcmH.js";
import { i as dt, n as ft, r as pt, t as mt } from "./plugins-CLT7jRx3.js";
import { t as ht } from "./hubDashboard-BhOaaDD-.js";
import { A as gt, B as _t, C as vt, D as yt, E as bt, F as xt, G as St, H as Ct, I as wt, J as Tt, K as Et, L as Dt, M as Ot, N as kt, O as At, P as jt, R as Mt, S as Nt, T as Pt, U as Ft, V as It, W as Lt, X as Rt, Y as zt, _ as Bt, a as Vt, b as Ht, c as Ut, d as Wt, f as Gt, g as Kt, h as qt, i as Jt, j as Yt, k as Xt, l as Zt, m as Qt, n as $t, o as en, p as tn, q as nn, r as rn, s as an, t as on, u as sn, v as cn, w as ln, x as un, y as dn, z as fn } from "./Player-jbJMxv3h.js";
import { a as pn, c as mn, d as hn, f as gn, g as _n, h as vn, i as yn, l as bn, m as xn, n as Sn, o as Cn, p as wn, r as Tn, s as En, t as Dn, u as On } from "./captions-COgPp5bH.js";
import { t as kn } from "./LoginForm-Cg_g4AlO.js";
import { t as An } from "./SignupForm-jTnWBBlx.js";
import { t as jn } from "./SettingsForm-F1qoOM2o.js";
import { Fragment as E, Teleport as Mn, Transition as D, TransitionGroup as Nn, computed as O, createApp as Pn, createBlock as k, createCommentVNode as A, createElementBlock as j, createElementVNode as M, createTextVNode as N, createVNode as P, defineAsyncComponent as Fn, defineComponent as F, inject as In, normalizeClass as I, normalizeStyle as Ln, onBeforeUnmount as L, onMounted as R, onScopeDispose as Rn, openBlock as z, readonly as zn, ref as B, renderList as V, renderSlot as H, resolveDynamicComponent as Bn, toDisplayString as U, unref as W, useId as Vn, vModelText as G, watch as K, watchEffect as Hn, withCtx as q, withDirectives as J, withKeys as Un, withModifiers as Wn } from "vue";
import { createPinia as Gn, defineStore as Kn } from "pinia";
import { RouterLink as Y, RouterView as qn, createRouter as Jn, createWebHistory as Yn, useRouter as Xn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var Zn = ["aria-labelledby"], Qn = {
	key: 0,
	class: "phlix-sheet__header"
}, $n = ["id"], er = { class: "phlix-sheet__body" }, tr = {
	key: 1,
	class: "phlix-sheet__footer"
}, nr = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let n = e, a = t, o = B(n.modelValue);
		K(() => n.modelValue, (e) => o.value = e);
		let s = B(null), c = Vn();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (z(), k(Mn, { to: "body" }, [P(D, { name: `phlix-sheet-${e.side}` }, {
			default: q(() => [e.modelValue ? (z(), j("div", {
				key: 0,
				class: I(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Wn(u, ["self"])
			}, [M("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? W(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (z(), j("header", Qn, [e.title ? (z(), j("h2", {
					key: 0,
					id: W(c),
					class: "phlix-sheet__title"
				}, U(e.title), 9, $n)) : A("", !0), e.hideClose ? A("", !0) : (z(), k(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : A("", !0),
				M("div", er, [H(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (z(), j("footer", tr, [H(t.$slots, "footer", {}, void 0, !0)])) : A("", !0)
			], 8, Zn)], 34)) : A("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), rr = { class: "shell" }, ir = {
	class: "shell__skip",
	href: "#main"
}, ar = { class: "shell__bar" }, or = { class: "shell__inner" }, sr = { class: "shell__brand" }, cr = ["aria-label"], lr = { class: "shell__actions" }, ur = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, dr = {
	key: 0,
	class: "shell__footer"
}, fr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = B(!1), { t: o } = p();
		return (t, a) => (z(), j("div", rr, [
			M("a", ir, U(W(o)("shell.skipToContent")), 1),
			P(e, { enabled: W(n).atmosphere }, null, 8, ["enabled"]),
			M("header", ar, [M("div", or, [
				M("div", sr, [H(t.$slots, "logo", {}, () => [a[3] ||= M("span", { class: "shell__wordmark" }, [N("Phlix"), M("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				M("nav", {
					class: "shell__nav",
					"aria-label": W(o)("shell.primaryNav")
				}, [H(t.$slots, "nav", {}, void 0, !0)], 8, cr),
				a[4] ||= M("span", { class: "shell__spacer" }, null, -1),
				M("div", lr, [H(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (z(), k(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: W(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : A("", !0)
			])]),
			M("main", ur, [H(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (z(), j("footer", dr, [H(t.$slots, "footer", {}, void 0, !0)])) : A("", !0),
			P(nr, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: W(o)("shell.menu")
			}, {
				default: q(() => [M("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [H(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-aaaeed33"]]), pr = /* @__PURE__ */ F({
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
		return (e, t) => (z(), k(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), mr = ["aria-label", "aria-expanded"], hr = {
	key: 0,
	class: "usermenu__avatar"
}, gr = ["aria-label"], _r = { class: "usermenu__head" }, vr = { class: "usermenu__avatar usermenu__avatar--lg" }, yr = { class: "usermenu__name" }, br = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = Xn(), a = In("phlixConfig", null), o = O(() => a?.routerBase ?? "/app"), { t: s } = p(), c = B(!1), l = B(null), u = B(null), d = O(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = O(() => d.value.charAt(0).toUpperCase() || "A");
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
		}), L(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (z(), j("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [M("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": W(t).isLoggedIn ? W(s)("shell.accountNamed", { name: d.value }) : W(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [W(t).isLoggedIn ? (z(), j("span", hr, U(f.value), 1)) : (z(), k(n, {
			key: 1,
			name: "user"
		}))], 8, mr), c.value ? (z(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": W(s)("shell.account"),
			tabindex: "-1"
		}, [W(t).isLoggedIn ? (z(), j(E, { key: 0 }, [
			M("div", _r, [M("span", vr, U(f.value), 1), M("span", yr, U(d.value), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [P(n, { name: "settings" }), N(" " + U(W(s)("shell.settings")), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [P(n, { name: "log-out" }), N(" " + U(W(s)("shell.signOut")), 1)])
		], 64)) : (z(), j("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [P(n, { name: "user" }), N(" " + U(W(s)("shell.signIn")), 1)]))], 8, gr)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), xr = ["aria-label"], Sr = ["src", "poster"], Cr = { class: "mini__body" }, wr = { class: "mini__title" }, Tr = { class: "mini__controls" }, Er = ["aria-label"], Dr = ["aria-label"], Or = ["aria-label"], kr = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Ar = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = B(null), s = O(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = O(() => i.current?.name ?? ""), l = O(() => Math.max(0, Math.min(1, i.progress)));
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
		}), L(() => {
			o.value?.pause?.();
		}), (e, t) => (z(), k(D, { name: "mini" }, {
			default: q(() => [s.value ? (z(), j("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": W(a)("player.miniPlayer")
			}, [
				M("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: W(i).streamUrl,
					poster: W(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: u,
					onPlay: d,
					onPause: f,
					onTimeupdate: m,
					onClick: g
				}, null, 40, Sr),
				M("div", Cr, [M("p", wr, U(c.value), 1), M("div", Tr, [
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": W(i).playing ? W(a)("player.pause") : W(a)("player.play"),
						onClick: h
					}, [P(n, { name: W(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Er),
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": W(a)("player.expand"),
						onClick: g
					}, [P(n, { name: "expand" })], 8, Dr),
					M("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": W(a)("player.closePlayer"),
						onClick: _
					}, [P(n, { name: "x" })], 8, Or)
				])]),
				M("div", kr, [M("div", {
					class: "mini__progress-fill",
					style: Ln({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, xr)) : A("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function jr(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var X = (e) => Math.max(0, Math.min(255, Math.round(e))), Mr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => X(e).toString(16).padStart(2, "0")).join("");
function Nr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Pr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Fr = ({ r: e, g: t, b: n }, r) => `rgba(${X(e)}, ${X(t)}, ${X(n)}, ${r})`;
function Ir({ r: e, g: t, b: n }) {
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
function Lr(e) {
	let t = jr(e);
	if (!t) return null;
	let n = Ir(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Mr(t),
		"--accent-hover": Mr(Nr(t, .12)),
		"--accent-active": Mr(Pr(t, .12)),
		"--accent-soft": Fr(t, .14),
		"--accent-ring": Fr(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Rr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function zr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Lr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Rr) n.style.removeProperty(e);
}
function Br(e) {
	let t = o();
	e && !c() && (t.theme = e), zr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Vr() {
	let e = a();
	return Hn(() => {
		zr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Hr() {
	let e = ce(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), Rn(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function Z(e, t) {
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
function Ur(e) {
	let t = Z(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Z(n, t);
	return !r || t && r === t ? null : r;
}
function Wr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Z(e.href) === t) return !0;
	return !1;
}
function Gr(e, t, n, r) {
	if (Wr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function Kr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Z(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Z(e);
		r && (n && r === n || a.has(r) || (a.add(r), Gr("preconnect", r, t.crossOrigin === !0, i), Gr("dns-prefetch", r, !1, i)));
	}
	i.length && Rn(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function qr() {
	let e = x(), t = b();
	async function n() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {};
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / oe));
			}
			e.mergeServerResume(r);
		} catch {}
	}
	return { syncResume: n };
}
//#endregion
//#region src/composables/useResumeReporter.ts
var Jr = "phlix.deviceId", Yr = 15e3;
function Xr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(Jr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(Jr, e)), e;
	} catch {
		return "web";
	}
}
function Zr() {
	let e = x(), t = b(), n = Xr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < Yr)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * oe),
					duration_ticks: Math.floor(e.duration * oe),
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
var Qr = ["src", "alt"], $r = { class: "brand-wordmark" }, ei = {
	key: 1,
	class: "brand-tagline"
}, ti = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PhlixApp",
	setup(e) {
		Vr();
		let t = ce(), i = Xn(), { t: a } = p();
		Hr();
		let o = Fn(() => import("./CommandPalette-ntNedT6K.js")), s = B(!1);
		K(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = In("phlixConfig", null);
		Kr(Ur({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = qr();
		K(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), Zr();
		let m = O(() => l?.branding ?? {}), h = O(() => m.value.wordmark ?? "Phlix"), g = O(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = O(() => l?.home ?? l?.routerBase ?? "/app"), v = _e(), ee = O(() => g.value.some((e) => e.libraryLinks));
		K(() => u.isLoggedIn && ee.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function te(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (z(), k(fr, null, {
			logo: q(() => [P(W(Y), {
				to: _.value,
				class: "brand"
			}, {
				default: q(() => [
					m.value.logoSrc ? (z(), j("img", {
						key: 0,
						src: m.value.logoSrc,
						alt: m.value.logoAlt ?? h.value,
						class: "brand-logo"
					}, null, 8, Qr)) : A("", !0),
					M("span", $r, [N(U(h.value), 1), i[1] ||= M("span", { class: "brand-dot" }, ".", -1)]),
					m.value.tagline ? (z(), j("span", ei, U(m.value.tagline), 1)) : A("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: q(() => [g.value.length ? (z(!0), j(E, { key: 0 }, V(g.value, (e) => (z(), j(E, { key: e.id }, [(z(), k(Bn(e.href ? "a" : W(Y)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? te(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: q(() => [e.icon ? (z(), k(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : A("", !0), N(" " + U(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (z(!0), j(E, null, V(e.libraryLinks ? W(v).items : [], (t) => (z(), k(W(Y), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: q(() => [N(U(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (z(), j(E, { key: 1 }, [P(W(Y), {
				to: _.value,
				class: "nav-link"
			}, {
				default: q(() => [N(U(W(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), P(W(Y), {
				to: `${_.value}/settings`,
				class: "nav-link"
			}, {
				default: q(() => [N(U(W(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: q(() => [
				P(r, {
					name: "search",
					label: W(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => W(t).openPalette()
				}, null, 8, ["label"]),
				P(pr),
				P(br)
			]),
			default: q(() => [
				P(W(qn)),
				s.value ? (z(), k(W(o), { key: 0 })) : A("", !0),
				P(Ar, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-5afba5d1"]]), ni = { class: "phlix-placeholder" }, ri = { class: "placeholder-content" }, ii = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (z(), j("div", ni, [M("div", ri, [n[0] ||= M("h1", null, "Shared UI loading...", -1), M("p", null, "Phlix " + U(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), ai = "phlix.currentServerId", oi = "phlix.currentServerName";
function si(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e);
	} catch {
		return null;
	}
}
function Q(e, t) {
	if (!(typeof window > "u")) try {
		t === null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, t);
	} catch {}
}
var ci = Kn("server", () => {
	let e = B(si(ai)), t = B(si(oi)), n = O(() => e.value !== null);
	function r(n, r) {
		e.value = n, t.value = r ?? null, Q(ai, n), Q(oi, r ?? null);
	}
	function i() {
		e.value = null, t.value = null, Q(ai, null), Q(oi, null);
	}
	return {
		currentServerId: e,
		currentServerName: t,
		hasCurrent: n,
		setCurrent: r,
		clear: i
	};
}), li = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-Bb8YO--I.js")
}, ui = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-BCVjX4Gn.js")
}, di = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-CGqEe7aQ.js")
}, fi = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-Di0fQxYJ.js")
}, pi = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-MSQAAoEH.js")
}, mi = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-BTnIASeV.js")
}, hi = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-zWqPznJh.js")
}, gi = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-CNV9AF4r.js")
}, _i = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-D7jRLpnJ.js")
}, vi = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-CRTfYrPz.js")
}, yi = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-CQ0DJW1V.js")
}, bi = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-CtA7DWRT.js")
}, xi = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-BLBbIUu2.js")
}, Si = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-B29XH8K5.js")
}, Ci = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-C0A9z5qZ.js")
}, wi = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-D1XER7BI.js")
}, Ti = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-CUJ7VGBh.js")
}, Ei = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-vbZJXT-p.js")
}, Di = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-CFuJAm57.js")
}, Oi = Object.fromEntries([
	li,
	ui,
	di,
	fi,
	pi,
	mi,
	hi,
	gi,
	_i,
	vi,
	yi,
	bi,
	xi,
	Si,
	Ci,
	wi,
	Ti,
	Ei,
	Di
].map((e) => [e.name, e.label]));
function ki(e) {
	return e ? Oi[e] ?? null : null;
}
var Ai = [
	ui,
	di,
	Ti
], ji = [
	li,
	fi,
	pi,
	mi,
	hi,
	gi,
	_i,
	vi,
	yi,
	bi,
	xi,
	Si,
	Ci,
	wi
], Mi = [Ei, Di], Ni = [
	li,
	ui,
	di,
	fi,
	pi,
	mi,
	hi,
	gi,
	_i,
	vi,
	yi,
	bi,
	xi,
	Si,
	Ci,
	wi,
	Ti
], Pi = [
	Ei,
	...Ai,
	Di
];
function Fi(e = "/app", t = Ni) {
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
function Ii(e = "/app") {
	return Fi(e, Ni);
}
function Li(e = "/app") {
	return Fi(e, Pi);
}
function Ri(e = "/app", t = Ni) {
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
var zi = ["login", "signup"];
function Bi(e, t, n = !1, r = { name: "browse" }) {
	let i = typeof e.name == "string" ? e.name : "";
	return zi.includes(i) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? r : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Vi(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = ki(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function Hi(e, t, n) {
	return e === "hub" && n ? `${t}/api/v1/servers/${n}/proxy` : t;
}
function Ui() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Wi(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-LE-ejvUg.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-D5_QCUa7.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-B_zlNqcn.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-DxnpHJKc.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-Xag03TJb.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-C8kReB_q.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-Ds7xf01u.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-RNv2XDRd.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: ii,
		props: { appName: e.app }
	}), n;
}
function Gi(e) {
	let t = {
		...Ui(),
		...e
	};
	Br(t.defaultTheme), ye(t.branding?.wordmark);
	let n = f(t.messages), r = Gn();
	t.defaultTheme && !c() && (a(r).theme = t.defaultTheme);
	let i = Jn({
		history: Yn(),
		routes: Wi(t)
	}), o = t.home ? { path: t.home } : { name: "browse" };
	i.beforeEach(async (e) => {
		let t = b(r);
		return await t.init(), Bi(e, t.isLoggedIn, t.isAdmin, o);
	}), i.afterEach((e) => {
		be(Vi(e, n));
	});
	let s = ci(r), l = O(() => Hi(t.app, t.apiBase, s.currentServerId)), u = Pn(ti);
	return u.provide("apiBase", t.apiBase), u.provide("mediaApiBase", l), u.provide("phlixCommands", t.commands ?? []), u.provide("phlixConfig", t), u.use(r), u.use(i), u;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Ki = ["id"], qi = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let t = e, n = Vn(), r = B(!1), i = B(null), a;
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
		return L(() => clearTimeout(a)), (t, a) => (z(), j("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: Un(c, ["esc"])
		}, [H(t.$slots, "default", {}, void 0, !0), P(D, { name: "phlix-tooltip" }, {
			default: q(() => [r.value && (e.text || t.$slots.content) ? (z(), j("span", {
				key: 0,
				id: W(n),
				role: "tooltip",
				class: I(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [H(t.$slots, "content", {}, () => [N(U(e.text), 1)], !0)], 10, Ki)) : A("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Ji = ["aria-label"], Yi = ["role"], Xi = { class: "phlix-toast__content" }, Zi = {
	key: 0,
	class: "phlix-toast__title"
}, Qi = { class: "phlix-toast__message" }, $i = ["onClick"], ea = 0, ta = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
			ea++;
		}), L(() => {
			ea--;
		}), (a, s) => (z(), k(Mn, { to: "body" }, [M("div", {
			class: I(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": W(t)("common.notifications")
		}, [P(Nn, { name: "phlix-toast" }, {
			default: q(() => [(z(!0), j(E, null, V(W(i).toasts, (e) => (z(), j("div", {
				key: e.id,
				class: I(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				P(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				M("div", Xi, [e.title ? (z(), j("p", Zi, U(e.title), 1)) : A("", !0), M("p", Qi, U(e.message), 1)]),
				e.action ? (z(), j("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), W(i).dismiss(e.id);
					}
				}, U(e.action.label), 9, $i)) : A("", !0),
				P(r, {
					name: "x",
					label: W(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => W(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Yi))), 128))]),
			_: 1
		})], 10, Ji)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), na = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let t = e, n = B(null), r = B(!1), i = B(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
		}), (t, a) => (z(), k(Bn(e.tag), {
			ref_key: "el",
			ref: n,
			class: I(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Ln({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: q(() => [H(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), ra = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (z(), k(D, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: q(() => [H(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), ia = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, aa = {
	key: 0,
	class: "library-scan__skel"
}, oa = {
	key: 3,
	class: "library-scan__table-wrap"
}, sa = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, ca = { class: "library-scan__name" }, la = {
	key: 0,
	class: "library-scan__paths"
}, ua = { class: "library-scan__num" }, da = { class: "library-scan__date" }, fa = ["data-testid"], pa = {
	key: 0,
	class: "library-scan__error"
}, ma = { class: "library-scan__actions" }, ha = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = B([]), i = B({}), a = B(!0), o = B(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				r.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of r.value) c(e.id);
			} catch (e) {
				o.value = g(e, "Failed to load libraries."), n.error(o.value);
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
				n.error(g(e, "Failed to trigger scan."));
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), n.success("Rescan queued."), await c(e);
			} catch (e) {
				n.error(g(e, "Failed to trigger rescan."));
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
		return R(s), (e, t) => (z(), j("section", ia, [t[4] ||= M("header", { class: "library-scan__head" }, [M("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), M("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (z(), j("div", aa, [P(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (z(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: q(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: q(() => [...t[0] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (z(), k(T, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (z(), j("div", oa, [M("table", sa, [t[3] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Type"),
			M("th", { scope: "col" }, "Items"),
			M("th", { scope: "col" }, "Last scan"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(z(!0), j(E, null, V(r.value, (e) => (z(), j("tr", { key: e.id }, [
			M("td", null, [M("div", ca, U(e.name), 1), e.paths.length ? (z(), j("div", la, U(e.paths.join(", ")), 1)) : A("", !0)]),
			M("td", null, U(e.type), 1),
			M("td", ua, U(e.item_count === void 0 ? "—" : e.item_count), 1),
			M("td", da, U(d(e.last_scan_at)), 1),
			M("td", null, [M("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [P(S, { tone: m(i.value[e.id]) }, {
				default: q(() => [N(U(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (z(), j("span", pa, U(i.value[e.id]?.error), 1)) : A("", !0)], 8, fa)]),
			M("td", null, [M("div", ma, [P(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: q(() => [...t[1] ||= [N(" Scan ", -1)]]),
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
				default: q(() => [...t[2] ||= [N(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-3235ff5e"]]), $ = class extends Error {
	kind;
	constructor(e, t) {
		super(t), this.kind = e, this.name = "ClaimError";
	}
};
async function ga(e, t, n) {
	let r = t.trim();
	if (r === "") throw new $("empty", "Enter the claim code shown on your server.");
	let i = typeof window < "u" ? new re().getAccessToken() : null, a;
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
		throw new $("network", "Network error — check your connection and try again.");
	}
	if (a.ok) {
		let e = await a.json().catch(() => ({}));
		return { serverId: typeof e.server_id == "string" ? e.server_id : "" };
	}
	let o = await a.json().catch(() => ({})), s = typeof o.message == "string" ? o.message : "";
	switch (a.status) {
		case 401: throw new $("unauthorized", "Your session expired — please sign in again.");
		case 404: throw new $("not_found", "That claim code was not found. Double-check it and try again.");
		case 410: throw new $("expired", "That claim code has expired. Generate a new one on your server.");
		case 409: throw new $("already_claimed", "That server has already been claimed.");
		default: throw new $("invalid", s || "Could not add the server. Check the claim code and try again.");
	}
}
//#endregion
//#region src/api/normalize.ts
function _a(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var va = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, ya = { class: "my-servers__head" }, ba = {
	key: 0,
	class: "my-servers__skel"
}, xa = {
	key: 3,
	class: "my-servers__table-wrap"
}, Sa = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Ca = { class: "my-servers__name" }, wa = { class: "my-servers__url" }, Ta = { class: "my-servers__num" }, Ea = { class: "my-servers__date" }, Da = ["data-testid"], Oa = { class: "my-servers__actions" }, ka = ["disabled"], Aa = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, ja = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = b(), i = ci(), a = Xn(), o = In("phlixConfig", void 0)?.routerBase || "/app", s = B([]), c = B(!0), l = B(null), u = B(!1), d = B(""), f = B(!1), p = B(null);
		function m() {
			d.value = "", p.value = null, u.value = !0;
		}
		async function h() {
			f.value = !0, p.value = null;
			try {
				await ga("", d.value), u.value = !1, n.success("Server added."), await _();
			} catch (e) {
				p.value = e instanceof $ ? e.message : g(e, "Could not add the server.");
			} finally {
				f.value = !1;
			}
		}
		async function _() {
			c.value = !0, l.value = null;
			try {
				let e = await t.get("/api/v1/me/servers"), n = r.user?.username || r.user?.name || r.user?.email || "—";
				s.value = (e.servers || []).map((e) => ({
					id: e.serverId ?? "",
					name: e.serverName ?? "",
					url: e.hostnameCandidates?.[0] ?? "",
					status: e.status ?? "offline",
					owner: n,
					last_seen: _a(e.lastSeenAt)
				}));
			} catch (e) {
				l.value = g(e, "Failed to load servers."), n.error(l.value);
			} finally {
				c.value = !1;
			}
		}
		function ee(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function te(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function ne(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		function re(e) {
			e.url && window.open(e.url, "_blank", "noopener,noreferrer");
		}
		function ie(e) {
			e.status === "online" && (i.setCurrent(e.id, e.name), a.push(o));
		}
		return R(_), (e, t) => (z(), j("section", va, [
			M("header", ya, [t[4] ||= M("div", null, [M("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), M("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: m
			}, {
				default: q(() => [...t[3] ||= [N("Add server", -1)]]),
				_: 1
			})]),
			c.value ? (z(), j("div", ba, [P(w, {
				variant: "text",
				lines: 6
			})])) : l.value ? (z(), k(T, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: l.value
			}, {
				actions: q(() => [P(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: _
				}, {
					default: q(() => [...t[5] ||= [N("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : s.value.length === 0 ? (z(), k(T, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: q(() => [P(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: m
				}, {
					default: q(() => [...t[6] ||= [N("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (z(), j("div", xa, [M("table", Sa, [t[9] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Server"),
				M("th", { scope: "col" }, "Owner"),
				M("th", { scope: "col" }, "Libraries"),
				M("th", { scope: "col" }, "Last seen"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(z(!0), j(E, null, V(s.value, (e) => (z(), j("tr", { key: e.id }, [
				M("td", null, [M("div", Ca, U(e.name), 1), M("div", wa, U(e.url), 1)]),
				M("td", null, U(e.owner), 1),
				M("td", Ta, U(e.library_count === void 0 ? "—" : e.library_count), 1),
				M("td", Ea, U(ee(e.last_seen)), 1),
				M("td", null, [M("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [P(S, { tone: ne(e.status) }, {
					default: q(() => [N(U(te(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Da)]),
				M("td", null, [M("div", Oa, [P(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					disabled: e.status !== "online",
					title: e.status === "online" ? `Browse ${e.name} here` : "This server is offline — it must be connected to browse it here",
					"aria-label": `Browse ${e.name}`,
					onClick: (t) => ie(e)
				}, {
					default: q(() => [...t[7] ||= [N("Browse", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				]), P(y, {
					variant: "ghost",
					size: "sm",
					disabled: !e.url,
					title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
					"aria-label": `Manage ${e.name}`,
					onClick: (t) => re(e)
				}, {
					default: q(() => [...t[8] ||= [N("Manage", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				])])])
			]))), 128))])])])),
			P(Ae, {
				modelValue: u.value,
				"onUpdate:modelValue": t[2] ||= (e) => u.value = e,
				title: "Add a server"
			}, {
				footer: q(() => [P(y, {
					variant: "ghost",
					size: "sm",
					disabled: f.value,
					onClick: t[1] ||= (e) => u.value = !1
				}, {
					default: q(() => [...t[12] ||= [N("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), P(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: f.value,
					disabled: f.value,
					onClick: h
				}, {
					default: q(() => [...t[13] ||= [N(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: q(() => [M("form", {
					class: "my-servers__add-form",
					onSubmit: Wn(h, ["prevent"])
				}, [
					t[10] ||= M("p", { class: "my-servers__add-help" }, [
						N(" On your media server, open "),
						M("strong", null, "Settings → Connect to hub"),
						N(" to get a claim code, then paste it here. ")
					], -1),
					t[11] ||= M("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					J(M("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => d.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: f.value
					}, null, 8, ka), [[G, d.value]]),
					p.value ? (z(), j("p", Aa, U(p.value), 1)) : A("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-8b86741c"]]), Ma = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, Na = {
	key: 0,
	class: "federation__skel"
}, Pa = {
	key: 2,
	class: "federation__content"
}, Fa = {
	key: 1,
	class: "federation__table-wrap"
}, Ia = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, La = { class: "federation__name" }, Ra = { class: "federation__url" }, za = { class: "federation__num" }, Ba = { class: "federation__date" }, Va = ["data-testid"], Ha = { class: "federation__actions" }, Ua = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, Wa = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = B([]), i = B(!0), a = B(null), o = B(""), s = B(""), c = B(""), l = B(!1);
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
				a.value = g(e, "Failed to load federation peers."), n.error(a.value);
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
					n.error(g(e, "Failed to add peer."));
				} finally {
					l.value = !1;
				}
			}
		}
		async function f(e) {
			try {
				await t.delete(`/api/v1/me/federation/peers/${e}`), n.success("Peer removed."), await u();
			} catch (e) {
				n.error(g(e, "Failed to remove peer."));
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
		return R(() => u(!0)), (e, t) => (z(), j("section", Ma, [t[10] ||= M("header", { class: "federation__head" }, [M("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), M("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (z(), j("div", Na, [P(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (z(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: q(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: q(() => [...t[4] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (z(), j("div", Pa, [
			t[9] ||= M("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (z(), k(T, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (z(), j("div", Fa, [M("table", Ia, [t[6] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Peer"),
				M("th", { scope: "col" }, "Shared libraries"),
				M("th", { scope: "col" }, "Last sync"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(z(!0), j(E, null, V(r.value, (e) => (z(), j("tr", { key: e.id }, [
				M("td", null, [M("div", La, U(e.name), 1), M("div", Ra, U(e.url), 1)]),
				M("td", za, U(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				M("td", Ba, U(p(e.last_sync)), 1),
				M("td", null, [M("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [P(S, { tone: h(e.status) }, {
					default: q(() => [N(U(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Va)]),
				M("td", null, [M("div", Ha, [P(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: q(() => [...t[5] ||= [N(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			M("section", Ua, [t[8] ||= M("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), M("form", {
				class: "federation__form",
				onSubmit: Wn(d, ["prevent"])
			}, [
				J(M("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[G, s.value]]),
				J(M("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[G, o.value]]),
				J(M("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[G, c.value]]),
				P(y, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: q(() => [...t[7] ||= [N(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), Ga = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Ka = {
	key: 0,
	class: "shares__skel"
}, qa = {
	key: 3,
	class: "shares__table-wrap"
}, Ja = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Ya = { class: "shares__library" }, Xa = { class: "shares__date" }, Za = { class: "shares__date" }, Qa = ["data-testid"], $a = { class: "shares__actions" }, eo = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = B([]), i = B(!0), a = B(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: _a(e.created_at) ?? "",
					expires_at: _a(e.expires_at)
				}));
			} catch (e) {
				a.value = g(e, "Failed to load shares."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function s(e) {
			try {
				await t.delete(`/api/v1/me/shares/${e}`), n.success("Share revoked."), await o();
			} catch (e) {
				n.error(g(e, "Failed to revoke share."));
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
		return R(() => o(!0)), (e, t) => (z(), j("section", Ga, [t[5] ||= M("header", { class: "shares__head" }, [M("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), M("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (z(), j("div", Ka, [P(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (z(), k(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: q(() => [P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: q(() => [...t[1] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (z(), k(T, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (z(), j("div", qa, [M("table", Ja, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Shared with"),
			M("th", { scope: "col" }, "Permissions"),
			M("th", { scope: "col" }, "Created"),
			M("th", { scope: "col" }, "Expires"),
			M("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(z(!0), j(E, null, V(r.value, (e) => (z(), j("tr", { key: e.id }, [
			M("td", null, [M("span", Ya, U(e.library_name), 1)]),
			M("td", null, U(e.shared_with), 1),
			M("td", null, [P(S, { tone: u(e.permissions) }, {
				default: q(() => [N(U(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			M("td", Xa, U(c(e.created_at)), 1),
			M("td", Za, [M("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [N(U(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (z(), k(S, {
				key: 0,
				tone: "error"
			}, {
				default: q(() => [...t[2] ||= [N("Expired", -1)]]),
				_: 1
			})) : A("", !0)], 8, Qa)]),
			M("td", null, [M("div", $a, [P(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: q(() => [...t[3] ||= [N(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function to(e, t) {
	let n = De(), r = !1;
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
//#region src/composables/useOnline.ts
function no() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = B(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), Rn(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), zn(t);
}
//#endregion
export { We as ALL_LOGS, Bt as AMBIENT_SAMPLE_H, cn as AMBIENT_SAMPLE_INTERVAL_MS, dn as AMBIENT_SAMPLE_W, Ot as ARROW_ICONS, kt as ARROW_LABELS, et as AdminBackupApi, tt as AdminCastApi, at as AdminCollectionsApi, Ge as AdminDashboardApi, nt as AdminDlnaServerApi, ot as AdminHistoryApi, ht as AdminHubDashboardApi, $e as AdminIntegrationsApi, lt as AdminLibrariesApi, it as AdminLiveTvApi, Ue as AdminLogsApi, mt as AdminPluginsApi, rt as AdminRemoteAccessApi, Qe as AdminServicesApi, ut as AdminSettingsApi, st as AdminSyncPlayApi, Je as AdminUsersApi, Ze as AdminWebhooksApi, Kt as AmbientCanvas, te as ApiClient, h as ApiError, e as AppBackdrop, fr as AppLayout, S as Badge, y as Button, Dn as CAPTION_BACKGROUND_OPTIONS, Sn as CAPTION_COLOR_OPTIONS, Tn as CAPTION_EDGE_OPTIONS, yn as CAPTION_SIZE_OPTIONS, pn as CAPTION_SIZE_SCALE, ai as CURRENT_SERVER_ID_KEY, oi as CURRENT_SERVER_NAME_KEY, yt as CaptionOverlay, bt as CaptionsMenu, we as Chip, Ee as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, en as DIRECT_PLAY_EXTENSIONS, T as EmptyState, Wa as FederationPage, ke as FilterBar, n as Icon, r as IconButton, de as Kbd, ct as LIBRARY_TYPES, ha as LibraryScanPage, re as LocalStorageTokenStore, kn as LoginForm, eo as ManageSharesPage, Me as MediaCard, He as MediaDetail, Oe as MediaGrid, Ve as MediaHomeRow, Ie as MediaRow, Pe as MetadataMatchModal, Ar as MiniPlayer, Ae as Modal, ja as MyServersPage, ee as NetworkError, jt as PLAYER_SHORTCUTS, ft as PLUGIN_SECRET_MASK, ra as PageTransition, ti as PhlixApp, on as Player, At as QualityMenu, Ke as RATING_LABELS, qe as RATING_OPTIONS, se as RESUME_MAX_RATIO, ae as RESUME_MIN_SECONDS, qt as ResumePrompt, na as Reveal, pe as SORT_TITLE_ARTICLES, Ye as SUBSCRIBABLE_EVENTS, zt as Scrubber, Te as Select, jn as SettingsForm, nr as Sheet, Yt as ShortcutsHelp, An as SignupForm, w as Skeleton, $t as SkipButton, Se as Slider, Xt as SpeedMenu, je as Spinner, Ce as Switch, ne as TMDB_UNCONFIGURED_CODE, an as TRANSCODE_EXTENSIONS, Fe as Tabs, ie as TimeoutError, ta as ToastHost, qi as Tooltip, Jt as TranscodeNotice, rn as TranscodePreparing, Ut as UPNEXT_COUNTDOWN_SECONDS, Zt as UPNEXT_RING_CIRCUMFERENCE, sn as UPNEXT_RING_RADIUS, Vt as UpNext, gt as VolumeControl, Xe as WEBHOOK_EVENT_CATEGORIES, Cn as activeAudioIndex, Ri as adminMenu, Ht as ambientGradient, En as applyAudioTrack, Br as applyStoredThemeEarly, mn as applyTrackModes, nn as attachHls, un as averageRegion, to as bindMediaStoreToRouter, Fi as buildAdminRoutes, Li as buildHubAdminRoutes, ze as buildMediaQuery, Le as buildMediaUrl, Ii as buildServerAdminRoutes, bn as captionStyleVars, On as cleanCueText, Ai as commonAdminPages, fe as compareByStrippedTitle, Gi as createPhlixApp, f as createTranslator, Lr as deriveAccentVars, hn as edgeShadow, g as errMessage, Wt as extensionOf, me as fetchLibraries, xe as formatPageTitle, Rt as formatTime, le as fuzzyScore, xt as handleShortcut, gn as hasActiveCaptions, c as hasStoredPreferences, Mi as hubAdminPages, Nt as isBatterySaving, fn as isFailedStatus, Gt as isFatalMediaError, Tt as isNativeHlsSupported, _ as isOffline, _t as isPlayable, m as isTmdbUnconfigured, wt as isTypingTarget, wn as listAudioTracks, xn as listSubtitleTracks, ue as matchCommand, u as mergeMessages, tn as needsTranscode, It as parseSubtitleTracks, Ct as parseTranscodeStart, Ft as parseTranscodeStatus, pt as pluginErrorCode, dt as pluginValidationErrors, vn as readActiveCueLines, o as readStoredPreferences, Lt as resolveStreamUrl, _n as resolveTextTrack, vt as rgbString, ln as rgbaString, Qt as ringDashoffset, Pt as sampleAmbient, ji as serverAdminPages, ye as setAppName, be as setPageTitle, ge as sortLibraries, he as stripLeadingArticle, St as transcodeStartPath, Et as transcodeStatusPath, Be as useApiBase, b as useAuthStore, Hr as useCommandPaletteHotkey, ce as useCommandStore, i as useFocusTrap, Mt as useHlsTranscode, Dt as useKeyboardShortcuts, _e as useLibrariesStore, Re as useMediaApiBase, De as useMediaStore, p as useMessages, no as useOnline, ve as usePageTitle, x as usePlayerStore, Kr as usePreconnect, a as usePreferencesStore, Ne as usePrefetch, Zr as useResumeReporter, qr as useResumeSync, ci as useServerStore, Vr as useTheme, C as useToastStore };

//# sourceMappingURL=phlix-ui.js.map