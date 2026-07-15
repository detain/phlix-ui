import { r as e } from "./AuthField-k2v6oKGF.js";
import { t } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t as n } from "./Icon-X5skTbAE.js";
import { n as r, t as i } from "./Modal-BtA0owzl.js";
import { t as a } from "./useFocusTrap-DZxA3ZEr.js";
import { a as o, i as s, n as c, r as l, t as u } from "./usePreferencesStore-g-d6JBr9.js";
import { i as d, n as f, r as p, t as m } from "./useMessages-Cbrqh0Aa.js";
import { a as h, c as g, d as _, f as v, i as y, l as ee, n as te, p as ne, r as b, s as re, t as ie, u as ae } from "./client-D1nDQ0cP.js";
import { n as oe, t as se } from "./useApiBase-CV_r-Kk4.js";
import { t as x } from "./useAuthStore-C_Rnq3Bo.js";
import { i as ce, n as le, r as ue, t as de } from "./usePlayerStore-fCCh6mOw.js";
import { t as S } from "./useToastStore-BDoKlU6N.js";
import { n as fe, t as pe } from "./ThumbRating-Db3pVsxe.js";
import { i as me, o as he } from "./shortcuts-BBVBYRvl.js";
import { n as ge, t as _e } from "./NetworkHealthIndicator-giSnQwuF.js";
import { t as ve } from "./Spinner-DjAfI4qB.js";
import { i as ye, n as be, r as xe, t as Se } from "./Kbd-Bmk72RCb.js";
import { a as Ce, i as we, n as Te, o as Ee, r as De, t as Oe } from "./useLibrariesStore-B4M08nqy.js";
import { n as ke, t as Ae } from "./HomeRow-CrdyiISF.js";
import { a as je, c as Me, i as Ne, l as Pe, n as Fe, o as Ie, r as Le, s as Re, t as ze, u as Be } from "./useConnectionStore-BxMhAb3d.js";
import { i as Ve, n as He, r as Ue, t as We } from "./usePageTitle-BO3GGF3M.js";
import { t as C } from "./Button-DGsvHynO.js";
import { t as w } from "./Badge-D_aUH3dO.js";
import { t as Ge } from "./Slider-LnnvB5jy.js";
import { t as Ke } from "./Switch-DyS2L5gX.js";
import { t as qe } from "./Chip-Dqypy8Bt.js";
import { t as Je } from "./Select-DwAQcvz1.js";
import { n as Ye, t as Xe } from "./useMediaStore-B2Y6eUkm.js";
import { t as T } from "./Skeleton-DhQmxeNg.js";
import { t as E } from "./EmptyState-CfyGawh7.js";
import { t as Ze } from "./PageHint-CPoTKHik.js";
import { t as Qe } from "./Tabs-D8iKNBl3.js";
import { a as $e, i as et, t as tt } from "./MediaCard-BPOdw-U9.js";
import { t as nt } from "./MediaGrid-BTSLkoqH.js";
import { t as rt } from "./MediaRow-YhbMWVqR.js";
import { n as it, t as at } from "./media-query-DKjhlX8r.js";
import { n as ot, t as st } from "./metadata-sources-BKrQGTgw.js";
import { n as ct, t as lt } from "./logs-DadTfaTq.js";
import { t as ut } from "./dashboard-BTCOCTHQ.js";
import { n as dt, r as ft, t as pt } from "./users-B74FC_jE.js";
import { n as mt, r as ht, t as gt } from "./webhooks-BBTLnFKm.js";
import { t as _t } from "./services-C907MGdw.js";
import { t as vt } from "./integrations-DLAG9ISY.js";
import { t as yt } from "./backup-IdY_vzc2.js";
import { t as bt } from "./cast-BvFcBEB6.js";
import { t as xt } from "./dlnaServer-B5Sg4MkS.js";
import { t as St } from "./remoteAccess-DVKRpKQ8.js";
import { t as Ct } from "./liveTv-Dbjt901v.js";
import { t as wt } from "./collections-CH3HLdcd.js";
import { t as Tt } from "./history-Cz9DDbWX.js";
import { t as Et } from "./syncPlay-DPzJkgkK.js";
import { n as Dt, t as Ot } from "./libraries-CXAz_kXs.js";
import { t as kt } from "./settings-m4upFcmH.js";
import { i as At, n as jt, r as Mt, t as Nt } from "./plugins-DsJGlqh0.js";
import { t as Pt } from "./hubDashboard-BhOaaDD-.js";
import { t as Ft } from "./LoginForm-hTYm6JMs.js";
import { t as It } from "./SignupForm-DiXxcoiq.js";
import { t as Lt } from "./SettingsForm-CmpSLeHc.js";
import { Fragment as D, Teleport as Rt, Transition as zt, TransitionGroup as Bt, computed as O, createApp as Vt, createBlock as k, createCommentVNode as A, createElementBlock as j, createElementVNode as M, createTextVNode as N, createVNode as P, defineAsyncComponent as Ht, defineComponent as F, inject as Ut, normalizeClass as I, normalizeStyle as Wt, onBeforeUnmount as L, onMounted as R, onScopeDispose as z, openBlock as B, readonly as Gt, ref as V, renderList as H, renderSlot as U, resolveDynamicComponent as Kt, toDisplayString as W, toValue as qt, unref as G, useId as Jt, vModelText as Yt, watch as K, watchEffect as Xt, withCtx as q, withDirectives as Zt, withModifiers as Qt } from "vue";
import { createPinia as $t, defineStore as en } from "pinia";
import { RouterLink as J, RouterView as tn, createRouter as nn, createWebHistory as rn, useRouter as an } from "vue-router";
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var on = ["aria-labelledby"], sn = {
	key: 0,
	class: "phlix-sheet__header"
}, cn = ["id"], ln = { class: "phlix-sheet__body" }, un = {
	key: 1,
	class: "phlix-sheet__footer"
}, dn = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		let s = V(null), c = Jt();
		function l() {
			i("update:modelValue", !1), i("close");
		}
		function u() {
			n.dismissible && l();
		}
		return a(s, o, { onEscape: () => n.dismissible ? (l(), !0) : !1 }), (t, n) => (B(), k(Rt, { to: "body" }, [P(zt, { name: `phlix-sheet-${e.side}` }, {
			default: q(() => [e.modelValue ? (B(), j("div", {
				key: 0,
				class: I(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Qt(u, ["self"])
			}, [M("aside", {
				ref_key: "panelEl",
				ref: s,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(c) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (B(), j("header", sn, [e.title ? (B(), j("h2", {
					key: 0,
					id: G(c),
					class: "phlix-sheet__title"
				}, W(e.title), 9, cn)) : A("", !0), e.hideClose ? A("", !0) : (B(), k(r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: l
				}))])) : A("", !0),
				M("div", ln, [U(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (B(), j("footer", un, [U(t.$slots, "footer", {}, void 0, !0)])) : A("", !0)
			], 8, on)], 34)) : A("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6ff9e0f5"]]);
//#endregion
//#region src/composables/useHeaderHideOnScroll.ts
function fn() {
	let e = V(0), t = V("none"), n = V(!1), r = V(!1);
	function i() {
		if (typeof window > "u" || r.value) return;
		let i = window.scrollY, a = i - e.value;
		Math.abs(a) > 50 && (t.value = a > 0 ? "down" : "up", e.value = i), i > 50 ? n.value = t.value === "down" : n.value = !1;
	}
	return typeof window < "u" && typeof window.addEventListener == "function" && (typeof window.matchMedia == "function" && (r.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches, window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
		r.value = e.matches, r.value && (n.value = !1, t.value = "none");
	})), window.addEventListener("scroll", i, { passive: !0 }), z(() => {
		window.removeEventListener("scroll", i);
	}), i()), {
		isHidden: Gt(n),
		scrollDirection: Gt(t)
	};
}
//#endregion
//#region src/app/AppLayout.vue?vue&type=script&setup=true&lang.ts
var pn = { class: "shell" }, mn = {
	class: "shell__skip",
	href: "#main"
}, hn = { class: "shell__inner" }, gn = { class: "shell__brand" }, _n = ["aria-label"], vn = { class: "shell__actions" }, yn = {
	id: "main",
	tabindex: "-1",
	class: "shell__main"
}, bn = {
	key: 0,
	class: "shell__footer"
}, xn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "AppLayout",
	setup(t) {
		let n = o(), i = V(!1), { t: a } = m(), { isHidden: s } = fn();
		return (t, o) => (B(), j("div", pn, [
			M("a", mn, W(G(a)("shell.skipToContent")), 1),
			P(e, { enabled: G(n).atmosphere }, null, 8, ["enabled"]),
			M("header", { class: I(["shell__bar", { "is-hidden": G(s) }]) }, [M("div", hn, [
				M("div", gn, [U(t.$slots, "logo", {}, () => [o[3] ||= M("span", { class: "shell__wordmark" }, [N("Phlix"), M("span", { class: "shell__dot" }, ".")], -1)], !0)]),
				M("nav", {
					class: "shell__nav",
					"aria-label": G(a)("shell.primaryNav")
				}, [U(t.$slots, "nav", {}, void 0, !0)], 8, _n),
				o[4] ||= M("span", { class: "shell__spacer" }, null, -1),
				M("div", vn, [U(t.$slots, "actions", {}, void 0, !0)]),
				t.$slots.nav ? (B(), k(r, {
					key: 0,
					class: "shell__hamburger",
					name: "menu",
					label: G(a)("shell.openMenu"),
					variant: "ghost",
					onClick: o[0] ||= (e) => i.value = !0
				}, null, 8, ["label"])) : A("", !0)
			])], 2),
			M("main", yn, [U(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (B(), j("footer", bn, [U(t.$slots, "footer", {}, void 0, !0)])) : A("", !0),
			P(dn, {
				modelValue: i.value,
				"onUpdate:modelValue": o[2] ||= (e) => i.value = e,
				side: "left",
				title: G(a)("shell.menu")
			}, {
				default: q(() => [M("nav", {
					class: "shell__drawer",
					onClick: o[1] ||= (e) => i.value = !1
				}, [U(t.$slots, "nav", {}, void 0, !0)])]),
				_: 3
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-bdbc790a"]]), Sn = /* @__PURE__ */ F({
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
		}, c = O(() => i[(i.indexOf(t.theme) + 1) % i.length]), l = O(() => a[t.theme] ?? "moon"), u = O(() => n("shell.themeToggleLabel", {
			current: s[t.theme] ?? t.theme,
			next: s[c.value]
		}));
		function d() {
			t.theme = c.value;
		}
		return (e, t) => (B(), k(r, {
			name: l.value,
			label: u.value,
			variant: "ghost",
			onClick: d
		}, null, 8, ["name", "label"]));
	}
}), Cn = ["aria-label", "aria-expanded"], wn = {
	key: 0,
	class: "usermenu__avatar"
}, Tn = ["src", "alt"], En = {
	key: 1,
	class: "usermenu__avatar-initials"
}, Dn = ["aria-label"], On = { class: "usermenu__head" }, kn = { class: "usermenu__avatar usermenu__avatar--lg" }, An = ["src", "alt"], jn = {
	key: 1,
	class: "usermenu__avatar-initials"
}, Mn = { class: "usermenu__name" }, Nn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "UserMenu",
	setup(e) {
		let t = x(), r = an(), i = Ut("phlixConfig", null), o = O(() => i?.routerBase ?? "/app"), { t: s } = m(), c = V(!1), l = V(null), u = V(null), d = O(() => t.user?.username || t.user?.name || t.user?.email || s("shell.account")), f = V(!1);
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
		}), L(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", v, !0);
		}), (e, r) => (B(), j("div", {
			ref_key: "rootEl",
			ref: l,
			class: "usermenu"
		}, [M("button", {
			type: "button",
			class: "usermenu__trigger",
			"aria-label": G(t).isLoggedIn ? G(s)("shell.accountNamed", { name: d.value }) : G(s)("shell.account"),
			"aria-haspopup": "menu",
			"aria-expanded": c.value,
			onClick: r[1] ||= (e) => c.value = !c.value
		}, [G(t).isLoggedIn ? (B(), j("span", wn, [G(t).user?.avatar_url && !f.value ? (B(), j("img", {
			key: 0,
			src: G(t).user.avatar_url,
			alt: d.value,
			class: "usermenu__avatar-img",
			onError: r[0] ||= (e) => f.value = !0
		}, null, 40, Tn)) : (B(), j("span", En, W(p(d.value)), 1))])) : (B(), k(n, {
			key: 1,
			name: "user"
		}))], 8, Cn), c.value ? (B(), j("div", {
			key: 0,
			ref_key: "panelEl",
			ref: u,
			class: "usermenu__panel",
			role: "menu",
			"aria-label": G(s)("shell.account"),
			tabindex: "-1"
		}, [G(t).isLoggedIn ? (B(), j(D, { key: 0 }, [
			M("div", On, [M("span", kn, [G(t).user?.avatar_url && !f.value ? (B(), j("img", {
				key: 0,
				src: G(t).user.avatar_url,
				alt: d.value,
				class: "usermenu__avatar-img",
				onError: r[2] ||= (e) => f.value = !0
			}, null, 40, An)) : (B(), j("span", jn, W(p(d.value)), 1))]), M("span", Mn, W(d.value), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[3] ||= (e) => g(`${o.value}/history`)
			}, [P(n, { name: "film" }), N(" " + W(G(s)("shell.watchHistory")), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: r[4] ||= (e) => g(`${o.value}/settings`)
			}, [P(n, { name: "settings" }), N(" " + W(G(s)("shell.settings")), 1)]),
			M("button", {
				type: "button",
				class: "usermenu__item",
				role: "menuitem",
				onClick: _
			}, [P(n, { name: "log-out" }), N(" " + W(G(s)("shell.signOut")), 1)])
		], 64)) : (B(), j("button", {
			key: 1,
			type: "button",
			class: "usermenu__item",
			role: "menuitem",
			onClick: r[5] ||= (e) => g(`${o.value}/login`)
		}, [P(n, { name: "user" }), N(" " + W(G(s)("shell.signIn")), 1)]))], 8, Dn)) : A("", !0)], 512));
	}
}), [["__scopeId", "data-v-2a0ffb08"]]), Pn = ["aria-label"], Fn = ["src", "poster"], In = { class: "mini__body" }, Ln = { class: "mini__title" }, Rn = { class: "mini__controls" }, zn = ["aria-label"], Bn = ["aria-label", "aria-pressed"], Vn = ["aria-label"], Hn = ["aria-label"], Un = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Wn = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let r = t, i = ce(), { t: a } = m(), o = V(null), s = V(null), c = fe(), l = Ut("phlixConfig", null), u = O(() => i.current ? c.isFavorite(i.current.id) : !1);
		function d() {
			let e = i.current?.id;
			e && c.toggleFavorite(e, l?.apiBase ?? "");
		}
		let f = O(() => i.miniPlayer && !!i.current && (!!i.streamUrl || !!i.hlsMasterUrl)), p = O(() => i.current?.name ?? ""), h = O(() => Math.max(0, Math.min(1, i.progress)));
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
		function ee() {
			let e = o.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function te() {
			i.current && r("expand", i.current.id);
		}
		function ne() {
			i.closePlayer();
		}
		async function b() {
			let e = o.value;
			!e || !i.hlsMasterUrl || (s.value?.destroy(), s.value = null, s.value = await he(e, i.hlsMasterUrl, {
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
			!i.hlsMasterUrl || i.streamUrl || await b();
		}), R(async () => {
			f.value && i.hlsMasterUrl && !i.streamUrl && await b();
		}), K(() => i.playing, (e) => {
			let t = o.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), K(() => i.lastCommand, (e) => {
			let t = o.value;
			if (!e || !t) return;
			let n = e.type === "seekTo" ? e.value : i.position + e.value, r = t.duration && t.duration > 0 ? t.duration : i.duration, a = r > 0 ? Math.min(r, Math.max(0, n)) : Math.max(0, n);
			t.currentTime = a, i.updateProgress(a, t.duration || void 0);
		}), L(() => {
			s.value?.destroy(), s.value = null, o.value?.pause?.();
		}), (e, t) => (B(), k(zt, { name: "mini" }, {
			default: q(() => [f.value ? (B(), j("div", {
				key: 0,
				class: "mini",
				role: "region",
				"aria-label": G(a)("player.miniPlayer")
			}, [
				M("video", {
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
					onTimeupdate: y,
					onClick: te
				}, null, 40, Fn),
				M("div", In, [M("p", Ln, W(p.value), 1), M("div", Rn, [
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(i).playing ? G(a)("player.pause") : G(a)("player.play"),
						onClick: ee
					}, [P(n, { name: G(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, zn),
					G(i).current ? (B(), j("button", {
						key: 0,
						type: "button",
						class: I(["mini__btn mini__btn--favorite", { "is-on": u.value }]),
						"aria-label": u.value ? "Remove from favorites" : "Add to favorites",
						"aria-pressed": u.value ? "true" : "false",
						onClick: d
					}, [P(n, { name: u.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Bn)) : A("", !0),
					M("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": G(a)("player.expand"),
						onClick: te
					}, [P(n, { name: "expand" })], 8, Vn),
					M("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": G(a)("player.closePlayer"),
						onClick: ne
					}, [P(n, { name: "x" })], 8, Hn)
				])]),
				M("div", Un, [M("div", {
					class: "mini__progress-fill",
					style: Wt({ transform: `scaleX(${h.value})` })
				}, null, 4)])
			], 8, Pn)) : A("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-1331e7b0"]]);
//#endregion
//#region src/composables/color.ts
function Gn(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Kn = (e) => Math.max(0, Math.min(255, Math.round(e))), qn = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Kn(e).toString(16).padStart(2, "0")).join("");
function Jn(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Yn(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Xn = ({ r: e, g: t, b: n }, r) => `rgba(${Kn(e)}, ${Kn(t)}, ${Kn(n)}, ${r})`;
function Zn({ r: e, g: t, b: n }) {
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
function Qn(e) {
	let t = Gn(e);
	if (!t) return null;
	let n = Zn(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": qn(t),
		"--accent-hover": qn(Jn(t, .12)),
		"--accent-active": qn(Yn(t, .12)),
		"--accent-soft": Xn(t, .14),
		"--accent-ring": Xn(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var $n = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function er(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion"), e.tv ? n.setAttribute("data-tv", "true") : n.removeAttribute("data-tv");
	let r = e.accent ? Qn(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of $n) n.style.removeProperty(e);
}
function tr(e, t) {
	let n = s(), r = !l();
	e && r && (n.theme = e), t !== void 0 && r && (n.tv = t), er(n, n.reducedMotion === "on" ? !0 : n.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function nr() {
	let e = o();
	return Xt(() => {
		er({
			theme: e.theme,
			density: e.density,
			accent: e.accent,
			tv: e.tv
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/composables/useCommandPaletteHotkey.ts
function rr() {
	let e = ye(), t = (t) => {
		(t.metaKey || t.ctrlKey) && !t.altKey && (t.key === "k" || t.key === "K") && (t.preventDefault(), e.togglePalette());
	};
	typeof document < "u" && typeof document.addEventListener == "function" && (document.addEventListener("keydown", t), z(() => document.removeEventListener("keydown", t)));
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
function ir(e) {
	let t = Y(e.documentOrigin) ?? void 0, n = (e.imageOrigin ?? "").trim() || (e.apiBase ?? "").trim();
	if (!n) return null;
	let r = Y(n, t);
	return !r || t && r === t ? null : r;
}
function ar(e, t) {
	let n = document.head.querySelectorAll(`link[rel~="${e}"]`);
	for (let e of Array.from(n)) if (Y(e.href) === t) return !0;
	return !1;
}
function or(e, t, n, r) {
	if (ar(e, t)) return;
	let i = document.createElement("link");
	i.rel = e, i.href = t, n && (i.crossOrigin = "anonymous"), document.head.appendChild(i), r.push(i);
}
function sr(e, t = {}) {
	if (typeof document > "u" || typeof window > "u") return;
	let n = Y(window.location?.origin), r = Array.isArray(e) ? e : e == null ? [] : [e], i = [], a = /* @__PURE__ */ new Set();
	for (let e of r) {
		let r = Y(e);
		r && (n && r === n || a.has(r) || (a.add(r), or("preconnect", r, t.crossOrigin === !0, i), or("dns-prefetch", r, !1, i)));
	}
	i.length && z(() => {
		for (let e of i) e.remove();
		i.length = 0;
	});
}
//#endregion
//#region src/composables/useResumeReporter.ts
var cr = "phlix.deviceId", lr = 15e3;
function ur() {
	if (typeof localStorage > "u") return "web";
	try {
		let e = localStorage.getItem(cr);
		return e || (e = typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`, localStorage.setItem(cr, e)), e;
	} catch {
		return "web";
	}
}
function dr() {
	let e = ce(), t = x(), n = ur(), r = null, i = 0, a = !1;
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
		if (!(a || !n && s - i < lr)) {
			a = !0, i = s;
			try {
				let n = await o();
				if (!n) return;
				await t.client.post(`/api/v1/sessions/${encodeURIComponent(n)}/progress`, {
					media_item_id: r.id,
					position_ticks: Math.floor(e.position * ue),
					duration_ticks: Math.floor(e.duration * ue),
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
var fr = ["src", "alt"], pr = { class: "brand-wordmark" }, mr = {
	key: 1,
	class: "brand-tagline"
}, hr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PhlixApp",
	setup(e) {
		nr();
		let t = ye(), i = an(), { t: a } = m();
		rr();
		let o = Ht(() => import("./CommandPalette-CRFa5Jt8.js")), s = V(!1);
		K(() => t.open, (e) => {
			e && (s.value = !0);
		});
		function c(e) {
			i.push(`${_.value}/player/${e}`);
		}
		let l = Ut("phlixConfig", null);
		sr(ir({
			imageOrigin: l?.imageOrigin ?? null,
			apiBase: l?.apiBase ?? null,
			documentOrigin: typeof window < "u" ? window.location.origin : null
		}));
		let u = x(), d = l?.features?.resumeSync ?? l?.app !== "hub", { syncResume: f } = ke();
		K(() => u.isLoggedIn, (e) => {
			e && d && f();
		}, { immediate: !0 }), dr();
		let p = O(() => l?.branding ?? {}), h = O(() => p.value.wordmark ?? "Phlix"), g = O(() => (l?.menu ?? []).filter((e) => !e.requiresAdmin || u.isAdmin)), _ = O(() => l?.home ?? l?.routerBase ?? "/app"), v = Oe(), y = O(() => g.value.some((e) => e.libraryLinks));
		K(() => u.isLoggedIn && y.value, (e) => {
			e && v.load(l?.apiBase ?? "");
		}, { immediate: !0 });
		function ee(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, i) => (B(), k(xn, null, {
			logo: q(() => [P(G(J), {
				to: _.value,
				class: "brand"
			}, {
				default: q(() => [
					p.value.logoSrc ? (B(), j("img", {
						key: 0,
						src: p.value.logoSrc,
						alt: p.value.logoAlt ?? h.value,
						class: "brand-logo"
					}, null, 8, fr)) : A("", !0),
					M("span", pr, [N(W(h.value), 1), i[1] ||= M("span", { class: "brand-dot" }, ".", -1)]),
					p.value.tagline ? (B(), j("span", mr, W(p.value.tagline), 1)) : A("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: q(() => [g.value.length ? (B(!0), j(D, { key: 0 }, H(g.value, (e) => (B(), j(D, { key: e.id }, [(B(), k(Kt(e.href ? "a" : G(J)), {
				to: e.href ? void 0 : e.to,
				href: e.href ? ee(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: q(() => [e.icon ? (B(), k(n, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : A("", !0), N(" " + W(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			])), (B(!0), j(D, null, H(e.libraryLinks ? G(v).items : [], (t) => (B(), k(G(J), {
				key: `${e.id}-${t.id}`,
				to: {
					name: "library",
					params: { id: t.id }
				},
				class: "nav-link nav-link--sub"
			}, {
				default: q(() => [N(W(t.name), 1)]),
				_: 2
			}, 1032, ["to"]))), 128))], 64))), 128)) : (B(), j(D, { key: 1 }, [
				P(G(J), {
					to: _.value,
					class: "nav-link"
				}, {
					default: q(() => [N(W(G(a)("shell.browse")), 1)]),
					_: 1
				}, 8, ["to"]),
				P(G(J), {
					to: `${_.value}/recommendations`,
					class: "nav-link"
				}, {
					default: q(() => [N(W(G(a)("shell.recommendations")), 1)]),
					_: 1
				}, 8, ["to"]),
				P(G(J), {
					to: `${_.value}/explore`,
					class: "nav-link"
				}, {
					default: q(() => [N(W(G(a)("shell.explore")), 1)]),
					_: 1
				}, 8, ["to"]),
				P(G(J), {
					to: `${_.value}/syncplay`,
					class: "nav-link"
				}, {
					default: q(() => [N(W(G(a)("syncplay.syncPlay")), 1)]),
					_: 1
				}, 8, ["to"]),
				P(G(J), {
					to: `${_.value}/music`,
					class: "nav-link"
				}, {
					default: q(() => [N(W(G(a)("music.nav")), 1)]),
					_: 1
				}, 8, ["to"]),
				P(G(J), {
					to: `${_.value}/settings`,
					class: "nav-link"
				}, {
					default: q(() => [N(W(G(a)("shell.settings")), 1)]),
					_: 1
				}, 8, ["to"])
			], 64))]),
			actions: q(() => [
				P(r, {
					name: "search",
					label: G(a)("shell.openCommandPalette"),
					variant: "ghost",
					onClick: i[0] ||= (e) => G(t).openPalette()
				}, null, 8, ["label"]),
				P(Sn),
				G(u).isAdmin ? (B(), k(_e, { key: 0 })) : A("", !0),
				P(Nn)
			]),
			default: q(() => [
				P(G(tn)),
				s.value ? (B(), k(G(o), { key: 0 })) : A("", !0),
				G(u).isLoggedIn ? (B(), k(Wn, {
					key: 1,
					onExpand: c
				})) : A("", !0)
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-df585b3a"]]), gr = { class: "phlix-placeholder" }, _r = { class: "placeholder-content" }, vr = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (B(), j("div", gr, [M("div", _r, [n[0] ||= M("h1", null, "Shared UI loading...", -1), M("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-576c7f48"]]), X = /* @__PURE__ */ new Set();
function yr(e, t) {
	e.hasAttribute("tabindex") || e.setAttribute("tabindex", "-1"), e.setAttribute("data-focusable", ""), t?.group == null ? e.removeAttribute("data-focus-group") : e.setAttribute("data-focus-group", String(t.group)), t?.order == null ? e.removeAttribute("data-focus-order") : e.setAttribute("data-focus-order", String(t.order)), t?.disabled ? X.delete(e) : X.add(e);
}
var br = {
	mounted(e, t) {
		yr(e, t.value);
	},
	updated(e, t) {
		yr(e, t.value);
	},
	unmounted(e) {
		X.delete(e);
	}
};
function xr(e) {
	e.directive("focusable", br);
}
//#endregion
//#region src/stores/useServerStore.ts
var Sr = "phlix.currentServerId", Cr = "phlix.currentServerName", wr = "phlix.currentServerUrl";
function Tr(e) {
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
var Er = en("server", () => {
	let e = V(Tr(Sr)), t = V(Tr(Cr)), n = V(Tr(wr)), r = O(() => e.value !== null);
	function i(r, i, a) {
		e.value = r, t.value = i ?? null, n.value = a && a !== "" ? a : null, Z(Sr, r), Z(Cr, i ?? null), Z(wr, n.value);
	}
	function a() {
		e.value = null, t.value = null, n.value = null, Z(Sr, null), Z(Cr, null), Z(wr, null);
	}
	return {
		currentServerId: e,
		currentServerName: t,
		currentServerUrl: n,
		hasCurrent: r,
		setCurrent: i,
		clear: a
	};
}), Dr = {
	name: "admin-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./DashboardPage-zsNQdat3.js")
}, Or = {
	name: "admin-users",
	path: "users",
	label: "Users",
	icon: "user",
	component: () => import("./UsersPage-BkbmmOoq.js")
}, kr = {
	name: "admin-logs",
	path: "logs",
	label: "Logs",
	icon: "list",
	component: () => import("./LogsPage-Jp67l-uI.js")
}, Ar = {
	name: "admin-webhooks",
	path: "webhooks",
	label: "Webhooks",
	icon: "settings",
	component: () => import("./WebhooksPage-CF8679PE.js")
}, jr = {
	name: "admin-services",
	path: "services",
	label: "Services",
	icon: "star",
	component: () => import("./ServicesPage-Dpfdhn4_.js")
}, Mr = {
	name: "admin-integrations",
	path: "integrations",
	label: "Integrations",
	icon: "settings",
	component: () => import("./IntegrationsPage-Z3HEJSFQ.js")
}, Nr = {
	name: "admin-backup",
	path: "backup",
	label: "Backup",
	icon: "bookmark",
	component: () => import("./BackupPage-Bh8qCYwf.js")
}, Pr = {
	name: "admin-cast",
	path: "cast-devices",
	label: "Cast Devices",
	icon: "cast",
	component: () => import("./CastDevicesPage-vB_AoYFj.js")
}, Fr = {
	name: "admin-dlna",
	path: "dlna",
	label: "DLNA Server",
	icon: "monitor",
	component: () => import("./DlnaServerPage-XDrmP9G-.js")
}, Ir = {
	name: "admin-remote-access",
	path: "remote-access",
	label: "Remote Access",
	icon: "expand",
	component: () => import("./RemoteAccessPage-hA8SGI8h.js")
}, Lr = {
	name: "admin-livetv",
	path: "livetv",
	label: "Live TV / DVR",
	icon: "tv",
	component: () => import("./LiveTvPage-Bie6sLkt.js")
}, Rr = {
	name: "admin-collections",
	path: "collections",
	label: "Collections",
	icon: "list",
	component: () => import("./CollectionsPage-BeXJ9hN7.js")
}, zr = {
	name: "admin-history",
	path: "history",
	label: "Watch History",
	icon: "film",
	component: () => import("./HistoryPage-CYmYrA2r.js")
}, Br = {
	name: "admin-syncplay",
	path: "syncplay",
	label: "SyncPlay",
	icon: "play",
	component: () => import("./SyncPlayPage-f2BYiI7P.js")
}, Vr = {
	name: "admin-libraries",
	path: "libraries",
	label: "Libraries",
	icon: "image",
	component: () => import("./LibrariesPage-90x-gJLi.js")
}, Hr = {
	name: "admin-duplicates",
	path: "duplicates",
	label: "Duplicates",
	icon: "filter",
	component: () => import("./DuplicatesPage-Df0FOHRV.js")
}, Ur = {
	name: "admin-plugins",
	path: "plugins",
	label: "Plugins",
	icon: "settings",
	component: () => import("./PluginsPage-BXg3fwqV.js")
}, Wr = {
	name: "admin-transcoding",
	path: "transcoding",
	label: "Transcoding",
	icon: "play",
	component: () => import("./TranscodingSettingsPage-C1JIwm8P.js")
}, Gr = {
	name: "admin-settings",
	path: "settings",
	label: "Settings",
	icon: "settings",
	component: () => import("./SettingsPage-D--lBgBA.js")
}, Kr = {
	name: "admin-hub-dashboard",
	path: "dashboard",
	label: "Dashboard",
	icon: "speed",
	component: () => import("./HubDashboardPage-Bou9WvKf.js")
}, Q = {
	name: "admin-metrics",
	path: "metrics",
	label: "Server Traffic",
	icon: "speed",
	component: () => import("./MetricsPage-lEGygoX6.js")
}, qr = {
	name: "admin-audit-logs",
	path: "audit-logs",
	label: "Audit Logs",
	icon: "eye",
	component: () => import("./AuditLogsPage-CsOd_9Ye.js")
}, Jr = Object.fromEntries([
	Dr,
	Q,
	Or,
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
	qr
].map((e) => [e.name, e.label]));
function Yr(e) {
	return e ? Jr[e] ?? null : null;
}
var Xr = [
	Or,
	kr,
	Gr
], Zr = [
	Dr,
	Q,
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
	Wr
], Qr = [
	Kr,
	Q,
	qr
], $r = [
	Dr,
	Q,
	Or,
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
	Gr
], ei = [
	Kr,
	Q,
	...Xr,
	qr
];
function ti(e = "/app", t = $r) {
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
function ni(e = "/app") {
	return ti(e, $r);
}
function ri(e = "/app") {
	return ti(e, ei);
}
function ii(e = "/app", t = $r) {
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
var ai = [
	"login",
	"signup",
	"connect"
];
function oi(e, t, n = !1, r = { name: "browse" }) {
	let i = typeof e.name == "string" ? e.name : "";
	return ai.includes(i) || e.meta?.public === !0 ? !0 : t ? e.meta?.requiresAdmin === !0 && !n ? r : !0 : {
		name: "login",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function si(e, t, n) {
	return !t || n ? null : e.name === "connect" ? !0 : {
		name: "connect",
		query: e.fullPath ? { redirect: e.fullPath } : {}
	};
}
function ci(e, t) {
	let n = e.meta?.title;
	if (typeof n == "string" && n) return t(n);
	let r = Yr(typeof e.name == "string" ? e.name : "");
	return r ? `Admin · ${r}` : null;
}
function li(e, t, n) {
	return e === "hub" && n ? `${t}/api/v1/servers/${n}/proxy` : t;
}
function ui(e, t) {
	return e !== "hub" || t === null || t === "" ? "" : t.replace(/\/+$/, "");
}
function di() {
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
function fi(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: t,
			name: "browse",
			meta: { title: "shell.browse" },
			component: () => import("./BrowsePage-AG7KQquh.js")
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: () => import("./MediaDetailPage-iQtiyh0y.js")
		},
		{
			path: `${t}/media/:id/season/:season`,
			name: "season",
			component: () => import("./SeasonPage-DRGAKIdo.js")
		},
		{
			path: `${t}/library/:id`,
			name: "library",
			component: () => import("./LibraryPage-DfvXOshk.js")
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: () => import("./PlayerPage-CmFP4hrK.js")
		},
		{
			path: `${t}/login`,
			name: "login",
			meta: { title: "auth.loginTitle" },
			component: () => import("./LoginPage-COq_nx8x.js")
		},
		{
			path: `${t}/signup`,
			name: "signup",
			meta: { title: "auth.signupTitle" },
			component: () => import("./SignupPage-DOH9Hjni.js")
		},
		{
			path: `${t}/connect`,
			name: "connect",
			meta: { title: "connect.title" },
			component: () => import("./ConnectPage-CLaiRanq.js")
		},
		{
			path: `${t}/settings`,
			name: "settings",
			meta: { title: "settings.title" },
			component: () => import("./SettingsPage-ByLNN5Zo.js")
		},
		{
			path: `${t}/explore`,
			name: "explore",
			meta: { title: "explore.title" },
			component: () => import("./ExplorePage-Cm-Vdvzf.js")
		},
		{
			path: `${t}/recommendations`,
			name: "recommendations",
			meta: { title: "recommendations.title" },
			component: () => import("./RecommendationsPage-DdGr-pw4.js")
		},
		{
			path: `${t}/history`,
			name: "history",
			meta: { title: "history.title" },
			component: () => import("./WatchHistoryPage-B4Yu3KUB.js")
		},
		{
			path: `${t}/syncplay`,
			name: "syncplay",
			meta: { title: "syncplay.syncPlay" },
			component: () => import("./SyncPlayPage-DVc_Rr9k.js")
		},
		{
			path: `${t}/music`,
			name: "music",
			meta: { title: "music.title" },
			component: () => import("./MusicLibraryPage-BzcFbC_o.js")
		},
		{
			path: `${t}/parental`,
			name: "parental",
			meta: { title: "parental.title" },
			component: () => import("./ParentalControlsPage-CL4_I9WA.js")
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: vr,
		props: { appName: e.app }
	}), n;
}
function pi(e) {
	let t = {
		...di(),
		...e
	};
	re(t.deviceHeaders ?? {}), tr(t.defaultTheme, t.defaultTv), He(t.branding?.wordmark);
	let n = p(t.messages), r = $t();
	if (!l()) {
		let e = o(r);
		t.defaultTheme && (e.theme = t.defaultTheme), t.defaultTv !== void 0 && (e.tv = t.defaultTv);
	}
	let i = nn({
		history: rn(),
		routes: fi(t)
	}), a = t.home ? { path: t.home } : { name: "browse" }, s = Pe(r);
	s.configure(t.onConnectionChange ?? null);
	let c = () => s.apiBase || t.apiBase;
	i.beforeEach(async (e) => {
		let n = si(e, t.requireConnection === !0, c() !== "");
		if (n !== null) return n;
		let i = x(r);
		return e.meta?.requiresAdmin === !0 ? (await i.init(), oi(e, i.isLoggedIn, i.isAdmin, a)) : i.isLoggedIn === !0 ? (i.init(), oi(e, !0, !1, a)) : (await i.init(), oi(e, i.isLoggedIn, i.isAdmin, a));
	}), i.afterEach((e) => {
		Ue(ci(e, n));
	});
	let u = Er(r), d = O(() => li(t.app, c(), u.currentServerId)), f = O(() => ui(t.app, u.currentServerUrl)), m = Vt(hr);
	return m.provide("apiBase", O(() => c())), m.provide("mediaApiBase", d), m.provide("mediaDirectBase", f), m.provide("loginPath", O(() => `${t.routerBase ?? "/app"}/login`)), m.provide("phlixCommands", t.commands ?? []), m.provide("phlixConfig", t), m.use(r), m.provide("auth", x(r)), m.use(i), xr(m), m;
}
//#endregion
//#region src/components/ui/ToastHost.vue?vue&type=script&setup=true&lang.ts
var mi = ["aria-label"], hi = ["role"], gi = { class: "phlix-toast__content" }, _i = {
	key: 0,
	class: "phlix-toast__title"
}, vi = { class: "phlix-toast__message" }, yi = ["onClick"], bi = 0, xi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let { t } = m(), i = S(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, o = (e) => e.icon ?? a[e.tone];
		return R(() => {
			bi++;
		}), L(() => {
			bi--;
		}), (a, s) => (B(), k(Rt, { to: "body" }, [M("div", {
			class: I(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": G(t)("common.notifications")
		}, [P(Bt, { name: "phlix-toast" }, {
			default: q(() => [(B(!0), j(D, null, H(G(i).toasts, (e) => (B(), j("div", {
				key: e.id,
				class: I(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				P(n, {
					name: o(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				M("div", gi, [e.title ? (B(), j("p", _i, W(e.title), 1)) : A("", !0), M("p", vi, W(e.message), 1)]),
				e.action ? (B(), j("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(i).dismiss(e.id);
					}
				}, W(e.action.label), 9, yi)) : A("", !0),
				P(r, {
					name: "x",
					label: G(t)("common.dismiss"),
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(i).dismiss(e.id)
				}, null, 8, ["label", "onClick"])
			], 10, hi))), 128))]),
			_: 1
		})], 10, mi)]));
	}
}), [["__scopeId", "data-v-0127c07a"]]), Si = /*#__PURE__*/ t(/* @__PURE__ */ F({
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
		}), (t, a) => (B(), k(Kt(e.tag), {
			ref_key: "el",
			ref: n,
			class: I(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: Wt({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-4838d241"]]), Ci = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (B(), k(zt, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: q(() => [U(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-06639673"]]), wi = {
	class: "library-scan",
	"aria-labelledby": "library-scan-heading"
}, Ti = {
	key: 0,
	class: "library-scan__skel"
}, Ei = {
	key: 3,
	class: "library-scan__table-wrap"
}, Di = {
	class: "library-scan__table",
	"aria-label": "Libraries"
}, Oi = { class: "library-scan__name" }, ki = {
	key: 0,
	class: "library-scan__paths"
}, Ai = { class: "library-scan__num" }, ji = { class: "library-scan__date" }, Mi = ["data-testid"], Ni = {
	key: 0,
	class: "library-scan__error"
}, Pi = { class: "library-scan__actions" }, Fi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "LibraryScanPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? b, n = S(), r = V([]), i = V({}), a = V(!0), o = V(null);
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
		return R(s), (e, t) => (B(), j("section", wi, [t[4] ||= M("header", { class: "library-scan__head" }, [M("h1", {
			id: "library-scan-heading",
			class: "library-scan__title"
		}, "Library Scanner"), M("p", { class: "library-scan__subtitle" }, "Scan your media libraries to discover new content.")], -1), a.value ? (B(), j("div", Ti, [P(T, {
			variant: "text",
			lines: 6
		})])) : o.value ? (B(), k(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load libraries",
			description: o.value
		}, {
			actions: q(() => [P(C, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: s
			}, {
				default: q(() => [...t[0] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), k(E, {
			key: 2,
			icon: "film",
			title: "No libraries configured",
			description: "Add a library to get started."
		})) : (B(), j("div", Ei, [M("table", Di, [t[3] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Type"),
			M("th", { scope: "col" }, "Items"),
			M("th", { scope: "col" }, "Last scan"),
			M("th", { scope: "col" }, "Status"),
			M("th", {
				scope: "col",
				class: "library-scan__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(B(!0), j(D, null, H(r.value, (e) => (B(), j("tr", { key: e.id }, [
			M("td", null, [M("div", Oi, W(e.name), 1), e.paths.length ? (B(), j("div", ki, W(e.paths.join(", ")), 1)) : A("", !0)]),
			M("td", null, W(e.type), 1),
			M("td", Ai, W(e.item_count === void 0 ? "—" : e.item_count), 1),
			M("td", ji, W(d(e.last_scan_at)), 1),
			M("td", null, [M("span", {
				class: "library-scan__status",
				"data-testid": `status-${e.id}`
			}, [P(w, { tone: m(i.value[e.id]) }, {
				default: q(() => [N(W(p(i.value[e.id])), 1)]),
				_: 2
			}, 1032, ["tone"]), i.value[e.id]?.status === "failed" && i.value[e.id]?.error ? (B(), j("span", Ni, W(i.value[e.id]?.error), 1)) : A("", !0)], 8, Mi)]),
			M("td", null, [M("div", Pi, [P(C, {
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
			]), P(C, {
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
}), [["__scopeId", "data-v-f8574c77"]]), $ = class extends Error {
	kind;
	constructor(e, t) {
		super(t), this.kind = e, this.name = "ClaimError";
	}
};
async function Ii(e, t, n) {
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
function Li(e) {
	if (!(e == null || e === "")) {
		if (typeof e == "string") return /^\d+$/.test(e) ? (/* @__PURE__ */ new Date(Number(e) * 1e3)).toISOString() : e;
		if (typeof e == "number" && Number.isFinite(e)) return (/* @__PURE__ */ new Date(e * 1e3)).toISOString();
	}
}
//#endregion
//#region src/pages/MyServersPage.vue?vue&type=script&setup=true&lang.ts
var Ri = {
	class: "my-servers",
	"aria-labelledby": "my-servers-heading"
}, zi = { class: "my-servers__head" }, Bi = {
	key: 0,
	class: "my-servers__skel"
}, Vi = {
	key: 3,
	class: "my-servers__table-wrap"
}, Hi = {
	class: "my-servers__table",
	"aria-label": "Connected servers"
}, Ui = { class: "my-servers__name" }, Wi = { class: "my-servers__url" }, Gi = { class: "my-servers__num" }, Ki = { class: "my-servers__date" }, qi = ["data-testid"], Ji = { class: "my-servers__actions" }, Yi = ["disabled"], Xi = {
	key: 0,
	class: "my-servers__add-error",
	role: "alert"
}, Zi = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "MyServersPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? b, n = S(), r = x(), a = Er(), o = an(), s = Ut("phlixConfig", void 0)?.routerBase || "/app", c = V([]), l = V(!0), u = V(null), d = V(null), f = V(!1), p = V(""), m = V(!1), h = V(null);
		function g() {
			p.value = "", h.value = null, f.value = !0;
		}
		async function _() {
			m.value = !0, h.value = null;
			try {
				await Ii("", p.value), f.value = !1, n.success("Server added."), await y();
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
					last_seen: Li(e.lastSeenAt),
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
		async function oe(e) {
			if (confirm(`Remove "${e.name}"? This cannot be undone.`)) {
				d.value = e.id;
				try {
					await b.delete(`/api/v1/me/servers/${e.id}`), c.value = c.value.filter((t) => t.id !== e.id), n.success(`"${e.name}" removed.`);
				} catch (t) {
					n.error(v(t, `Failed to remove "${e.name}".`));
				} finally {
					d.value = null;
				}
			}
		}
		return R(y), (e, t) => (B(), j("section", Ri, [
			M("header", zi, [t[4] ||= M("div", null, [M("h1", {
				id: "my-servers-heading",
				class: "my-servers__title"
			}, "My Servers"), M("p", { class: "my-servers__subtitle" }, "Manage your connected media servers.")], -1), P(C, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: g
			}, {
				default: q(() => [...t[3] ||= [N("Add server", -1)]]),
				_: 1
			})]),
			l.value ? (B(), j("div", Bi, [P(T, {
				variant: "text",
				lines: 6
			})])) : u.value ? (B(), k(E, {
				key: 1,
				icon: "alert",
				title: "Couldn't load servers",
				description: u.value
			}, {
				actions: q(() => [P(C, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: y
				}, {
					default: q(() => [...t[5] ||= [N("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : c.value.length === 0 ? (B(), k(E, {
				key: 2,
				icon: "tv",
				title: "No servers connected yet",
				description: "Connect a media server to start streaming."
			}, {
				actions: q(() => [P(C, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: g
				}, {
					default: q(() => [...t[6] ||= [N("Add server", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (B(), j("div", Vi, [M("table", Hi, [t[11] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Server"),
				M("th", { scope: "col" }, "Owner"),
				M("th", { scope: "col" }, "Libraries"),
				M("th", { scope: "col" }, "Last seen"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "my-servers__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(B(!0), j(D, null, H(c.value, (e) => (B(), j("tr", { key: e.id }, [
				M("td", null, [M("div", Ui, W(e.name), 1), M("div", Wi, W(e.url), 1)]),
				M("td", null, W(e.owner), 1),
				M("td", Gi, W(e.library_count === void 0 ? "—" : e.library_count), 1),
				M("td", Ki, W(ee(e.last_seen)), 1),
				M("td", null, [M("span", {
					class: "my-servers__status",
					"data-testid": `status-${e.id}`
				}, [P(w, { tone: ne(e.status) }, {
					default: q(() => [N(W(te(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"]), re(e) ? (B(), k(w, {
					key: 0,
					tone: "warning"
				}, {
					default: q(() => [...t[7] ||= [N("Relay connecting", -1)]]),
					_: 1
				})) : A("", !0)], 8, qi)]),
				M("td", null, [M("div", Ji, [
					P(C, {
						variant: "solid",
						size: "sm",
						"left-icon": "play",
						disabled: !e.relayActive,
						title: e.relayActive ? `Browse ${e.name} here` : re(e) ? `${e.name} is online but its relay tunnel isn't connected yet — it can't be browsed here until it reconnects.` : "This server is offline — it must be connected to browse it here",
						"aria-label": `Browse ${e.name}`,
						onClick: (t) => ae(e)
					}, {
						default: q(() => [...t[8] ||= [N("Browse", -1)]]),
						_: 1
					}, 8, [
						"disabled",
						"title",
						"aria-label",
						"onClick"
					]),
					P(C, {
						variant: "ghost",
						size: "sm",
						disabled: !e.url,
						title: e.url ? `Open ${e.url}` : "This server has not reported a reachable URL yet",
						"aria-label": `Manage ${e.name}`,
						onClick: (t) => ie(e)
					}, {
						default: q(() => [...t[9] ||= [N("Manage", -1)]]),
						_: 1
					}, 8, [
						"disabled",
						"title",
						"aria-label",
						"onClick"
					]),
					P(C, {
						variant: "danger",
						size: "sm",
						loading: d.value === e.id,
						disabled: d.value === e.id,
						"aria-label": `Remove ${e.name}`,
						onClick: (t) => oe(e)
					}, {
						default: q(() => [...t[10] ||= [N("Remove", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"disabled",
						"aria-label",
						"onClick"
					])
				])])
			]))), 128))])])])),
			P(i, {
				modelValue: f.value,
				"onUpdate:modelValue": t[2] ||= (e) => f.value = e,
				title: "Add a server"
			}, {
				footer: q(() => [P(C, {
					variant: "ghost",
					size: "sm",
					disabled: m.value,
					onClick: t[1] ||= (e) => f.value = !1
				}, {
					default: q(() => [...t[14] ||= [N("Cancel", -1)]]),
					_: 1
				}, 8, ["disabled"]), P(C, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					loading: m.value,
					disabled: m.value,
					onClick: _
				}, {
					default: q(() => [...t[15] ||= [N(" Add server ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])]),
				default: q(() => [M("form", {
					class: "my-servers__add-form",
					onSubmit: Qt(_, ["prevent"])
				}, [
					t[12] ||= M("p", { class: "my-servers__add-help" }, [
						N(" On your media server, open "),
						M("strong", null, "Settings → Connect to hub"),
						N(" to get a claim code, then paste it here. ")
					], -1),
					t[13] ||= M("label", {
						class: "my-servers__add-label",
						for: "claim-code"
					}, "Claim code", -1),
					Zt(M("input", {
						id: "claim-code",
						"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
						class: "my-servers__add-input",
						type: "text",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: "e.g. ABCD-1234",
						disabled: m.value
					}, null, 8, Yi), [[Yt, p.value]]),
					h.value ? (B(), j("p", Xi, W(h.value), 1)) : A("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), [["__scopeId", "data-v-3bdc672f"]]), Qi = {
	class: "federation",
	"aria-labelledby": "federation-heading"
}, $i = {
	key: 0,
	class: "federation__skel"
}, ea = {
	key: 2,
	class: "federation__content"
}, ta = {
	key: 1,
	class: "federation__table-wrap"
}, na = {
	class: "federation__table",
	"aria-label": "Federation peers"
}, ra = { class: "federation__name" }, ia = { class: "federation__url" }, aa = { class: "federation__num" }, oa = { class: "federation__date" }, sa = ["data-testid"], ca = { class: "federation__actions" }, la = {
	class: "federation__add",
	"aria-labelledby": "federation-add-heading"
}, ua = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "FederationPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? b, n = S(), r = V([]), i = V(!0), a = V(null), o = V(""), s = V(""), c = V(""), l = V(!1);
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
		return R(() => u(!0)), (e, t) => (B(), j("section", Qi, [t[10] ||= M("header", { class: "federation__head" }, [M("h1", {
			id: "federation-heading",
			class: "federation__title"
		}, "Federation"), M("p", { class: "federation__subtitle" }, "Connect with other Phlix servers to share libraries.")], -1), i.value ? (B(), j("div", $i, [P(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), k(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load federation peers",
			description: a.value
		}, {
			actions: q(() => [P(C, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => u(!0)
			}, {
				default: q(() => [...t[4] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (B(), j("div", ea, [
			t[9] ||= M("h2", { class: "federation__section-title" }, "Connected peers", -1),
			r.value.length === 0 ? (B(), k(E, {
				key: 0,
				icon: "cast",
				title: "No federation peers connected",
				description: "Add a peer below to start sharing libraries."
			})) : (B(), j("div", ta, [M("table", na, [t[6] ||= M("thead", null, [M("tr", null, [
				M("th", { scope: "col" }, "Peer"),
				M("th", { scope: "col" }, "Shared libraries"),
				M("th", { scope: "col" }, "Last sync"),
				M("th", { scope: "col" }, "Status"),
				M("th", {
					scope: "col",
					class: "federation__actions-col"
				}, "Actions")
			])], -1), M("tbody", null, [(B(!0), j(D, null, H(r.value, (e) => (B(), j("tr", { key: e.id }, [
				M("td", null, [M("div", ra, W(e.name), 1), M("div", ia, W(e.url), 1)]),
				M("td", aa, W(e.shared_libraries_count === void 0 ? "—" : e.shared_libraries_count), 1),
				M("td", oa, W(p(e.last_sync)), 1),
				M("td", null, [M("span", {
					class: "federation__status",
					"data-testid": `status-${e.id}`
				}, [P(w, { tone: h(e.status) }, {
					default: q(() => [N(W(m(e.status)), 1)]),
					_: 2
				}, 1032, ["tone"])], 8, sa)]),
				M("td", null, [M("div", ca, [P(C, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove ${e.name}`,
					onClick: (t) => f(e.id)
				}, {
					default: q(() => [...t[5] ||= [N(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])])
			]))), 128))])])])),
			M("section", la, [t[8] ||= M("h2", {
				id: "federation-add-heading",
				class: "federation__section-title"
			}, "Add peer", -1), M("form", {
				class: "federation__form",
				onSubmit: Qt(d, ["prevent"])
			}, [
				Zt(M("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer name",
					"aria-label": "Peer name",
					autocomplete: "off"
				}, null, 512), [[Yt, s.value]]),
				Zt(M("input", {
					"onUpdate:modelValue": t[2] ||= (e) => o.value = e,
					type: "url",
					class: "federation__input",
					placeholder: "https://other-server.example.com",
					"aria-label": "Peer server URL",
					autocomplete: "off"
				}, null, 512), [[Yt, o.value]]),
				Zt(M("input", {
					"onUpdate:modelValue": t[3] ||= (e) => c.value = e,
					type: "text",
					class: "federation__input",
					placeholder: "Peer public key",
					"aria-label": "Peer public key",
					autocomplete: "off"
				}, null, 512), [[Yt, c.value]]),
				P(C, {
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
}), [["__scopeId", "data-v-6fe106b1"]]), da = {
	class: "shares",
	"aria-labelledby": "shares-heading"
}, fa = {
	key: 0,
	class: "shares__skel"
}, pa = {
	key: 3,
	class: "shares__table-wrap"
}, ma = {
	class: "shares__table",
	"aria-label": "Library shares"
}, ha = { class: "shares__library" }, ga = { class: "shares__date" }, _a = { class: "shares__date" }, va = ["data-testid"], ya = { class: "shares__actions" }, ba = /*#__PURE__*/ t(/* @__PURE__ */ F({
	__name: "ManageSharesPage",
	props: { client: {} },
	setup(e) {
		let t = e.client ?? b, n = S(), r = V([]), i = V(!0), a = V(null);
		async function o(e = !1) {
			e && (i.value = !0), a.value = null;
			try {
				r.value = ((await t.get("/api/v1/me/shares/")).outgoing || []).map((e) => ({
					id: e.id ?? "",
					library_id: e.library_id ?? "",
					library_name: e.library_name ?? "",
					shared_with: e.collaborator_name ?? e.collaborator_user_id ?? "",
					permissions: e.permission_level === "readwrite" ? "write" : "read",
					created_at: Li(e.created_at) ?? "",
					expires_at: Li(e.expires_at)
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
		return R(() => o(!0)), (e, t) => (B(), j("section", da, [t[5] ||= M("header", { class: "shares__head" }, [M("h1", {
			id: "shares-heading",
			class: "shares__title"
		}, "Manage Shares"), M("p", { class: "shares__subtitle" }, "View and manage your shared libraries.")], -1), i.value ? (B(), j("div", fa, [P(T, {
			variant: "text",
			lines: 6
		})])) : a.value ? (B(), k(E, {
			key: 1,
			icon: "alert",
			title: "Couldn't load shares",
			description: a.value
		}, {
			actions: q(() => [P(C, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				onClick: t[0] ||= (e) => o(!0)
			}, {
				default: q(() => [...t[1] ||= [N("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : r.value.length === 0 ? (B(), k(E, {
			key: 2,
			icon: "bookmark",
			title: "No library shares",
			description: "Libraries you share with others will appear here."
		})) : (B(), j("div", pa, [M("table", ma, [t[4] ||= M("thead", null, [M("tr", null, [
			M("th", { scope: "col" }, "Library"),
			M("th", { scope: "col" }, "Shared with"),
			M("th", { scope: "col" }, "Permissions"),
			M("th", { scope: "col" }, "Created"),
			M("th", { scope: "col" }, "Expires"),
			M("th", {
				scope: "col",
				class: "shares__actions-col"
			}, "Actions")
		])], -1), M("tbody", null, [(B(!0), j(D, null, H(r.value, (e) => (B(), j("tr", { key: e.id }, [
			M("td", null, [M("span", ha, W(e.library_name), 1)]),
			M("td", null, W(e.shared_with), 1),
			M("td", null, [P(w, { tone: u(e.permissions) }, {
				default: q(() => [N(W(e.permissions), 1)]),
				_: 2
			}, 1032, ["tone"])]),
			M("td", ga, W(c(e.created_at)), 1),
			M("td", _a, [M("span", {
				class: "shares__expires",
				"data-testid": `expires-${e.id}`
			}, [N(W(c(e.expires_at)) + " ", 1), l(e.expires_at) ? (B(), k(w, {
				key: 0,
				tone: "error"
			}, {
				default: q(() => [...t[2] ||= [N("Expired", -1)]]),
				_: 1
			})) : A("", !0)], 8, va)]),
			M("td", null, [M("div", ya, [P(C, {
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
}), [["__scopeId", "data-v-31edd2a2"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function xa(e, t) {
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
function Sa(e) {
	return {
		x: (e.left + e.right) / 2,
		y: (e.top + e.bottom) / 2
	};
}
var Ca = .5, wa = 2, Ta = 1e6;
function Ea(e, t, n, r) {
	return e < r && n < t;
}
function Da(e, t, n) {
	let r = Sa(e), i = null, a = Infinity;
	for (let o of n) {
		let n = Sa(o.rect), s, c, l;
		switch (t) {
			case "right":
				if (n.x <= r.x + Ca) continue;
				s = n.x - r.x, c = Math.abs(n.y - r.y), l = Ea(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "left":
				if (n.x >= r.x - Ca) continue;
				s = r.x - n.x, c = Math.abs(n.y - r.y), l = Ea(e.top, e.bottom, o.rect.top, o.rect.bottom);
				break;
			case "down":
				if (n.y <= r.y + Ca) continue;
				s = n.y - r.y, c = Math.abs(n.x - r.x), l = Ea(e.left, e.right, o.rect.left, o.rect.right);
				break;
			case "up":
				if (n.y >= r.y - Ca) continue;
				s = r.y - n.y, c = Math.abs(n.x - r.x), l = Ea(e.left, e.right, o.rect.left, o.rect.right);
				break;
		}
		let u = s + wa * c;
		l && (u -= Ta), (u < a || u === a && (i === null || o.id < i.id)) && (a = u, i = o);
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
function Ma(e = {}) {
	let t = {
		...Oa,
		...e.keymap
	};
	function n() {
		let e = [], t = /* @__PURE__ */ new Map(), n = 0;
		for (let r of X) {
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
		if (n && X.has(n)) {
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
		if (!qt(e.enabled ?? !1) || t.ctrlKey || t.metaKey || t.altKey || me(t.target) || document.activeElement?.closest("[data-focus-trap]") || t.target?.closest?.("[data-focus-trap]")) return;
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
	return R(() => {
		typeof document < "u" && document.addEventListener("keydown", o);
	}), L(() => {
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
function Na() {
	let e = () => typeof navigator > "u" ? !0 : navigator.onLine, t = V(e()), n = () => {
		t.value = e();
	};
	return typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", n), window.addEventListener("offline", n), z(() => {
		window.removeEventListener("online", n), window.removeEventListener("offline", n);
	})), Gt(t);
}
//#endregion
//#region src/index.ts
var Pa = Ht(() => import("./MediaDetail-Vl-PuRe-.js").then((e) => e.n)), Fa = Ht(() => import("./MetadataMatchModal-BfcvXP3C.js").then((e) => e.n)), Ia = Ht(() => import("./FilterBar-r0jeGyhh.js").then((e) => e.n));
//#endregion
export { lt as ALL_LOGS, yt as AdminBackupApi, bt as AdminCastApi, wt as AdminCollectionsApi, ut as AdminDashboardApi, xt as AdminDlnaServerApi, Tt as AdminHistoryApi, Pt as AdminHubDashboardApi, vt as AdminIntegrationsApi, Ot as AdminLibrariesApi, Ct as AdminLiveTvApi, ct as AdminLogsApi, st as AdminMetadataSourcesApi, Nt as AdminPluginsApi, St as AdminRemoteAccessApi, _t as AdminServicesApi, kt as AdminSettingsApi, Et as AdminSyncPlayApi, pt as AdminUsersApi, gt as AdminWebhooksApi, ie as ApiClient, ee as ApiError, e as AppBackdrop, xn as AppLayout, w as Badge, C as Button, ze as CONNECTION_API_BASE_KEY, Fe as CONNECTION_CONFIRMED_ORIGIN_KEY, Sr as CURRENT_SERVER_ID_KEY, Cr as CURRENT_SERVER_NAME_KEY, qe as Chip, Ye as Combobox, u as DEFAULT_CAPTION_STYLE, f as DEFAULT_MESSAGES, c as DEFAULT_PREFERENCES, E as EmptyState, ua as FederationPage, Ia as FilterBar, n as Icon, r as IconButton, Se as Kbd, Dt as LIBRARY_TYPES, Fi as LibraryScanPage, g as LocalStorageTokenStore, Ft as LoginForm, ba as ManageSharesPage, tt as MediaCard, Pa as MediaDetail, nt as MediaGrid, Ae as MediaHomeRow, rt as MediaRow, $e as Menu, Fa as MetadataMatchModal, i as Modal, Zi as MyServersPage, ae as NetworkError, jt as PLUGIN_SECRET_MASK, Ze as PageHint, Ci as PageTransition, hr as PhlixApp, dt as RATING_LABELS, ft as RATING_OPTIONS, de as RESUME_MAX_RATIO, le as RESUME_MIN_SECONDS, Si as Reveal, we as SORT_TITLE_ARTICLES, mt as SUBSCRIBABLE_EVENTS, Je as Select, Lt as SettingsForm, dn as Sheet, It as SignupForm, T as Skeleton, Ge as Slider, ot as SourcePriorityEditor, ve as Spinner, Ke as Switch, te as TMDB_UNCONFIGURED_CODE, Qe as Tabs, pe as ThumbRating, _ as TimeoutError, xi as ToastHost, ge as Tooltip, ht as WEBHOOK_EVENT_CATEGORIES, ii as adminMenu, tr as applyStoredThemeEarly, Da as bestCandidate, xa as bindMediaStoreToRouter, ti as buildAdminRoutes, ri as buildHubAdminRoutes, at as buildMediaQuery, it as buildMediaUrl, ni as buildServerAdminRoutes, Xr as commonAdminPages, Ce as compareByStrippedTitle, pi as createPhlixApp, p as createTranslator, Qn as deriveAccentVars, v as errMessage, Te as fetchLibraries, br as focusable, X as focusableRegistry, We as formatPageTitle, be as fuzzyScore, y as getDefaultApiHeaders, l as hasStoredPreferences, Qr as hubAdminPages, xr as installFocusable, Le as isAllowedBase, ne as isOffline, Ne as isPlaintextPublic, je as isPrivateHost, h as isTmdbUnconfigured, xe as matchCommand, d as mergeMessages, Ie as normalizeBase, Re as originOf, Mt as pluginErrorCode, At as pluginValidationErrors, Me as probeServer, s as readStoredPreferences, Sa as rectCenter, Zr as serverAdminPages, He as setAppName, re as setDefaultApiHeaders, Ue as setPageTitle, De as sortLibraries, Ee as stripLeadingArticle, se as useApiBase, x as useAuthStore, rr as useCommandPaletteHotkey, ye as useCommandStore, Pe as useConnectionStore, a as useFocusTrap, Oe as useLibrariesStore, oe as useMediaApiBase, Xe as useMediaStore, m as useMessages, Na as useOnline, Ve as usePageTitle, ce as usePlayerStore, sr as usePreconnect, o as usePreferencesStore, et as usePrefetch, dr as useResumeReporter, ke as useResumeSync, Er as useServerStore, Ma as useSpatialNav, nr as useTheme, S as useToastStore, fe as useUserItemDataStore, Be as withScheme };

//# sourceMappingURL=phlix-ui.js.map