import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c } from "./tokenStore-DCSgJhfA.js";
import { n as l, r as u, t as d } from "./Modal-B6rWnsPN.js";
import { t as f } from "./EmptyState-CWgJPad-.js";
import { i as p, n as m, r as h, t as g } from "./Select-Ckrr6QTP.js";
import { t as _ } from "./Badge-Aa85GIyq.js";
import { t as v } from "./Switch-Zu0bRVD0.js";
import { Fragment as y, Teleport as b, Transition as x, TransitionGroup as S, computed as C, createApp as w, createBlock as T, createCommentVNode as E, createElementBlock as D, createElementVNode as O, createTextVNode as k, createVNode as A, defineComponent as j, inject as ee, nextTick as M, normalizeClass as N, normalizeStyle as P, onBeforeUnmount as F, onMounted as I, openBlock as L, reactive as R, ref as z, renderList as B, renderSlot as V, resolveComponent as te, resolveDynamicComponent as H, toDisplayString as U, toRef as W, unref as G, useId as K, vModelDynamic as ne, vModelText as q, vShow as re, watch as J, watchEffect as Y, withCtx as X, withDirectives as Z, withKeys as ie, withModifiers as ae } from "vue";
import { createPinia as oe, defineStore as Q } from "pinia";
import { RouterLink as se, RouterView as $, createRouter as ce, createWebHistory as le, useRoute as ue, useRouter as de } from "vue-router";
//#region \0rolldown/runtime.js
var fe = Object.defineProperty, pe = (e, t) => {
	let n = {};
	for (var r in e) fe(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || fe(n, Symbol.toStringTag, { value: "Module" }), n;
}, me = {}, he = { class: "app-layout" }, ge = { class: "app-header" }, _e = { class: "header-inner" }, ve = { class: "logo" }, ye = { class: "nav" }, be = { class: "app-main" }, xe = { class: "app-footer" };
function Se(e, t) {
	return L(), D("div", he, [
		O("header", ge, [O("div", _e, [O("div", ve, [V(e.$slots, "logo", {}, () => [t[0] ||= O("span", { class: "logo-text" }, "Phlix", -1)], !0)]), O("nav", ye, [V(e.$slots, "nav", {}, void 0, !0)])])]),
		O("main", be, [V(e.$slots, "default", {}, void 0, !0)]),
		O("footer", xe, [V(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var Ce = /*#__PURE__*/ r(me, [["render", Se], ["__scopeId", "data-v-9f6c6d16"]]), we = { class: "phlix-kbd" }, Te = {
	key: 1,
	class: "phlix-kbd__key"
}, Ee = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = C(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (L(), D("span", we, [n.value.length ? (L(!0), D(y, { key: 0 }, B(n.value, (e, t) => (L(), D("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, U(e), 1))), 128)) : (L(), D("kbd", Te, [V(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), De = "phlix.cmd.recents", Oe = 8;
function ke(e, t) {
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
function Ae(e, t) {
	if (!e.trim()) return 0;
	let n = ke(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, ke(e, n));
	return t.group && (r = Math.max(r, ke(e, t.group))), r;
}
function je() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(De);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, Oe) : [];
	} catch {
		return [];
	}
}
var Me = Q("phlix-commands", () => {
	let e = z(/* @__PURE__ */ new Map()), t = z(!1), n = z(""), r = z(je()), i = C(() => Array.from(e.value.values())), a = C(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: Ae(t, e)
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
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, Oe);
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
	return J(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(De, JSON.stringify(e));
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
}), Ne = {
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
	atmosphere: !0,
	filterPresets: []
};
function Pe(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var Fe = "phlix.prefs";
function Ie() {
	if (typeof localStorage > "u") return { ...Ne };
	try {
		let e = localStorage.getItem(Fe);
		if (!e) return { ...Ne };
		let t = JSON.parse(e);
		return {
			...Ne,
			...t
		};
	} catch {
		return { ...Ne };
	}
}
function Le() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(Fe) !== null;
	} catch {
		return !1;
	}
}
function Re() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var ze = Q("phlix-prefs", () => {
	let e = Ie(), t = z(e.theme), n = z(e.accent), r = z(e.density), i = z(e.cardSize), a = z(e.gridDensity), o = z(e.reducedMotion), s = z(e.autoplay), c = z(e.defaultVolume), l = z(e.defaultQuality), u = z(e.defaultSubtitleLang), d = z(e.atmosphere), f = z(e.filterPresets ? [...e.filterPresets] : []), p = z(Re()), m = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (m = window.matchMedia("(prefers-reduced-motion: reduce)"), m.addEventListener?.("change", (e) => p.value = e.matches));
	let h = C(() => o.value === "on" ? !0 : o.value === "off" ? !1 : p.value);
	function g() {
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
			atmosphere: d.value,
			filterPresets: f.value
		};
	}
	function _(e, t) {
		let n = {
			id: Pe(e),
			name: e.trim(),
			query: t
		}, r = f.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? f.value.splice(r, 1, n) : f.value.push(n), n;
	}
	function v(e) {
		f.value = f.value.filter((t) => t.id !== e);
	}
	J(g, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Fe, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function y() {
		let e = Ne;
		t.value = e.theme, n.value = e.accent, r.value = e.density, i.value = e.cardSize, a.value = e.gridDensity, o.value = e.reducedMotion, s.value = e.autoplay, c.value = e.defaultVolume, l.value = e.defaultQuality, u.value = e.defaultSubtitleLang, d.value = e.atmosphere, f.value = [...e.filterPresets];
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
		atmosphere: d,
		filterPresets: f,
		systemReduced: p,
		effectiveReducedMotion: h,
		snapshot: g,
		saveFilterPreset: _,
		removeFilterPreset: v,
		reset: y
	};
}), Be = { class: "phlix-cmdk__search" }, Ve = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], He = ["id"], Ue = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, We = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], Ge = { class: "phlix-cmdk__option-body" }, Ke = { class: "phlix-cmdk__option-title" }, qe = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, Je = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, Ye = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "CommandPalette",
	setup(e) {
		let n = Me(), r = de(), i = ze(), a = z(null), o = K(), s = z(0);
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
		let d = C(() => {
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
		}), f = C(() => d.value.options.length), p = C(() => f.value ? `${o}-opt-${s.value}` : void 0);
		J(() => n.query, () => {
			s.value = 0;
		}), J(f, (e) => {
			s.value > e - 1 && (s.value = Math.max(0, e - 1));
		}), J(() => n.open, (e) => {
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
		function S() {
			n.closePalette();
		}
		l(a, C(() => n.open), { onEscape: () => (n.closePalette(), !0) });
		function w(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), n.togglePalette());
		}
		let k = ee("phlixCommands", []), j = [
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
		], M = null;
		return I(() => {
			M = n.register([...j, ...k]), document.addEventListener("keydown", w);
		}), F(() => {
			M?.(), document.removeEventListener("keydown", w);
		}), (e, r) => (L(), T(b, { to: "body" }, [A(x, { name: "phlix-cmdk" }, {
			default: X(() => [G(n).open ? (L(), D("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: ae(S, ["self"])
			}, [O("div", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [O("div", Be, [
				A(t, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				O("input", {
					value: G(n).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": G(o),
					"aria-activedescendant": p.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: r[0] ||= (e) => G(n).setQuery(e.target.value),
					onKeydown: v
				}, null, 40, Ve),
				A(Ee, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), O("ul", {
				id: G(o),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(L(!0), D(y, null, B(d.value.rows, (e, n) => (L(), D(y, { key: e.kind === "header" ? `h-${e.label}-${n}` : e.item.id }, [e.kind === "header" ? (L(), D("li", Ue, U(e.label), 1)) : (L(), D("li", {
				key: 1,
				id: `${G(o)}-opt-${e.index}`,
				class: N(["phlix-cmdk__option", { "is-active": e.index === s.value }]),
				role: "option",
				"aria-selected": e.index === s.value,
				onClick: (t) => _(e.item),
				onPointermove: (t) => s.value = e.index
			}, [
				A(t, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				O("span", Ge, [O("span", Ke, U(e.item.title), 1), e.item.subtitle ? (L(), D("span", qe, U(e.item.subtitle), 1)) : E("", !0)]),
				e.item.shortcut ? (L(), T(Ee, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : E("", !0)
			], 42, We))], 64))), 128)), f.value ? E("", !0) : (L(), D("li", Je, " No matching commands "))], 8, He)], 512)], 32)) : E("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]);
//#endregion
//#region src/composables/color.ts
function Xe(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Ze = (e) => Math.max(0, Math.min(255, Math.round(e))), Qe = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Ze(e).toString(16).padStart(2, "0")).join("");
function $e(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function et(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var tt = ({ r: e, g: t, b: n }, r) => `rgba(${Ze(e)}, ${Ze(t)}, ${Ze(n)}, ${r})`;
function nt({ r: e, g: t, b: n }) {
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
function rt(e) {
	let t = Xe(e);
	if (!t) return null;
	let n = nt(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Qe(t),
		"--accent-hover": Qe($e(t, .12)),
		"--accent-active": Qe(et(t, .12)),
		"--accent-soft": tt(t, .14),
		"--accent-ring": tt(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var it = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function at(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? rt(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of it) n.style.removeProperty(e);
}
function ot(e) {
	let t = Ie();
	e && !Le() && (t.theme = e), at(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function st() {
	let e = ze();
	return Y(() => {
		at({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var ct = ["src", "alt"], lt = { class: "brand-wordmark" }, ut = {
	key: 1,
	class: "brand-tagline"
}, dt = { class: "main-nav" }, ft = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "PhlixApp",
	setup(e) {
		st();
		let n = Me(), r = ee("phlixConfig", null), i = C(() => r?.branding ?? {}), a = C(() => i.value.wordmark ?? "Phlix"), o = C(() => r?.menu ?? []), s = C(() => r?.routerBase ?? "/app");
		function c(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, r) => (L(), T(Ce, null, {
			logo: X(() => [A(G(se), {
				to: s.value,
				class: "brand"
			}, {
				default: X(() => [
					i.value.logoSrc ? (L(), D("img", {
						key: 0,
						src: i.value.logoSrc,
						alt: i.value.logoAlt ?? a.value,
						class: "brand-logo"
					}, null, 8, ct)) : E("", !0),
					O("span", lt, U(a.value), 1),
					i.value.tagline ? (L(), D("span", ut, U(i.value.tagline), 1)) : E("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: X(() => [O("nav", dt, [o.value.length ? (L(!0), D(y, { key: 0 }, B(o.value, (e) => (L(), T(H(e.href ? "a" : G(se)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? c(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: X(() => [e.icon ? (L(), T(t, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : E("", !0), k(" " + U(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (L(), D(y, { key: 1 }, [A(G(se), {
				to: s.value,
				class: "nav-link"
			}, {
				default: X(() => [...r[1] ||= [k("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), A(G(se), {
				to: `${s.value}/settings`,
				class: "nav-link"
			}, {
				default: X(() => [...r[2] ||= [k("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64)), A(u, {
				name: "search",
				label: "Open command palette (⌘K)",
				size: "sm",
				class: "nav-cmdk",
				onClick: r[0] ||= (e) => G(n).openPalette()
			})])]),
			default: X(() => [A(G($)), A(Ye)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-78cfb9e9"]]), pt = { class: "phlix-placeholder" }, mt = { class: "placeholder-content" }, ht = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (L(), D("div", pt, [O("div", mt, [n[0] ||= O("h1", null, "Shared UI loading...", -1), O("p", null, "Phlix " + U(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), gt = 6e4, _t = 250;
function vt(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var yt = Q("media", () => {
	let t = z([]), n = z(0), r = z(!1), i = z(null), a = z(""), o = z([]), s = z(void 0), c = z(void 0), l = z([]), u = z([]), d = z("name"), f = z("asc"), p = z(24), m = z(0), h = C(() => t.value.length < n.value), g = C(() => {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = C(() => {
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
	let w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = null, D = null, O;
	function k(e) {
		return !!e && Date.now() - e.ts < gt;
	}
	function A(t, n, r, i) {
		i && (D && r !== E && D.abort(), E = r);
		let a = T.get(r);
		if (a) return i && (D = a.controller), a.promise;
		let o = new AbortController();
		i && (D = o);
		let s = new e({ baseUrl: t }).get(x(t, n), void 0, o.signal).then((e) => (w.set(r, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			T.delete(r);
		});
		return T.set(r, {
			promise: s,
			controller: o
		}), s;
	}
	function j(e, r) {
		t.value = r ? [...t.value, ...e.items] : e.items, n.value = e.total;
	}
	async function ee(e, t = !1) {
		let n = { ...g.value }, a = S(n), o = w.get(a);
		if (k(o)) {
			j(o, t), i.value = null;
			return;
		}
		r.value = !0, i.value = null;
		try {
			let r = await A(e, n, a, !t);
			if (!t && a !== E) return;
			j(r, t);
		} catch (e) {
			if (vt(e)) return;
			(t || a === E) && (i.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === E) && (r.value = !1);
		}
	}
	function M(e, t = _t) {
		m.value = 0, clearTimeout(O), O = setTimeout(() => ee(e, !1), t);
	}
	async function N(e) {
		r.value || !h.value || (m.value = t.value.length, await ee(e, !0));
	}
	async function P(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = S(n);
		if (!k(w.get(r))) try {
			await A(e, n, r, !1);
		} catch {}
	}
	function F() {
		w.clear();
	}
	function I() {
		clearTimeout(O);
	}
	function L() {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function R(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function B(e) {
		a.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = R(e.genres), l.value = R(e.ratings), u.value = R(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = i ?? "asc", m.value = 0;
	}
	function V() {
		t.value = [], n.value = 0, m.value = 0, i.value = null;
	}
	function te(e) {
		a.value = e, m.value = 0;
	}
	function H(e) {
		o.value = e, m.value = 0;
	}
	function U(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function W(e) {
		l.value = e, m.value = 0;
	}
	function G(e) {
		u.value = e, m.value = 0;
	}
	function K(e, t) {
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
		scheduleFetch: M,
		loadMore: N,
		prefetch: P,
		clearCache: F,
		cancelScheduled: I,
		toQuery: L,
		applyQuery: B,
		reset: V,
		setSearch: te,
		setGenres: H,
		setYearRange: U,
		setRatings: W,
		setTypes: G,
		setSort: K
	};
}), bt = 30, xt = .95, St = 5e3, Ct = "phlix.resume";
function wt() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(Ct);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Tt = Q("phlix-player", () => {
	let e = ze(), t = z(null), n = z([]), r = z(!1), i = z(0), a = z(0), o = z(0), s = z(e.defaultVolume), c = z(!1), l = z(1), u = z(e.defaultQuality), d = z(e.defaultSubtitleLang), f = z(!1), p = z(wt()), m = C(() => a.value > 0 ? i.value / a.value : 0), h = C(() => n.value[0] ?? null), g, _ = 0;
	function v(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			_ = Date.now();
			try {
				localStorage.setItem(Ct, JSON.stringify(p.value));
			} catch {}
		}, n = Date.now() - _;
		clearTimeout(g), e || n >= St ? t() : g = setTimeout(t, St - n);
	}
	function y(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function b(e, t, n) {
		y(t, n) ? p.value[e] = Math.floor(t) : delete p.value[e], v();
	}
	function x(e) {
		return e ? p.value[e] ?? null : null;
	}
	function S(e) {
		delete p.value[e], v(!0);
	}
	function w(e, n = {}) {
		t.value = e, n.resetPosition !== !1 && (i.value = 0, a.value = 0, o.value = 0), R(e);
	}
	function T(e, n, r) {
		i.value = e, n !== void 0 && (a.value = n), r !== void 0 && (o.value = r), t.value && b(t.value.id, e, a.value);
	}
	function E() {
		r.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function D() {
		r.value = !1, t.value && b(t.value.id, i.value, a.value), v(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function O(e) {
		s.value = Math.min(1, Math.max(0, e)), s.value > 0 && (c.value = !1);
	}
	function k() {
		c.value = !c.value;
	}
	function A(e) {
		l.value = e;
	}
	function j(e) {
		u.value = e;
	}
	function ee(e) {
		d.value = e;
	}
	function M(e) {
		n.value = [...e];
	}
	function N(e) {
		n.value.push(e);
	}
	function P() {
		let e = n.value.shift() ?? null;
		return e && w(e), e;
	}
	function F() {
		f.value = !0;
	}
	function I() {
		f.value = !1;
	}
	function L() {
		t.value && b(t.value.id, i.value, a.value), v(!0), r.value = !1, f.value = !1, t.value = null;
	}
	function R(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function B(e) {
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
	function V() {
		s.value = e.defaultVolume, u.value = e.defaultQuality, d.value = e.defaultSubtitleLang;
	}
	return {
		current: t,
		queue: n,
		playing: r,
		position: i,
		duration: a,
		buffered: o,
		volume: s,
		muted: c,
		rate: l,
		quality: u,
		subtitleLang: d,
		miniPlayer: f,
		resumeMap: p,
		progress: m,
		upNext: h,
		inResumeBand: y,
		saveResume: b,
		resumePositionFor: x,
		clearResume: S,
		setCurrent: w,
		updateProgress: T,
		play: E,
		pause: D,
		setVolume: O,
		toggleMute: k,
		setRate: A,
		setQuality: j,
		setSubtitle: ee,
		setQueue: M,
		enqueue: N,
		next: P,
		showMiniPlayer: F,
		hideMiniPlayer: I,
		closePlayer: L,
		setMediaSessionMetadata: R,
		bindMediaSession: B,
		seedFromPreferences: V
	};
}), Et = { class: "media-card" }, Dt = { class: "media-card__poster" }, Ot = ["href", "aria-label"], kt = { class: "visually-hidden" }, At = ["src", "alt"], jt = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Mt = { class: "media-card__badges" }, Nt = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Pt = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Ft = ["aria-valuenow", "aria-label"], It = { class: "media-card__overlay" }, Lt = { class: "media-card__title" }, Rt = { class: "media-card__meta" }, zt = {
	key: 0,
	class: "numeric"
}, Bt = {
	key: 1,
	class: "media-card__dot"
}, Vt = {
	key: 2,
	class: "media-card__cert"
}, Ht = {
	key: 3,
	class: "media-card__dot"
}, Ut = {
	key: 4,
	class: "numeric"
}, Wt = {
	key: 0,
	class: "media-card__genres"
}, Gt = { class: "media-card__actions" }, Kt = { class: "media-card__caption" }, qt = ["title"], Jt = { class: "media-card__caption-sub numeric" }, Yt = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = Tt(), o = C(() => r.to ?? `/app/player/${r.item.id}`), s = z(!1), c = z(null);
		function l() {
			s.value = !0;
		}
		I(() => {
			c.value?.complete && (s.value = !0);
		});
		let u = C(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), d = C(() => {
			let e = a.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), f = C(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (L(), D("article", Et, [O("div", Dt, [
			O("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [O("span", kt, U(e.item.name), 1)], 8, Ot),
			e.item.poster_url ? (L(), D("img", {
				key: 0,
				ref_key: "imgEl",
				ref: c,
				class: N(["media-card__img", { "is-loaded": s.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: l
			}, null, 42, At)) : (L(), D("div", jt, [A(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			O("div", Mt, [
				u.value ? (L(), D("span", Nt, "New")) : E("", !0),
				V(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (L(), D("span", Pt, U(e.quality), 1)) : E("", !0)
			]),
			d.value > 0 ? (L(), D("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [O("i", { style: P({ width: `${d.value * 100}%` }) }, null, 4)], 8, Ft)) : E("", !0),
			O("div", It, [
				O("h3", Lt, U(e.item.name), 1),
				O("div", Rt, [
					e.item.year ? (L(), D("span", zt, U(e.item.year), 1)) : E("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (L(), D("span", Bt)) : E("", !0),
					e.item.rating ? (L(), D("span", Vt, U(e.item.rating), 1)) : E("", !0),
					e.item.rating && e.item.runtime ? (L(), D("span", Ht)) : E("", !0),
					e.item.runtime ? (L(), D("span", Ut, U(e.item.runtime) + "m", 1)) : E("", !0)
				]),
				f.value.length ? (L(), D("div", Wt, [(L(!0), D(y, null, B(f.value, (e) => (L(), D("span", { key: e }, U(e), 1))), 128))])) : E("", !0),
				O("div", Gt, [
					O("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= (t) => i("play", e.item)
					}, [A(t, { name: "play" })]),
					O("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: r[1] ||= (t) => i("watchlist", e.item)
					}, [A(t, { name: "bookmark-plus" })]),
					O("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= (t) => i("info", e.item)
					}, [A(t, { name: "info" })]),
					V(n.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), O("div", Kt, [O("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, U(e.item.name), 9, qt), O("div", Jt, [
			e.item.year ? (L(), D(y, { key: 0 }, [k(U(e.item.year), 1)], 64)) : E("", !0),
			e.item.year && e.item.runtime ? (L(), D(y, { key: 1 }, [k(" · ")], 64)) : E("", !0),
			e.item.runtime ? (L(), D(y, { key: 2 }, [k(U(e.item.runtime) + "m", 1)], 64)) : E("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), Xt = 3 / 2;
function Zt(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function Qt(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function $t(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * Xt + t + n;
}
function en(e) {
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
var tn = { class: "media-grid-root" }, nn = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, rn = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, an = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = ze(), o = C(() => r.cardSize ?? a.cardSize ?? 180), s = z(null), c = z(null), l = z(0), u = z(0), d = z(0);
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
		let h = C(() => Zt(l.value, o.value, 20)), g = C(() => $t(Qt(l.value, h.value, 20))), _ = C(() => l.value > 0 && g.value > 0), v = C(() => en({
			scrollTop: d.value,
			viewportHeight: u.value,
			rowHeight: g.value,
			columns: h.value,
			itemCount: r.items.length,
			overscan: r.overscan
		})), b = C(() => {
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
		}), S = C(() => ({ gridTemplateColumns: _.value ? `repeat(${h.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), w = C(() => _.value ? { height: `${v.value.totalHeight}px` } : {}), T = C(() => _.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${v.value.padTop}px)`
		} : {}), j = C(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), ee = C(() => _.value && d.value > u.value * 1.5);
		function N() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let R = null;
		function te() {
			R || typeof IntersectionObserver > "u" || (R = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && r.hasMore && !r.loading && !r.loadingMore && i("load-more");
			}, { rootMargin: "400px 0px" }), c.value && R.observe(c.value));
		}
		function H() {
			R?.disconnect(), R = null;
		}
		J(() => c.value, (e) => {
			H(), e && (te(), m());
		});
		let U = null;
		function W() {
			U || typeof ResizeObserver > "u" || !s.value || (U = new ResizeObserver(m), U.observe(s.value));
		}
		function G() {
			U?.disconnect(), U = null;
		}
		return J(() => s.value, (e) => {
			G(), e && (W(), m());
		}), I(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("resize", m, { passive: !0 })), W(), te();
		}), F(() => {
			typeof window < "u" && (window.removeEventListener("scroll", m), window.removeEventListener("resize", m)), p &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), 0), G(), H();
		}), J(() => r.items.length, () => M(m)), (n, r) => (L(), D("div", tn, [e.loading && e.items.length === 0 ? (L(), D("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: P(j.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(L(!0), D(y, null, B(e.skeletonCount, (e) => (L(), D("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...r[0] ||= [
			O("div", { class: "skel-poster" }, null, -1),
			O("div", { class: "skel-title" }, null, -1),
			O("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (L(), D("div", nn, [V(n.$slots, "empty", {}, () => [
			A(t, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			r[1] ||= O("p", { class: "media-grid-empty__title" }, "No media found", -1),
			r[2] ||= O("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (L(), D(y, { key: 2 }, [
			O("div", {
				ref_key: "sizerEl",
				ref: s,
				class: "media-grid-sizer",
				style: P(w.value)
			}, [O("div", {
				class: "media-grid",
				style: P([S.value, T.value])
			}, [(L(!0), D(y, null, B(b.value, (e) => V(n.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [A(Yt, {
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
			e.loadingMore ? (L(), D("div", rn, [...r[3] ||= [O("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), k(" Loading more… ", -1)]])) : E("", !0),
			e.hasMore && !e.loadingMore ? (L(), D("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: c,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : E("", !0)
		], 64)), A(x, { name: "media-grid-fade" }, {
			default: X(() => [ee.value ? (L(), D("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: N
			}, [A(t, { name: "arrow-up" })])) : E("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), on = ["aria-label"], sn = { class: "media-row__head" }, cn = { class: "media-row__title" }, ln = {
	key: 0,
	class: "media-row__count numeric"
}, un = { class: "media-row__action" }, dn = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, fn = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, pn = { class: "media-row__skel-poster" }, mn = ["aria-label"], hn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let n = e, r = t, i = C(() => !n.loading && !n.error && n.items.length === 0), a = C(() => n.hideWhenEmpty && i.value);
		return (t, n) => a.value ? E("", !0) : (L(), D("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [O("div", sn, [
			O("h2", cn, U(e.title), 1),
			e.count == null ? E("", !0) : (L(), D("span", ln, U(e.count.toLocaleString()), 1)),
			O("div", un, [V(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (L(), D("div", dn, [O("span", null, U(e.error), 1), O("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (L(), D("div", fn, [(L(!0), D(y, null, B(e.skeletonCount, (e) => (L(), D("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [O("div", pn, [A(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), A(o, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : i.value ? (L(), T(f, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: X(() => [V(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (L(), D("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(L(!0), D(y, null, B(e.items, (t) => (L(), D("li", {
			key: t.id,
			class: "media-row__cell"
		}, [A(Yt, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, mn))], 8, on));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function gn(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function _n(e, t = {}) {
	return `${e}/api/v1/media?${gn(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var vn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let i = t, a = r, o = n(), s = z([]), c = z(null), l = z(!1), u = z(null), d = z(!1), f = z(null), p = null, m = null, h = !1;
		function g(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function _() {
			if (!l.value) {
				l.value = !0, u.value = null, m = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let t = new e({ baseUrl: i.apiBase }), n = _n(i.apiBase, {
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
		return I(v), F(() => {
			h = !0, m?.abort(), m = null, p?.disconnect(), p = null;
		}), (e, n) => (L(), D("div", {
			ref_key: "rootEl",
			ref: f
		}, [A(hn, {
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
			action: X(() => [O("button", {
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
}), [["__scopeId", "data-v-fb0faca3"]]), yn = ["disabled", "aria-pressed"], bn = { class: "phlix-chip__label" }, xn = ["disabled", "aria-label"], Sn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		return (n, r) => (L(), D("span", { class: N(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [O("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (L(), T(t, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : E("", !0), O("span", bn, [V(n.$slots, "default", {}, void 0, !0)])], 8, yn), e.removable ? (L(), D("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: r[0] ||= (e) => i("remove")
		}, [A(t, { name: "x" })], 8, xn)) : E("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), Cn = { class: "phlix-combobox__field" }, wn = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], Tn = ["id", "aria-label"], En = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Dn = { class: "phlix-combobox__check" }, On = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, kn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = C(() => p(r.options)), o = K(), s = z(!1), c = z(-1), l = z(""), u = z(!1), d = z(null), f = z(null), g = z(null), _ = C(() => a.value.find((e) => e.value === r.modelValue)?.label ?? ""), v = C(() => {
			if (!u.value || l.value.trim() === "") return a.value;
			let e = l.value.toLowerCase();
			return a.value.filter((t) => t.label.toLowerCase().includes(e));
		}), b = C(() => c.value >= 0 ? `${o}-opt-${c.value}` : void 0);
		J(() => r.modelValue, () => {
			s.value || (l.value = _.value);
		}, { immediate: !0 });
		function x() {
			r.disabled || s.value || (s.value = !0, c.value = v.value.findIndex((e) => e.value === r.modelValue), c.value < 0 && (c.value = v.value.findIndex((e) => !e.disabled)), M(ee));
		}
		function S() {
			l.value = _.value, u.value = !1, s.value = !1;
		}
		function w(e) {
			let t = v.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (i("update:modelValue", t.value), i("change", t.value)), l.value = t.label, u.value = !1, s.value = !1, f.value?.focus());
		}
		function j(e) {
			v.value.length !== 0 && (c.value = h(v.value, c.value, e), M(ee));
		}
		function ee() {
			g.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function P(e) {
			l.value = e.target.value, u.value = !0, s.value = !0, c.value = m(v.value, "first");
		}
		function I(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), s.value ? j(1) : x();
					break;
				case "ArrowUp":
					e.preventDefault(), s.value ? j(-1) : x();
					break;
				case "Enter":
					s.value && c.value >= 0 && (e.preventDefault(), w(c.value));
					break;
				case "Escape":
					s.value && (e.preventDefault(), S());
					break;
				case "Tab":
					s.value && S();
					break;
			}
		}
		function R(e) {
			s.value && d.value && !d.value.contains(e.target) && S();
		}
		return J(s, (e) => {
			e ? document.addEventListener("pointerdown", R, !0) : document.removeEventListener("pointerdown", R, !0);
		}), F(() => document.removeEventListener("pointerdown", R, !0)), (n, r) => (L(), D("div", {
			ref_key: "rootEl",
			ref: d,
			class: N(["phlix-combobox", {
				"is-open": s.value,
				"is-disabled": e.disabled
			}])
		}, [O("div", Cn, [
			A(t, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			O("input", {
				ref_key: "inputEl",
				ref: f,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": s.value,
				"aria-controls": s.value ? `${G(o)}-list` : void 0,
				"aria-activedescendant": s.value ? b.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder,
				disabled: e.disabled,
				value: l.value,
				onInput: P,
				onFocus: x,
				onKeydown: I
			}, null, 40, wn),
			A(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Z(O("ul", {
			id: `${G(o)}-list`,
			ref_key: "listEl",
			ref: g,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(L(!0), D(y, null, B(v.value, (n, r) => (L(), D("li", {
			id: `${G(o)}-opt-${r}`,
			key: n.value,
			class: N(["phlix-combobox__option", {
				"is-active": r === c.value,
				"is-disabled": n.disabled
			}]),
			role: "option",
			"aria-selected": n.value === e.modelValue,
			"aria-disabled": n.disabled || void 0,
			onClick: (e) => w(r),
			onPointermove: (e) => !n.disabled && (c.value = r)
		}, [O("span", Dn, [n.value === e.modelValue ? (L(), T(t, {
			key: 0,
			name: "check"
		})) : E("", !0)]), k(" " + U(n.label), 1)], 42, En))), 128)), v.value.length === 0 ? (L(), D("li", On, "No matches")) : E("", !0)], 8, Tn), [[re, s.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), An = { class: "filterbar__main" }, jn = { class: "filterbar__search" }, Mn = { class: "filterbar__sort" }, Nn = ["aria-label"], Pn = ["aria-expanded"], Fn = { class: "filterbar__advanced" }, In = { class: "filterbar__field" }, Ln = { class: "filterbar__field" }, Rn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, zn = { class: "filterbar__field" }, Bn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Vn = { class: "filterbar__field" }, Hn = { class: "filterbar__years" }, Un = { class: "filterbar__field filterbar__presets" }, Wn = { class: "filterbar__chips" }, Gn = {
	key: 0,
	class: "filterbar__presets-empty"
}, Kn = {
	key: 0,
	class: "filterbar__preset-save"
}, qn = ["onKeydown"], Jn = ["disabled"], Yn = { class: "filterbar__active" }, Xn = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Zn = { class: "filterbar__pills" }, Qn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = yt(), o = ze(), s = [
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
		], c = z(a.search), l;
		J(() => a.search, (e) => {
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
		let f = z(null), p = z(0), m = C(() => a.availableGenres.filter((e) => !a.selectedGenres.includes(e)));
		function h(e) {
			if (e == null || e === "") return;
			let t = String(e);
			a.selectedGenres.includes(t) || (a.setGenres([...a.selectedGenres, t]), i("change")), f.value = null, p.value++;
		}
		function v(e) {
			let t = a.selectedRatings;
			a.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		function b(e) {
			let t = a.selectedTypes;
			a.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		let S = C(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), w = C(() => {
			let e = [];
			for (let t = S.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function j(e) {
			a.setYearRange(e == null || e === "" ? void 0 : Number(e), a.yearTo), i("change");
		}
		function ee(e) {
			a.setYearRange(a.yearFrom, e == null || e === "" ? void 0 : Number(e)), i("change");
		}
		function M(e) {
			a.setSort(e), i("change");
		}
		function P() {
			a.order = a.order === "asc" ? "desc" : "asc", a.offset = 0, i("change");
		}
		let R = C(() => {
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
				remove: () => b(t)
			})), a.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${a.yearFrom}`,
				remove: () => j(null)
			}), a.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${a.yearTo}`,
				remove: () => ee(null)
			}), e;
		}), V = C(() => R.value.length > 0), te = C(() => a.selectedGenres.length + a.selectedRatings.length + a.selectedTypes.length + (a.yearFrom === void 0 ? 0 : 1) + (a.yearTo === void 0 ? 0 : 1));
		function H() {
			c.value = "", a.setSearch(""), a.setGenres([]), a.setRatings([]), a.setTypes([]), a.setYearRange(void 0, void 0), i("change");
		}
		let W = z(!1), K = C(() => o.filterPresets), ne = z(!1), Y = z("");
		function oe() {
			ne.value = !0, Y.value = "";
		}
		function Q() {
			let e = Y.value.trim();
			e && (o.saveFilterPreset(e, a.toQuery()), ne.value = !1, Y.value = "");
		}
		function se(e) {
			a.applyQuery(e.query), c.value = a.search, i("change");
		}
		function $(e) {
			o.removeFilterPreset(e.id);
		}
		let ce = z(!1);
		function le() {
			typeof window > "u" || (ce.value = window.scrollY > 24);
		}
		return I(() => {
			r.sticky && typeof window < "u" && (window.addEventListener("scroll", le, { passive: !0 }), le());
		}), F(() => {
			clearTimeout(l), typeof window < "u" && window.removeEventListener("scroll", le);
		}), (n, r) => (L(), D("div", { class: N(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ce.value
		}]) }, [
			O("div", An, [
				O("label", jn, [
					A(t, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					Z(O("input", {
						"onUpdate:modelValue": r[0] ||= (e) => c.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: u
					}, null, 544), [[q, c.value]]),
					c.value ? (L(), D("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: d
					}, [A(t, { name: "x" })])) : E("", !0)
				]),
				O("div", Mn, [A(g, {
					"model-value": G(a).sort,
					options: s,
					label: "Sort by",
					"onUpdate:modelValue": M
				}, null, 8, ["model-value"]), O("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${G(a).order === "asc" ? "ascending" : "descending"}`,
					onClick: P
				}, [A(t, { name: G(a).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, Nn)]),
				O("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": W.value,
					onClick: r[1] ||= (e) => W.value = !W.value
				}, [
					A(t, { name: "filter" }),
					r[4] ||= O("span", null, "Filters", -1),
					te.value ? (L(), T(_, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: X(() => [k(U(te.value), 1)]),
						_: 1
					})) : E("", !0),
					A(t, {
						name: W.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, Pn)
			]),
			A(x, { name: "filterbar-panel" }, {
				default: X(() => [Z(O("div", Fn, [
					O("div", In, [r[5] ||= O("span", { class: "filterbar__field-label" }, "Genres", -1), (L(), T(kn, {
						key: p.value,
						"model-value": f.value,
						options: m.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": h
					}, null, 8, ["model-value", "options"]))]),
					O("div", Ln, [r[6] ||= O("span", { class: "filterbar__field-label" }, "Rating", -1), O("div", Rn, [(L(!0), D(y, null, B(G(a).availableRatings, (e) => (L(), T(Sn, {
						key: e,
						selected: G(a).selectedRatings.includes(e),
						"onUpdate:selected": (t) => v(e)
					}, {
						default: X(() => [k(U(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					O("div", zn, [r[7] ||= O("span", { class: "filterbar__field-label" }, "Type", -1), O("div", Bn, [(L(!0), D(y, null, B(G(a).availableTypes, (e) => (L(), T(Sn, {
						key: e,
						selected: G(a).selectedTypes.includes(e),
						"onUpdate:selected": (t) => b(e)
					}, {
						default: X(() => [k(U(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					O("div", Vn, [r[9] ||= O("span", { class: "filterbar__field-label" }, "Year", -1), O("div", Hn, [
						A(kn, {
							"model-value": G(a).yearFrom ?? null,
							options: w.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": j
						}, null, 8, ["model-value", "options"]),
						r[8] ||= O("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						A(kn, {
							"model-value": G(a).yearTo ?? null,
							options: w.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": ee
						}, null, 8, ["model-value", "options"])
					])]),
					O("div", Un, [
						r[12] ||= O("span", { class: "filterbar__field-label" }, "Presets", -1),
						O("div", Wn, [(L(!0), D(y, null, B(K.value, (e) => (L(), T(Sn, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => se(e),
							onRemove: (t) => $(e)
						}, {
							default: X(() => [k(U(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), K.value.length ? E("", !0) : (L(), D("span", Gn, "No saved presets"))]),
						ne.value ? (L(), D("div", Kn, [Z(O("input", {
							"onUpdate:modelValue": r[2] ||= (e) => Y.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [ie(ae(Q, ["prevent"]), ["enter"]), r[3] ||= ie((e) => ne.value = !1, ["esc"])]
						}, null, 40, qn), [[q, Y.value]]), O("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Q
						}, [A(t, { name: "check" }), r[10] ||= k(" Save ", -1)])])) : (L(), D("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !V.value,
							onClick: oe
						}, [A(t, { name: "plus" }), r[11] ||= k(" Save current ", -1)], 8, Jn))
					])
				], 512), [[re, W.value]])]),
				_: 1
			}),
			O("div", Yn, [O("span", Xn, [O("b", null, U(G(a).total.toLocaleString()), 1), k(" " + U(G(a).total === 1 ? "title" : "titles"), 1)]), V.value ? (L(), D(y, { key: 0 }, [O("div", Zn, [(L(!0), D(y, null, B(R.value, (e) => (L(), T(Sn, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: X(() => [k(U(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), O("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: H
			}, "Clear all")], 64)) : E("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), $n = { class: "browse-page" }, er = { class: "browse-toolbar" }, tr = { class: "browse-header" }, nr = { class: "browse-count numeric" }, rr = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, ir = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "BrowsePage",
	setup(e) {
		let t = ee("apiBase", ""), r = C(() => typeof t == "string" ? t : t?.value ?? ""), i = ee("phlixConfig", null), a = C(() => i?.homeRows ?? []), o = yt(), s = Tt(), c = n(), l = de(), u = z(null), d = R(/* @__PURE__ */ new Map());
		function f(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		J(() => o.items, (e) => f(e), { immediate: !0 });
		let p = C(() => {
			let e = s.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function m() {
			o.reset(), o.fetchMedia(r.value);
		}
		I(m), J(r, m);
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
		function b(e) {
			c.success(`Added "${e.name}" to your list`);
		}
		function x(e) {
			l?.hasRoute("media") ? _("media", e.id) : c.info(`Details for "${e.name}" are coming soon`);
		}
		function S() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function w(e) {
			o.applyQuery(e.query ?? {}), m(), u.value?.scrollIntoView?.({
				behavior: S() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (e, t) => (L(), D("div", $n, [
			O("div", er, [V(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			p.value.length ? (L(), T(hn, {
				key: 0,
				title: "Continue Watching",
				items: p.value,
				"hide-when-empty": "",
				onPlay: v,
				onWatchlist: b,
				onInfo: x
			}, null, 8, ["items"])) : E("", !0),
			(L(!0), D(y, null, B(a.value, (e) => (L(), T(vn, {
				key: e.id,
				row: e,
				"api-base": r.value,
				onItemsLoaded: f,
				onSeeAll: w,
				onPlay: v,
				onWatchlist: b,
				onInfo: x
			}, null, 8, ["row", "api-base"]))), 128)),
			O("section", {
				ref_key: "gridSection",
				ref: u,
				class: "browse-library"
			}, [
				O("div", tr, [t[0] ||= O("h1", { class: "browse-title" }, "Browse", -1), O("span", nr, U(G(o).total.toLocaleString()) + " titles", 1)]),
				A(Qn, { onChange: h }),
				G(o).error ? (L(), D("div", rr, [O("p", null, U(G(o).error), 1), O("button", {
					type: "button",
					class: "browse-retry",
					onClick: m
				}, "Retry")])) : E("", !0),
				A(an, {
					items: G(o).items,
					loading: G(o).loading && G(o).items.length === 0,
					"loading-more": G(o).loading && G(o).items.length > 0,
					"has-more": G(o).hasMore,
					onLoadMore: g,
					onPlay: v,
					onWatchlist: b,
					onInfo: x
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-214269cb"]]), ar = { class: "media-detail" }, or = { class: "media-detail__bar" }, sr = { class: "media-detail__hero" }, cr = { class: "media-detail__poster" }, lr = ["src", "alt"], ur = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, dr = { class: "media-detail__info" }, fr = { class: "media-detail__title" }, pr = { class: "media-detail__meta numeric" }, mr = {
	key: 0,
	class: "media-detail__meta-item"
}, hr = {
	key: 1,
	class: "media-detail__cert"
}, gr = {
	key: 2,
	class: "media-detail__meta-item"
}, _r = { class: "media-detail__type" }, vr = {
	key: 0,
	class: "media-detail__genres"
}, yr = { class: "media-detail__overview" }, br = { class: "media-detail__actions" }, xr = { class: "media-detail__resume-at numeric" }, Sr = {
	key: 1,
	class: "media-detail__credits"
}, Cr = {
	key: 0,
	class: "media-detail__credit"
}, wr = {
	key: 1,
	class: "media-detail__credit"
}, Tr = { class: "media-detail__cast" }, Er = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, a = n, o = C(() => r.item.type === "audio" ? "music" : r.item.type === "image" ? "image" : r.item.type === "series" ? "tv" : "film"), s = C(() => r.item.actors?.slice(0, 8) ?? []), c = C(() => {
			let e = r.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), l = z(!1), u = z(null);
		function d() {
			l.value = !0;
		}
		return I(() => {
			u.value?.complete && (l.value = !0);
		}), (n, r) => (L(), D("article", ar, [
			e.item.poster_url ? (L(), D("div", {
				key: 0,
				class: "media-detail__ambient",
				style: P({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : E("", !0),
			O("div", or, [e.showBack ? (L(), T(i, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => a("back")
			}, {
				default: X(() => [...r[7] ||= [k("Back", -1)]]),
				_: 1
			})) : E("", !0)]),
			O("div", sr, [O("div", cr, [e.item.poster_url ? (L(), D("img", {
				key: 0,
				ref_key: "imgEl",
				ref: u,
				class: N(["media-detail__img", { "is-loaded": l.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: d
			}, null, 42, lr)) : (L(), D("div", ur, [A(t, { name: o.value }, null, 8, ["name"])]))]), O("div", dr, [
				O("h1", fr, U(e.item.name), 1),
				O("div", pr, [
					e.item.year ? (L(), D("span", mr, [A(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), k(U(e.item.year), 1)])) : E("", !0),
					e.item.rating ? (L(), D("span", hr, U(e.item.rating), 1)) : E("", !0),
					e.item.runtime ? (L(), D("span", gr, U(e.item.runtime) + "m", 1)) : E("", !0),
					O("span", _r, U(e.item.type), 1)
				]),
				e.item.genres?.length ? (L(), D("div", vr, [(L(!0), D(y, null, B(e.item.genres, (e) => (L(), T(Sn, {
					key: e,
					size: "sm"
				}, {
					default: X(() => [k(U(e), 1)]),
					_: 2
				}, 1024))), 128))])) : E("", !0),
				O("p", yr, U(e.item.overview || "No overview available."), 1),
				O("div", br, [
					A(i, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (t) => a("play", e.item)
					}, {
						default: X(() => [...r[8] ||= [k("Play", -1)]]),
						_: 1
					}),
					c.value ? (L(), T(i, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (t) => a("resume", e.item)
					}, {
						default: X(() => [r[9] ||= k(" Resume ", -1), O("span", xr, U(c.value), 1)]),
						_: 1
					})) : E("", !0),
					A(i, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: r[3] ||= (t) => a("watchlist", e.item)
					}, {
						default: X(() => [...r[10] ||= [k("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || s.value.length ? (L(), D("dl", Sr, [e.item.director ? (L(), D("div", Cr, [r[11] ||= O("dt", null, "Director", -1), O("dd", null, U(e.item.director), 1)])) : E("", !0), s.value.length ? (L(), D("div", wr, [r[12] ||= O("dt", null, "Cast", -1), O("dd", Tr, [(L(!0), D(y, null, B(s.value, (e) => (L(), T(Sn, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: X(() => [k(U(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : E("", !0)])) : E("", !0)
			])]),
			e.similarLoading || e.similar.length ? (L(), T(hn, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: r[4] ||= (e) => a("play", e),
				onWatchlist: r[5] ||= (e) => a("watchlist", e),
				onInfo: r[6] ||= (e) => a("info", e)
			}, null, 8, ["items", "loading"])) : E("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), Dr = { class: "media-detail-page" }, Or = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, kr = { class: "media-detail-page__loading-hero" }, Ar = { class: "media-detail-page__loading-info" }, jr = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "MediaDetailPage",
	setup(t) {
		let r = ee("apiBase", ""), a = C(() => typeof r == "string" ? r : r?.value ?? ""), s = ue(), c = de(), l = Tt(), u = n(), d = z(null), p = z([]), m = z(!0), h = z(!1), g = z(null), _ = C(() => String(s.params.id ?? "")), v = C(() => l.resumePositionFor(_.value)), y = null, b = !1;
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
				let o = _n(a.value, {
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
		async function w() {
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
		I(w), J(_, w), F(() => {
			b = !0, y?.abort(), y = null;
		});
		function j(e, t) {
			c?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function M(e) {
			j("player", e.id);
		}
		function N(e) {
			u.success(`Added "${e.name}" to your list`);
		}
		function P(e) {
			j("media", e.id);
		}
		function R() {
			c?.back();
		}
		return (e, t) => (L(), D("div", Dr, [m.value ? (L(), D("div", Or, [O("div", kr, [A(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), O("div", Ar, [
			A(o, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			A(o, {
				variant: "text",
				lines: 4
			}),
			A(o, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : g.value ? (L(), T(f, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: g.value
		}, {
			actions: X(() => [A(i, {
				variant: "solid",
				onClick: w
			}, {
				default: X(() => [...t[0] ||= [k("Retry", -1)]]),
				_: 1
			}), A(i, {
				variant: "ghost",
				onClick: R
			}, {
				default: X(() => [...t[1] ||= [k("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : d.value ? (L(), T(Er, {
			key: 2,
			item: d.value,
			"resume-seconds": v.value,
			similar: p.value,
			"similar-loading": h.value,
			onPlay: M,
			onResume: M,
			onWatchlist: N,
			onInfo: P,
			onBack: R
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : E("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]);
//#endregion
//#region src/components/player/format-time.ts
function Mr(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Nr = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], Pr = { class: "scrubber__track" }, Fr = ["title"], Ir = { class: "scrubber__time numeric" }, Lr = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = z(null), o = z(!1), s = z(!1), c = z(0), l = z(0), u = (e) => Math.min(1, Math.max(0, e)), d = C(() => o.value ? c.value : r.duration > 0 ? u(r.position / r.duration) : 0), f = C(() => r.duration > 0 ? u(r.buffered / r.duration) : 0), p = C(() => (o.value || s.value) && r.duration > 0), m = C(() => o.value ? c.value : l.value), h = C(() => m.value * r.duration), g = C(() => p.value ? r.thumbnailAt?.(h.value) ?? null : null), _ = C(() => g.value ? `url("${g.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), v = C(() => `${Math.min(96, Math.max(4, m.value * 100))}%`), b = C(() => r.duration > 0 ? r.chapters.filter((e) => e.start > 0 && e.start < r.duration).map((e) => ({
			...e,
			ratio: e.start / r.duration
		})) : []);
		function x(e) {
			let t = a.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : u((e.clientX - n.left) / n.width);
		}
		function S(e) {
			if (r.duration <= 0) return;
			o.value = !0;
			try {
				a.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = x(e);
			c.value = t, i("scrub-start"), i("seek", t * r.duration), e.preventDefault();
		}
		function w(e) {
			let t = x(e);
			l.value = t, o.value && (c.value = t, i("seek", t * r.duration));
		}
		function T(e) {
			if (o.value) {
				o.value = !1;
				try {
					a.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				i("scrub-end");
			}
		}
		function k() {
			s.value = !0;
		}
		function A() {
			s.value = !1;
		}
		function j(e) {
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
		}), (t, n) => (L(), D("div", {
			ref_key: "trackEl",
			ref: a,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": G(Mr)(e.position),
			"aria-label": "Seek",
			onPointerdown: S,
			onPointermove: w,
			onPointerup: T,
			onPointercancel: T,
			onPointerenter: k,
			onPointerleave: A,
			onKeydown: j
		}, [O("div", Pr, [
			O("div", {
				class: "scrubber__buffered",
				style: P({ width: `${f.value * 100}%` })
			}, null, 4),
			O("div", {
				class: "scrubber__played",
				style: P({ width: `${d.value * 100}%` })
			}, null, 4),
			(L(!0), D(y, null, B(b.value, (e, t) => (L(), D("span", {
				key: t,
				class: "scrubber__tick",
				style: P({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Fr))), 128)),
			O("div", {
				class: N(["scrubber__head", { "is-dragging": o.value }]),
				style: P({ left: `${d.value * 100}%` })
			}, null, 6)
		]), p.value ? (L(), D("div", {
			key: 0,
			class: "scrubber__preview",
			style: P({ left: v.value }),
			"aria-hidden": "true"
		}, [g.value ? (L(), D("div", {
			key: 0,
			class: "scrubber__thumb",
			style: P({ backgroundImage: _.value })
		}, null, 4)) : E("", !0), O("span", Ir, U(G(Mr)(h.value)), 1)], 4)) : E("", !0)], 40, Nr));
	}
}), [["__scopeId", "data-v-b2711211"]]), Rr = [
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
], zr = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Br = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Vr(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Hr(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Ur(e, t) {
	switch (e.key) {
		case " ": return Vr(e.target) ? !1 : (t.playPause(), !0);
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
function Wr(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Hr(n.target) || Ur(n, e) && n.preventDefault();
	}
	I(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), F(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Gr = { class: "shortcuts__head" }, Kr = { class: "shortcuts__grid" }, qr = { class: "shortcuts__keys" }, Jr = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Yr = {
	key: 1,
	class: "shortcuts__key"
}, Xr = { class: "shortcuts__label" }, Zr = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Rr }
	},
	emits: ["close"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = z(null);
		return l(a, W(r, "open"), {
			lockScroll: !1,
			onEscape: () => (i("close"), !0)
		}), (n, r) => e.open ? (L(), D("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= ae((e) => i("close"), ["self"])
		}, [O("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [O("div", Gr, [r[2] ||= O("h3", { class: "shortcuts__title" }, "Keyboard", -1), A(u, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: r[0] ||= (e) => i("close")
		})]), O("ul", Kr, [(L(!0), D(y, null, B(e.shortcuts, (e) => (L(), D("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [O("span", qr, [(L(!0), D(y, null, B(e.keys, (e, n) => (L(), D(y, { key: n }, [e === "–" ? (L(), D("span", Jr, "–")) : (L(), D("kbd", Yr, [G(zr)[e] ? (L(), T(t, {
			key: 0,
			name: G(zr)[e],
			label: G(Br)[e] ?? e
		}, null, 8, ["name", "label"])) : (L(), D(y, { key: 1 }, [k(U(e), 1)], 64))]))], 64))), 128))]), O("span", Xr, U(e.label), 1)]))), 128))])], 512)])) : E("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), Qr = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], $r = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Slider",
	props: {
		modelValue: {},
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		label: {},
		formatValue: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = z(null), a = z(!1), o = C(() => {
			let e = n.max - n.min || 1;
			return Math.min(100, Math.max(0, (n.modelValue - n.min) / e * 100));
		}), s = C(() => n.formatValue ? n.formatValue(n.modelValue) : String(n.modelValue));
		function c(e) {
			let t = Math.min(n.max, Math.max(n.min, e)), r = Math.round((t - n.min) / n.step), i = n.min + r * n.step;
			return Math.round(i * 1e6) / 1e6;
		}
		function l(e, t = !1) {
			let i = c(e);
			i !== n.modelValue && (r("update:modelValue", i), t && r("change", i));
		}
		function u(e) {
			let t = i.value;
			if (!t) return n.modelValue;
			let r = t.getBoundingClientRect(), a = r.width ? (e - r.left) / r.width : 0;
			return n.min + a * (n.max - n.min);
		}
		function d(e) {
			n.disabled || (e.currentTarget.setPointerCapture?.(e.pointerId), a.value = !0, l(u(e.clientX)));
		}
		function f(e) {
			a.value && l(u(e.clientX));
		}
		function p(e) {
			a.value && (a.value = !1, e.currentTarget.releasePointerCapture?.(e.pointerId), r("change", n.modelValue));
		}
		function m(e) {
			if (n.disabled) return;
			let t = (n.max - n.min) / 10, r = !0;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowUp":
					l(n.modelValue + n.step, !0);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					l(n.modelValue - n.step, !0);
					break;
				case "PageUp":
					l(n.modelValue + t, !0);
					break;
				case "PageDown":
					l(n.modelValue - t, !0);
					break;
				case "Home":
					l(n.min, !0);
					break;
				case "End":
					l(n.max, !0);
					break;
				default: r = !1;
			}
			r && e.preventDefault();
		}
		return (t, n) => (L(), D("div", {
			class: N(["phlix-slider", { "is-disabled": e.disabled }]),
			role: "slider",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": e.modelValue,
			"aria-valuetext": s.value,
			"aria-disabled": e.disabled || void 0,
			"aria-orientation": "horizontal",
			onKeydown: m
		}, [O("div", {
			ref_key: "trackEl",
			ref: i,
			class: "phlix-slider__track",
			onPointerdown: d,
			onPointermove: f,
			onPointerup: p
		}, [O("div", {
			class: "phlix-slider__fill",
			style: P({ width: o.value + "%" })
		}, null, 4), O("div", {
			class: "phlix-slider__thumb",
			style: P({ left: o.value + "%" })
		}, null, 4)], 544)], 42, Qr));
	}
}), [["__scopeId", "data-v-9ca92975"]]), ei = { class: "volume" }, ti = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "VolumeControl",
	setup(e) {
		let t = Tt(), n = ze(), r = C(() => t.muted ? 0 : t.volume), i = C(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return J(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (L(), D("div", ei, [A(u, {
			name: i.value,
			label: G(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => G(t).toggleMute()
		}, null, 8, ["name", "label"]), A($r, {
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
}), [["__scopeId", "data-v-2768c5e3"]]), ni = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		], n = Tt(), r = C(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (L(), T(g, {
			class: "speed-menu",
			"model-value": G(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), ri = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = Tt(), r = ze(), i = C(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (L(), T(g, {
			key: 0,
			class: "quality-menu",
			"model-value": G(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"])) : E("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]), ii = ["src", "poster"], ai = { class: "player__meta" }, oi = { class: "player__meta-text" }, si = { class: "player__title" }, ci = { class: "player__sub numeric" }, li = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, ui = { class: "player__center" }, di = ["aria-label"], fi = { class: "player__btnrow" }, pi = ["aria-label"], mi = { class: "player__time numeric" }, hi = ["aria-label"], gi = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		thumbnailAt: { type: Function },
		qualities: {}
	},
	emits: [
		"back",
		"captions",
		"theater",
		"pip"
	],
	setup(e, { emit: n }) {
		let r = e, i = n, a = Tt(), o = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], s = z(null), c = z(null), l = z(!0), u = z(!1), d = z(!1), f = z(!1), p, m = C(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function h() {
			let e = s.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function g(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function _() {
			a.play();
		}
		function v() {
			a.pause();
		}
		function b() {
			let e = s.value;
			e && a.updateProgress(e.currentTime, e.duration, g(e));
		}
		function x() {
			let e = s.value;
			e && (e.volume = a.volume, e.muted = a.muted, e.playbackRate = a.rate, a.updateProgress(e.currentTime, e.duration, g(e)));
		}
		function S() {
			let e = s.value;
			e && a.updateProgress(e.currentTime, e.duration, g(e));
		}
		function w() {
			let e = s.value;
			e && (Math.abs(e.volume - a.volume) > .001 && a.setVolume(e.volume), e.muted !== a.muted && a.toggleMute());
		}
		function T() {
			let e = s.value;
			e && e.playbackRate !== a.rate && a.setRate(e.playbackRate);
		}
		function j(e) {
			let t = s.value;
			t && a.duration > 0 && (t.currentTime = Math.min(a.duration, Math.max(0, e)));
		}
		function ee() {
			d.value = !0, K();
		}
		function M() {
			d.value = !1, K();
		}
		function P(e) {
			let t = o.reduce((e, t, n) => Math.abs(t - a.rate) < Math.abs(o[e] - a.rate) ? n : e, 0), n = o[Math.min(o.length - 1, Math.max(0, t + e))];
			a.setRate(n);
		}
		Wr({
			playPause: h,
			seekBy: (e) => j(a.position + e),
			frameStep: (e) => {
				a.playing || j(a.position + e / 30);
			},
			volumeBy: (e) => a.setVolume(a.volume + e),
			toggleMute: R,
			toggleFullscreen: V,
			toggleCaptions: () => i("captions"),
			toggleTheater: () => i("theater"),
			togglePip: () => i("pip"),
			seekToPercent: (e) => j(e * a.duration),
			speedStep: P,
			toggleHelp: () => {
				f.value = !f.value;
			}
		}, { enabled: () => !f.value });
		function R() {
			a.toggleMute();
		}
		J(() => a.muted, (e) => {
			let t = s.value;
			t && t.muted !== e && (t.muted = e);
		}), J(() => a.volume, (e) => {
			let t = s.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), J(() => a.rate, (e) => {
			let t = s.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function V() {
			if (typeof document > "u") return;
			let e = c.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function te() {
			u.value = typeof document < "u" && !!document.fullscreenElement;
		}
		function H() {
			p &&= (clearTimeout(p), void 0);
		}
		function W() {
			H(), !(!a.playing || d.value) && (p = setTimeout(() => {
				a.playing && !d.value && (l.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function K() {
			l.value = !0, W();
		}
		return J(() => a.playing, (e) => {
			e ? W() : (H(), l.value = !0);
		}), I(() => {
			a.setCurrent(r.media, { resetPosition: !1 }), typeof document < "u" && document.addEventListener("fullscreenchange", te);
		}), J(() => r.media, (e) => a.setCurrent(e, { resetPosition: !1 })), F(() => {
			H(), typeof document < "u" && document.removeEventListener("fullscreenchange", te);
		}), (n, r) => (L(), D("div", {
			ref_key: "containerRef",
			ref: c,
			class: N(["player", { "is-chrome-hidden": !l.value }]),
			onPointermove: K,
			onPointerdown: K,
			onFocusin: K
		}, [
			O("video", {
				ref_key: "videoRef",
				ref: s,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: _,
				onPause: v,
				onTimeupdate: b,
				onLoadedmetadata: x,
				onProgress: S,
				onVolumechange: w,
				onRatechange: T,
				onClick: h
			}, null, 40, ii),
			r[7] ||= O("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[8] ||= O("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			O("div", ai, [O("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: r[0] ||= ae((e) => i("back"), ["stop"])
			}, [A(t, { name: "arrow-left" })]), O("div", oi, [
				r[4] ||= O("p", { class: "player__eyebrow" }, "Now playing", -1),
				O("h2", si, U(e.media.name), 1),
				O("div", ci, [(L(!0), D(y, null, B(m.value, (e, t) => (L(), D(y, { key: t }, [t > 0 && !e.cert ? (L(), D("span", li, "·")) : E("", !0), O("span", { class: N({ player__cert: e.cert }) }, U(e.text), 3)], 64))), 128))])
			])]),
			O("div", ui, [O("button", {
				type: "button",
				class: N(["player__bigplay", { "is-playing": G(a).playing }]),
				"aria-label": G(a).playing ? "Pause" : "Play",
				onClick: ae(h, ["stop"])
			}, [A(t, { name: G(a).playing ? "pause" : "play" }, null, 8, ["name"])], 10, di)]),
			O("div", {
				class: "player__controls",
				onClick: r[2] ||= ae(() => {}, ["stop"])
			}, [A(Lr, {
				position: G(a).position,
				duration: G(a).duration,
				buffered: G(a).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: j,
				onScrubStart: ee,
				onScrubEnd: M
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), O("div", fi, [
				O("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": G(a).playing ? "Pause" : "Play",
					onClick: h
				}, [A(t, { name: G(a).playing ? "pause" : "play" }, null, 8, ["name"])], 8, pi),
				O("span", mi, [
					k(U(G(Mr)(G(a).position)), 1),
					r[5] ||= O("span", { class: "player__sep" }, " / ", -1),
					k(U(G(Mr)(G(a).duration)), 1)
				]),
				r[6] ||= O("span", { class: "player__grow" }, null, -1),
				A(ti),
				A(ni),
				A(ri, { qualities: e.qualities }, null, 8, ["qualities"]),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: r[1] ||= (e) => f.value = !0
				}, [A(t, { name: "info" })]),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": u.value ? "Exit fullscreen" : "Fullscreen",
					onClick: V
				}, [A(t, { name: u.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, hi)
			])]),
			A(Zr, {
				open: f.value,
				onClose: r[3] ||= (e) => f.value = !1
			}, null, 8, ["open"])
		], 34));
	}
}), [["__scopeId", "data-v-a83f0d9d"]]), _i = { class: "player-page" }, vi = {
	key: 0,
	class: "player-loading"
}, yi = {
	key: 1,
	class: "player-error"
}, bi = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "PlayerPage",
	setup(t) {
		let n = ee("apiBase", C(() => "")), r = ue(), i = z(null), a = z(""), o = z(!0), s = z(null);
		async function c() {
			let t = r.params.id;
			if (!t) {
				s.value = "No media ID provided", o.value = !1;
				return;
			}
			try {
				let r = new e({ baseUrl: n.value }), [o, s] = await Promise.all([r.get(`/api/v1/media/${t}`), r.get(`/api/v1/media/${t}/playback-info`).catch(() => null)]);
				i.value = o, s?.url ? a.value = s.url : a.value = `${n.value}/media/${t}/stream`;
			} catch (e) {
				s.value = e instanceof Error ? e.message : "Failed to load media";
			} finally {
				o.value = !1;
			}
		}
		return I(c), (e, t) => (L(), D("div", _i, [o.value ? (L(), D("div", vi, "Loading...")) : s.value ? (L(), D("div", yi, [O("p", null, U(s.value), 1), O("button", {
			class: "retry-btn",
			onClick: c
		}, "Retry")])) : i.value ? (L(), T(gi, {
			key: 2,
			media: i.value,
			"stream-url": a.value
		}, null, 8, ["media", "stream-url"])) : E("", !0)]));
	}
}), [["__scopeId", "data-v-d9061b47"]]), xi = Q("auth", () => {
	let t = new c(), n = new e({
		tokenStore: t,
		baseUrl: ee("apiBase", "")
	}), r = z(null), i = z(!1), a = z(null), o = z(t.getAccessToken()), s = C(() => o.value !== null), l = C(() => r.value?.is_admin === !0);
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
}), Si = {
	key: 0,
	class: "form-error"
}, Ci = { class: "field" }, wi = { class: "field" }, Ti = { class: "password-wrapper" }, Ei = ["type"], Di = ["disabled"], Oi = { class: "form-footer" }, ki = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = xi(), i = de(), a = z(""), o = z(""), s = z(!1);
		async function c() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = te("router-link");
			return L(), D("form", {
				class: "login-form",
				onSubmit: ae(c, ["prevent"])
			}, [
				t[7] ||= O("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				G(r).error ? (L(), D("div", Si, U(G(r).error), 1)) : E("", !0),
				O("div", Ci, [t[3] ||= O("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Z(O("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[q, a.value]])]),
				O("div", wi, [t[4] ||= O("label", {
					for: "password",
					class: "label"
				}, "Password", -1), O("div", Ti, [Z(O("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: s.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, Ei), [[ne, o.value]]), O("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => s.value = !s.value
				}, U(s.value ? "🙈" : "👁"), 1)])]),
				O("button", {
					type: "submit",
					class: "submit-btn",
					disabled: G(r).loading
				}, U(G(r).loading ? "Signing in..." : "Sign in"), 9, Di),
				O("p", Oi, [t[6] ||= k(" Don't have an account? ", -1), A(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: X(() => [...t[5] ||= [k("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), Ai = { class: "auth-page" }, ji = { class: "auth-card" }, Mi = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (L(), D("div", Ai, [O("div", ji, [A(ki, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), Ni = {
	key: 0,
	class: "form-error"
}, Pi = { class: "field" }, Fi = { class: "field" }, Ii = { class: "field" }, Li = { class: "password-wrapper" }, Ri = ["type"], zi = { class: "field" }, Bi = ["type"], Vi = ["disabled"], Hi = { class: "form-footer" }, Ui = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = xi(), i = de(), a = z(""), o = z(""), s = z(""), c = z(""), l = z(!1), u = z(null);
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
			let n = te("router-link");
			return L(), D("form", {
				class: "signup-form",
				onSubmit: ae(d, ["prevent"])
			}, [
				t[11] ||= O("h2", { class: "form-title" }, "Create your Phlix account", -1),
				G(r).error || u.value ? (L(), D("div", Ni, U(G(r).error || u.value), 1)) : E("", !0),
				O("div", Pi, [t[5] ||= O("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Z(O("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[q, a.value]])]),
				O("div", Fi, [t[6] ||= O("label", {
					for: "username",
					class: "label"
				}, "Username", -1), Z(O("input", {
					id: "username",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: "text",
					class: "input",
					placeholder: "Your username",
					required: "",
					autocomplete: "username",
					minlength: "3"
				}, null, 512), [[q, o.value]])]),
				O("div", Ii, [t[7] ||= O("label", {
					for: "password",
					class: "label"
				}, "Password", -1), O("div", Li, [Z(O("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => s.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, Ri), [[ne, s.value]]), O("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => l.value = !l.value
				}, U(l.value ? "🙈" : "👁"), 1)])]),
				O("div", zi, [t[8] ||= O("label", {
					for: "confirm",
					class: "label"
				}, "Confirm password", -1), Z(O("input", {
					id: "confirm",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "Repeat your password",
					required: "",
					autocomplete: "new-password"
				}, null, 8, Bi), [[ne, c.value]])]),
				O("button", {
					type: "submit",
					class: "submit-btn",
					disabled: G(r).loading
				}, U(G(r).loading ? "Creating account..." : "Create account"), 9, Vi),
				O("p", Hi, [t[10] ||= k(" Already have an account? ", -1), A(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: X(() => [...t[9] ||= [k("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), Wi = { class: "auth-page" }, Gi = { class: "auth-card" }, Ki = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (L(), D("div", Wi, [O("div", Gi, [A(Ui, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), qi = { class: "settings-form" }, Ji = {
	key: 0,
	class: "settings-loading"
}, Yi = {
	key: 1,
	class: "settings-error"
}, Xi = { class: "group-title" }, Zi = ["for"], Qi = { class: "setting-control" }, $i = [
	"id",
	"checked",
	"onChange"
], ea = [
	"id",
	"value",
	"onChange"
], ta = [
	"id",
	"value",
	"onChange"
], na = { class: "settings-actions" }, ra = {
	key: 0,
	class: "success-msg"
}, ia = ["disabled"], aa = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = xi(), a = z({}), o = z(!0), s = z(!1), c = z(null), l = z(null), u = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], d = C(() => n.groups ? u.filter((e) => n.groups.includes(e)) : u);
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
		I(f);
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
		return (e, t) => (L(), D("div", qi, [o.value ? (L(), D("div", Ji, "Loading settings...")) : c.value ? (L(), D("div", Yi, U(c.value), 1)) : (L(), D(y, { key: 2 }, [(L(!0), D(y, null, B(d.value, (e) => (L(), D("div", {
			key: e,
			class: "settings-group"
		}, [O("h3", Xi, U(h[e]), 1), (L(), D(y, null, B(g, (t, n) => Z(O("div", {
			key: n,
			class: "setting-row"
		}, [O("label", {
			for: n,
			class: "setting-label"
		}, U(t.label), 9, Zi), O("div", Qi, [t.type === "bool" ? (L(), D("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!a.value[n],
			onChange: (e) => m(n, e.target.checked)
		}, null, 40, $i)) : t.type === "number" ? (L(), D("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: a.value[n],
			onChange: (e) => m(n, Number(e.target.value))
		}, null, 40, ea)) : (L(), D("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: a.value[n] ?? "",
			onChange: (e) => m(n, e.target.value)
		}, null, 40, ta))])]), [[re, n.startsWith(e)]])), 64))]))), 128)), O("div", na, [l.value ? (L(), D("div", ra, U(l.value), 1)) : E("", !0), O("button", {
			class: "save-btn",
			disabled: s.value,
			onClick: p
		}, U(s.value ? "Saving..." : "Save settings"), 9, ia)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), oa = { class: "settings-page" }, sa = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (L(), D("div", oa, [t[0] ||= O("div", { class: "settings-header" }, [O("h1", { class: "settings-title" }, "Settings")], -1), A(aa)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function ca() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function la(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: ir
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: jr
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: bi
		},
		{
			path: `${t}/login`,
			name: "login",
			component: Mi
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: Ki
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: sa
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: ht,
		props: { appName: e.app }
	}), n;
}
function ua(e) {
	let t = {
		...ca(),
		...e
	};
	ot(t.defaultTheme);
	let n = oe();
	t.defaultTheme && !Le() && (ze(n).theme = t.defaultTheme);
	let r = ce({
		history: le(t.routerBase || "/app"),
		routes: la(t)
	}), i = w(ft);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var da = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, fa = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let t = e, n = z(!1), r = null, i = null, a = () => n.value = !!(r?.matches || i?.matches);
		I(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (r = window.matchMedia("(prefers-reduced-motion: reduce)"), i = window.matchMedia("(prefers-reduced-data: reduce)"), a(), r.addEventListener?.("change", a), i.addEventListener?.("change", a));
		}), F(() => {
			r?.removeEventListener?.("change", a), i?.removeEventListener?.("change", a);
		});
		let o = C(() => t.enabled && !n.value), s = C(() => o.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function c(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let l = C(() => t.ambientImage ? {
			backgroundImage: `url("${c(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), u = C(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, n) => (L(), D(y, null, [
			s.value ? (L(), D("div", {
				key: 0,
				class: N(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: P(l.value),
				"aria-hidden": "true"
			}, null, 6)) : E("", !0),
			o.value && e.vignette ? (L(), D("div", da)) : E("", !0),
			o.value && e.grain ? (L(), D("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: P(u.value),
				"aria-hidden": "true"
			}, null, 4)) : E("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), pa = ["aria-labelledby"], ma = {
	key: 0,
	class: "phlix-sheet__header"
}, ha = ["id"], ga = { class: "phlix-sheet__body" }, _a = {
	key: 1,
	class: "phlix-sheet__footer"
}, va = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let n = e, r = t, i = z(n.modelValue);
		J(() => n.modelValue, (e) => i.value = e);
		let a = z(null), o = K();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return l(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (L(), T(b, { to: "body" }, [A(x, { name: `phlix-sheet-${e.side}` }, {
			default: X(() => [e.modelValue ? (L(), D("div", {
				key: 0,
				class: N(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: ae(c, ["self"])
			}, [O("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? G(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (L(), D("header", ma, [e.title ? (L(), D("h2", {
					key: 0,
					id: G(o),
					class: "phlix-sheet__title"
				}, U(e.title), 9, ha)) : E("", !0), e.hideClose ? E("", !0) : (L(), T(u, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : E("", !0),
				O("div", ga, [V(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (L(), D("footer", _a, [V(t.$slots, "footer", {}, void 0, !0)])) : E("", !0)
			], 8, pa)], 34)) : E("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), ya = ["id"], ba = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let t = e, n = K(), r = z(!1), i = z(null), a;
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
		return F(() => clearTimeout(a)), (t, a) => (L(), D("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: ie(c, ["esc"])
		}, [V(t.$slots, "default", {}, void 0, !0), A(x, { name: "phlix-tooltip" }, {
			default: X(() => [r.value && (e.text || t.$slots.content) ? (L(), D("span", {
				key: 0,
				id: G(n),
				role: "tooltip",
				class: N(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [V(t.$slots, "content", {}, () => [k(U(e.text), 1)], !0)], 10, ya)) : E("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), xa = ["role"], Sa = { class: "phlix-toast__content" }, Ca = {
	key: 0,
	class: "phlix-toast__title"
}, wa = { class: "phlix-toast__message" }, Ta = ["onClick"], Ea = 0, Da = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		return I(() => {
			Ea++;
		}), F(() => {
			Ea--;
		}), (n, i) => (L(), T(b, { to: "body" }, [O("div", {
			class: N(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [A(S, { name: "phlix-toast" }, {
			default: X(() => [(L(!0), D(y, null, B(G(r).toasts, (e) => (L(), D("div", {
				key: e.id,
				class: N(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				A(t, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				O("div", Sa, [e.title ? (L(), D("p", Ca, U(e.title), 1)) : E("", !0), O("p", wa, U(e.message), 1)]),
				e.action ? (L(), D("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), G(r).dismiss(e.id);
					}
				}, U(e.action.label), 9, Ta)) : E("", !0),
				A(u, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => G(r).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, xa))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), Oa = ["aria-label"], ka = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let n = e, r = C(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (n, i) => (L(), D("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: P(r.value ? { fontSize: r.value } : void 0)
		}, [A(t, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Oa));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Aa = { class: "phlix-tabs" }, ja = ["aria-label"], Ma = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], Na = ["id", "aria-labelledby"], Pa = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = K(), o = z(null), s = C(() => r.tabs.findIndex((e) => e.value === r.modelValue)), c = (e) => `${a}-tab-${e}`, l = (e) => `${a}-panel-${e}`, u = C(() => r.tabs.map((e) => ({
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
		return (n, r) => (L(), D("div", Aa, [O("div", {
			ref_key: "listEl",
			ref: o,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: p
		}, [(L(!0), D(y, null, B(e.tabs, (n) => (L(), D("button", {
			id: c(n.value),
			key: n.value,
			type: "button",
			role: "tab",
			class: N(["phlix-tabs__tab", { "is-active": n.value === e.modelValue }]),
			"aria-selected": n.value === e.modelValue,
			"aria-controls": l(n.value),
			tabindex: n.value === e.modelValue ? 0 : -1,
			disabled: n.disabled,
			onClick: (e) => d(n.value)
		}, [n.icon ? (L(), T(t, {
			key: 0,
			name: n.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : E("", !0), k(" " + U(n.label), 1)], 10, Ma))), 128))], 40, ja), e.modelValue ? (L(), D("div", {
			key: 0,
			id: l(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": c(e.modelValue),
			tabindex: "0"
		}, [V(n.$slots, e.modelValue, {}, () => [V(n.$slots, "default", {}, void 0, !0)], !0)], 8, Na)) : E("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), Fa = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		return I(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), F(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (L(), T(H(e.tag), {
			ref_key: "el",
			ref: n,
			class: N(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: P({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: X(() => [V(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Ia = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (L(), T(x, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: X(() => [V(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), La = "__all__", Ra = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { files: e } = await this.client.get("/api/v1/admin/logs");
		return Array.isArray(e) ? e : [];
	}
	async tail(e, t = 200) {
		let n = await this.client.get("/api/v1/admin/logs/tail", {
			file: e,
			lines: String(t)
		});
		return {
			file: typeof n.file == "string" ? n.file : e,
			lines: Array.isArray(n.lines) ? n.lines : [],
			truncated: n.truncated === !0
		};
	}
	async tailAll(e = 200) {
		let t = await this.client.get("/api/v1/admin/logs/tail-all", { lines: String(e) });
		return {
			files: Array.isArray(t.files) ? t.files : [],
			lines: Array.isArray(t.lines) ? t.lines : [],
			truncated: t.truncated === !0
		};
	}
}, za = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, Ba = { class: "admin-logs__controls" }, Va = { class: "admin-logs__field" }, Ha = { class: "admin-logs__field" }, Ua = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, Wa = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, Ga = 5e3, Ka = /*@__PURE__*/ j({
	__name: "LogsPage",
	props: { client: {} },
	setup(t) {
		let r = [
			200,
			500,
			1e3,
			2e3
		], a = t, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new Ra(a.client ?? new e({
			baseUrl: l.value,
			tokenStore: new c()
		})), d = n(), f = z([]), p = z(""), m = z(200), h = z([]), _ = z(!1), y = z(!1), b = z(null), x = null, S = C(() => f.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: La,
			label: "All logs (combined)"
		}, ...f.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), w = C(() => r.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function T() {
			try {
				let e = await u.list();
				f.value = e, e.length > 0 && p.value === "" && (p.value = e[0].name);
			} catch (e) {
				d.error(e instanceof Error ? e.message : "Failed to list logs.");
			}
		}
		async function j() {
			let e = p.value;
			if (e !== "") {
				y.value = !0;
				try {
					let t = e === "__all__" ? await u.tailAll(m.value) : await u.tail(e, m.value);
					h.value = t.lines, _.value = t.truncated, M(() => {
						b.value && (b.value.scrollTop = b.value.scrollHeight);
					});
				} catch (e) {
					d.error(e instanceof Error ? e.message : "Failed to read log.");
				} finally {
					y.value = !1;
				}
			}
		}
		function N() {
			x !== null && (clearInterval(x), x = null);
		}
		function P() {
			N(), R.value && p.value !== "" && (x = setInterval(() => void j(), Ga));
		}
		let R = z(!1);
		return J([p, m], () => void j()), J([
			R,
			p,
			m
		], P), I(T), F(N), (e, t) => (L(), D("section", za, [
			t[6] ||= O("header", { class: "admin-logs__head" }, [O("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			O("div", Ba, [
				O("label", Va, [t[3] ||= O("span", { class: "admin-logs__label" }, "File", -1), A(g, {
					modelValue: p.value,
					"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
					options: S.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				O("label", Ha, [t[4] ||= O("span", { class: "admin-logs__label" }, "Lines", -1), A(g, {
					"model-value": m.value,
					options: w.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => m.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				A(i, {
					variant: "outline",
					size: "sm",
					loading: y.value,
					disabled: p.value === "",
					onClick: j
				}, {
					default: X(() => [...t[5] ||= [k(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				A(v, {
					modelValue: R.value,
					"onUpdate:modelValue": t[2] ||= (e) => R.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			_.value ? (L(), D("p", Ua, " Showing the most recent " + U(m.value) + " lines (" + U(p.value === G("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : E("", !0),
			y.value && h.value.length === 0 ? (L(), D("div", Wa, [A(o, {
				variant: "text",
				lines: 8
			})])) : (L(), D("pre", {
				key: 2,
				ref_key: "preEl",
				ref: b,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, U(h.value.length === 0 ? "(no output)" : h.value.join("\n")), 513))
		]));
	}
}), qa = /* @__PURE__ */ pe({ default: () => Ja }), Ja = /*#__PURE__*/ r(Ka, [["__scopeId", "data-v-a9b0d206"]]);
//#endregion
//#region src/api/admin/dashboard.ts
function Ya(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function Xa(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function Za(e) {
	return Array.isArray(e) ? e : [];
}
function Qa(e) {
	return {
		session_id: Ya(e.session_id ?? e.stream_id),
		user_id: Ya(e.user_id),
		user_name: Ya(e.user_name ?? e.username),
		media_item_id: Ya(e.media_item_id),
		media_title: Ya(e.media_title),
		media_type: Ya(e.media_type),
		progress_percent: Xa(e.progress_percent),
		started_at: Ya(e.started_at)
	};
}
function $a(e) {
	return {
		user_id: Ya(e.user_id),
		user_name: Ya(e.user_name ?? e.username),
		total_watch_time_seconds: Xa(e.total_watch_time_seconds ?? e.total_watch_time),
		play_count: Xa(e.play_count),
		last_seen: Ya(e.last_seen)
	};
}
function eo(e) {
	return {
		media_item_id: Ya(e.media_item_id),
		media_title: Ya(e.media_title ?? e.title),
		media_type: Ya(e.media_type ?? e.type),
		play_count: Xa(e.play_count),
		total_duration_seconds: Xa(e.total_duration_seconds ?? e.total_duration),
		last_played_at: Ya(e.last_played_at)
	};
}
function to(e) {
	let t = typeof e.details == "object" && e.details !== null ? e.details : {};
	return {
		id: Ya(e.id),
		event_type: Ya(e.event_type),
		user_id: Ya(e.user_id),
		user_name: Ya(e.user_name ?? e.username),
		media_item_id: Ya(e.media_item_id ?? t.media_item_id),
		media_title: Ya(e.media_title ?? t.media_title),
		created_at: Ya(e.created_at ?? e.occurred_at),
		details: typeof e.details == "string" ? e.details : ""
	};
}
var no = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getNowPlaying() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/now-playing");
		return Za(e).map(Qa);
	}
	async getTopUsers(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-users", Object.keys(n).length ? n : void 0);
		return Za(r).map($a);
	}
	async getTopMedia(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-media", Object.keys(n).length ? n : void 0);
		return Za(r).map(eo);
	}
	async getStorage() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/storage");
		return Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [];
	}
	async getActivity(e) {
		let t = e === void 0 ? void 0 : { limit: String(e) }, { data: n } = await this.client.get("/api/v1/admin/dashboard/activity", t);
		return Za(n).map(to);
	}
}, ro = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, io = { class: "admin-dash__head" }, ao = { class: "admin-dash__grid" }, oo = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, so = { class: "admin-dash__card-head" }, co = {
	key: 0,
	class: "admin-dash__skel"
}, lo = {
	key: 2,
	class: "admin-dash__np-list",
	role: "list"
}, uo = { class: "admin-dash__np-info" }, fo = { class: "admin-dash__np-user" }, po = ["title"], mo = { class: "admin-dash__np-progress" }, ho = ["aria-valuenow"], go = { class: "admin-dash__np-pct" }, _o = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, vo = {
	key: 0,
	class: "admin-dash__skel"
}, yo = {
	key: 2,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, bo = { class: "admin-dash__rank" }, xo = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, So = {
	key: 0,
	class: "admin-dash__skel"
}, Co = {
	key: 2,
	class: "admin-dash__media-list",
	role: "list"
}, wo = { class: "admin-dash__media-rank" }, To = { class: "admin-dash__media-info" }, Eo = ["title"], Do = { class: "admin-dash__media-stats" }, Oo = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, ko = {
	key: 0,
	class: "admin-dash__skel"
}, Ao = { class: "admin-dash__storage-grid" }, jo = { class: "admin-dash__storage-count" }, Mo = { class: "admin-dash__storage-size" }, No = {
	key: 0,
	class: "admin-dash__storage-note"
}, Po = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, Fo = {
	key: 0,
	class: "admin-dash__skel"
}, Io = {
	key: 2,
	class: "admin-dash__activity"
}, Lo = {
	class: "admin-dash__activity-list",
	role: "list"
}, Ro = { class: "admin-dash__activity-user" }, zo = ["title"], Bo = ["datetime", "title"], Vo = 20, Ho = 3e4, Uo = /*@__PURE__*/ j({
	__name: "DashboardPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new no(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n();
		function d(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function p(e) {
			if (e === 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1);
			return `${(e / 1024 ** n).toFixed(1)} ${t[n]}`;
		}
		function m(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		function h(e) {
			switch ((e ?? "").toLowerCase()) {
				case "movie": return "accent";
				case "series": return "success";
				case "photo": return "warning";
				case "audiobook": return "info";
				default: return "neutral";
			}
		}
		function v(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let b = [
			{
				value: 7,
				label: "Last 7 days"
			},
			{
				value: 30,
				label: "Last 30 days"
			},
			{
				value: 90,
				label: "Last 90 days"
			}
		], x = z(30), S = z([]), w = z([]), j = z([]), M = z([]), N = z([]), R = z(!0), V = z(!0), te = z(!0), H = z(!0), W = z(!0), G = z(!1), K = z(!0), ne = C(() => M.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function q() {
			try {
				S.value = await l.getNowPlaying();
			} catch {
				u.error("Failed to load now playing.");
			} finally {
				R.value = !1;
			}
		}
		async function re(e) {
			V.value = !0;
			try {
				w.value = await l.getTopUsers(10, e);
			} catch {
				u.error("Failed to load top users.");
			} finally {
				V.value = !1;
			}
		}
		async function Y(e) {
			te.value = !0;
			try {
				j.value = await l.getTopMedia(10, e);
			} catch {
				u.error("Failed to load top media.");
			} finally {
				te.value = !1;
			}
		}
		async function Z() {
			try {
				M.value = await l.getStorage();
			} catch {
				u.error("Failed to load storage.");
			} finally {
				H.value = !1;
			}
		}
		async function ie(e, t = !1) {
			t ? G.value = !0 : W.value = !0;
			try {
				let n = await l.getActivity(e);
				t ? N.value = [...N.value, ...n] : N.value = n, K.value = n.length === Vo;
			} catch {
				u.error("Failed to load activity.");
			} finally {
				W.value = !1, G.value = !1;
			}
		}
		function ae() {
			ie(N.value.length + Vo, !0);
		}
		let oe = null;
		return J(x, (e) => {
			re(e), Y(e);
		}), I(() => {
			q(), Z(), ie(Vo), re(x.value), Y(x.value), oe = setInterval(() => {
				l.getNowPlaying().then((e) => {
					S.value = e;
				}).catch(() => {});
			}, Ho);
		}), F(() => {
			oe !== null && (clearInterval(oe), oe = null);
		}), (e, t) => (L(), D("section", ro, [O("header", io, [t[1] ||= O("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), A(g, {
			"model-value": x.value,
			options: b,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => x.value = Number(e)
		}, null, 8, ["model-value"])]), O("div", ao, [
			O("section", oo, [O("header", so, [t[2] ||= O("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), S.value.length > 0 ? (L(), T(_, {
				key: 0,
				tone: "accent",
				label: `${S.value.length} active sessions`
			}, {
				default: X(() => [k(U(S.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : E("", !0)]), R.value ? (L(), D("div", co, [A(o, {
				variant: "text",
				lines: 4
			})])) : S.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "play",
				title: "No active sessions"
			})) : (L(), D("ul", lo, [(L(!0), D(y, null, B(S.value, (e) => (L(), D("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [O("div", uo, [
				O("span", fo, U(e.user_name), 1),
				O("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, U(e.media_title), 9, po),
				A(_, { tone: h(e.media_type) }, {
					default: X(() => [k(U(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), O("div", mo, [O("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [O("div", {
				class: "admin-dash__bar-fill",
				style: P({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, ho), O("span", go, U(e.progress_percent) + "%", 1)])]))), 128))]))]),
			O("section", _o, [t[4] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), V.value ? (L(), D("div", vo, [A(o, {
				variant: "text",
				lines: 4
			})])) : w.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "user",
				title: "No user data yet"
			})) : (L(), D("table", yo, [t[3] ||= O("thead", null, [O("tr", null, [
				O("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				O("th", { scope: "col" }, "User"),
				O("th", { scope: "col" }, "Watch Time"),
				O("th", { scope: "col" }, "Plays")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(w.value, (e, t) => (L(), D("tr", { key: e.user_id }, [
				O("td", bo, U(t + 1), 1),
				O("td", null, U(e.user_name), 1),
				O("td", null, U(d(e.total_watch_time_seconds)), 1),
				O("td", null, U(e.play_count), 1)
			]))), 128))])]))]),
			O("section", xo, [t[5] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), te.value ? (L(), D("div", So, [A(o, {
				variant: "text",
				lines: 4
			})])) : j.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "film",
				title: "No media data yet"
			})) : (L(), D("ol", Co, [(L(!0), D(y, null, B(j.value, (e, t) => (L(), D("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				O("span", wo, U(t + 1), 1),
				O("div", To, [O("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, U(e.media_title), 9, Eo), A(_, { tone: h(e.media_type) }, {
					default: X(() => [k(U(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("div", Do, [O("span", null, U(e.play_count) + " plays", 1), O("span", null, U(d(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			O("section", Oo, [t[6] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), H.value ? (L(), D("div", ko, [A(o, {
				variant: "text",
				lines: 3
			})])) : M.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "image",
				title: "No storage data"
			})) : (L(), D(y, { key: 2 }, [O("div", Ao, [(L(!0), D(y, null, B(M.value, (e) => (L(), D("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				A(_, { tone: h(e.media_type) }, {
					default: X(() => [k(U(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				O("div", jo, U(e.item_count.toLocaleString()) + " items", 1),
				O("div", Mo, U(p(e.total_bytes)), 1)
			]))), 128))]), ne.value > 0 ? (L(), D("p", No, " Transcode cache: " + U(p(ne.value)), 1)) : E("", !0)], 64))]),
			O("section", Po, [t[8] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), W.value ? (L(), D("div", Fo, [A(o, {
				variant: "text",
				lines: 5
			})])) : N.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "list",
				title: "No recent activity"
			})) : (L(), D("div", Io, [O("ul", Lo, [(L(!0), D(y, null, B(N.value, (e) => (L(), D("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				A(_, { tone: v(e.event_type) }, {
					default: X(() => [k(U(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				O("span", Ro, U(e.user_name), 1),
				O("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, U(e.media_title), 9, zo),
				O("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, U(m(e.created_at)), 9, Bo)
			]))), 128))]), K.value ? (L(), T(i, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: G.value,
				onClick: ae
			}, {
				default: X(() => [...t[7] ||= [k(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : E("", !0)]))])
		])]));
	}
}), Wo = /* @__PURE__ */ pe({ default: () => Go }), Go = /*#__PURE__*/ r(Uo, [["__scopeId", "data-v-71c5a6ca"]]), Ko = {
	0: "G — General Audiences",
	1: "PG — Parental Guidance",
	2: "PG-13 — Parents Strongly Cautioned",
	3: "R — Restricted",
	4: "NC-17 — No One 17 & Under",
	5: "X — Adult",
	6: "UNRATED — Unrated Content"
}, qo = Object.entries(Ko).map(([e, t]) => ({
	value: Number(e),
	label: t
})), Jo = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { users: e } = await this.client.get("/api/v1/admin/users");
		return Array.isArray(e) ? e : [];
	}
	async get(e) {
		let { user: t } = await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}`);
		return t;
	}
	create(e) {
		return this.client.post("/api/v1/admin/users", e);
	}
	update(e, t) {
		return this.client.put(`/api/v1/admin/users/${encodeURIComponent(e)}`, t);
	}
	remove(e) {
		return this.client.delete(`/api/v1/admin/users/${encodeURIComponent(e)}`);
	}
	setAdmin(e, t) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/set-admin`, { is_admin: t });
	}
	resetPassword(e) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/reset-password`);
	}
	async listProfiles(e) {
		let { profiles: t } = await this.client.get(`/api/v1/admin/users/${encodeURIComponent(e)}/profiles`);
		return Array.isArray(t) ? t : [];
	}
	createProfile(e, t) {
		return this.client.post(`/api/v1/admin/users/${encodeURIComponent(e)}/profiles`, t);
	}
	updateProfile(e, t) {
		return this.client.put(`/api/v1/admin/profiles/${encodeURIComponent(e)}`, t);
	}
	removeProfile(e) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}`);
	}
	setPin(e, t) {
		return this.client.post(`/api/v1/admin/profiles/${encodeURIComponent(e)}/pin`, { pin: t });
	}
	clearPin(e) {
		return this.client.delete(`/api/v1/admin/profiles/${encodeURIComponent(e)}/pin`);
	}
}, Yo = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, Xo = { class: "admin-users__head" }, Zo = {
	key: 0,
	class: "admin-users__skel"
}, Qo = {
	key: 2,
	class: "admin-users__table",
	"aria-label": "Users"
}, $o = { class: "admin-users__date" }, es = { class: "admin-users__actions" }, ts = { class: "admin-users__field" }, ns = { class: "admin-users__field" }, rs = { class: "admin-users__field" }, is = { class: "admin-users__label" }, as = ["placeholder", "required"], os = { key: 0 }, ss = { class: "admin-users__field" }, cs = { class: "admin-users__password-row" }, ls = ["value"], us = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, ds = {
	key: 0,
	class: "admin-users__skel"
}, fs = { class: "admin-users__profiles-toolbar" }, ps = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, ms = { class: "admin-users__actions" }, hs = {
	key: 2,
	class: "admin-users__subform"
}, gs = { class: "admin-users__subform-title" }, _s = { class: "admin-users__field" }, vs = { class: "admin-users__field" }, ys = { class: "admin-users__subform-actions" }, bs = {
	key: 3,
	class: "admin-users__subform"
}, xs = { class: "admin-users__subform-actions" }, Ss = {
	key: 4,
	class: "admin-users__subform"
}, Cs = { class: "admin-users__subform-title" }, ws = { class: "admin-users__field" }, Ts = { class: "admin-users__subform-actions" }, Es = 5, Ds = /*@__PURE__*/ j({
	__name: "UsersPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new Jo(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n();
		function p(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let m = C(() => qo.map((e) => ({
			value: e.value,
			label: e.label
		}))), h = z([]), b = z(!0);
		async function x() {
			b.value = !0;
			try {
				h.value = await l.list();
			} catch (e) {
				u.error(p(e, "Failed to load users."));
			} finally {
				b.value = !1;
			}
		}
		let S = z(!1), w = z(null), j = z(""), M = z(""), N = z(""), P = z(!1), F = z(!1), R = C(() => w.value ? `Edit user — ${w.value.username}` : "Add user");
		function V() {
			w.value = null, j.value = "", M.value = "", N.value = "", P.value = !1, S.value = !0;
		}
		function te(e) {
			w.value = e, j.value = e.username, M.value = e.email, N.value = "", P.value = e.is_admin === 1, S.value = !0;
		}
		function H() {
			S.value = !1, w.value = null;
		}
		async function W() {
			if (!j.value.trim() || !M.value.trim()) {
				u.error("Username and email are required.");
				return;
			}
			let e = w.value;
			if (!e && !N.value) {
				u.error("Password is required for new users.");
				return;
			}
			if (!e && N.value.length < 8) {
				u.error("Password must be at least 8 characters.");
				return;
			}
			F.value = !0;
			try {
				if (e) {
					let t = {
						username: j.value,
						email: M.value
					};
					N.value && (t.password = N.value), await l.update(e.id, t);
					let n = +!!P.value;
					e.is_admin !== n && await l.setAdmin(e.id, P.value), u.success("User updated.");
				} else {
					let e = {
						username: j.value,
						email: M.value,
						password: N.value,
						is_admin: P.value
					};
					await l.create(e), u.success("User created.");
				}
				H(), await x();
			} catch (e) {
				u.error(p(e, "Failed to save user."));
			} finally {
				F.value = !1;
			}
		}
		let G = z(null);
		async function K() {
			let e = G.value;
			if (e) try {
				await l.remove(e.id), u.success("User deleted."), G.value = null, await x();
			} catch (e) {
				u.error(p(e, "Failed to delete user.")), G.value = null;
			}
		}
		async function ne(e, t) {
			try {
				await l.setAdmin(e.id, t), u.success(t ? "User promoted to admin." : "Admin status removed."), await x();
			} catch (e) {
				u.error(p(e, "Failed to update admin status."));
			}
		}
		let re = z(null), J = z(null);
		async function Y(e) {
			re.value = e, J.value = null;
			try {
				J.value = await l.resetPassword(e.id);
			} catch (e) {
				u.error(p(e, "Failed to reset password.")), re.value = null;
			}
		}
		function ie() {
			re.value = null, J.value = null;
		}
		async function oe() {
			let e = J.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), u.success("Password copied to clipboard.");
			} catch {
				u.error("Could not copy to clipboard.");
			}
		}
		let Q = z(null), se = z([]), $ = z(!1), ce = C(() => Q.value ? `Profiles — ${Q.value.username}` : "Profiles"), le = C({
			get: () => Q.value !== null,
			set: (e) => {
				e || pe();
			}
		}), ue = C(() => se.value.length >= Es);
		async function de(e) {
			$.value = !0;
			try {
				se.value = await l.listProfiles(e);
			} catch (e) {
				u.error(p(e, "Failed to load profiles."));
			} finally {
				$.value = !1;
			}
		}
		async function fe(e) {
			Q.value = e, await de(e.id);
		}
		function pe() {
			Q.value = null, se.value = [], xe(), Ce.value = null, ke();
		}
		let me = z(!1), he = z(null), ge = z(""), _e = z(0), ve = z(!1);
		function ye() {
			he.value = null, ge.value = "", _e.value = 0, me.value = !0;
		}
		function be(e) {
			he.value = e, ge.value = e.name, _e.value = e.rating, me.value = !0;
		}
		function xe() {
			me.value = !1, he.value = null, ge.value = "", _e.value = 0;
		}
		async function Se() {
			let e = Q.value;
			if (e) {
				if (!ge.value.trim()) {
					u.error("Profile name is required.");
					return;
				}
				ve.value = !0;
				try {
					if (he.value) {
						let e = {
							name: ge.value,
							rating: _e.value
						};
						await l.updateProfile(he.value.id, e), u.success("Profile updated.");
					} else {
						if (ue.value) {
							u.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: ge.value,
							rating: _e.value
						};
						await l.createProfile(e.id, t), u.success("Profile created.");
					}
					xe(), await de(e.id);
				} catch (e) {
					u.error(p(e, "Failed to save profile."));
				} finally {
					ve.value = !1;
				}
			}
		}
		let Ce = z(null);
		async function we() {
			let e = Q.value, t = Ce.value;
			if (!(!e || !t)) try {
				await l.removeProfile(t.id), u.success("Profile deleted."), Ce.value = null, await de(e.id);
			} catch (e) {
				u.error(p(e, "Failed to delete profile.")), Ce.value = null;
			}
		}
		let Te = z(null), Ee = z(""), De = z(!1);
		function Oe(e) {
			Te.value = e, Ee.value = "";
		}
		function ke() {
			Te.value = null, Ee.value = "";
		}
		async function Ae() {
			let e = Q.value, t = Te.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(Ee.value) && !/^\d{6}$/.test(Ee.value)) {
					u.error("PIN must be 4 or 6 digits.");
					return;
				}
				De.value = !0;
				try {
					await l.setPin(t.id, Ee.value), u.success("PIN set."), ke(), await de(e.id);
				} catch (e) {
					u.error(p(e, "Failed to set PIN."));
				} finally {
					De.value = !1;
				}
			}
		}
		async function je(e) {
			let t = Q.value;
			if (t) try {
				await l.clearPin(e.id), u.success("PIN cleared."), await de(t.id);
			} catch (e) {
				u.error(p(e, "Failed to clear PIN."));
			}
		}
		function Me(e) {
			return Ko[e] ?? Ko[6];
		}
		return I(x), (e, t) => (L(), D("section", Yo, [
			O("header", Xo, [t[13] ||= O("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: V
			}, {
				default: X(() => [...t[12] ||= [k("Add user", -1)]]),
				_: 1
			})]),
			b.value ? (L(), D("div", Zo, [A(o, {
				variant: "text",
				lines: 6
			})])) : h.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "user",
				title: "No users yet"
			}, {
				actions: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: V
				}, {
					default: X(() => [...t[14] ||= [k("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (L(), D("table", Qo, [t[19] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Username"),
				O("th", { scope: "col" }, "Email"),
				O("th", { scope: "col" }, "Role"),
				O("th", { scope: "col" }, "Created"),
				O("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(h.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, U(e.username), 1),
				O("td", null, U(e.email), 1),
				O("td", null, [A(_, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: X(() => [k(U(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("td", $o, U(e.created_at.slice(0, 10)), 1),
				O("td", null, [O("div", es, [
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => te(e)
					}, {
						default: X(() => [...t[15] ||= [k(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => ne(e, e.is_admin !== 1)
					}, {
						default: X(() => [k(U(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => Y(e)
					}, {
						default: X(() => [...t[16] ||= [k(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => fe(e)
					}, {
						default: X(() => [...t[17] ||= [k(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => G.value = e
					}, {
						default: X(() => [...t[18] ||= [k(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			A(d, {
				modelValue: S.value,
				"onUpdate:modelValue": t[4] ||= (e) => S.value = e,
				title: R.value,
				onClose: H
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: X(() => [...t[22] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: F.value,
					onClick: W
				}, {
					default: X(() => [k(U(w.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-users__form",
					onSubmit: ae(W, ["prevent"])
				}, [
					O("label", ts, [t[20] ||= O("span", { class: "admin-users__label" }, "Username", -1), Z(O("input", {
						"onUpdate:modelValue": t[0] ||= (e) => j.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[q, j.value]])]),
					O("label", ns, [t[21] ||= O("span", { class: "admin-users__label" }, "Email", -1), Z(O("input", {
						"onUpdate:modelValue": t[1] ||= (e) => M.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[q, M.value]])]),
					O("label", rs, [O("span", is, U(w.value ? "Password (leave blank to keep current)" : "Password"), 1), Z(O("input", {
						"onUpdate:modelValue": t[2] ||= (e) => N.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: w.value ? "(unchanged)" : void 0,
						required: !w.value
					}, null, 8, as), [[q, N.value]])]),
					A(v, {
						modelValue: P.value,
						"onUpdate:modelValue": t[3] ||= (e) => P.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			A(d, {
				"model-value": G.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => G.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => G.value = null
				}, {
					default: X(() => [...t[25] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: K
				}, {
					default: X(() => [...t[26] ||= [k("Delete", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					t[23] ||= k(" Delete user ", -1),
					O("strong", null, U(G.value?.username), 1),
					t[24] ||= k("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				"model-value": re.value !== null,
				title: re.value ? `Reset password — ${re.value.username}` : "Reset password",
				"onUpdate:modelValue": ie
			}, {
				footer: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					onClick: ie
				}, {
					default: X(() => [...t[31] ||= [k("Close", -1)]]),
					_: 1
				})]),
				default: X(() => [J.value ? (L(), D("div", os, [O("p", null, U(J.value.message), 1), O("label", ss, [t[28] ||= O("span", { class: "admin-users__label" }, "New password", -1), O("div", cs, [O("input", {
					value: J.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, ls), A(i, {
					variant: "outline",
					size: "sm",
					onClick: oe
				}, {
					default: X(() => [...t[27] ||= [k("Copy", -1)]]),
					_: 1
				})])])])) : (L(), D("p", us, [
					t[29] ||= k(" Resetting password for ", -1),
					O("strong", null, U(re.value?.username), 1),
					t[30] ||= k("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			A(d, {
				modelValue: le.value,
				"onUpdate:modelValue": t[11] ||= (e) => le.value = e,
				title: ce.value,
				size: "lg"
			}, {
				default: X(() => [$.value ? (L(), D("div", ds, [A(o, {
					variant: "text",
					lines: 4
				})])) : (L(), D(y, { key: 1 }, [
					O("div", fs, [A(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: ue.value,
						"aria-label": "Add profile",
						onClick: ye
					}, {
						default: X(() => [k(" Add profile" + U(ue.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					se.value.length === 0 ? (L(), T(f, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (L(), D("table", ps, [t[36] ||= O("thead", null, [O("tr", null, [
						O("th", { scope: "col" }, "Name"),
						O("th", { scope: "col" }, "Rating"),
						O("th", { scope: "col" }, "PIN"),
						O("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), O("tbody", null, [(L(!0), D(y, null, B(se.value, (e) => (L(), D("tr", { key: e.id }, [
						O("td", null, U(e.name), 1),
						O("td", null, [A(_, { tone: "info" }, {
							default: X(() => [k(U(Me(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						O("td", null, [A(_, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: X(() => [k(U(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						O("td", null, [O("div", ms, [
							A(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => be(e)
							}, {
								default: X(() => [...t[32] ||= [k(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							A(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Oe(e)
							}, {
								default: X(() => [...t[33] ||= [k(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? E("", !0) : (L(), T(i, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => je(e)
							}, {
								default: X(() => [...t[34] ||= [k(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							A(i, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Ce.value = e
							}, {
								default: X(() => [...t[35] ||= [k(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					me.value ? (L(), D("div", hs, [O("h3", gs, U(he.value ? "Edit profile" : "Add profile"), 1), O("form", {
						class: "admin-users__form",
						onSubmit: ae(Se, ["prevent"])
					}, [
						O("label", _s, [t[37] ||= O("span", { class: "admin-users__label" }, "Name", -1), Z(O("input", {
							"onUpdate:modelValue": t[7] ||= (e) => ge.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[q, ge.value]])]),
						O("label", vs, [t[38] ||= O("span", { class: "admin-users__label" }, "Rating", -1), A(g, {
							"model-value": _e.value,
							options: m.value,
							label: "Rating",
							"onUpdate:modelValue": t[8] ||= (e) => _e.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						O("div", ys, [A(i, {
							variant: "ghost",
							size: "sm",
							onClick: xe
						}, {
							default: X(() => [...t[39] ||= [k("Cancel", -1)]]),
							_: 1
						}), A(i, {
							variant: "solid",
							size: "sm",
							loading: ve.value,
							onClick: Se
						}, {
							default: X(() => [k(U(he.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : E("", !0),
					Ce.value ? (L(), D("div", bs, [O("p", null, [
						t[40] ||= k(" Delete profile ", -1),
						O("strong", null, U(Ce.value.name), 1),
						t[41] ||= k("? This cannot be undone. ", -1)
					]), O("div", xs, [A(i, {
						variant: "ghost",
						size: "sm",
						onClick: t[9] ||= (e) => Ce.value = null
					}, {
						default: X(() => [...t[42] ||= [k("Cancel", -1)]]),
						_: 1
					}), A(i, {
						variant: "solid",
						size: "sm",
						onClick: we
					}, {
						default: X(() => [...t[43] ||= [k("Delete", -1)]]),
						_: 1
					})])])) : E("", !0),
					Te.value ? (L(), D("div", Ss, [O("h3", Cs, "Set PIN — " + U(Te.value.name), 1), O("form", {
						class: "admin-users__form",
						onSubmit: ae(Ae, ["prevent"])
					}, [O("label", ws, [t[44] ||= O("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), Z(O("input", {
						"onUpdate:modelValue": t[10] ||= (e) => Ee.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[q, Ee.value]])]), O("div", Ts, [A(i, {
						variant: "ghost",
						size: "sm",
						onClick: ke
					}, {
						default: X(() => [...t[45] ||= [k("Cancel", -1)]]),
						_: 1
					}), A(i, {
						variant: "solid",
						size: "sm",
						loading: De.value,
						onClick: Ae
					}, {
						default: X(() => [...t[46] ||= [k("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : E("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), Os = /* @__PURE__ */ pe({ default: () => ks }), ks = /*#__PURE__*/ r(Ds, [["__scopeId", "data-v-4c2f9520"]]), As = Object.freeze([
	{
		label: "Playback",
		events: [{
			id: "playback.started",
			label: "Playback started"
		}, {
			id: "playback.ended",
			label: "Playback ended"
		}]
	},
	{
		label: "Library",
		events: [{
			id: "library.updated",
			label: "Library updated"
		}]
	},
	{
		label: "Downloads",
		events: [{
			id: "download.complete",
			label: "Download complete"
		}]
	},
	{
		label: "Recordings",
		events: [{
			id: "recording.started",
			label: "Recording started"
		}, {
			id: "recording.stopped",
			label: "Recording stopped"
		}]
	},
	{
		label: "System",
		events: [{
			id: "alert",
			label: "Alert"
		}]
	}
]), js = Object.freeze(As.flatMap((e) => e.events.map((e) => e.id))), Ms = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { webhooks: e } = await this.client.get("/api/v1/admin/webhooks");
		return Array.isArray(e) ? e : [];
	}
	create(e) {
		return this.client.post("/api/v1/admin/webhooks", e).then(({ webhook: e }) => e);
	}
	update(e, t) {
		return this.client.put(`/api/v1/admin/webhooks/${encodeURIComponent(e)}`, t).then(({ webhook: e }) => e);
	}
	remove(e) {
		return this.client.delete(`/api/v1/admin/webhooks/${encodeURIComponent(e)}`).then((e) => e ?? { message: "Webhook deleted" });
	}
	test(e) {
		return this.client.post(`/api/v1/admin/webhooks/${encodeURIComponent(e)}/test`);
	}
}, Ns = {
	class: "admin-webhooks",
	"aria-labelledby": "webhooks-heading"
}, Ps = { class: "admin-webhooks__head" }, Fs = {
	key: 0,
	class: "admin-webhooks__skel"
}, Is = {
	key: 2,
	class: "admin-webhooks__table",
	"aria-label": "Webhooks"
}, Ls = { class: "admin-webhooks__url" }, Rs = { class: "admin-webhooks__actions" }, zs = { class: "admin-webhooks__field" }, Bs = { class: "admin-webhooks__field" }, Vs = { class: "admin-webhooks__field" }, Hs = { class: "admin-webhooks__label" }, Us = {
	key: 0,
	"aria-hidden": "true"
}, Ws = {
	key: 0,
	class: "admin-webhooks__hint"
}, Gs = { class: "admin-webhooks__secret-row" }, Ks = ["type", "placeholder"], qs = { class: "admin-webhooks__events" }, Js = { class: "admin-webhooks__events-category-label" }, Ys = ["checked", "onChange"], Xs = { class: "admin-webhooks__checkbox-label" }, Zs = { class: "admin-webhooks__event-id" }, Qs = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, $s = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, ec = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, tc = { class: "admin-webhooks__test-status" }, nc = { class: "admin-webhooks__test-message" }, rc = /*@__PURE__*/ j({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(r) {
		let a = r, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new Ms(a.client ?? new e({
			baseUrl: l.value,
			tokenStore: new c()
		})), p = n();
		function m(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function h(e) {
			try {
				let t = new URL(e);
				return t.protocol === "http:" || t.protocol === "https:";
			} catch {
				return !1;
			}
		}
		let g = z([]), v = z(!0);
		async function b() {
			v.value = !0;
			try {
				g.value = await u.list();
			} catch (e) {
				p.error(m(e, "Failed to load webhooks."));
			} finally {
				v.value = !1;
			}
		}
		let x = z(!1), S = z(null), w = z(""), j = z(""), M = z(""), P = z(/* @__PURE__ */ new Set()), F = z(!1), R = z(!1), V = z(""), te = C(() => S.value ? "Edit webhook" : "Add webhook");
		function H() {
			S.value = null, w.value = "", j.value = "", M.value = "", P.value = /* @__PURE__ */ new Set(), F.value = !1, V.value = "", x.value = !0;
		}
		function W(e) {
			S.value = e, w.value = e.name, j.value = e.url, M.value = "", P.value = new Set(e.events), F.value = !1, V.value = "", x.value = !0;
		}
		function K() {
			x.value = !1, S.value = null;
		}
		function re(e) {
			let t = new Set(P.value);
			t.has(e) ? t.delete(e) : t.add(e), P.value = t;
		}
		async function J() {
			if (V.value = "", !w.value.trim()) {
				V.value = "Name is required.";
				return;
			}
			if (!j.value.trim()) {
				V.value = "URL is required.";
				return;
			}
			if (!h(j.value)) {
				V.value = "URL must be a valid http:// or https:// URL.";
				return;
			}
			if (!S.value && !M.value.trim()) {
				V.value = "Secret is required when creating a webhook.";
				return;
			}
			if (P.value.size === 0) {
				V.value = "Select at least one event.";
				return;
			}
			R.value = !0;
			try {
				let e = S.value;
				if (e) {
					let t = {
						name: w.value.trim(),
						url: j.value.trim(),
						events: Array.from(P.value)
					};
					M.value.trim() && (t.secret = M.value), await u.update(e.id, t), p.success("Webhook updated.");
				} else await u.create({
					name: w.value.trim(),
					url: j.value.trim(),
					secret: M.value,
					events: Array.from(P.value)
				}), p.success("Webhook created.");
				K(), await b();
			} catch (e) {
				V.value = m(e, "Failed to save webhook.");
			} finally {
				R.value = !1;
			}
		}
		let Y = z(null);
		async function ie() {
			let e = Y.value;
			if (e) try {
				await u.remove(e.id), p.success("Webhook deleted."), Y.value = null, await b();
			} catch (e) {
				p.error(m(e, "Failed to delete webhook.")), Y.value = null;
			}
		}
		let oe = z(null), Q = z(null), se = z(!1), $ = C(() => oe.value ? `Test — ${oe.value.name}` : "Test webhook"), ce = C({
			get: () => oe.value !== null,
			set: (e) => {
				e || ue();
			}
		});
		async function le(e) {
			oe.value = e, Q.value = null, se.value = !0;
			try {
				let t = await u.test(e.id), n = t.success_count + t.failure_count, r = t.failure_count === 0 ? `Delivered successfully (${t.success_count}/${t.success_count} webhooks)` : `Delivery failed — ${t.failure_count} of ${n} webhook(s) failed`;
				Q.value = {
					success: t.success,
					message: r
				};
			} catch (e) {
				Q.value = {
					success: !1,
					message: m(e, "Failed to test webhook.")
				};
			} finally {
				se.value = !1;
			}
		}
		function ue() {
			oe.value = null, Q.value = null;
		}
		return I(b), (e, n) => (L(), D("section", Ns, [
			O("header", Ps, [n[9] ||= O("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: H
			}, {
				default: X(() => [...n[8] ||= [k("Add webhook", -1)]]),
				_: 1
			})]),
			v.value ? (L(), D("div", Fs, [A(o, {
				variant: "text",
				lines: 6
			})])) : g.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "settings",
				title: "No webhooks configured",
				description: "Add one to get started."
			}, {
				actions: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: H
				}, {
					default: X(() => [...n[10] ||= [k("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (L(), D("table", Is, [n[14] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Name"),
				O("th", { scope: "col" }, "URL"),
				O("th", { scope: "col" }, "Events"),
				O("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(g.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, U(e.name), 1),
				O("td", Ls, U(e.url), 1),
				O("td", null, [A(_, {
					tone: "info",
					mono: ""
				}, {
					default: X(() => [k(U(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				O("td", null, [O("div", Rs, [
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => W(e)
					}, {
						default: X(() => [...n[11] ||= [k(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Test ${e.name}`,
						onClick: (t) => le(e)
					}, {
						default: X(() => [...n[12] ||= [k(" Test ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => Y.value = e
					}, {
						default: X(() => [...n[13] ||= [k(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			A(d, {
				modelValue: x.value,
				"onUpdate:modelValue": n[4] ||= (e) => x.value = e,
				title: te.value,
				size: "lg",
				onClose: K
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: X(() => [...n[19] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: J
				}, {
					default: X(() => [k(U(S.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-webhooks__form",
					onSubmit: ae(J, ["prevent"])
				}, [
					O("label", zs, [n[15] ||= O("span", { class: "admin-webhooks__label" }, "Name", -1), Z(O("input", {
						"onUpdate:modelValue": n[0] ||= (e) => w.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[q, w.value]])]),
					O("label", Bs, [n[16] ||= O("span", { class: "admin-webhooks__label" }, "URL", -1), Z(O("input", {
						"onUpdate:modelValue": n[1] ||= (e) => j.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[q, j.value]])]),
					O("div", Vs, [
						O("span", Hs, [n[17] ||= k(" Secret", -1), S.value ? E("", !0) : (L(), D("span", Us, " *"))]),
						S.value ? (L(), D("p", Ws, "Leave blank to keep the current secret.")) : E("", !0),
						O("div", Gs, [Z(O("input", {
							"onUpdate:modelValue": n[2] ||= (e) => M.value = e,
							type: F.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: S.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, Ks), [[ne, M.value]]), A(i, {
							variant: "outline",
							size: "sm",
							"left-icon": F.value ? "eye-off" : "eye",
							"aria-label": F.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => F.value = !F.value
						}, {
							default: X(() => [k(U(F.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					O("fieldset", qs, [n[18] ||= O("legend", { class: "admin-webhooks__label" }, [k("Events"), O("span", { "aria-hidden": "true" }, " *")], -1), (L(!0), D(y, null, B(G(As), (e) => (L(), D("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [O("span", Js, U(e.label), 1), (L(!0), D(y, null, B(e.events, (e) => (L(), D("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						O("input", {
							type: "checkbox",
							checked: P.value.has(e.id),
							onChange: (t) => re(e.id)
						}, null, 40, Ys),
						O("span", Xs, U(e.label), 1),
						O("span", Zs, U(e.id), 1)
					]))), 128))]))), 128))]),
					V.value ? (L(), D("p", Qs, U(V.value), 1)) : E("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			A(d, {
				"model-value": Y.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => Y.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => Y.value = null
				}, {
					default: X(() => [...n[22] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: ie
				}, {
					default: X(() => [...n[23] ||= [k("Delete", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					n[20] ||= k(" Delete webhook ", -1),
					O("strong", null, U(Y.value?.name), 1),
					n[21] ||= k("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				modelValue: ce.value,
				"onUpdate:modelValue": n[7] ||= (e) => ce.value = e,
				title: $.value
			}, {
				footer: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					disabled: se.value,
					onClick: ue
				}, {
					default: X(() => [...n[24] ||= [k("Close", -1)]]),
					_: 1
				}, 8, ["disabled"])]),
				default: X(() => [se.value ? (L(), D("p", $s, "Sending test payload…")) : Q.value ? (L(), D("div", {
					key: 1,
					class: N(["admin-webhooks__test-result", Q.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [O("span", ec, [A(t, { name: Q.value.success ? "success" : "error" }, null, 8, ["name"])]), O("div", null, [O("p", tc, U(Q.value.success ? "Delivery succeeded" : "Delivery failed"), 1), O("p", nc, U(Q.value.message), 1)])], 2)) : E("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), ic = /* @__PURE__ */ pe({ default: () => ac }), ac = /*#__PURE__*/ r(rc, [["__scopeId", "data-v-77c00620"]]), oc = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getTraktStatus() {
		let e = await this.client.get("/api/v1/admin/services/trakt/status"), t = {
			connected: e.connected === !0,
			username: typeof e.username == "string" ? e.username : null
		};
		return typeof e.configured == "boolean" && (t.configured = e.configured), t;
	}
	async disconnectTrakt() {
		let e = await this.client.post("/api/v1/admin/services/trakt/disconnect");
		return { message: typeof e.message == "string" ? e.message : "" };
	}
	navigateToTraktAuthorize() {
		typeof window < "u" && (window.location.href = "/api/v1/oauth/trakt");
	}
	async getLastfmStatus() {
		let e = await this.client.get("/api/v1/admin/services/lastfm/status");
		return {
			connected: e.connected === !0,
			username: typeof e.username == "string" ? e.username : null,
			api_key_set: e.api_key_set === !0
		};
	}
	async disconnectLastfm() {
		let e = await this.client.post("/api/v1/admin/services/lastfm/disconnect");
		return { message: typeof e.message == "string" ? e.message : "" };
	}
	navigateToLastfmConnect() {
		typeof window < "u" && (window.location.href = "/admin/lastfm");
	}
}, sc = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, cc = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, lc = { class: "admin-services__section-head" }, uc = { class: "admin-services__card" }, dc = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, fc = {
	key: 0,
	class: "admin-services__dl"
}, pc = {
	key: 1,
	class: "admin-services__hint"
}, mc = { class: "admin-services__actions" }, hc = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, gc = { class: "admin-services__section-head" }, _c = { class: "admin-services__card" }, vc = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, yc = {
	key: 0,
	class: "admin-services__dl"
}, bc = { class: "admin-services__actions" }, xc = /*@__PURE__*/ j({
	__name: "ServicesPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new oc(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n(), d = z(null), p = z(!0), m = z(!1), h = C(() => d.value?.configured === !1);
		async function g() {
			try {
				d.value = await l.getTraktStatus();
			} catch (e) {
				u.error(e instanceof Error ? e.message : "Failed to load Trakt status.");
			} finally {
				p.value = !1;
			}
		}
		function v() {
			l.navigateToTraktAuthorize();
		}
		async function b() {
			if (!m.value) {
				m.value = !0;
				try {
					await l.disconnectTrakt(), u.success("Trakt disconnected."), await g();
				} catch (e) {
					u.error(e instanceof Error ? e.message : "Failed to disconnect Trakt.");
				} finally {
					m.value = !1;
				}
			}
		}
		let x = z(null), S = z(!0), w = z(!1);
		async function j() {
			try {
				x.value = await l.getLastfmStatus();
			} catch (e) {
				u.error(e instanceof Error ? e.message : "Failed to load Last.fm status.");
			} finally {
				S.value = !1;
			}
		}
		function M() {
			l.navigateToLastfmConnect();
		}
		async function N() {
			if (!w.value) {
				w.value = !0;
				try {
					await l.disconnectLastfm(), u.success("Last.fm disconnected."), await j();
				} catch (e) {
					u.error(e instanceof Error ? e.message : "Failed to disconnect Last.fm.");
				} finally {
					w.value = !1;
				}
			}
		}
		return I(() => {
			g(), j();
		}), (e, t) => (L(), D("section", sc, [
			t[8] ||= O("header", { class: "admin-services__head" }, [O("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			O("section", cc, [O("div", lc, [t[0] ||= O("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), d.value === null ? E("", !0) : (L(), T(_, {
				key: 0,
				tone: d.value.connected ? "success" : "neutral",
				label: d.value.connected ? "Connected" : "Not connected"
			}, {
				default: X(() => [k(U(d.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), O("div", uc, [p.value ? (L(), D("div", dc, [A(o, {
				variant: "text",
				lines: 2
			})])) : d.value === null ? (L(), T(f, {
				key: 1,
				icon: "alert",
				title: "Unable to load Trakt status."
			})) : (L(), D(y, { key: 2 }, [
				d.value.connected && d.value.username !== null ? (L(), D("dl", fc, [t[1] ||= O("dt", null, "Username", -1), O("dd", null, U(d.value.username), 1)])) : E("", !0),
				!d.value.connected && h.value ? (L(), D("p", pc, [...t[2] ||= [
					k(" Trakt isn't configured yet. Register an application at ", -1),
					O("a", {
						href: "https://trakt.tv/oauth/applications",
						target: "_blank",
						rel: "noopener noreferrer"
					}, "trakt.tv/oauth/applications", -1),
					k(" (set its redirect URI to this server's ", -1),
					O("code", null, "/api/v1/oauth/trakt/callback", -1),
					k("), then add the client ID and secret in Settings or via the ", -1),
					O("code", null, "TRAKT_CLIENT_ID", -1),
					k(" / ", -1),
					O("code", null, "TRAKT_CLIENT_SECRET", -1),
					k(" environment variables. ", -1)
				]])) : E("", !0),
				O("div", mc, [d.value.connected ? (L(), T(i, {
					key: 1,
					variant: "outline",
					loading: m.value,
					onClick: b
				}, {
					default: X(() => [k(U(m.value ? "Disconnecting" : "Disconnect"), 1)]),
					_: 1
				}, 8, ["loading"])) : (L(), T(i, {
					key: 0,
					variant: "solid",
					disabled: h.value,
					title: h.value ? "Add Trakt client ID and secret first" : void 0,
					onClick: v
				}, {
					default: X(() => [...t[3] ||= [k(" Connect to Trakt ", -1)]]),
					_: 1
				}, 8, ["disabled", "title"]))])
			], 64))])]),
			O("section", hc, [O("div", gc, [t[4] ||= O("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), x.value === null ? E("", !0) : (L(), T(_, {
				key: 0,
				tone: x.value.connected ? "success" : "neutral",
				label: x.value.connected ? "Connected" : "Not connected"
			}, {
				default: X(() => [k(U(x.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), O("div", _c, [S.value ? (L(), D("div", vc, [A(o, {
				variant: "text",
				lines: 2
			})])) : x.value === null ? (L(), T(f, {
				key: 1,
				icon: "alert",
				title: "Unable to load Last.fm status."
			})) : (L(), D(y, { key: 2 }, [x.value.connected && x.value.username !== null ? (L(), D("dl", yc, [
				t[5] ||= O("dt", null, "Username", -1),
				O("dd", null, U(x.value.username), 1),
				t[6] ||= O("dt", null, "API key", -1),
				O("dd", null, U(x.value.api_key_set ? "Set" : "Not set"), 1)
			])) : E("", !0), O("div", bc, [x.value.connected ? (L(), T(i, {
				key: 1,
				variant: "outline",
				loading: w.value,
				onClick: N
			}, {
				default: X(() => [k(U(w.value ? "Disconnecting" : "Disconnect"), 1)]),
				_: 1
			}, 8, ["loading"])) : (L(), T(i, {
				key: 0,
				variant: "solid",
				onClick: M
			}, {
				default: X(() => [...t[7] ||= [k(" Connect Last.fm ", -1)]]),
				_: 1
			}))])], 64))])])
		]));
	}
}), Sc = /* @__PURE__ */ pe({ default: () => Cc }), Cc = /*#__PURE__*/ r(xc, [["__scopeId", "data-v-06f3b61d"]]), wc = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getSyncStatus() {
		return this.client.get("/api/v1/admin/sync/status");
	}
	async triggerSync() {
		return this.client.post("/api/v1/admin/sync/trash-guides");
	}
	async setSyncEnabled(e) {
		return this.client.put("/api/v1/admin/sync/enable", { enabled: e });
	}
	async listProviders() {
		let { providers: e } = await this.client.get("/api/v1/admin/auth-providers");
		return Array.isArray(e) ? e : [];
	}
	async enableProvider(e) {
		return this.client.post(`/api/v1/admin/auth-providers/${encodeURIComponent(e)}/enable`);
	}
	async disableProvider(e) {
		return this.client.post(`/api/v1/admin/auth-providers/${encodeURIComponent(e)}/disable`);
	}
	async getOidcSettings() {
		return this.client.get("/api/v1/admin/auth-providers/oidc/config");
	}
	async saveOidcSettings(e) {
		return this.client.post("/api/v1/admin/auth-providers/oidc/config", e);
	}
	async getOidcSchema() {
		return this.client.get("/api/v1/admin/auth-providers/oidc/schema");
	}
	async getLdapSettings() {
		return this.client.get("/api/v1/admin/auth-providers/ldap/config");
	}
	async saveLdapSettings(e) {
		return this.client.post("/api/v1/admin/auth-providers/ldap/config", e);
	}
	async testLdapConnection(e) {
		return this.client.post("/api/v1/admin/auth-providers/ldap/test", e);
	}
	async getLdapSchema() {
		return this.client.get("/api/v1/admin/auth-providers/ldap/schema");
	}
}, Tc = {
	class: "admin-integrations",
	"aria-labelledby": "integrations-heading"
}, Ec = {
	class: "admin-integrations__section",
	"aria-labelledby": "arr-sync-heading"
}, Dc = { class: "admin-integrations__section-head" }, Oc = { class: "admin-integrations__card" }, kc = {
	key: 0,
	class: "admin-integrations__skel"
}, Ac = {
	key: 1,
	class: "admin-integrations__empty",
	role: "status"
}, jc = { class: "admin-integrations__dl" }, Mc = { class: "admin-integrations__dd" }, Nc = { class: "admin-integrations__dd" }, Pc = { class: "admin-integrations__card-actions" }, Fc = {
	class: "admin-integrations__section",
	"aria-labelledby": "auth-providers-heading"
}, Ic = {
	key: 0,
	class: "admin-integrations__skel"
}, Lc = {
	key: 1,
	class: "admin-integrations__providers"
}, Rc = { class: "admin-integrations__provider-info" }, zc = { class: "admin-integrations__provider-name" }, Bc = { class: "admin-integrations__provider-actions" }, Vc = { class: "admin-integrations__field" }, Hc = { class: "admin-integrations__field" }, Uc = { class: "admin-integrations__field" }, Wc = { class: "admin-integrations__hint" }, Gc = { class: "admin-integrations__password-row" }, Kc = ["type", "placeholder"], qc = { class: "admin-integrations__field" }, Jc = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Yc = { class: "admin-integrations__field" }, Xc = { class: "admin-integrations__field" }, Zc = ["value"], Qc = { class: "admin-integrations__field" }, $c = { class: "admin-integrations__field" }, el = { class: "admin-integrations__field" }, tl = { class: "admin-integrations__hint" }, nl = { class: "admin-integrations__password-row" }, rl = ["type", "placeholder"], il = { class: "admin-integrations__field" }, al = { class: "admin-integrations__field" }, ol = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, sl = 3e4, cl = "openid profile email", ll = /*@__PURE__*/ j({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(t) {
		let r = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, a = ["oidc", "ldap"], s = t, l = ee("apiBase", ""), u = C(() => typeof l == "string" ? l : l?.value ?? ""), f = new wc(s.client ?? new e({
			baseUrl: u.value,
			tokenStore: new c()
		})), p = n();
		function m(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let h = z(null), g = z(!0), b = z(!1), x = null;
		function S() {
			x !== null && (clearTimeout(x), x = null);
		}
		async function w() {
			g.value = !0;
			try {
				h.value = await f.getSyncStatus();
			} catch (e) {
				p.error(m(e, "Failed to load sync status."));
			} finally {
				g.value = !1;
			}
		}
		async function j() {
			if (b.value) return;
			b.value = !0;
			let e = !1;
			S(), x = setTimeout(() => {
				e = !0, b.value = !1, p.error("Sync timed out after 30 seconds. Check the server logs.");
			}, sl);
			try {
				let t = await f.triggerSync();
				if (S(), e) return;
				t.success ? (p.success(t.message || "Sync complete."), await w()) : p.error(t.message || "Sync failed.");
			} catch (t) {
				if (S(), e) return;
				p.error(m(t, "Sync request failed."));
			} finally {
				e || (b.value = !1);
			}
		}
		async function M(e) {
			try {
				await f.setSyncEnabled(e), p.success(e ? "Auto-sync enabled." : "Auto-sync disabled."), await w();
			} catch (e) {
				p.error(m(e, "Failed to update sync setting."));
			}
		}
		let N = z([]), P = z(!0), R = z(null), V = z(null);
		async function te() {
			P.value = !0;
			try {
				N.value = await f.listProviders();
			} catch (e) {
				p.error(m(e, "Failed to load auth providers."));
			} finally {
				P.value = !1;
			}
		}
		function H(e) {
			return e === "oidc" ? R.value?.configured ?? !1 : e === "ldap" ? V.value?.configured ?? !1 : N.value.find((t) => t.name === e)?.supports_authentication ?? !1;
		}
		async function W(e, t) {
			try {
				t ? (await f.disableProvider(e), p.success(`${r[e]} disabled.`)) : (await f.enableProvider(e), p.success(`${r[e]} enabled.`)), await te();
			} catch (t) {
				p.error(m(t, `Failed to update ${r[e]}.`));
			}
		}
		let G = z(!1), K = z({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: cl
		}), re = z(!1), J = z(""), Y = z(!1);
		async function ie() {
			J.value = "", Y.value = !1;
			try {
				let e = await f.getOidcSettings();
				R.value = e, K.value = {
					provider_url: e.provider_url ?? "",
					client_id: e.client_id ?? "",
					client_secret: "",
					scopes: e.scopes ?? cl
				};
			} catch (e) {
				p.error(m(e, "Failed to load OIDC settings."));
			}
			G.value = !0;
		}
		function oe() {
			G.value = !1, J.value = "";
		}
		async function Q() {
			if (J.value = "", !K.value.provider_url.trim()) {
				J.value = "Provider URL is required.";
				return;
			}
			if (!K.value.client_id.trim()) {
				J.value = "Client ID is required.";
				return;
			}
			re.value = !0;
			try {
				let e = {
					provider_url: K.value.provider_url.trim(),
					client_id: K.value.client_id.trim(),
					scopes: K.value.scopes.trim() || cl
				};
				K.value.client_secret.trim() && (e.client_secret = K.value.client_secret), await f.saveOidcSettings(e), p.success("OIDC settings saved."), G.value = !1, R.value = await f.getOidcSettings(), await te();
			} catch (e) {
				J.value = m(e, "Failed to save OIDC settings.");
			} finally {
				re.value = !1;
			}
		}
		let se = z(!1), $ = z({
			host: "",
			port: 389,
			ssl: !1,
			base_dn: "",
			bind_dn: "",
			bind_pw: "",
			user_filter: "",
			admin_group: ""
		}), ce = z(!1), le = z(!1), ue = z(""), de = z(!1);
		async function fe() {
			ue.value = "", de.value = !1;
			try {
				let e = await f.getLdapSettings();
				V.value = e, $.value = {
					host: e.host ?? "",
					port: e.port ?? 389,
					ssl: e.ssl ?? !1,
					base_dn: e.base_dn ?? "",
					bind_dn: e.bind_dn ?? "",
					bind_pw: "",
					user_filter: e.user_filter ?? "",
					admin_group: e.admin_group ?? ""
				};
			} catch (e) {
				p.error(m(e, "Failed to load LDAP settings."));
			}
			se.value = !0;
		}
		function pe() {
			se.value = !1, ue.value = "";
		}
		function me() {
			let e = {
				host: $.value.host.trim(),
				port: $.value.port,
				ssl: $.value.ssl,
				base_dn: $.value.base_dn.trim(),
				bind_dn: $.value.bind_dn.trim(),
				user_filter: $.value.user_filter.trim(),
				admin_group: $.value.admin_group.trim()
			};
			return $.value.bind_pw.trim() && (e.bind_pw = $.value.bind_pw), e;
		}
		async function he() {
			if (ue.value = "", !$.value.host.trim()) {
				ue.value = "Host is required.";
				return;
			}
			if (!$.value.base_dn.trim()) {
				ue.value = "Base DN is required.";
				return;
			}
			ce.value = !0;
			try {
				await f.saveLdapSettings(me()), p.success("LDAP settings saved."), se.value = !1, V.value = await f.getLdapSettings(), await te();
			} catch (e) {
				ue.value = m(e, "Failed to save LDAP settings.");
			} finally {
				ce.value = !1;
			}
		}
		async function ge() {
			le.value = !0;
			try {
				let e = await f.testLdapConnection(me());
				e.success ? p.success(e.message || "Connection OK.") : p.error(e.message || "Connection failed.");
			} catch (e) {
				p.error(m(e, "LDAP connection test failed."));
			} finally {
				le.value = !1;
			}
		}
		function _e(e) {
			let t = parseInt(e, 10);
			$.value.port = Number.isNaN(t) ? 0 : t;
		}
		function ve(e) {
			e === "oidc" ? ie() : fe();
		}
		return I(() => {
			w(), te();
		}), F(S), (e, t) => (L(), D("section", Tc, [
			t[37] ||= O("header", { class: "admin-integrations__head" }, [O("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			O("section", Ec, [O("div", Dc, [t[16] ||= O("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), h.value ? (L(), T(_, {
				key: 0,
				tone: h.value.enabled ? "success" : "neutral"
			}, {
				default: X(() => [k(U(h.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : E("", !0)]), O("div", Oc, [g.value ? (L(), D("div", kc, [A(o, {
				variant: "text",
				lines: 3
			})])) : h.value === null ? (L(), D("p", Ac, " Unable to load sync status. ")) : (L(), D(y, { key: 2 }, [O("dl", jc, [
				t[17] ||= O("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				O("dd", Mc, U(h.value.last_sync_at ?? "Never synced"), 1),
				t[18] ||= O("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				O("dd", Nc, [A(v, {
					"model-value": h.value.enabled,
					label: h.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": M
				}, null, 8, ["model-value", "label"])])
			]), O("div", Pc, [A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: b.value,
				onClick: j
			}, {
				default: X(() => [k(U(b.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			O("section", Fc, [t[20] ||= O("div", { class: "admin-integrations__section-head" }, [O("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), P.value ? (L(), D("div", Ic, [A(o, {
				variant: "text",
				lines: 4
			})])) : (L(), D("div", Lc, [(L(), D(y, null, B(a, (e) => O("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [O("div", Rc, [O("span", zc, U(r[e]), 1), A(_, { tone: H(e) ? "success" : "neutral" }, {
				default: X(() => [k(U(H(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), O("div", Bc, [A(v, {
				"model-value": H(e),
				label: `Enable ${r[e]}`,
				"onUpdate:modelValue": () => W(e, H(e))
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), A(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "settings",
				"aria-label": `Configure ${r[e]}`,
				onClick: (t) => ve(e)
			}, {
				default: X(() => [...t[19] ||= [k(" Configure ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])])])), 64))]))]),
			A(d, {
				modelValue: G.value,
				"onUpdate:modelValue": t[5] ||= (e) => G.value = e,
				title: "Configure OIDC",
				onClose: oe
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: oe
				}, {
					default: X(() => [...t[25] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: re.value,
					onClick: Q
				}, {
					default: X(() => [...t[26] ||= [k("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-integrations__form",
					onSubmit: ae(Q, ["prevent"])
				}, [
					O("label", Vc, [t[21] ||= O("span", { class: "admin-integrations__label" }, "Provider URL", -1), Z(O("input", {
						"onUpdate:modelValue": t[0] ||= (e) => K.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[q, K.value.provider_url]])]),
					O("label", Hc, [t[22] ||= O("span", { class: "admin-integrations__label" }, "Client ID", -1), Z(O("input", {
						"onUpdate:modelValue": t[1] ||= (e) => K.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[q, K.value.client_id]])]),
					O("label", Uc, [
						t[23] ||= O("span", { class: "admin-integrations__label" }, "Client secret", -1),
						O("span", Wc, U(R.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						O("div", Gc, [Z(O("input", {
							"onUpdate:modelValue": t[2] ||= (e) => K.value.client_secret = e,
							type: Y.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password"
						}, null, 8, Kc), [[ne, K.value.client_secret]]), A(i, {
							variant: "ghost",
							size: "sm",
							"left-icon": Y.value ? "eye-off" : "eye",
							"aria-label": Y.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => Y.value = !Y.value
						}, {
							default: X(() => [k(U(Y.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					O("label", qc, [t[24] ||= O("span", { class: "admin-integrations__label" }, "Scopes", -1), Z(O("input", {
						"onUpdate:modelValue": t[4] ||= (e) => K.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[q, K.value.scopes]])]),
					J.value ? (L(), D("p", Jc, U(J.value), 1)) : E("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			A(d, {
				modelValue: se.value,
				"onUpdate:modelValue": t[15] ||= (e) => se.value = e,
				title: "Configure LDAP",
				size: "lg",
				onClose: pe
			}, {
				footer: X(() => [
					A(i, {
						variant: "ghost",
						size: "sm",
						onClick: pe
					}, {
						default: X(() => [...t[34] ||= [k("Cancel", -1)]]),
						_: 1
					}),
					A(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "settings",
						loading: le.value,
						disabled: ce.value,
						onClick: ge
					}, {
						default: X(() => [...t[35] ||= [k(" Test connection ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"]),
					A(i, {
						variant: "solid",
						size: "sm",
						loading: ce.value,
						disabled: le.value,
						onClick: he
					}, {
						default: X(() => [...t[36] ||= [k(" Save LDAP ", -1)]]),
						_: 1
					}, 8, ["loading", "disabled"])
				]),
				default: X(() => [O("form", {
					class: "admin-integrations__form",
					onSubmit: ae(he, ["prevent"])
				}, [
					O("label", Yc, [t[27] ||= O("span", { class: "admin-integrations__label" }, "Host", -1), Z(O("input", {
						"onUpdate:modelValue": t[6] ||= (e) => $.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[q, $.value.host]])]),
					O("label", Xc, [t[28] ||= O("span", { class: "admin-integrations__label" }, "Port", -1), O("input", {
						value: $.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => _e(e.target.value)
					}, null, 40, Zc)]),
					A(v, {
						modelValue: $.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => $.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					O("label", Qc, [t[29] ||= O("span", { class: "admin-integrations__label" }, "Base DN", -1), Z(O("input", {
						"onUpdate:modelValue": t[9] ||= (e) => $.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[q, $.value.base_dn]])]),
					O("label", $c, [t[30] ||= O("span", { class: "admin-integrations__label" }, "Bind DN", -1), Z(O("input", {
						"onUpdate:modelValue": t[10] ||= (e) => $.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[q, $.value.bind_dn]])]),
					O("label", el, [
						t[31] ||= O("span", { class: "admin-integrations__label" }, "Bind password", -1),
						O("span", tl, U(V.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						O("div", nl, [Z(O("input", {
							"onUpdate:modelValue": t[11] ||= (e) => $.value.bind_pw = e,
							type: de.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: V.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password"
						}, null, 8, rl), [[ne, $.value.bind_pw]]), A(i, {
							variant: "ghost",
							size: "sm",
							"left-icon": de.value ? "eye-off" : "eye",
							"aria-label": de.value ? "Hide password" : "Show password",
							onClick: t[12] ||= (e) => de.value = !de.value
						}, {
							default: X(() => [k(U(de.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					O("label", il, [t[32] ||= O("span", { class: "admin-integrations__label" }, "User filter", -1), Z(O("input", {
						"onUpdate:modelValue": t[13] ||= (e) => $.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[q, $.value.user_filter]])]),
					O("label", al, [t[33] ||= O("span", { class: "admin-integrations__label" }, "Admin group DN", -1), Z(O("input", {
						"onUpdate:modelValue": t[14] ||= (e) => $.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[q, $.value.admin_group]])]),
					ue.value ? (L(), D("p", ol, U(ue.value), 1)) : E("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), ul = /* @__PURE__ */ pe({ default: () => dl }), dl = /*#__PURE__*/ r(ll, [["__scopeId", "data-v-056074d4"]]), fl = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let e = await this.client.get("/api/v1/admin/backup/list");
		return Array.isArray(e.data) ? e.data : [];
	}
	async create(e = {}) {
		let t = await this.client.post("/api/v1/admin/backup/create", e);
		return {
			message: t.message,
			backup_id: t.data.backup_id,
			file_path: t.data.file_path,
			size_bytes: t.data.size_bytes
		};
	}
	delete(e) {
		return this.client.delete(`/api/v1/admin/backup/${encodeURIComponent(e)}`);
	}
	restore(e) {
		return this.client.post(`/api/v1/admin/backup/${encodeURIComponent(e)}/restore`);
	}
	uploadToS3(e) {
		return this.client.post(`/api/v1/admin/backup/${encodeURIComponent(e)}/upload-s3`);
	}
	async getSchedule() {
		return (await this.client.get("/api/v1/admin/backup/schedule")).data;
	}
	async updateSchedule(e) {
		return (await this.client.put("/api/v1/admin/backup/schedule", e)).data;
	}
}, pl = { class: "admin-backup" }, ml = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, hl = { class: "admin-backup__head" }, gl = {
	key: 0,
	class: "admin-backup__skel"
}, _l = {
	key: 2,
	class: "admin-backup__table",
	"aria-label": "Backups"
}, vl = { key: 0 }, yl = {
	key: 1,
	class: "admin-backup__muted"
}, bl = { class: "admin-backup__num" }, xl = { class: "admin-backup__date" }, Sl = ["title"], Cl = { class: "admin-backup__actions" }, wl = {
	class: "admin-backup__section",
	"aria-labelledby": "schedule-heading"
}, Tl = {
	key: 0,
	class: "admin-backup__skel"
}, El = {
	key: 1,
	class: "admin-backup__card"
}, Dl = { class: "admin-backup__next" }, Ol = ["title"], kl = {
	key: 0,
	class: "admin-backup__muted"
}, Al = {
	key: 1,
	class: "admin-backup__muted"
}, jl = { class: "admin-backup__form-row" }, Ml = { class: "admin-backup__field" }, Nl = { class: "admin-backup__field" }, Pl = { class: "admin-backup__form-actions" }, Fl = { class: "admin-backup__field" }, Il = /*@__PURE__*/ j({
	__name: "BackupPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new fl(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n();
		function p(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function m(e) {
			if (e === 0) return "0 B";
			let t = 1024, n = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], r = Math.floor(Math.log(e) / Math.log(t));
			return `${parseFloat((e / t ** r).toFixed(1))} ${n[r]}`;
		}
		function h(e) {
			let t = new Date(e), n = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(n / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${i}m ago`;
			let a = Math.floor(i / 60);
			return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
		}
		function g(e) {
			if (e === null) return "Not scheduled";
			let t = e - Math.floor(Date.now() / 1e3);
			if (t < 0) return "Overdue";
			let n = Math.floor(t / 86400);
			return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `in ${n} days`;
		}
		let v = z([]), b = z(!0), x = z(null);
		async function S() {
			b.value = !0;
			try {
				v.value = await l.list();
			} catch (e) {
				u.error(p(e, "Failed to load backups."));
			} finally {
				b.value = !1;
			}
		}
		let w = z(!1), j = z(""), M = z(!1);
		function N() {
			j.value = "", w.value = !0;
		}
		function P() {
			w.value = !1, j.value = "";
		}
		async function F() {
			M.value = !0;
			try {
				let e = j.value.trim(), t = await l.create(e ? { label: e } : {});
				u.success(t.message || "Backup created."), P(), await S();
			} catch (e) {
				u.error(p(e, "Failed to create backup."));
			} finally {
				M.value = !1;
			}
		}
		let R = z(null), V = z(!1);
		function te() {
			R.value = null, V.value = !1;
		}
		async function H() {
			let e = R.value;
			if (e) {
				V.value = !0;
				try {
					let t = await l.restore(e.id);
					u.success(t.message || "Restore completed."), te();
				} catch (e) {
					u.error(p(e, "Restore failed.")), te();
				}
			}
		}
		let W = z(null), G = z(!1);
		function K() {
			W.value = null, G.value = !1;
		}
		async function ne() {
			let e = W.value;
			if (e) {
				G.value = !0;
				try {
					await l.delete(e.id), u.success("Backup deleted."), K(), await S();
				} catch (e) {
					u.error(p(e, "Failed to delete backup.")), K();
				}
			}
		}
		async function re(e) {
			x.value = e.id;
			try {
				let t = await l.uploadToS3(e.id);
				u.success(t.message || "Uploaded to S3."), await S();
			} catch (e) {
				u.error(p(e, "S3 upload failed."));
			} finally {
				x.value = null;
			}
		}
		let J = z(null), Y = z(!0), ie = z(""), oe = z(""), Q = z(!1);
		async function se() {
			Y.value = !0;
			try {
				let e = await l.getSchedule();
				J.value = e, ie.value = String(e.auto_backup_interval_days), oe.value = String(e.retention_count);
			} catch (e) {
				u.error(p(e, "Failed to load schedule."));
			} finally {
				Y.value = !1;
			}
		}
		async function $() {
			let e = parseInt(ie.value, 10), t = parseInt(oe.value, 10);
			if (isNaN(e) || e < 0) {
				u.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(t) || t < 1) {
				u.error("Retention count must be at least 1.");
				return;
			}
			Q.value = !0;
			try {
				let n = await l.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: t
				});
				u.success("Schedule saved."), J.value &&= {
					...J.value,
					auto_backup_interval_days: n.auto_backup_interval_days,
					retention_count: n.retention_count
				};
			} catch (e) {
				u.error(p(e, "Failed to save schedule."));
			} finally {
				Q.value = !1;
			}
		}
		return I(() => {
			S(), se();
		}), (e, t) => (L(), D("div", pl, [
			O("section", ml, [O("header", hl, [t[5] ||= O("h1", {
				id: "backups-heading",
				class: "admin-backup__title"
			}, "Backups", -1), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: N
			}, {
				default: X(() => [...t[4] ||= [k("Create backup", -1)]]),
				_: 1
			})]), b.value ? (L(), D("div", gl, [A(o, {
				variant: "text",
				lines: 5
			})])) : v.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "film",
				title: "No backups yet",
				description: "Create one to get started."
			}, {
				actions: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: N
				}, {
					default: X(() => [...t[6] ||= [k("Create backup", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (L(), D("table", _l, [t[10] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Label"),
				O("th", { scope: "col" }, "Size"),
				O("th", { scope: "col" }, "Created"),
				O("th", { scope: "col" }, "Storage"),
				O("th", {
					scope: "col",
					class: "admin-backup__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(v.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, [e.label ? (L(), D("span", vl, U(e.label), 1)) : (L(), D("span", yl, "Unnamed"))]),
				O("td", bl, U(m(e.size_bytes)), 1),
				O("td", xl, [O("span", { title: e.created_at }, U(h(e.created_at)), 9, Sl)]),
				O("td", null, [A(_, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: X(() => [k(U(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("td", null, [O("div", Cl, [
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Restore ${e.label || e.id}`,
						onClick: (t) => R.value = e
					}, {
						default: X(() => [...t[7] ||= [k(" Restore ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					e.is_s3 ? E("", !0) : (L(), T(i, {
						key: 0,
						variant: "ghost",
						size: "sm",
						loading: x.value === e.id,
						"aria-label": `Upload ${e.label || e.id} to S3`,
						onClick: (t) => re(e)
					}, {
						default: X(() => [...t[8] ||= [k(" Upload to S3 ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.label || e.id}`,
						onClick: (t) => W.value = e
					}, {
						default: X(() => [...t[9] ||= [k(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			O("section", wl, [t[15] ||= O("header", { class: "admin-backup__head" }, [O("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), Y.value ? (L(), D("div", Tl, [A(o, {
				variant: "text",
				lines: 3
			})])) : J.value ? (L(), D("div", El, [O("p", Dl, [t[11] ||= O("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), J.value.next_scheduled_backup === null ? (L(), D("span", Al, "Not scheduled")) : (L(), D(y, { key: 0 }, [O("span", { title: J.value.next_scheduled_backup_iso ?? "" }, U(g(J.value.next_scheduled_backup)), 9, Ol), J.value.next_scheduled_backup_iso ? (L(), D("span", kl, " (" + U(J.value.next_scheduled_backup_iso) + ") ", 1)) : E("", !0)], 64))]), O("form", {
				class: "admin-backup__form",
				onSubmit: ae($, ["prevent"])
			}, [O("div", jl, [O("label", Ml, [t[12] ||= O("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), Z(O("input", {
				"onUpdate:modelValue": t[0] ||= (e) => ie.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[q, ie.value]])]), O("label", Nl, [t[13] ||= O("span", { class: "admin-backup__label" }, "Retention count", -1), Z(O("input", {
				"onUpdate:modelValue": t[1] ||= (e) => oe.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[q, oe.value]])])]), O("div", Pl, [A(i, {
				variant: "solid",
				size: "sm",
				loading: Q.value,
				onClick: $
			}, {
				default: X(() => [...t[14] ||= [k(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : E("", !0)]),
			A(d, {
				modelValue: w.value,
				"onUpdate:modelValue": t[3] ||= (e) => w.value = e,
				title: "Create backup",
				onClose: P
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: P
				}, {
					default: X(() => [...t[17] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: M.value,
					onClick: F
				}, {
					default: X(() => [...t[18] ||= [k("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-backup__form",
					onSubmit: ae(F, ["prevent"])
				}, [O("label", Fl, [t[16] ||= O("span", { class: "admin-backup__label" }, "Label (optional)", -1), Z(O("input", {
					"onUpdate:modelValue": t[2] ||= (e) => j.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[q, j.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			A(d, {
				"model-value": R.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": te
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: te
				}, {
					default: X(() => [...t[19] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: H
				}, {
					default: X(() => [...t[20] ||= [k(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [t[21] ||= O("p", null, [k("This will overwrite your current data. "), O("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				"model-value": W.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": K
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: X(() => [...t[24] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: G.value,
					onClick: ne
				}, {
					default: X(() => [...t[25] ||= [k(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("p", null, [
					t[22] ||= k(" Are you sure you want to delete backup ", -1),
					O("strong", null, U(W.value?.label || W.value?.id), 1),
					t[23] ||= k("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), Ll = /* @__PURE__ */ pe({ default: () => Rl }), Rl = /*#__PURE__*/ r(Il, [["__scopeId", "data-v-b09885f4"]]);
//#endregion
//#region src/api/admin/cast.ts
function zl(e) {
	return typeof e == "string" ? e : "";
}
function Bl(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function Vl(e, t) {
	let n = typeof e.media_status == "object" && e.media_status !== null ? e.media_status : {}, r = zl(e.transport_state ?? e.state) || (e.active === !0 ? "PLAYING" : "STOPPED");
	return {
		device_id: zl(e.device_id) || t,
		media_title: zl(e.media_title ?? n.media_title ?? n.title),
		media_item_id: typeof e.media_item_id == "string" ? e.media_item_id : null,
		transport_state: r,
		volume_level: Bl(e.volume_level ?? n.volume_level),
		muted: e.muted === !0,
		position_seconds: Bl(e.position_seconds ?? n.position_seconds ?? n.current_time),
		duration_seconds: Bl(e.duration_seconds ?? n.duration_seconds ?? n.duration)
	};
}
function Hl(e, t) {
	return {
		device_id: zl(e.device_id) || t,
		media_title: zl(e.media_title),
		media_item_id: typeof e.media_item_id == "string" ? e.media_item_id : null,
		transport_state: zl(e.transport_state ?? e.state) || (e.active === !0 ? "PLAYING" : "STOPPED"),
		volume_level: Bl(e.volume_level),
		muted: e.muted === !0
	};
}
var Ul = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listCastDevices() {
		let e = await this.client.get("/api/v1/cast/devices"), t = e.devices ?? e.data;
		return Array.isArray(t) ? t : [];
	}
	async getCastStatus(e) {
		return Vl(await this.client.get(`/api/v1/cast/devices/${encodeURIComponent(e)}/status`), e);
	}
	async castPlay(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/play`)
		};
	}
	async castPause(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/pause`)
		};
	}
	async castStop(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/stop`)
		};
	}
	async castSeek(e, t) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/seek`, { position_ms: Math.round(t * 1e3) })
		};
	}
	async listAirPlayDevices() {
		let e = await this.client.get("/api/v1/airplay/devices"), t = e.devices ?? e.data;
		return Array.isArray(t) ? t : [];
	}
	async getAirPlayStatus(e) {
		return Hl(await this.client.get(`/api/v1/airplay/devices/${encodeURIComponent(e)}/status`), e);
	}
	async airPlayPlay(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/airplay/devices/${encodeURIComponent(e)}/resume`)
		};
	}
	async airPlayPause(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/airplay/devices/${encodeURIComponent(e)}/pause`)
		};
	}
	async airPlayStop(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/airplay/devices/${encodeURIComponent(e)}/stop`)
		};
	}
}, Wl = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, Gl = {
	class: "admin-cast__tabs",
	role: "tablist",
	"aria-label": "Device type"
}, Kl = [
	"aria-selected",
	"aria-controls",
	"onClick"
], ql = ["id", "aria-label"], Jl = { class: "admin-cast__subtitle" }, Yl = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, Xl = {
	key: 2,
	class: "admin-cast__grid",
	role: "list"
}, Zl = [
	"aria-pressed",
	"aria-label",
	"onClick"
], Ql = {
	class: "device-card__icon",
	"aria-hidden": "true"
}, $l = { class: "device-card__info" }, eu = ["title"], tu = ["title"], nu = {
	key: 3,
	class: "admin-cast__session",
	"aria-labelledby": "transport-heading"
}, ru = {
	key: 0,
	class: "admin-cast__player",
	"aria-live": "polite"
}, iu = {
	key: 1,
	class: "admin-cast__player"
}, au = {
	key: 2,
	class: "admin-cast__player"
}, ou = { class: "admin-cast__nowplaying" }, su = { class: "admin-cast__media" }, cu = { class: "admin-cast__note" }, lu = { class: "admin-cast__muted" }, uu = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, du = { class: "admin-cast__time" }, fu = { class: "admin-cast__time" }, pu = { class: "admin-cast__buttons" }, mu = /*@__PURE__*/ j({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(r) {
		let a = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], s = r, l = ee("apiBase", ""), u = C(() => typeof l == "string" ? l : l?.value ?? ""), d = new Ul(s.client ?? new e({
			baseUrl: u.value,
			tokenStore: new c()
		})), p = n();
		function m(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function h(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let g = z("chromecast"), v = z([]), b = z([]), x = z(!0), S = z(!0), w = z(null), j = z(null), M = z(!1), P = z(!1), F = C(() => g.value === "chromecast" ? v.value : b.value), R = C(() => g.value === "chromecast" ? x.value : S.value), V = C(() => a.find((e) => e.id === g.value)?.label ?? ""), te = C(() => a.find((e) => e.id === g.value)?.icon ?? "cast"), H = C(() => g.value === "chromecast"), W = C(() => F.value.find((e) => e.device_id === w.value)?.name ?? "");
		async function G() {
			x.value = !0;
			try {
				v.value = await d.listCastDevices();
			} catch (e) {
				p.error(m(e, "Failed to load Chromecast devices."));
			} finally {
				x.value = !1;
			}
		}
		async function K() {
			S.value = !0;
			try {
				b.value = await d.listAirPlayDevices();
			} catch (e) {
				p.error(m(e, "Failed to load AirPlay devices."));
			} finally {
				S.value = !1;
			}
		}
		async function ne(e, t) {
			M.value = !0, j.value = null;
			try {
				if (e === "chromecast") {
					let e = await d.getCastStatus(t);
					j.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: e.position_seconds,
						duration: e.duration_seconds,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				} else {
					let e = await d.getAirPlayStatus(t);
					j.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: null,
						duration: null,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				}
			} catch (e) {
				p.error(m(e, "Failed to load playback state."));
			} finally {
				M.value = !1;
			}
		}
		function q(e) {
			w.value = e, ne(g.value, e);
		}
		function re(e) {
			e !== g.value && (g.value = e, w.value = null, j.value = null);
		}
		async function J() {
			let e = w.value;
			if (e) {
				P.value = !0;
				try {
					let t = g.value === "chromecast" ? await d.castPlay(e) : await d.airPlayPlay(e);
					if (!t.success) {
						p.error(t.message || "Play failed.");
						return;
					}
					j.value &&= {
						...j.value,
						isPlaying: !0
					};
				} catch (e) {
					p.error(m(e, "Play failed."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function Y() {
			let e = w.value;
			if (e) {
				P.value = !0;
				try {
					let t = g.value === "chromecast" ? await d.castPause(e) : await d.airPlayPause(e);
					if (!t.success) {
						p.error(t.message || "Pause failed.");
						return;
					}
					j.value &&= {
						...j.value,
						isPlaying: !1
					};
				} catch (e) {
					p.error(m(e, "Pause failed."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function Z() {
			let e = w.value;
			if (e) {
				P.value = !0;
				try {
					let t = g.value === "chromecast" ? await d.castStop(e) : await d.airPlayStop(e);
					if (!t.success) {
						p.error(t.message || "Stop failed.");
						return;
					}
					j.value &&= {
						...j.value,
						isPlaying: !1,
						position: null
					};
				} catch (e) {
					p.error(m(e, "Stop failed."));
				} finally {
					P.value = !1;
				}
			}
		}
		async function ie(e) {
			let t = w.value;
			if (!(!t || g.value !== "chromecast")) {
				P.value = !0;
				try {
					let n = await d.castSeek(t, e);
					if (!n.success) {
						p.error(n.message || "Seek failed.");
						return;
					}
					j.value &&= {
						...j.value,
						position: e
					};
				} catch (e) {
					p.error(m(e, "Seek failed."));
				} finally {
					P.value = !1;
				}
			}
		}
		return I(() => {
			G(), K();
		}), (e, n) => (L(), D("section", Wl, [
			n[6] ||= O("header", { class: "admin-cast__head" }, [O("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			O("div", Gl, [(L(), D(y, null, B(a, (e) => O("button", {
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": g.value === e.id,
				"aria-controls": `panel-${e.id}`,
				class: N(["admin-cast__tab", { "admin-cast__tab--active": g.value === e.id }]),
				onClick: (t) => re(e.id)
			}, [A(t, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), k(" " + U(e.label), 1)], 10, Kl)), 64))]),
			O("div", {
				id: `panel-${g.value}`,
				role: "tabpanel",
				"aria-label": `${V.value} devices`,
				class: "admin-cast__panel"
			}, [
				O("h2", Jl, U(V.value) + " Devices", 1),
				R.value ? (L(), D("div", Yl, [A(o, {
					variant: "rect",
					height: "64px"
				}), A(o, {
					variant: "rect",
					height: "64px"
				})])) : F.value.length === 0 ? (L(), T(f, {
					key: 1,
					icon: "cast",
					title: `No ${V.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (L(), D("ul", Xl, [(L(!0), D(y, null, B(F.value, (e) => (L(), D("li", { key: e.device_id }, [O("button", {
					type: "button",
					class: N(["device-card", { "device-card--selected": w.value === e.device_id }]),
					"aria-pressed": w.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => q(e.device_id)
				}, [O("span", Ql, [A(t, { name: te.value }, null, 8, ["name"])]), O("span", $l, [O("span", {
					class: "device-card__name",
					title: e.name
				}, U(e.name), 9, eu), O("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, U(e.model), 9, tu)])], 10, Zl)]))), 128))])),
				w.value ? (L(), D("section", nu, [n[5] ||= O("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), M.value ? (L(), D("div", ru, [...n[0] ||= [O("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : j.value ? (L(), D("div", au, [
					O("div", ou, [O("p", su, U(j.value.mediaTitle || "No media"), 1), O("p", cu, [A(_, { tone: j.value.isPlaying ? "success" : "neutral" }, {
						default: X(() => [k(U(j.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), O("span", lu, "on " + U(W.value), 1)])]),
					H.value && j.value.duration !== null ? (L(), D("div", uu, [
						O("span", du, U(h(j.value.position)), 1),
						A($r, {
							"model-value": j.value.position ?? 0,
							min: 0,
							max: j.value.duration ?? 100,
							step: 1,
							disabled: P.value,
							label: "Seek position",
							"format-value": h,
							class: "admin-cast__slider",
							onChange: ie
						}, null, 8, [
							"model-value",
							"max",
							"disabled"
						]),
						O("span", fu, U(h(j.value.duration)), 1)
					])) : E("", !0),
					O("div", pu, [
						A(i, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: j.value.isPlaying || P.value,
							onClick: J
						}, {
							default: X(() => [...n[2] ||= [k(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						A(i, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !j.value.isPlaying || P.value,
							onClick: Y
						}, {
							default: X(() => [...n[3] ||= [k(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						A(i, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: P.value,
							onClick: Z
						}, {
							default: X(() => [...n[4] ||= [k(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (L(), D("div", iu, [...n[1] ||= [O("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : E("", !0)
			], 8, ql)
		]));
	}
}), hu = /* @__PURE__ */ pe({ default: () => gu }), gu = /*#__PURE__*/ r(mu, [["__scopeId", "data-v-8bd5485c"]]), _u = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getStatus() {
		let e = await this.client.get("/api/v1/admin/dlna/status");
		return {
			enabled: e.enabled === !0,
			running: e.running === !0,
			serverId: typeof e.serverId == "string" ? e.serverId : null,
			friendlyName: typeof e.friendlyName == "string" ? e.friendlyName : null,
			port: typeof e.port == "number" ? e.port : null,
			baseUrl: typeof e.baseUrl == "string" ? e.baseUrl : null,
			...typeof e.message == "string" ? { message: e.message } : {}
		};
	}
	async start() {
		let e = await this.client.post("/api/v1/admin/dlna/start");
		return {
			success: e.success === !0,
			...typeof e.message == "string" ? { message: e.message } : {}
		};
	}
	async stop() {
		let e = await this.client.post("/api/v1/admin/dlna/stop");
		return {
			success: e.success === !0,
			...typeof e.message == "string" ? { message: e.message } : {}
		};
	}
}, vu = {
	class: "admin-dlna",
	"aria-labelledby": "dlna-heading"
}, yu = {
	class: "admin-dlna__card",
	"aria-live": "polite"
}, bu = {
	key: 0,
	class: "admin-dlna__loading",
	"aria-hidden": "true"
}, xu = { class: "admin-dlna__status" }, Su = {
	key: 0,
	class: "admin-dlna__details"
}, Cu = { class: "admin-dlna__actions" }, wu = /*@__PURE__*/ j({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new _u(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n(), d = z(null), p = z(!0), m = z(!1), h = C(() => d.value?.running ?? !1), g = C(() => d.value?.enabled ?? !1);
		async function v() {
			p.value = !0;
			try {
				d.value = await l.getStatus();
			} catch (e) {
				u.error(e instanceof Error ? e.message : "Failed to load DLNA server status.");
			} finally {
				p.value = !1;
			}
		}
		async function b() {
			if (!m.value) {
				m.value = !0;
				try {
					let e = await l.start();
					if (!e.success) {
						u.error(e.message || "Failed to start DLNA server.");
						return;
					}
					u.success("DLNA server started."), await v();
				} catch (e) {
					u.error(e instanceof Error ? e.message : "Failed to start DLNA server.");
				} finally {
					m.value = !1;
				}
			}
		}
		async function x() {
			if (!m.value) {
				m.value = !0;
				try {
					let e = await l.stop();
					if (!e.success) {
						u.error(e.message || "Failed to stop DLNA server.");
						return;
					}
					u.success("DLNA server stopped."), await v();
				} catch (e) {
					u.error(e instanceof Error ? e.message : "Failed to stop DLNA server.");
				} finally {
					m.value = !1;
				}
			}
		}
		return I(v), (e, t) => (L(), D("section", vu, [
			t[4] ||= O("header", { class: "admin-dlna__head" }, [O("h1", {
				id: "dlna-heading",
				class: "admin-dlna__title"
			}, "DLNA Server")], -1),
			O("div", yu, [p.value ? (L(), D("div", bu, [A(o, {
				variant: "text",
				lines: 4
			})])) : g.value ? (L(), D(y, { key: 2 }, [
				O("div", xu, [A(_, {
					tone: h.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: X(() => [k(U(h.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				h.value && d.value !== null ? (L(), D("dl", Su, [
					d.value.friendlyName ? (L(), D(y, { key: 0 }, [t[0] ||= O("dt", null, "Friendly Name", -1), O("dd", null, U(d.value.friendlyName), 1)], 64)) : E("", !0),
					d.value.serverId ? (L(), D(y, { key: 1 }, [t[1] ||= O("dt", null, "UDN", -1), O("dd", null, U(d.value.serverId), 1)], 64)) : E("", !0),
					d.value.port === null ? E("", !0) : (L(), D(y, { key: 2 }, [t[2] ||= O("dt", null, "Port", -1), O("dd", null, U(d.value.port), 1)], 64)),
					d.value.baseUrl ? (L(), D(y, { key: 3 }, [t[3] ||= O("dt", null, "Base URL", -1), O("dd", null, U(d.value.baseUrl), 1)], 64)) : E("", !0)
				])) : E("", !0),
				O("div", Cu, [h.value ? (L(), T(i, {
					key: 1,
					variant: "outline",
					loading: m.value,
					leftIcon: "pause",
					onClick: x
				}, {
					default: X(() => [k(U(m.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (L(), T(i, {
					key: 0,
					variant: "solid",
					loading: m.value,
					leftIcon: "play",
					onClick: b
				}, {
					default: X(() => [k(U(m.value ? "Starting…" : "Start Server"), 1)]),
					_: 1
				}, 8, ["loading"]))])
			], 64)) : (L(), T(f, {
				key: 1,
				icon: "monitor",
				title: "DLNA server is not configured.",
				description: d.value?.message ?? void 0
			}, null, 8, ["description"]))]),
			t[5] ||= O("p", {
				class: "admin-dlna__note",
				role: "note"
			}, " The DLNA server announces this Phlix instance on the local network as a UPnP MediaServer. Restart the server to apply configuration changes. ", -1)
		]));
	}
}), Tu = /* @__PURE__ */ pe({ default: () => Eu }), Eu = /*#__PURE__*/ r(wu, [["__scopeId", "data-v-bde3d69c"]]), Du = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async hubStatus() {
		return this.client.get("/api/v1/admin/remote/hub/status");
	}
	async hubPair(e, t) {
		return this.client.post("/api/v1/admin/remote/hub/pair", {
			hubUrl: e,
			serverName: t
		});
	}
	async hubPoll(e, t) {
		return this.client.post("/api/v1/admin/remote/hub/poll", {
			claimId: e,
			hubUrl: t
		});
	}
	async hubComplete(e, t, n, r) {
		return this.client.post("/api/v1/admin/remote/hub/complete", {
			enrollmentJwt: e,
			hubJwksUrl: t,
			serverId: n,
			hubUrl: r
		});
	}
	async hubUnenroll() {
		return this.client.post("/api/v1/admin/remote/hub/unenroll");
	}
	async hubHeartbeat() {
		return this.client.post("/api/v1/admin/remote/hub/heartbeat");
	}
	async subdomainStatus() {
		return this.client.get("/api/v1/admin/remote/subdomain/status");
	}
	async subdomainClaim() {
		return this.client.post("/api/v1/admin/remote/subdomain/claim");
	}
	async subdomainRelease() {
		return this.client.post("/api/v1/admin/remote/subdomain/release");
	}
	async relayStatus() {
		return this.client.get("/api/v1/admin/remote/relay/status");
	}
	async relayEnable() {
		return this.client.post("/api/v1/admin/remote/relay/enable");
	}
	async relayDisable() {
		return this.client.post("/api/v1/admin/remote/relay/disable");
	}
	async relayPing() {
		return this.client.post("/api/v1/admin/remote/relay/ping");
	}
	async portForwardStatus() {
		return this.client.get("/api/v1/admin/remote/portforward/status");
	}
	async portForwardEnable() {
		return this.client.post("/api/v1/admin/remote/portforward/enable");
	}
	async portForwardDisable() {
		return this.client.post("/api/v1/admin/remote/portforward/disable");
	}
	async portForwardCandidates() {
		let e = await this.client.get("/api/v1/admin/remote/portforward/candidates");
		return { candidates: Array.isArray(e.candidates) ? e.candidates : [] };
	}
}, Ou = {
	class: "admin-remote",
	"aria-labelledby": "remote-access-heading"
}, ku = { class: "admin-remote__head" }, Au = {
	id: "remote-access-heading",
	class: "admin-remote__title"
}, ju = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-hub-heading"
}, Mu = ["aria-expanded"], Nu = { class: "admin-remote__section-title" }, Pu = { class: "admin-remote__section-summary" }, Fu = {
	key: 0,
	id: "remote-hub-body",
	class: "admin-remote__section-body"
}, Iu = {
	key: 0,
	class: "admin-remote__skel"
}, Lu = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, Ru = {
	key: 0,
	class: "admin-remote__dl"
}, zu = { class: "admin-remote__actions" }, Bu = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-subdomain-heading"
}, Vu = ["aria-expanded"], Hu = { class: "admin-remote__section-title" }, Uu = { class: "admin-remote__section-summary" }, Wu = {
	key: 0,
	id: "remote-subdomain-body",
	class: "admin-remote__section-body"
}, Gu = {
	key: 0,
	class: "admin-remote__skel"
}, Ku = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, qu = {
	key: 0,
	class: "admin-remote__dl"
}, Ju = { class: "admin-remote__actions" }, Yu = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-relay-heading"
}, Xu = ["aria-expanded"], Zu = { class: "admin-remote__section-title" }, Qu = { class: "admin-remote__section-summary" }, $u = {
	key: 0,
	id: "remote-relay-body",
	class: "admin-remote__section-body"
}, ed = {
	key: 0,
	class: "admin-remote__skel"
}, td = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, nd = { class: "admin-remote__dl" }, rd = { class: "admin-remote__actions" }, id = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, ad = ["aria-expanded"], od = { class: "admin-remote__section-title" }, sd = { class: "admin-remote__section-summary" }, cd = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, ld = {
	key: 0,
	class: "admin-remote__skel"
}, ud = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, dd = { class: "admin-remote__dl" }, fd = {
	key: 0,
	class: "admin-remote__candidates"
}, pd = { class: "admin-remote__candidates-list" }, md = { class: "admin-remote__actions" }, hd = {
	key: 0,
	class: "admin-remote__claim"
}, gd = { class: "admin-remote__claim-code" }, _d = { class: "admin-remote__field" }, vd = { class: "admin-remote__field" }, yd = /*@__PURE__*/ j({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(r) {
		let a = r, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new Du(a.client ?? new e({
			baseUrl: l.value,
			tokenStore: new c()
		})), f = n();
		function p(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function m(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
		}
		let h = z({
			hub: !0,
			subdomain: !1,
			relay: !1,
			portforward: !1
		});
		function g(e) {
			h.value[e] = !h.value[e];
		}
		let v = z(null), b = z(!0), x = z(!1), S = z(!1), w = z(!1), j = z(""), M = z("Phlix Server"), N = z(null), P = z(null), F = z(!1), R = z(!1), V = C(() => b.value ? "Loading…" : v.value === null ? "Unable to load" : v.value.paired ? `Paired${v.value.serverId ? ` (${v.value.serverId})` : ""}` : "Not paired");
		async function te() {
			try {
				v.value = await u.hubStatus();
			} catch (e) {
				f.error(p(e, "Failed to load hub status."));
			} finally {
				b.value = !1;
			}
		}
		function H() {
			w.value = !0;
		}
		function W() {
			w.value = !1, N.value = null, P.value = null;
		}
		async function G() {
			if (!F.value) {
				if (j.value === "") {
					f.error("Hub URL is required.");
					return;
				}
				F.value = !0;
				try {
					let e = await u.hubPair(j.value, M.value);
					e.success && (N.value = e.claimCode ?? null, P.value = e.claimId ?? null, f.success("Pairing initiated. Complete the claim on the hub, then poll."));
				} catch (e) {
					f.error(p(e, "Failed to initiate pairing."));
				} finally {
					F.value = !1;
				}
			}
		}
		async function K() {
			if (!(P.value === null || j.value === "") && !R.value) {
				R.value = !0;
				try {
					let e = await u.hubPoll(P.value, j.value);
					e.success && e.token ? (await u.hubComplete(e.token, "", e.serverId ?? "", j.value), f.success("Hub paired successfully."), W(), await te()) : !e.success && e.message && f.error(e.message);
				} catch (e) {
					f.error(p(e, "Failed to poll pairing status."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function ne() {
			if (!x.value) {
				x.value = !0;
				try {
					await u.hubUnenroll(), f.success("Hub unenrolled."), await te();
				} catch (e) {
					f.error(p(e, "Failed to unenroll."));
				} finally {
					x.value = !1;
				}
			}
		}
		async function re() {
			if (!S.value) {
				S.value = !0;
				try {
					(await u.hubHeartbeat()).success && f.success("Heartbeat sent.");
				} catch (e) {
					f.error(p(e, "Failed to send heartbeat."));
				} finally {
					S.value = !1;
				}
			}
		}
		let J = z(null), Y = z(!0), ie = z(!1), oe = z(!1), Q = C(() => Y.value ? "Loading…" : J.value === null ? "Unable to load" : J.value.claimed ? `Claimed${J.value.subdomain ? ` (${J.value.subdomain})` : ""}` : "Not claimed");
		async function se() {
			try {
				J.value = await u.subdomainStatus();
			} catch (e) {
				f.error(p(e, "Failed to load subdomain status."));
			} finally {
				Y.value = !1;
			}
		}
		async function $() {
			if (!ie.value) {
				ie.value = !0;
				try {
					await u.subdomainClaim(), f.success("Subdomain claimed."), await se();
				} catch (e) {
					f.error(p(e, "Failed to claim subdomain."));
				} finally {
					ie.value = !1;
				}
			}
		}
		async function ce() {
			if (!oe.value) {
				oe.value = !0;
				try {
					await u.subdomainRelease(), f.success("Subdomain released."), await se();
				} catch (e) {
					f.error(p(e, "Failed to release subdomain."));
				} finally {
					oe.value = !1;
				}
			}
		}
		let le = z(null), ue = z(!0), de = z(!1), fe = z(!1), pe = z(!1), me = z(null), he = C(() => ue.value ? "Loading…" : le.value === null ? "Unable to load" : le.value.connected ? `Connected${me.value === null ? "" : ` (${me.value}ms latency)`}` : "Disconnected"), ge = C(() => de.value || fe.value);
		async function _e() {
			try {
				le.value = await u.relayStatus(), me.value = null;
			} catch (e) {
				f.error(p(e, "Failed to load relay status."));
			} finally {
				ue.value = !1;
			}
		}
		async function ve() {
			if (!de.value) {
				de.value = !0;
				try {
					await u.relayEnable(), f.success("Relay enabled."), await _e();
				} catch (e) {
					f.error(p(e, "Failed to enable relay."));
				} finally {
					de.value = !1;
				}
			}
		}
		async function ye() {
			if (!fe.value) {
				fe.value = !0;
				try {
					await u.relayDisable(), f.success("Relay disabled."), await _e();
				} catch (e) {
					f.error(p(e, "Failed to disable relay."));
				} finally {
					fe.value = !1;
				}
			}
		}
		async function be() {
			if (!pe.value) {
				pe.value = !0;
				try {
					let e = await u.relayPing();
					me.value = e.latencyMs, f.success(`Relay latency: ${e.latencyMs}ms`);
				} catch (e) {
					f.error(p(e, "Failed to ping relay."));
				} finally {
					pe.value = !1;
				}
			}
		}
		let xe = z(null), Se = z(!0), Ce = z(!1), we = z(!1), Te = z([]), Ee = C(() => Se.value ? "Loading…" : xe.value === null ? "Unable to load" : xe.value.enabled ? xe.value.externalIp ? `Enabled (${xe.value.externalIp}:${xe.value.externalPort})` : "Enabled" : "Disabled"), De = C(() => Ce.value || we.value);
		async function Oe() {
			try {
				let [e, t] = await Promise.all([u.portForwardStatus(), u.portForwardCandidates()]);
				xe.value = e, Te.value = t.candidates;
			} catch (e) {
				f.error(p(e, "Failed to load port-forward status."));
			} finally {
				Se.value = !1;
			}
		}
		async function ke() {
			if (!Ce.value) {
				Ce.value = !0;
				try {
					await u.portForwardEnable(), f.success("Port forwarding enabled."), await Oe();
				} catch (e) {
					f.error(p(e, "Failed to enable port forwarding."));
				} finally {
					Ce.value = !1;
				}
			}
		}
		async function Ae() {
			if (!we.value) {
				we.value = !0;
				try {
					await u.portForwardDisable(), f.success("Port forwarding disabled."), await Oe();
				} catch (e) {
					f.error(p(e, "Failed to disable port forwarding."));
				} finally {
					we.value = !1;
				}
			}
		}
		return I(() => {
			te(), se(), _e(), Oe();
		}), (e, n) => (L(), D("section", Ou, [
			O("header", ku, [O("h1", Au, [A(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[7] ||= k(" Remote Access ", -1)])]),
			O("section", ju, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => g("hub")
			}, [O("span", Nu, [n[8] ||= O("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), A(t, {
				name: h.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", Pu, U(V.value), 1)], 8, Mu), h.value.hub ? (L(), D("div", Fu, [b.value ? (L(), D("div", Iu, [A(o, {
				variant: "text",
				lines: 3
			})])) : v.value === null ? (L(), D("p", Lu, " Unable to load hub status. ")) : (L(), D(y, { key: 2 }, [v.value.paired ? (L(), D("dl", Ru, [
				v.value.serverId ? (L(), D(y, { key: 0 }, [n[9] ||= O("dt", null, "Server ID", -1), O("dd", null, U(v.value.serverId), 1)], 64)) : E("", !0),
				v.value.hubUrl ? (L(), D(y, { key: 1 }, [n[10] ||= O("dt", null, "Hub URL", -1), O("dd", null, U(v.value.hubUrl), 1)], 64)) : E("", !0),
				v.value.enrolledAt ? (L(), D(y, { key: 2 }, [n[11] ||= O("dt", null, "Enrolled at", -1), O("dd", null, U(m(v.value.enrolledAt)), 1)], 64)) : E("", !0)
			])) : E("", !0), O("div", zu, [v.value.paired ? (L(), D(y, { key: 1 }, [A(i, {
				variant: "outline",
				size: "sm",
				loading: S.value,
				onClick: re
			}, {
				default: X(() => [...n[13] ||= [k(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), A(i, {
				variant: "ghost",
				size: "sm",
				loading: x.value,
				onClick: ne
			}, {
				default: X(() => [...n[14] ||= [k(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (L(), T(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: H
			}, {
				default: X(() => [...n[12] ||= [k(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : E("", !0)]),
			O("section", Bu, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => g("subdomain")
			}, [O("span", Hu, [n[15] ||= O("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), A(t, {
				name: h.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", Uu, U(Q.value), 1)], 8, Vu), h.value.subdomain ? (L(), D("div", Wu, [Y.value ? (L(), D("div", Gu, [A(o, {
				variant: "text",
				lines: 2
			})])) : J.value === null ? (L(), D("p", Ku, " Unable to load subdomain status. ")) : (L(), D(y, { key: 2 }, [J.value.claimed ? (L(), D("dl", qu, [J.value.subdomain ? (L(), D(y, { key: 0 }, [n[16] ||= O("dt", null, "Subdomain", -1), O("dd", null, U(J.value.subdomain), 1)], 64)) : E("", !0), J.value.fqdn ? (L(), D(y, { key: 1 }, [n[17] ||= O("dt", null, "FQDN", -1), O("dd", null, U(J.value.fqdn), 1)], 64)) : E("", !0)])) : E("", !0), O("div", Ju, [J.value.claimed ? (L(), T(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: oe.value,
				onClick: ce
			}, {
				default: X(() => [...n[19] ||= [k(" Release Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"])) : (L(), T(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: ie.value,
				onClick: $
			}, {
				default: X(() => [...n[18] ||= [k(" Claim Subdomain ", -1)]]),
				_: 1
			}, 8, ["loading"]))])], 64))])) : E("", !0)]),
			O("section", Yu, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => g("relay")
			}, [O("span", Zu, [n[20] ||= O("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), A(t, {
				name: h.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", Qu, U(he.value), 1)], 8, Xu), h.value.relay ? (L(), D("div", $u, [ue.value ? (L(), D("div", ed, [A(o, {
				variant: "text",
				lines: 2
			})])) : le.value === null ? (L(), D("p", td, " Unable to load relay status. ")) : (L(), D(y, { key: 2 }, [O("dl", nd, [
				n[22] ||= O("dt", null, "Status", -1),
				O("dd", null, [A(_, { tone: le.value.connected ? "success" : "neutral" }, {
					default: X(() => [k(U(le.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[23] ||= O("dt", null, "Active", -1),
				O("dd", null, U(le.value.active ? "Yes" : "No"), 1),
				me.value === null ? E("", !0) : (L(), D(y, { key: 0 }, [n[21] ||= O("dt", null, "Latency", -1), O("dd", null, U(me.value) + "ms", 1)], 64))
			]), O("div", rd, [A(i, {
				variant: "outline",
				size: "sm",
				loading: pe.value,
				disabled: !le.value.connected,
				onClick: be
			}, {
				default: X(() => [...n[24] ||= [k(" Ping ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]), le.value.connected ? (L(), T(i, {
				key: 1,
				variant: "ghost",
				size: "sm",
				loading: fe.value,
				disabled: ge.value,
				onClick: ye
			}, {
				default: X(() => [...n[26] ||= [k(" Disable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"])) : (L(), T(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				loading: de.value,
				disabled: ge.value,
				onClick: ve
			}, {
				default: X(() => [...n[25] ||= [k(" Enable ", -1)]]),
				_: 1
			}, 8, ["loading", "disabled"]))])], 64))])) : E("", !0)]),
			O("section", id, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => g("portforward")
			}, [O("span", od, [n[27] ||= O("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), A(t, {
				name: h.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", sd, U(Ee.value), 1)], 8, ad), h.value.portforward ? (L(), D("div", cd, [Se.value ? (L(), D("div", ld, [A(o, {
				variant: "text",
				lines: 3
			})])) : xe.value === null ? (L(), D("p", ud, " Unable to load port-forward status. ")) : (L(), D(y, { key: 2 }, [
				O("dl", dd, [
					n[31] ||= O("dt", null, "Enabled", -1),
					O("dd", null, [A(_, { tone: xe.value.enabled ? "success" : "neutral" }, {
						default: X(() => [k(U(xe.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					xe.value.method ? (L(), D(y, { key: 0 }, [n[28] ||= O("dt", null, "Method", -1), O("dd", null, U(xe.value.method), 1)], 64)) : E("", !0),
					xe.value.externalIp ? (L(), D(y, { key: 1 }, [n[29] ||= O("dt", null, "External IP", -1), O("dd", null, U(xe.value.externalIp), 1)], 64)) : E("", !0),
					xe.value.externalPort ? (L(), D(y, { key: 2 }, [n[30] ||= O("dt", null, "External port", -1), O("dd", null, U(xe.value.externalPort), 1)], 64)) : E("", !0)
				]),
				Te.value.length > 0 ? (L(), D("div", fd, [n[32] ||= O("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), O("ul", pd, [(L(!0), D(y, null, B(Te.value, (e, t) => (L(), D("li", { key: t }, U(e.hostname), 1))), 128))])])) : E("", !0),
				O("div", md, [xe.value.enabled ? (L(), T(i, {
					key: 1,
					variant: "ghost",
					size: "sm",
					loading: we.value,
					disabled: De.value,
					onClick: Ae
				}, {
					default: X(() => [...n[34] ||= [k(" Disable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"])) : (L(), T(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: Ce.value,
					disabled: De.value,
					onClick: ke
				}, {
					default: X(() => [...n[33] ||= [k(" Enable ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))])
			], 64))])) : E("", !0)]),
			A(d, {
				modelValue: w.value,
				"onUpdate:modelValue": n[6] ||= (e) => w.value = e,
				title: "Initiate Hub Pairing",
				onClose: W
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: W
				}, {
					default: X(() => [...n[38] ||= [k("Cancel", -1)]]),
					_: 1
				}), N.value ? (L(), T(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: K
				}, {
					default: X(() => [...n[39] ||= [k(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (L(), T(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: F.value,
					disabled: j.value === "",
					onClick: G
				}, {
					default: X(() => [...n[40] ||= [k(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: X(() => [N.value ? (L(), D("div", hd, [n[35] ||= O("p", null, "Enter this claim code on the hub:", -1), O("p", gd, U(N.value), 1)])) : (L(), D("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: ae(G, ["prevent"])
				}, [O("label", _d, [n[36] ||= O("span", { class: "admin-remote__label" }, "Hub URL", -1), Z(O("input", {
					"onUpdate:modelValue": n[4] ||= (e) => j.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[q, j.value]])]), O("label", vd, [n[37] ||= O("span", { class: "admin-remote__label" }, "Server name", -1), Z(O("input", {
					"onUpdate:modelValue": n[5] ||= (e) => M.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[q, M.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), bd = /* @__PURE__ */ pe({ default: () => xd }), xd = /*#__PURE__*/ r(yd, [["__scopeId", "data-v-0f6d3051"]]), Sd = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listTuners() {
		let { tuners: e } = await this.client.get("/api/v1/admin/livetv/tuners");
		return Array.isArray(e) ? e : [];
	}
	async getTuner(e) {
		let { tuner: t } = await this.client.get(`/api/v1/admin/livetv/tuners/${encodeURIComponent(e)}`);
		return t;
	}
	async scanTuners() {
		let { tuners: e } = await this.client.post("/api/v1/admin/livetv/tuners/scan");
		return Array.isArray(e) ? e : [];
	}
	async updateTuner(e, t) {
		let { tuner: n } = await this.client.put(`/api/v1/admin/livetv/tuners/${encodeURIComponent(e)}`, t);
		return n;
	}
	deleteTuner(e) {
		return this.client.delete(`/api/v1/admin/livetv/tuners/${encodeURIComponent(e)}`);
	}
	async listChannels() {
		let { channels: e } = await this.client.get("/api/v1/admin/livetv/channels");
		return Array.isArray(e) ? e : [];
	}
	async getChannel(e) {
		let { channel: t } = await this.client.get(`/api/v1/admin/livetv/channels/${encodeURIComponent(e)}`);
		return t;
	}
	async listGuide(e) {
		let t = {};
		e?.channel_id && (t.channel_id = e.channel_id), e?.from !== void 0 && (t.from = String(e.from)), e?.to !== void 0 && (t.to = String(e.to));
		let { programs: n } = await this.client.get("/api/v1/admin/livetv/guide", t);
		return Array.isArray(n) ? n : [];
	}
	async getProgram(e) {
		let { program: t } = await this.client.get(`/api/v1/admin/livetv/guide/programs/${encodeURIComponent(e)}`);
		return t;
	}
	async refreshGuide(e) {
		let { programs: t } = await this.client.post("/api/v1/admin/livetv/guide/refresh", e === void 0 ? void 0 : { days_ahead: e });
		return typeof t == "number" ? t : 0;
	}
	async listRecordings(e) {
		let t = {};
		e?.status && (t.status = e.status);
		let { recordings: n } = await this.client.get("/api/v1/admin/livetv/recordings", t);
		return Array.isArray(n) ? n : [];
	}
	async getRecording(e) {
		let { recording: t } = await this.client.get(`/api/v1/admin/livetv/recordings/${encodeURIComponent(e)}`);
		return t;
	}
	async createRecording(e) {
		let { recording: t } = await this.client.post("/api/v1/admin/livetv/recordings", e);
		return t;
	}
	deleteRecording(e) {
		return this.client.delete(`/api/v1/admin/livetv/recordings/${encodeURIComponent(e)}`);
	}
	async listUpcoming(e = 10) {
		let { recordings: t } = await this.client.get("/api/v1/admin/livetv/recordings/upcoming", { limit: String(e) });
		return Array.isArray(t) ? t : [];
	}
	async listBySeries(e) {
		let { recordings: t } = await this.client.get(`/api/v1/admin/livetv/recordings/series/${encodeURIComponent(e)}`);
		return Array.isArray(t) ? t : [];
	}
	async listSeriesRules() {
		let { rules: e } = await this.client.get("/api/v1/admin/livetv/series-rules");
		return Array.isArray(e) ? e : [];
	}
	async getSeriesRule(e) {
		let { rule: t } = await this.client.get(`/api/v1/admin/livetv/series-rules/${encodeURIComponent(e)}`);
		return t;
	}
	async createSeriesRule(e) {
		let { rule: t } = await this.client.post("/api/v1/admin/livetv/series-rules", e);
		return t;
	}
	async updateSeriesRule(e, t) {
		let { rule: n } = await this.client.put(`/api/v1/admin/livetv/series-rules/${encodeURIComponent(e)}`, t);
		return n;
	}
	deleteSeriesRule(e) {
		return this.client.delete(`/api/v1/admin/livetv/series-rules/${encodeURIComponent(e)}`);
	}
}, Cd = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, wd = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, Td = ["aria-expanded"], Ed = { class: "admin-livetv__section-title-row" }, Dd = { class: "admin-livetv__section-summary" }, Od = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, kd = { class: "admin-livetv__toolbar" }, Ad = {
	key: 0,
	class: "admin-livetv__skel"
}, jd = {
	key: 2,
	class: "admin-livetv__card-grid"
}, Md = { class: "admin-livetv__card-head" }, Nd = { class: "admin-livetv__card-title-row" }, Pd = { class: "admin-livetv__card-name" }, Fd = { class: "admin-livetv__dl" }, Id = { class: "admin-livetv__card-actions" }, Ld = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Rd = ["aria-expanded"], zd = { class: "admin-livetv__section-title-row" }, Bd = { class: "admin-livetv__section-summary" }, Vd = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Hd = { class: "admin-livetv__toolbar" }, Ud = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Wd = ["aria-pressed", "onClick"], Gd = {
	key: 0,
	class: "admin-livetv__skel"
}, Kd = {
	key: 2,
	class: "admin-livetv__guide-grid",
	role: "list"
}, qd = ["onClick", "onKeydown"], Jd = { class: "admin-livetv__program-time" }, Yd = { class: "admin-livetv__program-title" }, Xd = {
	key: 0,
	class: "admin-livetv__program-desc"
}, Zd = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, Qd = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, $d = { class: "admin-livetv__program-meta" }, ef = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, tf = ["aria-expanded"], nf = { class: "admin-livetv__section-title-row" }, rf = { class: "admin-livetv__section-summary" }, af = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, of = { class: "admin-livetv__toolbar" }, sf = {
	class: "admin-livetv__segmented",
	role: "tablist",
	"aria-label": "Recording filter"
}, cf = ["aria-selected", "onClick"], lf = {
	key: 0,
	class: "admin-livetv__skel"
}, uf = {
	key: 2,
	class: "admin-livetv__rec-list"
}, df = { class: "admin-livetv__card-head" }, ff = { class: "admin-livetv__card-name" }, pf = { class: "admin-livetv__rec-meta" }, mf = { key: 0 }, hf = { class: "admin-livetv__card-actions" }, gf = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, _f = ["aria-expanded"], vf = { class: "admin-livetv__section-title-row" }, yf = { class: "admin-livetv__section-summary" }, bf = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, xf = { class: "admin-livetv__toolbar" }, Sf = {
	key: 0,
	class: "admin-livetv__skel"
}, Cf = {
	key: 2,
	class: "admin-livetv__rule-list"
}, wf = { class: "admin-livetv__rule-info" }, Tf = { class: "admin-livetv__rule-title" }, Ef = { class: "admin-livetv__rule-meta" }, Df = { class: "admin-livetv__field" }, Of = { class: "admin-livetv__field" }, kf = { class: "admin-livetv__field-row" }, Af = { class: "admin-livetv__field" }, jf = { class: "admin-livetv__field" }, Mf = { class: "admin-livetv__field-row" }, Nf = { class: "admin-livetv__field" }, Pf = { class: "admin-livetv__field" }, Ff = { class: "admin-livetv__field" }, If = { class: "admin-livetv__field" }, Lf = { class: "admin-livetv__field" }, Rf = ["value"], zf = { class: "admin-livetv__field" }, Bf = /*@__PURE__*/ j({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(r) {
		let a = r, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new Sd(a.client ?? new e({
			baseUrl: l.value,
			tokenStore: new c()
		})), p = n();
		function m(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function h(e, t) {
			let n = Math.round((t - e) / 60);
			if (n < 60) return `${n}m`;
			let r = Math.floor(n / 60), i = n % 60;
			return i > 0 ? `${r}h ${i}m` : `${r}h`;
		}
		function b(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString();
		}
		function x(e) {
			return (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function S(e) {
			return `${(e / 1024 / 1024).toFixed(1)} MB`;
		}
		function w(e, t) {
			return `S${String(e ?? 0).padStart(2, "0")}E${String(t ?? 0).padStart(2, "0")}`;
		}
		let j = R({
			tuners: !0,
			guide: !1,
			recordings: !1,
			seriesRules: !1
		});
		function M(e) {
			j[e] = !j[e];
		}
		let P = z([]);
		async function F() {
			try {
				P.value = await u.listChannels();
			} catch {}
		}
		let V = C(() => P.value.map((e) => ({
			value: e.id,
			label: `${e.name} (${e.number})`
		})));
		function te(e) {
			let t = P.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let H = z([]), W = z(!1), G = z(!1), K = z(!1), ne = R({});
		async function re() {
			W.value = !0;
			try {
				H.value = await u.listTuners(), G.value = !0;
			} catch (e) {
				p.error(m(e, "Failed to load tuners."));
			} finally {
				W.value = !1;
			}
		}
		async function Y() {
			if (!K.value) {
				K.value = !0;
				try {
					let e = await u.scanTuners();
					H.value = e, G.value = !0, p.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					p.error(m(e, "Tuner scan failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function oe(e) {
			if (!ne[e.tuner_id]) {
				ne[e.tuner_id] = !0;
				try {
					let t = await u.updateTuner(e.tuner_id, { enabled: !e.enabled });
					H.value = H.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					p.error(m(e, "Failed to update tuner."));
				} finally {
					ne[e.tuner_id] = !1;
				}
			}
		}
		let Q = z(null);
		async function se() {
			let e = Q.value;
			if (e) try {
				await u.deleteTuner(e.tuner_id), H.value = H.value.filter((t) => t.tuner_id !== e.tuner_id), p.success("Tuner removed."), Q.value = null;
			} catch (e) {
				p.error(m(e, "Failed to delete tuner.")), Q.value = null;
			}
		}
		let $ = C(() => W.value ? "Loading…" : H.value.length === 0 ? "No tuners found" : `${H.value.length} tuner${H.value.length === 1 ? "" : "s"} configured`), ce = z([]), le = z(!1), ue = z(!1), de = z(0), fe = z(null), pe = z(!1), me = [
			"Today",
			"+1 Day",
			"+2 Days"
		];
		async function he(e) {
			le.value = !0;
			try {
				let t = Math.floor(Date.now() / 1e3) + e * 86400, n = t + 86400;
				ce.value = await u.listGuide({
					from: t,
					to: n
				}), ue.value = !0;
			} catch (e) {
				p.error(m(e, "Failed to load guide."));
			} finally {
				le.value = !1;
			}
		}
		function ge(e) {
			de.value = e, he(e);
		}
		function _e(e) {
			fe.value = fe.value === e.id ? null : e.id;
		}
		async function ve() {
			if (!pe.value) {
				pe.value = !0;
				try {
					let e = await u.refreshGuide();
					p.success(`Guide refreshed. ${e} programmes imported.`), await he(de.value);
				} catch (e) {
					p.error(m(e, "Guide refresh failed."));
				} finally {
					pe.value = !1;
				}
			}
		}
		let ye = C(() => le.value ? "Loading…" : ce.value.length > 0 ? `${ce.value.length} programmes` : "No programmes"), be = z([]), xe = z(!1), Se = z(!1), Ce = z("all"), we = [
			{
				value: "all",
				label: "All Recordings"
			},
			{
				value: "upcoming",
				label: "Upcoming"
			},
			{
				value: "by-series",
				label: "By Series"
			}
		];
		async function Te() {
			xe.value = !0;
			try {
				be.value = await u.listRecordings(), Se.value = !0;
			} catch (e) {
				p.error(m(e, "Failed to load recordings."));
			} finally {
				xe.value = !1;
			}
		}
		let Ee = z(null);
		async function De() {
			let e = Ee.value;
			if (e) try {
				await u.deleteRecording(e.id), be.value = be.value.filter((t) => t.id !== e.id), p.success("Recording deleted."), Ee.value = null;
			} catch (e) {
				p.error(m(e, "Failed to delete recording.")), Ee.value = null;
			}
		}
		function Oe(e) {
			return e === "completed" ? "success" : e === "failed" ? "warning" : "neutral";
		}
		let ke = C(() => xe.value ? "Loading…" : `${be.value.length} recording${be.value.length === 1 ? "" : "s"}`), Ae = C(() => Ce.value === "upcoming" ? "No upcoming recordings." : Ce.value === "by-series" ? "No series recordings." : "No recordings yet."), je = z(!1), Me = z(""), Ne = z(""), Pe = z(""), Fe = z(""), Ie = z(""), Le = z(""), Re = z(!1);
		async function ze() {
			await F(), Me.value = P.value[0]?.id ?? "", Ne.value = "", Pe.value = "", Fe.value = "", Ie.value = "", Le.value = "", je.value = !0;
		}
		function Be() {
			je.value = !1;
		}
		async function Ve() {
			if (!Me.value) {
				p.error("Channel is required.");
				return;
			}
			if (!Ne.value.trim()) {
				p.error("Title is required.");
				return;
			}
			if (!Pe.value || !Fe.value || !Ie.value || !Le.value) {
				p.error("Start and end date/time are required.");
				return;
			}
			let e = Math.floor((/* @__PURE__ */ new Date(`${Pe.value}T${Fe.value}`)).getTime() / 1e3), t = Math.floor((/* @__PURE__ */ new Date(`${Ie.value}T${Le.value}`)).getTime() / 1e3);
			if (t <= e) {
				p.error("End must be after start.");
				return;
			}
			Re.value = !0;
			try {
				let n = await u.createRecording({
					channel_id: Me.value,
					start_time: e,
					end_time: t,
					title: Ne.value.trim()
				});
				be.value = [...be.value, n], p.success("Recording scheduled."), Be();
			} catch (e) {
				p.error(m(e, "Failed to schedule recording."));
			} finally {
				Re.value = !1;
			}
		}
		let He = z([]), Ue = z(!1), We = z(!1);
		async function Ge() {
			Ue.value = !0;
			try {
				He.value = await u.listSeriesRules(), We.value = !0;
			} catch (e) {
				p.error(m(e, "Failed to load series rules."));
			} finally {
				Ue.value = !1;
			}
		}
		let Ke = z(null);
		async function qe() {
			let e = Ke.value;
			if (e) try {
				await u.deleteSeriesRule(e.id), He.value = He.value.filter((t) => t.id !== e.id), p.success("Series rule deleted."), Ke.value = null;
			} catch (e) {
				p.error(m(e, "Failed to delete rule.")), Ke.value = null;
			}
		}
		let Je = C(() => Ue.value ? "Loading…" : `${He.value.length} rule${He.value.length === 1 ? "" : "s"}`), Ye = z(!1), Xe = z(""), Ze = z(""), Qe = z("space"), $e = z(3), et = z(!1), tt = [{
			value: "space",
			label: "Until space needed"
		}, {
			value: "forever",
			label: "Forever"
		}];
		async function nt() {
			await F(), Xe.value = "", Ze.value = P.value[0]?.id ?? "", Qe.value = "space", $e.value = 3, Ye.value = !0;
		}
		function rt() {
			Ye.value = !1;
		}
		async function it() {
			if (!Xe.value.trim()) {
				p.error("Title pattern is required.");
				return;
			}
			if (!Ze.value) {
				p.error("Channel is required.");
				return;
			}
			et.value = !0;
			try {
				let e = await u.createSeriesRule({
					series_id: `local-${Date.now()}`,
					channel_id: Ze.value,
					title: Xe.value.trim(),
					priority: $e.value,
					keep_until: Qe.value
				});
				He.value = [...He.value, e], p.success("Series rule created."), rt();
			} catch (e) {
				p.error(m(e, "Failed to create rule."));
			} finally {
				et.value = !1;
			}
		}
		return J(() => j.tuners, (e) => {
			e && !G.value && re();
		}, { immediate: !0 }), J(() => j.guide, (e) => {
			e && !ue.value && he(de.value);
		}), J(() => j.recordings, (e) => {
			e && !Se.value && Te();
		}), J(() => j.seriesRules, (e) => {
			e && !We.value && (Ge(), F());
		}), I(() => {}), (e, n) => (L(), D("section", Cd, [
			n[65] ||= O("header", { class: "admin-livetv__head" }, [O("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			O("section", wd, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => M("tuners")
			}, [O("span", Ed, [
				A(t, {
					name: "tv",
					class: "admin-livetv__section-icon"
				}),
				n[22] ||= O("h2", {
					id: "livetv-tuners-heading",
					class: "admin-livetv__section-title"
				}, "Tuners", -1),
				A(t, {
					name: j.tuners ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), O("span", Dd, U($.value), 1)], 8, Td), j.tuners ? (L(), D("div", Od, [O("div", kd, [A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: K.value,
				onClick: Y
			}, {
				default: X(() => [...n[23] ||= [k(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), W.value ? (L(), D("div", Ad, [A(o, {
				variant: "text",
				lines: 3
			})])) : H.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (L(), D("div", jd, [(L(!0), D(y, null, B(H.value, (e) => (L(), D("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				O("div", Md, [O("span", Nd, [A(_, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: X(() => [k(U(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), O("span", Pd, U(e.name), 1)]), A(_, { tone: e.enabled ? "success" : "neutral" }, {
					default: X(() => [k(U(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("dl", Fd, [
					n[27] ||= O("dt", null, "Host", -1),
					O("dd", null, U(e.host) + ":" + U(e.port), 1),
					e.device_id ? (L(), D(y, { key: 0 }, [n[24] ||= O("dt", null, "Device ID", -1), O("dd", null, U(e.device_id), 1)], 64)) : E("", !0),
					e.last_seen ? (L(), D(y, { key: 1 }, [n[25] ||= O("dt", null, "Last Seen", -1), O("dd", null, U(new Date(e.last_seen).toLocaleString()), 1)], 64)) : E("", !0),
					e.status ? (L(), D(y, { key: 2 }, [n[26] ||= O("dt", null, "Status", -1), O("dd", null, U(e.status), 1)], 64)) : E("", !0)
				]),
				O("div", Id, [A(v, {
					"model-value": !!e.enabled,
					disabled: ne[e.tuner_id],
					label: e.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": (t) => oe(e)
				}, null, 8, [
					"model-value",
					"disabled",
					"label",
					"onUpdate:modelValue"
				]), A(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Remove tuner ${e.name}`,
					onClick: (t) => Q.value = e
				}, {
					default: X(() => [...n[28] ||= [k(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : E("", !0)]),
			O("section", Ld, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => M("guide")
			}, [O("span", zd, [
				A(t, {
					name: "calendar",
					class: "admin-livetv__section-icon"
				}),
				n[29] ||= O("h2", {
					id: "livetv-guide-heading",
					class: "admin-livetv__section-title"
				}, "Guide / EPG", -1),
				A(t, {
					name: j.guide ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), O("span", Bd, U(ye.value), 1)], 8, Rd), j.guide ? (L(), D("div", Vd, [O("div", Hd, [O("div", Ud, [(L(), D(y, null, B(me, (e, t) => O("button", {
				key: e,
				type: "button",
				class: N(["admin-livetv__seg-btn", { "is-active": de.value === t }]),
				"aria-pressed": de.value === t,
				onClick: (e) => ge(t)
			}, U(e), 11, Wd)), 64))]), A(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: pe.value,
				onClick: ve
			}, {
				default: X(() => [...n[30] ||= [k(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), le.value ? (L(), D("div", Gd, [A(o, {
				variant: "text",
				lines: 4
			})])) : ce.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (L(), D("div", Kd, [(L(!0), D(y, null, B(ce.value, (e) => (L(), D("div", {
				key: e.id,
				class: N(["admin-livetv__program", { "is-selected": fe.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => _e(e),
				onKeydown: [ie(ae((t) => _e(e), ["prevent"]), ["enter"]), ie(ae((t) => _e(e), ["prevent"]), ["space"])]
			}, [
				O("div", Jd, U(x(e.start_time)) + " – " + U(x(e.end_time)), 1),
				O("div", Yd, U(e.title), 1),
				e.description && fe.value !== e.id ? (L(), D("p", Xd, U(e.description.slice(0, 100)) + U(e.description.length > 100 ? "…" : ""), 1)) : E("", !0),
				fe.value === e.id ? (L(), D("div", Zd, [e.description ? (L(), D("p", Qd, U(e.description), 1)) : E("", !0), O("div", $d, [
					e.rating ? (L(), T(_, {
						key: 0,
						tone: "neutral"
					}, {
						default: X(() => [k("Rating: " + U(e.rating), 1)]),
						_: 2
					}, 1024)) : E("", !0),
					e.season ? (L(), T(_, {
						key: 1,
						tone: "info"
					}, {
						default: X(() => [k(U(w(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : E("", !0),
					e.year ? (L(), T(_, {
						key: 2,
						tone: "neutral"
					}, {
						default: X(() => [k(U(e.year), 1)]),
						_: 2
					}, 1024)) : E("", !0)
				])])) : E("", !0)
			], 42, qd))), 128))]))])) : E("", !0)]),
			O("section", ef, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[2] ||= (e) => M("recordings")
			}, [O("span", nf, [
				A(t, {
					name: "film",
					class: "admin-livetv__section-icon"
				}),
				n[31] ||= O("h2", {
					id: "livetv-recordings-heading",
					class: "admin-livetv__section-title"
				}, "Recordings", -1),
				A(t, {
					name: j.recordings ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), O("span", rf, U(ke.value), 1)], 8, tf), j.recordings ? (L(), D("div", af, [O("div", of, [O("div", sf, [(L(), D(y, null, B(we, (e) => O("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: N(["admin-livetv__seg-btn", { "is-active": Ce.value === e.value }]),
				"aria-selected": Ce.value === e.value,
				onClick: (t) => Ce.value = e.value
			}, U(e.label), 11, cf)), 64))]), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: ze
			}, {
				default: X(() => [...n[32] ||= [k(" Schedule Recording ", -1)]]),
				_: 1
			})]), xe.value ? (L(), D("div", lf, [A(o, {
				variant: "text",
				lines: 3
			})])) : be.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "film",
				title: "No recordings",
				description: Ae.value
			}, null, 8, ["description"])) : (L(), D("div", uf, [(L(!0), D(y, null, B(be.value, (e) => (L(), D("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				O("div", df, [O("span", ff, U(e.program_title ?? "Untitled"), 1), e.status ? (L(), T(_, {
					key: 0,
					tone: Oe(e.status)
				}, {
					default: X(() => [k(U(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : E("", !0)]),
				O("div", pf, [
					O("span", null, U(e.channel_name ?? e.channel_id), 1),
					O("span", null, U(b(e.start_time)) + " · " + U(x(e.start_time)) + " – " + U(x(e.end_time)), 1),
					O("span", null, U(h(e.start_time, e.end_time)), 1),
					e.size ? (L(), D("span", mf, U(S(e.size)), 1)) : E("", !0)
				]),
				O("div", hf, [A(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => Ee.value = e
				}, {
					default: X(() => [...n[33] ||= [k(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : E("", !0)]),
			O("section", gf, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[3] ||= (e) => M("seriesRules")
			}, [O("span", vf, [
				A(t, {
					name: "list",
					class: "admin-livetv__section-icon"
				}),
				n[34] ||= O("h2", {
					id: "livetv-rules-heading",
					class: "admin-livetv__section-title"
				}, "Series Rules", -1),
				A(t, {
					name: j.seriesRules ? "chevron-up" : "chevron-down",
					class: "admin-livetv__chevron"
				}, null, 8, ["name"])
			]), O("span", yf, U(Je.value), 1)], 8, _f), j.seriesRules ? (L(), D("div", bf, [O("div", xf, [A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: nt
			}, {
				default: X(() => [...n[35] ||= [k("Add Rule", -1)]]),
				_: 1
			})]), Ue.value ? (L(), D("div", Sf, [A(o, {
				variant: "text",
				lines: 3
			})])) : He.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (L(), D("div", Cf, [(L(!0), D(y, null, B(He.value, (e) => (L(), D("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [O("div", wf, [O("span", Tf, U(e.title_pattern), 1), O("div", Ef, [
				O("span", null, U(te(e)), 1),
				e.priority ? (L(), T(_, {
					key: 0,
					tone: "info"
				}, {
					default: X(() => [k("Priority " + U(e.priority), 1)]),
					_: 2
				}, 1024)) : E("", !0),
				e.keep_until ? (L(), T(_, {
					key: 1,
					tone: "neutral"
				}, {
					default: X(() => [k("Keep: " + U(e.keep_until), 1)]),
					_: 2
				}, 1024)) : E("", !0)
			])]), A(i, {
				variant: "ghost",
				size: "sm",
				"aria-label": `Delete series rule ${e.title_pattern}`,
				onClick: (t) => Ke.value = e
			}, {
				default: X(() => [...n[36] ||= [k(" Delete ", -1)]]),
				_: 1
			}, 8, ["aria-label", "onClick"])]))), 128))]))])) : E("", !0)]),
			A(d, {
				modelValue: je.value,
				"onUpdate:modelValue": n[10] ||= (e) => je.value = e,
				title: "Schedule Recording",
				onClose: Be
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: Be
				}, {
					default: X(() => [...n[43] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: Re.value,
					onClick: Ve
				}, {
					default: X(() => [...n[44] ||= [k(" Schedule Recording ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-livetv__form",
					onSubmit: ae(Ve, ["prevent"])
				}, [
					O("label", Df, [n[37] ||= O("span", { class: "admin-livetv__label" }, "Title", -1), Z(O("input", {
						"onUpdate:modelValue": n[4] ||= (e) => Ne.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[q, Ne.value]])]),
					O("label", Of, [n[38] ||= O("span", { class: "admin-livetv__label" }, "Channel", -1), A(g, {
						modelValue: Me.value,
						"onUpdate:modelValue": n[5] ||= (e) => Me.value = e,
						options: V.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					O("div", kf, [O("label", Af, [n[39] ||= O("span", { class: "admin-livetv__label" }, "Start Date", -1), Z(O("input", {
						"onUpdate:modelValue": n[6] ||= (e) => Pe.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[q, Pe.value]])]), O("label", jf, [n[40] ||= O("span", { class: "admin-livetv__label" }, "Start Time", -1), Z(O("input", {
						"onUpdate:modelValue": n[7] ||= (e) => Fe.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[q, Fe.value]])])]),
					O("div", Mf, [O("label", Nf, [n[41] ||= O("span", { class: "admin-livetv__label" }, "End Date", -1), Z(O("input", {
						"onUpdate:modelValue": n[8] ||= (e) => Ie.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[q, Ie.value]])]), O("label", Pf, [n[42] ||= O("span", { class: "admin-livetv__label" }, "End Time", -1), Z(O("input", {
						"onUpdate:modelValue": n[9] ||= (e) => Le.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[q, Le.value]])])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			A(d, {
				modelValue: Ye.value,
				"onUpdate:modelValue": n[15] ||= (e) => Ye.value = e,
				title: "Add Series Rule",
				onClose: rt
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: rt
				}, {
					default: X(() => [...n[51] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: et.value,
					onClick: it
				}, {
					default: X(() => [...n[52] ||= [k("Add Rule", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-livetv__form",
					onSubmit: ae(it, ["prevent"])
				}, [
					O("label", Ff, [
						n[45] ||= O("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						Z(O("input", {
							"onUpdate:modelValue": n[11] ||= (e) => Xe.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[q, Xe.value]]),
						n[46] ||= O("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					O("label", If, [n[47] ||= O("span", { class: "admin-livetv__label" }, "Channel", -1), A(g, {
						modelValue: Ze.value,
						"onUpdate:modelValue": n[12] ||= (e) => Ze.value = e,
						options: V.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					O("label", Lf, [
						n[48] ||= O("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						O("input", {
							value: $e.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[13] ||= (e) => $e.value = Number(e.target.value)
						}, null, 40, Rf),
						n[49] ||= O("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					O("label", zf, [n[50] ||= O("span", { class: "admin-livetv__label" }, "Keep Until", -1), A(g, {
						modelValue: Qe.value,
						"onUpdate:modelValue": n[14] ||= (e) => Qe.value = e,
						options: tt,
						label: "Keep until"
					}, null, 8, ["modelValue"])])
				], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			A(d, {
				"model-value": Q.value !== null,
				title: "Remove tuner",
				size: "sm",
				"onUpdate:modelValue": n[17] ||= (e) => Q.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[16] ||= (e) => Q.value = null
				}, {
					default: X(() => [...n[55] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: se
				}, {
					default: X(() => [...n[56] ||= [k("Remove", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					n[53] ||= k("Remove tuner ", -1),
					O("strong", null, U(Q.value?.name), 1),
					n[54] ||= k("? This cannot be undone.", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				"model-value": Ee.value !== null,
				title: "Delete recording",
				size: "sm",
				"onUpdate:modelValue": n[19] ||= (e) => Ee.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[18] ||= (e) => Ee.value = null
				}, {
					default: X(() => [...n[59] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: De
				}, {
					default: X(() => [...n[60] ||= [k("Delete", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					n[57] ||= k(" Delete recording ", -1),
					O("strong", null, U(Ee.value?.program_title ?? Ee.value?.id), 1),
					n[58] ||= k("? ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				"model-value": Ke.value !== null,
				title: "Delete series rule",
				size: "sm",
				"onUpdate:modelValue": n[21] ||= (e) => Ke.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[20] ||= (e) => Ke.value = null
				}, {
					default: X(() => [...n[63] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: qe
				}, {
					default: X(() => [...n[64] ||= [k("Delete", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					n[61] ||= k("Delete series rule ", -1),
					O("strong", null, U(Ke.value?.title_pattern), 1),
					n[62] ||= k("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), Vf = /* @__PURE__ */ pe({ default: () => Hf }), Hf = /*#__PURE__*/ r(Bf, [["__scopeId", "data-v-d53b3ae8"]]);
//#endregion
//#region src/app/admin.ts
function Uf(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => Promise.resolve().then(() => Wo)
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => Promise.resolve().then(() => Os)
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => Promise.resolve().then(() => qa)
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => Promise.resolve().then(() => ic)
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => Promise.resolve().then(() => Sc)
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => Promise.resolve().then(() => ul)
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => Promise.resolve().then(() => Ll)
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => Promise.resolve().then(() => hu)
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => Promise.resolve().then(() => Tu)
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => Promise.resolve().then(() => bd)
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => Promise.resolve().then(() => Vf)
		}
	];
}
function Wf(e = "/app") {
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
			}
		]
	}];
}
//#endregion
//#region src/pages/LibraryScanPage.vue?vue&type=script&setup=true&lang.ts
var Gf = { class: "library-scan-page" }, Kf = {
	key: 0,
	class: "loading"
}, qf = {
	key: 1,
	class: "error"
}, Jf = {
	key: 2,
	class: "libraries-list"
}, Yf = { class: "library-info" }, Xf = { class: "library-name" }, Zf = { class: "library-type" }, Qf = { class: "library-paths" }, $f = { class: "library-meta" }, ep = { key: 0 }, tp = {
	key: 0,
	class: "scan-status"
}, np = { class: "library-actions" }, rp = ["onClick", "disabled"], ip = ["onClick", "disabled"], ap = {
	key: 0,
	class: "empty-state"
}, op = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "LibraryScanPage",
	setup(e) {
		let t = z([]), n = z({}), r = z(!0), i = z(null);
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
		return I(() => {
			a();
		}), (e, a) => (L(), D("div", Gf, [a[0] ||= O("div", { class: "scan-header" }, [O("h1", { class: "scan-title" }, "Library Scanner"), O("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), r.value ? (L(), D("div", Kf, "Loading libraries...")) : i.value ? (L(), D("div", qf, U(i.value), 1)) : (L(), D("div", Jf, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "library-card"
		}, [O("div", Yf, [
			O("h3", Xf, U(e.name), 1),
			O("span", Zf, U(e.type), 1),
			O("p", Qf, U(e.paths.join(", ")), 1),
			O("div", $f, [e.item_count === void 0 ? E("", !0) : (L(), D("span", ep, U(e.item_count) + " items", 1)), O("span", null, "Last scan: " + U(u(e.last_scan_at)), 1)]),
			n.value[e.id] ? (L(), D("div", tp, U(d(n.value[e.id])), 1)) : E("", !0)
		]), O("div", np, [O("button", {
			class: "btn btn-scan",
			onClick: (t) => c(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Scan ", 8, rp), O("button", {
			class: "btn btn-rescan",
			onClick: (t) => l(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Rescan ", 8, ip)])]))), 128)), t.value.length === 0 ? (L(), D("div", ap, " No libraries configured. Add a library to get started. ")) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), sp = { class: "my-servers-page" }, cp = {
	key: 0,
	class: "loading"
}, lp = {
	key: 1,
	class: "error"
}, up = {
	key: 2,
	class: "servers-list"
}, dp = { class: "server-info" }, fp = { class: "server-name" }, pp = { class: "server-url" }, mp = { class: "server-meta" }, hp = { key: 0 }, gp = {
	key: 0,
	class: "empty-state"
}, _p = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "MyServersPage",
	setup(e) {
		let t = z([]), n = z(!0), r = z(null);
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
		return I(() => {
			i();
		}), (e, i) => (L(), D("div", sp, [i[2] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "My Servers"), O("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), n.value ? (L(), D("div", cp, "Loading servers...")) : r.value ? (L(), D("div", lp, U(r.value), 1)) : (L(), D("div", up, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "server-card"
		}, [
			O("div", {
				class: "server-status",
				style: P({ backgroundColor: a(e.status) })
			}, null, 4),
			O("div", dp, [
				O("h3", fp, U(e.name), 1),
				O("p", pp, U(e.url), 1),
				O("div", mp, [
					O("span", null, U(e.owner), 1),
					e.library_count === void 0 ? E("", !0) : (L(), D("span", hp, U(e.library_count) + " libraries", 1)),
					O("span", null, "Last seen: " + U(o(e.last_seen)), 1)
				])
			]),
			i[0] ||= O("div", { class: "server-actions" }, [O("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), t.value.length === 0 ? (L(), D("div", gp, [...i[1] ||= [O("p", null, "No servers connected yet.", -1), O("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), vp = { class: "federation-page" }, yp = {
	key: 0,
	class: "loading"
}, bp = {
	key: 1,
	class: "error"
}, xp = {
	key: 2,
	class: "federation-content"
}, Sp = { class: "peers-section" }, Cp = { class: "peers-list" }, wp = { class: "peer-info" }, Tp = { class: "peer-name" }, Ep = { class: "peer-url" }, Dp = { class: "peer-meta" }, Op = { key: 0 }, kp = { class: "peer-actions" }, Ap = ["onClick"], jp = {
	key: 1,
	class: "status-badge"
}, Mp = {
	key: 0,
	class: "empty-state"
}, Np = { class: "add-peer-section" }, Pp = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "FederationPage",
	setup(e) {
		let t = z([]), n = z(!0), r = z(null);
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
		return I(() => {
			i();
		}), (e, i) => (L(), D("div", vp, [i[5] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "Federation"), O("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), n.value ? (L(), D("div", yp, "Loading federation peers...")) : r.value ? (L(), D("div", bp, U(r.value), 1)) : (L(), D("div", xp, [O("div", Sp, [i[2] ||= O("h2", { class: "section-title" }, "Connected Peers", -1), O("div", Cp, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "peer-card"
		}, [
			O("div", {
				class: "peer-status",
				style: P({ backgroundColor: c(e.status) })
			}, null, 4),
			O("div", wp, [
				O("h3", Tp, U(e.name), 1),
				O("p", Ep, U(e.url), 1),
				O("div", Dp, [e.shared_libraries_count === void 0 ? E("", !0) : (L(), D("span", Op, U(e.shared_libraries_count) + " shared libraries", 1)), O("span", null, "Last sync: " + U(l(e.last_sync)), 1)])
			]),
			O("div", kp, [e.status === "connected" ? (L(), D("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => o(e.id)
			}, " Disconnect ", 8, Ap)) : e.status === "pending" ? (L(), D("span", jp, "Pending")) : E("", !0)])
		]))), 128)), t.value.length === 0 ? (L(), D("div", Mp, [...i[1] ||= [O("p", null, "No federation peers connected.", -1)]])) : E("", !0)])]), O("div", Np, [i[4] ||= O("h2", { class: "section-title" }, "Add Peer", -1), O("form", {
			class: "add-peer-form",
			onSubmit: i[0] ||= ae((e) => a(""), ["prevent"])
		}, [...i[3] ||= [O("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), O("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), Fp = { class: "manage-shares-page" }, Ip = {
	key: 0,
	class: "loading"
}, Lp = {
	key: 1,
	class: "error"
}, Rp = {
	key: 2,
	class: "shares-list"
}, zp = { class: "share-info" }, Bp = { class: "share-library" }, Vp = { class: "share-meta" }, Hp = {
	key: 0,
	class: "expired-badge"
}, Up = { class: "share-dates" }, Wp = { key: 0 }, Gp = { class: "share-actions" }, Kp = ["onClick"], qp = {
	key: 0,
	class: "empty-state"
}, Jp = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "ManageSharesPage",
	setup(e) {
		let t = z([]), n = z(!0), r = z(null);
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
		return I(() => {
			i();
		}), (e, i) => (L(), D("div", Fp, [i[1] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "Manage Shares"), O("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), n.value ? (L(), D("div", Ip, "Loading shares...")) : r.value ? (L(), D("div", Lp, U(r.value), 1)) : (L(), D("div", Rp, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "share-card"
		}, [O("div", zp, [
			O("h3", Bp, U(e.library_name), 1),
			O("div", Vp, [
				O("span", null, "Shared with: " + U(e.shared_with), 1),
				O("span", { class: N(["permission-badge", e.permissions]) }, U(e.permissions), 3),
				e.expires_at && c(e.expires_at) ? (L(), D("span", Hp, "Expired")) : E("", !0)
			]),
			O("p", Up, [k(" Created: " + U(o(e.created_at)) + " ", 1), e.expires_at ? (L(), D("span", Wp, " | Expires: " + U(o(e.expires_at)), 1)) : E("", !0)])
		]), O("div", Gp, [O("button", {
			class: "btn btn-danger",
			onClick: (t) => a(e.id)
		}, "Revoke", 8, Kp)])]))), 128)), t.value.length === 0 ? (L(), D("div", qp, [...i[0] ||= [O("p", null, "No library shares found.", -1)]])) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), Yp = { class: "audit-logs-page" }, Xp = {
	key: 0,
	class: "loading"
}, Zp = {
	key: 1,
	class: "error"
}, Qp = {
	key: 2,
	class: "logs-container"
}, $p = { class: "logs-list" }, em = { class: "log-content" }, tm = { class: "log-header" }, nm = { class: "log-action" }, rm = { class: "log-actor" }, im = { class: "log-time" }, am = {
	key: 0,
	class: "log-target"
}, om = {
	key: 1,
	class: "log-details"
}, sm = {
	key: 2,
	class: "log-ip"
}, cm = {
	key: 0,
	class: "empty-state"
}, lm = {
	key: 0,
	class: "pagination"
}, um = ["disabled"], dm = { class: "page-info" }, fm = ["disabled"], pm = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "AuditLogsPage",
	setup(e) {
		let t = z([]), n = z(!0), r = z(null), i = z(1), a = z(1);
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
		return I(() => {
			o();
		}), (e, s) => (L(), D("div", Yp, [s[3] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "Audit Logs"), O("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), n.value ? (L(), D("div", Xp, "Loading audit logs...")) : r.value ? (L(), D("div", Zp, U(r.value), 1)) : (L(), D("div", Qp, [O("div", $p, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "log-entry"
		}, [O("div", {
			class: "log-icon",
			style: P({ backgroundColor: l(e.action) })
		}, U(u(e.action)), 5), O("div", em, [
			O("div", tm, [
				O("span", nm, U(e.action), 1),
				O("span", rm, U(e.actor), 1),
				O("span", im, U(c(e.created_at)), 1)
			]),
			e.target ? (L(), D("p", am, "Target: " + U(e.target), 1)) : E("", !0),
			e.details ? (L(), D("p", om, U(e.details), 1)) : E("", !0),
			e.ip_address ? (L(), D("span", sm, "IP: " + U(e.ip_address), 1)) : E("", !0)
		])]))), 128)), t.value.length === 0 ? (L(), D("div", cm, [...s[2] ||= [O("p", null, "No audit logs found.", -1)]])) : E("", !0)]), a.value > 1 ? (L(), D("div", lm, [
			O("button", {
				class: "btn btn-secondary",
				disabled: i.value <= 1,
				onClick: s[0] ||= (e) => o(i.value - 1)
			}, " Previous ", 8, um),
			O("span", dm, "Page " + U(i.value) + " of " + U(a.value), 1),
			O("button", {
				class: "btn btn-secondary",
				disabled: i.value >= a.value,
				onClick: s[1] ||= (e) => o(i.value + 1)
			}, " Next ", 8, fm)
		])) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function mm(e, t) {
	let n = yt(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
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
export { La as ALL_LOGS, zr as ARROW_ICONS, Br as ARROW_LABELS, fl as AdminBackupApi, Rl as AdminBackupPage, Ul as AdminCastApi, gu as AdminCastDevicesPage, no as AdminDashboardApi, Go as AdminDashboardPage, _u as AdminDlnaServerApi, Eu as AdminDlnaServerPage, wc as AdminIntegrationsApi, dl as AdminIntegrationsPage, Sd as AdminLiveTvApi, Hf as AdminLiveTvPage, Ra as AdminLogsApi, Ja as AdminLogsPage, Du as AdminRemoteAccessApi, xd as AdminRemoteAccessPage, oc as AdminServicesApi, Cc as AdminServicesPage, Jo as AdminUsersApi, ks as AdminUsersPage, Ms as AdminWebhooksApi, ac as AdminWebhooksPage, e as ApiClient, a as ApiError, fa as AppBackdrop, Ce as AppLayout, pm as AuditLogsPage, _ as Badge, ir as BrowsePage, i as Button, Sn as Chip, kn as Combobox, Ye as CommandPalette, Ne as DEFAULT_PREFERENCES, f as EmptyState, Pp as FederationPage, Qn as FilterBar, t as Icon, u as IconButton, Ee as Kbd, op as LibraryScanPage, c as LocalStorageTokenStore, ki as LoginForm, Mi as LoginPage, Jp as ManageSharesPage, Yt as MediaCard, Er as MediaDetail, jr as MediaDetailPage, an as MediaGrid, vn as MediaHomeRow, hn as MediaRow, d as Modal, _p as MyServersPage, Rr as PLAYER_SHORTCUTS, Ia as PageTransition, ft as PhlixApp, gi as Player, bi as PlayerPage, ri as QualityMenu, Ko as RATING_LABELS, qo as RATING_OPTIONS, xt as RESUME_MAX_RATIO, bt as RESUME_MIN_SECONDS, Fa as Reveal, js as SUBSCRIBABLE_EVENTS, Lr as Scrubber, g as Select, aa as SettingsForm, sa as SettingsPage, va as Sheet, Zr as ShortcutsHelp, Ui as SignupForm, Ki as SignupPage, o as Skeleton, $r as Slider, ni as SpeedMenu, ka as Spinner, v as Switch, Pa as Tabs, Da as ToastHost, ba as Tooltip, ti as VolumeControl, As as WEBHOOK_EVENT_CATEGORIES, Wf as adminMenu, ot as applyStoredThemeEarly, mm as bindMediaStoreToRouter, Uf as buildAdminRoutes, gn as buildMediaQuery, _n as buildMediaUrl, ua as createPhlixApp, rt as deriveAccentVars, Mr as formatTime, ke as fuzzyScore, Ur as handleShortcut, Le as hasStoredPreferences, Hr as isTypingTarget, Ae as matchCommand, Ie as readStoredPreferences, xi as useAuthStore, Me as useCommandStore, l as useFocusTrap, Wr as useKeyboardShortcuts, yt as useMediaStore, Tt as usePlayerStore, ze as usePreferencesStore, st as useTheme, n as useToastStore };

//# sourceMappingURL=phlix-ui.js.map