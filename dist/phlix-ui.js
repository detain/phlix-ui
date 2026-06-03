import { r as e } from "./AuthField-OP0_HNX2.js";
import { n as t, t as n } from "./Icon-ax5k7_G2.js";
import { t as r } from "./IconButton-BTz1ebOc.js";
import { t as i } from "./useFocusTrap-0JaLH3tF.js";
import { a, i as o, n as s, r as c, t as l } from "./usePreferencesStore-BFFMWKZp.js";
import { a as u, c as d, l as f, n as p, o as m, r as h, s as g, t as _ } from "./Button-GJ9vHE0J.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as te } from "./useAuthStore-qz0h59p0.js";
import { a as v, i as ne, n as re, r as ie, t as ae } from "./media-query-DowsWq-z.js";
import { i as y, n as oe, r as se, t as ce } from "./Kbd-CSMm1T0l.js";
import { t as b } from "./Badge-ArWL5-WE.js";
import { t as le } from "./Slider-BMn_Lp_q.js";
import { t as ue } from "./Switch-CFZhdkXR.js";
import { n as de, r as fe, t as pe } from "./MediaRow-CQOxRkOG.js";
import { t as me } from "./Select-CKC9vNUQ.js";
import { a as he, i as ge, n as x, r as _e, t as ve } from "./FilterBar-jhghAUXU.js";
import { t as ye } from "./Modal-BB_vB1RK.js";
import { t as S } from "./useToastStore-BDoKlU6N.js";
import { n as C, t as w } from "./EmptyState-Ds4WcVdG.js";
import { n as be, t as xe } from "./SettingsForm-DPNOGeW5.js";
import { t as Se } from "./MediaDetail-DO0AsuaO.js";
import { n as Ce, t as we } from "./logs-DadTfaTq.js";
import { t as Te } from "./dashboard-BTCOCTHQ.js";
import { n as Ee, r as De, t as Oe } from "./users-C40iLgkq.js";
import { n as ke, r as Ae, t as je } from "./webhooks-BBTLnFKm.js";
import { t as Me } from "./services-Czm8hsvH.js";
import { t as Ne } from "./integrations-DLAG9ISY.js";
import { t as Pe } from "./backup-IdY_vzc2.js";
import { t as Fe } from "./cast-BvFcBEB6.js";
import { t as Ie } from "./dlnaServer-B5Sg4MkS.js";
import { t as Le } from "./remoteAccess-DVKRpKQ8.js";
import { t as Re } from "./liveTv-Dbjt901v.js";
import { t as ze } from "./collections-CH3HLdcd.js";
import { t as Be } from "./history-ByCY8OYj.js";
import { t as Ve } from "./syncPlay-DPzJkgkK.js";
import { n as He, t as Ue } from "./libraries-CXAz_kXs.js";
import { t as We } from "./settings-m4upFcmH.js";
import { A as Ge, C as Ke, D as qe, E as Je, F as Ye, I as Xe, L as Ze, M as Qe, N as $e, O as et, P as tt, S as nt, T as rt, _ as it, a as at, b as ot, c as st, d as ct, f as lt, g as ut, h as dt, i as ft, j as pt, k as mt, l as ht, m as gt, n as _t, o as vt, p as yt, r as bt, s as xt, t as St, u as Ct, v as wt, w as Tt, x as Et, y as Dt } from "./Player-BN_TEDvB.js";
import { a as Ot, c as kt, d as At, f as jt, g as Mt, h as Nt, i as Pt, l as Ft, m as It, n as Lt, o as Rt, p as zt, r as Bt, s as Vt, t as Ht, u as Ut } from "./captions-COgPp5bH.js";
import { t as Wt } from "./LoginForm-391wMbHl.js";
import { t as Gt } from "./SignupForm-Djo0Oqq9.js";
import { Fragment as T, Teleport as E, Transition as D, TransitionGroup as Kt, computed as O, createApp as qt, createBlock as k, createCommentVNode as A, createElementBlock as j, createElementVNode as M, createTextVNode as N, createVNode as P, defineAsyncComponent as Jt, defineComponent as F, inject as I, normalizeClass as L, normalizeStyle as R, onBeforeUnmount as z, onMounted as B, onScopeDispose as V, openBlock as H, readonly as Yt, ref as U, renderList as W, renderSlot as G, resolveDynamicComponent as K, toDisplayString as q, unref as J, useId as Xt, vModelText as Zt, watch as Y, watchEffect as Qt, withCtx as X, withDirectives as $t, withKeys as en, withModifiers as tn } from "vue";
import { createPinia as nn } from "pinia";
import { RouterLink as Z, RouterView as rn, createRouter as an, createWebHistory as on, useRouter as sn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var cn = ["aria-labelledby"], ln = {
	key: 0,
	class: "phlix-sheet__header"
}, un = ["id"], dn = { class: "phlix-sheet__body" }, fn = {
	key: 1,
	class: "phlix-sheet__footer"
}, pn = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let s = U(null), c = Xt();
		function l() {
			a("update:modelValue", !1), a("close");
		}
		function u() {
			n.dismissible && l();
		}
		return i(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (H(), k(E, { to: "body" }, [P(D, { name: `phlix-sheet-${e.side}` }, {
			default: X(() => [e.modelValue ? (H(), j("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: tn(u, ["self"])
			}, [M("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? J(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (H(), j("header", ln, [e.title ? (H(), j("h2", {
					key: 0,
					id: J(c),
					class: "phlix-sheet__title"
				}, q(e.title), 9, un)) : A("", !0), e.hideClose ? A("", !0) : (H(), k(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : A("", !0),
				M("div", dn, [G(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (H(), j("footer", fn, [G(t.$slots, "footer", {}, void 0, !0)])) : A("", !0)
			], 8, cn)], 34)) : A("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), mn = { class: "shell" }, hn = { class: "shell__bar" }, gn = { class: "shell__inner" }, _n = { class: "shell__brand" }, vn = {
	class: "shell__nav",
	"aria-label": "Primary"
}, yn = { class: "shell__actions" }, bn = { class: "shell__main" }, xn = {
	key: 0,
	class: "shell__footer"
}, Sn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AppLayout",
	setup(t) {
		let n = a(), i = U(!1);
		return (t, a) => (H(), j("div", mn, [
			P(e, { enabled: J(n).atmosphere }, null, 8, ["enabled"]),
			M("header", hn, [M("div", gn, [
				M("div", _n, [G(t.$slots, "logo", {}, () => [a[3] ||= M("span", { class: "shell__wordmark" }, [N("Phlix"), M("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				M("nav", vn, [G(t.$slots, "nav", {}, void 0, !0)]),
				a[4] ||= M("span", { class: "shell__spacer" }, null, -1),
				M("div", yn, [G(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (H(), k(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: "Open navigation menu",
					variant: "ghost",
					onClick: a[0] ||= (e) => i.value = !0
				})) : A("", !0)
			])]),
			M("main", bn, [G(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (H(), j("footer", xn, [G(t.$slots, "footer", {}, void 0, !0)])) : A("", !0),
			P(pn, {
				modelValue: i.value,
				"onUpdate:modelValue": a[2] ||= (e) => i.value = e,
				side: "left",
				title: "Menu"
			}, {
				default: X(() => [M("nav", {
					class: "shell__drawer",
					onClick: a[1] ||= (e) => i.value = !1
				}, [G(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-007c323a"]]), Cn = /* @__PURE__ */ F({
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
		}, s = O(() => n[(n.indexOf(t.theme) + 1) % n.length]), c = O(() => i[t.theme] ?? "moon"), l = O(() => `Theme: ${o[t.theme] ?? t.theme} (switch to ${o[s.value]})`);
		function u() {
			t.theme = s.value;
		}
		return (e, t) => (H(), k(r, {
			name: c.value,
			label: l.value,
			variant: "ghost",
			onClick: u
		}, null, 8, ["name", "label"]));
	}
}), wn = ["aria-label", "aria-expanded"], Tn = {
	key: 0,
	class: "usermenu__avatar"
}, En = { class: "usermenu__head" }, Dn = { class: "usermenu__avatar usermenu__avatar--lg" }, On = { class: "usermenu__name" }, kn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "UserMenu",
	setup(e) {
		let t = te(), r = sn(), a = I("phlixConfig", null), o = O(() => a?.routerBase ?? "/app"), s = U(!1), c = U(null), l = U(null), u = O(() => t.user?.username || t.user?.name || t.user?.email || "Account"), d = O(() => u.value.charAt(0).toUpperCase() || "A");
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
		return Y(s, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", h, !0) : document.removeEventListener("pointerdown", h, !0));
		}), z(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", h, !0);
		}), (e, r) => (H(), j("div", {
			ref_key: "rootEl",
			ref: c,
			class: "usermenu"
		}, [M("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": J(t).isLoggedIn ? `Account: ${u.value}` : "Account",
			"aria-haspopup": "menu",
			"aria-expanded": s.value,
			onClick: r[0] ||= (e) => s.value = !s.value
		}, [J(t).isLoggedIn ? (H(), j("span", Tn, q(d.value), 1)) : (H(), k(n, {
			key: 1,
			name: "user"
		}))], 8, wn), s.value ? (H(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: l,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": "Account",
			tabindex: "-1"
		}, [J(t).isLoggedIn ? (H(), j(T, { key: 0 }, [
			M("div", En, [M("span", Dn, q(d.value), 1), M("span", On, q(u.value), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[1] ||= (e) => p(`${o.value}/settings`)
			}, [P(n, { name: "settings" }), r[3] ||= N(" Settings ", -1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: m
			}, [P(n, { name: "log-out" }), r[4] ||= N(" Sign out ", -1)])
		], 64)) : (H(), j("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[2] ||= (e) => p(`${o.value}/login`)
		}, [P(n, { name: "user" }), r[5] ||= N(" Sign in ", -1)]))], 512)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-5da5ea3f"]]), An = {
	key: 0,
	class: "mini",
	role: "region",
	"aria-label": "Mini player"
}, jn = ["src", "poster"], Mn = { class: "mini__body" }, Nn = { class: "mini__title" }, Pn = { class: "mini__controls" }, Fn = ["aria-label"], In = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Ln = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = v(), a = U(null), o = O(() => i.miniPlayer && !!i.current && !!i.streamUrl), s = O(() => i.current?.name ?? ""), c = O(() => Math.max(0, Math.min(1, i.progress)));
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
		return Y(() => i.playing, (e) => {
			let t = a.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), z(() => {
			a.value?.pause?.();
		}), (e, t) => (H(), k(D, { name: "mini" }, {
			default: X(() => [o.value ? (H(), j("div", An, [
				M("video", {
					ref_key: "videoRef",
					ref: a,
					class: "mini__video",
					src: J(i).streamUrl,
					poster: J(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: l,
					onPlay: u,
					onPause: d,
					onTimeupdate: f,
					onClick: m
				}, null, 40, jn),
				M("div", Mn, [M("p", Nn, q(s.value), 1), M("div", Pn, [
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": J(i).playing ? "Pause" : "Play",
						onClick: p
					}, [P(n, { name: J(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Fn),
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": "Expand to full player",
						onClick: m
					}, [P(n, { name: "expand" })]),
					M("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": "Close player",
						onClick: h
					}, [P(n, { name: "x" })])
				])]),
				M("div", In, [M("div", {
					class: "mini__progress-fill",
					style: R({ transform: `scaleX(${c.value})` })
				}, null, 4)])
			])) : A("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c013af7d"]]);
//#endregion
//#region src/composables/color.ts
function Rn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Q = (e) => Math.max(0, Math.min(255, Math.round(e))), $ = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Q(e).toString(16).padStart(2, "0")).join("");
function zn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Bn(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Vn = ({ r: e, g: t, b: n }, r) => `rgba(${Q(e)}, ${Q(t)}, ${Q(n)}, ${r})`;
function Hn({ r: e, g: t, b: n }) {
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
function Un(e) {
	let t = Rn(e);
	if (!t) return null;
	let n = Hn(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": $(t),
		"--accent-hover": $(zn(t, .12)),
		"--accent-active": $(Bn(t, .12)),
		"--accent-soft": Vn(t, .14),
		"--accent-ring": Vn(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Wn = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Gn(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Un(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Wn) n.style.removeProperty(e);
}
function Kn(e) {
	let t = o();
	e && !c() && (t.theme = e), Gn(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function qn() {
	let e = a();
	return Qt(() => {
		Gn({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function Jn() {
	let e = y(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), V(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var Yn = ["src", "alt"], Xn = { class: "brand-wordmark" }, Zn = {
	key: 1,
	class: "brand-tagline"
}, Qn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PhlixApp",
	setup(e) {
		qn();
		let t = y(), i = sn();
		Jn();
		let a = Jt(() => import("./CommandPalette-CMJInqvo.js")), o = U(!1);
		Y(() => t.open, (e) => {
			e && (o.value = !0);
		});
		function s(e) {
			i.push(`${f.value}/player/${e}`);
		}
		let c = I("phlixConfig", null), l = O(() => c?.branding ?? {}), u = O(() => l.value.wordmark ?? "Phlix"), d = O(() => c?.menu ?? []), f = O(() => c?.routerBase ?? "/app");
		function p(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (H(), k(Sn, null, {
			logo: X(() => [P(J(Z), {
				to: f.value,
				class: "brand"
			}, {
				default: X(() => [
					l.value.logoSrc ? (H(), j("img", {
						key: 0,
						src: l.value.logoSrc,
						alt: l.value.logoAlt ?? u.value,
						class: "brand-logo"
					}, null, 8, Yn)) : A("", !0),
					M("span", Xn, [N(q(u.value), 1), i[1] ||= M("span", { class: "brand-dot" }, ".", -1)]),
					l.value.tagline ? (H(), j("span", Zn, q(l.value.tagline), 1)) : A("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: X(() => [d.value.length ? (H(!0), j(T, { key: 0 }, W(d.value, (e) => (H(), k(K(e.href ? "a" : J(Z)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? p(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: X(() => [e.icon ? (H(), k(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : A("", !0), N(" " + q(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (H(), j(T, { key: 1 }, [P(J(Z), {
				to: f.value,
				class: "nav-link"
			}, {
				default: X(() => [...i[2] ||= [N("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), P(J(Z), {
				to: `${f.value}/settings`,
				class: "nav-link"
			}, {
				default: X(() => [...i[3] ||= [N("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64))]),
			actions: X(() => [
				P(r, {
					name: "search",
					label: "Open command palette (⌘K)",
					variant: "ghost",
					onClick: i[0] ||= (e) => J(t).openPalette()
				}),
				P(Cn),
				P(kn)
			]),
			default: X(() => [
				P(J(rn)),
				o.value ? (H(), k(J(a), { key: 0 })) : A("", !0),
				P(Ln, { onExpand: s })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-4706bb25"]]), $n = { class: "phlix-placeholder" }, er = { class: "placeholder-content" }, tr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (H(), j("div", $n, [M("div", er, [n[0] ||= M("h1", null, "Shared UI loading...", -1), M("p", null, "Phlix " + q(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function nr() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function rr(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: () => import("./BrowsePage-DNI1n9I1.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-Dh7sJV4Y.js")
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
		component: tr,
		props: { appName: e.app }
	}), n;
}
function ir(e) {
	let t = {
		...nr(),
		...e
	};
	Kn(t.defaultTheme);
	let n = nn();
	t.defaultTheme && !c() && (a(n).theme = t.defaultTheme);
	let r = an({
		history: on(t.routerBase || "/app"),
		routes: rr(t)
	}), i = qt(Qn);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Tooltip.vue?vue&type=script&setup=true&lang.ts
var ar = ["id"], or = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let t = e, n = Xt(), r = U(!1), i = U(null), a;
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
		return z(() => clearTimeout(a)), (t, a) => (H(), j("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: en(c, ["esc"])
		}, [G(t.$slots, "default", {}, void 0, !0), P(D, { name: "phlix-tooltip" }, {
			default: X(() => [r.value && (e.text || t.$slots.content) ? (H(), j("span", {
				key: 0,
				id: J(n),
				role: "tooltip",
				class: L(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [G(t.$slots, "content", {}, () => [N(q(e.text), 1)], !0)], 10, ar)) : A("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), sr = ["role"], cr = { class: "phlix-toast__content" }, lr = {
	key: 0,
	class: "phlix-toast__title"
}, ur = { class: "phlix-toast__message" }, dr = ["onClick"], fr = 0, pr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let t = S(), i = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, a = (e) => e.icon ?? i[e.tone];
		return B(() => {
			fr++;
		}), z(() => {
			fr--;
		}), (i, o) => (H(), k(E, { to: "body" }, [M("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [P(Kt, { name: "phlix-toast" }, {
			default: X(() => [(H(!0), j(T, null, W(J(t).toasts, (e) => (H(), j("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				P(n, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				M("div", cr, [e.title ? (H(), j("p", lr, q(e.title), 1)) : A("", !0), M("p", ur, q(e.message), 1)]),
				e.action ? (H(), j("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (n) => {
						e.action.onClick(), J(t).dismiss(e.id);
					}
				}, q(e.action.label), 9, dr)) : A("", !0),
				P(r, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (n) => J(t).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, sr))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), mr = ["aria-label"], hr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, r = O(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, i) => (H(), j("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: R(r.value ? { fontSize: r.value } : void 0)
		}, [P(n, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, mr));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), gr = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		}), (t, a) => (H(), k(K(e.tag), {
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
			default: X(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), _r = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (H(), k(D, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: X(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]);
//#endregion
//#region src/app/admin.ts
function vr(e = "/app") {
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
function yr(e = "/app") {
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
var br = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, xr = {
	key: 0,
	class: "library-scan__skel"
}, Sr = {
	key: 3,
	class: "library-scan__table-wrap"
}, Cr = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, wr = { class: "library-scan__name" }, Tr = {
	key: 0,
	class: "library-scan__paths"
}, Er = { class: "library-scan__num" }, Dr = { class: "library-scan__date" }, Or = ["data-testid"], kr = {
	key: 0,
	class: "library-scan__error"
}, Ar = { class: "library-scan__actions" }, jr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = S(), r = U([]), i = U({}), a = U(!0), o = U(null);
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
		return B(s), (e, t) => (H(), j("section", br, [t[4] ||= M("header", { class: "library-scan__head" }, [M("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), M("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (H(), j("div", xr, [P(C, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), k(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: X(() => [P(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: X(() => [...t[0] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), k(w, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (H(), j("div", Sr, [M("table", Cr, [t[3] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Type"),
			M("th", { scope: "col" }, "Items"),
			M("th", { scope: "col" }, "Last scan"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(H(!0), j(T, null, W(r.value, (e) => (H(), j("tr", { key: e.id }, [
			M("td", null, [M("div", wr, q(e.name), 1), e.paths.length ? (H(), j("div", Tr, q(e.paths.join(", ")), 1)) : A("", !0)]),
			M("td", null, q(e.type), 1),
			M("td", Er, q(e.item_count === void 0 ? "—" : e.item_count), 1),
			M("td", Dr, q(f(e.last_scan_at)), 1),
			M("td", null, [M("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [P(b, { tone: g(i.value[e.id]) }, {
				default: X(() => [N(q(m(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (H(), j("span", kr, q(i.value[e.id]?.error), 1)) : A("", !0)], 8, Or)]),
			M("td", null, [M("div", Ar, [P(_, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: p(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: X(() => [...t[1] ||= [N(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), P(_, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: p(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: X(() => [...t[2] ||= [N(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-3235ff5e"]]), Mr = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Nr = { class: "my-servers__head" }, Pr = {
	key: 0,
	class: "my-servers__skel"
}, Fr = {
	key: 3,
	class: "my-servers__table-wrap"
}, Ir = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Lr = { class: "my-servers__name" }, Rr = { class: "my-servers__url" }, zr = { class: "my-servers__num" }, Br = { class: "my-servers__date" }, Vr = ["data-testid"], Hr = { class: "my-servers__actions" }, Ur = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = S(), r = U([]), i = U(!0), a = U(null);
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
		return B(o), (e, t) => (H(), j("section", Mr, [M("header", Nr, [t[1] ||= M("div", null, [M("h1", {
			id: "my-servers-heading",
			class: "my-servers__title"
		}, "My Servers"), M("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), P(_, {
			variant: "solid",
			size: "sm",
			"left-icon": "plus"
		}, {
			default: X(() => [...t[0] ||= [N("Add server", -1)]]),
			_: 1
		})]), i.value ? (H(), j("div", Pr, [P(C, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), k(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load servers",
			description: a.value
		}, {
			actions: X(() => [P(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: o
			}, {
				default: X(() => [...t[2] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), k(w, {
			key: 2,
			icon: "tv",
			title: "No servers connected yet",
			description: "Connect a media server to start streaming."
		}, {
			actions: X(() => [P(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus"
			}, {
				default: X(() => [...t[3] ||= [N("Add server", -1)]]),
				_: 1
			})]),
			_: 1
		})) : (H(), j("div", Fr, [M("table", Ir, [t[5] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Server"),
			M("th", { scope: "col" }, "Owner"),
			M("th", { scope: "col" }, "Libraries"),
			M("th", { scope: "col" }, "Last seen"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "my-servers__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(H(!0), j(T, null, W(r.value, (e) => (H(), j("tr", { key: e.id }, [
			M("td", null, [M("div", Lr, q(e.name), 1), M("div", Rr, q(e.url), 1)]),
			M("td", null, q(e.owner), 1),
			M("td", zr, q(e.library_count === void 0 ? "—" : e.library_count), 1),
			M("td", Br, q(s(e.last_seen)), 1),
			M("td", null, [M("span", {
				class: "my-servers__status",
				"data-testid": `status-${e.id}`
			}, [P(b, { tone: l(e.status) }, {
				default: X(() => [N(q(c(e.status)), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, Vr)]),
			M("td", null, [M("div", Hr, [P(_, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Manage ${e.name}`
			}, {
				default: X(() => [...t[4] ||= [N("Manage", -1)]]),
				_: 1
			}, 8, ["aria-label"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8bce09a9"]]), Wr = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, Gr = {
	key: 0,
	class: "federation__skel"
}, Kr = {
	key: 2,
	class: "federation__content"
}, qr = {
	key: 1,
	class: "federation__table-wrap"
}, Jr = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, Yr = { class: "federation__name" }, Xr = { class: "federation__url" }, Zr = { class: "federation__num" }, Qr = { class: "federation__date" }, $r = ["data-testid"], ei = { class: "federation__actions" }, ti = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, ni = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = S(), r = U([]), i = U(!0), a = U(null), o = U(""), s = U(!1);
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
		return B(() => c(!0)), (e, t) => (H(), j("section", Wr, [t[8] ||= M("header", { class: "federation__head" }, [M("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), M("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (H(), j("div", Gr, [P(C, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), k(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: X(() => [P(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(!0)
			}, {
				default: X(() => [...t[2] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (H(), j("div", Kr, [
			t[7] ||= M("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (H(), k(w, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (H(), j("div", qr, [M("table", Jr, [t[4] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Peer"),
				M("th", { scope: "col" }, "Shared libraries"),
				M("th", { scope: "col" }, "Last sync"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(H(!0), j(T, null, W(r.value, (e) => (H(), j("tr", { key: e.id }, [
				M("td", null, [M("div", Yr, q(e.name), 1), M("div", Xr, q(e.url), 1)]),
				M("td", Zr, q(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				M("td", Qr, q(f(e.last_sync)), 1),
				M("td", null, [M("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [P(b, { tone: m(e.status) }, {
					default: X(() => [N(q(p(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, $r)]),
				M("td", null, [M("div", ei, [e.status === "connected" ? (H(), k(_, {
					key: 0,
					variant: "ghost",
					size: "sm",
					"aria-label": `Disconnect ${e.name}`,
					onClick: (t) => u(e.id)
				}, {
					default: X(() => [...t[3] ||= [N(" Disconnect ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : A("", !0)])])
			]))), 128))])])])),
			M("section", ti, [t[6] ||= M("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), M("form", {
				class: "federation__form",
				onSubmit: tn(l, ["prevent"])
			}, [$t(M("input", {
				"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
				type: "url",
				class: "federation__input",
				placeholder: "https://other-server.example.com",
				"aria-label": "Peer server URL",
				autocomplete: "off"
			}, null, 512), [[Zt, o.value]]), P(_, {
				type: "submit",
				variant: "solid",
				"left-icon": "plus",
				loading: s.value,
				disabled: !o.value.trim()
			}, {
				default: X(() => [...t[5] ||= [N(" Connect ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-0640a657"]]), ri = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, ii = {
	key: 0,
	class: "shares__skel"
}, ai = {
	key: 3,
	class: "shares__table-wrap"
}, oi = {
	class: "shares__table",
	"aria-label": "Library shares"
}, si = { class: "shares__library" }, ci = { class: "shares__date" }, li = { class: "shares__date" }, ui = ["data-testid"], di = { class: "shares__actions" }, fi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = S(), r = U([]), i = U(!0), a = U(null);
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
		return B(() => o(!0)), (e, t) => (H(), j("section", ri, [t[5] ||= M("header", { class: "shares__head" }, [M("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), M("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (H(), j("div", ii, [P(C, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), k(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: X(() => [P(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: X(() => [...t[1] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), k(w, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (H(), j("div", ai, [M("table", oi, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Shared with"),
			M("th", { scope: "col" }, "Permissions"),
			M("th", { scope: "col" }, "Created"),
			M("th", { scope: "col" }, "Expires"),
			M("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(H(!0), j(T, null, W(r.value, (e) => (H(), j("tr", { key: e.id }, [
			M("td", null, [M("span", si, q(e.library_name), 1)]),
			M("td", null, q(e.shared_with), 1),
			M("td", null, [P(b, { tone: u(e.permissions) }, {
				default: X(() => [N(q(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			M("td", ci, q(c(e.created_at)), 1),
			M("td", li, [M("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [N(q(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (H(), k(b, {
				key: 0,
				tone: "error"
			}, {
				default: X(() => [...t[2] ||= [N("Expired", -1)]]),
				_: 1
			})) : A("", !0)], 8, ui)]),
			M("td", null, [M("div", di, [P(_, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: X(() => [...t[3] ||= [N(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-8731f31d"]]), pi = {
	class: "audit",
	"aria-labelledby": "audit-heading"
}, mi = {
	key: 0,
	class: "audit__skel"
}, hi = {
	key: 3,
	class: "audit__content"
}, gi = { class: "audit__table-wrap" }, _i = {
	class: "audit__table",
	"aria-label": "Audit logs"
}, vi = ["data-testid"], yi = { class: "audit__details" }, bi = { class: "audit__ip" }, xi = { class: "audit__date" }, Si = {
	key: 0,
	class: "audit__pagination",
	"aria-label": "Audit log pages"
}, Ci = {
	class: "audit__page-info",
	"aria-live": "polite"
}, wi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AuditLogsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? h, n = S(), r = U([]), i = U(!0), a = U(null), o = U(1), s = U(1);
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
		return B(() => c()), (e, t) => (H(), j("section", pi, [t[7] ||= M("header", { class: "audit__head" }, [M("h1", {
			id: "audit-heading",
			class: "audit__title"
		}, "Audit Logs"), M("p", { class: "audit__subtitle" }, "View system activity and user actions.")], -1), i.value ? (H(), j("div", mi, [P(C, {
			variant: "text",
			lines: 8
		})])) : a.value ? (H(), k(w, {
			key: 1,
			icon: "alert",
			title: "Couldn't load audit logs",
			description: a.value
		}, {
			actions: X(() => [P(_, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => c(o.value)
			}, {
				default: X(() => [...t[3] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), k(w, {
			key: 2,
			icon: "list",
			title: "No audit logs",
			description: "System activity and user actions will appear here."
		})) : (H(), j("div", hi, [M("div", gi, [M("table", _i, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Action"),
			M("th", { scope: "col" }, "Actor"),
			M("th", { scope: "col" }, "Target"),
			M("th", { scope: "col" }, "Details"),
			M("th", { scope: "col" }, "IP"),
			M("th", { scope: "col" }, "Time")
		])], -1), M("tbody", null, [(H(!0), j(T, null, W(r.value, (e) => (H(), j("tr", { key: e.id }, [
			M("td", null, [M("span", { "data-testid": `action-${e.id}` }, [P(b, { tone: u(e.action) }, {
				default: X(() => [N(q(e.action), 1)]),
				_: 2
			}, 1032, ["tone"])], 8, vi)]),
			M("td", null, q(e.actor), 1),
			M("td", null, q(e.target || "—"), 1),
			M("td", yi, q(e.details || "—"), 1),
			M("td", bi, q(e.ip_address || "—"), 1),
			M("td", xi, q(l(e.created_at)), 1)
		]))), 128))])])]), s.value > 1 ? (H(), j("nav", Si, [
			P(_, {
				variant: "ghost",
				size: "sm",
				"left-icon": "chevron-left",
				disabled: o.value <= 1,
				onClick: t[1] ||= (e) => c(o.value - 1)
			}, {
				default: X(() => [...t[5] ||= [N(" Previous ", -1)]]),
				_: 1
			}, 8, ["disabled"]),
			M("span", Ci, "Page " + q(o.value) + " of " + q(s.value), 1),
			P(_, {
				variant: "ghost",
				size: "sm",
				"right-icon": "chevron-right",
				disabled: o.value >= s.value,
				onClick: t[2] ||= (e) => c(o.value + 1)
			}, {
				default: X(() => [...t[6] ||= [N(" Next ", -1)]]),
				_: 1
			}, 8, ["disabled"])
		])) : A("", !0)]))]));
	}
}), [["__scopeId", "data-v-26a60fa5"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Ti(e, t) {
	let n = x(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
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
function Ei() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = U(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), V(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Yt(t);
}
//#endregion
export { we as ALL_LOGS, dt as AMBIENT_SAMPLE_H, ut as AMBIENT_SAMPLE_INTERVAL_MS, it as AMBIENT_SAMPLE_W, Ge as ARROW_ICONS, pt as ARROW_LABELS, Pe as AdminBackupApi, Fe as AdminCastApi, ze as AdminCollectionsApi, Te as AdminDashboardApi, Ie as AdminDlnaServerApi, Be as AdminHistoryApi, Ne as AdminIntegrationsApi, Ue as AdminLibrariesApi, Re as AdminLiveTvApi, Ce as AdminLogsApi, Le as AdminRemoteAccessApi, Me as AdminServicesApi, We as AdminSettingsApi, Ve as AdminSyncPlayApi, Oe as AdminUsersApi, je as AdminWebhooksApi, gt as AmbientCanvas, p as ApiClient, u as ApiError, e as AppBackdrop, Sn as AppLayout, wi as AuditLogsPage, b as Badge, _ as Button, Ht as CAPTION_BACKGROUND_OPTIONS, Lt as CAPTION_COLOR_OPTIONS, Bt as CAPTION_EDGE_OPTIONS, Pt as CAPTION_SIZE_OPTIONS, Ot as CAPTION_SIZE_SCALE, rt as CaptionOverlay, Tt as CaptionsMenu, fe as Chip, he as Combobox, l as DEFAULT_CAPTION_STYLE, s as DEFAULT_PREFERENCES, ft as DIRECT_PLAY_EXTENSIONS, w as EmptyState, ni as FederationPage, ve as FilterBar, n as Icon, r as IconButton, ce as Kbd, He as LIBRARY_TYPES, jr as LibraryScanPage, ee as LocalStorageTokenStore, Wt as LoginForm, fi as ManageSharesPage, de as MediaCard, Se as MediaDetail, ge as MediaGrid, _e as MediaHomeRow, pe as MediaRow, Ln as MiniPlayer, ye as Modal, Ur as MyServersPage, m as NetworkError, Qe as PLAYER_SHORTCUTS, _r as PageTransition, Qn as PhlixApp, St as Player, Je as QualityMenu, Ee as RATING_LABELS, De as RATING_OPTIONS, ie as RESUME_MAX_RATIO, ne as RESUME_MIN_SECONDS, yt as ResumePrompt, gr as Reveal, ke as SUBSCRIBABLE_EVENTS, Xe as Scrubber, me as Select, xe as SettingsForm, pn as Sheet, mt as ShortcutsHelp, Gt as SignupForm, C as Skeleton, le as Slider, qe as SpeedMenu, hr as Spinner, ue as Switch, at as TRANSCODE_EXTENSIONS, be as Tabs, g as TimeoutError, pr as ToastHost, or as Tooltip, _t as TranscodeNotice, vt as UPNEXT_COUNTDOWN_SECONDS, xt as UPNEXT_RING_CIRCUMFERENCE, st as UPNEXT_RING_RADIUS, bt as UpNext, et as VolumeControl, Ae as WEBHOOK_EVENT_CATEGORIES, Rt as activeAudioIndex, yr as adminMenu, wt as ambientGradient, Vt as applyAudioTrack, Kn as applyStoredThemeEarly, kt as applyTrackModes, Dt as averageRegion, Ti as bindMediaStoreToRouter, vr as buildAdminRoutes, ae as buildMediaQuery, re as buildMediaUrl, Ft as captionStyleVars, Ut as cleanCueText, ir as createPhlixApp, Un as deriveAccentVars, At as edgeShadow, d as errMessage, ht as extensionOf, Ze as formatTime, oe as fuzzyScore, $e as handleShortcut, jt as hasActiveCaptions, c as hasStoredPreferences, ot as isBatterySaving, Ct as isFatalMediaError, f as isOffline, tt as isTypingTarget, zt as listAudioTracks, It as listSubtitleTracks, se as matchCommand, ct as needsTranscode, Nt as readActiveCueLines, o as readStoredPreferences, Mt as resolveTextTrack, Et as rgbString, nt as rgbaString, lt as ringDashoffset, Ke as sampleAmbient, te as useAuthStore, Jn as useCommandPaletteHotkey, y as useCommandStore, i as useFocusTrap, Ye as useKeyboardShortcuts, x as useMediaStore, Ei as useOnline, v as usePlayerStore, a as usePreferencesStore, qn as useTheme, S as useToastStore };

//# sourceMappingURL=phlix-ui.js.map