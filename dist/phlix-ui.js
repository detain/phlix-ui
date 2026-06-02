import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c } from "./tokenStore-SjxKwmod.js";
import { n as l, r as u, t as d } from "./Modal-D0ntqq7y.js";
import { t as f } from "./EmptyState-sJb64K4c.js";
import { i as p, n as m, r as h, t as g } from "./Select-CfjCFQKH.js";
import { t as _ } from "./Badge-wMoO7SFO.js";
import { n as v, t as y } from "./cast-BZACqu1l.js";
import { t as b } from "./Switch-V3wRpG4-.js";
import { n as x, t as S } from "./logs-DadTfaTq.js";
import { t as C } from "./dashboard-BTCOCTHQ.js";
import { n as w, r as T, t as E } from "./users-C40iLgkq.js";
import { n as D, r as O, t as k } from "./webhooks-BBTLnFKm.js";
import { t as A } from "./services-Czm8hsvH.js";
import { t as ee } from "./integrations-DLAG9ISY.js";
import { t as te } from "./backup-IdY_vzc2.js";
import { t as ne } from "./dlnaServer-B5Sg4MkS.js";
import { t as re } from "./remoteAccess-DVKRpKQ8.js";
import { t as ie } from "./liveTv-Dbjt901v.js";
import { t as ae } from "./collections-CH3HLdcd.js";
import { t as oe } from "./history-ByCY8OYj.js";
import { t as se } from "./syncPlay-DPzJkgkK.js";
import { n as ce, t as le } from "./libraries-CXAz_kXs.js";
import { t as ue } from "./settings-m4upFcmH.js";
import { Fragment as j, Teleport as de, Transition as fe, TransitionGroup as pe, computed as M, createApp as me, createBlock as N, createCommentVNode as P, createElementBlock as F, createElementVNode as I, createTextVNode as L, createVNode as R, defineComponent as z, inject as he, nextTick as ge, normalizeClass as B, normalizeStyle as V, onBeforeUnmount as H, onMounted as U, openBlock as W, reactive as _e, ref as G, renderList as K, renderSlot as q, resolveComponent as ve, resolveDynamicComponent as ye, toDisplayString as J, toRef as be, unref as Y, useId as xe, vModelDynamic as Se, vModelText as Ce, vShow as we, watch as X, watchEffect as Te, withCtx as Z, withDirectives as Q, withKeys as Ee, withModifiers as De } from "vue";
import { createPinia as Oe, defineStore as ke } from "pinia";
import { RouterLink as Ae, RouterView as je, createRouter as Me, createWebHistory as Ne, onBeforeRouteLeave as Pe, useRoute as Fe, useRouter as Ie } from "vue-router";
//#region src/app/AppLayout.vue
var Le = {}, Re = { class: "app-layout" }, ze = { class: "app-header" }, Be = { class: "header-inner" }, Ve = { class: "logo" }, He = { class: "nav" }, Ue = { class: "app-main" }, We = { class: "app-footer" };
function Ge(e, t) {
	return W(), F("div", Re, [
		I("header", ze, [I("div", Be, [I("div", Ve, [q(e.$slots, "logo", {}, () => [t[0] ||= I("span", { class: "logo-text" }, "Phlix", -1)], !0)]), I("nav", He, [q(e.$slots, "nav", {}, void 0, !0)])])]),
		I("main", Ue, [q(e.$slots, "default", {}, void 0, !0)]),
		I("footer", We, [q(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var Ke = /*#__PURE__*/ r(Le, [["render", Ge], ["__scopeId", "data-v-9f6c6d16"]]), qe = { class: "phlix-kbd" }, Je = {
	key: 1,
	class: "phlix-kbd__key"
}, Ye = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = M(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (W(), F("span", qe, [n.value.length ? (W(!0), F(j, { key: 0 }, K(n.value, (e, t) => (W(), F("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, J(e), 1))), 128)) : (W(), F("kbd", Je, [q(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), Xe = "phlix.cmd.recents", Ze = 8;
function Qe(e, t) {
	let n = e.toLowerCase(), r = t.toLowerCase();
	if (n.length === 0) return 0;
	if (n.length > r.length) return -1;
	let i = 0, a = 0, o = -2, s = 0;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], c = -1;
		for (let e = a; e < r.length; e++) if (r[e] === t) {
			c = e;
			break;
		}
		if (c === -1) return -1;
		i += 1, c === o + 1 ? (s++, i += 5 + s * 2) : s = 0;
		let l = c === 0 ? "" : r[c - 1];
		if ((c === 0 || l === " " || l === "-" || l === "/" || l === ":") && (i += 8), o >= 0) {
			let e = c - o - 1;
			e > 0 && (i -= Math.min(e, 4));
		}
		o = c, a = c + 1;
	}
	return r.startsWith(n) && (i += 15), i;
}
function $e(e, t) {
	if (!e.trim()) return 0;
	let n = Qe(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, Qe(e, n));
	return t.group && (r = Math.max(r, Qe(e, t.group))), r;
}
function et() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(Xe);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, Ze) : [];
	} catch {
		return [];
	}
}
var tt = ke("phlix-commands", () => {
	let e = G(/* @__PURE__ */ new Map()), t = G(!1), n = G(""), r = G(et()), i = M(() => Array.from(e.value.values())), a = M(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: $e(t, e)
		})).filter((e) => e.s >= 0).sort((e, t) => t.s - e.s || (e.c.priority ?? 0) - (t.c.priority ?? 0) || e.c.title.localeCompare(t.c.title)).map((e) => e.c);
		let o = r.value.map((t) => e.value.get(t)).filter((e) => !!e), s = new Set(o.map((e) => e.id)), c = a.filter((e) => !s.has(e.id)).sort((e, t) => (e.priority ?? 0) - (t.priority ?? 0) || e.title.localeCompare(t.title));
		return [...o, ...c];
	});
	function o(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.set(e.id, e);
		return e.value = r, () => s(n.map((e) => e.id));
	}
	function s(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.delete(e);
		e.value = r;
	}
	function c(e) {
		return r.value.includes(e);
	}
	function l(e) {
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, Ze);
	}
	function u() {
		r.value = [];
	}
	function d(e) {
		n.value = e;
	}
	function f() {
		n.value = "", t.value = !0;
	}
	function p() {
		t.value = !1;
	}
	function m() {
		t.value ? p() : f();
	}
	async function h(t) {
		let n = e.value.get(t);
		n && (l(t), p(), await n.run());
	}
	return X(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Xe, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		registry: e,
		open: t,
		query: n,
		recentIds: r,
		all: i,
		results: a,
		register: o,
		unregister: s,
		isRecent: c,
		pushRecent: l,
		clearRecents: u,
		setQuery: d,
		openPalette: f,
		closePalette: p,
		togglePalette: m,
		runId: h
	};
}), nt = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, rt = {
	theme: "nocturne",
	accent: null,
	density: "comfortable",
	cardSize: 180,
	gridDensity: "comfy",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	captionStyle: { ...nt },
	atmosphere: !0,
	filterPresets: []
};
function it(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var at = "phlix.prefs";
function ot() {
	if (typeof localStorage > "u") return { ...rt };
	try {
		let e = localStorage.getItem(at);
		if (!e) return { ...rt };
		let t = JSON.parse(e);
		return {
			...rt,
			...t
		};
	} catch {
		return { ...rt };
	}
}
function st() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(at) !== null;
	} catch {
		return !1;
	}
}
function ct() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var $ = ke("phlix-prefs", () => {
	let e = ot(), t = G(e.theme), n = G(e.accent), r = G(e.density), i = G(e.cardSize), a = G(e.gridDensity), o = G(e.reducedMotion), s = G(e.autoplay), c = G(e.defaultVolume), l = G(e.defaultQuality), u = G(e.defaultSubtitleLang), d = G({
		...nt,
		...e.captionStyle
	}), f = G(e.atmosphere), p = G(e.filterPresets ? [...e.filterPresets] : []), m = G(ct()), h = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (h = window.matchMedia("(prefers-reduced-motion: reduce)"), h.addEventListener?.("change", (e) => m.value = e.matches));
	let g = M(() => o.value === "on" ? !0 : o.value === "off" ? !1 : m.value);
	function _() {
		return {
			theme: t.value,
			accent: n.value,
			density: r.value,
			cardSize: i.value,
			gridDensity: a.value,
			reducedMotion: o.value,
			autoplay: s.value,
			defaultVolume: c.value,
			defaultQuality: l.value,
			defaultSubtitleLang: u.value,
			captionStyle: d.value,
			atmosphere: f.value,
			filterPresets: p.value
		};
	}
	function v(e, t) {
		let n = {
			id: it(e),
			name: e.trim(),
			query: t
		}, r = p.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? p.value.splice(r, 1, n) : p.value.push(n), n;
	}
	function y(e) {
		p.value = p.value.filter((t) => t.id !== e);
	}
	X(_, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(at, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = rt;
		t.value = e.theme, n.value = e.accent, r.value = e.density, i.value = e.cardSize, a.value = e.gridDensity, o.value = e.reducedMotion, s.value = e.autoplay, c.value = e.defaultVolume, l.value = e.defaultQuality, u.value = e.defaultSubtitleLang, d.value = { ...nt }, f.value = e.atmosphere, p.value = [...e.filterPresets];
	}
	return {
		theme: t,
		accent: n,
		density: r,
		cardSize: i,
		gridDensity: a,
		reducedMotion: o,
		autoplay: s,
		defaultVolume: c,
		defaultQuality: l,
		defaultSubtitleLang: u,
		captionStyle: d,
		atmosphere: f,
		filterPresets: p,
		systemReduced: m,
		effectiveReducedMotion: g,
		snapshot: _,
		saveFilterPreset: v,
		removeFilterPreset: y,
		reset: b
	};
}), lt = { class: "phlix-cmdk__search" }, ut = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], dt = ["id"], ft = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, pt = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], mt = { class: "phlix-cmdk__option-body" }, ht = { class: "phlix-cmdk__option-title" }, gt = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, _t = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, vt = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "CommandPalette",
	setup(e) {
		let n = tt(), r = Ie(), i = $(), a = G(null), o = xe(), s = G(0);
		function c(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => n.runId(e.id)
			};
		}
		function u(e) {
			return {
				id: "__search",
				title: `Search library for “${e}”`,
				icon: "search",
				run: () => {
					n.closePalette(), r.push({
						name: "browse",
						query: { search: e }
					});
				}
			};
		}
		let d = M(() => {
			let e = [], t = [], r = (n) => {
				e.push({
					kind: "option",
					item: n,
					index: t.length
				}), t.push(n);
			}, i = n.query.trim();
			if (i) {
				for (let e of n.results) r(c(e));
				return r(u(i)), {
					rows: e,
					options: t
				};
			}
			let a = n.results.filter((e) => n.isRecent(e.id));
			a.length && (e.push({
				kind: "header",
				label: "Recent"
			}), a.forEach((e) => r(c(e))));
			let o = /* @__PURE__ */ new Map();
			for (let e of n.results) {
				if (n.isRecent(e.id)) continue;
				let t = e.group ?? "Commands", r = o.get(t);
				r ? r.push(e) : o.set(t, [e]);
			}
			for (let [t, n] of o) e.push({
				kind: "header",
				label: t
			}), n.forEach((e) => r(c(e)));
			return {
				rows: e,
				options: t
			};
		}), f = M(() => d.value.options.length), p = M(() => f.value ? `${o}-opt-${s.value}` : void 0);
		X(() => n.query, () => {
			s.value = 0;
		}), X(f, (e) => {
			s.value > e - 1 && (s.value = Math.max(0, e - 1));
		}), X(() => n.open, (e) => {
			e && (s.value = 0);
		});
		function m() {
			typeof document > "u" || document.getElementById(`${o}-opt-${s.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function h(e) {
			let t = f.value;
			t && (s.value = (s.value + e + t) % t, m());
		}
		function g() {
			let e = d.value.options[s.value];
			e && e.run();
		}
		function _(e) {
			e.run();
		}
		function v(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), h(1);
					break;
				case "ArrowUp":
					e.preventDefault(), h(-1);
					break;
				case "Home":
					e.preventDefault(), s.value = 0, m();
					break;
				case "End":
					e.preventDefault(), s.value = Math.max(0, f.value - 1), m();
					break;
				case "Enter":
					e.preventDefault(), g();
					break;
			}
		}
		function y() {
			n.closePalette();
		}
		l(a, M(() => n.open), { onEscape: () => (n.closePalette(), !0) });
		function b(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), n.togglePalette());
		}
		let x = he("phlixCommands", []), S = [
			{
				id: "nav.browse",
				title: "Go to Browse",
				icon: "film",
				group: "Navigation",
				keywords: [
					"home",
					"library",
					"media"
				],
				priority: 0,
				run: () => {
					r.push({ name: "browse" });
				}
			},
			{
				id: "nav.settings",
				title: "Go to Settings",
				icon: "settings",
				group: "Navigation",
				keywords: [
					"preferences",
					"config",
					"options"
				],
				priority: 1,
				run: () => {
					r.push({ name: "settings" });
				}
			},
			{
				id: "theme.nocturne",
				title: "Theme: Nocturne",
				icon: "moon",
				group: "Theme",
				keywords: [
					"dark",
					"amber",
					"cinema"
				],
				run: () => {
					i.theme = "nocturne";
				}
			},
			{
				id: "theme.daylight",
				title: "Theme: Daylight",
				icon: "sun",
				group: "Theme",
				keywords: ["light", "bright"],
				run: () => {
					i.theme = "daylight";
				}
			},
			{
				id: "theme.midnight",
				title: "Theme: Midnight",
				icon: "monitor",
				group: "Theme",
				keywords: [
					"oled",
					"black",
					"contrast"
				],
				run: () => {
					i.theme = "midnight";
				}
			},
			{
				id: "pref.density",
				title: "Toggle density",
				icon: "list",
				group: "Preferences",
				keywords: [
					"compact",
					"comfortable",
					"spacing"
				],
				run: () => {
					i.density = i.density === "compact" ? "comfortable" : "compact";
				}
			},
			{
				id: "pref.motion",
				title: "Toggle reduced motion",
				icon: "speed",
				group: "Preferences",
				keywords: [
					"animation",
					"accessibility",
					"a11y"
				],
				run: () => {
					i.reducedMotion = i.reducedMotion === "off" ? "auto" : "off";
				}
			},
			{
				id: "pref.atmosphere",
				title: "Toggle atmosphere",
				icon: "star",
				group: "Preferences",
				keywords: [
					"grain",
					"vignette",
					"glow",
					"ambient"
				],
				run: () => {
					i.atmosphere = !i.atmosphere;
				}
			},
			{
				id: "pref.reset",
				title: "Reset preferences",
				icon: "rewind",
				group: "Preferences",
				keywords: [
					"default",
					"clear",
					"restore"
				],
				run: () => i.reset()
			}
		], C = null;
		return U(() => {
			C = n.register([...S, ...x]), document.addEventListener("keydown", b);
		}), H(() => {
			C?.(), document.removeEventListener("keydown", b);
		}), (e, r) => (W(), N(de, { to: "body" }, [R(fe, { name: "phlix-cmdk" }, {
			default: Z(() => [Y(n).open ? (W(), F("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: De(y, ["self"])
			}, [I("div", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [I("div", lt, [
				R(t, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				I("input", {
					value: Y(n).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": Y(o),
					"aria-activedescendant": p.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: r[0] ||= (e) => Y(n).setQuery(e.target.value),
					onKeydown: v
				}, null, 40, ut),
				R(Ye, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), I("ul", {
				id: Y(o),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(W(!0), F(j, null, K(d.value.rows, (e, n) => (W(), F(j, { key: e.kind === "header" ? `h-${e.label}-${n}` : e.item.id }, [e.kind === "header" ? (W(), F("li", ft, J(e.label), 1)) : (W(), F("li", {
				key: 1,
				id: `${Y(o)}-opt-${e.index}`,
				class: B(["phlix-cmdk__option", { "is-active": e.index === s.value }]),
				role: "option",
				"aria-selected": e.index === s.value,
				onClick: (t) => _(e.item),
				onPointermove: (t) => s.value = e.index
			}, [
				R(t, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				I("span", mt, [I("span", ht, J(e.item.title), 1), e.item.subtitle ? (W(), F("span", gt, J(e.item.subtitle), 1)) : P("", !0)]),
				e.item.shortcut ? (W(), N(Ye, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : P("", !0)
			], 42, pt))], 64))), 128)), f.value ? P("", !0) : (W(), F("li", _t, " No matching commands "))], 8, dt)], 512)], 32)) : P("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]), yt = 30, bt = .95, xt = 5e3, St = "phlix.resume";
function Ct() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(St);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var wt = ke("phlix-player", () => {
	let e = $(), t = G(null), n = G(""), r = G([]), i = G(!1), a = G(0), o = G(0), s = G(0), c = G(e.defaultVolume), l = G(!1), u = G(1), d = G(e.defaultQuality), f = G(e.defaultSubtitleLang), p = G(!1), m = G(Ct()), h = M(() => o.value > 0 ? a.value / o.value : 0), g = M(() => r.value[0] ?? null), _, v = 0;
	function y(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			v = Date.now();
			try {
				localStorage.setItem(St, JSON.stringify(m.value));
			} catch {}
		}, n = Date.now() - v;
		clearTimeout(_), e || n >= xt ? t() : _ = setTimeout(t, xt - n);
	}
	function b(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function x(e, t, n) {
		b(t, n) ? m.value[e] = Math.floor(t) : delete m.value[e], y();
	}
	function S(e) {
		return e ? m.value[e] ?? null : null;
	}
	function C(e) {
		delete m.value[e], y(!0);
	}
	function w(e, r = {}) {
		t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (a.value = 0, o.value = 0, s.value = 0), ce(e);
	}
	function T(e, n, r) {
		a.value = e, n !== void 0 && (o.value = n), r !== void 0 && (s.value = r), t.value && x(t.value.id, e, o.value);
	}
	function E() {
		i.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function D() {
		i.value = !1, t.value && x(t.value.id, a.value, o.value), y(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function O(e) {
		c.value = Math.min(1, Math.max(0, e)), c.value > 0 && (l.value = !1);
	}
	function k() {
		l.value = !l.value;
	}
	function A(e) {
		u.value = e;
	}
	function ee(e) {
		d.value = e;
	}
	function te(e) {
		f.value = e;
	}
	function ne(e) {
		r.value = [...e];
	}
	function re(e) {
		r.value.push(e);
	}
	function ie(e) {
		let t = r.value.shift() ?? null;
		return t && w(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function ae() {
		p.value = !0;
	}
	function oe() {
		p.value = !1;
	}
	function se() {
		t.value && x(t.value.id, a.value, o.value), y(!0), i.value = !1, p.value = !1, t.value = null, n.value = "";
	}
	function ce(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function le() {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let e = navigator.mediaSession;
		if (typeof e.setPositionState == "function" && !(!(o.value > 0) || !Number.isFinite(o.value))) try {
			e.setPositionState({
				duration: o.value,
				position: Math.min(Math.max(0, a.value), o.value),
				playbackRate: u.value || 1
			});
		} catch {}
	}
	function ue(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return () => {};
		let t = navigator.mediaSession, n = (e, n) => {
			try {
				t.setActionHandler(e, n);
			} catch {}
		};
		return e.onPlay && n("play", e.onPlay), e.onPause && n("pause", e.onPause), e.onNext && n("nexttrack", e.onNext), e.onPrevious && n("previoustrack", e.onPrevious), e.onSeek && n("seekto", (t) => e.onSeek?.(t.seekTime ?? 0)), () => {
			for (let e of [
				"play",
				"pause",
				"nexttrack",
				"previoustrack",
				"seekto"
			]) n(e, null);
		};
	}
	function j() {
		c.value = e.defaultVolume, d.value = e.defaultQuality, f.value = e.defaultSubtitleLang;
	}
	return {
		current: t,
		streamUrl: n,
		queue: r,
		playing: i,
		position: a,
		duration: o,
		buffered: s,
		volume: c,
		muted: l,
		rate: u,
		quality: d,
		subtitleLang: f,
		miniPlayer: p,
		resumeMap: m,
		progress: h,
		upNext: g,
		inResumeBand: b,
		saveResume: x,
		resumePositionFor: S,
		clearResume: C,
		setCurrent: w,
		updateProgress: T,
		play: E,
		pause: D,
		setVolume: O,
		toggleMute: k,
		setRate: A,
		setQuality: ee,
		setSubtitle: te,
		setQueue: ne,
		enqueue: re,
		next: ie,
		showMiniPlayer: ae,
		hideMiniPlayer: oe,
		closePlayer: se,
		setMediaSessionMetadata: ce,
		setMediaPositionState: le,
		bindMediaSession: ue,
		seedFromPreferences: j
	};
}), Tt = {
	key: 0,
	class: "mini",
	role: "region",
	"aria-label": "Mini player"
}, Et = ["src", "poster"], Dt = { class: "mini__body" }, Ot = { class: "mini__title" }, kt = { class: "mini__controls" }, At = ["aria-label"], jt = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Mt = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: n }) {
		let r = n, i = wt(), a = G(null), o = M(() => i.miniPlayer && !!i.current && !!i.streamUrl), s = M(() => i.current?.name ?? ""), c = M(() => Math.max(0, Math.min(1, i.progress)));
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
		return X(() => i.playing, (e) => {
			let t = a.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), H(() => {
			a.value?.pause?.();
		}), (e, n) => (W(), N(fe, { name: "mini" }, {
			default: Z(() => [o.value ? (W(), F("div", Tt, [
				I("video", {
					ref_key: "videoRef",
					ref: a,
					class: "mini__video",
					src: Y(i).streamUrl,
					poster: Y(i).current?.poster_url ?? void 0,
					preload: "metadata",
					playsinline: "",
					onLoadedmetadata: l,
					onPlay: u,
					onPause: d,
					onTimeupdate: f,
					onClick: m
				}, null, 40, Et),
				I("div", Dt, [I("p", Ot, J(s.value), 1), I("div", kt, [
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": Y(i).playing ? "Pause" : "Play",
						onClick: p
					}, [R(t, { name: Y(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, At),
					I("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": "Expand to full player",
						onClick: m
					}, [R(t, { name: "expand" })]),
					I("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": "Close player",
						onClick: h
					}, [R(t, { name: "x" })])
				])]),
				I("div", jt, [I("div", {
					class: "mini__progress-fill",
					style: V({ transform: `scaleX(${c.value})` })
				}, null, 4)])
			])) : P("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c013af7d"]]);
//#endregion
//#region src/composables/color.ts
function Nt(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Pt = (e) => Math.max(0, Math.min(255, Math.round(e))), Ft = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Pt(e).toString(16).padStart(2, "0")).join("");
function It(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Lt(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Rt = ({ r: e, g: t, b: n }, r) => `rgba(${Pt(e)}, ${Pt(t)}, ${Pt(n)}, ${r})`;
function zt({ r: e, g: t, b: n }) {
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
function Bt(e) {
	let t = Nt(e);
	if (!t) return null;
	let n = zt(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Ft(t),
		"--accent-hover": Ft(It(t, .12)),
		"--accent-active": Ft(Lt(t, .12)),
		"--accent-soft": Rt(t, .14),
		"--accent-ring": Rt(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Vt = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Ht(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Bt(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Vt) n.style.removeProperty(e);
}
function Ut(e) {
	let t = ot();
	e && !st() && (t.theme = e), Ht(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Wt() {
	let e = $();
	return Te(() => {
		Ht({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var Gt = ["src", "alt"], Kt = { class: "brand-wordmark" }, qt = {
	key: 1,
	class: "brand-tagline"
}, Jt = { class: "main-nav" }, Yt = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "PhlixApp",
	setup(e) {
		Wt();
		let n = tt(), r = Ie();
		function i(e) {
			r.push(`${l.value}/player/${e}`);
		}
		let a = he("phlixConfig", null), o = M(() => a?.branding ?? {}), s = M(() => o.value.wordmark ?? "Phlix"), c = M(() => a?.menu ?? []), l = M(() => a?.routerBase ?? "/app");
		function d(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, r) => (W(), N(Ke, null, {
			logo: Z(() => [R(Y(Ae), {
				to: l.value,
				class: "brand"
			}, {
				default: Z(() => [
					o.value.logoSrc ? (W(), F("img", {
						key: 0,
						src: o.value.logoSrc,
						alt: o.value.logoAlt ?? s.value,
						class: "brand-logo"
					}, null, 8, Gt)) : P("", !0),
					I("span", Kt, J(s.value), 1),
					o.value.tagline ? (W(), F("span", qt, J(o.value.tagline), 1)) : P("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Z(() => [I("nav", Jt, [c.value.length ? (W(!0), F(j, { key: 0 }, K(c.value, (e) => (W(), N(ye(e.href ? "a" : Y(Ae)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? d(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Z(() => [e.icon ? (W(), N(t, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : P("", !0), L(" " + J(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (W(), F(j, { key: 1 }, [R(Y(Ae), {
				to: l.value,
				class: "nav-link"
			}, {
				default: Z(() => [...r[1] ||= [L("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), R(Y(Ae), {
				to: `${l.value}/settings`,
				class: "nav-link"
			}, {
				default: Z(() => [...r[2] ||= [L("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64)), R(u, {
				name: "search",
				label: "Open command palette (⌘K)",
				size: "sm",
				class: "nav-cmdk",
				onClick: r[0] ||= (e) => Y(n).openPalette()
			})])]),
			default: Z(() => [
				R(Y(je)),
				R(vt),
				R(Mt, { onExpand: i })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d5a4156b"]]), Xt = { class: "phlix-placeholder" }, Zt = { class: "placeholder-content" }, Qt = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (W(), F("div", Xt, [I("div", Zt, [n[0] ||= I("h1", null, "Shared UI loading...", -1), I("p", null, "Phlix " + J(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), $t = 6e4, en = 250;
function tn(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var nn = ke("media", () => {
	let t = G([]), n = G(0), r = G(!1), i = G(null), a = G(""), o = G([]), s = G(void 0), c = G(void 0), l = G([]), u = G([]), d = G("name"), f = G("asc"), p = G(24), m = G(0), h = M(() => t.value.length < n.value), g = M(() => {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = M(() => {
		let e = /* @__PURE__ */ new Set();
		return t.value.forEach((t) => t.genres?.forEach((t) => e.add(t))), Array.from(e).sort();
	}), v = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], y = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function b(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function x(e, t) {
		return `${e}/api/v1/media?${b(t).toString()}`;
	}
	function S(e) {
		return b(e).toString();
	}
	let C = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), T = null, E = null, D;
	function O(e) {
		return !!e && Date.now() - e.ts < $t;
	}
	function k(t, n, r, i) {
		i && (E && r !== T && E.abort(), T = r);
		let a = w.get(r);
		if (a) return i && (E = a.controller), a.promise;
		let o = new AbortController();
		i && (E = o);
		let s = new e({ baseUrl: t }).get(x(t, n), void 0, o.signal).then((e) => (C.set(r, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			w.delete(r);
		});
		return w.set(r, {
			promise: s,
			controller: o
		}), s;
	}
	function A(e, r) {
		t.value = r ? [...t.value, ...e.items] : e.items, n.value = e.total;
	}
	async function ee(e, t = !1) {
		let n = { ...g.value }, a = S(n), o = C.get(a);
		if (O(o)) {
			A(o, t), i.value = null;
			return;
		}
		r.value = !0, i.value = null;
		try {
			let r = await k(e, n, a, !t);
			if (!t && a !== T) return;
			A(r, t);
		} catch (e) {
			if (tn(e)) return;
			(t || a === T) && (i.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === T) && (r.value = !1);
		}
	}
	function te(e, t = en) {
		m.value = 0, clearTimeout(D), D = setTimeout(() => ee(e, !1), t);
	}
	async function ne(e) {
		r.value || !h.value || (m.value = t.value.length, await ee(e, !0));
	}
	async function re(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = S(n);
		if (!O(C.get(r))) try {
			await k(e, n, r, !1);
		} catch {}
	}
	function ie() {
		C.clear();
	}
	function ae() {
		clearTimeout(D);
	}
	function oe() {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function se(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function ce(e) {
		a.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = se(e.genres), l.value = se(e.ratings), u.value = se(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = i ?? "asc", m.value = 0;
	}
	function le() {
		t.value = [], n.value = 0, m.value = 0, i.value = null;
	}
	function ue(e) {
		a.value = e, m.value = 0;
	}
	function j(e) {
		o.value = e, m.value = 0;
	}
	function de(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function fe(e) {
		l.value = e, m.value = 0;
	}
	function pe(e) {
		u.value = e, m.value = 0;
	}
	function me(e, t) {
		d.value = e, t && (f.value = t), m.value = 0;
	}
	return {
		items: t,
		total: n,
		loading: r,
		error: i,
		search: a,
		selectedGenres: o,
		yearFrom: s,
		yearTo: c,
		selectedRatings: l,
		selectedTypes: u,
		sort: d,
		order: f,
		limit: p,
		offset: m,
		hasMore: h,
		queryParams: g,
		availableGenres: _,
		availableRatings: v,
		availableTypes: y,
		fetchMedia: ee,
		scheduleFetch: te,
		loadMore: ne,
		prefetch: re,
		clearCache: ie,
		cancelScheduled: ae,
		toQuery: oe,
		applyQuery: ce,
		reset: le,
		setSearch: ue,
		setGenres: j,
		setYearRange: de,
		setRatings: fe,
		setTypes: pe,
		setSort: me
	};
}), rn = { class: "media-card" }, an = { class: "media-card__poster" }, on = ["href", "aria-label"], sn = { class: "visually-hidden" }, cn = ["src", "alt"], ln = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, un = { class: "media-card__badges" }, dn = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, fn = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, pn = ["aria-valuenow", "aria-label"], mn = { class: "media-card__overlay" }, hn = { class: "media-card__title" }, gn = { class: "media-card__meta" }, _n = {
	key: 0,
	class: "numeric"
}, vn = {
	key: 1,
	class: "media-card__dot"
}, yn = {
	key: 2,
	class: "media-card__cert"
}, bn = {
	key: 3,
	class: "media-card__dot"
}, xn = {
	key: 4,
	class: "numeric"
}, Sn = {
	key: 0,
	class: "media-card__genres"
}, Cn = { class: "media-card__actions" }, wn = { class: "media-card__caption" }, Tn = ["title"], En = { class: "media-card__caption-sub numeric" }, Dn = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 }
	},
	emits: [
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = wt(), o = M(() => r.to ?? `/app/player/${r.item.id}`), s = G(!1), c = G(null);
		function l() {
			s.value = !0;
		}
		U(() => {
			c.value?.complete && (s.value = !0);
		});
		let u = M(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), d = M(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), f = M(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (W(), F("article", rn, [I("div", an, [
			I("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [I("span", sn, J(e.item.name), 1)], 8, on),
			e.item.poster_url ? (W(), F("img", {
				key: 0,
				ref_key: "imgEl",
				ref: c,
				class: B(["media-card__img", { "is-loaded": s.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: l
			}, null, 42, cn)) : (W(), F("div", ln, [R(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			I("div", un, [
				u.value ? (W(), F("span", dn, "New")) : P("", !0),
				q(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (W(), F("span", fn, J(e.quality), 1)) : P("", !0)
			]),
			d.value > 0 ? (W(), F("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [I("i", { style: V({ width: `${d.value * 100}%` }) }, null, 4)], 8, pn)) : P("", !0),
			I("div", mn, [
				I("h3", hn, J(e.item.name), 1),
				I("div", gn, [
					e.item.year ? (W(), F("span", _n, J(e.item.year), 1)) : P("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (W(), F("span", vn)) : P("", !0),
					e.item.rating ? (W(), F("span", yn, J(e.item.rating), 1)) : P("", !0),
					e.item.rating && e.item.runtime ? (W(), F("span", bn)) : P("", !0),
					e.item.runtime ? (W(), F("span", xn, J(e.item.runtime) + "m", 1)) : P("", !0)
				]),
				f.value.length ? (W(), F("div", Sn, [(W(!0), F(j, null, K(f.value, (e) => (W(), F("span", { key: e }, J(e), 1))), 128))])) : P("", !0),
				I("div", Cn, [
					I("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= (t) => i("play", e.item)
					}, [R(t, { name: "play" })]),
					I("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: r[1] ||= (t) => i("watchlist", e.item)
					}, [R(t, { name: "bookmark-plus" })]),
					I("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= (t) => i("info", e.item)
					}, [R(t, { name: "info" })]),
					q(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), I("div", wn, [I("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, J(e.item.name), 9, Tn), I("div", En, [
			e.item.year ? (W(), F(j, { key: 0 }, [L(J(e.item.year), 1)], 64)) : P("", !0),
			e.item.year && e.item.runtime ? (W(), F(j, { key: 1 }, [L(" · ")], 64)) : P("", !0),
			e.item.runtime ? (W(), F(j, { key: 2 }, [L(J(e.item.runtime) + "m", 1)], 64)) : P("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), On = 3 / 2;
function kn(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function An(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function jn(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * On + t + n;
}
function Mn(e) {
	let { scrollTop: t, viewportHeight: n, rowHeight: r, columns: i, itemCount: a, overscan: o } = e, s = Math.max(1, i), c = Math.ceil(a / s), l = c * r;
	if (c === 0 || r <= 0) return {
		startRow: 0,
		endRow: c,
		startIndex: 0,
		endIndex: a,
		rowCount: c,
		padTop: 0,
		totalHeight: l
	};
	let u = Math.floor(Math.max(0, t) / r), d = Math.ceil(Math.max(0, n) / r) + 1, f = Math.max(0, u - o), p = Math.min(c, u + d + o);
	return {
		startRow: f,
		endRow: p,
		startIndex: f * s,
		endIndex: Math.min(a, p * s),
		rowCount: c,
		padTop: f * r,
		totalHeight: l
	};
}
//#endregion
//#region src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var Nn = { class: "media-grid-root" }, Pn = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, Fn = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, In = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "MediaGrid",
	props: {
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingMore: {
			type: Boolean,
			default: !1
		},
		hasMore: {
			type: Boolean,
			default: !1
		},
		cardSize: {},
		skeletonCount: { default: 18 },
		overscan: { default: 2 }
	},
	emits: [
		"load-more",
		"play",
		"watchlist",
		"info"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = $(), o = M(() => r.cardSize ?? a.cardSize ?? 180), s = G(null), c = G(null), l = G(0), u = G(0), d = G(0);
		function f() {
			let e = s.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (l.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (u.value = n), d.value = Math.max(0, -t.top);
		}
		let p = 0;
		function m() {
			p ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				p = 0, f();
			});
		}
		let h = M(() => kn(l.value, o.value, 20)), g = M(() => jn(An(l.value, h.value, 20))), _ = M(() => l.value > 0 && g.value > 0), v = M(() => Mn({
			scrollTop: d.value,
			viewportHeight: u.value,
			rowHeight: g.value,
			columns: h.value,
			itemCount: r.items.length,
			overscan: r.overscan
		})), y = M(() => {
			if (!_.value) return r.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = v.value, n = [];
			for (let i = e; i < t; i++) n.push({
				item: r.items[i],
				index: i
			});
			return n;
		}), b = M(() => ({ gridTemplateColumns: _.value ? `repeat(${h.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), x = M(() => _.value ? { height: `${v.value.totalHeight}px` } : {}), S = M(() => _.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${v.value.padTop}px)`
		} : {}), C = M(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), w = M(() => _.value && d.value > u.value * 1.5);
		function T() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let E = null;
		function D() {
			E || typeof IntersectionObserver > "u" || (E = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && r.hasMore && !r.loading && !r.loadingMore && i("load-more");
			}, { rootMargin: "400px 0px" }), c.value && E.observe(c.value));
		}
		function O() {
			E?.disconnect(), E = null;
		}
		X(() => c.value, (e) => {
			O(), e && (D(), m());
		});
		let k = null;
		function A() {
			k || typeof ResizeObserver > "u" || !s.value || (k = new ResizeObserver(m), k.observe(s.value));
		}
		function ee() {
			k?.disconnect(), k = null;
		}
		return X(() => s.value, (e) => {
			ee(), e && (A(), m());
		}), U(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("resize", m, { passive: !0 })), A(), D();
		}), H(() => {
			typeof window < "u" && (window.removeEventListener("scroll", m), window.removeEventListener("resize", m)), p &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), 0), ee(), O();
		}), X(() => r.items.length, () => ge(m)), (n, r) => (W(), F("div", Nn, [e.loading && e.items.length === 0 ? (W(), F("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: V(C.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(W(!0), F(j, null, K(e.skeletonCount, (e) => (W(), F("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			I("div", { class: "skel-poster" }, null, -1),
			I("div", { class: "skel-title" }, null, -1),
			I("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (W(), F("div", Pn, [q(n.$slots, "empty", {}, () => [
			R(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= I("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= I("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (W(), F(j, { key: 2 }, [
			I("div", {
				ref_key: "sizerEl",
				ref: s,
				class: "media-grid-sizer",
				style: V(x.value)
			}, [I("div", {
				class: "media-grid",
				style: V([b.value, S.value])
			}, [(W(!0), F(j, null, K(y.value, (e) => q(n.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [R(Dn, {
				item: e.item,
				onPlay: (t) => i("play", e.item),
				onWatchlist: (t) => i("watchlist", e.item),
				onInfo: (t) => i("info", e.item)
			}, null, 8, [
				"item",
				"onPlay",
				"onWatchlist",
				"onInfo"
			])], !0)), 128))], 4)], 4),
			e.loadingMore ? (W(), F("div", Fn, [...r[3] ||= [I("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), L(" Loading more… ", -1)]])) : P("", !0),
			e.hasMore && !e.loadingMore ? (W(), F("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: c,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : P("", !0)
		], 64)), R(fe, { name: "media-grid-fade" }, {
			default: Z(() => [w.value ? (W(), F("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: T
			}, [R(t, { name: "arrow-up" })])) : P("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), Ln = ["aria-label"], Rn = { class: "media-row__head" }, zn = { class: "media-row__title" }, Bn = {
	key: 0,
	class: "media-row__count numeric"
}, Vn = { class: "media-row__action" }, Hn = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, Un = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, Wn = { class: "media-row__skel-poster" }, Gn = ["aria-label"], Kn = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "MediaRow",
	props: {
		title: {},
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		error: { default: null },
		count: { default: null },
		skeletonCount: { default: 6 },
		emptyText: {},
		hideWhenEmpty: {
			type: Boolean,
			default: !1
		},
		cardTo: {}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"retry"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = M(() => !n.loading && !n.error && n.items.length === 0), a = M(() => n.hideWhenEmpty && i.value);
		return (t, n) => a.value ? P("", !0) : (W(), F("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [I("div", Rn, [
			I("h2", zn, J(e.title), 1),
			e.count == null ? P("", !0) : (W(), F("span", Bn, J(e.count.toLocaleString()), 1)),
			I("div", Vn, [q(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (W(), F("div", Hn, [I("span", null, J(e.error), 1), I("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (W(), F("div", Un, [(W(!0), F(j, null, K(e.skeletonCount, (e) => (W(), F("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [I("div", Wn, [R(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), R(o, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : i.value ? (W(), N(f, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: Z(() => [q(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (W(), F("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(W(!0), F(j, null, K(e.items, (t) => (W(), F("li", {
			key: t.id,
			class: "media-row__cell"
		}, [R(Dn, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, Gn))], 8, Ln));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function qn(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function Jn(e, t = {}) {
	return `${e}/api/v1/media?${qn(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var Yn = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "HomeRow",
	props: {
		row: {},
		apiBase: {},
		limit: { default: 18 }
	},
	emits: [
		"items-loaded",
		"play",
		"watchlist",
		"info",
		"see-all"
	],
	setup(t, { emit: r }) {
		let i = t, a = r, o = n(), s = G([]), c = G(null), l = G(!1), u = G(null), d = G(!1), f = G(null), p = null, m = null, h = !1;
		function g(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function _() {
			if (!l.value) {
				l.value = !0, u.value = null, m = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let t = new e({ baseUrl: i.apiBase }), n = Jn(i.apiBase, {
						...i.row.query,
						limit: i.limit,
						offset: 0
					}), r = await t.get(n, void 0, m?.signal);
					if (h) return;
					s.value = r.items ?? [], c.value = typeof r.total == "number" ? r.total : s.value.length, d.value = !0, a("items-loaded", s.value);
				} catch (e) {
					if (h || g(e)) return;
					u.value = e instanceof Error ? e.message : "Failed to load", o.error(`Couldn't load "${i.row.title}"`);
				} finally {
					h || (l.value = !1);
				}
			}
		}
		function v() {
			if (typeof IntersectionObserver > "u" || !f.value) {
				_();
				return;
			}
			p = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (p?.disconnect(), p = null, _());
			}, { rootMargin: "300px" }), p.observe(f.value);
		}
		return U(v), H(() => {
			h = !0, m?.abort(), m = null, p?.disconnect(), p = null;
		}), (e, n) => (W(), F("div", {
			ref_key: "rootEl",
			ref: f
		}, [R(Kn, {
			title: t.row.title,
			items: s.value,
			loading: l.value || !d.value && !u.value,
			error: u.value,
			count: c.value,
			"hide-when-empty": "",
			onRetry: _,
			onPlay: n[1] ||= (e) => a("play", e),
			onWatchlist: n[2] ||= (e) => a("watchlist", e),
			onInfo: n[3] ||= (e) => a("info", e)
		}, {
			action: Z(() => [I("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (e) => a("see-all", t.row)
			}, "See all")]),
			_: 1
		}, 8, [
			"title",
			"items",
			"loading",
			"error",
			"count"
		])], 512));
	}
}), [["__scopeId", "data-v-fb0faca3"]]), Xn = ["disabled", "aria-pressed"], Zn = { class: "phlix-chip__label" }, Qn = ["disabled", "aria-label"], $n = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Chip",
	props: {
		selected: {
			type: Boolean,
			default: void 0
		},
		removable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		size: { default: "sm" },
		disabled: {
			type: Boolean,
			default: !1
		},
		removeLabel: { default: "Remove" }
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: n }) {
		let r = e, i = n;
		function a() {
			r.disabled || (r.selected !== void 0 && i("update:selected", !r.selected), i("click"));
		}
		return (n, r) => (W(), F("span", { class: B(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [I("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (W(), N(t, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : P("", !0), I("span", Zn, [q(n.$slots, "default", {}, void 0, !0)])], 8, Xn), e.removable ? (W(), F("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: r[0] ||= (e) => i("remove")
		}, [R(t, { name: "x" })], 8, Qn)) : P("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), er = { class: "phlix-combobox__field" }, tr = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], nr = ["id", "aria-label"], rr = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], ir = { class: "phlix-combobox__check" }, ar = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, or = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Combobox",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Search…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = M(() => p(r.options)), o = xe(), s = G(!1), c = G(-1), l = G(""), u = G(!1), d = G(null), f = G(null), g = G(null), _ = M(() => a.value.find((e) => e.value === r.modelValue)?.label ?? ""), v = M(() => {
			if (!u.value || l.value.trim() === "") return a.value;
			let e = l.value.toLowerCase();
			return a.value.filter((t) => t.label.toLowerCase().includes(e));
		}), y = M(() => c.value >= 0 ? `${o}-opt-${c.value}` : void 0);
		X(() => r.modelValue, () => {
			s.value || (l.value = _.value);
		}, { immediate: !0 });
		function b() {
			r.disabled || s.value || (s.value = !0, c.value = v.value.findIndex((e) => e.value === r.modelValue), c.value < 0 && (c.value = v.value.findIndex((e) => !e.disabled)), ge(w));
		}
		function x() {
			l.value = _.value, u.value = !1, s.value = !1;
		}
		function S(e) {
			let t = v.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (i("update:modelValue", t.value), i("change", t.value)), l.value = t.label, u.value = !1, s.value = !1, f.value?.focus());
		}
		function C(e) {
			v.value.length !== 0 && (c.value = h(v.value, c.value, e), ge(w));
		}
		function w() {
			g.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function T(e) {
			l.value = e.target.value, u.value = !0, s.value = !0, c.value = m(v.value, "first");
		}
		function E(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), s.value ? C(1) : b();
					break;
				case "ArrowUp":
					e.preventDefault(), s.value ? C(-1) : b();
					break;
				case "Enter":
					s.value && c.value >= 0 && (e.preventDefault(), S(c.value));
					break;
				case "Escape":
					s.value && (e.preventDefault(), x());
					break;
				case "Tab":
					s.value && x();
					break;
			}
		}
		function D(e) {
			s.value && d.value && !d.value.contains(e.target) && x();
		}
		return X(s, (e) => {
			e ? document.addEventListener("pointerdown", D, !0) : document.removeEventListener("pointerdown", D, !0);
		}), H(() => document.removeEventListener("pointerdown", D, !0)), (n, r) => (W(), F("div", {
			ref_key: "rootEl",
			ref: d,
			class: B(["phlix-combobox", {
				"is-open": s.value,
				"is-disabled": e.disabled
			}])
		}, [I("div", er, [
			R(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			I("input", {
				ref_key: "inputEl",
				ref: f,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": s.value,
				"aria-controls": s.value ? `${Y(o)}-list` : void 0,
				"aria-activedescendant": s.value ? y.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder,
				disabled: e.disabled,
				value: l.value,
				onInput: T,
				onFocus: b,
				onKeydown: E
			}, null, 40, tr),
			R(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Q(I("ul", {
			id: `${Y(o)}-list`,
			ref_key: "listEl",
			ref: g,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(W(!0), F(j, null, K(v.value, (n, r) => (W(), F("li", {
			id: `${Y(o)}-opt-${r}`,
			key: n.value,
			class: B(["phlix-combobox__option", {
				"is-active": r === c.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => S(r),
			onPointermove: (e) => !n.disabled && (c.value = r)
		}, [I("span", ir, [n.value === e.modelValue ? (W(), N(t, {
			key: 0,
			name: "check"
		})) : P("", !0)]), L(" " + J(n.label), 1)], 42, rr))), 128)), v.value.length === 0 ? (W(), F("li", ar, "No matches")) : P("", !0)], 8, nr), [[we, s.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), sr = { class: "filterbar__main" }, cr = { class: "filterbar__search" }, lr = { class: "filterbar__sort" }, ur = ["aria-label"], dr = ["aria-expanded"], fr = { class: "filterbar__advanced" }, pr = { class: "filterbar__field" }, mr = { class: "filterbar__field" }, hr = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, gr = { class: "filterbar__field" }, _r = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, vr = { class: "filterbar__field" }, yr = { class: "filterbar__years" }, br = { class: "filterbar__field filterbar__presets" }, xr = { class: "filterbar__chips" }, Sr = {
	key: 0,
	class: "filterbar__presets-empty"
}, Cr = {
	key: 0,
	class: "filterbar__preset-save"
}, wr = ["onKeydown"], Tr = ["disabled"], Er = { class: "filterbar__active" }, Dr = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Or = { class: "filterbar__pills" }, kr = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "FilterBar",
	props: {
		searchDebounce: { default: 250 },
		sticky: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["change"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = nn(), o = $(), s = [
			{
				value: "name",
				label: "Name"
			},
			{
				value: "year",
				label: "Year"
			},
			{
				value: "rating",
				label: "Rating"
			},
			{
				value: "date_added",
				label: "Date added"
			},
			{
				value: "runtime",
				label: "Runtime"
			}
		], c = G(a.search), l;
		X(() => a.search, (e) => {
			e !== c.value.trim() && (c.value = e);
		});
		function u() {
			clearTimeout(l), l = setTimeout(() => {
				a.setSearch(c.value.trim()), i("change");
			}, r.searchDebounce);
		}
		function d() {
			c.value = "", a.setSearch(""), i("change");
		}
		let f = G(null), p = G(0), m = M(() => a.availableGenres.filter((e) => !a.selectedGenres.includes(e)));
		function h(e) {
			if (e == null || e === "") return;
			let t = String(e);
			a.selectedGenres.includes(t) || (a.setGenres([...a.selectedGenres, t]), i("change")), f.value = null, p.value++;
		}
		function v(e) {
			let t = a.selectedRatings;
			a.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		function y(e) {
			let t = a.selectedTypes;
			a.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		let b = M(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), x = M(() => {
			let e = [];
			for (let t = b.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function S(e) {
			a.setYearRange(e == null || e === "" ? void 0 : Number(e), a.yearTo), i("change");
		}
		function C(e) {
			a.setYearRange(a.yearFrom, e == null || e === "" ? void 0 : Number(e)), i("change");
		}
		function w(e) {
			a.setSort(e), i("change");
		}
		function T() {
			a.order = a.order === "asc" ? "desc" : "asc", a.offset = 0, i("change");
		}
		let E = M(() => {
			let e = [];
			return a.search && e.push({
				key: "search",
				label: `“${a.search}”`,
				remove: d
			}), a.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					a.setGenres(a.selectedGenres.filter((e) => e !== t)), i("change");
				}
			})), a.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => v(t)
			})), a.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => y(t)
			})), a.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${a.yearFrom}`,
				remove: () => S(null)
			}), a.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${a.yearTo}`,
				remove: () => C(null)
			}), e;
		}), D = M(() => E.value.length > 0), O = M(() => a.selectedGenres.length + a.selectedRatings.length + a.selectedTypes.length + (a.yearFrom === void 0 ? 0 : 1) + (a.yearTo === void 0 ? 0 : 1));
		function k() {
			c.value = "", a.setSearch(""), a.setGenres([]), a.setRatings([]), a.setTypes([]), a.setYearRange(void 0, void 0), i("change");
		}
		let A = G(!1), ee = M(() => o.filterPresets), te = G(!1), ne = G("");
		function re() {
			te.value = !0, ne.value = "";
		}
		function ie() {
			let e = ne.value.trim();
			e && (o.saveFilterPreset(e, a.toQuery()), te.value = !1, ne.value = "");
		}
		function ae(e) {
			a.applyQuery(e.query), c.value = a.search, i("change");
		}
		function oe(e) {
			o.removeFilterPreset(e.id);
		}
		let se = G(!1);
		function ce() {
			typeof window > "u" || (se.value = window.scrollY > 24);
		}
		return U(() => {
			r.sticky && typeof window < "u" && (window.addEventListener("scroll", ce, { passive: !0 }), ce());
		}), H(() => {
			clearTimeout(l), typeof window < "u" && window.removeEventListener("scroll", ce);
		}), (n, r) => (W(), F("div", { class: B(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && se.value
		}]) }, [
			I("div", sr, [
				I("label", cr, [
					R(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					Q(I("input", {
						"onUpdate:modelValue": r[0] ||= (e) => c.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: u
					}, null, 544), [[Ce, c.value]]),
					c.value ? (W(), F("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: d
					}, [R(t, { name: "x" })])) : P("", !0)
				]),
				I("div", lr, [R(g, {
					"model-value": Y(a).sort,
					options: s,
					label: "Sort by",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value"]), I("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${Y(a).order === "asc" ? "ascending" : "descending"}`,
					onClick: T
				}, [R(t, { name: Y(a).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, ur)]),
				I("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": A.value,
					onClick: r[1] ||= (e) => A.value = !A.value
				}, [
					R(t, { name: "filter" }),
					r[4] ||= I("span", null, "Filters", -1),
					O.value ? (W(), N(_, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: Z(() => [L(J(O.value), 1)]),
						_: 1
					})) : P("", !0),
					R(t, {
						name: A.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, dr)
			]),
			R(fe, { name: "filterbar-panel" }, {
				default: Z(() => [Q(I("div", fr, [
					I("div", pr, [r[5] ||= I("span", { class: "filterbar__field-label" }, "Genres", -1), (W(), N(or, {
						key: p.value,
						"model-value": f.value,
						options: m.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": h
					}, null, 8, ["model-value", "options"]))]),
					I("div", mr, [r[6] ||= I("span", { class: "filterbar__field-label" }, "Rating", -1), I("div", hr, [(W(!0), F(j, null, K(Y(a).availableRatings, (e) => (W(), N($n, {
						key: e,
						selected: Y(a).selectedRatings.includes(e),
						"onUpdate:selected": (t) => v(e)
					}, {
						default: Z(() => [L(J(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					I("div", gr, [r[7] ||= I("span", { class: "filterbar__field-label" }, "Type", -1), I("div", _r, [(W(!0), F(j, null, K(Y(a).availableTypes, (e) => (W(), N($n, {
						key: e,
						selected: Y(a).selectedTypes.includes(e),
						"onUpdate:selected": (t) => y(e)
					}, {
						default: Z(() => [L(J(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					I("div", vr, [r[9] ||= I("span", { class: "filterbar__field-label" }, "Year", -1), I("div", yr, [
						R(or, {
							"model-value": Y(a).yearFrom ?? null,
							options: x.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": S
						}, null, 8, ["model-value", "options"]),
						r[8] ||= I("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						R(or, {
							"model-value": Y(a).yearTo ?? null,
							options: x.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": C
						}, null, 8, ["model-value", "options"])
					])]),
					I("div", br, [
						r[12] ||= I("span", { class: "filterbar__field-label" }, "Presets", -1),
						I("div", xr, [(W(!0), F(j, null, K(ee.value, (e) => (W(), N($n, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => ae(e),
							onRemove: (t) => oe(e)
						}, {
							default: Z(() => [L(J(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ee.value.length ? P("", !0) : (W(), F("span", Sr, "No saved presets"))]),
						te.value ? (W(), F("div", Cr, [Q(I("input", {
							"onUpdate:modelValue": r[2] ||= (e) => ne.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [Ee(De(ie, ["prevent"]), ["enter"]), r[3] ||= Ee((e) => te.value = !1, ["esc"])]
						}, null, 40, wr), [[Ce, ne.value]]), I("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ie
						}, [R(t, { name: "check" }), r[10] ||= L(" Save ", -1)])])) : (W(), F("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !D.value,
							onClick: re
						}, [R(t, { name: "plus" }), r[11] ||= L(" Save current ", -1)], 8, Tr))
					])
				], 512), [[we, A.value]])]),
				_: 1
			}),
			I("div", Er, [I("span", Dr, [I("b", null, J(Y(a).total.toLocaleString()), 1), L(" " + J(Y(a).total === 1 ? "title" : "titles"), 1)]), D.value ? (W(), F(j, { key: 0 }, [I("div", Or, [(W(!0), F(j, null, K(E.value, (e) => (W(), N($n, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: Z(() => [L(J(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), I("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: k
			}, "Clear all")], 64)) : P("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), Ar = { class: "browse-page" }, jr = { class: "browse-toolbar" }, Mr = { class: "browse-header" }, Nr = { class: "browse-count numeric" }, Pr = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, Fr = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "BrowsePage",
	setup(e) {
		let t = he("apiBase", ""), r = M(() => typeof t == "string" ? t : t?.value ?? ""), i = he("phlixConfig", null), a = M(() => i?.homeRows ?? []), o = nn(), s = wt(), c = n(), l = Ie(), u = G(null), d = _e(/* @__PURE__ */ new Map());
		function f(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		X(() => o.items, (e) => f(e), { immediate: !0 });
		let p = M(() => {
			let e = s.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function m() {
			o.reset(), o.fetchMedia(r.value);
		}
		U(m), X(r, m);
		function h() {
			o.reset(), o.fetchMedia(r.value);
		}
		function g() {
			o.loadMore(r.value);
		}
		function _(e, t) {
			l?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function v(e) {
			_("player", e.id);
		}
		function y(e) {
			c.success(`Added "${e.name}" to your list`);
		}
		function b(e) {
			l?.hasRoute("media") ? _("media", e.id) : c.info(`Details for "${e.name}" are coming soon`);
		}
		function x() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function S(e) {
			o.applyQuery(e.query ?? {}), m(), u.value?.scrollIntoView?.({
				behavior: x() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (e, t) => (W(), F("div", Ar, [
			I("div", jr, [q(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			p.value.length ? (W(), N(Kn, {
				key: 0,
				title: "Continue Watching",
				items: p.value,
				"hide-when-empty": "",
				onPlay: v,
				onWatchlist: y,
				onInfo: b
			}, null, 8, ["items"])) : P("", !0),
			(W(!0), F(j, null, K(a.value, (e) => (W(), N(Yn, {
				key: e.id,
				row: e,
				"api-base": r.value,
				onItemsLoaded: f,
				onSeeAll: S,
				onPlay: v,
				onWatchlist: y,
				onInfo: b
			}, null, 8, ["row", "api-base"]))), 128)),
			I("section", {
				ref_key: "gridSection",
				ref: u,
				class: "browse-library"
			}, [
				I("div", Mr, [t[0] ||= I("h1", { class: "browse-title" }, "Browse", -1), I("span", Nr, J(Y(o).total.toLocaleString()) + " titles", 1)]),
				R(kr, { onChange: h }),
				Y(o).error ? (W(), F("div", Pr, [I("p", null, J(Y(o).error), 1), I("button", {
					type: "button",
					class: "browse-retry",
					onClick: m
				}, "Retry")])) : P("", !0),
				R(In, {
					items: Y(o).items,
					loading: Y(o).loading && Y(o).items.length === 0,
					"loading-more": Y(o).loading && Y(o).items.length > 0,
					"has-more": Y(o).hasMore,
					onLoadMore: g,
					onPlay: v,
					onWatchlist: y,
					onInfo: b
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-214269cb"]]), Ir = { class: "media-detail" }, Lr = { class: "media-detail__bar" }, Rr = { class: "media-detail__hero" }, zr = { class: "media-detail__poster" }, Br = ["src", "alt"], Vr = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Hr = { class: "media-detail__info" }, Ur = { class: "media-detail__title" }, Wr = { class: "media-detail__meta numeric" }, Gr = {
	key: 0,
	class: "media-detail__meta-item"
}, Kr = {
	key: 1,
	class: "media-detail__cert"
}, qr = {
	key: 2,
	class: "media-detail__meta-item"
}, Jr = { class: "media-detail__type" }, Yr = {
	key: 0,
	class: "media-detail__genres"
}, Xr = { class: "media-detail__overview" }, Zr = { class: "media-detail__actions" }, Qr = { class: "media-detail__resume-at numeric" }, $r = {
	key: 1,
	class: "media-detail__credits"
}, ei = {
	key: 0,
	class: "media-detail__credit"
}, ti = {
	key: 1,
	class: "media-detail__credit"
}, ni = { class: "media-detail__cast" }, ri = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "MediaDetail",
	props: {
		item: {},
		resumeSeconds: { default: null },
		similar: { default: () => [] },
		similarLoading: {
			type: Boolean,
			default: !1
		},
		showBack: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"back"
	],
	setup(e, { emit: n }) {
		let r = e, a = n, o = M(() => r.item.type === "audio" ? "music" : r.item.type === "image" ? "image" : r.item.type === "series" ? "tv" : "film"), s = M(() => r.item.actors?.slice(0, 8) ?? []), c = M(() => {
			let e = r.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), l = G(!1), u = G(null);
		function d() {
			l.value = !0;
		}
		return U(() => {
			u.value?.complete && (l.value = !0);
		}), (n, r) => (W(), F("article", Ir, [
			e.item.poster_url ? (W(), F("div", {
				key: 0,
				class: "media-detail__ambient",
				style: V({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : P("", !0),
			I("div", Lr, [e.showBack ? (W(), N(i, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => a("back")
			}, {
				default: Z(() => [...r[7] ||= [L("Back", -1)]]),
				_: 1
			})) : P("", !0)]),
			I("div", Rr, [I("div", zr, [e.item.poster_url ? (W(), F("img", {
				key: 0,
				ref_key: "imgEl",
				ref: u,
				class: B(["media-detail__img", { "is-loaded": l.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: d
			}, null, 42, Br)) : (W(), F("div", Vr, [R(t, { name: o.value }, null, 8, ["name"])]))]), I("div", Hr, [
				I("h1", Ur, J(e.item.name), 1),
				I("div", Wr, [
					e.item.year ? (W(), F("span", Gr, [R(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), L(J(e.item.year), 1)])) : P("", !0),
					e.item.rating ? (W(), F("span", Kr, J(e.item.rating), 1)) : P("", !0),
					e.item.runtime ? (W(), F("span", qr, J(e.item.runtime) + "m", 1)) : P("", !0),
					I("span", Jr, J(e.item.type), 1)
				]),
				e.item.genres?.length ? (W(), F("div", Yr, [(W(!0), F(j, null, K(e.item.genres, (e) => (W(), N($n, {
					key: e,
					size: "sm"
				}, {
					default: Z(() => [L(J(e), 1)]),
					_: 2
				}, 1024))), 128))])) : P("", !0),
				I("p", Xr, J(e.item.overview || "No overview available."), 1),
				I("div", Zr, [
					R(i, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => a("play", e.item)
					}, {
						default: Z(() => [...r[8] ||= [L("Play", -1)]]),
						_: 1
					}),
					c.value ? (W(), N(i, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => a("resume", e.item)
					}, {
						default: Z(() => [r[9] ||= L(" Resume ", -1), I("span", Qr, J(c.value), 1)]),
						_: 1
					})) : P("", !0),
					R(i, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: r[3] ||= (t) => a("watchlist", e.item)
					}, {
						default: Z(() => [...r[10] ||= [L("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || s.value.length ? (W(), F("dl", $r, [e.item.director ? (W(), F("div", ei, [r[11] ||= I("dt", null, "Director", -1), I("dd", null, J(e.item.director), 1)])) : P("", !0), s.value.length ? (W(), F("div", ti, [r[12] ||= I("dt", null, "Cast", -1), I("dd", ni, [(W(!0), F(j, null, K(s.value, (e) => (W(), N($n, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: Z(() => [L(J(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : P("", !0)])) : P("", !0)
			])]),
			e.similarLoading || e.similar.length ? (W(), N(Kn, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[4] ||= (e) => a("play", e),
				onWatchlist: r[5] ||= (e) => a("watchlist", e),
				onInfo: r[6] ||= (e) => a("info", e)
			}, null, 8, ["items", "loading"])) : P("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), ii = { class: "media-detail-page" }, ai = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, oi = { class: "media-detail-page__loading-hero" }, si = { class: "media-detail-page__loading-info" }, ci = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "MediaDetailPage",
	setup(t) {
		let r = he("apiBase", ""), a = M(() => typeof r == "string" ? r : r?.value ?? ""), s = Fe(), c = Ie(), l = wt(), u = n(), d = G(null), p = G([]), m = G(!0), h = G(!1), g = G(null), _ = M(() => String(s.params.id ?? "")), v = M(() => l.resumePositionFor(_.value)), y = null, b = !1;
		function x(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function S(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				p.value = [];
				return;
			}
			let r = y, i = () => b || r !== y;
			h.value = !0;
			try {
				let o = Jn(a.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r?.signal);
				if (i()) return;
				p.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (i() || x(e)) return;
				p.value = [];
			} finally {
				i() || (h.value = !1);
			}
		}
		async function C() {
			let t = _.value;
			if (y?.abort(), y = typeof AbortController < "u" ? new AbortController() : null, m.value = !0, g.value = null, p.value = [], !t) {
				g.value = "No media id provided", m.value = !1;
				return;
			}
			try {
				let n = new e({ baseUrl: a.value }), r = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, y?.signal);
				if (b) return;
				d.value = r, m.value = !1, S(n, r);
			} catch (e) {
				if (b || x(e)) return;
				g.value = e instanceof Error ? e.message : "Failed to load title", m.value = !1;
			}
		}
		U(C), X(_, C), H(() => {
			b = !0, y?.abort(), y = null;
		});
		function w(e, t) {
			c?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function T(e) {
			w("player", e.id);
		}
		function E(e) {
			u.success(`Added "${e.name}" to your list`);
		}
		function D(e) {
			w("media", e.id);
		}
		function O() {
			c?.back();
		}
		return (e, t) => (W(), F("div", ii, [m.value ? (W(), F("div", ai, [I("div", oi, [R(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), I("div", si, [
			R(o, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			R(o, {
				variant: "text",
				lines: 4
			}),
			R(o, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : g.value ? (W(), N(f, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: g.value
		}, {
			actions: Z(() => [R(i, {
				variant: "solid",
				onClick: C
			}, {
				default: Z(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			}), R(i, {
				variant: "ghost",
				onClick: O
			}, {
				default: Z(() => [...t[1] ||= [L("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : d.value ? (W(), N(ri, {
			key: 2,
			item: d.value,
			"resume-seconds": v.value,
			similar: p.value,
			"similar-loading": h.value,
			onPlay: T,
			onResume: T,
			onWatchlist: E,
			onInfo: D,
			onBack: O
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : P("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]);
//#endregion
//#region src/components/player/format-time.ts
function li(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var ui = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], di = { class: "scrubber__track" }, fi = ["title"], pi = { class: "scrubber__time numeric" }, mi = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Scrubber",
	props: {
		position: {},
		duration: {},
		buffered: { default: 0 },
		chapters: { default: () => [] },
		thumbnailAt: {},
		step: { default: 5 }
	},
	emits: [
		"seek",
		"scrub-start",
		"scrub-end"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = G(null), o = G(!1), s = G(!1), c = G(0), l = G(0), u = (e) => Math.min(1, Math.max(0, e)), d = M(() => o.value ? c.value : r.duration > 0 ? u(r.position / r.duration) : 0), f = M(() => r.duration > 0 ? u(r.buffered / r.duration) : 0), p = M(() => (o.value || s.value) && r.duration > 0), m = M(() => o.value ? c.value : l.value), h = M(() => m.value * r.duration), g = M(() => p.value ? r.thumbnailAt?.(h.value) ?? null : null), _ = M(() => g.value ? `url("${g.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), v = M(() => `${Math.min(96, Math.max(4, m.value * 100))}%`), y = M(() => r.duration > 0 ? r.chapters.filter((e) => e.start > 0 && e.start < r.duration).map((e) => ({
			...e,
			ratio: e.start / r.duration
		})) : []);
		function b(e) {
			let t = a.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : u((e.clientX - n.left) / n.width);
		}
		function x(e) {
			if (r.duration <= 0) return;
			o.value = !0;
			try {
				a.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = b(e);
			c.value = t, i("scrub-start"), i("seek", t * r.duration), e.preventDefault();
		}
		function S(e) {
			let t = b(e);
			l.value = t, o.value && (c.value = t, i("seek", t * r.duration));
		}
		function C(e) {
			if (o.value) {
				o.value = !1;
				try {
					a.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				i("scrub-end");
			}
		}
		function w() {
			s.value = !0;
		}
		function T() {
			s.value = !1;
		}
		function E(e) {
			let t = r.duration;
			if (t <= 0) return;
			let n = null;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, r.position - r.step);
					break;
				case "ArrowRight":
					n = Math.min(t, r.position + r.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			i("seek", n), e.preventDefault();
		}
		return t({
			playedRatio: d,
			previewActive: p
		}), (t, n) => (W(), F("div", {
			ref_key: "trackEl",
			ref: a,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": Y(li)(e.position),
			"aria-label": "Seek",
			onPointerdown: x,
			onPointermove: S,
			onPointerup: C,
			onPointercancel: C,
			onPointerenter: w,
			onPointerleave: T,
			onKeydown: E
		}, [I("div", di, [
			I("div", {
				class: "scrubber__buffered",
				style: V({ width: `${f.value * 100}%` })
			}, null, 4),
			I("div", {
				class: "scrubber__played",
				style: V({ width: `${d.value * 100}%` })
			}, null, 4),
			(W(!0), F(j, null, K(y.value, (e, t) => (W(), F("span", {
				key: t,
				class: "scrubber__tick",
				style: V({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, fi))), 128)),
			I("div", {
				class: B(["scrubber__head", { "is-dragging": o.value }]),
				style: V({ left: `${d.value * 100}%` })
			}, null, 6)
		]), p.value ? (W(), F("div", {
			key: 0,
			class: "scrubber__preview",
			style: V({ left: v.value }),
			"aria-hidden": "true"
		}, [g.value ? (W(), F("div", {
			key: 0,
			class: "scrubber__thumb",
			style: V({ backgroundImage: _.value })
		}, null, 4)) : P("", !0), I("span", pi, J(Y(li)(h.value)), 1)], 4)) : P("", !0)], 40, ui));
	}
}), [["__scopeId", "data-v-b2711211"]]), hi = [
	{
		id: "playpause",
		keys: ["Space", "K"],
		label: "Play / pause"
	},
	{
		id: "seek5",
		keys: ["ArrowLeft", "ArrowRight"],
		label: "Seek ±5s"
	},
	{
		id: "seek10",
		keys: ["J", "L"],
		label: "Seek ±10s"
	},
	{
		id: "frame",
		keys: [",", "."],
		label: "Frame step (paused)"
	},
	{
		id: "volume",
		keys: ["ArrowUp", "ArrowDown"],
		label: "Volume"
	},
	{
		id: "mute",
		keys: ["M"],
		label: "Mute"
	},
	{
		id: "fullscreen",
		keys: ["F"],
		label: "Fullscreen"
	},
	{
		id: "captions",
		keys: ["C"],
		label: "Captions"
	},
	{
		id: "theater",
		keys: ["T"],
		label: "Theater"
	},
	{
		id: "pip",
		keys: ["I"],
		label: "Picture-in-picture"
	},
	{
		id: "seekpct",
		keys: [
			"0",
			"–",
			"9"
		],
		label: "Seek to %"
	},
	{
		id: "speed",
		keys: ["<", ">"],
		label: "Speed"
	},
	{
		id: "help",
		keys: ["?"],
		label: "This help"
	}
], gi = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, _i = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function vi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function yi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function bi(e, t) {
	switch (e.key) {
		case " ": return vi(e.target) ? !1 : (t.playPause(), !0);
		case "k":
		case "K": return t.playPause(), !0;
		case "ArrowLeft": return t.seekBy(-5), !0;
		case "ArrowRight": return t.seekBy(5), !0;
		case "j":
		case "J": return t.seekBy(-10), !0;
		case "l":
		case "L": return t.seekBy(10), !0;
		case ",": return t.frameStep(-1), !0;
		case ".": return t.frameStep(1), !0;
		case "ArrowUp": return t.volumeBy(.05), !0;
		case "ArrowDown": return t.volumeBy(-.05), !0;
		case "m":
		case "M": return t.toggleMute(), !0;
		case "f":
		case "F": return t.toggleFullscreen(), !0;
		case "c":
		case "C": return t.toggleCaptions(), !0;
		case "t":
		case "T": return t.toggleTheater(), !0;
		case "i":
		case "I": return t.togglePip(), !0;
		case "<": return t.speedStep(-1), !0;
		case ">": return t.speedStep(1), !0;
		case "?": return t.toggleHelp(), !0;
		default: return e.key >= "0" && e.key <= "9" ? (t.seekToPercent(Number(e.key) / 10), !0) : !1;
	}
}
function xi(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || yi(n.target) || bi(n, e) && n.preventDefault();
	}
	U(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), H(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Si = { class: "shortcuts__head" }, Ci = { class: "shortcuts__grid" }, wi = { class: "shortcuts__keys" }, Ti = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Ei = {
	key: 1,
	class: "shortcuts__key"
}, Di = { class: "shortcuts__label" }, Oi = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => hi }
	},
	emits: ["close"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = G(null);
		return l(a, be(r, "open"), {
			lockScroll: !1,
			onEscape: () => (i("close"), !0)
		}), (n, r) => e.open ? (W(), F("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= De((e) => i("close"), ["self"])
		}, [I("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [I("div", Si, [r[2] ||= I("h3", { class: "shortcuts__title" }, "Keyboard", -1), R(u, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: r[0] ||= (e) => i("close")
		})]), I("ul", Ci, [(W(!0), F(j, null, K(e.shortcuts, (e) => (W(), F("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [I("span", wi, [(W(!0), F(j, null, K(e.keys, (e, n) => (W(), F(j, { key: n }, [e === "–" ? (W(), F("span", Ti, "–")) : (W(), F("kbd", Ei, [Y(gi)[e] ? (W(), N(t, {
			key: 0,
			name: Y(gi)[e],
			label: Y(_i)[e] ?? e
		}, null, 8, ["name", "label"])) : (W(), F(j, { key: 1 }, [L(J(e), 1)], 64))]))], 64))), 128))]), I("span", Di, J(e.label), 1)]))), 128))])], 512)])) : P("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), ki = { class: "volume" }, Ai = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "VolumeControl",
	setup(e) {
		let t = wt(), n = $(), r = M(() => t.muted ? 0 : t.volume), i = M(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return X(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (W(), F("div", ki, [R(u, {
			name: i.value,
			label: Y(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), R(v, {
			class: "volume__slider",
			"model-value": r.value,
			min: 0,
			max: 1,
			step: .05,
			label: "Volume",
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "format-value"])]));
	}
}), [["__scopeId", "data-v-2768c5e3"]]), ji = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "SpeedMenu",
	setup(e) {
		let t = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], n = wt(), r = M(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (W(), N(g, {
			class: "speed-menu",
			"model-value": Y(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), Mi = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = wt(), r = $(), i = M(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (W(), N(g, {
			key: 0,
			class: "quality-menu",
			"model-value": Y(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"])) : P("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]);
//#endregion
//#region src/components/player/captions.ts
function Ni(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function Pi(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Fi(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Ii(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Li(e) {
	return e ? Ni(e.textTracks).filter(Pi).map((e, t) => ({
		index: t,
		language: Fi(e, t),
		label: e.label || Ii(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function Ri(e) {
	let t = e?.audioTracks;
	return Ni(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Ii(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function zi(e, t) {
	return !e || t == null ? null : Ni(e.textTracks).filter(Pi).find((e, n) => Fi(e, n) === t) ?? null;
}
function Bi(e, t) {
	return zi(e, t) != null;
}
function Vi(e, t) {
	e && Ni(e.textTracks).filter(Pi).forEach((e, n) => {
		try {
			e.mode = Fi(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function Hi(e, t) {
	let n = e?.audioTracks;
	Ni(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Ui(e) {
	let t = e?.audioTracks;
	return Ni(t).findIndex((e) => e.enabled);
}
var Wi = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function Gi(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function Ki(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && Gi(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(Wi, n) ? Wi[n] : e;
	});
}
function qi(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => Ki(e).trim()).filter((e) => e.length > 0) : [];
}
function Ji(e) {
	if (!e) return [];
	let t = Ni(e.activeCues), n = [];
	for (let e of t) n.push(...qi(e.text));
	return n;
}
var Yi = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Xi = [
	{
		value: "sm",
		label: "Small"
	},
	{
		value: "md",
		label: "Medium"
	},
	{
		value: "lg",
		label: "Large"
	},
	{
		value: "xl",
		label: "Extra large"
	}
], Zi = [
	{
		value: "#ffffff",
		label: "White"
	},
	{
		value: "#ffd400",
		label: "Yellow"
	},
	{
		value: "#66e0ff",
		label: "Cyan"
	},
	{
		value: "#7cff7c",
		label: "Green"
	}
], Qi = [
	{
		value: "none",
		label: "Off"
	},
	{
		value: "semi",
		label: "Semi-transparent"
	},
	{
		value: "solid",
		label: "Solid"
	}
], $i = [
	{
		value: "none",
		label: "None"
	},
	{
		value: "drop-shadow",
		label: "Drop shadow"
	},
	{
		value: "outline",
		label: "Outline"
	},
	{
		value: "raised",
		label: "Raised"
	}
];
function ea(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function ta(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function na(e) {
	return {
		"--cap-scale": String(Yi[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": ea(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": ta(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var ra = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = G([]), i = M(() => na(n.styleConfig)), a = null;
		function o() {
			r.value = Ji(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), Vi(n.video, n.language);
			let e = zi(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = Ji(e)) : r.value = [];
		}
		return X(() => [n.video, n.language], c, { immediate: !0 }), H(s), t({ lines: r }), (t, n) => r.value.length ? (W(), F("div", {
			key: 0,
			class: B(["player__captions", { "is-lifted": e.lifted }]),
			style: V(i.value)
		}, [(W(!0), F(j, null, K(r.value, (e, t) => (W(), F("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : P("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), ia = ["aria-label", "aria-expanded"], aa = { class: "capmenu__head" }, oa = ["aria-checked", "tabindex"], sa = { class: "capmenu__check" }, ca = [
	"aria-checked",
	"tabindex",
	"onClick"
], la = { class: "capmenu__check" }, ua = { class: "capmenu__optlabel" }, da = [
	"aria-checked",
	"tabindex",
	"onClick"
], fa = { class: "capmenu__check" }, pa = { class: "capmenu__optlabel" }, ma = { class: "capmenu__style" }, ha = { class: "capmenu__field" }, ga = { class: "capmenu__field" }, _a = { class: "capmenu__field" }, va = { class: "capmenu__field" }, ya = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "CaptionsMenu",
	props: {
		tracks: { default: () => [] },
		audioTracks: { default: () => [] },
		activeAudio: { default: -1 },
		open: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:open", "select-audio"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = wt(), o = $(), s = G(null), c = G(null), d = M(() => a.subtitleLang), f = M(() => r.tracks.some((e) => e.language === d.value)), p = M(() => f.value ? "captions" : "captions-off"), m = M(() => f.value ? r.tracks.findIndex((e) => e.language === d.value) + 1 : 0), h = M(() => r.activeAudio >= 0 ? r.activeAudio : 0);
		function _(e) {
			i("update:open", e);
		}
		function v() {
			_(!1);
		}
		function y(e) {
			a.setSubtitle(e), o.defaultSubtitleLang = e;
		}
		function b(e) {
			i("select-audio", e);
		}
		function x(e, t, n) {
			if (t === 0) return null;
			let r = n;
			switch (e.key) {
				case "ArrowDown":
				case "ArrowRight":
					r = (n + 1) % t;
					break;
				case "ArrowUp":
				case "ArrowLeft":
					r = (n - 1 + t) % t;
					break;
				case "Home":
					r = 0;
					break;
				case "End":
					r = t - 1;
					break;
				default: return null;
			}
			return e.preventDefault(), e.currentTarget.querySelectorAll("[role=\"radio\"]")[r]?.focus(), r;
		}
		function S(e) {
			let t = x(e, r.tracks.length + 1, m.value);
			t !== null && y(t === 0 ? null : r.tracks[t - 1].language);
		}
		function C(e) {
			let t = x(e, r.audioTracks.length, h.value);
			t !== null && b(r.audioTracks[t].index);
		}
		function w(e) {
			o.captionStyle = {
				...o.captionStyle,
				size: e
			};
		}
		function T(e) {
			o.captionStyle = {
				...o.captionStyle,
				textColor: String(e)
			};
		}
		function E(e) {
			o.captionStyle = {
				...o.captionStyle,
				background: e
			};
		}
		function D(e) {
			o.captionStyle = {
				...o.captionStyle,
				edge: e
			};
		}
		l(c, be(r, "open"), {
			lockScroll: !1,
			onEscape: () => (v(), !0)
		});
		function O(e) {
			s.value && !s.value.contains(e.target) && v();
		}
		return X(() => r.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", O, !0) : document.removeEventListener("pointerdown", O, !0));
		}, { immediate: !0 }), H(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", O, !0);
		}), (n, r) => (W(), F("div", {
			ref_key: "rootEl",
			ref: s,
			class: "capmenu"
		}, [I("button", {
			type: "button",
			class: B(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? "Captions (on)" : "Captions (off)",
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: r[0] ||= (t) => _(!e.open)
		}, [R(t, { name: p.value }, null, 8, ["name"])], 10, ia), e.open ? (W(), F("div", {
			key: 0,
			ref_key: "panelEl",
			ref: c,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Captions and subtitles",
			tabindex: "-1"
		}, [
			I("div", aa, [r[2] ||= I("h3", { class: "capmenu__title" }, "Subtitles", -1), R(u, {
				name: "x",
				label: "Close",
				size: "sm",
				onClick: v
			})]),
			I("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Subtitle track",
				onKeydown: S
			}, [I("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: r[1] ||= (e) => y(null)
			}, [I("span", sa, [f.value ? P("", !0) : (W(), N(t, {
				key: 0,
				name: "check"
			}))]), r[3] ||= I("span", { class: "capmenu__optlabel" }, "Off", -1)], 8, oa), (W(!0), F(j, null, K(e.tracks, (e, n) => (W(), F("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": d.value === e.language,
				tabindex: m.value === n + 1 ? 0 : -1,
				onClick: (t) => y(e.language)
			}, [I("span", la, [d.value === e.language ? (W(), N(t, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", ua, J(e.label), 1)], 8, ca))), 128))], 32),
			e.audioTracks.length > 1 ? (W(), F(j, { key: 0 }, [r[4] ||= I("h3", { class: "capmenu__title capmenu__title--sub" }, "Audio", -1), I("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Audio track",
				onKeydown: C
			}, [(W(!0), F(j, null, K(e.audioTracks, (n) => (W(), F("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: h.value === n.index ? 0 : -1,
				onClick: (e) => b(n.index)
			}, [I("span", fa, [e.activeAudio === n.index ? (W(), N(t, {
				key: 0,
				name: "check"
			})) : P("", !0)]), I("span", pa, J(n.label), 1)], 8, da))), 128))], 32)], 64)) : P("", !0),
			r[9] ||= I("h3", { class: "capmenu__title capmenu__title--sub" }, "Caption style", -1),
			I("div", ma, [
				I("div", ha, [r[5] ||= I("span", { class: "capmenu__fieldlabel" }, "Size", -1), R(g, {
					"model-value": Y(o).captionStyle.size,
					options: Y(Xi),
					label: "Caption size",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value", "options"])]),
				I("div", ga, [r[6] ||= I("span", { class: "capmenu__fieldlabel" }, "Color", -1), R(g, {
					"model-value": Y(o).captionStyle.textColor,
					options: Y(Zi),
					label: "Caption color",
					"onUpdate:modelValue": T
				}, null, 8, ["model-value", "options"])]),
				I("div", _a, [r[7] ||= I("span", { class: "capmenu__fieldlabel" }, "Background", -1), R(g, {
					"model-value": Y(o).captionStyle.background,
					options: Y(Qi),
					label: "Caption background",
					"onUpdate:modelValue": E
				}, null, 8, ["model-value", "options"])]),
				I("div", va, [r[8] ||= I("span", { class: "capmenu__fieldlabel" }, "Edge", -1), R(g, {
					"model-value": Y(o).captionStyle.edge,
					options: Y($i),
					label: "Caption edge",
					"onUpdate:modelValue": D
				}, null, 8, ["model-value", "options"])])
			])
		], 512)) : P("", !0)], 512));
	}
}), [["__scopeId", "data-v-aff48a56"]]), ba = 32, xa = 18, Sa = 250, Ca = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function wa(e, t, n, r, i, a, o) {
	let s = Math.max(0, Math.min(t, Math.floor(r))), c = Math.max(0, Math.min(n, Math.floor(i))), l = Math.max(s, Math.min(t, Math.ceil(a))), u = Math.max(c, Math.min(n, Math.ceil(o))), d = 0, f = 0, p = 0, m = 0;
	for (let n = c; n < u; n++) for (let r = s; r < l; r++) {
		let i = (n * t + r) * 4;
		d += e[i], f += e[i + 1], p += e[i + 2], m++;
	}
	return m === 0 ? {
		r: 0,
		g: 0,
		b: 0
	} : {
		r: Ca(d / m),
		g: Ca(f / m),
		b: Ca(p / m)
	};
}
function Ta(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: wa(e, t, n, 0, 0, r, n),
		right: wa(e, t, n, t - r, 0, t, n),
		center: wa(e, t, n, 0, 0, t, n)
	};
}
function Ea({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Da({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function Oa(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Da(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Da(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Da(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function ka(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var Aa = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "AmbientCanvas",
	props: {
		video: { default: null },
		enabled: {
			type: Boolean,
			default: !0
		},
		playing: {
			type: Boolean,
			default: !1
		},
		reducedMotion: {
			type: Boolean,
			default: !1
		},
		intensity: { default: 1 }
	},
	setup(e, { expose: t }) {
		let n = e, r = G(!1), i = null;
		function a() {
			r.value = ka(i);
		}
		let o = M(() => n.enabled && !n.reducedMotion && !r.value), s = M(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = G(null), l = null, u = null, d = !1, f = !1;
		function p() {
			if (d) return u;
			if (f || typeof document > "u") return f = !0, null;
			l = document.createElement("canvas"), l.width = 32, l.height = 18;
			try {
				u = l.getContext("2d", { willReadFrequently: !0 });
			} catch {
				u = null;
			}
			return u ? (d = !0, u) : (f = !0, null);
		}
		function m() {
			let e = n.video;
			if (!o.value || !e || !e.videoWidth || !e.videoHeight) return;
			let t = p();
			if (t) try {
				t.drawImage(e, 0, 0, 32, 18);
				let { data: n } = t.getImageData(0, 0, 32, 18);
				c.value = Oa(Ta(n, 32, 18));
			} catch {
				f = !0, c.value = null;
			}
		}
		function h(e) {
			return !!e && typeof e.requestVideoFrameCallback == "function";
		}
		let g = null, _ = null, v = null, y = 0, b = !1;
		function x(e) {
			_ = e, g = e.requestVideoFrameCallback(S);
		}
		function S(e) {
			if (!b) return;
			e - y >= 250 && (y = e, m());
			let t = n.video;
			h(t) && x(t);
		}
		function C() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, x(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function w() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		X(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			w(), e && t && C();
		}, { immediate: !0 }), U(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), H(() => {
			w(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let T = M(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (W(), F("div", {
			class: B(["player__ambient", { "is-active": o.value }]),
			style: V(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), ja = {
	class: "resume",
	role: "region",
	"aria-label": "Resume playback"
}, Ma = { class: "resume__label" }, Na = { class: "resume__time numeric" }, Pa = { class: "resume__actions" }, Fa = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: n }) {
		let r = n;
		return (n, i) => (W(), F("div", ja, [I("p", Ma, [
			i[2] ||= L(" Resume from ", -1),
			I("span", Na, J(Y(li)(e.seconds)), 1),
			i[3] ||= L("? ", -1)
		]), I("div", Pa, [I("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: i[0] ||= (e) => r("resume")
		}, [R(t, { name: "play" }), i[4] ||= I("span", null, "Resume", -1)]), I("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: i[1] ||= (e) => r("restart")
		}, [R(t, { name: "rewind" }), i[5] ||= I("span", null, "Start over", -1)])])]));
	}
}), [["__scopeId", "data-v-766eae6c"]]), Ia = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], La = [
	"mkv",
	"avi",
	"wmv",
	"flv",
	"ts",
	"m2ts",
	"mts",
	"mpg",
	"mpeg",
	"vob",
	"divx",
	"3gp",
	"rmvb"
], Ra = new Set(La);
function za(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Ba(...e) {
	return e.some((e) => Ra.has(za(e)));
}
function Va(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var Ha = 8, Ua = 15, Wa = 2 * Math.PI * 15;
function Ga(e, t, n = Wa) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var Ka = {
	class: "upnext",
	role: "region",
	"aria-label": "Up next"
}, qa = ["src"], Ja = { class: "upnext__body" }, Ya = { class: "upnext__title" }, Xa = {
	key: 0,
	class: "upnext__cd numeric"
}, Za = { class: "upnext__actions" }, Qa = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, $a = ["r"], eo = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], to = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "UpNext",
	props: {
		media: {},
		remaining: { default: 0 },
		total: { default: 0 },
		counting: {
			type: Boolean,
			default: !1
		},
		posterUrl: { default: void 0 }
	},
	emits: ["play-now", "cancel"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = M(() => r.posterUrl ?? r.media.poster_url ?? null), o = M(() => Ga(r.remaining, r.total));
		return (n, r) => (W(), F("aside", Ka, [
			a.value ? (W(), F("img", {
				key: 0,
				class: "upnext__thumb",
				src: a.value,
				alt: "",
				loading: "lazy"
			}, null, 8, qa)) : P("", !0),
			I("div", Ja, [
				r[3] ||= I("p", { class: "upnext__eyebrow" }, "Up next", -1),
				I("h4", Ya, J(e.media.name), 1),
				e.counting ? (W(), F("p", Xa, "Starts in " + J(Math.max(0, e.remaining)) + "s", 1)) : P("", !0),
				I("div", Za, [I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: r[0] ||= (e) => i("play-now")
				}, [R(t, { name: "play" }), r[2] ||= I("span", null, "Play now", -1)]), I("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: r[1] ||= (e) => i("cancel")
				}, "Cancel")])
			]),
			e.counting ? (W(), F("svg", Qa, [I("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, $a), I("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(Wa),
				"stroke-dashoffset": o.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, eo)])) : P("", !0)
		]));
	}
}), [["__scopeId", "data-v-f81cfb02"]]), no = {
	class: "transcode",
	role: "alert"
}, ro = { class: "transcode__card" }, io = { class: "transcode__body" }, ao = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: n }) {
		let r = n;
		return (n, i) => (W(), F("div", no, [I("div", ro, [
			R(t, {
				name: "alert",
				class: "transcode__icon"
			}),
			i[3] ||= I("h3", { class: "transcode__heading" }, "Can’t play this file here", -1),
			I("p", io, [e.title ? (W(), F(j, { key: 0 }, [L("“" + J(e.title) + "” is", 1)], 64)) : (W(), F(j, { key: 1 }, [L("This title is")], 64)), i[1] ||= L(" in a format your browser can’t play directly (for example MKV or HEVC). Transcoding isn’t available yet. ", -1)]),
			I("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => r("back")
			}, [R(t, { name: "arrow-left" }), i[2] ||= I("span", null, "Go back", -1)])
		])]));
	}
}), [["__scopeId", "data-v-4b751a55"]]), oo = { class: "player__stage" }, so = ["src", "poster"], co = { class: "player__meta" }, lo = { class: "player__meta-text" }, uo = { class: "player__title" }, fo = { class: "player__sub numeric" }, po = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, mo = {
	key: 0,
	class: "player__center"
}, ho = ["aria-label"], go = { class: "player__btnrow" }, _o = ["aria-label"], vo = { class: "player__time numeric" }, yo = ["aria-label", "aria-pressed"], bo = ["aria-label", "aria-pressed"], xo = ["aria-label"], So = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		thumbnailAt: { type: Function },
		qualities: {},
		streamUrlFor: { type: Function }
	},
	emits: [
		"back",
		"captions",
		"theater",
		"pip",
		"play-next"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = wt(), o = $(), s = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], c = G(null), l = G(null), u = G(!0), d = G(!1), f = G(!1), p = G(!1), m = G(!1), h = G(!1), g = G(!1), _ = M(() => m.value ? 1.35 : 1), v = G(Ba(r.streamUrl, r.media.path)), y = G(a.resumePositionFor(r.media.id) ?? 0), b = G(!v.value && y.value > 0), x = null, S = G(!1), C = G(8), w, T = M(() => a.upNext);
		function E() {
			v.value = Ba(r.streamUrl, r.media.path), y.value = a.resumePositionFor(r.media.id) ?? 0, b.value = !v.value && y.value > 0, x = null, A(), S.value = !1;
		}
		function D(e) {
			let t = c.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : x = Math.max(0, e));
		}
		function O() {
			D(y.value), b.value = !1, c.value?.play()?.catch(() => {});
		}
		function k() {
			x = null, D(0), a.clearResume(r.media.id), b.value = !1, c.value?.play()?.catch(() => {});
		}
		function A() {
			w &&= (clearInterval(w), void 0);
		}
		function ee() {
			C.value = 8, A(), w = setInterval(() => {
				--C.value, C.value <= 0 && (A(), ne());
			}, 1e3);
		}
		function te() {
			a.upNext && (S.value = !0, o.autoplay && ee());
		}
		function ne() {
			A(), S.value = !1;
			let e = a.next(r.streamUrlFor);
			e && i("play-next", e);
		}
		function re() {
			A(), S.value = !1;
		}
		function ie() {
			Va(c.value) && (v.value = !0);
		}
		let ae = G([]), oe = G([]), se = G(-1), ce = G(!1), le = a.subtitleLang, ue = M(() => ae.value.some((e) => e.language === a.subtitleLang));
		function de() {
			let e = c.value;
			ae.value = Li(e), oe.value = Ri(e), se.value = Ui(e);
		}
		function fe() {
			if (ue.value) le = a.subtitleLang, a.setSubtitle(null);
			else {
				let e = le && ae.value.some((e) => e.language === le) ? le : ae.value[0]?.language ?? null;
				a.setSubtitle(e);
			}
			i("captions");
		}
		function pe(e) {
			Hi(c.value, e), se.value = e;
		}
		let me = null, z, he = M(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function ge() {
			let e = c.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function V(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function _e() {
			a.play();
		}
		function q() {
			a.pause();
		}
		function ve() {
			let e = c.value;
			e && (a.updateProgress(e.currentTime, e.duration, V(e)), a.setMediaPositionState());
		}
		function ye() {
			let e = c.value;
			e && (e.volume = a.volume, e.muted = a.muted, e.playbackRate = a.rate, x !== null && (e.currentTime = e.duration ? Math.min(e.duration, x) : x, x = null), a.updateProgress(e.currentTime, e.duration, V(e)), a.setMediaPositionState(), de());
		}
		function be() {
			let e = c.value;
			e && a.updateProgress(e.currentTime, e.duration, V(e));
		}
		function xe() {
			let e = c.value;
			e && (Math.abs(e.volume - a.volume) > .001 && a.setVolume(e.volume), e.muted !== a.muted && a.toggleMute());
		}
		function Se() {
			let e = c.value;
			e && e.playbackRate !== a.rate && a.setRate(e.playbackRate);
		}
		function Ce(e) {
			let t = c.value;
			t && a.duration > 0 && (t.currentTime = Math.min(a.duration, Math.max(0, e)));
		}
		function we() {
			f.value = !0, Fe();
		}
		function Te() {
			f.value = !1, Fe();
		}
		function Z(e) {
			let t = s.reduce((e, t, n) => Math.abs(t - a.rate) < Math.abs(s[e] - a.rate) ? n : e, 0), n = s[Math.min(s.length - 1, Math.max(0, t + e))];
			a.setRate(n);
		}
		xi({
			playPause: ge,
			seekBy: (e) => Ce(a.position + e),
			frameStep: (e) => {
				a.playing || Ce(a.position + e / 30);
			},
			volumeBy: (e) => a.setVolume(a.volume + e),
			toggleMute: Q,
			toggleFullscreen: Oe,
			toggleCaptions: fe,
			toggleTheater: Ee,
			togglePip: Ae,
			seekToPercent: (e) => Ce(e * a.duration),
			speedStep: Z,
			toggleHelp: () => {
				p.value = !p.value;
			}
		}, { enabled: () => !p.value && !ce.value });
		function Q() {
			a.toggleMute();
		}
		function Ee() {
			m.value = !m.value, i("theater", m.value);
		}
		X(() => a.muted, (e) => {
			let t = c.value;
			t && t.muted !== e && (t.muted = e);
		}), X(() => a.volume, (e) => {
			let t = c.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), X(() => a.rate, (e) => {
			let t = c.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function Oe() {
			if (typeof document > "u") return;
			let e = l.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function ke() {
			d.value = typeof document < "u" && !!document.fullscreenElement;
		}
		async function Ae() {
			let e = c.value;
			if (typeof document < "u" && e) try {
				document.pictureInPictureElement ? await document.exitPictureInPicture() : typeof e.requestPictureInPicture == "function" && await e.requestPictureInPicture();
			} catch {}
			i("pip");
		}
		function je() {
			h.value = !0;
		}
		function Me() {
			h.value = !1;
		}
		function Ne() {
			z &&= (clearTimeout(z), void 0);
		}
		function Pe() {
			Ne(), !(!a.playing || f.value) && (z = setTimeout(() => {
				a.playing && !f.value && (u.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function Fe() {
			u.value = !0, Pe();
		}
		X(() => a.playing, (e) => {
			e ? (b.value = !1, re(), Pe()) : (Ne(), u.value = !0);
		});
		let Ie = null;
		return U(() => {
			a.setCurrent(r.media, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", ke), g.value = document.pictureInPictureEnabled === !0), Ie = a.bindMediaSession({
				onPlay: () => void c.value?.play()?.catch(() => {}),
				onPause: () => c.value?.pause(),
				onSeek: (e) => Ce(e)
			}), me = c.value?.textTracks ?? null, me?.addEventListener?.("addtrack", de), me?.addEventListener?.("removetrack", de), de();
		}), X(() => r.media, (e) => {
			a.setCurrent(e, {
				resetPosition: !1,
				streamUrl: r.streamUrl
			}), E();
		}), H(() => {
			Ne(), A(), typeof document < "u" && document.removeEventListener("fullscreenchange", ke), Ie?.(), me?.removeEventListener?.("addtrack", de), me?.removeEventListener?.("removetrack", de);
		}), (n, r) => (W(), F("div", {
			ref_key: "containerRef",
			ref: l,
			class: B(["player", {
				"is-chrome-hidden": !u.value,
				"is-theater": m.value
			}]),
			onPointermove: Fe,
			onPointerdown: Fe,
			onFocusin: Fe
		}, [R(Aa, {
			video: c.value,
			enabled: Y(o).atmosphere,
			playing: Y(a).playing,
			"reduced-motion": Y(o).effectiveReducedMotion,
			intensity: _.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), I("div", oo, [
			I("video", {
				ref_key: "videoRef",
				ref: c,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: _e,
				onPause: q,
				onTimeupdate: ve,
				onLoadedmetadata: ye,
				onProgress: be,
				onVolumechange: xe,
				onRatechange: Se,
				onEnded: te,
				onError: ie,
				onEnterpictureinpicture: je,
				onLeavepictureinpicture: Me,
				onClick: ge
			}, null, 40, so),
			r[9] ||= I("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[10] ||= I("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			I("div", co, [I("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: r[0] ||= De((e) => i("back"), ["stop"])
			}, [R(t, { name: "arrow-left" })]), I("div", lo, [
				r[6] ||= I("p", { class: "player__eyebrow" }, "Now playing", -1),
				I("h2", uo, J(e.media.name), 1),
				I("div", fo, [(W(!0), F(j, null, K(he.value, (e, t) => (W(), F(j, { key: t }, [t > 0 && !e.cert ? (W(), F("span", po, "·")) : P("", !0), I("span", { class: B({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			v.value ? P("", !0) : (W(), F("div", mo, [I("button", {
				type: "button",
				class: B(["player__bigplay", { "is-playing": Y(a).playing }]),
				"aria-label": Y(a).playing ? "Pause" : "Play",
				onClick: De(ge, ["stop"])
			}, [R(t, { name: Y(a).playing ? "pause" : "play" }, null, 8, ["name"])], 10, ho)])),
			R(ra, {
				video: c.value,
				language: Y(a).subtitleLang,
				"style-config": Y(o).captionStyle,
				lifted: u.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			v.value ? P("", !0) : (W(), F("div", {
				key: 1,
				class: "player__controls",
				onClick: r[3] ||= De(() => {}, ["stop"])
			}, [R(mi, {
				position: Y(a).position,
				duration: Y(a).duration,
				buffered: Y(a).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: Ce,
				onScrubStart: we,
				onScrubEnd: Te
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), I("div", go, [
				I("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": Y(a).playing ? "Pause" : "Play",
					onClick: ge
				}, [R(t, { name: Y(a).playing ? "pause" : "play" }, null, 8, ["name"])], 8, _o),
				I("span", vo, [
					L(J(Y(li)(Y(a).position)), 1),
					r[7] ||= I("span", { class: "player__sep" }, " / ", -1),
					L(J(Y(li)(Y(a).duration)), 1)
				]),
				r[8] ||= I("span", { class: "player__grow" }, null, -1),
				R(Ai),
				R(ji),
				R(Mi, { qualities: e.qualities }, null, 8, ["qualities"]),
				R(ya, {
					open: ce.value,
					"onUpdate:open": r[1] ||= (e) => ce.value = e,
					tracks: ae.value,
					"audio-tracks": oe.value,
					"active-audio": se.value,
					onSelectAudio: pe
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				I("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => p.value = !0
				}, [R(t, { name: "info" })]),
				g.value ? (W(), F("button", {
					key: 0,
					type: "button",
					class: B(["player__iconbtn", { "is-on": h.value }]),
					"aria-label": h.value ? "Exit picture-in-picture" : "Picture-in-picture",
					"aria-pressed": h.value,
					onClick: Ae
				}, [R(t, { name: "pip" })], 10, yo)) : P("", !0),
				I("button", {
					type: "button",
					class: B(["player__iconbtn", { "is-on": m.value }]),
					"aria-label": m.value ? "Exit theater mode" : "Theater mode",
					"aria-pressed": m.value,
					onClick: Ee
				}, [R(t, { name: "theater" })], 10, bo),
				I("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": d.value ? "Exit fullscreen" : "Fullscreen",
					onClick: Oe
				}, [R(t, { name: d.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, xo)
			])])),
			b.value && !v.value ? (W(), N(Fa, {
				key: 2,
				seconds: y.value,
				onResume: O,
				onRestart: k
			}, null, 8, ["seconds"])) : P("", !0),
			S.value && T.value && !v.value ? (W(), N(to, {
				key: 3,
				media: T.value,
				remaining: C.value,
				total: Y(8),
				counting: Y(o).autoplay,
				onPlayNow: ne,
				onCancel: re
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : P("", !0),
			v.value ? (W(), N(ao, {
				key: 4,
				title: e.media.name,
				onBack: r[4] ||= (e) => i("back")
			}, null, 8, ["title"])) : P("", !0),
			R(Oi, {
				open: p.value,
				onClose: r[5] ||= (e) => p.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-853f8f80"]]), Co = { class: "player-page__stage" }, wo = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, To = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "PlayerPage",
	setup(t) {
		let n = he("apiBase", ""), r = M(() => typeof n == "string" ? n : n?.value ?? ""), a = Fe(), s = Ie(), c = wt(), l = G(null), u = G(""), d = G(!0), p = G(null), m = G(!1), h = M(() => String(a.params.id ?? "")), g = M(() => {
			let e = l.value?.poster_url;
			if (e) return { backgroundImage: `url("${e.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` };
		}), _ = null, v = !1;
		function y(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		function b(e) {
			return `${r.value}/media/${encodeURIComponent(e.id)}/stream`;
		}
		async function x(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				c.setQueue([]);
				return;
			}
			let i = _, a = () => v || i !== _;
			try {
				let o = Jn(r.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				c.setQueue((s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12));
			} catch (e) {
				if (a() || y(e)) return;
				c.setQueue([]);
			}
		}
		async function S() {
			let t = h.value;
			if (_?.abort(), _ = typeof AbortController < "u" ? new AbortController() : null, d.value = !0, p.value = null, c.hideMiniPlayer(), !t) {
				p.value = "No media id provided", d.value = !1;
				return;
			}
			try {
				let n = new e({ baseUrl: r.value }), i = await n.get(`/api/v1/media/${encodeURIComponent(t)}`, void 0, _?.signal);
				if (v) return;
				l.value = i;
				let a = await n.get(`/api/v1/media/${encodeURIComponent(t)}/playback-info`, void 0, _?.signal).catch(() => null);
				if (v) return;
				u.value = a?.url || b(i), d.value = !1, x(n, i);
			} catch (e) {
				if (v || y(e)) return;
				p.value = e instanceof Error ? e.message : "Failed to load media", d.value = !1;
			}
		}
		U(S), X(h, S), Pe(() => {
			c.current && c.streamUrl && c.showMiniPlayer();
		}), H(() => {
			v = !0, _?.abort(), _ = null;
		});
		function C() {
			s?.back();
		}
		function w(e) {
			s?.push({
				name: "player",
				params: { id: e.id }
			}).catch(() => {});
		}
		function T(e) {
			m.value = e;
		}
		return (e, t) => (W(), F("div", { class: B(["player-page", { "is-theater": m.value }]) }, [g.value && !d.value && !p.value ? (W(), F("div", {
			key: 0,
			class: "player-page__ambient",
			style: V(g.value),
			"aria-hidden": "true"
		}, null, 4)) : P("", !0), I("div", Co, [d.value ? (W(), F("div", wo, [R(o, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : p.value ? (W(), N(f, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: p.value
		}, {
			actions: Z(() => [R(i, {
				variant: "solid",
				onClick: S
			}, {
				default: Z(() => [...t[0] ||= [L("Retry", -1)]]),
				_: 1
			}), R(i, {
				variant: "ghost",
				onClick: C
			}, {
				default: Z(() => [...t[1] ||= [L("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : l.value ? (W(), N(So, {
			key: 2,
			media: l.value,
			"stream-url": u.value,
			"stream-url-for": b,
			onBack: C,
			onPlayNext: w,
			onTheater: T
		}, null, 8, ["media", "stream-url"])) : P("", !0)])], 2));
	}
}), [["__scopeId", "data-v-1b6296b1"]]), Eo = ke("auth", () => {
	let t = new c(), n = new e({
		tokenStore: t,
		baseUrl: he("apiBase", "")
	}), r = G(null), i = G(!1), a = G(null), o = G(t.getAccessToken()), s = M(() => o.value !== null), l = M(() => r.value?.is_admin === !0);
	function u(e, n) {
		t.setAccessToken(e), t.setRefreshToken(n), o.value = e;
	}
	async function d(e, t) {
		i.value = !0, a.value = null;
		try {
			let r = await n.post("/api/v1/auth/login", {
				email: e,
				password: t
			});
			return u(r.access_token, r.refresh_token), await p(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			i.value = !1;
		}
	}
	async function f(e, t, r) {
		i.value = !0, a.value = null;
		try {
			let i = await n.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: r
			});
			return u(i.access_token, i.refresh_token), await p(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			i.value = !1;
		}
	}
	async function p() {
		if (s.value) try {
			r.value = await n.getCurrentUser();
		} catch {
			r.value = null, t.clear(), o.value = null;
		}
	}
	function m() {
		t.clear(), o.value = null, r.value = null;
	}
	return {
		user: r,
		loading: i,
		error: a,
		isLoggedIn: s,
		isAdmin: l,
		client: n,
		login: d,
		signup: f,
		fetchUser: p,
		logout: m
	};
}), Do = {
	key: 0,
	class: "form-error"
}, Oo = { class: "field" }, ko = { class: "field" }, Ao = { class: "password-wrapper" }, jo = ["type"], Mo = ["disabled"], No = { class: "form-footer" }, Po = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Eo(), i = Ie(), a = G(""), o = G(""), s = G(!1);
		async function c() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = ve("router-link");
			return W(), F("form", {
				class: "login-form",
				onSubmit: De(c, ["prevent"])
			}, [
				t[7] ||= I("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				Y(r).error ? (W(), F("div", Do, J(Y(r).error), 1)) : P("", !0),
				I("div", Oo, [t[3] ||= I("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Q(I("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[Ce, a.value]])]),
				I("div", ko, [t[4] ||= I("label", {
					for: "password",
					class: "label"
				}, "Password", -1), I("div", Ao, [Q(I("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: s.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, jo), [[Se, o.value]]), I("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => s.value = !s.value
				}, J(s.value ? "🙈" : "👁"), 1)])]),
				I("button", {
					type: "submit",
					class: "submit-btn",
					disabled: Y(r).loading
				}, J(Y(r).loading ? "Signing in..." : "Sign in"), 9, Mo),
				I("p", No, [t[6] ||= L(" Don't have an account? ", -1), R(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: Z(() => [...t[5] ||= [L("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), Fo = { class: "auth-page" }, Io = { class: "auth-card" }, Lo = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (W(), F("div", Fo, [I("div", Io, [R(Po, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), Ro = {
	key: 0,
	class: "form-error"
}, zo = { class: "field" }, Bo = { class: "field" }, Vo = { class: "field" }, Ho = { class: "password-wrapper" }, Uo = ["type"], Wo = { class: "field" }, Go = ["type"], Ko = ["disabled"], qo = { class: "form-footer" }, Jo = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Eo(), i = Ie(), a = G(""), o = G(""), s = G(""), c = G(""), l = G(!1), u = G(null);
		async function d() {
			if (u.value = null, s.value.length < 8) {
				u.value = "Password must be at least 8 characters.";
				return;
			}
			if (s.value !== c.value) {
				u.value = "Passwords do not match.";
				return;
			}
			await r.signup(a.value, o.value, s.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = ve("router-link");
			return W(), F("form", {
				class: "signup-form",
				onSubmit: De(d, ["prevent"])
			}, [
				t[11] ||= I("h2", { class: "form-title" }, "Create your Phlix account", -1),
				Y(r).error || u.value ? (W(), F("div", Ro, J(Y(r).error || u.value), 1)) : P("", !0),
				I("div", zo, [t[5] ||= I("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Q(I("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[Ce, a.value]])]),
				I("div", Bo, [t[6] ||= I("label", {
					for: "username",
					class: "label"
				}, "Username", -1), Q(I("input", {
					id: "username",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: "text",
					class: "input",
					placeholder: "Your username",
					required: "",
					autocomplete: "username",
					minlength: "3"
				}, null, 512), [[Ce, o.value]])]),
				I("div", Vo, [t[7] ||= I("label", {
					for: "password",
					class: "label"
				}, "Password", -1), I("div", Ho, [Q(I("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => s.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, Uo), [[Se, s.value]]), I("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => l.value = !l.value
				}, J(l.value ? "🙈" : "👁"), 1)])]),
				I("div", Wo, [t[8] ||= I("label", {
					for: "confirm",
					class: "label"
				}, "Confirm password", -1), Q(I("input", {
					id: "confirm",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "Repeat your password",
					required: "",
					autocomplete: "new-password"
				}, null, 8, Go), [[Se, c.value]])]),
				I("button", {
					type: "submit",
					class: "submit-btn",
					disabled: Y(r).loading
				}, J(Y(r).loading ? "Creating account..." : "Create account"), 9, Ko),
				I("p", qo, [t[10] ||= L(" Already have an account? ", -1), R(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: Z(() => [...t[9] ||= [L("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), Yo = { class: "auth-page" }, Xo = { class: "auth-card" }, Zo = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (W(), F("div", Yo, [I("div", Xo, [R(Jo, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), Qo = { class: "settings-form" }, $o = {
	key: 0,
	class: "settings-loading"
}, es = {
	key: 1,
	class: "settings-error"
}, ts = { class: "group-title" }, ns = ["for"], rs = { class: "setting-control" }, is = [
	"id",
	"checked",
	"onChange"
], as = [
	"id",
	"value",
	"onChange"
], os = [
	"id",
	"value",
	"onChange"
], ss = { class: "settings-actions" }, cs = {
	key: 0,
	class: "success-msg"
}, ls = ["disabled"], us = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Eo(), a = G({}), o = G(!0), s = G(!1), c = G(null), l = G(null), u = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], d = M(() => n.groups ? u.filter((e) => n.groups.includes(e)) : u);
		async function f() {
			o.value = !0, c.value = null;
			try {
				a.value = await i.client.get("/api/v1/users/me/settings");
			} catch (e) {
				c.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				o.value = !1;
			}
		}
		async function p() {
			s.value = !0, c.value = null, l.value = null;
			try {
				await i.client.put("/api/v1/users/me/settings", a.value), l.value = "Settings saved.", r("saved", a.value), setTimeout(() => {
					l.value = null;
				}, 3e3);
			} catch (e) {
				c.value = e instanceof Error ? e.message : "Failed to save settings";
			} finally {
				s.value = !1;
			}
		}
		function m(e, t) {
			a.value[e] = t;
		}
		U(f);
		let h = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, g = {
			"hwaccel.enabled": {
				label: "Hardware acceleration",
				type: "bool"
			},
			"hwaccel.prefer_hardware": {
				label: "Prefer hardware encoding",
				type: "bool"
			},
			"hwaccel.probe_timeout": {
				label: "HW probe timeout (s)",
				type: "number"
			},
			"tmdb.api_key": {
				label: "TMDB API Key",
				type: "string"
			},
			"marker_detection.similarity_threshold": {
				label: "Intro similarity threshold",
				type: "number"
			},
			"marker_detection.intro_max_duration": {
				label: "Max intro duration (s)",
				type: "number"
			},
			"subtitles.enabled": {
				label: "Enable subtitles",
				type: "bool"
			},
			"subtitles.default_language": {
				label: "Default subtitle language",
				type: "string"
			},
			"subtitles.burn_in_by_default": {
				label: "Burn in subtitles by default",
				type: "bool"
			},
			"discovery.discovery_port": {
				label: "Discovery port",
				type: "number"
			},
			"trickplay.enabled": {
				label: "Enable trickplay",
				type: "bool"
			},
			"trickplay.interval_seconds": {
				label: "Trickplay interval (s)",
				type: "number"
			},
			"newsletter.enabled": {
				label: "Enable newsletter",
				type: "bool"
			},
			"newsletter.send_hour": {
				label: "Newsletter send hour",
				type: "number"
			},
			"port-forward.port_forwarding.upnp_enabled": {
				label: "Enable UPnP",
				type: "bool"
			},
			"trakt.client_id": {
				label: "Trakt client ID",
				type: "string"
			},
			"trakt.client_secret": {
				label: "Trakt client secret",
				type: "string"
			},
			"trakt.redirect_uri": {
				label: "Trakt redirect URI",
				type: "string"
			}
		};
		return (e, t) => (W(), F("div", Qo, [o.value ? (W(), F("div", $o, "Loading settings...")) : c.value ? (W(), F("div", es, J(c.value), 1)) : (W(), F(j, { key: 2 }, [(W(!0), F(j, null, K(d.value, (e) => (W(), F("div", {
			key: e,
			class: "settings-group"
		}, [I("h3", ts, J(h[e]), 1), (W(), F(j, null, K(g, (t, n) => Q(I("div", {
			key: n,
			class: "setting-row"
		}, [I("label", {
			for: n,
			class: "setting-label"
		}, J(t.label), 9, ns), I("div", rs, [t.type === "bool" ? (W(), F("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!a.value[n],
			onChange: (e) => m(n, e.target.checked)
		}, null, 40, is)) : t.type === "number" ? (W(), F("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: a.value[n],
			onChange: (e) => m(n, Number(e.target.value))
		}, null, 40, as)) : (W(), F("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: a.value[n] ?? "",
			onChange: (e) => m(n, e.target.value)
		}, null, 40, os))])]), [[we, n.startsWith(e)]])), 64))]))), 128)), I("div", ss, [l.value ? (W(), F("div", cs, J(l.value), 1)) : P("", !0), I("button", {
			class: "save-btn",
			disabled: s.value,
			onClick: p
		}, J(s.value ? "Saving..." : "Save settings"), 9, ls)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), ds = { class: "settings-page" }, fs = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (W(), F("div", ds, [t[0] ||= I("div", { class: "settings-header" }, [I("h1", { class: "settings-title" }, "Settings")], -1), R(us)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function ps() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function ms(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: Fr
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: ci
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: To
		},
		{
			path: `${t}/login`,
			name: "login",
			component: Lo
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: Zo
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: fs
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: Qt,
		props: { appName: e.app }
	}), n;
}
function hs(e) {
	let t = {
		...ps(),
		...e
	};
	Ut(t.defaultTheme);
	let n = Oe();
	t.defaultTheme && !st() && ($(n).theme = t.defaultTheme);
	let r = Me({
		history: Ne(t.routerBase || "/app"),
		routes: ms(t)
	}), i = me(Yt);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var gs = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, _s = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "AppBackdrop",
	props: {
		enabled: {
			type: Boolean,
			default: !0
		},
		grain: {
			type: Boolean,
			default: !0
		},
		vignette: {
			type: Boolean,
			default: !0
		},
		ambient: {
			type: Boolean,
			default: !1
		},
		ambientColor: {},
		ambientImage: {},
		intensity: { default: 1 }
	},
	setup(e) {
		let t = e, n = G(!1), r = null, i = null, a = () => n.value = !!(r?.matches || i?.matches);
		U(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (r = window.matchMedia("(prefers-reduced-motion: reduce)"), i = window.matchMedia("(prefers-reduced-data: reduce)"), a(), r.addEventListener?.("change", a), i.addEventListener?.("change", a));
		}), H(() => {
			r?.removeEventListener?.("change", a), i?.removeEventListener?.("change", a);
		});
		let o = M(() => t.enabled && !n.value), s = M(() => o.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function c(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let l = M(() => t.ambientImage ? {
			backgroundImage: `url("${c(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), u = M(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, n) => (W(), F(j, null, [
			s.value ? (W(), F("div", {
				key: 0,
				class: B(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: V(l.value),
				"aria-hidden": "true"
			}, null, 6)) : P("", !0),
			o.value && e.vignette ? (W(), F("div", gs)) : P("", !0),
			o.value && e.grain ? (W(), F("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: V(u.value),
				"aria-hidden": "true"
			}, null, 4)) : P("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), vs = ["aria-labelledby"], ys = {
	key: 0,
	class: "phlix-sheet__header"
}, bs = ["id"], xs = { class: "phlix-sheet__body" }, Ss = {
	key: 1,
	class: "phlix-sheet__footer"
}, Cs = /*#__PURE__*/ r(/* @__PURE__ */ z({
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
		let n = e, r = t, i = G(n.modelValue);
		X(() => n.modelValue, (e) => i.value = e);
		let a = G(null), o = xe();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return l(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (W(), N(de, { to: "body" }, [R(fe, { name: `phlix-sheet-${e.side}` }, {
			default: Z(() => [e.modelValue ? (W(), F("div", {
				key: 0,
				class: B(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: De(c, ["self"])
			}, [I("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? Y(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (W(), F("header", ys, [e.title ? (W(), F("h2", {
					key: 0,
					id: Y(o),
					class: "phlix-sheet__title"
				}, J(e.title), 9, bs)) : P("", !0), e.hideClose ? P("", !0) : (W(), N(u, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : P("", !0),
				I("div", xs, [q(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (W(), F("footer", Ss, [q(t.$slots, "footer", {}, void 0, !0)])) : P("", !0)
			], 8, vs)], 34)) : P("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), ws = ["id"], Ts = /*#__PURE__*/ r(/* @__PURE__ */ z({
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
		let t = e, n = xe(), r = G(!1), i = G(null), a;
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
		return H(() => clearTimeout(a)), (t, a) => (W(), F("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: Ee(c, ["esc"])
		}, [q(t.$slots, "default", {}, void 0, !0), R(fe, { name: "phlix-tooltip" }, {
			default: Z(() => [r.value && (e.text || t.$slots.content) ? (W(), F("span", {
				key: 0,
				id: Y(n),
				role: "tooltip",
				class: B(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [q(t.$slots, "content", {}, () => [L(J(e.text), 1)], !0)], 10, ws)) : P("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Es = ["role"], Ds = { class: "phlix-toast__content" }, Os = {
	key: 0,
	class: "phlix-toast__title"
}, ks = { class: "phlix-toast__message" }, As = ["onClick"], js = 0, Ms = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let r = n(), i = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, a = (e) => e.icon ?? i[e.tone];
		return U(() => {
			js++;
		}), H(() => {
			js--;
		}), (n, i) => (W(), N(de, { to: "body" }, [I("div", {
			class: B(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [R(pe, { name: "phlix-toast" }, {
			default: Z(() => [(W(!0), F(j, null, K(Y(r).toasts, (e) => (W(), F("div", {
				key: e.id,
				class: B(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				R(t, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				I("div", Ds, [e.title ? (W(), F("p", Os, J(e.title), 1)) : P("", !0), I("p", ks, J(e.message), 1)]),
				e.action ? (W(), F("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), Y(r).dismiss(e.id);
					}
				}, J(e.action.label), 9, As)) : P("", !0),
				R(u, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => Y(r).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, Es))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), Ns = ["aria-label"], Ps = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let n = e, r = M(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (n, i) => (W(), F("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: V(r.value ? { fontSize: r.value } : void 0)
		}, [R(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Ns));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Fs = { class: "phlix-tabs" }, Is = ["aria-label"], Ls = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], Rs = ["id", "aria-labelledby"], zs = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = xe(), o = G(null), s = M(() => r.tabs.findIndex((e) => e.value === r.modelValue)), c = (e) => `${a}-tab-${e}`, l = (e) => `${a}-panel-${e}`, u = M(() => r.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function d(e) {
			let t = r.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== r.modelValue && i("update:modelValue", e);
		}
		function f(e) {
			o.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function p(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = h(u.value, s.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = h(u.value, s.value, -1);
					break;
				case "Home":
					t = h(u.value, -1, 1);
					break;
				case "End":
					t = h(u.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), d(r.tabs[t].value), f(t));
		}
		return (n, r) => (W(), F("div", Fs, [I("div", {
			ref_key: "listEl",
			ref: o,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: p
		}, [(W(!0), F(j, null, K(e.tabs, (n) => (W(), F("button", {
			id: c(n.value),
			key: n.value,
			type: "button",
			role: "tab",
			class: B(["phlix-tabs__tab", { "is-active": n.value === e.modelValue }]),
			"aria-selected": n.value === e.modelValue,
			"aria-controls": l(n.value),
			tabindex: n.value === e.modelValue ? 0 : -1,
			disabled: n.disabled,
			onClick: (e) => d(n.value)
		}, [n.icon ? (W(), N(t, {
			key: 0,
			name: n.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : P("", !0), L(" " + J(n.label), 1)], 10, Ls))), 128))], 40, Is), e.modelValue ? (W(), F("div", {
			key: 0,
			id: l(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": c(e.modelValue),
			tabindex: "0"
		}, [q(n.$slots, e.modelValue, {}, () => [q(n.$slots, "default", {}, void 0, !0)], !0)], 8, Rs)) : P("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), Bs = /*#__PURE__*/ r(/* @__PURE__ */ z({
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
		let t = e, n = G(null), r = G(!1), i = G(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return U(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), H(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (W(), N(ye(e.tag), {
			ref_key: "el",
			ref: n,
			class: B(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: V({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: Z(() => [q(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Vs = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (W(), N(fe, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: Z(() => [q(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]);
//#endregion
//#region src/app/admin.ts
function Hs(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => import("./DashboardPage-C0fVGeGd.js")
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => import("./UsersPage-CoUJC2yP.js")
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => import("./LogsPage-GydlLn8Z.js")
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => import("./WebhooksPage-Dxra5pj5.js")
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => import("./ServicesPage-RqqEmBah.js")
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => import("./IntegrationsPage-By_R_AGK.js")
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => import("./BackupPage-BJ5FGLHo.js")
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => import("./CastDevicesPage-DkG1B3GQ.js")
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => import("./DlnaServerPage-B1tkDge2.js")
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => import("./RemoteAccessPage-f7Cr2BLv.js")
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => import("./LiveTvPage-D_ZOjq1s.js")
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => import("./CollectionsPage-BxXXeTM-.js")
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => import("./HistoryPage-PwKWCsCA.js")
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => import("./SyncPlayPage-CdLA78na.js")
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => import("./LibrariesPage-DiNEaxCK.js")
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => import("./SettingsPage-WdwvEiqN.js")
		}
	];
}
function Us(e = "/app") {
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
var Ws = { class: "library-scan-page" }, Gs = {
	key: 0,
	class: "loading"
}, Ks = {
	key: 1,
	class: "error"
}, qs = {
	key: 2,
	class: "libraries-list"
}, Js = { class: "library-info" }, Ys = { class: "library-name" }, Xs = { class: "library-type" }, Zs = { class: "library-paths" }, Qs = { class: "library-meta" }, $s = { key: 0 }, ec = {
	key: 0,
	class: "scan-status"
}, tc = { class: "library-actions" }, nc = ["onClick", "disabled"], rc = ["onClick", "disabled"], ic = {
	key: 0,
	class: "empty-state"
}, ac = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "LibraryScanPage",
	setup(e) {
		let t = G([]), n = G({}), r = G(!0), i = G(null);
		async function a() {
			try {
				t.value = (await s.get("/api/v1/libraries")).libraries || [];
				for (let e of t.value) o(e.id);
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load libraries";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				let t = await s.get(`/api/v1/libraries/${e}/scan-status`);
				t.job && (n.value[e] = t.job);
			} catch {}
		}
		async function c(e) {
			try {
				await s.post(`/api/v1/libraries/${e}/scan`), await o(e);
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to trigger scan";
			}
		}
		async function l(e) {
			try {
				await s.post(`/api/v1/libraries/${e}/rescan`), await o(e);
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to trigger rescan";
			}
		}
		function u(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function d(e) {
			if (!e) return "";
			switch (e.status) {
				case "queued": return "⏳ Queued";
				case "running": return "🔄 Running";
				case "completed": return "✅ Completed";
				case "failed": return `❌ Failed: ${e.error || "Unknown error"}`;
				default: return e.status;
			}
		}
		return U(() => {
			a();
		}), (e, a) => (W(), F("div", Ws, [a[0] ||= I("div", { class: "scan-header" }, [I("h1", { class: "scan-title" }, "Library Scanner"), I("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), r.value ? (W(), F("div", Gs, "Loading libraries...")) : i.value ? (W(), F("div", Ks, J(i.value), 1)) : (W(), F("div", qs, [(W(!0), F(j, null, K(t.value, (e) => (W(), F("div", {
			key: e.id,
			class: "library-card"
		}, [I("div", Js, [
			I("h3", Ys, J(e.name), 1),
			I("span", Xs, J(e.type), 1),
			I("p", Zs, J(e.paths.join(", ")), 1),
			I("div", Qs, [e.item_count === void 0 ? P("", !0) : (W(), F("span", $s, J(e.item_count) + " items", 1)), I("span", null, "Last scan: " + J(u(e.last_scan_at)), 1)]),
			n.value[e.id] ? (W(), F("div", ec, J(d(n.value[e.id])), 1)) : P("", !0)
		]), I("div", tc, [I("button", {
			class: "btn btn-scan",
			onClick: (t) => c(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Scan ", 8, nc), I("button", {
			class: "btn btn-rescan",
			onClick: (t) => l(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Rescan ", 8, rc)])]))), 128)), t.value.length === 0 ? (W(), F("div", ic, " No libraries configured. Add a library to get started. ")) : P("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), oc = { class: "my-servers-page" }, sc = {
	key: 0,
	class: "loading"
}, cc = {
	key: 1,
	class: "error"
}, lc = {
	key: 2,
	class: "servers-list"
}, uc = { class: "server-info" }, dc = { class: "server-name" }, fc = { class: "server-url" }, pc = { class: "server-meta" }, mc = { key: 0 }, hc = {
	key: 0,
	class: "empty-state"
}, gc = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "MyServersPage",
	setup(e) {
		let t = G([]), n = G(!0), r = G(null);
		async function i() {
			try {
				t.value = (await s.get("/api/v1/servers")).servers || [];
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to load servers";
			} finally {
				n.value = !1;
			}
		}
		function a(e) {
			switch (e) {
				case "online": return "#22c55e";
				case "offline": return "#ef4444";
				case "connecting": return "#eab308";
				default: return "#6b7280";
			}
		}
		function o(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return U(() => {
			i();
		}), (e, i) => (W(), F("div", oc, [i[2] ||= I("div", { class: "page-header" }, [I("h1", { class: "page-title" }, "My Servers"), I("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), n.value ? (W(), F("div", sc, "Loading servers...")) : r.value ? (W(), F("div", cc, J(r.value), 1)) : (W(), F("div", lc, [(W(!0), F(j, null, K(t.value, (e) => (W(), F("div", {
			key: e.id,
			class: "server-card"
		}, [
			I("div", {
				class: "server-status",
				style: V({ backgroundColor: a(e.status) })
			}, null, 4),
			I("div", uc, [
				I("h3", dc, J(e.name), 1),
				I("p", fc, J(e.url), 1),
				I("div", pc, [
					I("span", null, J(e.owner), 1),
					e.library_count === void 0 ? P("", !0) : (W(), F("span", mc, J(e.library_count) + " libraries", 1)),
					I("span", null, "Last seen: " + J(o(e.last_seen)), 1)
				])
			]),
			i[0] ||= I("div", { class: "server-actions" }, [I("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), t.value.length === 0 ? (W(), F("div", hc, [...i[1] ||= [I("p", null, "No servers connected yet.", -1), I("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : P("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), _c = { class: "federation-page" }, vc = {
	key: 0,
	class: "loading"
}, yc = {
	key: 1,
	class: "error"
}, bc = {
	key: 2,
	class: "federation-content"
}, xc = { class: "peers-section" }, Sc = { class: "peers-list" }, Cc = { class: "peer-info" }, wc = { class: "peer-name" }, Tc = { class: "peer-url" }, Ec = { class: "peer-meta" }, Dc = { key: 0 }, Oc = { class: "peer-actions" }, kc = ["onClick"], Ac = {
	key: 1,
	class: "status-badge"
}, jc = {
	key: 0,
	class: "empty-state"
}, Mc = { class: "add-peer-section" }, Nc = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "FederationPage",
	setup(e) {
		let t = G([]), n = G(!0), r = G(null);
		async function i() {
			try {
				t.value = (await s.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to load federation peers";
			} finally {
				n.value = !1;
			}
		}
		async function a(e) {
			try {
				await s.post("/api/v1/federation/connect", { url: e }), await i();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to connect to peer";
			}
		}
		async function o(e) {
			try {
				await s.post(`/api/v1/federation/peers/${e}/disconnect`), await i();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to disconnect peer";
			}
		}
		function c(e) {
			switch (e) {
				case "connected": return "#22c55e";
				case "disconnected": return "#ef4444";
				case "pending": return "#eab308";
				default: return "#6b7280";
			}
		}
		function l(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return U(() => {
			i();
		}), (e, i) => (W(), F("div", _c, [i[5] ||= I("div", { class: "page-header" }, [I("h1", { class: "page-title" }, "Federation"), I("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), n.value ? (W(), F("div", vc, "Loading federation peers...")) : r.value ? (W(), F("div", yc, J(r.value), 1)) : (W(), F("div", bc, [I("div", xc, [i[2] ||= I("h2", { class: "section-title" }, "Connected Peers", -1), I("div", Sc, [(W(!0), F(j, null, K(t.value, (e) => (W(), F("div", {
			key: e.id,
			class: "peer-card"
		}, [
			I("div", {
				class: "peer-status",
				style: V({ backgroundColor: c(e.status) })
			}, null, 4),
			I("div", Cc, [
				I("h3", wc, J(e.name), 1),
				I("p", Tc, J(e.url), 1),
				I("div", Ec, [e.shared_libraries_count === void 0 ? P("", !0) : (W(), F("span", Dc, J(e.shared_libraries_count) + " shared libraries", 1)), I("span", null, "Last sync: " + J(l(e.last_sync)), 1)])
			]),
			I("div", Oc, [e.status === "connected" ? (W(), F("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => o(e.id)
			}, " Disconnect ", 8, kc)) : e.status === "pending" ? (W(), F("span", Ac, "Pending")) : P("", !0)])
		]))), 128)), t.value.length === 0 ? (W(), F("div", jc, [...i[1] ||= [I("p", null, "No federation peers connected.", -1)]])) : P("", !0)])]), I("div", Mc, [i[4] ||= I("h2", { class: "section-title" }, "Add Peer", -1), I("form", {
			class: "add-peer-form",
			onSubmit: i[0] ||= De((e) => a(""), ["prevent"])
		}, [...i[3] ||= [I("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), I("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), Pc = { class: "manage-shares-page" }, Fc = {
	key: 0,
	class: "loading"
}, Ic = {
	key: 1,
	class: "error"
}, Lc = {
	key: 2,
	class: "shares-list"
}, Rc = { class: "share-info" }, zc = { class: "share-library" }, Bc = { class: "share-meta" }, Vc = {
	key: 0,
	class: "expired-badge"
}, Hc = { class: "share-dates" }, Uc = { key: 0 }, Wc = { class: "share-actions" }, Gc = ["onClick"], Kc = {
	key: 0,
	class: "empty-state"
}, qc = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "ManageSharesPage",
	setup(e) {
		let t = G([]), n = G(!0), r = G(null);
		async function i() {
			try {
				t.value = (await s.get("/api/v1/shares")).shares || [];
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to load shares";
			} finally {
				n.value = !1;
			}
		}
		async function a(e) {
			try {
				await s.delete(`/api/v1/shares/${e}`), await i();
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to revoke share";
			}
		}
		function o(e) {
			return new Date(e).toLocaleString();
		}
		function c(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		return U(() => {
			i();
		}), (e, i) => (W(), F("div", Pc, [i[1] ||= I("div", { class: "page-header" }, [I("h1", { class: "page-title" }, "Manage Shares"), I("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), n.value ? (W(), F("div", Fc, "Loading shares...")) : r.value ? (W(), F("div", Ic, J(r.value), 1)) : (W(), F("div", Lc, [(W(!0), F(j, null, K(t.value, (e) => (W(), F("div", {
			key: e.id,
			class: "share-card"
		}, [I("div", Rc, [
			I("h3", zc, J(e.library_name), 1),
			I("div", Bc, [
				I("span", null, "Shared with: " + J(e.shared_with), 1),
				I("span", { class: B(["permission-badge", e.permissions]) }, J(e.permissions), 3),
				e.expires_at && c(e.expires_at) ? (W(), F("span", Vc, "Expired")) : P("", !0)
			]),
			I("p", Hc, [L(" Created: " + J(o(e.created_at)) + " ", 1), e.expires_at ? (W(), F("span", Uc, " | Expires: " + J(o(e.expires_at)), 1)) : P("", !0)])
		]), I("div", Wc, [I("button", {
			class: "btn btn-danger",
			onClick: (t) => a(e.id)
		}, "Revoke", 8, Gc)])]))), 128)), t.value.length === 0 ? (W(), F("div", Kc, [...i[0] ||= [I("p", null, "No library shares found.", -1)]])) : P("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), Jc = { class: "audit-logs-page" }, Yc = {
	key: 0,
	class: "loading"
}, Xc = {
	key: 1,
	class: "error"
}, Zc = {
	key: 2,
	class: "logs-container"
}, Qc = { class: "logs-list" }, $c = { class: "log-content" }, el = { class: "log-header" }, tl = { class: "log-action" }, nl = { class: "log-actor" }, rl = { class: "log-time" }, il = {
	key: 0,
	class: "log-target"
}, al = {
	key: 1,
	class: "log-details"
}, ol = {
	key: 2,
	class: "log-ip"
}, sl = {
	key: 0,
	class: "empty-state"
}, cl = {
	key: 0,
	class: "pagination"
}, ll = ["disabled"], ul = { class: "page-info" }, dl = ["disabled"], fl = /*#__PURE__*/ r(/* @__PURE__ */ z({
	__name: "AuditLogsPage",
	setup(e) {
		let t = G([]), n = G(!0), r = G(null), i = G(1), a = G(1);
		async function o(e = 1) {
			try {
				n.value = !0;
				let r = await s.get("/api/v1/audit-logs", { page: String(e) });
				t.value = r.logs || [], i.value = r.page || 1, a.value = r.total_pages || 1;
			} catch (e) {
				r.value = e instanceof Error ? e.message : "Failed to load audit logs";
			} finally {
				n.value = !1;
			}
		}
		function c(e) {
			return new Date(e).toLocaleString();
		}
		function l(e) {
			return e.includes("create") || e.includes("add") ? "#22c55e" : e.includes("delete") || e.includes("remove") ? "#ef4444" : e.includes("update") || e.includes("edit") ? "#3b82f6" : e.includes("login") || e.includes("auth") ? "#8b5cf6" : "#6b7280";
		}
		function u(e) {
			return e.includes("create") || e.includes("add") ? "+" : e.includes("delete") || e.includes("remove") ? "-" : e.includes("update") || e.includes("edit") ? "~" : e.includes("login") || e.includes("auth") ? "@" : "#";
		}
		return U(() => {
			o();
		}), (e, s) => (W(), F("div", Jc, [s[3] ||= I("div", { class: "page-header" }, [I("h1", { class: "page-title" }, "Audit Logs"), I("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), n.value ? (W(), F("div", Yc, "Loading audit logs...")) : r.value ? (W(), F("div", Xc, J(r.value), 1)) : (W(), F("div", Zc, [I("div", Qc, [(W(!0), F(j, null, K(t.value, (e) => (W(), F("div", {
			key: e.id,
			class: "log-entry"
		}, [I("div", {
			class: "log-icon",
			style: V({ backgroundColor: l(e.action) })
		}, J(u(e.action)), 5), I("div", $c, [
			I("div", el, [
				I("span", tl, J(e.action), 1),
				I("span", nl, J(e.actor), 1),
				I("span", rl, J(c(e.created_at)), 1)
			]),
			e.target ? (W(), F("p", il, "Target: " + J(e.target), 1)) : P("", !0),
			e.details ? (W(), F("p", al, J(e.details), 1)) : P("", !0),
			e.ip_address ? (W(), F("span", ol, "IP: " + J(e.ip_address), 1)) : P("", !0)
		])]))), 128)), t.value.length === 0 ? (W(), F("div", sl, [...s[2] ||= [I("p", null, "No audit logs found.", -1)]])) : P("", !0)]), a.value > 1 ? (W(), F("div", cl, [
			I("button", {
				class: "btn btn-secondary",
				disabled: i.value <= 1,
				onClick: s[0] ||= (e) => o(i.value - 1)
			}, " Previous ", 8, ll),
			I("span", ul, "Page " + J(i.value) + " of " + J(a.value), 1),
			I("button", {
				class: "btn btn-secondary",
				disabled: i.value >= a.value,
				onClick: s[1] ||= (e) => o(i.value + 1)
			}, " Next ", 8, dl)
		])) : P("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function pl(e, t) {
	let n = nn(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = X(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = X(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
export { S as ALL_LOGS, xa as AMBIENT_SAMPLE_H, Sa as AMBIENT_SAMPLE_INTERVAL_MS, ba as AMBIENT_SAMPLE_W, gi as ARROW_ICONS, _i as ARROW_LABELS, te as AdminBackupApi, y as AdminCastApi, ae as AdminCollectionsApi, C as AdminDashboardApi, ne as AdminDlnaServerApi, oe as AdminHistoryApi, ee as AdminIntegrationsApi, le as AdminLibrariesApi, ie as AdminLiveTvApi, x as AdminLogsApi, re as AdminRemoteAccessApi, A as AdminServicesApi, ue as AdminSettingsApi, se as AdminSyncPlayApi, E as AdminUsersApi, k as AdminWebhooksApi, Aa as AmbientCanvas, e as ApiClient, a as ApiError, _s as AppBackdrop, Ke as AppLayout, fl as AuditLogsPage, _ as Badge, Fr as BrowsePage, i as Button, Qi as CAPTION_BACKGROUND_OPTIONS, Zi as CAPTION_COLOR_OPTIONS, $i as CAPTION_EDGE_OPTIONS, Xi as CAPTION_SIZE_OPTIONS, Yi as CAPTION_SIZE_SCALE, ra as CaptionOverlay, ya as CaptionsMenu, $n as Chip, or as Combobox, vt as CommandPalette, nt as DEFAULT_CAPTION_STYLE, rt as DEFAULT_PREFERENCES, Ia as DIRECT_PLAY_EXTENSIONS, f as EmptyState, Nc as FederationPage, kr as FilterBar, t as Icon, u as IconButton, Ye as Kbd, ce as LIBRARY_TYPES, ac as LibraryScanPage, c as LocalStorageTokenStore, Po as LoginForm, Lo as LoginPage, qc as ManageSharesPage, Dn as MediaCard, ri as MediaDetail, ci as MediaDetailPage, In as MediaGrid, Yn as MediaHomeRow, Kn as MediaRow, Mt as MiniPlayer, d as Modal, gc as MyServersPage, hi as PLAYER_SHORTCUTS, Vs as PageTransition, Yt as PhlixApp, So as Player, To as PlayerPage, Mi as QualityMenu, w as RATING_LABELS, T as RATING_OPTIONS, bt as RESUME_MAX_RATIO, yt as RESUME_MIN_SECONDS, Fa as ResumePrompt, Bs as Reveal, D as SUBSCRIBABLE_EVENTS, mi as Scrubber, g as Select, us as SettingsForm, fs as SettingsPage, Cs as Sheet, Oi as ShortcutsHelp, Jo as SignupForm, Zo as SignupPage, o as Skeleton, v as Slider, ji as SpeedMenu, Ps as Spinner, b as Switch, La as TRANSCODE_EXTENSIONS, zs as Tabs, Ms as ToastHost, Ts as Tooltip, ao as TranscodeNotice, Ha as UPNEXT_COUNTDOWN_SECONDS, Wa as UPNEXT_RING_CIRCUMFERENCE, Ua as UPNEXT_RING_RADIUS, to as UpNext, Ai as VolumeControl, O as WEBHOOK_EVENT_CATEGORIES, Ui as activeAudioIndex, Us as adminMenu, Oa as ambientGradient, Hi as applyAudioTrack, Ut as applyStoredThemeEarly, Vi as applyTrackModes, wa as averageRegion, pl as bindMediaStoreToRouter, Hs as buildAdminRoutes, qn as buildMediaQuery, Jn as buildMediaUrl, na as captionStyleVars, qi as cleanCueText, hs as createPhlixApp, Bt as deriveAccentVars, ta as edgeShadow, za as extensionOf, li as formatTime, Qe as fuzzyScore, bi as handleShortcut, Bi as hasActiveCaptions, st as hasStoredPreferences, ka as isBatterySaving, Va as isFatalMediaError, yi as isTypingTarget, Ri as listAudioTracks, Li as listSubtitleTracks, $e as matchCommand, Ba as needsTranscode, Ji as readActiveCueLines, ot as readStoredPreferences, zi as resolveTextTrack, Ea as rgbString, Da as rgbaString, Ga as ringDashoffset, Ta as sampleAmbient, Eo as useAuthStore, tt as useCommandStore, l as useFocusTrap, xi as useKeyboardShortcuts, nn as useMediaStore, wt as usePlayerStore, $ as usePreferencesStore, Wt as useTheme, n as useToastStore };

//# sourceMappingURL=phlix-ui.js.map