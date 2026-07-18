import { r as e } from "./AuthField-k2v6oKGF.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-X5skTbAE.js";
import { n as r, t as i } from "./Modal-BtA0owzl.js";
import { t as a } from "./useFocusTrap-DZxA3ZEr.js";
import { a as o, i as s, n as c, r as l, t as u } from "./usePreferencesStore-C9GLbD7G.js";
import { i as d, n as f, r as p, t as m } from "./useMessages-Cbrqh0Aa.js";
import { a as h, c as g, d as _, f as v, i as y, l as b, n as x, p as S, r as C, s as w, t as ee, u as te } from "./client-D1nDQ0cP.js";
import { n as ne, t as re } from "./useApiBase-CV_r-Kk4.js";
import { t as T } from "./useAuthStore-C_Rnq3Bo.js";
import { i as ie, n as ae, r as oe, t as se } from "./usePlayerStore-Dgw0JCWb.js";
import { t as E } from "./useToastStore-BDoKlU6N.js";
import { n as ce, t as le } from "./ThumbRating-Db3pVsxe.js";
import { i as ue, o as de } from "./shortcuts-BJjIEmOV.js";
import { n as fe, t as pe } from "./NetworkHealthIndicator-giSnQwuF.js";
import { t as me } from "./Spinner-DjAfI4qB.js";
import { i as he, n as ge, r as _e, t as ve } from "./Kbd-Bmk72RCb.js";
import { a as ye, i as be, n as xe, o as Se, r as Ce, t as we } from "./useLibrariesStore-B4M08nqy.js";
import { n as Te, t as Ee } from "./HomeRow-BxTtxxky.js";
import { a as De, c as Oe, i as ke, l as Ae, n as je, o as Me, r as Ne, s as Pe, t as Fe, u as Ie } from "./useConnectionStore-DvIGHfR-.js";
import { i as Le, n as Re, r as ze, t as Be } from "./usePageTitle-BO3GGF3M.js";
import { t as D } from "./Button-DGsvHynO.js";
import { t as O } from "./Badge-D_aUH3dO.js";
import { t as Ve } from "./Slider-LnnvB5jy.js";
import { t as He } from "./Switch-DyS2L5gX.js";
import { t as Ue } from "./Chip-Dqypy8Bt.js";
import { t as We } from "./Select-Dl5D-rQ_.js";
import { n as Ge, t as Ke } from "./useMediaStore-B2Y6eUkm.js";
import { t as k } from "./Skeleton-DhQmxeNg.js";
import { t as A } from "./EmptyState-CfyGawh7.js";
import { t as qe } from "./PageHint-CPoTKHik.js";
import { t as Je } from "./Tabs-D8iKNBl3.js";
import { t as Ye } from "./Menu-DRkKveJV.js";
import { i as Xe, t as Ze } from "./MediaCard-Bw8kTlnW.js";
import { t as Qe } from "./MediaGrid-DiYE-63g.js";
import { t as $e } from "./MediaRow-0gcH6vVK.js";
import { n as et, t as tt } from "./media-query-DKjhlX8r.js";
import { n as nt, t as rt } from "./metadata-sources-CxfvM6nA.js";
import { n as it, t as at } from "./logs-DadTfaTq.js";
import { t as ot } from "./dashboard-BTCOCTHQ.js";
import { i as st, n as ct, r as lt, t as ut } from "./users-DwUPu6Js.js";
import { n as dt, r as ft, t as pt } from "./webhooks-BBTLnFKm.js";
import { t as mt } from "./services-C907MGdw.js";
import { t as ht } from "./integrations-DLAG9ISY.js";
import { t as gt } from "./backup-IdY_vzc2.js";
import { t as _t } from "./cast-BvFcBEB6.js";
import { t as vt } from "./dlnaServer-B5Sg4MkS.js";
import { t as yt } from "./remoteAccess-DVKRpKQ8.js";
import { t as bt } from "./liveTv-Dbjt901v.js";
import { t as xt } from "./collections-CH3HLdcd.js";
import { t as St } from "./history-Cz9DDbWX.js";
import { t as Ct } from "./syncPlay-DPzJkgkK.js";
import { n as wt, t as Tt } from "./libraries-hKYggP3R.js";
import { t as Et } from "./settings-m4upFcmH.js";
import { i as Dt, n as Ot, r as kt, t as At } from "./plugins-DsJGlqh0.js";
import { t as jt } from "./hubDashboard-BhOaaDD-.js";
import { t as Mt } from "./LoginForm-hTYm6JMs.js";
import { t as Nt } from "./SignupForm-DiXxcoiq.js";
import { t as Pt } from "./SettingsForm-CmpSLeHc.js";
import { t as Ft } from "./Input-D6hY0oF5.js";
import { Fragment as j, Teleport as It, Transition as Lt, TransitionGroup as Rt, computed as M, createApp as zt, createBlock as N, createCommentVNode as P, createElementBlock as F, createElementVNode as I, createTextVNode as L, createVNode as R, defineAsyncComponent as Bt, defineComponent as z, inject as Vt, normalizeClass as B, normalizeStyle as Ht, onBeforeUnmount as Ut, onMounted as V, onScopeDispose as Wt, openBlock as H, readonly as Gt, ref as U, renderList as W, renderSlot as G, resolveDynamicComponent as Kt, toDisplayString as K, toValue as qt, unref as q, useId as Jt, vModelSelect as Yt, vModelText as Xt, vShow as Zt, watch as J, watchEffect as Qt, withCtx as Y, withDirectives as X, withModifiers as $t } from "vue";
import { createPinia as en, defineStore as tn } from "pinia";
import { RouterLink as Z, RouterView as nn, createRouter as rn, createWebHistory as an, useRouter as on } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var sn = ["aria-labelledby"], cn = {
	key: 0,
	class: "phlix-sheet__header"
}, ln = ["id"], un = { class: "phlix-sheet__body" }, dn = {
	key: 1,
	class: "phlix-sheet__footer"
}, fn = /*#__PURE__*/ t(/* @__PURE__ */ z({
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
		let n = e, i = t, o = U(n.modelValue);
		J(() => n.modelValue, (e) => o.value = e);
		let s = U(null), c = Jt();
		function l() {
			i("update:modelValue", !1), i("close");
		}
		function u() {
			n.dismissible && l();
		}
		return a(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (H(), N(It, { to: "body" }, [R(Lt, { name: `phlix-sheet-${e.side}` }, {
			default: Y(() => [e.modelValue ? (H(), F("div", {
				key: 0,
				class: B(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: $t(u, ["self"])
			}, [I("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? q(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (H(), F("header", cn, [e.title ? (H(), F("h2", {
					key: 0,
					id: q(c),
					class: "phlix-sheet__title"
				}, K(e.title), 9, ln)) : P("", !0), e.hideClose ? P("", !0) : (H(), N(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : P("", !0),
				I("div", un, [G(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (H(), F("footer", dn, [G(t.$slots, "footer", {}, void 0, !0)])) : P("", !0)
			], 8, sn)], 34)) : P("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6ff9e0f5"]]);
//#endregion
//#region src/composables/useHeaderHideOnScroll.ts
function pn() {
	let e = U(0), t = U("none"), n = U(!1), r = U(!1);
	function i() {
		if (typeof window > "u" || r.value) return;
		let i = window.scrollY, a = i - e.value;
		Math.abs(a) > 50 && (t.value = a > 0 ? "down" : "up", e.value = i), i > 50 ? n.value = t.value === "down" : n.value = !1;
	}
	return typeof window < "u" && typeof window.addEventListener == "function" && (typeof window.matchMedia == "function" && (r.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches, window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
		r.value = e.matches, r.value && (n.value = !1, t.value = "none");
	})), window.addEventListener("scroll", i, { passive: !0 }), Wt(() => {
		window.removeEventListener("scroll", i);
	}), i()), {
		isHidden: Gt(n),
		scrollDirection: Gt(t)
	};
}
//#endregion
//#region src/app/AppLayout.vue?vue&type=script&setup=true&lang.ts
var mn = { class: "shell" }, hn = {
	class: "shell__skip",
	href: "#main"
}, gn = { class: "shell__inner" }, _n = { class: "shell__brand" }, vn = ["aria-label"], yn = { class: "shell__actions" }, bn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, xn = {
	key: 0,
	class: "shell__footer"
}, Sn = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "AppLayout",
	setup(t) {
		let n = o(), i = U(!1), { t: a } = m(), { isHidden: s } = pn();
		return (t, o) => (H(), F("div", mn, [
			I("a", hn, K(q(a)("shell.skipToContent")), 1),
			R(e, { enabled: q(n).atmosphere }, null, 8, ["enabled"]),
			I("header", { class: B(["shell__bar", { "is-hidden": q(s) }]) }, [I("div", gn, [
				I("div", _n, [G(t.$slots, "logo", {}, () => [o[3] ||= I("span", { class: "shell__wordmark" }, [L("Phlix"), I("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				I("nav", {
					class: "shell__nav",
					"aria-label": q(a)("shell.primaryNav")
				}, [G(t.$slots, "nav", {}, void 0, !0)], 8, vn),
				o[4] ||= I("span", { class: "shell__spacer" }, null, -1),
				I("div", yn, [G(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (H(), N(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: q(a)("shell.openMenu"),
					variant: "ghost",
					onClick: o[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : P("", !0)
			])], 2),
			I("main", bn, [G(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (H(), F("footer", xn, [G(t.$slots, "footer", {}, void 0, !0)])) : P("", !0),
			R(fn, {
				modelValue: i.value,
				"onUpdate:modelValue": o[2] ||= (e) => i.value = e,
				side: "left",
				title: q(a)("shell.menu")
			}, {
				default: Y(() => [I("nav", {
					class: "shell__drawer",
					onClick: o[1] ||= (e) => i.value = !1
				}, [G(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-bdbc790a"]]), Cn = /* @__PURE__ */ z({
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
		}, c = M(() => {
			let e = i.indexOf(t.theme);
			return i[(e + 1) % i.length];
		}), l = M(() => a[t.theme] ?? "moon"), u = M(() => n("shell.themeToggleLabel", {
			current: s[t.theme] ?? t.theme,
			next: s[c.value]
		}));
		function d() {
			t.theme = c.value;
		}
		return (e, t) => (H(), N(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), wn = ["aria-label", "aria-expanded"], Tn = {
	key: 0,
	class: "usermenu__avatar"
}, En = ["src", "alt"], Dn = {
	key: 1,
	class: "usermenu__avatar-initials"
}, On = ["aria-label"], kn = { class: "usermenu__head" }, An = { class: "usermenu__avatar usermenu__avatar--lg" }, jn = ["src", "alt"], Mn = {
	key: 1,
	class: "usermenu__avatar-initials"
}, Nn = { class: "usermenu__name" }, Pn = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "UserMenu",
	setup(e) {
		let t = T(), r = on(), i = Vt("phlixConfig", null), o = M(() => i?.routerBase ?? "/app"), { t: s } = m(), c = U(!1), l = U(null), u = U(null), d = M(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = U(!1);
		function p(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		J(() => t.user?.avatar_url, () => {
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
		return J(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", v, !0) : document.removeEventListener("pointerdown", v, !0));
		}), Ut(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", v, !0);
		}), (e, r) => (H(), F("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [I("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": q(t).isLoggedIn ? q(s)("shell.accountNamed", { name: d.value }) : q(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[1] ||= (e) => c.value = !c.value
		}, [q(t).isLoggedIn ? (H(), F("span", Tn, [q(t).user?.avatar_url && !f.value ? (H(), F("img", {
			key: 0,
			src: q(t).user.avatar_url,
			alt: d.value,
			class: "usermenu__avatar-img",
			onError: r[0] ||= (e) => f.value = !0
		}, null, 40, En)) : (H(), F("span", Dn, K(p(d.value)), 1))])) : (H(), N(n, {
			key: 1,
			name: "user"
		}))], 8, wn), c.value ? (H(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": q(s)("shell.account"),
			tabindex: "-1"
		}, [q(t).isLoggedIn ? (H(), F(j, { key: 0 }, [
			I("div", kn, [I("span", An, [q(t).user?.avatar_url && !f.value ? (H(), F("img", {
				key: 0,
				src: q(t).user.avatar_url,
				alt: d.value,
				class: "usermenu__avatar-img",
				onError: r[2] ||= (e) => f.value = !0
			}, null, 40, jn)) : (H(), F("span", Mn, K(p(d.value)), 1))]), I("span", Nn, K(d.value), 1)]),
			I("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[3] ||= (e) => g(`${o.value}/history`)
			}, [R(n, { name: "film" }), L(" " + K(q(s)("shell.watchHistory")), 1)]),
			I("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[4] ||= (e) => g(`${o.value}/settings`)
			}, [R(n, { name: "settings" }), L(" " + K(q(s)("shell.settings")), 1)]),
			I("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: _
			}, [R(n, { name: "log-out" }), L(" " + K(q(s)("shell.signOut")), 1)])
		], 64)) : (H(), F("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[5] ||= (e) => g(`${o.value}/login`)
		}, [R(n, { name: "user" }), L(" " + K(q(s)("shell.signIn")), 1)]))], 8, On)) : P("", !0)], 512));
	}
}), [["__scopeId", "data-v-2a0ffb08"]]), Fn = ["aria-label"], In = ["src", "poster"], Ln = { class: "mini__body" }, Rn = { class: "mini__title" }, zn = { class: "mini__controls" }, Bn = ["aria-label"], Vn = ["aria-label", "aria-pressed"], Hn = ["aria-label"], Un = ["aria-label"], Wn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Gn = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = ie(), { t: a } = m(), o = U(null), s = U(null), c = ce(), l = Vt("phlixConfig", null), u = M(() => i.current ? c.isFavorite(i.current.id) : !1);
		function d() {
			let e = i.current?.id;
			e && c.toggleFavorite(e, l?.apiBase ?? "");
		}
		let f = M(() => i.miniPlayer && !!i.current && (!!i.streamUrl || !!i.hlsMasterUrl)), p = M(() => i.current?.name ?? ""), h = M(() => Math.max(0, Math.min(1, i.progress)));
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
		function y() {
			let e = o.value;
			e && i.updateProgress(e.currentTime, e.duration);
		}
		function b() {
			let e = o.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function x() {
			i.current && r("expand", i.current.id);
		}
		function S() {
			i.closePlayer();
		}
		async function C() {
			let e = o.value;
			!e || !i.hlsMasterUrl || (s.value?.destroy(), s.value = null, s.value = await de(e, i.hlsMasterUrl, {
				startPosition: i.position,
				onReady: () => {
					let e = o.value;
					e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, i.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return J(() => f.value, async (e) => {
			if (!e) {
				s.value?.destroy(), s.value = null;
				return;
			}
			!i.hlsMasterUrl || i.streamUrl || await C();
		}), V(async () => {
			f.value && i.hlsMasterUrl && !i.streamUrl && await C();
		}), J(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), J(() => i.lastCommand, (e) => {
			let t = o.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : i.position + e.value, r = t.duration && t.duration > 0 ? t.duration : i.duration, a = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = a, i.updateProgress(a, t.duration || void 0);
		}), Ut(() => {
			s.value?.destroy(), s.value = null, o.value?.pause?.();
		}), (e, t) => (H(), N(Lt, { name: "mini" }, {
			default: Y(() => [f.value ? (H(), F("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": q(a)("player.miniPlayer")
			}, [
				I("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: q(i).hlsMasterUrl ? "" : q(i).streamUrl,
					poster: q(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: g,
					onPlay: _,
					onPause: v,
					onTimeupdate: y,
					onClick: x
				}, null, 40, In),
				I("div", Ln, [I("p", Rn, K(p.value), 1), I("div", zn, [
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(i).playing ? q(a)("player.pause") : q(a)("player.play"),
						onClick: b
					}, [R(n, { name: q(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Bn),
					q(i).current ? (H(), F("button", {
						key: 0,
						type: "button",
						class: B(["mini__btn mini__btn--favorite", { "is-on": u.value }]),
						"aria-label": u.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": u.value ? "true" : "false",
						onClick: d
					}, [R(n, { name: u.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Vn)) : P("", !0),
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": q(a)("player.expand"),
						onClick: x
					}, [R(n, { name: "expand" })], 8, Hn),
					I("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": q(a)("player.closePlayer"),
						onClick: S
					}, [R(n, { name: "x" })], 8, Un)
				])]),
				I("div", Wn, [I("div", {
					class: "mini__progress-fill",
					style: Ht({ transform: `scaleX(${h.value})` })
				}, null, 4)])
			], 8, Fn)) : P("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
//#region src/composables/color.ts
function Kn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var qn = (e) => Math.max(0, Math.min(255, Math.round(e))), Jn = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => qn(e).toString(16).padStart(2, "0")).join("");
function Yn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Xn(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Zn = ({ r: e, g: t, b: n }, r) => `rgba(${qn(e)}, ${qn(t)}, ${qn(n)}, ${r})`;
function Qn({ r: e, g: t, b: n }) {
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
function $n(e) {
	let t = Kn(e);
	if (!t) return null;
	let n = Qn(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Jn(t),
		"--accent-hover": Jn(Yn(t, .12)),
		"--accent-active": Jn(Xn(t, .12)),
		"--accent-soft": Zn(t, .14),
		"--accent-ring": Zn(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var er = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function tr(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion"), e.tv ? n.setAttribute("data-tv", "true") : n.removeAttribute("data-tv");
	let r = e.accent ? $n(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of er) n.style.removeProperty(e);
}
function nr(e, t) {
	let n = s(), r = !l();
	e && r && (n.theme = e), t !== void 0 && r && (n.tv = t), tr(n, n.reducedMotion === "on" || n.reducedMotion !== "off" && typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function rr() {
	let e = o();
	return Qt(() => {
		tr({
			theme: e.theme,
			density: e.density,
			accent: e.accent,
			tv: e.tv
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function ir() {
	let e = he(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), Wt(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function ar(e, t) {
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
function or(e) {
	let t = ar(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = ar(n, t);
	return !r || t && r === t ? null : r;
}
function sr(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (ar(e.href) === t) return !0;
	return !1;
}
function cr(e, t, n, r) {
	if (sr(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function lr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = ar(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = ar(e);
		r && (n && r === n || a.has(r) || (a.add(r), cr("preconnect", r, t.crossOrigin === !0, i), cr("dns-prefetch", r, !1, i)));
	}
	i.length && Wt(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeReporter.ts
var ur = "phlix.deviceId", dr = 15e3;
function fr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(ur);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(ur, e)), e;
	} catch {
		return "web";
	}
}
function pr() {
	let e = ie(), t = T(), n = fr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < dr)) {
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
	return J(() => Math.floor(e.position), () => void s()), J(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var mr = ["src", "alt"], hr = { class: "brand-wordmark" }, gr = {
	key: 1,
	class: "brand-tagline"
}, _r = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "PhlixApp",
	setup(e) {
		rr();
		let t = he(), i = on(), { t: a } = m();
		ir();
		let o = Bt(() => import("./CommandPalette-CEzemRW2.js")), s = U(!1);
		J(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = Vt("phlixConfig", null);
		lr(or({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = T(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = Te();
		J(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), pr();
		let p = M(() => l?.branding ?? {}), h = M(() => p.value.wordmark ?? "Phlix"), g = M(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = M(() => l?.home ?? l?.routerBase ?? "/app"), v = we(), y = M(() => g.value.some((e) => e.libraryLinks));
		J(() => u.isLoggedIn && y.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function b(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (H(), N(Sn, null, {
			logo: Y(() => [R(q(Z), {
				to: _.value,
				class: "brand"
			}, {
				default: Y(() => [
					p.value.logoSrc ? (H(), F("img", {
						key: 0,
						src: p.value.logoSrc,
						alt: p.value.logoAlt ?? h.value,
						class: "brand-logo"
					}, null, 8, mr)) : P("", !0),
					I("span", hr, [L(K(h.value), 1), i[1] ||= I("span", { class: "brand-dot" }, ".", -1)]),
					p.value.tagline ? (H(), F("span", gr, K(p.value.tagline), 1)) : P("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Y(() => [g.value.length ? (H(!0), F(j, { key: 0 }, W(g.value, (e) => (H(), F(j, { key: e.id }, [(H(), N(Kt(e.href ? "a" : q(Z)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? b(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Y(() => [e.icon ? (H(), N(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : P("", !0), L(" " + K(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (H(!0), F(j, null, W(e.libraryLinks ? q(v).items : [], (t) => (H(), N(q(Z), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: Y(() => [L(K(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (H(), F(j, { key: 1 }, [
				R(q(Z), {
					to: _.value,
					class: "nav-link"
				}, {
					default: Y(() => [L(K(q(a)("shell.browse")), 1)]),
					_: 1
				}, 8, ["to"]),
				R(q(Z), {
					to: `${_.value}/recommendations`,
					class: "nav-link"
				}, {
					default: Y(() => [L(K(q(a)("shell.recommendations")), 1)]),
					_: 1
				}, 8, ["to"]),
				R(q(Z), {
					to: `${_.value}/explore`,
					class: "nav-link"
				}, {
					default: Y(() => [L(K(q(a)("shell.explore")), 1)]),
					_: 1
				}, 8, ["to"]),
				R(q(Z), {
					to: `${_.value}/syncplay`,
					class: "nav-link"
				}, {
					default: Y(() => [L(K(q(a)("syncplay.syncPlay")), 1)]),
					_: 1
				}, 8, ["to"]),
				R(q(Z), {
					to: `${_.value}/music`,
					class: "nav-link"
				}, {
					default: Y(() => [L(K(q(a)("music.nav")), 1)]),
					_: 1
				}, 8, ["to"]),
				R(q(Z), {
					to: `${_.value}/settings`,
					class: "nav-link"
				}, {
					default: Y(() => [L(K(q(a)("shell.settings")), 1)]),
					_: 1
				}, 8, ["to"])
			], 64))]),
			actions: Y(() => [
				R(r, {
					name: "search",
					label: q(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => q(t).openPalette()
				}, null, 8, ["label"]),
				R(Cn),
				q(u).isAdmin ? (H(), N(pe, { key: 0 })) : P("", !0),
				R(Pn)
			]),
			default: Y(() => [
				R(q(nn)),
				s.value ? (H(), N(q(o), { key: 0 })) : P("", !0),
				q(u).isLoggedIn ? (H(), N(Gn, {
					key: 1,
					onExpand: c
				})) : P("", !0)
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-df585b3a"]]), vr = { class: "phlix-placeholder" }, yr = { class: "placeholder-content" }, br = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (H(), F("div", vr, [I("div", yr, [n[0] ||= I("h1", null, "Shared UI loading...", -1), I("p", null, "Phlix " + K(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-576c7f48"]]), Q = /* @__PURE__ */ new Set();
function xr(e, t) {
	e.hasAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.setAttribute("data-focusable", ""), t?.group == null ? e.removeAttribute("data-focus-group") : e.setAttribute("data-focus-group", String(t.group)), t?.order == null ? e.removeAttribute("data-focus-order") : e.setAttribute("data-focus-order", String(t.order)), t?.disabled ? Q.delete(e) : Q.add(e);
}
var Sr = {
	mounted(e, t) {
		xr(e, t.value);
	},
	updated(e, t) {
		xr(e, t.value);
	},
	unmounted(e) {
		Q.delete(e);
	}
};
function Cr(e) {
	e.directive("focusable", Sr);
}
//#endregion
//#region src/stores/useServerStore.ts
var wr = "phlix.currentServerId", Tr = "phlix.currentServerName", Er = "phlix.currentServerUrl";
function Dr(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e);
	} catch {
		return null;
	}
}
function Or(e, t) {
	if (!(typeof window > "u")) try {
		t === null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, t);
	} catch {}
}
var kr = tn("server", () => {
	let e = U(Dr(wr)), t = U(Dr(Tr)), n = U(Dr(Er)), r = M(() => e.value !== null);
	function i(r, i, a) {
		e.value = r, t.value = i ?? null, n.value = a && a !== "" ? a : null, Or(wr, r), Or(Tr, i ?? null), Or(Er, n.value);
	}
	function a() {
		e.value = null, t.value = null, n.value = null, Or(wr, null), Or(Tr, null), Or(Er, null);
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
	component: () => import("./DashboardPage-COy609Cz.js")
}, jr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-C_kGWQkT.js")
}, Mr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-CVhi-wYr.js")
}, Nr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-CF8679PE.js")
}, Pr = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-Dpfdhn4_.js")
}, Fr = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-Z3HEJSFQ.js")
}, Ir = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-Bh8qCYwf.js")
}, Lr = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-vB_AoYFj.js")
}, Rr = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-XDrmP9G-.js")
}, zr = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-hA8SGI8h.js")
}, Br = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-LuG7oKru.js")
}, Vr = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-DjFWqOje.js")
}, Hr = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-CYmYrA2r.js")
}, Ur = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-f2BYiI7P.js")
}, Wr = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-D_Y-PjjW.js")
}, Gr = {
	name: "admin-duplicates",
	path: "duplicates",
	label: "Duplicates",
	icon: "filter",
	component: () => import("./DuplicatesPage-Zo0lijQ0.js")
}, Kr = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-BXg3fwqV.js")
}, qr = {
	name: "admin-transcoding",
	path: "transcoding",
	label: "Transcoding",
	icon: "play",
	component: () => import("./TranscodingSettingsPage-Cmt3M0Q8.js")
}, Jr = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-C3p3jwM4.js")
}, Yr = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-Bou9WvKf.js")
}, Xr = {
	name: "admin-metrics",
	path: "metrics",
	label: "Server Traffic",
	icon: "speed",
	component: () => import("./MetricsPage-DMVtxSgz.js")
}, Zr = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-CsOd_9Ye.js")
}, Qr = {
	name: "admin-requests",
	path: "requests",
	label: "Request Queue",
	icon: "list",
	component: () => import("./RequestsPage-poOvUu_f.js")
}, $r = Object.fromEntries([
	Ar,
	Xr,
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
	Zr,
	Qr
].map((e) => [e.name, e.label]));
function ei(e) {
	return e ? $r[e] ?? null : null;
}
var ti = [
	jr,
	Mr,
	Jr
], ni = [
	Ar,
	Xr,
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
], ri = [
	Yr,
	Xr,
	Zr,
	Qr
], ii = [
	Ar,
	Xr,
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
], ai = [
	Yr,
	Xr,
	...ti,
	Zr,
	Qr
];
function oi(e = "/app", t = ii) {
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
function si(e = "/app") {
	return oi(e, ii);
}
function ci(e = "/app") {
	return oi(e, ai);
}
function li(e = "/app", t = ii) {
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
var ui = [
	"login",
	"signup",
	"connect"
];
function di(e, t, n = !1, r = { name: "browse" }) {
	let i = typeof e.name == "string" ? e.name : "";
	return ui.includes(i) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? r : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function fi(e, t, n) {
	return !t || n ? null : e.name === "connect" || {
		name: "connect",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function pi(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = ei(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function mi(e, t, n) {
	return e === "hub" && n ? `${t}/api/v1/servers/${n}/proxy` : t;
}
function hi(e, t) {
	return e !== "hub" || t === null || t === "" ? "" : t.replace(/\/+$/, "");
}
function gi() {
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
function _i(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-CPeYzDAU.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-Dp4w6vfE.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-D97UsCVs.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-C3xpXeIB.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-C99kZNvE.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-DTv7DgSf.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-B8BUW3v1.js")
		},
		{
			path: `${t}/connect`,
			name: "connect",
			meta: { title: "connect.title" },
			component: () => import("./ConnectPage-6Z-9T_DF.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-Bziy4ptT.js")
		},
		{
			path: `${t}/explore`,
			name: "explore",
			meta: { title: "explore.title" },
			component: () => import("./ExplorePage-CsU9lmCC.js")
		},
		{
			path: `${t}/recommendations`,
			name: "recommendations",
			meta: { title: "recommendations.title" },
			component: () => import("./RecommendationsPage-FgJJ9cEu.js")
		},
		{
			path: `${t}/history`,
			name: "history",
			meta: { title: "history.title" },
			component: () => import("./WatchHistoryPage-YfH7iOqy.js")
		},
		{
			path: `${t}/syncplay`,
			name: "syncplay",
			meta: { title: "syncplay.syncPlay" },
			component: () => import("./SyncPlayPage-B0t0qAQp.js")
		},
		{
			path: `${t}/music`,
			name: "music",
			meta: { title: "music.title" },
			component: () => import("./MusicLibraryPage-7OtOwI2f.js")
		},
		{
			path: `${t}/parental`,
			name: "parental",
			meta: { title: "parental.title" },
			component: () => import("./ParentalControlsPage-BKpHr-7m.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: br,
		props: { appName: e.app }
	}), n;
}
function vi(e) {
	let t = {
		...gi(),
		...e
	};
	w(t.deviceHeaders ?? {}), nr(t.defaultTheme, t.defaultTv), Re(t.branding?.wordmark);
	let n = p(t.messages), r = en();
	if (!l()) {
		let e = o(r);
		t.defaultTheme && (e.theme = t.defaultTheme), t.defaultTv !== void 0 && (e.tv = t.defaultTv);
	}
	let i = rn({
		history: an(),
		routes: _i(t)
	}), a = t.home ? { path: t.home } : { name: "browse" }, s = Ae(r);
	s.configure(t.onConnectionChange ?? null);
	let c = () => s.apiBase || t.apiBase;
	i.beforeEach(async (e) => {
		let n = fi(e, t.requireConnection === !0, c() !== "");
		if (n !== null) return n;
		let i = T(r);
		return e.meta?.requiresAdmin === !0 ? (await i.init(), di(e, i.isLoggedIn, i.isAdmin, a)) : i.isLoggedIn === !0 ? (i.init(), di(e, !0, !1, a)) : (await i.init(), di(e, i.isLoggedIn, i.isAdmin, a));
	}), i.afterEach((e) => {
		ze(pi(e, n));
	});
	let u = kr(r), d = M(() => mi(t.app, c(), u.currentServerId)), f = M(() => hi(t.app, u.currentServerUrl)), m = zt(_r);
	return m.provide("apiBase", M(() => c())), m.provide("mediaApiBase", d), m.provide("mediaDirectBase", f), m.provide("loginPath", M(() => `${t.routerBase ?? "/app"}/login`)), m.provide("phlixCommands", t.commands ?? []), m.provide("phlixConfig", t), m.use(r), m.provide("auth", T(r)), m.use(i), Cr(m), m;
}
//#endregion
//#region src/components/ui/ToastHost.vue?vue&type=script&setup=true&lang.ts
var yi = ["aria-label"], bi = ["role"], xi = { class: "phlix-toast__content" }, Si = {
	key: 0,
	class: "phlix-toast__title"
}, Ci = { class: "phlix-toast__message" }, wi = ["onClick"], Ti = 0, Ei = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = m(), i = E(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return V(() => {
			Ti++;
		}), Ut(() => {
			Ti--;
		}), (a, s) => (H(), N(It, { to: "body" }, [I("div", {
			class: B(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": q(t)("common.notifications")
		}, [R(Rt, { name: "phlix-toast" }, {
			default: Y(() => [(H(!0), F(j, null, W(q(i).toasts, (e) => (H(), F("div", {
				key: e.id,
				class: B(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				R(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				I("div", xi, [e.title ? (H(), F("p", Si, K(e.title), 1)) : P("", !0), I("p", Ci, K(e.message), 1)]),
				e.action ? (H(), F("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), q(i).dismiss(e.id);
					}
				}, K(e.action.label), 9, wi)) : P("", !0),
				R(r, {
					name: "x",
					label: q(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => q(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, bi))), 128))]),
			_: 1
		})], 10, yi)]));
	}
}), [["__scopeId", "data-v-0127c07a"]]), Di = /*#__PURE__*/ t(/* @__PURE__ */ z({
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
		return V(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), Ut(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (H(), N(Kt(e.tag), {
			ref_key: "el",
			ref: n,
			class: B(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Ht({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: Y(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-4838d241"]]), Oi = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (H(), N(Lt, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: Y(() => [G(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-06639673"]]), ki = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Ai = {
	key: 0,
	class: "library-scan__skel"
}, ji = {
	key: 3,
	class: "library-scan__table-wrap"
}, Mi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Ni = { class: "library-scan__name" }, Pi = {
	key: 0,
	class: "library-scan__paths"
}, Fi = { class: "library-scan__num" }, Ii = { class: "library-scan__date" }, Li = ["data-testid"], Ri = {
	key: 0,
	class: "library-scan__error"
}, zi = { class: "library-scan__actions" }, Bi = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? C, n = E(), r = U([]), i = U({}), a = U(!0), o = U(null);
		async function s() {
			a.value = !0, o.value = null;
			try {
				let e = await t.get("/api/v1/libraries");
				r.value = e.libraries || [];
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
		return V(s), (e, t) => (H(), F("section", ki, [t[4] ||= I("header", { class: "library-scan__head" }, [I("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), I("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (H(), F("div", Ai, [R(k, {
			variant: "text",
			lines: 6
		})])) : o.value ? (H(), N(A, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: Y(() => [R(D, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: Y(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), N(A, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (H(), F("div", ji, [I("table", Mi, [t[3] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Library"),
			I("th", { scope: "col" }, "Type"),
			I("th", { scope: "col" }, "Items"),
			I("th", { scope: "col" }, "Last scan"),
			I("th", { scope: "col" }, "Status"),
			I("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(H(!0), F(j, null, W(r.value, (e) => (H(), F("tr", { key: e.id }, [
			I("td", null, [I("div", Ni, K(e.name), 1), e.paths.length ? (H(), F("div", Pi, K(e.paths.join(", ")), 1)) : P("", !0)]),
			I("td", null, K(e.type), 1),
			I("td", Fi, K(e.item_count === void 0 ? "—" : e.item_count), 1),
			I("td", Ii, K(d(e.last_scan_at)), 1),
			I("td", null, [I("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [R(O, { tone: m(i.value[e.id]) }, {
				default: Y(() => [L(K(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (H(), F("span", Ri, K(i.value[e.id]?.error), 1)) : P("", !0)], 8, Li)]),
			I("td", null, [I("div", zi, [R(D, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: Y(() => [...t[1] ||= [L(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), R(D, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: Y(() => [...t[2] ||= [L(" Rescan ", -1)]]),
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
async function Vi(e, t, n) {
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
function Hi(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Ui = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Wi = { class: "my-servers__head" }, Gi = {
	key: 0,
	class: "my-servers__skel"
}, Ki = {
	key: 3,
	class: "my-servers__table-wrap"
}, qi = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Ji = { class: "my-servers__name" }, Yi = { class: "my-servers__url" }, Xi = { class: "my-servers__num" }, Zi = { class: "my-servers__date" }, Qi = ["data-testid"], $i = { class: "my-servers__actions" }, ea = ["disabled"], ta = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, na = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? C, n = E(), r = T(), a = kr(), o = on(), s = Vt("phlixConfig", void 0)?.routerBase || "/app", c = U([]), l = U(!0), u = U(null), d = U(null), f = U(!1), p = U(""), m = U(!1), h = U(null);
		function g() {
			p.value = "", h.value = null, f.value = !0;
		}
		async function _() {
			m.value = !0, h.value = null;
			try {
				await Vi("", p.value), f.value = !1, n.success("Server added."), await y();
			} catch (e) {
				h.value = e instanceof $ ? e.message : v(e, "Could not add the server.");
			} finally {
				m.value = !1;
			}
		}
		async function y() {
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
					last_seen: Hi(e.lastSeenAt),
					library_count: typeof e.libraryCount == "number" ? e.libraryCount : void 0
				}));
			} catch (e) {
				u.value = v(e, "Failed to load servers."), n.error(u.value);
			} finally {
				l.value = !1;
			}
		}
		function b(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function x(e) {
			switch (e) {
				case "online": return "Online";
				case "offline": return "Offline";
				case "connecting": return "Connecting";
				default: return e;
			}
		}
		function S(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		function w(e) {
			return e.status === "online" && !e.relayActive;
		}
		function ee(e) {
			e.url && window.open(e.url, "_blank", "noopener,noreferrer");
		}
		function te(e) {
			e.relayActive && (a.setCurrent(e.id, e.name, e.url), o.push(s));
		}
		async function ne(e) {
			if (confirm(`Remove "${e.name}"? This cannot be undone.`)) {
				d.value = e.id;
				try {
					await C.delete(`/api/v1/me/servers/${e.id}`), c.value = c.value.filter((t) => t.id !== e.id), n.success(`"${e.name}" removed.`);
				} catch (t) {
					n.error(v(t, `Failed to remove "${e.name}".`));
				} finally {
					d.value = null;
				}
			}
		}
		return V(y), (e, t) => (H(), F("section", Ui, [
			I("header", Wi, [t[4] ||= I("div", null, [I("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), I("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), R(D, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: g
			}, {
				default: Y(() => [...t[3] ||= [L("Add server", -1)]]),
				_: 1
			})]),
			l.value ? (H(), F("div", Gi, [R(k, {
				variant: "text",
				lines: 6
			})])) : u.value ? (H(), N(A, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: u.value
			}, {
				actions: Y(() => [R(D, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: y
				}, {
					default: Y(() => [...t[5] ||= [L("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : c.value.length === 0 ? (H(), N(A, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: Y(() => [R(D, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: g
				}, {
					default: Y(() => [...t[6] ||= [L("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (H(), F("div", Ki, [I("table", qi, [t[11] ||= I("thead", null, [I("tr", null, [
				I("th", { scope: "col" }, "Server"),
				I("th", { scope: "col" }, "Owner"),
				I("th", { scope: "col" }, "Libraries"),
				I("th", { scope: "col" }, "Last seen"),
				I("th", { scope: "col" }, "Status"),
				I("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), I("tbody", null, [(H(!0), F(j, null, W(c.value, (e) => (H(), F("tr", { key: e.id }, [
				I("td", null, [I("div", Ji, K(e.name), 1), I("div", Yi, K(e.url), 1)]),
				I("td", null, K(e.owner), 1),
				I("td", Xi, K(e.library_count === void 0 ? "—" : e.library_count), 1),
				I("td", Zi, K(b(e.last_seen)), 1),
				I("td", null, [I("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [R(O, { tone: S(e.status) }, {
					default: Y(() => [L(K(x(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"]), w(e) ? (H(), N(O, {
					key: 0,
					tone: "warning"
				}, {
					default: Y(() => [...t[7] ||= [L("Relay connecting", -1)]]),
					_: 1
				})) : P("", !0)], 8, Qi)]),
				I("td", null, [I("div", $i, [
					R(D, {
						variant: "solid",
						size: "sm",
						"left-icon": "play",
						disabled: !e.relayActive,
						title: e.relayActive ? `Browse ${e.name} here` : w(e) ? `${e.name} is online but its relay tunnel isn't connected yet — it can't be browsed here until it reconnects.` : "This server is offline — it must be connected to browse it here",
						"aria-label": `Browse ${e.name}`,
						onClick: (t) => te(e)
					}, {
						default: Y(() => [...t[8] ||= [L("Browse", -1)]]),
						_: 1
					}, 8, [
						"disabled",
						"title",
						"aria-label",
						"onClick"
					]),
					R(D, {
						variant: "ghost",
						size: "sm",
						disabled: !e.url,
						title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
						"aria-label": `Manage ${e.name}`,
						onClick: (t) => ee(e)
					}, {
						default: Y(() => [...t[9] ||= [L("Manage", -1)]]),
						_: 1
					}, 8, [
						"disabled",
						"title",
						"aria-label",
						"onClick"
					]),
					R(D, {
						variant: "danger",
						size: "sm",
						loading: d.value === e.id,
						disabled: d.value === e.id,
						"aria-label": `Remove ${e.name}`,
						onClick: (t) => ne(e)
					}, {
						default: Y(() => [...t[10] ||= [L("Remove", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label",
						"onClick"
					])
				])])
			]))), 128))])])])),
			R(i, {
				modelValue: f.value,
				"onUpdate:modelValue": t[2] ||= (e) => f.value = e,
				title: "Add a server"
			}, {
				footer: Y(() => [R(D, {
					variant: "ghost",
					size: "sm",
					disabled: m.value,
					onClick: t[1] ||= (e) => f.value = !1
				}, {
					default: Y(() => [...t[14] ||= [L("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), R(D, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: m.value,
					disabled: m.value,
					onClick: _
				}, {
					default: Y(() => [...t[15] ||= [L(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: Y(() => [I("form", {
					class: "my-servers__add-form",
					onSubmit: $t(_, ["prevent"])
				}, [
					t[12] ||= I("p", { class: "my-servers__add-help" }, [
						L(" On your media server, open "),
						I("strong", null, "Settings → Connect to hub"),
						L(" to get a claim code, then paste it here. ")
					], -1),
					t[13] ||= I("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					X(I("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: m.value
					}, null, 8, ea), [[Xt, p.value]]),
					h.value ? (H(), F("p", ta, K(h.value), 1)) : P("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-3bdc672f"]]), ra = {
	class: "server-detail",
	"aria-labelledby": "server-detail-heading"
}, ia = { class: "server-detail__back" }, aa = {
	key: 0,
	class: "server-detail__skeleton"
}, oa = { class: "server-detail__skeleton-card" }, sa = { class: "server-detail__skeleton-card" }, ca = { class: "server-detail__skeleton-card" }, la = { class: "server-detail__skeleton-card" }, ua = {
	key: 2,
	class: "server-detail__content"
}, da = {
	class: "server-detail__card",
	"aria-labelledby": "server-info-heading"
}, fa = { class: "server-detail__card-header" }, pa = { class: "server-detail__card-title-row" }, ma = {
	id: "server-info-heading",
	class: "server-detail__card-title"
}, ha = { class: "server-detail__badges" }, ga = ["title"], _a = { class: "server-detail__info-list" }, va = { class: "server-detail__info-row" }, ya = { class: "server-detail__info-value" }, ba = {
	key: 0,
	class: "server-detail__info-row"
}, xa = { class: "server-detail__info-value" }, Sa = { class: "server-detail__hostnames" }, Ca = {
	key: 1,
	class: "server-detail__info-row"
}, wa = { class: "server-detail__info-value server-detail__mono" }, Ta = {
	key: 2,
	class: "server-detail__info-row"
}, Ea = { class: "server-detail__info-value server-detail__mono" }, Da = {
	key: 0,
	class: "server-detail__card",
	"aria-labelledby": "relay-session-heading"
}, Oa = { class: "server-detail__card-header" }, ka = { class: "server-detail__info-list" }, Aa = { class: "server-detail__info-row" }, ja = { class: "server-detail__info-value server-detail__mono" }, Ma = { class: "server-detail__info-row" }, Na = { class: "server-detail__info-value" }, Pa = { class: "server-detail__info-row" }, Fa = { class: "server-detail__info-value" }, Ia = { class: "server-detail__info-row" }, La = { class: "server-detail__info-value" }, Ra = { class: "server-detail__info-row" }, za = { class: "server-detail__info-value" }, Ba = {
	key: 1,
	class: "server-detail__card server-detail__card--muted",
	"aria-labelledby": "relay-session-heading"
}, Va = {
	key: 2,
	class: "server-detail__card",
	"aria-labelledby": "tls-status-heading"
}, Ha = { class: "server-detail__card-header" }, Ua = { class: "server-detail__badges" }, Wa = { class: "server-detail__info-list" }, Ga = { class: "server-detail__info-row" }, Ka = { class: "server-detail__info-value server-detail__mono" }, qa = { class: "server-detail__info-row" }, Ja = { class: "server-detail__info-value" }, Ya = { class: "server-detail__info-row" }, Xa = { class: "server-detail__info-value server-detail__mono server-detail__path" }, Za = { class: "server-detail__info-row" }, Qa = { class: "server-detail__info-value server-detail__mono server-detail__path" }, $a = {
	class: "server-detail__card",
	"aria-labelledby": "heartbeat-heading"
}, eo = { class: "server-detail__card-header" }, to = { class: "server-detail__card-title-row" }, no = {
	key: 0,
	class: "server-detail__empty-message"
}, ro = {
	key: 1,
	class: "server-detail__table-wrap"
}, io = {
	class: "server-detail__table",
	"aria-label": "Heartbeat history"
}, ao = { class: "server-detail__date" }, oo = { class: "server-detail__uptime" }, so = { class: "server-detail__num" }, co = { class: "server-detail__num" }, lo = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "ServerDetailPage",
	props: {
		client: {},
		id: {}
	},
	setup(e) {
		let t = e, n = t.client ?? C, r = U(null), i = U(null), a = U([]), o = U(null), s = U(!0), c = U(null), l = U(!1);
		function u(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleString();
		}
		function d(e) {
			let t = Math.floor(Date.now() / 1e3) - e;
			return t < 60 ? `${t}s ago` : t < 3600 ? `${Math.floor(t / 60)}m ago` : t < 86400 ? `${Math.floor(t / 3600)}h ago` : `${Math.floor(t / 86400)}d ago`;
		}
		function f(e) {
			return e < 1024 * 1024 ? `${Math.round(e / 1024)} KB` : `${Math.round(e / 1024 / 1024 * 100) / 100} MB`;
		}
		function p(e) {
			let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
			return t > 0 && i.push(`${t}d`), n > 0 && i.push(`${n}h`), (r > 0 || i.length === 0) && i.push(`${r}m`), i.join(" ");
		}
		function m(e) {
			return new Date(e).toLocaleString();
		}
		function h(e) {
			switch (e.toLowerCase()) {
				case "online":
				case "connected": return "success";
				case "offline":
				case "disconnected": return "error";
				case "degraded":
				case "pending": return "warning";
				default: return "neutral";
			}
		}
		async function g(e = !1) {
			e && (s.value = !0), c.value = null;
			try {
				let e = await n.get(`/api/v1/me/servers/${t.id}`);
				r.value = e.server, i.value = e.relay_session ?? null, a.value = e.heartbeat_history ?? [], o.value = e.tls_status ?? null;
			} catch (e) {
				c.value = v(e, "Failed to load server details.");
			} finally {
				e && (s.value = !1);
			}
		}
		let _ = M(() => l.value ? a.value : a.value.slice(0, 5));
		return V(() => g(!0)), (e, t) => (H(), F("section", ra, [I("div", ia, [R(D, {
			variant: "ghost",
			size: "sm",
			"left-icon": "chevron-left",
			onClick: t[0] ||= (t) => e.$router.push("/app/servers")
		}, {
			default: Y(() => [...t[3] ||= [L(" Back to My Servers ", -1)]]),
			_: 1
		})]), s.value ? (H(), F("div", aa, [
			I("div", oa, [R(k, {
				variant: "text",
				lines: 4
			})]),
			I("div", sa, [R(k, {
				variant: "text",
				lines: 4
			})]),
			I("div", ca, [R(k, {
				variant: "text",
				lines: 4
			})]),
			I("div", la, [R(k, {
				variant: "text",
				lines: 4
			})])
		])) : c.value ? (H(), N(A, {
			key: 1,
			icon: "alert",
			title: "Couldn't load server details",
			description: c.value
		}, {
			actions: Y(() => [R(D, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[1] ||= (e) => g(!0)
			}, {
				default: Y(() => [...t[4] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value ? (H(), F("div", ua, [
			I("article", da, [I("header", fa, [I("div", pa, [I("h1", ma, K(r.value.server_name), 1), I("div", ha, [
				R(O, { tone: "neutral" }, {
					default: Y(() => [L(K(r.value.version), 1)]),
					_: 1
				}),
				R(O, { tone: h(r.value.status) }, {
					default: Y(() => [L(K(r.value.status), 1)]),
					_: 1
				}, 8, ["tone"]),
				I("span", {
					class: B(["server-detail__relay-indicator", { "server-detail__relay-indicator--active": r.value.relay_active }]),
					title: r.value.relay_active ? "Relay active" : "Relay inactive"
				}, [...t[5] ||= [I("span", { class: "server-detail__relay-dot" }, null, -1), L(" Relay ", -1)]], 10, ga)
			])])]), I("dl", _a, [
				I("div", va, [t[6] ||= I("dt", { class: "server-detail__info-label" }, "Last seen", -1), I("dd", ya, K(u(r.value.last_seen_at)), 1)]),
				r.value.hostname_candidates.length > 0 ? (H(), F("div", ba, [t[7] ||= I("dt", { class: "server-detail__info-label" }, "Hostname candidates", -1), I("dd", xa, [I("ul", Sa, [(H(!0), F(j, null, W(r.value.hostname_candidates, (e) => (H(), F("li", { key: e }, K(e), 1))), 128))])])])) : P("", !0),
				r.value.subdomain ? (H(), F("div", Ca, [t[8] ||= I("dt", { class: "server-detail__info-label" }, "Subdomain", -1), I("dd", wa, K(r.value.subdomain), 1)])) : P("", !0),
				r.value.fqdn ? (H(), F("div", Ta, [t[9] ||= I("dt", { class: "server-detail__info-label" }, "FQDN", -1), I("dd", Ea, K(r.value.fqdn), 1)])) : P("", !0)
			])]),
			i.value ? (H(), F("article", Da, [I("header", Oa, [t[11] ||= I("h2", {
				id: "relay-session-heading",
				class: "server-detail__card-title"
			}, "Relay Session", -1), R(O, { tone: "success" }, {
				default: Y(() => [...t[10] ||= [L("Active", -1)]]),
				_: 1
			})]), I("dl", ka, [
				I("div", Aa, [t[12] ||= I("dt", { class: "server-detail__info-label" }, "Worker node", -1), I("dd", ja, K(i.value.worker_node), 1)]),
				I("div", Ma, [t[13] ||= I("dt", { class: "server-detail__info-label" }, "Session opened", -1), I("dd", Na, K(m(i.value.opened_at)), 1)]),
				I("div", Pa, [t[14] ||= I("dt", { class: "server-detail__info-label" }, "Data in", -1), I("dd", Fa, K(f(i.value.bytes_in)), 1)]),
				I("div", Ia, [t[15] ||= I("dt", { class: "server-detail__info-label" }, "Data out", -1), I("dd", La, K(f(i.value.bytes_out)), 1)]),
				I("div", Ra, [t[16] ||= I("dt", { class: "server-detail__info-label" }, "Last frame", -1), I("dd", za, K(d(i.value.last_frame_at)), 1)])
			])])) : (H(), F("article", Ba, [...t[17] ||= [I("header", { class: "server-detail__card-header" }, [I("h2", {
				id: "relay-session-heading",
				class: "server-detail__card-title"
			}, "Relay Session")], -1), I("p", { class: "server-detail__empty-message" }, "No active relay session.", -1)]])),
			o.value && r.value.fqdn ? (H(), F("article", Va, [I("header", Ha, [t[19] ||= I("h2", {
				id: "tls-status-heading",
				class: "server-detail__card-title"
			}, "TLS Status", -1), I("div", Ua, [R(O, { tone: o.value.provisioned ? "success" : "error" }, {
				default: Y(() => [L(K(o.value.provisioned ? "Provisioned" : "Not provisioned"), 1)]),
				_: 1
			}, 8, ["tone"]), o.value.needs_renewal ? (H(), N(O, {
				key: 0,
				tone: "error"
			}, {
				default: Y(() => [...t[18] ||= [L("Needs renewal", -1)]]),
				_: 1
			})) : P("", !0)])]), I("dl", Wa, [
				I("div", Ga, [t[20] ||= I("dt", { class: "server-detail__info-label" }, "Domain", -1), I("dd", Ka, K(o.value.fqdn), 1)]),
				I("div", qa, [t[21] ||= I("dt", { class: "server-detail__info-label" }, "Expiry", -1), I("dd", Ja, [I("span", { class: B({ "server-detail__expired": o.value.expiry_days_remaining <= 0 }) }, K(o.value.expiry_days_remaining > 0 ? `${o.value.expiry_days_remaining} days remaining` : "Expired!"), 3)])]),
				I("div", Ya, [t[22] ||= I("dt", { class: "server-detail__info-label" }, "Certificate", -1), I("dd", Xa, K(o.value.cert_path), 1)]),
				I("div", Za, [t[23] ||= I("dt", { class: "server-detail__info-label" }, "Key", -1), I("dd", Qa, K(o.value.key_path), 1)])
			])])) : P("", !0),
			I("article", $a, [I("header", eo, [I("div", to, [t[24] ||= I("h2", {
				id: "heartbeat-heading",
				class: "server-detail__card-title"
			}, "Heartbeat History", -1), a.value.length > 5 ? (H(), N(D, {
				key: 0,
				variant: "ghost",
				size: "sm",
				onClick: t[2] ||= (e) => l.value = !l.value
			}, {
				default: Y(() => [L(K(l.value ? "Show less" : `Show all (${a.value.length})`), 1)]),
				_: 1
			})) : P("", !0)])]), a.value.length === 0 ? (H(), F("div", no, " No heartbeat history available. ")) : (H(), F("div", ro, [I("table", io, [t[25] ||= I("thead", null, [I("tr", null, [
				I("th", { scope: "col" }, "Time"),
				I("th", { scope: "col" }, "Version"),
				I("th", { scope: "col" }, "Uptime"),
				I("th", { scope: "col" }, "Sessions"),
				I("th", { scope: "col" }, "Transcodes")
			])], -1), I("tbody", null, [(H(!0), F(j, null, W(_.value, (e) => (H(), F("tr", { key: e.id }, [
				I("td", ao, K(u(e.received_at)), 1),
				I("td", null, [R(O, { tone: "neutral" }, {
					default: Y(() => [L(K(e.version), 1)]),
					_: 2
				}, 1024)]),
				I("td", oo, K(p(e.uptime_seconds)), 1),
				I("td", so, K(e.active_sessions), 1),
				I("td", co, K(e.active_transcodes), 1)
			]))), 128))])])]))])
		])) : P("", !0)]));
	}
}), [["__scopeId", "data-v-7ff73e1d"]]), uo = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, fo = {
	key: 0,
	class: "federation__skel"
}, po = {
	key: 2,
	class: "federation__content"
}, mo = {
	key: 1,
	class: "federation__table-wrap"
}, ho = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, go = { class: "federation__name" }, _o = { class: "federation__url" }, vo = { class: "federation__num" }, yo = { class: "federation__date" }, bo = ["data-testid"], xo = { class: "federation__actions" }, So = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, Co = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? C, n = E(), r = U([]), i = U(!0), a = U(null), o = U(""), s = U(""), c = U(""), l = U(!1);
		async function u(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				let e = await t.get("/api/v1/me/federation/peers");
				r.value = (e.peers || []).map((e) => ({
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
		return V(() => u(!0)), (e, t) => (H(), F("section", uo, [t[10] ||= I("header", { class: "federation__head" }, [I("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), I("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (H(), F("div", fo, [R(k, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), N(A, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: Y(() => [R(D, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: Y(() => [...t[4] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (H(), F("div", po, [
			t[9] ||= I("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (H(), N(A, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (H(), F("div", mo, [I("table", ho, [t[6] ||= I("thead", null, [I("tr", null, [
				I("th", { scope: "col" }, "Peer"),
				I("th", { scope: "col" }, "Shared libraries"),
				I("th", { scope: "col" }, "Last sync"),
				I("th", { scope: "col" }, "Status"),
				I("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), I("tbody", null, [(H(!0), F(j, null, W(r.value, (e) => (H(), F("tr", { key: e.id }, [
				I("td", null, [I("div", go, K(e.name), 1), I("div", _o, K(e.url), 1)]),
				I("td", vo, K(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				I("td", yo, K(p(e.last_sync)), 1),
				I("td", null, [I("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [R(O, { tone: h(e.status) }, {
					default: Y(() => [L(K(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, bo)]),
				I("td", null, [I("div", xo, [R(D, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: Y(() => [...t[5] ||= [L(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			I("section", So, [t[8] ||= I("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), I("form", {
				class: "federation__form",
				onSubmit: $t(d, ["prevent"])
			}, [
				X(I("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[Xt, s.value]]),
				X(I("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[Xt, o.value]]),
				X(I("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[Xt, c.value]]),
				R(D, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: Y(() => [...t[7] ||= [L(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-6fe106b1"]]), wo = {
	class: "fed-shares",
	"aria-labelledby": "fed-shares-heading"
}, To = {
	class: "fed-shares__tabs",
	role: "tablist",
	"aria-label": "Share offers"
}, Eo = ["aria-selected"], Do = {
	key: 0,
	class: "fed-shares__tab-badge"
}, Oo = ["aria-selected"], ko = {
	role: "tabpanel",
	"aria-labelledby": "tab-incoming"
}, Ao = {
	key: 0,
	class: "fed-shares__skel"
}, jo = {
	key: 3,
	class: "fed-shares__table-wrap"
}, Mo = {
	class: "fed-shares__table",
	"aria-label": "Incoming library share offers"
}, No = { class: "fed-shares__library" }, Po = { class: "fed-shares__date" }, Fo = {
	key: 0,
	class: "fed-shares__actions"
}, Io = {
	key: 1,
	class: "fed-shares__responded"
}, Lo = { key: 0 }, Ro = {
	role: "tabpanel",
	"aria-labelledby": "tab-outgoing"
}, zo = {
	key: 0,
	class: "fed-shares__skel"
}, Bo = {
	key: 3,
	class: "fed-shares__table-wrap"
}, Vo = {
	class: "fed-shares__table",
	"aria-label": "Outgoing library shares"
}, Ho = { class: "fed-shares__library" }, Uo = { class: "fed-shares__peer" }, Wo = { class: "fed-shares__date" }, Go = {
	key: 0,
	class: "fed-shares__actions"
}, Ko = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "FederationSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? C, n = E(), r = U("incoming"), i = U([]), a = U([]), o = U(!1), s = U(!1), c = U(null), l = U(null), u = U(/* @__PURE__ */ new Set()), d = (e) => u.value.has(e);
		async function f() {
			o.value = !0, c.value = null;
			try {
				let e = await t.get("/api/v1/me/federation/library-shares/incoming");
				i.value = (e.incoming_offers || []).map((e) => ({
					id: e.id ?? "",
					peer_id: e.peer_id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					permission: e.permission === "readwrite" ? "readwrite" : "read",
					status: e.status ?? "pending",
					offered_at: Hi(e.offered_at) ?? "",
					responded_at: e.responded_at ?? null,
					accepted_by: e.accepted_by ?? null
				}));
			} catch (e) {
				c.value = v(e, "Failed to load incoming share offers."), n.error(c.value);
			} finally {
				o.value = !1;
			}
		}
		async function p() {
			s.value = !0, l.value = null;
			try {
				let e = await t.get("/api/v1/me/federation/library-shares/outgoing");
				a.value = (e.outgoing_shares || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					peer_id: e.peer_id ?? "",
					permission: e.permission === "readwrite" ? "readwrite" : "read",
					status: e.status ?? "pending",
					shared_at: Hi(e.shared_at) ?? "",
					revoked_at: e.revoked_at ?? null
				}));
			} catch (e) {
				l.value = v(e, "Failed to load outgoing shares."), n.error(l.value);
			} finally {
				s.value = !1;
			}
		}
		async function m() {
			await Promise.all([f(), p()]);
		}
		async function h(e) {
			if (!d(e)) {
				u.value.add(e);
				try {
					await t.post(`/api/v1/me/federation/library-shares/incoming/${e}/accept`), n.success("Share offer accepted."), await m();
				} catch (e) {
					n.error(v(e, "Failed to accept share offer."));
				} finally {
					u.value.delete(e);
				}
			}
		}
		async function g(e) {
			if (!d(e)) {
				u.value.add(e);
				try {
					await t.post(`/api/v1/me/federation/library-shares/incoming/${e}/reject`), n.success("Share offer rejected."), await m();
				} catch (e) {
					n.error(v(e, "Failed to reject share offer."));
				} finally {
					u.value.delete(e);
				}
			}
		}
		async function _(e) {
			if (!d(e)) {
				u.value.add(e);
				try {
					await t.delete(`/api/v1/me/federation/library-shares/outgoing/${e}`), n.success("Share revoked."), await m();
				} catch (e) {
					n.error(v(e, "Failed to revoke share."));
				} finally {
					u.value.delete(e);
				}
			}
		}
		function y(e) {
			return e ? new Date(e).toLocaleString() : "—";
		}
		function b(e) {
			switch (e) {
				case "pending": return "warning";
				case "accepted": return "success";
				case "rejected": return "error";
				default: return "warning";
			}
		}
		function x(e) {
			switch (e) {
				case "pending": return "warning";
				case "accepted": return "success";
				case "rejected": return "neutral";
				default: return "warning";
			}
		}
		function S(e) {
			switch (e) {
				case "readwrite": return "success";
				default: return "info";
			}
		}
		let w = M(() => o.value && i.value.length === 0 && a.value.length === 0);
		return V(() => m()), (e, t) => (H(), F("section", wo, [
			t[10] ||= I("header", { class: "fed-shares__head" }, [I("h1", {
				id: "fed-shares-heading",
				class: "fed-shares__title"
			}, "Federation Library Shares"), I("p", { class: "fed-shares__subtitle" }, "Manage library share offers between your federation peers.")], -1),
			I("div", To, [I("button", {
				role: "tab",
				class: B(["fed-shares__tab", { "is-active": r.value === "incoming" }]),
				"aria-selected": r.value === "incoming",
				onClick: t[0] ||= (e) => r.value = "incoming"
			}, [t[2] ||= L(" Incoming ", -1), i.value.filter((e) => e.status === "pending").length > 0 ? (H(), F("span", Do, K(i.value.filter((e) => e.status === "pending").length), 1)) : P("", !0)], 10, Eo), I("button", {
				role: "tab",
				class: B(["fed-shares__tab", { "is-active": r.value === "outgoing" }]),
				"aria-selected": r.value === "outgoing",
				onClick: t[1] ||= (e) => r.value = "outgoing"
			}, " Outgoing ", 10, Oo)]),
			X(I("div", ko, [w.value ? (H(), F("div", Ao, [R(k, {
				variant: "text",
				lines: 6
			})])) : c.value ? (H(), N(A, {
				key: 1,
				icon: "alert",
				title: "Couldn't load incoming offers",
				description: c.value
			}, {
				actions: Y(() => [R(D, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: f
				}, {
					default: Y(() => [...t[3] ||= [L("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : i.value.length === 0 ? (H(), N(A, {
				key: 2,
				icon: "bookmark",
				title: "No incoming library share offers",
				description: "Library share offers from other federation peers will appear here."
			})) : (H(), F("div", jo, [I("table", Mo, [t[6] ||= I("thead", null, [I("tr", null, [
				I("th", { scope: "col" }, "Library"),
				I("th", { scope: "col" }, "Permission"),
				I("th", { scope: "col" }, "Status"),
				I("th", { scope: "col" }, "Offered"),
				I("th", {
					scope: "col",
					class: "fed-shares__actions-col"
				}, "Actions")
			])], -1), I("tbody", null, [(H(!0), F(j, null, W(i.value, (e) => (H(), F("tr", { key: e.id }, [
				I("td", null, [I("span", No, K(e.library_name), 1)]),
				I("td", null, [R(O, { tone: S(e.permission) }, {
					default: Y(() => [L(K(e.permission), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				I("td", null, [R(O, { tone: b(e.status) }, {
					default: Y(() => [L(K(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				I("td", Po, K(y(e.offered_at)), 1),
				I("td", null, [e.status === "pending" ? (H(), F("div", Fo, [R(D, {
					variant: "solid",
					size: "sm",
					"aria-label": `Accept share of ${e.library_name}`,
					disabled: d(e.id),
					onClick: (t) => h(e.id)
				}, {
					default: Y(() => [...t[4] ||= [L(" Accept ", -1)]]),
					_: 1
				}, 8, [
					"aria-label",
					"disabled",
					"onClick"
				]), R(D, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Reject share of ${e.library_name}`,
					disabled: d(e.id),
					onClick: (t) => g(e.id)
				}, {
					default: Y(() => [...t[5] ||= [L(" Reject ", -1)]]),
					_: 1
				}, 8, [
					"aria-label",
					"disabled",
					"onClick"
				])])) : (H(), F("span", Io, [L(K(e.status === "accepted" ? "Accepted" : "Rejected") + " ", 1), e.responded_at ? (H(), F("span", Lo, " · " + K(y(e.responded_at)), 1)) : P("", !0)]))])
			]))), 128))])])]))], 512), [[Zt, r.value === "incoming"]]),
			X(I("div", Ro, [w.value ? (H(), F("div", zo, [R(k, {
				variant: "text",
				lines: 6
			})])) : l.value ? (H(), N(A, {
				key: 1,
				icon: "alert",
				title: "Couldn't load outgoing shares",
				description: l.value
			}, {
				actions: Y(() => [R(D, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: p
				}, {
					default: Y(() => [...t[7] ||= [L("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : a.value.length === 0 ? (H(), N(A, {
				key: 2,
				icon: "bookmark",
				title: "No outgoing library shares",
				description: "Libraries you share with federation peers will appear here."
			})) : (H(), F("div", Bo, [I("table", Vo, [t[9] ||= I("thead", null, [I("tr", null, [
				I("th", { scope: "col" }, "Library"),
				I("th", { scope: "col" }, "Peer"),
				I("th", { scope: "col" }, "Permission"),
				I("th", { scope: "col" }, "Status"),
				I("th", { scope: "col" }, "Shared"),
				I("th", {
					scope: "col",
					class: "fed-shares__actions-col"
				}, "Actions")
			])], -1), I("tbody", null, [(H(!0), F(j, null, W(a.value, (e) => (H(), F("tr", { key: e.id }, [
				I("td", null, [I("span", Ho, K(e.library_name), 1)]),
				I("td", Uo, K(e.peer_id), 1),
				I("td", null, [R(O, { tone: S(e.permission) }, {
					default: Y(() => [L(K(e.permission), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				I("td", null, [R(O, { tone: x(e.status) }, {
					default: Y(() => [L(K(e.status === "rejected" ? "Declined" : e.status), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				I("td", Wo, K(y(e.shared_at)), 1),
				I("td", null, [e.status === "rejected" ? P("", !0) : (H(), F("div", Go, [R(D, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Revoke share of ${e.library_name}`,
					disabled: d(e.id),
					onClick: (t) => _(e.id)
				}, {
					default: Y(() => [...t[8] ||= [L(" Revoke ", -1)]]),
					_: 1
				}, 8, [
					"aria-label",
					"disabled",
					"onClick"
				])]))])
			]))), 128))])])]))], 512), [[Zt, r.value === "outgoing"]])
		]));
	}
}), [["__scopeId", "data-v-a335ecbb"]]), qo = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, Jo = {
	key: 0,
	class: "shares__skel"
}, Yo = {
	key: 3,
	class: "shares__table-wrap"
}, Xo = {
	class: "shares__table",
	"aria-label": "Library shares"
}, Zo = { class: "shares__library" }, Qo = { class: "shares__date" }, $o = { class: "shares__date" }, es = ["data-testid"], ts = { class: "shares__actions" }, ns = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? C, n = E(), r = U([]), i = U(!0), a = U(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				let e = await t.get("/api/v1/me/shares/");
				r.value = (e.outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Hi(e.created_at) ?? "",
					expires_at: Hi(e.expires_at)
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
		return V(() => o(!0)), (e, t) => (H(), F("section", qo, [t[5] ||= I("header", { class: "shares__head" }, [I("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), I("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (H(), F("div", Jo, [R(k, {
			variant: "text",
			lines: 6
		})])) : a.value ? (H(), N(A, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: Y(() => [R(D, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: Y(() => [...t[1] ||= [L("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (H(), N(A, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (H(), F("div", Yo, [I("table", Xo, [t[4] ||= I("thead", null, [I("tr", null, [
			I("th", { scope: "col" }, "Library"),
			I("th", { scope: "col" }, "Shared with"),
			I("th", { scope: "col" }, "Permissions"),
			I("th", { scope: "col" }, "Created"),
			I("th", { scope: "col" }, "Expires"),
			I("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), I("tbody", null, [(H(!0), F(j, null, W(r.value, (e) => (H(), F("tr", { key: e.id }, [
			I("td", null, [I("span", Zo, K(e.library_name), 1)]),
			I("td", null, K(e.shared_with), 1),
			I("td", null, [R(O, { tone: u(e.permissions) }, {
				default: Y(() => [L(K(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			I("td", Qo, K(c(e.created_at)), 1),
			I("td", $o, [I("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [L(K(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (H(), N(O, {
				key: 0,
				tone: "error"
			}, {
				default: Y(() => [...t[2] ||= [L("Expired", -1)]]),
				_: 1
			})) : P("", !0)], 8, es)]),
			I("td", null, [I("div", ts, [R(D, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: Y(() => [...t[3] ||= [L(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-31edd2a2"]]), rs = {
	class: "shared-with-me",
	"aria-labelledby": "shared-with-me-heading"
}, is = {
	key: 0,
	class: "shared-with-me__skel"
}, as = {
	key: 3,
	class: "shared-with-me__grid"
}, os = { class: "share-card__header" }, ss = { class: "share-card__library" }, cs = { class: "share-card__badges" }, ls = { class: "share-card__body" }, us = { class: "share-card__details" }, ds = { class: "share-card__detail" }, fs = { class: "share-card__detail" }, ps = { class: "share-card__detail" }, ms = { class: "share-card__footer" }, hs = {
	key: 1,
	class: "share-card__revoked-label"
}, gs = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "SharedWithMePage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? C, n = U([]), r = U(!0), i = U(null);
		async function a(e = !1) {
			e && (r.value = !0), i.value = null;
			try {
				let e = await t.get("/api/v1/me/shares");
				n.value = [...e.incoming || []].sort((e, t) => new Date(t.created_at).getTime() - new Date(e.created_at).getTime());
			} catch (e) {
				i.value = v(e, "Failed to load shared libraries.");
			} finally {
				e && (r.value = !1);
			}
		}
		function o(e) {
			switch (e) {
				case "read": return "info";
				case "readwrite": return "success";
				default: return "neutral";
			}
		}
		function s(e) {
			switch (e) {
				case "active": return "success";
				case "revoked": return "warning";
				default: return "neutral";
			}
		}
		function c(e) {
			return e === "readwrite" ? "Read / Write" : "Read only";
		}
		return V(() => a(!0)), (e, t) => (H(), F("section", rs, [t[6] ||= I("header", { class: "shared-with-me__head" }, [I("h1", {
			id: "shared-with-me-heading",
			class: "shared-with-me__title"
		}, "Shared With Me"), I("p", { class: "shared-with-me__subtitle" }, " Libraries shared with you by other users. ")], -1), r.value ? (H(), F("div", is, [R(k, {
			variant: "text",
			lines: 6
		})])) : i.value ? (H(), N(A, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shared libraries",
			description: i.value
		}, {
			actions: Y(() => [R(D, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => a(!0)
			}, {
				default: Y(() => [...t[1] ||= [L(" Retry ", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : n.value.length === 0 ? (H(), N(A, {
			key: 2,
			icon: "bookmark",
			title: "No shared libraries",
			description: "Libraries shared with you will appear here."
		})) : (H(), F("div", as, [(H(!0), F(j, null, W(n.value, (e) => (H(), F("article", {
			key: e.id,
			class: B(["share-card", { "share-card--revoked": e.status === "revoked" }])
		}, [
			I("div", os, [I("h2", ss, K(e.library_name), 1), I("div", cs, [R(O, { tone: o(e.permission) }, {
				default: Y(() => [L(K(c(e.permission)), 1)]),
				_: 2
			}, 1032, ["tone"]), R(O, { tone: s(e.status) }, {
				default: Y(() => [L(K(e.status === "active" ? "Active" : "Revoked"), 1)]),
				_: 2
			}, 1032, ["tone"])])]),
			I("div", ls, [I("dl", us, [
				I("div", ds, [t[2] ||= I("dt", null, "Server", -1), I("dd", null, K(e.server_name), 1)]),
				I("div", fs, [t[3] ||= I("dt", null, "Shared by", -1), I("dd", null, K(e.owner_email), 1)]),
				I("div", ps, [t[4] ||= I("dt", null, "Received", -1), I("dd", null, K(new Date(e.created_at).toLocaleDateString()), 1)])
			])]),
			I("div", ms, [e.status === "active" ? (H(), N(D, {
				key: 0,
				variant: "solid",
				size: "sm",
				"left-icon": "list",
				to: `/browse/${e.server_id}/${e.library_id}`
			}, {
				default: Y(() => [...t[5] ||= [L(" Browse Library ", -1)]]),
				_: 1
			}, 8, ["to"])) : (H(), F("span", hs, " Access revoked by owner "))])
		], 2))), 128))]))]));
	}
}), [["__scopeId", "data-v-6ad444f0"]]), _s = {
	class: "requests",
	"aria-labelledby": "requests-heading"
}, vs = { class: "requests__head" }, ys = {
	key: 0,
	class: "requests__skel"
}, bs = {
	key: 3,
	class: "requests__list"
}, xs = {
	class: "request-card__poster",
	"aria-hidden": "true"
}, Ss = ["src", "alt"], Cs = {
	key: 1,
	class: "request-card__poster-placeholder"
}, ws = { class: "request-card__body" }, Ts = { class: "request-card__title-row" }, Es = { class: "request-card__title" }, Ds = { class: "request-card__badges" }, Os = { class: "request-card__meta" }, ks = { class: "request-card__tmdb" }, As = {
	key: 0,
	class: "request-card__episode"
}, js = { class: "request-card__date" }, Ms = {
	key: 0,
	class: "request-card__rejection"
}, Ns = { class: "request-card__actions" }, Ps = { class: "request-form__row" }, Fs = { class: "request-form__field" }, Is = { class: "request-form__field" }, Ls = { class: "request-form__field" }, Rs = { class: "request-form__field" }, zs = {
	key: 0,
	class: "request-form__row"
}, Bs = { class: "request-form__field" }, Vs = { class: "request-form__field" }, Hs = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "RequestsPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? C, n = E(), r = U([]), a = U(!0), o = U(null), s = U(!1), c = U("movie"), l = U(""), u = U(""), d = U(""), f = U(""), p = U(""), m = U(!1), h = M(() => [...r.value].sort((e, t) => new Date(t.created_at).getTime() - new Date(e.created_at).getTime()));
		async function g(e = !1) {
			e && (a.value = !0), o.value = null;
			try {
				let e = await t.get("/api/v1/me/requests");
				r.value = e.requests ?? [];
			} catch (e) {
				o.value = v(e, "Failed to load requests."), n.error(o.value);
			} finally {
				e && (a.value = !1);
			}
		}
		async function _() {
			if (!(!l.value || !u.value.trim())) {
				m.value = !0;
				try {
					let e = {
						type: c.value,
						tmdb_id: Number(l.value),
						title: u.value.trim()
					};
					d.value.trim() && (e.poster_url = d.value.trim()), c.value === "series" && (f.value !== "" && (e.season = Number(f.value)), p.value !== "" && (e.episode = Number(p.value))), await t.post("/api/v1/me/requests", e), n.success("Request submitted."), b(), s.value = !1, await g();
				} catch (e) {
					n.error(v(e, "Failed to submit request."));
				} finally {
					m.value = !1;
				}
			}
		}
		async function y(e) {
			try {
				await t.delete(`/api/v1/me/requests/${e}`), n.success("Request deleted."), await g();
			} catch (e) {
				n.error(v(e, "Failed to delete request."));
			}
		}
		function b() {
			c.value = "movie", l.value = "", u.value = "", d.value = "", f.value = "", p.value = "";
		}
		function x(e) {
			return e === "series" ? {
				tone: "info",
				label: "Series"
			} : {
				tone: "accent",
				label: "Movie"
			};
		}
		function S(e) {
			switch (e) {
				case "pending": return {
					tone: "warning",
					label: "Pending"
				};
				case "approved": return {
					tone: "info",
					label: "Approved"
				};
				case "available": return {
					tone: "success",
					label: "Available"
				};
				case "rejected": return {
					tone: "error",
					label: "Rejected"
				};
				default: return {
					tone: "neutral",
					label: e
				};
			}
		}
		function w(e) {
			return new Date(e).toLocaleString();
		}
		return V(() => g(!0)), (e, t) => (H(), F("section", _s, [
			I("header", vs, [t[11] ||= I("div", { class: "requests__head-text" }, [I("h1", {
				id: "requests-heading",
				class: "requests__title"
			}, "Media Requests"), I("p", { class: "requests__subtitle" }, "Request movies or TV series to be added to your library.")], -1), R(D, {
				variant: "solid",
				size: "sm",
				onClick: t[0] ||= (e) => s.value = !0
			}, {
				default: Y(() => [...t[10] ||= [L("New Request", -1)]]),
				_: 1
			})]),
			a.value ? (H(), F("div", ys, [R(k, {
				variant: "text",
				lines: 6
			})])) : o.value ? (H(), N(A, {
				key: 1,
				icon: "alert",
				title: "Couldn't load requests",
				description: o.value
			}, {
				actions: Y(() => [R(D, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[1] ||= (e) => g(!0)
				}, {
					default: Y(() => [...t[12] ||= [L("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : r.value.length === 0 ? (H(), N(A, {
				key: 2,
				icon: "film",
				title: "No requests yet",
				description: "Movies or series you request will appear here."
			})) : (H(), F("div", bs, [(H(!0), F(j, null, W(h.value, (e) => (H(), F("article", {
				key: e.id,
				class: "request-card"
			}, [
				I("div", xs, [e.poster_url ? (H(), F("img", {
					key: 0,
					src: e.poster_url,
					alt: e.title,
					class: "request-card__poster-img",
					loading: "lazy"
				}, null, 8, Ss)) : (H(), F("div", Cs, [...t[13] ||= [I("svg", {
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "1.5",
					"aria-hidden": "true"
				}, [
					I("rect", {
						x: "3",
						y: "3",
						width: "18",
						height: "18",
						rx: "2"
					}),
					I("circle", {
						cx: "8.5",
						cy: "8.5",
						r: "1.5"
					}),
					I("path", { d: "M21 15l-5-5L5 21" })
				], -1)]]))]),
				I("div", ws, [
					I("div", Ts, [I("h2", Es, K(e.title), 1), I("div", Ds, [R(O, { tone: x(e.type).tone }, {
						default: Y(() => [L(K(x(e.type).label), 1)]),
						_: 2
					}, 1032, ["tone"]), R(O, { tone: S(e.status).tone }, {
						default: Y(() => [L(K(S(e.status).label), 1)]),
						_: 2
					}, 1032, ["tone"])])]),
					I("div", Os, [
						I("span", ks, "TMDB " + K(e.tmdb_id), 1),
						e.type === "series" ? (H(), F("span", As, " S" + K(String(e.season).padStart(2, "0")) + "E" + K(String(e.episode).padStart(2, "0")), 1)) : P("", !0),
						I("span", js, "Submitted " + K(w(e.created_at)), 1)
					]),
					e.status === "rejected" && e.rejection_reason ? (H(), F("p", Ms, K(e.rejection_reason), 1)) : P("", !0)
				]),
				I("div", Ns, [R(D, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete request for ${e.title}`,
					onClick: (t) => y(e.id)
				}, {
					default: Y(() => [...t[14] ||= [L(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])),
			R(i, {
				modelValue: s.value,
				"onUpdate:modelValue": t[9] ||= (e) => s.value = e,
				title: "New Media Request",
				size: "md",
				onClose: b
			}, {
				footer: Y(() => [R(D, {
					variant: "ghost",
					size: "sm",
					onClick: t[8] ||= (e) => {
						s.value = !1, b();
					}
				}, {
					default: Y(() => [...t[17] ||= [L(" Cancel ", -1)]]),
					_: 1
				}), R(D, {
					variant: "solid",
					size: "sm",
					disabled: !l.value || !u.value.trim() || m.value,
					loading: m.value,
					onClick: _
				}, {
					default: Y(() => [...t[18] ||= [L(" Submit Request ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])]),
				default: Y(() => [I("form", {
					class: "request-form",
					onSubmit: $t(_, ["prevent"])
				}, [
					I("div", Ps, [I("div", Fs, [t[16] ||= I("label", {
						class: "request-form__label",
						for: "req-type"
					}, "Type", -1), X(I("select", {
						id: "req-type",
						"onUpdate:modelValue": t[2] ||= (e) => c.value = e,
						class: "request-form__select"
					}, [...t[15] ||= [I("option", { value: "movie" }, "Movie", -1), I("option", { value: "series" }, "TV Series", -1)]], 512), [[Yt, c.value]])]), I("div", Is, [R(Ft, {
						modelValue: l.value,
						"onUpdate:modelValue": t[3] ||= (e) => l.value = e,
						label: "TMDB ID",
						type: "number",
						placeholder: "e.g. 550",
						min: 1
					}, null, 8, ["modelValue"])])]),
					I("div", Ls, [R(Ft, {
						modelValue: u.value,
						"onUpdate:modelValue": t[4] ||= (e) => u.value = e,
						label: "Title",
						type: "text",
						placeholder: "e.g. The Matrix"
					}, null, 8, ["modelValue"])]),
					I("div", Rs, [R(Ft, {
						modelValue: d.value,
						"onUpdate:modelValue": t[5] ||= (e) => d.value = e,
						label: "Poster URL (optional)",
						type: "text",
						placeholder: "https://image.tmdb.org/t/p/w500/..."
					}, null, 8, ["modelValue"])]),
					c.value === "series" ? (H(), F("div", zs, [I("div", Bs, [R(Ft, {
						modelValue: f.value,
						"onUpdate:modelValue": t[6] ||= (e) => f.value = e,
						label: "Season",
						type: "number",
						placeholder: "e.g. 1",
						min: 1
					}, null, 8, ["modelValue"])]), I("div", Vs, [R(Ft, {
						modelValue: p.value,
						"onUpdate:modelValue": t[7] ||= (e) => p.value = e,
						label: "Episode",
						type: "number",
						placeholder: "e.g. 1",
						min: 1
					}, null, 8, ["modelValue"])])])) : P("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-7fbf22b2"]]), Us = class {
	client;
	constructor(e) {
		this.client = e;
	}
	list() {
		return this.client.get("/api/v1/me/invite-links");
	}
	create(e) {
		return this.client.post("/api/v1/me/invite-links", e);
	}
	revoke(e) {
		return this.client.delete(`/api/v1/me/invite-links/${e}`);
	}
}, Ws = class {
	client;
	constructor(e) {
		this.client = e;
	}
	list() {
		return this.client.get("/api/v1/me/servers");
	}
}, Gs = class {
	client;
	constructor(e) {
		this.client = e;
	}
	listByServer(e) {
		return this.client.get(`/api/v1/me/libraries?server_id=${encodeURIComponent(e)}`);
	}
}, Ks = {
	class: "invite-links",
	"aria-labelledby": "invite-links-heading"
}, qs = { class: "invite-links__head" }, Js = {
	key: 0,
	class: "invite-links__skel"
}, Ys = {
	key: 3,
	class: "invite-links__list"
}, Xs = { class: "invite-link-card__main" }, Zs = { class: "invite-link-card__names" }, Qs = { class: "invite-link-card__server" }, $s = { class: "invite-link-card__library" }, ec = { class: "invite-link-card__meta" }, tc = { class: "invite-link-card__uses" }, nc = { class: "invite-link-card__expires" }, rc = { class: "invite-link-card__actions" }, ic = {
	class: "modal",
	role: "dialog",
	"aria-modal": "true",
	"aria-labelledby": "create-modal-title"
}, ac = { class: "modal__body" }, oc = { class: "form-grid" }, sc = { class: "form-field" }, cc = { class: "form-field" }, lc = { class: "form-field" }, uc = { class: "form-field" }, dc = { class: "form-field form-field--full" }, fc = { class: "modal__footer" }, pc = /*#__PURE__*/ t(/* @__PURE__ */ z({
	__name: "InviteLinksPage",
	props: { client: {} },
	setup(e) {
		let t = [
			{
				value: 604800,
				label: "7 days"
			},
			{
				value: 2592e3,
				label: "30 days"
			},
			{
				value: 7776e3,
				label: "90 days"
			},
			{
				value: 31536e3,
				label: "1 year"
			},
			{
				value: 0,
				label: "Never"
			}
		], n = [{
			value: "read",
			label: "Read"
		}, {
			value: "readwrite",
			label: "Read/Write"
		}], r = e.client ?? C, i = new Us(r), a = new Ws(r), o = new Gs(r), s = E(), c = U([]), l = U([]), u = U(!0), d = U(null), f = U(!1), p = U(!1), m = U(null), h = U(null), g = U("read"), _ = U(1), y = U(604800), b = U([]), x = U(!1), S = U(null), w = M(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of l.value) e.set(t.id, t.server_name);
			return e;
		}), ee = M(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of b.value) e.set(t.id, t.name);
			return e;
		}), te = M(() => l.value.map((e) => ({
			value: e.id,
			label: e.server_name
		}))), ne = M(() => [{
			value: "",
			label: "All Libraries"
		}, ...b.value.map((e) => ({
			value: e.id,
			label: e.name
		}))]);
		async function re(e = !1) {
			e && (u.value = !0), d.value = null;
			try {
				let e = await i.list();
				c.value = e.invite_links ?? [];
			} catch (e) {
				d.value = v(e, "Failed to load invite links."), s.error(d.value);
			} finally {
				e && (u.value = !1);
			}
		}
		async function T() {
			try {
				let e = await a.list();
				l.value = e.servers ?? [];
			} catch (e) {
				s.error(v(e, "Failed to load servers."));
			}
		}
		async function ie(e) {
			x.value = !0, h.value = null;
			try {
				let t = await o.listByServer(e);
				b.value = t.libraries ?? [];
			} catch (e) {
				s.error(v(e, "Failed to load libraries."));
			} finally {
				x.value = !1;
			}
		}
		async function ae() {
			if (!m.value) {
				s.error("Please select a server.");
				return;
			}
			p.value = !0;
			try {
				let e = await i.create({
					server_id: m.value,
					library_id: h.value || null,
					permission: g.value,
					max_uses: _.value,
					expires_in: y.value
				});
				try {
					await navigator.clipboard.writeText(e.url), s.success("Invite link created and copied to clipboard!");
				} catch {
					s.success("Invite link created!");
				}
				le(), await re();
			} catch (e) {
				s.error(v(e, "Failed to create invite link."));
			} finally {
				p.value = !1;
			}
		}
		async function oe(e) {
			try {
				await i.revoke(e), s.success("Invite link revoked."), await re();
			} catch (e) {
				s.error(v(e, "Failed to revoke invite link."));
			}
		}
		async function se(e) {
			S.value = e.id;
			try {
				await navigator.clipboard.writeText(e.url), s.success("Link copied to clipboard!");
			} catch {
				s.error("Failed to copy link.");
			} finally {
				S.value = null;
			}
		}
		async function ce() {
			ue(), f.value = !0, await T();
		}
		function le() {
			f.value = !1, ue();
		}
		function ue() {
			m.value = null, h.value = null, g.value = "read", _.value = 1, y.value = 604800, b.value = [];
		}
		function de(e) {
			e ? ie(String(e)) : (b.value = [], h.value = null);
		}
		function fe(e) {
			return w.value.get(e) ?? e;
		}
		function pe(e) {
			return e === null ? "All Libraries" : ee.value.get(e) ?? e;
		}
		function me(e) {
			return e === null ? "Never" : (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function he(e, t) {
			return t === 0 ? `${e} / Unlimited` : `${e} / ${t}`;
		}
		function ge(e) {
			switch (e) {
				case "read": return "info";
				case "readwrite": return "success";
				default: return "neutral";
			}
		}
		return V(() => re(!0)), (e, r) => (H(), F("section", Ks, [
			I("header", qs, [r[7] ||= I("div", { class: "invite-links__head-text" }, [I("h1", {
				id: "invite-links-heading",
				class: "invite-links__title"
			}, "Invite Links"), I("p", { class: "invite-links__subtitle" }, "Create and manage invite links for sharing access to your servers.")], -1), R(D, {
				variant: "solid",
				size: "md",
				"left-icon": "plus",
				onClick: ce
			}, {
				default: Y(() => [...r[6] ||= [L(" New Invite ", -1)]]),
				_: 1
			})]),
			u.value ? (H(), F("div", Js, [
				R(k, {
					variant: "rect",
					height: "120px"
				}),
				R(k, {
					variant: "rect",
					height: "120px"
				}),
				R(k, {
					variant: "rect",
					height: "120px"
				})
			])) : d.value ? (H(), N(A, {
				key: 1,
				icon: "alert",
				title: "Couldn't load invite links",
				description: d.value
			}, {
				actions: Y(() => [R(D, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: r[0] ||= (e) => re(!0)
				}, {
					default: Y(() => [...r[8] ||= [L("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : c.value.length === 0 ? (H(), N(A, {
				key: 2,
				icon: "bookmark-plus",
				title: "No invite links",
				description: "Create an invite link to share access to your servers and libraries."
			})) : (H(), F("div", Ys, [(H(!0), F(j, null, W(c.value, (e) => (H(), F("article", {
				key: e.id,
				class: "invite-link-card"
			}, [I("div", Xs, [I("div", Zs, [
				I("span", Qs, K(fe(e.server_id)), 1),
				r[9] ||= I("span", { class: "invite-link-card__separator" }, "›", -1),
				I("span", $s, K(pe(e.library_id)), 1)
			]), I("div", ec, [
				R(O, { tone: ge(e.permission) }, {
					default: Y(() => [L(K(e.permission), 1)]),
					_: 2
				}, 1032, ["tone"]),
				I("span", tc, K(he(e.use_count, e.max_uses)) + " uses", 1),
				r[10] ||= I("span", { class: "invite-link-card__divider" }, "·", -1),
				I("span", nc, " Expires " + K(me(e.expires_at)), 1)
			])]), I("div", rc, [R(D, {
				variant: "ghost",
				size: "sm",
				loading: S.value === e.id,
				onClick: (t) => se(e)
			}, {
				default: Y(() => [...r[11] ||= [L(" Copy URL ", -1)]]),
				_: 1
			}, 8, ["loading", "onClick"]), R(D, {
				variant: "ghost",
				size: "sm",
				onClick: (t) => oe(e.id)
			}, {
				default: Y(() => [...r[12] ||= [L(" Revoke ", -1)]]),
				_: 1
			}, 8, ["onClick"])])]))), 128))])),
			(H(), N(It, { to: "body" }, [f.value ? (H(), F("div", {
				key: 0,
				class: "modal-backdrop",
				onClick: $t(le, ["self"])
			}, [I("div", ic, [
				I("header", { class: "modal__header" }, [r[14] ||= I("h2", {
					id: "create-modal-title",
					class: "modal__title"
				}, "New Invite Link", -1), I("button", {
					type: "button",
					class: "modal__close",
					"aria-label": "Close",
					onClick: le
				}, [...r[13] ||= [I("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [I("path", { d: "M18 6L6 18M6 6l12 12" })], -1)]])]),
				I("div", ac, [I("div", oc, [
					I("div", sc, [r[15] ||= I("label", {
						class: "form-label",
						for: "server-select"
					}, [L("Server "), I("span", { class: "form-required" }, "*")], -1), R(We, {
						id: "server-select",
						modelValue: m.value,
						"onUpdate:modelValue": r[1] ||= (e) => m.value = e,
						options: te.value,
						placeholder: "Select a server",
						onChange: de
					}, null, 8, ["modelValue", "options"])]),
					I("div", cc, [r[16] ||= I("label", {
						class: "form-label",
						for: "library-select"
					}, "Library", -1), R(We, {
						id: "library-select",
						modelValue: h.value,
						"onUpdate:modelValue": r[2] ||= (e) => h.value = e,
						options: ne.value,
						disabled: !m.value || x.value,
						placeholder: x.value ? "Loading..." : "All Libraries"
					}, null, 8, [
						"modelValue",
						"options",
						"disabled",
						"placeholder"
					])]),
					I("div", lc, [r[17] ||= I("label", {
						class: "form-label",
						for: "permission-select"
					}, "Permission", -1), R(We, {
						id: "permission-select",
						modelValue: g.value,
						"onUpdate:modelValue": r[3] ||= (e) => g.value = e,
						options: n
					}, null, 8, ["modelValue"])]),
					I("div", uc, [r[18] ||= I("label", {
						class: "form-label",
						for: "max-uses"
					}, "Max Uses", -1), X(I("input", {
						id: "max-uses",
						"onUpdate:modelValue": r[4] ||= (e) => _.value = e,
						type: "number",
						min: "0",
						class: "form-input"
					}, null, 512), [[
						Xt,
						_.value,
						void 0,
						{ number: !0 }
					]])]),
					I("div", dc, [r[19] ||= I("label", {
						class: "form-label",
						for: "expires-select"
					}, "Expires In", -1), R(We, {
						id: "expires-select",
						modelValue: y.value,
						"onUpdate:modelValue": r[5] ||= (e) => y.value = e,
						options: t
					}, null, 8, ["modelValue"])])
				])]),
				I("footer", fc, [R(D, {
					variant: "ghost",
					size: "md",
					onClick: le
				}, {
					default: Y(() => [...r[20] ||= [L("Cancel", -1)]]),
					_: 1
				}), R(D, {
					variant: "solid",
					size: "md",
					loading: p.value,
					disabled: !m.value,
					onClick: ae
				}, {
					default: Y(() => [...r[21] ||= [L(" Create Invite ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])])
			])])) : P("", !0)]))
		]));
	}
}), [["__scopeId", "data-v-3342fa16"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function mc(e, t) {
	let n = Ke(), r = !1;
	n.setLibraryId(void 0), n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = J(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = J(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/spatial-nav.ts
function hc(e) {
	return {
		x: (e.left + e.right) / 2,
		y: (e.top + e.bottom) / 2
	};
}
var gc = .5, _c = 2, vc = 1e6;
function yc(e, t, n, r) {
	return e < r && n < t;
}
function bc(e, t, n) {
	let r = hc(e), i = null, a = Infinity;
	for (let o of n) {
		let n = hc(o.rect), s, c, l;
		switch (t) {
			case "right":
				if (n.x <= r.x + gc) continue;
				s = n.x - r.x, c = Math.abs(n.y - r.y), l = yc(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "left":
				if (n.x >= r.x - gc) continue;
				s = r.x - n.x, c = Math.abs(n.y - r.y), l = yc(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "down":
				if (n.y <= r.y + gc) continue;
				s = n.y - r.y, c = Math.abs(n.x - r.x), l = yc(e.left, e.right, o.rect.left, o.rect.right);
				break;
			case "up":
				if (n.y >= r.y - gc) continue;
				s = r.y - n.y, c = Math.abs(n.x - r.x), l = yc(e.left, e.right, o.rect.left, o.rect.right);
				break;
		}
		let u = s + _c * c;
		l && (u -= vc), (u < a || u === a && (i === null || o.id < i.id)) && (a = u, i = o);
	}
	return i;
}
//#endregion
//#region src/composables/useSpatialNav.ts
var xc = {
	up: ["ArrowUp"],
	down: ["ArrowDown"],
	left: ["ArrowLeft"],
	right: ["ArrowRight"]
};
function Sc(e) {
	return {
		left: e.left,
		top: e.top,
		right: e.right,
		bottom: e.bottom
	};
}
function Cc(e) {
	return e.width <= 0 && e.height <= 0;
}
function wc() {
	let e = Array.from(Q), t = (e) => {
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
function Tc(e = {}) {
	let t = {
		...xc,
		...e.keymap
	};
	function n() {
		let e = [], t = /* @__PURE__ */ new Map(), n = 0;
		for (let r of Q) {
			let i = r.getBoundingClientRect();
			if (Cc(i)) continue;
			let a = String(n++);
			e.push({
				id: a,
				rect: Sc(i)
			}), t.set(a, r);
		}
		return {
			candidates: e,
			byId: t
		};
	}
	function r(e, t) {
		let n = typeof document < "u" ? document.activeElement : null;
		if (n && Q.has(n)) {
			let e = n.getBoundingClientRect();
			if (!Cc(e)) return Sc(e);
		}
		let r = t[0];
		return r && e.has(r.id) ? r.rect : null;
	}
	function i(t) {
		let { candidates: i, byId: a } = n();
		if (i.length === 0) return e.onEdge?.(t), !1;
		let o = r(a, i);
		if (!o) return e.onEdge?.(t), !1;
		let s = typeof document < "u" ? document.activeElement : null, c = bc(o, t, s ? i.filter((e) => a.get(e.id) !== s) : i);
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
		if (!qt(e.enabled ?? !1) || t.ctrlKey || t.metaKey || t.altKey || ue(t.target) || document.activeElement?.closest("[data-focus-trap]") || t.target?.closest?.("[data-focus-trap]")) return;
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
		wc()[0]?.focus();
	}
	return V(() => {
		typeof document < "u" && document.addEventListener("keydown", o);
	}), Ut(() => {
		typeof document < "u" && document.removeEventListener("keydown", o);
	}), {
		focus: s,
		move: i,
		focusFirst: c,
		registry: Q
	};
}
//#endregion
//#region src/composables/useOnline.ts
function Ec() {
	let e = () => typeof navigator > "u" || navigator.onLine, t = U(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), Wt(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Gt(t);
}
//#endregion
//#region src/index.ts
var Dc = Bt(() => import("./MediaDetail-wysifYyj.js").then((e) => e.n)), Oc = Bt(() => import("./MetadataMatchModal-BgDi5i1u.js").then((e) => e.n)), kc = Bt(() => import("./FilterBar-jCrdCG41.js").then((e) => e.n));
//#endregion
export { at as ALL_LOGS, gt as AdminBackupApi, _t as AdminCastApi, xt as AdminCollectionsApi, ot as AdminDashboardApi, vt as AdminDlnaServerApi, St as AdminHistoryApi, jt as AdminHubDashboardApi, ht as AdminIntegrationsApi, Tt as AdminLibrariesApi, bt as AdminLiveTvApi, it as AdminLogsApi, rt as AdminMetadataSourcesApi, At as AdminPluginsApi, yt as AdminRemoteAccessApi, mt as AdminServicesApi, Et as AdminSettingsApi, Ct as AdminSyncPlayApi, ut as AdminUsersApi, pt as AdminWebhooksApi, ee as ApiClient, b as ApiError, e as AppBackdrop, Sn as AppLayout, O as Badge, D as Button, Fe as CONNECTION_API_BASE_KEY, je as CONNECTION_CONFIRMED_ORIGIN_KEY, wr as CURRENT_SERVER_ID_KEY, Tr as CURRENT_SERVER_NAME_KEY, Ue as Chip, Ge as Combobox, u as DEFAULT_CAPTION_STYLE, f as DEFAULT_MESSAGES, c as DEFAULT_PREFERENCES, A as EmptyState, Co as FederationPage, Ko as FederationSharesPage, kc as FilterBar, n as Icon, r as IconButton, pc as InviteLinksPage, ve as Kbd, wt as LIBRARY_TYPES, Bi as LibraryScanPage, g as LocalStorageTokenStore, Mt as LoginForm, ns as ManageSharesPage, Ze as MediaCard, Dc as MediaDetail, Qe as MediaGrid, Ee as MediaHomeRow, $e as MediaRow, Ye as Menu, Oc as MetadataMatchModal, i as Modal, na as MyServersPage, te as NetworkError, Ot as PLUGIN_SECRET_MASK, qe as PageHint, Oi as PageTransition, _r as PhlixApp, ct as RATING_LABELS, lt as RATING_MAX, st as RATING_OPTIONS, se as RESUME_MAX_RATIO, ae as RESUME_MIN_SECONDS, Hs as RequestsPage, Di as Reveal, be as SORT_TITLE_ARTICLES, dt as SUBSCRIBABLE_EVENTS, We as Select, lo as ServerDetailPage, Pt as SettingsForm, gs as SharedWithMePage, fn as Sheet, Nt as SignupForm, k as Skeleton, Ve as Slider, nt as SourcePriorityEditor, me as Spinner, He as Switch, x as TMDB_UNCONFIGURED_CODE, Je as Tabs, le as ThumbRating, _ as TimeoutError, Ei as ToastHost, fe as Tooltip, ft as WEBHOOK_EVENT_CATEGORIES, li as adminMenu, nr as applyStoredThemeEarly, bc as bestCandidate, mc as bindMediaStoreToRouter, oi as buildAdminRoutes, ci as buildHubAdminRoutes, tt as buildMediaQuery, et as buildMediaUrl, si as buildServerAdminRoutes, ti as commonAdminPages, ye as compareByStrippedTitle, vi as createPhlixApp, p as createTranslator, $n as deriveAccentVars, v as errMessage, xe as fetchLibraries, Sr as focusable, Q as focusableRegistry, Be as formatPageTitle, ge as fuzzyScore, y as getDefaultApiHeaders, l as hasStoredPreferences, ri as hubAdminPages, Cr as installFocusable, Ne as isAllowedBase, S as isOffline, ke as isPlaintextPublic, De as isPrivateHost, h as isTmdbUnconfigured, _e as matchCommand, d as mergeMessages, Me as normalizeBase, Pe as originOf, kt as pluginErrorCode, Dt as pluginValidationErrors, Oe as probeServer, s as readStoredPreferences, hc as rectCenter, ni as serverAdminPages, Re as setAppName, w as setDefaultApiHeaders, ze as setPageTitle, Ce as sortLibraries, Se as stripLeadingArticle, re as useApiBase, T as useAuthStore, ir as useCommandPaletteHotkey, he as useCommandStore, Ae as useConnectionStore, a as useFocusTrap, we as useLibrariesStore, ne as useMediaApiBase, Ke as useMediaStore, m as useMessages, Ec as useOnline, Le as usePageTitle, ie as usePlayerStore, lr as usePreconnect, o as usePreferencesStore, Xe as usePrefetch, pr as useResumeReporter, Te as useResumeSync, kr as useServerStore, Tc as useSpatialNav, rr as useTheme, E as useToastStore, ce as useUserItemDataStore, Ie as withScheme };

//# sourceMappingURL=phlix-ui.js.map