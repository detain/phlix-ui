import { a as e, c as t, d as n, f as r, i, l as a, n as o, o as s, p as c, r as l, s as u, t as d, u as f } from "./tokenStore-qhLkSDAW.js";
import { Fragment as p, Teleport as m, Transition as h, TransitionGroup as g, computed as _, createApp as v, createBlock as y, createCommentVNode as b, createElementBlock as x, createElementVNode as S, createTextVNode as C, createVNode as w, defineComponent as T, inject as E, nextTick as D, normalizeClass as O, normalizeStyle as k, onBeforeUnmount as A, onMounted as j, openBlock as M, reactive as N, ref as P, renderList as F, renderSlot as I, resolveComponent as L, resolveDynamicComponent as R, toDisplayString as z, toRef as B, unref as V, useId as H, vModelDynamic as U, vModelText as W, vShow as G, watch as K, watchEffect as q, withCtx as J, withDirectives as Y, withKeys as ee, withModifiers as X } from "vue";
import { createPinia as te, defineStore as Z } from "pinia";
import { RouterLink as ne, RouterView as re, createRouter as Q, createWebHistory as ie, useRoute as ae, useRouter as oe } from "vue-router";
//#region \0rolldown/runtime.js
var se = Object.defineProperty, ce = (e, t) => {
	let n = {};
	for (var r in e) se(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || se(n, Symbol.toStringTag, { value: "Module" }), n;
}, le = {}, ue = { class: "app-layout" }, de = { class: "app-header" }, fe = { class: "header-inner" }, pe = { class: "logo" }, me = { class: "nav" }, he = { class: "app-main" }, ge = { class: "app-footer" };
function _e(e, t) {
	return M(), x("div", ue, [
		S("header", de, [S("div", fe, [S("div", pe, [I(e.$slots, "logo", {}, () => [t[0] ||= S("span", { class: "logo-text" }, "Phlix", -1)], !0)]), S("nav", me, [I(e.$slots, "nav", {}, void 0, !0)])])]),
		S("main", he, [I(e.$slots, "default", {}, void 0, !0)]),
		S("footer", ge, [I(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var ve = /*#__PURE__*/ c(le, [["render", _e], ["__scopeId", "data-v-9f6c6d16"]]), ye = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], be = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "IconButton",
	props: {
		name: {},
		label: {},
		variant: { default: "ghost" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		pressed: {
			type: Boolean,
			default: void 0
		}
	},
	setup(e) {
		let t = e, n = _(() => t.disabled || t.loading);
		return (t, i) => (M(), x("button", {
			type: e.type,
			class: O(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [w(r, {
			name: e.loading ? "spinner" : e.name,
			class: O({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, ye));
	}
}), [["__scopeId", "data-v-fc0cd545"]]), xe = { class: "phlix-kbd" }, Se = {
	key: 1,
	class: "phlix-kbd__key"
}, Ce = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = _(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (M(), x("span", xe, [n.value.length ? (M(!0), x(p, { key: 0 }, F(n.value, (e, t) => (M(), x("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, z(e), 1))), 128)) : (M(), x("kbd", Se, [I(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), we = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Te = 0, Ee = "";
function De() {
	Te === 0 && (Ee = document.body.style.overflow, document.body.style.overflow = "hidden"), Te++;
}
function Oe() {
	Te !== 0 && (Te--, Te === 0 && (document.body.style.overflow = Ee));
}
function ke(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(we)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function s(r) {
		if (!t.value || !e.value) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = o();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let a = i[0], s = i[i.length - 1], c = document.activeElement;
		e.value.contains(c) ? r.shiftKey && c === a ? (r.preventDefault(), s.focus()) : !r.shiftKey && c === s && (r.preventDefault(), a.focus()) : (r.preventDefault(), a.focus());
	}
	function c() {
		i = document.activeElement, r && (De(), a = !0), document.addEventListener("keydown", s, !0), D(() => {
			(o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		document.removeEventListener("keydown", s, !0), a &&= (Oe(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	K(t, (e) => e ? c() : l(), { immediate: !0 }), A(() => {
		document.removeEventListener("keydown", s, !0), a &&= (Oe(), !1);
	});
}
//#endregion
//#region src/stores/useCommandStore.ts
var Ae = "phlix.cmd.recents", je = 8;
function Me(e, t) {
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
function Ne(e, t) {
	if (!e.trim()) return 0;
	let n = Me(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, Me(e, n));
	return t.group && (r = Math.max(r, Me(e, t.group))), r;
}
function Pe() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(Ae);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, je) : [];
	} catch {
		return [];
	}
}
var Fe = Z("phlix-commands", () => {
	let e = P(/* @__PURE__ */ new Map()), t = P(!1), n = P(""), r = P(Pe()), i = _(() => Array.from(e.value.values())), a = _(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: Ne(t, e)
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
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, je);
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
	return K(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Ae, JSON.stringify(e));
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
}), Ie = {
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
function Le(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var Re = "phlix.prefs";
function ze() {
	if (typeof localStorage > "u") return { ...Ie };
	try {
		let e = localStorage.getItem(Re);
		if (!e) return { ...Ie };
		let t = JSON.parse(e);
		return {
			...Ie,
			...t
		};
	} catch {
		return { ...Ie };
	}
}
function Be() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(Re) !== null;
	} catch {
		return !1;
	}
}
function Ve() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var He = Z("phlix-prefs", () => {
	let e = ze(), t = P(e.theme), n = P(e.accent), r = P(e.density), i = P(e.cardSize), a = P(e.gridDensity), o = P(e.reducedMotion), s = P(e.autoplay), c = P(e.defaultVolume), l = P(e.defaultQuality), u = P(e.defaultSubtitleLang), d = P(e.atmosphere), f = P(e.filterPresets ? [...e.filterPresets] : []), p = P(Ve()), m = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (m = window.matchMedia("(prefers-reduced-motion: reduce)"), m.addEventListener?.("change", (e) => p.value = e.matches));
	let h = _(() => o.value === "on" ? !0 : o.value === "off" ? !1 : p.value);
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
	function v(e, t) {
		let n = {
			id: Le(e),
			name: e.trim(),
			query: t
		}, r = f.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? f.value.splice(r, 1, n) : f.value.push(n), n;
	}
	function y(e) {
		f.value = f.value.filter((t) => t.id !== e);
	}
	K(g, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Re, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = Ie;
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
		saveFilterPreset: v,
		removeFilterPreset: y,
		reset: b
	};
}), Ue = { class: "phlix-cmdk__search" }, We = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], Ge = ["id"], Ke = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, qe = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], Je = { class: "phlix-cmdk__option-body" }, Ye = { class: "phlix-cmdk__option-title" }, Xe = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, Ze = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, Qe = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "CommandPalette",
	setup(e) {
		let t = Fe(), n = oe(), i = He(), a = P(null), o = H(), s = P(0);
		function c(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => t.runId(e.id)
			};
		}
		function l(e) {
			return {
				id: "__search",
				title: `Search library for “${e}”`,
				icon: "search",
				run: () => {
					t.closePalette(), n.push({
						name: "browse",
						query: { search: e }
					});
				}
			};
		}
		let u = _(() => {
			let e = [], n = [], r = (t) => {
				e.push({
					kind: "option",
					item: t,
					index: n.length
				}), n.push(t);
			}, i = t.query.trim();
			if (i) {
				for (let e of t.results) r(c(e));
				return r(l(i)), {
					rows: e,
					options: n
				};
			}
			let a = t.results.filter((e) => t.isRecent(e.id));
			a.length && (e.push({
				kind: "header",
				label: "Recent"
			}), a.forEach((e) => r(c(e))));
			let o = /* @__PURE__ */ new Map();
			for (let e of t.results) {
				if (t.isRecent(e.id)) continue;
				let n = e.group ?? "Commands", r = o.get(n);
				r ? r.push(e) : o.set(n, [e]);
			}
			for (let [t, n] of o) e.push({
				kind: "header",
				label: t
			}), n.forEach((e) => r(c(e)));
			return {
				rows: e,
				options: n
			};
		}), d = _(() => u.value.options.length), f = _(() => d.value ? `${o}-opt-${s.value}` : void 0);
		K(() => t.query, () => {
			s.value = 0;
		}), K(d, (e) => {
			s.value > e - 1 && (s.value = Math.max(0, e - 1));
		}), K(() => t.open, (e) => {
			e && (s.value = 0);
		});
		function g() {
			typeof document > "u" || document.getElementById(`${o}-opt-${s.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function v(e) {
			let t = d.value;
			t && (s.value = (s.value + e + t) % t, g());
		}
		function C() {
			let e = u.value.options[s.value];
			e && e.run();
		}
		function T(e) {
			e.run();
		}
		function D(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), v(1);
					break;
				case "ArrowUp":
					e.preventDefault(), v(-1);
					break;
				case "Home":
					e.preventDefault(), s.value = 0, g();
					break;
				case "End":
					e.preventDefault(), s.value = Math.max(0, d.value - 1), g();
					break;
				case "Enter":
					e.preventDefault(), C();
					break;
			}
		}
		function k() {
			t.closePalette();
		}
		ke(a, _(() => t.open), { onEscape: () => (t.closePalette(), !0) });
		function N(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), t.togglePalette());
		}
		let I = E("phlixCommands", []), L = [
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
					n.push({ name: "browse" });
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
					n.push({ name: "settings" });
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
		], R = null;
		return j(() => {
			R = t.register([...L, ...I]), document.addEventListener("keydown", N);
		}), A(() => {
			R?.(), document.removeEventListener("keydown", N);
		}), (e, n) => (M(), y(m, { to: "body" }, [w(h, { name: "phlix-cmdk" }, {
			default: J(() => [V(t).open ? (M(), x("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: X(k, ["self"])
			}, [S("div", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [S("div", Ue, [
				w(r, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				S("input", {
					value: V(t).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": V(o),
					"aria-activedescendant": f.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: n[0] ||= (e) => V(t).setQuery(e.target.value),
					onKeydown: D
				}, null, 40, We),
				w(Ce, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), S("ul", {
				id: V(o),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(M(!0), x(p, null, F(u.value.rows, (e, t) => (M(), x(p, { key: e.kind === "header" ? `h-${e.label}-${t}` : e.item.id }, [e.kind === "header" ? (M(), x("li", Ke, z(e.label), 1)) : (M(), x("li", {
				key: 1,
				id: `${V(o)}-opt-${e.index}`,
				class: O(["phlix-cmdk__option", { "is-active": e.index === s.value }]),
				role: "option",
				"aria-selected": e.index === s.value,
				onClick: (t) => T(e.item),
				onPointermove: (t) => s.value = e.index
			}, [
				w(r, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				S("span", Je, [S("span", Ye, z(e.item.title), 1), e.item.subtitle ? (M(), x("span", Xe, z(e.item.subtitle), 1)) : b("", !0)]),
				e.item.shortcut ? (M(), y(Ce, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : b("", !0)
			], 42, qe))], 64))), 128)), d.value ? b("", !0) : (M(), x("li", Ze, " No matching commands "))], 8, Ge)], 512)], 32)) : b("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]);
//#endregion
//#region src/composables/color.ts
function $e(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var et = (e) => Math.max(0, Math.min(255, Math.round(e))), tt = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => et(e).toString(16).padStart(2, "0")).join("");
function nt(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function rt(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var it = ({ r: e, g: t, b: n }, r) => `rgba(${et(e)}, ${et(t)}, ${et(n)}, ${r})`;
function at({ r: e, g: t, b: n }) {
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
function ot(e) {
	let t = $e(e);
	if (!t) return null;
	let n = at(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": tt(t),
		"--accent-hover": tt(nt(t, .12)),
		"--accent-active": tt(rt(t, .12)),
		"--accent-soft": it(t, .14),
		"--accent-ring": it(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var st = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function ct(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? ot(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of st) n.style.removeProperty(e);
}
function lt(e) {
	let t = ze();
	e && !Be() && (t.theme = e), ct(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function ut() {
	let e = He();
	return q(() => {
		ct({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var dt = ["src", "alt"], ft = { class: "brand-wordmark" }, pt = {
	key: 1,
	class: "brand-tagline"
}, mt = { class: "main-nav" }, ht = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "PhlixApp",
	setup(e) {
		ut();
		let t = Fe(), n = E("phlixConfig", null), i = _(() => n?.branding ?? {}), a = _(() => i.value.wordmark ?? "Phlix"), o = _(() => n?.menu ?? []), s = _(() => n?.routerBase ?? "/app");
		function c(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, n) => (M(), y(ve, null, {
			logo: J(() => [w(V(ne), {
				to: s.value,
				class: "brand"
			}, {
				default: J(() => [
					i.value.logoSrc ? (M(), x("img", {
						key: 0,
						src: i.value.logoSrc,
						alt: i.value.logoAlt ?? a.value,
						class: "brand-logo"
					}, null, 8, dt)) : b("", !0),
					S("span", ft, z(a.value), 1),
					i.value.tagline ? (M(), x("span", pt, z(i.value.tagline), 1)) : b("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [S("nav", mt, [o.value.length ? (M(!0), x(p, { key: 0 }, F(o.value, (e) => (M(), y(R(e.href ? "a" : V(ne)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? c(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: J(() => [e.icon ? (M(), y(r, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : b("", !0), C(" " + z(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (M(), x(p, { key: 1 }, [w(V(ne), {
				to: s.value,
				class: "nav-link"
			}, {
				default: J(() => [...n[1] ||= [C("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), w(V(ne), {
				to: `${s.value}/settings`,
				class: "nav-link"
			}, {
				default: J(() => [...n[2] ||= [C("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64)), w(be, {
				name: "search",
				label: "Open command palette (⌘K)",
				size: "sm",
				class: "nav-cmdk",
				onClick: n[0] ||= (e) => V(t).openPalette()
			})])]),
			default: J(() => [w(V(re)), w(Qe)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-78cfb9e9"]]), gt = { class: "phlix-placeholder" }, _t = { class: "placeholder-content" }, vt = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (M(), x("div", gt, [S("div", _t, [n[0] ||= S("h1", null, "Shared UI loading...", -1), S("p", null, "Phlix " + z(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), yt = 6e4, bt = 250;
function xt(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var St = Z("media", () => {
	let e = P([]), t = P(0), n = P(!1), r = P(null), i = P(""), o = P([]), s = P(void 0), c = P(void 0), l = P([]), u = P([]), d = P("name"), f = P("asc"), p = P(24), m = P(0), h = _(() => e.value.length < t.value), g = _(() => {
		let e = {};
		return i.value && (e.search = i.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), v = _(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), y = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], b = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function x(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function S(e, t) {
		return `${e}/api/v1/media?${x(t).toString()}`;
	}
	function C(e) {
		return x(e).toString();
	}
	let w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = null, D = null, O;
	function k(e) {
		return !!e && Date.now() - e.ts < yt;
	}
	function A(e, t, n, r) {
		r && (D && n !== E && D.abort(), E = n);
		let i = T.get(n);
		if (i) return r && (D = i.controller), i.promise;
		let o = new AbortController();
		r && (D = o);
		let s = new a({ baseUrl: e }).get(S(e, t), void 0, o.signal).then((e) => (w.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			T.delete(n);
		});
		return T.set(n, {
			promise: s,
			controller: o
		}), s;
	}
	function j(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total;
	}
	async function M(e, t = !1) {
		let i = { ...g.value }, a = C(i), o = w.get(a);
		if (k(o)) {
			j(o, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await A(e, i, a, !t);
			if (!t && a !== E) return;
			j(n, t);
		} catch (e) {
			if (xt(e)) return;
			(t || a === E) && (r.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === E) && (n.value = !1);
		}
	}
	function N(e, t = bt) {
		m.value = 0, clearTimeout(O), O = setTimeout(() => M(e, !1), t);
	}
	async function F(t) {
		n.value || !h.value || (m.value = e.value.length, await M(t, !0));
	}
	async function I(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = C(n);
		if (!k(w.get(r))) try {
			await A(e, n, r, !1);
		} catch {}
	}
	function L() {
		w.clear();
	}
	function R() {
		clearTimeout(O);
	}
	function z() {
		let e = {};
		return i.value && (e.search = i.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function B(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function V(e) {
		i.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = B(e.genres), l.value = B(e.ratings), u.value = B(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = a ?? "asc", m.value = 0;
	}
	function H() {
		e.value = [], t.value = 0, m.value = 0, r.value = null;
	}
	function U(e) {
		i.value = e, m.value = 0;
	}
	function W(e) {
		o.value = e, m.value = 0;
	}
	function G(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function K(e) {
		l.value = e, m.value = 0;
	}
	function q(e) {
		u.value = e, m.value = 0;
	}
	function J(e, t) {
		d.value = e, t && (f.value = t), m.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: r,
		search: i,
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
		availableGenres: v,
		availableRatings: y,
		availableTypes: b,
		fetchMedia: M,
		scheduleFetch: N,
		loadMore: F,
		prefetch: I,
		clearCache: L,
		cancelScheduled: R,
		toQuery: z,
		applyQuery: V,
		reset: H,
		setSearch: U,
		setGenres: W,
		setYearRange: G,
		setRatings: K,
		setTypes: q,
		setSort: J
	};
}), Ct = 30, wt = .95, Tt = 5e3, Et = "phlix.resume";
function Dt() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(Et);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Ot = Z("phlix-player", () => {
	let e = He(), t = P(null), n = P([]), r = P(!1), i = P(0), a = P(0), o = P(0), s = P(e.defaultVolume), c = P(!1), l = P(1), u = P(e.defaultQuality), d = P(e.defaultSubtitleLang), f = P(!1), p = P(Dt()), m = _(() => a.value > 0 ? i.value / a.value : 0), h = _(() => n.value[0] ?? null), g, v = 0;
	function y(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			v = Date.now();
			try {
				localStorage.setItem(Et, JSON.stringify(p.value));
			} catch {}
		}, n = Date.now() - v;
		clearTimeout(g), e || n >= Tt ? t() : g = setTimeout(t, Tt - n);
	}
	function b(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function x(e, t, n) {
		b(t, n) ? p.value[e] = Math.floor(t) : delete p.value[e], y();
	}
	function S(e) {
		return e ? p.value[e] ?? null : null;
	}
	function C(e) {
		delete p.value[e], y(!0);
	}
	function w(e, n = {}) {
		t.value = e, n.resetPosition !== !1 && (i.value = 0, a.value = 0, o.value = 0), B(e);
	}
	function T(e, n, r) {
		i.value = e, n !== void 0 && (a.value = n), r !== void 0 && (o.value = r), t.value && x(t.value.id, e, a.value);
	}
	function E() {
		r.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function D() {
		r.value = !1, t.value && x(t.value.id, i.value, a.value), y(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
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
	function M(e) {
		d.value = e;
	}
	function N(e) {
		n.value = [...e];
	}
	function F(e) {
		n.value.push(e);
	}
	function I() {
		let e = n.value.shift() ?? null;
		return e && w(e), e;
	}
	function L() {
		f.value = !0;
	}
	function R() {
		f.value = !1;
	}
	function z() {
		t.value && x(t.value.id, i.value, a.value), y(!0), r.value = !1, f.value = !1, t.value = null;
	}
	function B(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function V(e) {
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
	function H() {
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
		setQuality: j,
		setSubtitle: M,
		setQueue: N,
		enqueue: F,
		next: I,
		showMiniPlayer: L,
		hideMiniPlayer: R,
		closePlayer: z,
		setMediaSessionMetadata: B,
		bindMediaSession: V,
		seedFromPreferences: H
	};
}), kt = { class: "media-card" }, At = { class: "media-card__poster" }, jt = ["href", "aria-label"], Mt = { class: "visually-hidden" }, Nt = ["src", "alt"], Pt = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Ft = { class: "media-card__badges" }, It = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Lt = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Rt = ["aria-valuenow", "aria-label"], zt = { class: "media-card__overlay" }, Bt = { class: "media-card__title" }, Vt = { class: "media-card__meta" }, Ht = {
	key: 0,
	class: "numeric"
}, Ut = {
	key: 1,
	class: "media-card__dot"
}, Wt = {
	key: 2,
	class: "media-card__cert"
}, Gt = {
	key: 3,
	class: "media-card__dot"
}, Kt = {
	key: 4,
	class: "numeric"
}, qt = {
	key: 0,
	class: "media-card__genres"
}, Jt = { class: "media-card__actions" }, Yt = { class: "media-card__caption" }, Xt = ["title"], Zt = { class: "media-card__caption-sub numeric" }, Qt = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = Ot(), o = _(() => n.to ?? `/app/player/${n.item.id}`), s = P(!1), c = P(null);
		function l() {
			s.value = !0;
		}
		j(() => {
			c.value?.complete && (s.value = !0);
		});
		let u = _(() => {
			let e = n.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= n.newWithinDays * 24 * 60 * 60 * 1e3;
		}), d = _(() => {
			let e = a.resumePositionFor(n.item.id), t = n.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), f = _(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (M(), x("article", kt, [S("div", At, [
			S("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [S("span", Mt, z(e.item.name), 1)], 8, jt),
			e.item.poster_url ? (M(), x("img", {
				key: 0,
				ref_key: "imgEl",
				ref: c,
				class: O(["media-card__img", { "is-loaded": s.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: l
			}, null, 42, Nt)) : (M(), x("div", Pt, [w(r, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			S("div", Ft, [
				u.value ? (M(), x("span", It, "New")) : b("", !0),
				I(t.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (M(), x("span", Lt, z(e.quality), 1)) : b("", !0)
			]),
			d.value > 0 ? (M(), x("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [S("i", { style: k({ width: `${d.value * 100}%` }) }, null, 4)], 8, Rt)) : b("", !0),
			S("div", zt, [
				S("h3", Bt, z(e.item.name), 1),
				S("div", Vt, [
					e.item.year ? (M(), x("span", Ht, z(e.item.year), 1)) : b("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (M(), x("span", Ut)) : b("", !0),
					e.item.rating ? (M(), x("span", Wt, z(e.item.rating), 1)) : b("", !0),
					e.item.rating && e.item.runtime ? (M(), x("span", Gt)) : b("", !0),
					e.item.runtime ? (M(), x("span", Kt, z(e.item.runtime) + "m", 1)) : b("", !0)
				]),
				f.value.length ? (M(), x("div", qt, [(M(!0), x(p, null, F(f.value, (e) => (M(), x("span", { key: e }, z(e), 1))), 128))])) : b("", !0),
				S("div", Jt, [
					S("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: n[0] ||= (t) => i("play", e.item)
					}, [w(r, { name: "play" })]),
					S("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: n[1] ||= (t) => i("watchlist", e.item)
					}, [w(r, { name: "bookmark-plus" })]),
					S("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: n[2] ||= (t) => i("info", e.item)
					}, [w(r, { name: "info" })]),
					I(t.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), S("div", Yt, [S("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, z(e.item.name), 9, Xt), S("div", Zt, [
			e.item.year ? (M(), x(p, { key: 0 }, [C(z(e.item.year), 1)], 64)) : b("", !0),
			e.item.year && e.item.runtime ? (M(), x(p, { key: 1 }, [C(" · ")], 64)) : b("", !0),
			e.item.runtime ? (M(), x(p, { key: 2 }, [C(z(e.item.runtime) + "m", 1)], 64)) : b("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), $t = 3 / 2;
function en(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function tn(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function nn(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * $t + t + n;
}
function rn(e) {
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
var an = { class: "media-grid-root" }, on = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, sn = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, cn = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = He(), o = _(() => n.cardSize ?? a.cardSize ?? 180), s = P(null), c = P(null), l = P(0), u = P(0), d = P(0);
		function f() {
			let e = s.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (l.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (u.value = n), d.value = Math.max(0, -t.top);
		}
		let m = 0;
		function g() {
			m ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				m = 0, f();
			});
		}
		let v = _(() => en(l.value, o.value, 20)), y = _(() => nn(tn(l.value, v.value, 20))), T = _(() => l.value > 0 && y.value > 0), E = _(() => rn({
			scrollTop: d.value,
			viewportHeight: u.value,
			rowHeight: y.value,
			columns: v.value,
			itemCount: n.items.length,
			overscan: n.overscan
		})), O = _(() => {
			if (!T.value) return n.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = E.value, r = [];
			for (let i = e; i < t; i++) r.push({
				item: n.items[i],
				index: i
			});
			return r;
		}), N = _(() => ({ gridTemplateColumns: T.value ? `repeat(${v.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), L = _(() => T.value ? { height: `${E.value.totalHeight}px` } : {}), R = _(() => T.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${E.value.padTop}px)`
		} : {}), z = _(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), B = _(() => T.value && d.value > u.value * 1.5);
		function V() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let H = null;
		function U() {
			H || typeof IntersectionObserver > "u" || (H = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && n.hasMore && !n.loading && !n.loadingMore && i("load-more");
			}, { rootMargin: "400px 0px" }), c.value && H.observe(c.value));
		}
		function W() {
			H?.disconnect(), H = null;
		}
		K(() => c.value, (e) => {
			W(), e && (U(), g());
		});
		let G = null;
		function q() {
			G || typeof ResizeObserver > "u" || !s.value || (G = new ResizeObserver(g), G.observe(s.value));
		}
		function Y() {
			G?.disconnect(), G = null;
		}
		return K(() => s.value, (e) => {
			Y(), e && (q(), g());
		}), j(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", g, { passive: !0 }), window.addEventListener("resize", g, { passive: !0 })), q(), U();
		}), A(() => {
			typeof window < "u" && (window.removeEventListener("scroll", g), window.removeEventListener("resize", g)), m &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(m) : clearTimeout(m), 0), Y(), W();
		}), K(() => n.items.length, () => D(g)), (t, n) => (M(), x("div", an, [e.loading && e.items.length === 0 ? (M(), x("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: k(z.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(M(!0), x(p, null, F(e.skeletonCount, (e) => (M(), x("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...n[0] ||= [
			S("div", { class: "skel-poster" }, null, -1),
			S("div", { class: "skel-title" }, null, -1),
			S("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (M(), x("div", on, [I(t.$slots, "empty", {}, () => [
			w(r, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			n[1] ||= S("p", { class: "media-grid-empty__title" }, "No media found", -1),
			n[2] ||= S("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (M(), x(p, { key: 2 }, [
			S("div", {
				ref_key: "sizerEl",
				ref: s,
				class: "media-grid-sizer",
				style: k(L.value)
			}, [S("div", {
				class: "media-grid",
				style: k([N.value, R.value])
			}, [(M(!0), x(p, null, F(O.value, (e) => I(t.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [w(Qt, {
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
			e.loadingMore ? (M(), x("div", sn, [...n[3] ||= [S("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), C(" Loading more… ", -1)]])) : b("", !0),
			e.hasMore && !e.loadingMore ? (M(), x("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: c,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : b("", !0)
		], 64)), w(h, { name: "media-grid-fade" }, {
			default: J(() => [B.value ? (M(), x("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: V
			}, [w(r, { name: "arrow-up" })])) : b("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), ln = {
	class: "phlix-empty",
	role: "status"
}, un = { class: "phlix-empty__icon" }, dn = { class: "phlix-empty__title" }, fn = {
	key: 0,
	class: "phlix-empty__desc"
}, pn = {
	key: 1,
	class: "phlix-empty__actions"
}, mn = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (M(), x("div", ln, [
			S("span", un, [w(r, { name: e.icon }, null, 8, ["name"])]),
			S("h3", dn, z(e.title), 1),
			e.description || t.$slots.default ? (M(), x("p", fn, [I(t.$slots, "default", {}, () => [C(z(e.description), 1)], !0)])) : b("", !0),
			t.$slots.actions ? (M(), x("div", pn, [I(t.$slots, "actions", {}, void 0, !0)])) : b("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]), hn = ["aria-label"], gn = { class: "media-row__head" }, _n = { class: "media-row__title" }, vn = {
	key: 0,
	class: "media-row__count numeric"
}, yn = { class: "media-row__action" }, bn = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, xn = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, Sn = { class: "media-row__skel-poster" }, Cn = ["aria-label"], wn = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		let n = e, r = t, i = _(() => !n.loading && !n.error && n.items.length === 0), a = _(() => n.hideWhenEmpty && i.value);
		return (t, n) => a.value ? b("", !0) : (M(), x("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [S("div", gn, [
			S("h2", _n, z(e.title), 1),
			e.count == null ? b("", !0) : (M(), x("span", vn, z(e.count.toLocaleString()), 1)),
			S("div", yn, [I(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (M(), x("div", bn, [S("span", null, z(e.error), 1), S("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (M(), x("div", xn, [(M(!0), x(p, null, F(e.skeletonCount, (e) => (M(), x("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [S("div", Sn, [w(u, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), w(u, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : i.value ? (M(), y(mn, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: J(() => [I(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (M(), x("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(M(!0), x(p, null, F(e.items, (t) => (M(), x("li", {
			key: t.id,
			class: "media-row__cell"
		}, [w(Qt, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, Cn))], 8, hn));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function Tn(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function En(e, t = {}) {
	return `${e}/api/v1/media?${Tn(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var Dn = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = t(), s = P([]), c = P(null), l = P(!1), u = P(null), d = P(!1), f = P(null), p = null, m = null, h = !1;
		function g(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function _() {
			if (!l.value) {
				l.value = !0, u.value = null, m = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new a({ baseUrl: r.apiBase }), t = En(r.apiBase, {
						...r.row.query,
						limit: r.limit,
						offset: 0
					}), n = await e.get(t, void 0, m?.signal);
					if (h) return;
					s.value = n.items ?? [], c.value = typeof n.total == "number" ? n.total : s.value.length, d.value = !0, i("items-loaded", s.value);
				} catch (e) {
					if (h || g(e)) return;
					u.value = e instanceof Error ? e.message : "Failed to load", o.error(`Couldn't load "${r.row.title}"`);
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
		return j(v), A(() => {
			h = !0, m?.abort(), m = null, p?.disconnect(), p = null;
		}), (t, n) => (M(), x("div", {
			ref_key: "rootEl",
			ref: f
		}, [w(wn, {
			title: e.row.title,
			items: s.value,
			loading: l.value || !d.value && !u.value,
			error: u.value,
			count: c.value,
			"hide-when-empty": "",
			onRetry: _,
			onPlay: n[1] ||= (e) => i("play", e),
			onWatchlist: n[2] ||= (e) => i("watchlist", e),
			onInfo: n[3] ||= (e) => i("info", e)
		}, {
			action: J(() => [S("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => i("see-all", e.row)
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
}), [["__scopeId", "data-v-fb0faca3"]]), On = ["disabled", "aria-pressed"], kn = { class: "phlix-chip__label" }, An = ["disabled", "aria-label"], jn = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
	setup(e, { emit: t }) {
		let n = e, i = t;
		function a() {
			n.disabled || (n.selected !== void 0 && i("update:selected", !n.selected), i("click"));
		}
		return (t, n) => (M(), x("span", { class: O(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [S("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (M(), y(r, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : b("", !0), S("span", kn, [I(t.$slots, "default", {}, void 0, !0)])], 8, On), e.removable ? (M(), x("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => i("remove")
		}, [w(r, { name: "x" })], 8, An)) : b("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), Mn = { class: "phlix-combobox__field" }, Nn = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], Pn = ["id", "aria-label"], Fn = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], In = { class: "phlix-combobox__check" }, Ln = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, Rn = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
	setup(t, { emit: n }) {
		let a = t, o = n, c = _(() => s(a.options)), l = H(), u = P(!1), d = P(-1), f = P(""), m = P(!1), h = P(null), g = P(null), v = P(null), T = _(() => c.value.find((e) => e.value === a.modelValue)?.label ?? ""), E = _(() => {
			if (!m.value || f.value.trim() === "") return c.value;
			let e = f.value.toLowerCase();
			return c.value.filter((t) => t.label.toLowerCase().includes(e));
		}), k = _(() => d.value >= 0 ? `${l}-opt-${d.value}` : void 0);
		K(() => a.modelValue, () => {
			u.value || (f.value = T.value);
		}, { immediate: !0 });
		function j() {
			a.disabled || u.value || (u.value = !0, d.value = E.value.findIndex((e) => e.value === a.modelValue), d.value < 0 && (d.value = E.value.findIndex((e) => !e.disabled)), D(R));
		}
		function N() {
			f.value = T.value, m.value = !1, u.value = !1;
		}
		function I(e) {
			let t = E.value[e];
			!t || t.disabled || (t.value !== a.modelValue && (o("update:modelValue", t.value), o("change", t.value)), f.value = t.label, m.value = !1, u.value = !1, g.value?.focus());
		}
		function L(t) {
			E.value.length !== 0 && (d.value = e(E.value, d.value, t), D(R));
		}
		function R() {
			v.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function B(e) {
			f.value = e.target.value, m.value = !0, u.value = !0, d.value = i(E.value, "first");
		}
		function U(e) {
			if (!a.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), u.value ? L(1) : j();
					break;
				case "ArrowUp":
					e.preventDefault(), u.value ? L(-1) : j();
					break;
				case "Enter":
					u.value && d.value >= 0 && (e.preventDefault(), I(d.value));
					break;
				case "Escape":
					u.value && (e.preventDefault(), N());
					break;
				case "Tab":
					u.value && N();
					break;
			}
		}
		function W(e) {
			u.value && h.value && !h.value.contains(e.target) && N();
		}
		return K(u, (e) => {
			e ? document.addEventListener("pointerdown", W, !0) : document.removeEventListener("pointerdown", W, !0);
		}), A(() => document.removeEventListener("pointerdown", W, !0)), (e, n) => (M(), x("div", {
			ref_key: "rootEl",
			ref: h,
			class: O(["phlix-combobox", {
				"is-open": u.value,
				"is-disabled": t.disabled
			}])
		}, [S("div", Mn, [
			w(r, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			S("input", {
				ref_key: "inputEl",
				ref: g,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": u.value,
				"aria-controls": u.value ? `${V(l)}-list` : void 0,
				"aria-activedescendant": u.value ? k.value : void 0,
				"aria-label": t.label,
				placeholder: t.placeholder,
				disabled: t.disabled,
				value: f.value,
				onInput: B,
				onFocus: j,
				onKeydown: U
			}, null, 40, Nn),
			w(r, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Y(S("ul", {
			id: `${V(l)}-list`,
			ref_key: "listEl",
			ref: v,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": t.label
		}, [(M(!0), x(p, null, F(E.value, (e, n) => (M(), x("li", {
			id: `${V(l)}-opt-${n}`,
			key: e.value,
			class: O(["phlix-combobox__option", {
				"is-active": n === d.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => I(n),
			onPointermove: (t) => !e.disabled && (d.value = n)
		}, [S("span", In, [e.value === t.modelValue ? (M(), y(r, {
			key: 0,
			name: "check"
		})) : b("", !0)]), C(" " + z(e.label), 1)], 42, Fn))), 128)), E.value.length === 0 ? (M(), x("li", Ln, "No matches")) : b("", !0)], 8, Pn), [[G, u.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), zn = ["role", "aria-label"], Bn = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "Badge",
	props: {
		tone: { default: "neutral" },
		size: { default: "sm" },
		mono: {
			type: Boolean,
			default: !1
		},
		icon: {},
		label: {}
	},
	setup(e) {
		return (t, n) => (M(), x("span", {
			class: O(["phlix-badge", [
				`phlix-badge--${e.tone}`,
				`phlix-badge--${e.size}`,
				{ "phlix-badge--mono": e.mono }
			]]),
			role: e.label ? "img" : void 0,
			"aria-label": e.label
		}, [e.icon ? (M(), y(r, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : b("", !0), I(t.$slots, "default", {}, void 0, !0)], 10, zn));
	}
}), [["__scopeId", "data-v-8f8d0fd2"]]), Vn = { class: "filterbar__main" }, Hn = { class: "filterbar__search" }, Un = { class: "filterbar__sort" }, Wn = ["aria-label"], Gn = ["aria-expanded"], Kn = { class: "filterbar__advanced" }, qn = { class: "filterbar__field" }, Jn = { class: "filterbar__field" }, Yn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Xn = { class: "filterbar__field" }, Zn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, Qn = { class: "filterbar__field" }, $n = { class: "filterbar__years" }, er = { class: "filterbar__field filterbar__presets" }, tr = { class: "filterbar__chips" }, nr = {
	key: 0,
	class: "filterbar__presets-empty"
}, rr = {
	key: 0,
	class: "filterbar__preset-save"
}, ir = ["onKeydown"], ar = ["disabled"], or = { class: "filterbar__active" }, sr = {
	class: "filterbar__count",
	"aria-live": "polite"
}, cr = { class: "filterbar__pills" }, lr = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "FilterBar",
	props: {
		searchDebounce: { default: 250 },
		sticky: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = St(), o = He(), s = [
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
		], c = P(a.search), u;
		K(() => a.search, (e) => {
			e !== c.value.trim() && (c.value = e);
		});
		function d() {
			clearTimeout(u), u = setTimeout(() => {
				a.setSearch(c.value.trim()), i("change");
			}, n.searchDebounce);
		}
		function f() {
			c.value = "", a.setSearch(""), i("change");
		}
		let m = P(null), g = P(0), v = _(() => a.availableGenres.filter((e) => !a.selectedGenres.includes(e)));
		function T(e) {
			if (e == null || e === "") return;
			let t = String(e);
			a.selectedGenres.includes(t) || (a.setGenres([...a.selectedGenres, t]), i("change")), m.value = null, g.value++;
		}
		function E(e) {
			let t = a.selectedRatings;
			a.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		function D(e) {
			let t = a.selectedTypes;
			a.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		let k = _(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), N = _(() => {
			let e = [];
			for (let t = k.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function I(e) {
			a.setYearRange(e == null || e === "" ? void 0 : Number(e), a.yearTo), i("change");
		}
		function L(e) {
			a.setYearRange(a.yearFrom, e == null || e === "" ? void 0 : Number(e)), i("change");
		}
		function R(e) {
			a.setSort(e), i("change");
		}
		function B() {
			a.order = a.order === "asc" ? "desc" : "asc", a.offset = 0, i("change");
		}
		let H = _(() => {
			let e = [];
			return a.search && e.push({
				key: "search",
				label: `“${a.search}”`,
				remove: f
			}), a.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					a.setGenres(a.selectedGenres.filter((e) => e !== t)), i("change");
				}
			})), a.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => E(t)
			})), a.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => D(t)
			})), a.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${a.yearFrom}`,
				remove: () => I(null)
			}), a.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${a.yearTo}`,
				remove: () => L(null)
			}), e;
		}), U = _(() => H.value.length > 0), q = _(() => a.selectedGenres.length + a.selectedRatings.length + a.selectedTypes.length + (a.yearFrom === void 0 ? 0 : 1) + (a.yearTo === void 0 ? 0 : 1));
		function te() {
			c.value = "", a.setSearch(""), a.setGenres([]), a.setRatings([]), a.setTypes([]), a.setYearRange(void 0, void 0), i("change");
		}
		let Z = P(!1), ne = _(() => o.filterPresets), re = P(!1), Q = P("");
		function ie() {
			re.value = !0, Q.value = "";
		}
		function ae() {
			let e = Q.value.trim();
			e && (o.saveFilterPreset(e, a.toQuery()), re.value = !1, Q.value = "");
		}
		function oe(e) {
			a.applyQuery(e.query), c.value = a.search, i("change");
		}
		function se(e) {
			o.removeFilterPreset(e.id);
		}
		let ce = P(!1);
		function le() {
			typeof window > "u" || (ce.value = window.scrollY > 24);
		}
		return j(() => {
			n.sticky && typeof window < "u" && (window.addEventListener("scroll", le, { passive: !0 }), le());
		}), A(() => {
			clearTimeout(u), typeof window < "u" && window.removeEventListener("scroll", le);
		}), (t, n) => (M(), x("div", { class: O(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ce.value
		}]) }, [
			S("div", Vn, [
				S("label", Hn, [
					w(r, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					Y(S("input", {
						"onUpdate:modelValue": n[0] ||= (e) => c.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: d
					}, null, 544), [[W, c.value]]),
					c.value ? (M(), x("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: f
					}, [w(r, { name: "x" })])) : b("", !0)
				]),
				S("div", Un, [w(l, {
					"model-value": V(a).sort,
					options: s,
					label: "Sort by",
					"onUpdate:modelValue": R
				}, null, 8, ["model-value"]), S("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${V(a).order === "asc" ? "ascending" : "descending"}`,
					onClick: B
				}, [w(r, { name: V(a).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, Wn)]),
				S("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": Z.value,
					onClick: n[1] ||= (e) => Z.value = !Z.value
				}, [
					w(r, { name: "filter" }),
					n[4] ||= S("span", null, "Filters", -1),
					q.value ? (M(), y(Bn, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: J(() => [C(z(q.value), 1)]),
						_: 1
					})) : b("", !0),
					w(r, {
						name: Z.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, Gn)
			]),
			w(h, { name: "filterbar-panel" }, {
				default: J(() => [Y(S("div", Kn, [
					S("div", qn, [n[5] ||= S("span", { class: "filterbar__field-label" }, "Genres", -1), (M(), y(Rn, {
						key: g.value,
						"model-value": m.value,
						options: v.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": T
					}, null, 8, ["model-value", "options"]))]),
					S("div", Jn, [n[6] ||= S("span", { class: "filterbar__field-label" }, "Rating", -1), S("div", Yn, [(M(!0), x(p, null, F(V(a).availableRatings, (e) => (M(), y(jn, {
						key: e,
						selected: V(a).selectedRatings.includes(e),
						"onUpdate:selected": (t) => E(e)
					}, {
						default: J(() => [C(z(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					S("div", Xn, [n[7] ||= S("span", { class: "filterbar__field-label" }, "Type", -1), S("div", Zn, [(M(!0), x(p, null, F(V(a).availableTypes, (e) => (M(), y(jn, {
						key: e,
						selected: V(a).selectedTypes.includes(e),
						"onUpdate:selected": (t) => D(e)
					}, {
						default: J(() => [C(z(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					S("div", Qn, [n[9] ||= S("span", { class: "filterbar__field-label" }, "Year", -1), S("div", $n, [
						w(Rn, {
							"model-value": V(a).yearFrom ?? null,
							options: N.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": I
						}, null, 8, ["model-value", "options"]),
						n[8] ||= S("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						w(Rn, {
							"model-value": V(a).yearTo ?? null,
							options: N.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": L
						}, null, 8, ["model-value", "options"])
					])]),
					S("div", er, [
						n[12] ||= S("span", { class: "filterbar__field-label" }, "Presets", -1),
						S("div", tr, [(M(!0), x(p, null, F(ne.value, (e) => (M(), y(jn, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => oe(e),
							onRemove: (t) => se(e)
						}, {
							default: J(() => [C(z(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ne.value.length ? b("", !0) : (M(), x("span", nr, "No saved presets"))]),
						re.value ? (M(), x("div", rr, [Y(S("input", {
							"onUpdate:modelValue": n[2] ||= (e) => Q.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [ee(X(ae, ["prevent"]), ["enter"]), n[3] ||= ee((e) => re.value = !1, ["esc"])]
						}, null, 40, ir), [[W, Q.value]]), S("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ae
						}, [w(r, { name: "check" }), n[10] ||= C(" Save ", -1)])])) : (M(), x("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !U.value,
							onClick: ie
						}, [w(r, { name: "plus" }), n[11] ||= C(" Save current ", -1)], 8, ar))
					])
				], 512), [[G, Z.value]])]),
				_: 1
			}),
			S("div", or, [S("span", sr, [S("b", null, z(V(a).total.toLocaleString()), 1), C(" " + z(V(a).total === 1 ? "title" : "titles"), 1)]), U.value ? (M(), x(p, { key: 0 }, [S("div", cr, [(M(!0), x(p, null, F(H.value, (e) => (M(), y(jn, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: J(() => [C(z(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), S("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: te
			}, "Clear all")], 64)) : b("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), ur = { class: "browse-page" }, dr = { class: "browse-toolbar" }, fr = { class: "browse-header" }, pr = { class: "browse-count numeric" }, mr = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, hr = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "BrowsePage",
	setup(e) {
		let n = E("apiBase", ""), r = _(() => typeof n == "string" ? n : n?.value ?? ""), i = E("phlixConfig", null), a = _(() => i?.homeRows ?? []), o = St(), s = Ot(), c = t(), l = oe(), u = P(null), d = N(/* @__PURE__ */ new Map());
		function f(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		K(() => o.items, (e) => f(e), { immediate: !0 });
		let m = _(() => {
			let e = s.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function h() {
			o.reset(), o.fetchMedia(r.value);
		}
		j(h), K(r, h);
		function g() {
			o.reset(), o.fetchMedia(r.value);
		}
		function v() {
			o.loadMore(r.value);
		}
		function C(e, t) {
			l?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function T(e) {
			C("player", e.id);
		}
		function D(e) {
			c.success(`Added "${e.name}" to your list`);
		}
		function O(e) {
			l?.hasRoute("media") ? C("media", e.id) : c.info(`Details for "${e.name}" are coming soon`);
		}
		function k() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function A(e) {
			o.applyQuery(e.query ?? {}), h(), u.value?.scrollIntoView?.({
				behavior: k() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (e, t) => (M(), x("div", ur, [
			S("div", dr, [I(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			m.value.length ? (M(), y(wn, {
				key: 0,
				title: "Continue Watching",
				items: m.value,
				"hide-when-empty": "",
				onPlay: T,
				onWatchlist: D,
				onInfo: O
			}, null, 8, ["items"])) : b("", !0),
			(M(!0), x(p, null, F(a.value, (e) => (M(), y(Dn, {
				key: e.id,
				row: e,
				"api-base": r.value,
				onItemsLoaded: f,
				onSeeAll: A,
				onPlay: T,
				onWatchlist: D,
				onInfo: O
			}, null, 8, ["row", "api-base"]))), 128)),
			S("section", {
				ref_key: "gridSection",
				ref: u,
				class: "browse-library"
			}, [
				S("div", fr, [t[0] ||= S("h1", { class: "browse-title" }, "Browse", -1), S("span", pr, z(V(o).total.toLocaleString()) + " titles", 1)]),
				w(lr, { onChange: g }),
				V(o).error ? (M(), x("div", mr, [S("p", null, z(V(o).error), 1), S("button", {
					type: "button",
					class: "browse-retry",
					onClick: h
				}, "Retry")])) : b("", !0),
				w(cn, {
					items: V(o).items,
					loading: V(o).loading && V(o).items.length === 0,
					"loading-more": V(o).loading && V(o).items.length > 0,
					"has-more": V(o).hasMore,
					onLoadMore: v,
					onPlay: T,
					onWatchlist: D,
					onInfo: O
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-214269cb"]]), gr = { class: "media-detail" }, _r = { class: "media-detail__bar" }, vr = { class: "media-detail__hero" }, yr = { class: "media-detail__poster" }, br = ["src", "alt"], xr = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Sr = { class: "media-detail__info" }, Cr = { class: "media-detail__title" }, wr = { class: "media-detail__meta numeric" }, Tr = {
	key: 0,
	class: "media-detail__meta-item"
}, Er = {
	key: 1,
	class: "media-detail__cert"
}, Dr = {
	key: 2,
	class: "media-detail__meta-item"
}, Or = { class: "media-detail__type" }, kr = {
	key: 0,
	class: "media-detail__genres"
}, Ar = { class: "media-detail__overview" }, jr = { class: "media-detail__actions" }, Mr = { class: "media-detail__resume-at numeric" }, Nr = {
	key: 1,
	class: "media-detail__credits"
}, Pr = {
	key: 0,
	class: "media-detail__credit"
}, Fr = {
	key: 1,
	class: "media-detail__credit"
}, Ir = { class: "media-detail__cast" }, Lr = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = _(() => n.item.type === "audio" ? "music" : n.item.type === "image" ? "image" : n.item.type === "series" ? "tv" : "film"), s = _(() => n.item.actors?.slice(0, 8) ?? []), c = _(() => {
			let e = n.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(r).padStart(2, "0") : String(r);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), l = P(!1), u = P(null);
		function d() {
			l.value = !0;
		}
		return j(() => {
			u.value?.complete && (l.value = !0);
		}), (t, n) => (M(), x("article", gr, [
			e.item.poster_url ? (M(), x("div", {
				key: 0,
				class: "media-detail__ambient",
				style: k({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : b("", !0),
			S("div", _r, [e.showBack ? (M(), y(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => i("back")
			}, {
				default: J(() => [...n[7] ||= [C("Back", -1)]]),
				_: 1
			})) : b("", !0)]),
			S("div", vr, [S("div", yr, [e.item.poster_url ? (M(), x("img", {
				key: 0,
				ref_key: "imgEl",
				ref: u,
				class: O(["media-detail__img", { "is-loaded": l.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: d
			}, null, 42, br)) : (M(), x("div", xr, [w(r, { name: a.value }, null, 8, ["name"])]))]), S("div", Sr, [
				S("h1", Cr, z(e.item.name), 1),
				S("div", wr, [
					e.item.year ? (M(), x("span", Tr, [w(r, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), C(z(e.item.year), 1)])) : b("", !0),
					e.item.rating ? (M(), x("span", Er, z(e.item.rating), 1)) : b("", !0),
					e.item.runtime ? (M(), x("span", Dr, z(e.item.runtime) + "m", 1)) : b("", !0),
					S("span", Or, z(e.item.type), 1)
				]),
				e.item.genres?.length ? (M(), x("div", kr, [(M(!0), x(p, null, F(e.item.genres, (e) => (M(), y(jn, {
					key: e,
					size: "sm"
				}, {
					default: J(() => [C(z(e), 1)]),
					_: 2
				}, 1024))), 128))])) : b("", !0),
				S("p", Ar, z(e.item.overview || "No overview available."), 1),
				S("div", jr, [
					w(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => i("play", e.item)
					}, {
						default: J(() => [...n[8] ||= [C("Play", -1)]]),
						_: 1
					}),
					c.value ? (M(), y(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => i("resume", e.item)
					}, {
						default: J(() => [n[9] ||= C(" Resume ", -1), S("span", Mr, z(c.value), 1)]),
						_: 1
					})) : b("", !0),
					w(o, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: n[3] ||= (t) => i("watchlist", e.item)
					}, {
						default: J(() => [...n[10] ||= [C("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || s.value.length ? (M(), x("dl", Nr, [e.item.director ? (M(), x("div", Pr, [n[11] ||= S("dt", null, "Director", -1), S("dd", null, z(e.item.director), 1)])) : b("", !0), s.value.length ? (M(), x("div", Fr, [n[12] ||= S("dt", null, "Cast", -1), S("dd", Ir, [(M(!0), x(p, null, F(s.value, (e) => (M(), y(jn, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: J(() => [C(z(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : b("", !0)])) : b("", !0)
			])]),
			e.similarLoading || e.similar.length ? (M(), y(wn, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: n[4] ||= (e) => i("play", e),
				onWatchlist: n[5] ||= (e) => i("watchlist", e),
				onInfo: n[6] ||= (e) => i("info", e)
			}, null, 8, ["items", "loading"])) : b("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), Rr = { class: "media-detail-page" }, zr = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, Br = { class: "media-detail-page__loading-hero" }, Vr = { class: "media-detail-page__loading-info" }, Hr = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "MediaDetailPage",
	setup(e) {
		let n = E("apiBase", ""), r = _(() => typeof n == "string" ? n : n?.value ?? ""), i = ae(), s = oe(), c = Ot(), l = t(), d = P(null), f = P([]), p = P(!0), m = P(!1), h = P(null), g = _(() => String(i.params.id ?? "")), v = _(() => c.resumePositionFor(g.value)), T = null, D = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function k(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				f.value = [];
				return;
			}
			let i = T, a = () => D || i !== T;
			m.value = !0;
			try {
				let o = En(r.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				f.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || O(e)) return;
				f.value = [];
			} finally {
				a() || (m.value = !1);
			}
		}
		async function N() {
			let e = g.value;
			if (T?.abort(), T = typeof AbortController < "u" ? new AbortController() : null, p.value = !0, h.value = null, f.value = [], !e) {
				h.value = "No media id provided", p.value = !1;
				return;
			}
			try {
				let t = new a({ baseUrl: r.value }), n = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, T?.signal);
				if (D) return;
				d.value = n, p.value = !1, k(t, n);
			} catch (e) {
				if (D || O(e)) return;
				h.value = e instanceof Error ? e.message : "Failed to load title", p.value = !1;
			}
		}
		j(N), K(g, N), A(() => {
			D = !0, T?.abort(), T = null;
		});
		function F(e, t) {
			s?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function I(e) {
			F("player", e.id);
		}
		function L(e) {
			l.success(`Added "${e.name}" to your list`);
		}
		function R(e) {
			F("media", e.id);
		}
		function z() {
			s?.back();
		}
		return (e, t) => (M(), x("div", Rr, [p.value ? (M(), x("div", zr, [S("div", Br, [w(u, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), S("div", Vr, [
			w(u, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			w(u, {
				variant: "text",
				lines: 4
			}),
			w(u, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : h.value ? (M(), y(mn, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: h.value
		}, {
			actions: J(() => [w(o, {
				variant: "solid",
				onClick: N
			}, {
				default: J(() => [...t[0] ||= [C("Retry", -1)]]),
				_: 1
			}), w(o, {
				variant: "ghost",
				onClick: z
			}, {
				default: J(() => [...t[1] ||= [C("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : d.value ? (M(), y(Lr, {
			key: 2,
			item: d.value,
			"resume-seconds": v.value,
			similar: f.value,
			"similar-loading": m.value,
			onPlay: I,
			onResume: I,
			onWatchlist: L,
			onInfo: R,
			onBack: z
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : b("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]);
//#endregion
//#region src/components/player/format-time.ts
function Ur(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var Wr = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], Gr = { class: "scrubber__track" }, Kr = ["title"], qr = { class: "scrubber__time numeric" }, Jr = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		let r = e, i = n, a = P(null), o = P(!1), s = P(!1), c = P(0), l = P(0), u = (e) => Math.min(1, Math.max(0, e)), d = _(() => o.value ? c.value : r.duration > 0 ? u(r.position / r.duration) : 0), f = _(() => r.duration > 0 ? u(r.buffered / r.duration) : 0), m = _(() => (o.value || s.value) && r.duration > 0), h = _(() => o.value ? c.value : l.value), g = _(() => h.value * r.duration), v = _(() => m.value ? r.thumbnailAt?.(g.value) ?? null : null), y = _(() => v.value ? `url("${v.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), C = _(() => `${Math.min(96, Math.max(4, h.value * 100))}%`), w = _(() => r.duration > 0 ? r.chapters.filter((e) => e.start > 0 && e.start < r.duration).map((e) => ({
			...e,
			ratio: e.start / r.duration
		})) : []);
		function T(e) {
			let t = a.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : u((e.clientX - n.left) / n.width);
		}
		function E(e) {
			if (r.duration <= 0) return;
			o.value = !0;
			try {
				a.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = T(e);
			c.value = t, i("scrub-start"), i("seek", t * r.duration), e.preventDefault();
		}
		function D(e) {
			let t = T(e);
			l.value = t, o.value && (c.value = t, i("seek", t * r.duration));
		}
		function A(e) {
			if (o.value) {
				o.value = !1;
				try {
					a.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				i("scrub-end");
			}
		}
		function j() {
			s.value = !0;
		}
		function N() {
			s.value = !1;
		}
		function I(e) {
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
			previewActive: m
		}), (t, n) => (M(), x("div", {
			ref_key: "trackEl",
			ref: a,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": V(Ur)(e.position),
			"aria-label": "Seek",
			onPointerdown: E,
			onPointermove: D,
			onPointerup: A,
			onPointercancel: A,
			onPointerenter: j,
			onPointerleave: N,
			onKeydown: I
		}, [S("div", Gr, [
			S("div", {
				class: "scrubber__buffered",
				style: k({ width: `${f.value * 100}%` })
			}, null, 4),
			S("div", {
				class: "scrubber__played",
				style: k({ width: `${d.value * 100}%` })
			}, null, 4),
			(M(!0), x(p, null, F(w.value, (e, t) => (M(), x("span", {
				key: t,
				class: "scrubber__tick",
				style: k({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Kr))), 128)),
			S("div", {
				class: O(["scrubber__head", { "is-dragging": o.value }]),
				style: k({ left: `${d.value * 100}%` })
			}, null, 6)
		]), m.value ? (M(), x("div", {
			key: 0,
			class: "scrubber__preview",
			style: k({ left: C.value }),
			"aria-hidden": "true"
		}, [v.value ? (M(), x("div", {
			key: 0,
			class: "scrubber__thumb",
			style: k({ backgroundImage: y.value })
		}, null, 4)) : b("", !0), S("span", qr, z(V(Ur)(g.value)), 1)], 4)) : b("", !0)], 40, Wr));
	}
}), [["__scopeId", "data-v-b2711211"]]), Yr = [
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
], Xr = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Zr = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function Qr(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function $r(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function ei(e, t) {
	switch (e.key) {
		case " ": return Qr(e.target) ? !1 : (t.playPause(), !0);
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
function ti(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || $r(n.target) || ei(n, e) && n.preventDefault();
	}
	j(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), A(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var ni = { class: "shortcuts__head" }, ri = { class: "shortcuts__grid" }, ii = { class: "shortcuts__keys" }, ai = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, oi = {
	key: 1,
	class: "shortcuts__key"
}, si = { class: "shortcuts__label" }, ci = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Yr }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = P(null);
		return ke(a, B(n, "open"), {
			lockScroll: !1,
			onEscape: () => (i("close"), !0)
		}), (t, n) => e.open ? (M(), x("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= X((e) => i("close"), ["self"])
		}, [S("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [S("div", ni, [n[2] ||= S("h3", { class: "shortcuts__title" }, "Keyboard", -1), w(be, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: n[0] ||= (e) => i("close")
		})]), S("ul", ri, [(M(!0), x(p, null, F(e.shortcuts, (e) => (M(), x("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [S("span", ii, [(M(!0), x(p, null, F(e.keys, (e, t) => (M(), x(p, { key: t }, [e === "–" ? (M(), x("span", ai, "–")) : (M(), x("kbd", oi, [V(Xr)[e] ? (M(), y(r, {
			key: 0,
			name: V(Xr)[e],
			label: V(Zr)[e] ?? e
		}, null, 8, ["name", "label"])) : (M(), x(p, { key: 1 }, [C(z(e), 1)], 64))]))], 64))), 128))]), S("span", si, z(e.label), 1)]))), 128))])], 512)])) : b("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), li = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], ui = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		let n = e, r = t, i = P(null), a = P(!1), o = _(() => {
			let e = n.max - n.min || 1;
			return Math.min(100, Math.max(0, (n.modelValue - n.min) / e * 100));
		}), s = _(() => n.formatValue ? n.formatValue(n.modelValue) : String(n.modelValue));
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
		return (t, n) => (M(), x("div", {
			class: O(["phlix-slider", { "is-disabled": e.disabled }]),
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
		}, [S("div", {
			ref_key: "trackEl",
			ref: i,
			class: "phlix-slider__track",
			onPointerdown: d,
			onPointermove: f,
			onPointerup: p
		}, [S("div", {
			class: "phlix-slider__fill",
			style: k({ width: o.value + "%" })
		}, null, 4), S("div", {
			class: "phlix-slider__thumb",
			style: k({ left: o.value + "%" })
		}, null, 4)], 544)], 42, li));
	}
}), [["__scopeId", "data-v-9ca92975"]]), di = { class: "volume" }, fi = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "VolumeControl",
	setup(e) {
		let t = Ot(), n = He(), r = _(() => t.muted ? 0 : t.volume), i = _(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return K(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (M(), x("div", di, [w(be, {
			name: i.value,
			label: V(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => V(t).toggleMute()
		}, null, 8, ["name", "label"]), w(ui, {
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
}), [["__scopeId", "data-v-2768c5e3"]]), pi = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		], n = Ot(), r = _(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (M(), y(l, {
			class: "speed-menu",
			"model-value": V(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), mi = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = Ot(), r = He(), i = _(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (M(), y(l, {
			key: 0,
			class: "quality-menu",
			"model-value": V(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"])) : b("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]), hi = ["src", "poster"], gi = { class: "player__meta" }, _i = { class: "player__meta-text" }, vi = { class: "player__title" }, yi = { class: "player__sub numeric" }, bi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, xi = { class: "player__center" }, Si = ["aria-label"], Ci = { class: "player__btnrow" }, wi = ["aria-label"], Ti = { class: "player__time numeric" }, Ei = ["aria-label"], Di = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = Ot(), o = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], s = P(null), c = P(null), l = P(!0), u = P(!1), d = P(!1), f = P(!1), m, h = _(() => {
			let e = [];
			n.media.year && e.push({ text: String(n.media.year) }), n.media.rating && e.push({
				text: n.media.rating,
				cert: !0
			}), n.media.runtime && e.push({ text: `${n.media.runtime}m` });
			let t = n.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function g() {
			let e = s.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function v(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function y() {
			a.play();
		}
		function T() {
			a.pause();
		}
		function E() {
			let e = s.value;
			e && a.updateProgress(e.currentTime, e.duration, v(e));
		}
		function D() {
			let e = s.value;
			e && (e.volume = a.volume, e.muted = a.muted, e.playbackRate = a.rate, a.updateProgress(e.currentTime, e.duration, v(e)));
		}
		function k() {
			let e = s.value;
			e && a.updateProgress(e.currentTime, e.duration, v(e));
		}
		function N() {
			let e = s.value;
			e && (Math.abs(e.volume - a.volume) > .001 && a.setVolume(e.volume), e.muted !== a.muted && a.toggleMute());
		}
		function I() {
			let e = s.value;
			e && e.playbackRate !== a.rate && a.setRate(e.playbackRate);
		}
		function L(e) {
			let t = s.value;
			t && a.duration > 0 && (t.currentTime = Math.min(a.duration, Math.max(0, e)));
		}
		function R() {
			d.value = !0, Y();
		}
		function B() {
			d.value = !1, Y();
		}
		function H(e) {
			let t = o.reduce((e, t, n) => Math.abs(t - a.rate) < Math.abs(o[e] - a.rate) ? n : e, 0), n = o[Math.min(o.length - 1, Math.max(0, t + e))];
			a.setRate(n);
		}
		ti({
			playPause: g,
			seekBy: (e) => L(a.position + e),
			frameStep: (e) => {
				a.playing || L(a.position + e / 30);
			},
			volumeBy: (e) => a.setVolume(a.volume + e),
			toggleMute: U,
			toggleFullscreen: W,
			toggleCaptions: () => i("captions"),
			toggleTheater: () => i("theater"),
			togglePip: () => i("pip"),
			seekToPercent: (e) => L(e * a.duration),
			speedStep: H,
			toggleHelp: () => {
				f.value = !f.value;
			}
		}, { enabled: () => !f.value });
		function U() {
			a.toggleMute();
		}
		K(() => a.muted, (e) => {
			let t = s.value;
			t && t.muted !== e && (t.muted = e);
		}), K(() => a.volume, (e) => {
			let t = s.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), K(() => a.rate, (e) => {
			let t = s.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function W() {
			if (typeof document > "u") return;
			let e = c.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function G() {
			u.value = typeof document < "u" && !!document.fullscreenElement;
		}
		function q() {
			m &&= (clearTimeout(m), void 0);
		}
		function J() {
			q(), !(!a.playing || d.value) && (m = setTimeout(() => {
				a.playing && !d.value && (l.value = !1);
			}, n.idleTimeout ?? 3e3));
		}
		function Y() {
			l.value = !0, J();
		}
		return K(() => a.playing, (e) => {
			e ? J() : (q(), l.value = !0);
		}), j(() => {
			a.setCurrent(n.media, { resetPosition: !1 }), typeof document < "u" && document.addEventListener("fullscreenchange", G);
		}), K(() => n.media, (e) => a.setCurrent(e, { resetPosition: !1 })), A(() => {
			q(), typeof document < "u" && document.removeEventListener("fullscreenchange", G);
		}), (t, n) => (M(), x("div", {
			ref_key: "containerRef",
			ref: c,
			class: O(["player", { "is-chrome-hidden": !l.value }]),
			onPointermove: Y,
			onPointerdown: Y,
			onFocusin: Y
		}, [
			S("video", {
				ref_key: "videoRef",
				ref: s,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: y,
				onPause: T,
				onTimeupdate: E,
				onLoadedmetadata: D,
				onProgress: k,
				onVolumechange: N,
				onRatechange: I,
				onClick: g
			}, null, 40, hi),
			n[7] ||= S("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[8] ||= S("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			S("div", gi, [S("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: n[0] ||= X((e) => i("back"), ["stop"])
			}, [w(r, { name: "arrow-left" })]), S("div", _i, [
				n[4] ||= S("p", { class: "player__eyebrow" }, "Now playing", -1),
				S("h2", vi, z(e.media.name), 1),
				S("div", yi, [(M(!0), x(p, null, F(h.value, (e, t) => (M(), x(p, { key: t }, [t > 0 && !e.cert ? (M(), x("span", bi, "·")) : b("", !0), S("span", { class: O({ player__cert: e.cert }) }, z(e.text), 3)], 64))), 128))])
			])]),
			S("div", xi, [S("button", {
				type: "button",
				class: O(["player__bigplay", { "is-playing": V(a).playing }]),
				"aria-label": V(a).playing ? "Pause" : "Play",
				onClick: X(g, ["stop"])
			}, [w(r, { name: V(a).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Si)]),
			S("div", {
				class: "player__controls",
				onClick: n[2] ||= X(() => {}, ["stop"])
			}, [w(Jr, {
				position: V(a).position,
				duration: V(a).duration,
				buffered: V(a).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: L,
				onScrubStart: R,
				onScrubEnd: B
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), S("div", Ci, [
				S("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": V(a).playing ? "Pause" : "Play",
					onClick: g
				}, [w(r, { name: V(a).playing ? "pause" : "play" }, null, 8, ["name"])], 8, wi),
				S("span", Ti, [
					C(z(V(Ur)(V(a).position)), 1),
					n[5] ||= S("span", { class: "player__sep" }, " / ", -1),
					C(z(V(Ur)(V(a).duration)), 1)
				]),
				n[6] ||= S("span", { class: "player__grow" }, null, -1),
				w(fi),
				w(pi),
				w(mi, { qualities: e.qualities }, null, 8, ["qualities"]),
				S("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: n[1] ||= (e) => f.value = !0
				}, [w(r, { name: "info" })]),
				S("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": u.value ? "Exit fullscreen" : "Fullscreen",
					onClick: W
				}, [w(r, { name: u.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Ei)
			])]),
			w(ci, {
				open: f.value,
				onClose: n[3] ||= (e) => f.value = !1
			}, null, 8, ["open"])
		], 34));
	}
}), [["__scopeId", "data-v-a83f0d9d"]]), Oi = { class: "player-page" }, ki = {
	key: 0,
	class: "player-loading"
}, Ai = {
	key: 1,
	class: "player-error"
}, ji = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "PlayerPage",
	setup(e) {
		let t = E("apiBase", _(() => "")), n = ae(), r = P(null), i = P(""), o = P(!0), s = P(null);
		async function c() {
			let e = n.params.id;
			if (!e) {
				s.value = "No media ID provided", o.value = !1;
				return;
			}
			try {
				let n = new a({ baseUrl: t.value }), [o, s] = await Promise.all([n.get(`/api/v1/media/${e}`), n.get(`/api/v1/media/${e}/playback-info`).catch(() => null)]);
				r.value = o, s?.url ? i.value = s.url : i.value = `${t.value}/media/${e}/stream`;
			} catch (e) {
				s.value = e instanceof Error ? e.message : "Failed to load media";
			} finally {
				o.value = !1;
			}
		}
		return j(c), (e, t) => (M(), x("div", Oi, [o.value ? (M(), x("div", ki, "Loading...")) : s.value ? (M(), x("div", Ai, [S("p", null, z(s.value), 1), S("button", {
			class: "retry-btn",
			onClick: c
		}, "Retry")])) : r.value ? (M(), y(Di, {
			key: 2,
			media: r.value,
			"stream-url": i.value
		}, null, 8, ["media", "stream-url"])) : b("", !0)]));
	}
}), [["__scopeId", "data-v-d9061b47"]]), Mi = Z("auth", () => {
	let e = new d(), t = new a({
		tokenStore: e,
		baseUrl: E("apiBase", "")
	}), n = P(null), r = P(!1), i = P(null), o = P(e.getAccessToken()), s = _(() => o.value !== null), c = _(() => n.value?.is_admin === !0);
	function l(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), o.value = t;
	}
	async function u(e, n) {
		r.value = !0, i.value = null;
		try {
			let r = await t.post("/api/v1/auth/login", {
				email: e,
				password: n
			});
			return l(r.access_token, r.refresh_token), await p(), !0;
		} catch (e) {
			return i.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function f(e, n, a) {
		r.value = !0, i.value = null;
		try {
			let r = await t.post("/api/v1/auth/register", {
				email: e,
				username: n,
				password: a
			});
			return l(r.access_token, r.refresh_token), await p(), !0;
		} catch (e) {
			return i.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function p() {
		if (s.value) try {
			n.value = await t.getCurrentUser();
		} catch {
			n.value = null, e.clear(), o.value = null;
		}
	}
	function m() {
		e.clear(), o.value = null, n.value = null;
	}
	return {
		user: n,
		loading: r,
		error: i,
		isLoggedIn: s,
		isAdmin: c,
		client: t,
		login: u,
		signup: f,
		fetchUser: p,
		logout: m
	};
}), Ni = {
	key: 0,
	class: "form-error"
}, Pi = { class: "field" }, Fi = { class: "field" }, Ii = { class: "password-wrapper" }, Li = ["type"], Ri = ["disabled"], zi = { class: "form-footer" }, Bi = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Mi(), i = oe(), a = P(""), o = P(""), s = P(!1);
		async function c() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = L("router-link");
			return M(), x("form", {
				class: "login-form",
				onSubmit: X(c, ["prevent"])
			}, [
				t[7] ||= S("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				V(r).error ? (M(), x("div", Ni, z(V(r).error), 1)) : b("", !0),
				S("div", Pi, [t[3] ||= S("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Y(S("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[W, a.value]])]),
				S("div", Fi, [t[4] ||= S("label", {
					for: "password",
					class: "label"
				}, "Password", -1), S("div", Ii, [Y(S("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: s.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, Li), [[U, o.value]]), S("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => s.value = !s.value
				}, z(s.value ? "🙈" : "👁"), 1)])]),
				S("button", {
					type: "submit",
					class: "submit-btn",
					disabled: V(r).loading
				}, z(V(r).loading ? "Signing in..." : "Sign in"), 9, Ri),
				S("p", zi, [t[6] ||= C(" Don't have an account? ", -1), w(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: J(() => [...t[5] ||= [C("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), Vi = { class: "auth-page" }, Hi = { class: "auth-card" }, Ui = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (M(), x("div", Vi, [S("div", Hi, [w(Bi, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), Wi = {
	key: 0,
	class: "form-error"
}, Gi = { class: "field" }, Ki = { class: "field" }, qi = { class: "field" }, Ji = { class: "password-wrapper" }, Yi = ["type"], Xi = { class: "field" }, Zi = ["type"], Qi = ["disabled"], $i = { class: "form-footer" }, ea = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Mi(), i = oe(), a = P(""), o = P(""), s = P(""), c = P(""), l = P(!1), u = P(null);
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
			let n = L("router-link");
			return M(), x("form", {
				class: "signup-form",
				onSubmit: X(d, ["prevent"])
			}, [
				t[11] ||= S("h2", { class: "form-title" }, "Create your Phlix account", -1),
				V(r).error || u.value ? (M(), x("div", Wi, z(V(r).error || u.value), 1)) : b("", !0),
				S("div", Gi, [t[5] ||= S("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Y(S("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[W, a.value]])]),
				S("div", Ki, [t[6] ||= S("label", {
					for: "username",
					class: "label"
				}, "Username", -1), Y(S("input", {
					id: "username",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: "text",
					class: "input",
					placeholder: "Your username",
					required: "",
					autocomplete: "username",
					minlength: "3"
				}, null, 512), [[W, o.value]])]),
				S("div", qi, [t[7] ||= S("label", {
					for: "password",
					class: "label"
				}, "Password", -1), S("div", Ji, [Y(S("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => s.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, Yi), [[U, s.value]]), S("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => l.value = !l.value
				}, z(l.value ? "🙈" : "👁"), 1)])]),
				S("div", Xi, [t[8] ||= S("label", {
					for: "confirm",
					class: "label"
				}, "Confirm password", -1), Y(S("input", {
					id: "confirm",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "Repeat your password",
					required: "",
					autocomplete: "new-password"
				}, null, 8, Zi), [[U, c.value]])]),
				S("button", {
					type: "submit",
					class: "submit-btn",
					disabled: V(r).loading
				}, z(V(r).loading ? "Creating account..." : "Create account"), 9, Qi),
				S("p", $i, [t[10] ||= C(" Already have an account? ", -1), w(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: J(() => [...t[9] ||= [C("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), ta = { class: "auth-page" }, na = { class: "auth-card" }, ra = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (M(), x("div", ta, [S("div", na, [w(ea, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), ia = { class: "settings-form" }, aa = {
	key: 0,
	class: "settings-loading"
}, oa = {
	key: 1,
	class: "settings-error"
}, sa = { class: "group-title" }, ca = ["for"], la = { class: "setting-control" }, ua = [
	"id",
	"checked",
	"onChange"
], da = [
	"id",
	"value",
	"onChange"
], fa = [
	"id",
	"value",
	"onChange"
], pa = { class: "settings-actions" }, ma = {
	key: 0,
	class: "success-msg"
}, ha = ["disabled"], ga = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Mi(), a = P({}), o = P(!0), s = P(!1), c = P(null), l = P(null), u = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], d = _(() => n.groups ? u.filter((e) => n.groups.includes(e)) : u);
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
		async function m() {
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
		function h(e, t) {
			a.value[e] = t;
		}
		j(f);
		let g = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, v = {
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
		return (e, t) => (M(), x("div", ia, [o.value ? (M(), x("div", aa, "Loading settings...")) : c.value ? (M(), x("div", oa, z(c.value), 1)) : (M(), x(p, { key: 2 }, [(M(!0), x(p, null, F(d.value, (e) => (M(), x("div", {
			key: e,
			class: "settings-group"
		}, [S("h3", sa, z(g[e]), 1), (M(), x(p, null, F(v, (t, n) => Y(S("div", {
			key: n,
			class: "setting-row"
		}, [S("label", {
			for: n,
			class: "setting-label"
		}, z(t.label), 9, ca), S("div", la, [t.type === "bool" ? (M(), x("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!a.value[n],
			onChange: (e) => h(n, e.target.checked)
		}, null, 40, ua)) : t.type === "number" ? (M(), x("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: a.value[n],
			onChange: (e) => h(n, Number(e.target.value))
		}, null, 40, da)) : (M(), x("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: a.value[n] ?? "",
			onChange: (e) => h(n, e.target.value)
		}, null, 40, fa))])]), [[G, n.startsWith(e)]])), 64))]))), 128)), S("div", pa, [l.value ? (M(), x("div", ma, z(l.value), 1)) : b("", !0), S("button", {
			class: "save-btn",
			disabled: s.value,
			onClick: m
		}, z(s.value ? "Saving..." : "Save settings"), 9, ha)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), _a = { class: "settings-page" }, va = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (M(), x("div", _a, [t[0] ||= S("div", { class: "settings-header" }, [S("h1", { class: "settings-title" }, "Settings")], -1), w(ga)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function ya() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function ba(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: hr
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: Hr
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: ji
		},
		{
			path: `${t}/login`,
			name: "login",
			component: Ui
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: ra
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: va
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: vt,
		props: { appName: e.app }
	}), n;
}
function xa(e) {
	let t = {
		...ya(),
		...e
	};
	lt(t.defaultTheme);
	let n = te();
	t.defaultTheme && !Be() && (He(n).theme = t.defaultTheme);
	let r = Q({
		history: ie(t.routerBase || "/app"),
		routes: ba(t)
	}), i = v(ht);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var Sa = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, Ca = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		let t = e, n = P(!1), r = null, i = null, a = () => n.value = !!(r?.matches || i?.matches);
		j(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (r = window.matchMedia("(prefers-reduced-motion: reduce)"), i = window.matchMedia("(prefers-reduced-data: reduce)"), a(), r.addEventListener?.("change", a), i.addEventListener?.("change", a));
		}), A(() => {
			r?.removeEventListener?.("change", a), i?.removeEventListener?.("change", a);
		});
		let o = _(() => t.enabled && !n.value), s = _(() => o.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function c(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let l = _(() => t.ambientImage ? {
			backgroundImage: `url("${c(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), u = _(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, n) => (M(), x(p, null, [
			s.value ? (M(), x("div", {
				key: 0,
				class: O(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: k(l.value),
				"aria-hidden": "true"
			}, null, 6)) : b("", !0),
			o.value && e.vignette ? (M(), x("div", Sa)) : b("", !0),
			o.value && e.grain ? (M(), x("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: k(u.value),
				"aria-hidden": "true"
			}, null, 4)) : b("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), wa = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], Ta = ["id"], Ea = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "Switch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = H();
		function a() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (M(), x("span", { class: O(["phlix-switch", { "is-disabled": e.disabled }]) }, [S("button", {
			type: "button",
			role: "switch",
			class: O(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? V(i) : void 0,
			disabled: e.disabled,
			onClick: a
		}, [...n[0] ||= [S("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, wa), e.label ? (M(), x("label", {
			key: 0,
			id: V(i),
			class: "phlix-switch__label",
			onClick: a
		}, z(e.label), 9, Ta)) : b("", !0)], 2));
	}
}), [["__scopeId", "data-v-4631a106"]]), Da = ["aria-labelledby"], Oa = {
	key: 0,
	class: "phlix-modal__header"
}, ka = ["id"], Aa = { class: "phlix-modal__body" }, ja = {
	key: 1,
	class: "phlix-modal__footer"
}, Ma = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "Modal",
	props: {
		modelValue: { type: Boolean },
		title: {},
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" }
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = P(n.modelValue);
		K(() => n.modelValue, (e) => i.value = e);
		let a = P(null), o = H();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return ke(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (M(), y(m, { to: "body" }, [w(h, { name: "phlix-modal" }, {
			default: J(() => [e.modelValue ? (M(), x("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: X(c, ["self"])
			}, [S("div", {
				ref_key: "panelEl",
				ref: a,
				class: O(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? V(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (M(), x("header", Oa, [e.title ? (M(), x("h2", {
					key: 0,
					id: V(o),
					class: "phlix-modal__title"
				}, z(e.title), 9, ka)) : b("", !0), e.hideClose ? b("", !0) : (M(), y(be, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					class: "phlix-modal__close",
					onClick: s
				}))])) : b("", !0),
				S("div", Aa, [I(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (M(), x("footer", ja, [I(t.$slots, "footer", {}, void 0, !0)])) : b("", !0)
			], 10, Da)], 32)) : b("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-ad69ec41"]]), Na = ["aria-labelledby"], Pa = {
	key: 0,
	class: "phlix-sheet__header"
}, Fa = ["id"], Ia = { class: "phlix-sheet__body" }, La = {
	key: 1,
	class: "phlix-sheet__footer"
}, Ra = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		let n = e, r = t, i = P(n.modelValue);
		K(() => n.modelValue, (e) => i.value = e);
		let a = P(null), o = H();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return ke(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (M(), y(m, { to: "body" }, [w(h, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (M(), x("div", {
				key: 0,
				class: O(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: X(c, ["self"])
			}, [S("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? V(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (M(), x("header", Pa, [e.title ? (M(), x("h2", {
					key: 0,
					id: V(o),
					class: "phlix-sheet__title"
				}, z(e.title), 9, Fa)) : b("", !0), e.hideClose ? b("", !0) : (M(), y(be, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : b("", !0),
				S("div", Ia, [I(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (M(), x("footer", La, [I(t.$slots, "footer", {}, void 0, !0)])) : b("", !0)
			], 8, Na)], 34)) : b("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), za = ["id"], Ba = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		let t = e, n = H(), r = P(!1), i = P(null), a;
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
		return A(() => clearTimeout(a)), (t, a) => (M(), x("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: ee(c, ["esc"])
		}, [I(t.$slots, "default", {}, void 0, !0), w(h, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (M(), x("span", {
				key: 0,
				id: V(n),
				role: "tooltip",
				class: O(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [I(t.$slots, "content", {}, () => [C(z(e.text), 1)], !0)], 10, za)) : b("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Va = ["role"], Ha = { class: "phlix-toast__content" }, Ua = {
	key: 0,
	class: "phlix-toast__title"
}, Wa = { class: "phlix-toast__message" }, Ga = ["onClick"], Ka = 0, qa = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let n = t(), i = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, a = (e) => e.icon ?? i[e.tone];
		return j(() => {
			Ka++;
		}), A(() => {
			Ka--;
		}), (t, i) => (M(), y(m, { to: "body" }, [S("div", {
			class: O(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [w(g, { name: "phlix-toast" }, {
			default: J(() => [(M(!0), x(p, null, F(V(n).toasts, (e) => (M(), x("div", {
				key: e.id,
				class: O(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				w(r, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				S("div", Ha, [e.title ? (M(), x("p", Ua, z(e.title), 1)) : b("", !0), S("p", Wa, z(e.message), 1)]),
				e.action ? (M(), x("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), V(n).dismiss(e.id);
					}
				}, z(e.action.label), 9, Ga)) : b("", !0),
				w(be, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => V(n).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, Va))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), Ja = ["aria-label"], Ya = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = _(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, i) => (M(), x("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: k(n.value ? { fontSize: n.value } : void 0)
		}, [w(r, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Ja));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Xa = { class: "phlix-tabs" }, Za = ["aria-label"], Qa = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], $a = ["id", "aria-labelledby"], eo = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: n }) {
		let i = t, a = n, o = H(), s = P(null), c = _(() => i.tabs.findIndex((e) => e.value === i.modelValue)), l = (e) => `${o}-tab-${e}`, u = (e) => `${o}-panel-${e}`, d = _(() => i.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function f(e) {
			let t = i.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== i.modelValue && a("update:modelValue", e);
		}
		function m(e) {
			s.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function h(t) {
			let n = -1;
			switch (t.key) {
				case "ArrowRight":
				case "ArrowDown":
					n = e(d.value, c.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					n = e(d.value, c.value, -1);
					break;
				case "Home":
					n = e(d.value, -1, 1);
					break;
				case "End":
					n = e(d.value, 0, -1);
					break;
				default: return;
			}
			n >= 0 && (t.preventDefault(), f(i.tabs[n].value), m(n));
		}
		return (e, n) => (M(), x("div", Xa, [S("div", {
			ref_key: "listEl",
			ref: s,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": t.label,
			onKeydown: h
		}, [(M(!0), x(p, null, F(t.tabs, (e) => (M(), x("button", {
			id: l(e.value),
			key: e.value,
			type: "button",
			role: "tab",
			class: O(["phlix-tabs__tab", { "is-active": e.value === t.modelValue }]),
			"aria-selected": e.value === t.modelValue,
			"aria-controls": u(e.value),
			tabindex: e.value === t.modelValue ? 0 : -1,
			disabled: e.disabled,
			onClick: (t) => f(e.value)
		}, [e.icon ? (M(), y(r, {
			key: 0,
			name: e.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : b("", !0), C(" " + z(e.label), 1)], 10, Qa))), 128))], 40, Za), t.modelValue ? (M(), x("div", {
			key: 0,
			id: u(t.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": l(t.modelValue),
			tabindex: "0"
		}, [I(e.$slots, t.modelValue, {}, () => [I(e.$slots, "default", {}, void 0, !0)], !0)], 8, $a)) : b("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), to = /*#__PURE__*/ c(/* @__PURE__ */ T({
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
		let t = e, n = P(null), r = P(!1), i = P(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return j(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), A(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (M(), y(R(e.tag), {
			ref_key: "el",
			ref: n,
			class: O(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: k({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [I(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), no = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (M(), y(h, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: J(() => [I(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), ro = "__all__", io = class {
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
}, ao = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, oo = { class: "admin-logs__controls" }, so = { class: "admin-logs__field" }, co = { class: "admin-logs__field" }, lo = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, uo = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, fo = 5e3, po = /*@__PURE__*/ T({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let n = [
			200,
			500,
			1e3,
			2e3
		], r = e, i = E("apiBase", ""), s = _(() => typeof i == "string" ? i : i?.value ?? ""), c = new io(r.client ?? new a({
			baseUrl: s.value,
			tokenStore: new d()
		})), f = t(), p = P([]), m = P(""), h = P(200), g = P([]), v = P(!1), y = P(!1), T = P(null), O = null, k = _(() => p.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: ro,
			label: "All logs (combined)"
		}, ...p.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), N = _(() => n.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function F() {
			try {
				let e = await c.list();
				p.value = e, e.length > 0 && m.value === "" && (m.value = e[0].name);
			} catch (e) {
				f.error(e instanceof Error ? e.message : "Failed to list logs.");
			}
		}
		async function I() {
			let e = m.value;
			if (e !== "") {
				y.value = !0;
				try {
					let t = e === "__all__" ? await c.tailAll(h.value) : await c.tail(e, h.value);
					g.value = t.lines, v.value = t.truncated, D(() => {
						T.value && (T.value.scrollTop = T.value.scrollHeight);
					});
				} catch (e) {
					f.error(e instanceof Error ? e.message : "Failed to read log.");
				} finally {
					y.value = !1;
				}
			}
		}
		function L() {
			O !== null && (clearInterval(O), O = null);
		}
		function R() {
			L(), B.value && m.value !== "" && (O = setInterval(() => void I(), fo));
		}
		let B = P(!1);
		return K([m, h], () => void I()), K([
			B,
			m,
			h
		], R), j(F), A(L), (e, t) => (M(), x("section", ao, [
			t[6] ||= S("header", { class: "admin-logs__head" }, [S("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			S("div", oo, [
				S("label", so, [t[3] ||= S("span", { class: "admin-logs__label" }, "File", -1), w(l, {
					modelValue: m.value,
					"onUpdate:modelValue": t[0] ||= (e) => m.value = e,
					options: k.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				S("label", co, [t[4] ||= S("span", { class: "admin-logs__label" }, "Lines", -1), w(l, {
					"model-value": h.value,
					options: N.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => h.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				w(o, {
					variant: "outline",
					size: "sm",
					loading: y.value,
					disabled: m.value === "",
					onClick: I
				}, {
					default: J(() => [...t[5] ||= [C(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				w(Ea, {
					modelValue: B.value,
					"onUpdate:modelValue": t[2] ||= (e) => B.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			v.value ? (M(), x("p", lo, " Showing the most recent " + z(h.value) + " lines (" + z(m.value === V("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : b("", !0),
			y.value && g.value.length === 0 ? (M(), x("div", uo, [w(u, {
				variant: "text",
				lines: 8
			})])) : (M(), x("pre", {
				key: 2,
				ref_key: "preEl",
				ref: T,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, z(g.value.length === 0 ? "(no output)" : g.value.join("\n")), 513))
		]));
	}
}), mo = /* @__PURE__ */ ce({ default: () => ho }), ho = /*#__PURE__*/ c(po, [["__scopeId", "data-v-a9b0d206"]]);
//#endregion
//#region src/api/admin/dashboard.ts
function $(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function go(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function _o(e) {
	return Array.isArray(e) ? e : [];
}
function vo(e) {
	return {
		session_id: $(e.session_id ?? e.stream_id),
		user_id: $(e.user_id),
		user_name: $(e.user_name ?? e.username),
		media_item_id: $(e.media_item_id),
		media_title: $(e.media_title),
		media_type: $(e.media_type),
		progress_percent: go(e.progress_percent),
		started_at: $(e.started_at)
	};
}
function yo(e) {
	return {
		user_id: $(e.user_id),
		user_name: $(e.user_name ?? e.username),
		total_watch_time_seconds: go(e.total_watch_time_seconds ?? e.total_watch_time),
		play_count: go(e.play_count),
		last_seen: $(e.last_seen)
	};
}
function bo(e) {
	return {
		media_item_id: $(e.media_item_id),
		media_title: $(e.media_title ?? e.title),
		media_type: $(e.media_type ?? e.type),
		play_count: go(e.play_count),
		total_duration_seconds: go(e.total_duration_seconds ?? e.total_duration),
		last_played_at: $(e.last_played_at)
	};
}
function xo(e) {
	let t = typeof e.details == "object" && e.details !== null ? e.details : {};
	return {
		id: $(e.id),
		event_type: $(e.event_type),
		user_id: $(e.user_id),
		user_name: $(e.user_name ?? e.username),
		media_item_id: $(e.media_item_id ?? t.media_item_id),
		media_title: $(e.media_title ?? t.media_title),
		created_at: $(e.created_at ?? e.occurred_at),
		details: typeof e.details == "string" ? e.details : ""
	};
}
var So = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getNowPlaying() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/now-playing");
		return _o(e).map(vo);
	}
	async getTopUsers(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-users", Object.keys(n).length ? n : void 0);
		return _o(r).map(yo);
	}
	async getTopMedia(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-media", Object.keys(n).length ? n : void 0);
		return _o(r).map(bo);
	}
	async getStorage() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/storage");
		return Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [];
	}
	async getActivity(e) {
		let t = e === void 0 ? void 0 : { limit: String(e) }, { data: n } = await this.client.get("/api/v1/admin/dashboard/activity", t);
		return _o(n).map(xo);
	}
}, Co = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, wo = { class: "admin-dash__head" }, To = { class: "admin-dash__grid" }, Eo = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, Do = { class: "admin-dash__card-head" }, Oo = {
	key: 0,
	class: "admin-dash__skel"
}, ko = {
	key: 2,
	class: "admin-dash__np-list",
	role: "list"
}, Ao = { class: "admin-dash__np-info" }, jo = { class: "admin-dash__np-user" }, Mo = ["title"], No = { class: "admin-dash__np-progress" }, Po = ["aria-valuenow"], Fo = { class: "admin-dash__np-pct" }, Io = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, Lo = {
	key: 0,
	class: "admin-dash__skel"
}, Ro = {
	key: 2,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, zo = { class: "admin-dash__rank" }, Bo = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, Vo = {
	key: 0,
	class: "admin-dash__skel"
}, Ho = {
	key: 2,
	class: "admin-dash__media-list",
	role: "list"
}, Uo = { class: "admin-dash__media-rank" }, Wo = { class: "admin-dash__media-info" }, Go = ["title"], Ko = { class: "admin-dash__media-stats" }, qo = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, Jo = {
	key: 0,
	class: "admin-dash__skel"
}, Yo = { class: "admin-dash__storage-grid" }, Xo = { class: "admin-dash__storage-count" }, Zo = { class: "admin-dash__storage-size" }, Qo = {
	key: 0,
	class: "admin-dash__storage-note"
}, $o = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, es = {
	key: 0,
	class: "admin-dash__skel"
}, ts = {
	key: 2,
	class: "admin-dash__activity"
}, ns = {
	class: "admin-dash__activity-list",
	role: "list"
}, rs = { class: "admin-dash__activity-user" }, is = ["title"], as = ["datetime", "title"], os = 20, ss = 3e4, cs = /*@__PURE__*/ T({
	__name: "DashboardPage",
	props: { client: {} },
	setup(e) {
		let n = e, r = E("apiBase", ""), i = _(() => typeof r == "string" ? r : r?.value ?? ""), s = new So(n.client ?? new a({
			baseUrl: i.value,
			tokenStore: new d()
		})), c = t();
		function f(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function m(e) {
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
		function h(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		function g(e) {
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
		let T = [
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
		], D = P(30), O = P([]), N = P([]), I = P([]), L = P([]), R = P([]), B = P(!0), V = P(!0), H = P(!0), U = P(!0), W = P(!0), G = P(!1), q = P(!0), Y = _(() => L.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function ee() {
			try {
				O.value = await s.getNowPlaying();
			} catch {
				c.error("Failed to load now playing.");
			} finally {
				B.value = !1;
			}
		}
		async function X(e) {
			V.value = !0;
			try {
				N.value = await s.getTopUsers(10, e);
			} catch {
				c.error("Failed to load top users.");
			} finally {
				V.value = !1;
			}
		}
		async function te(e) {
			H.value = !0;
			try {
				I.value = await s.getTopMedia(10, e);
			} catch {
				c.error("Failed to load top media.");
			} finally {
				H.value = !1;
			}
		}
		async function Z() {
			try {
				L.value = await s.getStorage();
			} catch {
				c.error("Failed to load storage.");
			} finally {
				U.value = !1;
			}
		}
		async function ne(e, t = !1) {
			t ? G.value = !0 : W.value = !0;
			try {
				let n = await s.getActivity(e);
				t ? R.value = [...R.value, ...n] : R.value = n, q.value = n.length === os;
			} catch {
				c.error("Failed to load activity.");
			} finally {
				W.value = !1, G.value = !1;
			}
		}
		function re() {
			ne(R.value.length + os, !0);
		}
		let Q = null;
		return K(D, (e) => {
			X(e), te(e);
		}), j(() => {
			ee(), Z(), ne(os), X(D.value), te(D.value), Q = setInterval(() => {
				s.getNowPlaying().then((e) => {
					O.value = e;
				}).catch(() => {});
			}, ss);
		}), A(() => {
			Q !== null && (clearInterval(Q), Q = null);
		}), (e, t) => (M(), x("section", Co, [S("header", wo, [t[1] ||= S("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), w(l, {
			"model-value": D.value,
			options: T,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => D.value = Number(e)
		}, null, 8, ["model-value"])]), S("div", To, [
			S("section", Eo, [S("header", Do, [t[2] ||= S("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), O.value.length > 0 ? (M(), y(Bn, {
				key: 0,
				tone: "accent",
				label: `${O.value.length} active sessions`
			}, {
				default: J(() => [C(z(O.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : b("", !0)]), B.value ? (M(), x("div", Oo, [w(u, {
				variant: "text",
				lines: 4
			})])) : O.value.length === 0 ? (M(), y(mn, {
				key: 1,
				icon: "play",
				title: "No active sessions"
			})) : (M(), x("ul", ko, [(M(!0), x(p, null, F(O.value, (e) => (M(), x("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [S("div", Ao, [
				S("span", jo, z(e.user_name), 1),
				S("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, z(e.media_title), 9, Mo),
				w(Bn, { tone: g(e.media_type) }, {
					default: J(() => [C(z(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), S("div", No, [S("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [S("div", {
				class: "admin-dash__bar-fill",
				style: k({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, Po), S("span", Fo, z(e.progress_percent) + "%", 1)])]))), 128))]))]),
			S("section", Io, [t[4] ||= S("header", { class: "admin-dash__card-head" }, [S("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), V.value ? (M(), x("div", Lo, [w(u, {
				variant: "text",
				lines: 4
			})])) : N.value.length === 0 ? (M(), y(mn, {
				key: 1,
				icon: "user",
				title: "No user data yet"
			})) : (M(), x("table", Ro, [t[3] ||= S("thead", null, [S("tr", null, [
				S("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				S("th", { scope: "col" }, "User"),
				S("th", { scope: "col" }, "Watch Time"),
				S("th", { scope: "col" }, "Plays")
			])], -1), S("tbody", null, [(M(!0), x(p, null, F(N.value, (e, t) => (M(), x("tr", { key: e.user_id }, [
				S("td", zo, z(t + 1), 1),
				S("td", null, z(e.user_name), 1),
				S("td", null, z(f(e.total_watch_time_seconds)), 1),
				S("td", null, z(e.play_count), 1)
			]))), 128))])]))]),
			S("section", Bo, [t[5] ||= S("header", { class: "admin-dash__card-head" }, [S("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), H.value ? (M(), x("div", Vo, [w(u, {
				variant: "text",
				lines: 4
			})])) : I.value.length === 0 ? (M(), y(mn, {
				key: 1,
				icon: "film",
				title: "No media data yet"
			})) : (M(), x("ol", Ho, [(M(!0), x(p, null, F(I.value, (e, t) => (M(), x("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				S("span", Uo, z(t + 1), 1),
				S("div", Wo, [S("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, z(e.media_title), 9, Go), w(Bn, { tone: g(e.media_type) }, {
					default: J(() => [C(z(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				S("div", Ko, [S("span", null, z(e.play_count) + " plays", 1), S("span", null, z(f(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			S("section", qo, [t[6] ||= S("header", { class: "admin-dash__card-head" }, [S("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), U.value ? (M(), x("div", Jo, [w(u, {
				variant: "text",
				lines: 3
			})])) : L.value.length === 0 ? (M(), y(mn, {
				key: 1,
				icon: "image",
				title: "No storage data"
			})) : (M(), x(p, { key: 2 }, [S("div", Yo, [(M(!0), x(p, null, F(L.value, (e) => (M(), x("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				w(Bn, { tone: g(e.media_type) }, {
					default: J(() => [C(z(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				S("div", Xo, z(e.item_count.toLocaleString()) + " items", 1),
				S("div", Zo, z(m(e.total_bytes)), 1)
			]))), 128))]), Y.value > 0 ? (M(), x("p", Qo, " Transcode cache: " + z(m(Y.value)), 1)) : b("", !0)], 64))]),
			S("section", $o, [t[8] ||= S("header", { class: "admin-dash__card-head" }, [S("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), W.value ? (M(), x("div", es, [w(u, {
				variant: "text",
				lines: 5
			})])) : R.value.length === 0 ? (M(), y(mn, {
				key: 1,
				icon: "list",
				title: "No recent activity"
			})) : (M(), x("div", ts, [S("ul", ns, [(M(!0), x(p, null, F(R.value, (e) => (M(), x("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				w(Bn, { tone: v(e.event_type) }, {
					default: J(() => [C(z(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				S("span", rs, z(e.user_name), 1),
				S("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, z(e.media_title), 9, is),
				S("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, z(h(e.created_at)), 9, as)
			]))), 128))]), q.value ? (M(), y(o, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: G.value,
				onClick: re
			}, {
				default: J(() => [...t[7] ||= [C(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : b("", !0)]))])
		])]));
	}
}), ls = /* @__PURE__ */ ce({ default: () => us }), us = /*#__PURE__*/ c(cs, [["__scopeId", "data-v-71c5a6ca"]]);
//#endregion
//#region src/app/admin.ts
function ds(e = "/app") {
	let t = `${e}/admin`;
	return [{
		path: `${t}/dashboard`,
		name: "admin-dashboard",
		component: () => Promise.resolve().then(() => ls)
	}, {
		path: `${t}/logs`,
		name: "admin-logs",
		component: () => Promise.resolve().then(() => mo)
	}];
}
function fs(e = "/app") {
	let t = `${e}/admin`;
	return [{
		id: "admin",
		label: "Admin",
		icon: "settings",
		children: [{
			id: "admin-dashboard",
			label: "Dashboard",
			icon: "speed",
			to: `${t}/dashboard`
		}, {
			id: "admin-logs",
			label: "Logs",
			icon: "list",
			to: `${t}/logs`
		}]
	}];
}
//#endregion
//#region src/pages/LibraryScanPage.vue?vue&type=script&setup=true&lang.ts
var ps = { class: "library-scan-page" }, ms = {
	key: 0,
	class: "loading"
}, hs = {
	key: 1,
	class: "error"
}, gs = {
	key: 2,
	class: "libraries-list"
}, _s = { class: "library-info" }, vs = { class: "library-name" }, ys = { class: "library-type" }, bs = { class: "library-paths" }, xs = { class: "library-meta" }, Ss = { key: 0 }, Cs = {
	key: 0,
	class: "scan-status"
}, ws = { class: "library-actions" }, Ts = ["onClick", "disabled"], Es = ["onClick", "disabled"], Ds = {
	key: 0,
	class: "empty-state"
}, Os = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "LibraryScanPage",
	setup(e) {
		let t = P([]), r = P({}), i = P(!0), a = P(null);
		async function o() {
			try {
				t.value = (await n.get("/api/v1/libraries")).libraries || [];
				for (let e of t.value) s(e.id);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to load libraries";
			} finally {
				i.value = !1;
			}
		}
		async function s(e) {
			try {
				let t = await n.get(`/api/v1/libraries/${e}/scan-status`);
				t.job && (r.value[e] = t.job);
			} catch {}
		}
		async function c(e) {
			try {
				await n.post(`/api/v1/libraries/${e}/scan`), await s(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger scan";
			}
		}
		async function l(e) {
			try {
				await n.post(`/api/v1/libraries/${e}/rescan`), await s(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger rescan";
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
		return j(() => {
			o();
		}), (e, n) => (M(), x("div", ps, [n[0] ||= S("div", { class: "scan-header" }, [S("h1", { class: "scan-title" }, "Library Scanner"), S("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), i.value ? (M(), x("div", ms, "Loading libraries...")) : a.value ? (M(), x("div", hs, z(a.value), 1)) : (M(), x("div", gs, [(M(!0), x(p, null, F(t.value, (e) => (M(), x("div", {
			key: e.id,
			class: "library-card"
		}, [S("div", _s, [
			S("h3", vs, z(e.name), 1),
			S("span", ys, z(e.type), 1),
			S("p", bs, z(e.paths.join(", ")), 1),
			S("div", xs, [e.item_count === void 0 ? b("", !0) : (M(), x("span", Ss, z(e.item_count) + " items", 1)), S("span", null, "Last scan: " + z(u(e.last_scan_at)), 1)]),
			r.value[e.id] ? (M(), x("div", Cs, z(d(r.value[e.id])), 1)) : b("", !0)
		]), S("div", ws, [S("button", {
			class: "btn btn-scan",
			onClick: (t) => c(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Scan ", 8, Ts), S("button", {
			class: "btn btn-rescan",
			onClick: (t) => l(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Rescan ", 8, Es)])]))), 128)), t.value.length === 0 ? (M(), x("div", Ds, " No libraries configured. Add a library to get started. ")) : b("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), ks = { class: "my-servers-page" }, As = {
	key: 0,
	class: "loading"
}, js = {
	key: 1,
	class: "error"
}, Ms = {
	key: 2,
	class: "servers-list"
}, Ns = { class: "server-info" }, Ps = { class: "server-name" }, Fs = { class: "server-url" }, Is = { class: "server-meta" }, Ls = { key: 0 }, Rs = {
	key: 0,
	class: "empty-state"
}, zs = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "MyServersPage",
	setup(e) {
		let t = P([]), r = P(!0), i = P(null);
		async function a() {
			try {
				t.value = (await n.get("/api/v1/servers")).servers || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load servers";
			} finally {
				r.value = !1;
			}
		}
		function o(e) {
			switch (e) {
				case "online": return "#22c55e";
				case "offline": return "#ef4444";
				case "connecting": return "#eab308";
				default: return "#6b7280";
			}
		}
		function s(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return j(() => {
			a();
		}), (e, n) => (M(), x("div", ks, [n[2] ||= S("div", { class: "page-header" }, [S("h1", { class: "page-title" }, "My Servers"), S("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), r.value ? (M(), x("div", As, "Loading servers...")) : i.value ? (M(), x("div", js, z(i.value), 1)) : (M(), x("div", Ms, [(M(!0), x(p, null, F(t.value, (e) => (M(), x("div", {
			key: e.id,
			class: "server-card"
		}, [
			S("div", {
				class: "server-status",
				style: k({ backgroundColor: o(e.status) })
			}, null, 4),
			S("div", Ns, [
				S("h3", Ps, z(e.name), 1),
				S("p", Fs, z(e.url), 1),
				S("div", Is, [
					S("span", null, z(e.owner), 1),
					e.library_count === void 0 ? b("", !0) : (M(), x("span", Ls, z(e.library_count) + " libraries", 1)),
					S("span", null, "Last seen: " + z(s(e.last_seen)), 1)
				])
			]),
			n[0] ||= S("div", { class: "server-actions" }, [S("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), t.value.length === 0 ? (M(), x("div", Rs, [...n[1] ||= [S("p", null, "No servers connected yet.", -1), S("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : b("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), Bs = { class: "federation-page" }, Vs = {
	key: 0,
	class: "loading"
}, Hs = {
	key: 1,
	class: "error"
}, Us = {
	key: 2,
	class: "federation-content"
}, Ws = { class: "peers-section" }, Gs = { class: "peers-list" }, Ks = { class: "peer-info" }, qs = { class: "peer-name" }, Js = { class: "peer-url" }, Ys = { class: "peer-meta" }, Xs = { key: 0 }, Zs = { class: "peer-actions" }, Qs = ["onClick"], $s = {
	key: 1,
	class: "status-badge"
}, ec = {
	key: 0,
	class: "empty-state"
}, tc = { class: "add-peer-section" }, nc = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "FederationPage",
	setup(e) {
		let t = P([]), r = P(!0), i = P(null);
		async function a() {
			try {
				t.value = (await n.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load federation peers";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await n.post("/api/v1/federation/connect", { url: e }), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to connect to peer";
			}
		}
		async function s(e) {
			try {
				await n.post(`/api/v1/federation/peers/${e}/disconnect`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to disconnect peer";
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
		return j(() => {
			a();
		}), (e, n) => (M(), x("div", Bs, [n[5] ||= S("div", { class: "page-header" }, [S("h1", { class: "page-title" }, "Federation"), S("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), r.value ? (M(), x("div", Vs, "Loading federation peers...")) : i.value ? (M(), x("div", Hs, z(i.value), 1)) : (M(), x("div", Us, [S("div", Ws, [n[2] ||= S("h2", { class: "section-title" }, "Connected Peers", -1), S("div", Gs, [(M(!0), x(p, null, F(t.value, (e) => (M(), x("div", {
			key: e.id,
			class: "peer-card"
		}, [
			S("div", {
				class: "peer-status",
				style: k({ backgroundColor: c(e.status) })
			}, null, 4),
			S("div", Ks, [
				S("h3", qs, z(e.name), 1),
				S("p", Js, z(e.url), 1),
				S("div", Ys, [e.shared_libraries_count === void 0 ? b("", !0) : (M(), x("span", Xs, z(e.shared_libraries_count) + " shared libraries", 1)), S("span", null, "Last sync: " + z(l(e.last_sync)), 1)])
			]),
			S("div", Zs, [e.status === "connected" ? (M(), x("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => s(e.id)
			}, " Disconnect ", 8, Qs)) : e.status === "pending" ? (M(), x("span", $s, "Pending")) : b("", !0)])
		]))), 128)), t.value.length === 0 ? (M(), x("div", ec, [...n[1] ||= [S("p", null, "No federation peers connected.", -1)]])) : b("", !0)])]), S("div", tc, [n[4] ||= S("h2", { class: "section-title" }, "Add Peer", -1), S("form", {
			class: "add-peer-form",
			onSubmit: n[0] ||= X((e) => o(""), ["prevent"])
		}, [...n[3] ||= [S("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), S("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), rc = { class: "manage-shares-page" }, ic = {
	key: 0,
	class: "loading"
}, ac = {
	key: 1,
	class: "error"
}, oc = {
	key: 2,
	class: "shares-list"
}, sc = { class: "share-info" }, cc = { class: "share-library" }, lc = { class: "share-meta" }, uc = {
	key: 0,
	class: "expired-badge"
}, dc = { class: "share-dates" }, fc = { key: 0 }, pc = { class: "share-actions" }, mc = ["onClick"], hc = {
	key: 0,
	class: "empty-state"
}, gc = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "ManageSharesPage",
	setup(e) {
		let t = P([]), r = P(!0), i = P(null);
		async function a() {
			try {
				t.value = (await n.get("/api/v1/shares")).shares || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load shares";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await n.delete(`/api/v1/shares/${e}`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to revoke share";
			}
		}
		function s(e) {
			return new Date(e).toLocaleString();
		}
		function c(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		return j(() => {
			a();
		}), (e, n) => (M(), x("div", rc, [n[1] ||= S("div", { class: "page-header" }, [S("h1", { class: "page-title" }, "Manage Shares"), S("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), r.value ? (M(), x("div", ic, "Loading shares...")) : i.value ? (M(), x("div", ac, z(i.value), 1)) : (M(), x("div", oc, [(M(!0), x(p, null, F(t.value, (e) => (M(), x("div", {
			key: e.id,
			class: "share-card"
		}, [S("div", sc, [
			S("h3", cc, z(e.library_name), 1),
			S("div", lc, [
				S("span", null, "Shared with: " + z(e.shared_with), 1),
				S("span", { class: O(["permission-badge", e.permissions]) }, z(e.permissions), 3),
				e.expires_at && c(e.expires_at) ? (M(), x("span", uc, "Expired")) : b("", !0)
			]),
			S("p", dc, [C(" Created: " + z(s(e.created_at)) + " ", 1), e.expires_at ? (M(), x("span", fc, " | Expires: " + z(s(e.expires_at)), 1)) : b("", !0)])
		]), S("div", pc, [S("button", {
			class: "btn btn-danger",
			onClick: (t) => o(e.id)
		}, "Revoke", 8, mc)])]))), 128)), t.value.length === 0 ? (M(), x("div", hc, [...n[0] ||= [S("p", null, "No library shares found.", -1)]])) : b("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), _c = { class: "audit-logs-page" }, vc = {
	key: 0,
	class: "loading"
}, yc = {
	key: 1,
	class: "error"
}, bc = {
	key: 2,
	class: "logs-container"
}, xc = { class: "logs-list" }, Sc = { class: "log-content" }, Cc = { class: "log-header" }, wc = { class: "log-action" }, Tc = { class: "log-actor" }, Ec = { class: "log-time" }, Dc = {
	key: 0,
	class: "log-target"
}, Oc = {
	key: 1,
	class: "log-details"
}, kc = {
	key: 2,
	class: "log-ip"
}, Ac = {
	key: 0,
	class: "empty-state"
}, jc = {
	key: 0,
	class: "pagination"
}, Mc = ["disabled"], Nc = { class: "page-info" }, Pc = ["disabled"], Fc = /*#__PURE__*/ c(/* @__PURE__ */ T({
	__name: "AuditLogsPage",
	setup(e) {
		let t = P([]), r = P(!0), i = P(null), a = P(1), o = P(1);
		async function s(e = 1) {
			try {
				r.value = !0;
				let i = await n.get("/api/v1/audit-logs", { page: String(e) });
				t.value = i.logs || [], a.value = i.page || 1, o.value = i.total_pages || 1;
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load audit logs";
			} finally {
				r.value = !1;
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
		return j(() => {
			s();
		}), (e, n) => (M(), x("div", _c, [n[3] ||= S("div", { class: "page-header" }, [S("h1", { class: "page-title" }, "Audit Logs"), S("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), r.value ? (M(), x("div", vc, "Loading audit logs...")) : i.value ? (M(), x("div", yc, z(i.value), 1)) : (M(), x("div", bc, [S("div", xc, [(M(!0), x(p, null, F(t.value, (e) => (M(), x("div", {
			key: e.id,
			class: "log-entry"
		}, [S("div", {
			class: "log-icon",
			style: k({ backgroundColor: l(e.action) })
		}, z(u(e.action)), 5), S("div", Sc, [
			S("div", Cc, [
				S("span", wc, z(e.action), 1),
				S("span", Tc, z(e.actor), 1),
				S("span", Ec, z(c(e.created_at)), 1)
			]),
			e.target ? (M(), x("p", Dc, "Target: " + z(e.target), 1)) : b("", !0),
			e.details ? (M(), x("p", Oc, z(e.details), 1)) : b("", !0),
			e.ip_address ? (M(), x("span", kc, "IP: " + z(e.ip_address), 1)) : b("", !0)
		])]))), 128)), t.value.length === 0 ? (M(), x("div", Ac, [...n[2] ||= [S("p", null, "No audit logs found.", -1)]])) : b("", !0)]), o.value > 1 ? (M(), x("div", jc, [
			S("button", {
				class: "btn btn-secondary",
				disabled: a.value <= 1,
				onClick: n[0] ||= (e) => s(a.value - 1)
			}, " Previous ", 8, Mc),
			S("span", Nc, "Page " + z(a.value) + " of " + z(o.value), 1),
			S("button", {
				class: "btn btn-secondary",
				disabled: a.value >= o.value,
				onClick: n[1] ||= (e) => s(a.value + 1)
			}, " Next ", 8, Pc)
		])) : b("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Ic(e, t) {
	let n = St(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
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
export { ro as ALL_LOGS, Xr as ARROW_ICONS, Zr as ARROW_LABELS, So as AdminDashboardApi, us as AdminDashboardPage, io as AdminLogsApi, ho as AdminLogsPage, a as ApiClient, f as ApiError, Ca as AppBackdrop, ve as AppLayout, Fc as AuditLogsPage, Bn as Badge, hr as BrowsePage, o as Button, jn as Chip, Rn as Combobox, Qe as CommandPalette, Ie as DEFAULT_PREFERENCES, mn as EmptyState, nc as FederationPage, lr as FilterBar, r as Icon, be as IconButton, Ce as Kbd, Os as LibraryScanPage, d as LocalStorageTokenStore, Bi as LoginForm, Ui as LoginPage, gc as ManageSharesPage, Qt as MediaCard, Lr as MediaDetail, Hr as MediaDetailPage, cn as MediaGrid, Dn as MediaHomeRow, wn as MediaRow, Ma as Modal, zs as MyServersPage, Yr as PLAYER_SHORTCUTS, no as PageTransition, ht as PhlixApp, Di as Player, ji as PlayerPage, mi as QualityMenu, wt as RESUME_MAX_RATIO, Ct as RESUME_MIN_SECONDS, to as Reveal, Jr as Scrubber, l as Select, ga as SettingsForm, va as SettingsPage, Ra as Sheet, ci as ShortcutsHelp, ea as SignupForm, ra as SignupPage, u as Skeleton, ui as Slider, pi as SpeedMenu, Ya as Spinner, Ea as Switch, eo as Tabs, qa as ToastHost, Ba as Tooltip, fi as VolumeControl, fs as adminMenu, lt as applyStoredThemeEarly, Ic as bindMediaStoreToRouter, ds as buildAdminRoutes, Tn as buildMediaQuery, En as buildMediaUrl, xa as createPhlixApp, ot as deriveAccentVars, Ur as formatTime, Me as fuzzyScore, ei as handleShortcut, Be as hasStoredPreferences, $r as isTypingTarget, Ne as matchCommand, ze as readStoredPreferences, Mi as useAuthStore, Fe as useCommandStore, ke as useFocusTrap, ti as useKeyboardShortcuts, St as useMediaStore, Ot as usePlayerStore, He as usePreferencesStore, ut as useTheme, t as useToastStore };

//# sourceMappingURL=phlix-ui.js.map