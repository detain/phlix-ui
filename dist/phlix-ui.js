import { r as e } from "./AuthField-n1LgzcyM.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-DkTu9l9P.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Dwm0lQlG.js";
import { a as m, c as h, d as g, f as _, i as v, l as ee, n as te, r as ne, s as re, t as y, u as ie } from "./Button-C1kpaQyo.js";
import { t as b } from "./useAuthStore-DmWD93w-.js";
import { i as x, n as ae, r as oe, t as se } from "./usePlayerStore-BMGj8146.js";
import { i as ce, n as le, r as ue, t as de } from "./Kbd-CSMm1T0l.js";
import { a as fe, i as pe, n as me, o as he, r as ge, t as _e } from "./useLibrariesStore-SM3lj2GQ.js";
import { i as ve, n as ye, r as be, t as xe } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Badge-ArWL5-WE.js";
import { t as Se } from "./Slider-BMn_Lp_q.js";
import { t as Ce } from "./Switch-CFZhdkXR.js";
import { t as we } from "./Chip-2HcSZF4a.js";
import { t as Te } from "./Select-DLwgQInL.js";
import { i as Ee, n as De, r as Oe, t as ke } from "./FilterBar-Cfr1-jHv.js";
import { t as Ae } from "./Modal-I4tEFhoH.js";
import { t as C } from "./useToastStore-BDoKlU6N.js";
import { t as w } from "./Skeleton-DkSoWF3C.js";
import { i as je, n as Me, r as Ne, t as Pe } from "./MetadataMatchModal-DgBfVIuE.js";
import { t as T } from "./EmptyState-B2QnGIQT.js";
import { t as Fe } from "./Tabs-x8dUKZN5.js";
import { t as Ie } from "./MediaRow-DcwCClji.js";
import { a as Le, i as Re, n as ze, t as Be } from "./useApiBase-DhSHB6Qp.js";
import { t as Ve } from "./HomeRow-CVPZqA8P.js";
import { t as He } from "./MediaDetail-Bwzq8-N5.js";
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
import { i as dt, n as ft, r as pt, t as mt } from "./plugins-Bwb86E5a.js";
import { t as ht } from "./hubDashboard-BhOaaDD-.js";
import { A as gt, B as _t, C as vt, D as yt, E as bt, F as xt, G as St, H as Ct, I as wt, J as Tt, K as Et, L as Dt, M as Ot, N as kt, O as At, P as jt, R as Mt, S as Nt, T as Pt, U as Ft, V as It, W as Lt, X as Rt, Y as zt, _ as Bt, a as Vt, b as Ht, c as Ut, d as Wt, f as Gt, g as Kt, h as qt, i as Jt, j as Yt, k as Xt, l as Zt, m as Qt, n as $t, o as en, p as tn, q as nn, r as rn, s as an, t as on, u as sn, v as cn, w as ln, x as un, y as dn, z as fn } from "./Player-DpoNhtth.js";
import { a as pn, c as mn, d as hn, f as gn, g as _n, h as vn, i as yn, l as bn, m as xn, n as Sn, o as Cn, p as wn, r as Tn, s as En, t as Dn, u as On } from "./captions-COgPp5bH.js";
import { t as kn } from "./LoginForm-D5uWt8VZ.js";
import { t as An } from "./SignupForm-BFE1Rody.js";
import { t as jn } from "./SettingsForm-BvI7E-Jh.js";
import { Fragment as E, Teleport as Mn, Transition as Nn, TransitionGroup as Pn, computed as D, createApp as Fn, createBlock as O, createCommentVNode as k, createElementBlock as A, createElementVNode as j, createTextVNode as M, createVNode as N, defineAsyncComponent as In, defineComponent as P, inject as Ln, normalizeClass as F, normalizeStyle as Rn, onBeforeUnmount as I, onMounted as L, onScopeDispose as zn, openBlock as R, readonly as Bn, ref as z, renderList as B, renderSlot as V, resolveDynamicComponent as Vn, toDisplayString as H, unref as U, useId as Hn, vModelText as W, watch as G, watchEffect as Un, withCtx as K, withDirectives as q, withKeys as Wn, withModifiers as Gn } from "vue";
import { createPinia as Kn, defineStore as qn } from "pinia";
import { RouterLink as J, RouterView as Jn, createRouter as Yn, createWebHistory as Xn, useRouter as Zn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var Qn = ["aria-labelledby"], $n = {
	key: 0,
	class: "phlix-sheet__header"
}, er = ["id"], tr = { class: "phlix-sheet__body" }, nr = {
	key: 1,
	class: "phlix-sheet__footer"
}, rr = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		let n = e, a = t, o = z(n.modelValue);
		G(() => n.modelValue, (e) => o.value = e);
		let s = z(null), c = Hn();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (R(), O(Mn, { to: "body" }, [N(Nn, { name: `phlix-sheet-${e.side}` }, {
			default: K(() => [e.modelValue ? (R(), A("div", {
				key: 0,
				class: F(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Gn(u, ["self"])
			}, [j("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? U(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (R(), A("header", $n, [e.title ? (R(), A("h2", {
					key: 0,
					id: U(c),
					class: "phlix-sheet__title"
				}, H(e.title), 9, er)) : k("", !0), e.hideClose ? k("", !0) : (R(), O(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : k("", !0),
				j("div", tr, [V(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (R(), A("footer", nr, [V(t.$slots, "footer", {}, void 0, !0)])) : k("", !0)
			], 8, Qn)], 34)) : k("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), ir = { class: "shell" }, ar = {
	class: "shell__skip",
	href: "#main"
}, or = { class: "shell__bar" }, sr = { class: "shell__inner" }, cr = { class: "shell__brand" }, lr = ["aria-label"], ur = { class: "shell__actions" }, dr = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, fr = {
	key: 0,
	class: "shell__footer"
}, pr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = z(!1), { t: o } = p();
		return (t, a) => (R(), A("div", ir, [
			j("a", ar, H(U(o)("shell.skipToContent")), 1),
			N(e, { enabled: U(n).atmosphere }, null, 8, ["enabled"]),
			j("header", or, [j("div", sr, [
				j("div", cr, [V(t.$slots, "logo", {}, () => [a[3] ||= j("span", { class: "shell__wordmark" }, [M("Phlix"), j("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				j("nav", {
					class: "shell__nav",
					"aria-label": U(o)("shell.primaryNav")
				}, [V(t.$slots, "nav", {}, void 0, !0)], 8, lr),
				a[4] ||= j("span", { class: "shell__spacer" }, null, -1),
				j("div", ur, [V(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (R(), O(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: U(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : k("", !0)
			])]),
			j("main", dr, [V(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (R(), A("footer", fr, [V(t.$slots, "footer", {}, void 0, !0)])) : k("", !0),
			N(rr, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: U(o)("shell.menu")
			}, {
				default: K(() => [j("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [V(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-aaaeed33"]]), mr = /* @__PURE__ */ P({
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
		return (e, t) => (R(), O(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), hr = ["aria-label", "aria-expanded"], gr = {
	key: 0,
	class: "usermenu__avatar"
}, _r = ["aria-label"], vr = { class: "usermenu__head" }, yr = { class: "usermenu__avatar usermenu__avatar--lg" }, br = { class: "usermenu__name" }, xr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = Zn(), a = Ln("phlixConfig", null), o = D(() => a?.routerBase ?? "/app"), { t: s } = p(), c = z(!1), l = z(null), u = z(null), d = D(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = D(() => d.value.charAt(0).toUpperCase() || "A");
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
		return G(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
		}), I(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (R(), A("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [j("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": U(t).isLoggedIn ? U(s)("shell.accountNamed", { name: d.value }) : U(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [U(t).isLoggedIn ? (R(), A("span", gr, H(f.value), 1)) : (R(), O(n, {
			key: 1,
			name: "user"
		}))], 8, hr), c.value ? (R(), A("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": U(s)("shell.account"),
			tabindex: "-1"
		}, [U(t).isLoggedIn ? (R(), A(E, { key: 0 }, [
			j("div", vr, [j("span", yr, H(f.value), 1), j("span", br, H(d.value), 1)]),
			j("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [N(n, { name: "settings" }), M(" " + H(U(s)("shell.settings")), 1)]),
			j("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [N(n, { name: "log-out" }), M(" " + H(U(s)("shell.signOut")), 1)])
		], 64)) : (R(), A("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [N(n, { name: "user" }), M(" " + H(U(s)("shell.signIn")), 1)]))], 8, _r)) : k("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Sr = ["aria-label"], Cr = ["src", "poster"], wr = { class: "mini__body" }, Tr = { class: "mini__title" }, Er = { class: "mini__controls" }, Dr = ["aria-label"], Or = ["aria-label"], kr = ["aria-label"], Ar = {
	class: "mini__progress",
	"aria-hidden": "true"
}, jr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = z(null), s = D(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = D(() => i.current?.name ?? ""), l = D(() => Math.max(0, Math.min(1, i.progress)));
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
		return G(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), I(() => {
			o.value?.pause?.();
		}), (e, t) => (R(), O(Nn, { name: "mini" }, {
			default: K(() => [s.value ? (R(), A("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": U(a)("player.miniPlayer")
			}, [
				j("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: U(i).streamUrl,
					poster: U(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: u,
					onPlay: d,
					onPause: f,
					onTimeupdate: m,
					onClick: g
				}, null, 40, Cr),
				j("div", wr, [j("p", Tr, H(c.value), 1), j("div", Er, [
					j("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": U(i).playing ? U(a)("player.pause") : U(a)("player.play"),
						onClick: h
					}, [N(n, { name: U(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Dr),
					j("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": U(a)("player.expand"),
						onClick: g
					}, [N(n, { name: "expand" })], 8, Or),
					j("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": U(a)("player.closePlayer"),
						onClick: _
					}, [N(n, { name: "x" })], 8, kr)
				])]),
				j("div", Ar, [j("div", {
					class: "mini__progress-fill",
					style: Rn({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Sr)) : k("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-76ca97c5"]]);
//#endregion
//#region src/composables/color.ts
function Mr(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Y = (e) => Math.max(0, Math.min(255, Math.round(e))), Nr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Y(e).toString(16).padStart(2, "0")).join("");
function Pr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Fr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Ir = ({ r: e, g: t, b: n }, r) => `rgba(${Y(e)}, ${Y(t)}, ${Y(n)}, ${r})`;
function Lr({ r: e, g: t, b: n }) {
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
function Rr(e) {
	let t = Mr(e);
	if (!t) return null;
	let n = Lr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Nr(t),
		"--accent-hover": Nr(Pr(t, .12)),
		"--accent-active": Nr(Fr(t, .12)),
		"--accent-soft": Ir(t, .14),
		"--accent-ring": Ir(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var zr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Br(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Rr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of zr) n.style.removeProperty(e);
}
function Vr(e) {
	let t = o();
	e && !c() && (t.theme = e), Br(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Hr() {
	let e = a();
	return Un(() => {
		Br({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Ur() {
	let e = ce(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), zn(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function X(e, t) {
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
function Wr(e) {
	let t = X(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = X(n, t);
	return !r || t && r === t ? null : r;
}
function Gr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (X(e.href) === t) return !0;
	return !1;
}
function Kr(e, t, n, r) {
	if (Gr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function qr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = X(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = X(e);
		r && (n && r === n || a.has(r) || (a.add(r), Kr("preconnect", r, t.crossOrigin === !0, i), Kr("dns-prefetch", r, !1, i)));
	}
	i.length && zn(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function Jr() {
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
var Yr = "phlix.deviceId", Xr = 15e3;
function Zr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(Yr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(Yr, e)), e;
	} catch {
		return "web";
	}
}
function Qr() {
	let e = x(), t = b(), n = Zr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < Xr)) {
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
	return G(() => Math.floor(e.position), () => void s()), G(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var $r = ["src", "alt"], ei = { class: "brand-wordmark" }, ti = {
	key: 1,
	class: "brand-tagline"
}, ni = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "PhlixApp",
	setup(e) {
		Hr();
		let t = ce(), i = Zn(), { t: a } = p();
		Ur();
		let o = In(() => import("./CommandPalette-ntNedT6K.js")), s = z(!1);
		G(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = Ln("phlixConfig", null);
		qr(Wr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = Jr();
		G(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), Qr();
		let m = D(() => l?.branding ?? {}), h = D(() => m.value.wordmark ?? "Phlix"), g = D(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = D(() => l?.home ?? l?.routerBase ?? "/app"), v = _e(), ee = D(() => g.value.some((e) => e.libraryLinks));
		G(() => u.isLoggedIn && ee.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function te(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (R(), O(pr, null, {
			logo: K(() => [N(U(J), {
				to: _.value,
				class: "brand"
			}, {
				default: K(() => [
					m.value.logoSrc ? (R(), A("img", {
						key: 0,
						src: m.value.logoSrc,
						alt: m.value.logoAlt ?? h.value,
						class: "brand-logo"
					}, null, 8, $r)) : k("", !0),
					j("span", ei, [M(H(h.value), 1), i[1] ||= j("span", { class: "brand-dot" }, ".", -1)]),
					m.value.tagline ? (R(), A("span", ti, H(m.value.tagline), 1)) : k("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: K(() => [g.value.length ? (R(!0), A(E, { key: 0 }, B(g.value, (e) => (R(), A(E, { key: e.id }, [(R(), O(Vn(e.href ? "a" : U(J)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? te(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: K(() => [e.icon ? (R(), O(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : k("", !0), M(" " + H(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (R(!0), A(E, null, B(e.libraryLinks ? U(v).items : [], (t) => (R(), O(U(J), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: K(() => [M(H(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (R(), A(E, { key: 1 }, [N(U(J), {
				to: _.value,
				class: "nav-link"
			}, {
				default: K(() => [M(H(U(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), N(U(J), {
				to: `${_.value}/settings`,
				class: "nav-link"
			}, {
				default: K(() => [M(H(U(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: K(() => [
				N(r, {
					name: "search",
					label: U(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => U(t).openPalette()
				}, null, 8, ["label"]),
				N(mr),
				N(xr)
			]),
			default: K(() => [
				N(U(Jn)),
				s.value ? (R(), O(U(o), { key: 0 })) : k("", !0),
				N(jr, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-5afba5d1"]]), ri = { class: "phlix-placeholder" }, ii = { class: "placeholder-content" }, ai = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (R(), A("div", ri, [j("div", ii, [n[0] ||= j("h1", null, "Shared UI loading...", -1), j("p", null, "Phlix " + H(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), oi = "phlix.currentServerId", Z = "phlix.currentServerName", si = "phlix.currentServerUrl";
function ci(e) {
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
var li = qn("server", () => {
	let e = z(ci(oi)), t = z(ci(Z)), n = z(ci(si)), r = D(() => e.value !== null);
	function i(r, i, a) {
		e.value = r, t.value = i ?? null, n.value = a && a !== "" ? a : null, Q(oi, r), Q(Z, i ?? null), Q(si, n.value);
	}
	function a() {
		e.value = null, t.value = null, n.value = null, Q(oi, null), Q(Z, null), Q(si, null);
	}
	return {
		currentServerId: e,
		currentServerName: t,
		currentServerUrl: n,
		hasCurrent: r,
		setCurrent: i,
		clear: a
	};
}), ui = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-rEaTSAK7.js")
}, di = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-CftSVD_P.js")
}, fi = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-Dt7hZDu1.js")
}, pi = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-uu-mX-eq.js")
}, mi = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-BbApjGZo.js")
}, hi = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-Dr2ocSpn.js")
}, gi = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-Bflyg1he.js")
}, _i = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-BZWDCf-Y.js")
}, vi = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-DhuGzIvN.js")
}, yi = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-BNmkYnKF.js")
}, bi = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-CkAiwQh3.js")
}, xi = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-Dfxom__L.js")
}, Si = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-Do-LMPvy.js")
}, Ci = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-B0XZl43f.js")
}, wi = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-N3FA2X1-.js")
}, Ti = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-7nwQ1VgE.js")
}, Ei = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-pxTBrUvl.js")
}, Di = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-DilaAUTC.js")
}, Oi = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-D0-WRHpU.js")
}, ki = Object.fromEntries([
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
	Di,
	Oi
].map((e) => [e.name, e.label]));
function Ai(e) {
	return e ? ki[e] ?? null : null;
}
var ji = [
	di,
	fi,
	Ei
], Mi = [
	ui,
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
], Ni = [Di, Oi], Pi = [
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
	Ei
], Fi = [
	Di,
	...ji,
	Oi
];
function Ii(e = "/app", t = Pi) {
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
function Li(e = "/app") {
	return Ii(e, Pi);
}
function Ri(e = "/app") {
	return Ii(e, Fi);
}
function zi(e = "/app", t = Pi) {
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
var Bi = ["login", "signup"];
function Vi(e, t, n = !1, r = { name: "browse" }) {
	let i = typeof e.name == "string" ? e.name : "";
	return Bi.includes(i) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? r : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Hi(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = Ai(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function Ui(e, t, n) {
	return e === "hub" && n ? `${t}/api/v1/servers/${n}/proxy` : t;
}
function Wi(e, t) {
	return e !== "hub" || t === null || t === "" ? "" : t.replace(/\/+$/, "");
}
function Gi() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Ki(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-B7E7wery.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-ByL_xUz2.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-DU4q49UG.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-D4rlsK__.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-BCpdfejD.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-BpqdJfVC.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-CEgm9wdQ.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-DO4c3RX9.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: ai,
		props: { appName: e.app }
	}), n;
}
function qi(e) {
	let t = {
		...Gi(),
		...e
	};
	Vr(t.defaultTheme), ye(t.branding?.wordmark);
	let n = f(t.messages), r = Kn();
	t.defaultTheme && !c() && (a(r).theme = t.defaultTheme);
	let i = Yn({
		history: Xn(),
		routes: Ki(t)
	}), o = t.home ? { path: t.home } : { name: "browse" };
	i.beforeEach(async (e) => {
		let t = b(r);
		return await t.init(), Vi(e, t.isLoggedIn, t.isAdmin, o);
	}), i.afterEach((e) => {
		be(Hi(e, n));
	});
	let s = li(r), l = D(() => Ui(t.app, t.apiBase, s.currentServerId)), u = D(() => Wi(t.app, s.currentServerUrl)), d = Fn(ni);
	return d.provide("apiBase", t.apiBase), d.provide("mediaApiBase", l), d.provide("mediaDirectBase", u), d.provide("phlixCommands", t.commands ?? []), d.provide("phlixConfig", t), d.use(r), d.use(i), d;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Ji = ["id"], Yi = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		let t = e, n = Hn(), r = z(!1), i = z(null), a;
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
		return I(() => clearTimeout(a)), (t, a) => (R(), A("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: Wn(c, ["esc"])
		}, [V(t.$slots, "default", {}, void 0, !0), N(Nn, { name: "phlix-tooltip" }, {
			default: K(() => [r.value && (e.text || t.$slots.content) ? (R(), A("span", {
				key: 0,
				id: U(n),
				role: "tooltip",
				class: F(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [V(t.$slots, "content", {}, () => [M(H(e.text), 1)], !0)], 10, Ji)) : k("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Xi = ["aria-label"], Zi = ["role"], Qi = { class: "phlix-toast__content" }, $i = {
	key: 0,
	class: "phlix-toast__title"
}, ea = { class: "phlix-toast__message" }, ta = ["onClick"], na = 0, ra = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		return L(() => {
			na++;
		}), I(() => {
			na--;
		}), (a, s) => (R(), O(Mn, { to: "body" }, [j("div", {
			class: F(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": U(t)("common.notifications")
		}, [N(Pn, { name: "phlix-toast" }, {
			default: K(() => [(R(!0), A(E, null, B(U(i).toasts, (e) => (R(), A("div", {
				key: e.id,
				class: F(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				N(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				j("div", Qi, [e.title ? (R(), A("p", $i, H(e.title), 1)) : k("", !0), j("p", ea, H(e.message), 1)]),
				e.action ? (R(), A("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), U(i).dismiss(e.id);
					}
				}, H(e.action.label), 9, ta)) : k("", !0),
				N(r, {
					name: "x",
					label: U(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => U(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Zi))), 128))]),
			_: 1
		})], 10, Xi)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), ia = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		let t = e, n = z(null), r = z(!1), i = z(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return L(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), I(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (R(), O(Vn(e.tag), {
			ref_key: "el",
			ref: n,
			class: F(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Rn({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: K(() => [V(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), aa = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (R(), O(Nn, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: K(() => [V(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), oa = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, sa = {
	key: 0,
	class: "library-scan__skel"
}, ca = {
	key: 3,
	class: "library-scan__table-wrap"
}, la = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, ua = { class: "library-scan__name" }, da = {
	key: 0,
	class: "library-scan__paths"
}, fa = { class: "library-scan__num" }, pa = { class: "library-scan__date" }, ma = ["data-testid"], ha = {
	key: 0,
	class: "library-scan__error"
}, ga = { class: "library-scan__actions" }, _a = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = z([]), i = z({}), a = z(!0), o = z(null);
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
		return L(s), (e, t) => (R(), A("section", oa, [t[4] ||= j("header", { class: "library-scan__head" }, [j("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), j("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (R(), A("div", sa, [N(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (R(), O(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: K(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: K(() => [...t[0] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (R(), O(T, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (R(), A("div", ca, [j("table", la, [t[3] ||= j("thead", null, [j("tr", null, [
			j("th", { scope: "col" }, "Library"),
			j("th", { scope: "col" }, "Type"),
			j("th", { scope: "col" }, "Items"),
			j("th", { scope: "col" }, "Last scan"),
			j("th", { scope: "col" }, "Status"),
			j("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), j("tbody", null, [(R(!0), A(E, null, B(r.value, (e) => (R(), A("tr", { key: e.id }, [
			j("td", null, [j("div", ua, H(e.name), 1), e.paths.length ? (R(), A("div", da, H(e.paths.join(", ")), 1)) : k("", !0)]),
			j("td", null, H(e.type), 1),
			j("td", fa, H(e.item_count === void 0 ? "—" : e.item_count), 1),
			j("td", pa, H(d(e.last_scan_at)), 1),
			j("td", null, [j("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [N(S, { tone: m(i.value[e.id]) }, {
				default: K(() => [M(H(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (R(), A("span", ha, H(i.value[e.id]?.error), 1)) : k("", !0)], 8, ma)]),
			j("td", null, [j("div", ga, [N(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: K(() => [...t[1] ||= [M(" Scan ", -1)]]),
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
				default: K(() => [...t[2] ||= [M(" Rescan ", -1)]]),
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
async function va(e, t, n) {
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
function ya(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var ba = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, xa = { class: "my-servers__head" }, Sa = {
	key: 0,
	class: "my-servers__skel"
}, Ca = {
	key: 3,
	class: "my-servers__table-wrap"
}, wa = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Ta = { class: "my-servers__name" }, Ea = { class: "my-servers__url" }, Da = { class: "my-servers__num" }, Oa = { class: "my-servers__date" }, ka = ["data-testid"], Aa = { class: "my-servers__actions" }, ja = ["disabled"], Ma = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, Na = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = b(), i = li(), a = Zn(), o = Ln("phlixConfig", void 0)?.routerBase || "/app", s = z([]), c = z(!0), l = z(null), u = z(!1), d = z(""), f = z(!1), p = z(null);
		function m() {
			d.value = "", p.value = null, u.value = !0;
		}
		async function h() {
			f.value = !0, p.value = null;
			try {
				await va("", d.value), u.value = !1, n.success("Server added."), await _();
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
					last_seen: ya(e.lastSeenAt)
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
			e.status === "online" && (i.setCurrent(e.id, e.name, e.url), a.push(o));
		}
		return L(_), (e, t) => (R(), A("section", ba, [
			j("header", xa, [t[4] ||= j("div", null, [j("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), j("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: m
			}, {
				default: K(() => [...t[3] ||= [M("Add server", -1)]]),
				_: 1
			})]),
			c.value ? (R(), A("div", Sa, [N(w, {
				variant: "text",
				lines: 6
			})])) : l.value ? (R(), O(T, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: l.value
			}, {
				actions: K(() => [N(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: _
				}, {
					default: K(() => [...t[5] ||= [M("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : s.value.length === 0 ? (R(), O(T, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: K(() => [N(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: m
				}, {
					default: K(() => [...t[6] ||= [M("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (R(), A("div", Ca, [j("table", wa, [t[9] ||= j("thead", null, [j("tr", null, [
				j("th", { scope: "col" }, "Server"),
				j("th", { scope: "col" }, "Owner"),
				j("th", { scope: "col" }, "Libraries"),
				j("th", { scope: "col" }, "Last seen"),
				j("th", { scope: "col" }, "Status"),
				j("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), j("tbody", null, [(R(!0), A(E, null, B(s.value, (e) => (R(), A("tr", { key: e.id }, [
				j("td", null, [j("div", Ta, H(e.name), 1), j("div", Ea, H(e.url), 1)]),
				j("td", null, H(e.owner), 1),
				j("td", Da, H(e.library_count === void 0 ? "—" : e.library_count), 1),
				j("td", Oa, H(ee(e.last_seen)), 1),
				j("td", null, [j("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [N(S, { tone: ne(e.status) }, {
					default: K(() => [M(H(te(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ka)]),
				j("td", null, [j("div", Aa, [N(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					disabled: e.status !== "online",
					title: e.status === "online" ? `Browse ${e.name} here` : "This server is offline — it must be connected to browse it here",
					"aria-label": `Browse ${e.name}`,
					onClick: (t) => ie(e)
				}, {
					default: K(() => [...t[7] ||= [M("Browse", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				]), N(y, {
					variant: "ghost",
					size: "sm",
					disabled: !e.url,
					title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
					"aria-label": `Manage ${e.name}`,
					onClick: (t) => re(e)
				}, {
					default: K(() => [...t[8] ||= [M("Manage", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				])])])
			]))), 128))])])])),
			N(Ae, {
				modelValue: u.value,
				"onUpdate:modelValue": t[2] ||= (e) => u.value = e,
				title: "Add a server"
			}, {
				footer: K(() => [N(y, {
					variant: "ghost",
					size: "sm",
					disabled: f.value,
					onClick: t[1] ||= (e) => u.value = !1
				}, {
					default: K(() => [...t[12] ||= [M("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), N(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: f.value,
					disabled: f.value,
					onClick: h
				}, {
					default: K(() => [...t[13] ||= [M(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: K(() => [j("form", {
					class: "my-servers__add-form",
					onSubmit: Gn(h, ["prevent"])
				}, [
					t[10] ||= j("p", { class: "my-servers__add-help" }, [
						M(" On your media server, open "),
						j("strong", null, "Settings → Connect to hub"),
						M(" to get a claim code, then paste it here. ")
					], -1),
					t[11] ||= j("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					q(j("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => d.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: f.value
					}, null, 8, ja), [[W, d.value]]),
					p.value ? (R(), A("p", Ma, H(p.value), 1)) : k("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-4871228b"]]), Pa = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, Fa = {
	key: 0,
	class: "federation__skel"
}, Ia = {
	key: 2,
	class: "federation__content"
}, La = {
	key: 1,
	class: "federation__table-wrap"
}, Ra = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, za = { class: "federation__name" }, Ba = { class: "federation__url" }, Va = { class: "federation__num" }, Ha = { class: "federation__date" }, Ua = ["data-testid"], Wa = { class: "federation__actions" }, Ga = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, Ka = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = z([]), i = z(!0), a = z(null), o = z(""), s = z(""), c = z(""), l = z(!1);
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
		return L(() => u(!0)), (e, t) => (R(), A("section", Pa, [t[10] ||= j("header", { class: "federation__head" }, [j("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), j("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (R(), A("div", Fa, [N(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (R(), O(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: K(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: K(() => [...t[4] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (R(), A("div", Ia, [
			t[9] ||= j("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (R(), O(T, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (R(), A("div", La, [j("table", Ra, [t[6] ||= j("thead", null, [j("tr", null, [
				j("th", { scope: "col" }, "Peer"),
				j("th", { scope: "col" }, "Shared libraries"),
				j("th", { scope: "col" }, "Last sync"),
				j("th", { scope: "col" }, "Status"),
				j("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), j("tbody", null, [(R(!0), A(E, null, B(r.value, (e) => (R(), A("tr", { key: e.id }, [
				j("td", null, [j("div", za, H(e.name), 1), j("div", Ba, H(e.url), 1)]),
				j("td", Va, H(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				j("td", Ha, H(p(e.last_sync)), 1),
				j("td", null, [j("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [N(S, { tone: h(e.status) }, {
					default: K(() => [M(H(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Ua)]),
				j("td", null, [j("div", Wa, [N(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: K(() => [...t[5] ||= [M(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			j("section", Ga, [t[8] ||= j("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), j("form", {
				class: "federation__form",
				onSubmit: Gn(d, ["prevent"])
			}, [
				q(j("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[W, s.value]]),
				q(j("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[W, o.value]]),
				q(j("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[W, c.value]]),
				N(y, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: K(() => [...t[7] ||= [M(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), qa = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Ja = {
	key: 0,
	class: "shares__skel"
}, Ya = {
	key: 3,
	class: "shares__table-wrap"
}, Xa = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Za = { class: "shares__library" }, Qa = { class: "shares__date" }, $a = { class: "shares__date" }, eo = ["data-testid"], to = { class: "shares__actions" }, no = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = z([]), i = z(!0), a = z(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: ya(e.created_at) ?? "",
					expires_at: ya(e.expires_at)
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
		return L(() => o(!0)), (e, t) => (R(), A("section", qa, [t[5] ||= j("header", { class: "shares__head" }, [j("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), j("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (R(), A("div", Ja, [N(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (R(), O(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: K(() => [N(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: K(() => [...t[1] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (R(), O(T, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (R(), A("div", Ya, [j("table", Xa, [t[4] ||= j("thead", null, [j("tr", null, [
			j("th", { scope: "col" }, "Library"),
			j("th", { scope: "col" }, "Shared with"),
			j("th", { scope: "col" }, "Permissions"),
			j("th", { scope: "col" }, "Created"),
			j("th", { scope: "col" }, "Expires"),
			j("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), j("tbody", null, [(R(!0), A(E, null, B(r.value, (e) => (R(), A("tr", { key: e.id }, [
			j("td", null, [j("span", Za, H(e.library_name), 1)]),
			j("td", null, H(e.shared_with), 1),
			j("td", null, [N(S, { tone: u(e.permissions) }, {
				default: K(() => [M(H(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			j("td", Qa, H(c(e.created_at)), 1),
			j("td", $a, [j("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [M(H(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (R(), O(S, {
				key: 0,
				tone: "error"
			}, {
				default: K(() => [...t[2] ||= [M("Expired", -1)]]),
				_: 1
			})) : k("", !0)], 8, eo)]),
			j("td", null, [j("div", to, [N(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: K(() => [...t[3] ||= [M(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function ro(e, t) {
	let n = De(), r = !1;
	n.setLibraryId(void 0), n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = G(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = G(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/useOnline.ts
function io() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = z(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), zn(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Bn(t);
}
//#endregion
export { We as ALL_LOGS, Bt as AMBIENT_SAMPLE_H, cn as AMBIENT_SAMPLE_INTERVAL_MS, dn as AMBIENT_SAMPLE_W, Ot as ARROW_ICONS, kt as ARROW_LABELS, et as AdminBackupApi, tt as AdminCastApi, at as AdminCollectionsApi, Ge as AdminDashboardApi, nt as AdminDlnaServerApi, ot as AdminHistoryApi, ht as AdminHubDashboardApi, $e as AdminIntegrationsApi, lt as AdminLibrariesApi, it as AdminLiveTvApi, Ue as AdminLogsApi, mt as AdminPluginsApi, rt as AdminRemoteAccessApi, Qe as AdminServicesApi, ut as AdminSettingsApi, st as AdminSyncPlayApi, Je as AdminUsersApi, Ze as AdminWebhooksApi, Kt as AmbientCanvas, te as ApiClient, h as ApiError, e as AppBackdrop, pr as AppLayout, S as Badge, y as Button, Dn as CAPTION_BACKGROUND_OPTIONS, Sn as CAPTION_COLOR_OPTIONS, Tn as CAPTION_EDGE_OPTIONS, yn as CAPTION_SIZE_OPTIONS, pn as CAPTION_SIZE_SCALE, oi as CURRENT_SERVER_ID_KEY, Z as CURRENT_SERVER_NAME_KEY, yt as CaptionOverlay, bt as CaptionsMenu, we as Chip, Ee as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, en as DIRECT_PLAY_EXTENSIONS, T as EmptyState, Ka as FederationPage, ke as FilterBar, n as Icon, r as IconButton, de as Kbd, ct as LIBRARY_TYPES, _a as LibraryScanPage, re as LocalStorageTokenStore, kn as LoginForm, no as ManageSharesPage, Me as MediaCard, He as MediaDetail, Oe as MediaGrid, Ve as MediaHomeRow, Ie as MediaRow, Pe as MetadataMatchModal, jr as MiniPlayer, Ae as Modal, Na as MyServersPage, ee as NetworkError, jt as PLAYER_SHORTCUTS, ft as PLUGIN_SECRET_MASK, aa as PageTransition, ni as PhlixApp, on as Player, At as QualityMenu, Ke as RATING_LABELS, qe as RATING_OPTIONS, se as RESUME_MAX_RATIO, ae as RESUME_MIN_SECONDS, qt as ResumePrompt, ia as Reveal, pe as SORT_TITLE_ARTICLES, Ye as SUBSCRIBABLE_EVENTS, zt as Scrubber, Te as Select, jn as SettingsForm, rr as Sheet, Yt as ShortcutsHelp, An as SignupForm, w as Skeleton, $t as SkipButton, Se as Slider, Xt as SpeedMenu, je as Spinner, Ce as Switch, ne as TMDB_UNCONFIGURED_CODE, an as TRANSCODE_EXTENSIONS, Fe as Tabs, ie as TimeoutError, ra as ToastHost, Yi as Tooltip, Jt as TranscodeNotice, rn as TranscodePreparing, Ut as UPNEXT_COUNTDOWN_SECONDS, Zt as UPNEXT_RING_CIRCUMFERENCE, sn as UPNEXT_RING_RADIUS, Vt as UpNext, gt as VolumeControl, Xe as WEBHOOK_EVENT_CATEGORIES, Cn as activeAudioIndex, zi as adminMenu, Ht as ambientGradient, En as applyAudioTrack, Vr as applyStoredThemeEarly, mn as applyTrackModes, nn as attachHls, un as averageRegion, ro as bindMediaStoreToRouter, Ii as buildAdminRoutes, Ri as buildHubAdminRoutes, Re as buildMediaQuery, Le as buildMediaUrl, Li as buildServerAdminRoutes, bn as captionStyleVars, On as cleanCueText, ji as commonAdminPages, fe as compareByStrippedTitle, qi as createPhlixApp, f as createTranslator, Rr as deriveAccentVars, hn as edgeShadow, g as errMessage, Wt as extensionOf, me as fetchLibraries, xe as formatPageTitle, Rt as formatTime, le as fuzzyScore, xt as handleShortcut, gn as hasActiveCaptions, c as hasStoredPreferences, Ni as hubAdminPages, Nt as isBatterySaving, fn as isFailedStatus, Gt as isFatalMediaError, Tt as isNativeHlsSupported, _ as isOffline, _t as isPlayable, m as isTmdbUnconfigured, wt as isTypingTarget, wn as listAudioTracks, xn as listSubtitleTracks, ue as matchCommand, u as mergeMessages, tn as needsTranscode, It as parseSubtitleTracks, Ct as parseTranscodeStart, Ft as parseTranscodeStatus, pt as pluginErrorCode, dt as pluginValidationErrors, vn as readActiveCueLines, o as readStoredPreferences, Lt as resolveStreamUrl, _n as resolveTextTrack, vt as rgbString, ln as rgbaString, Qt as ringDashoffset, Pt as sampleAmbient, Mi as serverAdminPages, ye as setAppName, be as setPageTitle, ge as sortLibraries, he as stripLeadingArticle, St as transcodeStartPath, Et as transcodeStatusPath, Be as useApiBase, b as useAuthStore, Ur as useCommandPaletteHotkey, ce as useCommandStore, i as useFocusTrap, Mt as useHlsTranscode, Dt as useKeyboardShortcuts, _e as useLibrariesStore, ze as useMediaApiBase, De as useMediaStore, p as useMessages, io as useOnline, ve as usePageTitle, x as usePlayerStore, qr as usePreconnect, a as usePreferencesStore, Ne as usePrefetch, Qr as useResumeReporter, Jr as useResumeSync, li as useServerStore, Hr as useTheme, C as useToastStore };

//# sourceMappingURL=phlix-ui.js.map