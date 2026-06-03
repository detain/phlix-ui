import { r as e } from "./AuthField-OP0_HNX2.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-BTz1ebOc.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { a as u, c as d, l as f, n as p, o as m, r as h, s as g, t as _ } from "./Button-GJ9vHE0J.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as v } from "./useAuthStore-qz0h59p0.js";
import { a as te, i as ne, n as re, r as ie, t as ae } from "./media-query-DowsWq-z.js";
import { i as y, n as oe, r as se, t as ce } from "./Kbd-CSMm1T0l.js";
import { t as b } from "./Badge-ArWL5-WE.js";
import { t as le } from "./Slider-BMn_Lp_q.js";
import { t as ue } from "./Switch-CFZhdkXR.js";
import { i as de, n as fe, r as pe, t as me } from "./MediaRow-D4X62E_J.js";
import { t as he } from "./Select-CKC9vNUQ.js";
import { a as ge, i as _e, n as ve, r as ye, t as be } from "./FilterBar-D74tm-mg.js";
import { t as xe } from "./Modal-BB_vB1RK.js";
import { t as x } from "./useToastStore-BDoKlU6N.js";
import { n as S, t as C } from "./EmptyState-Ds4WcVdG.js";
import { n as Se, t as Ce } from "./SettingsForm-DPNOGeW5.js";
import { t as we } from "./MediaDetail-VmTlt6o3.js";
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
import { A as qe, C as Je, D as Ye, E as Xe, F as Ze, I as Qe, L as $e, M as et, N as tt, O as nt, P as rt, S as it, T as at, _ as ot, a as st, b as ct, c as lt, d as ut, f as dt, g as ft, h as pt, i as mt, j as ht, k as gt, l as _t, m as vt, n as yt, o as bt, p as xt, r as St, s as Ct, t as wt, u as Tt, v as Et, w as Dt, x as Ot, y as kt } from "./Player-BN_TEDvB.js";
import { a as At, c as jt, d as Mt, f as Nt, g as Pt, h as Ft, i as It, l as Lt, m as Rt, n as zt, o as Bt, p as Vt, r as Ht, s as Ut, t as Wt, u as Gt } from "./captions-COgPp5bH.js";
import { t as Kt } from "./LoginForm-391wMbHl.js";
import { t as qt } from "./SignupForm-Djo0Oqq9.js";
import { Fragment as w, Teleport as Jt, Transition as T, TransitionGroup as Yt, computed as E, createApp as Xt, createBlock as D, createCommentVNode as O, createElementBlock as k, createElementVNode as A, createTextVNode as j, createVNode as M, defineAsyncComponent as Zt, defineComponent as N, inject as P, normalizeClass as F, normalizeStyle as I, onBeforeUnmount as L, onMounted as R, onScopeDispose as z, openBlock as B, readonly as Qt, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as $t, toDisplayString as W, unref as G, useId as en, vModelText as tn, watch as K, watchEffect as nn, withCtx as q, withDirectives as rn, withKeys as an, withModifiers as J } from "vue";
import { createPinia as on } from "pinia";
import { RouterLink as Y, RouterView as sn, createRouter as cn, createWebHistory as ln, useRouter as un } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var dn = ["aria-labelledby"], fn = {
	key: 0,
	class: "phlix-sheet__header"
}, pn = ["id"], mn = { class: "phlix-sheet__body" }, hn = {
	key: 1,
	class: "phlix-sheet__footer"
}, gn = /*#__PURE__*/ t(/* @__PURE__ */ N({
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
		K(() => n.modelValue, (e) => o.value = e);
		let s = V(null), c = en();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), D(Jt, { to: "body" }, [M(T, { name: `phlix-sheet-${e.side}` }, {
			default: q(() => [e.modelValue ? (B(), k("div", {
				key: 0,
				class: F(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: J(u, ["self"])
			}, [A("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), k("header", fn, [e.title ? (B(), k("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, pn)) : O("", !0), e.hideClose ? O("", !0) : (B(), D(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : O("", !0),
				A("div", mn, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), k("footer", hn, [U(t.$slots, "footer", {}, void 0, !0)])) : O("", !0)
			], 8, dn)], 34)) : O("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), _n = { class: "shell" }, vn = { class: "shell__bar" }, yn = { class: "shell__inner" }, bn = { class: "shell__brand" }, xn = {
	class: "shell__nav",
	"aria-label": "Primary"
}, Sn = { class: "shell__actions" }, Cn = { class: "shell__main" }, wn = {
	key: 0,
	class: "shell__footer"
}, Tn = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = V(!1);
		return (t, a) => (B(), k("div", _n, [
			M(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			A("header", vn, [A("div", yn, [
				A("div", bn, [U(t.$slots, "logo", {}, () => [a[3] ||= A("span", { class: "shell__wordmark" }, [j("Phlix"), A("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				A("nav", xn, [U(t.$slots, "nav", {}, void 0, !0)]),
				a[4] ||= A("span", { class: "shell__spacer" }, null, -1),
				A("div", Sn, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), D(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: "Open navigation menu",
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				})) : O("", !0)
			])]),
			A("main", Cn, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), k("footer", wn, [U(t.$slots, "footer", {}, void 0, !0)])) : O("", !0),
			M(gn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: "Menu"
			}, {
				default: q(() => [A("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [U(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-007c323a"]]), En = /* @__PURE__ */ N({
	__name: "ThemeToggle",
	setup(e) {
		let t = a(), n = [
			"nocturne",
			"daylight",
			"midnight"
		], i = {
			nocturne: "moon",
			daylight: "sun",
			midnight: "monitor"
		}, o = {
			nocturne: "Nocturne",
			daylight: "Daylight",
			midnight: "Midnight"
		}, s = E(() => n[(n.indexOf(t.theme) + 1) % n.length]), c = E(() => i[t.theme] ?? "moon"), l = E(() => `Theme: ${o[t.theme] ?? t.theme} (switch to ${o[s.value]})`);
		function u() {
			t.theme = s.value;
		}
		return (e, t) => (B(), D(r, {
			name: c.value,
			label: l.value,
			variant: "ghost",
			onClick: u
		}, null, 8, ["name", "label"]));
	}
}), Dn = ["aria-label", "aria-expanded"], On = {
	key: 0,
	class: "usermenu__avatar"
}, kn = { class: "usermenu__head" }, An = { class: "usermenu__avatar usermenu__avatar--lg" }, jn = { class: "usermenu__name" }, Mn = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "UserMenu",
	setup(e) {
		let t = v(), r = un(), a = P("phlixConfig", null), o = E(() => a?.routerBase ?? "/app"), s = V(!1), c = V(null), l = V(null), u = E(() => t.user?.username || t.user?.name || t.user?.email || "Account"), d = E(() => u.value.charAt(0).toUpperCase() || "A");
		function f() {
			s.value = !1;
		}
		function p(e) {
			f(), r.push(e);
		}
		function m() {
			f(), t.logout(), r.push(`${o.value}/login`);
		}
		i(l, s, {
			lockScroll: !1,
			onEscape: () => (f(), !0)
		});
		function h(e) {
			c.value && !c.value.contains(e.target) && f();
		}
		return K(s, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", h, !0) : document.removeEventListener("pointerdown", h, !0));
		}), L(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", h, !0);
		}), (e, r) => (B(), k("div", {
			ref_key: "rootEl",
			ref: c,
			class: "usermenu"
		}, [A("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": G(t).isLoggedIn ? `Account: ${u.value}` : "Account",
			"aria-haspopup": "menu",
			"aria-expanded": s.value,
			onClick: r[0] ||= (e) => s.value = !s.value
		}, [G(t).isLoggedIn ? (B(), k("span", On, W(d.value), 1)) : (B(), D(n, {
			key: 1,
			name: "user"
		}))], 8, Dn), s.value ? (B(), k("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": "Account",
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), k(w, { key: 0 }, [
			A("div", kn, [A("span", An, W(d.value), 1), A("span", jn, W(u.value), 1)]),
			A("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => p(`${o.value}/settings`)
			}, [M(n, { name: "settings" }), r[3] ||= j(" Settings ", -1)]),
			A("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: m
			}, [M(n, { name: "log-out" }), r[4] ||= j(" Sign out ", -1)])
		], 64)) : (B(), k("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => p(`${o.value}/login`)
		}, [M(n, { name: "user" }), r[5] ||= j(" Sign in ", -1)]))], 512)) : O("", !0)], 512));
	}
}), [["__scopeId", "data-v-5da5ea3f"]]), Nn = {
	key: 0,
	class: "mini",
	role: "region",
	"aria-label": "Mini player"
}, Pn = ["src", "poster"], Fn = { class: "mini__body" }, In = { class: "mini__title" }, Ln = { class: "mini__controls" }, Rn = ["aria-label"], zn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Bn = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = te(), a = V(null), o = E(() => i.miniPlayer && !!i.current && !!i.streamUrl), s = E(() => i.current?.name ?? ""), c = E(() => Math.max(0, Math.min(1, i.progress)));
		function l() {
			let e = a.value;
			e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, i.position > 0 && (!e.duration || i.position < e.duration) && (e.currentTime = i.position), i.playing && e.play()?.catch(() => {}));
		}
		function u() {
			i.play();
		}
		function d() {
			i.pause();
		}
		function f() {
			let e = a.value;
			e && i.updateProgress(e.currentTime, e.duration);
		}
		function p() {
			let e = a.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function m() {
			i.current && r("expand", i.current.id);
		}
		function h() {
			i.closePlayer();
		}
		return K(() => i.playing, (e) => {
			let t = a.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), L(() => {
			a.value?.pause?.();
		}), (e, t) => (B(), D(T, { name: "mini" }, {
			default: q(() => [o.value ? (B(), k("div", Nn, [
				A("video", {
					ref_key: "videoRef",
					ref: a,
					class: "mini__video",
					src: G(i).streamUrl,
					poster: G(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: l,
					onPlay: u,
					onPause: d,
					onTimeupdate: f,
					onClick: m
				}, null, 40, Pn),
				A("div", Fn, [A("p", In, W(s.value), 1), A("div", Ln, [
					A("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? "Pause" : "Play",
						onClick: p
					}, [M(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Rn),
					A("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": "Expand to full player",
						onClick: m
					}, [M(n, { name: "expand" })]),
					A("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": "Close player",
						onClick: h
					}, [M(n, { name: "x" })])
				])]),
				A("div", zn, [A("div", {
					class: "mini__progress-fill",
					style: I({ transform: `scaleX(${c.value})` })
				}, null, 4)])
			])) : O("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c013af7d"]]);
//#endregion
//#region src/composables/color.ts
function Vn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var X = (e) => Math.max(0, Math.min(255, Math.round(e))), Z = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => X(e).toString(16).padStart(2, "0")).join("");
function Hn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Un(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Wn = ({ r: e, g: t, b: n }, r) => `rgba(${X(e)}, ${X(t)}, ${X(n)}, ${r})`;
function Gn({ r: e, g: t, b: n }) {
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
function Q(e) {
	let t = Vn(e);
	if (!t) return null;
	let n = Gn(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Z(t),
		"--accent-hover": Z(Hn(t, .12)),
		"--accent-active": Z(Un(t, .12)),
		"--accent-soft": Wn(t, .14),
		"--accent-ring": Wn(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Kn = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function qn(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Q(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Kn) n.style.removeProperty(e);
}
function Jn(e) {
	let t = o();
	e && !c() && (t.theme = e), qn(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Yn() {
	let e = a();
	return nn(() => {
		qn({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Xn() {
	let e = y(), t = (t) => {
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
function Zn(e) {
	let t = $(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = $(n, t);
	return !r || t && r === t ? null : r;
}
function Qn(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if ($(e.href) === t) return !0;
	return !1;
}
function $n(e, t, n, r) {
	if (Qn(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function er(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = $(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = $(e);
		r && (n && r === n || a.has(r) || (a.add(r), $n("preconnect", r, t.crossOrigin === !0, i), $n("dns-prefetch", r, !1, i)));
	}
	i.length && z(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var tr = ["src", "alt"], nr = { class: "brand-wordmark" }, rr = {
	key: 1,
	class: "brand-tagline"
}, ir = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "PhlixApp",
	setup(e) {
		Yn();
		let t = y(), i = un();
		Xn();
		let a = Zt(() => import("./CommandPalette-CMJInqvo.js")), o = V(!1);
		K(() => t.open, (e) => {
			e && (o.value = !0);
		});
		function s(e) {
			i.push(`${f.value}/player/${e}`);
		}
		let c = P("phlixConfig", null);
		er(Zn({
			imageOrigin: c?.imageOrigin ?? null,
			apiBase: c?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let l = E(() => c?.branding ?? {}), u = E(() => l.value.wordmark ?? "Phlix"), d = E(() => c?.menu ?? []), f = E(() => c?.routerBase ?? "/app");
		function p(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), D(Tn, null, {
			logo: q(() => [M(G(Y), {
				to: f.value,
				class: "brand"
			}, {
				default: q(() => [
					l.value.logoSrc ? (B(), k("img", {
						key: 0,
						src: l.value.logoSrc,
						alt: l.value.logoAlt ?? u.value,
						class: "brand-logo"
					}, null, 8, tr)) : O("", !0),
					A("span", nr, [j(W(u.value), 1), i[1] ||= A("span", { class: "brand-dot" }, ".", -1)]),
					l.value.tagline ? (B(), k("span", rr, W(l.value.tagline), 1)) : O("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: q(() => [d.value.length ? (B(!0), k(w, { key: 0 }, H(d.value, (e) => (B(), D($t(e.href ? "a" : G(Y)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? p(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: q(() => [e.icon ? (B(), D(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : O("", !0), j(" " + W(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (B(), k(w, { key: 1 }, [M(G(Y), {
				to: f.value,
				class: "nav-link"
			}, {
				default: q(() => [...i[2] ||= [j("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), M(G(Y), {
				to: `${f.value}/settings`,
				class: "nav-link"
			}, {
				default: q(() => [...i[3] ||= [j("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: q(() => [
				M(r, {
					name: "search",
					label: "Open command palette (⌘K)",
					variant: "ghost",
					onClick: i[0] ||= (e) => G(t).openPalette()
				}),
				M(En),
				M(Mn)
			]),
			default: q(() => [
				M(G(sn)),
				o.value ? (B(), D(G(a), { key: 0 })) : O("", !0),
				M(Bn, { onExpand: s })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-a61e6779"]]), ar = { class: "phlix-placeholder" }, or = { class: "placeholder-content" }, sr = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), k("div", ar, [A("div", or, [n[0] ||= A("h1", null, "Shared UI loading...", -1), A("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function cr() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function lr(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-BLkjWXxT.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-BlJxo54d.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-DTaiPz1O.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			component: () => import("./LoginPage-DjF6IFk1.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: () => import("./SignupPage-G5YC2HYV.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: () => import("./SettingsPage-DH4tLLhC.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: sr,
		props: { appName: e.app }
	}), n;
}
function ur(e) {
	let t = {
		...cr(),
		...e
	};
	Jn(t.defaultTheme);
	let n = on();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = cn({
		history: ln(t.routerBase || "/app"),
		routes: lr(t)
	}), i = Xt(ir);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var dr = ["id"], fr = /*#__PURE__*/ t(/* @__PURE__ */ N({
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
		let t = e, n = en(), r = V(!1), i = V(null), a;
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
		return L(() => clearTimeout(a)), (t, a) => (B(), k("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: an(c, ["esc"])
		}, [U(t.$slots, "default", {}, void 0, !0), M(T, { name: "phlix-tooltip" }, {
			default: q(() => [r.value && (e.text || t.$slots.content) ? (B(), k("span", {
				key: 0,
				id: G(n),
				role: "tooltip",
				class: F(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [U(t.$slots, "content", {}, () => [j(W(e.text), 1)], !0)], 10, dr)) : O("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), pr = ["role"], mr = { class: "phlix-toast__content" }, hr = {
	key: 0,
	class: "phlix-toast__title"
}, gr = { class: "phlix-toast__message" }, _r = ["onClick"], vr = 0, yr = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let t = x(), i = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, a = (e) => e.icon ?? i[e.tone];
		return R(() => {
			vr++;
		}), L(() => {
			vr--;
		}), (i, o) => (B(), D(Jt, { to: "body" }, [A("div", {
			class: F(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [M(Yt, { name: "phlix-toast" }, {
			default: q(() => [(B(!0), k(w, null, H(G(t).toasts, (e) => (B(), k("div", {
				key: e.id,
				class: F(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				M(n, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				A("div", mr, [e.title ? (B(), k("p", hr, W(e.title), 1)) : O("", !0), A("p", gr, W(e.message), 1)]),
				e.action ? (B(), k("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (n) => {
						e.action.onClick(), G(t).dismiss(e.id);
					}
				}, W(e.action.label), 9, _r)) : O("", !0),
				M(r, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (n) => G(t).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, pr))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), br = ["aria-label"], xr = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, r = E(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, i) => (B(), k("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: I(r.value ? { fontSize: r.value } : void 0)
		}, [M(n, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, br));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Sr = /*#__PURE__*/ t(/* @__PURE__ */ N({
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
		}), (t, a) => (B(), D($t(e.tag), {
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
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Cr = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (B(), D(T, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]);
//#endregion
//#region src/app/admin.ts
function wr(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => import("./DashboardPage-BbMUJs71.js")
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => import("./UsersPage-BLuC0U7d.js")
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => import("./LogsPage-xQTpGAIv.js")
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => import("./WebhooksPage-BbESAPfp.js")
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => import("./ServicesPage-Cjtaxwan.js")
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => import("./IntegrationsPage-DE8n_IY6.js")
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => import("./BackupPage-CZoaruW7.js")
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => import("./CastDevicesPage-BaC7DK2P.js")
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => import("./DlnaServerPage-DShf6Frj.js")
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => import("./RemoteAccessPage-kdbW-SXH.js")
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => import("./LiveTvPage-DfVKsJfA.js")
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => import("./CollectionsPage-CbN22k1o.js")
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => import("./HistoryPage-DNQYdWcR.js")
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => import("./SyncPlayPage-WX483nmn.js")
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => import("./LibrariesPage-8V75Z562.js")
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => import("./SettingsPage-VI_RyYQ2.js")
		}
	];
}
function Tr(e = "/app") {
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
var Er = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Dr = {
	key: 0,
	class: "library-scan__skel"
}, Or = {
	key: 3,
	class: "library-scan__table-wrap"
}, kr = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Ar = { class: "library-scan__name" }, jr = {
	key: 0,
	class: "library-scan__paths"
}, Mr = { class: "library-scan__num" }, Nr = { class: "library-scan__date" }, Pr = ["data-testid"], Fr = {
	key: 0,
	class: "library-scan__error"
}, Ir = { class: "library-scan__actions" }, Lr = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = x(), r = V([]), i = V({}), a = V(!0), o = V(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				r.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of r.value) c(e.id);
			} catch (e) {
				o.value = d(e, "Failed to load libraries."), n.error(o.value);
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
				n.error(d(e, "Failed to trigger scan."));
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), n.success("Rescan queued."), await c(e);
			} catch (e) {
				n.error(d(e, "Failed to trigger rescan."));
			}
		}
		function f(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function p(e) {
			return e?.status === "running" || e?.status === "queued";
		}
		function m(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function g(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		return R(s), (e, t) => (B(), k("section", Er, [t[4] ||= A("header", { class: "library-scan__head" }, [A("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), A("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), k("div", Dr, [M(S, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), D(C, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: q(() => [M(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: q(() => [...t[0] ||= [j("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), D(C, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (B(), k("div", Or, [A("table", kr, [t[3] ||= A("thead", null, [A("tr", null, [
			A("th", { scope: "col" }, "Library"),
			A("th", { scope: "col" }, "Type"),
			A("th", { scope: "col" }, "Items"),
			A("th", { scope: "col" }, "Last scan"),
			A("th", { scope: "col" }, "Status"),
			A("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), A("tbody", null, [(B(!0), k(w, null, H(r.value, (e) => (B(), k("tr", { key: e.id }, [
			A("td", null, [A("div", Ar, W(e.name), 1), e.paths.length ? (B(), k("div", jr, W(e.paths.join(", ")), 1)) : O("", !0)]),
			A("td", null, W(e.type), 1),
			A("td", Mr, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			A("td", Nr, W(f(e.last_scan_at)), 1),
			A("td", null, [A("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [M(b, { tone: g(i.value[e.id]) }, {
				default: q(() => [j(W(m(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), k("span", Fr, W(i.value[e.id]?.error), 1)) : O("", !0)], 8, Pr)]),
			A("td", null, [A("div", Ir, [M(_, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: p(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: q(() => [...t[1] ||= [j(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), M(_, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: p(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: q(() => [...t[2] ||= [j(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-3235ff5e"]]), Rr = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, zr = { class: "my-servers__head" }, Br = {
	key: 0,
	class: "my-servers__skel"
}, Vr = {
	key: 3,
	class: "my-servers__table-wrap"
}, Hr = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Ur = { class: "my-servers__name" }, Wr = { class: "my-servers__url" }, Gr = { class: "my-servers__num" }, Kr = { class: "my-servers__date" }, qr = ["data-testid"], Jr = { class: "my-servers__actions" }, Yr = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = x(), r = V([]), i = V(!0), a = V(null);
		async function o() {
			i.value = !0, a.value = null;
			try {
				r.value = (await t.get("/api/v1/servers")).servers || [];
			} catch (e) {
				a.value = d(e, "Failed to load servers."), n.error(a.value);
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
		return R(o), (e, t) => (B(), k("section", Rr, [A("header", zr, [t[1] ||= A("div", null, [A("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), A("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), M(_, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: q(() => [...t[0] ||= [j("Add server", -1)]]),
			_: 1
		})]), i.value ? (B(), k("div", Br, [M(S, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), D(C, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: a.value
		}, {
			actions: q(() => [M(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: o
			}, {
				default: q(() => [...t[2] ||= [j("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), D(C, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: q(() => [M(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: q(() => [...t[3] ||= [j("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (B(), k("div", Vr, [A("table", Hr, [t[5] ||= A("thead", null, [A("tr", null, [
			A("th", { scope: "col" }, "Server"),
			A("th", { scope: "col" }, "Owner"),
			A("th", { scope: "col" }, "Libraries"),
			A("th", { scope: "col" }, "Last seen"),
			A("th", { scope: "col" }, "Status"),
			A("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), A("tbody", null, [(B(!0), k(w, null, H(r.value, (e) => (B(), k("tr", { key: e.id }, [
			A("td", null, [A("div", Ur, W(e.name), 1), A("div", Wr, W(e.url), 1)]),
			A("td", null, W(e.owner), 1),
			A("td", Gr, W(e.library_count === void 0 ? "—" : e.library_count), 1),
			A("td", Kr, W(s(e.last_seen)), 1),
			A("td", null, [A("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [M(b, { tone: l(e.status) }, {
				default: q(() => [j(W(c(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, qr)]),
			A("td", null, [A("div", Jr, [M(_, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: q(() => [...t[4] ||= [j("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8bce09a9"]]), Xr = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, Zr = {
	key: 0,
	class: "federation__skel"
}, Qr = {
	key: 2,
	class: "federation__content"
}, $r = {
	key: 1,
	class: "federation__table-wrap"
}, ei = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, ti = { class: "federation__name" }, ni = { class: "federation__url" }, ri = { class: "federation__num" }, ii = { class: "federation__date" }, ai = ["data-testid"], oi = { class: "federation__actions" }, si = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, ci = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = x(), r = V([]), i = V(!0), a = V(null), o = V(""), s = V(!1);
		async function c(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = (await t.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				a.value = d(e, "Failed to load federation peers."), n.error(a.value);
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
					n.error(d(e, "Failed to connect to peer."));
				} finally {
					s.value = !1;
				}
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/federation/peers/${e}/disconnect`), n.success("Peer disconnected."), await c();
			} catch (e) {
				n.error(d(e, "Failed to disconnect peer."));
			}
		}
		function f(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function p(e) {
			switch (e) {
				case "connected": return "Connected";
				case "disconnected": return "Disconnected";
				case "pending": return "Pending";
				default: return e;
			}
		}
		function m(e) {
			switch (e) {
				case "connected": return "success";
				case "disconnected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		return R(() => c(!0)), (e, t) => (B(), k("section", Xr, [t[8] ||= A("header", { class: "federation__head" }, [A("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), A("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), k("div", Zr, [M(S, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), D(C, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: q(() => [M(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(!0)
			}, {
				default: q(() => [...t[2] ||= [j("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (B(), k("div", Qr, [
			t[7] ||= A("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), D(C, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), k("div", $r, [A("table", ei, [t[4] ||= A("thead", null, [A("tr", null, [
				A("th", { scope: "col" }, "Peer"),
				A("th", { scope: "col" }, "Shared libraries"),
				A("th", { scope: "col" }, "Last sync"),
				A("th", { scope: "col" }, "Status"),
				A("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), A("tbody", null, [(B(!0), k(w, null, H(r.value, (e) => (B(), k("tr", { key: e.id }, [
				A("td", null, [A("div", ti, W(e.name), 1), A("div", ni, W(e.url), 1)]),
				A("td", ri, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				A("td", ii, W(f(e.last_sync)), 1),
				A("td", null, [A("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [M(b, { tone: m(e.status) }, {
					default: q(() => [j(W(p(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ai)]),
				A("td", null, [A("div", oi, [e.status === "connected" ? (B(), D(_, {
					key: 0,
					variant: "ghost",
					size: "sm",
					"aria-label": `Disconnect ${e.name}`,
					onClick: (t) => u(e.id)
				}, {
					default: q(() => [...t[3] ||= [j(" Disconnect ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : O("", !0)])])
			]))), 128))])])])),
			A("section", si, [t[6] ||= A("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), A("form", {
				class: "federation__form",
				onSubmit: J(l, ["prevent"])
			}, [rn(A("input", {
				"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
				type: "url",
				class: "federation__input",
				placeholder: "https://other-server.example.com",
				"aria-label": "Peer server URL",
				autocomplete: "off"
			}, null, 512), [[tn, o.value]]), M(_, {
				type: "submit",
				variant: "solid",
				"left-icon": "plus",
				loading: s.value,
				disabled: !o.value.trim()
			}, {
				default: q(() => [...t[5] ||= [j(" Connect ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-0640a657"]]), li = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, ui = {
	key: 0,
	class: "shares__skel"
}, di = {
	key: 3,
	class: "shares__table-wrap"
}, fi = {
	class: "shares__table",
	"aria-label": "Library shares"
}, pi = { class: "shares__library" }, mi = { class: "shares__date" }, hi = { class: "shares__date" }, gi = ["data-testid"], _i = { class: "shares__actions" }, vi = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = x(), r = V([]), i = V(!0), a = V(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = (await t.get("/api/v1/shares")).shares || [];
			} catch (e) {
				a.value = d(e, "Failed to load shares."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function s(e) {
			try {
				await t.delete(`/api/v1/shares/${e}`), n.success("Share revoked."), await o();
			} catch (e) {
				n.error(d(e, "Failed to revoke share."));
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
		return R(() => o(!0)), (e, t) => (B(), k("section", li, [t[5] ||= A("header", { class: "shares__head" }, [A("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), A("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), k("div", ui, [M(S, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), D(C, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: q(() => [M(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: q(() => [...t[1] ||= [j("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), D(C, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (B(), k("div", di, [A("table", fi, [t[4] ||= A("thead", null, [A("tr", null, [
			A("th", { scope: "col" }, "Library"),
			A("th", { scope: "col" }, "Shared with"),
			A("th", { scope: "col" }, "Permissions"),
			A("th", { scope: "col" }, "Created"),
			A("th", { scope: "col" }, "Expires"),
			A("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), A("tbody", null, [(B(!0), k(w, null, H(r.value, (e) => (B(), k("tr", { key: e.id }, [
			A("td", null, [A("span", pi, W(e.library_name), 1)]),
			A("td", null, W(e.shared_with), 1),
			A("td", null, [M(b, { tone: u(e.permissions) }, {
				default: q(() => [j(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			A("td", mi, W(c(e.created_at)), 1),
			A("td", hi, [A("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [j(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), D(b, {
				key: 0,
				tone: "error"
			}, {
				default: q(() => [...t[2] ||= [j("Expired", -1)]]),
				_: 1
			})) : O("", !0)], 8, gi)]),
			A("td", null, [A("div", _i, [M(_, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: q(() => [...t[3] ||= [j(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8731f31d"]]), yi = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, bi = {
	key: 0,
	class: "audit__skel"
}, xi = {
	key: 3,
	class: "audit__content"
}, Si = { class: "audit__table-wrap" }, Ci = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, wi = ["data-testid"], Ti = { class: "audit__details" }, Ei = { class: "audit__ip" }, Di = { class: "audit__date" }, Oi = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, ki = {
	class: "audit__page-info",
	"aria-live": "polite"
}, Ai = /*#__PURE__*/ t(/* @__PURE__ */ N({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = x(), r = V([]), i = V(!0), a = V(null), o = V(1), s = V(1);
		async function c(e = 1) {
			i.value = !0, a.value = null;
			try {
				let n = await t.get("/api/v1/audit-logs", { page: String(e) });
				r.value = n.logs || [], o.value = n.page || 1, s.value = n.total_pages || 1;
			} catch (e) {
				a.value = d(e, "Failed to load audit logs."), n.error(a.value);
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
		return R(() => c()), (e, t) => (B(), k("section", yi, [t[7] ||= A("header", { class: "audit__head" }, [A("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), A("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), i.value ? (B(), k("div", bi, [M(S, {
			variant: "text",
			lines: 8
		})])) : a.value ? (B(), D(C, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: a.value
		}, {
			actions: q(() => [M(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(o.value)
			}, {
				default: q(() => [...t[3] ||= [j("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), D(C, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (B(), k("div", xi, [A("div", Si, [A("table", Ci, [t[4] ||= A("thead", null, [A("tr", null, [
			A("th", { scope: "col" }, "Action"),
			A("th", { scope: "col" }, "Actor"),
			A("th", { scope: "col" }, "Target"),
			A("th", { scope: "col" }, "Details"),
			A("th", { scope: "col" }, "IP"),
			A("th", { scope: "col" }, "Time")
		])], -1), A("tbody", null, [(B(!0), k(w, null, H(r.value, (e) => (B(), k("tr", { key: e.id }, [
			A("td", null, [A("span", { "data-testid": `action-${e.id}` }, [M(b, { tone: u(e.action) }, {
				default: q(() => [j(W(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, wi)]),
			A("td", null, W(e.actor), 1),
			A("td", null, W(e.target || "—"), 1),
			A("td", Ti, W(e.details || "—"), 1),
			A("td", Ei, W(e.ip_address || "—"), 1),
			A("td", Di, W(l(e.created_at)), 1)
		]))), 128))])])]), s.value > 1 ? (B(), k("nav", Oi, [
			M(_, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: o.value <= 1,
				onClick: t[1] ||= (e) => c(o.value - 1)
			}, {
				default: q(() => [...t[5] ||= [j(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			A("span", ki, "Page " + W(o.value) + " of " + W(s.value), 1),
			M(_, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: o.value >= s.value,
				onClick: t[2] ||= (e) => c(o.value + 1)
			}, {
				default: q(() => [...t[6] ||= [j(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : O("", !0)]))]));
	}
}), [["__scopeId", "data-v-26a60fa5"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function ji(e, t) {
	let n = ve(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
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
function Mi() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), z(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Qt(t);
}
//#endregion
export { Ee as ALL_LOGS, pt as AMBIENT_SAMPLE_H, ft as AMBIENT_SAMPLE_INTERVAL_MS, ot as AMBIENT_SAMPLE_W, qe as ARROW_ICONS, ht as ARROW_LABELS, Ie as AdminBackupApi, Le as AdminCastApi, Ve as AdminCollectionsApi, De as AdminDashboardApi, Re as AdminDlnaServerApi, He as AdminHistoryApi, Fe as AdminIntegrationsApi, Ge as AdminLibrariesApi, Be as AdminLiveTvApi, Te as AdminLogsApi, ze as AdminRemoteAccessApi, Pe as AdminServicesApi, Ke as AdminSettingsApi, Ue as AdminSyncPlayApi, Ae as AdminUsersApi, Ne as AdminWebhooksApi, vt as AmbientCanvas, p as ApiClient, u as ApiError, e as AppBackdrop, Tn as AppLayout, Ai as AuditLogsPage, b as Badge, _ as Button, Wt as CAPTION_BACKGROUND_OPTIONS, zt as CAPTION_COLOR_OPTIONS, Ht as CAPTION_EDGE_OPTIONS, It as CAPTION_SIZE_OPTIONS, At as CAPTION_SIZE_SCALE, at as CaptionOverlay, Dt as CaptionsMenu, de as Chip, ge as Combobox, l as DEFAULT_CAPTION_STYLE, s as DEFAULT_PREFERENCES, mt as DIRECT_PLAY_EXTENSIONS, C as EmptyState, ci as FederationPage, be as FilterBar, n as Icon, r as IconButton, ce as Kbd, We as LIBRARY_TYPES, Lr as LibraryScanPage, ee as LocalStorageTokenStore, Kt as LoginForm, vi as ManageSharesPage, fe as MediaCard, we as MediaDetail, _e as MediaGrid, ye as MediaHomeRow, me as MediaRow, Bn as MiniPlayer, xe as Modal, Yr as MyServersPage, m as NetworkError, et as PLAYER_SHORTCUTS, Cr as PageTransition, ir as PhlixApp, wt as Player, Xe as QualityMenu, Oe as RATING_LABELS, ke as RATING_OPTIONS, ie as RESUME_MAX_RATIO, ne as RESUME_MIN_SECONDS, xt as ResumePrompt, Sr as Reveal, je as SUBSCRIBABLE_EVENTS, Qe as Scrubber, he as Select, Ce as SettingsForm, gn as Sheet, gt as ShortcutsHelp, qt as SignupForm, S as Skeleton, le as Slider, Ye as SpeedMenu, xr as Spinner, ue as Switch, st as TRANSCODE_EXTENSIONS, Se as Tabs, g as TimeoutError, yr as ToastHost, fr as Tooltip, yt as TranscodeNotice, bt as UPNEXT_COUNTDOWN_SECONDS, Ct as UPNEXT_RING_CIRCUMFERENCE, lt as UPNEXT_RING_RADIUS, St as UpNext, nt as VolumeControl, Me as WEBHOOK_EVENT_CATEGORIES, Bt as activeAudioIndex, Tr as adminMenu, Et as ambientGradient, Ut as applyAudioTrack, Jn as applyStoredThemeEarly, jt as applyTrackModes, kt as averageRegion, ji as bindMediaStoreToRouter, wr as buildAdminRoutes, ae as buildMediaQuery, re as buildMediaUrl, Lt as captionStyleVars, Gt as cleanCueText, ur as createPhlixApp, Q as deriveAccentVars, Mt as edgeShadow, d as errMessage, _t as extensionOf, $e as formatTime, oe as fuzzyScore, tt as handleShortcut, Nt as hasActiveCaptions, c as hasStoredPreferences, ct as isBatterySaving, Tt as isFatalMediaError, f as isOffline, rt as isTypingTarget, Vt as listAudioTracks, Rt as listSubtitleTracks, se as matchCommand, ut as needsTranscode, Ft as readActiveCueLines, o as readStoredPreferences, Pt as resolveTextTrack, Ot as rgbString, it as rgbaString, dt as ringDashoffset, Je as sampleAmbient, v as useAuthStore, Xn as useCommandPaletteHotkey, y as useCommandStore, i as useFocusTrap, Ze as useKeyboardShortcuts, ve as useMediaStore, Mi as useOnline, te as usePlayerStore, er as usePreconnect, a as usePreferencesStore, pe as usePrefetch, Yn as useTheme, x as useToastStore };

//# sourceMappingURL=phlix-ui.js.map