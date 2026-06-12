import { r as e } from "./AuthField-n1LgzcyM.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-DkTu9l9P.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-Dwm0lQlG.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BwQkyEkr.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-DdW4mkuI.js";
import { i as x, n as re, r as ie, t as ae } from "./usePlayerStore-CCov4Tvr.js";
import { i as S, n as oe, r as se, t as ce } from "./Kbd-CSMm1T0l.js";
import { n as le, r as ue, t as de } from "./useLibrariesStore-C5Sg25Ui.js";
import { i as fe, n as pe, r as me, t as he } from "./usePageTitle-BO3GGF3M.js";
import { t as C } from "./Badge-ArWL5-WE.js";
import { t as ge } from "./Slider-BMn_Lp_q.js";
import { t as _e } from "./Switch-CFZhdkXR.js";
import { t as ve } from "./Chip-2HcSZF4a.js";
import { t as ye } from "./Select-DLwgQInL.js";
import { i as be, n as xe, r as Se, t as Ce } from "./FilterBar-BAOz18Ny.js";
import { t as we } from "./Modal-I4tEFhoH.js";
import { t as w } from "./useToastStore-BDoKlU6N.js";
import { t as T } from "./Skeleton-DkSoWF3C.js";
import { n as Te, t as Ee } from "./HomeRow-B4SpQ64n.js";
import { t as E } from "./EmptyState-B2QnGIQT.js";
import { t as De } from "./Tabs-x8dUKZN5.js";
import { n as Oe, t as ke } from "./MediaCard-BspNRq6a.js";
import { t as Ae } from "./MediaRow-Bla4-NCW.js";
import { n as je, t as Me } from "./media-query-BcVLE7J6.js";
import { t as Ne } from "./MediaDetail-D-jyEuS2.js";
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
import { A as rt, B as it, C as at, D as ot, E as st, F as ct, G as lt, H as ut, I as dt, J as ft, K as pt, L as mt, M as ht, N as gt, O as _t, P as vt, R as yt, S as bt, T as xt, U as St, V as Ct, W as wt, X as Tt, Y as Et, _ as Dt, a as Ot, b as kt, c as At, d as jt, f as Mt, g as Nt, h as Pt, i as Ft, j as It, k as Lt, l as Rt, m as zt, n as Bt, o as Vt, p as Ht, q as Ut, r as Wt, s as Gt, t as Kt, u as qt, v as Jt, w as Yt, x as Xt, y as Zt, z as Qt } from "./Player-yH6Aex_r.js";
import { a as $t, c as en, d as tn, f as nn, g as rn, h as an, i as on, l as sn, m as cn, n as ln, o as un, p as dn, r as fn, s as pn, t as mn, u as hn } from "./captions-COgPp5bH.js";
import { t as gn } from "./LoginForm-D_gFQ46F.js";
import { t as _n } from "./SignupForm-Nsort7Wz.js";
import { t as vn } from "./SettingsForm-CFk9bcEc.js";
import { Fragment as D, Teleport as yn, Transition as O, TransitionGroup as bn, computed as k, createApp as xn, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as Sn, defineComponent as I, inject as Cn, normalizeClass as L, normalizeStyle as wn, onBeforeUnmount as R, onMounted as z, onScopeDispose as Tn, openBlock as B, readonly as En, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as Dn, toDisplayString as W, unref as G, useId as On, vModelText as K, watch as q, watchEffect as kn, withCtx as J, withDirectives as Y, withKeys as An, withModifiers as jn } from "vue";
import { createPinia as Mn } from "pinia";
import { RouterLink as X, RouterView as Nn, createRouter as Pn, createWebHistory as Fn, useRouter as In } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var Ln = ["aria-labelledby"], Rn = {
	key: 0,
	class: "phlix-sheet__header"
}, zn = ["id"], Bn = { class: "phlix-sheet__body" }, Vn = {
	key: 1,
	class: "phlix-sheet__footer"
}, Hn = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let s = V(null), c = On();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), A(yn, { to: "body" }, [F(O, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (B(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: jn(u, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), M("header", Rn, [e.title ? (B(), M("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, zn)) : j("", !0), e.hideClose ? j("", !0) : (B(), A(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : j("", !0),
				N("div", Bn, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), M("footer", Vn, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, Ln)], 34)) : j("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), Un = { class: "shell" }, Wn = {
	class: "shell__skip",
	href: "#main"
}, Gn = { class: "shell__bar" }, Kn = { class: "shell__inner" }, qn = { class: "shell__brand" }, Jn = ["aria-label"], Yn = { class: "shell__actions" }, Xn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, Zn = {
	key: 0,
	class: "shell__footer"
}, Qn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = V(!1), { t: o } = p();
		return (t, a) => (B(), M("div", Un, [
			N("a", Wn, W(G(o)("shell.skipToContent")), 1),
			F(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			N("header", Gn, [N("div", Kn, [
				N("div", qn, [U(t.$slots, "logo", {}, () => [a[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", {
					class: "shell__nav",
					"aria-label": G(o)("shell.primaryNav")
				}, [U(t.$slots, "nav", {}, void 0, !0)], 8, Jn),
				a[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", Yn, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), A(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: G(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : j("", !0)
			])]),
			N("main", Xn, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), M("footer", Zn, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(Hn, {
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
}), [["__scopeId", "data-v-db48fc6e"]]), $n = /* @__PURE__ */ I({
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
}), er = ["aria-label", "aria-expanded"], tr = {
	key: 0,
	class: "usermenu__avatar"
}, nr = ["aria-label"], rr = { class: "usermenu__head" }, ir = { class: "usermenu__avatar usermenu__avatar--lg" }, ar = { class: "usermenu__name" }, or = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = In(), a = Cn("phlixConfig", null), o = k(() => a?.routerBase ?? "/app"), { t: s } = p(), c = V(!1), l = V(null), u = V(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = k(() => d.value.charAt(0).toUpperCase() || "A");
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
		}, [G(t).isLoggedIn ? (B(), M("span", tr, W(f.value), 1)) : (B(), A(n, {
			key: 1,
			name: "user"
		}))], 8, er), c.value ? (B(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": G(s)("shell.account"),
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), M(D, { key: 0 }, [
			N("div", rr, [N("span", ir, W(f.value), 1), N("span", ar, W(d.value), 1)]),
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
		}, [F(n, { name: "user" }), P(" " + W(G(s)("shell.signIn")), 1)]))], 8, nr)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), sr = ["aria-label"], cr = ["src", "poster"], lr = { class: "mini__body" }, ur = { class: "mini__title" }, dr = { class: "mini__controls" }, fr = ["aria-label"], pr = ["aria-label"], mr = ["aria-label"], hr = {
	class: "mini__progress",
	"aria-hidden": "true"
}, gr = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
				}, null, 40, cr),
				N("div", lr, [N("p", ur, W(c.value), 1), N("div", dr, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? G(a)("player.pause") : G(a)("player.play"),
						onClick: h
					}, [F(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, fr),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(a)("player.expand"),
						onClick: g
					}, [F(n, { name: "expand" })], 8, pr),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": G(a)("player.closePlayer"),
						onClick: _
					}, [F(n, { name: "x" })], 8, mr)
				])]),
				N("div", hr, [N("div", {
					class: "mini__progress-fill",
					style: wn({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, sr)) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function _r(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Z = (e) => Math.max(0, Math.min(255, Math.round(e))), vr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Z(e).toString(16).padStart(2, "0")).join("");
function yr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function br(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var xr = ({ r: e, g: t, b: n }, r) => `rgba(${Z(e)}, ${Z(t)}, ${Z(n)}, ${r})`;
function Sr({ r: e, g: t, b: n }) {
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
function Cr(e) {
	let t = _r(e);
	if (!t) return null;
	let n = Sr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": vr(t),
		"--accent-hover": vr(yr(t, .12)),
		"--accent-active": vr(br(t, .12)),
		"--accent-soft": xr(t, .14),
		"--accent-ring": xr(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var wr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Tr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Cr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of wr) n.style.removeProperty(e);
}
function Er(e) {
	let t = o();
	e && !c() && (t.theme = e), Tr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Dr() {
	let e = a();
	return kn(() => {
		Tr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Or() {
	let e = S(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), Tn(() => document.removeEventListener("keydown", t)));
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
function kr(e) {
	let t = Q(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Q(n, t);
	return !r || t && r === t ? null : r;
}
function Ar(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Q(e.href) === t) return !0;
	return !1;
}
function jr(e, t, n, r) {
	if (Ar(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function Mr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Q(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Q(e);
		r && (n && r === n || a.has(r) || (a.add(r), jr("preconnect", r, t.crossOrigin === !0, i), jr("dns-prefetch", r, !1, i)));
	}
	i.length && Tn(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function Nr() {
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
var Pr = "phlix.deviceId", Fr = 15e3;
function Ir() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(Pr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(Pr, e)), e;
	} catch {
		return "web";
	}
}
function Lr() {
	let e = x(), t = b(), n = Ir(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < Fr)) {
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
var Rr = ["src", "alt"], zr = { class: "brand-wordmark" }, Br = {
	key: 1,
	class: "brand-tagline"
}, Vr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		Dr();
		let t = S(), i = In(), { t: a } = p();
		Or();
		let o = Sn(() => import("./CommandPalette-ntNedT6K.js")), s = V(!1);
		q(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = Cn("phlixConfig", null);
		Mr(kr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = Nr();
		q(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 }), Lr();
		let f = k(() => l?.branding ?? {}), m = k(() => f.value.wordmark ?? "Phlix"), h = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = k(() => l?.routerBase ?? "/app"), _ = de(), ee = k(() => h.value.some((e) => e.libraryLinks));
		q(() => u.isLoggedIn && ee.value, (e) => {
			e && _.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function v(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), A(Qn, null, {
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
					}, null, 8, Rr)) : j("", !0),
					N("span", zr, [P(W(m.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (B(), M("span", Br, W(f.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [h.value.length ? (B(!0), M(D, { key: 0 }, H(h.value, (e) => (B(), M(D, { key: e.id }, [(B(), A(Dn(e.href ? "a" : G(X)), {
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
				F($n),
				F(or)
			]),
			default: J(() => [
				F(G(Nn)),
				s.value ? (B(), A(G(o), { key: 0 })) : j("", !0),
				F(gr, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-3d8a20f5"]]), Hr = { class: "phlix-placeholder" }, Ur = { class: "placeholder-content" }, Wr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), M("div", Hr, [N("div", Ur, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), Gr = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-H2S7yBkV.js")
}, Kr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-DUrJnh3G.js")
}, qr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-B-h-jRHV.js")
}, Jr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-BvJjwwJd.js")
}, Yr = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-Dcv9dXWk.js")
}, Xr = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-9sme586b.js")
}, Zr = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-DEM40FMB.js")
}, Qr = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-BUqK_7-T.js")
}, $r = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-CYKjLkAQ.js")
}, ei = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-DD4tBslO.js")
}, ti = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-Cxx8HMwv.js")
}, ni = {
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
}, ri = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-PPGW9Axg.js")
}, ii = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-CufKHKsT.js")
}, ai = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-Cl5H-SEu.js")
}, oi = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-B8S33QFr.js")
}, si = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-Qw6MAJfw.js")
}, ci = Object.fromEntries([
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
	$,
	ri,
	ii,
	ai,
	oi,
	si
].map((e) => [e.name, e.label]));
function li(e) {
	return e ? ci[e] ?? null : null;
}
var ui = [
	Kr,
	qr,
	ai
], di = [
	Gr,
	Jr,
	Yr,
	Xr,
	Zr,
	Qr,
	$r,
	ei,
	ti,
	ni,
	$,
	ri,
	ii
], fi = [oi, si], pi = [
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
	$,
	ri,
	ii,
	ai
], mi = [
	oi,
	...ui,
	si
];
function hi(e = "/app", t = pi) {
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
function gi(e = "/app") {
	return hi(e, pi);
}
function _i(e = "/app") {
	return hi(e, mi);
}
function vi(e = "/app", t = pi) {
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
var yi = ["login", "signup"];
function bi(e, t, n = !1) {
	let r = typeof e.name == "string" ? e.name : "";
	return yi.includes(r) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? { name: "browse" } : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function xi(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = li(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function Si() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Ci(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-CaB0a-9j.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-C5EWHhhr.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-CPDVHF35.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-3Kz_ET2c.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-qlUeBTr_.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-CwAz_ox0.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-CcHloIe_.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-CTDuosWd.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: Wr,
		props: { appName: e.app }
	}), n;
}
function wi(e) {
	let t = {
		...Si(),
		...e
	};
	Er(t.defaultTheme), pe(t.branding?.wordmark);
	let n = f(t.messages), r = Mn();
	t.defaultTheme && !c() && (a(r).theme = t.defaultTheme);
	let i = Pn({
		history: Fn(),
		routes: Ci(t)
	});
	i.beforeEach(async (e) => {
		let t = b(r);
		return await t.init(), bi(e, t.isLoggedIn, t.isAdmin);
	}), i.afterEach((e) => {
		me(xi(e, n));
	});
	let o = xn(Vr);
	return o.provide("apiBase", t.apiBase), o.provide("phlixCommands", t.commands ?? []), o.provide("phlixConfig", t), o.use(r), o.use(i), o;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Ti = ["id"], Ei = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let t = e, n = On(), r = V(!1), i = V(null), a;
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
			onKeydown: An(c, ["esc"])
		}, [U(t.$slots, "default", {}, void 0, !0), F(O, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (B(), M("span", {
				key: 0,
				id: G(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [U(t.$slots, "content", {}, () => [P(W(e.text), 1)], !0)], 10, Ti)) : j("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Di = ["aria-label"], Oi = ["role"], ki = { class: "phlix-toast__content" }, Ai = {
	key: 0,
	class: "phlix-toast__title"
}, ji = { class: "phlix-toast__message" }, Mi = ["onClick"], Ni = 0, Pi = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
			Ni++;
		}), R(() => {
			Ni--;
		}), (a, s) => (B(), A(yn, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": G(t)("common.notifications")
		}, [F(bn, { name: "phlix-toast" }, {
			default: J(() => [(B(!0), M(D, null, H(G(i).toasts, (e) => (B(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", ki, [e.title ? (B(), M("p", Ai, W(e.title), 1)) : j("", !0), N("p", ji, W(e.message), 1)]),
				e.action ? (B(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(i).dismiss(e.id);
					}
				}, W(e.action.label), 9, Mi)) : j("", !0),
				F(r, {
					name: "x",
					label: G(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Oi))), 128))]),
			_: 1
		})], 10, Di)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), Fi = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		}), (t, a) => (B(), A(Dn(e.tag), {
			ref_key: "el",
			ref: n,
			class: L(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: wn({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Ii = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
}), [["__scopeId", "data-v-dafe74d0"]]), Li = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Ri = {
	key: 0,
	class: "library-scan__skel"
}, zi = {
	key: 3,
	class: "library-scan__table-wrap"
}, Bi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Vi = { class: "library-scan__name" }, Hi = {
	key: 0,
	class: "library-scan__paths"
}, Ui = { class: "library-scan__num" }, Wi = { class: "library-scan__date" }, Gi = ["data-testid"], Ki = {
	key: 0,
	class: "library-scan__error"
}, qi = { class: "library-scan__actions" }, Ji = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		return z(s), (e, t) => (B(), M("section", Li, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), M("div", Ri, [F(T, {
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
		})) : (B(), M("div", zi, [N("table", Bi, [t[3] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("div", Vi, W(e.name), 1), e.paths.length ? (B(), M("div", Hi, W(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, W(e.type), 1),
			N("td", Ui, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", Wi, W(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: m(i.value[e.id]) }, {
				default: J(() => [P(W(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), M("span", Ki, W(i.value[e.id]?.error), 1)) : j("", !0)], 8, Gi)]),
			N("td", null, [N("div", qi, [F(y, {
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
function Yi(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Xi = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Zi = { class: "my-servers__head" }, Qi = {
	key: 0,
	class: "my-servers__skel"
}, $i = {
	key: 3,
	class: "my-servers__table-wrap"
}, ea = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, ta = { class: "my-servers__name" }, na = { class: "my-servers__url" }, ra = { class: "my-servers__num" }, ia = { class: "my-servers__date" }, aa = ["data-testid"], oa = { class: "my-servers__actions" }, sa = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
					last_seen: Yi(e.lastSeenAt)
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
		return z(s), (e, t) => (B(), M("section", Xi, [N("header", Zi, [t[1] ||= N("div", null, [N("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: J(() => [...t[0] ||= [P("Add server", -1)]]),
			_: 1
		})]), a.value ? (B(), M("div", Qi, [F(T, {
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
		})) : (B(), M("div", $i, [N("table", ea, [t[5] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("div", ta, W(e.name), 1), N("div", na, W(e.url), 1)]),
			N("td", null, W(e.owner), 1),
			N("td", ra, W(e.library_count === void 0 ? "—" : e.library_count), 1),
			N("td", ia, W(c(e.last_seen)), 1),
			N("td", null, [N("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [F(C, { tone: u(e.status) }, {
				default: J(() => [P(W(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, aa)]),
			N("td", null, [N("div", oa, [F(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: J(() => [...t[4] ||= [P("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), ca = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, la = {
	key: 0,
	class: "federation__skel"
}, ua = {
	key: 2,
	class: "federation__content"
}, da = {
	key: 1,
	class: "federation__table-wrap"
}, fa = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, pa = { class: "federation__name" }, ma = { class: "federation__url" }, ha = { class: "federation__num" }, ga = { class: "federation__date" }, _a = ["data-testid"], va = { class: "federation__actions" }, ya = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, ba = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		return z(() => u(!0)), (e, t) => (B(), M("section", ca, [t[10] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), M("div", la, [F(T, {
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
		}, 8, ["description"])) : (B(), M("div", ua, [
			t[9] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), A(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), M("div", da, [N("table", fa, [t[6] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(B(!0), M(D, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
				N("td", null, [N("div", pa, W(e.name), 1), N("div", ma, W(e.url), 1)]),
				N("td", ha, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", ga, W(p(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(C, { tone: g(e.status) }, {
					default: J(() => [P(W(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, _a)]),
				N("td", null, [N("div", va, [F(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: J(() => [...t[5] ||= [P(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			N("section", ya, [t[8] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: jn(d, ["prevent"])
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
}), [["__scopeId", "data-v-1e05d4ae"]]), xa = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Sa = {
	key: 0,
	class: "shares__skel"
}, Ca = {
	key: 3,
	class: "shares__table-wrap"
}, wa = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Ta = { class: "shares__library" }, Ea = { class: "shares__date" }, Da = { class: "shares__date" }, Oa = ["data-testid"], ka = { class: "shares__actions" }, Aa = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
					created_at: Yi(e.created_at) ?? "",
					expires_at: Yi(e.expires_at)
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
		return z(() => o(!0)), (e, t) => (B(), M("section", xa, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), M("div", Sa, [F(T, {
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
		})) : (B(), M("div", Ca, [N("table", wa, [t[4] ||= N("thead", null, [N("tr", null, [
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
			N("td", null, [N("span", Ta, W(e.library_name), 1)]),
			N("td", null, W(e.shared_with), 1),
			N("td", null, [F(C, { tone: u(e.permissions) }, {
				default: J(() => [P(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", Ea, W(c(e.created_at)), 1),
			N("td", Da, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), A(C, {
				key: 0,
				tone: "error"
			}, {
				default: J(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, Oa)]),
			N("td", null, [N("div", ka, [F(y, {
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
function ja(e, t) {
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
function Ma() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), Tn(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), En(t);
}
//#endregion
export { Fe as ALL_LOGS, Dt as AMBIENT_SAMPLE_H, Jt as AMBIENT_SAMPLE_INTERVAL_MS, Zt as AMBIENT_SAMPLE_W, ht as ARROW_ICONS, gt as ARROW_LABELS, Ge as AdminBackupApi, Ke as AdminCastApi, Xe as AdminCollectionsApi, Ie as AdminDashboardApi, qe as AdminDlnaServerApi, Ze as AdminHistoryApi, nt as AdminHubDashboardApi, We as AdminIntegrationsApi, et as AdminLibrariesApi, Ye as AdminLiveTvApi, Pe as AdminLogsApi, Je as AdminRemoteAccessApi, Ue as AdminServicesApi, tt as AdminSettingsApi, Qe as AdminSyncPlayApi, ze as AdminUsersApi, He as AdminWebhooksApi, Nt as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, Qn as AppLayout, C as Badge, y as Button, mn as CAPTION_BACKGROUND_OPTIONS, ln as CAPTION_COLOR_OPTIONS, fn as CAPTION_EDGE_OPTIONS, on as CAPTION_SIZE_OPTIONS, $t as CAPTION_SIZE_SCALE, ot as CaptionOverlay, st as CaptionsMenu, ve as Chip, be as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, Vt as DIRECT_PLAY_EXTENSIONS, E as EmptyState, ba as FederationPage, Ce as FilterBar, n as Icon, r as IconButton, ce as Kbd, $e as LIBRARY_TYPES, Ji as LibraryScanPage, ne as LocalStorageTokenStore, gn as LoginForm, Aa as ManageSharesPage, ke as MediaCard, Ne as MediaDetail, Se as MediaGrid, Ee as MediaHomeRow, Ae as MediaRow, gr as MiniPlayer, we as Modal, sa as MyServersPage, ee as NetworkError, vt as PLAYER_SHORTCUTS, Ii as PageTransition, Vr as PhlixApp, Kt as Player, _t as QualityMenu, Le as RATING_LABELS, Re as RATING_OPTIONS, ae as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, Pt as ResumePrompt, Fi as Reveal, Be as SUBSCRIBABLE_EVENTS, Et as Scrubber, ye as Select, vn as SettingsForm, Hn as Sheet, It as ShortcutsHelp, _n as SignupForm, T as Skeleton, Bt as SkipButton, ge as Slider, Lt as SpeedMenu, Te as Spinner, _e as Switch, Gt as TRANSCODE_EXTENSIONS, De as Tabs, te as TimeoutError, Pi as ToastHost, Ei as Tooltip, Ft as TranscodeNotice, Wt as TranscodePreparing, At as UPNEXT_COUNTDOWN_SECONDS, Rt as UPNEXT_RING_CIRCUMFERENCE, qt as UPNEXT_RING_RADIUS, Ot as UpNext, rt as VolumeControl, Ve as WEBHOOK_EVENT_CATEGORIES, un as activeAudioIndex, vi as adminMenu, kt as ambientGradient, pn as applyAudioTrack, Er as applyStoredThemeEarly, en as applyTrackModes, Ut as attachHls, Xt as averageRegion, ja as bindMediaStoreToRouter, hi as buildAdminRoutes, _i as buildHubAdminRoutes, Me as buildMediaQuery, je as buildMediaUrl, gi as buildServerAdminRoutes, sn as captionStyleVars, hn as cleanCueText, ui as commonAdminPages, wi as createPhlixApp, f as createTranslator, Cr as deriveAccentVars, tn as edgeShadow, h as errMessage, jt as extensionOf, le as fetchLibraries, he as formatPageTitle, Tt as formatTime, oe as fuzzyScore, ct as handleShortcut, nn as hasActiveCaptions, c as hasStoredPreferences, fi as hubAdminPages, bt as isBatterySaving, Qt as isFailedStatus, Mt as isFatalMediaError, ft as isNativeHlsSupported, g as isOffline, it as isPlayable, dt as isTypingTarget, dn as listAudioTracks, cn as listSubtitleTracks, se as matchCommand, u as mergeMessages, Ht as needsTranscode, Ct as parseSubtitleTracks, ut as parseTranscodeStart, St as parseTranscodeStatus, an as readActiveCueLines, o as readStoredPreferences, wt as resolveStreamUrl, rn as resolveTextTrack, at as rgbString, Yt as rgbaString, zt as ringDashoffset, xt as sampleAmbient, di as serverAdminPages, pe as setAppName, me as setPageTitle, ue as sortLibraries, lt as transcodeStartPath, pt as transcodeStatusPath, b as useAuthStore, Or as useCommandPaletteHotkey, S as useCommandStore, i as useFocusTrap, yt as useHlsTranscode, mt as useKeyboardShortcuts, de as useLibrariesStore, xe as useMediaStore, p as useMessages, Ma as useOnline, fe as usePageTitle, x as usePlayerStore, Mr as usePreconnect, a as usePreferencesStore, Oe as usePrefetch, Lr as useResumeReporter, Nr as useResumeSync, Dr as useTheme, w as useToastStore };

//# sourceMappingURL=phlix-ui.js.map