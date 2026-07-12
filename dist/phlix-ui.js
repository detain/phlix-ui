import { r as e } from "./AuthField-sorTjJtE.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-X5skTbAE.js";
import { n as r, t as i } from "./Modal-BnAzb9-y.js";
import { t as a } from "./useFocusTrap-DZxA3ZEr.js";
import { a as o, i as s, n as c, r as l, t as u } from "./usePreferencesStore-g-d6JBr9.js";
import { i as d, n as f, r as p, t as m } from "./useMessages-CI_jngTk.js";
import { a as h, c as g, d as _, f as v, i as ee, l as te, n as y, p as b, r as x, s as ne, t as re, u as ie } from "./client-C0AMSEun.js";
import { n as ae, t as oe } from "./useApiBase-CV_r-Kk4.js";
import { t as S } from "./useAuthStore-DWTuTW8p.js";
import { a as se, i as ce, n as le, o as ue, r as de, t as fe } from "./media-query-BdY2RILB.js";
import { t as C } from "./useToastStore-BDoKlU6N.js";
import { n as pe, t as me } from "./ThumbRating-DGyicxT5.js";
import { i as he, o as ge } from "./shortcuts-DGdfkJbu.js";
import { n as _e, t as ve } from "./NetworkHealthIndicator-B60w7eY2.js";
import { t as ye } from "./Spinner-DxxkAO-G.js";
import { i as be, n as xe, r as Se, t as Ce } from "./Kbd-Bmk72RCb.js";
import { a as we, i as Te, n as Ee, o as De, r as Oe, t as ke } from "./useLibrariesStore-BHaCVVqq.js";
import { n as Ae, t as je } from "./HomeRow-BywPBgND.js";
import { a as Me, c as Ne, i as Pe, l as Fe, n as Ie, o as Le, r as Re, s as ze, t as Be, u as Ve } from "./useConnectionStore-BxMhAb3d.js";
import { i as He, n as Ue, r as We, t as Ge } from "./usePageTitle-BO3GGF3M.js";
import { t as w } from "./Button-btm-GCUN.js";
import { t as T } from "./Badge-D_aUH3dO.js";
import { t as Ke } from "./Slider-LnnvB5jy.js";
import { t as qe } from "./Switch-DyS2L5gX.js";
import { t as Je } from "./Chip-Dqypy8Bt.js";
import { t as Ye } from "./Select-BiOUcacP.js";
import { n as Xe, r as Ze, t as Qe } from "./FilterBar-Ce6bqne0.js";
import { t as E } from "./Skeleton-DhQmxeNg.js";
import { t as D } from "./EmptyState-CfyGawh7.js";
import { t as $e } from "./PageHint-CPoTKHik.js";
import { t as et } from "./Tabs-D8iKNBl3.js";
import { a as tt, i as nt, t as rt } from "./MediaCard-CJqS3fwx.js";
import { t as it } from "./MediaGrid-CS3XHBYH.js";
import { t as at } from "./MediaRow-D0CkQKro.js";
import { t as ot } from "./MediaDetail-CSDFFNzb.js";
import { t as st } from "./MetadataMatchModal-jiZc23NT.js";
import { n as ct, t as lt } from "./metadata-sources-DLEGz7mQ.js";
import { n as ut, t as dt } from "./logs-DadTfaTq.js";
import { t as ft } from "./dashboard-BTCOCTHQ.js";
import { n as pt, r as mt, t as ht } from "./users-DcoPaY62.js";
import { n as gt, r as _t, t as vt } from "./webhooks-BBTLnFKm.js";
import { t as yt } from "./services-C907MGdw.js";
import { t as bt } from "./integrations-DLAG9ISY.js";
import { t as xt } from "./backup-IdY_vzc2.js";
import { t as St } from "./cast-BvFcBEB6.js";
import { t as Ct } from "./dlnaServer-B5Sg4MkS.js";
import { t as wt } from "./remoteAccess-DVKRpKQ8.js";
import { t as Tt } from "./liveTv-Dbjt901v.js";
import { t as Et } from "./collections-CH3HLdcd.js";
import { t as Dt } from "./history-Cz9DDbWX.js";
import { t as Ot } from "./syncPlay-DPzJkgkK.js";
import { n as kt, t as At } from "./libraries-CXAz_kXs.js";
import { t as jt } from "./settings-m4upFcmH.js";
import { i as Mt, n as Nt, r as Pt, t as Ft } from "./plugins-Bv-vg-kT.js";
import { t as It } from "./hubDashboard-BhOaaDD-.js";
import { t as Lt } from "./LoginForm-DMu1MPrX.js";
import { t as Rt } from "./SignupForm-C67Av576.js";
import { t as zt } from "./SettingsForm-CJn_NIiw.js";
import { Fragment as O, Teleport as Bt, Transition as Vt, TransitionGroup as Ht, computed as k, createApp as Ut, createBlock as A, createCommentVNode as j, createElementBlock as M, createElementVNode as N, createTextVNode as P, createVNode as F, defineAsyncComponent as Wt, defineComponent as I, inject as Gt, normalizeClass as L, normalizeStyle as Kt, onBeforeUnmount as R, onMounted as z, onScopeDispose as qt, openBlock as B, readonly as Jt, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as Yt, toDisplayString as W, toValue as Xt, unref as G, useId as Zt, vModelText as Qt, watch as K, watchEffect as $t, withCtx as q, withDirectives as en, withModifiers as tn } from "vue";
import { createPinia as nn, defineStore as rn } from "pinia";
import { RouterLink as J, RouterView as an, createRouter as on, createWebHistory as sn, useRouter as cn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var ln = ["aria-labelledby"], un = {
	key: 0,
	class: "phlix-sheet__header"
}, dn = ["id"], fn = { class: "phlix-sheet__body" }, pn = {
	key: 1,
	class: "phlix-sheet__footer"
}, mn = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		let n = e, i = t, o = V(n.modelValue);
		K(() => n.modelValue, (e) => o.value = e);
		let s = V(null), c = Zt();
		function l() {
			i("update:modelValue", !1), i("close");
		}
		function u() {
			n.dismissible && l();
		}
		return a(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), A(Bt, { to: "body" }, [F(Vt, { name: `phlix-sheet-${e.side}` }, {
			default: q(() => [e.modelValue ? (B(), M("div", {
				key: 0,
				class: L(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: tn(u, ["self"])
			}, [N("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), M("header", un, [e.title ? (B(), M("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, dn)) : j("", !0), e.hideClose ? j("", !0) : (B(), A(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : j("", !0),
				N("div", fn, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), M("footer", pn, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0)
			], 8, ln)], 34)) : j("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6ff9e0f5"]]), hn = { class: "shell" }, gn = {
	class: "shell__skip",
	href: "#main"
}, _n = { class: "shell__bar" }, vn = { class: "shell__inner" }, yn = { class: "shell__brand" }, bn = ["aria-label"], xn = { class: "shell__actions" }, Sn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, Cn = {
	key: 0,
	class: "shell__footer"
}, wn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "AppLayout",
	setup(t) {
		let n = o(), i = V(!1), { t: a } = m();
		return (t, o) => (B(), M("div", hn, [
			N("a", gn, W(G(a)("shell.skipToContent")), 1),
			F(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			N("header", _n, [N("div", vn, [
				N("div", yn, [U(t.$slots, "logo", {}, () => [o[3] ||= N("span", { class: "shell__wordmark" }, [P("Phlix"), N("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				N("nav", {
					class: "shell__nav",
					"aria-label": G(a)("shell.primaryNav")
				}, [U(t.$slots, "nav", {}, void 0, !0)], 8, bn),
				o[4] ||= N("span", { class: "shell__spacer" }, null, -1),
				N("div", xn, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), A(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: G(a)("shell.openMenu"),
					variant: "ghost",
					onClick: o[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : j("", !0)
			])]),
			N("main", Sn, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), M("footer", Cn, [U(t.$slots, "footer", {}, void 0, !0)])) : j("", !0),
			F(mn, {
				modelValue: i.value,
				"onUpdate:modelValue": o[2] ||= (e) => i.value = e,
				side: "left",
				title: G(a)("shell.menu")
			}, {
				default: q(() => [N("nav", {
					class: "shell__drawer",
					onClick: o[1] ||= (e) => i.value = !1
				}, [U(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-a7bb329a"]]), Tn = /* @__PURE__ */ I({
	__name: "ThemeToggle",
	setup(e) {
		let t = o(), { t: n } = m(), i = [
			"nocturne",
			"daylight",
			"midnight"
		], a = {
			nocturne: "moon",
			daylight: "sun",
			midnight: "monitor"
		}, s = {
			nocturne: "Nocturne",
			daylight: "Daylight",
			midnight: "Midnight"
		}, c = k(() => i[(i.indexOf(t.theme) + 1) % i.length]), l = k(() => a[t.theme] ?? "moon"), u = k(() => n("shell.themeToggleLabel", {
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
}), En = ["aria-label", "aria-expanded"], Dn = {
	key: 0,
	class: "usermenu__avatar"
}, On = ["src", "alt"], kn = {
	key: 1,
	class: "usermenu__avatar-initials"
}, An = ["aria-label"], jn = { class: "usermenu__head" }, Mn = { class: "usermenu__avatar usermenu__avatar--lg" }, Nn = ["src", "alt"], Pn = {
	key: 1,
	class: "usermenu__avatar-initials"
}, Fn = { class: "usermenu__name" }, In = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "UserMenu",
	setup(e) {
		let t = S(), r = cn(), i = Gt("phlixConfig", null), o = k(() => i?.routerBase ?? "/app"), { t: s } = m(), c = V(!1), l = V(null), u = V(null), d = k(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = V(!1);
		function p(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		K(() => t.user?.avatar_url, () => {
			f.value = !1;
		});
		function h() {
			c.value = !1;
		}
		function g(e) {
			h(), r.push(e);
		}
		function _() {
			h(), t.logout(), r.push(`${o.value}/login`);
		}
		a(u, c, {
			lockScroll: !1,
			onEscape: () => (h(), !0)
		});
		function v(e) {
			l.value && !l.value.contains(e.target) && h();
		}
		return K(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", v, !0) : document.removeEventListener("pointerdown", v, !0));
		}), R(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", v, !0);
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
			onClick: r[1] ||= (e) => c.value = !c.value
		}, [G(t).isLoggedIn ? (B(), M("span", Dn, [G(t).user?.avatar_url && !f.value ? (B(), M("img", {
			key: 0,
			src: G(t).user.avatar_url,
			alt: d.value,
			class: "usermenu__avatar-img",
			onError: r[0] ||= (e) => f.value = !0
		}, null, 40, On)) : (B(), M("span", kn, W(p(d.value)), 1))])) : (B(), A(n, {
			key: 1,
			name: "user"
		}))], 8, En), c.value ? (B(), M("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": G(s)("shell.account"),
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), M(O, { key: 0 }, [
			N("div", jn, [N("span", Mn, [G(t).user?.avatar_url && !f.value ? (B(), M("img", {
				key: 0,
				src: G(t).user.avatar_url,
				alt: d.value,
				class: "usermenu__avatar-img",
				onError: r[2] ||= (e) => f.value = !0
			}, null, 40, Nn)) : (B(), M("span", Pn, W(p(d.value)), 1))]), N("span", Fn, W(d.value), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[3] ||= (e) => g(`${o.value}/history`)
			}, [F(n, { name: "film" }), P(" " + W(G(s)("shell.watchHistory")), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[4] ||= (e) => g(`${o.value}/settings`)
			}, [F(n, { name: "settings" }), P(" " + W(G(s)("shell.settings")), 1)]),
			N("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: _
			}, [F(n, { name: "log-out" }), P(" " + W(G(s)("shell.signOut")), 1)])
		], 64)) : (B(), M("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[5] ||= (e) => g(`${o.value}/login`)
		}, [F(n, { name: "user" }), P(" " + W(G(s)("shell.signIn")), 1)]))], 8, An)) : j("", !0)], 512));
	}
}), [["__scopeId", "data-v-2a0ffb08"]]), Ln = ["aria-label"], Rn = ["src", "poster"], zn = { class: "mini__body" }, Bn = { class: "mini__title" }, Vn = { class: "mini__controls" }, Hn = ["aria-label"], Un = ["aria-label", "aria-pressed"], Wn = ["aria-label"], Gn = ["aria-label"], Kn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, qn = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = ue(), { t: a } = m(), o = V(null), s = V(null), c = pe(), l = Gt("phlixConfig", null), u = k(() => i.current ? c.isFavorite(i.current.id) : !1);
		function d() {
			let e = i.current?.id;
			e && c.toggleFavorite(e, l?.apiBase ?? "");
		}
		let f = k(() => i.miniPlayer && !!i.current && (!!i.streamUrl || !!i.hlsMasterUrl)), p = k(() => i.current?.name ?? ""), h = k(() => Math.max(0, Math.min(1, i.progress)));
		function g() {
			let e = o.value;
			e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, i.position > 0 && (!e.duration || i.position < e.duration) && (e.currentTime = i.position), i.playing && e.play()?.catch(() => {}));
		}
		function _() {
			i.play();
		}
		function v() {
			i.pause();
		}
		function ee() {
			let e = o.value;
			e && i.updateProgress(e.currentTime, e.duration);
		}
		function te() {
			let e = o.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function y() {
			i.current && r("expand", i.current.id);
		}
		function b() {
			i.closePlayer();
		}
		async function x() {
			let e = o.value;
			!e || !i.hlsMasterUrl || (s.value?.destroy(), s.value = null, s.value = await ge(e, i.hlsMasterUrl, {
				startPosition: i.position,
				onReady: () => {
					let e = o.value;
					e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, i.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return K(() => f.value, async (e) => {
			if (!e) {
				s.value?.destroy(), s.value = null;
				return;
			}
			!i.hlsMasterUrl || i.streamUrl || await x();
		}), z(async () => {
			f.value && i.hlsMasterUrl && !i.streamUrl && await x();
		}), K(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), K(() => i.lastCommand, (e) => {
			let t = o.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : i.position + e.value, r = t.duration && t.duration > 0 ? t.duration : i.duration, a = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = a, i.updateProgress(a, t.duration || void 0);
		}), R(() => {
			s.value?.destroy(), s.value = null, o.value?.pause?.();
		}), (e, t) => (B(), A(Vt, { name: "mini" }, {
			default: q(() => [f.value ? (B(), M("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": G(a)("player.miniPlayer")
			}, [
				N("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: G(i).hlsMasterUrl ? "" : G(i).streamUrl,
					poster: G(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: g,
					onPlay: _,
					onPause: v,
					onTimeupdate: ee,
					onClick: y
				}, null, 40, Rn),
				N("div", zn, [N("p", Bn, W(p.value), 1), N("div", Vn, [
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? G(a)("player.pause") : G(a)("player.play"),
						onClick: te
					}, [F(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Hn),
					G(i).current ? (B(), M("button", {
						key: 0,
						type: "button",
						class: L(["mini__btn mini__btn--favorite", { "is-on": u.value }]),
						"aria-label": u.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": u.value ? "true" : "false",
						onClick: d
					}, [F(n, { name: u.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Un)) : j("", !0),
					N("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(a)("player.expand"),
						onClick: y
					}, [F(n, { name: "expand" })], 8, Wn),
					N("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": G(a)("player.closePlayer"),
						onClick: b
					}, [F(n, { name: "x" })], 8, Gn)
				])]),
				N("div", Kn, [N("div", {
					class: "mini__progress-fill",
					style: Kt({ transform: `scaleX(${h.value})` })
				}, null, 4)])
			], 8, Ln)) : j("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
//#region src/composables/color.ts
function Jn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Yn = (e) => Math.max(0, Math.min(255, Math.round(e))), Xn = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Yn(e).toString(16).padStart(2, "0")).join("");
function Zn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Qn(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var $n = ({ r: e, g: t, b: n }, r) => `rgba(${Yn(e)}, ${Yn(t)}, ${Yn(n)}, ${r})`;
function er({ r: e, g: t, b: n }) {
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
function tr(e) {
	let t = Jn(e);
	if (!t) return null;
	let n = er(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Xn(t),
		"--accent-hover": Xn(Zn(t, .12)),
		"--accent-active": Xn(Qn(t, .12)),
		"--accent-soft": $n(t, .14),
		"--accent-ring": $n(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var nr = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function rr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion"), e.tv ? n.setAttribute("data-tv", "true") : n.removeAttribute("data-tv");
	let r = e.accent ? tr(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of nr) n.style.removeProperty(e);
}
function ir(e, t) {
	let n = s(), r = !l();
	e && r && (n.theme = e), t !== void 0 && r && (n.tv = t), rr(n, n.reducedMotion === "on" ? !0 : n.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function ar() {
	let e = o();
	return $t(() => {
		rr({
			theme: e.theme,
			density: e.density,
			accent: e.accent,
			tv: e.tv
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function or() {
	let e = be(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), qt(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function Y(e, t) {
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
function sr(e) {
	let t = Y(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Y(n, t);
	return !r || t && r === t ? null : r;
}
function cr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Y(e.href) === t) return !0;
	return !1;
}
function lr(e, t, n, r) {
	if (cr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function ur(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Y(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Y(e);
		r && (n && r === n || a.has(r) || (a.add(r), lr("preconnect", r, t.crossOrigin === !0, i), lr("dns-prefetch", r, !1, i)));
	}
	i.length && qt(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeReporter.ts
var dr = "phlix.deviceId", fr = 15e3;
function pr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(dr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(dr, e)), e;
	} catch {
		return "web";
	}
}
function mr() {
	let e = ue(), t = S(), n = pr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < fr)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * se),
					duration_ticks: Math.floor(e.duration * se),
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
var hr = ["src", "alt"], gr = { class: "brand-wordmark" }, _r = {
	key: 1,
	class: "brand-tagline"
}, vr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PhlixApp",
	setup(e) {
		ar();
		let t = be(), i = cn(), { t: a } = m();
		or();
		let o = Wt(() => import("./CommandPalette-D5HRF-UT.js")), s = V(!1);
		K(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = Gt("phlixConfig", null);
		ur(sr({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = S(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = Ae();
		K(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), mr();
		let p = k(() => l?.branding ?? {}), h = k(() => p.value.wordmark ?? "Phlix"), g = k(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = k(() => l?.home ?? l?.routerBase ?? "/app"), v = ke(), ee = k(() => g.value.some((e) => e.libraryLinks));
		K(() => u.isLoggedIn && ee.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function te(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), A(wn, null, {
			logo: q(() => [F(G(J), {
				to: _.value,
				class: "brand"
			}, {
				default: q(() => [
					p.value.logoSrc ? (B(), M("img", {
						key: 0,
						src: p.value.logoSrc,
						alt: p.value.logoAlt ?? h.value,
						class: "brand-logo"
					}, null, 8, hr)) : j("", !0),
					N("span", gr, [P(W(h.value), 1), i[1] ||= N("span", { class: "brand-dot" }, ".", -1)]),
					p.value.tagline ? (B(), M("span", _r, W(p.value.tagline), 1)) : j("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: q(() => [g.value.length ? (B(!0), M(O, { key: 0 }, H(g.value, (e) => (B(), M(O, { key: e.id }, [(B(), A(Yt(e.href ? "a" : G(J)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? te(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: q(() => [e.icon ? (B(), A(n, {
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
			])), (B(!0), M(O, null, H(e.libraryLinks ? G(v).items : [], (t) => (B(), A(G(J), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: q(() => [P(W(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (B(), M(O, { key: 1 }, [
				F(G(J), {
					to: _.value,
					class: "nav-link"
				}, {
					default: q(() => [P(W(G(a)("shell.browse")), 1)]),
					_: 1
				}, 8, ["to"]),
				F(G(J), {
					to: `${_.value}/recommendations`,
					class: "nav-link"
				}, {
					default: q(() => [P(W(G(a)("shell.recommendations")), 1)]),
					_: 1
				}, 8, ["to"]),
				F(G(J), {
					to: `${_.value}/explore`,
					class: "nav-link"
				}, {
					default: q(() => [P(W(G(a)("shell.explore")), 1)]),
					_: 1
				}, 8, ["to"]),
				F(G(J), {
					to: `${_.value}/syncplay`,
					class: "nav-link"
				}, {
					default: q(() => [P(W(G(a)("syncplay.syncPlay")), 1)]),
					_: 1
				}, 8, ["to"]),
				F(G(J), {
					to: `${_.value}/music`,
					class: "nav-link"
				}, {
					default: q(() => [P(W(G(a)("music.nav")), 1)]),
					_: 1
				}, 8, ["to"]),
				F(G(J), {
					to: `${_.value}/settings`,
					class: "nav-link"
				}, {
					default: q(() => [P(W(G(a)("shell.settings")), 1)]),
					_: 1
				}, 8, ["to"])
			], 64))]),
			actions: q(() => [
				F(r, {
					name: "search",
					label: G(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => G(t).openPalette()
				}, null, 8, ["label"]),
				F(Tn),
				G(u).isAdmin ? (B(), A(ve, { key: 0 })) : j("", !0),
				F(In)
			]),
			default: q(() => [
				F(G(an)),
				s.value ? (B(), A(G(o), { key: 0 })) : j("", !0),
				G(u).isLoggedIn ? (B(), A(qn, {
					key: 1,
					onExpand: c
				})) : j("", !0)
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-df585b3a"]]), yr = { class: "phlix-placeholder" }, br = { class: "placeholder-content" }, xr = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), M("div", yr, [N("div", br, [n[0] ||= N("h1", null, "Shared UI loading...", -1), N("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-576c7f48"]]), X = /* @__PURE__ */ new Set();
function Sr(e, t) {
	e.hasAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.setAttribute("data-focusable", ""), t?.group == null ? e.removeAttribute("data-focus-group") : e.setAttribute("data-focus-group", String(t.group)), t?.order == null ? e.removeAttribute("data-focus-order") : e.setAttribute("data-focus-order", String(t.order)), t?.disabled ? X.delete(e) : X.add(e);
}
var Cr = {
	mounted(e, t) {
		Sr(e, t.value);
	},
	updated(e, t) {
		Sr(e, t.value);
	},
	unmounted(e) {
		X.delete(e);
	}
};
function wr(e) {
	e.directive("focusable", Cr);
}
//#endregion
//#region src/stores/useServerStore.ts
var Tr = "phlix.currentServerId", Er = "phlix.currentServerName", Dr = "phlix.currentServerUrl";
function Or(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e);
	} catch {
		return null;
	}
}
function Z(e, t) {
	if (!(typeof window > "u")) try {
		t === null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, t);
	} catch {}
}
var kr = rn("server", () => {
	let e = V(Or(Tr)), t = V(Or(Er)), n = V(Or(Dr)), r = k(() => e.value !== null);
	function i(r, i, a) {
		e.value = r, t.value = i ?? null, n.value = a && a !== "" ? a : null, Z(Tr, r), Z(Er, i ?? null), Z(Dr, n.value);
	}
	function a() {
		e.value = null, t.value = null, n.value = null, Z(Tr, null), Z(Er, null), Z(Dr, null);
	}
	return {
		currentServerId: e,
		currentServerName: t,
		currentServerUrl: n,
		hasCurrent: r,
		setCurrent: i,
		clear: a
	};
}), Ar = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-gBbwx5uu.js")
}, jr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-B962zVUF.js")
}, Mr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-DTaIKVQQ.js")
}, Nr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-B-CpCVVS.js")
}, Pr = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-CoxiANeR.js")
}, Fr = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-kzqeOSuH.js")
}, Ir = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-aM6zcAd3.js")
}, Lr = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-B2bHNeEn.js")
}, Rr = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-DkbSkBCE.js")
}, zr = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-DE75M8d1.js")
}, Br = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-q4cRUxb4.js")
}, Vr = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-BZXv4Msr.js")
}, Hr = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-RuSMpOKI.js")
}, Ur = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-UvyCyqVM.js")
}, Wr = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-2m9xOTJj.js")
}, Gr = {
	name: "admin-duplicates",
	path: "duplicates",
	label: "Duplicates",
	icon: "filter",
	component: () => import("./DuplicatesPage-ZJLmKLQC.js")
}, Kr = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-Cvd_kz_X.js")
}, qr = {
	name: "admin-transcoding",
	path: "transcoding",
	label: "Transcoding",
	icon: "play",
	component: () => import("./TranscodingSettingsPage-CKfnXfjS.js")
}, Jr = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-zmDhClZD.js")
}, Yr = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-afVLRAhD.js")
}, Q = {
	name: "admin-metrics",
	path: "metrics",
	label: "Server Traffic",
	icon: "speed",
	component: () => import("./MetricsPage-C7Irc5d0.js")
}, Xr = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-BUMuyM3Z.js")
}, Zr = Object.fromEntries([
	Ar,
	Q,
	jr,
	Mr,
	Nr,
	Pr,
	Fr,
	Ir,
	Lr,
	Rr,
	zr,
	Br,
	Vr,
	Hr,
	Ur,
	Wr,
	Gr,
	Kr,
	qr,
	Jr,
	Yr,
	Xr
].map((e) => [e.name, e.label]));
function Qr(e) {
	return e ? Zr[e] ?? null : null;
}
var $r = [
	jr,
	Mr,
	Jr
], ei = [
	Ar,
	Q,
	Nr,
	Pr,
	Fr,
	Ir,
	Lr,
	Rr,
	zr,
	Br,
	Vr,
	Hr,
	Ur,
	Wr,
	Gr,
	Kr,
	qr
], ti = [
	Yr,
	Q,
	Xr
], ni = [
	Ar,
	Q,
	jr,
	Mr,
	Nr,
	Pr,
	Fr,
	Ir,
	Lr,
	Rr,
	zr,
	Br,
	Vr,
	Hr,
	Ur,
	Wr,
	Gr,
	Kr,
	qr,
	Jr
], ri = [
	Yr,
	Q,
	...$r,
	Xr
];
function ii(e = "/app", t = ni) {
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
		component: () => import("./AdminLayout-AVVg44EG.js"),
		props: {
			base: e,
			pages: t
		},
		children: r
	}];
}
function ai(e = "/app") {
	return ii(e, ni);
}
function oi(e = "/app") {
	return ii(e, ri);
}
function si(e = "/app", t = ni) {
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
var ci = [
	"login",
	"signup",
	"connect"
];
function li(e, t, n = !1, r = { name: "browse" }) {
	let i = typeof e.name == "string" ? e.name : "";
	return ci.includes(i) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? r : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function ui(e, t, n) {
	return !t || n ? null : e.name === "connect" ? !0 : {
		name: "connect",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function di(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = Qr(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function fi(e, t, n) {
	return e === "hub" && n ? `${t}/api/v1/servers/${n}/proxy` : t;
}
function pi(e, t) {
	return e !== "hub" || t === null || t === "" ? "" : t.replace(/\/+$/, "");
}
function mi() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {},
		deviceHeaders: {}
	};
}
function hi(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-Ct-HdnQc.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-Ch4Bv0hG.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-DccuwAOv.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-8pc-eWmU.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-BachyM0H.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-BN3et4jH.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-BF2J123N.js")
		},
		{
			path: `${t}/connect`,
			name: "connect",
			meta: { title: "connect.title" },
			component: () => import("./ConnectPage-DT0ulSpy.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-CqjcfmdY.js")
		},
		{
			path: `${t}/explore`,
			name: "explore",
			meta: { title: "explore.title" },
			component: () => import("./ExplorePage-DXrssyCy.js")
		},
		{
			path: `${t}/recommendations`,
			name: "recommendations",
			meta: { title: "recommendations.title" },
			component: () => import("./RecommendationsPage-DfJyc5CS.js")
		},
		{
			path: `${t}/history`,
			name: "history",
			meta: { title: "history.title" },
			component: () => import("./WatchHistoryPage-DpiQ1CIO.js")
		},
		{
			path: `${t}/syncplay`,
			name: "syncplay",
			meta: { title: "syncplay.syncPlay" },
			component: () => import("./SyncPlayPage-BxWZFwYl.js")
		},
		{
			path: `${t}/music`,
			name: "music",
			meta: { title: "music.title" },
			component: () => import("./MusicLibraryPage-5i0P9v_u.js")
		},
		{
			path: `${t}/parental`,
			name: "parental",
			meta: { title: "parental.title" },
			component: () => import("./ParentalControlsPage-HPEefdjM.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: xr,
		props: { appName: e.app }
	}), n;
}
function gi(e) {
	let t = {
		...mi(),
		...e
	};
	ne(t.deviceHeaders ?? {}), ir(t.defaultTheme, t.defaultTv), Ue(t.branding?.wordmark);
	let n = p(t.messages), r = nn();
	if (!l()) {
		let e = o(r);
		t.defaultTheme && (e.theme = t.defaultTheme), t.defaultTv !== void 0 && (e.tv = t.defaultTv);
	}
	let i = on({
		history: sn(),
		routes: hi(t)
	}), a = t.home ? { path: t.home } : { name: "browse" }, s = Fe(r);
	s.configure(t.onConnectionChange ?? null);
	let c = () => s.apiBase || t.apiBase;
	i.beforeEach(async (e) => {
		let n = ui(e, t.requireConnection === !0, c() !== "");
		if (n !== null) return n;
		let i = S(r);
		return e.meta?.requiresAdmin === !0 ? (await i.init(), li(e, i.isLoggedIn, i.isAdmin, a)) : i.isLoggedIn === !0 ? (i.init(), li(e, !0, !1, a)) : (await i.init(), li(e, i.isLoggedIn, i.isAdmin, a));
	}), i.afterEach((e) => {
		We(di(e, n));
	});
	let u = kr(r), d = k(() => fi(t.app, c(), u.currentServerId)), f = k(() => pi(t.app, u.currentServerUrl)), m = Ut(vr);
	return m.provide("apiBase", k(() => c())), m.provide("mediaApiBase", d), m.provide("mediaDirectBase", f), m.provide("loginPath", k(() => `${t.routerBase ?? "/app"}/login`)), m.provide("phlixCommands", t.commands ?? []), m.provide("phlixConfig", t), m.use(r), m.provide("auth", S(r)), m.use(i), wr(m), m;
}
//#endregion
//#region src/components/ui/ToastHost.vue?vue&type=script&setup=true&lang.ts
var _i = ["aria-label"], vi = ["role"], yi = { class: "phlix-toast__content" }, bi = {
	key: 0,
	class: "phlix-toast__title"
}, xi = { class: "phlix-toast__message" }, Si = ["onClick"], Ci = 0, wi = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = m(), i = C(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return z(() => {
			Ci++;
		}), R(() => {
			Ci--;
		}), (a, s) => (B(), A(Bt, { to: "body" }, [N("div", {
			class: L(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": G(t)("common.notifications")
		}, [F(Ht, { name: "phlix-toast" }, {
			default: q(() => [(B(!0), M(O, null, H(G(i).toasts, (e) => (B(), M("div", {
				key: e.id,
				class: L(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				F(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				N("div", yi, [e.title ? (B(), M("p", bi, W(e.title), 1)) : j("", !0), N("p", xi, W(e.message), 1)]),
				e.action ? (B(), M("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(i).dismiss(e.id);
					}
				}, W(e.action.label), 9, Si)) : j("", !0),
				F(r, {
					name: "x",
					label: G(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, vi))), 128))]),
			_: 1
		})], 10, _i)]));
	}
}), [["__scopeId", "data-v-0127c07a"]]), Ti = /*#__PURE__*/ t(/* @__PURE__ */ I({
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
		}), (t, a) => (B(), A(Yt(e.tag), {
			ref_key: "el",
			ref: n,
			class: L(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Kt({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-4838d241"]]), Ei = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (B(), A(Vt, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-06639673"]]), Di = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Oi = {
	key: 0,
	class: "library-scan__skel"
}, ki = {
	key: 3,
	class: "library-scan__table-wrap"
}, Ai = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, ji = { class: "library-scan__name" }, Mi = {
	key: 0,
	class: "library-scan__paths"
}, Ni = { class: "library-scan__num" }, Pi = { class: "library-scan__date" }, Fi = ["data-testid"], Ii = {
	key: 0,
	class: "library-scan__error"
}, Li = { class: "library-scan__actions" }, Ri = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? x, n = C(), r = V([]), i = V({}), a = V(!0), o = V(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				r.value = (await t.get("/api/v1/libraries")).libraries || [];
				for (let e of r.value) c(e.id);
			} catch (e) {
				o.value = v(e, "Failed to load libraries."), n.error(o.value);
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
				n.error(v(e, "Failed to trigger scan."));
			}
		}
		async function u(e) {
			try {
				await t.post(`/api/v1/libraries/${e}/rescan`), n.success("Rescan queued."), await c(e);
			} catch (e) {
				n.error(v(e, "Failed to trigger rescan."));
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
		return z(s), (e, t) => (B(), M("section", Di, [t[4] ||= N("header", { class: "library-scan__head" }, [N("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), N("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), M("div", Oi, [F(E, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), A(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: q(() => [F(w, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: q(() => [...t[0] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), A(D, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (B(), M("div", ki, [N("table", Ai, [t[3] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Type"),
			N("th", { scope: "col" }, "Items"),
			N("th", { scope: "col" }, "Last scan"),
			N("th", { scope: "col" }, "Status"),
			N("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(B(!0), M(O, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
			N("td", null, [N("div", ji, W(e.name), 1), e.paths.length ? (B(), M("div", Mi, W(e.paths.join(", ")), 1)) : j("", !0)]),
			N("td", null, W(e.type), 1),
			N("td", Ni, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			N("td", Pi, W(d(e.last_scan_at)), 1),
			N("td", null, [N("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [F(T, { tone: m(i.value[e.id]) }, {
				default: q(() => [P(W(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), M("span", Ii, W(i.value[e.id]?.error), 1)) : j("", !0)], 8, Fi)]),
			N("td", null, [N("div", Li, [F(w, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: q(() => [...t[1] ||= [P(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), F(w, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: q(() => [...t[2] ||= [P(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-f8574c77"]]), $ = class extends Error {
	kind;
	constructor(e, t) {
		super(t), this.kind = e, this.name = "ClaimError";
	}
};
async function zi(e, t, n) {
	let r = t.trim();
	if (r === "") throw new $("empty", "Enter the claim code shown on your server.");
	let i = typeof window < "u" ? new g().getAccessToken() : null, a;
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
function Bi(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Vi = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Hi = { class: "my-servers__head" }, Ui = {
	key: 0,
	class: "my-servers__skel"
}, Wi = {
	key: 3,
	class: "my-servers__table-wrap"
}, Gi = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Ki = { class: "my-servers__name" }, qi = { class: "my-servers__url" }, Ji = { class: "my-servers__num" }, Yi = { class: "my-servers__date" }, Xi = ["data-testid"], Zi = { class: "my-servers__actions" }, Qi = ["disabled"], $i = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, ea = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? x, n = C(), r = S(), a = kr(), o = cn(), s = Gt("phlixConfig", void 0)?.routerBase || "/app", c = V([]), l = V(!0), u = V(null), d = V(!1), f = V(""), p = V(!1), m = V(null);
		function h() {
			f.value = "", m.value = null, d.value = !0;
		}
		async function g() {
			p.value = !0, m.value = null;
			try {
				await zi("", f.value), d.value = !1, n.success("Server added."), await _();
			} catch (e) {
				m.value = e instanceof $ ? e.message : v(e, "Could not add the server.");
			} finally {
				p.value = !1;
			}
		}
		async function _() {
			l.value = !0, u.value = null;
			try {
				let e = await t.get("/api/v1/me/servers"), n = r.user?.username || r.user?.name || r.user?.email || "—";
				c.value = (e.servers || []).map((e) => ({
					id: e.serverId ?? "",
					name: e.serverName ?? "",
					url: e.hostnameCandidates?.[0] ?? "",
					status: e.status ?? "offline",
					relayActive: e.relayActive === !0,
					owner: n,
					last_seen: Bi(e.lastSeenAt),
					library_count: typeof e.libraryCount == "number" ? e.libraryCount : void 0
				}));
			} catch (e) {
				u.value = v(e, "Failed to load servers."), n.error(u.value);
			} finally {
				l.value = !1;
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
		function y(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		function b(e) {
			return e.status === "online" && !e.relayActive;
		}
		function ne(e) {
			e.url && window.open(e.url, "_blank", "noopener,noreferrer");
		}
		function re(e) {
			e.relayActive && (a.setCurrent(e.id, e.name, e.url), o.push(s));
		}
		return z(_), (e, t) => (B(), M("section", Vi, [
			N("header", Hi, [t[4] ||= N("div", null, [N("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), N("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), F(w, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: h
			}, {
				default: q(() => [...t[3] ||= [P("Add server", -1)]]),
				_: 1
			})]),
			l.value ? (B(), M("div", Ui, [F(E, {
				variant: "text",
				lines: 6
			})])) : u.value ? (B(), A(D, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: u.value
			}, {
				actions: q(() => [F(w, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: _
				}, {
					default: q(() => [...t[5] ||= [P("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : c.value.length === 0 ? (B(), A(D, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: q(() => [F(w, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: h
				}, {
					default: q(() => [...t[6] ||= [P("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (B(), M("div", Wi, [N("table", Gi, [t[10] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Server"),
				N("th", { scope: "col" }, "Owner"),
				N("th", { scope: "col" }, "Libraries"),
				N("th", { scope: "col" }, "Last seen"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(B(!0), M(O, null, H(c.value, (e) => (B(), M("tr", { key: e.id }, [
				N("td", null, [N("div", Ki, W(e.name), 1), N("div", qi, W(e.url), 1)]),
				N("td", null, W(e.owner), 1),
				N("td", Ji, W(e.library_count === void 0 ? "—" : e.library_count), 1),
				N("td", Yi, W(ee(e.last_seen)), 1),
				N("td", null, [N("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [F(T, { tone: y(e.status) }, {
					default: q(() => [P(W(te(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"]), b(e) ? (B(), A(T, {
					key: 0,
					tone: "warning"
				}, {
					default: q(() => [...t[7] ||= [P("Relay connecting", -1)]]),
					_: 1
				})) : j("", !0)], 8, Xi)]),
				N("td", null, [N("div", Zi, [F(w, {
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					disabled: !e.relayActive,
					title: e.relayActive ? `Browse ${e.name} here` : b(e) ? `${e.name} is online but its relay tunnel isn't connected yet — it can't be browsed here until it reconnects.` : "This server is offline — it must be connected to browse it here",
					"aria-label": `Browse ${e.name}`,
					onClick: (t) => re(e)
				}, {
					default: q(() => [...t[8] ||= [P("Browse", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				]), F(w, {
					variant: "ghost",
					size: "sm",
					disabled: !e.url,
					title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
					"aria-label": `Manage ${e.name}`,
					onClick: (t) => ne(e)
				}, {
					default: q(() => [...t[9] ||= [P("Manage", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				])])])
			]))), 128))])])])),
			F(i, {
				modelValue: d.value,
				"onUpdate:modelValue": t[2] ||= (e) => d.value = e,
				title: "Add a server"
			}, {
				footer: q(() => [F(w, {
					variant: "ghost",
					size: "sm",
					disabled: p.value,
					onClick: t[1] ||= (e) => d.value = !1
				}, {
					default: q(() => [...t[13] ||= [P("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), F(w, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: p.value,
					disabled: p.value,
					onClick: g
				}, {
					default: q(() => [...t[14] ||= [P(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: q(() => [N("form", {
					class: "my-servers__add-form",
					onSubmit: tn(g, ["prevent"])
				}, [
					t[11] ||= N("p", { class: "my-servers__add-help" }, [
						P(" On your media server, open "),
						N("strong", null, "Settings → Connect to hub"),
						P(" to get a claim code, then paste it here. ")
					], -1),
					t[12] ||= N("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					en(N("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => f.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: p.value
					}, null, 8, Qi), [[Qt, f.value]]),
					m.value ? (B(), M("p", $i, W(m.value), 1)) : j("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-68e5a4d7"]]), ta = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, na = {
	key: 0,
	class: "federation__skel"
}, ra = {
	key: 2,
	class: "federation__content"
}, ia = {
	key: 1,
	class: "federation__table-wrap"
}, aa = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, oa = { class: "federation__name" }, sa = { class: "federation__url" }, ca = { class: "federation__num" }, la = { class: "federation__date" }, ua = ["data-testid"], da = { class: "federation__actions" }, fa = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, pa = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? x, n = C(), r = V([]), i = V(!0), a = V(null), o = V(""), s = V(""), c = V(""), l = V(!1);
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
				a.value = v(e, "Failed to load federation peers."), n.error(a.value);
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
					n.error(v(e, "Failed to add peer."));
				} finally {
					l.value = !1;
				}
			}
		}
		async function f(e) {
			try {
				await t.delete(`/api/v1/me/federation/peers/${e}`), n.success("Peer removed."), await u();
			} catch (e) {
				n.error(v(e, "Failed to remove peer."));
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
		return z(() => u(!0)), (e, t) => (B(), M("section", ta, [t[10] ||= N("header", { class: "federation__head" }, [N("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), N("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), M("div", na, [F(E, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), A(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: q(() => [F(w, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: q(() => [...t[4] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (B(), M("div", ra, [
			t[9] ||= N("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), A(D, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), M("div", ia, [N("table", aa, [t[6] ||= N("thead", null, [N("tr", null, [
				N("th", { scope: "col" }, "Peer"),
				N("th", { scope: "col" }, "Shared libraries"),
				N("th", { scope: "col" }, "Last sync"),
				N("th", { scope: "col" }, "Status"),
				N("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), N("tbody", null, [(B(!0), M(O, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
				N("td", null, [N("div", oa, W(e.name), 1), N("div", sa, W(e.url), 1)]),
				N("td", ca, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				N("td", la, W(p(e.last_sync)), 1),
				N("td", null, [N("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [F(T, { tone: h(e.status) }, {
					default: q(() => [P(W(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ua)]),
				N("td", null, [N("div", da, [F(w, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: q(() => [...t[5] ||= [P(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			N("section", fa, [t[8] ||= N("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), N("form", {
				class: "federation__form",
				onSubmit: tn(d, ["prevent"])
			}, [
				en(N("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[Qt, s.value]]),
				en(N("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[Qt, o.value]]),
				en(N("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[Qt, c.value]]),
				F(w, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: q(() => [...t[7] ||= [P(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-6fe106b1"]]), ma = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, ha = {
	key: 0,
	class: "shares__skel"
}, ga = {
	key: 3,
	class: "shares__table-wrap"
}, _a = {
	class: "shares__table",
	"aria-label": "Library shares"
}, va = { class: "shares__library" }, ya = { class: "shares__date" }, ba = { class: "shares__date" }, xa = ["data-testid"], Sa = { class: "shares__actions" }, Ca = /*#__PURE__*/ t(/* @__PURE__ */ I({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? x, n = C(), r = V([]), i = V(!0), a = V(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Bi(e.created_at) ?? "",
					expires_at: Bi(e.expires_at)
				}));
			} catch (e) {
				a.value = v(e, "Failed to load shares."), n.error(a.value);
			} finally {
				e && (i.value = !1);
			}
		}
		async function s(e) {
			try {
				await t.delete(`/api/v1/me/shares/${e}`), n.success("Share revoked."), await o();
			} catch (e) {
				n.error(v(e, "Failed to revoke share."));
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
		return z(() => o(!0)), (e, t) => (B(), M("section", ma, [t[5] ||= N("header", { class: "shares__head" }, [N("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), N("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), M("div", ha, [F(E, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), A(D, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: q(() => [F(w, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: q(() => [...t[1] ||= [P("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), A(D, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (B(), M("div", ga, [N("table", _a, [t[4] ||= N("thead", null, [N("tr", null, [
			N("th", { scope: "col" }, "Library"),
			N("th", { scope: "col" }, "Shared with"),
			N("th", { scope: "col" }, "Permissions"),
			N("th", { scope: "col" }, "Created"),
			N("th", { scope: "col" }, "Expires"),
			N("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), N("tbody", null, [(B(!0), M(O, null, H(r.value, (e) => (B(), M("tr", { key: e.id }, [
			N("td", null, [N("span", va, W(e.library_name), 1)]),
			N("td", null, W(e.shared_with), 1),
			N("td", null, [F(T, { tone: u(e.permissions) }, {
				default: q(() => [P(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			N("td", ya, W(c(e.created_at)), 1),
			N("td", ba, [N("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [P(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), A(T, {
				key: 0,
				tone: "error"
			}, {
				default: q(() => [...t[2] ||= [P("Expired", -1)]]),
				_: 1
			})) : j("", !0)], 8, xa)]),
			N("td", null, [N("div", Sa, [F(w, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: q(() => [...t[3] ||= [P(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-31edd2a2"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function wa(e, t) {
	let n = Xe(), r = !1;
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
//#region src/composables/spatial-nav.ts
function Ta(e) {
	return {
		x: (e.left + e.right) / 2,
		y: (e.top + e.bottom) / 2
	};
}
var Ea = .5, Da = 2, Oa = 1e6;
function ka(e, t, n, r) {
	return e < r && n < t;
}
function Aa(e, t, n) {
	let r = Ta(e), i = null, a = Infinity;
	for (let o of n) {
		let n = Ta(o.rect), s, c, l;
		switch (t) {
			case "right":
				if (n.x <= r.x + Ea) continue;
				s = n.x - r.x, c = Math.abs(n.y - r.y), l = ka(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "left":
				if (n.x >= r.x - Ea) continue;
				s = r.x - n.x, c = Math.abs(n.y - r.y), l = ka(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "down":
				if (n.y <= r.y + Ea) continue;
				s = n.y - r.y, c = Math.abs(n.x - r.x), l = ka(e.left, e.right, o.rect.left, o.rect.right);
				break;
			case "up":
				if (n.y >= r.y - Ea) continue;
				s = r.y - n.y, c = Math.abs(n.x - r.x), l = ka(e.left, e.right, o.rect.left, o.rect.right);
				break;
		}
		let u = s + Da * c;
		l && (u -= Oa), (u < a || u === a && (i === null || o.id < i.id)) && (a = u, i = o);
	}
	return i;
}
//#endregion
//#region src/composables/useSpatialNav.ts
var ja = {
	up: ["ArrowUp"],
	down: ["ArrowDown"],
	left: ["ArrowLeft"],
	right: ["ArrowRight"]
};
function Ma(e) {
	return {
		left: e.left,
		top: e.top,
		right: e.right,
		bottom: e.bottom
	};
}
function Na(e) {
	return e.width <= 0 && e.height <= 0;
}
function Pa() {
	let e = Array.from(X), t = (e) => {
		let t = e.getAttribute("data-focus-order");
		if (t === null || t === "") return Infinity;
		let n = Number(t);
		return Number.isFinite(n) ? n : Infinity;
	};
	return e.map((e, n) => ({
		el: e,
		i: n,
		order: t(e)
	})).sort((e, t) => e.order - t.order || e.i - t.i).map((e) => e.el);
}
function Fa(e = {}) {
	let t = {
		...ja,
		...e.keymap
	};
	function n() {
		let e = [], t = /* @__PURE__ */ new Map(), n = 0;
		for (let r of X) {
			let i = r.getBoundingClientRect();
			if (Na(i)) continue;
			let a = String(n++);
			e.push({
				id: a,
				rect: Ma(i)
			}), t.set(a, r);
		}
		return {
			candidates: e,
			byId: t
		};
	}
	function r(e, t) {
		let n = typeof document < "u" ? document.activeElement : null;
		if (n && X.has(n)) {
			let e = n.getBoundingClientRect();
			if (!Na(e)) return Ma(e);
		}
		let r = t[0];
		return r && e.has(r.id) ? r.rect : null;
	}
	function i(t) {
		let { candidates: i, byId: a } = n();
		if (i.length === 0) return e.onEdge?.(t), !1;
		let o = r(a, i);
		if (!o) return e.onEdge?.(t), !1;
		let s = typeof document < "u" ? document.activeElement : null, c = Aa(o, t, s ? i.filter((e) => a.get(e.id) !== s) : i);
		return c ? (a.get(c.id)?.focus(), !0) : (e.onEdge?.(t), !1);
	}
	function a(e) {
		for (let n of [
			"up",
			"down",
			"left",
			"right"
		]) if (t[n]?.includes(e)) return n;
		return null;
	}
	function o(t) {
		if (!Xt(e.enabled ?? !1) || t.ctrlKey || t.metaKey || t.altKey || he(t.target) || document.activeElement?.closest("[data-focus-trap]") || t.target?.closest?.("[data-focus-trap]")) return;
		let n = a(t.key);
		n && i(n) && t.preventDefault();
	}
	function s(e) {
		if (e) {
			if (typeof e == "string") {
				if (typeof document > "u") return;
				document.querySelector(e)?.focus();
				return;
			}
			e.focus();
		}
	}
	function c() {
		Pa()[0]?.focus();
	}
	return z(() => {
		typeof document < "u" && document.addEventListener("keydown", o);
	}), R(() => {
		typeof document < "u" && document.removeEventListener("keydown", o);
	}), {
		focus: s,
		move: i,
		focusFirst: c,
		registry: X
	};
}
//#endregion
//#region src/composables/useOnline.ts
function Ia() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), qt(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Jt(t);
}
//#endregion
export { dt as ALL_LOGS, xt as AdminBackupApi, St as AdminCastApi, Et as AdminCollectionsApi, ft as AdminDashboardApi, Ct as AdminDlnaServerApi, Dt as AdminHistoryApi, It as AdminHubDashboardApi, bt as AdminIntegrationsApi, At as AdminLibrariesApi, Tt as AdminLiveTvApi, ut as AdminLogsApi, lt as AdminMetadataSourcesApi, Ft as AdminPluginsApi, wt as AdminRemoteAccessApi, yt as AdminServicesApi, jt as AdminSettingsApi, Ot as AdminSyncPlayApi, ht as AdminUsersApi, vt as AdminWebhooksApi, re as ApiClient, te as ApiError, e as AppBackdrop, wn as AppLayout, T as Badge, w as Button, Be as CONNECTION_API_BASE_KEY, Ie as CONNECTION_CONFIRMED_ORIGIN_KEY, Tr as CURRENT_SERVER_ID_KEY, Er as CURRENT_SERVER_NAME_KEY, Je as Chip, Ze as Combobox, u as DEFAULT_CAPTION_STYLE, f as DEFAULT_MESSAGES, c as DEFAULT_PREFERENCES, D as EmptyState, pa as FederationPage, Qe as FilterBar, n as Icon, r as IconButton, Ce as Kbd, kt as LIBRARY_TYPES, Ri as LibraryScanPage, g as LocalStorageTokenStore, Lt as LoginForm, Ca as ManageSharesPage, rt as MediaCard, ot as MediaDetail, it as MediaGrid, je as MediaHomeRow, at as MediaRow, tt as Menu, st as MetadataMatchModal, i as Modal, ea as MyServersPage, ie as NetworkError, Nt as PLUGIN_SECRET_MASK, $e as PageHint, Ei as PageTransition, vr as PhlixApp, pt as RATING_LABELS, mt as RATING_OPTIONS, de as RESUME_MAX_RATIO, ce as RESUME_MIN_SECONDS, Ti as Reveal, Te as SORT_TITLE_ARTICLES, gt as SUBSCRIBABLE_EVENTS, Ye as Select, zt as SettingsForm, mn as Sheet, Rt as SignupForm, E as Skeleton, Ke as Slider, ct as SourcePriorityEditor, ye as Spinner, qe as Switch, y as TMDB_UNCONFIGURED_CODE, et as Tabs, me as ThumbRating, _ as TimeoutError, wi as ToastHost, _e as Tooltip, _t as WEBHOOK_EVENT_CATEGORIES, si as adminMenu, ir as applyStoredThemeEarly, Aa as bestCandidate, wa as bindMediaStoreToRouter, ii as buildAdminRoutes, oi as buildHubAdminRoutes, fe as buildMediaQuery, le as buildMediaUrl, ai as buildServerAdminRoutes, $r as commonAdminPages, we as compareByStrippedTitle, gi as createPhlixApp, p as createTranslator, tr as deriveAccentVars, v as errMessage, Ee as fetchLibraries, Cr as focusable, X as focusableRegistry, Ge as formatPageTitle, xe as fuzzyScore, ee as getDefaultApiHeaders, l as hasStoredPreferences, ti as hubAdminPages, wr as installFocusable, Re as isAllowedBase, b as isOffline, Pe as isPlaintextPublic, Me as isPrivateHost, h as isTmdbUnconfigured, Se as matchCommand, d as mergeMessages, Le as normalizeBase, ze as originOf, Pt as pluginErrorCode, Mt as pluginValidationErrors, Ne as probeServer, s as readStoredPreferences, Ta as rectCenter, ei as serverAdminPages, Ue as setAppName, ne as setDefaultApiHeaders, We as setPageTitle, Oe as sortLibraries, De as stripLeadingArticle, oe as useApiBase, S as useAuthStore, or as useCommandPaletteHotkey, be as useCommandStore, Fe as useConnectionStore, a as useFocusTrap, ke as useLibrariesStore, ae as useMediaApiBase, Xe as useMediaStore, m as useMessages, Ia as useOnline, He as usePageTitle, ue as usePlayerStore, ur as usePreconnect, o as usePreferencesStore, nt as usePrefetch, mr as useResumeReporter, Ae as useResumeSync, kr as useServerStore, Fa as useSpatialNav, ar as useTheme, C as useToastStore, pe as useUserItemDataStore, Ve as withScheme };

//# sourceMappingURL=phlix-ui.js.map