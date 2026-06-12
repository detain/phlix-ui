import { r as e } from "./AuthField-n1LgzcyM.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Dwm0lQlG.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BwQkyEkr.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-DdW4mkuI.js";
import { i as x, n as re, r as ie, t as ae } from "./usePlayerStore-Cffo63UC.js";
import { i as S, n as oe, r as se, t as ce } from "./Kbd-CSMm1T0l.js";
import { n as le, r as ue, t as de } from "./useLibrariesStore-C5Sg25Ui.js";
import { i as fe, n as pe, r as me, t as he } from "./usePageTitle-BO3GGF3M.js";
import { t as C } from "./Badge-ArWL5-WE.js";
import { t as ge } from "./Slider-BMn_Lp_q.js";
import { t as _e } from "./Switch-CFZhdkXR.js";
import { t as ve } from "./Chip-2HcSZF4a.js";
import { t as ye } from "./Select-DLwgQInL.js";
import { i as be, n as xe, r as Se, t as Ce } from "./FilterBar-D1K87otJ.js";
import { t as we } from "./Modal-I4tEFhoH.js";
import { t as w } from "./useToastStore-BDoKlU6N.js";
import { t as T } from "./Skeleton-DkSoWF3C.js";
import { n as Te, t as Ee } from "./MediaRow-CUlaxo3r.js";
import { t as E } from "./EmptyState-B2QnGIQT.js";
import { t as De } from "./Tabs-x8dUKZN5.js";
import { n as Oe, t as ke } from "./MediaCard-BUq_DyAQ.js";
import { n as Ae, t as je } from "./media-query-BcVLE7J6.js";
import { t as Me } from "./HomeRow-VPPZBTAJ.js";
import { t as Ne } from "./MediaDetail-iJTO83-S.js";
import { n as Pe, t as Fe } from "./logs-DadTfaTq.js";
import { t as Ie } from "./dashboard-BTCOCTHQ.js";
import { n as Le, r as Re, t as ze } from "./users-C40iLgkq.js";
import { n as Be, r as Ve, t as He } from "./webhooks-BBTLnFKm.js";
import { t as Ue } from "./services-Czm8hsvH.js";
import { t as We } from "./integrations-DLAG9ISY.js";
import { t as Ge } from "./backup-IdY_vzc2.js";
import { t as Ke } from "./cast-BvFcBEB6.js";
import { t as qe } from "./dlnaServer-B5Sg4MkS.js";
import { t as Je } from "./remoteAccess-DVKRpKQ8.js";
import { t as Ye } from "./liveTv-Dbjt901v.js";
import { t as Xe } from "./collections-CH3HLdcd.js";
import { t as Ze } from "./history-ByCY8OYj.js";
import { t as Qe } from "./syncPlay-DPzJkgkK.js";
import { n as $e, t as et } from "./libraries-CXAz_kXs.js";
import { t as tt } from "./settings-m4upFcmH.js";
import { t as nt } from "./hubDashboard-BhOaaDD-.js";
import { A as rt, B as it, C as at, D as ot, E as st, F as ct, G as lt, H as ut, I as dt, J as ft, K as pt, L as mt, M as ht, N as gt, O as _t, P as vt, R as yt, S as bt, T as xt, U as St, V as Ct, W as wt, Y as Tt, _ as Et, a as Dt, b as Ot, c as kt, d as At, f as jt, g as Mt, h as Nt, i as Pt, j as Ft, k as It, l as Lt, m as Rt, n as zt, o as Bt, p as Vt, q as Ht, r as Ut, s as Wt, t as Gt, u as Kt, v as qt, w as Jt, x as Yt, y as Xt, z as Zt } from "./Player-DzfjYQlb.js";
import { a as Qt, c as $t, d as en, f as tn, g as nn, h as rn, i as an, l as on, m as sn, n as cn, o as ln, p as un, r as dn, s as fn, t as pn, u as mn } from "./captions-COgPp5bH.js";
import { t as hn } from "./LoginForm-D_gFQ46F.js";
import { t as gn } from "./SignupForm-Nsort7Wz.js";
import { t as _n } from "./SettingsForm-CFk9bcEc.js";
import { Fragment as D, Teleport as vn, Transition as O, TransitionGroup as yn, computed as k, createApp as bn, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as xn, defineComponent as I, inject as Sn, normalizeClass as L, normalizeStyle as Cn, onBeforeUnmount as R, onMounted as z, onScopeDispose as wn, openBlock as B, readonly as Tn, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as En, toDisplayString as W, unref as G, useId as Dn, vModelText as K, watch as q, watchEffect as On, withCtx as J, withDirectives as Y, withKeys as kn, withModifiers as An } from "vue";
import { createPinia as jn } from "pinia";
import { RouterLink as X, RouterView as Mn, createRouter as Nn, createWebHistory as Pn, useRouter as Fn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var In = ["aria-labelledby"], Ln = {
	key: 0,
	class: "phlix-sheet__header"
}, Rn = ["id"], zn = { class: "phlix-sheet__body" }, Bn = {
	key: 1,
	class: "phlix-sheet__footer"
}, Vn = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let s = V(null), c = Dn();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), A(vn, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (B(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: An(u, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), M("header", Ln, [e.title ? (B(), M("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, Rn)) : j("", !0), e.hideClose ? j("", !0) : (B(), A(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : j("", !0),
				N("div", zn, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), M("footer", Bn, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, In)], 34)) : j("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), Hn = { class: "shell" }, Un = {
	class: "shell__skip",
	href: "#main"
}, Wn = { class: "shell__bar" }, Gn = { class: "shell__inner" }, Kn = { class: "shell__brand" }, qn = ["aria-label"], Jn = { class: "shell__actions" }, Yn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, Xn = {
	key: 0,
	class: "shell__footer"
}, Zn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = V(!1), { t: o } = p();
		return (t, a) => (B(), M("div", Hn, [
			N("a", Un, W(G(o)("shell.skipToContent")), 1),
			F(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			N("header", Wn, [N("div", Gn, [
				N("div", Kn, [U(t.$slots, "logo", {}, () => [a[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", {
					class: "shell__nav",
					"aria-label": G(o)("shell.primaryNav")
				}, [U(t.$slots, "nav", {}, void 0, !0)], 8, qn),
				a[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", Jn, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), A(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: G(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : j("", !0)
			])]),
			N("main", Yn, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), M("footer", Xn, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(Vn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: G(o)("shell.menu")
			}, {
				default: J(() => [N("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [U(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-db48fc6e"]]), Qn = /* @__PURE__ */ I({
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
		return (e, t) => (B(), A(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), $n = ["aria-label", "aria-expanded"], er = {
	key: 0,
	class: "usermenu__avatar"
}, tr = ["aria-label"], nr = { class: "usermenu__head" }, rr = { class: "usermenu__avatar usermenu__avatar--lg" }, ir = { class: "usermenu__name" }, ar = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = Fn(), a = Sn("phlixConfig", null), o = k(() => a?.routerBase ?? "/app"), { t: s } = p(), c = V(!1), l = V(null), u = V(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = k(() => d.value.charAt(0).toUpperCase() || "A");
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
		}), (e, r) => (B(), M("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [N("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": G(t).isLoggedIn ? G(s)("shell.accountNamed", { name: d.value }) : G(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [G(t).isLoggedIn ? (B(), M("span", er, W(f.value), 1)) : (B(), A(n, {
			key: 1,
			name: "user"
		}))], 8, $n), c.value ? (B(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": G(s)("shell.account"),
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), M(D, { key: 0 }, [
			N("div", nr, [N("span", rr, W(f.value), 1), N("span", ir, W(d.value), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [F(n, { name: "settings" }), P(" " + W(G(s)("shell.settings")), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [F(n, { name: "log-out" }), P(" " + W(G(s)("shell.signOut")), 1)])
		], 64)) : (B(), M("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [F(n, { name: "user" }), P(" " + W(G(s)("shell.signIn")), 1)]))], 8, tr)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), or = ["aria-label"], sr = ["src", "poster"], cr = { class: "mini__body" }, lr = { class: "mini__title" }, ur = { class: "mini__controls" }, dr = ["aria-label"], fr = ["aria-label"], pr = ["aria-label"], mr = {
	class: "mini__progress",
	"aria-hidden": "true"
}, hr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = V(null), s = k(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = k(() => i.current?.name ?? ""), l = k(() => Math.max(0, Math.min(1, i.progress)));
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
		}), (e, t) => (B(), A(O, { name: "mini" }, {
			default: J(() => [s.value ? (B(), M("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": G(a)("player.miniPlayer")
			}, [
				N("video", {
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
				}, null, 40, sr),
				N("div", cr, [N("p", lr, W(c.value), 1), N("div", ur, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? G(a)("player.pause") : G(a)("player.play"),
						onClick: h
					}, [F(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, dr),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(a)("player.expand"),
						onClick: g
					}, [F(n, { name: "expand" })], 8, fr),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": G(a)("player.closePlayer"),
						onClick: _
					}, [F(n, { name: "x" })], 8, pr)
				])]),
				N("div", mr, [N("div", {
					class: "mini__progress-fill",
					style: Cn({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, or)) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function gr(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Z = (e) => Math.max(0, Math.min(255, Math.round(e))), _r = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Z(e).toString(16).padStart(2, "0")).join("");
function vr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function yr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var br = ({ r: e, g: t, b: n }, r) => `rgba(${Z(e)}, ${Z(t)}, ${Z(n)}, ${r})`;
function xr({ r: e, g: t, b: n }) {
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
function Sr(e) {
	let t = gr(e);
	if (!t) return null;
	let n = xr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": _r(t),
		"--accent-hover": _r(vr(t, .12)),
		"--accent-active": _r(yr(t, .12)),
		"--accent-soft": br(t, .14),
		"--accent-ring": br(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Cr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function wr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Sr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Cr) n.style.removeProperty(e);
}
function Tr(e) {
	let t = o();
	e && !c() && (t.theme = e), wr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Er() {
	let e = a();
	return On(() => {
		wr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Dr() {
	let e = S(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), wn(() => document.removeEventListener("keydown", t)));
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
function Or(e) {
	let t = Q(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Q(n, t);
	return !r || t && r === t ? null : r;
}
function kr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Q(e.href) === t) return !0;
	return !1;
}
function Ar(e, t, n, r) {
	if (kr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function jr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Q(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Q(e);
		r && (n && r === n || a.has(r) || (a.add(r), Ar("preconnect", r, t.crossOrigin === !0, i), Ar("dns-prefetch", r, !1, i)));
	}
	i.length && wn(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function Mr() {
	let e = x(), t = b();
	async function n() {
		if (t.isLoggedIn) try {
			let n = await t.client.get("/api/v1/users/me/continue-watching"), r = {};
			for (let e of n.items ?? []) {
				let t = e.position_ticks;
				typeof e.id == "string" && typeof t == "number" && t > 0 && (r[e.id] = Math.floor(t / ie));
			}
			e.mergeServerResume(r);
		} catch {}
	}
	return { syncResume: n };
}
//#endregion
//#region src/composables/useResumeReporter.ts
var Nr = "phlix.deviceId", Pr = 15e3;
function Fr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(Nr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(Nr, e)), e;
	} catch {
		return "web";
	}
}
function Ir() {
	let e = x(), t = b(), n = Fr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < Pr)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * ie),
					duration_ticks: Math.floor(e.duration * ie),
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
var Lr = ["src", "alt"], Rr = { class: "brand-wordmark" }, zr = {
	key: 1,
	class: "brand-tagline"
}, Br = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		Er();
		let t = S(), i = Fn(), { t: a } = p();
		Dr();
		let o = xn(() => import("./CommandPalette-CZqlKC9e.js")), s = V(!1);
		q(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = Sn("phlixConfig", null);
		jr(Or({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = Mr();
		q(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 }), Ir();
		let f = k(() => l?.branding ?? {}), m = k(() => f.value.wordmark ?? "Phlix"), h = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = k(() => l?.routerBase ?? "/app"), _ = de(), ee = k(() => h.value.some((e) => e.libraryLinks));
		q(() => u.isLoggedIn && ee.value, (e) => {
			e && _.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function v(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), A(Zn, null, {
			logo: J(() => [F(G(X), {
				to: g.value,
				class: "brand"
			}, {
				default: J(() => [
					f.value.logoSrc ? (B(), M("img", {
						key: 0,
						src: f.value.logoSrc,
						alt: f.value.logoAlt ?? m.value,
						class: "brand-logo"
					}, null, 8, Lr)) : j("", !0),
					N("span", Rr, [P(W(m.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (B(), M("span", zr, W(f.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [h.value.length ? (B(!0), M(D, { key: 0 }, H(h.value, (e) => (B(), M(D, { key: e.id }, [(B(), A(En(e.href ? "a" : G(X)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? v(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: J(() => [e.icon ? (B(), A(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : j("", !0), P(" " + W(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (B(!0), M(D, null, H(e.libraryLinks ? G(_).items : [], (t) => (B(), A(G(X), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: J(() => [P(W(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (B(), M(D, { key: 1 }, [F(G(X), {
				to: g.value,
				class: "nav-link"
			}, {
				default: J(() => [P(W(G(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), F(G(X), {
				to: `${g.value}/settings`,
				class: "nav-link"
			}, {
				default: J(() => [P(W(G(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: J(() => [
				F(r, {
					name: "search",
					label: G(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => G(t).openPalette()
				}, null, 8, ["label"]),
				F(Qn),
				F(ar)
			]),
			default: J(() => [
				F(G(Mn)),
				s.value ? (B(), A(G(o), { key: 0 })) : j("", !0),
				F(hr, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-3d8a20f5"]]), Vr = { class: "phlix-placeholder" }, Hr = { class: "placeholder-content" }, Ur = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), M("div", Vr, [N("div", Hr, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), Wr = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-H2S7yBkV.js")
}, Gr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-DUrJnh3G.js")
}, Kr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-B-h-jRHV.js")
}, qr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-BvJjwwJd.js")
}, Jr = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-Dcv9dXWk.js")
}, Yr = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-9sme586b.js")
}, Xr = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-DEM40FMB.js")
}, Zr = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-BUqK_7-T.js")
}, Qr = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-CYKjLkAQ.js")
}, $r = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-DD4tBslO.js")
}, ei = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-Cxx8HMwv.js")
}, ti = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-BPhF6NSi.js")
}, $ = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-DrNjgjNM.js")
}, ni = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-PPGW9Axg.js")
}, ri = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-CufKHKsT.js")
}, ii = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-Cl5H-SEu.js")
}, ai = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-B8S33QFr.js")
}, oi = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-Qw6MAJfw.js")
}, si = Object.fromEntries([
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
	$,
	ni,
	ri,
	ii,
	ai,
	oi
].map((e) => [e.name, e.label]));
function ci(e) {
	return e ? si[e] ?? null : null;
}
var li = [
	Gr,
	Kr,
	ii
], ui = [
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
	$,
	ni,
	ri
], di = [ai, oi], fi = [
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
	$,
	ni,
	ri,
	ii
], pi = [
	ai,
	...li,
	oi
];
function mi(e = "/app", t = fi) {
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
function hi(e = "/app") {
	return mi(e, fi);
}
function gi(e = "/app") {
	return mi(e, pi);
}
function _i(e = "/app", t = fi) {
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
var vi = ["login", "signup"];
function yi(e, t, n = !1) {
	let r = typeof e.name == "string" ? e.name : "";
	return vi.includes(r) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? { name: "browse" } : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function bi(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = ci(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function xi() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Si(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-EHwqcde_.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-Iv75sFWG.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-e1KjaFKd.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-dm0GDVq7.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-BSBgWEoF.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-CK_JvXVK.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-DRWOFivr.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: Ur,
		props: { appName: e.app }
	}), n;
}
function Ci(e) {
	let t = {
		...xi(),
		...e
	};
	Tr(t.defaultTheme), pe(t.branding?.wordmark);
	let n = f(t.messages), r = jn();
	t.defaultTheme && !c() && (a(r).theme = t.defaultTheme);
	let i = Nn({
		history: Pn(),
		routes: Si(t)
	});
	i.beforeEach(async (e) => {
		let t = b(r);
		return await t.init(), yi(e, t.isLoggedIn, t.isAdmin);
	}), i.afterEach((e) => {
		me(bi(e, n));
	});
	let o = bn(Br);
	return o.provide("apiBase", t.apiBase), o.provide("phlixCommands", t.commands ?? []), o.provide("phlixConfig", t), o.use(r), o.use(i), o;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var wi = ["id"], Ti = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = Dn(), r = V(!1), i = V(null), a;
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
		return R(() => clearTimeout(a)), (t, a) => (B(), M("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: kn(c, ["esc"])
		}, [U(t.$slots, "default", {}, void 0, !0), F(O, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (B(), M("span", {
				key: 0,
				id: G(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [U(t.$slots, "content", {}, () => [P(W(e.text), 1)], !0)], 10, wi)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Ei = ["aria-label"], Di = ["role"], Oi = { class: "phlix-toast__content" }, ki = {
	key: 0,
	class: "phlix-toast__title"
}, Ai = { class: "phlix-toast__message" }, ji = ["onClick"], Mi = 0, Ni = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
			Mi++;
		}), R(() => {
			Mi--;
		}), (a, s) => (B(), A(vn, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": G(t)("common.notifications")
		}, [F(yn, { name: "phlix-toast" }, {
			default: J(() => [(B(!0), M(D, null, H(G(i).toasts, (e) => (B(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", Oi, [e.title ? (B(), M("p", ki, W(e.title), 1)) : j("", !0), N("p", Ai, W(e.message), 1)]),
				e.action ? (B(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(i).dismiss(e.id);
					}
				}, W(e.action.label), 9, ji)) : j("", !0),
				F(r, {
					name: "x",
					label: G(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Di))), 128))]),
			_: 1
		})], 10, Ei)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), Pi = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		}), (t, a) => (B(), A(En(e.tag), {
			ref_key: "el",
			ref: n,
			class: L(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Cn({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Fi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (B(), A(O, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: J(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Ii = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Li = {
	key: 0,
	class: "library-scan__skel"
}, Ri = {
	key: 3,
	class: "library-scan__table-wrap"
}, zi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Bi = { class: "library-scan__name" }, Vi = {
	key: 0,
	class: "library-scan__paths"
}, Hi = { class: "library-scan__num" }, Ui = { class: "library-scan__date" }, Wi = ["data-testid"], Gi = {
	key: 0,
	class: "library-scan__error"
}, Ki = { class: "library-scan__actions" }, qi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = V([]), i = V({}), a = V(!0), o = V(null);
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
		return z(s), (e, t) => (B(), M("section", Ii, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), M("div", Li, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: J(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[0] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), A(E, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (B(), M("div", Ri, [N("table", zi, [t[3] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Type"),
			N("th", { scope: "col" }, "Items"),
			N("th", { scope: "col" }, "Last scan"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(B(!0), M(D, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
			N("td", null, [N("div", Bi, W(e.name), 1), e.paths.length ? (B(), M("div", Vi, W(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, W(e.type), 1),
			N("td", Hi, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", Ui, W(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: m(i.value[e.id]) }, {
				default: J(() => [P(W(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), M("span", Gi, W(i.value[e.id]?.error), 1)) : j("", !0)], 8, Wi)]),
			N("td", null, [N("div", Ki, [F(y, {
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
			]), F(y, {
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
function Ji(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Yi = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Xi = { class: "my-servers__head" }, Zi = {
	key: 0,
	class: "my-servers__skel"
}, Qi = {
	key: 3,
	class: "my-servers__table-wrap"
}, $i = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, ea = { class: "my-servers__name" }, ta = { class: "my-servers__url" }, na = { class: "my-servers__num" }, ra = { class: "my-servers__date" }, ia = ["data-testid"], aa = { class: "my-servers__actions" }, oa = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = b(), i = V([]), a = V(!0), o = V(null);
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
					last_seen: Ji(e.lastSeenAt)
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
		return z(s), (e, t) => (B(), M("section", Yi, [N("header", Xi, [t[1] ||= N("div", null, [N("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: J(() => [...t[0] ||= [P("Add server", -1)]]),
			_: 1
		})]), a.value ? (B(), M("div", Zi, [F(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: J(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: J(() => [...t[2] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (B(), A(E, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: J(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: J(() => [...t[3] ||= [P("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (B(), M("div", Qi, [N("table", $i, [t[5] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Server"),
			N("th", { scope: "col" }, "Owner"),
			N("th", { scope: "col" }, "Libraries"),
			N("th", { scope: "col" }, "Last seen"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(B(!0), M(D, null, H(i.value, (e) => (B(), M("tr", { key: e.id }, [
			N("td", null, [N("div", ea, W(e.name), 1), N("div", ta, W(e.url), 1)]),
			N("td", null, W(e.owner), 1),
			N("td", na, W(e.library_count === void 0 ? "—" : e.library_count), 1),
			N("td", ra, W(c(e.last_seen)), 1),
			N("td", null, [N("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: u(e.status) }, {
				default: J(() => [P(W(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, ia)]),
			N("td", null, [N("div", aa, [F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: J(() => [...t[4] ||= [P("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), sa = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, ca = {
	key: 0,
	class: "federation__skel"
}, la = {
	key: 2,
	class: "federation__content"
}, ua = {
	key: 1,
	class: "federation__table-wrap"
}, da = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, fa = { class: "federation__name" }, pa = { class: "federation__url" }, ma = { class: "federation__num" }, ha = { class: "federation__date" }, ga = ["data-testid"], _a = { class: "federation__actions" }, va = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, ya = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = V([]), i = V(!0), a = V(null), o = V(""), s = V(""), c = V(""), l = V(!1);
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
		return z(() => u(!0)), (e, t) => (B(), M("section", sa, [t[10] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), M("div", ca, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: J(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: J(() => [...t[4] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (B(), M("div", la, [
			t[9] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), A(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), M("div", ua, [N("table", da, [t[6] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(B(!0), M(D, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
				N("td", null, [N("div", fa, W(e.name), 1), N("div", pa, W(e.url), 1)]),
				N("td", ma, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", ha, W(p(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: g(e.status) }, {
					default: J(() => [P(W(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ga)]),
				N("td", null, [N("div", _a, [F(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: J(() => [...t[5] ||= [P(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			N("section", va, [t[8] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: An(d, ["prevent"])
			}, [
				Y(N("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[K, s.value]]),
				Y(N("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[K, o.value]]),
				Y(N("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[K, c.value]]),
				F(y, {
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
}), [["__scopeId", "data-v-1e05d4ae"]]), ba = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, xa = {
	key: 0,
	class: "shares__skel"
}, Sa = {
	key: 3,
	class: "shares__table-wrap"
}, Ca = {
	class: "shares__table",
	"aria-label": "Library shares"
}, wa = { class: "shares__library" }, Ta = { class: "shares__date" }, Ea = { class: "shares__date" }, Da = ["data-testid"], Oa = { class: "shares__actions" }, ka = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = w(), r = V([]), i = V(!0), a = V(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Ji(e.created_at) ?? "",
					expires_at: Ji(e.expires_at)
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
		return z(() => o(!0)), (e, t) => (B(), M("section", ba, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), M("div", xa, [F(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), A(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: J(() => [F(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: J(() => [...t[1] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), A(E, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (B(), M("div", Sa, [N("table", Ca, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Shared with"),
			N("th", { scope: "col" }, "Permissions"),
			N("th", { scope: "col" }, "Created"),
			N("th", { scope: "col" }, "Expires"),
			N("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(B(!0), M(D, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
			N("td", null, [N("span", wa, W(e.library_name), 1)]),
			N("td", null, W(e.shared_with), 1),
			N("td", null, [F(C, { tone: u(e.permissions) }, {
				default: J(() => [P(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", Ta, W(c(e.created_at)), 1),
			N("td", Ea, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), A(C, {
				key: 0,
				tone: "error"
			}, {
				default: J(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, Da)]),
			N("td", null, [N("div", Oa, [F(y, {
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
function Aa(e, t) {
	let n = xe(), r = !1;
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
function ja() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), wn(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Tn(t);
}
//#endregion
export { Fe as ALL_LOGS, Et as AMBIENT_SAMPLE_H, qt as AMBIENT_SAMPLE_INTERVAL_MS, Xt as AMBIENT_SAMPLE_W, ht as ARROW_ICONS, gt as ARROW_LABELS, Ge as AdminBackupApi, Ke as AdminCastApi, Xe as AdminCollectionsApi, Ie as AdminDashboardApi, qe as AdminDlnaServerApi, Ze as AdminHistoryApi, nt as AdminHubDashboardApi, We as AdminIntegrationsApi, et as AdminLibrariesApi, Ye as AdminLiveTvApi, Pe as AdminLogsApi, Je as AdminRemoteAccessApi, Ue as AdminServicesApi, tt as AdminSettingsApi, Qe as AdminSyncPlayApi, ze as AdminUsersApi, He as AdminWebhooksApi, Mt as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, Zn as AppLayout, C as Badge, y as Button, pn as CAPTION_BACKGROUND_OPTIONS, cn as CAPTION_COLOR_OPTIONS, dn as CAPTION_EDGE_OPTIONS, an as CAPTION_SIZE_OPTIONS, Qt as CAPTION_SIZE_SCALE, ot as CaptionOverlay, st as CaptionsMenu, ve as Chip, be as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, Bt as DIRECT_PLAY_EXTENSIONS, E as EmptyState, ya as FederationPage, Ce as FilterBar, n as Icon, r as IconButton, ce as Kbd, $e as LIBRARY_TYPES, qi as LibraryScanPage, ne as LocalStorageTokenStore, hn as LoginForm, ka as ManageSharesPage, ke as MediaCard, Ne as MediaDetail, Se as MediaGrid, Me as MediaHomeRow, Ee as MediaRow, hr as MiniPlayer, we as Modal, oa as MyServersPage, ee as NetworkError, vt as PLAYER_SHORTCUTS, Fi as PageTransition, Br as PhlixApp, Gt as Player, _t as QualityMenu, Le as RATING_LABELS, Re as RATING_OPTIONS, ae as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, Nt as ResumePrompt, Pi as Reveal, Be as SUBSCRIBABLE_EVENTS, ft as Scrubber, ye as Select, _n as SettingsForm, Vn as Sheet, Ft as ShortcutsHelp, gn as SignupForm, T as Skeleton, zt as SkipButton, ge as Slider, It as SpeedMenu, Te as Spinner, _e as Switch, Wt as TRANSCODE_EXTENSIONS, De as Tabs, te as TimeoutError, Ni as ToastHost, Ti as Tooltip, Pt as TranscodeNotice, Ut as TranscodePreparing, kt as UPNEXT_COUNTDOWN_SECONDS, Lt as UPNEXT_RING_CIRCUMFERENCE, Kt as UPNEXT_RING_RADIUS, Dt as UpNext, rt as VolumeControl, Ve as WEBHOOK_EVENT_CATEGORIES, ln as activeAudioIndex, _i as adminMenu, Ot as ambientGradient, fn as applyAudioTrack, Tr as applyStoredThemeEarly, $t as applyTrackModes, pt as attachHls, Yt as averageRegion, Aa as bindMediaStoreToRouter, mi as buildAdminRoutes, gi as buildHubAdminRoutes, je as buildMediaQuery, Ae as buildMediaUrl, hi as buildServerAdminRoutes, on as captionStyleVars, mn as cleanCueText, li as commonAdminPages, Ci as createPhlixApp, f as createTranslator, Sr as deriveAccentVars, en as edgeShadow, h as errMessage, At as extensionOf, le as fetchLibraries, he as formatPageTitle, Tt as formatTime, oe as fuzzyScore, ct as handleShortcut, tn as hasActiveCaptions, c as hasStoredPreferences, di as hubAdminPages, bt as isBatterySaving, Zt as isFailedStatus, jt as isFatalMediaError, Ht as isNativeHlsSupported, g as isOffline, it as isPlayable, dt as isTypingTarget, un as listAudioTracks, sn as listSubtitleTracks, se as matchCommand, u as mergeMessages, Vt as needsTranscode, Ct as parseTranscodeStart, ut as parseTranscodeStatus, rn as readActiveCueLines, o as readStoredPreferences, St as resolveStreamUrl, nn as resolveTextTrack, at as rgbString, Jt as rgbaString, Rt as ringDashoffset, xt as sampleAmbient, ui as serverAdminPages, pe as setAppName, me as setPageTitle, ue as sortLibraries, wt as transcodeStartPath, lt as transcodeStatusPath, b as useAuthStore, Dr as useCommandPaletteHotkey, S as useCommandStore, i as useFocusTrap, yt as useHlsTranscode, mt as useKeyboardShortcuts, de as useLibrariesStore, xe as useMediaStore, p as useMessages, ja as useOnline, fe as usePageTitle, x as usePlayerStore, jr as usePreconnect, a as usePreferencesStore, Oe as usePrefetch, Ir as useResumeReporter, Mr as useResumeSync, Er as useTheme, w as useToastStore };

//# sourceMappingURL=phlix-ui.js.map