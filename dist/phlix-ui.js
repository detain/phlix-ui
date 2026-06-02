import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c } from "./tokenStore-SjxKwmod.js";
import { n as l, r as u, t as d } from "./Modal-D0ntqq7y.js";
import { t as f } from "./EmptyState-sJb64K4c.js";
import { i as p, n as m, r as h, t as g } from "./Select-CfjCFQKH.js";
import { t as _ } from "./Badge-wMoO7SFO.js";
import { t as v } from "./Switch-V3wRpG4-.js";
import { Fragment as y, Teleport as b, Transition as x, TransitionGroup as S, computed as C, createApp as w, createBlock as T, createCommentVNode as E, createElementBlock as D, createElementVNode as O, createTextVNode as k, createVNode as A, defineComponent as j, inject as ee, nextTick as M, normalizeClass as N, normalizeStyle as P, onBeforeUnmount as F, onMounted as I, openBlock as L, reactive as R, ref as z, renderList as B, renderSlot as V, resolveComponent as H, resolveDynamicComponent as U, toDisplayString as W, toRef as G, unref as K, useId as q, vModelDynamic as te, vModelText as J, vShow as ne, watch as Y, watchEffect as re, withCtx as X, withDirectives as Z, withKeys as ie, withModifiers as ae } from "vue";
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
		}, W(e), 1))), 128)) : (L(), D("kbd", Te, [V(e.$slots, "default", {}, void 0, !0)]))]));
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
	return Y(r, (e) => {
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
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, Pe = {
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
	captionStyle: { ...Ne },
	atmosphere: !0,
	filterPresets: []
};
function Fe(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var Ie = "phlix.prefs";
function Le() {
	if (typeof localStorage > "u") return { ...Pe };
	try {
		let e = localStorage.getItem(Ie);
		if (!e) return { ...Pe };
		let t = JSON.parse(e);
		return {
			...Pe,
			...t
		};
	} catch {
		return { ...Pe };
	}
}
function Re() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(Ie) !== null;
	} catch {
		return !1;
	}
}
function ze() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var Be = Q("phlix-prefs", () => {
	let e = Le(), t = z(e.theme), n = z(e.accent), r = z(e.density), i = z(e.cardSize), a = z(e.gridDensity), o = z(e.reducedMotion), s = z(e.autoplay), c = z(e.defaultVolume), l = z(e.defaultQuality), u = z(e.defaultSubtitleLang), d = z({
		...Ne,
		...e.captionStyle
	}), f = z(e.atmosphere), p = z(e.filterPresets ? [...e.filterPresets] : []), m = z(ze()), h = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (h = window.matchMedia("(prefers-reduced-motion: reduce)"), h.addEventListener?.("change", (e) => m.value = e.matches));
	let g = C(() => o.value === "on" ? !0 : o.value === "off" ? !1 : m.value);
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
			id: Fe(e),
			name: e.trim(),
			query: t
		}, r = p.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? p.value.splice(r, 1, n) : p.value.push(n), n;
	}
	function y(e) {
		p.value = p.value.filter((t) => t.id !== e);
	}
	Y(_, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Ie, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = Pe;
		t.value = e.theme, n.value = e.accent, r.value = e.density, i.value = e.cardSize, a.value = e.gridDensity, o.value = e.reducedMotion, s.value = e.autoplay, c.value = e.defaultVolume, l.value = e.defaultQuality, u.value = e.defaultSubtitleLang, d.value = { ...Ne }, f.value = e.atmosphere, p.value = [...e.filterPresets];
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
}), Ve = { class: "phlix-cmdk__search" }, He = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], Ue = ["id"], We = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, Ge = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], Ke = { class: "phlix-cmdk__option-body" }, qe = { class: "phlix-cmdk__option-title" }, Je = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, Ye = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, Xe = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "CommandPalette",
	setup(e) {
		let n = Me(), r = de(), i = Be(), a = z(null), o = q(), s = z(0);
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
		Y(() => n.query, () => {
			s.value = 0;
		}), Y(f, (e) => {
			s.value > e - 1 && (s.value = Math.max(0, e - 1));
		}), Y(() => n.open, (e) => {
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
			default: X(() => [K(n).open ? (L(), D("div", {
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
			}, [O("div", Ve, [
				A(t, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				O("input", {
					value: K(n).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": K(o),
					"aria-activedescendant": p.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: r[0] ||= (e) => K(n).setQuery(e.target.value),
					onKeydown: v
				}, null, 40, He),
				A(Ee, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), O("ul", {
				id: K(o),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(L(!0), D(y, null, B(d.value.rows, (e, n) => (L(), D(y, { key: e.kind === "header" ? `h-${e.label}-${n}` : e.item.id }, [e.kind === "header" ? (L(), D("li", We, W(e.label), 1)) : (L(), D("li", {
				key: 1,
				id: `${K(o)}-opt-${e.index}`,
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
				O("span", Ke, [O("span", qe, W(e.item.title), 1), e.item.subtitle ? (L(), D("span", Je, W(e.item.subtitle), 1)) : E("", !0)]),
				e.item.shortcut ? (L(), T(Ee, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : E("", !0)
			], 42, Ge))], 64))), 128)), f.value ? E("", !0) : (L(), D("li", Ye, " No matching commands "))], 8, Ue)], 512)], 32)) : E("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]);
//#endregion
//#region src/composables/color.ts
function Ze(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Qe = (e) => Math.max(0, Math.min(255, Math.round(e))), $e = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Qe(e).toString(16).padStart(2, "0")).join("");
function et(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function tt(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var nt = ({ r: e, g: t, b: n }, r) => `rgba(${Qe(e)}, ${Qe(t)}, ${Qe(n)}, ${r})`;
function rt({ r: e, g: t, b: n }) {
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
function it(e) {
	let t = Ze(e);
	if (!t) return null;
	let n = rt(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": $e(t),
		"--accent-hover": $e(et(t, .12)),
		"--accent-active": $e(tt(t, .12)),
		"--accent-soft": nt(t, .14),
		"--accent-ring": nt(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var at = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function ot(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? it(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of at) n.style.removeProperty(e);
}
function st(e) {
	let t = Le();
	e && !Re() && (t.theme = e), ot(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function ct() {
	let e = Be();
	return re(() => {
		ot({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var lt = ["src", "alt"], ut = { class: "brand-wordmark" }, dt = {
	key: 1,
	class: "brand-tagline"
}, ft = { class: "main-nav" }, pt = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "PhlixApp",
	setup(e) {
		ct();
		let n = Me(), r = ee("phlixConfig", null), i = C(() => r?.branding ?? {}), a = C(() => i.value.wordmark ?? "Phlix"), o = C(() => r?.menu ?? []), s = C(() => r?.routerBase ?? "/app");
		function c(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, r) => (L(), T(Ce, null, {
			logo: X(() => [A(K(se), {
				to: s.value,
				class: "brand"
			}, {
				default: X(() => [
					i.value.logoSrc ? (L(), D("img", {
						key: 0,
						src: i.value.logoSrc,
						alt: i.value.logoAlt ?? a.value,
						class: "brand-logo"
					}, null, 8, lt)) : E("", !0),
					O("span", ut, W(a.value), 1),
					i.value.tagline ? (L(), D("span", dt, W(i.value.tagline), 1)) : E("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: X(() => [O("nav", ft, [o.value.length ? (L(!0), D(y, { key: 0 }, B(o.value, (e) => (L(), T(U(e.href ? "a" : K(se)), {
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
				}, null, 8, ["name"])) : E("", !0), k(" " + W(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (L(), D(y, { key: 1 }, [A(K(se), {
				to: s.value,
				class: "nav-link"
			}, {
				default: X(() => [...r[1] ||= [k("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), A(K(se), {
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
				onClick: r[0] ||= (e) => K(n).openPalette()
			})])]),
			default: X(() => [A(K($)), A(Xe)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-78cfb9e9"]]), mt = { class: "phlix-placeholder" }, ht = { class: "placeholder-content" }, gt = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (L(), D("div", mt, [O("div", ht, [n[0] ||= O("h1", null, "Shared UI loading...", -1), O("p", null, "Phlix " + W(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), _t = 6e4, vt = 250;
function yt(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var bt = Q("media", () => {
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
		return !!e && Date.now() - e.ts < _t;
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
			if (yt(e)) return;
			(t || a === E) && (i.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === E) && (r.value = !1);
		}
	}
	function M(e, t = vt) {
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
	function H(e) {
		a.value = e, m.value = 0;
	}
	function U(e) {
		o.value = e, m.value = 0;
	}
	function W(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function G(e) {
		l.value = e, m.value = 0;
	}
	function K(e) {
		u.value = e, m.value = 0;
	}
	function q(e, t) {
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
		setSearch: H,
		setGenres: U,
		setYearRange: W,
		setRatings: G,
		setTypes: K,
		setSort: q
	};
}), xt = 30, St = .95, Ct = 5e3, wt = "phlix.resume";
function Tt() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(wt);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Et = Q("phlix-player", () => {
	let e = Be(), t = z(null), n = z([]), r = z(!1), i = z(0), a = z(0), o = z(0), s = z(e.defaultVolume), c = z(!1), l = z(1), u = z(e.defaultQuality), d = z(e.defaultSubtitleLang), f = z(!1), p = z(Tt()), m = C(() => a.value > 0 ? i.value / a.value : 0), h = C(() => n.value[0] ?? null), g, _ = 0;
	function v(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			_ = Date.now();
			try {
				localStorage.setItem(wt, JSON.stringify(p.value));
			} catch {}
		}, n = Date.now() - _;
		clearTimeout(g), e || n >= Ct ? t() : g = setTimeout(t, Ct - n);
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
}), Dt = { class: "media-card" }, Ot = { class: "media-card__poster" }, kt = ["href", "aria-label"], At = { class: "visually-hidden" }, jt = ["src", "alt"], Mt = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Nt = { class: "media-card__badges" }, Pt = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Ft = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, It = ["aria-valuenow", "aria-label"], Lt = { class: "media-card__overlay" }, Rt = { class: "media-card__title" }, zt = { class: "media-card__meta" }, Bt = {
	key: 0,
	class: "numeric"
}, Vt = {
	key: 1,
	class: "media-card__dot"
}, Ht = {
	key: 2,
	class: "media-card__cert"
}, Ut = {
	key: 3,
	class: "media-card__dot"
}, Wt = {
	key: 4,
	class: "numeric"
}, Gt = {
	key: 0,
	class: "media-card__genres"
}, Kt = { class: "media-card__actions" }, qt = { class: "media-card__caption" }, Jt = ["title"], Yt = { class: "media-card__caption-sub numeric" }, Xt = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = Et(), o = C(() => r.to ?? `/app/player/${r.item.id}`), s = z(!1), c = z(null);
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
		return (n, r) => (L(), D("article", Dt, [O("div", Ot, [
			O("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [O("span", At, W(e.item.name), 1)], 8, kt),
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
			}, null, 42, jt)) : (L(), D("div", Mt, [A(t, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			O("div", Nt, [
				u.value ? (L(), D("span", Pt, "New")) : E("", !0),
				V(n.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (L(), D("span", Ft, W(e.quality), 1)) : E("", !0)
			]),
			d.value > 0 ? (L(), D("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [O("i", { style: P({ width: `${d.value * 100}%` }) }, null, 4)], 8, It)) : E("", !0),
			O("div", Lt, [
				O("h3", Rt, W(e.item.name), 1),
				O("div", zt, [
					e.item.year ? (L(), D("span", Bt, W(e.item.year), 1)) : E("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (L(), D("span", Vt)) : E("", !0),
					e.item.rating ? (L(), D("span", Ht, W(e.item.rating), 1)) : E("", !0),
					e.item.rating && e.item.runtime ? (L(), D("span", Ut)) : E("", !0),
					e.item.runtime ? (L(), D("span", Wt, W(e.item.runtime) + "m", 1)) : E("", !0)
				]),
				f.value.length ? (L(), D("div", Gt, [(L(!0), D(y, null, B(f.value, (e) => (L(), D("span", { key: e }, W(e), 1))), 128))])) : E("", !0),
				O("div", Kt, [
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
		]), O("div", qt, [O("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, W(e.item.name), 9, Jt), O("div", Yt, [
			e.item.year ? (L(), D(y, { key: 0 }, [k(W(e.item.year), 1)], 64)) : E("", !0),
			e.item.year && e.item.runtime ? (L(), D(y, { key: 1 }, [k(" · ")], 64)) : E("", !0),
			e.item.runtime ? (L(), D(y, { key: 2 }, [k(W(e.item.runtime) + "m", 1)], 64)) : E("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), Zt = 3 / 2;
function Qt(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function $t(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function en(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * Zt + t + n;
}
function tn(e) {
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
var nn = { class: "media-grid-root" }, rn = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, an = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, on = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = Be(), o = C(() => r.cardSize ?? a.cardSize ?? 180), s = z(null), c = z(null), l = z(0), u = z(0), d = z(0);
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
		let h = C(() => Qt(l.value, o.value, 20)), g = C(() => en($t(l.value, h.value, 20))), _ = C(() => l.value > 0 && g.value > 0), v = C(() => tn({
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
		function H() {
			R || typeof IntersectionObserver > "u" || (R = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && r.hasMore && !r.loading && !r.loadingMore && i("load-more");
			}, { rootMargin: "400px 0px" }), c.value && R.observe(c.value));
		}
		function U() {
			R?.disconnect(), R = null;
		}
		Y(() => c.value, (e) => {
			U(), e && (H(), m());
		});
		let W = null;
		function G() {
			W || typeof ResizeObserver > "u" || !s.value || (W = new ResizeObserver(m), W.observe(s.value));
		}
		function K() {
			W?.disconnect(), W = null;
		}
		return Y(() => s.value, (e) => {
			K(), e && (G(), m());
		}), I(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("resize", m, { passive: !0 })), G(), H();
		}), F(() => {
			typeof window < "u" && (window.removeEventListener("scroll", m), window.removeEventListener("resize", m)), p &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), 0), K(), U();
		}), Y(() => r.items.length, () => M(m)), (n, r) => (L(), D("div", nn, [e.loading && e.items.length === 0 ? (L(), D("div", {
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
		]]))), 128))], 4)) : e.items.length === 0 ? (L(), D("div", rn, [V(n.$slots, "empty", {}, () => [
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
			}, () => [A(Xt, {
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
			e.loadingMore ? (L(), D("div", an, [...r[3] ||= [O("span", {
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
}), [["__scopeId", "data-v-b9e31bb0"]]), sn = ["aria-label"], cn = { class: "media-row__head" }, ln = { class: "media-row__title" }, un = {
	key: 0,
	class: "media-row__count numeric"
}, dn = { class: "media-row__action" }, fn = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, pn = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, mn = { class: "media-row__skel-poster" }, hn = ["aria-label"], gn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}, [O("div", cn, [
			O("h2", ln, W(e.title), 1),
			e.count == null ? E("", !0) : (L(), D("span", un, W(e.count.toLocaleString()), 1)),
			O("div", dn, [V(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (L(), D("div", fn, [O("span", null, W(e.error), 1), O("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (L(), D("div", pn, [(L(!0), D(y, null, B(e.skeletonCount, (e) => (L(), D("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [O("div", mn, [A(o, {
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
		}, [A(Xt, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, hn))], 8, sn));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function _n(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function vn(e, t = {}) {
	return `${e}/api/v1/media?${_n(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var yn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
					let t = new e({ baseUrl: i.apiBase }), n = vn(i.apiBase, {
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
		}, [A(gn, {
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
}), [["__scopeId", "data-v-fb0faca3"]]), bn = ["disabled", "aria-pressed"], xn = { class: "phlix-chip__label" }, Sn = ["disabled", "aria-label"], Cn = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}, null, 8, ["name"])) : E("", !0), O("span", xn, [V(n.$slots, "default", {}, void 0, !0)])], 8, bn), e.removable ? (L(), D("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: r[0] ||= (e) => i("remove")
		}, [A(t, { name: "x" })], 8, Sn)) : E("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), wn = { class: "phlix-combobox__field" }, Tn = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], En = ["id", "aria-label"], Dn = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], On = { class: "phlix-combobox__check" }, kn = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, An = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = C(() => p(r.options)), o = q(), s = z(!1), c = z(-1), l = z(""), u = z(!1), d = z(null), f = z(null), g = z(null), _ = C(() => a.value.find((e) => e.value === r.modelValue)?.label ?? ""), v = C(() => {
			if (!u.value || l.value.trim() === "") return a.value;
			let e = l.value.toLowerCase();
			return a.value.filter((t) => t.label.toLowerCase().includes(e));
		}), b = C(() => c.value >= 0 ? `${o}-opt-${c.value}` : void 0);
		Y(() => r.modelValue, () => {
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
		return Y(s, (e) => {
			e ? document.addEventListener("pointerdown", R, !0) : document.removeEventListener("pointerdown", R, !0);
		}), F(() => document.removeEventListener("pointerdown", R, !0)), (n, r) => (L(), D("div", {
			ref_key: "rootEl",
			ref: d,
			class: N(["phlix-combobox", {
				"is-open": s.value,
				"is-disabled": e.disabled
			}])
		}, [O("div", wn, [
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
				"aria-controls": s.value ? `${K(o)}-list` : void 0,
				"aria-activedescendant": s.value ? b.value : void 0,
				"aria-label": e.label,
				placeholder: e.placeholder,
				disabled: e.disabled,
				value: l.value,
				onInput: P,
				onFocus: x,
				onKeydown: I
			}, null, 40, Tn),
			A(t, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Z(O("ul", {
			id: `${K(o)}-list`,
			ref_key: "listEl",
			ref: g,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(L(!0), D(y, null, B(v.value, (n, r) => (L(), D("li", {
			id: `${K(o)}-opt-${r}`,
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
		}, [O("span", On, [n.value === e.modelValue ? (L(), T(t, {
			key: 0,
			name: "check"
		})) : E("", !0)]), k(" " + W(n.label), 1)], 42, Dn))), 128)), v.value.length === 0 ? (L(), D("li", kn, "No matches")) : E("", !0)], 8, En), [[ne, s.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), jn = { class: "filterbar__main" }, Mn = { class: "filterbar__search" }, Nn = { class: "filterbar__sort" }, Pn = ["aria-label"], Fn = ["aria-expanded"], In = { class: "filterbar__advanced" }, Ln = { class: "filterbar__field" }, Rn = { class: "filterbar__field" }, zn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Bn = { class: "filterbar__field" }, Vn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Hn = { class: "filterbar__field" }, Un = { class: "filterbar__years" }, Wn = { class: "filterbar__field filterbar__presets" }, Gn = { class: "filterbar__chips" }, Kn = {
	key: 0,
	class: "filterbar__presets-empty"
}, qn = {
	key: 0,
	class: "filterbar__preset-save"
}, Jn = ["onKeydown"], Yn = ["disabled"], Xn = { class: "filterbar__active" }, Zn = {
	class: "filterbar__count",
	"aria-live": "polite"
}, Qn = { class: "filterbar__pills" }, $n = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = bt(), o = Be(), s = [
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
		Y(() => a.search, (e) => {
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
		}), V = C(() => R.value.length > 0), H = C(() => a.selectedGenres.length + a.selectedRatings.length + a.selectedTypes.length + (a.yearFrom === void 0 ? 0 : 1) + (a.yearTo === void 0 ? 0 : 1));
		function U() {
			c.value = "", a.setSearch(""), a.setGenres([]), a.setRatings([]), a.setTypes([]), a.setYearRange(void 0, void 0), i("change");
		}
		let G = z(!1), q = C(() => o.filterPresets), te = z(!1), re = z("");
		function oe() {
			te.value = !0, re.value = "";
		}
		function Q() {
			let e = re.value.trim();
			e && (o.saveFilterPreset(e, a.toQuery()), te.value = !1, re.value = "");
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
			O("div", jn, [
				O("label", Mn, [
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
					}, null, 544), [[J, c.value]]),
					c.value ? (L(), D("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: d
					}, [A(t, { name: "x" })])) : E("", !0)
				]),
				O("div", Nn, [A(g, {
					"model-value": K(a).sort,
					options: s,
					label: "Sort by",
					"onUpdate:modelValue": M
				}, null, 8, ["model-value"]), O("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${K(a).order === "asc" ? "ascending" : "descending"}`,
					onClick: P
				}, [A(t, { name: K(a).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, Pn)]),
				O("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": G.value,
					onClick: r[1] ||= (e) => G.value = !G.value
				}, [
					A(t, { name: "filter" }),
					r[4] ||= O("span", null, "Filters", -1),
					H.value ? (L(), T(_, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: X(() => [k(W(H.value), 1)]),
						_: 1
					})) : E("", !0),
					A(t, {
						name: G.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, Fn)
			]),
			A(x, { name: "filterbar-panel" }, {
				default: X(() => [Z(O("div", In, [
					O("div", Ln, [r[5] ||= O("span", { class: "filterbar__field-label" }, "Genres", -1), (L(), T(An, {
						key: p.value,
						"model-value": f.value,
						options: m.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": h
					}, null, 8, ["model-value", "options"]))]),
					O("div", Rn, [r[6] ||= O("span", { class: "filterbar__field-label" }, "Rating", -1), O("div", zn, [(L(!0), D(y, null, B(K(a).availableRatings, (e) => (L(), T(Cn, {
						key: e,
						selected: K(a).selectedRatings.includes(e),
						"onUpdate:selected": (t) => v(e)
					}, {
						default: X(() => [k(W(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					O("div", Bn, [r[7] ||= O("span", { class: "filterbar__field-label" }, "Type", -1), O("div", Vn, [(L(!0), D(y, null, B(K(a).availableTypes, (e) => (L(), T(Cn, {
						key: e,
						selected: K(a).selectedTypes.includes(e),
						"onUpdate:selected": (t) => b(e)
					}, {
						default: X(() => [k(W(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					O("div", Hn, [r[9] ||= O("span", { class: "filterbar__field-label" }, "Year", -1), O("div", Un, [
						A(An, {
							"model-value": K(a).yearFrom ?? null,
							options: w.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": j
						}, null, 8, ["model-value", "options"]),
						r[8] ||= O("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						A(An, {
							"model-value": K(a).yearTo ?? null,
							options: w.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": ee
						}, null, 8, ["model-value", "options"])
					])]),
					O("div", Wn, [
						r[12] ||= O("span", { class: "filterbar__field-label" }, "Presets", -1),
						O("div", Gn, [(L(!0), D(y, null, B(q.value, (e) => (L(), T(Cn, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => se(e),
							onRemove: (t) => $(e)
						}, {
							default: X(() => [k(W(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), q.value.length ? E("", !0) : (L(), D("span", Kn, "No saved presets"))]),
						te.value ? (L(), D("div", qn, [Z(O("input", {
							"onUpdate:modelValue": r[2] ||= (e) => re.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [ie(ae(Q, ["prevent"]), ["enter"]), r[3] ||= ie((e) => te.value = !1, ["esc"])]
						}, null, 40, Jn), [[J, re.value]]), O("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: Q
						}, [A(t, { name: "check" }), r[10] ||= k(" Save ", -1)])])) : (L(), D("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !V.value,
							onClick: oe
						}, [A(t, { name: "plus" }), r[11] ||= k(" Save current ", -1)], 8, Yn))
					])
				], 512), [[ne, G.value]])]),
				_: 1
			}),
			O("div", Xn, [O("span", Zn, [O("b", null, W(K(a).total.toLocaleString()), 1), k(" " + W(K(a).total === 1 ? "title" : "titles"), 1)]), V.value ? (L(), D(y, { key: 0 }, [O("div", Qn, [(L(!0), D(y, null, B(R.value, (e) => (L(), T(Cn, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: X(() => [k(W(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), O("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: U
			}, "Clear all")], 64)) : E("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), er = { class: "browse-page" }, tr = { class: "browse-toolbar" }, nr = { class: "browse-header" }, rr = { class: "browse-count numeric" }, ir = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, ar = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "BrowsePage",
	setup(e) {
		let t = ee("apiBase", ""), r = C(() => typeof t == "string" ? t : t?.value ?? ""), i = ee("phlixConfig", null), a = C(() => i?.homeRows ?? []), o = bt(), s = Et(), c = n(), l = de(), u = z(null), d = R(/* @__PURE__ */ new Map());
		function f(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		Y(() => o.items, (e) => f(e), { immediate: !0 });
		let p = C(() => {
			let e = s.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function m() {
			o.reset(), o.fetchMedia(r.value);
		}
		I(m), Y(r, m);
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
		return (e, t) => (L(), D("div", er, [
			O("div", tr, [V(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			p.value.length ? (L(), T(gn, {
				key: 0,
				title: "Continue Watching",
				items: p.value,
				"hide-when-empty": "",
				onPlay: v,
				onWatchlist: b,
				onInfo: x
			}, null, 8, ["items"])) : E("", !0),
			(L(!0), D(y, null, B(a.value, (e) => (L(), T(yn, {
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
				O("div", nr, [t[0] ||= O("h1", { class: "browse-title" }, "Browse", -1), O("span", rr, W(K(o).total.toLocaleString()) + " titles", 1)]),
				A($n, { onChange: h }),
				K(o).error ? (L(), D("div", ir, [O("p", null, W(K(o).error), 1), O("button", {
					type: "button",
					class: "browse-retry",
					onClick: m
				}, "Retry")])) : E("", !0),
				A(on, {
					items: K(o).items,
					loading: K(o).loading && K(o).items.length === 0,
					"loading-more": K(o).loading && K(o).items.length > 0,
					"has-more": K(o).hasMore,
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
}), [["__scopeId", "data-v-214269cb"]]), or = { class: "media-detail" }, sr = { class: "media-detail__bar" }, cr = { class: "media-detail__hero" }, lr = { class: "media-detail__poster" }, ur = ["src", "alt"], dr = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, fr = { class: "media-detail__info" }, pr = { class: "media-detail__title" }, mr = { class: "media-detail__meta numeric" }, hr = {
	key: 0,
	class: "media-detail__meta-item"
}, gr = {
	key: 1,
	class: "media-detail__cert"
}, _r = {
	key: 2,
	class: "media-detail__meta-item"
}, vr = { class: "media-detail__type" }, yr = {
	key: 0,
	class: "media-detail__genres"
}, br = { class: "media-detail__overview" }, xr = { class: "media-detail__actions" }, Sr = { class: "media-detail__resume-at numeric" }, Cr = {
	key: 1,
	class: "media-detail__credits"
}, wr = {
	key: 0,
	class: "media-detail__credit"
}, Tr = {
	key: 1,
	class: "media-detail__credit"
}, Er = { class: "media-detail__cast" }, Dr = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}), (n, r) => (L(), D("article", or, [
			e.item.poster_url ? (L(), D("div", {
				key: 0,
				class: "media-detail__ambient",
				style: P({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : E("", !0),
			O("div", sr, [e.showBack ? (L(), T(i, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => a("back")
			}, {
				default: X(() => [...r[7] ||= [k("Back", -1)]]),
				_: 1
			})) : E("", !0)]),
			O("div", cr, [O("div", lr, [e.item.poster_url ? (L(), D("img", {
				key: 0,
				ref_key: "imgEl",
				ref: u,
				class: N(["media-detail__img", { "is-loaded": l.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: d
			}, null, 42, ur)) : (L(), D("div", dr, [A(t, { name: o.value }, null, 8, ["name"])]))]), O("div", fr, [
				O("h1", pr, W(e.item.name), 1),
				O("div", mr, [
					e.item.year ? (L(), D("span", hr, [A(t, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), k(W(e.item.year), 1)])) : E("", !0),
					e.item.rating ? (L(), D("span", gr, W(e.item.rating), 1)) : E("", !0),
					e.item.runtime ? (L(), D("span", _r, W(e.item.runtime) + "m", 1)) : E("", !0),
					O("span", vr, W(e.item.type), 1)
				]),
				e.item.genres?.length ? (L(), D("div", yr, [(L(!0), D(y, null, B(e.item.genres, (e) => (L(), T(Cn, {
					key: e,
					size: "sm"
				}, {
					default: X(() => [k(W(e), 1)]),
					_: 2
				}, 1024))), 128))])) : E("", !0),
				O("p", br, W(e.item.overview || "No overview available."), 1),
				O("div", xr, [
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
						default: X(() => [r[9] ||= k(" Resume ", -1), O("span", Sr, W(c.value), 1)]),
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
				e.item.director || s.value.length ? (L(), D("dl", Cr, [e.item.director ? (L(), D("div", wr, [r[11] ||= O("dt", null, "Director", -1), O("dd", null, W(e.item.director), 1)])) : E("", !0), s.value.length ? (L(), D("div", Tr, [r[12] ||= O("dt", null, "Cast", -1), O("dd", Er, [(L(!0), D(y, null, B(s.value, (e) => (L(), T(Cn, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: X(() => [k(W(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : E("", !0)])) : E("", !0)
			])]),
			e.similarLoading || e.similar.length ? (L(), T(gn, {
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
}), [["__scopeId", "data-v-379d2165"]]), Or = { class: "media-detail-page" }, kr = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, Ar = { class: "media-detail-page__loading-hero" }, jr = { class: "media-detail-page__loading-info" }, Mr = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "MediaDetailPage",
	setup(t) {
		let r = ee("apiBase", ""), a = C(() => typeof r == "string" ? r : r?.value ?? ""), s = ue(), c = de(), l = Et(), u = n(), d = z(null), p = z([]), m = z(!0), h = z(!1), g = z(null), _ = C(() => String(s.params.id ?? "")), v = C(() => l.resumePositionFor(_.value)), y = null, b = !1;
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
				let o = vn(a.value, {
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
		I(w), Y(_, w), F(() => {
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
		return (e, t) => (L(), D("div", Or, [m.value ? (L(), D("div", kr, [O("div", Ar, [A(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), O("div", jr, [
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
		}, 8, ["description"])) : d.value ? (L(), T(Dr, {
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
function Nr(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Pr = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], Fr = { class: "scrubber__track" }, Ir = ["title"], Lr = { class: "scrubber__time numeric" }, Rr = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
			"aria-valuetext": K(Nr)(e.position),
			"aria-label": "Seek",
			onPointerdown: S,
			onPointermove: w,
			onPointerup: T,
			onPointercancel: T,
			onPointerenter: k,
			onPointerleave: A,
			onKeydown: j
		}, [O("div", Fr, [
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
			}, null, 12, Ir))), 128)),
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
		}, null, 4)) : E("", !0), O("span", Lr, W(K(Nr)(h.value)), 1)], 4)) : E("", !0)], 40, Pr));
	}
}), [["__scopeId", "data-v-b2711211"]]), zr = [
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
], Br = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Vr = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Hr(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Ur(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Wr(e, t) {
	switch (e.key) {
		case " ": return Hr(e.target) ? !1 : (t.playPause(), !0);
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
function Gr(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Ur(n.target) || Wr(n, e) && n.preventDefault();
	}
	I(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), F(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Kr = { class: "shortcuts__head" }, qr = { class: "shortcuts__grid" }, Jr = { class: "shortcuts__keys" }, Yr = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Xr = {
	key: 1,
	class: "shortcuts__key"
}, Zr = { class: "shortcuts__label" }, Qr = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => zr }
	},
	emits: ["close"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = z(null);
		return l(a, G(r, "open"), {
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
		}, [O("div", Kr, [r[2] ||= O("h3", { class: "shortcuts__title" }, "Keyboard", -1), A(u, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: r[0] ||= (e) => i("close")
		})]), O("ul", qr, [(L(!0), D(y, null, B(e.shortcuts, (e) => (L(), D("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [O("span", Jr, [(L(!0), D(y, null, B(e.keys, (e, n) => (L(), D(y, { key: n }, [e === "–" ? (L(), D("span", Yr, "–")) : (L(), D("kbd", Xr, [K(Br)[e] ? (L(), T(t, {
			key: 0,
			name: K(Br)[e],
			label: K(Vr)[e] ?? e
		}, null, 8, ["name", "label"])) : (L(), D(y, { key: 1 }, [k(W(e), 1)], 64))]))], 64))), 128))]), O("span", Zr, W(e.label), 1)]))), 128))])], 512)])) : E("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), $r = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], ei = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}, null, 4)], 544)], 42, $r));
	}
}), [["__scopeId", "data-v-9ca92975"]]), ti = { class: "volume" }, ni = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "VolumeControl",
	setup(e) {
		let t = Et(), n = Be(), r = C(() => t.muted ? 0 : t.volume), i = C(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Y(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (L(), D("div", ti, [A(u, {
			name: i.value,
			label: K(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => K(t).toggleMute()
		}, null, 8, ["name", "label"]), A(ei, {
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
}), [["__scopeId", "data-v-2768c5e3"]]), ri = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		], n = Et(), r = C(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (L(), T(g, {
			class: "speed-menu",
			"model-value": K(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), ii = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = Et(), r = Be(), i = C(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (L(), T(g, {
			key: 0,
			class: "quality-menu",
			"model-value": K(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"])) : E("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]);
//#endregion
//#region src/components/player/captions.ts
function ai(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function oi(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function si(e, t) {
	return e.language || e.label || `track-${t}`;
}
function ci(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function li(e) {
	return e ? ai(e.textTracks).filter(oi).map((e, t) => ({
		index: t,
		language: si(e, t),
		label: e.label || ci(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function ui(e) {
	let t = e?.audioTracks;
	return ai(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || ci(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function di(e, t) {
	return !e || t == null ? null : ai(e.textTracks).filter(oi).find((e, n) => si(e, n) === t) ?? null;
}
function fi(e, t) {
	return di(e, t) != null;
}
function pi(e, t) {
	e && ai(e.textTracks).filter(oi).forEach((e, n) => {
		try {
			e.mode = si(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function mi(e, t) {
	let n = e?.audioTracks;
	ai(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function hi(e) {
	let t = e?.audioTracks;
	return ai(t).findIndex((e) => e.enabled);
}
var gi = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function _i(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function vi(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && _i(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(gi, n) ? gi[n] : e;
	});
}
function yi(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => vi(e).trim()).filter((e) => e.length > 0) : [];
}
function bi(e) {
	if (!e) return [];
	let t = ai(e.activeCues), n = [];
	for (let e of t) n.push(...yi(e.text));
	return n;
}
var xi = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Si = [
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
], Ci = [
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
], wi = [
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
], Ti = [
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
function Ei(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function Di(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function Oi(e) {
	return {
		"--cap-scale": String(xi[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": Ei(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": Di(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var ki = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = z([]), i = C(() => Oi(n.styleConfig)), a = null;
		function o() {
			r.value = bi(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), pi(n.video, n.language);
			let e = di(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = bi(e)) : r.value = [];
		}
		return Y(() => [n.video, n.language], c, { immediate: !0 }), F(s), t({ lines: r }), (t, n) => r.value.length ? (L(), D("div", {
			key: 0,
			class: N(["player__captions", { "is-lifted": e.lifted }]),
			style: P(i.value)
		}, [(L(!0), D(y, null, B(r.value, (e, t) => (L(), D("p", {
			key: t,
			class: "player__caption-line"
		}, W(e), 1))), 128))], 6)) : E("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), Ai = ["aria-label", "aria-expanded"], ji = { class: "capmenu__head" }, Mi = ["aria-checked", "tabindex"], Ni = { class: "capmenu__check" }, Pi = [
	"aria-checked",
	"tabindex",
	"onClick"
], Fi = { class: "capmenu__check" }, Ii = { class: "capmenu__optlabel" }, Li = [
	"aria-checked",
	"tabindex",
	"onClick"
], Ri = { class: "capmenu__check" }, zi = { class: "capmenu__optlabel" }, Bi = { class: "capmenu__style" }, Vi = { class: "capmenu__field" }, Hi = { class: "capmenu__field" }, Ui = { class: "capmenu__field" }, Wi = { class: "capmenu__field" }, Gi = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = Et(), o = Be(), s = z(null), c = z(null), d = C(() => a.subtitleLang), f = C(() => r.tracks.some((e) => e.language === d.value)), p = C(() => f.value ? "captions" : "captions-off"), m = C(() => f.value ? r.tracks.findIndex((e) => e.language === d.value) + 1 : 0), h = C(() => r.activeAudio >= 0 ? r.activeAudio : 0);
		function _(e) {
			i("update:open", e);
		}
		function v() {
			_(!1);
		}
		function b(e) {
			a.setSubtitle(e), o.defaultSubtitleLang = e;
		}
		function x(e) {
			i("select-audio", e);
		}
		function S(e, t, n) {
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
		function w(e) {
			let t = S(e, r.tracks.length + 1, m.value);
			t !== null && b(t === 0 ? null : r.tracks[t - 1].language);
		}
		function k(e) {
			let t = S(e, r.audioTracks.length, h.value);
			t !== null && x(r.audioTracks[t].index);
		}
		function j(e) {
			o.captionStyle = {
				...o.captionStyle,
				size: e
			};
		}
		function ee(e) {
			o.captionStyle = {
				...o.captionStyle,
				textColor: String(e)
			};
		}
		function M(e) {
			o.captionStyle = {
				...o.captionStyle,
				background: e
			};
		}
		function P(e) {
			o.captionStyle = {
				...o.captionStyle,
				edge: e
			};
		}
		l(c, G(r, "open"), {
			lockScroll: !1,
			onEscape: () => (v(), !0)
		});
		function I(e) {
			s.value && !s.value.contains(e.target) && v();
		}
		return Y(() => r.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", I, !0) : document.removeEventListener("pointerdown", I, !0));
		}, { immediate: !0 }), F(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", I, !0);
		}), (n, r) => (L(), D("div", {
			ref_key: "rootEl",
			ref: s,
			class: "capmenu"
		}, [O("button", {
			type: "button",
			class: N(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? "Captions (on)" : "Captions (off)",
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: r[0] ||= (t) => _(!e.open)
		}, [A(t, { name: p.value }, null, 8, ["name"])], 10, Ai), e.open ? (L(), D("div", {
			key: 0,
			ref_key: "panelEl",
			ref: c,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Captions and subtitles",
			tabindex: "-1"
		}, [
			O("div", ji, [r[2] ||= O("h3", { class: "capmenu__title" }, "Subtitles", -1), A(u, {
				name: "x",
				label: "Close",
				size: "sm",
				onClick: v
			})]),
			O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Subtitle track",
				onKeydown: w
			}, [O("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: r[1] ||= (e) => b(null)
			}, [O("span", Ni, [f.value ? E("", !0) : (L(), T(t, {
				key: 0,
				name: "check"
			}))]), r[3] ||= O("span", { class: "capmenu__optlabel" }, "Off", -1)], 8, Mi), (L(!0), D(y, null, B(e.tracks, (e, n) => (L(), D("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": d.value === e.language,
				tabindex: m.value === n + 1 ? 0 : -1,
				onClick: (t) => b(e.language)
			}, [O("span", Fi, [d.value === e.language ? (L(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", Ii, W(e.label), 1)], 8, Pi))), 128))], 32),
			e.audioTracks.length > 1 ? (L(), D(y, { key: 0 }, [r[4] ||= O("h3", { class: "capmenu__title capmenu__title--sub" }, "Audio", -1), O("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Audio track",
				onKeydown: k
			}, [(L(!0), D(y, null, B(e.audioTracks, (n) => (L(), D("button", {
				key: n.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === n.index,
				tabindex: h.value === n.index ? 0 : -1,
				onClick: (e) => x(n.index)
			}, [O("span", Ri, [e.activeAudio === n.index ? (L(), T(t, {
				key: 0,
				name: "check"
			})) : E("", !0)]), O("span", zi, W(n.label), 1)], 8, Li))), 128))], 32)], 64)) : E("", !0),
			r[9] ||= O("h3", { class: "capmenu__title capmenu__title--sub" }, "Caption style", -1),
			O("div", Bi, [
				O("div", Vi, [r[5] ||= O("span", { class: "capmenu__fieldlabel" }, "Size", -1), A(g, {
					"model-value": K(o).captionStyle.size,
					options: K(Si),
					label: "Caption size",
					"onUpdate:modelValue": j
				}, null, 8, ["model-value", "options"])]),
				O("div", Hi, [r[6] ||= O("span", { class: "capmenu__fieldlabel" }, "Color", -1), A(g, {
					"model-value": K(o).captionStyle.textColor,
					options: K(Ci),
					label: "Caption color",
					"onUpdate:modelValue": ee
				}, null, 8, ["model-value", "options"])]),
				O("div", Ui, [r[7] ||= O("span", { class: "capmenu__fieldlabel" }, "Background", -1), A(g, {
					"model-value": K(o).captionStyle.background,
					options: K(wi),
					label: "Caption background",
					"onUpdate:modelValue": M
				}, null, 8, ["model-value", "options"])]),
				O("div", Wi, [r[8] ||= O("span", { class: "capmenu__fieldlabel" }, "Edge", -1), A(g, {
					"model-value": K(o).captionStyle.edge,
					options: K(Ti),
					label: "Caption edge",
					"onUpdate:modelValue": P
				}, null, 8, ["model-value", "options"])])
			])
		], 512)) : E("", !0)], 512));
	}
}), [["__scopeId", "data-v-aff48a56"]]), Ki = 32, qi = 18, Ji = 250, Yi = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Xi(e, t, n, r, i, a, o) {
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
		r: Yi(d / m),
		g: Yi(f / m),
		b: Yi(p / m)
	};
}
function Zi(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Xi(e, t, n, 0, 0, r, n),
		right: Xi(e, t, n, t - r, 0, t, n),
		center: Xi(e, t, n, 0, 0, t, n)
	};
}
function Qi({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function $i({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function ea(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${$i(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${$i(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${$i(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function ta(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var na = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let n = e, r = z(!1), i = null;
		function a() {
			r.value = ta(i);
		}
		let o = C(() => n.enabled && !n.reducedMotion && !r.value), s = C(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = z(null), l = null, u = null, d = !1, f = !1;
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
				c.value = ea(Zi(n, 32, 18));
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
		function w() {
			if (b || !o.value || !n.video) return;
			let e = n.video;
			if (h(e)) {
				b = !0, y = 0, x(e);
				return;
			}
			m(), !f && (b = !0, v = setInterval(m, 250));
		}
		function T() {
			b = !1, g != null && _ && _.cancelVideoFrameCallback(g), g = null, _ = null, v != null && (clearInterval(v), v = null);
		}
		Y(() => [
			o.value,
			n.playing,
			n.video
		], ([e, t]) => {
			T(), e && t && w();
		}, { immediate: !0 }), I(() => {
			let e = typeof navigator < "u" ? navigator : null;
			e && typeof e.getBattery == "function" && e.getBattery().then((e) => {
				i = e, a(), i.addEventListener?.("chargingchange", a), i.addEventListener?.("levelchange", a);
			}).catch(() => {});
		}), F(() => {
			T(), i?.removeEventListener?.("chargingchange", a), i?.removeEventListener?.("levelchange", a);
		});
		let E = C(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (L(), D("div", {
			class: N(["player__ambient", { "is-active": o.value }]),
			style: P(o.value ? E.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), ra = { class: "player__stage" }, ia = ["src", "poster"], aa = { class: "player__meta" }, oa = { class: "player__meta-text" }, sa = { class: "player__title" }, ca = { class: "player__sub numeric" }, la = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, ua = { class: "player__center" }, da = ["aria-label"], fa = { class: "player__btnrow" }, pa = ["aria-label"], ma = { class: "player__time numeric" }, ha = ["aria-label", "aria-pressed"], ga = ["aria-label"], _a = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let r = e, i = n, a = Et(), o = Be(), s = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], c = z(null), l = z(null), u = z(!0), d = z(!1), f = z(!1), p = z(!1), m = z(!1), h = C(() => m.value ? 1.35 : 1), g = z([]), _ = z([]), v = z(-1), b = z(!1), x = a.subtitleLang, S = C(() => g.value.some((e) => e.language === a.subtitleLang));
		function w() {
			let e = c.value;
			g.value = li(e), _.value = ui(e), v.value = hi(e);
		}
		function T() {
			if (S.value) x = a.subtitleLang, a.setSubtitle(null);
			else {
				let e = x && g.value.some((e) => e.language === x) ? x : g.value[0]?.language ?? null;
				a.setSubtitle(e);
			}
			i("captions");
		}
		function j(e) {
			mi(c.value, e), v.value = e;
		}
		let ee = null, M, P = C(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function R() {
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
		function H() {
			a.play();
		}
		function U() {
			a.pause();
		}
		function G() {
			let e = c.value;
			e && a.updateProgress(e.currentTime, e.duration, V(e));
		}
		function q() {
			let e = c.value;
			e && (e.volume = a.volume, e.muted = a.muted, e.playbackRate = a.rate, a.updateProgress(e.currentTime, e.duration, V(e)), w());
		}
		function te() {
			let e = c.value;
			e && a.updateProgress(e.currentTime, e.duration, V(e));
		}
		function J() {
			let e = c.value;
			e && (Math.abs(e.volume - a.volume) > .001 && a.setVolume(e.volume), e.muted !== a.muted && a.toggleMute());
		}
		function ne() {
			let e = c.value;
			e && e.playbackRate !== a.rate && a.setRate(e.playbackRate);
		}
		function re(e) {
			let t = c.value;
			t && a.duration > 0 && (t.currentTime = Math.min(a.duration, Math.max(0, e)));
		}
		function X() {
			f.value = !0, ue();
		}
		function Z() {
			f.value = !1, ue();
		}
		function ie(e) {
			let t = s.reduce((e, t, n) => Math.abs(t - a.rate) < Math.abs(s[e] - a.rate) ? n : e, 0), n = s[Math.min(s.length - 1, Math.max(0, t + e))];
			a.setRate(n);
		}
		Gr({
			playPause: R,
			seekBy: (e) => re(a.position + e),
			frameStep: (e) => {
				a.playing || re(a.position + e / 30);
			},
			volumeBy: (e) => a.setVolume(a.volume + e),
			toggleMute: oe,
			toggleFullscreen: se,
			toggleCaptions: T,
			toggleTheater: Q,
			togglePip: () => i("pip"),
			seekToPercent: (e) => re(e * a.duration),
			speedStep: ie,
			toggleHelp: () => {
				p.value = !p.value;
			}
		}, { enabled: () => !p.value && !b.value });
		function oe() {
			a.toggleMute();
		}
		function Q() {
			m.value = !m.value, i("theater", m.value);
		}
		Y(() => a.muted, (e) => {
			let t = c.value;
			t && t.muted !== e && (t.muted = e);
		}), Y(() => a.volume, (e) => {
			let t = c.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Y(() => a.rate, (e) => {
			let t = c.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function se() {
			if (typeof document > "u") return;
			let e = l.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function $() {
			d.value = typeof document < "u" && !!document.fullscreenElement;
		}
		function ce() {
			M &&= (clearTimeout(M), void 0);
		}
		function le() {
			ce(), !(!a.playing || f.value) && (M = setTimeout(() => {
				a.playing && !f.value && (u.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function ue() {
			u.value = !0, le();
		}
		return Y(() => a.playing, (e) => {
			e ? le() : (ce(), u.value = !0);
		}), I(() => {
			a.setCurrent(r.media, { resetPosition: !1 }), typeof document < "u" && document.addEventListener("fullscreenchange", $), ee = c.value?.textTracks ?? null, ee?.addEventListener?.("addtrack", w), ee?.addEventListener?.("removetrack", w), w();
		}), Y(() => r.media, (e) => a.setCurrent(e, { resetPosition: !1 })), F(() => {
			ce(), typeof document < "u" && document.removeEventListener("fullscreenchange", $), ee?.removeEventListener?.("addtrack", w), ee?.removeEventListener?.("removetrack", w);
		}), (n, r) => (L(), D("div", {
			ref_key: "containerRef",
			ref: l,
			class: N(["player", {
				"is-chrome-hidden": !u.value,
				"is-theater": m.value
			}]),
			onPointermove: ue,
			onPointerdown: ue,
			onFocusin: ue
		}, [A(na, {
			video: c.value,
			enabled: K(o).atmosphere,
			playing: K(a).playing,
			"reduced-motion": K(o).effectiveReducedMotion,
			intensity: h.value
		}, null, 8, [
			"video",
			"enabled",
			"playing",
			"reduced-motion",
			"intensity"
		]), O("div", ra, [
			O("video", {
				ref_key: "videoRef",
				ref: c,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: H,
				onPause: U,
				onTimeupdate: G,
				onLoadedmetadata: q,
				onProgress: te,
				onVolumechange: J,
				onRatechange: ne,
				onClick: R
			}, null, 40, ia),
			r[8] ||= O("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[9] ||= O("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			O("div", aa, [O("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: r[0] ||= ae((e) => i("back"), ["stop"])
			}, [A(t, { name: "arrow-left" })]), O("div", oa, [
				r[5] ||= O("p", { class: "player__eyebrow" }, "Now playing", -1),
				O("h2", sa, W(e.media.name), 1),
				O("div", ca, [(L(!0), D(y, null, B(P.value, (e, t) => (L(), D(y, { key: t }, [t > 0 && !e.cert ? (L(), D("span", la, "·")) : E("", !0), O("span", { class: N({ player__cert: e.cert }) }, W(e.text), 3)], 64))), 128))])
			])]),
			O("div", ua, [O("button", {
				type: "button",
				class: N(["player__bigplay", { "is-playing": K(a).playing }]),
				"aria-label": K(a).playing ? "Pause" : "Play",
				onClick: ae(R, ["stop"])
			}, [A(t, { name: K(a).playing ? "pause" : "play" }, null, 8, ["name"])], 10, da)]),
			A(ki, {
				video: c.value,
				language: K(a).subtitleLang,
				"style-config": K(o).captionStyle,
				lifted: u.value
			}, null, 8, [
				"video",
				"language",
				"style-config",
				"lifted"
			]),
			O("div", {
				class: "player__controls",
				onClick: r[3] ||= ae(() => {}, ["stop"])
			}, [A(Rr, {
				position: K(a).position,
				duration: K(a).duration,
				buffered: K(a).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: re,
				onScrubStart: X,
				onScrubEnd: Z
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), O("div", fa, [
				O("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": K(a).playing ? "Pause" : "Play",
					onClick: R
				}, [A(t, { name: K(a).playing ? "pause" : "play" }, null, 8, ["name"])], 8, pa),
				O("span", ma, [
					k(W(K(Nr)(K(a).position)), 1),
					r[6] ||= O("span", { class: "player__sep" }, " / ", -1),
					k(W(K(Nr)(K(a).duration)), 1)
				]),
				r[7] ||= O("span", { class: "player__grow" }, null, -1),
				A(ni),
				A(ri),
				A(ii, { qualities: e.qualities }, null, 8, ["qualities"]),
				A(Gi, {
					open: b.value,
					"onUpdate:open": r[1] ||= (e) => b.value = e,
					tracks: g.value,
					"audio-tracks": _.value,
					"active-audio": v.value,
					onSelectAudio: j
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: r[2] ||= (e) => p.value = !0
				}, [A(t, { name: "info" })]),
				O("button", {
					type: "button",
					class: N(["player__iconbtn", { "is-on": m.value }]),
					"aria-label": m.value ? "Exit theater mode" : "Theater mode",
					"aria-pressed": m.value,
					onClick: Q
				}, [A(t, { name: "theater" })], 10, ha),
				O("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": d.value ? "Exit fullscreen" : "Fullscreen",
					onClick: se
				}, [A(t, { name: d.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, ga)
			])]),
			A(Qr, {
				open: p.value,
				onClose: r[4] ||= (e) => p.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-9875bd25"]]), va = { class: "player-page" }, ya = {
	key: 0,
	class: "player-loading"
}, ba = {
	key: 1,
	class: "player-error"
}, xa = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		return I(c), (e, t) => (L(), D("div", va, [o.value ? (L(), D("div", ya, "Loading...")) : s.value ? (L(), D("div", ba, [O("p", null, W(s.value), 1), O("button", {
			class: "retry-btn",
			onClick: c
		}, "Retry")])) : i.value ? (L(), T(_a, {
			key: 2,
			media: i.value,
			"stream-url": a.value
		}, null, 8, ["media", "stream-url"])) : E("", !0)]));
	}
}), [["__scopeId", "data-v-d9061b47"]]), Sa = Q("auth", () => {
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
}), Ca = {
	key: 0,
	class: "form-error"
}, wa = { class: "field" }, Ta = { class: "field" }, Ea = { class: "password-wrapper" }, Da = ["type"], Oa = ["disabled"], ka = { class: "form-footer" }, Aa = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Sa(), i = de(), a = z(""), o = z(""), s = z(!1);
		async function c() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = H("router-link");
			return L(), D("form", {
				class: "login-form",
				onSubmit: ae(c, ["prevent"])
			}, [
				t[7] ||= O("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				K(r).error ? (L(), D("div", Ca, W(K(r).error), 1)) : E("", !0),
				O("div", wa, [t[3] ||= O("label", {
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
				}, null, 512), [[J, a.value]])]),
				O("div", Ta, [t[4] ||= O("label", {
					for: "password",
					class: "label"
				}, "Password", -1), O("div", Ea, [Z(O("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: s.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, Da), [[te, o.value]]), O("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => s.value = !s.value
				}, W(s.value ? "🙈" : "👁"), 1)])]),
				O("button", {
					type: "submit",
					class: "submit-btn",
					disabled: K(r).loading
				}, W(K(r).loading ? "Signing in..." : "Sign in"), 9, Oa),
				O("p", ka, [t[6] ||= k(" Don't have an account? ", -1), A(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: X(() => [...t[5] ||= [k("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), ja = { class: "auth-page" }, Ma = { class: "auth-card" }, Na = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (L(), D("div", ja, [O("div", Ma, [A(Aa, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), Pa = {
	key: 0,
	class: "form-error"
}, Fa = { class: "field" }, Ia = { class: "field" }, La = { class: "field" }, Ra = { class: "password-wrapper" }, za = ["type"], Ba = { class: "field" }, Va = ["type"], Ha = ["disabled"], Ua = { class: "form-footer" }, Wa = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Sa(), i = de(), a = z(""), o = z(""), s = z(""), c = z(""), l = z(!1), u = z(null);
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
			let n = H("router-link");
			return L(), D("form", {
				class: "signup-form",
				onSubmit: ae(d, ["prevent"])
			}, [
				t[11] ||= O("h2", { class: "form-title" }, "Create your Phlix account", -1),
				K(r).error || u.value ? (L(), D("div", Pa, W(K(r).error || u.value), 1)) : E("", !0),
				O("div", Fa, [t[5] ||= O("label", {
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
				}, null, 512), [[J, a.value]])]),
				O("div", Ia, [t[6] ||= O("label", {
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
				}, null, 512), [[J, o.value]])]),
				O("div", La, [t[7] ||= O("label", {
					for: "password",
					class: "label"
				}, "Password", -1), O("div", Ra, [Z(O("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => s.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, za), [[te, s.value]]), O("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => l.value = !l.value
				}, W(l.value ? "🙈" : "👁"), 1)])]),
				O("div", Ba, [t[8] ||= O("label", {
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
				}, null, 8, Va), [[te, c.value]])]),
				O("button", {
					type: "submit",
					class: "submit-btn",
					disabled: K(r).loading
				}, W(K(r).loading ? "Creating account..." : "Create account"), 9, Ha),
				O("p", Ua, [t[10] ||= k(" Already have an account? ", -1), A(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: X(() => [...t[9] ||= [k("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), Ga = { class: "auth-page" }, Ka = { class: "auth-card" }, qa = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (L(), D("div", Ga, [O("div", Ka, [A(Wa, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), Ja = { class: "settings-form" }, Ya = {
	key: 0,
	class: "settings-loading"
}, Xa = {
	key: 1,
	class: "settings-error"
}, Za = { class: "group-title" }, Qa = ["for"], $a = { class: "setting-control" }, eo = [
	"id",
	"checked",
	"onChange"
], to = [
	"id",
	"value",
	"onChange"
], no = [
	"id",
	"value",
	"onChange"
], ro = { class: "settings-actions" }, io = {
	key: 0,
	class: "success-msg"
}, ao = ["disabled"], oo = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Sa(), a = z({}), o = z(!0), s = z(!1), c = z(null), l = z(null), u = [
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
		return (e, t) => (L(), D("div", Ja, [o.value ? (L(), D("div", Ya, "Loading settings...")) : c.value ? (L(), D("div", Xa, W(c.value), 1)) : (L(), D(y, { key: 2 }, [(L(!0), D(y, null, B(d.value, (e) => (L(), D("div", {
			key: e,
			class: "settings-group"
		}, [O("h3", Za, W(h[e]), 1), (L(), D(y, null, B(g, (t, n) => Z(O("div", {
			key: n,
			class: "setting-row"
		}, [O("label", {
			for: n,
			class: "setting-label"
		}, W(t.label), 9, Qa), O("div", $a, [t.type === "bool" ? (L(), D("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!a.value[n],
			onChange: (e) => m(n, e.target.checked)
		}, null, 40, eo)) : t.type === "number" ? (L(), D("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: a.value[n],
			onChange: (e) => m(n, Number(e.target.value))
		}, null, 40, to)) : (L(), D("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: a.value[n] ?? "",
			onChange: (e) => m(n, e.target.value)
		}, null, 40, no))])]), [[ne, n.startsWith(e)]])), 64))]))), 128)), O("div", ro, [l.value ? (L(), D("div", io, W(l.value), 1)) : E("", !0), O("button", {
			class: "save-btn",
			disabled: s.value,
			onClick: p
		}, W(s.value ? "Saving..." : "Save settings"), 9, ao)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), so = { class: "settings-page" }, co = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (L(), D("div", so, [t[0] ||= O("div", { class: "settings-header" }, [O("h1", { class: "settings-title" }, "Settings")], -1), A(oo)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function lo() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function uo(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: ar
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: Mr
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: xa
		},
		{
			path: `${t}/login`,
			name: "login",
			component: Na
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: qa
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: co
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: gt,
		props: { appName: e.app }
	}), n;
}
function fo(e) {
	let t = {
		...lo(),
		...e
	};
	st(t.defaultTheme);
	let n = oe();
	t.defaultTheme && !Re() && (Be(n).theme = t.defaultTheme);
	let r = ce({
		history: le(t.routerBase || "/app"),
		routes: uo(t)
	}), i = w(pt);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var po = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, mo = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
			o.value && e.vignette ? (L(), D("div", po)) : E("", !0),
			o.value && e.grain ? (L(), D("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: P(u.value),
				"aria-hidden": "true"
			}, null, 4)) : E("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), ho = ["aria-labelledby"], go = {
	key: 0,
	class: "phlix-sheet__header"
}, _o = ["id"], vo = { class: "phlix-sheet__body" }, yo = {
	key: 1,
	class: "phlix-sheet__footer"
}, bo = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		Y(() => n.modelValue, (e) => i.value = e);
		let a = z(null), o = q();
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
				"aria-labelledby": e.title ? K(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (L(), D("header", go, [e.title ? (L(), D("h2", {
					key: 0,
					id: K(o),
					class: "phlix-sheet__title"
				}, W(e.title), 9, _o)) : E("", !0), e.hideClose ? E("", !0) : (L(), T(u, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : E("", !0),
				O("div", vo, [V(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (L(), D("footer", yo, [V(t.$slots, "footer", {}, void 0, !0)])) : E("", !0)
			], 8, ho)], 34)) : E("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), xo = ["id"], So = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		let t = e, n = q(), r = z(!1), i = z(null), a;
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
				id: K(n),
				role: "tooltip",
				class: N(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [V(t.$slots, "content", {}, () => [k(W(e.text), 1)], !0)], 10, xo)) : E("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Co = ["role"], wo = { class: "phlix-toast__content" }, To = {
	key: 0,
	class: "phlix-toast__title"
}, Eo = { class: "phlix-toast__message" }, Do = ["onClick"], Oo = 0, ko = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
			Oo++;
		}), F(() => {
			Oo--;
		}), (n, i) => (L(), T(b, { to: "body" }, [O("div", {
			class: N(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [A(S, { name: "phlix-toast" }, {
			default: X(() => [(L(!0), D(y, null, B(K(r).toasts, (e) => (L(), D("div", {
				key: e.id,
				class: N(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				A(t, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				O("div", wo, [e.title ? (L(), D("p", To, W(e.title), 1)) : E("", !0), O("p", Eo, W(e.message), 1)]),
				e.action ? (L(), D("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), K(r).dismiss(e.id);
					}
				}, W(e.action.label), 9, Do)) : E("", !0),
				A(u, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => K(r).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, Co))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), Ao = ["aria-label"], jo = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		})], 12, Ao));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Mo = { class: "phlix-tabs" }, No = ["aria-label"], Po = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], Fo = ["id", "aria-labelledby"], Io = /*#__PURE__*/ r(/* @__PURE__ */ j({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = q(), o = z(null), s = C(() => r.tabs.findIndex((e) => e.value === r.modelValue)), c = (e) => `${a}-tab-${e}`, l = (e) => `${a}-panel-${e}`, u = C(() => r.tabs.map((e) => ({
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
		return (n, r) => (L(), D("div", Mo, [O("div", {
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
		}, null, 8, ["name"])) : E("", !0), k(" " + W(n.label), 1)], 10, Po))), 128))], 40, No), e.modelValue ? (L(), D("div", {
			key: 0,
			id: l(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": c(e.modelValue),
			tabindex: "0"
		}, [V(n.$slots, e.modelValue, {}, () => [V(n.$slots, "default", {}, void 0, !0)], !0)], 8, Fo)) : E("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), Lo = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}), (t, a) => (L(), T(U(e.tag), {
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
}), [["__scopeId", "data-v-162397f9"]]), Ro = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
}), [["__scopeId", "data-v-dafe74d0"]]), zo = "__all__", Bo = class {
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
}, Vo = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, Ho = { class: "admin-logs__controls" }, Uo = { class: "admin-logs__field" }, Wo = { class: "admin-logs__field" }, Go = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, Ko = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, qo = 5e3, Jo = /*@__PURE__*/ j({
	__name: "LogsPage",
	props: { client: {} },
	setup(t) {
		let r = [
			200,
			500,
			1e3,
			2e3
		], a = t, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new Bo(a.client ?? new e({
			baseUrl: l.value,
			tokenStore: new c()
		})), d = n(), f = z([]), p = z(""), m = z(200), h = z([]), _ = z(!1), y = z(!1), b = z(null), x = null, S = C(() => f.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: zo,
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
			N(), R.value && p.value !== "" && (x = setInterval(() => void j(), qo));
		}
		let R = z(!1);
		return Y([p, m], () => void j()), Y([
			R,
			p,
			m
		], P), I(T), F(N), (e, t) => (L(), D("section", Vo, [
			t[6] ||= O("header", { class: "admin-logs__head" }, [O("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			O("div", Ho, [
				O("label", Uo, [t[3] ||= O("span", { class: "admin-logs__label" }, "File", -1), A(g, {
					modelValue: p.value,
					"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
					options: S.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				O("label", Wo, [t[4] ||= O("span", { class: "admin-logs__label" }, "Lines", -1), A(g, {
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
			_.value ? (L(), D("p", Go, " Showing the most recent " + W(m.value) + " lines (" + W(p.value === K("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : E("", !0),
			y.value && h.value.length === 0 ? (L(), D("div", Ko, [A(o, {
				variant: "text",
				lines: 8
			})])) : (L(), D("pre", {
				key: 2,
				ref_key: "preEl",
				ref: b,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, W(h.value.length === 0 ? "(no output)" : h.value.join("\n")), 513))
		]));
	}
}), Yo = /* @__PURE__ */ pe({ default: () => Xo }), Xo = /*#__PURE__*/ r(Jo, [["__scopeId", "data-v-a9b0d206"]]);
//#endregion
//#region src/api/admin/dashboard.ts
function Zo(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function Qo(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function $o(e) {
	return Array.isArray(e) ? e : [];
}
function es(e) {
	return {
		session_id: Zo(e.session_id ?? e.stream_id),
		user_id: Zo(e.user_id),
		user_name: Zo(e.user_name ?? e.username),
		media_item_id: Zo(e.media_item_id),
		media_title: Zo(e.media_title),
		media_type: Zo(e.media_type),
		progress_percent: Qo(e.progress_percent),
		started_at: Zo(e.started_at)
	};
}
function ts(e) {
	return {
		user_id: Zo(e.user_id),
		user_name: Zo(e.user_name ?? e.username),
		total_watch_time_seconds: Qo(e.total_watch_time_seconds ?? e.total_watch_time),
		play_count: Qo(e.play_count),
		last_seen: Zo(e.last_seen)
	};
}
function ns(e) {
	return {
		media_item_id: Zo(e.media_item_id),
		media_title: Zo(e.media_title ?? e.title),
		media_type: Zo(e.media_type ?? e.type),
		play_count: Qo(e.play_count),
		total_duration_seconds: Qo(e.total_duration_seconds ?? e.total_duration),
		last_played_at: Zo(e.last_played_at)
	};
}
function rs(e) {
	let t = typeof e.details == "object" && e.details !== null ? e.details : {};
	return {
		id: Zo(e.id),
		event_type: Zo(e.event_type),
		user_id: Zo(e.user_id),
		user_name: Zo(e.user_name ?? e.username),
		media_item_id: Zo(e.media_item_id ?? t.media_item_id),
		media_title: Zo(e.media_title ?? t.media_title),
		created_at: Zo(e.created_at ?? e.occurred_at),
		details: typeof e.details == "string" ? e.details : ""
	};
}
var is = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getNowPlaying() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/now-playing");
		return $o(e).map(es);
	}
	async getTopUsers(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-users", Object.keys(n).length ? n : void 0);
		return $o(r).map(ts);
	}
	async getTopMedia(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-media", Object.keys(n).length ? n : void 0);
		return $o(r).map(ns);
	}
	async getStorage() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/storage");
		return Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [];
	}
	async getActivity(e) {
		let t = e === void 0 ? void 0 : { limit: String(e) }, { data: n } = await this.client.get("/api/v1/admin/dashboard/activity", t);
		return $o(n).map(rs);
	}
}, as = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, os = { class: "admin-dash__head" }, ss = { class: "admin-dash__grid" }, cs = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, ls = { class: "admin-dash__card-head" }, us = {
	key: 0,
	class: "admin-dash__skel"
}, ds = {
	key: 2,
	class: "admin-dash__np-list",
	role: "list"
}, fs = { class: "admin-dash__np-info" }, ps = { class: "admin-dash__np-user" }, ms = ["title"], hs = { class: "admin-dash__np-progress" }, gs = ["aria-valuenow"], _s = { class: "admin-dash__np-pct" }, vs = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, ys = {
	key: 0,
	class: "admin-dash__skel"
}, bs = {
	key: 2,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, xs = { class: "admin-dash__rank" }, Ss = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, Cs = {
	key: 0,
	class: "admin-dash__skel"
}, ws = {
	key: 2,
	class: "admin-dash__media-list",
	role: "list"
}, Ts = { class: "admin-dash__media-rank" }, Es = { class: "admin-dash__media-info" }, Ds = ["title"], Os = { class: "admin-dash__media-stats" }, ks = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, As = {
	key: 0,
	class: "admin-dash__skel"
}, js = { class: "admin-dash__storage-grid" }, Ms = { class: "admin-dash__storage-count" }, Ns = { class: "admin-dash__storage-size" }, Ps = {
	key: 0,
	class: "admin-dash__storage-note"
}, Fs = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, Is = {
	key: 0,
	class: "admin-dash__skel"
}, Ls = {
	key: 2,
	class: "admin-dash__activity"
}, Rs = {
	class: "admin-dash__activity-list",
	role: "list"
}, zs = { class: "admin-dash__activity-user" }, Bs = ["title"], Vs = ["datetime", "title"], Hs = 20, Us = 3e4, Ws = /*@__PURE__*/ j({
	__name: "DashboardPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new is(r.client ?? new e({
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
		], x = z(30), S = z([]), w = z([]), j = z([]), M = z([]), N = z([]), R = z(!0), V = z(!0), H = z(!0), U = z(!0), G = z(!0), K = z(!1), q = z(!0), te = C(() => M.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function J() {
			try {
				S.value = await l.getNowPlaying();
			} catch {
				u.error("Failed to load now playing.");
			} finally {
				R.value = !1;
			}
		}
		async function ne(e) {
			V.value = !0;
			try {
				w.value = await l.getTopUsers(10, e);
			} catch {
				u.error("Failed to load top users.");
			} finally {
				V.value = !1;
			}
		}
		async function re(e) {
			H.value = !0;
			try {
				j.value = await l.getTopMedia(10, e);
			} catch {
				u.error("Failed to load top media.");
			} finally {
				H.value = !1;
			}
		}
		async function Z() {
			try {
				M.value = await l.getStorage();
			} catch {
				u.error("Failed to load storage.");
			} finally {
				U.value = !1;
			}
		}
		async function ie(e, t = !1) {
			t ? K.value = !0 : G.value = !0;
			try {
				let n = await l.getActivity(e);
				t ? N.value = [...N.value, ...n] : N.value = n, q.value = n.length === Hs;
			} catch {
				u.error("Failed to load activity.");
			} finally {
				G.value = !1, K.value = !1;
			}
		}
		function ae() {
			ie(N.value.length + Hs, !0);
		}
		let oe = null;
		return Y(x, (e) => {
			ne(e), re(e);
		}), I(() => {
			J(), Z(), ie(Hs), ne(x.value), re(x.value), oe = setInterval(() => {
				l.getNowPlaying().then((e) => {
					S.value = e;
				}).catch(() => {});
			}, Us);
		}), F(() => {
			oe !== null && (clearInterval(oe), oe = null);
		}), (e, t) => (L(), D("section", as, [O("header", os, [t[1] ||= O("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), A(g, {
			"model-value": x.value,
			options: b,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => x.value = Number(e)
		}, null, 8, ["model-value"])]), O("div", ss, [
			O("section", cs, [O("header", ls, [t[2] ||= O("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), S.value.length > 0 ? (L(), T(_, {
				key: 0,
				tone: "accent",
				label: `${S.value.length} active sessions`
			}, {
				default: X(() => [k(W(S.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : E("", !0)]), R.value ? (L(), D("div", us, [A(o, {
				variant: "text",
				lines: 4
			})])) : S.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "play",
				title: "No active sessions"
			})) : (L(), D("ul", ds, [(L(!0), D(y, null, B(S.value, (e) => (L(), D("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [O("div", fs, [
				O("span", ps, W(e.user_name), 1),
				O("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, W(e.media_title), 9, ms),
				A(_, { tone: h(e.media_type) }, {
					default: X(() => [k(W(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), O("div", hs, [O("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [O("div", {
				class: "admin-dash__bar-fill",
				style: P({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, gs), O("span", _s, W(e.progress_percent) + "%", 1)])]))), 128))]))]),
			O("section", vs, [t[4] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), V.value ? (L(), D("div", ys, [A(o, {
				variant: "text",
				lines: 4
			})])) : w.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "user",
				title: "No user data yet"
			})) : (L(), D("table", bs, [t[3] ||= O("thead", null, [O("tr", null, [
				O("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				O("th", { scope: "col" }, "User"),
				O("th", { scope: "col" }, "Watch Time"),
				O("th", { scope: "col" }, "Plays")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(w.value, (e, t) => (L(), D("tr", { key: e.user_id }, [
				O("td", xs, W(t + 1), 1),
				O("td", null, W(e.user_name), 1),
				O("td", null, W(d(e.total_watch_time_seconds)), 1),
				O("td", null, W(e.play_count), 1)
			]))), 128))])]))]),
			O("section", Ss, [t[5] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), H.value ? (L(), D("div", Cs, [A(o, {
				variant: "text",
				lines: 4
			})])) : j.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "film",
				title: "No media data yet"
			})) : (L(), D("ol", ws, [(L(!0), D(y, null, B(j.value, (e, t) => (L(), D("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				O("span", Ts, W(t + 1), 1),
				O("div", Es, [O("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, W(e.media_title), 9, Ds), A(_, { tone: h(e.media_type) }, {
					default: X(() => [k(W(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("div", Os, [O("span", null, W(e.play_count) + " plays", 1), O("span", null, W(d(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			O("section", ks, [t[6] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), U.value ? (L(), D("div", As, [A(o, {
				variant: "text",
				lines: 3
			})])) : M.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "image",
				title: "No storage data"
			})) : (L(), D(y, { key: 2 }, [O("div", js, [(L(!0), D(y, null, B(M.value, (e) => (L(), D("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				A(_, { tone: h(e.media_type) }, {
					default: X(() => [k(W(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				O("div", Ms, W(e.item_count.toLocaleString()) + " items", 1),
				O("div", Ns, W(p(e.total_bytes)), 1)
			]))), 128))]), te.value > 0 ? (L(), D("p", Ps, " Transcode cache: " + W(p(te.value)), 1)) : E("", !0)], 64))]),
			O("section", Fs, [t[8] ||= O("header", { class: "admin-dash__card-head" }, [O("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), G.value ? (L(), D("div", Is, [A(o, {
				variant: "text",
				lines: 5
			})])) : N.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "list",
				title: "No recent activity"
			})) : (L(), D("div", Ls, [O("ul", Rs, [(L(!0), D(y, null, B(N.value, (e) => (L(), D("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				A(_, { tone: v(e.event_type) }, {
					default: X(() => [k(W(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				O("span", zs, W(e.user_name), 1),
				O("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, W(e.media_title), 9, Bs),
				O("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, W(m(e.created_at)), 9, Vs)
			]))), 128))]), q.value ? (L(), T(i, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: K.value,
				onClick: ae
			}, {
				default: X(() => [...t[7] ||= [k(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : E("", !0)]))])
		])]));
	}
}), Gs = /* @__PURE__ */ pe({ default: () => Ks }), Ks = /*#__PURE__*/ r(Ws, [["__scopeId", "data-v-71c5a6ca"]]), qs = {
	0: "G — General Audiences",
	1: "PG — Parental Guidance",
	2: "PG-13 — Parents Strongly Cautioned",
	3: "R — Restricted",
	4: "NC-17 — No One 17 & Under",
	5: "X — Adult",
	6: "UNRATED — Unrated Content"
}, Js = Object.entries(qs).map(([e, t]) => ({
	value: Number(e),
	label: t
})), Ys = class {
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
}, Xs = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, Zs = { class: "admin-users__head" }, Qs = {
	key: 0,
	class: "admin-users__skel"
}, $s = {
	key: 2,
	class: "admin-users__table",
	"aria-label": "Users"
}, ec = { class: "admin-users__date" }, tc = { class: "admin-users__actions" }, nc = { class: "admin-users__field" }, rc = { class: "admin-users__field" }, ic = { class: "admin-users__field" }, ac = { class: "admin-users__label" }, oc = ["placeholder", "required"], sc = { key: 0 }, cc = { class: "admin-users__field" }, lc = { class: "admin-users__password-row" }, uc = ["value"], dc = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, fc = {
	key: 0,
	class: "admin-users__skel"
}, pc = { class: "admin-users__profiles-toolbar" }, mc = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, hc = { class: "admin-users__actions" }, gc = {
	key: 2,
	class: "admin-users__subform"
}, _c = { class: "admin-users__subform-title" }, vc = { class: "admin-users__field" }, yc = { class: "admin-users__field" }, bc = { class: "admin-users__subform-actions" }, xc = {
	key: 3,
	class: "admin-users__subform"
}, Sc = { class: "admin-users__subform-actions" }, Cc = {
	key: 4,
	class: "admin-users__subform"
}, wc = { class: "admin-users__subform-title" }, Tc = { class: "admin-users__field" }, Ec = { class: "admin-users__subform-actions" }, Dc = 5, Oc = /*@__PURE__*/ j({
	__name: "UsersPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new Ys(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n();
		function p(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let m = C(() => Js.map((e) => ({
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
		function H(e) {
			w.value = e, j.value = e.username, M.value = e.email, N.value = "", P.value = e.is_admin === 1, S.value = !0;
		}
		function U() {
			S.value = !1, w.value = null;
		}
		async function G() {
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
				U(), await x();
			} catch (e) {
				u.error(p(e, "Failed to save user."));
			} finally {
				F.value = !1;
			}
		}
		let K = z(null);
		async function q() {
			let e = K.value;
			if (e) try {
				await l.remove(e.id), u.success("User deleted."), K.value = null, await x();
			} catch (e) {
				u.error(p(e, "Failed to delete user.")), K.value = null;
			}
		}
		async function te(e, t) {
			try {
				await l.setAdmin(e.id, t), u.success(t ? "User promoted to admin." : "Admin status removed."), await x();
			} catch (e) {
				u.error(p(e, "Failed to update admin status."));
			}
		}
		let ne = z(null), Y = z(null);
		async function re(e) {
			ne.value = e, Y.value = null;
			try {
				Y.value = await l.resetPassword(e.id);
			} catch (e) {
				u.error(p(e, "Failed to reset password.")), ne.value = null;
			}
		}
		function ie() {
			ne.value = null, Y.value = null;
		}
		async function oe() {
			let e = Y.value;
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
		}), ue = C(() => se.value.length >= Dc);
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
			return qs[e] ?? qs[6];
		}
		return I(x), (e, t) => (L(), D("section", Xs, [
			O("header", Zs, [t[13] ||= O("h1", {
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
			b.value ? (L(), D("div", Qs, [A(o, {
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
			})) : (L(), D("table", $s, [t[19] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Username"),
				O("th", { scope: "col" }, "Email"),
				O("th", { scope: "col" }, "Role"),
				O("th", { scope: "col" }, "Created"),
				O("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(h.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, W(e.username), 1),
				O("td", null, W(e.email), 1),
				O("td", null, [A(_, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: X(() => [k(W(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("td", ec, W(e.created_at.slice(0, 10)), 1),
				O("td", null, [O("div", tc, [
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => H(e)
					}, {
						default: X(() => [...t[15] ||= [k(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => te(e, e.is_admin !== 1)
					}, {
						default: X(() => [k(W(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => re(e)
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
						onClick: (t) => K.value = e
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
				onClose: U
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: U
				}, {
					default: X(() => [...t[22] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: F.value,
					onClick: G
				}, {
					default: X(() => [k(W(w.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-users__form",
					onSubmit: ae(G, ["prevent"])
				}, [
					O("label", nc, [t[20] ||= O("span", { class: "admin-users__label" }, "Username", -1), Z(O("input", {
						"onUpdate:modelValue": t[0] ||= (e) => j.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, j.value]])]),
					O("label", rc, [t[21] ||= O("span", { class: "admin-users__label" }, "Email", -1), Z(O("input", {
						"onUpdate:modelValue": t[1] ||= (e) => M.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, M.value]])]),
					O("label", ic, [O("span", ac, W(w.value ? "Password (leave blank to keep current)" : "Password"), 1), Z(O("input", {
						"onUpdate:modelValue": t[2] ||= (e) => N.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: w.value ? "(unchanged)" : void 0,
						required: !w.value
					}, null, 8, oc), [[J, N.value]])]),
					A(v, {
						modelValue: P.value,
						"onUpdate:modelValue": t[3] ||= (e) => P.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			A(d, {
				"model-value": K.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => K.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => K.value = null
				}, {
					default: X(() => [...t[25] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: q
				}, {
					default: X(() => [...t[26] ||= [k("Delete", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					t[23] ||= k(" Delete user ", -1),
					O("strong", null, W(K.value?.username), 1),
					t[24] ||= k("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				"model-value": ne.value !== null,
				title: ne.value ? `Reset password — ${ne.value.username}` : "Reset password",
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
				default: X(() => [Y.value ? (L(), D("div", sc, [O("p", null, W(Y.value.message), 1), O("label", cc, [t[28] ||= O("span", { class: "admin-users__label" }, "New password", -1), O("div", lc, [O("input", {
					value: Y.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, uc), A(i, {
					variant: "outline",
					size: "sm",
					onClick: oe
				}, {
					default: X(() => [...t[27] ||= [k("Copy", -1)]]),
					_: 1
				})])])])) : (L(), D("p", dc, [
					t[29] ||= k(" Resetting password for ", -1),
					O("strong", null, W(ne.value?.username), 1),
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
				default: X(() => [$.value ? (L(), D("div", fc, [A(o, {
					variant: "text",
					lines: 4
				})])) : (L(), D(y, { key: 1 }, [
					O("div", pc, [A(i, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: ue.value,
						"aria-label": "Add profile",
						onClick: ye
					}, {
						default: X(() => [k(" Add profile" + W(ue.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					se.value.length === 0 ? (L(), T(f, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (L(), D("table", mc, [t[36] ||= O("thead", null, [O("tr", null, [
						O("th", { scope: "col" }, "Name"),
						O("th", { scope: "col" }, "Rating"),
						O("th", { scope: "col" }, "PIN"),
						O("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), O("tbody", null, [(L(!0), D(y, null, B(se.value, (e) => (L(), D("tr", { key: e.id }, [
						O("td", null, W(e.name), 1),
						O("td", null, [A(_, { tone: "info" }, {
							default: X(() => [k(W(Me(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						O("td", null, [A(_, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: X(() => [k(W(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						O("td", null, [O("div", hc, [
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
					me.value ? (L(), D("div", gc, [O("h3", _c, W(he.value ? "Edit profile" : "Add profile"), 1), O("form", {
						class: "admin-users__form",
						onSubmit: ae(Se, ["prevent"])
					}, [
						O("label", vc, [t[37] ||= O("span", { class: "admin-users__label" }, "Name", -1), Z(O("input", {
							"onUpdate:modelValue": t[7] ||= (e) => ge.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[J, ge.value]])]),
						O("label", yc, [t[38] ||= O("span", { class: "admin-users__label" }, "Rating", -1), A(g, {
							"model-value": _e.value,
							options: m.value,
							label: "Rating",
							"onUpdate:modelValue": t[8] ||= (e) => _e.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						O("div", bc, [A(i, {
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
							default: X(() => [k(W(he.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : E("", !0),
					Ce.value ? (L(), D("div", xc, [O("p", null, [
						t[40] ||= k(" Delete profile ", -1),
						O("strong", null, W(Ce.value.name), 1),
						t[41] ||= k("? This cannot be undone. ", -1)
					]), O("div", Sc, [A(i, {
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
					Te.value ? (L(), D("div", Cc, [O("h3", wc, "Set PIN — " + W(Te.value.name), 1), O("form", {
						class: "admin-users__form",
						onSubmit: ae(Ae, ["prevent"])
					}, [O("label", Tc, [t[44] ||= O("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), Z(O("input", {
						"onUpdate:modelValue": t[10] ||= (e) => Ee.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[J, Ee.value]])]), O("div", Ec, [A(i, {
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
}), kc = /* @__PURE__ */ pe({ default: () => Ac }), Ac = /*#__PURE__*/ r(Oc, [["__scopeId", "data-v-4c2f9520"]]), jc = Object.freeze([
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
]), Mc = Object.freeze(jc.flatMap((e) => e.events.map((e) => e.id))), Nc = class {
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
}, Pc = {
	class: "admin-webhooks",
	"aria-labelledby": "webhooks-heading"
}, Fc = { class: "admin-webhooks__head" }, Ic = {
	key: 0,
	class: "admin-webhooks__skel"
}, Lc = {
	key: 2,
	class: "admin-webhooks__table",
	"aria-label": "Webhooks"
}, Rc = { class: "admin-webhooks__url" }, zc = { class: "admin-webhooks__actions" }, Bc = { class: "admin-webhooks__field" }, Vc = { class: "admin-webhooks__field" }, Hc = { class: "admin-webhooks__field" }, Uc = { class: "admin-webhooks__label" }, Wc = {
	key: 0,
	"aria-hidden": "true"
}, Gc = {
	key: 0,
	class: "admin-webhooks__hint"
}, Kc = { class: "admin-webhooks__secret-row" }, qc = ["type", "placeholder"], Jc = { class: "admin-webhooks__events" }, Yc = { class: "admin-webhooks__events-category-label" }, Xc = ["checked", "onChange"], Zc = { class: "admin-webhooks__checkbox-label" }, Qc = { class: "admin-webhooks__event-id" }, $c = {
	key: 0,
	class: "admin-webhooks__error",
	role: "alert"
}, el = {
	key: 0,
	role: "status",
	"aria-live": "polite"
}, tl = {
	class: "admin-webhooks__test-icon",
	"aria-hidden": "true"
}, nl = { class: "admin-webhooks__test-status" }, rl = { class: "admin-webhooks__test-message" }, il = /*@__PURE__*/ j({
	__name: "WebhooksPage",
	props: { client: {} },
	setup(r) {
		let a = r, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new Nc(a.client ?? new e({
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
		let x = z(!1), S = z(null), w = z(""), j = z(""), M = z(""), P = z(/* @__PURE__ */ new Set()), F = z(!1), R = z(!1), V = z(""), H = C(() => S.value ? "Edit webhook" : "Add webhook");
		function U() {
			S.value = null, w.value = "", j.value = "", M.value = "", P.value = /* @__PURE__ */ new Set(), F.value = !1, V.value = "", x.value = !0;
		}
		function G(e) {
			S.value = e, w.value = e.name, j.value = e.url, M.value = "", P.value = new Set(e.events), F.value = !1, V.value = "", x.value = !0;
		}
		function q() {
			x.value = !1, S.value = null;
		}
		function ne(e) {
			let t = new Set(P.value);
			t.has(e) ? t.delete(e) : t.add(e), P.value = t;
		}
		async function Y() {
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
				q(), await b();
			} catch (e) {
				V.value = m(e, "Failed to save webhook.");
			} finally {
				R.value = !1;
			}
		}
		let re = z(null);
		async function ie() {
			let e = re.value;
			if (e) try {
				await u.remove(e.id), p.success("Webhook deleted."), re.value = null, await b();
			} catch (e) {
				p.error(m(e, "Failed to delete webhook.")), re.value = null;
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
		return I(b), (e, n) => (L(), D("section", Pc, [
			O("header", Fc, [n[9] ||= O("h1", {
				id: "webhooks-heading",
				class: "admin-webhooks__title"
			}, "Webhooks", -1), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: U
			}, {
				default: X(() => [...n[8] ||= [k("Add webhook", -1)]]),
				_: 1
			})]),
			v.value ? (L(), D("div", Ic, [A(o, {
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
					onClick: U
				}, {
					default: X(() => [...n[10] ||= [k("Add webhook", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (L(), D("table", Lc, [n[14] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Name"),
				O("th", { scope: "col" }, "URL"),
				O("th", { scope: "col" }, "Events"),
				O("th", {
					scope: "col",
					class: "admin-webhooks__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(g.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, W(e.name), 1),
				O("td", Rc, W(e.url), 1),
				O("td", null, [A(_, {
					tone: "info",
					mono: ""
				}, {
					default: X(() => [k(W(e.events.length), 1)]),
					_: 2
				}, 1024)]),
				O("td", null, [O("div", zc, [
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => G(e)
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
						onClick: (t) => re.value = e
					}, {
						default: X(() => [...n[13] ||= [k(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			A(d, {
				modelValue: x.value,
				"onUpdate:modelValue": n[4] ||= (e) => x.value = e,
				title: H.value,
				size: "lg",
				onClose: q
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: X(() => [...n[19] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: Y
				}, {
					default: X(() => [k(W(S.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-webhooks__form",
					onSubmit: ae(Y, ["prevent"])
				}, [
					O("label", Bc, [n[15] ||= O("span", { class: "admin-webhooks__label" }, "Name", -1), Z(O("input", {
						"onUpdate:modelValue": n[0] ||= (e) => w.value = e,
						type: "text",
						class: "admin-webhooks__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, w.value]])]),
					O("label", Vc, [n[16] ||= O("span", { class: "admin-webhooks__label" }, "URL", -1), Z(O("input", {
						"onUpdate:modelValue": n[1] ||= (e) => j.value = e,
						type: "url",
						class: "admin-webhooks__input",
						autocomplete: "off",
						placeholder: "https://example.com/webhook",
						required: ""
					}, null, 512), [[J, j.value]])]),
					O("div", Hc, [
						O("span", Uc, [n[17] ||= k(" Secret", -1), S.value ? E("", !0) : (L(), D("span", Wc, " *"))]),
						S.value ? (L(), D("p", Gc, "Leave blank to keep the current secret.")) : E("", !0),
						O("div", Kc, [Z(O("input", {
							"onUpdate:modelValue": n[2] ||= (e) => M.value = e,
							type: F.value ? "text" : "password",
							class: "admin-webhooks__input",
							autocomplete: "new-password",
							placeholder: S.value ? "(unchanged)" : "Shared secret for HMAC signing"
						}, null, 8, qc), [[te, M.value]]), A(i, {
							variant: "outline",
							size: "sm",
							"left-icon": F.value ? "eye-off" : "eye",
							"aria-label": F.value ? "Hide secret" : "Show secret",
							onClick: n[3] ||= (e) => F.value = !F.value
						}, {
							default: X(() => [k(W(F.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					O("fieldset", Jc, [n[18] ||= O("legend", { class: "admin-webhooks__label" }, [k("Events"), O("span", { "aria-hidden": "true" }, " *")], -1), (L(!0), D(y, null, B(K(jc), (e) => (L(), D("div", {
						key: e.label,
						class: "admin-webhooks__events-category"
					}, [O("span", Yc, W(e.label), 1), (L(!0), D(y, null, B(e.events, (e) => (L(), D("label", {
						key: e.id,
						class: "admin-webhooks__checkbox"
					}, [
						O("input", {
							type: "checkbox",
							checked: P.value.has(e.id),
							onChange: (t) => ne(e.id)
						}, null, 40, Xc),
						O("span", Zc, W(e.label), 1),
						O("span", Qc, W(e.id), 1)
					]))), 128))]))), 128))]),
					V.value ? (L(), D("p", $c, W(V.value), 1)) : E("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			A(d, {
				"model-value": re.value !== null,
				title: "Delete webhook",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => re.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => re.value = null
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
					O("strong", null, W(re.value?.name), 1),
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
				default: X(() => [se.value ? (L(), D("p", el, "Sending test payload…")) : Q.value ? (L(), D("div", {
					key: 1,
					class: N(["admin-webhooks__test-result", Q.value.success ? "admin-webhooks__test-result--ok" : "admin-webhooks__test-result--fail"])
				}, [O("span", tl, [A(t, { name: Q.value.success ? "success" : "error" }, null, 8, ["name"])]), O("div", null, [O("p", nl, W(Q.value.success ? "Delivery succeeded" : "Delivery failed"), 1), O("p", rl, W(Q.value.message), 1)])], 2)) : E("", !0)]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), al = /* @__PURE__ */ pe({ default: () => ol }), ol = /*#__PURE__*/ r(il, [["__scopeId", "data-v-77c00620"]]), sl = class {
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
}, cl = {
	class: "admin-services",
	"aria-labelledby": "services-heading"
}, ll = {
	class: "admin-services__section",
	"aria-labelledby": "trakt-heading"
}, ul = { class: "admin-services__section-head" }, dl = { class: "admin-services__card" }, fl = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, pl = {
	key: 0,
	class: "admin-services__dl"
}, ml = {
	key: 1,
	class: "admin-services__hint"
}, hl = { class: "admin-services__actions" }, gl = {
	class: "admin-services__section",
	"aria-labelledby": "lastfm-heading"
}, _l = { class: "admin-services__section-head" }, vl = { class: "admin-services__card" }, yl = {
	key: 0,
	class: "admin-services__loading",
	"aria-hidden": "true"
}, bl = {
	key: 0,
	class: "admin-services__dl"
}, xl = { class: "admin-services__actions" }, Sl = /*@__PURE__*/ j({
	__name: "ServicesPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new sl(r.client ?? new e({
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
		}), (e, t) => (L(), D("section", cl, [
			t[8] ||= O("header", { class: "admin-services__head" }, [O("h1", {
				id: "services-heading",
				class: "admin-services__title"
			}, "Services")], -1),
			O("section", ll, [O("div", ul, [t[0] ||= O("h2", {
				id: "trakt-heading",
				class: "admin-services__section-title"
			}, "Trakt.tv", -1), d.value === null ? E("", !0) : (L(), T(_, {
				key: 0,
				tone: d.value.connected ? "success" : "neutral",
				label: d.value.connected ? "Connected" : "Not connected"
			}, {
				default: X(() => [k(W(d.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), O("div", dl, [p.value ? (L(), D("div", fl, [A(o, {
				variant: "text",
				lines: 2
			})])) : d.value === null ? (L(), T(f, {
				key: 1,
				icon: "alert",
				title: "Unable to load Trakt status."
			})) : (L(), D(y, { key: 2 }, [
				d.value.connected && d.value.username !== null ? (L(), D("dl", pl, [t[1] ||= O("dt", null, "Username", -1), O("dd", null, W(d.value.username), 1)])) : E("", !0),
				!d.value.connected && h.value ? (L(), D("p", ml, [...t[2] ||= [
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
				O("div", hl, [d.value.connected ? (L(), T(i, {
					key: 1,
					variant: "outline",
					loading: m.value,
					onClick: b
				}, {
					default: X(() => [k(W(m.value ? "Disconnecting" : "Disconnect"), 1)]),
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
			O("section", gl, [O("div", _l, [t[4] ||= O("h2", {
				id: "lastfm-heading",
				class: "admin-services__section-title"
			}, "Last.fm", -1), x.value === null ? E("", !0) : (L(), T(_, {
				key: 0,
				tone: x.value.connected ? "success" : "neutral",
				label: x.value.connected ? "Connected" : "Not connected"
			}, {
				default: X(() => [k(W(x.value.connected ? "Connected" : "Not connected"), 1)]),
				_: 1
			}, 8, ["tone", "label"]))]), O("div", vl, [S.value ? (L(), D("div", yl, [A(o, {
				variant: "text",
				lines: 2
			})])) : x.value === null ? (L(), T(f, {
				key: 1,
				icon: "alert",
				title: "Unable to load Last.fm status."
			})) : (L(), D(y, { key: 2 }, [x.value.connected && x.value.username !== null ? (L(), D("dl", bl, [
				t[5] ||= O("dt", null, "Username", -1),
				O("dd", null, W(x.value.username), 1),
				t[6] ||= O("dt", null, "API key", -1),
				O("dd", null, W(x.value.api_key_set ? "Set" : "Not set"), 1)
			])) : E("", !0), O("div", xl, [x.value.connected ? (L(), T(i, {
				key: 1,
				variant: "outline",
				loading: w.value,
				onClick: N
			}, {
				default: X(() => [k(W(w.value ? "Disconnecting" : "Disconnect"), 1)]),
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
}), Cl = /* @__PURE__ */ pe({ default: () => wl }), wl = /*#__PURE__*/ r(Sl, [["__scopeId", "data-v-06f3b61d"]]), Tl = class {
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
}, El = {
	class: "admin-integrations",
	"aria-labelledby": "integrations-heading"
}, Dl = {
	class: "admin-integrations__section",
	"aria-labelledby": "arr-sync-heading"
}, Ol = { class: "admin-integrations__section-head" }, kl = { class: "admin-integrations__card" }, Al = {
	key: 0,
	class: "admin-integrations__skel"
}, jl = {
	key: 1,
	class: "admin-integrations__empty",
	role: "status"
}, Ml = { class: "admin-integrations__dl" }, Nl = { class: "admin-integrations__dd" }, Pl = { class: "admin-integrations__dd" }, Fl = { class: "admin-integrations__card-actions" }, Il = {
	class: "admin-integrations__section",
	"aria-labelledby": "auth-providers-heading"
}, Ll = {
	key: 0,
	class: "admin-integrations__skel"
}, Rl = {
	key: 1,
	class: "admin-integrations__providers"
}, zl = { class: "admin-integrations__provider-info" }, Bl = { class: "admin-integrations__provider-name" }, Vl = { class: "admin-integrations__provider-actions" }, Hl = { class: "admin-integrations__field" }, Ul = { class: "admin-integrations__field" }, Wl = { class: "admin-integrations__field" }, Gl = { class: "admin-integrations__hint" }, Kl = { class: "admin-integrations__password-row" }, ql = ["type", "placeholder"], Jl = { class: "admin-integrations__field" }, Yl = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, Xl = { class: "admin-integrations__field" }, Zl = { class: "admin-integrations__field" }, Ql = ["value"], $l = { class: "admin-integrations__field" }, eu = { class: "admin-integrations__field" }, tu = { class: "admin-integrations__field" }, nu = { class: "admin-integrations__hint" }, ru = { class: "admin-integrations__password-row" }, iu = ["type", "placeholder"], au = { class: "admin-integrations__field" }, ou = { class: "admin-integrations__field" }, su = {
	key: 0,
	class: "admin-integrations__error",
	role: "alert"
}, cu = 3e4, lu = "openid profile email", uu = /*@__PURE__*/ j({
	__name: "IntegrationsPage",
	props: { client: {} },
	setup(t) {
		let r = {
			oidc: "OIDC",
			ldap: "LDAP"
		}, a = ["oidc", "ldap"], s = t, l = ee("apiBase", ""), u = C(() => typeof l == "string" ? l : l?.value ?? ""), f = new Tl(s.client ?? new e({
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
			}, cu);
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
		async function H() {
			P.value = !0;
			try {
				N.value = await f.listProviders();
			} catch (e) {
				p.error(m(e, "Failed to load auth providers."));
			} finally {
				P.value = !1;
			}
		}
		function U(e) {
			return e === "oidc" ? R.value?.configured ?? !1 : e === "ldap" ? V.value?.configured ?? !1 : N.value.find((t) => t.name === e)?.supports_authentication ?? !1;
		}
		async function G(e, t) {
			try {
				t ? (await f.disableProvider(e), p.success(`${r[e]} disabled.`)) : (await f.enableProvider(e), p.success(`${r[e]} enabled.`)), await H();
			} catch (t) {
				p.error(m(t, `Failed to update ${r[e]}.`));
			}
		}
		let K = z(!1), q = z({
			provider_url: "",
			client_id: "",
			client_secret: "",
			scopes: lu
		}), ne = z(!1), Y = z(""), re = z(!1);
		async function ie() {
			Y.value = "", re.value = !1;
			try {
				let e = await f.getOidcSettings();
				R.value = e, q.value = {
					provider_url: e.provider_url ?? "",
					client_id: e.client_id ?? "",
					client_secret: "",
					scopes: e.scopes ?? lu
				};
			} catch (e) {
				p.error(m(e, "Failed to load OIDC settings."));
			}
			K.value = !0;
		}
		function oe() {
			K.value = !1, Y.value = "";
		}
		async function Q() {
			if (Y.value = "", !q.value.provider_url.trim()) {
				Y.value = "Provider URL is required.";
				return;
			}
			if (!q.value.client_id.trim()) {
				Y.value = "Client ID is required.";
				return;
			}
			ne.value = !0;
			try {
				let e = {
					provider_url: q.value.provider_url.trim(),
					client_id: q.value.client_id.trim(),
					scopes: q.value.scopes.trim() || lu
				};
				q.value.client_secret.trim() && (e.client_secret = q.value.client_secret), await f.saveOidcSettings(e), p.success("OIDC settings saved."), K.value = !1, R.value = await f.getOidcSettings(), await H();
			} catch (e) {
				Y.value = m(e, "Failed to save OIDC settings.");
			} finally {
				ne.value = !1;
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
				await f.saveLdapSettings(me()), p.success("LDAP settings saved."), se.value = !1, V.value = await f.getLdapSettings(), await H();
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
			w(), H();
		}), F(S), (e, t) => (L(), D("section", El, [
			t[37] ||= O("header", { class: "admin-integrations__head" }, [O("h1", {
				id: "integrations-heading",
				class: "admin-integrations__title"
			}, "Integrations")], -1),
			O("section", Dl, [O("div", Ol, [t[16] ||= O("h2", {
				id: "arr-sync-heading",
				class: "admin-integrations__section-title"
			}, "Arr sync (TRaSH-Guides)", -1), h.value ? (L(), T(_, {
				key: 0,
				tone: h.value.enabled ? "success" : "neutral"
			}, {
				default: X(() => [k(W(h.value.enabled ? "Enabled" : "Disabled"), 1)]),
				_: 1
			}, 8, ["tone"])) : E("", !0)]), O("div", kl, [g.value ? (L(), D("div", Al, [A(o, {
				variant: "text",
				lines: 3
			})])) : h.value === null ? (L(), D("p", jl, " Unable to load sync status. ")) : (L(), D(y, { key: 2 }, [O("dl", Ml, [
				t[17] ||= O("dt", { class: "admin-integrations__dt" }, "Last sync", -1),
				O("dd", Nl, W(h.value.last_sync_at ?? "Never synced"), 1),
				t[18] ||= O("dt", { class: "admin-integrations__dt" }, "Auto-sync", -1),
				O("dd", Pl, [A(v, {
					"model-value": h.value.enabled,
					label: h.value.enabled ? "Enabled" : "Disabled",
					"onUpdate:modelValue": M
				}, null, 8, ["model-value", "label"])])
			]), O("div", Fl, [A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "rewind",
				loading: b.value,
				onClick: j
			}, {
				default: X(() => [k(W(b.value ? "Syncing" : "Sync now"), 1)]),
				_: 1
			}, 8, ["loading"])])], 64))])]),
			O("section", Il, [t[20] ||= O("div", { class: "admin-integrations__section-head" }, [O("h2", {
				id: "auth-providers-heading",
				class: "admin-integrations__section-title"
			}, " Authentication providers ")], -1), P.value ? (L(), D("div", Ll, [A(o, {
				variant: "text",
				lines: 4
			})])) : (L(), D("div", Rl, [(L(), D(y, null, B(a, (e) => O("div", {
				key: e,
				class: "admin-integrations__provider"
			}, [O("div", zl, [O("span", Bl, W(r[e]), 1), A(_, { tone: U(e) ? "success" : "neutral" }, {
				default: X(() => [k(W(U(e) ? "Enabled" : "Disabled"), 1)]),
				_: 2
			}, 1032, ["tone"])]), O("div", Vl, [A(v, {
				"model-value": U(e),
				label: `Enable ${r[e]}`,
				"onUpdate:modelValue": () => G(e, U(e))
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
				modelValue: K.value,
				"onUpdate:modelValue": t[5] ||= (e) => K.value = e,
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
					loading: ne.value,
					onClick: Q
				}, {
					default: X(() => [...t[26] ||= [k("Save OIDC", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-integrations__form",
					onSubmit: ae(Q, ["prevent"])
				}, [
					O("label", Hl, [t[21] ||= O("span", { class: "admin-integrations__label" }, "Provider URL", -1), Z(O("input", {
						"onUpdate:modelValue": t[0] ||= (e) => q.value.provider_url = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "https://idp.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, q.value.provider_url]])]),
					O("label", Ul, [t[22] ||= O("span", { class: "admin-integrations__label" }, "Client ID", -1), Z(O("input", {
						"onUpdate:modelValue": t[1] ||= (e) => q.value.client_id = e,
						type: "text",
						class: "admin-integrations__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, q.value.client_id]])]),
					O("label", Wl, [
						t[23] ||= O("span", { class: "admin-integrations__label" }, "Client secret", -1),
						O("span", Gl, W(R.value?.configured ? "Leave blank to keep the current secret." : "Required when configuring for the first time."), 1),
						O("div", Kl, [Z(O("input", {
							"onUpdate:modelValue": t[2] ||= (e) => q.value.client_secret = e,
							type: re.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: R.value?.configured ? "(unchanged)" : "Client secret",
							autocomplete: "new-password"
						}, null, 8, ql), [[te, q.value.client_secret]]), A(i, {
							variant: "ghost",
							size: "sm",
							"left-icon": re.value ? "eye-off" : "eye",
							"aria-label": re.value ? "Hide secret" : "Show secret",
							onClick: t[3] ||= (e) => re.value = !re.value
						}, {
							default: X(() => [k(W(re.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					O("label", Jl, [t[24] ||= O("span", { class: "admin-integrations__label" }, "Scopes", -1), Z(O("input", {
						"onUpdate:modelValue": t[4] ||= (e) => q.value.scopes = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "openid profile email",
						autocomplete: "off"
					}, null, 512), [[J, q.value.scopes]])]),
					Y.value ? (L(), D("p", Yl, W(Y.value), 1)) : E("", !0)
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
					O("label", Xl, [t[27] ||= O("span", { class: "admin-integrations__label" }, "Host", -1), Z(O("input", {
						"onUpdate:modelValue": t[6] ||= (e) => $.value.host = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "ldap.example.com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, $.value.host]])]),
					O("label", Zl, [t[28] ||= O("span", { class: "admin-integrations__label" }, "Port", -1), O("input", {
						value: $.value.port,
						type: "number",
						min: "1",
						max: "65535",
						class: "admin-integrations__input",
						autocomplete: "off",
						onInput: t[7] ||= (e) => _e(e.target.value)
					}, null, 40, Ql)]),
					A(v, {
						modelValue: $.value.ssl,
						"onUpdate:modelValue": t[8] ||= (e) => $.value.ssl = e,
						label: "Use SSL"
					}, null, 8, ["modelValue"]),
					O("label", $l, [t[29] ||= O("span", { class: "admin-integrations__label" }, "Base DN", -1), Z(O("input", {
						"onUpdate:modelValue": t[9] ||= (e) => $.value.base_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "dc=example,dc=com",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, $.value.base_dn]])]),
					O("label", eu, [t[30] ||= O("span", { class: "admin-integrations__label" }, "Bind DN", -1), Z(O("input", {
						"onUpdate:modelValue": t[10] ||= (e) => $.value.bind_dn = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admin,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[J, $.value.bind_dn]])]),
					O("label", tu, [
						t[31] ||= O("span", { class: "admin-integrations__label" }, "Bind password", -1),
						O("span", nu, W(V.value?.configured ? "Leave blank to keep the current password." : "Required when configuring for the first time."), 1),
						O("div", ru, [Z(O("input", {
							"onUpdate:modelValue": t[11] ||= (e) => $.value.bind_pw = e,
							type: de.value ? "text" : "password",
							class: "admin-integrations__input",
							placeholder: V.value?.configured ? "(unchanged)" : "Bind password",
							autocomplete: "new-password"
						}, null, 8, iu), [[te, $.value.bind_pw]]), A(i, {
							variant: "ghost",
							size: "sm",
							"left-icon": de.value ? "eye-off" : "eye",
							"aria-label": de.value ? "Hide password" : "Show password",
							onClick: t[12] ||= (e) => de.value = !de.value
						}, {
							default: X(() => [k(W(de.value ? "Hide" : "Show"), 1)]),
							_: 1
						}, 8, ["left-icon", "aria-label"])])
					]),
					O("label", au, [t[32] ||= O("span", { class: "admin-integrations__label" }, "User filter", -1), Z(O("input", {
						"onUpdate:modelValue": t[13] ||= (e) => $.value.user_filter = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "(uid=%s)",
						autocomplete: "off"
					}, null, 512), [[J, $.value.user_filter]])]),
					O("label", ou, [t[33] ||= O("span", { class: "admin-integrations__label" }, "Admin group DN", -1), Z(O("input", {
						"onUpdate:modelValue": t[14] ||= (e) => $.value.admin_group = e,
						type: "text",
						class: "admin-integrations__input",
						placeholder: "cn=admins,dc=example,dc=com",
						autocomplete: "off"
					}, null, 512), [[J, $.value.admin_group]])]),
					ue.value ? (L(), D("p", su, W(ue.value), 1)) : E("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), du = /* @__PURE__ */ pe({ default: () => fu }), fu = /*#__PURE__*/ r(uu, [["__scopeId", "data-v-056074d4"]]), pu = class {
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
}, mu = { class: "admin-backup" }, hu = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, gu = { class: "admin-backup__head" }, _u = {
	key: 0,
	class: "admin-backup__skel"
}, vu = {
	key: 2,
	class: "admin-backup__table",
	"aria-label": "Backups"
}, yu = { key: 0 }, bu = {
	key: 1,
	class: "admin-backup__muted"
}, xu = { class: "admin-backup__num" }, Su = { class: "admin-backup__date" }, Cu = ["title"], wu = { class: "admin-backup__actions" }, Tu = {
	class: "admin-backup__section",
	"aria-labelledby": "schedule-heading"
}, Eu = {
	key: 0,
	class: "admin-backup__skel"
}, Du = {
	key: 1,
	class: "admin-backup__card"
}, Ou = { class: "admin-backup__next" }, ku = ["title"], Au = {
	key: 0,
	class: "admin-backup__muted"
}, ju = {
	key: 1,
	class: "admin-backup__muted"
}, Mu = { class: "admin-backup__form-row" }, Nu = { class: "admin-backup__field" }, Pu = { class: "admin-backup__field" }, Fu = { class: "admin-backup__form-actions" }, Iu = { class: "admin-backup__field" }, Lu = /*@__PURE__*/ j({
	__name: "BackupPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new pu(r.client ?? new e({
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
		function H() {
			R.value = null, V.value = !1;
		}
		async function U() {
			let e = R.value;
			if (e) {
				V.value = !0;
				try {
					let t = await l.restore(e.id);
					u.success(t.message || "Restore completed."), H();
				} catch (e) {
					u.error(p(e, "Restore failed.")), H();
				}
			}
		}
		let G = z(null), K = z(!1);
		function q() {
			G.value = null, K.value = !1;
		}
		async function te() {
			let e = G.value;
			if (e) {
				K.value = !0;
				try {
					await l.delete(e.id), u.success("Backup deleted."), q(), await S();
				} catch (e) {
					u.error(p(e, "Failed to delete backup.")), q();
				}
			}
		}
		async function ne(e) {
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
		let Y = z(null), re = z(!0), ie = z(""), oe = z(""), Q = z(!1);
		async function se() {
			re.value = !0;
			try {
				let e = await l.getSchedule();
				Y.value = e, ie.value = String(e.auto_backup_interval_days), oe.value = String(e.retention_count);
			} catch (e) {
				u.error(p(e, "Failed to load schedule."));
			} finally {
				re.value = !1;
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
				u.success("Schedule saved."), Y.value &&= {
					...Y.value,
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
		}), (e, t) => (L(), D("div", mu, [
			O("section", hu, [O("header", gu, [t[5] ||= O("h1", {
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
			})]), b.value ? (L(), D("div", _u, [A(o, {
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
			})) : (L(), D("table", vu, [t[10] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Label"),
				O("th", { scope: "col" }, "Size"),
				O("th", { scope: "col" }, "Created"),
				O("th", { scope: "col" }, "Storage"),
				O("th", {
					scope: "col",
					class: "admin-backup__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(v.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, [e.label ? (L(), D("span", yu, W(e.label), 1)) : (L(), D("span", bu, "Unnamed"))]),
				O("td", xu, W(m(e.size_bytes)), 1),
				O("td", Su, [O("span", { title: e.created_at }, W(h(e.created_at)), 9, Cu)]),
				O("td", null, [A(_, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: X(() => [k(W(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("td", null, [O("div", wu, [
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
						onClick: (t) => ne(e)
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
						onClick: (t) => G.value = e
					}, {
						default: X(() => [...t[9] ||= [k(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			O("section", Tu, [t[15] ||= O("header", { class: "admin-backup__head" }, [O("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), re.value ? (L(), D("div", Eu, [A(o, {
				variant: "text",
				lines: 3
			})])) : Y.value ? (L(), D("div", Du, [O("p", Ou, [t[11] ||= O("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), Y.value.next_scheduled_backup === null ? (L(), D("span", ju, "Not scheduled")) : (L(), D(y, { key: 0 }, [O("span", { title: Y.value.next_scheduled_backup_iso ?? "" }, W(g(Y.value.next_scheduled_backup)), 9, ku), Y.value.next_scheduled_backup_iso ? (L(), D("span", Au, " (" + W(Y.value.next_scheduled_backup_iso) + ") ", 1)) : E("", !0)], 64))]), O("form", {
				class: "admin-backup__form",
				onSubmit: ae($, ["prevent"])
			}, [O("div", Mu, [O("label", Nu, [t[12] ||= O("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), Z(O("input", {
				"onUpdate:modelValue": t[0] ||= (e) => ie.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[J, ie.value]])]), O("label", Pu, [t[13] ||= O("span", { class: "admin-backup__label" }, "Retention count", -1), Z(O("input", {
				"onUpdate:modelValue": t[1] ||= (e) => oe.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[J, oe.value]])])]), O("div", Fu, [A(i, {
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
				}, [O("label", Iu, [t[16] ||= O("span", { class: "admin-backup__label" }, "Label (optional)", -1), Z(O("input", {
					"onUpdate:modelValue": t[2] ||= (e) => j.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[J, j.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			A(d, {
				"model-value": R.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": H
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: X(() => [...t[19] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: U
				}, {
					default: X(() => [...t[20] ||= [k(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [t[21] ||= O("p", null, [k("This will overwrite your current data. "), O("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				"model-value": G.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": q
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: X(() => [...t[24] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: te
				}, {
					default: X(() => [...t[25] ||= [k(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("p", null, [
					t[22] ||= k(" Are you sure you want to delete backup ", -1),
					O("strong", null, W(G.value?.label || G.value?.id), 1),
					t[23] ||= k("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), Ru = /* @__PURE__ */ pe({ default: () => zu }), zu = /*#__PURE__*/ r(Lu, [["__scopeId", "data-v-b09885f4"]]);
//#endregion
//#region src/api/admin/cast.ts
function Bu(e) {
	return typeof e == "string" ? e : "";
}
function Vu(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function Hu(e, t) {
	let n = typeof e.media_status == "object" && e.media_status !== null ? e.media_status : {}, r = Bu(e.transport_state ?? e.state) || (e.active === !0 ? "PLAYING" : "STOPPED");
	return {
		device_id: Bu(e.device_id) || t,
		media_title: Bu(e.media_title ?? n.media_title ?? n.title),
		media_item_id: typeof e.media_item_id == "string" ? e.media_item_id : null,
		transport_state: r,
		volume_level: Vu(e.volume_level ?? n.volume_level),
		muted: e.muted === !0,
		position_seconds: Vu(e.position_seconds ?? n.position_seconds ?? n.current_time),
		duration_seconds: Vu(e.duration_seconds ?? n.duration_seconds ?? n.duration)
	};
}
function Uu(e, t) {
	return {
		device_id: Bu(e.device_id) || t,
		media_title: Bu(e.media_title),
		media_item_id: typeof e.media_item_id == "string" ? e.media_item_id : null,
		transport_state: Bu(e.transport_state ?? e.state) || (e.active === !0 ? "PLAYING" : "STOPPED"),
		volume_level: Vu(e.volume_level),
		muted: e.muted === !0
	};
}
var Wu = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listCastDevices() {
		let e = await this.client.get("/api/v1/cast/devices"), t = e.devices ?? e.data;
		return Array.isArray(t) ? t : [];
	}
	async getCastStatus(e) {
		return Hu(await this.client.get(`/api/v1/cast/devices/${encodeURIComponent(e)}/status`), e);
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
		return Uu(await this.client.get(`/api/v1/airplay/devices/${encodeURIComponent(e)}/status`), e);
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
}, Gu = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, Ku = {
	class: "admin-cast__tabs",
	role: "tablist",
	"aria-label": "Device type"
}, qu = [
	"aria-selected",
	"aria-controls",
	"onClick"
], Ju = ["id", "aria-label"], Yu = { class: "admin-cast__subtitle" }, Xu = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, Zu = {
	key: 2,
	class: "admin-cast__grid",
	role: "list"
}, Qu = [
	"aria-pressed",
	"aria-label",
	"onClick"
], $u = {
	class: "device-card__icon",
	"aria-hidden": "true"
}, ed = { class: "device-card__info" }, td = ["title"], nd = ["title"], rd = {
	key: 3,
	class: "admin-cast__session",
	"aria-labelledby": "transport-heading"
}, id = {
	key: 0,
	class: "admin-cast__player",
	"aria-live": "polite"
}, ad = {
	key: 1,
	class: "admin-cast__player"
}, od = {
	key: 2,
	class: "admin-cast__player"
}, sd = { class: "admin-cast__nowplaying" }, cd = { class: "admin-cast__media" }, ld = { class: "admin-cast__note" }, ud = { class: "admin-cast__muted" }, dd = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, fd = { class: "admin-cast__time" }, pd = { class: "admin-cast__time" }, md = { class: "admin-cast__buttons" }, hd = /*@__PURE__*/ j({
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
		}], s = r, l = ee("apiBase", ""), u = C(() => typeof l == "string" ? l : l?.value ?? ""), d = new Wu(s.client ?? new e({
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
		let g = z("chromecast"), v = z([]), b = z([]), x = z(!0), S = z(!0), w = z(null), j = z(null), M = z(!1), P = z(!1), F = C(() => g.value === "chromecast" ? v.value : b.value), R = C(() => g.value === "chromecast" ? x.value : S.value), V = C(() => a.find((e) => e.id === g.value)?.label ?? ""), H = C(() => a.find((e) => e.id === g.value)?.icon ?? "cast"), U = C(() => g.value === "chromecast"), G = C(() => F.value.find((e) => e.device_id === w.value)?.name ?? "");
		async function K() {
			x.value = !0;
			try {
				v.value = await d.listCastDevices();
			} catch (e) {
				p.error(m(e, "Failed to load Chromecast devices."));
			} finally {
				x.value = !1;
			}
		}
		async function q() {
			S.value = !0;
			try {
				b.value = await d.listAirPlayDevices();
			} catch (e) {
				p.error(m(e, "Failed to load AirPlay devices."));
			} finally {
				S.value = !1;
			}
		}
		async function te(e, t) {
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
		function J(e) {
			w.value = e, te(g.value, e);
		}
		function ne(e) {
			e !== g.value && (g.value = e, w.value = null, j.value = null);
		}
		async function Y() {
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
		async function re() {
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
			K(), q();
		}), (e, n) => (L(), D("section", Gu, [
			n[6] ||= O("header", { class: "admin-cast__head" }, [O("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			O("div", Ku, [(L(), D(y, null, B(a, (e) => O("button", {
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": g.value === e.id,
				"aria-controls": `panel-${e.id}`,
				class: N(["admin-cast__tab", { "admin-cast__tab--active": g.value === e.id }]),
				onClick: (t) => ne(e.id)
			}, [A(t, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), k(" " + W(e.label), 1)], 10, qu)), 64))]),
			O("div", {
				id: `panel-${g.value}`,
				role: "tabpanel",
				"aria-label": `${V.value} devices`,
				class: "admin-cast__panel"
			}, [
				O("h2", Yu, W(V.value) + " Devices", 1),
				R.value ? (L(), D("div", Xu, [A(o, {
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
				}, null, 8, ["title"])) : (L(), D("ul", Zu, [(L(!0), D(y, null, B(F.value, (e) => (L(), D("li", { key: e.device_id }, [O("button", {
					type: "button",
					class: N(["device-card", { "device-card--selected": w.value === e.device_id }]),
					"aria-pressed": w.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => J(e.device_id)
				}, [O("span", $u, [A(t, { name: H.value }, null, 8, ["name"])]), O("span", ed, [O("span", {
					class: "device-card__name",
					title: e.name
				}, W(e.name), 9, td), O("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, W(e.model), 9, nd)])], 10, Qu)]))), 128))])),
				w.value ? (L(), D("section", rd, [n[5] ||= O("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), M.value ? (L(), D("div", id, [...n[0] ||= [O("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : j.value ? (L(), D("div", od, [
					O("div", sd, [O("p", cd, W(j.value.mediaTitle || "No media"), 1), O("p", ld, [A(_, { tone: j.value.isPlaying ? "success" : "neutral" }, {
						default: X(() => [k(W(j.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), O("span", ud, "on " + W(G.value), 1)])]),
					U.value && j.value.duration !== null ? (L(), D("div", dd, [
						O("span", fd, W(h(j.value.position)), 1),
						A(ei, {
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
						O("span", pd, W(h(j.value.duration)), 1)
					])) : E("", !0),
					O("div", md, [
						A(i, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: j.value.isPlaying || P.value,
							onClick: Y
						}, {
							default: X(() => [...n[2] ||= [k(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						A(i, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !j.value.isPlaying || P.value,
							onClick: re
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
				])) : (L(), D("div", ad, [...n[1] ||= [O("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : E("", !0)
			], 8, Ju)
		]));
	}
}), gd = /* @__PURE__ */ pe({ default: () => _d }), _d = /*#__PURE__*/ r(hd, [["__scopeId", "data-v-8bd5485c"]]), vd = class {
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
}, yd = {
	class: "admin-dlna",
	"aria-labelledby": "dlna-heading"
}, bd = {
	class: "admin-dlna__card",
	"aria-live": "polite"
}, xd = {
	key: 0,
	class: "admin-dlna__loading",
	"aria-hidden": "true"
}, Sd = { class: "admin-dlna__status" }, Cd = {
	key: 0,
	class: "admin-dlna__details"
}, wd = { class: "admin-dlna__actions" }, Td = /*@__PURE__*/ j({
	__name: "DlnaServerPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new vd(r.client ?? new e({
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
		return I(v), (e, t) => (L(), D("section", yd, [
			t[4] ||= O("header", { class: "admin-dlna__head" }, [O("h1", {
				id: "dlna-heading",
				class: "admin-dlna__title"
			}, "DLNA Server")], -1),
			O("div", bd, [p.value ? (L(), D("div", xd, [A(o, {
				variant: "text",
				lines: 4
			})])) : g.value ? (L(), D(y, { key: 2 }, [
				O("div", Sd, [A(_, {
					tone: h.value ? "success" : "neutral",
					size: "md",
					icon: "monitor"
				}, {
					default: X(() => [k(W(h.value ? "Running" : "Stopped"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				h.value && d.value !== null ? (L(), D("dl", Cd, [
					d.value.friendlyName ? (L(), D(y, { key: 0 }, [t[0] ||= O("dt", null, "Friendly Name", -1), O("dd", null, W(d.value.friendlyName), 1)], 64)) : E("", !0),
					d.value.serverId ? (L(), D(y, { key: 1 }, [t[1] ||= O("dt", null, "UDN", -1), O("dd", null, W(d.value.serverId), 1)], 64)) : E("", !0),
					d.value.port === null ? E("", !0) : (L(), D(y, { key: 2 }, [t[2] ||= O("dt", null, "Port", -1), O("dd", null, W(d.value.port), 1)], 64)),
					d.value.baseUrl ? (L(), D(y, { key: 3 }, [t[3] ||= O("dt", null, "Base URL", -1), O("dd", null, W(d.value.baseUrl), 1)], 64)) : E("", !0)
				])) : E("", !0),
				O("div", wd, [h.value ? (L(), T(i, {
					key: 1,
					variant: "outline",
					loading: m.value,
					leftIcon: "pause",
					onClick: x
				}, {
					default: X(() => [k(W(m.value ? "Stopping…" : "Stop Server"), 1)]),
					_: 1
				}, 8, ["loading"])) : (L(), T(i, {
					key: 0,
					variant: "solid",
					loading: m.value,
					leftIcon: "play",
					onClick: b
				}, {
					default: X(() => [k(W(m.value ? "Starting…" : "Start Server"), 1)]),
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
}), Ed = /* @__PURE__ */ pe({ default: () => Dd }), Dd = /*#__PURE__*/ r(Td, [["__scopeId", "data-v-bde3d69c"]]), Od = class {
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
}, kd = {
	class: "admin-remote",
	"aria-labelledby": "remote-access-heading"
}, Ad = { class: "admin-remote__head" }, jd = {
	id: "remote-access-heading",
	class: "admin-remote__title"
}, Md = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-hub-heading"
}, Nd = ["aria-expanded"], Pd = { class: "admin-remote__section-title" }, Fd = { class: "admin-remote__section-summary" }, Id = {
	key: 0,
	id: "remote-hub-body",
	class: "admin-remote__section-body"
}, Ld = {
	key: 0,
	class: "admin-remote__skel"
}, Rd = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, zd = {
	key: 0,
	class: "admin-remote__dl"
}, Bd = { class: "admin-remote__actions" }, Vd = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-subdomain-heading"
}, Hd = ["aria-expanded"], Ud = { class: "admin-remote__section-title" }, Wd = { class: "admin-remote__section-summary" }, Gd = {
	key: 0,
	id: "remote-subdomain-body",
	class: "admin-remote__section-body"
}, Kd = {
	key: 0,
	class: "admin-remote__skel"
}, qd = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, Jd = {
	key: 0,
	class: "admin-remote__dl"
}, Yd = { class: "admin-remote__actions" }, Xd = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-relay-heading"
}, Zd = ["aria-expanded"], Qd = { class: "admin-remote__section-title" }, $d = { class: "admin-remote__section-summary" }, ef = {
	key: 0,
	id: "remote-relay-body",
	class: "admin-remote__section-body"
}, tf = {
	key: 0,
	class: "admin-remote__skel"
}, nf = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, rf = { class: "admin-remote__dl" }, af = { class: "admin-remote__actions" }, of = {
	class: "admin-remote__section",
	"aria-labelledby": "remote-portforward-heading"
}, sf = ["aria-expanded"], cf = { class: "admin-remote__section-title" }, lf = { class: "admin-remote__section-summary" }, uf = {
	key: 0,
	id: "remote-portforward-body",
	class: "admin-remote__section-body"
}, df = {
	key: 0,
	class: "admin-remote__skel"
}, ff = {
	key: 1,
	class: "admin-remote__empty",
	role: "status"
}, pf = { class: "admin-remote__dl" }, mf = {
	key: 0,
	class: "admin-remote__candidates"
}, hf = { class: "admin-remote__candidates-list" }, gf = { class: "admin-remote__actions" }, _f = {
	key: 0,
	class: "admin-remote__claim"
}, vf = { class: "admin-remote__claim-code" }, yf = { class: "admin-remote__field" }, bf = { class: "admin-remote__field" }, xf = /*@__PURE__*/ j({
	__name: "RemoteAccessPage",
	props: { client: {} },
	setup(r) {
		let a = r, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new Od(a.client ?? new e({
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
		async function H() {
			try {
				v.value = await u.hubStatus();
			} catch (e) {
				f.error(p(e, "Failed to load hub status."));
			} finally {
				b.value = !1;
			}
		}
		function U() {
			w.value = !0;
		}
		function G() {
			w.value = !1, N.value = null, P.value = null;
		}
		async function K() {
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
		async function q() {
			if (!(P.value === null || j.value === "") && !R.value) {
				R.value = !0;
				try {
					let e = await u.hubPoll(P.value, j.value);
					e.success && e.token ? (await u.hubComplete(e.token, "", e.serverId ?? "", j.value), f.success("Hub paired successfully."), G(), await H()) : !e.success && e.message && f.error(e.message);
				} catch (e) {
					f.error(p(e, "Failed to poll pairing status."));
				} finally {
					R.value = !1;
				}
			}
		}
		async function te() {
			if (!x.value) {
				x.value = !0;
				try {
					await u.hubUnenroll(), f.success("Hub unenrolled."), await H();
				} catch (e) {
					f.error(p(e, "Failed to unenroll."));
				} finally {
					x.value = !1;
				}
			}
		}
		async function ne() {
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
		let Y = z(null), re = z(!0), ie = z(!1), oe = z(!1), Q = C(() => re.value ? "Loading…" : Y.value === null ? "Unable to load" : Y.value.claimed ? `Claimed${Y.value.subdomain ? ` (${Y.value.subdomain})` : ""}` : "Not claimed");
		async function se() {
			try {
				Y.value = await u.subdomainStatus();
			} catch (e) {
				f.error(p(e, "Failed to load subdomain status."));
			} finally {
				re.value = !1;
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
			H(), se(), _e(), Oe();
		}), (e, n) => (L(), D("section", kd, [
			O("header", Ad, [O("h1", jd, [A(t, {
				name: "monitor",
				class: "admin-remote__title-icon"
			}), n[7] ||= k(" Remote Access ", -1)])]),
			O("section", Md, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.hub,
				"aria-controls": "remote-hub-body",
				onClick: n[0] ||= (e) => g("hub")
			}, [O("span", Pd, [n[8] ||= O("h2", { id: "remote-hub-heading" }, "Hub Pairing", -1), A(t, {
				name: h.value.hub ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", Fd, W(V.value), 1)], 8, Nd), h.value.hub ? (L(), D("div", Id, [b.value ? (L(), D("div", Ld, [A(o, {
				variant: "text",
				lines: 3
			})])) : v.value === null ? (L(), D("p", Rd, " Unable to load hub status. ")) : (L(), D(y, { key: 2 }, [v.value.paired ? (L(), D("dl", zd, [
				v.value.serverId ? (L(), D(y, { key: 0 }, [n[9] ||= O("dt", null, "Server ID", -1), O("dd", null, W(v.value.serverId), 1)], 64)) : E("", !0),
				v.value.hubUrl ? (L(), D(y, { key: 1 }, [n[10] ||= O("dt", null, "Hub URL", -1), O("dd", null, W(v.value.hubUrl), 1)], 64)) : E("", !0),
				v.value.enrolledAt ? (L(), D(y, { key: 2 }, [n[11] ||= O("dt", null, "Enrolled at", -1), O("dd", null, W(m(v.value.enrolledAt)), 1)], 64)) : E("", !0)
			])) : E("", !0), O("div", Bd, [v.value.paired ? (L(), D(y, { key: 1 }, [A(i, {
				variant: "outline",
				size: "sm",
				loading: S.value,
				onClick: ne
			}, {
				default: X(() => [...n[13] ||= [k(" Send Heartbeat ", -1)]]),
				_: 1
			}, 8, ["loading"]), A(i, {
				variant: "ghost",
				size: "sm",
				loading: x.value,
				onClick: te
			}, {
				default: X(() => [...n[14] ||= [k(" Unenroll ", -1)]]),
				_: 1
			}, 8, ["loading"])], 64)) : (L(), T(i, {
				key: 0,
				variant: "solid",
				size: "sm",
				onClick: U
			}, {
				default: X(() => [...n[12] ||= [k(" Initiate Pairing ", -1)]]),
				_: 1
			}))])], 64))])) : E("", !0)]),
			O("section", Vd, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.subdomain,
				"aria-controls": "remote-subdomain-body",
				onClick: n[1] ||= (e) => g("subdomain")
			}, [O("span", Ud, [n[15] ||= O("h2", { id: "remote-subdomain-heading" }, "Subdomain", -1), A(t, {
				name: h.value.subdomain ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", Wd, W(Q.value), 1)], 8, Hd), h.value.subdomain ? (L(), D("div", Gd, [re.value ? (L(), D("div", Kd, [A(o, {
				variant: "text",
				lines: 2
			})])) : Y.value === null ? (L(), D("p", qd, " Unable to load subdomain status. ")) : (L(), D(y, { key: 2 }, [Y.value.claimed ? (L(), D("dl", Jd, [Y.value.subdomain ? (L(), D(y, { key: 0 }, [n[16] ||= O("dt", null, "Subdomain", -1), O("dd", null, W(Y.value.subdomain), 1)], 64)) : E("", !0), Y.value.fqdn ? (L(), D(y, { key: 1 }, [n[17] ||= O("dt", null, "FQDN", -1), O("dd", null, W(Y.value.fqdn), 1)], 64)) : E("", !0)])) : E("", !0), O("div", Yd, [Y.value.claimed ? (L(), T(i, {
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
			O("section", Xd, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.relay,
				"aria-controls": "remote-relay-body",
				onClick: n[2] ||= (e) => g("relay")
			}, [O("span", Qd, [n[20] ||= O("h2", { id: "remote-relay-heading" }, "Relay Tunnel", -1), A(t, {
				name: h.value.relay ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", $d, W(he.value), 1)], 8, Zd), h.value.relay ? (L(), D("div", ef, [ue.value ? (L(), D("div", tf, [A(o, {
				variant: "text",
				lines: 2
			})])) : le.value === null ? (L(), D("p", nf, " Unable to load relay status. ")) : (L(), D(y, { key: 2 }, [O("dl", rf, [
				n[22] ||= O("dt", null, "Status", -1),
				O("dd", null, [A(_, { tone: le.value.connected ? "success" : "neutral" }, {
					default: X(() => [k(W(le.value.connected ? "Connected" : "Disconnected"), 1)]),
					_: 1
				}, 8, ["tone"])]),
				n[23] ||= O("dt", null, "Active", -1),
				O("dd", null, W(le.value.active ? "Yes" : "No"), 1),
				me.value === null ? E("", !0) : (L(), D(y, { key: 0 }, [n[21] ||= O("dt", null, "Latency", -1), O("dd", null, W(me.value) + "ms", 1)], 64))
			]), O("div", af, [A(i, {
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
			O("section", of, [O("button", {
				type: "button",
				class: "admin-remote__section-header",
				"aria-expanded": h.value.portforward,
				"aria-controls": "remote-portforward-body",
				onClick: n[3] ||= (e) => g("portforward")
			}, [O("span", cf, [n[27] ||= O("h2", { id: "remote-portforward-heading" }, "Port Forward", -1), A(t, {
				name: h.value.portforward ? "chevron-up" : "chevron-down",
				class: "admin-remote__chevron"
			}, null, 8, ["name"])]), O("span", lf, W(Ee.value), 1)], 8, sf), h.value.portforward ? (L(), D("div", uf, [Se.value ? (L(), D("div", df, [A(o, {
				variant: "text",
				lines: 3
			})])) : xe.value === null ? (L(), D("p", ff, " Unable to load port-forward status. ")) : (L(), D(y, { key: 2 }, [
				O("dl", pf, [
					n[31] ||= O("dt", null, "Enabled", -1),
					O("dd", null, [A(_, { tone: xe.value.enabled ? "success" : "neutral" }, {
						default: X(() => [k(W(xe.value.enabled ? "Yes" : "No"), 1)]),
						_: 1
					}, 8, ["tone"])]),
					xe.value.method ? (L(), D(y, { key: 0 }, [n[28] ||= O("dt", null, "Method", -1), O("dd", null, W(xe.value.method), 1)], 64)) : E("", !0),
					xe.value.externalIp ? (L(), D(y, { key: 1 }, [n[29] ||= O("dt", null, "External IP", -1), O("dd", null, W(xe.value.externalIp), 1)], 64)) : E("", !0),
					xe.value.externalPort ? (L(), D(y, { key: 2 }, [n[30] ||= O("dt", null, "External port", -1), O("dd", null, W(xe.value.externalPort), 1)], 64)) : E("", !0)
				]),
				Te.value.length > 0 ? (L(), D("div", mf, [n[32] ||= O("h3", { class: "admin-remote__candidates-title" }, "Hostname Candidates", -1), O("ul", hf, [(L(!0), D(y, null, B(Te.value, (e, t) => (L(), D("li", { key: t }, W(e.hostname), 1))), 128))])])) : E("", !0),
				O("div", gf, [xe.value.enabled ? (L(), T(i, {
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
				onClose: G
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: X(() => [...n[38] ||= [k("Cancel", -1)]]),
					_: 1
				}), N.value ? (L(), T(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: q
				}, {
					default: X(() => [...n[39] ||= [k(" Poll for Completion ", -1)]]),
					_: 1
				}, 8, ["loading"])) : (L(), T(i, {
					key: 1,
					variant: "solid",
					size: "sm",
					loading: F.value,
					disabled: j.value === "",
					onClick: K
				}, {
					default: X(() => [...n[40] ||= [k(" Initiate Pairing ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]))]),
				default: X(() => [N.value ? (L(), D("div", _f, [n[35] ||= O("p", null, "Enter this claim code on the hub:", -1), O("p", vf, W(N.value), 1)])) : (L(), D("form", {
					key: 1,
					class: "admin-remote__form",
					onSubmit: ae(K, ["prevent"])
				}, [O("label", yf, [n[36] ||= O("span", { class: "admin-remote__label" }, "Hub URL", -1), Z(O("input", {
					"onUpdate:modelValue": n[4] ||= (e) => j.value = e,
					type: "url",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "https://hub.example.com",
					required: ""
				}, null, 512), [[J, j.value]])]), O("label", bf, [n[37] ||= O("span", { class: "admin-remote__label" }, "Server name", -1), Z(O("input", {
					"onUpdate:modelValue": n[5] ||= (e) => M.value = e,
					type: "text",
					class: "admin-remote__input",
					autocomplete: "off",
					placeholder: "Phlix Server"
				}, null, 512), [[J, M.value]])])], 32))]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), Sf = /* @__PURE__ */ pe({ default: () => Cf }), Cf = /*#__PURE__*/ r(xf, [["__scopeId", "data-v-0f6d3051"]]), wf = class {
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
}, Tf = {
	class: "admin-livetv",
	"aria-labelledby": "livetv-heading"
}, Ef = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-tuners-heading"
}, Df = ["aria-expanded"], Of = { class: "admin-livetv__section-title-row" }, kf = { class: "admin-livetv__section-summary" }, Af = {
	key: 0,
	id: "livetv-tuners-body",
	class: "admin-livetv__section-body"
}, jf = { class: "admin-livetv__toolbar" }, Mf = {
	key: 0,
	class: "admin-livetv__skel"
}, Nf = {
	key: 2,
	class: "admin-livetv__card-grid"
}, Pf = { class: "admin-livetv__card-head" }, Ff = { class: "admin-livetv__card-title-row" }, If = { class: "admin-livetv__card-name" }, Lf = { class: "admin-livetv__dl" }, Rf = { class: "admin-livetv__card-actions" }, zf = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-guide-heading"
}, Bf = ["aria-expanded"], Vf = { class: "admin-livetv__section-title-row" }, Hf = { class: "admin-livetv__section-summary" }, Uf = {
	key: 0,
	id: "livetv-guide-body",
	class: "admin-livetv__section-body"
}, Wf = { class: "admin-livetv__toolbar" }, Gf = {
	class: "admin-livetv__segmented",
	role: "group",
	"aria-label": "Guide date"
}, Kf = ["aria-pressed", "onClick"], qf = {
	key: 0,
	class: "admin-livetv__skel"
}, Jf = {
	key: 2,
	class: "admin-livetv__guide-grid",
	role: "list"
}, Yf = ["onClick", "onKeydown"], Xf = { class: "admin-livetv__program-time" }, Zf = { class: "admin-livetv__program-title" }, Qf = {
	key: 0,
	class: "admin-livetv__program-desc"
}, $f = {
	key: 1,
	class: "admin-livetv__program-expanded"
}, ep = {
	key: 0,
	class: "admin-livetv__program-full-desc"
}, tp = { class: "admin-livetv__program-meta" }, np = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-recordings-heading"
}, rp = ["aria-expanded"], ip = { class: "admin-livetv__section-title-row" }, ap = { class: "admin-livetv__section-summary" }, op = {
	key: 0,
	id: "livetv-recordings-body",
	class: "admin-livetv__section-body"
}, sp = { class: "admin-livetv__toolbar" }, cp = {
	class: "admin-livetv__segmented",
	role: "tablist",
	"aria-label": "Recording filter"
}, lp = ["aria-selected", "onClick"], up = {
	key: 0,
	class: "admin-livetv__skel"
}, dp = {
	key: 2,
	class: "admin-livetv__rec-list"
}, fp = { class: "admin-livetv__card-head" }, pp = { class: "admin-livetv__card-name" }, mp = { class: "admin-livetv__rec-meta" }, hp = { key: 0 }, gp = { class: "admin-livetv__card-actions" }, _p = {
	class: "admin-livetv__section",
	"aria-labelledby": "livetv-rules-heading"
}, vp = ["aria-expanded"], yp = { class: "admin-livetv__section-title-row" }, bp = { class: "admin-livetv__section-summary" }, xp = {
	key: 0,
	id: "livetv-rules-body",
	class: "admin-livetv__section-body"
}, Sp = { class: "admin-livetv__toolbar" }, Cp = {
	key: 0,
	class: "admin-livetv__skel"
}, wp = {
	key: 2,
	class: "admin-livetv__rule-list"
}, Tp = { class: "admin-livetv__rule-info" }, Ep = { class: "admin-livetv__rule-title" }, Dp = { class: "admin-livetv__rule-meta" }, Op = { class: "admin-livetv__field" }, kp = { class: "admin-livetv__field" }, Ap = { class: "admin-livetv__field-row" }, jp = { class: "admin-livetv__field" }, Mp = { class: "admin-livetv__field" }, Np = { class: "admin-livetv__field-row" }, Pp = { class: "admin-livetv__field" }, Fp = { class: "admin-livetv__field" }, Ip = { class: "admin-livetv__field" }, Lp = { class: "admin-livetv__field" }, Rp = { class: "admin-livetv__field" }, zp = ["value"], Bp = { class: "admin-livetv__field" }, Vp = /*@__PURE__*/ j({
	__name: "LiveTvPage",
	props: { client: {} },
	setup(r) {
		let a = r, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new wf(a.client ?? new e({
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
		function H(e) {
			let t = P.value.find((t) => t.id === e.channel_id);
			return t ? `${t.name} (${t.number})` : e.channel_id ?? "Any channel";
		}
		let U = z([]), G = z(!1), K = z(!1), q = z(!1), te = R({});
		async function ne() {
			G.value = !0;
			try {
				U.value = await u.listTuners(), K.value = !0;
			} catch (e) {
				p.error(m(e, "Failed to load tuners."));
			} finally {
				G.value = !1;
			}
		}
		async function re() {
			if (!q.value) {
				q.value = !0;
				try {
					let e = await u.scanTuners();
					U.value = e, K.value = !0, p.success(`Scan complete. Found ${e.length} tuner(s).`);
				} catch (e) {
					p.error(m(e, "Tuner scan failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function oe(e) {
			if (!te[e.tuner_id]) {
				te[e.tuner_id] = !0;
				try {
					let t = await u.updateTuner(e.tuner_id, { enabled: !e.enabled });
					U.value = U.value.map((n) => n.tuner_id === e.tuner_id ? {
						...n,
						...t
					} : n);
				} catch (e) {
					p.error(m(e, "Failed to update tuner."));
				} finally {
					te[e.tuner_id] = !1;
				}
			}
		}
		let Q = z(null);
		async function se() {
			let e = Q.value;
			if (e) try {
				await u.deleteTuner(e.tuner_id), U.value = U.value.filter((t) => t.tuner_id !== e.tuner_id), p.success("Tuner removed."), Q.value = null;
			} catch (e) {
				p.error(m(e, "Failed to delete tuner.")), Q.value = null;
			}
		}
		let $ = C(() => G.value ? "Loading…" : U.value.length === 0 ? "No tuners found" : `${U.value.length} tuner${U.value.length === 1 ? "" : "s"} configured`), ce = z([]), le = z(!1), ue = z(!1), de = z(0), fe = z(null), pe = z(!1), me = [
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
		return Y(() => j.tuners, (e) => {
			e && !K.value && ne();
		}, { immediate: !0 }), Y(() => j.guide, (e) => {
			e && !ue.value && he(de.value);
		}), Y(() => j.recordings, (e) => {
			e && !Se.value && Te();
		}), Y(() => j.seriesRules, (e) => {
			e && !We.value && (Ge(), F());
		}), I(() => {}), (e, n) => (L(), D("section", Tf, [
			n[65] ||= O("header", { class: "admin-livetv__head" }, [O("h1", {
				id: "livetv-heading",
				class: "admin-livetv__title"
			}, "Live TV / DVR")], -1),
			O("section", Ef, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.tuners,
				"aria-controls": "livetv-tuners-body",
				onClick: n[0] ||= (e) => M("tuners")
			}, [O("span", Of, [
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
			]), O("span", kf, W($.value), 1)], 8, Df), j.tuners ? (L(), D("div", Af, [O("div", jf, [A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "monitor",
				loading: q.value,
				onClick: re
			}, {
				default: X(() => [...n[23] ||= [k(" Scan for Tuners ", -1)]]),
				_: 1
			}, 8, ["loading"])]), G.value ? (L(), D("div", Mf, [A(o, {
				variant: "text",
				lines: 3
			})])) : U.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "tv",
				title: "No tuners found",
				description: "Scan for Tuners to discover HDHomeRun devices on your network."
			})) : (L(), D("div", Nf, [(L(!0), D(y, null, B(U.value, (e) => (L(), D("article", {
				key: e.tuner_id,
				class: "admin-livetv__card"
			}, [
				O("div", Pf, [O("span", Ff, [A(_, { tone: e.type === "HDHomeRun" ? "accent" : "info" }, {
					default: X(() => [k(W(e.type), 1)]),
					_: 2
				}, 1032, ["tone"]), O("span", If, W(e.name), 1)]), A(_, { tone: e.enabled ? "success" : "neutral" }, {
					default: X(() => [k(W(e.enabled ? "Enabled" : "Disabled"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("dl", Lf, [
					n[27] ||= O("dt", null, "Host", -1),
					O("dd", null, W(e.host) + ":" + W(e.port), 1),
					e.device_id ? (L(), D(y, { key: 0 }, [n[24] ||= O("dt", null, "Device ID", -1), O("dd", null, W(e.device_id), 1)], 64)) : E("", !0),
					e.last_seen ? (L(), D(y, { key: 1 }, [n[25] ||= O("dt", null, "Last Seen", -1), O("dd", null, W(new Date(e.last_seen).toLocaleString()), 1)], 64)) : E("", !0),
					e.status ? (L(), D(y, { key: 2 }, [n[26] ||= O("dt", null, "Status", -1), O("dd", null, W(e.status), 1)], 64)) : E("", !0)
				]),
				O("div", Rf, [A(v, {
					"model-value": !!e.enabled,
					disabled: te[e.tuner_id],
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
			O("section", zf, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.guide,
				"aria-controls": "livetv-guide-body",
				onClick: n[1] ||= (e) => M("guide")
			}, [O("span", Vf, [
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
			]), O("span", Hf, W(ye.value), 1)], 8, Bf), j.guide ? (L(), D("div", Uf, [O("div", Wf, [O("div", Gf, [(L(), D(y, null, B(me, (e, t) => O("button", {
				key: e,
				type: "button",
				class: N(["admin-livetv__seg-btn", { "is-active": de.value === t }]),
				"aria-pressed": de.value === t,
				onClick: (e) => ge(t)
			}, W(e), 11, Kf)), 64))]), A(i, {
				variant: "outline",
				size: "sm",
				"left-icon": "rewind",
				loading: pe.value,
				onClick: ve
			}, {
				default: X(() => [...n[30] ||= [k(" Refresh Guide ", -1)]]),
				_: 1
			}, 8, ["loading"])]), le.value ? (L(), D("div", qf, [A(o, {
				variant: "text",
				lines: 4
			})])) : ce.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "calendar",
				title: "No programmes",
				description: "No programmes listed for this date. Try a different day or refresh the guide."
			})) : (L(), D("div", Jf, [(L(!0), D(y, null, B(ce.value, (e) => (L(), D("div", {
				key: e.id,
				class: N(["admin-livetv__program", { "is-selected": fe.value === e.id }]),
				role: "listitem",
				tabindex: "0",
				onClick: (t) => _e(e),
				onKeydown: [ie(ae((t) => _e(e), ["prevent"]), ["enter"]), ie(ae((t) => _e(e), ["prevent"]), ["space"])]
			}, [
				O("div", Xf, W(x(e.start_time)) + " – " + W(x(e.end_time)), 1),
				O("div", Zf, W(e.title), 1),
				e.description && fe.value !== e.id ? (L(), D("p", Qf, W(e.description.slice(0, 100)) + W(e.description.length > 100 ? "…" : ""), 1)) : E("", !0),
				fe.value === e.id ? (L(), D("div", $f, [e.description ? (L(), D("p", ep, W(e.description), 1)) : E("", !0), O("div", tp, [
					e.rating ? (L(), T(_, {
						key: 0,
						tone: "neutral"
					}, {
						default: X(() => [k("Rating: " + W(e.rating), 1)]),
						_: 2
					}, 1024)) : E("", !0),
					e.season ? (L(), T(_, {
						key: 1,
						tone: "info"
					}, {
						default: X(() => [k(W(w(e.season, e.episode)), 1)]),
						_: 2
					}, 1024)) : E("", !0),
					e.year ? (L(), T(_, {
						key: 2,
						tone: "neutral"
					}, {
						default: X(() => [k(W(e.year), 1)]),
						_: 2
					}, 1024)) : E("", !0)
				])])) : E("", !0)
			], 42, Yf))), 128))]))])) : E("", !0)]),
			O("section", np, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.recordings,
				"aria-controls": "livetv-recordings-body",
				onClick: n[2] ||= (e) => M("recordings")
			}, [O("span", ip, [
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
			]), O("span", ap, W(ke.value), 1)], 8, rp), j.recordings ? (L(), D("div", op, [O("div", sp, [O("div", cp, [(L(), D(y, null, B(we, (e) => O("button", {
				key: e.value,
				type: "button",
				role: "tab",
				class: N(["admin-livetv__seg-btn", { "is-active": Ce.value === e.value }]),
				"aria-selected": Ce.value === e.value,
				onClick: (t) => Ce.value = e.value
			}, W(e.label), 11, lp)), 64))]), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: ze
			}, {
				default: X(() => [...n[32] ||= [k(" Schedule Recording ", -1)]]),
				_: 1
			})]), xe.value ? (L(), D("div", up, [A(o, {
				variant: "text",
				lines: 3
			})])) : be.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "film",
				title: "No recordings",
				description: Ae.value
			}, null, 8, ["description"])) : (L(), D("div", dp, [(L(!0), D(y, null, B(be.value, (e) => (L(), D("article", {
				key: e.id,
				class: "admin-livetv__card"
			}, [
				O("div", fp, [O("span", pp, W(e.program_title ?? "Untitled"), 1), e.status ? (L(), T(_, {
					key: 0,
					tone: Oe(e.status)
				}, {
					default: X(() => [k(W(e.status), 1)]),
					_: 2
				}, 1032, ["tone"])) : E("", !0)]),
				O("div", mp, [
					O("span", null, W(e.channel_name ?? e.channel_id), 1),
					O("span", null, W(b(e.start_time)) + " · " + W(x(e.start_time)) + " – " + W(x(e.end_time)), 1),
					O("span", null, W(h(e.start_time, e.end_time)), 1),
					e.size ? (L(), D("span", hp, W(S(e.size)), 1)) : E("", !0)
				]),
				O("div", gp, [A(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Delete recording ${e.program_title ?? e.id}`,
					onClick: (t) => Ee.value = e
				}, {
					default: X(() => [...n[33] ||= [k(" Delete ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]))])) : E("", !0)]),
			O("section", _p, [O("button", {
				type: "button",
				class: "admin-livetv__section-header",
				"aria-expanded": j.seriesRules,
				"aria-controls": "livetv-rules-body",
				onClick: n[3] ||= (e) => M("seriesRules")
			}, [O("span", yp, [
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
			]), O("span", bp, W(Je.value), 1)], 8, vp), j.seriesRules ? (L(), D("div", xp, [O("div", Sp, [A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: nt
			}, {
				default: X(() => [...n[35] ||= [k("Add Rule", -1)]]),
				_: 1
			})]), Ue.value ? (L(), D("div", Cp, [A(o, {
				variant: "text",
				lines: 3
			})])) : He.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "list",
				title: "No series rules",
				description: "Add a rule to automatically record programmes by title pattern."
			})) : (L(), D("div", wp, [(L(!0), D(y, null, B(He.value, (e) => (L(), D("article", {
				key: e.id,
				class: "admin-livetv__rule"
			}, [O("div", Tp, [O("span", Ep, W(e.title_pattern), 1), O("div", Dp, [
				O("span", null, W(H(e)), 1),
				e.priority ? (L(), T(_, {
					key: 0,
					tone: "info"
				}, {
					default: X(() => [k("Priority " + W(e.priority), 1)]),
					_: 2
				}, 1024)) : E("", !0),
				e.keep_until ? (L(), T(_, {
					key: 1,
					tone: "neutral"
				}, {
					default: X(() => [k("Keep: " + W(e.keep_until), 1)]),
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
					O("label", Op, [n[37] ||= O("span", { class: "admin-livetv__label" }, "Title", -1), Z(O("input", {
						"onUpdate:modelValue": n[4] ||= (e) => Ne.value = e,
						type: "text",
						class: "admin-livetv__input",
						placeholder: "e.g. News at Six"
					}, null, 512), [[J, Ne.value]])]),
					O("label", kp, [n[38] ||= O("span", { class: "admin-livetv__label" }, "Channel", -1), A(g, {
						modelValue: Me.value,
						"onUpdate:modelValue": n[5] ||= (e) => Me.value = e,
						options: V.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					O("div", Ap, [O("label", jp, [n[39] ||= O("span", { class: "admin-livetv__label" }, "Start Date", -1), Z(O("input", {
						"onUpdate:modelValue": n[6] ||= (e) => Pe.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[J, Pe.value]])]), O("label", Mp, [n[40] ||= O("span", { class: "admin-livetv__label" }, "Start Time", -1), Z(O("input", {
						"onUpdate:modelValue": n[7] ||= (e) => Fe.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[J, Fe.value]])])]),
					O("div", Np, [O("label", Pp, [n[41] ||= O("span", { class: "admin-livetv__label" }, "End Date", -1), Z(O("input", {
						"onUpdate:modelValue": n[8] ||= (e) => Ie.value = e,
						type: "date",
						class: "admin-livetv__input"
					}, null, 512), [[J, Ie.value]])]), O("label", Fp, [n[42] ||= O("span", { class: "admin-livetv__label" }, "End Time", -1), Z(O("input", {
						"onUpdate:modelValue": n[9] ||= (e) => Le.value = e,
						type: "time",
						class: "admin-livetv__input"
					}, null, 512), [[J, Le.value]])])])
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
					O("label", Ip, [
						n[45] ||= O("span", { class: "admin-livetv__label" }, "Title Pattern", -1),
						Z(O("input", {
							"onUpdate:modelValue": n[11] ||= (e) => Xe.value = e,
							type: "text",
							class: "admin-livetv__input",
							placeholder: "e.g. News% or The Simpsons"
						}, null, 512), [[J, Xe.value]]),
						n[46] ||= O("span", { class: "admin-livetv__hint" }, " Use % as a wildcard, e.g. \"News%\" matches all programmes starting with News. ", -1)
					]),
					O("label", Lp, [n[47] ||= O("span", { class: "admin-livetv__label" }, "Channel", -1), A(g, {
						modelValue: Ze.value,
						"onUpdate:modelValue": n[12] ||= (e) => Ze.value = e,
						options: V.value,
						label: "Channel",
						placeholder: "Select a channel"
					}, null, 8, ["modelValue", "options"])]),
					O("label", Rp, [
						n[48] ||= O("span", { class: "admin-livetv__label" }, "Priority (1–5)", -1),
						O("input", {
							value: $e.value,
							type: "number",
							class: "admin-livetv__input",
							min: "1",
							max: "5",
							onInput: n[13] ||= (e) => $e.value = Number(e.target.value)
						}, null, 40, zp),
						n[49] ||= O("span", { class: "admin-livetv__hint" }, "Higher priority recordings are scheduled first.", -1)
					]),
					O("label", Bp, [n[50] ||= O("span", { class: "admin-livetv__label" }, "Keep Until", -1), A(g, {
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
					O("strong", null, W(Q.value?.name), 1),
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
					O("strong", null, W(Ee.value?.program_title ?? Ee.value?.id), 1),
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
					O("strong", null, W(Ke.value?.title_pattern), 1),
					n[62] ||= k("?", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), Hp = /* @__PURE__ */ pe({ default: () => Up }), Up = /*#__PURE__*/ r(Vp, [["__scopeId", "data-v-d53b3ae8"]]), Wp = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { collections: e } = await this.client.get("/api/v1/collections");
		return Array.isArray(e) ? e : [];
	}
	async get(e) {
		let t = await this.client.get(`/api/v1/collections/${encodeURIComponent(e)}`);
		return {
			collection: t.collection,
			items: Array.isArray(t.items) ? t.items : []
		};
	}
	create(e) {
		return this.client.post("/api/v1/collections", e);
	}
	update(e, t) {
		return this.client.put(`/api/v1/collections/${encodeURIComponent(e)}`, t);
	}
	remove(e) {
		return this.client.delete(`/api/v1/collections/${encodeURIComponent(e)}`);
	}
	addItem(e, t) {
		return this.client.post(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	removeItem(e, t) {
		return this.client.delete(`/api/v1/collections/${encodeURIComponent(e)}/items/${encodeURIComponent(t)}`);
	}
	bulkAdd(e, t) {
		return this.client.post(`/api/v1/collections/${encodeURIComponent(e)}/bulk-add`, { query: t });
	}
	refresh(e) {
		return this.client.post(`/api/v1/collections/${encodeURIComponent(e)}/refresh`);
	}
}, Gp = {
	class: "admin-collections",
	"aria-labelledby": "collections-heading"
}, Kp = { class: "admin-collections__head" }, qp = {
	key: 0,
	class: "admin-collections__skel"
}, Jp = {
	key: 2,
	class: "admin-collections__table",
	"aria-label": "Collections"
}, Yp = { class: "admin-collections__actions" }, Xp = { class: "admin-collections__field" }, Zp = {
	key: 0,
	class: "admin-collections__field"
}, Qp = {
	key: 0,
	class: "admin-collections__skel"
}, $p = { class: "admin-collections__field admin-collections__field--grow" }, em = {
	key: 1,
	class: "admin-collections__table",
	"aria-label": "Collection items"
}, tm = /*@__PURE__*/ j({
	__name: "CollectionsPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new Wp(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n();
		function p(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let m = z([]), h = z(!0);
		async function g() {
			h.value = !0;
			try {
				m.value = await l.list();
			} catch (e) {
				u.error(p(e, "Failed to load collections."));
			} finally {
				h.value = !1;
			}
		}
		let v = z(!1), b = z(null), x = z(""), S = z(""), w = z(!1), j = C(() => b.value ? `Edit collection — ${b.value.name}` : "New collection");
		function M() {
			b.value = null, x.value = "", S.value = m.value[0]?.library_id ?? "", v.value = !0;
		}
		function N(e) {
			b.value = e, x.value = e.name, S.value = e.library_id, v.value = !0;
		}
		function P() {
			v.value = !1, b.value = null;
		}
		async function F() {
			if (!x.value.trim()) {
				u.error("Name is required.");
				return;
			}
			let e = b.value;
			if (!e && !S.value.trim()) {
				u.error("Library is required.");
				return;
			}
			w.value = !0;
			try {
				if (e) {
					let t = { name: x.value };
					await l.update(e.id, t), u.success("Collection updated.");
				} else {
					let e = {
						name: x.value,
						library_id: S.value
					};
					await l.create(e), u.success("Collection created.");
				}
				P(), await g();
			} catch (e) {
				u.error(p(e, "Failed to save collection."));
			} finally {
				w.value = !1;
			}
		}
		let R = z(null);
		async function V() {
			let e = R.value;
			if (e) try {
				await l.remove(e.id), u.success("Collection deleted."), R.value = null, await g();
			} catch (e) {
				u.error(p(e, "Failed to delete collection.")), R.value = null;
			}
		}
		let H = z(null), U = z([]), G = z(!1), K = z(""), q = z(!1), te = C(() => H.value ? `Items — ${H.value.name}` : "Collection items"), ne = C({
			get: () => H.value !== null,
			set: (e) => {
				e || ie();
			}
		});
		async function Y(e) {
			G.value = !0;
			try {
				U.value = (await l.get(e)).items;
			} catch (e) {
				u.error(p(e, "Failed to load items."));
			} finally {
				G.value = !1;
			}
		}
		async function re(e) {
			H.value = e, U.value = [], K.value = "", await Y(e.id);
		}
		function ie() {
			H.value = null, U.value = [], K.value = "";
		}
		async function oe(e) {
			let t = H.value;
			if (t) try {
				await l.removeItem(t.id, e.id), u.success("Item removed."), await Y(t.id);
			} catch (e) {
				u.error(p(e, "Failed to remove item."));
			}
		}
		async function Q() {
			let e = H.value;
			if (e) {
				if (!K.value.trim()) {
					u.error("A query is required to bulk-add items.");
					return;
				}
				q.value = !0;
				try {
					await l.bulkAdd(e.id, K.value), u.success("Items added."), K.value = "", await Y(e.id);
				} catch (e) {
					u.error(p(e, "Failed to bulk-add items."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function se(e) {
			try {
				await l.refresh(e.id), u.success("Collection refreshed."), await g();
			} catch (e) {
				u.error(p(e, "Failed to refresh collection."));
			}
		}
		function $(e) {
			return typeof e.title == "string" && e.title ? e.title : e.id;
		}
		return I(g), (e, t) => (L(), D("section", Gp, [
			O("header", Kp, [t[8] ||= O("h1", {
				id: "collections-heading",
				class: "admin-collections__title"
			}, "Collections", -1), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: M
			}, {
				default: X(() => [...t[7] ||= [k(" New collection ", -1)]]),
				_: 1
			})]),
			h.value ? (L(), D("div", qp, [A(o, {
				variant: "text",
				lines: 6
			})])) : m.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "list",
				title: "No collections yet"
			}, {
				actions: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: M
				}, {
					default: X(() => [...t[9] ||= [k(" New collection ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (L(), D("table", Jp, [t[14] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Name"),
				O("th", { scope: "col" }, "Items"),
				O("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(m.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, W(e.name), 1),
				O("td", null, [A(_, {
					tone: "neutral",
					mono: ""
				}, {
					default: X(() => [k(W(e.item_count ?? 0), 1)]),
					_: 2
				}, 1024)]),
				O("td", null, [O("div", Yp, [
					A(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "film",
						"aria-label": `View items in ${e.name}`,
						onClick: (t) => re(e)
					}, {
						default: X(() => [...t[10] ||= [k(" Items ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "rewind",
						"aria-label": `Refresh ${e.name}`,
						onClick: (t) => se(e)
					}, {
						default: X(() => [...t[11] ||= [k(" Refresh ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => N(e)
					}, {
						default: X(() => [...t[12] ||= [k(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"left-icon": "x",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => R.value = e
					}, {
						default: X(() => [...t[13] ||= [k(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			A(d, {
				modelValue: v.value,
				"onUpdate:modelValue": t[2] ||= (e) => v.value = e,
				title: j.value,
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
					loading: w.value,
					onClick: F
				}, {
					default: X(() => [k(W(b.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-collections__form",
					onSubmit: ae(F, ["prevent"])
				}, [O("label", Xp, [t[15] ||= O("span", { class: "admin-collections__label" }, "Name", -1), Z(O("input", {
					"onUpdate:modelValue": t[0] ||= (e) => x.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[J, x.value]])]), b.value ? E("", !0) : (L(), D("label", Zp, [t[16] ||= O("span", { class: "admin-collections__label" }, "Library", -1), Z(O("input", {
					"onUpdate:modelValue": t[1] ||= (e) => S.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					required: ""
				}, null, 512), [[J, S.value]])]))], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			A(d, {
				"model-value": R.value !== null,
				title: "Delete collection",
				size: "sm",
				"onUpdate:modelValue": t[4] ||= (e) => R.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[3] ||= (e) => R.value = null
				}, {
					default: X(() => [...t[20] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: V
				}, {
					default: X(() => [...t[21] ||= [k("Delete", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					t[18] ||= k(" Delete collection ", -1),
					O("strong", null, W(R.value?.name), 1),
					t[19] ||= k("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				modelValue: ne.value,
				"onUpdate:modelValue": t[6] ||= (e) => ne.value = e,
				title: te.value,
				size: "lg"
			}, {
				footer: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					onClick: ie
				}, {
					default: X(() => [...t[26] ||= [k("Close", -1)]]),
					_: 1
				})]),
				default: X(() => [G.value ? (L(), D("div", Qp, [A(o, {
					variant: "text",
					lines: 4
				})])) : (L(), D(y, { key: 1 }, [O("form", {
					class: "admin-collections__bulk",
					onSubmit: ae(Q, ["prevent"])
				}, [O("label", $p, [t[22] ||= O("span", { class: "admin-collections__label" }, "Bulk add by query", -1), Z(O("input", {
					"onUpdate:modelValue": t[5] ||= (e) => K.value = e,
					type: "text",
					class: "admin-collections__input",
					autocomplete: "off",
					placeholder: "e.g. genre:action"
				}, null, 512), [[J, K.value]])]), A(i, {
					variant: "outline",
					size: "sm",
					"left-icon": "plus",
					loading: q.value,
					onClick: Q
				}, {
					default: X(() => [...t[23] ||= [k(" Add ", -1)]]),
					_: 1
				}, 8, ["loading"])], 32), U.value.length === 0 ? (L(), T(f, {
					key: 0,
					icon: "image",
					title: "No items in this collection."
				})) : (L(), D("table", em, [t[25] ||= O("thead", null, [O("tr", null, [O("th", { scope: "col" }, "Title"), O("th", {
					scope: "col",
					class: "admin-collections__actions-col"
				}, "Actions")])], -1), O("tbody", null, [(L(!0), D(y, null, B(U.value, (e) => (L(), D("tr", { key: e.id }, [O("td", null, W($(e)), 1), O("td", null, [A(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${$(e)}`,
					onClick: (t) => oe(e)
				}, {
					default: X(() => [...t[24] ||= [k(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])]))), 128))])]))], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), nm = /* @__PURE__ */ pe({ default: () => rm }), rm = /*#__PURE__*/ r(tm, [["__scopeId", "data-v-5fdeafac"]]), im = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getRecentlyWatched() {
		let { items: e } = await this.client.get("/api/v1/users/me/recently-watched");
		return Array.isArray(e) ? e : [];
	}
	async removeFromHistory(e) {
		return this.client.delete(`/api/v1/users/me/history/${encodeURIComponent(e)}`);
	}
	async clearHistory() {
		return this.client.delete("/api/v1/users/me/history");
	}
}, am = {
	class: "admin-history",
	"aria-labelledby": "history-heading"
}, om = { class: "admin-history__head" }, sm = {
	key: 0,
	class: "admin-history__skel"
}, cm = {
	class: "admin-history__list",
	"aria-label": "Watch history"
}, lm = { class: "admin-history__thumb" }, um = ["src", "alt"], dm = {
	key: 1,
	class: "admin-history__placeholder",
	"aria-hidden": "true"
}, fm = { class: "admin-history__info" }, pm = { class: "admin-history__title-row" }, mm = { class: "admin-history__item-title" }, hm = {
	key: 0,
	class: "admin-history__time"
}, gm = {
	key: 1,
	class: "admin-history__progress"
}, _m = ["aria-valuenow"], vm = { class: "admin-history__progress-label" }, ym = { class: "admin-history__actions" }, bm = {
	key: 0,
	class: "admin-history__more",
	role: "note"
}, xm = /*@__PURE__*/ j({
	__name: "HistoryPage",
	props: { client: {} },
	emits: ["continue"],
	setup(r, { emit: a }) {
		let s = r, l = a, u = ee("apiBase", ""), p = C(() => typeof u == "string" ? u : u?.value ?? ""), m = new im(s.client ?? new e({
			baseUrl: p.value,
			tokenStore: new c()
		})), h = n();
		function g(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let v = z([]), b = z(!0), x = z(!1), S = z(!1);
		async function w() {
			b.value = !0;
			try {
				v.value = await m.getRecentlyWatched();
			} catch (e) {
				h.error(g(e, "Failed to load watch history."));
			} finally {
				b.value = !1;
			}
		}
		async function j(e) {
			try {
				await m.removeFromHistory(e), h.success("Removed from watch history."), await w();
			} catch (e) {
				h.error(g(e, "Failed to remove item."));
			}
		}
		async function M() {
			S.value = !0;
			try {
				await m.clearHistory(), h.success("Watch history cleared."), x.value = !1, await w();
			} catch (e) {
				h.error(g(e, "Failed to clear history."));
			} finally {
				S.value = !1;
			}
		}
		function N(e) {
			l("continue", e);
		}
		function F(e) {
			let t = new Date(e), n = Math.floor(((/* @__PURE__ */ new Date()).getTime() - t.getTime()) / 1e3);
			if (n < 60) return "just now";
			let r = Math.floor(n / 60);
			if (r < 60) return `${r} minute${r === 1 ? "" : "s"} ago`;
			let i = Math.floor(r / 60);
			if (i < 24) return `${i} hour${i === 1 ? "" : "s"} ago`;
			let a = Math.floor(i / 24);
			if (a < 30) return `${a} day${a === 1 ? "" : "s"} ago`;
			let o = Math.floor(a / 30);
			return `${o} month${o === 1 ? "" : "s"} ago`;
		}
		function R(e) {
			return e.title ?? e.name ?? e.media_item_id ?? e.id;
		}
		function V(e) {
			return e.media_type ?? e.type ?? "media";
		}
		function H(e) {
			return e.thumbnail_url ?? e.poster_url;
		}
		function U(e) {
			let t = e.progress_percent;
			return t !== void 0 && t > 0 && t < 100;
		}
		function G(e) {
			return Math.round(e.progress_percent ?? 0);
		}
		function K(e) {
			return e.media_item_id ?? e.id;
		}
		let q = C(() => Array.isArray(v.value) && v.value.length > 0);
		return I(w), (e, n) => (L(), D("section", am, [
			O("header", om, [n[5] ||= O("h1", {
				id: "history-heading",
				class: "admin-history__title"
			}, "Watch History", -1), q.value ? (L(), T(i, {
				key: 0,
				variant: "outline",
				size: "sm",
				"left-icon": "x",
				onClick: n[0] ||= (e) => x.value = !0
			}, {
				default: X(() => [...n[4] ||= [k(" Clear All ", -1)]]),
				_: 1
			})) : E("", !0)]),
			b.value ? (L(), D("div", sm, [A(o, {
				variant: "text",
				lines: 6
			})])) : q.value ? (L(), D(y, { key: 2 }, [O("ul", cm, [(L(!0), D(y, null, B(v.value, (e) => (L(), D("li", {
				key: e.id,
				class: "admin-history__item"
			}, [
				O("div", lm, [H(e) ? (L(), D("img", {
					key: 0,
					src: H(e),
					alt: `Thumbnail for ${R(e)}`,
					class: "admin-history__img"
				}, null, 8, um)) : (L(), D("span", dm, [A(t, { name: "film" })]))]),
				O("div", fm, [
					O("div", pm, [O("span", mm, W(R(e)), 1), A(_, { tone: "neutral" }, {
						default: X(() => [k(W(V(e)), 1)]),
						_: 2
					}, 1024)]),
					e.last_watched_at ? (L(), D("p", hm, " Watched " + W(F(e.last_watched_at)), 1)) : E("", !0),
					U(e) ? (L(), D("div", gm, [O("div", {
						class: "admin-history__progress-track",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [O("div", {
						class: "admin-history__progress-fill",
						style: P({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, _m), O("span", vm, W(G(e)) + "%", 1)])) : E("", !0)
				]),
				O("div", ym, [U(e) ? (L(), T(i, {
					key: 0,
					variant: "solid",
					size: "sm",
					"left-icon": "play",
					"aria-label": `Continue watching ${R(e)}`,
					onClick: (t) => N(K(e))
				}, {
					default: X(() => [...n[6] ||= [k(" Continue ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])) : E("", !0), A(i, {
					variant: "ghost",
					size: "sm",
					"left-icon": "x",
					"aria-label": `Remove ${R(e)} from history`,
					onClick: (t) => j(K(e))
				}, {
					default: X(() => [...n[7] ||= [k(" Remove ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))]), v.value.length >= 50 ? (L(), D("p", bm, " Showing " + W(v.value.length) + " items. Older items are not shown. ", 1)) : E("", !0)], 64)) : (L(), T(f, {
				key: 1,
				icon: "film",
				title: "No watch history yet",
				description: "Items you watch will appear here."
			})),
			A(d, {
				modelValue: x.value,
				"onUpdate:modelValue": n[2] ||= (e) => x.value = e,
				title: "Clear Watch History",
				size: "sm",
				onClose: n[3] ||= (e) => x.value = !1
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					disabled: S.value,
					onClick: n[1] ||= (e) => x.value = !1
				}, {
					default: X(() => [...n[8] ||= [k(" Cancel ", -1)]]),
					_: 1
				}, 8, ["disabled"]), A(i, {
					variant: "solid",
					size: "sm",
					loading: S.value,
					onClick: M
				}, {
					default: X(() => [...n[9] ||= [k(" Clear All ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [n[10] ||= O("p", null, "Clear all items from your watch history? This cannot be undone.", -1)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), Sm = /* @__PURE__ */ pe({ default: () => Cm }), Cm = /*#__PURE__*/ r(xm, [["__scopeId", "data-v-1a2decc5"]]), wm = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listGroups() {
		let { groups: e } = await this.client.get("/api/v1/syncplay/groups");
		return Array.isArray(e) ? e : [];
	}
	createGroup(e) {
		return this.client.post("/api/v1/syncplay/groups", e);
	}
	getGroup(e) {
		return this.client.get(`/api/v1/syncplay/groups/${encodeURIComponent(e)}`);
	}
	joinGroup(e, t) {
		return this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/join`, t ?? {});
	}
	leaveGroup(e) {
		return this.client.post(`/api/v1/syncplay/groups/${encodeURIComponent(e)}/leave`, {});
	}
}, Tm = {
	class: "admin-syncplay",
	"aria-labelledby": "syncplay-heading"
}, Em = { class: "admin-syncplay__head" }, Dm = {
	key: 0,
	class: "admin-syncplay__skel"
}, Om = {
	key: 2,
	class: "admin-syncplay__table",
	"aria-label": "SyncPlay groups"
}, km = { class: "admin-syncplay__name" }, Am = { class: "admin-syncplay__media" }, jm = { class: "admin-syncplay__field" }, Mm = { class: "admin-syncplay__field" }, Nm = { class: "admin-syncplay__field" }, Pm = { class: "admin-syncplay__field" }, Fm = /*@__PURE__*/ j({
	__name: "SyncPlayPage",
	props: { client: {} },
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new wm(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n();
		function p(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let m = z([]), h = z(!0);
		async function g() {
			h.value = !0;
			try {
				m.value = await l.listGroups();
			} catch (e) {
				u.error(p(e, "Failed to load groups."));
			} finally {
				h.value = !1;
			}
		}
		let v = z(!1), b = z(""), x = z(""), S = z(!1);
		function w() {
			b.value = "", x.value = "", v.value = !0;
		}
		function j() {
			v.value = !1;
		}
		async function M() {
			if (!b.value.trim()) {
				u.error("Group name is required.");
				return;
			}
			S.value = !0;
			try {
				let e = { name: b.value.trim() };
				x.value.trim() && (e.password = x.value.trim()), await l.createGroup(e), u.success("Group created."), j(), await g();
			} catch (e) {
				u.error(p(e, "Failed to create group."));
			} finally {
				S.value = !1;
			}
		}
		let N = z(!1), P = z(""), F = z(""), R = z(!1);
		function V(e) {
			P.value = e ?? "", F.value = "", N.value = !0;
		}
		function H() {
			N.value = !1;
		}
		async function U() {
			if (!P.value.trim()) {
				u.error("Group ID is required.");
				return;
			}
			R.value = !0;
			try {
				let e = {};
				F.value.trim() && (e.password = F.value.trim()), await l.joinGroup(P.value.trim(), e), u.success("Joined group."), H();
			} catch (e) {
				u.error(p(e, "Failed to join group."));
			} finally {
				R.value = !1;
			}
		}
		function G(e) {
			return `${e} member${e === 1 ? "" : "s"}`;
		}
		return I(g), (e, t) => (L(), D("section", Tm, [
			O("header", Em, [t[7] ||= O("div", { class: "admin-syncplay__heading-group" }, [O("h1", {
				id: "syncplay-heading",
				class: "admin-syncplay__title"
			}, "SyncPlay"), O("p", { class: "admin-syncplay__subtitle" }, " Watch together with synchronized playback for multiple viewers. ")], -1), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: w
			}, {
				default: X(() => [...t[6] ||= [k(" Create group ", -1)]]),
				_: 1
			})]),
			h.value ? (L(), D("div", Dm, [A(o, {
				variant: "text",
				lines: 5
			})])) : m.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "tv",
				title: "No groups yet",
				description: "Create one to start watching together."
			}, {
				actions: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: w
				}, {
					default: X(() => [...t[8] ||= [k(" Create group ", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (L(), D("table", Om, [t[11] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Name"),
				O("th", { scope: "col" }, "Members"),
				O("th", { scope: "col" }, "Status"),
				O("th", { scope: "col" }, "Media"),
				O("th", {
					scope: "col",
					class: "admin-syncplay__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(m.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, [O("span", km, W(e.name), 1), e.has_password ? (L(), T(_, {
					key: 0,
					tone: "warning"
				}, {
					default: X(() => [...t[9] ||= [k("Password", -1)]]),
					_: 1
				})) : E("", !0)]),
				O("td", null, W(G(e.member_count)), 1),
				O("td", null, [A(_, { tone: e.is_playing ? "accent" : "neutral" }, {
					default: X(() => [k(W(e.is_playing ? "Playing" : "Idle"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				O("td", Am, W(e.current_media ?? "—"), 1),
				O("td", null, [A(i, {
					variant: "ghost",
					size: "sm",
					"aria-label": `Join ${e.name}`,
					onClick: (t) => V(e.id)
				}, {
					default: X(() => [...t[10] ||= [k(" Join ", -1)]]),
					_: 1
				}, 8, ["aria-label", "onClick"])])
			]))), 128))])])),
			A(d, {
				modelValue: v.value,
				"onUpdate:modelValue": t[2] ||= (e) => v.value = e,
				title: "Create SyncPlay group",
				onClose: j
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: j
				}, {
					default: X(() => [...t[14] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: S.value,
					onClick: M
				}, {
					default: X(() => [...t[15] ||= [k(" Create group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-syncplay__form",
					onSubmit: ae(M, ["prevent"])
				}, [O("label", jm, [t[12] ||= O("span", { class: "admin-syncplay__label" }, "Group name", -1), Z(O("input", {
					"onUpdate:modelValue": t[0] ||= (e) => b.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "Movie Night",
					required: ""
				}, null, 512), [[J, b.value]])]), O("label", Mm, [t[13] ||= O("span", { class: "admin-syncplay__label" }, "Password (optional)", -1), Z(O("input", {
					"onUpdate:modelValue": t[1] ||= (e) => x.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty for an open group"
				}, null, 512), [[J, x.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			A(d, {
				modelValue: N.value,
				"onUpdate:modelValue": t[5] ||= (e) => N.value = e,
				title: "Join SyncPlay group",
				onClose: H
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: X(() => [...t[18] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: U
				}, {
					default: X(() => [...t[19] ||= [k(" Join group ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-syncplay__form",
					onSubmit: ae(U, ["prevent"])
				}, [O("label", Nm, [t[16] ||= O("span", { class: "admin-syncplay__label" }, "Group ID", -1), Z(O("input", {
					"onUpdate:modelValue": t[3] ||= (e) => P.value = e,
					type: "text",
					class: "admin-syncplay__input",
					autocomplete: "off",
					placeholder: "sp_abc123def456",
					required: ""
				}, null, 512), [[J, P.value]])]), O("label", Pm, [t[17] ||= O("span", { class: "admin-syncplay__label" }, "Password (if required)", -1), Z(O("input", {
					"onUpdate:modelValue": t[4] ||= (e) => F.value = e,
					type: "password",
					class: "admin-syncplay__input",
					autocomplete: "new-password",
					placeholder: "Leave empty if no password"
				}, null, 512), [[J, F.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"])
		]));
	}
}), Im = /* @__PURE__ */ pe({ default: () => Lm }), Lm = /*#__PURE__*/ r(Fm, [["__scopeId", "data-v-0357add5"]]), Rm = [
	"movie",
	"series",
	"music",
	"photo",
	"video"
], zm = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { libraries: e } = await this.client.get("/api/v1/libraries");
		return Array.isArray(e) ? e : [];
	}
	async get(e) {
		let { library: t } = await this.client.get(`/api/v1/libraries/${encodeURIComponent(e)}`);
		return t;
	}
	create(e) {
		return this.client.post("/api/v1/libraries", e);
	}
	update(e, t) {
		return this.client.put(`/api/v1/libraries/${encodeURIComponent(e)}`, t);
	}
	remove(e) {
		return this.client.delete(`/api/v1/libraries/${encodeURIComponent(e)}`);
	}
	scan(e) {
		return this.client.post(`/api/v1/libraries/${encodeURIComponent(e)}/scan`);
	}
	rescan(e) {
		return this.client.post(`/api/v1/libraries/${encodeURIComponent(e)}/rescan`);
	}
	matchMetadata(e) {
		return this.client.post(`/api/v1/libraries/${encodeURIComponent(e)}/match-metadata`);
	}
	async scanStatus(e) {
		let { scan_status: t } = await this.client.get(`/api/v1/libraries/${encodeURIComponent(e)}/scan-status`);
		return t ?? null;
	}
	async scanHistory(e, t) {
		let n = t === void 0 ? void 0 : { limit: String(t) }, { history: r } = await this.client.get(`/api/v1/libraries/${encodeURIComponent(e)}/scan-history`, n);
		return Array.isArray(r) ? r : [];
	}
}, Bm = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, Vm = { class: "admin-libraries__head" }, Hm = {
	key: 0,
	class: "admin-libraries__skel"
}, Um = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, Wm = ["data-testid"], Gm = {
	key: 0,
	class: "admin-libraries__error"
}, Km = { class: "admin-libraries__actions" }, qm = { class: "admin-libraries__field" }, Jm = { class: "admin-libraries__field" }, Ym = ["value"], Xm = {
	key: 2,
	class: "admin-libraries__hint-text"
}, Zm = { class: "admin-libraries__field" }, Qm = {
	key: 0,
	class: "admin-libraries__skel"
}, $m = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, eh = { class: "admin-libraries__date" }, th = { class: "admin-libraries__date" }, nh = 2e3, rh = /*@__PURE__*/ j({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(t) {
		let r = t, a = ee("apiBase", ""), s = C(() => typeof a == "string" ? a : a?.value ?? ""), l = new zm(r.client ?? new e({
			baseUrl: s.value,
			tokenStore: new c()
		})), u = n(), p = C(() => r.pollIntervalMs ?? nh);
		function m(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let h = C(() => Rm.map((e) => ({
			value: e,
			label: e
		})));
		function v(e) {
			return e === "completed" || e === "failed";
		}
		function b(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function x(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let S = z([]), w = z(!0), j = z({}), M = {};
		function N(e) {
			let t = M[e];
			t !== void 0 && (clearInterval(t), delete M[e]);
		}
		async function P(e) {
			try {
				let t = await l.scanStatus(e);
				j.value = {
					...j.value,
					[e]: t
				}, (t === null || v(t.status)) && N(e);
			} catch {
				N(e);
			}
		}
		function R(e) {
			M[e] === void 0 && (M[e] = setInterval(() => {
				P(e);
			}, p.value));
		}
		async function V() {
			w.value = !0;
			try {
				let e = await l.list();
				S.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await l.scanStatus(e.id);
						j.value = {
							...j.value,
							[e.id]: t
						}, t !== null && !v(t.status) && R(e.id);
					} catch {}
				}));
			} catch (e) {
				u.error(m(e, "Failed to load libraries."));
			} finally {
				w.value = !1;
			}
		}
		let H = z(!1), U = z(null), G = z(""), K = z(Rm[0]), q = z(""), te = z(!1), ne = C(() => U.value ? "Edit library" : "Add library");
		function Y() {
			return q.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function re() {
			U.value = null, G.value = "", K.value = Rm[0], q.value = "", H.value = !0;
		}
		function ie(e) {
			U.value = e, G.value = e.name, K.value = Rm.find((t) => t === e.type) ?? Rm[0], q.value = e.paths.join("\n"), H.value = !0;
		}
		function oe() {
			H.value = !1, U.value = null;
		}
		async function Q() {
			if (!G.value.trim()) {
				u.error("Name is required.");
				return;
			}
			let e = Y();
			if (e.length === 0) {
				u.error("Select at least one path.");
				return;
			}
			te.value = !0;
			try {
				let t = U.value;
				if (t) await l.update(t.id, {
					name: G.value,
					paths: e
				}), u.success("Library updated.");
				else {
					let t = await l.create({
						name: G.value,
						type: K.value,
						paths: e
					});
					u.success(t.message || "Library created.");
				}
				oe(), await V();
			} catch (e) {
				u.error(m(e, "Failed to save library."));
			} finally {
				te.value = !1;
			}
		}
		let se = z(null);
		async function $() {
			let e = se.value;
			if (e) try {
				await l.remove(e.id), u.success("Library deleted."), se.value = null, await V();
			} catch (e) {
				u.error(m(e, "Failed to delete library.")), se.value = null;
			}
		}
		async function ce(e, t) {
			try {
				let n = t === "metadata" ? await l.matchMetadata(e.id) : t === "rescan" ? await l.rescan(e.id) : await l.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				u.success(n.message || r);
				let i = j.value[e.id];
				j.value = {
					...j.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, R(e.id), P(e.id);
			} catch (e) {
				u.error(m(e, "Failed to queue scan."));
			}
		}
		let le = z(null), ue = z([]), de = z(!1), fe = C(() => le.value ? `Scan history — ${le.value.name}` : "Scan history"), pe = C({
			get: () => le.value !== null,
			set: (e) => {
				e || he();
			}
		});
		async function me(e) {
			le.value = e, ue.value = [], de.value = !0;
			try {
				ue.value = await l.scanHistory(e.id);
			} catch (e) {
				u.error(m(e, "Failed to load history."));
			} finally {
				de.value = !1;
			}
		}
		function he() {
			le.value = null, ue.value = [];
		}
		return I(V), F(() => {
			for (let e of Object.keys(M)) clearInterval(M[e]), delete M[e];
		}), (e, t) => (L(), D("section", Bm, [
			O("header", Vm, [t[8] ||= O("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), A(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: re
			}, {
				default: X(() => [...t[7] ||= [k("Add library", -1)]]),
				_: 1
			})]),
			t[27] ||= O("p", { class: "admin-libraries__hint" }, " Scan progress is coarse in this release — only the lifecycle (queued / running / completed / failed) is reported, not per-file detail. ", -1),
			w.value ? (L(), D("div", Hm, [A(o, {
				variant: "text",
				lines: 6
			})])) : S.value.length === 0 ? (L(), T(f, {
				key: 1,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: re
				}, {
					default: X(() => [...t[9] ||= [k("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (L(), D("table", Um, [t[16] ||= O("thead", null, [O("tr", null, [
				O("th", { scope: "col" }, "Name"),
				O("th", { scope: "col" }, "Type"),
				O("th", { scope: "col" }, "Paths"),
				O("th", { scope: "col" }, "Status"),
				O("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), O("tbody", null, [(L(!0), D(y, null, B(S.value, (e) => (L(), D("tr", { key: e.id }, [
				O("td", null, W(e.name), 1),
				O("td", null, W(e.type), 1),
				O("td", null, W(e.paths.length) + " paths", 1),
				O("td", null, [O("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [A(_, { tone: x(j.value[e.id]) }, {
					default: X(() => [k(W(b(j.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), j.value[e.id]?.status === "failed" && j.value[e.id]?.error ? (L(), D("span", Gm, W(j.value[e.id]?.error), 1)) : E("", !0)], 8, Wm)]),
				O("td", null, [O("div", Km, [
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => ie(e)
					}, {
						default: X(() => [...t[10] ||= [k(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => ce(e, "scan")
					}, {
						default: X(() => [...t[11] ||= [k(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => ce(e, "rescan")
					}, {
						default: X(() => [...t[12] ||= [k(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => ce(e, "metadata")
					}, {
						default: X(() => [...t[13] ||= [k(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => me(e)
					}, {
						default: X(() => [...t[14] ||= [k(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					A(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => se.value = e
					}, {
						default: X(() => [...t[15] ||= [k(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			A(d, {
				modelValue: H.value,
				"onUpdate:modelValue": t[3] ||= (e) => H.value = e,
				title: ne.value,
				onClose: oe
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: oe
				}, {
					default: X(() => [...t[20] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					loading: te.value,
					onClick: Q
				}, {
					default: X(() => [k(W(U.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: X(() => [O("form", {
					class: "admin-libraries__form",
					onSubmit: ae(Q, ["prevent"])
				}, [
					O("label", qm, [t[17] ||= O("span", { class: "admin-libraries__label" }, "Name", -1), Z(O("input", {
						"onUpdate:modelValue": t[0] ||= (e) => G.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[J, G.value]])]),
					O("div", Jm, [
						t[18] ||= O("span", { class: "admin-libraries__label" }, "Type", -1),
						U.value ? (L(), D("input", {
							key: 0,
							class: "admin-libraries__input",
							value: K.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Ym)) : (L(), T(g, {
							key: 1,
							"model-value": K.value,
							options: h.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => K.value = String(e)
						}, null, 8, ["model-value", "options"])),
						U.value ? (L(), D("span", Xm, "Type cannot be changed.")) : E("", !0)
					]),
					O("label", Zm, [t[19] ||= O("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), Z(O("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => q.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[J, q.value]])])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			A(d, {
				"model-value": se.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[5] ||= (e) => se.value = null
			}, {
				footer: X(() => [A(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[4] ||= (e) => se.value = null
				}, {
					default: X(() => [...t[23] ||= [k("Cancel", -1)]]),
					_: 1
				}), A(i, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: X(() => [...t[24] ||= [k("Delete", -1)]]),
					_: 1
				})]),
				default: X(() => [O("p", null, [
					t[21] ||= k(" Delete library ", -1),
					O("strong", null, W(se.value?.name), 1),
					t[22] ||= k("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			A(d, {
				modelValue: pe.value,
				"onUpdate:modelValue": t[6] ||= (e) => pe.value = e,
				title: fe.value,
				size: "lg"
			}, {
				footer: X(() => [A(i, {
					variant: "solid",
					size: "sm",
					onClick: he
				}, {
					default: X(() => [...t[26] ||= [k("Close", -1)]]),
					_: 1
				})]),
				default: X(() => [de.value ? (L(), D("div", Qm, [A(o, {
					variant: "text",
					lines: 4
				})])) : ue.value.length === 0 ? (L(), T(f, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (L(), D("table", $m, [t[25] ||= O("thead", null, [O("tr", null, [
					O("th", { scope: "col" }, "Type"),
					O("th", { scope: "col" }, "Status"),
					O("th", { scope: "col" }, "Queued"),
					O("th", { scope: "col" }, "Completed"),
					O("th", { scope: "col" }, "Error")
				])], -1), O("tbody", null, [(L(!0), D(y, null, B(ue.value, (e) => (L(), D("tr", { key: e.id }, [
					O("td", null, W(e.type), 1),
					O("td", null, [A(_, { tone: x(e) }, {
						default: X(() => [k(W(b(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					O("td", eh, W(e.queued_at ?? ""), 1),
					O("td", th, W(e.completed_at ?? ""), 1),
					O("td", null, W(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), ih = /* @__PURE__ */ pe({ default: () => ah }), ah = /*#__PURE__*/ r(rh, [["__scopeId", "data-v-b6d52441"]]), oh = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async get() {
		let { data: e } = await this.client.get("/api/v1/admin/settings");
		return {
			settings: sh(e?.settings) ? e.settings : {},
			overridden: Array.isArray(e?.overridden) ? e.overridden : [],
			types: sh(e?.types) ? e.types : {}
		};
	}
	async save(e) {
		let { data: t } = await this.client.put("/api/v1/admin/settings", { settings: e });
		return {
			settings: sh(t?.settings) ? t.settings : {},
			overridden: Array.isArray(t?.overridden) ? t.overridden : []
		};
	}
};
function sh(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
//#endregion
//#region src/pages/admin/SettingsPage.vue?vue&type=script&setup=true&lang.ts
var ch = {
	class: "admin-settings",
	"aria-labelledby": "settings-heading"
}, lh = {
	key: 0,
	class: "admin-settings__skel"
}, uh = {
	class: "admin-settings__tabs",
	role: "tablist",
	"aria-label": "Settings groups"
}, dh = ["aria-selected", "onClick"], fh = ["aria-label"], ph = {
	key: 0,
	class: "admin-settings__empty",
	role: "status"
}, mh = {
	key: 0,
	class: "admin-settings__row"
}, hh = ["for"], gh = [
	"id",
	"value",
	"min",
	"max",
	"step",
	"placeholder",
	"onInput"
], _h = ["for"], vh = ["for"], yh = { class: "admin-settings__row" }, bh = [
	"id",
	"type",
	"value",
	"onInput"
], xh = ["for"], Sh = [
	"id",
	"value",
	"onInput"
], Ch = {
	key: 5,
	class: "admin-settings__error",
	role: "alert"
}, wh = {
	key: 6,
	class: "admin-settings__help"
}, Th = { class: "admin-settings__actions" }, Eh = /*@__PURE__*/ j({
	__name: "SettingsPage",
	props: { client: {} },
	setup(t) {
		let r = t, s = ee("apiBase", ""), l = C(() => typeof s == "string" ? s : s?.value ?? ""), u = new oh(r.client ?? new e({
			baseUrl: l.value,
			tokenStore: new c()
		})), d = n(), f = [
			{
				id: "transcoding",
				label: "Transcoding"
			},
			{
				id: "metadata",
				label: "Metadata"
			},
			{
				id: "markers",
				label: "Markers"
			},
			{
				id: "subtitles",
				label: "Subtitles"
			},
			{
				id: "discovery",
				label: "Discovery"
			},
			{
				id: "trickplay",
				label: "Trickplay"
			},
			{
				id: "newsletter",
				label: "Newsletter"
			},
			{
				id: "port-forward",
				label: "Port Forward"
			},
			{
				id: "scrobblers",
				label: "Scrobblers"
			}
		], p = {
			transcoding: [
				"hwaccel.enabled",
				"hwaccel.prefer_hardware",
				"hwaccel.probe_timeout"
			],
			metadata: ["tmdb.api_key"],
			markers: ["marker_detection.similarity_threshold", "marker_detection.intro_max_duration"],
			subtitles: [
				"subtitles.enabled",
				"subtitles.default_language",
				"subtitles.burn_in_by_default"
			],
			discovery: ["discovery.discovery_port"],
			trickplay: ["trickplay.enabled", "trickplay.interval_seconds"],
			newsletter: ["newsletter.enabled", "newsletter.send_hour"],
			"port-forward": ["port-forward.port_forwarding.upnp_enabled"],
			scrobblers: [
				"trakt.client_id",
				"trakt.client_secret",
				"trakt.redirect_uri"
			]
		}, m = {
			"hwaccel.probe_timeout": { min: 0 },
			"marker_detection.similarity_threshold": {
				min: 0,
				max: 1
			},
			"marker_detection.intro_max_duration": { min: 0 },
			"discovery.discovery_port": {
				min: 1,
				max: 65535
			},
			"trickplay.interval_seconds": { min: 1 },
			"newsletter.send_hour": {
				min: 0,
				max: 23
			}
		}, h = new Set(["tmdb.api_key", "trakt.client_secret"]), b = { "subtitles.default_language": [
			{
				value: "en",
				label: "English"
			},
			{
				value: "es",
				label: "Spanish"
			},
			{
				value: "fr",
				label: "French"
			},
			{
				value: "de",
				label: "German"
			},
			{
				value: "it",
				label: "Italian"
			},
			{
				value: "ja",
				label: "Japanese"
			}
		] }, x = {
			"tmdb.api_key": "TMDB API Key",
			"trakt.client_id": "Trakt Client ID",
			"trakt.client_secret": "Trakt Client Secret",
			"trakt.redirect_uri": "Trakt Redirect URI"
		}, S = {
			"tmdb.api_key": "Your TMDB (The Movie Database) API key — get one free at themoviedb.org → Settings → API (v3 auth). Used to fetch movie & TV metadata, posters, and external IDs.",
			"trakt.client_id": "Register an application at trakt.tv/oauth/applications to get a client ID and secret. Saving here overrides the TRAKT_CLIENT_ID environment variable.",
			"trakt.client_secret": "The client secret paired with your Trakt client ID. Overrides the TRAKT_CLIENT_SECRET environment variable.",
			"trakt.redirect_uri": "Must exactly match the redirect URI registered in your Trakt app — this server's /api/v1/oauth/trakt/callback URL."
		};
		function w(e) {
			return x[e] ? x[e] : (e.split(".").pop() ?? e).replace(/_/g, " ").replace(/\b[a-z]/g, (e) => e.toUpperCase());
		}
		function j(e) {
			return P.value.includes(e);
		}
		let M = z({}), P = z([]), F = z({}), V = z("transcoding"), H = z(!0), U = z(!1), G = z({}), q = R({}), te = R({}), J = R({}), ne = C(() => Object.values(J).some(Boolean)), Y = C(() => p[V.value] ?? []);
		function re(e) {
			for (let e of Object.keys(te)) delete te[e];
			for (let [t, n] of Object.entries(e)) te[t] = String(n ?? "");
		}
		function Z() {
			for (let e of Object.keys(J)) delete J[e];
		}
		async function ie() {
			H.value = !0;
			try {
				let e = await u.get();
				M.value = e.settings, P.value = e.overridden, F.value = e.types, re(e.settings), Z(), G.value = {};
			} catch (e) {
				d.error(e instanceof a ? e.message : "Failed to load settings.");
			} finally {
				H.value = !1;
			}
		}
		function oe(e) {
			return F.value[e] ?? "string";
		}
		function Q(e) {
			return b[e] !== void 0;
		}
		function se(e) {
			return b[e] ?? [];
		}
		function $(e) {
			return m[e] ?? {};
		}
		function ce(e, t) {
			te[e] = t, J[e] = t !== String(M.value[e] ?? "");
		}
		function le(e) {
			q[e] = !q[e];
		}
		async function ue() {
			U.value = !0, G.value = {};
			try {
				let e = {};
				for (let [t, n] of Object.entries(J)) {
					if (!n) continue;
					let r = F.value[t], i = te[t] ?? "";
					r === "bool" ? e[t] = i === "true" || i === "1" : r === "int" ? e[t] = parseInt(i, 10) : r === "float" ? e[t] = parseFloat(i) : e[t] = i;
				}
				let t = await u.save(e);
				d.success("Settings saved."), M.value = t.settings, P.value = t.overridden, Z(), re(t.settings);
			} catch (e) {
				if (e instanceof a && e.status === 400) {
					let t = e.body;
					t?.errors && Object.keys(t.errors).length > 0 ? (G.value = t.errors, d.error("Please fix the validation errors.")) : d.error(e.message);
				} else d.error(e instanceof a ? e.message : "Failed to save settings.");
			} finally {
				U.value = !1;
			}
		}
		return I(ie), (e, t) => (L(), D("section", ch, [t[6] ||= O("header", { class: "admin-settings__head" }, [O("h1", {
			id: "settings-heading",
			class: "admin-settings__title"
		}, "Settings")], -1), H.value ? (L(), D("div", lh, [A(o, {
			variant: "text",
			lines: 6
		})])) : (L(), D(y, { key: 1 }, [O("div", uh, [(L(), D(y, null, B(f, (e) => O("button", {
			key: e.id,
			type: "button",
			role: "tab",
			"aria-selected": V.value === e.id,
			class: N(["admin-settings__tab", { "is-active": V.value === e.id }]),
			onClick: (t) => V.value = e.id
		}, W(e.label), 11, dh)), 64))]), O("div", {
			class: "admin-settings__panel",
			role: "tabpanel",
			"aria-label": `${V.value} settings`
		}, [Y.value.length === 0 ? (L(), D("p", ph, " No settings in this group. ")) : (L(), D("form", {
			key: 1,
			class: "admin-settings__form",
			onSubmit: ae(ue, ["prevent"])
		}, [(L(!0), D(y, null, B(Y.value, (e) => (L(), D("div", {
			key: e,
			class: "admin-settings__field"
		}, [
			oe(e) === "bool" ? (L(), D("div", mh, [A(v, {
				"model-value": te[e] === "true" || te[e] === "1",
				label: w(e),
				"onUpdate:modelValue": (t) => ce(e, t ? "true" : "false")
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			]), j(e) ? (L(), T(_, {
				key: 0,
				tone: "accent"
			}, {
				default: X(() => [...t[0] ||= [k("custom", -1)]]),
				_: 1
			})) : E("", !0)])) : oe(e) === "int" || oe(e) === "float" ? (L(), D(y, { key: 1 }, [O("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [k(W(w(e)) + " ", 1), j(e) ? (L(), T(_, {
				key: 0,
				tone: "accent"
			}, {
				default: X(() => [...t[1] ||= [k("custom", -1)]]),
				_: 1
			})) : E("", !0)], 8, hh), O("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "number",
				value: te[e],
				min: $(e).min,
				max: $(e).max,
				step: oe(e) === "float" ? "any" : void 0,
				placeholder: $(e).min === void 0 ? void 0 : `min: ${$(e).min}`,
				onInput: (t) => ce(e, t.target.value)
			}, null, 40, gh)], 64)) : Q(e) ? (L(), D(y, { key: 2 }, [O("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [k(W(w(e)) + " ", 1), j(e) ? (L(), T(_, {
				key: 0,
				tone: "accent"
			}, {
				default: X(() => [...t[2] ||= [k("custom", -1)]]),
				_: 1
			})) : E("", !0)], 8, _h), A(g, {
				"model-value": te[e] ?? "",
				options: se(e),
				label: w(e),
				"onUpdate:modelValue": (t) => ce(e, String(t))
			}, null, 8, [
				"model-value",
				"options",
				"label",
				"onUpdate:modelValue"
			])], 64)) : K(h).has(e) ? (L(), D(y, { key: 3 }, [O("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [k(W(w(e)) + " ", 1), j(e) ? (L(), T(_, {
				key: 0,
				tone: "accent"
			}, {
				default: X(() => [...t[3] ||= [k("custom", -1)]]),
				_: 1
			})) : E("", !0)], 8, vh), O("div", yh, [O("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: q[e] ? "text" : "password",
				autocomplete: "off",
				value: te[e],
				onInput: (t) => ce(e, t.target.value)
			}, null, 40, bh), A(i, {
				variant: "ghost",
				size: "sm",
				"left-icon": q[e] ? "eye-off" : "eye",
				"aria-label": q[e] ? `Hide ${w(e)}` : `Show ${w(e)}`,
				onClick: (t) => le(e)
			}, {
				default: X(() => [k(W(q[e] ? "Hide" : "Show"), 1)]),
				_: 2
			}, 1032, [
				"left-icon",
				"aria-label",
				"onClick"
			])])], 64)) : (L(), D(y, { key: 4 }, [O("label", {
				class: "admin-settings__label",
				for: `field-${e}`
			}, [k(W(w(e)) + " ", 1), j(e) ? (L(), T(_, {
				key: 0,
				tone: "accent"
			}, {
				default: X(() => [...t[4] ||= [k("custom", -1)]]),
				_: 1
			})) : E("", !0)], 8, xh), O("input", {
				id: `field-${e}`,
				class: "admin-settings__input",
				type: "text",
				autocomplete: "off",
				value: te[e],
				onInput: (t) => ce(e, t.target.value)
			}, null, 40, Sh)], 64)),
			G.value[e] ? (L(), D("span", Ch, W(G.value[e]), 1)) : E("", !0),
			S[e] ? (L(), D("p", wh, W(S[e]), 1)) : E("", !0)
		]))), 128)), O("div", Th, [A(i, {
			type: "button",
			variant: "solid",
			size: "sm",
			disabled: !ne.value,
			loading: U.value,
			onClick: ue
		}, {
			default: X(() => [...t[5] ||= [k(" Save settings ", -1)]]),
			_: 1
		}, 8, ["disabled", "loading"])])], 32))], 8, fh)], 64))]));
	}
}), Dh = /* @__PURE__ */ pe({ default: () => Oh }), Oh = /*#__PURE__*/ r(Eh, [["__scopeId", "data-v-6962a0a2"]]);
//#endregion
//#region src/app/admin.ts
function kh(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => Promise.resolve().then(() => Gs)
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => Promise.resolve().then(() => kc)
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => Promise.resolve().then(() => Yo)
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => Promise.resolve().then(() => al)
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => Promise.resolve().then(() => Cl)
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => Promise.resolve().then(() => du)
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => Promise.resolve().then(() => Ru)
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => Promise.resolve().then(() => gd)
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => Promise.resolve().then(() => Ed)
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => Promise.resolve().then(() => Sf)
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => Promise.resolve().then(() => Hp)
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => Promise.resolve().then(() => nm)
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => Promise.resolve().then(() => Sm)
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => Promise.resolve().then(() => Im)
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => Promise.resolve().then(() => ih)
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => Promise.resolve().then(() => Dh)
		}
	];
}
function Ah(e = "/app") {
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
var jh = { class: "library-scan-page" }, Mh = {
	key: 0,
	class: "loading"
}, Nh = {
	key: 1,
	class: "error"
}, Ph = {
	key: 2,
	class: "libraries-list"
}, Fh = { class: "library-info" }, Ih = { class: "library-name" }, Lh = { class: "library-type" }, Rh = { class: "library-paths" }, zh = { class: "library-meta" }, Bh = { key: 0 }, Vh = {
	key: 0,
	class: "scan-status"
}, Hh = { class: "library-actions" }, Uh = ["onClick", "disabled"], Wh = ["onClick", "disabled"], Gh = {
	key: 0,
	class: "empty-state"
}, Kh = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}), (e, a) => (L(), D("div", jh, [a[0] ||= O("div", { class: "scan-header" }, [O("h1", { class: "scan-title" }, "Library Scanner"), O("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), r.value ? (L(), D("div", Mh, "Loading libraries...")) : i.value ? (L(), D("div", Nh, W(i.value), 1)) : (L(), D("div", Ph, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "library-card"
		}, [O("div", Fh, [
			O("h3", Ih, W(e.name), 1),
			O("span", Lh, W(e.type), 1),
			O("p", Rh, W(e.paths.join(", ")), 1),
			O("div", zh, [e.item_count === void 0 ? E("", !0) : (L(), D("span", Bh, W(e.item_count) + " items", 1)), O("span", null, "Last scan: " + W(u(e.last_scan_at)), 1)]),
			n.value[e.id] ? (L(), D("div", Vh, W(d(n.value[e.id])), 1)) : E("", !0)
		]), O("div", Hh, [O("button", {
			class: "btn btn-scan",
			onClick: (t) => c(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Scan ", 8, Uh), O("button", {
			class: "btn btn-rescan",
			onClick: (t) => l(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Rescan ", 8, Wh)])]))), 128)), t.value.length === 0 ? (L(), D("div", Gh, " No libraries configured. Add a library to get started. ")) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), qh = { class: "my-servers-page" }, Jh = {
	key: 0,
	class: "loading"
}, Yh = {
	key: 1,
	class: "error"
}, Xh = {
	key: 2,
	class: "servers-list"
}, Zh = { class: "server-info" }, Qh = { class: "server-name" }, $h = { class: "server-url" }, eg = { class: "server-meta" }, tg = { key: 0 }, ng = {
	key: 0,
	class: "empty-state"
}, rg = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}), (e, i) => (L(), D("div", qh, [i[2] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "My Servers"), O("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), n.value ? (L(), D("div", Jh, "Loading servers...")) : r.value ? (L(), D("div", Yh, W(r.value), 1)) : (L(), D("div", Xh, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "server-card"
		}, [
			O("div", {
				class: "server-status",
				style: P({ backgroundColor: a(e.status) })
			}, null, 4),
			O("div", Zh, [
				O("h3", Qh, W(e.name), 1),
				O("p", $h, W(e.url), 1),
				O("div", eg, [
					O("span", null, W(e.owner), 1),
					e.library_count === void 0 ? E("", !0) : (L(), D("span", tg, W(e.library_count) + " libraries", 1)),
					O("span", null, "Last seen: " + W(o(e.last_seen)), 1)
				])
			]),
			i[0] ||= O("div", { class: "server-actions" }, [O("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), t.value.length === 0 ? (L(), D("div", ng, [...i[1] ||= [O("p", null, "No servers connected yet.", -1), O("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), ig = { class: "federation-page" }, ag = {
	key: 0,
	class: "loading"
}, og = {
	key: 1,
	class: "error"
}, sg = {
	key: 2,
	class: "federation-content"
}, cg = { class: "peers-section" }, lg = { class: "peers-list" }, ug = { class: "peer-info" }, dg = { class: "peer-name" }, fg = { class: "peer-url" }, pg = { class: "peer-meta" }, mg = { key: 0 }, hg = { class: "peer-actions" }, gg = ["onClick"], _g = {
	key: 1,
	class: "status-badge"
}, vg = {
	key: 0,
	class: "empty-state"
}, yg = { class: "add-peer-section" }, bg = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}), (e, i) => (L(), D("div", ig, [i[5] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "Federation"), O("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), n.value ? (L(), D("div", ag, "Loading federation peers...")) : r.value ? (L(), D("div", og, W(r.value), 1)) : (L(), D("div", sg, [O("div", cg, [i[2] ||= O("h2", { class: "section-title" }, "Connected Peers", -1), O("div", lg, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "peer-card"
		}, [
			O("div", {
				class: "peer-status",
				style: P({ backgroundColor: c(e.status) })
			}, null, 4),
			O("div", ug, [
				O("h3", dg, W(e.name), 1),
				O("p", fg, W(e.url), 1),
				O("div", pg, [e.shared_libraries_count === void 0 ? E("", !0) : (L(), D("span", mg, W(e.shared_libraries_count) + " shared libraries", 1)), O("span", null, "Last sync: " + W(l(e.last_sync)), 1)])
			]),
			O("div", hg, [e.status === "connected" ? (L(), D("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => o(e.id)
			}, " Disconnect ", 8, gg)) : e.status === "pending" ? (L(), D("span", _g, "Pending")) : E("", !0)])
		]))), 128)), t.value.length === 0 ? (L(), D("div", vg, [...i[1] ||= [O("p", null, "No federation peers connected.", -1)]])) : E("", !0)])]), O("div", yg, [i[4] ||= O("h2", { class: "section-title" }, "Add Peer", -1), O("form", {
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
}), [["__scopeId", "data-v-91ba2781"]]), xg = { class: "manage-shares-page" }, Sg = {
	key: 0,
	class: "loading"
}, Cg = {
	key: 1,
	class: "error"
}, wg = {
	key: 2,
	class: "shares-list"
}, Tg = { class: "share-info" }, Eg = { class: "share-library" }, Dg = { class: "share-meta" }, Og = {
	key: 0,
	class: "expired-badge"
}, kg = { class: "share-dates" }, Ag = { key: 0 }, jg = { class: "share-actions" }, Mg = ["onClick"], Ng = {
	key: 0,
	class: "empty-state"
}, Pg = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}), (e, i) => (L(), D("div", xg, [i[1] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "Manage Shares"), O("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), n.value ? (L(), D("div", Sg, "Loading shares...")) : r.value ? (L(), D("div", Cg, W(r.value), 1)) : (L(), D("div", wg, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "share-card"
		}, [O("div", Tg, [
			O("h3", Eg, W(e.library_name), 1),
			O("div", Dg, [
				O("span", null, "Shared with: " + W(e.shared_with), 1),
				O("span", { class: N(["permission-badge", e.permissions]) }, W(e.permissions), 3),
				e.expires_at && c(e.expires_at) ? (L(), D("span", Og, "Expired")) : E("", !0)
			]),
			O("p", kg, [k(" Created: " + W(o(e.created_at)) + " ", 1), e.expires_at ? (L(), D("span", Ag, " | Expires: " + W(o(e.expires_at)), 1)) : E("", !0)])
		]), O("div", jg, [O("button", {
			class: "btn btn-danger",
			onClick: (t) => a(e.id)
		}, "Revoke", 8, Mg)])]))), 128)), t.value.length === 0 ? (L(), D("div", Ng, [...i[0] ||= [O("p", null, "No library shares found.", -1)]])) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), Fg = { class: "audit-logs-page" }, Ig = {
	key: 0,
	class: "loading"
}, Lg = {
	key: 1,
	class: "error"
}, Rg = {
	key: 2,
	class: "logs-container"
}, zg = { class: "logs-list" }, Bg = { class: "log-content" }, Vg = { class: "log-header" }, Hg = { class: "log-action" }, Ug = { class: "log-actor" }, Wg = { class: "log-time" }, Gg = {
	key: 0,
	class: "log-target"
}, Kg = {
	key: 1,
	class: "log-details"
}, qg = {
	key: 2,
	class: "log-ip"
}, Jg = {
	key: 0,
	class: "empty-state"
}, Yg = {
	key: 0,
	class: "pagination"
}, Xg = ["disabled"], Zg = { class: "page-info" }, Qg = ["disabled"], $g = /*#__PURE__*/ r(/* @__PURE__ */ j({
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
		}), (e, s) => (L(), D("div", Fg, [s[3] ||= O("div", { class: "page-header" }, [O("h1", { class: "page-title" }, "Audit Logs"), O("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), n.value ? (L(), D("div", Ig, "Loading audit logs...")) : r.value ? (L(), D("div", Lg, W(r.value), 1)) : (L(), D("div", Rg, [O("div", zg, [(L(!0), D(y, null, B(t.value, (e) => (L(), D("div", {
			key: e.id,
			class: "log-entry"
		}, [O("div", {
			class: "log-icon",
			style: P({ backgroundColor: l(e.action) })
		}, W(u(e.action)), 5), O("div", Bg, [
			O("div", Vg, [
				O("span", Hg, W(e.action), 1),
				O("span", Ug, W(e.actor), 1),
				O("span", Wg, W(c(e.created_at)), 1)
			]),
			e.target ? (L(), D("p", Gg, "Target: " + W(e.target), 1)) : E("", !0),
			e.details ? (L(), D("p", Kg, W(e.details), 1)) : E("", !0),
			e.ip_address ? (L(), D("span", qg, "IP: " + W(e.ip_address), 1)) : E("", !0)
		])]))), 128)), t.value.length === 0 ? (L(), D("div", Jg, [...s[2] ||= [O("p", null, "No audit logs found.", -1)]])) : E("", !0)]), a.value > 1 ? (L(), D("div", Yg, [
			O("button", {
				class: "btn btn-secondary",
				disabled: i.value <= 1,
				onClick: s[0] ||= (e) => o(i.value - 1)
			}, " Previous ", 8, Xg),
			O("span", Zg, "Page " + W(i.value) + " of " + W(a.value), 1),
			O("button", {
				class: "btn btn-secondary",
				disabled: i.value >= a.value,
				onClick: s[1] ||= (e) => o(i.value + 1)
			}, " Next ", 8, Qg)
		])) : E("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function e_(e, t) {
	let n = bt(), r = !1;
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
export { zo as ALL_LOGS, qi as AMBIENT_SAMPLE_H, Ji as AMBIENT_SAMPLE_INTERVAL_MS, Ki as AMBIENT_SAMPLE_W, Br as ARROW_ICONS, Vr as ARROW_LABELS, pu as AdminBackupApi, zu as AdminBackupPage, Wu as AdminCastApi, _d as AdminCastDevicesPage, Wp as AdminCollectionsApi, rm as AdminCollectionsPage, is as AdminDashboardApi, Ks as AdminDashboardPage, vd as AdminDlnaServerApi, Dd as AdminDlnaServerPage, im as AdminHistoryApi, Cm as AdminHistoryPage, Tl as AdminIntegrationsApi, fu as AdminIntegrationsPage, zm as AdminLibrariesApi, ah as AdminLibrariesPage, wf as AdminLiveTvApi, Up as AdminLiveTvPage, Bo as AdminLogsApi, Xo as AdminLogsPage, Od as AdminRemoteAccessApi, Cf as AdminRemoteAccessPage, sl as AdminServicesApi, wl as AdminServicesPage, oh as AdminSettingsApi, Oh as AdminSettingsPage, wm as AdminSyncPlayApi, Lm as AdminSyncPlayPage, Ys as AdminUsersApi, Ac as AdminUsersPage, Nc as AdminWebhooksApi, ol as AdminWebhooksPage, na as AmbientCanvas, e as ApiClient, a as ApiError, mo as AppBackdrop, Ce as AppLayout, $g as AuditLogsPage, _ as Badge, ar as BrowsePage, i as Button, wi as CAPTION_BACKGROUND_OPTIONS, Ci as CAPTION_COLOR_OPTIONS, Ti as CAPTION_EDGE_OPTIONS, Si as CAPTION_SIZE_OPTIONS, xi as CAPTION_SIZE_SCALE, ki as CaptionOverlay, Gi as CaptionsMenu, Cn as Chip, An as Combobox, Xe as CommandPalette, Ne as DEFAULT_CAPTION_STYLE, Pe as DEFAULT_PREFERENCES, f as EmptyState, bg as FederationPage, $n as FilterBar, t as Icon, u as IconButton, Ee as Kbd, Rm as LIBRARY_TYPES, Kh as LibraryScanPage, c as LocalStorageTokenStore, Aa as LoginForm, Na as LoginPage, Pg as ManageSharesPage, Xt as MediaCard, Dr as MediaDetail, Mr as MediaDetailPage, on as MediaGrid, yn as MediaHomeRow, gn as MediaRow, d as Modal, rg as MyServersPage, zr as PLAYER_SHORTCUTS, Ro as PageTransition, pt as PhlixApp, _a as Player, xa as PlayerPage, ii as QualityMenu, qs as RATING_LABELS, Js as RATING_OPTIONS, St as RESUME_MAX_RATIO, xt as RESUME_MIN_SECONDS, Lo as Reveal, Mc as SUBSCRIBABLE_EVENTS, Rr as Scrubber, g as Select, oo as SettingsForm, co as SettingsPage, bo as Sheet, Qr as ShortcutsHelp, Wa as SignupForm, qa as SignupPage, o as Skeleton, ei as Slider, ri as SpeedMenu, jo as Spinner, v as Switch, Io as Tabs, ko as ToastHost, So as Tooltip, ni as VolumeControl, jc as WEBHOOK_EVENT_CATEGORIES, hi as activeAudioIndex, Ah as adminMenu, ea as ambientGradient, mi as applyAudioTrack, st as applyStoredThemeEarly, pi as applyTrackModes, Xi as averageRegion, e_ as bindMediaStoreToRouter, kh as buildAdminRoutes, _n as buildMediaQuery, vn as buildMediaUrl, Oi as captionStyleVars, yi as cleanCueText, fo as createPhlixApp, it as deriveAccentVars, Di as edgeShadow, Nr as formatTime, ke as fuzzyScore, Wr as handleShortcut, fi as hasActiveCaptions, Re as hasStoredPreferences, ta as isBatterySaving, Ur as isTypingTarget, ui as listAudioTracks, li as listSubtitleTracks, Ae as matchCommand, bi as readActiveCueLines, Le as readStoredPreferences, di as resolveTextTrack, Qi as rgbString, $i as rgbaString, Zi as sampleAmbient, Sa as useAuthStore, Me as useCommandStore, l as useFocusTrap, Gr as useKeyboardShortcuts, bt as useMediaStore, Et as usePlayerStore, Be as usePreferencesStore, ct as useTheme, n as useToastStore };

//# sourceMappingURL=phlix-ui.js.map