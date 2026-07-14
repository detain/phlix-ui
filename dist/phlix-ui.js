import { r as e } from "./AuthField-BCxtf4gP.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-X5skTbAE.js";
import { n as r, t as i } from "./Modal-CSaTqZvF.js";
import { t as a } from "./useFocusTrap-DZxA3ZEr.js";
import { a as o, i as s, n as c, r as l, t as u } from "./usePreferencesStore-g-d6JBr9.js";
import { i as d, n as f, r as p, t as m } from "./useMessages-QU3qvt7A.js";
import { a as h, c as g, d as _, f as v, i as ee, l as te, n as ne, p as re, r as y, s as ie, t as ae, u as oe } from "./client-D1nDQ0cP.js";
import { n as se, t as ce } from "./useApiBase-CV_r-Kk4.js";
import { t as b } from "./useAuthStore-C_Rnq3Bo.js";
import { i as le, n as ue, r as de, t as fe } from "./usePlayerStore-fCCh6mOw.js";
import { t as x } from "./useToastStore-BDoKlU6N.js";
import { n as pe, t as me } from "./ThumbRating-jRpqLBjb.js";
import { i as he, o as ge } from "./shortcuts-BqRA1aW9.js";
import { n as _e, t as ve } from "./NetworkHealthIndicator-BvK3FV8I.js";
import { t as ye } from "./Spinner-D1bwTvld.js";
import { i as be, n as xe, r as Se, t as Ce } from "./Kbd-Bmk72RCb.js";
import { a as we, i as Te, n as Ee, o as De, r as Oe, t as ke } from "./useLibrariesStore-B4M08nqy.js";
import { n as Ae, t as je } from "./HomeRow-Du7QPUpq.js";
import { a as Me, c as Ne, i as Pe, l as Fe, n as Ie, o as Le, r as Re, s as ze, t as Be, u as Ve } from "./useConnectionStore-BxMhAb3d.js";
import { i as He, n as Ue, r as We, t as Ge } from "./usePageTitle-BO3GGF3M.js";
import { t as S } from "./Button-btm-GCUN.js";
import { t as C } from "./Badge-D_aUH3dO.js";
import { t as Ke } from "./Slider-LnnvB5jy.js";
import { t as qe } from "./Switch-DyS2L5gX.js";
import { t as Je } from "./Chip-Dqypy8Bt.js";
import { t as Ye } from "./Select-Bx8h2mSF.js";
import { n as Xe, t as Ze } from "./useMediaStore-Cyf52FjL.js";
import { t as w } from "./Skeleton-DhQmxeNg.js";
import { t as T } from "./EmptyState-CfyGawh7.js";
import { t as Qe } from "./PageHint-CPoTKHik.js";
import { t as $e } from "./Tabs-D8iKNBl3.js";
import { a as et, i as tt, t as nt } from "./MediaCard-BJNzaxG9.js";
import { t as rt } from "./MediaGrid--nL1f8dY.js";
import { t as it } from "./MediaRow-Chl6-trt.js";
import { n as at, t as ot } from "./media-query-DKjhlX8r.js";
import { n as st, t as ct } from "./metadata-sources-DZjIprJK.js";
import { n as lt, t as ut } from "./logs-DadTfaTq.js";
import { t as dt } from "./dashboard-BTCOCTHQ.js";
import { n as ft, r as pt, t as mt } from "./users-B74FC_jE.js";
import { n as ht, r as gt, t as _t } from "./webhooks-BBTLnFKm.js";
import { t as vt } from "./services-C907MGdw.js";
import { t as yt } from "./integrations-DLAG9ISY.js";
import { t as bt } from "./backup-IdY_vzc2.js";
import { t as xt } from "./cast-BvFcBEB6.js";
import { t as St } from "./dlnaServer-B5Sg4MkS.js";
import { t as Ct } from "./remoteAccess-DVKRpKQ8.js";
import { t as wt } from "./liveTv-Dbjt901v.js";
import { t as Tt } from "./collections-CH3HLdcd.js";
import { t as Et } from "./history-Cz9DDbWX.js";
import { t as Dt } from "./syncPlay-DPzJkgkK.js";
import { n as Ot, t as kt } from "./libraries-CXAz_kXs.js";
import { t as At } from "./settings-m4upFcmH.js";
import { i as jt, n as Mt, r as Nt, t as Pt } from "./plugins-DsJGlqh0.js";
import { t as Ft } from "./hubDashboard-BhOaaDD-.js";
import { t as It } from "./LoginForm-CztRWfIY.js";
import { t as Lt } from "./SignupForm-CDpcltXj.js";
import { t as Rt } from "./SettingsForm-1kz2jHKI.js";
import { Fragment as E, Teleport as zt, Transition as Bt, TransitionGroup as Vt, computed as D, createApp as Ht, createBlock as O, createCommentVNode as k, createElementBlock as A, createElementVNode as j, createTextVNode as M, createVNode as N, defineAsyncComponent as Ut, defineComponent as P, inject as Wt, normalizeClass as F, normalizeStyle as Gt, onBeforeUnmount as I, onMounted as L, onScopeDispose as Kt, openBlock as R, readonly as qt, ref as z, renderList as B, renderSlot as V, resolveDynamicComponent as Jt, toDisplayString as H, toValue as Yt, unref as U, useId as Xt, vModelText as Zt, watch as W, watchEffect as Qt, withCtx as G, withDirectives as $t, withModifiers as en } from "vue";
import { createPinia as tn, defineStore as nn } from "pinia";
import { RouterLink as K, RouterView as rn, createRouter as an, createWebHistory as on, useRouter as sn } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var cn = ["aria-labelledby"], ln = {
	key: 0,
	class: "phlix-sheet__header"
}, un = ["id"], dn = { class: "phlix-sheet__body" }, fn = {
	key: 1,
	class: "phlix-sheet__footer"
}, pn = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		let n = e, i = t, o = z(n.modelValue);
		W(() => n.modelValue, (e) => o.value = e);
		let s = z(null), c = Xt();
		function l() {
			i("update:modelValue", !1), i("close");
		}
		function u() {
			n.dismissible && l();
		}
		return a(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (R(), O(zt, { to: "body" }, [N(Bt, { name: `phlix-sheet-${e.side}` }, {
			default: G(() => [e.modelValue ? (R(), A("div", {
				key: 0,
				class: F(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: en(u, ["self"])
			}, [j("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? U(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (R(), A("header", ln, [e.title ? (R(), A("h2", {
					key: 0,
					id: U(c),
					class: "phlix-sheet__title"
				}, H(e.title), 9, un)) : k("", !0), e.hideClose ? k("", !0) : (R(), O(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : k("", !0),
				j("div", dn, [V(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (R(), A("footer", fn, [V(t.$slots, "footer", {}, void 0, !0)])) : k("", !0)
			], 8, cn)], 34)) : k("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6ff9e0f5"]]);
//#endregion
//#region src/composables/useHeaderHideOnScroll.ts
function mn() {
	let e = z(0), t = z("none"), n = z(!1), r = z(!1);
	function i() {
		if (typeof window > "u" || r.value) return;
		let i = window.scrollY, a = i - e.value;
		Math.abs(a) > 50 && (t.value = a > 0 ? "down" : "up", e.value = i), i > 50 ? n.value = t.value === "down" : n.value = !1;
	}
	return typeof window < "u" && typeof window.addEventListener == "function" && (typeof window.matchMedia == "function" && (r.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches, window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
		r.value = e.matches, r.value && (n.value = !1, t.value = "none");
	})), window.addEventListener("scroll", i, { passive: !0 }), Kt(() => {
		window.removeEventListener("scroll", i);
	}), i()), {
		isHidden: qt(n),
		scrollDirection: qt(t)
	};
}
//#endregion
//#region src/app/AppLayout.vue?vue&type=script&setup=true&lang.ts
var hn = { class: "shell" }, gn = {
	class: "shell__skip",
	href: "#main"
}, _n = { class: "shell__inner" }, vn = { class: "shell__brand" }, yn = ["aria-label"], bn = { class: "shell__actions" }, xn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, Sn = {
	key: 0,
	class: "shell__footer"
}, Cn = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "AppLayout",
	setup(t) {
		let n = o(), i = z(!1), { t: a } = m(), { isHidden: s } = mn();
		return (t, o) => (R(), A("div", hn, [
			j("a", gn, H(U(a)("shell.skipToContent")), 1),
			N(e, { enabled: U(n).atmosphere }, null, 8, ["enabled"]),
			j("header", { class: F(["shell__bar", { "is-hidden": U(s) }]) }, [j("div", _n, [
				j("div", vn, [V(t.$slots, "logo", {}, () => [o[3] ||= j("span", { class: "shell__wordmark" }, [M("Phlix"), j("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				j("nav", {
					class: "shell__nav",
					"aria-label": U(a)("shell.primaryNav")
				}, [V(t.$slots, "nav", {}, void 0, !0)], 8, yn),
				o[4] ||= j("span", { class: "shell__spacer" }, null, -1),
				j("div", bn, [V(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (R(), O(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: U(a)("shell.openMenu"),
					variant: "ghost",
					onClick: o[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : k("", !0)
			])], 2),
			j("main", xn, [V(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (R(), A("footer", Sn, [V(t.$slots, "footer", {}, void 0, !0)])) : k("", !0),
			N(pn, {
				modelValue: i.value,
				"onUpdate:modelValue": o[2] ||= (e) => i.value = e,
				side: "left",
				title: U(a)("shell.menu")
			}, {
				default: G(() => [j("nav", {
					class: "shell__drawer",
					onClick: o[1] ||= (e) => i.value = !1
				}, [V(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-bdbc790a"]]), wn = /* @__PURE__ */ P({
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
		}, c = D(() => i[(i.indexOf(t.theme) + 1) % i.length]), l = D(() => a[t.theme] ?? "moon"), u = D(() => n("shell.themeToggleLabel", {
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
}), Tn = ["aria-label", "aria-expanded"], En = {
	key: 0,
	class: "usermenu__avatar"
}, Dn = ["src", "alt"], On = {
	key: 1,
	class: "usermenu__avatar-initials"
}, kn = ["aria-label"], An = { class: "usermenu__head" }, jn = { class: "usermenu__avatar usermenu__avatar--lg" }, Mn = ["src", "alt"], Nn = {
	key: 1,
	class: "usermenu__avatar-initials"
}, Pn = { class: "usermenu__name" }, Fn = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "UserMenu",
	setup(e) {
		let t = b(), r = sn(), i = Wt("phlixConfig", null), o = D(() => i?.routerBase ?? "/app"), { t: s } = m(), c = z(!1), l = z(null), u = z(null), d = D(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = z(!1);
		function p(e) {
			let t = e.trim().split(/\s+/).filter(Boolean);
			return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
		}
		W(() => t.user?.avatar_url, () => {
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
		return W(c, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", v, !0) : document.removeEventListener("pointerdown", v, !0));
		}), I(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", v, !0);
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
			onClick: r[1] ||= (e) => c.value = !c.value
		}, [U(t).isLoggedIn ? (R(), A("span", En, [U(t).user?.avatar_url && !f.value ? (R(), A("img", {
			key: 0,
			src: U(t).user.avatar_url,
			alt: d.value,
			class: "usermenu__avatar-img",
			onError: r[0] ||= (e) => f.value = !0
		}, null, 40, Dn)) : (R(), A("span", On, H(p(d.value)), 1))])) : (R(), O(n, {
			key: 1,
			name: "user"
		}))], 8, Tn), c.value ? (R(), A("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": U(s)("shell.account"),
			tabindex: "-1"
		}, [U(t).isLoggedIn ? (R(), A(E, { key: 0 }, [
			j("div", An, [j("span", jn, [U(t).user?.avatar_url && !f.value ? (R(), A("img", {
				key: 0,
				src: U(t).user.avatar_url,
				alt: d.value,
				class: "usermenu__avatar-img",
				onError: r[2] ||= (e) => f.value = !0
			}, null, 40, Mn)) : (R(), A("span", Nn, H(p(d.value)), 1))]), j("span", Pn, H(d.value), 1)]),
			j("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[3] ||= (e) => g(`${o.value}/history`)
			}, [N(n, { name: "film" }), M(" " + H(U(s)("shell.watchHistory")), 1)]),
			j("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[4] ||= (e) => g(`${o.value}/settings`)
			}, [N(n, { name: "settings" }), M(" " + H(U(s)("shell.settings")), 1)]),
			j("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: _
			}, [N(n, { name: "log-out" }), M(" " + H(U(s)("shell.signOut")), 1)])
		], 64)) : (R(), A("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[5] ||= (e) => g(`${o.value}/login`)
		}, [N(n, { name: "user" }), M(" " + H(U(s)("shell.signIn")), 1)]))], 8, kn)) : k("", !0)], 512));
	}
}), [["__scopeId", "data-v-2a0ffb08"]]), In = ["aria-label"], Ln = ["src", "poster"], Rn = { class: "mini__body" }, zn = { class: "mini__title" }, Bn = { class: "mini__controls" }, Vn = ["aria-label"], Hn = ["aria-label", "aria-pressed"], Un = ["aria-label"], Wn = ["aria-label"], Gn = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Kn = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = le(), { t: a } = m(), o = z(null), s = z(null), c = pe(), l = Wt("phlixConfig", null), u = D(() => i.current ? c.isFavorite(i.current.id) : !1);
		function d() {
			let e = i.current?.id;
			e && c.toggleFavorite(e, l?.apiBase ?? "");
		}
		let f = D(() => i.miniPlayer && !!i.current && (!!i.streamUrl || !!i.hlsMasterUrl)), p = D(() => i.current?.name ?? ""), h = D(() => Math.max(0, Math.min(1, i.progress)));
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
		function ne() {
			i.current && r("expand", i.current.id);
		}
		function re() {
			i.closePlayer();
		}
		async function y() {
			let e = o.value;
			!e || !i.hlsMasterUrl || (s.value?.destroy(), s.value = null, s.value = await ge(e, i.hlsMasterUrl, {
				startPosition: i.position,
				onReady: () => {
					let e = o.value;
					e && (e.volume = i.volume, e.muted = i.muted, e.playbackRate = i.rate, i.playing && e.play()?.catch(() => {}));
				}
			}));
		}
		return W(() => f.value, async (e) => {
			if (!e) {
				s.value?.destroy(), s.value = null;
				return;
			}
			!i.hlsMasterUrl || i.streamUrl || await y();
		}), L(async () => {
			f.value && i.hlsMasterUrl && !i.streamUrl && await y();
		}), W(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), W(() => i.lastCommand, (e) => {
			let t = o.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : i.position + e.value, r = t.duration && t.duration > 0 ? t.duration : i.duration, a = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = a, i.updateProgress(a, t.duration || void 0);
		}), I(() => {
			s.value?.destroy(), s.value = null, o.value?.pause?.();
		}), (e, t) => (R(), O(Bt, { name: "mini" }, {
			default: G(() => [f.value ? (R(), A("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": U(a)("player.miniPlayer")
			}, [
				j("video", {
					ref_key: "videoRef",
					ref: o,
					class: "mini__video",
					src: U(i).hlsMasterUrl ? "" : U(i).streamUrl,
					poster: U(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: g,
					onPlay: _,
					onPause: v,
					onTimeupdate: ee,
					onClick: ne
				}, null, 40, Ln),
				j("div", Rn, [j("p", zn, H(p.value), 1), j("div", Bn, [
					j("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": U(i).playing ? U(a)("player.pause") : U(a)("player.play"),
						onClick: te
					}, [N(n, { name: U(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, Vn),
					U(i).current ? (R(), A("button", {
						key: 0,
						type: "button",
						class: F(["mini__btn mini__btn--favorite", { "is-on": u.value }]),
						"aria-label": u.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": u.value ? "true" : "false",
						onClick: d
					}, [N(n, { name: u.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Hn)) : k("", !0),
					j("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": U(a)("player.expand"),
						onClick: ne
					}, [N(n, { name: "expand" })], 8, Un),
					j("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": U(a)("player.closePlayer"),
						onClick: re
					}, [N(n, { name: "x" })], 8, Wn)
				])]),
				j("div", Gn, [j("div", {
					class: "mini__progress-fill",
					style: Gt({ transform: `scaleX(${h.value})` })
				}, null, 4)])
			], 8, In)) : k("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
//#region src/composables/color.ts
function qn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var q = (e) => Math.max(0, Math.min(255, Math.round(e))), Jn = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => q(e).toString(16).padStart(2, "0")).join("");
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
var Zn = ({ r: e, g: t, b: n }, r) => `rgba(${q(e)}, ${q(t)}, ${q(n)}, ${r})`;
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
	let t = qn(e);
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
	e && r && (n.theme = e), t !== void 0 && r && (n.tv = t), tr(n, n.reducedMotion === "on" ? !0 : n.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
	let e = be(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), Kt(() => document.removeEventListener("keydown", t)));
}
//#endregion
//#region src/composables/usePreconnect.ts
function J(e, t) {
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
function ar(e) {
	let t = J(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = J(n, t);
	return !r || t && r === t ? null : r;
}
function or(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (J(e.href) === t) return !0;
	return !1;
}
function sr(e, t, n, r) {
	if (or(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function cr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = J(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = J(e);
		r && (n && r === n || a.has(r) || (a.add(r), sr("preconnect", r, t.crossOrigin === !0, i), sr("dns-prefetch", r, !1, i)));
	}
	i.length && Kt(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeReporter.ts
var lr = "phlix.deviceId", ur = 15e3;
function dr() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(lr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(lr, e)), e;
	} catch {
		return "web";
	}
}
function fr() {
	let e = le(), t = b(), n = dr(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < ur)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * de),
					duration_ticks: Math.floor(e.duration * de),
					is_paused: !e.playing
				});
			} catch {} finally {
				a = !1;
			}
		}
	}
	return W(() => Math.floor(e.position), () => void s()), W(() => e.playing, () => void s(!0)), { report: s };
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var pr = ["src", "alt"], mr = { class: "brand-wordmark" }, hr = {
	key: 1,
	class: "brand-tagline"
}, gr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "PhlixApp",
	setup(e) {
		rr();
		let t = be(), i = sn(), { t: a } = m();
		ir();
		let o = Ut(() => import("./CommandPalette-BlvS4XIa.js")), s = z(!1);
		W(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = Wt("phlixConfig", null);
		cr(ar({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = b(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = Ae();
		W(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), fr();
		let p = D(() => l?.branding ?? {}), h = D(() => p.value.wordmark ?? "Phlix"), g = D(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = D(() => l?.home ?? l?.routerBase ?? "/app"), v = ke(), ee = D(() => g.value.some((e) => e.libraryLinks));
		W(() => u.isLoggedIn && ee.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function te(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (R(), O(Cn, null, {
			logo: G(() => [N(U(K), {
				to: _.value,
				class: "brand"
			}, {
				default: G(() => [
					p.value.logoSrc ? (R(), A("img", {
						key: 0,
						src: p.value.logoSrc,
						alt: p.value.logoAlt ?? h.value,
						class: "brand-logo"
					}, null, 8, pr)) : k("", !0),
					j("span", mr, [M(H(h.value), 1), i[1] ||= j("span", { class: "brand-dot" }, ".", -1)]),
					p.value.tagline ? (R(), A("span", hr, H(p.value.tagline), 1)) : k("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: G(() => [g.value.length ? (R(!0), A(E, { key: 0 }, B(g.value, (e) => (R(), A(E, { key: e.id }, [(R(), O(Jt(e.href ? "a" : U(K)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? te(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: G(() => [e.icon ? (R(), O(n, {
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
			])), (R(!0), A(E, null, B(e.libraryLinks ? U(v).items : [], (t) => (R(), O(U(K), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: G(() => [M(H(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (R(), A(E, { key: 1 }, [
				N(U(K), {
					to: _.value,
					class: "nav-link"
				}, {
					default: G(() => [M(H(U(a)("shell.browse")), 1)]),
					_: 1
				}, 8, ["to"]),
				N(U(K), {
					to: `${_.value}/recommendations`,
					class: "nav-link"
				}, {
					default: G(() => [M(H(U(a)("shell.recommendations")), 1)]),
					_: 1
				}, 8, ["to"]),
				N(U(K), {
					to: `${_.value}/explore`,
					class: "nav-link"
				}, {
					default: G(() => [M(H(U(a)("shell.explore")), 1)]),
					_: 1
				}, 8, ["to"]),
				N(U(K), {
					to: `${_.value}/syncplay`,
					class: "nav-link"
				}, {
					default: G(() => [M(H(U(a)("syncplay.syncPlay")), 1)]),
					_: 1
				}, 8, ["to"]),
				N(U(K), {
					to: `${_.value}/music`,
					class: "nav-link"
				}, {
					default: G(() => [M(H(U(a)("music.nav")), 1)]),
					_: 1
				}, 8, ["to"]),
				N(U(K), {
					to: `${_.value}/settings`,
					class: "nav-link"
				}, {
					default: G(() => [M(H(U(a)("shell.settings")), 1)]),
					_: 1
				}, 8, ["to"])
			], 64))]),
			actions: G(() => [
				N(r, {
					name: "search",
					label: U(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => U(t).openPalette()
				}, null, 8, ["label"]),
				N(wn),
				U(u).isAdmin ? (R(), O(ve, { key: 0 })) : k("", !0),
				N(Fn)
			]),
			default: G(() => [
				N(U(rn)),
				s.value ? (R(), O(U(o), { key: 0 })) : k("", !0),
				U(u).isLoggedIn ? (R(), O(Kn, {
					key: 1,
					onExpand: c
				})) : k("", !0)
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-df585b3a"]]), _r = { class: "phlix-placeholder" }, vr = { class: "placeholder-content" }, yr = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (R(), A("div", _r, [j("div", vr, [n[0] ||= j("h1", null, "Shared UI loading...", -1), j("p", null, "Phlix " + H(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-576c7f48"]]), Y = /* @__PURE__ */ new Set();
function br(e, t) {
	e.hasAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.setAttribute("data-focusable", ""), t?.group == null ? e.removeAttribute("data-focus-group") : e.setAttribute("data-focus-group", String(t.group)), t?.order == null ? e.removeAttribute("data-focus-order") : e.setAttribute("data-focus-order", String(t.order)), t?.disabled ? Y.delete(e) : Y.add(e);
}
var xr = {
	mounted(e, t) {
		br(e, t.value);
	},
	updated(e, t) {
		br(e, t.value);
	},
	unmounted(e) {
		Y.delete(e);
	}
};
function Sr(e) {
	e.directive("focusable", xr);
}
//#endregion
//#region src/stores/useServerStore.ts
var Cr = "phlix.currentServerId", wr = "phlix.currentServerName", Tr = "phlix.currentServerUrl";
function Er(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e);
	} catch {
		return null;
	}
}
function X(e, t) {
	if (!(typeof window > "u")) try {
		t === null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, t);
	} catch {}
}
var Dr = nn("server", () => {
	let e = z(Er(Cr)), t = z(Er(wr)), n = z(Er(Tr)), r = D(() => e.value !== null);
	function i(r, i, a) {
		e.value = r, t.value = i ?? null, n.value = a && a !== "" ? a : null, X(Cr, r), X(wr, i ?? null), X(Tr, n.value);
	}
	function a() {
		e.value = null, t.value = null, n.value = null, X(Cr, null), X(wr, null), X(Tr, null);
	}
	return {
		currentServerId: e,
		currentServerName: t,
		currentServerUrl: n,
		hasCurrent: r,
		setCurrent: i,
		clear: a
	};
}), Or = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-Dv8LL89U.js")
}, kr = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-BtL3MBrK.js")
}, Ar = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-Dts-SPCb.js")
}, jr = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-CLOWxLcg.js")
}, Mr = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-D7eyROZ6.js")
}, Nr = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-5FtjXroo.js")
}, Pr = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-Cy0P8rnT.js")
}, Fr = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-Bji6kNUr.js")
}, Ir = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-DYnjKFsu.js")
}, Lr = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-DP5AJapS.js")
}, Rr = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-NobUL9iC.js")
}, zr = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-BHJ23lDr.js")
}, Br = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-DrpwAJXU.js")
}, Vr = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-YWRRrjRj.js")
}, Hr = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-CM0ZqLQ8.js")
}, Ur = {
	name: "admin-duplicates",
	path: "duplicates",
	label: "Duplicates",
	icon: "filter",
	component: () => import("./DuplicatesPage-ERGah5ks.js")
}, Wr = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-D-ij2lq3.js")
}, Gr = {
	name: "admin-transcoding",
	path: "transcoding",
	label: "Transcoding",
	icon: "play",
	component: () => import("./TranscodingSettingsPage-BW0AjlwD.js")
}, Kr = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-pbxP1QpO.js")
}, qr = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-DqwAPnab.js")
}, Z = {
	name: "admin-metrics",
	path: "metrics",
	label: "Server Traffic",
	icon: "speed",
	component: () => import("./MetricsPage-kiyaR7h4.js")
}, Jr = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-8GmglnPM.js")
}, Yr = Object.fromEntries([
	Or,
	Z,
	kr,
	Ar,
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
].map((e) => [e.name, e.label]));
function Xr(e) {
	return e ? Yr[e] ?? null : null;
}
var Zr = [
	kr,
	Ar,
	Kr
], Qr = [
	Or,
	Z,
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
	Gr
], $r = [
	qr,
	Z,
	Jr
], ei = [
	Or,
	Z,
	kr,
	Ar,
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
	Kr
], ti = [
	qr,
	Z,
	...Zr,
	Jr
];
function ni(e = "/app", t = ei) {
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
function ri(e = "/app") {
	return ni(e, ei);
}
function ii(e = "/app") {
	return ni(e, ti);
}
function ai(e = "/app", t = ei) {
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
var oi = [
	"login",
	"signup",
	"connect"
];
function si(e, t, n = !1, r = { name: "browse" }) {
	let i = typeof e.name == "string" ? e.name : "";
	return oi.includes(i) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? r : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function ci(e, t, n) {
	return !t || n ? null : e.name === "connect" ? !0 : {
		name: "connect",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function li(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = Xr(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function ui(e, t, n) {
	return e === "hub" && n ? `${t}/api/v1/servers/${n}/proxy` : t;
}
function di(e, t) {
	return e !== "hub" || t === null || t === "" ? "" : t.replace(/\/+$/, "");
}
function fi() {
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
function pi(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-CDQEZ63a.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-DA8LafcG.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-DPAGQrEP.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-CL49WU24.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-BxE1lg3S.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-LkkDSCOy.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-BwYDeIFr.js")
		},
		{
			path: `${t}/connect`,
			name: "connect",
			meta: { title: "connect.title" },
			component: () => import("./ConnectPage-B4fFT48k.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-D669YvJM.js")
		},
		{
			path: `${t}/explore`,
			name: "explore",
			meta: { title: "explore.title" },
			component: () => import("./ExplorePage-DV1S3m2p.js")
		},
		{
			path: `${t}/recommendations`,
			name: "recommendations",
			meta: { title: "recommendations.title" },
			component: () => import("./RecommendationsPage-D0p4iCYH.js")
		},
		{
			path: `${t}/history`,
			name: "history",
			meta: { title: "history.title" },
			component: () => import("./WatchHistoryPage-Nuw08RdE.js")
		},
		{
			path: `${t}/syncplay`,
			name: "syncplay",
			meta: { title: "syncplay.syncPlay" },
			component: () => import("./SyncPlayPage-B-5Rp58G.js")
		},
		{
			path: `${t}/music`,
			name: "music",
			meta: { title: "music.title" },
			component: () => import("./MusicLibraryPage-CKT1zM41.js")
		},
		{
			path: `${t}/parental`,
			name: "parental",
			meta: { title: "parental.title" },
			component: () => import("./ParentalControlsPage-DjyhXWc1.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: yr,
		props: { appName: e.app }
	}), n;
}
function mi(e) {
	let t = {
		...fi(),
		...e
	};
	ie(t.deviceHeaders ?? {}), nr(t.defaultTheme, t.defaultTv), Ue(t.branding?.wordmark);
	let n = p(t.messages), r = tn();
	if (!l()) {
		let e = o(r);
		t.defaultTheme && (e.theme = t.defaultTheme), t.defaultTv !== void 0 && (e.tv = t.defaultTv);
	}
	let i = an({
		history: on(),
		routes: pi(t)
	}), a = t.home ? { path: t.home } : { name: "browse" }, s = Fe(r);
	s.configure(t.onConnectionChange ?? null);
	let c = () => s.apiBase || t.apiBase;
	i.beforeEach(async (e) => {
		let n = ci(e, t.requireConnection === !0, c() !== "");
		if (n !== null) return n;
		let i = b(r);
		return e.meta?.requiresAdmin === !0 ? (await i.init(), si(e, i.isLoggedIn, i.isAdmin, a)) : i.isLoggedIn === !0 ? (i.init(), si(e, !0, !1, a)) : (await i.init(), si(e, i.isLoggedIn, i.isAdmin, a));
	}), i.afterEach((e) => {
		We(li(e, n));
	});
	let u = Dr(r), d = D(() => ui(t.app, c(), u.currentServerId)), f = D(() => di(t.app, u.currentServerUrl)), m = Ht(gr);
	return m.provide("apiBase", D(() => c())), m.provide("mediaApiBase", d), m.provide("mediaDirectBase", f), m.provide("loginPath", D(() => `${t.routerBase ?? "/app"}/login`)), m.provide("phlixCommands", t.commands ?? []), m.provide("phlixConfig", t), m.use(r), m.provide("auth", b(r)), m.use(i), Sr(m), m;
}
//#endregion
//#region src/components/ui/ToastHost.vue?vue&type=script&setup=true&lang.ts
var hi = ["aria-label"], gi = ["role"], _i = { class: "phlix-toast__content" }, vi = {
	key: 0,
	class: "phlix-toast__title"
}, yi = { class: "phlix-toast__message" }, bi = ["onClick"], xi = 0, Si = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = m(), i = x(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return L(() => {
			xi++;
		}), I(() => {
			xi--;
		}), (a, s) => (R(), O(zt, { to: "body" }, [j("div", {
			class: F(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": U(t)("common.notifications")
		}, [N(Vt, { name: "phlix-toast" }, {
			default: G(() => [(R(!0), A(E, null, B(U(i).toasts, (e) => (R(), A("div", {
				key: e.id,
				class: F(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				N(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				j("div", _i, [e.title ? (R(), A("p", vi, H(e.title), 1)) : k("", !0), j("p", yi, H(e.message), 1)]),
				e.action ? (R(), A("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), U(i).dismiss(e.id);
					}
				}, H(e.action.label), 9, bi)) : k("", !0),
				N(r, {
					name: "x",
					label: U(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => U(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, gi))), 128))]),
			_: 1
		})], 10, hi)]));
	}
}), [["__scopeId", "data-v-0127c07a"]]), Ci = /*#__PURE__*/ t(/* @__PURE__ */ P({
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
		}), (t, a) => (R(), O(Jt(e.tag), {
			ref_key: "el",
			ref: n,
			class: F(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Gt({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: G(() => [V(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-4838d241"]]), wi = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (R(), O(Bt, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: G(() => [V(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-06639673"]]), Ti = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Ei = {
	key: 0,
	class: "library-scan__skel"
}, Di = {
	key: 3,
	class: "library-scan__table-wrap"
}, Oi = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, ki = { class: "library-scan__name" }, Ai = {
	key: 0,
	class: "library-scan__paths"
}, ji = { class: "library-scan__num" }, Mi = { class: "library-scan__date" }, Ni = ["data-testid"], Pi = {
	key: 0,
	class: "library-scan__error"
}, Fi = { class: "library-scan__actions" }, Ii = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? y, n = x(), r = z([]), i = z({}), a = z(!0), o = z(null);
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
		return L(s), (e, t) => (R(), A("section", Ti, [t[4] ||= j("header", { class: "library-scan__head" }, [j("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), j("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (R(), A("div", Ei, [N(w, {
			variant: "text",
			lines: 6
		})])) : o.value ? (R(), O(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: G(() => [N(S, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: G(() => [...t[0] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (R(), O(T, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (R(), A("div", Di, [j("table", Oi, [t[3] ||= j("thead", null, [j("tr", null, [
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
			j("td", null, [j("div", ki, H(e.name), 1), e.paths.length ? (R(), A("div", Ai, H(e.paths.join(", ")), 1)) : k("", !0)]),
			j("td", null, H(e.type), 1),
			j("td", ji, H(e.item_count === void 0 ? "—" : e.item_count), 1),
			j("td", Mi, H(d(e.last_scan_at)), 1),
			j("td", null, [j("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [N(C, { tone: m(i.value[e.id]) }, {
				default: G(() => [M(H(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (R(), A("span", Pi, H(i.value[e.id]?.error), 1)) : k("", !0)], 8, Ni)]),
			j("td", null, [j("div", Fi, [N(S, {
				variant: "solid",
				size: "sm",
				"aria-label": `Scan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => l(e.id)
			}, {
				default: G(() => [...t[1] ||= [M(" Scan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			]), N(S, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Rescan ${e.name}`,
				disabled: f(i.value[e.id]),
				onClick: (t) => u(e.id)
			}, {
				default: G(() => [...t[2] ||= [M(" Rescan ", -1)]]),
				_: 1
			}, 8, [
				"aria-label",
				"disabled",
				"onClick"
			])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-f8574c77"]]), Q = class extends Error {
	kind;
	constructor(e, t) {
		super(t), this.kind = e, this.name = "ClaimError";
	}
};
async function Li(e, t, n) {
	let r = t.trim();
	if (r === "") throw new Q("empty", "Enter the claim code shown on your server.");
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
		throw new Q("network", "Network error — check your connection and try again.");
	}
	if (a.ok) {
		let e = await a.json().catch(() => ({}));
		return { serverId: typeof e.server_id == "string" ? e.server_id : "" };
	}
	let o = await a.json().catch(() => ({})), s = typeof o.message == "string" ? o.message : "";
	switch (a.status) {
		case 401: throw new Q("unauthorized", "Your session expired — please sign in again.");
		case 404: throw new Q("not_found", "That claim code was not found. Double-check it and try again.");
		case 410: throw new Q("expired", "That claim code has expired. Generate a new one on your server.");
		case 409: throw new Q("already_claimed", "That server has already been claimed.");
		default: throw new Q("invalid", s || "Could not add the server. Check the claim code and try again.");
	}
}
//#endregion
//#region src/api/normalize.ts
function Ri(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var zi = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, Bi = { class: "my-servers__head" }, Vi = {
	key: 0,
	class: "my-servers__skel"
}, Hi = {
	key: 3,
	class: "my-servers__table-wrap"
}, Ui = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Wi = { class: "my-servers__name" }, Gi = { class: "my-servers__url" }, Ki = { class: "my-servers__num" }, qi = { class: "my-servers__date" }, Ji = ["data-testid"], Yi = { class: "my-servers__actions" }, Xi = ["disabled"], Zi = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, Qi = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? y, n = x(), r = b(), a = Dr(), o = sn(), s = Wt("phlixConfig", void 0)?.routerBase || "/app", c = z([]), l = z(!0), u = z(null), d = z(!1), f = z(""), p = z(!1), m = z(null);
		function h() {
			f.value = "", m.value = null, d.value = !0;
		}
		async function g() {
			p.value = !0, m.value = null;
			try {
				await Li("", f.value), d.value = !1, n.success("Server added."), await _();
			} catch (e) {
				m.value = e instanceof Q ? e.message : v(e, "Could not add the server.");
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
					last_seen: Ri(e.lastSeenAt),
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
		function ne(e) {
			switch (e) {
				case "online": return "success";
				case "offline": return "error";
				case "connecting": return "warning";
				default: return "neutral";
			}
		}
		function re(e) {
			return e.status === "online" && !e.relayActive;
		}
		function ie(e) {
			e.url && window.open(e.url, "_blank", "noopener,noreferrer");
		}
		function ae(e) {
			e.relayActive && (a.setCurrent(e.id, e.name, e.url), o.push(s));
		}
		return L(_), (e, t) => (R(), A("section", zi, [
			j("header", Bi, [t[4] ||= j("div", null, [j("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), j("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), N(S, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: h
			}, {
				default: G(() => [...t[3] ||= [M("Add server", -1)]]),
				_: 1
			})]),
			l.value ? (R(), A("div", Vi, [N(w, {
				variant: "text",
				lines: 6
			})])) : u.value ? (R(), O(T, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: u.value
			}, {
				actions: G(() => [N(S, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: _
				}, {
					default: G(() => [...t[5] ||= [M("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : c.value.length === 0 ? (R(), O(T, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: G(() => [N(S, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: h
				}, {
					default: G(() => [...t[6] ||= [M("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (R(), A("div", Hi, [j("table", Ui, [t[10] ||= j("thead", null, [j("tr", null, [
				j("th", { scope: "col" }, "Server"),
				j("th", { scope: "col" }, "Owner"),
				j("th", { scope: "col" }, "Libraries"),
				j("th", { scope: "col" }, "Last seen"),
				j("th", { scope: "col" }, "Status"),
				j("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), j("tbody", null, [(R(!0), A(E, null, B(c.value, (e) => (R(), A("tr", { key: e.id }, [
				j("td", null, [j("div", Wi, H(e.name), 1), j("div", Gi, H(e.url), 1)]),
				j("td", null, H(e.owner), 1),
				j("td", Ki, H(e.library_count === void 0 ? "—" : e.library_count), 1),
				j("td", qi, H(ee(e.last_seen)), 1),
				j("td", null, [j("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [N(C, { tone: ne(e.status) }, {
					default: G(() => [M(H(te(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"]), re(e) ? (R(), O(C, {
					key: 0,
					tone: "warning"
				}, {
					default: G(() => [...t[7] ||= [M("Relay connecting", -1)]]),
					_: 1
				})) : k("", !0)], 8, Ji)]),
				j("td", null, [j("div", Yi, [N(S, {
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					disabled: !e.relayActive,
					title: e.relayActive ? `Browse ${e.name} here` : re(e) ? `${e.name} is online but its relay tunnel isn't connected yet — it can't be browsed here until it reconnects.` : "This server is offline — it must be connected to browse it here",
					"aria-label": `Browse ${e.name}`,
					onClick: (t) => ae(e)
				}, {
					default: G(() => [...t[8] ||= [M("Browse", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				]), N(S, {
					variant: "ghost",
					size: "sm",
					disabled: !e.url,
					title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
					"aria-label": `Manage ${e.name}`,
					onClick: (t) => ie(e)
				}, {
					default: G(() => [...t[9] ||= [M("Manage", -1)]]),
					_: 1
				}, 8, [
					"disabled",
					"title",
					"aria-label",
					"onClick"
				])])])
			]))), 128))])])])),
			N(i, {
				modelValue: d.value,
				"onUpdate:modelValue": t[2] ||= (e) => d.value = e,
				title: "Add a server"
			}, {
				footer: G(() => [N(S, {
					variant: "ghost",
					size: "sm",
					disabled: p.value,
					onClick: t[1] ||= (e) => d.value = !1
				}, {
					default: G(() => [...t[13] ||= [M("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), N(S, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: p.value,
					disabled: p.value,
					onClick: g
				}, {
					default: G(() => [...t[14] ||= [M(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: G(() => [j("form", {
					class: "my-servers__add-form",
					onSubmit: en(g, ["prevent"])
				}, [
					t[11] ||= j("p", { class: "my-servers__add-help" }, [
						M(" On your media server, open "),
						j("strong", null, "Settings → Connect to hub"),
						M(" to get a claim code, then paste it here. ")
					], -1),
					t[12] ||= j("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					$t(j("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => f.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: p.value
					}, null, 8, Xi), [[Zt, f.value]]),
					m.value ? (R(), A("p", Zi, H(m.value), 1)) : k("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-68e5a4d7"]]), $i = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, ea = {
	key: 0,
	class: "federation__skel"
}, ta = {
	key: 2,
	class: "federation__content"
}, na = {
	key: 1,
	class: "federation__table-wrap"
}, ra = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, ia = { class: "federation__name" }, aa = { class: "federation__url" }, oa = { class: "federation__num" }, sa = { class: "federation__date" }, ca = ["data-testid"], la = { class: "federation__actions" }, ua = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, da = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? y, n = x(), r = z([]), i = z(!0), a = z(null), o = z(""), s = z(""), c = z(""), l = z(!1);
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
		return L(() => u(!0)), (e, t) => (R(), A("section", $i, [t[10] ||= j("header", { class: "federation__head" }, [j("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), j("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (R(), A("div", ea, [N(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (R(), O(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: G(() => [N(S, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: G(() => [...t[4] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (R(), A("div", ta, [
			t[9] ||= j("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (R(), O(T, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (R(), A("div", na, [j("table", ra, [t[6] ||= j("thead", null, [j("tr", null, [
				j("th", { scope: "col" }, "Peer"),
				j("th", { scope: "col" }, "Shared libraries"),
				j("th", { scope: "col" }, "Last sync"),
				j("th", { scope: "col" }, "Status"),
				j("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), j("tbody", null, [(R(!0), A(E, null, B(r.value, (e) => (R(), A("tr", { key: e.id }, [
				j("td", null, [j("div", ia, H(e.name), 1), j("div", aa, H(e.url), 1)]),
				j("td", oa, H(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				j("td", sa, H(p(e.last_sync)), 1),
				j("td", null, [j("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [N(C, { tone: h(e.status) }, {
					default: G(() => [M(H(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, ca)]),
				j("td", null, [j("div", la, [N(S, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: G(() => [...t[5] ||= [M(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			j("section", ua, [t[8] ||= j("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), j("form", {
				class: "federation__form",
				onSubmit: en(d, ["prevent"])
			}, [
				$t(j("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[Zt, s.value]]),
				$t(j("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[Zt, o.value]]),
				$t(j("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[Zt, c.value]]),
				N(S, {
					type: "submit",
					variant: "solid",
					"left-icon": "plus",
					loading: l.value,
					disabled: !o.value.trim() || !s.value.trim() || !c.value.trim()
				}, {
					default: G(() => [...t[7] ||= [M(" Add peer ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32)])
		]))]));
	}
}), [["__scopeId", "data-v-6fe106b1"]]), fa = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, pa = {
	key: 0,
	class: "shares__skel"
}, ma = {
	key: 3,
	class: "shares__table-wrap"
}, ha = {
	class: "shares__table",
	"aria-label": "Library shares"
}, ga = { class: "shares__library" }, _a = { class: "shares__date" }, va = { class: "shares__date" }, ya = ["data-testid"], ba = { class: "shares__actions" }, xa = /*#__PURE__*/ t(/* @__PURE__ */ P({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? y, n = x(), r = z([]), i = z(!0), a = z(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Ri(e.created_at) ?? "",
					expires_at: Ri(e.expires_at)
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
		return L(() => o(!0)), (e, t) => (R(), A("section", fa, [t[5] ||= j("header", { class: "shares__head" }, [j("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), j("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (R(), A("div", pa, [N(w, {
			variant: "text",
			lines: 6
		})])) : a.value ? (R(), O(T, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: G(() => [N(S, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: G(() => [...t[1] ||= [M("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (R(), O(T, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (R(), A("div", ma, [j("table", ha, [t[4] ||= j("thead", null, [j("tr", null, [
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
			j("td", null, [j("span", ga, H(e.library_name), 1)]),
			j("td", null, H(e.shared_with), 1),
			j("td", null, [N(C, { tone: u(e.permissions) }, {
				default: G(() => [M(H(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			j("td", _a, H(c(e.created_at)), 1),
			j("td", va, [j("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [M(H(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (R(), O(C, {
				key: 0,
				tone: "error"
			}, {
				default: G(() => [...t[2] ||= [M("Expired", -1)]]),
				_: 1
			})) : k("", !0)], 8, ya)]),
			j("td", null, [j("div", ba, [N(S, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Revoke share of ${e.library_name} with ${e.shared_with}`,
				onClick: (t) => s(e.id)
			}, {
				default: G(() => [...t[3] ||= [M(" Revoke ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])
		]))), 128))])])]))]));
	}
}), [["__scopeId", "data-v-31edd2a2"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Sa(e, t) {
	let n = Ze(), r = !1;
	n.setLibraryId(void 0), n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = W(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = W(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
//#region src/composables/spatial-nav.ts
function Ca(e) {
	return {
		x: (e.left + e.right) / 2,
		y: (e.top + e.bottom) / 2
	};
}
var wa = .5, Ta = 2, Ea = 1e6;
function $(e, t, n, r) {
	return e < r && n < t;
}
function Da(e, t, n) {
	let r = Ca(e), i = null, a = Infinity;
	for (let o of n) {
		let n = Ca(o.rect), s, c, l;
		switch (t) {
			case "right":
				if (n.x <= r.x + wa) continue;
				s = n.x - r.x, c = Math.abs(n.y - r.y), l = $(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "left":
				if (n.x >= r.x - wa) continue;
				s = r.x - n.x, c = Math.abs(n.y - r.y), l = $(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "down":
				if (n.y <= r.y + wa) continue;
				s = n.y - r.y, c = Math.abs(n.x - r.x), l = $(e.left, e.right, o.rect.left, o.rect.right);
				break;
			case "up":
				if (n.y >= r.y - wa) continue;
				s = r.y - n.y, c = Math.abs(n.x - r.x), l = $(e.left, e.right, o.rect.left, o.rect.right);
				break;
		}
		let u = s + Ta * c;
		l && (u -= Ea), (u < a || u === a && (i === null || o.id < i.id)) && (a = u, i = o);
	}
	return i;
}
//#endregion
//#region src/composables/useSpatialNav.ts
var Oa = {
	up: ["ArrowUp"],
	down: ["ArrowDown"],
	left: ["ArrowLeft"],
	right: ["ArrowRight"]
};
function ka(e) {
	return {
		left: e.left,
		top: e.top,
		right: e.right,
		bottom: e.bottom
	};
}
function Aa(e) {
	return e.width <= 0 && e.height <= 0;
}
function ja() {
	let e = Array.from(Y), t = (e) => {
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
function Ma(e = {}) {
	let t = {
		...Oa,
		...e.keymap
	};
	function n() {
		let e = [], t = /* @__PURE__ */ new Map(), n = 0;
		for (let r of Y) {
			let i = r.getBoundingClientRect();
			if (Aa(i)) continue;
			let a = String(n++);
			e.push({
				id: a,
				rect: ka(i)
			}), t.set(a, r);
		}
		return {
			candidates: e,
			byId: t
		};
	}
	function r(e, t) {
		let n = typeof document < "u" ? document.activeElement : null;
		if (n && Y.has(n)) {
			let e = n.getBoundingClientRect();
			if (!Aa(e)) return ka(e);
		}
		let r = t[0];
		return r && e.has(r.id) ? r.rect : null;
	}
	function i(t) {
		let { candidates: i, byId: a } = n();
		if (i.length === 0) return e.onEdge?.(t), !1;
		let o = r(a, i);
		if (!o) return e.onEdge?.(t), !1;
		let s = typeof document < "u" ? document.activeElement : null, c = Da(o, t, s ? i.filter((e) => a.get(e.id) !== s) : i);
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
		if (!Yt(e.enabled ?? !1) || t.ctrlKey || t.metaKey || t.altKey || he(t.target) || document.activeElement?.closest("[data-focus-trap]") || t.target?.closest?.("[data-focus-trap]")) return;
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
		ja()[0]?.focus();
	}
	return L(() => {
		typeof document < "u" && document.addEventListener("keydown", o);
	}), I(() => {
		typeof document < "u" && document.removeEventListener("keydown", o);
	}), {
		focus: s,
		move: i,
		focusFirst: c,
		registry: Y
	};
}
//#endregion
//#region src/composables/useOnline.ts
function Na() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = z(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), Kt(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), qt(t);
}
//#endregion
//#region src/index.ts
var Pa = Ut(() => import("./MediaDetail-B_c7vh1d.js").then((e) => e.n)), Fa = Ut(() => import("./MetadataMatchModal-Mf19Mq1U.js").then((e) => e.n)), Ia = Ut(() => import("./FilterBar-E1xjEKWA.js").then((e) => e.n));
//#endregion
export { ut as ALL_LOGS, bt as AdminBackupApi, xt as AdminCastApi, Tt as AdminCollectionsApi, dt as AdminDashboardApi, St as AdminDlnaServerApi, Et as AdminHistoryApi, Ft as AdminHubDashboardApi, yt as AdminIntegrationsApi, kt as AdminLibrariesApi, wt as AdminLiveTvApi, lt as AdminLogsApi, ct as AdminMetadataSourcesApi, Pt as AdminPluginsApi, Ct as AdminRemoteAccessApi, vt as AdminServicesApi, At as AdminSettingsApi, Dt as AdminSyncPlayApi, mt as AdminUsersApi, _t as AdminWebhooksApi, ae as ApiClient, te as ApiError, e as AppBackdrop, Cn as AppLayout, C as Badge, S as Button, Be as CONNECTION_API_BASE_KEY, Ie as CONNECTION_CONFIRMED_ORIGIN_KEY, Cr as CURRENT_SERVER_ID_KEY, wr as CURRENT_SERVER_NAME_KEY, Je as Chip, Xe as Combobox, u as DEFAULT_CAPTION_STYLE, f as DEFAULT_MESSAGES, c as DEFAULT_PREFERENCES, T as EmptyState, da as FederationPage, Ia as FilterBar, n as Icon, r as IconButton, Ce as Kbd, Ot as LIBRARY_TYPES, Ii as LibraryScanPage, g as LocalStorageTokenStore, It as LoginForm, xa as ManageSharesPage, nt as MediaCard, Pa as MediaDetail, rt as MediaGrid, je as MediaHomeRow, it as MediaRow, et as Menu, Fa as MetadataMatchModal, i as Modal, Qi as MyServersPage, oe as NetworkError, Mt as PLUGIN_SECRET_MASK, Qe as PageHint, wi as PageTransition, gr as PhlixApp, ft as RATING_LABELS, pt as RATING_OPTIONS, fe as RESUME_MAX_RATIO, ue as RESUME_MIN_SECONDS, Ci as Reveal, Te as SORT_TITLE_ARTICLES, ht as SUBSCRIBABLE_EVENTS, Ye as Select, Rt as SettingsForm, pn as Sheet, Lt as SignupForm, w as Skeleton, Ke as Slider, st as SourcePriorityEditor, ye as Spinner, qe as Switch, ne as TMDB_UNCONFIGURED_CODE, $e as Tabs, me as ThumbRating, _ as TimeoutError, Si as ToastHost, _e as Tooltip, gt as WEBHOOK_EVENT_CATEGORIES, ai as adminMenu, nr as applyStoredThemeEarly, Da as bestCandidate, Sa as bindMediaStoreToRouter, ni as buildAdminRoutes, ii as buildHubAdminRoutes, ot as buildMediaQuery, at as buildMediaUrl, ri as buildServerAdminRoutes, Zr as commonAdminPages, we as compareByStrippedTitle, mi as createPhlixApp, p as createTranslator, $n as deriveAccentVars, v as errMessage, Ee as fetchLibraries, xr as focusable, Y as focusableRegistry, Ge as formatPageTitle, xe as fuzzyScore, ee as getDefaultApiHeaders, l as hasStoredPreferences, $r as hubAdminPages, Sr as installFocusable, Re as isAllowedBase, re as isOffline, Pe as isPlaintextPublic, Me as isPrivateHost, h as isTmdbUnconfigured, Se as matchCommand, d as mergeMessages, Le as normalizeBase, ze as originOf, Nt as pluginErrorCode, jt as pluginValidationErrors, Ne as probeServer, s as readStoredPreferences, Ca as rectCenter, Qr as serverAdminPages, Ue as setAppName, ie as setDefaultApiHeaders, We as setPageTitle, Oe as sortLibraries, De as stripLeadingArticle, ce as useApiBase, b as useAuthStore, ir as useCommandPaletteHotkey, be as useCommandStore, Fe as useConnectionStore, a as useFocusTrap, ke as useLibrariesStore, se as useMediaApiBase, Ze as useMediaStore, m as useMessages, Na as useOnline, He as usePageTitle, le as usePlayerStore, cr as usePreconnect, o as usePreferencesStore, tt as usePrefetch, fr as useResumeReporter, Ae as useResumeSync, Dr as useServerStore, Ma as useSpatialNav, rr as useTheme, x as useToastStore, pe as useUserItemDataStore, Ve as withScheme };

//# sourceMappingURL=phlix-ui.js.map