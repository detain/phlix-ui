import { r as e } from "./AuthField-BV9K8QhV.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-C5x9ZDfp.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { i as u, n as d, r as f, t as p } from "./useMessages-D7StdIzu.js";
import { a as m, c as h, l as g, n as _, o as ee, r as v, s as te, t as y } from "./Button-BwQkyEkr.js";
import { t as ne } from "./tokenStore-CGMYSpg6.js";
import { t as b } from "./useAuthStore-DdW4mkuI.js";
import { i as x, n as re, r as S, t as ie } from "./usePlayerStore-Cffo63UC.js";
import { i as C, n as ae, r as oe, t as se } from "./Kbd-CSMm1T0l.js";
import { n as ce, r as le, t as ue } from "./useLibrariesStore-C5Sg25Ui.js";
import { t as w } from "./Badge-ArWL5-WE.js";
import { t as de } from "./Slider-BMn_Lp_q.js";
import { t as fe } from "./Switch-CFZhdkXR.js";
import { t as pe } from "./Chip-2HcSZF4a.js";
import { t as me } from "./Select-DfIQHE9A.js";
import { i as he, n as ge, r as _e, t as ve } from "./FilterBar-CMWY6usV.js";
import { t as ye } from "./Modal-twmWG3l1.js";
import { t as T } from "./useToastStore-BDoKlU6N.js";
import { t as E } from "./Skeleton-DkSoWF3C.js";
import { n as be, t as xe } from "./MediaRow-C9mRFOtk.js";
import { t as D } from "./EmptyState-B2QnGIQT.js";
import { t as Se } from "./Tabs-x8dUKZN5.js";
import { n as Ce, t as we } from "./MediaCard-BUq_DyAQ.js";
import { n as Te, t as Ee } from "./media-query-BcVLE7J6.js";
import { t as De } from "./HomeRow-6agXoji6.js";
import { t as Oe } from "./MediaDetail-Bshst3uf.js";
import { n as ke, t as Ae } from "./logs-DadTfaTq.js";
import { t as je } from "./dashboard-BTCOCTHQ.js";
import { n as Me, r as Ne, t as Pe } from "./users-C40iLgkq.js";
import { n as Fe, r as Ie, t as Le } from "./webhooks-BBTLnFKm.js";
import { t as Re } from "./services-Czm8hsvH.js";
import { t as ze } from "./integrations-DLAG9ISY.js";
import { t as Be } from "./backup-IdY_vzc2.js";
import { t as Ve } from "./cast-BvFcBEB6.js";
import { t as He } from "./dlnaServer-B5Sg4MkS.js";
import { t as Ue } from "./remoteAccess-DVKRpKQ8.js";
import { t as We } from "./liveTv-Dbjt901v.js";
import { t as Ge } from "./collections-CH3HLdcd.js";
import { t as Ke } from "./history-ByCY8OYj.js";
import { t as qe } from "./syncPlay-DPzJkgkK.js";
import { n as Je, t as Ye } from "./libraries-CXAz_kXs.js";
import { t as Xe } from "./settings-m4upFcmH.js";
import { t as Ze } from "./hubDashboard-BhOaaDD-.js";
import { A as Qe, C as $e, D as et, E as tt, F as nt, I as rt, L as it, M as at, N as ot, O as st, P as ct, R as lt, S as ut, T as dt, _ as ft, a as pt, b as mt, c as ht, d as gt, f as _t, g as vt, h as yt, i as bt, j as xt, k as St, l as Ct, m as wt, n as Tt, o as Et, p as Dt, r as Ot, s as kt, t as At, u as jt, v as Mt, w as Nt, x as Pt, y as Ft } from "./Player-DKkVJNjx.js";
import { a as It, c as Lt, d as Rt, f as zt, g as Bt, h as Vt, i as Ht, l as Ut, m as Wt, n as Gt, o as Kt, p as qt, r as Jt, s as Yt, t as Xt, u as Zt } from "./captions-COgPp5bH.js";
import { t as Qt } from "./LoginForm-Cvva-IsM.js";
import { t as $t } from "./SignupForm-hLfofPCG.js";
import { t as en } from "./SettingsForm-BjkPTsz9.js";
import { Fragment as O, Teleport as tn, Transition as k, TransitionGroup as nn, computed as A, createApp as rn, createBlock as j, createCommentVNode as M, createElementBlock as N, createElementVNode as P, createTextVNode as F, createVNode as I, defineAsyncComponent as an, defineComponent as L, inject as on, normalizeClass as R, normalizeStyle as sn, onBeforeUnmount as z, onMounted as B, onScopeDispose as V, openBlock as H, readonly as cn, ref as U, renderList as W, renderSlot as G, resolveDynamicComponent as ln, toDisplayString as K, unref as q, useId as un, vModelText as J, watch as Y, watchEffect as dn, withCtx as X, withDirectives as fn, withKeys as pn, withModifiers as mn } from "vue";
import { createPinia as hn } from "pinia";
import { RouterLink as Z, RouterView as gn, createRouter as _n, createWebHistory as vn, useRouter as yn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var bn = ["aria-labelledby"], xn = {
	key: 0,
	class: "phlix-sheet__header"
}, Sn = ["id"], Cn = { class: "phlix-sheet__body" }, wn = {
	key: 1,
	class: "phlix-sheet__footer"
}, Tn = /*#__PURE__*/ t(/* @__PURE__ */ L({
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
		Y(() => n.modelValue, (e) => o.value = e);
		let s = U(null), c = un();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (H(), j(tn, { to: "body" }, [I(k, { name: `phlix-sheet-${e.side}` }, {
			default: X(() => [e.modelValue ? (H(), N("div", {
				key: 0,
				class: R(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: mn(u, ["self"])
			}, [P("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? q(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (H(), N("header", xn, [e.title ? (H(), N("h2", {
					key: 0,
					id: q(c),
					class: "phlix-sheet__title"
				}, K(e.title), 9, Sn)) : M("", !0), e.hideClose ? M("", !0) : (H(), j(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : M("", !0),
				P("div", Cn, [G(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (H(), N("footer", wn, [G(t.$slots, "footer", {}, void 0, !0)])) : M("", !0)
			], 8, bn)], 34)) : M("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), En = { class: "shell" }, Dn = {
	class: "shell__skip",
	href: "#main"
}, On = { class: "shell__bar" }, kn = { class: "shell__inner" }, An = { class: "shell__brand" }, jn = ["aria-label"], Mn = { class: "shell__actions" }, Nn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, Pn = {
	key: 0,
	class: "shell__footer"
}, Fn = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = U(!1), { t: o } = p();
		return (t, a) => (H(), N("div", En, [
			P("a", Dn, K(q(o)("shell.skipToContent")), 1),
			I(e, { enabled: q(n).atmosphere }, null, 8, ["enabled"]),
			P("header", On, [P("div", kn, [
				P("div", An, [G(t.$slots, "logo", {}, () => [a[3] ||= P("span", { class: "shell__wordmark" }, [F("Phlix"), P("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				P("nav", {
					class: "shell__nav",
					"aria-label": q(o)("shell.primaryNav")
				}, [G(t.$slots, "nav", {}, void 0, !0)], 8, jn),
				a[4] ||= P("span", { class: "shell__spacer" }, null, -1),
				P("div", Mn, [G(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (H(), j(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: q(o)("shell.openMenu"),
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : M("", !0)
			])]),
			P("main", Nn, [G(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (H(), N("footer", Pn, [G(t.$slots, "footer", {}, void 0, !0)])) : M("", !0),
			I(Tn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: q(o)("shell.menu")
			}, {
				default: X(() => [P("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [G(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-db48fc6e"]]), In = /* @__PURE__ */ L({
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
		return (e, t) => (H(), j(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), Ln = ["aria-label", "aria-expanded"], Rn = {
	key: 0,
	class: "usermenu__avatar"
}, zn = ["aria-label"], Bn = { class: "usermenu__head" }, Vn = { class: "usermenu__avatar usermenu__avatar--lg" }, Hn = { class: "usermenu__name" }, Un = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = yn(), a = on("phlixConfig", null), o = A(() => a?.routerBase ?? "/app"), { t: s } = p(), c = U(!1), l = U(null), u = U(null), d = A(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = A(() => d.value.charAt(0).toUpperCase() || "A");
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
		return Y(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", _, !0) : document.removeEventListener("pointerdown", _, !0));
		}), z(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", _, !0);
		}), (e, r) => (H(), N("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [P("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": q(t).isLoggedIn ? q(s)("shell.accountNamed", { name: d.value }) : q(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[0] ||= (e) => c.value = !c.value
		}, [q(t).isLoggedIn ? (H(), N("span", Rn, K(f.value), 1)) : (H(), j(n, {
			key: 1,
			name: "user"
		}))], 8, Ln), c.value ? (H(), N("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": q(s)("shell.account"),
			tabindex: "-1"
		}, [q(t).isLoggedIn ? (H(), N(O, { key: 0 }, [
			P("div", Bn, [P("span", Vn, K(f.value), 1), P("span", Hn, K(d.value), 1)]),
			P("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => h(`${o.value}/settings`)
			}, [I(n, { name: "settings" }), F(" " + K(q(s)("shell.settings")), 1)]),
			P("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: g
			}, [I(n, { name: "log-out" }), F(" " + K(q(s)("shell.signOut")), 1)])
		], 64)) : (H(), N("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => h(`${o.value}/login`)
		}, [I(n, { name: "user" }), F(" " + K(q(s)("shell.signIn")), 1)]))], 8, zn)) : M("", !0)], 512));
	}
}), [["__scopeId", "data-v-165c2e83"]]), Wn = ["aria-label"], Gn = ["src", "poster"], Kn = { class: "mini__body" }, qn = { class: "mini__title" }, Jn = { class: "mini__controls" }, Yn = ["aria-label"], Xn = ["aria-label"], Zn = ["aria-label"], Qn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, $n = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = x(), { t: a } = p(), o = U(null), s = A(() => i.miniPlayer && !!i.current && !!i.streamUrl), c = A(() => i.current?.name ?? ""), l = A(() => Math.max(0, Math.min(1, i.progress)));
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
		return Y(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), z(() => {
			o.value?.pause?.();
		}), (e, t) => (H(), j(k, { name: "mini" }, {
			default: X(() => [s.value ? (H(), N("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": q(a)("player.miniPlayer")
			}, [
				P("video", {
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
				}, null, 40, Gn),
				P("div", Kn, [P("p", qn, K(c.value), 1), P("div", Jn, [
					P("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(i).playing ? q(a)("player.pause") : q(a)("player.play"),
						onClick: h
					}, [I(n, { name: q(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Yn),
					P("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(a)("player.expand"),
						onClick: g
					}, [I(n, { name: "expand" })], 8, Xn),
					P("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": q(a)("player.closePlayer"),
						onClick: _
					}, [I(n, { name: "x" })], 8, Zn)
				])]),
				P("div", Qn, [P("div", {
					class: "mini__progress-fill",
					style: sn({ transform: `scaleX(${l.value})` })
				}, null, 4)])
			], 8, Wn)) : M("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-56cf834c"]]);
//#endregion
//#region src/composables/color.ts
function er(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Q = (e) => Math.max(0, Math.min(255, Math.round(e))), tr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Q(e).toString(16).padStart(2, "0")).join("");
function nr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function rr(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var ir = ({ r: e, g: t, b: n }, r) => `rgba(${Q(e)}, ${Q(t)}, ${Q(n)}, ${r})`;
function ar({ r: e, g: t, b: n }) {
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
function or(e) {
	let t = er(e);
	if (!t) return null;
	let n = ar(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": tr(t),
		"--accent-hover": tr(nr(t, .12)),
		"--accent-active": tr(rr(t, .12)),
		"--accent-soft": ir(t, .14),
		"--accent-ring": ir(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var sr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function cr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? or(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of sr) n.style.removeProperty(e);
}
function lr(e) {
	let t = o();
	e && !c() && (t.theme = e), cr(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function ur() {
	let e = a();
	return dn(() => {
		cr({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function dr() {
	let e = C(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), V(() => document.removeEventListener("keydown", t)));
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
function fr(e) {
	let t = $(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = $(n, t);
	return !r || t && r === t ? null : r;
}
function pr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if ($(e.href) === t) return !0;
	return !1;
}
function mr(e, t, n, r) {
	if (pr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function hr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = $(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = $(e);
		r && (n && r === n || a.has(r) || (a.add(r), mr("preconnect", r, t.crossOrigin === !0, i), mr("dns-prefetch", r, !1, i)));
	}
	i.length && V(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeSync.ts
function gr() {
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
var _r = "phlix.deviceId", vr = 15e3;
function yr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(_r);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(_r, e)), e;
	} catch {
		return "web";
	}
}
function br() {
	let e = x(), t = b(), n = yr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < vr)) {
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
	return Y(() => Math.floor(e.position), () => void s()), Y(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var xr = ["src", "alt"], Sr = { class: "brand-wordmark" }, Cr = {
	key: 1,
	class: "brand-tagline"
}, wr = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "PhlixApp",
	setup(e) {
		ur();
		let t = C(), i = yn(), { t: a } = p();
		dr();
		let o = an(() => import("./CommandPalette-BdL8G7xQ.js")), s = U(!1);
		Y(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${g.value}/player/${e}`);
		}
		let l = on("phlixConfig", null);
		hr(fr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), { syncResume: d } = gr();
		Y(() => u.isLoggedIn, (e) => {
			e && d();
		}, { immediate: !0 }), br();
		let f = A(() => l?.branding ?? {}), m = A(() => f.value.wordmark ?? "Phlix"), h = A(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), g = A(() => l?.routerBase ?? "/app"), _ = ue(), ee = A(() => h.value.some((e) => e.libraryLinks));
		Y(() => u.isLoggedIn && ee.value, (e) => {
			e && _.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function v(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (H(), j(Fn, null, {
			logo: X(() => [I(q(Z), {
				to: g.value,
				class: "brand"
			}, {
				default: X(() => [
					f.value.logoSrc ? (H(), N("img", {
						key: 0,
						src: f.value.logoSrc,
						alt: f.value.logoAlt ?? m.value,
						class: "brand-logo"
					}, null, 8, xr)) : M("", !0),
					P("span", Sr, [F(K(m.value), 1), i[1] ||= P("span", { class: "brand-dot" }, ".", -1)]),
					f.value.tagline ? (H(), N("span", Cr, K(f.value.tagline), 1)) : M("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: X(() => [h.value.length ? (H(!0), N(O, { key: 0 }, W(h.value, (e) => (H(), N(O, { key: e.id }, [(H(), j(ln(e.href ? "a" : q(Z)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? v(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: X(() => [e.icon ? (H(), j(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : M("", !0), F(" " + K(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (H(!0), N(O, null, W(e.libraryLinks ? q(_).items : [], (t) => (H(), j(q(Z), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: X(() => [F(K(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (H(), N(O, { key: 1 }, [I(q(Z), {
				to: g.value,
				class: "nav-link"
			}, {
				default: X(() => [F(K(q(a)("shell.browse")), 1)]),
				_: 1
			}, 8, ["to"]), I(q(Z), {
				to: `${g.value}/settings`,
				class: "nav-link"
			}, {
				default: X(() => [F(K(q(a)("shell.settings")), 1)]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: X(() => [
				I(r, {
					name: "search",
					label: q(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => q(t).openPalette()
				}, null, 8, ["label"]),
				I(In),
				I(Un)
			]),
			default: X(() => [
				I(q(gn)),
				s.value ? (H(), j(q(o), { key: 0 })) : M("", !0),
				I($n, { onExpand: c })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-3d8a20f5"]]), Tr = { class: "phlix-placeholder" }, Er = { class: "placeholder-content" }, Dr = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (H(), N("div", Tr, [P("div", Er, [n[0] ||= P("h1", null, "Shared UI loading...", -1), P("p", null, "Phlix " + K(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), Or = ["login", "signup"];
function kr(e, t, n = !1) {
	let r = typeof e.name == "string" ? e.name : "";
	return Or.includes(r) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? { name: "browse" } : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function Ar() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function jr(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-B9ZreS4W.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-CKB2gP14.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-DMiJ6TBc.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-ChXO0FnF.js")
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
			component: () => import("./SettingsPage-mrq71cqv.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: Dr,
		props: { appName: e.app }
	}), n;
}
function Mr(e) {
	let t = {
		...Ar(),
		...e
	};
	lr(t.defaultTheme);
	let n = hn();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = _n({
		history: vn(),
		routes: jr(t)
	});
	r.beforeEach(async (e) => {
		let t = b(n);
		return await t.init(), kr(e, t.isLoggedIn, t.isAdmin);
	});
	let i = rn(wr);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var Nr = ["id"], Pr = /*#__PURE__*/ t(/* @__PURE__ */ L({
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
		let t = e, n = un(), r = U(!1), i = U(null), a;
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
		return z(() => clearTimeout(a)), (t, a) => (H(), N("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: pn(c, ["esc"])
		}, [G(t.$slots, "default", {}, void 0, !0), I(k, { name: "phlix-tooltip" }, {
			default: X(() => [r.value && (e.text || t.$slots.content) ? (H(), N("span", {
				key: 0,
				id: q(n),
				role: "tooltip",
				class: R(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [G(t.$slots, "content", {}, () => [F(K(e.text), 1)], !0)], 10, Nr)) : M("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Fr = ["aria-label"], Ir = ["role"], Lr = { class: "phlix-toast__content" }, Rr = {
	key: 0,
	class: "phlix-toast__title"
}, zr = { class: "phlix-toast__message" }, Br = ["onClick"], Vr = 0, Hr = /*#__PURE__*/ t(/* @__PURE__ */ L({
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
			Vr++;
		}), z(() => {
			Vr--;
		}), (a, s) => (H(), j(tn, { to: "body" }, [P("div", {
			class: R(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": q(t)("common.notifications")
		}, [I(nn, { name: "phlix-toast" }, {
			default: X(() => [(H(!0), N(O, null, W(q(i).toasts, (e) => (H(), N("div", {
				key: e.id,
				class: R(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				I(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				P("div", Lr, [e.title ? (H(), N("p", Rr, K(e.title), 1)) : M("", !0), P("p", zr, K(e.message), 1)]),
				e.action ? (H(), N("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), q(i).dismiss(e.id);
					}
				}, K(e.action.label), 9, Br)) : M("", !0),
				I(r, {
					name: "x",
					label: q(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => q(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, Ir))), 128))]),
			_: 1
		})], 10, Fr)]));
	}
}), [["__scopeId", "data-v-72598ec1"]]), Ur = /*#__PURE__*/ t(/* @__PURE__ */ L({
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
		}), (t, a) => (H(), j(ln(e.tag), {
			ref_key: "el",
			ref: n,
			class: R(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: sn({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: X(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Wr = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (H(), j(k, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: X(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Gr = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-BW1zph2h.js")
}, Kr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage--1t1oQzc.js")
}, qr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-Bc11Dp30.js")
}, Jr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-CAwm54tq.js")
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
	component: () => import("./IntegrationsPage-BTFWDual.js")
}, Zr = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-CJQ77lug.js")
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
	component: () => import("./RemoteAccessPage-B1EClstZ.js")
}, ti = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-Vw3HHtsi.js")
}, ni = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-Bjx3aYrd.js")
}, ri = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-CZnjxg7j.js")
}, ii = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-9c3yzrXp.js")
}, ai = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-DZ5opjJN.js")
}, oi = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-CvuwVLyM.js")
}, si = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-B8S33QFr.js")
}, ci = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-Qw6MAJfw.js")
}, li = [
	Kr,
	qr,
	oi
], ui = [
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
	ri,
	ii,
	ai
], di = [si, ci], fi = [
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
	ai,
	oi
], pi = [
	si,
	...li,
	ci
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
//#region src/pages/LibraryScanPage.vue?vue&type=script&setup=true&lang.ts
var vi = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, yi = {
	key: 0,
	class: "library-scan__skel"
}, bi = {
	key: 3,
	class: "library-scan__table-wrap"
}, xi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Si = { class: "library-scan__name" }, Ci = {
	key: 0,
	class: "library-scan__paths"
}, wi = { class: "library-scan__num" }, Ti = { class: "library-scan__date" }, Ei = ["data-testid"], Di = {
	key: 0,
	class: "library-scan__error"
}, Oi = { class: "library-scan__actions" }, ki = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = T(), r = U([]), i = U({}), a = U(!0), o = U(null);
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
		return B(s), (e, t) => (H(), N("section", vi, [t[4] ||= P("header", { class: "library-scan__head" }, [P("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), P("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (H(), N("div", yi, [I(E, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: X(() => [I(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: X(() => [...t[0] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), j(D, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (H(), N("div", bi, [P("table", xi, [t[3] ||= P("thead", null, [P("tr", null, [
			P("th", { scope: "col" }, "Library"),
			P("th", { scope: "col" }, "Type"),
			P("th", { scope: "col" }, "Items"),
			P("th", { scope: "col" }, "Last scan"),
			P("th", { scope: "col" }, "Status"),
			P("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), P("tbody", null, [(H(!0), N(O, null, W(r.value, (e) => (H(), N("tr", { key: e.id }, [
			P("td", null, [P("div", Si, K(e.name), 1), e.paths.length ? (H(), N("div", Ci, K(e.paths.join(", ")), 1)) : M("", !0)]),
			P("td", null, K(e.type), 1),
			P("td", wi, K(e.item_count === void 0 ? "—" : e.item_count), 1),
			P("td", Ti, K(d(e.last_scan_at)), 1),
			P("td", null, [P("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [I(w, { tone: m(i.value[e.id]) }, {
				default: X(() => [F(K(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (H(), N("span", Di, K(i.value[e.id]?.error), 1)) : M("", !0)], 8, Ei)]),
			P("td", null, [P("div", Oi, [I(y, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: X(() => [...t[1] ||= [F(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), I(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: X(() => [...t[2] ||= [F(" Rescan ", -1)]]),
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
function Ai(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var ji = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Mi = { class: "my-servers__head" }, Ni = {
	key: 0,
	class: "my-servers__skel"
}, Pi = {
	key: 3,
	class: "my-servers__table-wrap"
}, Fi = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Ii = { class: "my-servers__name" }, Li = { class: "my-servers__url" }, Ri = { class: "my-servers__num" }, zi = { class: "my-servers__date" }, Bi = ["data-testid"], Vi = { class: "my-servers__actions" }, Hi = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = T(), r = b(), i = U([]), a = U(!0), o = U(null);
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
					last_seen: Ai(e.lastSeenAt)
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
		return B(s), (e, t) => (H(), N("section", ji, [P("header", Mi, [t[1] ||= P("div", null, [P("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), P("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), I(y, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: X(() => [...t[0] ||= [F("Add server", -1)]]),
			_: 1
		})]), a.value ? (H(), N("div", Ni, [I(E, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: o.value
		}, {
			actions: X(() => [I(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: X(() => [...t[2] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : i.value.length === 0 ? (H(), j(D, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: X(() => [I(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: X(() => [...t[3] ||= [F("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (H(), N("div", Pi, [P("table", Fi, [t[5] ||= P("thead", null, [P("tr", null, [
			P("th", { scope: "col" }, "Server"),
			P("th", { scope: "col" }, "Owner"),
			P("th", { scope: "col" }, "Libraries"),
			P("th", { scope: "col" }, "Last seen"),
			P("th", { scope: "col" }, "Status"),
			P("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), P("tbody", null, [(H(!0), N(O, null, W(i.value, (e) => (H(), N("tr", { key: e.id }, [
			P("td", null, [P("div", Ii, K(e.name), 1), P("div", Li, K(e.url), 1)]),
			P("td", null, K(e.owner), 1),
			P("td", Ri, K(e.library_count === void 0 ? "—" : e.library_count), 1),
			P("td", zi, K(c(e.last_seen)), 1),
			P("td", null, [P("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [I(w, { tone: u(e.status) }, {
				default: X(() => [F(K(l(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Bi)]),
			P("td", null, [P("div", Vi, [I(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: X(() => [...t[4] ||= [F("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-52f86230"]]), Ui = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, Wi = {
	key: 0,
	class: "federation__skel"
}, Gi = {
	key: 2,
	class: "federation__content"
}, Ki = {
	key: 1,
	class: "federation__table-wrap"
}, qi = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, Ji = { class: "federation__name" }, Yi = { class: "federation__url" }, Xi = { class: "federation__num" }, Zi = { class: "federation__date" }, Qi = ["data-testid"], $i = { class: "federation__actions" }, ea = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, ta = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = T(), r = U([]), i = U(!0), a = U(null), o = U(""), s = U(""), c = U(""), l = U(!1);
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
		return B(() => u(!0)), (e, t) => (H(), N("section", Ui, [t[10] ||= P("header", { class: "federation__head" }, [P("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), P("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (H(), N("div", Wi, [I(E, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: X(() => [I(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: X(() => [...t[4] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (H(), N("div", Gi, [
			t[9] ||= P("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (H(), j(D, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (H(), N("div", Ki, [P("table", qi, [t[6] ||= P("thead", null, [P("tr", null, [
				P("th", { scope: "col" }, "Peer"),
				P("th", { scope: "col" }, "Shared libraries"),
				P("th", { scope: "col" }, "Last sync"),
				P("th", { scope: "col" }, "Status"),
				P("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), P("tbody", null, [(H(!0), N(O, null, W(r.value, (e) => (H(), N("tr", { key: e.id }, [
				P("td", null, [P("div", Ji, K(e.name), 1), P("div", Yi, K(e.url), 1)]),
				P("td", Xi, K(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				P("td", Zi, K(p(e.last_sync)), 1),
				P("td", null, [P("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [I(w, { tone: g(e.status) }, {
					default: X(() => [F(K(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, Qi)]),
				P("td", null, [P("div", $i, [I(y, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: X(() => [...t[5] ||= [F(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			P("section", ea, [t[8] ||= P("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), P("form", {
				class: "federation__form",
				onSubmit: mn(d, ["prevent"])
			}, [
				fn(P("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[J, s.value]]),
				fn(P("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[J, o.value]]),
				fn(P("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[J, c.value]]),
				I(y, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: X(() => [...t[7] ||= [F(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-1e05d4ae"]]), na = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, ra = {
	key: 0,
	class: "shares__skel"
}, ia = {
	key: 3,
	class: "shares__table-wrap"
}, aa = {
	class: "shares__table",
	"aria-label": "Library shares"
}, oa = { class: "shares__library" }, sa = { class: "shares__date" }, ca = { class: "shares__date" }, la = ["data-testid"], ua = { class: "shares__actions" }, da = /*#__PURE__*/ t(/* @__PURE__ */ L({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? v, n = T(), r = U([]), i = U(!0), a = U(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Ai(e.created_at) ?? "",
					expires_at: Ai(e.expires_at)
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
		return B(() => o(!0)), (e, t) => (H(), N("section", na, [t[5] ||= P("header", { class: "shares__head" }, [P("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), P("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (H(), N("div", ra, [I(E, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), j(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: X(() => [I(y, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: X(() => [...t[1] ||= [F("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), j(D, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (H(), N("div", ia, [P("table", aa, [t[4] ||= P("thead", null, [P("tr", null, [
			P("th", { scope: "col" }, "Library"),
			P("th", { scope: "col" }, "Shared with"),
			P("th", { scope: "col" }, "Permissions"),
			P("th", { scope: "col" }, "Created"),
			P("th", { scope: "col" }, "Expires"),
			P("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), P("tbody", null, [(H(!0), N(O, null, W(r.value, (e) => (H(), N("tr", { key: e.id }, [
			P("td", null, [P("span", oa, K(e.library_name), 1)]),
			P("td", null, K(e.shared_with), 1),
			P("td", null, [I(w, { tone: u(e.permissions) }, {
				default: X(() => [F(K(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			P("td", sa, K(c(e.created_at)), 1),
			P("td", ca, [P("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [F(K(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (H(), j(w, {
				key: 0,
				tone: "error"
			}, {
				default: X(() => [...t[2] ||= [F("Expired", -1)]]),
				_: 1
			})) : M("", !0)], 8, la)]),
			P("td", null, [P("div", ua, [I(y, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: X(() => [...t[3] ||= [F(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-32224e10"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function fa(e, t) {
	let n = ge(), r = !1;
	n.setLibraryId(void 0), n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = Y(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = Y(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/useOnline.ts
function pa() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = U(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), V(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), cn(t);
}
//#endregion
export { Ae as ALL_LOGS, vt as AMBIENT_SAMPLE_H, ft as AMBIENT_SAMPLE_INTERVAL_MS, Mt as AMBIENT_SAMPLE_W, xt as ARROW_ICONS, at as ARROW_LABELS, Be as AdminBackupApi, Ve as AdminCastApi, Ge as AdminCollectionsApi, je as AdminDashboardApi, He as AdminDlnaServerApi, Ke as AdminHistoryApi, Ze as AdminHubDashboardApi, ze as AdminIntegrationsApi, Ye as AdminLibrariesApi, We as AdminLiveTvApi, ke as AdminLogsApi, Ue as AdminRemoteAccessApi, Re as AdminServicesApi, Xe as AdminSettingsApi, qe as AdminSyncPlayApi, Pe as AdminUsersApi, Le as AdminWebhooksApi, yt as AmbientCanvas, _ as ApiClient, m as ApiError, e as AppBackdrop, Fn as AppLayout, w as Badge, y as Button, Xt as CAPTION_BACKGROUND_OPTIONS, Gt as CAPTION_COLOR_OPTIONS, Jt as CAPTION_EDGE_OPTIONS, Ht as CAPTION_SIZE_OPTIONS, It as CAPTION_SIZE_SCALE, tt as CaptionOverlay, dt as CaptionsMenu, pe as Chip, he as Combobox, l as DEFAULT_CAPTION_STYLE, d as DEFAULT_MESSAGES, s as DEFAULT_PREFERENCES, pt as DIRECT_PLAY_EXTENSIONS, D as EmptyState, ta as FederationPage, ve as FilterBar, n as Icon, r as IconButton, se as Kbd, Je as LIBRARY_TYPES, ki as LibraryScanPage, ne as LocalStorageTokenStore, Qt as LoginForm, da as ManageSharesPage, we as MediaCard, Oe as MediaDetail, _e as MediaGrid, De as MediaHomeRow, xe as MediaRow, $n as MiniPlayer, ye as Modal, Hi as MyServersPage, ee as NetworkError, ot as PLAYER_SHORTCUTS, Wr as PageTransition, wr as PhlixApp, At as Player, et as QualityMenu, Me as RATING_LABELS, Ne as RATING_OPTIONS, ie as RESUME_MAX_RATIO, re as RESUME_MIN_SECONDS, wt as ResumePrompt, Ur as Reveal, Fe as SUBSCRIBABLE_EVENTS, it as Scrubber, me as Select, en as SettingsForm, Tn as Sheet, Qe as ShortcutsHelp, $t as SignupForm, E as Skeleton, Tt as SkipButton, de as Slider, st as SpeedMenu, be as Spinner, fe as Switch, Et as TRANSCODE_EXTENSIONS, Se as Tabs, te as TimeoutError, Hr as ToastHost, Pr as Tooltip, Ot as TranscodeNotice, kt as UPNEXT_COUNTDOWN_SECONDS, ht as UPNEXT_RING_CIRCUMFERENCE, Ct as UPNEXT_RING_RADIUS, bt as UpNext, St as VolumeControl, Ie as WEBHOOK_EVENT_CATEGORIES, Kt as activeAudioIndex, _i as adminMenu, Ft as ambientGradient, Yt as applyAudioTrack, lr as applyStoredThemeEarly, Lt as applyTrackModes, mt as averageRegion, fa as bindMediaStoreToRouter, mi as buildAdminRoutes, gi as buildHubAdminRoutes, Ee as buildMediaQuery, Te as buildMediaUrl, hi as buildServerAdminRoutes, Ut as captionStyleVars, Zt as cleanCueText, li as commonAdminPages, Mr as createPhlixApp, f as createTranslator, or as deriveAccentVars, Rt as edgeShadow, h as errMessage, jt as extensionOf, ce as fetchLibraries, lt as formatTime, ae as fuzzyScore, ct as handleShortcut, zt as hasActiveCaptions, c as hasStoredPreferences, di as hubAdminPages, Pt as isBatterySaving, gt as isFatalMediaError, g as isOffline, nt as isTypingTarget, qt as listAudioTracks, Wt as listSubtitleTracks, oe as matchCommand, u as mergeMessages, _t as needsTranscode, Vt as readActiveCueLines, o as readStoredPreferences, Bt as resolveTextTrack, ut as rgbString, $e as rgbaString, Dt as ringDashoffset, Nt as sampleAmbient, ui as serverAdminPages, le as sortLibraries, b as useAuthStore, dr as useCommandPaletteHotkey, C as useCommandStore, i as useFocusTrap, rt as useKeyboardShortcuts, ue as useLibrariesStore, ge as useMediaStore, p as useMessages, pa as useOnline, x as usePlayerStore, hr as usePreconnect, a as usePreferencesStore, Ce as usePrefetch, br as useResumeReporter, gr as useResumeSync, ur as useTheme, T as useToastStore };

//# sourceMappingURL=phlix-ui.js.map