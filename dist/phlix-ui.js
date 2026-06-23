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
import { i as Ee, n as De, r as Oe, t as ke } from "./FilterBar-Cbbqm24x.js";
import { t as Ae } from "./Modal-I4tEFhoH.js";
import { t as C } from "./useToastStore-BDoKlU6N.js";
import { t as w } from "./Skeleton-DkSoWF3C.js";
import { i as je, n as Me, r as Ne, t as Pe } from "./MetadataMatchModal-DEJW4hCM.js";
import { t as T } from "./EmptyState-B2QnGIQT.js";
import { t as Fe } from "./Tabs-x8dUKZN5.js";
import { t as Ie } from "./MediaRow-CSAJjxOz.js";
import { n as Le, t as Re } from "./media-query-BJZQTDXd.js";
import { t as ze } from "./HomeRow-C0_2mdi-.js";
import { t as Be } from "./MediaDetail-BckOktCe.js";
import { n as Ve, t as He } from "./logs-DadTfaTq.js";
import { t as Ue } from "./dashboard-BTCOCTHQ.js";
import { n as We, r as Ge, t as Ke } from "./users-UPfbrkL3.js";
import { n as qe, r as Je, t as Ye } from "./webhooks-BBTLnFKm.js";
import { t as Xe } from "./services-C907MGdw.js";
import { t as Ze } from "./integrations-DLAG9ISY.js";
import { t as Qe } from "./backup-IdY_vzc2.js";
import { t as $e } from "./cast-BvFcBEB6.js";
import { t as et } from "./dlnaServer-B5Sg4MkS.js";
import { t as tt } from "./remoteAccess-DVKRpKQ8.js";
import { t as nt } from "./liveTv-Dbjt901v.js";
import { t as rt } from "./collections-CH3HLdcd.js";
import { t as it } from "./history-ByCY8OYj.js";
import { t as at } from "./syncPlay-DPzJkgkK.js";
import { n as ot, t as st } from "./libraries-CXAz_kXs.js";
import { t as ct } from "./settings-m4upFcmH.js";
import { i as lt, n as ut, r as dt, t as ft } from "./plugins-CLT7jRx3.js";
import { t as pt } from "./hubDashboard-BhOaaDD-.js";
import { A as mt, B as ht, C as gt, D as _t, E as vt, F as yt, G as bt, H as xt, I as St, J as Ct, K as wt, L as Tt, M as Et, N as Dt, O as Ot, P as kt, R as At, S as jt, T as Mt, U as Nt, V as Pt, W as Ft, X as It, Y as Lt, _ as Rt, a as zt, b as Bt, c as Vt, d as Ht, f as Ut, g as Wt, h as Gt, i as Kt, j as qt, k as Jt, l as Yt, m as Xt, n as Zt, o as Qt, p as $t, q as en, r as tn, s as nn, t as rn, u as an, v as on, w as sn, x as cn, y as ln, z as un } from "./Player-jbJMxv3h.js";
import { a as dn, c as fn, d as pn, f as mn, g as hn, h as gn, i as _n, l as vn, m as yn, n as bn, o as xn, p as Sn, r as Cn, s as wn, t as Tn, u as En } from "./captions-COgPp5bH.js";
import { t as Dn } from "./LoginForm-Cg_g4AlO.js";
import { t as On } from "./SignupForm-jTnWBBlx.js";
import { t as kn } from "./SettingsForm-F1qoOM2o.js";
import { Fragment as E, Teleport as An, Transition as D, TransitionGroup as jn, computed as O, createApp as Mn, createBlock as k, createCommentVNode as A, createElementBlock as j, createElementVNode as M, createTextVNode as N, createVNode as P, defineAsyncComponent as Nn, defineComponent as F, inject as Pn, normalizeClass as I, normalizeStyle as Fn, onBeforeUnmount as L, onMounted as R, onScopeDispose as In, openBlock as z, readonly as Ln, ref as B, renderList as V, renderSlot as H, resolveDynamicComponent as Rn, toDisplayString as U, unref as W, useId as zn, vModelText as G, watch as K, watchEffect as Bn, withCtx as q, withDirectives as J, withKeys as Vn, withModifiers as Hn } from "vue";
import { createPinia as Un } from "pinia";
import { RouterLink as Y, RouterView as Wn, createRouter as Gn, createWebHistory as Kn, useRouter as qn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var Jn = ["aria-labelledby"], Yn = {
	key: 0,
	class: "phlix-sheet__header"
}, Xn = ["id"], Zn = { class: "phlix-sheet__body" }, Qn = {
	key: 1,
	class: "phlix-sheet__footer"
}, $n = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let s = B(null), c = zn();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (z(), k(An, { to: "body" }, [P(D, { name: `phlix-sheet-${e.side}` }, {
			default: q(() => [e.modelValue ? (z(), j("div", {
				key: 0,
				class: I(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Hn(u, ["self"])
			}, [M("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? W(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (z(), j("header", Yn, [e.title ? (z(), j("h2", {
					key: 0,
					id: W(c),
					class: "phlix-sheet__title"
				}, U(e.title), 9, Xn)) : A("", !0), e.hideClose ? A("", !0) : (z(), k(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : A("", !0),
				M("div", Zn, [H(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (z(), j("footer", Qn, [H(t.$slots, "footer", {}, void 0, !0)])) : A("", !0)
			], 8, Jn)], 34)) : A("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), er = { class: "shell" }, tr = {
	class: "shell__skip",
	href: "#main"
}, nr = { class: "shell__bar" }, rr = { class: "shell__inner" }, ir = { class: "shell__brand" }, ar = ["aria-label"], or = { class: "shell__actions" }, sr = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, cr = {
	key: 0,
	class: "shell__footer"
}, lr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = B(!1), { t: o } = p();
		return (t, a) => (z(), j("div", er, [
			M("a", tr, U(W(o)("shell.skipToContent")), 1),
			P(e, { enabled: W(n).atmosphere }, null, 8, ["enabled"]),
			M("header", nr, [M("div", rr, [
				M("div", ir, [H(t.$slots, "logo", {}, () => [a[3] ||= M("span", { class: "shell__wordmark" }, [N("Phlix"), M("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				M("nav", {
					class: "shell__nav",
					"aria-label": W(o)("shell.primaryNav")
				}, [H(t.$slots, "nav", {}, void 0, !0)], 8, ar),
				a[4] ||= M("span", { class: "shell__spacer" }, null, -1),
				M("div", or, [H(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (z(), k(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: W(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : A("", !0)
			])]),
			M("main", sr, [H(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (z(), j("footer", cr, [H(t.$slots, "footer", {}, void 0, !0)])) : A("", !0),
			P($n, {
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
}), [["__scopeId", "data-v-aaaeed33"]]), ur = /* @__PURE__ */ F({
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
}), dr = ["aria-label", "aria-expanded"], fr = {
	key: 0,
	class: "usermenu__avatar"
}, pr = ["aria-label"], mr = { class: "usermenu__head" }, hr = { class: "usermenu__avatar usermenu__avatar--lg" }, gr = { class: "usermenu__name" }, _r = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = qn(), a = Pn("phlixConfig", null), o = O(() => a?.routerBase ?? "/app"), { t: s } = p(), c = B(!1), l = B(null), u = B(null), d = O(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = O(() => d.value.charAt(0).toUpperCase() || "A");
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
		}, [W(t).isLoggedIn ? (z(), j("span", fr, U(f.value), 1)) : (z(), k(n, {
			key: 1,
			name: "user"
		}))], 8, dr), c.value ? (z(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": W(s)("shell.account"),
			tabindex: "-1"
		}, [W(t).isLoggedIn ? (z(), j(E, { key: 0 }, [
			M("div", mr, [M("span", hr, U(f.value), 1), M("span", gr, U(d.value), 1)]),
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
		}, [P(n, { name: "user" }), N(" " + U(W(s)("shell.signIn")), 1)]))], 8, pr)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), vr = ["aria-label"], yr = ["src", "poster"], br = { class: "mini__body" }, xr = { class: "mini__title" }, Sr = { class: "mini__controls" }, Cr = ["aria-label"], wr = ["aria-label"], Tr = ["aria-label"], Er = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Dr = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
				}, null, 40, yr),
				M("div", br, [M("p", xr, U(c.value), 1), M("div", Sr, [
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": W(i).playing ? W(a)("player.pause") : W(a)("player.play"),
						onClick: h
					}, [P(n, { name: W(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Cr),
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": W(a)("player.expand"),
						onClick: g
					}, [P(n, { name: "expand" })], 8, wr),
					M("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": W(a)("player.closePlayer"),
						onClick: _
					}, [P(n, { name: "x" })], 8, Tr)
				])]),
				M("div", Er, [M("div", {
					class: "mini__progress-fill",
					style: Fn({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, vr)) : A("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function Or(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var X = (e) => Math.max(0, Math.min(255, Math.round(e))), kr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => X(e).toString(16).padStart(2, "0")).join("");
function Ar(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function jr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Mr = ({ r: e, g: t, b: n }, r) => `rgba(${X(e)}, ${X(t)}, ${X(n)}, ${r})`;
function Nr({ r: e, g: t, b: n }) {
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
function Pr(e) {
	let t = Or(e);
	if (!t) return null;
	let n = Nr(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": kr(t),
		"--accent-hover": kr(Ar(t, .12)),
		"--accent-active": kr(jr(t, .12)),
		"--accent-soft": Mr(t, .14),
		"--accent-ring": Mr(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Fr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Ir(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Pr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Fr) n.style.removeProperty(e);
}
function Lr(e) {
	let t = o();
	e && !c() && (t.theme = e), Ir(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Rr() {
	let e = a();
	return Bn(() => {
		Ir({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function zr() {
	let e = ce(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), In(() => document.removeEventListener("keydown", t)));
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
function Br(e) {
	let t = Z(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Z(n, t);
	return !r || t && r === t ? null : r;
}
function Vr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Z(e.href) === t) return !0;
	return !1;
}
function Hr(e, t, n, r) {
	if (Vr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function Ur(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Z(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Z(e);
		r && (n && r === n || a.has(r) || (a.add(r), Hr("preconnect", r, t.crossOrigin === !0, i), Hr("dns-prefetch", r, !1, i)));
	}
	i.length && In(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function Wr() {
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
var Gr = "phlix.deviceId", Kr = 15e3;
function qr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(Gr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(Gr, e)), e;
	} catch {
		return "web";
	}
}
function Jr() {
	let e = x(), t = b(), n = qr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < Kr)) {
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
var Yr = ["src", "alt"], Xr = { class: "brand-wordmark" }, Zr = {
	key: 1,
	class: "brand-tagline"
}, Qr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PhlixApp",
	setup(e) {
		Rr();
		let t = ce(), i = qn(), { t: a } = p();
		zr();
		let o = Nn(() => import("./CommandPalette-ntNedT6K.js")), s = B(!1);
		K(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = Pn("phlixConfig", null);
		Ur(Br({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = Wr();
		K(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), Jr();
		let m = O(() => l?.branding ?? {}), h = O(() => m.value.wordmark ?? "Phlix"), g = O(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = O(() => l?.home ?? l?.routerBase ?? "/app"), v = _e(), ee = O(() => g.value.some((e) => e.libraryLinks));
		K(() => u.isLoggedIn && ee.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function te(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (z(), k(lr, null, {
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
					}, null, 8, Yr)) : A("", !0),
					M("span", Xr, [N(U(h.value), 1), i[1] ||= M("span", { class: "brand-dot" }, ".", -1)]),
					m.value.tagline ? (z(), j("span", Zr, U(m.value.tagline), 1)) : A("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: q(() => [g.value.length ? (z(!0), j(E, { key: 0 }, V(g.value, (e) => (z(), j(E, { key: e.id }, [(z(), k(Rn(e.href ? "a" : W(Y)), {
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
				P(ur),
				P(_r)
			]),
			default: q(() => [
				P(W(Wn)),
				s.value ? (z(), k(W(o), { key: 0 })) : A("", !0),
				P(Dr, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-5afba5d1"]]), $r = { class: "phlix-placeholder" }, ei = { class: "placeholder-content" }, ti = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (z(), j("div", $r, [M("div", ei, [n[0] ||= M("h1", null, "Shared UI loading...", -1), M("p", null, "Phlix " + U(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), ni = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-Bb8YO--I.js")
}, ri = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-BCVjX4Gn.js")
}, ii = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-CGqEe7aQ.js")
}, ai = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-Di0fQxYJ.js")
}, oi = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-MSQAAoEH.js")
}, si = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-BTnIASeV.js")
}, ci = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-zWqPznJh.js")
}, li = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-CNV9AF4r.js")
}, ui = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-D7jRLpnJ.js")
}, di = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-CRTfYrPz.js")
}, Q = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-CQ0DJW1V.js")
}, fi = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-CtA7DWRT.js")
}, pi = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-BLBbIUu2.js")
}, mi = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-B29XH8K5.js")
}, hi = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-C0A9z5qZ.js")
}, gi = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-D1XER7BI.js")
}, _i = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-CUJ7VGBh.js")
}, vi = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-vbZJXT-p.js")
}, yi = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-CFuJAm57.js")
}, bi = Object.fromEntries([
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
	Q,
	fi,
	pi,
	mi,
	hi,
	gi,
	_i,
	vi,
	yi
].map((e) => [e.name, e.label]));
function xi(e) {
	return e ? bi[e] ?? null : null;
}
var Si = [
	ri,
	ii,
	_i
], Ci = [
	ni,
	ai,
	oi,
	si,
	ci,
	li,
	ui,
	di,
	Q,
	fi,
	pi,
	mi,
	hi,
	gi
], wi = [vi, yi], Ti = [
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
	Q,
	fi,
	pi,
	mi,
	hi,
	gi,
	_i
], Ei = [
	vi,
	...Si,
	yi
];
function Di(e = "/app", t = Ti) {
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
function Oi(e = "/app") {
	return Di(e, Ti);
}
function ki(e = "/app") {
	return Di(e, Ei);
}
function Ai(e = "/app", t = Ti) {
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
var ji = ["login", "signup"];
function Mi(e, t, n = !1) {
	let r = typeof e.name == "string" ? e.name : "";
	return ji.includes(r) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? { name: "browse" } : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Ni(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = xi(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function Pi() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Fi(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-DDHa17sd.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-DUw85InE.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-7wef-qgE.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-xVlQXwuk.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-B4D2am4X.js")
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
		component: ti,
		props: { appName: e.app }
	}), n;
}
function Ii(e) {
	let t = {
		...Pi(),
		...e
	};
	Lr(t.defaultTheme), ye(t.branding?.wordmark);
	let n = f(t.messages), r = Un();
	t.defaultTheme && !c() && (a(r).theme = t.defaultTheme);
	let i = Gn({
		history: Kn(),
		routes: Fi(t)
	});
	i.beforeEach(async (e) => {
		let t = b(r);
		return await t.init(), Mi(e, t.isLoggedIn, t.isAdmin);
	}), i.afterEach((e) => {
		be(Ni(e, n));
	});
	let o = Mn(Qr);
	return o.provide("apiBase", t.apiBase), o.provide("phlixCommands", t.commands ?? []), o.provide("phlixConfig", t), o.use(r), o.use(i), o;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Li = ["id"], Ri = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let t = e, n = zn(), r = B(!1), i = B(null), a;
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
			onKeydown: Vn(c, ["esc"])
		}, [H(t.$slots, "default", {}, void 0, !0), P(D, { name: "phlix-tooltip" }, {
			default: q(() => [r.value && (e.text || t.$slots.content) ? (z(), j("span", {
				key: 0,
				id: W(n),
				role: "tooltip",
				class: I(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [H(t.$slots, "content", {}, () => [N(U(e.text), 1)], !0)], 10, Li)) : A("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), zi = ["aria-label"], Bi = ["role"], Vi = { class: "phlix-toast__content" }, Hi = {
	key: 0,
	class: "phlix-toast__title"
}, Ui = { class: "phlix-toast__message" }, Wi = ["onClick"], Gi = 0, Ki = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
			Gi++;
		}), L(() => {
			Gi--;
		}), (a, s) => (z(), k(An, { to: "body" }, [M("div", {
			class: I(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": W(t)("common.notifications")
		}, [P(jn, { name: "phlix-toast" }, {
			default: q(() => [(z(!0), j(E, null, V(W(i).toasts, (e) => (z(), j("div", {
				key: e.id,
				class: I(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				P(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				M("div", Vi, [e.title ? (z(), j("p", Hi, U(e.title), 1)) : A("", !0), M("p", Ui, U(e.message), 1)]),
				e.action ? (z(), j("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), W(i).dismiss(e.id);
					}
				}, U(e.action.label), 9, Wi)) : A("", !0),
				P(r, {
					name: "x",
					label: W(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => W(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Bi))), 128))]),
			_: 1
		})], 10, zi)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), qi = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		}), (t, a) => (z(), k(Rn(e.tag), {
			ref_key: "el",
			ref: n,
			class: I(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Fn({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: q(() => [H(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Ji = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
}), [["__scopeId", "data-v-dafe74d0"]]), Yi = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Xi = {
	key: 0,
	class: "library-scan__skel"
}, Zi = {
	key: 3,
	class: "library-scan__table-wrap"
}, Qi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, $i = { class: "library-scan__name" }, ea = {
	key: 0,
	class: "library-scan__paths"
}, ta = { class: "library-scan__num" }, na = { class: "library-scan__date" }, ra = ["data-testid"], ia = {
	key: 0,
	class: "library-scan__error"
}, aa = { class: "library-scan__actions" }, oa = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		return R(s), (e, t) => (z(), j("section", Yi, [t[4] ||= M("header", { class: "library-scan__head" }, [M("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), M("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (z(), j("div", Xi, [P(w, {
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
		})) : (z(), j("div", Zi, [M("table", Qi, [t[3] ||= M("thead", null, [M("tr", null, [
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
			M("td", null, [M("div", $i, U(e.name), 1), e.paths.length ? (z(), j("div", ea, U(e.paths.join(", ")), 1)) : A("", !0)]),
			M("td", null, U(e.type), 1),
			M("td", ta, U(e.item_count === void 0 ? "—" : e.item_count), 1),
			M("td", na, U(d(e.last_scan_at)), 1),
			M("td", null, [M("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [P(S, { tone: m(i.value[e.id]) }, {
				default: q(() => [N(U(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (z(), j("span", ia, U(i.value[e.id]?.error), 1)) : A("", !0)], 8, ra)]),
			M("td", null, [M("div", aa, [P(y, {
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
async function sa(e, t, n) {
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
function ca(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var la = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, ua = { class: "my-servers__head" }, da = {
	key: 0,
	class: "my-servers__skel"
}, fa = {
	key: 3,
	class: "my-servers__table-wrap"
}, pa = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, ma = { class: "my-servers__name" }, ha = { class: "my-servers__url" }, ga = { class: "my-servers__num" }, _a = { class: "my-servers__date" }, va = ["data-testid"], ya = { class: "my-servers__actions" }, ba = ["disabled"], xa = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, Sa = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = C(), r = b(), i = B([]), a = B(!0), o = B(null), s = B(!1), c = B(""), l = B(!1), u = B(null);
		function d() {
			c.value = "", u.value = null, s.value = !0;
		}
		async function f() {
			l.value = !0, u.value = null;
			try {
				await sa("", c.value), s.value = !1, n.success("Server added."), await p();
			} catch (e) {
				u.value = e instanceof $ ? e.message : g(e, "Could not add the server.");
			} finally {
				l.value = !1;
			}
		}
		async function p() {
			a.value = !0, o.value = null;
			try {
				let e = await t.get("/api/v1/me/servers"), n = r.user?.username || r.user?.name || r.user?.email || "—";
				i.value = (e.servers || []).map((e) => ({
					id: e.serverId ?? "",
					name: e.serverName ?? "",
					url: e.hostnameCandidates?.[0] ?? "",
					status: e.status ?? "offline",
					owner: n,
					last_seen: ca(e.lastSeenAt)
				}));
			} catch (e) {
				o.value = g(e, "Failed to load servers."), n.error(o.value);
			} finally {
				a.value = !1;
			}
		}
		function m(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function h(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function _(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		function ee(e) {
			e.url && window.open(e.url, "_blank", "noopener,noreferrer");
		}
		return R(p), (e, t) => (z(), j("section", la, [
			M("header", ua, [t[4] ||= M("div", null, [M("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), M("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), P(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: d
			}, {
				default: q(() => [...t[3] ||= [N("Add server", -1)]]),
				_: 1
			})]),
			a.value ? (z(), j("div", da, [P(w, {
				variant: "text",
				lines: 6
			})])) : o.value ? (z(), k(T, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: o.value
			}, {
				actions: q(() => [P(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: p
				}, {
					default: q(() => [...t[5] ||= [N("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : i.value.length === 0 ? (z(), k(T, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: q(() => [P(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: d
				}, {
					default: q(() => [...t[6] ||= [N("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (z(), j("div", fa, [M("table", pa, [t[8] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Server"),
				M("th", { scope: "col" }, "Owner"),
				M("th", { scope: "col" }, "Libraries"),
				M("th", { scope: "col" }, "Last seen"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(z(!0), j(E, null, V(i.value, (e) => (z(), j("tr", { key: e.id }, [
				M("td", null, [M("div", ma, U(e.name), 1), M("div", ha, U(e.url), 1)]),
				M("td", null, U(e.owner), 1),
				M("td", ga, U(e.library_count === void 0 ? "—" : e.library_count), 1),
				M("td", _a, U(m(e.last_seen)), 1),
				M("td", null, [M("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [P(S, { tone: _(e.status) }, {
					default: q(() => [N(U(h(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, va)]),
				M("td", null, [M("div", ya, [P(y, {
					variant: "ghost",
					size: "sm",
					disabled: !e.url,
					title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
					"aria-label": `Manage ${e.name}`,
					onClick: (t) => ee(e)
				}, {
					default: q(() => [...t[7] ||= [N("Manage", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				])])])
			]))), 128))])])])),
			P(Ae, {
				modelValue: s.value,
				"onUpdate:modelValue": t[2] ||= (e) => s.value = e,
				title: "Add a server"
			}, {
				footer: q(() => [P(y, {
					variant: "ghost",
					size: "sm",
					disabled: l.value,
					onClick: t[1] ||= (e) => s.value = !1
				}, {
					default: q(() => [...t[11] ||= [N("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), P(y, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: l.value,
					disabled: l.value,
					onClick: f
				}, {
					default: q(() => [...t[12] ||= [N(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: q(() => [M("form", {
					class: "my-servers__add-form",
					onSubmit: Hn(f, ["prevent"])
				}, [
					t[9] ||= M("p", { class: "my-servers__add-help" }, [
						N(" On your media server, open "),
						M("strong", null, "Settings → Connect to hub"),
						N(" to get a claim code, then paste it here. ")
					], -1),
					t[10] ||= M("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					J(M("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => c.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: l.value
					}, null, 8, ba), [[G, c.value]]),
					u.value ? (z(), j("p", xa, U(u.value), 1)) : A("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-4971319d"]]), Ca = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, wa = {
	key: 0,
	class: "federation__skel"
}, Ta = {
	key: 2,
	class: "federation__content"
}, Ea = {
	key: 1,
	class: "federation__table-wrap"
}, Da = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, Oa = { class: "federation__name" }, ka = { class: "federation__url" }, Aa = { class: "federation__num" }, ja = { class: "federation__date" }, Ma = ["data-testid"], Na = { class: "federation__actions" }, Pa = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, Fa = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		return R(() => u(!0)), (e, t) => (z(), j("section", Ca, [t[10] ||= M("header", { class: "federation__head" }, [M("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), M("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (z(), j("div", wa, [P(w, {
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
		}, 8, ["description"])) : (z(), j("div", Ta, [
			t[9] ||= M("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (z(), k(T, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (z(), j("div", Ea, [M("table", Da, [t[6] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Peer"),
				M("th", { scope: "col" }, "Shared libraries"),
				M("th", { scope: "col" }, "Last sync"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(z(!0), j(E, null, V(r.value, (e) => (z(), j("tr", { key: e.id }, [
				M("td", null, [M("div", Oa, U(e.name), 1), M("div", ka, U(e.url), 1)]),
				M("td", Aa, U(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				M("td", ja, U(p(e.last_sync)), 1),
				M("td", null, [M("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [P(S, { tone: h(e.status) }, {
					default: q(() => [N(U(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Ma)]),
				M("td", null, [M("div", Na, [P(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: q(() => [...t[5] ||= [N(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			M("section", Pa, [t[8] ||= M("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), M("form", {
				class: "federation__form",
				onSubmit: Hn(d, ["prevent"])
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
}), [["__scopeId", "data-v-1e05d4ae"]]), Ia = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, La = {
	key: 0,
	class: "shares__skel"
}, Ra = {
	key: 3,
	class: "shares__table-wrap"
}, za = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Ba = { class: "shares__library" }, Va = { class: "shares__date" }, Ha = { class: "shares__date" }, Ua = ["data-testid"], Wa = { class: "shares__actions" }, Ga = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
					created_at: ca(e.created_at) ?? "",
					expires_at: ca(e.expires_at)
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
		return R(() => o(!0)), (e, t) => (z(), j("section", Ia, [t[5] ||= M("header", { class: "shares__head" }, [M("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), M("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (z(), j("div", La, [P(w, {
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
		})) : (z(), j("div", Ra, [M("table", za, [t[4] ||= M("thead", null, [M("tr", null, [
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
			M("td", null, [M("span", Ba, U(e.library_name), 1)]),
			M("td", null, U(e.shared_with), 1),
			M("td", null, [P(S, { tone: u(e.permissions) }, {
				default: q(() => [N(U(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			M("td", Va, U(c(e.created_at)), 1),
			M("td", Ha, [M("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [N(U(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (z(), k(S, {
				key: 0,
				tone: "error"
			}, {
				default: q(() => [...t[2] ||= [N("Expired", -1)]]),
				_: 1
			})) : A("", !0)], 8, Ua)]),
			M("td", null, [M("div", Wa, [P(y, {
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
function Ka(e, t) {
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
function qa() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = B(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), In(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Ln(t);
}
//#endregion
export { He as ALL_LOGS, Rt as AMBIENT_SAMPLE_H, on as AMBIENT_SAMPLE_INTERVAL_MS, ln as AMBIENT_SAMPLE_W, Et as ARROW_ICONS, Dt as ARROW_LABELS, Qe as AdminBackupApi, $e as AdminCastApi, rt as AdminCollectionsApi, Ue as AdminDashboardApi, et as AdminDlnaServerApi, it as AdminHistoryApi, pt as AdminHubDashboardApi, Ze as AdminIntegrationsApi, st as AdminLibrariesApi, nt as AdminLiveTvApi, Ve as AdminLogsApi, ft as AdminPluginsApi, tt as AdminRemoteAccessApi, Xe as AdminServicesApi, ct as AdminSettingsApi, at as AdminSyncPlayApi, Ke as AdminUsersApi, Ye as AdminWebhooksApi, Wt as AmbientCanvas, te as ApiClient, h as ApiError, e as AppBackdrop, lr as AppLayout, S as Badge, y as Button, Tn as CAPTION_BACKGROUND_OPTIONS, bn as CAPTION_COLOR_OPTIONS, Cn as CAPTION_EDGE_OPTIONS, _n as CAPTION_SIZE_OPTIONS, dn as CAPTION_SIZE_SCALE, _t as CaptionOverlay, vt as CaptionsMenu, we as Chip, Ee as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, Qt as DIRECT_PLAY_EXTENSIONS, T as EmptyState, Fa as FederationPage, ke as FilterBar, n as Icon, r as IconButton, de as Kbd, ot as LIBRARY_TYPES, oa as LibraryScanPage, re as LocalStorageTokenStore, Dn as LoginForm, Ga as ManageSharesPage, Me as MediaCard, Be as MediaDetail, Oe as MediaGrid, ze as MediaHomeRow, Ie as MediaRow, Pe as MetadataMatchModal, Dr as MiniPlayer, Ae as Modal, Sa as MyServersPage, ee as NetworkError, kt as PLAYER_SHORTCUTS, ut as PLUGIN_SECRET_MASK, Ji as PageTransition, Qr as PhlixApp, rn as Player, Ot as QualityMenu, We as RATING_LABELS, Ge as RATING_OPTIONS, se as RESUME_MAX_RATIO, ae as RESUME_MIN_SECONDS, Gt as ResumePrompt, qi as Reveal, pe as SORT_TITLE_ARTICLES, qe as SUBSCRIBABLE_EVENTS, Lt as Scrubber, Te as Select, kn as SettingsForm, $n as Sheet, qt as ShortcutsHelp, On as SignupForm, w as Skeleton, Zt as SkipButton, Se as Slider, Jt as SpeedMenu, je as Spinner, Ce as Switch, ne as TMDB_UNCONFIGURED_CODE, nn as TRANSCODE_EXTENSIONS, Fe as Tabs, ie as TimeoutError, Ki as ToastHost, Ri as Tooltip, Kt as TranscodeNotice, tn as TranscodePreparing, Vt as UPNEXT_COUNTDOWN_SECONDS, Yt as UPNEXT_RING_CIRCUMFERENCE, an as UPNEXT_RING_RADIUS, zt as UpNext, mt as VolumeControl, Je as WEBHOOK_EVENT_CATEGORIES, xn as activeAudioIndex, Ai as adminMenu, Bt as ambientGradient, wn as applyAudioTrack, Lr as applyStoredThemeEarly, fn as applyTrackModes, en as attachHls, cn as averageRegion, Ka as bindMediaStoreToRouter, Di as buildAdminRoutes, ki as buildHubAdminRoutes, Re as buildMediaQuery, Le as buildMediaUrl, Oi as buildServerAdminRoutes, vn as captionStyleVars, En as cleanCueText, Si as commonAdminPages, fe as compareByStrippedTitle, Ii as createPhlixApp, f as createTranslator, Pr as deriveAccentVars, pn as edgeShadow, g as errMessage, Ht as extensionOf, me as fetchLibraries, xe as formatPageTitle, It as formatTime, le as fuzzyScore, yt as handleShortcut, mn as hasActiveCaptions, c as hasStoredPreferences, wi as hubAdminPages, jt as isBatterySaving, un as isFailedStatus, Ut as isFatalMediaError, Ct as isNativeHlsSupported, _ as isOffline, ht as isPlayable, m as isTmdbUnconfigured, St as isTypingTarget, Sn as listAudioTracks, yn as listSubtitleTracks, ue as matchCommand, u as mergeMessages, $t as needsTranscode, Pt as parseSubtitleTracks, xt as parseTranscodeStart, Nt as parseTranscodeStatus, dt as pluginErrorCode, lt as pluginValidationErrors, gn as readActiveCueLines, o as readStoredPreferences, Ft as resolveStreamUrl, hn as resolveTextTrack, gt as rgbString, sn as rgbaString, Xt as ringDashoffset, Mt as sampleAmbient, Ci as serverAdminPages, ye as setAppName, be as setPageTitle, ge as sortLibraries, he as stripLeadingArticle, bt as transcodeStartPath, wt as transcodeStatusPath, b as useAuthStore, zr as useCommandPaletteHotkey, ce as useCommandStore, i as useFocusTrap, At as useHlsTranscode, Tt as useKeyboardShortcuts, _e as useLibrariesStore, De as useMediaStore, p as useMessages, qa as useOnline, ve as usePageTitle, x as usePlayerStore, Ur as usePreconnect, a as usePreferencesStore, Ne as usePrefetch, Jr as useResumeReporter, Wr as useResumeSync, Rr as useTheme, C as useToastStore };

//# sourceMappingURL=phlix-ui.js.map