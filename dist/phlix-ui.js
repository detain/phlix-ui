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
import { i as C, n as se, r as ce, t as le } from "./Kbd-CSMm1T0l.js";
import { n as ue, r as de, t as fe } from "./useLibrariesStore-BehDWfBH.js";
import { i as pe, n as me, r as he, t as ge } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Badge-ArWL5-WE.js";
import { t as _e } from "./Slider-BMn_Lp_q.js";
import { t as ve } from "./Switch-CFZhdkXR.js";
import { t as ye } from "./Chip-2HcSZF4a.js";
import { t as be } from "./Select-DLwgQInL.js";
import { i as xe, n as Se, r as Ce, t as we } from "./FilterBar-D6z5f_eZ.js";
import { t as Te } from "./Modal-I4tEFhoH.js";
import { t as T } from "./useToastStore-BDoKlU6N.js";
import { t as E } from "./Skeleton-DkSoWF3C.js";
import { i as Ee, n as De, r as Oe, t as ke } from "./MetadataMatchModal-BHe9IKxt.js";
import { t as D } from "./EmptyState-B2QnGIQT.js";
import { t as Ae } from "./Tabs-x8dUKZN5.js";
import { t as je } from "./MediaRow-IZZlzNCX.js";
import { n as Me, t as Ne } from "./media-query-BcVLE7J6.js";
import { t as Pe } from "./HomeRow-jlo610n5.js";
import { t as Fe } from "./MediaDetail-rZkdmxJ3.js";
import { n as Ie, t as Le } from "./logs-DadTfaTq.js";
import { t as Re } from "./dashboard-BTCOCTHQ.js";
import { n as ze, r as Be, t as Ve } from "./users-C40iLgkq.js";
import { n as He, r as Ue, t as We } from "./webhooks-BBTLnFKm.js";
import { t as Ge } from "./services-Czm8hsvH.js";
import { t as Ke } from "./integrations-DLAG9ISY.js";
import { t as qe } from "./backup-IdY_vzc2.js";
import { t as Je } from "./cast-BvFcBEB6.js";
import { t as Ye } from "./dlnaServer-B5Sg4MkS.js";
import { t as Xe } from "./remoteAccess-DVKRpKQ8.js";
import { t as Ze } from "./liveTv-Dbjt901v.js";
import { t as Qe } from "./collections-CH3HLdcd.js";
import { t as $e } from "./history-ByCY8OYj.js";
import { t as et } from "./syncPlay-DPzJkgkK.js";
import { n as tt, t as nt } from "./libraries-CXAz_kXs.js";
import { t as rt } from "./settings-m4upFcmH.js";
import { t as it } from "./hubDashboard-BhOaaDD-.js";
import { A as at, B as ot, C as st, D as ct, E as lt, F as ut, G as dt, H as ft, I as pt, J as mt, K as ht, L as gt, M as _t, N as vt, O as yt, P as bt, R as xt, S as St, T as Ct, U as wt, V as Tt, W as Et, X as Dt, Y as Ot, _ as kt, a as At, b as jt, c as Mt, d as Nt, f as Pt, g as Ft, h as It, i as Lt, j as Rt, k as zt, l as Bt, m as Vt, n as Ht, o as Ut, p as Wt, q as Gt, r as Kt, s as qt, t as Jt, u as Yt, v as Xt, w as Zt, x as Qt, y as $t, z as en } from "./Player-BLdsVBjN.js";
import { a as tn, c as nn, d as rn, f as an, g as on, h as sn, i as cn, l as ln, m as un, n as dn, o as fn, p as pn, r as mn, s as hn, t as gn, u as _n } from "./captions-COgPp5bH.js";
import { t as vn } from "./LoginForm-DnyDuUUr.js";
import { t as yn } from "./SignupForm-BMgkDv4W.js";
import { t as bn } from "./SettingsForm-C_jqVWcp.js";
import { Fragment as O, Teleport as xn, Transition as k, TransitionGroup as Sn, computed as A, createApp as Cn, createBlock as j, createCommentVNode as M, createElementBlock as N, createElementVNode as P, createTextVNode as F, createVNode as I, defineAsyncComponent as wn, defineComponent as L, inject as Tn, normalizeClass as R, normalizeStyle as En, onBeforeUnmount as z, onMounted as B, onScopeDispose as Dn, openBlock as V, readonly as On, ref as H, renderList as U, renderSlot as W, resolveDynamicComponent as kn, toDisplayString as G, unref as K, useId as An, vModelText as jn, watch as q, watchEffect as Mn, withCtx as J, withDirectives as Nn, withKeys as Pn, withModifiers as Fn } from "vue";
import { createPinia as In } from "pinia";
import { RouterLink as Y, RouterView as Ln, createRouter as Rn, createWebHistory as zn, useRouter as Bn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var Vn = ["aria-labelledby"], Hn = {
	key: 0,
	class: "phlix-sheet__header"
}, Un = ["id"], Wn = { class: "phlix-sheet__body" }, Gn = {
	key: 1,
	class: "phlix-sheet__footer"
}, Kn = /*#__PURE__*/ t(/* @__PURE__ */ L({
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
		let s = H(null), c = An();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (V(), j(xn, { to: "body" }, [I(k, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (V(), N("div", {
				key: 0,
				class: R(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Fn(u, ["self"])
			}, [P("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? K(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (V(), N("header", Hn, [e.title ? (V(), N("h2", {
					key: 0,
					id: K(c),
					class: "phlix-sheet__title"
				}, G(e.title), 9, Un)) : M("", !0), e.hideClose ? M("", !0) : (V(), j(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : M("", !0),
				P("div", Wn, [W(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (V(), N("footer", Gn, [W(t.$slots, "footer", {}, void 0, !0)])) : M("", !0)
			], 8, Vn)], 34)) : M("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), qn = { class: "shell" }, Jn = {
	class: "shell__skip",
	href: "#main"
}, Yn = { class: "shell__bar" }, Xn = { class: "shell__inner" }, Zn = { class: "shell__brand" }, Qn = ["aria-label"], $n = { class: "shell__actions" }, er = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, tr = {
	key: 0,
	class: "shell__footer"
}, nr = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = H(!1), { t: o } = p();
		return (t, a) => (V(), N("div", qn, [
			P("a", Jn, G(K(o)("shell.skipToContent")), 1),
			I(e, { enabled: K(n).atmosphere }, null, 8, ["enabled"]),
			P("header", Yn, [P("div", Xn, [
				P("div", Zn, [W(t.$slots, "logo", {}, () => [a[3] ||= P("span", { class: "shell__wordmark" }, [F("Phlix"), P("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				P("nav", {
					class: "shell__nav",
					"aria-label": K(o)("shell.primaryNav")
				}, [W(t.$slots, "nav", {}, void 0, !0)], 8, Qn),
				a[4] ||= P("span", { class: "shell__spacer" }, null, -1),
				P("div", $n, [W(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (V(), j(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: K(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : M("", !0)
			])]),
			P("main", er, [W(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (V(), N("footer", tr, [W(t.$slots, "footer", {}, void 0, !0)])) : M("", !0),
			I(Kn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: K(o)("shell.menu")
			}, {
				default: J(() => [P("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [W(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-db48fc6e"]]), rr = /* @__PURE__ */ L({
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
		}, c = A(() => i[(i.indexOf(t.theme) + 1) % i.length]), l = A(() => o[t.theme] ?? "moon"), u = A(() => n("shell.themeToggleLabel", {
			current: s[t.theme] ?? t.theme,
			next: s[c.value]
		}));
		function d() {
			t.theme = c.value;
		}
		return (e, t) => (V(), j(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), ir = ["aria-label", "aria-expanded"], ar = {
	key: 0,
	class: "usermenu__avatar"
}, or = ["aria-label"], sr = { class: "usermenu__head" }, cr = { class: "usermenu__avatar usermenu__avatar--lg" }, lr = { class: "usermenu__name" }, ur = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = Bn(), a = Tn("phlixConfig", null), o = A(() => a?.routerBase ?? "/app"), { t: s } = p(), c = H(!1), l = H(null), u = H(null), d = A(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = A(() => d.value.charAt(0).toUpperCase() || "A");
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
		}), z(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (V(), N("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [P("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": K(t).isLoggedIn ? K(s)("shell.accountNamed", { name: d.value }) : K(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [K(t).isLoggedIn ? (V(), N("span", ar, G(f.value), 1)) : (V(), j(n, {
			key: 1,
			name: "user"
		}))], 8, ir), c.value ? (V(), N("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": K(s)("shell.account"),
			tabindex: "-1"
		}, [K(t).isLoggedIn ? (V(), N(O, { key: 0 }, [
			P("div", sr, [P("span", cr, G(f.value), 1), P("span", lr, G(d.value), 1)]),
			P("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [I(n, { name: "settings" }), F(" " + G(K(s)("shell.settings")), 1)]),
			P("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [I(n, { name: "log-out" }), F(" " + G(K(s)("shell.signOut")), 1)])
		], 64)) : (V(), N("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [I(n, { name: "user" }), F(" " + G(K(s)("shell.signIn")), 1)]))], 8, or)) : M("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), dr = ["aria-label"], fr = ["src", "poster"], pr = { class: "mini__body" }, mr = { class: "mini__title" }, hr = { class: "mini__controls" }, gr = ["aria-label"], _r = ["aria-label"], vr = ["aria-label"], yr = {
	class: "mini__progress",
	"aria-hidden": "true"
}, br = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = H(null), s = A(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = A(() => i.current?.name ?? ""), l = A(() => Math.max(0, Math.min(1, i.progress)));
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
		}), z(() => {
			o.value?.pause?.();
		}), (e, t) => (V(), j(k, { name: "mini" }, {
			default: J(() => [s.value ? (V(), N("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": K(a)("player.miniPlayer")
			}, [
				P("video", {
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
				}, null, 40, fr),
				P("div", pr, [P("p", mr, G(c.value), 1), P("div", hr, [
					P("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": K(i).playing ? K(a)("player.pause") : K(a)("player.play"),
						onClick: h
					}, [I(n, { name: K(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, gr),
					P("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": K(a)("player.expand"),
						onClick: g
					}, [I(n, { name: "expand" })], 8, _r),
					P("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": K(a)("player.closePlayer"),
						onClick: _
					}, [I(n, { name: "x" })], 8, vr)
				])]),
				P("div", yr, [P("div", {
					class: "mini__progress-fill",
					style: En({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, dr)) : M("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function xr(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var X = (e) => Math.max(0, Math.min(255, Math.round(e))), Sr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => X(e).toString(16).padStart(2, "0")).join("");
function Cr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function wr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Tr = ({ r: e, g: t, b: n }, r) => `rgba(${X(e)}, ${X(t)}, ${X(n)}, ${r})`;
function Er({ r: e, g: t, b: n }) {
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
function Dr(e) {
	let t = xr(e);
	if (!t) return null;
	let n = Er(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Sr(t),
		"--accent-hover": Sr(Cr(t, .12)),
		"--accent-active": Sr(wr(t, .12)),
		"--accent-soft": Tr(t, .14),
		"--accent-ring": Tr(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Or = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function kr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Dr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Or) n.style.removeProperty(e);
}
function Ar(e) {
	let t = o();
	e && !c() && (t.theme = e), kr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function jr() {
	let e = a();
	return Mn(() => {
		kr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Mr() {
	let e = C(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), Dn(() => document.removeEventListener("keydown", t)));
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
function Nr(e) {
	let t = Z(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Z(n, t);
	return !r || t && r === t ? null : r;
}
function Pr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Z(e.href) === t) return !0;
	return !1;
}
function Fr(e, t, n, r) {
	if (Pr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function Ir(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Z(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Z(e);
		r && (n && r === n || a.has(r) || (a.add(r), Fr("preconnect", r, t.crossOrigin === !0, i), Fr("dns-prefetch", r, !1, i)));
	}
	i.length && Dn(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function Lr() {
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
var Rr = "phlix.deviceId", zr = 15e3;
function Br() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(Rr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(Rr, e)), e;
	} catch {
		return "web";
	}
}
function Vr() {
	let e = x(), t = b(), n = Br(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < zr)) {
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
var Hr = ["src", "alt"], Ur = { class: "brand-wordmark" }, Wr = {
	key: 1,
	class: "brand-tagline"
}, Gr = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "PhlixApp",
	setup(e) {
		jr();
		let t = C(), i = Bn(), { t: a } = p();
		Mr();
		let o = wn(() => import("./CommandPalette-ntNedT6K.js")), s = H(!1);
		q(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = Tn("phlixConfig", null);
		Ir(Nr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = Lr();
		q(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 }), Vr();
		let f = A(() => l?.branding ?? {}), m = A(() => f.value.wordmark ?? "Phlix"), h = A(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = A(() => l?.routerBase ?? "/app"), _ = fe(), ee = A(() => h.value.some((e) => e.libraryLinks));
		q(() => u.isLoggedIn && ee.value, (e) => {
			e && _.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function te(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (V(), j(nr, null, {
			logo: J(() => [I(K(Y), {
				to: g.value,
				class: "brand"
			}, {
				default: J(() => [
					f.value.logoSrc ? (V(), N("img", {
						key: 0,
						src: f.value.logoSrc,
						alt: f.value.logoAlt ?? m.value,
						class: "brand-logo"
					}, null, 8, Hr)) : M("", !0),
					P("span", Ur, [F(G(m.value), 1), i[1] ||= P("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (V(), N("span", Wr, G(f.value.tagline), 1)) : M("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [h.value.length ? (V(!0), N(O, { key: 0 }, U(h.value, (e) => (V(), N(O, { key: e.id }, [(V(), j(kn(e.href ? "a" : K(Y)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? te(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: J(() => [e.icon ? (V(), j(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : M("", !0), F(" " + G(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (V(!0), N(O, null, U(e.libraryLinks ? K(_).items : [], (t) => (V(), j(K(Y), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: J(() => [F(G(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (V(), N(O, { key: 1 }, [I(K(Y), {
				to: g.value,
				class: "nav-link"
			}, {
				default: J(() => [F(G(K(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), I(K(Y), {
				to: `${g.value}/settings`,
				class: "nav-link"
			}, {
				default: J(() => [F(G(K(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: J(() => [
				I(r, {
					name: "search",
					label: K(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => K(t).openPalette()
				}, null, 8, ["label"]),
				I(rr),
				I(ur)
			]),
			default: J(() => [
				I(K(Ln)),
				s.value ? (V(), j(K(o), { key: 0 })) : M("", !0),
				I(br, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-3d8a20f5"]]), Kr = { class: "phlix-placeholder" }, qr = { class: "placeholder-content" }, Jr = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (V(), N("div", Kr, [P("div", qr, [n[0] ||= P("h1", null, "Shared UI loading...", -1), P("p", null, "Phlix " + G(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), Yr = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-CD5K7uzK.js")
}, Xr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-DVEFVwFt.js")
}, Zr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-BppIR-W9.js")
}, Qr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-Ci775vCZ.js")
}, $r = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-DWWzkzWn.js")
}, ei = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-inEWLI4s.js")
}, ti = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-BT8-TfdR.js")
}, ni = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-C2JUOVfw.js")
}, ri = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-DZH7wet6.js")
}, ii = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-BGQhQ9hU.js")
}, ai = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-ISFW1d9Y.js")
}, Q = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-BjmCmr0Q.js")
}, oi = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-DPT7DJgD.js")
}, si = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-CqkvqDhz.js")
}, ci = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-CIvMVgox.js")
}, li = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-ujphcdd0.js")
}, ui = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-DxdJCtjy.js")
}, di = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-77uFgy6y.js")
}, fi = Object.fromEntries([
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
	ai,
	Q,
	oi,
	si,
	ci,
	li,
	ui,
	di
].map((e) => [e.name, e.label]));
function pi(e) {
	return e ? fi[e] ?? null : null;
}
var mi = [
	Xr,
	Zr,
	li
], hi = [
	Yr,
	Qr,
	$r,
	ei,
	ti,
	ni,
	ri,
	ii,
	ai,
	Q,
	oi,
	si,
	ci
], gi = [ui, di], _i = [
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
	ai,
	Q,
	oi,
	si,
	ci,
	li
], vi = [
	ui,
	...mi,
	di
];
function yi(e = "/app", t = _i) {
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
function bi(e = "/app") {
	return yi(e, _i);
}
function xi(e = "/app") {
	return yi(e, vi);
}
function Si(e = "/app", t = _i) {
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
var Ci = ["login", "signup"];
function wi(e, t, n = !1) {
	let r = typeof e.name == "string" ? e.name : "";
	return Ci.includes(r) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? { name: "browse" } : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Ti(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = pi(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function Ei() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Di(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-D_xD4Juz.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-D3-RM7n9.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-BYmz-9jv.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-DjM21Yyx.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-BeFEhNCj.js")
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
		component: Jr,
		props: { appName: e.app }
	}), n;
}
function Oi(e) {
	let t = {
		...Ei(),
		...e
	};
	Ar(t.defaultTheme), me(t.branding?.wordmark);
	let n = f(t.messages), r = In();
	t.defaultTheme && !c() && (a(r).theme = t.defaultTheme);
	let i = Rn({
		history: zn(),
		routes: Di(t)
	});
	i.beforeEach(async (e) => {
		let t = b(r);
		return await t.init(), wi(e, t.isLoggedIn, t.isAdmin);
	}), i.afterEach((e) => {
		he(Ti(e, n));
	});
	let o = Cn(Gr);
	return o.provide("apiBase", t.apiBase), o.provide("phlixCommands", t.commands ?? []), o.provide("phlixConfig", t), o.use(r), o.use(i), o;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var ki = ["id"], Ai = /*#__PURE__*/ t(/* @__PURE__ */ L({
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
		let t = e, n = An(), r = H(!1), i = H(null), a;
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
		return z(() => clearTimeout(a)), (t, a) => (V(), N("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: Pn(c, ["esc"])
		}, [W(t.$slots, "default", {}, void 0, !0), I(k, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (V(), N("span", {
				key: 0,
				id: K(n),
				role: "tooltip",
				class: R(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [W(t.$slots, "content", {}, () => [F(G(e.text), 1)], !0)], 10, ki)) : M("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), ji = ["aria-label"], Mi = ["role"], Ni = { class: "phlix-toast__content" }, Pi = {
	key: 0,
	class: "phlix-toast__title"
}, Fi = { class: "phlix-toast__message" }, Ii = ["onClick"], Li = 0, Ri = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = p(), i = T(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return B(() => {
			Li++;
		}), z(() => {
			Li--;
		}), (a, s) => (V(), j(xn, { to: "body" }, [P("div", {
			class: R(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": K(t)("common.notifications")
		}, [I(Sn, { name: "phlix-toast" }, {
			default: J(() => [(V(!0), N(O, null, U(K(i).toasts, (e) => (V(), N("div", {
				key: e.id,
				class: R(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				I(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				P("div", Ni, [e.title ? (V(), N("p", Pi, G(e.title), 1)) : M("", !0), P("p", Fi, G(e.message), 1)]),
				e.action ? (V(), N("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), K(i).dismiss(e.id);
					}
				}, G(e.action.label), 9, Ii)) : M("", !0),
				I(r, {
					name: "x",
					label: K(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => K(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Mi))), 128))]),
			_: 1
		})], 10, ji)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), zi = /*#__PURE__*/ t(/* @__PURE__ */ L({
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
		}), (t, a) => (V(), j(kn(e.tag), {
			ref_key: "el",
			ref: n,
			class: R(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: En({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [W(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Bi = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (V(), j(k, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: J(() => [W(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Vi = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Hi = {
	key: 0,
	class: "library-scan__skel"
}, Ui = {
	key: 3,
	class: "library-scan__table-wrap"
}, Wi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Gi = { class: "library-scan__name" }, Ki = {
	key: 0,
	class: "library-scan__paths"
}, qi = { class: "library-scan__num" }, Ji = { class: "library-scan__date" }, Yi = ["data-testid"], Xi = {
	key: 0,
	class: "library-scan__error"
}, Zi = { class: "library-scan__actions" }, Qi = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = T(), r = H([]), i = H({}), a = H(!0), o = H(null);
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
		return B(s), (e, t) => (V(), N("section", Vi, [t[4] ||= P("header", { class: "library-scan__head" }, [P("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), P("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (V(), N("div", Hi, [I(E, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: J(() => [I(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[0] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), j(D, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (V(), N("div", Ui, [P("table", Wi, [t[3] ||= P("thead", null, [P("tr", null, [
			P("th", { scope: "col" }, "Library"),
			P("th", { scope: "col" }, "Type"),
			P("th", { scope: "col" }, "Items"),
			P("th", { scope: "col" }, "Last scan"),
			P("th", { scope: "col" }, "Status"),
			P("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), P("tbody", null, [(V(!0), N(O, null, U(r.value, (e) => (V(), N("tr", { key: e.id }, [
			P("td", null, [P("div", Gi, G(e.name), 1), e.paths.length ? (V(), N("div", Ki, G(e.paths.join(", ")), 1)) : M("", !0)]),
			P("td", null, G(e.type), 1),
			P("td", qi, G(e.item_count === void 0 ? "—" : e.item_count), 1),
			P("td", Ji, G(d(e.last_scan_at)), 1),
			P("td", null, [P("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [I(w, { tone: m(i.value[e.id]) }, {
				default: J(() => [F(G(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (V(), N("span", Xi, G(i.value[e.id]?.error), 1)) : M("", !0)], 8, Yi)]),
			P("td", null, [P("div", Zi, [I(v, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: J(() => [...t[1] ||= [F(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), I(v, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: J(() => [...t[2] ||= [F(" Rescan ", -1)]]),
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
var $i = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, ea = { class: "my-servers__head" }, ta = {
	key: 0,
	class: "my-servers__skel"
}, na = {
	key: 3,
	class: "my-servers__table-wrap"
}, ra = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, ia = { class: "my-servers__name" }, aa = { class: "my-servers__url" }, oa = { class: "my-servers__num" }, sa = { class: "my-servers__date" }, ca = ["data-testid"], la = { class: "my-servers__actions" }, ua = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = T(), r = b(), i = H([]), a = H(!0), o = H(null);
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
		return B(s), (e, t) => (V(), N("section", $i, [P("header", ea, [t[1] ||= P("div", null, [P("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), P("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), I(v, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: J(() => [...t[0] ||= [F("Add server", -1)]]),
			_: 1
		})]), a.value ? (V(), N("div", ta, [I(E, {
			variant: "text",
			lines: 6
		})])) : o.value ? (V(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: J(() => [I(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[2] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (V(), j(D, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: J(() => [I(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: J(() => [...t[3] ||= [F("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (V(), N("div", na, [P("table", ra, [t[5] ||= P("thead", null, [P("tr", null, [
			P("th", { scope: "col" }, "Server"),
			P("th", { scope: "col" }, "Owner"),
			P("th", { scope: "col" }, "Libraries"),
			P("th", { scope: "col" }, "Last seen"),
			P("th", { scope: "col" }, "Status"),
			P("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), P("tbody", null, [(V(!0), N(O, null, U(i.value, (e) => (V(), N("tr", { key: e.id }, [
			P("td", null, [P("div", ia, G(e.name), 1), P("div", aa, G(e.url), 1)]),
			P("td", null, G(e.owner), 1),
			P("td", oa, G(e.library_count === void 0 ? "—" : e.library_count), 1),
			P("td", sa, G(c(e.last_seen)), 1),
			P("td", null, [P("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [I(w, { tone: u(e.status) }, {
				default: J(() => [F(G(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, ca)]),
			P("td", null, [P("div", la, [I(v, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: J(() => [...t[4] ||= [F("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), da = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, fa = {
	key: 0,
	class: "federation__skel"
}, pa = {
	key: 2,
	class: "federation__content"
}, ma = {
	key: 1,
	class: "federation__table-wrap"
}, ha = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, ga = { class: "federation__name" }, _a = { class: "federation__url" }, va = { class: "federation__num" }, ya = { class: "federation__date" }, ba = ["data-testid"], xa = { class: "federation__actions" }, Sa = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, Ca = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = T(), r = H([]), i = H(!0), a = H(null), o = H(""), s = H(""), c = H(""), l = H(!1);
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
		return B(() => u(!0)), (e, t) => (V(), N("section", da, [t[10] ||= P("header", { class: "federation__head" }, [P("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), P("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (V(), N("div", fa, [I(E, {
			variant: "text",
			lines: 6
		})])) : a.value ? (V(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: J(() => [I(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: J(() => [...t[4] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (V(), N("div", pa, [
			t[9] ||= P("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (V(), j(D, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (V(), N("div", ma, [P("table", ha, [t[6] ||= P("thead", null, [P("tr", null, [
				P("th", { scope: "col" }, "Peer"),
				P("th", { scope: "col" }, "Shared libraries"),
				P("th", { scope: "col" }, "Last sync"),
				P("th", { scope: "col" }, "Status"),
				P("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), P("tbody", null, [(V(!0), N(O, null, U(r.value, (e) => (V(), N("tr", { key: e.id }, [
				P("td", null, [P("div", ga, G(e.name), 1), P("div", _a, G(e.url), 1)]),
				P("td", va, G(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				P("td", ya, G(p(e.last_sync)), 1),
				P("td", null, [P("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [I(w, { tone: h(e.status) }, {
					default: J(() => [F(G(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ba)]),
				P("td", null, [P("div", xa, [I(v, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: J(() => [...t[5] ||= [F(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			P("section", Sa, [t[8] ||= P("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), P("form", {
				class: "federation__form",
				onSubmit: Fn(d, ["prevent"])
			}, [
				Nn(P("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[jn, s.value]]),
				Nn(P("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[jn, o.value]]),
				Nn(P("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[jn, c.value]]),
				I(v, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: J(() => [...t[7] ||= [F(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), wa = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Ta = {
	key: 0,
	class: "shares__skel"
}, Ea = {
	key: 3,
	class: "shares__table-wrap"
}, Da = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Oa = { class: "shares__library" }, ka = { class: "shares__date" }, Aa = { class: "shares__date" }, ja = ["data-testid"], Ma = { class: "shares__actions" }, Na = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? _, n = T(), r = H([]), i = H(!0), a = H(null);
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
		return B(() => o(!0)), (e, t) => (V(), N("section", wa, [t[5] ||= P("header", { class: "shares__head" }, [P("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), P("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (V(), N("div", Ta, [I(E, {
			variant: "text",
			lines: 6
		})])) : a.value ? (V(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: J(() => [I(v, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: J(() => [...t[1] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (V(), j(D, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (V(), N("div", Ea, [P("table", Da, [t[4] ||= P("thead", null, [P("tr", null, [
			P("th", { scope: "col" }, "Library"),
			P("th", { scope: "col" }, "Shared with"),
			P("th", { scope: "col" }, "Permissions"),
			P("th", { scope: "col" }, "Created"),
			P("th", { scope: "col" }, "Expires"),
			P("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), P("tbody", null, [(V(!0), N(O, null, U(r.value, (e) => (V(), N("tr", { key: e.id }, [
			P("td", null, [P("span", Oa, G(e.library_name), 1)]),
			P("td", null, G(e.shared_with), 1),
			P("td", null, [I(w, { tone: u(e.permissions) }, {
				default: J(() => [F(G(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			P("td", ka, G(c(e.created_at)), 1),
			P("td", Aa, [P("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [F(G(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (V(), j(w, {
				key: 0,
				tone: "error"
			}, {
				default: J(() => [...t[2] ||= [F("Expired", -1)]]),
				_: 1
			})) : M("", !0)], 8, ja)]),
			P("td", null, [P("div", Ma, [I(v, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: J(() => [...t[3] ||= [F(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Pa(e, t) {
	let n = Se(), r = !1;
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
function Fa() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = H(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), Dn(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), On(t);
}
//#endregion
export { Le as ALL_LOGS, kt as AMBIENT_SAMPLE_H, Xt as AMBIENT_SAMPLE_INTERVAL_MS, $t as AMBIENT_SAMPLE_W, _t as ARROW_ICONS, vt as ARROW_LABELS, qe as AdminBackupApi, Je as AdminCastApi, Qe as AdminCollectionsApi, Re as AdminDashboardApi, Ye as AdminDlnaServerApi, $e as AdminHistoryApi, it as AdminHubDashboardApi, Ke as AdminIntegrationsApi, nt as AdminLibrariesApi, Ze as AdminLiveTvApi, Ie as AdminLogsApi, Xe as AdminRemoteAccessApi, Ge as AdminServicesApi, rt as AdminSettingsApi, et as AdminSyncPlayApi, Ve as AdminUsersApi, We as AdminWebhooksApi, Ft as AmbientCanvas, te as ApiClient, re as ApiError, e as AppBackdrop, nr as AppLayout, w as Badge, v as Button, gn as CAPTION_BACKGROUND_OPTIONS, dn as CAPTION_COLOR_OPTIONS, mn as CAPTION_EDGE_OPTIONS, cn as CAPTION_SIZE_OPTIONS, tn as CAPTION_SIZE_SCALE, ct as CaptionOverlay, lt as CaptionsMenu, ye as Chip, xe as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, Ut as DIRECT_PLAY_EXTENSIONS, D as EmptyState, Ca as FederationPage, we as FilterBar, n as Icon, r as IconButton, le as Kbd, tt as LIBRARY_TYPES, Qi as LibraryScanPage, ie as LocalStorageTokenStore, vn as LoginForm, Na as ManageSharesPage, De as MediaCard, Fe as MediaDetail, Ce as MediaGrid, Pe as MediaHomeRow, je as MediaRow, ke as MetadataMatchModal, br as MiniPlayer, Te as Modal, ua as MyServersPage, h as NetworkError, bt as PLAYER_SHORTCUTS, Bi as PageTransition, Gr as PhlixApp, Jt as Player, yt as QualityMenu, ze as RATING_LABELS, Be as RATING_OPTIONS, oe as RESUME_MAX_RATIO, ae as RESUME_MIN_SECONDS, It as ResumePrompt, zi as Reveal, He as SUBSCRIBABLE_EVENTS, Ot as Scrubber, be as Select, bn as SettingsForm, Kn as Sheet, Rt as ShortcutsHelp, yn as SignupForm, E as Skeleton, Ht as SkipButton, _e as Slider, zt as SpeedMenu, Ee as Spinner, ve as Switch, ne as TMDB_UNCONFIGURED_CODE, qt as TRANSCODE_EXTENSIONS, Ae as Tabs, ee as TimeoutError, Ri as ToastHost, Ai as Tooltip, Lt as TranscodeNotice, Kt as TranscodePreparing, Mt as UPNEXT_COUNTDOWN_SECONDS, Bt as UPNEXT_RING_CIRCUMFERENCE, Yt as UPNEXT_RING_RADIUS, At as UpNext, at as VolumeControl, Ue as WEBHOOK_EVENT_CATEGORIES, fn as activeAudioIndex, Si as adminMenu, jt as ambientGradient, hn as applyAudioTrack, Ar as applyStoredThemeEarly, nn as applyTrackModes, Gt as attachHls, Qt as averageRegion, Pa as bindMediaStoreToRouter, yi as buildAdminRoutes, xi as buildHubAdminRoutes, Ne as buildMediaQuery, Me as buildMediaUrl, bi as buildServerAdminRoutes, ln as captionStyleVars, _n as cleanCueText, mi as commonAdminPages, Oi as createPhlixApp, f as createTranslator, Dr as deriveAccentVars, rn as edgeShadow, y as errMessage, Nt as extensionOf, ue as fetchLibraries, ge as formatPageTitle, Dt as formatTime, se as fuzzyScore, ut as handleShortcut, an as hasActiveCaptions, c as hasStoredPreferences, gi as hubAdminPages, St as isBatterySaving, en as isFailedStatus, Pt as isFatalMediaError, mt as isNativeHlsSupported, g as isOffline, ot as isPlayable, m as isTmdbUnconfigured, pt as isTypingTarget, pn as listAudioTracks, un as listSubtitleTracks, ce as matchCommand, u as mergeMessages, Wt as needsTranscode, Tt as parseSubtitleTracks, ft as parseTranscodeStart, wt as parseTranscodeStatus, sn as readActiveCueLines, o as readStoredPreferences, Et as resolveStreamUrl, on as resolveTextTrack, st as rgbString, Zt as rgbaString, Vt as ringDashoffset, Ct as sampleAmbient, hi as serverAdminPages, me as setAppName, he as setPageTitle, de as sortLibraries, dt as transcodeStartPath, ht as transcodeStatusPath, b as useAuthStore, Mr as useCommandPaletteHotkey, C as useCommandStore, i as useFocusTrap, xt as useHlsTranscode, gt as useKeyboardShortcuts, fe as useLibrariesStore, Se as useMediaStore, p as useMessages, Fa as useOnline, pe as usePageTitle, x as usePlayerStore, Ir as usePreconnect, a as usePreferencesStore, Oe as usePrefetch, Vr as useResumeReporter, Lr as useResumeSync, jr as useTheme, T as useToastStore };

//# sourceMappingURL=phlix-ui.js.map